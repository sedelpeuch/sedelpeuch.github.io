---
title: "Kubernetes : sauvegarde d'une base par CronJob"
description: "Sauvegarder une application avec base MariaDB sur Kubernetes par un CronJob : différence entre snapshot de volume et dump logique, réglages du CronJob, accès à un volume ReadWriteOnce déjà monté, dump cohérent, archive vérifiée avant publication, rotation quotidienne et hebdomadaire par liens physiques, sauvegarde à la demande et restauration."
tags: [orchestration, devops]
---

Un snapshot de volume ne suffit pas à sauvegarder une base de données. Dans le cas traité ici, une application web stocke ses données dans MariaDB et ses fichiers joints sur un second volume, tous deux sur [Longhorn](./2026-09-27-kubernetes-longhorn.md) avec des snapshots quotidiens. Restaurer le snapshot du volume de MariaDB revient à redémarrer la base après une coupure de courant : InnoDB sait le plus souvent rejouer son journal, mais rien ne garantit que l'état obtenu corresponde à un instant où l'application était cohérente, et le snapshot n'est lisible que par Longhorn. Un dump logique, produit par la base elle-même, donne une copie cohérente, portable et lisible. Cet article décrit un CronJob qui produit ce dump avec l'archive des fichiers joints, vérifie le résultat avant de le publier et gère sa propre rotation, sur le même principe que la [sauvegarde des volumes Docker](../03-containerization/2026-09-13-docker-volume-backup.md).

<!--truncate-->

## Snapshot de volume ou dump logique

Un snapshot de volume ressemble à une photo prise d'un bureau en pleine journée : tous les papiers y figurent, mais certains sont à moitié remplis, et rien n'indique lesquels. Un dump revient à demander à la personne assise au bureau une copie propre de ses dossiers, à un instant qu'elle choisit. La base sait quelles transactions sont terminées ; le système de stockage, lui, ne voit que des blocs.

| | Snapshot Longhorn | Dump logique |
| --- | --- | --- |
| Cohérence | Celle d'une coupure brutale (*crash-consistent*) | Celle d'une transaction, garantie par la base |
| Format | Blocs internes à Longhorn | SQL texte, compressé |
| Restauration | Volume entier, à l'état du snapshot | Base entière ou partielle, sur n'importe quel serveur MariaDB |
| Changement de version de la base | Fichiers internes à la version, montée de version en place seulement | SQL rejouable sur un autre serveur ou une autre version |
| Coût | Quasi nul, différentiel | Lecture complète de la base à chaque passage |

Les deux se complètent. Le snapshot permet de revenir en quelques secondes sur une erreur de manipulation ; le dump est la vraie sauvegarde, celle qui se restaure ailleurs et plus tard.

## Le CronJob et ses réglages

Un CronJob crée un Job à heure fixe, et le Job lance un pod qui exécute le script de sauvegarde puis s'arrête. Le planning se lit comme une ligne de crontab, ici `30 2 * * *` pour un passage chaque nuit à 2 h 30. Le reste de la définition n'a rien d'original, à l'exception de quelques champs qui décident du comportement dans les cas limites.

Le premier est `timeZone`. Sans lui, le contrôleur interprète l'horaire dans son propre fuseau, en général UTC, et la sauvegarde de 2 h 30 se déplace d'une heure à chaque changement d'heure. Le champ, stable depuis Kubernetes 1.27, prend un nom de fuseau comme `Europe/Paris`.

Le deuxième est `concurrencyPolicy: Forbid`. Si la sauvegarde de la veille tourne encore à l'heure de la suivante, ce qui arrive quand la base grossit ou qu'un disque ralentit, le nouveau passage est simplement sauté. Deux dumps simultanés se ralentiraient l'un l'autre et écriraient dans le même répertoire.

Viennent ensuite les règles de reprise. `backoffLimit: 1` autorise une seule nouvelle tentative : assez pour couvrir une base momentanément indisponible, pas assez pour boucler toute la nuit sur une erreur durable. Avec `restartPolicy: Never`, chaque tentative crée un nouveau pod au lieu de relancer le conteneur dans le même ; les journaux de la tentative ratée restent ainsi consultables par `kubectl logs`, comme ceux des derniers Jobs conservés par `successfulJobsHistoryLimit` et `failedJobsHistoryLimit`.

