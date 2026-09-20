---
title: TaskHorizon
tags: [fastapi, kubernetes, helm, terraform, aws, eks, cicd, github-actions, python, react]
description: Application Kanban FastAPI + React déployée sur AWS EKS via Terraform, avec un chart Helm multi-environnement et un pipeline CI/CD GitHub Actions du commit au cluster.
---

<div className="project-meta-grid">
  <div className="project-meta-item">🛑 Terminé</div>
  <div className="project-meta-item">📅 2025 – 2026</div>
  <div className="project-meta-item">🔧 FastAPI · React · PostgreSQL · Terraform · Helm · AWS EKS · GitHub Actions</div>
</div>

## Contexte

TaskHorizon est une application de gestion de tâches Kanban développée seul, sans ambition produit. Son rôle est de servir de terrain d'expérimentation pour un ensemble de compétences DevOps et backend rarement réunies dans un même projet professionnel : conception d'API, modélisation de données, infrastructure as code, orchestration Kubernetes multi-environnement et automatisation CI/CD. Chaque décision (stack, stratégie de déploiement, gestion des secrets, résilience) est prise et assumée de bout en bout, sans contrainte organisationnelle héritée.

L'API REST (FastAPI + PostgreSQL) et l'interface React constituent le support fonctionnel qui rend le projet concret. Le périmètre décrit ci-dessous porte sur ce qui l'entoure.

## Stack technique

<div className="tech-list">
  <div className="tech-list-row">
    <div className="tech-list-label">Backend</div>
    <div className="tech-list-value">Python, FastAPI, SQLAlchemy, Alembic, Pydantic</div>
  </div>
  <div className="tech-list-row">
    <div className="tech-list-label">Frontend</div>
    <div className="tech-list-value">React, TypeScript, Vite</div>
  </div>
  <div className="tech-list-row">
    <div className="tech-list-label">Données</div>
    <div className="tech-list-value">PostgreSQL</div>
  </div>
  <div className="tech-list-row">
    <div className="tech-list-label">Conteneurisation & orchestration</div>
    <div className="tech-list-value">Docker, Kubernetes, Helm</div>
  </div>
  <div className="tech-list-row">
    <div className="tech-list-label">Infrastructure as code</div>
    <div className="tech-list-value">Terraform, modules terraform-aws-modules</div>
  </div>
  <div className="tech-list-row">
    <div className="tech-list-label">Cloud (AWS)</div>
    <div className="tech-list-value">EKS, VPC, RDS, S3, IAM / IRSA</div>
  </div>
  <div className="tech-list-row">
    <div className="tech-list-label">CI/CD</div>
    <div className="tech-list-value">GitHub Actions</div>
  </div>
  <div className="tech-list-row">
    <div className="tech-list-label">Qualité</div>
    <div className="tech-list-value">pytest, Vitest, Ruff, Black, pre-commit</div>
  </div>
</div>

## Modèle de données et logique métier

Le schéma repose sur quatre entités : `User`, `Column`, `Task`, `Label`. Les identifiants sont des UUID générés côté application plutôt que des séquences auto-incrémentées, pour ne jamais exposer d'information sur le volume de données via un identifiant public.

La couche API sépare strictement les schémas Pydantic (validation et sérialisation) des modèles SQLAlchemy : un endpoint ne retourne jamais un objet ORM directement, ce qui évite d'exposer un champ interne ou une relation lazy-loaded par accident. La session SQLAlchemy est injectée par requête via le système de dépendances FastAPI, ouverte et fermée dans le même cycle de vie de la requête.

Le déplacement d'une tâche (`POST /tasks/{id}/move`) est l'opération la plus sensible du modèle : elle recalcule les positions des tâches adjacentes, dans la colonne d'origine et dans la colonne de destination, à l'intérieur d'une seule transaction. L'objectif est d'éviter un état incohérent, deux tâches à la même position, si l'opération échoue à mi-chemin.

Les migrations de schéma sont gérées par Alembic, découplées de l'initialisation applicative : au démarrage, l'application se contente d'insérer les données de référence (les trois colonnes par défaut, le compte administrateur) si elles sont absentes, sans jamais toucher au schéma lui-même.

## Authentification

L'authentification repose sur des JWT signés en HS256, avec un mot de passe haché en bcrypt. Le jeton porte l'identifiant utilisateur, l'email et le statut administrateur, avec une expiration de 24 heures. Une dépendance FastAPI dédiée (`require_admin`) restreint certains endpoints aux comptes administrateur, en s'appuyant sur la même vérification de jeton que l'authentification standard plutôt que sur une logique dupliquée.

Le secret de signature JWT et le mot de passe du compte administrateur ne sont jamais définis en dur : ils sont injectés par variable d'environnement, elle-même alimentée par le pipeline de déploiement.

## Déploiement Kubernetes

Un chart Helm unique gère trois environnements (`taskhorizon-test`, `taskhorizon-staging`, `taskhorizon-prod`) cohabitant dans le même namespace. Chaque ressource porte le nom de la release en préfixe, et les `selectorLabels` incluent `app.kubernetes.io/instance` : sans cette discipline, un Service d'un environnement pourrait router du trafic vers les pods d'un autre.

