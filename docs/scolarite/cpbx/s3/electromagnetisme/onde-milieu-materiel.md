---
title: "Onde électromagnétique dans un milieu matériel"
description: "Propagation dans un plasma (pulsation plasma, relation de dispersion, indice, vitesses de phase et de groupe, aspect énergétique) et dans un conducteur (modèle de Drude, conductivité complexe, effet de peau)."
sidebar_position: 8
---

## Propagation d'une onde électromagnétique dans un plasma

Un plasma est un milieu ionisé, constitué d'ions positifs de charge $+e$ et de masse $M$, et d'électrons de charge $-e$ et de masse $m$. Le plasma est supposé peu dense, de telle sorte que les interactions entre les charges sont négligeables. Le milieu est neutre : il y a $n_0$ ions et $n_0$ électrons par unité de volume. On considère la propagation d'une onde électromagnétique progressive plane, transverse et monochromatique, qui se propage dans la direction $Oz$ :

$$
\underline{\vec{E}} = \vec{E}_0 e^{i(\omega t - kz)} \quad \text{et} \quad \vec{E}_0 \perp (Oz)
$$

$$
\underline{\vec{B}}(r, t) = \frac{k}{\omega}(\vec{u}_z \wedge \vec{E}_0)e^{i(\omega t - kz)}
$$

Sous l'action du champ électromagnétique, les particules chargées vont se mettre en mouvement ; les ions étant beaucoup plus lourds que les électrons, on peut les supposer fixes et ne considérer que le mouvement des électrons. En appliquant le principe fondamental de la dynamique aux électrons, on a

$$
m\frac{d^2\vec{r}}{dt^2} = -e\vec{E} - e\frac{d\vec{r}}{dt} \wedge \vec{B}
$$

Cette équation se simplifie car les électrons ne sont pas relativistes. Ainsi, l'action de $\vec{B}$ est négligeable devant celle de $\vec{E}$, et le champ $\vec{E}$ apparaît comme uniforme à l'échelle du déplacement des électrons. En effet, $\|\vec{F}_m\| \equiv evB$ ; or $\|\vec{B}\| = \dfrac{kE}{\omega} = \dfrac{E}{v_\phi}$, on a $v_\phi \equiv c \Rightarrow \dfrac{\|\vec{F}_m\|}{\|\vec{F}_e\|} \equiv \dfrac{v}{c} \ll 1$, et l'amplitude $a$ du mouvement d'un électron est telle que :

$$
\frac{a}{\lambda} \equiv \frac{v}{\omega\lambda} \equiv \frac{kv}{\omega} = \frac{v}{v_\phi} \equiv \frac{v}{c} \ll 1
$$

Le terme $(kz)$ peut être considéré comme constant et inclus dans la phase de $\vec{E}$ ; l'équation devient

$$
m\frac{d^2\vec{r}}{dt^2} = -e\vec{E}_0 e^{i\omega t} \Rightarrow \underline{\vec{v}} = i\frac{e}{m\omega}\underline{\vec{E}} \Rightarrow \underline{\vec{j}} = \rho_{el}\underline{\vec{v}}_{el} = -n_0 e\underline{\vec{v}}_{el} = -i\frac{n_0 e^2}{m\omega}\underline{\vec{E}}
$$

Posons $\omega_p = \sqrt{\dfrac{n_0 e^2}{m\epsilon_0}} \Rightarrow \underline{\vec{j}} = -i\epsilon_0\dfrac{\omega_p^2}{\omega}\underline{\vec{E}}$.

**Remarque.** L'équation pour les électrons se réécrit $m\dfrac{d^2\vec{r}}{dt^2} = -e\underline{\vec{E}} \Rightarrow \underline{\vec{v}}_e = i\dfrac{e}{m\omega}\underline{\vec{E}}$.

L'équation pour les ions se réécrit $M\dfrac{d^2\vec{r}}{dt^2} = e\underline{\vec{E}} \Rightarrow \underline{\vec{v}}_i = -i\dfrac{e}{M\omega}\underline{\vec{E}}$.

Comme $\vec{j} = -n_0 e\underline{\vec{v}}_e + n_0 e\underline{\vec{v}}_i = -\dfrac{in_0 e^2}{\omega}\left(\dfrac{1}{m} + \dfrac{1}{M}\right)\underline{\vec{E}}$, et comme $M \gg m$ :

