---
title: "Docker : conteneurs et images"
description: "Fonctionnement des images et conteneurs Docker : couches, cycle de vie, réseau, volumes et commandes essentielles."
tags: [containerization, devops]
---

Une image Docker est un artefact statique. Un conteneur est une image en cours d'exécution. Cette distinction structure tout l'outillage : les images se distribuent, les conteneurs s'exécutent. Comprendre leur structure et leur cycle de vie permet de diagnostiquer rapidement les problèmes et de concevoir des Dockerfiles efficaces.

<!--truncate-->

## Structure d'une image en couches

Une image est une pile de couches en lecture seule. Chaque instruction qui modifie le système de fichiers (`RUN`, `COPY`, `ADD`) ajoute une couche ; `CMD`, `ENV` ou `EXPOSE` ne modifient que les métadonnées de l'image :

```dockerfile
# Image de base : ~7 Mo
FROM alpine:3.20
# Couche de ~50 Mo
RUN apk add --no-cache python3
# Couche de quelques Ko
COPY app.py /app/
# Métadonnée, aucune couche de fichiers
CMD ["python3", "/app/app.py"]
```

```bash
# Afficher les couches d'une image, leur taille et l'instruction qui les a produites
docker history myapp:latest
```

Les couches sont immuables et identifiées par un hash SHA256. Si deux images partagent les mêmes couches inférieures (même image de base, mêmes dépendances), ces couches ne sont stockées qu'une seule fois sur le disque et dans le registry. `docker pull` ne télécharge que les couches absentes localement.

Quand un conteneur démarre, Docker ajoute une couche de lecture-écriture au-dessus des couches de l'image. Toutes les modifications faites dans le conteneur (fichiers créés, modifiés, supprimés) se font dans cette couche ; l'image sous-jacente reste intacte. Si le conteneur est supprimé, cette couche disparaît avec lui.

Le pilote de stockage `overlay2` (OverlayFS) superpose ces couches en un seul système de fichiers. La modification d'un fichier issu de l'image déclenche un *copy-up* : le fichier entier est d'abord copié dans la couche d'écriture, puis modifié. Une suppression crée un fichier spécial (*whiteout*) qui masque le fichier de la couche inférieure sans libérer d'espace dans l'image. Ce mécanisme explique pourquoi les écritures intensives (bases de données, logs volumineux) doivent passer par des volumes, qui contournent OverlayFS.

## Cycle de vie d'un conteneur

```bash
# Créer et démarrer un conteneur
docker run -d --name api -p 8000:8000 myapp:latest

# États possibles
docker ps           # conteneurs en cours d'exécution
docker ps -a        # tous les conteneurs (y compris arrêtés)

# Contrôle du cycle de vie
docker stop api     # arrêt gracieux (SIGTERM, puis SIGKILL après 10 s par défaut, modifiable avec -t)
docker start api    # redémarrage d'un conteneur arrêté
docker restart api  # stop + start
docker rm api       # suppression (le conteneur doit être arrêté)
docker rm -f api    # suppression forcée
```

`docker run` = `docker create` + `docker start`. Les options importantes :

```bash
docker run \
  -d \
  --name postgres \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD=secret \
  -v postgres_data:/var/lib/postgresql/data \
  --restart unless-stopped \
  postgres:16-alpine
```

| Option | Rôle |
|--------|------|
| `-d` | mode détaché (arrière-plan) |
| `--name` | nom du conteneur, utilisable à la place de son ID |
| `-p 5432:5432` | publication d'un port `hôte:conteneur` |
| `-e` | variable d'environnement |
| `-v postgres_data:/var/lib/postgresql/data` | montage d'un volume nommé |
| `--restart unless-stopped` | redémarrage automatique, sauf après un `docker stop` explicite |

Un commentaire ne peut pas suivre la barre oblique inverse de continuation de ligne en shell : `\` doit être le dernier caractère de la ligne, sinon la commande est interrompue.

Le signal `SIGTERM` envoyé par `docker stop` est reçu par le processus de PID 1 du conteneur. Si ce processus est un shell (`CMD python app.py` en forme *shell*, exécutée via `/bin/sh -c`), le signal n'est pas relayé à l'application, qui est tuée par `SIGKILL` à l'expiration du délai. La forme *exec* (`CMD ["python", "app.py"]`) ou l'option `--init` évitent ce problème.

## Réseau

Par défaut, Docker rattache les conteneurs au réseau `bridge`, adossé à l'interface `docker0` de l'hôte. Sur ce réseau par défaut, les conteneurs ne peuvent se joindre que par adresse IP : la résolution par nom n'est assurée que sur les réseaux créés par l'utilisateur, où le serveur DNS embarqué de Docker (`127.0.0.11`) résout les noms de conteneurs. Un port non publié avec `-p` n'est pas exposé sur les interfaces de l'hôte : le service n'est joignable que depuis d'autres conteneurs du même réseau (ou, sous Linux, depuis l'hôte via l'IP interne du conteneur).

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

Les volumes nommés sont préférés en production : Docker gère leur emplacement (`/var/lib/docker/volumes/`), ils survivent aux `docker rm`, et ils sont plus performants que les bind mounts sur macOS et Windows.

## Commandes de gestion courantes

```bash
# Images
docker images               # lister les images locales
docker pull nginx:alpine    # télécharger une image
docker rmi nginx:alpine     # supprimer une image locale
docker build -t myapp:1.0 . # construire une image depuis le répertoire courant

# Nettoyage
docker system prune         # supprimer conteneurs arrêtés, images sans tag (dangling), réseaux inutilisés, cache de build
docker system prune -a      # supprimer également les images non utilisées par un conteneur
docker volume prune         # supprimer les volumes anonymes non utilisés
docker volume prune -a      # inclure aussi les volumes nommés non utilisés
```

`docker system prune` ne touche pas aux volumes sans l'option `--volumes`. Depuis Docker Engine 23, `docker volume prune` ne supprime plus que les volumes anonymes : un volume nommé non monté (par exemple `postgres_data` après un `docker compose down`) n'est supprimé qu'avec `-a`.

`docker system df` affiche l'espace disque utilisé par Docker (images, conteneurs, volumes, cache de build).
