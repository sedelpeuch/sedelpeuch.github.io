---
title: "Interaction à deux corps"
description: "Collisions élastiques et inélastiques, référentiel du centre de masse, coefficient de restitution, énergie potentielle d'interaction, problème à deux corps, mobile fictif et masse réduite."
sidebar_position: 5
---

## Collisions

### Conservation de la quantité de mouvement

$$
\vec{p}_{\text{initial}} = \vec{p}_{\text{final}} \Leftrightarrow m_1\vec{v_1} + m_2\vec{v_2} = m_1\vec{v'_1} + m_2\vec{v'_2}
$$

### Collisions élastiques

**Conservation de l'énergie cinétique.**

$$
E_{C\,\text{initial}} = E_{C\,\text{final}}
$$

**Référentiel du centre de masse.**

$$
\overrightarrow{OG} = \frac{m_1\overrightarrow{OA_1} + m_2\overrightarrow{OA_2}}{m_1 + m_2}
$$

$$
\vec{v_G} = \frac{m_1\vec{v_1} + m_2\vec{v_2}}{m_1 + m_2}
$$

Dans $R_G$ (le référentiel du centre de masse), il y a conservation de la quantité de mouvement et de l'énergie cinétique.

### Collisions inélastiques

**Choc mou.** Un choc est dit mou si les deux corps, séparés avant le choc, restent ensemble après le choc.

**Coefficient de restitution.**

$$
e = -\frac{v'_1 - v'_2}{v_1 - v_2}
\qquad
\begin{cases} e = 1 \rightarrow \text{élastique} \\ e = 0 \rightarrow \text{mou} \end{cases}
$$

**Vitesses finales.** On pose $x = \dfrac{m_2}{m_1}$.

- Si $e = 1$ : $\begin{cases} v'_1 = v_1\left(\dfrac{1 - x}{1 + x}\right) \\ v'_2 = \dfrac{2v_1}{1 + x} \end{cases}$
- Si $e = 0$ : $v'_1 = v'_2 = \dfrac{v_1}{1 + x}$

## Énergie potentielle d'interaction

### Définition

La fonction $E_p(r)$ porte le nom d'énergie potentielle d'interaction des deux corps et ne dépend que de la distance relative entre ces deux corps.

### Loi de l'action et de la réaction

$$
\vec{f_2} = -\frac{dE_p}{dr}\vec{u_{12}} = -\vec{f_1}
$$

### Énergie mécanique

$$
E_m = \frac{1}{2} m_1 v_1^2 + \frac{1}{2} m_2 v_2^2 + E_p(r) = cte
$$

## Le problème à deux corps

### Trajectoire dans le référentiel barycentrique

Le barycentre $G$ du système est animé, dans le référentiel galiléen $(R)$, d'un mouvement rectiligne uniforme (car on a un système isolé).

$$
\vec{r_2} = -\frac{m_1}{m_2}\vec{r_1}
$$

Dans le référentiel du centre de masse $(R_G)$, les deux corps en interaction décrivent des trajectoires homothétiques.

### Mobile fictif et masse réduite

On appelle le point $M$ le mobile fictif associé au système, défini par :

$$
\vec{r} = \overline{GM} = \vec{r_2} - \vec{r_1}
$$

L'équation du mouvement est alors :

$$
m\frac{d^2\vec{r}}{dt^2} = \vec{f_2}
$$

où $m$ est appelée masse réduite du système et est définie par

$$
m = \frac{m_1 m_2}{m_1 + m_2}
$$
