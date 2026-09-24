---
title: MegaBot
tags: [robotique, quadrupede, eirlab, stm32, pybullet, open-source]
description: "Robot quadrupède d'environ 250 kg capable de porter un passager, conçu par Julien Allali et conservé au fablab de Bordeaux INP : électronique STM32, cinématique inverse, simulation PyBullet."
---

<img src="https://www.eirlab.net/wp-content/uploads/2021/10/20210913_162609-scaled-e1632074627206-1024x575.jpg" alt="Aperçu MegaBot" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<ProjectMeta
  start="2019"
  end="2023"
  role="Contributeur"
  domain="Robotique à pattes, électronique embarquée, simulation"
  stack={["STM32", "Arduino", "PyBullet", "Python", "C++"]}
/>

## Contexte

MegaBot est un robot quadrupède de grande envergure, conçu et construit par Julien Allali, maître de conférences à l'ENSEIRB-MATMECA. Il pèse environ 250 kg, mesure environ 2,50 m de large, est actionné par douze vérins électriques et peut transporter un passager ; il est présenté lors d'événements robotiques. Le projet est open source, matériel comme logiciel, et le robot est conservé au fablab de Bordeaux INP, où les membres d'EirLab ont contribué à ses évolutions.

## Réalisations

Les travaux menés sur le robot couvrent plusieurs axes :

- **Électronique embarquée** : distribution de puissance depuis des batteries au plomb, contrôle indépendant de chaque patte par un microcontrôleur STM32.
- **Contrôle et marche** : cinématique inverse résolue par optimisation quadratique à partir de la matrice jacobienne, gestion du centre de gravité par le polygone de sustentation, marche en courbe par discrétisation des trajectoires.
- **Simulation** : modèle URDF sous PyBullet, avec prise en compte des contraintes de fermeture géométrique des pattes.
- **Évolutions 2023** : nouveaux vérins à potentiomètres intégrés, contrôleurs moteurs 100 A, carte Nucleo L476RG et multiplexage des liaisons série.

## Liens

- 📝 Article de présentation : [Eirlab.net](https://www.eirlab.net/2021/09/19/megabot/)
- 🌐 Documentation technique : [marcdcls.github.io/projects/megabot](https://marcdcls.github.io/projects/megabot/)
- 🎥 Vidéos : [YouTube](https://www.youtube.com/watch?v=lqpeXSHNy9o&list=UU-n3Mx5SaUE7WTAfIvDbBHg)
