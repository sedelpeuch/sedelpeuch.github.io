---
title: "Exercices : fonctions de plusieurs variables"
description: "Énoncés des travaux dirigés de calcul différentiel : calcul de différentielles, dérivées directionnelles et partielles, classe C1, matrice jacobienne, différentielle seconde, difféomorphismes, extrema, fonctions implicites et plan tangent."
sidebar_position: 4
sidebar_custom_props:
  kind: td
---

Énoncés des exercices auxquels renvoie le cours sur les [fonctions de plusieurs variables réelles](./fonctions-plusieurs-variables.md).

## Exercice 1

Calculer les différentielles des fonctions suivantes :

1. $f : \begin{cases} \mathbb{R} \to \mathbb{R} \\ x \mapsto x^2 \end{cases}$
2. $f : \begin{cases} \mathbb{R}^2 \to \mathbb{R} \\ (x, y) \mapsto xy^2 \end{cases}$
3. $f : \begin{cases} \mathbb{R}_2[x] \to \mathbb{R}_2[x] \\ ax^2 + bx + c \mapsto 3ax^2 + c \end{cases}$
4. $f : \begin{cases} \mathcal{M}_d(\mathbb{R}) \times \mathcal{M}_d(\mathbb{R}) \to \mathcal{M}(\mathbb{R}) \\ (A, B) \mapsto A^2 B \end{cases}$
5. $f : \begin{cases} \mathbb{R}^d \to \mathbb{R} \\ x \mapsto (u(x) | x) \end{cases}$
6. Soient $E, F$ deux espaces vectoriels normés de dimension finie, $f : \begin{cases} \mathcal{L}(E, F) \times E \to F \\ (l, x) \mapsto l(x) \end{cases}$
7. Soient $E$ et $F$ deux espaces vectoriels normés de dimension finie, soit $g$ une application différentiable de $E$ dans $\mathcal{L}(E, F)$. $f : \begin{cases} E \to F \\ x \mapsto g(x)(x) \end{cases}$

## Exercice 2

Calculer les différentielles de $g$ et $h$ en fonction de celle de $f$.
Soit $f : \mathbb{R} \to \mathbb{R}$ différentiable.

