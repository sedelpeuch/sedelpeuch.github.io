---
title: "Applications linéaires"
description: "Applications linéaires : définition et exemples, espace L(E, F) et sa dimension, composition, isomorphismes, noyau et image, rang, théorème du rang, homothéties, projecteurs et symétries, hyperplans et espace dual."
sidebar_position: 4
---

## Définitions et généralités

**Définition.** Soient $E, F$ des $\mathbb{K}$-ev. Une application $\Phi : E \to F$ est dite **linéaire** si :

$$
\forall x, y \in E, \forall \lambda, \mu \in \mathbb{K} : \Phi(\lambda x + \mu y) = \lambda\Phi(x) + \mu\Phi(y)
$$

**Nota bene.** Si $\phi$ est linéaire, alors (par récurrence) $\forall x_1, \dots, x_k \in E, \forall \lambda_1, \dots, \lambda_k \in \mathbb{K}$ : $\Phi\left(\displaystyle\sum_{i=1}^{k} \lambda_i x_i\right) = \sum_{i=1}^{k} \lambda_i \Phi(x_i)$.

**Exemples.**

1. $\Phi : \mathbb{R} \to \mathbb{R}$ est linéaire si et seulement si elle est de la forme $\Phi(x) = ax$ où $a = \text{cte}$. En effet, $\Phi$ linéaire $\Rightarrow \forall x \in \mathbb{R}$, $\Phi(x) = \Phi(1 \cdot x) = x\Phi(1)$.
2. $\Phi : \mathbb{R}^2 \to \mathbb{R}$ est linéaire si et seulement si $\Phi(x, y) = ax + by$ où $a, b$ sont des constantes. En effet, $\Phi$ linéaire $\Leftrightarrow \Phi(x, y) = \Phi(x(1, 0) + y(0, 1)) = x\Phi(1, 0) + y\Phi(0, 1)$.
3. $\Phi : \begin{cases} \mathbb{K}[X] \to \mathbb{K}[X] \\ P(X) \to X \cdot P(X) \end{cases}$ et $\Psi : \begin{cases} \mathcal{F}(\mathbb{R}, \mathbb{R}) \to \mathcal{F}(\mathbb{R}, \mathbb{R}) \\ f \to x \cdot f(x) \end{cases}$ sont linéaires.
4. $\Phi : \begin{cases} \mathbb{K}[X] \to \mathbb{K}[X] \\ P(X) \to P'(X) \end{cases}$ et $\Psi : \begin{cases} C^\infty(\mathbb{R}, \mathbb{R}) \to C^\infty(\mathbb{R}, \mathbb{R}) \\ f \to f' \end{cases}$ sont linéaires.

**Proposition et notation.** On note $\mathcal{L}(E, F)$ l'ensemble des applications linéaires de $E$ dans $F$. $\mathcal{L}(E, F)$ est un $\mathbb{K}$-ev [pour les opérations évidentes : $(\Phi + \Psi)(x) = \Phi(x) + \Psi(x), \forall x \in E$, $(\lambda\Phi)(x) = \lambda\Phi(x)$ ($\lambda \in \mathbb{K}, x \in E$)]. Si $\begin{cases} \dim(E) < \infty \\ \dim(F) < \infty \end{cases}$, alors $\dim(\mathcal{L}(E, F)) < \infty$ et $\dim(\mathcal{L}(E, F)) = \dim(E) \times \dim(F)$.

***Démonstration.*** $\mathcal{L}(E, F)$ est un $\mathbb{K}$-ev. Si $\dim(E) < \infty$, $\dim(F) < \infty$, soient $(e_1, \dots, e_n)$ une base de $E$ et $(f_1, \dots, f_m)$ une base de $F$. Soit $\Phi : E \to F$.

$$
\Phi \text{ linéaire} \Rightarrow \forall x = x_1 e_1 + \dots + x_n e_n \in E, \quad \Phi(x) = \Phi\left(\sum_{i=1}^{n} x_i e_i\right) = \sum_{i=1}^{n} x_i \Phi(e_i)
$$

Posons $\Phi(e_i) = \displaystyle\sum_{j=1}^{m} a_{ij} f_j$. Alors $\Phi(x) = \displaystyle\sum_{i=1}^{n}\sum_{j=1}^{m} x_i a_{ij} f_j$. On voit que $\Phi$ est entièrement caractérisée par les $a_{ij}$.

