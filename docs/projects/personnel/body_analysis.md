---
title: Body Analysis
tags: [fastapi, react, postgresql, minio, docker, python, data-analysis, quantified-self]
description: Application de suivi et d'analyse corporelle (FastAPI, React, PostgreSQL, MinIO) — ingestion des exports Samsung Health, analytics d'entraînement (TRIMP, ACWR, dérive cardiaque) et galerie photo confidentielle.
---

<img src="/img/project/body_analysis.png" alt="Aperçu dashboard body_analysis" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<ProjectMeta
  start="2023"
  role="Auteur (projet solo)"
  domain="Analyse de données, quantified self"
  stack={["FastAPI", "React", "PostgreSQL", "MinIO", "Docker"]}
/>

## Contexte

Samsung Health exporte des CSV et fichiers d'activité bruts, sans aucune visualisation exploitable. Passer par une application tierce aurait signifié confier des données de santé (poids, composition corporelle, fréquence cardiaque, photos de suivi) à un service externe. J'ai construit la chaîne moi-même — ingestion, modélisation, analytics, interface — déployée sur mon infrastructure personnelle et alimentée en continu depuis 2023.

Le projet a été réécrit en 2026 : la version initiale était une application Streamlit monolithique ; la version actuelle sépare une API FastAPI et une SPA React, avec une persistance PostgreSQL et un stockage objet MinIO pour les photos.

## Stack technique

<div className="tech-list">
  <div className="tech-list-row">
    <div className="tech-list-label">Backend</div>
    <div className="tech-list-value">Python, FastAPI, SQLAlchemy (async), Pydantic, Alembic, uv</div>
  </div>
  <div className="tech-list-row">
    <div className="tech-list-label">Frontend</div>
    <div className="tech-list-value">React, TypeScript, Vite</div>
  </div>
  <div className="tech-list-row">
    <div className="tech-list-label">Données</div>
    <div className="tech-list-value">PostgreSQL, MinIO (stockage objet S3)</div>
  </div>
  <div className="tech-list-row">
    <div className="tech-list-label">Traitement d'image</div>
    <div className="tech-list-value">Pillow</div>
  </div>
  <div className="tech-list-row">
    <div className="tech-list-label">Conteneurisation</div>
    <div className="tech-list-value">Docker, Docker Compose</div>
  </div>
  <div className="tech-list-row">
    <div className="tech-list-label">CI/CD</div>
    <div className="tech-list-value">GitHub Actions, GitHub Container Registry</div>
  </div>
  <div className="tech-list-row">
    <div className="tech-list-label">Qualité</div>
    <div className="tech-list-value">pytest, Vitest, Ruff, pre-commit</div>
  </div>
</div>

## Ingestion des exports Samsung Health

L'export Samsung Health est une archive ZIP volumineuse (1,3 Go décompressés pour l'export réel de ce projet, environ 88 000 fichiers) et non fiable par construction : c'est une entrée utilisateur, pas un format contrôlé. L'extraction vérifie donc les chemins de chaque entrée avant d'écrire le moindre octet, pour bloquer une évasion de répertoire (zip-slip), et suit le volume décompressé en continu pendant l'écriture plutôt que de se fier à la taille déclarée dans les métadonnées de l'archive, qu'un fichier malveillant contrôle entièrement. Le nombre d'entrées est également plafonné, pour se prémunir d'une bombe de décompression.

Les CSV eux-mêmes varient selon la version de l'application source : champs absents, dates mal formées, types numériques instables. Chaque module d'ingestion valide et normalise sa source avant de la faire entrer dans le modèle relationnel, plutôt que de laisser une exception de parsing interrompre silencieusement le traitement d'une ligne.

## Analytics d'entraînement

Le module `analytics/` du backend est délibérément isolé de la base de données et du framework web : chaque fonction prend des structures de données en entrée et retourne des structures en sortie, ce qui les rend testables sans infrastructure. Il couvre plusieurs métriques issues de la physiologie de l'effort :

