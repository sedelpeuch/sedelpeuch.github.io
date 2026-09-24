---
title: "Docker Compose"
description: "Docker Compose : format Compose Specification, cycle de vie des services, réseaux, dépendances et healthchecks, variables, secrets, GPU et mode watch."
tags: [orchestration, devops]
---

Une application réelle combine plusieurs conteneurs : un serveur web, une base de données, un cache, un worker. Les lancer à la main impose de répéter pour chacun les options de `docker run` (réseau, volumes, variables, ports) et de respecter un ordre de démarrage. Docker Compose décrit l'ensemble de ces conteneurs dans un fichier YAML déclaratif et les pilote comme une seule unité, le *projet*.

<!--truncate-->

## Principe

Compose lit un fichier (`compose.yaml` par défaut, `docker-compose.yml` restant reconnu) qui décrit des **services**, des **réseaux** et des **volumes**. Chaque service correspond à un ou plusieurs conteneurs construits à partir d'une même image et d'une même configuration. Compose calcule l'écart entre cette description et l'état réel du moteur Docker, puis crée, recrée ou supprime les ressources nécessaires : le fonctionnement est déclaratif, comme celui de Kubernetes, mais limité à un seul hôte.

Deux évolutions sont à connaître :

- **Compose V2** : l'outil est désormais un plugin de la CLI Docker, invoqué par `docker compose` (avec une espace). L'ancien binaire Python `docker-compose` (Compose V1) n'est plus maintenu depuis juillet 2023.
- **Compose Specification** : le format de fichier n'est plus versionné. La clé `version: '3.x'` en tête de fichier est obsolète : elle est ignorée et produit un avertissement.

## Exemple de fichier Compose

```yaml
# compose.yaml
services:
  web:
    image: nginx:1.27-alpine
    ports:
      - "8080:80"            # port hôte:port conteneur
    depends_on:
      api:
        condition: service_started

  api:
    build: ./api             # image construite à partir de ./api/Dockerfile
    environment:
      DATABASE_URL: postgresql://app:${DB_PASSWORD}@db:5432/app
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: app
      POSTGRES_USER: app
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d app"]
      interval: 5s
      timeout: 3s
      retries: 5

volumes:
  pgdata:
```

Trois services composent l'application : `web` expose le port 80 du conteneur sur le port 8080 de l'hôte, `api` est construit localement, `db` persiste ses données dans le volume nommé `pgdata`. `${DB_PASSWORD}` est interpolé à partir de l'environnement du shell ou d'un fichier `.env` placé à côté du fichier Compose.

## Cycle de vie et commandes

```bash
# Créer et démarrer tous les services en arrière-plan
docker compose up -d

# État des conteneurs du projet
docker compose ps

# Logs agrégés, en continu, d'un service
docker compose logs -f api

# Exécuter une commande dans un conteneur en cours d'exécution
docker compose exec db psql -U app

# Reconstruire les images puis recréer les conteneurs modifiés
docker compose up -d --build

# Afficher la configuration finale (variables interpolées, fichiers fusionnés)
docker compose config

# Arrêter et supprimer conteneurs et réseaux (les volumes nommés sont conservés)
docker compose down

# Supprimer aussi les volumes nommés du projet
docker compose down -v
```

`docker compose up` est idempotent : un service dont la configuration et l'image n'ont pas changé conserve son conteneur existant. Compose enregistre un hash de la configuration de chaque service dans les labels du conteneur (`com.docker.compose.config-hash`) ; seuls les services dont le hash diffère sont recréés. `docker compose down` ne supprime pas les volumes nommés, ce qui protège les données d'une base ; l'option `-v` les supprime explicitement.

## Dépendances et healthchecks

`depends_on` sous sa forme courte (une liste de services) ne garantit que l'**ordre de démarrage** des conteneurs : le processus PostgreSQL peut encore être en initialisation lorsque l'API démarre et tente de s'y connecter. La forme longue ajoute une condition :

