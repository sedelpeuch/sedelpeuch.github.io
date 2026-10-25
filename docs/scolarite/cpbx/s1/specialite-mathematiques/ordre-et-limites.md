---
title: "Fonctions numériques : ordre et limites"
description: "Fonctions numériques de variable réelle : sup et inf de fonctions, fonctions lipschitziennes et contractantes, sens de variation, bornes de l'ensemble image, limites, opérations, équivalents, domination, négligeabilité et propriétés des limites liées à l'ordre."
sidebar_position: 3
---

## Notions liées à l'ordre "$\leq$"

### $\sup(f, g)$ ; $\inf(f, g)$

**Supérieur.** $f$ et $g$ étant deux fonctions $\mathbb{R} \to \mathbb{R}$ de même ensemble de définition $D$, $\sup(f, g) : \begin{cases} \mathbb{R} \to \mathbb{R} \\ x \mapsto \max(f(x), g(x)) \end{cases}$

**Inférieur.** $f$ et $g$ deux fonctions $\mathbb{R} \to \mathbb{R}$ de même ensemble de définition $D$, $\inf(f, g) : \begin{cases} \mathbb{R} \to \mathbb{R} \\ x \mapsto \min(f(x), g(x)) \end{cases}$

**Exemple.** $\sup(\sin, \cos)$ et $\inf(\sin, \cos)$ représentées sur $[-2\pi, 2\pi]$.

**Valeur absolue.** $f$ étant une fonction $\mathbb{R} \to \mathbb{R}$ d'ensemble de définition $D_f$, $|f| : \begin{cases} \mathbb{R} \to \mathbb{R} \\ x \mapsto |f|(x) = |f(x)| = \max(f(x), -f(x)) \end{cases}$, ainsi $|f| = \sup(f, -f)$.

### Fonctions lipschitziennes

**Fonction $f$ lipschitzienne de rapport $k$ sur un intervalle $U$ de $\mathbb{R}$.** $k$ étant un élément de $\mathbb{R}_+^*$, c'est toute fonction $f$ définie sur $U$, à valeurs réelles, telle que $\forall (x, x') \in U^2, |f(x) - f(x')| \leq k.|x - x'|$.

**Contraction sur $U$ (ou application contractante sur $U$).** C'est une fonction lipschitzienne sur $U$, de rapport $k \in ]0, 1[$. Elle est ainsi nommée parce que les images $f(x)$ et $f(x')$ sont toujours plus proches que $x$ et $x'$.

**Quatre formules de trigonométrie utiles.** $\forall (p, q) \in \mathbb{R}^2$ :

$$
\begin{aligned}
\cos(p) + \cos(q) &= 2\cos\left(\frac{p + q}{2}\right).\cos\left(\frac{p - q}{2}\right) &
\sin(p) + \sin(q) &= 2\sin\left(\frac{p + q}{2}\right).\cos\left(\frac{p - q}{2}\right) \\
\cos(p) - \cos(q) &= -2\sin\left(\frac{p + q}{2}\right).\sin\left(\frac{p - q}{2}\right) &
\sin(p) - \sin(q) &= 2\cos\left(\frac{p + q}{2}\right).\sin\left(\frac{p - q}{2}\right)
\end{aligned}
$$

Rappelons également que $\forall x \in \mathbb{R}, |\sin(x)| \leq |x|$.

**Exemple.** Sinus est 1-lipschitzienne sur $\left[0, \frac{\pi}{2}\right]$ mais elle est contractante sur $\left[\frac{\pi}{4}, \frac{\pi}{2}\right]$.

