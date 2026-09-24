---
title: "Python : Pydantic"
description: "Pydantic pour valider, sérialiser et documenter des modèles de données en Python : modèles, validateurs, configuration, intégration avec FastAPI et différences entre v1 et v2."
tags: [scripting, devops]
---

Les données qui entrent dans une application (requêtes HTTP, fichiers de configuration, messages) n'ont aucune garantie de forme ni de type. Pydantic, bibliothèque de référence en Python pour ce besoin, valide et convertit ces données à partir de classes annotées avec les types standard du langage, et produit des erreurs détaillées lorsqu'elles ne respectent pas le modèle.

<!--truncate-->

## Qu'est-ce que Pydantic?

Pydantic est une bibliothèque Python qui permet de valider des données et de gérer les paramètres de configuration en utilisant les annotations de type Python. Elle offre plusieurs avantages :

- **Validation forte basée sur les types Python**
- **Conversion automatique des données d'entrée**
- **Génération de documentation JSON Schema**
- **Sérialisation et désérialisation faciles**
- **Performances optimisées** grâce à l'utilisation de code compilé en Rust

Pydantic est notamment le système de modèles utilisé par [FastAPI](./2024-12-20-fastapi.md), qui s'appuie sur lui pour valider les requêtes et sérialiser les réponses.

## Installation de Pydantic

L'installation de Pydantic est simple avec pip :

```bash
pip install pydantic

# Pour la version 2.x avec des performances optimisées
pip install "pydantic>=2.0.0"
```

