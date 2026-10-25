---
title: "Espaces vectoriels"
description: "Espaces vectoriels : définition et exemples, sous-espaces vectoriels, sous-espace engendré, sommes et intersections, familles libres, liées et génératrices, bases, théorème de la base incomplète, dimension, relation de Grassmann et sous-espaces supplémentaires."
sidebar_position: 3
---

En gros, un espace vectoriel, c'est un ensemble d'objets (« vecteurs ») qu'on peut ajouter entre eux et multiplier par les éléments d'un corps $\mathbb{K}$ (« scalaires »).

## Définitions et généralités

**Définition.** Un espace vectoriel sur un corps $\mathbb{K}$ (ou $\mathbb{K}$-ev) est un ensemble $E$ **non vide** muni de deux opérations :

- une « addition » $E \times E \to E : (x, y) \to x + y$ ;
- un « produit par les scalaires » $\mathbb{K} \times E \to E, (\lambda, x) \to \lambda x$ ;

avec les propriétés suivantes :

1. $(E, +)$ est un groupe **commutatif**, i.e. :
   - associativité : $(x + y) + z = x + (y + z)$ ;
   - il existe un élément de $E$, noté $0$ ou $0_E$ (« vecteur nul »), tel que $x + 0 = 0 + x = x$ ;
   - tout $x \in E$ admet un (unique) **opposé** $-x$ : $(-x) + x = x + (-x) = 0$ ;
   - commutativité : $x + y = y + x$.
2. Distributivité des scalaires : $\forall \lambda, \mu \in \mathbb{K}, x \in E$, $(\lambda + \mu) \cdot x = \lambda x + \mu x$
3. Distributivité des vecteurs : $\lambda(x + y) = \lambda x + \lambda y$
4. $\forall \lambda, \mu \in \mathbb{K}, \forall x \in E$ : $(\lambda\mu)x = \lambda(\mu x)$
5. $1x = x$

**Nota bene.** Les éléments de $E$ sont appelés **vecteurs** et ceux de $\mathbb{K}$ sont appelés **scalaires**.

**Quelques propriétés immédiates.**

- $0x = 0$ ; en effet $(\lambda + 0)x = \lambda x + 0x \Rightarrow 0x = 0$.
- De même, $\lambda 0 = 0_E$ ; en effet $\lambda(x + 0_E) = \lambda x + \lambda 0_E \Rightarrow \lambda 0_E = 0_E$.
- $\lambda(-x) = -\lambda x$ car $\lambda(-x) + \lambda x = \lambda(-x + x) = \lambda 0_E = 0_E$.
- $\lambda x = 0 \Rightarrow \lambda = 0_{\mathbb{K}}$ ou $x = 0_E$ : en effet, si $\lambda x = 0_E$ et $\lambda \neq 0_{\mathbb{K}}$, $x = 1x = (\lambda^{-1}\lambda)x = \lambda^{-1}(\lambda x) = 0_E$.

**Exemples d'espaces vectoriels.**

- $(\mathbb{K}^n, +, \cdot)$ où $(x_1, \dots, x_n) + (y_1, \dots, y_n) = (x_1 + y_1, \dots, x_n + y_n)$ et $\lambda x = \lambda(x_1, \dots, x_n) = (\lambda x_1, \dots, \lambda x_n) \in \mathbb{K}^n$ est un $\mathbb{K}$-ev.
- $\mathbb{K}[X]$, $\mathbb{K}(X)$ sont des $\mathbb{K}$-ev.
- L'ensemble $\mathcal{F}(A, \mathbb{R})$ des fonctions d'une partie $A$ de $\mathbb{R}$ dans $\mathbb{R}$ est un $\mathbb{R}$-ev : $(f + g)(a) = f(a) + g(a)$, $(\lambda f)(a) = \lambda f(a)$. En particulier $C^0(I, \mathbb{R})$, fonctions continues sur un intervalle $I$ de $\mathbb{R}$, et $C^1(I, \mathbb{R})$, fonctions continûment dérivables sur $I$.
- L'ensemble des solutions d'une équation différentielle linéaire (sans second membre) est un $\mathbb{R}$-ev : par exemple l'espace des solutions de $y'' + a(x)y' + b(x)y = 0$.
- $\mathbb{K}[X]$ est un $\mathbb{K}$-ev, mais l'ensemble des polynômes de degré égal à $n$ n'en est pas un ! En effet, $X^n + (-X^n) = 0$ n'est pas de degré $n$ !

## Sous-espace vectoriel

**Définition.** Si $E$ est un $\mathbb{K}$-ev, un sous-espace vectoriel $F$ de $E$ est un sous-ensemble non vide de $E$ qui est un $\mathbb{K}$-ev (pour les mêmes $+, \times$).

**Proposition.** Soit $F$ tel que $\emptyset \neq F \subset E$. $F$ est un $\mathbb{K}$-ev si et seulement s'il est stable par combinaison linéaire, i.e. $\forall x, y \in E, \forall \mu, \lambda \in \mathbb{K}$, $(x, y \in F) \Rightarrow \lambda x + \mu y \in F$.

