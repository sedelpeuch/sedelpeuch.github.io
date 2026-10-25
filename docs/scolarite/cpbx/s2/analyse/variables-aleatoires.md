---
title: "Variables aléatoires discrètes"
description: "Variables aléatoires discrètes : définition, loi, fonction de répartition, espérance, variance et écart type, variable centrée réduite, inégalité de Tchebychev et exercice de tirage sans remise."
sidebar_position: 8
---

## Introduction et généralités

**Définition.** Soit $(\Omega, \mathcal{P}(\Omega), p)$ un espace de probabilité ; une variable aléatoire sur $\Omega$ est une application de $\Omega$ dans $\mathbb{R}$, notée (en général) $X : \Omega \to \mathbb{R}$.

**Exemple.**

1. Pour un dé, on a $\Omega = \{1, 2, 3, 4, 5, 6\}$ et $p(\{k\}) = \frac{1}{6}$.

   $$
   X : \begin{cases} \Omega = \{1, 2, \dots, 6\} \to \mathbb{R} \\ k \to k \end{cases}
   $$

   $X$ est une variable aléatoire (v.a.) sur $\Omega$.
2. Lancer de 2 pièces de monnaie successivement : $\Omega = \{PP, PF, FF, FP\}$.

**Définition (variables discrètes).** $\mathbb{N}$ est un ensemble discret ; $\mathbb{Q}$ n'est pas un ensemble discret car $\forall a, b$, on a $]a, b[ \cap \mathbb{Q} \neq \emptyset$. Tout ensemble fini de $\mathbb{R}$ est discret.

**Remarque.** Soit $\Omega = \{x_1, x_2, \dots, x_n\}$ un univers fini et $X$ une variable aléatoire $X \to \mathbb{R}$. $X$ est appelée variable aléatoire discrète car $X(\Omega)$ est un ensemble discret dans $\mathbb{R}$.

## Loi d'une variable aléatoire

**Théorème et démonstration.** Soit $(\Omega, \mathcal{P}(\Omega), p)$ un espace de probabilité et $X$ une variable aléatoire. La loi de $X$ est la probabilité, notée $p_X$, définie par :

$$
p_X : \begin{cases} X(\Omega) \to [0, 1] \\ x \to p_X(x) = p(\{\omega \in \Omega, X(\omega) = x\}) \end{cases}
$$

**Démonstration.** $\Omega = \{\omega_1, \omega_2, \dots, \omega_n\}$, $X(\Omega) = \{x_1, x_2, \dots, x_k\} = \{X(\omega_1), X(\omega_2), \dots, X(\omega_n)\}$ avec $x_i \neq x_j$ pour $i \neq j$.

$$
\begin{aligned}
&p_X(x_i) = p\{\omega \in \Omega, X(\omega) = x_i\} \\
&p_X(\{x_1, x_2, \dots, x_k\}) = p_X(x_1) + p_X(x_2) + \dots + p_X(x_k) = p(\{\omega \in \Omega, X(\omega) = x_i, i = 1, \dots, k\}) = p(\omega \in \Omega ; X(\omega) \in X(\Omega)) = p(\Omega) = 1
\end{aligned}
$$

$\Rightarrow p_X$ est une probabilité sur $X(\Omega)$.

**Exemple.** $\Omega = \{PP, PF, FP, FF\}$, lancer de deux pièces de monnaie. $X$ = nombre de P, $X(\Omega) = \{0, 1, 2\}$.

$$
\begin{aligned}
P_X(0) &= p(\{\omega \in \Omega, X(\omega) = 0\}) = p(\{FF\}) = \tfrac{1}{4} \\
P_X(1) &= p(\{\omega \in \Omega, X(\omega) = 1\}) = p(\{FP, PF\}) = \tfrac{1}{2} \\
P_X(2) &= p(\{\omega \in \Omega, X(\omega) = 2\}) = p(\{PP\}) = \tfrac{1}{4}
\end{aligned}
$$

## Fonction de répartition

