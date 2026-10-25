---
title: "Champs scalaires et vectoriels"
description: "Corrections d'exercices sur les champs scalaires et vectoriels : gradient en coordonnées cartésiennes et sphériques, circulation d'un champ, travail le long de chemins différents, rotationnel, potentiel scalaire et divergence."
sidebar_position: 7
sidebar_custom_props:
  kind: td
---

## CSV1

1. Gradient d'un produit :

   $$
   \begin{aligned}
   \overrightarrow{\text{grad}}(GK) &= \frac{\partial(GK)}{\partial x}\vec{e}_x + \frac{\partial(GK)}{\partial y}\vec{e}_y + \frac{\partial(GK)}{\partial z}\vec{e}_z \\
   &= \left(K\frac{\partial G}{\partial x} + G\frac{\partial K}{\partial x}\right)\vec{e}_x + \left(K\frac{\partial G}{\partial y} + G\frac{\partial K}{\partial y}\right)\vec{e}_y + \left(K\frac{\partial G}{\partial z} + G\frac{\partial K}{\partial z}\right)\vec{e}_z \\
   &= K\left(\frac{\partial G}{\partial x}\vec{e}_x + \frac{\partial G}{\partial y}\vec{e}_y + \frac{\partial G}{\partial z}\vec{e}_z\right) + G\left(\frac{\partial K}{\partial x}\vec{e}_x + \frac{\partial K}{\partial y}\vec{e}_y + \frac{\partial K}{\partial z}\vec{e}_z\right) \\
   \overrightarrow{\text{grad}}(GK) &= K\,\overrightarrow{\text{grad}}(G) + G\,\overrightarrow{\text{grad}}(K)
   \end{aligned}
   $$

2. Coordonnées sphériques $\to \overrightarrow{\text{grad}}(\Phi(r, \theta, \varphi)) = \dfrac{\partial\Phi}{\partial r}\vec{e}_r + \dfrac{1}{r}\dfrac{\partial\Phi}{\partial\theta}\vec{e}_\theta + \dfrac{1}{r\sin\theta}\dfrac{\partial\Phi}{\partial\varphi}\vec{e}_\varphi$ :
   - $\overrightarrow{\text{grad}}(r) = \vec{e}_r = \dfrac{\vec{r}}{r}$ ;
   - $\overrightarrow{\text{grad}}\left(\dfrac{1}{r}\right) = -\dfrac{1}{r^2}\vec{e}_r = -\dfrac{\vec{r}}{r^3}$ ;
   - $\overrightarrow{\text{grad}}(\ln r) = \dfrac{1}{r}\vec{e}_r = \dfrac{\vec{r}}{r^2}$ ;
   - $\overrightarrow{\text{grad}}(r\ln r) = \left(\ln r + r\dfrac{1}{r}\right)\vec{e}_r = \left(\dfrac{\ln(r) + 1}{r}\right)\vec{r}$.

   **Remarque.** $\overrightarrow{\text{grad}}(r\ln r) = \ln(r)\overrightarrow{\text{grad}}(r) + r\,\overrightarrow{\text{grad}}(\ln r) = \ln(r)\dfrac{\vec{r}}{r} + r\dfrac{\vec{r}}{r^2} = \left(\dfrac{\ln r}{r} + \dfrac{1}{r}\right)\vec{r} = \left(\dfrac{\ln(r) + 1}{r}\right)\vec{r}$.

## CSV2

$$
\overrightarrow{\text{grad}}f = \frac{\partial}{\partial x}\left(\frac{z^2}{\sqrt{x^2 + y^2 + z^2}}\right)\vec{e}_x + \frac{\partial}{\partial y}\left(\frac{z^2}{\sqrt{x^2 + y^2 + z^2}}\right)\vec{e}_y + \frac{\partial}{\partial z}\left(\frac{z^2}{\sqrt{x^2 + y^2 + z^2}}\right)\vec{e}_z
$$

