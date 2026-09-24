---
title: "AWS : RDS, S3 et EBS"
description: "RDS pour les données relationnelles, S3 pour les objets et EBS pour le stockage en bloc. Connexion, opérations et différences."
series: aws
tags: [cloud, devops]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Le choix d'un service de stockage conditionne les performances, la durabilité et le coût d'une infrastructure cloud. AWS propose trois services aux modèles d'accès très différents : Amazon RDS pour les bases de données relationnelles managées, Amazon S3 pour le stockage d'objets hautement scalable, et Amazon EBS pour le stockage en bloc persistant.

<!--truncate-->

## RDS — Bases de données relationnelles managées

### Qu'est-ce que RDS ?

Amazon Relational Database Service (RDS) est un service AWS géré qui simplifie le déploiement, l'exploitation et la mise à l'échelle de bases de données relationnelles. RDS prend en charge plusieurs moteurs :

- **Aurora** (MySQL et PostgreSQL compatibles, optimisé pour le cloud)
- **PostgreSQL** (open source, robuste)
- **MySQL** (léger, performant)
- **MariaDB** (fork de MySQL)
- **Oracle Database** (commercial)
- **Microsoft SQL Server** (commercial)

RDS prend en charge les tâches d'administration : sauvegardes, application des correctifs, réplication et basculement. En contrepartie, l'accès au système d'exploitation sous-jacent n'est pas possible (pas de SSH, pas de superutilisateur complet) : les réglages du moteur passent par des *parameter groups*.

### Avantages de RDS

**Maintenance automatique** : AWS effectue les sauvegardes quotidiennes et applique les correctifs de sécurité et les versions mineures pendant une fenêtre de maintenance hebdomadaire configurable.

**Haute disponibilité** : Le déploiement Multi-AZ maintient une instance de secours dans une autre zone de disponibilité, alimentée par réplication **synchrone** du stockage. En cas de panne de l'instance principale ou de sa zone, RDS bascule automatiquement l'enregistrement DNS de l'endpoint vers l'instance de secours, en une à deux minutes généralement. L'instance de secours ne sert pas de trafic en lecture ; la variante *Multi-AZ DB cluster* (deux secours lisibles) réduit le basculement à moins d'une minute.

**Sauvegardes et récupération** : Les sauvegardes automatiques combinent un snapshot quotidien et l'archivage continu des journaux de transactions, ce qui permet une restauration à n'importe quelle seconde de la période de rétention (PITR, 1 à 35 jours). Une restauration crée toujours une **nouvelle** instance, avec un nouvel endpoint. Les snapshots manuels sont conservés jusqu'à leur suppression explicite.

**Scalabilité** : Le changement de classe d'instance (CPU, mémoire) redémarre la base : quelques minutes d'interruption en Single-AZ, réduites à la durée d'un basculement en Multi-AZ. Les lectures peuvent être distribuées sur des réplicas en lecture, alimentés par réplication **asynchrone** : une lecture sur un réplica peut donc renvoyer une donnée légèrement en retard.

**Sécurité** : Chiffrement en transit (SSL/TLS) et au repos (KMS), isolement réseau via VPC, gestion d'accès via IAM.

### Créer une instance RDS

La création d'une RDS depuis la console AWS se fait en quelques clics :

1. **Naviguer vers RDS** → **Databases** → **Create database**
2. **Choisir le moteur** : Aurora PostgreSQL, MySQL, etc.
3. **Choisir le mode** :
   - **Easy Create** (configuration simplifiée) : pour un premier essai
   - **Standard Create** (contrôle complet) : pour la production

Pour une première base de données, Easy Create suffit. Les paramètres par défaut incluent :

- Un type d'instance `db.t3.micro` ou `db.t4g.micro` (éligibles à l'offre gratuite)
- Stockage de 20 Go
- Sauvegardes automatiques
- Un utilisateur principal (*master user*) administrateur
- Le VPC par défaut

4. **Définir les identifiants** :
   - Master username (par défaut `admin` ou `postgres`)
   - Master password, ou gestion du mot de passe par AWS Secrets Manager (rotation automatique, aucun mot de passe à conserver)

