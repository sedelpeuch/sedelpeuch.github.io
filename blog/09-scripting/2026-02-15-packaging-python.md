---
title: "Python : Packaging"
description: "Packaging Python : modules et packages, distributions wheel et sdist, métadonnées, setuptools, publication sur PyPI et versionnage."
tags: [scripting, devops]
---

Un code Python réutilisable ne se diffuse pas en copiant des fichiers : pour qu'une commande `pip install` puisse l'installer avec ses dépendances, sa version et ses commandes, il doit être empaqueté dans un format standard (wheel ou sdist), décrit par des métadonnées et publié sur un index comme PyPI. Cet article détaille ces notions, de la structure d'un package à sa publication.

<!--truncate-->

## Qu'est-ce qu'un package Python ?

### Différence : module et package

**Module** : un fichier Python unique
```text
calculator.py  # C'est un module
```

**Package** : un dossier contenant des modules
```text
calculator/
├── __init__.py        # Marque le dossier comme package
├── operations.py
├── utils.py
└── constants.py
```

Le fichier `__init__.py` marque le dossier comme package "régulier" et s'exécute à l'import du package. Depuis Python 3.3 (PEP 420), un dossier sans `__init__.py` reste importable, mais comme namespace package (voir plus bas) ; `find_packages()` de setuptools ignore par ailleurs les dossiers qui n'en ont pas.

### Structure simple

```text
my_package/
├── my_package/           # Code source
│   ├── __init__.py
│   ├── core.py
│   └── utils.py
├── tests/                # Tests
├── README.md
├── LICENSE
└── pyproject.toml        # Configuration de packaging
```

### Dépendances du package

Un package peut dépendre d'autres packages (importés via `pip install`).

```python
# Dans my_package/core.py
import requests  # Dépendance externe
from .utils import helper  # Dépendance interne
```

Ces dépendances externes doivent être déclarées lors du packaging.

## Distributions : wheel et source

La publication d'un package produit deux types de distribution :

### Distribution source (sdist)

**Format** : `my_package-1.0.0.tar.gz` (ou `.zip`)

```text
my_package-1.0.0/
├── my_package/
│   ├── __init__.py
│   ├── core.py
│   └── utils.py
├── setup.py
├── README.md
└── pyproject.toml
```

**Avantages**
- Contient le code source complet
- Portable sur tous les OS/architectures
- Permet l'inspection du code

**Inconvénients**
- Installation plus lente : le wheel est construit localement, avec compilation si le package contient des extensions C
- Requiert le backend de build, et un compilateur C pour les extensions compilées
- Plus volumineux

### Distribution wheel (bdist_wheel)

**Format** : `my_package-1.0.0-py3-none-any.whl` (archive ZIP)

```text
my_package-1.0.0.dist-info/
├── METADATA
├── RECORD
├── entry_points.txt
└── top_level.txt

my_package/
├── __init__.py
├── core.py
└── utils.py
```

**Avantages**
- Installation rapide (ni construction ni compilation)
- Ne requiert que pip
- Cohérent sur tous les environnements

**Inconvénients**
- Pour un package à extensions compilées : un wheel par version de Python et par plateforme (`cp312-cp312-manylinux_2_17_x86_64`, etc.), contenant du code binaire. Un wheel pur Python (`py3-none-any`) est universel et contient les sources `.py`

**Usage** : publier les deux. pip installe le wheel lorsqu'il est compatible avec l'environnement, et se replie sur la sdist sinon.

## Métadonnées : déclarer un package

Les métadonnées décrivent un package : nom, version, dépendances, auteur, licence, etc.

### Configuration avec pyproject.toml (moderne)

Les PEP 517/518 définissent la table `[build-system]` (backend de build) et la PEP 621 la table `[project]` (métadonnées). C'est l'approche actuelle :

```toml
[build-system]
requires = ["setuptools>=77.0"]
build-backend = "setuptools.build_meta"

[project]
name = "my-awesome-lib"
version = "1.0.0"
description = "Une bibliothèque d'exemple"
readme = "README.md"
requires-python = ">=3.8"
license = "MIT"
authors = [
    {name = "John Doe", email = "john@example.com"}
]
keywords = ["awesome", "library", "python"]

# Dépendances
dependencies = [
    "requests>=2.28.0",
    "pydantic>=1.10",
]

# Classifiers
classifiers = [
    "Development Status :: 4 - Beta",
    "Intended Audience :: Developers",
    "Programming Language :: Python :: 3",
    "Programming Language :: Python :: 3.8",
    "Programming Language :: Python :: 3.9",
    "Programming Language :: Python :: 3.10",
]

# URLs
[project.urls]
Homepage = "https://github.com/user/my-awesome-lib"
Documentation = "https://my-awesome-lib.readthedocs.io"
Repository = "https://github.com/user/my-awesome-lib"

# Dépendances optionnelles
[project.optional-dependencies]
database = ["sqlalchemy>=1.4", "psycopg2>=2.9"]
email = ["aiosmtplib>=2.0"]

# Scripts CLI
[project.scripts]
my-cli = "my_lib.cli:main"
```

