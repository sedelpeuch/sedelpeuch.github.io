---
title: "Suites et séries de fonctions"
description: "Suites et séries de fonctions : convergence simple et uniforme, critère de Cauchy uniforme, théorème de la double limite, continuité, intégration et dérivation de la limite, convergence normale."
sidebar_position: 3
---

## Suites de fonctions

**Notations.** Soit $\mathbb{K} = \mathbb{R}$ ou $\mathbb{C}$ et $I$ un intervalle de $\mathbb{R}$. On note $\mathcal{F}(I, \mathbb{K})$ l'espace vectoriel des fonctions de $I$ dans $\mathbb{K}$.

**Définition.** On appelle suite de fonctions $(f_n)_{n \in \mathbb{N}}$ toute application de $\mathbb{N}$ dans $\mathcal{F}(I, \mathbb{K})$. Pour tout $n \in \mathbb{N}$, $f_n$ est donc une fonction de $I$ dans $\mathbb{K}$.

**Définition.** Soit $(f_n)_{n \in \mathbb{N}}$ une suite de fonctions de $I$ dans $\mathbb{K}$ et soit $f \in \mathcal{F}(I, \mathbb{K})$. On dit que $(f_n)_{n \in \mathbb{N}}$ converge simplement vers $f$ si pour tout $x \in I$ la suite de scalaires $(f_n(x))_{n \in \mathbb{N}}$ converge vers $f(x)$.

**Remarque.** En utilisant des quantificateurs, la définition précédente s'écrit

$$
\forall x \in I, \forall \epsilon > 0, \exists N \in \mathbb{N}, \forall n \geq N, |f_n(x) - f(x)| < \epsilon
$$

**Exemple.** La suite $f_n(x) = \sqrt{x + \dfrac{1}{n}}$ converge simplement vers la fonction $f(x) = \sqrt{x}$ sur l'intervalle $I = [0, 1]$.

**Définition.** Soit $(f_n)_{n \in \mathbb{N}}$ une suite de fonctions de $I$ dans $\mathbb{K}$ et soit $f \in \mathcal{F}(I, \mathbb{K})$. On dit que $(f_n)_{n \in \mathbb{N}}$ converge uniformément vers $f$ si

$$
\forall \epsilon > 0, \exists N \in \mathbb{N}, \forall n \geq N, \forall x \in I, |f_n(x) - f(x)| < \epsilon
$$

**Exemple.** Sur $I = [0, 2\pi]$, $f_n(x) = \cos\Big(x + \dfrac{1}{n}\Big)$ ; montrons que $f_n$ converge uniformément vers $f$ avec $f(x) = \cos(x)$. $\cos$ est continue, donc $\cos(x + \frac{1}{n}) \to \cos(x)$. On cherche à majorer $\cos(x + \frac{1}{n}) - \cos(x) = \int_0^1 \frac{d}{dt}\Big(\cos(x + \frac{t}{n})\Big)\,dt = \frac{1}{n} \int_0^1 -\sin(x + \frac{t}{n})\,dt$. On a donc

$$
\Big|\cos\Big(x + \frac{1}{n}\Big) - \cos(x)\Big| \leq \frac{1}{n} \int_0^1 \Big|\sin\Big(x + \frac{t}{n}\Big)\Big|\,dt \leq \frac{1}{n}
$$

Soit $\epsilon > 0$. Prenons $N \geq \dfrac{1}{\epsilon} + 1$, alors $\forall x \in I, \forall n \geq N$

$$
\Big|\cos\Big(x + \frac{1}{n}\Big) - \cos(x)\Big| < \epsilon
$$

**Exercice.** Montrer que $f_n(x) = \sqrt{x + \dfrac{1}{n}}$ converge uniformément vers $f(x) = \sqrt{x}$ sur $[0, 1]$.

**Théorème III.1.** Soit $(f_n)_{n \in \mathbb{N}}$ une suite de fonctions de $I$ dans $\mathbb{K}$. Les assertions suivantes sont équivalentes :

- la suite $(f_n)_{n \in \mathbb{N}}$ vérifie le critère de Cauchy uniforme ;
- il existe $f \in \mathcal{F}(I, \mathbb{K})$ tel que $(f_n)$ converge uniformément vers $f$.

