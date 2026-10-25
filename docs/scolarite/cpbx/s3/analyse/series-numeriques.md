---
title: "Séries numériques"
description: "Séries numériques : rappels sur les suites, convergence et convergence absolue, séries à termes positifs, comparaison série-intégrale, séries de Riemann, critères de Cauchy et de d'Alembert, séries alternées et produit de Cauchy."
sidebar_position: 1
---

## Généralités

### Rappels sur les suites numériques

Une suite numérique est une fonction $u : \mathbb{N} \to \mathbb{K}$. On la note $u = (u_n)_{n \in \mathbb{N}}$. On note $\mathbb{K}^{\mathbb{N}}$ l'ensemble des suites à valeurs dans $\mathbb{K}$.

**Définition.** Soit $u = (u_n) \in \mathbb{K}^{\mathbb{N}}$ et $l \in \mathbb{K}$. On dit que $(u_n)$ converge vers $l$ quand $n$ tend vers $+\infty$ si et seulement si $\forall \epsilon > 0, \exists N \in \mathbb{N}, \forall n \geq N, |u_n - l| < \epsilon$.

**Exemple.** Soit $u_n = \dfrac{1}{2n + 1}$. Alors $\displaystyle\lim_{n \to +\infty} u_n = 0$.
Soit $\epsilon > 0$, soit $N \in \mathbb{N}$ tel que $N > \frac{1}{2}(\frac{1}{\epsilon} - 1)$. Soit $n \geq N$, alors $|u_n| = \dfrac{1}{2n + 1} < \epsilon$. Le choix de $N$ se fait grâce à $|u_n| < \epsilon \Leftrightarrow \dfrac{1}{2n + 1} < \epsilon \Leftrightarrow N < \frac{1}{2}(\dfrac{1}{\epsilon} - 1)$.

**Définition.** Soit $(u_n)$ une suite numérique. On dit que $(u_n)$ vérifie le critère de Cauchy si $\forall \epsilon > 0, \exists N \in \mathbb{N}, \forall n, m \geq N, |u_n - u_m| < \epsilon$.

**Exemple.** Montrer que toute suite convergente vérifie le critère de Cauchy.

**Théorème I.1.** Soit $(u_n)_{n \in \mathbb{N}}$ une suite numérique vérifiant le critère de Cauchy. Alors $(u_n)_{n \in \mathbb{N}}$ admet une limite finie.

**Preuve.** Admise.

**Théorème I.2.** (Conséquence de la propriété de la borne supérieure dans $\mathbb{R}$) Soit $(u_n)$ une suite à valeurs réelles. On suppose que $(u_n)$ est croissante et majorée (respectivement décroissante et minorée), alors $(u_n)$ admet une limite finie.

### Définitions et premières propriétés des séries

**Définition.** Soit $(u_n)_{n \in \mathbb{N}}$ une suite numérique. On définit la suite des sommes partielles des $u_n$ par :

$$
S_n = \sum_{k=0}^{n} u_k
$$

On appelle série numérique de terme général $(u_n)$ la suite des sommes partielles $(S_n)_{n \in \mathbb{N}}$. On notera $\displaystyle\sum_{n \in \mathbb{N}} u_n$ cette série numérique.

**Définition.** On dit que la série numérique $\displaystyle\sum_{n \in \mathbb{N}} u_n$ converge si et seulement si la suite des sommes partielles $(S_n)$ converge. Dans ce cas on note $\displaystyle\sum_{n=0}^{+\infty} u_n$ sa limite.

**Exemple.** Soit $z \in \mathbb{R}$. Soit $u_n = z^n$. Alors la série $\displaystyle\sum_{n \in \mathbb{N}} u_n$ converge si et seulement si $|z| < 1$.

**Démonstration.** On a $S_n = \displaystyle\sum_{k=0}^{n} z^k$.

- Si $z \neq 1$, alors $S_n = \dfrac{1 - z^{n+1}}{1 - z} = \underbrace{\dfrac{1}{1 - z}}_{\in \mathbb{K}} - \underbrace{\dfrac{1}{1 - z}}_{\in \mathbb{K}} \times z^{n+1}$. Or la suite $(z^{n+1})_{n \in \mathbb{N}}$ converge si et seulement si $z \in \left]-1, 1\right]$.
- Si $z = 1$, $S_n = n + 1 \to +\infty$.

**Définition.** Soit $\displaystyle\sum_{k \in \mathbb{N}} u_k$ une série convergente. Alors pour tout $n \in \mathbb{N}$ la série $\displaystyle\sum_{k \geq n+1} u_k$ est convergente. On note $R_n = \displaystyle\sum_{k=n+1}^{\infty} u_k$. $(R_n)_{n \in \mathbb{N}}$ s'appelle la suite des restes et on a $S_n + R_n = \displaystyle\sum_{k=0}^{+\infty} u_k$.

