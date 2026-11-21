---
title: "OpenTelemetry : instrumentation Python"
description: "L'auto-instrumentation OpenTelemetry trace une application Python sans modifier son code, mais seulement à travers les bibliothèques qu'elle connaît. Son fonctionnement, ses angles morts et les spans manuels qui les comblent."
tags: [monitoring, devops]
series: opentelemetry
---

Une application FastAPI qui lit une base SQLite et appelle une API externe peut produire des [traces](./2026-11-08-opentelemetry-traces.md), des métriques et des logs OpenTelemetry sans qu'une ligne de son code mentionne OpenTelemetry. Écrire ces spans à la main dans chaque route serait long, et toujours incomplet : chaque appel HTTP sortant et chaque requête SQL demanderaient leur propre span et la transmission du contexte. L'auto-instrumentation branche ces sondes au démarrage du processus, sur les bibliothèques déjà utilisées : le framework web, le client HTTP, le pilote de base de données. Elle couvre ce qui passe par ces bibliothèques, et rien d'autre, ce qui laisse des angles morts à repérer trace en main.

<!--truncate-->

## Ce que l'auto-instrumentation couvre

Un reverse proxy instrumenté ou un agent eBPF produit déjà un span par requête entrante, mais ces spans mesurent la durée d'une requête sans en montrer la composition. L'auto-instrumentation descend d'un niveau : sans changer le code source, seulement la commande de démarrage, elle produit un span pour chaque passage dans une bibliothèque connue. Les étapes métier que ces bibliothèques ne voient pas restent à l'instrumentation manuelle, décrite plus bas.

## Le mécanisme de l'auto-instrumentation

Deux paquets forment la base : `opentelemetry-distro`, qui apporte l'API, le SDK et les outils de lancement, et `opentelemetry-exporter-otlp`. La commande `opentelemetry-bootstrap -a install`, exécutée une fois à la construction de l'image, inspecte les paquets installés et ajoute les bibliothèques d'instrumentation correspondantes. Pour une application qui utilise FastAPI, httpx et sqlite3, elle installe entre autres `opentelemetry-instrumentation-fastapi`, `-httpx` et `-sqlite3`, plus quelques instrumentations installées d'office (module `logging`, `threading`, `asyncio`). Avec un gestionnaire comme uv, `opentelemetry-bootstrap -a requirements` produit la liste au lieu de l'installer, pour l'ajouter aux dépendances déclarées du projet.

Le lancement passe ensuite par un préfixe : `opentelemetry-instrument uvicorn app:app` au lieu de `uvicorn app:app`. `opentelemetry-instrument` initialise le SDK, active chaque instrumentation installée, puis exécute la commande. Les instrumentations remplacent en mémoire certaines fonctions des bibliothèques (*monkey patching*) par des versions qui ouvrent un span, appellent la fonction d'origine, puis ferment le span. Le span `SERVER` de la requête entrante vient de FastAPI ; le span `CLIENT` de l'appel sortant vient de httpx, qui injecte au passage l'en-tête `traceparent` ; le span de la requête SQL vient de sqlite3.

Seules les fonctions remplacées produisent des spans, et le remplacement doit avoir lieu avant que l'application ne les référence. Une bibliothèque importée et configurée avant l'initialisation du SDK, ou un objet créé par un chemin que l'instrumentation ne surveille pas, échappe à la trace.

## Configuration par l'environnement

Toute la configuration passe par des variables `OTEL_*`, ce qui laisse le code et l'image identiques d'un environnement à l'autre.

| Variable | Rôle |
|---|---|
| `OTEL_SERVICE_NAME` | nom du service, attribut `service.name` de la ressource |
| `OTEL_RESOURCE_ATTRIBUTES` | autres attributs de ressource (`service.version=1.4.0,deployment.environment.name=prod`) |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | adresse du Collector ou du backend |
| `OTEL_EXPORTER_OTLP_PROTOCOL` | `grpc` ou `http/protobuf` |
| `OTEL_TRACES_SAMPLER`, `OTEL_TRACES_SAMPLER_ARG` | échantillonnage |
| `OTEL_SEMCONV_STABILITY_OPT_IN` | noms d'attributs émis (voir plus bas) |

Les signaux exportés se choisissent avec `OTEL_TRACES_EXPORTER`, `OTEL_METRICS_EXPORTER` et `OTEL_LOGS_EXPORTER`. La valeur `otlp` envoie au Collector ou au backend, `none` coupe le signal, et `console` écrit les données sur la sortie standard, ce qui permet de vérifier l'instrumentation sans aucun backend.

