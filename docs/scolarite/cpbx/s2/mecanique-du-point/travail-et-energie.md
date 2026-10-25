---
title: "Travail et énergie"
description: "Travail élémentaire et fini, puissance, théorème de l'énergie cinétique, forces conservatives et énergie potentielle, conservation de l'énergie mécanique."
sidebar_position: 2
---

## Travail et puissance

### Travail élémentaire

Soit $\overrightarrow{MM'}$ un déplacement infinitésimal :

$$
\delta W = \vec{f} \cdot \overrightarrow{MM'} = \vec{f} \cdot \overrightarrow{dOM} = \vec{f} \cdot \vec{v}\,dt
$$

On peut utiliser cette formule dans n'importe quel système de coordonnées.

### Travail au cours d'un déplacement fini

$$
W_{M_1 \to M_2}(\vec{f}) = \int_{M_1}^{M_2} \vec{f} \cdot d\overrightarrow{OM} = \int_{t_1}^{t_2} \vec{f} \cdot \vec{v}\,dt
$$

### Puissance moyenne et instantanée

$\bar{P} = \dfrac{W}{\Delta t}$ en watts, $P = \dfrac{\delta W}{dt} = \vec{f} \cdot \vec{v}$.

## Théorème de l'énergie cinétique

### Théorème

On se place dans le cas où la masse est constante : $\vec{F} = m\vec{a} \Rightarrow dW = \vec{f} \cdot \vec{v}\,dt = m\dfrac{d\vec{v}}{dt} \cdot \vec{v}\,dt = m\vec{v} \cdot d\vec{v} = d\left(\dfrac{1}{2} m\vec{v}^2\right)$. Donc

$$
E_c = \frac{1}{2} mv^2 \Leftrightarrow \delta W = dE_c
$$

De plus,

$$
W_{M_1 \to M_2}(\vec{f}) = E_c(t_2) - E_c(t_1) = \int_{M_1}^{M_2} \delta W
$$

et

$$
\frac{dE_c}{dt} = \sum P(\vec{f}) = \sum \vec{f} \cdot \vec{v} = \frac{\delta W}{dt}
$$

### Remarques importantes

On notera que l'énergie cinétique ne se conserve pas, sauf si la somme des forces qui s'exercent sur le point est nulle ou si elles sont perpendiculaires au mouvement.

Ce théorème est particulièrement adapté aux systèmes dont la position est définie par un seul degré de liberté.

## Forces conservatives, énergie potentielle

### Énergie potentielle

De manière générale, on dit qu'un champ de force $\vec{f}$ est conservatif si $\overrightarrow{\text{rot}}\,\vec{f} = \vec{0}$. On a donc

$$
\vec{f} = -\nabla E_p
$$

Si on se restreint à des forces indépendantes du temps, on obtient $E_p = -\displaystyle\int \vec{f} \cdot d\overrightarrow{OM}$.

La plupart du temps, les forces de frottement ne sont pas conservatives, elles sont *dissipatives*.

### Une propriété importante des forces conservatives

$$
\delta W = -dE_p
$$

En intégrant, on a donc :

$$
W_{M_1 \to M_2}(\vec{f}) = E_p(M_1) - E_p(M_2)
$$

## Énergie mécanique

### Conservation de l'énergie mécanique

On a $\delta W = dE_c$ et $\delta W = -dE_p$ (théorème de l'énergie cinétique et loi des forces conservatives), donc

$$
dE_c + dE_p = 0 \rightarrow d(E_c + E_p) = 0 \rightarrow dE_m = 0 \Rightarrow E_m = cte
$$

Il y a conservation de l'énergie mécanique quand :

- $\vec{f}$ dérive d'une énergie potentielle $E_p$ ;
- $\vec{f} = \vec{0}$ ;
- $\vec{f}$ est perpendiculaire au déplacement.
