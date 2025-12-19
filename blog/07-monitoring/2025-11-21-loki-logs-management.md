---
title: "Loki : Gestion moderne des logs pour Kubernetes et au-delà"
description: "Loki, le système de gestion de logs inspiré de Prometheus, conçu pour être simple, efficace et économique."
tags: [Loki, Logs, Monitoring, Observabilité, DevOps, Kubernetes]
---

Loki est un système d'agrégation de logs horizontalement scalable, hautement disponible et multi-tenant, inspiré par Prometheus. Créé par Grafana Labs, Loki se distingue par son approche minimaliste : plutôt que d'indexer le contenu des logs, il n'indexe que les métadonnées (labels), ce qui le rend extrêmement efficace et économique. 📝

<!--truncate-->

## Qu'est-ce que Loki ? 🤔

Loki est souvent décrit comme "Prometheus, mais pour les logs". Il partage plusieurs concepts avec Prometheus :

- **Modèle de données basé sur les labels** : identification des flux de logs par des labels
- **Langage de requête puissant** : LogQL, inspiré de PromQL
- **Intégration native avec Grafana** : visualisation unifiée des métriques et logs
- **Architecture cloud-native** : conçu pour Kubernetes et les microservices

### Pourquoi Loki ? 🎯

Les systèmes de logs traditionnels (ELK, Splunk) indexent tout le contenu des logs, ce qui :

- **Coûte cher** en stockage et en ressources de calcul
- **Est lent** à l'ingestion pour de gros volumes
- **Nécessite** une infrastructure complexe

Loki adopte une approche différente :

- **N'indexe que les métadonnées** (labels), pas le contenu
- **Stocke les logs compressés** de manière séquentielle
- **Utilise le stockage objet** (S3, GCS, etc.) pour réduire les coûts
- **Requêtes rapides** grâce aux labels indexés

## Architecture de Loki 🏗️

L'architecture de Loki se compose de plusieurs composants :

```
┌─────────────────────────────────────────────────────────────┐
│                         Applications                         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
              ┌─────────────┐
              │  Promtail   │  (Agent de collecte)
              └──────┬──────┘
                     │
                     ▼
         ┌───────────────────────┐
         │   Loki Distributor    │  (Point d'entrée)
         └──────────┬────────────┘
                    │
         ┌──────────┴──────────┐
         │                     │
         ▼                     ▼
    ┌─────────┐          ┌─────────┐
    │ Ingester│          │ Ingester│  (Buffer + Écriture)
    └────┬────┘          └────┬────┘
         │                    │
         └──────────┬─────────┘
                    │
                    ▼
            ┌──────────────┐
            │   Storage    │  (S3, GCS, Filesystem)
            └──────┬───────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
   ┌─────────┐          ┌─────────┐
   │ Querier │          │ Querier │  (Lecture)
   └────┬────┘          └────┬────┘
        │                    │
        └──────────┬─────────┘
                   │
                   ▼
            ┌────────────┐
            │  Grafana   │  (Visualisation)
            └────────────┘
```

### Composants principaux

1. **Promtail** : Agent qui collecte les logs et les envoie à Loki
2. **Distributor** : Reçoit les logs et les distribue aux ingesters
3. **Ingester** : Tampon en mémoire qui écrit les logs par batch dans le stockage
4. **Querier** : Traite les requêtes LogQL
5. **Storage** : Stockage backend (filesystem, S3, GCS, etc.)

## Installation de Loki 🚀

### Installation avec Docker Compose

La méthode la plus simple pour tester localement :

```yaml
# docker-compose.yml
version: "3"

services:
  loki:
    image: grafana/loki:2.9.0
    ports:
      - "3100:3100"
    command: -config.file=/etc/loki/local-config.yaml
    volumes:
      - ./loki-data:/loki

  promtail:
    image: grafana/promtail:2.9.0
    volumes:
      - /var/log:/var/log
      - ./promtail-config.yml:/etc/promtail/config.yml
    command: -config.file=/etc/promtail/config.yml

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana-storage:/var/lib/grafana

volumes:
  grafana-storage:
```

