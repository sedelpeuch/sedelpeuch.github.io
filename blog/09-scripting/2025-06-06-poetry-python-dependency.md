---
title: "Python : Poetry"
description: "Poetry, outil de gestion de dépendances et de packaging pour Python : pyproject.toml, contraintes de version, lock file, groupes, environnements virtuels, CI et publication."
tags: [scripting, devops]
---

Un projet Python dépend de dizaines de paquets, eux-mêmes dépendants d'autres paquets. Avec `pip` et un `requirements.txt` écrit à la main, rien ne garantit que deux installations à quelques semaines d'intervalle obtiennent les mêmes versions. Poetry regroupe la déclaration des dépendances, leur résolution, leur verrouillage dans un lock file, la gestion de l'environnement virtuel et la publication du paquet dans un seul outil, piloté par le fichier standard `pyproject.toml`.

<!--truncate-->

## Pourquoi utiliser Poetry ?

1. **Déclaration unique des dépendances** : dans `pyproject.toml`, avec des contraintes de version, plutôt que dans plusieurs fichiers (`setup.py`, `requirements.txt`, `requirements-dev.txt`)
2. **Environnements virtuels intégrés** : création et activation automatiques d'un environnement propre au projet
3. **Résolution déterministe** : le fichier `poetry.lock` fixe la version exacte et l'empreinte de chaque paquet, dépendances indirectes comprises
4. **Publication** : construction des distributions (wheel, sdist) et envoi vers PyPI ou un index privé
5. **Groupes de dépendances** : séparation entre dépendances d'exécution, de test, de documentation

## Installation de Poetry

Poetry s'installe dans un environnement isolé, distinct de ceux des projets qu'il gère :

```bash
# Installeur officiel (installation dans ~/.local/share/pypoetry)
curl -sSL https://install.python-poetry.org | python3 -

# Ou via pipx
pipx install poetry

# Vérifier l'installation
poetry --version
```

L'installeur place la commande `poetry` dans `~/.local/bin`, qui doit figurer dans le `PATH` :

```bash
# Dans ~/.zshrc ou ~/.bashrc
export PATH="$HOME/.local/bin:$PATH"
```

## Création d'un nouveau projet

```bash
# Créer un nouveau projet
poetry new mon-projet

# Ou initialiser Poetry dans un répertoire existant
poetry init
```

```text
mon-projet/
├── pyproject.toml
├── README.md
├── src/
│   └── mon_projet/
│       └── __init__.py
└── tests/
    └── __init__.py
```

Depuis Poetry 2.0 (janvier 2025), `poetry new` adopte le *src layout* et décrit le projet dans la section standard `[project]` (PEP 621), lisible par tous les outils de l'écosystème ; la section `[tool.poetry]` ne contient plus que les réglages propres à Poetry :

```toml
[project]
name = "mon-projet"
version = "0.1.0"
description = ""
authors = [{ name = "Nom Prénom", email = "nom@example.com" }]
readme = "README.md"
requires-python = ">=3.10"
dependencies = [
    "requests (>=2.32,<3.0)",
]

[tool.poetry]
packages = [{ include = "mon_projet", from = "src" }]

[tool.poetry.group.dev.dependencies]
pytest = "^8.3"

[build-system]
requires = ["poetry-core>=2.0.0,<3.0.0"]
build-backend = "poetry.core.masonry.api"
```

La section `[build-system]` désigne le *build backend* (PEP 517) : n'importe quel outil standard (`pip install .`, `python -m build`) sait construire le paquet en appelant `poetry-core`, sans que Poetry lui-même soit installé. Les projets antérieurs à Poetry 2.0 déclarent leurs dépendances dans `[tool.poetry.dependencies]`, format toujours accepté. L'ancienne section `[tool.poetry.dev-dependencies]` est dépréciée au profit des groupes.

## Gestion des dépendances

### Ajouter des dépendances

```bash
# Ajouter une dépendance (contrainte calculée à partir de la dernière version)
poetry add requests

# Ajouter une dépendance avec une contrainte explicite
poetry add "requests>=2.25.0,<3.0.0"

# Ajouter une dépendance au groupe dev
poetry add pytest --group dev
```

Poetry accepte des contraintes au format PEP 440 et deux opérateurs abrégés :

| Contrainte | Versions acceptées |
|------------|-------------------|
| `^2.31` | `>=2.31,<3.0` : pas de changement de la version majeure |
| `^0.4.2` | `>=0.4.2,<0.5.0` : en version 0.x, la mineure joue le rôle de majeure |
| `~2.31` | `>=2.31,<2.32` : seules les versions correctives |
| `>=2.25,<3.0` | intervalle explicite (PEP 440) |

### Le fichier poetry.lock

À chaque ajout ou modification de dépendance, Poetry résout le graphe complet des dépendances, en cherchant un ensemble de versions qui satisfait simultanément toutes les contraintes, puis écrit le résultat dans `poetry.lock` : version exacte et empreintes SHA-256 de chaque paquet, dépendances indirectes comprises. `pyproject.toml` exprime les **contraintes** acceptables, `poetry.lock` la **solution** retenue.

```bash
# Installer exactement les versions du lock file (ne le modifie pas)
poetry install

# Installer sans les groupes de développement (production, image Docker)
poetry install --without dev

# Vérifier que poetry.lock est cohérent avec pyproject.toml (utile en CI)
poetry check --lock
```

## Utilisation quotidienne

### Exécuter des commandes dans l'environnement virtuel

