---
title: "EZ Wheel Navigation"
tags: [robotique, ezwheel, reachy, eirlab, ros]
description: "Workspace ROS de la base motorisée EZ Wheel qui porte le robot Reachy dans le projet Reachy Mobile d'EirLab : description URDF, simulation Gazebo, SLAM, navigation et téléopération."
---

<img src="/img/project/ezwheel.png" alt="Aperçu EZ Wheel" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<ProjectMeta
  start="2021"
  end="2022"
  role="Principal contributeur"
  domain="Robotique mobile, pilotage de base motorisée"
  stack={["ROS", "Python", "Gazebo"]}
/>

## Contexte

Le projet EZ Wheel Navigation constitue le volet "base mobile" de [Reachy Mobile](reachy-mobile.md) à EirLab : doter le robot Reachy d'une mobilité réelle grâce à une base motorisée EZ Wheel.

## Réalisations

J'ai structuré le workspace ROS 1 et développé l'essentiel de ses paquets catkin (36 des 53 commits du dépôt) :

- `reachy_mobile_description` : modèle URDF de la base et du robot, visualisation dans RViz et simulation dans Gazebo ;
- `reachy_mobile_slam` : cartographie avec `hector_mapping` à partir des scans laser ;
- `reachy_mobile_navigation` : localisation AMCL sur la carte produite et planification avec `move_base`, plus un nœud Python qui expose l'envoi d'objectifs de navigation par une API Flask ;
- `reachy_mobile_teleop` : téléopération de la base au clavier.

J'ai réglé les paramètres de navigation au fil des essais sur la base réelle (portée de détection des obstacles, pondération des coûts, déplacement en marche avant uniquement) et relié le lancement de la navigation à l'API appelée depuis Reachy. Un autre membre de l'équipe a dessiné les pièces mécaniques (plaques d'adaptation de la base, pièce de maintien imprimée en 3D) et finalisé la configuration du planificateur local TEB. J'ai enfin rédigé le guide d'utilisation de la base pour les autres membres du fablab.

## Résultats

La base dispose d'une carte de son environnement produite par le SLAM et rejoint les objectifs de navigation qui lui sont envoyés. Ces objectifs sont émis depuis l'interface web de [Reachy Mobile](reachy-mobile.md), ce qui relie déplacement de la base et pilotage du robot dans une même chaîne.

## Liens

- 💻 Code source : [GitHub](https://github.com/Eirlab/reachy_mobile_ezwheel)
- [Reachy Mobile](reachy-mobile.md) : code du robot