```bash
# Démarrer la stack
docker-compose up -d
```

### Installation sur Kubernetes avec Helm

```bash
# Ajouter le repo Helm de Grafana
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

# Installer Loki (mode simple)
helm install loki grafana/loki-stack \
  --namespace monitoring \
  --create-namespace \
  --set grafana.enabled=true \
  --set prometheus.enabled=true \
  --set promtail.enabled=true

# Vérifier le déploiement
kubectl get pods -n monitoring
```

### Installation distribuée sur Kubernetes

Pour la production, utilisez le mode distribué :

```bash
# Installer Loki en mode distribué
helm install loki grafana/loki-distributed \
  --namespace monitoring \
  --create-namespace \
  --set loki.schemaConfig.configs[0].from="2024-01-01" \
  --set loki.schemaConfig.configs[0].store=boltdb-shipper \
  --set loki.schemaConfig.configs[0].object_store=s3 \
  --set loki.storageConfig.boltdb_shipper.shared_store=s3 \
  --set loki.storageConfig.aws.s3=s3://region/bucket
```

## Configuration de Promtail 📋

Promtail est l'agent qui collecte les logs et les envoie à Loki.

### Configuration de base

Créez un fichier `promtail-config.yml` :

```yaml
server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  # Collecter les logs système
  - job_name: system
    static_configs:
      - targets:
          - localhost
        labels:
          job: varlogs
          host: my-server
          __path__: /var/log/*.log

  # Collecter les logs d'une application
  - job_name: myapp
    static_configs:
      - targets:
          - localhost
        labels:
          job: myapp
          environment: production
          __path__: /app/logs/*.log
```

### Configuration avancée avec pipeline

Promtail peut parser et enrichir les logs avant de les envoyer :

```yaml
scrape_configs:
  - job_name: nginx
    static_configs:
      - targets:
          - localhost
        labels:
          job: nginx
          __path__: /var/log/nginx/access.log

    pipeline_stages:
      # Parser le format de log nginx
      - regex:
          expression: '^(?P<ip>\S+) \S+ \S+ \[(?P<time>[^\]]+)\] "(?P<method>\S+) (?P<path>\S+) \S+" (?P<status>\d+) (?P<size>\d+)'

      # Extraire des labels depuis les champs parsés
      - labels:
          method:
          status:
          path:

      # Ajouter un timestamp
      - timestamp:
          source: time
          format: '02/Jan/2006:15:04:05 -0700'

      # Filtrer certains logs (optionnel)
      - match:
          selector: '{status="200"}'
          action: drop
```

### Configuration pour Kubernetes

Promtail peut automatiquement découvrir les pods Kubernetes :

```yaml
scrape_configs:
  - job_name: kubernetes-pods
    kubernetes_sd_configs:
      - role: pod

    relabel_configs:
      # Extraire les métadonnées Kubernetes
      - source_labels:
          - __meta_kubernetes_pod_node_name
        target_label: __host__

      - action: labelmap
        regex: __meta_kubernetes_pod_label_(.+)

      - source_labels:
          - __meta_kubernetes_namespace
        target_label: namespace

      - source_labels:
          - __meta_kubernetes_pod_name
        target_label: pod

      - source_labels:
          - __meta_kubernetes_pod_container_name
        target_label: container

      - replacement: /var/log/pods/*$1/*.log
        separator: /
        source_labels:
          - __meta_kubernetes_pod_uid
          - __meta_kubernetes_pod_container_name
        target_label: __path__
```

## Introduction à LogQL 🔍

LogQL est le langage de requête de Loki, inspiré de PromQL.

### Sélecteurs de flux de logs

```logql
# Sélectionner par label exact
{job="nginx"}

# Combiner plusieurs labels
{job="nginx", environment="production"}

# Opérateurs de correspondance
{job=~"nginx|apache"}  # Regex: nginx OU apache
{status!="200"}        # status différent de 200
{path=~"/api/.*"}      # path commence par /api/
```

### Filtres de lignes

