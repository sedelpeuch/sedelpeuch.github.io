---
title: "Devoir maison : approche de Gamow de la radioactivité alpha"
description: "Devoir maison 2019 de physique quantique : coefficient de transmission d'une barrière de potentiel par l'équation de Schrödinger, courants de probabilité, approximation de barrière épaisse et estimation de la période radioactive de l'uranium 238."
sidebar_position: 1
sidebar_custom_props:
  kind: td
---

## Calcul de l'expression du coefficient de transmission

1. (a) Soit l'équation aux valeurs propres ; dans la région 1, on peut remarquer que $V(x) = -V_0$ :

   $$
   -\frac{\hbar^2}{2m}\phi''(x) - V_0\phi(x) = E\phi(x) \qquad (1)
   $$

   (b) Nous pouvons donc réécrire l'équation (1) :

   $$
   \begin{aligned}
   -\frac{\hbar^2}{2m}\phi''(x) - V_0\phi(x) &= E\phi(x) \\
   \frac{\hbar^2}{2m}\phi''(x) + (V_0 + E)\phi(x) &= 0 \\
   \phi''(x) + \delta^2\phi(x) &= 0
   \end{aligned}
   $$

   avec $\boxed{\delta = \dfrac{\sqrt{2m(V_0 + E)}}{\hbar}}$ ; on a bien $\delta$ positif puisque $V_0$ et $E$ sont positifs. Une solution de cette équation est

   $$
   \phi_1(x) = Ae^{i\delta x} + Be^{-i\delta x}
   $$

   (c) Dans cette équation, nous avons $Ae^{i\delta x}$, qui correspond au terme de l'onde incidente, et $Be^{-i\delta x}$, qui correspond au terme de l'onde réfléchie par la barrière en $x = a$. Le signe négatif nous montre que l'onde est à contresens par rapport à l'onde incidente : c'est donc bien l'onde réfléchie.

2. (a) Soit l'équation aux valeurs propres ; dans la région 2, on peut remarquer que $V(x) = V_1$ :

   $$
   -\frac{\hbar^2}{2m}\phi''(x) + V_1\phi(x) = E\phi(x) \qquad (2)
   $$

   (b) Nous pouvons donc réécrire l'équation (2) :

   $$
   \begin{aligned}
   -\frac{\hbar^2}{2m}\phi''(x) + V_1\phi(x) &= E\phi(x) \\
   \frac{\hbar^2}{2m}\phi''(x) + (E - V_1)\phi(x) &= 0 \\
   \phi''(x) - \frac{2m(V_1 - E)}{\hbar^2}\phi(x) &= 0 \\
   \phi''(x) - \rho^2\phi(x) &= 0
   \end{aligned}
   $$

   avec $\boxed{\rho = \dfrac{\sqrt{2m(V_1 - E)}}{\hbar}}$ ; on a bien $\rho$ positif puisque $V_1 > E$. Une solution de cette équation est

   $$
   \phi_2(x) = Ce^{\rho x} + De^{-\rho x}
   $$

3. (a) Soit l'équation aux valeurs propres ; dans la région 3, on peut remarquer que $V(x) = 0$ :

   $$
   -\frac{\hbar^2}{2m}\phi''(x) = E\phi(x) \qquad (3)
   $$

   (b) Nous pouvons donc réécrire l'équation (3) :

   $$
   \begin{aligned}
   -\frac{\hbar^2}{2m}\phi''(x) &= E\phi(x) \\
   \phi''(x) + \frac{2mE}{\hbar^2}\phi(x) &= 0 \\
   \phi''(x) + k^2\phi(x) &= 0
   \end{aligned}
   $$

   avec $\boxed{k = \dfrac{\sqrt{2mE}}{\hbar}}$ ; on a bien $k$ positif puisque $E$ est positif. Une solution de cette équation est

   $$
   \phi_3(x) = Ee^{ikx} + Fe^{-ikx}
   $$

   (c) Dans cette équation, nous avons $Ee^{ikx}$, qui correspond au terme de l'onde transmise après $x = b$, et $Fe^{-ikx}$, qui est nul d'après l'énoncé. En effet, ce terme correspond aux particules qui reviennent après avoir franchi la barrière. On peut donc réécrire l'équation de $\phi_3$ :

   $$
   \phi_3(x) = Ee^{ikx}
   $$

