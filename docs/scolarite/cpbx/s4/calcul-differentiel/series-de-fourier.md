---
title: "Séries de Fourier"
description: "Séries de Fourier des fonctions 2π-périodiques : polynômes trigonométriques, coefficients de Fourier et trigonométriques, convergence en moyenne quadratique, formule de Parseval, inégalité de Bessel, convergence normale et théorème de Dirichlet."
sidebar_position: 2
---

## Introduction

blabla (vous moquez pas il a vraiment marqué ça)

**Vocabulaire.** Signal "monochromatique"

$$
s(t) = \alpha \cos(\omega t + \phi)
$$

avec $|\alpha| = \max |s(t)|$ l'amplitude, $\omega$ la pulsation, $a = \dfrac{2\pi}{\omega}$, $\lambda = \dfrac{1}{a}$ et $\phi$ la phase.
Généralisation en écriture complexe

$$
z(t) = \alpha e^{i(\omega t + \phi)} = \beta e^{2 i \pi \lambda t}
$$

## Série de Fourier d'une fonction $2\pi$-périodique

**Notation.** On note $\mathcal{CM}_{2\pi}$ l'espace vectoriel des fonctions continues par morceaux de $\mathbb{R} \to \mathbb{C}$, $2\pi$-périodiques.

### Polynômes trigonométriques

**Définition.** On définit les suites de fonctions $(l_n)_{n \in \mathbb{Z}}$, $(r_n)_{n \in \mathbb{Z}}$ et $(s_n)_{n \in \mathbb{Z}}$ par :

$$
l_n : \begin{cases} \mathbb{R} \to \mathbb{C} \\ t \mapsto e^{int} \end{cases}
\qquad
r_n : \begin{cases} \mathbb{R} \to \mathbb{C} \\ t \mapsto \cos(nt) \end{cases}
\qquad
s_n : \begin{cases} \mathbb{R} \to \mathbb{C} \\ t \mapsto \sin(nt) \end{cases}
$$

On note $\mathcal{P}_n$ les sous-espaces vectoriels de $\mathcal{CM}_{2\pi}$ engendrés par $\{l_k, -n \leq k \leq n\}$.

**Proposition.** Pour tout $n \in \mathbb{N}$, on a

1. $\mathcal{P}_n = \operatorname{Vect}\{r_0, r_1, \dots, r_n, s_1, s_2, \dots, s_n\}$ ;
2. $\dim \mathcal{P}_n = 2n + 1$.

*Démonstration.* Pour le 2), on montre que la famille $\{l_k, -n \leq k \leq n\}$ est libre : $\forall t \in \mathbb{R}$, $\displaystyle\sum_{k=-n}^{n} \lambda_k l_k(t) = 0 \Rightarrow \forall k = -n, \dots, n, \ \lambda_k = 0$.

**Définition.** L'ensemble $\displaystyle\bigcup_{n \in \mathbb{N}} \mathcal{P}_n$ est appelé ensemble des polynômes trigonométriques. Un polynôme trigonométrique $P$ peut s'écrire sous la forme :

$$
P = \sum_{k=-n}^{n} \alpha_k l_k = \alpha_0 + \sum_{k=1}^{n} (\alpha_k + \alpha_{-k}) r_k + i(\alpha_k - \alpha_{-k}) s_k
$$

### Coefficients de Fourier d'une fonction $2\pi$-périodique

**Définition.** Soit $f \in \mathcal{CM}_{2\pi}$. Pour tout $n \in \mathbb{Z}$ on pose

$$
c_n(f) = \frac{1}{2\pi} \int_{-\pi}^{\pi} f(t) e^{-int}\,dt = \frac{1}{2\pi} \int_{a}^{a + 2\pi} f(t) e^{-int}\,dt \qquad \forall a \in \mathbb{R}
$$

Les coefficients $c_n(f)$ sont appelés coefficients de Fourier de $f$. Le coefficient $c_0(f)$ représente la valeur moyenne de $f$ sur une période.

**Remarque.** Si $f$ est un polynôme trigonométrique $\sum \alpha_k l_k$ alors $c_k = \alpha_k$.

**Proposition.** Soit $f \in \mathcal{CM}_{2\pi}$. On a

