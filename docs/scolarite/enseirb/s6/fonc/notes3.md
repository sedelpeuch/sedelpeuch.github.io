---
title: Symboles, liaisons et environnements
description: "Symboles et liaisons en Scheme, environnements global et locaux (let), portée lexicale et dynamique, portée et durée de vie des liaisons."
---

## Définitions : symboles et liaisons

Un **symbole** est un identificateur, c'est-à-dire un nom symbolique.

Une **liaison** est l'association d'un symbole avec un emplacement mémoire contenant une valeur, c'est-à-dire un objet nommé résidant dans la mémoire.

Dans un programme, un même symbole peut apparaître dans plusieurs liaisons. De même, en C, un identificateur peut servir à nommer plusieurs entités. Plusieurs stratégies de recherche ont été implémentées dans les langages de programmation.

## Environnements global et locaux

L'environnement est formé de liaisons `symbole -> valeur`. Les symboles ne sont pas typés, mais leurs valeurs le sont : il s'agit d'un typage dynamique.

* Variables : `(define <v> <e>)`
* Fonctions : `(define (<f> <p1> <p2> ... <pn>) <e1> <e2> ... <en>)`
* La valeur renvoyée par `define` n'est pas spécifiée par la norme

Une définition établit une liaison entre une variable et un objet résultant de l'évaluation de l'expression, cet objet pouvant être une fonction.

### Environnements locaux : la forme `let`

Ils sont fabriqués avec les formes `let`, `let*`, `letrec` et par des définitions au moyen de la forme `define` dans le corps des fonctions.

```scheme
(let (<l1>
      <l2>
      ...
      <ln>)
 <e>)
```

Avec `<li>` une liaison `(<si> <oi>)`, où `<si>` est un symbole et `<oi>` une valeur d'initialisation, et `<e>` une expression.

L'évaluation des valeurs d'initialisation est effectuée en premier, puis les variables locales sont créées. Cela implique que les variables locales définies dans un `let` ne sont pas utilisables dans les expressions d'initialisation de ce même `let` (c'est la différence avec `let*`).

## Stratégies de recherche d'une liaison

Pour chercher la liaison correspondant à l'occurrence d'un symbole dans une expression, la recherche commence par l'environnement dans lequel apparaît l'expression. Si l'occurrence apparaît dans le corps d'une fonction et qu'aucune liaison ne correspond en local (cas d'une variable libre), deux stratégies existent.

### Stratégie lexicale (*lexical scope*)

La stratégie lexicale consiste à remonter les environnements locaux englobants, du plus proche jusqu'à l'environnement global. La première liaison dont le nom de symbole correspond est retenue. Cette stratégie s'applique aussi à l'évaluation du corps d'une fonction lors d'une application. En effet, celui-ci est évalué dans l'environnement englobant de la fonction, dit environnement lexical.

Cette stratégie est celle du langage C, des langages impératifs en général et du langage Scheme.

### Stratégie dynamique (*dynamic scope*)

Pour chercher la liaison correspondant à l'occurrence d'un symbole dans une expression située dans le corps d'une fonction, la stratégie dynamique consiste à rechercher sa liaison dans l'environnement dynamique, c'est-à-dire l'environnement d'application de la fonction.

Cette stratégie est par exemple celle des macros TeX/LaTeX et de nombreux Lisp historiques, dont Emacs Lisp (portée dynamique par défaut). Common Lisp implémente les deux stratégies.

## Portée et durée de vie en Scheme

La portée d'une liaison est la partie du code source dans laquelle il est possible de l'utiliser.

* Les liaisons globales ont une portée égale à tout le programme
* Les liaisons locales ont une portée limitée au corps de la forme qui les définit (par exemple `let`)

La durée de vie d'un objet correspond à la période de l'exécution d'un programme comprise entre la création de cet objet et sa destruction.

* Les objets définis globalement ont une durée de vie égale à celle du programme
* Les objets définis localement ont une durée de vie potentiellement égale à celle du programme (par exemple s'ils sont capturés par une fermeture)

## Paradigme fonctionnel et environnements

La forme `let` équivaut à l'application d'une fonction construite avec la forme `lambda`. Les symboles définis correspondent aux paramètres formels de la fonction, et les expressions associées aux symboles définis correspondent aux arguments de l'application.

```scheme
;; ces deux expressions sont équivalentes
(let ((j 0))
  (* x j))

((lambda (j) (* x j)) 0)
```
