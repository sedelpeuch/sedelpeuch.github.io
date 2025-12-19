---
title: "Python : Ruff"
description: Découvrir Ruff, l'outil Python ultra-rapide écrit en Rust pour remplacer flake8, black et isort.
tags: [Python, Ruff, Linting, Formatting, Tooling]
---

Ruff est un **linter et formatter Python ultra-rapide** écrit en Rust. Il remplace plusieurs outils comme flake8, black, isort et pylint en étant 10 à 100 fois plus rapide. Cet outil simplifie considérablement la chaîne de qualité du code Python.

<!--truncate-->

# Ruff : Linting et Formatting Python

import IconTitle from '@site/src/components/IconTitle';

<IconTitle logo="skill-icons:python-light" name="Ruff"/>

## Qu'est-ce que Ruff ?

Ruff est un outil tout-en-un pour la qualité du code Python :

- **flake8** (linting)
- **black** (formatting)
- **isort** (import sorting)
- **pylint** (linting avancé)

Le principal avantage : une performance exceptionnelle grâce à son implémentation en Rust.

## Installation

```bash
# Avec pip
pip install ruff

# Avec poetry
poetry add --group dev ruff
```

## Configuration (`pyproject.toml`)

```toml
[tool.ruff]
line-length = 88
target-version = "py310"

[tool.ruff.lint]
# Règles activées
select = [
    "E",    # pycodestyle errors
    "W",    # pycodestyle warnings
    "F",    # Pyflakes
    "I",    # isort (import sorting)
    "N",    # pep8-naming
    "C4",   # flake8-comprehensions
    "UP",   # pyupgrade
]

# Règles ignorées
ignore = [
    "E501",  # line-too-long (géré par formatter)
    "W503",  # line-break-before-binary-operator
]

[tool.ruff.format]
# Identique à black
quote-style = "double"
indent-style = "space"
```

## Utilisation en ligne de commande

```bash
# Vérifier les erreurs sans corriger
ruff check .
# Analyse le répertoire courant et affiche toutes les violations.

# Auto-corriger les erreurs détectables
ruff check --fix .
# Corrige automatiquement les problèmes qui peuvent l'être (imports, formatting, etc.).

# Formater le code
ruff format .
# Applique les conventions de formatting à tous les fichiers Python.

# Combiner vérification et formatting
ruff check --fix . && ruff format .
# Workflow complet : correction des erreurs puis formatting.

# Vérifier le formatting sans modifier
ruff format --check .
# Utile en CI/CD pour vérifier que le code est bien formaté.
```

## Intégration VSCode

### Installation de l'extension

1. Ouvrir VSCode
2. Extensions (Ctrl+Shift+X)
3. Chercher **"Ruff"** (par Astral)
4. Installer l'extension

### Configuration VSCode (`settings.json`)

```json
{
  "[python]": {
    "editor.defaultFormatter": "charliermarsh.ruff",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.ruff": "explicit",
      "source.organizeImports.ruff": "explicit"
    }
  },
  "ruff.importStrategy": "fromEnvironment",
  "ruff.showNotifications": "onWarning"
}
```

### Fonctionnalités

- **Diagnostic en temps réel** : Erreurs soulignées immédiatement dans l'éditeur
- **Auto-fix** : Appui sur Ctrl+S pour formater et corriger le fichier
- **Hover info** : Survoler une erreur pour accéder à la documentation
- **Command Palette** : `Ruff: Fix all auto-fixable problems`

## Pre-commit Hook

Ajouter Ruff comme vérification automatique avant chaque commit :

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.5.0
    hooks:
      - id: ruff
        args: [--fix]
      - id: ruff-format
```

Installation du hook :

```bash
pre-commit install
```

## Règles courantes

| Code | Description |
|------|-------------|
| E    | PEP 8 errors |
| W    | PEP 8 warnings |
| F    | Pyflakes (undefined names, unused imports) |
| I    | Import sorting |
| N    | Naming conventions |
| C4   | Comprehensions optimizations |
| UP   | Modernize Python syntax |
| B    | Bugbear (bugs courants) |
| D    | Docstring conventions |

## Workflow recommandé

### À chaque sauvegarde (VSCode)

Format automatique et fix automatique grâce à la configuration VSCode.

### Avant commit (pre-commit hook)

```bash
ruff check --fix .
ruff format .
```

### En CI/CD

```bash
ruff check .           # Vérifier sans corriger
ruff format --check .  # Vérifier le formatting
```

## Exemple d'utilisation

Soit le fichier `main.py` avec plusieurs problèmes :

```python
import os
import sys
import json

def calculate(x,y):
    result=x+y
    return result

unused_var = 42
```

Après `ruff check --fix . && ruff format .` :

```python
import json
import os
import sys

def calculate(x, y):
    result = x + y
    return result
```

Ruff a automatiquement :

- Trié les imports (isort)
- Ajouté les espaces autour des opérateurs (black)
- Supprimé la variable non utilisée (avec `--fix`)

## Ressources

- [Documentation officielle Ruff](https://docs.astral.sh/ruff/)
- [Extension VSCode](https://marketplace.visualstudio.com/items?itemName=charliermarsh.ruff)
- [Liste complète des règles](https://docs.astral.sh/ruff/rules/)

Ruff représente une évolution majeure dans l'écosystème Python, combinant performance et simplicité. Son adoption améliore significativement la productivité des développeurs et la qualité du code.
