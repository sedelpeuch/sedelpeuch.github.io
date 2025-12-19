---
title: "Python : async/await"
description: "Maîtrisez la programmation asynchrone en Python pour créer des applications performantes et réactives."
tags: [Python, Async, Asyncio, Performance, FastAPI, DevOps]
---

La programmation asynchrone est devenue essentielle pour créer des applications Python performantes, notamment pour les APIs, les web scrapers, ou les applications traitant de nombreuses opérations I/O. Dans cet article, nous explorerons en profondeur `async`/`await` et `asyncio`, avec des cas d'usage pratiques notamment avec FastAPI. 🚀

<!--truncate-->

## Comprendre la programmation asynchrone 🤔

### Le problème : l'attente inutile

Dans un programme synchrone classique, chaque opération attend la fin de la précédente, même si elle ne fait rien d'utile pendant ce temps. C'est comme faire la queue au supermarché : si la caissière attend que le client précédent range ses courses dans son sac, tout le monde attend inutilement.

**Exemple concret :** Imaginez une application qui doit récupérer des données depuis 3 APIs différentes. En mode synchrone, le programme attend la réponse de l'API 1 (2 secondes), puis attend l'API 2 (2 secondes), puis l'API 3 (2 secondes) = **6 secondes au total**.

### La solution : l'asynchrone

La programmation asynchrone permet de ne pas rester bloqué pendant les opérations d'attente (I/O). Pendant qu'une requête HTTP est en cours, le programme peut lancer d'autres requêtes ou effectuer d'autres tâches.

**Avec l'asynchrone :** Les 3 requêtes sont lancées simultanément, et le programme attend seulement le temps de la plus longue = **2 secondes au total**.

```python
import asyncio

async def faire_requete(url):
    await asyncio.sleep(2)  # Simule une requête HTTP
    return f"Données de {url}"

async def main():
    # Les 3 requêtes s'exécutent en parallèle
    resultats = await asyncio.gather(
        faire_requete("api.example.com/1"),
        faire_requete("api.example.com/2"),
        faire_requete("api.example.com/3")
    )
    return resultats

asyncio.run(main())
```

### Quand utiliser l'asynchrone ?

L'asynchrone est efficace uniquement pour les opérations **I/O-bound** (limitées par les entrées/sorties), pas pour les calculs **CPU-bound**.

✅ **Bon pour (I/O-bound) :**
- Requêtes HTTP/API : attente réseau
- Opérations de base de données : attente disque/réseau
- Lecture/écriture de fichiers : attente disque
- WebSockets : attente de messages

❌ **Pas adapté pour (CPU-bound) :**
- Calculs mathématiques complexes
- Traitement d'images/vidéos
- Compression de données
- Pour ces cas, utiliser `multiprocessing` ou `threading`

## Les bases d'async/await 📚

### Les coroutines : des fonctions "pausables"

Une **coroutine** est une fonction spéciale qui peut être suspendue et reprise. Elle se déclare avec `async def` au lieu de `def`.

**Concept clé :** Une coroutine ne s'exécute pas immédiatement quand on l'appelle. Elle retourne un objet "coroutine" qui doit être `await`é pour s'exécuter réellement.

```python
async def fonction_async():
    return "Hello"

# ❌ Ceci ne fait RIEN, retourne juste un objet coroutine
resultat = fonction_async()

# ✅ Pour exécuter, il faut await dans un contexte async
async def main():
    resultat = await fonction_async()  # Maintenant ça s'exécute
    print(resultat)

asyncio.run(main())  # Point d'entrée pour démarrer l'async
```

### Le mot-clé `await` : point de suspension

`await` signifie "attends que cette opération se termine, mais pendant ce temps, laisse d'autres tâches s'exécuter".

**Analogie :** C'est comme dire "je mets cette tâche en pause, fais autre chose en attendant, et reviens me voir quand c'est prêt".

```python
async def operation_longue():
    print("Début")
    await asyncio.sleep(2)  # "Pause ici pendant 2s, fais autre chose"
    print("Fin")
    return "Terminé"
```

### Exécuter plusieurs coroutines en parallèle

