---
title: Blog
description: Blog technique DevOps tenu depuis 2024 comme outil d'apprentissage, organisé par domaine et relié aux projets du portfolio.
tags: [devops, docusaurus, documentation, veille]
---

<img src="/img/project/delpeuch.png" alt="Aperçu blog delpeuch.net" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<ProjectMeta
  start="2024"
  role="Auteur"
  domain="Veille DevOps, retours d'expérience"
  stack={["Docusaurus", "MDX", "GitHub Copilot"]}
/>

## Contexte

Ingénieur en informatique spécialisé robotique au CATIE, j'ai décidé en 2024 de me spécialiser en DevOps. Ce choix s'est accompagné d'un constat : expliquer un sujet est le test le plus fiable de sa compréhension. Écrire un article force à structurer, à trouver les bonnes formulations, à repérer ce que l'on croyait comprendre sans le maîtriser. Le blog est né de cette démarche : il sert d'abord à apprendre, ensuite à publier.

Environ 70 articles techniques publiés depuis 2024, auxquels s'ajoutent les roadmaps annuelles, répartis en huit domaines : réseau, conteneurisation, CI/CD, cloud (AWS), orchestration, observabilité, infrastructure as code (Ansible, Terraform) et scripting Python.

## La roadmap comme fil directeur

Le point de départ est une roadmap DevOps personnelle, publiée chaque début d'année. Elle trace les domaines à explorer, les outils à maîtriser, les projets à réaliser, et chaque entrée renvoie aux articles ou aux projets produits dans l'année.

La roadmap 2024 posait les fondations : Docker, CI/CD, cloud, Kubernetes, monitoring, Ansible. La roadmap 2025 a approfondi Kubernetes, la stack Prometheus/Loki, et Ansible avec des cas pratiques réels (cluster GitHub ARC, déploiement Swarm). La roadmap 2026 se concentre sur AWS et Terraform. Lus côte à côte, ces trois articles montrent l'évolution des priorités : ce qui est acquis, ce qui a glissé à l'année suivante, ce qui a été abandonné.

## La structure du blog

Les articles sont organisés par domaine technique dans la barre de navigation, pas seulement par date. L'objectif est de rendre le blog utilisable comme base de référence : en revenant sur un sujet six mois plus tard, l'article se retrouve par son domaine plutôt que dans une liste chronologique.

Les tags sont déclarés dans un fichier `tags.yaml` versionné, et chaque article s'y réfère. Ce référentiel unique évite d'accumuler des variantes (`k8s`, `kubernetes`, `Kubernetes`…) au fil des publications.

Les articles sont aussi reliés aux projets qui les ont motivés : les articles AWS, Terraform et Kubernetes depuis la page [TaskHorizon](task-horizon.md), les articles sur les runners auto-hébergés depuis la page [GitHub ARC](../professionnel/github-arc-kubeadm.md), les articles Authelia, Renovate ou Sablier depuis la page [HomeLab](homelab.md). Cette double entrée, par thème dans le blog et par usage dans les projets, est volontaire.

## Écrire avec des assistants IA

Depuis 2024, des assistants IA font partie de la démarche de rédaction : GitHub Copilot d'abord, puis Claude Code, dont les consignes de ton et de structure sont versionnées dans le dépôt (`CLAUDE.md`). Le processus type : notes brutes prises pendant l'exploration d'un outil ou d'un concept, puis structuration de ces notes en article, génération d'exemples de configuration, reformulation des passages trop denses, relecture. L'IA ne remplace pas le travail de compréhension : elle réduit le temps entre « j'ai compris » et « c'est lisible et structuré ». Les articles dont je ne maîtrisais pas le sujet le montrent immédiatement à la relecture : la structure tient, mais le fond sonne creux.

## Liens

- [Blog](/blog/)
- [Page projet du site delpeuch.net](delpeuch-net.md)
- [DevOps Roadmap 2024](/blog/2024/01/01/devops-roadmap-2024)
- [DevOps Roadmap 2025](/blog/2025/01/01/devops-roadmap-2025)
- [DevOps Roadmap 2026](/blog/2026/01/01/devops-roadmap-2026)
- 💻 Code source : [github.com/sedelpeuch/sedelpeuch.github.io](https://github.com/sedelpeuch/sedelpeuch.github.io)