- Sur $\left[0, \frac{\pi}{2}\right]$ : $\forall (x, x') \in \left[0, \frac{\pi}{2}\right]^2$, on a

  $$
  |\sin(x) - \sin(x')| = \left|2\sin\left(\frac{x - x'}{2}\right).\cos\left(\frac{x + x'}{2}\right)\right| = 2\left|\sin\left(\frac{x - x'}{2}\right)\right|.\left|\cos\left(\frac{x + x'}{2}\right)\right| \leq 2.\left|\frac{x - x'}{2}\right|.1 = 1.|x - x'|
  $$

- Sur $\left[\frac{\pi}{4}, \frac{\pi}{2}\right]$ : $\forall (x, x') \in \left[\frac{\pi}{4}, \frac{\pi}{2}\right]^2$, on a

  $$
  |\sin(x) - \sin(x')| = \text{idem} = 2.\left|\sin\left(\frac{x - x'}{2}\right)\right|.\left|\cos\left(\frac{x + x'}{2}\right)\right| \leq 2.\left|\frac{x - x'}{2}\right|\frac{\sqrt{2}}{2} = \frac{\sqrt{2}}{2}.|x - x'| \quad \text{où } \frac{\sqrt{2}}{2} \in ]0, 1[
  $$

### Le sens de variation d'une fonction $f$ sur un intervalle $U$ inclus dans $D_f$

**Fonction $f$ croissante sur $U$.** Fonction $f$ définie sur $U$, telle que $\forall (x, x') \in U^2, x < x' \Rightarrow f(x) \leq f(x')$.

**Fonction $f$ strictement croissante sur $U$.** $f$ définie sur $U$, telle que $\forall (x, x') \in U^2, x < x' \Rightarrow f(x) < f(x')$.

**Fonction $f$ décroissante sur $U$.** Fonction $f$ définie sur $U$, telle que $\forall (x, x') \in U^2, x < x' \Rightarrow f(x) \geq f(x')$.

**Fonction $f$ strictement décroissante sur $U$.** $f$ définie sur $U$, telle que $\forall (x, x') \in U^2, x < x' \Rightarrow f(x) > f(x')$.

### Les bornes de l'ensemble image

Dans ce qui suit, $f$ est une fonction $\mathbb{R} \to \mathbb{R}$ d'ensemble de définition $D_f$ ; $U$ est une partie non vide de $D_f$.

- $f(U) = \{y \in \mathbb{R} / \exists x \in U, y = f(x)\} = \{f(x) / x \in U\}$.
- $\sup(f) = \sup(f(x)) = \sup(f(U))$, borne supérieure de l'ensemble $f(U)$.
- $\max(f) = \max(f(x)) = \max(f(U))$, plus grand élément de l'ensemble $f(U)$.
- $\min(f) = \min(f(x)) = \min(f(U))$, plus petit élément de l'ensemble $f(U)$.
- $\inf(f) = \inf(f(x)) = \inf(f(U))$, borne inférieure de l'ensemble $f(U)$.

**Exemples.** Pour $f : x \to \frac{1}{x}$ :

| $U =$ | $]0, 1]$ | $[1, 2]$ | $]2, +\infty[$ |
| --- | --- | --- | --- |
| $\sup(f)$ | . | $1$ | $\frac{1}{2}$ |
| $\max(f)$ | . | $1$ | . |
| $\min(f)$ | $1$ | $\frac{1}{2}$ | . |
| $\inf(f)$ | $1$ | $\frac{1}{2}$ | $0$ |

**Maximum local de $f$.** $f$ présente en $a$ un maximum local $M$ signifie que :

- $f$ est définie au moins sur un intervalle ouvert $U = ]a - \eta, a + \eta[$ ($\eta > 0$) ;
- $\max(f)$ existe et c'est $M = f(a)$ (c'est-à-dire $\forall x \in ]a - \eta, a + \eta[, f(x) \leq f(a) = M$).

**Minimum local de $f$.** $f$ présente en $a$ un minimum local $m$ signifie que :

- $f$ est définie au moins sur un intervalle ouvert $U = ]a - \eta, a + \eta[$ ($\eta > 0$) ;
- $\min(f)$ existe et c'est $m = f(a)$ (c'est-à-dire $\forall x \in ]a - \eta, a + \eta[, f(x) \geq f(a) = m$).

**Extrema locaux de $f$.** Ce sont les maxima et les minima locaux de $f$.

**Maximum absolu de $f$.** C'est, s'il existe, $\max(f)$.

**Minimum absolu de $f$.** C'est, s'il existe, $\min(f)$.

**Exercice.** Étudier l'existence d'extrema locaux ou absolus pour $f : \begin{cases} \mathbb{R} \to \mathbb{R} \\ x \mapsto |1 - x^2| \end{cases}$.

## Limites

### Limite d'une fonction $f$ en un réel $a$ ou en un infini

$a$ est un réel de $D_f$ ou une borne de $D_f$ pouvant ne pas appartenir à $D_f$.

$l = \lim\limits_a f = \lim\limits_{x \to a} f(x)$ signifie, pour l'élément $l$ de $\mathbb{R}$, qu'il est limite de $f$ en $a$, c'est-à-dire que $\forall \epsilon \in \mathbb{R}_+^*, d(f(x), l) < \epsilon$ dès que $x$ est assez proche de $a$, disons dans un intervalle $]a - \eta, a + \eta[$. Plus correctement, ceci s'exprime par

$$
\forall \epsilon \in \mathbb{R}_+^*, \exists \eta \in \mathbb{R}_+^*, \forall x \in D_f, |x - a| < \eta \Rightarrow |f(x) - l| < \epsilon
$$

**Critère de Cauchy.** Soit une suite de réels $(u_n)$ telle que

$$
\forall \epsilon > 0, \exists N, \forall n \geq N, |u_{n+q} - u_n| < \epsilon
$$

Alors $(u_n)$ converge (et réciproquement, si elle converge, elle vérifie cette propriété).

**Remarques.**

- Il n'est pas indispensable que $f$ soit définie en $a$ pour qu'elle y admette une limite. Pour $f : x \mapsto \dfrac{x^2}{x}$, $D_f = \mathbb{R}^*$, $a = 0$ en est une borne et $0 \notin D_f$, mais facilement $\lim\limits_0 f = 0$.
- Si $f$ est définie en $a$ et admet une limite en $a$, nécessairement $\lim\limits_a f = f(a)$. Ceci parce que $\forall \epsilon \in \mathbb{R}_+^*$, quel que soit le choix de $\eta$, pour $x = a$, $|x - a| < \eta$ est vrai, donc $|f(x) - l| < \epsilon$ aussi. Donc $\forall \epsilon \in \mathbb{R}_+^*, |f(a) - l| < \epsilon$, c'est-à-dire $f(a) = l$.
- Il se peut que $f$ soit définie en $a$ sans admettre de limite en $a$. C'est le cas pour $f$ définie par $f(x) = \dfrac{|x|}{x}$ si $x > 0$ et $f(0) = 0$. Même si pour $l = 1$, $\forall \epsilon \in \mathbb{R}_+^*$, pour $x > 0$, $|f(x) - l| = |1 - 1| = 0 < \epsilon$, lorsque $x = 0$, $|f(x) - l| = |f(0) - 1| = |0 - 1| = 1$ ne peut être rendu $< \epsilon$ si $\epsilon < 1$.
- Si $f$ admet en $a$ une limite $l$, cette limite (en $a$) est unique. Même type de raisonnement que pour la limite d'une suite.
- Toute fonction $f$ définie au moins sur un intervalle ouvert $U$ contenant $a$ et continue en $a$ vérifie $\lim\limits_a f = f(a)$.

$l = \lim\limits_{a^-} f = \lim\limits_{x \to a^-} f(x)$ signifie, pour l'élément $l$ de $\mathbb{R}$, qu'il est limite à gauche de $f$ en $a$. Cela signifie que $\forall \epsilon \in \mathbb{R}_+^*, d(f(x), l) < \epsilon$ dès que $x$ est assez proche de $a$ par valeurs inférieures, c'est-à-dire dans un intervalle $]a - \eta, a[$ dont $a$ est exclu. On exprime correctement cette notion par

$$
\forall \epsilon \in \mathbb{R}_+^*, \exists \eta \in \mathbb{R}_+^*, \forall x \in D_f, 0 < a - x < \eta \Rightarrow |f(x) - l| < \epsilon
$$

$l = \lim\limits_{a^+} f = \lim\limits_{x \to a^+} f(x)$ signifie, pour l'élément $l$ de $\mathbb{R}$, qu'il est limite à droite de $f$ en $a$. Cela signifie que $\forall \epsilon \in \mathbb{R}_+^*, d(f(x), l) < \epsilon$ dès que $x$ est assez proche de $a$ par valeurs supérieures, c'est-à-dire dans un intervalle $]a, a + \eta[$ dont $a$ est exclu. On exprime correctement cette notion par

$$
\forall \epsilon \in \mathbb{R}_+^*, \exists \eta \in \mathbb{R}_+^*, \forall x \in D_f, 0 < x - a < \eta \Rightarrow |f(x) - l| < \epsilon
$$

**Remarques.**

- Il n'est pas indispensable que $f$ soit définie en $a$ pour qu'elle y admette une limite à gauche ou une limite à droite. Pour $x \mapsto \dfrac{|x|}{x}$, $D_f = \mathbb{R}^*$, $a = 0$ en est une borne et $0 \notin D_f$ ; mais facilement $\lim\limits_{0^-} f = -1$ puisque pour $x < 0$, $f(x) = \dfrac{-x}{x} = -1$, et $\lim\limits_{0^+} f = +1$ puisque pour $x > 0$, $f(x) = \dfrac{x}{x} = 1$.
- Si $f$ est définie en $a$ et admet en $a$ une limite à gauche et une limite à droite, il se peut que ces limites soient différentes de $f(a)$. Pour $f : \dfrac{|x|}{x}$ si $x \neq 0$ et $f(0) = 0$, $D_f = \mathbb{R}$, $\lim\limits_{0^-} f = -1$, $\lim\limits_{0^+} f = +1$ et $f(0) = 0$.
- Si $f$ est définie au moins sur un intervalle ouvert $]a - \alpha, a + \alpha[$, $l$ étant un réel, on a l'équivalence :

  $$
  \left[\lim_a f = l\right] \Leftrightarrow \begin{cases} \lim\limits_{a^-} f = l \\ \lim\limits_{a^+} f = l \\ f(a) = l \end{cases}
  $$

- Si $f$ n'est, au voisinage de $a$, définie que sur une réunion $]a - \alpha, a[ \cup ]a, a + \alpha[$ et pas en $a$, $l$ étant un réel, on a l'équivalence :

  $$
  \left[\lim_a f = l\right] \Leftrightarrow \begin{cases} \lim\limits_{a^-} f = l \\ \lim\limits_{a^+} f = l \end{cases}
  $$

**Limite $l$ de $f$ en un infini.**

- $f$ étant une fonction définie au moins sur un intervalle de la forme $]\alpha, +\infty[$, $l$ étant un réel, $\lim\limits_{+\infty} f = \lim\limits_{x \to +\infty} f(x) = l$ signifie que

  $$
  \forall \epsilon \in \mathbb{R}_+^*, \exists A \in \mathbb{R}_+^*, \forall x \in D_f, x > A \Rightarrow |f(x) - l| < \epsilon
  $$

- $f$ étant une fonction définie au moins sur un intervalle de la forme $]-\infty, \alpha[$, $l$ étant un réel, $\lim\limits_{-\infty} f = \lim\limits_{x \to -\infty} f(x) = l$ signifie que

  $$
  \forall \epsilon \in \mathbb{R}_+^*, \exists A \in \mathbb{R}_+^*, \forall x \in D_f, x < -A \Rightarrow |f(x) - l| < \epsilon
  $$

**Exemples.** $\lim\limits_{x \to +\infty} \dfrac{1}{x} = 0$, $\lim\limits_{x \to -\infty} \dfrac{x}{x - 1} = 1$.

### Limites et opérations sur les fonctions

**8 propriétés à connaître.** $f$ et $g$ étant deux fonctions définies au moins sur un intervalle ouvert $U$ contenant $a$ ou ayant $a$ pour borne, $l$, $l'$ et $\lambda$ étant des éléments de $\mathbb{R}$ :

- $\lim\limits_a f = 0 \Leftrightarrow \lim\limits_a |f| = 0$ ;
- $\lim\limits_a f = l \Rightarrow \lim\limits_a |f| = |l|$ ;
- $\lim\limits_a f = l$ et $\lim\limits_a g = l' \Rightarrow \lim\limits_a f + g = l + l'$ ;
- $\lim\limits_a f = l \Leftrightarrow \lim\limits_a \lambda f = \lambda l$ si $\lambda \neq 0$ ;
- $\lim\limits_a f = 0$ et $g$ est bornée sur $U \Rightarrow \lim\limits_a f \times g = 0$ ;
- $\lim\limits_a f = l$ et $\lim\limits_a g = l' \Rightarrow \lim\limits_a f \times g = l \times l'$ ;
- $\forall x \in U, g(x) \neq 0$ et $\lim\limits_a g = l'$ et $l' \neq 0 \Rightarrow \lim\limits_a \dfrac{1}{g} = \dfrac{1}{l'}$ ;
- $\lim\limits_a f = l$ et $\forall x \in U, g(x) \neq 0$ et $\lim\limits_a g = l'$ et $l' \neq 0 \Rightarrow \lim\limits_a \dfrac{f}{g} = \dfrac{l}{l'}$.

**Remarque.** Ces propriétés s'étendent au cas où $a$ est un infini.

**Le cas de la composée de deux applications.** $a$ et $l$ étant des réels ou des infinis, si $f$, définie au moins sur $U$, intervalle contenant $a$ ou ayant $a$ pour borne, admet en $a$ une limite $l$, si $g$, définie au moins sur $V$, intervalle contenant $l$ ou ayant $l$ pour borne et tel que $f(U) \subset V$, admet en $l$ une limite $L$, alors $\lim\limits_a g \circ f = \lim\limits_{x \to a} g(f(x)) = L$.

### Comparaison de deux fonctions au voisinage d'un réel $a$ ou d'un infini

Les fonctions $f$ ou $g$ dont il est question ci-dessous sont des fonctions $\mathbb{R} \to \mathbb{R}$ supposées définies au moins sur un même intervalle ouvert $U$ contenant $a$ ou ayant $a$ pour borne ; $a$ est un réel ou un infini.

**Fonctions $f$ et $g$ équivalentes au voisinage de $a$.** Fonctions $f$ et $g$ pour lesquelles il existe une fonction $\beta$ définie sur $U$, telle que $\forall x \in U, f(x) = g(x) \times \beta(x)$ et $\lim\limits_{x \to a} \beta(x) = 1$.

**Notation usuelle.** $f \overset{a}{\sim} g$. On se permet également d'écrire $f(x) \overset{a}{\sim} g(x)$.

**Exemples.** $\ln(1 + x) \overset{0}{\sim} x$ car $\ln(1 + x) = x \times \beta(x)$ où $\beta(x) = \dfrac{\ln(1 + x)}{x}$ a pour limite 1 quand $x \to 0$.

**Remarque.** $\sim$ est une relation d'équivalence (R-S-T) dans l'ensemble des applications de $U$ dans $\mathbb{R}$.

**Équivalences usuelles.**

- Lorsque $a_p \neq 0$, notant $P(x) = a_pX^p + a_{p-1}X^{p-1} + \dots + a_1x + a_0$, $P(x) \overset{+\infty}{\sim} a_pX^p$, et si la valuation de $P$ est $v$, alors $P(x) \overset{0}{\sim} a_vX^v$.
- Lorsque $a_p \neq 0$ et $b_q \neq 0$, notant $R(x) = \dfrac{a_pX^p + a_{p-1}X^{p-1} + \dots + a_1x + a_0}{b_qX^q + b_{q-1}X^{q-1} + \dots + b_1x + b_0}$, $R(x) \overset{+\infty}{\sim} \dfrac{a_pX^p}{b_qX^q}$, et si les valuations respectives des numérateur et dénominateur sont $v$ et $w$, $R(x) \overset{0}{\sim} \dfrac{a_vX^v}{b_wX^w}$.
- Lorsque $\lim\limits_{x \to a} u(x) = 0$, $\sin(u(x))$, $\tan(u(x))$, $\ln(1 + u(x))$, $e^{u(x)} - 1$ sont équivalents à $u(x)$.

**Équivalence et existence de limite.** Pour toute fonction $f$ définie sur $U$ et tout élément $l$ de $\mathbb{R}$ :

- si $\lim\limits_{x \to a} f(x) = l$ et si $l \neq 0$, alors $f(x) \overset{a}{\sim} l$ (fonction constante de valeur $l$) ;
- si $\lim\limits_{x \to a} f(x) = l$ et si $l = 0$, il est faux que $f(x) \overset{a}{\sim} l$, sauf si $f$ est localement nulle auprès de $a$ ;
- si $f$ est telle que $f(x) \overset{a}{\sim} l$, alors $\lim\limits_{x \to a} f = l$.

**Intérêt de cette notion.** Deux fonctions équivalentes au voisinage de $a$ ont même comportement asymptotique en $a$, et si l'une a une limite $l$ en $a$, l'autre aussi et elle a la même limite $l$.

**Fonction $f$ dominée par une fonction $g$ au voisinage de $a$.** Fonctions $f$ et $g$ pour lesquelles il existe une fonction $\gamma$ définie sur $U$, telle que $\forall x \in U, f(x) = g(x) \times \gamma(x)$ et $\gamma$ soit bornée sur $U$.

**Notation usuelle.** $f \overset{a}{=} O(g)$. On se permet également d'écrire $f(x) \overset{a}{=} O(g(x))$.

**Exemple.** $x.\sin(x) \overset{0}{=} O(x)$ puisque $x.\sin(x) = x \times \gamma(x)$ où $\gamma(x) = \sin(x)$ vérifie $|\sin(x)| \leq 1$ sur $]-2, 2[$.

**Remarque.** La relation de domination est transitive.

**Intérêt de cette notion.** Si une fonction $f$ est dominée au voisinage de $a$ par une fonction $g$ qui a une limite 0 en $a$, alors $f$ admet également 0 pour limite en $a$.

**Fonction $f$ négligeable devant une fonction $g$ au voisinage de $a$.** Fonctions $f$ et $g$ pour lesquelles il existe une fonction $\epsilon$ définie sur $U$, telle que $\forall x \in U, f(x) = g(x) \times \epsilon(x)$ et $\lim\limits_{x \to a} \epsilon(x) = 0$.

**Notation usuelle.** $f \overset{a}{=} o(g)$. On se permet également d'écrire $f(x) \overset{a}{=} o(g(x))$.

**Exemple.** $e^{-x} \overset{+\infty}{=} o\left(\dfrac{1}{x^2}\right)$ puisque $e^{-x} = \dfrac{1}{x^2} \times \epsilon(x)$ où $\epsilon(x) = x^2 \times e^{-x}$ a pour limite 0 en $+\infty$.

**Remarque.** Malgré le mot négligeable, $f(x) = o(g(x))$ ne sous-entend pas que $\lim\limits_{x \to a} f(x) = 0$. Par exemple $x^2 \overset{+\infty}{=} o(x^3)$ puisque $x^2 = x^3 \times x^{-1}$ où $\lim\limits_{x \to +\infty} x^{-1} = 0$. Pourtant $\lim\limits_{x \to +\infty} x^2 = +\infty$.

**Négligeabilités usuelles.**

- Si $(p, q) \in \mathbb{N}^2$ avec $p < q$, alors $x^p \overset{+\infty}{=} o(x^q)$ et $\dfrac{1}{x^q} \overset{+\infty}{=} o\left(\dfrac{1}{x^p}\right)$, mais $x^q \overset{0}{=} o(x^p)$ et $\dfrac{1}{x^p} \overset{0}{=} o\left(\dfrac{1}{x^q}\right)$.
- $\forall \alpha \in \mathbb{R}_+^*, \forall a \in ]1, +\infty[$, $\ln(x) \overset{+\infty}{=} o(x^\alpha)$ et $x^\alpha \overset{+\infty}{=} o(a^x)$.

**Remarque.** La relation de négligeabilité est transitive.

**Intérêt de cette notion.** Si une fonction $f$ est négligeable au voisinage de $a$ devant une fonction $g$ bornée sur $U$, alors $\lim\limits_{x \to a} f(x) = 0$.

**Quelques propriétés pratiques.** $f$, $g$ et $h$ étant trois fonctions définies sur $U$ :

- si $f \overset{a}{\sim} f'$ et $g \overset{a}{\sim} g'$, alors $f \times g \overset{a}{\sim} f' \times g'$, et si de plus $\forall x \in U, g(x) \times g'(x) \neq 0$, alors $\dfrac{1}{g} \overset{a}{\sim} \dfrac{1}{g'}$ et $\dfrac{f}{g} \overset{a}{\sim} \dfrac{f'}{g'}$ ;
- si $f \overset{a}{\sim} f'$ et $g \overset{a}{=} o(f)$, alors $f \pm g \overset{a}{\sim} f'$ ;
- si $f \overset{a}{=} o(h)$ et $g \overset{a}{=} o(h)$, alors $\forall (\lambda, \mu) \in \mathbb{K}^2$, $\lambda f + \mu g \overset{a}{=} o(h)$.

### Propriétés des limites liées à l'ordre $\leq$

**Limite $+\infty$ de $f$ en un réel $a$.** $f$ étant une fonction définie au moins sur un intervalle $U$ contenant $a$ ou admettant $a$ pour borne, $\lim\limits_a f = \lim\limits_{x \to a} f(x) = +\infty$ signifie que

$$
\forall A \in \mathbb{R}_+^*, \exists \eta \in \mathbb{R}_+^*, \forall x \in D_f, x \in ]a - \eta, a + \eta[ \Rightarrow f(x) > A
$$

**Limite $-\infty$ de $f$ en un réel $a$.** $f$ étant une fonction définie au moins sur un intervalle $U$ contenant $a$ ou admettant $a$ pour borne, $\lim\limits_a f = \lim\limits_{x \to a} f(x) = -\infty$ signifie que

$$
\forall A \in \mathbb{R}_+^*, \exists \eta \in \mathbb{R}_+^*, \forall x \in D_f, x \in ]a - \eta, a + \eta[ \Rightarrow f(x) < -A
$$

**Limite $+\infty$ de $f$ en $+\infty$.** $f$ étant une fonction définie au moins sur un intervalle de la forme $]\alpha, +\infty[$, $\lim\limits_{+\infty} f = \lim\limits_{x \to +\infty} f(x) = +\infty$ signifie que

$$
\forall A \in \mathbb{R}_+^*, \exists B \in \mathbb{R}_+^*, \forall x \in D_f, x > B \Rightarrow f(x) > A
$$

**Tableaux panoramiques relatifs aux limites de sommes, produits et inverse.** $a$ est un réel ou un infini, $l$ et $m$ sont deux réels. $f$ et $g$ sont deux fonctions à valeurs réelles définies au moins sur un intervalle $U$ contenant $a$ ou ayant $a$ pour borne. Les limites envisagées sont supposées exister en $a$.

Somme $f + g$ :

| $\lim g$ ↓, $\lim f$ → | $-\infty$ | $l$ | $+\infty$ |
| --- | --- | --- | --- |
| $+\infty$ | Indet | $+\infty$ | $+\infty$ |
| $m$ | $-\infty$ | $l + m$ | $+\infty$ |
| $-\infty$ | $-\infty$ | $-\infty$ | Indet |

Produit $f \times g$ :

| $\lim g$ ↓, $\lim f$ → | $-\infty$ | $0$ | $l \neq 0$ | $+\infty$ |
| --- | --- | --- | --- | --- |
| $+\infty$ | $-\infty$ | Indet | $s(l)\infty$ | $+\infty$ |
| $m \neq 0$ | $s(-m)\infty$ | $0$ | $l \times m$ | $s(m)\infty$ |
| $0$ | Indet | $0$ | $0$ | Indet |
| $-\infty$ | $+\infty$ | Indet | $s(-l)\infty$ | $-\infty$ |

Produit $\lambda f$ :

| $\lim f$ | $-\infty$ | $l$ | $+\infty$ |
| --- | --- | --- | --- |
| $\lim \lambda f$ | $s(-\lambda)\infty$ | $\lambda l$ | $s(\lambda)\infty$ |

Inverse $1/g$ :

| $\lim g$ | $-\infty$ | $0^-$ | $0$ | $0^+$ | $m \neq 0$ | $+\infty$ |
| --- | --- | --- | --- | --- | --- | --- |
| $\lim 1/g$ | $0^-$ | $-\infty$ | . | $+\infty$ | $1/m$ | $0$ |

**Théorèmes de comparaison.** $a$ est un réel ou un infini, $l$ est un réel. $f, g, h$ sont trois fonctions à valeurs réelles définies au moins sur un intervalle $U$ contenant $a$ ou ayant $a$ pour borne.

- S'il existe un réel $\alpha$ tel que $\forall x \in ]a - \alpha, a + \alpha[ \cap U, f(x) \leq g(x)$, alors $\lim\limits_a f = +\infty \Rightarrow \lim\limits_a g = +\infty$ et $\lim\limits_a g = -\infty \Rightarrow \lim\limits_a f = -\infty$.
- S'il existe un réel $\alpha$ tel que $\forall x \in ]a - \alpha, a + \alpha[ \cap U, f(x) \leq g(x) \leq h(x)$, alors $\lim\limits_a f = l$ et $\lim\limits_a h = l \Rightarrow \lim\limits_a g = l$.

**Passage aux limites dans les relations de comparaison.** $a$ est un réel ou un infini ; $f$ et $g$ sont deux fonctions à valeurs réelles définies au moins sur un intervalle $U$ contenant $a$ ou ayant $a$ pour borne, et admettant chacune une limite en $a$.

- Il existe un réel $\alpha$ tel que :
  - $\forall x \in ]a - \alpha, a + \alpha[ \cap U, f(x) \geq 0 \Rightarrow \lim\limits_a f \geq 0$ ;
  - $\forall x \in ]a - \alpha, a + \alpha[ \cap U, f(x) > 0 \Rightarrow \lim\limits_a f \geq 0$ ;
  - $\forall x \in ]a - \alpha, a + \alpha[ \cap U, f(x) \leq 0 \Rightarrow \lim\limits_a f \leq 0$ ;
  - $\forall x \in ]a - \alpha, a + \alpha[ \cap U, f(x) < 0 \Rightarrow \lim\limits_a f \leq 0$.
- Il existe un réel $\alpha$ tel que :
  - $\forall x \in ]a - \alpha, a + \alpha[ \cap U, f(x) \geq g(x) \Rightarrow \lim\limits_a f \geq \lim\limits_a g$ ;
  - $\forall x \in ]a - \alpha, a + \alpha[ \cap U, f(x) > g(x) \Rightarrow \lim\limits_a f \geq \lim\limits_a g$ ;
  - $\forall x \in ]a - \alpha, a + \alpha[ \cap U, f(x) \leq g(x) \Rightarrow \lim\limits_a f \leq \lim\limits_a g$ ;
  - $\forall x \in ]a - \alpha, a + \alpha[ \cap U, f(x) < g(x) \Rightarrow \lim\limits_a f \leq \lim\limits_a g$.

**Existence de limites pour des fonctions monotones.** $f$ est une fonction à valeurs réelles, définie et monotone sur un intervalle $]a, b[$ ($a$ et $b$ réels ou infinis).

- Si $f$ est croissante et majorée sur $]a, b[$, alors si $b \in \mathbb{R}$, $f$ admet une limite à gauche en $b$ ; si $b$ est $+\infty$, $f$ admet une limite en $+\infty$.
- Si $f$ est croissante et minorée sur $]a, b[$, alors si $a \in \mathbb{R}$, $f$ admet une limite à droite en $a$ ; si $a$ est $-\infty$, $f$ admet une limite en $-\infty$.
- Si $f$ est décroissante et minorée sur $]a, b[$, alors si $b \in \mathbb{R}$, $f$ admet une limite à gauche en $b$ ; si $b$ est $+\infty$, $f$ admet une limite en $+\infty$.
- Si $f$ est décroissante et majorée sur $]a, b[$, alors si $a$ est $-\infty$, $f$ admet une limite en $-\infty$.
