---
title: "Prometheus"
description: "Prometheus, système de monitoring et d'alerting open source de l'écosystème Cloud Native : architecture pull, types de métriques, PromQL, règles d'alerte et découverte de services."
tags: [monitoring, devops]
---

Prometheus est un système de monitoring et d'alerting open source, standard de fait pour les métriques dans l'écosystème Cloud Native. Conçu initialement chez SoundCloud en 2012, il est aujourd'hui un projet gradué de la Cloud Native Computing Foundation (CNCF). Cet article couvre son architecture, son installation, son modèle de données et les bases du langage de requête PromQL.

<!--truncate-->

## Qu'est-ce que Prometheus ?

Prometheus est un système de monitoring qui collecte et stocke des métriques sous forme de séries temporelles (time-series). Il se distingue par :

- **Architecture pull** : Prometheus récupère activement les métriques depuis les cibles ; une cible qui ne répond pas est immédiatement détectée (métrique `up` à 0)
- **Modèle de données multi-dimensionnel** : métriques identifiées par un nom et des labels (clé-valeur)
- **Langage de requête dédié** : PromQL pour interroger, agréger et calculer des taux
- **Système d'alerting intégré** : définition de règles d'alerte directement dans Prometheus
- **Découverte de services** : intégration native avec Kubernetes, Consul, etc.
- **Stockage local** : pas de dépendance à un système de stockage distribué ; la rétention longue durée et la haute disponibilité passent par des systèmes complémentaires (Thanos, Mimir, VictoriaMetrics) via le *remote write*

## Architecture de Prometheus

L'architecture de Prometheus se compose de plusieurs éléments :

```text
  Cibles scrapées (HTTP GET /metrics)            Consommateurs
  ┌──────────────────────────┐                 ┌──────────────────┐
  │ Applications instrumentées│                 │ Grafana,         │
  │ Exporters (node, mysql…) │                 │ clients de l'API │
  │ Pushgateway (jobs courts)│                 └────────▲─────────┘
  └────────────▲─────────────┘                          │ PromQL
               │ pull                                   │
┌──────────────┴────────────────────────────────────────┴──────┐
│                       Prometheus Server                       │
│   Retrieval (scraping) ──▶ TSDB (stockage) ◀── API HTTP       │
│   Évaluation des règles (recording et alerting)               │
└──────────────────────────────┬────────────────────────────────┘
                               │ push des alertes déclenchées
                               ▼
                     ┌───────────────────┐
                     │   Alertmanager    │ ──▶ e-mail, Slack, PagerDuty…
                     └───────────────────┘
```

**Composants principaux :**

- **Prometheus Server** : collecte, stocke et permet d'interroger les métriques
- **Exporters** : exposent les métriques des systèmes tiers au format Prometheus
- **Pushgateway** : cache intermédiaire où les jobs courts (batch, cron) poussent leurs métriques avant de se terminer ; Prometheus scrape ensuite la Pushgateway comme n'importe quelle cible
- **Alertmanager** : reçoit les alertes émises par Prometheus et les gère (déduplication, groupage, silences, routage, notifications)

## Installation de Prometheus

### Installation avec Docker

La méthode la plus directe pour tester Prometheus :

```bash
# Lancer Prometheus avec la configuration locale et un volume pour la TSDB
docker run -d \
  --name prometheus \
  -p 9090:9090 \
  -v "$(pwd)/prometheus.yml:/etc/prometheus/prometheus.yml:ro" \
  -v prometheus-data:/prometheus \
  prom/prometheus:v3.5.0
```

### Installation binaire

Pour une installation plus traditionnelle :

```bash
# Version à adapter : github.com/prometheus/prometheus/releases
VERSION=3.5.0
wget "https://github.com/prometheus/prometheus/releases/download/v${VERSION}/prometheus-${VERSION}.linux-amd64.tar.gz"

# Extraire
tar xvfz "prometheus-${VERSION}.linux-amd64.tar.gz"
cd "prometheus-${VERSION}.linux-amd64"

# Lancer Prometheus (données dans ./data, rétention de 15 jours par défaut)
./prometheus --config.file=prometheus.yml --storage.tsdb.retention.time=30d
```

