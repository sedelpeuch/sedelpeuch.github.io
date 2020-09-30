---
layout: page
hide: true
title: Informatique quantique - Le monde quantique 
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

## Introduction des idées de base de la mécanique quantique

La mécanique quantique étudie des phénomènes fondamentaux à l'oeuvre dans des
systèmes physique de petites échelles (ex : échelle atomique). Hors cela
provoque donc des profondes difficultés conceptuelles. 
1. La dualité onde-corpuscule avec la longueur d'onde de Broglie $$\lambda =
   \dfrac{h}{p}$$ avec $$h$$ la constante de plank et $$p$$ l'impulsion du
   corpuscule
2. La superposition
3. L'intrication quantique


### Produit scalaire 

soit $$\mathcal{H}$$ un espace vectoriel dans $$\mathbb{C}$$. Le **produit
scalaire** sur $$\mathcal{H}$$ est une application. 

$$\begin{cases} (. \vert .) : \mathcal{H} \times \mathcal{H} \rightarrow
\mathbb{C} \\ (u,v) \mapsto (u \vert v) \in \mathbb{C} \end{cases}$$

Le produit scalaire vérifie les propriétés suivantes : 
- Linéarité à droite 
$$ (u \vert \lambda_1 v_1 + \lambda_2 v_2) = \lambda_1 (u \vert v_1) + \lambda_2
(u \vert v_2) \forall u, v_1, v_2 \in \mathcal{H}, \lambda_1, \lambda_2 \in
\mathbb{C}$$ 
- Anti-linéarité à gauche 
$$(\lambda_1 u_1 + \lambda_2 u_2 \vert v) = \overline{\lambda_1} (u_1 \vert v) +
\overline{\lambda_2} (u_2 \vert v) \forall u_1, u_2, v \in \mathcal{H}, \lambda_1,
\lambda_2 \in \mathcal{C}$$
- Symétrie hermitienne $$(u \vert v) = \overline{(v \vert u)}, \forall u,v \in
  \mathcal{H}$$ 
- Positivité $$(u \vert u) \in \mathbb{R}_+, \forall u \in \mathcal{H}$$ 
- Non-dégéneresence : $$\forall u \in \mathcal{H}$$ si $$(u \vert v) = 0,
  \forall v \in \mathcal{H}$$, alors $$u = 0 \Rightarrow (u | u) = 0 \Rightarrow
  u = 0$$.
  
  On appele un espace pré-herlbertien tout espace vectoriel $$\mathcal{H}$$ sur
  $$\mathbb{C}$$ muni d'un produit scalaire $$(.\vert.)$$ qui vérifie les
  propriétés ci-dessus. Un **espace de Hilbert** est un espace pré-hilbertien
  pour lequel on peut définir une norme qui découle du produit scalaire $$ || u
  || : = \sqrt{(u | u)} \forall u \in \mathcal{H}$$

$$\mathcal{H}^\ast$$ est l'espace de formes linéaires sur $$\mathcal{H}$$ 

$$\mathcal{H}^\ast := \mathcal{L}(\mathcal{H},\mathbb{C})$$

### Base orthonormée de $$\mathcal{H}$$

$$\mathcal{H}$$ admet une **base orthonormée** c'est à dire une famille de
vecteurs $$ e_1, e_2, ..., e_n$$ est une base tel que $$(e_i | e_j) =
\delta_{ij} \forall i,j = 1, ..., n$$. 


Fixons une base orthonormée sur $$\mathcal{H}$$. Si $$u,v \in \mathcal{H}$$ ont
pour coordonnées 

$$X,Y \in \mathcal{M}_{n,1}(\mathbb{C})$$

dans cette base alors 

$$(u | v) = X^+.Y$$ 

