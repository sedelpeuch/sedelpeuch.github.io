---
title: "Électrocinétique : dipôles linéaires en régime sinusoïdal"
description: "Proposition de solution du TP d'électrocinétique 2 : mesure d'impédance d'une résistance et d'un condensateur, association RC et notation complexe, résonance série et modèle de la bobine réelle."
sidebar_position: 3
---

## Étude de dipôles linéaires en régime sinusoïdal

### Mesure d'impédance

#### Résistance

**Balayer la fréquence de 50 Hz à 5 kHz. Décrire qualitativement comment varient $U$ et $I$.** $U(50\ \text{Hz}) = 4{,}04\ \text{V}$, $U(5\ \text{kHz}) = 4{,}01\ \text{V}$, $\dfrac{\Delta U}{U} \approx 0{,}0075 < 1\,\%$ et $I(50\ \text{Hz}) = 8{,}50\ \text{mA}$, $I(5\ \text{kHz}) = 8{,}51\ \text{mA}$, $\dfrac{\Delta I}{I} \approx 0{,}001 < 1\,\%$. Ainsi, les variations sont négligeables.

**La valeur de l'impédance $Z$ dépend-elle de la fréquence ?** On a la relation $Z = \dfrac{U}{I}$, or $U$ et $I$ sont constants (voir l'approximation précédente), ainsi $Z$ est constant. Donc $Z$ ne dépend pas de la fréquence.

**Pour une fréquence de l'ordre de 500 Hz, remplir le tableau 1.**

| Grandeur | Valeur |
| --- | --- |
| $f$ | $403\ \text{Hz}$ |
| $U$ | $4\ \text{V}$ |
| $I$ | $8{,}54\ \text{mA}$ |
| $Z$ | $468{,}38\ \Omega$ |

**Rappeler l'expression théorique de l'impédance complexe d'une résistance. En déduire la valeur de la résistance $R$ et l'incertitude sur $R$.** $\underline{Z_R} = R\angle 0 = R$, d'où $R = \underline{Z_R} = 468{,}38\ \Omega$.

#### Condensateur

**Balayer la fréquence de 50 Hz à 5 kHz. Décrire qualitativement comment varient $U$ et $I$.** $U(50\ \text{Hz}) = 3{,}99\ \text{V}$, $U(5\ \text{kHz}) = 3{,}55\ \text{V}$, $\dfrac{\Delta U}{U} \approx 0{,}11 > 1\,\%$ et $I(50\ \text{Hz}) = 0{,}36\ \text{mA}$, $I(5\ \text{kHz}) = 3{,}48\ \text{mA}$, $\dfrac{\Delta I}{I} > 1\,\%$. Ainsi, quand on fait varier $f$, $U$ diminue et $I$ augmente.

**La valeur de l'impédance $Z$ dépend-elle de la fréquence ?** On a la relation $Z = \dfrac{U}{I}$, ainsi $Z(50\ \text{Hz}) = 11083\ \Omega$ et $Z(5\ \text{kHz}) = 116{,}4\ \Omega$. On a bien $Z$ qui diminue quand on augmente la fréquence (ce qui confirme la loi d'Ohm).

**Pour une fréquence de l'ordre de 1 kHz, remplir le tableau 2.**

| Grandeur | Valeur |
| --- | --- |
| $f$ | $985{,}2\ \text{Hz}$ |
| $U$ | $3{,}97\ \text{V}$ |
| $I$ | $6{,}83\ \text{mA}$ |
| $Z$ | $581{,}26\ \Omega$ |

**Rappeler l'expression théorique de l'impédance complexe d'un condensateur. En déduire la valeur de la capacité $C$ et l'incertitude sur $C$.** On a $\underline{Z_C} = \dfrac{1}{C\omega}\angle -\dfrac{\pi}{2} = \dfrac{1}{jC\omega}$, d'où $C = \dfrac{1}{Z\omega} = \dfrac{1}{Z 2\pi f} = \dfrac{1}{581{,}26 \times 2\pi \times 985{,}2} = 2{,}78 \cdot 10^{-7}\ \text{F}$.

### Association série RC, intérêt de la représentation complexe

#### Mesure des valeurs efficaces

**Mesurer au multimètre successivement les valeurs efficaces $U$, $U_R$, $U_C$.** On a $U = 4{,}01\ \text{V}$, $U_R = 2{,}45\ \text{V}$ et $U_C = 3{,}13\ \text{V}$.

**A-t-on $U = U_R + U_C$ ? Justifier la réponse.** On a $U \neq U_R + U_C$. C'est normal : la relation est $u(t) = u_R(t) + u_C(t)$, et la relation entre les valeurs efficaces ($U = U_R + U_C$) n'est juste que si les phases sont égales.

#### Mesure des grandeurs complexes

**Mesurer le déphasage de $u_C(t)$ par rapport à $u(t)$. En déduire la valeur de $\phi_C$.** On trouve $\phi_C = -38^\circ$ (on choisit $\phi = 0$ comme référence).

**Couper le générateur et permuter la résistance et le condensateur, puis mettre à nouveau le générateur en marche. Mesurer le déphasage de $u_R(t)$ par rapport à $u(t)$. En déduire la valeur de $\phi_R$.** $\phi_R = 51^\circ$ (on choisit $\phi = 0$ comme référence).