La branche 2.x, encore très répandue dans les tutoriels, a été remplacée par Prometheus 3.0 fin 2024 (nouvelle interface web, compatibilité OpenTelemetry, quelques changements de comportement des sélecteurs de plage).

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

Le chart `prometheus-community/kube-prometheus-stack` est l'alternative la plus courante en production : il installe le Prometheus Operator, Alertmanager, Grafana, node-exporter et kube-state-metrics, avec des tableaux de bord et des règles d'alerte prêts à l'emploi. La configuration des cibles y passe par des ressources `ServiceMonitor` et `PodMonitor` plutôt que par le fichier `prometheus.yml`.

### Configuration de base

Configuration minimale dans un fichier `prometheus.yml` :

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

## Concepts de base : métriques et scraping

### Les types de métriques

Prometheus supporte quatre types de métriques :

1. **Counter** : compteur qui ne peut qu'augmenter (ou se réinitialiser à 0 au redémarrage du processus)

   ```text
   http_requests_total{method="GET", status="200"} 1234
   ```

   Exemples : nombre de requêtes, erreurs, tâches complétées

2. **Gauge** : valeur qui peut augmenter ou diminuer

   ```text
   memory_usage_bytes{instance="server-01"} 8589934592
   ```

   Exemples : température, mémoire utilisée, nombre de connexions actives

3. **Histogram** : échantillonne des observations et les compte dans des buckets

   ```text
   http_request_duration_seconds_bucket{le="0.1"} 100
   http_request_duration_seconds_bucket{le="0.5"} 250
   http_request_duration_seconds_bucket{le="1.0"} 300
   ```

   Exemples : durée de requêtes, taille de réponses

   Les buckets sont **cumulatifs** : `le="0.5"` compte toutes les observations inférieures ou égales à 0,5 s, y compris celles du bucket `le="0.1"`. Un histogramme expose aussi `_sum` et `_count`, d'où l'on tire la moyenne.

4. **Summary** : similaire à histogram, mais calcule des quantiles côté client

   ```text
   http_request_duration_seconds{quantile="0.5"} 0.23
   http_request_duration_seconds{quantile="0.9"} 0.87
   http_request_duration_seconds{quantile="0.99"} 1.2
   ```

   Les quantiles d'un summary sont calculés par chaque instance et **ne peuvent pas être agrégés** : la moyenne des p99 de trois instances n'est pas le p99 global. Les buckets d'un histogramme, eux, s'additionnent entre instances avant le calcul du quantile, ce qui explique que l'histogramme soit généralement préféré.

### Le modèle de données

Chaque métrique dans Prometheus est identifiée par :

- **Nom de la métrique** : décrit ce qui est mesuré
- **Labels** : paires clé-valeur pour distinguer les dimensions

Exemple :

```text
api_http_requests_total{method="POST", handler="/users", status="200"} 1234
```

- Nom : `api_http_requests_total`
- Labels : `method="POST"`, `handler="/users"`, `status="200"`
- Valeur : `1234`

### Le processus de scraping

Le scraping est le processus par lequel Prometheus collecte les métriques :

1. **Prometheus initie la connexion** vers la cible (pull model), à chaque `scrape_interval`
2. **Requête HTTP GET** sur l'endpoint `/metrics`
3. **Réception des métriques** au format texte Prometheus (ou OpenMetrics)
4. **Ajout des labels de cible** (`job`, `instance`, labels de découverte) puis **stockage** dans la base de données time-series

Chaque scrape produit aussi des séries synthétiques : `up` (1 si le scrape a réussi, 0 sinon), `scrape_duration_seconds`, `scrape_samples_scraped`. `up == 0` est la première alerte à définir.

Exemple de réponse d'un endpoint `/metrics` :

