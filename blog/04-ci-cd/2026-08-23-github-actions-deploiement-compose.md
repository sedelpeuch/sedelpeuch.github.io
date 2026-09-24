---
title: "GitHub Actions : déploiement Docker Compose"
description: "Déployer automatiquement un monorepo de stacks Docker Compose sur un hôte unique à chaque push avec GitHub Actions : calcul des stacks modifiées, SSH via réseau privé, ordre de déploiement, nettoyage sûr, hash de configuration et validation en pull request."
series: homelab
tags: [cicd, orchestration, devops]
---

Un hôte unique qui fait tourner une vingtaine de services Docker Compose, un dépôt Git qui contient un dossier par stack : la question du déploiement se pose dès la deuxième modification. Se connecter en SSH, faire un `git pull`, relancer `docker compose up -d` dans le bon dossier fonctionne, mais l'opération est manuelle, oubliable et non tracée. Cet article décrit un workflow GitHub Actions qui déploie, à chaque push sur la branche principale, uniquement les stacks modifiées, sans orchestrateur et sans agent installé sur l'hôte.

<!--truncate-->

## Modèle de déploiement

### Push-based contre pull-based

Le GitOps décrit l'état désiré dans Git et confie à un mécanisme automatique l'alignement de l'état réel. En modèle **pull-based** (Argo CD, Flux), un agent sur la cible surveille Git et réconcilie en continu : les credentials restent sur la cible et toute dérive est corrigée. En modèle **push-based**, le pipeline CI se connecte à la cible et applique les changements : il détient un accès à la cible (une clé SSH) et ne corrige aucune dérive, seul un push déclenchant une action.

Argo CD et Flux sont des contrôleurs Kubernetes : sans cluster, ils n'ont pas d'objet sur lequel travailler. Pour un hôte unique piloté par Docker Compose, le modèle push-based est le plus direct, avec un workflow [GitHub Actions](./2024-12-20-github-actions.md) comme unique point d'entrée vers la production. Conséquence de l'absence de réconciliation : une modification faite à la main sur l'hôte persiste jusqu'au prochain déploiement de la stack concernée.

### Quand un orchestrateur est superflu

[Docker Swarm](../06-orchestration/2026-02-15-docker-swarm.md) et Kubernetes apportent la répartition sur plusieurs nœuds, la bascule en cas de panne et les rolling updates. Sur un seul nœud, la bascule n'a pas de cible : la panne de l'hôte arrête tout, orchestrateur compris. Il reste un coût opérationnel pour un bénéfice limité aux rolling updates. [Docker Compose](../06-orchestration/2024-12-20-docker-compose.md) couvre alors le besoin, au prix d'une brève interruption à chaque recréation de conteneur.

## Vue d'ensemble

Le dépôt contient un dossier par stack (`proxy/compose.yml`, `media/compose.yml`, `wiki/compose.yml`...) et deux workflows : `deploy.yml` sur push, `validate.yml` sur pull request. Il est cloné une fois sur l'hôte, par exemple dans `/srv/stacks`. Le workflow ne transfère aucun fichier : il ordonne à l'hôte de se mettre à jour depuis Git, puis de relancer les stacks concernées.

## Calculer les stacks modifiées

### Le diff entre deux pushes

L'événement `push` fournit `github.event.before`, le SHA du dernier commit de la branche avant le push, et `github.sha`, celui d'après. `git diff --name-only` entre les deux liste les fichiers modifiés ; le premier segment du chemin donne le dossier, donc la stack.

Trois cas particuliers :

- **Premier push d'une branche** : `before` vaut quarante zéros, SHA qui ne désigne aucun commit. Le repli sur `HEAD~1` limite le diff au dernier commit.
- **Historique complet requis** : `actions/checkout` ne récupère par défaut qu'un commit (`fetch-depth: 1`). Sans `fetch-depth: 0`, le commit `before` est absent du clone et `git diff` échoue.
- **Dossier supprimé** : un dossier présent dans le diff mais sans `compose.yml` après le push correspond à une stack retirée du dépôt. Elle doit être arrêtée par `docker compose down`, faute de quoi ses conteneurs tournent indéfiniment sans définition dans Git. Vérifier que `compose.yml` existait dans le commit `before` (`git cat-file -e`) évite de classer en suppression des dossiers qui n'ont jamais été des stacks, comme `.github/`.