L'envoi des logs du module `logging` dépend de la version. Jusqu'à la version 1.40 du SDK, `OTEL_PYTHON_LOGGING_AUTO_INSTRUMENTATION_ENABLED=true` ajoutait au logger racine un gestionnaire qui exporte chaque enregistrement en OTLP. Cette variable et ce gestionnaire sont dépréciés depuis, au profit de l'instrumentation `opentelemetry-instrumentation-logging`, que `opentelemetry-bootstrap` installe d'office. Avec les versions actuelles, l'ancienne variable reste donc absente : l'instrumentation branche son gestionnaire par défaut, et les logs partent en OTLP dès que `OTEL_LOGS_EXPORTER` vaut `otlp`. `OTEL_PYTHON_LOG_AUTO_INSTRUMENTATION=false` coupe cet envoi, `OTEL_PYTHON_LOG_HANDLER_LEVEL` fixe le niveau minimal exporté. Positionner les deux mécanismes à la fois ne double pas les logs : l'instrumentation détecte l'ancienne variable et s'efface, avec un avertissement.

## Instrumentation manuelle

Quand une trace montre qu'un service a mis 700 ms sans dire à quoi, un span manuel découpe ce temps. Le code n'utilise que l'API ; le SDK branché par `opentelemetry-instrument` fait le reste.

```python
from opentelemetry import trace
tracer = trace.get_tracer("suivi")
with tracer.start_as_current_span("interroger le transporteur") as span:
    span.set_attribute("suivi.colis.id", colis_id)
    reponse = transporteur.consulter(colis_id)
```

`start_as_current_span` crée le span et le rend actif pendant le bloc `with`. Il devient l'enfant du span `SERVER` de FastAPI, et tout span créé à l'intérieur, comme celui d'un appel httpx, devient le sien. La sortie du bloc ferme le span et fixe sa durée. Le nom passé à `get_tracer` devient le *scope* des spans, ce qui distingue dans le backend les spans écrits à la main de ceux des bibliothèques.

Les attributs métier prennent un préfixe propre à l'application (`suivi.colis.id`) pour ne pas entrer en collision avec les noms réservés des conventions sémantiques. Ils deviennent interrogeables : une recherche peut retrouver toutes les traces d'un colis donné, ce qu'une métrique ne permettrait qu'avec une série par colis.

`span.add_event()` marque un instant dans la vie du span, avec ses propres attributs, par exemple le moment où le statut d'un colis est déterminé. Une exception qui sort du bloc `with` passe le span en `ERROR` et l'enregistre comme événement `exception`, avec son type, son message et sa pile d'appels : c'est le comportement par défaut de `start_as_current_span`. Un appel explicite à `span.set_status()` ne sert que pour une erreur métier qui ne lève pas d'exception.

Un span manuel se justifie par une question précise : une étape lente à isoler, une opération métier à mesurer, un attribut sur lequel filtrer. Instrumenter chaque fonction multiplie les spans sans rendre les traces plus lisibles.

## Pièges et limites

### Anciens noms d'attributs

Plusieurs instrumentations Python émettent encore par défaut les attributs d'avant la stabilisation des conventions sémantiques : `http.method`, `http.status_code` et `db.system` au lieu de `http.request.method`, `http.response.status_code` et `db.system.name`. Les métriques changent aussi : `http.server.duration`, en millisecondes, au lieu de `http.server.request.duration`, en secondes. Une alerte écrite sur l'un des noms ne voit rien quand l'autre est émis.

`OTEL_SEMCONV_STABILITY_OPT_IN` règle ce comportement. La valeur `http,database` n'émet que les noms stables ; `http/dup,database/dup` émet les deux nomenclatures à la fois, le temps de migrer tableaux de bord et alertes ; sans la variable, les instrumentations gardent les anciens noms. Sans elle, les noms émis dépendent de la version de chaque instrumentation, et une mise à jour peut changer les attributs d'un service sans que son code ait bougé. Positionner `http,database` dès le premier déploiement évite d'avoir à migrer plus tard des requêtes écrites sur des noms condamnés.

### Raccourcis non tracés

L'instrumentation de sqlite3 suit l'interface DB-API de Python, et sa documentation précise que les curseurs doivent être créés explicitement pour être tracés. Le raccourci `connection.execute()`, qui crée un curseur en interne, ne produit aucun span : la requête n'apparaît dans aucune trace, sans le moindre message d'erreur. Avec l'exporteur `console`, une route qui lit la base par ce raccourci puis appelle l'API externe affiche son span `SERVER` et le span httpx, et rien entre les deux : la trace a l'air complète. D'autres bibliothèques ont des angles morts comparables : un appel fait par un client HTTP non instrumenté, un traitement lancé dans un thread ou une tâche dont le contexte n'est pas transmis. La couverture s'arrête aux bibliothèques connues, et rien ne signale l'absence d'un span. Une auto-instrumentation se vérifie donc trace en main, en comparant les spans reçus aux appels réellement faits par le code.

### Serveurs à plusieurs processus

