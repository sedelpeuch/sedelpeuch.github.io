---
title: "GitHub Actions : Renovate"
description: "Renovate self-hosted sur GitHub Actions pour maintenir à jour les images Docker de fichiers Compose et Dockerfile : GitHub App, pin par digest, packageRules par niveau de risque, automerge conditionné aux checks et déclenchement par workflow_run."
series: homelab
tags: [cicd, devops]
---

Un fichier Compose qui référence une vingtaine d'images vieillit sans bruit : nouvelles versions, correctifs de sécurité, changements de comportement, rien dans le dépôt ne le signale. Vérifier les registres à la main ne tient pas dans la durée ; utiliser `latest` rend les mises à jour invisibles et non reproductibles. Renovate automatise cette veille : il analyse le dépôt, interroge les registres et ouvre une pull request par mise à jour disponible, que la CI valide avant fusion manuelle ou automatique.

<!--truncate-->

## Principe

Renovate repose sur trois notions :

- un **manager** extrait les dépendances d'un type de fichier : `docker-compose` lit les clés `image:`, `dockerfile` les instructions `FROM`, `github-actions` les `uses:` des workflows, d'autres couvrent npm, pip, Helm, Terraform ;
- une **datasource** liste les versions disponibles : pour les images, `docker` interroge l'API du registre (Docker Hub, GHCR, ECR…) ;
- un **versioning** compare ces versions et classe une mise à jour en `major`, `minor`, `patch` ou `digest`.

À chaque exécution, Renovate clone le dépôt, extrait les dépendances, calcule les mises à jour, crée une branche `renovate/<dépendance>` par mise à jour et ouvre la pull request correspondante. Il maintient aussi une issue **Dependency Dashboard** qui récapitule les mises à jour en attente, limitées, désactivées ou en erreur, avec des cases à cocher pour forcer la création ou le rebase d'une branche.

La configuration tient dans un `renovate.json` à la racine, qui étend en général `config:recommended` : Dependency Dashboard, préfixes de commit sémantiques, exclusion des répertoires de dépendances et de tests, regroupement des monorepos connus et contournements pour des paquets au versioning atypique.

## Application hébergée ou self-hosted

Deux modes d'exécution coexistent :

| | Application hébergée (Mend) | Self-hosted (GitHub Actions) |
|---|---|---|
| Installation | Application GitHub à installer sur le dépôt | Workflow dans le dépôt |
| Exécution | Planifiée par le service | Contrôlée par les déclencheurs du workflow |
| Accès au dépôt | Service tiers avec droits d'écriture | Token généré dans le workflow |
| Registres privés | Identifiants chiffrés avec la clé publique du service | Secrets GitHub injectés en variables d'environnement |

L'action `renovatebot/github-action` exécute l'image officielle de Renovate dans un job, ce qui permet de chaîner Renovate à la CI existante — point déterminant pour l'automerge.

## Authentification : GitHub App plutôt que PAT ou GITHUB_TOKEN

Renovate a besoin d'un token capable de pousser des branches, d'ouvrir des PR et de gérer l'issue du dashboard :

- **`GITHUB_TOKEN`** du workflow : GitHub bloque la récursion entre workflows. Une pull request ouverte ou mise à jour avec ce token ne déclenche les workflows `pull_request` qu'après **approbation manuelle** ; les autres événements qu'il produit ne déclenchent rien. Le workflow de validation ne tourne donc pas de lui-même sur les PR de Renovate, et l'automerge n'a jamais de check vert sur lequel s'appuyer.
- **PAT** : fonctionne, mais les PR apparaissent sous un compte personnel, avec un token de longue durée aux droits de l'utilisateur.
- **GitHub App** : application dédiée dont la clé privée est stockée en secret ; `actions/create-github-app-token` génère un token d'installation de courte durée, révoqué en fin de job. Les PR apparaissent sous l'identité du bot et déclenchent normalement les workflows `pull_request`.

La documentation de Renovate liste les permissions de l'App : *Checks*, *Commit statuses*, *Contents*, *Issues*, *Pull requests* et *Workflows* en lecture-écriture ; *Administration*, *Dependabot alerts*, *Members* et *Metadata* en lecture.

## Pin par digest

Un tag Docker est mutable : `nginx:1.27` désigne aujourd'hui une image, demain une autre après une reconstruction. L'option `pinDigests` fait écrire à Renovate la référence au format **tag + digest** :

```yaml
services:
  web:
    # Le tag reste lisible, le digest fixe l'image exacte
    image: nginx:1.27.2@sha256:3b3a1f...e5c9
```

Docker ignore le tag quand un digest est présent : le déploiement devient reproductible. Renovate propose alors des mises à jour de **version** (tag et digest) et de **digest** seul, quand l'image d'un même tag a été reconstruite. Pour un tag flottant (`latest`, `stable`), chaque reconstruction devient ainsi une PR visible.

## packageRules : adapter le comportement par dépendance

Les `packageRules` appliquent des options à un sous-ensemble de dépendances, sélectionné par des critères `match*` combinés en ET :

