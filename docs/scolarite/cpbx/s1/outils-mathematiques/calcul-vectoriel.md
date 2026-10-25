---
title: "Calcul vectoriel"
description: "Corrections d'exercices de calcul vectoriel : norme, travail d'une force, produits scalaire et vectoriel, angle entre vecteurs, coplanarité, moment d'une force et aire d'un triangle."
sidebar_position: 1
sidebar_custom_props:
  kind: td
---

## CV1

1. Les forces $\vec{F}_1$ et $\vec{F}_2$ ne dépendent d'aucune variable, donc elles sont constantes.
2. $\vec{F} = \vec{F}_1 + \vec{F}_2 = \vec{e}_x + 2\vec{e}_y + 3\vec{e}_z + 4\vec{e}_x - 5\vec{e}_y - 2\vec{e}_z$, soit $\vec{F} = 5\vec{e}_x - 3\vec{e}_y + \vec{e}_z$ et

   $$
   \|\vec{F}\| = \sqrt{5^2 + (-3)^2 + 1^2} = \sqrt{35} \quad \text{donc} \quad F = \sqrt{35}\ N
   $$

3. $\overrightarrow{AB} = (0 - 20)\vec{e}_x + (0 - 15)\vec{e}_y + (7 - 0)\vec{e}_z = -20\vec{e}_x - 15\vec{e}_y + 7\vec{e}_z$ :

   $$
   W_{AB} = \vec{F}.\overrightarrow{AB} = 5 \times (-20) + (-3) \times (-15) + 7 \times 1 \qquad W_{AB} = -48\ J
   $$

## CV3

1. Normes :

   $$
   \begin{aligned}
   \|\vec{r}_1\| &= \sqrt{4^2 + (-3)^2} = \sqrt{25} = 5 \\
   \|\vec{r}_2\| &= \sqrt{2^2 + (-4)^2 + (-4)^2} = \sqrt{36} = 6 \\
   \|\vec{r}_3\| &= \sqrt{2^2 + (-3)^2 + 6^2} = \sqrt{49} = 7
   \end{aligned}
   $$

2. Produits scalaires et vectoriels :

   $$
   \begin{aligned}
   \vec{r}_1.\vec{r}_2 &= 4 \times 2 + (-3) \times (-4) + 0 \times (-4) = 8 + 12 = 20 \\
   \vec{r}_1.\vec{r}_3 &= 4 \times 2 + (-3) \times (-3) = 8 + 9 = 17 \\
   \vec{r}_2.\vec{r}_3 &= 2 \times 2 + (-3) \times (-4) + (-4) \times 6 = 4 + 12 - 24 = -8
   \end{aligned}
   $$

   $$
   \vec{r}_1 \wedge \vec{r}_2 = \begin{vmatrix} 4 & 2 & \vec{e}_x \\ -3 & -4 & \vec{e}_y \\ 0 & -4 & \vec{e}_z \end{vmatrix} = ((-3) \times (-4) - (-4) \times 0)\vec{e}_x + (0 \times 2 - (-4) \times 4)\vec{e}_y + (4 \times (-4) - 2 \times (-3))\vec{e}_z
   $$

   $$
   \vec{r}_1 \wedge \vec{r}_2 = 12\vec{e}_x + 16\vec{e}_y - 10\vec{e}_z
   $$

   $$
   \vec{r}_1 \wedge \vec{r}_3 = \begin{vmatrix} 4 & 2 & \vec{e}_x \\ -3 & -3 & \vec{e}_y \\ 0 & 6 & \vec{e}_z \end{vmatrix} = -18\vec{e}_x - 24\vec{e}_y - 6\vec{e}_z
   \qquad
   \vec{r}_2 \wedge \vec{r}_3 = \begin{vmatrix} 2 & 2 & \vec{e}_x \\ -4 & -3 & \vec{e}_y \\ -4 & 6 & \vec{e}_z \end{vmatrix} = -36\vec{e}_x - 20\vec{e}_y + 2\vec{e}_z
   $$

