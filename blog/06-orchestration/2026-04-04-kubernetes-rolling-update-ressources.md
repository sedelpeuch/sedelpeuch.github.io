---
title: "Kubernetes : déploiements sans interruption et optimisation des ressources"
description: "Stratégie RollingUpdate, requests/limits et security context pour des déploiements production-ready."
tags: [orchestration, devops]
---

Mettre à jour une application en production sans interruption de service repose sur deux conditions : une stratégie de déploiement progressive qui maintient des pods sains pendant la transition, et des probes de santé correctement configurées pour que Kubernetes sache quand un pod est prêt à recevoir du trafic. À cela s'ajoutent les contraintes de ressources et de sécurité qui complètent une configuration production-ready.

<!--truncate-->

## Stratégies de déploiement

Kubernetes propose deux stratégies pour les Deployments.

`Recreate` arrête tous les pods avant d'en créer de nouveaux. Simple, mais provoque une interruption de service — réservé aux cas où deux versions ne peuvent pas coexister simultanément.

`RollingUpdate` remplace les pods progressivement. Deux paramètres contrôlent la vitesse et les garanties :

```yaml
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # pods supplémentaires autorisés au-delà du nombre cible
      maxUnavailable: 0  # pods indisponibles autorisés pendant la mise à jour
```

`maxUnavailable: 0` garantit zéro interruption — Kubernetes ne supprime un pod v1 qu'après qu'un pod v2 soit déclaré prêt par sa readinessProbe.

`maxSurge: 1` autorise temporairement un pod supplémentaire. Avec 3 réplicas, Kubernetes peut monter à 4 pods pendant la transition.

### Séquence de transition

Pour un Deployment de 3 réplicas passant de v1 à v2 :

```
T+0s  : [v1] [v1] [v1]           → état initial
T+5s  : [v1] [v1] [v1] [v2↑]    → pod v2 en démarrage (maxSurge=1)
T+15s : [v1] [v1] [v2] [v2]     → v2 prêt, un v1 supprimé
T+25s : [v1] [v2] [v2] [v2]     → transition continue
T+35s : [v2] [v2] [v2]          → migration complète, zéro downtime
```

La readinessProbe est le mécanisme qui rend cela possible : tant qu'un pod v2 ne retourne pas HTTP 200 sur son endpoint de santé, Kubernetes ne l'intègre pas au Service et ne supprime pas de pod v1.

### Configuration complète

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      terminationGracePeriodSeconds: 30
      containers:
      - name: api
        image: myapp:v2
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
            path: /health
            port: http
          initialDelaySeconds: 15
          periodSeconds: 10
```

`terminationGracePeriodSeconds: 30` laisse 30 secondes au pod v1 pour terminer les connexions actives avant d'être tué. Sans ça, les requêtes en cours au moment de la suppression sont coupées brutalement.

Les trois probes ont des rôles distincts : `startupProbe` évite les faux positifs pendant le démarrage lent d'une application, `readinessProbe` contrôle l'intégration dans le Service, `livenessProbe` déclenche le redémarrage si le pod est bloqué.

## Allocation de ressources

Les `requests` et `limits` contrôlent l'allocation de ressources CPU et mémoire au niveau du scheduler et du kubelet.

```yaml
resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 500m
    memory: 512Mi
```

`requests` sert au scheduling : Kubernetes place le pod sur un nœud ayant au moins 100m CPU et 128Mi de RAM disponibles. C'est la garantie minimale.

`limits` sert au contrôle à l'exécution : si le pod dépasse 500m CPU, il est throttlé (ralenti mais pas tué). S'il dépasse 512Mi de RAM, il est OOMKilled et redémarré.

Ne pas définir de `limits` mémoire dans un cluster partagé est risqué — un pod peut consommer toute la RAM disponible sur un nœud et provoquer l'éviction d'autres pods. Ne pas définir de `requests` empêche le scheduler de prendre des décisions optimales.

## Security context

Le security context restreint les permissions du conteneur selon le principe du moindre privilège.

```yaml
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 1000
  containers:
  - name: api
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop:
          - ALL
```

`runAsNonRoot: true` interdit l'exécution en root — Kubernetes refuse de démarrer le pod si l'image a `USER root`. `capabilities: drop: ALL` supprime toutes les capabilities Linux (CAP_SYS_ADMIN, CAP_NET_BIND_SERVICE, etc.) — le conteneur ne peut pas interagir avec le kernel au-delà de ce qu'un processus non privilégié peut faire normalement. `readOnlyRootFilesystem: true` monte le système de fichiers racine en lecture seule — tout ce qui doit être écrit doit passer par un volume explicite.

```yaml
    volumeMounts:
    - name: tmp
      mountPath: /tmp
    - name: cache
      mountPath: /app/cache
  volumes:
  - name: tmp
    emptyDir: {}
  - name: cache
    emptyDir: {}
```

## Test de déploiement sans interruption

Pour vérifier qu'une mise à jour ne provoque aucune interruption :

```bash
# Terminal 1 — surveiller les pods
watch -n 1 'kubectl get pods -o wide'

# Terminal 2 — trafic continu
while true; do curl -s -o /dev/null -w "%{http_code}\n" http://mon-service/health; sleep 0.5; done

# Terminal 3 — déclencher la mise à jour
kubectl set image deployment/api api=myapp:v2

# Tous les codes retournés doivent être 200
```

Si des codes 503 apparaissent, les probes ou `terminationGracePeriodSeconds` sont mal configurés.
