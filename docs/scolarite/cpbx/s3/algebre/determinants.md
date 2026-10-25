---
title: "Déterminants"
description: "Déterminants : formes n-linéaires alternées, déterminant d'une famille, d'un endomorphisme et d'une matrice, opérations sur les lignes et colonnes, développement par rapport à une ligne ou une colonne, calculs par blocs, formules de Cramer et déterminant de Vandermonde."
sidebar_position: 2
---

## Déterminant d'une famille de vecteurs

**Définition 1.** Une fonction $n$-linéaire est une fonction $f : E^n \to \mathbb{K}$, qui est de plus linéaire par rapport à chaque variable. Cela veut dire que $\forall (x_i)_{i=1,\dots,n} \in E^n$, $\begin{cases} \text{si on fixe } j \text{, alors } x_j \to f(x_1, \dots, x_j, \dots, x_n) \text{ est linéaire} \\ \text{si on fixe } (x_1, \dots, x_{j-1}, x_{j+1}, \dots, x_n),\ E \to \mathbb{K} \end{cases}$

**Exemple.** La fonction $\begin{cases} \mathbb{R}^n \times \mathbb{R}^n \to \mathbb{R} \\ (x, y) \mapsto x.y \end{cases}$ est 2-linéaire (on dit "bilinéaire"). En effet, on fixe $x \in \mathbb{R}^n$, alors $f(x, y_1 + \lambda y_2) = x.(y_1 + \lambda y_2) = x y_1 + \lambda x y_2 = f(x, y_1) + \lambda f(x, y_2)$. De même, on fixe $y \in \mathbb{R}^n$, alors $f(x_1 + \lambda x_2, y) = y(x_1 + \lambda x_2) = y x_1 + \lambda y x_2 = f(x_1, y) + \lambda f(x_2, y)$.

**Définition 1 bis.** Une forme $n$-linéaire est alternée si : $(i \neq j \text{ et } x_i = x_j) \Rightarrow f(x_1, \dots, x_i, \dots, x_j, \dots, x_n) = 0$ (c'est-à-dire : si on répète 2 fois le même vecteur, $f$ vaut 0). On note $\mathcal{A}_n(E)$ les formes $n$-linéaires alternées sur $E$.

**Proposition 2.** Si $f \in \mathcal{A}_n(E)$, et si $(x_1, \dots, x_n)$ est liée, alors $f(x_1, \dots, x_n) = 0$.

**Démonstration.** On suppose que $(x_1, \dots, x_n)$ est liée. Donc $\exists (\alpha_i)_{i=1,\dots,n}$ des scalaires tels que $\displaystyle\sum_{i=1}^{n} \alpha_i x_i = 0$, et $\exists i_0$ tel que $\alpha_{i_0} \neq 0$ (car les scalaires sont non tous nuls).
Donc $x_{i_0} = -\dfrac{1}{\alpha_{i_0}} \displaystyle\sum_{i \neq i_0} \alpha_i x_i$. Donc $f(x_1, \dots, x_n) = f\Big(x_1, \dots, -\dfrac{1}{\alpha_{i_0}} \displaystyle\sum_{i \neq i_0} \alpha_i x_i, \dots, x_n\Big) = -\displaystyle\sum_{i \neq i_0} \frac{\alpha_i}{\alpha_{i_0}} f(x_1, x_i, \dots, x_n)$, par linéarité de $f$ par rapport à la variable $i_0$. Or $f(x_1, \dots, x_i, \dots, x_i, \dots, x_n) = 0$, car $x_i$ est aux places $i$ et $i_0$ ; on utilise donc que $f$ est alternée. $\square$

**Théorème II.3.** Soit $E$ un espace vectoriel de dimension $n$. Alors $\mathcal{A}_n(E)$ est un espace vectoriel de dimension 1. Si $B = (e_1, \dots, e_n)$ est une base de $E$, alors il existe une unique fonction dans $\mathcal{A}_n(E)$, notée $det_B$, telle que $det_B(e_1, \dots, e_n) = 1$. On l'appelle le déterminant dans la base $B$.

**Démonstration.** Admise. $\square$

**Proposition 4.** Soit $f \in \mathcal{A}_n(E)$. Alors $f = f(e_1, \dots, e_n) \times det_B$. En particulier, $det_{B'} = det_{B'}(e_1, \dots, e_n) \times det_B$, où $B'$ est une autre base de $E$.

**Démonstration.** Puisque $\mathcal{A}_n(E)$ est de dimension 1, tous ses éléments sont colinéaires. Ainsi, $\exists \lambda \in \mathbb{K}, f = \lambda\, det_B$. On évalue cela en $e_1, \dots, e_n$ : $f(e_1, \dots, e_n) = \lambda\, det_B(e_1, \dots, e_n)$. Donc on a la valeur de $\lambda$. La deuxième égalité n'est autre que la première avec $f = det_{B'}$. $\square$