```logql
# Rechercher une chaîne de caractères
{job="nginx"} |= "error"

# Exclure une chaîne
{job="nginx"} != "debug"

# Utiliser des regex
{job="nginx"} |~ "error|ERROR|Error"

# Combiner plusieurs filtres
{job="nginx"} |= "error" != "timeout"
```

### Parsers

```logql
# Parser JSON
{job="myapp"} | json

# Parser JSON et extraire des champs
{job="myapp"} | json | level="error"

# Parser avec regex
{job="nginx"} | regexp "(?P<method>\\w+) (?P<path>\\S+)"

# Parser logfmt
{job="myapp"} | logfmt
```

### Filtres de labels extraits

```logql
# Après parsing, filtrer sur les labels extraits
{job="myapp"} | json | level="error"

# Utiliser les opérateurs de comparaison
{job="nginx"} | json | status >= 400

# Combiner avec des filtres de lignes
{job="myapp"} | json | level="error" |= "database"
```

### Agrégations et fonctions

```logql
# Compter le nombre de lignes
count_over_time({job="nginx"}[5m])

# Taux de logs par seconde
rate({job="nginx"}[5m])

# Somme des octets
sum(rate({job="nginx"} | json | unwrap bytes[5m]))

# Compter par label
sum by (status) (count_over_time({job="nginx"} | json [5m]))

# Moyenne d'une valeur numérique
avg(rate({job="myapp"} | json | unwrap response_time [5m]))

# Quantiles (p95, p99)
quantile_over_time(0.95, {job="myapp"} | json | unwrap duration [5m])
```

### Exemples pratiques

```logql
# Tous les logs d'erreur des 5 dernières minutes
{job="myapp"} |= "error" [5m]

# Taux d'erreurs HTTP 5xx
sum(rate({job="nginx"} | json | status >= 500 [5m]))

# Top 5 des chemins les plus appelés
topk(5, sum by (path) (rate({job="nginx"} | json [5m])))

# Logs d'erreur dans un namespace Kubernetes spécifique
{namespace="production"} |= "error" | json | level="error"

# Durée moyenne des requêtes API
avg(rate({job="api"} | json | unwrap duration [5m]))

# Logs avec un certain pattern dans les dernières heures
{job="myapp"} |~ "database.*timeout" [1h]

# Grouper par niveau de log et compter
sum by (level) (count_over_time({job="myapp"} | json [5m]))

# Détecter les pics de logs (anomalies)
count_over_time({job="myapp"}[5m]) > 1000
```

## Visualisation avec Grafana 📊

### Ajouter Loki comme source de données

1. Ouvrir Grafana : `http://localhost:3000`
2. Aller dans **Configuration > Data Sources**
3. Cliquer sur **Add data source**
4. Sélectionner **Loki**
5. Configurer l'URL : `http://loki:3100`
6. Cliquer sur **Save & Test**

### Créer un dashboard

```jsonnet
// Exemple de panel Grafana avec LogQL
{
  "datasource": "Loki",
  "targets": [
    {
      "expr": "sum by (level) (count_over_time({job=\"myapp\"} | json [5m]))",
      "refId": "A"
    }
  ],
  "title": "Logs par niveau",
  "type": "timeseries"
}
```

### Explorer les logs

L'onglet **Explore** de Grafana permet d'explorer les logs interactivement :

1. Sélectionner **Loki** comme source de données
2. Utiliser le builder de requête ou écrire du LogQL
3. Visualiser les résultats en temps réel
4. Filtrer, parser et agréger les logs

## Intégration avec Kubernetes 🚢

### Collecter les logs de pods

Avec Promtail déployé en DaemonSet, les logs de tous les pods sont automatiquement collectés.

### Annoter les pods pour enrichir les logs

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp
  labels:
    app: myapp
    version: v1.2.3
  annotations:
    loki.io/scrape: "true"
    loki.io/parser: "json"
spec:
  containers:
    - name: myapp
      image: myapp:1.2.3
```

### Requêtes LogQL pour Kubernetes

```logql
# Logs d'un pod spécifique
{pod="myapp-5d8f7c8b9-abc12"}

