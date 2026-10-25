---
title: "Garage : cluster multi-nœuds sur Kubernetes"
description: "Étendre un stockage S3 Garage au-delà du disque d'une machine en l'exécutant sur plusieurs nœuds d'un cluster Kubernetes : ce que Kubernetes ignore d'un nœud de stockage distribué (identité, disque, appartenance au cluster), les pannes qui en résultent lors de l'ajout d'un nœud et leurs corrections, facteur de réplication, métriques par bucket."
tags: [cloud, devops]
---

Un stockage objet S3 hébergé sur un seul serveur finit par buter sur la taille de son disque. Dans le cas traité ici, une instance [Garage](./2026-09-06-s3-garage.md) déployée sur un cluster Kubernetes disposait d'environ 500 Go, et un besoin de 2 To est apparu. Aucune machine du cluster ne porte un disque de cette taille, il n'existe pas de baie de stockage, et un volume Longhorn ne peut pas dépasser le disque d'un nœud. La capacité existe pourtant : plusieurs nœuds ont des disques en grande partie libres. Garage sait agréger ces disques, à condition de tourner sur plusieurs machines et de former un cluster. Le faire sous Kubernetes pose une difficulté moins visible : Kubernetes traite les pods comme interchangeables, alors qu'un nœud de stockage distribué ne l'est pas. Cet article décrit ce décalage, les pannes qu'il a provoquées lors du passage d'un à quatre nœuds, et la façon de les éviter.

<!--truncate-->

## Agréger des disques plutôt qu'agrandir un disque

| Option | Limite |
| --- | --- |
| Agrandir le disque du nœud | Matériel à changer, borne physique atteinte |
| Volume Longhorn plus grand | Un volume ne dépasse pas le disque d'un nœud, moins la réserve de Longhorn |
| NFS ou baie partagée | Absente, et point unique de défaillance |
| **Garage sur plusieurs nœuds** | Chaque nœud apporte son disque ; Garage répartit les objets entre eux |

Garage découpe les objets en blocs et les répartit sur ses nœuds selon un *layout*, une table qui attribue à chaque nœud une zone et une capacité. Ajouter un nœud au layout ajoute sa capacité au cluster ; les clients S3 continuent de s'adresser à un point d'entrée unique et ignorent sur quel disque se trouvent leurs objets.

## Ce que Kubernetes ignore d'un nœud Garage

Un Deployment repose sur une hypothèse simple : ses pods sont identiques, remplaçables et utilisables dès que leur sonde de disponibilité répond. Un nœud Garage contredit cette hypothèse sur trois points.

| Propriété d'un nœud Garage | Hypothèse de Kubernetes par défaut | Conséquence si rien n'est fait |
| --- | --- | --- |
| Identité : ses pairs le joignent à une adresse fixe | Un pod recréé change d'adresse IP | Les autres nœuds perdent sa trace |
| Données : ses blocs sont sur un disque précis | Un volume peut être placé n'importe où | Pod et données sur des machines différentes |
| Appartenance : il ne sert les données qu'une fois intégré au layout | Un pod prêt reçoit du trafic | Requêtes servies par un nœud qui ne connaît rien |

Chacune des sections suivantes traite l'une de ces propriétés. Les deux dernières ont provoqué une panne.

## Identité : StatefulSet et Service headless

Chaque nœud Garage annonce aux autres l'adresse à laquelle le joindre (`rpc_public_addr`). Un StatefulSet donne à ses pods des noms stables (`garage-0`, `garage-1`…), et un Service headless leur associe un nom DNS qui survit aux recréations : `garage-1.garage-headless.storage.svc.cluster.local`. Un initContainer insère ce nom dans la configuration, commune aux pods :

```text
rpc_public_addr = "__POD_NAME__.garage-headless.storage.svc.cluster.local:3901"
```

