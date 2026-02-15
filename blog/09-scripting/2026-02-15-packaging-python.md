---
title: "Python : packaging"
description: "Maîtrisez le packaging Python avec Poetry, pip, setuptools. Créez et distribuez vos packages sur PyPI."
tags: [scripting, devops]
---

Créer et distribuer un package Python n'a jamais été aussi simple. Du choix des outils à la publication sur PyPI, voici le guide complet du packaging Python moderne.

<!--truncate-->

## Évolution du Packaging

### Historiquement
- **distutils** (obsolète) : Outil standard de la stdlib
- **setuptools** (toujours utilisé) : Extension de distutils
- **pip** (2008+) : Gestionnaire de packages

### Moderne
- **Poetry** (2018+) : Gestion complète des dépendances
- **pip-tools** : Gestion précise des versions
- **hatch**, **pdm** : Alternatives émergentes

## pip vs Poetry

### pip

**Avantages** ✅
- Standard dans l'écosystème
- Léger et simple
- Comportement prévisible

**Inconvénients** ❌
- Pas de lock file natif
- Dépendances implicites
- Versionning des sousrépandances complexe

### Poetry

**Avantages** ✅
- Lock file (déterministe)
- Gestion élégante des dépendances
- Création/publication simplifiée
- Environnements isolés natifs

**Inconvénients** ❌
- Courbe d'apprentissage
- Parfois alourdit les workflows simples

**Verdict** : Poetry pour les nouveaux projets, pip pour les dépendances ponctuelles.

## Poetry : Guide Complet

### Installation

```bash
# macOS / Linux
curl -sSL https://install.python-poetry.org | python3 -

# Windows (PowerShell)
(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | python -

# Vérifier
poetry --version
```

### Créer un projet

```bash
poetry new my-project
cd my-project
```

Structure créée :

```
my-project/
├── pyproject.toml
├── README.md
├── my_project/
│   └── __init__.py
└── tests/
    └── test_my_project.py
```

### pyproject.toml

Centre de configuration de votre projet.

```toml
[tool.poetry]
name = "my-awesome-lib"
version = "0.1.0"
description = "Une libraire incroyable"
authors = ["John Doe <john@example.com>"]
readme = "README.md"
license = "MIT"

# Repository et homepage
repository = "https://github.com/user/my-awesome-lib"
homepage = "https://my-awesome-lib.org"
documentation = "https://my-awesome-lib.readthedocs.io"

# Keywords et classifiers
keywords = ["awesome", "library", "python"]
classifiers = [
    "Development Status :: 4 - Beta",
    "Intended Audience :: Developers",
    "License :: OSI Approved :: MIT License",
    "Programming Language :: Python :: 3",
    "Programming Language :: Python :: 3.8",
    "Programming Language :: Python :: 3.9",
    "Programming Language :: Python :: 3.10",
    "Programming Language :: Python :: 3.11",
]

[tool.poetry.dependencies]
python = "^3.8"
requests = "^2.28.0"
pydantic = {version = "^1.10", extras = ["email"]}

[tool.poetry.group.dev.dependencies]
pytest = "^7.0"
pytest-cov = "^4.0"
black = "^23.0"
ruff = "^0.1"
mypy = "^1.0"

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
```

### Ajouter/Mettre à jour les dépendances

```bash
# Ajouter une dépendance
poetry add requests

# Ajouter une version spécifique
poetry add requests@^2.28.0

# Ajouter en dev
poetry add --group dev pytest

# Mettre à jour
poetry update
poetry update requests
```

### poetry.lock

Généré automatiquement, assure la reproductibilité.

```bash
poetry lock  # Mettre à jour le lock file
```

**À commiter** dans le repo pour assurer que tous les développeurs utilisent les mêmes versions.

### Lancer des commandes

```bash
# Dans l'environnement virtuel
poetry run python script.py
poetry run pytest
poetry run black .

# Ou activer l'env
poetry shell
python script.py
exit
```

## Structures et Formats

### Structure simple

```
my-lib/
├── my_lib/
│   ├── __init__.py
│   ├── core.py
│   └── utils.py
├── tests/
├── README.md
└── pyproject.toml
```

### Structure pour namespace package

```
my-namespace-lib/
├── src/
│   └── my_namespace/
│       └── my_lib/
│           ├── __init__.py
│           └── core.py
├── tests/
└── pyproject.toml
```

Dans `pyproject.toml` :
```toml
packages = [{include = "my_namespace", from = "src"}]
```

## Building et Distribution

### Créer les distributions

```bash
poetry build
```

Crée dans `dist/` :
- `my_package-0.1.0-py3-none-any.whl` (wheel)
- `my_package-0.1.0.tar.gz` (source)

### Wheel vs Source Distribution

| Aspect | Wheel | Source |
|--------|-------|--------|
| Format | Binaire | Tarball |
| Installation | Rapide | Compilation |
| Compatibilité | Version-spécifique | Universelle |
| Préféré | ✅ | Fallback |

### Publier sur PyPI

#### 1. Configurer PyPI