**Proposition 5.** Une famille $(x_1, \dots, x_n)$ est liée si et seulement si $det_B(x_1, \dots, x_n) = 0$. De plus, si $B$ et $B'$ sont 2 bases de $E$, alors $det_B(B') \times det_{B'}(B) = 1$.

**Démonstration.** On commence par montrer la formule. On évalue la deuxième égalité de P4 en $B'$ : $det_{B'}(B') = det_{B'}(B) \times det_B(B')$. Maintenant, supposons que $(x_1, \dots, x_n)$ est libre ; donc c'est une base car $\dim(E) = n$. On la note $B'$. La formule montre que $det_B(B') \neq 0$. La réciproque est la contraposée de P2. $\square$

**Proposition 6.** On a les effets suivants pour le $det_B$. Soit $(x_1, \dots, x_n)$ des vecteurs de $E$, alors :

- effet des "transvections" : $det_B(x_1, \dots, x_j, \dots, x_n) = det_B\Big(x_1, \dots, x_j + \displaystyle\sum_{i \neq j} \lambda_i x_i, \dots, x_n\Big)$ ;
- effet des "dilatations" : $\forall \lambda \in \mathbb{K}, det_B(x_1, \dots, \lambda x_i, \dots, x_n) = \lambda\, det(x_1, \dots, x_n)$ ;
- effet des "permutations" : $\forall i \neq j, f(x_1, \dots, x_i, x_j, \dots, x_n) = -f(x_1, \dots, x_j, \dots, x_i, \dots, x_n)$.

**Preuve.** Les effets de transvection et dilatation se déduisent directement de $f \in \mathcal{A}_n(E)$. Pour la permutation : $f(x_1, \dots, x_i + x_j, \dots, x_i + x_j, \dots, x_n) = 0$ car $f$ est alternée, et $f(x_1, \dots, x_i + x_j, \dots, x_i + x_j, \dots, x_n) = f(x_1, \dots, x_i, \dots, x_i, \dots, x_n) + f(x_1, \dots, x_i, \dots, x_j, \dots, x_n) + f(x_1, \dots, x_j, \dots, x_i, \dots, x_n) + f(x_1, \dots, x_j, \dots, x_j, \dots, x_n)$.

## Déterminant d'un endomorphisme

**Proposition 1.** Soit $u \in \mathcal{L}(E)$. Soit $B$ une base de $E$. Alors $det_B(u(e_1), \dots, u(e_n))$ ne dépend pas de $B$. On appelle $det(u)$ cette valeur. On a de plus, pour toute famille $(x_1, \dots, x_n)$, $det_B(u(x_1), \dots, u(x_n)) = (det(u)) \times det_B(x_1, \dots, x_n)$.

**Démonstration.** Voir travaux dirigés. $\square$

**Théorème II.2.** Soient $u$ et $v$ dans $\mathcal{L}(E)$. Alors $det(u \circ v) = det(u) \times det(v)$.

