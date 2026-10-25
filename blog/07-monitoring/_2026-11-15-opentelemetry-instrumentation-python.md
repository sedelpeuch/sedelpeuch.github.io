---
title: "OpenTelemetry : instrumentation Python"
description: "Instrumenter une application Python avec OpenTelemetry : auto-instrumentation par opentelemetry-instrument et opentelemetry-bootstrap, configuration par variables OTEL_*, spans manuels, attributs, événements et exceptions, pièges des conventions sémantiques et des raccourcis non tracés."
tags: [monitoring, scripting, devops]
series: opentelemetry
---

Une application FastAPI qui appelle une base de données et une API externe peut produire des [traces](./2026-11-08-opentelemetry-traces.md), des métriques et des logs OpenTelemetry sans qu'une ligne de son code mentionne OpenTelemetry. L'auto-instrumentation branche, au démarrage du processus, des sondes sur les bibliothèques déjà utilisées : le framework web, le client HTTP, le pilote de base de données. Elle couvre ce qui passe par ces bibliothèques, et rien d'autre. Cet article décrit son fonctionnement en Python, sa configuration, ses angles morts, puis l'instrumentation manuelle qui les complète.

<!--truncate-->

## Trois niveaux d'instrumentation

L'effort d'instrumentation se répartit en trois niveaux, à combiner selon la question posée.

1. **Sans toucher à l'application** : un reverse proxy instrumenté produit un span par requête entrante, avec la route, le statut et la durée. Un agent eBPF peut aussi observer les appels réseau d'un processus depuis le noyau, quel que soit son langage. Ces spans restent en surface : ils mesurent la durée d'une requête sans en montrer la composition.
2. **Auto-instrumentation** : des bibliothèques d'instrumentation s'accrochent aux frameworks et clients connus au lancement du processus. Le code source ne change pas, seule la commande de démarrage change.
3. **Instrumentation manuelle** : le code crée lui-même des spans et des attributs pour les étapes métier que les bibliothèques ne voient pas.

## Auto-instrumentation

Deux paquets suffisent : `opentelemetry-distro`, qui apporte le SDK et les outils de lancement, et `opentelemetry-exporter-otlp`. Une commande, exécutée une fois à la construction de l'image, inspecte les paquets installés et ajoute les bibliothèques d'instrumentation correspondantes :

```bash
opentelemetry-bootstrap -a install
```

Pour une application qui utilise FastAPI, httpx et sqlite3, elle installe entre autres `opentelemetry-instrumentation-fastapi`, `-httpx` et `-sqlite3`. Le lancement passe ensuite par un préfixe :

```bash
opentelemetry-instrument uvicorn app:app --host 0.0.0.0
```

`opentelemetry-instrument` initialise le SDK, active chaque instrumentation installée, puis lance la commande. Les fonctions de FastAPI, de httpx et de sqlite3 sont remplacées en mémoire par des versions qui ouvrent et ferment des spans autour de l'appel d'origine. Le span `SERVER` de la requête entrante vient de FastAPI, le span `CLIENT` de l'appel sortant vient de httpx, qui injecte au passage l'en-tête `traceparent`, et le span de la requête SQL vient de sqlite3.

Sur Kubernetes, l'opérateur OpenTelemetry fait la même chose sans modifier l'image : une annotation sur le Deployment déclenche l'injection des bibliothèques et des variables d'environnement dans le pod.

## Configuration par l'environnement

Toute la configuration passe par des variables `OTEL_*`, ce qui laisse le code et l'image inchangés d'un environnement à l'autre :

| Variable | Rôle |
|---|---|
| `OTEL_SERVICE_NAME` | nom du service, attribut `service.name` de la ressource |
| `OTEL_RESOURCE_ATTRIBUTES` | autres attributs de ressource (`service.version=1.4.0,deployment.environment.name=prod`) |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | adresse du Collector ou du backend |
| `OTEL_EXPORTER_OTLP_PROTOCOL` | `grpc` ou `http/protobuf` |
| `OTEL_TRACES_SAMPLER`, `OTEL_TRACES_SAMPLER_ARG` | échantillonnage |
| `OTEL_PYTHON_LOGGING_AUTO_INSTRUMENTATION_ENABLED` | branche le module `logging` sur le SDK |

Les signaux exportés se choisissent avec `OTEL_TRACES_EXPORTER`, `OTEL_METRICS_EXPORTER` et `OTEL_LOGS_EXPORTER` (`otlp`, `console` ou `none`). L'exporteur `console`, qui écrit les données sur la sortie standard, permet de vérifier l'instrumentation sans backend.

## Pièges de l'auto-instrumentation

### Anciens noms d'attributs

Plusieurs instrumentations Python émettent encore par défaut les attributs d'avant la stabilisation des conventions sémantiques : `http.method`, `http.status_code` et `db.system` au lieu de `http.request.method`, `http.response.status_code` et `db.system.name`. Les métriques changent aussi de nom (`http.server.duration` en millisecondes au lieu de `http.server.request.duration` en secondes). La variable `OTEL_SEMCONV_STABILITY_OPT_IN` règle ce comportement :

- `http,database` : noms stables uniquement ;
- `http/dup,database/dup` : les deux nomenclatures à la fois, le temps de migrer dashboards et alertes ;
- absente : anciens noms.