1. $\forall n \in \mathbb{Z}$, $\overline{c_n(f)} = c_{-n}(\overline{f})$ ;
2. soit $g(t) = f(-t)$, alors $g \in \mathcal{CM}_{2\pi}$ et on a $c_n(g) = c_{-n}(f)$. Si $f$ est paire alors $c_n(f) = c_{-n}(f)$. Si $f$ est impaire alors $c_n(f) = -c_{-n}(f)$ ;
3. la suite $|c_n(f)| \leq \displaystyle\sup_{t \in \mathbb{R}} |f(t)|$.

**Remarque.** Soit $f$ continue, $2\pi$-périodique et $C^k$ par morceaux sur $\mathbb{R}$, alors

$$
c_n(f^{(k)}) = i^k n^k c_n(f)
$$

*Démonstration.* Intégration par parties.

### Coefficients trigonométriques

**Définition.** Soit $f \in \mathcal{CM}_{2\pi}$. On appelle coefficients trigonométriques de $f$ les coefficients

$$
\forall n \in \mathbb{N}, \ a_n(f) = \frac{1}{\pi} \int_{-\pi}^{\pi} f(t) \cos(nt)\,dt
\qquad
\forall n \in \mathbb{N}^*, \ b_n(f) = \frac{1}{\pi} \int_{-\pi}^{\pi} f(t) \sin(nt)\,dt
$$

**Proposition.** Soit $f \in \mathcal{CM}_{2\pi}$.

1. $a_n(f) = c_n(f) + c_{-n}(f)$ ;
2. $b_n(f) = i(c_n(f) - c_{-n}(f))$ ;
3. si $f$ est impaire alors $a_n(f) = 0$ ;
4. si $f$ est continue, $2\pi$-périodique et $C^1$ par morceaux sur $\mathbb{R}$ : $\forall n \in \mathbb{N}^*$, $a_n(f') = n b_n(f)$ et $b_n(f') = -n a_n(f)$.

*[Exercice 1](./exercices-series-de-fourier.md)*

## Séries de Fourier

**Définition.** Soit $f \in \mathcal{CM}_{2\pi}$. On appelle série de Fourier de $f$ la série de fonctions de $\mathbb{R}$ dans $\mathbb{C}$

$$
\sum_{n \in \mathbb{Z}} c_n(f) l_n = \frac{a_0(f)}{2} + \sum_{n=1}^{\infty} a_n(f) r_n + b_n(f) s_n
$$

Si on note $(s_p)_{p \in \mathbb{N}}$ la suite des sommes partielles de cette série de fonctions, on a

$$
\forall x \in \mathbb{R}, \forall p \in \mathbb{N}, \ s_p(f)(x) = \sum_{n=-p}^{p} c_n(f) e^{inx} = \frac{a_0(f)}{2} + \sum_{n=1}^{p} \big(a_n(f) \cos(nx) + b_n(f) \sin(nx)\big)
$$

## Convergence en moyenne quadratique

### L'espace $\mathcal{C}_{2\pi}$

**Définition.** L'espace vectoriel des fonctions continues et $2\pi$-périodiques de $\mathbb{R}$ dans $\mathbb{C}$ est noté $\mathcal{C}_{2\pi}$. C'est un sous-espace vectoriel de $\mathcal{CM}_{2\pi}$.

**Définition.** Pour tous $f$ et $g$ dans $\mathcal{C}_{2\pi}$, on définit

$$
(f|g) = \frac{1}{2\pi} \int_{-\pi}^{\pi} \overline{f(t)}\, g(t)\,dt
$$

c'est un produit scalaire de $\mathcal{C}_{2\pi} \times \mathcal{C}_{2\pi}$ dans $\mathbb{C}$. La norme associée est notée $\|.\|_2$.

$$
\forall f \in \mathcal{C}_{2\pi}, \ \|f\|_2^2 = \frac{1}{2\pi} \int_{-\pi}^{\pi} |f(t)|^2\,dt
$$

**Proposition.** La famille $(e_n)_{n \in \mathbb{Z}}$ est une famille orthonormale de $\mathcal{C}_{2\pi}$. Pour tout $f \in \mathcal{C}_{2\pi}$, on a

$$
c_n(f) = (e_n | f) \quad \forall n \in \mathbb{Z}
$$

### Convergence dans $\mathcal{C}_{2\pi}$

**Définition.** Soit $p \in \mathbb{N}^*$. On note $\mathcal{P}_p$ le sous-espace vectoriel de $\mathcal{C}_{2\pi}$ engendré par $(e_n)_{-p \leq n \leq p}$.

