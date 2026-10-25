---
title: "Calcul différentiel"
description: "Corrections d'exercices de calcul différentiel : dérivées partielles, changement de variables, loi de Snell, coefficients thermoélastiques, formes différentielles exactes et calculs d'incertitudes."
sidebar_position: 2
sidebar_custom_props:
  kind: td
---

## CD1

1. Dérivées partielles :

   $$
   \begin{aligned}
   \frac{\partial f}{\partial x} &= \frac{1}{x - y}\cos(x^2 + y^2) + \ln(|x - y|)(-2x\sin(x^2 + y^2)) \\
   \frac{\partial f}{\partial y} &= -\frac{1}{x - y}\cos(x^2 + y^2) + \ln(|x - y|)(-2y\sin(x^2 + y^2))
   \end{aligned}
   $$

   Finalement :

   $$
   df = \left[\frac{\cos(x^2 + y^2)}{x - y} - \ln(|x - y|)2x\sin(x^2 + y^2)\right]dx + \left[\frac{-\cos(x^2 + y^2)}{x - y} - \ln(|x - y|)2y\sin(x^2 + y^2)\right]dy
   $$

2. Soit $f(x, y) = x\cos y + y\exp(x)$ :

   $$
   \begin{aligned}
   \frac{\partial f}{\partial x} &= \cos(y) + ye^x & \frac{\partial^2 f}{\partial y \partial x} &= \frac{\partial}{\partial y}\left(\frac{\partial f}{\partial x}\right) = \frac{\partial}{\partial y}(\cos(y) + ye^x) = -\sin(y) + e^x \\
   \frac{\partial f}{\partial y} &= -x\sin(y) + e^x & \frac{\partial^2 f}{\partial x \partial y} &= \frac{\partial}{\partial x}(-x\sin(y) + e^x) = -\sin(y) + e^x \\
   \frac{\partial^2 f}{\partial x^2} &= \frac{\partial}{\partial x}(\cos(y) + ye^x) = ye^x & \frac{\partial^2 f}{\partial y^2} &= \frac{\partial}{\partial y}(-x\sin(y) + e^x) = -x\cos(y)
   \end{aligned}
   $$

   Soit $f(x, y) = x^2\exp(xy)$ :

   $$
   \begin{aligned}
   \frac{\partial f}{\partial x} &= 2xe^{xy} + x^2ye^{xy} & \frac{\partial^2 f}{\partial y \partial x} &= 2x^2e^{xy} + x^2e^{xy} + x^3ye^{xy} = 3x^2e^{xy} + x^3ye^{xy} \\
   \frac{\partial f}{\partial y} &= x^2xe^{xy} = x^3e^{xy} & \frac{\partial^2 f}{\partial x \partial y} &= 3x^2e^{xy} + x^3ye^{xy} \\
   \frac{\partial^2 f}{\partial y^2} &= x^3xe^{xy} = x^4e^{xy} & \frac{\partial^2 f}{\partial x^2} &= 2e^{xy} + 2xye^{xy} + y2xe^{xy} + yx^2ye^{xy} = 2e^{xy} + 4xye^{xy} + x^2y^2e^{xy}
   \end{aligned}
   $$

## CD3

1. Soit $f(x, y) = \sin(xy)$ :

   $$
   \frac{\partial f}{\partial x} = y\cos xy \qquad \frac{\partial f}{\partial y} = x\cos xy
   $$

2. Changement de variables :

   $$
   \begin{aligned}
   \frac{\partial f}{\partial x} &= \frac{\partial f}{\partial u}\frac{\partial u}{\partial x} + \frac{\partial f}{\partial v}\frac{\partial v}{\partial x} = \left(\frac{\partial f}{\partial u}\right) \times 1 + \left(\frac{\partial f}{\partial v}\right) \times 1 = \frac{\partial f}{\partial u} + \frac{\partial f}{\partial v} \\
   \frac{\partial f}{\partial y} &= \frac{\partial f}{\partial u}\frac{\partial u}{\partial y} + \frac{\partial f}{\partial v}\frac{\partial v}{\partial y} = \left(\frac{\partial f}{\partial u}\right) \times 1 + \left(\frac{\partial f}{\partial v}\right) \times (-1) = \frac{\partial f}{\partial u} - \frac{\partial f}{\partial v}
   \end{aligned}
   $$

