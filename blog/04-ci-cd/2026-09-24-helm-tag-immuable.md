---
title: "Helm : déploiement par tag immuable"
description: "Déployer un chart Helm depuis GitHub Actions avec un tag d'image immuable dérivé du SHA du commit : limites des tags mobiles, de rollme et de --recreate-pods, annotation checksum/config, concurrency, secrets injectés par --set-literal et imagePullPolicy."
tags: [cicd, devops]
---

Un chart Helm qui référence `image.tag: latest`, un workflow qui reconstruit l'image puis lance `helm upgrade` : le schéma fonctionne en apparence, jusqu'au jour où les pods tournent toujours sur l'ancienne image après un déploiement réussi, ou où un `helm rollback` ne ramène pas la version précédente. Les contournements classiques (annotation aléatoire `rollme`, option `--recreate-pods`) forcent le redémarrage des pods mais ne rendent pas le déploiement traçable. Cet article décrit l'alternative : un tag d'image immuable `sha-<commit>` produit par la CI et transmis au chart, complété par une empreinte de configuration qui ne redémarre les pods que lorsque quelque chose a réellement changé.

<!--truncate-->

## Le problème du tag mobile

### Un manifeste identique ne déclenche rien

Un Deployment Kubernetes ne lance un rollout que si son **template de pod** (`spec.template`) change. Helm, de son côté, ne fait que rendre les templates du chart et appliquer le résultat. Si le chart référence `ghcr.io/example/webapp:latest` et que la CI a seulement réécrit ce tag dans le registre, le manifeste rendu par `helm upgrade` est identique au précédent : aucun nouveau ReplicaSet, aucun nouveau pod. L'article [Pipeline CI/CD vers EKS](./2026-07-19-pipeline-cicd-eks.md) décrit ce comportement dans le cas d'un tag de branche `main`.

`imagePullPolicy: Always` ne corrige pas le problème : la politique s'applique au démarrage d'un conteneur, pas à un conteneur qui tourne déjà. Elle garantit qu'un pod **recréé** retire la dernière version du tag, mais rien ne recrée le pod.

### Trois étapes d'une même dérive

Le scénario suivant est fréquent dans les dépôts qui ont grandi sans convention de tag :

1. Le chart déploie `latest`, alors que le workflow de build publie un tag de branche (`main`) ou de version (`1.4.0`). Le tag déployé n'est pas celui que le run vient de construire : les pods restent indéfiniment sur une ancienne image.
2. Correction : le workflow transmet `--set image.tag=${{ github.ref_name }}`, soit `main` pour un déclenchement manuel et `1.4.0` pour une release. Le bon tag est désormais déployé, mais `main` reste mobile : deux déploiements successifs depuis `main` produisent le même manifeste et le second est sans effet.
3. Contournement : une annotation aléatoire ou `--recreate-pods` force le redémarrage à chaque déploiement.

À la fin, les pods redémarrent bien, mais l'état du cluster ne dit toujours pas quel build tourne.

## Les contournements et leurs limites

### L'annotation rollme

La documentation de Helm décrit une annotation dont la valeur est aléatoire à chaque rendu :

```yaml
spec:
  template:
    metadata:
      annotations:
        rollme: {{ randAlphaNum 5 | quote }}
```

Le template de pod change à chaque `helm upgrade`, donc chaque upgrade déclenche un rollout. Conséquences :

- **Redémarrages inutiles** : une modification du README, un déploiement relancé sans changement ou une mise à jour d'une autre ressource du chart redémarrent les pods.
- **Diff illisible** : `helm diff` ou `helm template` comparé à l'état précédent montre toujours une différence, ce qui masque les vraies.
- **Traçabilité nulle** : le manifeste référence toujours `:latest` ou `:main`. La révision Helm n° 12 et la révision n° 13 pointent vers le même tag, alors qu'elles ont exécuté deux images différentes.

### L'option --recreate-pods

`helm upgrade --recreate-pods` supprimait les pods des ressources mises à jour pour forcer leur recréation. L'option a été dépréciée dès Helm 3 au profit des annotations ci-dessus, puis supprimée dans Helm 4. Outre ce statut, elle contourne la stratégie du Deployment : les pods sont supprimés ensemble au lieu d'être remplacés progressivement, ce qui provoque une interruption même avec plusieurs réplicas et une stratégie `RollingUpdate` (voir [Kubernetes : déploiements sans interruption](../06-orchestration/2026-04-04-kubernetes-rolling-update-ressources.md)).