**Proposition.** Soit $f \in \mathcal{C}_{2\pi}$ et soit $(s_p(f))_{p \in \mathbb{N}}$ la suite des sommes partielles de la série de Fourier de $f$. Pour tout $p \in \mathbb{N}^*$, $S_p(f)$ est la projection de $f$ sur $\mathcal{P}_p$. En particulier, on a :

$$
\|f\|_2^2 = \|S_p(f)\|_2^2 + \|f - S_p(f)\|_2^2 \tag{1}
$$

*Démonstration.* $\mathcal{P}_p$ est un sous-espace vectoriel de dimension finie de $\mathcal{C}_{2\pi}$. On note $q(f)$ la projection de $f$ sur $\mathcal{P}_p$. $(e_n)_{-p \leq n \leq p}$ est une famille orthonormale, génératrice, libre : c'est une base orthonormale de $\mathcal{P}_p$.

$$
\begin{aligned}
q(t) &= \sum_{n=-p}^{p} (e_n | f) e_n \\
&= \sum_{n=-p}^{p} c_n(f) e_n \\
&= s_p(f)
\end{aligned}
$$

**Théorème II.1.** (Convergence en moyenne quadratique) Soit $f \in \mathcal{C}_{2\pi}$. Alors la suite $(S_p(f))_p$ converge vers $f$ dans l'espace vectoriel normé $(\mathcal{C}_{2\pi}, \|.\|_2)$

$$
\lim_{p \to +\infty} \|f - S_p(f)\|_2 = 0
$$

**Théorème II.2.** (Formule de Parseval) Soit $f \in \mathcal{C}_{2\pi}$

$$
\|f\|_2^2 = \frac{1}{2\pi} \int_{-\pi}^{\pi} |f(t)|^2\,dt = \sum_{n=-\infty}^{+\infty} |c_n(f)|^2 = \left|\frac{a_0(f)}{2}\right|^2 + \frac{1}{2} \sum_{n=1}^{+\infty} |a_n(f)|^2 + |b_n(f)|^2
$$

où $\displaystyle\sum_{n=-\infty}^{+\infty} |c_n(f)|^2 = \lim_{p \to +\infty} \sum_{n=-p}^{p} |c_n(f)|^2$.

*Démonstration.* Calculons

$$
\begin{aligned}
\|s_p(f)\|_2^2 &= \Big\| \sum_{n=-p}^{p} (e_n | f) e_n \Big\|_2^2 \\
&= \sum_{n=-p}^{p} |c_n(f)|^2 \\
&= \left|\frac{a_0(f)}{2}\right|^2 + \frac{1}{2} \sum_{n=1}^{p} |a_n(f)|^2 + |b_n(f)|^2
\end{aligned}
$$

On applique $(1)$, on déduit que $\|S_p(f)\|_2^2 \leq \|f\|_2^2 \ \forall p \in \mathbb{N}$.
Donc les suites $\left(\sum_{n=-p}^{p} |c_n(f)|^2\right)_p$, $\left(\sum_{n=1}^{p} |a_n(f)|^2\right)_p$ et $\left(\sum_{n=1}^{p} |b_n(f)|^2\right)_p$ sont majorées. Or elles sont croissantes. Elles sont donc convergentes. On passe à la limite dans $(1)$ quand $p \to +\infty$ : comme $\displaystyle\lim_{p \to +\infty} \|f - S_p(f)\|_2^2 = 0$, on obtient le résultat.

**Théorème II.3.** (Inégalités de Bessel)

$$
\sum_{n=-p}^{p} |c_n(f)|^2 \leq \|f\|_2^2
$$

$$
\left|\frac{a_0(f)}{2}\right|^2 + \frac{1}{2} \sum_{n=1}^{p} |a_n(f)|^2 + |b_n(f)|^2 \leq \|f\|_2^2
$$

**Corollaire.** L'application

$$
\begin{aligned}
\mathcal{C}_{2\pi} &\to \{u : \mathbb{Z} \to \mathbb{C}\} \\
f &\mapsto (c_n(f))_{n \in \mathbb{Z}}
\end{aligned}
$$

est injective.

*Démonstration.* Soient $f$ et $g$ dans $\mathcal{C}_{2\pi}$ telles que $(c_n(f))_n = (c_n(g))_n$.
$\forall n \in \mathbb{Z}, c_n(f) = c_n(g)$, donc $\forall n \in \mathbb{Z}, c_n(f - g) = 0$.
Donc

$$
\|f - g\|_2^2 = \sum_{n=-\infty}^{+\infty} |c_n(f - g)|^2 = 0
$$

donc $f - g = 0$.

