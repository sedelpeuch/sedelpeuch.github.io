---
title: "Loki"
description: "Loki, système d'agrégation de logs inspiré de Prometheus : indexation des seuls labels, architecture, collecte avec Alloy ou Promtail, LogQL, rétention et bonnes pratiques de cardinalité."
tags: [monitoring, devops]
---

Loki est un système d'agrégation de logs horizontalement scalable, hautement disponible et multi-tenant, inspiré par Prometheus. Créé par Grafana Labs, il se distingue par un choix d'architecture : plutôt que d'indexer le contenu des logs, il n'indexe que leurs métadonnées (labels), ce qui réduit fortement le coût de stockage et d'ingestion au prix de requêtes plus coûteuses sur le texte.

<!--truncate-->

## Qu'est-ce que Loki ?

Loki est souvent décrit comme « Prometheus, mais pour les logs ». Il partage plusieurs concepts avec [Prometheus](./2025-11-21-prometheus-introduction.md) :

- **Modèle de données basé sur les labels** : identification des flux de logs par des labels
- **Langage de requête dédié** : LogQL, inspiré de PromQL
- **Intégration native avec Grafana** : visualisation conjointe des métriques et des logs, avec les mêmes labels
- **Architecture cloud-native** : composants sans état et stockage objet, adaptés à Kubernetes

### Pourquoi Loki ?

Les systèmes de logs traditionnels (ELK/OpenSearch, Splunk) construisent un index inversé de tout le contenu des logs, ce qui :

