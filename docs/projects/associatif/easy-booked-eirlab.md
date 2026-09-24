---
title: Easy Booked @EirLab
tags: [wordpress, plugin, inscription, php, eirlab]
description: "Adaptation du plugin WordPress Easy Booked pour gérer les inscriptions aux formations du fablab EirLab : charte graphique, corrections de bugs et gestion des formations complètes."
---

<img src="https://www.eirlab.net/wp-content/uploads/2021/11/Capture-decran-de-2021-11-03-16-14-34-1-750x609.png" alt="Aperçu Easy Booked Eirlab" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<ProjectMeta
  start="2021"
  end="2022"
  role="Auteur de l'adaptation, mainteneur"
  domain="Gestion des inscriptions, site associatif"
  stack={["WordPress", "PHP", "JavaScript"]}
/>

## Contexte

EirLab propose des formations aux machines du fablab, réservées sur créneaux. Le site WordPress de l'association avait besoin d'un calendrier où les administrateurs publient des créneaux et où les membres s'inscrivent, sans outil externe.

## Réalisations

Plutôt que de développer un calendrier de zéro, je suis parti du plugin Easy Booked, créé par JoyDevs, et je l'ai adapté aux besoins d'EirLab :

- adaptation des couleurs et de la langue à l'identité du fablab ;
- correction d'un bug d'affichage des rendez-vous ;
- ajout d'un état « complet » pour les formations, qui restent visibles au lieu de disparaître du calendrier une fois pleines.

Le développement s'est fait en lien avec les administrateurs et les formateurs, par cycles de tests et de corrections. L'intégration des fiches formateur et formation au calendrier était en cours à la publication de l'article.

## Liens

- 💻 Code source : [GitHub](https://github.com/Eirlab/easy-booked)
- 📝 Article de présentation : [Eirlab.net](https://www.eirlab.net/2021/11/03/easy-booked-eirlab/)