4. (a) Par identification, on a $\phi_I = Ae^{i\delta x}$ et $\phi_T = Ee^{ikx}$. On peut donc calculer le courant incident $J_I$ et le courant transmis $J_T$ grâce à la formule suivante :

   $$
   J(x) = \frac{\hbar}{i2m}\left[\phi^*(x)\frac{\partial\phi(x)}{\partial x} - \phi(x)\frac{\partial\phi^*(x)}{\partial x}\right] \qquad (4)
   $$

   On a donc

   $$
   \begin{aligned}
   J_I &= \frac{\hbar}{i2m}\left[\phi_I^*(x)\frac{\partial\phi_I(x)}{\partial x} - \phi_I(x)\frac{\partial\phi_I^*(x)}{\partial x}\right] \\
   &= \frac{\hbar}{i2m}\left[|A|e^{-i\delta x}i|A|\delta e^{i\delta x} + |A|e^{i\delta x}|A|e^{-i\delta x}\delta i\right] \\
   &= \frac{\hbar}{m}|A|^2\delta
   \end{aligned}
   $$

   D'autre part,

   $$
   \begin{aligned}
   J_T &= \frac{\hbar}{i2m}\left[\phi_T^*(x)\frac{\partial\phi_T(x)}{\partial x} - \phi_T(x)\frac{\partial\phi_T^*(x)}{\partial x}\right] \\
   &= \frac{\hbar}{i2m}\left[|E|e^{-ikx}|E|ike^{ikx} + |E|e^{ikx}|E|ike^{-ikx}\right] \\
   &= \frac{\hbar}{m}|E|^2k
   \end{aligned}
   $$

   On a utilisé que $e^y \times e^{-y} = 1$.

   (b) D'après l'énoncé, on a $T = \dfrac{J_T}{J_I} = \dfrac{\hbar}{m} \dfrac{|E|^2k}{|A|^2\delta} \dfrac{m}{\hbar}$, et donc

   $$
   \boxed{T = \frac{k}{\delta} \frac{|E|^2}{|A|^2}}
   $$

