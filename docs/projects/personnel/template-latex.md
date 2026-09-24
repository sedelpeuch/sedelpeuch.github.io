---
title: Template LaTeX
description: Modèle LaTeX modulaire pour rapports techniques (classe dédiée, configuration découpée par thème, une section par fichier, compilation par Makefile).
tags: [latex, documentation, make]
---

<img src="/img/project/template-latex.png" alt="Aperçu Template LaTeX" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<ProjectMeta
  start="2019"
  role="Auteur (projet solo)"
  domain="Rédaction technique, rapports"
  stack={["LaTeX", "pdflatex", "BibTeX", "Make"]}
/>

## Contexte

Chaque nouveau rapport de stage ou de projet démarrait par la même chose : retrouver un ancien fichier `.tex`, effacer son contenu, coller un préambule générique, puis remettre les marges et les couleurs dans l'état voulu. Ce template est né de cette répétition. L'objectif était d'avoir un point de départ cohérent, compilable immédiatement, sans avoir à tout reconfigurer à chaque fois.

Il a été écrit à l'École Centrale de Lyon, d'où le nom `rapportECL.cls`, et réutilisé depuis sur des rapports internes, des documents de projet, et des livrables professionnels.

## Structure du template

Le point d'entrée est `report.tex`, un fichier volontairement minimal : quelques métadonnées, quelques `\input{}`, et rien d'autre. Tout le reste est distribué dans des dossiers à responsabilité unique.

La classe `rapportECL.cls` gère la mise en page : elle est basée sur `article` (A4, 12pt), définit des couleurs pour les titres de section (bleu foncé en section, bleu clair en sous-section, italique en sous-sous-section), génère la page de garde avec logo, fond en coin, et mise en page auteur/encadrant sur deux colonnes. Elle expose aussi quelques commandes utilitaires : `\insererfigure` pour insérer une figure avec légende et label en une ligne, `\fairemarges` pour les en-têtes et pieds de page (`fancyhdr`), `\tabledematieres` pour la table des matières.

Le dossier `config/` regroupe les packages et la configuration dans des fichiers thématiques séparés : `common-config.tex` pour les packages généraux (babel, fontenc, geometry, hyperref, amsmath), `listings.tex` pour la configuration des blocs de code (couleurs, style, renommage « Listing » en « Code »), `custom-commands.tex` et `styles.tex` pour les définitions propres au document.

Le contenu va dans `sections/`, un fichier par section, inclus séquentiellement dans `report.tex`. Ce découpage sert le contrôle de version : les diffs se lisent par section plutôt que dans un seul fichier monolithique.

## Compilation

Le Makefile compile avec pdflatex vers `output/` pour ne pas encombrer la racine, puis copie le PDF final à la racine. La variable `USE_BIB` contrôle si BibTeX est lancé : `make USE_BIB=yes` enchaîne la compilation en deux passes avec BibTeX entre les deux, ce qui est la séquence nécessaire pour que les références bibliographiques soient résolues. La cible `clean` supprime le répertoire de sortie et tous les fichiers temporaires LaTeX.

## Limites connues

La classe `rapportECL.cls` contient des chaînes codées en dur dans `\fairemarges` (« État de l'art projet robotique », « Reachy Mobile »), vestiges du rapport d'origine jamais généralisés. Toute personne qui clone le template et utilise `\fairemarges` sans le lire retrouve ces textes dans ses en-têtes. Les passer en paramètres de la commande, ou en métadonnées déclarées dans `report.tex`, lèverait cette limite.

Le nom `rapportECL` renvoie à un établissement précis. La classe fonctionne comme template général, mais son nom ne l'indique pas.

## Liens

- 💻 Code source : [github.com/sedelpeuch/template_latex](https://github.com/sedelpeuch/template_latex)
