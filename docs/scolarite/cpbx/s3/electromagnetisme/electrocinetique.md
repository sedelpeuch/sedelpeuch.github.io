---
title: "Électrocinétique"
description: "Intensité et vecteur densité de courant, première loi de Kirchhoff, loi d'Ohm locale et pour une portion de circuit, puissance électrique et effet Joule."
sidebar_position: 2
---

L'électrocinétique est l'étude des circuits électriques dans lesquels les charges électriques se déplacent et qui sont donc le siège d'un courant électrique.

## Définitions

Quand une différence de potentiel existe entre deux points d'un conducteur, les charges mobiles se déplacent dans ce conducteur (charge ou décharge d'un condensateur). Le conducteur est le siège d'un courant électrique. Quand on maintient constante la différence de potentiel qui est à l'origine du courant, on atteint (très vite) un régime permanent. Dans ce cours, seuls les états permanents sont étudiés.

On caractérise un courant électrique dans un conducteur par son intensité : c'est le rapport de la charge $dq$ (ou quantité d'électricité) qui traverse une section de conducteur pendant le temps $dt$ :

$$
I = \frac{dq}{dt}
$$

- Si le courant est continu, $I = cte$ et l'intensité est égale à la charge qui traverse une section de conducteur par seconde.
- Le sens du courant est fixé par convention du potentiel le plus haut vers le potentiel le plus bas. Si les charges mobiles étaient positives, elles se déplaceraient dans ce sens. Dans les conducteurs métalliques, les charges mobiles sont des électrons, qui se déplacent dans le sens inverse.

En régime permanent, l'intensité en un point du circuit est constante et il ne peut y avoir d'accumulation de charges en aucun point du conducteur, puisque alors les conditions changeraient avec le temps. Cette absence d'accumulation de charge entraîne que l'intensité est la même tout le long d'un conducteur filiforme, même si sa section n'est pas constante.

De plus, à chaque instant, on est presque dans un état correspondant à l'électrostatique et, en particulier, il continue à ne pas y avoir de charges non compensées dans la masse du conducteur (c'est-à-dire que la densité volumique totale de charge est nulle : $\rho = 0$).

Dans ce qui suit, on désigne par $\rho_m$ la densité volumique de charges mobiles en un point $P$ du conducteur.

## Le vecteur densité de courant $\vec{j}$

La densité de courant en un point est un vecteur tel que l'intensité du courant à travers l'élément de surface $\vec{dS}$ autour de ce point est :

$$
dI = \vec{j} \cdot \vec{dS}
$$

On appelle cela le flux de $\vec{j}$ à travers $\vec{dS}$. Soit $\vec{v}$ la vitesse moyenne des charges mobiles. Ces dernières sont individuellement animées de mouvements erratiques de grande vitesse ; la vitesse moyenne, très faible, comme montré ci-dessous, caractérise le déplacement d'ensemble des charges du conducteur.

La charge $dq$ qui traverse l'élément de surface pendant le temps $dt$ est celle contenue dans la colonne de hauteur $v\,dt$ s'appuyant sur $dS$. Le volume de cette colonne est $dV = dS\cos(\alpha)v\,dt = \vec{dS} \cdot \vec{v}\,dt$. On a donc $dq = \rho_m dV = \rho_m \vec{dS} \cdot \vec{v}\,dt$, finalement $dI = \dfrac{dq}{dt} = \rho_m \vec{dS} \cdot \vec{v}$. Comme $dI = \vec{j} \cdot \vec{dS}$, il vient : $\vec{j} = \rho_m \vec{v}$.

Notons que $\vec{j}$ est toujours dirigé dans le même sens que le courant et que son module s'exprime en $A.m^{-2}$.

## Intensité du courant continu et première loi de Kirchhoff

Considérons le flux du vecteur densité de courant à travers une surface fermée $S$ orientée de façon cohérente et limitant un volume $V$. Ce flux représente le bilan algébrique des charges qui traversent $S$ par unité de temps. Dans ce cas, en régime permanent, il n'y a pas d'accumulation de charges, donc ce flux est nécessairement nul :

$$
\iint \vec{j} \cdot \vec{dS} = 0
$$

or (Ostrogradsky)

$$
\iint_S \vec{j} \cdot \vec{dS} = \iiint_V \text{div}(\vec{j})\,dV
$$

Par suite, $\text{div}(\vec{j}) = 0$ pour un courant continu.

**Conducteur filiforme.** Considérons un tronçon filiforme, de section pas nécessairement uniforme, limité par la surface orientée constituée de la surface latérale du tronçon et des surfaces $S_1$ et $S_2$. Ce tronçon est parcouru par un courant continu :

$$
\iiint_V \text{div}(\vec{j})\,dV = 0 = \iint_S \vec{j} \cdot \vec{dS}
$$

Comme aucune charge ne s'échappe de la surface latérale du conducteur, il reste

$$
\iint_{S_1} \vec{j} \cdot \vec{dS} + \iint_{S_2} \vec{j} \cdot \vec{dS} = 0
$$

Les surfaces $S_1$ et $S_2$ sont orientées en sens inverse (flux sortant). Les courants $I_1$ et $I_2$ étant définis par les flux de $\vec{j}$ à travers les surfaces $S_1$ et $S_2$ orientées selon le sens des courants :

