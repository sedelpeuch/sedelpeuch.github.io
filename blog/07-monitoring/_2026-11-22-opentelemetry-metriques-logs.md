---
title: "OpenTelemetry : métriques et logs corrélés"
description: "Métriques et logs OpenTelemetry et leurs liens avec les traces : histogrammes du SDK et temporalité cumulative, pont avec le module logging, trace_id dans les logs Loki, liens logs vers traces dans Grafana, exemplars et choix de leurs valeurs."
tags: [monitoring, devops]
series: opentelemetry
---

Une courbe de latence signale qu'un service ralentit, une trace montre la requête lente, un log donne le message d'erreur. Tant que ces trois sources vivent dans des outils séparés, passer de l'une à l'autre demande de recouper des horodatages et des noms de service à la main. Le SDK [OpenTelemetry](./2026-11-01-opentelemetry.md) produit les trois signaux dans le même processus, au moment où la requête est traitée, et peut donc y inscrire les mêmes identifiants. Cet article décrit les métriques et les logs produits par le SDK, puis les deux liens qui les rattachent aux [traces](./2026-11-08-opentelemetry-traces.md) : l'identifiant de trace dans chaque log, et les exemplars sur les métriques.

<!--truncate-->

## Les métriques du SDK

Une métrique ne décrit pas une requête mais un agrégat : combien de requêtes, réparties sur quelles durées, pendant une période. Elle coûte peu à stocker et sert de base aux alertes.

Les bibliothèques d'instrumentation produisent leurs métriques en même temps que leurs spans, sous les noms fixés par les conventions sémantiques :

| Métrique OpenTelemetry | Nom côté Prometheus | Source |
|---|---|---|
| `http.server.request.duration` | `http_server_request_duration_seconds` | requêtes reçues |
| `http.client.request.duration` | `http_client_request_duration_seconds` | appels sortants |
| `db.client.operation.duration` | `db_client_operation_duration_seconds` | requêtes SQL |
| `http.server.active_requests` | `http_server_active_requests` | requêtes en cours |

