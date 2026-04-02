---
title: "Python : Poetry"
description: "Un guide complet sur Poetry, l'outil moderne de gestion de dépendances et de packaging pour Python."
tags: [scripting]
---

Poetry est devenu un outil essentiel dans l'écosystème Python pour gérer les dépendances et le packaging de projets. Dans cet article, nous explorerons comment Poetry simplifie la gestion des dépendances Python, offrant une alternative élégante et robuste à pip et virtualenv. 🐍

<!--truncate-->

## Pourquoi utiliser Poetry ? 🤔

Avant de plonger dans les détails techniques, voyons pourquoi vous devriez envisager d'utiliser Poetry pour vos projets Python:

1. **Gestion simplifiée des dépendances**: Poetry gère automatiquement les dépendances et leurs versions compatibles
2. **Environnements virtuels intégrés**: Création et gestion des environnements virtuels sans configuration supplémentaire
3. **Résolution déterministe des dépendances**: Lock file garantissant la reproductibilité des installations
4. **Publication facilitée**: Déploiement simplifié de packages sur PyPI
5. **Interface utilisateur intuitive**: Commandes claires et feedback utile

## Installation de Poetry 🚀

L'installation de Poetry est simple et directe:

```bash
# Méthode recommandée (installation isolée)
curl -sSL https://install.python-poetry.org | python3 -

# Vérifier l'installation
poetry --version
```

Pour les utilisateurs de macOS ou Linux, ajoutez Poetry à votre PATH:

```bash
# Ajouter à votre .zshrc ou .bashrc
export PATH="$HOME/.local/bin:$PATH"
```

## Création d'un nouveau projet 📁

Pour créer un nouveau projet avec Poetry:

```bash
# Créer un nouveau projet
poetry new mon-super-projet

# Structure générée
mon-super-projet/
├── pyproject.toml
├── README.md
├── mon_super_projet/
│   └── __init__.py
└── tests/
    └── __init__.py
```

Le fichier `pyproject.toml` est le cœur de votre projet, contenant toutes les métadonnées et dépendances:

```toml
[tool.poetry]
name = "mon-super-projet"
version = "0.1.0"
description = ""
authors = ["Votre Nom <votre.email@example.com>"]
readme = "README.md"

[tool.poetry.dependencies]
python = "^3.10"

[tool.poetry.dev-dependencies]
pytest = "^7.3.1"

[build-system]
requires = ["poetry-core>=1.0.0"]
build-backend = "poetry.core.masonry.api"
```

## Gestion des dépendances 📦

### Ajouter des dépendances

```bash
# Ajouter une dépendance
poetry add requests

# Ajouter une dépendance avec une contrainte de version spécifique
poetry add "requests>=2.25.0,<3.0.0"

# Ajouter une dépendance de développement
poetry add pytest --group dev
```

### Le fichier poetry.lock

Lorsque vous ajoutez des dépendances, Poetry crée un fichier `poetry.lock` qui verrouille les versions exactes. Ce fichier assure que tous les environnements utiliseront exactement les mêmes versions des packages.

```bash
# Installer les dépendances depuis le lock file
poetry install
```

## Utilisation quotidienne 💻

### Exécuter des commandes dans l'environnement virtuel

```bash
# Exécuter un script Python
poetry run python mon_script.py

# Exécuter une commande installée
poetry run pytest

# Ouvrir un shell dans l'environnement virtuel
poetry shell
```

### Mise à jour des dépendances

```bash
# Afficher les dépendances qui peuvent être mises à jour
poetry show --outdated

# Mettre à jour toutes les dépendances
poetry update

# Mettre à jour une dépendance spécifique
poetry update requests
```

## Configuration avancée 🔧

### Gestion de plusieurs environnements Python

Poetry permet de travailler facilement avec différentes versions de Python:

```bash
# Spécifier une version Python pour le projet
poetry env use python3.9

# Lister les environnements virtuels associés au projet
poetry env list

# Supprimer un environnement virtuel
poetry env remove python3.8
```

### Configuration des sources de packages

Vous pouvez configurer des sources de packages personnalisées:

```bash
# Ajouter un repository privé
poetry source add mon-repo https://mon-repo-prive.com/simple/

# Installer depuis un repository spécifique
poetry add mon-package --source mon-repo
```

## Workflows CI/CD avec Poetry 🔄

Poetry s'intègre parfaitement dans les pipelines d'intégration continue. Voici un exemple avec GitHub Actions:

```yaml
name: Tests Python

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install Poetry
        uses: snok/install-poetry@v1
        with:
          version: 1.6.1
      - name: Install dependencies
        run: poetry install
      - name: Run tests
        run: poetry run pytest
```

## Publication de votre package 🚢

Poetry facilite énormément la publication de packages sur PyPI:

```bash
# Construire le package
poetry build

# Publier sur PyPI
poetry publish

# Construire et publier en une seule commande
poetry publish --build
```

Pour publier sur un index privé:

```bash
poetry publish --repository mon-repo
```

## Comparaison avec d'autres outils 🔍

| Fonctionnalité | Poetry | pip + venv | pipenv |
|----------------|--------|------------|--------|
| Gestion des dépendances | ✅ | ⚠️ (manuel) | ✅ |
| Lock file | ✅ | ❌ | ✅ |
| Environnements virtuels | ✅ | ✅ (séparé) | ✅ |
| Publication de package | ✅ | ❌ (besoin de setuptools) | ❌ |
| Résolution des dépendances | ✅ (rapide) | ❌ | ✅ (lent) |
| Innovation active | ✅ | ✅ | ⚠️ |

## Bonnes pratiques avec Poetry 👍

1. **Toujours commiter le fichier `poetry.lock`**: Il garantit la reproductibilité des installations
2. **Séparer clairement dépendances de production et de développement**
3. **Définir des contraintes de version précises** pour les bibliothèques critiques
4. **Utiliser `poetry export`** pour générer un `requirements.txt` quand nécessaire:

   ```bash
   poetry export -f requirements.txt --output requirements.txt
   ```

5. **Mettre à jour régulièrement** vos dépendances pour des raisons de sécurité

## Conclusion 🎯

Poetry a transformé la façon dont les développeurs Python gèrent leurs projets en offrant une solution tout-en-un pour la gestion des dépendances, les environnements virtuels et le packaging. Son approche déclarative et sa simplicité d'utilisation en font un outil incontournable pour tout projet Python moderne.

Au-delà d'être un simple gestionnaire de dépendances, Poetry représente une évolution significative dans l'écosystème Python, rendant le développement plus reproductible, plus fiable et plus agréable.

## Application / Projet lié

### [standards-python](/docs/projects/professionnel/standards-python)
**Utilisation** : Project template Python utilisant Poetry pour la gestion des dépendances, les tests (pytest) et les releases.