**Preuve.** Soit $B$ une base, alors $det(u \circ v) = det_B((u \circ v)(e_1), \dots, (u \circ v)(e_n))$. On appelle $x_1 = v(e_1), \dots, x_n = v(e_n)$ et on applique P1 : $det(u \circ v) = det(u) \times det_B(x_1, \dots, x_n) = det(u) \times det_B(v(e_1), \dots, v(e_n))$.

**Proposition 3.** Soit $u \in \mathcal{L}(E)$. Alors $u$ est inversible si et seulement si $det(u) \neq 0$. On a alors $det(u^{-1}) = \dfrac{1}{det(u)}$. De plus $det(Id) = 1$.

**Démonstration.** $det(I_D) = det_B(I_D(e_1), \dots, I_D(e_n)) = det_B(e_1, \dots, e_n) = 1$ par définition. Soit $u \in \mathcal{L}(E)$ inversible, alors $det(u \circ u^{-1}) = det(u) \times det(u^{-1}) = det(I_D) = 1$. Donc $det(u) \neq 0$ et $det(u^{-1}) = \dfrac{1}{det(u)}$.
Supposons maintenant que $det(u) \neq 0$. Soit $B$ une base de $E$, alors $det_B(u(e_1), \dots, u(e_n)) \neq 0$. Donc, par I-P3, $(u(e_1), \dots, u(e_n))$ est libre. Or $\dim(E) = n$. Donc c'est une base. Donc $u$ est bijective. $\square$

**Proposition 4.** Soit $u \in \mathcal{L}(E)$, et $\lambda \in \mathbb{K}$. Alors $det(\lambda u) = \lambda^n \times det(u)$, où $n = \dim(E)$.

**Démonstration.** (À savoir.) Soit $B = (e_1, \dots, e_n)$ une base de $E$. Alors $det(\lambda u) = det_B((\lambda u)(e_1), \dots, (\lambda u)(e_n)) = det_B(\lambda u(e_1), \dots, \lambda u(e_n)) = \lambda\, det_B(u(e_1), \lambda u(e_2), \dots, \lambda u(e_n)) = \dots = \lambda^n det_B(u(e_1), \dots, u(e_n)) = \lambda^n det(u)$. $\square$

## Déterminant d'une matrice

**Définition.** Soit $A \in \mathcal{M}_n(\mathbb{K})$ une matrice. On note $c_i$ ses colonnes. On les identifie à des vecteurs de $\mathbb{K}^n$. Soit $B = (e_1, \dots, e_n)$ la base canonique de $\mathbb{K}^n$. Alors on pose $det(A) = det_B(c_1, \dots, c_n)$.

**Proposition 2.** Soit $u \in \mathcal{L}(E)$ ; alors $det(u)$ est aussi le déterminant de n'importe quelle matrice représentant $u$, dans une base quelconque. Autrement dit : 2 matrices semblables ont le même déterminant.

**Démonstration.** Voir TD. $\square$

**Corollaire 3.** On a $det(I_n) = 1$, $\forall A \in \mathcal{M}_n(\mathbb{K}), \forall \lambda \in \mathbb{K}, det(\lambda A) = \lambda^n det(A)$, $det(AB) = det(A).det(B)$, $A \in GL_n(\mathbb{K}) \Leftrightarrow det(A) \neq 0$, et alors $det(A^{-1}) = \dfrac{1}{det(A)}$.

**Démonstration.** On utilise P2. $I_n$ est la matrice de l'identité dans n'importe quelle base, donc $det(I_n) = det(I_d) = 1$. Si $A$ représente $u$ dans la base canonique, alors $\lambda A$ représente $\lambda u$. Si $A$ représente $u$ dans la base canonique et si $B$ représente $v$ dans la base canonique, alors $AB$ représente $u \circ v$. Si $A$ représente $u$ dans la base canonique, alors $A^{-1}$ représente $u^{-1}$. $\square$

**Remarque.** $det(A + B) \neq det(A) + det(B)$.

