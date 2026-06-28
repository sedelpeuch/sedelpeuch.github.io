---
title: "Kubernetes : composants de base"
description: "Pod, Deployment, StatefulSet, Service — les ressources fondamentales de Kubernetes et quand utiliser chacune."
tags: [orchestration, devops]
---

Kubernetes expose une API déclarative : on décrit l'état souhaité via des ressources YAML, et le cluster converge vers cet état. Quatre ressources couvrent la majorité des besoins : Pod, Deployment, StatefulSet, Service. Comprendre pourquoi chacune existe — et pas seulement comment l'écrire — évite les mauvais choix d'architecture.

<!--truncate-->

## Pod

Un Pod est l'unité atomique de déploiement dans Kubernetes. Il encapsule un ou plusieurs conteneurs qui partagent le même réseau (même IP, même namespace réseau) et les mêmes volumes. Les conteneurs d'un même pod communiquent via `localhost`.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: api
spec:
  containers:
    - name: api
      image: nginx:alpine
      ports:
        - containerPort: 80
```

En pratique, on ne crée presque jamais de Pod directement. Un Pod seul n'est pas recréé s'il crashe ou si son nœud tombe — c'est le rôle des contrôleurs (Deployment, StatefulSet) de maintenir un ensemble de pods en vie.

## Deployment

Un Deployment gère un ensemble de pods identiques et sans état. Il garantit qu'un nombre défini de réplicas tournent en permanence, orchestre les mises à jour progressives et permet le rollback.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: myapp:1.0
          ports:
            - containerPort: 8080
```

Le `selector` est le lien entre le Deployment et ses pods : Kubernetes identifie les pods qu'il contrôle via ces labels. Si les labels ne correspondent pas, le Deployment et les pods coexistent sans relation — erreur silencieuse fréquente.

Un Deployment convient à tout ce qui est **stateless** : APIs, frontends, workers. Les pods sont interchangeables — peu importe lequel répond à une requête.

## StatefulSet

Un StatefulSet gère des pods avec une identité stable et persistante. Contrairement au Deployment où les pods sont anonymes, chaque pod d'un StatefulSet a un nom ordonné et prévisible (`postgres-0`, `postgres-1`), un volume dédié et un ordre de démarrage garanti.

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: postgres
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
        - name: postgres
          image: postgres:16-alpine
          volumeMounts:
            - name: data
              mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 10Gi
```

`volumeClaimTemplates` est la différence clé : chaque pod reçoit son propre PersistentVolumeClaim, créé automatiquement. Si `postgres-0` est supprimé et recréé, il retrouve exactement le même volume — les données sont préservées.

Un StatefulSet convient aux bases de données, aux systèmes de messagerie, à tout workload où l'**identité du pod compte**.

## Service

Un Pod a une IP éphémère — elle change à chaque recréation. Un Service est une abstraction réseau stable qui pointe vers un ensemble de pods via un sélecteur de labels, quelle que soit leur IP ou leur nombre.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: api
spec:
  selector:
    app: api
  ports:
    - port: 80
      targetPort: 8080
```

Le Service `api` reçoit du trafic sur le port 80 et le distribue vers tous les pods portant le label `app: api` sur le port 8080. Si un pod redémarre et change d'IP, le Service s'ajuste automatiquement.

Trois types couvrent les besoins principaux :

| Type | Accès | Usage |
|------|-------|-------|
| `ClusterIP` | Interne au cluster uniquement | Communication inter-services |
| `NodePort` | Externe via port du nœud (30000-32767) | Dev/test, sans load balancer |
| `LoadBalancer` | Externe via IP dédiée (cloud) | Exposition en production |

## Interactions

Le schéma typique d'une application Kubernetes : un Deployment maintient N pods, un Service expose ces pods de manière stable, et si l'application a besoin de persistance, un StatefulSet gère la base de données avec ses volumes dédiés.

```
Internet → Service (LoadBalancer)
               ↓
         Deployment (3 pods API)
               ↓
         Service (ClusterIP)
               ↓
         StatefulSet (postgres-0)
               ↓
         PersistentVolume
```

Chaque couche est indépendante : on peut scaler le Deployment sans toucher le Service, mettre à jour l'image sans recréer le StatefulSet.
