---
title: "Docker : bonnes pratiques"
description: "Bonnes pratiques Dockerfile pour des images légères, reproductibles et sécurisées : images de base, multi-stage builds, cache des couches, utilisateur non-root."
tags: [containerization, devops]
---

Une image Docker mal construite peut peser plusieurs gigaoctets, exposer des secrets dans ses couches, ou s'exécuter en root sans raison valable. Ces problèmes sont évitables avec quelques principes de construction appliqués systématiquement.

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

La règle : copier d'abord ce qui change rarement (fichiers de dépendances), puis ce qui change souvent (code source).

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
FROM alpine:3.19
RUN apk add --no-cache ca-certificates
COPY --from=builder /app/server /server
CMD ["/server"]
```

L'image finale contient uniquement le binaire compilé et les certificats CA — pas le compilateur Go, pas les sources, pas le cache du module. Une image Go complète pèse ~1 Go ; l'image finale avec ce pattern pèse ~15 Mo.

## Exécuter en utilisateur non-root

Par défaut, les processus dans un conteneur s'exécutent en `root` (UID 0). Une faille dans l'application donne alors un accès root au conteneur, ce qui peut faciliter une escalade de privilèges vers l'hôte.

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .

# Créer un utilisateur dédié
RUN addgroup --system app && adduser --system --ingroup app app

# Changer de propriétaire avant de changer d'utilisateur
RUN chown -R app:app /app
USER app

CMD ["python", "main.py"]
```

## Ne pas stocker de secrets dans l'image

Chaque instruction `RUN`, `COPY`, ou `ENV` crée une couche. Une clé API copiée puis supprimée dans une instruction suivante reste visible dans les couches intermédiaires de l'image.

```dockerfile
# À éviter : le secret reste dans les couches même si supprimé ensuite
RUN echo "API_KEY=secret" > /app/.env    # couche 1
RUN rm /app/.env                          # couche 2 — secret toujours visible dans couche 1

# Correct : passer les secrets via BuildKit (ne persistent pas dans l'image)
RUN --mount=type=secret,id=api_key \
    API_KEY=$(cat /run/secrets/api_key) ./configure.sh
```

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

```
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
