---
title: "Fiche d'optique ondulatoire"
description: "Fiche de synthèse d'optique ondulatoire : ondes lumineuses, chemin optique, interférences monochromatiques, contraste, dispositifs de Young et de Michelson, sources polychromatiques."
sidebar_position: 1
---

## Ondes lumineuses

Équation d'onde :

$$
\Delta E(\vec{r}, t) - \frac{1}{v^2} \frac{\partial^2 E(r, t)}{\partial t^2} = 0
$$

Théorème de Malus : **les rayons sont orthogonaux aux surfaces d'onde.**

Chemin optique :

$$
\delta_{AB} = \int_A^B n(M)\,dM
$$

Déphasage :

$$
\phi_{AB} = \frac{2\pi}{\lambda_0} \delta_{AB}
$$

Intensité :

$$
I(\vec{r}) = \langle S(\vec{r}, t) \rangle = \frac{1}{\tau} \int_T^{T+\tau} S(\vec{r}, t)\,dt = \frac{1}{2} n\epsilon_0 cE_0^2
$$

## Interférences monochromatiques

Intensité lumineuse :

$$
I(M) = \frac{1}{\tau} \int_0^\tau I(M, t)\,dt
$$

$$
I(M) = I_1(M) + I_2(M) + 2\sqrt{I_1(M)I_2(M)} \cos(\phi(M)) \vec{e}_1\vec{e}_2
$$

Déphasage :

$$
\phi_2(M) = \frac{2\pi}{\lambda_0} \delta_{S_2M} - \phi_2
$$

Ordre d'interférence :

$$
p(M) = \frac{\phi(M)}{2\pi}
$$

Contraste :

$$
V = \frac{I_{Max} - I_{Min}}{I_{Max} + I_{Min}}
$$

où $I_{Max} = I_1 + I_2 + 2\sqrt{I_1I_2}$ et $I_{Min} = I_1 + I_2 - 2\sqrt{I_1I_2}$.

## Dispositifs de Young

$$
I(M) = 2I_0(1 + \cos(\phi(M)))
\qquad
\phi(M) = \frac{2\pi}{\lambda_0} n \frac{ay}{d}
$$

Franges d'interférences : lieu des points $M$ d'égal déphasage.

Ordre d'interférence :

$$
I(M) = 2I_0[1 + \cos(2\pi p(M))]
$$

Interfrange :

$$
i = y_{p+1} - y_p = \frac{\lambda_0 d}{na}
$$

Ajout d'une lame :

$$
\delta(M) = \delta^{\text{sans lame}} + n'e - ne
$$

(interfrange inchangé et déplacement global du système).

## Dispositifs de Michelson

$$
I(D) = \frac{I_0}{2}[1 + \cos(\phi(D))]
\qquad
\phi(D) = \frac{2\pi}{\lambda_0} 2nx
$$

$$
I(t) = \frac{I_0}{2}\left[1 + \cos\left(\frac{2\pi}{\lambda_0} 2nvt\right)\right]
$$

Si on enlève la première lentille :

- ordre d'interférence $p(\theta) = p(y) = \dfrac{2nx\cos(\theta)}{\lambda_0}$ ;
- différence de chemin optique $\delta(x) = 2nx\cos(\theta)$ ;
- intensité :

  $$
  I(\theta) = \frac{I_0}{2}\left[1 + \cos\left(\frac{2\pi}{\lambda_0} 2nx\cos(\theta)\right)\right]
  $$

## Sources polychromatiques

- Young : $I(y) = I^{\lambda_1}(y) + I^{\lambda_2}(y)$ et $i_1 = \dfrac{\lambda_1 f'_1}{na}$, $i_2 = \dfrac{\lambda_2 f'_2}{na}$.
- Michelson : soit $\lambda_1$ et $\lambda_2 = \lambda_1 + \Delta\lambda$,

  $$
  I(M) = I_0 + \frac{I_0}{2}[\cos(2\pi p_1) + \cos(2\pi p_2)]
  $$
