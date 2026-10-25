---
title: "Intégrales curvilignes"
description: "Corrections d'exercices d'intégrales curvilignes : abscisse curviligne, longueurs de courbes (hélice, spirale logarithmique), circulation d'une fonction le long d'une courbe et charges réparties sur un cercle, un disque et une sphère."
sidebar_position: 6
sidebar_custom_props:
  kind: td
---

## IC1

$I(f) = \displaystyle\int_{AB} f(M)\,ds \to f(M) = \frac{1}{x - y}$, et $\Gamma : y = \dfrac{x}{2} - 2$ sur $\begin{cases} A(0, -2) \\ B(4, 0) \end{cases}$

- $ds = \sqrt{dx^2 + dy^2} = \sqrt{1 + \left(\dfrac{dy}{dx}\right)^2}dx$ ; $\dfrac{dy}{dx} = \dfrac{1}{2} \Rightarrow ds = \sqrt{1 + \left(\dfrac{1}{2}\right)^2}dx = \dfrac{\sqrt{5}}{2}dx$.
- $f(M) = \dfrac{1}{x - y} = \dfrac{1}{x - (x/2 - 2)} = \dfrac{1}{x/2 + 2} = \dfrac{2}{x + 4}$.
- Intégrale :

  $$
  I(f) = \int_{x_A = 0}^{x_B = 4} \frac{2}{x + 4}\frac{\sqrt{5}}{2}dx = \sqrt{5}\int_0^4 \frac{1}{x + 4}dx = \sqrt{5}[\ln(x + 4)]_0^4 = \sqrt{5}(\ln 8 - \ln 4) = \sqrt{5}\ln 2
  $$

## IC2

1. a) Élément de longueur :

   $$
   ds = \sqrt{1 + \left(\frac{dy}{dx}\right)^2}dx \quad \to \quad \frac{dy}{dx} = \frac{2x}{4} - \frac{1}{2x} = \frac{x^2 - 1}{2x}
   $$

   $$
   \Rightarrow 1 + \left(\frac{dy}{dx}\right)^2 = 1 + \left(\frac{x^2 - 1}{2x}\right)^2 = \frac{4x^2 + x^4 - 2x^2 + 1}{(2x)^2} = \frac{x^4 + 2x^2 + 1}{(2x)^2} = \frac{(x^2 + 1)^2}{(2x)^2}
   $$

   $$
   \Rightarrow ds = \frac{x^2 + 1}{2x}dx = \left(\frac{x}{2} + \frac{1}{2x}\right)dx = \frac{1}{2}\left(x + \frac{1}{x}\right)dx
   $$

   b) Longueur :

   $$
   l = \int_{x_A = 1}^{x_B = e} ds = \int_1^e \frac{1}{2}\left(x + \frac{1}{x}\right)dx = \frac{1}{2}\left[\frac{x^2}{2} + \ln x\right]_1^e = \frac{1}{2}\left(\frac{e^2}{2} + 1 - \frac{1}{2}\right) = \frac{1}{4}(e^2 + 1) \approx 2{,}1\ m
   $$

2. Circulation :

   $$
   I_C = \int_1^e \Phi(x, y)\,ds = \int_1^e x\left(\frac{x}{2} + \frac{1}{2x}\right)dx = \int_1^e \left(\frac{x^2}{2} + \frac{1}{2}\right)dx = \left[\frac{x^3}{6} + \frac{x}{2}\right]_1^e = \frac{e^3}{6} + \frac{e}{2} - \frac{1}{6} - \frac{1}{2} \approx 4{,}04
   $$

## IC3

$$
y(x) = \sqrt{x}\left(\frac{x}{3} - 1\right) = x^{1/2}\left(\frac{x}{3} - 1\right) = \frac{x^{3/2}}{3} - x^{1/2}
\quad \to \quad
\Phi(x, y) = xy = x\left(\frac{x^{3/2}}{3} - x^{1/2}\right) = \frac{x^{5/2}}{3} - x^{3/2}
$$

