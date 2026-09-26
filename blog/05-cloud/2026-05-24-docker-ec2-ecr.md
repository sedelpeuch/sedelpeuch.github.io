---
title: "AWS : Docker sur EC2 et ECR"
description: "Installer Docker sur EC2, utiliser ECR comme registre privé avec authentification IAM, et poser les bases d'un déploiement automatisable."
series: aws
tags: [cloud, devops]
---

Déployer une application conteneurisée sur AWS implique de connecter plusieurs services : une instance EC2 qui fait tourner les conteneurs, ECR comme registre privé d'images, et RDS pour la base de données. Chacun de ces services a ses propres règles réseau, son modèle d'authentification, et ses bonnes pratiques. Cet article couvre l'ensemble du pipeline, de l'installation de Docker sur l'instance jusqu'au déploiement depuis un registre privé, en passant par l'authentification sans credentials en clair.

<!--truncate-->

```text
Poste dev
  │ docker build + docker push
  ▼
ECR (registre privé AWS)
  │ docker pull
  ▼
EC2 ──► base de données
```

## Installer Docker sur EC2

Sur Ubuntu, le paquet `docker.io` des dépôts de la distribution suit le rythme des versions Ubuntu et accuse souvent plusieurs versions de retard sur Docker Engine. Le dépôt officiel de Docker fournit les dernières versions, ainsi que les plugins Buildx et Compose v2 (`docker compose`, qui remplace l'ancien binaire Python `docker-compose`) :

```bash
# Clé GPG et dépôt officiel Docker
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \
  https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Accès au socket sans sudo (effectif à la prochaine connexion)
sudo usermod -aG docker ubuntu
```

Sur Amazon Linux 2023, `sudo dnf install -y docker` suivi de `sudo systemctl enable --now docker` suffit ; le plugin Compose s'installe séparément.

Le `usermod -aG docker ubuntu` donne accès au socket Docker sans sudo. C'est fonctionnellement équivalent à des droits root sur la machine (un `docker run -v /:/host` suffit à modifier n'importe quel fichier), donc à réserver aux instances dédiées au déploiement.

### Deux couches de pare-feu

Une instance EC2 est protégée par deux pare-feu indépendants :

```text
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

Les **Security Groups** s'appliquent avant que le paquet touche l'instance et sont stateful : autoriser l'entrant suffit, la réponse sort automatiquement. Ils se configurent dans la console AWS et s'appliquent à toutes les instances du groupe.

**UFW** est inactif par défaut sur Ubuntu. L'activer ajoute une deuxième couche de défense : si une autre ressource du VPC est compromise (mouvement latéral), UFW peut bloquer les connexions non autorisées même si le Security Group est trop permissif. L'activation se résume à `ufw allow 22 && ufw enable`, et l'ordre compte : autoriser SSH avant d'activer pour ne pas se couper l'accès.

UFW ne filtre cependant pas les ports publiés par Docker. Un `-p 8000:8000` (ou `ports:` dans Compose) fait insérer par Docker des règles de NAT dans iptables : le trafic vers le conteneur est redirigé dans la chaîne `PREROUTING` puis traverse la chaîne `FORWARD` (via `DOCKER-USER` et `DOCKER`), sans passer par la chaîne `INPUT` où UFW applique ses règles. Un port publié reste donc joignable même en l'absence de `ufw allow`. Pour limiter l'exposition, un port peut être publié sur la seule interface locale (`127.0.0.1:8000:8000`, derrière un reverse proxy), ou filtré par des règles ajoutées dans la chaîne `DOCKER-USER` ; le Security Group reste la barrière effective pour le trafic venant de l'extérieur.

## ECR, le registre privé d'AWS

ECR (Elastic Container Registry) est l'équivalent AWS de GHCR : un registre privé d'images Docker. Ce qui le distingue de GHCR est l'intégration native avec IAM : l'authentification passe par les mêmes mécanismes que tous les autres services AWS, pas par un Personal Access Token à rotation manuelle.

Le workflow respecte une séparation des rôles : le build et le push se font depuis le poste dev ou la CI/CD, l'EC2 ne fait que puller.

```text
Poste dev                      EC2
docker build                   │
docker push ──► ECR ◄── docker pull
  (écriture)      (lecture seule)