***Démonstration.*** La stabilité par combinaison linéaire signifie que $+$ : $E \times E \to E$ envoie $F \times F$ dans $F$ ($x, y \in F \Rightarrow x + y \in F$ : prendre $\lambda = \mu = 1$), et que $\mathbb{K} \times E \to E$ envoie $\mathbb{K} \times F$ dans $F$ ($x \in F, \lambda \in \mathbb{K} \Rightarrow \lambda x \in F$). Et toutes les propriétés (1) à (5) de la définition d'un $\mathbb{K}$-ev sont satisfaites pour tous les vecteurs de $E$, donc a fortiori pour les éléments de $F$ (puisque $F \subset E$). Donc $(F, +, \times)$ (où $+, \times$ sont les restrictions des opérations $E \times E \to E$, $\mathbb{K} \times E \to E$ à $F \times F \to F$, $\mathbb{K} \times F \to F$ respectivement) est un $\mathbb{K}$-ev.

**Remarques.** Un sous-espace vectoriel contient nécessairement le vecteur nul de $E$ (qui n'est pas celui de $F$). En effet, $F \neq \emptyset$ par définition, donc soit $x \in F$ ; $F$ est stable par combinaison linéaire, donc $x - x \in F$ et donc $0_E \in F$ (et donc $0_E = 0_F$). Donc si $0_E \notin F$, $F$ ne peut pas être un sous-espace vectoriel de $E$ !

**Exemple.** L'ensemble des solutions de $y''(x) + y(x) = 1$ ne contient pas $0$ (fonction nulle), donc ce n'est pas un sous-espace vectoriel de $C^2(\mathbb{R}, \mathbb{R})$.

**Définition de la famille.** Soit $E$ un $\mathbb{K}$-ev. Soit $A$ une partie de $E$. Soit $(x_i)_{i \in I}$ une famille de vecteurs de $E$ indexée par un ensemble $I$ quelconque (par exemple, si $I = \{1, \dots, n\}$, une famille $(x_i)_{i \in I}$ est un $n$-uplet $(x_1, \dots, x_n)$ de vecteurs de $E$ : $x_1 \in E, \dots, x_n \in E$).

On appelle sous-espace vectoriel de $E$ engendré par $A$, et on note $\text{Vect}\,A$, l'ensemble des combinaisons linéaires d'éléments de $A$, c'est-à-dire l'ensemble des $\lambda_1 a_1 + \dots + \lambda_n a_n$ où $n \in \mathbb{N}^*$ (quelconque), $\lambda_i \in \mathbb{K}$ ($1 \leq i \leq n$), $a_i \in A$ ($1 \leq i \leq n$).

Il est clair que $\text{Vect}(A)$ est non vide si $A \neq \emptyset$ et stable par combinaisons linéaires, donc c'est bien un sous-espace vectoriel de $E$ si $A \neq \emptyset$. Si $A = \emptyset$, on convient que $\text{Vect}(\emptyset) = \{0\}$.

On appelle sous-espace vectoriel de $E$ engendré par $(x_i)_{i \in I}$, et on note $\text{Vect}(x_i)_{i \in I}$, l'ensemble des combinaisons linéaires formées avec les $x_i$, c'est-à-dire le sous-espace vectoriel engendré par les éléments de la famille.

**Proposition.** $\text{Vect}(A)$ est le plus petit (au sens de l'inclusion) sous-espace vectoriel de $E$ contenant $A$.

***Démonstration.*** Tout sous-espace vectoriel de $E$ contenant $A$ contient les combinaisons linéaires d'éléments de $A$ (car il est stable par combinaison linéaire), i.e. il contient $\text{Vect}(A)$.

**Remarque.** Soient $F, G$ deux sous-espaces vectoriels d'un $\mathbb{K}$-ev $E$. En général, $F \cup G$ n'est pas un sous-espace vectoriel de $E$. Mais on remarque que $F + G = \{(x, 0) + (0, y) : x \in \mathbb{R}, y \in \mathbb{R}\} = \{(x, y) : x \in \mathbb{R}, y \in \mathbb{R}\} = \mathbb{R}^2$ est le sous-espace vectoriel de $E = \mathbb{R}^2$ égal à $E$ lui-même. C'est un fait général.

**Proposition.** Si $F, G$ sont deux sous-espaces vectoriels d'un $\mathbb{K}$-ev $E$, $F + G = \{x + y : x \in F, y \in G\}$ est un sous-espace vectoriel de $E$. Plus généralement, si $(F_i)_{i \in I}$ est une famille de sous-espaces vectoriels de $E$, et si on note $\displaystyle\sum_{i \in I} F_i$ l'ensemble des sommes finies $\displaystyle\sum_{i \in I} x_i$ où $x_i \in F_i$ (i.e. tous les $x_i = 0$ sauf peut-être un nombre fini d'entre eux), alors $\displaystyle\sum_{i \in I} F_i$ est un sous-espace vectoriel de $E$ (le cas de $F + G$ correspond à $I = \{1, 2\}$, $F_1 = F$, $F_2 = G$).

***Démonstration.*** Il est clair que $\displaystyle\sum_{i \in I} F_i$ est non vide (il contient $0 = \sum_{i \in I} 0$) et qu'il est stable par combinaison linéaire : $\lambda\displaystyle\sum_{i \in I} x_i + \mu\sum_{i \in I} x'_i = \sum_{i \in I} (\lambda x_i + \mu x'_i)$.

**Exemple.** Dans $\mathbb{K}[X]$, l'ensemble des polynômes pairs ($P(X) = P(-X)$) est $\displaystyle\sum_{i \in \mathbb{N}} \mathbb{K}X^{2i}$, qui est un sous-espace vectoriel de $\mathbb{K}[X]$ (où $\mathbb{K}X^{2i} = \{\lambda X^{2i}, \lambda \in \mathbb{K}\}$), et les polynômes pairs sont les $\displaystyle\sum_{i \in \mathbb{N}} a_{2i}X^{2i}$, qui sont bien les éléments de $\displaystyle\sum_{i \in \mathbb{N}} \mathbb{K}X^{2i}$.

**Proposition.** L'intersection de deux sous-espaces vectoriels $F, G$ de $E$ est un sous-espace vectoriel de $E$. Plus généralement, si $(F_i)_{i \in I}$ est une famille de sous-espaces vectoriels de $E$, $\displaystyle\bigcap_{i \in I} F_i$ est un sous-espace vectoriel de $E$.

***Démonstration.*** $x, y \in \displaystyle\bigcap_{i \in I} F_i \Rightarrow \forall i \in I : x, y \in F_i$, donc $\forall i \in I, \forall \lambda, \mu \in \mathbb{K}$ : $\lambda x + \mu y \in F_i$, et donc $\bigcap F_i$ est stable par combinaison linéaire (et évidemment $\neq \emptyset$), donc c'est un sous-espace vectoriel de $E$.

## Familles

**Définition (famille libre).** On dit qu'une famille $(v_i)_{i \in I}$ de vecteurs d'un $\mathbb{K}$-ev $E$ (resp. qu'une partie $L$ de $E$) est **libre** si :

$$
\sum_{i \in I} \lambda_i v_i = 0 \Rightarrow \forall i \in I, \lambda_i = 0 \qquad \left(\text{resp. } \sum_{v \in L} \lambda_v v = 0 \Rightarrow \forall v \in L, \lambda_v = 0\right)
$$

où il est sous-entendu que les sommes sont finies, i.e. $\{i : \lambda_i \neq 0\}$ **fini** (resp. $\{v : \lambda_v \neq 0\}$ **fini**).

**Définition (famille liée).** On dit que $(v_i)_{i \in I}$ (resp. une partie $A$) est **liée** si elle n'est **pas libre**, i.e. s'il existe une relation linéaire non triviale (i.e. les $\lambda_i$ ne sont pas tous nuls) $\displaystyle\sum_{i \in I} \lambda_i v_i = 0$ (resp. $\displaystyle\sum_{v \in A} \lambda_v v = 0$ avec $\lambda_v$ non tous nuls).

**Définition (famille génératrice).** On dit que $(v_i)_{i \in I}$ (resp. une partie $G$ de $E$) est **génératrice** si $\text{Vect}(v_i)_{i \in I} = E$ (resp. $\text{Vect}(G) = E$), i.e. si tout vecteur $w$ de $E$ s'écrit $w = \displaystyle\sum_i \lambda_i v_i$ (resp. $w = \displaystyle\sum_{v \in G} \lambda_v v$).

## Bases

**Définition (base).** On dit que $(v_i)_{i \in I}$ est une **base** (resp. qu'une partie $B$ de $E$ est basique, ou est une base) si elle est **libre et génératrice**.

**Remarque.**

- Une partie contenue dans une partie libre est libre.
- Une partie contenant une partie liée est liée.
- Une partie contenant une partie génératrice est génératrice.

**Proposition (caractérisation d'une base).**

1. $(v_i)_{i \in I}$ (resp. $B \subset E$) est une base si et seulement si tout vecteur $u \in E$ s'écrit de façon unique $u = \displaystyle\sum_{i \in I} x_i v_i$ où $x_i \in \mathbb{K}$ (resp. $u = \displaystyle\sum_{v \in B} x_v v$ où $x_v \in \mathbb{K}$).
2. Soit $G$ une partie génératrice de $E$. Une partie $L \subset G$ est une base si et seulement si c'est une **partie libre maximale** dans $G$ (i.e. elle est libre et $\forall g \in G \setminus L$, $L \cup \{g\}$ n'est pas libre).
3. Une partie $B$ de $E$ est une base si et seulement si elle est **génératrice minimale** (i.e. elle est génératrice et $\forall v \in B$, $B \setminus \{v\}$ n'est pas génératrice).

***Démonstration.***

1. $(v_i)_{i \in I}$ est une base

   - $\Leftrightarrow (v_i)_{i \in I}$ libre et génératrice (définition) ;
   - $\Leftrightarrow$ tout $u \in E$ s'écrit $u = \displaystyle\sum_{i \in I} x_i v_i$ et $\displaystyle\sum_{i \in I} x_i v_i = 0 \Rightarrow \forall i \in I, x_i = 0$ ;
   - $\Rightarrow$ tout $u \in E$ s'écrit $u = \displaystyle\sum_i x_i v_i$, et de façon unique car $\displaystyle\sum_i x_i v_i = \sum_i x'_i v_i \Rightarrow \sum_i (x'_i - x_i)v_i = 0 \Rightarrow \forall i, x'_i - x_i = 0$ ;
   - $\Leftarrow$ tout $u \in E$ s'écrit $u = \displaystyle\sum_i x_i v_i$ et de façon unique (en particulier $\displaystyle\sum_i x_i v_i = 0 \Rightarrow \forall i, x_i = 0$).

2. $L$ libre maximale dans $G$

   - $\Leftrightarrow L$ libre et $\forall g \in G \setminus L$, $L \cup \{g\}$ non libre ;
   - $\Leftrightarrow L$ libre et $\forall g \in G \setminus L$, il existe une relation non triviale $\displaystyle\sum_{v \in L \cup \{g\}} \lambda_v v = 0$, i.e. $\displaystyle\sum_{v \in L} \lambda_v v + \lambda_g g = 0$ (avec $\lambda_g \neq 0$, sinon on aurait $\displaystyle\sum_{v \in L} \lambda_v v = 0$ non triviale, donc les $\lambda_v$ non tous nuls et $L$ non libre) ;
   - $\Leftrightarrow L$ libre et $\forall g \in G \setminus L$, $\exists \lambda_g \neq 0$ et des $\lambda_v$ tels que $g = -\dfrac{1}{\lambda_g}\displaystyle\sum_{v \in L} \lambda_v v \in \text{Vect}(L)$ ;
   - $\Leftrightarrow L$ libre et $G \setminus L \subset \text{Vect}(L)$ ;
   - $\Leftrightarrow L$ libre et $G \subset \text{Vect}(L)$ (car $G = L \cup (G \setminus L)$) ;
   - $\Leftrightarrow L$ est **libre et génératrice** (car $G \subset \text{Vect}(L) \Rightarrow E = \text{Vect}(G) \subset \text{Vect}(\text{Vect}(L)) = \text{Vect}(L) \Rightarrow \text{Vect}(L) = E$) : $L$ est une base.

3. $B$ génératrice minimale. Si $B$ n'était pas libre, on aurait une relation **non triviale** $\displaystyle\sum_{z \in B} \lambda_z z = 0$, avec disons $z_0 \in B$ tel que $\lambda_{z_0} \neq 0$, et donc $\displaystyle\sum_{z \in B \setminus \{z_0\}} \lambda_z z + \lambda_{z_0} z_0 = 0$ avec $\lambda_{z_0} \neq 0$, d'où $z_0 = -\dfrac{1}{\lambda_{z_0}}\displaystyle\sum_{z \in B \setminus \{z_0\}} \lambda_z z$. Et donc $z_0 \in \text{Vect}(B \setminus \{z_0\})$. Prenons $v = z_0$ ; alors $v \in \text{Vect}(B \setminus \{v\})$, donc toute combinaison linéaire de vecteurs de $B = (B \setminus \{v\}) \cup \{v\}$ se récrit comme une combinaison linéaire de vecteurs de $B \setminus \{v\}$ (en remplaçant $v$ par $-\dfrac{1}{\lambda_v}\displaystyle\sum_{z \in B \setminus \{v\}} \lambda_z z$), donc $B \setminus \{v\}$ est génératrice.

   Donc $B$ non libre $\Rightarrow B$ non minimale (comme partie génératrice) et, par contraposée, $B$ génératrice minimale $\Rightarrow B$ génératrice et libre $\Rightarrow B$ est une base.

   Réciproquement, si $B$ est une base, elle est génératrice minimale, car sinon il existerait $v \in B$ tel que $B \setminus \{v\}$ soit génératrice, donc $v \in \text{Vect}(B \setminus \{v\})$, i.e. $v - \displaystyle\sum_{w \in B \setminus \{v\}} \lambda_w w = 0$, et donc $B$ ne serait pas libre !

**Exemples de bases.** Dans $\mathbb{K}^n = \{(x_1, \dots, x_n) : x_1 \in \mathbb{K}, \dots, x_n \in \mathbb{K}\}$, soient

$$
\begin{cases}
e_1 = (1, 0, \dots, 0) \\
e_2 = (0, 1, 0, \dots, 0) \\
\dots \\
e_i = (0, \dots, 0, 1, 0, \dots, 0) \\
\dots \\
e_n = (0, 0, 0, \dots, 0, 1)
\end{cases}
$$

La famille $(e_i)_{i \in \{1, \dots, n\}} = (e_1, e_2, \dots, e_n)$ est une base de $\mathbb{K}^n$ (appelée la base canonique de $\mathbb{K}^n$). En effet, tout $v \in \mathbb{K}^n$ s'écrit de manière unique $v = x_1 e_1 + \dots + x_n e_n = (x_1, 0, \dots, 0) + \dots + (0, \dots, x_n) = (x_1, \dots, x_n)$. Pour $n = 2$ : $(x_1, x_2) = x_1(1, 0) + x_2(0, 1) = x_1 e_1 + x_2 e_2$ ; $((1, 0), (0, 1))$ est la base canonique de $\mathbb{R}^2$ (ou $\mathbb{K}^2$).

- Tout polynôme de $\mathbb{K}[X]$ s'écrit de manière unique $\displaystyle\sum_{i \geq 0} a_i X^i$, donc $(X^0, X^1, \dots) = (X^i)_{i \in \mathbb{N}}$ est une base de $\mathbb{K}[X]$.
- Toute fraction rationnelle de $\mathbb{K}(X)$ a une unique décomposition en éléments simples, donc on a une base de $\mathbb{K}(X)$ formée des $(X^i)_{i \in \mathbb{N}}$ et des $\dfrac{X^j}{P^k}$ où $j < \deg(P)$, $P$ irréductible dans $\mathbb{K}[X]$, $k \in \mathbb{N}^*$.
- $\mathbb{C}$ comme $\mathbb{R}$-ev : une base est $\{1, i\}$ (car tout $z \in \mathbb{C}$ s'écrit de manière unique $z = x + iy$ avec $x, y \in \mathbb{R}$). Une autre base est $\{1, z\}$ par exemple.
- $\mathbb{C}$ comme $\mathbb{C}$-ev a pour base $1$, car tout $z \in \mathbb{C}$ s'écrit de façon unique $z = z \cdot 1$, $z \in \mathbb{C}$, et n'importe quel $w \in \mathbb{C}^*$ forme une base de $\mathbb{C}$ car $\forall z \in \mathbb{C}$, $z = \left(\dfrac{z}{w}\right) \cdot w$.

**Définition.** On dit qu'un $\mathbb{K}$-ev $E$ est de **dimension finie** s'il admet une partie génératrice finie.

**Exemple.** $\mathbb{K}^n$, car il est engendré par sa base canonique $(e_1, \dots, e_n)$ où $e_j = (0, \dots, 0, 1, 0, \dots, 0) \in \mathbb{K}^n$.

**Contre-exemple.** $\mathbb{K}[X]$ n'est pas de dimension finie, car si $\{P_1, \dots, P_k\}$ est une partie **finie** de $\mathbb{K}[X]$, toute combinaison linéaire $\lambda_1 P_1 + \dots + \lambda_k P_k$ est de degré $\leq \max\{\deg(P_1), \dots, \deg(P_k)\} = m$, et donc $X^{m+1} \notin \text{Vect}\{P_1, \dots, P_k\}$ : $\{P_1, \dots, P_k\}$ n'engendre pas $\mathbb{K}[X]$.

**Lemme (extraction d'une partie génératrice finie).** Soit $E$ un $\mathbb{K}$-ev de dimension finie. Soit $G$ une partie génératrice de $E$. Alors $G$ contient une partie génératrice finie $G_0$.

***Démonstration.*** $E$ est de dimension finie, donc il contient une partie génératrice finie $F = \{f_1, \dots, f_k\}$. $G$ est génératrice, donc $f_1$ est combinaison linéaire d'un nombre fini d'éléments de $G$ : $f_1 \in \text{Vect}(F_1)$ où $F_1 \subset G$, $F_1$ finie. De même, $f_2 \in \text{Vect}(F_2), \dots, f_k \in \text{Vect}(F_k)$ où $F_2, \dots, F_k$ sont des parties finies de $G$. Donc $f_1, \dots, f_k \in \text{Vect}\{F_1 \cup \dots \cup F_k\}$. Or tout vecteur de $E$ est une combinaison linéaire de $f_1, \dots, f_k$, donc il est combinaison linéaire des éléments de $F_1 \cup \dots \cup F_k$. Donc $G_0 = F_1 \cup \dots \cup F_k$ répond à la question (c'est une partie génératrice finie de $G$).

**Théorème de la base incomplète.** Soit $E$ un $\mathbb{K}$-ev de dimension finie, non réduit à $\{0\}$. Soient $L$ une partie libre de $E$ et $G$ une partie génératrice. Il existe une base $B$ de $E$ telle que $L \subset B \subset L \cup G$. Autrement dit, toute partie libre peut être complétée en une base en y adjoignant éventuellement des vecteurs pris dans une partie génératrice donnée.

***Démonstration.*** Soit $G_0 \subset G$ une partie génératrice finie (cf. le lemme). Considérons une partie $S$ de $G_0$ maximale telle que $L \cup S$ soit libre. Il existe des $S \subset G_0$ tels que $L \cup S$ soit libre ($L \cup \emptyset$ est libre) : puisque $G_0$ est finie, donc n'a qu'un nombre fini de parties, toutes finies, il en existe au moins une qui a le plus grand nombre d'éléments. Alors $L \cup S$ est libre maximale dans la partie génératrice $L \cup G_0$. Donc c'est une base (d'après la proposition de caractérisation des bases).

**Lemme.** Dans un espace engendré par $n$ vecteurs, $n + 1$ vecteurs sont liés.

**Preuve (récurrence).**

**Initialisation.** $n = 1$ : $u_1, u_2 \in \text{Vect}(v)$, donc $u_1 = \lambda_1 v$, $u_2 = \lambda_2 v$. Si $\lambda_1, \lambda_2$ sont nuls, alors $u_1 = u_2 = 0$ et on a la relation linéaire non triviale $u_1 - u_2 = 0$. Si $\lambda_1, \lambda_2$ ne sont pas tous les deux nuls, on a la relation linéaire non triviale $\lambda_2 u_1 - \lambda_1 u_2 = 0$ (car $\lambda_2\lambda_1 v - \lambda_1\lambda_2 v = 0$). Donc pour $n = 1$, l'énoncé du lemme est vrai.

**Hérédité.** On suppose l'énoncé vrai pour $n - 1$ ; montrons qu'il est vrai pour $n$.

$$
\begin{cases}
u_1 = a_{11}v_1 + a_{12}v_2 + \dots + a_{1n}v_n \\
u_2 = a_{21}v_1 + a_{22}v_2 + \dots + a_{2n}v_n \\
\vdots \\
u_{n+1} = a_{n+1,1}v_1 + a_{n+1,2}v_2 + \dots + a_{n+1,n}v_n
\end{cases}
$$

Si tous les $a_{in}$ sont nuls ($1 \leq i \leq n + 1$), alors $u_1, \dots, u_n, u_{n+1}$ sont dans $\text{Vect}\{v_1, \dots, v_{n-1}\}$, donc $\{u_1, \dots, u_n\}$ est liée (hypothèse de récurrence) et a fortiori $\{u_1, \dots, u_n, u_{n+1}\}$ aussi.

S'il existe au moins un $i \in \{1, \dots, n + 1\}$ tel que $a_{in} \neq 0$, on peut supposer que c'est $a_{1n}$ (quitte à renuméroter). Alors $u_2 - \dfrac{a_{2n}}{a_{1n}}u_1 \in \text{Vect}\{v_1, \dots, v_{n-1}\}$, car dans $u_2 - \dfrac{a_{2n}}{a_{1n}}u_1$ le coefficient de $v_n$ est $a_{2n} - \dfrac{a_{2n}}{a_{1n}}a_{1n} = 0$. De même, $u_3 - \dfrac{a_{3n}}{a_{1n}}u_1, \dots, u_{n+1} - \dfrac{a_{n+1,n}}{a_{1n}}u_1 \in \text{Vect}(v_1, \dots, v_{n-1})$.

L'hypothèse de récurrence montre que $u_2 - \dfrac{a_{2n}}{a_{1n}}u_1, u_3 - \dfrac{a_{3n}}{a_{1n}}u_1, \dots, u_{n+1} - \dfrac{a_{n+1,n}}{a_{1n}}u_1$ sont liés. Il existe $\lambda_2, \dots, \lambda_{n+1}$ non tous nuls tels que

$$
\lambda_2\left(u_2 - \frac{a_{2n}}{a_{1n}}u_1\right) + \dots + \lambda_{n+1}\left(u_{n+1} - \frac{a_{n+1,n}}{a_{1n}}u_1\right) = 0
\Leftrightarrow
\lambda_2 u_2 + \dots + \lambda_{n+1}u_{n+1} - \left(\sum_{i=2}^{n+1} \lambda_i \frac{a_{in}}{a_{1n}}\right)u_1 = 0
$$

qui est une relation linéaire non triviale (car $\lambda_2, \dots, \lambda_{n+1}$ non tous nuls) entre $u_2, \dots, u_{n+1}, u_1$.

**Théorème de la dimension.** Soit $E$ un $\mathbb{K}$-ev de dimension finie non réduit à $\{0\}$. Toutes ses bases sont finies et ont le même nombre d'éléments, qu'on note $\dim(E)$ et qu'on appelle la dimension de $E$.

***Démonstration.*** D'après le théorème de la base incomplète avec $L = \{u_1\}$, $u_1 \neq 0$, il existe une base $B$ telle que $L \subset B \subset L \cup S$ avec $S$ finie, donc $B$ est finie. Soit $n$ le nombre d'éléments de $B$. Soit $B'$ une autre base de $E$. Si $B'$ contenait plus de $n$ éléments, elle serait liée (d'après le lemme précédent) et donc $B'$ ne serait pas une base. Donc $\text{card}(B') \leq \text{card}(B)$. Le même argument en échangeant $B'$ (dont on sait maintenant qu'elle est finie) et $B$ montre que $\text{card}(B) \leq \text{card}(B')$. Donc :

$$
\text{card}(B') = \text{card}(B)
$$

**Corollaire.** Soit $E$ un $\mathbb{K}$-ev de dimension $n$.

1. Toute partie libre a au plus $n$ éléments.
2. Toute partie génératrice a au moins $n$ éléments.
3. Une partie à $n$ éléments est une base si et seulement si elle est libre.
4. Une partie à $n$ éléments est une base si et seulement si elle est génératrice.
5. Tout sev $F$ de $E$ est de dimension finie : $\dim(F) \leq n$. De plus : $\dim(F) = n \Leftrightarrow F = E$.

***Démonstration.***

1. D'après le théorème de la base incomplète, on peut compléter toute partie libre $L$ en une base (à $n$ éléments), donc $\text{card}(L) \leq n$.
2. L'argument dans le théorème de la base incomplète est valable même si $L = \emptyset$, donc pour toute $G$ génératrice, il existe une base $B \subset G$, et $\text{card}(B) = n$, donc $\text{card}(G) \geq n$.
3. Soit $L$ libre à $n$ éléments. On peut la compléter en une base $B$, à $n$ éléments, donc $L = B$, donc $L$ est une base.
4. Soit $G$ génératrice à $n$ éléments. Elle contient une base $B$, à $n$ éléments, donc $G = B$, et donc $G$ est une base.
5. Si $F = \text{Vect}\{u_1\}$, $u_1 \neq 0$ : $\{u_1\}$ est libre et génératrice et c'est une base : $\dim(F) = 1$. Si $F \supset \text{Vect}\{u_1\}$ strictement, il existe $u_2 \neq 0$ dans $F$ tel que $u_2 \notin \text{Vect}\{u_1\}$, donc $F \supset \text{Vect}\{u_1, u_2\}$ et $\{u_1, u_2\}$ est libre. Si $\{u_1, u_2\}$ engendre $F$, c'est une base et $\dim(F) = 2 \leq \dim(E)$ (puisque $u_1, u_2 \in E$).

   On arrive à $F \supset \text{Vect}\{u_1, \dots, u_p\}$ et $u_{p+1} \in F$ tel que $u_{p+1} \notin \text{Vect}\{u_1, \dots, u_p\}$, donc $\{u_1, \dots, u_p, u_{p+1}\}$ libre, donc $p + 1 \leq n$. Donc le processus finit par s'arrêter, i.e. il existe $p \leq n$ tel que $\{u_1, \dots, u_p\}$ engendre $F$, et donc $\dim(F) = p$ est finie (et $\dim(F) \leq \dim(E)$ puisque $\{u_1, \dots, u_p\} \subset E$).

   Enfin, si $\dim(F) = n$, soit $(f_1, \dots, f_n)$ une base de $F$ : c'est une partie libre de $E$ à $n$ éléments, donc c'est une base de $E$, et donc $\begin{cases} F = \text{Vect}\{f_1, \dots, f_n\} \\ E = \text{Vect}\{f_1, \dots, f_n\} \end{cases}$, d'où $F = E$.

## Dimension

**Convention.**

$$
\dim\{0\} = 0
$$

Noter que $\{0\}$ n'a pas de base car son unique vecteur $0$ est lié ($1 \cdot 0 = 0$ : relation linéaire non triviale).

Maintenant, voyons deux propriétés essentielles de la dimension.

**Proposition.** Soient $E, F$ deux $\mathbb{K}$-ev de dimensions finies. Le produit (cartésien) $E \times F = \{(x, y) : x \in E, y \in F\}$ est un $\mathbb{K}$-ev de dimension finie : $\dim(E \times F) = \dim(E) + \dim(F)$.

***Démonstration.*** Le fait que $E \times F$ soit un $\mathbb{K}$-ev est asinitrottant. Soient $(e_1, \dots, e_n)$ une base de $E$ ($\dim(E) = n$) et $(f_1, \dots, f_k)$ une base de $F$ ($\dim(F) = k$). Tout $(x, y) \in E \times F$ s'écrit de manière unique :

$$
(x, y) = \left(\sum_{i=1}^{n} x_i e_i, \sum_{j=1}^{k} y_j f_j\right) = \left(\sum_{i=1}^{n} x_i e_i, 0\right) + \left(0, \sum_{j=1}^{k} y_j f_j\right) = \sum_{i=1}^{n} x_i(e_i, 0) + \sum_{j=1}^{k} y_j(0, f_j)
$$

Donc $((e_1, 0), \dots, (e_n, 0), (0, f_1), \dots, (0, f_k))$ est une base de $E \times F$ (car génératrice et écriture **unique** pour chaque $(x, y) \in E \times F$).

**Exemples.** $\dim(\mathbb{R}^2) = \dim(\mathbb{R} \times \mathbb{R}) = 2\dim(\mathbb{R}) = 2$ ; $\dim(\mathbb{R}^3) = \dim(\mathbb{R} \times \mathbb{R} \times \mathbb{R}) = 3\dim(\mathbb{R}) = 3$.

**Nota bene.** $\dim(E_1 \times \dots \times E_m) = \dim(E_1) + \dots + \dim(E_m)$ si $E_1, \dots, E_m$ sont des $\mathbb{K}$-ev de dimensions finies.

**Proposition (théorème ou relation de Grassmann).** Soient $V, W$ deux sev de dimensions finies d'un $\mathbb{K}$-ev $E$ (de dimension finie ou non). Alors $V + W$ est de dimension finie et

$$
\dim(V + W) = \dim(V) + \dim(W) - \dim(V \cap W)
$$

***Démonstration.*** $V \cap W$ est de dimension finie (car c'est un sev de $V$). Soit $(e_1, \dots, e_k)$ une base de $V \cap W$. On la complète en une base de $V$, disons $(e_1, \dots, e_k, e_{k+1}, \dots, e_n)$ où $n = \dim(V)$. Par ailleurs, complétons-la aussi en une base de $W$, disons $(e_1, \dots, e_k, e'_{k+1}, \dots, e'_m)$ où $m = \dim(W)$.

$$
\begin{aligned}
V + W &= \{x + y : x \in V, y \in W\} \\
&= \left\{\lambda_1 e_1 + \dots + \lambda_k e_k + \lambda_{k+1}e_{k+1} + \dots + \lambda_n e_n + \mu_1 e_1 + \dots + \mu_k e_k + \mu_{k+1}e'_{k+1} + \dots + \mu_m e'_m : \lambda_1, \dots, \lambda_n, \mu_1, \dots, \mu_m \in \mathbb{K}\right\} \\
&= \left\{(\lambda_1 + \mu_1)e_1 + \dots + (\lambda_k + \mu_k)e_k + \lambda_{k+1}e_{k+1} + \dots + \lambda_n e_n + \mu_{k+1}e'_{k+1} + \dots + \mu_m e'_m : \lambda_1, \dots, \lambda_k, \mu_1, \dots, \mu_k, \lambda_{k+1}, \dots, \lambda_n, \mu_{k+1}, \dots, \mu_m \in \mathbb{K}\right\} \\
&= \left\{\alpha_1 e_1 + \dots + \alpha_k e_k + \lambda_{k+1}e_{k+1} + \dots + \lambda_n e_n + \mu_{k+1}e'_{k+1} + \dots + \mu_m e'_m : \alpha_1, \dots, \alpha_k, \lambda_{k+1}, \dots, \lambda_n, \mu_{k+1}, \dots, \mu_m \in \mathbb{K}\right\} \\
&= \text{Vect}\left\{e_1, \dots, e_k, e_{k+1}, \dots, e_n, e'_{k+1}, \dots, e'_m\right\}
\end{aligned}
$$

Plus directement (ce qu'il faut savoir) :

$$
V + W = \text{Vect}\{e_1, \dots, e_k, e_{k+1}, \dots, e_n\} + \text{Vect}\{e_1, \dots, e_k, e'_{k+1}, \dots, e'_m\} = \text{Vect}\{e_1, \dots, e_k, e_{k+1}, \dots, e_n, e_1, \dots, e_k, e'_{k+1}, \dots, e'_m\}
$$

Donc $\{e_1, \dots, e_k, e_{k+1}, \dots, e_n, e'_{k+1}, \dots, e'_m\}$ est une partie génératrice de $V + W$. Vérifions qu'elle est libre :

$$
\underbrace{\lambda_1 e_1 + \dots + \lambda_k e_k + \lambda_{k+1}e_{k+1} + \dots + \lambda_n e_n}_{\in V} = \underbrace{-(\lambda'_{k+1}e'_{k+1} + \dots + \lambda'_m e'_m)}_{\in W} \in V \cap W \quad (*)
$$

$$
\begin{aligned}
&\Rightarrow \lambda_{k+1} = \dots = \lambda_n = 0 \text{ et } \lambda'_{k+1} = \dots = \lambda'_m = 0 \\
&\Rightarrow \lambda_1 e_1 + \dots + \lambda_k e_k = 0 \text{ (ce qu'il reste de } (*)) \\
&\Rightarrow \lambda_1 = \dots = \lambda_k = 0 \text{ (car } (e_1, \dots, e_k) \text{ est libre)}
\end{aligned}
$$

Donc $\{e_1, \dots, e_k, e_{k+1}, \dots, e_n, e'_{k+1}, \dots, e'_m\}$ est libre, et donc c'est une base de $V + W$ (partie **génératrice** et **libre**). Donc :

$$
\dim(V + W) = \text{card}\{e_1, \dots, e_k, e_{k+1}, \dots, e_n, e'_{k+1}, \dots, e'_m\} = n + m - k = \dim(V) + \dim(W) - \dim(V \cap W)
$$

**Définition.** Soient $V, W$ deux sev d'un $\mathbb{K}$-ev $E$.

1. On dit que la somme $V + W$ est **directe** si $V \cap W = \{0\}$. Dans ce cas, on la note $V \oplus W$.
2. On dit que $V$ et $W$ sont **supplémentaires** (dans $E$) si $E = V \oplus W$, i.e. si $\begin{cases} V \cap W = \{0\} \\ V + W = E \end{cases}$

**Exemple.** Dans $\mathbb{R}^2$, prenons $\begin{cases} V = \mathbb{R}(1, 0) \\ W = \mathbb{R}(0, 1) \end{cases}$. $V \cap W = \{(0, 0)\}$, le seul vecteur de $\mathbb{R}^2$ qui soit à la fois de la forme $(x, 0)$ (donc $y = 0$) et de la forme $(0, y)$ (donc $x = 0$). Et $V + W = \{(x, 0) : x \in \mathbb{R}\} + \{(0, y) : y \in \mathbb{R}\} = \{(x, y) : x \in \mathbb{R}, y \in \mathbb{R}\} = \mathbb{R}^2$. Donc $V$ et $W$ sont supplémentaires (dans $\mathbb{R}^2$).

**Mise en garde.** Dans l'exemple ci-dessus, $W$ est **un** supplémentaire de $V$, **mais ce n'est pas le seul**. Soit $W' = \mathbb{R}(a, b)$ où $b \neq 0$ ($a$ quelconque) : alors on a aussi $V \cap W' = \{(0, 0)\}$ (car $(x, 0) = (au, bu) \Rightarrow bu = 0 \Rightarrow u = 0 \Rightarrow (au, bu) = (0, 0)$) et $V + W' = \text{Vect}\{(1, 0), (a, b)\} = \mathbb{R}^2$, donc $\mathbb{R}^2 = V \oplus W'$.

C'est un fait général : il n'y a pas unicité du supplémentaire, il y a toujours une infinité de supplémentaires d'un sev $V$, sauf si $V = 0$, où le seul supplémentaire est $E$, ou si $V = E$, où le seul supplémentaire est $0$.

En particulier, ne pas confondre **supplémentaire** (notion **algébrique**, **non unique**) et **complémentaire** (notion **ensembliste**, **unique**).

**Proposition.** Soit $E$ un $\mathbb{K}$-ev de dimension finie. Soient $V, W$ deux sev de $E$. Alors la somme $V + W$ est directe si et seulement si $\dim(V + W) = \dim(V) + \dim(W)$.

***Démonstration.*** $\dim(V + W) = \dim(V) + \dim(W) \Leftrightarrow \dim(V \cap W) = 0 \Leftrightarrow V \cap W = \{0\}$.
