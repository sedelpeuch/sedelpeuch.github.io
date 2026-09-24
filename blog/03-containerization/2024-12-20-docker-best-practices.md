---
title: "Docker : bonnes pratiques"
description: "Bonnes pratiques Dockerfile pour des images légères, reproductibles et sécurisées : images de base, multi-stage builds, cache des couches, utilisateur non-root."
tags: [containerization, devops]
authors: sedelpeuch
---

Une image Docker mal construite peut peser plusieurs gigaoctets, exposer des secrets dans ses couches, ou s'exécuter en root sans raison valable. Ces problèmes découlent directement du fonctionnement des couches et du cache de build, décrits dans l'article [Docker : conteneurs et images](./2024-12-20-docker-containers.md), et s'évitent avec quelques principes de construction appliqués systématiquement.

<!--truncate-->

## Choisir la bonne image de base

Les images officielles proposent plusieurs variantes. La taille impacte le temps de pull, l'espace disque, et surtout la surface d'attaque.

```dockerfile
# À éviter : image complète avec des centaines de paquets inutiles
FROM python:3.12

# Préférer : Slim (Debian sans paquets non-essentiels) — bon compromis compatibilité/taille
FROM python:3.12-slim

# Ou : Alpine (musl libc) — minimal, mais parfois incompatible avec des libs C
FROM python:3.12-alpine
```

| Base | Taille (~) | Compatibilité | Usage typique |
|------|-----------|---------------|---------------|
| `python:3.12` | ~1 Go | Maximale | Débogage, dev |
| `python:3.12-slim` | ~130 Mo | Bonne | Production |
| `python:3.12-alpine` | ~50 Mo | Limitée (musl) | Production si compatible |

L'incompatibilité d'Alpine tient à sa bibliothèque C : les wheels binaires `manylinux` publiés sur PyPI sont liés à la glibc et ne s'installent pas sur musl. Faute de wheel `musllinux`, pip compile le paquet depuis les sources, ce qui exige un compilateur dans l'image et allonge le build. Pour les binaires statiques (Go, Rust), les images `distroless` ou `scratch` vont plus loin qu'Alpine : ni shell ni gestionnaire de paquets.

Une étiquette comme `python:3.12-slim` est mobile : elle pointe vers une nouvelle image à chaque correctif publié. Épingler le digest (`FROM python:3.12-slim@sha256:...`) garantit que deux builds utilisent exactement la même base ; un outil comme Renovate ou Dependabot met ensuite ce digest à jour de façon contrôlée.

## Ordonner les instructions pour maximiser le cache

Docker invalide le cache à partir de la première couche modifiée. Les fichiers qui changent souvent doivent être copiés le plus tard possible.

```dockerfile
# Mauvais ordre : le cache des dépendances est invalidé à chaque changement de code
FROM python:3.12-slim
COPY . /app
RUN pip install -r /app/requirements.txt

# Bon ordre : requirements.txt change rarement, le cache est réutilisé
FROM python:3.12-slim
COPY requirements.txt /app/
RUN pip install -r /app/requirements.txt
COPY . /app
```

La règle : copier d'abord ce qui change rarement (fichiers de dépendances), puis ce qui change souvent (code source). Pour une instruction `COPY`, la clé de cache est calculée à partir du contenu des fichiers copiés (et non de leur date de modification) ; pour `RUN`, à partir du texte de la commande. Un `RUN apt-get update` n'est donc jamais réexécuté tant que sa ligne ne change pas, même si les dépôts ont évolué.

BuildKit ajoute les montages de cache, qui conservent un répertoire entre deux builds sans l'intégrer à l'image :

```dockerfile
# syntax=docker/dockerfile:1
FROM python:3.12-slim
COPY requirements.txt /app/
# Le cache pip est réutilisé d'un build à l'autre, même si la couche est reconstruite
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install -r /app/requirements.txt
```

## Multi-stage build

Le multi-stage build sépare l'environnement de compilation de l'environnement d'exécution. L'image finale ne contient que le strict nécessaire pour faire tourner l'application.

```dockerfile
# Stage 1 : compilation
FROM golang:1.22 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o /app/server .

# Stage 2 : image finale
FROM alpine:3.20
RUN apk add --no-cache ca-certificates
COPY --from=builder /app/server /server
CMD ["/server"]
```