1. Longueur :

   $$
   ds = \sqrt{1 + \left(\frac{dy}{dx}\right)^2}dx \quad \to \quad \frac{dy}{dx} = \frac{3}{2}\frac{x^{1/2}}{3} - \frac{1}{2}x^{-1/2} = \frac{\sqrt{x}}{2} - \frac{1}{2\sqrt{x}}
   $$

   $$
   \Rightarrow 1 + \left(\frac{dy}{dx}\right)^2 = 1 + \left(\frac{\sqrt{x}}{2} - \frac{1}{2\sqrt{x}}\right)^2 = 1 + \frac{x}{4} - 2\frac{\sqrt{x}}{2}\frac{1}{2\sqrt{x}} + \frac{1}{4x} = \frac{x}{4} + \frac{1}{2} + \frac{1}{4x} = \left(\frac{\sqrt{x}}{2} + \frac{1}{2\sqrt{x}}\right)^2
   $$

   $$
   \Rightarrow ds = \left(\frac{\sqrt{x}}{2} + \frac{1}{2\sqrt{x}}\right)dx = \left(\frac{x^{1/2}}{2} + \frac{x^{-1/2}}{2}\right)dx
   $$

   $$
   l = \int_{x_A = 0}^{x_B = 3} ds = \int_0^3 \left(\frac{x^{1/2}}{2} + \frac{x^{-1/2}}{2}\right)dx = \left[\frac{2}{3}\frac{x^{3/2}}{2} + 2\frac{x^{1/2}}{2}\right]_0^3 = \frac{3^{3/2}}{3} + 3^{1/2} = 2 \times 3^{1/2} = 2\sqrt{3}
   $$

2. Circulation :

   $$
   I_C = \int_0^3 \Phi(x, y)\,ds = \int_0^3 \left(\frac{x^{5/2}}{3} - x^{3/2}\right)\left(\frac{x^{1/2}}{2} + \frac{x^{-1/2}}{2}\right)dx = \int_0^3 \left(\frac{x^3}{6} + \frac{x^2}{6} - \frac{x^2}{2} - \frac{x}{2}\right)dx = \int_0^3 \left(\frac{x^3}{6} - \frac{x^2}{3} - \frac{x}{2}\right)dx
   $$

   $$
   I_C = \left[\frac{x^4}{24} - \frac{x^3}{9} - \frac{x^2}{4}\right]_0^3 = \left(\frac{81}{24} - \frac{27}{9} - \frac{9}{4}\right) = \frac{81 - 72 - 54}{24} = -\frac{45}{24} = -\frac{15}{8}
   $$

## IC4

- $\begin{cases} x = a\cos t \\ y = a\sin t \\ z = ht \end{cases}$, $t \in [0, 2\pi]$ $\Rightarrow \begin{cases} dx/dt = -a\sin t \\ dy/dt = a\cos t \\ dz/dt = h \end{cases}$
- $ds = \sqrt{\left(\dfrac{dx}{dt}\right)^2 + \left(\dfrac{dy}{dt}\right)^2 + \left(\dfrac{dz}{dt}\right)^2}dt = \sqrt{a^2\sin^2 t + a^2\cos^2 t + h^2}dt = \sqrt{a^2 + h^2}dt$
- $L = \displaystyle\int_0^{2\pi} ds = \int_0^{2\pi} \sqrt{a^2 + h^2}dt = \sqrt{a^2 + h^2}\int_0^{2\pi} dt = 2\pi\sqrt{a^2 + h^2}$

## IC6

