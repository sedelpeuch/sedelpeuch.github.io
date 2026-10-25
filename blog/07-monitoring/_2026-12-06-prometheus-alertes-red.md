---
title: "Prometheus : alertes RED"
description: "Alertes RED (Rate, Errors, Duration) sur les métriques HTTP d'OpenTelemetry dans Prometheus : règles d'enregistrement, seuils et durée de for, délai dû à la fenêtre de rate, alerte d'erreur muette sans trafic, interpolation des percentiles d'histogramme."
tags: [monitoring, devops]
series: opentelemetry
---

Une application instrumentée avec OpenTelemetry exporte, sans code supplémentaire, un histogramme de la durée de chaque requête reçue. Cette seule métrique suffit à surveiller un service selon la méthode RED : le débit de requêtes (*Rate*), la part de requêtes en échec (*Errors*) et leur durée (*Duration*). Écrire ces trois alertes dans Prometheus est rapide, mais leur comportement réel réserve des surprises : un délai de détection de plusieurs minutes, une alerte d'erreur qui se tait quand le service ne reçoit plus rien, un percentile supérieur à la durée maximale possible. Cet article décrit les règles, puis ces trois comportements et leur origine.

<!--truncate-->

## Une métrique, trois indicateurs

Les [métriques du SDK](./2026-11-22-opentelemetry-metriques-logs.md) suivent les conventions sémantiques. La durée des requêtes reçues, `http.server.request.duration`, arrive dans Prometheus par son récepteur OTLP sous le nom `http_server_request_duration_seconds`, avec les labels `http_route` et `http_response_status_code`. La configuration OTLP de Prometheus (`promote_resource_attributes`) transforme en labels les attributs de ressource choisis, dont `service.name`, qui devient `service_name`.

L'histogramme fournit les trois indicateurs :

- **Rate** : le taux d'accroissement de `_count`, le nombre de requêtes ;
- **Errors** : le même taux limité aux codes 5xx, rapporté au total ;
- **Duration** : un percentile calculé sur les `_bucket`.

## Règles d'enregistrement

Les trois calculs se répètent dans chaque alerte et chaque panneau de dashboard. Des **règles d'enregistrement** les font une fois, à intervalle régulier, et stockent le résultat sous un nouveau nom. La convention de nommage de Prometheus est `niveau:métrique:opérations` :

```yaml
- record: service:http_requetes:rate5m
  expr: sum by (service_name) (rate(http_server_request_duration_seconds_count[5m]))
- record: service:http_latence:p95_5m
  expr: histogram_quantile(0.95, sum by (le, service_name) (rate(http_server_request_duration_seconds_bucket[5m])))
```

Le taux d'erreur suit le même modèle : la somme des taux filtrée sur `http_response_status_code=~"5.."`, divisée par la somme des taux sans filtre. Seuls les 5xx comptent, conformément aux conventions sémantiques qui ne considèrent pas un 4xx comme une erreur du serveur.

Les alertes portent ensuite sur ces séries précalculées : débit inférieur à un plancher, taux d'erreur supérieur à quelques pour cent, percentile au-dessus d'un seuil de latence. Chacune a une durée `for` : la condition doit rester vraie pendant cette durée avant que l'alerte passe de `pending` à `firing` et parte vers [Alertmanager](./2026-09-20-prometheus-alertmanager.md).

## Délai de détection

Un test simple consiste à couper le trafic d'un service qui reçoit environ 0,4 requête par seconde, avec une alerte de débit à 0,1 requête par seconde et `for: 1m`. L'alerte passe en `pending` au bout de quatre minutes, puis en `firing` une minute plus tard.

Ce délai vient de la fenêtre de `rate(...[5m])`, qui calcule une moyenne sur les cinq dernières minutes. Quand le trafic s'arrête net, la moyenne ne descend que progressivement, au fur et à mesure que les minutes de trafic sortent de la fenêtre ; il faut ici quatre minutes pour passer sous le seuil. S'y ajoutent la durée `for`, l'intervalle d'évaluation des règles et l'intervalle d'export du SDK.

Une fenêtre plus courte (`[1m]`) réagit plus vite mais suit chaque variation passagère, et une alerte qui s'allume et s'éteint au gré du bruit finit ignorée. Le même compromis s'applique au seuil : un taux d'erreur normal de 5 % avec un seuil à 5 % produit une alerte qui oscille. Le seuil se place nettement au-dessus du niveau habituel, et la durée `for` absorbe les pics isolés.