- **Coûte cher** en stockage (l'index peut approcher la taille des données) et en calcul à l'ingestion
- **Accélère** en contrepartie la recherche plein texte arbitraire
- **Nécessite** une infrastructure dimensionnée pour cet index (clusters Elasticsearch)

Loki adopte une approche différente :

- **N'indexe que les métadonnées** (labels), pas le contenu
- **Stocke les logs compressés** par blocs (*chunks*), regroupés par flux
- **Utilise le stockage objet** (S3, GCS, etc.) pour réduire les coûts
- **Filtre le contenu à la lecture** : les labels sélectionnent les flux, puis le contenu des chunks correspondants est parcouru en parallèle

Un **flux** (*stream*) est l'ensemble des lignes partageant exactement le même jeu de labels. Toute la performance de Loki dépend de ce découpage : trop peu de labels oblige à parcourir de gros volumes à chaque requête, trop de valeurs distinctes multiplie les petits flux et dégrade l'ingestion comme l'index.

## Architecture de Loki

L'architecture de Loki se compose de plusieurs composants :

```text
┌─────────────────────────────────────────────────────────────┐
│                         Applications                         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
              ┌─────────────┐
              │ Agent       │  (Alloy, Promtail, Fluent Bit…)
              └──────┬──────┘
                     │ push HTTP /loki/api/v1/push
                     ▼
         ┌───────────────────────┐
         │   Loki Distributor    │  (Point d'entrée, validation)
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

1. **Agent de collecte** : lit les logs (fichiers, journald, API Kubernetes), leur attache des labels et les pousse vers Loki
2. **Distributor** : reçoit les logs, les valide (limites de débit, labels) et les répartit entre les ingesters par hachage des labels du flux
3. **Ingester** : accumule les lignes de chaque flux en mémoire dans des chunks compressés, puis les écrit dans le stockage lorsqu'ils sont pleins ou trop anciens ; chaque flux est répliqué sur plusieurs ingesters (facteur 3 par défaut)
4. **Querier** : exécute les requêtes LogQL, en lisant à la fois le stockage et les données récentes encore en mémoire dans les ingesters
5. **Storage** : chunks et index (TSDB), sur système de fichiers ou stockage objet

Ces composants peuvent tourner dans un seul processus (mode *monolithique*), en trois groupes lecture, écriture et backend (mode *simple scalable*), ou séparément (mode *microservices*).

## Installation de Loki

### Installation avec Docker Compose

Une stack de test locale :

```yaml
# compose.yaml
services:
  loki:
    image: grafana/loki:3.5.0
    ports:
      - "3100:3100"
    command: -config.file=/etc/loki/local-config.yaml   # configuration monolithique fournie par l'image
    volumes:
      - loki-data:/loki

  alloy:
    image: grafana/alloy:latest
    volumes:
      - /var/log:/var/log:ro
      - ./config.alloy:/etc/alloy/config.alloy:ro
    command: run /etc/alloy/config.alloy

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana-storage:/var/lib/grafana

volumes:
  loki-data:
  grafana-storage:
```

```bash
# Démarrer la stack
docker compose up -d
```

### Installation sur Kubernetes avec Helm

Le chart `grafana/loki` couvre les trois modes de déploiement. Les anciens charts `loki-stack` et `loki-distributed` sont dépréciés et ne suivent plus les versions 3.x de Loki.

```bash
# Ajouter le repo Helm de Grafana
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

# Installer Loki
helm install loki grafana/loki \
  --namespace monitoring \
  --create-namespace \
  -f loki-values.yaml

# Vérifier le déploiement
kubectl get pods -n monitoring
```

```yaml
# loki-values.yaml : mode monolithique, schéma TSDB v13, stockage S3
deploymentMode: SingleBinary
loki:
  auth_enabled: false
  commonConfig:
    replication_factor: 1
  schemaConfig:
    configs:
      - from: "2024-04-01"
        store: tsdb
        object_store: s3
        schema: v13
        index:
          prefix: loki_index_
          period: 24h
  storage:
    type: s3
    bucketNames:
      chunks: mon-bucket-loki-chunks
      ruler: mon-bucket-loki-ruler
    s3:
      region: eu-west-3
singleBinary:
  replicas: 1
# Désactiver les composants des autres modes
read:
  replicas: 0
write:
  replicas: 0
backend:
  replicas: 0
```

Pour la production, `deploymentMode: SimpleScalable` (ou `Distributed`) sépare les chemins de lecture et d'écriture pour les dimensionner indépendamment. Le schéma `tsdb`/`v13` remplace l'ancien stockage d'index `boltdb-shipper`, déprécié. La date `from` d'un schéma ne se modifie jamais après coup : un changement de schéma se fait en ajoutant une nouvelle entrée datée dans le futur.

## Collecte des logs : Alloy et Promtail

:::warning Promtail en fin de vie
Promtail, l'agent historique de Loki, est déprécié et a atteint sa fin de vie le 2 mars 2026 : il ne reçoit plus ni correctif ni nouvelle fonctionnalité. Grafana Alloy (distribution de l'OpenTelemetry Collector par Grafana Labs) le remplace. `alloy convert --source-format=promtail` traduit une configuration Promtail existante. Les configurations Promtail ci-dessous restent présentées car elles sont encore très répandues, et leurs concepts (découverte, relabeling, étapes de pipeline) se retrouvent à l'identique dans Alloy.
:::

### Configuration Alloy

Alloy se configure par des composants reliés entre eux : chaque composant expose des sorties que d'autres consomment (`forward_to`, `targets`).

```alloy
// config.alloy : lire /var/log/*.log et pousser vers Loki
local.file_match "system" {
  path_targets = [{
    "__path__" = "/var/log/*.log",
    "job"      = "varlogs",
    "host"     = "my-server",
  }]
}

loki.source.file "system" {
  targets    = local.file_match.system.targets
  forward_to = [loki.write.default.receiver]
}

loki.write "default" {
  endpoint {
    url = "http://loki:3100/loki/api/v1/push"
  }
}
```

### Configuration Promtail de base

Configuration équivalente pour Promtail, dans un fichier `promtail-config.yml` :

```yaml
server:
  http_listen_port: 9080
  grpc_listen_port: 0

# Position de lecture de chaque fichier, pour reprendre sans doublon après redémarrage
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

L'agent peut parser et enrichir les logs avant de les envoyer :

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

      # Promouvoir en labels uniquement les champs à faible cardinalité.
      # path (des milliers de valeurs) et ip restent dans la ligne : ils se filtrent à la requête.
      - labels:
          method:
          status:

      # Utiliser l'horodatage de la ligne plutôt que l'heure de lecture
      - timestamp:
          source: time
          format: '02/Jan/2006:15:04:05 -0700'

      # Filtrer certains logs (optionnel)
      - match:
          selector: '{status="200"}'
          action: drop
```

Le format de `timestamp` suit la convention de Go : la date de référence `02/Jan/2006:15:04:05 -0700` sert de modèle, chaque composant de cette date représentant le champ correspondant.

### Configuration pour Kubernetes

L'agent, déployé en DaemonSet, découvre les pods du nœud et lit leurs fichiers de logs dans `/var/log/pods` :

```yaml
scrape_configs:
  - job_name: kubernetes-pods
    kubernetes_sd_configs:
      - role: pod

    relabel_configs:
      # Ne garder que les pods du nœud courant
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

      # Chemin des fichiers : /var/log/pods/<namespace>_<pod>_<uid>/<conteneur>/*.log
      - replacement: /var/log/pods/*$1/*.log
        separator: /
        source_labels:
          - __meta_kubernetes_pod_uid
          - __meta_kubernetes_pod_container_name
        target_label: __path__
```

Recopier tous les labels des pods (`labelmap`) est pratique mais risqué : un label comme `pod-template-hash`, ou tout label à valeurs nombreuses, crée autant de flux distincts. En production, la liste des labels promus se restreint à quelques dimensions stables (`namespace`, `app`, `container`). Avec Alloy, le composant `discovery.kubernetes` suivi de `loki.source.kubernetes` lit directement les logs via l'API Kubernetes.

## Introduction à LogQL

LogQL est le langage de requête de Loki, inspiré de PromQL. Une requête commence toujours par un **sélecteur de flux** (labels), éventuellement suivi d'un **pipeline** de filtres et de parsers.

### Sélecteurs de flux de logs

```logql
# Sélectionner par label exact
{job="nginx"}

# Combiner plusieurs labels
{job="nginx", environment="production"}

# Opérateurs de correspondance
{job=~"nginx|apache"}              # Regex : nginx OU apache
{job="nginx", status!="200"}       # status différent de 200
{job="nginx", path=~"/api/.+"}     # path commence par /api/
```

Un sélecteur doit contenir au moins un matcher positif qui ne correspond pas à la chaîne vide : `{status!="200"}` seul est refusé, pour éviter de parcourir toute la base. Les regex utilisent `.+` plutôt que `.*` pour la même raison.

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

Les filtres de lignes sont les opérations les moins coûteuses après le sélecteur : les placer avant les parsers réduit le volume de lignes à analyser.

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

# Parser par motif, plus lisible qu'une regex
{job="nginx"} | pattern "<ip> - - [<_>] \"<method> <path> <_>\" <status> <size>"
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

Les labels extraits par un parser n'existent qu'au moment de la requête : ils ne sont pas indexés et n'ont aucun coût de cardinalité, contrairement aux labels attachés à l'ingestion.

### Agrégations et fonctions

```logql
# Compter le nombre de lignes
count_over_time({job="nginx"}[5m])

# Taux de logs par seconde
rate({job="nginx"}[5m])

# Octets transmis par seconde, à partir d'un champ numérique
sum(rate({job="nginx"} | json | unwrap bytes [5m]))

# Compter par label
sum by (status) (count_over_time({job="nginx"} | json [5m]))

# Moyenne d'une valeur numérique sur la fenêtre
avg_over_time({job="myapp"} | json | unwrap response_time [5m])

# Quantiles (p95, p99)
quantile_over_time(0.95, {job="myapp"} | json | unwrap duration [5m])
```

`unwrap` transforme la valeur d'un label extrait en échantillon numérique, ce qui permet d'appliquer des fonctions statistiques au contenu des logs. Seules les fonctions `*_over_time` et `rate` opèrent sur une plage : une requête de logs brute (`{job="myapp"} |= "error"`) n'accepte pas de sélecteur `[5m]`, sa période étant définie par les paramètres de la requête (ou par le sélecteur de temps de Grafana).

### Exemples pratiques

```logql
# Logs d'erreur (période choisie dans Grafana ou via les paramètres start/end de l'API)
{job="myapp"} |= "error"

# Taux d'erreurs HTTP 5xx
sum(rate({job="nginx"} | json | status >= 500 [5m]))

# Top 5 des chemins les plus appelés
topk(5, sum by (path) (rate({job="nginx"} | json [5m])))

# Logs d'erreur dans un namespace Kubernetes spécifique
{namespace="production"} |= "error" | json | level="error"

# Durée moyenne des requêtes API, par service
avg_over_time({job="api"} | json | unwrap duration [5m]) by (service)

# Logs correspondant à un motif
{job="myapp"} |~ "database.*timeout"

# Grouper par niveau de log et compter
sum by (level) (count_over_time({job="myapp"} | json [5m]))

# Détecter les pics de logs
sum(count_over_time({job="myapp"}[5m])) > 1000
```

## Visualisation avec Grafana

### Ajouter Loki comme source de données

1. Ouvrir Grafana : `http://localhost:3000`
2. Aller dans **Connections > Data sources**
3. Cliquer sur **Add data source**
4. Sélectionner **Loki**
5. Configurer l'URL : `http://loki:3100`
6. Cliquer sur **Save & test**

### Créer un dashboard

```json
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
3. Visualiser les résultats en temps réel (mode *live*)
4. Filtrer, parser et agréger les logs

Lorsque métriques et logs partagent les mêmes labels (`namespace`, `pod`, `app`), Grafana permet de passer d'un pic sur un graphique Prometheus aux logs de la même période et du même service.

## Intégration avec Kubernetes

### Collecter les logs de pods

Avec un agent déployé en DaemonSet (Alloy, ou Promtail sur les installations existantes), les logs de tous les pods sont collectés à partir des fichiers écrits par le runtime de conteneurs dans `/var/log/pods`. Seules les sorties standard et d'erreur des conteneurs sont concernées : une application qui écrit dans un fichier interne au conteneur échappe à cette collecte.

### Labels des pods et enrichissement

Les labels Kubernetes des pods deviennent des labels Loki par les règles de relabeling de l'agent. Les annotations peuvent aussi piloter la collecte, mais uniquement si l'agent est configuré pour les lire : aucune annotation n'a de signification native pour Loki.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp
  labels:
    app: myapp               # promu en label Loki par la règle labelmap
    version: v1.2.3
  annotations:
    logs.example.com/parser: "json"   # convention locale, exploitée par une règle de l'agent
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

## Bonnes pratiques

### 1. Utiliser des labels efficacement

```yaml
# Labels à faible cardinalité : nombre de valeurs borné et stable
labels:
  environment: production
  app: myapp
  level: error

# À éviter en labels : une valeur par utilisateur, par requête ou par instant
labels:
  user_id: "123456"
  request_id: "abc-def"
  timestamp: "..."
```

Chaque combinaison de valeurs de labels crée un flux, avec son propre chunk en mémoire dans les ingesters. Un label `request_id` produirait un flux par requête, chacun contenant une seule ligne : l'index explose et la compression devient inefficace. Depuis Loki 3.0, les **métadonnées structurées** (*structured metadata*) permettent d'attacher ce type de champ (`trace_id`, `user_id`) à chaque ligne sans créer de flux, tout en restant filtrable à la requête (`| trace_id="abc123"`).

### 2. Structurer les logs en JSON

```python
# Python avec structlog
import structlog

structlog.configure(processors=[
    structlog.processors.TimeStamper(fmt="iso"),
    structlog.processors.JSONRenderer(),
])

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

Un log structuré se parse avec `| json` sans expression régulière, et chaque champ devient filtrable.

### 3. Optimiser les requêtes LogQL

```logql
# Préférable : restreindre les flux par les labels
{job="nginx", status="500"}

# Plus coûteux : parcourir tout le contenu du flux nginx
{job="nginx"} |= " 500 "
```

Le coût d'une requête est proportionnel au volume de données lues : nombre de flux sélectionnés multiplié par la période couverte. Un sélecteur précis et une période courte limitent ce volume ; une requête sur 24 heures d'un flux volumineux sans filtre de labels peut lire des dizaines de gigaoctets.

### 4. Configurer la rétention des logs

Avec l'index TSDB, la rétention est appliquée par le **compactor**, qui supprime de façon asynchrone les entrées d'index et les chunks trop anciens :

```yaml
# loki-config.yaml
compactor:
  working_directory: /loki/compactor
  retention_enabled: true
  delete_request_store: s3      # stockage des demandes de suppression, requis avec la rétention

limits_config:
  retention_period: 744h        # 31 jours, valeur globale
  retention_stream:
    - selector: '{namespace="dev"}'
      priority: 1
      period: 72h               # rétention plus courte pour un flux donné
```

L'ancien paramètre `table_manager`, propre aux index `boltdb`, n'est plus utilisé avec le schéma TSDB. Une règle de cycle de vie sur le bucket S3 peut servir de filet de sécurité, avec une durée supérieure à celle de Loki.

### 5. Utiliser le multi-tenancy

```yaml
# Configuration Loki pour multi-tenancy
auth_enabled: true

# Promtail avec tenant_id
clients:
  - url: http://loki:3100/loki/api/v1/push
    tenant_id: team-a
```

Avec `auth_enabled: true`, chaque requête doit porter l'en-tête `X-Scope-OrgID` qui désigne le tenant ; les données de chaque tenant sont isolées, et les limites (débit, rétention) peuvent être définies par tenant. Loki n'authentifie pas lui-même cet en-tête : un reverse proxy ou une passerelle doit le contrôler.

## Cas d'usage avancés

### Alerting avec Loki et Prometheus

Le composant *ruler* de Loki évalue des règles LogQL au format des règles Prometheus : des règles d'alerte, envoyées à Alertmanager, et des règles d'enregistrement, dont le résultat est écrit dans Prometheus par *remote write* :

```yaml
groups:
  - name: logs
    interval: 1m
    rules:
      # Règle d'enregistrement : la série log_error_rate est envoyée à Prometheus
      - record: log_error_rate
        expr: |
          sum by (app) (rate({job="myapp"} |= "error" [5m]))

      # Règle d'alerte
      - alert: HighLogErrorRate
        expr: |
          sum by (app) (rate({job="myapp"} |= "error" [5m])) > 10
        for: 10m
        labels:
          severity: warning
```

### Tracer les requêtes entre services

Utiliser le trace ID dans les logs pour corréler les logs entre microservices :

```logql
# Rechercher tous les logs d'une trace
{job="myapp"} | json | trace_id="abc123"
```

Grafana peut transformer automatiquement ce champ en lien vers la trace correspondante dans Tempo (champ dérivé de la source de données Loki).

### Détecter les anomalies

LogQL ne dispose pas des sous-requêtes de PromQL, mais accepte le modificateur `offset` : le taux actuel se compare à celui de la même période la veille.

```logql
# Taux actuel deux fois supérieur à celui de la veille à la même heure
sum(rate({job="myapp"}[5m]))
  /
sum(rate({job="myapp"}[5m] offset 1d))
  > 2
```

Pour une référence plus élaborée (moyenne mobile sur plusieurs heures), une règle d'enregistrement écrit le taux dans Prometheus, où les sous-requêtes PromQL sont disponibles.

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/professionnel/sonu-k8s-cluster" title="Cluster Kubernetes SONU">Loki comme système d'agrégation de logs pour tous les services hébergés dans le cluster.</ProjectLink>
  <ProjectLink to="/docs/projects/professionnel/github-arc-kubeadm" title="GitHub ARC Kubeadm">Collecte centralisée des logs des runners ARC pour le débogage et l'audit.</ProjectLink>
</ProjectLinks>

## Conclusion

Loki fait un compromis explicite : un index limité aux labels, peu coûteux à maintenir, et un filtrage du contenu effectué au moment de la requête. Ce compromis fonctionne tant que les labels restent en nombre limité et à faible cardinalité ; les champs à forte cardinalité relèvent du contenu des lignes ou des métadonnées structurées.

Les points clés à retenir :

- **Coût** : pas d'indexation du contenu, stockage objet compressé
- **Performance** : dépend du découpage en flux, donc du choix des labels
- **Modèle** : labels et requêtes calqués sur Prometheus, ce qui facilite la corrélation métriques/logs
- **Collecte** : Grafana Alloy remplace Promtail, en fin de vie depuis mars 2026
- **LogQL** : filtres de lignes, parsers et agrégations pour tirer des métriques des logs

## Ressources utiles

- [Documentation officielle Loki](https://grafana.com/docs/loki/)
- [Référence LogQL](https://grafana.com/docs/loki/latest/query/)
- [Bonnes pratiques sur les labels](https://grafana.com/docs/loki/latest/get-started/labels/bp-labels/)
- [Grafana Alloy](https://grafana.com/docs/alloy/latest/)
