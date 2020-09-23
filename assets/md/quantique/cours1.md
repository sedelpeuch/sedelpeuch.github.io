---
layout: page
hide: true
title: Informatique quantique - Le B-A-BA Quantique 
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

## Qu'est ce qu'un qubit ?

### Bit classique et bit quantique 

La brique élémentaire d'information classique est le bit (binary digit
originellement) qui prend deux valeurs 0 ou 1. La mise en oeuvre physique du
calcul, réalisée par l'ordinateur, repose alors sur des systèmes à deux états :
aimantation "up / down", interrupteur "on / off", condensateurs "chargés /
déchargés" dans les RAM ... Même si le fonctionnement des composants
électroniques qui créent, stockent et manipulent les les bits repose sur les
principes de la mécanique quantique, les états du système qui définissent les
bits sont décrits par la physique classique, essentiellement parce qu'ils
mettent en jeu un grand nombre de particules (courants électriques). 

LE bit quantique ou qubit peut lui aussi se trouver dans deux états 0/1 mais qui
sont maintenant les états d'un système *quantique* ; pour les distinguer des
états classiques, on les note $$\vert 0 \rangle$$ ou $$\vert 1 \rangle$$ suivant
la convention introduite par le physicien P.A.M. Dirac dans les années 30. La
différence essentielle avec l'état classique 0/1 est que le qubit peut se
trouver dans d'autres états (une infinité) que les états $$\vert 0 \rangle$$ ou
$$\vert 1 \rangle$$. En fait tout état de la forme 

$$\vert \psi \rangle = \alpha | 0 \rangle + \beta | 1 \rangle$$ 

où $$\alpha$$ et $$\beta$$ sont deux nombres complexes, est accessible au qubit;
autrement dit l'état du qubit est un vecteur d'un espace vectoriel complexe de
dimension 2 dans lequel les éléments $$\vert 0 \rangle$$ et $$\vert 1 \rangle$$
forment une base dite base de calcul. 

Que trouve-t-on si on cherche à lire le contenu du qubit, si on le mesure ? On
trouvera 0 si il est dans l'état $$\vert 0 \rangle$$ et 1 si il est dans l'état
$$\vert 1 \rangle$$. Ceci n'est pas très inattendu et ne change pas du bit
classique ! Et s'il est dans l'état $$| \psi \rangle$$ ? Et bien là aussi on
trouvera 0 ou 1 mais de façon aléatoire. En fait on aura 0 avec la probabilité
$$|\alpha|^2$$ ou 1 avec la probabilité $$| \beta|^2$$. On ne peut donc pas
observer directement l'état de superposition $$| \psi \rangle$$ du qubit ! De
plus, une fois qu'il a été mesuré, l'état du qubit est projeté dans l'état
correspondant au résultat de la mesure : par exemple si le qubit, originellement
dans l'état $$\vert \psi \rangle$$ est mesuré et que le résultat est 1, le qubit
se trouvera alors projeté dans l'était $$\vert 1 \rangle$$ et toute nouvelle
mesure donnera immanquablement le résultat 1. Ces "règles de vie" du monde
quantique concernant la description de l'état et à sa mesure constituent ce
qu'on appelle les premiers postulats de la mécanique quantique que l'on
développera dans la suite. Ce que permettent ces règles et qui constitue la base
du calcul quantique c'est de modifier l'état du qubit, en lui appliquant des
portes logiques ou en l'association à un ou plusieurs autres qubit, sans le
mesure, c'est à dire sans le projeter sur les état $$\vert 0 \rangle$$ ou
$$\vert 1 \rangle$$. C'est seulement à la fin du calcul que le qubit est lu et
si l'algorithme est bien choisi le processus de projection que réalise la mesure
finale du qubit permet d'extraire l'information recherchée. Avant d'entrer dans
le détail de ces processus du calcul donnons une illustration de la façon de
réaliser concrètement un qubit. 

## Qubits et postulats quantiques 

Il est temps maintenant de préciser les premiers postulats de la mécanique
quantique. 

