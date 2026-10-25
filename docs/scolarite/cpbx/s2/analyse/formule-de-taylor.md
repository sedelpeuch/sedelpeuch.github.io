---
title: "Formule de Taylor"
description: "Formules de Taylor : fonctions de classe C^k, formule de Taylor avec reste intégral, inégalité de Taylor-Lagrange, formule de Taylor-Lagrange pour les fonctions à valeurs réelles, formule de Taylor-Young et application à ln(1 + x)."
sidebar_position: 3
---

## Fonction de classe $C^k$

**Définition.** Soit $f : [a, b] \to \mathbb{R}$. On dit que $f$ est de classe $C^1$ si et seulement si $f$ est dérivable et $f' : [a, b] \to \mathbb{R}$ est continue. On dit que $f$ est de classe $C^2$ si $f'$ est de classe $C^1$. En général, on dit que $f$ est de classe $C^k$ si $f'$ est de classe $C^{k-1}$, c'est-à-dire que $f$ est $k$ fois dérivable et que sa dérivée $k$-ième $f^{(k)}$ est continue.

## Formule de Taylor avec reste intégral

Soit $f : [a, b] \to \mathbb{R}$ une fonction de classe $C^{n+1}$. Pour tous $x, x_0 \in [a, b]$, on a :

$$
f(x) = f(x_0) + f'(x_0)(x - x_0) + \dots + \frac{f^{(k)}(x_0)}{k!}(x - x_0)^k + \dots + \frac{f^{(n)}(x_0)}{n!}(x - x_0)^n + \int_{x_0}^{x} \frac{(x - t)^n}{n!} f^{(n+1)}(t)\,dt
$$

$$
f(x) = \sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!}(x - x_0)^k + \int_{x_0}^{x} \frac{(x - t)^n}{n!} f^{(n+1)}(t)\,dt
$$

En particulier, si $x_0 = 0$, on a : $f(x) = \displaystyle\sum_{k=0}^{n} \frac{f^{(k)}(0)}{k!} x^k + \int_0^x \frac{(x - t)^n}{n!} f^{(n+1)}(t)\,dt$.

**Preuve (par récurrence).**

- Pour $n = 0$ : $f(x) = f(x_0) + \displaystyle\int_{x_0}^{x} f'(t)\,dt$ (pour $n = 0$, c'est le théorème fondamental de l'analyse). On suppose que la formule de Taylor est vraie pour $f \in C^n$, c'est-à-dire

  $$
  f(x) = f(x_0) + f'(x_0)(x - x_0) + \frac{f^{(k)}(x_0)}{k!}(x - x_0)^k + \dots + \frac{f^{(n-1)}(x_0)}{(n-1)!}(x - x_0)^{n-1} + \int_{x_0}^{x} \frac{(x - t)^{n-1}}{(n-1)!} f^{(n)}(t)\,dt
  $$

- Si $f \in C^{n+1}$, alors $g = f' \in C^n$ ; on applique l'hypothèse de récurrence à $g$ :

  $$
  g(y) = g(x_0) + g'(x_0)(y - x_0) + \dots + \frac{g^{(k)}(x_0)}{k!}(y - x_0)^k + \dots + \frac{g^{(n-1)}(x_0)}{(n-1)!}(y - x_0)^{n-1} + \int_{x_0}^{y} \frac{(y - t)^{n-1}}{(n-1)!} g^{(n)}(t)\,dt
  $$

  On intègre entre $x_0$ et $x$ :

  $$
  \int_{x_0}^{x} g(y)\,dy = \int_{x_0}^{x} g(x_0)\,dy + \int_{x_0}^{x} g'(x_0)(y - x_0)\,dy + \dots + \int_{x_0}^{x} \frac{g^{(k)}(x_0)}{k!}(y - x_0)^k\,dy + \dots + \int_{x_0}^{x} \frac{g^{(n-1)}(x_0)}{(n-1)!}(y - x_0)^{n-1}\,dy + \int_{x_0}^{x} \left(\int_{x_0}^{y} \frac{(y - t)^{n-1}}{(n-1)!} g^{(n)}(t)\,dt\right) dy
  $$