5. (a) En utilisant la continuité de la fonction d'onde et de sa dérivée au point $a$, on a

   $$
   \begin{cases} \phi_1(a) = \phi_2(a) \\ \phi'_1(a) = \phi'_2(a) \end{cases}
   \qquad
   \begin{cases} Ae^{i\delta a} + Be^{-i\delta a} = Ce^{\rho a} + De^{-\rho a} \\ i\delta(Ae^{i\delta a} - Be^{-i\delta a}) = \rho(Ce^{\rho a} - De^{-\rho a}) \end{cases}
   $$

   On cherche à établir une expression de $A$ ; pour ce faire, on procède par combinaison : on effectue $i\delta$ fois la première ligne, que l'on somme à la deuxième. On obtient donc

   $$
   \begin{aligned}
   2i\delta Ae^{i\delta a} &= i\delta(Ce^{\rho a} + De^{-\rho a}) + \rho(Ce^{\rho a} - De^{-\rho a}) \\
   &= Ce^{\rho a}(i\delta + \rho) + De^{-\rho a}(i\delta - \rho) \\
   A &= \frac{1}{2} \frac{e^{-i\delta a}}{i\delta}\left[Ce^{\rho a}(i\delta + \rho) + De^{-\rho a}(i\delta - \rho)\right]
   \end{aligned}
   $$

   (b) En utilisant la continuité de la fonction d'onde et de sa dérivée au point $b$, on a

   $$
   \begin{cases} \phi_2(b) = \phi_3(b) \\ \phi'_2(b) = \phi'_3(b) \end{cases}
   \qquad
   \begin{cases} Ce^{\rho b} + De^{-\rho b} = Ee^{ikb} \\ \rho(Ce^{\rho b} - De^{-\rho b}) = ikEe^{ikb} \end{cases}
   $$

   Nous voulons isoler une expression de $C$ et une expression de $D$. Nous pouvons remarquer que si l'on effectue $\rho$ fois la première ligne sommée avec la deuxième ligne, nous pouvons obtenir une expression de $C$. Si l'on effectue $\rho$ fois la première ligne et que l'on retranche la deuxième, nous pouvons obtenir une expression de $D$. En somme, nous avons :

   - nous cherchons une expression de $C$, $\rho(1) + (2)$ :

     $$
     \begin{aligned}
     \rho Ce^{\rho b} + \rho De^{-\rho b} + \rho(Ce^{\rho b} - De^{-\rho b}) &= \rho Ee^{ikb} + ikEe^{ikb} \\
     2\rho Ce^{\rho b} &= Ee^{ikb}(\rho + ik) \\
     C &= \frac{1}{2\rho e^{\rho b}} Ee^{ikb}(\rho + ik)
     \end{aligned}
     $$

   - nous cherchons une expression de $D$, $\rho(1) - (2)$ :

     $$
     \begin{aligned}
     \rho Ce^{\rho b} + \rho De^{-\rho b} - \rho Ce^{\rho b} + \rho De^{-\rho b} &= \rho Ee^{ikb} - ikEe^{ikb} \\
     2\rho De^{-\rho b} &= Ee^{ikb}(\rho - ik) \\
     D &= \frac{1}{2\rho e^{-\rho b}} Ee^{ikb}(\rho - ik)
     \end{aligned}
     $$

   (c) Récapitulons les différentes expressions que nous avons obtenues :

   $$
   A = \frac{1}{2} \frac{e^{-i\delta a}}{i\delta}\left[Ce^{\rho a}(i\delta + \rho) + De^{-\rho a}(i\delta - \rho)\right]
   $$

   $$
   C = \frac{1}{2\rho e^{\rho b}} Ee^{ikb}(\rho + ik)
   \qquad
   D = \frac{1}{2\rho e^{-\rho b}} Ee^{ikb}(\rho - ik)
   $$

   Il vient naturellement d'injecter les expressions de $C$ et $D$ dans l'expression de $A$ :

   $$
   \begin{aligned}
   A &= \frac{1}{2} \frac{e^{-i\delta a}}{i\delta}\left[\frac{e^{-\rho b}}{2\rho} Ee^{ikb}(\rho + ik)e^{\rho a}(i\delta + \rho) + \frac{e^{\rho b}}{2\rho} Ee^{ikb}(\rho - ik)e^{-\rho a}(i\delta - \rho)\right] \\
   &= \frac{1}{4} \frac{e^{-i\delta a + ikb}E}{i\delta\rho}\left[e^{-\rho(b-a)}(\rho + ik)(i\delta + \rho) + e^{\rho(b-a)}(\rho - ik)(i\delta - \rho)\right]
   \end{aligned}
   $$

   Nous avons une expression de $A$ en fonction de $E$, $k$, $\delta$, $\rho$, $a$ et $b$ ; cependant, au vu de la question suivante, nous devons faire apparaître une expression qui nous permettra de faire apparaître un cosinus et un sinus hyperboliques. Essayons de développer le crochet :

   $$
   \begin{aligned}
   A &= \frac{e^{-i(\delta a - kb)}E}{4i\delta\rho}\left[e^{-\rho(b-a)}(i\delta\rho + \rho^2 - k\delta + ik\rho) + e^{\rho(b-a)}(i\delta\rho - \rho^2 + k\delta + ik\rho)\right] \\
   &= \frac{e^{-i(\delta a - kb)}E}{4i\delta\rho}\left[e^{-\rho(b-a)}((\rho^2 - k\delta) + i(\delta\rho + k\rho)) + e^{\rho(b-a)}(-(\rho^2 - k\delta) + i(\delta\rho + k\rho))\right]
   \end{aligned}
   $$

   L'expression finale de $T$ ne possède pas de $\delta^2$ ni de $\rho$, on doit donc les enlever de $A$ ; on obtient donc

   $$
   A = \frac{e^{-i(\delta a - kb)}E}{4i}\left[e^{-\rho(b-a)}\left(\left(\frac{\rho}{\delta} - \frac{k}{\rho}\right) + i\left(1 + \frac{k}{\delta}\right)\right) + e^{\rho(b-a)}\left(-\left(\frac{\rho}{\delta} - \frac{k}{\rho}\right) + i\left(1 + \frac{k}{\delta}\right)\right)\right]
   $$

   (d) Par la question 4)b), on a $T = \dfrac{k}{\delta} \dfrac{|E|^2}{|A|^2}$ ; on cherche donc une expression de $|A|^2$. Pour ce faire, on pose $\boxed{K = \dfrac{\rho}{\delta} - \dfrac{k}{\rho}}$ et $\boxed{G = 1 + \dfrac{k}{\delta}}$. On a clairement $G$ positif, et $K$ n'est positif que si $\dfrac{\rho}{\delta} > \dfrac{k}{\rho}$ ; en anticipant la partie 2, on a $K = \dfrac{\rho}{\delta} - \dfrac{k}{\rho} = 1{,}512$, donc $K > 0$. On a donc

   $$
   \begin{aligned}
   |A|^2 &= \left|\frac{e^{-i(\delta a - kb)}E}{4i}\right|^2 \left|e^{-\rho(b-a)}(K + iG) + e^{\rho(b-a)}(iG - K)\right|^2 \\
   &= \frac{|E|^2}{16}\left|K(e^{-\rho(b-a)} - e^{\rho(b-a)}) + iG(e^{\rho(b-a)} + e^{-\rho(b-a)})\right|^2 \\
   &= \frac{|E|^2}{4}\left[|K|^2 \Big|\underbrace{\frac{1}{2}(e^{-\rho(b-a)} - e^{\rho(b-a)})}_{(-\sinh(\rho(b-a)))}\Big|^2 + |G|^2 \Big|\underbrace{\frac{1}{2}(e^{\rho(b-a)} + e^{-\rho(b-a)})}_{(\cosh(\rho(b-a)))}\Big|^2\right] \\
   &= \frac{|E|^2}{4}\left(K^2\sinh^2(\rho(b-a)) + G^2\cosh^2(\rho(b-a))\right)
   \end{aligned}
   $$

   On a donc au final

   $$
   \begin{aligned}
   T &= \frac{k}{\delta} \frac{|E|^2}{|A|^2} \\
   &= \frac{k}{\delta} \frac{|E|^2}{\dfrac{|E|^2}{4}} \frac{1}{G^2\cosh^2(\rho(b-a)) + K^2\sinh^2(\rho(b-a))} \\
   &= \frac{4k}{\delta(G^2\cosh^2(\rho(b-a)) + K^2\sinh^2(\rho(b-a)))}
   \end{aligned}
   $$

