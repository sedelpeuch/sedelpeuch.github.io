---
title: "Prometheus"
description: "Prometheus, l'outil de monitoring et d'alerting open-source devenu incontournable dans l'écosystème Cloud Native."
tags: [monitoring, devops]
---

Prometheus est un système de monitoring et d'alerting open-source qui s'est imposé comme la référence dans l'écosystème Cloud Native. Conçu initialement chez SoundCloud en 2012, Prometheus est aujourd'hui un projet gradué de la Cloud Native Computing Foundation (CNCF). Cet article explore l'installation, le fonctionnement et les bases du langage de requête PromQL. 📊

<!--truncate-->

## Qu'est-ce que Prometheus ? 🤔

Prometheus est un système de monitoring qui collecte et stocke des métriques sous forme de séries temporelles (time-series). Il se distingue par :

- **Architecture pull** : Prometheus récupère activement les métriques depuis les cibles
- **Modèle de données multi-dimensionnel** : métriques identifiées par un nom et des labels (clé-valeur)
- **Langage de requête puissant** : PromQL pour interroger et agréger les données
- **Système d'alerting intégré** : définition de règles d'alerte directement dans Prometheus
- **Découverte de services** : intégration native avec Kubernetes, Consul, etc.
- **Stockage local** : pas de dépendance à un système de stockage distribué

## Architecture de Prometheus 🏗️

L'architecture de Prometheus se compose de plusieurs éléments :

```
┌─────────────────────────────────────────────────────────┐
│                    Prometheus Server                     │
│                                                           │
│  ┌───────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Retrieval   │  │   Storage    │  │  HTTP Server │ │
│  │   (Scraping)  │─▶│  (TSDB)      │◀─│  (PromQL)    │ │
│  └───────────────┘  └──────────────┘  └──────────────┘ │
│         │                                      ▲         │
└─────────┼──────────────────────────────────────┼─────────┘
          │                                      │
          ▼                                      │
  ┌───────────────┐                    ┌─────────────────┐
  │   Exporters   │                    │   Grafana /     │
  │   (Metrics)   │                    │   API Clients   │
  └───────────────┘                    └─────────────────┘
          │
  ┌───────┴────────┐
  │  Pushgateway   │  (pour jobs courts)
  └────────────────┘
          │
  ┌───────┴─────────┐
  │  Alertmanager   │  (gestion des alertes)
  └─────────────────┘
```

**Composants principaux :**

- **Prometheus Server** : collecte, stocke et permet d'interroger les métriques
- **Exporters** : exposent les métriques des systèmes tiers au format Prometheus
- **Pushgateway** : permet aux jobs courts de pousser leurs métriques
- **Alertmanager** : gère les alertes (déduplication, groupage, routage, notifications)

## Installation de Prometheus 🚀

### Installation avec Docker

La méthode la plus simple pour tester Prometheus :

```bash
# Télécharger et lancer Prometheus
docker run -d \
  --name prometheus \
  -p 9090:9090 \
  -v $(pwd)/prometheus.yml:/etc/prometheus/prometheus.yml \
  prom/prometheus
```

### Installation binaire

Pour une installation plus traditionnelle :

```bash
# Télécharger la dernière version
wget https://github.com/prometheus/prometheus/releases/download/v2.45.0/prometheus-2.45.0.linux-amd64.tar.gz

# Extraire
tar xvfz prometheus-2.45.0.linux-amd64.tar.gz
cd prometheus-2.45.0.linux-amd64

# Lancer Prometheus
./prometheus --config.file=prometheus.yml
```

### Installation sur Kubernetes avec Helm

Pour déployer Prometheus dans un cluster Kubernetes :

```bash
# Ajouter le repo Helm de Prometheus
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Installer Prometheus
helm install prometheus prometheus-community/prometheus \
  --namespace monitoring \
  --create-namespace

# Vérifier le déploiement
kubectl get pods -n monitoring
```

### Configuration de base

Créez un fichier `prometheus.yml` avec la configuration minimale :

```yaml
global:
  scrape_interval: 15s      # Intervalle de collecte par défaut
  evaluation_interval: 15s  # Intervalle d'évaluation des règles
  external_labels:
    cluster: 'dev'
    environment: 'development'

# Règles d'alerting (optionnel)
rule_files:
  - "rules/*.yml"

# Configuration des cibles à scraper
scrape_configs:
  # Prometheus se monitore lui-même
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
        labels:
          instance: 'prometheus-server'

  # Exemple : monitorer Node Exporter
  - job_name: 'node-exporter'
    static_configs:
      - targets: ['localhost:9100']
        labels:
          instance: 'server-01'
```

## Concepts de base : Métriques et Scraping 📈

### Les types de métriques

Prometheus supporte quatre types de métriques :

1. **Counter** : compteur qui ne peut qu'augmenter (ou se réinitialiser à 0)

   ```
   http_requests_total{method="GET", status="200"} 1234
   ```

   Exemples : nombre de requêtes, erreurs, tâches complétées