```

Côté poste dev, l'authentification utilise `aws ecr get-login-password` qui génère un token temporaire (12h) passé directement à `docker login`. L'image est ensuite taguée avec l'URI ECR complet (`<account>.dkr.ecr.<region>.amazonaws.com/<repo>:<tag>`) avant d'être poussée.

```bash
REGISTRY=123456789012.dkr.ecr.eu-west-3.amazonaws.com

# Créer le dépôt (une seule fois)
aws ecr create-repository --repository-name mon-app --region eu-west-3 \
  --image-scanning-configuration scanOnPush=true

# Authentifier Docker auprès du registre (jeton valable 12 heures)
aws ecr get-login-password --region eu-west-3 \
  | docker login --username AWS --password-stdin "$REGISTRY"

# Construire, taguer avec l'URI complète, pousser
docker build -t "$REGISTRY/mon-app:$(git rev-parse --short HEAD)" .
docker push "$REGISTRY/mon-app:$(git rev-parse --short HEAD)"
```

### Stratégie de tags

Le tag `latest` est pratique mais risqué en production : il est muable, un `docker pull` peut ramener une version différente sans que rien ne le signale. Les deux approches stables sont le **tag sémantique** (`v1.2.3`) ou le **SHA du commit git** (`abc1234`). Le SHA git lie chaque image à un commit précis : revenir à une version antérieure consiste à redéployer le tag du commit correspondant, et le code exécuté en production se retrouve directement dans l'historique Git.

```text
mon-app:latest           ← muable, éviter en prod
mon-app:v1.2.3           ← stable, lisible
mon-app:abc1234          ← traçable jusqu'au commit
```

En pratique, une CI/CD pousse le tag SHA à chaque build, y ajoute la version sémantique lorsqu'il s'agit d'une release, et maintient éventuellement un tag mobile (`latest` ou `main`) pour la commodité en développement ; seuls les tags immuables sont référencés par les déploiements. Le pipeline décrit dans l'article [pipeline CI/CD vers EKS](../04-ci-cd/2026-07-19-pipeline-cicd-eks.md) applique ce schéma. ECR peut rendre les tags immuables au niveau du dépôt (`imageTagMutability=IMMUTABLE`) : toute tentative de repousser un tag existant est alors refusée.

### Lifecycle policies

ECR facture le stockage. Sans politique de rétention, chaque build pousse une nouvelle image qui s'accumule indéfiniment. ECR propose des **lifecycle policies** : des règles qui suppriment automatiquement les images selon des critères (âge, nombre, tag).

Une politique courante : garder les 10 dernières images taguées et supprimer automatiquement toutes les images non taguées de plus de 7 jours. Les images non taguées (`untagged`) sont les images « orphelines » créées quand un tag existant est réassigné à une nouvelle image ; elles ne servent plus à rien mais occupent de l'espace.

```json
{
  "rules": [
    {
      "rulePriority": 1,
      "description": "Images non taguées de plus de 7 jours",
      "selection": {
        "tagStatus": "untagged",
        "countType": "sinceImagePushed",
        "countUnit": "days",
        "countNumber": 7
      },
      "action": { "type": "expire" }
    },
    {
      "rulePriority": 2,
      "description": "Conserver les 10 images taguées les plus récentes",
      "selection": {
        "tagStatus": "any",
        "countType": "imageCountMoreThan",
        "countNumber": 10
      },
      "action": { "type": "expire" }
    }
  ]
}
```

```bash
aws ecr put-lifecycle-policy --repository-name mon-app \
  --lifecycle-policy-text file://lifecycle.json