- $\dfrac{\partial f}{\partial x} = \dfrac{\partial}{\partial x}\left[z^2(x^2 + y^2 + z^2)^{-1/2}\right] = z^2\left(-\dfrac{1}{2}\right)(2x)(x^2 + y^2 + z^2)^{-3/2} = -xz^2(x^2 + y^2 + z^2)^{-3/2}$ ;
- $\dfrac{\partial f}{\partial y} = -yz^2(x^2 + y^2 + z^2)^{-3/2}$ ;
- $\dfrac{\partial f}{\partial z} = 2z(x^2 + y^2 + z^2)^{-1/2} - zz^2(x^2 + y^2 + z^2)^{-3/2}$.

$$
\begin{aligned}
\overrightarrow{\text{grad}}f &= -xz^2(x^2 + y^2 + z^2)^{-3/2}\vec{e}_x - yz^2(x^2 + y^2 + z^2)^{-3/2}\vec{e}_y + \left[2z(x^2 + y^2 + z^2)^{-1/2} - zz^2(x^2 + y^2 + z^2)^{-3/2}\right]\vec{e}_z \\
\overrightarrow{\text{grad}}f &= 2z(x^2 + y^2 + z^2)^{-1/2}\vec{e}_z - z^2(x^2 + y^2 + z^2)^{-3/2}(x\vec{e}_x + y\vec{e}_y + z\vec{e}_z)
\end{aligned}
$$

Calcul avec $\overrightarrow{\text{grad}}f = \overrightarrow{\text{grad}}(GK)$, $f(M) = \dfrac{z^2}{r}$, $r = \sqrt{x^2 + y^2 + z^2}$ :

$$
\begin{aligned}
\overrightarrow{\text{grad}}\left(\frac{z^2}{r}\right) &= \frac{1}{r}\overrightarrow{\text{grad}}(z^2) + z^2\overrightarrow{\text{grad}}\left(\frac{1}{r}\right) = \frac{1}{r}2z\vec{e}_z + z^2\left(\frac{-1}{r^2}\right)\vec{e}_r = \frac{2z}{r}\vec{e}_z - z^2\frac{\vec{r}}{r^3} \\
&= \frac{2z}{\sqrt{x^2 + y^2 + z^2}}\vec{e}_z - z^2\frac{(x\vec{e}_x + y\vec{e}_y + z\vec{e}_z)}{\left(\sqrt{x^2 + y^2 + z^2}\right)^3} \\
\overrightarrow{\text{grad}}\left(\frac{z^2}{r}\right) &= 2z(x^2 + y^2 + z^2)^{-1/2}\vec{e}_z - z^2(x^2 + y^2 + z^2)^{-3/2}(x\vec{e}_x + y\vec{e}_y + z\vec{e}_z)
\end{aligned}
$$

## CSV4

$C(\vec{B}(M)) = \displaystyle\oint_\Gamma \vec{B}.d\overrightarrow{OM}$.

- Calcul de $\vec{B}.d\overrightarrow{OM} = B_xdx + B_ydy + B_zdz$. Or ici, $d\overrightarrow{OM} = dx\,\vec{e}_x + dy\,\vec{e}_y$, donc $\vec{B}.d\overrightarrow{OM} = B_xdx + B_ydy = (2x - y)dx + (x + y)dy$. Donc $C(\vec{B}) = \displaystyle\oint_\Gamma (2x - y)dx + (x + y)dy$.
- Paramétrage de $\Gamma$ : $M(\Gamma) \begin{cases} x(p) = R\cos p = 3\cos p \\ y(p) = R\sin p = 3\sin p \\ z(p) = 0 \end{cases}$, $p \in [0, 2\pi]$ ; $dx = -3\sin(p)dp$, $dy = 3\cos(p)dp$.
- On injecte dans l'expression :

  $$
  \begin{aligned}
  \Rightarrow (2x - y)dx + (x + y)dy &= (6\cos p - 3\sin p)(-3\sin(p)dp) + (3\cos p + 3\sin p)(3\cos(p)dp) \\
  &= [-18\cos p\sin p + 9\sin^2 p + 9\cos^2 p + 9\cos p\sin p]dp \\
  &= (-9\cos p\sin p + 9)dp \\
  &= 9(1 - \cos p\sin p)dp
  \end{aligned}
  $$

  d'où

  $$
  C(\vec{B}) = \int_0^{2\pi} 9(1 - \cos p\sin p)dp = 9\left[p - \frac{\sin^2 p}{2}\right]_0^{2\pi} = 18\pi
  $$

