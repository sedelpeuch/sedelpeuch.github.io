---
title: "Fonctions de plusieurs variables réelles"
description: "Différentielle et dérivées directionnelles, dérivées partielles, matrice jacobienne, divergence et rotationnel, différentielles d'ordre supérieur, difféomorphismes et inversion, extrema, fonctions implicites, courbes de niveau et plan tangent."
sidebar_position: 1
---

## Notion de différentielle / dérivée

### Définition

**Cas général.** Soient $E$ et $F$ deux espaces vectoriels normés. Soit $U$ un ouvert de $E$. On dit qu'une application $f$ de $U$ dans $F$ est différentiable en $x_0 \in U$ s'il existe une application linéaire continue $L$ telle que $\forall h \in E$ vérifiant $x_0 + h \in U$,

$$
f(x_0 + h) = f(x_0) + L(h) + \|h\|_E\, \varepsilon(x_0, h)
$$

avec $\displaystyle\lim_{\|h\|_E \to 0} \|\varepsilon(x_0, h)\|_F = 0$.

L'application $L$ est la différentielle de $f$ au point $x_0$ et elle est souvent notée $df(x_0)$, $Df(x_0)$, $d_{x_0}f$.

**Cas particulier $E = \mathbb{R}$.** On pose $h = x - x_0$. Soit $F$ un espace vectoriel normé. Soit $U$ un intervalle ouvert de $\mathbb{R}$. On dit qu'une application $f$ de $U$ dans $F$ est différentiable en $x_0 \in U$ s'il existe une application linéaire continue $L$ telle que $\forall x \in U$

$$
f(x) = f(x_0) + L(x - x_0) + |x - x_0|\, \varepsilon(x, x_0)
$$

avec $\displaystyle\lim_{x \to x_0} \varepsilon(x, x_0) = 0_F$.

**Si de plus $F = \mathbb{R}$.** L'application $L$ s'écrit $L(x - x_0) = \alpha (x - x_0)$ où $\alpha \in \mathbb{R}$. La constante $\alpha$ est notée $f'(x_0)$. La définition précédente peut se réécrire

$$
f(x) = f(x_0) + f'(x_0)\,(x - x_0) + |x - x_0|\, \varepsilon(x, x_0)
$$

$$
\frac{f(x) - f(x_0)}{x - x_0} = f'(x_0) + \varepsilon(x, x_0)
$$

donc

$$
\lim_{x \to x_0} \frac{f(x) - f(x_0)}{x - x_0} = f'(x_0)
$$

**Remarque.** Si $F = \mathbb{R}^n$ alors $\alpha \in \mathbb{R}^n$. Si $E = \mathbb{R}^n$ et $F = \mathbb{R}^p$, alors $\alpha \in \mathcal{M}_{n,p}$.
Si $h = x - x_0 > 0$ alors on parle de dérivée à droite, si $h < 0$ on parle alors de dérivée à gauche. Dans le cas réel, l'application $f$ est différentiable en $x_0$ si et seulement si $f$ est dérivable à droite et à gauche et $f'_d(x_0) = f'_g(x_0)$.

**Définition.** $U$ est un ouvert d'un evn $E$. L'application $f$ est dite différentiable sur $U$ si $f$ est différentiable en tout point de $U$.

**Définition.** L'application $f$ est dérivable dans la direction $v \in E$ en $x_0$ si la limite $\displaystyle\lim_{t \to 0} \frac{f(x_0 + tv) - f(x_0)}{t}$ existe (peut dépendre de $v$ et $t \in \mathbb{R}^+$).

**Remarque.** Une application peut admettre des dérivées dans toutes les directions sans être différentiable en ce point.

*[Exercice 1](./exercices-calcul-differentiel.md)*

**Exemple.**

$$
f : \begin{cases} \mathbb{R}^2 \to \mathbb{R} \\[4pt] f(x, y) = \begin{cases} \dfrac{x^6}{x^8 + (y - x^2)^2} & (x, y) \neq (0, 0) \\[4pt] 0 & (x, y) = (0, 0) \end{cases} \end{cases}
$$

Soit $(u, v) \in \mathbb{R}^2$, la dérivée de $(u, v)$ en $(0, 0)$ est

$$
\begin{aligned}
\lim_{t \to 0} \frac{f(tu, tv) - f(0, 0)}{t} &= \lim_{t \to 0} \frac{1}{t} \left( \frac{t^6 u^6}{t^8 u^8 + (tv - t^2 u^2)^2} \right) \\
&= \lim_{t \to 0} \frac{t^3 u^6}{t^6 u^8 + (v - t u^2)^2} \\
&= 0
\end{aligned}
$$

