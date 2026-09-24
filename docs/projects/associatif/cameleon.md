---
title: Caméléon 🦎
tags: [iot, dashboard, eirlab, camera, python, flask, opencv]
description: Tableau de bord Flask et OpenCV pour enregistrer le flux d'une caméra IP et le diffuser dans l'open space du fablab EirLab, lancé depuis une simple clé USB.
---

<img src="https://www.eirlab.net/wp-content/uploads/2022/03/image-1.png" alt="Aperçu Caméléon" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<ProjectMeta
  start="2022"
  end="2022"
  role="Auteur"
  domain="Vidéo, tableau de bord, fablab"
  stack={["Python", "Flask", "OpenCV", "Bootstrap"]}
/>

## Contexte

Le fablab EirLab souhaitait pouvoir filmer ses ateliers et projets avec une caméra IP, puis diffuser les vidéos sur la télévision de l'open space, sans installer de logiciel dédié sur un poste.

## Réalisations

J'ai développé Caméléon, un tableau de bord qui tient sur une clé USB : branché avec une caméra IP, il permet de rechercher les caméras disponibles sur le réseau, de choisir les options de capture, de lancer le flux vidéo, accessible en HTTP, et d'enregistrer les vidéos en MP4.

- **Backend** : une API Flask qui pilote la caméra et s'appuie sur OpenCV pour la capture et le traitement d'image.
- **Frontend** : une interface Bootstrap reprenant la base graphique du projet [Haricot](haricot-apringalle.md).

## État

À la publication de l'article en mars 2022, la capture, le flux et l'enregistrement étaient opérationnels ; le partage vers la télévision et le post-traitement des images restaient en développement.

## Liens

- 💻 Code source : [GitHub](https://github.com/eirlab/cameleon)
- 📝 Article de présentation : [Eirlab.net](https://www.eirlab.net/2022/03/09/cameleon-%f0%9f%a6%8e/)
