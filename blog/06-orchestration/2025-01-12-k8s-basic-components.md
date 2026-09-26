---
title: "Kubernetes : composants de base"
description: "Pod, Deployment, StatefulSet, Service : les ressources fondamentales de Kubernetes et quand utiliser chacune."
tags: [orchestration, devops]
---

Kubernetes expose une API déclarative : l'utilisateur décrit l'état souhaité via des ressources YAML, et le cluster converge vers cet état (voir l'[architecture de Kubernetes](./2025-01-12-k8s-introduction.md)). Quatre ressources couvrent la majorité des besoins : Pod, Deployment, StatefulSet, Service. Comprendre pourquoi chacune existe, et pas seulement comment l'écrire, évite les mauvais choix d'architecture.

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

En pratique, un Pod n'est presque jamais créé directement. Un Pod seul n'est pas recréé s'il crashe ou si son nœud tombe : c'est le rôle des contrôleurs (Deployment, StatefulSet) de maintenir un ensemble de pods en vie.

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

Le `selector` est le lien entre le Deployment et ses pods : Kubernetes identifie les pods qu'il contrôle via ces labels. L'API refuse un Deployment dont le `selector` ne correspond pas aux labels du `template` (`selector does not match template labels`), et le `selector` ne peut plus être modifié après création. L'erreur silencieuse se situe plutôt côté Service : un Service dont le sélecteur ne correspond à aucun pod est accepté, mais n'a aucun backend (`kubectl get endpointslices` montre une liste vide) et les connexions échouent.

Le Deployment ne gère pas les pods directement : il crée un ReplicaSet par version du `template`. Une mise à jour de l'image crée un nouveau ReplicaSet dont le nombre de réplicas augmente pendant que celui de l'ancien diminue ; l'ancien ReplicaSet, conservé à zéro réplica, permet le rollback (`kubectl rollout undo`). Ce mécanisme est détaillé dans l'article [rolling update et ressources](./2026-04-04-kubernetes-rolling-update-ressources.md).

Un Deployment convient à tout ce qui est **stateless** : APIs, frontends, workers. Les pods sont interchangeables : peu importe lequel répond à une requête.

## StatefulSet

Un StatefulSet gère des pods avec une identité stable et persistante. Contrairement au Deployment où les pods sont anonymes, chaque pod d'un StatefulSet a un nom ordonné et prévisible (`postgres-0`, `postgres-1`), un volume dédié et un ordre de démarrage garanti (chaque pod n'est créé qu'une fois le précédent prêt).

```yaml
# Service headless : pas d'IP virtuelle, un enregistrement DNS par pod
apiVersion: v1
kind: Service
metadata:
  name: postgres
spec:
  clusterIP: None
  selector:
    app: postgres
  ports:
    - port: 5432
---
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
          env:
            - name: POSTGRES_PASSWORD      # obligatoire pour l'image officielle
              valueFrom:
                secretKeyRef:
                  name: postgres-credentials
                  key: password
            - name: PGDATA                 # sous-répertoire : la racine d'un volume ext4 contient lost+found
              value: /var/lib/postgresql/data/pgdata
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

`volumeClaimTemplates` est la différence clé : chaque pod reçoit son propre PersistentVolumeClaim (`data-postgres-0`, `data-postgres-1`...), créé automatiquement. Si `postgres-0` est supprimé et recréé, il retrouve exactement le même volume, et les données sont préservées. Les PVC survivent aussi par défaut à la suppression du StatefulSet lui-même ; le champ `persistentVolumeClaimRetentionPolicy` modifie ce comportement.

Le champ `serviceName` désigne le Service headless (`clusterIP: None`) déclaré plus haut. Au lieu d'une IP virtuelle unique, le DNS du cluster publie un enregistrement par pod : `postgres-0.postgres.default.svc.cluster.local` désigne toujours le même pod, ce qui permet par exemple à des réplicas de joindre nommément le primaire. Le Secret `postgres-credentials` référencé par la variable d'environnement est décrit dans l'article [Secrets et ConfigMaps](./2025-01-12-k8s-secrets-configmaps.md), et les volumes dans l'article [stockage](./2025-01-12-k8s-storage.md).

Un StatefulSet convient aux bases de données, aux systèmes de messagerie, à tout workload où l'**identité du pod compte**.

## Service

Un Pod a une IP éphémère, qui change à chaque recréation. Un Service est une abstraction réseau stable qui pointe vers un ensemble de pods via un sélecteur de labels, quelle que soit leur IP ou leur nombre.

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

Le Service reçoit une IP virtuelle stable (ClusterIP) et un nom DNS (`api.<namespace>.svc.cluster.local`, ou simplement `api` depuis le même namespace). La liste des pods prêts qui le composent est maintenue dans des objets EndpointSlice : un pod dont la *readiness probe* échoue en est retiré, et ne reçoit plus de trafic.

Trois types couvrent les besoins principaux :

| Type | Accès | Usage |
|------|-------|-------|
| `ClusterIP` | Interne au cluster uniquement | Communication inter-services |
| `NodePort` | Externe via port du nœud (30000-32767) | Dev/test, sans load balancer |
| `LoadBalancer` | Externe via IP dédiée (cloud) | Exposition en production |

Chaque type englobe le précédent : un Service `LoadBalancer` possède aussi un NodePort et une ClusterIP. Pour exposer plusieurs applications HTTP derrière une seule adresse, avec routage par nom d'hôte ou par chemin et terminaison TLS, les ressources Ingress ou Gateway API complètent les Services.

## Interactions

Le schéma typique d'une application Kubernetes : un Deployment maintient N pods, un Service expose ces pods de manière stable, et si l'application a besoin de persistance, un StatefulSet gère la base de données avec ses volumes dédiés.

```text
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

Chaque couche est indépendante : le Deployment se met à l'échelle sans modification du Service, et l'image de l'API se met à jour sans toucher au StatefulSet.