3. Exprimons $x$ puis $y$ en fonction de $u$ et $v$ :

   $$
   \begin{cases} u = x + y \\ v = x - y \end{cases}
   \Leftrightarrow \begin{cases} u + v = x + y + x - y \\ u - v = x + y - x + y \end{cases}
   \Leftrightarrow \begin{cases} 2x = u + v \\ 2y = u - v \end{cases}
   \Leftrightarrow \begin{cases} x = \dfrac{u + v}{2} \\ y = \dfrac{u - v}{2} \end{cases}
   $$

   $$
   f(u, v) = \sin\left(\frac{u + v}{2}\frac{u - v}{2}\right) = \sin\left(\frac{u^2 - v^2}{4}\right)
   $$

   $$
   \begin{aligned}
   \frac{\partial f}{\partial x} &= \frac{\partial f}{\partial u} + \frac{\partial f}{\partial v} = \frac{2u}{4}\cos\left(\frac{u^2 - v^2}{4}\right) + \left(\frac{-2v}{4}\cos\left(\frac{u^2 - v^2}{4}\right)\right) = \frac{u - v}{2}\cos\left(\frac{u^2 - v^2}{4}\right) = y\cos xy \\
   \frac{\partial f}{\partial y} &= \frac{\partial f}{\partial u} - \frac{\partial f}{\partial v} = \frac{2u}{4}\cos\left(\frac{u^2 - v^2}{4}\right) - \left(\frac{-2v}{4}\cos\left(\frac{u^2 - v^2}{4}\right)\right) = \frac{u + v}{2}\cos\left(\frac{u^2 - v^2}{4}\right) = x\cos xy
   \end{aligned}
   $$

## CD4

Loi de Snell : $n_1\sin i_1 = n_2\sin i_2 \Leftrightarrow i_2 = \arcsin\left(\dfrac{n_1}{n_2}\sin i_1\right)$.

1. Calcul direct :

   $$
   di_2 = \frac{n_1}{n_2}\frac{\cos i_1}{\sqrt{1 - \left(\dfrac{n_1}{n_2}\sin i_1\right)^2}}di_1 = \frac{n_1}{n_2}\frac{\cos i_1}{\sqrt{(\cos i_2)^2}}di_1 = \frac{n_1\cos i_1}{n_2\cos i_2}di_1
   $$

2. Calcul indirect :

   $$
   \begin{aligned}
   n_1\sin i_1 = n_2\sin i_2 &\Leftrightarrow d(n_1\sin i_1) = d(n_2\sin i_2) \\
   &\Leftrightarrow n_1d(\sin i_1) = n_2d(\sin i_2) \\
   &\Leftrightarrow n_1\cos(i_1)di_1 = n_2\cos(i_2)di_2 \\
   &\Leftrightarrow di_2 = \frac{n_1\cos i_1}{n_2\cos i_2}di_1
   \end{aligned}
   $$

   donc $di_2 \approx 0{,}07712°$ ; or $\Delta i_1 = 0{,}1°$, ce qui induit une variation $\Delta i_2 \approx di_2 \approx 0{,}07712°$.

3. $\sin i_2 = \dfrac{n_1}{n_2}\sin i_1 \Rightarrow i_2 = 37{,}639°$. Valeur exacte de $\Delta i_2$ :

   $$
   n_1\sin(i_1 + \Delta i_1) = n_2\sin(i_2 + \Delta i_2) \Rightarrow \sin(i_2 + \Delta i_2) = \frac{n_1}{n_2}\sin(i_1 + \Delta i_1) \Rightarrow i_2 + \Delta i_2 = 37{,}716° \Rightarrow \Delta i_2 = 0{,}0770°
   $$

## CD5

1. Dérivées partielles de $P$ :

   $$
   \begin{aligned}
   \frac{\partial P}{\partial T} &= \frac{r}{V - b}e^{-\frac{a}{rTV}} + \frac{rT}{V - b}\left(-\frac{a}{rV}\right)\left(-\frac{1}{T^2}\right)e^{-\frac{a}{rTV}} = \frac{r}{V - b}e^{-\frac{a}{rTV}}\left(1 + \frac{a}{rVT}\right) \\
   \frac{\partial P}{\partial V} &= \frac{-rT}{(V - b)^2}e^{-\frac{a}{rTV}} + \frac{rT}{V - b}\left(-\frac{a}{rT}\right)\left(-\frac{1}{V^2}\right)e^{-\frac{a}{rTV}} = \frac{rT}{V - b}e^{-\frac{a}{rTV}}\left(\frac{a}{rTV^2} - \frac{1}{V - b}\right)
   \end{aligned}
   $$

   $$
   dP = \left[\frac{r}{V - b}e^{-\frac{a}{rTV}}\left(1 + \frac{a}{rVT}\right)\right]dT + \left[\frac{rT}{V - b}e^{-\frac{a}{rTV}}\left(\frac{a}{rTV^2} - \frac{1}{V - b}\right)\right]dV
   $$

