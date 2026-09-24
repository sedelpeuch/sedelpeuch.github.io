---
title: Les formes impératives
description: "Formes impératives en Scheme/Racket : références, passage d'arguments, affectation avec set!, paires mutables et blocs begin."
---

## Références

Une référence est un objet correspondant à une adresse mémoire et dont
l'indirection est faite automatiquement dans toute situation où une valeur est
requise. L'adresse associée à une référence n'est pas directement manipulable en
tant que telle (il n'existe pas d'opérations pour le programmeur sur les
références).

* Un symbole est lié à une référence, correspondant à un atome ou à une paire
  pointée
* L'évaluation d'un symbole renvoie une référence vers sa valeur
* La référence est utilisée partout où la valeur elle-même n'est pas requise

## Passage d'arguments

Soient $f$ une fonction et $p_1,p_2, \ldots, p_n$ ses paramètres formels. Soit
l'application :

```scheme
(f a1 a2 ... an)
```

Soient $r_1, r_2, \ldots, r_n$ les références vers les résultats des évaluations
respectives des arguments $a_1, a_2, \ldots, a_n$.

Lors de l'application, un environnement local est construit. Il est constitué
des liaisons entre les paramètres formels $p_i$ de la fonction $f$ et les
références $r_i$ des arguments de l'application :

```scheme
((p1 . r1) (p2 . r2) ... (pn . rn))
```

Les références $r_1,r_2,\ldots, r_n$ sont utilisées comme des valeurs à travers
les symboles $p_1, p_2, \ldots, p_n$, les indirections étant effectuées
automatiquement. Ainsi, modifier un paramètre $p_i$ (avec `set!`) n'a pas d'effet sur la variable de l'appelant :
la modification reste locale à cet environnement.

## L'affectation

### La forme `set!`

```scheme
(set! <id> <e>)
```

* La référence associée à l'identificateur `<id>` est remplacée par la référence
  du résultat de l'évaluation de l'expression `<e>`.
* La valeur de retour de l'affectation est la valeur `#<void>`, que la boucle
  d'interaction (REPL) n'affiche pas. La procédure `void` rend ce même résultat en prenant un
  nombre quelconque d'arguments.

### Modification de paires pointées

La norme Scheme fournit `set-car!` et `set-cdr!` pour modifier les paires pointées. En
Racket, en revanche, les paires construites par `cons` sont immuables : il faut utiliser les paires mutables (`mcons`, `mcar`, `mcdr`, `set-mcar!`, `set-mcdr!`).

## Blocs d'expressions

Certaines expressions pouvant effectuer des effets de bord, il devient utile
de les mettre en séquence. Contrairement aux formes `let` et `lambda`, dont le corps accepte une suite d'expressions,
certaines formes, telles que `if`, nécessitent d'utiliser une forme spéciale de
mise en séquence.

### La forme `begin`

```scheme
(begin <e1> <e2> ... <en>)
```

* Chaque expression $e_i$ est évaluée selon son ordre d'apparition
* Le résultat de l'évaluation de la séquence est celui de la dernière
* Les valeurs des évaluations des expressions précédentes sont perdues
* Il existe une forme `begin0` qui renvoie le résultat de la première
  expression de la séquence
