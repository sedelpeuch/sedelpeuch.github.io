---
title: Dolibarr Project Dashboard
description: Tableau de bord FastAPI + React qui agrège les données de plusieurs projets Dolibarr (tâches, temps passé, factures, opportunités) pour le pilotage multi-projets, livré en image Docker unique.
tags: [fastapi, react, typescript, dolibarr, erp, docker, python]
---

<img src="/img/project/dolibarr_project_dashboard.png" alt="Aperçu Dolibarr Project Dashboard" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<ProjectMeta
  start="2026"
  role="Auteur (projet solo)"
  domain="Tableau de bord, ERP, pilotage multi-projets"
  stack={["FastAPI", "React", "TypeScript", "Tailwind", "Docker"]}
/>

## Contexte

Dolibarr est un ERP open source complet, mais son interface native est pensée pour naviguer dans un projet à la fois. Pour un coordinateur qui suit plusieurs projets simultanément, avoir une vue consolidée (tâches, temps passé par utilisateur, factures, propositions commerciales, clients) demande de naviguer entre des dizaines d'écrans. Ce dashboard agrège ces informations en une seule page, en interrogeant directement l'API REST de l'instance Dolibarr, complétée par une API Rails interne (Gaaspard) pour les opportunités commerciales.

Projet expérimental, développé pour mon usage de coordinateur au CATIE et comme terrain d'expérimentation pour le développement assisté par agents IA.

## Fonctionnalités

Le dashboard affiche une vue globale des projets sélectionnés. Pour chaque projet : liste des tâches avec statut, temps passé décomposé par utilisateur, factures avec montants et statuts, propositions commerciales et leur détail, client associé avec lien direct vers Dolibarr. La sélection des projets à suivre est configurable depuis l'interface, sans redémarrage, persistée dans un fichier `data.json`.

Au-delà du suivi projet par projet, le dashboard couvre trois axes de pilotage supplémentaires :

- **Méta-projets** : regroupement de plusieurs projets Dolibarr sous un même KPI agrégé (budget, avancement), pour suivre un programme plutôt qu'un projet isolé.
- **Opportunités commerciales** : vue kanban par étape de pipeline, avec taux de conversion et montants agrégés.
- **Feuille de route R&D** : une timeline gérée en CRUD complet, indépendante des projets Dolibarr, pour suivre les initiatives internes.

S'y ajoutent le suivi du pointage par utilisateur, une vue de gestion de charge par personne et la possibilité de marquer un projet comme coordonné par l'utilisateur courant, pour distinguer les projets pilotés des projets simplement suivis.

## Architecture

Le backend FastAPI est organisé en trois couches strictement séparées. La couche routes est fine : elle gère la validation HTTP et délègue immédiatement. La couche services contient toute la logique métier : agrégation des données multi-projets, transformations, orchestration des appels. La couche infrastructure isole les détails d'intégration : clients HTTP (httpx) vers Dolibarr et Gaaspard, stockage JSON, cache, logging.

Pour un backend d'environ 1 800 lignes, cette séparation reste justifiée : elle rend les services testables indépendamment de l'infrastructure, et l'infrastructure remplaçable sans toucher à la logique métier.

Le frontend est React + TypeScript + Vite + Tailwind. Les appels API passent par Axios, l'état est géré en hooks React sans bibliothèque de gestion d'état : la complexité ne le justifie pas encore.

## Décisions techniques notables

### Un cache thread-safe générique

Certaines données Dolibarr changent rarement, comme les noms de clients, les informations de tiers. Les récupérer à chaque requête de dashboard serait inutilement lent. Le cache `ThreadSafeCache[T]` est une classe générique avec un `RLock` Python, exposant une méthode `get_or_set` pour le calcul paresseux : si la valeur est absente, la fonction de calcul est appelée et son résultat mis en cache. Le `RLock` (reentrant lock) permet les appels imbriqués depuis le même thread sans deadlock.

### JSON plutôt qu'une base de données

Les données de configuration (liste des projets à suivre) sont stockées dans un fichier `data.json` rechargé à chaque requête. Pas de base de données, pas d'ORM, pas de migrations. Pour quelques dizaines d'entrées qui changent rarement, ce choix supprime toute dépendance supplémentaire, simplifie le déploiement et permet d'inspecter l'état à la main. Le fichier vit dans un volume Docker (`DATA_DIR`), ce qui le fait survivre aux mises à jour de l'image. Le fichier est recréé automatiquement au démarrage s'il n'existe pas.

### Logging structuré en JSON

Les logs sont émis en JSON plutôt qu'en texte libre. Chaque entrée contient le timestamp, le niveau, le logger et le message, avec un champ `context` pour les données structurées (ID de projet, durée d'appel API, etc.). En développement, la lecture est un peu moins directe, mais en production les logs se filtrent par champ sans expressions régulières fragiles.

### Configuration vérifiée au démarrage

L'URL de l'instance Dolibarr et la clé API sont lues depuis les variables d'environnement par une classe `Settings` instanciée à l'import du module. Si l'une des deux manque, l'application refuse de démarrer avec un message explicite, plutôt que d'échouer à mi-chemin de la première requête. Le répertoire de données est lui aussi configurable (`DATA_DIR`) ; l'hôte et le port d'écoute restent fixés dans le code.

## Déploiement

L'application est livrée sous la forme d'une image Docker unique, construite en trois étapes : installation des dépendances Python avec uv, build statique du frontend avec Vite, puis image d'exécution qui lance l'API (uvicorn) et sert le frontend compilé. Un workflow GitHub Actions publie l'image sur GitHub Container Registry à chaque push sur `main`, taguée `latest` et par SHA de commit. Un fichier Docker Compose suffit ensuite pour la faire tourner, avec un volume pour `data.json`.

## Limites connues

Le projet est explicitement expérimental. Il n'y a pas d'authentification côté dashboard : toute personne ayant un accès réseau peut le consulter. La clé API Dolibarr est fournie par variable d'environnement, mais aucun audit de sécurité formel n'a été mené. Une exposition sur une infrastructure ouverte demanderait un travail supplémentaire, par exemple une authentification déléguée à un [reverse proxy avec forward auth](/blog/2026/08/02/02-network/authelia-forward-auth).

Il n'y a pas non plus de tests automatisés. L'architecture les rend possibles (services remplaçables par des doubles de test) et pytest figure dans les dépendances de développement, mais les tests n'ont pas encore été écrits.

## Liens

- 💻 Code source : [github.com/sedelpeuch/dolibarr_project_dashboard](https://github.com/sedelpeuch/dolibarr_project_dashboard)