**Démonstration.** $\square$

**Proposition.** Soit $(f_n)_{n \in \mathbb{N}}$ une suite de fonctions convergeant uniformément vers une limite $f$. Alors la suite converge simplement vers $f$.

**Démonstration.** Immédiat. $\square$

**Remarque.** La réciproque est fausse.

**Exemple.** Soit $\begin{cases} f_n(x) = x^n \\ x \in [0, 1[ \end{cases}$, alors $(f_n)$ converge simplement vers la fonction $f = 0$.

$$
\Big[x^n < \epsilon, \ n \ln(x) < \ln(\epsilon), \ n > \frac{\ln(\epsilon)}{\ln(x)} = N_{\epsilon,x} \text{ ; on a } N_{\epsilon,x} \to +\infty\Big]
$$

On n'a pas convergence uniforme ; montrons que $\exists \epsilon > 0, \forall N \in \mathbb{N}, \exists n \geq N, \exists x \in [0, 1[, |f_n(x)| \geq \epsilon$. $\epsilon = \dfrac{1}{2e}$, $N$ quelconque, $n \geq N$ et $x = 1 - \dfrac{1}{n}$, ainsi $f_n(x) = (1 - \dfrac{1}{n})^n \to e^{-1}$.

**Remarque.** $(f_n)$ converge uniformément vers $f$ si et seulement si $\forall \epsilon > 0, \exists N \in \mathbb{N}, \forall n \geq N, \displaystyle\sup_{x \in I} |f_n(x) - f(x)| < \epsilon$, c'est-à-dire $\displaystyle\lim_{n \to +\infty} \sup_{x \in I} |(f_n - f)(x)| = 0$.

**Définition.** Soit $(f_n)$ une suite de $\mathcal{F}(I, \mathbb{K})$. On dit que $(f_n)$ vérifie le critère de Cauchy uniforme si

$$
\forall \epsilon > 0, \exists N \in \mathbb{N}, \forall p, q \geq N, \forall x \in I, |f_p(x) - f_q(x)| < \epsilon
$$

c'est-à-dire

$$
\forall \epsilon > 0, \exists N \in \mathbb{N}, \forall p, q \geq N, \sup_{x \in I} |f_p(x) - f_q(x)| < \epsilon
$$

**Théorème III.2.** Soit $(f_n)$ une suite de $\mathcal{F}(I, \mathbb{K})$. Alors $(f_n)$ converge uniformément vers une fonction $f$ si et seulement si $(f_n)$ vérifie le critère de Cauchy uniforme.

**Démonstration.** Supposons que $f_n$ converge uniformément vers $f$. Alors

$$
\forall \epsilon > 0, \exists N \in \mathbb{N}, \forall x \in X, \forall n \geq N, |f_n(x) - f(x)| < \epsilon \qquad (1)
$$

Soit $\epsilon > 0$ et soit $N$ donné par (1). Soient $p, q \geq N$ et $x \in I$. Alors $|f_p(x) - f_q(x)| \leq |f_p(x) - f(x)| + |f(x) - f_q(x)| < \epsilon + \epsilon = 2\epsilon$ par (1).

Supposons que

$$
\forall \epsilon > 0, \exists N \in \mathbb{N}, \forall p, q \geq N, \forall x \in X, |f_p(x) - f_q(x)| < \epsilon \qquad (2)
$$

En particulier, pour tout $x \in X$, on a

$$
\forall \epsilon > 0, \exists N \in \mathbb{N}, \forall p, q \geq N, |f_p(x) - f_q(x)| < \epsilon
$$

Donc la suite $(f_n(x))_{n \in \mathbb{N}}$ est de Cauchy dans $\mathbb{K}$. Comme $\mathbb{K}$ est complet, elle admet une limite $f(x)$. Ainsi $f_n$ converge simplement vers $f$ quand $n$ tend vers l'infini.

Montrons que la convergence est uniforme, c'est-à-dire

$$
\forall \epsilon > 0, \exists N \in \mathbb{N}, \forall n \geq N, \forall x \in X, |f_n(x) - f(x)| < \epsilon
$$

Soit $\epsilon > 0$ et soit $N$ comme dans (2). Soit $n \geq N$ et soit $x \in X$. Alors pour tout $m \geq N$, on a d'après (2) $|f_n(x) - f_m(x)| < \epsilon$ ; on fait tendre $m$ vers l'infini, il vient $|f_n(x) - f(x)| \leq \epsilon$. $\square$

**Notation.** On notera $\mathcal{B}(I, \mathbb{K})$ l'espace vectoriel des applications bornées sur $I$.

**Proposition.** Pour tout $f \in \mathcal{B}(I, \mathbb{K})$ la quantité

$$
||f||_{\mathcal{B}(I, \mathbb{K})} := \sup_{x \in I} |f(x)|
$$

est bien définie. De plus, l'application

$$
f \mapsto ||f||_{\mathcal{B}(I, \mathbb{K})}
$$

définit une norme sur $\mathcal{B}(I, \mathbb{K})$.

**Théorème III.3.** (Théorème de la double limite) Soit $(f_n) \in \mathcal{F}(I, \mathbb{K})^{\mathbb{N}}$ une suite de fonctions et soit $a \in \overline{I}$. On suppose que

1. la suite $(f_n)$ converge uniformément vers une fonction $f$ ;
2. pour tout $n \in \mathbb{N}$, $f_n$ admet une limite finie $l_n$ lorsque $x$ tend vers $a$.

Alors la suite $(l_n)$ converge vers une limite finie $l$ et $\displaystyle\lim_{x \to a} f(x) = l$.

**Démonstration.** On commence par montrer que la suite $(l_n)$ converge. Pour cela, il suffit de montrer qu'elle est de Cauchy. On se donne $\epsilon > 0$ arbitraire. Comme la suite $(f_n)$ est uniformément convergente, elle vérifie le critère de Cauchy uniforme. Par conséquent, il existe $N \in \mathbb{N}$ tel que

$$
\forall p, q \geq N, \forall x \in I, |f_p(x) - f_q(x)| < \epsilon \qquad (1)
$$

Soit $N$ comme dans (1) et soient $p, q \geq N$.
On a $\forall x \in I, |f_p(x) - f_q(x)| < \epsilon$ ; on fait la limite lorsque $x \to a$, il vient $|l_p - l_q| < \epsilon$. Ceci montre que $(l_n)$ est de Cauchy. Donc elle admet une limite $l \in \mathbb{K}$. Il reste à montrer que $\displaystyle\lim_{x \to a} f(x) = l$.

Soit $\epsilon > 0$. On cherche $\delta > 0$ tel que $|x - a| < \delta \Rightarrow |f(x) - l| < \epsilon$. Comme $(f_n)$ converge uniformément vers $f$, il existe $N \in \mathbb{N}$ tel que

$$
\forall x \in X, |f_N(x) - f(x)| < \epsilon \qquad (2)
$$

On a $l_n \to l$ quand $n \to \infty$. Donc il existe

$$
N_1 \geq N \text{ tel que } |l_{N_1} - l| < \epsilon \qquad (3)
$$

$\displaystyle\lim_{x \to a} f_{N_1}(x) = l_{N_1}$, donc il existe $\delta_1 > 0$ tel que

$$
\forall x \in B(a, \delta_1), |f_{N_1}(x) - l_{N_1}| < \epsilon \qquad (4)
$$

Soit $x$ tel que $|x - a| < \delta_1$, alors

$$
|f(x) - l| \leq \underbrace{|f(x) - f_{N_1}(x)|}_{< \epsilon\ (2)} + \underbrace{|f_{N_1}(x) - l_{N_1}|}_{< \epsilon\ (4)} + \underbrace{|l_{N_1} - l|}_{< \epsilon\ (3)}
$$

$\square$

**Remarque.** La conclusion peut s'écrire

$$
\lim_{x \to a} \lim_{n \to \infty} f_n(x) = \lim_{n \to +\infty} \lim_{x \to a} f_n(x)
$$

**Exemple.** Soit $f_n : \begin{cases} [0, 1[ \to \mathbb{R} \\ x \mapsto x^n \end{cases}$, alors $f_n$ converge simplement vers 0 mais il n'y a pas convergence uniforme.
Prenons $a = 1$, $\displaystyle\lim_{x \to 1} f_n(x) = 1$, donc $\displaystyle\lim_{n \to \infty} \lim_{x \to 1} f_n(x) = 1$.
Mais $\displaystyle\lim_{x \to 1^-} \lim_{n \to \infty} f_n(x) = \lim_{x \to 1^-} 0 = 0$.

**Autre exemple.** $f_n : \begin{cases} [0, \frac{1}{2}] \to \mathbb{R} \\ x \mapsto x^n \end{cases}$. Alors $f_n$ converge uniformément vers 0. $\displaystyle\lim_{n \to +\infty} \lim_{x \to \frac{1}{2}} f_n(x) = \lim_{n \to \infty} \frac{1}{2^n} = 0$, donc $\displaystyle\lim_{x \to \frac{1}{2}} \lim_{n \to \infty} f_n(x) = 0$.

**Théorème III.4.** Soit $(f_n)$ une suite de fonctions continues sur $I$ convergeant uniformément vers $f$. Alors $f$ est continue sur $I$.

**Théorème III.5.** Soit $I = [a, b]$ un intervalle fermé borné de $\mathbb{R}$ et soit $(f_n)_{n \in \mathbb{N}}$ une suite de fonctions continues de $I$ dans $\mathbb{K}$. On suppose que la suite $(f_n)$ converge uniformément vers une limite $f$. Alors

$$
\lim_{n \to +\infty} \int_a^b f_n(t)\,dt = \int_a^b f(t)\,dt
$$

**Démonstration.** Soit $\epsilon > 0$. Comme $(f_n)$ converge uniformément vers $f$, il existe $N \in \mathbb{N}$ tel que

$$
\forall n \geq N, \forall x \in I, |f_n(x) - f(x)| < \frac{\epsilon}{|b - a|}
$$

On en déduit que pour $n \geq N$, on a

$$
\Big|\int_a^b f_n(x)\,dx - \int_a^b f(x)\,dx\Big| \leq \int_a^b |f_n(x) - f(x)|\,dx < \int_a^b \frac{\epsilon}{|b - a|}\,dx = \epsilon
$$

ce qui prouve le résultat. $\square$

**Théorème III.6.** Soit $(f_n)_{n \in \mathbb{N}}$ une suite de fonctions de classe $C^1$ sur $I$ à valeurs dans $\mathbb{K}$. On suppose que

- la suite $(f_n)$ converge simplement vers une limite $f$ ;
- la suite $(f'_n)$ converge uniformément vers une limite $g$.

Alors $f$ est de classe $C^1$ et $f' = g$.

**Démonstration.** Soit $x_0 \in [a, b]$. Pour tout $x \in [a, b]$, on a

$$
f_n(x) = f_n(x_0) + \int_{x_0}^{x} f'_n(t)\,dt
$$

Soit $h(x) = \int_{x_0}^{x} g(t)\,dt$, alors pour tout $x > x_0$

$$
|f_n(x) - f_n(x_0) - h(x)| \leq \int_{x_0}^{x} |f'_n(t) - g(t)|\,dt < |b - a| \sup_{[a,b]} |f'_n - g|
$$

Comme $(f'_n)$ converge vers $g$ uniformément, cela montre que $f_n - f_n(x_0)$ converge uniformément vers $h$ sur $[a, b]$. Or $f_n(x_0)$ converge vers $f(x_0)$, donc $(f_n)$ converge vers $f(x_0) + h$. On en déduit

$$
f(x) = f(x_0) + h(x) = f(x_0) + \int_{x_0}^{x} g(t)\,dt
$$

Cette formule montre que $f$ est dérivable de dérivée $g$. $\square$

## Séries de fonctions

Soit $\mathbb{K} = \mathbb{R}$ ou $\mathbb{C}$ et $I$ un intervalle de $\mathbb{R}$.

**Définition.** Soit $(f_n)$ une suite de fonctions de $I$ dans $\mathbb{K}$. La série de fonctions $\displaystyle\sum_{n \in \mathbb{N}} f_n$ est la suite de fonctions $S_N(x) = \displaystyle\sum_{n=0}^{N} f_n(x)$.

**Définition.** Soit $\displaystyle\sum_{n \in \mathbb{N}} f_n$ une série de fonctions. On dit que cette série converge simplement si pour tout $x \in I$, la série $\displaystyle\sum_{n \in \mathbb{N}} f_n(x)$ converge.

**Définition.** Soit $\displaystyle\sum_{n \in \mathbb{N}} f_n$ une série de fonctions. On dit que cette série converge uniformément si la suite de fonctions $(S_N)$ converge uniformément sur $I$.

**Définition.** Soit $\displaystyle\sum_{n \in \mathbb{N}} f_n$ une série de fonctions. On dit que cette série converge normalement si la série numérique $\displaystyle\sum_{n \in \mathbb{N}} \sup_I |f_n|$ converge.

**Théorème III.7.** La convergence uniforme implique la convergence simple d'une série de fonctions. La convergence normale d'une série de fonctions implique la convergence uniforme de la série.

**Démonstration.** La première partie est évidente. Supposons que $\sum f_n$ est une série de fonctions normalement convergente. Soit $S_n = \displaystyle\sum_{k=0}^{n} f_k$. On va montrer que la suite de fonctions $(S_n)$ vérifie le critère de Cauchy uniforme. On se donne $\epsilon > 0$. Comme la série converge absolument, il existe $N \in \mathbb{N}$ tel que

$$
\sum_{n \geq N} \sup_{x \in I} |f_n(x)| < \epsilon
$$

Supposons que $m \geq n \geq N$ et soit $x \in I$, alors

$$
|S_m(x) - S_n(x)| = \Big|\sum_{k=n+1}^{m} f_k(x)\Big| \leq \sum_{k=n+1}^{m} |f_k(x)| \leq \sum_{k=n+1}^{m} |f_k(x)| \leq \sum_{k=n+1}^{m} |f_k(x)| \leq \sum_{k=n+1}^{\infty} \sup_{z \in I} |f_k(z)| < \epsilon
$$

ce qui prouve le critère de Cauchy uniforme et donc la convergence uniforme de la série. $\square$

**Théorème III.8.** Soit $(f_n)_{n \in \mathbb{N}}$ une suite de fonctions continues de $I$ dans $\mathbb{K}$. On suppose que la série $\displaystyle\sum_{n \in \mathbb{N}} f_n$ converge uniformément. Alors la fonction $f = \displaystyle\sum_{n=0}^{\infty} f_n$ est continue sur $I$.

**Démonstration.** Il suffit d'appliquer le théorème correspondant à la suite de fonctions $S_n(x) = \displaystyle\sum_{k=0}^{n} f_k(x)$. $\square$

**Théorème III.9.** Soit $I = [a, b]$ un intervalle fermé borné de $\mathbb{R}$ et soit $(f_n)_{n \in \mathbb{N}}$ une suite de fonctions continues de $I$ dans $\mathbb{K}$. On suppose que la série $\sum f_n$ converge uniformément et on note $f = \displaystyle\sum_{n=0}^{\infty} f_n$. Alors la série numérique $\displaystyle\sum_{n \in \mathbb{N}} \Big(\int_a^b f_n(t)\,dt\Big)$ converge et on a

$$
\sum_{n=0}^{\infty} \int_a^b f_n(t)\,dt = \int_a^b \sum_{n=0}^{\infty} f_n(t)\,dt
$$

**Démonstration.** Il suffit d'appliquer le théorème correspondant à la suite de fonctions $S_n(x) = \displaystyle\sum_{k=0}^{n} f_k(x)$. $\square$

**Théorème III.10.** Soit $(f_n)_{n \in \mathbb{N}}$ une suite de fonctions de classe $C^1$ sur $I$ à valeurs dans $\mathbb{K}$. On suppose que

- la série $\sum f_n$ converge simplement vers une somme $f$ ;
- la série $\sum f'_n$ converge uniformément vers une somme $g$.

Alors $f$ est de classe $C^1$ et $f' = g$.

**Démonstration.** Il suffit d'appliquer le théorème correspondant à la suite de fonctions $S_n(x) = \displaystyle\sum_{k=0}^{n} f_k(x)$. $\square$
