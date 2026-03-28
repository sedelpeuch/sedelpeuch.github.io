---
title: "AWS : RDS et S3"
description: "RDS pour les données relationnelles et S3 pour les objets. Connexion, opérations et différences."
tags: [cloud, devops]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Le stockage est un élément critique de toute infrastructure cloud. AWS propose deux services de stockage avec des caractéristiques radicalement différentes : Amazon RDS pour les bases de données relationnelles managées, et Amazon S3 pour le stockage d'objets hautement scalable. Ce document présente la création, la connexion et les cas d'usage de ces deux services.

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

RDS gère automatiquement les tâches d'administration : sauvegardes, patching des versions, haute disponibilité, et sauvegarde automatique. L'administrateur peut se concentrer sur l'application, sans intervenir sur la gestion du serveur de base de données.

### Avantages de RDS

**Maintenance automatique** : AWS effectue les sauvegardes quotidiennes, les patchs de sécurité et les mises à jour mineures sans intervention manuelle.

**Haute disponibilité** : Le déploiement Multi-AZ réplique la base de données dans une zone de disponibilité différente. En cas d'incident, un basculement automatique survient en quelques minutes.

**Sauvegardes et récupération** : Les sauvegardes automatiques conservent 35 jours de journaux, permettant une récupération à un point dans le temps (PITR). Les snapshots manuels peuvent être conservés indéfiniment.

**Scalabilité** : Les ressources (CPU, mémoire) peuvent être augmentées sans arrêt du service. Les lectures peuvent être distribuées sur des réplicas en lecture.

**Sécurité** : Chiffrement en transit (SSL/TLS) et au repos (KMS), isolement réseau via VPC, gestion d'accès via IAM.

### Créer une instance RDS

La création d'une RDS depuis la console AWS se fait en quelques clics :

1. **Naviguer vers RDS** → **Databases** → **Create database**
2. **Sélectionnez le moteur** : Aurora PostgreSQL, MySQL, etc.
3. **Choisissez le mode** :
   - **Easy Create** (configuration simplifiée) : idéal pour débuter
   - **Standard Create** (contrôle total) : pour la production

Pour une première base de données, Easy Create suffit. Les paramètres par défaut incluent :

- Un type d'instance `db.t3.micro` (Free Tier)
- Stockage de 20 GB
- Backup automatique
- Un utilisateur root administrateur
- Un VPC par défaut

4. **Définissez les credentials** :
   - Master username (par défaut `admin` ou `postgres`)
   - Master password (à mémoriser ou stocker de façon sécurisée)

5. **Configurer les paramètres réseau** :
   - VPC : sélectionner le VPC par défaut
   - Security Group : autoriser le port 5432 (PostgreSQL) ou 3306 (MySQL)
   - Connectivité publique : activer pour un accès depuis une machine locale

6. **Validez et créez** : Le déploiement prend quelques minutes.

### Paramètres essentiels à connaître

**DB identifier** : nom unique de votre instance (visible dans les logs, ARNs, etc.)

**Multi-AZ** : réplication dans une autre zone. Recommandé en production, désactivé en test (coûts doublés).

**Backup retention period** : nombre de jours de rétention des sauvegardes automatiques. Par défaut 7, maximum 35 jours.

**Performance Insights** : monitoring détaillé de la charge et des requêtes. Activé automatiquement en Standard Create, payant après l'essai gratuit.

**Enhanced Monitoring** : métriques détaillées du système d'exploitation. Utile pour diagnostiquer les goulots.

**Storage Auto Scaling** : augmente automatiquement le stockage EBS si la capacité atteint 90%. Évite les interruptions dues au manque d'espace.

### Récupérer les informations de connexion

Une fois l'instance créée (état "Available"), les détails de connexion sont accessibles :

1. **Console RDS** → **Databases** → Instance RDS créée
2. **Onglet "Connectivity & security"** :
   - **Endpoint** : adresse URL de la BD (ex: `mydb.c1234567890.eu-west-3.rds.amazonaws.com`)
   - **Port** : 5432 pour PostgreSQL, 3306 pour MySQL
   - Master username et password (définis lors de la création)

### Se connecter à une RDS depuis Python

La connexion dépend du moteur. Voici les deux cas les plus courants.

<Tabs>
<TabItem value="postgresql" label="PostgreSQL / Aurora PostgreSQL">

Installez d'abord le driver :

```bash
pip install psycopg2-binary
```

