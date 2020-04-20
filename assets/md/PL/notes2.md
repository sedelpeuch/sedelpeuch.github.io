---
layout: page
hide: true
title: <i class="fas fa-search fa-2x"></i> PL - Cours 2 
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

On dispose d'un formalisme pour modéliser des problèmes réels : la programmation
linéaire. On a appris à résoudre le problème à la main en deux dimensions.
Intuition pour résoudre en dimension supérieure : se déplacer de sommet en
sommet du polyèdre convexe formé par les contraintes linéaires. 


## <i class="fas fa-search"></i> Résumé : Forme standard, points extrèmes et bases

Les variables supplémentaies $$s_i$$ sont appelées **variables d'écart**. Chaque
variable d'écart est associée à une contrainte. 

$$\begin{align*} && \text{forme standard} \\
\max z = \sum \limits_{i=1}^n c_i x_i && \max z = \sum
\limits_{i=1}^n c_i x_i  \\
\sum \limits_{i=1}^n a_{ij} x_i \leq b_j && \sum \limits_{i=1}^n a_{ij} x_i +
s_j = b_j \\
x_i \geq 0 && x_i \geq 0 \\
&& s_j \geq 0\end{align*}$$

On dispose d'un problème linéaire à $$n+m$$ variables et $$m$$ contraintes. Si
on annule $$n$$ variables, on obtient un système de $$m$$ équations à $$m$$
inconnues. Si la matrice associée est de rang $$m$$ (base), le système admet une
solution unique. Pour résoudre le problème obtenu : pivot de Gauss. 

Si on a une base réalisable, on a un point extrême c'est à dire une solution
dominante. Pour calculer les valeurs des variables pour ces points on utilise le
pivotage. Il reste à voir comment trouver une première base réalisable et
comment passer d'une base réalisable à une autre.

## <i class="fas fa-search"></i> Algorithme du simplex
### Base initiale
Calculons une solution initiale simple

![plexemple] $$\begin{align*} \max z &= 5x+y \\ x+y+s_1 &=10 \\ x-y+s_2 &=1 \\ x+s_3 &=3 \end{align*}$$

[plexemple]:/assets/images/pl/plexemple.png 
{:class="image about right"}

Choix de la base initiale : annuler les variables de décisions, ne garder que
les variables d'écart

$$\begin{align*} \text{Système obtenu} && \text{Solution} \\ +s_1 = 10 && s_1 =
10 , s_2 = 1, s_3 = 3 \\ +s_2 =1 && x=0 , y=0 \\ +s_3 =3 && z=0 + 0 = 0 \end{align*} $$

### Exemple pas à pas 
Réécrivons notre problème en fonction de notre base $$(s_1,s_2,s_3)$$

$$\begin{align*} z &= 0 +5x + y \\ s_1 &= 10 -x -y \\ s_2 &=1 -x +y \\ s_3 &=3-x
\end{align*}$$

On parle de forme canonique, $$z$$ et les éléments de la base
sont chacun exprimés en fonction d'une constante et des variables hors de la
base. En affectant la valeur 0 aux variables hors base, le système se résout
directement. 

Comment améliorer la solution ? En augmentant $$x$$ ou $$y$$ (on choisit $$x$$)
mais jusqu'où augmenter $$x$$ ? On sait que $$s_1, s_2, s_3 \geq 0$$. En posant
$$x=1$$, on annule $$s_2$$ qui sort de la base. 

$$\begin{align*} s_1 &= 10-x \Rightarrow x \leq 10 \\ s_2 &= 1-x \Rightarrow x
\leq 1 \\ s_3 &= 3-x \Rightarrow x \leq 3 \end{align*}$$

On remplace $$s_2$$ par $$x$$ dans la base

$$\begin{align*} z - 5x &= 0+y \\ +s_1 + x &= 10 -y \\ x &=1-s_2+y \\ +x+s_3 &=3
\end{align*}$$

