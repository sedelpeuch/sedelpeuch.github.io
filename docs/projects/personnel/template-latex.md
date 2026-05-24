---
title: Template LaTeX
---

<img src="/img/project/template-latex.png" alt="Aperçu Template LaTeX" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<div className="project-meta-grid">
  <div className="project-meta-item">📅 Depuis 2019</div>
  <div className="project-meta-item">📖 Rédaction technique · Rapports · LaTeX</div>
  <div className="project-meta-item">🔧 LaTeX · pdflatex · BibTeX · Make</div>
</div>

## Le contexte

Chaque nouveau rapport de stage ou de projet démarrait par la même chose : retrouver un ancien fichier `.tex`, effacer son contenu, coller une preamble générique, et passer vingt minutes à remettre les marges et les couleurs dans l'état voulu. Ce template est né de cette frustration. L'objectif était d'avoir un point de départ cohérent, compilable immédiatement, sans avoir à tout reconfigurer à chaque fois.

Il a été écrit à l'École Centrale de Lyon, d'où le nom `rapportECL.cls`, et réutilisé depuis sur des rapports internes, des documents de projet, et des livrables professionnels.

## Ce que le template contient

Le point d'entrée est `report.tex`, un fichier volontairement minimal : quelques métadonnées, quelques `\input{}`, et rien d'autre. Tout le reste est distribué dans des dossiers à responsabilité unique.

La classe `rapportECL.cls` gère la mise en page : elle est basée sur `article` (A4, 12pt), définit des couleurs pour les titres de section (bleu foncé en section, bleu clair en sous-section, italique en sous-sous-section), génère la page de garde avec logo, fond en coin, et mise en page auteur/encadrant sur deux colonnes. Elle expose aussi quelques commandes utilitaires : `\insererfigure` pour insérer une figure avec légende et label en une ligne, `\fairemarges` pour les en-têtes fancy, `\tabledematieres` pour la table des matières.

Le dossier `config/` regroupe les packages et la configuration dans des fichiers thématiques séparés : `common-config.tex` pour les packages généraux (babel, fontenc, geometry, hyperref, amsmath), `listings.tex` pour la configuration des blocs de code (couleurs, style, renommage "Listing" en "Code" en français), `custom-commands.tex` et `styles.tex` pour les définitions propres au document.

Le contenu va dans `sections/`, un fichier par section, inclus séquentiellement dans `report.tex`. C'est la partie la plus intéressante pour le contrôle de version : des diffs par section plutôt qu'un seul gros fichier dont toutes les lignes changent.

## Le Makefile

pdflatex gère la compilation vers `output/` pour ne pas polluer la racine. La variable `USE_BIB` contrôle si BibTeX est lancé : `make USE_BIB=yes` enchaîne la compilation en deux passes avec BibTeX entre les deux, ce qui est la séquence nécessaire pour que les références bibliographiques soient résolues. La cible `clean` supprime le répertoire de sortie et tous les fichiers temporaires LaTeX.

## Ce qui reste imparfait

La classe `rapportECL.cls` contient des chaînes hardcodées dans `\fairemarges` ("État de l'art projet robotique", "Reachy Mobile") — des vestiges du rapport d'origine qui n'ont jamais été généralisés. N'importe qui qui clone le template et utilise `\fairemarges` sans le lire aura ces textes dans ses en-têtes.

Le nom `rapportECL` est school-specific par construction. Il fonctionne comme template général, mais le nom ne l'indique pas.

## Liens

- [github.com/sedelpeuch/template_latex](https://github.com/sedelpeuch/template_latex)
