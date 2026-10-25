---
title: "Matrices"
description: "Matrices : opérations, espace et algèbre des matrices, matrices inversibles, matrice d'une application linéaire, composition, matrice de passage et changement de base, matrices équivalentes et semblables, transposée, matrices symétriques et antisymétriques, trace."
sidebar_position: 5
---

## Introduction et généralités

**Définition.** Une matrice sur $\mathbb{K}$ à $n$ lignes et $m$ colonnes est un tableau d'éléments de $\mathbb{K}$ :

$$
\begin{pmatrix}
a_{11} & a_{12} & \dots & a_{1m} \\
a_{21} & a_{22} & \dots & a_{2m} \\
\vdots & \vdots & \vdots & \vdots \\
a_{n1} & a_{n2} & \dots & a_{nm}
\end{pmatrix} = (a_{ij})
$$

($i$ = n° de la ligne, $j$ = n° de la colonne). On note $\mathcal{M}_{n,m}(\mathbb{K})$ l'ensemble de ces matrices. Si $n = m$, on le note simplement $\mathcal{M}_n(\mathbb{K})$.

**Définition (opérations sur les matrices).**

- Addition dans $\mathcal{M}_{n,m}(\mathbb{K})$ : $(a_{ij}) + (b_{ij}) = (a_{ij} + b_{ij})$. Exemple ($n = m = 2$) :

  $$
  \begin{pmatrix} a & b \\ c & d \end{pmatrix} + \begin{pmatrix} a' & b' \\ c' & d' \end{pmatrix} = \begin{pmatrix} a + a' & b + b' \\ c + c' & d + d' \end{pmatrix}
  $$

- Multiplication par un scalaire : $\lambda(a_{ij}) = (\lambda a_{ij})$. Exemple ($n = m = 2$) : $\lambda\begin{pmatrix} a & b \\ c & d \end{pmatrix} = \begin{pmatrix} \lambda a & \lambda b \\ \lambda c & \lambda d \end{pmatrix}$.
- Produit d'une matrice de $\mathcal{M}_{n,m}(\mathbb{K})$ et d'une matrice de $\mathcal{M}_{m,l}(\mathbb{K})$ :

  $$
  \begin{pmatrix} a & b \\ c & d \end{pmatrix} \cdot \begin{pmatrix} e & f & g \\ h & i & j \end{pmatrix} = \begin{pmatrix} ae + bh & af + bi & ag + bj \\ ce + dh & cf + di & cg + dj \end{pmatrix}
  $$

  Le produit se fait en multipliant terme à terme chaque ligne de $A$ par chaque colonne de $B$. En général, on a $AB \neq BA$, et $AB = 0$ est possible avec $A \neq 0$, $B \neq 0$.

**Proposition.**