Avec Poetry (voir l'article [Python : Poetry](./2025-06-06-poetry-python-dependency.md)) :

```bash
poetry add pydantic
```

## Les bases de Pydantic

### Définition de modèles

La première étape avec Pydantic consiste à définir un modèle en créant une classe qui hérite de `BaseModel` :

```python
from pydantic import BaseModel
from typing import Optional, List
from datetime import date

class User(BaseModel):
    id: int
    name: str
    email: str
    birth_date: date
    is_active: bool = True
    tags: List[str] = []
    website: Optional[str] = None
```

### Validation automatique

Une fois le modèle défini, Pydantic valide automatiquement les données lors de la création d'une instance :

```python
# Validation réussie
user = User(
    id=1,
    name="John Doe",
    email="john@example.com",
    birth_date="1990-01-01",  # Conversion automatique en objet date
    tags=["admin", "user"]
)

# Validation échouée
try:
    User(
        id="not_an_integer",  # Erreur: la valeur n'est pas un entier
        name=123,             # Sera converti en string automatiquement
        email="invalid_email" # Pas d'erreur par défaut: ce n'est pas une validation de format
    )
except ValueError as e:
    print(f"Erreur de validation: {e}")
```

### Sérialisation et désérialisation

Pydantic simplifie la conversion des modèles en dictionnaires, JSON ou d'autres formats :

```python
# Conversion en dictionnaire
user_dict = user.model_dump()

# Conversion en JSON
user_json = user.model_dump_json()

# Désérialisation depuis un dictionnaire
user_data = {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "birth_date": "1992-03-15"
}
new_user = User.model_validate(user_data)

# Désérialisation depuis JSON
user_from_json = User.model_validate_json('{"id": 3, "name": "Bob", "email": "bob@example.com", "birth_date": "1985-07-20"}')
```

## Fonctionnalités avancées

### Validateurs personnalisés

Pydantic permet de créer des validateurs personnalisés pour des vérifications plus complexes :

```python
from pydantic import BaseModel, field_validator, EmailStr

class AdvancedUser(BaseModel):
    id: int
    name: str
    email: EmailStr  # Type spécial pour valider les emails
    password: str
    password_confirm: str

    @field_validator('name')
    @classmethod
    def name_must_contain_space(cls, v):
        if ' ' not in v:
            raise ValueError('Le nom doit contenir un espace (prénom et nom)')
        return v.title()  # Convertit le nom en format titre

    @field_validator('password_confirm')
    @classmethod
    def passwords_match(cls, v, info):
        if 'password' in info.data and v != info.data['password']:
            raise ValueError('Les mots de passe ne correspondent pas')
        return v
```

### Types complexes

Pydantic prend en charge une variété de types complexes :

```python
from pydantic import BaseModel, HttpUrl, conlist, constr
from typing import Dict, Union

class Product(BaseModel):
    name: str
    price: float
    description: Optional[str] = None

class Order(BaseModel):
    order_id: str
    # Une liste avec au moins 1 élément
    products: conlist(Product, min_length=1)
    # Une chaîne avec contrainte de longueur
    customer_id: constr(min_length=5, max_length=20)
    # Union de types possibles
    payment_method: Union[str, Dict[str, str]]
    # URL valide
    store_url: HttpUrl
```

### Configuration des modèles

Pydantic offre de nombreuses options de configuration pour contrôler le comportement des modèles :

```python
class Settings(BaseModel):
    model_config = {
        # Permettre les champs supplémentaires
        "extra": "forbid",
        # Valider également les attributs lors de l'assignation
        "validate_assignment": True,
        # Aliases pour les noms de champs JSON
        "populate_by_name": True,
        # Noms JSON en format camelCase
        "alias_generator": lambda s: ''.join(
            word.capitalize() if i else word
            for i, word in enumerate(s.split('_'))
        ),
    }

    database_url: str
    api_key: str
    debug_mode: bool = False
    max_connections: int = 100
```

## Pydantic et FastAPI

FastAPI utilise les modèles Pydantic pour valider les corps de requête et filtrer les réponses :

```python
from fastapi import FastAPI, Path
from pydantic import BaseModel, Field
from typing import List

app = FastAPI()

class Item(BaseModel):
    name: str = Field(..., example="Smartphone")
    description: Optional[str] = Field(None, example="Un téléphone dernier cri")
    price: float = Field(..., gt=0, example=899.99)
    tax: Optional[float] = Field(None, example=20.0)

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "name": "Smartphone",
                    "description": "Un téléphone dernier cri",
                    "price": 899.99,
                    "tax": 20.0,
                }
            ]
        }
    }

@app.post("/items/", response_model=Item)
async def create_item(item: Item):
    return item

@app.get("/items/{item_id}", response_model=Item)
async def read_item(
    item_id: int = Path(..., title="L'ID de l'item à récupérer", ge=1)
):
    # Logic to retrieve item
    return {"name": "Example Item", "price": 99.99, "description": "A sample item"}
```

Avec cette configuration, FastAPI :

- Valide automatiquement les requêtes entrantes
- Convertit les données en objets Python typés
- Génère une documentation OpenAPI interactive
- Effectue la sérialisation des réponses

## Pydantic v1 vs v2 : les différences majeures

Pydantic v2 (sorti en 2023) a introduit plusieurs changements importants :

| Fonctionnalité | v1 | v2 |
|----------------|-----|-----|
| Moteur de validation | Python pur | Core en Rust (10-50x plus rapide) |
| API | `.dict()`, `.json()` | `.model_dump()`, `.model_dump_json()` |
| Validateurs | `@validator`, `@root_validator` | `@field_validator`, `@model_validator` |
| Types génériques | Support limité | Support amélioré |
| JSON Schema | Génération basique | Plus complet et personnalisable |

Exemple de migration :

```python
# Pydantic v1
from pydantic import BaseModel, validator

class UserV1(BaseModel):
    name: str
    age: int

    @validator('age')
    def check_age(cls, v):
        if v < 18:
            raise ValueError('Doit être majeur')
        return v

    # Conversion en dict/json
    data = user.dict()
    json_data = user.json()

# Pydantic v2
from pydantic import BaseModel, field_validator

class UserV2(BaseModel):
    name: str
    age: int

    @field_validator('age')
    @classmethod  # Maintenant obligatoire
    def check_age(cls, v):
        if v < 18:
            raise ValueError('Doit être majeur')
        return v

    # Conversion en dict/json
    data = user.model_dump()
    json_data = user.model_dump_json()
```

## Bonnes pratiques avec Pydantic

1. **Utilisez des types précis**: Les types comme `EmailStr`, `HttpUrl`, `conint`, etc. améliorent la validation

2. **Créez une hiérarchie de modèles**: Utilisez l'héritage pour les structures complexes

   ```python
   class BaseUser(BaseModel):
       id: int
       name: str

   class UserIn(BaseUser):
       password: str

   class UserOut(BaseUser):
       is_active: bool
   ```

3. **Exploitez les validators pour les règles métier complexes**:

   ```python
   @field_validator("reservation_date")
   @classmethod
   def validate_date_is_future(cls, v, info):
       if v <= datetime.now():
           raise ValueError("La réservation doit être dans le futur")
       return v
   ```

4. **Utilisez FrozenModel pour l'immutabilité**:

   ```python
   from pydantic import BaseModel, ConfigDict

   class Config(BaseModel):
       model_config = ConfigDict(frozen=True)
       api_key: str
       debug: bool = False
   ```

5. **Ajoutez des exemples pour améliorer la documentation**:

   ```python
   class Item(BaseModel):
       name: str
       price: float

       model_config = {
           "json_schema_extra": {"examples": [{"name": "Foo", "price": 35.4}]}
       }
   ```

## Cas d'utilisation concrets

### Validation de configuration

```python
from pydantic import BaseModel, Field, SecretStr
import yaml
from pathlib import Path

class DatabaseConfig(BaseModel):
    host: str = "localhost"
    port: int = 5432
    user: str
    password: SecretStr
    name: str
    ssl: bool = False

class ApiConfig(BaseModel):
    endpoint: str
    timeout: int = 30
    retries: int = 3

class AppConfig(BaseModel):
    debug: bool = False
    log_level: str = "INFO"
    database: DatabaseConfig
    api: ApiConfig

# Charger la configuration depuis un fichier YAML
config_path = Path("config.yaml")
with open(config_path) as f:
    config_dict = yaml.safe_load(f)

# Valider la configuration
try:
    config = AppConfig.model_validate(config_dict)
    print(f"Configuration valide: {config.model_dump(exclude={'database': {'password'}})}")
except ValueError as e:
    print(f"Configuration invalide: {e}")
```

### Traitement de données d'API

```python
import httpx
from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from datetime import datetime

class Author(BaseModel):
    name: str
    url: Optional[HttpUrl] = None

class Article(BaseModel):
    id: int
    title: str
    content: str
    published: datetime
    author: Author
    tags: List[str] = []

async def fetch_articles():
    async with httpx.AsyncClient() as client:
        response = await client.get("https://api.example.com/articles")
        data = response.json()

        # Valider et convertir les données en objets Python
        articles = [Article.model_validate(item) for item in data]

        # Maintenant on peut travailler avec des objets Python typés
        for article in articles:
            print(f"Article: {article.title}, Publié le: {article.published.strftime('%d/%m/%Y')}")
            print(f"Auteur: {article.author.name}")
            print("-" * 50)

        return articles
```

## Conclusion

Pydantic est largement utilisé dans l'écosystème Python, en particulier pour les API et les applications qui manipulent des données structurées. Ses caractéristiques principales :

- **Validation** des données fondée sur les annotations de types standard
- **Modèles déclaratifs** composables pour décrire des structures imbriquées
- **Performances** : depuis la v2, le cœur de validation (`pydantic-core`) est écrit en Rust
- **Intégration** avec FastAPI, SQLModel et de nombreux autres frameworks
