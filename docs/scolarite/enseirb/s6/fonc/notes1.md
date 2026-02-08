---
title: Programmation fonctionnelle - Introduction
---
## <i class="fas fa-code-branch"></i> Concepts et terminologie

* **Ecriture fonctionnelle** : programmation par applications de fonctions plutôt que par l'exécution de séquences d'instructions
* **Transparence référentielle** : chaque expression peut être remplacée par son résultat sans changer le comportement du programme - sans effets de bord
* **Programmation fonctionnelle pure** : sans effets de bords, avec transparence référentielle
* **Fonctions de première classe** : type fonction, constantes fonction, opérateurs sur les fonctions
* **Type dynamique** : les variables sont typées au moment de l'exécution et non au moment de la compilation
* **Références** : ce sont les adresse sur des objets, elles sont utilisées chaque fois que les contenus ne sont pas utiles (passages de paramètres, retours de fonctions)
* **Garbage collector** : gestion dynamique et automatique de la mémoire. L'utilisateur ne s'occupe pas de désallouer la mémoire

## <i class="fas fa-code-branch"></i> Le $\lambda$-calcul

* **Variables** : $x,y,...$
* **Applications** : si $u$ et $v$ sont des $\lambda$-termes $uv$ est aussi un $\lambda$-terme. On peut alors voir $u$ comme une fonction et $v$ comme un argument, $uv$ étant alors l'image de $v$ par la fonction $u$.
* **Abstractions** : si $x$ est une variable et $u$ un $\lambda$-terme alors $\lambda x u$ est un $\lambda$-terme. Intuitivement, $\lambda x.u$ est la fonction qui à $x$ associe $u$

### La substitution

Cette opération permet de remplacer les occurences d'une variable par un terme pour réaliser le calcul des $\lambda$-termes. On note $t[x:=u]$ la substitution dans un lambda terme $t$ de toutes les occurrences d'une variable $x$ par un terme $u$.

* **Variables** : si $t$ est une variable alors $t[x:=u]=u$ si $x=t$ et $t$ sinon
* **Application** : si $t=vw$ alors $t[x:=u]=v[x:=u]w[x:=u]$ si $v$ et $w$ sont des termes
* **Abstraction** : si $t=\lambda y v$ alors $t[x:=u]=\lambda y (v[x:=u])$ si $x \neq y$ et $y$ n'est pas une variable libre de $u$. Si $y$ est une variable libre de $u$, on renomme $y$ avant de substituer. Si $x=y$ le résultat est $t$.

### La $\beta$-réduction

On appelle **rédex** un terme de la forme $(\lambda x.u)v$. On définit alors la $\beta$-réduction

$ (\lambda x .u)v \rightarrow u[x:=v]$a$

* La réduction du terme $(\lambda x.u)v$ est la valeur de la fonction $\lambda x.u$ appliquée à la variable $v$
* $u$ est límage de $x$ par la fonction $(\lambda x.u)$
* L'image de $v$ est obtenue en substituant dans $u$,$x$ par $v$

### La normalisation

Un lambda terme $t$ est dit en forme normale si aucune $\beta$-réduction ne peut lui être appliquée, c'est à dire si $t$ ne contient aucun rédex.

## <i class="fas fa-code-branch"></i>  Lien avec la syntaxe lisp

La syntaxe lisp est complètement basée sur le $\lambda$-calcul. Les parenthèses servent à délimiter les termes et les application

* **Variables** : $x$, et constantes de types numériques, symbolique, fonctionnel etc
* **Abstractions fonctionnelles** : $\lambda x.y$ s'écrit `(lambda(x),y)`
* **Application** : $uv$ s'écrit `(u v)`

## <i class="fas fa-code-branch"></i> Développement incrémental

Boucle Read Eval Print : REPL

1. Read : Lecture d'une expression
2. Eval : calcul (réduction) de l'expression
3. Print : affichage du résultat (forme normale)
4. Affichage du prompt `>` et retour à 1