1. $(\mathcal{M}_{n,m}(\mathbb{K}), +, \times)$ est un $\mathbb{K}$-ev de dimension $nm$. Une base est $(E_{ij})$, où $E_{ij}$ est la matrice ayant $1$ à l'intersection de la ligne $i$ et de la colonne $j$, et des $0$ partout ailleurs. $(E_{ij})$ est appelée la base canonique de $\mathcal{M}_{n,m}(\mathbb{K})$.
2. $\mathcal{M}_n(\mathbb{K}) = \mathcal{M}_{n,n}(\mathbb{K})$ muni de $+, \cdot, \times$ est une $\mathbb{K}$-algèbre, unitaire (l'élément neutre pour $\times$ est $I_n = \begin{pmatrix} 1 & & 0 \\ & \ddots & \\ 0 & & 1 \end{pmatrix}$ : $1$ sur la diagonale, $0$ partout ailleurs ; on l'appelle la matrice unité), non commutative ($AB \neq BA$ en général), non intègre ($A \neq 0$ et $B \neq 0$ n'impliquant pas $AB \neq 0$).

***Démonstration.***

1. On va justifier que $(E_{ij})$ est une base pour le cas où $n = m = 2$ (le cas général n'est pas plus difficile). (Le fait que $\mathcal{M}_{n,m}(\mathbb{K})$ est un $\mathbb{K}$-ev est assuré par le trot de l'âne…) Pour $n = m = 2$ : $\mathcal{M}_2(\mathbb{K}) = \left\{\begin{pmatrix} a & b \\ c & d \end{pmatrix} : a, b, c, d \in \mathbb{K}\right\}$. Or

   $$
   \begin{pmatrix} a & b \\ c & d \end{pmatrix} = a\begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix} + b\begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix} + c\begin{pmatrix} 0 & 0 \\ 1 & 0 \end{pmatrix} + d\begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}
   $$

   donc $(E_{11}, E_{12}, E_{21}, E_{22})$ est génératrice de $\mathcal{M}_2(\mathbb{K})$. Et elle est libre car :

   $$
   aE_{11} + bE_{12} + cE_{21} + dE_{22} = 0 = \begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix} \Leftrightarrow \begin{pmatrix} a & b \\ c & d \end{pmatrix} = \begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix} \Leftrightarrow \begin{cases} a = 0 \\ b = 0 \\ c = 0 \\ d = 0 \end{cases}
   $$

   Donc c'est une base pour $n, m$ quelconques. Donc $\dim\mathcal{M}_{n,m}(\mathbb{K}) = n \times m$.
2. Âne qui trotte, et exemple déjà vu pour $AB \neq BA$, $AB = 0$ avec $A \neq 0$, $B \neq 0$.

**Définition.** On dit qu'une matrice $A \in \mathcal{M}_n(\mathbb{K})$ est carrée (même nombre de lignes et de colonnes) ; $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$ est une matrice carrée.

**Définition et proposition.** Une matrice $A \in \mathcal{M}_n(\mathbb{K})$ est dite **inversible** s'il existe une matrice $B \in \mathcal{M}_n(\mathbb{K})$ telle que $AB = BA = I_n$. Cette matrice $B$ est alors unique (et il suffit d'avoir $AB = I_n$ ou $BA = I_n$ pour qu'on ait $AB = BA = I_n$). On la note $B = A^{-1}$.

**Preuve (unicité).** Si $AB = BA = I_n$ et $AB' = B'A = I_n$, alors $BAB' = (BA)B' = I_n B' = B'$ et $BAB' = B(AB') = BI_n = B$. Ainsi $B' = B$.

