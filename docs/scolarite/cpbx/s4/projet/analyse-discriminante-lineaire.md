---
title: "Variances inter-classes et intra-classes"
description: "Annexe C du mémoire : outils mathématiques de l'analyse discriminante linéaire, variance inter-classes, variance intra-classe et critère de Fisher pour la matrice de passage."
sidebar_position: 11
---

Annexe C du mémoire : outils mathématiques pour la classification, détail du calcul des variances inter-classes et intra-classes.

L'objectif de cette annexe[^tharwat] est d'expliquer comment optimiser mathématiquement une classification LDA. On rappelle que, lors d'une telle classification, on souhaite maximiser la distance entre les moyennes des différentes classes tout en minimisant la dispersion à l'intérieur de chaque classe. Pour une classification comprenant deux classes, cela revient à optimiser (maximiser) l'expression suivante :

[^tharwat]: Tharwat, A. et al., *Linear discriminant analysis : a detailed tutorial*, ResearchGate, 2017.

$$
\frac{(\mu_1 - \mu_2)^2}{(s_1)^2 + (s_2)^2}
$$

où $\mu_1$ et $\mu_2$ représentent respectivement les moyennes de la 1ère et de la 2ème catégorie, et $s_1$ et $s_2$ représentent respectivement les dispersions dans la 1ère et dans la 2ème catégorie.

## Calcul de la distance entre les moyennes des classes : variance inter-classes $(S_b)$

On se place dans le cas non trivial d'un problème non binaire (nombre de classes à considérer supérieur à 2).

Le calcul de la variance inter-classes consiste à mesurer la distance entre les moyennes de chaque classe et un point central, moyenne de tous les échantillons.

On fait les hypothèses suivantes. Soit $X$ **la matrice des données** non classées : $X = x_1, x_2, \dots, x_N$, où $x_i$ représente le $i$-ème échantillon. Chaque échantillon est représenté par un nombre $M$ de caractéristiques ($x_i \in \mathbb{R}^M$). Visuellement, cela signifie que chaque $x_i$ est représenté par un point dans un espace à $M$ dimensions.

Le nombre de classes $c$ à différencier est fixé à $c = 3$. Cela revient à partitionner la matrice des données en 3 ensembles $X = [\omega_1, \omega_2, \omega_3]$. On suppose également que chacune des 3 classes contient un nombre d'échantillons égal à 5 ($n_1 = n_2 = n_3 = 5$). Le nombre total d'échantillons $N$ est alors donné par la somme suivante :

$$
N = \sum_{i=1}^{3} n_i
$$

La variance inter-classe est donnée par la formule suivante

$$
S_b = (W^T \mu_i - W^T \mu)^2 = W^T (\mu_i - \mu)(\mu_i - \mu)^T W \tag{C.1}
$$

où $W^T \mu_i$ représente la projection de chacune des moyennes des 3 classes, $W^T \mu$ représente la projection de la moyenne totale et $W$ représente la matrice de transformation du classifieur ($W^T$ sa transposée). Nous verrons grâce au critère de Fisher développé plus loin que cette matrice ne sert pas directement au calcul de la variance inter-classes ; cependant, on peut déduire $W$ du calcul des variances inter-classes et intra-classes (dispersion).

Les moyennes dans chacune des classes $\mu_j$ sont calculées selon la nature et le nombre des échantillons dans la classe :

$$
\mu_j = \frac{1}{n_j} \sum_{x_i \in \omega_j} x_i
$$

Les échantillons étant donnés sous forme matricielle ($x_i \in \mathbb{R}^M$), $\mu_j$ est également sous forme matricielle.

La moyenne totale $\mu$ est donnée par

$$
\mu = \frac{1}{N} \sum_{i=1}^{N} x_i
$$

Le terme $(\mu_i - \mu)(\mu_i - \mu)^T$ représente la distance entre la moyenne de la $i$-ème classe et la moyenne totale $(\mu)$. En d'autres termes, il s'agit de la variance inter-classe de la $i$-ème classe, $S_{b_i}$.

La variance inter-classe totale $(S_b)$ se déduit directement des variances inter-classes "partielles" $(S_{b_i})$, propres à chaque classe, et du nombre d'échantillons dans chaque classe $n_i$ :

$$
S_b = \sum_{i=1}^{c} n_i S_{b_i}
$$

## Calcul de la dispersion à l'intérieur de chaque classe : variance intra-classe $(S_w)$

Comme pour le calcul de la variance inter-classe, on va se servir des variances intra-classes "partielles" afin d'en déduire la variance intra-classe "totale". La variance intra-classe de la $j$-ème classe $(S_{w_j})$ représente la distance entre la moyenne propre à la classe et les échantillons de la classe. Elle est donnée par la formule suivante :

$$
S_{W_j} = \sum_{i=1}^{n_j} (x_{ij} - \mu_j)(x_{ij} - \mu_j)^T
$$

où $x_{ij}$ représente le $i$-ème échantillon de la $j$-ème classe.

La variance intra-classe totale est donnée par la somme des matrices représentant les variances intra-classes partielles :

$$
S_W = \sum_{i=1}^{3} S_{W_i} = \sum_{x_i \in \omega_1} (x_i - \mu_1)(x_i - \mu_1)^T + \sum_{x_i \in \omega_2} (x_i - \mu_2)(x_i - \mu_2)^T + \sum_{x_i \in \omega_3} (x_i - \mu_3)(x_i - \mu_3)^T
$$

## Critère de Fisher : calcul de la matrice de passage $W$, construction de l'espace de dimension réduite

On admet la relation suivante :

$$
S_B w = \lambda S_W w \tag{C.2}
$$

où $w$ désigne une colonne de la matrice de passage $(W)$ et $\lambda$ la valeur propre associée. Si $S_W$ est inversible, la relation s'écrit $S_W^{-1} S_B w = \lambda w$ : les colonnes de $W$ sont les vecteurs propres de $S_W^{-1} S_B$.

La solution du problème (C.2) est obtenue en calculant les valeurs propres et les vecteurs propres correspondants.

Les vecteurs propres nous renseignent sur les directions du nouvel espace créé par la LDA ; ils représentent les axes de ce nouvel espace. Les valeurs propres associées donnent un ordre d'importance à ces vecteurs : elles pondèrent l'espace LDA en donnant plus d'importance aux vecteurs ayant la plus grande capacité à discriminer les classes, c'est-à-dire ceux qui permettent d'augmenter la variance inter-classe et de diminuer la variance intra-classe de manière optimale. Cette pondération est essentielle car elle permet de construire l'espace de moindre dimension en ne se servant que des vecteurs les plus "efficaces", les vecteurs les moins efficaces étant négligés.