3. Sommes :

   $$
   \vec{U} = \vec{r}_1 + \vec{r}_2 + \vec{r}_3 : \vec{U}\begin{pmatrix} 4 + 2 + 2 \\ -3 - 4 - 3 \\ 0 - 4 + 6 \end{pmatrix} = \vec{U}\begin{pmatrix} 8 \\ -10 \\ 2 \end{pmatrix} \quad \text{donc} \quad \vec{U} = 8\vec{e}_x - 10\vec{e}_y + 2\vec{e}_z
   $$

   $$
   \|\vec{U}\| = \sqrt{8^2 + (-10)^2 + 2^2} = \sqrt{64 + 100 + 4} = \sqrt{168}
   $$

   $$
   \vec{V} = \vec{r}_1 + \vec{r}_2 - \vec{r}_3 : \vec{V}\begin{pmatrix} 4 + 2 - 2 \\ -3 - 4 + 3 \\ 0 - 4 - 6 \end{pmatrix} = \vec{V}\begin{pmatrix} 4 \\ -4 \\ -10 \end{pmatrix} \quad \text{donc} \quad \vec{V} = 4\vec{e}_x - 4\vec{e}_y - 10\vec{e}_z
   $$

   $$
   \|\vec{V}\| = \sqrt{4^2 + (-4)^2 + (-10)^2} = \sqrt{16 + 16 + 100} = \sqrt{132}
   $$

4. Méthode courte :

   $$
   \vec{U}.\vec{V} = 8 \times 4 + (-10) \times (-4) + 2 \times (-10) = 32 + 40 - 20 = 52
   \qquad
   \vec{U} \wedge \vec{V} = \begin{vmatrix} 8 & 4 & \vec{e}_x \\ -10 & -4 & \vec{e}_y \\ 2 & -10 & \vec{e}_z \end{vmatrix} = 108\vec{e}_x + 88\vec{e}_y + 8\vec{e}_z
   $$

   En utilisant les résultats du 2), les termes $\vec{r}_1.\vec{r}_3$ et $\vec{r}_2.\vec{r}_3$ se compensant :

   $$
   \begin{aligned}
   \vec{U}.\vec{V} &= (\vec{r}_1 + \vec{r}_2 + \vec{r}_3).(\vec{r}_1 + \vec{r}_2 - \vec{r}_3) = \vec{r}_1^{\,2} + (\vec{r}_1.\vec{r}_2) + (-\vec{r}_1.\vec{r}_3) + (\vec{r}_2.\vec{r}_1) + \vec{r}_2^{\,2} + (-\vec{r}_2.\vec{r}_3) + (\vec{r}_3.\vec{r}_1) + (\vec{r}_3.\vec{r}_2) - \vec{r}_3^{\,2} \\
   &= \vec{r}_1^{\,2} + \vec{r}_2^{\,2} - \vec{r}_3^{\,2} + 2(\vec{r}_1.\vec{r}_2) \\
   &= 5^2 + 6^2 - 7^2 + 2 \times 20 \\
   \vec{U}.\vec{V} &= 52
   \end{aligned}
   $$

   $$
   \begin{aligned}
   \vec{U} \wedge \vec{V} &= (\vec{r}_1 + \vec{r}_2 + \vec{r}_3) \wedge (\vec{r}_1 + \vec{r}_2 - \vec{r}_3) \\
   &= \vec{r}_1 \wedge \vec{r}_1 + \vec{r}_1 \wedge \vec{r}_2 - \vec{r}_1 \wedge \vec{r}_3 + \vec{r}_2 \wedge \vec{r}_1 + \vec{r}_2 \wedge \vec{r}_2 - \vec{r}_2 \wedge \vec{r}_3 + \vec{r}_3 \wedge \vec{r}_1 + \vec{r}_3 \wedge \vec{r}_2 - \vec{r}_3 \wedge \vec{r}_3 \\
   &= 0 + (\vec{r}_1 \wedge \vec{r}_2) - \vec{r}_1 \wedge \vec{r}_3 + (-\vec{r}_1 \wedge \vec{r}_2) + 0 - \vec{r}_2 \wedge \vec{r}_3 - \vec{r}_1 \wedge \vec{r}_3 - \vec{r}_2 \wedge \vec{r}_3 - 0 \\
   &= -2(\vec{r}_1 \wedge \vec{r}_3) - 2(\vec{r}_2 \wedge \vec{r}_3) \\
   &= -2(-18\vec{e}_x - 24\vec{e}_y - 6\vec{e}_z) - 2(-36\vec{e}_x - 20\vec{e}_y + 2\vec{e}_z) \\
   \vec{U} \wedge \vec{V} &= 108\vec{e}_x + 88\vec{e}_y + 8\vec{e}_z
   \end{aligned}
   $$