Le conteneur utilise l'image du serveur MariaDB elle-même, qui contient déjà `mariadb-dump` : la version du client correspond exactement à celle du serveur. Le mot de passe arrive par la variable d'environnement `MYSQL_PWD`, que le client lit automatiquement et qui est alimentée par le Secret de la base. Il n'apparaît ainsi ni dans la définition du pod ni sur la ligne de commande. Le script lui-même est stocké dans une ConfigMap montée dans le conteneur, ce qui permet de le modifier sans reconstruire d'image.

## Lire un volume ReadWriteOnce déjà monté

Le dump de la base passe par le réseau, mais l'archive des fichiers joints demande de monter leur volume, déjà utilisé par le pod de l'application. Ce volume est en `ReadWriteOnce`, et le nom induit en erreur : ce mode limite l'attachement à un seul nœud, pas à un seul pod. Deux pods placés sur le même nœud peuvent le monter en même temps.

Le pod de sauvegarde doit donc être planifié sur le nœud où tourne l'application. Une affinité de pod l'impose : elle demande au scheduler de placer le pod sur un nœud (`topologyKey: kubernetes.io/hostname`) qui héberge déjà un pod portant les labels de l'application.

```yaml
podAffinity:
  requiredDuringSchedulingIgnoredDuringExecution:
    - topologyKey: kubernetes.io/hostname
      labelSelector:
        matchLabels: { app.kubernetes.io/name: app, app.kubernetes.io/component: web }
```

Sans cette contrainte, le pod de sauvegarde peut atterrir sur un autre nœud et y rester bloqué sur une erreur `Multi-Attach`, puisque le volume est déjà attaché ailleurs. Le volume est par ailleurs monté en lecture seule dans le pod de sauvegarde, qui n'a aucune raison d'y écrire. Le mode `ReadWriteOncePod`, plus strict, interdirait ce partage.

## Le script : produire, vérifier, puis publier

Le script suit une règle simple : une sauvegarde n'apparaît sous son nom définitif qu'une fois vérifiée. Il écrit tout dans un répertoire temporaire, nommé d'après l'horodatage avec le suffixe `.tmp`, contrôle ce qu'il vient de produire, puis renomme le répertoire. Le renommage est atomique sur un même système de fichiers : à aucun moment une sauvegarde à moitié écrite ne porte un nom valide. Si le script échoue en route, il laisse un répertoire `.tmp`, que le passage suivant supprime en premier.

### Un dump cohérent sans arrêter l'application

La commande de dump tient en une ligne, dont les options comptent :

```bash
mariadb-dump --single-transaction --routines --events --triggers --hex-blob "$DB_NAME" | gzip
```

`--single-transaction` est l'option essentielle. Le dump ouvre une transaction avant de lire la première table, et toutes les tables InnoDB sont ensuite lues telles qu'elles étaient à cet instant précis, même si l'application continue d'écrire pendant ce temps. Aucune table n'est verrouillée : l'application ne voit pas la sauvegarde passer.

Les autres options complètent le contenu. Par défaut, le dump omet les procédures stockées et les événements planifiés ; `--routines` et `--events` les ajoutent. `--triggers` est déjà actif par défaut, mais l'écrire explicitement évite de dépendre d'un fichier de configuration du client. `--hex-blob` écrit les colonnes binaires en hexadécimal, à l'abri de tout problème d'encodage lors de la restauration.

L'archive des fichiers joints est un simple `tar` compressé du volume.

### Trois vérifications avant publication

Avant le renommage, le script relit ce qu'il a produit :

```bash
gzip -t db.sql.gz
zcat db.sql.gz | tail -1 | grep -q '^-- Dump completed'
tar -tzf documents.tar.gz > /dev/null
```

La première ligne vérifie l'intégrité de l'archive compressée. La deuxième s'appuie sur un détail du format : un dump complet se termine toujours par le commentaire `-- Dump completed on <date>`. Un dump interrompu, par un manque de mémoire ou une coupure réseau, s'arrête avant cette ligne. Le script tourne avec `set -o pipefail`, si bien qu'une erreur de `mariadb-dump` le fait déjà échouer ; ce contrôle couvre en plus le cas d'un fichier tronqué sans erreur visible. La troisième ligne relit l'archive des fichiers joints en entier.

### Piège : un fichier modifié pendant l'archivage