**Proposition 4.** (matrice diagonale) Soit $D = \begin{pmatrix} d_1 & \dots & 0 \\ \vdots & \vdots & \vdots \\ 0 & \dots & d_n \end{pmatrix}$ une matrice diagonale. Alors $det(D) = \displaystyle\prod_{i=1}^{n} d_i = d_1 \dots d_n$.

**Démonstration.** $D$ a pour colonnes $d_1 e_1, \dots, d_n e_n$, où $e_i = \begin{pmatrix} 0 \\ \vdots \\ 1 \\ \vdots \\ 0 \end{pmatrix}$ (1 à la $i$-ème place) est le $i$-ème vecteur de la base canonique de $\mathbb{K}^n$. Donc par D1, $det(D) = det_B(d_1 e_1, \dots, d_n e_n) = d_1 det_B(e_1, d_2 e_2, \dots, d_n e_n) = \dots = (d_1 \dots d_n) \times det_B(e_1, \dots, e_n)$. $\square$

## Action sur les lignes et les colonnes

Soit $A$ une matrice dont on note $(c_i)$ les colonnes. Alors :

- remplacer $c_j$ par $c_j + \displaystyle\sum_{i \neq j} \lambda_i c_i$ ne change pas $det(A)$ (transvections) ;
- remplacer $c_j$ par $\lambda c_j$ change $det(A)$ en $\lambda\, det(A)$ (dilatations) ;
- échanger $c_i$ et $c_j$ change $det(A)$ en $-det(A)$ (permutations).

**Théorème II.5.** Soit $T = (t_{ij})$ une matrice triangulaire supérieure. Alors $det(T) = \prod_{i=1}^{n} t_{ii}$.

**Démonstration.** (À savoir.) On distingue 2 cas. Si un des $t_{ii}$ vaut 0 :

- si c'est $t_{11}$, alors $c_1 = 0$, et $(c_1, \dots, c_n)$ est lié, donc $det_B(c_1, \dots, c_n) = 0$, où $B$ est la base canonique ;
- si c'est $t_{ii}$ avec $i \geq 2$, c'est-à-dire que $T = \begin{pmatrix} t_{11} & \dots & \dots & \vdots \\ 0 & 0 & \dots & \vdots \\ 0 & 0 & t_{i-1,i-1} & \vdots \\ 0 & 0 & \dots & \ddots \end{pmatrix}$, alors on remarque que $(c_1, \dots, c_{i-1}) = \begin{pmatrix} t_{11} & t_{12} & \dots & \dots \\ 0 & t_{22} & \dots & \dots \\ \vdots & 0 & t_{i-1,i-1} & \dots \\ 0 & 0 & 0 & 0 \end{pmatrix}$ est une famille échelonnée, donc elle est libre.
  Donc $\text{Vect}(c_1, \dots, c_{i-1}) = \text{Vect}(e_1, \dots, e_{i-1})$. Or $c_i = \begin{pmatrix} t_{1i} \\ t_{i-1,i} \\ 0 \\ \vdots \\ 0 \end{pmatrix} \in \text{Vect}(e_1, \dots, e_{i-1})$. Donc $(c_1, \dots, c_i)$ est liée.
  Donc $(c_1, \dots, c_n)$ est liée en tant que sur-famille, donc $det(T) = det_B(c_1, \dots, c_n) = 0$.

Si aucun des $t_{ii}$ ne vaut 0 : on remplace $c_i$ par $c_i - \dfrac{t_{1i}}{t_{11}} c_1$, et ce pour $i$ de 2 à $n$. On commence par $i = 2$ : on note

$$
c'_2 = c_2 - \frac{t_{12}}{t_{11}} c_1 = \begin{pmatrix} t_{12} \\ t_{22} \\ 0 \\ \vdots \\ 0 \end{pmatrix} - \frac{t_{12}}{t_{11}} \begin{pmatrix} t_{11} \\ 0 \\ \vdots \\ 0 \end{pmatrix} = \begin{pmatrix} 0 \\ t_{22} \\ 0 \\ \vdots \\ 0 \end{pmatrix}
$$

