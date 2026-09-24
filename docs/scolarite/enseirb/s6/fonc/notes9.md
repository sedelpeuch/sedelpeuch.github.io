---
title: Les macro-expansions
description: "Évaluation et application en Scheme, évaluation paresseuse, macros par remplacement textuel (C) et par transformation de source (define-syntax-rule)."
---

## Rappels sur l'évaluation et l'application

### Évaluation applicative : `(eval o env)`

Cette forme d'évaluation est utilisée pour toutes les fonctions construites avec
`lambda`, `define`, `let` et `letrec`. C'est celle qui est mise en
œuvre dans la plupart des langages de programmation, en particulier impératifs
(C, Java). Soit `env` l'environnement courant :

* si l'objet `o` est autoévaluant, renvoyer `o` ;
* si `o` est un symbole, rechercher une liaison définissant `o` dans `env` et renvoyer la référence
  associée ;
* si `o` est une liste :
  * calculer `(eval (car o) env)`, soit `f` la fermeture résultat ;
  * calculer `(eval a env)` pour tout élément `a` de `(cdr o)`, soit
    `v` la liste des résultats ;
  * calculer `(apply f v)`.

### Application : `(apply f v)`

Avec :

* `f` : fermeture de la fonction à appliquer ;
* `v` : liste des valeurs des arguments.

1. Soient `e` l'environnement lexical de `f`, `lf` la liste des paramètres
   formels et `c` le corps de la fermeture.
2. Construire l'environnement local `e-local` constitué des liaisons entre les
   paramètres formels de `lf` et les références des valeurs correspondantes
   dans `v`.
3. Pour chaque expression `expr` du corps `c` de `f`, évaluer
   `(eval expr (cons e-local e))`.
4. Renvoyer le résultat de l'évaluation de la dernière expression de `c`.

### Évaluation paresseuse

L'évaluation paresseuse, ou par nécessité, consiste à retarder l'évaluation des
paramètres jusqu'au moment de leur utilisation. Certains
paramètres peuvent ainsi ne jamais être évalués. Ce mécanisme est nécessaire
pour implémenter les conditionnelles et les boucles.

### Remplacement textuel

Il y a deux niveaux de substitution : l'appel d'une macro est substitué par la
définition de la macro, dans laquelle les paramètres formels ont été substitués
par les arguments donnés lors de l'appel. Toutes ces substitutions sont
textuelles : la structure syntaxique n'est pas prise en compte. En C, les
macros avec paramètres fonctionnent de cette façon. Pour éviter certains pièges
syntaxiques, il faut respecter des règles d'écriture des macros (paramètres entre
parenthèses, corps entre parenthèses).

## Macro-expansions par transformation de source

En Lisp et en Scheme, les macro-expansions fonctionnent par transformation de
source, en tenant compte de la syntaxe. Elles permettent d'écrire des formes
dites spéciales, dont l'évaluation n'est pas applicative. Les arguments sont
évalués sur demande (en Lisp) ou par nécessité (en Scheme).

```scheme
(define-syntax-rule <pattern> <template>)
```

* `<pattern>` : `(<nom-de-la-macro> <p1> ...)`
* `<p1>`, ... : variables de la macro
* `<template>` : expression
* Remplacement des variables dans le template
* Le résultat est une forme
* Évaluation de la forme dans l'environnement d'appel (les macros Scheme sont hygiéniques : les identificateurs introduits par le template ne capturent pas ceux du code appelant)