$$
I_1 = -\iint_{S_1} \vec{j} \cdot \vec{dS} \quad \text{et} \quad I_2 = +\iint_{S_2} \vec{j} \cdot \vec{dS}
$$

L'intensité est donc la même en tout point du circuit.

**Conducteur ramifié.** Appliquons le même raisonnement que précédemment :

$$
\iint_{S_1} \vec{j} \cdot \vec{dS} + \iint_{S_2} \vec{j} \cdot \vec{dS} + \iint_{S_3} \vec{j} \cdot \vec{dS} = 0 \Leftrightarrow I_2 + I_3 = I_1
$$

Cette relation s'étend à un nœud quelconque d'un circuit ramifié. Soit $I_j$ les intensités dans les branches pour lesquelles le courant est orienté vers le nœud, et $I_k$ les intensités dans les branches pour lesquelles le courant est orienté en sens contraire. On a donc la première loi de Kirchhoff :

$$
\sum_j I_j = \sum_k I_k
$$

## Loi d'Ohm

**Forme locale.** Dans un conducteur parcouru par un courant continu, l'intensité est la même en tout point. Si l'on suppose la section du conducteur constante et la densité de courant $\vec{j}$ constante en tout point d'une section, alors $\vec{j}$ sera constant dans tout le conducteur et, comme $\vec{j} = \rho_m \vec{v}$, $\vec{v}$ sera également constant.

Or les porteurs sont soumis à un champ électrostatique $\vec{E}$ qui, s'il était seul en cause, devrait leur communiquer un mouvement uniformément accéléré ; on fait intervenir une force de frottement proportionnelle à la vitesse : $\vec{F'} = -k\vec{v}$. D'après l'équation fondamentale de la dynamique, on a $q\vec{E} - k\vec{v} = m\vec{a}$. Or en régime permanent, $\vec{a}$ est nul : $q\vec{E} = k\vec{v}$, or $\vec{j} = \rho_m \vec{v}$, d'où $\vec{E} = \dfrac{k}{\rho_m q}\vec{j}$. On pose $\dfrac{k}{\rho_m q} = \dfrac{1}{\sigma} = \rho_r$ ; or $\rho_m$ et $q$ sont du même signe, donc $\sigma$ et $\rho_r$ sont positifs. $\sigma$ est la conductivité du conducteur et $\rho_r$ la résistivité du conducteur. On a

$$
\vec{E} = \rho_r \vec{j} \quad \text{et} \quad \vec{j} = \sigma \vec{E}
$$

**Loi d'Ohm pour une portion du circuit.** Soit un conducteur cylindrique de longueur $l$, de section droite $S$, parcouru par un courant continu d'intensité $I$. Soit $\vec{u}$ le vecteur unitaire dans le sens du courant. Soit $\vec{j} = \dfrac{I}{S}\vec{u}$ et $\vec{E} = \dfrac{\vec{j}}{\sigma} = \dfrac{I}{\sigma S}\vec{u} = E\vec{u}$. Ainsi

$$
V_A - V_B = \int_{AB} \vec{E} \cdot \vec{dl} = \int_{AB} (E\vec{u}) \cdot (dl\,\vec{u}) = \int_{AB} E\,dl = El
$$

et donc $V_A - V_B = \dfrac{I}{\sigma S} l = \dfrac{I\rho_r}{S} l$. On pose $\dfrac{l\rho_r}{S} = R$ ; finalement, on obtient $V_A - V_B = U_{AB} = RI$.

La résistance $R$ s'exprime en ohms, la résistivité en ohms mètres.

## Puissance électrique dans un circuit

**Forme locale.** Si $\vec{E}$ est le champ électrique en un point du circuit, la force qui s'exerce sur la charge $dq$ contenue dans le volume $dV$ est :

$$
d\vec{F} = dq\,\vec{E} = \rho_m dV \vec{E}
$$

Pendant le temps $dt$, le déplacement de $dq$ est $\vec{v}\,dt$ et le travail correspondant du champ est $dW = d\vec{F} \cdot \vec{v}\,dt = \rho_m \vec{v} \cdot \vec{E}\,dt\,dV$ :

$$
\frac{dW}{dt\,dV} = \vec{j} \cdot \vec{E}
$$

$\vec{j} \cdot \vec{E}$ est donc la puissance électrique par unité de volume du circuit, c'est-à-dire la densité de puissance électrique dans le conducteur.

**Dans une portion de circuit.** Soit une portion de circuit parcourue par un courant continu de porteurs qui, à l'instant $t$, sont compris entre les sections $A$ et $B$ et, à $t + dt$, se sont déplacés et sont compris entre $A'$ et $B'$. Pour la portion de circuit comprise entre $A'$ et $B$, il n'y a aucun changement après déplacement. Par suite, le changement entre $t$ et $t + dt$ revient à transporter la charge $dq$, comprise initialement entre $A$ et $A'$, entre $B$ et $B'$. Le travail du champ électrique est donc :

$$
dW = dq(V_A - V_B)
$$

$dq$ est aussi la quantité de charge qui a traversé une section du conducteur (par exemple $B$) pendant $dt$ ; l'intensité dans le circuit est $I = dq/dt$. Donc :

$$
P = RI^2
$$