## CV4

1. Normes :

   $$
   \|\vec{r}_1\| = \sqrt{2^2 + 3^2 + (-1)^2} = \sqrt{14} \qquad \|\vec{r}_2\| = \sqrt{3^2 + (-2)^2 + 2^2} = \sqrt{17} \qquad \|\vec{r}_3\| = \sqrt{4^2 + (-3)^2 + 3^2} = \sqrt{34}
   $$

2. Angle :

   $$
   \cos(\vec{r}_1, \vec{r}_2) = \frac{\vec{r}_1.\vec{r}_2}{\|\vec{r}_1\|\|\vec{r}_2\|} = \frac{2 \times 3 + 3 \times (-2) + (-1) \times 2}{\sqrt{14}\sqrt{17}} = \frac{-2}{\sqrt{238}} \approx -0{,}13 \Rightarrow (\vec{r}_1, \vec{r}_2) \approx \pm 97°
   $$

3. Coplanarité :

   $$
   \vec{r}_1 \wedge \vec{r}_2 = \begin{vmatrix} 2 & 3 & \vec{e}_x \\ 3 & -2 & \vec{e}_y \\ -1 & 2 & \vec{e}_z \end{vmatrix} = 4\vec{e}_x - 7\vec{e}_y - 13\vec{e}_z \quad \text{donc} \quad (\vec{r}_1 \wedge \vec{r}_2).\vec{r}_3 = 4 \times 4 + (-7) \times (-3) + (-13) \times 3 = -2
   $$

   $(\vec{r}_1 \wedge \vec{r}_2).\vec{r}_3 \neq 0 \Rightarrow$ les vecteurs ne sont pas coplanaires.

4. (Pas de correction.)

## CV5

3. $\overrightarrow{CA}(2, -1, -1)$, $\overrightarrow{AB}(-2, -3, 2)$ :

   $$
   \overrightarrow{M_{\overrightarrow{AB}/C}} = \overrightarrow{CA} \wedge \overrightarrow{AB} = \begin{vmatrix} 2 & -2 \\ -1 & -3 \\ -1 & 2 \end{vmatrix} = -5\vec{e}_x - 2\vec{e}_y - 8\vec{e}_z
   $$

## CV6

1. $\overrightarrow{SA}(a\sqrt{3}, -3a, -h)$, $\overrightarrow{SB}(a\sqrt{3}, 3a, -h)$, $\overrightarrow{SC}(-2a\sqrt{3}, 0, -h)$ :

   $$
   \begin{aligned}
   \|\overrightarrow{SA}\| &= \sqrt{(a\sqrt{3})^2 + (-3a)^2 + (-h)^2} = \sqrt{12a^2 + h^2} = \sqrt{400} & \|\overrightarrow{SA}\| &= 20\ m \\
   \|\overrightarrow{SB}\| &= \sqrt{(a\sqrt{3})^2 + (3a)^2 + (-h)^2} = \sqrt{12a^2 + h^2} = \|\overrightarrow{SA}\| & \|\overrightarrow{SB}\| &= 20\ m \\
   \|\overrightarrow{SC}\| &= \sqrt{(-2a\sqrt{3})^2 + (-h)^2} = \sqrt{12a^2 + h^2} = \|\overrightarrow{SA}\| & \|\overrightarrow{SC}\| &= 20\ m
   \end{aligned}
   $$