2. a) Coefficient $\beta$ :

   $$
   \beta = \frac{1}{P}\frac{\partial P}{\partial T} = \frac{V - b}{rT}\frac{1}{e^{-\frac{a}{rTV}}}\frac{r}{V - b}e^{-\frac{a}{rTV}}\left(1 + \frac{a}{rVT}\right) = \frac{1}{T}\left(1 + \frac{a}{rVT}\right)
   $$

   b) On ne connaît pas $\dfrac{\partial V}{\partial T}$ (ni $\dfrac{\partial V}{\partial P}$ pour la question 2c) :

   $$
   dV = \frac{\partial V}{\partial P}dP + \frac{\partial V}{\partial T}dT \quad (1)
   \qquad \text{et} \qquad
   dP = \frac{\partial P}{\partial T}dT + \frac{\partial P}{\partial V}dV \Leftrightarrow \frac{\partial P}{\partial V}dV = dP - \frac{\partial P}{\partial T}dT \Leftrightarrow dV = \frac{1}{(\partial P/\partial V)}dP - \frac{(\partial P/\partial T)}{(\partial P/\partial V)}dT \quad (2)
   $$

   Donc de (1) et (2), il résulte que :

   $$
   \begin{cases} \dfrac{\partial V}{\partial P} = \dfrac{1}{\partial P/\partial V} \\ \dfrac{\partial V}{\partial T} = \dfrac{-\partial P/\partial T}{\partial P/\partial V} \end{cases}
   $$

   Donc

   $$
   \alpha = \frac{1}{V}\frac{\partial V}{\partial T} = -\frac{1}{V}\frac{\dfrac{r}{V - b}e^{-\frac{a}{rTV}}\left(1 + \dfrac{a}{rTV}\right)}{\dfrac{rT}{V - b}e^{-\frac{a}{rTV}}\left(\dfrac{a}{rTV^2} - \dfrac{1}{V - b}\right)} = -\frac{1}{V}\frac{\dfrac{rTV + a}{rTV}}{T\dfrac{a(V - b) - rTV^2}{rTV^2(V - b)}} = -\frac{1}{V}\frac{1}{T}\frac{rTV + a}{rTV}\frac{rTV^2(V - b)}{a(V - b) - rTV^2}
   $$

   $$
   \alpha = -\frac{(rTV + a)(V - b)}{aT(V - b) - rT^2V^2}
   $$

   c) Coefficient $\chi_T$ :

   $$
   \chi_T = -\frac{1}{V}\frac{\partial V}{\partial P} = -\frac{1}{V}\frac{1}{\dfrac{rT}{V - b}e^{-\frac{a}{rTV}}\left(\dfrac{a}{rTV^2} - \dfrac{1}{V - b}\right)} = -\frac{1}{V}\frac{V - b}{rT}e^{\frac{a}{rTV}}\frac{rTV^2(V - b)}{a(V - b) - rTV^2}
   $$

   $$
   \chi_T = -\frac{V(V - b)^2}{a(V - b) - rTV^2}e^{\frac{a}{rTV}}
   $$

## CD8

$$
df = (3y^2 - y^3 - x^2)dx + 3xy(2 - y)dy
\Leftrightarrow
\begin{cases} \dfrac{\partial f}{\partial x} = 3y^2 - y^3 - x^2 & (1) \\ \dfrac{\partial f}{\partial y} = 3xy(2 - y) & (2) \end{cases}
$$

(1) : $f(x, y) = 3xy^2 - xy^3 - \dfrac{x^3}{3} + G(y)$.

$\dfrac{\partial f}{\partial y} = 6xy - 3xy^2 + \dfrac{dG}{dy} = 3xy(2 - y) + \dfrac{dG}{dy}$, donc d'après (2), $\dfrac{dG}{dy} = 0 \Leftrightarrow G(y) = C$.

