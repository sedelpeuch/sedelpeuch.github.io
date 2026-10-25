---
title: "Actions et énergie magnétiques"
description: "Force de Lorentz, trajectoire circulaire d'une particule chargée dans un champ magnétique uniforme, force de Laplace sur un circuit et effet Hall pour la mesure du champ magnétique."
sidebar_position: 4
---

## Force magnétique sur une particule chargée

**La force de Lorentz.** La force totale, électrique et magnétique, subie par une particule de charge $q$ et de vitesse $\vec{v}$ mesurée dans un référentiel galiléen est

$$
\vec{F} = q(\vec{E} + \vec{v} \wedge \vec{B})
$$

On appelle cette force la force de Lorentz. On peut la mettre sous la forme

$$
\vec{F} = \vec{F_e} + \vec{F_m} \quad \text{où} \quad \begin{cases} \vec{F_e} = q\vec{E} \\ \vec{F_m} = q\vec{v} \wedge \vec{B} \end{cases}
$$

**Trajectoire d'une particule chargée en présence d'un champ magnétique.** Soit un référentiel considéré comme galiléen. On étudie le système créé par une particule de charge $Q$ et de vitesse initiale $v_0\,\vec{u_x}$. Cette particule est plongée dans un champ magnétique uniforme $\vec{B}$ suivant l'axe $z$. On choisit un repère cartésien centré sur la particule.

La particule est soumise à une force $\vec{F} = Q\vec{v} \wedge \vec{B}$, où $Q\vec{v} \wedge \vec{B}$ est la force de Lorentz. Grâce au principe fondamental de la dynamique :

$$
m\vec{a} = q\vec{v} \wedge \vec{B}
$$

Ainsi $m(\ddot{x}, \ddot{y}, \ddot{z}) = q(\dot{x}, \dot{y}, \dot{z}) \wedge (0, 0, B)$, donc

$$
\begin{cases} \ddot{x} = \dfrac{qB}{m}\dot{y} \\ \ddot{y} = -\dfrac{qB}{m}\dot{x} \\ \ddot{z} = 0 \end{cases}
$$

Pour simplifier les équations différentielles, on note $\omega = \dfrac{qB}{m}$.

D'une part, $\dot{z} = v_{0_z} \Leftrightarrow z = v_{0_z} t$ ; or la vitesse initiale est selon $\vec{u_x}$, donc $z = 0$.

D'autre part,

$$
\begin{cases} \ddot{x} = \omega\dot{y} \\ \ddot{y} = -\omega\dot{x} \end{cases}
$$

Pour résoudre ces équations, il faut les exprimer selon une unique variable : on pose $u = x + iy$, ainsi $\ddot{u} = -i\omega\dot{u}$. On trouve donc $\dot{u} = v_{0_x} e^{-i\omega t}$. Il vient donc

$$
\begin{cases} x = \dfrac{v_{0_x}}{\omega}\sin(\omega t) \\ y = \dfrac{v_{0_x}}{\omega}\left(\cos(\omega t) - 1\right) \end{cases}
$$

L'équation est sous la forme d'une courbe paramétrée du type

$$
\begin{cases} x = \alpha + R\sin\phi \\ y = \beta + R\cos\phi \end{cases}
$$

ce qui correspond à un cercle de rayon $R$. La trajectoire de la particule sera un cercle de rayon $\dfrac{mv_{0_x}}{QB}$ et de centre $\left(0, -\dfrac{mv_{0_x}}{QB}\right)$. On note que, dans le cas d'un proton dans un champ magnétique positif, le cercle est parcouru dans le sens antitrigonométrique.

## Actions magnétiques sur un circuit fermé

**La force de Laplace.** On a vu que la force subie par une particule chargée en mouvement dans un champ magnétique, la force de Lorentz, s'écrit $\vec{F} = q(\vec{E} + \vec{v} \wedge \vec{B})$. Considérons un milieu comportant $\alpha$ espèces différentes de particules chargées, chaque espèce ayant une densité volumique $n_\alpha$ et une vitesse $\vec{v_\alpha}$. Ces divers porteurs de charges sont donc responsables d'une densité locale de courant

$$
\vec{j} = \sum_\alpha n_\alpha q_\alpha \vec{v_\alpha}
$$

Par ailleurs, chaque particule étant soumise à la force de Lorentz, la force s'exerçant sur un élément de volume $dV$ comportant $\sum_\alpha n_\alpha\,dV$ particules s'écrit

$$
d\vec{F} = \sum_\alpha n_\alpha q_\alpha (\vec{E} + \vec{v_\alpha} \wedge \vec{B})\,dV
$$

On voit donc apparaître une force due au champ électrique. Cependant, si le volume élémentaire considéré est suffisamment grand pour qu'il s'y trouve un grand nombre de particules et si le conducteur est électriquement neutre, on doit avoir

$$
\sum_\alpha n_\alpha q_\alpha = 0
$$

On obtient donc

$$
d\vec{F} = \vec{j} \wedge \vec{B}\,dV
$$

Dans le cas d'un circuit filiforme, on obtient

$$
d\vec{F} = I\,\vec{dl} \wedge \vec{B}
$$

## Effet Hall et mesure de champ magnétique

Cet effet a permis la construction de sondes de mesure du champ magnétique.

**Définition.** L'effet Hall montre qu'un fil parcouru par un courant d'intensité $I$ et plongé dans un champ magnétique qui lui est perpendiculaire crée une tension également perpendiculaire au fil.

**Explications.** Considérons une plaque parcourue par un courant d'intensité $I$ et observons le mouvement des électrons.

- Ils sont soumis à la partie magnétique de la force de Lorentz, qui dévie les particules chargées négativement vers un côté, qui se charge négativement ; le côté opposé se charge alors positivement.
- Cette dissymétrie crée un champ électrique, appelé **champ de Hall**, qui agit sur les particules en mouvement via la force de Coulomb, laquelle s'oppose à la force magnétique.
- Pendant le régime transitoire, la force de Lorentz est plus grande que la force de Coulomb due au champ de Hall, et les électrons sont déviés ; le régime permanent est atteint lorsque $q\vec{E_H} + q\vec{v} \wedge \vec{B} = \vec{0}$, et les électrons ne sont plus déviés.
- Ainsi, en régime permanent, il existe un champ de Hall donnant naissance à une tension de Hall :

  $$
  E_H = vB \quad \text{et} \quad U_H = E_H \cdot l
  $$

  avec $l$ la largeur de la plaque conductrice.

**Mesure de champ magnétique.** La tension de Hall dépend donc de $v$, la vitesse des porteurs de charges, et de $B$, l'intensité du champ magnétique. On peut relier $v$ à $I$, l'intensité du courant, par le vecteur densité de courant $\vec{j}$, et montrer que

$$
U_H = R_H \times \frac{IB}{e}
$$

avec $R_H$ une constante qui dépend du nombre de porteurs de charge de la plaque et de leur charge électrique, et $e$ l'épaisseur de cette plaque.

La mesure de la tension de Hall permet de mesurer l'intensité du champ magnétique si on connaît toutes les caractéristiques de la sonde ainsi que l'intensité $I$ qui la parcourt.