De même :

$$
c'_i = c_i - \frac{t_{1i}}{t_{11}} c_1 = \begin{pmatrix} t_{1i} \\ \vdots \\ t_{ii} \\ 0 \\ \vdots \\ 0 \end{pmatrix} - \frac{t_{1i}}{t_{11}} \begin{pmatrix} t_{11} \\ 0 \\ \vdots \\ \vdots \\ \vdots \\ 0 \end{pmatrix} = \begin{pmatrix} 0 \\ t_{2i} \\ \vdots \\ t_{ii} \\ 0 \\ \vdots \end{pmatrix}
$$

Ainsi ces opérations transforment $T$ en

$$
T_1 = \begin{pmatrix} t_{11} & 0 & \dots & 0 \\ 0 & t_{22} & \dots & \vdots \\ \vdots & \vdots & \vdots & \vdots \\ 0 & 0 & \vdots & \vdots \end{pmatrix}
$$

On réitère l'opération pour $i \geq 3$ : on fait $c'_i \leftarrow c'_i - \dfrac{t_{2i}}{t_{22}} c'_2$. On continue, en faisant pour $i \geq j + 1$, $c_i \leftarrow c_i - \dfrac{t_{ji}}{t_{jj}} c_j$. Au final, on obtient la matrice

$$
\tilde{T} = \begin{pmatrix} t_{11} & 0 & \dots & 0 \\ 0 & t_{22} & \dots & 0 \\ 0 & \dots & \ddots & 0 \\ 0 & 0 & \dots & t_{nn} \end{pmatrix}
$$

Cette matrice diagonale a pour déterminant $\displaystyle\prod_{i=1}^{n} t_{ii}$ par P4 ; de plus son déterminant est le même que le déterminant de $T$, car elle a été obtenue par des transvections. $\square$

**Remarque.** Un corollaire de la preuve est : "par une série de transvections, on peut transformer une matrice triangulaire en une matrice diagonale". Sur les systèmes échelonnés $\begin{cases} y + x = -3 \\ 2y - 6x = 2 \end{cases}$ ou $\begin{cases} y + x = -3 \\ y = -7 \end{cases}$, si on les note sous forme matricielle : $S_1 : \begin{pmatrix} 1 & 1 \\ -6 & 2 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} -3 \\ 2 \end{pmatrix}$, $S_2 : \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} -3 \\ -7 \end{pmatrix}$. $S_2$ est dit échelonné. On dit aussi que des vecteurs sont "échelonnés" s'ils sont de la forme des colonnes d'une matrice triangulaire, avec $a_{ii} \neq 0\ \forall i$. Alors : $\forall i \in \{1, \dots, n\}, \text{Vect}(c_1, \dots, c_i) = \text{Vect}(e_1, \dots, e_i)$.

**Exemple.** $\text{Vect}(c_1, c_2) = \text{Vect}(a_{11} e_1, a_{12} e_1 + a_{22} e_2) = \text{Vect}(a_{11} e_1, c_2 - \frac{a_{12}}{a_{11}} c_1) = \text{Vect}(a_{11} e_1, a_{22} e_2) = \text{Vect}(e_1, e_2)$.
La matrice donnée par les $(c_i)$ est triangulaire. Un système linéaire associé se résout facilement "de proche en proche".

**Théorème II.6.** Soit $A \in \mathcal{M}_n(\mathbb{K})$. Alors $det(A) = det({}^tA)$.

**Démonstration.** Admis. $\square$

Conséquence : toutes les opérations sur les colonnes sont valables sur les lignes. On parle d'opérations lignes colonnes. On les fait les unes après les autres.

