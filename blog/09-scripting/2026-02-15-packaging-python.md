---
title: "Python : Packaging"
description: "Comprendre le packaging Python : qu'est-ce qu'un package, PyPI, wheel, distributions, setuptools, métadonnées et versioning."
tags: [scripting, devops]
---

Publier son code Python sur PyPI c'est le rendre accessible à des milliers de développeurs. Exploration des concepts fondamentaux du packaging Python.

<!--truncate-->

## Qu'est-ce qu'un Package Python ?

### Différence : Module vs Package

**Module** : Un fichier Python unique
```
calculator.py  # C'est un module
```

**Package** : Un dossier contenant des modules
```
calculator/
├── __init__.py        # Marque le dossier comme package
├── operations.py
├── utils.py
└── constants.py
```

Le fichier `__init__.py` est crucial : c'est ce qui dit à Python "je suis un package".

### Structure simple

```
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

## Distributions : Wheel vs Source

Quand on publie un package, on crée deux types de distribution :

### Source Distribution (sdist)

**Format** : `my_package-1.0.0.tar.gz` (ou `.zip`)

```
my_package-1.0.0/
├── my_package/
│   ├── __init__.py
│   ├── core.py
│   └── utils.py
├── setup.py
├── README.md
└── pyproject.toml
```

**Avantages** ✅
- Contient le code source complet
- Portable sur tous les OS/architectures
- Permet inspection du code

**Inconvénients** ❌
- Installation lente (compilation nécessaire)
- Requiert les build tools (compilateur C, etc.)
- Plus volumineux

### Wheel Distribution (bdist_wheel)

**Format** : `my_package-1.0.0-py3-none-any.whl` (archive ZIP)

```
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

**Avantages** ✅
- Installation ultra-rapide (pas de compilation)
- Ne requiert que pip
- Cohérent sur tous les environnements

