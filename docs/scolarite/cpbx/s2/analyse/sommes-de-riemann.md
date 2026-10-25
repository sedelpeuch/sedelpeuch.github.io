---
title: "Sommes de Riemann"
description: "Sommes de Riemann : définition, fonctions lipschitziennes, convergence vers l'intégrale et majoration de l'erreur, sommes à gauche et à droite, méthode des trapèzes et exercice d'application."
sidebar_position: 4
---

**Définition.** Soit $\{c_0, c_1, \dots, c_n\}$ une subdivision de $[a, b]$, c'est-à-dire $c_0 = a < c_1 < c_2 < \dots < c_{n-1} < c_n = b$. Soient $\xi_0, \xi_1, \dots, \xi_{n-1}$ des points tels que $\xi_i \in [c_i, c_{i+1}]$. On appelle somme de Riemann associée à $\{c_0, \dots, c_n\}$ et $f$ la somme :

$$
S^f_{\{c_0, \dots, c_n\}} = \sum_{i=0}^{n-1} (c_{i+1} - c_i) f(\xi_i)
$$

**Lemme.** Soit $f : [a, b] \to \mathbb{C}$ une fonction de classe $C^1$. On a : $|f(x) - f(y)| \leq |x - y| \sup|f'(t)|$.

**Démonstration.**

$$
f(x) - f(y) = \int_y^x f'(t)\,dt \Rightarrow |f(x) - f(y)| = \left|\int_y^x f'(t)\,dt\right| \leq \left|\int_y^x \sup|f'(t)|\,dt\right| = |x - y| \sup|f'(t)|
$$

**Remarque.** En général, si $f : [a, b] \to \mathbb{C}$ est une fonction telle qu'il existe $M$ tel que :

$$
|f(x) - f(y)| \leq M|x - y|
$$

on dit que $f$ est lipschitzienne. Le lemme précédent montre que si $f$ est $C^1$ alors $f$ est lipschitzienne.

**Théorème IV.1.**

1. Soit $f : [a, b] \to \mathbb{C}$ continue. Soit $\sigma = \{c_0, c_1, \dots, c_n\}$ une subdivision de $[a, b]$. Alors $\forall \epsilon > 0, \exists \eta > 0$ tel que si $|c_{i+1} - c_i| \leq \eta, i = 0, \dots, n$, alors

   $$
   \left|\int_a^b f(x)\,dx - \sum_{i=0}^{n-1} (c_{i+1} - c_i) f(\xi_i)\right| \leq \epsilon
   $$

   On rappelle que $\xi_i \in [c_i, c_{i+1}], i = 0, \dots, n - 1$.
2. Si $f$ est $C^1$, alors

   $$
   \left|\int_a^b f(x)\,dx - \sum_{i=0}^{n-1} (c_{i+1} - c_i) f(\xi_i)\right| \leq |b - a| \sup|f'(t)| \cdot \sup|c_{i+1} - c_i|
   $$

**Démonstration.** On fait la démonstration pour $f \in C^1$.

$$
\int_a^b f(x)\,dx = \int_{a = c_0}^{c_1} f(x)\,dx + \int_{c_1}^{c_2} f(x)\,dx + \dots + \int_{c_i}^{c_{i+1}} f(x)\,dx + \dots + \int_{c_{n-1}}^{c_n = b} f(x)\,dx = \sum_{i=0}^{n-1} \int_{c_i}^{c_{i+1}} f(x)\,dx
$$

$$
\begin{aligned}
&\sum_{i=0}^{n-1} (c_{i+1} - c_i) f(\xi_i) = \sum_{i=0}^{n-1} \int_{c_i}^{c_{i+1}} f(\xi_i)\,dx \\
\Rightarrow\ &\int_a^b f(x)\,dx - \sum_{i=0}^{n-1} (c_{i+1} - c_i) f(\xi_i) = \sum_{i=0}^{n-1} \int_{c_i}^{c_{i+1}} f(x)\,dx - \sum_{i=0}^{n-1} \int_{c_i}^{c_{i+1}} f(\xi_i)\,dx = \sum_{i=0}^{n-1} \int_{c_i}^{c_{i+1}} (f(x) - f(\xi_i))\,dx \\
\Rightarrow\ &\left|\int_a^b f(x)\,dx - \sum_{i=0}^{n-1} (c_{i+1} - c_i) f(\xi_i)\right| \leq \sum_{i=0}^{n-1} \int_{c_i}^{c_{i+1}} |f(x) - f(\xi_i)|\,dx
\end{aligned}
$$

D'après le lemme précédent, $|f(x) - f(\xi_i)| \leq |x - \xi_i| \sup|f'(t)|$, donc

$$
\left|\int_a^b f(x)\,dx - \sum_{i=0}^{n-1} (c_{i+1} - c_i) f(\xi_i)\right| \leq \sum_{i=0}^{n-1} \int_{c_i}^{c_{i+1}} \sup|f'(t)|\,|x - \xi_i|\,dx = \sum_{i=0}^{n-1} \sup|f'(t)| \int_{c_i}^{c_{i+1}} |x - \xi_i|\,dx \quad (*)
$$

Or