**Définition.** Soit $(\Omega, \mathcal{P}(\Omega), p)$ un espace de probabilité et $X$ une variable aléatoire sur $\Omega$. On définit une application sur $\mathbb{R}$, appelée fonction de répartition, par :

$$
F : \begin{cases} \mathbb{R} \to [0, 1] \\ x \to F(x) = p(\{\omega \in \Omega, X(\omega) \leq x\}) \end{cases}
$$

**Théorème.** Soit $(\Omega, \mathcal{P}(\Omega), p)$ un espace de probabilité et $F$ la fonction de répartition associée à $X$. On a :

1. $\displaystyle\lim_{x \to -\infty} F(x) = 0$, $\displaystyle\lim_{x \to +\infty} F(x) = 1$
2. $F$ est une fonction croissante.
3. $\forall a, b \in \mathbb{R}, a < b$, $F(b) - F(a) = p(\{\omega \in \Omega : a < X(\omega) \leq b\})$

**Démonstration.** Soit $X(\Omega) = \{x_1, x_2, \dots, x_k\}$ avec $x_1 < x_2 < \dots < x_k$. On a $F(x) = p(\{\omega \in \Omega, X(\omega) \leq x\})$.

- $x < x_1$ : $F(x) = 0$ car $X(\omega) \geq x_1$.
- $x \geq x_k$ : $F(x) = p\{\omega \in \Omega, X(\omega) \leq x\} = p\{\omega \in \Omega ; X(\omega) \leq x_k\} = p(\Omega) = 1$.
- $x = x_i$, $i = 1, 2, \dots, k$ :

  $$
  F(x_i) = p(\{\omega \in \Omega, X(\omega) \leq x_i\}) = p(\{\omega \in \Omega, X(\omega) = x_j, j = 1, \dots, i\}) = \sum_{j=1}^{i} p(\{\omega \in \Omega, X(\omega) = x_j\}) = \sum_{j=1}^{i} p_X(x_j)
  $$