**Définition 7.** On appelle mineur $(i, j)$ d'une matrice $A$ le déterminant de la matrice obtenue en rayant la $i$-ème ligne et la $j$-ème colonne. On le note $m_{ij}$. Le cofacteur $(i, j)$ vaut alors $(-1)^{i+j} m_{ij}$ (on le note ici $A_{ij}$). On note aussi $M_{ij}$ la matrice mineur $(i, j)$.

**Exemple.** Si $A = \begin{pmatrix} 1 & 2 & 0 \\ 0 & 1 & -1 \\ 2 & 3 & 4 \end{pmatrix}$, alors $M_{23} = \begin{pmatrix} 1 & 2 \\ 2 & 3 \end{pmatrix}$, et $m_{23} = det(M_{23}) = 1 \times 3 - 2 \times 2 = -1$ et $A_{23} = (-1) \times (-1) = 1$.

**Théorème II.8.** Soit $A \in \mathcal{M}_n(\mathbb{K})$. Soit $j$ entre 1 et $n$, fixé. Alors $det(A) = \displaystyle\sum_{i=1}^{n} a_{ij} A_{ij}$, où les $(a_{ij})$ sont les coefficients de $A$, et les $A_{ij}$ ses cofacteurs. On peut aussi fixer $i$ entre 1 et $n$ ; on a :

$$
det(A) = \sum_{j=1}^{n} a_{ij} A_{ij}
$$

**Démonstration.** Soient $(c_i)$ les colonnes de $A$, $A_{ij}$ les cofacteurs. On commence par montrer :

$$
det \underbrace{[c_1, \dots, e_i, \dots, c_n]}_{\text{matrice obtenue en plaçant } e_i \text{ à la } j\text{-ème colonne de } A} = A_{ij}
$$

En effet, cette matrice est $\begin{pmatrix} a_{11} & a_{1,j-1} & 0 & a_{1,j+1} & \dots & a_{1n} \\ \vdots & \vdots & \vdots & \vdots & \vdots & \vdots \\ a_{n1} & \dots & 0 & \dots & \dots & a_{nn} \end{pmatrix}$.
On permute la $j$-ème colonne et la $(j - 1)$-ème, puis on recommence. On trouve que ce déterminant vaut :

$$
det \begin{pmatrix} 0 & & & & & & \\ \vdots & & & & & & \\ 1 & c_1 & \dots & c_{j-1} & c_{j+1} & \dots & c_n \\ 0 & & & & & & \\ \vdots & & & & & & \\ 0 & & & & & & \end{pmatrix} \times (-1)^j
$$

$det(A) = det_B\Big(c_1, \dots, \displaystyle\sum_{i=1}^{n} a_{ij} e_i, \dots, c_n\Big)$ ; en effet, $c_j = \begin{pmatrix} a_{1j} \\ \dots \\ a_{nj} \end{pmatrix} = \displaystyle\sum_{i=1}^{n} a_{ij} e_i$. Par linéarité du déterminant : $det(A) = \displaystyle\sum_{i=1}^{n} a_{ij} det_B(c_1, \dots, e_i, \dots, c_n)$. On peut de même développer par rapport à une ligne grâce à $det(A) = det({}^tA)$. $\square$

## Quelques calculs de déterminant

### Développements

Pour les petites dimensions :

- **$n = 1$.** Ici, $A = a \in \mathbb{R}$. On a $det(a) = a\,det(1)$. Or 1 est la base canonique de $\mathbb{R}$. Donc $det(a) = a$.
- **$n = 2$.** On a $\begin{vmatrix} a & b \\ c & d \end{vmatrix} = (-1)^{1+1} a \times d + (-1)^{1+2} b \times c = ad - bc$.
- **$n = 3$.** On utilise la règle de Sarrus : $\begin{vmatrix} a & b & c \\ d & e & f \\ g & h & i \end{vmatrix} = aei + dhc + gbf - ceg - fha - ibd$.
- **$n \geq 4$.** Pas de règle pour calculer ; chercher à repérer une ligne (ou une colonne) avec des 0. Soit $A = \begin{pmatrix} 1 & 2 & 3 & 4 \\ 5 & 0 & 6 & 0 \\ 1 & -1 & 1 & 0 \\ 2 & 0 & 1 & -3 \end{pmatrix}$. On développe par rapport à la 4ème colonne :

