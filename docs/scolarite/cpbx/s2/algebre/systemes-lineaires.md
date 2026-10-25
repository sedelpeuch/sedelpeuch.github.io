---
title: "Systèmes linéaires"
description: "Systèmes linéaires : écritures matricielle et vectorielle, structure de l'ensemble des solutions, rang, systèmes de Cramer et formules de Cramer, méthode du pivot, inversion d'une matrice par le pivot et par la comatrice."
sidebar_position: 7
---

**Introduction (système linéaire).** On considère un système linéaire de $n$ équations à $m$ inconnues :

$$
\begin{cases}
a_{11}x_1 + a_{12}x_2 + \dots + a_{1m}x_m = b_1 \\
a_{21}x_1 + a_{22}x_2 + \dots + a_{2m}x_m = b_2 \\
\vdots \\
a_{n1}x_1 + a_{n2}x_2 + \dots + a_{nm}x_m = b_n
\end{cases}
$$

où les coefficients $a_{ij} \in \mathbb{K}$ et les seconds membres $b_i \in \mathbb{K}$ sont donnés ; les inconnues sont les $x_j \in \mathbb{K}$.

On peut l'écrire sous la forme matricielle $AX = B$, où $A = (a_{ij})_{1 \leq i \leq n, 1 \leq j \leq m}$ est la matrice du système et $B = {}^t(b_1, \dots, b_n)$ la colonne des seconds membres.

On peut aussi l'écrire sous la forme d'une équation vectorielle : $f(x) = b$, où $x = (x_1, \dots, x_m) \in \mathbb{K}^m$, $b = (b_1, \dots, b_n) \in \mathbb{K}^n$ et $f \in \mathcal{L}(\mathbb{K}^m, \mathbb{K}^n)$ est l'application linéaire dont la matrice (relativement aux bases canoniques) est $A$.