### Redéploiement manuel

Le déclencheur `workflow_dispatch` accepte des `inputs` typés (`string`, `choice`, `boolean`, `number`, `environment`). Un input `stack` permet de redéployer une stack sans commit, cas utile après une panne ou pour forcer la recréation d'un conteneur :

```bash
# Redéployer la stack "wiki" depuis un poste local
gh workflow run deploy.yml -f stack=wiki
```

La valeur de l'input est contrôlée par l'utilisateur : elle transite par une variable d'environnement plutôt que par une interpolation `${{ }}` directement dans le script, ce qui empêche l'injection de commandes shell, et elle est validée contre l'existence d'un `compose.yml`.

## Sérialiser les déploiements

Deux pushes rapprochés lancent deux runs. Exécutés en parallèle, ils lanceraient des `git pull` et des `docker compose up` concurrents sur le même hôte. Le bloc `concurrency` place les runs d'un même groupe en file :

```yaml
concurrency:
  group: deploy-production
  cancel-in-progress: false  # ne jamais interrompre un déploiement en cours
  queue: max                 # conserver tous les runs en attente
```

`cancel-in-progress: true` interromprait un déploiement au milieu de la boucle, laissant une partie des stacks à jour et l'autre non. Avec `false`, le run en cours se termine. Le comportement par défaut (`queue: single`) ne conserve toutefois qu'**un seul** run en attente : un troisième push annule le deuxième, encore en attente. Or chaque run ne déploie que le diff `before..sha` de son propre push : les stacks modifiées par le run annulé ne sont jamais déployées. `queue: max` conserve jusqu'à 100 runs en attente, dans l'ordre d'arrivée ; la combinaison avec `cancel-in-progress: true` est refusée à la validation du workflow.

## Atteindre un hôte privé

L'hôte n'expose généralement pas SSH sur Internet. Deux options :

- **Runner auto-hébergé** sur le réseau de l'hôte (voir [Self-hosted runner](./2024-12-20-self-host-runner.md)) : aucune connexion entrante, mais une machine de plus à maintenir, et un runner qui exécute le code du dépôt avec un accès réseau privilégié.
- **Runner hébergé qui rejoint un réseau overlay** (Tailscale, WireGuard, Netbird) le temps du job. `tailscale/github-action` crée un nœud éphémère, supprimé par le serveur de coordination à la fin du run ; un tag dédié (`tag:ci`) permet de restreindre par ACL ce nœud au seul port SSH de l'hôte.

La clé SSH privée est stockée en secret GitHub. `StrictHostKeyChecking=accept-new` accepte la clé d'hôte au premier contact et refuse une clé modifiée ; le runner étant neuf à chaque run, chaque connexion est un premier contact. Injecter la clé d'hôte attendue dans `~/.ssh/known_hosts` depuis un secret supprime cette confiance au premier usage. Le script distant est transmis par un heredoc à `bash -s` : le délimiteur entre apostrophes (`<<'REMOTE'`) empêche toute expansion côté runner, et les variables sont passées en préfixe de la commande SSH.

## Déroulé sur l'hôte

### Ordre des opérations

Les stacks supprimées sont arrêtées **avant** le `git pull` : après la mise à jour, leur `compose.yml` a disparu et Compose ne sait plus quels conteneurs arrêter. `git pull --ff-only` refuse ensuite toute fusion : si le clone a divergé (commit local, historique réécrit), le déploiement échoue au lieu de produire un état qui ne correspond à aucun commit. Enfin, `docker compose up -d --build --remove-orphans` reconstruit les images locales et supprime les conteneurs des services retirés du fichier.

### Dépendances entre stacks

