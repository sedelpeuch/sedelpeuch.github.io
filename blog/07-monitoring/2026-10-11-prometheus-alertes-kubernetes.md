---
title: "Prometheus : alertes d'un cluster Kubernetes"
description: "Socle d'alertes Prometheus pour un cluster Kubernetes : sources de métriques (kube-state-metrics, kubelet, node-exporter, composants), collecte des composants sans annotation, règles nœuds, workloads, stockage, certificats et GPU, pièges des métriques persistantes, enrichissement par jointure, routage Alertmanager et validation avec promtool."
tags: [monitoring, devops]
---

Sur un hôte Docker, l'essentiel des pannes se lit dans les métriques de la machine et des conteneurs : disque, mémoire, redémarrages. Sur un cluster Kubernetes, une part importante des incidents ne se voit qu'au niveau des objets de l'API : un Deployment dont le rollout ne termine pas, un pod bloqué en `Pending` faute de ressources, un CronJob de sauvegarde qui échoue chaque nuit, un volume répliqué qui a perdu une copie, un certificat du plan de contrôle qui approche de son expiration. Ces états ne produisent ni pic de CPU ni erreur applicative. Cet article fait suite à l'article [Alertmanager](./2026-09-20-prometheus-alertmanager.md) et construit un socle d'alertes pour un cluster kubeadm déployé avec le chart `prometheus-community/prometheus` : sources de métriques, collecte, règles par domaine, pièges propres aux métriques d'état et routage.

<!--truncate-->

## Les sources de métriques

| Source | Ce qu'elle mesure | Exemples |
| --- | --- | --- |
| node-exporter (DaemonSet) | L'hôte : disques, mémoire, réseau | `node_filesystem_avail_bytes`, `node_memory_MemAvailable_bytes` |
| kube-state-metrics | L'état des objets de l'API, lu par watch | `kube_pod_container_status_waiting_reason`, `kube_job_status_failed` |
| kubelet | Les volumes montés sur chaque nœud | `kubelet_volume_stats_available_bytes` |
| API server | Ses requêtes et les certificats clients présentés | `apiserver_client_certificate_expiration_seconds` |
| Composants | Leur propre état (stockage, objet, GPU) | `longhorn_volume_robustness`, `nvidia_smi_temperature_gpu` |

kube-state-metrics ne mesure rien par lui-même : il convertit l'état déclaré et observé des objets en séries. Une alerte sur un CrashLoopBackOff ou un Job en échec repose entièrement sur lui. Les sous-charts `kube-state-metrics` et `prometheus-node-exporter` du chart `prometheus-community/prometheus` les installent tous deux.

## Collecter les composants sans annotation