**Proposition.** Soit $\displaystyle\sum_{n \in \mathbb{N}} u_n$ une série convergente. Alors $\displaystyle\lim_{n \to +\infty} R_n = 0$.

**Preuve.** On a $S_n + R_n = \displaystyle\sum_{k=0}^{\infty} u_k$. Or $\displaystyle\lim_{n \to \infty} S_n = \sum_{k=0}^{+\infty} u_k$. Par suite $\displaystyle\lim_{n \to +\infty} R_n = \sum_{k=0}^{+\infty} u_k - \lim_{n \to +\infty} S_n = 0$.

**Propriété.** Soient $\displaystyle\sum_{n \in \mathbb{N}} u_n$ et $\displaystyle\sum_{n \in \mathbb{N}} v_n$ deux séries numériques convergentes et soient $\lambda, \mu \in \mathbb{K}$. Alors la série $\displaystyle\sum_{n \in \mathbb{N}} (\lambda u_n + \mu v_n)$ converge et

$$
\sum_{n=0}^{+\infty} (\lambda u_n + \mu v_n) = \lambda \sum_{n=0}^{+\infty} u_n + \mu \sum_{n=0}^{+\infty} v_n
$$

**Démonstration.** $\displaystyle\sum_{k=0}^{n} (\lambda u_k + \mu v_k) = \lambda \sum_{k=0}^{n} u_k + \mu \sum_{k=0}^{n} v_k$ et faire $n \to \infty$.

**Proposition.** Soit $(u_n)$ une suite numérique. On suppose que la série $\displaystyle\sum_{n \in \mathbb{N}} u_n$ converge. Alors $\displaystyle\lim_{n \to +\infty} u_n = 0$.

**Démonstration.** On a $S_n - S_{n-1} = \displaystyle\sum_{k=0}^{n} u_k - \sum_{k=0}^{n-1} u_k = u_n$. Comme la série est convergente, $S_n$ a une limite finie $l$. Donc $u_n = S_n - S_{n-1} \to l - l = 0$.

**Remarque.** La réciproque est fausse : il existe des suites $(u_n)$ qui convergent vers 0 telles que $\sum u_n$ ne converge pas, comme $u_n = \frac{1}{n}$.

**Exercice.** Soit $(u_n)$ une suite d'éléments de $\mathbb{K}$. Montrer que $(u_n)$ converge est équivalent à : la série $\displaystyle\sum_{n \in \mathbb{N}} (u_{n+1} - u_n)$ converge.

$\forall n \in \mathbb{N}, S_n = \displaystyle\sum_{k=0}^{n} (u_{k+1} - u_k) = -u_0 + u_1 - u_1 + u_2 + \dots + u_n - u_n + u_{n+1} = u_{n+1} - u_0$. Or $S_n = u_{n+1} - u_0$, donc $(S_n)$ converge si et seulement si $(u_{n+1})$ converge, et on a $\displaystyle\lim_{n \to +\infty} S_n = \lim_{n \to +\infty} u_{n+1} - u_0 = l - u_0 = l' \in \mathbb{K}$. Or $u_n$ converge, donc $\displaystyle\lim_{n \to +\infty} u_n = l \in \mathbb{K}$.

**Définition.** Soit $(u_n) \in \mathbb{K}^{\mathbb{N}}$. On dit que la série $\displaystyle\sum_{n \in \mathbb{N}} u_n$ converge absolument si la série $\displaystyle\sum_{n \in \mathbb{N}} |u_n|$ converge.

**Théorème I.3.** Toute série absolument convergente est convergente.

**Démonstration.** Soit $(u_n)$ une suite. On suppose que la série $\sum |u_n|$ converge. Soit $S_n^+ = \displaystyle\sum_{k=0}^{n} |u_k|$. La suite $(S_n^+)$ est convergente. Par conséquent elle vérifie le critère de Cauchy : $\forall \epsilon > 0, \exists N \in \mathbb{N}, \forall n > m \geq N, |S_n^+ - S_m^+| < \epsilon$. Par suite

$$
\forall \epsilon > 0, \exists N \in \mathbb{N}, \forall n > m > N, \sum_{k=m+1}^{n} |u_k| < \epsilon \qquad (1)
$$

Montrons que la série $\sum u_n$ converge, c'est-à-dire que la suite $S_n = \displaystyle\sum_{k=0}^{n} u_k$ converge. Montrons que $(S_n)$ est de Cauchy, c'est-à-dire $\forall \epsilon > 0, \exists N \in \mathbb{N}, \forall n > m \geq N, |S_n - S_m| < \epsilon \Leftrightarrow \forall \epsilon > 0, \exists N \in \mathbb{N}, \forall n > m \geq N, \left|\displaystyle\sum_{k=m+1}^{n} u_k\right| < \epsilon$.