Une stack peut déclarer un volume `external: true` créé par une autre, typiquement une stack de sauvegarde qui monte les volumes de toutes les autres. Compose refuse de démarrer si ce volume n'existe pas : la stack propriétaire doit démarrer avant la consommatrice. Le diff ne fournissant aucun ordre, deux listes explicites encadrent la boucle.

Chaque `compose.yml` porte un `name:` explicite. Le nom de projet préfixe les volumes et réseaux (`media_library`) ; sans `name:`, il dérive du nom du dossier, et un renommage de dossier crée de nouveaux volumes vides tout en rendant introuvables les références `external` des autres stacks.

### Nettoyage sans casse

Les `up --build` successifs accumulent images et cache de build. `docker system prune` supprime aussi **tous les conteneurs arrêtés** et **les réseaux sans conteneur actif**. Or un conteneur arrêté n'est pas forcément un déchet : arrêt volontaire, ou mise en veille par un outil de scale-to-zero comme [Sablier](../06-orchestration/2026-08-30-traefik-sablier.md). Conteneur supprimé, `docker start` n'a plus de cible ; réseau supprimé, le conteneur référence un identifiant de réseau inexistant et refuse de démarrer. Le constat vaut pour `docker container prune` et `docker network prune` pris isolément. Deux commandes restent sûres :

```bash
# Images non référencées par un conteneur, y compris arrêté
docker image prune -af
# Cache BuildKit
docker builder prune -af
```

Une image utilisée par un conteneur arrêté n'est pas supprimée par `image prune`, ce qui préserve la possibilité de redémarrer ce conteneur.

### Notification d'échec

`set -euo pipefail` arrête le script à la première erreur ; `trap ... ERR` exécute une fonction à ce moment-là. L'appel de notification (ntfy, webhook Slack) part de l'hôte, qui atteint des services internes injoignables depuis le runner.

## Le workflow complet

```yaml
name: Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:
    inputs:
      stack:
        description: "Dossier de la stack à redéployer"
        required: true
        type: string

concurrency:
  group: deploy-production
  cancel-in-progress: false
  queue: max

permissions:
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
        with:
          fetch-depth: 0 # historique complet pour le diff

      - name: Calcul des stacks modifiées
        id: diff
        env:
          EVENT: ${{ github.event_name }}
          INPUT_STACK: ${{ inputs.stack }}
          BEFORE: ${{ github.event.before }}
        run: |
          if [ "$EVENT" = "workflow_dispatch" ]; then
            [ -f "$INPUT_STACK/compose.yml" ] || { echo "::error::stack inconnue"; exit 1; }
            echo "up=$INPUT_STACK" >> "$GITHUB_OUTPUT"
            exit 0
          fi
          # Premier push d'une branche : before ne désigne aucun commit
          if [ -z "$BEFORE" ] || [ "$BEFORE" = "0000000000000000000000000000000000000000" ]; then
            BEFORE=$(git rev-parse HEAD~1)
          fi
          UP=""; DOWN=""
          for d in $(git diff --name-only "$BEFORE" "$GITHUB_SHA" | grep / | cut -d/ -f1 | sort -u); do
            if [ -f "$d/compose.yml" ]; then UP="$UP $d"
            elif git cat-file -e "$BEFORE:$d/compose.yml" 2>/dev/null; then DOWN="$DOWN $d"
            fi
          done
          echo "up=$(echo $UP)" >> "$GITHUB_OUTPUT"
          echo "down=$(echo $DOWN)" >> "$GITHUB_OUTPUT"

      - name: Connexion au réseau privé
        if: steps.diff.outputs.up != '' || steps.diff.outputs.down != ''
        uses: tailscale/github-action@v4
        with:
          oauth-client-id: ${{ secrets.TS_OAUTH_CLIENT_ID }}
          oauth-secret: ${{ secrets.TS_OAUTH_SECRET }}
          tags: tag:ci

      - name: Déploiement
        if: steps.diff.outputs.up != '' || steps.diff.outputs.down != ''
        env:
          UP: ${{ steps.diff.outputs.up }}
          DOWN: ${{ steps.diff.outputs.down }}
          SSH_KEY: ${{ secrets.DEPLOY_SSH_KEY }}
          SSH_TARGET: ${{ secrets.DEPLOY_SSH_TARGET }} # deploy@host.tailnet.example.com
          RUN_URL: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
        run: |
          install -m 600 /dev/null ~/.ssh_key && echo "$SSH_KEY" > ~/.ssh_key
          ssh -i ~/.ssh_key -o StrictHostKeyChecking=accept-new "$SSH_TARGET" \
            "UP='$UP' DOWN='$DOWN' RUN_URL='$RUN_URL' bash -s" <<'REMOTE'
          set -euo pipefail
          trap 'curl -fsS -d "Échec du déploiement : $RUN_URL" https://ntfy.example.com/deploy || true' ERR
          cd /srv/stacks

          # 1. Stacks supprimées : arrêt tant que leur compose.yml existe encore
          for d in $DOWN; do
            [ -f "$d/compose.yml" ] && (cd "$d" && docker compose down) || true
          done

          # 2. Mise à jour du clone, sans fusion
          git pull --ff-only

          # 3. Propriétaires de volumes externes d'abord, consommateurs en dernier
          FIRST=" media "; LAST=" backup "
          ORDERED=""
          for d in $UP; do case "$FIRST" in *" $d "*) ORDERED="$ORDERED $d";; esac; done
          for d in $UP; do case "$FIRST$LAST" in *" $d "*) ;; *) ORDERED="$ORDERED $d";; esac; done
          for d in $UP; do case "$LAST" in *" $d "*) ORDERED="$ORDERED $d";; esac; done
          for d in $ORDERED; do
            (cd "$d" && docker compose up -d --build --remove-orphans)
          done

          # 4. Nettoyage : jamais de conteneurs, de réseaux ni de volumes
          docker image prune -af
          docker builder prune -af
          REMOTE
```

