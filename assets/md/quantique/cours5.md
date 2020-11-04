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
- un registre de données $$\vert x \rangle à $$n$$ qubits, $$x \in
  \mathbb{Z}_{2^n}$$ contiendra la valeur de la varible 
- un registre de résultats $$\vert y \rangle$$ à $$n$$ qubits, $$y\in
  \mathbb{Z}_{2^m}$$ contiendra le résultat 
- un opérateur unitaire 
$$ U_f \vert x \rangle \vert y \rangle = \vert x \rangle \vert y \oplus f(x)
\rangle$$

Le parallélisme est un trait de beaucoup d'algorithme quantique une fonction
$$f(x)$$ peut être évaluée simultanément en plusieurs valeurs de $$x$$
(conséquence de la superposition des états de qubits)

### Exemple 

Soit un registre donné et un registre de résultats chacun à 1 qubit. La valeur
initiale de chaque registre est $$\vert 0 \rangle$$

![exemple](/assets/images/quantique/2.png){:class="image about center"}

Exercice : calculer les états $$\vert \Psi_1 \rangle$$ et $$\vert \Psi_2
\rangle$$ 

$$\Rightarrow$$ on effectue l'application de la porte de Hadamard sur 2 qubits 

$$H_2 (\dfrac{1}{\sqrt{2}} \vert 00 \rangle + \vert 1 0 \rangle) =
\dfrac{1}{\sqrt{2^2}}(\vert 0 0 \rangle + \vert 0 1 \rangle + \vert 1 0
\rangle + \vert 1 1 \rangle)$$

$$\vert \Psi_1 \rangle = \dfrac{1}{\sqrt{2}}(\vert 00 \rangle + \vert 1 0
\rangle)$$ 

L'état de sortie est 

$$ \vert \Psi_2 = \dfrac{1}{\sqrt{2}}(\vert 0, f(0)\rangle + \vert 1,
f(1)\rangle)$$

Il contient ) la fois $$f(0)$$ et $$f(1)$$ obtenues par une seule application de
la porte $$U_f$$ 

### Généralisation 

Soit un registre à $$n$$ qubits (registre de données). La transformation / porte
de Hadamard sur chaque qubit donne pour le registre de données 

$$\dfrac{1}{\sqrt{2^n}} \sum \limits_{x=0}^{2^n-1} \vert x \rangle, x \in
\mathbb{Z}_{2^n} = \dfrac{1}{\sqrt{2^n}}(\vert 00...0 \rangle + \vert
00...01\rangle + ... + \vert 11 .. 11 \rangle)$$

![generalisation](/assets/images/quantique/3.png){:class="image about center"}

Les états de sortie sont 

$$ \dfrac{1}{\sqrt{2^n}} \sum \limits_{x=0}^{2^n-1} \vert x \rangle \vert 0 +
f(x) \rangle = \dfrac{1}{\sqrt{2^n}} \sum \limits_{x=0}^{2^n-1}\vert x \rangle
\vert f(x) \rangle$$

Cela fait apparaître de nouveau toutes les valeurs de $$f$$ en une seule
opération, c'est le parallélisme quantique.

## Algorithme de Deutsh (1985)

L'algorithme de Deutsh-Jozsa est un algorithme quantique, proposé par David
Deutsh et Richard Jozsa en 1992. Dans le cas du problème de Deutsh-Jozsa, nous
disposons d'une boite noire quantique, connu sous le nom d'oracle qui implémente
une fonction mathématique $$f : \{0,1\}^n \rightarrow \{0,1\}$$. Nous savons que
cette fonction est soit constante (la sortie est 0 ou 1 pour toutes les entrées)
soit équilibrée (la sortie est 0 dans la moitié des cas, 1 dans les autres). Le
but du problème est de savoir si la fonction est constante ou équilibrée à
l'aide de l'oracle. 

### La solution déterministe 

Si un algorithme 
