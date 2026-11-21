---
title: "Prometheus : alertes RED"
description: "Un seul histogramme OpenTelemetry suffit à surveiller un service par son débit, ses erreurs et sa latence. Les règles Prometheus correspondantes, et les surprises qui découlent directement de leurs calculs."
tags: [monitoring, devops]
series: prometheus
---

Une application instrumentée avec OpenTelemetry exporte, sans code supplémentaire, un histogramme de la durée de chaque requête reçue. Cette seule métrique suffit à surveiller un service selon la méthode RED : le débit de requêtes (*Rate*), la part de requêtes en échec (*Errors*) et leur durée (*Duration*). Les trois alertes s'écrivent en quelques lignes de PromQL. Écrites sans précaution, elles détectent une coupure de trafic au bout de plusieurs minutes, se taisent sur les erreurs au moment où le service ne reçoit plus rien, et calculent un percentile supérieur à la durée maximale qu'une requête peut atteindre.

<!--truncate-->

## Une métrique, trois indicateurs

Les [métriques du SDK](./2026-11-22-opentelemetry-metriques-logs.md) suivent les conventions sémantiques. La durée des requêtes reçues, `http.server.request.duration`, arrive dans Prometheus par son récepteur OTLP sous le nom `http_server_request_duration_seconds`, avec les labels `http_route`, `http_request_method` et `http_response_status_code`. Le nom du service ne devient un label de chaque série que si `service.name` figure dans `promote_resource_attributes`, la liste des attributs de ressource promus par la configuration OTLP de Prometheus ; il devient alors `service_name`.

L'histogramme fournit les trois indicateurs. Le débit est le taux d'accroissement de la série `_count`, le nombre de requêtes. Le taux d'erreur est le même taux limité aux réponses 5xx, rapporté au total. La latence est un percentile calculé sur les séries `_bucket`. La méthode RED, formulée par Tom Wilkie, décrit ce que subit l'utilisateur d'un service, là où les métriques d'infrastructure (CPU, mémoire, disque) décrivent l'état de la machine qui l'héberge.

## Règles d'enregistrement

Les trois calculs se répètent dans chaque alerte et dans chaque panneau de tableau de bord. Des règles d'enregistrement les font une fois, à chaque évaluation, et stockent le résultat sous un nouveau nom. La convention de nommage de Prometheus est `niveau:métrique:opérations` : le niveau d'agrégation, la métrique d'origine, puis les opérations appliquées.

```yaml
- record: service:http_server_request_errors_per_requests:ratio_rate5m
  expr: |
    sum by (service_name) (rate(http_server_request_duration_seconds_count{http_response_status_code=~"5.."}[5m]))
    / sum by (service_name) (rate(http_server_request_duration_seconds_count[5m]))
```

Le taux d'erreur est le rapport de deux sommes de taux : celle des requêtes en 5xx, puis celle de toutes les requêtes. Seuls les 5xx comptent, conformément aux conventions sémantiques, qui ne considèrent pas une réponse 4xx comme une panne du serveur. Les deux autres règles suivent le même modèle. Le débit, `service:http_server_request_duration_seconds_count:rate5m`, est la seule somme du dénominateur. La latence applique `histogram_quantile(0.95, …)` à la somme des taux des séries `_bucket`, agrégée par `sum by (le, service_name)` : le label `le` porte la borne supérieure de chaque bucket, et sans lui `histogram_quantile` n'a plus d'histogramme à interpoler et ne renvoie rien.

Les alertes portent ensuite sur ces séries précalculées. L'alerte d'erreur compare le rapport à un seuil (`> 0.05`), l'alerte de débit compare le débit à un plancher, l'alerte de latence compare le percentile à une durée. Chacune a une durée `for` : la condition doit rester vraie pendant cette durée avant que l'alerte passe de l'état `pending` à l'état `firing` et parte vers [Alertmanager](./2026-09-20-prometheus-alertmanager.md).

## Délai de détection

Un test met en évidence le premier comportement. Un service reçoit environ 0,4 requête par seconde, avec une alerte de débit sous 0,1 requête par seconde et `for: 1m`. À la coupure du trafic, l'alerte passe en `pending` au bout de quatre minutes, puis en `firing` une minute plus tard.

Ce délai vient de la fenêtre de `rate(...[5m])`, qui calcule une moyenne sur les cinq dernières minutes. Quand le trafic s'arrête net, la moyenne ne descend que progressivement, à mesure que les minutes de trafic sortent de la fenêtre : il faut ici un peu moins de quatre minutes pour que 0,4 tombe sous 0,1. S'y ajoutent la durée `for`, l'intervalle d'évaluation des règles et l'intervalle d'export du SDK, 60 secondes par défaut.

Une fenêtre plus courte (`[1m]`) réagit plus vite mais suit chaque variation passagère, et une alerte qui s'allume et s'éteint au gré du bruit finit ignorée. Le même compromis vaut pour le seuil : avec un taux d'erreur habituel de 5 % et un seuil à 5 %, l'alerte oscille en permanence. Le seuil se place nettement au-dessus du niveau habituel, et la durée `for` absorbe les pics isolés. Une condition supplémentaire sur un nombre minimal d'erreurs (`increase(...[10m]) >= 5`) évite qu'un service peu sollicité ne déclenche l'alerte pour une seule erreur sur dix requêtes.

## L'alerte d'erreur muette sans trafic

Dans le même test, le service dépend d'un service en aval qui répond 503 à une requête sur dix : son taux d'erreur, autour de 10 %, dépasse le seuil de 5 % et l'alerte d'erreur est déclenchée. À la coupure du trafic, elle se résout, alors que le service en aval n'a pas été réparé.

