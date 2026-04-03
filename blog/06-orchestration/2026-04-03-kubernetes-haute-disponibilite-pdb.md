---
title: "Kubernetes : PodDisruptionBudget et haute disponibilité"
description: "Implémenter la haute disponibilité avec réplication, autoscaling et protection contre les disruptions planifiées."
tags: [orchestration, devops]
---

La haute disponibilité en Kubernetes repose sur trois piliers : la réplication des pods, la distribution sur plusieurs nœuds, et la protection contre les interruptions involontaires. Cet article explore les mécanismes permettant de transformer une application monoinstance en infrastructure résiliente capable de survivre aux défaillances de nœud et aux maintenances planifiées.

<!--truncate-->

---

## Configuration avec une seule réplica : risques et limitations

Une application Kubernetes avec une seule réplica présente plusieurs points de vulnérabilité. La configuration suivante illustre cette limitation :

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: application
spec:
  replicas: 1  # Configuration monoinstance
  selector:
    matchLabels:
      app: monapp
  template:
    metadata:
      labels:
        app: monapp
    spec:
      containers:
      - name: app
        image: monapp:latest
```

### Scénarios de défaillance courants

| Événement | Impact | Durée estimée |
|-----------|--------|---------------|
| Crash du nœud | Indisponibilité totale | 1-5 minutes |
| Maintenance planifiée (drain) | Indisponibilité totale | 1-2 minutes |
| Déploiement d'une nouvelle version | Interruption du service | 30-60 secondes |
| Consommation excessive de ressources | Éviction du pod | Variable |
| Mise à jour du cluster Kubernetes | Interruption du service | 1-5 minutes |

---

## PodDisruptionBudget : garantir la disponibilité minimale

Un PodDisruptionBudget (PDB) est une ressource Kubernetes qui définit une politique de disponibilité minimale pour un ensemble de pods. Cette ressource contrôle les "disruptions volontaires" - les situations où Kubernetes ou l'administrateur délibérément arrête les pods.

### Fonctionnement et mécanisme

Un PDB spécifie le nombre minimum de pods qui doivent rester disponibles simultanément. Avant d'arrêter un pod suite à une opération de maintenance (comme `kubectl drain`), Kubernetes vérifie si cette action violerait la contrainte définie par le PDB.

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: app-pdb
spec:
  minAvailable: 2          # Minimum de 2 pods disponibles
  selector:
    matchLabels:
      app: monapp

---
# Syntaxe alternative
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: app-pdb
spec:
  maxUnavailable: 1        # Maximum de 1 pod indisponible
  selector:
    matchLabels:
      app: monapp
```

### Cas d'usage

- **Maintenance du cluster** : `kubectl drain` ne terminera que les pods respectant le PDB.
- **Autoscaling du cluster** : Lors de la suppression de nœuds, les pods sont protégés selon le PDB.
- **Mises à jour Kubernetes** : L'éviction des pods respecte automatiquement les contraintes PDB.
- **Gestion des défaillances** : Le système limite l'impact d'une panne matérielle sur les pods.

---

## HorizontalPodAutoscaler : adaptation dynamique de la capacité

Un HorizontalPodAutoscaler (HPA) surveille continuellement les métriques de performance (CPU, mémoire ou métriques personnalisées) et ajuste automatiquement le nombre de réplicas pour maintenir un seuil de performance cible.

### Processus d'autoscaling

HPA fonctionne selon un cycle de trois étapes:
1. **Collecte des métriques** : Kubelet envoie les métriques au Metrics Server
2. **Évaluation** : HPA compare la moyenne des métriques au seuil cible
3. **Ajustement** : Si le seuil est dépassé, HPA modifie le nombre de réplicas

La formule de calcul utilisée par défaut est:
```
replicas_désiré = ⌈ replicas_actuels × (métrique_actuelle / métrique_cible) ⌉
```

### Exemple de comportement

Pour une application avec 3 réplicas, CPU limit 500m, et target 80%:

```
Situation 1 - CPU à 50% (sous limite)
  Métrique actuelle: 50%
  Cible: 80%
  → Aucun scaling (50% < 80%)

Situation 2 - CPU à 85% (au-dessus de la limite)
  Métrique actuelle: 85%
  Cible: 80%
  → Calcul: ceil(3 × 85/80) = ceil(3.19) = 4
  → Scale-up de 3 à 4 réplicas

Situation 3 - Après scaling, CPU à 30% (bien sous limite)
  Métrique actuelle: 30%
  → Stabilization window de 5 min (éviter flapping)
  → Après 5 min, calcul: ceil(3 × 30/80) = 2
  → Limité par minReplicas: 3 → reste à 3
```

### Configuration YAML

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: app

  minReplicas: 3          # Minimum
  maxReplicas: 10         # Maximum (protection)

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
        value: 100              # Peut doubler les réplicas
        periodSeconds: 60

    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 50               # Réduit de 50%
        periodSeconds: 60
```

**Note** : L'installation du Metrics Server est obligatoire pour HPA fonctionnement:

```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

---

## TopologySpreadConstraints : distribution géographique des pods

Les topologySpreadConstraints permettent de constraindre la distribution des pods parmi les nœuds du cluster. Cette ressource garantit que les réplicas ne se concentrent pas sur un même nœud ou une même zone de disponibilité.

### Architecture sans et avec distribution

**Sans contrainte de distribution** : Les 3 réplicas peuvent être placées sur un même nœud, créant un point de défaillance unique.

**Avec distribution** : Les réplicas sont réparties (une par nœud) afin que la perte d'un nœud n'affecte qu'une seule réplica.

### Configuration YAML

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: application
spec:
  replicas: 3
  selector:
    matchLabels:
      app: monapp
  template:
    metadata:
      labels:
        app: monapp
    spec:
      topologySpreadConstraints:
      - maxSkew: 1
        topologyKey: kubernetes.io/hostname  # Par nœud
        whenUnsatisfiable: DoNotSchedule     # Refuser si impossible
        labelSelector:
          matchLabels:
            app: monapp

      containers:
      - name: app
        image: monapp:latest
```

### Alternatives de topologie

Distribution par zone de disponibilité (multi-AZ):

```yaml
topologySpreadConstraints:
- maxSkew: 1
  topologyKey: topology.kubernetes.io/zone
  whenUnsatisfiable: ScheduleAnyway        # Mode permissif
  labelSelector:
    matchLabels:
      app: monapp
```

Le paramètre `whenUnsatisfiable` contrôle le comportement en cas impossibilité:
- `DoNotSchedule` : Le pod ne sera pas placé si la contrainte ne peut être respectée
- `ScheduleAnyway` : Le pod sera placé même si la contrainte est violée

---

## Étude de cas: Dashy en production

Dashy est un dashboard léger pour cluster Kubernetes. En l'état initial (une seule réplica), l'application présente un point de défaillance unique. La transformation suivante rend le déploiement production-ready avec haute disponibilité.

### État initial

La configuration basique comprend:
- une seule réplica (pas de redondance)
- un service ClusterIP (pas de load balancing externe)
- une configuration statique (pas d'adaptation à la charge)

### Transformation pour haute disponibilité

Les fichiers suivants constituent la base du déploiement production-ready:

#### values.yaml (configuration minimale)

```yaml
replicaCount: 3

image:
  repository: mauricenino/dashy
  tag: 3.1.1
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80
  targetPort: 8080

autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 10
  targetCPUUtilizationPercentage: 80

podDisruptionBudget:
  enabled: true
  minAvailable: 2
```

#### templates/deployment.yaml (stratégie multi-nœud)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "dashy.fullname" . }}
spec:
  replicas: {{ .Values.replicaCount }}

  selector:
    matchLabels:
      app.kubernetes.io/name: dashy

  template:
    metadata:
      labels:
        app.kubernetes.io/name: dashy
    spec:
      topologySpreadConstraints:
      - maxSkew: 1
        topologyKey: kubernetes.io/hostname
        whenUnsatisfiable: DoNotSchedule
        labelSelector:
          matchLabels:
            app.kubernetes.io/name: dashy

      containers:
      - name: dashy
        image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
        imagePullPolicy: {{ .Values.image.pullPolicy }}

        ports:
        - containerPort: 8080
          name: http

        startupProbe:
          httpGet:
            path: /
            port: http
          failureThreshold: 30
          periodSeconds: 10

        readinessProbe:
          httpGet:
            path: /
            port: http
          initialDelaySeconds: 5
          periodSeconds: 5

        livenessProbe:
          httpGet:
            path: /
            port: http
          initialDelaySeconds: 15
          periodSeconds: 10
```

