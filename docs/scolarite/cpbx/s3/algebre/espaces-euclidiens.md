---
title: "Espaces vectoriels euclidiens"
description: "Espaces vectoriels euclidiens et préhilbertiens : produit scalaire, inégalités de Cauchy-Schwarz et de Minkowski, orthogonalité, bases orthonormées, projection orthogonale, adjoint, endomorphismes symétriques et orthogonaux, réduction des matrices symétriques et distance à un sous-espace."
sidebar_position: 5
---

## Produit scalaire

Soit $E$ un espace vectoriel.

**Définition 1.** Un produit scalaire sur $E$ est une application bilinéaire symétrique définie positive. Cela veut dire que $\phi : E \times E \to \mathbb{K}$ est un produit scalaire lorsque :

- $\phi(x + \lambda x', y) = \phi(x, y) + \lambda \phi(x', y)$ et $\phi(x, y + \lambda y') = \phi(x, y) + \lambda \phi(x, y')$ : bilinéaire ;
- $\phi(x, y) = \phi(y, x)$ : symétrique ;
- $(\phi(x, x) \geq 0)$ et $(\phi(x, x) = 0 \Leftrightarrow x = 0)$ : définie positive.

**Définition 2.** On appelle espace euclidien (e.v.e) un espace vectoriel de dimension finie muni d'un produit scalaire. On parle d'espace vectoriel préhilbertien si $\dim(E) = +\infty$.

**Exemples fondamentaux.**

1. $E = \mathbb{R}^n$ et $\phi(x, y) = \displaystyle\sum_{i=1}^{n} x_i y_i$. Vérifions que c'est un produit scalaire.
2. $E = \mathcal{M}_n(\mathbb{R})$ et $\phi(A, B) = tr({}^tA B)$.
3. $E = C^0([0, 1])$, et $\phi(f, g) = \int_0^1 f(t) g(t)\,dt$.

**Remarque.** Quand on prouve les 3 exemples, si on a prouvé la symétrie, alors on a la linéarité par rapport à la première variable et par rapport à la deuxième variable.
En effet $f(x, y + \lambda y') = f(y + \lambda y', x) = f(y, x) + \lambda f(y', x) = f(x, y) + \lambda f(x, y')$.

**Démonstration.** (Preuve de la définition 1.)