- Comme $g = f'$, $f$ est une primitive de $g$ :

  $$
  \int_{x_0}^{x} g(y)\,dy = f(x) - f(x_0) = g(x_0)(x - x_0) + g'(x_0)\left[\frac{(y - x_0)^2}{2}\right]_{x_0}^{x} + \dots + \frac{g^{(k)}(x_0)}{k!}\left[\frac{(y - x_0)^{k+1}}{k+1}\right]_{x_0}^{x} + \dots + \frac{g^{(n-1)}(x_0)}{(n-1)!}\left[\frac{(y - x_0)^n}{n}\right]_{x_0}^{x} + \int_{x_0}^{x} \int_{x_0}^{y} \frac{(y - t)^{n-1}}{(n-1)!} g^{(n)}(t)\,dt\,dy
  $$

- Comme $g = f'$, alors $g^{(k)} = f^{(k+1)}$ :

  $$
  \begin{aligned}
  f(x) - f(x_0) &= f'(x_0)(x - x_0) + f''(x_0)\frac{(x - x_0)^2}{2} + \dots + \frac{f^{(k+1)}(x_0)}{k!}\frac{(x - x_0)^{k+1}}{k+1} + \dots + \frac{f^{(n)}(x_0)}{(n-1)!}\frac{(x - x_0)^n}{n} + \int_{x_0}^{x} \int_{x_0}^{y} \frac{(y - t)^{n-1}}{(n-1)!} f^{(n+1)}(t)\,dt\,dy \\
  &= f'(x_0)(x - x_0) + f''(x_0)\frac{(x - x_0)^2}{2!} + \dots + \frac{f^{(k+1)}(x_0)}{(k+1)!}(x - x_0)^{k+1} + \dots + \frac{f^{(n)}(x_0)}{n!}(x - x_0)^n + \int_{x_0}^{x} \int_{x_0}^{y} \frac{(y - t)^{n-1}}{(n-1)!} f^{(n+1)}(t)\,dt\,dy
  \end{aligned}
  $$

  On intègre $\displaystyle\int_{x_0}^{x} \int_{x_0}^{y} \frac{(y - t)^{n-1}}{(n-1)!} f^{(n+1)}(t)\,dt\,dy = \int_{x_0}^{x} \frac{(x - t)^n}{n!} f^{(n+1)}(t)\,dt$ (voir TD).

**Corollaire.** Soit $f : [a, b] \to \mathbb{C}$ une fonction de classe $C^{n+1}$. Alors $\forall x, x_0 \in [a, b]$, on a :

$$
f(x) = \sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!}(x - x_0)^k + \int_0^1 \frac{(1 - t)^n}{n!} f^{(n+1)}((1 - t)x_0 + tx)\,dt\,(x - x_0)^{n+1}
$$

**Preuve.** On sait que $f(x) = \displaystyle\sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!}(x - x_0)^k + \int_{x_0}^{x} \frac{(x - t)^n}{n!} f^{(n+1)}(t)\,dt$. Pour simplifier, on suppose que $x_0 = 0$. Dans $\displaystyle\int_0^x \frac{(x - t)^n}{n!} f^{(n+1)}(t)\,dt$, on pose $t = yx$ ($x$ est fixé) :

$$
\int_0^1 \frac{(x - yx)^n}{n!} f^{(n+1)}(yx)\,x\,dy = \int_0^1 \frac{(1 - y)^n}{n!} f^{(n+1)}(yx)\,dy\,x^{n+1} = \int_0^1 \frac{(1 - t)^n}{n!} f^{(n+1)}(tx)\,dt\,x^{n+1}
$$

**Corollaire.** Soit $f : [a, b] \to \mathbb{C}$ une fonction de classe $C^{n+1}$. Alors $\forall x, x_0 \in [a, b]$, on a :

