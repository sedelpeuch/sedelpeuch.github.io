---
title: "Intégrales doubles et triples"
description: "Corrections d'exercices d'intégrales doubles et triples : calculs de surfaces, aire de l'ellipse, centre de gravité d'un demi-disque, moments d'inertie d'un disque et d'un cylindre, masse et charge en coordonnées polaires et sphériques."
sidebar_position: 5
sidebar_custom_props:
  kind: td
---

## Intégrales doubles

### ID1

$$
I = \iint_D xy\,dxdy = \int_0^1 x\left(\int_0^{1-x} y\,dy\right)dx = \int_0^1 x\left[\frac{y^2}{2}\right]_0^{1-x}dx = \int_0^1 x\frac{(1 - x)^2}{2}dx = \frac{1}{2}\int_0^1 (x^3 - 2x^2 + x)\,dx
$$

$$
I = \frac{1}{2}\left[\frac{x^4}{4} - \frac{2}{3}x^3 + \frac{x^2}{2}\right]_0^1 = \frac{1}{2}\left[\frac{1}{4} - \frac{2}{3} + \frac{1}{2}\right] = \frac{1}{2}\left[\frac{3 - 8 + 6}{12}\right] = \frac{1}{24}
$$

### ID3

1. Surface du domaine :

   $$
   S_D = \iint_D 1\,dxdy = \int_0^1 \left(\int_{x^2}^{\sqrt{x}} dy\right)dx = \int_0^1 [y]_{x^2}^{\sqrt{x}}dx = \int_0^1 (\sqrt{x} - x^2)\,dx = \int_0^1 (x^{1/2} - x^2)\,dx = \left[\frac{2}{3}x^{3/2} - \frac{x^3}{3}\right]_0^1
   $$

   $$
   S_D = \frac{2}{3} - \frac{1}{3} = \frac{1}{3}
   $$

2. Intégrale :

   $$
   I = \iint_D xy\,dxdy = \int_0^1 x\left(\int_{x^2}^{\sqrt{x}} y\,dy\right)dx = \int_0^1 x\left[\frac{y^2}{2}\right]_{x^2}^{\sqrt{x}}dx = \int_0^1 x\left(\frac{x}{2} - \frac{x^4}{2}\right)dx = \int_0^1 \left(\frac{x^2}{2} - \frac{x^5}{2}\right)dx
   $$

   $$
   I = \frac{1}{2}\left[\frac{x^3}{3} - \frac{x^6}{6}\right]_0^1 = \frac{1}{2}\left(\frac{1}{3} - \frac{1}{6}\right) = \frac{1}{12}
   $$

### ID4

Surface de l'ellipse ? $y_-(x) = 0$ et $y_+(x)$ :

$$
\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1 \Leftrightarrow y^2 = b^2\left(1 - \frac{x^2}{a^2}\right) \Leftrightarrow y = \pm b\sqrt{1 - \frac{x^2}{a^2}} \Rightarrow y_+(x) = b\sqrt{1 - \frac{x^2}{a^2}}
$$

$S = 4S_{D_1}$, avec $D_1$ le quart supérieur droit de l'ellipse (tel que $x \geqslant 0$ et $y \geqslant 0$). Donc

$$
S = 4\left(\iint_{D_1} dxdy\right) = 4\left[\int_0^a \left(\int_0^{b\sqrt{1 - x^2/a^2}} dy\right)dx\right] = 4\int_0^a b\sqrt{1 - \frac{x^2}{a^2}}dx = 4b\int_0^a \sqrt{1 - \frac{x^2}{a^2}}dx
$$

Les calculs mènent à $S = 4b\dfrac{\pi a}{4} = \pi ab$.

### ID5

Rappel : équation d'un cercle $\to x^2 + y^2 = R^2$, aire d'un cercle $= \pi R^2$.

$$
x_G = \frac{1}{S}\iint_D x\,dxdy = \frac{2}{\pi R^2}\int_{-R}^{R} x\left(\int_0^{\sqrt{R^2 - x^2}} dy\right)dx = \frac{2}{\pi R^2}\int_{-R}^{R} x\sqrt{R^2 - x^2}\,dx = \left(-\frac{1}{2}\frac{2}{3}\right)\frac{2}{\pi R^2}\int_{-R}^{R} \left(-2\frac{3}{2}\right)x(R^2 - x^2)^{1/2}dx
$$

$$
x_G = -\frac{2}{3\pi R^2}\left[(R^2 - x^2)^{3/2}\right]_{-R}^{R} = 0
$$

$$
y_G = \frac{1}{S}\iint_D y\,dxdy = \frac{2}{\pi R^2}\int_{-R}^{R} \left(\int_0^{\sqrt{R^2 - x^2}} y\,dy\right)dx = \frac{2}{\pi R^2}\int_{-R}^{R} \left[\frac{y^2}{2}\right]_0^{\sqrt{R^2 - x^2}}dx = \frac{2}{\pi R^2}\int_{-R}^{R} \frac{R^2 - x^2}{2}dx
$$

$$
y_G = \frac{1}{\pi R^2}\left[xR^2 - \frac{x^3}{3}\right]_{-R}^{R} = \frac{1}{\pi R^2}\left[R^3 - \frac{R^3}{3} - \left(-R^3 - \frac{-R^3}{3}\right)\right] = \frac{1}{\pi R^2}\left(2R^3 - \frac{2R^3}{3}\right) = \frac{1}{\pi R^2}\left(\frac{4R^3}{3}\right) = \frac{4R}{3\pi}
$$

