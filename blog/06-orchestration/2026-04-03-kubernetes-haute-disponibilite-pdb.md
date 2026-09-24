---
title: "Kubernetes : PodDisruptionBudget et haute disponibilité"
description: "Implémenter la haute disponibilité avec réplication, autoscaling et protection contre les disruptions planifiées."
tags: [orchestration, devops]
---

Une application Kubernetes avec un seul réplica a une disponibilité structurellement limitée. Un crash de nœud, une maintenance planifiée ou une mise à jour du cluster suffit à provoquer une interruption totale. Trois mécanismes combinés permettent de construire une infrastructure résiliente : la réplication multi-nœud via TopologySpreadConstraints, la protection contre les disruptions planifiées via PodDisruptionBudget, et l'adaptation dynamique à la charge via HorizontalPodAutoscaler.

<!--truncate-->

## Le problème du réplica unique

Une configuration à une seule instance présente des scénarios de défaillance prévisibles :

| Événement | Impact | Durée estimée |
|-----------|--------|---------------|
| Crash du nœud | Indisponibilité totale | 5 minutes ou plus : le nœud doit être déclaré `NotReady`, puis le délai de tolérance par défaut (300 s) expirer avant l'éviction du pod |
| Maintenance planifiée (`drain`) | Indisponibilité totale | Temps de démarrage du pod sur un autre nœud |
| Déploiement d'une nouvelle version | Aucune interruption avec la stratégie `RollingUpdate` par défaut et une *readiness probe* correcte ; interruption avec `Recreate` | Temps de démarrage du nouveau pod |
| Éviction par pression de ressources sur le nœud | Indisponibilité | Variable |

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

`whenUnsatisfiable: DoNotSchedule` refuse le placement si la contrainte ne peut pas être respectée : le pod reste `Pending`, par exemple si deux nœuds seulement sont disponibles pour trois réplicas et qu'un troisième réplica sur l'un d'eux porterait l'écart à 2. `ScheduleAnyway` traite la contrainte comme une préférence : le scheduler favorise la répartition, mais place le pod quand même.

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

Le mécanisme repose sur l'**API Eviction**. `kubectl drain` (comme le cluster autoscaler, Karpenter ou une mise à jour de nœuds managés) ne supprime pas les pods directement : il demande leur éviction. L'API server accepte une éviction seulement si elle laisse au moins `minAvailable` pods prêts parmi ceux que sélectionne le PDB ; sinon, il répond `429 Too Many Requests` et `kubectl drain` réessaie périodiquement. Avec `minAvailable: 2` et 3 réplicas, le premier pod `api` est évincé, le ReplicaSet en recrée un sur un autre nœud, et toute éviction suivante d'un pod `api` attend que ce remplaçant soit prêt.

La syntaxe alternative avec `maxUnavailable` est équivalente pour un Deployment à 3 réplicas :

```yaml
spec:
  maxUnavailable: 1
```

Les deux formes divergent quand le nombre de réplicas varie, notamment sous l'effet d'un HPA : `minAvailable: 2` reste fixe alors que l'application peut compter 10 réplicas, tandis que `maxUnavailable: 1` autorise toujours une éviction à la fois. `maxUnavailable` est donc mieux adapté aux Deployments dont la taille évolue.

Un PDB avec `minAvailable` égal au nombre de réplicas (ou `maxUnavailable: 0`) bloque toute opération de maintenance : un `drain` ne se termine jamais. Il faut toujours laisser une marge.

Le périmètre du PDB est limité aux évictions volontaires. Il ne protège ni contre la panne d'un nœud, ni contre la suppression directe d'un pod ou d'un Deployment, ni contre un rolling update, dont le rythme est gouverné par les paramètres `maxSurge` et `maxUnavailable` du Deployment. Le champ `unhealthyPodEvictionPolicy: AlwaysAllow` autorise l'éviction des pods déjà non prêts, pour qu'une application en panne ne bloque pas la maintenance des nœuds.

## HorizontalPodAutoscaler

HPA surveille les métriques de performance et ajuste le nombre de réplicas pour maintenir un seuil cible. Il nécessite le [Metrics Server](https://github.com/kubernetes-sigs/metrics-server) installé sur le cluster pour les métriques CPU et mémoire ; les métriques personnalisées (requêtes par seconde, longueur de file) passent par un adaptateur comme prometheus-adapter ou KEDA.

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

L'utilisation CPU (`Utilization`) est exprimée en pourcentage des **requests** du conteneur, et non de la capacité du nœud : sans `resources.requests.cpu` défini, le HPA ne peut pas calculer la métrique et reste inactif (`<unknown>` dans `kubectl get hpa`).

La formule de calcul utilisée par HPA :

```text
replicas_désiré = ⌈ replicas_actuels × (métrique_actuelle / métrique_cible) ⌉
```

Le HPA n'agit que si le rapport `métrique_actuelle / métrique_cible` s'écarte de 1 de plus de la tolérance (10 % par défaut). Exemple avec 3 réplicas et une cible CPU à 80 % :

```text
CPU à 85%  → rapport 1,06, dans la tolérance de 10 % → aucun changement, reste à 3
CPU à 100% → ceil(3 × 100/80) = ceil(3.75) = 4 réplicas
CPU à 30%  → ceil(3 × 30/80) = ceil(1.13) = 2, mais limité par minReplicas → reste à 3
```

`stabilizationWindowSeconds` évite le flapping : le scale-down attend 5 minutes de charge réduite avant d'agir, le scale-up réagit en 1 minute.

:::warning HPA et replicas
Ne pas spécifier `replicas` dans le Deployment quand un HPA est actif. Les deux ressources se disputent alors le contrôle, et les rollbacks Helm ou `kubectl apply` réinitialisent le nombre de réplicas à la valeur du manifeste, contredisant le HPA. Sans le champ, la création initiale démarre à 1 réplica, puis le HPA porte immédiatement le Deployment à `minReplicas`.
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
          resources:
            requests:
              cpu: 250m          # référence du calcul d'utilisation du HPA
              memory: 256Mi
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

# État du HPA (TARGETS affiche l'utilisation courante / la cible)
kubectl get hpa api-hpa
```

Les paramètres `resources` et le déroulement d'un rolling update sont détaillés dans l'article [rolling update et ressources](./2026-04-04-kubernetes-rolling-update-ressources.md).