## L'alerte d'erreur muette sans trafic

Pendant la même coupure, l'alerte de taux d'erreur, déclenchée juste avant, disparaît. Le service ne va pas mieux pour autant.

Le taux d'erreur est une division : erreurs par seconde sur requêtes par seconde. Sans trafic, les deux valent zéro, et `0 / 0` donne `NaN`. Une comparaison avec `NaN` n'est jamais vraie, si bien que la condition de l'alerte devient fausse et que l'alerte se résout. Il en va de même pour la latence, dont le percentile n'est plus calculable sans mesures.

L'alerte de débit est donc indispensable aux deux autres : c'est la seule qui se déclenche quand un service cesse de recevoir des requêtes, cas où les alertes d'erreur et de latence se taisent. Elle fonctionne parce que le SDK exporte ses compteurs en temporalité cumulative, même sans requête : le débit tombe à zéro au lieu que la série disparaisse. Avec un producteur qui cesse d'exporter, il faudrait une règle construite sur `absent()` ou `absent_over_time()`.

## Des percentiles estimés

Sur un service dont la durée de traitement ne dépasse jamais 800 ms, le 95ᵉ percentile calculé atteint 880 ms. L'écart vient de la façon dont le percentile est calculé.

Un histogramme ne conserve pas les durées, seulement le nombre de mesures par bucket. `histogram_quantile` repère le bucket qui contient le percentile demandé, puis interpole linéairement entre ses bornes, en supposant les mesures réparties uniformément dans ce bucket. Les buckets par défaut du SDK passent de 0,75 à 1 seconde : un percentile qui tombe dans cet intervalle est estimé entre ces deux valeurs, même si aucune requête n'a dépassé 800 ms.

La précision dépend donc des bornes des buckets autour des seuils d'alerte. Deux moyens l'améliorent : déclarer des bornes plus fines par une *View* du SDK, ou utiliser des histogrammes exponentiels, convertis en histogrammes natifs par Prometheus, dont les buckets se resserrent automatiquement.

## Limites

- **Le débit seul ne voit pas tout** : un service qui reçoit des requêtes mais n'en traite aucune correctement est couvert par l'alerte d'erreur, pas par celle de débit. Les trois alertes se complètent.
- **Plancher de débit** : un seuil de débit fixe ne convient pas à un service dont le trafic varie fortement entre le jour et la nuit. Une comparaison avec la même heure de la veille (`offset 1d`) s'adapte mieux à ce cas.
- **Pas d'objectif sur la durée** : ces alertes réagissent à un état instantané. Mesurer un objectif de service sur 30 jours ("99 % des requêtes en moins de 500 ms") relève des SLO et de leurs alertes sur le taux de consommation du budget d'erreur.

## Conclusion

Un seul histogramme produit par le SDK donne le débit, le taux d'erreur et les percentiles de latence d'un service, et des règles d'enregistrement les rendent disponibles à toutes les alertes. Le comportement de ces alertes découle directement de leurs calculs : la fenêtre de `rate` retarde la détection d'une coupure, la division du taux d'erreur devient `NaN` sans trafic et fait taire l'alerte, et les percentiles sont interpolés dans les buckets. L'alerte de débit couvre l'angle mort des deux autres, et les bornes des buckets autour des seuils déterminent la précision des alertes de latence.

## Ressources utiles

- [Prometheus : règles d'enregistrement](https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/)
- [Prometheus : bonnes pratiques de nommage des règles](https://prometheus.io/docs/practices/rules/)
- [Prometheus : histogrammes et résumés](https://prometheus.io/docs/practices/histograms/)
- [Prometheus : récepteur OTLP](https://prometheus.io/docs/guides/opentelemetry/)
- [Conventions sémantiques : métriques HTTP](https://opentelemetry.io/docs/specs/semconv/http/http-metrics/)

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/professionnel/sonu-k8s-cluster" title="Cluster Kubernetes interne DiscoDiode">Alertes RED sur les applications internes instrumentées, envoyées sur Slack par l'Alertmanager du cluster à côté des alertes d'infrastructure existantes.</ProjectLink>
</ProjectLinks>
