---
title: "Systèmes de coordonnées"
description: "Corrections d'exercices sur les systèmes de coordonnées cartésiennes, cylindriques et sphériques : bases locales et leurs dérivées, vecteurs vitesse et accélération, mouvements circulaire et hélicoïdal."
sidebar_position: 3
sidebar_custom_props:
  kind: td
---

## SC1

1. Vecteur position :
   - cartésiennes : $\overrightarrow{OM} = x\vec{e}_x + y\vec{e}_y + z\vec{e}_z$ ;
   - cylindriques : $\overrightarrow{OM} = \rho\vec{e}_\rho + z\vec{e}_z$ ;
   - sphériques : $\overrightarrow{OM} = r\vec{e}_r$.

2. Bases locales :

   $$
   \text{Cylindriques : } (\rho, \varphi, z) \begin{cases} \vec{e}_\rho = \cos\varphi\,\vec{e}_x + \sin\varphi\,\vec{e}_y \\ \vec{e}_\varphi = -\sin\varphi\,\vec{e}_x + \cos\varphi\,\vec{e}_y \\ \vec{e}_z \end{cases}
   \qquad
   \text{Sphériques : } (r, \theta, \varphi) \begin{cases} \vec{e}_r = \sin\theta\cos\varphi\,\vec{e}_x + \sin\theta\sin\varphi\,\vec{e}_y + \cos\theta\,\vec{e}_z \\ \vec{e}_\theta = \cos\theta\cos\varphi\,\vec{e}_x + \cos\theta\sin\varphi\,\vec{e}_y - \sin\theta\,\vec{e}_z \\ \vec{e}_\varphi = -\sin\varphi\,\vec{e}_x + \cos\varphi\,\vec{e}_y \end{cases}
   $$

   Cylindriques :

   - $\dot{\vec{e}}_\rho = \dfrac{d}{dt}(\cos\varphi\,\vec{e}_x + \sin\varphi\,\vec{e}_y) = \dfrac{d}{dt}(\cos\varphi)\vec{e}_x + \dfrac{d}{dt}(\sin\varphi)\vec{e}_y = -\dfrac{d\varphi}{dt}\sin\varphi\,\vec{e}_x + \dfrac{d\varphi}{dt}\cos\varphi\,\vec{e}_y$, soit $\dot{\vec{e}}_\rho = -\dot{\varphi}\sin\varphi\,\vec{e}_x + \dot{\varphi}\cos\varphi\,\vec{e}_y = \dot{\varphi}(-\sin\varphi\,\vec{e}_x + \cos\varphi\,\vec{e}_y)$ et $\dot{\vec{e}}_\rho = \dot{\varphi}\vec{e}_\varphi$ ;
   - $\dot{\vec{e}}_\varphi = \dfrac{d}{dt}(-\sin\varphi\,\vec{e}_x + \cos\varphi\,\vec{e}_y) = -\dot{\varphi}\cos\varphi\,\vec{e}_x - \dot{\varphi}\sin\varphi\,\vec{e}_y = -\dot{\varphi}(\cos\varphi\,\vec{e}_x + \sin\varphi\,\vec{e}_y)$, soit $\dot{\vec{e}}_\varphi = -\dot{\varphi}\vec{e}_\rho$ ;
   - $\dot{\vec{e}}_z = \vec{0}$.

   Sphériques :

   - $\dot{\vec{e}}_r = \dfrac{d\vec{e}_r}{dt} = (\dot{\theta}\cos\theta\cos\varphi - \dot{\varphi}\sin\theta\sin\varphi)\vec{e}_x + (\dot{\theta}\cos\theta\sin\varphi + \dot{\varphi}\sin\theta\cos\varphi)\vec{e}_y - \dot{\theta}\sin\theta\,\vec{e}_z$, soit $\dot{\vec{e}}_r = \dot{\theta}(\cos\theta\cos\varphi\,\vec{e}_x + \cos\theta\sin\varphi\,\vec{e}_y - \sin\theta\,\vec{e}_z) + \dot{\varphi}(-\sin\theta\sin\varphi\,\vec{e}_x + \sin\theta\cos\varphi\,\vec{e}_y)$ et $\dot{\vec{e}}_r = \dot{\theta}\vec{e}_\theta + \dot{\varphi}\sin\theta\,\vec{e}_\varphi$ ;
   - $\dot{\vec{e}}_\theta = \dfrac{d\vec{e}_\theta}{dt} = (-\dot{\theta}\sin\theta\cos\varphi - \dot{\varphi}\cos\theta\sin\varphi)\vec{e}_x + (-\dot{\theta}\sin\theta\sin\varphi + \dot{\varphi}\cos\theta\cos\varphi)\vec{e}_y - \dot{\theta}\cos\theta\,\vec{e}_z$, soit $\dot{\vec{e}}_\theta = -\dot{\theta}(\sin\theta\cos\varphi\,\vec{e}_x + \sin\theta\sin\varphi\,\vec{e}_y + \cos\theta\,\vec{e}_z) + \dot{\varphi}\cos\theta(-\sin\varphi\,\vec{e}_x + \cos\varphi\,\vec{e}_y)$ et $\dot{\vec{e}}_\theta = -\dot{\theta}\vec{e}_r + \dot{\varphi}\cos\theta\,\vec{e}_\varphi$ ;
   - $\dot{\vec{e}}_\varphi = -\dot{\varphi}\cos\varphi\,\vec{e}_x - \dot{\varphi}\sin\varphi\,\vec{e}_y = -\dot{\varphi}(\cos\varphi\,\vec{e}_x + \sin\varphi\,\vec{e}_y)$. On voit que $\sin\theta\,\vec{e}_r + \cos\theta\,\vec{e}_\theta = \cos\varphi\,\vec{e}_x + \sin\varphi\,\vec{e}_y$, donc $\dot{\vec{e}}_\varphi = -\dot{\varphi}(\sin\theta\,\vec{e}_r + \cos\theta\,\vec{e}_\theta)$.