**Inconvénients** ❌
- Spécifique à une version Python/plateforme
- Code pré-compilé (moins d'inspection)

**Verdict** : Toujours publier les deux. Wheel en priorité, source en fallback.

## Métadonnées : Déclarer un Package

Les métadonnées c'est tout ce qu'on doit savoir sur un package : nom, version, dépendances, auteur, licence, etc.

### Configuration avec pyproject.toml (Modern)

Depuis PEP 517/518 (2015+), c'est l'approche moderne :

```toml
[build-system]
requires = ["setuptools>=61.0", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "my-awesome-lib"
version = "1.0.0"
description = "Une libraire incroyable"
readme = "README.md"
requires-python = ">=3.8"
license = {text = "MIT"}
authors = [
    {name = "John Doe", email = "john@example.com"}
]
keywords = ["awesome", "library", "python"]

# URLs
[project.urls]
Homepage = "https://github.com/user/my-awesome-lib"
Documentation = "https://my-awesome-lib.readthedocs.io"
Repository = "https://github.com/user/my-awesome-lib"

# Dépendances
[project.dependencies]
requests = ">=2.28.0"
pydantic = ">=1.10"

# Dépendances optionnelles
[project.optional-dependencies]
database = ["sqlalchemy>=1.4", "psycopg2>=2.9"]
email = ["aiosmtplib>=2.0"]

# Scripts CLI
[project.scripts]
my-cli = "my_lib.cli:main"

# Classifiers
[project.classifiers]
"Development Status :: 4 - Beta"
"Intended Audience :: Developers"
"License :: OSI Approved :: MIT License"
"Programming Language :: Python :: 3"
"Programming Language :: Python :: 3.8"
"Programming Language :: Python :: 3.9"
"Programming Language :: Python :: 3.10"
```

### Configuration avec setup.py (Legacy)

Encore utilisé, particulièrement pour les extensions C :

```python
from setuptools import setup, find_packages

setup(
    name="my-awesome-lib",
    version="1.0.0",
    description="Une libraire incroyable",
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

### Configuration avec setup.cfg (Alternative)

Format INI, utile pour projects complexes :

```ini
[metadata]
name = my-awesome-lib
version = 1.0.0
description = Une libraire incroyable
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

## Building : Créer les Distributions

### Installer les outils

```bash
pip install setuptools wheel build
```

`build` est l'outil moderne et recommandé pour créer distributions.

### Créer wheel + sdist

```bash
python -m build
```

Génère dans le dossier `dist/` :
- `my_package-1.0.0-py3-none-any.whl`
- `my_package-1.0.0.tar.gz`

### Vérifier la distribution

```bash
# Lister le contenu du wheel
unzip -l dist/my_package-1.0.0-py3-none-any.whl

# Lister le contenu du sdist
tar -tzf dist/my_package-1.0.0.tar.gz
```

## PyPI : La Registry Centrale

### Qu'est-ce que PyPI ?

**Python Package Index** : Registry centrale où vivent tous les packages Python publics.

- **URL** : https://pypi.org
- **Packages** : Environ 500k packages
- **Téléchargements/jour** : Millions

C'est là qu'on publie avec `pip install le-package`.

### Créer un compte

1. Aller sur https://pypi.org/account/register/
2. Vérifier l'email
3. Activer 2FA (recommandé)
4. Générer un token API : https://pypi.org/account/tokens/

### TestPyPI : Sandbox

Pour tester avant vraie publication.

- **URL** : https://test.pypi.org
- **Compté séparé** : Faut aussi s'y enregistrer
- **Token séparé** : À générer sur https://test.pypi.org/account/tokens/

Utile pour tester le processus de publication sans polluer PyPI.

## Publication sur PyPI

### Installation du CLI

```bash
pip install twine
```

`twine` est l'outil de publication, plus robust que `python setup.py upload` (dépréciée).

### Configuration des Credentials

Option 1 : Token API (recommandé)

```bash
# Dans ~/.pypirc
[distutils]
index-servers =
    pypi

[pypi]
repository = https://upload.pypi.org/legacy/
username = __token__
password = pypi-AgEIcHlwaS5vcmc...  # Votre token
```

Option 2 : Username/password (moins sûr, legacy)

```bash
[pypi]
username = john
password = mon_mot_de_passe_clair  # Mauvaise idée !
```

### Publier sur TestPyPI

D'abord, ajouter TestPyPI à `~/.pypirc` :

```
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

### Publier sur PyPI Official

```bash
python -m twine upload dist/*
```

Ou avec version spécifique :

```bash
python -m twine upload dist/my_package-1.0.0*
```

## Semantic Versioning

Format : `MAJOR.MINOR.PATCH[-pre-release][+build]`

```
1.0.0          # Release stable
1.0.1          # Bugfix (PATCH)
1.1.0          # Feature (MINOR)
2.0.0          # Breaking change (MAJOR)
1.0.0-beta.1   # Pre-release (beta/alpha/rc)
1.0.0+build.1  # Build metadata
```

**Règles** :
- `MAJOR` : Breaking change, code client doit changer
- `MINOR` : Feature rétro-compatible
- `PATCH` : Bugfix rétro-compatible

## Metadata complètes

### __init__.py

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
[project.classifiers]
# Status
"Development Status :: 3 - Alpha"
"Development Status :: 4 - Beta"
"Development Status :: 5 - Production/Stable"

# Licence
"License :: OSI Approved :: MIT License"
"License :: OSI Approved :: Apache Software License"

# Public
"Intended Audience :: Developers"
"Intended Audience :: System Administrators"

# Topics
"Topic :: Software Development"
"Topic :: System :: Monitoring"

# Python versions
"Programming Language :: Python :: 3"
"Programming Language :: Python :: 3.8"
"Programming Language :: Python :: 3.9"
"Programming Language :: Python :: 3.10"
"Programming Language :: Python :: 3.11"
```

## Checklist Avant Publication

- ✅ Tests passent : `pytest`
- ✅ Code formaté et linté
- ✅ Version mise à jour (semantic versioning)
- ✅ CHANGELOG.md complété
- ✅ README.md avec instructions d'installation/usage
- ✅ LICENSE.md présent
- ✅ Métadonnées complètes dans pyproject.toml/setup.py
- ✅ Testé sur TestPyPI d'abord
- ✅ Tag Git : `git tag v1.0.0`
- ✅ Commit des changements
- ✅ Build généré : `python -m build`

## Workflow Complet avec setuptools

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
description = "Une libraire incroyable"
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

# 7. Publier sur PyPI official
twine upload dist/*
```

## Bonnes Pratiques

### Dépendances

```toml
# BON : Version mineure fixée
requests = ">=2.28.0,<3.0"
pydantic = ">=1.10,<2.0"

# MAUVAIS : Pas de limite sup
requests = ">=2.28.0"

# BON : Version exacte pour stabilité
some-critical-lib = "1.2.3"
```

### Namespace packages

Utile si on maintient plusieurs packages liés :

```
src/
├── mycompany/
│   ├── __init__.py          (empty!)
│   ├── lib1/
│   │   └── __init__.py
│   └── lib2/
│       └── __init__.py
```

```toml
[tool.setuptools.packages]
find = {where = ["src"]}
```

Alors `from mycompany.lib1 import ...` ça marche.

### Entry points / Scripts CLI

```toml
[project.scripts]
my-cli = "my_lib.cli:main"
magic-tool = "my_lib.tools:run_magic"
```

L'installation du package rend ces commandes disponibles partout :

```bash
pip install my-awesome-lib
my-cli --help        # Fonctionne!
magic-tool config    # Fonctionne!
```

### Extras / Optional dependencies

```toml
[project.optional-dependencies]
database = ["sqlalchemy>=1.4"]
email = ["aiosmtplib>=2.0"]
dev = ["pytest", "black", "mypy"]
```

Installation sélective :

```bash
pip install my-awesome-lib                    # Bare minimum
pip install my-awesome-lib[database]          # + database
pip install my-awesome-lib[database,email]    # + database et email
pip install my-awesome-lib[dev]               # + all dev tools
```

## Alternatives Modernes (Optionnel)

### Poetry

Si vous préférez une approche all-in-one avec lock file :

```bash
poetry new my-lib
poetry add requests pydantic
poetry build && poetry publish
```

Poetry gère pyproject.toml, dependencies, et publication automatiquement. Idéal si vous aimez la cohésion.

### uv

Package manager ultra-rapide (écrit en Rust) :

```bash
uv pip install requests
uv venv
```

Remplace pip pour des workflows rapides. Toujours utilise pyproject.toml/setup.py pour packages, juste accélère les installations.

**Les deux restent compatibles avec le système d'emballage standard** (wheel, sdist, PyPI, setuptools). Juste des wrapper/helpers autour.

## Résources

- [Official Packaging Guide](https://packaging.python.org/tutorials/packaging-projects/)
- [setuptools Documentation](https://setuptools.pypa.io/)
- [PEP 427 - Wheel Format](https://peps.python.org/pep-0427/)
- [PEP 440 - Versioning](https://peps.python.org/pep-0440/)
- [PyPI Classifiers](https://pypi.org/classifiers/)
- [Twine Documentation](https://twine.readthedocs.io/)

## Conclusion

Le packaging Python s'appuie sur des concepts simples : modules, packages, distributions (wheel/sdist), métadonnées, et PyPI. Une fois qu'on comprend ça, publier son code devient facile. setuptools + twine suffisent pour la plupart des cas. Les alternatives modernes comme Poetry offrent plus de confort mais reposent toujours sur les mêmes fondations.

À vos pipelines! 🚀

## Application / Projet lié

### [standards-python](/docs/projects/professionnel/standards-python)
**Utilisation** : Templates et bonnes pratiques pour le packaging et la publication de packages Python.