`dependencies` et `classifiers` sont des tableaux de chaînes placés dans la table `[project]`, avant toute sous-table (`[project.urls]`, etc.) : en TOML, une clé écrite après l'en-tête d'une sous-table appartient à cette sous-table. `license` est une expression de licence SPDX (PEP 639, prise en charge à partir de setuptools 77) ; l'ancienne forme `license = {text = "MIT"}` et les classifiers `License ::` sont dépréciés, et setuptools refuse de construire un projet qui combine expression SPDX et classifier de licence.

### Configuration avec setup.py (historique)

Encore utilisé, particulièrement pour les extensions C :

```python
from setuptools import setup, find_packages

setup(
    name="my-awesome-lib",
    version="1.0.0",
    description="Une bibliothèque d'exemple",
    author="John Doe",
    author_email="john@example.com",
    url="https://github.com/user/my-awesome-lib",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    license="MIT",
    packages=find_packages(),
    python_requires=">=3.8",
    install_requires=[
        "requests>=2.28.0",
        "pydantic>=1.10",
    ],
    extras_require={
        "database": ["sqlalchemy>=1.4", "psycopg2>=2.9"],
        "email": ["aiosmtplib>=2.0"],
    },
    entry_points={
        "console_scripts": [
            "my-cli=my_lib.cli:main",
        ],
    },
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3.8",
    ],
)
```

### Configuration avec setup.cfg (alternative)

Format INI, déclaratif, qui sépare les métadonnées du code :

```ini
[metadata]
name = my-awesome-lib
version = 1.0.0
description = Une bibliothèque d'exemple
author = John Doe
author_email = john@example.com
url = https://github.com/user/my-awesome-lib
long_description = file: README.md
long_description_content_type = text/markdown
license = MIT

[options]
packages = find:
python_requires = >=3.8
install_requires =
    requests>=2.28.0
    pydantic>=1.10

[options.extras_require]
database =
    sqlalchemy>=1.4
    psycopg2>=2.9
email =
    aiosmtplib>=2.0

[options.entry_points]
console_scripts =
    my-cli = my_lib.cli:main
```

## Construction : créer les distributions

### Installer les outils

```bash
pip install setuptools wheel build
```

`build` est l'outil recommandé par la PyPA pour créer les distributions.

### Créer wheel + sdist

```bash
python -m build
```

Génère dans le dossier `dist/` :
- `my_awesome_lib-1.0.0-py3-none-any.whl`
- `my_awesome_lib-1.0.0.tar.gz`

### Vérifier la distribution

```bash
# Lister le contenu du wheel
unzip -l dist/my_awesome_lib-1.0.0-py3-none-any.whl

# Lister le contenu du sdist
tar -tzf dist/my_awesome_lib-1.0.0.tar.gz
```

## PyPI : le registre central

### Qu'est-ce que PyPI ?

**Python Package Index** : registre central des packages Python publics.

- **URL** : https://pypi.org
- **Packages** : environ 500k packages
- **Téléchargements/jour** : plusieurs millions

C'est sur PyPI que les packages sont publiés (avec `twine` ou `uv publish`), et c'est là que `pip install le-package` va les chercher par défaut.

### Créer un compte

1. Aller sur https://pypi.org/account/register/
2. Vérifier l'email
3. Activer la 2FA (obligatoire pour tous les comptes PyPI)
4. Générer un token API : https://pypi.org/manage/account/token/

### TestPyPI : bac à sable

Index de test, distinct de PyPI, pour valider une publication.

- **URL** : https://test.pypi.org
- **Compte séparé** : il faut aussi s'y enregistrer
- **Token séparé** : à générer sur https://test.pypi.org/manage/account/token/

Il permet de tester le processus de publication sans publier sur PyPI.

## Publication sur PyPI

### Installation du CLI

```bash
pip install twine
```

`twine` est l'outil de publication ; il remplace `python setup.py upload` (déprécié) et envoie les fichiers via HTTPS après vérification des métadonnées.

### Configuration des identifiants

PyPI n'accepte plus l'envoi authentifié par nom d'utilisateur et mot de passe : la publication passe par un token API (nom d'utilisateur `__token__`, token en mot de passe) ou, en CI, par le Trusted Publishing, où le workflow (GitHub Actions, GitLab CI…) obtient via OIDC un jeton éphémère sans qu'aucun secret ne soit stocké.

