---
layout: page
hide: true
title: Informatique quantique 
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

## <i class="fas fa-vial"></i> Aperçu 

*Qu'est ce que l'informatique quantique et le calcul quantique ?* 

Le calcul quantique et l'informatique quantique sont l'étude de traitement
d'information en utilisant des **système quantiques**. 

Un ordinateur quantique n'est pas simplement un ordinateur plus rapide, mais
c'est un ordinateur qui permet une nouvelle manière de concevoir les
algorithmes, les **algorithmes quantique**

L'ordinateur classique fonctionne sur le principe des bits (utilisation
principale du binaire 0 ou 1), la réalisation physique repose sur le courant
électrique, si le courant passe l'information vaut 1 sinon elle vaut 0. On se
base sur les portes logiques (NOT, AND, XOR ...) qui nécessitent des
transistors. 

Avant le bit quantique nous avons le **bit probabiliste**
$$(p,q); p , q \in [0,1]$$ tel que $$p+q = 1$$

En revanche un ordinateur quantique manipule des **bits quantiques** (ou qubits)
qui obéissent aux lois de la mécanique quantique.

### Principe de superposition

Un objet quantique peut se retrouver en un *superposition d'états*. (l'objet
quantique respectif n 'est pas seulement soit dans l'était 0 soit dans l'état 1
mais il peut être dans une superposition d'états)

Exemple du principe de superposition : Le chat de Schrodinger.

### Décoherence

Terme désignant le passage du monde quantique au monde classique. Plus un
système physique interagit avec son environnement  plus les effets quantiques
s'estompent.

### Représentation d'un qubit

On note $$\vert \Psi \rangle$$ un étant d'un système quantique à 2 niveaux (tel un
qubit) décomposition du vecteur (ket) 

$$\vert \Psi \rangle = \alpha \vert 0 \rangle + \beta \vert 1 \rangle$$a$$
avec $$\alpha^2 + \beta^2 = 1, \alpha, \beta \in \mathbb{C}$$

Un nombre complexe est donné par un module et une phase.

### Sphère de Bloch 

![Sphere de bloch](/assets/images/quantique/bloch.png){:class="image about center"}

Avec le système de coordonnées sphérique : $$\begin{cases} x = \sin{\theta}
\cos{\varphi} \\ y = \sin{\theta} \sin{\varphi} \\ z = \cos{\theta} \end{cases}$$

Les facteurs  de phase n'affectant pas l'état physique d'un système, nous
pouvons choisir $$\alpha \in \mathbb{R}_+$$

$$\vert \Psi \rangle = \cos{\dfrac{\theta}{2}} \vert 0 \rangle + \exp{i \varphi}
\sin{\dfrac{\theta}{2}} \vert 1\rangle$$

#### Exercice.
Où sur la sphère de bloch retrouve t'on les états $$|0 \rangle$$ et
$$|1\rangle$$

Si $$|\Psi\rangle = \vert 0 \rangle$$. Donc $$\cos{\dfrac{\theta}{2}}  \vert 0
\rangle + e^{i \phi} \sin{\dfrac{\theta}{2}} \vert 1 \rangle \vert 0 \rangle$$ 

$$\begin{cases} \cos{\dfrac{\theta}{2}} = 1 \\ e^{i \phi}
\sin{\dfrac{\theta}{2}} = 0 \end{cases}$$ 

or $$\cos{\dfrac{theta}{2}} = 1$$ donc $$\dfrac{\theta}{2}$$

### Exemples d'objets quantiques 

#### L'électron. 

Il possède une propriété quantique : le **spin**. Pour l'électron, il y a 2
possibilitéés, spin up et spin down. Le spin fait que l'électron peut faire
office de qubit. On est dans une superposition de ces 2 étant. 

#### Registres. 

Pour un ordinateur classique on utilise des registres, par exemple un registre à
4 bits permet de faire 16 états possibles.

