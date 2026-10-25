---
title: "Séries numériques"
description: "Séries numériques : convergence, condition nécessaire, séries à termes positifs, théorèmes de comparaison et d'équivalence, séries de Riemann, critères de d'Alembert et de Cauchy, convergence absolue et série géométrique."
sidebar_position: 1
---

## Généralités

**Définition.** Soit $(u_n)$ une suite numérique, on appelle série de terme général $u_n$, que l'on note $\sum u_n$, la suite :

$$
S_n = \sum_{k=0}^{n} u_k = u_0 + u_1 + \dots + u_n
$$

**Convergence.** Soit $\sum u_n$ une série numérique, on dit que la série $\sum u_n$ converge si et seulement si $\displaystyle\lim \sum_{k=0}^{n} u_k$ existe et est finie. On note $\sum u_n$ convergente. Dans le cas contraire, c'est-à-dire si la limite n'existe pas ou est infinie, on dit que la série $\sum u_n$ diverge et on note $\sum u_n$ diverge.

**Somme de deux séries.** Soient $\sum u_n$ et $\sum v_n$ deux séries numériques, on définit la somme de $\sum u_n$ et $\sum v_n$ par $\sum (u_n + v_n)$.

**Multiplication par un réel.** Soit $\lambda \in \mathbb{C}$ et $\sum u_n$ une série numérique, alors $\lambda \sum u_n$ est la série de terme général $\lambda u_n$.

**Théorème I.1** (Condition nécessaire)**.** Soit $\sum u_n$ une série numérique. Si $\sum u_n$ converge alors $\displaystyle\lim_{n \to +\infty} u_n = 0$.

**Exemple.** $\sum \dfrac{n}{n+1}$ est la série de terme général $u_n = \dfrac{n}{n+1} \Rightarrow \lim = 1 \neq 0$. Donc $\sum u_n$ diverge. L'inverse est faux : la série $\sum \dfrac{1}{n+1}$ diverge.

**Démonstration.** $\sum u_n$ converge est équivalent à dire qu'il existe $l \in \mathbb{C}$ tel que $\displaystyle\lim \sum_{k=0}^{n} u_k = l$. Ainsi on a $S_n = \displaystyle\sum_{k=0}^{n} u_k \to l$ et $S_{n-1} = \displaystyle\sum_{k=0}^{n-1} u_k \to l$, donc

$$
S_n - S_{n-1} = \sum_{k=0}^{n} u_k - \sum_{k=0}^{n-1} u_k = u_n \to l - l = 0 \Rightarrow u_n \to 0
$$

## Série à termes positifs

**Définition.** Soit $\sum u_n$ une série numérique. On dit que la série $\sum u_n$ est à termes positifs si $\exists N, \forall n \geq N, u_n \geq 0$.

**Remarque.** Dans l'étude d'une série numérique, on peut supprimer un nombre fini de termes. En effet, si $\sum u_n$ est une série numérique, on a $S_n = \displaystyle\sum_{k=0}^{n} u_k = u_0 + u_1 + \dots + u_N + \sum_{k=N+1}^{n} u_k$ ($N$ est fixé indépendamment de $n$). Comme $\lim S_n$ existe et est finie si et seulement si $\lim W_n$ existe et est finie, l'étude de $\sum u_n$ est équivalente à l'étude de $\displaystyle\sum_{n=N} u_n$.

**Théorème I.2** (Série à termes positifs)**.** Soit $\sum u_n$ une série à termes positifs. Alors $\sum u_n$ converge si et seulement s'il existe $M$ (indépendant de $n$) tel que $\left|\displaystyle\sum_{k=0}^{n} u_k\right| \leq M$.

**Démonstration.** On pose $S_n = \displaystyle\sum_{k=0}^{n} u_k$ :