Montrons que les applications linéaires $\Phi_{ij}$ définies par $\Phi_{ij}(e_i) = f_j$ et $\Phi_{ij}(e_k) = 0$ si $k \neq i$ forment une base de $\mathcal{L}(E, F)$. Soit $\Phi \in \mathcal{L}(E, F)$ : $\Phi(x) = \displaystyle\sum_{i=1}^{n} x_i \sum_{j=1}^{m} a_{ij} f_j$.

$$
\Phi(e_i) = \sum_{j=1}^{m} a_{ij} f_j = \sum_{j=1}^{m} a_{ij}\Phi_{ij}(e_i) = \sum_{k=1}^{n}\sum_{j=1}^{m} a_{kj}\Phi_{kj}(e_i)
\quad \text{car} \quad
\Phi_{kj}(e_i) = \begin{cases} 0 \text{ si } k \neq i \\ \Phi_{ij}(e_i) \text{ si } k = i \end{cases}
$$

Comme $\Phi$ est caractérisée par l'image des $e_i$ (puisque $\Phi(x) = \displaystyle\sum_{i=1}^{n} x_i\Phi(e_i)$), on a donc

$$
\Phi = \sum_{k=1}^{n}\sum_{j=1}^{m} a_{kj}\Phi_{kj} = \sum_{i=1}^{n}\sum_{j=1}^{m} a_{ij}\Phi_{ij}
$$

et donc la famille $(\Phi_{ij})_{1 \leq i \leq n, 1 \leq j \leq m}$ est génératrice de $\mathcal{L}(E, F)$. Et elle est libre car :

$$
\begin{aligned}
&\sum_{i=1}^{n}\sum_{j=1}^{m} a_{ij}\Phi_{ij} = 0 \Rightarrow \forall k \in \{1, \dots, n\}, \sum_{i=1}^{n}\sum_{j=1}^{m} a_{ij}\Phi_{ij}(e_k) = 0 \\
\Rightarrow\ &\sum_{j=1}^{m} a_{kj} f_j = 0 \\
\Rightarrow\ &\forall k \in \{1, \dots, n\}, \forall j \in \{1, \dots, m\}, a_{kj} = 0
\end{aligned}
$$

Donc $(\Phi_{ij})_{1 \leq i \leq n, 1 \leq j \leq m}$ est une base de $\mathcal{L}(E, F)$ et donc $\dim(\mathcal{L}(E, F)) = n \times m$.

**Proposition.** Soient $\Phi, \Psi \in \mathcal{L}(E, E)$ (on note simplement $\mathcal{L}(E)$). Alors $\Psi \circ \Phi \in \mathcal{L}(E)$. Plus généralement, si $\Phi \in \mathcal{L}(E, F)$ et $\Psi \in \mathcal{L}(F, G)$, alors $\Psi \circ \Phi \in \mathcal{L}(E, G)$ (où $E, F, G$ sont trois $\mathbb{K}$-ev).

***Démonstration.***

$$
\Psi \circ \Phi(\lambda x + \mu y) = \Psi(\Phi(\lambda x + \mu y)) = \Psi(\lambda\Phi(x) + \mu\Phi(y)) = \lambda\Psi(\Phi(x)) + \mu\Psi(\Phi(y)) = \lambda\Psi \circ \Phi(x) + \mu\Psi \circ \Phi(y)
$$

**Proposition.** Soit $E$ un $\mathbb{K}$-ev : $(\mathcal{L}(E), +, \times, \circ)$ est une $\mathbb{K}$-algèbre, i.e. :

1. $(\mathcal{L}(E), +, \times)$ est un $\mathbb{K}$-ev.
2. Distributivité à droite : $(\Phi + \Psi) \circ \Theta = \Phi \circ \Theta + \Psi \circ \Theta$. Distributivité à gauche : $\Theta \circ (\Phi + \Psi) = \Theta \circ \Phi + \Theta \circ \Phi$.
3. Jeu entre $\times$ et $\circ$ : $(\lambda\Phi) \circ \Psi = \Phi \circ (\lambda\Psi) = \lambda\Phi \circ \Psi$.

***Démonstration.***