**Définition.** L'ensemble des matrices inversibles de $\mathcal{M}_n(\mathbb{K})$ est un groupe (pour la multiplication des matrices), qu'on note $\mathcal{GL}_n(\mathbb{K})$ (car il s'identifie au groupe linéaire $\mathcal{GL}_n(\mathbb{K})$ formé des automorphismes de $\mathbb{K}^n$ ; on va voir cela…).

**Définition (matrice d'une application linéaire).** Soient $E$ un $\mathbb{K}$-ev de dimension $m$, $F$ un $\mathbb{K}$-ev de dimension $n$, $B_E = (e_1, \dots, e_m)$ une base de $E$, $B_F = (f_1, \dots, f_n)$ une base de $F$, $\phi \in \mathcal{L}(E, F)$. Écrivons $\phi(e_j) = \displaystyle\sum_{i=1}^{n} a_{ij} f_i$. On appelle matrice de $\phi$ par rapport aux bases $B_E, B_F$ la matrice

$$
A = (a_{ij}) = \begin{pmatrix}
a_{11} & a_{12} & \dots & a_{1m} \\
a_{21} & a_{22} & \dots & a_{2m} \\
\vdots & \vdots & \ddots & \vdots \\
a_{n1} & a_{n2} & \dots & a_{nm}
\end{pmatrix}
$$

**Nota bene.** La $j$-ème colonne de $\text{Mat}_{B_E, B_F}(\phi)$ donne (de haut en bas) les coordonnées de $\phi(e_j)$ dans la base $B_F$.

**Proposition.** Sous les hypothèses et notations de la définition, si on note $X = \begin{pmatrix} x_1 \\ \vdots \\ x_m \end{pmatrix}$ la colonne des coordonnées d'un vecteur $x$ de $E$ dans la base $B_E$ ($x = \displaystyle\sum_{j=1}^{m} x_j e_j$) et $Y = \begin{pmatrix} y_1 \\ \vdots \\ y_n \end{pmatrix}$ la colonne des coordonnées d'un vecteur $y$ de $F$ dans la base $B_F$ ($y = \displaystyle\sum_{i=1}^{n} y_i f_i$), alors :

$$
y = \phi(x) \Leftrightarrow Y = AX \quad \text{où } A = \text{Mat}_{B_E, B_F}(\phi)
$$

***Démonstration.*** $y = \displaystyle\sum_{i=1}^{n} y_i f_i$ et $x = \displaystyle\sum_{j=1}^{m} x_j e_j \Rightarrow \phi(x) = \sum_{j=1}^{m} x_j\phi(e_j) = \sum_{j=1}^{m} x_j\sum_{i=1}^{n} a_{ij} f_i = \sum_{i=1}^{n}\left(\sum_{j=1}^{m} a_{ij} x_j\right) f_i$. Donc $y = \phi(x) \Leftrightarrow \forall i \in \{1, \dots, n\}$, $y_i = \displaystyle\sum_{j=1}^{m} a_{ij} x_j$

$$
\Leftrightarrow \begin{pmatrix} y_1 \\ \vdots \\ y_n \end{pmatrix} = \begin{pmatrix}
a_{11} & a_{12} & \dots & a_{1m} \\
a_{21} & a_{22} & \dots & a_{2m} \\
\vdots & \vdots & \ddots & \vdots \\
a_{n1} & a_{n2} & \dots & a_{nm}
\end{pmatrix} \begin{pmatrix} x_1 \\ \vdots \\ x_m \end{pmatrix} = \begin{pmatrix}
a_{11}x_1 + a_{12}x_2 + \dots + a_{1m}x_m \\
a_{21}x_1 + a_{22}x_2 + \dots + a_{2m}x_m \\
\vdots \\
a_{n1}x_1 + a_{n2}x_2 + \dots + a_{nm}x_m
\end{pmatrix}
$$

**Proposition (correspondance entre matrices et applications linéaires : suite).** Soient $E, F$ des $\mathbb{K}$-ev de dimension finie, $B_E$ une base de $E$, $B_F$ une base de $F$, $\Phi, \Psi \in \mathcal{L}(E, F)$. Alors :

1. $\text{Mat}_{B_E, B_F}(\Phi + \Psi) = \text{Mat}_{B_E, B_F}(\Phi) + \text{Mat}_{B_E, B_F}(\Psi)$
2. $\forall \lambda \in \mathbb{K}$, $\text{Mat}_{B_E, B_F}(\lambda\Phi) = \lambda\text{Mat}_{B_E, B_F}(\Phi)$.
3. Si $G$ est un troisième $\mathbb{K}$-ev de $\dim < \infty$, $\Phi \in \mathcal{L}(E, F)$, $\Psi \in \mathcal{L}(F, G)$, et $B_G$ une base de $G$, alors $\text{Mat}_{B_E, B_G}(\Psi \circ \Phi) = \text{Mat}_{B_F, B_G}(\Psi) \times \text{Mat}_{B_E, B_F}(\Phi)$.

***Démonstration*** (du 3). $y = \displaystyle\sum_{i=1}^{n} y_i f_i$ et $x = \displaystyle\sum_{j=1}^{m} x_j e_j \Rightarrow \phi(x) = \sum_{j=1}^{m} x_j\phi(e_j) = \sum_{i=1}^{n}\left(\sum_{j=1}^{m} a_{ij}x_j\right)f_i$, et $z = \Psi(y) = \Psi \circ \Phi(x) = \displaystyle\sum_{i=1}^{n}\sum_{j=1}^{m} a_{ij}x_j\Psi(f_i)$ avec $\Psi(f_i) = \displaystyle\sum_{k=1}^{l} b_{ki}g_k$. Donc

$$
\Psi \circ \Phi(x) = \sum_{i=1}^{n}\sum_{j=1}^{m}\sum_{k=1}^{l} a_{ij}b_{ki}x_j g_k = \sum_{k=1}^{l}\left(\sum_{j=1}^{m}\left(\sum_{i=1}^{n} b_{ki}a_{ij}\right)x_j\right)g_k = \sum_{k=1}^{l}\left(\sum_{j=1}^{m} c_{kj}x_j\right)g_k
$$

Donc les coordonnées dans $B_G$ de $\Psi \circ \Phi(x)$ sont les $\left(\displaystyle\sum_{j=1}^{m} c_{kj}x_j\right)$, i.e. $\text{Mat}_{B_E, B_G}(\Psi \circ \Phi) = C = BA$.

**Corollaire.** Soient $E, F$ des $\mathbb{K}$-ev de $\dim < \infty$, $B_E, B_F$ des bases, $\Phi \in \mathcal{L}(E, F)$, $A = \text{Mat}_{B_E, B_F}(\Phi)$. Alors $\Phi$ est bijective $\Leftrightarrow A$ est inversible. Et alors $\text{Mat}_{B_F, B_E}(\Phi^{-1}) = (\text{Mat}_{B_E, B_F}\Phi)^{-1}$.

***Démonstration*** (pour $F = E$, $B_F = B_E$). Si $\Phi$ est bijective : $\Phi \circ \Phi^{-1} = \text{id}_E \Rightarrow \text{Mat}(\Phi) \cdot \text{Mat}(\Phi^{-1}) = \text{Mat}(\text{id}_E) = I_n$ (où $n = \dim(E)$). Et réciproquement, si $\text{Mat}(\Phi)$ est inversible, soit $\Psi \in \mathcal{L}(E)$ tel que $\text{Mat}_{B_E}\Psi = (\text{Mat}_{B_E}\Phi)^{-1}$ : alors $\text{Mat}(\Phi \circ \Psi) = \text{Mat}_{B_E}\text{id}_E \Rightarrow \Phi \circ \Psi = \text{id}_E \Rightarrow \Psi = \Phi^{-1}$.

**Définition (matrice de passage).** Soient $E$ un $\mathbb{K}$-ev de $\dim(E) = n < \infty$, $B, B'$ deux bases de $E$ : $B = (e_1, \dots, e_n)$, $B' = (e'_1, \dots, e'_n)$. On appelle **matrice de passage** $P$ de $B$ à $B'$ la matrice de $\text{id}_E$ où $E$ est muni de la base $B'$ au départ et de la base $B$ à l'arrivée :

$$
\begin{cases} (E, B') \to (E, B) \\ P = \text{Mat}_{B', B}(\text{id}_E) \end{cases}
$$

**Nota bene.** Les colonnes de $P$ sont les colonnes de coordonnées des $e'_j$ dans la base $(e_1, \dots, e_n) = B$.

**Exemple.** $E = \mathbb{R}^2$, $B = ((1, 0), (0, 1))$, $B' = ((1, 1), (1, -1))$ :

$$
\begin{cases} e'_1 = e_1 + e_2 \\ e'_2 = e_1 - e_2 \end{cases} \Rightarrow P = \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}
$$

**Proposition.** Soit $E$ un $\mathbb{K}$-ev de $\dim(E) = n < \infty$. Soient $B, B'$ deux bases de $E$. Soient $x \in E$, $X$ la colonne de ses coordonnées dans la base $B$ et $X'$ la colonne de ses coordonnées dans la base $B'$. Si $P$ est la matrice de passage de $B$ à $B'$, alors $X = PX'$ (autrement dit : $X' = P^{-1}X$). Noter que $P^{-1}$ est la matrice de passage de $B'$ à $B$ : $(E, B') \to (E, B)$ par $P$ et $(E, B) \to (E, B')$ par $P^{-1}$.

***Démonstration.*** On a vu que $y = f(x) \Leftrightarrow Y = AX$ où $A$ est la matrice de $f$. Ici, on a $X'$ (et non $X$) au départ, $X$ à l'arrivée, donc $x = \text{id}_E(x) \Leftrightarrow X = PX'$.

**Théorème de changement de base.** Soient $E, F$ deux $\mathbb{K}$-ev de dimensions finies, $B_1, B'_1$ deux bases de $E$, $B_2, B'_2$ deux bases de $F$, $P$ la matrice de passage de $B_1$ à $B'_1$ et $Q$ la matrice de passage de $B_2$ à $B'_2$. Soient $f \in \mathcal{L}(E, F)$, $A = \text{Mat}_{B_1, B_2}(f)$, $A' = \text{Mat}_{B'_1, B'_2}(f)$. Alors

$$
A' = Q^{-1}AP
$$

**En particulier.** Si $F = E$ et $B_2 = B_1$ et $B'_2 = B'_1$, alors $Q = P$ et

$$
A' = P^{-1}AP
$$

***Démonstration.*** $(E, B'_1) \xrightarrow{\text{id}_E} (E, B_1) \xrightarrow{f} (F, B_2) \xrightarrow{\text{id}_F} (F, B'_2)$. On compose $\text{id}_F \circ f \circ \text{id}_E$ et les matrices : $A' = \text{Mat}_{B_2, B'_2}(\text{id}_F)\,\text{Mat}_{B_1, B_2}(f)\,\text{Mat}_{B'_1, B_1}(\text{id}_E) = Q^{-1}AP$.

**Définition.**

- Deux matrices $A, B$ de $\mathcal{M}_{n,m}(\mathbb{K})$ sont dites équivalentes s'il existe $P \in \mathcal{M}_m(\mathbb{K})$ inversible et $Q \in \mathcal{M}_n(\mathbb{K})$ inversible telles que $B = Q^{-1}AP$. Cela revient à dire qu'il existe une application linéaire de $\mathbb{K}^m$ dans $\mathbb{K}^n$ dont $A$ et $B$ sont les matrices relativement à certaines bases.
- Deux matrices $A, B \in \mathcal{M}_n(\mathbb{K})$ sont dites semblables s'il existe $P \in \mathcal{M}_n(\mathbb{K})$ inversible telle que $B = P^{-1}AP$. Cela revient à dire que $A$ et $B$ sont les matrices d'un endomorphisme de $\mathbb{K}^n$ relativement à deux bases $B_A$ (au départ et à l'arrivée) et $B_B$ (au départ et à l'arrivée) respectivement.

## Matrice transposée et symétrique

**Définition.** Soit $A \in \mathcal{M}_{n,m}(\mathbb{K})$. On appelle transposée de $A$, et on note ${}^tA$, la matrice de $\mathcal{M}_{m,n}(\mathbb{K})$ obtenue en mettant les colonnes de $A$ en lignes (ou les lignes de $A$ en colonnes : ça revient au même).

**Exemple.** ${}^t\begin{pmatrix} a & b \\ c & d \end{pmatrix} = \begin{pmatrix} a & c \\ b & d \end{pmatrix}$.

**Définition.** Une matrice carrée $A \in \mathcal{M}_n(\mathbb{K})$ est dite symétrique si et seulement si ${}^tA = A$, antisymétrique si ${}^tA = -A$.

**Exemples.** Les matrices symétriques sont, pour $n = 2$ :

$$
\begin{pmatrix} a & b \\ b & d \end{pmatrix} = a\begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix} + b\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix} + d\begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}
$$