Deux réglages complètent ce socle. Le Service headless porte `publishNotReadyAddresses: true`, pour que l'adresse d'un nœud qui démarre résolve avant qu'il ne soit déclaré prêt : sans cela, ses pairs ne peuvent pas le joindre et la formation du cluster dépend de l'ordre de démarrage. Une anti-affinité interdit deux pods Garage sur une même machine, qui partageraient alors un disque en annonçant chacun sa capacité.

## Données : un volume local, créé là où est le pod

Garage répartit lui-même les blocs entre ses nœuds. Confier en plus à Longhorn une réplication de chaque volume sur trois machines multiplierait l'espace consommé, à l'opposé du but recherché. Les données de chaque nœud Garage vont donc sur un volume Longhorn à un seul réplica, contraint au disque de la machine qui l'utilise :

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: longhorn-garage
provisioner: driver.longhorn.io
reclaimPolicy: Retain
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
parameters:
  numberOfReplicas: "1"
  dataLocality: strict-local   # le réplica reste sur la machine du pod
  diskSelector: garage         # uniquement les disques réservés à Garage
```

Les métadonnées de Garage suivent la logique inverse : quelques Go seulement, mais leur perte rend inexploitables les blocs du nœud. Elles restent sur un volume répliqué trois fois.

### Panne n° 1 : le volume créé sur la mauvaise machine

La première version de la StorageClass n'indiquait pas `volumeBindingMode`, donc `Immediate`. Dans ce mode, le volume est créé dès l'apparition de la PVC, avant que le scheduler n'ait choisi une machine pour le pod. Longhorn le place selon ses propres critères, puis fixe le PV sur cette machine. Lors de l'ajout du troisième nœud Garage, le volume a été créé sur une machine dont le disque n'était pas réservé à Garage : réplica impossible à placer, pod bloqué, déploiement en échec.

`WaitForFirstConsumer` inverse l'ordre : le scheduler place d'abord le pod en tenant compte de toutes ses contraintes, puis le volume est créé sur cette machine. C'est le mode attendu pour tout stockage local à un nœud. Les paramètres d'une StorageClass étant immuables, la correction impose de supprimer l'objet et de le recréer ; les volumes existants ne sont pas touchés.

## Appartenance : prêt ne veut pas dire membre

Un pod Garage qui démarre n'est pas encore un membre utile du cluster. Il doit être connecté aux autres nœuds, puis recevoir un rôle dans le layout. Cette dernière étape est une décision d'administration, faite par la CLI de Garage, que Kubernetes ne connaît pas.

La sonde de disponibilité ne peut pas refléter ce rôle. L'endpoint `/health` de Garage renvoie 503 tant que le layout n'est pas prêt : utilisé comme readiness probe, il bloquerait le tout premier déploiement, où aucun layout n'existe encore. La sonde se limite donc à vérifier que le port S3 répond.

### Panne n° 2 : des requêtes servies par un nœud qui ne sait rien

Lors d'un ajout de nœud, le nouveau pod a été déclaré prêt dès l'ouverture de son port, et le Service `garage` lui a aussitôt confié sa part des requêtes, réparties entre tous les pods prêts. Sans rôle dans le layout, ce nœud ne connaissait ni les clés ni les buckets : l'API S3 répondait `403 No such key` et l'API d'administration une erreur 500. Pendant environ 25 minutes, le temps de remarquer le problème et d'intégrer le nœud, une fraction des requêtes a échoué de façon apparemment aléatoire, le symptôme le plus difficile à diagnostiquer côté client.

La correction tient dans l'ordre des opérations. Un nœud n'a pas besoin de stocker des données pour servir correctement les requêtes : le rôle de **passerelle** (`-g`) lui donne la connaissance des métadonnées du cluster sans lui attribuer de capacité. Ce rôle s'attribue dès que le pod tourne, et le rôle de stockage peut attendre :

```bash
g() { kubectl -n storage exec garage-0 -- /garage "$@"; }

# Dès que le nouveau pod est Running : membre du cluster, rôle de passerelle
g node connect <node_id>@garage-3.garage-headless.storage.svc.cluster.local:3901
g layout assign -z dc1 -g <node_id>
g layout apply --version 5        # version courante + 1