`opentelemetry-instrument` initialise le SDK dans le processus qu'il lance. Un serveur qui crée ses processus de travail par *fork* duplique ce SDK déjà initialisé, alors que les threads qui exportent les données ne survivent pas au fork. La documentation signale que plusieurs workers peuvent casser la production des métriques : avec `uvicorn --workers`, traces et logs fonctionnent, les métriques non. Deux réponses sont proposées : lancer gunicorn avec des workers `uvicorn.workers.UvicornWorker`, ou initialiser le SDK après le fork, dans le hook `post_fork` de gunicorn. La seconde sort du mode sans code : le fichier de configuration de gunicorn crée lui-même les fournisseurs et les exporteurs, et le préfixe `opentelemetry-instrument` disparaît de la commande. Dans un conteneur, un seul worker par pod et une mise à l'échelle par le nombre de répliques évitent la question.

### Spans parasites

L'instrumentation ASGI, sur laquelle repose celle de FastAPI, produit en plus du span `SERVER` des spans internes pour chaque réception du corps de la requête et chaque envoi de la réponse. Une réponse envoyée en plusieurs morceaux en produit autant. Ils encombrent les cascades et multiplient les séries des métriques calculées à partir des spans. L'option `exclude_spans` de l'instrumentation (`["receive", "send"]`) les supprime à la source, mais elle ne se passe qu'en argument, dans le code. Pour la combiner avec le préfixe, `OTEL_PYTHON_DISABLED_INSTRUMENTATIONS=fastapi` désactive l'instrumentation automatique de FastAPI, l'application appelle elle-même `FastAPIInstrumentor.instrument_app()` avec l'option, et les autres bibliothèques restent instrumentées sans code. Un processeur de filtrage dans le Collector retire aussi ces spans, sans toucher à l'application.

### Coût et versions

Chaque span coûte quelques microsecondes et un peu de mémoire jusqu'à son export. Le surcoût reste négligeable devant une requête HTTP ou SQL, mais devient sensible dans une boucle serrée instrumentée à la main.

Les paquets évoluent ensemble. `opentelemetry-distro` et les instrumentations suivent une numérotation commune en bêta (`0.66b1` pour un SDK en `1.45.1`), et chaque instrumentation épingle la version exacte de `opentelemetry-instrumentation` dont elle dépend : mélanger deux générations produit des conflits de dépendances. Ils se mettent à jour d'un bloc, en relançant `opentelemetry-bootstrap`.

## Alternatives écartées

L'initialisation du SDK dans le code de l'application (création explicite du `TracerProvider` et des exporteurs, appel à chaque instrumentation) donne un contrôle complet sur l'ordre d'initialisation et règle le cas des serveurs à plusieurs processus. Elle ajoute du code d'infrastructure dans chaque application, que l'auto-instrumentation réduit à un préfixe de commande.

Sur Kubernetes, l'opérateur OpenTelemetry injecte les bibliothèques et les variables d'environnement dans le pod à partir d'une annotation du Deployment (`instrumentation.opentelemetry.io/inject-python`). L'image n'a plus à embarquer les paquets, mais l'instrumentation devient invisible depuis le dépôt de l'application, et l'opérateur s'ajoute aux composants à maintenir.

Un agent eBPF (Beyla, versé au projet OpenTelemetry sous le nom d'OpenTelemetry eBPF Instrumentation) produit des spans sans toucher ni au code ni à l'image, pour tous les langages. Il voit les requêtes HTTP et SQL au niveau du réseau, mais pas les étapes internes d'un traitement, et demande des privilèges élevés sur le nœud.

## Conclusion

Deux paquets, une commande à la construction de l'image et un préfixe au lancement donnent des spans, des métriques et des logs pour toutes les bibliothèques connues, ce qui suffit à la plupart des services Python. L'auto-instrumentation ne signale pas ses trous : raccourcis non tracés, noms d'attributs émis et comportement sous plusieurs workers se vérifient trace en main avant de s'y fier. Les spans manuels viennent ensuite, un par question restée sans réponse.

## Ressources utiles

- [Python : auto-instrumentation sans code](https://opentelemetry.io/docs/zero-code/python/)
- [Python : dépannage de l'auto-instrumentation](https://opentelemetry.io/docs/zero-code/python/troubleshooting/)
- [Python : instrumentation manuelle](https://opentelemetry.io/docs/languages/python/instrumentation/)
- [Variables d'environnement du SDK](https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/)
- [Migration des conventions HTTP](https://opentelemetry.io/docs/specs/semconv/non-normative/http-migration/)
- [Bibliothèques d'instrumentation Python (opentelemetry-python-contrib)](https://opentelemetry-python-contrib.readthedocs.io/)

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/professionnel/sonu-k8s-cluster" title="Cluster Kubernetes interne DiscoDiode">Le cluster a retenu l'alternative eBPF : ses applications internes en Python sont tracées par Beyla, intégré à Alloy sur chaque nœud, sans paquet OpenTelemetry dans leurs images. Seul ThingsBoard embarque un agent d'auto-instrumentation, celui de Java.</ProjectLink>
</ProjectLinks>
