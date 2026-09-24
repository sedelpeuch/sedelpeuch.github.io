---
title: PL - Cours 1
description: "Introduction à la programmation linéaire : modélisation par l'exemple, règles de réécriture, résolution graphique, points extrêmes et forme standard."
---

## Introduction par l'exemple

Un fabricant produit 2 types de yaourts à la fraise, A et B, à partir de fraises,
de lait et de sucre. Chaque yaourt doit respecter les proportions suivantes de
matières premières : A, 2 parts de fraises, 1 de lait et 0 de sucre ; B, 1 part de fraises, 2 de lait et 1 de
sucre.

On dispose de 800 kg de fraises, 700 kg de lait et 300 kg de sucre. La vente de 1kg
de yaourts A et B rapporte respectivement 4€ et 5€.

Pour maximiser le profit, on va se poser 3 questions :

1. Sur quelles quantités peut-on travailler ?

+ Seules valeurs non constantes : les quantités de yaourts A et B produites
+ On parle de **variables**
+ On les notera $x_A$ et $x_B$

2. Que cherche-t-on à optimiser ?

+ Le profit $z$
+ Calculé à partir de $x_A$ et $x_B$
+ On parle de **fonction objectif** $z=4x_A+5x_B$

3. Quelles sont les contraintes du problème ?

+ $\begin{cases} 2 x_A + x_B \leq 800 \; \text{fraises} \\ x_A + 2x_B \leq 700
  \; \text{lait} \\ x_B \leq 300 \; \text{sucre} \\ x_A , x_B \geq 0 \end{cases}$

## Programme linéaire

### Règles de réécriture

Toute contrainte d'égalité peut s'écrire comme deux inégalités :

$\sum \limits_{i=1}^n a_i x_i = b \equiv \begin{cases} \sum \limits_{i=1}^n a_i
x_i \leq b \\ \sum \limits_{i=1}^n a_i x_i \geq b \end{cases}$

Toute contrainte $\geq$ peut s'écrire comme une contrainte $\leq$ :

$\sum \limits_{i=1}^n a_i x_i \geq b \equiv \sum \limits_{i=1}^n -a_i x_i \leq
-b$

Tout problème de minimisation peut s'écrire comme un problème de maximisation (la solution optimale est la même, la valeur optimale change de signe) :

$$
\min \sum \limits_{i=1}^n c_i x_i = - \max \sum \limits_{i=1}^n (- c_i) x_i
$$

### Écriture générale d'un programme linéaire

On peut écrire ainsi un programme linéaire avec $n$ variables $x_1,\ldots,x_n$
et $m$ contraintes :

$$
\max \sum_{j=1}^n c_j x_j \quad \text{s.c.} \quad \sum_{j=1}^n a_{ij} x_j \leq b_i \; (1 \leq i \leq m), \quad x_j \geq 0
$$

 Le but est d'avoir des objectifs et contraintes linéaires
de variables de décision (les coefficients $c_i$ et $a_{ij}$ des variables
sont constants). Les variables peuvent prendre n'importe quelle valeur réelle
respectant les contraintes linéaires.

## Résolution graphique

+ Solution : affectation de valeurs aux variables
+ Solution réalisable : solution dont les valeurs satisfont l'ensemble
  des contraintes
+ Région réalisable : ensemble des solutions réalisables

## Points extrêmes

S'il existe une solution optimale (et si la région réalisable possède au moins un sommet), il y a toujours une solution optimale sur un sommet (point
extrême) de la région réalisable. Pour trouver l'optimum, il "suffit" d'examiner
les points extrêmes de la région réalisable.

Un **polyèdre convexe** est l'ensemble des solutions d'un système fini
d'inégalités linéaires. L'ensemble des solutions admissibles d'un PL est donc un
polyèdre convexe. On s'intéressera dans un premier temps aux polyèdres bornés.

Un point $x_0$ d'un ensemble convexe $S$ est un point extrême de $S$ s'il
n'existe pas deux points distincts $x_1,x_2 \in S$ et $\lambda \in ]0,1[$ tels que
$x_0 = \lambda x_1 + (1-\lambda) x_2$.

Soit $S$ un ensemble convexe compact (fermé et borné) de $\mathbb{R}^n$ et $S^e$ l'ensemble
de ses points extrêmes. Si $x \in S$, alors $x$ peut s'écrire comme une
combinaison convexe d'au plus $n+1$ éléments de $S^e$.

Si le polyèdre formé par l'ensemble des solutions d'un PL est borné et non vide, alors il
existe au moins une solution optimale et l'une d'elles est obtenue sur un point
extrême.

## Forme standard et bases

Jusqu'à présent on a utilisé la **forme normale** pour représenter un programme
linéaire. On introduit la **forme standard**, qui va être utilisée dans
l'algorithme du simplexe.

À partir de tout PL sous forme normale, on peut construire un PL sous forme
standard, où toutes les contraintes sont des égalités. On introduit alors des variables supplémentaires $s_i$, qui sont des
variables d'écart positives ou nulles : $\sum_j a_{ij} x_j \leq b_i$ devient $\sum_j a_{ij} x_j + s_i = b_i$. Chaque variable d'écart est associée à une contrainte.

On dispose d'un PL à $n+m$ variables et $m$ contraintes. Si on annule $n$
variables (variables hors base), on obtient un système de $m$ équations à $m$ inconnues (variables de base). Si la
matrice associée est de rang $m$, le système admet une solution unique, appelée solution de base. Pour
résoudre le système obtenu : pivot de Gauss.