2. **Gauge** : valeur qui peut augmenter ou diminuer

   ```
   memory_usage_bytes{instance="server-01"} 8589934592
   ```

   Exemples : température, mémoire utilisée, nombre de connexions actives

3. **Histogram** : échantillonne des observations et les compte dans des buckets

   ```
   http_request_duration_seconds_bucket{le="0.1"} 100
   http_request_duration_seconds_bucket{le="0.5"} 250
   http_request_duration_seconds_bucket{le="1.0"} 300
   ```

   Exemples : durée de requêtes, taille de réponses

4. **Summary** : similaire à histogram, mais calcule des quantiles côté client

   ```
   http_request_duration_seconds{quantile="0.5"} 0.23
   http_request_duration_seconds{quantile="0.9"} 0.87
   http_request_duration_seconds{quantile="0.99"} 1.2
   ```

### Le modèle de données

Chaque métrique dans Prometheus est identifiée par :

- **Nom de la métrique** : décrit ce qui est mesuré
- **Labels** : paires clé-valeur pour distinguer les dimensions

Exemple :

```
api_http_requests_total{method="POST", handler="/users", status="200"} 1234
```

- Nom : `api_http_requests_total`
- Labels : `method="POST"`, `handler="/users"`, `status="200"`
- Valeur : `1234`

### Le processus de scraping

Le scraping est le processus par lequel Prometheus collecte les métriques :

1. **Prometheus initie la connexion** vers la cible (pull model)
2. **Requête HTTP GET** sur l'endpoint `/metrics`
3. **Réception des métriques** au format texte Prometheus
4. **Stockage** dans la base de données time-series

Exemple de réponse d'un endpoint `/metrics` :

```
# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter
http_requests_total{method="GET",status="200"} 1234
http_requests_total{method="GET",status="404"} 42
http_requests_total{method="POST",status="200"} 567

# HELP memory_usage_bytes Current memory usage in bytes
# TYPE memory_usage_bytes gauge
memory_usage_bytes 8589934592

# HELP http_request_duration_seconds HTTP request duration
# TYPE http_request_duration_seconds histogram
http_request_duration_seconds_bucket{le="0.1"} 100
http_request_duration_seconds_bucket{le="0.5"} 250
http_request_duration_seconds_bucket{le="1.0"} 300
http_request_duration_seconds_sum 187.5
http_request_duration_seconds_count 300
```

## Exporters : collecter des métriques 📡

Les exporters sont des programmes qui exposent des métriques de systèmes tiers au format Prometheus.

### Node Exporter (métriques système)

```bash
# Installation avec Docker
docker run -d \
  --name node-exporter \
  --net="host" \
  --pid="host" \
  -v "/:/host:ro,rslave" \
  prom/node-exporter \
  --path.rootfs=/host

# Configuration dans prometheus.yml
scrape_configs:
  - job_name: 'node'
    static_configs:
      - targets: ['localhost:9100']
```

### Exporters populaires

- **node_exporter** : métriques système (CPU, mémoire, disque, réseau)
- **blackbox_exporter** : probes HTTP, TCP, ICMP, DNS
- **mysqld_exporter** : métriques MySQL/MariaDB
- **postgres_exporter** : métriques PostgreSQL
- **redis_exporter** : métriques Redis
- **nginx_exporter** : métriques Nginx
- **kube-state-metrics** : métriques d'état Kubernetes

## Introduction à PromQL 📊

PromQL (Prometheus Query Language) est le langage de requête pour interroger les métriques.

### Requêtes de base

```promql
# Sélectionner toutes les séries d'une métrique
http_requests_total

# Filtrer par label
http_requests_total{method="GET"}

# Filtrer avec plusieurs labels
http_requests_total{method="GET", status="200"}

# Opérateurs de correspondance
http_requests_total{status=~"2.."} # Regex: status commence par 2
http_requests_total{status!="200"} # status différent de 200
http_requests_total{method=~"GET|POST"} # method est GET ou POST
```

### Sélecteurs temporels

```promql
# Valeur actuelle
http_requests_total

# Plage de temps (range vector)
http_requests_total[5m] # Les 5 dernières minutes

# Décalage temporel (offset)
http_requests_total offset 5m # Valeur d'il y a 5 minutes
http_requests_total[1h] offset 1d # Les valeurs d'hier sur 1h
```

### Fonctions courantes

```promql
# Rate : taux de changement par seconde (pour les counters)
rate(http_requests_total[5m])

# Increase : augmentation totale sur une période
increase(http_requests_total[1h])

# Sum : somme des valeurs
sum(http_requests_total)

# Sum by : grouper par label
sum by (method) (http_requests_total)

# Avg : moyenne
avg(cpu_usage_percent)

# Max / Min
max(memory_usage_bytes)
min(disk_free_bytes)

# Count : nombre de séries
count(up == 1) # Nombre de cibles up
```

### Opérations mathématiques