**Le problème :** Comment lancer plusieurs tâches asynchrones en même temps ?

**Solution 1 : `asyncio.gather()`** - Lance tout en parallèle et attend tous les résultats

```python
async def tache(nom, duree):
    await asyncio.sleep(duree)
    return f"{nom} terminée"

async def main():
    # Les 3 tâches démarrent en même temps
    resultats = await asyncio.gather(
        tache("Tâche 1", 2),
        tache("Tâche 2", 1),
        tache("Tâche 3", 3)
    )
    # Attend que TOUTES soient finies
    print(resultats)  # ['Tâche 1 terminée', 'Tâche 2 terminée', 'Tâche 3 terminée']
```

**Solution 2 : `asyncio.create_task()`** - Plus de contrôle individuel

```python
async def main():
    # Démarre la tâche immédiatement en arrière-plan
    task = asyncio.create_task(tache("A", 1))

    # Fait autre chose...
    print("La tâche tourne en arrière-plan")

    # Attend le résultat quand nécessaire
    resultat = await task
```

## asyncio : fonctionnalités essentielles 🛠️

### L'Event Loop : le chef d'orchestre

L'**event loop** (boucle d'événements) est le moteur qui gère l'exécution de toutes les coroutines. C'est lui qui décide quelle tâche exécuter et quand.

**Analogie :** C'est comme un chef d'orchestre qui coordonne tous les musiciens (coroutines). Quand un musicien doit faire une pause (await), le chef donne la parole à un autre.

```python
async def hello():
    await asyncio.sleep(1)
    print("World")

# asyncio.run() crée l'event loop, exécute la coroutine, puis nettoie
asyncio.run(hello())
```

**Point important :** `asyncio.run()` est le point d'entrée principal. C'est lui qui démarre l'event loop et permet à tout le système asynchrone de fonctionner.

### Gestion des erreurs : ne pas tout casser

**Le problème :** Si une tâche échoue avec `gather()`, par défaut toutes les autres sont annulées.

**La solution :** `return_exceptions=True` capture les erreurs comme des résultats normaux.

```python
# Sans return_exceptions : si operation_risquee(2) échoue, tout s'arrête
resultats = await asyncio.gather(
    operation_risquee(1),  # Réussit
    operation_risquee(2),  # Échoue
    operation_risquee(3),  # Ne s'exécute jamais
)

# Avec return_exceptions : toutes s'exécutent, les erreurs sont dans les résultats
resultats = await asyncio.gather(
    operation_risquee(1),
    operation_risquee(2),
    operation_risquee(3),
    return_exceptions=True  # Les exceptions sont retournées comme résultats
)
# resultats = ["Succès 1", Exception(...), "Succès 3"]
```

### Timeouts : limiter le temps d'attente

**Utilité :** Éviter d'attendre indéfiniment une opération qui ne répond plus.

```python
try:
    # Attend maximum 3 secondes
    resultat = await asyncio.wait_for(operation_longue(), timeout=3.0)
except asyncio.TimeoutError:
    print("L'opération a pris trop de temps !")
```

## Requêtes HTTP asynchrones 🌐

### Le cas d'usage parfait pour l'asynchrone

Les requêtes HTTP sont le meilleur exemple d'opération I/O-bound : le programme passe la majorité du temps à attendre la réponse du serveur, sans rien faire.

**Avantage de l'async :** Pendant qu'une requête attend la réponse, on peut en lancer d'autres. Résultat : 10 requêtes prennent le temps d'une seule !

### Avec httpx : le client HTTP asynchrone

`httpx` est l'équivalent moderne et asynchrone de `requests`.

```python
import httpx
import asyncio

async def fetch_users(usernames: list[str]) -> list[dict]:
    # AsyncClient gère les connexions de manière asynchrone
    async with httpx.AsyncClient() as client:
        # Crée une liste de coroutines (pas encore exécutées)
        tasks = [
            client.get(f"https://api.github.com/users/{username}")
            for username in usernames
        ]
        # Lance toutes les requêtes en parallèle
        responses = await asyncio.gather(*tasks)
        return [response.json() for response in responses]

# 10 utilisateurs récupérés en parallèle = temps d'une seule requête
users = await fetch_users(["python", "microsoft", "google", "facebook", "apple"])
```

