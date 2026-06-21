---
title: "Python : SQLAlchemy"
description: "SQLAlchemy est le toolkit SQL de référence en Python. Cet article explique pourquoi cet ORM existe, les problèmes qu'il résout et comment il structure l'accès à une base de données relationnelle."
tags: [scripting, devops]
---

Écrire du SQL dans une application Python pose un problème récurrent : le code SQL est du texte, alors que les données manipulées sont des objets. À chaque lecture, il faut convertir une ligne de résultat en dictionnaire ou en objet. À chaque écriture, il faut construire une chaîne SQL en s'assurant de ne pas introduire d'injection. SQLAlchemy résout ce problème en faisant correspondre des classes Python à des tables de base de données, et des instances de ces classes à des lignes.

<!--truncate-->

## Ce que SQLAlchemy apporte réellement

L'idée centrale de SQLAlchemy est de permettre au développeur de raisonner en termes d'objets Python plutôt qu'en termes de lignes et de colonnes. Une table `users` devient une classe `User`. Une ligne devient une instance. Modifier un attribut de l'instance — `user.email = "nouveau@example.com"` — et valider la transaction suffit à générer et exécuter l'`UPDATE` correspondant.

Cela résout plusieurs problèmes concrets. La construction manuelle de requêtes SQL est source d'erreurs et d'injections. La conversion des résultats en objets est répétitive. La gestion des transactions — savoir quand ouvrir, valider ou annuler — est difficile à centraliser proprement. SQLAlchemy prend en charge ces trois aspects.

SQLAlchemy est organisé en deux couches. La couche basse, appelée Core, permet de construire et d'exécuter du SQL de manière programmatique sans quitter Python. La couche haute, l'ORM, ajoute le mapping entre classes et tables. La majorité des applications n'utilisent que l'ORM, qui repose sur Core en interne.

## Déclarer le schéma en Python

Avec SQLAlchemy, le schéma de la base de données est décrit directement dans le code Python. Cette description sert à la fois de documentation, de source de vérité pour les migrations, et de contrat entre le code applicatif et la base.

La déclaration commence par une classe de base commune à tous les modèles :

```python
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass
```

Chaque modèle hérite ensuite de cette base et décrit ses colonnes via des annotations de type combinées à `mapped_column()` :

```python
from sqlalchemy import String, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(255))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
```

L'annotation `Mapped[str]` exprime le type Python de l'attribut. SQLAlchemy en déduit automatiquement la nullabilité : `Mapped[str]` produit une colonne `NOT NULL`, `Mapped[str | None]` produit une colonne nullable. Cette approche rend la déclaration lisible et cohérente avec le reste du typage Python.

## Les relations entre tables

La principale difficulté des bases relationnelles est de naviguer entre les tables liées. Sans ORM, une requête qui implique deux tables nécessite soit une jointure SQL explicite, soit deux requêtes séparées avec une correspondance manuelle des résultats. SQLAlchemy gère cette navigation automatiquement via les relations.

Une clé étrangère se déclare avec `ForeignKey` sur la colonne, et la navigation objet avec `relationship` :

```python
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    column_id: Mapped[str] = mapped_column(String(36), ForeignKey("columns.id"))
    assignee_id: Mapped[str | None] = mapped_column(String(36), ForeignKey("users.id"), nullable=True)

    column: Mapped["Column"] = relationship("Column", back_populates="tasks")
    assignee: Mapped["User | None"] = relationship("User", foreign_keys=[assignee_id])
```

Une fois cette déclaration en place, accéder à `task.column` retourne directement l'objet `Column` associé, sans que le développeur ait à écrire de requête de jointure. `back_populates` maintient la cohérence dans les deux sens : `column.tasks` retourne la liste de toutes les tâches de cette colonne.

Ce chargement est dit *lazy* par défaut : la requête SQL n'est envoyée que lorsque l'attribut est accédé. Ce comportement peut être ajusté selon les besoins de performance.

## L'engine et la gestion des connexions

SQLAlchemy sépare clairement la configuration de la connexion de son utilisation. L'engine est l'objet central qui connaît l'URL de la base, gère un pool de connexions, et sert de point d'entrée à toutes les opérations :

```python
from sqlalchemy import create_engine

engine = create_engine(
    "postgresql://postgres:password@localhost/mydb",
    pool_size=10,
    max_overflow=20,
)
```

L'engine ne se connecte pas immédiatement à sa création. Il maintient un pool de connexions réutilisables, ce qui évite d'en ouvrir une nouvelle à chaque requête — opération coûteuse en réseau et en ressources.

## Les sessions comme unité de travail

La session est le mécanisme central de l'ORM. Elle représente une unité de travail : toutes les opérations effectuées dans une session sont accumulées en mémoire, puis envoyées à la base en une seule transaction lors du `commit`. Si une erreur survient, un `rollback` annule l'ensemble.

```python
from sqlalchemy.orm import sessionmaker

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
```

En pratique, dans une application web comme FastAPI, chaque requête HTTP reçoit sa propre session, ouverte en début de traitement et fermée à la fin — qu'il y ait eu une erreur ou non :

```python
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

Ce pattern garantit qu'une connexion n'est jamais laissée ouverte accidentellement, même en cas d'exception dans le handler.

## Le suivi automatique des modifications

L'un des apports les plus discrets mais les plus utiles de l'ORM est le *dirty tracking*. SQLAlchemy observe les objets chargés dans une session. Lorsqu'un attribut est modifié, l'ORM le détecte automatiquement et génère un `UPDATE` minimal lors du `commit`, portant uniquement sur les colonnes effectivement modifiées.

Cela signifie que le développeur n'a pas à construire de requête `UPDATE` : il modifie l'objet comme n'importe quelle variable Python, et SQLAlchemy s'occupe de la synchronisation avec la base.

## Créer les tables

À partir des déclarations de modèles, SQLAlchemy peut créer automatiquement toutes les tables en base :

```python
Base.metadata.create_all(bind=engine)
```

Cette instruction inspecte tous les modèles enregistrés sur `Base` et émet les `CREATE TABLE IF NOT EXISTS` correspondants. Cette approche convient au développement et aux tests. En production, l'évolution du schéma sur une base existante — ajouter une colonne, modifier un index, renommer une table — nécessite des migrations contrôlées, ce qu'Alembic apporte au-dessus de SQLAlchemy.

## Quand utiliser le SQL brut

SQLAlchemy ne cherche pas à remplacer SQL dans tous les cas. Certaines opérations — des requêtes analytiques complexes, des instructions DDL spécifiques à un moteur, ou des opérations en masse optimisées — s'expriment plus clairement et plus efficacement en SQL direct. SQLAlchemy expose `text()` pour exécuter du SQL littéral tout en restant dans le contexte de l'engine et des sessions :

```python
from sqlalchemy import text

with engine.connect() as conn:
    conn.execute(text("ALTER TABLE columns ADD COLUMN IF NOT EXISTS color VARCHAR(20)"))
    conn.commit()
```

L'ORM est un outil, pas une obligation. La capacité de mélanger ORM et SQL brut selon le contexte est précisément ce qui rend SQLAlchemy adapté aux applications réelles.