$$
det(A) = (-1)^5 \times 4 \times \begin{vmatrix} 5 & 0 & 6 \\ 1 & -1 & 1 \\ 2 & 0 & 1 \end{vmatrix} + (-1)^8 \times (-3) \times \begin{vmatrix} 1 & 2 & 3 \\ 5 & 0 & 6 \\ 1 & -1 & 1 \end{vmatrix}
$$

**Exercice.** Soient $a$ et $b$ deux réels, et $D(a, b) = \begin{vmatrix} a & \dots & b \\ \vdots & \ddots & \vdots \\ b & \dots & a \end{vmatrix}$.

1. Remplacer $c_1$ par $c_1 + \displaystyle\sum_{i \geq 2} c_i$ : $D(a, b) = \begin{vmatrix} a + (n - 1)b & b & \dots & b \\ \vdots & a & \dots & \vdots \\ \vdots & \vdots & \ddots & \vdots \\ a + (n - 1)b & b & \dots & a \end{vmatrix}$.
2. Par une opération sur les lignes, faire apparaître $(1, 0, \dots, 0)$ sur la première colonne. On a donc, par dilatation, en posant $\lambda = (n - 1)b + a$ :

   $$
   D(a, b) = \begin{vmatrix} \lambda & & & \\ \vdots & C_2 & \dots & C_n \\ \lambda & & & \end{vmatrix} = \lambda \begin{vmatrix} 1 & & & \\ \vdots & c_2 & \dots & c_n \\ 1 & & & \end{vmatrix} = ((n - 1)b + a) \begin{vmatrix} 1 & b & \dots & b \\ \vdots & a & \dots & b \\ \vdots & \dots & \ddots & \dots \\ \vdots & b & \dots & \vdots \\ 1 & \dots & \dots & a \end{vmatrix}
   $$

   On fait $L_2 = L_2 - L_1$, $L_3 = L_3 - L_1$, ..., $L_n = L_n - L_1$. Ainsi

   $$
   D(a, b) = \lambda \begin{vmatrix} 1 & b & \dots & \dots & b \\ 0 & a - b & 0 & \dots & 0 \\ 0 & 0 & a - b & \dots & 0 \\ 0 & \dots & \dots & \ddots & 0 \\ \vdots & \vdots & \vdots & \ddots & a - b \end{vmatrix}
   $$

3. En déduire $D(a, b)$ : on développe par rapport à la première colonne :

   $$
   D(a, b) = \lambda \times 1 \times (-1)^2 \times \begin{vmatrix} a - b & \dots & 0 \\ \vdots & \ddots & \vdots \\ 0 & \dots & a - b \end{vmatrix} = (a + (n - 1)b)(a - b)^{n-1}
   $$

**Remarque.** Ne pas toujours forcer sur Sarrus, par exemple : $\begin{vmatrix} 0 & 0 & 2 \\ 3 & 4 & 2 \\ 1 & -1 & 6 \end{vmatrix}$. On développe par rapport à la 1ère ligne : $d = 0 A_{11} + 0 A_{12} + 2 \times A_{13} = 2 \times (-1)^{1+3} \begin{vmatrix} 3 & 4 \\ 1 & -1 \end{vmatrix} = -14$.
La somme des coefficients par colonnes vaut la même chose sur chaque ligne. Avec un même coefficient sur une colonne, on fait apparaître des 0.

### Calculs par blocs

**Proposition 1.** On a pour des matrices triangulaires par blocs la règle suivante :

$$
det \begin{pmatrix} A & B \\ 0 & C \end{pmatrix} = det(A) \times det(C)
$$

