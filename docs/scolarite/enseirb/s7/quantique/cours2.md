---
title: "Le monde quantique"
description: "Bases mathématiques et physiques : produit scalaire hermitien, espaces de Hilbert, notation de Dirac, opérateurs, postulats de la mécanique quantique, réalisations physiques d'un qubit."
---

## Introduction des idées de base de la mécanique quantique

La mécanique quantique étudie des phénomènes fondamentaux à l'œuvre dans des
systèmes physiques de petite échelle (par exemple l'échelle atomique). Elle
soulève de profondes difficultés conceptuelles :

1. La dualité onde-corpuscule, avec la longueur d'onde de de Broglie
   $\lambda = \dfrac{h}{p}$, où $h$ est la constante de Planck et $p$
   l'impulsion du corpuscule
2. La superposition
3. L'intrication quantique

### Produit scalaire

Soit $\mathcal{H}$ un espace vectoriel sur $\mathbb{C}$. Le **produit
scalaire** sur $\mathcal{H}$ est une application :

$$
\begin{cases} (\cdot \vert \cdot) : \mathcal{H} \times \mathcal{H} \rightarrow
\mathbb{C} \\ (u,v) \mapsto (u \vert v) \end{cases}
$$

Le produit scalaire vérifie les propriétés suivantes :

- Linéarité à droite :
  $(u \vert \lambda_1 v_1 + \lambda_2 v_2) = \lambda_1 (u \vert v_1) + \lambda_2 (u \vert v_2)$,
  $\forall u, v_1, v_2 \in \mathcal{H}, \lambda_1, \lambda_2 \in \mathbb{C}$
- Antilinéarité à gauche :
  $(\lambda_1 u_1 + \lambda_2 u_2 \vert v) = \overline{\lambda_1} (u_1 \vert v) + \overline{\lambda_2} (u_2 \vert v)$,
  $\forall u_1, u_2, v \in \mathcal{H}, \lambda_1, \lambda_2 \in \mathbb{C}$
- Symétrie hermitienne : $(u \vert v) = \overline{(v \vert u)}$,
  $\forall u,v \in \mathcal{H}$
- Positivité : $(u \vert u) \in \mathbb{R}_+$, $\forall u \in \mathcal{H}$
- Caractère défini (non-dégénérescence) : $(u \vert u) = 0 \Rightarrow u = 0$

On appelle espace préhilbertien tout espace vectoriel $\mathcal{H}$ sur
$\mathbb{C}$ muni d'un produit scalaire $(\cdot \vert \cdot)$ qui vérifie les
propriétés ci-dessus. Il est muni de la norme qui découle du produit scalaire,
$\Vert u \Vert := \sqrt{(u \vert u)}$. Un **espace de Hilbert** est un espace
préhilbertien complet pour cette norme (c'est toujours le cas en dimension
finie, cadre de ce cours).

$\mathcal{H}^\ast$ est l'espace des formes linéaires sur $\mathcal{H}$ :

$$\mathcal{H}^\ast := \mathcal{L}(\mathcal{H},\mathbb{C})$$

### Base orthonormée de $\mathcal{H}$

$\mathcal{H}$ admet une **base orthonormée**, c'est-à-dire une base
$e_1, e_2, \dots, e_n$ telle que $(e_i \vert e_j) = \delta_{ij}$,
$\forall i,j = 1, \dots, n$.

Fixons une base orthonormée de $\mathcal{H}$. Si $u,v \in \mathcal{H}$ ont pour
coordonnées $X,Y \in \mathcal{M}_{n,1}(\mathbb{C})$ dans cette base :

$$
X = \begin{pmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{pmatrix}, \quad
Y = \begin{pmatrix} y_1 \\ y_2 \\ \vdots \\ y_n \end{pmatrix}
$$

alors $(u \vert v) = X^+ Y$, avec $X^+$ la transposée conjuguée de $X$. On en
déduit :

$$(u \vert v) = \sum_{i=1}^{n} \overline{x_i}\, y_i$$

### Applications

#### Application adjointe

Soit une application linéaire $L: \mathcal{H} \rightarrow \mathcal{H}$.
L'application adjointe $L^\ast$ est définie par
$(u \vert L v) = (L^\ast u \vert v)$, $\forall u,v \in \mathcal{H}$. Si $M$ est
la matrice de $L$ dans une base orthonormée, alors la matrice de $L^\ast$ est
$M^+$.

#### Application hermitienne

$L$ est **hermitienne** (autoadjointe) si et seulement si

$$(u \vert L v) = (L u \vert v), \forall u,v \in \mathcal{H}$$

Cela revient à dire que $L=L^\ast$ ou, si $M$ est la matrice de $L$ dans une
base orthonormée, que $M = M^+$.

### Notation de Dirac

On note $\vert u \rangle, \vert v \rangle, \vert w \rangle, \vert 0 \rangle,
\vert 1 \rangle$ les vecteurs de $\mathcal{H}$ (les états) : les KETS.

On note $\langle u \vert, \langle v \vert, \langle w \vert, \langle 0 \vert,
\langle 1 \vert$ les duaux (formes linéaires) : les BRAS.

Autrement dit, on utilise un alphabet où chaque lettre de type
$\vert \cdot \rangle$ est un élément de $\mathcal{H}$ et chaque lettre de type
$\langle \cdot \vert$ est un élément de $\mathcal{H}^\ast$. Entre les deux
alphabets, il existe une bijection (antilinéaire)
$\vert u \rangle \leftrightarrow \langle u \vert$, où
$\langle u \vert = (u \vert \cdot)$. On parle de **bra-ket** :

$$(u \vert v) = \langle u \vert v \rangle \in \mathbb{C}$$

### Opérateurs

Soit $L \in \mathcal{L}(\mathcal{H}, \mathcal{H})$. La notation
$\langle u \vert (L \vert v \rangle ) \in \mathbb{C}$ signifie : la forme
$\langle u \vert$ appliquée à l'argument $L \vert v \rangle$. Si nous déplaçons
la parenthèse, $( \langle u \vert L ) \vert v \rangle$ signifie la forme
$\langle u \vert L$ appliquée à l'argument $\vert v \rangle$. Le résultat est
le même, indépendamment des parenthèses choisies : on note simplement
$\langle u \vert L \vert v \rangle$.

#### Applications linéaires

$\vert v \rangle \langle u \vert$ est un opérateur :

$$\vert w \rangle \mapsto \vert v \rangle \langle u \vert w \rangle = \langle u \vert w \rangle \vert v \rangle$$

#### Décomposition d'opérateurs

Si $\vert u_1 \rangle, \dots, \vert u_n \rangle$ est une base orthonormée de
vecteurs propres de l'opérateur $L$, avec
$L \vert u_k \rangle = \lambda_k \vert u_k \rangle$, $k=1,\dots,n$, alors

$$L = \sum_{k=1}^n \lambda_k \vert u_k \rangle \langle u_k \vert$$

#### Produit tensoriel $\otimes$

La forme associée au vecteur $\vert u \rangle \otimes \vert v \rangle$ est
$\langle u \vert \otimes \langle v \vert$.

### Exercice

Soit $E$ un espace vectoriel, $e_1,e_2$ une base de $E$ ($\dim E = 2$) et les
vecteurs $x = 2 e_1 + 4 e_2$, $y = 5 e_1 + 3 e_2$.

1. Quels sont les vecteurs de la base de l'espace produit tensoriel
   $E \otimes E$ ?
2. Trouver le vecteur $x \otimes y$.

## Postulats de la mécanique quantique

### Principe de superposition

L'état d'un système quantique est défini par un vecteur (un ket) qui est une
combinaison linéaire, avec des coefficients complexes, d'états de base.

### Principe de correspondance

Les grandeurs physiques (c'est-à-dire les « choses qu'on mesure ») sont
représentées par des opérateurs hermitiens, appelés **observables**.

### Principe de quantification

Les mesures ne peuvent pas donner d'autres résultats que les valeurs propres de
ces opérateurs. Les vecteurs propres associés à ces valeurs propres forment une
base de l'espace des états du système.

$$\hat{\mathcal{O}} \vert \alpha_n \rangle = \alpha_n \vert \alpha_n \rangle$$

Avec $\hat{\mathcal{O}}$ l'observable, $\vert \alpha_n \rangle$ le vecteur
propre et $\alpha_n$ la valeur propre.

### Règle de Born - principe de décomposition spectrale

Les calculs mathématiques fournissent la probabilité d'observer tel ou tel
résultat de mesure. La mesure d'une grandeur physique représentée par
l'observable $\hat{\mathcal{O}}$, effectuée sur l'état quantique normalisé
$\vert \psi(t)\rangle$, donne le résultat $\alpha_n$ (valeur propre non
dégénérée) avec la probabilité
$P_n = \vert c_n \vert^2 = \vert \langle \alpha_n \vert \psi(t) \rangle \vert^2$.

### Principe de réduction du paquet d'onde

La mesure modifie l'état du système quantique mesuré de manière à faire
disparaître les probabilités qui ne sont pas réalisées : juste après une mesure
ayant donné $\alpha_n$, le système est dans l'état $\vert \alpha_n \rangle$.

### Évolution temporelle - équation de Schrödinger

L'évolution dans le temps du système quantique est donnée par l'équation de
Schrödinger. Pour une fonction d'onde :

$$i \hbar \dfrac{\partial \Psi(x,t)}{\partial t} = \hat{H} \Psi(x,t)$$

Plus généralement, l'état $\vert \psi(t) \rangle$ de tout système quantique est
une solution de l'équation de Schrödinger dépendante du temps :

$$i \hbar \dfrac{\mathrm{d}}{\mathrm{d} t}\vert \psi(t) \rangle = \hat{H}\vert \psi(t) \rangle$$

où $\hat{H}$ est l'hamiltonien du système.

## Retour sur le qubit

La différence essentielle avec l'état classique 0/1 est que le qubit peut se
trouver dans d'autres états (une infinité) que les états $\vert 0 \rangle$ ou
$\vert 1 \rangle$. Tout état de la forme

$$\vert \psi \rangle = \alpha \vert 0 \rangle + \beta \vert 1 \rangle$$

où $\alpha$ et $\beta$ sont deux nombres complexes tels que
$\vert \alpha \vert^2 + \vert \beta \vert^2 = 1$, est accessible au qubit.
L'état du qubit est un vecteur d'un espace vectoriel complexe de dimension 2
dans lequel les éléments $\vert 0 \rangle$ et $\vert 1 \rangle$ forment une
base.

De plus, une fois qu'il a été mesuré, l'état du qubit est projeté dans l'état
correspondant au résultat de la mesure. Par exemple, si le qubit,
originellement dans l'état $\vert \psi \rangle$, est mesuré et que le résultat
est 1, le qubit se trouve alors projeté dans l'état $\vert 1 \rangle$ et toute
nouvelle mesure donnera immanquablement le résultat 1.

La base du calcul quantique consiste à modifier l'état du qubit, en lui
appliquant des portes logiques ou en l'associant à un ou plusieurs autres
qubits, sans le mesurer, c'est-à-dire sans le projeter sur les états
$\vert 0 \rangle$ ou $\vert 1 \rangle$. C'est seulement à la fin du calcul que
le qubit est lu ; si l'algorithme est bien choisi, le processus de projection
que réalise la mesure finale permet d'extraire l'information recherchée.

### Réalisation d'un qubit - états internes d'un atome

On considère deux niveaux de l'atome :

- le niveau fondamental : c'est celui de plus basse énergie ; l'état quantique
  de l'atome est $\vert g \rangle$ (ground state) et son énergie $E_g$ ;
- le premier niveau excité : l'état atomique est noté $\vert e \rangle$ et son
  énergie $E_e$.

Si on envoie sur l'atome dans son état fondamental un photon d'énergie
exactement $E_e - E_g$, le photon est absorbé par l'atome, qui passe dans le
niveau excité :

$$\vert g \rangle \rightarrow \vert e \rangle$$

Les énergies mises en jeu à l'échelle atomique sont de l'ordre de
l'électron-volt ($1{,}6 \times 10^{-19}\ \mathrm{J}$). Le rayonnement lumineux
associé au photon a une longueur d'onde
$\lambda = \dfrac{c}{\nu} = \dfrac{hc}{E_e - E_g}$, où $c$ est la vitesse de la
lumière ($3 \times 10^8\ \mathrm{m\,s^{-1}}$) et $h$ la constante de Planck
($6{,}6 \times 10^{-34}\ \mathrm{J\,s}$). Pour des énergies de l'ordre de
quelques eV, les longueurs d'onde correspondantes sont comprises entre
$0{,}4$ et $1\ \mu\mathrm{m}$ environ : c'est le domaine de la lumière visible
et du proche infrarouge.

L'atome revient dans son état fondamental au bout d'un temps moyen appelé durée
de vie du niveau excité, en émettant un photon de même énergie $E_e - E_g$
(émission spontanée). La durée de vie d'un niveau atomique varie de quelques
nanosecondes à la seconde.

Si on envoie un photon d'énergie $E_e - E_g$ sur l'atome quand il est encore
dans l'état excité, l'atome se désexcite en émettant un photon de même énergie :
c'est l'émission stimulée (ou induite).

Supposons qu'on éclaire continûment l'atome avec cette radiation lumineuse
composée de photons d'énergie $E_e - E_g$ (radiation résonante) : l'atome va
osciller entre l'état $\vert g \rangle$ et l'état $\vert e \rangle$
(oscillations de Rabi). À l'instant $t$, il sera dans un état de superposition

$$\vert \psi \rangle = \cos(\omega t / 2) \vert g \rangle + \sin(\omega t / 2) e^{i \phi} \vert e \rangle$$

L'atome est un qubit : on associe à l'état $\vert g \rangle$ l'état
$\vert 0 \rangle$ et à l'état $\vert e \rangle$ l'état $\vert 1 \rangle$.

Pour mesurer l'état de l'atome à un moment donné, on envoie sur celui-ci une
impulsion laser « accordée » sur une transition
$\vert g \rangle \rightarrow \vert a \rangle$ (vers un troisième niveau) qui n'a
pas d'équivalent à partir de l'état $\vert e \rangle$. Si le photon est absorbé,
c'est que le système est dans l'état $\vert g \rangle$ ; sinon, il est dans
l'état $\vert e \rangle$.

### Réalisation d'un qubit - polarisation d'un photon

Une onde électromagnétique, la lumière par exemple, peut être représentée
mathématiquement par un champ vectoriel transverse, c'est-à-dire orthogonal à
la direction de propagation. Dans un référentiel
$(O,\hat{e}_x,\hat{e}_y,\hat{e}_z)$, de coordonnées $(x,y,z)$, choisi tel que
l'onde se propage selon l'axe des $z$, le champ électrique est décrit par

$$E(t,z) = E_0 e^{i(\omega t - kz)}$$

où $E_0 = E_{0x}\hat{e}_x + E_{0y}\hat{e}_y$. Le vecteur $E_0$, à composantes
complexes, définit la polarisation de l'onde. L'intensité de l'onde est
proportionnelle au carré de la norme de $E_0$ : $\Vert E_0 \Vert^2$.

La polarisation peut être mise en évidence à l'aide de cristaux ayant une
propriété optique particulière : la biréfringence. Si nous envoyons sur une
lame biréfringente un faisceau d'intensité $I$, polarisé linéairement suivant
une direction qui fait un angle $\theta$ avec l'axe ordinaire du cristal, pris
comme axe $Ox$, le faisceau est séparé en un faisceau polarisé suivant $Ox$
d'intensité $I \cos^2 \theta$ et un autre faisceau polarisé suivant $Oy$
d'intensité $I \sin^2 \theta$.

Planck et Einstein ont suggéré au début du XXe siècle que la lumière puisse
aussi être décrite en termes de flux de photons (les quanta du champ
électromagnétique). Les sources de lumière « classiques » émettent de grandes
quantités de photons, même pour de faibles intensités (plusieurs milliards de
milliards de photons par seconde pour une lampe de 1 W), ce qui rend l'aspect
« corpusculaire » de la lumière difficile à mettre en évidence.

L'avènement récent de l'optique quantique et des nanotechnologies a permis de
développer des sources qui émettent des photons « un par un », c'est-à-dire
séparés par des intervalles de temps mesurables avec la technologie actuelle.

Le photon est un « objet quantique » : on associe un état quantique à chaque
vecteur de base de polarisation de l'onde, $\vert x \rangle$ pour l'état de
polarisation suivant l'axe $Ox$ et $\vert y \rangle$ pour l'état de
polarisation suivant l'axe $Oy$. À l'orientation $\theta$ de la polarisation,
on associe l'état

$$\vert \theta \rangle = \cos \theta \vert x \rangle + \sin \theta \vert y \rangle$$

Quelle trajectoire va suivre le photon qui se trouve dans cet état ? La réponse
de la mécanique quantique est qu'on ne peut pas le savoir. Mais ce qu'on peut
connaître (postulat de la mesure), c'est la probabilité que le photon sorte
polarisé suivant $x$, donnée par $\cos^2 \theta$, et la probabilité
complémentaire qu'il sorte polarisé suivant $y$, donnée par $\sin^2 \theta$.
Donc, en moyenne, si $N$ est le nombre total de photons qui traversent la lame,
on en trouvera $N \cos^2 \theta$ sortant avec la polarisation $Ox$ et
$N \sin^2 \theta$ sortant avec la polarisation $Oy$. Les coefficients
$\cos \theta$ et $\sin \theta$ sont les amplitudes de probabilité de trouver le
photon dans l'état $\vert x \rangle$ ou $\vert y \rangle$ respectivement.

On peut associer un qubit aux deux états de polarisation du photon, par
exemple :

$$\vert x \rangle \rightarrow \vert 0 \rangle, \qquad \vert y \rangle \rightarrow \vert 1 \rangle$$

En jouant sur l'orientation du polariseur et sur le type de polarisation
(linéaire, circulaire, elliptique), on peut construire là aussi un état
quelconque de superposition $\alpha \vert 0 \rangle + \beta \vert 1 \rangle$.