- `matchFileNames` : chemin du fichier qui déclare la dépendance (motifs glob acceptés) ;
- `matchDepNames` : nom de la dépendance, tel qu'écrit dans le fichier ;
- `matchUpdateTypes` : `major`, `minor`, `patch`, `pin`, `pinDigest`, `digest`… ;
- `matchManagers`, `matchDatasources` : type de fichier ou de source.

Les règles sont évaluées dans l'ordre et **une règle ultérieure écrase les options d'une règle antérieure** quand elles définissent la même option. Une règle générique se place donc avant les règles d'exception.

`"enabled": false` désactive une dépendance, traitement habituel des bases de données : une version majeure de PostgreSQL ou MariaDB implique une migration des fichiers de données, rarement automatisable. `matchDepNames` compare le nom littéral : une image écrite `postgres:16` dans un fichier et `docker.io/library/postgres:16` dans un autre correspond à deux noms différents, qu'il faut lister tous les deux.

## Stratégie par niveaux de risque

Une classification des dépendances en deux niveaux de risque se traduit directement en `packageRules` :

- **niveau 1 — revue manuelle** (`automerge: false`) : services d'infrastructure dont la panne coupe l'accès au reste (reverse proxy, authentification, sauvegarde) et applications dont les migrations de schéma touchent des données irremplaçables ;
- **niveau 2 — automerge** (`automerge: true`) : tout le reste, dès lors qu'une casse est soit détectée par la CI, soit rattrapable sans perte de données.

Avec `automerge: true`, Renovate ne fusionne une PR que si **tous les checks** sont au vert. Par défaut (`platformAutomerge: true`), il délègue la fusion à l'auto-merge natif de GitHub quand il est activé sur le dépôt : une règle de protection de branche exigeant le check de validation devient alors indispensable, sans quoi GitHub peut fusionner avant la fin des tests. L'option `minimumReleaseAge` (par exemple `"3 days"`) ajoute un délai entre la publication d'une version et sa fusion automatique, le temps que d'éventuelles régressions soient signalées en amont.

## Une PR par dépendance ou des groupes

Renovate ouvre par défaut une PR par dépendance et par type de mise à jour ; `groupName` dans une `packageRule` en réunit plusieurs. Le groupement réduit le nombre de PR, mais une régression impose alors d'annuler tout le groupe. Pour des images indépendantes, une PR par dépendance rend chaque retour arrière atomique.

Deux limites encadrent le volume :

- `prHourlyLimit` : nombre maximal de PR créées par heure (défaut 2) ;
- `prConcurrentLimit` : nombre maximal de PR ouvertes simultanément (défaut 10), `0` supprimant la limite.

Avec une vingtaine d'images, les valeurs par défaut étalent le rattrapage initial sur plusieurs jours ; les mises à jour en attente restent visibles dans le Dependency Dashboard.

## Déclenchement : cron et workflow_run

Renovate ne fusionne **qu'une seule branche par branche cible et par exécution** : après une fusion, les autres branches doivent être rebasées et revalidées avant la suivante. Avec un simple cron quotidien, dix PR prêtes demandent dix jours. Un cron horaire accélère le débit, mais consomme un runner à chaque exécution, y compris quand il n'y a rien à faire.

Le déclenchement événementiel résout ce compromis : `workflow_run` relance Renovate à chaque fin du workflow `Validate`, et une condition `startsWith(github.event.workflow_run.head_branch, 'renovate/')` restreint cette relance aux branches Renovate (workflow complet plus bas).

Le filtre porte sur le `if` **du job** : un job écarté n'alloue pas de runner, alors qu'une garde dans une étape ne s'évalue qu'une fois le runner démarré. Les PR humaines, qui déclenchent aussi `Validate`, sont ignorées sans coût. `workflow_run` ne se déclenche que si le workflow qui l'écoute est présent sur la branche par défaut.

Les événements `check_run` et `check_suite` semblent plus directs, mais, par garde-fou anti-récursion, GitHub ne déclenche aucun workflow pour les check suites créées par GitHub Actions : ce déclencheur ne réagit jamais à `Validate`. `workflow_run` est le mécanisme prévu pour chaîner deux workflows.

## Exemple complet

Le fichier `renovate.json` à la racine du dépôt :

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["config:recommended"],
  "pinDigests": true,
  "prHourlyLimit": 10,
  "prConcurrentLimit": 0,
  "packageRules": [
    {
      "description": "Bases de données : montées de version manuelles uniquement",
      "matchDepNames": ["postgres", "docker.io/library/postgres", "mariadb", "redis"],
      "enabled": false
    },
    {
      "description": "Patchs ignorés, seules les versions minor/major remontent",
      "matchUpdateTypes": ["patch"],
      "enabled": false
    },
    {
      "description": "Niveau 2 (règle générique) : automerge si la validation passe",
      "matchFileNames": ["**/compose.yml", "**/Dockerfile"],
      "automerge": true,
      "labels": ["renovate/tier-2"]
    },
    {
      "description": "Niveau 1 (exception, placée après) : revue manuelle",
      "matchFileNames": ["proxy/compose.yml", "auth/compose.yml", "backup/compose.yml"],
      "automerge": false,
      "labels": ["renovate/tier-1"]
    }
  ]
}
```

Le workflow `.github/workflows/renovate.yml` :

```yaml
name: Renovate

