---
title: Dolibarr Project Dashboard
---

<img src="/img/project/dolibarr_project_dashboard.png" alt="Aperçu Dolibarr Project Dashboard" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<div className="project-meta-grid">
  <div className="project-meta-item">📅 2026</div>
  <div className="project-meta-item">📖 Dashboard · ERP · Pilotage multi-projets</div>
  <div className="project-meta-item">🔧 FastAPI · React · TypeScript · Tailwind · Docker</div>
</div>

## Le contexte

Dolibarr est un ERP open source complet, mais son interface native est pensée pour naviguer dans un projet à la fois. Pour un coordinateur qui suit plusieurs projets simultanément, avoir une vue consolidée — tâches, temps passé par utilisateur, factures, propositions commerciales, clients — demande de naviguer entre des dizaines d'écrans. Ce dashboard agrège tout ça en une seule page, en interrogeant directement l'API REST de l'instance Dolibarr.

Projet expérimental, développé pour un usage personnel au CATIE et aussi comme terrain d'expérimentation pour du développement assisté par agents IA.

## Ce que ça fait

Le dashboard affiche une vue globale des projets sélectionnés. Pour chaque projet : liste des tâches avec statut, temps passé décomposé par utilisateur, factures avec montants et statuts, propositions commerciales et leur détail, client associé avec lien direct vers Dolibarr. La sélection des projets à suivre est configurable depuis l'interface, sans redémarrage — persitée dans un fichier `data.json`.

## L'architecture

Le backend FastAPI est organisé en trois couches strictement séparées. La couche routes est fine : elle gère la validation HTTP et délègue immédiatement. La couche services contient toute la logique métier — agrégation des données multi-projets, transformations, orchestration des appels. La couche infrastructure isole les détails d'intégration : client HTTP Dolibarr, stockage JSON, cache, logging.

Cette séparation n'est pas de l'over-engineering pour un projet de cette taille — elle rend les services testables indépendamment de l'infrastructure, et l'infrastructure remplaçable sans toucher à la logique métier.

Le frontend est React + TypeScript + Vite + Tailwind. Les appels API passent par Axios, l'état est géré en hooks React sans librairie de state management — la complexité ne le justifie pas encore.

## Décisions techniques notables

### Un cache thread-safe générique

Certaines données Dolibarr changent rarement — les noms de clients, les informations de tiers. Les récupérer à chaque requête de dashboard serait inutilement lent. Le cache `ThreadSafeCache[T]` est une classe générique avec un `RLock` Python, exposant une méthode `get_or_set` pour le calcul paresseux : si la valeur est absente, la fonction de calcul est appelée et son résultat mis en cache. Le `RLock` (reentrant lock) permet les appels imbriqués depuis le même thread sans deadlock.

### JSON plutôt qu'une base de données

Les données de configuration (liste des projets à suivre) sont stockées dans un fichier `data.json` rechargé à chaque requête. Pas de base de données, pas d'ORM, pas de migrations. Pour quelques dizaines d'entrées qui changent rarement, c'est la bonne décision : zéro dépendance supplémentaire, déploiement trivial, debuggable à la main. Le fichier est recréé automatiquement au démarrage s'il n'existe pas.

### Logging structuré en JSON

Les logs sont émis en JSON plutôt qu'en texte libre. Chaque entrée contient le timestamp, le niveau, le logger et le message, avec un champ `context` pour les données structurées (ID de projet, durée d'appel API, etc.). En développement c'est légèrement moins lisible, mais en production ça permet de parser et filtrer les logs sans regex fragiles.

### Configuration via Pydantic Settings

Toute la configuration (URL Dolibarr, clé API, répertoire de données, host/port) passe par une classe `Settings` Pydantic. Les variables d'environnement sont validées au démarrage — une variable manquante ou mal typée plante immédiatement avec un message clair, plutôt qu'une KeyError à mi-chemin d'une requête.

## Ce qui reste imparfait

Le projet est explicitement expérimental. Il n'y a pas d'authentification côté dashboard — n'importe qui avec accès réseau peut le consulter. La clé API Dolibarr transite dans les variables d'environnement, ce qui est correct, mais il n'y a pas d'audit de sécurité formel. Pas à mettre en production sur une infra exposée sans travail supplémentaire.

Pas de tests automatisés non plus. L'architecture les rend possibles (services mockables), mais ils n'ont pas encore été écrits.

## Liens

- [github.com/sedelpeuch/dolibarr_project_dashboard](https://github.com/sedelpeuch/dolibarr_project_dashboard)
- [FastAPI — gestion des dépendances](/blog/09-scripting/2024-12-20-fastapi)
