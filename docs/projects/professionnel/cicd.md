---
title: "CI/CD - GitHub Actions"
tags: [ci-cd, migration, github-actions, automatisation, sécurité, multi-techno]
---

<div className="project-meta-grid">
 <div className="project-meta-item">📅 Date : 2025</div>
 <div className="project-meta-item">👤 Rôle : Mainteneur</div>
 <div className="project-meta-item">🛠️ Techno : GitHub Actions</div>
</div>

## Description du projet

Refonte et modernisation de la CI/CD de l'équipe avec GitHub Action suite à l'adoption de GitHub dans l'équipe. L'impulsion a été donnée pour concevoir une nouvelle architecture CI/CD collaborative, adaptée aux besoins des développeurs, standardisée, sécurisée et modulaire.

## Réalisations principales

- Construction d'une nouvelle CI/CD collaborative sur GitHub Actions
- Mise en place de workflows réutilisables pour build, test, publish, deploy en fonction des projets (Python, ROS, Docker)
- Sécurisation des accès via gestion des secrets et tokens
- Documentation technique centralisée pour chaque workflow
- Publication automatique de releases/tags
- Support des runners personnalisés et matrices de jobs

## Stack technique

- GitHub Actions : Orchestration des workflows CI/CD, triggers, jobs, matrix
- Python : Build, test, publication de paquets, gestion des artefacts
- ROS : Construction et tests de paquets, multi-distributions
- Docker : Conteneurisation des runners, build/push images
- Kubernetes : Déploiement via Helm

## Liens et ressources 🔗

- [Documentation officielle GitHub Actions](https://docs.github.com/actions)
- [Guide migration GitLab vers GitHub Actions](https://docs.github.com/actions/migrating-from-gitlab)
