---
title: Runner GitHub Self-Hosted
description: "Explication de la création et de l'installation d'un nouveau runner au niveau de l'organisation"
tags: [CI/CD, GitHub, Devops]
---

Un `runner` est une machine virtuelle ou physique qui exécute des `jobs` dans un `workflow`. Les `runners` peuvent être hébergés par GitHub ou auto-hébergés. Les `runners` hébergés par GitHub sont exécutés dans un environnement de cloud partagé et sont gérés par GitHub et peuvent entrainer des surcouts. Les `runners` auto-hébergés sont exécutés sur une machine que vous possédez et gérez.

<!--truncate-->

Pour télécharger un nouveau `runner`, exécutez les lignes suivantes

```shell
# Create a folder
mkdir actions-runner && cd actions-runner
# Download the latest runner package
curl -o actions-runner-linux-x64-2.312.0.tar.gz -L <https://github.com/actions/runner/releases/download/v2.312.0/actions-runner-linux-x64-2.312.0.tar.gz> # ! update this documentation with the latest release
# Optional: Validate the hash
echo "85c1bbd104d539f666a89edef70a18db2596df374a1b51670f2af1578ecbe031  actions-runner-linux-x64-2.312.0.tar.gz" | shasum -a 256 -c
# Extract the installer
tar xzf ./actions-runner-linux-x64-2.312.0.tar.gz
```

Il est ensuite nécessaire de configurer votre `runner`

```shell
# Create the runner and start the configuration experience
./config.sh --url <https://github.com/><org>/<repo> --token <token># Last step, run it!
./run.sh
```

:::info
Le token est à obtenir au près d’un `owner` de l’organisation accessible sur le lien suivant [https://github.com/organizations/](https://github.com/organizations/org/settings/actions/runners/new?arch=x64&os=linux)
:::

➡️ Lors de la configuration, il est possible d'ajouter des **labels** pour identifier la machine (par exemple `GPU`).

## Créer une action `self-hosted`

Il n’est pas possible de créer une action visant une machine `self-hosted` particulière (à confirmer). Chaque `repository` d’une organisation peut accéder à :

- Toutes les machines dans le groupe `Défaut` qui sont automatiquement partagées à tous les dépôts.
- Toutes les machines dans un groupe `Name` qui sont manuellement partagées au dépôt concerné (l’affectation manuelle des dépôts à des groupes de machines nous encourage à ne pas utiliser ceci sauf cas particulier)

Parmi les machines disponibles le `repository` peut demander d’utiliser une machine en fonction de son `label` par exemple l’action ci-dessous, permettant de vérifier que le dépôt est compilable sous ROS, réquisitionne une machine ayant le label `Robotics`. Ceci est modifiable à la ligne `runs-on: Robotics`.

```yaml
name: CI

on: [pull_request]

jobs:
  industrial_ci:
    strategy:
      matrix:
        env:
          - {ROS_DISTRO: melodic, ROS_REPO: main}
    runs-on: Robotics
    steps:
      - uses: actions/checkout@v3
      - uses: 'ros-industrial/industrial_ci@master'
        env: ${{matrix.env}}
```

Lors de la première utilisation, si vous rencontrez un erreur `docker` spécifiant un manque de permission, il est nécessaire de taper la commande suivante sur la machine distance `sudo setfacl --modify user:<user>:rw /var/run/docker.sock`
Lorsqu’une action est créé en `self-hosted` il est fortement conseillé de mettre les actions dans un `container`. Lorsque c’est impossible (comme `tailscale`) il est nécessaire d’ajouer un clean de l’environnement à la fin de l’action en ajoutant cette `step`

```yaml
- name: Clean runner
  if: always()
  run: rm -rf ${{ github.workspace }}/*
```

## Mettre en place le runner sous forme de service

Dans le dossier de votre `runnner` sur la machine, transformer le `./run.sh` en service, tapez simplement les lignes ci-dessous pour que le `runner` s’active au démarrage de la machine.

```shell
sudo ./svc.sh install
sudo ./svc.sh start
```