on:
  schedule:
    - cron: "0 6 * * *" # filet quotidien : détecte les nouvelles versions
  workflow_dispatch:
  workflow_run:
    workflows: ["Validate"]
    types: [completed]

concurrency:
  group: renovate
  cancel-in-progress: false # une exécution à la fois, sans interrompre la courante

jobs:
  renovate:
    runs-on: ubuntu-latest
    # Évalué avant l'allocation d'un runner : un job ignoré ne consomme rien
    if: github.event_name != 'workflow_run' || startsWith(github.event.workflow_run.head_branch, 'renovate/')
    steps:
      - name: Génère un token d'installation de la GitHub App
        id: app-token
        uses: actions/create-github-app-token@v3
        with:
          client-id: ${{ vars.RENOVATE_APP_CLIENT_ID }}
          private-key: ${{ secrets.RENOVATE_APP_PRIVATE_KEY }}

      - name: Renovate
        uses: renovatebot/github-action@v46.3.3
        env:
          # Sans cette variable, Renovate ne traite aucun dépôt
          RENOVATE_REPOSITORIES: ${{ github.repository }}
        with:
          token: ${{ steps.app-token.outputs.token }}
```

Le workflow `Validate` se déclenche sur `pull_request` et démarre réellement les services modifiés (`docker compose config`, `docker compose up -d`, contrôle de l'état et du healthcheck de chaque conteneur) ; sa construction est détaillée dans l'article [déploiement Compose par GitHub Actions](./2026-08-23-github-actions-deploiement-compose.md). Les bases de GitHub Actions sont rappelées dans [GitHub Actions : Workflow](./2024-12-20-workflow.md).

## Pièges et limites

- **`RENOVATE_REPOSITORIES` obligatoire.** L'autodécouverte (`autodiscover`) est désactivée par défaut en self-hosted : sans liste de dépôts, Renovate s'exécute sans erreur et ne fait rien.
- **`configurationFile` n'est pas la configuration du dépôt.** L'input `configurationFile` de l'action désigne la configuration *globale* du bot ; le `renovate.json` du dépôt est lu automatiquement. La documentation de l'action déconseille de donner au fichier global le nom d'un fichier de configuration de dépôt.
- **Version de l'action.** `renovatebot/github-action` ne publie que des tags complets (`v46.3.3`), sans tag majeur flottant : la forme `@v46`, courante pour d'autres actions, ne se résout pas et fait échouer le workflow avant toute exécution. Il faut épingler une release existante.
- **Les digests échappent aux règles de version.** Une règle `matchUpdateTypes: ["patch"]` avec `enabled: false` n'empêche pas les mises à jour de type `digest` : les images suivies par un tag flottant (`latest`, `stable`) continuent de produire des PR à chaque reconstruction.
- **Registres privés.** Renovate crée automatiquement une `hostRule` pour `ghcr.io` à partir de son token de plateforme, mais ce token n'a pas forcément accès aux images privées publiées depuis un autre dépôt. Symptôme : `No docker auth found` dans les logs et aucune mise à jour proposée pour ces images. Une `hostRule` explicite (`matchHost: "ghcr.io"`, `hostType: "docker"`, identifiants d'un token ayant `read:packages`), injectée par exemple via la variable `RENOVATE_HOST_RULES`, lève le blocage. Le même problème touche le workflow de validation : le `GITHUB_TOKEN` n'accède qu'aux packages qui ont accordé l'accès au dépôt dans leurs paramètres, un `docker login` avec un autre token est sinon nécessaire. Le fonctionnement de GHCR est décrit dans l'article [GitHub Container Registry](../03-containerization/2024-12-20-ghcr.md).
- **L'automerge ne détecte que ce que la CI teste.** Un contrôle « le conteneur démarre et reste sain » détecte un crash, pas une régression silencieuse : application qui répond en HTTP mais reste bloquée sur un écran de migration, option par défaut modifiée. Le niveau 2 suppose que ce type de régression soit rattrapable.
- **Push direct sur la branche par défaut.** Un commit poussé hors PR ne déclenche pas `Validate`, donc pas Renovate : les branches Renovate en retard ne sont rebasées qu'au prochain cron ou à la prochaine activité sur une branche `renovate/*`.

## Application / Projet lié

### [HomeLab](/docs/projects/personnel/homelab)
**Utilisation** : Renovate self-hosted authentifié par une GitHub App maintient les images de près de trente stacks Docker Compose, avec deux niveaux (revue manuelle pour le périmètre d'accès et les données irremplaçables, automerge avec pin par digest pour le reste), bases de données exclues, et relance par `workflow_run` après chaque validation de branche Renovate.

## Conclusion

Renovate transforme la mise à jour des images en flux de PR validées par la CI. La valeur du dispositif dépend moins de Renovate lui-même que de ce qui l'entoure : un token qui déclenche réellement la validation, une CI qui démarre vraiment les services, une classification explicite des dépendances selon le risque, et un déclenchement qui suit le rythme des validations plutôt qu'un cron.