Puis on remet le PL sous forme cannonique 

$$\begin{align*} z &= 5 - 5 s_2 + 6 y \\ s_1 &= 9 + s_2 - 2y \\ x &= 1-s_2+y \\
s_3 &=2+s_2-y\end{align*}$$

Peut on améliorer la solution ? Oui car $$y$$ a un coefficient positif. Jusqu'où
augmenter $$y$$ ? On sait que $$s_1, x, s_3 \geq 0$$. En posant $$y=2$$, on
annule $$s_3$$ qui sort de la base

$$\begin{align*} s_1 &= 9 - 2y \Rightarrow y \leq 9/2 \\ x &= 1+y \Rightarrow y
\geq -1 \\ s_3 = 2-y \Rightarrow y \leq 2\end{align*}$$

On remplace $$s_3$$ par $$y$$ en base et on réecrit le PL sous forme cannonique 

$$\begin{align*} z&=17+s_2 - 6 s_3 \\ s_1 &=5-s_2+2s_3 \\ x&=3-s_3 \\ y
&=2+s_2-s_3 \end{align*}$$

Peut on améliorer la solution ? Oui car $$s_2$$ a un coefficient positif.
Jusqu'où augmenter $$s_2$$ ? On sait que $$s_1,x,t \geq 0$$. En posant $$s_2 =
5$$ on annule $$s_1$$ qui sort de la base.

$$\begin{align*} s_1 &= 5-s_2 \Rightarrow s_2 \leq 5 \\ x&=3 \Rightarrow s_2
\leq + \infty \\ y &=2+s_2 \Rightarrow s_2 \leq + \infty \end{align*}$$

On remplace $$s_1$$ par $$s_2$$ en base et on écrit le PL sous forme canonique. 

$$\begin{align*} z&=22-s_1-4s_3 \\ s_2&=5-s_1+2s_3 \\ x&=3-s_3 \\ y&=7-s_1+s_3 \end{align*}$$

Peut-on améliorer la solution ? Non car tous les coefficients sont négatifs dans
l'objectif. La solution obtenue est donc $$x=3 , y=7 , (s_2=5) , s_1=0, s_3=0$$
et donc $$z=22$$.

### Description formelle de la méthode
Problème linéaire avec les variables d'écart et la variable objectif 

$$\begin{align*} z&=\sum \limits_{j=1}^n c_j x_j \\ x_{n+i}&=b_i-\sum
\limits_{j=1}^n a_{ij} x_j \end{align*}$$

### Dictionnaires
A chaque itération, la solution courant est associée à un système d'équations
qui la définit 

$$\begin{align*} z &= \overline{z} + \sum \limits_{j \in \mathcal{N}}
\overline{c}_j x_j \\ x_i &= \overline{b}_i - \sum \limits_{j \in \mathcal{N}}
\overline{a}_{ij} x_j \end{align*}$$

Ce système s'appelle un dictionnaire. Les variables de gauche sont appelées
variables de base et notées $$x_\mathcal{B} \in \mathbb{R}_+^m$$. L'ensemble des
variables en base est appelé base. $$\mathcal{B}$$ représente les indices des
variables en base. Les variables qui ne sont pas dans la base, sont appelées
variables hors base et notées $$x_\mathcal{N} \in \mathbb{R}_+^n$$.
$$\mathcal{N}$$ représente l'ensemble des indices des variables hors-base. 
+ $$\mathcal{B}$$ et $$\mathcal{N}$$ forment une partition de l'ensemble des
  indices
+ Chaque dictionnaire définit une solution de base que l'on obtient en posant
  $$x_\mathcal{N}=0$$
+ Un dictionnaire est réalisable si la solution de base associée est telle que
  $$x_\mathcal{B} \geq 0$$

### Dictionnaire initial
+ La base initiale est formée des variables d'écart $$x_{n+1},...,x_{n+m}$$,
  c'est à dire $$\mathcal{B}=\{n+1,...,n+m\}$$