- Si $x \in ]x_i, x_{i+1}[$ :

  $$
  F(x) = p(\{\omega \in \Omega ; X(\omega) \leq x\}) = p(\{\omega \in \Omega ; X(\omega) \leq x_i\}) + p(\{\omega \in \Omega, x_i < X(\omega) \leq x\}) = p(\{\omega \in \Omega, X(\omega) \leq x_i\}) = F(x_i)
  $$

**Notations.** Soit $(\Omega, \mathcal{P}(\Omega), p)$ un espace de probabilité et $X$ une variable aléatoire. On note :

$$
\begin{aligned}
p(X = a) &= p(\{\omega \in \Omega, X(\omega) = a\}) \\
p(a < X < b) &= p(\{\omega \in \Omega, a < X(\omega) < b\})
\end{aligned}
$$

En particulier, $P_X(x) = p(X = x)$ et $F(x) = p(X \leq x)$.

## Espérance d'une variable aléatoire

**Définition.** Soit $(\Omega, \mathcal{P}(\Omega), p)$ un espace de probabilité et $X$ une variable aléatoire. On suppose que $\Omega = \{\omega_1, \omega_2, \dots, \omega_n\}$ et $X(\Omega) = \{x_1, \dots, x_k\}$. On définit le réel noté $E(X)$, que l'on appelle l'espérance de $X$ :

$$
E(X) = \sum_{i=1}^{k} x_i\,p(\{\omega \in \Omega, X(\omega) = x_i\}) = \sum_{i=1}^{k} x_i\,p(X = x_i)
$$

**Propriétés sur les variables aléatoires.** Soient $(\Omega, \mathcal{P}(\Omega), p)$ un espace de probabilité, $X$ et $Y$ deux variables aléatoires sur $\Omega$, $a$ et $b$ deux réels. Alors $aX + bY$ est aussi une variable aléatoire.

**Théorème.** Soient $(\Omega, \mathcal{P}(\Omega), p)$ un espace de probabilité, $X$ et $Y$ deux variables aléatoires sur $\Omega$. Alors :

$$
E(aX + bY) = aE(X) + bE(Y), \forall a, b \in \mathbb{R}
$$

## Variance d'une variable aléatoire

**Définition.** Soit $(\Omega, \mathcal{P}(\Omega), p)$ un espace de probabilité et $X$ une variable aléatoire. On définit la variance de $X$, que l'on note $V(X)$, comme le réel positif :

$$
V(X) = E((X - E(X))^2)
$$

**Théorème VIII.1.**

$$
V(X) = E(X^2) - (E(X))^2
$$

**Démonstration.** $(X - E(X))^2 = X^2 - 2E(X)X + E^2(X)$, donc $V(X) = E(X^2 - 2E(X)X + E^2(X)) = E(X^2) - 2E(X)E(X) + E^2(X) = E(X^2) - E^2(X)$.

**Définition.** Soit $(\Omega, \mathcal{P}, p)$ un espace de probabilité et $X$ une variable aléatoire sur $\Omega$. On appelle écart type de $X$, que l'on note $\sigma(X)$, le nombre $\sigma(X) = \sqrt{V(X)}$, où $V(X) = E(X^2) - (E(X))^2$ est la variance de $X$.

**Théorème VIII.2.** Soit $(\Omega, \mathcal{P}, p)$ un espace de probabilité et $X$ une variable aléatoire sur $\Omega$. Alors $\forall a, b \in \mathbb{R}$, on a :

1. $V(aX + b) = a^2 V(X)$
2. $\sigma(aX + b) = |a|\sigma(X)$

**Démonstration.**

$$
\begin{aligned}
V(aX + b) &= E((aX + b)^2) - (E(aX + b))^2 = E(a^2X^2 + 2abX + b^2) - (aE(X) + b)^2 \\
&= a^2E(X^2) + 2abE(X) + b^2 - (a^2(E(X))^2 + 2abE(X) + b^2) = a^2[E(X^2) - (E(X))^2] = a^2V(X)
\end{aligned}
$$

On a donc $\sigma(aX + b) = \sqrt{V(aX + b)} = \sqrt{a^2V(X)} = |a|\sigma(X)$.

**Remarque.** Si $X = 1$, $E(X) = 1$ car si $X(\Omega) = \{x_1, x_2, \dots, x_n\}$, alors :

$$
E(X) = \sum_{i=1}^{n} x_i P(X = x_i)
$$

Si $X(\omega) = 1, \forall \omega \in \Omega$, alors :

$$
E(X) = \sum_{i=1}^{n} p(X = x_i) = p(\Omega) = 1
$$

**Définition.** Soit $X$ une variable aléatoire. La variable aléatoire $Y = \dfrac{X - E(X)}{\sigma(X)}$ est appelée variable aléatoire centrée réduite associée à $X$.

**Théorème VIII.3.** Soit $X$ une variable aléatoire et $Y$ la variable aléatoire centrée réduite associée à $X$. Alors :

$$
E(Y) = 0, \quad V(Y) = 1
$$

**Démonstration.**

$$
E(Y) = E\left(\frac{X - E(X)}{\sigma(X)}\right) = \frac{1}{\sigma(X)}[E(X) - E(E(X))] = \frac{1}{\sigma(X)}[E(X) - E(X)] = 0
$$

$$
V(Y) = E(Y^2) - (E(Y))^2 = E(Y^2) = E\left(\left(\frac{X - E(X)}{\sigma(X)}\right)^2\right) = E\left(\frac{1}{\sigma(X)^2}(X - E(X))^2\right) = \frac{1}{\sigma(X)^2}E(X - E(X))^2 = \frac{V(X)}{\sigma(X)^2} = 1
$$

**Théorème VIII.4** (Inégalité de Tchebychev)**.** Soit $(\Omega, \mathcal{P}(\Omega), p)$ un espace de probabilité et $X$ une variable aléatoire sur $\Omega$. On pose $m = E(X)$. Alors $\forall \epsilon > 0$, on a :

$$
p(|X - m| \geq \epsilon) \leq \frac{\sigma^2(X)}{\epsilon^2} = \frac{V(X)}{\epsilon^2}
$$

avec la notation $p(|X - m| \leq \epsilon) = p(\{\omega \in \Omega, |X(\omega) - m| \leq \epsilon\})$.

**Démonstration.** Supposons que $X(\Omega) = \{x_1, x_2, \dots, x_n\}$. On a donc :

$$
V(X) = E((X - E(X))^2) = \sum_{i=1}^{n} (x_i - E(X))^2 p(X = x_i) = \sum_{i=1}^{n} (x_i - m)^2 p(X = x_i)
$$

Soit $J = \{i, |x_i - m| \geq \epsilon\}$. Ainsi

$$
\begin{aligned}
V(X) &= \sum_{i=1}^{n} (x_i - m)^2 p(X = x_i) \geq \sum_{i \in J} (x_i - m)^2 p(X = x_i) \geq \epsilon^2 \sum_{i \in J} p(X = x_i) \\
&= \epsilon^2 \sum_{j \in J} p\{\omega \in \Omega, X(\omega) = x_j\} = \epsilon^2 p(\{\omega \in \Omega, |X(\omega) - m| \geq \epsilon\}) \Leftrightarrow V(X) \geq \epsilon^2 p(|X - m| \geq \epsilon)
\end{aligned}
$$

En effet, $\{\omega \in \Omega ; |X(\omega) - m| \geq \epsilon\} = \displaystyle\bigcup_{j \in J} \{\omega \in \Omega, X(\omega) = x_j\}$, d'où $p(|X - m| \geq \epsilon) \leq \dfrac{V(X)}{\epsilon^2} = \dfrac{\sigma^2(X)}{\epsilon^2}$.

**Exercice.** Un sac contient 3 boules rouges et 3 boules vertes. On tire une à une les 6 boules (sans remise). Soit $X$ la variable aléatoire qui, à chaque tirage des six boules, associe le nombre de boules vertes tirées avant l'apparition pour la première fois d'une boule rouge.

1. Quelles sont les valeurs prises par $X$ ?
2. Quelle est la loi de $X$ ?
3. Déterminer la fonction de répartition associée à $X$.

**Solution.** $X$ peut prendre les valeurs $0, 1, 2, 3$. Tirer 6 boules $\Leftrightarrow$ ordonner 6 éléments ; $\Omega$ = l'univers de cette expérience. Ainsi $\text{card}(\Omega) = 6!$ et $X(\Omega) = \{0, 1, 2, 3\}$, $X : \Omega \to X(\Omega)$, $p(X = x)$.

$X = 0 \Leftrightarrow$ le premier tirage donne une boule rouge. $E_0$ = tirer une boule rouge la première fois, $\text{card}(E_0) = C_3^1\,5!$. Ainsi $p(X = 0) = \dfrac{\text{card}(E_0)}{\text{card}(\Omega)} = \dfrac{C_3^1 \cdot 5!}{6!} = \frac{1}{2}$.

$X = 1 \Leftrightarrow$ le premier tirage est une boule verte et le second tirage une boule rouge. $E_1$ = avoir une boule verte au premier tirage et une boule rouge au deuxième tirage. On a $\text{card}(E_1) = C_3^1 C_3^1\,4!$ et donc $p(X = 1) = \frac{3}{10}$.

$$
X = 2 \Leftrightarrow \begin{cases} \text{premier tirage = boule verte} \\ \text{deuxième tirage = boule verte} \\ \text{troisième tirage = boule rouge} \end{cases} = E_2
$$

On a $\text{card}(E_2) = A_3^2 C_3^1\,3! = 108$ et donc $p(X = 2) = \frac{3}{20}$.

$$
X = 3 \Leftrightarrow \begin{cases} \text{premier tirage = boule verte} \\ \text{second tirage = boule verte} \\ \text{troisième tirage = boule verte} \end{cases} = E_3
$$

On a $\text{card}(E_3) = A_3^3 A_3^3 = 3!\,3!$ et donc $p(X = 3) = \frac{1}{20}$.