Soit $\epsilon > 0$. Soit $N$ donné par (1). Soient $n > m \geq N$, alors $\left|\displaystyle\sum_{k=m+1}^{n} u_k\right| \leq \displaystyle\sum_{k=m+1}^{n} |u_k| < \epsilon$.

**Remarque.** La réciproque du théorème est fausse : il existe des séries convergentes qui ne sont pas absolument convergentes. Par exemple $\displaystyle\sum_{n \in \mathbb{N}} \frac{(-1)^n}{n}$ converge mais ne converge pas en valeur absolue.

## Séries à termes positifs

**Théorème I.4.** Soit $(u_n) \in \mathbb{K}^{\mathbb{N}}$ tel que $u_n \geq 0\ \forall n$. Alors la série $\displaystyle\sum_{n \in \mathbb{N}} u_n$ converge si et seulement si la suite des sommes partielles $(S_n)$ est majorée.

**Démonstration.** On remarque $S_{n+1} - S_n = u_{n+1} \geq 0$. Donc la suite $(S_n)$ est croissante. Par conséquent elle converge si et seulement si elle est majorée.

### Théorèmes de comparaison généraux

**Théorème I.5.** Soient $(u_n)$ et $(v_n)$ deux suites de scalaires telles que $\forall n \in \mathbb{N}, 0 \leq u_n \leq v_n$. Alors

1. Si la série $\displaystyle\sum_{n \in \mathbb{N}} v_n$ converge, alors la série $\displaystyle\sum_{n \in \mathbb{N}} u_n$ converge et $\displaystyle\sum_{n=0}^{+\infty} u_n \leq \sum_{n=0}^{+\infty} v_n$.
2. Si la série $\displaystyle\sum_{n \in \mathbb{N}} u_n$ diverge, alors la série $\sum v_n$ diverge.

**Démonstration.** Soit $S_n = \displaystyle\sum_{k=0}^{n} u_k$ et $\tilde{S}_n = \displaystyle\sum_{k=0}^{n} v_k$. Alors $S_n \leq \tilde{S}_n, \forall n \in \mathbb{N}$.

1. Supposons $\sum v_n$ convergente. Alors $\tilde{S}_n$ est majorée. Donc $(S_n)$ est majorée. Donc $(S_n)$ converge d'après le théorème précédent. Donc la série $\sum u_n$ converge. (Supposons $u_n \geq 0$ et $\sum u_n$ ne converge pas. Alors la suite des sommes partielles $(S_n)$ tend vers $+\infty$.)
2. $\sum u_n$ diverge $\Rightarrow S_n \to +\infty$. Comme $\tilde{S}_n \geq S_n$, alors $\tilde{S}_n \to +\infty \Rightarrow \sum v_n$ diverge.

**Corollaire 1.** Soient $(u_n)$ et $(v_n)$ deux suites numériques. On suppose qu'il existe $n_0 \in \mathbb{N}$ tel que $\forall n \geq n_0, 0 \leq u_n \leq v_n$. Alors :

1. $\displaystyle\sum_{n \in \mathbb{N}} v_n$ converge $\Rightarrow \displaystyle\sum_{n \in \mathbb{N}} u_n$ converge.
2. $\displaystyle\sum_{n \in \mathbb{N}} u_n$ diverge $\Rightarrow \displaystyle\sum_{n \in \mathbb{N}} v_n$ diverge.

**Rappel.** Soient $(u_n)$ et $(v_n)$ deux suites strictement positives à partir d'un certain rang. On dit que $(u_n)$ et $(v_n)$ sont équivalentes si et seulement si $\displaystyle\lim_{n \to +\infty} \frac{u_n}{v_n} = 1$. On note $u_n \sim v_n$.

De plus,

- si $\sum u_n$ converge, alors les restes des séries sont équivalents :

  $$
  \Big(\sum_{k=n}^{\infty} u_k\Big)_n \sim_{n \to \infty} \Big(\sum_{k=n}^{+\infty} v_k\Big)
  $$

- si $\sum u_n$ diverge, alors

  $$
  \Big(\sum_{k=0}^{n} u_k\Big) \sim_{n \to \infty} \Big(\sum_{k=0}^{n} v_k\Big)
  $$

**Démonstration.** Supposons qu'on est dans le cas convergent : $u_n \sim v_n \Rightarrow \displaystyle\lim_{n \to \infty} \frac{u_n}{v_n} = 1$.
Soit $\epsilon > 0$, il existe $n_0 \in \mathbb{N}, \forall n \geq n_0, (1 - \epsilon) v_n \leq u_n \leq (1 + \epsilon) v_n$. Soit $n \geq n_0$, alors :

$$
(1 - \epsilon) \sum_{k=n}^{N} v_k \leq \sum_{k=n}^{N} u_k \leq (1 + \epsilon) \sum_{k=n}^{N} v_k
$$