## CSV5

- $\vec{A}.d\overrightarrow{OM} = 3xy\,dx - 5z\,dy + 10x\,dz$.
- $M(\Gamma) \begin{cases} x(t) = 1 + t^2 \\ y(t) = 2t^2 \\ z(t) = t^3 \end{cases}$, $t \in [0, 1]$ ; $\begin{cases} dx = 2t\,dt \\ dy = 4t\,dt \\ dz = 3t^2dt \end{cases}$
- $3xy\,dx - 5z\,dy + 10x\,dz = (12t^5 + 10t^4 + 12t^3 + 30t^2)dt$.

$$
C(\vec{A}) = \int_\Gamma \vec{A}.d\overrightarrow{OM} = \int_0^1 (12t^5 + 10t^4 + 12t^3 + 30t^2)dt = [2t^6 + 2t^5 + 3t^4 + 10t^3]_0^1 = 17
$$

## CSV6

1. $\vec{F}(M) = xy\,\vec{e}_x - z^2\vec{e}_y - x^2\vec{e}_z$.
   - $W_{OABP}(\vec{F}) = \displaystyle\int_{OABP} \vec{F}.d\overrightarrow{OM} = \int_{OA} \vec{F}.d\overrightarrow{OM} + \int_{AB} \vec{F}.d\overrightarrow{OM} + \int_{BP} \vec{F}.d\overrightarrow{OM}$ :
     - $\displaystyle\int_{OA} \vec{F}.d\overrightarrow{OM}$ $\to$ $d\overrightarrow{OM} = dx\,\vec{e}_x \Rightarrow \vec{F}.d\overrightarrow{OM} = xy\,dx$ ; $M \in [OA] \begin{cases} x \in [0, x_0] \\ y = 0 \\ z = 0 \end{cases} \Rightarrow \displaystyle\int_{OA} \vec{F}.d\overrightarrow{OM} = 0$ ;
     - $\displaystyle\int_{AB} \vec{F}.d\overrightarrow{OM}$ $\to$ $d\overrightarrow{OM} = dy\,\vec{e}_y \Rightarrow \vec{F}.d\overrightarrow{OM} = -z^2dy$ ; $M \in [AB] \begin{cases} x_0 \\ y \in [0, y_0] \\ z = 0 \end{cases} \Rightarrow \displaystyle\int_{AB} \vec{F}.d\overrightarrow{OM} = 0$ ;
     - $\displaystyle\int_{BP} \vec{F}.d\overrightarrow{OM}$ $\to$ $d\overrightarrow{OM} = dz\,\vec{e}_z \Rightarrow \vec{F}.d\overrightarrow{OM} = -x^2dz$ ; $M \in [BP] \begin{cases} x_0 \\ y_0 \\ z \in [0, z_0] \end{cases} \Rightarrow \displaystyle\int_{BP} \vec{F}.d\overrightarrow{OM} = \int_0^{z_0} -x_0^2dz = -x_0^2z_0$ ;

     $\Rightarrow W_{OABP}(\vec{F}) = -x_0^2z_0$.
   - $W_{OCDP}(\vec{F}) = \displaystyle\int_{OC} \vec{F}.d\overrightarrow{OM} + \int_{CD} \vec{F}.d\overrightarrow{OM} + \int_{DP} \vec{F}.d\overrightarrow{OM} = 0 + 0 + \frac{x_0^2y_0}{2} = \frac{x_0^2y_0}{2}$.
   - $W_{OCBP}(\vec{F}) = \displaystyle\int_{OC} \vec{F}.d\overrightarrow{OM} + \int_{CB} \vec{F}.d\overrightarrow{OM} + \int_{BP} \vec{F}.d\overrightarrow{OM} = 0 + \frac{x_0^2y_0}{2} - x_0^2z_0 = \frac{x_0^2y_0}{2} - x_0^2z_0$.