L'image finale contient uniquement le binaire compilé et les certificats CA — pas le compilateur Go, pas les sources, pas le cache du module. Une image Go complète pèse ~1 Go ; l'image finale avec ce pattern pèse ~15 Mo. `CGO_ENABLED=0` produit un binaire statique, indépendant de la glibc de l'étage de compilation : sans cette option, le binaire lié dynamiquement échouerait au démarrage sur Alpine (musl).

## Exécuter en utilisateur non-root

Par défaut, les processus dans un conteneur s'exécutent en `root` (UID 0). Une faille dans l'application donne alors un accès root au conteneur, ce qui peut faciliter une escalade de privilèges vers l'hôte.

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

# Créer un utilisateur dédié
RUN addgroup --system app && adduser --system --ingroup app app

# Copier le code directement avec le bon propriétaire
COPY --chown=app:app . .
USER app

CMD ["python", "main.py"]
```

Un `RUN chown -R app:app /app` après la copie aboutirait au même résultat fonctionnel, mais en dupliquant tous les fichiers concernés dans une nouvelle couche (mécanisme de *copy-up*) : la taille de l'image doublerait pour ces fichiers. L'option `--chown` de `COPY` fixe le propriétaire dès l'écriture de la couche. L'utilisateur non-root se vérifie à l'exécution avec `docker run --rm image id`, et Kubernetes peut l'imposer via `securityContext.runAsNonRoot: true`.

## Ne pas stocker de secrets dans l'image

Chaque instruction `RUN` ou `COPY` crée une couche, et `ENV` ou `ARG` sont enregistrés dans la configuration de l'image (visibles avec `docker history` et `docker inspect`). Une clé API copiée puis supprimée dans une instruction suivante reste lisible dans la couche intermédiaire, qu'il suffit d'extraire de l'archive de l'image (`docker save`).

```dockerfile
# À éviter : le secret reste dans les couches même si supprimé ensuite
RUN echo "API_KEY=secret" > /app/.env    # couche 1
RUN rm /app/.env                          # couche 2 — secret toujours visible dans couche 1

# Correct : passer les secrets via BuildKit (ne persistent pas dans l'image)
RUN --mount=type=secret,id=api_key \
    API_KEY=$(cat /run/secrets/api_key) ./configure.sh
```

```bash
# Le secret est fourni au build depuis un fichier local (ou une variable d'environnement avec env=)
docker build --secret id=api_key,src=./api_key.txt -t myapp .
```

Le fichier est monté en tmpfs dans `/run/secrets/api_key` uniquement pendant l'exécution de ce `RUN` : il n'apparaît ni dans les couches, ni dans l'historique, ni dans le cache de build.

Les secrets applicatifs (mots de passe DB, tokens) ne doivent jamais être embarqués dans l'image — ils doivent être injectés à l'exécution via des variables d'environnement ou un gestionnaire de secrets (Vault, AWS Secrets Manager, Kubernetes Secrets).

## Épingler les versions des paquets

Les instructions `RUN pip install` ou `RUN apt-get install` sans version fixe installent la dernière version disponible au moment du build. Deux builds à des dates différentes peuvent produire des images différentes.

```dockerfile
# Non reproductible
RUN pip install fastapi uvicorn

# Reproductible
RUN pip install fastapi==0.111.0 uvicorn==0.29.0

# Encore mieux : un lockfile généré par l'outil
COPY requirements.lock .
RUN pip install -r requirements.lock
```

Pour Python, `pip-compile` (pip-tools) ou `poetry.lock` / `uv.lock` génèrent des lockfiles. Ces fichiers doivent être commités dans le dépôt.

## Limiter les paquets installés

Chaque paquet installé ajoute de la surface d'attaque. `apt-get` installe les paquets recommandés par défaut — `--no-install-recommends` réduit le nombre de paquets réellement installés.

```dockerfile
RUN apt-get update && apt-get install -y \
    --no-install-recommends \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*
```

`rm -rf /var/lib/apt/lists/*` supprime le cache apt dans la même instruction que l'installation — sinon le cache reste dans la couche et continue d'occuper de l'espace dans l'image finale.

## Utiliser .dockerignore

Un `.dockerignore` à la racine du projet liste les fichiers et répertoires à exclure du contexte de build. Sans ce fichier, `COPY . /app` transfère tout le projet au daemon Docker — y compris `node_modules`, `.git`, les fichiers de log, les caches.

```text
.git
node_modules
__pycache__
*.pyc
.env
*.log
dist/
build/
```

Réduire le contexte de build accélère le build et évite d'embarquer des fichiers sensibles (`.env`, clés) dans l'image.