### Postulat de l'état d'un système quantique

Les états d'un système quantique sont décrits comme étant des éléments d'un
espace vectoriel appelé espace des états noté $$\mathcal{E}$$. La dimension de cet
espace peut être finie ou infinie selon le système considéré. Dans cet espace on
peut définir une base dénombrable et un produit scalaire (espace de Hilbert).
Les états du système quantique associé à un qubit sont les éléments d'un espace
à deux dimensions, engendrés par les états de la base $$\vert 0 \rangle$$ et $$\vert
1 \rangle$$ (on verra comment le troisième postulat permet de choisir cette
base). Tout état sera donc de la forme 

$$ \vert \Psi \rangle = \alpha | 0 \rangle + \beta \vert 1 \rangle$$ 

On retrouve donc là la spécificité des qubits de pouvoir se trouver dans un état
de superposition. Nous verrons plus loin avec le postulat de la mesure que les
coefficients $$\alpha$$ et $$\beta$$ sont en fait des amplitudes de probabilités
et doivent satisfaire $$| \alpha |^2 + | \beta |^2 = 1$$. La notation abstraite
de Dirac pour l'état $$| \Psi \rangle$$ peut conduire à différentes
représentations mathématiques : l'état peut être représenté par une fonction
$$\psi(r,t)$$ (formalisme des fonctions d'ondes et de la mécanique ondulatoire),
ou par une matrice (notament dans le cas d'espaces de dimensions finies), ou par
les deux (matrice de fonctions). Dans notre espace à deux dimensions on peut
utiliser une représentation matricielle 

$$ \vert 0 \rangle \rightarrow \begin{pmatrix} 1 \\ 0 \end{pmatrix} ; \vert 1
\rangle \rightarrow \begin{pmatrix} 0 \\ 1 \end{pmatrix}$$

$$\vert \psi \rangle = \alpha \vert 0 \rangle + \beta \vert 1 \rangle
\rightarrow \begin{pmatrix} \alpha \beta \end{pmatrix}$$ 

Rappelons les quelques base d'algèbre linéaire exprimées dans la notation de
Dirac. 
- le produit scalaire hermitien de deux vecteur $$\vert \psi \rangle$$ et
  $$\vert \phi \rangle$$ est noté $$\langle \psi \vert \phi \rangle$$ et il
  satisfait $$\langle \psi \vert \phi \rangle = \overline{\langle \phi \vert
  \psi \rangle}$$ et $$\langle \psi \vert \lambda_1 \phi_1 + \lambda_2 \phi_2
  \rangle = \lambda_1 \langle \psi \vert \phi_1 \rangle + \lambda_2 \langle \psi
  \vert \phi_2 \rangle$$; les états $$\langle 0 \vert, \langle 1 \vert$$ et
  $$\langle \psi \vert$$ duaux de $$\vert 0 \rangle$$, $$\vert 1 \rangle$$ et
  $$\vert \psi \rangle$$, sont représentés par les matrices ligne 
  
  $$ \langle 0 \vert \rightarrow (1,0) ; \langle 1 \vert \rightarrow (0,1) ;
  \langle \psi \vert \rightarrow (\overline{\alpha}\overline{\beta})$$
  
- la norme du vecteur $$\vert \psi \rangle$$ est notée $$||\psi||^2=\langle \psi
  \vert \psi \rangle$$; les états de base sont orthonormés ce qui équivaut à 
  
  $$ \langle 0 \vert 1 \rangle = 0 $$ 
  $$ \langle 0 \vert 0 \rangle = \langle 1 \vert 1 \rangle = 1$$ 
  
  Si $$\vert \psi \rangle = \alpha \vert 0 \rangle + \beta \vert 1 \rangle$$ et
  $$\vert \phi \rangle = \gamma \vert 0 \rangle + \delta \vert 1 \rangle$$ alors
  $$\langle \psi \vert \phi \rangle = \overline{\alpha} \gamma +
  \overline{\beta} \delta$$ et $$||\psi||^2 = |\alpha|^2 + |\beta|^2, ||\phi||^2
  = |\gamma|^2 + |\delta|^2$$; La représentation matricielle des états conduit à 
  
  $$ \vert \phi \rangle \rightarrow \begin{pmatrix} \gamma \\ \delta
  \end{pmatrix}; \langle \psi \vert \rightarrow
  (\overline{\alpha}\overline{\beta}) \Rightarrow \langle \psi \vert \phi
  \rangle = (\overline{\alpha}\overline{\beta})\begin{pmatrix} \gamma \\ \delta
  \end{pmatrix} = \overline{\alpha} \gamma + \overline{\beta} \delta$$
  
### Postulat sur les grandeurs observables 

A toute grandeur observable est associé un opérateur linéaire (hermétique)
agissant dans l'espace des états $$\mathcal{E}$$. Par exemple à l'énergie totale du
système est associée l'opérateur hamiltonien $$H$$; à la polarisation du photon
est associé l'opérateur de polarisation $$P$$. Dans les situations que nous
considérerons ces opérateurs auront un ensemble discret de valeurs propres et
d'états propres; par exemple pour un observable $$\mathcal{A}$$ auquel est
associé un opérateur $$A$$ 

$$\exists a_n \in \mathbb{C}$$ et $$ \vert \phi_n \rangle \in \mathcal{E}$$ tels
que $$A \vert \phi_n \rangle = a_n \vert \phi_n \rangle$$ pour
$$n=1,...,N=dim(\mathcal{E})$$. 

Les états $$\vert \phi_n \rangle$$ sont orthonormés et constituent une base dans
$$\mathcal{E}$$ : 

$$\langle \phi_n \vert \phi_m \rangle = \delta_{nm}$$

$$ \forall \vert \psi \rangle \in \mathcal{E} \vert \psi \rangle = \sum
\limits_{n} a_n \vert \phi_m \rangle$$ avec $$a_n = \langle \phi_n \vert \psi
\rangle$$

Dans la première équation $$\delta_{nm}$$ est le symbole de Kronecker définir
par $$\delta_{nm}=1 si $$n=m$$ et 0 sinon. Dans notre exemple du qubit les états
$$\vert 0 \rangle$$ et $$\vert 1 \rangle$$ sont les états propres d'une grandeur
observable. 

### Postulat de la mesure 

Soit un observable $$\mathcal{A}$$ auquel est associé l'opérateur $$A$$ de
valeurs propres $$\{a_n\}$$ et d'états propres $$\{\phi_n\}$$. Quand un système
initialement dans un état $$\vert \psi \rangle$$ est soumis à la mesure de
l'observable $$\mathcal{A}$$
- les seuls résultats possibles sont les $$\{a_n\}$$, valeurs propres de $$A$$
- la probabilité d'obtenir la valeur $$a_n$$ est donnée par $$\mathcal{P}(a_n) =
  |\langle \phi_n \vert \psi \rangle |^2$$
- après la mesure si le résultat est $$a_n$$ le système se trouve projeté dans
  l'état $$\vert \phi_n \rangle$$
- Si le système est déjà dans un état propre $$\vert \phi_n \rangle$$ de $$A$$,
  c'est à dire si $$\vert \psi \rangle = \vert \phi_n \rangle$$ la mesure de
  $$\mathcal{A}$$ donnera $$a_n$$ avec certitude. 
  
  C'est donc le système de mesure qui va fixer la base des états dans
  $$\mathcal{E}$$ : les états de base sont les états propres de l'observable
  mesuré 

<!-- *Qu'est ce que l'informatique quantique et le calcul quantique ?*  -->

<!-- Le calcul quantique et l'informatique quantique sont l'étude de traitement -->
<!-- d'information en utilisant des **système quantiques**.  -->

<!-- Un ordinateur quantique n'est pas simplement un ordinateur plus rapide, mais -->
<!-- c'est un ordinateur qui permet une nouvelle manière de concevoir les -->
<!-- algorithmes, les **algorithmes quantique** -->

<!-- L'ordinateur classique fonctionne sur le principe des bits (utilisation -->
<!-- principale du binaire 0 ou 1), la réalisation physique repose sur le courant -->
<!-- électrique, si le courant passe l'information vaut 1 sinon elle vaut 0. On se -->
<!-- base sur les portes logiques (NOT, AND, XOR ...) qui nécessitent des -->
<!-- transistors.  -->

<!-- Avant le bit quantique nous avons le **bit probabiliste** -->
<!-- $$(p,q); p , q \in [0,1]$$ tel que $$p+q = 1$$ -->

<!-- En revanche un ordinateur quantique manipule des **bits quantiques** (ou qubits) -->
<!-- qui obéissent aux lois de la mécanique quantique. -->

<!-- ### Principe de superposition -->

<!-- Un objet quantique peut se retrouver en un *superposition d'états*. (l'objet -->
<!-- quantique respectif n 'est pas seulement soit dans l'était 0 soit dans l'état 1 -->
<!-- mais il peut être dans une superposition d'états) -->

<!-- Exemple du principe de superposition : Le chat de Schrodinger. -->

<!-- ### Décoherence -->

<!-- Terme désignant le passage du monde quantique au monde classique. Plus un -->
<!-- système physique interagit avec son environnement  plus les effets quantiques -->
<!-- s'estompent. -->

<!-- ### Représentation d'un qubit -->

<!-- On note $$\vert \Psi \rangle$$ un étant d'un système quantique à 2 niveaux (tel un -->
<!-- qubit) décomposition du vecteur (ket)  -->

