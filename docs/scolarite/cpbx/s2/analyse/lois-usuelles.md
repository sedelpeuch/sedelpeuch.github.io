---
title: "Lois discrètes usuelles"
description: "Lois discrètes usuelles : variables aléatoires indépendantes, loi uniforme, loi de Bernoulli et loi binomiale, avec leurs espérances et variances."
sidebar_position: 9
---

## Variables aléatoires indépendantes

**Définition.** Soit $(\Omega, \mathcal{P}(\Omega), p)$ un espace de probabilité et $X, Y$ deux variables aléatoires. On dit que $X$ et $Y$ sont indépendantes si et seulement si $\forall x \in X(\Omega), \forall y \in Y(\Omega)$ :

$$
p([X = x] \cap [Y = y]) = p(X = x) \times p(Y = y)
$$

On rappelle que

$$
[X = x] \cap [Y = y] = \{\omega \in \Omega ; X(\omega) = x\} \cap \{\omega \in \Omega ; Y(\omega) = y\}
$$

**Proposition.** Soient $X$ et $Y$ deux variables aléatoires indépendantes. Alors :

$$
V(X + Y) = V(X) + V(Y)
$$

**Remarque.** En général $V(X + Y) \neq V(X) + V(Y)$, mais on a toujours $E(X + Y) = E(X) + E(Y)$.

**Uniforme.** Soit $(\Omega, \mathcal{P}(\Omega), p)$ un espace de probabilité. Soit $X$ une variable aléatoire avec $X(\Omega) = \{x_1, x_2, \dots, x_n\}$. On dit que $X$ suit une loi uniforme si et seulement si :

$$
p(X = x_i) = p(X = x_j), \forall i, j
$$

Donc $p(X = x_i) = \dfrac{1}{n}$ car $p(X = x_1) + p(X = x_2) + \dots + p(X = x_n) = 1 \Rightarrow n\,p(X = x_i) = 1$.

## Loi uniforme sur $\{1, 2, \dots, n\}$

Supposons que $X(\Omega) = \{1, 2, \dots, n\}$.

**Théorème IX.1.** Si $X$ suit une loi uniforme avec $X(\Omega) = \{1, 2, \dots, n\}$, alors

$$
E(X) = \frac{n+1}{2}
\qquad
V(X) = \frac{n^2 - 1}{12}
$$

**Démonstration.** $E(X) = \displaystyle\sum_{i=1}^{n} x_i p(X = x_i)$ si $X(\Omega) = \{x_1, x_2, \dots, x_n\}$. Comme $X(\Omega) = \{1, 2, \dots, n\}$, alors

$$
E(X) = \sum_{i=1}^{n} i\frac{1}{n} = \left(\sum_{i=1}^{n} i\right)\frac{1}{n} = \frac{n+1}{2}
$$

## Loi de Bernoulli

Soit une expérience aléatoire qui a deux résultats possibles. Donc l'univers est $\Omega = \{\omega_1, \omega_2\}$. On définit sur $\Omega$ une probabilité avec :

$$
p(\omega_1) = p \quad \text{et} \quad p(\omega_2) = 1 - p
$$

La probabilité est bien définie par la donnée de $p(\omega_1) = p$. On définit la variable aléatoire $X$ par :

$$
X : \begin{cases} \Omega = \{\omega_1, \omega_2\} \to \{0, 1\} \\ \omega_1 \to 1 \\ \omega_2 \to 0 \end{cases}
$$

Donc la loi de $X$ est $p(X = 1) = p(\omega_1) = p$ et $p(X = 0) = p(\omega_2) = 1 - p$. On dit que $X$ suit la loi de Bernoulli de paramètre $p$. On note $X = \mathcal{B}(p)$.

**Théorème IX.2.** Soit $X = \mathcal{B}(p)$. Alors $E(X) = p$ et $V(X) = p(1 - p)$.

**Démonstration.** $E(X) = 1\,p(X = 1) + 0\,p(X = 0) = p(X = 1) = p$, et

$$
V(X) = 1^2 p(X = 1) + 0^2 p(X = 0) - p^2 = p(X = 1) - p^2 = p - p^2 = p(1 - p)
$$

## Loi binomiale de paramètres $n$ et $p$ : $\mathcal{B}(n, p)$

**Définition.** La loi binomiale de paramètres $n$ et $p$, notée $\mathcal{B}(n, p)$, est la loi de probabilité d'une variable aléatoire $X = X_1 + X_2 + \dots + X_n$ où chaque $X_i$ est une épreuve de Bernoulli de paramètre $p$ (c'est-à-dire $X_i = \mathcal{B}(p)$) possédant la propriété suivante : les variables aléatoires sont indépendantes, c'est-à-dire $\forall i \neq j$, $X_i$ et $X_j$ sont indépendantes.

**Théorème IX.3.** $X$ est une variable aléatoire binomiale de paramètres $n$ et $p$ si et seulement si :

