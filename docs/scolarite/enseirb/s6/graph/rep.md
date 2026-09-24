---
title: Graphe - Représentation des graphes
description: "Représentation des graphes en mémoire : tableaux de listes d'adjacence et matrice d'adjacence, avantages et inconvénients."
---

Les graphes considérés ici auront pour ensemble de sommets des intervalles de la
forme $[1,n]$ avec $n \geq 0$ et, dans le cas de graphes à arcs ou arêtes
multiples, auront pour ensembles d'arcs ou d'arêtes des intervalles de la forme
$[1,m]$ avec $m \geq 0$.

Les deux représentations ont ceci en commun qu'elles permettent d'associer à
chaque sommet $s$ l'ensemble $T[s]$ des arcs sortants de ce sommet. Ainsi,
on peut décider de représenter cet ensemble d'arcs :

+ par une liste chaînée : la représentation est celle des tableaux de listes ;
+ par un tableau de booléens indiquant quels sont les sommets deuxièmes
  extrémités de ces arcs : la représentation est celle de la matrice d'adjacence.

## Représentation par tableaux de listes

L'idée est de représenter un graphe par un tableau qui associe à chaque sommet
une liste (chaînée) des arcs sortants ou des arêtes incidentes. Un graphe
orienté simple $([1, n], E)$ peut être représenté par un tableau T à indices
dans $[1, n]$ et à valeurs des listes de sommets. Un tel tableau doit vérifier
pour tout couple de sommets $(i, j)$ : $j \in T[i] \Leftrightarrow (i, j) \in E$.
On suppose souvent dans une telle représentation que de telles listes sont sans
répétition.

### Avantages

+ L'espace mémoire est linéaire en le nombre de sommets et le nombre
  d'arêtes : $Θ(n + m)$ (ce qui suppose les listes sans répétition).

### Inconvénients

+ Ce n'est pas un codage : un graphe peut être représenté de façons différentes.
+ Tester l'adjacence de deux sommets $u$ et $v$ nécessite de parcourir la liste de $u$, en $O(deg(u))$.

## Représentation par matrice d'adjacence

Cette représentation concerne les graphes dans lesquels seuls les sommets sont
nommés. Tout graphe orienté simple $([1,n],E)$ peut être représenté par sa
**matrice d'adjacence**, c'est-à-dire la matrice $M$ de booléens de taille $n
\times n$ définie par $M[i,j]:=((i,j)\in E)$.

### Avantages

+ Cette représentation est un **codage** : tout graphe admet une unique
  représentation.
+ Tester si un sommet est prédécesseur d'un second est réalisé en temps constant.

### Inconvénients

+ La taille de la représentation est élevée : $\Theta(n \times n)$. Un graphe peu
  dense a une représentation de même taille qu'un graphe dense.

## Conclusion

De la même façon que le type de graphe à choisir dépend du problème à résoudre,
la représentation de ce graphe dépend de la solution algorithmique retenue. Le
recensement complet des primitives utilisées dans l'algorithme dans l'objectif
d'avoir un algorithme efficace détermine le bon choix de cette représentation !
