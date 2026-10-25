---
title: "Intégrale de Riemann"
description: "Irrationalité de π (preuve de Niven), partitions et sommes de Riemann, critère d'intégrabilité, théorème de Heine-Cantor, intégrabilité des fonctions continues par morceaux, propriétés de l'intégrale et intégrale de Riemann des fonctions vectorielles."
sidebar_position: 2
---

## Motivation

Les intégrales sont omniprésentes dans les mathématiques (et dans les autres domaines) : en analyse, en probabilités, etc. On va voir une application des intégrales à la théorie des nombres.

**Théorème 4.1.** $\pi \in \mathbb{R} \setminus \mathbb{Q}$

*Démonstration.* (Niven, 1946) On présente la preuve due à Niven. Par contradiction, on suppose que $\pi \in \mathbb{Q}$, i.e. $\pi = \dfrac{a}{b}$ avec $a, b \in \mathbb{N}$. On définit la famille de fonctions suivante

$$
f_n(x) = \frac{x^n (a - bx)^n}{n!}
$$

$$
F_n(x) = f_n(x) - f_n^{(2)}(x) + f_n^{(4)}(x) + \cdots + (-1)^n f_n^{(2n)}(x)
$$

1. Montrons que $f_n(\pi - x) = f_n(x)$

   $$
   \begin{aligned}
   f_n(\pi - x) &= \frac{(\pi - x)^n (a - b(\pi - x))^n}{n!} \\
   &= \frac{(a/b - x)^n (a - a + bx)^n}{n!} \\
   &= \frac{b^n (a/b - x)^n x^n}{n!} \\
   &= \frac{(a - bx)^n x^n}{n!} = f_n(x)
   \end{aligned}
   $$

2. Montrons que $f_n^{(j)}(0) \in \mathbb{Z}$ et $f_n^{(j)}(\pi) \in \mathbb{Z}$.

   $$
   \begin{aligned}
   n! f_n(x) &= x^n (a - bx)^n \\
   &= x^n \sum_{k=0}^{n} (-1)^k C_n^k a^{n-k} b^k x^k
   \end{aligned}
   $$

   Si $j < n$, on a $f_n^{(j)}(0) = 0$. Si $j \in \{n, \dots, 2n\}$, on a

   $$
   f_n^{(j)}(x) = \frac{1}{n!} \sum_{k=j-n}^{n} (-1)^k a^{n-k} b^k C_n^k (n + k)(n + k - 1) \cdots (n + k - j + 1) x^{n+k-j}
   $$

   $f_n^{(j)}(0) = \dfrac{1}{n!} (-1)^{j-n} a^{n-j+n} b^{j-n} C_{j-n}^n j! = \text{entier} \times \dfrac{j!}{n!} \in \mathbb{Z}$, et $f_n^{(j)}(\pi) \in \mathbb{Z}$ d'après 1) et $f_n^{(j)}(0) \in \mathbb{Z}$ (après calcul différentiel).

