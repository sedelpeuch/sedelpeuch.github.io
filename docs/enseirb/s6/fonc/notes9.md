---
layout: page
hide: true
title: Les macroexpensions 
---

## <i class="fas fa-code-branch"></i> Rappels sur l'évaluation et l'application

### Evaluation application $\texttt{(eval o env)}$

Cette forme d'évaluation est utilisée pour toutes les fonctions construites avec
des $lambda$, $define$, $let$ et $letrec$. C'est celle qui est mise en
oeuvre dans la plupart des langages de programmation, en particulier impératifs
$(C,Java)$. Soit $env$ l'environnement courant

* Si l'objet $o$ est autoévaluant, renvoyer $o$
* Si $o$ est un symbole, alors
    + Rechercher une liaison définissant $o$ dans $env$, renvoyer la référence
      associée
* Si $o$ est une liste
    + Calculer $\texttt{(eval (car o) env)}$. Soit $f$ la fermeture résultat
    + Calculer $\texttt{(eval a env)}$, pour tout élément $a$ de $\texttt{(cdr o)}$. soit
      $v$ la liste des résultats
* Calculer $\texttt{(apply f v)}$

### Application : $\texttt{(apply f v)}$

Avec

* $f$ : fermeture de la fonction à appliquer
* $v$ : liste des valeurs des arguments

1. Soient $e$ l'environnement lexical de $f$, $If$ la liste des paramètres
   formels et $c$ le corps de la fermeture
1. Construire l'environnement local $e-local$ constitué des liaisons entre les
   paramètres formels de $If$ et les références des valeurs correspondantes
   dans $v$
1. Pour la suite d'expressions $expr$ du corps $c$ de $f$ faire
   $\texttt{(eval expr (cons e-local e))}$
1. Renvoyer le résultat de l'évaluation de la dernière expression de $c$

### Évaluation paresseuse

L'évaluation paresseuse ou par nécessité consiste à retarder l'évaluation des
paramètres jusqu'au moment de leur utilisation. Éventuellement, certains
paramètres ne sont pas évalués dans certains cas. Ce mécanisme est nécessaire
pour implémenter les conditionnelles et dans les boucles

### Replacement textuel

Il y a deux niveau de substitutions l'appel d'une macro est substitué par la
définition de la macro dans laquelle les paramètres formels ont été substitués
par les arguments donnés lors de l'appel. Toutes ces substitutions sont
textuelles. Ainsi, la structure syntaxique n'est pas prise en compte. En C, les
macro-fonction fonctionnent de cette façon. Pour éviter certains pièges
syntaxiques, il faut respecter des règles d'écriture des macros (paramètre entre
parenthèses, corps entre parenthèses)

## <i class="fas fa-code-branch"></i> Macroexpensions par transformation de source

En lisp et en scheme, les macroexpensions fonctionnent par transformation de
source, en tenant compte de la syntaxe. Elles permettent d'écrire ces formes
dites spéciales dont l'évaluation n'est pas applicative. Les arguments sont
évalués sur demande (en lisp) ou par nécessité (en scheme).

$\texttt{(define-syntax-rule <pattern> <template>)}$

* $<pattern>$ : $\texttt{(<nom>-<macro> <p_1> ...)}$
* $<p_1>$ : variables de la macro
* $<template>$ : expressions
* Replacement des variables dans le template
* Le résultat est une forme
* Évaluation de la forme dans l'environnement d'appel