| Condition | Attente |
|-----------|---------|
| `service_started` | le conteneur de la dépendance est démarré (comportement de la forme courte) |
| `service_healthy` | le `healthcheck` de la dépendance réussit |
| `service_completed_successfully` | la dépendance s'est terminée avec le code 0 (migration, initialisation) |

Le `healthcheck` exécute périodiquement une commande dans le conteneur ; après `retries` échecs consécutifs, le conteneur passe à l'état `unhealthy`. Dans l'exemple, l'API n'est démarrée qu'une fois `pg_isready` réussi. Ce mécanisme ne concerne que le démarrage : une application robuste doit malgré tout savoir se reconnecter si la base redémarre plus tard.

## Réseau

Par défaut, Compose crée un réseau bridge dédié au projet, nommé `<projet>_default`, où le nom du projet est celui du répertoire (modifiable avec `-p` ou la variable `COMPOSE_PROJECT_NAME`). Pour un projet situé dans `myapp/`, `docker compose up` :

1. crée le réseau `myapp_default` ;
2. crée le conteneur du service `db`, qui rejoint ce réseau sous le nom `db` ;
3. crée celui du service `api`, qui le rejoint sous le nom `api`, et ainsi de suite.

Le serveur DNS embarqué de Docker résout chaque nom de service vers l'adresse du ou des conteneurs correspondants : l'API se connecte à `db:5432` sans connaître d'adresse IP. Lorsqu'un conteneur est recréé, il reçoit généralement une nouvelle adresse IP mais conserve son nom ; les connexions ouvertes vers l'ancien conteneur sont coupées, et le client doit résoudre à nouveau le nom et se reconnecter. Les conteneurs se référencent donc toujours par nom, jamais par adresse.

La distinction entre port publié et port du conteneur est essentielle :

- la communication **entre services** utilise le port du conteneur (`db:5432`), sans qu'aucune publication soit nécessaire ;
- la section `ports` (`"8080:80"`) publie un port sur les interfaces de l'hôte, pour un accès depuis l'extérieur de Docker. `"127.0.0.1:5432:5432"` limite cette publication à l'interface locale.

Une base de données n'a donc en général pas de section `ports` : seuls les autres services du réseau y accèdent.

### Réseaux personnalisés

La clé de niveau supérieur `networks` définit plusieurs réseaux pour segmenter l'application. Dans l'exemple suivant, `proxy` et `db` ne partagent aucun réseau et ne peuvent pas communiquer ; seul `app` est rattaché aux deux :

```yaml
services:
  proxy:
    image: nginx:1.27-alpine
    networks: [frontend]
  app:
    build: ./app
    networks: [frontend, backend]
  db:
    image: postgres:16-alpine
    networks: [backend]

networks:
  frontend:
  backend:
    internal: true        # aucun accès vers l'extérieur depuis ce réseau
```

Un réseau créé en dehors du projet, par exemple celui partagé avec un reverse proxy comme [Traefik](../02-network/2025-06-09-traefik.md), se déclare avec `external: true` : Compose le rejoint sans chercher à le créer ni à le supprimer.

```yaml
networks:
  proxy:
    external: true        # créé au préalable avec : docker network create proxy
```

## Variables, fichiers multiples et profils

L'interpolation `${VAR}` lit les variables du shell puis celles du fichier `.env` du répertoire du projet. Des formes étendues contrôlent l'absence de valeur : `${VAR:-défaut}` fournit une valeur par défaut, `${VAR:?message}` fait échouer la commande si la variable manque.

Plusieurs fichiers peuvent être fusionnés, les suivants surchargeant les précédents : c'est le mécanisme utilisé pour adapter une base commune à chaque environnement. Sans option `-f`, Compose fusionne automatiquement `compose.yaml` et `compose.override.yaml`.

```bash
# Base commune + surcharges de production
docker compose -f compose.yaml -f compose.prod.yaml up -d
```