Le chart découvre les cibles annotées `prometheus.io/scrape: "true"` (jobs `kubernetes-pods` et `kubernetes-service-endpoints`, décrits dans l'[introduction à Prometheus](./2025-11-21-prometheus-introduction.md)). Les charts tiers n'exposent pas toujours cette annotation, et la leur ajouter impose de modifier et redéployer leur release. Un job dédié dans `extraScrapeConfigs` sélectionne plutôt les pods par leurs labels et le nom de leur port :

```yaml
extraScrapeConfigs: |
  - job_name: longhorn-manager
    kubernetes_sd_configs:
      - role: pod
        namespaces: {names: [longhorn-system]}
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_label_app, __meta_kubernetes_pod_container_port_name]
        regex: longhorn-manager;manager
        action: keep
      - source_labels: [__meta_kubernetes_namespace]
        target_label: namespace
      - source_labels: [__meta_kubernetes_pod_name]
        target_label: pod
      - source_labels: [__meta_kubernetes_pod_node_name]
        target_label: node
```

Avec `role: pod`, une cible est créée par port déclaré de chaque conteneur ; la règle `keep` sur la concaténation `label;port` ne retient que le port de métriques du bon composant. La même construction s'applique à tout composant exposant un port nommé.

### Piège : une NetworkPolicy devant la cible

La cible apparaît dans la page *Targets*, mais le scrape échoue en délai dépassé. Certains charts posent une NetworkPolicy qui réserve l'entrée de leurs pods à leurs propres composants ; c'est le cas de Longhorn pour `longhorn-manager`. Dès qu'une NetworkPolicy sélectionne un pod en `Ingress`, tout trafic qu'elle n'autorise pas explicitement est refusé, y compris celui de Prometheus. Une seconde NetworkPolicy, additive, ouvre le port au seul serveur Prometheus, sans toucher à celle du chart :

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: longhorn-manager-allow-prometheus
  namespace: longhorn-system
spec:
  podSelector:
    matchLabels:
      app: longhorn-manager
  policyTypes: [Ingress]
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              kubernetes.io/metadata.name: monitoring
          podSelector:
            matchLabels:
              app.kubernetes.io/name: prometheus
              app.kubernetes.io/component: server
      ports:
        - port: 9500
          protocol: TCP
```

`namespaceSelector` et `podSelector` dans le même élément de `from` se combinent en ET : seul le pod serveur de Prometheus, dans son namespace, est autorisé. Le champ `extraManifests` du chart Prometheus permet de livrer cet objet avec la supervision plutôt qu'avec le composant.

## Règles par domaine

Les règles sont regroupées par domaine dans `serverFiles.alerting_rules.yml`. Chaque groupe est évalué indépendamment, et son nom apparaît dans les métriques d'évaluation, ce qui facilite le diagnostic d'une règle en échec.

### Nœuds

```yaml
- name: infra-noeuds
  rules:
    - alert: NodeNotReady
      expr: kube_node_status_condition{condition="Ready",status="true"} == 0
      for: 5m
      labels:
        severity: critical

    - alert: NodeFilesystemAlmostFull
      expr: |
        100 * node_filesystem_avail_bytes{fstype!~"tmpfs|overlay|squashfs|nsfs|fuse.*|vfat",mountpoint!~"/boot.*|/snap/.*|/run.*|/var/lib/kubelet/.*"}
          / node_filesystem_size_bytes{fstype!~"tmpfs|overlay|squashfs|nsfs|fuse.*|vfat",mountpoint!~"/boot.*|/snap/.*|/run.*|/var/lib/kubelet/.*"}
          < 15
      for: 15m
      labels:
        severity: warning
```

Le filtre sur `mountpoint` est spécifique à Kubernetes : chaque volume monté dans un pod apparaît sous `/var/lib/kubelet/pods/...` sur le nœud. Sans exclusion, un PVC presque plein déclencherait l'alerte de disque du nœud en plus de celle du volume. Une seconde règle au seuil de 5 % passe en `critical` avec un `for` plus court.

### Workloads

```yaml
- name: infra-workloads
  rules:
    - alert: KubePodCrashLooping
      expr: max_over_time(kube_pod_container_status_waiting_reason{reason="CrashLoopBackOff"}[5m]) >= 1
      for: 15m
      labels:
        severity: warning

    - alert: KubeDeploymentReplicasMismatch
      expr: kube_deployment_spec_replicas != kube_deployment_status_replicas_available
      for: 15m
      labels:
        severity: warning

    - alert: KubeDaemonSetUnavailable
      expr: kube_daemonset_status_number_unavailable > 0
      for: 15m
      labels:
        severity: warning
```

Entre deux redémarrages, un conteneur en CrashLoopBackOff passe brièvement par l'état `Running` : la série `waiting_reason` alterne entre 1 et 0. `max_over_time(...[5m])` lisse cette alternance, sans quoi le `for: 15m` serait remis à zéro à chaque tentative de démarrage. La même logique `spec != status` que pour les Deployments s'applique aux StatefulSets (`kube_statefulset_status_replicas_ready`).

Un pod en attente se surveille par sa phase, en excluant les namespaces où l'attente est normale :

```yaml
    - alert: KubePodNotReady
      expr: sum by (namespace, pod) (kube_pod_status_phase{phase=~"Pending|Unknown",namespace!="arc-runners"}) > 0
      for: 15m
```

Un runner de CI éphémère peut attendre légitimement un nœud libre ou une carte GPU ; l'inclure produirait une alerte à chaque file d'attente.

### Les métriques d'état persistantes

Plusieurs métriques de kube-state-metrics décrivent le **dernier** état connu d'un objet et le conservent aussi longtemps que l'objet existe. Une règle naïve sur ces métriques sonne alors indéfiniment.

**OOMKilled.** `kube_pod_container_status_last_terminated_reason{reason="OOMKilled"}` reste à 1 jusqu'à la terminaison suivante du conteneur, qui peut ne jamais survenir. La règle doit croiser cette raison avec un redémarrage récent :

```yaml
    - alert: KubeContainerOOMKilled
      expr: |
        (kube_pod_container_status_restarts_total - kube_pod_container_status_restarts_total offset 10m >= 1)
          and ignoring(reason) min_over_time(kube_pod_container_status_last_terminated_reason{reason="OOMKilled"}[10m]) == 1
```

**Job en échec.** `kube_job_status_failed` reste positif tant que le Job existe. L'historique d'un CronJob (`failedJobsHistoryLimit`, 1 par défaut) conserve le dernier Job en échec : sans borne, l'alerte persiste jusqu'au prochain échec, qui remplace l'objet. La règle se limite aux Jobs récents :

```yaml
    - alert: KubeJobFailed
      expr: kube_job_status_failed > 0 and on(namespace, job_name) (time() - kube_job_created) < 86400
```

**CronJob en retard.** L'échec qui dure est couvert par une autre règle, fondée sur le dernier succès :

```yaml
    - alert: KubeCronJobLate
      expr: time() - kube_cronjob_status_last_successful_time > 26 * 3600
```

Le seuil de 26 heures suppose des CronJobs quotidiens, avec deux heures de marge. Un CronJob hebdomadaire ajouté plus tard déclencherait cette règle six jours sur sept : il demande une règle distincte, ou un seuil porté par un label ou une annotation de l'objet.

### Stockage

```yaml
- name: infra-stockage
  rules:
    - alert: KubePersistentVolumeFillingUp
      expr: kubelet_volume_stats_available_bytes / kubelet_volume_stats_capacity_bytes < 0.15
      for: 15m
      labels:
        severity: warning

    - alert: LonghornVolumeDegraded
      expr: longhorn_volume_robustness{state="degraded"} == 1
      for: 10m
      labels:
        severity: warning

    - alert: LonghornNodeStorageAlmostFull
      expr: longhorn_node_storage_usage_bytes / longhorn_node_storage_capacity_bytes > 0.85
      for: 15m
      labels:
        severity: warning
```

Les métriques `kubelet_volume_stats_*` portent les labels `namespace` et `persistentvolumeclaim` : l'alerte désigne directement le PVC, quel que soit le pod qui le monte.

`longhorn_volume_robustness` illustre un piège de maintenance. Dans les anciennes versions de [Longhorn](../06-orchestration/2026-09-27-kubernetes-longhorn.md), la métrique valait 0, 1, 2 ou 3 selon l'état (inconnu, sain, dégradé, en panne). Les versions récentes exposent une série par état, avec un label `state` et la valeur 1 pour l'état courant, 0 pour les autres. Une règle `longhorn_volume_robustness == 2`, écrite d'après une documentation ancienne, reste syntaxiquement valide après la mise à jour mais ne peut plus jamais être vraie. Aucune erreur ne le signale : seule une confrontation de la règle aux séries réellement exposées (`longhorn_volume_robustness` dans l'onglet *Graph*) révèle le changement de format.

### Certificats et redémarrages en attente

Les certificats générés par kubeadm expirent au bout d'un an ([Kubernetes : certificats](../06-orchestration/2025-06-06-renouveler-certificats.md)). L'API server expose un histogramme de la durée de validité restante des certificats clients qui s'authentifient auprès de lui :

```yaml
    - alert: KubeClientCertificateExpiration
      expr: |
        histogram_quantile(0.01, sum by (job, le) (rate(apiserver_client_certificate_expiration_seconds_bucket{job="kubernetes-apiservers"}[5m])))
          < 30 * 86400
      for: 1h
      labels:
        severity: warning
```

Le quantile 0,01 approche la plus petite durée observée. La métrique ne couvre que les certificats effectivement présentés à l'API server pendant la fenêtre : le certificat de service de l'API server lui-même relève d'une sonde TLS externe, par exemple une condition `[CERTIFICATE_EXPIRATION]` dans [Gatus](./2026-10-03-gatus.md).

Sur Ubuntu, une mise à jour du noyau crée le fichier `/run/reboot-required`, sans qu'aucune métrique ne le reflète. Le *textfile collector* de node-exporter lit des fichiers `.prom` déposés dans un répertoire ; un sidecar du DaemonSet peut y écrire l'état du fichier :

```yaml
prometheus-node-exporter:
  extraArgs:
    - --collector.textfile.directory=/textfile
  sidecarVolumeMount:
    - name: textfile
      mountPath: /textfile
      readOnly: false
  sidecarHostVolumeMounts:
    - name: host-run
      hostPath: /run
      mountPath: /host/run
      readOnly: true
  sidecars:
    - name: reboot-required
      command:
        - /bin/sh
        - -c
        - |
          while true; do
            if [ -e /host/run/reboot-required ]; then v=1; else v=0; fi
            printf '# TYPE node_reboot_required gauge\nnode_reboot_required %s\n' "$v" > /textfile/reboot.prom.tmp
            mv /textfile/reboot.prom.tmp /textfile/reboot.prom
            sleep 300
          done
```

L'écriture dans un fichier temporaire suivie d'un `mv` rend le remplacement atomique : node-exporter ne lit jamais un fichier à moitié écrit. Le sidecar reprend l'image de node-exporter, dont la base busybox fournit le shell. L'alerte associée (`node_reboot_required == 1` avec `for: 72h`) tolère le délai normal entre une mise à jour et une fenêtre de maintenance.

### GPU et chaîne d'alerte

```yaml
- name: infra-gpu
  rules:
    - alert: GpuTemperatureHigh
      expr: nvidia_smi_temperature_gpu > 85
      for: 10m

- name: infra-prometheus
  rules:
    - alert: PrometheusRuleEvaluationFailures
      expr: increase(prometheus_rule_evaluation_failures_total[10m]) > 0
```

La température provient de l'exporter décrit dans l'article [Kubernetes : GPU NVIDIA](../06-orchestration/2026-10-09-kubernetes-gpu-nvidia.md). Une règle dont l'évaluation échoue (jointure produisant des doublons, par exemple) ne déclenche jamais son alerte et ne laisse qu'une ligne dans les logs de Prometheus : `prometheus_rule_evaluation_failures_total` rend ces échecs visibles. Une alerte sur `prometheus_notifications_errors_total` signale les envois en échec vers Alertmanager ; avec une instance unique d'Alertmanager, elle ne peut cependant pas être délivrée par lui et reste visible dans l'interface de Prometheus uniquement.

## Piège : le label `node` des métriques d'état

Le job `kubernetes-service-endpoints` du chart ajoute à chaque cible un label `node`, celui du pod qui expose les métriques. Pour kube-state-metrics, c'est le nœud où tourne kube-state-metrics, et non celui de l'objet décrit. Le job étant en `honor_labels: true`, une métrique qui porte son propre label `node` (`kube_pod_info`, `kube_node_status_condition`) le conserve, et la valeur est juste. Les autres, majoritaires (`kube_pod_container_status_waiting_reason`, `kube_pod_container_status_restarts_total`, `kube_job_status_failed`...), reçoivent le label de la cible : une alerte CrashLoopBackOff affiche alors avec assurance le nœud de kube-state-metrics, quel que soit le nœud du pod en panne.

La correction tient en deux temps : retirer la règle de relabeling `node` pour la cible kube-state-metrics (un job dédié, sans cette règle), puis obtenir le nœud d'un pod par jointure avec `kube_pod_info`, qui le porte :

```yaml
expr: |
  max_over_time(kube_pod_container_status_waiting_reason{reason="CrashLoopBackOff"}[5m]) >= 1
    * on(namespace, pod) group_left(node) kube_pod_info
```

Toute règle ou annotation qui lit `$labels.node` sur une métrique de kube-state-metrics mérite cette vérification.

## Enrichir une alerte par jointure

Une alerte sur un job de CI trop long est plus exploitable si elle nomme le dépôt et le workflow concernés. Ces informations figurent dans le statut des ressources `EphemeralRunner` d'[ARC](../04-ci-cd/2024-12-20-github-arc.md), pas dans les métriques. kube-state-metrics sait exposer les champs de ressources personnalisées (`customResourceState`) :

```yaml
kube-state-metrics:
  customResourceState:
    enabled: true
    config:
      kind: CustomResourceStateMetrics
      spec:
        resources:
          - groupVersionKind:
              group: actions.github.com
              version: v1alpha1
              kind: EphemeralRunner
            labelsFromPath:
              pod: [metadata, name]
              namespace: [metadata, namespace]
            metrics:
              - name: gha_ephemeralrunner_job_info
                help: "Dépôt et workflow du job attribué au runner"
                each:
                  type: Info
                  info:
                    labelsFromPath:
                      phase: [status, phase]
                      job_repository: [status, jobRepositoryName]
                      job_workflow_ref: [status, jobWorkflowRef]
                      workflow_run_id: [status, workflowRunId]
  rbac:
    extraRules:
      - apiGroups: ["actions.github.com"]
        resources: ["ephemeralrunners"]
        verbs: ["list", "watch"]
```

La série `kube_customresource_gha_ephemeralrunner_job_info` vaut 1 et porte les champs en labels. Le pod du runner portant le nom de l'`EphemeralRunner`, une jointure avec `kube_pod_info` y ajoute le nœud et son adresse :

```yaml
- alert: CIJobRunningTooLong
  expr: |
    count_over_time(kube_customresource_gha_ephemeralrunner_job_info{job_repository=~".+", phase="Running"}[35m:1m]) >= 30
      * on(namespace, pod) group_left(node, host_ip) kube_pod_info
  annotations:
    summary: "Job CI en cours depuis plus de 30 min ({{ $labels.pod }}, {{ $labels.node }})"
    description: "{{ $labels.job_repository }} - https://github.com/{{ $labels.job_repository }}/actions/runs/{{ $labels.workflow_run_id }}"
```

`count_over_time(...[35m:1m])` est une sous-requête : la série est échantillonnée chaque minute sur 35 minutes, et 30 échantillons présents signifient un job en cours depuis au moins 30 minutes. `* on(namespace, pod) group_left(node, host_ip)` multiplie par 1 et copie les labels `node` et `host_ip` de la série de droite, en remplaçant le `node` hérité de la cible (section précédente). Le message contient alors un lien direct vers l'exécution du workflow.

## Routage dans Alertmanager

```yaml
route:
  group_by: ["..."]
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 2h
  receiver: slack
  routes:
    - matchers: ['alertname="NodeRebootRequired"']
      receiver: slack
      repeat_interval: 24h
```

`group_by: ["..."]` désactive le groupement : chaque alerte produit sa propre notification. Le titre du message repose sur `{{ .CommonAnnotations.summary }}`, qui ne contient que les annotations identiques à toutes les alertes du groupe ; deux PVC presque pleins dans le même groupe produiraient un titre vide. Sur un cluster de taille modeste, une notification par alerte reste lisible. La route dédiée espace les rappels d'une alerte informative qui dure par construction plusieurs jours.

## Valider les règles avant déploiement

Les règles vivent dans le `values.yaml` du chart, sous forme de YAML imbriqué dans une ConfigMap. Une erreur de syntaxe PromQL n'apparaît qu'au rechargement de Prometheus, qui conserve alors l'ancienne configuration en silence. La validation passe par le rendu du chart, l'extraction du fichier de règles et `promtool` :

```bash
helm template prometheus prometheus-community/prometheus -f values.yaml > /tmp/render.yaml
python3 -c 'import yaml; [print(d["data"]["alerting_rules.yml"]) for d in yaml.safe_load_all(open("/tmp/render.yaml"))
  if d and d["kind"] == "ConfigMap" and d["metadata"]["name"] == "prometheus-server"]' > /tmp/rules.yml
