---
title: Application de suivi - Ultimaker série S
tags: [ultimaker, monitoring, fabrication, python, js]
---

<img src="/img/project/ultimaker.png" alt="Aperçu Application Ultimaker" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />


## Présentation

L’application de suivi Ultimaker série S est née d’un besoin quotidien dans le fablab : savoir d’un coup d’œil si une imprimante est libre, en cours ou en panne, sans avoir à se déplacer. L’équipe a d’abord développé **ultimaker-screen** (JavaScript), une interface web affichée sur une TV du lab, connectée en temps réel à l’API des imprimantes.

Face à de nouveaux usages, une version Python/Flask (**Ultiwatcher**) a vu le jour pour permettre un monitoring local, plus léger et personnalisable. Le projet a été rythmé par des phases de tests sur le réseau interne, des ajustements pour fiabiliser la connexion (reboot auto du Raspberry Pi), et des échanges avec les utilisateurs pour améliorer l’ergonomie.

Ce travail collectif a permis d’optimiser l’utilisation des machines, de réduire les pertes de temps et d’offrir une meilleure expérience à la communauté Eirlab.

## Démarche et réalisations 🚀

- Analyse de l’API Ultimaker, tests sur le réseau local
- Développement d’une interface web (ultimaker-screen) adaptée à l’affichage TV
- Déploiement sur Raspberry Pi, gestion de la robustesse (reboot auto)
- Développement d’une version Python/Flask (Ultiwatcher) pour usage local
- Documentation et support pour la communauté Eirlab

## Technologies et outils 🛠️

- JavaScript (Node.js, npm)
- Python (Flask)
- Raspberry Pi
- API Ultimaker

## Liens et ressources 🔗

- 💻 Code source Ultimaker-screen : [GitHub](https://github.com/Eirlab/ultimaker-screen)
- 💻 Code source Ultiwatcher : [GitHub](https://github.com/Eirlab/Ultiwatcher)

---

> Un outil pratique pour le suivi des impressions 3D en fablab, pensé pour l’usage quotidien et l’intégration dans l’espace de travail.
