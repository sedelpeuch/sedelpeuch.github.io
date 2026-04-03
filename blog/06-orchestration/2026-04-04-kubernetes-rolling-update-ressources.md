---
title: "Kubernetes : déploiements sans interruption et optimisation des ressources"
description: "Implémenter les stratégies RollingUpdate, les limites de ressources et les contexts de sécurité pour les déploiements production-ready."
tags: [orchestration, devops]
---

Les déploiements en production doivent garantir la continuité de service pendant les mises à jour tout en respectant les contraintes de ressources et d'isolation de sécurité. Cet article explore les mécanismes permettant de mettre à jour une application sans interruation, d'allouer précisément les ressources, et de restreindre les permissions sur les pods.

<!--truncate-->

---

## Stratégie de déploiement RollingUpdate

La stratégie `RollingUpdate` remplace progressivement les pods anciens par de nouveaux, sans arrêt du service. Le paramètre `maxUnavailable: 0` garantit zéro interruption.

### Deux stratégies: RollingUpdate et Recreate

La stratégie `Recreate` arrête tous les pods avant de créer les nouveaux, ce qui provoque une interruption de service. La stratégie `RollingUpdate` crée les nouveaux pods avant de supprimer les anciens, permettant une transition sans interruption.

```yaml
# Recreate: Arrête tous les pods (downtime)
spec:
  strategy:
    type: Recreate

# RollingUpdate: Transition progressive (zéro downtime)
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1              # Maximum 1 pod supplémentaire temporaire
      maxUnavailable: 0        # Zéro pod indisponible à tout moment
```

### Mécanisme de transition

Lors d'une mise à jour de l'image conteneur, Kubernetes orchestre les opérations suivantes:

**État initial** : 3 pods version v1, service répartissant le trafic

**Phase 1** (T+5s) : Créer premier pod version v2
- Statut: 3 pods v1 + 1 pod v2 en démarrage
- maxSurge=1 permet temporairement 4 pods
- Pod v2: initialisation, readinessProbe retourne faux

**Phase 2** (T+10s) : Pod v2 devient sain
- Statut: 2 pods v1 + 2 pods v2 sains
- Pod v1 commence son arrêt gracieux

**Phase 3** (T+20s) : Migration complète
- Statut: 0 pods v1 + 3 pods v2
- Ensemble du trafic basculé vers v2
- Zéro requête perdue observée

### Configuration YAML

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: application
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1              # 1 pod supplémentaire autorisé
      maxUnavailable: 0        # 0 pod indisponible à tout moment

  selector:
    matchLabels:
      app: monapp

  template:
    metadata:
      labels:
        app: monapp
    spec:
      terminationGracePeriodSeconds: 30

      containers:
      - name: app
        image: monapp:v2

        startupProbe:
          httpGet:
            path: /health
            port: 8080
          failureThreshold: 30
          periodSeconds: 10

        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
```

### Points critiques

- `terminationGracePeriodSeconds: 30` : Délai avant arrêt forcé permettant à l'application d'achever les connexions actives
- Les probes de santé déterminent quand Kubernetes peut procéder à l'étape suivante
- Durée typique : 3-5 minutes pour 3 réplicas
- Le service reçoit environ 4 pods brièvement (maxSurge), puis retour à 3

---

## Allocation de ressources et isolation de sécurité

Pour être véritablement production-ready, deux aspects importants doivent être configurés: l'allocation de ressources et le contexte de sécurité des pods.

### Allocation de ressources: requests et limits

Les `requests` et `limits` définissent les besoins et contraintes de chaque container.

```yaml
resources:
  requests:
    cpu: 100m              # Minimum CPU requis pour placement
    memory: 128Mi          # Minimum mémoire requis pour placement

  limits:
    cpu: 500m              # Plafond CPU (throttle si dépassé)
    memory: 512Mi          # Plafond mémoire (OOMKill si dépassé)
```

**Fonctionnement du scheduling** :
- Kubernetes utilise `requests` pour décider sur quel nœud placer le pod
- Kubernetes utilise `limits` pour contrôler les ressources allouées
- Si un pod dépasse ses `limits` : CPU throttled, mémoire → OOMKilled

**Cas Dashy** :
- Dashy est léger (dashboard uniquement, pas de traitement lourd)
- Requests conservateurs (100m CPU, 128Mi RAM) permettent cohabitation
- Limits généreux (500m CPU, 512Mi RAM) préviennent OOMKill

### Contexte de sécurité: least privilege

Le contexte de sécurité restreint les permissions du container selon le principe du moindre privilège.

```yaml
securityContext:
  runAsNonRoot: true              # Interdire exécution en root
  runAsUser: 1000                 # User ID (pas UID 0)
  fsGroup: 1000                   # Group ID pour volumes
  allowPrivilegeEscalation: false # Pas d'escalade de privileges

  capabilities:
    drop:
      - ALL                       # Lâcher toutes les capabilities Linux

  readOnlyRootFilesystem: true    # Filesystem racine en read-only
