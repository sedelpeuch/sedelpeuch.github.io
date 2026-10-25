---
title: "Développements limités"
description: "Développements limités : définition, conditions nécessaires, troncature, unicité, fonctions paires et impaires, combinaisons linéaires et composées, formule de Taylor-Young, primitivation et dérivation, DL usuels, équivalents et calculs de limites."
sidebar_position: 6
---

Toutes les fonctions considérées ici sont des fonctions $\mathbb{R} \to \mathbb{R}$.

## Exemples et condition nécessaire

**Exemple 1.** $\forall x \in ]-1, 1[, \forall n \in \mathbb{N}^*$, $1 - x^{n+1} = 1^{n+1} - x^{n+1} = (1 - x)\displaystyle\sum_{k=0}^{n} x^k$ par l'identité remarquable bien connue, donc après division par $1 - x$, $\dfrac{1}{1 - x} - \dfrac{x^{n+1}}{1 - x} = \displaystyle\sum_{k=0}^{n} x^k$.

Ainsi $\dfrac{1}{1 - x} = \displaystyle\sum_{k=0}^{n} x^k + x^n.\dfrac{x}{1 - x} = \sum_{k=0}^{n} x^k + x^n.\epsilon(x)$ en notant $\epsilon(x) = \dfrac{x}{1 - x}$, dont la limite en 0 est 0.

Notant $f$ la fonction $f : x \mapsto \dfrac{1}{1 - x}$, on a donc $\forall x \in ]-1, 1[, f(x) = \displaystyle\sum_{k=0}^{n} x^k + o(x^n)$.

Au voisinage de 0 (le voisinage étant ici $]-1, 1[$), on a $f(x) =$ polynôme de degré $\leq n + o(x^n)$. Ici, le $o(x^n)$ est exactement $x^n\epsilon(x) = x^n.\dfrac{x}{1 - x}$.

**Exemple 2.** Considérons la même fonction $f : x \mapsto \dfrac{1}{1 - x}$, mais cette fois au voisinage de 3, par exemple sur l'intervalle $]2, 4[$.

$\forall x \in ]2, 4[$, $x = 3 + (x - 3) = 3 + h$ en notant $h = x - 3$. On observe que $h \in ]2 - 3, 4 - 3[ = ]-1, 1[$ :

$$
f(x) = f(3 + h) = \frac{1}{1 - (3 + h)} = \frac{1}{-2 - h} = \frac{-1}{2}\frac{1}{1 + h/2} = \frac{-1}{2}\frac{1}{1 - (-h/2)} \quad \text{où } -h/2 \in ]-1/2, 1/2[ \subset ]-1, 1[
$$

On peut donc réutiliser le développement de l'exemple précédent en remplaçant $x$ par $-h/2$ :

$$
\begin{aligned}
f(x) = f(3 + h) &= \frac{-1}{2}\frac{1}{1 - (-h/2)} = \frac{-1}{2}\left[\sum_{k=0}^{n} (-h/2)^k + o((-h/2)^n)\right] = \frac{-1}{2}\left[\sum_{k=0}^{n} \frac{(-1)^kh^k}{2^k} + (-h/2)^n.\frac{-h/2}{1 - (-h/2)}\right] \\
&= \sum_{k=0}^{n} \frac{(-1)^{k+1}h^k}{2^{k+1}} + h^n\frac{(-1)^{n+2}}{2^{n+1}}.\frac{h}{2 + h} = \sum_{k=0}^{n} \frac{(-1)^{k+1}h^k}{2^{k+1}} + o(h^n) \quad \text{car } \lim_{h \to 0} \frac{(-1)^n}{2^{n+1}}\frac{h}{2 + h} = 0
\end{aligned}
$$

Remplaçant $h$ par $x - 3$, on a alors $f(x) = \displaystyle\sum_{k=0}^{n} \frac{(-1)^{k+1}}{2^{k+1}}(x - 3)^k + o((x - 3)^n)$.

Ainsi, au voisinage de 3, on a $f(x) =$ polynôme en $(x - 3)$, de degré $\leq n + o((x - 3)^n)$.

On vient d'écrire le développement limité d'ordre $n$ de $f$ au voisinage de 3, et dans l'exemple 1 on avait écrit le développement limité d'ordre $n$ de $f$ au voisinage de 0.

**Fonction admettant un développement limité d'ordre $n$ au voisinage d'un réel $x_0$** (où $n \in \mathbb{N}$). Fonction $f$ définie au moins sur un intervalle $U$ de l'une des formes $]x_0 - \epsilon, x_0[$ ou $]x_0, x_0 + \epsilon[$ ($\epsilon > 0$) (elle peut l'être sur $]x_0 - \epsilon, x_0 + \epsilon[$ ou même uniquement sur $]x_0 - \epsilon, x_0[ \cup ]x_0, x_0 + \epsilon[$) telle qu'il existe une fonction polynôme $P_n : x \to \displaystyle\sum_{k=0}^{n} a_kx^k$ de degré $\leq n$ et une fonction $\epsilon : x \to \epsilon(x)$ de limite 0 en 0 permettant d'exprimer

$$
\forall x \in U, f(x) = P_n(x - x_0) + (x - x_0)^n.\epsilon(x - x_0) = \sum_{k=0}^{n} a_k(x - x_0)^k + o((x - x_0)^n)
$$

soit un polynôme en $(x - x_0)$ de degré $\leq n$, plus $o((x - x_0)^n)$.

Cette décomposition est appelée développement limité d'ordre $n$ de $f$ au voisinage de $x_0$, en abrégé $DL_n(x_0)$ de $f$.

L'expression polynomiale $P_n((x - x_0)) = \displaystyle\sum_{k=0}^{n} a_k(x - x_0)^k$ est la partie régulière du $DL_n(x_0)$. L'expression $o((x - x_0)^n) = (x - x_0)^n\epsilon(x)$ est le reste d'ordre $n$ du $DL_n(x_0)$.

À la différence des exemples simples qu'on vient d'analyser, obtenir explicitement $\epsilon(x)$ en fonction de $x$ ne sera pas toujours possible. Il faudra disposer d'hypothèses supplémentaires pour y parvenir (voir au semestre suivant le reste intégral ou le reste de Lagrange).