Positionner cette variable dès le premier déploiement évite d'avoir à migrer ensuite des requêtes écrites sur les anciens noms.

### Raccourcis non tracés

L'instrumentation de sqlite3 suit l'API DB-API : elle trace `cursor.execute()`. Le raccourci `connection.execute()`, qui crée un curseur en interne, échappe à l'instrumentation et la requête n'apparaît dans aucune trace, sans message d'erreur. D'autres bibliothèques ont des angles morts comparables : un appel fait par un client non instrumenté, un traitement lancé dans un thread ou une tâche dont le contexte n'est pas transmis. Une auto-instrumentation se vérifie trace en main, en comparant les spans reçus aux appels réellement faits par le code.

### Modèle de processus

`opentelemetry-instrument` initialise le SDK dans le processus qu'il lance. Un serveur qui crée ses processus de travail par *fork* (gunicorn, uvicorn avec `--workers`) ou qui recharge son code à chaud (`--reload`) peut se retrouver avec des processus dont l'exportation ne fonctionne pas, les threads d'export ne survivant pas au fork. La documentation recommande, dans ce cas, d'initialiser le SDK dans un hook post-fork du serveur plutôt qu'au lancement.

### Spans parasites

L'instrumentation ASGI de FastAPI produit, en plus du span `SERVER`, des spans internes pour chaque envoi de réponse (`http send`). Ils encombrent les cascades et multiplient les séries de métriques dérivées des spans. Ils se filtrent dans l'application ou dans le Collector.

## Instrumentation manuelle

Quand une trace montre qu'un service a mis 700 ms sans dire à quoi, un span manuel découpe ce temps. Le code n'utilise que l'API ; le SDK branché par `opentelemetry-instrument` fait le reste.

```python
tracer = trace.get_tracer("suivi")

with tracer.start_as_current_span("interroger le transporteur") as span:
    span.set_attribute("suivi.colis.id", colis_id)
    reponse = transporteur.consulter(colis_id)
```

`start_as_current_span` crée le span et le rend actif pendant le bloc : il devient l'enfant du span `SERVER` de FastAPI, et tout span créé à l'intérieur, comme celui d'un appel httpx, devient le sien. La sortie du bloc `with` ferme le span et fixe sa durée. Le nom passé à `get_tracer` devient le *scope* des spans, ce qui distingue dans le backend les spans écrits à la main de ceux des bibliothèques.

Les attributs métier prennent un préfixe propre à l'application (`suivi.colis.id`) pour ne pas entrer en collision avec les noms réservés des conventions sémantiques. Ils deviennent interrogeables : une recherche peut retrouver toutes les traces d'un colis donné.

Un **événement** marque un instant dans la vie d'un span, avec ses propres attributs :

```python
span.add_event("statut déterminé", {"suivi.statut": statut})
```

Une exception qui sort du bloc `with` passe le span en `ERROR` et l'enregistre comme événement `exception`, avec son type, son message et sa pile d'appels. Un appel explicite à `span.set_status()` n'est utile que pour une erreur métier qui ne lève pas d'exception.

Un span manuel se justifie par une question précise : une étape lente à isoler, une opération métier à mesurer, un attribut sur lequel filtrer. Instrumenter chaque fonction multiplie les spans sans rendre les traces plus lisibles.

## Limites

- **Couverture limitée aux bibliothèques connues** : un client maison, une bibliothèque sans instrumentation ou un raccourci non tracé n'apparaissent pas.
- **Conventions en transition** : sans `OTEL_SEMCONV_STABILITY_OPT_IN`, les noms émis dépendent de la version de chaque instrumentation.
- **Surcoût** : chaque span coûte quelques microsecondes et de la mémoire avant son export. Négligeable pour des requêtes HTTP, sensible dans une boucle serrée instrumentée à la main.
- **Versions couplées** : `opentelemetry-distro` et les instrumentations suivent une numérotation commune (`0.66b1` pour un SDK `1.45.1`), à mettre à jour ensemble.

## Conclusion

En Python, l'auto-instrumentation se résume à deux paquets, une commande de bootstrap à la construction de l'image et un préfixe au lancement. Elle produit des spans, des métriques et des logs pour les bibliothèques qu'elle connaît, configurés entièrement par l'environnement. Ses angles morts se découvrent en lisant les traces : anciens noms d'attributs tant que les conventions stables ne sont pas activées, raccourcis non tracés, processus créés par fork. L'instrumentation manuelle comble les trous restants avec quelques spans et attributs placés là où une question reste sans réponse.

## Ressources utiles

- [Python : auto-instrumentation sans code](https://opentelemetry.io/docs/zero-code/python/)
- [Python : instrumentation manuelle](https://opentelemetry.io/docs/languages/python/instrumentation/)
- [Variables d'environnement du SDK](https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/)
- [Migration des conventions HTTP](https://opentelemetry.io/docs/specs/semconv/non-normative/http-migration/)
- [Bibliothèques d'instrumentation Python (opentelemetry-python-contrib)](https://github.com/open-telemetry/opentelemetry-python-contrib)

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/professionnel/sonu-k8s-cluster" title="Cluster Kubernetes interne DiscoDiode">Auto-instrumentation des applications internes FastAPI du cluster, conventions sémantiques stables activées dès le premier déploiement.</ProjectLink>
</ProjectLinks>
