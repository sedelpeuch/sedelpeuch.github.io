---
title: "Œil et instruments d'optique"
description: "Accommodation, équation de la vision, défauts de l'œil, pouvoir séparateur, puis loupe, microscope, lunette astronomique et lunette terrestre."
sidebar_position: 3
---

## Œil et vision

### L'accommodation

Pour avoir une image nette, il faut que la distance focale $f'$ du cristallin varie pour que l'image $A'$ se forme sur la rétine, quelle que soit la position de l'objet $A$ :

$$
\frac{1}{\overline{OA'}} - \frac{1}{\overline{OA}} = \frac{1}{f'} = (n - 1)\left(\frac{1}{R_1} - \frac{1}{R_2}\right)
$$

Pour un œil emmétrope :

**Œil au repos :** vision nette à une distance $D_M$ (infinie), c'est le punctum remotum.

**Fatigue maximale :** vision nette à une distance $D_m$ (20 cm), c'est le punctum proximum.

### Équation de la vision

Soit $A$ un objet situé à la distance $D$ de l'œil ; on pose $\dfrac{1}{f'} = C$ et $\overline{OA'} = \dfrac{1}{K}$.

$$
C - \frac{1}{D} = K
$$

**Œil au repos :** $C_0 - \dfrac{1}{D_M} = K$.

**Accommodation maximale :** $C_0 + \Delta C - \dfrac{1}{D_m} = K$.

Avec l'amplitude dioptrique $\Delta C$ :

$$
\Delta C = \frac{1}{D_m} - \frac{1}{D_M}
$$

### Les défauts optiques de l'œil

**Myope.** Au repos, $F'$ est situé devant la rétine ; ainsi, le PR est à distance finie et les objets lointains sont flous, le PP est situé plus près de l'œil. Pour le corriger, il faut ajouter une lentille divergente de focale $f'_1 = -D_M$ ; ainsi le PR est corrigé, et le PP aussi.

**Hypermétrope.** Au repos, $F'$ est situé derrière la rétine ; ainsi, le PR est virtuel et le PP est plus loin de l'œil. Pour le corriger, il faut accoler une lentille convergente de distance focale $f'_1 = -D_M$ ; ainsi le PR est corrigé, et le PP aussi.

**Presbytie.** Avec l'âge, l'amplitude dioptrique diminue : le PR reste à l'infini mais le PP s'éloigne progressivement. Correction par des verres convergents (verres progressifs).

**L'astigmatisme.** La cornée n'est pas parfaitement sphérique : il n'y a pas de mise au point simultanée possible sur les lignes verticales et horizontales.

### Pouvoir séparateur et pouvoir de résolution

Le pouvoir séparateur $\epsilon$ est la plus petite distance angulaire séparant deux points dont les images sont distinctes. Les points $A$ et $B$ sont résolus si $\alpha = \dfrac{AB}{D} > \epsilon$, avec $\dfrac{1}{\epsilon}$ l'acuité visuelle.

Le pouvoir de résolution $AB_{min}$ est la plus petite distance entre deux points résolus :

$$
AB_{min} = \epsilon \cdot D_m
$$

## Instruments d'optique

### Introduction

Il y a deux types d'IO : les objectifs (image réelle sur un écran) et les oculaires (image virtuelle rejetée à l'infini).

**Grossissement :** grandeur de l'image par rapport à celle de l'objet.

**Champ :** portion de l'espace vue à travers l'IO.

**Pouvoir séparateur :** distance angulaire entre les deux points les plus proches dont l'IO donne deux images distinctes.

**Clarté :** rendement photométrique.

### La loupe

**Principe.** La loupe est une lentille convergente de quelques centimètres de distance focale. L'image doit être agrandie et droite, donc l'objet $AB$ doit être placé entre le foyer objet $F$ et le centre optique $O$.

**Puissance et grossissement.**

$$
P = \frac{\alpha'}{\overline{AB}} = \frac{1}{f'}
$$

$$
G = \frac{\alpha'}{\alpha} = PD
$$

On définit le grossissement commercial, basé sur $D_m = 25\ \text{cm}$ :

$$
G_c = P_i D_m = \frac{P_i}{4}
$$

On définit la latitude de mise au point pour la loupe :

$$
l = \overline{A_R A_P} = \frac{f'^2}{D_m}
$$

### Le microscope

Même fonctionnement que la loupe, mais avec un grossissement nettement supérieur.

$$
P = -\frac{\overline{A_1 B_1}}{f'_2} \cdot \frac{1}{\overline{AB}} = -\frac{\gamma_1}{f'_2}
$$

$$
P = \frac{\Delta}{f'_1 f'_2}
$$

$$
G = -\frac{\overline{A_1 B_1}}{f'_2} \cdot \frac{d}{-\overline{AB}}
$$

$$
G = \gamma_1 G_2
$$

$$
l = \overline{A_R A_P} = \frac{f_2'^2}{D_m}
$$

### La lunette astronomique

L'objet est à l'infini, réel, très gros mais très loin, donc de très faible hauteur angulaire $\alpha$.

$$
G = \frac{\alpha'}{\alpha} = -\frac{f'_1}{f'_2}
$$

### La lunette terrestre

Avec une lunette astronomique, on perçoit l'image à l'envers ; pour l'utiliser sur terre, il faut donc insérer un montage pour la retourner.
