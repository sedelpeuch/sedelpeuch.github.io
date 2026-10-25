---
title: "Fiche"
description: "Fiche de synthèse de mécanique des fluides : pression locale, relation de la statique des fluides, loi de l'hydrostatique, poussée d'Archimède et relation de Bernoulli."
sidebar_position: 4
---

## Pression dans la statique des fluides

Définition de la pression locale :

$$
P = \frac{dF}{dS}
$$

en $N.m^{-2}$ ou $Pa$. La pression dans un fluide est une grandeur locale indépendante de la surface utilisée.

## Relation de la statique des fluides

La variation de pression sous l'effet d'une force de champ $\vec{\gamma}$ :

$$
\rho\vec{\gamma} - \overrightarrow{\text{grad}}(p) = \vec{0}
$$

On rappelle le PFD local :

$$
\overrightarrow{div}(\overline{\overline{\sigma}}) + \rho\vec{\gamma} = \vec{0}
$$

## Loi de l'hydrostatique

La force d'un champ $\vec{\gamma}$ est le champ de pesanteur $\vec{g}$, on a donc

$$
p + \rho gz = cte
$$

car $\rho g = -\dfrac{\partial p}{\partial z} \Leftrightarrow -\rho gz + cte = p$ (axe $Oz$ orienté vers le haut).

Poussée d'Archimède, avec $V$ le volume de fluide déplacé :

$$
\vec{\pi} = \rho V\vec{g}
$$

## Relation de Bernoulli en dynamique des fluides

Pour un fluide parfait incompressible en écoulement permanent dans le champ de pesanteur. Pas de frottements (pas de perte). Il y a donc conservation de l'énergie mécanique locale le long d'une **ligne de courant**.

$$
\frac{1}{2}\vec{u}^2 + gh + \frac{p}{\rho} = cte
$$

$$
p + \rho gh + \frac{1}{2}\rho\vec{u}^2 = p_B
$$

$$
h + \frac{p}{\rho g} + \frac{1}{2g}\vec{u}^2 = h_B
$$