GNU `tar` sort avec le code 1, et non 0, quand un fichier change pendant qu'il le lit (`file changed as we read it`). Le script tournant avec `set -e`, la sauvegarde échouait chaque nuit, dès que l'application écrivait dans un journal stocké sur le volume des fichiers joints. Ignorer ce code de retour aurait aussi masqué de vraies erreurs. Les journaux, sans valeur de sauvegarde, sont plutôt exclus de l'archive par un `--exclude`.

## Rotation quotidienne et hebdomadaire

Les sauvegardes sont rangées dans deux répertoires : `daily/`, qui garde les quatorze dernières, et `weekly/`, qui garde une sauvegarde par semaine sur huit semaines. Garder huit semaines de copies complètes coûterait huit fois la place d'une sauvegarde ; une option de `cp` évite ce coût.

Le dimanche, la sauvegarde du jour est copiée dans `weekly/` par `cp -al`. L'option `-l` ne copie pas les données : elle crée des liens physiques, c'est-à-dire de nouveaux noms pour les mêmes fichiers sur le disque. Tant que la sauvegarde quotidienne existe, la copie hebdomadaire ne consomme donc aucun espace. Quand la rotation supprime le répertoire quotidien au bout de quatorze jours, les fichiers restent sur le disque, accessibles par leur nom hebdomadaire, et ne disparaissent qu'avec lui. Le procédé n'est sûr que parce qu'un fichier de sauvegarde n'est jamais modifié après sa création : modifier l'un modifierait l'autre. Il impose aussi que les deux répertoires soient sur le même système de fichiers, ici le même volume.

La rotation elle-même trie les répertoires par nom, l'horodatage `AAAAMMJJ-HHMMSS` donnant l'ordre chronologique, et supprime tout sauf les N plus récents. Elle s'appuie sur `head -n -N` (« tout sauf les N dernières lignes »), une extension GNU présente dans les images Debian ou Ubuntu, mais absente de BusyBox et donc d'une image Alpine.

## Sauvegarde à la demande et restauration

Avant une opération risquée, par exemple une montée de version de l'application, une sauvegarde peut être lancée immédiatement. `kubectl` sait créer un Job à partir de la définition d'un CronJob, sans rien recopier :

```bash
kubectl -n app create job --from=cronjob/app-backup app-backup-manual-$(date +%s)
```

La restauration procède à l'inverse : depuis un pod qui monte le volume des sauvegardes, le dump décompressé est envoyé au client `mariadb`, et l'archive des fichiers joints est extraite dans le volume de l'application. Restaurer régulièrement le dump dans une base jetable, puis comparer quelques comptages de tables avec la production, vérifie la chaîne de bout en bout, ce que les contrôles du script ne font pas.

## Limites

Les sauvegardes restent sur le cluster. Le volume qui les reçoit vit sur les mêmes disques que les données : il protège d'une erreur de manipulation ou d'une corruption logique, pas de la perte du cluster. Une copie hors cluster, dans un bucket S3 ou sur un autre site, reste nécessaire.

`--single-transaction` ne protège que les tables transactionnelles. Les tables MyISAM échappent à la transaction, et une modification de schéma (`ALTER TABLE`) pendant le dump peut le rendre incohérent.

Les vérifications prouvent l'intégrité des fichiers, pas la possibilité de restaurer. Un dump complet et bien compressé peut échouer à la restauration, par exemple sur une collation absente du serveur cible ; seul un test de restauration le révèle.

Enfin, un CronJob en échec ne prévient personne par lui-même. Une [alerte Prometheus sur les Jobs en échec](../07-monitoring/2026-10-11-prometheus-alertes-kubernetes.md) le rend visible.

## Conclusion

Un CronJob suffit à produire une sauvegarde cohérente d'une base et de ses fichiers, à condition de régler ce que Kubernetes ne règle pas seul : un seul passage à la fois, un pod placé sur le nœud du volume `ReadWriteOnce`, une publication qui n'intervient qu'après vérification, et une rotation qui ne duplique pas les données. Le dump complète les snapshots de volume sans les remplacer, et la sauvegarde ne devient fiable qu'avec une copie hors du cluster et un test de restauration régulier.

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/professionnel/sonu-k8s-cluster" title="Cluster Kubernetes interne DiscoDiode">Sauvegardes quotidiennes de l'ERP de l'équipe après son rapatriement sur le cluster : dump transactionnel de MariaDB et archive des documents, vérifiés avant publication, rotation quotidienne et hebdomadaire, en plus des snapshots Longhorn.</ProjectLink>
</ProjectLinks>
