---
title: "Reachy Mobile"
tags: [robotique, reachy, mobile, eirlab, python, jupyter]
description: "Rendre mobile le robot humanoïde Reachy en l'installant sur une base motorisée EZ Wheel : pilotage par interface web, détection des visiteurs et partie de morpion, projet mené au fablab EirLab."
---

<img src="/img/project/reachy_mobile.png" alt="Aperçu Reachy Mobile" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<ProjectMeta
  start="2021"
  end="2022"
  role="Développeur principal du code Reachy"
  domain="Robotique mobile, manipulation, téléopération"
  stack={["Python", "Flask", "Jupyter", "Reachy SDK"]}
/>

## Contexte

Reachy est un robot humanoïde à bras, conçu pour rester fixe. Le projet Reachy Mobile, mené à EirLab, visait à le rendre mobile en l'installant sur une base motorisée, puis à combiner déplacement et manipulation pour accueillir les visiteurs d'un salon organisé pour les 100 ans de l'ENSEIRB-MATMECA.

## Réalisations

Le projet est découpé en deux dépôts : le code de la base mobile ([EZ Wheel Navigation](ez-wheel-navigation.md)) et le code du robot Reachy, dont je suis le principal contributeur (141 des 151 commits). Ce second dépôt regroupe des scripts Python et des notebooks Jupyter s'appuyant sur le Reachy SDK. J'y ai développé :

- une API Flask et son interface web Bootstrap, qui pilotent Reachy (mise sous tension, tête, bras, caméras) et envoient à la base mobile ses objectifs de navigation ;
- une boucle de contrôle générale : la base circule entre des points de passage et s'arrête lorsqu'un visiteur engage l'interaction, le temps d'une partie ;
- la détection de l'interaction par PoseNet : une main levée quelques secondes devant le robot fait réagir ses antennes et sa tête, puis lance le jeu ;
- l'adaptation du jeu de morpion de Reachy à la version mobile : joueur minimax, nouveaux mouvements enregistrés, détection de la prise des pions et interactions avec le joueur ;
- la documentation utilisateur et développeur du projet.

## Résultats

Dans son état de février 2022, le prototype enchaîne déplacement, détection d'un visiteur et partie de morpion, et reste pilotable fonction par fonction depuis l'interface web ; ces fonctions ont été mises au point par des essais sur le robot réel. La documentation publiée dans le dépôt couvre l'utilisation et le développement de Reachy comme de la base.

## Liens

- 💻 Code source : [GitHub](https://github.com/Eirlab/reachy_mobile_reachy)
- [EZ Wheel Navigation](ez-wheel-navigation.md) : code de la base mobile