$$
\underline{\vec{j}} \equiv \frac{-in_0 e^2\underline{\vec{E}}}{m\omega}
$$

### Relation de dispersion

On note les équations de Maxwell ; ici $\rho = 0$, car $\rho = -n_0 e + n_0 e = 0 \Rightarrow \text{div}(\vec{E}) = 0$, $\text{div}\,\vec{B} = 0$, $\overrightarrow{\text{rot}}\,\vec{E} = -\dfrac{\partial \vec{B}}{\partial t} \Leftrightarrow \overrightarrow{\text{rot}}\,\vec{B} = \mu_0\vec{j} + \mu_0\epsilon_0\dfrac{\partial \vec{E}}{\partial t} = \left(-i\epsilon_0\mu_0\dfrac{\omega_p^2}{\omega} + i\omega\mu_0\epsilon_0\right)\vec{E}$, donc

$$
\overrightarrow{\text{rot}}(\vec{B}) = i\omega\mu_0\epsilon_0\left(1 - \frac{\omega_p^2}{\omega^2}\right)\vec{E} = i\frac{\omega}{c^2}\left(1 - \frac{\omega_p^2}{\omega^2}\right)\vec{E}
$$

$$
\overrightarrow{\text{rot}}\,\overrightarrow{\text{rot}}\,\vec{E} = -\frac{\partial}{\partial t}(\overrightarrow{\text{rot}}(\vec{B})) = -i\frac{\omega}{c^2}\left(1 - \frac{\omega_p^2}{\omega^2}\right)\frac{\partial \vec{E}}{\partial t} = \overrightarrow{\text{grad}}\,\text{div}(\vec{E}) - \Delta\vec{E}
$$

$$
\Delta\vec{E} = i\frac{\omega}{c^2}\left(1 - \frac{\omega_p^2}{\omega^2}\right)i\omega\vec{E} = -\frac{\omega^2}{c^2}\left(1 - \frac{\omega_p^2}{\omega^2}\right)\vec{E}
$$

**Remarque.** $\Delta\vec{E} = -k^2\vec{E}$ ; la relation de dispersion est $-k^2 = -\dfrac{\omega^2}{c^2}\left(1 - \dfrac{\omega_p^2}{\omega^2}\right)$.

$$
k^2 = \frac{\omega^2}{c^2}\left(1 - \frac{\omega_p^2}{\omega^2}\right) = \frac{1}{c^2}(\omega^2 - \omega_p^2)
$$

**Indice complexe.**

$$
k = \frac{n\omega}{c} \Rightarrow n^2 = 1 - \frac{\omega_p^2}{\omega^2}
$$

### Étude et interprétation de la relation de dispersion

**$\omega > \omega_p$.** $k$ est réel et on choisit $k > 0$, car on étudie la propagation d'une onde dans le sens des $z$ croissants :

$$
k = \frac{\sqrt{\omega^2 - \omega_p^2}}{c} \quad \text{et} \quad n = \sqrt{1 - \frac{\omega_p^2}{\omega^2}}
$$

Le milieu est dispersif. De plus, $\vec{j}$ et $\vec{E}$ sont en quadrature, donc la puissance moyenne cédée par le champ aux porteurs de charges est nulle. Le champ ne perd pas d'énergie au cours de sa propagation : le milieu n'est pas absorbant, il est transparent. Ses vitesses de phase et de groupe sont

$$
\begin{cases}
v_\phi = \dfrac{\omega}{k} = \dfrac{c}{\sqrt{1 - \dfrac{\omega_p^2}{\omega^2}}} \\[3ex]
v_g = \dfrac{d\omega}{dk} = \dfrac{c^2}{v_\phi} = c\sqrt{1 - \dfrac{\omega_p^2}{\omega^2}}
\end{cases}
$$

d'où $v_\phi v_g = c^2$. La vitesse de phase est supérieure à $c$, ce qui n'est pas gênant, car elle ne représente pas la propagation d'une grandeur matérielle. En revanche, la vitesse de groupe est nécessairement inférieure à $c$, car elle représente la vitesse de propagation de l'information dans un milieu transparent.

