---
title: "Intégrales simples"
description: "Corrections d'exercices d'intégrales simples : intégration directe, intégration par parties, changement de variable, arctangente, valeurs moyenne et efficace d'un courant sinusoïdal et redressé."
sidebar_position: 4
sidebar_custom_props:
  kind: td
---

## IS1

$$
Q = \int_{273}^{298} \frac{dQ}{dT}dT = \int_{273}^{298} 34{,}5 + 4{,}2.10^{-3}\,T\,dT = \left[34{,}5\,T + 2{,}1.10^{-3}\,T^2\right]_{273}^{298} \approx 892{,}5\ J
$$

## IS2

1. $I_1 = \displaystyle\int_0^\pi x\cos(x)\,dx$, intégration par parties : $\begin{cases} u(x) = x \to u'(x) = 1 \\ v'(x) = \cos(x) \to v(x) = \sin(x) \end{cases}$

   $$
   I_1 = [x\sin(x)]_0^\pi - \int_0^\pi \sin(x)\,dx = -[-\cos(x)]_0^\pi = -2
   $$

2. $I_2 = \displaystyle\int_0^a \sqrt{1 - \frac{x^2}{a^2}}\,dx$ avec $a > 0$ : changement de variable $x = a\sin u$.

   - $x = a\sin u \Leftrightarrow u = \arcsin\left(\dfrac{x}{a}\right)$ ;
   - $\begin{cases} x = a \to u = \arcsin\left(\frac{a}{a}\right) = \frac{\pi}{2} \\ x = 0 \to u = \arcsin(0) = 0 \end{cases}$ ;
   - $dx = d(a\sin u) = (a\cos u)\,du$.

   $$
   I_2 = \int_0^{\pi/2} \sqrt{1 - \frac{a^2\sin^2 u}{a^2}}\,a\cos u\,du = a\int_0^{\pi/2} \sqrt{1 - \sin^2 u}\cos u\,du = a\int_0^{\pi/2} \sqrt{\cos^2 u}\cos u\,du = a\int_0^{\pi/2} \cos^2(u)\,du
   $$

   $$
   I_2 = a\int_0^{\pi/2} \frac{1 + \cos(2u)}{2}du = \frac{a}{2}\left[u + \frac{\sin(2u)}{2}\right]_0^{\pi/2} = \frac{a}{2}\left[\frac{\pi}{2} + \frac{\sin(2\pi/2)}{2} - 0 - \frac{\sin(0)}{2}\right] = \frac{a\pi}{4}
   $$

3. Arctangente :

   $$
   I_3 = \int_0^2 \frac{x^2}{x^2 + 4}dx = \int_0^2 \frac{x^2 + 4 - 4}{x^2 + 4}dx = \int_0^2 \left(1 - \frac{4}{x^2 + 4}\right)dx = \int_0^2 1\,dx - \int_0^2 \frac{1}{\frac{x^2}{4} + 1}dx = 2 - 2\int_0^2 \frac{1/2}{(x/2)^2 + 1}dx
   $$

   $$
   I_3 = 2 - 2\left[\arctan\left(\frac{x}{2}\right)\right]_0^2 = 2 - 2[\arctan(1) - \arctan(0)] = 2 - 2\frac{\pi}{4} = 2 - \frac{\pi}{2}
   $$

## IS4

