---
title: "Haricot"
tags: [iot, dashboard, eirlab, raspberry-pi, timelapse, python]
description: "Boîtier Raspberry Pi qui photographie la croissance d'une plante à intervalle régulier et génère des timelapses depuis un tableau de bord web, projet d'Antoine Pringalle à EirLab."
---

<img src="https://www.eirlab.net/wp-content/uploads/2022/01/haricot-dashboard.png" alt="Aperçu Haricot Dashboard" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<ProjectMeta
  start="2021"
  end="2022"
  role="Contributeur (génération des timelapses)"
  domain="Timelapse, tableau de bord, fablab"
  stack={["Raspberry Pi", "Python", "Flask", "OpenCV"]}
/>

## Contexte

Haricot est un projet d'Antoine Pringalle, membre d'EirLab : un boîtier qui automatise la capture vidéo de la croissance d'une plante en timelapse.

## Réalisations

Le boîtier repose sur un Raspberry Pi équipé de sa caméra. Une application web Flask, conçue par Antoine Pringalle, sert de tableau de bord : consultation des photos, réglage de l'intervalle de capture et génération de timelapses.

J'ai écrit les scripts de génération des timelapses, crédités dans le README du dépôt : assemblage des photos en vidéo MP4 avec OpenCV, au nombre d'images par seconde choisi, et option d'interpolation qui insère entre deux photos leur image moyenne pour doubler le nombre d'images et lisser la vidéo.

## Résultats

Le boîtier a produit le timelapse de la pousse d'une plante présenté dans la vidéo de démonstration. La base graphique du tableau de bord a ensuite été réutilisée pour l'interface de [Caméléon](cameleon.md).

## Liens

- 💻 Code source : [GitHub](https://github.com/antoinepringalle/haricot)
- 📝 Article de présentation : [Eirlab.net](https://www.eirlab.net/2022/01/09/haricots/)
- 🎬 Vidéo de démonstration : [haricot_eirlab.mp4](https://www.eirlab.net/wp-content/uploads/2022/01/haricot_eirlab.mp4)