Comme les séries $\sum u_n$ et $\sum v_n$ convergent, on peut faire $N \to +\infty$. Il vient donc :

$$
(1 - \epsilon) \sum_{k=n}^{\infty} v_k \leq \sum_{k=n}^{\infty} u_k \leq (1 + \epsilon) \sum_{k=n}^{\infty} v_k
$$

Cas divergent : on a $n_0$ tel que $\forall n \geq n_0, (1 - \epsilon) v_n \leq u_n \leq (1 + \epsilon) v_n$.

$$
\sum_{k=0}^{n} u_k = \sum_{k=0}^{n_0} u_k + \sum_{k=n_0+1}^{n} u_k
$$

$$
\begin{aligned}
&\sum_{k=0}^{n_0} u_k + (1 - \epsilon) \sum_{k=n_0+1}^{n} v_k \leq \sum_{k=0}^{n} u_k \leq \sum_{k=0}^{n_0} u_k + (1 + \epsilon) \sum_{k=n_0+1}^{n} v_k \\
&\sum_{k=0}^{n_0} (u_k - v_k) + (1 - \epsilon) \sum_{k=0}^{n} v_k \leq \sum_{k=0}^{n} u_k \leq \sum_{k=0}^{n_0} (u_k - v_k) + (1 + \epsilon) \sum_{k=0}^{n} v_k
\end{aligned}
$$

On conclut par :

$$
(1 - \epsilon) + \frac{\displaystyle\sum_{k=0}^{n_0} (u_k - v_k)}{\displaystyle\sum_{k=0}^{n} v_k} \leq \frac{\displaystyle\sum_{k=0}^{n} u_k}{\displaystyle\sum_{k=0}^{n} v_k} \leq (1 + \epsilon) + \frac{\displaystyle\sum_{k=0}^{n_0} (u_k - v_k)}{\displaystyle\sum_{k=0}^{n} v_k}
$$

Or $\sum v_n$ diverge, donc les fractions des termes de droite et de gauche tendent vers 0. $\square$

**Corollaire 2.** Soient $(u_n)$ et $(v_n)$ deux suites strictement positives à partir d'un certain rang et telles que $u_n \sim v_n$ quand $n \to +\infty$. Alors les séries $\sum u_n$ et $\sum v_n$ sont de même nature (c'est-à-dire $\sum u_n$ converge $\Leftrightarrow \sum v_n$ converge).

**Démonstration.** Comme $u_n \sim v_n$, il existe $N \in \mathbb{N}$ tel que $\forall n \geq N, \dfrac{v_n}{2} \leq u_n \leq 2 v_n \Leftrightarrow \dfrac{1}{2} \leq \dfrac{u_n}{v_n} \leq 2$.
$\epsilon = \frac{1}{2}$, $\exists N \in \mathbb{N}\ \forall n \geq N, \left|\dfrac{u_n}{v_n} - 1\right| < \frac{1}{2}$, $\forall n \geq N, -\frac{1}{2} < \dfrac{u_n}{v_n} - 1 < \frac{1}{2}$. $\square$

### Séries et intégrales

Dans cette section on utilise des résultats sur les intégrales impropres pour étudier la convergence des séries positives. Pour toute fonction continue sur $\mathbb{R}_+$ et pour tout réel $a \in \mathbb{R}$, on note :

$$
\mathcal{I}_N(f; a) = \int_a^N f(x)\,dx
$$

