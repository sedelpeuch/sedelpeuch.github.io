---
title: Vertical Plotter
tags: [maker, robotique, arduino, python, dessin, open-source]
---

<img src="https://www.eirlab.net/wp-content/uploads/2021/10/PlotterV1Meca.jpg" alt="Aperçu Vertical Plotter" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<div className="project-meta-grid">
  <div className="project-meta-item">🛑 Terminé</div>
  <div className="project-meta-item">📅 2021 – 2022</div>
  <div className="project-meta-item">👨‍💻 Auteur, contributeur</div>
</div>

## Présentation

🖊️ Le Vertical Plotter est un projet maker mené en 2021, né de l’envie de repousser les limites du dessin automatisé et d’explorer la robotique DIY. L’idée : transformer un simple tableau blanc en une toile interactive, où un feutre suspendu, guidé par deux moteurs pas-à-pas, trace des motifs génératifs ou des dessins vectoriels.

L’aventure a commencé au sein d’un groupe maker, dans une ambiance conviviale et collaborative. Chacun a pu apporter ses compétences : conception mécanique, électronique, programmation, mais aussi créativité pour imaginer des motifs à dessiner. Le projet a été rythmé par des séances de brainstorming, des essais-erreurs, des moments de doute (quand le feutre tombait ou que les moteurs décrochaient !), mais aussi de grandes satisfactions lors des premiers tracés réussis.

L’objectif n’était pas seulement technique : il s’agissait aussi de partager l’expérience, de documenter la démarche et de rendre le projet accessible à d’autres passionnés via l’open source. Le Vertical Plotter est ainsi devenu un support d’apprentissage, d’expérimentation et de vulgarisation autour de la robotique et de l’art génératif.

## Démarche et réalisations 🚀

- Conception mécanique : réflexion sur la géométrie du système, choix des matériaux accessibles (bois, impression 3D), modélisation et assemblage de la structure pour garantir stabilité et précision.
- Électronique : sélection et câblage des moteurs pas-à-pas, drivers A4988, alimentation adaptée, intégration d’un microcontrôleur Arduino pour piloter l’ensemble.
- Programmation embarquée : écriture du firmware Arduino pour gérer les déplacements du feutre, interpréter les commandes de dessin et assurer la sécurité du système.
- Logiciel PC : développement d’un script Python permettant de convertir des images ou des fichiers SVG en instructions de dessin (G-code simplifié), avec gestion des vitesses, des accélérations et des pauses.
- Tests, calibrage et itérations : nombreux essais pour ajuster la tension des câbles, la précision des tracés, la robustesse du système, et partage des résultats avec la communauté.

## Technologies et outils 🛠️

- Arduino (C++) pour le pilotage temps réel
- Python pour la génération des instructions de dessin
- Moteurs pas-à-pas, drivers A4988, courroies, poulies
- Impression 3D pour la conception de pièces sur-mesure

## Liens et ressources 🔗

- 💻 Code source et documentation : [GitHub](https://github.com/sedelpeuch/MakerPlotter)
- 📝 Article de présentation : [Eirlab.net](https://www.eirlab.net/2021/09/19/vertical-plotter/)
