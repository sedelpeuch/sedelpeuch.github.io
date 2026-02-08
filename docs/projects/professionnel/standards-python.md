---
title: "Définition des standards Python"
tags: [python, standards, cookiecutter, qualité, tests, ci-cd, automation, best-practices]
---

<div className="project-meta-grid">
 <div className="project-meta-item">📅 Date : 2026</div>
 <div className="project-meta-item">👤 Rôle : Mainteneur</div>
 <div className="project-meta-item">🛠️ Techno : Python 3.11+, uv, pytest, ruff, pre-commit, Docker, GitHub Actions</div>
</div>

## Description du projet

Définition et mise en œuvre des standards pour les projets Python de l'équipe, via un template Cookiecutter maintenu et évolutif. Objectif : garantir une structure moderne, une qualité de code élevée, des tests systématiques, une CI/CD automatisée et une documentation accessible.

## Réalisations principales

- Création et maintenance d'un template Cookiecutter pour projets Python (scripts, modules, applications)
- Adoption d'une stack moderne : uv pour les dépendances, pytest pour les tests, ruff pour le linting/formatage, Docker pour la containerisation
- Mise en place de workflows GitHub Actions pour CI/CD (lint, tests, build, release, déploiement)
- Intégration de pre-commit hooks pour la qualité et la cohérence du code
- Structuration des projets : README, LICENSE, tests, docstrings, type hints, versioning automatique
- Support multi-projets : scripts utilitaires, modules réutilisables, applications long-running

## Stack technique

- Python 3.11+ : Langage principal, typage moderne, docstrings
- uv : Gestion ultra-rapide des dépendances, remplace Poetry
- pytest & pytest-cov : Tests unitaires, couverture
- ruff : Linting et formatage, remplace Black/isort/flake8
- pre-commit : Hooks pour vérification automatique
- Docker : Containerisation, développement et production
- GitHub Actions : CI/CD complète (lint, test, build, release, deploy)

## Liens et ressources 🔗

- [Template Cookiecutter Python Package](https://github.com/catie-aq/cookiecutter_python-package)
- [Documentation uv](https://github.com/astral-sh/uv)
- [Ruff](https://github.com/astral-sh/ruff)
- [pytest](https://docs.pytest.org/)
- [GitHub Actions](https://docs.github.com/actions)
