---
title: "Dérivabilité"
description: "Dérivabilité en un point et sur un intervalle, tangente, différentiabilité, extrema locaux, théorèmes de Rolle et des accroissements finis, prolongement dérivable, opérations, dérivées successives, formule de Leibniz, classes Ck et règle de L'Hôpital."
sidebar_position: 5
---

Toutes les fonctions considérées ici sont des fonctions $\mathbb{R} \to \mathbb{R}$.

## La dérivabilité en un point

**Fonction $f$ dérivable en $x_0$ élément de $D_f$.** Fonction $f$ définie au moins sur un intervalle $U$ contenant $x_0$, et vérifiant, pour tout réel $h$ tel que $x_0 + h \in U$, l'existence dans $\mathbb{R}$ de la limite $\lim\limits_{h \to 0} \dfrac{f(x_0 + h) - f(x_0)}{h} = a_{x_0} = f'(x_0)$ (limite notée $a_{x_0}$ et appelée nombre dérivé de $f$ en $x_0$).

**Exemple.** $f : x \to x^2$ en un quelconque $x_0$ réel. $\dfrac{f(x_0 + h) - f(x_0)}{h} = \dfrac{(x_0 + h)^2 - x_0^2}{h} = \dfrac{2x_0h + h^2}{h} = 2x_0 + h$ a pour limite $2x_0$ quand $h \to 0$. Donc $f$ est dérivable en tout $x_0$ réel, de nombre dérivé $a_{x_0} = 2x_0$.

**Fonction $f$ dérivable à gauche en $x_0$ élément de $D_f$.** Fonction $f$ définie au moins sur un intervalle $U = ]x_0 - \alpha, x_0]$ et vérifiant, pour tout réel $h$ tel que $x_0 - \alpha < x_0 + h \leq x_0$, l'existence dans $\mathbb{R}$ de la limite

$$
\lim_{h \to 0^-} \frac{f(x_0 + h) - f(x_0)}{h}
$$