**$\omega < \omega_p$.** Le vecteur d'onde est imaginaire pur, de la forme $k = \pm ik''$ avec $k'' = \dfrac{1}{c}\sqrt{\omega_p^2 - \omega^2}$. Ainsi l'onde ne se propage pas : elle est de la forme $\vec{E} = \vec{E}_0 e^{-k''z}e^{i\omega t}$ ; c'est une onde stationnaire dont l'amplitude décroît au fur et à mesure que l'on pénètre dans le milieu. La distance caractéristique d'atténuation est $\delta = \dfrac{1}{k''}$ ; l'indice est un imaginaire pur, $n = -in''$ avec $n'' = \sqrt{\dfrac{\omega_p^2}{\omega^2} - 1}$.

**Conclusion.** Pour qu'une onde se propage dans un plasma, il faut que sa fréquence soit supérieure à la pulsation plasma $\omega_p$ ; celle-ci apparaît donc comme une pulsation de coupure.

### Aspect énergétique

Supposons que

$$
\begin{cases}
\vec{E} = E_0 e^{i(\omega t - kz)}\vec{e}_x \\
\vec{B} = \dfrac{k}{\omega}E_0 e^{i(\omega t - kz)}\vec{e}_y
\end{cases}
$$

**$\omega > \omega_p$.** On écrit le vecteur de Poynting :

$$
\langle \vec{\pi} \rangle = \left\langle \frac{\vec{E} \wedge \vec{B}}{\mu_0} \right\rangle = \frac{E_0^2}{2\mu_0}\frac{k}{\omega}\vec{e}_z
$$

$$
\langle u_{em} \rangle = \left\langle \frac{\epsilon_0 E^2}{2} + \frac{B^2}{2\mu_0} \right\rangle = \frac{\epsilon_0 E_0^2}{4}\left(1 + \frac{k^2c^2}{\omega^2}\right)
$$

$$
\langle u_e \rangle = n_0\left\langle \frac{1}{2}mv^2 \right\rangle \quad \text{et} \quad \underline{\vec{v}} = i\frac{e}{m\omega}\underline{\vec{E}}
$$

$$
\langle u_e \rangle = \frac{n_0 e^2}{4m\omega^2}E_0^2 = \frac{\epsilon_0 E_0^2}{4}\frac{\omega_p^2}{\omega^2}
$$

$$
\langle u_{tot} \rangle = \langle u_e \rangle + \langle u_{em} \rangle = \frac{\epsilon_0 E_0^2}{2}
$$

La vitesse de propagation de l'énergie $v_e$ vérifie

