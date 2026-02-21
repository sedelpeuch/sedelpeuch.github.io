---
title: Roadmap Cloud 2026
description: Roadmap complète pour apprendre les bases du cloud, d'AWS, de Docker, de Kubernetes et de Terraform.
tags: [cloud, devops]
---

Roadmap prévisionnelle pour apprendre les bases du cloud avec AWS.

<!--truncate-->

## Bases AWS & EC2

La première étape est consacrée à la découverte des bases d'AWS et à la gestion d'une instance EC2. Voici les étapes à suivre :

- **Créer un compte AWS Free Tier** : Inscrivez-vous pour bénéficier de l'offre gratuite d'AWS.
- **Comprendre le modèle IAM** : Familiarisez-vous avec les concepts d'IAM (Users, Groups, Policies, Roles) pour sécuriser vos ressources.
- **Lancer une instance EC2 Linux** : Utilisez une instance t2.micro incluse dans le Free Tier.
- **Se connecter en SSH sur l’instance** : Apprenez à accéder à votre serveur via SSH.
- **Installer une application simple** : Par exemple, déployez un serveur web Nginx.
- **Gérer l’instance** : Apprenez à stopper, démarrer et terminer une instance manuellement.

**Objectif :** Savoir gérer un serveur cloud basique et comprendre les bases de la sécurité avec IAM.

## Réseau Cloud avec VPC

Dans cette étape, vous allez explorer les bases du réseau dans AWS en utilisant les Virtual Private Clouds (VPC) :

- **Comprendre les concepts de réseau** : VPC, subnets, Internet Gateway (IGW), NAT Gateway.
- **Créer un VPC personnalisé** : Configurez un VPC avec deux subnets (public et privé).
- **Configurer les tables de routage** : Définissez les règles de routage pour vos subnets.
- **Lancer une instance EC2 dans un subnet privé** : Apprenez à isoler vos ressources.
- **Accéder à une instance privée via un bastion** : Configurez un jump host dans le subnet public.
- **Découvrir les Security Groups et Network ACLs** : Comprenez comment sécuriser vos ressources.

**Objectif :** Comprendre le réseau AWS et sécuriser les accès.

## Stockage & Services complémentaires

Le stockage est un élément clé du cloud. Cette étape, vous allez explorer les services de stockage AWS :

- **Découvrir S3** : Créez un bucket, uploadez et téléchargez des fichiers.
- **Explorer EBS** : Créez un volume, attachez-le à une instance EC2 et montez-le.
- **Introduction à RDS** : Découvrez les bases de données managées.
- **Expérimenter les snapshots EBS** : Apprenez à sauvegarder vos données.

**Objectif :** Savoir gérer le stockage et les bases de données dans AWS.

## Docker & déploiement manuel

Docker est un outil essentiel pour le déploiement d'applications modernes. Cette étape, vous allez apprendre à utiliser Docker sur AWS :

- **Installer Docker sur une instance EC2** : Configurez Docker sur votre serveur.
- **Construire et lancer un conteneur Docker** : Par exemple, déployez un conteneur Nginx.
- **Pousser une image sur AWS ECR** : Apprenez à utiliser Elastic Container Registry.
- **Puller une image depuis ECR** : Lancez un conteneur à partir d'une image stockée.
- **Comprendre l’orchestration manuelle** : Explorez les bases de la gestion des conteneurs sans Kubernetes.

**Objectif :** Déployer des conteneurs sans Kubernetes et comprendre le cycle complet.

## Kubernetes managé avec EKS (pas à pas)

Kubernetes est une technologie clé pour l'orchestration des conteneurs. Cette étape, vous allez découvrir EKS, le service Kubernetes managé d'AWS :

- **Comprendre l’architecture EKS** : Familiarisez-vous avec les concepts de cluster Kubernetes managé.
- **Créer un cluster EKS basique** : Utilisez la console AWS pour configurer un cluster.
- **Installer kubectl** : Configurez l’accès à votre cluster.
- **Déployer une application simple** : Par exemple, un serveur Nginx sur EKS.
- **Découvrir les services Kubernetes** : Apprenez à utiliser Service et Ingress.
- **Surveiller le cluster** : Utilisez kubectl pour observer l’état de votre cluster.

**Objectif :** Premier contact avec Kubernetes managé et déploiement d’une application cloud-native.

## Introduction à Terraform

Pour automatiser la gestion de votre infrastructure, Terraform est un outil incontournable. Cette étape, vous allez apprendre à l’utiliser :

- **Installer Terraform** : Comprenez son workflow (init, plan, apply).
- **Écrire un fichier Terraform simple** : Créez une instance EC2 avec Terraform.
- **Gérer le réseau avec Terraform** : Ajoutez un VPC et un Security Group.
- **Tester les modifications** : Expérimentez la création, modification et suppression de ressources.
- **Versionner le code Terraform** : Publiez votre code sur GitHub.

**Objectif :** Automatiser la création d’infrastructure AWS de base.

Avec cette roadmap, vous serez en mesure de maîtriser les bases du cloud computing et de l’infrastructure en tant que code. Bonne chance dans votre apprentissage du cloud et d’AWS !
