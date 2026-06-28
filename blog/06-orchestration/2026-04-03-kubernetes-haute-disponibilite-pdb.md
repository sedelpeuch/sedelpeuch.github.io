---
title: "Kubernetes : PodDisruptionBudget et haute disponibilité"
description: "Implémenter la haute disponibilité avec réplication, autoscaling et protection contre les disruptions planifiées."
tags: [orchestration, devops]
---

Une application Kubernetes avec une seule réplica a une disponibilité structurellement limitée. Un crash de nœud, une maintenance planifiée ou une mise à jour du cluster suffit à provoquer une interruption totale. Trois mécanismes combinés permettent de construire une infrastructure résiliente : la réplication multi-nœud via TopologySpreadConstraints, la protection contre les disruptions planifiées via PodDisruptionBudget, et l'adaptation dynamique à la charge via HorizontalPodAutoscaler.

<!--truncate-->

## Le problème de la réplica unique

Une configuration monoinstance présente des scénarios de défaillance prévisibles :

| Événement | Impact | Durée estimée |
|-----------|--------|---------------|
| Crash du nœud | Indisponibilité totale | 1-5 minutes |
| Maintenance planifiée (`drain`) | Indisponibilité totale | 1-2 minutes |
| Déploiement d'une nouvelle version | Interruption du service | 30-60 secondes |
| Éviction par ressources | Indisponibilité | Variable |

Passer à 3 réplicas réduit l'impact d'un événement isolé, mais ne suffit pas si les 3 réplicas se trouvent sur le même nœud.

## TopologySpreadConstraints

Sans contrainte de distribution, le scheduler peut placer plusieurs réplicas sur un même nœud. La perte de ce nœud emporte alors toutes les réplicas simultanément.

`topologySpreadConstraints` force une distribution homogène selon un critère topologique — nœud, zone de disponibilité, région :

```yaml
spec:
  replicas: 3
  template:
    spec:
      topologySpreadConstraints:
      - maxSkew: 1
        topologyKey: kubernetes.io/hostname
        whenUnsatisfiable: DoNotSchedule
        labelSelector:
          matchLabels:
            app: api
      containers:
        - name: api
          image: myapp:1.0
```

`maxSkew: 1` signifie que l'écart entre le nœud le plus chargé et le moins chargé ne peut pas dépasser 1. Avec 3 réplicas et 3 nœuds, chaque nœud en héberge exactement 1.

`whenUnsatisfiable: DoNotSchedule` refuse le placement si la contrainte ne peut pas être respectée — plus strict que `ScheduleAnyway` qui place le pod quand même.

Pour une distribution multi-AZ :

```yaml
topologySpreadConstraints:
- maxSkew: 1
  topologyKey: topology.kubernetes.io/zone
  whenUnsatisfiable: ScheduleAnyway
  labelSelector:
    matchLabels:
      app: api
```

## PodDisruptionBudget

La réplication protège contre les défaillances involontaires. Le PodDisruptionBudget protège contre les interruptions **planifiées** : `kubectl drain`, mise à jour du cluster, autoscaling de nœuds vers le bas.

Sans PDB, un `kubectl drain` peut supprimer simultanément plusieurs pods — si les 3 réplicas se trouvent sur les nœuds drainés, l'application est intégralement indisponible pendant la maintenance.

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: api-pdb
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: api
```

Avec `minAvailable: 2`, Kubernetes garantit qu'au moins 2 pods restent disponibles à tout moment lors d'une disruption planifiée. Un `kubectl drain` d'un nœud hébergeant un pod `api` attendra que ce pod soit recréé ailleurs avant de continuer.

La syntaxe alternative avec `maxUnavailable` est équivalente pour un Deployment à 3 réplicas :

```yaml
spec:
  maxUnavailable: 1
```

Un PDB avec `minAvailable` égal au nombre de réplicas bloque toute opération de maintenance. Il faut toujours laisser une marge — `minAvailable: replicas - 1` est la valeur standard.

## HorizontalPodAutoscaler

HPA surveille les métriques de performance et ajuste le nombre de réplicas pour maintenir un seuil cible. Il nécessite le [Metrics Server](https://github.com/kubernetes-sigs/metrics-server) installé sur le cluster.

```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 80
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
      - type: Percent
        value: 100
        periodSeconds: 60
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 50
        periodSeconds: 60
```

La formule de calcul utilisée par HPA :

```
replicas_désiré = ⌈ replicas_actuels × (métrique_actuelle / métrique_cible) ⌉
```

Exemple avec 3 réplicas et une cible CPU à 80 % :

```
CPU à 85% → ceil(3 × 85/80) = ceil(3.19) = 4 réplicas
CPU à 30% → ceil(3 × 30/80) = ceil(1.13) = 2, mais limité par minReplicas → reste à 3
```

`stabilizationWindowSeconds` évite le flapping : le scale-down attend 5 minutes de charge réduite avant d'agir, le scale-up réagit en 1 minute.

:::warning HPA et replicas
Ne pas spécifier `replicas` dans le Deployment quand un HPA est actif. Les deux ressources se disputent alors le contrôle, et les rollbacks Helm ou `kubectl apply` réinitialisent le nombre de réplicas à la valeur du manifest, contredisant le HPA.
:::

## Configuration complète

Les trois mécanismes combinés pour un Deployment de 3 réplicas :

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  # Pas de replicas ici — géré par HPA
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      topologySpreadConstraints:
      - maxSkew: 1
        topologyKey: kubernetes.io/hostname
        whenUnsatisfiable: DoNotSchedule
        labelSelector:
          matchLabels:
            app: api
      containers:
        - name: api
          image: myapp:1.0
          readinessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 5
---
# pdb.yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: api-pdb
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: api
---
# hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 80
```

Vérification après déploiement :

```bash
# Distribution des pods sur les nœuds
kubectl get pods -o wide -l app=api

# État du PDB
kubectl get pdb api-pdb
# DISRUPTIONS-ALLOWED doit être 1 avec minAvailable: 2 et 3 réplicas

# État du HPA
kubectl get hpa api-hpa
```