6. (a) Quand $x \gg 1$, on a $e^{-x} \ll 1$, et donc $\cosh(x) = \dfrac{1}{2}(e^x + e^{-x}) \sim \dfrac{e^x}{2}$ et $\sinh(x) = \dfrac{1}{2}(e^x - e^{-x}) \sim \dfrac{e^x}{2}$.

   (b) Puisque $\rho(b - a) \gg 1$, en injectant l'approximation dans l'équation précédente, on obtient

   $$
   \begin{aligned}
   T &= \frac{4k}{\delta} \frac{1}{G^2\dfrac{e^{2\rho(b-a)}}{4} + K^2\dfrac{e^{2\rho(b-a)}}{4}} \\
   &= \frac{16k}{\delta} \frac{e^{-2\rho(b-a)}}{G^2 + K^2}
   \end{aligned}
   $$

## Estimation de la période radioactive de l'uranium 238

7. On note $m_{par}$ la masse de la particule $\alpha$.

   (a) On a $m_{par} = 4m_{pn} = 6{,}68 \times 10^{-27}\ kg$. Ainsi :

   - $k = \dfrac{\sqrt{2m_{par}E}}{\hbar} = 8{,}985 \times 10^{14}\ m^{-1}$ ; l'analyse dimensionnelle donne $[k] = \dfrac{\sqrt{kg.kg.m^2.s^{-2}}}{kg.m^2.s^{-2}} = m^{-1}$ ;
   - $\delta = \dfrac{\sqrt{2m_{par}(V_0 + E)}}{\hbar} = 1{,}176 \times 10^{15}\ m^{-1}$, l'analyse dimensionnelle est identique ;
   - $\rho = \dfrac{\sqrt{2m(V_1 - E)}}{\hbar} = 2{,}248 \times 10^{15}\ m^{-1}$, l'analyse dimensionnelle est identique.

   (b) On a $G = \left(1 + \dfrac{k}{\delta}\right) = 1{,}764$ sans unité et on a $K = \dfrac{\rho}{\delta} - \dfrac{k}{\rho} = 1{,}512$ sans unité.

   (c) D'après la question 6)b), on a $T = \dfrac{16k\exp(-2\rho(b - a))}{\delta(G^2 + K^2)} = 3{,}151 \times 10^{-39}$ ; l'analyse dimensionnelle donne $[T] = \dfrac{m^{-1}}{m^{-1}}$ = sans unité, ce qui est cohérent puisque nous assimilerons ensuite $T$ à une probabilité, donc sans unité. De plus, on a le droit d'utiliser l'approximation de la question 6)b) puisque $\rho(b - a) = 44{,}7 \gg 1$.