**Définition.** Soit $f : [a, +\infty[ \to \mathbb{R}$ une fonction continue. Supposons que la suite $(\mathcal{I}_N(f, a))_{N \in \mathbb{N}}$ admet une limite quand $N \to +\infty$. Alors on note $\int_a^{+\infty} f(x)\,dx$ cette limite et on dit que l'intégrale impropre $\int_a^{\infty} f(x)\,dx$ est convergente.

**Exemple.** L'intégrale impropre $\displaystyle\int_1^{\infty} \frac{1}{x^\alpha}\,dx$ converge si et seulement si $\alpha > 1$.

**Théorème I.6.** Soit $f : \mathbb{R}^+ \to \mathbb{R}^+$ une fonction continue positive décroissante et soit $(u_n)$ la suite définie par $u_n = f(n)$. Alors la série $\displaystyle\sum_{n \in \mathbb{N}} u_n$ et l'intégrale impropre $\displaystyle\int_0^{+\infty} f(t)\,dt$ sont de même nature.

**Démonstration.** Comme $f$ est décroissante, on a pour tout $n \in \mathbb{N}$ et pour tout $t \in [n, n + 1]$, $f(n) \geq f(t) \geq f(n + 1)$. Par suite,

$$
\int_n^{n+1} f(n)\,dx \geq \int_n^{n+1} f(t)\,dt \geq \int_n^{n+1} f(n + 1)\,dx
$$

D'où

$$
f(n) \geq \int_n^{n+1} f(x)\,dx \geq f(n + 1)
$$

En sommant entre 0 et $N$, il vient :

$$
\sum_{n=0}^{N} f(n) \geq \sum_{n=0}^{N} \int_n^{n+1} f(x)\,dx \geq \sum_{n=0}^{N} f(n + 1)
$$

On note $S_N = \displaystyle\sum_{n=0}^{N} f(n)$. Il vient

$$
S_N \geq \int_0^{N+1} f(x)\,dx \geq S_{N+1} - f(0)
$$

c'est-à-dire

$$
S_N \geq \mathcal{I}_N(f; 0) \geq S_{N+1} - f(0)
$$

Rappelons que comme $f$ est positive, $(S_N)_{N \in \mathbb{N}}$ est croissante. De plus $\mathcal{I}_{N+1}(f) - \mathcal{I}_N(f) = \int_N^{N+1} f(x)\,dx \geq 0$ car $f \geq 0$. Donc $(\mathcal{I}_N)_{N \in \mathbb{N}}$ est croissante.

Supposons d'abord que $(\mathcal{I}_N(f))$ converge. Alors cette suite est majorée par $M > 0$. Donc $(S_{N+1})$ est majorée par $M + f(0)$ ; comme elle est croissante, elle est convergente.

Supposons que $(S_N)$ converge. Alors elle est majorée par $M > 0$. Donc $\mathcal{I}_N(f) \leq M$. Comme elle est croissante, alors elle converge. $\square$

**Remarque.** Supposons que la série et l'intégrale convergent. Faisons $N \to +\infty$ dans

$$
S_N \geq \int_0^{N+1} f(x)\,dx \geq S_{N+1} - f(0)
$$

il vient

$$
\sum_{n=0}^{+\infty} f(n) \geq \int_0^{+\infty} f(x)\,dx \geq \sum_{n=1}^{+\infty} f(n)
$$

**Théorème I.7.** (Série de Riemann) Soit $\alpha \in \mathbb{R}$. La série $\displaystyle\sum_{n \in \mathbb{N}} \frac{1}{n^\alpha}$ converge si et seulement si $\alpha > 1$.

**Démonstration.** Considérons la suite $(\mathcal{I}_N(\alpha))_N$ définie par

$$
\mathcal{I}_N(\alpha) = \int_1^N x^{-\alpha}\,dx
$$

Un calcul immédiat montre que

$$
\mathcal{I}_N(\alpha) = \begin{cases} \ln(N) & \text{si } \alpha = 1 \\ \dfrac{1}{1 - \alpha}(N^{1 - \alpha} - 1) & \text{sinon} \end{cases}
$$

On en déduit que la suite $(\mathcal{I}_N(\alpha))_N$ converge si et seulement si $\alpha > 1$. En appliquant le théorème précédent on obtient le résultat annoncé. $\square$

**Exemple : série de Bertrand.** Soit $\beta \in \mathbb{R}$. La série $\displaystyle\sum_{n \geq 2} \frac{1}{n \ln(n)^\beta}$ converge si et seulement si $\beta > 1$.

**Proposition.** Soit $u \in \mathbb{K}^{\mathbb{N}}$ une série numérique. On suppose qu'il existe $\alpha > 1$ tel que la suite $(n^\alpha u_n)$ est bornée. Alors la série $\displaystyle\sum_{n \in \mathbb{N}} u_n$ converge absolument.

**Démonstration.** Puisque $(n^\alpha u_n)$ est bornée, il existe $C > 0$ tel que :

$$
\forall n \in \mathbb{N}^*, |u_n| \leq \frac{C}{n^\alpha}
$$

Or la série $\sum \dfrac{C}{n^\alpha}$ converge d'après le théorème précédent, et en appliquant le théorème I-4, on en déduit que la série $\sum |u_n|$ converge. $\square$

**Corollaire.** Supposons que $n^\alpha u_n$ admet une limite quand $n \to +\infty$ et $\alpha > 1$. Alors $\displaystyle\sum_{n \in \mathbb{N}} |u_n|$ converge.

### Critères de Cauchy et de d'Alembert

Rappelons tout d'abord que la série géométrique $\displaystyle\sum_{n \in \mathbb{N}} r^n$ converge si $|r| < 1$ et diverge sinon. Les critères de Cauchy et de d'Alembert permettent de comparer une série à termes positifs avec les séries géométriques. Pour comparer $u_n$ avec $r^n$, le critère de Cauchy porte sur $\sqrt[n]{u_n}$, le critère de d'Alembert sur $\dfrac{u_{n+1}}{u_n}$.

**Théorème I.8.** (Critère de Cauchy) Soit $(u_n)$ une suite de réels strictement positifs. On suppose

$$
\lim_{n \to +\infty} (u_n)^{\frac{1}{n}} = l \in \mathbb{R}^+
$$

Alors

- si $l < 1$, la série $\displaystyle\sum_{n \in \mathbb{N}} u_n$ converge ;
- si $l > 1$, la série $\displaystyle\sum_{n \in \mathbb{N}} u_n$ diverge.

**Démonstration.** Supposons que $l < 1$. Il existe $\epsilon > 0$ tel que $l + \epsilon < 1$. Comme $\displaystyle\lim_{n \to +\infty} (u_n)^{\frac{1}{n}} = l$, il existe $N \in \mathbb{N}$ tel que

$$
\forall n \geq N, (u_n)^{\frac{1}{n}} \leq l + \epsilon
$$

qui devient, en élevant à la puissance $n$ :

$$
\forall n \geq N, u_n \leq (l + \epsilon)^n
$$

Or $0 < l + \epsilon < 1$, donc la série $\displaystyle\sum_{n \in \mathbb{N}} (l + \epsilon)^n$ converge. En appliquant le corollaire I-1, on obtient la convergence de la série $\displaystyle\sum_{n \in \mathbb{N}} u_n$.

Supposons maintenant que $l > 1$. Il existe $\epsilon > 0$ tel que $l - \epsilon > 1$. Comme $\displaystyle\lim_{n \to +\infty} (u_n)^{\frac{1}{n}} = l$, il existe $N \in \mathbb{N}$ tel que

$$
\forall n \geq N, (u_n)^{\frac{1}{n}} \geq l - \epsilon
$$

qui devient, en élevant à la puissance $n$ :

$$
\forall n \geq N, u_n \geq (l - \epsilon)^n
$$

$\square$

**Remarque.** Dans le cas $l = 1$, on ne peut pas conclure, il faut étudier la suite plus attentivement.

**Théorème I.9.** (Critère de d'Alembert) Soit $(u_n)$ une suite de réels strictement positifs. On suppose

$$
\lim_{n \to +\infty} \frac{u_{n+1}}{u_n} = l \in \mathbb{R}^+
$$

Alors

- si $l < 1$, la série $\displaystyle\sum_{n \in \mathbb{N}} u_n$ converge ;
- si $l > 1$, la série $\displaystyle\sum_{n \in \mathbb{N}} u_n$ diverge.

**Remarque.** Dans le cas $l = 1$, on ne peut pas conclure, il faut étudier la suite plus attentivement.

**Démonstration.** Supposons que $l < 1$. Il existe $\epsilon > 0$ tel que $0 < l + \epsilon < 1$. Comme $\displaystyle\lim_{n \to +\infty} \frac{u_{n+1}}{u_n} = l$, il existe $n_0 \in \mathbb{N}$ tel que

$$
\forall n \geq n_0, \frac{u_{n+1}}{u_n} \leq l + \epsilon
$$

Par récurrence immédiate, on en déduit que

$$
\forall n \geq n_0, 0 < u_n \leq (l + \epsilon)^{n - n_0} u_{n_0}
$$

Or $0 < l + \epsilon < 1$, donc la série $\displaystyle\sum_{n \in \mathbb{N}} (l + \epsilon)^{n - n_0}$ converge. En appliquant le corollaire II-3, on obtient la convergence de la série $\sum_{n \in \mathbb{N}} u_n$.

Supposons maintenant que $l > 1$. Il existe $\epsilon > 0$ tel que $l - \epsilon > 1$. Comme $\displaystyle\lim_{n \to \infty} \frac{u_{n+1}}{u_n} = l$, il existe $n_0 \in \mathbb{N}$ tel que

$$
\forall n \geq n_0, \frac{u_{n+1}}{u_n} \geq l - \epsilon
$$

Par une récurrence immédiate, on en déduit que

$$
\forall n \geq n_0, u_n \geq (l - \epsilon)^{n - n_0} u_{n_0}
$$

Or $l - \epsilon > 1$, donc la série $\displaystyle\sum_{n \in \mathbb{N}} (l - \epsilon)^n$ diverge. $\square$

## Séries quelconques

### Séries alternées

On appelle série alternée toute série dont le terme général $(u_n)$ est de la forme $u_n = (-1)^n v_n$ avec $v_n \geq 0$.

**Théorème I.10.** Soit $\displaystyle\sum_{n \in \mathbb{N}} (-1)^n v_n$ une série alternée. On suppose que la suite $(v_n)$ est décroissante et positive ; de plus elle tend vers 0 quand $n \to \infty$. Alors la série $\displaystyle\sum_{n \in \mathbb{N}} (-1)^n v_n$ est convergente.

**Démonstration.** Soit $(S_n)$ la suite des sommes partielles. On considère les deux suites extraites $(S_{2n})$ et $(S_{2n+1})$. On va montrer que ces deux suites sont adjacentes.

Comme $v_n \geq 0$ pour tout $n$, alors :

$$
S_{2n+1} - S_{2n} = -v_{2n+1} \leq 0
$$

et par conséquent $S_{2n} \geq S_{2n+1}$ pour tout $n$. De plus, comme $v_n \to 0$, alors $S_{2n+1} - S_{2n} \to 0$ quand $n \to \infty$. Par ailleurs, pour tout $n \in \mathbb{N}$, on a

$$
S_{2(n+1)} - S_{2n} = v_{2n+2} - v_{2n+1} \leq 0
$$

car $(v_n)$ est décroissante. Ceci prouve que $(S_{2n})$ est décroissante. De même, on montre que $(S_{2n+1})$ est croissante. On déduit de ce qui précède que les suites $(S_{2n})$ et $(S_{2n+1})$ sont adjacentes. Par suite, elles convergent vers une limite $l$. On en déduit que la suite $(S_n)$ converge vers $l$, ce qui prouve le résultat. $\square$

**Remarque.** $S_n = v_0 - v_1 + v_2 - v_3 + \dots + v_{2n-2} - v_{2n-1} + v_{2n}$. Donc $S_{2n} \geq 0$ et $S_{2n+1} \geq 0$. Par conséquent $l \geq 0$, c'est-à-dire que la somme d'une série alternée est positive.

**Exemple.** Soit $\alpha \in \left]0, 1\right]$, alors la série $\displaystyle\sum_{n \geq 0} \frac{(-1)^n}{(n + 1)^\alpha}$ converge. En effet on peut appliquer le théorème avec $v_n = \dfrac{1}{(n + 1)^\alpha}$, qui est bien positive, décroissante, et $\displaystyle\lim_{n \to +\infty} \frac{1}{(n + 1)^\alpha} = 0$, donc $\displaystyle\sum_{n=0}^{+\infty} \frac{(-1)^n}{(n + 1)^\alpha} \geq 0$. Que peut-on dire sur $\displaystyle\sum_{n=1}^{+\infty} \frac{(-1)^n}{(n + 1)^\alpha}$ ? Elle est convergente et donc négative.

**Remarque.** $\displaystyle\sum_{n \geq n_0} (-1)^n v_n$, avec $(v_n)$ qui vérifie le critère des séries alternées, a le signe de $(-1)^{n_0}$.

**Exercice.** (Théorème d'Abel) Soient $(a_n)$, $(b_n)$ deux suites. On suppose que

- $a_n \to 0$ quand $n \to \infty$ ;
- la suite $\Big(\displaystyle\sum_{k=0}^{n} b_k\Big)_n$ est bornée ;
- la série $\displaystyle\sum_{n \in \mathbb{N}} (a_{n+1} - a_n)$ est absolument convergente.

Montrer que la série $\displaystyle\sum_{n \in \mathbb{N}} a_n b_n$ converge.

### Produit de Cauchy des séries

Dans cette section on considère des séries à valeurs dans $\mathbb{K}$.

**Définition.** Soient $\displaystyle\sum_{n \in \mathbb{N}} a_n$ et $\displaystyle\sum_{n \in \mathbb{N}} b_n$ deux séries. On appelle produit de Cauchy de ces deux séries la série $\displaystyle\sum_{n \in \mathbb{N}} c_n$ de terme général

$$
c_n = \sum_{k=0}^{n} a_k b_{n-k} = \sum_{k=0}^{n} b_k a_{n-k}
$$

**Lemme.** Soient $\displaystyle\sum_{n \in \mathbb{N}} a_n$ et $\displaystyle\sum_{n \in \mathbb{N}} b_n$ deux séries positives convergentes. Alors leur produit de Cauchy $\displaystyle\sum_{n \in \mathbb{N}} c_n$ est une série positive convergente et on a :

$$
\sum_{n=0}^{\infty} c_n = \Big(\sum_{n=0}^{\infty} a_n\Big)\Big(\sum_{n=0}^{\infty} b_n\Big)
$$

**Démonstration.** Soient

$$
A_n = \sum_{k=0}^{n} a_k, \quad B_n = \sum_{k=0}^{n} b_k, \quad C_n = \sum_{k=0}^{n} c_k
$$

D'après la définition des $c_k$, on a :

$$
\begin{aligned}
C_n &= \sum_{k=0}^{n} \sum_{l=0}^{k} a_l b_{k-l} \leq \sum_{k=0}^{n} \sum_{p+q=k} a_p b_q = \sum_{(p,q),\, p+q \leq n} a_p b_q \\
&\leq \Big(\sum_{p=0}^{n} a_p\Big)\Big(\sum_{q=0}^{n} b_q\Big) = A_n B_n
\end{aligned}
$$

Par ailleurs, comme on a l'inclusion

$$
\left\{(p, q) \in \mathbb{N}^2, 0 \leq p, q \leq n\right\} \subset \left\{(p, q) \in \mathbb{N}^2, p + q \leq 2n\right\}
$$

on a aussi

$$
A_n B_n = \Big(\sum_{p=0}^{n} a_p\Big)\Big(\sum_{q=0}^{n} b_q\Big) = \sum_{0 \leq p, q \leq n} a_p b_q \leq \sum_{0 \leq p + q \leq 2n} a_p b_q = C_{2n}
$$

On a montré que :

$$
C_n \leq A_n B_n \leq C_{2n}
$$

Par définition, les suites $(A_n)$ et $(B_n)$ convergent respectivement vers $A = \displaystyle\sum_{n=0}^{\infty} a_n$ et $B = \displaystyle\sum_{n=0}^{\infty} b_n$. Comme la suite $C_n$ est croissante, on déduit de l'inégalité de gauche qu'elle converge vers une limite $C \leq AB$. Par suite $(C_{2n})$ converge aussi et l'inégalité de droite montre que $AB \leq C$. On en déduit $C = AB$. $\square$

**Théorème I.11.** Soient $\displaystyle\sum_{n \in \mathbb{N}} a_n$ et $\displaystyle\sum_{n \in \mathbb{N}} b_n$ deux séries absolument convergentes. Alors leur produit de Cauchy $\displaystyle\sum_{n \in \mathbb{N}} c_n$ est une série absolument convergente et on a

$$
\sum_{n=0}^{\infty} c_n = \Big(\sum_{n=0}^{\infty} a_n\Big)\Big(\sum_{n=0}^{\infty} b_n\Big)
$$

**Démonstration.** Soient

$$
c_n = \sum_{k=0}^{n} a_k b_{n-k} \quad \text{et} \quad c'_n = \sum_{k=0}^{n} |a_k b_{n-k}|
$$

Par définition, $c_n$ est le produit de Cauchy des séries $\sum a_n$ et $\sum b_n$, et $c'_n$ est le produit de Cauchy des séries $\sum |a_n|$ et $\sum |b_n|$.

D'après le lemme précédent, la série $\displaystyle\sum_{n \in \mathbb{N}} c'_n$ converge. Comme on a par ailleurs $|c_n| \leq c'_n$ pour tout $n \in \mathbb{N}$, on en déduit que la série converge absolument.

Il reste à montrer que la suite $A_n B_n - C_n$ converge vers 0. En reprenant les calculs précédents, on voit que

$$
\begin{aligned}
|A_n B_n - C_n| &= \Big|\sum_{n < p + q \leq 2n} a_p b_q\Big| \leq \sum_{n < p + q \leq 2n} |a_p b_q| \\
&\leq \sum_{k=n+1}^{2n} \sum_{l=0}^{k} |a_l b_{k-l}| \leq \sum_{k=n+1}^{2n} c'_k \leq \sum_{k=n+1}^{\infty} c'_k
\end{aligned}
$$

Or $\sum c'_k$ converge, donc le membre de droite tend vers 0. $\square$

**Théorème I.12.** Soient $\sum a_n$ et $\sum b_n$ deux séries absolument convergentes. Alors leur produit de Cauchy est absolument convergent et on a :

$$
\sum_{n=0}^{\infty} c_n = \Big(\sum_{n=0}^{\infty} a_n\Big)\Big(\sum_{n=0}^{\infty} b_n\Big)
$$

**Application.** Soit $z \in \mathbb{C}$, la série $\displaystyle\sum_{n \in \mathbb{N}} \frac{z^n}{n!}$ est absolument convergente. On note $e^z = \exp(z) = \displaystyle\sum_{n=0}^{\infty} \frac{z^n}{n!}$. On a $\forall x, y \in \mathbb{C}, e^x e^y = e^{x+y}$.

**Démonstration.** $\sum \dfrac{|z|^n}{n!}$ converge par le critère de d'Alembert.

$$
e^{x+y} = \sum_{n=0}^{\infty} \frac{1}{n!}(x + y)^n = \sum_{n=0}^{\infty} \frac{1}{n!} \sum_{k=0}^{n} \binom{n}{k} x^k y^{n-k} = \sum_{n=0}^{\infty} \Big(\sum_{k=0}^{n} \frac{1}{n!} \frac{n!}{k!(n-k)!} x^k y^{n-k}\Big) = \sum_{n=0}^{\infty} \sum_{k=0}^{n} \frac{x^k}{k!} \frac{y^{n-k}}{(n-k)!} = \Big(\sum_{k=0}^{\infty} \frac{x^k}{k!}\Big)\Big(\sum_{k=0}^{\infty} \frac{y^k}{k!}\Big)
$$

$\square$