```bash
# Exécuter un script Python
poetry run python mon_script.py

# Exécuter une commande installée
poetry run pytest

# Afficher la commande d'activation de l'environnement, puis l'exécuter
eval "$(poetry env activate)"
```

La commande `poetry shell` a été retirée du cœur de Poetry 2.0 : elle est disponible via l'extension `poetry-plugin-shell`, et `poetry env activate` la remplace. Par défaut, les environnements sont créés dans un répertoire de cache ; `poetry config virtualenvs.in-project true` les place dans un dossier `.venv` à la racine du projet, que les éditeurs détectent automatiquement.

### Mise à jour des dépendances

```bash
# Afficher les dépendances qui peuvent être mises à jour
poetry show --outdated

# Mettre à jour toutes les dépendances, dans les limites des contraintes
poetry update

# Mettre à jour une dépendance spécifique
poetry update requests
```

`poetry update` ne sort jamais des contraintes de `pyproject.toml` : passer à une nouvelle version majeure suppose de modifier la contrainte (`poetry add requests@^3.0`).

## Configuration avancée

### Gestion de plusieurs versions de Python

```bash
# Utiliser une version Python spécifique pour le projet
poetry env use python3.12

# Lister les environnements virtuels associés au projet
poetry env list

# Supprimer un environnement virtuel
poetry env remove python3.11
```

La version choisie doit satisfaire `requires-python`. Poetry utilise les interpréteurs installés sur la machine ; il n'installe pas Python lui-même (contrairement à [uv](./2025-12-19-uv-python.md)).

### Configuration des sources de packages

```bash
# Ajouter un dépôt privé, consulté uniquement pour les paquets qui le désignent
poetry source add --priority=explicit mon-repo https://mon-repo-prive.example.com/simple/

# Installer depuis ce dépôt
poetry add mon-package --source mon-repo

# Identifiants du dépôt, stockés hors du projet
poetry config http-basic.mon-repo utilisateur motdepasse
```

La priorité `explicit` limite le dépôt privé aux seuls paquets qui le référencent : un attaquant ne peut pas publier sur PyPI un paquet homonyme d'un paquet interne pour qu'il soit installé à sa place (*dependency confusion*).

## Workflows CI/CD avec Poetry

Exemple avec GitHub Actions :

```yaml
name: Tests Python

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install Poetry
        run: pipx install poetry
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'
          cache: poetry           # cache des paquets, indexé sur poetry.lock
      - name: Install dependencies
        run: poetry install
      - name: Run tests
        run: poetry run pytest
```

Poetry est installé avant `setup-python` pour que l'option `cache: poetry` puisse le détecter.

## Publication d'un package

```bash
# Construire le wheel et l'archive source dans dist/
poetry build

# Configurer le jeton d'API PyPI (une fois)
poetry config pypi-token.pypi pypi-XXXXXXXX

# Publier sur PyPI
poetry publish

# Construire et publier en une seule commande
poetry publish --build
```

Pour publier sur un index privé :

```bash
poetry config repositories.mon-repo https://mon-repo-prive.example.com/legacy/
poetry publish --repository mon-repo
```

En CI, la publication *Trusted Publishing* de PyPI (jeton OIDC émis par GitHub Actions) évite de stocker un jeton d'API permanent ; elle passe par l'action `pypa/gh-action-pypi-publish` à partir des fichiers produits par `poetry build`. Le détail du packaging est traité dans l'article [packaging Python](./2026-02-15-packaging-python.md).

## Comparaison avec d'autres outils

| Fonctionnalité | Poetry | pip + venv | pipenv | uv |
|----------------|--------|------------|--------|----|
| Déclaration des dépendances | `pyproject.toml` | `requirements.txt` manuel | `Pipfile` | `pyproject.toml` |
| Lock file | oui (`poetry.lock`) | non natif (pip-tools) | oui (`Pipfile.lock`) | oui (`uv.lock`) |
| Environnements virtuels | intégrés | manuels (`python -m venv`) | intégrés | intégrés |
| Construction et publication | oui | non (outils `build`, `twine`) | non | oui |
| Installation de Python | non | non | non | oui |
| Implémentation | Python | Python | Python | Rust |

## Bonnes pratiques avec Poetry

1. **Toujours commiter le fichier `poetry.lock`** pour les applications : il garantit la reproductibilité des installations
2. **Séparer les dépendances** d'exécution et de développement par groupes
3. **Définir des contraintes de version larges pour une bibliothèque**, afin de ne pas bloquer les projets qui la consomment, et laisser le lock file figer les versions exactes d'une application
4. **Exporter un `requirements.txt`** quand un outil tiers l'exige, via l'extension `poetry-plugin-export` (retirée du cœur de Poetry 2.0) :

   ```bash
   poetry self add poetry-plugin-export
   poetry export -f requirements.txt --output requirements.txt
   ```

5. **Mettre à jour régulièrement** les dépendances pour les correctifs de sécurité, idéalement via un outil comme Renovate ou Dependabot qui propose des pull requests

## Conclusion

Poetry réunit déclaration, résolution, verrouillage, environnement virtuel et publication autour de `pyproject.toml`. Depuis la version 2.0, il s'aligne sur les standards de l'écosystème (section `[project]`, PEP 621), ce qui facilite l'interopérabilité et la migration vers d'autres outils. [uv](./2025-12-19-uv-python.md) propose aujourd'hui un périmètre comparable, avec une implémentation en Rust nettement plus rapide.

## Application / Projet lié

### [standards-python](/docs/projects/professionnel/standards-python)
**Utilisation** : Project template Python utilisant Poetry pour la gestion des dépendances, les tests (pytest) et les releases.