#### templates/hpa.yaml (autoscaling)

```yaml
{{- if .Values.autoscaling.enabled }}
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: {{ include "dashy.fullname" . }}-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: {{ include "dashy.fullname" . }}

  minReplicas: {{ .Values.autoscaling.minReplicas }}
  maxReplicas: {{ .Values.autoscaling.maxReplicas }}

  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: {{ .Values.autoscaling.targetCPUUtilizationPercentage }}

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
{{- end }}
```

#### templates/poddisruptionbudget.yaml (protection contre drainages)

```yaml
{{- if .Values.podDisruptionBudget.enabled }}
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: {{ include "dashy.fullname" . }}-pdb
spec:
  minAvailable: {{ .Values.podDisruptionBudget.minAvailable }}
  selector:
    matchLabels:
      app.kubernetes.io/name: dashy
{{- end }}
```

### Déploiement et vérification

Installation du chart Helm:

```bash
helm install dashy ./dashy-chart \
  -n production \
  --create-namespace \
  --wait
```

Vérification de la distribution:

```bash
kubectl get pods -n production -l app.kubernetes.io/name=dashy -o wide

# Output attendu:
# dashy-abc1   1/1   Running   0   2m   node1   10.1.0.10
# dashy-abc2   1/1   Running   0   2m   node2   10.1.0.11
# dashy-abc3   1/1   Running   0   2m   node3   10.1.0.12
```

### Comparaison avant/après

| Critère | Avant | Après |
|---------|-------|-------|
| Nombre de replicas | 1 | 3 (autoscale 3-10) |
| Distribution nœuds | 1 nœud | 3 nœuds distincts |
| Pods min disponibles | 1 (SPOF) | 2 (PDB) |
| Autoscaling | Non | Oui (CPU 80%) |
| Point de défaillance unique | Oui | Non |
| Disponibilité estimée | ~95% | ~99.5% |

---

## Validation post-déploiement

Après déploiement en production, les vérifications suivantes valident la configuration:

### 1. Distribution géographique des pods

```bash
kubectl get pods -n production -l app.kubernetes.io/name=dashy -o wide
```

Chaque pod doit être sur un nœud différent. Les topologySpreadConstraints empêchent la ré-création ou le lancement si cette contrainte ne peut être respectée.

### 2. Service de load balancing

```bash
kubectl get svc -n production
kubectl port-forward svc/dashy 8080:80 -n production
curl http://localhost:8080/
```

Les requêtes doivent être distribuées sur les 3 pods.

### 3. Sondes de santé

```bash
kubectl describe pod <pod-name> -n production | grep -A3 "Startup\|Readiness\|Liveness"
```

Chaque sonde doit afficher "Probe succeeded".

### 4. Budget de disruption

```bash
kubectl get pdb -n production
```

Le champ `DISRUPTIONS-ALLOWED` doit indiquer 1 ou moins (avec minAvailable: 2 et 3 replicas).

### 5. HorizontalPodAutoscaler

```bash
kubectl get hpa -n production
kubectl describe hpa dashy-hpa -n production
```

L'état doit afficher minReplicas: 3, maxReplicas: 10, avec CPU comme métrique cible.

---

## Résumé et points clés

Trois mécanismes clés composent la haute disponibilité Kubernetes: PodDisruptionBudget protège contre les interruptions planifiées, HorizontalPodAutoscaler adapte la capacité à la charge, et TopologySpreadConstraints assure la distribution géographique des pods. Dashy bénéficie de ces configurations, passant d'une disponibilité estimée à 95% avec une seule réplica à environ 99.5% avec distribution multi-nœud et protections contre disruptions involontaires.

### Recommandations pour la suite

La deuxième partie de cette exploration couvre les déploiements sans interruption (RollingUpdate), l'optimisation des ressources (requests/limits), et les contextes de sécurité. Ces configurations complètent l'architecture HA en garantissant l'intégrité des données pendant les transitions entre versions et en isolant les charges de travail selon le principe du moindre privilège.
