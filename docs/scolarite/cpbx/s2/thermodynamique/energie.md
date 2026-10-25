---
title: "Énergie et échanges d'énergie"
description: "Énergie d'un système et énergie interne, température et pression, travail et chaleur, premier principe, calorimétrie, enthalpie, capacités thermiques et coefficient isentropique."
sidebar_position: 2
---

L'énergie est la capacité d'un système à produire un travail (lumière, chaleur, électricité). Le premier principe de la thermodynamique exprime la conservation de l'énergie.

## Énergie d'un système

### Expression générale

$$
E_c = \sum_{i=1}^{N} \frac{1}{2} m_i v_i^2
$$

$$
E = E_c + E_p^{int} + E_p^{ext}
$$

### Distinction entre énergie macroscopique et énergie interne

$$
E = E_c^M + E_p^{ext} + E_c^* + E_p^{int}
$$

### Énergie interne U

$$
U = E_c^* + E_p^{int}
$$

L'énergie interne est une grandeur extensive et additive.

Théorème d'équipartition de l'énergie : $U = \text{degré de liberté} \cdot \dfrac{1}{2} k_B T$ pour les molécules, $U = \text{degré de liberté} \cdot \dfrac{1}{2} RT$ pour les moles.

### Principe de conservation de l'énergie, conséquences

Principe de conservation de l'énergie : l'énergie ne se crée pas, ne disparaît pas, elle se conserve et éventuellement se transforme.

- L'énergie d'un système isolé est constante.
- Pour que l'énergie d'un système varie, il faut des échanges avec le milieu extérieur.
- L'énergie d'un système isolé à l'équilibre thermodynamique est constante.

### Température et pression

**Température.** La température traduit l'agitation thermique des particules à l'échelle microscopique.

Pour un gaz monoatomique contenant $N$ particules sans interactions, chaque particule possède 3 degrés de liberté :

$$
U_{GP}^{mono} = \frac{3}{2} n N_A k_B T = \frac{3}{2} nRT
$$

Pour un gaz parfait diatomique, on a $\dfrac{1}{2} m \langle v^2 \rangle = \dfrac{3}{2} k_B T$ et $U_{GP}^{diatom} = \dfrac{5}{2} RT$.

L'énergie interne n'est fonction que de la température.

**Pression.** La pression est une grandeur scalaire, son unité SI est le pascal et $1\ \text{Pa} = 1\ \text{N.m}^{-2}$.

### Travail

Le travail est l'énergie fournie par une force à un système lorsque son point d'application se déplace.

$$
\delta W = \vec{F} \cdot \vec{dr}
$$

$$
W = \int \vec{F} \cdot \vec{dr}
$$

**Travail des forces extérieures de pression.** La force de pression extérieure vaut $\vec{F} = -P_{ext} S\,\vec{e_x}$ ; son travail élémentaire est $\delta W = -P_{ext}\,dV$.

Le travail positif est reçu par le système, alors que le travail négatif est cédé par le système.

Attention, le calcul du travail $W$ dépend de la façon dont la pression $P_{ext}$ est appliquée.

- Si la pression est brutale : $W = \displaystyle\int -P_{ext}\,dV = -P_{ext} \Delta V$.
- Si la pression est quasi statique : $P_{ext} = P_{int} = \dfrac{nRT}{V} = \dfrac{nRT_{ext}}{V}$.

**Travail électrique.**

$$
P = ui
$$

$$
\delta W = P\,dt = ui\,dt = u\,dq
$$

### Chaleur

Le transfert de chaleur $Q$ ne s'exprime pas de manière intrinsèque à l'aide de grandeurs macroscopiques.

## Premier principe

Le premier principe, ou bilan d'énergie interne, postule que lors d'une transformation infinitésimale, la variation d'énergie interne du système vaut :

$$
dU = \delta W + \delta Q
$$

Pour une transformation finie : $\Delta U = U_f - U_i = W_{ext} + Q_{ext}$.

Lorsque seules les forces de pression sont présentes, alors $dU = \delta Q - P_{ext}\,dV$.

Pour un gaz parfait monoatomique : $\Delta U = \dfrac{3}{2} nR \Delta T = \dfrac{3}{2} nR (T_f - T_i)$.

## Calorimétrie et enthalpie

### Transferts thermiques

Le premier principe se traduit par $Q = \Delta U - W$.

### Transformation isochore

$V = cte$, $dV = 0 \Rightarrow \delta W = 0$ et $W = 0 \Rightarrow \Delta U = Q_{ext}$.

### Transformation isobare, enthalpie H

$$
W_{ext} = -P_{ext} \Delta V
$$

On a aussi $P_i = P_f = P_{ext}$.

On définit l'enthalpie $H = U + PV$ ; lors d'une transformation isobare, $\Delta H = Q_{ext}$.

### Capacité thermique

La capacité thermique d'un système est l'énergie qu'il faut lui apporter pour augmenter sa température de 1 K.

**Calorimétrie à volume constant.**

$$
dU = \delta Q
$$

On définit la capacité thermique à volume constant $C_v = \dfrac{\delta U}{\delta T}$.

On définit le coefficient calorimétrique $l = P + \dfrac{\delta U}{\delta V}$.

On a donc $dU = C_v\,dT = \delta Q$ ; si $C_v$ est constant, on a $\Delta U = C_v \Delta T = Q_{ext}$.

**Cas des gaz parfaits.**

$$
U_{GP}^{mono} = \frac{3}{2} nRT = C_v T
$$

$$
U_{GP}^{diatom} = \frac{5}{2} nRT = C_v T
$$

**Calorimétrie à pression extérieure constante.**

$$
dH = \delta Q
$$

On définit la capacité thermique à pression constante $C_p = \dfrac{\delta H}{\delta T}$.

$$
H = C_p T
$$

**Cas des gaz parfaits.** $H = \dfrac{5}{2} nRT = C_p T$.

$$
C_p^{mol} - C_V^{mol} = R
$$

La relation de Mayer traduit clairement le fait qu'il faut plus d'énergie pour chauffer un gaz parfait à l'aide d'une transformation isobare qu'à l'aide d'une transformation isochore.

**Coefficient isentropique $\gamma$.**

$$
\gamma = \frac{C_P}{C_V}
$$

| Monoatomique | Diatomique |
| --- | --- |
| $C_v = \frac{3}{2} nR$ | $C_v = \frac{5}{2} nR$ |
| $C_p = \frac{5}{2} nR$ | $C_p = \frac{7}{2} nR$ |
| $\gamma_{mono} = \frac{5}{3}$ | $\gamma_{dia} = \frac{7}{5}$ |

**Loi de Dulong et Petit.** Pour les phases condensées, liquides et solides, on a $dH = dU$ donc $C_V = C_P = C = 3nR$.