5. **Configurer les paramètres réseau** :
   - VPC : le VPC par défaut
   - Security Group : autoriser le port 5432 (PostgreSQL) ou 3306 (MySQL), idéalement depuis le seul Security Group de l'application
   - Accès public : à activer uniquement pour un test depuis un poste local, avec une règle limitée à son adresse IP

6. **Créer** : le déploiement prend quelques minutes.

### Paramètres essentiels à connaître

**DB identifier** : nom unique de l'instance dans la région (visible dans les logs, les ARN, et l'endpoint)

**Multi-AZ** : réplication dans une autre zone. Recommandé en production, désactivé en test (coûts doublés).

**Backup retention period** : nombre de jours de rétention des sauvegardes automatiques. Par défaut 7, maximum 35 jours.

**Performance Insights** : analyse de la charge de la base par requête et par événement d'attente, avec 7 jours d'historique gratuits. AWS intègre progressivement ces fonctions dans CloudWatch Database Insights.

**Enhanced Monitoring** : métriques détaillées du système d'exploitation. Utile pour diagnostiquer les goulots.

**Storage Auto Scaling** : augmente automatiquement le stockage lorsque l'espace libre descend sous 10 % pendant plusieurs minutes, jusqu'à un plafond configurable. Le stockage d'une instance RDS peut croître mais jamais diminuer.

### Récupérer les informations de connexion

Une fois l'instance créée (état "Available"), les détails de connexion sont accessibles :

1. **Console RDS** → **Databases** → Instance RDS créée
2. **Onglet "Connectivity & security"** :
   - **Endpoint** : nom DNS de l'instance (ex. : `mydb.c1234567890.eu-west-3.rds.amazonaws.com`), qui suit l'instance principale en cas de basculement Multi-AZ
   - **Port** : 5432 pour PostgreSQL, 3306 pour MySQL
   - Master username et password (définis lors de la création)

### Se connecter à une RDS depuis Python

La connexion dépend du moteur. Les deux cas les plus courants :

<Tabs>
<TabItem value="postgresql" label="PostgreSQL / Aurora PostgreSQL">

Installation du driver :

```bash
pip install psycopg2-binary
```

Connexion :

```python
import os
import psycopg2

password = os.environ["DB_PASSWORD"]  # jamais en dur dans le code
endpoint = "mydb.c1234567890.eu-west-3.rds.amazonaws.com"

conn = None
try:
    conn = psycopg2.connect(
        host=endpoint,
        port=5432,
        database="postgres",  # base par défaut
        user="postgres",  # ou le master username utilisé
        password=password,
        sslmode="verify-full",  # chiffrement et vérification du certificat du serveur
        sslrootcert="global-bundle.pem",  # bundle des CA RDS, téléchargé depuis AWS
    )

    cur = conn.cursor()
    cur.execute("SELECT VERSION();")
    version = cur.fetchone()[0]
    print(f"Connected! Version: {version}")
    cur.close()

except Exception as e:
    print(f"Database error: {e}")
    raise

finally:
    if conn:
        conn.close()
```

</TabItem>
<TabItem value="mysql" label="MySQL / MariaDB">

Installation du driver :

```bash
pip install mysql-connector-python
```

Connexion :

```python
import os
import mysql.connector

password = os.environ["DB_PASSWORD"]  # jamais en dur dans le code
endpoint = "mydb.c1234567890.eu-west-3.rds.amazonaws.com"

conn = None
try:
    conn = mysql.connector.connect(
        host=endpoint,
        port=3306,
        database="mysql",  # base système, présente par défaut
        user="admin",  # ou le master username utilisé
        password=password,
        ssl_ca="global-bundle.pem",  # bundle des CA RDS
        ssl_verify_identity=True,
        autocommit=True,
    )

    cur = conn.cursor()
    cur.execute("SELECT VERSION();")
    version = cur.fetchone()[0]
    print(f"Connected! Version: {version}")
    cur.close()

except Exception as e:
    print(f"Database error: {e}")
    raise

finally:
    if conn:
        conn.close()
```

</TabItem>
</Tabs>

**Points importants :**