**L'ambiguïté résultant de l'écriture de $P(x) = a_0 + a_1x + a_2x^2 + \dots + a_kx^k + \dots + a_nx^n$ sous la forme $\sum_{k=0}^{n} a_kx^k$.** La première expression de $P(x)$ donne $P(0) = a_0$, la seconde donne littéralement $P(0) = a_00^0$. Mais l'écriture $0^0$ n'a aucune signification. Conscient de l'ambiguïté, on considère par convention que, malgré l'écriture $P(x) = \sum_{k=0}^{n} a_kx^k$, $P(0) = a_0$.

**Intérêt de l'existence d'un développement limité.** Pour $x$ voisin de $x_0$, $f(x)$ est approché par une expression polynomiale (donc simple) de degré $\leq n$. Le degré n'est pas obligatoirement $n$ car le coefficient $a_n$ peut être nul.

**Remarque.** Toute fonction polynôme offre son développement limité en 0 sur $\mathbb{R}$, à tout ordre. En effet, notant $f : x \mapsto \sum_{k=0}^{d} a_kx^k$ où $d$ est son degré, parce que $a_d \neq 0$ :

- si $n \leq d - 1$, $\forall x \in \mathbb{R}$, $f(x) = \displaystyle\sum_{k=0}^{d} a_kx^k = \sum_{k=0}^{n} a_kx^k + \sum_{k=n+1}^{d} a_kx^k = \sum_{k=0}^{n} a_kx^k + x^n\sum_{k=n+1}^{d} a_kx^{k-n} = \sum_{k=0}^{n} a_kx^k + o(x^n)$ car $\epsilon(x)$ a évidemment pour limite 0 en 0 ;
- si $n = d$, $\forall x \in \mathbb{R}$, $f(x) = \displaystyle\sum_{k=0}^{d} a_kx^k = \sum_{k=0}^{n} a_kx^k + x^n.0$ où $\epsilon(x) = 0$ a évidemment pour limite 0 en 0 ;
- si $n > d$, $\forall x \in \mathbb{R}$, $f(x) = \displaystyle\sum_{k=0}^{d} a_kx^k = \sum_{k=0}^{n} a_kx^k + x^n.0$ où $\epsilon(x) = 0$ a évidemment pour limite 0 en 0, ceci en définissant $a_{d+1} = a_{d+2} = \dots = a_n = 0$.

Par exemple, $f : x \mapsto 5x^3 - 7x^2 + 6x - 2$ a pour $DL_2(0)$ $f(x) = -2 + 6x - 7x^2 + o(x^2)$ où $o(x^2) = 5x^3$. Elle a pour $DL_3(0)$ $f(x) = -2 + 6x - 7x^2 + 5x^3 + o(x^3)$ où $o(x^3) = 0$. Elle a pour $DL_4(0)$ $f(x) = -2 + 6x - 7x^2 + 5x^3 + 0x^4 + o(x^4)$ où $o(x^4) = 0$.

**Conditions nécessaires pour qu'une fonction $f$ définie en $x_0$ admette un $DL_n(x_0)$.** Si une fonction $f$ admet un $DL_n(x_0)$, elle est, rappelons-le, définie au moins sur un intervalle de la forme $U = ]x_0 - \epsilon, x_0[$ ou $U = ]x_0, x_0 + \epsilon[$ ($\epsilon > 0$) et $\forall x \in U, f(x) = \sum_{k=0}^{n} a_k(x - x_0)^k + o((x - x_0)^n)$ :

- $\lim\limits_{x \to x_0} f(x) = a_0$ ;
- si de plus $f$ admet ce développement limité sur au moins un intervalle de l'une des deux formes $V = ]x_0 - \epsilon, x_0]$ ou $V = [x_0, x_0 + \epsilon[$ ($\epsilon > 0$), alors $f(x_0) = a_0$ et $f$ est dérivable en $x_0$ et vérifie $f'(x_0) = a_1$ ;
- sans connaître explicitement le $o((x - x_0)^n)$, on ne peut rien dire pour des ordres de dérivation $\geq 2$.

*Démonstration.*

- $\lim\limits_{x \to x_0} f(x) = \lim\limits_{x \to x_0} \displaystyle\sum_{k=0}^{n} a_k(x - x_0)^k + o((x - x_0)^n) = \sum_{k=0}^{n} a_k(x_0 - x_0)^k + o((x_0 - x_0)^n) = a_0 + o(0) = a_0 + 0 \times \epsilon(x) = a_0$.
- On a directement $f(x_0) = \displaystyle\sum_{k=0}^{n} a_k(x_0 - x_0)^k + o((x_0 - x_0)^n) = a_0$. Pour $h$ assez proche de 0 pour que $x_0 + h$ reste à l'intérieur de l'intervalle $V$ :

  $$
  \begin{aligned}
  \frac{1}{h}[f(x_0 + h) - f(x_0)] &= \frac{1}{h}.\left[\sum_{k=0}^{n} a_k(x_0 + h - x_0)^k + o((x_0 + h - x_0)^n) - a_0\right] = \frac{1}{h}\left[\sum_{k=0}^{n} a_kh^k + o(h^n) - a_0\right] \\
  &= \frac{1}{h}\sum_{k=1}^{n} a_kh^k + \frac{1}{h}o(h^n) = \sum_{k=1}^{n} a_kh^{k-1} + o(h^{n-1})
  \end{aligned}
  $$

  $\lim\limits_{h \to 0} \dfrac{1}{h}[f(x_0 + h) - f(x_0)] = \lim\limits_{h \to 0} \displaystyle\sum_{k=1}^{n} a_kh^{k-1} + o(h^{n-1}) = a_1 + 0 = a_1$. Donc $f'(x_0) = a_1$.
- Sans hypothèses supplémentaires, on ne sait rien de la dérivabilité éventuelle du reste d'ordre $n$. On n'a donc pas les moyens de savoir si $f'(x_0 + h)$ existe. On ne peut donc étudier la limite $\lim\limits_{h \to 0} \dfrac{1}{h}[f'(x_0 + h) - f'(x_0)]$ qui conduirait à $f''(x_0)$. $\square$

## Les propriétés des développements limités