1. $g : \begin{cases} ]0, +\infty[ \times \mathbb{R} \to \mathbb{R} \\ (x, y) \mapsto f\left(\dfrac{y}{x}\right) \end{cases}$
2. $h : \begin{cases} \mathbb{R}^3 \to \mathbb{R} \\ (x, y, z) \mapsto f(z \sin(x)) \end{cases}$

## Exercice 3

$$
f(x, y) = \begin{cases} \dfrac{xy}{x^2 + y} & \text{si } x^2 + y \neq 0 \\[6pt] 0 & \text{sinon} \end{cases}
$$

Montrer que $f$ admet en $(0, 0)$ des dérivées directionnelles dans toutes les directions mais que $f$ n'est pas différentiable en ce point.

## Exercice 4

$$
f : \begin{cases} \mathbb{R}^2 \to \mathbb{R} \\[4pt] \begin{cases} \dfrac{xy}{\sqrt{x^2 + y^2}} \sin\left(\dfrac{1}{\sqrt{x^2 + y^2}}\right) & \text{si } (x, y) \neq (0, 0) \\[6pt] 0 & \text{si } (x, y) = (0, 0) \end{cases} \end{cases}
$$

1. Montrer que $f$ est continue sur $\mathbb{R}^2$.
2. Calculer les dérivées partielles.
3. Montrer que $f$ n'est pas différentiable.

## Exercice 5

Déterminer si les fonctions suivantes sont de classe $C^1$.

$$
f : \begin{cases} \mathbb{R}^2 \to \mathbb{R} \\[4pt] f(x, y) = \begin{cases} \dfrac{x^2 y^3}{x^2 + y^2} & \text{si } (x, y) \neq (0, 0) \\[6pt] 0 & \text{si } (x, y) = (0, 0) \end{cases} \end{cases}
$$

$$
g : \begin{cases} \mathbb{R}^2 \to \mathbb{R} \\[4pt] g(x, y) = \begin{cases} \dfrac{x \sin(y)}{y} & \text{si } y \neq 0 \\[6pt] x & \text{si } y = 0 \end{cases} \end{cases}
$$

## Exercice 6

$$
f : \begin{cases} \mathbb{R}^2 \to \mathbb{R}^2 \\ (x, y) \mapsto (x^3 + x, y - x^2) \end{cases}
$$

1. Montrer que $f$ est continue.
2. Montrer que $f$ est différentiable et calculer sa matrice jacobienne.
3. Montrer que $f$ est bijective.
4. Montrer que $f^{-1}$ est $C^1$.

## Exercice 7

Calculer la différentielle seconde de :

$$
f : \begin{cases} \mathbb{R}^3 \to \mathbb{R} \\ (x, y, z) \mapsto x^3 yz - 2y^2 z^2 \end{cases}
\qquad
g : \begin{cases} \mathcal{M}_n(\mathbb{R}) \times \mathcal{M}_n \to \mathcal{M}_n(\mathbb{R}) \\ (A, B) \mapsto A^2 B \end{cases}
$$

## Exercice 8

Soit $\mathcal{M}_n$ une matrice de taille $n \times n$ et $GL_n(\mathbb{R})$ l'ouvert des matrices inversibles.

$$
f : \begin{cases} GL_n(\mathbb{R}) \to GL_n(\mathbb{R}) \\ A \mapsto A^{-1} \end{cases}
$$

1. Calculer la différentielle de $f$.
2. Montrer que $df(A)$ est continue en $A$, $\forall A \in GL_n(\mathbb{R})$.

## Exercice 9

Est-ce que les fonctions suivantes sont des $C^1$-difféomorphismes ?

$$
f : \begin{cases} \mathbb{R}^2 \to \mathbb{R}^3 \\ (x, y) \mapsto \left(x + e^x \cos\left(\dfrac{1}{1 + x^2 y^2}\right), y, x^2 + y^2\right) \end{cases}
$$

$$
h : \begin{cases} ]-\pi/2, \pi/2[ \to \mathbb{R} \\ x \mapsto \tan(x) \end{cases}
\qquad
h : \begin{cases} \mathbb{R} \to \mathbb{R} \\ x \mapsto x^3 \end{cases}
$$

$$
k : \mathbb{R}^2 \to \mathbb{R}^2, \quad (x, y) \mapsto (x + y, x - y)
$$

## Exercice 10

Étudier les extrema de :

$$
f : \begin{cases} \mathbb{R}^2 \to \mathbb{R} \\ (x, y) \mapsto x^3 + 3xy^2 - 15x - 12y \end{cases}
$$

## Exercice 11

Déterminer la plus grande valeur et la plus petite de la fonction

$$
f(x, y) = x^2 + y^2 - xy + x + y
$$

dans le domaine $\mathcal{D} = \{(x, y) \text{ tel que } x \leq 0, y \leq 0, x + y \geq -3\}$.

## Exercice 12

Chaque jour, 10 000 voyageurs doivent se déplacer. Le trajet est de 40 minutes en tram. Si $x$ milliers de personnes utilisent la voiture, alors le trajet en voiture est de $(20 + 5x)$ minutes.

1. Montrer que si les personnes sont libres de choisir, alors 4 000 personnes prennent la voiture.
2. Montrer que la durée moyenne de trajet serait minimisée si 2 000 personnes prenaient la voiture.

## Exercice 13

1. Montrer que la relation

   $$
   x^3 + y^3 - 2xy = 0 \tag{2}
   $$

   définit implicitement au voisinage de $(1, 1)$ une unique fonction $\phi$ vérifiant

   $$
   x^3 + \phi(x)^3 - 2x\phi(x) = 0
   $$

2. Calculer $\phi'(1)$.
3. Montrer que si $P \neq (0, 0)$, alors au voisinage de $P$ l'équation se résout en $x$ ou en $y$.
4. L'équation (2) définit une courbe $\mathcal{C} \subset \mathbb{R}^2$. Montrer que $\mathcal{C}$ a une tangente en tout point $P \neq (0, 0)$.
5. En quel point la tangente va-t-elle être verticale ? horizontale ?

## Exercice 14

$$
f : \begin{cases} \mathcal{M}_n(\mathbb{R}) \times \mathcal{M}_n(\mathbb{R}) \to \mathcal{M}_n(\mathbb{R}) \\ B - \dfrac{I_n - X + Y^2}{2} \end{cases}
$$

où $B \in \mathcal{M}_n(\mathbb{R})$ est constante et $I \in \mathcal{M}_n(\mathbb{R})$ l'identité.

1. Calculer $d_2 f(X, Y)$.
2. Montrer qu'au voisinage de $I_n$ il existe une fonction $\phi$ telle que $\phi(x)^2 = X$.
3. La fonction $\phi$ est-elle unique ?

## Exercice 15

Soit la surface $S$ d'équation

$$
z = x - 2(x^2 + y^2)^2
$$

Soit $(a, b, c) \in S$.

1. Écrire l'équation du plan tangent à $S$ au point $(a, b, c)$. En quel point le plan tangent est-il horizontal ?
2. Montrer qu'au point $(0, 0, 0)$ la surface est en dessous du plan tangent.
3. Montrer qu'en tout point de $S$ la surface est en dessous de son plan tangent.