Or $f(1, 0) = 1$, donc $3 \times 1 \times 0^2 - 1 \times 0^3 - \dfrac{1^3}{3} + C = 1 \Leftrightarrow -\dfrac{1}{3} + C = 1 \Leftrightarrow C = \dfrac{4}{3}$.

Finalement : $f(x, y) = 3xy^2 - xy^3 - \dfrac{x^3}{3} + \dfrac{4}{3}$.

## CD9

$\delta Q = C_VdT + \dfrac{RT}{V}dV = A\,dT + B\,dV$ : $\dfrac{\partial A}{\partial V} = 0$ et $\dfrac{\partial B}{\partial T} = \dfrac{R}{V} \neq \dfrac{\partial A}{\partial V}$, donc NON.

$\dfrac{\delta Q}{T} = \dfrac{C_V}{T}dT + \dfrac{R}{V}dV = A\,dT + B\,dV$ : $\dfrac{\partial A}{\partial V} = 0$ et $\dfrac{\partial B}{\partial T} = 0 = \dfrac{\partial A}{\partial V}$, donc OUI :

$$
\exists f / \frac{\delta Q}{T} = df \Rightarrow \begin{cases} A(T, V) = \dfrac{\partial f}{\partial T} = \dfrac{C_V}{T} & (1) \\ B(T, V) = \dfrac{\partial f}{\partial V} = \dfrac{R}{V} & (2) \end{cases}
$$

(1) : $f(T, V) = C_V\ln(T) + G(V)$. $\dfrac{\partial f}{\partial V} = \dfrac{dG}{dV}$, donc d'après (2), $\dfrac{dG}{dV} = \dfrac{R}{V} \Leftrightarrow G(V) = R\ln(V) + C$.

Finalement : $f(T, V) = C_V\ln(T) + R\ln(V) + C$.

## CD11

$\delta W = F(\sin(\varphi)d\rho + \rho\cos(\varphi)d\varphi) = F\sin(\varphi)d\rho + F\rho\cos(\varphi)d\varphi = A\,d\rho + B\,d\varphi$.

$\dfrac{\partial A}{\partial \varphi} = F\cos\varphi$ et $\dfrac{\partial B}{\partial \rho} = F\cos\varphi = \dfrac{\partial A}{\partial \varphi}$, donc OUI :

$$
\exists f / \delta W = df \Rightarrow \begin{cases} A(\rho, \varphi) = \dfrac{\partial f}{\partial \rho} = F\sin(\varphi) & (1) \\ B(\rho, \varphi) = \dfrac{\partial f}{\partial \varphi} = F\rho\cos(\varphi) & (2) \end{cases}
$$

(1) : $f(\rho, \varphi) = F\rho\sin(\varphi) + G(\varphi)$. $\dfrac{\partial f}{\partial \varphi} = F\rho\cos(\varphi) + \dfrac{dG}{d\varphi}$, donc d'après (2), $\dfrac{dG}{d\varphi} = 0 \Leftrightarrow G(\varphi) = C$.

Finalement : $f(\rho, \varphi) = F\rho\sin(\varphi) + C$. Or $f = -E_p$, donc $E_p(\rho, \varphi) = -F\rho\sin(\varphi) + C'$.

## CD13

1. Résistance équivalente :

   $$
   \frac{1}{R} = \frac{1}{R_1} + \frac{1}{R_2} \Leftrightarrow \frac{1}{R} = \frac{R_1 + R_2}{R_1R_2} \Leftrightarrow R = \frac{R_1R_2}{R_1 + R_2}
   \qquad
   \frac{1}{R} = \frac{1}{2200} + \frac{1}{120} = \frac{29}{3300} \Rightarrow R = \frac{3300}{29}\ \Omega \approx 113{,}7931034\ \Omega
   $$