**Démonstration.** On décompose la matrice : $\begin{pmatrix} A & B \\ 0 & C \end{pmatrix} = \begin{pmatrix} I_n & 0 \\ 0 & C \end{pmatrix} \begin{pmatrix} A & B \\ 0 & I_p \end{pmatrix}$. Ici $n$ = taille de $A$ et $p$ = taille de $C$. Or $det \begin{pmatrix} I_n & 0 \\ 0 & C \end{pmatrix} = det \begin{pmatrix} I_{n-1} & 0 \\ 0 & C \end{pmatrix} = \dots = det(C)$. De même, $det \begin{pmatrix} A & B \\ 0 & I_p \end{pmatrix} = det(A)$. On conclut avec $det(PQ) = det(P) \times det(Q)$. $\square$

**Remarque.** Si $\begin{pmatrix} A & B \\ C & D \end{pmatrix}$ est une matrice par blocs, $\begin{vmatrix} A & B \\ C & D \end{vmatrix} \neq det(A) det(D) - det(B) det(C)$.

## Applications

### Formules de Cramer

Soit $A \in \mathcal{M}_{n,p}(\mathbb{K})$ et $B \in \mathcal{M}_{n,1}(\mathbb{K})$. On cherche à résoudre $\begin{cases} a_{11} x_1 + \dots + a_{1p} x_p = b_1 \\ \dots \\ a_{n1} x_1 + \dots + a_{np} x_p = b_n \end{cases}$. Cela se réécrit $AX = B$, où $X = (x_1, \dots, x_p) \in \mathcal{M}_{p,1}$ est la nouvelle inconnue.
Soit $u$ l'application associée à $A$ dans la base canonique de $\mathbb{R}^n$, soit $b$ le vecteur de $\mathbb{R}^n$ associé à $B$ dans la base canonique de $\mathbb{R}^n$ et $x$ le vecteur de $\mathbb{R}^n$ associé à $X$ dans la base canonique de $\mathbb{R}^n$. Alors $AX = B \Leftrightarrow u(x) = b$.
Ainsi résoudre $AX = B$, c'est trouver $u^{-1}(\{b\})$.

**Définition 1.** On dit que le système est "de Cramer" si $p = n$, et que $det(A) \neq 0$.

**Proposition 2.** Soit $AX = B$ un système de Cramer. Alors il admet une unique solution, qui est donnée par : $X = \begin{pmatrix} x_1 \\ \vdots \\ x_n \end{pmatrix}$, où

$$
x_k = \frac{1}{det(A)} \begin{vmatrix} a_{11} & \dots & b_1 & \dots & a_{1n} \\ \vdots & \vdots & \vdots & \vdots & \vdots \\ a_{n1} & \dots & b_n & \dots & a_{nn} \end{vmatrix}
$$

**Démonstration.** Puisque $det(A) \neq 0$, $det(u) \neq 0$ aussi, et $u$ est bijective, donc l'équation $u(x) = b$ admet une unique solution. Le reste de la preuve est admis. $\square$

**Corollaire 3.** Soit $A$ tel que $A \in GL_n(\mathbb{K})$. Alors $A^{-1} = \dfrac{1}{det(A)}\, {}^t com(A)$, où $com(A)$ est la matrice des cofacteurs.

**Démonstration.** Voir TD. $\square$

**Remarque.** Cela permet de calculer $A^{-1}$ en dimension 3, mais en dimension supérieure à 4, cela donne de gros calculs.

### Déterminant de Vandermonde

Soient $(x_1, \dots, x_n)$ des réels. On appelle déterminant de Vandermonde :

$$
V(x_1, \dots, x_n) = \begin{vmatrix} 1 & x_1 & x_1^2 & \dots & x_1^{n-1} \\ \vdots & \vdots & \vdots & \vdots & \vdots \\ 1 & x_n & x_n^2 & \dots & x_n^{n-1} \end{vmatrix}
$$

**Théorème II.4.** On a

$$
V(x_1, \dots, x_n) = \prod_{i < j} (x_j - x_i)
$$

**Démonstration.** Admis. $\square$