Le taux d'erreur est une division : erreurs par seconde sur requêtes par seconde. Sans trafic, les deux valent zéro, et `0 / 0` donne `NaN`. Une comparaison avec `NaN` n'est jamais vraie : la condition de l'alerte devient fausse, et l'alerte se résout. Il en va de même pour la latence, dont le percentile n'est plus calculable sans mesures.

L'alerte de débit couvre cet angle mort : c'est la seule des trois qui se déclenche quand un service cesse de recevoir des requêtes. Elle fonctionne parce que le SDK exporte ses compteurs en temporalité cumulative, même sans requête : le débit tombe à zéro au lieu que la série disparaisse. Avec un producteur qui cesse d'exporter, ou un processus arrêté, la série disparaît et il faut une règle construite sur `absent()` ou `absent_over_time()`.

Une variante retire le `NaN` des séries enregistrées. Le dénominateur est filtré (`/ (… > 0)`), si bien qu'un service sans trafic n'a plus de taux d'erreur du tout, au lieu d'un `NaN` qui perturbe tableaux de bord et fonctions comme `quantile_over_time`. Le comportement de l'alerte ne change pas : elle se résout toujours à la coupure, et l'alerte de débit reste nécessaire.

## Des percentiles estimés

Sur un service dont la durée de traitement ne dépasse jamais 800 ms, le 95ᵉ percentile calculé atteint 880 ms. L'écart vient de la façon dont le percentile est calculé.

Un histogramme ne conserve pas les durées, seulement le nombre de mesures par bucket. `histogram_quantile` repère le bucket qui contient le percentile demandé, puis interpole linéairement entre ses bornes, en supposant les mesures réparties uniformément dans ce bucket. Les bornes recommandées pour les durées HTTP passent de 0,75 à 1 seconde : un percentile qui tombe dans cet intervalle est estimé entre ces deux valeurs, même si aucune requête n'a dépassé 800 ms.

La précision dépend donc des bornes des buckets autour des seuils d'alerte. Un seuil placé au milieu d'un large bucket déclenche sur une valeur interpolée. Deux moyens améliorent la précision : déclarer des bornes plus fines autour du seuil par une *View* du SDK, ou utiliser des histogrammes exponentiels, que Prometheus convertit en histogrammes natifs et dont les buckets se resserrent automatiquement. Le premier coûte des séries supplémentaires, le second suppose une version récente de Prometheus et des tableaux de bord adaptés.

## Pièges et limites

Les trois alertes se complètent sans se remplacer. L'alerte de débit ne voit pas un service qui reçoit des requêtes mais n'en traite aucune correctement ; l'alerte d'erreur ne voit pas un service que plus personne n'appelle.

Un plancher de débit fixe convient mal à un service dont le trafic varie fortement entre le jour et la nuit : le seuil qui détecte une coupure en journée déclenche chaque nuit. Une comparaison avec la même heure de la veille (`offset 1d`), ou avec la médiane du service sur plusieurs jours (`quantile_over_time`), s'adapte mieux, au prix d'une période d'apprentissage après chaque mise en service et d'une règle plus difficile à relire.

Ces alertes réagissent à un état récent, sur quelques minutes. Mesurer un objectif de service sur 30 jours (99 % des requêtes en moins de 500 ms) relève des SLO et de leurs alertes sur le rythme de consommation du budget d'erreur, qui tolèrent un pic court et détectent une dégradation lente.

## Alternatives écartées

Les métriques du reverse proxy placé devant les services (par route ou par service) donnent les mêmes trois indicateurs sans instrumenter les applications. Elles mesurent la durée vue par le proxy, réseau compris, et ignorent les appels entre services qui ne passent pas par lui ; elles conviennent comme socle quand les applications ne sont pas instrumentées.

Les span metrics calculées à partir des traces couvrent aussi chaque opération tracée, spans manuels compris. Calculées par le backend, comme le générateur de métriques de Tempo, elles ne voient que les traces conservées après échantillonnage, ce qui les rend fragiles pour des alertes. Calculées dans le Collector, par le connecteur `spanmetrics` placé avant l'échantillonnage, elles comptent toutes les requêtes, au prix d'un Collector qui reçoit la totalité des spans.

Le type de métrique *summary* calcule les percentiles dans l'application, sans interpolation. Ces percentiles ne s'agrègent pas entre plusieurs instances d'un service, et OpenTelemetry ne le produit pas pour les durées de requêtes.

## Conclusion

Pour un service instrumenté, trois règles d'enregistrement et trois alertes sur un seul histogramme couvrent l'essentiel de ce que subissent ses utilisateurs. Elles restent fiables à deux conditions : garder l'alerte de débit, seule à voir une coupure de trafic, et placer des bornes de buckets autour du seuil de latence.

## Ressources utiles

- [Prometheus : règles d'enregistrement](https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/)
- [Prometheus : nommage des règles d'enregistrement](https://prometheus.io/docs/practices/rules/)
- [Prometheus : histogrammes et résumés](https://prometheus.io/docs/practices/histograms/)
- [Prometheus : récepteur OTLP](https://prometheus.io/docs/guides/opentelemetry/)
- [Conventions sémantiques : métriques HTTP](https://opentelemetry.io/docs/specs/semconv/http/http-metrics/)

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/personnel/homelab" title="HomeLab">Alertes de latence et de taux de 5xx par service, calculées sur les métriques de Traefik faute d'applications instrumentées : taux d'erreur enregistré seulement quand le service reçoit du trafic, seuil de latence relatif à la médiane du service sur sept jours.</ProjectLink>
</ProjectLinks>