$$
\begin{aligned}
&S_{n+1} - S_n = \sum_{k=0}^{n+1} u_k - \sum_{k=0}^{n} u_k = u_{n+1} \geq 0 \\
\Rightarrow\ &(S_n) \text{ est une suite croissante, donc } S_n \text{ converge si et seulement si la suite } S_n \text{ est majorée} \\
\Leftrightarrow\ &\exists M, S_n = \sum_{k=0}^{n} u_k \leq M
\end{aligned}
$$

**Série de même nature.** Soient $\sum u_n$ et $\sum v_n$ deux séries numériques. On dit que $\sum u_n$ et $\sum v_n$ sont deux séries de même nature si $\sum u_n$ converge si et seulement si $\sum v_n$ converge.

**Théorème I.3** (de comparaison)**.** Soient $\sum u_n$ et $\sum v_n$ deux séries numériques à termes positifs telles que $0 \leq u_n \leq v_n$ :

1. Si $\sum v_n$ converge alors $\sum u_n$ converge.
2. Si $\sum u_n$ diverge alors $\sum v_n$ diverge.

**Démonstration.**

1. On sait que $\displaystyle\sum_{k=0}^{n} u_k \leq \sum_{k=0}^{n} v_k$, et $\sum v_n$ converge $\Rightarrow \exists M, \displaystyle\sum_{k=0}^{n} v_k \leq M, \forall n$. Donc $\displaystyle\sum_{k=0}^{n} u_k \leq M, \forall n$ (voir le théorème sur les séries à termes positifs).
2. $\sum u_n$ diverge $\Rightarrow \displaystyle\sum_{k=0}^{n} u_k$ n'est pas majorée, donc

   $$
   \lim \sum_{k=0}^{n} u_k = +\infty \Rightarrow +\infty = \lim \sum_{k=0}^{n} u_k \leq \lim \sum_{k=0}^{n} v_k \Rightarrow \lim \sum_{k=0}^{n} v_k = +\infty
   $$