1. a) La période étant $T$, $\forall t$, $\cos(\omega(t + T)) = \cos(\omega t)$, donc $\omega(t + T) = \omega t + \omega T = \omega t + 2\pi$ car la fonction cosinus est $2\pi$-périodique. Donc $\omega T = 2\pi$, donc $\omega = \dfrac{2\pi}{T}$.

   b) Valeur moyenne et valeur efficace :

   $$
   \bar{I} = \frac{1}{T}\int_0^T i(t)\,dt = \frac{\omega}{2\pi}\int_0^T I_m\cos(\omega t)\,dt = \frac{\omega}{2\pi}I_m\left[\frac{\sin(\omega t)}{\omega}\right]_0^T = \frac{\omega}{2\pi}I_m\left(\frac{\sin(\omega T)}{\omega}\right) = \frac{\omega}{2\pi}I_m\left(\frac{\sin(2\pi)}{\omega}\right)
   \qquad \bar{I} = 0
   $$

   $$
   (I_{eff})^2 = \frac{1}{T}\int_0^T I_m^2\cos^2(\omega t)\,dt = \frac{\omega}{2\pi}I_m^2\int_0^T \frac{1 + \cos(2\omega t)}{2}dt = \frac{\omega}{2\pi}I_m^2\left[\frac{t}{2} + \frac{\sin(2\omega t)}{4\omega}\right]_0^T = \frac{\omega}{2\pi}I_m^2\left(\frac{T}{2} + \frac{\sin(4\pi) - \sin 0}{4\omega}\right)
   $$

   $$
   (I_{eff})^2 = \frac{\omega I_m^2}{2\pi}\frac{T}{2} = \frac{\omega I_m^2}{4\pi}\frac{2\pi}{\omega} = \frac{I_m^2}{2}, \quad \text{donc} \quad I_{eff} = \frac{I_m}{\sqrt{2}}
   $$

2. a) On voit que $T_R = \pi/\omega$.

   b) $\bar{I}_R = \dfrac{\omega}{\pi}\displaystyle\int_0^{T_R} I_m|\cos(\omega t)|\,dt$ avec $T_R = \dfrac{\pi}{\omega}$, $t \in \left[0, \dfrac{\pi}{\omega}\right] \Rightarrow \omega t \in [0, \pi]$.

   Donc pour $t \in \left[0, \dfrac{\pi}{2\omega}\right]$, $\cos(\omega t) \geqslant 0 \Rightarrow |\cos(\omega t)| = \cos(\omega t)$, et pour $t \in \left[\dfrac{\pi}{2\omega}, \dfrac{\pi}{\omega}\right]$, $\cos(\omega t) \leqslant 0 \Rightarrow |\cos(\omega t)| = -\cos(\omega t)$.

   $$
   \text{Ainsi} \quad \bar{I}_R = \frac{\omega}{\pi}\left[\int_0^{\pi/2\omega} I_m\cos(\omega t)\,dt + \int_{\pi/2\omega}^{\pi/\omega} -I_m\cos(\omega t)\,dt\right]
   $$

   Par symétrie :

   $$
   \bar{I}_R = 2\frac{\omega}{\pi}\left[\int_0^{\pi/2\omega} I_m\cos(\omega t)\,dt\right] = \frac{2\omega}{\pi}I_m\left[\frac{\sin(\omega t)}{\omega}\right]_0^{\pi/2\omega} = \frac{2\omega}{\pi}I_m\left[\frac{\sin\frac{\pi}{2}}{\omega}\right] = \frac{2}{\pi}I_m
   $$

   $$
   (I_{eff}^R)^2 = \frac{\omega}{\pi}\int_0^{\pi/\omega} I_m^2|\cos(\omega t)|^2\,dt = \frac{\omega}{\pi}\int_0^{\pi/\omega} I_m^2\cos^2(\omega t)\,dt = \frac{\omega}{\pi}I_m^2\int_0^{\pi/\omega} \frac{1 + \cos(2\omega t)}{2}dt = \frac{\omega}{\pi}I_m^2\left[\frac{t}{2} + \frac{\sin(2\omega t)}{4\omega}\right]_0^{\pi/\omega}
   $$

   $$
   (I_{eff}^R)^2 = \frac{\omega}{\pi}I_m^2\left[\frac{\pi}{2\omega}\right] = \frac{I_m^2}{2}
   \qquad
   I_{eff}^R = \frac{I_m}{\sqrt{2}}
   $$
