---
title: "Python : FastAPI — CRUD et authentification"
description: "Bonnes pratiques pour structurer des endpoints CRUD avec FastAPI, et comment protéger une API avec un token Bearer statique ou des tokens JWT avec gestion des rôles."
tags: [scripting, devops]
---

Une API REST expose des ressources que des clients peuvent créer, lire, modifier et supprimer. La structuration de ces opérations — les codes HTTP à retourner, la forme des corps de requête et de réponse, la gestion des erreurs — détermine la qualité et la prévisibilité de l'interface. FastAPI fournit les outils pour formaliser cette structure, et son système de dépendances permet d'y adjoindre une couche d'authentification de manière composable.

Cet article suppose une connaissance de base de FastAPI. Pour une introduction au framework, voir [l'article précédent sur FastAPI](/blog/2024/12/20/09-scripting/fastapi).

<!--truncate-->

## Structurer un CRUD complet

### Les verbes HTTP et leurs codes de retour

Chaque opération CRUD correspond à une convention HTTP précise. Le respect de ces conventions permet à n'importe quel client — navigateur, CLI, autre service — d'interpréter les réponses sans documentation supplémentaire.

La création utilise `POST` et retourne `201 Created`. La lecture utilise `GET` et retourne `200 OK`. La modification utilise `PUT` (remplacement complet) ou `PATCH` (modification partielle) et retourne `200 OK`. La suppression utilise `DELETE` et retourne `204 No Content`, sans corps de réponse. Lorsqu'une ressource n'est pas trouvée, la convention est de retourner `404 Not Found`, et non `200` avec un corps vide.

FastAPI permet de déclarer le code de retour attendu directement sur le décorateur :

```python
@router.post("", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    ...

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: str, db: Session = Depends(get_db)):
    ...
```

Cette déclaration sert à la fois de documentation dans Swagger UI et de validation : FastAPI lèvera une erreur si le handler retourne un code différent.

### Séparer les schémas d'entrée et de sortie

Une erreur courante est d'utiliser le même schéma Pydantic pour la création, la mise à jour et la réponse. Ces trois opérations ont des besoins différents. À la création, certains champs sont obligatoires et d'autres ont des valeurs par défaut. À la mise à jour partielle, tous les champs sont optionnels. En réponse, des champs générés par le serveur — identifiant, dates — doivent apparaître.

```python
class TaskCreate(BaseModel):
    title: str
    column_id: str
    description: str | None = None

class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    priority: str | None = None

class TaskResponse(BaseModel):
    id: str
    title: str
    column_id: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
```

`from_attributes=True` dans la configuration permet à Pydantic de construire la réponse directement depuis un objet SQLAlchemy, sans conversion intermédiaire.

### Gérer les ressources inexistantes

Retourner une erreur explicite lorsqu'une ressource n'existe pas est une responsabilité du handler. FastAPI fournit `HTTPException` à cet effet :

```python
@router.get("/{task_id}", response_model=TaskResponse)
def get_task(task_id: str, db: Session = Depends(get_db)):
    task = db.get(Task, task_id)
    if task is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task
```

`HTTPException` interrompt immédiatement le handler et retourne la réponse d'erreur. Le client reçoit un corps JSON standardisé `{"detail": "Task not found"}`.

### Organiser les routes avec des routers

Regrouper toutes les routes dans un seul fichier rend le code difficile à maintenir. FastAPI propose `APIRouter` pour isoler chaque ressource dans son propre module, puis les assembler dans l'application principale :

```python
# endpoints/tasks.py
router = APIRouter(prefix="/tasks", tags=["tasks"])

# main.py
app.include_router(tasks_router, prefix="/api/v1")
```

Le préfixe est cumulatif : les routes définies dans le router sont accessibles sous `/api/v1/tasks`. Le champ `tags` regroupe les endpoints dans la documentation Swagger.

## Authentification par token statique

### Le système de dépendances de FastAPI

FastAPI résout l'authentification via son mécanisme de dépendances (`Depends`). Une dépendance est une fonction Python ordinaire que FastAPI exécute avant le handler. Si la dépendance lève une exception, le handler n'est pas appelé. Ce mécanisme permet d'injecter la vérification d'authentification sans modifier le corps des handlers.

La dépendance reçoit les credentials extraits de la requête, les vérifie, et retourne une valeur utile — l'identité de l'appelant — ou lève une `HTTPException` :

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

def require_auth(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    expected = getenv("API_SECRET_TOKEN")
    if credentials.credentials != expected:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return credentials.credentials
```

`HTTPBearer` est un schéma de sécurité fourni par FastAPI. Il extrait automatiquement le token du header `Authorization: Bearer <token>` et retourne les credentials sous forme structurée. Si le header est absent ou malformé, FastAPI retourne `403 Forbidden` avant même d'appeler `require_auth`.

L'en-tête `WWW-Authenticate: Bearer` dans la réponse 401 est une convention HTTP : il indique au client le schéma d'authentification attendu.

### Appliquer la dépendance sur les routes protégées

La dépendance s'ajoute comme paramètre du handler. La convention `_: str` signale que la valeur retournée par la dépendance n'est pas utilisée dans le corps du handler — seul l'effet de bord (la vérification) est nécessaire :

```python
@router.post("", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    _: str = Depends(require_auth),
):
    ...

@router.get("", response_model=list[TaskResponse])
def list_tasks(db: Session = Depends(get_db)):
    # Pas de require_auth : lecture publique
    ...
```

La même dépendance peut être appliquée à un router entier via `dependencies` pour protéger toutes ses routes d'un seul coup :

```python
router = APIRouter(prefix="/admin", dependencies=[Depends(require_auth)])
```

### Bearer statique : limites

L'approche avec un token statique comparé à une variable d'environnement est simple à mettre en place. Elle convient aux communications service-à-service dans un environnement contrôlé, où l'appelant est un service tiers connu et le secret est partagé en dehors du flux HTTP. Elle présente cependant des limites structurelles : il n'existe qu'un seul secret valide, il est impossible de distinguer plusieurs appelants, et la révocation implique de changer la variable d'environnement et de redéployer.

Dès qu'une application doit gérer plusieurs utilisateurs avec des identités distinctes, des rôles différents, ou une expiration des accès, un mécanisme basé sur JWT devient nécessaire.

## Authentification par JWT

### Ce qu'est un JWT

Un JSON Web Token est un token autonome qui encode une charge utile JSON — typiquement l'identifiant de l'utilisateur, son rôle, et une date d'expiration — et la signe cryptographiquement avec un secret côté serveur. Le serveur vérifie la signature à chaque requête sans consulter la base de données. Si le token a été altéré, la vérification échoue.

Un JWT est composé de trois parties séparées par des points : l'algorithme de signature (`header`), la charge utile (`payload`) et la signature. La charge utile est encodée en Base64 et lisible par n'importe qui — elle ne doit donc contenir aucune donnée sensible.

### Hacher les mots de passe

Stocker des mots de passe en clair est une faute de sécurité fondamentale. Un mot de passe doit être haché avec un algorithme conçu pour être lent (bcrypt, argon2) avant d'être stocké, de sorte qu'une fuite de base de données ne compromette pas les comptes. La bibliothèque `passlib` expose ces algorithmes de manière unifiée :

```python
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)
```

`verify_password` compare le mot de passe fourni à la valeur hachée stockée en base. L'opération est à sens unique : il est impossible de retrouver le mot de passe original depuis le hash.

### Générer et vérifier un JWT

La bibliothèque `PyJWT` implémente la création et la vérification des tokens JWT :

```python
from datetime import datetime, timedelta
import jwt

SECRET_KEY = getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(subject: str, role: str) -> str:
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"sub": subject, "role": role, "exp": expire}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expiré",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token invalide",
            headers={"WWW-Authenticate": "Bearer"},
        )