$$
\begin{aligned}
\int_{c_i}^{c_{i+1}} |x - \xi_i|\,dx &= \int_{c_i}^{\xi_i} |x - \xi_i|\,dx + \int_{\xi_i}^{c_{i+1}} |x - \xi_i|\,dx = -\int_{c_i}^{\xi_i} (x - \xi_i)\,dx + \int_{\xi_i}^{c_{i+1}} (x - \xi_i)\,dx \\
&= -\left[\frac{(x - \xi_i)^2}{2}\right]_{c_i}^{\xi_i} + \left[\frac{(x - \xi_i)^2}{2}\right]_{\xi_i}^{c_{i+1}} = \frac{(c_i - \xi_i)^2}{2} + \frac{(c_{i+1} - \xi_i)^2}{2} \leq \frac{(c_i - c_{i+1})^2}{2} + \frac{(c_{i+1} - c_i)^2}{2} = |c_{i+1} - c_i|^2
\end{aligned}
$$

$$
\Rightarrow \int_{c_i}^{c_{i+1}} |x - \xi_i|\,dx \leq (c_{i+1} - c_i)^2
$$

$$
\begin{aligned}
(*) \Rightarrow \left|\int_a^b f(x)\,dx - \sum_{i=0}^{n-1} (c_{i+1} - c_i) f(\xi_i)\right| &\leq \sum_{i=0}^{n-1} \sup|f'(t)|\,(c_{i+1} - c_i)^2 \leq \sup|c_{i+1} - c_i| \left(\sum_{i=0}^{n-1} (c_{i+1} - c_i)\right) \sup|f'(t)| \\
&= \sup|c_{i+1} - c_i|\,(b - a) \sup|f'(t)|
\end{aligned}
$$

ce qui donne le point 2 du théorème.

Pour le point 1, soit $\epsilon > 0$ ; soit $\eta = \dfrac{\epsilon}{(b - a)\sup|f'(t)|}$. D'après (2), on a :

$$
\left|\int_a^b f(x)\,dx - \sum_{i=0}^{n-1} (c_{i+1} - c_i) f(\xi_i)\right| \leq \sup|f'(t)|\,(b - a) \sup|c_{i+1} - c_i|
$$

Donc si $|c_{i+1} - c_i| \leq \eta = \dfrac{\epsilon}{(b - a)\sup|f'(t)|}$, alors

$$
\left|\int_a^b f(x)\,dx - \sum_{i=0}^{n-1} (c_{i+1} - c_i) f(\xi_i)\right| \leq \epsilon
$$

ce qui donne le point 1 du théorème.

**Corollaire.** Soit $f : [a, b] \to \mathbb{R}$ une fonction continue. On pose $c_i = a + i\dfrac{b - a}{n}$ pour $i \in \{0, \dots, n\}$ ($n \in \mathbb{N}^*$) : $c_0 = a$, $c_1 = a + \dfrac{b - a}{n}$, $c_2 = a + 2\dfrac{b - a}{n}$, …, $c_n = b$, et $c_{i+1} - c_i = \dfrac{b - a}{n}$. Ainsi

$$
\frac{b - a}{n} \sum_{i=0}^{n-1} f(\xi_i) \to \int_a^b f(x)\,dx
$$

En particulier :

1. $\xi_i = c_i = a + i\dfrac{b - a}{n}$ : $\displaystyle\frac{b - a}{n} \sum_{i=0}^{n-1} f\left(a + i\frac{b - a}{n}\right) \to \int_a^b f(x)\,dx$ (somme de Riemann à gauche).
2. $\xi_i = c_{i+1} = a + (i+1)\dfrac{b - a}{n}$ : $\displaystyle\frac{b - a}{n} \sum_{i=0}^{n-1} f\left(a + (i+1)\frac{b - a}{n}\right) \to \int_a^b f(x)\,dx$ (somme de Riemann à droite).
3. Méthode des trapèzes : $\xi_i$ tel que $f(\xi_i) = \dfrac{f(c_i) + f(c_{i+1})}{2}$,

   $$
   \frac{b - a}{n} \sum_{i=0}^{n-1} \frac{f(c_i) + f(c_{i+1})}{2} = \frac{b - a}{n} \sum_{i=0}^{n-1} \frac{f\left(a + i\frac{b - a}{n}\right) + f\left(a + (i+1)\frac{b - a}{n}\right)}{2} \to \int_a^b f(x)\,dx
   $$

Si de plus $f \in C^2$, alors $\exists M > 0$ :

$$
\left|\int_a^b f(x)\,dx - \frac{b - a}{n} \sum_{i=0}^{n-1} \frac{f\left(a + i\frac{b - a}{n}\right) + f\left(a + (i+1)\frac{b - a}{n}\right)}{2}\right| \leq M\frac{(b - a)^3}{12n^2}
$$

**Démonstration.** On applique le théorème précédent à la subdivision $c_i = a + i\dfrac{(b - a)}{n}, i = 0, \dots, n - 1$.

**Exercice.** Soit $u_n = \displaystyle\sum_{i=0}^{n-1} \frac{1}{n + i}$, $n \in \mathbb{N}^*$. Calculer $\lim u_n$.

**Solution.** $u_n = \dfrac{1}{n} \displaystyle\sum_{i=0}^{n-1} \frac{1}{1 + \frac{i}{n}}$. Soit $f : [0, 1] \to \mathbb{R}$, $x \to \dfrac{1}{1 + x}$, $a = 0$, $b = 1$ :

$$
\frac{b - a}{n} \sum_{i=0}^{n-1} f\left(a + i\frac{b - a}{n}\right) = \frac{1}{n} \sum_{i=0}^{n-1} f(i/n) = \frac{1}{n} \sum_{i=0}^{n-1} \frac{1}{1 + \frac{i}{n}} = u_n \to \int_0^1 \frac{1}{1 + x}\,dx \Rightarrow \lim u_n = \int_0^1 \frac{1}{1 + x}\,dx = \ln(2)
$$