# Plus tard, une fois son volume à la taille voulue : rôle de stockage
g layout assign -z dc1 -c 725G <node_id>
g layout apply --version 6
```

Une boucle lancée avant le déploiement, qui attend le conteneur en `Running` puis enchaîne ces trois commandes, a ramené la fenêtre d'erreur à moins d'une seconde lors de l'ajout suivant. Après l'attribution du rôle de stockage, Garage déplace des partitions vers le nouveau nœud ; le transfert est terminé lorsque `garage layout history` ne montre plus de version en cours de drainage.

La capacité déclarée reste un peu inférieure à la taille du volume : elle sert à répartir les partitions, et le système de fichiers a besoin de marge.

## Ce que l'agrégation coûte

Avec `replication_factor = 1`, chaque bloc n'existe qu'en un exemplaire : quatre nœuds apportent quatre fois la capacité, pas la moindre redondance. La documentation de Garage réserve cette valeur aux déploiements de test. Le risque augmente avec le nombre de nœuds : les blocs d'un objet volumineux (1 Mio chacun par défaut) se répartissent sur plusieurs disques, si bien que la perte d'un seul disque peut endommager une part des objets bien supérieure à sa part de la capacité.

| `replication_factor` | Tolérance | Capacité utile sur 4 nœuds |
| --- | --- | --- |
| 1 | Aucune panne de disque | Somme des capacités |
| 2 | Lecture pendant une panne, écritures bloquées | Moitié |
| 3 | Lecture et écriture pendant une panne | Tiers |

Le choix de 1 n'est défendable que pour des données reproductibles ou sauvegardées ailleurs, et doit être connu des utilisateurs du stockage. Il fixe aussi la limite de la démarche : agréger des disques sans réplication échange de la capacité contre de la fragilité.

## Savoir quand ajouter un nœud

L'extension suivante se décide sur l'occupation des buckets et de leurs quotas. L'endpoint `/metrics` de Garage expose l'état des disques mais pas celui des buckets. Ces compteurs existent pourtant, tenus à jour par Garage, et l'API d'administration v2 les fournit (`ListBuckets`, puis `GetBucketInfo` par bucket). Un exporter de quelques dizaines de lignes les publie au format Prometheus :

| Métrique | Usage |
| --- | --- |
| `garage_bucket_bytes{bucket}` | Volume occupé par bucket |
| `garage_bucket_quota_max_bytes{bucket}` | Quota du bucket |
| `garage_bucket_objects{bucket}` | Nombre d'objets |
| `garage_bucket_exporter_up` | Distingue un bucket vide d'une API injoignable |

Le rapport `garage_bucket_bytes / garage_bucket_quota_max_bytes` donne la part de quota consommée, utilisable dans une alerte. L'appel ne parcourt aucune liste d'objets : son coût dépend du nombre de buckets, pas de leur contenu.

## Conclusion

Garage permet de dépasser le disque d'une machine en agrégeant ceux de plusieurs nœuds, sans matériel de stockage dédié. Sous Kubernetes, l'essentiel du travail consiste à rendre au nœud Garage ce que Kubernetes ignore de lui : une identité fixe (StatefulSet et Service headless), des données liées à une machine (volume local en `WaitForFirstConsumer`) et une appartenance au cluster qui ne se résume pas à une sonde qui répond (rôle de passerelle attribué dès le démarrage). Les deux pannes rencontrées viennent de valeurs par défaut pensées pour des pods interchangeables. Le même raisonnement s'applique à tout système de stockage distribué exécuté sous Kubernetes : base répartie, moteur de recherche ou file de messages.

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/professionnel/sonu-k8s-cluster" title="Cluster Kubernetes interne SONU">Extension du stockage objet Garage d'un à quatre nœuds, de 500 Go à 2,4 Tio utiles, sans matériel supplémentaire : chart Helm à un pod par nœud, volumes Longhorn locaux, procédure d'ajout de nœud écrite après une coupure partielle, et métriques d'occupation par bucket.</ProjectLink>
</ProjectLinks>