- $\rho = ae^{-\varphi}$, $\varphi \in [0, 2\pi]$.
- $ds = \sqrt{(d\rho)^2 + (\rho\,d\varphi)^2} = \sqrt{\left(\dfrac{d\rho}{d\varphi}\right)^2 + \rho^2}\,d\varphi = \sqrt{(-ae^{-\varphi})^2 + (ae^{-\varphi})^2}\,d\varphi = \sqrt{2a^2(e^{-\varphi})^2}\,d\varphi$, soit $ds = \sqrt{2}ae^{-\varphi}d\varphi$.
- Longueur :

  $$
  L = \int_0^{2\pi} ds = \int_0^{2\pi} \sqrt{2}ae^{-\varphi}d\varphi = a\sqrt{2}[-e^{-\varphi}]_0^{2\pi} = a\sqrt{2}(-e^{-2\pi} - (-e^{-0})) = a\sqrt{2}(1 - e^{-2\pi})
  $$

  $$
  \lim_{\varphi \to +\infty} L = a\sqrt{2}(1 - e^{-\infty}) = a\sqrt{2}
  $$

## IC9

1. $\Gamma \begin{cases} \rho = R \\ \varphi \in [0, 2\pi] \end{cases} \to \begin{cases} x = R\cos\varphi \\ y = R\sin\varphi \end{cases}$, $R$ constante.
   - $\lambda(x, y) = C$, $C$ constante : $Q = \displaystyle\oint_\Gamma C\,dl = C\oint_\Gamma dl = 2\pi RC$, car $\displaystyle\oint_\Gamma dl$ = périmètre du cercle.
   - $\lambda(x, y) = \dfrac{Cx^2}{x^2 + y^2}$ $\to$ coordonnées polaires $\Rightarrow \lambda(R, \varphi) = \dfrac{CR^2\cos^2\varphi}{R^2\cos^2\varphi + R^2\sin^2\varphi} = C\cos^2\varphi$ ; $dl = \sqrt{(d\rho)^2 + (\rho\,d\varphi)^2} = \sqrt{(dR)^2 + (R\,d\varphi)^2} = R\,d\varphi$.

     $$
     Q = \oint_0^{2\pi} C\cos^2(\varphi)R\,d\varphi = RC\oint_0^{2\pi} \frac{1 + \cos(2\varphi)}{2}d\varphi = \frac{RC}{2}[\varphi + \sin(2\varphi)]_0^{2\pi} = \pi RC
     $$

2. $\Sigma \begin{cases} \rho \in [0, R] \\ \varphi \in [0, 2\pi] \end{cases} \to \begin{cases} x = \rho\cos\varphi \\ y = \rho\sin\varphi \end{cases}$
   - $\sigma(x, y) = C$, $C$ constante : $Q = \displaystyle\iint_\Sigma C\,dS = C\iint_\Sigma dS = \pi R^2C$, car $\displaystyle\iint_\Sigma dS$ = aire du disque.
   - $\sigma(x, y) = C\sqrt{x^2 + y^2}$ $\to$ coordonnées polaires $\Rightarrow \sigma(\rho, \varphi) = C\rho$ ; $dS = \rho\,d\rho\,d\varphi$ :

     $$
     Q = \int_0^{2\pi} d\varphi\int_0^R C\rho^2\,d\rho = 2\pi C\frac{R^3}{3}
     $$

3. $E \begin{cases} r \in [0, R] \\ \theta \in [0, \pi] \\ \varphi \in [0, 2\pi] \end{cases} \to \begin{cases} x = r\sin\theta\cos\varphi \\ y = r\sin\theta\sin\varphi \\ z = r\cos\theta \end{cases}$
   - $\rho(x, y, z) = C$, $C$ constante : $Q = \displaystyle\iiint_E C\,dV = C\iiint_E dV = \frac{4}{3}\pi R^3C$, car $\displaystyle\iiint_E dV$ = volume de la sphère.
   - $\rho(x, y, z) = C\sqrt{x^2 + y^2 + z^2}$ $\to$ coordonnées sphériques $\Rightarrow \rho(r, \theta, \varphi) = Cr$ ; $dV = r^2\sin\theta\,dr\,d\theta\,d\varphi$ :

     $$
     Q = \int_0^{2\pi} d\varphi\int_0^\pi \sin\theta\,d\theta\int_0^R Cr^3\,dr = 2\pi 2C\frac{R^4}{4} = \pi CR^4
     $$