**Fonction $f$ dérivable à droite en $x_0$ élément de $D_f$.** Fonction $f$ définie au moins sur un intervalle $U = [x_0, x_0 + \alpha[$ et vérifiant, pour tout réel $h$ tel que $x_0 \leq x_0 + h < x_0 + \alpha$, l'existence dans $\mathbb{R}$ de la limite

$$
\lim_{h \to 0^+} \frac{f(x_0 + h) - f(x_0)}{h}
$$

**Équivalence fondamentale.** Pour toute fonction $f$ définie au moins sur un intervalle $U = ]x_0 - \alpha, x_0 + \alpha[$, on a l'équivalence :

$$
f \text{ est dérivable en } x_0 \text{ de nombre dérivé } a_{x_0} \Leftrightarrow \begin{cases} f \text{ est dérivable à gauche en } x_0 \\ f \text{ est dérivable à droite en } x_0 \\ f'_d(x_0) = f'_g(x_0) = f'(x_0) \end{cases}
$$

**La non-dérivabilité en $x_0$** pour $f$ définie au moins sur un intervalle $U = ]x_0 - \alpha, x_0 + \alpha[$ résulte donc :

- soit de l'inexistence de l'une des limites unilatérales du taux de variation en $x_0$ ;
- soit du fait que l'une des limites unilatérales du taux de variation en $x_0$ est un infini ;
- soit du fait que, bien qu'existants, les nombres dérivés de $f$ à gauche et à droite sont distincts.

**Équation de la tangente à $C_f$ au point $M_0(x_0, f(x_0))$.** Lorsque $f$ est dérivable en $x_0$ de nombre dérivé $a_{x_0}$, l'équation de la tangente à sa courbe représentative $C_f$ au point $M_0(x_0, f(x_0))$ est

$$
y = a_{x_0}.x - a_{x_0}.x_0 + f(x_0)
$$

**Équations des demi-tangentes.** Lorsque la dérivabilité du côté considéré est avérée, la demi-tangente correspondante a pour équation $y = a_{x_0g}.x - a_{x_0g}.x_0 + f(x_0)$ ou $y = a_{x_0d}.x - a_{x_0d}x_0 + f(x_0)$ selon le cas.

**Lien avec la continuité.** Si $f$ est dérivable en $x_0$ (respectivement à gauche ou à droite), cela implique que $f$ est continue en $x_0$ (respectivement à gauche ou à droite).

*Démonstration.* Supposant $f$ dérivable en $x_0$, notant $\epsilon(h) = \dfrac{f(x_0 + h) - f(x_0)}{h} - a_{x_0}$, $\lim\limits_{h \to 0} \epsilon(h) = 0$, et comme $f(x_0 + h) = f(x_0) + h.a_{x_0} + h.\epsilon(h)$, $\lim\limits_{h \to 0} f(x_0 + h) = f(x_0)$, preuve de la continuité de $f$ en $x_0$. $\square$

**La différentiabilité en $x_0$.** Une fonction $f$ définie sur un intervalle $U = ]x_0 - \alpha, x_0 + \alpha[$ ($\alpha > 0$) est dite différentiable en $x_0$ lorsqu'il existe une fonction linéaire $df_{x_0} : h \to a.h$ et une fonction $\epsilon$ définie sur $U$ telle que $\lim\limits_{h \to 0} \epsilon(h) = 0$, vérifiant : $\forall h \in ]-\alpha, \alpha[$, la différence $\Delta f_{x_0}(h) = f(x_0 + h) - f(x_0) = a.h + h.\epsilon(h) = df_{x_0}(h) + h.\epsilon(h)$.

Autrement dit, la fonction-différence $\Delta f_{x_0}$ est approchée par la fonction linéaire plus simple $df_{x_0}$. $df_{x_0}$ est appelée différentielle de $f$ en $x_0$.

**Exemple.** $f : x \to x^2$ en un quelconque $x_0$ réel. $\Delta f_{x_0}(h) = f(x_0 + h) - f(x_0) = (x_0 + h)^2 - x_0^2 = 2x_0h + h^2 = a.h + h.\epsilon(h)$ où $a = 2x_0$ et $\epsilon(h) = h$. Donc en $x_0$ réel, $df_{x_0} : h \to 2x_0h$, où l'on peut remarquer que $2x_0$ est le nombre dérivé de $f$ en $x_0$.

**Équivalence "dérivabilité" et "différentiabilité" en un $x_0$.** Pour toute fonction $f$ définie au moins sur un intervalle $U = ]x_0 - \alpha, x_0 + \alpha[$ ($\alpha > 0$), on a l'équivalence : $f$ est dérivable en $x_0$ de nombre dérivé $a_{x_0}$ $\Leftrightarrow$ $f$ est différentiable en $x_0$ de différentielle $df_{x_0} : h \to a_{x_0}.h$.

## La dérivabilité sur un intervalle

**Fonction dérivable sur un intervalle $U$.** Fonction $f$ définie sur $U$ qui est :

- dérivable en tout réel $x$ de $U$ autre qu'une borne de $U$ ;
- dérivable du côté de l'intérieur de $U$ en toute borne de $U$ qui appartient à $U$.

**Exemples et contre-exemples.** $x \to x^2$ est dérivable sur tout intervalle de $\mathbb{R}$, $x \to \sqrt{x}$ est dérivable sur tout intervalle de $\mathbb{R}_+^*$. $x \to \sqrt{x}$ n'est pas dérivable sur $[0, +\infty[$ : $\lim\limits_{h \to 0^+} \dfrac{f(0 + h) - f(0)}{h} = +\infty$, demi-tangente verticale.

**Fonction dérivée de $f$.** Si $f$ est dérivable sur un intervalle $U$, sa dérivée est la fonction $f'$ définie sur $U$ par $\forall x \in U, f'(x) = a_x =$ nombre dérivé de $f$ en $x$. L'équation de la tangente à $C_f$ au point $M(x_0, f(x_0))$ s'écrit alors $y = f'(x_0).x - f'(x_0).x_0 + f(x_0)$.

L'expression de la différentiabilité en $x_0$ s'écrit alors $\Delta f_{x_0}(h) = f(x_0 + h) - f(x_0) = f'(x_0).h + h.\epsilon(h) = df_{x_0}(h) + h.\epsilon(h)$ où $df_{x_0} : h \to f'(x_0).h$.

On appelle développement limité d'ordre 1 en $x_0$ l'égalité $f(x_0 + h) = f(x_0) + f'(x_0).h + h.\epsilon(h)$, dans laquelle on peut remarquer que $h.\epsilon(h) = o(h)$ puisque $\lim\limits_{h \to 0} \epsilon(h) = 0$.

**Nombre dérivé à gauche ou à droite, nouvelle notation.** On note $f'_g(x)$ et $f'_d(x)$ les nombres dérivés à gauche et à droite.

**Recherche des extrema locaux de $f$ sur un intervalle $]a, b[$.** Si $f$ est dérivable sur un intervalle $]a, b[$, alors les éventuels extrema locaux de $f$ sur $]a, b[$ sont atteints en des réels de $]a, b[$ solutions de l'équation $f'(x) = 0$.

**Exemple.** Recherche des extrema locaux de $f : x^4 - 2x^2$ sur $]-1/2, 2[$. $f'(x) = 4x^3 - 4x$ ; $f'(x) = 0$ a pour solutions dans $\mathbb{R}$ les réels $-1$, $0$ et $1$. Seuls parmi eux, $0$ et $1$ sont éléments de $]-1/2, 2[$ : c'est donc en ces deux seuls réels qu'il est utile d'examiner le problème, et les variations de $f$ autour de ces réels nous donnent la réponse.

**Théorème III.3 (de Rolle).** $f$ est une fonction définie au moins sur un intervalle $[a, b]$ de $\mathbb{R}$. Si $f$ est continue sur $[a, b]$, dérivable sur $]a, b[$, telle que $f(a) = f(b)$, alors $\exists c \in ]a, b[, f'(c) = 0$.

**Théorème III.4 (des accroissements finis).** $f$ est définie au moins sur $[a, b]$. Si $f$ est continue sur $[a, b]$ et dérivable sur $]a, b[$, alors $\exists c \in ]a, b[, f'(c) = \frac{f(b) - f(a)}{b - a}$ (on peut remarquer que c'est le théorème de Rolle étendu).

**Égalité et inégalité des accroissements finis.** $f$ est définie au moins sur un intervalle $[a, b]$. Si $f$ est continue sur $[a, b]$, dérivable sur $]a, b[$ :

- $\exists c \in ]a, b[, f(b) - f(a) = f'(c).(b - a)$, égalité des accroissements finis (c'est le TAF) ;
- si de plus $\exists M \in \mathbb{R}_+^*, \forall x \in [a, b], |f'(x)| \leq M$, alors $|f(b) - f(a)| \leq M.|b - a|$, inégalité des accroissements finis, et $\forall (x, x') \in ]a, b[^2, |f(x') - f(x)| \leq M.|x' - x|$ : $f$ est $M$-lipschitzienne sur $]a, b[$.

**Le sens de variation déduit du signe de la dérivée.** $f$ est définie au moins sur un intervalle $[a, b]$. Si $f$ est continue sur $[a, b]$ et dérivable sur $]a, b[$, alors :

- si $\forall c \in ]a, b[, f'(c) \geq 0$, $f$ est croissante sur $[a, b]$ ;
- si $\forall c \in ]a, b[, f'(c) \leq 0$, $f$ est décroissante sur $[a, b]$ ;
- si $\forall c \in ]a, b[, f'(c) = 0$, $f$ est constante sur $[a, b]$.

**Le théorème de dérivabilité aux bornes (dit parfois du prolongement dérivable).** $\alpha$ désigne un réel positif.

- Soit $f$ une fonction dérivable sur $]x_0 - \alpha, x_0[$, continue sur $]x_0 - \alpha, x_0]$ et telle que $\lim\limits_{x \to x_0^-} f'(x) = l$ ; alors $f$ est dérivable à gauche en $x_0$ et $f'_g(x_0) = l$.
- Soit $f$ une fonction dérivable sur $]x_0, x_0 + \alpha[$, continue sur $[x_0, x_0 + \alpha[$ et telle que $\lim\limits_{x \to x_0^+} f'(x) = l$ ; alors $f$ est dérivable à droite en $x_0$ et $f'_d(x_0) = l$.
- $E$ est une partie de $\mathbb{R}$ constituée d'une réunion d'intervalles. $f$ est une application de $E$ dans $\mathbb{R}$ dérivable (donc continue) sur tout intervalle inclus dans $E$, $a$ est un réel n'appartenant pas à $E$ et borne d'un des intervalles constituant $E$. Si $f$ est prolongeable par continuité à $E \cup \{a\}$, dérivable sur le (ou les) intervalles ouverts inclus dans $E$ dont $a$ est borne, et telle que $\lim\limits_{x \to a} f'(x) = l$, $l$ étant un réel, alors le prolongement continu $\tilde{f}$ de $f$ à $E \cup \{a\}$ est dérivable en $a$ et $\tilde{f}'(a) = l$.

## Fonctions obtenues par opérations sur des fonctions dérivables

Théorèmes généraux relatifs aux opérations sur les fonctions dérivables.

**Propriété 1.** $f$ et $g$ sont deux fonctions simultanément dérivables sur un même intervalle $U$.

- $\forall (\lambda, \mu) \in \mathbb{R}^2$, $\lambda f + \mu g$ est dérivable sur $U$ et $(\lambda f + \mu g)' = \lambda f' + \mu g'$.
- $f \times g$ est dérivable sur $U$, $(f \times g)' = f' \times g + f \times g'$, et $\forall n \in \mathbb{N}$, $f^n = f \times f \times f \times \dots \times f$ est dérivable sur $U$ de dérivée $(f^n)' = n.f^{n-1}.f'$.
- Si $0 \notin g(U)$, alors $\dfrac{1}{g}$ et $\dfrac{f}{g}$ sont dérivables sur $U$, $\left(\dfrac{1}{g}\right)' = -\dfrac{g'}{g^2}$, $\left(\dfrac{f}{g}\right)' = \dfrac{f'g - fg'}{g^2}$, et $\forall n \in \mathbb{Z}$, $g^n = g \times g \times \dots \times g$ est dérivable sur $U$ de dérivée $(g^n)' = n.g^{n-1}.g'$.

**Propriété 2.**

- Si $f$ est une fonction dérivable sur un intervalle $U$, si $g$ est une fonction dérivable sur un intervalle $V$ contenant $f(U)$, alors $g \circ f$ est dérivable sur $U$ et $(g \circ f)' = g' \circ f \times f'$.
- Si $f$ est une fonction dérivable sur un intervalle $U$ tel que $f(U) \subset U$, alors $\forall n \in \mathbb{N}^*$, $f^n = f \circ f \circ f \circ \dots \circ f$ est dérivable sur $U$ et $(f^n)' = \displaystyle\prod_{k=0}^{n-1} f' \circ f^k$.
- Pour toute bijection $f : U \to f(U)$ ($U$ intervalle de $\mathbb{R}$), dérivable sur $U$, telle que $\forall x \in U, f'(x) \neq 0$, $f^{-1}$ est dérivable sur $f(U)$ et $\forall x \in f(U)$, $(f^{-1})'(x) = \dfrac{1}{f'(f^{-1}(x))}$.

## Dérivations successives

**Dérivée $n$-ième d'une fonction sur un intervalle $U$.** $f$ est une fonction supposée définie sur un intervalle $U$ de $\mathbb{R}$. $f^{(0)} = f$ par convention. Si $f$ est dérivable sur $U$, sa dérivée $f'$ peut se noter $f^{(1)}$… Si, pour un entier naturel $n \geq 1$, $f$ est dérivable sur $U$ jusqu'à l'ordre $n - 1$, et si $f^{(n-1)}$ est dérivable sur $U$, on note $f^{(n)} = (f^{(n-1)})'$ la dérivée d'ordre $n$ de $f$ sur $U$.

**Exemple.** Pour $f : x \to x^{12}$, ses dérivées successives sur $U = \mathbb{R}$ sont, au-delà de $f^{(0)} = f$, définies par les expressions $f^{(1)}(x) = 12.x^{11}$ … $f^{(n)}(x) = \dfrac{12!}{(12 - n)!}x^{12-n}$ si $n \in [0, 12]$ et $f^{(n)}(x) = 0$ si $n \geq 13$.

**Dérivées d'ordre $n$ de fonctions obtenues par opérations sur des fonctions dérivables.** $f$ et $g$ sont des fonctions supposées $m$ fois dérivables sur un intervalle $U$.

- $\forall (\lambda, \mu) \in \mathbb{R}^2$, $\lambda f + \mu g$ est $m$ fois dérivable sur $U$ et $\forall n \in [0, m]$, $(\lambda f + \mu g)^{(n)} = \lambda f^{(n)} + \mu g^{(n)}$.
- $f \times g$ est $m$ fois dérivable sur $U$ et $\forall n \in [0, m]$, $(f \times g)^{(n)} = \displaystyle\sum_{k=0}^{n} \binom{n}{k} f^{(k)} \times g^{(n-k)}$ : c'est la formule de Leibniz.

**Exemples.**

- $\phi : x \to 2.\sin(3x) - 3.\cos(2x)$ ; on cherche $\phi^{(9)}(x)$.

  $\forall x \in \mathbb{R}, \phi(x) = 2.f(x) - 3g(x)$ où $f(x) = \sin(3x)$ et $g(x) = \cos(2x)$. Chaque dérivation de $f$ provoque l'apparition d'un facteur 3. Toutes les 4 dérivations de $\sin$, on réobtient $\sin$. On a 9 dérivations successives, donc à la huitième on réobtient $\sin$ et à la neuvième on obtient $\cos$.

  Chaque dérivation de $g$ provoque l'apparition d'un facteur 2. Toutes les 4 dérivations de $\cos$, on réobtient $\cos$. On a 9 dérivations successives, donc à la huitième on réobtient $\cos$ et à la neuvième $-\sin$.

  Ainsi $\phi^{(9)}(x) = 2.f^{(9)}(x) - 3g^{(9)}(x) = 2.3^9.\cos(3x) + 3.2^9\sin(2x)$.

- $\phi : x \to x^3e^{ax}$ où $a \neq 0$. Calculons $\phi^{(3)}(x)$.

  $\forall x \in \mathbb{R}, \phi(x) = f(x) \times g(x)$ où $f(x) = x^3$, de dérivées successives $3x^2, 6x, 6$ puis 0 à partir de l'ordre 4, et où $g(x) = e^{ax}$, de dérivées successives $a.e^{ax}, a^2.e^{ax}, \dots, a^ne^{ax}$. Appliquons la formule de Leibniz pour $n = 3$ :

  $$
  \begin{aligned}
  \phi^{(3)}(x) &= (f \times g)^{(3)}(x) = \sum_{k=0}^{3} \binom{3}{k} f^{(k)} \times g^{(3-k)} \\
  &= \binom{3}{0}f^{(0)}(x) \times g^{(3)}(x) + \binom{3}{1}f^{(1)}(x) \times g^{(2)}(x) + \binom{3}{2}f^{(2)}(x) \times g^{(1)}(x) + \binom{3}{3}f^{(3)}(x) \times g^{(0)}(x) \\
  &= 1.f(x) \times g^{(3)}(x) + 3.f'(x) \times g''(x) + 3.f''(x) \times g'(x) + 1.f^{(3)}(x) \times g(x) \\
  &= 1.x^3 \times a^3.e^{ax} + 3.3x^2 \times a^2.e^{ax} + 3.6x \times a.e^{ax} + 1.6 \times e^{ax} \\
  &= (a^3.x^3 + 9a^2x^2 + 18ax + 6) \times e^{ax}
  \end{aligned}
  $$

**Classe $C^k(U)$ où $U$ est un intervalle de $\mathbb{R}$.** C'est l'ensemble des fonctions définies sur $U$, à valeurs réelles, qui sont $k$ fois dérivables sur $U$ et telles que leur dérivée d'ordre $k$, $f^{(k)}$, soit continue sur $U$.

Parce que dérivables sur $U$, toutes les dérivées de $f$ d'ordre inférieur à $k$ sont continues sur $U$.

**Classe $C^\infty(U)$ où $U$ est un intervalle de $\mathbb{R}$.** C'est l'ensemble des fonctions définies sur $U$, à valeurs réelles, qui sont dérivables sur $U$ à tout ordre.

## Règle de L'Hôpital

Cette règle figure dans la version résumée du chapitre :

$$
\lim \frac{f}{g} = \lim \frac{f'}{g'} = \lim \frac{f''}{g''}
$$
