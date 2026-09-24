---
title: "Dokku"
description: "Dokku : PaaS open source inspiré de Heroku, déploiement par git push, builders, services liés, routage par domaine et automatisation avec GitHub Actions."
tags: [orchestration, devops]
---

Dokku est une plateforme open source de type PaaS (*Platform as a Service*), inspirée de Heroku, qui s'installe sur un serveur unique. Le déploiement se fait par un `git push` vers un dépôt Git hébergé par le serveur : Dokku construit alors une image Docker à partir du code, démarre le conteneur, puis reconfigure son reverse proxy Nginx pour router le trafic vers la nouvelle version.

<!--truncate-->

À la différence de Heroku, l'infrastructure, le système d'exploitation et les services annexes (bases de données, files de tâches) restent sous le contrôle de l'administrateur du serveur. Chaque application tourne dans des conteneurs isolés, et chaque déploiement produit une nouvelle image et de nouveaux conteneurs ; l'ancien conteneur n'est arrêté qu'une fois le nouveau démarré et vérifié, ce qui évite l'interruption de service. Le site officiel est [dokku.com](https://dokku.com/).

## Installation

```shell
# Télécharger le script d'installation (remplacer vX.Y.Z par la dernière version publiée sur dokku.com)
wget -NP . https://dokku.com/install/vX.Y.Z/bootstrap.sh

# Lancer l'installation (Docker, Nginx et Dokku)
sudo DOKKU_TAG=vX.Y.Z bash bootstrap.sh

# Autoriser une clé SSH à pousser vers le serveur
PUBLIC_KEY="contenu-de-la-cle-publique"
echo "$PUBLIC_KEY" | sudo dokku ssh-keys:add admin
```

Les clés enregistrées donnent accès à l'utilisateur système `dokku`. Toute connexion SSH en tant que `dokku` est interceptée par Dokku : un `git push` déclenche un déploiement, et `ssh dokku@serveur apps:list` exécute une commande Dokku à distance.

## Première application

```shell
# Domaine global : chaque application reçoit par défaut le sous-domaine <app>.<domaine>
dokku domains:set-global example.com
```

Le domaine peut être un domaine public ou un domaine interne. Le routage par sous-domaine suppose que `<app>.<domaine>` se résolve vers le serveur : un enregistrement DNS générique (`*.example.com`) couvre toutes les applications. Un domaine en `.local` résolu par mDNS (Avahi, Bonjour) ne convient pas : mDNS ne résout que des noms d'hôtes individuels, pas de sous-domaines génériques. Les services `sslip.io` ou `nip.io` offrent une alternative pour un réseau local (`app.192-168-1-10.sslip.io` se résout vers `192.168.1.10`).

Sur le serveur Dokku :

```shell
dokku apps:create mon-app

# Plugin officiel PostgreSQL
sudo dokku plugin:install https://github.com/dokku/dokku-postgres.git postgres
dokku postgres:create mon-app-db

# Lier la base : injecte la variable DATABASE_URL dans l'application
dokku postgres:link mon-app-db mon-app
```

`postgres:link` démarre la base dans un conteneur dédié, la relie au réseau de l'application et définit la variable d'environnement `DATABASE_URL` (`postgres://user:password@dokku-postgres-mon-app-db:5432/mon_app_db`). L'application lit cette variable, comme sur Heroku, sans configuration spécifique à Dokku.

Sur la machine de développement :

```shell
cd mon-app
git remote add dokku dokku@example.com:mon-app
git push dokku main
```

## Builders

Dokku sélectionne une méthode de construction selon le contenu du dépôt, ou selon le builder forcé par `dokku builder:set mon-app selected <builder>` :