### Le rollback impossible

`helm rollback webapp 12` réapplique le manifeste de la révision 12. Si ce manifeste référence `:main`, le rollback redéploie... la dernière image poussée sous `:main`, c'est-à-dire celle qui pose problème. L'historique Helm existe, mais il ne décrit pas les images : revenir en arrière exige de retrouver et de republier à la main l'ancien build.

## Le tag immuable sha-commit

### Principe

Chaque build publie, en plus de ses tags habituels, un tag dérivé du SHA complet du commit : `sha-3adda15c...`. Ce tag n'est produit que pour ce commit et n'est jamais réécrit par un build ultérieur. Le déploiement transmet ce tag au chart :

```bash
helm upgrade webapp ./helm --install --set image.tag="sha-${GITHUB_SHA}"
```

Les propriétés découlent directement :

- **Rollout à chaque commit** : le tag change, donc `spec.template` change, donc Kubernetes crée un nouveau ReplicaSet. Aucune annotation aléatoire n'est nécessaire.
- **Aucun rollout sans changement** : redéployer le même commit produit le même manifeste et ne redémarre rien.
- **Traçabilité** : `kubectl get deploy webapp -o jsonpath='{.spec.template.spec.containers[0].image}'` donne le commit exact. `helm get values webapp --revision 12` aussi.
- **Rollback effectif** : la révision 12 référence `sha-<commit 12>`, image toujours présente dans le registre ; `helm rollback` restaure réellement ce build.

Le tag de branche (`main`) et le tag de version (`1.4.0`, `latest`) restent publiés pour un usage manuel, mais le chart ne les déploie plus.

### Produire le tag avec docker/metadata-action

`docker/metadata-action` calcule la liste des tags d'une image à partir du contexte Git. Son type `sha` produit `sha-<commit>`, en version courte (7 caractères) par défaut ou complète avec `format=long`. Déclarer explicitement `tags` remplace la liste par défaut : il faut donc y recopier les entrées par défaut (`schedule`, `ref` pour les branches, tags et pull requests) avant d'ajouter `sha`.

```yaml
- id: meta
  uses: docker/metadata-action@v6
  with:
    images: ghcr.io/example/webapp
    tags: |
      type=schedule
      type=ref,event=branch
      type=ref,event=tag
      type=ref,event=pr
      type=sha,format=long
```

Le format long évite d'avoir à reproduire la troncature côté déploiement : `github.sha` contient déjà le SHA complet, et le tag à déployer s'écrit `sha-${{ github.sha }}`. Dans un workflow mutualisé (voir [architecture CI/CD réutilisable](./2024-12-20-github-actions-architecture-reutilisable.md)), l'ajout prend la forme d'un input booléen qui alimente `enable=` sur l'entrée `type=sha` : les dépôts consommateurs l'activent un par un, sans changement de comportement pour les autres. La publication sur GHCR elle-même est décrite dans l'article [GHCR](../03-containerization/2024-12-20-ghcr.md).

### Tag immuable par convention

Un registre comme GHCR n'interdit pas, par défaut, de pousser une seconde image sous un tag existant. L'immuabilité de `sha-<commit>` tient à la convention : seul le build de ce commit le produit. Une exception existe : relancer le workflow d'un même commit reconstruit l'image et réécrit le tag avec un nouveau digest, identique fonctionnellement si le build est reproductible, différent sinon (dépendances non figées, `apt-get upgrade`). La seule référence réellement immuable est le digest (`image@sha256:...`), au prix d'une lisibilité moindre.

## Redémarrer seulement quand la configuration change

### Le cas des ConfigMaps et des Secrets

