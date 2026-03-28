---
title: Roadmap Cloud 2026
description: Roadmap complète pour apprendre les bases du cloud, d'AWS, de Docker, de Kubernetes et de Terraform.
tags: [cloud, devops]
---

Roadmap prévisionnelle pour apprendre les bases du cloud avec AWS.

<!--truncate-->

## Réseau Cloud avec VPC

Dans cette étape, vous allez explorer les bases du réseau dans AWS en utilisant les Virtual Private Clouds (VPC) :

- **Comprendre les concepts de réseau** : VPC, subnets, Internet Gateway (IGW), NAT Gateway.
- **Créer un VPC personnalisé** : Configurez un VPC avec deux subnets (public et privé).
- **Configurer les tables de routage** : Définissez les règles de routage pour vos subnets.
- **Lancer une instance EC2 dans un subnet privé** : Apprenez à isoler vos ressources.
- **Accéder à une instance privée via un bastion** : Configurez un jump host dans le subnet public.
- **Découvrir les Security Groups et Network ACLs** : Comprenez comment sécuriser vos ressources.

**Objectif :** Comprendre le réseau AWS et sécuriser les accès.

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
