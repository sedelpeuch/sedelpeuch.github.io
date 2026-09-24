---
title: "Kubernetes : déploiements sans interruption et optimisation des ressources"
description: "Stratégie RollingUpdate, requests/limits et security context pour des déploiements production-ready."
tags: [orchestration, devops]
---

Mettre à jour une application en production sans interruption de service repose sur deux conditions : une stratégie de déploiement progressive qui maintient des pods sains pendant la transition, et des probes de santé correctement configurées pour que Kubernetes sache quand un pod est prêt à recevoir du trafic. À cela s'ajoutent les contraintes de ressources et de sécurité qui complètent une configuration production-ready.

<!--truncate-->

## Stratégies de déploiement

Kubernetes propose deux stratégies pour les Deployments.

`Recreate` arrête tous les pods avant d'en créer de nouveaux. Elle provoque une interruption de service et se réserve aux cas où deux versions ne peuvent pas coexister simultanément (migration de schéma incompatible, volume `ReadWriteOnce` partagé par les réplicas).

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

`maxSurge: 1` autorise temporairement un pod supplémentaire. Avec 3 réplicas, Kubernetes peut monter à 4 pods pendant la transition. Les deux paramètres acceptent aussi un pourcentage ; leur valeur par défaut est `25%` chacun, arrondi au supérieur pour `maxSurge` et à l'inférieur pour `maxUnavailable`. Pour 3 réplicas, les valeurs par défaut donnent donc `maxSurge: 1` et `maxUnavailable: 0`.

### Séquence de transition

Pour un Deployment de 3 réplicas passant de v1 à v2 :

```text
T+0s  : [v1] [v1] [v1]              → état initial
T+5s  : [v1] [v1] [v1] [v2↑]        → pod v2 en démarrage (maxSurge=1)
T+15s : [v1] [v1] [v2] [v2↑]        → 1er v2 prêt : un v1 supprimé, un 2e v2 créé
T+25s : [v1] [v2] [v2] [v2↑]        → 2e v2 prêt : un v1 supprimé, un 3e v2 créé
T+35s : [v2] [v2] [v2]              → 3e v2 prêt, dernier v1 supprimé
```

Techniquement, le Deployment crée un nouveau ReplicaSet pour v2 et fait varier le nombre de réplicas des deux ReplicaSets en respectant les bornes `maxSurge` et `maxUnavailable`. La readinessProbe est le mécanisme qui rend cela possible : tant qu'un pod v2 ne répond pas avec succès (code HTTP entre 200 et 399) sur son endpoint de santé, Kubernetes ne l'intègre pas au Service et ne supprime pas de pod v1. Un rollout bloqué (nouvelle version jamais prête) est signalé après `progressDeadlineSeconds` (600 s par défaut) ; les pods v1 restants continuent alors de servir le trafic.

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
          periodSeconds: 10
        lifecycle:
          preStop:
            exec:
              command: ["sleep", "5"]   # laisser le temps au retrait du pod des endpoints