$$
f(x) = \sum_{k=0}^{n} \frac{f^{(k)}(0)}{k!} x^k + \int_0^1 \frac{(1 - t)^n}{n!} f^{(n+1)}(tx)\,dt\,x^{n+1}
$$

**Théorème III.1.** Soit $f : [a, b] \to \mathbb{C}$ une fonction de classe $C^{n+1}$. Soit $M_n = \sup|f^{(n+1)}(t)|$. On a, $\forall x_0, x \in [a, b]$ :

$$
\left|f(x) - \sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!}(x - x_0)^k\right| \leq M_n \frac{|x - x_0|^{n+1}}{(n+1)!}
$$

**Preuve.** On sait que :

$$
f(x) - \sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!}(x - x_0)^k = \int_0^1 \frac{(1 - t)^n}{n!} f^{(n+1)}((1 - t)x_0 + tx)\,dt\,(x - x_0)^{n+1}
$$

$$
\left|f(x) - \sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!}(x - x_0)^k\right| \leq \sup|f^{(n+1)}(t)| \int_0^1 \frac{(1 - t)^n}{n!}\,dt\,|x - x_0|^{n+1} = M_n |x_0 - x|^{n+1}\left[-\frac{(1 - t)^{n+1}}{(n+1)!}\right]_0^1 = M_n \frac{|x - x_0|^{n+1}}{(n+1)!}
$$

## Formule de Taylor pour une fonction à valeurs réelles

Si $f : [a, b] \to \mathbb{R}$ est une fonction de classe $C^{n+1}$, alors $\forall x_0, x \in [a, b]$, il existe $c$ entre $x$ et $x_0$ tel que :

$$
f(x) = \sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!}(x - x_0)^k + \frac{(x - x_0)^{n+1}}{(n+1)!} f^{(n+1)}(c)
$$

**Remarque.** Pour $n = 0$, on obtient $f(x) = f(x_0) + (x - x_0) f'(c)$. C'est donc la généralisation du théorème des accroissements finis.

**Remarque.** On rappelle que le théorème des accroissements finis n'est pas valable pour une fonction $f$ à valeurs dans $\mathbb{C}$. En effet :

$$
\begin{aligned}
&f : [a, 2\pi] \to \mathbb{C}, t \to e^{it} = \cos(t) + i\sin(t) \\
&f'(t) = -\sin(t) + i\cos(t) = i(\cos(t) + i\sin(t)) = ie^{it} \\
&|f'(t)| = 1 \Rightarrow f'(t) \neq 0, \forall t \in [0, 2\pi]
\end{aligned}
$$

Donc le théorème des accroissements finis ne s'applique pas à $f$.

**Preuve.** On définit $\phi(t) = f(x) - \displaystyle\sum_{k=0}^{n} \frac{f^{(k)}(t)}{k!}(x - t)^k - \frac{(x - t)^{n+1}}{(n+1)!} A$ ; ici $x$ est fixé, $t$ est la variable et $A$ une constante.

Les $f^{(k)}$ pour $k$ de $0$ à $n$ sont dérivables (car $f \in C^{n+1}$) et $t \to (x - t)^k$ est dérivable, donc $t \to \phi(t)$ est dérivable. $\phi(x) = 0$. On fixe la constante $A$ telle que $\phi(x_0) = 0$.

D'après le **théorème de Rolle**, il existe $c$ entre $x_0$ et $x$ tel que $\phi'(c) = 0$.

$$
\begin{aligned}
\phi'(t) &= -\sum_{k=0}^{n} \frac{f^{(k+1)}(t)}{k!}(x - t)^k + \sum_{k=0}^{n} \frac{f^{(k)}(t)}{k!} k (x - t)^{k-1} + (n+1)\frac{(x - t)^n}{(n+1)!} A \\
&= -\sum_{k=0}^{n} \frac{f^{(k+1)}(t)}{k!}(x - t)^k + \sum_{k=1}^{n} \frac{f^{(k)}(t)}{(k-1)!}(x - t)^{k-1} + \frac{(x - t)^n}{n!} A
\end{aligned}
$$

