---
title: Les containers Docker
description: "Présentation des conteneurs Docker, leur fonctionnement et des exemples d'utilisation."
tags: [Docker, Containerization, Devops]
---

Les conteneurs Docker sont des unités logicielles légères et portables qui encapsulent une application et ses dépendances dans une image. Ces images sont composées de plusieurs couches, souvent basées sur une distribution Linux légère comme Alpine, pour minimiser la taille. Les conteneurs permettent de maintenir des applications isolées et cohérentes, indépendamment de l'environnement d'exécution.

<!--truncate-->

## Qu'est-ce qu'un conteneur Docker ?

Un conteneur Docker est une unité logicielle légère et portable qui encapsule une application et ses dépendances dans une image. Ces images sont composées de plusieurs couches, souvent basées sur une distribution Linux légère comme Alpine, pour minimiser la taille. Les conteneurs permettent de maintenir des applications isolées et cohérentes, indépendamment de l'environnement d'exécution.

### Structure d'un conteneur Docker

Un conteneur Docker est composé de plusieurs couches d'images empilées les unes sur les autres. À la base de la plupart des conteneurs, on trouve une image Linux, souvent Alpine en raison de sa petite taille. Les couches supérieures contiennent les dépendances et l'application elle-même. Cette structure en couches permet de réutiliser les couches communes entre plusieurs conteneurs, réduisant ainsi la taille et le temps de téléchargement.

### Différence entre une image Docker et un conteneur Docker

Une image Docker est un package statique qui contient tout ce dont une application a besoin pour fonctionner : le code, les bibliothèques, les dépendances et les configurations. C'est un modèle prêt à être exécuté. En revanche, un conteneur Docker est une instance en cours d'exécution de cette image. Lorsque vous démarrez un conteneur, Docker utilise l'image pour créer un environnement isolé où l'application peut s'exécuter. En d'autres termes, une image est un modèle, tandis qu'un conteneur est une instance active de ce modèle.

## Commandes Docker de base

Voici quelques commandes Docker de base pour gérer les conteneurs :

- `docker run` : Cette commande permet de créer et de démarrer un conteneur à partir d'une image Docker. Par exemple, `docker run redis` démarre un conteneur Redis.
- `docker ps` : Cette commande affiche la liste des conteneurs en cours d'exécution. Par exemple, `docker ps` montre tous les conteneurs actifs.
- `docker stop` : Cette commande arrête un conteneur en cours d'exécution. Par exemple, `docker stop <container_id>` arrête le conteneur spécifié.
- `docker start` : Cette commande redémarre un conteneur arrêté. Par exemple, `docker start <container_id>` redémarre le conteneur spécifié.

## Exemple pratique : Utilisation de PostgreSQL avec Docker

Pour illustrer l'utilisation des conteneurs Docker, prenons l'exemple de PostgreSQL. En utilisant Docker Hub, un dépôt public d'images Docker, on peut rechercher et télécharger une version spécifique de PostgreSQL. Par exemple, pour obtenir la version 9.6, il suffit d'exécuter la commande `docker pull` suivie de `docker run` pour démarrer le conteneur. Docker télécharge les couches nécessaires et démarre l'application automatiquement.

```bash
# Rechercher l'image officielle de PostgreSQL sur Docker Hub
docker search postgres

# Télécharger l'image de PostgreSQL version 9.6
docker pull postgres:9.6

# Démarrer un conteneur PostgreSQL avec la version 9.6
docker run --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres:9.6
```
