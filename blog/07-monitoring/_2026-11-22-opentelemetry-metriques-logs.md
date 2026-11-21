---
title: "OpenTelemetry : métriques et logs corrélés"
description: "Le SDK OpenTelemetry produit métriques, logs et traces dans le même processus et y inscrit les mêmes identifiants. Comment un log mène à sa trace, comment un point de métrique mène à une requête réelle, et ce qu'il faut configurer pour cela."
tags: [monitoring, devops]
series: opentelemetry
---

Une courbe de latence signale qu'un service ralentit, une trace montre une requête lente, un log donne le message d'erreur. Tant que ces trois sources vivent dans des outils séparés, passer de l'une à l'autre demande de recouper à la main des horodatages et des noms de service, avec le risque de lire les logs d'une autre requête que celle qui pose problème. Le SDK [OpenTelemetry](./2026-11-01-opentelemetry.md) produit les trois signaux dans le même processus, au moment où la requête est traitée : il connaît la [trace](./2026-11-08-opentelemetry-traces.md) en cours et peut inscrire son identifiant dans chaque log et dans quelques points de métrique. Il reste à configurer le stockage et l'affichage pour que ces identifiants deviennent des liens.

<!--truncate-->

## Les métriques du SDK

Une métrique ne décrit pas une requête mais un agrégat : combien de requêtes, réparties sur quelles durées, pendant une période. Elle coûte peu à stocker, quel que soit le trafic, et sert de base aux alertes.

Les bibliothèques d'instrumentation produisent leurs métriques en même temps que leurs spans, sous les noms fixés par les conventions sémantiques. Côté Prometheus, la conversion remplace les points par des tirets bas et ajoute l'unité au nom.

| Métrique OpenTelemetry | Nom côté Prometheus | Mesure |
|---|---|---|
| `http.server.request.duration` | `http_server_request_duration_seconds` | requêtes reçues |
| `http.client.request.duration` | `http_client_request_duration_seconds` | appels sortants |
| `db.client.operation.duration` | `db_client_operation_duration_seconds` | requêtes SQL |
| `http.server.active_requests` | `http_server_active_requests` | requêtes en cours |

Les trois premières sont des histogrammes. Chaque durée mesurée incrémente le compteur de l'intervalle, ou *bucket*, qui la contient, et l'histogramme expose aussi le nombre total de mesures et leur somme. Les conventions sémantiques recommandent pour les durées HTTP quatorze bornes, de 5 ms à 10 s. Une seule métrique donne ainsi le débit, le taux d'erreur, grâce à l'attribut `http.response.status_code`, et une estimation des percentiles de latence.

La ressource du service ne devient pas d'elle-même un ensemble de labels. Le récepteur OTLP de Prometheus place `service.name` (préfixé de `service.namespace` s'il existe) dans le label `job` et `service.instance.id` dans `instance`, puis range les autres attributs de ressource dans une série à part, `target_info`. Seuls les attributs listés dans `promote_resource_attributes` deviennent des labels de chaque série, par exemple `service.name` sous la forme `service_name`. Une requête qui filtre sur `deployment_environment_name` ne trouve rien tant que cet attribut n'est pas promu.

## Export et temporalité

Le SDK exporte ses métriques à intervalle fixe, 60 secondes par défaut (`OTEL_METRIC_EXPORT_INTERVAL`, en millisecondes). Une métrique a donc jusqu'à une minute de retard sur la réalité, avant même la fenêtre de `rate()` et la clause `for` des alertes. Réduire l'intervalle multiplie d'autant les écritures dans le backend.

Il utilise par défaut une temporalité cumulative : chaque export envoie la valeur totale depuis le démarrage du processus, et non l'écart depuis l'export précédent. C'est le modèle de Prometheus, dont les compteurs ne font que croître et dont la fonction `rate()` calcule elle-même les écarts. La temporalité delta, attendue par d'autres backends, n'est acceptée par Prometheus qu'au travers d'une fonction expérimentale de conversion.

Un service qui ne reçoit plus aucune requête continue donc d'exporter ses compteurs, inchangés : son débit calculé tombe à zéro, et la série ne disparaît pas. Une alerte sur un débit nul fonctionne alors sans recourir à `absent()`, tant que le processus tourne.

Le code peut définir ses propres métriques par l'API (`meter.create_counter`, `meter.create_histogram`) pour les grandeurs métier, sur le même principe que les spans manuels. Une *View*, déclarée à l'initialisation du SDK, modifie une métrique existante sans toucher à l'instrumentation : bornes des buckets, attributs conservés, ou suppression pure et simple d'une métrique inutile.