Le tag immuable couvre les changements d'image. Reste la configuration : une ConfigMap montée en fichier ou un Secret injecté par `envFrom` font partie du chart, mais leur modification ne touche pas au template de pod. Les variables d'environnement d'un conteneur sont lues à son démarrage ; un fichier monté depuis une ConfigMap est mis à jour par le kubelet après un délai, mais rien ne garantit que l'application le relise (et un montage par `subPath` n'est jamais mis à jour). Sans redémarrage, la nouvelle configuration est appliquée dans l'API Kubernetes mais ignorée par le processus. C'est ce problème que `rollme` masquait en redémarrant systématiquement.

### L'annotation checksum/config

La documentation de Helm propose une annotation qui contient l'empreinte SHA-256 du template de configuration rendu :

```yaml
# templates/deployment.yaml
spec:
  template:
    metadata:
      annotations:
        checksum/config: {{ include (print $.Template.BasePath "/configmap.yaml") . | sha256sum }}
        checksum/secret: {{ include (print $.Template.BasePath "/secret.yaml") . | sha256sum }}
```

`include` rend le template `configmap.yaml` avec les valeurs courantes, `sha256sum` en calcule l'empreinte. Si une valeur de configuration change, le rendu change, l'empreinte change, l'annotation change, et le Deployment déclenche un rollout en respectant sa stratégie. Si rien ne change, l'annotation reste identique et aucun pod ne redémarre. Une annotation par fichier de configuration suffit : un chart sans ConfigMap ni Secret monté n'a besoin d'aucune annotation, le tag d'image couvrant seul les changements.

Le mécanisme est l'équivalent Helm du hash de configuration injecté dans un service Docker Compose, décrit dans [GitHub Actions : déploiement Docker Compose](./2026-08-23-github-actions-deploiement-compose.md).

## Sérialiser les déploiements

### Le verrou de release Helm

Pendant un `helm upgrade`, la release passe à l'état `pending-upgrade`. Un second `helm upgrade` lancé sur la même release pendant ce temps échoue immédiatement :

```text
Error: UPGRADE FAILED: another operation (install/upgrade/rollback) is in progress
```

Deux pushes rapprochés, ou un push suivi d'un déclenchement manuel, suffisent à produire ce conflit : le second run échoue alors que rien n'est cassé. Avec `--wait`, la fenêtre de conflit couvre toute la durée du rollout, soit plusieurs minutes pour une application lente à démarrer.

### Le bloc concurrency

GitHub Actions place en file d'attente les runs qui partagent le même groupe de concurrence :

```yaml
concurrency:
  group: deploy-webapp
  cancel-in-progress: false
```

`cancel-in-progress: true` interromprait le run en cours : le processus `helm` serait tué au milieu de l'upgrade, en laissant potentiellement la release bloquée en `pending-upgrade`, état qui fait échouer toutes les opérations suivantes jusqu'à un `helm rollback` manuel. Avec `false`, le run en cours se termine et le suivant attend.

Par défaut, un groupe ne conserve qu'un run en attente : un troisième run annule le deuxième, encore en attente. Contrairement à un déploiement fondé sur un diff entre deux commits, cette annulation est sans conséquence ici : chaque run déploie l'état complet du chart et l'image de son commit, et le run conservé est le plus récent.

### Déployer depuis la seule branche principale

Un workflow déclaré `on: [push, workflow_dispatch]` se déclenche sur toutes les branches. Chaque push sur une branche de fonctionnalité redéploie alors la release de production avec le chart de cette branche. Le filtre `branches: [main]` sur l'événement `push` limite le déploiement automatique à la branche principale ; `workflow_dispatch` reste disponible pour un redéploiement manuel.

## Secrets applicatifs

### Hors de l'image

Des identifiants passés au build par `ARG` puis `ENV` sont enregistrés dans la configuration de l'image et lisibles par quiconque peut la tirer (`docker inspect`, `docker history`), comme l'explique [Docker : bonnes pratiques](../03-containerization/2024-12-20-docker-best-practices.md). Ils doivent être injectés au runtime, par un [Secret Kubernetes](../06-orchestration/2025-01-12-k8s-secrets-configmaps.md) rendu par le chart et monté par `envFrom` :

```yaml
# templates/secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: {{ include "webapp.fullname" . }}
type: Opaque
stringData:
  {{- range $k, $v := .Values.secret }}
  {{ $k }}: {{ $v | quote }}
  {{- end }}
```

```yaml
# templates/deployment.yaml (extrait du conteneur)
envFrom:
  - secretRef:
      name: {{ include "webapp.fullname" . }}
```

`values.yaml` déclare `secret: {}` ; les valeurs réelles arrivent par la ligne de commande depuis les secrets GitHub Actions. L'annotation `checksum/secret` vue plus haut redémarre les pods lorsqu'un identifiant change.

### --set, --set-string et --set-literal

Helm propose plusieurs options pour passer une valeur en ligne de commande, qui diffèrent par l'analyse de la valeur :

| Option | Typage | Virgule dans la valeur | Usage |
| --- | --- | --- | --- |
| `--set` | conversion (`true`, nombres, `null`) | séparateur de paires, échappement `\,` | valeurs simples |
| `--set-string` | toujours une chaîne | séparateur de paires, échappement `\,` | valeurs qui ressemblent à des nombres |
| `--set-literal` | toujours une chaîne | conservée telle quelle | valeurs arbitraires |

`--set` et `--set-string` acceptent plusieurs paires séparées par des virgules (`a=1,b=2`) et interprètent la barre oblique inverse comme caractère d'échappement : un mot de passe contenant une virgule est coupé en deux, une barre oblique inverse disparaît. `--set-literal` lit tout ce qui suit le premier `=` comme une seule chaîne, sans séparateur ni échappement ; la clé reste analysée normalement (`secret.API_TOKEN` désigne bien la clé `API_TOKEN` de la map `secret`). Une seule paire est acceptée par occurrence de l'option.

Le second niveau d'analyse est celui du shell. Une valeur non quotée contenant une espace ou un caractère spécial (`$`, `&`, `;`) est découpée ou interprétée avant même d'atteindre Helm. Transmettre le secret par une variable d'environnement et la citer entre guillemets doubles règle les deux niveaux :

```bash
helm upgrade webapp ./helm --set-literal "secret.API_TOKEN=${API_TOKEN}"
```

L'interpolation directe `--set-literal 'secret.API_TOKEN=${{ secrets.API_TOKEN }}'` fonctionne pour la plupart des valeurs, mais une apostrophe dans le secret ferme la chaîne et ouvre la voie à une injection de commande : GitHub substitue l'expression dans le script **avant** que le shell ne l'analyse.

Une fois passées par `--set`, les valeurs sont enregistrées par Helm dans le Secret de release (`sh.helm.release.v1.webapp.v<révision>`) et lisibles par `helm get values` : l'accès aux Secrets du namespace délimite leur exposition réelle.

### imagePullPolicy avec un tag figé

Avec un tag qui change à chaque commit, `imagePullPolicy: Always` n'apporte plus rien : un tag `sha-<commit>` désigne toujours la même image, et la retirer du registre à chaque démarrage de pod ne fait qu'ajouter une dépendance au registre (redémarrage impossible pendant une panne de GHCR) et de la latence. `IfNotPresent` réutilise l'image déjà présente sur le nœud. La valeur doit être explicite dans le chart : si le champ est omis, Kubernetes le fixe à `Always` pour un tag `latest` ou absent et à `IfNotPresent` sinon, et cette valeur par défaut est calculée à la création de l'objet, sans être recalculée lorsque le tag change ensuite.

## Le workflow complet

```yaml
name: Delivery

on:
  push:
    branches: [main]
  release:
    types: [released]
  workflow_dispatch:

concurrency:
  group: deploy-webapp
  cancel-in-progress: false

permissions:
  contents: read
  packages: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: docker/login-action@v4
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - id: meta
        uses: docker/metadata-action@v6
        with:
          images: ghcr.io/example/webapp
          tags: |
            type=ref,event=branch
            type=ref,event=tag
            type=sha,format=long
      - uses: docker/build-push-action@v7
        with:
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}

  deploy:
    needs: build # le tag sha-<commit> existe avant le déploiement
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v7
      - uses: azure/setup-helm@v5
      - name: Kubeconfig
        env:
          KUBECONFIG_DATA: ${{ secrets.KUBECONFIG }}
        run: |
          install -m 600 /dev/null "$RUNNER_TEMP/kubeconfig"
          printf '%s' "$KUBECONFIG_DATA" > "$RUNNER_TEMP/kubeconfig"
          echo "KUBECONFIG=$RUNNER_TEMP/kubeconfig" >> "$GITHUB_ENV"
      - name: Déploiement
        env:
          IMAGE_TAG: sha-${{ github.sha }}
          API_TOKEN: ${{ secrets.API_TOKEN }}
          SMTP_PASSWORD: ${{ secrets.SMTP_PASSWORD }}
        run: |
          helm upgrade webapp ./helm --install \
            --namespace apps --create-namespace \
            --values ./helm/values.yaml \
            --set image.tag="$IMAGE_TAG" \
            --set-literal "secret.API_TOKEN=${API_TOKEN}" \
            --set-literal "secret.SMTP_PASSWORD=${SMTP_PASSWORD}" \
            --wait --rollback-on-failure --timeout 5m
```

```yaml
# helm/values.yaml (extrait)
image:
  repository: ghcr.io/example/webapp
  pullPolicy: IfNotPresent
  tag: "" # fourni par la CI : sha-<commit>

secret: {} # fourni par la CI : --set-literal secret.<NOM>=...
```

`--rollback-on-failure` est le nom Helm 4 de `--atomic`, toujours accepté par `helm upgrade` avec un avertissement de dépréciation ; avec Helm 3, seul `--atomic` existe. Combiné à `--wait`, il ramène la release à la dernière révision réussie si les pods ne deviennent pas prêts avant `--timeout`.

## Pièges et limites

- **Tag absent du registre** : si le build ne publie pas `sha-<commit>` (option désactivée dans le workflow mutualisé, image construite par un autre workflow non chaîné), les pods restent en `ImagePullBackOff`. Le déploiement échoue au bout de `--timeout`, puis la release est restaurée. `needs: build` dans le même workflow garantit l'ordre.
- **Suffixe de cible** : `docker/metadata-action` applique le `suffix` de `flavor` à tous les tags. Une image construite avec une cible Dockerfile `prod` et un suffixe `-prod` est publiée sous `sha-<commit>-prod`, et c'est ce tag que le déploiement doit référencer.
- **Déploiement manuel** : un `helm upgrade` qui ne reçoit aucune valeur recopie celles de la révision précédente, mais dès qu'il en reçoit (`-f`, `--set-literal` pour les secrets) sans `--set image.tag`, il ne réutilise plus les valeurs précédentes (sauf `--reuse-values`) : il retombe sur le tag de `values.yaml`, ou sur `appVersion` si ce tag est vide dans un template généré par `helm create` (`.Values.image.tag | default .Chart.AppVersion`). La fonction `required` dans le template transforme ce retour silencieux en erreur de rendu explicite.
- **Volume ReadWriteOnce** : chaque commit déclenche désormais un rollout. Avec la stratégie `RollingUpdate`, le nouveau pod tente d'attacher un volume RWO encore attaché à l'ancien, sur un autre nœud : le rollout reste bloqué sur une erreur `Multi-Attach`. Un Deployment à un seul réplica qui porte un tel volume doit utiliser `strategy: Recreate`.
- **Empreinte instable** : `checksum/config` hache le rendu du template. Si celui-ci contient une fonction non déterministe (`randAlphaNum` pour générer un mot de passe, `now`), l'empreinte change à chaque upgrade et reproduit le comportement de `rollme`. Une ConfigMap ou un Secret créés hors du chart ne sont pas couverts.
- **Accumulation d'images** : un tag par commit remplit le registre. Une politique de nettoyage doit conserver assez de versions pour couvrir l'historique de rollback (`helm upgrade` conserve 10 révisions par défaut, réglable par `--history-max`).

## Conclusion

Un tag d'image dérivé du commit fait porter au manifeste l'identité exacte du build déployé : le rollout se déclenche quand l'image change et seulement dans ce cas, l'historique Helm devient un historique d'images, et le rollback restaure un artefact réel. L'annotation `checksum/config` étend la même logique à la configuration. `rollme` et `--recreate-pods` deviennent inutiles, et le reste relève de l'hygiène du pipeline : un seul déploiement à la fois, depuis la seule branche principale, avec des secrets passés au runtime sans être réinterprétés par le shell ni par Helm.

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/professionnel/sonu-k8s-cluster" title="Cluster Kubernetes interne SONU">Migration des services du cluster vers un déploiement par tag d'image `sha-` suivi du SHA du commit : suppression de `rollme` et de `--recreate-pods`, annotations `checksum/config` et `checksum/secret`, `concurrency` sur les workflows de déploiement, secrets sortis des images et injectés par `--set-literal` dans un Secret Kubernetes.</ProjectLink>
  <ProjectLink to="/docs/projects/professionnel/cicd" title="CI/CD - Workflows GitHub Actions mutualisés">Ajout d'un input optionnel `sha_tag` au workflow mutualisé de publication sur GHCR, qui publie le tag immuable consommé par le workflow de déploiement Helm.</ProjectLink>
</ProjectLinks>
