---
title: Programmation fonctionnelle - Introduction
description: "Concepts de la programmation fonctionnelle (transparence référentielle, fonctions de première classe, typage dynamique), bases du lambda-calcul et lien avec la syntaxe Lisp."
---

## Concepts et terminologie

* **Écriture fonctionnelle** : programmation par application de fonctions plutôt que par l'exécution de séquences d'instructions
* **Transparence référentielle** : chaque expression peut être remplacée par son résultat sans changer le comportement du programme, ce qui suppose l'absence d'effets de bord
* **Programmation fonctionnelle pure** : sans effets de bord, avec transparence référentielle
* **Fonctions de première classe** : type fonction, constantes fonctions, opérateurs sur les fonctions
* **Typage dynamique** : les valeurs sont typées au moment de l'exécution et non au moment de la compilation
* **Références** : ce sont les adresses des objets ; elles sont utilisées chaque fois que les contenus ne sont pas utiles (passages de paramètres, retours de fonctions)
* **Ramasse-miettes (*garbage collector*)** : gestion dynamique et automatique de la mémoire. L'utilisateur ne s'occupe pas de désallouer la mémoire

## Le $\lambda$-calcul

* **Variables** : $x,y,\ldots$
* **Applications** : si $u$ et $v$ sont des $\lambda$-termes, $uv$ est aussi un $\lambda$-terme. On peut alors voir $u$ comme une fonction et $v$ comme un argument, $uv$ étant alors l'image de $v$ par la fonction $u$.
* **Abstractions** : si $x$ est une variable et $u$ un $\lambda$-terme, alors $\lambda x.u$ est un $\lambda$-terme. Intuitivement, $\lambda x.u$ est la fonction qui à $x$ associe $u$.

### La substitution

Cette opération permet de remplacer les occurrences d'une variable par un terme pour réaliser le calcul des $\lambda$-termes. On note $t[x:=u]$ la substitution dans un $\lambda$-terme $t$ de toutes les occurrences libres d'une variable $x$ par un terme $u$.

* **Variables** : si $t$ est une variable, alors $t[x:=u]=u$ si $x=t$, et $t$ sinon
* **Application** : si $t=vw$, alors $t[x:=u]=v[x:=u]\,w[x:=u]$
* **Abstraction** : si $t=\lambda y.v$, alors $t[x:=u]=\lambda y.(v[x:=u])$ si $x \neq y$ et si $y$ n'est pas une variable libre de $u$. Si $y$ est une variable libre de $u$, on renomme $y$ avant de substituer. Si $x=y$, le résultat est $t$.

### La $\beta$-réduction

On appelle **rédex** un terme de la forme $(\lambda x.u)v$. On définit alors la $\beta$-réduction :

$$
(\lambda x .u)v \rightarrow u[x:=v]
$$

* La réduction du terme $(\lambda x.u)v$ est la valeur de la fonction $\lambda x.u$ appliquée à l'argument $v$
* $u$ est l'image de $x$ par la fonction $(\lambda x.u)$
* L'image de $v$ est obtenue en substituant $v$ à $x$ dans $u$

### La normalisation

Un $\lambda$-terme $t$ est dit en forme normale si aucune $\beta$-réduction ne peut lui être appliquée, c'est-à-dire si $t$ ne contient aucun rédex.

## Lien avec la syntaxe Lisp

La syntaxe Lisp est directement inspirée du $\lambda$-calcul. Les parenthèses servent à délimiter les termes et les applications.

* **Variables** : $x$, et constantes de types numérique, symbolique, fonctionnel, etc.
* **Abstractions fonctionnelles** : $\lambda x.y$ s'écrit `(lambda (x) y)`
* **Application** : $uv$ s'écrit `(u v)`

## Développement incrémental

Boucle *Read Eval Print* : REPL

1. Read : lecture d'une expression
2. Eval : calcul (réduction) de l'expression
3. Print : affichage du résultat (forme normale)
4. Affichage du prompt `>` et retour à 1