<!-- $$\vert \Psi \rangle = \alpha \vert 0 \rangle + \beta \vert 1 \rangle$$a$$ -->
<!-- avec $$\alpha^2 + \beta^2 = 1, \alpha, \beta \in \mathbb{C}$$ -->

<!-- Un nombre complexe est donné par un module et une phase. -->

<!-- ### Sphère de Bloch  -->

<!-- ![Sphere de bloch](/assets/images/quantique/bloch.png){:class="image about center"} -->

<!-- Avec le système de coordonnées sphérique : $$\begin{cases} x = \sin{\theta} -->
<!-- \cos{\varphi} \\ y = \sin{\theta} \sin{\varphi} \\ z = \cos{\theta} \end{cases}$$ -->

<!-- Les facteurs  de phase n'affectant pas l'état physique d'un système, nous -->
<!-- pouvons choisir $$\alpha \in \mathbb{R}_+$$ -->

<!-- $$\vert \Psi \rangle = \cos{\dfrac{\theta}{2}} \vert 0 \rangle + \exp{i \varphi} -->
<!-- \sin{\dfrac{\theta}{2}} \vert 1\rangle$$ -->

<!-- ### Exemples d'objets quantiques  -->

<!-- #### L'électron.  -->

<!-- Il possède une propriété quantique : le **spin**. Pour l'électron, il y a 2 -->
<!-- possibilitéés, spin up et spin down. Le spin fait que l'électron peut faire -->
<!-- office de qubit. On est dans une superposition de ces 2 étant.  -->

