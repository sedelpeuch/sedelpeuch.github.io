---
title: DevOps Roadmap
description: Présentation de ma roadmap DevOps personnelle
tags: [Devops, Roadmap]
---
Ingénieur en informatique au [CATIE](http://catie.fr/) spécialisé en Robotique je suis amené à travailler sur des projets de développement logiciel et d'intégration sur différentes plateformes. Intrigué et passioné par l'intégration et l'automatisation des tâches, j'ai décidé d'approfondir mes connaissances en DevOps.

<!--truncate-->

Voici un résumé de ma roadmap DevOps personnelle pour 2024. Cette roadmap est basée sur mes expériences et mes objectifs personnels. Elle est sujette à des changements et des mises à jour régulières. N'hésitez pas à me contacter si vous avez des suggestions ou des commentaires.

# DevOps Roadmap

import IconTitle from '@site/src/components/IconTitle';

![DevOps](/img/devops.png)

## <IconTitle logo="mdi:code-braces" name="01 Concepts du développement logiciel"/>

Il est essentiel de comprendre les concepts suivants pour collaborer efficacement avec l'équipe de développement et automatiser les tâches :


- Collaboration des développeurs (Agile, Jira)
- Utilisation de Git
- Configuration des applications (Outils de build)
- Compréhension du cycle de vie du développement logiciel
- Tests automatisés

## <IconTitle logo="skill-icons:linux-light" name="02 OS & Linux"/>

Il est essentiel de préparer et de maintenir l'infrastructure (serveurs) sur laquelle l'application est déployée. Il est donc nécessaire de connaître les bases de l'administration d'un serveur et de l'installation de différents outils. Voici les concepts de base des systèmes d'exploitation à comprendre :

- Commandes Shell
- Système de fichiers Linux & Permissions
- Gestion des clés SSH
- Notions de base de la mise en réseau et de la sécurité
- Configuration des pare-feu pour sécuriser l'accès
- Comprendre comment fonctionnent les adresses IP, les ports et le DNS
- Équilibreurs de charge
- Proxies
- HTTP/HTTPS
- Virtualisation

## <IconTitle logo="skill-icons:docker" name="03 Contenérisation - Docker"/>

Les conteneurs sont devenus le standard de l'emballage logiciel, et il est essentiel de comprendre les concepts de virtualisation et de conteneurisation, ainsi que la gestion des applications conteneurisées sur un serveur. Docker, la technologie de conteneur la plus populaire, nécessite la maîtrise de plusieurs points clés.

- Exécuter des conteneurs
- Inspecter les conteneurs actifs
- Réseau Docker
- Persister les données avec les volumes Docker
- Dockeriser les applications en utilisant Dockerfiles
- Exécuter plusieurs conteneurs en utilisant Docker-Compose
- Travailler avec le dépôt Docker

## <IconTitle logo="skill-icons:githubactions-light" name="04 CI/CD Pipeline"/>

CI/CD est au cœur de DevOps. Toutes les modifications de code, telles que les nouvelles fonctionnalités ou les corrections de bugs, doivent être intégrées dans l'application existante et déployées pour l'utilisateur final de manière continue et automatisée. D'où le terme : Intégration Continue et Déploiement Continu (CI/CD).

- Configuration du serveur CI/CD
- Intégration du dépôt de code pour déclencher le pipeline automatiquement
- Outils de construction et de gestion de packages pour exécuter les tests et emballer l'application
- Configuration des dépôts d'artefacts (comme Nexus) et intégration avec le pipeline

## <IconTitle logo="skill-icons:aws-light" name="05 Apprendre un fournisseur de Cloud"/>

De nombreuses entreprises utilisent aujourd'hui une infrastructure virtuelle sur le cloud, plutôt que de gérer leur propre infrastructure. Les plateformes Infrastructure as a Service (IaaS) offrent une gamme de services supplémentaires, tels que la sauvegarde, la sécurité et l'équilibrage de charge. AWS est la plateforme IaaS la plus puissante et la plus largement utilisée, bien qu'elle soit également l'une des plus complexes. D'autres plateformes populaires incluent Microsoft Azure et Google Cloud. Ces services sont spécifiques à chaque plateforme, il est donc nécessaire d'apprendre les services de la plateforme choisie et de savoir gérer toute l'infrastructure de déploiement sur celle-ci. Par exemple, pour AWS, il est important de connaître les bases des services IAM, VPC et EC2.

- Service IAM - gestion des utilisateurs et des permissions
- Service VPC - votre réseau privé
- Service EC2 - serveurs virtuels

## <IconTitle logo="skill-icons:kubernetes" name="06 Orchestration de conteneurs - Kubernetes & Docker Swarm"/>

Avec la popularité et la facilité d'utilisation des conteneurs, de nombreuses entreprises exécutent des centaines ou des milliers de conteneurs sur plusieurs serveurs, nécessitant une gestion efficace. Pour cela, des outils d'orchestration de conteneurs comme Kubernetes (K8s) sont utilisés. Kubernetes est l'outil d'orchestration de conteneurs le plus populaire, et il est essentiel de le maîtriser.

- Apprendre les composants de base comme, Deployment, Service, ConfigMap, Secret, StatefulSet, Ingress
- CLI Kubernetes (Kubectl)
- Persistance des données avec les volumes K8s
- Namespaces
- Docker Swarm

## <IconTitle logo="skill-icons:prometheus" name="07 Monitoring & Observabilité"/>

Une fois le logiciel en production, il est important de le surveiller pour suivre les performances et découvrir les problèmes dans l'infrastructure et l'application. Ainsi, l'une des responsabilités d'un ingénieur DevOps est de :

- Prometheus : Un outil de surveillance et d'alerte populaire
- Grafana : Outil d'analyse et de visualisation interactive
- ELK Stack : Une pile de gestion de logs populaire

## <IconTitle logo="skill-icons:terraform-light" name="08 Infrastructure as Code"/>

Créer et maintenir manuellement une infrastructure est une tâche chronophage et sujette à erreurs, notamment lorsqu'il s'agit de répliquer l'infrastructure pour différents environnements tels que le développement, les tests et la production. En DevOps, l'objectif est d'automatiser autant que possible, et c'est là qu'intervient l'Infrastructure as Code.

- Terraform est l'outil de provisionnement d'infrastructure le plus populaire
- Ansible est l'outil de gestion de configuration le plus populaire

## <IconTitle logo="skill-icons:python-light" name="09 Langages de script - Python"/>

Travailler étroitement avec les développeurs et les administrateurs système pour automatiser les tâches de développement et d'opérations nécessite l'écriture de scripts et de petites applications. Pour cela, des compétences en scripting ou en programmation de base sont nécessaires. Python est un langage largement utilisé, facile à apprendre et adapté à de nombreux cas d'utilisation différents, en particulier en DevOps.

- Apprendre les bases de Python
- Écrire des scripts utilitaires, par exemple pour vider le cache, démarrer les builds et les déploiements
- Comprendre les concepts de programmation de base

<IconTitle logo="skill-icons:git" name="10 Contrôle de version - Git"/>

Toute la logique d'automatisation est écrite sous forme de code. Comme pour le code d'application, le code d'automatisation doit également être géré et hébergé sur un outil de contrôle de version, tel que Git. Git est l'outil de contrôle de version le plus populaire et le plus largement utilisé. Les fichiers sont stockés de manière centralisée dans un dépôt Git distant sur le web. Les dépôts Git les plus populaires sont GitHub et GitLab. Git est un outil CLI, installé localement. Il permet de suivre les modifications du code source et facilite la collaboration sur le code.

- Apprendre à utiliser un dépôt Git
- Maîtriser les commandes de base de Git, comme git clone, git branch, git pull/push, git merge, etc.
- Apprendre à collaborer sur un projet, comme créer des pull requests, faire des revues de code, gérer les branches