# Logs d'un namespace
{namespace="production"}

# Logs d'une application (via label)
{app="myapp"}

# Logs d'erreur dans tous les pods d'une app
{app="myapp"} |= "error"

# Combiner plusieurs filtres Kubernetes
{namespace="production", app="api"} | json | level="error"
```

## Bonnes pratiques 👍

### 1. Utiliser des labels efficacement

```yaml
# ✅ BON : Labels avec cardinalité faible
labels:
  environment: production
  app: myapp
  level: error

# ❌ MAUVAIS : Labels avec cardinalité élevée
labels:
  user_id: "123456"      # Éviter
  request_id: "abc-def"  # Éviter
  timestamp: "..."       # Éviter
```

### 2. Structurer les logs en JSON

```python
# Python avec structlog
import structlog

log = structlog.get_logger()
log.info(
    "user_login",
    user_id="12345",
    ip="192.168.1.1",
    status="success"
)
```

Sortie :
```json
{"event": "user_login", "user_id": "12345", "ip": "192.168.1.1", "status": "success", "timestamp": "2025-11-15T10:00:00Z"}
```

### 3. Optimiser les requêtes LogQL

```logql
# ✅ BON : Filtrer d'abord avec des labels
{job="nginx", status="500"}

# ❌ MOINS BON : Filtrer seulement avec le contenu
{job="nginx"} |= "500"

# ✅ BON : Utiliser des plages temporelles courtes
{job="nginx"}[5m]

# ❌ MAUVAIS : Plages temporelles très longues
{job="nginx"}[24h]
```

### 4. Configurer la rétention des logs

```yaml
# loki-config.yaml
limits_config:
  retention_period: 744h  # 31 jours

table_manager:
  retention_deletes_enabled: true
  retention_period: 744h
```

### 5. Utiliser le multi-tenancy

```yaml
# Configuration Loki pour multi-tenancy
auth_enabled: true

# Promtail avec tenant_id
clients:
  - url: http://loki:3100/loki/api/v1/push
    tenant_id: team-a
```

## Cas d'usage avancés 🚀

### Alerting avec Loki et Prometheus

La création d'alertes basées sur les logs est possible via le ruler Loki ou en exposant des métriques à Prometheus :

```yaml
# Recording rules dans Loki
groups:
  - name: logs
    interval: 1m
    rules:
      - record: log_error_rate
        expr: |
          sum by (app) (rate({job="myapp"} |= "error" [5m]))
```

### Tracer les requêtes entre services

Utiliser le trace ID dans les logs pour corréler les logs entre microservices :

```logql
# Rechercher tous les logs d'une trace
{job="myapp"} | json | trace_id="abc123"
```

### Détecter les anomalies

```logql
# Comparer le taux actuel au taux habituel
(
  sum(rate({job="myapp"}[5m]))
  /
  avg_over_time(sum(rate({job="myapp"}[5m]))[1h:5m])
) > 2
```

## Conclusion 🎯

Loki révolutionne la gestion des logs en adoptant une approche minimaliste et efficace. Son intégration native avec Grafana et sa compatibilité avec l'écosystème Prometheus en font un choix excellent pour les infrastructures cloud-native.

Les points clés à retenir :

- **Économique** : pas d'indexation du contenu, stockage objet
- **Performant** : indexation des labels seulement
- **Simple** : architecture inspirée de Prometheus
- **Puissant** : LogQL pour requêter et agréger les logs
- **Cloud-native** : parfait pour Kubernetes

Les prochains articles aborderont la combinaison de Loki avec Prometheus et Grafana pour une stack d'observabilité complète.

## Ressources utiles 📚

- [Documentation officielle Loki](https://grafana.com/docs/loki/)
- [LogQL Cheat Sheet](https://grafana.com/docs/loki/latest/logql/)
- [Best practices Loki](https://grafana.com/docs/loki/latest/best-practices/)
- [Promtail configuration](https://grafana.com/docs/loki/latest/clients/promtail/)
