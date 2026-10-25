---
title: "AWS : CloudWatch sur EKS"
description: "Superviser un cluster EKS Auto Mode avec CloudWatch : ce qui est collecté sans rien installer, add-on amazon-cloudwatch-observability et EKS Pod Identity, rétention des logs, Application Signals activé par défaut, logs JSON et Logs Insights, alarmes, dashboard en Terraform et postes de coût."
series: aws
tags: [cloud, monitoring, devops]
---

En [EKS](./2026-06-28-eks.md) Auto Mode, AWS gère les nœuds, le réseau des pods, le stockage et les load balancers. La supervision des applications reste en revanche à la charge du client : le modèle de responsabilité partagée d'Auto Mode le dit explicitement. Un cluster fraîchement créé n'envoie à CloudWatch aucune métrique de pod et aucune ligne de log applicatif. Un pod qui redémarre en boucle ou une API qui renvoie des erreurs 500 ne laissent alors de trace que dans `kubectl`, tant que les pods existent encore. Sur un cluster auto-hébergé, ce rôle revient à [Prometheus](../07-monitoring/2025-11-21-prometheus-introduction.md) et [Loki](../07-monitoring/2025-11-21-loki-logs-management.md). Sur AWS, le service natif est CloudWatch. Cet article décrit comment y raccorder un cluster EKS, et les réglages par défaut à corriger dès l'installation.

<!--truncate-->

## Ce que CloudWatch reçoit sans rien installer

Les services gérés publient leurs métriques d'eux-mêmes. RDS publie `CPUUtilization` et `FreeStorageSpace` dans l'espace de noms `AWS/RDS`, et les load balancers publient le nombre de cibles saines et le volume de requêtes. Ces métriques suffisent pour alerter sur une base presque pleine, mais rien n'y décrit les pods.

Le control plane d'EKS peut aussi envoyer ses propres logs : `api`, `audit`, `authenticator`, `controllerManager` et `scheduler`, chaque type s'activant séparément, vers le groupe `/aws/eks/<cluster>/cluster`. Le journal `audit` répond à la question « qui a supprimé ce Deployment, et quand ». Le module Terraform `terraform-aws-modules/eks` (v20) active par défaut `api`, `audit` et `authenticator`, avec 90 jours de rétention. Ces logs sont donc souvent déjà facturés sans que personne ne l'ait décidé. Déclarer ces deux réglages explicitement (`cluster_enabled_log_types`, `cloudwatch_log_group_retention_in_days`) les rend visibles dans le code.

## L'add-on amazon-cloudwatch-observability

La collecte côté cluster passe par un add-on EKS, `amazon-cloudwatch-observability`, compatible avec Auto Mode. Il installe deux DaemonSets.

- **L'agent CloudWatch** produit les métriques Container Insights (espace de noms `ContainerInsights`) : CPU et mémoire par pod, par Service et par namespace, redémarrages de conteneurs, pods en service, nœuds en échec. Les mesures détaillées partent aussi sous forme d'événements de performance dans un groupe de logs dédié.
- **Fluent Bit** lit les logs des conteneurs et les envoie vers trois groupes : `application` (sorties des conteneurs), `dataplane` (kubelet, runtime) et `host` (journaux système du nœud), tous sous `/aws/containerinsights/<cluster>/`.

La correspondance avec une stack auto-hébergée est directe :

| Fonction | Auto-hébergé | CloudWatch |
| --- | --- | --- |
| Métriques des nœuds et des pods | node-exporter, kube-state-metrics, Prometheus | Agent CloudWatch, Container Insights |
| Logs des conteneurs | Alloy ou Promtail, Loki | Fluent Bit, CloudWatch Logs |
| Requêtes | PromQL, LogQL | Métriques CloudWatch, Logs Insights |
| Alertes | Alertmanager | Alarmes CloudWatch, SNS |
| Tableaux de bord | Grafana | Dashboards CloudWatch |

### Droits : EKS Pod Identity

L'agent écrit dans CloudWatch, il lui faut donc un rôle IAM portant la policy gérée `CloudWatchAgentServerPolicy`. Attacher cette policy au rôle des nœuds fonctionne, mais donne ces droits à tous les pods du nœud. La documentation recommande EKS Pod Identity, présenté dans l'article [EKS](./2026-06-28-eks.md) : le rôle fait confiance au service `pods.eks.amazonaws.com`, et l'add-on l'associe au ServiceAccount `cloudwatch-agent`. En Auto Mode, l'agent Pod Identity est déjà présent sur les nœuds. Avec Terraform, l'association se déclare dans la ressource de l'add-on elle-même :