3. Calculons la dérivée suivante

   $$
   \begin{aligned}
   \frac{d}{dx}\big(F'_n(x) \sin(x) - F_n(x) \cos(x)\big) &= F''_n(x) \sin(x) + F'_n(x) \cos(x) - F'_n(x) \cos(x) + F_n(x) \sin(x) \\
   &= (F''_n(x) + F_n(x)) \sin(x) \\
   &= \big((f_n(x) - f_n^{(2)}(x) + \cdots + (-1)^n f_n^{(2n)}(x))'' \\
   &\qquad + (f_n(x) - f_n^{(2)}(x) + \cdots + (-1)^n f_n^{(2n)}(x))\big) \sin(x) \\
   &= \big(f_n^{(2)}(x) - f_n^{(4)}(x) + \cdots + (-1)^{n-1} f_n^{(2n)}(x) \\
   &\qquad + f_n(x) - f_n^{(2)}(x) + f_n^{(4)}(x) + \cdots + (-1)^n f_n^{(2n)}(x)\big) \sin(x) \\
   &= f_n(x) \sin(x)
   \end{aligned}
   $$

4. On a donc que $\displaystyle\int_0^\pi f_n(x) \sin(x)\,dx = [F'_n(x) \sin(x) - F_n(x) \cos(x)]_0^\pi = F_n(\pi) + F_n(0) \in \mathbb{Z}$ par 2.
5. Montrons que $\forall x \in ]0, \pi[$

   $$
   0 < f_n(x) \sin(x) < \frac{\pi^n a^n}{n!}
   $$

   D'une part, $\sin(x) > 0$ si $x \in ]0, \pi[$, donc $f_n(x) = \dfrac{x^n}{n!}(a - bx)^n > 0$. D'autre part, $\sin(x) \leq 1$ et donc $f_n(x) = \dfrac{x^n}{n!}(a - bx)^n$.
6. En conclusion, par monotonie de l'intégrale, on a $\displaystyle\int_0^\pi 0\,dx < \int_0^\pi f_n(x) \sin(x)\,dx < \int_0^\pi \frac{\pi^n a^n}{n!}\,dx$ et donc $0 < \displaystyle\int_0^\pi f_n(x) \sin(x)\,dx < \frac{\pi^{n+1} a^n}{n!}$. Pour $n$ assez grand, $\displaystyle\int_0^\pi f_n(x) \sin(x)\,dx$ doit donc être un entier dans $]0, 1[$, ce qui n'est pas le cas : autrement dit, on a une contradiction.

## Rappel sur l'intégrale de Riemann

**Définition 4.1.** Une partition d'un intervalle compact $[a, b]$ est une famille $\{I_1, I_2, \cdots, I_n\}$ avec $I_i$ un sous-intervalle de $[a, b]$ $\forall i \in \{1, 2, \cdots, n\}$, $\displaystyle\bigcup_{i=1}^{r} I_i = [a, b]$ et $I_i \cap I_j$ consiste en au plus un point si $i \neq j$.

**Définition 4.2.** Le volume d'un intervalle compact $[a, b]$ est $\text{vol}([a, b]) = b - a$.

**Définition 4.3.** Soit $P = \{I_1, I_2, \cdots, I_n\}$ une partition de $[a, b]$. La taille de $P$ est le maximum des volumes de $I_i$, $i \in \{1, \cdots, n\}$.

**Exemple 4.1.** Soit $[0, 1]$ et $P = \{[0, 1/2], [1/2, 3/4], [3/4, 1]\}$ : la taille de $P$ est $1/2$.

**Définition 4.4.** Une partition pointée de $[a, b]$ est une famille $\{(I_1, p_1), (I_2, p_2), \cdots, (I_r, p_r)\}$ avec

- $\{I_1, I_2, \cdots, I_r\}$ une partition de $[a, b]$ ;
- $p_i \in I_i \ \forall i \in \{1, 2, \cdots, r\}$.

**Définition 4.5.** Soit $f$ une fonction bornée sur $[a, b]$ et soit $\tilde{P} = \{(I_1, p_1), (I_2, p_2), \cdots, (I_r, p_r)\}$ une partition pointée de $[a, b]$. Alors la somme de Riemann de $f$ par rapport à $\tilde{P}$ est

$$
\mathcal{R}(f, \tilde{P}) = \sum_{i=1}^{r} f(p_i)\, \text{vol}(I_i)
$$

La fonction $f$ est dite Riemann-intégrable, d'intégrale $l \in \mathbb{R}$, si $\forall \epsilon > 0 \ \exists \delta > 0$ tel que pour toute partition pointée $\tilde{P}$ de $[a, b]$ de taille au plus $\delta$, on a $|\mathcal{R}(f, \tilde{P}) - l| < \epsilon$.
On écrira dans ce cas $l = \displaystyle\int_a^b f(t)\,dt$. Les sommes de Riemann de $f$ convergent vers une limite finie pour des partitions assez fines. Si $f$ est continue, $l$ est l'aire sous le graphe de la fonction.

**Problème.** La définition est très difficile à utiliser.

**Théorème 4.2.** *Soit $f$ une fonction bornée sur $[a, b]$. On a que $f$ est Riemann-intégrable si et seulement si $\forall \epsilon > 0 \ \exists P$ une partition de $[a, b]$ avec $\displaystyle\sum_{i=1}^{n} \left(\sup_{I_i} f - \inf_{I_i} f\right) \text{vol}(I_i) < \epsilon$.*

*Démonstration.* Admise.

**Question.** Est-ce qu'il existe des fonctions bornées sur $[a, b]$ qui ne sont pas Riemann-intégrables ?

**Exemple 4.2.** Soient les exemples suivants :

- $f : \delta_1$ sur $[0, 2]$ est Riemann-intégrable : $\forall \epsilon > 0$, on peut choisir la partition $P = \left\{\left[0, 1 - \dfrac{\epsilon}{3}\right], \left[1 - \dfrac{\epsilon}{3}, 1 + \dfrac{\epsilon}{3}\right], \left[1 + \dfrac{\epsilon}{3}, 2\right]\right\}$ et on a

  $$
  \left(\sup_{I_1} f - \inf_{I_1} f\right) \text{vol}(I_1) + \left(\sup_{I_2} f - \inf_{I_2} f\right) \text{vol}(I_2) + \left(\sup_{I_3} f - \inf_{I_3} f\right) \text{vol}(I_3) = \frac{2\epsilon}{3} < \epsilon
  $$

- $f : [0, 1] \to \mathbb{R}$ telle que $f = \begin{cases} 0 & \text{si } x \notin \mathbb{Q} \cap [0, 1] \\ 1 & \text{si } x \in \mathbb{Q} \cap [0, 1] \end{cases} = \chi_{\mathbb{Q} \cap [0, 1]}$ : cette fonction n'est pas Riemann-intégrable, parce qu'en utilisant le théorème, on a que pour toute partition $P$ de $[0, 1]$

  $$
  \sum_{i=1}^{n} \left(\sup_{I_i} f - \inf_{I_i} f\right) \text{vol}(I_i) = \sum_{i=1}^{n} \text{vol}(I_i) = 1
  $$

Des fonctions avec une régularité suffisante sont Riemann-intégrables.

**Théorème 4.3** (Heine-Cantor). *Une fonction continue sur un intervalle compact est uniformément continue.*

**Définition 4.6.** On rappelle les définitions suivantes :

- continuité : $\forall \epsilon > 0 \ \forall x, y \in I \ \exists \delta > 0$, $|x - y| < \delta \Rightarrow |f(x) - f(y)| < \epsilon$ ;
- continuité uniforme : $\forall \epsilon > 0 \ \exists \delta > 0 \ \forall x, y \in I$ tels que $|x - y| < \delta \Rightarrow |f(x) - f(y)| < \epsilon$.

**Théorème 4.4.** *Soit $f \in \mathcal{CM}^0([a, b], \mathbb{R})$, alors $f$ est Riemann-intégrable sur $[a, b]$.*

*Démonstration.* Comme $f$ est continue par morceaux sur $[a, b]$, on a $a = a_0 < a_1 < \cdots < a_r = b$ telle que $f_{|]a_i, a_{i+1}[}$ est continue et $\displaystyle\lim_{x \to a_i^+}$ et $\displaystyle\lim_{x \to a_{i+1}^-} f(x)$ existent, finies, $\forall i = 0, 1, \cdots, r - 1$. Donc on peut définir des fonctions $\tilde{f}_i : [a_i, a_{i+1}] \to \mathbb{R}$ continues et bornées (prolongement par continuité).
Soit $\epsilon > 0$. On voudrait utiliser le théorème de caractérisation de l'intégrabilité à la Riemann. Grâce au théorème de Heine-Cantor, les fonctions $\tilde{f}_i$ sont uniformément continues sur $[a_i, a_{i+1}]$ $\Rightarrow \exists \delta_i > 0$ tel que si $x, y \in [a_i, a_{i+1}]$, $|x - y| < \delta_i$ alors $|\tilde{f}_i(x) - \tilde{f}_i(y)| < \dfrac{\epsilon}{2(b - a)}$.
Soit $R = \displaystyle\sup_{[a, b]} f - \inf_{[a, b]} f$ ($< \infty$ car $f$ est bornée). On peut supposer que $R \neq 0$ (sinon $f = \text{cte}$ et donc elle est Riemann-intégrable). Posons $0 < \delta < \min\left\{\delta_0, \delta_1, \cdots, \delta_{r-1}, \dfrac{\epsilon}{4rR}\right\}$. Soit $P$ une sous-partition de $\{[a_0, a_1], [a_1, a_2], \cdots, [a_{r-1}, a_r]\}$ de taille inférieure à $\delta$. On note $P = \{I_1, I_2, \cdots, I_r\}$. Cette partition vérifie le théorème de caractérisation de l'intégrabilité de Riemann, donc on a l'énoncé $\displaystyle\sum_{i=1}^{r} \left(\sup_{I_i} - \inf_{I_i} f\right) \text{vol}(I_i) < \epsilon$.

$$
\begin{aligned}
&\underbrace{\sum_{i=1}^{r}}_{\text{au moins un } \delta_{ij}} \left(\sup_{I_i} - \inf_{I_i} f\right) \text{vol}(I_i) + \underbrace{\sum_{i=1}^{r}}_{\text{aucun } \delta_{ij}} \left(\sup_{I_i} - \inf_{I_i} f\right) \text{vol}(I_i) \\
&\qquad < \sum R \cdot \delta + \sum_{I \in [a_i, a_{i+1}]} \left(\max_I \tilde{f}_k - \min_I \tilde{f}_k\right) \text{vol}(I_i) \\
&\qquad < R\delta \, \#\{I_i \text{ qui contiennent des } \delta_j\} + \sum_{I_i \subseteq [a_k, a_{k+1}[} \frac{\epsilon}{2(b - a)} \text{vol}(I_i) \\
&\qquad = R\delta 2r + \frac{\epsilon}{2(b - a)} \sum_{I_i \subseteq [a_k, a_{k+1}[} \text{vol}(I_i) \\
&\qquad < R\delta 2r + \frac{\epsilon}{2(b - a)} \text{vol}([a, b]) \\
&\qquad < R 2r \frac{\epsilon}{4Rr} + \frac{\epsilon}{2} = \epsilon
\end{aligned}
$$

**Corollaire 4.1.** *En particulier, toute fonction continue sur un intervalle compact est Riemann-intégrable.*

*Démonstration.* Admise.

L'intégrale de Riemann jouit des propriétés suivantes.

**Proposition 4.1.** *Soient $f, g : [a, b] \to \mathbb{R}$ deux fonctions Riemann-intégrables sur $[a, b]$ et $\lambda \in \mathbb{R}$, alors*

1. *(linéarité) $\lambda f + g$ est Riemann-intégrable sur $[a, b]$ et*

   $$
   \int_a^b (\lambda f + g)(t)\,dt = \lambda \int_a^b f(t)\,dt + \int_a^b g(t)\,dt
   $$

2. *(additivité, relation de Chasles) si $c \in [a, b]$, alors $f$ est Riemann-intégrable sur $[a, c]$ et sur $[c, b]$ et*

   $$
   \int_a^b f(t)\,dt = \int_a^c f(t)\,dt + \int_c^b f(t)\,dt
   $$

3. $\displaystyle\int_a^a f(t)\,dt = 0$

4. *(monotonie) si $f(x) \leq g(x) \ \forall x \in [a, b]$, alors*

   $$
   \int_a^b f(t) \leq \int_a^b g(t)\,dt
   $$

*Démonstration.* Admise.

**Notation.** Si $a, b \in \mathbb{R}$, $a < b$, et $f$ est Riemann-intégrable sur $[a, b]$, on note

$$
\int_b^a f(t)\,dt = -\int_a^b f(t)\,dt
$$

**Question.** Si $f$ est positive et $\displaystyle\int_a^b f(t)\,dt = 0$, alors $f(t) = 0$. L'affirmation est vraie si $f$ est continue, mais pas en général.

**Définition 4.7.** Si $A \subseteq \mathbb{R}$, la **fonction caractéristique** de $A$ est la fonction $\chi_A : \mathbb{R} \to \mathbb{R}$

$$
\chi_A(x) := \begin{cases} 1 & \text{si } x \in A \\ 0 & \text{autrement} \end{cases}
$$

**Exemple 4.3.** Soit $a < c < b$. La fonction $\chi_{\{c\}} : [a, b] \to \mathbb{R}$ est Riemann-intégrable et $\displaystyle\int_a^b \chi_{\{c\}}(t)\,dt = 0$.

**Remarque 4.1.** Plus généralement, la valeur de l'intégrale de Riemann de $f$ ne dépend pas des valeurs prises par $f$ sur un ensemble fini de points : si $f : [a, b] \to \mathbb{R}$ est une fonction Riemann-intégrable sur $[a, b]$ et $g : [a, b] \to \mathbb{R}$ telle que $g(x) = f(x) \ \forall x \in [a, b] \setminus S$, $\# S < \infty$, alors $g$ est Riemann-intégrable et

$$
\int_a^b g(t)\,dt = \int_a^b f(t)\,dt
$$

En effet, on a que

$$
g = f + \sum_{s \in S} (g(s) - f(s)) \chi_{\{s\}}(x) \quad \forall x \in [a, b]
$$

(en outre, si $x_0 \in [a, b] \setminus S$, $f(x_0) + \sum_{s \in S} (g(s) - f(s)) \chi_{\{s\}}(x_0) = f(x_0) = g(x_0)$, et si $x_0 \in S$, $f(x_0) + \sum_{s \in S} (g(s) - f(s)) \chi_{\{s\}}(x_0) = f(x_0) + (g(x_0) - f(x_0)) \cdot 1 = g(x_0)$).
Maintenant, on sait que $f$ est Riemann-intégrable (hypothèse) et que $\chi_{\{s\}}$ est Riemann-intégrable (exemple), alors $g = f + \sum_{s \in S} (g(s) - f(s)) \chi_{\{s\}}$ est une combinaison linéaire finie de fonctions Riemann-intégrables, donc $g$ est Riemann-intégrable d'après la proposition en partie 1. Le même énoncé affirme que

$$
\int_a^b g(t)\,dt = \int_a^b f(t)\,dt + \sum_{s \in S} (g(s) - f(s)) \int_a^b \chi_{\{s\}}(t)\,dt = \int_a^b f(t)\,dt
$$

**Exemple 4.4.** Soit $f : \begin{cases} [1, 1000] \to \mathbb{R} \\ \log\left(\dfrac{x}{x^2 + 1}\right) - \arctan(\exp(\sin(x))) \end{cases}$. Elle est Riemann-intégrable parce que $f$ est continue sur $[1, 1000]$. Soit maintenant $g : [1, 1000] \to \mathbb{R}$ définie comme

$$
g(x) = \begin{cases} \dfrac{\pi^2}{6x} & \text{si } x \in \mathbb{N} \\[6pt] f(x) & \text{autrement} \end{cases}
$$

La remarque permet de conclure que $g$ est Riemann-intégrable sur $[1, 1000]$.

## Intégrales de Riemann des fonctions vectorielles

($I$ est un intervalle réel, $n \in \mathbb{N} \setminus \{0\}$.)

**Définition 4.8.** Une fonction vectorielle $f : I \to \mathbb{R}^n$ est dite bornée sur $I$ s'il existe $C \in \mathbb{R}$ tel que $\|f(x)\| \leq C \ \forall x \in I$ (pour n'importe quel choix de la norme sur $\mathbb{R}^n$).

**Définition 4.9.** Prouver que effectivement la définition ne dépend pas du choix de la norme sur $\mathbb{R}^n$.

**Proposition 4.2.** *Une fonction vectorielle est bornée sur $I$ si et seulement si chacune de ses coordonnées l'est.*

*Démonstration.* D'une part ($\Rightarrow$), soit $f : I \to \mathbb{R}^n$, $f = (f_1, \cdots, f_n)$ une fonction bornée, alors $\exists C \in \mathbb{R}$, $\|f(x)\|_\infty \leq C \ \forall x \in I$. Mais alors, pour tout $i \in \{1, \cdots, n\}$

$$
|f_i(x)| \leq \max_{j \in \{1, \cdots, n\}} |f_j(x)| = \|f(x)\|_\infty \leq C \quad \forall x \in I
$$

donc $f_i$ est bornée.
D'autre part ($\Leftarrow$), soit $f = (f_1, \cdots, f_n)$ avec $f_1, \cdots, f_n$ fonctions (numériques) bornées, alors $\exists c_1, \cdots, c_n$ tels que $|f_i(x)| \leq c_i \ \forall x \in I, \forall i \in \{1, \cdots, n\}$. Prenons $C = \max\{c_1, \cdots, c_n\}$ : on a que $\forall x \in I$, $\|f(x)\|_\infty = \displaystyle\max_{i \in \{1, \cdots, n\}} |f_i(x)| \leq C$, donc $f$ est bornée.

On peut maintenant définir l'intégrale de Riemann pour les fonctions vectorielles bornées.

**Définition 4.10.** Soit $f : [a, b] \to \mathbb{R}^n$ une fonction bornée sur $[a, b]$. Soit $P = \{(I_1, p_1), \cdots, (I_r, p_r)\}$ une partition pointée de $[a, b]$. La somme de Riemann de $f$ par rapport à la partition $P$ est

$$
\mathcal{R}(f, P) := \sum_{i=1}^{r} f(p_i)\, \text{vol}(I_i) \in \mathbb{R}^n
$$

La fonction $f$ est Riemann-intégrable s'il existe $L \in \mathbb{R}^n$ tel que $\forall \varepsilon > 0 \ \exists \delta > 0$ tel que pour toute partition pointée $P$ de taille plus petite que $\delta$, on a

$$
\|\mathcal{R}(f, P) - L\| < \varepsilon
$$

(pour n'importe quel choix de la norme sur $\mathbb{R}^n$). Dans ce cas, le vecteur $L$ est appelé l'intégrale de Riemann de $f$ sur $[a, b]$ et noté $\displaystyle\int_a^b f(t)\,dt$.

**Proposition 4.3.** *Soit $f : [a, b] \to \mathbb{R}^n$ une fonction bornée, alors $f$ est Riemann-intégrable sur $[a, b]$ si et seulement si chacune de ses coordonnées est Riemann-intégrable sur $[a, b]$. Mais on a que*

$$
\int_a^b f(t)\,dt = \left(\int_a^b f_1(t)\,dt, \cdots, \int_a^b f_n(t)\,dt\right)
$$

*Démonstration.* D'une part ($\Rightarrow$), on suppose que $f$ est Riemann-intégrable sur $[a, b]$, $L = \displaystyle\int_a^b f(t)\,dt \in \mathbb{R}^n$, $L = (L_1, \cdots, L_n)$. Fixons $i \in \{1, \cdots, n\}$ et on prouve que $f_i$ est Riemann-intégrable.
Soit $\varepsilon > 0$. Comme $f$ est Riemann-intégrable, on sait que $\exists \delta > 0$. Pour toute partition pointée $P$ de taille inférieure à $\delta$, on a $\|\mathcal{R}(f, P) - L\|_\infty < \varepsilon \Rightarrow \displaystyle\max_{i \in \{1, \cdots, n\}} |(\mathcal{R}(f, P) - L)_i| < \varepsilon \Rightarrow \max |\mathcal{R}(f_i, P) - L_i| < \varepsilon \Rightarrow |\mathcal{R}(f_i, P) - L_i| < \varepsilon$.
D'autre part ($\Leftarrow$), soit $f = (f_1, \cdots, f_n)$ avec $f_1, \cdots, f_n$ Riemann-intégrables sur $[a, b]$. Soit $\varepsilon > 0$. Donc $\forall i \in \{1, \cdots, n\}$ $\exists \delta_i > 0$ tel que pour toute partition pointée $P$ de taille inférieure à $\delta_i$, on a

$$
\left|\mathcal{R}(f_i, P) - \int_a^b f_i(t)\,dt\right| < \varepsilon
$$

Donc, posons $\delta = \displaystyle\min_{i \in 1, \cdots, n} \delta_i$ ; alors, pour toute partition pointée $P$ de $[a, b]$ de taille inférieure à $\delta$, on a

$$
\begin{aligned}
\left\|\mathcal{R}(f, P) - \left(\int_a^b f_1(t)\,dt, \cdots, \int_a^b f_n(t)\,dt\right)\right\|_\infty &= \left\|\left(\mathcal{R}(f_1, P) - \int_a^b f_1(t)\,dt, \cdots, \mathcal{R}(f_n, P) - \int_a^b f_n(t)\,dt\right)\right\|_\infty \\
&= \max_{i \in \{1, \cdots, n\}} \left|\mathcal{R}(f_i, P) - \int_a^b f_i(t)\,dt\right| < \varepsilon
\end{aligned}
$$

Donc $f$ est Riemann-intégrable et $\displaystyle\int_a^b f(t)\,dt = \left(\int_a^b f_1(t)\,dt, \cdots, \int_a^b f_n(t)\,dt\right)$.

Cette proposition permet de trouver les propriétés analogues pour l'intégrale de Riemann des fonctions vectorielles.

**Proposition 4.4.** *Soient $f, g : [a, b] \to \mathbb{R}^n$ et $\lambda \in \mathbb{R}$, alors*

1. *(linéarité) $\lambda f + g$ est Riemann-intégrable et*

   $$
   \int_a^b (\lambda f + g)(t)\,dt = \lambda \int_a^b f(t)\,dt + \int_a^b g(t)\,dt
   $$

2. *(additivité, relation de Chasles) si $c \in [a, b]$, alors $f$ est Riemann-intégrable sur $[a, c]$ et sur $[c, b]$ et*

   $$
   \int_a^b f(t)\,dt = \int_a^c f(t)\,dt + \int_c^b f(t)\,dt
   $$

3. $\displaystyle\int_a^a f(t)\,dt = 0$

*Démonstration.* Nous prouvons les trois.

1. $f = (f_1, \cdots, f_n)$ et $g = (g_1, \cdots, g_n)$. D'après la proposition précédente, $f_1, \cdots, f_n, g_1, \cdots, g_n$ sont Riemann-intégrables sur $[a, b]$. D'après le résultat analogue sur les fonctions numériques (voir la proposition de ce matin), $\lambda f_i + g_i$ est Riemann-intégrable sur $[a, b]$ et $\displaystyle\int_a^b (\lambda f_i + g_i)(t)\,dt = \lambda \int_a^b f_i(t)\,dt + \int_a^b g_i(t)\,dt$.
   Mais $\lambda f + g = \lambda (f_1, \cdots, f_n) + (g_1, \cdots, g_n) = (\lambda f_1 + g_1, \cdots, \lambda f_n + g_n)$ et pour tout $i \in \{1, \cdots, n\}$, $\lambda f_i + g_i$ est Riemann-intégrable, donc $\lambda f + g$ est Riemann-intégrable et

   $$
   \begin{aligned}
   \int_a^b (\lambda f + g)(t)\,dt &= \left(\int_a^b (\lambda f_1 + g_1)(t)\,dt, \cdots, \int_a^b (\lambda f_n + g_n)(t)\,dt\right) \\
   &= \left(\lambda \int_a^b f_1(t)\,dt + \int_a^b g_1(t)\,dt, \cdots, \lambda \int_a^b f_n(t)\,dt + \int_a^b g_n(t)\,dt\right) \\
   &= \lambda \left(\int_a^b f_1(t)\,dt, \cdots, \int_a^b f_n(t)\,dt\right) + \left(\int_a^b g_1(t)\,dt, \cdots, \int_a^b g_n(t)\,dt\right) \\
   &= \lambda \int_a^b f(t)\,dt + \int_a^b g(t)\,dt
   \end{aligned}
   $$

2. Comme $f$ est Riemann-intégrable, $f_1, \cdots, f_n$ sont Riemann-intégrables. D'après la proposition précédente, $f_1, \cdots, f_n$ sont Riemann-intégrables sur $[a, c]$ et sur $[c, b]$ et

   $$
   \int_a^b f_i(t)\,dt = \int_a^c f_i(t)\,dt + \int_c^b f_i(t)\,dt
   $$

   donc

   $$
   \begin{aligned}
   \int_a^b f(t)\,dt = \left(\int_a^b f_1(t)\,dt, \cdots, \int_a^b f_n(t)\,dt\right) &= \left(\int_a^c f_1(t)\,dt + \int_c^b f_1(t)\,dt, \cdots, \int_a^c f_n(t)\,dt + \int_c^b f_n(t)\,dt\right) \\
   &= \left(\int_a^c f_1(t)\,dt, \cdots, \int_a^c f_n(t)\,dt\right) + \left(\int_c^b f_1(t)\,dt, \cdots, \int_c^b f_n(t)\,dt\right) \\
   &= \int_a^c f(t)\,dt + \int_c^b f(t)\,dt
   \end{aligned}
   $$

3. $\displaystyle\int_a^a f(t)\,dt = \left(\int_a^a f_1(t)\,dt, \cdots, \int_a^a f_n(t)\,dt\right) = (0, \cdots, 0) = 0$

On peut comparer la norme de l'intégrale d'une fonction vectorielle avec l'intégrale de la norme.

**Proposition 4.5.** *Soit $f : [a, b] \to \mathbb{R}^n$ une fonction Riemann-intégrable sur $[a, b]$ et soit $\|.\|$ une norme sur $\mathbb{R}^n$, alors $\|f\| : [a, b] \to \mathbb{R}$ est Riemann-intégrable sur $[a, b]$ et*

$$
\left\|\int_a^b f(t)\,dt\right\| \leq \int_a^b \|f(t)\|\,dt
$$

**Remarque 4.2.** Si $n = 1$, la proposition affirme que $\left|\displaystyle\int_a^b f(t)\,dt\right| \leq \int_a^b |f(t)|\,dt$. Donc la proposition généralise le cas commun des fonctions numériques (en fait un peu plus, car on prouve aussi que si $f$ est Riemann-intégrable alors $|f|$ est Riemann-intégrable).

**Remarque 4.3.** La proposition affirme que si $f$ est Riemann-intégrable alors $\|f\|$ est Riemann-intégrable. La réciproque n'est pas vraie, par exemple soit $f : \begin{cases} [0, 1] \to \mathbb{R} \\ \chi_{\mathbb{Q} \cap [0, 1]} - \chi_{\mathbb{Q}^c \cap [0, 1]} \end{cases}$. Autrement dit $f(x) = \begin{cases} 1 & \text{si } x \in \mathbb{Q} \\ -1 & \text{si } x \notin \mathbb{Q} \end{cases}$.
On a que $|f| = 1$, qui est Riemann-intégrable, mais $f$ n'est pas Riemann-intégrable.

**Corollaire 4.2.** *Si $f : [a, b] \to \mathbb{R}^n$ est Riemann-intégrable et $\|.\|$ est une norme sur $\mathbb{R}^n$*

$$
\left\|\int_a^b f(t)\,dt\right\| \leq (b - a) \sup_{[a, b]} \|f\|
$$

*Démonstration.* (D'après la proposition 4.5)

$$
\left\|\int_a^b f(t)\,dt\right\| \leq \int_a^b \|f(t)\|\,dt \leq \int_a^b \sup_{[a, b]} \|f\|\,dt = (b - a) \sup_{[a, b]} \|f\|
$$

*Démonstration.* (De la proposition 4.5) Comme toutes les normes sur $\mathbb{R}^n$ sont équivalentes, il existe une constante $c \in \mathbb{R}$ telle que $\|x\| \leq C \cdot \|x\|_1 \ \forall x \in \mathbb{R}^n$. On veut prouver que $\|f\|$ est Riemann-intégrable. Fixons $\varepsilon > 0$. Comme $f$ est Riemann-intégrable, $\forall i \in \{1, \cdots, n\}$ la fonction $f_i : [a, b] \to \mathbb{R}$ est Riemann-intégrable d'après la proposition. D'après le théorème de caractérisation de l'intégrabilité de Riemann des fonctions numériques, il existe une partition $P_i = \{I_{ij}, \cdots, I_{ir}\}$ telle que

$$
\sum_{j=1}^{r} \left(\sup_{I_{ij}} f_i - \inf_{I_{ij}} f_i\right) \text{vol}(I_{ij}) < \epsilon
$$

Considérons un raffinement $P = \{I_1, \cdots, I_n\}$ de $P_1, P_2, \cdots, P_n$. Remarquons que $P$ satisfait

$$
\sum_{k=1}^{m} \left(\sup_{I_k} f_i - \inf_{I_k} f_i\right) \text{vol}(I_k) < \frac{\varepsilon}{nC} \quad \forall i \in \{1, \cdots, n\} \tag{1}
$$

alors on a que

$$
\begin{aligned}
\sum_{k=1}^{m} \left(\sup_{I_k} \|f\| - \inf_{I_k} \|f\|\right) \text{vol}(I_k) &= \sum_{k=1}^{m} \sup_{x, y \in I_k} \big(\|f(x)\| - \|f(y)\|\big) \text{vol}(I_k) \\
&\leq C \sum_{k=1}^{m} \sup_{x, y \in I_k} \|f(x) - f(y)\|_1 \text{vol}(I_k) \\
&= C \sum_{k=1}^{m} \sup_{x, y \in I_k} \left(\sum_{l=1}^{n} |f_l(x) - f_l(y)|\right) \text{vol}(I_k) \\
&\leq C \sum_{k=1}^{m} \sum_{l=1}^{n} \left(\sup_{I_k} f_l - \inf_{I_k} f_l\right) \text{vol}(I_k) \\
&\leq C \sum_{l=1}^{n} \frac{\varepsilon}{nC} = \varepsilon
\end{aligned}
$$

Donc $\|f\| : [a, b] \to \mathbb{R}$ est Riemann-intégrable. Soit $\varepsilon > 0$ arbitraire. D'après la définition de l'intégrabilité de Riemann, $\exists \delta_1, \delta_2 > 0$ tels que pour toute partition pointée $P_i$ de $[a, b]$ de taille inférieure à $\delta_i$ avec $i = 1, 2$

$$
\left\|\mathcal{R}(f, P) - \int_a^b f(t)\,dt\right\| < \varepsilon \tag{2}
$$

$$
\left|\mathcal{R}(\|f\|, P_i) - \int_a^b \|f\|(t)\,dt\right| < \varepsilon \tag{3}
$$

Soit maintenant $P = \{(I_1, p_1), \cdots, (I_r, p_r)\}$ pointée de $[a, b]$ de taille plus petite que $\min(\{\delta_1, \delta_2\})$ ; alors $P$ satisfait (2) et (3). En général, on a que

$$
\begin{aligned}
\|\mathcal{R}(f, P)\| &= \left\|\sum_{i=1}^{r} f(p_i)\, \text{vol}(I_i)\right\| \\
&\leq \sum_{i=1}^{r} \|f(p_i)\, \text{vol}(I_i)\| \\
&= \sum_{i=1}^{r} \|f(p_i)\|\, \text{vol}(I_i) = \mathcal{R}(\|f\|, P)
\end{aligned}
$$

Maintenant

$$
\begin{aligned}
\left\|\int_a^b f(t)\,dt\right\| &= \left\|\int_a^b f(t)\,dt - \mathcal{R}(f, P) + \mathcal{R}(f, P)\right\| \\
&\leq \left\|\int_a^b f(t)\,dt - \mathcal{R}(f, P)\right\| + \|\mathcal{R}(f, P)\| \\
&\underbrace{<}_{(2)} \varepsilon + \|\mathcal{R}(f, P)\| \\
&\leq \varepsilon + \mathcal{R}(\|f\|, P) = \varepsilon + \mathcal{R}(\|f\|, P) - \int_a^b \|f\|(t)\,dt + \int_a^b \|f\|(t)\,dt \\
&\underbrace{<}_{(3)} 2\varepsilon + \int_a^b \|f\|(t)\,dt
\end{aligned}
$$

On a donc que

$$
\left\|\int_a^b f(t)\,dt\right\| < \int_a^b \|f\|(t)\,dt + 2\varepsilon
$$

avec $\varepsilon > 0$ arbitraire, donc

$$
\left\|\int_a^b f(t)\,dt\right\| \leq \int_a^b \|f\|(t)\,dt
$$
