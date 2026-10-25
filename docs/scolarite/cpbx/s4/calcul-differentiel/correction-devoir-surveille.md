---
title: "Correction du devoir surveillé"
description: "Correction du devoir surveillé de calcul différentiel : dérivées partielles et directionnelles, points critiques et matrice hessienne, difféomorphisme par le théorème d'inversion globale."
sidebar_position: 6
sidebar_custom_props:
  kind: td
---

## Exercice 1

$$
f(x, y) = \begin{cases} \dfrac{x^2 y}{x^2 + y^2} & \text{si } (x, y) \neq (0, 0) \\[6pt] 0 & \text{sinon} \end{cases} \tag{1}
$$

1. $\partial_1 f(0, 0) = \displaystyle\lim_{h \to 0} \frac{f(h, 0) - f(0, 0)}{h} = 0$ et $\partial_2 f(0, 0) = 0$.
   La dérivée directionnelle en $(1, 1)$ est $\displaystyle\lim_{h \to 0} \frac{f(h, h) - f(0, 0)}{h} = \lim_{h \to 0} \frac{h^3}{2h^3} = \frac{1}{2}$.
2. Les dérivées partielles sont nulles en $(0, 0)$, donc si $f$ est différentiable en $(0, 0)$ on doit aussi avoir $df(0, 0) = 0$. Or la dérivée directionnelle selon $(1, 1)$ en $(0, 0)$ est non nulle, donc $f$ n'est pas différentiable en $(0, 0)$.
   $\forall (x, y) \in \mathbb{R}^2 \setminus \{(0, 0)\}$, $f$ est la composée d'applications différentiables et $x^2 + y^2 \neq 0$.

## Exercice 2

$$
f(x, y) = x^3 + y^3 - 6(x^2 - y^2) \tag{2}
$$

1. $\begin{cases} \partial_1 f(x, y) = 3x^2 - 12x = 0 \\ \partial_2 f(x, y) = 3y^2 + 12y = 0 \end{cases}$. On trouve donc $x = 0$, $x = 4$, $y = 0$, $y = -4$ et on a donc 4 points critiques : $(0, 0)$, $(0, -4)$, $(4, 0)$, $(4, -4)$.
2. $f(t, 0) = t^3 - 6t^2 = t^2(t - 6)$ et $f(0, t) = t^3 + 6t^2 = t^2(t + 6)$. On remarque donc que si $t$ est au voisinage de 0, alors $f(t, 0) < 0$ et $f(0, t) > 0$ : $(0, 0)$ ne peut donc être ni un maximum local ni un minimum local.
3. On calcule la matrice hessienne $H(x, y) = \begin{pmatrix} 6x - 12 & 0 \\ 0 & 6y + 12 \end{pmatrix}$. On regarde ensuite le déterminant de $H(x, y)$, on a donc :
   1. $\det(H(4, 0)) = 144 > 0$ et $p = 12 > 0$, donc un minimum local ;
   2. $\det(H(0, -4)) = 144 > 0$ et $p = -12 < 0$, donc un maximum local ;
   3. $\det(H(4, -4)) = -144 < 0$, ce n'est donc ni un maximum ni un minimum local.

## Exercice 3

$$
\phi(x, y) = (\sin(y/2) - x, \sin(x/2) - y) \tag{3}
$$

1. Chacune des composantes $\phi_1$ et $\phi_2$ est la composée d'applications $C^1$ de $\mathbb{R}^2$.
2. $d\phi(x, y)$ est une application linéaire de $\mathbb{R}^2$ dans $\mathbb{R}^2$ qui peut être définie par sa matrice jacobienne

   $$
   \mathcal{J}\phi(x, y) = \begin{pmatrix} -1 & \frac{1}{2}\cos(y/2) \\[4pt] \frac{1}{2}\cos(x/2) & -1 \end{pmatrix}
   $$

   Soit $h = (h_1, h_2)$, alors

   $$
   d\phi(x, y)(h_1, h_2) = \begin{pmatrix} d\phi_1(x, y)(h_1, h_2) \\ d\phi_2(x, y)(h_1, h_2) \end{pmatrix} = \begin{pmatrix} \partial_1 \phi_1(x, y) h_1 + \partial_2 \phi_1(x, y) h_2 \\ \partial_1 \phi_2(x, y) h_1 + \partial_2 \phi_2(x, y) h_2 \end{pmatrix}
   $$

3. On va utiliser le théorème d'inversion globale.
   1. On a déjà montré que $\phi$ est $C^1$.
   2. Montrons que $d\phi$ est un isomorphisme : $\det(\mathcal{J}\phi(x, y)) = 1 - \dfrac{1}{4} \cos(x/2) \cos(y/2) > 0$, donc $d\phi(x, y)$ est un isomorphisme.
   3. Montrons que $\phi$ est injective. Soient $(x, y)$ et $(x', y')$ tels que

      $$
      \begin{aligned}
      &\phi(x, y) = \phi(x', y') && (4) \\
      \Leftrightarrow\ &\begin{cases} \sin(y/2) - x = \sin(y'/2) - x' \\ \sin(x/2) - y = \sin(x'/2) - y' \end{cases} && (5) \\
      \Leftrightarrow\ &\begin{cases} \sin(y/2) - \sin(y'/2) = x - x' \\ \sin(x/2) - \sin(x'/2) = y - y' \end{cases} && (6) \\
      \Rightarrow\ &\begin{cases} |x - x'| \leq \frac{1}{2} |y - y'| \\[4pt] |y - y'| \leq \frac{1}{2} |x - x'| \end{cases} && (7)
      \end{aligned}
      $$

      Entre (6) et (7), on utilise le théorème des accroissements finis. On a donc $x = x'$ et $y = y'$, et donc la fonction est injective.

   D'après le théorème d'inversion globale, $\phi$ est un $C^1$-difféomorphisme de $\mathbb{R}^2$ dans $\phi(\mathbb{R}^2)$.