```hcl
pod_identity_association {
  role_arn        = aws_iam_role.cloudwatch_agent.arn
  service_account = "cloudwatch-agent"
}
```

## Piège : des logs conservés indéfiniment

Un groupe de logs CloudWatch créé sans rétention garde ses données pour toujours : c'est la valeur par défaut, affichée « Never expire ». Fluent Bit crée lui-même les groupes `application`, `dataplane` et `host` s'ils n'existent pas, sans rétention. Le stockage croît alors chaque mois, et la facture avec lui.

La correction consiste à créer ces groupes dans Terraform, avec `retention_in_days`, avant l'installation de l'add-on (un `depends_on` sur les groupes suffit). Fluent Bit trouve alors des groupes existants et y écrit sans toucher à leurs réglages. Le groupe `performance`, où l'agent écrit les événements de performance de Container Insights, relève du même traitement. Créer les groupes après coup reste possible : il suffit de les importer dans l'état Terraform, ou de corriger leur rétention.

## Piège : Application Signals activé par défaut

Depuis la version 5.0 de l'add-on, la fonction Application Signals est active dès l'installation, avec un mode *auto monitor* qui couvre tous les workloads exposés par un Service. Pour les langages pris en charge (Java, Python, Node.js, .NET), l'add-on injecte au démarrage des pods un agent OpenTelemetry qui trace chaque requête. La facturation se fait au nombre de requêtes entrantes et sortantes. Une API Python reçoit donc une instrumentation que personne n'a demandée, et une application déjà instrumentée avec OpenTelemetry voit sa configuration modifiée, ce que la documentation signale.

Pour garder la main, il faut désactiver ce mode dans la configuration avancée de l'add-on et réserver l'instrumentation aux services choisis :

```json
{ "manager": { "applicationSignals": { "autoMonitor": { "monitorAllServices": false } } } }
```

Le réglage ne s'applique qu'aux pods créés ensuite : les pods déjà instrumentés le restent jusqu'à leur redémarrage.

## Des logs applicatifs exploitables

Fluent Bit envoie chaque ligne de log enrichie de métadonnées Kubernetes (`kubernetes.namespace_name`, `kubernetes.container_name`, `kubernetes.pod_name`). Si la ligne est un objet JSON, le filtre Kubernetes de Fluent Bit la décompose et range ses champs sous la clé `log_processed`. Une application qui écrit un objet JSON par ligne rend ainsi chaque champ (niveau, route, statut, durée) directement interrogeable. Un texte libre ne serait cherchable que par motif.

Pour une API, une ligne par requête suffit à couvrir l'essentiel : méthode, route, statut, durée. Il faut journaliser le gabarit de route (`/api/v1/tasks/{task_id}`) plutôt que le chemin brut (`/api/v1/tasks/4817`). C'est le même raisonnement que pour les labels de Loki : le chemin brut produit autant de valeurs que d'identifiants, et toute agrégation par route devient inutilisable. Avec ce format, CloudWatch Logs Insights calcule la latence par route :

```text
filter kubernetes.container_name = 'api' and ispresent(log_processed.duration_ms)
| stats count(*) as requests, pct(log_processed.duration_ms, 95) as p95_ms by log_processed.route
| sort p95_ms desc
```

Choisir le niveau de log selon le statut (INFO sous 400, WARNING pour les 4xx, ERROR pour les 5xx) permet de régler le volume par environnement. En production, `LOG_LEVEL=warning` ne garde que les anomalies, et le volume ingéré, facturé au gigaoctet, baisse d'autant. La documentation donne le même conseil pour Fluent Bit, dont la configuration par défaut journalise au niveau INFO.

## Alarmes

Une alarme CloudWatch surveille une métrique et change d'état (`OK`, `ALARM`, `INSUFFICIENT_DATA`) selon un seuil évalué sur un nombre de périodes. Elle notifie un topic SNS, auquel un abonnement mail doit être confirmé depuis le message reçu avant de recevoir quoi que ce soit.

Trois choix pèsent sur la fiabilité des alarmes.

