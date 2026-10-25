---
title: "Loki"
description: "Loki, système d'agrégation de logs inspiré de Prometheus : indexation des seuls labels, flux et cardinalité, modes de déploiement, schéma et rétention, LogQL, et pièges d'exploitation d'une instance monolithique sur Kubernetes."
tags: [monitoring, devops]
---

Sur une infrastructure de dizaines de conteneurs répartis sur plusieurs nœuds, retrouver les lignes de logs liées à un incident impose de les consulter machine par machine, et les logs d'un conteneur supprimé disparaissent avec lui. Un visualiseur en temps réel comme Dozzle affiche le flux `docker logs` dans un navigateur, mais il ne stocke rien : une fois le conteneur recréé, il n'y a plus rien à interroger, et rien à agréger ni sur quoi alerter. Centraliser les logs dans un moteur à indexation plein texte règle la dispersion, mais le coût de l'index, en disque comme en mémoire, augmente avec le volume ingéré. Loki, créé par Grafana Labs sur le modèle de Prometheus, fait un autre choix : il n'indexe que les métadonnées des logs, leurs labels, et parcourt le contenu au moment de la requête.

<!--truncate-->

## Indexer les labels, pas le contenu

Elasticsearch, OpenSearch et Splunk construisent un index inversé de chaque mot de chaque ligne. N'importe quelle recherche plein texte est alors rapide, mais l'index peut approcher la taille des données, et l'ingestion doit le tenir à jour en continu. Loki inverse ce compromis. Chaque ligne arrive avec un petit jeu de labels (`namespace`, `app`, `container`), et seuls ces labels sont indexés. Le contenu est compressé par blocs, les *chunks*, puis écrit sur disque ou dans un stockage objet.

L'unité de base est le **flux** (*stream*) : l'ensemble des lignes qui portent exactement le même jeu de labels. Une requête commence toujours par choisir des flux grâce à l'index, puis lit et filtre le contenu de leurs chunks. L'analogie est celle d'une bibliothèque classée par rayon et par étagère, sans catalogue des mots contenus dans les livres : trouver le bon rayon est immédiat, trouver une phrase oblige à feuilleter les livres de ce rayon.

Le modèle reprend celui de [Prometheus](./2025-11-21-prometheus-introduction.md) : mêmes sélecteurs de labels, langage de requête calqué sur PromQL. Quand métriques et logs partagent les labels `namespace` et `app`, Grafana passe d'un pic sur un graphique aux lignes du même service sur la même période.

## Labels et cardinalité

Les performances de Loki dépendent presque entièrement du choix des labels. Chaque combinaison distincte de valeurs crée un flux, avec son propre chunk ouvert en mémoire et son entrée d'index. Un label `request_id` ou `user_id` produirait un flux par requête ou par utilisateur, chacun réduit à quelques lignes : la compression devient inefficace, l'index grossit et l'ingestion ralentit. À l'inverse, un seul label pour tout un cluster obligerait chaque requête à décompresser tout le volume de la période.

La règle pratique est de réserver les labels aux dimensions bornées et stables, qui servent à choisir *où* chercher : namespace, application, conteneur, nœud, flux stdout ou stderr. Ce qui sert à choisir *quoi* chercher (niveau de log, code HTTP, chemin, identifiant) reste dans la ligne et se filtre à la requête. Recopier tous les labels Kubernetes d'un pod est le piège classique : `pod-template-hash` change à chaque déploiement et multiplie les flux sans rien apporter.

Loki 3 ajoute deux mécanismes. Les métadonnées structurées (*structured metadata*) attachent à chaque ligne des champs à forte cardinalité, comme `trace_id`, sans créer de flux, et ces champs restent filtrables à la requête. Le label `service_name`, lui, est déduit automatiquement à l'ingestion d'un label existant (`service_name`, `app`, `app_kubernetes_io_name`, `container`…) et sert de point d'entrée à l'exploration des logs dans Grafana.

## Architecture et modes de déploiement

Le chemin d'écriture passe par le *distributor*, qui valide les lignes (débit, labels) et les répartit par hachage des labels du flux, puis par les *ingesters*, qui accumulent chaque flux en mémoire et écrivent un chunk sur le stockage quand il est plein ou trop ancien. Le chemin de lecture passe par les *queriers*, qui interrogent à la fois le stockage et les données encore en mémoire. Le *compactor* fusionne les index et applique la rétention.

Ces composants peuvent tourner de trois façons :

| Mode | Principe | Volume indicatif |
| --- | --- | --- |
| Monolithique | Un seul processus porte tous les composants | Jusqu'à environ 20 Go par jour |
| Simple scalable | Trois groupes : lecture, écriture, backend | Jusqu'à près d'1 To par jour |
| Microservices | Un déploiement par composant | Très gros clusters |

