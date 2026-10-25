---
title: "Exercices : séries de Fourier"
description: "Énoncés des travaux dirigés sur les séries de Fourier : coefficients de Fourier et trigonométriques, formule de Parseval, théorèmes de convergence normale et simple, calcul de sommes de séries numériques."
sidebar_position: 5
sidebar_custom_props:
  kind: td
---

Énoncés des exercices auxquels renvoie le cours sur les [séries de Fourier](./series-de-fourier.md).

## Exercice 1

Calculer les coefficients de Fourier de $f$, $a \in \mathbb{C}$, $f$ $2\pi$-périodique sur $\mathbb{R}$, définie sur $]-\pi, \pi]$ par

$$
f(x) = \begin{cases} \exp(ax) & \text{si } x \in ]-\pi, \pi[ \\ \operatorname{ch}(a\pi) & \text{si } x = \pi \end{cases}
$$

## Exercice 2

Déterminer les coefficients trigonométriques de la fonction $f$, $2\pi$-périodique sur $\mathbb{R}$, définie sur $]-\pi, \pi]$ par $f(x) = \operatorname{ch}(ax)$, dans les deux cas suivants :

1. $a \in i\mathbb{Z}$ ;
2. $a \in \mathbb{R}^{+*}$.

## Exercice 3

1. Peut-on appliquer la formule de Parseval aux fonctions $f$ des exercices 1 et 2 ?
2. Pour chacune de ces fonctions, quelles égalités obtient-on ?
3. Quelles égalités remarquables peut-on déduire ?

## Exercice 4

1. Peut-on appliquer le théorème de convergence normale aux fonctions $f$ ?
2. Peut-on appliquer le théorème de convergence simple aux fonctions $f$ ?
3. Pour chacune de ces fonctions, quelles égalités obtient-on ?
4. Quelles égalités remarquables peut-on déduire ?

## Exercice 5

1. Déterminer les coefficients trigonométriques de la fonction $T$-périodique $f$ définie par

   $$
   f(x) = \left|\sin\left(\frac{\pi}{T} x\right)\right|
   $$

2. Quels théorèmes de convergence peut-on appliquer à la série de Fourier de $f$ ?

## Exercice 6

Soit $f \in \mathcal{CM}_{2\pi}$ définie par $\forall x \in ]-\pi, \pi]$, $f(x) = \dfrac{\pi - x}{2}$.

1. Calculer les coefficients de Fourier de $f$.
2. Calculer les coefficients trigonométriques de $f$.
3. On note $(S_p)_{p \in \mathbb{N}}$ la suite des sommes partielles de la série de Fourier de $f$. Calculer $S_p(f)(\pi)$. Est-ce que $S_p(f)(\pi) \to f(\pi)$ lorsque $p \to +\infty$ ? Pourquoi ?
4. Calculer la valeur de la série numérique $\displaystyle\sum_{n=0}^{+\infty} \frac{(-1)^n}{2n + 1}$ à partir de $S_p(f)$.
5. En appliquant la formule de Parseval, en déduire la valeur de la série numérique $\displaystyle\sum_{n=1}^{+\infty} \frac{1}{n^2}$.

## Exercice 7

$\forall x \in \mathbb{R}$

$$
f(x) = x - E(x)
$$

1. Déterminer la plus petite période de $f(x)$.
2. Calculer les coefficients de Fourier et les coefficients trigonométriques de $f$.
3. Quels théorèmes de convergence peut-on appliquer ?
