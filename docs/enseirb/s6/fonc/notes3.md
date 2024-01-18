---
title: Types et constructions de base du langage
---

### Définitions : Symboles et liaisons

Un **symbole** est un identificateur, c'est à dire un nom symbolique.

Une **liaison** est une entité, c'est à dire un objet nommé résidant dans la mémoire, donc l'association d'un symbole avec un emplacement mémoire contenant une valeur.

Dans un programme un même symbole eut apparaître dans plusieurs liaisons. De même, en $$C$$, un identificateur peut aussi servir à nommer plusieurs entités. Plusieurs stratégies de recherche ont été implémentées dans les langages de programmation.

## <i class="fas fa-code-branch"></i> Environnements global et locaux

L'environnement est formé de liaisons `symbole -> valeur`. Les symboles ne sont pas typés mais leurs valeurs le sont. Il s'agit d'un typage dynamique.

* Variables : `(define <v> <e>)`
* Fonctions : `(define (<f> <p1> <p2> ... <pn>) <e1> <e2> ... <en>)`
* Résultat non spécifié par la norme

Une définition établit une liaison entre une variable et un objet résultant de l'évaluation de l'expression, cet objet pouvant être une fonction

### Environnements locaux - La forme `let`

Ils sont fabirqués avec les formes `let`, `let*`, `letrec` et par des définitions au moyen de la forme `define` dans le corps des fonctions.

```
(let (<l1>
      <l2>
      ...
      <ln>)
 <e>)
```

Avec `<li>` une liaison : `(<si> <oi>)`, `<si>` est une symbole, `<oi>` une valeur d'initialisation, `<e>` une expression.

L'évaluation des vlauers d'initialisation est effectuée en premier puis les variables locales sont créées. Ce qui implqiue que les valeurs des variables locales définies dans un let ne sont pas utilisées dans l'évaluation des expressions d'initialisation.

## <i class="fas fa-code-branch"></i> Stratégies de recherche d'une liaison

Pour chercher la liaison correspondant à l'occurence d'un symbole dans une expression, la recherche commence par l'environnement dans lequel apparaît l'expression. Si l'occurence apparaît dans le corps d'une fonction et qu'aucune liaison ne correspond en local (cas d'une variable libre), deux stratégies existent

### Stratégie lexicale - Lexical scope

La stratégie lexical consiste à remonter les environnements locaux englobants du plus proche jusqu'à l'environnement global. La première liaison dont le nom de symbole correspond est retenue. Cette stratégie s'applique aussi à l'évaluation du corps d'une fonction lors d'une application. En effet celui-ci est évalué dans l'environnement englobant de la fonction, dit environnement lexical.

Cette stratégie correspond au langage C et aux langages impératifs en général et au langage Scheme.

### Stratégie dynamique - Dynamic scope

Pour chercher la liaison correspondant à l'occurence d'un symbole dans une expression située dans le corps d'une fonction, la stratégie dynamique consiste à rechercher sa liaison dans l'environnement dynamique, c'est à dire l'environnement d'application de la fonction

Cette stratégie correspond par exemple à LaTeX, et beaucoup de lisp dont emacs-lisp. Common-Lisp implémente les deux stratégies.

## <i class="fas fa-code-branch"></i> Portée et durée de vie en Scheme

La portée d'une liaison est la partie du code source dans laquelle il est possible de l'utiliser.

* Les liaisons globales ont une portée égale à tout le programme
* Les liaisons locales ont une portée limitée à la forme de définition `let`

La durée de vie d'un objet correspond à la période de l'exécution d'un programme comprise entre la création de cet objet et sa destruction

* Les objets définis globalement ont une durée de vie égale à celle du programme
* Les objets définis localement ont une durée de vie potentiellement égale à celle du programme

## <i class="fas fa-code-branch"></i> Paradigme fonctionnel et environnements

La forme `let` équivaut à l'application d'une fonction construite avec la forme `lambda`. Les symboles définis correspondent aux paramètres formels de la fonction, et les expressions associés aux symboles définis correspondent aux arguments de l'application

```
(let ((j 0))          ((lambda(j) (* x j)) 0)
    (* x j)
)
```