Ensuite, connectez-vous :

```python
import psycopg2

password = "your-master-password"
endpoint = "mydb.c1234567890.eu-west-3.rds.amazonaws.com"

try:
    conn = psycopg2.connect(
        host=endpoint,
        port=5432,
        database="postgres",  # base par défaut
        user="postgres",  # ou le master username utilisé
        password=password,
        sslmode="require"  # SSL obligatoire pour RDS
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

Installez d'abord le driver :

```bash
pip install mysql-connector-python
```

Ensuite, connectez-vous :

```python
import mysql.connector

password = "your-master-password"
endpoint = "mydb.c1234567890.eu-west-3.rds.amazonaws.com"

try:
    conn = mysql.connector.connect(
        host=endpoint,
        port=3306,
        database="mysql",  # base par défaut
        user="admin",  # ou le master username utilisé
        password=password,
        ssl_disabled=False,
        autocommit=True
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
- **database** : la base cible (généralement `postgres` ou `mysql` par défaut)
- **user** : le master username défini lors de la création
- **SSL** : RDS requiert SSL/TLS. Les connecteurs le gèrent automatiquement.

### Cas d'usage RDS

**Application web avec données structurées** : Stocker les utilisateurs, posts, commentaires, etc. dans des tables relationnelles.

**Données financières** : Transactions, comptes clients, audits. Les BD relationnelles offrent les ACID guaranties.

**Migrer une BD locale** : RDS simplifie la migration d'une BD existante vers le cloud.

**Haute disponibilité** : Multi-AZ avec basculement automatique pour les services critiques.

### Facturation RDS

- **Par instance-heure** : un `db.t3.micro` coûte ~$0.015/heure ( ~$11/mois)
- **Stockage EBS** : ~$0.12 par GB/mois (pour 20 GB = ~$2.40/mois)
- **Sauvegardes** : stockage supplémentaire au-delà de la taille de la BD (~$0.21/GB/mois)
- **Transfert de données sortantes** : payant (transfert entrant gratuit)
- **Free Tier** : 750h/mois de `db.t2.micro` + 20 GB de stockage pour 12 mois

**Astuce** : Les BD de développement peuvent être arrêtées quand elles ne sont pas utilisées. Aucun coût n'est facturé pour une BD arrêtée (pendant 7 jours max).

---

## S3 — Stockage d'objets hautement scalable

### Qu'est-ce que S3 ?

Amazon Simple Storage Service (S3) est un service de stockage d'objets hautement scalable, durable et sécurisé. Contrairement à RDS, S3 ne stocke **pas des données structurées** dans une BD, mais des **objets non structurés** : fichiers, images, vidéos, sauvegardes, logs, datasets, etc.

**Caractéristiques clés :**

- **Scalabilité infinie** : stockez des pétaoctets sans limite
- **Durabilité 11-9** : 99.999999999% de durabilité (une seule perte attendue pour 10 milliards d'objets)
- **Disponibilité 99.99%** : le service est disponible en permanence
- **Pas de gestion serveur** : AWS gère l'infrastructure complète
- **Classes de stockage** : Standard, Infrequent Access, Glacier (archivage) pour optimiser les coûts

### Concepts clés

**Bucket** : conteneur principal des objets. Un bucket est nommé uniquement dans **tout AWS** (pas d'homonymes possibles).

**Object** : fichier stocké dans un bucket, identifié par une clé (chemin). Exemple : `mon-bucket/dossier/fichier.txt`.

**Key** : path unique dans un bucket. S3 n'a **pas de dossiers réels**, juste des chemins. Les "dossiers" sont des conventions de naming.

**Region** : zone géographique où le bucket est créé. Les données ne quittent pas la région (pour la conformité).

### Créer un bucket S3

Depuis la console AWS :

1. **Naviguer vers S3** → **Create bucket**
2. **Nom du bucket** : doit être unique mondialement (ex: `mon-app-storage-2026`)
3. **Région** : sélectionner la région la plus proche des utilisateurs ou services visés
4. **ACL (Access Control List)** : maintenir "Private" (par défaut) pour restreindre l'accès
5. **Versioning** : activer si l'historique des versions est nécessaire
6. **Encryption** : activez le chiffrement par défaut (AES-256 ou KMS)
7. **Créez le bucket**

### Interagir avec S3 en Python

Pour utiliser S3 avec Python, le package `boto3` est requis. L'installation se fait par :

```bash
pip install boto3
```

D'abord, configurer les credentials AWS (voir [AWS CLI](/blog/2026/02/21/aws-cli)):

```bash
aws configure
```

Ensuite, boto3 utilise automatiquement ces credentials :

```python
import boto3

# boto3 cherche automatiquement les credentials dans ~/.aws/credentials
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
response = s3_client.list_objects_v2(Bucket='mon-bucket')

if 'Contents' in response:
    for obj in response['Contents']:
        print(f"{obj['Key']} — {obj['Size']} bytes")
else:
    print("Bucket is empty")
```

**Upload un fichier :**

```python
# Upload simple
s3_client.upload_file(
    Filename='./mon-fichier.txt',
    Bucket='mon-bucket',
    Key='dossier/mon-fichier.txt'
)

# Upload avec contrôle d'ACL (ex: public-read)
s3_client.upload_file(
    Filename='./mon-fichier.txt',
    Bucket='mon-bucket',
    Key='dossier/mon-fichier.txt',
    ExtraArgs={'ACL': 'private'}  # ou 'public-read'
)
```

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
# Accès direct (si l'objet est public)
url = f"https://mon-bucket.s3.amazonaws.com/mon-fichier.txt"

# Ou générer une URL signée (valable 1 heure)
url = s3_client.generate_presigned_url(
    ClientMethod='get_object',
    Params={'Bucket': 'mon-bucket', 'Key': 'mon-fichier.txt'},
    ExpiresIn=3600  # 1 heure en secondes
)
print(url)
```

### Classes de stockage S3

S3 propose plusieurs classes optimisées pour différents cas d'usage :

**S3 Standard** : accès fréquent, traitement immédiat. Prix : ~$0.025/GB/mois.

**S3 Standard-IA** (Infrequent Access) : accès occasionnel, données doivent rester disponibles. Prix : ~$0.0125/GB/mois + frais accès.

**S3 Intelligent-Tiering** : AWS déplace automatiquement les objets entre Standard et IA selon l'usage. Prix : ~$0.0125/GB/mois + frais gestion.

**S3 Glacier Flexible Retrieval** : archivage, accès rare. Récupération en heures. Prix : ~$0.004/GB/mois.

**S3 Glacier Deep Archive** : archivage longue durée (7+ ans), accès très rare. Récupération en 12h. Prix : ~$0.00099/GB/mois.

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

**Astuce** : Utilisez les policies de cycle de vie pour migrer automatiquement les vieux objets vers Glacier (beaucoup moins cher).

---

## RDS vs S3 : Différences clés

| Aspect | RDS | S3 |
|--------|-----|-----|
| **Type de données** | Structurées (tables, lignes, colonnes) | Non structurées (objets, blobs) |
| **Accès** | Requêtes SQL, connexion persistente | API REST HTTP, sans connexion |
| **Scalabilité** | verticale (augmenter instance) + répliques lecture | Horizontale infinie |
| **Disponibilité** | 99.95% avec Multi-AZ | 99.99% |
| **Durabilité** | Sauvegardes automatiques | 11-9 (copie par défaut dans 3 AZ) |
| **Coûts** | Instance-heure + stockage | Stockage + requêtes + transfert |
| **Transactions** | ACID (atomicité, cohérence) | Cohérence éventuelle |
| **Latence** | Millisecondes (requêtes db) | Millisecondes (API) |
| **Chiffrement** | SSL en transit, KMS au repos | SSL en transit, SSE en repos |
| **Audit** | Pas natif (logs fournis) | CloudTrail + access logs |

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

### Architecture hybrid

En pratique, une application moderne utilise **les deux** :

```
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
- Utiliser **IAM database authentication** plutôt que des mots de passe en dur
- Auditer les **slow queries** et optimiser les index
- Monitorer **CPU, mémoire, stockage** avec CloudWatch

**Pour S3 :**
- Toujours bloquer l'**accès public par défaut** (Block Public Access)
- Activer **versioning** pour les données critiques
- Utiliser des **lifecycle policies** pour réduire les coûts
- Chiffrer les données sensibles avec **KMS**
- Activer **logging** et **CloudTrail** pour l'audit
- Utiliser **CloudFront** comme CDN pour distribuer globalement

Les services RDS et S3 offrent une fondation solide pour le stockage et la gestion des données en production. Une combinaison avec Lambda, EC2 ou ECS permet de construire une application cloud complète.
