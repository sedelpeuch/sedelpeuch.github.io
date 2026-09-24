---
title: Reachy Mobile
tags: [robotique, reachy, mobile, eirlab, python, jupyter]
description: "Rendre mobile le robot humanoïde Reachy en l'installant sur une base motorisée EZ Wheel : pilotage, téléopération et expérimentations de manipulation, projet mené au fablab EirLab."
---

<img src="/img/project/reachy_mobile.png" alt="Aperçu Reachy Mobile" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<ProjectMeta
  start="2021"
  end="2022"
  role="Développeur principal du code Reachy"
  domain="Robotique mobile, manipulation, téléopération"
  stack={["Python", "Jupyter", "Reachy SDK"]}
/>

## Contexte

Reachy est un robot humanoïde à bras, conçu pour rester fixe. Le projet Reachy Mobile, mené à EirLab, visait à le rendre mobile en l'installant sur une base motorisée, puis à combiner déplacement et manipulation.

## Réalisations

Le projet est découpé en deux dépôts : le code de la base mobile ([EZ Wheel Navigation](ez-wheel-navigation.md)) et le code du robot Reachy, dont je suis le principal contributeur. Ce second dépôt regroupe, sous forme de scripts Python et de notebooks Jupyter s'appuyant sur le Reachy SDK :

- le pilotage de Reachy et son intégration avec la base mobile ;
- des expérimentations de navigation, de téléopération et de manipulation ;
- une vidéo de démonstration des essais.

## Liens

- 💻 Code source : [GitHub](https://github.com/Eirlab/reachy_mobile_reachy)
- 🎥 Démonstration vidéo : [Google Drive](https://drive.google.com/file/d/16iD9CS9QWmb8qNn6hHAq40Rqb6V94oK6/view)
- [EZ Wheel Navigation](ez-wheel-navigation.md) : code de la base mobile