3. Vecteur vitesse $\vec{v} = \dfrac{d\overrightarrow{OM}}{dt}$ :
   - cartésiennes : $\vec{v} = \dot{x}\vec{e}_x + \dot{y}\vec{e}_y + \dot{z}\vec{e}_z$ ;
   - cylindriques : $\vec{v} = \dot{\rho}\vec{e}_\rho + \rho\dot{\vec{e}}_\rho + \dot{z}\vec{e}_z\ (+ z\dot{\vec{e}}_z = \vec{0}) = \dot{\rho}\vec{e}_\rho + \rho\dot{\varphi}\vec{e}_\varphi + \dot{z}\vec{e}_z$ ;
   - sphériques : $\vec{v} = \dot{r}\vec{e}_r + r\dot{\vec{e}}_r = \dot{r}\vec{e}_r + r\dot{\theta}\vec{e}_\theta + r\dot{\varphi}\sin\theta\,\vec{e}_\varphi$.

   Vecteur accélération $\vec{\gamma} = \dfrac{d\vec{v}}{dt}$ :
   - cartésiennes : $\vec{\gamma} = \ddot{x}\vec{e}_x + \ddot{y}\vec{e}_y + \ddot{z}\vec{e}_z$ ;
   - cylindriques :

     $$
     \begin{aligned}
     \vec{\gamma} &= \ddot{\rho}\vec{e}_\rho + \dot{\rho}\dot{\vec{e}}_\rho + \dot{\rho}\dot{\varphi}\vec{e}_\varphi + \rho\ddot{\varphi}\vec{e}_\varphi + \rho\dot{\varphi}\dot{\vec{e}}_\varphi + \ddot{z}\vec{e}_z\ (+ \dot{z}\dot{\vec{e}}_z = 0) \\
     \vec{\gamma} &= \ddot{\rho}\vec{e}_\rho + \dot{\rho}\dot{\varphi}\vec{e}_\varphi + \dot{\rho}\dot{\varphi}\vec{e}_\varphi + \rho\ddot{\varphi}\vec{e}_\varphi - \rho\dot{\varphi}\dot{\varphi}\vec{e}_\rho + \ddot{z}\vec{e}_z \\
     \vec{\gamma} &= (\ddot{\rho} - \rho\dot{\varphi}^2)\vec{e}_\rho + (2\dot{\rho}\dot{\varphi} + \rho\ddot{\varphi})\vec{e}_\varphi + \ddot{z}\vec{e}_z
     \end{aligned}
     $$

   - sphériques :

     $$
     \begin{aligned}
     \vec{\gamma} &= \ddot{r}\vec{e}_r + \dot{r}\dot{\vec{e}}_r + \dot{r}\dot{\theta}\vec{e}_\theta + r\ddot{\theta}\vec{e}_\theta + r\dot{\theta}\dot{\vec{e}}_\theta + \dot{r}\dot{\varphi}\sin\theta\,\vec{e}_\varphi + r\ddot{\varphi}\sin\theta\,\vec{e}_\varphi + r\dot{\varphi}\dot{\theta}\cos\theta\,\vec{e}_\varphi + r\dot{\varphi}\sin\theta\,\dot{\vec{e}}_\varphi \\
     \vec{\gamma} &= \ddot{r}\vec{e}_r + \dot{r}(\dot{\theta}\vec{e}_\theta + \dot{\varphi}\sin\theta\,\vec{e}_\varphi) + \dot{r}\dot{\theta}\vec{e}_\theta + r\ddot{\theta}\vec{e}_\theta + r\dot{\theta}(-\dot{\theta}\vec{e}_r + \dot{\varphi}\cos\theta\,\vec{e}_\varphi) + \dot{r}\dot{\varphi}\sin\theta\,\vec{e}_\varphi \\
     &\quad + r\ddot{\varphi}\sin\theta\,\vec{e}_\varphi + r\dot{\varphi}\dot{\theta}\cos\theta\,\vec{e}_\varphi + r\dot{\varphi}\sin\theta(-\dot{\varphi}\sin\theta\,\vec{e}_r - \dot{\varphi}\cos\theta\,\vec{e}_\theta) \\
     \vec{\gamma} &= (\ddot{r} - r\dot{\theta}^2 - r\dot{\varphi}^2\sin^2\theta)\vec{e}_r + (2\dot{r}\dot{\theta} + r\ddot{\theta} - r\dot{\varphi}^2\sin\theta\cos\theta)\vec{e}_\theta + (2\dot{r}\dot{\varphi}\sin\theta + 2r\dot{\theta}\dot{\varphi}\cos\theta + r\ddot{\varphi}\sin\theta)\vec{e}_\varphi
     \end{aligned}
     $$

