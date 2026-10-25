---
title: "Séries entières"
description: "Séries entières : lemme d'Abel, rayon de convergence, théorème de Cauchy-Hadamard, somme et dérivation terme à terme, fonctions développables en série entière et formule de Taylor avec reste intégral."
sidebar_position: 4
---

## Rayon de convergence

**Définition.** On appelle série entière toute série de la forme $\displaystyle\sum_{n \in \mathbb{N}} a_n z^n$, avec $(a_n)$ suite de nombres complexes et $z \in \mathbb{C}$.

**Lemme d'Abel.** Soit $(a_n)$ une suite de nombres complexes, et soit $z_0 \in \mathbb{C}$. On suppose que la suite $(a_n z_0^n)_{n \in \mathbb{N}}$ est bornée. Alors, pour tout $z \in \mathbb{C}$ tel que $|z| < |z_0|$, la série $\displaystyle\sum_{n \in \mathbb{N}} a_n z^n$ converge absolument.

**Démonstration.** On peut supposer que $z_0 \neq 0$. On a

$$
|a_n z^n| = |a_n z_0^n| \Big|\frac{z}{z_0}\Big|^n \leq M \Big|\frac{z}{z_0}\Big|^n
$$

avec $M = \displaystyle\sup_{n \in \mathbb{N}} |a_n z_0^n| < \infty$. Comme $|z / z_0| < 1$, alors la série $\sum M |z / z_0|^n$ converge et on peut conclure par le théorème de comparaison. $\square$

**Définition.** On appelle rayon de convergence d'une série entière $\displaystyle\sum_{n \in \mathbb{N}} a_n z^n$ la quantité

$$
R = \sup \{r \geq 0, (a_n r^n) \text{ est bornée}\} \in [0, +\infty]
$$

Il est clair que la suite $(a_n 0^n)$ est bornée. Donc le rayon de convergence est bien défini.