```

**Mécanismes de sécurité** :
- `runAsNonRoot: true` : Force exécution en utilisateur non-root
- `capabilities: drop ALL` : Supprime les privilèges Linux (CAP_SYS_ADMIN, etc)
- `allowPrivilegeEscalation: false` : Empêche setuid/setgid
- `readOnlyRootFilesystem: true` : Filesystem immutable sauf volumes explicites

### Configuration complète

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: application
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0

  selector:
    matchLabels:
      app: monapp

  template:
    metadata:
      labels:
        app: monapp
    spec:
      terminationGracePeriodSeconds: 30

      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
        fsGroup: 1000

      containers:
      - name: app
        image: monapp:latest

        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 500m
            memory: 512Mi

        securityContext:
          allowPrivilegeEscalation: false
          readOnlyRootFilesystem: true
          capabilities:
            drop:
              - ALL

        ports:
        - containerPort: 8080
          name: http

        startupProbe:
          httpGet:
            path: /health
            port: http
          failureThreshold: 30
          periodSeconds: 10

        readinessProbe:
          httpGet:
            path: /ready
            port: http
          initialDelaySeconds: 5
          periodSeconds: 5

        livenessProbe:
          httpGet:
            path: /live
            port: http
          initialDelaySeconds: 15
          periodSeconds: 10
```

---

## Étude de cas: Dashy avec RollingUpdate et ressources

Le chart Helm Dashy intègre toutes les contraintes de déploiement production-ready présentées dans cette section:

### Configuration Helm complète

#### values.yaml

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

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 100m
    memory: 128Mi

securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  fsGroup: 1000
```

#### templates/deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "dashy.fullname" . }}
spec:
  replicas: {{ .Values.replicaCount }}

  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0

  selector:
    matchLabels:
      app.kubernetes.io/name: dashy

  template:
    metadata:
      labels:
        app.kubernetes.io/name: dashy
    spec:
      terminationGracePeriodSeconds: 30

      securityContext:
        {{- toYaml .Values.securityContext | nindent 8 }}

      containers:
      - name: dashy
        image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
        imagePullPolicy: {{ .Values.image.pullPolicy }}

        ports:
        - containerPort: 8080
          name: http

        resources:
          {{- toYaml .Values.resources | nindent 12 }}

        securityContext:
          allowPrivilegeEscalation: false
          readOnlyRootFilesystem: true
          capabilities:
            drop:
              - ALL

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

---

## Validation post-déploiement

Après déploiement en production, les vérifications suivantes couvrent les aspects RollingUpdate, ressources et sécurité:

### 6. Limites de ressources

```bash
kubectl describe deployment dashy -n production | grep -A5 "Limits\|Requests"
```

Les limites et requêtes doivent correspondre aux valeurs configurées dans values.yaml.

### 7. Contexte de sécurité

```bash
kubectl get pods -n production -o jsonpath='{.items[0].spec.securityContext}' | jq
```

La sortie doit montrer `runAsNonRoot: true` et `runAsUser: 1000`.

### 8. Topologie de distribution (complément HA)

```bash
kubectl get pods -n production -o wide
```

Vérifier qu'aucun nœud n'accueille plus d'une réplica. Les noms d'hôte sous la colonne NODE doivent tous être différents.

### 9. Événements et logs

```bash
kubectl events -n production --sort-by='.lastTimestamp'
kubectl logs -n production -l app.kubernetes.io/name=dashy --all-containers=true --tail=50
```

Les événements ne doivent pas contenir d'avertissements ou d'erreurs liés au déploiement, aux resources ou à la planification.

### 10. Test de déploiement sans interruption

```bash
# Objet 1: Surveiller les logs
kubectl logs -f deployment/dashy -n production

# Objet 2: Suivre les replicas actives
watch -n 1 'kubectl get pods -n production -o wide'

# Objet 3: Déclencher un déploiement
kubectl set image deployment/dashy dashy=mauricenino/dashy:3.1.2 -n production

# Observation: Les logs doivent rester continus sans interruption
```

---

## Résumé et recommandations

Les stratégies RollingUpdate, l'allocation de ressources via requests/limits, et les contextes de sécurité composent ensemble une architecture production-ready capable de survivre aux mises à jour logicielles et aux défaillances matérielles tout en isolant les charges de travail.

### Gains de cette configuration

| Aspect | Impact |
|--------|---------|
| **Downtime déploiement** | 0s (maxUnavailable: 0) |
| **Ressources garanties** | Oui (requests) |
| **Ressources plafonnées** | Oui (limits) |
| **Escalade privilege** | Impossible (runAsNonRoot) |
| **Exécution root** | Interdite |
| **Disruption lors drain** | Contrôlée (PDB, cf article 1) |

### Points clés pour la production

La vraie haute disponibilité en Kubernetes requiert une approche holistique:
1. **Réplication et distribution** : PodDisruptionBudget, HorizontalPodAutoscaler, TopologySpreadConstraints
2. **Déploiements sûrs** : RollingUpdate avec maxUnavailable: 0
3. **Allocation précise** : Resources requests et limits
4. **Isolation sécurisée** : Security contexts et capabilities

Ensemble, ces cinq patterns transforment une application basique en infrastructure résiliente capable de supporter la production.

### Améliorations futures

**Observabilité** : Utiliser Prometheus et Grafana pour monitorer les mises à jour et détecter les anomalies

**Tracing distribué** : OpenTelemetry permet de suivre les requêtes traversant plusieurs pods

**Ingestion sécurisée** : NetworkPolicy pour restreindre le trafic inter-pods

**Gestion des secrets** : Intégrer un gestionnaire de secrets (Sealed Secrets, Vault) pour les données sensibles