1. Déjà vu.
2. À droite : $(\Phi + \Psi) \circ \Theta(x) = (\Phi + \Psi)(\Theta(x)) = \Phi(\Theta(x)) + \Psi(\Theta(x))$ (définition de $+$ dans $\mathcal{L}(E)$) $= \Phi \circ \Theta(x) + \Psi \circ \Theta(x)$ (cela n'utilise pas la linéarité des applications). À gauche : $\Theta \circ (\Phi + \Psi)(x) = \Theta(\Phi(x) + \Psi(x)) = \Theta(\Phi(x)) + \Theta(\Psi(x)) = \Theta \circ \Phi(x) + \Theta \circ \Psi(x)$.
3. $(\lambda\Phi) \circ \Psi(x) = \lambda\Phi(\Psi(x)) = \Phi(\lambda\Psi(x)) = (\Phi \circ (\lambda\Psi))(x)$.

**Proposition.** Si $\Phi \in \mathcal{L}(E)$ est bijective, alors la réciproque $\Phi^{-1}$ est aussi dans $\mathcal{L}(E)$ (i.e. elle est linéaire).

***Démonstration.***

$$
\begin{aligned}
&\Phi^{-1}(\lambda x + \mu y) = \lambda\Phi^{-1}(x) + \mu\Phi^{-1}(y) \\
\Leftrightarrow\ &\Phi(\Phi^{-1}(\lambda x + \mu y)) = \Phi(\lambda\Phi^{-1}(x) + \mu\Phi^{-1}(y)) \\
\Leftrightarrow\ &\lambda x + \mu y = \lambda\Phi(\Phi^{-1}(x)) + \mu\Phi(\Phi^{-1}(y)) \\
\Leftrightarrow\ &\lambda x + \mu y = \lambda x + \mu y \quad \text{Vrai !}
\end{aligned}
$$

**Terminologie.**

- Une application linéaire est appelée aussi un homomorphisme (d'espaces vectoriels), ou simplement morphisme (d'espaces vectoriels).
- Un morphisme bijectif est appelé **isomorphisme**.
- Un morphisme $E \to E$ est appelé **endomorphisme**.
- Un isomorphisme $E \to E$ est appelé **automorphisme**.

## Noyau et image

**Définition et proposition.**

- Soit $\Phi \in \mathcal{L}(E, F)$ ; on note $\text{Ker}(\Phi) = \{x \in E : \Phi(x) = 0\}$. C'est un sev de $E$ : on l'appelle le noyau de $\Phi$.
- On note $\text{Im}(\Phi) = \{y \in F : \exists x \in E, y = \Phi(x)\}$. C'est un sev de $F$ : on l'appelle l'image de $\Phi$.

**Preuve (que ce sont des sev).**

- $0 \in \text{Ker}(\Phi)$ car $\Phi(0) = 0$ pour toute application linéaire : en effet, $\Phi(2x) = 2\Phi(x) \Rightarrow \Phi(0) = 2\Phi(0) \Rightarrow \Phi(0) = 0$. On a donc $\text{Ker}(\Phi)$ stable par combinaison linéaire :

  $$
  \left.\begin{aligned} &\Phi(x) = 0 \\ &\Phi(y) = 0 \\ &\lambda, \mu \in \mathbb{K} \end{aligned}\right\} \Rightarrow \Phi(\lambda x + \mu y) = \lambda\Phi(x) + \mu\Phi(y) = 0 \Rightarrow \lambda x + \mu y \in \text{Ker}(\Phi)
  $$

- $0 = \Phi(0) \Rightarrow 0 \in \text{Im}(\Phi)$. $\text{Im}(\Phi)$ est stable par combinaison linéaire car si $x' = \Phi(x)$, $y' = \Phi(y)$, alors $\forall \lambda, \mu \in \mathbb{K}$, $\lambda x' + \mu y' = \Phi(\lambda x + \mu y)$.

**Proposition.** $\phi \in \mathcal{L}(E, F)$ est injective si et seulement si $\text{Ker}(\phi) = \{0\}$, et surjective si et seulement si $\text{Im}(\phi) = F$.

***Démonstration.*** $\phi$ injective si et seulement si :

