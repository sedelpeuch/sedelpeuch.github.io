---
title: "Fonctions définies par une intégrale"
description: "Intégrales généralisées dépendant d'un paramètre : continuité et dérivation sous le signe intégrale, fonction Gamma, transformées de Fourier et de Laplace."
sidebar_position: 6
---

**Remarque 8.1 (But).** Soit $f : \begin{cases} I \times J \to \mathbb{K} \\ (x, t) \mapsto f(x, t) \end{cases}$. On souhaite étudier $F : \begin{cases} I \to \mathbb{K} \\ x \mapsto \int_J f(x, t)\,dt \end{cases}$.

## Intégrale généralisée dépendant d'un paramètre

Soient $I, J$ deux intervalles réels dans $\mathbb{K}$.

**Théorème 9.1.** *Soit $f : I \times J \to \mathbb{K}$ continue par rapport à chacune de ses variables (i.e. $\forall x \in I$, $t \mapsto f(x, t)$ continue (Riemann-intégrable suffit) sur $J$ et $\forall t \in J$, $x \mapsto f(x, t)$ continue). On suppose qu'il existe $g : J \to \mathbb{R}$ intégrable telle que, $x \in I$, $\forall t \in J$*

$$
|f(x, t)| \leq g(t) \tag{9}
$$

*Alors, pour tout $x \in I$, $t \mapsto f(x, t)$ est intégrable sur $J$ et $F : \begin{cases} I \to \mathbb{K} \\ x \mapsto \int_J f(x, t)\,dt \end{cases}$ est continue.*

*Démonstration.* La domination implique l'intégrabilité de

$$
t \mapsto f(x, t)
$$

Pour montrer que $F$ est continue en tout $a \in I$, il suffit de montrer que pour toute suite $(x_n)_n$ d'éléments de $I$ qui converge vers $a$, $F(x_n)$ converge vers $F(a)$.
Ceci est une conséquence directe du théorème de convergence dominée pour

$$
I_n = \int_J f_n(t)\,dt
$$

avec $f_n(t) = f(x_n, t)$.

- $\displaystyle\lim_{n \to +\infty} = \lim_{n \to +\infty} f(x_n, t) = f(a, t)$ car $x \mapsto f(x, t)$ est continue ;
- $|f_n(t)| = |f(x_n, t)| \leq g(t)$.

D'où, par le théorème de convergence dominée,

$$
\lim_{n \to +\infty} F(x_n) = \lim_{n \to +\infty} I_n = \int_J f(a, t)\,dt = F(a)
$$

$0, +\infty[$. Pour cela, il suffit de montrer que $\Gamma$ est continue sur tout intervalle $[a, b]$, $0 < a < b$.

**Théorème 9.2.** *Soit $f : I \times J \to \mathbb{K}$. On suppose*

- *$\forall x \in I$, $t \to f(x, t)$ est continue (Riemann-intégrable suffit) ;*
- *$f$ admet une dérivée partielle par rapport à $x$, $\forall t \in J$ ;*
- *$\dfrac{\partial f}{\partial x} : (x, t) \mapsto \dfrac{\partial f}{\partial x}(x, t)$ continue par rapport à $x$ et à $t$ ;*
- *il existe $g : J \to \mathbb{R}$ intégrable telle que $\forall (x, t) \in I \times J$, $\left|\dfrac{\partial f}{\partial x}(x, t)\right| \leq g(t)$.*

*Alors*

$$
F : \begin{cases} I \to \mathbb{K} \\ x \mapsto \int_J f(x, t)\,dt \end{cases}
$$

*est de classe $C^1$ sur $I$ et pour tout $x \in I$,*

$$
F'(x) = \int_J \frac{\partial f}{\partial x}(x, t)\,dt
$$

*Démonstration.* Il s'agit à nouveau de justifier un passage à la limite à l'aide du théorème de convergence dominée

$$
\lim_{x \to a} \frac{F(x) - F(a)}{x - a} = \lim_{x \to a} \int_J \frac{f(x, t) - f(a, t)}{x - a}\,dt
$$

**Exemple 9.2.** On montre ainsi que la fonction $\Gamma$ est de classe $C^1$ sur $]0, +\infty[$, de dérivée

$$
\Gamma'(x) = \int_0^{+\infty} e^{-t} (\log(t)) t^{x-1}\,dt
$$

## Transformée de Fourier et de Laplace

**Définition 10.1.** Soit $f$ une fonction telle que $|f|$ est intégrable sur $\mathbb{R}$. On appelle transformée de Fourier de $f$ l'application linéaire

$$
\mathcal{F} : f \mapsto \hat{f}(\xi) = \frac{1}{\sqrt{2\pi}} \int_{\mathbb{R}} e^{-ix\xi} f(x)\,dx
$$

**Remarque 10.1.** Si $|f|$ est intégrable, comme $\left|e^{-ix\xi} f(x)\right| = |f(x)|$, alors $\displaystyle\int_{\mathbb{R}} e^{-ix\xi} f(x)\,dx$ converge.

**Définition 10.2.** Soit $f$ une fonction bornée sur $\mathbb{R}$. On appelle transformation de Laplace de $f$ l'application

$$
L : f \mapsto L(f)(s) = F(s) = \int_0^{+\infty} e^{-st} f(t)\,dt
$$

**Remarque 10.2.** Pour $f$ bornée, $|e^{-st} f(t)| \leq M e^{-st}$. Donc $L(f)$ est bien définie.

**Propriétés de la transformée de Fourier.** Soit $f$ telle que $|f|$ est intégrable sur $\mathbb{R}$, alors :

- $\hat{f}$ est bien définie, continue et bornée sur $\mathbb{R}$ ;
- si $xf : x \mapsto xf(x)$ est absolument intégrable, alors $\hat{f}$ est dérivable et $(\hat{f})'(\xi) = (-i\widehat{xf})(\xi)$ ;
- si $f$ est dérivable de dérivée $f'$ absolument intégrable, alors $(\widehat{f'})(\xi) = i\xi \hat{f}(\xi)$.

*Démonstration.* En exercice.

**Propriétés de la transformée de Laplace.** Soit $f$ bornée sur $[0, +\infty[$, alors :

- $L(f)$ est définie, continue et dérivable sur $]0, +\infty[$ ;
- si $f$ est dérivable de dérivée bornée, alors $L(f')(s) = sL(f)(s) - f(0)$.

## Références

[Niven] iven, X, preuve, journal (1947), p. 140-142
