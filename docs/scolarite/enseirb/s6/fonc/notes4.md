---
layout: page
hide: true
title: Récursivité
---


### Exemple d'introduction

```
fact(0)=1
fact(n)=n * fact(n-1)

(define (fact n)
    (if (zero? n)
        1
        (* n (fact (sub1 n)))))
```

## <i class="fas fa-code-branch"></i> Récursivité terminale

Pour rendre une fonction récursive terminale, on déplace le calcul effectuée après l'appel récursif pour le faire avant. Ceci modifie l'ordre des calculs.

Les appels récursifs sont dits terminaux si aucun calcul n'est effectué après leur retour.

L'exemple de la factorielle devient alors

```
(define (fact-t n r)
    (if (zero? n)
        r
        (fact-t (sub1 n)
                (* n r))))
```

Les valeurs successives de n sont utilisées dans les calculs qui sont effectués avant les appels récursifs. Il est inutile de les conserver dans une pile.

### Problème de paramètres

Notre fonction `fact-t` demande un paramètre supplémentaire qui doit être initialisé à 1. Pour garantir son bon fonctionnement, il faut définir deux fonction, l'une faisant l'appel initial et l'autre le calcul récursif terminal.

```
(define (factorielle n)
    (letrec ((fact-t
              (lambda (n r)
                  (if (zero? n)
                      r)
                      (fact-t (sub1 n)
                              (* n r)))))
    (fact-t n 1)))
```

## <i class="fas fa-code-branch"></i> Continuation fonctionnelle

Une `continuation` représente le futur d'un calcul, c'est à dire le calcul à faire après le calcul d'une expression. Une continuation est modélisée par une fonction qui s'applique au résultat d'une expression. Elle représente un `Goto` fonctionnel.

Pour construire la continuation d'un appel récursif, on effectue une abstraction de l'expression contenant le calcul récursif par une application : `(k a)`. La paramètre `a` de l'application est le résultat de l'appel récursif. La fonction `k` est la continuation.
