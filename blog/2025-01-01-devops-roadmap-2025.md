---
title: DevOps Roadmap 2025
description: Présentation de ma roadmap DevOps personnelle 2025
tags: [devops]
---

Voici un résumé de ma roadmap DevOps personnelle pour 2025. Cette roadmap s’appuie sur les réalisations de l’année précédente et vise à approfondir l’orchestration, l’observabilité et l’Infrastructure as Code. Elle évolue au fil des projets, des expérimentations et des apprentissages partagés sur le blog.

<!--truncate-->

# DevOps Roadmap 2025

import IconTitle from '@site/src/components/IconTitle';

![DevOps](/img/devops.png)

## Roadmap 2025

### <IconTitle logo="skill-icons:kubernetes" name="06 Orchestration de conteneurs - Kubernetes & Docker Swarm"/>

[Orchestration](/blog/tags/orchestration) Maîtrise des composants de base (Deployment, Service, ConfigMap, Secret, StatefulSet), utilisation avancée de la CLI Kubernetes (kubectl), persistance des données avec les volumes, externalisation des configurations avec ConfigMap et Secret, gestion des accès via Ingress (Nginx). Objectif : piloter des clusters multi-applications, automatiser le déploiement et renforcer la sécurité.

### <IconTitle logo="skill-icons:prometheus" name="07 Monitoring & Observabilité"/>

[Observabilité](/blog/tags/monitoring) Intégration de Grafana pour l’analyse et la visualisation interactive, Prometheus pour la surveillance et l’alerte, Loki pour la gestion centralisée des logs. Mise en place de dashboards, alertes et supervision multi-environnements.

### <IconTitle logo="skill-icons:terraform-light" name="08 Infrastructure as Code"/>

[Infrastructure as Code](/blog/tags/iac) Automatisation avancée de la configuration et du déploiement avec Ansible, exploration de Terraform pour la gestion d’infrastructures cloud et on-premise, documentation des workflows et partage des bonnes pratiques.

## Bilan 2024

### <IconTitle logo="skill-icons:linux-light" name="02 OS & Linux"/>

[Système & Linux](/blog/tags/linux) Les notions de réseau, sécurité, configuration des pare-feu, équilibreurs de charge, proxies, HTTP/HTTPS et virtualisation ont été approfondies et mises en œuvre dans des projets d’auto-hébergement et de sécurisation d’infrastructures. Voir [FervantFactory](/docs/projects/personnel/fervantfactory) et [delpeuch.net](/docs/projects/personnel/delpeuch-net).

### <IconTitle logo="skill-icons:docker" name="03 Contenérisation - Docker"/>

[Conteneurisation](/blog/tags/containerization) Déploiement et supervision de stacks Docker Compose et Swarm, gestion centralisée des configurations, automatisation des mises à jour, documentation des architectures modulaires. Expérimentation de l’orchestration à l’échelle domestique, avec un accent sur la reproductibilité et la sécurité. Voir [FervantFactory](/docs/projects/personnel/fervantfactory).

### <IconTitle logo="skill-icons:githubactions-light" name="04 CI/CD Pipeline"/>

[CI/CD](/blog/tags/cicd) Modernisation des pipelines CI/CD avec GitHub Actions, conception de workflows réutilisables, sécurisation des accès, documentation technique centralisée, publication automatique de releases/tags, support des runners personnalisés et matrices de jobs. Voir [CI/CD GitHub Actions](/docs/projects/professionnel/cicd) et [GitHub ARC Kubeadm](/docs/projects/professionnel/github-arc-kubeadm).