**Transformer des logs en métrique.** Un *metric filter* compte les lignes d'un groupe qui correspondent à un motif. Avec des logs JSON, le motif porte sur les champs : `{ $.kubernetes.container_name = "api" && $.log_processed.level = "ERROR" }` produit une métrique du nombre d'erreurs de l'API, sur laquelle porte ensuite une alarme ordinaire. Ce mécanisme joue le rôle du *ruler* de Loki.

**Choisir les dimensions.** Les noms de pods changent à chaque déploiement : une alarme dimensionnée par pod ne survit pas au premier rollout. Container Insights publie aussi ses métriques par Service et par namespace (`service_number_of_running_pods`, `pod_memory_utilization_over_pod_limit`), des dimensions stables qui conviennent aux alarmes.

**Décider de ce que signifie l'absence de données.** `treat_missing_data` fixe l'état de l'alarme quand la métrique ne reçoit plus de points. Pour un compteur d'erreurs, l'absence de point veut dire zéro erreur (`notBreaching`). Pour le nombre de pods en service, elle veut dire que l'agent ne publie plus rien ou que le service a disparu, ce qui doit alerter (`breaching`).

## Le dashboard dans le code

Un dashboard CloudWatch est un document JSON. La ressource `aws_cloudwatch_dashboard` le déclare dans Terraform, à côté des alarmes qui portent sur les mêmes métriques, et un widget de type `log` y intègre une requête Logs Insights. C'est le même principe que les [dashboards Grafana versionnés](../07-monitoring/2026-10-17-grafana-provisioning.md) : le dépôt est la source, la console n'est qu'un lecteur, et le dashboard survit à la destruction puis à la recréation de l'environnement.

## Coûts

Chaque brique a son propre compteur :

- **CloudWatch Logs** : ingestion au gigaoctet, puis stockage au gigaoctet par mois, d'où l'importance de la rétention et du niveau de log ;
- **Container Insights** : facturation par observation dans le mode à observabilité renforcée, ou par gigaoctet ingéré dans la variante OpenTelemetry ;
- **Application Signals** : par requête entrante et sortante, et par SLO configuré ;
- **Alarmes et dashboards** : par alarme et par mois, et par dashboard au-delà du niveau gratuit.

Sur un petit cluster, l'ingestion des logs est en général le premier poste. Un service bavard en DEBUG ou un composant qui journalise chacune de ses requêtes peut la multiplier, comme sur une stack auto-hébergée, avec la différence que le coût apparaît ici sur la facture et non sur un disque.

## Limites

- **Dépendance au fournisseur** : métriques, requêtes, alarmes et dashboards ne se transportent pas vers un autre cloud ni vers un cluster sur site. La variante OpenTelemetry de Container Insights (add-on v6.2 et suivants) accepte PromQL, ce qui réduit l'écart avec Prometheus.
- **Logs Insights** : le langage est efficace pour agréger, mais facturé au volume parcouru. Une requête sur trente jours de logs d'un cluster entier a un coût direct.
- **Métriques applicatives** : Container Insights décrit l'infrastructure et les pods, pas le métier de l'application. Les métriques propres à l'application passent par des metric filters, le format EMF ou OpenTelemetry.

## Conclusion

L'add-on `amazon-cloudwatch-observability` donne à un cluster EKS l'équivalent d'une stack Prometheus et Loki sans serveur à exploiter, au prix de deux réglages par défaut à corriger dès l'installation : la rétention infinie des groupes de logs, et Application Signals qui instrumente tous les services. Côté application, des logs JSON avec un gabarit de route rendent Logs Insights et les metric filters directement utilisables. Côté alarmes, les points sensibles sont les dimensions stables et le traitement explicite des données manquantes. L'ensemble tient dans un fichier Terraform, versionné et relu comme le reste de l'infrastructure.

## Ressources utiles

- [Add-on Amazon CloudWatch Observability](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/install-CloudWatch-Observability-EKS-addon.html)
- [Métriques Container Insights pour EKS](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Container-Insights-metrics-EKS.html)
- [Logs du control plane EKS](https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html)
- [Syntaxe des filtres et motifs CloudWatch Logs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntax.html)

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/personnel/task-horizon" title="TaskHorizon">Observabilité CloudWatch du cluster EKS décrite en Terraform : add-on avec Pod Identity, groupes de logs à rétention fixée, Application Signals désactivé, alarmes SNS et dashboard. L'API écrit des logs JSON par requête, avec le gabarit de route.</ProjectLink>
</ProjectLinks>
