---
title: "Changement de référentiel"
description: "Vitesses et accélérations absolue, relative et d'entraînement, dérivée d'un vecteur, compositions des vitesses et des accélérations, dynamique dans un référentiel non galiléen et pesanteur terrestre."
sidebar_position: 3
---

## Définitions

**Vitesse absolue $\vec{v_a}$ :** vitesse du point $M$ évaluée dans le référentiel $(R)$.

**Accélération absolue $\vec{a_a}$ :** accélération du point $M$ évaluée dans le référentiel absolu $(R)$.

**Vitesse relative $\vec{v_r}$ :** vitesse du point $M$ évaluée dans le référentiel relatif $(R')$.

**Accélération relative $\vec{a_r}$ :** accélération du point $M$ évaluée dans le référentiel relatif $(R')$.

**Notion d'entraînement :** le point coïncidant est le point $P$ qui coïncide avec $M$ à l'instant $t$ et qui est fixe dans $(R')$. On a donc :

- **vitesse d'entraînement $\vec{v_e}$ :** vitesse du point coïncidant $P$ évaluée dans le référentiel fixe $(R)$ ;
- **accélération d'entraînement $\vec{a_e}$ :** accélération du point coïncidant $P$ évaluée dans le référentiel fixe $(R)$.

## Dérivée d'un vecteur

$$
\vec{U} = x\,\vec{e_x} + y\,\vec{e_y} + z\,\vec{e_z} = x'\,\vec{e'_x} + y'\,\vec{e'_y} + z'\,\vec{e'_z}
$$

$$
\left(\frac{d\vec{v}}{dt}\right)_{(R)} = \left(\frac{d\vec{v}}{dt}\right)_{(R')} + \vec{\omega}(R'/R) \wedge \vec{v}
$$

## Transformation des vitesses et des accélérations

### Composition des vitesses

$$
\vec{v_a} = \vec{v_r} + \vec{v_e}
$$

### Composition des accélérations

$$
\vec{a_a} = \vec{a_r} + \vec{a_e} + \vec{a_c}
$$

avec

$$
\vec{a_e} = \left.\frac{d^2\overrightarrow{OO'}}{dt^2}\right|_R + \frac{d\vec{\omega}(R'/R)}{dt} \wedge \overrightarrow{O'P} + \vec{\omega}(R'/R) \wedge \left(\vec{\omega}(R'/R) \wedge \overrightarrow{O'P}\right)
$$

et

$$
\vec{a_c} = 2\,\vec{\omega}(R'/R) \wedge \vec{v_r}(M/R')
$$

## Dynamique dans un référentiel non galiléen

On considère $(R)$ fixe et galiléen ; $(R')$ est mobile par rapport à $(R)$, ainsi $(R')$ n'est pas galiléen.

### Relation fondamentale de la dynamique

$$
\vec{f} = m\vec{a_a}
$$

donc

$$
\vec{f} - m\vec{a_e} - m\vec{a_c} = m\vec{a_r}
$$

On obtient donc

$$
\vec{f} + \vec{f_{ie}} + \vec{f_{ic}} = m\vec{a_r}
$$

où $\vec{f_{ie}} = -m\vec{a_e}$ et $\vec{f_{ic}} = -m\vec{a_c}$.

### Cas particuliers

**Translation rectiligne :** $\vec{a_c} = \vec{0}$.

**Rotation uniforme autour d'un axe fixe :** on a $\vec{v_r} = \vec{0}$ et $\vec{f_{ie}} = m\omega^2\,\overrightarrow{OM}$.

### Point matériel immobile

Un point matériel $M$ est immobile dans $(R')$ si le vecteur $\overrightarrow{O'M}$ est constant, donc $\vec{f} - m\vec{a_e} = \vec{0}$.

## Application à la dynamique terrestre

$$
\vec{g_0} = \frac{\vec{f_g}}{m} = \frac{GM_T}{R_T^2}\,\vec{n}
$$