En polaire : $\begin{cases} x = \rho\cos\varphi \\ y = \rho\sin\varphi \end{cases}$, $ds = \rho\,d\rho\,d\varphi$, $D' \begin{cases} \rho \in [0, R] \\ \varphi \in [0, \pi] \end{cases}$

$$
y_G = \frac{2}{R^2\pi}\int_0^\pi \left(\int_0^R \rho\sin\varphi\,\rho\,d\rho\right)d\varphi = \frac{2}{R^2\pi}\int_0^\pi \sin\varphi\left[\frac{\rho^3}{3}\right]_0^R d\varphi = \frac{2}{R^2\pi}\int_0^\pi \sin\varphi\frac{R^3}{3}d\varphi = \frac{2R}{3\pi}[-\cos\varphi]_0^\pi
\qquad
y_G = \frac{4R}{3\pi}
$$

### ID6

$\begin{cases} x = \rho\cos\varphi \\ y = \rho\sin\varphi \end{cases}$, $f(x, y) = \mu(x^2 + y^2) \to g(\rho, \varphi) = \mu\rho^2$, $ds = \rho\,d\rho\,d\varphi$, $D' \begin{cases} \rho \in [0, R] \\ \varphi \in [0, 2\pi] \end{cases}$

$$
I_0 = \int_0^{2\pi} \left(\int_0^R \mu\rho^2\rho\,d\rho\right)d\varphi = \mu\int_0^{2\pi} d\varphi\int_0^R \rho^3\,d\rho = \mu 2\pi\left[\frac{\rho^4}{4}\right]_0^R = \mu\pi\frac{R^4}{2}
$$

**Remarque.** Masse $\to M = \mu \times S = \mu\pi R^2$, $S$ la surface de la plaque : $I_0 = \dfrac{MR^2}{2}$.

### ID9

1. Les coordonnées polaires $(\rho, \varphi)$.
2. $dS = \rho\,d\rho\,d\varphi$ et $dm = \sigma(\rho)\,dS$.
3. Masse :

   $$
   m = \iint_\Sigma dm = \iint_\Sigma \sigma(\rho)\rho\,d\rho\,d\varphi = \iint_\Sigma a(R^2 - \rho^2)\rho\,d\rho\,d\varphi, \quad \text{avec } \Sigma \begin{cases} \rho \in [0, R] \\ \varphi \in [0, 2\pi] \end{cases}
   $$

   $$
   \text{Donc} \quad m = a\int_0^{2\pi} d\varphi\int_0^R R^2\rho - \rho^3\,d\rho = a2\pi\left[\frac{R^2\rho^2}{2} - \frac{\rho^4}{4}\right]_0^R = 2\pi a\left(\frac{R^4}{2} - \frac{R^4}{4}\right) = \frac{\pi aR^4}{2}
   $$

4. Homogénéité :
   - $R^4 \propto m^4$, ici $m$ = mètres ;
   - $a = \dfrac{\sigma(\rho)}{(R^2 - \rho^2)} \propto \dfrac{kg.m^{-2}}{m^2}$, donc $a \propto kg.m^{-4}$ ;
   - finalement, on a bien $m = \dfrac{\pi aR^4}{2} \propto kg.m^{-4}.m^4 = kg$.

## Intégrales triples

### IT3

Coordonnées cylindriques : $\begin{cases} x = \rho\cos(\varphi) \\ y = \rho\sin\varphi \\ z \end{cases} \Rightarrow \begin{cases} \mu(x^2 + y^2) \to \mu\rho^2 \\ dV = dxdydz \to \rho\,d\rho\,d\varphi\,dz \end{cases}$, $E' \begin{cases} \rho \in [0, R] \\ \varphi \in [0, 2\pi] \\ z \in [0, h] \end{cases}$

$$
I_{0z} = \iiint_E \mu(x^2 + y^2)\,dxdydz = \mu\int_0^h dz\int_0^{2\pi} d\varphi\int_0^R \rho^3\,d\rho = \mu h2\pi\frac{R^4}{4} = \mu\pi\frac{hR^4}{2}
$$

**Remarque.** $M = \mu \times \text{Volume} = \mu\pi R^2h \Rightarrow I_{0z} = \dfrac{MR^2}{2}$.

### IT4

- $\rho \propto C.m^{-3} \to a = \dfrac{\rho}{r_0 - r} \propto \dfrac{C.m^{-3}}{m} \propto C.m^{-4}$.
- $Q = \displaystyle\iiint_\Sigma dQ = \iiint_\Sigma \rho(r)\,dV = \iiint_\Sigma a(r_0 - r)\,dV$.

Coordonnées sphériques $\Rightarrow dV = r^2\sin\theta\,dr\,d\theta\,d\varphi$, $\Sigma \begin{cases} r \in [0, r_0] \\ \theta \in [0, \pi] \\ \varphi \in [0, 2\pi] \end{cases}$

$$
Q = a\int_0^{2\pi} d\varphi\int_0^\pi \sin\theta\,d\theta\int_0^{r_0} (r_0 - r)r^2\,dr = a2\pi[-\cos\theta]_0^\pi\left[r_0\frac{r^3}{3} - \frac{r^4}{4}\right]_0^{r_0} = a2\pi 2\left(\frac{r_0^4}{3} - \frac{r_0^4}{4}\right)
\qquad
Q = \frac{\pi ar_0^4}{3}
$$