**Gain de performance :** Sans async, 10 requêtes de 200ms = 2 secondes. Avec async = 200ms !

## Intégration avec FastAPI 🚀

### Pourquoi FastAPI et async sont faits l'un pour l'autre

FastAPI est conçu dès le départ pour l'asynchrone. Une API web est l'exemple parfait d'application I/O-bound : la plupart du temps est passé à attendre des bases de données, des APIs externes, ou des fichiers.

**Avantage :** Avec async, un serveur FastAPI peut gérer des milliers de requêtes simultanées sans créer de threads, simplement en utilisant l'event loop.

### Routes asynchrones

Déclarer une route avec `async def` permet à FastAPI de gérer plusieurs requêtes en parallèle sans blocage.

```python
from fastapi import FastAPI
import httpx

app = FastAPI()

@app.get("/users/{username}")
async def get_user(username: str):
    # Pendant que cette requête attend la réponse de GitHub,
    # FastAPI peut traiter d'autres requêtes entrantes
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://api.github.com/users/{username}")
        return response.json()
```

**Sans async :** Chaque requête bloque le serveur pendant l'appel à GitHub (100-200ms). Avec async : des centaines de requêtes peuvent attendre en parallèle.

### Base de données asynchrone avec SQLAlchemy

Les requêtes SQL sont des opérations I/O qui bénéficient énormément de l'async.

```python
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy import select

# asyncpg est le driver PostgreSQL asynchrone
engine = create_async_engine("postgresql+asyncpg://user:pass@localhost/db")

@app.get("/users")
async def get_users(db: AsyncSession = Depends(get_db)):
    # Requête SQL non-bloquante
    result = await db.execute(select(User))
    return result.scalars().all()
```

**Gain :** Pendant qu'une requête SQL s'exécute sur la DB, FastAPI peut traiter d'autres endpoints.

### Cache Redis asynchrone

Redis est souvent utilisé comme cache pour accélérer les réponses. L'async permet de ne pas bloquer pendant les accès Redis.

```python
import aioredis

@app.get("/users/{user_id}")
async def get_user_cached(user_id: int):
    # Vérifie le cache (opération réseau)
    cached = await redis.get(f"user:{user_id}")
    if cached:
        return json.loads(cached)

    # Récupère depuis la DB si pas en cache
    user = await fetch_user_from_db(user_id)

    # Met en cache pour 1h
    await redis.setex(f"user:{user_id}", 3600, json.dumps(user))
    return user
```

**Architecture typique :** API FastAPI → Cache Redis → Base de données PostgreSQL, le tout en asynchrone bout en bout.

## Patterns avancés 🎯

### Limiter la concurrence avec Semaphore

**Le problème :** Lancer 1000 requêtes HTTP en même temps peut surcharger le serveur ou épuiser les ressources (connexions, mémoire).

**La solution :** Un **Semaphore** limite le nombre d'opérations simultanées. C'est comme un parking avec un nombre limité de places : si toutes les places sont prises, les nouvelles voitures doivent attendre qu'une place se libère.

```python
from asyncio import Semaphore

async def operation(numero: int, semaphore: Semaphore):
    # Attend qu'une "place" soit disponible
    async with semaphore:
        # Maximum 3 opérations ici en même temps
        await asyncio.sleep(2)
        return numero

async def main():
    semaphore = Semaphore(3)  # Maximum 3 opérations simultanées
    # Lance 10 opérations, mais seulement 3 à la fois
    tasks = [operation(i, semaphore) for i in range(10)]
    resultats = await asyncio.gather(*tasks)
```

**Résultat :** 10 opérations s'exécutent par vagues de 3, au lieu de toutes en même temps.

### Retry avec backoff exponentiel

**Le problème :** Une API temporairement indisponible ou un timeout réseau ne doit pas faire échouer toute l'opération.

**La solution :** Réessayer automatiquement avec des délais croissants (1s, 2s, 4s, 8s...).