- **TRIMP** (Training Impulse) : charge d'un entraînement calculée par intégration de la réserve de fréquence cardiaque sur la durée de la séance, pondérée par une fonction exponentielle qui accorde plus de poids aux efforts proches du maximum.
- **Charge aiguë/chronique (ACWR)** : rapport entre la charge d'entraînement moyenne sur 7 jours et sur 28 jours, indicateur de risque de blessure par sur-sollicitation quand ce ratio s'éloigne trop de 1.
- **Dérive cardiaque** : écart de fréquence cardiaque moyenne entre la première et la seconde moitié d'une séance à effort comparable, signe de fatigue ou de perte d'économie de course.
- **Zones de fréquence cardiaque** : répartition du temps d'entraînement par zone (récupération à maximal), calculée à partir des échantillons de fréquence cardiaque et de la fréquence maximale de l'utilisateur.

D'autres modules du même dossier couvrent la composition corporelle, la nutrition, les records personnels et les phases (bulk, cut, maintien), chacun avec sa propre logique de calcul mais la même contrainte d'isolation.

## Photos et confidentialité

Les photos de suivi corporel sont par nature privées. Elles sont stockées dans MinIO plutôt que sur le système de fichiers de l'application, à travers un client dédié qui centralise tous les appels au SDK S3 : le reste du backend ne connaît jamais MinIO directement, ce qui permet de le substituer par un double de test dans la suite unitaire.

Le traitement d'image ne fait confiance ni à l'extension du fichier envoyé ni au `Content-Type` déclaré par le client : le type réel est déterminé en inspectant les premiers octets du fichier. L'orientation est corrigée à partir du tag EXIF plutôt que d'une heuristique sur les dimensions de l'image, ce qui corrige un bug de l'ancienne version qui retournait à tort toute photo réellement prise en format paysage. En mode confidentiel, chaque photo est floutée par filtre gaussien à la volée, sans jamais mettre en cache le rendu flouté : l'original stocké reste la seule version durable.

## Déploiement

L'application se compose de quatre services orchestrés par Docker Compose : PostgreSQL, MinIO, l'API FastAPI et le frontend, complétés par une seconde instance PostgreSQL dédiée aux tests d'intégration, pour que la suite de tests ne touche jamais aux données réelles. Le frontend a deux profils distincts : un service de développement (Node + Vite, rechargement à chaud) actif par défaut, et une image de production (build statique servi par nginx, sans runtime Node) qui ne démarre que sur demande explicite via un profil Compose, pour valider l'image avant bascule sans interrompre l'environnement de développement.

Le workflow GitHub Actions construit et publie les deux images (API et frontend) sur GitHub Container Registry à chaque push sur `master`, chacune taguée à la fois `latest` et par SHA de commit. En production, l'application tourne sur mon [homelab](homelab.md) : utilisée quelques minutes par semaine, elle est arrêtée par Sablier après 30 minutes d'inactivité et redémarrée à la première requête, ce qui libère la mémoire occupée au repos par ses conteneurs.

## Tests

La suite de tests backend compte 51 fichiers et près de 300 fonctions de test, réparties entre tests unitaires (calcul des métriques d'analytics, traitement d'image, sécurité de l'extraction ZIP) et tests d'intégration sur les services exposés par l'API. Le frontend dispose de sa propre suite Vitest.

## Liens

- 💻 Code source : [github.com/sedelpeuch/body_analysis](https://github.com/sedelpeuch/body_analysis)
- [uv : gestion des dépendances Python](/blog/2025/12/19/09-scripting/uv-python)
- [Docker best practices](/blog/2024/12/20/03-containerization/docker-best-practices)
- [Traefik et Sablier : scale-to-zero](/blog/2026/08/30/06-orchestration/traefik-sablier)
- [HomeLab](homelab.md) : infrastructure qui héberge l'application