**Troncature d'un développement limité.** $x_0$ est un réel quelconque, $n$ un élément de $\mathbb{N}^*$. Si $f$, définie sur un intervalle $U$ contenant $x_0$ ou ayant $x_0$ pour borne, admet un $DL_n(x_0)$ sur $U$, exprimant cela par $\forall x \in U, f(x) = \sum_{k=0}^{n} a_k(x - x_0)^k + o((x - x_0)^n)$, alors $\forall p \in [0, n - 1]$, si $k \in [p + 1, n]$, $a_k(x - x_0)^k = a_k(x - x_0)^{(k-p)} \times (x - x_0)^p$ est un $o((x - x_0)^p)$, ainsi

$$
\begin{aligned}
f(x) &= \sum_{k=0}^{p} a_k(x - x_0)^k + \sum_{k=p+1}^{n} a_k(x - x_0)^k + o((x - x_0)^n) \\
&= \sum_{k=0}^{p} a_k(x - x_0)^k + \sum_{k=p+1}^{n} o((x - x_0)^p) + o((x - x_0)^p) = \sum_{k=0}^{p} a_k(x - x_0)^k + o((x - x_0)^p)
\end{aligned}
$$

ce qui est un développement limité d'ordre $p$. Ce $DL_p(x_0)$ de $f$ est la troncature à l'ordre $p$ du $DL_n(x_0)$ de $f$.

**Exemple.** Supposons $n = 10$. On a vu en introduction que le $DL_{10}(0)$ de $f : x \mapsto \dfrac{1}{1 - x}$ est $f(x) = \displaystyle\sum_{k=0}^{10} x^k + o(x^{10})$. Sa troncature à l'ordre 4 est le $DL_4(0)$ : $f(x) = \displaystyle\sum_{k=0}^{4} x^k + o(x^4) = 1 + x + x^2 + x^3 + x^4 + o(x^4)$.

**Unicité du développement limité pour un ordre donné.** $x_0$ est un réel quelconque, $n$ un élément de $\mathbb{N}^*$. Si une fonction $f$, définie sur un intervalle $U$ contenant $x_0$ ou ayant $x_0$ pour borne, admet un $DL_n(x_0)$ sur $U$, alors celui-ci est unique, à cet ordre $n$.

*Démonstration.* Par l'absurde, supposons l'existence de deux développements limités distincts s'exprimant par $\forall x \in U, f(x) = \sum_{k=0}^{n} a_k(x - x_0)^k + o_1((x - x_0)^n)$ et

$$
f(x) = \sum_{k=0}^{n} b_k(x - x_0)^k + o_2((x - x_0)^n)
$$

Les deux suites de coefficients $(a_k)_{k \in [0, n]}$ et $(b_k)_{k \in [0, n]}$ diffèrent par au moins l'un de leurs termes. Soit $n_1$ la plus petite valeur de l'indice $n$ telle que $a_n \neq b_n$.

$$
\begin{aligned}
\forall x \in U, 0 = f(x) - f(x) &= \sum_{k=0}^{n} a_k(x - x_0)^k + o_1((x - x_0)^n) - \sum_{k=0}^{n} b_k(x - x_0)^k + o_2((x - x_0)^n) \\
&= \sum_{k=0}^{n} (a_k - b_k)(x - x_0)^k + o_1((x - x_0)^n) - o_2((x - x_0)^n) \\
&= \sum_{k=0}^{n_1 - 1} 0.(x - x_0)^k + \sum_{k=n_1}^{n} (a_k - b_k)(x - x_0)^k + o_3((x - x_0)^n)
\end{aligned}
$$

Donc $-\displaystyle\sum_{k=n_1}^{n} (a_k - b_k)(x - x_0)^k = o_3((x - x_0)^n) = (x - x_0)^n.\epsilon(x - x_0)$, puis, en notant $u = x - x_0$, $-\displaystyle\sum_{k=n_1}^{n} (a_k - b_k)u^k = o_3(u^n) = u^n.\epsilon(u)$.

Divisant alors par $u^n$, non nul tant que $x \neq x_0$ :

$$
\frac{-\displaystyle\sum_{k=n_1}^{n} (a_k - b_k)u^k}{u^n} = \epsilon(u)
$$

Lorsque $u \to 0$, cette fraction rationnelle en $u$ est équivalente au quotient de ses termes de plus bas degré, soit $-\dfrac{a_{n_1} - b_{n_1}}{u^{n - n_1}}$, et étant égale à $\epsilon(u)$, sa limite est nécessairement 0. Or, le dénominateur ayant une limite finie et le numérateur étant différent de 0, c'est impossible : donc $\forall k \in [0, n], a_k = b_k$. Les parties régulières des deux $DL_n(x_0)$ de $f$ sont égales et, par différence avec $f(x)$, les restes d'ordre $n$ sont égaux. $\square$

**$DL_n(0)$ d'une fonction paire ou impaire définie au moins sur un intervalle $]-\epsilon, 0[ \cup ]0, \epsilon[$ où $\epsilon > 0$.** Si $f$ est impaire, dans la partie régulière du $DL_n(0)$, parce que les coefficients des puissances paires de $x$ sont tous nuls, on ne lit que des puissances impaires de $x$.

Si $f$ est paire, dans la partie régulière du $DL_n(0)$, parce que les coefficients des puissances impaires de $x$ sont tous nuls, on ne lit que des puissances paires de $x$.