<!-- #### Registres.  -->

<!-- Pour un ordinateur classique on utilise des registres, par exemple un registre à -->
<!-- 4 bits permet de faire 16 états possibles. -->

<!-- Pour un ordinateur quantique, on utilise un registre quantique, par exemple un -->
<!-- registre à 4 qubits permet une superposition de 16 états.  -->

<!-- $$\alpha_1 \vert 0000 \rangle + \alpha_2 \vert 0001 \rangle + ... + \alpha_n \vert 1111 \rangle$$ -->

<!-- ### Portes quantiques -->

<!-- Permet de manipuler des qubits et de faire des manipulations comme dans un monde -->
<!-- classique.  -->

<!-- Par exemple la porte de **Hadamard** : -->

<!--  $$ \begin{cases} \vert 0 \rangle  \stackrel{H}{\rightarrow} \dfrac{1}{\sqrt{2}} (\vert 0 -->
<!--   \rangle + \vert 1 \rangle) \\ \vert 1 \rangle \stackrel{H}{\rightarrow} -->
<!--   \dfrac{1}{\sqrt{2}} (\vert 0 \rangle - \vert 1 \rangle) \end{cases} $$  -->

<!-- Il existe toute une zoologie des portes quantiques qui prend en entrée 1,2 , ... -->
<!-- qubits.  -->