```

`sub` (subject) est le champ standard JWT pour l'identifiant de l'utilisateur. `exp` déclenche automatiquement une `ExpiredSignatureError` lors du décodage si le token est expiré. PyJWT >= 2.0 retourne directement une chaîne depuis `encode()`, sans encodage bytes intermédiaire.

### Endpoint de login

L'utilisateur échange ses credentials contre un token via un endpoint dédié. FastAPI fournit `OAuth2PasswordRequestForm` pour recevoir le formulaire standard `username` / `password` :

```python
from fastapi.security import OAuth2PasswordRequestForm

@router.post("/auth/login")
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.execute(select(User).where(User.email == form.username)).scalar_one_or_none()
    if not user or not verify_password(form.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Identifiants incorrects")
    token = create_access_token(subject=user.id, role=user.role)
    return {"access_token": token, "token_type": "bearer"}
```

L'endpoint retourne le token. Le client le stocke et l'inclut dans le header `Authorization: Bearer <token>` pour toutes les requêtes suivantes.

### Dépendances d'authentification et de rôle

La dépendance qui extrait l'utilisateur courant depuis le token devient la brique de base de toute la couche d'autorisation :

```python
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    payload = decode_token(token)
    user = db.get(User, payload["sub"])
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Utilisateur introuvable")
    return user

def require_admin(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Droits insuffisants")
    return current_user
```

`get_current_user` retourne l'objet utilisateur complet, disponible dans le handler. `require_admin` compose par-dessus `get_current_user` : si l'utilisateur est authentifié mais n'est pas admin, FastAPI retourne `403 Forbidden`.

La distinction entre `401 Unauthorized` et `403 Forbidden` est sémantique : 401 signifie que l'identité n'est pas établie (token absent ou invalide), 403 signifie que l'identité est connue mais les droits sont insuffisants.

Ces dépendances s'utilisent directement dans les handlers :

```python
@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: str, db: Session = Depends(get_db), _: User = Depends(require_admin)):
    ...

@router.put("/{user_id}", response_model=UserResponse)
def update_user(user_id: str, data: UserUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # current_user est disponible pour vérifier que l'utilisateur ne modifie que son propre profil
    ...
```

## Ce que FastAPI expose automatiquement

Déclarer les schémas, les codes de retour et les dépendances de sécurité sur les routes permet à FastAPI de générer une documentation Swagger UI complète et précise. Chaque endpoint y est documenté avec ses paramètres, ses codes de réponse possibles, et le schéma de sécurité requis — y compris le formulaire de login OAuth2 et le champ Bearer. La documentation reste ainsi synchronisée avec le code sans effort supplémentaire.