2. $W_{OABP} \neq W_{OCDP} \neq W_{OCBP} \Rightarrow \nexists f(M) / \vec{F} = \overrightarrow{\text{grad}}f \Leftrightarrow \overrightarrow{\text{rot}}(\vec{F})$ n'est pas $= \vec{0}\ \forall (x, y, z)$.

   $$
   \overrightarrow{\text{rot}}(\vec{F}) = 2z\,\vec{e}_x + 2x\,\vec{e}_y - x\,\vec{e}_z \neq \vec{0} \quad \forall (x, y, z)
   $$

## CSV8

$$
\begin{aligned}
\overrightarrow{\text{rot}}\vec{B} = \vec{\nabla} \wedge \vec{B} &= (0 - 0)\vec{e}_x + (0 - 0)\vec{e}_y + [2x(x + y) + x^2 + y^2 - (2y(x - y) - (x^2 + y^2))]\vec{e}_z \\
&= [3x^2 + 2xy + y^2 - 2xy + 3y^2 + x^2]\vec{e}_z \\
&= (4x^2 + 4y^2)\vec{e}_z \neq \vec{0}
\end{aligned}
$$

## CSV9

1. $\overrightarrow{\text{rot}}\vec{C} = \vec{0}\ \forall M \Rightarrow \exists f / \overrightarrow{\text{grad}}f = \vec{C}$.
2. Recherche de $H$ :

   $$
   \overrightarrow{\text{rot}}\vec{C} = \vec{0} \Rightarrow \left(\frac{\partial H}{\partial y} - y\right)\vec{e}_x + \left(2x - \frac{\partial H}{\partial x}\right)\vec{e}_y + (0 - 0)\vec{e}_z
   $$

   $$
   \begin{cases} \dfrac{\partial H}{\partial y} - y = 0 \\ 2x - \dfrac{\partial H}{\partial x} = 0 \end{cases}
   \Rightarrow
   \begin{cases} \dfrac{\partial H}{\partial y} = y & (1) \\ \dfrac{\partial H}{\partial x} = 2x & (2) \end{cases}
   $$

   D'après (1), $H(x, y) = \dfrac{y^2}{2} + g(x) \Rightarrow \dfrac{\partial H}{\partial x} = \dfrac{dg}{dx} = 2x$, d'après (2). Donc $g(x) = x^2 + cte \Rightarrow H(x, y) = \dfrac{y^2}{2} + x^2 + cte$.

   Or $\vec{C}(0) = \vec{0} \Rightarrow cte = 0$. Donc $H(x, y) = \dfrac{y^2}{2} + x^2$.

3. Potentiel :

   $$
   \overrightarrow{\text{grad}}f = \vec{C} \Leftrightarrow \begin{cases} 2xz = \dfrac{\partial f}{\partial x} & (1) \\ yz = \dfrac{\partial f}{\partial y} & (2) \\ \dfrac{y^2}{2} + x^2 = \dfrac{\partial f}{\partial z} & (3) \end{cases}
   $$

   D'après (1), $f(x, y, z) = x^2z + g(y, z) \Rightarrow \dfrac{\partial f}{\partial y} = \dfrac{\partial g}{\partial y} = yz$, d'après (2) $\Rightarrow g(y, z) = \dfrac{y^2}{2}z + h(z)$.

   Donc $f(x, y, z) = x^2z + \dfrac{y^2}{2}z + h(z) \Rightarrow \dfrac{\partial f}{\partial z} = x^2 + \dfrac{y^2}{2} + \dfrac{dh}{dz} = x^2 + \dfrac{y^2}{2}$, d'après (3) $\Rightarrow h(z) = cte$.

   Donc $f(x, y, z) = x^2z + \dfrac{y^2}{2}z + cte$. Or $f(x, y, z) = 0$ dans le plan $xOy$, c'est-à-dire si $z = 0 \Rightarrow cte = 0$. Donc $f(x, y, z) = \left(x^2 + \dfrac{y^2}{2}\right)z$.