**Exemples.** Pour $x \in ]-1, 1[$, à partir de $f(x) = \dfrac{1}{1 - x} = \displaystyle\sum_{k=0}^{n} x^k + o(x^n)$, on peut écrire :

- en substituant $x^2$ à $x$, $f(x^2) = \dfrac{1}{1 - x^2} = \displaystyle\sum_{k=0}^{n} x^{2k} + o(x^{2n})$, alors que $x \to \dfrac{1}{1 - x^2}$ est paire sur $]-1, 1[$ ;
- en multipliant par $x$ ces dernières expressions, $x \times f(x^2) = \dfrac{x}{1 - x^2} = \displaystyle\sum_{k=0}^{n} x^{2k+1} + o(x^{2n+1})$, alors que $x \to \dfrac{x}{1 - x^2}$ est impaire sur $]-1, 1[$.

*Démonstration.* On suppose que $\forall x \in ]-\epsilon, 0[ \cup ]0, \epsilon[$ on peut écrire $f(x) = \sum_{k=0}^{n} a_kx^k + o_1(x^n)$. Comme $-x \in ]-\epsilon, 0[ \cup ]0, \epsilon[$, $f(-x) = \sum_{k=0}^{n} a_k(-x)^k + o_1((-x)^n) = \sum_{k=0}^{n} a_k(-1)^kx^k + o_2(x^n)$.

$$
\frac{f(x) + f(-x)}{2} = \frac{1}{2}\left[\sum_{k=0}^{n} a_kx^k + o_1(x^n) + \sum_{k=0}^{n} a_k(-1)^kx^k + o_2(x^n)\right] = \sum_{k=0}^{n} a_k\frac{1 + (-1)^k}{2}.x^k + o_3(x^n)
$$

$$
\frac{f(x) - f(-x)}{2} = \frac{1}{2}\left[\sum_{k=0}^{n} a_kx^k + o_1(x^n) - \sum_{k=0}^{n} a_k(-1)^kx^k - o_2(x^n)\right] = \sum_{k=0}^{n} a_k\frac{1 - (-1)^k}{2}x^k + o_4(x^n)
$$

Si $f$ est impaire, $f(x) = \dfrac{f(x) - f(-x)}{2}$, qui a un développement dans lequel les coefficients $a_k\dfrac{1 - (-1)^k}{2}$ sont nuls lorsque l'entier $k$ est pair.

Si $f$ est paire, $f(x) = \dfrac{f(x) + f(-x)}{2}$, qui a un développement dans lequel les coefficients $a_k.\dfrac{1 + (-1)^k}{2}$ sont nuls lorsque l'entier $k$ est impair. $\square$

**Développements de combinaisons linéaires et de composées.**

- Si $f$ et $g$ sont deux fonctions simultanément définies sur un même intervalle $U$ contenant $x_0$ ou ayant $x_0$ pour borne, qui admettent chacune un $DL_n(x_0)$ sur $U$, $\forall x \in U, f(x) = \sum_{k=0}^{n} a_k(x - x_0)^k + o_1((x - x_0)^n)$ et $g(x) = \sum_{k=0}^{n} b_k(x - x_0)^k + o_2((x - x_0)^n)$, alors $\forall (\lambda, \mu) \in \mathbb{R}^2$, $\lambda f + \mu g$ admet un $DL_n(x_0)$ sur $U$ qui s'exprime par $\forall x \in U, (\lambda f + \mu g)(x) = \sum_{k=0}^{n} (\lambda a_k + \mu b_k)(x - x_0)^k + o_3((x - x_0)^n)$.
- Si $f$ est une fonction définie sur un intervalle $U$ contenant $x_0$, qui admet un $DL_n(x_0)$ sur $U$, et si $g$ est définie sur un intervalle $V$ contenant $f(x_0)$ qui admet un $DL_n(f(x_0))$ sur $V$, et si $f(U) \subset V$, alors $g \circ f$ admet un $DL_n(x_0)$ sur $U$, obtenu en remplaçant $x$ dans le $DL_n(f(x_0))$ de $g$ par la partie régulière du $DL_n(x_0)$ de $f$, puis en ne conservant que les puissances de $(x - x_0)$ qui sont inférieures à $n$.

*Démonstration.* Admise. $\square$

**Exemples.**

- Pour $x_0 = 0$, $f : x \mapsto \dfrac{1}{1 - x}$ a un $DL_3(0)$ défini par $\forall x \in ]-1, 1[, f(x) = \dfrac{1}{1 - x} = \displaystyle\sum_{k=0}^{3} x^k + o_1(x^3) = 1 + x + x^2 + x^3 + o_1(x^3)$. La fonction $g : x \mapsto \dfrac{1}{1 - x^2}$ a un $DL_3(0)$ défini par $\forall x \in ]-1, 1[, g(x) = \dfrac{1}{1 - x^2} = \displaystyle\sum_{k=0}^{1} x^{2k} + o_2(x^3) = 1 + x^2 + o_2(x^3)$, car il ne faut pas de $x^p$ tels que $p > 3$. Donc la fonction $h = \pi.f - \sqrt{2}g$ a un $DL_3(0)$ défini par $\forall x \in ]-1, 1[$ :

  $$
  (\pi.f - \sqrt{2}g)(x) = \frac{\pi}{1 - x} - \frac{\sqrt{2}}{1 - x^2} = \pi(1 + x + x^2 + x^3) - \sqrt{2}(1 + x^2) + o_3(x^3) = (\pi - \sqrt{2}) + \pi x + (\pi - \sqrt{2}).x^2 + \pi x^3 + o_3(x^3)
  $$

- Pour $x_0 = 0$, $f : x \mapsto \dfrac{1}{1 - x}$, de $DL_3(0)$ connu, vérifie $f(x_0) = f(0) = 1$ et $f(]-1, 1[) = ]1/2, +\infty[$. La fonction $\exp : x \mapsto e^x$ a pour $DL_3(1)$ sur $]1/2, +\infty[$ $\exp(x) = \displaystyle\sum_{k=0}^{3} \frac{e}{k!}(x - 1)^k + o_4((x - 1)^3)$. Ainsi $\forall x \in ]1/2, +\infty[$, $e^x = e + e.(x - 1) + e/2(x - 1)^2 + e/6(x - 1)^3 + o_4((x - 1)^3)$.

  $\exp \circ f$ admet donc un $DL_3(0)$ dont la partie régulière est obtenue par substitution puis écrêtage :

  $$
  \begin{aligned}
  &e + e.([1 + x + x^2 + x^3] - 1) + e/2([1 + x + x^2 + x^3] - 1)^2 + e/6([1 + x + x^2 + x^3] - 1)^3 \\
  &= e + e(x + x^2 + x^3) + e/2(x + x^2 + x^3)^2 + e/6(x + x^2 + x^3)^3 \\
  &= e + e(x + x^2 + x^3) + e/2(x^2 + 2xx^2) + e/6(x^3) \quad \text{en n'écrivant pas les } x^k \text{ où } k > 3 \\
  &= e + ex + \frac{3e}{2}x^2 + \frac{13e}{6}x^3
  \end{aligned}
  $$

  Ainsi le $DL_3(0)$ de $\exp \circ f$ sur $]-1, 1[$ s'exprime par $\forall x \in ]-1, 1[, (\exp \circ f)(x) = e + ex + \dfrac{3e}{2}x^2 + \dfrac{13e}{6}x^3 + o(x^3)$.

## La construction du $DL_n(x_0)$ d'une fonction de classe $C^n$ sur un voisinage de $x_0$

**La formule de Taylor avec reste de Young.** $x_0$ est un réel quelconque, $n$ un élément de $\mathbb{N}^*$. $f$ est une fonction supposée de classe $C^{n-1}$ sur un voisinage $U$ de $x_0$ et telle que $f^{(n)}(x_0)$ existe. Alors $f$ admet un $DL_n(x_0)$ sur $U$, qui s'exprime par $\forall x \in U$ :

$$
f(x) = \sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!}(x - x_0)^k + o((x - x_0)^n)
$$

**L'exemple du $DL_n(0)$ de la fonction exponentielle à tout ordre $n$ de $\mathbb{N}^*$.** Ici $x_0 = 0$, $f = \exp$ est de classe $C^{n-1}$ sur $U = \mathbb{R}$ (en fait $C^\infty$) et $\exp^{(n)}(0) = e^0 = 1$ existe. $\forall k \in \mathbb{N}, \forall x \in \mathbb{R}, \exp^{(k)}(x) = e^x$ et par suite $\dfrac{\exp^{(k)}(0)}{k!} = \dfrac{1}{k!}$.

La formule de Taylor-Young donne alors le $DL_n(0)$ de $\exp$ : $\forall x \in \mathbb{R}, \exp(x) = e^x = \displaystyle\sum_{k=0}^{n} \frac{1}{k!}x^k + o(x^n) = \sum_{k=0}^{n} \frac{x^k}{k!} + o(x^n)$. Ainsi, par exemple, à l'ordre 3, $e^x = 1 + x + \dfrac{x^2}{2!} + \dfrac{x^3}{3!} + o(x^3)$.

*Démonstration* (en 5 étapes). $\forall x \in U \setminus \{x_0\}$, notons respectivement $I_x$ et $\dot{I}_x$ les intervalles fermé et ouvert de bornes $x_0$ et $x$.

**Examen du polynôme constitué des $n$ premiers monômes de la partie régulière.** Notons

$$
P_{n-1}(x) = \sum_{k=0}^{n-1} \frac{f^{(k)}(x_0)}{k!}(x - x_0)^k = f(x_0) + f'(x_0).(x - x_0) + \frac{f''(x_0)}{2!}(x - x_0)^2 + \dots + \frac{f^{(n-1)}(x_0)}{(n-1)!}(x - x_0)^{n-1}
$$

D'une part $P_{n-1}(x_0) = f(x_0)$ ; d'autre part, les dérivées successives de $P_{n-1}$ se définissent par

$$
P'_{n-1}(x) = f'(x_0) + \frac{f''(x_0)}{1!}(x - x_0) + \dots + \frac{f^{(n-1)}(x_0)}{(n-2)!}(x - x_0)^{n-2} = \sum_{k=1}^{n-1} \frac{f^{(k)}(x_0)}{(k-1)!}(x - x_0)^{k-1}
$$

et, à tout ordre $i$ entre 1 et $n - 1$,

$$
P_{n-1}^{(i)}(x) = f^{(i)}(x_0) + \frac{f^{(i+1)}(x_0)}{1!}(x - x_0) + \dots + \frac{f^{(n-1)}(x_0)}{(n-i-1)!}(x - x_0)^{n-i-1} = \sum_{k=i}^{n-1} \frac{f^{(k)}(x_0)}{(k-i)!}(x - x_0)^{k-i}
$$

donc $P_{n-1}^{(i)}(x_0) = f^{(i)}(x_0)$ ; et, en continuant à dériver jusqu'à l'ordre $n - 1$, $P_{n-1}^{(n-1)}(x) = f^{(n-1)}(x_0) = \displaystyle\sum_{k=n-1}^{n-1} \frac{f^{(k)}(x_0)}{(k-n+1)!}(x - x_0)^{k-n+1}$, réduite au seul terme pour lequel $k = n - 1$.

**Dérivée d'ordre $n - 1$ d'une fonction $\phi_x$ de variable $t$.** On construit la fonction $\phi_x$ de variable $t$, définie sur $I_x$ par

$$
\phi_x(t) = f(t) - P_{n-1}(t) + \lambda_x(t - x_0)^n
$$

où $\lambda_x$ est un réel choisi pour que $\phi_x(x) = 0$ $\left(\lambda_x = \dfrac{P_{n-1}(x) - f(x)}{(x - x_0)^n}\right)$.

$\phi_x$ est dérivable (par rapport à $t$) à tout ordre $i$ de $[0, n - 1]$ et $\phi_x^{(i)}(t) = f^{(i)}(t) - P_{n-1}^{(i)}(t) + \lambda_x.n(n-1)(n-2)\dots(n-i+1)(t - x_0)^{n-i}$, de sorte que $\phi_x^{(i)}(x_0) = f^{(i)}(x_0) - P_{n-1}^{(i)}(x_0) + \lambda_x.0 = f^{(i)}(x_0) - f^{(i)}(x_0) + 0 = 0$.

**$n - 1$ applications successives du théorème de Rolle à partir de $\phi_x$.**

1. $\phi_x$ est continue sur $I_x$ et dérivable sur $\dot{I}_x$ (de bornes $x_0$ et $x$), et $\phi_x(x_0) = 0 = \phi_x(x)$, donc d'après le théorème de Rolle, $\exists c_1 \in \dot{I}_x, \phi'_x(c_1) = 0$.
2. $\phi'_x$ est continue sur $I_{c_1}$ et dérivable sur $\dot{I}_{c_1}$ (de bornes $x_0$ et $c_1$), et $\phi'_x(x_0) = 0 = \phi'_x(c_1)$, donc d'après le théorème de Rolle, $\exists c_2 \in \dot{I}_{c_1}, \phi''_x(c_2) = 0$.

On itère le procédé : après $n - 3$ dérivations, on obtient $c_{n-2}$ et on achève par $n - 1$ : $\phi_x^{(n-2)}$ est continue sur $I_{c_{n-2}}$ et dérivable sur $\dot{I}_{c_{n-2}}$ (bornes $x_0$ et $c_{n-2}$), et $\phi_x^{(n-2)}(x_0) = 0 = \phi_x^{(n-2)}(c_{n-2})$, donc d'après le théorème de Rolle, $\exists c_{n-1} \in \dot{I}_{c_{n-2}}, \phi_x^{(n-1)}(c_{n-1}) = 0$.

**Vers une expression de $-\lambda_x$ en fonction de $f^{(n)}(x_0)$.** On a vu que $\forall i \in [0, n - 1]$, $\phi_x^{(i)}(t) = f^{(i)}(t) - P_{n-1}^{(i)}(t) + \lambda_x.n(n-1)(n-2)\dots(n-i+1)(t - x_0)^{n-i}$, donc en particulier, pour $i = n - 1$, $\phi_x^{(n-1)}(t) = f^{(n-1)}(t) - P_{n-1}^{(n-1)}(t) + \lambda_xn(n-1)(n-2)\dots(2)(t - x_0)^1$, ce qui en $t = c_{n-1}$ s'écrit $0 = \phi_x^{(n-1)}(c_{n-1}) = f^{(n-1)}(c_{n-1}) - P_{n-1}^{(n-1)} + \lambda_xn!(c_{n-1} - x_0)$ ; or $P_{n-1}^{(n-1)}$ est constant de valeur $f^{(n-1)}(x_0)$, donc $0 = f^{(n-1)}(c_{n-1}) - f^{(n-1)}(x_0) + \lambda_xn!(c_{n-1} - x_0)$. On a alors facilement

$$
\lambda_x = -\frac{1}{n!}\frac{f^{(n-1)}(c_{n-1}) - f^{(n-1)}(x_0)}{c_{n-1} - x_0}
$$

Mais $f^{(n-1)}$ est dérivable en $x_0$ car $f^{(n)}(x_0)$ existe, et lorsque $x \to x_0$, $c_{n-1} \to x_0$ car il est dans $I_x$. Donc

$$
\lim_{x \to x_0} \lambda_x = -\frac{1}{n!}\lim_{x \to x_0} \frac{f^{(n-1)}(c_{n-1}) - f^{(n-1)}(x_0)}{c_{n-1} - x_0} = -\frac{1}{n!}.f^{(n)}(x_0)
$$

Posons alors $\epsilon(x - x_0) = -\dfrac{1}{n!}f^{(n)}(x_0) - \lambda_x$. On a $\lim\limits_{x \to x_0} \epsilon(x - x_0) = -\dfrac{1}{n!}.f^{(n)}(x_0) + \dfrac{1}{n!}.f^{(n)}(x_0) = 0$. Donc $-\lambda_x = \dfrac{1}{n!}.f^{(n)}(x_0) + \epsilon(x - x_0)$ où $\lim\limits_{x \to x_0} \epsilon(x - x_0) = 0$.

**L'obtention du développement de Taylor avec reste de Young.** On se souvient de la fonction $\phi_x$ définie par $\phi_x(t) = f(t) - P_{n-1}(t) + \lambda_x(t - x_0)^n$. On sait que $\phi_x(x) = 0$, donc $0 = f(x) - P_{n-1}(x) + \lambda_x(x - x_0)^n$, et enfin

$$
\begin{aligned}
f(x) = P_{n-1}(x) - \lambda_x(x - x_0)^n &= \sum_{k=0}^{n-1} \frac{f^{(k)}(x_0)}{k!}(x - x_0)^k + \left[\frac{1}{n!}.f^{(n)}(x_0) + \epsilon(x - x_0)\right].(x - x_0)^n \\
&= \sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!}(x - x_0)^k + (x - x_0)^n.\epsilon(x - x_0)
\end{aligned}
$$