docker run --rm -v /tmp/rules.yml:/r.yml:ro --entrypoint promtool quay.io/prometheus/prometheus:v3.8.1 check rules /r.yml
```

`promtool check rules` contrôle la syntaxe et la structure, pas la pertinence : une règle qui interroge une métrique inexistante ou dont le format a changé passe la validation. `promtool test rules` complète le contrôle avec des séries simulées et les alertes attendues, au prix de fichiers de test à maintenir.

## Limites

- **Plan de contrôle** : avec kubeadm, etcd, le scheduler et le controller-manager écoutent sur `127.0.0.1` par défaut. Les surveiller impose de modifier leurs manifests statiques.
- **Événements** : un rollout, une éviction ou un nœud qui redémarre produisent des événements Kubernetes, que Prometheus ne collecte pas. Un exporteur d'événements vers Loki comble ce manque.
- **Seuils implicites** : `KubeCronJobLate` et les exclusions de namespaces encodent des hypothèses sur le cluster ; elles doivent être documentées à côté des règles.

## Conclusion

Un socle d'alertes Kubernetes repose sur kube-state-metrics pour l'état des objets, sur le kubelet pour les volumes et sur les composants pour leur propre santé. Les règles elles-mêmes sont courtes ; la difficulté tient au comportement des métriques : états persistants qu'il faut borner dans le temps, formats qui changent d'une version à l'autre sans erreur, labels de cible qui masquent ceux de la métrique, NetworkPolicy qui coupent la collecte. Une alerte n'est fiable qu'une fois confrontée aux séries réellement exposées, et `promtool` n'en vérifie que la forme.

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/professionnel/sonu-k8s-cluster" title="Cluster Kubernetes interne SONU">Socle d'alertes du cluster : nœuds, workloads, stockage Longhorn et Garage, certificats kubeadm, GPU, redémarrages en attente par textfile collector, collecte de Longhorn, Authentik et ARC sans redéployer leurs releases, alertes de CI enrichies du dépôt et du workflow, notifications Slack.</ProjectLink>
</ProjectLinks>