```text
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

## Exporters : collecter des métriques

Les exporters sont des programmes qui exposent des métriques de systèmes tiers au format Prometheus.

### Node Exporter (métriques système)

```bash
# Installation avec Docker (réseau et PID de l'hôte, système de fichiers de l'hôte en lecture seule)
docker run -d \
  --name node-exporter \
  --net="host" \
  --pid="host" \
  -v "/:/host:ro,rslave" \
  prom/node-exporter \
  --path.rootfs=/host
```

```yaml
# Configuration dans prometheus.yml
scrape_configs:
  - job_name: 'node'
    static_configs:
      - targets: ['localhost:9100']
```

node_exporter est généralement installé comme service systemd directement sur l'hôte : le conteneur fonctionne, mais doit recevoir l'accès aux espaces de noms de l'hôte pour mesurer la machine et non le conteneur.

### Exporters populaires

- **node_exporter** : métriques système (CPU, mémoire, disque, réseau)
- **blackbox_exporter** : probes HTTP, TCP, ICMP, DNS
- **mysqld_exporter** : métriques MySQL/MariaDB
- **postgres_exporter** : métriques PostgreSQL
- **redis_exporter** : métriques Redis
- **nginx_exporter** : métriques Nginx
- **kube-state-metrics** : métriques d'état Kubernetes

## Introduction à PromQL

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
sum(rate(http_requests_total[5m]))

# Sum by : grouper par label
sum by (method) (rate(http_requests_total[5m]))

# Avg : moyenne
avg(cpu_usage_percent)

# Max / Min
max(memory_usage_bytes)
min(disk_free_bytes)

# Count : nombre de séries
count(up == 1) # Nombre de cibles up
```

`rate()` calcule la pente moyenne d'un counter sur la fenêtre, en détectant les remises à zéro : une valeur qui diminue est interprétée comme un redémarrage, et la progression continue d'être comptée. Deux règles en découlent. La fenêtre doit contenir plusieurs échantillons, soit au moins 4 fois le `scrape_interval` (`[1m]` pour un scrape toutes les 15 s). Et l'agrégation se fait **après** le `rate()` : `sum(rate(x[5m]))` est correct, alors que `rate(sum(x)[5m:])` interprète la disparition d'une instance comme une remise à zéro et produit des pics erronés.

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
topk(5, rate(http_requests_total[5m])) # Top 5 des séries les plus actives

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

# Utilisation disque en pourcentage (avail exclut l'espace réservé à root, contrairement à free)
100 * (1 - node_filesystem_avail_bytes / node_filesystem_size_bytes)

# Latence p95 (histogram), agrégée sur toutes les instances : conserver le label le
histogram_quantile(0.95, sum by (le) (rate(http_request_duration_seconds_bucket[5m])))

# Prédiction : disque plein dans les 4 heures, d'après la tendance de la dernière heure
predict_linear(node_filesystem_avail_bytes[1h], 4*3600) < 0
```

`node_memory_MemFree_bytes`, utilisé plus haut pour illustrer l'arithmétique, sous-estime la mémoire disponible sous Linux : le noyau utilise la mémoire libre comme cache de fichiers, récupérable à la demande. `MemAvailable` tient compte de ce cache et reflète la mémoire réellement disponible pour les applications.

## Interface web de Prometheus

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

## Découverte de services

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
      # Utiliser le port défini dans l'annotation : les deux labels sources sont
      # concaténés avec ";" ("10.0.1.5:8080;9102"), puis réécrits en "10.0.1.5:9102"
      - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
        action: replace
        target_label: __address__
        regex: ([^:]+)(?::\d+)?;(\d+)
        replacement: $1:$2
      # Recopier les labels Kubernetes du pod en labels Prometheus
      - action: labelmap
        regex: __meta_kubernetes_pod_label_(.+)
```