- **Port** : 5432 pour PostgreSQL, 3306 pour MySQL
- **database** : la base cible (`postgres` ou `mysql` existent par défaut)
- **user** : le master username défini lors de la création
- **TLS** : RDS pour PostgreSQL impose TLS par défaut depuis la version 15 (paramètre `rds.force_ssl`) ; pour MySQL, il faut l'exiger explicitement (`require_secure_transport`). Le mode `require` de libpq chiffre la connexion sans vérifier l'identité du serveur ; `verify-full`, associé au bundle de certificats RDS, protège aussi contre l'interception.
- `conn = None` avant le `try` évite une `NameError` dans le bloc `finally` si la connexion échoue.

### Cas d'usage RDS

**Application web avec données structurées** : Stocker les utilisateurs, posts, commentaires, etc. dans des tables relationnelles.

**Données financières** : Transactions, comptes clients, audits. Les bases relationnelles offrent les garanties ACID.

**Migrer une BD locale** : RDS simplifie la migration d'une BD existante vers le cloud.

**Haute disponibilité** : Multi-AZ avec basculement automatique pour les services critiques.

### Facturation RDS

- **Par instance-heure** : un `db.t3.micro` coûte ~$0.02/heure (~$15/mois selon la région), le double en Multi-AZ
- **Stockage** : ~$0.12 par Go/mois en `gp2`/`gp3` (pour 20 Go = ~$2.40/mois)
- **Sauvegardes** : gratuites jusqu'à la taille de la base, ~$0.095/Go/mois au-delà
- **Transfert de données sortantes** : payant (transfert entrant gratuit)
- **Offre gratuite (ancien modèle 12 mois)** : 750 h/mois de `db.t3.micro` (ou `db.t2.micro`/`db.t4g.micro`) + 20 Go de stockage ; avec le plan *Free* à crédits, la consommation est déduite des crédits

Une base de développement peut être arrêtée quand elle ne sert pas : les heures d'instance cessent d'être facturées, mais le stockage et les sauvegardes le restent. RDS redémarre automatiquement une instance arrêtée au bout de 7 jours.

---

## S3 — Stockage d'objets hautement scalable

### Qu'est-ce que S3 ?

Amazon Simple Storage Service (S3) est un service de stockage d'objets hautement scalable, durable et sécurisé. Contrairement à RDS, S3 ne stocke **pas des données structurées** dans une BD, mais des **objets non structurés** : fichiers, images, vidéos, sauvegardes, logs, datasets, etc.

**Caractéristiques clés :**

- **Capacité illimitée** : pas de volume à provisionner, un objet peut atteindre 50 To (historiquement 5 To)
- **Durabilité de 11 neuf** : 99,999999999 % par an ; selon AWS, pour 10 millions d'objets stockés, la perte d'un objet est attendue en moyenne une fois tous les 10 000 ans. Les données sont répliquées sur au moins trois zones de disponibilité (sauf classes *One Zone*)
- **Disponibilité** : conçue pour 99,99 % en classe Standard, avec un engagement contractuel (SLA) de 99,9 %
- **Pas de gestion serveur** : AWS gère l'infrastructure complète
- **Classes de stockage** : Standard, Infrequent Access, Glacier (archivage) pour optimiser les coûts
- **Cohérence forte** : depuis décembre 2020, toute lecture qui suit une écriture ou une suppression réussie voit le nouvel état de l'objet, y compris pour les listings

### Concepts clés