- $\phi(x) = \phi(y) \Rightarrow x = y$, $x, y \in E$ (définition d'injective) ;
- $\phi(x - y) = 0 \Rightarrow x - y = 0$, $x, y \in E$ ($\phi$ linéaire) ;
- $\phi(z) = 0 \Rightarrow z = 0$, $z \in E$ ;
- $\text{Ker}(\phi) = \{0\}$.

$\phi$ surjective $\Leftrightarrow \text{Im}(\phi) = F$ (définition de « surjective »).

**Définition.**

- Le rang d'une famille de vecteurs $(x_i)_{i \in I}$ d'un $\mathbb{K}$-ev $E$ est $\dim(\text{Vect}\{x_i : i \in I\}) = \text{rg}(x_i)_{i \in I}$ (la dimension finie ou infinie du sev engendré par les $x_i$).
- Le rang d'une application linéaire $\phi : E \to F$ est le rang de la famille $(\phi(x))_{x \in E}$, i.e. c'est $\dim(\text{Vect}\{\phi(x) : x \in E\}) = \dim(\text{Im}(\phi))$, i.e. $\text{rg}(\phi) = \dim(\text{Im}(\phi))$ (finie ou infinie).

## Notion de rang

**Théorème du rang.** Soit $\phi \in \mathcal{L}(E, F)$ avec $E$ de dimension finie. Alors $\text{Ker}(\phi)$ et $\text{Im}(\phi)$ sont de dimension finie et

$$
\dim(\text{Ker}(\phi)) + \dim(\text{Im}(\phi)) = \dim(E)
$$

***Démonstration.*** Soit $(e_1, \dots, e_n)$ une base de $E$. Alors $\text{Im}(\phi)$ est engendrée par $\{\phi(e_1), \dots, \phi(e_n)\}$. Donc $\text{Im}(\phi)$ est de dimension finie. De cette partie génératrice de $\text{Im}(\phi)$, extrayons une base de $\text{Im}(\phi)$, disons $(\phi(e_1), \dots, \phi(e_r))$ (quitte à renuméroter les $e_i$), où $r = \dim(\text{Im}(\phi)) = \text{rg}(\phi)$.

Alors, soit $x \in E$ : $\underbrace{\phi(x)}_{\in \text{Im}(\phi)} = \displaystyle\sum_{j=1}^{r} \lambda_j\phi(e_j)$, donc $\phi\left(x - \displaystyle\sum_{j=1}^{r} \lambda_j e_j\right) = 0$ et donc $x - \displaystyle\sum_{j=1}^{r} \lambda_j e_j \in \text{Ker}(\phi)$. Mais $\text{Ker}(\phi)$ est un sev de $E$ et $E$ est de dimension finie, donc $\text{Ker}(\phi)$ est de dimension finie.

Soit $(e'_1, \dots, e'_k)$ une base de $\text{Ker}(\phi)$ : on a alors $x - \displaystyle\sum_{j=1}^{r} \lambda_j e_j = \sum_{i=1}^{k} \lambda'_i e'_i$, i.e. $x = \displaystyle\sum_{j=1}^{r} \lambda_j e_j + \sum_{i=1}^{k} \lambda'_i e'_i$. Donc $\{e_1, \dots, e_r, e'_1, \dots, e'_k\}$ est génératrice de $E$.

Justifions qu'elle est libre :

$$
\begin{aligned}
&\sum_{j=1}^{r} \lambda_j e_j + \sum_{i=1}^{k} \lambda'_i e'_i = 0 \to \sum_{j=1}^{r} \lambda_j\phi(e_j) + \sum_{i=1}^{k} \lambda'_i\phi(e'_i) = 0 \\
\Rightarrow\ &\sum_{j=1}^{r} \lambda_j\phi(e_j) = 0 \Rightarrow \lambda_1 = \dots = \lambda_r = 0 \quad \text{(car } (\phi(e_1), \dots, \phi(e_r)) \text{ est libre : base de } \text{Im}(\phi))
\end{aligned}
$$

Ainsi $\displaystyle\sum_{j=1}^{r} \lambda_j e_j + \sum_{i=1}^{k} \lambda'_i e'_i = 0$ devient $\displaystyle\sum_{i=1}^{k} \lambda'_i e'_i = 0$, d'où $\lambda'_1 = \dots = \lambda'_k = 0$.