**Corollaire.** Soient $f$ et $g$ dans $\mathcal{C}_{2\pi}$. Le produit scalaire de $f$ et $g$ peut s'exprimer à l'aide de leurs coefficients de Fourier

$$
(f|g) = \sum_{n=-\infty}^{+\infty} \overline{c_n(f)}\, c_n(g)
$$

*[Exercice 2](./exercices-series-de-fourier.md)*

### Extension à $\mathcal{CM}_{2\pi}$

**Définition.** Soit $f \in \mathcal{CM}_{2\pi}$. On définit la fonction régularisée de $f$, notée $f_r \in \mathcal{CM}_{2\pi}$, par $\forall x \in \mathbb{R}$, $f_r(x) = \dfrac{f(x^+) + f(x^-)}{2}$ où $f(x^+)$ et $f(x^-)$ sont respectivement les limites à droite et à gauche de $f$ en $x$. En particulier, si $f$ est continue en $x$, $f(x) = f_r(x)$.

**Remarque.** Le nombre de points où $f$ et $f_r$ sont différentes est fini. Donc

$$
\|f_r\|_2 = \|f\|_2
$$

**Définition.** On introduit le sous-espace vectoriel $\mathcal{D}_{2\pi}$ de $\mathcal{CM}_{2\pi}$ constitué des fonctions $f$ vérifiant $f = f_r$.

**Proposition.** L'application

$$
\begin{aligned}
\mathcal{D}_{2\pi} \times \mathcal{D}_{2\pi} &\to \mathbb{C} \\
(f, g) &\mapsto (f|g) = \frac{1}{2\pi} \int_{-\pi}^{\pi} \overline{f(t)}\, g(t)\,dt
\end{aligned}
$$

est un produit scalaire sur $\mathcal{D}_{2\pi}$. La norme associée est encore notée $\|.\|_2$.

$$
\|f\|_2^2 = \frac{1}{2\pi} \int_{-\pi}^{\pi} |f(t)|^2\,dt = (f|f)
$$

Le théorème de convergence en moyenne quadratique est exact dans $\mathcal{D}_{2\pi}$. Donc pour $f \in \mathcal{CM}_{2\pi}$

$$
\lim_{p \to +\infty} \|f_r - S_p(f_r)\|_2 = 0
$$

$$
\lim_{p \to +\infty} \|S_p(f_r)\|_2^2 = \|f_r\|_2^2 = \|f\|_2^2
$$

**Théorème II.4.** (Parseval)

$$
\begin{aligned}
\|f_r\|_2^2 = \frac{1}{2\pi} \int_{-\pi}^{\pi} |f_r(t)|^2\,dt &= \frac{1}{2\pi} \int_{-\pi}^{\pi} |f(t)|^2\,dt \\
&= \sum_{n=-\infty}^{+\infty} |c_n(f_r)|^2 = \sum_{n=-\infty}^{+\infty} |c_n(f)|^2 \\
&= \left|\frac{a_0(f_r)}{2}\right|^2 + \frac{1}{2} \sum_{n=1}^{+\infty} |a_n(f_r)|^2 + |b_n(f_r)|^2 \\
&= \left|\frac{a_0(f)}{2}\right|^2 + \frac{1}{2} \sum_{n=1}^{+\infty} |a_n(f)|^2 + |b_n(f)|^2
\end{aligned}
$$

## Convergence ponctuelle

### Convergence normale de la série de Fourier

**Théorème II.5.** Soit $f$ une fonction $2\pi$-périodique, continue et $C^1$ par morceaux sur $\mathbb{R}$. Alors la série de fonctions (série de Fourier de $f$) $c_0(f) + \displaystyle\sum_{n=1}^{+\infty} c_n(f) e_n + c_{-n}(f) e_{-n}$ converge normalement vers $f$ sur $\mathbb{R}$.

*Démonstration.* (Convergence normale sur $\mathbb{R}$) Étudions $\|c_n(f) e_n + c_{-n} e_{-n}\|_\infty$

$$
\|c_n(f) e_n + c_{-n} e_{-n}\|_\infty = \sup_{x \in \mathbb{R}} |c_n(f) e^{inx} + c_{-n} e^{-inx}| \leq |c_n(f)| + |c_{-n}|
$$

$\forall n \in \mathbb{Z}^*$, on a