2. Calcul direct :

   $$
   \Delta R = \left|\frac{\partial R}{\partial R_1}\right|\Delta R_1 + \left|\frac{\partial R}{\partial R_2}\right|\Delta R_2
   \qquad
   \frac{\partial R}{\partial R_1} = \frac{R_2(R_1 + R_2) - R_1R_2}{(R_1 + R_2)^2} = \frac{R_2^2}{(R_1 + R_2)^2}
   \qquad
   \frac{\partial R}{\partial R_2} = \frac{R_1^2}{(R_1 + R_2)^2}
   $$

   $$
   \Rightarrow \Delta R = \frac{R_2^2}{(R_1 + R_2)^2}\Delta R_1 + \frac{R_1^2}{(R_1 + R_2)^2}\Delta R_2
   \qquad
   \Delta R_1 = 2200 \times 0{,}15 = 330\ \Omega \qquad \Delta R_2 = 120 \times 0{,}15 = 18\ \Omega
   $$

   $\Delta R \approx 17{,}06896\ \Omega$. Finalement $\Delta R \leqslant 20\ \Omega$, donc $R = (110 \pm 20)\ \Omega$.

   **Remarque.** Il est acceptable d'écrire $\Delta R = 17\ \Omega$ et $R = (114 \pm 17)\ \Omega$.

   Calcul différentiel (différentielle logarithmique) :

   $$
   \ln R = \ln(R_1R_2) - \ln(R_1 + R_2) = \ln R_1 + \ln R_2 - \ln(R_1 + R_2)
   $$

   $$
   \begin{aligned}
   \text{donc } d(\ln R) = \frac{dR}{R} &= d(\ln R_1) + d(\ln R_2) - d(\ln(R_1 + R_2)) \\
   \frac{dR}{R} &= \frac{dR_1}{R_1} + \frac{dR_2}{R_2} - \frac{d(R_1 + R_2)}{R_1 + R_2} = \frac{dR_1}{R_1} + \frac{dR_2}{R_2} - \frac{dR_1}{R_1 + R_2} - \frac{dR_2}{R_1 + R_2} \\
   \frac{dR}{R} &= \left(\frac{1}{R_1} - \frac{1}{R_1 + R_2}\right)dR_1 + \left(\frac{1}{R_2} - \frac{1}{R_1 + R_2}\right)dR_2 = \frac{R_2}{R_1(R_1 + R_2)}dR_1 + \frac{R_1}{R_2(R_1 + R_2)}dR_2
   \end{aligned}
   $$

   Ainsi $\dfrac{\Delta R}{R} = \dfrac{R_2}{R_1 + R_2}\dfrac{\Delta R_1}{R_1} + \dfrac{R_1}{R_1 + R_2}\dfrac{\Delta R_2}{R_2}$, et $\dfrac{\Delta R_1}{R_1} = \dfrac{\Delta R_2}{R_2} = 0{,}15$. Donc $\dfrac{\Delta R}{R} = 0{,}15$, donc $\Delta R = 17\ \Omega$.

## CD14

