---
title: "Déterminants"
description: "Déterminants : définition par multilinéarité et alternance, propriétés, déterminant d'un produit et de l'inverse, déterminant d'un endomorphisme et d'une famille, interprétation géométrique, critère d'inversibilité, développement selon une ligne ou une colonne, comatrice et matrices triangulaires."
sidebar_position: 6
---

**Proposition et définition.** Il existe une fonction $\det : \mathcal{M}_n(\mathbb{K}) \to \mathbb{K}$ (appelée déterminant), unique, telle que :

1. $\det$ est linéaire par rapport à chaque colonne : c'est-à-dire que si $c_1, \dots, c_n$ désignent les colonnes de la matrice $A \in \mathcal{M}_n(\mathbb{K})$, alors $\forall j \in \{1, \dots, n\}$, l'application $c_j \to \det(c_1, \dots, c_{j-1}, c_j, c_{j+1}, \dots, c_n)$ est linéaire.
2. Si on échange deux colonnes de $A$, $\det(A)$ change de signe (on dit que $\det$ est antisymétrique ou alternée) :

   $$
   \det(C_1, \dots, C_j, \dots, C_k, \dots, C_n) = -\det(C_1, \dots, C_k, \dots, C_j, \dots, C_n)
   $$

3. $\det(I_n) = 1$ (où $I_n$ est la matrice unité).

$\det(A)$ est appelé déterminant de $A$. La fonction $\det$ vérifie en outre la propriété $\det({}^tA) = \det(A)$ pour toute $A \in \mathcal{M}_n(\mathbb{K})$, où ${}^tA$ est la transposée de $A$. D'où il découle que $\det(A)$ est aussi une fonction linéaire de chaque ligne de $A$ et une fonction antisymétrique des lignes de $A$ (puisque les lignes de $A$ sont les colonnes de ${}^tA$).

**Proposition.** Pour toute $A \in \mathcal{M}_n(\mathbb{K})$ et tout $\lambda \in \mathbb{K}$ : $\det(\lambda A) = \lambda^n\det(A)$.

***Démonstration.*** Comme le déterminant est linéaire par rapport à chaque colonne, on a, pour tous $\lambda_1, \dots, \lambda_n \in \mathbb{K}$, $\det(\lambda_1 C_1, \dots, \lambda_n C_n) = \lambda_1 \dots \lambda_n\det(C_1, \dots, C_n)$. Prenant $\lambda_1, \dots, \lambda_n$ égaux à $\lambda$, on obtient $\det(\lambda A) = \lambda^n\det(A)$.

**Proposition.**

1. Si deux colonnes de $A$ sont égales, alors $\det(A) = 0$.
2. Si on ajoute à une colonne une combinaison linéaire des autres, le déterminant ne change pas.
3. Les deux propriétés ci-dessus sont vraies aussi pour les lignes.

***Démonstration.***

1. Si $C_j = C_k$ ($j < k$), on a $\det(C_1, \dots, C_j, \dots, C_k, \dots, C_n) = -\det(C_1, \dots, C_k, \dots, C_j, \dots, C_n)$ (antisymétrie) et $\det(C_1, \dots, C_j, \dots, C_k, \dots, C_n) = \det(C_1, \dots, C_k, \dots, C_j, \dots, C_n)$ (puisque $C_j = C_k$), donc $\det(C_1, \dots, C_j, \dots, C_k, \dots, C_n) = 0$.
2. Par linéarité :

   $$
   \det\left(C_1, \dots, C_j + \sum_{k \neq j} \lambda_k C_k, \dots, C_n\right) = \det(C_1, \dots, C_j, \dots, C_n) + \sum_{k \neq j} \lambda_k\det(C_1, \dots, C_k, \dots, C_n)
   $$

   mais $\det(C_1, \dots, C_k, \dots, C_n)$ (avec $C_k$ à la place $j$) est nul pour $k \neq j$, vu la propriété précédente, puisque la même colonne $C_k$ se trouve aussi à la place $k$.
3. Vu que $\det(A) = \det({}^tA)$, les propriétés ci-dessus sont vraies pour les lignes de $A$ (qui sont les colonnes de ${}^tA$).

**Proposition.**

$$
\text{Si } \det(A) \neq 0, \text{ alors } A \text{ est inversible}
$$

