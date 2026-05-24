---
title: "AWS : Docker sur EC2 et ECR"
description: "Installer Docker sur EC2, utiliser ECR comme registre privé avec authentification IAM, et poser les bases d'un déploiement automatisable."
tags: [cloud, devops]
---

Déployer une application conteneurisée sur AWS implique de connecter plusieurs services : une instance EC2 qui fait tourner les conteneurs, ECR comme registre privé d'images, et RDS pour la base de données. Chacun de ces services a ses propres règles réseau, son modèle d'authentification, et ses bonnes pratiques. Cet article couvre l'ensemble du pipeline — de l'installation de Docker sur l'instance jusqu'au déploiement depuis un registre privé, en passant par l'authentification sans credentials en clair.

<!--truncate-->

```
Poste dev
  │ docker build + docker push
  ▼
ECR (registre privé AWS)
  │ docker pull
  ▼
EC2 ──► base de données
```

## Installer Docker sur EC2

Sur Ubuntu, le paquet Docker des dépôts officiels Ubuntu est généralement en retard d'une ou deux versions majeures. Il faut ajouter le dépôt officiel Docker : ajout de la clé GPG, configuration de la source apt, puis `apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin`. Le plugin Compose est inclus directement — plus besoin de `docker-compose` séparé.

Le `usermod -aG docker ubuntu` donne accès au socket Docker sans sudo. C'est fonctionnellement équivalent à des droits root sur la machine, donc à réserver aux instances dédiées au déploiement.

### Deux couches de pare-feu

Un point qui génère souvent de la confusion en arrivant sur AWS : il y a deux pare-feu indépendants.

```
Internet
    │
    ▼
Security Group AWS    ← côté hyperviseur, avant l'OS
    │
    ▼
UFW (pare-feu Ubuntu) ← côté OS, dans l'instance
    │
    ▼
Application
```

Les **Security Groups** s'appliquent avant que le paquet touche l'instance et sont stateful — autoriser l'entrant suffit, la réponse sort automatiquement. Ils se configurent dans la console AWS et s'appliquent à toutes les instances du groupe.

**UFW** est inactif par défaut sur Ubuntu. En production, l'activer ajoute une deuxième couche de défense : si une instance du VPC est compromise (attaque latérale depuis une autre ressource du réseau privé), UFW peut bloquer les connexions non autorisées même si le Security Group ne le fait pas. L'activation se résume à `ufw allow 22 && ufw allow 8000 && ufw enable` — mais l'ordre compte : autoriser SSH avant d'activer pour ne pas se couper l'accès.

## ECR — Registre privé AWS

ECR (Elastic Container Registry) est l'équivalent AWS de GHCR : un registre privé d'images Docker. La différence clé avec GHCR est l'intégration native avec IAM — l'authentification passe par les mêmes mécanismes que tous les autres services AWS, pas par un Personal Access Token à rotation manuelle.

Le workflow respecte une séparation des rôles : le build et le push se font depuis le poste dev ou la CI/CD, l'EC2 ne fait que puller.

```
Poste dev                      EC2
docker build                   │
docker push ──► ECR ◄── docker pull
  (écriture)      (lecture seule)
```

Côté poste dev, l'authentification utilise `aws ecr get-login-password` qui génère un token temporaire (12h) passé directement à `docker login`. L'image est ensuite taguée avec l'URI ECR complet (`<account>.dkr.ecr.<region>.amazonaws.com/<repo>:<tag>`) avant d'être poussée.

### Stratégie de tags

Le tag `latest` est pratique mais dangereux en production : il est muable, un `docker pull` peut ramener une version différente sans que rien ne le signale. Les deux approches stables sont le **tag sémantique** (`v1.2.3`) ou le **SHA du commit git** (`abc1234`). Le SHA git est particulièrement intéressant : il lie chaque image à un commit précis, ce qui rend les rollbacks et le debugging triviaux.

```
mon-app:latest           ← muable, éviter en prod
mon-app:v1.2.3           ← stable, lisible
mon-app:abc1234          ← traçable jusqu'au commit
```

En pratique, une CI/CD pousse trois tags pour la même image : le SHA (traçabilité), la version sémantique (rollback facile) et `latest` (commodité en dev).

### Lifecycle policies — ne pas laisser s'accumuler les images

ECR facture le stockage. Sans politique de rétention, chaque build pousse une nouvelle image qui s'accumule indéfiniment. ECR propose des **lifecycle policies** : des règles qui suppriment automatiquement les images selon des critères (âge, nombre, tag).

Une politique courante : garder les 10 dernières images taguées et supprimer automatiquement toutes les images non taguées de plus de 7 jours. Les images non taguées (`untagged`) sont les "dangling images" créées quand un tag existant est réassigné — elles ne servent plus à rien mais occupent de l'espace.

ECR propose aussi le **scan de vulnérabilités** sur push : chaque image poussée est analysée contre une base CVE, les résultats sont visibles dans la console. Ça ne remplace pas un scanner intégré à la CI/CD mais c'est une sécurité supplémentaire sans configuration.

### Authentification sur l'EC2 — IAM Role et IMDS

C'est là que les mauvaises pratiques s'installent le plus facilement. La tentation est de faire `aws configure` sur l'instance avec des clés IAM permanentes — elles atterrissent dans `~/.aws/credentials` en clair sur disque. Si l'instance est compromise, les clés le sont aussi et elles restent valides jusqu'à révocation manuelle.

La bonne approche est le **rôle IAM** attaché à l'instance. AWS injecte automatiquement des credentials temporaires via l'**Instance Metadata Service** (IMDS), accessible depuis l'intérieur de l'instance à l'adresse `169.254.169.254`. Ce sont des tokens STS (Security Token Service) avec une expiration de 1h et rotation automatique — jamais écrits sur le disque, jamais visibles dans un fichier de configuration.