Le *relabeling* s'applique à chaque cible découverte, avant le scrape. Les labels préfixés par `__meta_` sont fournis par la découverte de services et disparaissent après le relabeling ; `__address__` détermine l'adresse effectivement scrapée. Les annotations `prometheus.io/*` sont une convention, et non une fonctionnalité de Prometheus : ce sont ces règles de relabeling qui leur donnent un sens.

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

## Règles d'alerte

Les règles d'alerte, chargées depuis les fichiers `rule_files`, sont des expressions PromQL évaluées à chaque `evaluation_interval` :

```yaml
# rules/alerts.yml
groups:
  - name: disponibilite
    rules:
      - alert: InstanceDown
        expr: up == 0
        for: 5m                    # condition vraie pendant 5 minutes avant déclenchement
        labels:
          severity: critical
        annotations:
          summary: "{{ $labels.instance }} ne répond plus au scrape"

      - alert: HighErrorRate
        expr: |
          sum(rate(http_requests_total{status=~"5.."}[5m]))
            / sum(rate(http_requests_total[5m])) > 0.05
        for: 10m
        labels:
          severity: warning
```

Une alerte dont l'expression renvoie un résultat passe à l'état `pending` ; si elle reste vraie pendant la durée `for`, elle passe à `firing` et Prometheus l'envoie à Alertmanager, qui se charge du groupage et des notifications. `promtool check rules rules/alerts.yml` valide la syntaxe avant rechargement.

## Bonnes pratiques

1. **Nommer les métriques correctement** :
   - Format : `<namespace>_<nom>_<unité>`, suivi de `_total` pour un counter
   - Unités de base : secondes et octets plutôt que millisecondes ou mégaoctets
   - Exemple : `http_requests_total`, `node_cpu_seconds_total`, `http_request_duration_seconds`

2. **Utiliser des labels avec discernement** :
   - Labels pour les dimensions importantes (method, status, instance)
   - Éviter les labels avec une cardinalité élevée (user_id, request_id) : chaque combinaison de valeurs crée une série temporelle distincte en mémoire, et un label à un million de valeurs multiplie d'autant la charge de Prometheus

3. **Choisir le bon intervalle de scraping** :
   - 15-60s pour la plupart des cas
   - Plus court pour des systèmes critiques
   - Plus long pour des métriques qui changent lentement

4. **Utiliser rate() pour les counters** :
   - Ne jamais afficher un counter brut (il ne fait qu'augmenter)
   - Toujours utiliser `rate()` ou `increase()`

5. **Définir des alertes pertinentes** :
   - Alerter sur les symptômes (taux d'erreur, latence perçue) plutôt que sur les causes
   - Éviter les alertes redondantes
   - Utiliser `for` pour ignorer les pics transitoires, et les silences d'Alertmanager pour les maintenances planifiées

## Application / Projet lié

### [Cluster Kubernetes SONU](/docs/projects/professionnel/sonu-k8s-cluster)
**Utilisation** : Prometheus comme backend métrique du cluster pour monitorer tous les services hébergés (Grafana, Portainer, nodes Kubernetes).

## Conclusion

Prometheus repose sur quelques principes : collecte en mode pull, séries temporelles identifiées par des labels, stockage local et requêtes PromQL. Leur compréhension, en particulier le fonctionnement de `rate()` et le coût de la cardinalité, conditionne la pertinence des tableaux de bord et des alertes. Les logs, complémentaires des métriques, sont traités dans l'article [Loki](./2025-11-21-loki-logs-management.md).

Sujets complémentaires :

- La création de dashboards avec Grafana
- La configuration d'alertes avec Alertmanager
- Le monitoring d'applications Kubernetes
- L'optimisation des performances et du stockage

## Ressources utiles

- [Documentation officielle Prometheus](https://prometheus.io/docs/)
- [PromQL Cheat Sheet](https://promlabs.com/promql-cheat-sheet/)
- [Awesome Prometheus](https://github.com/roaldnefs/awesome-prometheus)
- [Prometheus Exporters](https://prometheus.io/docs/instrumenting/exporters/)
