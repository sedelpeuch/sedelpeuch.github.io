---
title: "Fiche : séries de Fourier"
description: "Fiche de synthèse sur les séries de Fourier : coefficients, somme partielle, produit scalaire, régularisée, convergence en moyenne quadratique, Parseval, Bessel, fonctions T-périodiques, convergence normale et Dirichlet."
sidebar_position: 3
---

## Définition

**Calcul des coefficients de Fourier**

$$
c_n(f) = \frac{1}{2\pi} \int_{-\pi}^{\pi} f(x) e^{-inx}\,dx
$$

$$
a_n(f) = c_n + c_{-n}
\qquad
b_n(f) = i(c_n - c_{-n})
$$

**Somme partielle de Fourier**

$$
s_p(f)(x) = \sum_{n=-p}^{p} c_n(f) e^{inx}
$$

**Produit scalaire**

$$
(f|g) = \frac{1}{2\pi} \int_{-\pi}^{\pi} \overline{f(t)}\, g(t)\,dt
\qquad
\|f\|_2^2 = \frac{1}{2\pi} \int_{-\pi}^{\pi} |f(t)|^2\,dt
$$

**Régularisée**

$$
f_r(x) = \frac{f(x^+) + f(x^-)}{2}
$$

## Convergence en moyenne quadratique

**Convergence en moyenne quadratique.** Si $f \in \mathcal{C}_{2\pi}$ alors $(s_p(f))_p \to f$, alors

$$
\lim_{p \to +\infty} \|s_p(f)\|_2^2 = \|f\|_2^2
$$

**Parseval**

$$
\|f\|_2^2 = \sum_{n=-\infty}^{\infty} |c_n(f)|^2
$$

**Inégalité de Bessel**

$$
\sum_{n=-p}^{p} |c_n(f)|^2 \leq \|f\|_2^2
$$

## Fonctions $T$-périodiques

$$
c_n = \frac{1}{T} \int_{a}^{a + T} f(t) e^{-\frac{2i\pi}{T} nt}\,dt
$$

$$
a_n = \frac{2}{T} \int_{a}^{a + T} f(t) \cos\left(\frac{2\pi}{T} nt\right) dt
\qquad
b_n = \frac{2}{T} \int_{a}^{a + T} f(t) \sin\left(\frac{2\pi}{T} nt\right) dt
$$

## Convergence normale

Soit $f$ $2\pi$-périodique, continue et $C^1$ par morceaux, alors

$$
c_0(f) + \sum_{n=1}^{+\infty} \left[c_n(f) e_n + c_{-n}(f) e_{-n}\right] \to f
$$

**Dirichlet**

$$
f_r(x) = c_0(f) + \sum_{n=1}^{+\infty} c_n(f) e^{inx} + c_{-n}(f) e^{-inx}
$$
