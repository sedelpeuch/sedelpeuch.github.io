---
title: "Application de suivi Ultimaker série S"
tags: [ultimaker, monitoring, fabrication, javascript, raspberry-pi, eirlab]
description: "Écran de supervision des imprimantes 3D Ultimaker série S du fablab EirLab, affiché sur une télévision de l'open space via leur API locale."
---

<img src="https://www.eirlab.net/wp-content/uploads/2021/11/20211104_143102-1024x576.jpg" alt="Aperçu Application Ultimaker" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<ProjectMeta
  start="2021"
  end="2021"
  role="Co-auteur, développeur"
  domain="Supervision de machines, fablab"
  stack={["JavaScript", "Node.js", "Raspberry Pi"]}
/>

## Contexte

Depuis septembre 2021, EirLab Community dispose de deux imprimantes Ultimaker série S, qui exposent une API locale permettant de suivre leur état à distance. Les membres devaient jusque-là se déplacer jusqu'aux machines pour savoir si une impression était terminée ou si une imprimante était libre.

## Réalisations

ultimaker-screen est une application JavaScript qui interroge l'API des imprimantes et s'affiche sur une télévision de l'open space, pilotée par un Raspberry Pi 3B+. L'écran alterne entre une vue générale de l'état de toutes les imprimantes et une vue détaillée par impression en cours : temps restant, températures et flux de la caméra intégrée.

La première version de l'application est reprise d'un prototype personnel ; sa publication s'est accompagnée d'une documentation et d'une licence GPL 3. La partie serveur a ensuite été réécrite, et un script redémarre le Raspberry Pi lorsqu'il ne parvient plus à se connecter au réseau, de sorte que l'écran reste opérationnel sans intervention.

## Rôle

L'application a été développée avec Antoine Pringalle. J'ai écrit la première version et préparé sa publication (documentation, licence GPL 3) ; Antoine Pringalle a réécrit la partie serveur et ajouté le script de redémarrage du Raspberry Pi.

## Résultats

À sa publication en novembre 2021, l'application tournait sur une des télévisions d'EirLab : l'état des imprimantes se lisait depuis l'open space, sans se déplacer jusqu'aux machines.

En 2023, un autre membre du fablab a repris le principe dans Ultiwatcher, une réécriture en Python avec Flask présentée comme la suite d'ultimaker-screen.

## Liens

- 💻 Code source d'ultimaker-screen : [GitHub](https://github.com/Eirlab/ultimaker-screen)
- 💻 Ultiwatcher, la réécriture de 2023 : [GitHub](https://github.com/Eirlab/Ultiwatcher)
- 📝 Article de présentation : [Eirlab.net](https://www.eirlab.net/2021/11/04/application-de-suivi-ultimaker-serie-s/)