+ Les variables hors-base sont les variables initiales du problème,
  $$\mathcal{N}=\{1,...,n\}$$
+ Attention la base initiale peut ne pas être réalisable. On verra plus tard ce
  qu'il faut faire dans ce cas.

### Itération (pivotage)
+ A chaque itération de l'algorithme du simplex, une variable hors-base va
  entrer dans la base, tandis qu'une variable en base sortira de la base, c'est
  le **pivotage**
+ Cette opération revient à se déplacer d'un point extrême à un point extrême
  voisin le long d'une arête du polyèdre

### Choix de la variable entrante 
Les coefficients $$\overline{c}_j,j\in \mathcal{N}$$ sont appelés les coûts
réduits. Ils représentent l'impact de l'augmentation d'une variable sur
l'objectif. La solution de base est optimale si et seulement si tous les coûts
réduits sont négatifs ou nul : $$\overline{c}_j \leq 0$$. 

On choisit une variable $$x_k$$ de $$\mathcal{N}$$ dont le coût réduit
$$\overline{c}_k$$ est positif. Il peut y avoir plusieurs variables candidates
pour entrer en base. La règle de pivotage permet de choisir laquelle va entrer
en base. 

### Choix de la variable sortante
Supposons que la variable $$x_k$$ est choisie pour entrer en base. Le
vecteur formé par les coefficients $$\overline{a}_{i,k},i \in \mathcal{B}$$
indique l'impat sur les variables en base de l'augmentation de la variable
$$x_k$$.
+ Si $$\overline{a}_{i,k} \leq 0$$, augmenter $$x_k$$ entraine une augmentation
  de $$x_i$$
+ Si $$\overline{a}_{i,k} \geq 0$$, augmenter $$x_k$$ entraine une diminution de
  $$x_i$$, il faut tout de même faire attention à la positivité de $$x_i$$
  
  $$x_i = \overline{b}_i - \overline{a}_{i,k} x_k \geq 0 \Rightarrow x_k \leq \dfrac{\overline{b_i}}{\overline{a}_{i,k}}$$

La variable qui sort de la base est la première variable à s'annuler lorsque
$$x_k$$ (la variable entrante) augmente

$$ \begin{equation*} \text{Choisir} \; s \in \mathcal{B} \; \text{tel que} \; s
= argmin_{i \in \mathcal{B}} \{\dfrac{\overline{b}_i}{\overline{a}_{i,k}}:
\overline{a}_{i,k} > 0\} \end{equation*}$$

Il peut y avoir plusieurs variables candidates pour sortir de la base. Si c'est
le cas, la base est suivante sera dégénérée.

Le problème peut être non borné, si $$\overline{a}_{i,k} \leq 0$$ pour tout $$i
\in \mathcal{B}$$, il n'y a pas de candidat pour sortir de la base et le
problème est non borné. 

### Pivotage
Mise à jour du système
+ On entre la variable $$x_k$$ en base et on sort $$x_s$$
+ On élimine $$x_k$$ de l'epression de $$z$$
+ On élimine $$x_k$$ de l'expression des $$x_i$$ $$(i \in \mathcal{B}, i \neq
  k)$$
  
Il reste à reconstruire le système d'équation ci-dessus pour la nouvelle base.
C'est le pivotage

$$\begin{align*} z&=\overline{z}+\sum \limits_{j \in \mathcal{N}\backslash\{k\}}
\overline{c}_k x_k + \overline{c}_k x_k\\
x_i&=\overline{b}_i-\sum \limits_{j \in \mathcal{N}\backslash\{k\}}
\overline{a}_{i,j} x_j - \overline{a}_{i,k}x_k \\
x_s&=\overline{b}_s - \sum \limits_{j \in \mathcal{N}\backslash\{k\}}
\overline{a}_{s,j}x_j - \overline{a}_{s,k}x_k \end{align*}$$