4. Mouvement circulaire $\begin{cases} \rho(t) = R \\ \varphi(t) = \omega t \end{cases}$ :

   $$
   \overrightarrow{OM}(t) = \rho\vec{e}_\rho = R\vec{e}_\rho
   \qquad
   \vec{v}(t) = R\dot{\vec{e}}_\rho = R\dot{\varphi}\vec{e}_\varphi \quad \text{or} \quad \dot{\varphi} = \omega
   $$

   donc $\vec{v} = R\omega\vec{e}_\varphi$ : la vitesse est tangentielle à tout moment. $\vec{\gamma}(t) = R\omega\dot{\vec{e}}_\varphi = -R\omega\dot{\varphi}\vec{e}_\rho$, donc $\vec{\gamma}(t) = -R\omega^2\vec{e}_\rho$ : accélération centrale.

## SC2

1. Rayon $\rho$ ; angle polaire $\varphi$ ; distance $z$.
2. $\begin{cases} x = \rho\cos\varphi \\ y = \rho\sin\varphi \\ z \end{cases}$
3. $\vec{e}_u = \dfrac{\partial\overrightarrow{OM}/\partial u}{\|\partial\overrightarrow{OM}/\partial u\|}$, $\begin{cases} \vec{e}_\rho = \cos\varphi\,\vec{e}_x + \sin\varphi\,\vec{e}_y \\ \vec{e}_\varphi = -\sin\varphi\,\vec{e}_x + \cos\varphi\,\vec{e}_y \\ \vec{e}_z \end{cases}$
4. $\overrightarrow{OM} = \rho\vec{e}_\rho + z\vec{e}_z$.
5. $\begin{cases} \rho(t) = R \\ \varphi(t) = \omega t \\ z(t) = \lambda\omega t \end{cases}$, avec $R$, $\omega$, $\lambda$ constantes.

   a) $\vec{v} = \dot{\rho}\vec{e}_\rho + \rho\dot{\vec{e}}_\rho + \dot{z}\vec{e}_z = \vec{O} + \rho\dot{\varphi}\vec{e}_\varphi + \dot{z}\vec{e}_z = R\omega\vec{e}_\varphi + \lambda\omega\vec{e}_z$.

   b) $\vec{\gamma} = \dfrac{d}{dt}(R\omega\vec{e}_\varphi + \lambda\omega\vec{e}_z) = R\omega\dot{\vec{e}}_\varphi = -R\omega\dot{\varphi}\vec{e}_\rho = -R\omega^2\vec{e}_\rho$.

   c) Première méthode : $\tan\alpha = \dfrac{v_z}{v_\varphi} = \dfrac{\lambda\omega}{R\omega} = \dfrac{\lambda}{R} \Rightarrow \alpha = \tan^{-1}\left(\dfrac{\lambda}{R}\right)$.

   Deuxième méthode : $\vec{v}.\vec{e}_\varphi = \|\vec{v}\|\|\vec{e}_\varphi\|\cos(\vec{v}, \vec{e}_\varphi) = \|\vec{v}\|\cos(\vec{v}, \vec{e}_\varphi)$, donc

   $$
   \cos\alpha = \frac{\vec{v}.\vec{e}_\varphi}{\|\vec{v}\|} = \frac{R\omega}{\sqrt{R^2\omega^2 + \lambda^2\omega^2}} = \frac{R}{\sqrt{R^2 + \lambda^2}} = \frac{1}{\sqrt{1 + (\lambda/R)^2}}
   \qquad \text{donc} \qquad
   \alpha = \cos^{-1}\left(\frac{1}{\sqrt{1 + (\lambda/R)^2}}\right)
   $$