8. (a) L'énergie d'une particule a pour expression $E = T + V$, où $T$ représente l'énergie cinétique et $V$ l'énergie potentielle. Dans le puits, on a $V(x) = -V_0$, on a donc

   $$
   \begin{aligned}
   E &= \frac{1}{2}m_{par}v^2 - V_0 \\
   \frac{1}{2}m_{par}v^2 &= E + V_0 \\
   v^2 &= \frac{2(E + V_0)}{m_{par}} \\
   v &= \sqrt{\frac{2(E + V_0)}{m_{par}}}
   \end{aligned}
   $$

   On peut vérifier l'analyse dimensionnelle $[v] = \sqrt{\dfrac{kg.m^2.s^{-2}}{kg}} = m.s^{-1}$, homogène à une vitesse.

   (b) $v = 1{,}857 \times 10^7\ m.s^{-1}$.

9. (a) Le temps entre deux chocs consécutifs est équivalent au temps que met la particule qui a tapé en $a$ ou $-a$ à parcourir la distance pour taper en $-a$ ou $a$. On a donc $\Delta t = \dfrac{\Delta d}{v} \Rightarrow \tau_0 = \dfrac{2a}{v} = 9{,}155 \times 10^{-22}\ s$. On peut utiliser la physique classique puisque le facteur relativiste vaut $\gamma = \dfrac{1}{\sqrt{1 - \dfrac{v^2}{c^2}}} = 1{,}001$, ce qui est négligeable.

   (b) On cherche le nombre d'essais $N$ de franchissement de la barrière par seconde. Ce nombre d'essais est la durée sur laquelle on regarde (une seconde) divisée par le laps de temps entre deux essais ; on a donc $N = \dfrac{\Delta t}{\tau_0} = \dfrac{1}{\tau_0} = \dfrac{v}{2a}$ essais par seconde.

10. (a) On assimile $T$ à la probabilité de franchissement de la barrière par la particule $\alpha$. On cherche la probabilité $\mathcal{P}$ de franchissement de la barrière par la particule par seconde. Sachant que l'on a le nombre d'essais de franchissement par seconde et la probabilité de franchissement, il vient que $\mathcal{P}$ est le produit entre $N$ et $T$, donc $\mathcal{P} = TN$.

    (b) Il vient aisément $\mathcal{P} = T \times \dfrac{v}{2a}$.

11. (a) On a $\Pi$ la probabilité que la particule ait franchi le mur de potentiel au bout d'une durée $\tau$. De plus, on a $\mathcal{P}$ la probabilité de franchissement de la barrière par la particule par seconde. Ainsi, $\Pi$ est le produit entre $\tau$ et $\mathcal{P}$, donc $\Pi = \tau \times \mathcal{P}$.

    (b) D'après l'énoncé, la période $\tau_{1/2}$ est la durée au bout de laquelle cet élément a une probabilité $\Pi$ égale à $1/2$. On a donc $1/2 = \tau_{1/2} \times \mathcal{P}$, donc $\tau_{1/2} = \dfrac{1}{2\mathcal{P}} = \dfrac{2a}{2vT} = \dfrac{a}{vT}$. L'analyse dimensionnelle donne $[\tau_{1/2}] = \dfrac{m}{m.s^{-1}} = s$, ce qui est homogène à une période.

    (c) $\tau_{1/2} = 1{,}45 \times 10^{17}\ s = 4{,}616 \times 10^9\ ans$. Nous avons donc que l'uranium a 50 % de chances d'être désintégré après 4,616 milliards d'années ; cet élément est donc relativement stable. On comprend donc la nécessité d'utiliser de l'uranium 235 pour les centrales nucléaires (qui a une période de demi-vie de 0,71 milliard d'années). On comprend aussi pourquoi la Terre produit de la chaleur depuis longtemps et pourquoi elle se refroidit lentement : effectivement, la géothermie est produite par désintégration $\alpha$ de l'uranium 238 principalement.