Donc $(e_1, \dots, e_r, e'_1, \dots, e'_k)$ est une famille génératrice de $E$ et libre, donc c'est une base de $E$. Et donc $\dim(E) = r + k = \dim(\text{Im}(\phi)) + \dim(\text{Ker}(\phi))$.

**Proposition.** Soit $\phi \in \mathcal{L}(E, F)$, avec $E, F$ de dimensions finies.

- Si $\phi$ envoie une base de $E$ sur une base de $F$, alors $\phi$ est un isomorphisme.
- Si $\phi$ est un isomorphisme, alors $\phi$ envoie toute base de $E$ sur une base de $F$ (et $\dim(F) = \dim(E)$).

***Démonstration.***

- Soit $(b_1, \dots, b_n)$ une base de $E$ telle que $(\phi(b_1), \dots, \phi(b_n))$ soit une base de $F$. Alors $\text{Im}(\phi) = \text{Vect}\{\phi(b_1), \dots, \phi(b_n)\} = F$, donc $\text{Im}(\phi) = F$ et donc $\phi$ est surjective (et $\dim(F) = n = \dim(E)$). Par le théorème du rang, $\dim(\text{Ker}(\phi)) = \dim(E) - \dim(\text{Im}(\phi)) = 0$, donc $\text{Ker}(\phi) = \{0\}$ et donc $\phi$ est injective. Et donc $\phi$ est un isomorphisme.
- Soit $\phi : E \to F$ un isomorphisme. Soit $(b_1, \dots, b_n)$ une base de $E$. $\phi$ est surjective, donc $F = \text{Im}(\phi) = \text{Vect}\{\phi(b_1), \dots, \phi(b_n)\}$, donc $\{\phi(b_1), \dots, \phi(b_n)\}$ engendre $F$, et cette partie de $F$ est libre car

  $$
  \lambda_1\phi(b_1) + \dots + \lambda_n\phi(b_n) = 0 \to \phi(\lambda_1 b_1 + \dots + \lambda_n b_n) = 0 \Rightarrow \lambda_1 b_1 + \dots + \lambda_n b_n = 0 \Rightarrow \lambda_1 = \dots = \lambda_n = 0
  $$

  (car $(b_1, \dots, b_n)$ libre). Et donc $(\phi(b_1), \dots, \phi(b_n))$ est une base de $F$ (et $\dim(F) = n = \dim(E)$).