$$
c_n(f') = in\, c_n(f)
$$

donc $|c_n(f)| = \left|\dfrac{c_n(f')}{n}\right| \leq \dfrac{1}{2}\left(\dfrac{1}{n^2} + |c_n(f')|^2\right)$.
D'où

$$
\|c_n(f) e_n + c_{-n} e_{-n}\|_\infty \leq \frac{1}{n^2} + \frac{1}{2}\left(|c_n(f')|^2 + |c_{-n}(f')|^2\right)
$$

Comme $f' \in \mathcal{CM}_{2\pi}$, les séries numériques $\sum |c_n(f')|^2$ et $\sum |c_{-n}(f')|^2$ convergent. $\sum \dfrac{1}{n^2}$ converge aussi, donc $\displaystyle\sum_{n=1}^{\infty} c_n(f) e_n + c_{-n} e_{-n}$ converge normalement sur $\mathbb{R}$.

*Démonstration.* (La limite est $f$) Il faut montrer que la limite est $f$. Soit $S$ cette limite

$$
S(t) = c_0(f) + \sum_{n=1}^{\infty} c_n(f) e_n(t) + c_{-n} e_{-n}(t)
$$

Montrons que $S = f$. Comme on a la convergence normale et comme $c_n(f) e_n + c_{-n} e_{-n}$ est continue, on en déduit que $S$ est continue. Par construction, $S$ est $2\pi$-périodique donc $S \in \mathcal{C}_{2\pi}$. On peut calculer ses coefficients de Fourier

$$
\begin{aligned}
c_k(S) &= \frac{1}{2\pi} \int_{-\pi}^{\pi} S(t) e^{-ikt}\,dt \\
&= \frac{1}{2\pi} \int_{-\pi}^{\pi} \Big[c_0(f) + \sum_{n=1}^{\infty} c_n(f) e_n(t) + c_{-n}(f) e_{-n}(t)\Big] e^{-ikt}\,dt \\
&= \frac{1}{2\pi} c_0(f) \int_{-\pi}^{\pi} e^{-ikt}\,dt + \frac{1}{2\pi} \sum_{n=1}^{\infty} c_n(f) \int_{-\pi}^{\pi} e^{i(n-k)t}\,dt + \frac{1}{2\pi} \sum_{n=1}^{\infty} c_{-n}(f) \int_{-\pi}^{\pi} e^{-i(n+k)t}\,dt
\end{aligned}
$$

On trouve donc $c_k(S) = c_k(f) \ \forall k \in \mathbb{Z}$. Donc $S$ et $f$ sont deux applications de $\mathcal{C}_{2\pi}$ ayant les mêmes coefficients de Fourier, donc $S = f$.

### Convergence de la série de Fourier

**Théorème II.6.** (Dirichlet) Soit $f$ une fonction $2\pi$-périodique et $C^1$ par morceaux sur $\mathbb{R}$. Alors la série de Fourier de $f$, $c_0(f) + \displaystyle\sum_{n=1}^{\infty} c_n(f) e_n + c_{-n}(f) e_{-n}$, converge simplement sur $\mathbb{R}$ et sa somme est égale à la fonction régularisée $f_r$ de $f$ : $\forall x \in \mathbb{R}$

$$
\begin{aligned}
f_r(x) = \frac{f(x^+) + f(x^-)}{2} &= c_0(f) + \sum_{n=1}^{\infty} c_n(f) e^{inx} + c_{-n}(f) e^{-inx} \\
&= \frac{a_0(f)}{2} + \sum_{n=1}^{\infty} a_n(f) \cos(nx) + b_n(f) \sin(nx)
\end{aligned}
$$

En particulier, si $f$ est continue en $x$ alors

$$
\begin{aligned}
f(x) &= c_0(f) + \sum_{n=1}^{\infty} c_n(f) e^{inx} + c_{-n}(f) e^{-inx} \\
&= \frac{a_0(f)}{2} + \sum_{n=1}^{\infty} a_n(f) \cos(nx) + b_n(f) \sin(nx)
\end{aligned}
$$

**Remarque.** Cas des fonctions $T$-périodiques : $\forall n \in \mathbb{Z}$ on a

$$
c_n(f) = \frac{1}{T} \int_{a}^{a + T} f(t) e^{-\frac{2i\pi}{T} nt}\,dt
$$

$$
a_n(f) = \frac{2}{T} \int_{a}^{a + T} f(t) \cos\left(\frac{2\pi}{T} nt\right) dt
\qquad
b_n(f) = \frac{2}{T} \int_{a}^{a + T} f(t) \sin\left(\frac{2\pi}{T} nt\right) dt
$$
