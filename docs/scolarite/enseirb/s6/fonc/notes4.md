---
title: Récursivité
description: "Récursivité en Scheme : factorielle récursive, récursivité terminale avec accumulateur, fonction auxiliaire via letrec et notion de continuation."
---

## Exemple d'introduction

Définition mathématique de la factorielle :

```text
fact(0) = 1
fact(n) = n * fact(n-1)
```

Traduction en Scheme :

```scheme
(define (fact n)
  (if (zero? n)
      1
      (* n (fact (sub1 n)))))
```

## Récursivité terminale

Les appels récursifs sont dits terminaux si aucun calcul n'est effectué après leur retour.

Pour rendre une fonction récursive terminale, on déplace le calcul effectué après l'appel récursif pour le faire avant, en le transmettant dans un paramètre supplémentaire (accumulateur). Ceci modifie l'ordre des calculs.

L'exemple de la factorielle devient alors :

```scheme
(define (fact-t n r)
  (if (zero? n)
      r
      (fact-t (sub1 n)
              (* n r))))
```

Les valeurs successives de `n` sont utilisées dans les calculs qui sont effectués avant les appels récursifs. Il est inutile de les conserver dans une pile.

### Problème de paramètres

Notre fonction `fact-t` demande un paramètre supplémentaire qui doit être initialisé à 1. Pour garantir son bon fonctionnement, il faut définir deux fonctions, l'une faisant l'appel initial et l'autre le calcul récursif terminal.

```scheme
(define (factorielle n)
  (letrec ((fact-t
            (lambda (n r)
              (if (zero? n)
                  r
                  (fact-t (sub1 n)
                          (* n r))))))
    (fact-t n 1)))
```

## Continuation fonctionnelle

Une `continuation` représente le futur d'un calcul, c'est-à-dire le calcul à faire après le calcul d'une expression. Une continuation est modélisée par une fonction qui s'applique au résultat d'une expression. Elle représente un `goto` fonctionnel.

Pour construire la continuation d'un appel récursif, on effectue une abstraction de l'expression contenant le calcul récursif par une application `(k a)`. Le paramètre `a` de l'application est le résultat de l'appel récursif. La fonction `k` est la continuation.