En effet : ${}^t\begin{pmatrix} a & b \\ c & d \end{pmatrix} = \begin{pmatrix} a & b \\ c & d \end{pmatrix} \Leftrightarrow c = b$. Noter que la transposition est une symétrie par rapport à la diagonale : ${}^t\begin{pmatrix} a & b \\ c & d \end{pmatrix} = \begin{pmatrix} a & c \\ b & d \end{pmatrix}$.

Pour $n$ quelconque : l'ensemble des matrices symétriques de $\mathcal{M}_n(\mathbb{K})$ est le sev $Sym_n(\mathbb{K})$ de $\mathcal{M}_n(\mathbb{K})$ engendré par les $E_{ii}$ ($1 \leq i \leq n$) et les $E_{ij} + E_{ji}$ ($1 \leq i < j \leq n$). Clairement : $\dim(Sym_n(\mathbb{K})) = n + \dfrac{n^2 - n}{2} = \dfrac{n(n+1)}{2}$.

${}^t(a_{ij}) = (a_{ji})$ : la transposition échange les indices, donc $(a_{ij})$ est symétrique $\Leftrightarrow a_{ij} = a_{ji}, \forall i$ et $\forall j$.

Pour $n = 3$ :

$$
\begin{pmatrix} 0 & a & b \\ -a & 0 & c \\ -b & -c & 0 \end{pmatrix} = a(E_{12} - E_{21}) + b(E_{13} - E_{31}) + c(E_{23} - E_{32})
$$