***Démonstration.*** Si $A$ n'est pas inversible, c'est que ses colonnes ne sont pas linéairement indépendantes (cf. la caractérisation des isomorphismes, appliquée à l'endomorphisme de $\mathbb{K}^n$ dont la matrice dans la base canonique est $A$) : disons $C_j = \displaystyle\sum_{k \neq j} \lambda_k C_k$ pour un certain $j$. Vu la proposition précédente,

$$
\det(A) = \det\left(C_1, \dots, \sum_{k \neq j} \lambda_k C_k, \dots, C_n\right) = \det(C_1, \dots, 0, \dots, C_n)
$$

Or $\det(C_1, \dots, 0, \dots, C_n) = 0$ (car c'est une fonction linéaire de la colonne $j$, ici nulle), donc $\det(A) = 0$. Par contraposition, si $\det(A) \neq 0$, alors $A$ est inversible.

**Remarque 1.** Si $\det(A) \neq 0$, c'est qu'aucune des colonnes n'est combinaison linéaire des autres (puisqu'on vient de voir que si une colonne est combinaison linéaire des autres, le déterminant est le même que si on remplace cette colonne par $\begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$, et par linéarité le déterminant est nul), et donc les colonnes de $A$ sont indépendantes. Mais ces colonnes sont les colonnes de coordonnées de $f(e_1), \dots, f(e_n)$, où $(e_1, \dots, e_n)$ est la base canonique de $\mathbb{K}^n$ et $f$ l'endomorphisme de $\mathbb{K}^n$ dont $A$ est la matrice (relativement à la base canonique). Donc dire que les colonnes de $A$ sont linéairement indépendantes, c'est dire que $(f(e_1), \dots, f(e_n))$ est libre, c'est-à-dire que c'est une base de $\mathbb{K}^n$, donc que $f$ est un automorphisme, c'est-à-dire que $A$ est inversible.

**Lemme.** Soient $A \in \mathcal{M}_n(\mathbb{K})$ telle que $\det(A) \neq 0$ et $X_1, \dots, X_n \in \mathcal{M}_{n,1}(\mathbb{K})$ des colonnes quelconques. Alors :

$$
\frac{\det(AX_1, \dots, AX_n)}{\det(A)} = \det(X_1, \dots, X_n) \qquad (1)
$$

***Démonstration.*** Il est clair que le premier membre de (1) est une fonction linéaire de chaque $X_j$, qu'il est antisymétrique comme fonction de $(X_1, \dots, X_n)$, et qu'il vaut $1$ quand $(X_1, \dots, X_n) = I_n$ (car alors $(AX_1, \dots, AX_n) = AI_n = A$) : ce sont les propriétés caractéristiques du second membre.

**Théorème.** Soient $A, B \in \mathcal{M}_n(\mathbb{K})$. Alors :

$$
\det(AB) = \det(A)\det(B)
$$

***Démonstration.*** Prouvons-le d'abord pour le cas où $\det(A) \neq 0$. On prend $(X_1, \dots, X_n) = B$ dans (1) (donc $(AX_1, \dots, AX_n) = AB$) : alors $\dfrac{\det(AB)}{\det(A)} = \det(B)$, d'où $\det(AB) = \det(A)\det(B)$.

Si $\det(A) = 0$, considérons $\det(A + xI_n)$ : vu que $\det$ est linéaire par rapport à chaque colonne et que la colonne $j$ de $A + xI_n$ contient le terme $a_{jj} + x$ à la $j$-ième place, $\det(A + xI_n)$ est une fonction polynomiale de $x$ ; elle a donc un nombre fini de racines (dont $0$, par hypothèse). Soit $\epsilon > 0$ tel que $0 < x < \epsilon \Rightarrow \det(A + xI_n) \neq 0$. Pour $0 < x < \epsilon$, on a $\det((A + xI_n)B) = \det(A + xI_n)\det(B)$, d'où, par continuité, en faisant $x \to 0$ : $\det(AB) = \det(A)\det(B)$.

**Corollaire.** Si $A$ est inversible, alors $\det(A) \neq 0$ et $\det(A^{-1}) = \dfrac{1}{\det(A)}$.

***Démonstration.*** $AA^{-1} = I_n \Rightarrow \det(AA^{-1}) = \det(I_n) = 1 \Rightarrow \det(A)\det(A^{-1}) = 1$.

**Corollaire.** Soient $E$ un $\mathbb{K}$-ev de dimension $n$, $\phi : E \to E$ un endomorphisme, $A$ la matrice de $\phi$ dans une base $B$, $A'$ sa matrice dans une base $B'$ : alors $\det(A') = \det(A)$. Autrement dit, le déterminant de la matrice de $\phi$ est indépendant de la base et on peut donc le noter simplement $\det(\phi)$. Et pour tous endomorphismes $\phi, \psi$ de $E$, $\det(\phi \circ \psi) = \det(\psi)\det(\phi)$.

***Démonstration.*** On a $A' = P^{-1}AP$ (où $P$ est la matrice de passage de $B$ à $B'$), donc

$$
\det(A') = \det(P^{-1})\det(A)\det(P) = \frac{1}{\det(P)}\det(A)\det(P) = \det(A)
$$

La formule $\det(\psi \circ \phi) = \det(\psi)\det(\phi)$ n'est qu'une réécriture de $\det(BA) = \det(B)\det(A)$, où $A$ et $B$ sont les matrices de $\phi$ et $\psi$ dans une base quelconque.

**Définition.** Soient $E$ un $\mathbb{K}$-ev de dimension $n$, $B = (e_1, \dots, e_n)$ une base de $E$, $x_1, \dots, x_n$ des vecteurs de $E$, $X_j$ ($1 \leq j \leq n$) la colonne des coordonnées de $x_j$ dans la base $B$ (écrites de haut en bas). On définit le déterminant de la famille $(x_1, \dots, x_n)$ dans la base $B$ comme étant le déterminant de la matrice dont les colonnes sont $X_1, \dots, X_n$ : $\det_B(x_1, \dots, x_n) = \det(X_1, \dots, X_n)$.

**Remarque (interprétation géométrique).**

1. Soient $u, v$ deux vecteurs du plan $\mathbb{R}^2$, rapporté à sa base canonique $B$ : l'aire du parallélogramme construit sur les côtés $u, v$ est $|\det(u, v)|$.
2. Soient $u, v, w$ trois vecteurs de l'espace $\mathbb{R}^3$, rapporté à sa base canonique $B$ : le volume du parallélépipède construit sur les côtés $u, v, w$ est $|\det(u, v, w)|$.

**Corollaire.** Dans la situation de la définition ci-dessus, si $B'$ est une autre base de $E$ et $P$ la matrice de passage de $B$ à $B'$, on a :

$$
\det_B(x_1, \dots, x_n) = \det(P)\det_{B'}(x_1, \dots, x_n)
$$

**Preuve.** Soit $X'_j$ la colonne des coordonnées de $x_j$ dans la base $B'$ : on sait que $X_j = PX'_j$, donc $(X_1, \dots, X_n) = P(X'_1, \dots, X'_n)$, d'où $\det(X_1, \dots, X_n) = \det(P)\det(X'_1, \dots, X'_n)$.

**Proposition (critère d'inversibilité et caractérisation des bases par les déterminants).**

1. Une matrice $A \in \mathcal{M}_n(\mathbb{K})$ est inversible si et seulement si $\det(A) \neq 0$.
2. Un endomorphisme $\phi$ d'un $\mathbb{K}$-ev de dimension $n$ est un isomorphisme si et seulement si $\det(\phi) \neq 0$.
3. Soient $n$ vecteurs $x_1, \dots, x_n$ dans un $\mathbb{K}$-ev $E$ de dimension $n$ et $B$ une base quelconque de $E$. Alors $(x_1, \dots, x_n)$ est une base si et seulement si $\det_B(x_1, \dots, x_n) \neq 0$.

***Démonstration.***

1. L'implication « $\det(A) \neq 0 \Rightarrow A$ est inversible » a fait l'objet d'une proposition, et le premier corollaire donne la réciproque.
2. $\det(\phi) = \det(A)$, où $A$ est la matrice de $\phi$ dans une base quelconque, et $\phi$ est bijective si et seulement si $A$ est inversible : ce qui nous ramène à l'assertion précédente.
3. $\det_B(x_1, \dots, x_n) \neq 0$ signifie $\det(X_1, \dots, X_n) \neq 0$ (où $X_j$ est la colonne des coordonnées de $x_j$ dans la base $B$) : cela équivaut à dire que la matrice $(X_1, \dots, X_n)$ est inversible et donc que $(x_1, \dots, x_n)$ est une base.

**Théorème.** Soit $A = (a_{ij})_{1 \leq i, j \leq n} \in \mathcal{M}_n(\mathbb{K})$. Pour tous $i, j \in \{1, \dots, n\}$, soit $A_{ij} \in \mathcal{M}_{n-1}(\mathbb{K})$ la matrice obtenue en supprimant dans $A$ la ligne $i$ et la colonne $j$. On a :

$$
\det(A) = \sum_{j=1}^{n} a_{ij}(-1)^{i+j}\det(A_{ij}) = \sum_{i=1}^{n} a_{ij}(-1)^{i+j}\det(A_{ij})
$$

**Exemples.**

1. $A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$. Alors $A_{11} = (d) = dI_1$ et $A_{12} = (c) = cI_1$, donc $\det(A_{11}) = d$ et $\det(A_{12}) = c$. Le développement selon la première ligne donne $\begin{vmatrix} a & b \\ c & d \end{vmatrix} = ad - bc$.
2. $\begin{vmatrix} a & b & c \\ d & e & f \\ g & h & i \end{vmatrix} = aei + dhc + gbf - gec - dbi - ahf$

**Définition.** Pour $A \in \mathcal{M}_n(\mathbb{K})$, on appelle comatrice de $A$ la matrice $Com(A) \in \mathcal{M}_n(\mathbb{K})$ dont l'élément à la ligne $i$ et à la colonne $j$ est $(-1)^{i+j}\det(A_{ij})$.

**Corollaire.** Pour toute $A \in \mathcal{M}_n(\mathbb{K})$,

$$
A\,{}^tCom(A) = \det(A)I_n
$$

En particulier, on retrouve le fait que si $\det(A) \neq 0$, alors $A$ est inversible ; et en plus, on a cette formule d'inversion :

$$
A^{-1} = \frac{1}{\det(A)}{}^tCom(A)
$$

***Démonstration.*** L'élément de la ligne $i$ et de la colonne $j$ de $A\,{}^tCom(A)$ est $\displaystyle\sum_{k=1}^{n} a_{ik}(-1)^{j+k}\det(A_{jk})$. Si $j = i$, c'est $\det(A)$ (le développement selon la ligne $i$). Si $j \neq i$, c'est le déterminant de la matrice déduite de $A$ en y remplaçant la ligne $j$ par la ligne $i$ : mais dans la matrice ainsi obtenue, il y a donc deux fois la ligne $i$ et ce déterminant est nul.

**Définition.** On dit qu'une matrice $A = (a_{ij})_{1 \leq i, j \leq n} \in \mathcal{M}_n(\mathbb{K})$ est triangulaire inférieure si $j > i \Rightarrow a_{ij} = 0$ (i.e. s'il n'y a que des $0$ au-dessus de la diagonale) : c'est donc une matrice de la forme

$$
\begin{pmatrix}
a_{11} & 0 & 0 & \dots & 0 \\
a_{21} & a_{22} & 0 & \dots & 0 \\
a_{31} & a_{32} & a_{33} & \dots & 0 \\
\vdots & \vdots & \vdots & \dots & \vdots \\
a_{n1} & a_{n2} & a_{n3} & \dots & a_{nn}
\end{pmatrix}
$$

On dit qu'une matrice $A = (a_{ij})_{1 \leq i, j \leq n} \in \mathcal{M}_n(\mathbb{K})$ est triangulaire supérieure si $j < i \Rightarrow a_{ij} = 0$ (i.e. s'il n'y a que des $0$ au-dessous de la diagonale) : c'est donc une matrice de la forme

$$
\begin{pmatrix}
a_{11} & a_{12} & a_{13} & \dots & a_{1n} \\
0 & a_{22} & a_{23} & \dots & a_{2n} \\
\vdots & \vdots & \vdots & \dots & \vdots \\
0 & 0 & 0 & \dots & a_{nn}
\end{pmatrix}
$$

On dit qu'une matrice $A = (a_{ij})_{1 \leq i, j \leq n} \in \mathcal{M}_n(\mathbb{K})$ est diagonale si elle est triangulaire inférieure et supérieure ; c'est donc une matrice de la forme :

$$
\begin{pmatrix}
a_{11} & 0 & 0 & \dots & 0 \\
0 & a_{22} & 0 & \dots & 0 \\
0 & 0 & a_{33} & \dots & 0 \\
\vdots & \vdots & \vdots & \dots & \vdots \\
0 & 0 & 0 & \dots & a_{nn}
\end{pmatrix}
$$

**Corollaire.** Le déterminant d'une matrice diagonale, ou plus généralement triangulaire (inférieure ou supérieure), est le produit des éléments diagonaux : $\det(A) = \displaystyle\prod_{i=1}^{n} a_{ii}$.

***Démonstration.*** Il suffit de le montrer pour une matrice triangulaire inférieure (le cas d'une triangulaire supérieure s'en déduit immédiatement car c'est la transposée d'une triangulaire inférieure : elle a donc même déterminant et mêmes éléments diagonaux). On raisonne par récurrence : si $n = 1$, c'est trivial ($\det(a_{11}) = a_{11}$) ; et si c'est vrai pour les matrices triangulaires inférieures de $\mathcal{M}_{n-1}(\mathbb{K})$, alors c'est vrai aussi pour celles de $\mathcal{M}_n(\mathbb{K})$, car en développant selon la première ligne on a

$$
\begin{vmatrix}
a_{11} & 0 & 0 & \dots & 0 \\
a_{21} & a_{22} & 0 & \dots & 0 \\
a_{31} & a_{32} & a_{33} & \dots & 0 \\
\vdots & \vdots & \vdots & \dots & \vdots \\
a_{n1} & a_{n2} & a_{n3} & \dots & a_{nn}
\end{vmatrix}
= a_{11}
\begin{vmatrix}
a_{22} & 0 & \dots & 0 \\
a_{32} & a_{33} & \dots & 0 \\
\vdots & \vdots & \dots & \vdots \\
a_{n2} & a_{n3} & \dots & a_{nn}
\end{vmatrix}
$$
