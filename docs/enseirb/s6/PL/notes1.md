---
layout: page
hide: true
title: PL - Cours 1 
---

## <i class="fas fa-search"></i> Introduction par l'exemple

Un fabricant produit 2 types de yaourts à la fraise A et B à partir de Fraise,
de Lait, et de Sucre. Chaque yaourt doit respecter les proportions suivantes de
matières premières A : 2 fraises, 1 lait et 0 sucre. Et B : 1 faire, 2 lait et 1
sucre.

On dispose de 800kg de Fraises, 700kg de Lait et 300kg de sucre. La vente de 1kg
de yaourts A et B rapporte respectivement 4€ et 5€.

Pour maximiser le profit on va se poser 3 questions

1. Sur quelles quantités peut-on travailler ?

+ Seules valeurs non constantes : les quantités de yaourts A et B produites
+ On parle de **variables**
+ On les notera $x_A$ et $x_B$

2. Que cherche-t-on à optimiser ?

+ Le profit $z$
+ Calculé à partir de $x_A$ et $x_B$
+ On parle de **fonction objectif** $z=4x_A+5x_B$

3. Quelles sont les contraites du problème ?

+ $\begin{cases} 2 x_A + x_B \leq 800 \; \text{fraises} \\ x_A + 2x_B \leq 700
  \; \text{lait} \\ x_b \leq 300 \; \text{sucre} \\ x_A , x_B \geq 0 \end{cases}$

## <i class="fas fa-search"></i> Programme linéaire

### Règles de réecriture

Toute contrainte d'égalité peut s'écirre comme deux inégalités

$\sum \limits_{i=1}^n a_i x_i = b \equiv \begin{cases} \sum \limits_{i=1}^n a_i
x_i \leq b \\ \sum \limits_{i=1}^n a_i x_i \geq b \end{cases}$

Toute contrainte $\geq$ peut s'écrire comme une contraite $\leq$

$\sum \limits_{i=1}^n a_i x_i \geq b \equiv \sum \limits_{i=1}^n -a_i x_i \leq
-b$

Tout problème de minimisation peut s'écrire comme un problème de maximisation

$ \max \sum \limits_{i=1}^n c_i x_i \equiv \min \sum \limits_{i=1}^n - c_i x_i$

### Ecriture générale d'un programme linéaire

On peut écire ainsi un programme linéaire avec $n$ variables $x_1,...,x_n$
et $m$ contraites. Le but est d'avoir des objectifs et contraintes linéaires
de variables de décision (les coefficients $c_i$ et $a_{ij}$ des variables
sont constants). Les variables peuvent prendre n'importe quelle valeur réelle
respectant les contraintes linéaires.

## <i class="fas fa-search"></i> Résolution graphique

+ Solution : affectation de valeurs aux variables
+ Solution réalisable : solution réalisable si les valeurs satisfont l'ensemble
  des contraintes
+ Région réalisable : ensemble des solutions réalisables

## <i class="fas fa-search"></i> Points extrêmes

S'il en existe, il y a toujours une solution optimale sur un sommet (point
extrême) de la région réalisable. Pour trouver l'optimum, il "suffit" d'examiner
les points extrêmes de la région réalisable.

Un **polyèdre convexe** est l'ensemble des solutions d'un système fini
d'inégalités linéaies. L'ensemble des solutions admissibles d'un PL est donc un
polyèdre convexe. On s'intéressera dans un premier temps aux polyèdres bornées.

Un point $x_0$ d'un ensemble convexe $S$ est un point extrême de $S$ s'il
n'existe pas deux points $x_1,x_2 \in S$ tel que $\exists \lambda \in [0,1],
x_0 = \lambda x_1 + (1-\lambda x_2)$

Soit $S$ un ensemble convexe borné de $\mathbb{R}^n$ et $S^e$ l'ensemble
des points extrêmes. Si $x \in S$ alors $x$ peut s'écrire comme une
combinaison convexe de $n+1$ élémnets de $S^e$.

Si le polyèdre formé par l'ensemble des solutions d'un PL est borné, alors il
existe au moins une solution optimale et l'une d'elles est obtenue sur un point
extrême.

## <i class="fas fa-search"></i> Forme standard & bases

Jusqu'à présent on a utilisé la **forme normale** pour représenter un programme
linéaire. On introduit la **forme standard** qi va être utilisée dans
l'algorithme du simplex.

A partir de tout PL sous forme normale, on peut construire un PL sous form
standard. On introduit alors des variables supplémentaires $s_i$, qui sont des
variables d'écart. Chaque variable d'écart est associée à une contrainte.

On dispose d'un PL à $n+m$ variables de $m$ contraintes. Si on annule $n$
variables, on obtient un système de $m$ équations à $m$ inconnues. si la
matrice associé est de rang $m$, le système admet une solution unique. Pour
résoudre le problème obtenu : pivot de Gauss.