On pose $p = k + 1$ dans la première somme :

$$
\begin{aligned}
\phi'(t) &= -\sum_{p=1}^{n+1} \frac{f^{(p)}(t)}{(p-1)!}(x - t)^{p-1} + \sum_{p=1}^{n} \frac{f^{(p)}(t)}{(p-1)!}(x - t)^{p-1} + \frac{(x - t)^n}{n!} A \\
&= -f^{(n+1)}(t)\frac{(x - t)^n}{n!} + \frac{(x - t)^n}{n!} A
\end{aligned}
$$

$$
\phi'(c) = 0 \Leftrightarrow -f^{(n+1)}(c)\frac{(x - c)^n}{n!} + \frac{(x - c)^n}{n!} A = 0 \Leftrightarrow A = f^{(n+1)}(c)
$$

$$
\phi(t) = f(x) - \sum_{k=0}^{n} \frac{f^{(k)}(t)}{k!}(x - t)^k - \frac{(x - t)^{n+1}}{(n+1)!} f^{(n+1)}(c)
$$

Comme $\phi(x_0) = 0$ :

$$
\begin{aligned}
&f(x) - \sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!}(x - x_0)^k - \frac{(x - x_0)^{n+1}}{(n+1)!} f^{(n+1)}(c) = 0 \\
\Leftrightarrow\ &\exists c \text{ entre } x_0 \text{ et } x \text{ tel que } f(x) = \sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!}(x - x_0)^k + \frac{(x - x_0)^{n+1}}{(n+1)!} f^{(n+1)}(c)
\end{aligned}
$$

**Remarque.** $c$ est un point entre $x_0$ et $x$ $\Leftrightarrow \exists t \in [0, 1]$, $c = (1 - t)x_0 + tx$.

**Corollaire.** Soit $f : [a, b] \to \mathbb{R}$ une fonction de classe $C^{n+1}$. Alors pour tous $x_0, x \in [a, b]$, $\exists t \in [0, 1]$ tel que :

$$
f(x) = \sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!}(x - x_0)^k + \frac{(x - x_0)^{n+1}}{(n+1)!} f^{(n+1)}((1 - t)x_0 + tx)
$$

En particulier, si $x_0 = 0 \in [a, b]$, on a :

$$
f(x) = \sum_{k=0}^{n} \frac{f^{(k)}(0)}{k!} x^k + \frac{x^{n+1}}{(n+1)!} f^{(n+1)}(tx)
$$

## Formule de Taylor-Young

Soit $f : [a, b] \to \mathbb{C}$ une fonction $n$ fois dérivable sur $[a, b]$. Soit $x_0 \in [a, b]$ ; on suppose que $f^{(n)}$ est dérivable au point $x_0$. Alors on a :

$$
f(x) = \sum_{k=0}^{n+1} \frac{f^{(k)}(x_0)}{k!}(x - x_0)^k + o\left((x - x_0)^{n+1}\right)
$$

**Preuve (par récurrence).** **Initialisation :** $n = 0$, l'hypothèse dit que $f$ est dérivable en $x_0$. On pose $\epsilon(x) = \dfrac{f(x) - f(x_0)}{x - x_0} - f'(x_0)$ pour $x \neq x_0$, et $\epsilon(x_0) = 0$.

$$
f(x) = f(x_0) + f'(x_0)(x - x_0) + (x - x_0)\epsilon(x), \quad \lim_{x \to x_0} \epsilon(x) = \lim_{x \to x_0} \left[\frac{f(x) - f(x_0)}{x - x_0} - f'(x_0)\right] = 0
$$

On suppose que la formule de Taylor est vraie jusqu'à $(n - 1)$. On applique la formule de Taylor à $g = f'$ :