1. $f' = \dfrac{n'R}{n' - n} = \dfrac{1{,}53 \times 3{,}00}{1{,}53 - 1{,}00} = 8{,}66037\ cm$. On ne peut pas savoir car on ne connaît pas l'incertitude.
2. Différentielle :

   $$
   df' = \frac{\partial f'}{\partial n'}dn' + \frac{\partial f'}{\partial n}dn + \frac{\partial f'}{\partial R}dR = \left[\frac{R(n' - n) - n'R}{(n' - n)^2}\right]dn' + \left[-\frac{-n'R}{(n' - n)^2}\right]dn + \left[\frac{n'}{n' - n}\right]dR
   $$

   $$
   df' = \frac{-nR}{(n' - n)^2}dn' + \frac{n'R}{(n' - n)^2}dn + \frac{n'}{n' - n}dR
   $$

3. Incertitude :

   $$
   \Delta f' = \left|\frac{-nR}{(n' - n)^2}\right|\Delta n' + \left|\frac{n'R}{(n' - n)^2}\right|\Delta n + \left|\frac{n'}{n' - n}\right|\Delta R
   $$

   Application numérique : $\Delta f' \approx 0{,}463606\ cm \to \Delta f' \leqslant 0{,}5\ cm$. Donc $f' = (8{,}7 \pm 0{,}5)\ cm$.

## CD15

1. $t$ est fixé (ici $t = 12\ s$) ; $Q \approx 4{,}414553.10^{-3}\ C$.

   $$
   \Delta Q = \left|\frac{\partial Q}{\partial C}\right|\Delta C + \left|\frac{\partial Q}{\partial E}\right|\Delta E + \left|\frac{\partial Q}{\partial R}\right|\Delta R
   $$

   $$
   \Delta Q = \left[E\exp\left(\frac{-t}{RC}\right) + CE\left(\frac{-t}{R}\right)\left(\frac{-1}{C^2}\right)\exp\left(\frac{-t}{RC}\right)\right]\Delta C + \left[C\exp\left(\frac{-t}{RC}\right)\right]\Delta E + \left[CE\left(\frac{-t}{C}\right)\left(\frac{-1}{R^2}\right)\exp\left(\frac{-t}{RC}\right)\right]\Delta R
   $$

   $$
   \Delta Q = \left(E + \frac{Et}{RC}\right)\exp\left(\frac{-t}{RC}\right)\Delta C + C\exp\left(\frac{-t}{RC}\right)\Delta E + \left(\frac{Et}{R^2}\right)\exp\left(\frac{-t}{RC}\right)\Delta R \approx 1{,}36115.10^{-3}\ C
   $$

   $\Delta Q \leqslant 2.10^{-3}\ C \to Q = (4 \pm 2).10^{-3}\ C$.

   $$
   \frac{\Delta Q}{Q} = \left(1 + \frac{t}{RC}\right)\frac{\Delta C}{C} + \frac{\Delta E}{E} + \frac{t}{RC}\frac{\Delta R}{R} \approx 0{,}30833 \to \frac{\Delta Q}{Q} \approx 31\ \%
   $$

2. Différentielle logarithmique :

   $$
   \ln(Q) = \ln\left(CE\exp\left(\frac{-t}{RC}\right)\right) = \ln(C) + \ln(E) - \frac{t}{RC}
   $$

   $$
   \begin{aligned}
   d(\ln(Q)) = \frac{dQ}{Q} &= \frac{dC}{C} + \frac{dE}{E} - d\left(\frac{t}{RC}\right) = \frac{dC}{C} + \frac{dE}{E} - t\,d\left(\frac{1}{R}\frac{1}{C}\right) = \frac{dC}{C} + \frac{dE}{E} - t\left[\frac{1}{R}d\left(\frac{1}{C}\right) + \frac{1}{C}d\left(\frac{1}{R}\right)\right] \\
   \frac{dQ}{Q} &= \frac{dC}{C} + \frac{dE}{E} - t\left[\frac{1}{R}\left(\frac{-1}{C^2}dC\right) + \frac{1}{C}\left(\frac{-1}{R^2}dR\right)\right] = \frac{dC}{C} + \frac{dE}{E} + \frac{t}{RC^2}dC + \frac{t}{CR^2}dR \\
   \frac{dQ}{Q} &= \left(1 + \frac{t}{RC}\right)\frac{dC}{C} + \frac{dE}{E} + \frac{t}{RC}\frac{dR}{R}
   \end{aligned}
   $$

   D'où $\dfrac{\Delta Q}{Q} = \left(1 + \dfrac{t}{RC}\right)\dfrac{\Delta C}{C} + \dfrac{\Delta E}{E} + \dfrac{t}{RC}\dfrac{\Delta R}{R}$.

## CD16

**Attention :** convertir les angles en radians (sinon, problème dans la suite). $n \approx 1{,}4979114$.

$$
dn = \frac{\partial n}{\partial A}dA + \frac{\partial n}{\partial D}dD = \frac{\frac{1}{2}\cos\left(\frac{A + D}{2}\right)\sin\left(\frac{A}{2}\right) - \frac{1}{2}\cos\left(\frac{A}{2}\right)\sin\left(\frac{A + D}{2}\right)}{\sin^2\left(\frac{A}{2}\right)}dA + \frac{\frac{1}{2}\cos\left(\frac{A + D}{2}\right)}{\sin\left(\frac{A}{2}\right)}dD
$$

$$
dn = \frac{1}{2}\frac{\sin\left(\frac{A}{2} - \left(\frac{A + D}{2}\right)\right)}{\sin^2\left(\frac{A}{2}\right)}dA + \frac{1}{2}\frac{\cos\left(\frac{A + D}{2}\right)}{\sin\left(\frac{A}{2}\right)}dD = -\frac{\sin\left(\frac{D}{2}\right)}{2\sin^2\left(\frac{A}{2}\right)}dA + \frac{\cos\left(\frac{A + D}{2}\right)}{2\sin\left(\frac{A}{2}\right)}dD
$$

Ainsi, on a :

$$
\Delta n = \left|\frac{-\sin\left(\frac{D}{2}\right)}{2\sin^2\left(\frac{A}{2}\right)}\right|\Delta A + \left|\frac{\cos\left(\frac{A + D}{2}\right)}{2\sin\left(\frac{A}{2}\right)}\right|\Delta D
$$

Donc $\Delta n = 0{,}015 \to \Delta n \leq 0{,}02$, donc $n = (1{,}50 \pm 0{,}02)$.
