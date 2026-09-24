---
title: Vertical Plotter
tags: [maker, robotique, arduino, python, dessin, open-source]
description: Traceur vertical qui dessine sur les tableaux blancs d'EirLab, piloté par Arduino, avec une chaîne de conversion SVG vers trajectoires adaptée aux 2 Ko de mémoire du microcontrôleur.
---

<img src="https://www.eirlab.net/wp-content/uploads/2021/10/PlotterV1Meca.jpg" alt="Aperçu Vertical Plotter" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<ProjectMeta
  start="2021"
  end="2021"
  role="Auteur principal"
  domain="Robotique DIY, dessin automatisé, électronique"
  stack={["Arduino", "C++", "Python"]}
/>

## Contexte

Le Vertical Plotter est le projet du groupe maker 2021 d'EirLab, mené avec Antoine Pringalle : un traceur suspendu devant un tableau blanc, qui déplace un feutre à l'aide de deux moteurs pas à pas pour reproduire des dessins vectoriels.

## Réalisations

- **Mécanique** : structure en matériaux accessibles (bois, pièces imprimées en 3D). Une seconde version a déplacé l'électronique, jusque-là centralisée sur la nacelle, pour corriger le centre de gravité de la première et stabiliser le tracé.
- **Électronique** : deux moteurs pas à pas pilotés par des drivers A4988 et un Arduino Uno ; un servomoteur MG90S lève et abaisse le feutre.
- **Logiciel** : un firmware C++ transforme les tracés vectoriels en trajectoires. L'Arduino Uno ne dispose que de 2 Ko de SRAM, trop peu pour charger un SVG : les points sont extraits en amont (outil web PathToPoints), puis un script Python génère le code C++ qui les embarque directement dans le firmware.

## Résultats

Le plotter fonctionne et dessine en boucle sur les tableaux blancs d'EirLab, dont un cœur reprenant le logo du fablab. Le code et la documentation sont publiés en open source.

## Liens

- 💻 Code source et documentation : [GitHub](https://github.com/sedelpeuch/MakerPlotter)
- 📝 Article de présentation : [Eirlab.net](https://www.eirlab.net/2021/09/19/vertical-plotter/)