```

Les trois probes ont des rôles distincts : `startupProbe` évite les faux positifs pendant le démarrage lent d'une application (liveness et readiness ne sont évaluées qu'après sa réussite, soit ici jusqu'à 300 s de démarrage toléré), `readinessProbe` contrôle l'intégration dans le Service, `livenessProbe` déclenche le redémarrage du conteneur s'il est bloqué. Une liveness probe ne doit vérifier que le processus lui-même : si elle teste une dépendance (base de données), une panne de cette dépendance fait redémarrer en boucle tous les pods, sans rien corriger.

À la suppression d'un pod v1, deux actions démarrent **en parallèle** : le kubelet exécute le hook `preStop` puis envoie `SIGTERM` au conteneur, tandis que le contrôleur d'endpoints retire le pod du Service, retrait que kube-proxy et les load balancers ne répercutent qu'après un délai. Sans précaution, l'application peut s'arrêter alors que du trafic lui est encore envoyé, d'où des erreurs 502 pendant le rollout. Le `sleep` du hook `preStop` retarde le `SIGTERM` de quelques secondes, le temps que le pod ne reçoive plus de nouvelles requêtes ; les versions récentes de Kubernetes proposent aussi une action native `preStop: sleep: seconds: 5`, sans binaire `sleep` dans l'image. L'application doit ensuite traiter `SIGTERM` en terminant les requêtes en cours avant de s'arrêter.

`terminationGracePeriodSeconds: 30` borne la durée totale de cet arrêt (hook `preStop` compris) : au-delà, le conteneur reçoit `SIGKILL` et les requêtes encore en cours sont coupées.

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

`requests` sert au scheduling : Kubernetes place le pod sur un nœud dont la capacité allouable non encore réservée par d'autres requests couvre au moins 100m CPU et 128Mi de RAM. Le scheduler raisonne sur les réservations, pas sur la consommation réelle. À l'exécution, la request CPU fixe aussi le poids du conteneur dans le partage du processeur en cas de contention (100m = un dixième de cœur).

`limits` sert au contrôle à l'exécution, avec des effets différents selon la ressource :

- **CPU** (ressource compressible) : au-delà de 500m, le noyau limite le conteneur via le quota CFS des cgroups (50 ms de temps CPU par période de 100 ms). Le processus est ralenti (*throttling*), jamais tué ; ce ralentissement se traduit par une hausse de latence, ce qui conduit certains opérateurs à ne définir que la request CPU.
- **Mémoire** (ressource incompressible) : au-delà de 512Mi, le noyau tue le processus (OOM kill, raison `OOMKilled`) et le kubelet redémarre le conteneur selon sa `restartPolicy`.

Les valeurs de `requests` et `limits` déterminent la **classe de QoS** du pod, qui fixe l'ordre d'éviction lorsque le nœud manque de mémoire :

| Classe | Condition | Éviction sous pression mémoire |
|--------|-----------|-------------------------------|
| `Guaranteed` | requests = limits pour CPU et mémoire, sur tous les conteneurs | en dernier |
| `Burstable` | au moins une request ou limit définie, sans remplir la condition précédente | selon le dépassement de la request mémoire |
| `BestEffort` | aucune request ni limit | en premier |

Ne pas définir de `limits` mémoire dans un cluster partagé expose les autres pods du nœud : un pod peut consommer toute la RAM disponible et provoquer leur éviction. Ne pas définir de `requests` fausse les décisions du scheduler, qui considère le pod comme gratuit, et empêche le HPA de calculer une utilisation en pourcentage.

## Security context

Le security context restreint les permissions du conteneur selon le principe du moindre privilège.

```yaml
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 1000
    seccompProfile:
      type: RuntimeDefault   # filtre des appels système par défaut du runtime
  containers:
  - name: api
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop:
          - ALL
```

`runAsNonRoot: true` interdit l'exécution en root : le kubelet refuse de démarrer un conteneur dont l'UID effectif serait 0. Ici, `runAsUser: 1000` remplace l'utilisateur défini par l'image ; sans `runAsUser`, c'est l'instruction `USER` de l'image qui est vérifiée, et elle doit alors être numérique (un nom comme `USER app` ne peut pas être contrôlé et le conteneur est refusé). `fsGroup: 1000` rend les volumes montés accessibles en écriture à ce groupe. `capabilities: drop: ALL` supprime toutes les capabilities Linux (CAP_SYS_ADMIN, CAP_NET_BIND_SERVICE, etc.) — le conteneur ne peut pas interagir avec le kernel au-delà de ce qu'un processus non privilégié peut faire normalement. `readOnlyRootFilesystem: true` monte le système de fichiers racine en lecture seule — tout ce qui doit être écrit doit passer par un volume explicite. Cet ensemble de réglages correspond au profil `restricted` des Pod Security Standards, que l'admission Pod Security peut imposer à tout un namespace (label `pod-security.kubernetes.io/enforce: restricted`).

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

# Terminal 2 — trafic continu, depuis un pod du cluster (le nom du Service n'est résolu qu'à l'intérieur)
kubectl run load --rm -it --image=curlimages/curl --restart=Never -- \
  sh -c 'while true; do curl -s -o /dev/null -w "%{http_code}\n" http://mon-service/health; sleep 0.5; done'

# Terminal 3 — déclencher la mise à jour
kubectl set image deployment/api api=myapp:v2

# Tous les codes retournés doivent être 200
```

Des codes 502 ou 503, ou des connexions refusées (code `000`), signalent un défaut de la chaîne décrite plus haut : readiness probe absente ou trop permissive, absence de délai `preStop`, ou application qui ne traite pas `SIGTERM`. La répartition des réplicas sur plusieurs nœuds et leur protection pendant les maintenances font l'objet de l'article [PodDisruptionBudget et haute disponibilité](./2026-04-03-kubernetes-haute-disponibilite-pdb.md).

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/personnel/task-horizon" title="TaskHorizon">Rolling restart automatique du frontend nginx déclenché par une annotation de checksum sur son ConfigMap, dans un chart Helm unique qui déploie les environnements test, staging et production.</ProjectLink>
</ProjectLinks>
