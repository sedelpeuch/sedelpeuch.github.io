---
title: Application de suivi - Ultimaker série S
tags: [ultimaker, monitoring, fabrication, python, js]
---

<img src="https://www.eirlab.net/wp-content/uploads/2021/11/20211104_143102-1024x576.jpg" alt="Aperçu Application Ultimaker" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<div className="project-meta-grid">
  <div className="project-meta-item">🛑 Terminé</div>
  <div className="project-meta-item">📅 2021 – 2022</div>
  <div className="project-meta-item">👨‍💻 Co-auteur, développeur</div>
</div>


## Présentation

Depuis septembre 2021, Eirlab Community utilise deux imprimantes Ultimaker série S, équipées d’une API permettant de suivre à distance l’état des machines. L’application de suivi a été développée pour répondre au besoin de visualiser en temps réel la disponibilité, l’état et l’activité des imprimantes depuis l’open space, sans avoir à se déplacer.

Le projet a débuté avec le développement d’un client JavaScript affiché sur une télévision du fablab, puis a évolué vers une version Python/Flask pour un monitoring local et personnalisable. L’application est utilisée quotidiennement pour optimiser l’utilisation des machines et améliorer l’expérience des membres.

## Contexte associatif

Projet réalisé au sein du fablab associatif Eirlab, pour faciliter la gestion partagée des ressources d’impression 3D. L’outil s’adresse à l’ensemble de la communauté Eirlab (membres, bénévoles, encadrants) et favorise l’autonomie et la fluidité des usages.

## Démarche et réalisations 🚀

- Analyse de l’API Ultimaker, tests sur le réseau local
- Développement d’une interface web (ultimaker-screen) pour affichage TV
- Déploiement sur Raspberry Pi, gestion de la robustesse (reboot auto)
- Développement d’une version Python/Flask (Ultiwatcher) pour usage local
- Documentation, support et évolutions selon les retours utilisateurs

## Technologies et outils 🛠️

- JavaScript (Node.js, npm)
- Python (Flask)
- Raspberry Pi
- API Ultimaker

## Liens et ressources 🔗

- 💻 Code source Ultimaker-screen : [GitHub](https://github.com/Eirlab/ultimaker-screen)
- 💻 Code source Ultiwatcher : [GitHub](https://github.com/Eirlab/Ultiwatcher)
- 📝 Article de présentation : [Eirlab.net](https://www.eirlab.net/2021/11/04/application-de-suivi-ultimaker-serie-s/)