Pour un ordinateur quantique, on utilise un registre quantique, par exemple un
registre à 4 qubits permet une superposition de 16 états. 

$$\alpha_1 \vert 0000 \rangle + \alpha_2 \vert 0001 \rangle + ... + \alpha_n \vert 1111 \rangle$$

### Portes quantiques

Permet de manipuler des qubits et de faire des manipulations comme dans un monde
classique. 

Par exemple la porte de **Hadamard** :

 $$ \begin{cases} \vert 0 \rangle  \stackrel{H}{\rightarrow} \dfrac{1}{\sqrt{2}} (\vert 0
  \rangle + \vert 1 \rangle) \\ \vert 1 \rangle \stackrel{H}{\rightarrow}
  \dfrac{1}{\sqrt{2}} (\vert 0 \rangle - \vert 1 \rangle) \end{cases} $$ 

Il existe toute une zoologie des portes quantiques qui prend en entrée 1,2 , ...
qubits. 

Mathématiquement on représente une porte quantique par une matrice unitaire
$$U$$. $$U$$ est une matrice carré complexe, elle est unitaire si ($$U^+$$ est
la matrice transposée conjuguée)

$$U.U^+ = 1 = U^+.U$$
 
### Exemple de problème à résoudre : 

Soit $$F : \mathbb{N} \rightarrow \mathbb{N}$$, trouver $$x$$ tel que
$$f(x)=42$$, $$f$$ est donnée sous la forme d'un tableau. Un algorithme
classique effectuerai une recherche exhaustive (de complexité linéaire), en
quantique l'algorithme de Groves permet de réaliser l'opération en une complexité $$\sqrt{n}$$. 

Autre exemple sur la factorisation des nombres entiers : 

Simple lorsque le nombre utilise des facteurs premiers petits, appel à des
algorithmes de cryptographique qui se basent sur la factorisation. En revanche en
1994, Peter Schor a trouvé un algorithme quantique qui se base sur l'assemblage
de portes quantiques d'une complexité meilleure (exponentiellement meilleure)
que la complexité de l'algorithme classique de factorisation.

### Réalisation physique des qubits

Un ordinateur classique fonctionne selon le courant électrique, pour réaliser un
qubit il faut un système physique suffisamment petit pour obéir aux lois de la
mécanique quantique.

Les objets susceptibles permettant de réaliser physiquement un qubits peuvent
être, le spin de l'électron ou d'un noyau atomique, la polarisation d'un photon,
circuit superconducteurs. 

Cependant il y a quelques complications techniques : 
1. Il faut avoir suffisamment de qubits pour avoir un registre quantique assez
   grand 
2. Matériaux isolés du monde extérieur pour qu'ils soient stables et pour qu'ils
   puissent rester dans un état superposé le plus longtemps possible pour
   effectuer des calculs

### La Suprématie quantique

Ce terme désigne un problème que l'on ne pourrait résoudre qu'avec un ordinateur
quantique et qu'un ordinateur classique ne peux pas résoudre.

## <i class="fas fa-vial"></i> 3 motivation pour l'étude de l'informatique quantique

1. La miniaturisation actuelle a déjà atteint des niveaux où les effets
   quantiques apparaissent
2. Les effets quantiques permettent d'accélérer certains calculs et permettent
   certains calculs inaccessibles aux ordinateurs classiques
3. Le but de l'informatique théorique est d'étudier les pouvoirs et les limites
   des dispositifs de calculs les plus puissant que l'on peut avoir


## <i class="fas fa-vial"></i> Un peu d'histoire

- Début des années 80 : suggestions au sujet de l'existence future d'un
  ordinateur quantique par Richard Fegman
- 1985 : David Deutsh a défini la machine de Turing quantique universelle 
- développements des premiers algorithmes quantiques par Deutsh et Jozsa
- 1994 : algorithme quantique de factorisation de Peter Schor
- suprématie quantique 

## <i class="fas fa-vial"></i> Le monde quantique