**Théorème I.4** (d'équivalence)**.** Soient $\sum u_n$ et $\sum v_n$ deux séries numériques à termes positifs. On suppose que $\lim \dfrac{u_n}{v_n} = 1$ ($u_n \sim v_n$). Alors $\sum u_n$ et $\sum v_n$ sont de même nature.

**Démonstration.** $\lim \dfrac{u_n}{v_n} = 1 \Rightarrow \exists C_0, C_1$ tels que $C_0 v_n \leq u_n \leq C_1 v_n$. En effet

$$
\lim \frac{u_n}{v_n} = 1 \Leftrightarrow \forall \epsilon > 0, \exists N, \forall n > N, \left|\frac{u_n}{v_n} - 1\right| < \epsilon
$$

En particulier, pour $\epsilon = \frac{1}{2}$, $\exists N, \forall n > N$ :

$$
-\frac{1}{2} < \frac{u_n}{v_n} - 1 < \frac{1}{2} \Rightarrow \frac{1}{2} < \frac{u_n}{v_n} < \frac{3}{2} \Rightarrow \frac{1}{2} v_n < u_n < \frac{3}{2} v_n, \quad n > N
$$

Ainsi $u_n \leq C_1 v_n$, donc si $\sum v_n$ converge alors $\sum u_n$ converge.

**Théorème I.5** (Série de Riemann)**.** Soit la série de terme général $u_n = \dfrac{1}{n^\alpha}$ ($\alpha \in \mathbb{R}$). On appelle $\sum \dfrac{1}{n^\alpha}$ série de Riemann ; elle converge si et seulement si $\alpha > 1$.

**Démonstration.** Pour $\alpha \leq 0$ : $\dfrac{1}{n^\alpha} = n^{-\alpha} \to +\infty$ si $\alpha < 0$, et vaut $1$ si $\alpha = 0$. Ainsi $\dfrac{1}{n^\alpha}$ ne converge pas vers $0 \Rightarrow \sum \frac{1}{n^\alpha}$ diverge si $\alpha \leq 0$.

Pour $\alpha > 0$, la fonction $F_\alpha(x) = \dfrac{1}{x^\alpha}$ est décroissante.

$$
\begin{aligned}
&\Rightarrow \int_n^{n+1} \frac{1}{(n+1)^\alpha}\,dx \leq \int_n^{n+1} \frac{1}{x^\alpha}\,dx \leq \int_n^{n+1} \frac{1}{n^\alpha}\,dx \\
&\Rightarrow \frac{1}{(n+1)^\alpha} \leq \int_n^{n+1} \frac{1}{x^\alpha}\,dx \leq \frac{1}{n^\alpha} \\
&\Rightarrow \frac{1}{(k+1)^\alpha} \leq \int_k^{k+1} \frac{1}{x^\alpha}\,dx \leq \frac{1}{k^\alpha} \Rightarrow \sum_{k=1}^{n} \frac{1}{(k+1)^\alpha} \leq \sum_{k=1}^{n} \int_k^{k+1} \frac{1}{x^\alpha}\,dx \leq \sum_{k=1}^{n} \frac{1}{k^\alpha} \\
&\Rightarrow \sum_{k=1}^{n} \frac{1}{(k+1)^\alpha} \leq \int_1^{n+1} \frac{1}{x^\alpha}\,dx \leq \sum_{k=1}^{n} \frac{1}{k^\alpha} \\
&\Rightarrow \sum_{k=1}^{n} \frac{1}{(k+1)^\alpha} \leq \frac{(n+1)^{-\alpha+1} - 1}{-\alpha+1} \leq \sum_{k=1}^{n} \frac{1}{k^\alpha} \quad \text{si } \alpha \neq 1
\end{aligned}
$$

En effet, $\displaystyle\sum_{k=1}^{n} \int_k^{k+1} \frac{1}{x^\alpha}\,dx = \int_1^2 \frac{1}{x^\alpha}\,dx + \dots + \int_n^{n+1} \frac{1}{x^\alpha}\,dx = \int_1^{n+1} \frac{1}{x^\alpha}\,dx$.

Si $\alpha \neq 1$ : $\displaystyle\int_1^{n+1} \frac{1}{x^\alpha}\,dx = \left[\frac{x^{-\alpha+1}}{-\alpha+1}\right]_1^{n+1} \Rightarrow \sum_{k=1}^{n} \frac{1}{(k+1)^\alpha} \leq \frac{(n+1)^{-\alpha+1} - 1}{-\alpha+1} \leq \sum_{k=1}^{n} \frac{1}{k^\alpha}$.

Si $\alpha = 1$ : $\displaystyle\int_1^{n+1} \frac{1}{x}\,dx = [\ln(x)]_1^{n+1} \Rightarrow \sum_{k=1}^{n} \frac{1}{k+1} \leq \ln(n+1) \leq \sum_{k=1}^{n} \frac{1}{k}$.

Pour $\alpha = 1$ ou $0 < \alpha < 1$, la suite diverge, et si $\alpha > 1$ la suite converge.

**Proposition.** Soient $\sum u_n$ et $\sum v_n$ deux séries numériques :

1. Si $\sum u_n$ et $\sum v_n$ convergent, alors $\lambda \sum u_n + \beta \sum v_n$ converge, $\forall \lambda, \beta \in \mathbb{R}$.
2. Si $\sum u_n$ converge et $\sum v_n$ diverge, alors $\sum u_n + \sum v_n$ diverge.
3. Si $\sum u_n$ et $\sum v_n$ divergent, alors on ne peut rien dire pour $\sum u_n + \sum v_n$.

## Critères de convergence

### Critère de d'Alembert

**Théorème I.6.** Soit $\sum u_n$ une série à termes positifs. On suppose que $\displaystyle\lim_{n \to +\infty} \frac{u_{n+1}}{u_n}$ existe. On pose $l = \displaystyle\lim_{n \to +\infty} \frac{u_{n+1}}{u_n}$. On a :

1. Si $l < 1$ alors $\sum u_n$ converge.
2. Si $l > 1$ alors $\sum u_n$ diverge.
3. Si $l = 1$, on ne peut pas conclure.

**Preuve.** On pose $l = \displaystyle\lim_{n \to +\infty} \frac{u_{n+1}}{u_n}$, donc

$$
\forall \epsilon > 0, \exists N, \forall n > N, \left|\frac{u_{n+1}}{u_n} - l\right| \leq \epsilon \Leftrightarrow \forall \epsilon > 0, \exists N, \forall n > N, l - \epsilon \leq \frac{u_{n+1}}{u_n} \leq l + \epsilon \quad (*)
$$

1. Supposons que $l < 1$. On fixe $\epsilon$ assez petit tel que $l + \epsilon < 1$. D'après $(*)$, $\dfrac{u_{n+1}}{u_n} \leq l + \epsilon, \forall n > N$, donc

   $$
   u_{n+1} \leq (l+\epsilon) u_n \leq (l+\epsilon)^2 u_{n-1} \leq (l+\epsilon)^3 u_{n-2} \leq \dots \leq (l+\epsilon)^{n-N} u_N
   $$

   car $u_n \leq (l+\epsilon) u_{n-1}$, $u_{n-1} \leq (l+\epsilon) u_{n-2}$, …, $u_{N+1} \leq (l+\epsilon) u_N$. Ainsi $\forall n > N$ : $u_{n+1} \leq (l+\epsilon)^{n-N} u_N$. On écrit

   $$
   \sum_{k=0}^{n+1} u_k = \sum_{k=0}^{N} u_k + \sum_{k=N+1}^{n+1} u_k
   \qquad
   \lim_{n \to +\infty} \sum_{k=0}^{n+1} u_k = \sum_{k=0}^{N} u_k + \lim_{n \to +\infty} \sum_{k=N+1}^{n+1} u_k
   $$

   et

   $$
   \sum_{k=N+1}^{n+1} u_k \leq \sum_{k=N+1}^{n+1} (l+\epsilon)^{k-N-1} u_{N+1} = u_{N+1} \sum_{k=N+1}^{n+1} (l+\epsilon)^{k-N-1} = u_{N+1} \sum_{p=0}^{n-N} (l+\epsilon)^p
   $$

   en posant $p = k - N - 1$. Or $1 + x + \dots + x^k = \dfrac{1 - x^{k+1}}{1 - x}$, donc $\displaystyle\sum_{l=0}^{k} x^l = \frac{1 - x^{k+1}}{1 - x} \Rightarrow \lim_{k \to +\infty} \sum_{l=0}^{k} x^l = \frac{1}{1 - x}$ si $0 \leq x < 1$. Donc

   $$
   \sum_{k=N+1}^{n+1} u_k \leq u_{N+1} \frac{1}{1 - (l+\epsilon)} \quad \text{car } l + \epsilon < 1
   $$

2. Si $l > 1$, on choisit un $\epsilon$ assez petit tel que $l - \epsilon > 1$. D'après $(*)$, $u_{n+1} \geq (l-\epsilon) u_n$, $u_n \geq (l-\epsilon) u_{n-1}$, …, $u_{N+1} \geq (l-\epsilon) u_N$, donc $u_{n+1} \geq (l-\epsilon)^{n-N} u_N$ et

   $$
   \lim_{n \to +\infty} u_{n+1} \geq u_N \lim_{n \to +\infty} (l-\epsilon)^{n-N} = +\infty \quad \text{car } l - \epsilon > 1
   $$

   Donc $\sum u_n$ diverge si $l > 1$.

### Critère de Cauchy

**Théorème I.7.** Soit $\sum u_n$ une série numérique à termes positifs. On suppose que $\displaystyle\lim_{n \to +\infty} \sqrt[n]{u_n}$ existe. On pose $l = \displaystyle\lim_{n \to +\infty} \sqrt[n]{u_n}$. On a :

1. Si $l < 1$ alors $\sum u_n$ converge.
2. Si $l > 1$ alors $\sum u_n$ diverge.
3. Si $l = 1$, on ne peut pas conclure.

**Démonstration.** $\displaystyle\lim_{n \to +\infty} \sqrt[n]{u_n} = l \Leftrightarrow \forall \epsilon > 0, \exists N, \forall n > N, l - \epsilon \leq \sqrt[n]{u_n} \leq l + \epsilon \quad (*)$

1. Si $l < 1$, on fixe $\epsilon > 0$ tel que $l + \epsilon < 1$. Par $(*)$, $u_n \leq (l+\epsilon)^n, \forall n \geq N$, donc

   $$
   \begin{aligned}
   &\sum_{k=0}^{n} u_k = \sum_{k=0}^{N} u_k + \sum_{k=N+1}^{n} u_k \\
   \Rightarrow\ &\sum_{k=N+1}^{n} u_k \leq \sum_{k=N+1}^{n} (l+\epsilon)^k = \sum_{p=0}^{n-N-1} (l+\epsilon)^{p+N+1} \to \frac{(l+\epsilon)^{N+1}}{1 - (l+\epsilon)} \quad \text{car } l + \epsilon < 1
   \end{aligned}
   $$

   Donc $\sum u_n$ converge.
2. Si $l > 1$, on fixe $\epsilon > 0$ assez petit tel que $l - \epsilon > 1$. Par $(*)$, $u_n \geq (l-\epsilon)^n \Rightarrow \displaystyle\lim_{n \to +\infty} u_n \geq \lim_{n \to +\infty} (l-\epsilon)^n = +\infty$ car $l - \epsilon > 1$. Donc $\sum u_n$ diverge.

## Série absolument convergente

**Définition.** Soit $\sum u_n$ une série numérique. On dit que la série $\sum u_n$ est absolument convergente si et seulement si la série $\sum |u_n|$ converge.

**Remarque.** Pour une série à termes positifs, il n'y a pas de différence entre convergence et convergence absolue.

**Théorème I.8.** Soit $\sum u_n$ une série numérique. Si $\sum |u_n|$ converge alors $\sum u_n$ converge, c'est-à-dire qu'une série absolument convergente est convergente. En général, l'inverse est faux.

**Exemple.** $\sum \dfrac{(-1)^n}{n^2}$ : $\sum \left|\dfrac{(-1)^n}{n^2}\right| = \sum \dfrac{1}{n^2}$ converge, donc elle est absolument convergente. Soit $0 < \alpha < 1$ : pour $\sum \dfrac{(-1)^n}{n^\alpha}$, $\sum \left|\dfrac{(-1)^n}{n^\alpha}\right| = \sum \dfrac{1}{n^\alpha}$ diverge (série de Riemann). Or le critère d'Abel dit que $\sum \dfrac{(-1)^n}{n^\alpha}$ converge (admis).

**Théorème I.9.** Soit $|l| < 1$, la série $\sum l^n$ est absolument convergente et on a :

$$
\sum_{k=0}^{+\infty} l^k = \frac{1}{1 - l}
$$

**Démonstration.** $\displaystyle\sum_{k=0}^{n} |l|^k = \frac{1 - |l|^{n+1}}{1 - |l|} \to \frac{1}{1 - |l|}$ car $|l| < 1$, donc la série est absolument convergente. De plus

$$
\sum_{k=0}^{n} l^k = \frac{1 - l^{n+1}}{1 - l} \to \frac{1}{1 - l} \quad \text{car } |l^{n+1}| \to 0 \text{ car } |l| < 1
$$

**Série à valeurs complexes.** Soit $\sum u_n$ une série avec $u_n \in \mathbb{C}$. Comme $u_n \in \mathbb{C} \Leftrightarrow \exists a_n, b_n \in \mathbb{R}, u_n = a_n + i b_n$, on a $\sum u_n = \sum a_n + i \sum b_n$. Une série à valeurs complexes est donc la donnée de **deux séries à valeurs réelles** : étudier une série à valeurs complexes revient à étudier deux séries à valeurs réelles.