<!-- Mathématiquement on représente une porte quantique par une matrice unitaire -->
<!-- $$U$$. $$U$$ est une matrice carré complexe, elle est unitaire si ($$U^+$$ est -->
<!-- la matrice transposée conjuguée) -->

<!-- $$U.U^+ = 1 = U^+.U$$ -->
 
<!-- ### Exemple de problème à résoudre :  -->

<!-- Soit $$F : \mathbb{N} \rightarrow \mathbb{N}$$, trouver $$x$$ tel que -->
<!-- $$f(x)=42$$, $$f$$ est donnée sous la forme d'un tableau. Un algorithme -->
<!-- classique effectuerai une recherche exhaustive (de complexité linéaire), en -->
<!-- quantique l'algorithme de Groves permet de réaliser l'opération en une complexité $$\sqrt{n}$$.  -->

<!-- Autre exemple sur la factorisation des nombres entiers :  -->

<!-- Simple lorsque le nombre utilise des facteurs premiers petits, appel à des -->
<!-- algorithmes de cryptographique qui se basent sur la factorisation. En revanche en -->
<!-- 1994, Peter Schor a trouvé un algorithme quantique qui se base sur l'assemblage -->
<!-- de portes quantiques d'une complexité meilleure (exponentiellement meilleure) -->
<!-- que la complexité de l'algorithme classique de factorisation. -->

<!-- ### Réalisation physique des qubits -->

<!-- Un ordinateur classique fonctionne selon le courant électrique, pour réaliser un -->
<!-- qubit il faut un système physique suffisamment petit pour obéir aux lois de la -->
<!-- mécanique quantique. -->

<!-- Les objets susceptibles permettant de réaliser physiquement un qubits peuvent -->
<!-- être, le spin de l'électron ou d'un noyau atomique, la polarisation d'un photon, -->
<!-- circuit superconducteurs.  -->

<!-- Cependant il y a quelques complications techniques :  -->
<!-- 1. Il faut avoir suffisamment de qubits pour avoir un registre quantique assez -->
<!--    grand  -->
<!-- 2. Matériaux isolés du monde extérieur pour qu'ils soient stables et pour qu'ils -->
<!--    puissent rester dans un état superposé le plus longtemps possible pour -->
<!--    effectuer des calculs -->

<!-- ### La Suprématie quantique -->

<!-- Ce terme désigne un problème que l'on ne pourrait résoudre qu'avec un ordinateur -->
<!-- quantique et qu'un ordinateur classique ne peux pas résoudre. -->

<!-- ## <i class="fas fa-vial"></i> 3 motivation pour l'étude de l'informatique quantique -->

<!-- 1. La miniaturisation actuelle a déjà atteint des niveaux où les effets -->
<!--    quantiques apparaissent -->
<!-- 2. Les effets quantiques permettent d'accélérer certains calculs et permettent -->
<!--    certains calculs inaccessibles aux ordinateurs classiques -->
<!-- 3. Le but de l'informatique théorique est d'étudier les pouvoirs et les limites -->
<!--    des dispositifs de calculs les plus puissant que l'on peut avoir -->


<!-- ## <i class="fas fa-vial"></i> Un peu d'histoire -->

<!-- - Début des années 80 : suggestions au sujet de l'existence future d'un -->
<!--   ordinateur quantique par Richard Fegman -->
<!-- - 1985 : David Deutsh a défini la machine de Turing quantique universelle  -->
<!-- - développements des premiers algorithmes quantiques par Deutsh et Jozsa -->
<!-- - 1994 : algorithme quantique de factorisation de Peter Schor -->
<!-- - suprématie quantique  -->

<!-- ## <i class="fas fa-vial"></i> Le monde quantique -->