Les trois premières sont des **histogrammes** : chaque durée mesurée incrémente le compteur du *bucket* qui la contient (0 à 5 ms, 5 à 10 ms… 750 ms à 1 s…), et l'histogramme expose aussi le nombre total de mesures et leur somme. Une seule métrique suffit à calculer le débit, le taux d'erreur (avec l'attribut `http.response.status_code`) et les percentiles de latence. La conversion vers Prometheus remplace les points par des tirets bas et ajoute l'unité au nom.

Le SDK exporte ses métriques à intervalle fixe, 60 secondes par défaut (`OTEL_METRIC_EXPORT_INTERVAL`, en millisecondes). Il utilise une **temporalité cumulative** : chaque export envoie la valeur totale depuis le démarrage du processus, et non l'écart depuis le dernier export. Une conséquence pratique : un service qui ne reçoit plus aucune requête continue d'exporter ses compteurs, inchangés, et son débit calculé tombe à zéro au lieu que la série disparaisse. Une alerte sur un débit nul fonctionne donc sans recourir à `absent()`.

Le code peut définir ses propres métriques par l'API (`meter.create_counter`, `meter.create_histogram`) pour les grandeurs métier, sur le même principe que les spans manuels.

## Les logs : un pont plutôt qu'une API

OpenTelemetry ne propose pas de nouvelle façon d'écrire des logs. Il se branche sur les bibliothèques existantes. En Python, `OTEL_PYTHON_LOGGING_AUTO_INSTRUMENTATION_ENABLED=true` ajoute au module `logging` un gestionnaire qui convertit chaque enregistrement en log OpenTelemetry et l'exporte en OTLP. Un appel ordinaire comme `log.warning("colis %s inconnu", colis_id)` produit alors :

```text
body:            colis 9 inconnu
severity_text:   WARN
trace_id:        6cc36fb356a25fb3d53c6cc42ba7c327
span_id:         ff36fd8f8d655b1a
service.name:    colis
```

Le gestionnaire lit le contexte actif au moment de l'appel : le log reçoit le `trace_id` et le `span_id` de la requête en cours, ainsi que la ressource du service et l'emplacement dans le code (fichier, fonction, ligne). La différence avec un log lu depuis la sortie standard d'un conteneur tient à ces identifiants : le log sait à quelle requête il appartient.

Loki 3 reçoit ces logs en OTLP. Les attributs de ressource choisis deviennent des labels (`service_name`), et les attributs propres à chaque ligne, dont `trace_id`, sont rangés en *structured metadata* : interrogeables, sans multiplier les flux comme le ferait un label par identifiant de trace.

## Des logs aux traces, et retour

Le lien entre logs et traces se configure dans les datasources de Grafana, pas dans OpenTelemetry. Deux réglages le rendent cliquable dans les deux sens :

- sur la datasource Loki, un **champ dérivé** (`derivedFields`) reconnaît `trace_id` dans un log et en fait un lien vers la datasource Tempo ;
- sur la datasource Tempo, **`tracesToLogsV2`** ajoute à chaque span un bouton qui lance la requête Loki filtrée sur le `trace_id` et le service du span.

Le diagnostic peut alors partir d'un message d'erreur et ouvrir la trace complète de la requête qui l'a produit, ou partir d'un span lent et afficher les logs écrits pendant son exécution. Ces réglages se versionnent avec le reste de la [configuration de Grafana](./2026-10-17-grafana-provisioning.md).

## Des métriques aux traces : les exemplars

Un histogramme agrège des milliers de requêtes et perd l'identité de chacune. Un **exemplar** en conserve quelques-unes : une valeur mesurée réelle, accompagnée du `trace_id` de la requête qui l'a produite. Dans Grafana, les exemplars apparaissent comme des points autour des courbes ; le survol d'un point propose d'ouvrir la trace correspondante.

La position de ces points surprend souvent. Une courbe de 95ᵉ percentile est une borne haute, sous laquelle se trouvent 95 % des requêtes ; un exemplar est placé à la durée de sa propre requête. La plupart des points se trouvent donc sous la courbe, et seuls quelques-uns la dépassent : ce sont ceux qui mènent aux requêtes lentes. Si l'axe vertical est ajusté automatiquement aux courbes, les points les plus bas sortent du cadre ; fixer le bas de l'axe à zéro les rend visibles.

Le SDK choisit ses exemplars selon deux règles :

- le **filtre** `trace_based`, par défaut, ne retient que les mesures faites pendant une trace échantillonnée, pour que chaque exemplar mène à une trace qui existe ;
- le **réservoir** des histogrammes garde une mesure récente par bucket, si bien que les exemplars couvrent toute la plage des durées au lieu de se concentrer autour d'une valeur.

Côté stockage, Prometheus ne garde les exemplars que si la fonction `exemplar-storage` est activée. La datasource Prometheus de Grafana doit aussi savoir quel label contient l'identifiant de trace (`exemplarTraceIdDestinations`) : le SDK utilise `trace_id`, d'autres producteurs utilisent `traceID`, et un nom absent de la configuration donne des points affichés mais non cliquables.

## Limites

- **Intervalle d'export** : à 60 secondes par défaut, une métrique a jusqu'à une minute de retard sur la réalité, en plus de la fenêtre de calcul des requêtes.
- **Exemplars et échantillonnage** : avec le filtre `trace_based`, un service échantillonné à 1 % n'a d'exemplars que pour 1 % de ses requêtes.
- **Logs hors SDK** : les logs écrits par un composant non instrumenté, ou directement sur la sortie standard, ne portent pas d'identifiant de trace. La collecte des fichiers de logs des conteneurs reste nécessaire à côté.
- **Doublons** : un service dont les logs sont à la fois exportés en OTLP et lus sur sa sortie standard par un agent apparaît deux fois dans le backend.

## Conclusion

Le SDK produit métriques, logs et traces au même endroit et au même moment, ce qui lui permet d'y inscrire les mêmes identifiants. Chaque log porte le `trace_id` de la requête en cours, et les histogrammes conservent quelques exemplars rattachés à des traces réelles. Ces identifiants ne deviennent des liens qu'une fois les datasources de Grafana configurées : un champ dérivé sur Loki, `tracesToLogsV2` sur Tempo, et le bon nom de label pour les exemplars sur Prometheus.

## Ressources utiles

- [Concepts : métriques](https://opentelemetry.io/docs/concepts/signals/metrics/)
- [Concepts : logs](https://opentelemetry.io/docs/concepts/signals/logs/)
- [Spécification : exemplars](https://opentelemetry.io/docs/specs/otel/metrics/sdk/#exemplar)
- [Loki : ingestion OTLP](https://grafana.com/docs/loki/latest/send-data/otel/)
- [Grafana : datasource Tempo, liens vers les logs](https://grafana.com/docs/grafana/latest/datasources/tempo/configure-tempo-data-source/)

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/professionnel/sonu-k8s-cluster" title="Cluster Kubernetes interne DiscoDiode">Logs applicatifs portant l'identifiant de trace dans Loki, liens entre logs, traces et exemplars configurés dans les datasources versionnées de Grafana.</ProjectLink>
</ProjectLinks>