## CSV11

1. $\text{div}\,\vec{A} = \dfrac{\partial A_x}{\partial x} + \dfrac{\partial A_y}{\partial y} = 1 + 1 = 2$ ; $\overrightarrow{\text{rot}}\vec{A} = (0 - 0)\vec{e}_z = \vec{0}$.
2. $\text{div}\,\vec{B} = \dfrac{\partial(-y)}{\partial x} + \dfrac{\partial x}{\partial y} = 0$ ; $\overrightarrow{\text{rot}}\vec{B} = 2\vec{e}_z$.

## CSV12

1. $\text{div}\,\vec{r} = \dfrac{\partial x}{\partial x} + \dfrac{\partial y}{\partial y} + \dfrac{\partial z}{\partial z} = 3$.

   $\text{div}\,\vec{u} = \text{div}(\vec{e}_r) = \text{div}\left(\dfrac{\vec{r}}{r}\right)$ avec

   $$
   \frac{\vec{r}}{r} = \frac{x}{\sqrt{x^2 + y^2 + z^2}}\vec{e}_x + \frac{y}{\sqrt{x^2 + y^2 + z^2}}\vec{e}_y + \frac{z}{\sqrt{x^2 + y^2 + z^2}}\vec{e}_z = x(x^2 + y^2 + z^2)^{-1/2}\vec{e}_x + y(\dots)\vec{e}_y + z(\dots)\vec{e}_z
   $$

   Méthode directe :

   $$
   \begin{aligned}
   \text{div}\left(\frac{\vec{r}}{r}\right) &= (x^2 + y^2 + z^2)^{-1/2} + x\left(-\frac{1}{2}\right)(2x)(x^2 + y^2 + z^2)^{-3/2} + (\dots) \text{ en } y + (\dots) \text{ en } z \\
   &= (\dots)^{-1/2} - x^2(\dots)^{-3/2} + (\dots)^{-1/2} - y^2(\dots)^{-3/2} + (\dots)^{-1/2} - z^2(\dots)^{-3/2} \\
   &= \frac{3}{\sqrt{x^2 + y^2 + z^2}} - \frac{x^2 + y^2 + z^2}{(x^2 + y^2 + z^2)^{3/2}} = \frac{3}{\sqrt{x^2 + y^2 + z^2}} - \frac{1}{\sqrt{x^2 + y^2 + z^2}} \\
   &= \frac{2}{\sqrt{x^2 + y^2 + z^2}}
   \end{aligned}
   $$

   Méthode avec la relation du CSV10, $\text{div}(G\vec{A}) = \vec{A}.\overrightarrow{\text{grad}}\,G + G\,\text{div}\,\vec{A}$ :

   $$
   \text{div}\left(\frac{\vec{r}}{r}\right) = \vec{r}.\overrightarrow{\text{grad}}\frac{1}{r} + \frac{1}{r}\text{div}\,\vec{r} = \vec{r}.\left[\frac{\partial}{\partial r}\left(\frac{1}{r}\right)\vec{e}_r\right] + \frac{1}{r}3 = -\frac{1}{r^2}\vec{e}_r.\vec{r} + \frac{3}{r} = -\frac{1}{r^2}\frac{\vec{r}}{r}.\vec{r} + \frac{3}{r} = \frac{3}{r} - \frac{1}{r}
   $$

   $$
   \text{div}\left(\frac{\vec{r}}{r}\right) = \frac{2}{r} = \frac{2}{\sqrt{x^2 + y^2 + z^2}}
   $$