Fichier `~/.pypirc` :

```ini
[distutils]
index-servers =
    pypi

[pypi]
repository = https://upload.pypi.org/legacy/
username = __token__
password = pypi-AgEIcHlwaS5vcmc...
```

Le format INI de `.pypirc` n'accepte pas de commentaire en fin de ligne : un `# ...` placé après la valeur ferait partie du mot de passe.

### Publier sur TestPyPI

D'abord, ajouter TestPyPI à `~/.pypirc` :

```ini
[distutils]
index-servers =
    pypi
    test-pypi

[test-pypi]
repository = https://test.pypi.org/legacy/
username = __token__
password = pypi-AgEIcHlwaS5vcm9qZWN0...
```

Puis publier :

```bash
python -m twine upload --repository test-pypi dist/*
```

### Tester l'installation

```bash
# Depuis TestPyPI
pip install --index-url https://test.pypi.org/simple/ my-awesome-lib

# Depuis PyPI
pip install my-awesome-lib
```

### Publier sur PyPI

```bash
python -m twine upload dist/*
```

Ou avec version spécifique :

```bash
python -m twine upload dist/my_awesome_lib-1.0.0*
```

## Versionnage sémantique

Les versions Python suivent la PEP 440. Le schéma sémantique `MAJOR.MINOR.PATCH` s'y applique, mais les suffixes ont leur propre syntaxe (une notation SemVer comme `1.0.0-beta.1` est acceptée et normalisée en `1.0.0b1`) :

```text
1.0.0          # Release stable
1.0.1          # Bugfix (PATCH)
1.1.0          # Feature (MINOR)
2.0.0          # Breaking change (MAJOR)
1.0.0a1        # Pre-release : a (alpha), b (beta), rc (release candidate)
1.0.0.post1    # Post-release (correction sans changement de code)
1.0.0.dev1     # Version de développement
1.0.0+build.1  # Version locale : refusée par PyPI
```

**Règles** :
- `MAJOR` : rupture de compatibilité, le code client doit changer
- `MINOR` : fonctionnalité rétrocompatible
- `PATCH` : correctif rétrocompatible

## Métadonnées complètes

### `__init__.py`

```python
# my_lib/__init__.py
__version__ = "1.0.0"
__author__ = "John Doe"
__email__ = "john@example.com"
__license__ = "MIT"

# Exposer l'API publique
from .core import main_function
from .utils import helper

__all__ = ["main_function", "helper"]
```

### Classifiers importants

```toml
[project]
classifiers = [
    # Status (un seul par projet)
    "Development Status :: 3 - Alpha",
    "Development Status :: 4 - Beta",
    "Development Status :: 5 - Production/Stable",

    # Public
    "Intended Audience :: Developers",
    "Intended Audience :: System Administrators",

    # Topics
    "Topic :: Software Development",
    "Topic :: System :: Monitoring",

    # Python versions
    "Programming Language :: Python :: 3",
    "Programming Language :: Python :: 3.8",
    "Programming Language :: Python :: 3.9",
    "Programming Language :: Python :: 3.10",
    "Programming Language :: Python :: 3.11",
]
```

Les classifiers `License :: ...` sont dépréciés au profit du champ `license` (expression SPDX, PEP 639).

## Checklist avant publication

- Tests passent : `pytest`
- Code formaté et linté
- Version mise à jour (versionnage sémantique)
- CHANGELOG.md complété
- README.md avec instructions d'installation/usage
- LICENSE.md présent
- Métadonnées complètes dans pyproject.toml/setup.py
- Testé sur TestPyPI d'abord
- Tag Git : `git tag v1.0.0`
- Commit des changements
- Build généré : `python -m build`

## Workflow complet avec setuptools

```bash
# 1. Initialiser la structure
mkdir my-awesome-lib && cd my-awesome-lib
git init

# 2. Créer pyproject.toml et source
cat > pyproject.toml << 'EOF'
[build-system]
requires = ["setuptools>=61.0", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "my-awesome-lib"
version = "1.0.0"
description = "Une bibliothèque d'exemple"
requires-python = ">=3.8"
dependencies = ["requests>=2.28.0"]
EOF

mkdir my_lib
touch my_lib/__init__.py

# 3. Tester le build
pip install build
python -m build

# 4. Vérifier
pip install --dry-run dist/my_awesome_lib-1.0.0-py3-none-any.whl

# 5. Publier sur TestPyPI
twine upload --repository test-pypi dist/*

# 6. Tester installation
pip install --index-url https://test.pypi.org/simple/ my-awesome-lib

# 7. Publier sur PyPI
twine upload dist/*
```

