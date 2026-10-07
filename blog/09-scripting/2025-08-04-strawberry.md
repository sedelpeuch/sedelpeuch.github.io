---
title: "GraphQL : FastAPI & Strawberry"
description: "Étapes pratiques pour concevoir, coder et tester une API GraphQL en Python."
tags: [scripting, devops]
---

Une API REST fixe côté serveur la forme des réponses de chaque endpoint : le client enchaîne plusieurs requêtes pour assembler une vue, ou reçoit des champs dont il n'a pas l'usage. GraphQL déplace ce choix vers le client, qui décrit les données attendues à partir d'un schéma typé exposé sur un seul endpoint. En Python, FastAPI assure le transport HTTP et WebSocket et Strawberry décrit ce schéma à partir de classes annotées ; leur assemblage couvre les trois opérations de GraphQL : queries, mutations et subscriptions.

<!--truncate-->

## Outils utilisés

### FastAPI

FastAPI est un framework web Python pour construire des APIs (voir l'article [Python : FastAPI](./2024-12-20-fastapi.md)). Il offre :

- Un support natif d'async/await pour la performance
- Une documentation automatique (Swagger/OpenAPI)
- Une intégration avec les standards Python (type hints, Pydantic)
- Adapté aux API REST comme GraphQL

### Strawberry

Strawberry est une bibliothèque Python pour créer des APIs GraphQL. Elle se distingue par :

- Une syntaxe basée sur les dataclasses et les annotations de type Python
- Un support natif de FastAPI et Starlette
- La génération automatique du schéma GraphQL et de la documentation interactive (GraphiQL)
- La gestion des queries, mutations et subscriptions (WebSocket)

## Pourquoi utiliser FastAPI et Strawberry ensemble ?

FastAPI et Strawberry sont complémentaires dans l'architecture d'une API GraphQL :

- **FastAPI** joue le rôle de serveur web : il reçoit les requêtes HTTP/WS, gère le routage, la sécurité, la documentation, et l'intégration avec l'écosystème Python (middlewares, dépendances, etc.).
- **Strawberry** gère toute la logique GraphQL : il définit le schéma (types, queries, mutations, subscriptions), résout les requêtes GraphQL, et expose l'interface interactive GraphiQL.

**Articulation entre les deux outils :**

- Strawberry fournit un schéma GraphQL Python.
- FastAPI expose ce schéma sur une route (ex : `/graphql`) grâce à `GraphQLRouter`.
- Toute requête GraphQL (query, mutation, subscription) passe par FastAPI, qui la transmet à Strawberry pour exécution.

**Responsabilités dans l'architecture :**

- FastAPI : transport, sécurité, configuration serveur, intégration avec d'autres services (auth, logs, etc.)
- Strawberry : logique métier GraphQL, validation des requêtes, génération du schéma, documentation GraphQL

Cette séparation isole le transport et l'intégration au serveur, portés par FastAPI, de la description et de l'exécution du schéma GraphQL, portées par Strawberry.

## Initialisation du projet Python

Le projet est initialisé avec [Poetry](./2025-06-06-poetry-python-dependency.md), qui gère les dépendances et l'environnement virtuel.

### 1. Création du projet et du fichier pyproject.toml

Dans le terminal :

```bash
poetry new exemple-graphql-fastapi
cd exemple-graphql-fastapi
```

Cela crée la structure de base du projet et un fichier `pyproject.toml` qui centralise la configuration.

### 2. Installation des dépendances

Toujours dans le dossier du projet :

```bash
poetry add fastapi uvicorn strawberry-graphql websockets
```

Poetry crée un environnement virtuel isolé, y installe les dépendances, les verrouille dans `poetry.lock` et les déclare dans la section `[project]` du `pyproject.toml`, format utilisé depuis Poetry 2.0 (extrait, versions indicatives) :

```toml
[project]
name = "exemple-graphql-fastapi"
version = "0.1.0"
description = "Exemple d'API GraphQL avec FastAPI et Strawberry"
authors = [{ name = "Prénom Nom", email = "email@example.com" }]
requires-python = ">=3.9"
dependencies = [
    "fastapi (>=0.116.1,<0.117.0)",
    "uvicorn (>=0.35.0,<0.36.0)",
    "strawberry-graphql (>=0.278.0,<0.279.0)",
    "websockets (>=15.0.1,<16.0.0)",
]

[build-system]
requires = ["poetry-core>=2.0.0,<3.0.0"]
build-backend = "poetry.core.masonry.api"
```

Sur un autre poste, `poetry install` réinstalle les mêmes versions à partir du lock file.

> **Astuce** : `eval "$(poetry env activate)"` active l'environnement virtuel Poetry dans le shell courant.

## Mise en place du serveur FastAPI (main.py)

Le fichier `main.py` est le point d'entrée de l'application. Il configure FastAPI et expose le schéma GraphQL fourni par Strawberry sur une route dédiée.

Contenu du fichier `main.py`, à la racine du projet :

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
- `app.include_router(...)` expose l'API GraphQL sur `/graphql`.

> **Remarque** : Ce fichier ne contient aucune logique métier, il sert uniquement à brancher le schéma GraphQL sur le serveur HTTP. Toute la logique (types, queries, mutations, subscriptions) sera définie dans `schema.py`.

## Définition du schéma GraphQL : les queries (schema.py)

Pour organiser la logique métier, un fichier `schema.py` regroupe tout le schéma GraphQL : types, queries, mutations, subscriptions.

### Cas d'usage fictif : gestion de piscines

L'exemple porte sur une API de gestion d'un parc de piscines publiques. Elle expose en lecture la liste des piscines, avec leurs caractéristiques principales (nom, localisation, capacité, horaires, etc.).

### Qu'est-ce qu'une query GraphQL ?

En GraphQL, une **query** est une opération de lecture : elle permet au client de demander exactement les données dont il a besoin, sous la forme d'un arbre, en une seule requête HTTP. Contrairement à REST où chaque endpoint correspond à une ressource ou une action, GraphQL expose un unique endpoint `/graphql` et c'est la query qui décrit la forme et la profondeur des données attendues (comparaison détaillée dans [API : REST vs GraphQL](./2025-08-04-graphql.md)).

- Une query interroge le schéma GraphQL pour obtenir des objets, des listes ou des champs précis.
- Le serveur exécute la query et retourne uniquement les champs demandés, dans la structure voulue.

Exemple de query côté client :

```graphql
query {
  pools {
    name
    city
  }
}
```

Réponse typique du serveur :

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

Contenu du fichier `schema.py`, à la racine du projet :

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

- Le type `Pool` décrit une piscine (nom, ville, capacité).
- Une liste de piscines fictives sert de source de données.
- La query `pools` retourne la liste des piscines.

> **Remarque** : Ce schéma est minimal pour illustrer la structure. Les sections suivantes l'enrichissent (mutations, subscriptions).

## Ajouter des données : les mutations GraphQL

Après les queries (lecture), GraphQL permet aussi de modifier les données via des **mutations**. Une mutation est l'équivalent d'une opération d'écriture (création, modification, suppression) dans le schéma.

### Qu'est-ce qu'une mutation ?

- Une mutation GraphQL permet au client de demander une modification de l'état du serveur (ajout, mise à jour, suppression d'un objet).
- Comme pour les queries, le client choisit les champs à retourner dans la réponse.
- Les mutations sont regroupées dans une classe `Mutation` dans le schéma Strawberry.