1. Symétrie : soient $(x, y) \in \mathbb{R}^n \times \mathbb{R}^n$, $\phi(y, x) = \displaystyle\sum_{i=1}^{n} y_i x_i = \sum_{i=1}^{n} x_i y_i = \phi(x, y)$.
2. Bilinéarité : soient $(x, x') \in \mathbb{R}^n \times \mathbb{R}^n$, $\lambda \in \mathbb{K}$ et $y \in \mathbb{R}^n$. Alors $\phi(x + \lambda x', y) = \displaystyle\sum_{i=1}^{n} (x_i + \lambda x'_i) y_i = \sum_{i=1}^{n} x_i y_i + \lambda \sum_{i=1}^{n} x'_i y_i = \phi(x, y) + \lambda \phi(x', y)$. Donc $\phi$ est linéaire par rapport à la première variable et, puisqu'elle est symétrique, elle est bilinéaire.
3. $\phi$ est définie positive. Soit $x \in \mathbb{R}^n$, alors $\phi(x, x) = \displaystyle\sum_{i=1}^{n} x_i x_i = \sum_{i=1}^{n} x_i^2 \geq 0$. De plus, si $\phi(x, x) = 0$, alors $\displaystyle\sum_{i=1}^{n} x_i^2 = 0$, et puisque $x_i^2 \geq 0$ pour chaque $i$, on a $x_i = 0$ pour $i = 1, \dots, n$, donc $x = 0$.

$\square$

**Remarque.** $x = 0 \Rightarrow \phi(x, x) = 0$ est triviale.

**Remarque.** Identité remarquable : soit $\phi$ une forme bilinéaire symétrique (en particulier si $\phi$ est un produit scalaire) ; alors on a l'identité suivante : $\phi(x + y, x + y) = \phi(x, x) + \phi(y, y) + 2\phi(x, y)$.

**Démonstration.** Triviale. $\square$

**Théorème V.3.** (Inégalité de Cauchy-Schwarz) Soit $\phi : E \times E \to \mathbb{K}$ un produit scalaire. Alors $\forall (x, y) \in E \times E$,

$$
|\phi(x, y)| \leq \sqrt{\phi(x, x)} \sqrt{\phi(y, y)}
$$

De plus, c'est une égalité si et seulement si $(x, y)$ est liée.

**Démonstration.** (À savoir.) Pour simplifier, on suppose que $\mathbb{K} = \mathbb{R}$. Soit $x, y \in E$. Considérons l'application $f : \mathbb{R} \to \mathbb{R}$ définie par $f(t) = \langle x + ty, x + ty \rangle$. On a

$$
f(t) = t^2 \langle y, y \rangle + 2t \langle x, y \rangle + \langle x, x \rangle
$$

et $f(t) \geq 0$ pour tout $t$. Comme $f$ est un polynôme du second degré, on en déduit que son discriminant est négatif :

$$
\langle x, y \rangle^2 - \langle x, x \rangle \langle y, y \rangle \leq 0
$$

Par suite $\langle x, y \rangle^2 - \langle x, x \rangle \langle y, y \rangle \leq 0$ et le résultat est obtenu en prenant la racine carrée. $\square$

**Théorème V.4.** (Minkowski) $\forall (x, y) \in E \times E$,

$$
\sqrt{\phi(x + y, x + y)} \leq \sqrt{\phi(x, x)} + \sqrt{\phi(y, y)}
$$

**Démonstration.** On démarre avec Cauchy-Schwarz : $\phi(x, y) \leq \sqrt{\phi(x, x)} \times \sqrt{\phi(y, y)}$. Donc $\phi(x, x) + \phi(y, y) + 2\phi(x, y) \leq \phi(x, x) + \phi(y, y) + 2\sqrt{\phi(x, x)} \times \sqrt{\phi(y, y)} = (\sqrt{\phi(x, x)} + \sqrt{\phi(y, y)})^2$.
En prenant la racine, on obtient le résultat. $\square$

**Remarque.** Pour trouver la preuve, il faut partir de la fin.

**Théorème V.5.** (À retenir.) Soit $\phi$ un produit scalaire. Alors l'application $N : E \to \mathbb{R}$, définie par $N(x) = \sqrt{\phi(x, x)}$, est une norme sur $E$ (voir le cours d'analyse pour la définition d'une norme). On l'appelle la norme associée à (ou induite par) le produit scalaire $\phi$.

**Démonstration.** (À savoir.) Prouvons que $N$ vérifie les axiomes d'une norme :

- (positivité) $N(x) = \sqrt{\phi(x, x)}$ est une racine positive ; de plus $N(x) = 0 \Leftrightarrow \phi(x, x) = 0 \Leftrightarrow x = 0$ car $\phi$ est défini positif ;
- (homogénéité) soit $\lambda \in \mathbb{R}$ et $x \in E$, alors $N(\lambda x) = \sqrt{\phi(\lambda x, \lambda x)} = \sqrt{\lambda^2 \phi(x, x)} = |\lambda| \sqrt{\phi(x, x)} = |\lambda| N(x)$ ;
- (inégalité triangulaire) soient $(x, y) \in E \times E$, alors $N(x + y) = \sqrt{\phi(x + y, x + y)} \leq \sqrt{\phi(x, x)} + \sqrt{\phi(y, y)} = N(x) + N(y)$.

$\square$

**Remarque.** Des fois, le produit scalaire se note $\phi(x, y) = \langle x, y \rangle$ et $N(x) = ||x||$. On peut alors réécrire l'identité remarquable : $||x + y||^2 = ||x||^2 + ||y||^2 + 2\langle x, y \rangle$.
On peut aussi réécrire Cauchy-Schwarz : $|\langle x, y \rangle| \leq ||x||.||y||$ et Minkowski : $||x + y|| \leq ||x|| + ||y||$.

**Remarque.** On réserve la notation $x.y$ au cas $E = \mathbb{R}^n$ et $x.y = \displaystyle\sum_{i=1}^{n} x_i y_i$.

**Remarque.** Soient $f$ et $g$ dans $C^0([0, 1])$. Alors on a $\left|\int_0^1 f(x) g(x)\,dx\right| \leq \sqrt{\int_0^1 f(x)^2\,dx} \sqrt{\int_0^1 g(x)^2\,dx}$.
Ceci provient de $\begin{cases} (f, g) \mapsto \int_0^1 fg \text{ est un produit scalaire sur } C^0([0, 1]) \\ \text{Cauchy-Schwarz} \end{cases}$. On peut ainsi définir $||f|| = \sqrt{\langle f, f \rangle} = \sqrt{\int_0^1 f^2(x)\,dx}$.

**Remarque.** On a beaucoup de notions : distance $d(x, y)$, normes $N(x)$ et produits scalaires $\langle x, y \rangle$. Si on a un produit scalaire, on peut fabriquer une norme, et si on a une norme, on peut fabriquer une distance. Quand une norme est induite par un produit scalaire, elle est dite euclidienne.

## Orthogonalité

Dans tout ce chapitre, $E$ est un espace vectoriel muni d'un produit scalaire noté $\langle ., . \rangle$.

**Définition 1.** Soit $(x, y) \in E \times E$. On dit que $x$ et $y$ sont orthogonaux si $\langle x, y \rangle = 0$.

**Définition 2.** Soit $(x_1, \dots, x_N)$ une famille de $E$. On dit qu'elle est :

- orthogonale si les $x_i$ sont orthogonaux 2 à 2, c'est-à-dire $i \neq j \Rightarrow \langle x_i, x_j \rangle = 0$ ;
- orthonormale si elle est orthogonale et que $\forall i = 1, \dots, N$ on a $||x_i|| = 1$.

**Remarque.** Ici et dans ce chapitre, $||.||$ désigne la norme induite par $\langle ., . \rangle$.

**Théorème V.3.** (Pythagore) Soient $(x, y) \in E \times E$. Alors $x$ et $y$ sont orthogonaux si et seulement si $||x + y||^2 = ||x||^2 + ||y||^2$.

**Démonstration.** (À savoir.) $||x + y||^2 = ||x||^2 + ||y||^2 + 2\langle x, y \rangle$. Ainsi $||x + y||^2 = ||x||^2 + ||y||^2$ si et seulement si $\langle x, y \rangle = 0$. $\square$

**Remarque.** Cela se généralise à $N$ vecteurs orthogonaux $(x_1, \dots, x_N)$ : $||x_1 + \dots + x_N||^2 = ||x_1||^2 + \dots + ||x_N||^2$.

**Proposition 4.** Toute famille orthogonale ne contenant pas le vecteur nul est libre.

**Démonstration.** (À savoir.) Soit $(x_1, \dots, x_n)$ une famille orthogonale telle que $\displaystyle\sum_{1}^{N} \lambda_i x_i = 0$, où les $(\lambda_i)_{i=1,\dots,N}$ sont des scalaires. On fixe $j$ et on fait le produit scalaire avec $x_j$ ; on a alors $\Big\langle \displaystyle\sum_{i=1}^{N} \lambda_i x_i, x_j \Big\rangle = \langle 0, x_j \rangle = 0$.
Donc, puisque $\langle x_i, x_j \rangle = 0$ si $i \neq j$, on a $\lambda_j \langle x_j, x_j \rangle = 0$. Or $x_j \neq 0$, donc $\langle x_j, x_j \rangle \neq 0$. Donc $\lambda_j = 0$ ; puisque ceci est valable pour tout $j$ de 1 à $N$, la famille est libre. $\square$

**Définition 5.** Soit $A \subset E$. On définit "l'orthogonal de $A$", noté $A^\perp$, comme

$$
A^\perp := \{x \in E, \forall a \in A, \langle x, a \rangle = 0\}
$$

**Exemple.** Si $E = \mathbb{R}^3$ et $\langle x, y \rangle = x.y$, et si

- $A = \{(0, 0, 1)\}$, alors $A^\perp$ = plan $(Oxy)$ ;
- $A = \text{Vect}((0, 1, 0), (1, 0, 0))$, alors $A^\perp = \text{Vect}(0, 0, 1)$.

**Exemple.** En général, si $A = \{0\}$, alors $A^\perp = E$. En effet $\langle x, 0 \rangle = 0\ \forall x \in E$. Si $A = E$, alors $E^\perp = \{0\}$. En effet, soit $x \in E^\perp$. Alors $\forall y \in E, \langle x, y \rangle = 0$. En particulier si $y = x$, on a $\langle x, x \rangle = 0$, donc $x = 0$.

**Lemme 6.** Soit $A \subset E$. Alors $A^\perp$ est un sev de $E$. De plus, si $A = \{x\}$, alors $A^\perp$ est un hyperplan de $E$.

**Démonstration.** Soit $x$ et $y$ dans $A^\perp$, et $\lambda \in \mathbb{R}$. Soit $a \in A$ ; on a $\langle x + \lambda y, a \rangle = \langle x, a \rangle + \lambda \langle y, a \rangle = 0$. Donc $x + \lambda y \in A^\perp$. Donc $A^\perp$ est un sev de $E$.
On a $t \in \{x\}^\perp \Leftrightarrow \langle t, x \rangle = 0$. Soit $\phi : \begin{cases} E \to \mathbb{R} \\ v \mapsto \langle v, x \rangle \end{cases}$.
Alors $\phi$ est une forme linéaire sur $E$. De plus $\text{Ker}\,\phi = \{v \in E, \langle v, x \rangle = 0\}$. Ainsi $\{x\}^\perp = \text{Ker}\,\phi$. Donc c'est un hyperplan, en tant que noyau d'une forme linéaire. $\square$

**Théorème V.7.** Tout espace vectoriel euclidien admet une BON (base orthonormée).

**Démonstration.** On montre cela par récurrence sur la dimension.

- Si $\dim(E) = 1$. Soit $x \in E$ tel que $||x|| = 1$ : c'est une base de $E$, elle est orthonormale.
- Supposons la propriété vraie au rang $n - 1$. Soit $E$ de dimension $n$. Soit $x \in E \setminus \{0\}$. On note $H = \{x\}^\perp$. Alors $H$ est un eve de dimension $n - 1$ par le L6. Donc, par hypothèse de récurrence, il admet une BON $(e_1, \dots, e_{n-1})$. Alors $\Big(e_1, \dots, e_{n-1}, \dfrac{x}{||x||}\Big)$ est une BON de $E$ ; en effet :
  - $\Big\langle \dfrac{x}{||x||}, e_i \Big\rangle = 0\ \forall i = 1, \dots, n - 1$ ;
  - $\Big|\Big|\dfrac{x}{||x||}\Big|\Big| = 1$.

  Donc la propriété est vraie au rang $n$. Elle est vraie par récurrence.

$\square$

**Théorème V.8.** (Procédé de Gram-Schmidt) Soit $E$ un eve, et $p < \dim(E)$ un entier. Soit $(x_1, \dots, x_p)$ une famille libre. Alors il existe $(v_1, \dots, v_p)$ une famille orthonormale telle que : $\forall k \in [1, p], \text{Vect}(v_1, \dots, v_k) = \text{Vect}(x_1, \dots, x_k)$.

**Démonstration.** Importante, prochaine fois. $\square$

**Proposition 9.** Soit $A$ et $B$ inclus dans un eve $E$. Alors

- $A \subset B \Rightarrow B^\perp \subset A^\perp$ ;
- $A^\perp = (\text{Vect}(A))^\perp$.

Soit $F$ et $G$ deux sev de $E$, alors

- $(F + G)^\perp = (F^\perp) \cap (G^\perp)$ ;
- $(F \cap G)^\perp = (F^\perp) + (G^\perp)$.

**Démonstration.**

- Supposons $A \subset B$. Soit $x \in B^\perp$. Cela vaut $\forall b \in B, \langle x, b \rangle = 0$. Soit $a \in A$. Alors $a \in B$ puisque $A \subset B$. Donc $\langle x, a \rangle = 0$. Donc on a montré que $\forall a \in A, \langle x, a \rangle = 0$. Donc $x \in A^\perp$. Donc $B^\perp \subset A^\perp$.
- On rappelle que $\text{Vect}(A)$ est le sev engendré par les vecteurs de $A$ ; c'est aussi le plus petit sev de $E$ contenant $A$. En particulier $A \subset \text{Vect}(A)$. Donc $(\text{Vect}(A))^\perp \subset A^\perp$ par le premier point. Montrons l'inclusion réciproque. Soit $x \in A^\perp$. Soit $v \in \text{Vect}(A)$ ; alors $v$ s'écrit $\displaystyle\sum_{i=1}^{N} \gamma_i a_i$, où $a_i \in A$.
  Ainsi $\langle x, v \rangle = \displaystyle\sum_{i=1}^{N} \gamma_i \langle x, a_i \rangle = 0$. Donc $x \in (\text{Vect}(A))^\perp$.

$\square$

**Théorème V.10.** Soit $F$ un sev de $E$. Alors

- $E = F \oplus F^\perp$ ;
- soit $(e_1, \dots, e_p)$ une base orthonormée de $F$ ; alors la projection $P_F$ sur $F$, parallèlement à $F^\perp$, vérifie

  $$
  P_F(x) = \sum_{i=1}^{p} \langle x, e_i \rangle e_i
  $$

- en particulier, $\forall x \in E, x = \displaystyle\sum_{i=1}^{n} \langle x, e_i \rangle e_i$, si $(e_1, \dots, e_n)$ est une base orthonormée de $E$ ;
- $\dim(F^\perp) = \dim(E) - \dim(F)$.

**Démonstration.** (À savoir.) On note $\tilde{x} = \displaystyle\sum_{i=1}^{p} \langle x, e_i \rangle e_i$. On a $\tilde{x} \in F$, car c'est une combinaison linéaire de vecteurs qui sont dans $F$. Montrons que $x - \tilde{x} \in F^\perp$. Soit $i \in [1, p]$ fixé ; calculons $\langle x - \tilde{x}, e_i \rangle$ :

$$
\begin{aligned}
\langle x - \tilde{x}, e_i \rangle &= \langle x, e_i \rangle - \langle \tilde{x}, e_i \rangle = \langle x, e_i \rangle - \Big\langle \sum_{j=1}^{p} \langle x, e_j \rangle e_j, e_i \Big\rangle \\
&= \langle x, e_i \rangle - \sum_{j=1}^{p} \langle x, e_j \rangle \underbrace{\langle e_j, e_i \rangle}_{\delta_{ij} \text{ car BON}} = \langle x, e_i \rangle - \langle x, e_i \rangle = 0
\end{aligned}
$$

Donc $(x - \tilde{x}) \perp e_i$, donc $x - \tilde{x} \in \text{Vect}(e_i)^\perp = F^\perp$.
Conclusion : $x = \underbrace{\tilde{x}}_{\in F} + \underbrace{(x - \tilde{x})}_{\in F^\perp}$. Donc $E = F + F^\perp$. Montrons que la somme est directe : soit $x \in F \cap F^\perp$.
Alors $\langle \underbrace{x}_{\in F}, \underbrace{x}_{\in F^\perp} \rangle = 0 = ||x||^2$, donc $x = 0$. Donc $F \cap F^\perp = \{0\}$, et la somme est directe.
On a montré les deux premiers points, puisque $\tilde{x}$, étant le vecteur de $F$ tel que $x - \tilde{x} \perp \tilde{x}$, est bien $P_F(x)$.
En particulier, le 3ème point découle directement, avec $F = E$, puis puisque

$$
E = F \oplus F^\perp, \quad \dim(F) + \dim(F^\perp) = \dim(E)
$$

$\square$

**Exercice.** Quel est le projeté de $x$ sur $\text{Vect}(x_1)$, parallèlement à $\text{Vect}(x_2)$ ? Ce n'est pas une projection orthogonale.
Ici, si on projette $x$ sur $\text{Vect}(x_1)$ parallèlement à $\text{Vect}(x_2)$, on calcule cela avec $\langle x, x_1 \rangle$ ; on a

$$
P(x) = \langle x, x_1 \rangle x_1
$$

**Proposition 11.** Soit $E$ un eve et $\underbrace{(e_1, \dots, e_n)}_{B}$ une base orthonormée de $E$. Soit $x$ et $y$ dans $E$. Soit $X = MAT_B(x)$ et $Y = MAT_B(y)$. Ainsi, $X \in \mathcal{M}_{n,1}(\mathbb{R})$ et $Y \in \mathcal{M}_{n,1}(\mathbb{R})$. Alors

$$
\langle x, y \rangle = {}^tX \times Y
$$

**Démonstration.** Calcul matriciel. $\square$

## Endomorphismes particuliers dans un espace vectoriel euclidien

### Les endomorphismes symétriques

**Définition / Proposition 0.** Soit $u \in \mathcal{L}(E)$. Il existe un autre endomorphisme, noté $u^*$, appelé adjoint de $u$, tel que

$$
\forall (x, y) \in E \times E, \langle u(x), y \rangle = \langle x, u^*(y) \rangle
$$

De plus, si $M$ est la matrice de $u$ dans une base orthonormée, alors ${}^tM$ est la matrice de $u^*$ dans cette base.

**Démonstration.** Soient $x$ et $y$ dans $E$, $B$ une base orthonormée fixée, et $M = MAT_B(u)$. Alors $\langle u(x), y \rangle = {}^t(MX) Y = {}^tX\, {}^tM Y$. On pose $u^*(y) = {}^tM Y$ ; ainsi $u^*$ est l'endomorphisme dont ${}^tM$ est la matrice dans $B$. Alors ${}^tX\, {}^tM Y = \langle x, u^*(y) \rangle$.
Montrons que c'est unique. Soient $M_1$ et $M_2$ deux matrices telles que ${}^tX M_1 Y = {}^tX M_2 Y, \forall X, Y \in \mathcal{M}_{n,1}(\mathbb{R})$. Montrons que $M_1 = M_2$. On évalue cette égalité pour $X = e_i$ et $Y = e_j$, où $(e_i)$ est la base canonique.
Alors $M_1 e_j$ est la $j$-ème colonne de $M_1$, puis ${}^te_i M_1 e_j$ est le coefficient $(i, j)$ de $M_1$. Ainsi, ${}^te_i M_1 e_j = {}^te_i M_2 e_j, \forall (i, j)$, veut bien dire que $M_1 = M_2$. $\square$

**Définition 1.** Soit $u \in \mathcal{L}(E)$. Alors $u$ est symétrique si et seulement si $u^* = u$, c'est-à-dire si et seulement si

$$
\forall (x, y) \in E \times E, \langle u(x), y \rangle = \langle x, u(y) \rangle
$$

**Remarque.** Rien à voir avec les symétries, les endomorphismes tels que $S^2 = Id$.

**Corollaire 2.** Soit $u$ symétrique ; alors sa matrice $S$ dans une base orthonormée est symétrique, c'est-à-dire

$$
{}^tS = S
$$

On note $S_n(\mathbb{R})$ les matrices symétriques de taille $n \times n$.

**Proposition 3.** $\forall S \in S_n(\mathbb{R})$, $S^k \in S_n(\mathbb{R})$, $\forall k \geq 2$, et $\forall S \in S_n(\mathbb{R}) \cap GL_n(\mathbb{R})$, $S^{-1} \in S_n(\mathbb{R})$.

**Démonstration.** ${}^t(S^k) = ({}^tS)^k = S^k$ et ${}^t(S^{-1}) = ({}^tS)^{-1} = S^{-1}$. $\square$

**Remarque.** Si $A$ et $B$ sont dans $S_n(\mathbb{K})$, alors $AB \in S_n$ est faux en général.

**Proposition 4.** $S_n(\mathbb{R})$ est un sev de $\mathcal{M}_n(\mathbb{R})$ ; sa dimension est : exercice.

### Les endomorphismes orthogonaux

**Définition 5.** On dit que $u \in \mathcal{L}(E)$ est orthogonal si $\forall (x, y) \in E \times E, \langle u(x), u(y) \rangle = \langle x, y \rangle$ (on dit que $u$ préserve le produit scalaire).

**Remarque.** Ne pas parler de l'orthogonal de $u$ et de $u$ orthogonal à $v$.
On note $O(E)$ les endomorphismes orthogonaux sur $E$.

**Proposition 2.** $u \in O(E)$
$\Leftrightarrow \forall x \in E, ||u(x)|| = ||x||$ ($u$ préserve la norme)
$\Leftrightarrow$ pour toute BON $B$ de $E$, $u(B)$ est une BON de $E$.

**Démonstration.** (À savoir.) On prouve la première ligne. Supposons que $u \in O(E)$. Alors $||u(x)|| = \sqrt{\langle u(x), u(x) \rangle} = \sqrt{\langle x, x \rangle} = ||x||$ car $u$ préserve le produit scalaire.
La réciproque repose sur la formule suivante (à savoir) :

$$
\langle x, y \rangle = \frac{1}{2}(||x + y||^2 - ||x||^2 - ||y||^2) \quad \text{Identité de polarisation} \quad (a + b)^2 = a^2 + b^2 + 2ab
$$

En effet $||x + y||^2 = \langle x + y, x + y \rangle = \langle x, x \rangle + \langle y, y \rangle + \langle x, y \rangle + \langle y, x \rangle = ||x||^2 + ||y||^2 + 2\langle x, y \rangle$.
Supposons que $u$ préserve les normes, $||u(x)|| = ||x||, \forall x \in E$.
On calcule $\langle u(x), u(y) \rangle = \frac{1}{2}(||u(x) + u(y)||^2 - ||u(x)||^2 - ||u(y)||^2) = \frac{1}{2}(||u(x + y)||^2 - ||u(x)||^2 - ||u(y)||^2) = \frac{1}{2}(||x + y||^2 - ||x||^2 - ||y||^2) = \langle x, y \rangle$. Donc $u \in O(E)$. $\square$

**Proposition 3.** $O(E)$ est un groupe pour la composition. Cela veut dire que

- $Id \in O(E)$ ;
- $u$ et $v$ sont dans $O(E) \Rightarrow u \circ v \in O(E)$ ;
- $u \in O(E)$ implique que $u$ est inversible, et de plus $u^{-1} \in O(E)$.

**Démonstration.** (À savoir.)

- $||Id(x)|| = ||x||$, donc $Id \in O(E)$.
- $||u \circ v(x)|| = ||u(v(x))|| = ||v(x)|| = ||x||$. Donc $u \circ v \in O(E)$ par P2.
- Soit $x \in E$ tel que $u(x) = 0$. Alors $||u(x)|| = ||x||$, donc $x = 0$ et $u$ est injective. Comme c'est un endomorphisme, $u$ est inversible. De plus $||u^{-1}(x)|| = ||u(u^{-1}(x))|| = ||x||$, donc $u^{-1} \in O(E)$.

$\square$

**Définition 4.** On dit qu'une matrice $\Omega$ est orthogonale si l'endomorphisme associé dans la base canonique de $\mathbb{R}^n$ est orthogonal.
On note $O_n(\mathbb{R})$ les matrices orthogonales de taille $n \times n$.

**Théorème V.5.** $\Omega \in O_n(\mathbb{R}) \Leftrightarrow {}^t\Omega \Omega = I_n \Leftrightarrow {}^t\Omega = \Omega^{-1} \Leftrightarrow$ les colonnes de $\Omega$ forment une BON de $\mathbb{R}^n$ pour le produit scalaire $x.y$ de $\mathbb{R}^n$.

**Démonstration.** (À savoir.) Soit $u$ l'endomorphisme associé à $\Omega$ dans la base canonique. On a alors : $\forall x, y \in \mathbb{R}^n \times \mathbb{R}^n, \langle u(x), u(y) \rangle = \langle x, y \rangle$ car $u \in O(E)$. De plus, si on note $X$ et $Y$ les colonnes représentant $x$ et $y$ dans la base canonique, on a $\langle u(x), u(y) \rangle = {}^t(\Omega X) \Omega Y = {}^tX\, {}^t\Omega \Omega Y = \langle x, y \rangle = {}^tX Y$. Ainsi : $\forall X, Y \in \mathbb{R}^n, {}^tX({}^t\Omega \Omega - I_n) Y = 0$. On évalue cela pour $X = e_i$ et $Y = e_j$ et on trouve ${}^t\Omega \Omega - I_n = 0$. Cela équivaut à ${}^t\Omega = \Omega^{-1}$. $\square$

**Exemple.** Une rotation de $\mathbb{R}^2$ est un endomorphisme orthogonal. On note $R_\theta$ la rotation d'angle $\theta$. Soit $B = (1, 0), (0, 1)$ la BON de $\mathbb{R}^2$. Alors $\Omega := MAT_B(R_\theta) = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$. On note que les colonnes $C_1$ et $C_2$ vérifient $C_1.C_2 = 0$ et $||C_1|| = 1$. Ainsi les colonnes forment bien une BON.

**Remarque.** $\Omega^{-1} = \dfrac{1}{det\,\Omega} \begin{pmatrix} \cos\theta & \sin\theta \\ -\sin\theta & \cos\theta \end{pmatrix} = \dfrac{1}{\cos^2\theta + \sin^2\theta} {}^t\Omega = {}^t\Omega$.

**Remarque.** Dans le T5, on a dit : ${}^t\Omega \Omega = I_n \Leftrightarrow$ les colonnes de $\Omega$ forment une BON. Il faut pour cela voir que l'élément $(i, j)$ de ${}^t\Omega \Omega$ est ${}^tC_i C_j = C_i.C_j$, où les $(C_i)$ sont les colonnes de $\Omega$. Ainsi ${}^t\Omega \Omega = I_n \Leftrightarrow C_i C_j = \delta_{ij} \Leftrightarrow (C_i)_{i=1,\dots,n}$ est une BON.

### Réduction des matrices symétriques

**Proposition 6.** Soit $u \in \mathcal{L}(E)$ un endomorphisme symétrique. Alors ses $sep$ sont orthogonaux.

**Démonstration.** (À savoir.) Soit $F$ et $G$ deux $sep$ de $u$ distincts. Soient $x \in F$ et $y \in G$. Soient $\lambda$ et $\mu$ les valeurs propres associées. Alors $\langle \lambda x, y \rangle = \langle u(x), y \rangle = \langle x, u(y) \rangle = \langle x, \mu y \rangle$. Ainsi $(\lambda - \mu) \langle x, y \rangle = 0$, et $\lambda \neq \mu$, donc $x \perp y$. $\square$

**Proposition 7.** Soit $F$ un sev de $E$ stable par $u$ et $u$ symétrique. Alors $F^\perp$ est aussi stable par $u$.

**Démonstration.** (À savoir.) Soit $y \in F^\perp$ ; on veut montrer que $u(y) \in F^\perp$. Soit $x \in F$, alors $\langle x, u(y) \rangle = \langle u(x), y \rangle$ car $u$ est symétrique. Or $\begin{cases} u(x) \in F \text{ car } F \text{ est stable par } u \\ y \in F^\perp \end{cases} \Rightarrow \langle u(x), y \rangle = 0$. Donc $u(y) \in F^\perp$. $\square$

**Remarque.** Plus généralement, $F$ stable par $u$ est équivalent à $F^\perp$ stable par ${}^tu$ (voir D1 du chapitre).

**Théorème V.8.** (Surpuissant) Toute matrice symétrique $S$ est diagonalisable dans une BON, c'est-à-dire $\forall S \in S_n(\mathbb{R})$, il existe $D$ diagonale et $\Omega \in O_n(\mathbb{R})$ telles que

$$
S = \Omega D\, {}^t\Omega \quad \text{avec} \quad {}^t\Omega = \Omega^{-1}
$$

**Démonstration.** (À savoir.)

**Lemme.** Toute matrice symétrique admet une valeur propre réelle.
Soit $\chi_S$ le polynôme caractéristique de $S$. Il se décompose en produit comme suit :

$$
\chi_S(X) = \prod_{i=1}^{p} (X - \lambda_i)^{m_i} \times \prod_{i=1}^{q} (X^2 + \alpha_i X + \beta_i)^{n_i}
$$

Supposons que $S$ n'a pas de valeur propre ; donc il n'y a ci-dessus que des trinômes irréductibles, c'est-à-dire $p = 0$.
Or $\chi_S(S) = 0$ (théorème de Cayley-Hamilton). Donc $\displaystyle\prod_{i=1}^{q} (S^2 + \alpha_i S + \beta_i I_n)^{n_i} = 0$. Donc un de ces facteurs est non inversible (sinon le produit total serait inversible, donc différent de 0).
Donc $\exists x \in \mathbb{R}^n, x \neq 0$, tel que $(S^2 + \alpha_i S + \beta_i I_n) x = 0$, c'est-à-dire $S^2 x = -\alpha_i S x - \beta_i x$.
Soit $F = \text{Vect}(x, Sx)$. Alors $F$ est stable par $S$ puisque $\text{Vect}(Sx, S^2 x) = \text{Vect}(Sx, -\alpha_i S x - \beta_i x) = \text{Vect}(x, Sx)$.
Soit $u$ l'endomorphisme associé à $S$ et $U_F$ sa restriction à $F$ ; alors $U_F$ est symétrique. Donc, dans une BON, sa matrice est symétrique ; puisque $F$ est de dimension 2, cette matrice est de la forme $\begin{pmatrix} a & b \\ b & d \end{pmatrix}$ (elle est symétrique).
Ainsi $\chi_{U_F}(X) = X^2 - (a + d) X + ad - b^2$. On a $\Delta = (a + d)^2 - 4(ad - b^2) = a^2 + d^2 - 2ad + 4b^2 = (a - d)^2 + 4b^2 \geq 0$.
Donc $\chi_{U_F}$ admet une racine. C'est une valeur propre de $U$. Or on a supposé que $u$ n'a pas de valeur propre : contradiction. $\square$

**Démonstration.** (Théorème) Soit $S \in S_n(\mathbb{R})$. Par le lemme, $\exists x$ un vecteur propre de $S$. Soit $F = \text{Vect}(x)$ ; par les propositions d'avant, $F^\perp$ est stable par $S$. Dans une BON adaptée $\tilde{B}$, la matrice de $u$ (l'endomorphisme canoniquement associé à $S$) est : $MAT_{\tilde{B}}(u) = \begin{pmatrix} \lambda & 0 & \dots & 0 \\ 0 & & & \\ \vdots & & S' & \\ 0 & & & \end{pmatrix}$ (c'est une matrice par blocs car $F^\perp$ est stable par $u$).
Hypothèse de récurrence : toute matrice symétrique est diagonalisable en BON.

- Initialisation : facile.
- Hérédité : se servir de $MAT_{\tilde{B}}(u)$ et diagonaliser $S'$ avec l'hypothèse de récurrence.

$\square$

### Projections orthogonales : applications

Soit $F$ un sev d'un eve $E$. Soit $x \in E$. On cherche à calculer $d(x, F) := \inf_{y \in F} ||x - y||$.

**Théorème V.1.** $d(x, F) = ||x - P_F(x)||$, où $P_F$ est la projection orthogonale. De plus $P_F(x)$ est l'unique solution du problème "minimiser $||x - y||$ avec $y \in F$".

**Démonstration.** Soit $y \in F$ ; alors $||x - y||^2 = ||x - P_F(x) + P_F(x) - y||^2 = ||x - P_F(x)||^2 + ||P_F(x) - y||^2$ (par Pythagore) $\geq ||x - P_F(x)||^2$. Or, $P_F(x) \in F$. Donc $P_F(x)$ répond au problème "minimiser $||x - y||^2$, avec $y \in F$". $\square$