Le mode simple scalable est en cours de dépréciation : la documentation annonce son retrait avec Loki 4.0, au profit du monolithique (éventuellement répliqué) ou des microservices. Pour un cluster qui produit quelques centaines de mégaoctets de logs par jour, le monolithique suffit largement. Un seul pod, un volume persistant, et les caches, la passerelle nginx et le *canary* fournis par le chart peuvent tous être désactivés.

Côté installation, le chart `grafana/loki` n'est plus maintenu que pour Grafana Enterprise Logs depuis le 16 mars 2026. La version open source est suivie par le dépôt `grafana-community/helm-charts`, avec une douzaine de versions majeures du chart entre les deux, chacune avec ses changements cassants. Le chart `loki-stack`, qui installait Loki 2.x et Promtail ensemble, est abandonné depuis plus longtemps encore.

## Stockage, schéma et rétention

L'index et les chunks sont décrits par une entrée de schéma datée. Le schéma actuel est `tsdb` en version `v13`, qui remplace l'ancien index `boltdb-shipper`. La date `from` d'une entrée ne se modifie jamais après coup : Loki s'en sert pour savoir comment lire les données écrites à partir de ce jour. Changer de schéma revient à ajouter une nouvelle entrée datée dans le futur, l'ancienne continuant de servir pour les données plus anciennes.

```yaml
schemaConfig:
  configs:
    - from: "2026-10-01"
      store: tsdb
      schema: v13
```

La rétention est appliquée par le compactor (`retention_enabled: true`, `retention_period: 720h` dans `limits_config`). Les données expirées sont d'abord marquées, puis supprimées après un délai (`retention_delete_delay`, 2 heures par défaut). Une durée plus courte peut être fixée par sélecteur de flux, par exemple pour un namespace de développement. Avec un stockage objet, une règle de cycle de vie sur le bucket, plus longue que la rétention de Loki, sert de filet de sécurité.

`auth_enabled: false` place Loki en mode mono-locataire : toutes les données vont dans le locataire implicite `fake`, et les clients n'ont pas à envoyer d'en-tête. En multi-locataire, chaque requête porte l'en-tête `X-Scope-OrgID`, que Loki croit sur parole. Un proxy placé devant lui doit l'authentifier.

## LogQL

Une requête LogQL commence par un sélecteur de flux, entre accolades, qui doit contenir au moins un matcher positif. `{status!="200"}` seul est refusé, pour ne pas balayer toute la base. Le sélecteur est suivi d'un pipeline, appliqué ligne à ligne, dans un ordre qui compte pour le coût :

1. **filtres de lignes** (`|=`, `!=`, `|~`), les moins coûteux, à placer en premier ;
2. **parsers** (`json`, `logfmt`, `pattern`, `regexp`), qui extraient des champs de la ligne ;
3. **filtres sur les champs extraits** (`level="error"`, `status >= 500`).

```text
{namespace="production", app="api"} |= "timeout" | json | status >= 500
```

Les champs extraits par un parser n'existent qu'au moment de la requête. Ils ne sont pas indexés et n'ont donc aucun coût de cardinalité : c'est là que vont les codes HTTP, les chemins et les identifiants.

Les requêtes de métriques transforment des lignes en séries temporelles. `count_over_time` et `rate` comptent des lignes sur une fenêtre, et `unwrap` convertit un champ numérique extrait en échantillons, sur lesquels s'appliquent `avg_over_time` ou `quantile_over_time`. Le taux d'erreurs par application s'écrit ainsi :

```text
sum by (app) (rate({namespace="production"} | json | level="error" [5m]))
```

Le coût d'une requête est proportionnel au volume lu, c'est-à-dire au nombre de flux sélectionnés multiplié par la période couverte. Le sélecteur et la fenêtre pèsent donc plus sur ce coût que l'ordre des étapes du pipeline. Une recherche plein texte sur un mois de logs de tout un cluster reste possible, mais elle décompresse tout ce mois.

## Collecte

Loki ne lit rien de lui-même : un agent lit les logs, leur attache des labels et les pousse en HTTP sur `/loki/api/v1/push`. Sur Kubernetes, cet agent tourne en DaemonSet et lit les fichiers que le runtime de conteneurs écrit dans `/var/log/pods`. Seules les sorties standard et d'erreur sont concernées : une application qui écrit dans un fichier interne au conteneur échappe à cette collecte.

Promtail, l'agent historique, est en fin de vie depuis le 2 mars 2026. Son remplaçant, Grafana Alloy, est une distribution de l'OpenTelemetry Collector qui collecte aussi métriques et traces. Sa configuration, la migration depuis Promtail et la collecte des événements Kubernetes font l'objet de l'article [Alloy](./2026-10-25-alloy.md).

