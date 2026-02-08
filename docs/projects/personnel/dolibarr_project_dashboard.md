---
title: Dolibarr Project Dashboard
---

<img src="/img/project/dolibarr_project_dashboard.png" alt="Aperçu Dolibarr Project Dashboard" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<div className="project-meta-grid">
  <div className="project-meta-item">📅 2026</div>
  <div className="project-meta-item">📖 Dashboard, Dolibarr, automatisation, DevOps</div>
  <div className="project-meta-item">🔎 Agréger et visualiser les données projets Dolibarr pour le pilotage multi-projets</div>
</div>

## Contexte

Dolibarr Project Dashboard est un projet personnel expérimental visant à offrir une interface moderne et intuitive pour le suivi multi-projets sur Dolibarr. Il répond au besoin d’une vue consolidée des tâches, factures, propositions et temps passés, là où l’interface native de Dolibarr reste limitée pour les coordinateurs gérant plusieurs projets.

## Démarche et apprentissages 🚀

- Architecture en 3 couches (routes, services, infrastructure) pour la testabilité et la maintenabilité
- Backend FastAPI (Python 3.11+), client REST Dolibarr, stockage JSON, logging structuré, cache thread-safe
- Frontend React (TypeScript, Vite, Tailwind CSS), requêtes Axios, hooks, UI responsive
- Agrégation des données : tâches, temps passé par utilisateur, factures, propositions, clients
- Configuration dynamique, sélection des projets à tracker, persistance dans data.json
- Déploiement local ou Docker, documentation complète, automatisation de la configuration
- Utilisation d’agents IA pour accélérer le développement, la documentation et l’expérimentation

## Résultats et suites possibles

- Dashboard opérationnel pour le suivi multi-projets, gain de temps pour le pilotage
- Amélioration continue de l’ergonomie, de la sécurité et de la couverture fonctionnelle
- Base d’expérimentation pour l’intégration d’autres ERP ou outils de gestion
- Partage de la démarche et du code pour la communauté
- Poursuite de l’automatisation, ouverture à d’autres usages (veille, reporting…)

## Liens et ressources 🔗

- 💻 Code source : [GitHub](https://github.com/sedelpeuch/dolibarr_project_dashboard)
- Documentation d’API Dolibarr : [https://dolibarr.org/](https://dolibarr.org/)

---

> Un dashboard moderne pour piloter plusieurs projets Dolibarr, automatiser la collecte de données et explorer le DevOps personnel.