```

ECR propose aussi le **scan de vulnérabilités** à la publication (`scanOnPush`, à activer par dépôt ou au niveau du registre) : chaque image poussée est analysée contre une base CVE, les résultats sont visibles dans la console. Le scan « amélioré », fondé sur Amazon Inspector, analyse aussi les paquets des langages et réévalue les images en continu lorsque de nouvelles CVE sont publiées. Il ne remplace pas un scanner intégré à la CI/CD, qui bloque une image vulnérable avant sa publication.

### Authentification sur l'EC2 : rôle IAM et IMDS

L'erreur la plus fréquente consiste à exécuter `aws configure` sur l'instance avec des clés IAM permanentes, qui atterrissent dans `~/.aws/credentials` en clair sur disque. Si l'instance est compromise, les clés le sont aussi et elles restent valides jusqu'à révocation manuelle.

L'approche recommandée est le **rôle IAM** attaché à l'instance (via un *instance profile*). AWS met à disposition des credentials temporaires via l'**Instance Metadata Service** (IMDS), accessible depuis l'intérieur de l'instance à l'adresse `169.254.169.254`. Ce sont des identifiants STS (Security Token Service) de durée limitée, renouvelés automatiquement avant leur expiration ; ils ne sont jamais écrits sur le disque ni visibles dans un fichier de configuration.

AWS CLI les consomme automatiquement via la chaîne de credentials providers : il interroge l'IMDS si aucune variable d'environnement ni fichier de credentials n'est présent. La policy `AmazonEC2ContainerRegistryReadOnly` attachée au rôle suffit pour puller.

**IMDSv2** est la version actuelle de ce service. La différence avec IMDSv1 est importante sur le plan de la sécurité : IMDSv2 requiert un token de session obtenu via une requête PUT préalable, ce qui bloque l'essentiel des attaques SSRF (Server-Side Request Forgery), où une application vulnérable est amenée à effectuer une simple requête GET vers l'IMDS pour y lire les credentials.

```bash
# Obtenir un jeton de session (valable 6 heures au maximum)
TOKEN=$(curl -s -X PUT "http://169.254.169.254/latest/api/token" \
  -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")

# Lire le nom du rôle, puis ses identifiants temporaires
curl -s -H "X-aws-ec2-metadata-token: $TOKEN" \
  http://169.254.169.254/latest/meta-data/iam/security-credentials/
```

La réponse PUT porte un TTL IP (*hop limit*) : avec la valeur 1, le jeton ne peut pas franchir un saut réseau supplémentaire, ce qui empêche un conteneur sur un réseau bridge Docker d'atteindre l'IMDS. Les AMI Amazon Linux 2023 fixent cette limite à 2 pour permettre l'accès depuis les conteneurs ; la valeur se règle avec `aws ec2 modify-instance-metadata-options --http-put-response-hop-limit`. Imposer IMDSv2 (`--http-tokens required`) désactive IMDSv1 sur l'instance, ce qui est le réglage par défaut des AMI récentes.

Il reste un dernier point : même avec un rôle IAM, `docker login` stocke son jeton dans `~/.docker/config.json` (encodé en base64, donc lisible), et ce jeton expire au bout de 12 heures. Le **credential helper** `amazon-ecr-credential-helper` (paquet `amazon-ecr-credential-helper` sur Ubuntu et Amazon Linux) supprime ce maillon : Docker l'appelle à chaque interaction avec le registre, et le helper obtient un jeton ECR à partir des credentials du rôle IAM. Aucun mot de passe de registre n'est écrit dans la configuration Docker.

Configuration dans `~/.docker/config.json` :

```json
{
  "credHelpers": {
    "123456789012.dkr.ecr.eu-west-3.amazonaws.com": "ecr-login"
  }
}
```

Avec cette configuration, `docker pull` fonctionne directement sans aucun `docker login` préalable.

## RDS pour la base de données

En développement, PostgreSQL dans un conteneur Compose suffit. En production, gérer les sauvegardes, la haute disponibilité et les mises à jour du moteur à la main sur une EC2 n'a pas de sens : RDS prend ces tâches en charge.

L'architecture passe de tout-en-un à une séparation claire des responsabilités :

```text
Avant                        Après

EC2                          EC2
├─ conteneur app             └─ conteneur app ──► RDS PostgreSQL
└─ conteneur postgres                             (backups, HA, patches gérés)
   └─ volume pgdata
```

RDS doit être dans le **même VPC** que l'EC2 avec l'accès public désactivé : la communication passe par le réseau privé AWS. Le Security Group RDS autorise le port 5432 depuis le Security Group de l'EC2, pas depuis une IP fixe qui changerait si l'instance est recréée. L'endpoint RDS est un nom DNS stable, indépendant du cycle de vie de l'instance sous-jacente.

Le `docker-compose.yml` de production reflète cette simplification : plus de service `db`, plus de volume, plus de `build: .`. L'image vient d'ECR, la base vient de RDS.

```yaml
services:
  app:
    image: 123456789012.dkr.ecr.eu-west-3.amazonaws.com/mon-app:${IMAGE_TAG:?IMAGE_TAG non défini}
    restart: unless-stopped
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://user:password@mon-app-db.xxxxxxxx.eu-west-3.rds.amazonaws.com:5432/postgres
```

`${IMAGE_TAG:?...}` impose de fournir le tag à déployer (par exemple `IMAGE_TAG=abc1234 docker compose up -d`) et fait échouer la commande s'il manque, plutôt que de retomber silencieusement sur `latest`. La `DATABASE_URL` contient en revanche le mot de passe en clair. C'est acceptable en dev, problématique en prod. La solution AWS est **SSM Parameter Store** ou **Secrets Manager** : le secret est stocké chiffré dans AWS, l'instance le lit via son rôle IAM, il ne transite jamais dans le Compose ni dans le versioning.

## Vers l'automatisation

Tout ce qui a été fait dans cet article l'a été manuellement : connexion SSH, installation de Docker, configuration du credential helper, démarrage du Compose. Cette démarche expose chaque mécanisme, mais elle n'est ni reproductible ni traçable, deux propriétés attendues en production.

Il y a trois niveaux d'automatisation à empiler, chacun avec un périmètre distinct.

**[Terraform](../08-iac/2026-06-21-terraform.md)** provisionne l'infrastructure : il crée l'EC2 avec le bon rôle IAM déjà attaché, configure le Security Group avec les bonnes règles, crée le dépôt ECR. La description est déclarative et versionnée : `terraform apply` reproduit la même infrastructure dans un autre compte ou une autre région, sans manipulation dans la console.

**User Data** est un script bash injecté dans l'EC2 au premier démarrage. C'est là que va l'installation Docker, la configuration du credential helper, le clone du dépôt Compose. Terraform peut passer ce script directement à l'instance. Résultat : une EC2 fraîche est opérationnelle sans intervention manuelle.

**[Ansible](../08-iac/2025-06-09-ansible-introduction.md)** complète User Data pour les configurations plus complexes ou les mises à jour sur des instances existantes. Là où User Data s'exécute une seule fois au boot, Ansible peut être rejoué autant de fois que nécessaire de manière idempotente. Il peut aussi gérer un parc de plusieurs instances en parallèle.

**GitHub Actions** (ou toute CI/CD) automatise le cycle build/push : à chaque merge sur `main`, l'image est buildée, taguée avec le SHA du commit, poussée sur ECR. Le déploiement sur l'EC2 peut être déclenché ensuite, soit par SSH avec `docker compose pull && docker compose up -d`, soit via un service comme AWS CodeDeploy.

```text
git push
    │
    ▼ GitHub Actions
build → tag (SHA) → push ECR
    │
    ▼ déclenchement déploiement
EC2 : docker compose pull + up -d
```

La combinaison des trois (Terraform pour l'infra, User Data/Ansible pour la config, CI/CD pour les déploiements) donne un pipeline où aucune étape manuelle n'est nécessaire entre un `git push` et une mise en production.

## Limites du déploiement manuel

Même automatisé, ce modèle reste limité à une seule EC2. La politique `restart: unless-stopped` relance un conteneur dont le processus s'arrête, mais ne détecte pas une application bloquée qui ne répond plus, et rien ne compense la perte de l'instance elle-même. Scaler implique de provisionner de nouvelles instances, et un déploiement sans coupure requiert une configuration manuelle (load balancer, rolling update).

C'est le problème qu'un orchestrateur résout nativement : sondes de santé, replanification sur un autre nœud, mises à jour progressives. Sur AWS, **EKS** (Elastic Kubernetes Service) fournit ce service managé, décrit dans l'article [EKS](./2026-06-28-eks.md).