```bash
poetry config pypi-token.pypi <votre-token-pypi>
```

Obtenir un token sur https://pypi.org/account/tokens/

#### 2. Publier

```bash
poetry publish
```

Ou en une seule commande :

```bash
poetry build && poetry publish
```

#### 3. Tester avant

```bash
# Publier sur TestPyPI (sandbox)
poetry publish -r test-pypi
```

Configurer :

```bash
poetry config repositories.test-pypi https://test.pypi.org/legacy/
poetry config pypi-token.test-pypi <token-testpypi>
```

## Setuptools (L'Ancienne Voie)

Encore utilisé et utile à connaître.

### setup.py

```python
from setuptools import setup, find_packages

setup(
    name="my-awesome-lib",
    version="0.1.0",
    author="John Doe",
    author_email="john@example.com",
    description="Une libraire incroyable",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/user/my-awesome-lib",
    packages=find_packages(),
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
    ],
    python_requires=">=3.8",
    install_requires=[
        "requests>=2.28.0",
        "pydantic>=1.10",
    ],
    extras_require={
        "dev": ["pytest>=7.0", "black>=23.0"],
    },
)
```

### Construire

```bash
python setup.py build
python setup.py sdist  # Source distribution
python setup.py bdist_wheel  # Wheel
```

## setup.cfg (Configuration alternative)

```ini
[metadata]
name = my-awesome-lib
version = 0.1.0
author = John Doe
author_email = john@example.com
description = Une libraire incroyable
long_description = file: README.md
long_description_content_type = text/markdown
url = https://github.com/user/my-awesome-lib

[options]
packages = find:
python_requires = >=3.8
install_requires =
    requests>=2.28.0
    pydantic>=1.10

[options.extras_require]
dev =
    pytest>=7.0
    black>=23.0
```

## Bonnes Pratiques

### Versioning (Semantic Versioning)

Format : `MAJOR.MINOR.PATCH`

```
0.1.0 → 0.1.1  # Patch (bugfix)
0.1.0 → 0.2.0  # Minor (feature)
0.1.0 → 1.0.0  # Major (breaking change)
```

### Fichier __init__.py

```python
# my_lib/__init__.py
__version__ = "0.1.0"
__author__ = "John Doe"

from .core import main_function
from .utils import helper

__all__ = ["main_function", "helper"]
```

### Métadonnées complètes

```toml
[tool.poetry]
name = "my-lib"
version = "0.1.0"
description = "Description courte"
authors = ["John Doe <john@example.com>"]
license = "MIT"

readme = "README.md"
repository = "https://github.com/user/my-lib"
documentation = "https://my-lib.readthedocs.io"
homepage = "https://my-lib.org"
keywords = ["keyword1", "keyword2"]

classifiers = [
    "Development Status :: 4 - Beta",
    "License :: OSI Approved :: MIT License",
    "Programming Language :: Python :: 3.8",
    "Programming Language :: Python :: 3.9",
]
```

### Entry Points

Point d'entrée pour des scripts CLI.

```toml
[tool.poetry.scripts]
my-cli = "my_lib.cli:main"
```

Utilisation :

```bash
pip install my-lib
my-cli --help
```

### Dépendances optionnelles

```toml
[tool.poetry.extras]
database = ["sqlalchemy>=1.4", "psycopg2>=2.9"]
email = ["aiosmtplib>=2.0"]

# Installation
# pip install my-lib[database]
# pip install my-lib[database,email]
```

## Exemple Complet

```bash
# Créer le projet
poetry new my-awesome-lib
cd my-awesome-lib

# Ajouter les dépendances
poetry add requests pydantic
poetry add --group dev pytest pytest-cov black ruff

# Développer
# ... écrire le code ...

# Tester
poetry run pytest

# Linter/Formatter
poetry run black .
poetry run ruff check .

# Publier
poetry version patch  # 0.1.0 → 0.1.1
poetry build
poetry publish
```

## Checklist Avant Publication

- ✅ Version updatée dans pyproject.toml
- ✅ README.md complet
- ✅ LICENSE.md présent
- ✅ Tests passent : `poetry run pytest --cov`
- ✅ Code formaté : `poetry run black .`
- ✅ Linter clean : `poetry run ruff check .`
- ✅ Dépendances à jour : `poetry update`
- ✅ Types hints valides (si applicable)
- ✅ Docstrings complètes
- ✅ CHANGELOG.md à jour
- ✅ Tags git : `git tag v0.1.0`

## Résources Utiles

- [Poetry Documentation](https://python-poetry.org/)
- [PyPI Classifiers](https://pypi.org/classifiers/)
- [PEP 440 - Version](https://www.python.org/dev/peps/pep-0440/)
- [PEP 427 - Wheel Format](https://www.python.org/dev/peps/pep-0427/)

## Conclusion

Le packaging Python moderne avec Poetry simplifie énormément la distribution. Une fois configuré, publier sur PyPI est affaire de quelques minutes. N'hésitez pas à créer vos propres packages - contribuer à l'écosystème Python c'est gratifiant !