**Bucket** : conteneur principal des objets. Son nom est unique dans **toute la partition AWS**, tous comptes confondus (pas d'homonymes possibles), car il sert de nom DNS.

**Object** : fichier stocké dans un bucket, identifié par une clé, accompagné de métadonnées (type de contenu, métadonnées utilisateur). Exemple : l'objet de clé `dossier/fichier.txt` dans le bucket `mon-bucket`.

**Key** : identifiant unique de l'objet dans le bucket. S3 n'a **pas de dossiers réels** : l'espace de noms est plat, et les « dossiers » affichés par la console ne sont que des préfixes de clés délimités par `/`. Renommer un « dossier » revient donc à copier puis supprimer chaque objet.

**Region** : zone géographique où le bucket est créé. Les données ne quittent pas la région, sauf réplication configurée explicitement.

### Créer un bucket S3

Depuis la console AWS :

1. **Naviguer vers S3** → **Create bucket**
2. **Nom du bucket** : doit être unique mondialement (ex: `mon-app-storage-2026`)
3. **Région** : la plus proche des utilisateurs ou des services consommateurs
4. **Object Ownership** : conserver *ACLs disabled* (par défaut depuis avril 2023) ; les droits sont alors gérés uniquement par des policies IAM et de bucket
5. **Block Public Access** : conserver les quatre blocages activés (par défaut), sauf besoin explicite d'accès public
6. **Versioning** : activer si l'historique des versions est nécessaire
7. **Encryption** : tout nouvel objet est chiffré par défaut en SSE-S3 (AES-256) depuis janvier 2023 ; SSE-KMS ajoute un contrôle d'accès à la clé et une trace CloudTrail de chaque usage
8. **Créer le bucket**

### Interagir avec S3 en Python

Pour utiliser S3 avec Python, le package `boto3` est requis. L'installation se fait par :

```bash
pip install boto3
```

D'abord, configurer les identifiants AWS (voir [AWS CLI](./2026-02-21-aws-cli.md)) :

```bash
aws configure
```

Ensuite, boto3 utilise automatiquement ces credentials :

```python
import boto3

# boto3 applique la même chaîne de résolution que la CLI :
# variables d'environnement, fichiers ~/.aws, puis rôle du conteneur ou de l'instance
s3_client = boto3.client('s3')

# Ou utiliser un profil spécifique
s3_session = boto3.Session(profile_name='default')
s3_client = s3_session.client('s3')
```

### Opérations courantes avec S3

**Lister tous les buckets :**

```python
response = s3_client.list_buckets()
for bucket in response['Buckets']:
    print(f"Bucket: {bucket['Name']}")
```

**Lister le contenu d'un bucket :**

```python
# Un appel list_objects_v2 renvoie au plus 1000 clés : le paginator enchaîne les appels
paginator = s3_client.get_paginator('list_objects_v2')

for page in paginator.paginate(Bucket='mon-bucket', Prefix='dossier/'):
    for obj in page.get('Contents', []):
        print(f"{obj['Key']} — {obj['Size']} bytes")
```

**Upload un fichier :**

```python
# Upload simple
s3_client.upload_file(
    Filename='./mon-fichier.txt',
    Bucket='mon-bucket',
    Key='dossier/mon-fichier.txt'
)

# Upload avec métadonnées et chiffrement KMS
s3_client.upload_file(
    Filename='./rapport.pdf',
    Bucket='mon-bucket',
    Key='dossier/rapport.pdf',
    ExtraArgs={
        'ContentType': 'application/pdf',
        'ServerSideEncryption': 'aws:kms',
    },
)
```

`upload_file` bascule automatiquement en *multipart upload* au-delà d'un seuil (8 Mo par défaut) : le fichier est découpé en parties envoyées en parallèle, puis assemblées côté S3. Sur un bucket aux ACL désactivées (configuration par défaut), un paramètre `ACL` autre que `bucket-owner-full-control` provoque une erreur `AccessControlListNotSupported`.

**Download un fichier :**

```python
s3_client.download_file(
    Bucket='mon-bucket',
    Key='dossier/mon-fichier.txt',
    Filename='./local-fichier.txt'
)
```

**Supprimer un objet :**

```python
s3_client.delete_object(Bucket='mon-bucket', Key='dossier/mon-fichier.txt')
```

**Obtenir l'URL publique d'un objet :**

```python
# Accès direct (si l'objet est public) : https://<bucket>.s3.<region>.amazonaws.com/<clé>
url = "https://mon-bucket.s3.eu-west-3.amazonaws.com/mon-fichier.txt"

# Ou générer une URL signée (valable 1 heure)
url = s3_client.generate_presigned_url(
    ClientMethod='get_object',
    Params={'Bucket': 'mon-bucket', 'Key': 'mon-fichier.txt'},
    ExpiresIn=3600  # 1 heure en secondes
)
print(url)
```

Une URL pré-signée embarque dans ses paramètres une signature SigV4 calculée localement avec les identifiants de l'appelant : aucun appel à AWS n'a lieu lors de sa génération. Quiconque possède l'URL obtient l'accès avec les permissions de l'identité signataire, jusqu'à expiration (7 jours au maximum). Si elle est signée avec des identifiants temporaires (rôle), elle expire aussi à l'expiration de ces identifiants.

### Classes de stockage S3

S3 propose plusieurs classes optimisées pour différents cas d'usage :

Les prix indiqués sont ceux de la région `us-east-1`, à titre d'ordre de grandeur.

**S3 Standard** : accès fréquent, latence de l'ordre de la dizaine de millisecondes. Prix : ~$0.023/Go/mois.

**S3 Standard-IA** (Infrequent Access) : accès occasionnel, même latence que Standard. Prix : ~$0.0125/Go/mois, plus des frais par Go lu, une durée minimale facturée de 30 jours et une taille minimale facturée de 128 Ko par objet.

**S3 One Zone-IA** : comme Standard-IA, mais stocké dans une seule zone de disponibilité : ~20 % moins cher, perdu en cas de destruction de la zone. Adapté aux données reproductibles.

**S3 Intelligent-Tiering** : S3 déplace chaque objet entre des niveaux d'accès selon son usage réel (accès fréquent, puis peu fréquent après 30 jours sans lecture, puis archive instantanée après 90 jours), sans frais de lecture. Prix du niveau fréquent identique à Standard, plus des frais de suivi par objet. Adapté aux motifs d'accès imprévisibles.

**S3 Glacier Instant Retrieval** : archive consultée rarement mais lue en millisecondes. Prix : ~$0.004/Go/mois, durée minimale de 90 jours.

**S3 Glacier Flexible Retrieval** : archive dont la lecture nécessite une restauration préalable, de quelques minutes (expédiée) à 12 heures (en masse). Prix : ~$0.0036/Go/mois, durée minimale de 90 jours.

**S3 Glacier Deep Archive** : archivage longue durée, restauration sous 12 heures (standard) à 48 heures (en masse). Prix : ~$0.00099/Go/mois, durée minimale de 180 jours.

Les durées minimales signifient qu'un objet supprimé avant leur terme est facturé comme s'il avait été conservé jusqu'au bout : une classe froide peut coûter plus cher que Standard pour des données de courte durée de vie.

### Cas d'usage S3

**Sauvegarde et archivage** : Sauvegarder des fichiers, des logs, des DBs sur des années avec Glacier.

**Data lakes** : Consolider et analyser de grandes quantités de données non structurées (CSV, JSON, Parquet).

**Hosting de contenu statique** : Héberger un site web statique, des images, des PDFs (avec CloudFront en CDN).

**Distribution de logiciels** : Stocker et servir des binaires, des mises à jour applicatives.

**ML & Big Data** : Stocker les datasets d'entraînement pour SageMaker, Spark, etc.

### Facturation S3

- **Stockage** : ~$0.025/GB/mois pour Standard (varie par classe)
- **Requêtes API** : ~$0.0004 par 1000 GET, ~$0.005 par 1000 PUT (varie selon l'opération)
- **Transfert de données sortantes** : ~$0.09/GB au-delà du Free Tier
- **Feature supplémentaires** : versioning, lifecycle, replication (tous payants)
- **Free Tier** : 5 GB stocké + 20 000 GET + 2000 PUT pour 12 mois

Les règles de cycle de vie (*lifecycle rules*) automatisent les transitions entre classes et l'expiration des objets :

```json
{
  "Rules": [
    {
      "ID": "archive-logs",
      "Filter": { "Prefix": "logs/" },
      "Status": "Enabled",
      "Transitions": [
        { "Days": 30, "StorageClass": "STANDARD_IA" },
        { "Days": 90, "StorageClass": "GLACIER" }
      ],
      "Expiration": { "Days": 365 },
      "NoncurrentVersionExpiration": { "NoncurrentDays": 30 }
    }
  ]
}
```

```bash
aws s3api put-bucket-lifecycle-configuration \
  --bucket mon-bucket --lifecycle-configuration file://lifecycle.json
```

Sur un bucket versionné, une suppression ne fait qu'ajouter un marqueur de suppression : les versions précédentes restent stockées et facturées. `NoncurrentVersionExpiration` les supprime après le délai indiqué.

---

## EBS — Stockage bloc attaché aux instances

### Qu'est-ce que EBS ?

Amazon Elastic Block Store (EBS) est un service de stockage par bloc. Contrairement à S3, accessible par API depuis n'importe où, un volume EBS **s'attache à une instance EC2** et apparaît dans le système comme un disque (périphérique bloc) sur lequel créer un système de fichiers. Il s'agit d'un stockage réseau, répliqué au sein d'une seule zone de disponibilité : un volume ne peut être attaché qu'à une instance de la **même zone**.

**Caractéristiques clés :**

- **Attaché à une instance** : Un volume EBS n'est attaché qu'à une seule instance à la fois (exception : *Multi-Attach* des volumes `io1`/`io2`, qui exige un système de fichiers en cluster)
- **Persistant** : Les données survivent à l'arrêt/redémarrage de l'instance
- **Performance élevée** : Latence basse, haute IOPS (entrées/sorties par seconde)
- **Volumes multiples** : Une instance peut avoir plusieurs volumes EBS
- **Snapshots** : Sauvegardes incrémentielles des données
- **Chiffrement** : Chiffrement natif au repos avec KMS

### Volumes EBS et types

Chaque instance EC2 a un **volume root** (le disque système). Des volumes supplémentaires peuvent être attachés.

**SSD (haute performance) :**

- **gp3** (General Purpose) : 3 000 IOPS et 125 Mo/s de base quelle que soit la taille, ajustables indépendamment de la capacité. ~$0.08/Go/mois.
- **gp2** : génération précédente, dont les performances sont liées à la taille (3 IOPS par Go, avec un mécanisme de crédits de burst pour les petits volumes). ~$0.10/Go/mois.
- **io1/io2** : IOPS provisionnées pour les bases exigeantes. ~$0.125/Go/mois + coûts par IOPS.

**HDD (stockage économique) :**

- **st1** : débit élevé pour big data. ~$0.045/Go/mois.
- **sc1** : archives économiques. ~$0.015/Go/mois.

Le type **gp3** convient à la plupart des usages : un petit volume `gp3` offre d'emblée 3 000 IOPS, là où un volume `gp2` de 100 Go n'en garantit que 300, pour un prix au Go inférieur de 20 %.

### Attacher un volume EBS

Depuis la console EC2 :

1. **Créer un volume** : EC2 → **Elastic Block Store** → **Volumes** → **Create volume**
   - Sélectionner la zone (même que l'instance)
   - Taille (ex. : 100 Go)
   - Type (gp3 recommandé)
   - Chiffrement : activer (recommandé)

2. **Attacher le volume** : clic droit sur le volume → **Attach volume** → sélectionner l'instance et le nom de périphérique (ex. : `/dev/sdf`). Sur les instances Nitro (générations actuelles), les volumes EBS sont exposés comme périphériques NVMe : `/dev/sdf` apparaît dans le système sous le nom `/dev/nvme1n1`, d'où l'intérêt de `lsblk` pour l'identifier.

3. **Monter dans l'instance** (depuis SSH) :

```bash
# Lister les disques
lsblk

# Formater le volume (première fois uniquement)
sudo mkfs.ext4 /dev/nvme1n1

# Créer un point de montage
sudo mkdir /mnt/data

# Monter le volume
sudo mount /dev/nvme1n1 /mnt/data

# Vérifier
df -h
```

4. **Rendre permanent** : ajouter une ligne à `/etc/fstab` pour que le montage survive aux redémarrages. L'ordre des noms NVMe n'étant pas garanti d'un démarrage à l'autre, la ligne référence l'UUID du système de fichiers :

```bash
# Récupérer l'UUID du système de fichiers
sudo blkid /dev/nvme1n1

# Ligne /etc/fstab : nofail évite un échec de démarrage si le volume est détaché
# UUID=0a1b2c3d-...  /mnt/data  ext4  defaults,nofail  0  2

# Vérifier la syntaxe du fstab sans redémarrer
sudo mount -a
```

Un volume peut être agrandi, ou changer de type, sans détachement (*Elastic Volumes*) : après `aws ec2 modify-volume`, le système de fichiers s'étend avec `growpart` puis `resize2fs` (ext4) ou `xfs_growfs` (XFS).

### Snapshots et sauvegardes

Un snapshot EBS est une **sauvegarde incrémentielle** du volume, stockée par AWS sur S3 : le premier snapshot copie tous les blocs utilisés, les suivants uniquement les blocs modifiés depuis le précédent. La suppression d'un snapshot intermédiaire ne fait perdre aucune donnée : les blocs encore référencés par d'autres snapshots sont conservés.

```bash
# Créer un snapshot (console : EC2 → Elastic Block Store → Snapshots → Create snapshot)
aws ec2 create-snapshot \
  --volume-id vol-0123456789abcdef0 \
  --description "data avant migration"
```

Un snapshot capture l'état des blocs au moment de sa création, sans figer les écritures en cours dans le cache du système de fichiers ou de l'application : pour une cohérence applicative (base de données), il faut suspendre les écritures ou utiliser les mécanismes de l'application. Amazon Data Lifecycle Manager ou AWS Backup automatisent la création et la rotation des snapshots.

Cas d'usage :
- **Sauvegarde** : protéger les données critiques
- **Clonage** : créer un nouveau volume à partir d'un snapshot
- **Migration** : copier un volume vers une autre région (via snapshots)
- **Restauration** : récupérer un point-dans-le-temps

Prix : ~$0.05 par GB/mois pour le stockage du snapshot.

### Cas d'usage EBS

**Disque système d'EC2** : Partitionnement / OS / applications système — Le volume root pour chaque instance.

**Bases de données locales** : Installer PostgreSQL, MySQL directement sur l'EC2 avec EBS comme stockage (au lieu de RDS managé).

**Application avec données persistantes locales** : fichiers applicatifs, index de recherche, files de messages nécessitant un accès disque à faible latence. Pour des données purement temporaires, le stockage d'instance (*instance store*), physiquement attaché à l'hôte, est plus rapide et inclus dans le prix de l'instance.

**Haute performance** : Traitement de données intensif, machine learning, analytics où la latence est critique.

### EBS vs S3 vs RDS : Comparaison rapide

| Aspect | EBS | S3 | RDS |
|--------|-----|-----|-----|
| **Attachement** | Instance EC2 unique | Indépendant | Indépendant |
| **Accès** | Périphérique bloc (système de fichiers) | API HTTP | Connexion BD |
| **Latence** | Inférieure à la milliseconde | Dizaines de millisecondes | Millisecondes (requêtes SQL) |
| **Scalabilité** | Jusqu'à 64 Tio par volume, dans une AZ | Illimitée | Dépend de l'instance |
| **Persistance** | Survit à l'arrêt de l'instance | Permanent | Permanent |
| **Prix** | ~$0.08/Go/mois (gp3) | ~$0.023/Go/mois | Instance-heure + stockage |
| **Données** | Non structurées (fichiers) | Non structurées (objets) | Relationnelles (tables) |

**Résumé :**
- **EBS** = disque attaché pour une instance (performance)
- **S3** = stockage d'objets indépendant (scalabilité)
- **RDS** = base de données managée (structure)

### Facturation EBS

- **Volume** : ~$0.08/Go/mois pour gp3, facturé sur la capacité provisionnée et non utilisée
- **Snapshots** : ~$0.05 par Go/mois
- **Performances provisionnées** : coûts additionnels pour les IOPS de io1/io2 et pour les IOPS ou le débit de gp3 au-delà du niveau de base
- **Offre gratuite (ancien modèle 12 mois)** : 30 Go de stockage EBS SSD à usage général ou magnétique, et 1 Go de snapshots

### Bonnes pratiques EBS

- Utiliser **gp3** pour la plupart des cas (meilleur coût/performance)
- Créer des **snapshots réguliers** des données critiques
- Activer le **chiffrement** sur tous les volumes
- Surveiller l'**utilisation disque** : l'espace libre du système de fichiers n'est pas une métrique CloudWatch native, il faut l'agent CloudWatch pour la collecter
- Supprimer les volumes **inutilisés** (état `available`, non attachés) : ils restent facturés
- Ajuster taille et performances via **Elastic Volumes** plutôt que de surdimensionner d'emblée : EBS n'agrandit jamais un volume automatiquement

---

## RDS vs S3 : Différences clés

| Aspect | RDS | S3 |
|--------|-----|-----|
| **Type de données** | Structurées (tables, lignes, colonnes) | Non structurées (objets, blobs) |
| **Accès** | Requêtes SQL, connexion persistante | API REST HTTP, sans connexion |
| **Scalabilité** | verticale (augmenter instance) + répliques lecture | Horizontale infinie |
| **Disponibilité** | 99.95% avec Multi-AZ | 99.99% |
| **Durabilité** | Sauvegardes automatiques | 11-9 (copie par défaut dans 3 AZ) |
| **Coûts** | Instance-heure + stockage | Stockage + requêtes + transfert |
| **Transactions** | ACID (atomicité, cohérence) | Opérations atomiques par objet, cohérence forte, écritures conditionnelles ; pas de transaction multi-objets |
| **Latence** | Millisecondes (requêtes db) | Millisecondes (API) |
| **Chiffrement** | TLS en transit, KMS au repos | TLS en transit, SSE au repos |
| **Audit** | CloudTrail pour les appels d'API RDS ; audit des requêtes via les logs du moteur (pgAudit, audit plugin MySQL) ou Database Activity Streams | CloudTrail (API de gestion et, en option, événements de données) + access logs |

### Cas d'usage appropriés pour RDS

- Applications avec **données relationnelles** (CRM, e-commerce, ERP)
- Nécessité de **transactions ACID** (opérations financières)
- Requêtes **complexes avec JOINs**
- Données **fréquemment modifiées**
- Exigence de **haute disponibilité** (Multi-AZ)

### Cas d'usage appropriés pour S3

- Stockage de **fichiers statiques** (images, PDFs, vidéos)
- **Data lakes** et big data
- **Sauvegarde et archivage**
- Données **rarement accédées**
- Demande de **scalabilité infinie**
- Optimisation des **coûts d'archivage long terme**

### Architecture hybride

En pratique, une application moderne utilise **les deux** :

```text
┌─────────────────────────────────┐
│     Application Web/API         │
└─────────────────────────────────┘
         ↓              ↓
    ┌────────────┐  ┌──────────┐
    │    RDS     │  │    S3    │
    │ Données    │  │ Fichiers,│
    │ de app     │  │ logs,    │
    │ (users,    │  │backup    │
    │  posts)    │  │          │
    └────────────┘  └──────────┘
```

Par exemple, une application de réseau social stocke les profils, posts, commentaires **en RDS**, tandis que les photos, vidéos, avatars sont hébergés **en S3**.

---

## Bonnes pratiques

**Pour RDS :**
- Toujours utiliser **Multi-AZ en production**
- Activer **automated backups** avec retention de 7-35j
- Utiliser **IAM database authentication** (jeton temporaire généré par `aws rds generate-db-auth-token`) ou le mot de passe géré par Secrets Manager plutôt que des mots de passe en dur
- Auditer les **slow queries** et optimiser les index
- Monitorer **CPU, mémoire, stockage** avec CloudWatch

**Pour S3 :**
- Toujours bloquer l'**accès public par défaut** (Block Public Access)
- Activer **versioning** pour les données critiques
- Utiliser des **lifecycle policies** pour réduire les coûts
- Chiffrer les données sensibles avec **KMS**
- Activer **logging** et **CloudTrail** pour l'audit
- Utiliser **CloudFront** comme CDN pour distribuer globalement

RDS, S3 et EBS couvrent trois modèles d'accès distincts : requêtes relationnelles, objets adressés par clé via HTTP, et blocs montés par une instance. Combinés à des services de calcul comme [EC2](./2026-02-19-ec2.md), [Lambda](./2026-02-21-lambda.md) ou ECS, ils constituent la couche de persistance d'une application cloud.