```python
async def retry_with_backoff(coro, max_retries=3, initial_delay=1.0, backoff_factor=2.0):
    delay = initial_delay
    for attempt in range(max_retries):
        try:
            return await coro()
        except Exception as e:
            if attempt == max_retries - 1:
                raise  # Dernier essai, on abandonne
            await asyncio.sleep(delay)  # Attente avant réessai
            delay *= backoff_factor  # Double le délai : 1s, 2s, 4s...

# Utilisation
resultat = await retry_with_backoff(lambda: fetch_data("api.com"))
```

**Avantage :** Résilience face aux erreurs temporaires sans surcharger le serveur avec des réessais trop fréquents.

### Context Manager asynchrone

**Utilité :** Gérer automatiquement l'ouverture et la fermeture de ressources asynchrones (connexions DB, clients HTTP, fichiers...).

```python
class AsyncResource:
    async def __aenter__(self):
        # Initialisation (ex: ouvrir connexion DB)
        await self.connect()
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        # Nettoyage automatique (ex: fermer connexion)
        await self.disconnect()

# Le nettoyage est garanti, même en cas d'erreur
async with AsyncResource() as resource:
    await resource.operation()
```

## Bonnes pratiques 🐛

### Erreurs courantes à éviter

#### 1. Oublier le `await`

**Erreur fréquente :** Appeler une coroutine sans `await` ne fait rien, elle ne s'exécute pas !

```python
# ❌ Mauvais : la fonction ne s'exécute jamais
result = async_function()  # Retourne un objet coroutine non exécuté
print(result)  # <coroutine object async_function at 0x...>

# ✅ Bon : la fonction s'exécute vraiment
result = await async_function()
print(result)  # Résultat attendu
```

#### 2. Bloquer l'event loop

**Le problème le plus grave :** Utiliser des fonctions bloquantes (`time.sleep`, `requests.get`, opérations CPU lourdes) dans une coroutine paralyse tout le système asynchrone.

```python
# ❌ CATASTROPHIQUE : bloque TOUT pendant 10 secondes
async def bad():
    time.sleep(10)  # Aucune autre coroutine ne peut s'exécuter !
    return "Done"

# ✅ Bon : suspend seulement cette coroutine
async def good():
    await asyncio.sleep(10)  # Les autres coroutines continuent
    return "Done"
```

**Règle d'or :** Dans une fonction `async`, toutes les opérations I/O doivent être async (avec `await`).

#### 3. Négliger la gestion des ressources

**Problème :** Les connexions DB, HTTP clients, fichiers doivent être fermés proprement.

```python
# ❌ Risque de fuite de connexions
async def bad():
    client = httpx.AsyncClient()
    response = await client.get(url)
    # Oubli de fermer le client !

# ✅ Bon : fermeture automatique
async def good():
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        # Client fermé automatiquement, même en cas d'erreur
```

### Mode debug : détecter les problèmes

Le mode debug d'asyncio détecte automatiquement les erreurs courantes (coroutines non awaités, event loop bloqué trop longtemps...).

```python
# Active les warnings détaillés
asyncio.run(main(), debug=True)

# Affiche un warning si une coroutine met plus de 100ms sans yield
```

**Utile pendant le développement** pour repérer les opérations bloquantes accidentelles.

## Conclusion 🎯

La programmation asynchrone en Python avec `async`/`await` et `asyncio` est essentielle pour créer des applications performantes et réactives. Elle brille particulièrement avec FastAPI pour les APIs modernes.

Points clés à retenir :

- **async/await** : syntaxe simple pour la concurrence
- **asyncio** : bibliothèque standard puissante
- **I/O-bound** : parfait pour les opérations réseau/disque
- **FastAPI** : framework idéal pour l'async
- **Patterns** : queue, semaphore, retry, etc.

Ces connaissances permettent de créer des applications Python hautement performantes.

## Ressources utiles 📚

- [Documentation asyncio](https://docs.python.org/3/library/asyncio.html)
- [Real Python - Async IO](https://realpython.com/async-io-python/)
- [FastAPI Async](https://fastapi.tiangolo.com/async/)
- [aiohttp Documentation](https://docs.aiohttp.org/)
