---
title: "Dynamique du point"
description: "Quantité de mouvement, référentiels galiléens, forces usuelles, principe fondamental de la dynamique, théorème du moment cinétique et loi de l'action et de la réaction."
sidebar_position: 1
---

## Masse, quantité de mouvement et force

### Masse et quantité de mouvement

Pour un point matériel de masse $m$ et de vitesse $\vec{v}$, on définit le vecteur quantité de mouvement : $\vec{p} = m\vec{v}$.

Tout comme la vitesse, ce vecteur est défini par rapport à un référentiel.

### Référentiels galiléens

Dans certains référentiels, un point matériel isolé est soit au repos, soit animé d'un mouvement rectiligne uniforme. Ces référentiels sont des référentiels galiléens. On pourra prendre l'exemple du référentiel terrestre.

### Notions de forces

**Interactions fondamentales.**

- L'interaction gravitationnelle, de portée infinie, responsable en particulier des mouvements des planètes.
- L'interaction électromagnétique, de portée infinie, responsable des phénomènes chimiques, optiques, électriques et magnétiques.
- L'interaction faible, responsable de la radioactivité bêta.
- L'interaction forte, responsable de la cohésion des noyaux.

**Poids d'un corps.**

$$
\vec{P} = m\vec{g}
$$

Souvent, on trouvera le poids dans le sens inverse de l'axe ; on aura donc $\vec{P} = -mg\,\vec{e_z}$.

**Réactions des supports.** Un point matériel immobile posé sur un support est soumis à son propre poids et à la réaction du support :

$$
\vec{R} = R\,\vec{e_z}
$$

**Force de frottement fluide.** Un point matériel qui se déplace dans l'eau ou dans l'air subit des forces opposées à sa vitesse :

$$
\vec{f_f} = -\alpha\vec{v}
$$

## Principe fondamental de la dynamique du point

**Proposition 1.** *Dans un référentiel galiléen, la force qui s'exerce sur un point matériel est égale à la dérivée par rapport au temps du vecteur quantité de mouvement.*

$$
\vec{f} = \frac{d\vec{p}}{dt}
$$

$$
\sum \vec{f} = \frac{d\vec{p}}{dt}
$$

Ainsi, deux cas sont à envisager :

- si la masse est constante : $\vec{f} = m\vec{a}$ ;
- si la masse varie : $\vec{f} = \dfrac{dm}{dt}\vec{v} + m\vec{a}$.

**Proposition 2.** *Cas particulier de la conservation de la quantité de mouvement : si le point matériel est isolé ou pseudo-isolé, on a $\vec{p} = \overrightarrow{cte}$.*

On se rappellera de l'utilisation classique de ce théorème vue en Terminale.

## Théorème du moment cinétique

**Moment cinétique et moment d'une force.** Soient $O$ et $M$ des points de $(R)$, $M$ de masse $m$ et de vitesse $\vec{v}$ ; le moment cinétique $\vec{\sigma_0}$ est

$$
\vec{\sigma_0} = \overrightarrow{OM} \wedge m\vec{v} = \overrightarrow{OM} \wedge \vec{p}
$$

On définit également le moment d'une force $\vec{f}$ en $O$ par le vecteur :

$$
\vec{M_0}(\vec{f}) = \overrightarrow{OM} \wedge \vec{f}
$$

$$
\sum \vec{M_0}(\vec{f}) = \frac{d\vec{\sigma_0}}{dt}
$$

**Cas particulier de la conservation du moment cinétique.** Si on a $\vec{p} = \overrightarrow{cte}$, conservation de la quantité de mouvement (voir le principe fondamental de la dynamique), et $\vec{\sigma_0} = \overrightarrow{cte}$, conservation du moment cinétique, alors on a une force centrale.

**Lien avec le mouvement à accélération centrale :** $\vec{\sigma_0} = m\vec{c}$ avec $\vec{c} = \rho\dot{\varphi}\,\vec{e_z}$.

## Loi de l'action et de la réaction

**Expression générale de la loi.**

$$
\vec{f_{A/B}} = -\vec{f_{B/A}}
$$

**Quantité de mouvement d'un système isolé.** Pour un point $A$ soumis à une force de $B$ : $\dfrac{d\vec{p_A}}{dt} = \vec{f_{A/B}}$ et $\dfrac{d\vec{p_B}}{dt} = \vec{f_{B/A}}$, donc $\dfrac{d}{dt}(\vec{p_A} + \vec{p_B}) = \vec{0}$, donc

$$
\vec{p_A} + \vec{p_B} = \overrightarrow{cte}
$$