**Corollaire.** Deux $\mathbb{K}$-ev $E$ et $F$ de dimensions finies sont isomorphes (i.e. il existe un isomorphisme $\phi : E \to F$, et donc un isomorphisme $\phi^{-1} : F \to E$) si et seulement si $\dim(E) = \dim(F)$. (En particulier, un $\mathbb{K}$-ev est isomorphe à $\mathbb{K}^n$ si et seulement s'il est de dimension $n$.)

***Démonstration.*** D'après la proposition précédente, si $E$ et $F$ sont isomorphes, alors $\dim(E) = \dim(F)$. Réciproquement, si $\dim(E) = \dim(F) = n$, soient $(e_1, \dots, e_n)$ une base de $E$, $(f_1, \dots, f_n)$ une base de $F$ ; on définit $\phi \in \mathcal{L}(E, F)$ par $\phi(e_i) = f_i$, c'est-à-dire $\forall x = \displaystyle\sum_{i=1}^{n} x_i e_i$, $\phi(x) = \sum_{i=1}^{n} x_i f_i$ ; $\phi$ envoie la base $(e_1, \dots, e_n)$ de $E$ sur la base $(f_1, \dots, f_n)$ de $F$, donc c'est un isomorphisme.

**Nota bene.** Autrement dit, si $E, F$ sont de dimensions finies, un isomorphisme est une application linéaire qui transforme les bases de $E$ en bases de $F$, et cela suppose $\dim(F) = \dim(E)$.

**Proposition (caractérisation des isomorphismes en dimension finie).** Soient $E$ et $F$ deux $\mathbb{K}$-ev de même dimension finie. Soit $\phi \in \mathcal{L}(E, F)$. Les assertions suivantes sont équivalentes :

1. $\phi$ est un isomorphisme ;
2. $\phi$ est injective ;
3. $\phi$ est surjective ;
4. $\phi$ envoie une base de $E$ sur une base de $F$.

***Démonstration.*** Il suffit de vérifier $(2) \Leftrightarrow (3)$ (car leur conjonction $\Rightarrow (1)$). On a

$$
\begin{aligned}
(2)\ (\phi \text{ est injective}) &\Leftrightarrow \text{Ker}(\phi) = \{0\} \Leftrightarrow \dim(\text{Ker}(\phi)) = 0 \\
&\Leftrightarrow \dim(\text{Im}(\phi)) = \dim(E) \quad \text{(théorème du rang)} \\
&\Leftrightarrow \dim(\text{Im}(\phi)) = \dim(F) \quad (\text{puisque } \dim(F) = \dim(E)) \Leftrightarrow (3)\ (\phi \text{ est surjective})
\end{aligned}
$$

**Remarque.** C'est faux si $E, F$ sont de dimension infinie. Contre-exemples classiques :

1. $\phi : \begin{cases} \mathbb{K}[X] \to \mathbb{K}[X] \\ P(X) \to XP(X) \end{cases}$. $\phi$ est linéaire, injective car $XP(X) = XQ(X) \Rightarrow P(X) = Q(X)$, mais pas surjective car $1 \notin \text{Im}(\phi)$ : il n'existe pas $P(X) \in \mathbb{K}[X]$ tel que $XP(X) = 1$, puisqu'on aurait $P(X) = \dfrac{1}{X} \notin \mathbb{K}[X]$.
2. $\Psi : \begin{cases} \mathbb{K}[X] \to \mathbb{K}[X] \\ P \to P' \end{cases}$. $\Psi$ est linéaire, surjective car tout polynôme $\displaystyle\sum_{i \geq 0} a_i X^i$ est la dérivée d'un polynôme : $\displaystyle\sum_{i \geq 0} a_i X^i = \left(\sum_{i \geq 0} \frac{a_i}{i+1}X^{i+1}\right)' = \Psi\left(\sum_{i \geq 0} \frac{a_i}{i+1}X^{i+1}\right)$. Mais $\Psi$ n'est pas injective : $\Psi(1) = 0 \Rightarrow 1 \in \text{Ker}(\Psi)$ !

## Deux exemples importants d'applications linéaires

1. **Homothétie** $h(x) = \lambda x$, $\lambda \in \mathbb{K}$ (bijective si et seulement si $\lambda \neq 0$). Si $\lambda = 0$, $h = 0$, $\text{Ker}(h) = E$, $\text{Im}(h) = \{0\}$. Si $\lambda \neq 0$, $h$ est un automorphisme, $h^{-1}(y) = \lambda^{-1}y$, avec $\text{Ker}(h) = \{0\}$, $\text{Im}(h) = E$.
2. $E = V \oplus W$ : tout $x \in E$ s'écrit de manière unique $x = v + w$, $v \in V$, $w \in W$, car $V \cap W = \{0\}$ : $v + w = v' + w' \Rightarrow v - v' = w' - w \Rightarrow v - v' = 0$ et $w - w' = 0$. On note $v = p(x)$ : $p$ linéaire, le projecteur (ou la projection) sur $V$ parallèlement à $W$.

## Projecteurs et symétries

**Nota bene.** Projecteurs et symétries sont des applications **linéaires**.

**Proposition.** Soient $E = V \oplus W$, $p$ le projecteur sur $V$ parallèlement à $W$, $S$ la symétrie par rapport à $V$ parallèlement à $W$. On a $p \circ p = p$ et $S \circ S = \text{id}_E$.

***Démonstration.*** $x = v + w$.

- $p(x) = v = v + 0 \Rightarrow p \circ p(x) = p(p(x)) = p(v) = v = p(x)$, donc $p \circ p = p$.
- $S(x) = v - w \Rightarrow S(S(x)) = v - (-w) = v + w = x$, donc $S \circ S = \text{id}_E$.

**Proposition (caractérisation des projecteurs).** Soient $E$ un $\mathbb{K}$-ev et $p \in \mathcal{L}(E)$ tel que $p \circ p = p$. Alors $E = \text{Im}(p) \oplus \text{Ker}(p)$ et $p$ est le projecteur sur $\text{Im}(p)$ parallèlement à $\text{Ker}(p)$.

***Démonstration.*** Pour tout $x \in E$ : $x = p(x) + (x - p(x))$, où $p(x) \in \text{Im}(p)$ et $x - p(x) \in \text{Ker}(p)$ car $p(x - p(x)) = p(x) - p \circ p(x) = 0$ puisque $p \circ p = p$. Cela prouve déjà que $E = \text{Im}(p) + \text{Ker}(p)$. Montrons que $\text{Im}(p) \cap \text{Ker}(p) = \{0\}$ : soit $x \in \text{Im}(p) \cap \text{Ker}(p)$ ; $x \in \text{Im}(p) \Rightarrow \exists y, x = p(y) \Rightarrow p(x) = p \circ p(y) = p(y) = x$. Donc $x = 0$.

On en conclut que $E = \text{Im}(p) \oplus \text{Ker}(p)$. Donc la décomposition $x = v + w$ avec $v \in \text{Im}(p)$, $w \in \text{Ker}(p)$ est unique (pour chaque $x \in E$) : nécessairement $v = p(x)$, $w = x - p(x)$. Le projecteur sur $\text{Im}(p)$ parallèlement à $\text{Ker}(p)$ envoie $x$ sur $v = p(x)$ (pour tout $x$), donc c'est $p$.

**Proposition (caractérisation des symétries).** Soient $E$ un $\mathbb{K}$-ev et $S \in \mathcal{L}(E)$ tel que $S \circ S = \text{id}_E$. Alors $E = \text{Ker}(\text{id}_E - S) \oplus \text{Ker}(\text{id}_E + S)$ et $S$ est la symétrie par rapport à $\text{Ker}(\text{id}_E - S)$ parallèlement à $\text{Ker}(\text{id}_E + S)$.

***Démonstration.*** Pour $x \in E$ : $x = \dfrac{x + S(x)}{2} + \dfrac{x - S(x)}{2}$, où $\dfrac{x + S(x)}{2} \in \text{Ker}(\text{id}_E - S)$ car

$$
(\text{id}_E - S)\left(\frac{x + S(x)}{2}\right) = \frac{x + S(x)}{2} - S\left(\frac{x + S(x)}{2}\right) = \frac{x + S(x)}{2} - \frac{S(x) + S \circ S(x)}{2} = \frac{x + S(x)}{2} - \frac{S(x) + x}{2} = 0
$$

Et de même, $\dfrac{x - S(x)}{2} \in \text{Ker}(\text{id}_E + S)$. Donc $E = \text{Ker}(\text{id}_E - S) + \text{Ker}(\text{id}_E + S)$. Montrons que $\text{Ker}(\text{id}_E - S) \cap \text{Ker}(\text{id}_E + S) = \{0\}$. Soit $x \in \text{Ker}(\text{id}_E - S) \cap \text{Ker}(\text{id}_E + S)$ : alors $\begin{cases} (\text{id}_E - S)(x) = 0 \\ (\text{id}_E + S)(x) = 0 \end{cases}$, donc $\begin{cases} S(x) = x \\ S(x) = -x \end{cases}$, d'où $x = -x$ et donc $x = 0$.

Ainsi, $E = \text{Ker}(\text{id}_E - S) \oplus \text{Ker}(\text{id}_E + S)$. Pour tout $x \in E$, la décomposition $x = v + w$ où $v \in \text{Ker}(\text{id}_E - S)$ et $w \in \text{Ker}(\text{id}_E + S)$ est unique. Nécessairement, $v = \dfrac{x + S(x)}{2}$, $w = \dfrac{x - S(x)}{2}$ ; la symétrie par rapport à $\text{Ker}(\text{id}_E - S)$ parallèlement à $\text{Ker}(\text{id}_E + S)$ envoie $x$ sur $v - w = \dfrac{x + S(x)}{2} - \dfrac{x - S(x)}{2} = S(x)$ : donc c'est $S$.

## Hyperplans

**Définition.** Soit $E$ un $\mathbb{K}$-ev. On dit qu'un sev $H$ de $E$ est un **hyperplan** de $E$ s'il est le noyau d'une application linéaire $\phi : E \to \mathbb{R}$ non nulle (i.e. $\phi$ n'est pas l'application nulle).

**Nota bene.** Une application linéaire $E \to \mathbb{R}$ est appelée une **forme linéaire**.

**Proposition.** Soit $E$ un $\mathbb{K}$-ev de dimension finie : $\dim(E) = n$. Un sev $H$ de $E$ est un hyperplan si et seulement si $\dim(H) = n - 1$.

**Remarque.** Pour $n = 3$, un hyperplan est un plan : $\dim(H) = 2$. D'où le nom.

***Démonstration.***

- Soit $H$ un hyperplan : $H = \text{Ker}(\phi)$, $\phi \neq 0$. $\phi \neq 0$, donc il existe $v \in E$ tel que $\phi(v) = \lambda \neq 0$. Alors $\phi(\lambda^{-1}v) = \lambda^{-1}\phi(v) = 1$ et $\forall t \in \mathbb{R}$, $\phi(t\lambda^{-1}v) = t\phi(\lambda^{-1}v)$, donc $\text{Im}(\phi) = \mathbb{R}$ (l'image d'une forme linéaire non nulle est $\mathbb{R}$). Et donc $\dim(H) = \dim(\text{Ker}(\phi)) = n - \dim(\text{Im}(\phi)) = n - 1$.
- (Réciproque.) Soit $H$ un sev de $E$ de dimension $n - 1$. Soit $v \notin H$ : $\forall \lambda \neq 0$, $\lambda v \notin H$ (car $\lambda v \in H \Rightarrow \lambda^{-1}(\lambda v) \in H$). Donc $\mathbb{K}v \cap H = \{0\}$. Grassmann $\Rightarrow \dim(\mathbb{K}v + H) = \dim(\mathbb{K}v) + \dim(H) - \dim(\mathbb{K}v \cap H)$, donc $\dim(\mathbb{K}v + H) = n = \dim(E)$ et donc $\mathbb{K}v + H = E$. On obtient donc $E = H \oplus \mathbb{K}v$. Soit $p$ le projecteur sur $\mathbb{K}v$ parallèlement à $H$ : $\forall x \in E$, $x = h + p(x)$ où $h \in H$, $p(x) = \phi(x)v$ ; $\phi$ est une forme linéaire, non nulle car $\phi(v) = 1$ ($p(v) = v$). Et il est clair que $x \in H \Leftrightarrow \phi(x) = 0$, donc $H = \text{Ker}(\phi)$.

**Définition.** L'espace $\mathcal{L}(E, \mathbb{R})$ des formes linéaires sur $E$ (i.e. définies sur $E$) est appelé l'espace dual de $E$ : on le note $E^*$.

**Proposition.** Si $E$ est de dimension finie, soit $(e_1, \dots, e_n)$ une base de $E$. Alors $E^*$ est de dimension finie égale à $n = \dim(E)$ et il existe une unique base $(e^*_1, \dots, e^*_n)$ de $E^*$ vérifiant

$$
e^*_i(e_j) = \begin{cases} 1 \text{ si } j = i \\ 0 \text{ sinon} \end{cases} \quad (1 \leq i, j \leq n)
$$

On l'appelle la base duale de $(e_1, \dots, e_n)$. Et pour tout $\phi \in E^*$, on a la décomposition :

$$
\phi = \sum_{i=1}^{n} \phi(e_i)e^*_i
$$

***Démonstration.*** On définit $e^*_i$ ($1 \leq i \leq n$) par

$$
e^*_i(e_j) = \begin{cases} 1 \text{ si } j = i \\ 0 \text{ sinon} \end{cases}
$$

Cela définit bien un $e^*_i \in E^*$ pour tout $i \in \{1, \dots, n\}$. Montrons que $(e^*_1, \dots, e^*_n)$ est libre : $\displaystyle\sum_{i=1}^{n} \lambda_i e^*_i = 0 \Rightarrow \forall j, \sum_{i=1}^{n} \lambda_i e^*_i(e_j) = 0 \Rightarrow \forall j, \lambda_j = 0$. Donc $(e^*_1, \dots, e^*_n)$ est libre. Pour justifier que c'est une famille génératrice (donc une base) de $E^*$, il suffit de justifier la formule $\forall \phi \in E^*$, $\phi = \displaystyle\sum_{i=1}^{n} \phi(e_i)e^*_i$. Or, $\forall j \in \{1, \dots, n\}$, $\phi(e_j) = \displaystyle\sum_{i=1}^{n} \phi(e_i)e^*_i(e_j)$.