$$ X = \begin{pmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{pmatrix}, Y=
\begin{pmatrix} y_1 \\ y_2 \\ \vdots \\ y_n \in \mathcal{M}_{m,n} \end{pmatrix}$$

On peut donc déduire $$(u \vert v) = \sum \limits_{i=1, j=1}^{n,m} x_i,y_j $$

### Application

#### Application adjointe 

Soit une application linéaire $$L: \mathcal{H} \rightarrow \mathcal{H}$$.
L'application adjointe $$L^\ast$$ est défini par $$(u | L v) = (L^\ast u | v),
\forall u,v \in \mathcal{H}$$ Si $$M$$ est la matrice de $$L$$ dans une base
orthonormée, alors la matrice de $$L^\ast$$ est $$M^+$$

#### Application hermitienne 

$$L$$ est **hermilitien** si et seulement si 

$$ (u | L v) = (L u | v), \forall u,v \in \mathcal{H}$$

cela revient à dire que $$L=L^\ast$$, ou bien, si $$M$$ est la matrice de $$L$$
dans ne base orthonormée, alors $$M = M^+$$ 

### Notion de Dirac

On note $$ \vert u \rangle , \vert v \rangle, \vert w \rangle, \vert 0 \rangle,
\vert 1 \rangle$$ les vecteurs de $$\mathcal{H}$$ (les états) : KETS.

Ensuite on note $$ \langle u \vert, \langle v \vert, \langle w \vert, \langle 0
\vert, \langle 1 \vert$$ les duals (formes linéaires) : BRAS.

Autrement dit, on utilise un alphabet où chaque lettre de type $$\vert .
\rangle$$ est un élément de $$\mathcal{H}$$ et chaque lettre de type $$\langle .
\vert$$ est un élément de $$\mathcal{H}^\ast$$. Entre les deux alphabets il
existe une bijection $$\vert u \rangle \leftrightarrow \langle u \vert$$. On
parle de **braket**. 

$$(u \vert v) = \langle u | v \rangle \in \mathbb{C}$$

### Opérateurs 

Soit $$L \in \mathbb{L}(\mathcal{H}, \mathcal{H})$$ la notation $$\langle u
\vert (L \vert v \rangle ) \in \mathbb{C}$$ signifie : la forme $$\langle u
\vert$$ appliquée à l'argument $$L (\vert \rangle)$$. Si nous déplaçons la
parenthèse, on a $$( \langle u \vert L ) \vert v \rangle u (L(V))$$, cela
signifie la forme $$\langle u \vert L$$ appliquée à l'argument $$\vert v
\rangle$$. Le résultat étant le même, indépendamment des parenthèses choisit. 

#### Applications linéaires.

$$\vert v \rangle \langle u |$$ est un opérateur : 
$$ \vert w \rangle \rightarrow \vert v \rangle \langle u | w \rangle = \langle u
\vert w \rangle \vert v \rangle$$ 

#### Décomposition d'opérateurs.

Si $$\vert u_1 \rangle, ..., \vert u_n \rangle$$ une base orthonormée de
vecteurs propres de l'opérateur $$L$$. $$L \vert u_k \rangle = \lambda_k \vert
u_k \rangle, k=1,...,n$$ alors 

$$ L = \sum \limits_{k=1}^n \lambda_k \vert u_k \rangle \langle u_k \vert$$

#### Produit tensoriel $$\otimes$$.

La forme associée au vecteur $$| u \rangle \otime | v \rangle$$ est $$\langle u
\vert \hat{\otimes} \langle v |$$ 

### Exercice : 

Soit $$E$$ un espace vectoriel et soit $$e_1,e_2$$ une base de $$E$$ ($$dim E =
2$$) et soit les vecteurs $$x = 2 e_1 + 4 e_2 , y = 5 e_1 + 3 e_2$$.

1. Quels sont les vecteurs de la base de l'espace produit tensoriel $$E \otimes
   E$$ 
2. Trouver le vecteur $$x \otimes y$$

## Postulats de la mécanique quantique

### Principe de superposition

L'état d'un système quantique est défini par un vecteur (un ket) qui est une
combinaison linéaire, avec des coefficients complexes, d'états de base. 

### Principe de correspondance 

Les observables physiques (c'est à dire les "choses qu'on mesure") sont
représentées par des opérateurs mathématiques, appelés **observables**

### Principe de quantification 

Les mesures ne peuvent pas donner d'autres résultats que ceux qui correspondent
) des valeurs propres de ces opérateurs mathématiques. Les vecteurs propres qui
correspondent à ces valeurs propres forment une base de l'espace des états du
système. 

$$\hat{\mathcal{O}} \vert \alpha_n \rangle = \alpha_n \vert \alpha_n \rangle$$

Avec $$\hat{\mathcal{O}}$$ l'observable, $$\vert \alpha_n \rangle$$ le vecteur
propre et $$\alpha_n$$ la valeur propre

### Règle de Born - principe de décomposition spectrale 

Les calculs mathématiques fournissent la probabilité d'observer tel ou tel
résultat de mesure. La mesure d'une grandeur physique représentée par
l'observable $$\hat{\mathcal{O}}$$, effectué sur l'état quantique $$\vert
\psi(t) \rangle$$, donne le résultat $$a_n$$ avec la probabilité $$P_n = | c_n |^2$$


### Principe de réduction du paquet d'onde

La mesure modifie l'état du système quantique mesuré de manière à faire
disparaître les probabilités qui ne sont pas réalisées. 

### Postulat VI - equation de Schrödinger 

$$i \hbar \dfrac{d \Psi(x,t)}{dt} = H \Psi(x,t)$$

L'évolution dans le temps du système quantique est donnée par l'équation de
Schrödinger : l'état $$\vert \psi(t) \rangle$$ de tout système quantique est une
solution de l'équation de Schrödinger dépendante du temps 

$$ i \hbar \dfrac{\diff}{\diff t}\vert \psi(t) \rangle = \hat{\mathcal{H}}\vert
psi(t) \rangle $$ où $$\mathcal{H}$$ est l'Hamiltonien du système. 

## Retour sur le qubit

La différence essentielle avec l'état classique 0/1 est que le qubit peut se
trouver dans d'autres états (une infinité) que les états $$\vert 0 \rangle$$ ou
$$\vert 1 \rangle$$. tout état de la forme 

$$\vert \psi \rangle = \alpha \vert 0 \rangle + \beta \vert \rangle$$ 

où $$\alpha$$ et $$\beta$$ sont deux nombres complexes $$(\vert \alpha \vert^2 +
\vert \beta \vert^2 = 1$$, est accessible au qubit). L'état du qubit est un
vecteur d'un espace vectoriel complexe de dimension 2 dans lequel les éléments
$$\vert 0 \rangle$$ et $$\vert 1 \rangle$$ forment une base. 

De plus, une fois qu'il a été mesuré, l'état du qubit est projeté dans l'état
correspondant au résultat de la mesure. Par exemple si le qubit, originellement
dans l'état $$\vert \psi \rangle$$, est mesuré et que le résultat est 1, le
qubit se trouvera alors projeté dans l'état $$\vert 1 \rangle$$ et toute
nouvelle mesure donnera immanquablement le résultat 1.

Ce qui constitue la base du calcul quantique c'est de modifier l'état du qubit,
en lui appliquant des portes logiques ou en l'associant à un ou plusieurs autres
qubits, sans le mesure, c'est à dire sans le projeter sur les états $$\vert 0
\rangle$$ ou $$\vert 1 \rangle$$. C'est seulement à la fin du calcul que le
qubit est lu et si l'algorithme est bien choisi le processus de projection que
réalise la mesure finale du qubit permet d'extraire l'information recherchée. 

### Réalisation d'un qubit - états internes d'un atome 

On considère deux niveaux de l'atome : 
+ le niveau fondamental : c'est celui de plus basse énergie, l'état quantique de
  l'atome est $$\vert g \rangle$$ (ground state) et son énergie $$E_g$$. 
+ le premier niveau excité : l'état atomique est noté $$\vert e \rangle$$ et son
  énergie $$E_e$$.
  
Si on envoit sur l'atome dans son état fondamental un photon d'énergie
exactement $$E_e - E_g$$ le photon est absorbé par l'atome qui passe dans le
niveau excité 

$$ \vert g \rangle \rightarrow \vert e \rangle$$ 

Les énergies mises en jeu à l'échelle atomique sont de l'ordre de l'électron
volt ($$1.6 \times 10^{-19} J$$), le rayonnement lumineux associé au photon a
une longueur d'onde $$\lambda = \dfrac{c}{\nu} = \dfrac{hc}{E_e - E_g}$$ où
$$c$$ est la vitesse de la lumière ($$3 \times 10^8 ms^{-1})$$ et $$h$$ la
constante de Planck ($$6.6 \times 10^{-34} Js)$$, l'ordre de grandeur des
longueurs d'onde correspondant aux énergies atomiques de l'ordre d'un eV est
entre $$0.4$$ et $$1 \mu m$$; c'est le domaine de la lumière visible.

L'atome revient dans son état fondamental au bout d'un temps moyen appelé durée
de vie du niveau excité, en émettant un photo de même énergie $$E_e - E_g$$
(émission spontanée). La durée de vie d'un niveau atomique varie de quelques
nanosecondes à la seconde. 

Si on envoie un photon d'énergie $$E_e - E_g$$ sur l'atome quand il est encore
dans l'état excité l'atome va se désexciter en émettant un photon à la même
énergie - émission induite. 

Supposons qu'on éclaire continuellement l'atome avec cette radiation lumineuse
composée de photons d'énergie $$E_e - E_g$$ (radiation résonante), l'atome va
osciller entre l'état $$\vert g \rangle$$ à l'état $$\vert e \rangle$$. A
l'instant $$t$$ il sera dans un état de superposition 

$$ \vert \psi \rangle = \cos(\omega t / 2) \vert g \rangle + \sin(\omega t / 2)
e^{i \phi} \vert e \rangle$$

l'atome est un qubit : on associe à l'état $$\vert g \rangle$$ l'état $$\vert 0
\rangle$$ et à l'état $$\vert e \rangle$$ l'état $$\vert 1 \rangle$$. 

Pour mesurer l'état de l'atome à un moment donné on envoie sur celui-ci une
impulsion laser "accordée" sur une transition $$\vert g \rangle \rightarrow
\vert a \rangle$$ qui n'a pas d'équivalent à partir de l'état $$\vert e
\rangle$$. Si le photon est absorbé c'est que le système est dans l'état $$\vert
g \rangle$$ sinon il est dans l'état $$\vert e \rangle$$.


### Réalisation d'un qubit - polarisation d'un photon

Une onde électromagnétique, la lumière par exemple, peut être représentée
mathématiquement par un champ vectoriel transverse, ie orthogonal à la direction
de propagation. Dans un référentiel $$(O,\hat{e}_x,\hat{e}_y,\hat{e}_z)$$, de
coordonnées $$(x,y,z)$$, choisi tel que l'onde se propage selon l'axe des $$z$$,
le champ électrique est décrit par 

$$\overline{E}(t,z) = \overline{E}_O e^{i(\omega t - kz)}$$ 

où $$\overline{E}_0 = E_{Ox}\hat{e}_x + E_{O y}\hat{e}_y$$. Le vecteur
$$\overline{E}_0$$, vu comme un nombre complexe, définit la polarisation de
l'onde. L'intensité de l'onde est proportionnelle au module au carré de
$$\overline{E}_0 : || \overline{E}_O ||^2.

La polarisation peut être mise en évidence à l'aide de cristaux ayant une
propriété optique particulière : la biréfringence. Si nous envoyons sur une lame
biréfringente un faisceau d'intensité $$I$$, polarisé linéairement suivant une
direction qui fait un angle $$\theta$$ avec l'axe ordinaire du cristal qu'on
prend comme axe $$Ox$$ : le faisceau est séparé en un faisceau polarisé suivant
$$Ox$$ d'intensité $$I \cos^2 \theta$$ et un autre faisceau polarisé suivant
$$Oy$$ d'intensité $$I \sin^2 \theta$$.

Planck et Einstein ont suggéré au début du XXème siècle que la lumière puisse
aussi être décrite en termes de flot de photons (les quantas de
l'électromagnétisme). Les sources de lumière "classiques" émettent des grandes
quantités de photons même pour des faibles intensités (plusieurs milliard d
milliards de photon  à la seconde pour une lampe de 1W) ce qui fait que l'aspect
"corpusculaire" de la lumière est difficile à mettre en évidence. 

L'avènement récent de l'optique quantique et des nanotechnologies a permis de
développer des sources qui émettent des photons "un par un", c'est à dire
séparés par des intervalles de temps mesurables avec la technologie actuelle. 

Le photon est un "objet quantique", on associe un état quantique à chaque
vecteur de base de polarisation de l'onde : $$\vert x \rangle$$ pour l'état de
polarisation suivant l'axe $$Ox$$ et $$\vert y \rangle$$ pour l'état de
polarisation suivant l'axe $$Oy$$. À l'orientation $$\theta$$ de la polarisation
on associe l'état 

$$ \vert \theta \rangle = \cos \theta \vert x \rangle + \sin \theta \vert y
\rangle$$ 

Quelle trajectoire va suivre le photon qui se trouve dans cet état ? La réponse
de la mécanique quantique est qu'on ne peut pas le savoir. Mais ce qu'on peut
connaître (postulat de la mesure) c'est la probabilité que le photo