**Proposition et définition.** Le système admet des solutions si et seulement si $b \in \text{Im}(f)$ (par définition de $\text{Im}(f)$). Si $x^\circ = (x^\circ_1, \dots, x^\circ_m)$ est une solution, l'ensemble des solutions est $\{x^\circ + z : z \in \text{Ker}(f)\} = x^\circ + \text{Ker}(f)$ : géométriquement, c'est ce qu'on appelle un sous-espace affine de $\mathbb{K}^m$, c'est-à-dire l'image d'un sev (ici $\text{Ker}(f)$) par une translation (ici la translation de vecteur $x^\circ$). On dit que $x^\circ + \text{Ker}(f)$ est le sous-espace affine de $\mathbb{K}^m$ de direction $\text{Ker}(f)$ et passant par $x^\circ$. La dimension de $x^\circ + \text{Ker}(f)$, c'est-à-dire de $\text{Ker}(f)$, est $m - r$, où $m$ est le nombre d'inconnues et $r$ le rang de $f$ (qu'on appelle aussi le rang du système).

***Démonstration.*** $f(x) = b \Leftrightarrow f(x) = f(x^\circ) \Leftrightarrow f(x - x^\circ) = 0 \Leftrightarrow x - x^\circ \in \text{Ker}(f)$. Le théorème du rang donne $\dim(\text{Ker}(f)) = m - r$.

**Détermination pratique du rang.** Le rang du système, ou $rg(A)$, est la dimension du sev de $\mathcal{M}_{n,1}(\mathbb{K})$ engendré par les colonnes de $A$, c'est-à-dire le nombre maximum de colonnes linéairement indépendantes du système.

**Définition.** On dit que le système initial est de Cramer si $m = n$ et que son rang est $n$.

**Proposition.** Pour un système de Cramer

$$
\begin{cases}
a_{11}x_1 + a_{12}x_2 + \dots + a_{1n}x_n = b_1 \\
a_{21}x_1 + a_{22}x_2 + \dots + a_{2n}x_n = b_2 \\
\vdots \\
a_{n1}x_1 + a_{n2}x_2 + \dots + a_{nn}x_n = b_n
\end{cases}
$$

il existe une solution unique. Elle est donnée par les formules de Cramer :

$$
x_1 = \frac{\begin{vmatrix}
b_1 & a_{12} & \dots & a_{1n} \\
b_2 & a_{22} & \dots & a_{2n} \\
\vdots & \vdots & \vdots & \vdots \\
b_n & a_{n2} & \dots & a_{nn}
\end{vmatrix}}{\begin{vmatrix}
a_{11} & a_{12} & \dots & a_{1n} \\
a_{21} & a_{22} & \dots & a_{2n} \\
\vdots & \vdots & \vdots & \vdots \\
a_{n1} & a_{n2} & \dots & a_{nn}
\end{vmatrix}},
\quad
x_2 = \frac{\begin{vmatrix}
a_{11} & b_1 & \dots & a_{1n} \\
a_{21} & b_2 & \dots & a_{2n} \\
\vdots & \vdots & \vdots & \vdots \\
a_{n1} & b_n & \dots & a_{nn}
\end{vmatrix}}{\begin{vmatrix}
a_{11} & a_{12} & \dots & a_{1n} \\
a_{21} & a_{22} & \dots & a_{2n} \\
\vdots & \vdots & \vdots & \vdots \\
a_{n1} & a_{n2} & \dots & a_{nn}
\end{vmatrix}},
\quad \dots, \quad
x_n = \frac{\begin{vmatrix}
a_{11} & a_{12} & \dots & b_1 \\
a_{21} & a_{22} & \dots & b_2 \\
\vdots & \vdots & \vdots & \vdots \\
a_{n1} & a_{n2} & \dots & b_n
\end{vmatrix}}{\begin{vmatrix}
a_{11} & a_{12} & \dots & a_{1n} \\
a_{21} & a_{22} & \dots & a_{2n} \\
\vdots & \vdots & \vdots & \vdots \\
a_{n1} & a_{n2} & \dots & a_{nn}
\end{vmatrix}}
$$

**Nota bene.** Dans le numérateur donnant $x_j$, la colonne numéro $j$ de $A$ est remplacée par la colonne $B$ des seconds membres.

***Démonstration.*** $A$ est inversible (car de rang $n$, i.e. ses colonnes sont linéairement indépendantes) et

$$
AX = B \Leftrightarrow X = A^{-1}B = \frac{1}{\det(A)}{}^tCom(A)B \Leftrightarrow x_j = \frac{1}{\det(A)}\sum_{i=1}^{n} (-1)^{i+j}\det(A_{ij})b_i
$$

Or $\det(A) = \displaystyle\sum_{i=1}^{n} (-1)^{i+j}\det(A_{ij})a_{ij}$ (développement selon la colonne $j$). Donc $\displaystyle\sum_{i=1}^{n} (-1)^{i+j}\det(A_{ij})b_i$ est le déterminant obtenu en remplaçant la colonne $j$ par $B$.

**Méthode du pivot.** C'est une méthode de résolution qui fonctionne pour tous les systèmes (de Cramer ou non). On écrit un double tableau :

$$
\begin{array}{cccc|c|l}
a_{11} & a_{12} & \dots & a_{1m} & b_1 & L_1 \\
a_{21} & a_{22} & \dots & a_{2m} & b_2 & L_2 \\
\vdots & \vdots & \vdots & \vdots & \vdots & \vdots \\
a_{n1} & a_{n2} & \dots & a_{nm} & b_n & L_n
\end{array}
$$

À gauche, le tableau des coefficients $a_{ij}$ du système initial ; à droite, la colonne des seconds membres $b_i$ ; les lignes sont numérotées $L_1, \dots, L_n$. Puis on fait des combinaisons linéaires des lignes (et pas des colonnes !), toujours réversibles (on raisonne par équivalences), jusqu'à obtenir à gauche une matrice unité $I_r$ de rang $r$ maximum ($r$ est alors nécessairement égal à $rg(A)$).

**Exemple.**

$$
\begin{cases}
x - y + z = a \\
5x + 2y - z = b \\
-3x - 4y + 3z = c
\end{cases}
$$

On écrit le double tableau

$$
\begin{array}{ccc|c|l}
1 & -1 & 1 & a & L_1 \\
5 & 2 & -1 & b & L_2 \\
-3 & -4 & 3 & c & L_3
\end{array}
$$

On commence par annihiler les coefficients de la première colonne sur les lignes 2 et 3 :

$$
\begin{array}{ccc|c|l}
1 & -1 & 1 & a & L_1 \\
0 & 7 & -6 & b - 5a & L_2 - 5L_1 = L'_2 \\
0 & -7 & 6 & c + 3a & L_3 + 3L_1 = L'_3
\end{array}
$$

- Si $c + 3a \neq -(b - 5a)$ (c'est-à-dire si $c \neq 2a - b$), les lignes $L'_2, L'_3$ expriment des conditions incompatibles : le système n'a pas de solution.
- Si $c = 2a - b$, la troisième ligne est redondante et le système se réduit à :

  $$
  \begin{array}{ccc|c|l}
  1 & -1 & 1 & a & L_1 \\
  0 & 7 & -6 & b - 5a & L'_2
  \end{array}
  $$

C'est un système de rang 2 (deux lignes linéairement indépendantes). On peut encore introduire un $0$ dans la partie gauche de la première ligne :

$$
\begin{array}{ccc|c|l}
7 & 0 & 1 & 2a + b & 7L_1 + L'_2 = L'_1 \\
0 & 7 & -6 & b - 5a & L'_2
\end{array}
$$

On divise tout par 7 :

$$
\begin{array}{ccc|c}
1 & 0 & \frac{1}{7} & \frac{2a + b}{7} \\
0 & 1 & -\frac{6}{7} & \frac{b - 5a}{7}
\end{array}
$$

et on a obtenu une matrice unité maximale $\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$. Ce qui correspond au système :

$$
\begin{cases}
x + \frac{1}{7}z = \frac{1}{7}(2a + b) \\
y - \frac{6}{7}z = \frac{1}{7}(b - 5a)
\end{cases}
$$

dont la solution générale est

$$
\begin{cases}
x = \frac{1}{7}(2a + b) - \frac{1}{7}z \\
y = \frac{1}{7}(b - 5a) + \frac{6}{7}z
\end{cases}
$$

avec $z \in \mathbb{R}$ quelconque. L'ensemble des solutions est donc l'ensemble des triplets :

$$
(x, y, z) = \left(\frac{2a + b}{7} - \frac{1}{7}z, \frac{b - 5a}{7} + \frac{6}{7}z, z\right) = \left(\frac{2a + b}{7}, \frac{b - 5a}{7}, 0\right) + z\left(-\frac{1}{7}, \frac{6}{7}, 1\right)
$$

autrement dit, c'est l'ensemble

$$
\left(\frac{2a + b}{7}, \frac{b - 5a}{7}, 0\right) + \mathbb{R}\left(-\frac{1}{7}, \frac{6}{7}, 1\right) = \left(\frac{2a + b}{7}, \frac{b - 5a}{7}, 0\right) + \mathbb{R}(1, -6, -7)
$$

C'est donc la droite affine dirigée par le vecteur $(1, -6, -7)$ et passant par le point de coordonnées $\left(\frac{2a + b}{7}, \frac{b - 5a}{7}, 0\right)$. On note que la dimension de l'espace des solutions (qui est 1) est bien la différence entre le nombre d'inconnues (qui est 3) et le rang du système (qui est 2).

**Inversion d'une matrice par la méthode du pivot.** Dans la partie gauche du double tableau, on met encore la matrice $A$ ; dans la partie droite, au lieu d'une colonne de seconds membres, on écrit la matrice unité $I_n$. Puis on fait des combinaisons linéaires de lignes, jusqu'à obtenir la matrice $I_n$ à gauche : la matrice de droite est alors $A^{-1}$ (NB : si à gauche on obtient une ligne de $0$, c'est que la matrice n'est pas inversible).

**Exemple.**

$$
\begin{array}{ccc|ccc|l}
1 & 5 & 3 & 1 & 0 & 0 & L_1 \\
2 & 3 & 1 & 0 & 1 & 0 & L_2 \\
3 & 4 & 1 & 0 & 0 & 1 & L_3
\end{array}
$$

On commence par annihiler les coefficients de la première colonne sur les lignes 2 et 3 :

$$
\begin{array}{ccc|ccc|l}
1 & 5 & 3 & 1 & 0 & 0 & L_1 \\
0 & -7 & -5 & -2 & 1 & 0 & L'_2 = L_2 - 2L_1 \\
0 & -11 & -8 & -3 & 0 & 1 & L'_3 = L_3 - 3L_1
\end{array}
$$

Puis on annihile le deuxième coefficient de la ligne 3 (en conservant les deux $0$ sur la première colonne) :

$$
\begin{array}{ccc|ccc|l}
1 & 5 & 3 & 1 & 0 & 0 & L_1 \\
0 & -7 & -5 & -2 & 1 & 0 & L'_2 = L_2 - 2L_1 \\
0 & 0 & 1 & -1 & 11 & -7 & L''_3 = -7L'_3 + 11L'_2
\end{array}
$$

Avec $L''_3$, on annihile les coefficients de la troisième colonne au-dessus du $1$ :

$$
\begin{array}{ccc|ccc|l}
1 & 5 & 0 & 4 & -33 & 21 & L'_1 = L_1 - 3L''_3 \\
0 & -7 & 0 & -7 & 56 & -35 & L''_2 = L'_2 + 5L''_3 \\
0 & 0 & 1 & -1 & 11 & -7 & L''_3
\end{array}
$$

Avec $L''_2$, on annihile le deuxième coefficient de la première ligne (après simplification par 7) :

$$
\begin{array}{ccc|ccc|l}
1 & 0 & 0 & -1 & 7 & -4 & L''_1 \\
0 & 1 & 0 & 1 & -8 & 5 & L''_2 \\
0 & 0 & 1 & -1 & 11 & -7 & L''_3
\end{array}
$$

**Autre méthode : par la comatrice.** On note $A_{ij}$ la matrice obtenue en supprimant dans $A$ la ligne $i$ et la colonne $j$, $|A_{ij}|$ son déterminant.

$$
\begin{aligned}
|A_{11}| &= \begin{vmatrix} 3 & 1 \\ 4 & 1 \end{vmatrix} = -1 &
|A_{12}| &= \begin{vmatrix} 2 & 1 \\ 3 & 1 \end{vmatrix} = -1 &
|A_{13}| &= \begin{vmatrix} 2 & 3 \\ 3 & 4 \end{vmatrix} = -1 \\
|A_{21}| &= \begin{vmatrix} 5 & 3 \\ 4 & 1 \end{vmatrix} = -7 &
|A_{22}| &= \begin{vmatrix} 1 & 3 \\ 3 & 1 \end{vmatrix} = -8 &
|A_{23}| &= \begin{vmatrix} 1 & 5 \\ 3 & 4 \end{vmatrix} = -11 \\
|A_{31}| &= \begin{vmatrix} 5 & 3 \\ 3 & 1 \end{vmatrix} = -4 &
|A_{32}| &= \begin{vmatrix} 1 & 3 \\ 2 & 1 \end{vmatrix} = -5 &
|A_{33}| &= \begin{vmatrix} 1 & 5 \\ 2 & 3 \end{vmatrix} = -7
\end{aligned}
$$

La comatrice de $A$ a pour coefficients $(-1)^{i+j}|A_{ij}|$ :

$$
Com(A) = \begin{pmatrix} -1 & 1 & -1 \\ 7 & -8 & 11 \\ -4 & 5 & -7 \end{pmatrix}
\qquad \text{donc} \qquad
{}^tCom(A) = \begin{pmatrix} -1 & 7 & -4 \\ 1 & -8 & 5 \\ -1 & 11 & -7 \end{pmatrix}
$$