```promql
# Opérations arithmétiques
node_memory_MemTotal_bytes - node_memory_MemFree_bytes

# Pourcentage
(node_memory_MemTotal_bytes - node_memory_MemFree_bytes) / node_memory_MemTotal_bytes * 100

# Comparaisons
up == 1 # Toutes les cibles actives
http_requests_total > 1000 # Requêtes supérieures à 1000
```

### Agrégations avancées

```promql
# Grouper par plusieurs labels
sum by (method, status) (rate(http_requests_total[5m]))

# Exclure des labels du groupage
sum without (instance) (rate(http_requests_total[5m]))

# Top K
topk(5, http_requests_total) # Top 5 des séries

# Bottom K
bottomk(3, rate(cpu_usage[5m])) # Bottom 3 des taux CPU
```

### Exemples pratiques

```promql
# Taux de requêtes HTTP par seconde
rate(http_requests_total[5m])

# Taux d'erreur HTTP (5xx)
sum(rate(http_requests_total{status=~"5.."}[5m]))
/
sum(rate(http_requests_total[5m]))

# Utilisation mémoire en pourcentage
100 * (1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes))

# Utilisation disque en pourcentage
100 * (node_filesystem_size_bytes - node_filesystem_free_bytes) / node_filesystem_size_bytes

# Latence p95 (histogram)
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))

# Prédiction : disque plein dans combien de temps ?
predict_linear(node_filesystem_free_bytes[1h], 4*3600) < 0
```

## Interface Web de Prometheus 🖥️

Prometheus embarque une interface web accessible sur `http://localhost:9090` :

### Onglet Graph

Permet d'exécuter des requêtes PromQL et de visualiser les résultats sous forme de graphique ou de tableau.

### Onglet Alerts

Affiche l'état des règles d'alerting et les alertes actives.

### Onglet Status

- **Targets** : état des cibles scrapées (up/down)
- **Configuration** : configuration actuelle de Prometheus
- **Rules** : règles d'alerting et d'enregistrement chargées
- **Service Discovery** : cibles découvertes dynamiquement

## Découverte de services 🔍

Prometheus peut découvrir automatiquement les cibles à monitorer.

### Découverte Kubernetes

```yaml
scrape_configs:
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      # Ne scraper que les pods avec l'annotation prometheus.io/scrape
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      # Utiliser le port défini dans l'annotation
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_port]
        action: replace
        target_label: __address__
        regex: ([^:]+)(?::\d+)?;(\d+)
        replacement: $1:$2
      # Ajouter des labels depuis les annotations
      - action: labelmap
        regex: __meta_kubernetes_pod_label_(.+)
```

### Découverte avec fichiers

```yaml
scrape_configs:
  - job_name: 'file_sd'
    file_sd_configs:
      - files:
          - 'targets/*.json'
          - 'targets/*.yml'
        refresh_interval: 5m
```

Fichier `targets/web-servers.json` :

```json
[
  {
    "targets": ["web-01:9100", "web-02:9100"],
    "labels": {
      "job": "web-servers",
      "environment": "production"
    }
  }
]
```

## Bonnes pratiques 👍

1. **Nommer les métriques correctement** :
   - Format : `namespace_subsystem_unit_suffix`
   - Exemple : `http_requests_total`, `node_cpu_seconds_total`

2. **Utiliser des labels judicieusement** :
   - Labels pour les dimensions importantes (method, status, instance)
   - Éviter les labels avec une cardinalité élevée (user_id, request_id)

3. **Choisir le bon intervalle de scraping** :
   - 15-60s pour la plupart des cas
   - Plus court pour des systèmes critiques
   - Plus long pour des métriques qui changent lentement

4. **Utiliser rate() pour les counters** :
   - Ne jamais afficher un counter brut (il ne fait qu'augmenter)
   - Toujours utiliser `rate()` ou `increase()`

5. **Définir des alertes pertinentes** :
   - Alerter sur les symptômes, pas sur les causes
   - Éviter les alertes redondantes
   - Prévoir des périodes de silence (for: 5m)

## Application / Projet lié

### [Cluster Kubernetes SONU](/docs/projects/professionnel/sonu-k8s-cluster)
**Utilisation** : Prometheus comme backend métrique du cluster pour monitorer tous les services hébergés (Grafana, Portainer, nodes Kubernetes).

## Conclusion 🎯

Prometheus est devenu l'outil de monitoring de référence dans l'écosystème Cloud Native. Sa simplicité d'installation, son modèle de données flexible et son langage de requête puissant en font un choix excellent pour monitorer les infrastructures modernes.

Les prochains articles aborderont :

- La création de dashboards avec Grafana
- La configuration d'alertes avec Alertmanager
- Le monitoring d'applications Kubernetes
- L'optimisation des performances et du stockage

## Ressources utiles 📚

- [Documentation officielle Prometheus](https://prometheus.io/docs/)
- [PromQL Cheat Sheet](https://promlabs.com/promql-cheat-sheet/)
- [Awesome Prometheus](https://github.com/roaldnefs/awesome-prometheus)
- [Prometheus Exporters](https://prometheus.io/docs/instrumenting/exporters/)
