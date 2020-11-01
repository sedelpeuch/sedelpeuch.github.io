---
layout: page
hide: true
title: Calcul quantique, algorithme de Deutsch
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

Notes inspirées du
[polycopié](https://dept-info.labri.fr/~ges/ENSEIGNEMENT/CALCULQ/polycop_calculq.pdf)
de Y. Leroyer et G. Sénizergues. 

<style>
html {
 zoom: 0.80;
}
</style>

## Ordinateur classique vs ordinateur quantique

On peut schématise un ordinateur classique (machine de Turing) à l'aide de 3
composants,
1. des registres (qui contiennent les données à traiter)
2. une unité de calcul (qui transforme les données suivant un algorithme défini
   en actionnant des portes logiques)
3. une unité d'entrées/sorties (qui initialise les registres au début du
   traitement et lit les résultats à la fin)

### Les registres 
+ les registres classiques sont un ensemble de $$n$$ bits permettant de stocker
  $$m=2^n$$ entiers entre 0 et $$2^n-1$$.
+ un registre quantique est un système quantique de $$n$$ qubits dont les états
  seront éléments de l'espace des états de dimension $$m=2^n$$. On définit dans
  cet espace la base $$\vert j_1,j_2,...,j_n \rangle := \vert j_1 \rangle \vert
  j_2 \rangle ... \vert j_n \rangle$$ 
  
1. Liste des états de chaque qubit, éléments de $$\mathbb{Z}_2 = \{0,1\}$$ :
   $$\vert j_1 j_2 ... j_n \rangle$$ 
2. nombre entier $$j \in \[0,2^n-1]$$ dont l'ensemble $$(j_1,j_,...,j_n)$$
   constitue la décomposition binaire $$j=j_1 2^{n-1} + ... + j_n$$
   
$$\mathbb{Z}_M$$ est l'ensemble des entiers modulo $$M$$ tel que 

$$\begin{align} j \in
\mathbb{Z}_M &\Leftrightarrow (j_1,j_2,...,j_n) \in \mathbb{Z}^n_2, M = 2^n \\ 
j &= j_1 2^{n-1} + j_2 2^{n-2} + ... + j_n 2^0 \\
k &= k_1 2^{n-1} + k_2 2^{n-2} + ... + k_n 2^0 
\end{align}
$$ 

### Spécificité des registres quantiques

Les registres quantiques peuvent se trouver non seulement dans un des états de
la base (comme le registre classique), mais aussi dans un état de superposition

$$\vert \psi \rangle = \sum \limits_{x=0}^{N+1} \alpha_x \vert x \rangle$$

Les algorithmes quantiques sont représentés par l'évolution d'un ou plusieurs
registres sous l'effet de l'application d'opérateurs unitaires. L'état de
l'ordinateur peut comprendre plusieurs registres. 

## Les entrées / sorties

L'entrée correspond à mettre le système quantique lui même constitué par les
registres dans un état initial, on dit qu'on prépare le système. Le plus souvent
les différents registres sont initialement dans l'état $$\vert 0 \rangle$$, et
la préparation consiste à faire agir différents opérateurs, comme la
transformation de Hadamard.

La sortie correspond à la lecture d'un registre mesure de l'état quantique final
du registre. D'après (le postulat de la mesure de la mécanique quantique) il la
modifie, et de façon irréversible, l'état du registre (qui est projette sur 1
des états de la base). En général, les algorithmes quantique utilisent des
mesures partielles de l'état final (mesure de seulement un des registres, voir
même quelques bits d'un registre) 

## Parallélisme quantique 

Souvent on a besoin d'évaluer la fonction 

$$ f : \mathbb{Z}^M_2 \rightarrow \mathbb{Z}^M_2 $$

qu'on ne peut pas toujours représenter par un opérateur unitaire. Pour associer
un opérateur unitaire à l'évaluation d'une fonction, on introduit une fonction
et on définit 
- un registre de données

## Exercice

Calculer $$\vert \psi_1$$ et représenter le sous la forme d'une somme des
vecteurs de la base 

