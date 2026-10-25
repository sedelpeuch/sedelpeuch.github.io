---
title: "Rappels sur les principes de la thermodynamique"
description: "Premier et deuxième principes de la thermodynamique, entropie échangée et créée, thermostat, et rappels sur le gaz parfait : lois de Joule, relation de Mayer et loi de Laplace."
sidebar_position: 2
---

## Premier principe

On définit l'énergie interne $U$ comme une grandeur extensive ; $U$ est une fonction d'état $U(S, V, N)$ et

$$
dU = T\,dS - P\,dV + \mu\,dN
$$

Un système fermé évoluant entre un état initial et un état final, et recevant le travail $W$ et le transfert thermique $Q$, voit son énergie totale $(E, U)$ varier :

$$
\Delta U + \Delta E = W + Q
$$

**Remarques.**

- $W$ et $Q$ s'expriment en joules.
- Si le système est isolé, $\begin{cases} Q = 0 \\ W = 0 \end{cases} \Rightarrow \Delta U + \Delta E = 0$.
- Si $E$ est constante, alors

  $$
  \Delta U = W + Q
  $$

- Pour une transformation infinitésimale, $\Delta U \to dU$, $W \to \delta W$ et $Q \to \delta Q$, ainsi

  $$
  dU = \delta W + \delta Q
  $$

  En effet, $\Delta U_{AB} = \int_A^B dU = U_B - U_A = \int_A^B (\delta W + \delta Q) = \int_A^B \delta W + \int_A^B \delta Q = W_{AB} + Q_{AB}$.

- Par convention, le travail est positif quand il est reçu par le système, et la chaleur est positive quand elle est reçue par le système.

## Deuxième principe

**Énoncé.** L'entropie $S$ est une grandeur extensive, et la fonction $S(U, V, N)$ est une fonction d'état. Un système fermé et calorifugé évoluant entre un état initial et un état final voit son entropie augmenter : $\Delta S \geq 0$, et $S$ est maximale à l'équilibre.

**Conséquences.**

**Évolution réversible.** Pour un système fermé, $dU = \delta W + \delta Q$ avec $\delta W = -P_{ext}\,dV$. La transformation étant réversible, elle est quasi statique, donc $P = P_{ext}$ et $\delta W = -p\,dV$. Or

$$
\begin{cases} dU = T\,dS - p\,dV \\ dU = -p\,dV + \delta Q \end{cases}
$$

Au final, on obtient

$$
T\,dS = \delta Q
$$

**Adiabatique et réversible.** La transformation est adiabatique, donc $\delta Q = 0$ ; elle est de plus réversible, donc $dS = \dfrac{\delta Q}{T}$. On a donc une transformation isentropique :

$$
dS = 0
$$

**Thermostat (source de chaleur).** Par définition, $T = T_S = \text{cte}$ et il n'y a pas d'échange de travail. On a donc :

$$
\begin{cases}
\{\text{système}\} & dU = \delta W + \delta Q = \delta Q \\
\{\text{source}\} & dU_S = \delta W_S + \delta Q_S = \delta Q_S = T_S\,dS_S - p\,dV_S = T_S\,dS_S
\end{cases}
$$

On obtient donc $dU = \delta Q$ et $dS_S = \dfrac{dU_S}{T_S} = \dfrac{\delta Q_S}{T_S}$.

Pour l'ensemble formé de la source et du système, $dU_{tot} = 0$ car il est isolé, or $dU_{tot} = dU + dU_S$, d'où

$$
dU_S = -dU
$$

donc $\delta Q_S = -\delta Q$. Finalement :

$$
dS_S = -\frac{\delta Q}{T_S}
$$

**Système fermé en contact avec une source.** Pour l'ensemble formé de la source et du système, $\Delta S_{tot} \geq 0$, donc $\Delta S_S + \Delta S \geq 0$, soit $dS_{tot} = dS - \dfrac{\delta Q}{T_s} \geq 0$. Ainsi :

$$
dS \geq \frac{\delta Q}{T_s}
$$

On note $\delta S_{ech} = \dfrac{\delta Q}{T_s}$ l'entropie échangée. Le second principe, pour un système fermé en contact avec une source thermodynamique, s'énonce :

$$
dS = \delta S_{ech} + \delta S_{créée}
\quad \text{avec} \quad
\delta S_{ech} = \frac{\delta Q}{T_s}
\quad \text{et} \quad
\delta S_{créée} \geq 0
$$

## Gaz parfait

- $PV = nRT$.
- Première et deuxième lois de Joule : $U$ et $H$ ne dépendent que de $T$, avec $\begin{cases} dU = C_v\,dT \\ dH = C_p\,dT \end{cases}$
- Pour un gaz monoatomique : $C_v = \dfrac{3}{2} nR$, $C_p = \dfrac{5}{2} nR$ et $C_v^{mol} = \dfrac{C_v}{n} = \dfrac{3}{2} R$.
- Relation de Mayer : $C_p - C_v = nR$ et $\gamma = \dfrac{C_p}{C_v}$, donc

  $$
  C_v = \frac{nR}{\gamma - 1} \qquad C_p = \frac{nR\,\gamma}{\gamma - 1}
  $$

- Loi de Laplace : pour une transformation adiabatique et réversible, $P_i V_i^\gamma = P_f V_f^\gamma$, donc $PV^\gamma = \text{cte}$.
- Diagrammes utiles : dans le diagramme $(T, S)$, on peut appliquer $PV = \text{cte}$ sur les isothermes et $PV^\gamma = \text{cte}$ sur les isentropiques. Dans le diagramme $(P, V)$, les isothermes sont des courbes en $1/x$ et les isentropiques des courbes en $1/x^\gamma$.