## Les logs : un pont vers les bibliothèques existantes

OpenTelemetry ne propose pas de nouvelle façon d'écrire des logs. Il se branche sur les bibliothèques existantes au moyen d'un pont (*bridge*). En Python, l'instrumentation du module `logging`, installée d'office par `opentelemetry-bootstrap`, ajoute par défaut au logger racine un gestionnaire qui convertit chaque enregistrement en log OpenTelemetry et l'exporte en OTLP avec les autres signaux, dès que `OTEL_LOGS_EXPORTER` vaut `otlp`. Le signal logs du SDK Python reste en développement : ses classes vivent encore dans un module `_logs`, dont l'interface peut changer d'une version à l'autre. Un appel ordinaire comme `log.warning("colis %s inconnu", colis_id)` produit alors un enregistrement de ce type :

| Champ | Valeur | Origine |
|---|---|---|
| `body` | `colis 9 inconnu` | message formaté |
| `severity_text` | `WARN` | niveau du logger, `WARNING` converti |
| `trace_id` | `6cc36fb356a25fb3d53c6cc42ba7c327` | contexte actif |
| `span_id` | `ff36fd8f8d655b1a` | contexte actif |
| `service.name` | `colis` | ressource |

Le gestionnaire lit le contexte actif au moment de l'appel. Le log reçoit le `trace_id` et le `span_id` de la requête en cours, la ressource du service et l'emplacement dans le code (fichier, fonction, ligne). Un log lu sur la sortie standard d'un conteneur porte le même message, mais sans ces identifiants : il ne sait pas à quelle requête il appartient.

Loki 3 reçoit ces logs en OTLP. Une liste d'attributs de ressource, dont `service.name`, devient des labels indexés (`service_name`). Les attributs propres à chaque ligne, dont `trace_id` et `span_id`, sont rangés en *structured metadata* : des métadonnées attachées à la ligne, interrogeables, qui ne créent pas de nouveau flux. Un label par identifiant de trace créerait un flux par requête et ferait exploser l'index de Loki.

## Des logs aux traces, et retour

Le lien entre logs et traces se configure dans les datasources de Grafana, pas dans OpenTelemetry. Deux réglages le rendent cliquable dans les deux sens.

Sur la datasource Loki, un champ dérivé (`derivedFields`) lit `trace_id`, dans les métadonnées de la ligne ou par une expression régulière dans son texte, et en fait un lien vers la datasource Tempo. Sur la datasource Tempo, `tracesToLogsV2` ajoute à chaque span un lien qui lance une requête Loki filtrée sur la fenêtre de temps du span et, si la configuration le prévoit, sur son `trace_id` ou sur des labels tirés de sa ressource, comme le nom du service.

Un message d'erreur mène ainsi à la trace de la requête qui l'a produit, et un span lent aux logs écrits pendant son exécution. Ces réglages se versionnent avec le reste de la [configuration de Grafana](./2026-10-17-grafana-provisioning.md). Quand les logs ne portent pas d'identifiant de trace, le lien depuis un span ne peut filtrer que sur le temps et les labels communs : il affiche tous les logs du service autour de la requête, à trier à la main.

## Des métriques aux traces : les exemplars

Un histogramme agrège des milliers de requêtes et perd l'identité de chacune. Un exemplar en conserve quelques-unes : une valeur mesurée réelle, accompagnée du `trace_id` de la requête qui l'a produite. Dans Grafana, les exemplars apparaissent comme des points autour des courbes, et le survol d'un point propose d'ouvrir la trace correspondante.

Une courbe de 95ᵉ percentile est une borne haute, sous laquelle se trouvent 95 % des requêtes, alors qu'un exemplar est placé à la durée de sa propre requête. La plupart des points se trouvent donc sous la courbe, et seuls quelques-uns la dépassent : ceux qui mènent aux requêtes lentes. Si l'axe vertical s'ajuste automatiquement aux courbes, les points les plus bas sortent du cadre ; fixer le bas de l'axe à zéro les rend visibles.

Le SDK choisit ses exemplars selon deux règles. Le filtre, `trace_based` par défaut (`OTEL_METRICS_EXEMPLAR_FILTER`), ne retient que les mesures faites pendant une trace échantillonnée, pour que chaque exemplar mène à une trace qui existe. Le réservoir des histogrammes garde au plus une mesure par bucket entre deux exports, tirée au hasard parmi celles du bucket : les exemplars couvrent ainsi toute la plage des durées au lieu de se concentrer autour de la valeur la plus fréquente.