**Proposition.** Soit $\displaystyle\sum_{n \in \mathbb{N}} a_n z^n$ une série entière de rayon de convergence $R \in [0, \infty[$. Alors, pour tout $r \in [0, R[$, la série

$$
\sum_{n \in \mathbb{N}} \sup_{|z| < r} |a_n z^n|
$$

converge.

**Démonstration.** C'est immédiat. $\square$

**Théorème IV.1.** (Théorème de Cauchy-Hadamard) Soit $\displaystyle\sum_{n \in \mathbb{N}} a_n z^n$ une série entière de rayon de convergence $R$. Alors

1. si $\displaystyle\lim_{n \to \infty} \Big|\frac{a_{n+1}}{a_n}\Big| = l \in [0, +\infty]$, alors $R = \dfrac{1}{l}$ ;
2. si $\displaystyle\lim_{n \to \infty} |a_n|^{\frac{1}{n}} = l \in [0, +\infty]$, alors $R = \dfrac{1}{l}$.

**Démonstration.** Preuve de 1. On suppose d'abord que $l \in \left]0, \infty\right[$. Considérons la suite $(b_n)$ définie par $b_n = a_n r^n$. Alors $\dfrac{b_{n+1}}{b_n} = r \dfrac{a_{n+1}}{a_n}$ tend vers $rl$ quand $n \to \infty$. Supposons d'abord que $r < \frac{1}{l}$, alors $rl < 1$ et on en déduit que $\displaystyle\lim_{n \to \infty} b_n = 0$. En particulier, $(b_n)$ est bornée et donc le rayon de convergence $R$ de la série est supérieur à $r$. Comme ceci est vrai pour tout $r < \frac{1}{l}$, on en déduit que $R \geq \frac{1}{l}$.

Réciproquement, supposons que $r > \frac{1}{l}$, alors la suite $(b_n)$ tend vers $+\infty$ et on en déduit que $R < r$ pour tout $r > \frac{1}{l}$. Par suite $R = \frac{1}{l}$.

Preuve de 2. Elle est identique.

## Opérations sur les séries entières

**Proposition.** Soient $\sum a_n z^n$ et $\sum b_n z^n$ deux séries entières de rayons de convergence respectifs $R_a$ et $R_b$, et soit $R$ le rayon de convergence de la série entière $\sum (a_n + b_n) z^n$. Alors

- si $R_a \neq R_b$, alors $R = \min(R_a, R_b)$ ;
- si $R_a = R_b$, alors $R \geq R_a$.

**Démonstration.** Par définition, on a bien $R \geq \min(R_a, R_b)$. Supposons maintenant que $R_a < R_b$ et soit $r \in \left]R_a, R_b\right[$. Alors $(b_n r^n)$ est bornée alors que $(a_n r^n)$ ne l'est pas. Par conséquent $((a_n + b_n) r^n)$ n'est pas bornée et donc $r > R$. Ceci prouve que $R \leq R_a$. $\square$

**Théorème IV.2.** Soit $\displaystyle\sum_n a_n z^n$ une série entière de rayon de convergence $R > 0$. Alors la fonction $f : \begin{cases} \left]-R, R\right[ \to \mathbb{C} \\ z \mapsto \displaystyle\sum_{n=0}^{\infty} a_n z^n \end{cases}$ est $C^\infty$ et pour tout $k \in \mathbb{N}$, on a

$$
f^{(k)}(z) = \sum_{n=0}^{\infty} (n + k)(n + k - 1) \dots (n + 1) a_{n+k} z^n
$$

où cette dernière série entière a pour rayon de convergence $R$.

**Démonstration.** On prouve que $f$ est $C^k$ pour tout $k \in \mathbb{N}^*$. On procède par récurrence sur $k$. On commence par traiter le cas $k = 1$. On considère la série entière

$$
g_1(z) = \sum_{n=0}^{\infty} (n + 1) a_{n+1} z^n
$$

Il est clair que $g_1$ a même rayon de convergence que $f$. De plus, pour tout $r \in \left]0, R\right[$, les séries $f(z)$ et $g_1(z)$ convergent uniformément sur $[-r, r]$. On peut donc appliquer le théorème de dérivation des séries. On en déduit que $f$ est dérivable sur $\left]-r, r\right[$ et que $f' = g_1$. Ceci prouve le résultat au rang $k = 1$.

Supposons maintenant le résultat vrai au rang $k \geq 1$ et montrons que $f$ est $C^{k+1}$. Par hypothèse de récurrence, $f$ est $C^k$ et

$$
f^{(k)}(z) = \sum_{n=0}^{\infty} (n + k)(n + k - 1) \dots (n + 1) a_{n+k} z^n
$$

a pour rayon de convergence $R$. On peut donc appliquer le cas $k = 1$. On en déduit que $f^{(k)}$ est dérivable et que

$$
(f^{(k)})'(z) = \sum_{n=0}^{\infty} (n + k + 1)(n + k) \dots (n + 1) a_{n+k+1} z^n
$$

ce qui achève la démonstration. $\square$

**Proposition.** Soit $f(z) = \displaystyle\sum_n a_n z^n$ une série entière de rayon de convergence $R > 0$. Alors,

$$
\forall n \in \mathbb{N}, a_n = \frac{f^{(n)}(0)}{n!}
$$

**Démonstration.** D'après le théorème précédent, la fonction $f$ est $C^\infty$ et

$$
f^{(k)}(z) = \sum_{n=0}^{\infty} (n + k)(n + k - 1) \dots (n + 1) a_{n+k} z^n
$$

Or, pour tout $n \geq 1$, $0^n = 0$. Par suite

$$
f^{(k)}(0) = \sum_{n=0}^{\infty} (n + k)(n + k - 1) \dots (n + 1) a_{n+k} 0^n = k(k - 1) \dots 1\, a_k = k!\, a_k
$$

et on conclut en divisant par $k!$. $\square$

## Fonctions développables en séries entières

**Définition.** Soit $I$ un intervalle ouvert de $\mathbb{R}$, $f : I \to \mathbb{R}$ une application et $a \in I$. On dit que $f$ est développable en série entière en $a$ s'il existe $\delta > 0$ et une série entière $\displaystyle\sum_{n \in \mathbb{N}} a_n z^n$ de rayon de convergence supérieur à $\delta$ tels que $\left]a - \delta, a + \delta\right[ \subset I$ et

$$
\forall z \in \left]a - \delta, a + \delta\right[, f(z) = \sum_{n=0}^{\infty} a_n (z - a)^n
$$

On notera $f \in DSE(a)$.
On dit que $f$ est développable en série entière sur $I$ si elle est développable en tout point $a$ de $I$.

**Proposition.** Soit $f : I \to \mathbb{R}$ une fonction développable en série entière en $a \in I$ et soit $\delta > 0$ tel que

$$
\forall z \in \left]a - \delta, a + \delta\right[, f(z) = \sum_{n=0}^{\infty} a_n (z - a)^n
$$

Alors $f$ est développable en série entière en tout point $c$ de $\left]a - \delta, a + \delta\right[$.

**Démonstration.** On peut supposer sans perte de généralité que $a = 0$. Soit $\delta > 0$ tel que

$$
\forall z \in \left]-\delta, \delta\right[, f(z) = \sum_{n=0}^{\infty} a_n z^n
$$

On se donne $c \in \left]-\delta, \delta\right[$ et $\epsilon > 0$ tel que $\left]c - \epsilon, c + \epsilon\right[ \subset \left]-\delta, \delta\right[$. On peut supposer que $0 \leq c < c + \epsilon < \delta$. Pour $|z| < \epsilon$, on a

$$
\begin{aligned}
f(c + z) &= \sum_{n=0}^{\infty} a_n (c + z)^n = \sum_{n=0}^{\infty} a_n \sum_{k=0}^{n} \binom{n}{k} c^{n-k} z^k \\
&= \sum_{k=0}^{\infty} \Big(\sum_{n=k}^{\infty} a_n \binom{n}{k} c^{n-k}\Big) z^k
\end{aligned}
$$

On doit donc montrer que la suite $b_k \epsilon^k$ est bornée, où $b_k = \displaystyle\sum_{n=k}^{\infty} a_n \binom{n}{k} c^{n-k}$. Or pour tout $k \leq n$, on a

$$
\epsilon^k \binom{n}{k} c^{n-k} \leq \sum_{l=0}^{n} \epsilon^l \binom{n}{l} c^{n-l} = (c + \epsilon)^n
$$

Par suite $\epsilon^k b_k \leq \displaystyle\sum_{n=k}^{\infty} a_n (c + \epsilon)^n$, qui est le reste d'une série convergente car $f$ est $DSE(0)$. $\square$

**Théorème IV.3.** Soit $f : I \to \mathbb{R}$ une fonction développable en série entière en 0 et soit $r > 0$ tel que

$$
\forall z \in \left]-r, r\right[, f(z) = \sum_{n=0}^{\infty} a_n z^n
$$

Alors $f$ est $C^\infty$ sur $\left]-r, r\right[$ et

$$
\forall n \in \mathbb{N}, a_n = \frac{f^{(n)}(0)}{n!}
$$

En particulier, les coefficients $a_n$ sont uniques.

**Démonstration.** C'est une conséquence immédiate du théorème IV.2 et de la proposition. $\square$

**Remarque.** Attention, il existe des fonctions $C^\infty$ qui ne sont pas développables en série entière. Par exemple, la fonction

$$
f(x) = \begin{cases} 0 & \text{si } x \leq 0 \\ e^{-1/x} & \text{si } x > 0 \end{cases}
$$

appartient à $C^\infty(\mathbb{R})$ et vérifie $f^{(n)}(0) = 0$ pour tout $n \in \mathbb{N}$. Mais cette fonction ne peut pas être DSE en 0, sinon on aurait

$$
f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(0)}{n!} x^n = 0
$$

pour tout $x$ proche de 0, ce qui est impossible puisque $f$ n'est pas identiquement nulle au voisinage de 0.

**Théorème IV.4.** (Formule de Taylor avec reste intégral) Soit $I$ un intervalle ouvert de $\mathbb{R}$ et soit $x_0 \in I$. Supposons que $f \in C^{n+1}(I)$, alors pour tout $x \in I$

$$
f(x) = \sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!} (x - x_0)^k + R_n(x)
$$

avec

$$
R_n(x) = \int_{x_0}^{x} \frac{f^{(n+1)}(t)}{n!} (x - t)^n\,dt
$$

**Théorème IV.5.** Soit $f : I \to \mathbb{R}$ une fonction $C^\infty$ et soit $x_0 \in I$. Alors $f$ est DSE en $x_0$ si et seulement s'il existe $r > 0$ tel que

$$
\forall x \in \left]x_0 - r, x_0 + r\right[, \lim_{n \to +\infty} \int_{x_0}^{x} \frac{f^{(n+1)}(t)}{n!} (x - t)^n\,dt = 0
$$

**Corollaire.** Soit $f : I \to \mathbb{R}$ une fonction $C^\infty$. On suppose qu'il existe $M > 0$ tel que

$$
\forall n \in \mathbb{N}, \forall x \in I, |f^{(n)}(x)| \leq M^n
$$

Alors $f$ est DSE sur $I$.

**Exemple.** Les fonctions $\sin$ et $\cos$ sont DSE sur $\mathbb{R}$.