$f$ admet donc une dérivée dans toutes les directions en $(0, 0)$. De plus $\displaystyle\lim_{x \to 0} f(x, x^2) = +\infty$ donc $f$ n'est pas continue en $(0, 0)$, donc la fonction n'est pas différentiable en $(0, 0)$.

### Propriétés

**Théorème I.1.** Soit $U$ un ouvert de $E$, un espace vectoriel normé, et $f$ une application de $E$ dans $F$ (un evn). Si l'application $f$ est différentiable en $x_0 \in U$ alors sa différentielle est unique.

**Théorème I.2.** (Application linéaire) Soient $E$ et $F$ deux e.v.n., $f$ une application linéaire de $E$ dans $F$. Alors $f$ est différentiable sur $U$ et pour tout $x \in U$,

$$
df(x) = f
$$

**Théorème I.3.** Soient $E$ et $F$ deux e.v.n., soit $f$ une application de $E$ dans $F$. Si $f$ est différentiable en $x_0 \in U$ alors $f$ est continue en $x_0$.

**Théorème I.4.** (Forme bilinéaire) Une application bilinéaire continue $f : E_1 \times E_2 \to F$ est différentiable en tout point $(x_1, x_2) \in U \subset E_1 \times E_2$, et sa différentielle est l'application linéaire de $E_1 \times E_2$ dans $F$

$$
(h_1, h_2) \mapsto df(x_1, x_2)(h_1, h_2) = f(h_1, x_2) + f(x_1, h_2)
$$

**Théorème I.5.** (Applications composées) Soient $E, F, G$ trois espaces vectoriels normés, $U$ un ouvert de $E$, $V$ un ouvert de $F$, deux applications $f : U \to F$ et $g : V \to G$, et $a \in U$ tel que $f(a) \in V$. On suppose $f$ différentiable en $a$ et on suppose $g$ différentiable en $f(a)$. Alors $g \circ f$ est différentiable en $a$ et a pour différentielle en ce point

$$
d(g \circ f)(a) = dg(f(a)) \circ df(a)
$$