Côté stockage, Prometheus ne garde les exemplars que si la fonction `exemplar-storage` est activée (`--enable-feature=exemplar-storage`). La datasource Prometheus de Grafana doit aussi savoir quel label contient l'identifiant de trace, par `exemplarTraceIdDestinations`. Le SDK utilise `trace_id`, d'autres producteurs, comme le générateur de métriques de Tempo, utilisent `traceID`, et chaque nom demande sa propre entrée dans la configuration de la datasource :

```yaml
jsonData:
  exemplarTraceIdDestinations:
    - { name: trace_id, datasourceUid: tempo }
    - { name: traceID, datasourceUid: tempo }
```

Un nom absent de cette liste donne des points affichés mais non cliquables.

## Pièges et limites

Les bornes des buckets limitent la précision. Toutes les durées au-delà de 10 s tombent dans le dernier intervalle, sans borne supérieure (`+Inf`) : un service dont les requêtes lentes durent 30 s ou 2 min affiche le même percentile élevé, plafonné à 10 s. Une *View* qui ajoute des bornes plus hautes corrige ce plafond pour les services concernés.

Les exemplars suivent l'échantillonnage. Avec le filtre `trace_based`, un service échantillonné à 1 % n'a d'exemplars que pour 1 % de ses requêtes, et la requête lente qui intéresse a toutes les chances de ne pas en avoir.

Seuls les logs écrits à travers le SDK portent un identifiant de trace. Un composant non instrumenté, un serveur web qui écrit ses propres journaux d'accès ou un processus qui écrit directement sur la sortie standard n'en ont pas, et la collecte des journaux des conteneurs reste nécessaire à côté de l'export OTLP.

Les deux chemins se recouvrent. Un service dont les logs partent en OTLP et sont aussi lus sur sa sortie standard par un agent apparaît deux fois dans Loki, sous deux ensembles de labels différents. Il faut choisir un chemin par service, ou exclure de la collecte des conteneurs ceux qui exportent déjà en OTLP.

## Alternatives écartées

La bibliothèque cliente de Prometheus expose des métriques que Prometheus vient lire (*scrape*), sans agent ni exporteur. Elle convient à un service qui n'a besoin que de métriques. Elle produit en revanche ses propres noms, différents de ceux des conventions sémantiques, et ne connaît pas les traces : pas d'exemplar sans code supplémentaire.

Des logs structurés en JSON sur la sortie standard, enrichis de l'identifiant de trace (l'instrumentation Python sait l'ajouter au format des messages avec `OTEL_PYTHON_LOG_CORRELATION`), passent par la collecte habituelle des conteneurs. Le lien vers la trace fonctionne alors aussi, au prix d'une expression régulière ou d'un analyseur JSON dans l'agent de collecte, et sans les attributs de ressource que le pont OTLP ajoute d'office.

## Conclusion

Dès qu'un service est tracé, la corrélation remplace le recoupement d'horodatages par des liens, d'une courbe à une requête réelle puis à ses logs. Le SDK fournit les identifiants sans effort, mais les liens dépendent de réglages répartis entre Prometheus, Loki et Grafana, qui échouent sans bruit : un label d'exemplar mal nommé donne des points inertes, un attribut non promu donne une requête vide. Ces réglages se vérifient une fois, sur une requête connue, avant de compter sur eux pendant un incident.

## Ressources utiles

- [Concepts : métriques](https://opentelemetry.io/docs/concepts/signals/metrics/)
- [Concepts : logs](https://opentelemetry.io/docs/concepts/signals/logs/)
- [Spécification : exemplars](https://opentelemetry.io/docs/specs/otel/metrics/sdk/#exemplar)
- [Prometheus : récepteur OTLP](https://prometheus.io/docs/guides/opentelemetry/)
- [Loki : ingestion OTLP](https://grafana.com/docs/loki/latest/send-data/otel/)
- [Grafana : datasource Tempo, liens vers les logs](https://grafana.com/docs/grafana/latest/datasources/tempo/configure-tempo-data-source/)

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/personnel/homelab" title="HomeLab">Datasources Prometheus, Loki et Tempo reliées dans Grafana : les exemplars des métriques mènent aux traces, et un span ouvre les logs Loki de la minute qui l'entoure, faute d'identifiant de trace dans les journaux des conteneurs.</ProjectLink>
</ProjectLinks>
