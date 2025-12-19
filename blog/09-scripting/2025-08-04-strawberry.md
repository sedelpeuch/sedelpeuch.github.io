---
title: "GraphQL : FastAPI & Strawberry"
description: "Étapes pratiques pour concevoir, coder et tester une API GraphQL en Python."
tags: [Devops, Python, API]
---

Ce guide présente, étape par étape, la création d’une API GraphQL en Python avec FastAPI et Strawberry, en expliquant les choix d’outils et les bonnes pratiques à chaque étape.

<!--truncate-->

## Outils utilisés

### FastAPI

FastAPI est un framework web moderne pour Python, conçu pour créer des APIs performantes, robustes et faciles à maintenir. Il offre :

- Un support natif d’async/await pour la performance
- Une documentation automatique (Swagger/OpenAPI)
- Une intégration simple avec les standards Python (type hints, Pydantic)
- Idéal pour des APIs REST ou GraphQL modernes

### Strawberry

Strawberry est une bibliothèque Python pour créer des APIs GraphQL. Elle se distingue par :

- Une syntaxe moderne basée sur les dataclasses et les annotations de type Python
- Un support natif de FastAPI et Starlette
- La génération automatique du schéma GraphQL et de la documentation interactive (GraphiQL)
- La gestion des queries, mutations et subscriptions (WebSocket)

## Pourquoi utiliser FastAPI et Strawberry ensemble ?

FastAPI et Strawberry sont complémentaires dans l’architecture d’une API GraphQL moderne :

- **FastAPI** joue le rôle de serveur web : il reçoit les requêtes HTTP/WS, gère le routage, la sécurité, la documentation, et l’intégration avec l’écosystème Python (middlewares, dépendances, etc.).
- **Strawberry** gère toute la logique GraphQL : il définit le schéma (types, queries, mutations, subscriptions), résout les requêtes GraphQL, et expose l’interface interactive GraphiQL.

**Comment ça s’interconnecte ?**

- Strawberry fournit un schéma GraphQL Python.
- FastAPI expose ce schéma sur une route (ex : `/graphql`) grâce à `GraphQLRouter`.
- Toute requête GraphQL (query, mutation, subscription) passe par FastAPI, qui la transmet à Strawberry pour exécution.

**Responsabilités dans l’architecture :**

- FastAPI : transport, sécurité, configuration serveur, intégration avec d’autres services (auth, logs, etc.)
- Strawberry : logique métier GraphQL, validation des requêtes, génération du schéma, documentation GraphQL

Cette séparation permet de bénéficier du meilleur des deux mondes : la puissance de FastAPI pour l’API et l’écosystème Python, et la flexibilité de Strawberry pour GraphQL.

## Initialisation du projet Python