**Donner la valeur des nombres complexes $\underline{U}$, $\underline{U_R}$, $\underline{U_C}$ exprimée en notation polaire puis en notation cartésienne.** On a $\underline{U} = 4{,}01\angle 0 = 4{,}01$, $\underline{U_R} = 2{,}45\angle\dfrac{17}{60}\pi = 2{,}45\left(\cos\left(\dfrac{17}{60}\pi\right) + j\sin\left(\dfrac{17}{60}\pi\right)\right)$ et $\underline{U_C} = 3{,}13\angle -\dfrac{19}{90}\pi = 3{,}13\left(\cos\left(-\dfrac{19}{90}\pi\right) + j\sin\left(-\dfrac{19}{90}\pi\right)\right)$.

**Vérifier que l'on a $\underline{U} = \underline{U_R} + \underline{U_C}$.** On a $\underline{U_R} + \underline{U_C} = 4{,}01 - 0{,}02j \approx \underline{U}$.

**Conclure sur l'intérêt de la représentation complexe des grandeurs sinusoïdales.** Elle permet l'utilisation des lois classiques (mailles, nœuds) sans que les phases soient égales. Elle permet en outre d'éviter des calculs complexes.

### Résonance série, détermination du modèle de la bobine réelle

#### Théorie

**Donner l'expression littérale de l'impédance équivalente $\underline{Z_{eq}} = \dfrac{\underline{U}}{\underline{I}} = \dfrac{U_M}{I_M}$ du circuit, sachant qu'elle correspond à la somme de toutes les impédances puisque les éléments sont en série. Isoler la partie réelle et la partie imaginaire.**

$$
\underline{Z_{eq}} = \underline{Z_R} + \underline{Z_C} + \underline{Z_r} + \underline{Z_L} = R + \frac{-j}{C\omega} + r + jL\omega = (R + r) + j\left(L\omega - \frac{1}{C\omega}\right)
$$

**En déduire le module $Z_{eq} = \dfrac{U}{I} = \dfrac{U_M}{I_M}$, en fonction de $r$, $R$, $L$, $C$ et de la pulsation $\omega$.**

$$
Z_{eq} = \sqrt{(R + r)^2 + \left(L\omega - \frac{1}{C\omega}\right)^2}
$$

**Déterminer l'expression de la pulsation de résonance $\omega_0$ puis de la fréquence de résonance $f_0$ en fonction de $L$ et $C$.** D'une part, $LC\omega_0^2 = 1 \Leftrightarrow \omega_0 = \dfrac{1}{\sqrt{LC}}$. D'autre part, $f_0 = \dfrac{\omega_0}{2\pi} = \dfrac{1}{2\pi\sqrt{LC}}\ \text{Hz}$.

**Que vaut $Z_{eq}$ à la résonance ? En déduire $I_{Mmax}$, intensité de résonance, en fonction de $U_M$ et des résistances.** $Z_{eq} = \sqrt{(R + r)^2} = R + r$ (à la résonance, $Z_{eq}$ est minimum $\Rightarrow Z_e$ = résistance). Ainsi $I_{Mmax} = \dfrac{U_M}{Z_{eq}} = \dfrac{U_M}{r + R}$.

#### Mesure

**Effectuer un balayage de la fréquence du GBF. Qu'observez-vous sur les amplitudes des tensions ?**

**Déterminer précisément la fréquence de résonance $f_0$ et l'amplitude de $u_R(t)$ à la résonance.** On a $f_0 = 915\ \text{Hz}$, $U_{RM} = 1{,}44\ \text{V}$ et $R = ???$

**Connaissant $R$, en déduire $I_{Mmax}$, intensité de résonance.** Par la loi d'Ohm, $I = \dfrac{U}{R} = ???$

**Courbe de résonance : faire varier la fréquence de 50 Hz à 2 kHz et relever les valeurs de $U_{RM}$ pour en déduire les valeurs de $I_M$. Remplir le tableau 3 et tracer la courbe $I_M$ en fonction de la fréquence $f$, en prenant une échelle linéaire pour $f$.**

| $f$ | 50 | 440 | 830 | 1230 | 1610 | 2000 |
| --- | --- | --- | --- | --- | --- | --- |
| $I$ | 0,51 | 3,60 | 6,8 | 6,12 | 4,60 | 3,57 |

#### Exploitation

**Modèle équivalent de la bobine réelle.**

**À partir des valeurs mesurées de $f_0$ et $I_{Mmax}$, ainsi que des valeurs connues relatives aux autres composants, déterminer le modèle de la bobine, c'est-à-dire son inductance $L$ et sa résistance $r$.** On a $L = \dfrac{1}{C(f_0 \cdot 2\pi)^2} = 0{,}12\ \text{H}$ et $r = R\left(\dfrac{U}{U_{AM}} - 1\right) = 76{,}2\ \Omega$.

**Qualité de la résonance.**

**À partir de la courbe de résonance, déterminer les deux fréquences $f_{min}$ et $f_{max}$ pour lesquelles $I_M = I_{Mmax}/\sqrt{2}$.** $f_{min} = 580\ \text{Hz}$ et $f_{max} = 1450\ \text{Hz}$.

**En déduire la valeur du coefficient de qualité $Q$ défini par $Q = \dfrac{f_0}{f_{max} - f_{min}}$.** On a $Q = 1{,}05$.
