---
title: "Entropie et second principe"
description: "Approche statistique de l'équilibre, entropie de Boltzmann, détente de Joule-Gay-Lussac, identité thermodynamique, sens des transferts thermiques et deuxième principe."
sidebar_position: 3
---

## Introduction

Le premier principe de la thermodynamique traduit une conservation. Il ne donne aucune information sur la réversibilité de la transformation.

On définit donc une nouvelle variable d'état, l'entropie, ce qui amène le second principe : l'évolution.

## Équilibre

Lors des transformations d'énergie, l'énergie interne dépend des variables extensives.

Grâce à la méthode de Boltzmann, on a une simplification considérable lors du passage de l'échelle atomique à l'échelle macroscopique.

1. L'état microscopique est inobservable car la mesure est une moyenne ($t_{mesure} = 10^{-3}\ \text{s}$, système : $10^7$ états).
2. Les variables d'état sont stationnaires à l'équilibre.
3. La répartition de la matière est uniforme (ergodicité).

Le nombre total d'états est :

$$
\Omega = \Omega_{EN} \Omega_{Pos} = cte \cdot T^{\frac{3N}{2}} \cdot C_{N_0}^{N}
$$

où

$$
C_{N_0}^{N} \sim \left(\frac{N_0}{N}\right)^N = \left(\frac{V}{N v_0}\right)^N
$$

## Entropie

L'entropie est directement liée au désordre du système, lui-même lié à $\Omega$ (plus le nombre d'états est grand, moins le système est ordonné). Ainsi :

$$
S = k_B \ln(\Omega) = f(U, V, N)
$$

en $\text{J.K}^{-1}$.

### Détente de Joule-Gay-Lussac

Lorsqu'on relâche une contrainte dans un système isolé, il se produit une transformation irréversible qui produit une augmentation de l'entropie. Autrement dit, l'entropie est maximale pour l'état d'équilibre naturel. De plus, si le système est isolé et subit une transformation réversible, on a $dS_{isol} = 0$.

### Identité thermodynamique

On définit la température thermodynamique $T = \left(\dfrac{\partial U}{\partial S}\right)$. On a donc :

$$
dU = -P\,dV + T\,dS + \mu\,dN
$$

### Sens de transfert de la chaleur

La chaleur est toujours transférée du chaud vers le froid.

### Deuxième principe

La chaleur ne passe jamais spontanément d'un corps froid à un corps chaud ; ainsi, le deuxième principe peut s'énoncer de la manière suivante : la variation d'entropie d'un système lors d'une transformation est la somme de l'entropie créée et de l'entropie échangée lors d'un échange de chaleur avec l'extérieur.

$$
\Delta S = \Delta S^C + \Delta S^E
$$

Une transformation sera qualifiée d'isentropique si elle est réversible et adiabatique. On peut aussi dire que $\Delta S_{univers} = \Delta S^C \geq 0$.

L'entropie est une quantité qui augmente, contrairement à l'énergie qui se conserve de façon globale.