## Bonnes pratiques

### Dépendances

```toml
[project]
dependencies = [
    # Borne inférieure : version minimale qui fournit les API utilisées
    "requests>=2.28.0",
    # Borne supérieure sur la version majeure : rupture d'API connue ou annoncée
    "pydantic>=2.0,<3.0",
]
```

Les dépendances d'une bibliothèque cohabitent dans le même environnement avec celles des autres packages installés : une version exacte (`==1.2.3`) ou une borne supérieure systématique réduit l'ensemble des combinaisons admissibles et provoque des conflits de résolution chez les utilisateurs. Le guide de packaging de la PyPA recommande donc de ne pas épingler de version exacte dans `dependencies`. L'épinglage exact relève du lock file ou du `requirements.txt` d'une application déployée (voir l'article [Python : uv](./2025-12-19-uv-python.md)).

### Namespace packages

Ils servent à répartir plusieurs packages liés entre des distributions distinctes :

```text
src/
├── mycompany/               (pas de __init__.py)
│   ├── lib1/
│   │   └── __init__.py
│   └── lib2/
│       └── __init__.py
```

```toml
[tool.setuptools.packages]
find = {where = ["src"]}
```

C'est l'absence de `__init__.py` dans `mycompany/` qui en fait un namespace package (PEP 420) : plusieurs distributions peuvent fournir chacune un sous-package de `mycompany`, et `from mycompany.lib1 import ...` fonctionne. Un `__init__.py` dans `mycompany/` en ferait un package régulier, fourni par une seule distribution. La découverte automatique de setuptools en `pyproject.toml` (`find`) inclut les namespace packages par défaut (`namespaces = true`).

### Entry points / scripts CLI

```toml
[project.scripts]
my-cli = "my_lib.cli:main"
magic-tool = "my_lib.tools:run_magic"
```

L'installation du package rend ces commandes disponibles partout :

```bash
pip install my-awesome-lib
my-cli --help        # Commande disponible dans le PATH
magic-tool config    # Commande disponible dans le PATH
```

### Extras / dépendances optionnelles

```toml
[project.optional-dependencies]
database = ["sqlalchemy>=1.4"]
email = ["aiosmtplib>=2.0"]
dev = ["pytest", "black", "mypy"]
```

Installation sélective (les crochets sont entre guillemets, sinon le shell, zsh notamment, les interprète comme un motif de fichiers) :

```bash
pip install my-awesome-lib                      # Dépendances de base
pip install "my-awesome-lib[database]"          # + database
pip install "my-awesome-lib[database,email]"    # + database et email
pip install "my-awesome-lib[dev]"               # + outils de développement
```

## Alternatives : Poetry et uv

### Poetry

Pour une approche tout-en-un avec lock file (voir l'article [Python : Poetry](./2025-06-06-poetry-python-dependency.md)) :

```bash
poetry new my-lib
poetry add requests pydantic
poetry build && poetry publish
```

Poetry gère `pyproject.toml`, les dépendances, le lock file et la publication dans un même outil.

### uv

Gestionnaire de paquets et de projets écrit en Rust (voir l'article [Python : uv](./2025-12-19-uv-python.md)) :

```bash
uv init --package my-lib
uv add requests pydantic
uv build && uv publish
```

uv couvre la gestion des dépendances, le lock file, la construction et la publication, en s'appuyant sur le `[build-system]` déclaré dans `pyproject.toml`.

Les deux restent compatibles avec le système de packaging standard (wheel, sdist, PyPI, PEP 517/621) : ils produisent les mêmes distributions que setuptools et twine, et un projet peut changer d'outil sans changer de format.

## Ressources

- [Python Packaging User Guide](https://packaging.python.org/tutorials/packaging-projects/)
- [setuptools Documentation](https://setuptools.pypa.io/)
- [PEP 427 - Wheel Format](https://peps.python.org/pep-0427/)
- [PEP 440 - Versioning](https://peps.python.org/pep-0440/)
- [PyPI Classifiers](https://pypi.org/classifiers/)
- [Twine Documentation](https://twine.readthedocs.io/)

## Conclusion

Le packaging Python repose sur quelques notions : modules, packages, distributions (wheel et sdist), métadonnées et index (PyPI). setuptools et twine suffisent pour la plupart des cas ; Poetry et uv regroupent ces étapes dans un seul outil, mais produisent les mêmes distributions standard.

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/professionnel/standards-python" title="standards-python">Templates et bonnes pratiques pour le packaging et la publication de packages Python.</ProjectLink>
</ProjectLinks>