Les **profils** rendent des services optionnels : un service doté de `profiles: [debug]` n'est démarré que si le profil est activé (`docker compose --profile debug up`), ce qui permet de garder dans le même fichier des outils d'administration (pgAdmin, Mailpit) sans les lancer par défaut.

## Secrets

La section `secrets` monte un fichier dans le conteneur, en lecture seule, sous `/run/secrets/<nom>`, plutôt que de passer la valeur par une variable d'environnement, visible dans `docker inspect` et héritée par tous les processus fils :

```yaml
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password   # convention *_FILE de l'image officielle
    secrets:
      - db_password

secrets:
  db_password:
    file: ./secrets/db_password.txt
```

En Compose sur un hôte unique, le secret est un simple montage du fichier local, non chiffré : il évite la fuite dans l'environnement et dans l'image, mais le fichier source doit être protégé (permissions, exclusion du dépôt Git). Le chiffrement au repos et la distribution entre nœuds relèvent de [Docker Swarm](./2026-02-15-docker-swarm.md), où les secrets sont stockés chiffrés dans le journal Raft des managers.

## Support des GPU

Un service peut réserver des GPU NVIDIA, à condition que le NVIDIA Container Toolkit soit installé sur l'hôte :

```yaml
services:
  inference:
    image: nvidia/cuda:12.6.3-base-ubuntu24.04
    command: nvidia-smi
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1              # ou "all", ou device_ids: ["0"]
              capabilities: [gpu]
```

Les images `nvidia/cuda` ne publient pas de tag `latest` : le tag précise la version de CUDA, la variante (`base`, `runtime`, `devel`) et la distribution. La version de CUDA de l'image doit être supportée par le pilote installé sur l'hôte.

## Mode watch pour le développement

Le mode watch synchronise les modifications du code source vers les conteneurs en cours d'exécution, sans reconstruction complète. Il se configure dans la section `develop.watch` de chaque service :

```yaml
services:
  api:
    build: ./api
    develop:
      watch:
        # Copier les fichiers modifiés dans le conteneur (rechargement à chaud par l'application)
        - action: sync
          path: ./api/src
          target: /app/src
        # Reconstruire l'image si les dépendances changent
        - action: rebuild
          path: ./api/requirements.txt
        # Synchroniser puis redémarrer le conteneur (fichiers de configuration)
        - action: sync+restart
          path: ./api/config
          target: /app/config
```

```bash
# Démarrer les services et surveiller les fichiers
docker compose up --watch
```

À la différence d'un bind mount (`volumes: - ./src:/app/src`), qui partage directement le répertoire de l'hôte, `sync` copie les fichiers dans le conteneur : les performances ne dépendent pas du partage de fichiers entre l'hôte et la VM de Docker Desktop, et les fichiers générés dans le conteneur (dépendances installées, caches) ne remontent pas sur l'hôte.

## Cas d'usage et limites

- **Développement** : le fichier Compose documente et démarre toutes les dépendances d'un projet (base, cache, file de messages) en une commande.
- **Tests d'intégration** : un environnement éphémère se crée et se détruit (`docker compose up -d --wait`, puis `docker compose down -v`) à chaque exécution de la CI. L'option `--wait` attend que les services soient `running` ou `healthy`.
- **Déploiement sur un hôte unique** : avec `restart: unless-stopped`, des healthchecks et un reverse proxy, Compose suffit pour des services auto-hébergés.

Compose reste limité à un seul hôte : pas de répartition sur plusieurs machines, pas de replanification en cas de panne de l'hôte, pas de mise à jour progressive native. Ces besoins relèvent d'un orchestrateur : [Docker Swarm](./2026-02-15-docker-swarm.md), qui réutilise le format Compose, ou [Kubernetes](./2025-01-12-k8s-introduction.md).

La [documentation officielle](https://docs.docker.com/compose/) et la [référence du format](https://docs.docker.com/reference/compose-file/) détaillent l'ensemble des clés disponibles.