La divergence la plus structurante entre environnements porte sur la persistance des données :

| Environnement | Base de données | Réplicas | Particularité |
| --- | --- | --- | --- |
| test | PostgreSQL sans volume | 1 | données perdues au redémarrage, état volontairement jetable |
| staging | StatefulSet PostgreSQL + PVC 5 Gi | variable | PodDisruptionBudget actif |
| prod | RDS externe (Secret pré-existant) | 3, piloté par HPA | pas de `replicas` fixe dans le Deployment |

En production, le Deployment ne fixe pas de nombre de réplicas : c'est le `HorizontalPodAutoscaler` (seuil CPU à 70 %) qui en a la charge. Définir `replicas` et activer un HPA simultanément produit un conflit de contrôle aux effets imprévisibles lors d'un rollback : les deux mécanismes se disputent la valeur cible.

Le mot de passe de connexion à la base ne transite jamais par un ConfigMap : il est lu depuis un Secret Kubernetes et substitué au runtime par le kubelet via `$(DB_PASSWORD)`. En staging, ce mot de passe est fourni au moment du déploiement via `--set`, sans jamais résider dans un fichier de values versionné. En production, le chart ne crée aucun Secret de base de données : il référence par son nom un Secret provisionné hors bande, cohérent avec le fait que l'instance RDS elle-même est hors du contrôle du chart applicatif.

Le frontend nginx proxifie `/api/` vers le service API interne, dont l'adresse dépend du nom de la release (`taskhorizon-test-api:8000`, `taskhorizon-prod-api:8000`, etc.). Cette configuration est générée dans un ConfigMap, et le Deployment web porte une annotation de checksum sur ce ConfigMap : toute modification de la configuration nginx déclenche un rolling restart automatique, sans intervention manuelle.

## Infrastructure AWS

Le cluster tourne sur AWS EKS (région `eu-west-3`), provisionné par Terraform plutôt que créé manuellement dans la console. Le réseau comprend un VPC dédié avec quatre sous-réseaux répartis sur deux zones de disponibilité (deux publics, deux privés), condition requise pour la haute disponibilité d'EKS et de RDS. Les sous-réseaux publics portent les tags `kubernetes.io/role/elb` et les privés `kubernetes.io/role/internal-elb`, qui indiquent au contrôleur de Load Balancer AWS où créer les répartiteurs de charge externes ou internes. Une NAT Gateway unique permet aux nœuds situés en sous-réseau privé de sortir vers Internet sans y être exposés directement.

L'accès aux avatars utilisateurs illustre le choix d'éviter les identifiants statiques : ils sont stockés dans un bucket S3 dont l'accès public est bloqué à quatre niveaux (ACL, policy de bucket, et leurs équivalents « ignore »), et dont la policy n'autorise qu'un unique rôle IAM. Ce rôle est assumé par les pods de l'API via IRSA (IAM Roles for Service Accounts) : le ServiceAccount Kubernetes de l'API est fédéré à ce rôle par le fournisseur OIDC du cluster, ce qui permet aux pods d'obtenir des permissions S3 sans qu'aucune clé d'accès ne soit stockée dans le cluster.

L'instance RDS est provisionnée de façon conditionnelle (`enable_rds`), chiffrée au repos, avec une politique `prevent_destroy` pour éviter une suppression accidentelle par un `terraform apply` mal ciblé.

## Intégration et déploiement continus

Trois workflows GitHub Actions couvrent le cycle du commit à la production :

**`pr-checks`** s'exécute sur chaque pull request : hooks pre-commit (Ruff, Black), tests de l'API avec couverture (pytest), vérification qu'aucune migration Alembic n'est en attente contre une instance PostgreSQL éphémère, puis côté web, vérification de type (`tsc`), tests (Vitest) et build. Chaque étape publie son résultat en commentaire sur la pull request plutôt que de forcer à consulter les logs bruts de la CI.

**`deploy-test`** se déclenche sur chaque push vers `master` : construction et publication des images Docker taguées `:main`, application Terraform sur l'environnement de test, puis déploiement Helm. C'est un flux continu, sans porte d'entrée : tout ce qui atteint `master` finit sur l'environnement de test.

**`deploy-staging`** se déclenche sur un tag sémantique (`vX.Y.Z`) : construction des images versionnées, application Terraform sur l'environnement staging, récupération de l'endpoint RDS en sortie Terraform, puis déploiement Helm avec injection des secrets (JWT, mot de passe administrateur, mot de passe de base de données) via `--set`. Le passage par un tag plutôt qu'un déclenchement automatique sur `master` fait de la promotion vers staging un acte volontaire.

Il n'existe pas de workflow `deploy-prod` : le déploiement en production reste manuel, ce qui est cohérent avec le choix de provisionner l'instance RDS et les secrets de production hors du pipeline plutôt que de les faire transiter par GitHub Actions.

## Liens

- 💻 Code source : [github.com/sedelpeuch/task_horizon](https://github.com/sedelpeuch/task_horizon)