On entre la variable $$x_k$$ en base et on sort $$x_s$$. On ramène le
coefficient de $$x_k$$ à 1. On élimine $$x_k$$ de l'expression de $$z$$. On
élimine $$x_k$$ de l'expression des $$x_i$$. 

### Remarques
+ On remarque le type de la variable n'est pas pris en compte lors du pivotage
+ Tenter de faire sortir les variables d'écart pour faire entrer les variables
  initiales n'est pas une bonne stratégie
+ Seuls les coûts réduits doivent être pris en compte
+ On s'arrête lorsque tous les coûts réduits sont négatifs ou nuls

## <i class="fas fa-search"></i> Phase 1
Cette phase permet de trouver une solution de base réalisable initiale lorsque
la base donnée par les variables d'écart n'est pas réalisable.
### D'où vient le problème ? 
$$\sum \limits_j a_{ij} x_j \leq b_i \; \text{avec} \; b_i < 0$$

Après l'ajout de la variable d'écart et écriture sous forme de dictionnaire, on obtient $$x_{n+i} = b_i - \sum_j a_{ij} x_j$$. Comme $$b_i<0$$ la solution de base n'est pas réalisable. 

### Calculer une solution initiale
1. Pour chaque contrainte $$i$$ tel que $$b_i<0$$ on ajoute une variable artificielle $$x'_{n+i}$$ avec une coefficient de -1 en plus de la variable d'écart $$\sum_j a_{ij} x_j + x_{n+i} - x'_{n+i} = b_i$$
2. On crée un objectif artificiel $$\max \sum \limits_{i:b_i<0} - x'_{n+i}$$ 
3. Une base initiale pour le problème artificiel est obtenue avec les variables artificielles des contraintes avec $$b_i<0$$ et les variables d'écarts des contraintes avec $$b_i\geq 0$$
4. On résout le problème avec l'algorithme du simplex à partir de cette solution

### Résultat de la phase 1
A la fin de cette résolution 
* S'il existe au moins un $$i$$ tel que $$x'_{n+i} > 0$$, alors les variables artificielles sont nécessaire pour avoir une solution réalisable. Alors, le problème initial est irréalisable 
* Si $$x'_{n+1}=0$$ pour tout $$i$$ tel que $$b_i<0$$, toutes les variables artificielles sont hors-base. On a une solution de base réalisable pour le problème initial donnée par la base optimale de la Phase I
1. Supprimer les variables artificielles 
2. Reprendre l'objectif initial
3. Utiliser l'algorithme du simplex avec la solution initiale trouvée 
## <i class="fas fa-search"></i> Dégénérescense
Quand plusieurs variables sont candidates pour sortir de la base, la nouvelle solution de base aura une (ou plusieurs) variables de base prenant la valeur 0. On dit alors que la solution de base est dégénérée

### Solution optimales multiples
Il peut arriver que dans le dictionnaire optimal, des variables hors-bases possèdent des coûts réduits nuls $$\overline{c}_i = 0, \; \text{pour} \; i \in \mathcal{N}$$ En effectuant une itération supplémentaire du simplex et en faisant entre en base une variable $$x_i$$ telle que $$\overline{c}_i=0$$, on obtient une nouvelle solution optimale de base (avec le même objectif). Si $$x_1^\ast$$ et $$x_2^\ast$$ sont deux solutions optimales, alors toutes solutions obtenues par une combinaison convexe de $$x_1^\ast$$ et $$x_2^\ast$$ est également une solution optimale $$x=\alpha x_1^\ast + (1-\alpha)x_2^\ast$$ 

### Terminaison 
En cas de dégénérescence, l'algorithme peut revenir sur une solution de base déjà visitée (cycle). En pratique néanmoins, cela se passe rarement. Il existe des règles de pivotage limitant les risques de cycle.
* règle de plus petit indice 
* perturbation des données : ajouter aux membres de droite des contraintes des $$\varepsilon$$ suffisamment petits.