**Théorème I.6.** (Différentielle d'un produit) Soit $E$ un espace vectoriel normé sur $\mathbb{K}$, $U$ un ouvert de $E$. Soient $f, g$ deux applications de $U$ dans $\mathbb{K}$, $x_0 \in U$. On pose $h = fg$. L'application $h$ est composée de

$$
(f, g) : \begin{cases} U \to \mathbb{K} \times \mathbb{K} \\ x_0 \mapsto (f(x_0), g(x_0)) \end{cases}
\quad \text{et de l'application bilinéaire continue} \quad
\phi : \begin{cases} \mathbb{K} \times \mathbb{K} \to \mathbb{K} \\ (y_1, y_2) \mapsto y_1 \cdot y_2 \end{cases}
$$

Si $f$ et $g$ sont différentiables en $x_0$ alors $h = fg$ l'est aussi, et on a pour tout $k \in E$ la formule de Leibniz

$$
dh(x_0)(k) = dg(x_0)(k) \cdot f(x_0) + df(x_0)(k) \cdot g(x_0)
$$

**Corollaire.** Si $f$ est différentiable sur $U$ et $g$ différentiable sur $V$ alors $g \circ f$ est différentiable sur son domaine $U \cap f^{-1}(V)$.

**Théorème I.7.** (Linéarité) Soient $f, g$ deux applications différentiables de $U \subset E$ et $\alpha, \beta$ deux scalaires

$$
d(\alpha f + \beta g) = \alpha\, df + \beta\, dg
$$

**Théorème I.8.** Toute application constante est différentiable et sa différentielle est l'application nulle.

## Applications partielles et dérivées partielles

### Applications partielles

**Définition.** Soit $U$ un ouvert de $E_1 \times E_2 = E$, espace produit de deux espaces vectoriels normés $E_1$ et $E_2$, et $f : \begin{cases} U \to F \\ (x_1, x_2) \mapsto f(x_1, x_2) \end{cases}$. Soit $a = (a_1, a_2) \in U$. On appelle première application partielle associée à $f$ au point $a$ l'application $x_1 \mapsto f(x_1, a_2)$. Elle est définie sur l'ouvert de $E_1$ : $U_1 = \{x_1 \in E_1, (x_1, a_2) \in U\}$. On appelle deuxième application partielle associée à $f$ au point $a$ l'application

$$
x_2 \mapsto f(a_1, x_2)
$$

Elle est définie sur l'ouvert de $E_2$

$$
U_2 = \{x_2 \in E_2, (a_1, x_2) \in U\}
$$

### Différentielles partielles, dérivées partielles

**Définition.** Si la première application partielle associée à $f$ au point $a$ est différentiable au point $a \in U$, sa différentielle est appelée différentielle partielle de $f$ par rapport à sa première variable au point $a$ et notée $df_{x_1}(a)$ ou $d_1 f(a)$. De même pour la seconde variable.

**Remarque.** Ces définitions s'étendent au cas $E_1 \times E_2 \times E_3 \times \dots \times E_n$.

**Proposition.** Si l'application $f$ est différentiable au point $a = (a_1, a_2) \in U$, les deux applications partielles associées à $f$ au point $a$ sont différentiables, respectivement aux points $a_1 \in U_1$ et $a_2 \in U_2$, et on a la relation

$$
df(a)(h) = df_{x_1}(a)(h_1) + df_{x_2}(a)(h_2)
\qquad h = (h_1, h_2) \in E_1 \times E_2
$$

*Démonstration.* Différentielle d'applications composées.

**Remarque.** Attention, l'existence des différentielles partielles ne suffit pas à assurer la différentiabilité de $f$.

**Théorème I.9.** Pour qu'une application $f$ définie sur $E_1 \times E_2 \times \dots \times E_n$ soit différentiable en $a$, il suffit que les $n$ différentielles partielles existent et soient continues en $a$.

**Théorème I.10.** Soient $E, F, G$ trois espaces vectoriels normés où $E = E_1 \times E_2 \times \dots \times E_n$ est un produit de $n$ e.v.n., $U \subset E$ un ouvert, $V \subset F$ un ouvert. $f$ est une application différentiable de $U$ dans $F$ et $g$ une application différentiable de $V$ dans $G$. Alors pour tout $a \in U$ tel que $f(a) \in V$

$$
\partial_i (g \circ f)(a) = dg(f(a)) \circ \partial_i f(a)
$$

où $\partial_i$ désigne la différentielle partielle : $\partial_i f(a) = df_{x_i}(a)$.

**Remarque.** Si $E = \mathbb{R}^n$, les différentielles partielles s'écrivent

$$
\begin{aligned}
df_{x_i}(a)(h_i) &= \partial_i f(a)(h_i) \\
&= \frac{\partial f(a)}{\partial x_i} h_i
\end{aligned}
$$

où $\dfrac{\partial f}{\partial x_i}$ est la $i$-ème dérivée partielle.

*[Exercices 2, 3, 4, 5](./exercices-calcul-differentiel.md)*

## Applications à valeurs dans un espace produit

**Définition (Composantes d'une application).** Soient $U$ un ouvert d'un espace vectoriel normé $E$ et $F = F_1 \times F_2$. Soient $p_1 : F \to F_1$ et $p_2 : F \to F_2$ les projections (applications linéaires continues). Soit $f : U \to F$. Les applications $f_1 = p_1 \circ f$ et $f_2 = p_2 \circ f$ de $U$ dans les espaces $F_1$ et $F_2$ sont appelées composantes de l'application.

**Proposition.** Une application $f$ de $U$ dans $F = F_1 \times F_2$ est différentiable en $a \in U$ si et seulement si $f_1 = p_1 \circ f$ et $f_2 = p_2 \circ f$ sont différentiables en $a \in U$. Lorsque c'est le cas, on a

$$
df(a) = (df_1(a), df_2(a))
$$

où $df_1(a) = d(p_1 \circ f)(a) = dp_1(f(a)) \circ df(a) = p_1 \circ df(a)$ et $df_2(a) = d(p_2 \circ f)(a) = dp_2(f(a)) \circ df(a) = p_2 \circ df(a)$. De même, $f$ est différentiable sur $U$ si et seulement si $f_1$ et $f_2$ sont différentiables sur $U$.

*Démonstration.* Si $f$ est différentiable alors ... donc $f_1$ et $f_2$ sont différentiables.
Passons à la réciproque. Supposons $f_1$ et $f_2$ différentiables. On munit $F_1 \times F_2$ de la norme $\|(y_1, y_2)\|_\infty = \max\{\|y_1\|, \|y_2\|\}$.
Soit $h \in E$ et $x_0 \in U \subset E$, on pose

$$
L(h) = (df_1(x_0)(h), df_2(x_0)(h))
$$

On a alors

$$
\begin{aligned}
\|f(x_0 + h) - f(x_0) - L(h)\|_\infty &= \max_{i = 1, 2} \{\|f_i(x_0 + h) - f_i(x_0) - df_i(x_0)(h)\|\} \\
&= \max_{i = 1, 2} \{\|h\|_E \|\epsilon_i(x_0, h)\|\} \\
&= \|h\|_E \|\epsilon(x_0, h)\|_\infty
\end{aligned}
$$

donc $f$ est différentiable et $df = (df_1, df_2)$.

**Remarque.**

1. $f$ est différentiable sur $U$ si et seulement si $f_1$ et $f_2$ le sont.
2. Se généralise au cas où $F = F_1 \times F_2 \times \dots \times F_n$.

### Applications de $\mathbb{R}^n$ dans $\mathbb{R}^p$

Soient $(e_i)_{i = 1, \dots, n}$ une base de $\mathbb{R}^n$, $(e'_j)_{j = 1, \dots, p}$ une base de $\mathbb{R}^p$, $U$ un ouvert de $\mathbb{R}^n$ et $f : U \to \mathbb{R}^p$ une application différentiable au point $a \in U$.

**Définition.** L'application linéaire $df(a)$ est déterminée par la donnée de sa matrice dans les bases $(e_i)_i$ et $(e'_j)_j$. Cette matrice est appelée **matrice jacobienne** de $f$ au point $a$ dans les bases $(e_i)_i$ et $(e'_j)_j$. Les vecteurs colonnes de cette matrice sont formés avec les composantes des $n$ vecteurs $\dfrac{\partial f}{\partial x_i}$ dans la base $(e'_j)$.

$$
\mathcal{J}_{f(a)} = \begin{pmatrix}
\dfrac{\partial f_1(a)}{\partial x_1} & \dfrac{\partial f_1(a)}{\partial x_2} & \cdots & \dfrac{\partial f_1(a)}{\partial x_n} \\[8pt]
\dfrac{\partial f_2(a)}{\partial x_1} & \ddots & \cdots & \dfrac{\partial f_2(a)}{\partial x_n} \\[8pt]
\vdots & \vdots & \ddots & \vdots \\[4pt]
\dfrac{\partial f_p(a)}{\partial x_1} & \cdots & \cdots & \dfrac{\partial f_p(a)}{\partial x_n}
\end{pmatrix}
$$

Si $n = p$, le déterminant de la matrice jacobienne est appelé le jacobien de l'application $f$ au point $a$ dans les bases considérées.

*[Exercice 6](./exercices-calcul-differentiel.md)*

### Divergence et rotationnel dans $\mathbb{R}^3$

**Définition.** Soit $f$ une application définie sur $\mathbb{R}^3$ et à valeurs dans $\mathbb{R}^3$ ayant pour composantes $f_1, f_2, f_3$. On appelle divergence de $f$ l'application de $\mathbb{R}^3$ dans $\mathbb{R}$ définie par

$$
\operatorname{div}(f) = \frac{\partial f_1}{\partial x_1} + \frac{\partial f_2}{\partial x_2} + \frac{\partial f_3}{\partial x_3} = \vec{\nabla} \cdot \vec{f}
$$

**Remarque.** Se généralise en dimension quelconque.

**Définition.** On appelle rotationnel de $f$ l'application de $\mathbb{R}^3$ dans $\mathbb{R}^3$ définie par

$$
\operatorname{rot}(f) = \vec{\nabla} \wedge \vec{f}
$$

### Espaces $C^0(U, F)$ et $C^1(U, F)$

**Définition.** L'ensemble des applications continues de $U$ dans $F$ est un espace vectoriel noté $C^0(U, F)$. Les applications différentiables sur $U$ dont la différentielle est continue sur $U$ sont dites "continûment différentiables" ou de classe $C^1$ sur $U$. Cet ensemble est $C^1(U, F)$.

**Théorème I.11.** $C^1(U, F)$ est un sous-espace vectoriel de $C^0(U, F)$.

**Théorème I.12.** Soit $f$ une application définie sur un ouvert $U$ de $E = E_1 \times \dots \times E_n$. Pour que $f$ soit de classe $C^1$ sur $U$, il faut et il suffit que chacune des différentielles partielles **existe** et soit **continue** sur $U$.

## Différentielles d'ordre supérieur

**Définition.** Soient $k \in \mathbb{N}$, $f$ une application de $U$ ouvert de $E$ (e.v.n.) dans $F$ (e.v.n.). $f$ est dite

- de classe $C^0$ sur $U$ si elle est continue sur $U$ ;
- de classe $C^{k+1}$ sur $U$ si elle est différentiable et si sa différentielle $df$ est de classe $C^k$ sur $U$ ;
- de classe $C^\infty$ sur $U$ si elle est de classe $C^k$ pour tout entier $k$.

**Remarque.** On note $C^k(U, F)$ l'espace des applications de classe $C^k$ de $U$ à valeurs dans $F$. La différentielle $k$-ième de $f$ est notée $d^k f$ et est définie par récurrence : $d^0 f = f, \dots, d^k f = d(d^{k-1} f)$.

**Théorème I.13.** La composée d'applications de classe $C^k$ est une application de classe $C^k$.

**Théorème I.14.** Soient $E$ et $F$ deux evn, $U$ un ouvert de $E$ et $f$ une application de $U$ dans $F$. Pour tout entier $n \geq 1$, l'ensemble des applications de $U$ dans $F$ $n$ fois différentiables en un point $a \in U$ est un espace vectoriel, et l'application qui associe à une application élément de cet espace sa différentielle d'ordre $n$ au point $a$ est linéaire :

$$
\begin{aligned}
f &\mapsto d^n f(a) \\
\alpha f + \beta g &\mapsto \alpha\, d^n f(a) + \beta\, d^n g(a)
\end{aligned}
$$

*Démonstration.* Par récurrence.

**Proposition.** (Symétrie des différentielles d'ordre supérieur) Soient $E$ et $F$ deux e.v.n., $U$ un ouvert de $E$ et $f$ une application de $U$ dans $F$. On suppose $f$ deux fois différentiable en un point $a \in U$. Sa différentielle seconde $d^2 f(a)$ au point $a$ est une application bilinéaire continue et symétrique de $E^2$ dans $F$ : $\forall (h, k) \in E^2$

$$
d^2 f(a)(h, k) = d^2 f(a)(k, h)
$$

**Théorème I.15.** Soient $E$ et $F$ deux e.v.n., $U$ un ouvert de $E$ et $f$ une application de $U$ dans $F$. On suppose $f$ $n$ fois différentiable en un point $a \in U$.
Sa différentielle d'ordre $n$, $d^n f(a)$, au point $a$ est une application multilinéaire continue et symétrique de $E^n$ dans $F$.

**Théorème I.16.** (Schwarz) Soit $f$ une application définie sur un ouvert $U$ de $\mathbb{R}^n$ à valeurs dans $F$ (e.v.n.) telle que la différentielle d'ordre $p$, $d^p f(a)$, au point $a \in U$ existe. Alors la différentielle partielle $\dfrac{\partial^p f}{\partial x_i \dots \partial x_j}$ est une application symétrique de $i, \dots, j$ (dans le cas de $\mathbb{R}^n$, la valeur d'une dérivée partielle d'ordre $p$ ne change pas lorsqu'on change l'ordre des dérivations successives).

*[Exercices 7, 8](./exercices-calcul-differentiel.md)*

**Définition.** Soit $f$ une application définie sur un segment $[a, b]$ de $\mathbb{R}$ et à valeurs dans $F$. On dit que $f$ est $C^k$ par morceaux sur $[a, b]$ s'il existe une subdivision $(a_0, \dots, a_n)$ de $[a, b]$ telle que la restriction de $f$ à chacun des intervalles $]a_{i-1}, a_i[$ soit prolongeable en application de classe $C^k$ sur $[a_{i-1}, a_i]$.

**Théorème I.17.** Soit $I$ un intervalle de $\mathbb{R}$ et $f$ une application de $I$ dans $F$. Si $f$ est continue sur $I$ et de classe $C^1$ par morceaux sur cet intervalle, alors $f$ est constante si et seulement si $df = 0$ ($\Leftrightarrow f' = 0$).

## Difféomorphisme de classe $C^k$

**Définition.** Soient $E$ et $F$ deux e.v.n., $U$ un ouvert de $E$ et $f$ une application de $U$ dans $F$. On dit que $f$ est un difféomorphisme de $U$ sur un ouvert $V$ de $F$ si $f$ est différentiable sur $U$, si elle est une bijection de $U$ sur $V$ et si l'application réciproque $f^{-1} : V \to E$ est différentiable sur $V$. On dit que $f$ est un $C^k$-difféomorphisme si $f$ est un difféomorphisme et si $f$ et $f^{-1}$ sont de classe $C^k$.

**Théorème I.18.** (Inversion locale) Soit $U$ un ouvert d'un espace vectoriel normé complet $E$, et $f$ une application différentiable de classe $C^k$ de $U$ dans $F$ (evn complet, un Banach). Soit $a$ un point de $U$. Si $df(a)$ est un isomorphisme de $E$ dans $F$, alors $f$ est un $C^k$-difféomorphisme d'un voisinage ouvert de $a$ vers un voisinage ouvert de $f(a)$.

**Théorème I.19.** (Inversion globale, cas scalaire) Soit $U$ un intervalle de $\mathbb{R}$ et $\phi$ une application de classe $C^k$ de $U$ dans $\mathbb{R}$. L'application $\phi$ sera un $C^k$-difféomorphisme de l'intervalle $U$ dans l'intervalle $\phi(U)$ si et seulement si

$$
\forall x \in U, \ \phi'(x) \neq 0
$$

*Démonstration.* $k = 1$ ($k$ quelconque par récurrence).

1. $\phi$ $C^1$-difféomorphisme de $U$ dans $\phi(U)$ $\Rightarrow \forall x \in U, \phi'(x) \neq 0$ : $\phi$ et $\phi^{-1}$ sont $C^1$. De plus $\phi^{-1} \circ \phi = \text{Id}$. On dérive l'égalité : $\forall x \in U$ on a $(\phi^{-1} \circ \phi)'(x) = (\phi^{-1})'(\phi(x)) \circ \phi'(x) = 1$ (cas scalaire, $\circ$ équivaut à la multiplication), donc $\forall x \in U, \phi'(x) \neq 0$.
2. $(\forall x \in U, \phi'(x) \neq 0) \Rightarrow \phi$ $C^1$-difféomorphisme de $U$ dans $\phi(U)$. $\forall x \in U, \phi'(x) \neq 0$ donc $\phi'$ ne change pas de signe, donc $\phi$ est strictement monotone et continue, donc $\phi$ est injective, donc $\phi$ est bijective de $U$ dans $\phi(U)$, donc $\exists \phi^{-1}$ tel que $\phi^{-1} \circ \phi = \text{Id}$.

   Montrons que $\phi^{-1}$ est différentiable. Soit $y_0 \in \phi(U)$ et $y \in \phi(U)$. Alors il existe $x_0 \in U$ tel que $y_0 = \phi(x_0)$ et il existe $x \in U$ tel que $y = \phi(x)$.
   Quelle est la dérivée de $\phi^{-1}$ en $y_0$ ?

   $$
   \lim_{y \to y_0} \frac{\phi^{-1}(y) - \phi^{-1}(y_0)}{y - y_0} = \lim_{x \to x_0} \frac{x - x_0}{\phi(x) - \phi(x_0)} = (\phi'(x_0))^{-1}
   $$

   Donc $\phi^{-1}$ est différentiable car $\phi'(x_0) \neq 0$. On déduit

   $$
   (\phi^{-1})'(y_0) = (\phi' \circ \phi^{-1}(y_0))^{-1}
   $$

   Continue en tant que composée d'applications continues, donc $\phi^{-1}$ est $C^1$, donc $\phi$ est un $C^1$-difféomorphisme.

**Théorème I.20.** (Inversion globale, cas général) Soit $f$ une application de classe $C^1$ définie sur un ouvert $U$ de $E$ et à valeurs dans $F$ (où $E, F$ sont des espaces de Banach). Si $f$ **est injective** et si pour tout $x \in U$, $df(x)$ est un isomorphisme de $E$ sur $F$, alors $f(U)$ est un ouvert de $F$ et $f$ est un $C^1$-difféomorphisme de $U$ sur $f(U)$.

**Remarque.** Si $f$ est un changement de variable dans $\mathbb{R}^n$, $f$ est un difféomorphisme si et seulement si le jacobien ne s'annule pas.

*[Exercice 6 (questions 3 et 4), 9](./exercices-calcul-differentiel.md)*

## Extrema d'une application à valeurs dans $\mathbb{R}$

### Cas général

**Définition.** Soit $f$ une application définie sur une partie $U$ d'un espace vectoriel $E$ à valeurs dans $\mathbb{R}$. On dit que $f$ admet un minimum local en un point $a \in U$ s'il existe un voisinage $V$ de $a$ dans $E$ tel que, pour tout $x \in V \cap U$, $f(x) \geq f(a)$. On dit que $f$ admet un maximum local en $a$ si $-f$ admet un minimum local en $a$. L'extremum sera dit strict si $\forall x \in V \cap U, x \neq a$, l'inégalité est stricte.

**Théorème I.21.** Si l'application $f$ admet en un point $a$ intérieur à $U$ un extremum local, et si $f$ est différentiable en $a$, alors sa différentielle en ce point est nulle.

*Démonstration.* Supposons que $f$ admette un extremum en $a \in U$. Pour tout $h$ dans $E$, on pose

$$
\Psi(t) = f(a + th) \qquad t \in \mathbb{R}
$$

qui est définie sur un voisinage ouvert de 0, image réciproque de $U$ par l'application $t \mapsto a + th$. Le point $t = 0$ est alors un extremum pour $\Psi$ et on a $\Psi'(0) = df(a)(h) = 0 \ \forall h \in E$, donc $df(a) = 0$.

**Proposition.** Soient $U$ un ouvert de $\mathbb{R}^n$ et $f$ une application de $U$ dans $\mathbb{R}$ de classe $C^1$. Si $f$ a un extremum en $a \in U$, alors pour tout $i \in \{1, \dots, n\}$ on a

$$
\frac{\partial f}{\partial x_i}(a) = 0
$$

**Remarque.** Attention, la réciproque est fausse. Pour que $f$ ait un extremum en $a$, il faut que $a$ soit un point critique ($df(a) = 0$).

### Cas d'une application de 2 variables

**Proposition.** Soient $U$ un ouvert de $\mathbb{R}^2$, $f : U \to \mathbb{R}$ une application de classe $C^2$, $a = (a_1, a_2) \in U$ et $h = (h_1, h_2) \in \mathbb{R}^2$ tel que le segment $[a, a + h] \subset U$. On écrit le développement de Taylor-Young de $f$ à l'ordre 2.

$$
\begin{aligned}
f(a_1 + h_1, a_2 + h_2) = f(a_1, a_2) &+ \frac{\partial f}{\partial x_1}(a_1, a_2)(h_1) + \frac{\partial f}{\partial x_2}(a_1, a_2)(h_2) \\
&+ \frac{1}{2} Q_{a_1, a_2}(h_1, h_2) + \|h\|^2 \epsilon(h)
\end{aligned}
$$

avec $Q_{a_1, a_2}(h_1, h_2) = \dfrac{\partial^2 f}{\partial x_1^2}(a_1, a_2)(h_1^2) + 2 \dfrac{\partial^2 f}{\partial x_1 \partial x_2}(a_1, a_2)(h_1, h_2) + \dfrac{\partial^2 f}{\partial x_2^2}(a_1, a_2)(h_2^2)$.

Supposons que $a$ est un point critique, alors :

- si $Q_{a_1, a_2}(h_1, h_2) > 0$ quel que soit $h = (h_1, h_2) \neq (0, 0)$, alors $f$ a un minimum local en $a = (a_1, a_2)$ ;
- si $Q_{a_1, a_2}(h_1, h_2) < 0$ quel que soit $h = (h_1, h_2) \neq (0, 0)$, alors $f$ a un maximum local en $a = (a_1, a_2)$ ;
- s'il existe $(h_1, h_2)$ tel que $Q_{a_1, a_2}(h_1, h_2) > 0$ et $(k_1, k_2)$ tel que $Q_{a_1, a_2}(k_1, k_2) < 0$, alors $f$ n'a ni maximum local ni minimum local en $a$.

**Étude pratique de $Q$.** On définit $Q(X, Y) = pX^2 + 2qXY + rY^2$ où

$$
p = \frac{\partial^2 f}{\partial x^2}(a_1, a_2)
\qquad
q = \frac{\partial^2 f}{\partial x \partial y}(a_1, a_2)
\qquad
r = \frac{\partial^2 f}{\partial y^2}(a_1, a_2)
$$

Supposons $p \neq 0$

$$
Q(X, Y) = p\left(X^2 + 2\frac{q}{p} XY + \frac{r}{p} Y^2\right) = p\left(\left(X + \frac{q}{p} Y\right)^2 + \frac{rp - q^2}{p^2} Y^2\right)
$$

*Discussion.*

- Si $rp - q^2 > 0$ alors pour tout $(X, Y) \neq (0, 0)$, $Q(X, Y)$ a le signe de $p$ : **$f$ a un maximum ou minimum local en $a$**.
- Si $rp - q^2 < 0$ alors $Q(1, 0)$ a le signe de $p$ et $Q\left(-\dfrac{q}{p}, 1\right)$ a le signe de $-p$ : **$f$ n'a ni maximum local ni minimum local en $a$**.
- Si $rp - q^2 = 0$ alors $Q(X, Y)$ est nul ou a le signe de $p$ : la proposition ne s'applique pas, **on ne peut rien conclure**.

*[Exercices 10, 11, 12](./exercices-calcul-differentiel.md)*

## Courbes d'équation $f(x, y) = 0$

**Définition.** Soient $P$ une partie de $\mathbb{R}^2$ et $f : P \to \mathbb{R}$ une application. Si $a \in \mathbb{R}$, l'ensemble

$$
L_a = \left\{(x, y) \in \mathbb{R}^2 \,/\, f(x, y) = a\right\}
$$

s'appelle la ligne de niveau $a$ de $f$. Par définition, $L_a$ est l'image réciproque de $\{a\}$ par $f$.

**Proposition.** Les lignes de niveau d'une application sont disjointes

$$
a \neq b \Rightarrow L_a \cap L_b = \emptyset
$$

**Remarque.** Tout point de $P$ se trouve sur une ligne de niveau.

**Proposition.** Soit $f$ une application de classe $C^1$. La courbe d'équation $f(x, y) = 0$ admet une tangente en tout point $(x_0, y_0)$ qui n'est pas un point critique de $f$, et l'équation de la tangente est

$$
\frac{\partial f}{\partial x}(x_0, y_0)(x - x_0) + \frac{\partial f}{\partial y}(x_0, y_0)(y - y_0) = 0
$$

**Proposition.** Soit $f$ une application $C^1$. Si $f(x_0, y_0) = 0$ et si $(x_0, y_0)$ n'est pas un point critique, alors la tangente à la courbe $f(x, y) = 0$ en $(x_0, y_0)$ est orthogonale au gradient $\nabla f$ en $(x_0, y_0)$.

**Corollaire.** Soit $U$ un ouvert de $\mathbb{R}^2$, $f : U \to \mathbb{R}$ de classe $C^1$. Si $p = (a, b)$ n'est pas un point critique de $f$, alors la ligne de niveau de $f$ passant par $p$ est "orthogonale" au vecteur $\nabla f(p)$. Le gradient pointe dans la direction des niveaux croissants.

**Théorème I.22.** (des fonctions implicites) Soient

- $E_1, E_2$ et $F$ trois espaces vectoriels normés de dimensions finies tels que $\dim(E_2) = \dim(F)$ ;
- $\Omega_1 \subset E_1$ et $\Omega_2 \subset E_2$ deux ouverts ;
- $f : \Omega_1 \times \Omega_2 \to F$ une application de classe $C^1$ ;
- $(a_1, a_2) \in \Omega_1 \times \Omega_2$ tel que $f(a_1, a_2) = 0$.

Si $d_2 f(a_1, a_2)$ est un isomorphisme de $E_2$ dans $F$ alors

1. il existe un unique ouvert $U_1 \subset E_1$ tel que $a_1 \in U_1$ ;
2. il existe un unique ouvert $U_2 \subset E_2$ tel que $a_2 \in U_2$ ;
3. il existe une unique application $\phi : U_1 \to U_2$ telle que $\forall (x_1, x_2) \in U_1 \times U_2$, $f(x_1, x_2) = 0 \Leftrightarrow x_2 = \phi(x_1)$ ;
4. l'application $\phi$ est de classe $C^1$ et $\forall x_1 \in U_1$, $d\phi(x_1) = -\left(d_2 f(x_1, \phi(x_1))\right)^{-1} \circ d_1 f(x_1, \phi(x_1))$ ;
5. si $f$ est de classe $C^k$ alors $\phi$ sera $C^k$.

## Surface d'équation $z = f(x, y)$

**Définition.** Soit $f : U \to \mathbb{R}$ de classe $C^1$, et $U$ un ouvert de $\mathbb{R}^2$. L'ensemble $S$ des points $(x, y, z) \in U \times \mathbb{R}$ tels que $z = f(x, y)$ s'appelle la surface d'équation $z = f(x, y)$. À chaque point $m = (x, y) \in U$ correspond un point $M = (x, y, f(x, y))$ appartenant à $S$. Le point $M$ se projette en $m$ sur le plan $xOy$. L'ensemble $S$ est par définition le graphe de $f$.

**Définition.** Soit $k$ un nombre réel et soit $L$ la ligne de niveau $k$ de $f$. On a donc

$$
L = \{(x, y) \in U \,/\, f(x, y) = k\} \subset \mathbb{R}^2
$$

Supposons que $L$ est non vide, et considérons l'ensemble $\Lambda$ des points $(x, y, z) \in S$ tels que $(x, y) \in L$. On a $(x, y, z) \in \Lambda$ si et seulement si $z = f(x, y)$ et $z = k$. L'ensemble $\Lambda$ est la ligne de niveau $k$ de la surface $S$.

**Définition.** Plan tangent. Soient $S$ une surface et $M_0$ un point de $S$. Tous les vecteurs tangents en $M_0$ aux courbes paramétrées tracées sur $S$ appartiennent à un même plan $P$ appelé plan tangent à la surface en $M_0$. L'équation du plan tangent $P$ en $M_0 = (x_0, y_0, z_0)$ à la surface d'équation $z = f(x, y)$ s'écrit

$$
z - z_0 = \frac{\partial f}{\partial x}(x_0, y_0)(x - x_0) + \frac{\partial f}{\partial y}(x_0, y_0)(y - y_0)
$$

**Proposition.** (Position de la surface par rapport au plan tangent)
La position de la surface par rapport au plan tangent en $M_0$ est donnée par le signe de

$$
g(x, y) = \underbrace{f(x, y)}_{\text{hauteur de la surface}} - \left(z_0 + \frac{\partial f}{\partial x}(x_0, y_0)(x - x_0) + \frac{\partial f}{\partial y}(x_0, y_0)(y - y_0)\right)
$$

Le point $(x_0, y_0)$ est un point critique de $g(x, y)$.

- Si l'application $g$ a un minimum local en $(x_0, y_0)$, alors la surface est au-dessus de son plan tangent en $M_0$.
- Si l'application $g$ a un maximum local en $(x_0, y_0)$, alors la surface est en dessous de son plan tangent en $M_0$.
- Si l'application $g$ n'a ni maximum local ni minimum local, alors la surface présente un "col" en $M_0$.

*[Exercices 13, 14, 15](./exercices-calcul-differentiel.md)*