2. $\overrightarrow{SA}.\overrightarrow{SO} = \overrightarrow{SB}.\overrightarrow{SO} = \overrightarrow{SC}.\overrightarrow{SO} = h^2 = 100$ :

   $$
   \cos(\overrightarrow{SA}, \overrightarrow{SO}) = \frac{\overrightarrow{SA}.\overrightarrow{SO}}{\|\overrightarrow{SA}\|\|\overrightarrow{SO}\|} = \frac{100}{20 \times 10} = \frac{1}{2}
   $$

   or $\cos(\overrightarrow{SA}, \overrightarrow{SO}) = \cos(\overrightarrow{SB}, \overrightarrow{SO}) = \cos(\overrightarrow{SC}, \overrightarrow{SO}) = \dfrac{1}{2} \Rightarrow \varphi = \pm 60°$.

3. Résultante :

   $$
   \vec{F} = \vec{F}_A + \vec{F}_B + \vec{F}_C = \frac{\overrightarrow{SA}}{2} + \frac{\overrightarrow{SB}}{2} + \frac{\overrightarrow{SC}}{2} = \frac{0\vec{e}_x + 0\vec{e}_y + (-3h)\vec{e}_z}{2}
   \qquad
   \vec{F} = \frac{-3h}{2}\vec{e}_z
   $$

4. Moments en $O$ :

   $$
   \overrightarrow{M_{\vec{F}_A/0}} = \overrightarrow{OS} \wedge \vec{F}_A = h\vec{e}_z \wedge \vec{F}_A = \begin{vmatrix} 0 & a\sqrt{3}/2 \\ 0 & -3a/2 \\ h & -h/2 \end{vmatrix} = \begin{pmatrix} 3ah/2 \\ ah\sqrt{3}/2 \\ 0 \end{pmatrix}
   $$

   $$
   \overrightarrow{M_{\vec{F}_B/0}} = \begin{vmatrix} 0 & a\sqrt{3}/2 \\ 0 & 3a/2 \\ h & -h/2 \end{vmatrix} = \begin{pmatrix} -3ah/2 \\ ah\sqrt{3}/2 \\ 0 \end{pmatrix}
   \qquad
   \overrightarrow{M_{\vec{F}_C/0}} = \begin{vmatrix} 0 & -a\sqrt{3} \\ 0 & 0 \\ h & -h/2 \end{vmatrix} = \begin{pmatrix} 0 \\ -ah\sqrt{3} \\ 0 \end{pmatrix}
   $$

   $$
   \overrightarrow{M_{\vec{F}/0}} = \sum_{i = A, B, C} \overrightarrow{M_{\vec{F}_i/0}} = \vec{0}
   $$

5. Aire du triangle :

   $$
   \mathcal{A}(ABC) = \frac{\|\overrightarrow{SA} \wedge \overrightarrow{SB}\|}{2}
   \qquad
   \overrightarrow{SA} \wedge \overrightarrow{SB} = \begin{vmatrix} a\sqrt{3} & a\sqrt{3} \\ -3a & 3a \\ -h & -h \end{vmatrix} = \begin{pmatrix} 6ah \\ 0 \\ 6a^2\sqrt{3} \end{pmatrix}
   $$

   $$
   \|\overrightarrow{SA} \wedge \overrightarrow{SB}\| = \sqrt{36a^2h^2 + 108a^4} = a\sqrt{36h^2 + 108a^2}
   \qquad
   \mathcal{A}(ABC) \approx 198{,}5\ m^2
   $$
