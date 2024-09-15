---
titre: Dokku
description: Dokku est une plateforme open-source permettant le déploiement, la gestion et la mise à l'échelle des applications sur un serveur.
tags: [Devops, Orchestration, Alternatives]
---



Une alternative PAAS open source à Heroku [https://dokku.com/](https://dokku.com/)
Dokku est une plateforme open-source permettant le déploiement, la gestion et la mise à l'échelle des applications sur un serveur. Inspiré par Heroku, il utilise une approche similaire pour le déploiement d'applications : le code se déploie en effectuant un "push" vers un dépôt Git sur le serveur. À la différence de Heroku, Dokku offre un contrôle total sur l'environnement de déploiement. Ainsi, l'infrastructure, le système d'exploitation et les services (tels que les bases de données ou les files d'attente de tâches) peuvent être personnalisés selon les besoins. Dokku s'appuie sur Docker pour gérer les applications dans des conteneurs isolés, ce qui simplifie la gestion des applications et de leurs dépendances. Chaque "push" d'une application à Dokku crée un nouveau conteneur Docker.

<!-- truncate -->

## Installation

```shell
# download the installation script
wget -NP . <https://dokku.com/bootstrap.sh>
# run the installer
sudo DOKKU_TAG=v0.32.3 bash bootstrap.sh
# and your ssh key to the dokku user
PUBLIC_KEY="your-public-key-contents-here"
echo "$PUBLIC_KEY" | dokku ssh-keys:add admin
```

## Première application

```shell
# define global domains
dokku domains:set-global <your-domain>
# <your-domain> can be a rd party domain or a local domain like sonu-dev-gzsim.local
```

Sur la machine où `dokku` est installé

```shell
dokku apps:create <app-name>
sudo dokku plugin:install <https://github.com/dokku/dokku-postgres.git>
dokku postgres:create railsdatabase
dokku postgres:link railsdatabase <app-name>
```

Sur la machine locale

```shell
cd <app-name>
git remote add dokku dokku@<your-domain>:<app-name>
git push dokku main
```

## Construire sa propre application

Dokku supporte plusieurs méthodes de build pour créer des applications, chacun avec ses propres avantages spécifiques :

1. [**builder-dockerfile**](https://dokku.com/docs/deployment/builders/dockerfiles/): Cette méthode utilise un Dockerfile pour construire des applications via la commande `docker build`. Il donne un contrôle maximal sur l'environnement d'exécution de l'application et sur la manière dont l'application est assemblée.
2. [**builder-herokuish**](https://dokku.com/docs/deployment/builders/herokuish-buildpacks/): Avec cette méthode, Dokku crée des applications en utilisant la spécification v2a Buildpack de Heroku via `gliderlabs/herokuish`. Il vous permet de profiter du même pipeline de build que Heroku, qui inclut le support pour de nombreux langages de programmation par défaut.
3. builder-lambda: Ce générateur construit des fonctions AWS Lambda dans un environnement simulant les temps d'exécution d'AWS Lambda.
4. **builder-null**: Cette méthode ne fait rien pendant la phase de construction. C'est utile pour les scénarios où aucune construction n'est nécessaire, comme le déploiement d'applications déjà compilées ou de conteneurs Docker.
5. **builder-pack**: Cette méthode utilise les Cloud Native Buildpacks pour construire des applications via l'outil pack-cli. Les Cloud Native Buildpacks sont une norme ouverte qui étend les capacités des Buildpacks classiques.

## Automatiser le déploiement via Github Actions

```yaml
name: Deploy to Dokku (sonu-dev-gzsim)
on:
    schedule:
    - cron: '0 0 * * *'
    workflow_dispatch:
    workflow_run:
    workflows: [ "Test build" ]
    types:
        - completed
jobs:
    deploy:
    runs-on:
        group: default
    steps:
        - name: Cloning repo
        uses: actions/checkout@v4
        with:
            fetch-depth: 0

        - name: Tailscale
        uses: tailscale/github-action@v2
        with:
            oauth-client-id: ${{ secrets.TS_OAUTH_CLIENT_ID }}
            oauth-secret: ${{ secrets.TS_OAUTH_SECRET }}
            tags: tag:server

        - name: Push to dokku
        uses: dokku/github-action@master
        with:
            git_remote_url: 'ssh://dokku@100.65.237.90:22/rd25-robotics'
            ssh_private_key: ${{ secrets.SSH_PRIVATE_KEY }}
            branch: main
            git_push_flags: '--force'

    if: ${{ github.event.workflow_run.conclusion == 'success' }}
```

## Astuces

 ⚠️ Les astuces ci dessous correspondent **très certainement** à une incompréhension des mécanismes de domain, proxy et reverse proxy

Par défaut `dokku` déploie l’application sur une url construite comme suit : `http://<app-name>.<your-domain>` visiblement si le domaine est local (comme `sonu-dev-gzsim.local`) le reverse proxy ne fonctionne pas (la configuration `nginx` est à creuser) il est donc nécessaire de `disable` les domains avec la commande

```shell
dokku domains:disable <app-name>
```

Cela aura pour effet de désactiver le domaine pour l’application en question. Elle tournera donc directement sur le port défini aléatoirement par `dokku`.
À chaque déploiement, `dokku` construit un `dokker` pour gérer les applications de manière isolée. Par défaut, les applications de type web doivent fournir leurs services sur le port `5000`. Par la suite, `dokku` s’occupe de faire la redirection de port entre la machine et le container. Pour éviter d’avoir un port aléatoire, il est possible de faire

```shell
dokku ports:set <app-name> http:<machine-port>:<docker-port>
```

Ainsi, à chaque déploiement, `dokku` redirigera le port de la machine vers le port du docker.
Finalement si vous souhaitez mettre en place une redirection comme `http://<your-domain>/<app-name>` vers l’application il suffit de faire les modifications suivantes dans `nginx`
Modifiez le fichier de configuration de Nginx pour votre site :

```shell
sudo nano /etc/nginx/sites-available/your-config-file
```

Ajoutez la directive location dans votre configuration :

```txt
server { listen 80; server_name <your-domain>; location = <app-name> { return 301 http://$host:<machine-port>; } }
```

Créez un lien symbolique vers le fichier de configuration :

```shell
sudo ln -s /etc/nginx/sites-available/your-config-file /etc/nginx/sites-enabled/
```

Vérifiez la configuration de Nginx :

```shell
sudo nginx -t
```

Redémarrez Nginx pour appliquer les modifications :

```shell
sudo systemctl restart nginx
```