Exemple de mutation côté client :

```graphql
mutation {
  addPool(name: "Piscine Soleil", city: "Marseille", capacity: 120) {
    name
    city
    capacity
  }
}
```

Réponse typique du serveur :

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

Le schéma est enrichi pour permettre l'ajout d'une piscine :

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

- La classe `Mutation` définit une méthode `add_pool`.
- Cette mutation prend des arguments (name, city, capacity), crée une nouvelle piscine, l'ajoute à la liste, et la retourne.
- La mutation est passée au schéma Strawberry.

> **Remarque** : En production, une base de données remplace la liste Python ; ce modèle se limite à la mécanique GraphQL.

## Temps réel avec GraphQL : les subscriptions (WebSocket)

En plus des queries (lecture) et des mutations (écriture), GraphQL propose un troisième concept : les **subscriptions**. Les subscriptions permettent au client de s'abonner à des événements côté serveur et de recevoir des notifications en temps réel, généralement via WebSocket.

### Qu'est-ce qu'une subscription ?

- Une subscription GraphQL permet au client de recevoir automatiquement des mises à jour dès qu'un événement se produit (ex : ajout d'une piscine).
- La connexion se fait via WebSocket, ce qui permet au serveur de pousser les données vers le client sans que celui-ci ait à interroger en boucle.
- Les subscriptions sont utiles pour le temps réel : notifications, chat, monitoring, etc.

Exemple de subscription côté client :

```graphql
subscription {
  poolAdded {
    name
    city
  }
}
```

À chaque fois qu'une piscine est ajoutée, le serveur envoie automatiquement les informations de la nouvelle piscine à tous les clients abonnés.

### Exemple minimal de subscription dans `schema.py`

Le schéma est enrichi pour notifier en temps réel l'ajout d'une piscine :

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

- La classe `Subscription` définit une méthode `pool_added` qui écoute les nouveaux ajouts.
- Lorsqu'une piscine est ajoutée via la mutation, tous les abonnés sont notifiés en temps réel.
- Le schéma Strawberry inclut maintenant la subscription.

## Lancement et test

Le serveur se lance avec Uvicorn, dans l'environnement virtuel du projet :

```bash
poetry run uvicorn main:app --reload
```

L'URL `http://127.0.0.1:8000/graphql`, ouverte dans un navigateur, affiche l'interface GraphiQL fournie par Strawberry : elle propose l'autocomplétion à partir du schéma et exécute les queries et les mutations. La même route répond aux requêtes HTTP `POST` :

```bash
curl -X POST http://127.0.0.1:8000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ pools { name city } }"}'
```

Les subscriptions passent par une connexion WebSocket : il faut un client compatible (GraphiQL, Apollo, ou un script Python avec `websockets`). Avec deux onglets GraphiQL, l'un abonné à `poolAdded` et l'autre exécutant `addPool`, la nouvelle piscine apparaît dans le premier dès la fin de la mutation.

## Conclusion

FastAPI et Strawberry se répartissent les rôles : le premier reçoit les requêtes HTTP et WebSocket, le second traduit des classes Python annotées en schéma GraphQL et exécute les opérations. Les trois opérations du langage s'y expriment par trois classes (`Query`, `Mutation`, `Subscription`) passées à `strawberry.Schema`, et une seule route `/graphql` les expose toutes. L'exemple conserve les données en mémoire ; une application réelle y substitue une base de données et ajoute l'authentification au niveau de FastAPI.