1. $X : \Omega \to \{0, 1, 2, \dots, n\}$
2. $p(X = k) = C_n^k p^k (1 - p)^{n-k}, \forall k = 0, 1, 2, \dots, n$

**Démonstration.** $X_i = \mathcal{B}(p)$, donc :

$$
X_i : \Omega \to \{0, 1\}
\qquad
X = X_1 + X_2 + \dots + X_n : \Omega \to \{0, 1, 2, \dots, n\}
$$

Démontrons le point 2 par récurrence sur $n$. Montrons le cas $n = 2$ : $X = X_1 + X_2$, $X : \Omega \to \{0, 1, 2\}$.

$$
p(X = 0) = p(X_1 + X_2 = 0) = p(X_1 = 0 \text{ et } X_2 = 0) = p(X_1 = 0) \times p(X_2 = 0)
$$

car $X_1$ et $X_2$ sont indépendantes.

$$
\begin{aligned}
p(X = 0) &= p(X_1 = 0) \times p(X_2 = 0) = (1 - p)(1 - p) = (1 - p)^2 = C_2^0 p^0 (1 - p)^2 \\
p(X = 1) &= p(X_1 + X_2 = 1) = p\{(X_1 = 0 \text{ et } X_2 = 1) \text{ ou } (X_1 = 1 \text{ et } X_2 = 0)\} \\
&= p(X_1 = 0 \text{ et } X_2 = 1) + p(X_1 = 1 \text{ et } X_2 = 0) \\
&= p(X_1 = 0) \times p(X_2 = 1) + p(X_1 = 1) \times p(X_2 = 0) \\
&= (1 - p)p + p(1 - p) = 2p(1 - p) = C_2^1 p^1 (1 - p)^{2-1} \\
p(X = 2) &= p(X_1 + X_2 = 2) = p(X_1 = 1 \text{ et } X_2 = 1) = p(X_1 = 1) \times p(X_2 = 1) = p^2 = C_2^2 p^2 (1 - p)^{2-2}
\end{aligned}
$$

On a montré le point 2 pour $n = 2$. On suppose que l'hypothèse de récurrence est vraie jusqu'à $n$. Soit $X = X_1 + X_2 + \dots + X_{n+1} : \Omega \to \{0, 1, \dots, n+1\}$. Soit $k \in \{0, 1, 2, \dots, n+1\}$.

$$
\begin{aligned}
p(X_1 + \dots + X_{n+1} = k) &= p(X_1 + \dots + X_n = k \text{ et } X_{n+1} = 0) + p(X_1 + \dots + X_n = k - 1 \text{ et } X_{n+1} = 1) \\
&= p(X_1 + \dots + X_n = k) \times p(X_{n+1} = 0) + p(X_1 + \dots + X_n = k - 1) \times p(X_{n+1} = 1) \\
&= C_n^k p^k (1 - p)^{n-k}(1 - p) + C_n^{k-1} p^{k-1} (1 - p)^{n-k+1} p \\
&= C_n^k p^k (1 - p)^{n+1-k} + C_n^{k-1} p^k (1 - p)^{n+1-k} \\
&= (C_n^k + C_n^{k-1}) p^k (1 - p)^{n+1-k} = C_{n+1}^k p^k (1 - p)^{n+1-k}
\end{aligned}
$$

Montrons que $C_n^k + C_n^{k-1} = C_{n+1}^k$ :

$$
\begin{aligned}
C_n^k + C_n^{k-1} &= \frac{n!}{k!(n-k)!} + \frac{n!}{(k-1)!(n-(k-1))!} = \frac{n!}{k!(n-k)!} + \frac{n!}{(k-1)!(n+1-k)!} \\
&= \frac{n!}{k!(n+1-k)!}[(n + 1 - k) + k] = \frac{n!}{k!(n+1-k)!}(n + 1) = \frac{(n+1)!}{k!(n+1-k)!} = C_{n+1}^k
\end{aligned}
$$

**Théorème IX.4.** Soit $X = \mathcal{B}(n, p)$. On a :

$$
E(X) = np
\qquad
V(X) = np(1 - p)
$$

**Démonstration.** $X = X_1 + \dots + X_n \Leftrightarrow E(X) = E(X_1 + \dots + X_n) = E(X_1) + \dots + E(X_n) = np$.

$$
V(X) = V(X_1 + \dots + X_n) = V(X_1) + V(X_2) + \dots + V(X_n) = np(1 - p)
$$

**Exemple.** Une urne contient 3 boules blanches, 5 boules rouges et 2 boules noires. On tire successivement $n$ boules de l'urne, avec remise. Soit $X$ la variable aléatoire « nombre de boules blanches tirées après $n$ tirages ». À chaque tirage, la probabilité de tirer une boule blanche vaut $\frac{3}{10}$ ; les tirages sont indépendants, donc $X = \mathcal{B}(n, p)$ avec $p = \frac{3}{10}$. La loi de $X$ est

$$
p(X = k) = C_n^k \left(\frac{3}{10}\right)^k \left(1 - \frac{3}{10}\right)^{n-k}
$$