## Pièges d'exploitation

### Loki qui ingère ses propres logs

Au niveau `info`, Loki journalise chacune des requêtes qu'il traite : querier, compactor, gestion des tables. Comme l'agent collecte aussi les logs du pod Loki, chaque consultation produit de nouvelles lignes à ingérer. Sur un petit cluster, ces lignes ont atteint environ 146 000 par heure, soit l'essentiel du volume du namespace où tournait Loki. `server.log_level: warn` coupe la boucle sans rien perdre d'utile : les avertissements et les erreurs restent journalisés.

### Le volume d'un StatefulSet ne se redimensionne pas par le chart

En mode monolithique, Loki tourne dans un StatefulSet dont le volume est déclaré par `volumeClaimTemplates`, un champ que Kubernetes refuse de modifier. Changer la taille ou la classe de stockage dans les values fait échouer le `helm upgrade`. Il faut supprimer le StatefulSet sans ses pods ni ses volumes (`kubectl delete sts loki --cascade=orphan`), puis redéployer : le nouveau StatefulSet reprend les pods existants. Agrandir un volume existant passe en revanche par la PVC elle-même, si la classe de stockage l'autorise.

### fsGroup et redémarrages lents

Le chart fait tourner Loki sous un utilisateur non root et pose un `fsGroup` sur le pod. Par défaut, le kubelet réapplique alors propriétaire et droits à chaque fichier du volume à chaque démarrage. Sur un volume rempli de milliers de chunks, cette passe allonge chaque redémarrage. `fsGroupChangePolicy: OnRootMismatch` limite le travail au cas où la racine du volume n'a pas déjà les bons droits.

### Un seul réplica

Le mode monolithique à un réplica n'a pas de haute disponibilité. Pendant un redémarrage, les agents mettent les lignes en tampon et réessaient, mais une indisponibilité qui dure plus longtemps que leur tampon fait perdre des logs. Une sonde de disponibilité sur `/ready` et une alerte sur le remplissage du volume couvrent les pannes les plus probables.

## Alerting et corrélation

Le *ruler* de Loki évalue des règles LogQL au format des règles Prometheus. Les règles d'alerte partent vers Alertmanager, et les règles d'enregistrement écrivent leur résultat dans Prometheus par *remote write*, où il devient une série comme une autre. Une alerte sur un taux de lignes d'erreur reste toutefois un indicateur fragile, qui dépend du format et de la verbosité de chaque application. Quand une métrique exposée par l'application existe, elle est préférable.

La corrélation avec les traces passe par un identifiant commun. Si les applications écrivent un `trace_id` dans leurs logs, stocké en métadonnée structurée, un *derived field* de la datasource Loki dans Grafana transforme ce champ en lien vers la trace correspondante dans Tempo.

## Limites

- **Recherche plein texte** : sans index du contenu, une recherche sans label sélectif sur une longue période est lente. Loki convient à la recherche ciblée (un service, une fenêtre d'incident), pas à l'analyse ad hoc de tout l'historique.
- **Dépendance aux labels** : un mauvais choix de labels ne se corrige que pour les données à venir ; les flux déjà écrits gardent leur découpage.
- **Format libre** : sans logs structurés (JSON ou logfmt), chaque requête doit reconstruire les champs par expression régulière ou par motif.

## Conclusion

Loki fait un compromis explicite : un index réduit aux labels, peu coûteux à maintenir, et un filtrage du contenu effectué à la lecture. Ce compromis tient tant que les labels restent peu nombreux et bornés ; les champs à forte cardinalité vont dans le contenu des lignes ou dans les métadonnées structurées. À l'échelle d'un cluster de quelques nœuds, une instance monolithique sur un volume persistant suffit, à condition de régler ses propres logs, la rétention et le comportement de son StatefulSet.

## Ressources utiles

- [Documentation officielle Loki](https://grafana.com/docs/loki/)
- [Modes de déploiement](https://grafana.com/docs/loki/latest/get-started/deployment-modes/)
- [Référence LogQL](https://grafana.com/docs/loki/latest/query/)
- [Bonnes pratiques sur les labels](https://grafana.com/docs/loki/latest/get-started/labels/bp-labels/)

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/professionnel/sonu-k8s-cluster" title="Cluster Kubernetes DiscoDiode">Loki 3 monolithique sur volume Longhorn, avec 30 jours de rétention, pour les logs des pods et les événements Kubernetes de tout le cluster, consultés dans Grafana.</ProjectLink>
  <ProjectLink to="/docs/projects/professionnel/github-arc-kubeadm" title="GitHub ARC Kubeadm">Collecte centralisée des logs des runners ARC pour le débogage et l'audit.</ProjectLink>
</ProjectLinks>