$$
\langle \vec{\pi} \rangle = \langle u \rangle v_e \quad \text{d'où} \quad v_e = c^2\frac{k}{\omega} = \frac{c^2}{v_\phi} = v_g
$$

**$\omega < \omega_p$.** $k = -ik'' \Rightarrow \vec{E} = E_0 e^{-k''z}e^{i\omega t}\vec{e}_x$ et $\vec{B} = -i\dfrac{k''}{\omega}E_0 e^{-k''z}e^{i\omega t}\vec{e}_y$. Ainsi $\langle \vec{\pi} \rangle = \vec{0}$ : l'onde ne transmet pas d'énergie au plasma, toute l'énergie de l'onde est réfléchie. Le plasma se comporte comme un miroir.

## Propagation d'une onde dans un conducteur

Pour décrire le comportement électrique d'un conducteur métallique, on adopte le modèle de Drude : un électron est libre et soumis à la force qu'exerce le champ électromagnétique et à la force de frottement visqueux qui traduit globalement l'effet des collisions à l'intérieur du milieu, $\vec{f} = -\dfrac{m}{\tau}\vec{v}$, où $\tau$ est une constante positive, de l'ordre de grandeur de $10^{-14}\,s$ dans un bon conducteur comme le cuivre.

**Remarque.** La vitesse $\vec{v}$ considérée ici est en fait la vitesse moyenne des électrons d'un volume $d\tau$ entourant l'électron considéré, et non la vitesse totale d'un électron, composée de la vitesse d'agitation thermique et de la vitesse due à la présence d'un champ électrique.

En appliquant le principe fondamental de la dynamique, on a

$$
m\frac{d^2\vec{r}}{dt^2} = -\frac{m}{\tau}\frac{d\vec{r}}{dt} - e\vec{E} - e\frac{d\vec{r}}{dt} \wedge \vec{B}
$$

Comme pour le plasma, les électrons ne sont pas relativistes : l'action de $\vec{B}$ est négligeable devant celle du champ $\vec{E}$. Le champ $\vec{E}$ est uniforme à l'échelle du déplacement des électrons.

$$
m\frac{d^2\vec{r}}{dt^2} = -\frac{m}{\tau}\frac{d\vec{r}}{dt} - e\vec{E}_0 e^{i\omega t}
$$

En cherchant $\vec{v}$ en régime forcé sous forme d'une OPPH (onde plane progressive harmonique) :

$$
\vec{v} = \vec{v}_0 e^{i(\omega t - \vec{k} \cdot \vec{r})} \Rightarrow \left(im\omega + \frac{m}{\tau}\right)\vec{v} = -e\vec{E}
\Rightarrow \vec{v} = \frac{-e}{\dfrac{m}{\tau} + im\omega}\vec{E} = \frac{-\dfrac{e\tau}{m}}{1 + i\tau\omega}\vec{E}
$$

or $\vec{j} = -n_0 e\vec{v}$ :

$$
\vec{j} = \frac{\dfrac{n_0 e^2\tau}{m}}{1 + i\tau\omega}\vec{E} = \frac{\gamma_0}{1 + i\tau\omega}\vec{E}
$$

On définit la conductivité complexe $\gamma$ par $\vec{j} = \gamma\vec{E}$, avec

$$
\gamma = \frac{\gamma_0}{1 + i\tau\omega}
$$

et $\gamma_0 = \dfrac{n_0 e^2\tau}{m}$ la conductivité statique.

**Remarque.**

1. Si $\omega\tau \ll 1$, c'est-à-dire $\omega \ll \dfrac{1}{\tau} \sim 10^{14}\,rad.s^{-1}$, alors $\gamma = \gamma_0$ et la loi d'Ohm est valable : $\vec{j} = \gamma_0\vec{E}$.
2. $\gamma$ est complexe, ce qui traduit un déphasage entre $\vec{j}$ et $\vec{E}$ (quand $\vec{E}$ varie trop vite, les électrons n'ont pas le temps de suivre instantanément les variations de $\vec{E}$ et réagissent avec un certain retard, qui se traduit par un déphasage entre la vitesse et $\vec{E}$, donc entre $\vec{j}$ et $\vec{E}$).
3. À haute fréquence, $\omega\tau \gg 1$, alors $\gamma \sim -i\dfrac{\gamma_0}{\tau\omega}$, donc $\vec{j}$ et $\vec{E}$ sont en quadrature, et la puissance volumique moyenne dissipée par effet Joule est $\langle \vec{j} \cdot \vec{E} \rangle = 0$.

### Équations de Maxwell

On a $\text{div}(\vec{E}) = \dfrac{\rho}{\epsilon_0}$, $\text{div}(\vec{j}) + \dfrac{\partial \rho}{\partial t} = 0$ et $\vec{j} = \gamma\vec{E}$, donc

$$
\begin{aligned}
&\frac{\partial \rho}{\partial t} + \frac{\gamma}{\epsilon_0}\rho = 0 \\
&\Rightarrow \left(i\omega + \frac{\gamma}{\epsilon_0}\right)\rho = 0 \\
&\Rightarrow \rho = 0
\end{aligned}
$$

De plus, les équations de Maxwell donnent $\text{div}(\vec{E}) = 0$, $\text{div}(\vec{B}) = 0$, $\overrightarrow{\text{rot}}\,\vec{E} = -\dfrac{\partial \vec{B}}{\partial t}$ et $\overrightarrow{\text{rot}}\,\vec{B} = \mu_0\gamma\vec{E} + \epsilon_0\mu_0\dfrac{\partial \vec{E}}{\partial t}$. Donc

$$
\overrightarrow{\text{rot}}\,\vec{B} = \mu_0(\gamma + i\omega\epsilon_0)\vec{E} = \mu_0\epsilon_0\left(1 + \frac{\gamma}{i\omega\epsilon_0}\right)\frac{\partial \vec{E}}{\partial t}
$$

Donc les équations de Maxwell dans le conducteur prennent la même forme que dans le vide, à condition de remplacer $\epsilon_0$ par $\epsilon_0\left(1 + \dfrac{\gamma}{i\omega\epsilon_0}\right)$. L'équation de dispersion s'écrit alors

$$
k^2 = \epsilon_0\mu_0\omega^2\left(1 + \frac{\gamma}{i\omega\epsilon_0}\right) = \frac{\omega^2}{c^2}\left(1 + \frac{\gamma}{i\omega\epsilon_0}\right) = \frac{\omega^2}{c^2} - i\frac{\mu_0\gamma_0\omega}{1 + i\tau\omega}
$$

### Effet de peau

**Relation de dispersion.** Plaçons-nous dans le cas des "basses fréquences", c'est-à-dire $\omega \ll \dfrac{1}{\tau}$ :

$$
\begin{aligned}
&\Rightarrow \frac{\omega^2/c^2}{\mu_0\gamma_0\omega} = \frac{\omega}{\mu_0\gamma_0 c^2} \ll 1 \\
&\Rightarrow k^2 = -i\mu_0\gamma_0\omega \Leftrightarrow k = \pm\frac{1 - i}{\delta} \quad \text{avec} \quad \delta = \sqrt{\frac{2}{\mu_0\gamma_0\omega}}
\end{aligned}
$$

**Vitesse de phase et vitesse de groupe.**

$$
k = \pm\frac{1 - i}{\delta} = k'(\omega) + ik''(\omega)
$$

donc

$$
k'(\omega) = \pm\frac{1}{\delta} = \pm\sqrt{\frac{\mu_0\gamma_0\omega}{2}} = -k''(\omega)
$$

Pour simplifier les notations, on choisit $k' > 0$, ainsi

$$
\begin{cases}
v_\phi = \dfrac{\omega}{k'} = \omega\delta = \sqrt{\dfrac{2\omega}{\mu_0\gamma_0}} \\[3ex]
v_g = \dfrac{d\omega}{dk'} = 2\sqrt{\dfrac{2\omega}{\mu_0\gamma_0}}
\end{cases}
$$

Le milieu est dispersif. Un paquet d'ondes s'y propage en se déformant ; $k'' \neq 0$, donc le milieu est absorbant : au fur et à mesure de sa propagation, l'onde cède de l'énergie aux porteurs de charges.

**Champ magnétique.** Si l'on considère une OPPH se propageant dans le sens des $z$ croissants et polarisée rectilignement selon $Ox$ :

$$
\vec{E} = E_0\exp\left(-\frac{z}{\delta}\right)\exp\left(i\left(\omega t - \frac{z}{\delta}\right)\right)\vec{e}_x
$$

Ainsi

$$
\vec{B} = \frac{\vec{k} \wedge \vec{E}}{\omega} = \frac{k}{\omega}E_0 e^{-\frac{z}{\delta}}e^{i\left(\omega t - \frac{z}{\delta}\right)}\vec{e}_y = \frac{1 - i}{\omega\delta}E_0 e^{-\frac{z}{\delta}}e^{i\left(\omega t - \frac{z}{\delta}\right)}\vec{e}_y
$$

En réel, $\vec{E} = E_0 e^{-\frac{z}{\delta}}\cos\left(\omega t - \dfrac{z}{\delta}\right)\vec{e}_x$ et $\vec{B} = \dfrac{E_0}{\omega\delta}e^{-\frac{z}{\delta}}\left(\cos\left(\omega t - \dfrac{z}{\delta}\right) + \sin\left(\omega t - \dfrac{z}{\delta}\right)\right)\vec{e}_y$ :

$$
\vec{B} = \frac{E_0}{\omega\delta}e^{-\frac{z}{\delta}}\sqrt{2}\cos\left(\omega t - \frac{z}{\delta} - \frac{\pi}{4}\right)\vec{u}_y
$$

**Puissance moyenne.**

$$
\langle \vec{\pi} \rangle = \left\langle \frac{\vec{E} \wedge \vec{B}}{\mu_0} \right\rangle = \frac{E_0^2}{2\mu_0\omega\delta}e^{-\frac{2z}{\delta}}\vec{e}_z
$$
