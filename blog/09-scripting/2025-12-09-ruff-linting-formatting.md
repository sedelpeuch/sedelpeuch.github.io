---
title: "Python : Ruff"
description: "Ruff, linter et formateur Python écrit en Rust qui remplace flake8, black et isort : configuration, ligne de commande, VSCode, pre-commit et CI."
tags: [scripting, devops]
---

Ruff est un **linter et formateur Python** écrit en Rust, développé par Astral. Il réimplémente les règles de flake8 (et de nombreux plugins), isort, pyupgrade et une partie de pylint, ainsi qu'un formateur compatible avec black, avec des temps d'exécution de l'ordre de 10 à 100 fois inférieurs selon ses auteurs. Un seul outil et un seul fichier de configuration remplacent ainsi plusieurs dépendances de la chaîne de qualité du code.

<!--truncate-->

## Qu'est-ce que Ruff ?

Ruff est un outil tout-en-un pour la qualité du code Python :

- **flake8** (linting)
- **black** (formatting)
- **isort** (import sorting)
- **pylint** (linting avancé)

Ces outils, écrits en Python, sont remplacés par un binaire unique compilé depuis Rust, ce qui explique l'écart de temps d'exécution mentionné en introduction.

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
# Corrige automatiquement les violations qui disposent d'un correctif (imports inutilisés ou mal triés, syntaxe obsolète, etc.).

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
  "ruff.importStrategy": "fromEnvironment"
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
    rev: v0.16.10
    hooks:
      - id: ruff-check
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
def calculate(x, y):
    result = x + y
    return result


unused_var = 42
```

Ruff a automatiquement :

- Supprimé les trois imports non utilisés (règle F401, corrigée par `--fix`)
- Ajouté les espaces autour des opérateurs et les deux lignes vides entre définitions de niveau module (`ruff format`)

La variable `unused_var` est conservée : la règle F841 ne vise que les variables locales non utilisées, pas les affectations au niveau du module.

## Conclusion

Ruff regroupe le linting, le tri des imports et le formatage dans un seul binaire configuré depuis `pyproject.toml`. Le même outil, avec la même configuration, s'exécute dans l'éditeur, dans un hook pre-commit et en CI, ce qui garantit que les trois étapes appliquent les mêmes règles.

## Ressources

- [Documentation officielle Ruff](https://docs.astral.sh/ruff/)
- [Extension VSCode](https://marketplace.visualstudio.com/items?itemName=charliermarsh.ruff)
- [Liste complète des règles](https://docs.astral.sh/ruff/rules/)

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/professionnel/standards-python" title="Standards Python">Ruff configuré comme linter et formateur standard du template Python, à la place de black, isort et flake8.</ProjectLink>
  <ProjectLink to="/docs/projects/professionnel/cicd" title="CI/CD">Workflow générique d'exécution des hooks pre-commit en CI, qui applique les vérifications Ruff des projets issus du template Python.</ProjectLink>
</ProjectLinks>
