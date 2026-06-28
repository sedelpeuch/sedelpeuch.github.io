---
title: "Docker : conteneurs et images"
description: "Fonctionnement des images et conteneurs Docker : couches, cycle de vie, réseau, volumes et commandes essentielles."
tags: [containerization, devops]
---

Une image Docker est un artefact statique. Un conteneur est une image en cours d'exécution. Cette distinction est simple mais fondamentale : on distribue des images, on exécute des conteneurs. Comprendre leur structure et leur cycle de vie permet de diagnostiquer rapidement les problèmes et de concevoir des Dockerfiles efficaces.

<!--truncate-->

## Structure d'une image en couches

Une image est une pile de couches en lecture seule. Chaque instruction d'un Dockerfile ajoute une couche :

```dockerfile
FROM alpine:3.19          # couche 1 : ~7 Mo
RUN apk add python3       # couche 2 : ~50 Mo
COPY app.py /app/         # couche 3 : quelques Ko
CMD ["python3", "/app/app.py"]
```

Les couches sont immuables et identifiées par un hash SHA256. Si deux images partagent les mêmes couches inférieures (même image de base, mêmes dépendances), ces couches ne sont stockées qu'une seule fois sur le disque et dans le registry. `docker pull` ne télécharge que les couches absentes localement.

Quand un conteneur démarre, Docker ajoute une couche de lecture-écriture au-dessus des couches de l'image. Toutes les modifications faites dans le conteneur (fichiers créés, modifiés, supprimés) se font dans cette couche — l'image sous-jacente reste intacte. Si le conteneur est supprimé, cette couche disparaît avec lui.

## Cycle de vie d'un conteneur

```bash
# Créer et démarrer un conteneur
docker run -d --name api -p 8000:8000 myapp:latest

# États possibles
docker ps           # conteneurs en cours d'exécution
docker ps -a        # tous les conteneurs (including arrêtés)

# Contrôle du cycle de vie
docker stop api     # arrêt gracieux (SIGTERM, puis SIGKILL après timeout)
docker start api    # redémarrage d'un conteneur arrêté
docker restart api  # stop + start
docker rm api       # suppression (le conteneur doit être arrêté)
docker rm -f api    # suppression forcée
```

`docker run` = `docker create` + `docker start`. Les options importantes :

```bash
docker run \
  -d \                          # mode détaché (arrière-plan)
  --name postgres \             # nom du conteneur
  -p 5432:5432 \                # mapping port hôte:conteneur
  -e POSTGRES_PASSWORD=secret \ # variable d'environnement
  -v postgres_data:/var/lib/postgresql/data \ # volume nommé
  --restart unless-stopped \    # politique de redémarrage
  postgres:16-alpine
```

## Réseau

Par défaut, Docker crée un réseau bridge `docker0`. Les conteneurs sur le même réseau bridge peuvent se joindre par leur nom. Un conteneur sans `-p` n'est pas accessible depuis l'hôte — il n'est joignable que depuis d'autres conteneurs du même réseau.

```bash
# Créer un réseau dédié
docker network create myapp

# Rattacher des conteneurs à ce réseau
docker run -d --network myapp --name db postgres:16-alpine
docker run -d --network myapp --name api myapp:latest

# "api" peut joindre "db" via db:5432
```

`docker network ls` liste les réseaux, `docker inspect <conteneur>` montre les détails réseau d'un conteneur.

## Volumes

Les données écrites dans le filesystem d'un conteneur disparaissent à sa suppression. Les volumes persistent les données en dehors du cycle de vie du conteneur.

```bash
# Volume nommé (géré par Docker)
docker volume create postgres_data
docker run -v postgres_data:/var/lib/postgresql/data postgres:16-alpine

# Bind mount (répertoire de l'hôte)
docker run -v /home/user/data:/data myapp:latest

# Volume temporaire en mémoire
docker run --tmpfs /tmp myapp:latest
```

Les volumes nommés sont préférés en production — Docker gère leur emplacement (`/var/lib/docker/volumes/`), ils survivent aux `docker rm`, et ils sont plus performants que les bind mounts sur macOS et Windows.

## Commandes de gestion courantes

```bash
# Images
docker images               # lister les images locales
docker pull nginx:alpine    # télécharger une image
docker rmi nginx:alpine     # supprimer une image locale
docker build -t myapp:1.0 . # construire une image depuis le répertoire courant

# Nettoyage
docker system prune         # supprimer conteneurs arrêtés, images orphelines, réseaux inutilisés
docker system prune -a      # supprimer également les images non utilisées par un conteneur actif
docker volume prune         # supprimer les volumes non rattachés à un conteneur
```

`docker system df` affiche l'espace disque utilisé par Docker (images, conteneurs, volumes, cache de build).