où $\lim\limits_{x \to x_0} \epsilon(x - x_0) = 0$ : $(x - x_0)^n.\epsilon(x - x_0)$, qui est un $o((x - x_0)^n)$, est le reste de Young. $\square$

## Les développements limités des fonctions usuelles au voisinage de 0

**Primitivation d'un développement limité au voisinage de 0.** Soient $n$ un entier naturel, $U$ un intervalle ouvert de $\mathbb{R}$ contenant 0 et $f$ une fonction continue sur $U$ qui admet un $DL_n(0)$ sur $U$ : $\forall x \in U, f(x) = P_n(x) + x^n\epsilon(x)$ où $\lim\limits_{x \to 0} \epsilon(x) = 0$ et $P_n(x) = \sum_{k=0}^{n} a_kx^k$. Toute primitive $F$ de $f$ sur $U$ admet un $DL_{n+1}(0)$ sur $U$, qui est $\forall x \in U, F(x) = F(0) + \displaystyle\sum_{k=0}^{n} \frac{a_k}{k+1}x^{k+1} + x^{n+1}.\sigma(x)$ où $\lim\limits_{x \to 0} \sigma(x) = 0$.

**Exemple.** On sait que pour $U = ]-1, 1[$, $\forall x \in U, \dfrac{1}{1 - x} = \displaystyle\sum_{k=0}^{n} x^k + o(x^n)$, donc aussi $\dfrac{1}{1 + x} = \dfrac{1}{1 - (-x)} = \displaystyle\sum_{k=0}^{n} (-x)^k + o((-x)^n)$, c'est-à-dire $\dfrac{1}{1 + x} = \displaystyle\sum_{k=0}^{n} (-1)^k.x^k + o(x^n)$.

L'intégration de ce $DL$ de 0 à $x$ donne alors (en observant que $x \in ]-1, 1[ \Rightarrow 1 + x > 0$) $\ln(1 + x) = \ln(1 + 0) + \displaystyle\sum_{k=0}^{n} \frac{(-1)^k}{k+1}x^{k+1} + o(x^{n+1})$, qui, après décalage de l'indice de sommation, s'écrit $\ln(1 + x) = \displaystyle\sum_{k=1}^{n+1} \frac{(-1)^{k-1}}{k}.x^k + o(x^{n+1})$.

*Démonstration.*

- La fonction $t \to t^n\epsilon(t)$ est continue sur $U$ puisque $t^n\epsilon(t) = f(t) - P_n(t)$ où $f$ et $P_n$ sont continues sur $U$. $\forall x \in U$, cette fonction peut donc être intégrée sur l'intervalle fermé de bornes 0 et $x$, qu'on peut noter $I_x$.

  Nous allons montrer que $\int_0^x t^n\epsilon(t)dt$ est un $o(x^{n+1})$, et pour cela que $\lim\limits_{x \to 0} \dfrac{1}{x^{n+1}}.\int_0^x t^n\epsilon(t)dt = 0$. Parce que $\lim\limits_{x \to 0} \epsilon(x) = 0$, $\forall \alpha \in \mathbb{R}_+^*, \exists \eta \in \mathbb{R}_+^*, \forall t \in U, |t| \leq \eta \Rightarrow |\epsilon(t)| \leq \alpha$.

  Donc $\forall x \in U, |x| \leq \eta \Rightarrow \forall t \in I_x, |t| \leq \eta \Rightarrow \forall t \in I_x, |\epsilon(t)| \leq \alpha$.

  Supposons donc que $|x| \leq \eta$ :

  $$
  \left|\frac{1}{x^{n+1}}.\int_0^x t^n\epsilon(t)dt\right| = \frac{1}{|x|^{n+1}}.\left|\int_0^x t^n\epsilon(t)dt\right| \leq \frac{1}{|x|^{n+1}}.\int_0^x |t|^n.|\epsilon(t)|dt \leq \frac{1}{|x|^{n+1}}\int_0^x |t|^n.\alpha dt
  $$

  or

  $$
  \frac{1}{|x|^{n+1}}\int_0^x |t|^n\alpha dt = \frac{\alpha}{|x|^{n+1}}\left|\int_0^x t^ndt\right| = \frac{\alpha}{|x|^{n+1}}\left|\left[\frac{t^{n+1}}{n+1}\right]_0^x\right| = \frac{\alpha}{|x|^{n+1}}.\left|\frac{x^{n+1}}{n+1}\right| = \frac{\alpha}{n+1} \leq \alpha
  $$

  En conclusion, $\forall \alpha \in \mathbb{R}_+^*, \exists \eta \in \mathbb{R}_+^*, \forall x \in U, |x| \leq \eta \Rightarrow \left|\frac{1}{x^{n+1}}\int_0^x t^n\epsilon(t)dt\right| \leq \alpha$. Ceci prouve que $\lim\limits_{x \to 0} \dfrac{1}{x^{n+1}}\int_0^x t^n\epsilon(t)dt = 0$.
- $\forall x \in U$, en intégrant les deux membres de l'égalité $f(t) = P_n(t) + t^n.\epsilon(t)$ sur $I_x$ de bornes 0 et $x$, $\int_0^x f(t)dt = \int_0^x P_n(t)dt + \int_0^x t^n\epsilon(t)dt$ s'écrit $[F(t)]_0^x = \int_0^x \sum_{k=0}^{n} a_kt^kdt + o(x^{n+1})$, d'où $F(x) - F(0) = \displaystyle\sum_{k=0}^{n} \frac{a_k}{k+1}.x^{k+1} + o(x^{n+1})$, et enfin $F(x) = F(0) + \displaystyle\sum_{k=0}^{n} \frac{a_k}{k+1}x^{k+1} + o(x^{n+1})$. $\square$

**Dérivation d'un développement limité au voisinage de 0.** Attention, on ne dit pas que si une fonction $f$ admet un $DL_n(0)$ sur $U$, alors elle est dérivable sur $U$ et $f'$ admet un $DL_{n-1}(0)$ qui s'obtient en dérivant les termes du $DL_n(0)$ de $f$.

Le véritable énoncé est : $\forall n \in \mathbb{N}$, si $f$, de classe $C^1$ sur $U$, admet sur $U$ un $DL_n(0)$ : $f(x) = P_n(x) + o(x^n)$, si on sait que $f'$ admet un $DL_{n-1}(0)$ sur $U$, alors, $f$ étant une primitive de $f'$, le $DL_n(0)$ de $f$ sur $U$ se déduisant de celui de $f'$ par le résultat précédent, le $DL_{n-1}(0)$ de $f'$ est $f'(x) = P'_n(x) + o(x^{n-1})$.

**Exemple.** $\forall n \in \mathbb{N}^*$, le $DL_{2n+1}(0)$ sur $\mathbb{R}$ de la fonction exponentielle s'écrit : $\forall x \in \mathbb{R}, e^x = \displaystyle\sum_{k=0}^{2n+1} \frac{1}{k!}x^k + o(x^{2n+1})$.

On en déduit $e^{-x} = \displaystyle\sum_{k=0}^{2n+1} \frac{1}{k!}(-x)^k + o(x^{2n+1}) = \sum_{k=0}^{2n+1} \frac{(-1)^k}{k!}x^k + o(x^{2n+1})$, puis $sh(x) = \frac{1}{2}e^x - \frac{1}{2}e^{-x} = \displaystyle\sum_{k=0}^{2n+1} \frac{1 - (-1)^k}{2\,k!}x^k + o(x^{2n+1})$.

Et comme il est clair que $1 - (-1)^k$ est 0 lorsque $k$ est pair et 2 lorsque $k$ est impair, seuls les termes de degré impair subsistent, de sorte que $sh(x) = \displaystyle\sum_{k=0}^{n} \frac{1}{(2k+1)!}x^{2k+1} + o(x^{2n+1})$. $sh$ est dérivable sur $\mathbb{R}$ de dérivée $ch$, et $ch$, de classe $C^{2n-1}$ sur $\mathbb{R}$, est telle que $ch^{(2n)}(0)$ existe, donc son $DL_{2n}(0)$ existe.

Le $DL_{2n}(0)$ de $ch$ est donc obtenu par dérivation terme à terme du $DL_{2n+1}(0)$ de $sh$ :

$$
\forall x \in \mathbb{R}, ch(x) = \sum_{k=0}^{n} \frac{(2k + 1)}{(2k + 1)!}x^{2k} + o(x^{2n}) = \sum_{k=0}^{n} \frac{1}{(2k)!}x^{2k} + o(x^{2n})
$$

**Les $DL_n(0)$ à connaître.**

- $\dfrac{1}{1 - x} = 1 + x + x^2 + \dots + x^n + o(x^n)$
- $\dfrac{1}{1 + x} = 1 - x + x^2 + \dots + (-1)^nx^n + o(x^n)$ (on remplace $x$ par $-x$ dans le précédent)
- $\ln(1 + x) = x - \dfrac{x^2}{2} + \dfrac{x^3}{3} - \dots + (-1)^{n-1}\dfrac{x^n}{n} + o(x^n)$ (primitive du précédent)
- $\dfrac{1}{1 + x^2} = 1 - x^2 + x^4 - \dots + (-1)^nx^{2n} + o(x^{2n})$ (on remplace $x$ par $x^2$ dans $1/(1 + x)$)
- $\arctan(x) = x - \dfrac{x^3}{3} + \dfrac{x^5}{5} - \dots + (-1)^n\dfrac{x^{2n+1}}{2n + 1} + o(x^{2n+1})$ (primitive du précédent)
- $e^x = 1 + x + \dfrac{x^2}{2!} + \dfrac{x^3}{3!} + \dots + \dfrac{x^n}{n!} + o(x^n)$
- $ch(x) = 1 + \dfrac{x^2}{2!} + \dfrac{x^4}{4!} + \dots + \dfrac{x^{2n}}{(2n)!} + o(x^{2n})$ (partie paire)
- $sh(x) = x + \dfrac{x^3}{3!} + \dfrac{x^5}{5!} + \dots + \dfrac{x^{2n+1}}{(2n + 1)!} + o(x^{2n+1})$ (partie impaire)
- $\cos(x) = 1 - \dfrac{x^2}{2!} + \dfrac{x^4}{4!} - \dots + (-1)^n\dfrac{x^{2n}}{(2n)!} + o(x^{2n})$ ($ch(ix)$)
- $\sin(x) = x - \dfrac{x^3}{3!} + \dfrac{x^5}{5!} - \dots + (-1)^n\dfrac{x^{2n+1}}{(2n + 1)!} + o(x^{2n+1})$ ($sh(ix)$)

**Le $DL_n(0)$ de $x \to (1 + x)^\alpha$.** $\forall \alpha \in \mathbb{R}^*, \forall x \in ]-1, 1[$, $(1 + x)^\alpha = \displaystyle\sum_{k=0}^{n} \binom{\alpha}{k}x^k + o(x^n)$, aux abus d'écriture près : $\binom{\alpha}{0} = 1$ et, si $k \geq 1$, $\binom{\alpha}{k} = \dfrac{\alpha(\alpha - 1)(\alpha - 2)\dots(\alpha - k + 1)}{k!}$ (c'est un abus car $\alpha$ n'est pas un entier). Ce $DL_n(0)$ permet entre autres de développer $\sqrt{1 + x}$, $\sqrt{1 - x}$, $\dfrac{1}{\sqrt{1 + x}}$, $\dfrac{1}{\sqrt{1 - x}}$. Si $\alpha \in \mathbb{N}^*$ et si $n \geq \alpha + 1$, lorsque $k \geq \alpha + 1$, $\binom{\alpha}{k} = 0$ car le facteur $(\alpha - \alpha)$ est présent au numérateur. Le dernier terme non nul est alors celui dont le numérateur comporte comme dernier facteur $(\alpha - \alpha + 1) = 1$. Le développement de $(1 + x)^\alpha$ est alors exactement celui du binôme de Newton.

Ce n'est pas surprenant puisque $(1 + x)^\alpha$ est, dans ce cas particulier, une expression polynomiale.

## Exemples d'applications des développements limités

**L'obtention d'un équivalent.** Cherchons un équivalent de $\arctan(x) - \sin(x)$ au voisinage de 0. Avant de connaître les $DL$, on savait seulement que chaque terme était équivalent à $x$, mais, ne pouvant soustraire des équivalents, cela ne permettait pas de répondre à la question.

Les $DL_3(0)$ des deux termes sont $\arctan(x) = x - \dfrac{x^3}{3} + o(x^3)$ et $\sin(x) = x - \dfrac{x^3}{3!} + o(x^3)$.

Donc $\arctan(x) - \sin(x) = x - \dfrac{x^3}{3} - x + \dfrac{x^3}{6} + o(x^3) = -\dfrac{x^3}{6} + o(x^3)$, d'où $\arctan(x) - \sin(x) \overset{0}{\sim} -\dfrac{x^3}{6}$.

En effet, de façon générale, si $f(x) = \sum_{k=0}^{n} a_kx^k + o(x^n)$, alors

$$
f(x) = \left[\sum_{k=0}^{n} a_kx^k\right] \times \left(1 + \frac{x^n\epsilon(x)}{\sum_{k=0}^{n} a_kx^k}\right)
$$

Mais le polynôme $\sum_{k=0}^{n} a_kx^k$ est équivalent à son terme de plus bas degré, notons-le $a_px^p$ où $p \leq n$. Donc le quotient $\dfrac{x^n\epsilon(x)}{\sum_{k=0}^{n} a_kx^k}$ est équivalent à $\dfrac{x^n.\epsilon(x)}{a_p.x^p} = \dfrac{1}{a_p}x^{n-p}\epsilon(x)$, de limite 0 en 0. Donc $f(x) \overset{0}{\sim} \sum_{k=0}^{n} a_kx^k$.

**Exemple d'un calcul de limite.** Étudions la limite en 0 du quotient $\dfrac{\arctan(x) - \sin(x)}{\ln(1 + x) + e^{-x} - 1}$. Le $DL_3(0)$ du dénominateur est $x - \dfrac{x^2}{2} + \dfrac{x^3}{3} + 1 - x + \dfrac{(-x)^2}{2!} + \dfrac{(-x)^3}{3!} - 1 + o(x^3) = \dfrac{x^3}{6} + o(x^3)$.

Le dénominateur est équivalent à $\dfrac{x^3}{6}$ quand le numérateur l'est à $-\dfrac{x^3}{6}$.

Le quotient est donc équivalent à $\dfrac{-x^3/6}{x^3/6} = -1$. Le quotient a donc pour limite $-1$ en 0.

Les développements limités servent ainsi au calcul d'un équivalent de fonction en un point, au calcul d'une limite en un point et à l'approximation d'une fonction en une valeur.