Pour démarrer un projet Python proprement, on utilise [Poetry](https://python-poetry.org/) qui gère les dépendances et l’environnement virtuel.

### 1. Création du projet et du fichier pyproject.toml

Dans le terminal :

```bash
poetry new exemple-graphql-fastapi
cd exemple-graphql-fastapi
```

Cela crée la structure de base du projet et un fichier `pyproject.toml` qui centralise la configuration :

```toml
[tool.poetry]
name = "exemple-graphql-fastapi"
version = "0.1.0"
description = "Exemple d'API GraphQL avec FastAPI et Strawberry"
authors = ["Votre Nom <email@example.com>"]

[tool.poetry.dependencies]
python = ">=3.9,<4.0"
fastapi = "^0.110.0"
uvicorn = "^0.29.0"
strawberry-graphql = "^0.220.0"
requests = "^2.32.4"
websockets = "^15.0.1"

[build-system]
requires = ["poetry-core>=1.0.0"]
build-backend = "poetry.core.masonry.api"
```

### 2. Installation des dépendances

Toujours dans le dossier du projet :

```bash
poetry install
```

Cela crée un environnement virtuel isolé et installe toutes les dépendances nécessaires.

> **Astuce** : Pour activer l’environnement virtuel Poetry dans votre shell, utilisez `poetry env activate`.

## Mise en place du serveur FastAPI (main.py)

Le fichier `main.py` est le point d’entrée de l’application. Il configure FastAPI et expose le schéma GraphQL fourni par Strawberry sur une route dédiée.

Créez un fichier `main.py` à la racine du projet avec le contenu suivant :

```python
from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter
from schema import schema

app = FastAPI()
graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix="/graphql")
```

- `FastAPI()` instancie le serveur web.
- `GraphQLRouter(schema)` crée une route GraphQL à partir du schéma Strawberry.
- `app.include_router(...)` expose l’API GraphQL sur `/graphql`.

> **Remarque** : Ce fichier ne contient aucune logique métier, il sert uniquement à brancher le schéma GraphQL sur le serveur HTTP. Toute la logique (types, queries, mutations, subscriptions) sera définie dans `schema.py`.

## Définition du schéma GraphQL : les queries (schema.py)

Pour organiser la logique métier, on crée un fichier `schema.py` qui contiendra tout le schéma GraphQL : types, queries, mutations, subscriptions.

### Cas d’usage fictif : gestion de piscines

Imaginons une API pour gérer un parc de piscines publiques. On souhaite exposer en lecture la liste des piscines, avec leurs caractéristiques principales (nom, localisation, capacité, horaires, etc.).

### Qu’est-ce qu’une query GraphQL ?

En GraphQL, une **query** est une opération de lecture : elle permet au client de demander exactement les données dont il a besoin, sous la forme d’un arbre, en une seule requête HTTP. Contrairement à REST où chaque endpoint correspond à une ressource ou une action, GraphQL expose un unique endpoint `/graphql` et c’est la query qui décrit la forme et la profondeur des données attendues.

- Une query interroge le schéma GraphQL pour obtenir des objets, des listes ou des champs précis.
- Le serveur exécute la query et retourne uniquement les champs demandés, dans la structure voulue.

Exemple de query côté client :

```graphql
query {
  pools {
    name
    city
  }
}
```

Réponse typique du serveur :

```json
{
  "data": {
    "pools": [
      {"name": "Aquaparc", "city": "Paris"},
      {"name": "Blue Lagoon", "city": "Lyon"}
    ]
  }
}
```

### Exemple minimal de queries dans `schema.py`

Créez un fichier `schema.py` à la racine du projet :

```python
import strawberry
from typing import List

@strawberry.type
class Pool:
    name: str
    city: str
    capacity: int

# Données fictives pour l'exemple
data = [
    Pool(name="Aquaparc", city="Paris", capacity=200),
    Pool(name="Blue Lagoon", city="Lyon", capacity=150),
]

@strawberry.type
class Query:
    @strawberry.field
    def pools(self) -> List[Pool]:
        return data

schema = strawberry.Schema(query=Query)
```

- On définit un type `Pool` (nom, ville, capacité).
- On crée une liste de piscines fictives.
- On expose une query `pools` qui retourne la liste des piscines.

> **Remarque** : Ce schéma est minimal pour illustrer la structure. On pourra l’enrichir ensuite (filtres, mutations, etc.).

## Ajouter des données : les mutations GraphQL

Après les queries (lecture), GraphQL permet aussi de modifier les données via des **mutations**. Une mutation est l’équivalent d’une opération d’écriture (création, modification, suppression) dans le schéma.

### Qu’est-ce qu’une mutation ?

- Une mutation GraphQL permet au client de demander une modification de l’état du serveur (ajout, mise à jour, suppression d’un objet).
- Comme pour les queries, le client choisit les champs à retourner dans la réponse.
- Les mutations sont regroupées dans une classe `Mutation` dans le schéma Strawberry.

Exemple de mutation côté client :

```graphql
mutation {
  addPool(name: "Piscine Soleil", city: "Marseille", capacity: 120) {
    name
    city
    capacity
  }
}
```

Réponse typique du serveur :

```json
{
  "data": {
    "addPool": {
      "name": "Piscine Soleil",
      "city": "Marseille",
      "capacity": 120
    }
  }
}
```

### Exemple minimal de mutation dans `schema.py`

On enrichit le schéma pour permettre d’ajouter une piscine :

```python
import strawberry
from typing import List

@strawberry.type
class Pool:
    name: str
    city: str
    capacity: int

# Données fictives pour l'exemple
data = [
    Pool(name="Aquaparc", city="Paris", capacity=200),
    Pool(name="Blue Lagoon", city="Lyon", capacity=150),
]

@strawberry.type
class Query:
    @strawberry.field
    def pools(self) -> List[Pool]:
        return data

@strawberry.type
class Mutation:
    @strawberry.mutation
    def add_pool(self, name: str, city: str, capacity: int) -> Pool:
        pool = Pool(name=name, city=city, capacity=capacity)
        data.append(pool)
        return pool

schema = strawberry.Schema(query=Query, mutation=Mutation)
```

- On définit une classe `Mutation` avec une méthode `add_pool`.
- Cette mutation prend des arguments (name, city, capacity), crée une nouvelle piscine, l’ajoute à la liste, et la retourne.
- On passe la mutation au schéma Strawberry.

> **Remarque** : En production, on utiliserait une base de données au lieu d’une liste Python, mais ce modèle illustre la mécanique GraphQL.

## Temps réel avec GraphQL : les subscriptions (WebSocket)

En plus des queries (lecture) et des mutations (écriture), GraphQL propose un troisième concept : les **subscriptions**. Les subscriptions permettent au client de s’abonner à des événements côté serveur et de recevoir des notifications en temps réel, généralement via WebSocket.

### Qu’est-ce qu’une subscription ?

- Une subscription GraphQL permet au client de recevoir automatiquement des mises à jour dès qu’un événement se produit (ex : ajout d’une piscine).
- La connexion se fait via WebSocket, ce qui permet au serveur de pousser les données vers le client sans que celui-ci ait à interroger en boucle.
- Les subscriptions sont utiles pour le temps réel : notifications, chat, monitoring, etc.

Exemple de subscription côté client :

```graphql
subscription {
  poolAdded {
    name
    city
  }
}
```

À chaque fois qu’une piscine est ajoutée, le serveur envoie automatiquement les infos de la nouvelle piscine à tous les clients abonnés.

### Exemple minimal de subscription dans `schema.py`

On enrichit le schéma pour notifier en temps réel l’ajout d’une piscine :

```python
import asyncio
import strawberry
from typing import List, AsyncGenerator

@strawberry.type
class Pool:
    name: str
    city: str
    capacity: int

# Données fictives pour l'exemple
data = [
    Pool(name="Aquaparc", city="Paris", capacity=200),
    Pool(name="Blue Lagoon", city="Lyon", capacity=150),
]

subscribers: List[asyncio.Queue] = []

@strawberry.type
class Subscription:
    @strawberry.subscription
    async def pool_added(self) -> AsyncGenerator[Pool, None]:
        queue = asyncio.Queue()
        subscribers.append(queue)
        try:
            while True:
                pool = await queue.get()
                yield pool
        finally:
            subscribers.remove(queue)

@strawberry.type
class Query:
    @strawberry.field
    def pools(self) -> List[Pool]:
        return data

@strawberry.type
class Mutation:
    @strawberry.mutation
    def add_pool(self, name: str, city: str, capacity: int) -> Pool:
        pool = Pool(name=name, city=city, capacity=capacity)
        data.append(pool)
        # Notifier les abonnés
        for queue in subscribers:
            queue.put_nowait(pool)
        return pool

schema = strawberry.Schema(query=Query, mutation=Mutation, subscription=Subscription)
```

- On définit une classe `Subscription` avec une méthode `pool_added` qui écoute les nouveaux ajouts.
- Lorsqu’une piscine est ajoutée via la mutation, tous les abonnés sont notifiés en temps réel.
- Le schéma Strawberry inclut maintenant la subscription.

> **Remarque** : Pour tester les subscriptions, il faut utiliser un client compatible WebSocket (ex : GraphiQL, Apollo, ou un script Python avec `websockets`).