## Le piège des fichiers de configuration en bind mount

### Compose ne voit que le fichier Compose

À chaque `up`, Compose calcule une empreinte de la configuration de chaque service (image, variables, montages, labels) et ne recrée le conteneur que si elle a changé. Le **contenu** d'un fichier monté en bind mount (`./config.yml:/etc/app/config.yml:ro`) n'entre pas dans cette empreinte : modifier `config.yml` puis déployer laisse le conteneur intact, et l'application continue de tourner avec l'ancienne configuration. Pour un fichier unique monté en bind mount, un rechargement à chaud côté application n'est pas non plus garanti : `git pull` remplace généralement le fichier par un nouvel inode, alors que le montage reste attaché à l'ancien.

### Injecter un hash de configuration

La correction consiste à faire entrer le contenu du fichier dans l'empreinte Compose, sous forme d'une variable d'environnement contenant son hash :

```yaml
services:
  wiki:
    image: example/wiki:2.5
    environment:
      - CONFIG_HASH=3f1c9a...  # recalculé automatiquement, jamais édité à la main
    volumes:
      - ./config.yml:/etc/wiki/config.yml:ro
```

Quand le fichier change, le hash change, la variable change, et Compose recrée le conteneur. Le mécanisme est l'équivalent de l'annotation `checksum/config` que les charts Helm placent dans le template de pod (`{{ include (print $.Template.BasePath "/configmap.yaml") . | sha256sum }}`) pour déclencher un rolling update quand une ConfigMap change.