1. [**builder-dockerfile**](https://dokku.com/docs/deployment/builders/dockerfiles/) : utilisé si le dépôt contient un `Dockerfile`. L'image est construite par `docker build`, ce qui donne un contrôle complet sur l'environnement d'exécution.
2. [**builder-herokuish**](https://dokku.com/docs/deployment/builders/herokuish-buildpacks/) : applique les buildpacks Heroku (spécification v2a) via `gliderlabs/herokuish`. Le langage est détecté automatiquement (`requirements.txt`, `package.json`, `Gemfile`...).
3. **builder-pack** : utilise les Cloud Native Buildpacks, norme ouverte qui succède aux buildpacks Heroku, via l'outil `pack`.
4. **builder-nixpacks** : construit l'image avec Nixpacks, qui détecte le langage et assemble l'environnement à partir de paquets Nix.
5. **builder-lambda** : produit des fonctions AWS Lambda dans un environnement qui reproduit les runtimes Lambda.
6. **builder-null** : n'effectue aucune construction, pour les cas où l'image est fournie déjà construite (`git:from-image`).

## Automatiser le déploiement via GitHub Actions

Le workflow suivant pousse le dépôt vers Dokku après la réussite du workflow de test. Le serveur n'étant joignable que sur un réseau privé Tailscale, le runner rejoint d'abord ce réseau :

```yaml
name: Deploy to Dokku

on:
  workflow_dispatch:
  workflow_run:
    workflows: ["Test build"]
    types: [completed]

jobs:
  deploy:
    # workflow_run se déclenche aussi après un échec : ne déployer qu'après un succès
    if: ${{ github.event_name == 'workflow_dispatch' || github.event.workflow_run.conclusion == 'success' }}
    runs-on:
      group: default
    steps:
      - name: Cloning repo
        uses: actions/checkout@v4
        with:
          fetch-depth: 0          # historique complet : Dokku refuse un push superficiel

      - name: Tailscale
        uses: tailscale/github-action@v2
        with:
          oauth-client-id: ${{ secrets.TS_OAUTH_CLIENT_ID }}
          oauth-secret: ${{ secrets.TS_OAUTH_SECRET }}
          tags: tag:server

      - name: Push to dokku
        uses: dokku/github-action@master
        with:
          git_remote_url: "ssh://dokku@100.64.0.10:22/mon-app"
          ssh_private_key: ${{ secrets.SSH_PRIVATE_KEY }}
          branch: main
          git_push_flags: "--force"
```

`--force` permet de redéployer un historique réécrit (rebase, amend) sans conflit avec le dépôt du serveur, qui n'a pas vocation à diverger. La clé privée stockée dans `SSH_PRIVATE_KEY` doit correspondre à une clé ajoutée par `dokku ssh-keys:add`. Les mécanismes de `workflow_run` et de l'épinglage des actions sont détaillés dans l'article [GitHub Actions](../04-ci-cd/2024-12-20-github-actions.md).

## Routage et ports

Le proxy Nginx de Dokku route les requêtes selon l'en-tête `Host` : `http://mon-app.example.com` est transmis au conteneur de `mon-app`. Si le sous-domaine ne se résout pas (cas du domaine `.local` évoqué plus haut), les requêtes n'atteignent jamais la bonne configuration. Deux options :

- corriger la résolution DNS (enregistrement générique, `/etc/hosts` sur les postes clients, `sslip.io`) ;
- désactiver le routage par domaine pour l'application, qui est alors exposée directement sur un port de l'hôte :

```shell
dokku domains:disable mon-app
```

Par défaut, une application construite par buildpack doit écouter sur le port indiqué par la variable `PORT` (5000) ; une application construite par Dockerfile est exposée sur les ports déclarés par `EXPOSE`. Le mapping entre port de l'hôte et port du conteneur se fixe avec `ports:set`, au lieu d'un port attribué aléatoirement :

```shell
# Schéma : ports:set <app> <protocole>:<port-hôte>:<port-conteneur>
dokku ports:set mon-app http:8080:5000
dokku ports:report mon-app
```

Pour servir l'application sous un chemin (`http://example.com/mon-app`) plutôt que sous un sous-domaine, une configuration Nginx complémentaire est nécessaire, Dokku ne gérant que le routage par nom d'hôte :

```nginx
# /etc/nginx/sites-available/example.com
server {
    listen 80;
    server_name example.com;

    # Redirection vers le port exposé de l'application
    location = /mon-app {
        return 301 http://$host:8080/;
    }
}
```

```shell
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
sudo nginx -t                   # valider la syntaxe avant d'appliquer
sudo systemctl reload nginx     # recharger sans couper les connexions en cours
```

Une redirection change l'URL visible par le client. Pour conserver l'URL `/mon-app`, un `proxy_pass http://127.0.0.1:8080/;` remplace le `return 301`, à condition que l'application sache générer ses liens sous ce préfixe. Le fonctionnement des blocs `location` et de `proxy_pass` est détaillé dans l'article [Nginx](../02-network/2024-12-20-nginx.md).