$$
\begin{aligned}
&f'(x) = \sum_{k=0}^{n} \frac{f^{(k+1)}(x_0)}{k!}(x - x_0)^k + (x - x_0)^n \epsilon(x) \quad \text{avec} \quad \lim_{x \to x_0} \epsilon(x) = 0 \\
\Leftrightarrow\ &f'(t) = \sum_{k=0}^{n} \frac{f^{(k+1)}(x_0)}{k!}(t - x_0)^k + (t - x_0)^n \epsilon(t) \quad \text{avec} \quad \lim_{t \to x_0} \epsilon(t) = 0 \\
\Rightarrow\ &\int_{x_0}^{x} f'(t)\,dt = \sum_{k=0}^{n} \frac{f^{(k+1)}(x_0)}{k!} \int_{x_0}^{x} (t - x_0)^k\,dt + \int_{x_0}^{x} (t - x_0)^n \epsilon(t)\,dt
\end{aligned}
$$

$$
\begin{aligned}
f(x) - f(x_0) &= \sum_{k=0}^{n} \frac{f^{(k+1)}(x_0)}{(k+1)!}(x - x_0)^{k+1} + \int_{x_0}^{x} (t - x_0)^n \epsilon(t)\,dt \\
&= f'(x_0)(x - x_0) + \frac{f''(x_0)}{2!}(x - x_0)^2 + \dots + \frac{f^{(n+1)}(x_0)}{(n+1)!}(x - x_0)^{n+1} + (x - x_0)^{n+1} \cdot \frac{1}{(x - x_0)^{n+1}} \int_{x_0}^{x} (t - x_0)^n \epsilon(t)\,dt
\end{aligned}
$$

On pose $\tilde{\epsilon}(x) = \dfrac{1}{(x - x_0)^{n+1}} \displaystyle\int_{x_0}^{x} (t - x_0)^n \epsilon(t)\,dt$.

Il reste donc à prouver que $\displaystyle\lim_{x \to x_0} \tilde{\epsilon}(x) = 0$. On sait que $\displaystyle\lim_{t \to x_0} \epsilon(t) = 0 \Leftrightarrow \forall h > 0, \exists \eta > 0, |t - x_0| < \eta \Rightarrow |\epsilon(t)| < h$.

$$
\begin{aligned}
&\left|\int_{x_0}^{x} (t - x_0)^n \epsilon(t)\,dt\right| \leq h \left|\int_{x_0}^{x} |t - x_0|^n\,dt\right|, \quad \forall |x - x_0| < \eta, \quad \leq h \frac{|x - x_0|^{n+1}}{n+1} \\
\Rightarrow\ &\left|\frac{1}{(x - x_0)^{n+1}} \int_{x_0}^{x} (t - x_0)^n \epsilon(t)\,dt\right| = |\tilde{\epsilon}(x)| \leq \frac{h}{n+1} \frac{|x - x_0|^{n+1}}{|x - x_0|^{n+1}} = \frac{h}{n+1}
\end{aligned}
$$

Conclusion : $\forall h > 0, \exists \eta > 0, |x - x_0| < \eta \Rightarrow |\tilde{\epsilon}(x)| \leq \dfrac{h}{n+1} \Leftrightarrow \displaystyle\lim_{x \to x_0} \tilde{\epsilon}(x) = 0$.

## Applications des formules de Taylor

On applique la formule de Taylor à $f(x) = \ln(1 + x)$ :

$$
f(x) = f(0) + f'(0)x + f''(0)\frac{x^2}{2} + \int_0^1 \frac{(1 - t)^2}{2!} f^{(3)}(tx)\,dt\,x^3 = x - \frac{x^2}{2} + \int_0^1 \frac{(1 - t)^2}{2} \frac{2}{(1 + tx)^3}\,dt\,x^3 \geq x - \frac{x^2}{2}
$$

car $\displaystyle\int_0^1 \frac{(1 - t)^2}{2} \frac{2}{(1 + tx)^3}\,dt\,x^3 > 0$. Et

$$
f(x) \leq x - \frac{x^2}{2} + \int_0^1 (1 - t)^2\,dt\,x^3 \quad \text{car} \quad \frac{1}{(1 + tx)^3} \leq 1, \forall t > 0, x > 0
$$