Pour $n$ général : l'ensemble $Ant_n(\mathbb{K})$ des matrices antisymétriques de $\mathcal{M}_n(\mathbb{K})$ est le sev engendré par les $E_{ij} - E_{ji}$ ($1 \leq i < j \leq n$), donc

$$
\dim(Ant_n(\mathbb{K})) = \frac{n^2 - n}{2} = \frac{n(n-1)}{2}
$$

## Trace

**Définition.** On appelle **trace** d'une matrice carrée $A = (a_{ij}) \in \mathcal{M}_n(\mathbb{K})$ le scalaire $tr(A) = \displaystyle\sum_{i=1}^{n} a_{ii}$ (la somme des éléments diagonaux).

**Proposition.**

1. $tr({}^tA) = tr(A), \forall A \in \mathcal{M}_n(\mathbb{K})$
2. $tr(AB) = tr(BA), \forall A, B \in \mathcal{M}_n(\mathbb{K})$
3. Deux matrices semblables ont la même trace. Et donc deux matrices $A, A'$ d'un même endomorphisme (relativement à des bases identiques au départ et à l'arrivée) ont même trace.

***Démonstration.***

1. $tr({}^tA) = tr(A)$ car les éléments de la diagonale de ${}^tA$ sont les mêmes que ceux de la diagonale de $A$ :

   $$
   \begin{pmatrix} a_{11} & & a_{ij} \\ & \ddots & \\ a_{ji} & & a_{nn} \end{pmatrix}
   $$

2. $A = (a_{ij})$, $B = (b_{ij}) \Rightarrow AB = (c_{ij})$ où $c_{ij} = \displaystyle\sum_{k=1}^{n} a_{ik}b_{kj}$. Donc $tr(AB) = \displaystyle\sum_{i=1}^{n} c_{ii} = \sum_{i=1}^{n}\sum_{k=1}^{n} a_{ik}b_{ki}$. De même, en échangeant les $a$ et les $b$ : $tr(BA) = \displaystyle\sum_{i=1}^{n}\sum_{k=1}^{n} b_{ik}a_{ki} = \sum_{i=1}^{n}\sum_{k=1}^{n} a_{ki}b_{ik} = tr(AB)$.
3. $tr(P^{-1}AP) = tr(APP^{-1}) = tr(A)$.

**Nota bene.** La trace est un invariant : étant donné un endomorphisme $f$ de $E$ ($\dim(E) < \infty$), quand je change de base dans $E$, la matrice de $f$ change mais sa trace ne change pas.