Le calcul est confié à un script et à un hook [pre-commit](https://pre-commit.com/) local :

```bash
#!/usr/bin/env bash
# wiki/conf-hash.sh : recalcule CONFIG_HASH à partir du contenu de config.yml
set -euo pipefail
cd "$(dirname "$0")"
HASH=$(sha256sum config.yml | cut -d' ' -f1)
sed -i "s/CONFIG_HASH=.*/CONFIG_HASH=$HASH/" compose.yml
```

```yaml
# .pre-commit-config.yaml
repos:
  - repo: local
    hooks:
      - id: wiki-conf-hash
        name: Hash de configuration wiki
        entry: wiki/conf-hash.sh
        language: script
        files: ^wiki/
        pass_filenames: false
```

`compose.yml` faisant alors partie des fichiers modifiés, le diff du workflow sélectionne la stack. Quand le hook modifie un fichier, pre-commit fait échouer le commit : il faut ajouter le fichier modifié et recommencer. Limite : le hook ne s'exécute que là où `pre-commit install` a été lancé ; un commit depuis l'interface web ou par un bot contourne le recalcul.

## Valider en pull request

### Démarrage réel sur runner éphémère

Un second workflow, déclenché sur `pull_request`, applique la même logique de diff (entre `pull_request.base.sha` et `pull_request.head.sha`) et teste chaque stack modifiée sur le runner hébergé :

```bash
# 1. Syntaxe et interpolation des variables, sans rien démarrer
docker compose -f "$d/compose.yml" config -q

# 2. Ressources externes attendues, créées vides
docker network create proxy 2>/dev/null || true
docker compose -f "$d/compose.yml" config --format json \
  | jq -r '(.volumes // {}) | to_entries[] | select(.value.external) | .value.name // .key' \
  | xargs -r -n1 docker volume create

# 3. Démarrage réel ; --wait attend l'état running/healthy de chaque service
(cd "$d" && docker compose up -d --build --wait --wait-timeout 120)
# État de chaque conteneur, utile au diagnostic
docker inspect -f '{{.Name}} {{.State.Status}} {{if .State.Health}}{{.State.Health.Status}}{{end}}' \
  $(cd "$d" && docker compose ps -aq)

# 4. Nettoyage complet, volumes compris
(cd "$d" && docker compose down -v)
```

Si les fichiers `.env` sont chiffrés dans le dépôt, ils doivent être déchiffrés sur le runner avant le démarrage (voir [git-crypt](../08-iac/2026-07-26-git-crypt.md)). Ce workflow sert aussi de garde-fou aux mises à jour automatiques d'images proposées par [Renovate](./2026-08-16-github-actions-renovate.md).

### Limites

- Le routage réel n'est pas testé : ni reverse proxy partagé, ni DNS public, ni certificat, ni SSO.
- Les volumes externes sont vides : une stack qui dépend des données d'une autre démarre sans elles.
- Sans healthcheck, le contrôle se réduit à « le conteneur tourne ».
- Une image publiée uniquement pour l'architecture de l'hôte (ARM, par exemple) ne démarre pas sur un runner x86-64.

### La validation ne protège que ce qui passe par elle

Le workflow `validate` ne s'exécute que sur les pull requests. Un push direct sur `main` déclenche le déploiement sans aucune validation. Une règle de protection de branche (ou un ruleset) qui exige une pull request et le statut `validate` au vert ferme ce contournement.

## Pièges et limites

- **Diff fondé sur l'événement** : un force-push fait pointer `before` vers un commit qui n'est plus atteignable, donc absent du clone, et `git diff` échoue. Une variante plus robuste calcule le diff sur l'hôte, entre le commit actuellement déployé (`git rev-parse HEAD`) et la cible après `git fetch` : le résultat reste correct même si des runs ont été annulés.
- **Interruption de service** : Compose arrête puis recrée le conteneur, sans rolling update.
- **Ordre codé en dur** : toute nouvelle dépendance de volume externe exige de mettre à jour les listes.
- **Clé SSH en CI** : l'utilisateur de déploiement accède au socket Docker, soit un accès équivalent à root sur l'hôte.

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/personnel/homelab" title="HomeLab">Déploiement continu d'une trentaine de stacks Docker Compose sur un hôte unique, via un runner GitHub hébergé qui rejoint un réseau Tailscale, avec validation des pull requests (dont celles de Renovate) et hash de configuration recalculé par pre-commit.</ProjectLink>
</ProjectLinks>

## Conclusion

Diff par dossier, file d'attente sans annulation, SSH à travers un réseau privé, ordre explicite et nettoyage limité aux images suffisent à un déploiement continu traçable sur un hôte unique. Les points délicats relèvent moins de GitHub Actions que de Docker : les prunes qui suppriment des conteneurs volontairement arrêtés, et les bind mounts dont le contenu échappe à la détection de changements de Compose.
