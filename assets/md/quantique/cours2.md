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

## <i class="fas fa-vial"></i> Introduction des idées de base de la mécanique quantique

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

### Application adjointe 

Soit une application linéaire $$L: \mathcal{H} \rightarrow \mathcal{H}$$.
L'application adjointe $$L^\ast$$ est défini par $$(u | L v) = (L^\ast u | v),
\forall u,v \in \mathcal{H}$$ Si $$M$$ est la matrice de $$L$$ dans une base
orthonormée, alors la matrice de $$L^\ast$$ est $$M^+$$

### Application hermitienne