AWS CLI les consomme automatiquement via la chaîne de credentials providers : il interroge l'IMDS si aucune variable d'environnement ni fichier de credentials n'est présent. La policy `AmazonEC2ContainerRegistryReadOnly` attachée au rôle suffit pour puller.

**IMDSv2** est la version actuelle de ce service. La différence avec IMDSv1 est importante sur le plan de la sécurité : IMDSv2 requiert un token de session obtenu via une requête PUT préalable, ce qui empêche les attaques SSRF (Server-Side Request Forgery) d'accéder aux credentials. Sur une EC2 récente, forcer IMDSv2 se fait au niveau de l'instance dans la console AWS — option recommandée.

Il reste un dernier problème résiduel : même avec un rôle IAM, `docker login` stocke son token dans `~/.docker/config.json` en clair. Le **credential helper** `amazon-ecr-credential-helper` supprime ce maillon — Docker l'appelle directement à chaque pull pour obtenir un token frais depuis l'IMDS, rien n'est stocké sur disque.

```json
// ~/.docker/config.json
{
  "credHelpers": {
    "123456789012.dkr.ecr.eu-west-3.amazonaws.com": "ecr-login"
  }
}
```

Avec cette configuration, `docker pull` fonctionne directement sans aucun `docker login` préalable.

## RDS — Déléguer la base de données

En développement, PostgreSQL dans un conteneur Compose suffit. En production, gérer les sauvegardes, la haute disponibilité et les mises à jour du moteur à la main sur une EC2 n'a pas de sens — c'est le problème que RDS résout.

L'architecture passe de tout-en-un à une séparation claire des responsabilités :

```
Avant                        Après

EC2                          EC2
├─ conteneur app             └─ conteneur app ──► RDS PostgreSQL
└─ conteneur postgres                             (backups, HA, patches gérés)
   └─ volume pgdata
```

RDS doit être dans le **même VPC** que l'EC2 avec l'accès public désactivé — la communication passe par le réseau privé AWS. Le Security Group RDS autorise le port 5432 depuis le Security Group de l'EC2, pas depuis une IP fixe qui changerait si l'instance est recréée. L'endpoint RDS est un nom DNS stable, indépendant du cycle de vie de l'instance sous-jacente.

Le `docker-compose.yml` de production reflète cette simplification : plus de service `db`, plus de volume, plus de `build: .`. L'image vient d'ECR, la base vient de RDS.

```yaml
services:
  app:
    image: 123456789012.dkr.ecr.eu-west-3.amazonaws.com/mon-app:latest
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://user:password@mon-app-db.xxxxxxxx.eu-west-3.rds.amazonaws.com:5432/postgres
```

Un point à noter : la `DATABASE_URL` contient le mot de passe en clair. C'est acceptable en dev, problématique en prod. La solution AWS est **SSM Parameter Store** ou **Secrets Manager** — le secret est stocké chiffré dans AWS, l'instance le lit via son rôle IAM, il ne transite jamais dans le Compose ni dans le versioning.

## Vers l'automatisation

Tout ce qui a été fait dans cet article l'a été manuellement : connexion SSH, installation de Docker, configuration du credential helper, démarrage du Compose. C'est la bonne façon de comprendre ce qui se passe. Ce n'est pas la bonne façon de le faire en production.

Il y a trois niveaux d'automatisation à empiler, chacun avec un périmètre distinct.

**Terraform** provisionne l'infrastructure : il crée l'EC2 avec le bon rôle IAM déjà attaché, configure le Security Group avec les bonnes règles, crée le dépôt ECR. C'est déclaratif et versionnable — la commande `terraform apply` reproduit exactement la même infrastructure à l'identique. Plus besoin de cliquer dans la console.

**User Data** est un script bash injecté dans l'EC2 au premier démarrage. C'est là que va l'installation Docker, la configuration du credential helper, le clone du dépôt Compose. Terraform peut passer ce script directement à l'instance. Résultat : une EC2 fraîche est opérationnelle sans intervention manuelle.

**Ansible** complète User Data pour les configurations plus complexes ou les mises à jour sur des instances existantes. Là où User Data s'exécute une seule fois au boot, Ansible peut être rejoué autant de fois que nécessaire de manière idempotente. Il peut aussi gérer un parc de plusieurs instances en parallèle.

**GitHub Actions** (ou toute CI/CD) automatise le cycle build/push : à chaque merge sur `main`, l'image est buildée, taguée avec le SHA du commit, poussée sur ECR. Le déploiement sur l'EC2 peut être déclenché ensuite — soit par SSH avec `docker compose pull && docker compose up -d`, soit via un service comme AWS CodeDeploy.

```
git push
    │
    ▼ GitHub Actions
build → tag (SHA) → push ECR
    │
    ▼ déclenchement déploiement
EC2 : docker compose pull + up -d
```

La combinaison des trois — Terraform pour l'infra, User Data/Ansible pour la config, CI/CD pour les déploiements — donne un pipeline où aucune étape manuelle n'est nécessaire entre un `git push` et une mise en production. C'est l'objectif de la prochaine partie de cette roadmap.

## Limites du déploiement manuel

Même automatisé, ce modèle reste limité à une seule EC2. Un crash de conteneur n'est pas détecté automatiquement, scaler implique de provisionner de nouvelles instances, et un déploiement sans coupure requiert une configuration manuelle (load balancer, rolling update).

C'est le problème qu'un orchestrateur résout nativement. Sur AWS, **EKS** (Elastic Kubernetes Service) est la réponse — c'est l'étape suivante de cette roadmap.
