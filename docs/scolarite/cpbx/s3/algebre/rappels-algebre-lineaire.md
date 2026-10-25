---
title: "Rappels d'algèbre linéaire"
description: "Rappels d'algèbre linéaire : familles libres et génératrices, bases, sommes directes et projecteurs, rang et théorème du rang, dualité, trace, matrices par blocs et sous-espaces stables."
sidebar_position: 1
---

$\mathbb{K}$ désigne $\mathbb{R}$ ou $\mathbb{C}$. $E$ est un $\mathbb{K}$-ev. $I$ désigne un ensemble (tel que $\{1, \dots, n\}$) qui va indexer une famille.

## Bases et sommes dans un espace vectoriel

**Définition 1.** Soit $(x_i)_{i \in I}$ une famille finie de $E$. On dit que $x$ est une combinaison linéaire (c.l.) des $x_i$ s'il existe une famille $(\alpha_i)_{i \in I}$ de $\mathbb{K}$ telle que $x = \displaystyle\sum_{i \in I} \alpha_i x_i$.

**Définition 2.** Une famille $(x_i)_{i \in I}$ est libre si pour toute famille $(\alpha_i)_{i \in I}$ de $\mathbb{K}$, on a $\displaystyle\sum_{i \in I} \alpha_i x_i = 0 \Rightarrow (\alpha_i = 0, \forall i \in I)$.
Une famille non libre est liée. Cela signifie qu'il existe des $\alpha_i$, non tous nuls, tels que $\displaystyle\sum_{i \in I} \alpha_i x_i = 0$.

**Remarque.** Toute famille contenant 0 est liée. En effet, si la famille est $x_1, 0, \dots, x_n$, on choisit $0, \dots, \alpha_j, 0, \dots, 0$ où $\alpha_j$ est quelconque et différent de 0, et on a bien $\sum \alpha_i x_i = 0 \times x_1 + \dots + \alpha_j \times 0 + \dots + 0 \times x_n = 0$.

**Définition 3.** Une famille $(x_i)_{i \in I}$ est dite génératrice dans $E$ si tout vecteur $x$ de $E$ est une combinaison linéaire des $x_i$. Autrement dit $\forall x \in E, \exists (\alpha_i)_{i \in I} \in \mathbb{K}^I$, tels que $x = \displaystyle\sum_{i \in I} \alpha_i x_i$.

**Remarque.** Toute sous-famille d'une famille libre est libre. Toute sur-famille d'une famille génératrice est génératrice.

**Définition / Proposition 4.** Une famille libre et génératrice est appelée une base de $E$. On a alors : $\forall x \in E, \exists! (\alpha_i)_{i \in I} \in \mathbb{K}^I$ tel que $x = \displaystyle\sum_{i \in I} \alpha_i x_i$. Les $\alpha_i$ sont appelés les coordonnées de $x$ dans la base des $(x_i)_{i \in I}$.
La dimension de $E$ est le cardinal de la famille $(x_i)_{i \in I}$.

**Remarque.** La dimension de $E$ est différente du degré $P$ et différente de $\text{card}(\text{ensemble})$.
La dimension de $E$ est :

- le plus grand cardinal d'une famille libre ;
- le plus petit cardinal d'une famille génératrice.

On admet l'unicité de ce nombre, ainsi que l'existence d'une base dans un espace vectoriel.

**Démonstration de l'unicité des coefficients.** Soient $(\alpha_i)_{i \in I}$ et $(\alpha'_i)_{i \in I}$ deux familles telles que $x = \displaystyle\sum_{i \in I} \alpha_i x_i = \sum_{i \in I} \alpha'_i x_i$. Donc $\displaystyle\sum_{i \in I} (\alpha_i - \alpha'_i) x_i = 0$. Donc, puisque $(x_i)_{i \in I}$ est libre, $\alpha_i - \alpha'_i = 0, \forall i \in I$, donc $\alpha_i = \alpha'_i$.

**Théorème.** Soit $E$ un espace vectoriel de dimension $n$. Soit $\mathcal{F}$ une famille de $n$ éléments. Alors : $\mathcal{F}$ est libre $\Leftrightarrow \mathcal{F}$ est une base $\Leftrightarrow \mathcal{F}$ est génératrice dans $E$.

**Remarque.** Si $(E_i)_{i=1,\dots,n}$ sont des espaces vectoriels, alors $\displaystyle\prod_{i=1}^{n} E_i$ (rappel : $\mathbb{R}^2 = \mathbb{R} \times \mathbb{R} = \{(x, y), x \in \mathbb{R}, y \in \mathbb{R}\}$), par définition $\{(x_1, \dots, x_n), x_1 \in E_1, \dots, x_n \in E_n\}$, est un espace vectoriel. De plus, sa dimension est $\displaystyle\sum_{i=1}^{n} \dim(E_i)$.
Ainsi $\dim(\mathbb{R}^n) = \dim(\mathbb{R}) + \dots + \dim(\mathbb{R}) = n$. On en connaît une base : $(e_1, \dots, e_n)$, où $e_i = (0, \dots, 0, 1, 0, \dots, 0)$.

**Exercice.** Montrer cela pour deux espaces vectoriels :

$$
\dim(E \times F) = \dim(E) + \dim(F)
$$

**Solution.** Soit $(e_1, \dots, e_n)$ une base de $E$, et $(f_1, \dots, f_p)$ une base de $F$.
On considère la famille $\{(e_1, 0), \dots, (e_n, 0), (0, f_1), \dots, (0, f_p)\}$. C'est une famille de $(n + p)$ éléments de $E \times F$. Montrons qu'elle est libre et génératrice.

- **Libre.** Soient $(\alpha_1, \dots, \alpha_n, \alpha_{n+1}, \dots, \alpha_{n+p})$ tels que $\alpha_1 (e_1, 0) + \dots + \alpha_n (e_n, 0) + \alpha_{n+1} (0, f_1) + \dots + \alpha_{n+p} (0, f_p) = 0 \Leftrightarrow \Big(\displaystyle\sum_{i=1}^{n} \alpha_i e_i, \sum_{i=1}^{p} \alpha_{n+i} f_i\Big) = 0$.
- **Générateurs.** Soit $x \in E \times F$. On l'écrit $x = (e, f)$, où $e \in E$ et $f \in F$. Puisque $(e_i)$ et $(f_i)$ sont des bases de $E$ et $F$, on a : $e = \displaystyle\sum_{1}^{n} \alpha_i e_i$ et $f = \displaystyle\sum_{1}^{p} \beta_i f_i$. On a alors $(e, f) = \Big(\displaystyle\sum_{1}^{n} \alpha_i e_i, \sum_{1}^{p} \beta_i f_i\Big) = \sum_{1}^{n} \alpha_i (e_i, 0) + \sum_{1}^{p} \beta_i (0, f_i)$, qui est une combinaison linéaire de la famille $((e_1, 0), \dots, (e_n, 0), (0, f_1), \dots, (0, f_p))$.

**Remarque.** Une union d'espaces vectoriels n'est pas un espace vectoriel.

**Exemple.** Si $E = \mathbb{R}^2$, $E_1 = \text{Vect}\begin{pmatrix} 1 \\ 0 \end{pmatrix}$ et $E_2 = \text{Vect}\begin{pmatrix} 0 \\ 1 \end{pmatrix}$, alors $E_1 \cup E_2$ n'est pas un espace vectoriel. En effet $e_1 + e_2 \notin E_1 \cup E_2$ (mais une intersection d'espaces vectoriels est un espace vectoriel).

**Définition 5.** Si $(E_i)_{i \in I}$ sont des sev de $E$, alors la "somme" $\displaystyle\sum_{i \in I} E_i$ est un sev de $E$, défini par :

$$
\sum_{i \in I} E_i = \left\{\sum_{i \in I} x_i, (x_i)_{i \in I} \in (E_i)_{i \in I}\right\}
$$

C'est l'ensemble des combinaisons linéaires d'éléments des $E_i$.
De plus, on dit que la somme $\displaystyle\sum_{i \in I} E_i$ est directe si $\displaystyle\sum_{i \in I} x_i = 0 \Rightarrow (x_i = 0, \forall i \in I)$. On note alors $\displaystyle\bigoplus_{i \in I} E_i$.

**Exercice.** $F$ et $G$ sont en somme directe si et seulement si $F \cap G = \{0\}$.

**Démonstration.**

- $\Rightarrow$ Soit $x \in F \cap G$. Alors $\underbrace{x}_{\in F} + \underbrace{-x}_{\in G} = 0$. Or $F$ et $G$ sont en somme directe. Donc $\begin{cases} x = 0 \\ -x = 0 \end{cases}$. Donc $F \cap G = \{0\}$.
- $\Leftarrow$ Soit $f \in F$ et $g \in G$ tels que $f + g = 0$. Donc $f = -g$. Donc $f \in G$. Or $\begin{cases} f \in F \\ F \cap G = \{0\} \end{cases}$. Donc $f = 0$, puis $g = -f = 0$.

$\square$

**Remarque.** Ceci est faux si on a plus de 2 sous-espaces vectoriels.

**Exemple.** $E = \mathbb{R}^2$, $E_1 = \text{Vect}(e_1)$, $E_2 = \text{Vect}(e_2)$ et $E_3 = \text{Vect}(e_1 + e_2)$. On a $E_1 \cap E_2 \cap E_3 = \{0\}$. Mais $(-e_1) + (-e_2) + (e_1 + e_2) = 0$.

**Définition 6.** Soient $F$ et $G$ des sous-espaces vectoriels de $E$ tels que $E = F \oplus G$. On dit que $F$ et $G$ sont supplémentaires dans $E$. On dit aussi que $G$ est un supplémentaire de $F$ dans $E$.

**Définition 7.** Soit $F$ un sous-espace vectoriel de $E$. Soit $B$ une base de $E$. On dit qu'elle est "adaptée" à $F$ s'il existe une base $B'$ de $F$ telle que $B$ est de la forme $B = (B', e_{p+1}, \dots, e_n)$.

**Exemple.** Si $E = \mathbb{R}^3$ et $F = \text{plan}(0xy) = \{(x, y, 0), x \in \mathbb{R}, y \in \mathbb{R}\}$, $B = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix}$ est adaptée à $F$. En effet $B' = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}$ est bien une base de $F$.

**Remarque.** On parle de la base canonique de $\mathbb{R}^n$ : il s'agit de $\begin{pmatrix} 1 \\ 0 \\ \vdots \\ 0 \end{pmatrix}, \dots, \begin{pmatrix} 0 \\ \vdots \\ 0 \\ 1 \end{pmatrix}$, usuellement notée $e_1, \dots, e_n$.

**Proposition 8.** Soient $E_i$ des sev de $E$, et $\mathcal{F}_i$ des familles génératrices de chaque $E_i$. Alors $\displaystyle\bigcup_{i \in I} \mathcal{F}_i$ génère $\displaystyle\sum_{i \in I} E_i$.

**Démonstration.** Soit $x \in \displaystyle\sum_{i \in I} E_i$. Alors $x$ s'écrit $x = \displaystyle\sum_{i \in I} x_i$, où $x_i \in E_i$. On note $\mathcal{F}_i = (e_{i,j})_{j \in \mathcal{J}_i}$. Alors, puisque $\mathcal{F}_i$ génère $E_i$, il existe des scalaires $(\alpha_{i,j})_{j \in \mathcal{J}_i}$ tels que $x_i = \displaystyle\sum_{j \in \mathcal{J}_i} \alpha_{i,j} \times e_{i,j}$.
On a alors $x = \displaystyle\sum_{i \in I} x_i = \sum_{i \in I} \sum_{j \in \mathcal{J}_i} \alpha_{i,j} e_{i,j}$. C'est bien une combinaison linéaire des $(e_{i,j})_{i \in I, j \in \mathcal{J}_i}$, c'est-à-dire des éléments de $\displaystyle\bigcup_{i \in I} \mathcal{F}_i$. $\square$

**Proposition 9.** Si la somme des $E_i$ est directe, et si les $\mathcal{F}_i$ sont des familles libres des $E_i$, alors $\displaystyle\bigcup_{i \in I} \mathcal{F}_i$ est encore une famille libre.

**Démonstration.** On note encore $\mathcal{F}_i = (e_{i,j})_{j \in \mathcal{J}_i}$. On suppose qu'il existe des scalaires $(\alpha_{i,j})$ tels que $\displaystyle\sum_{i,j} \alpha_{i,j} e_{i,j} = 0$. On pose $x_i = \displaystyle\sum_{j \in \mathcal{J}_i} \alpha_{i,j} e_{i,j}$. Alors $\displaystyle\sum_{i,j} \alpha_{i,j} e_{i,j} = \sum_{i \in I} x_i = 0$. Or $x_i \in E_i$ et les $E_i$ sont en somme directe.
Donc $x_i = 0, \forall i \in I$, c'est-à-dire : $\displaystyle\sum_{j \in \mathcal{J}_i} \alpha_{i,j} e_{i,j} = 0$. Or $(e_{i,j})_{j \in \mathcal{J}_i}$ est libre, donc $\alpha_{i,j} = 0, \forall j \in \mathcal{J}_i$ ; ceci étant vrai pour tout $i \in I$, on a bien $(\alpha_{i,j})_{i \in I, j \in \mathcal{J}_i}$ qui est la famille nulle. $\square$

**Corollaire 10.** Supposons que les $(E_i)$ sont des sev en somme directe. Soient $B_i$ des bases de chaque $E_i$. Alors $\bigcup_{i \in I} B_i$ est une base de $\oplus E_i$.
On dit que cette base est adaptée à la somme $\oplus E_i$.

**Proposition 11.** Soit $E_i$ des sev de $E$. Alors $\displaystyle\sum_{i \in I} \dim(E_i) \geq \dim\Big(\sum_{i \in I} E_i\Big)$. Si de plus la somme des $E_i$ est directe, alors c'est une égalité.

**Démonstration.** Soient $B_i$ des bases correspondant aux $E_i$.

$$
\sum_{i \in I} \dim(E_i) = \sum_{i \in I} \text{card}(B_i) = \text{card}\Big(\bigcup_{i \in I} B_i\Big)
$$

Or $\displaystyle\bigcup_{i \in I} B_i$ génère $\displaystyle\sum_{i \in I} E_i$. Donc $\text{card}(\bigcup B_i) \geq \dim(\sum_{i \in I} E_i)$. Donc $\displaystyle\sum_{i \in I} \dim(E_i) \geq \dim\Big(\sum_{i \in I} E_i\Big)$. Si de plus la somme est directe, $\displaystyle\bigcup_{i \in I} B_i$ est une base de $\displaystyle\bigoplus_{i \in I} E_i$ d'après le corollaire 10. Donc $\text{card}(\bigcup_{i \in I} B_i) = \dim \bigoplus_{i \in I} E_i$ : on a bien égalité. $\square$

**Proposition 12.** Soit $(E_i)$ des sev tels que $\dim(\sum_{i \in I} E_i) = \sum_{i \in I} \dim(E_i)$. Alors la somme est directe.

**Démonstration.** Soient $(x_i)$, $\displaystyle\sum_{i \in I}$ avec $x_i \in E_i$ et $\sum x_i = 0$ ; chaque vecteur $x_i$ est complété en une base $B_i$ de $E_i$. Alors $\bigcup B_i$ engendre $\sum E_i$ d'après la proposition 8. De plus $\bigcup B_i$ a pour cardinal $\sum \dim(E_i)$, qui vaut $\dim(\sum E_i)$ par hypothèse. Donc c'est une base par le théorème de rappel. Or $(x_i)_{i \in I}$ est une sous-famille de $\bigcup B_i$, donc elle est libre. Or $\displaystyle\sum_{i \in I} x_i = 0$, donc $x_i = 0, \forall i \in I$. $\square$

**Définition 13.** On dit qu'une fonction $p \in \mathcal{L}(E)$ est un projecteur lorsque $p \circ p = p$. On projette sur $\text{Im}(p)$, parallèlement à $\text{Ker}(p)$.

**Exemple.** $E = \mathbb{R}^2$, $E_1 = \text{Vect}(e_1)$ et $E_2 = \text{Vect}(e_2)$. Soit $p(x, y) = (x, 0)$. On a vu que $p$ est le projecteur sur $E_1$ parallèlement à $E_2$ (vérifier que $E_2 = \text{Ker}(p)$ et $E_1 = \text{Im}(p)$). Soient $(E_i)$ des sev en somme directe, tels que $E = \displaystyle\bigoplus_{i \in I} E_i$. Alors $\forall x \in E, \exists!$ famille $(x_i)_{i \in I}$ de vecteurs de $E_i$ tels que $x = \displaystyle\sum_{i \in I} x_i$. En effet :

- l'existence vient du fait que $E = \sum E_i$ ;
- montrons l'unicité : supposons que $x = \displaystyle\sum_{i \in I} x_i = \sum_{i \in I} x'_i$, où $x'_i$ et $x_i$ sont dans $E_i$. Alors $\displaystyle\sum_{i \in I} (x_i - x'_i) = 0$. Or $x_i - x'_i \in E_i$, et la somme est directe. Donc $x_i = x'_i, \forall i \in I$.

**Proposition 14.** La fonction $p_i : \begin{cases} E \to E_i \\ x \mapsto x_i \end{cases}$ est un projecteur. Il projette sur $E_i$, parallèlement à $\bigoplus_{j \neq i} E_j$.
De plus, $i \neq i' \Rightarrow \begin{cases} p_i \circ p_{i'} = 0 \\ \sum_{i \in I} p_i = Id \end{cases}$.

**Démonstration.** $p_i \circ p_i(x) = p_i(x_i)$. Or $x_i$ s'écrit bien $x_i = 0 + \dots + x_i + \dots + 0$. Donc $p_i(x_i) = x_i$. Ainsi $p \circ p(x) = p(x)$ et $p$ est un projecteur. Par définition, $\text{Im}(p_i) \subset E_i$, car $p_i(x) = x_i \in E_i$. De plus, soit $y \in E_i$, alors $p_i(y) = y$. Donc $y \in \text{Im}(p_i)$. Ainsi, $\text{Im}(p_i) = E_i$. Soient $i \neq i'$ deux indices. On a $E_{i'} \subset \bigoplus_{j \neq i} E_j = \text{Ker}(p_i)$. Or $p_{i'}(x) \in E_{i'}$. Donc $p_i(p_{i'}(x)) = 0$. Donc $p_i \circ p_{i'} = 0$. On a $x = \displaystyle\sum_{i \in I} x_i = \sum_{i \in I} p_i(x) = \Big(\sum_{i \in I} p_i\Big)(x)$. Donc $\displaystyle\sum_{i \in I} p_i = Id$. $\square$

## Applications linéaires

$\mathcal{L}(E, F)$ désigne l'ensemble des applications linéaires de $E$ dans $F$. C'est un ev de dimension $\dim(E) \times \dim(F)$.

### Rang

Soit $u \in \mathcal{L}(E, F)$. On rappelle que $\text{Ker}(u) = \{0\} \Leftrightarrow u$ est injective, et $\text{Im}(u) = F \Leftrightarrow u$ est surjective.

**Définition 1.** On définit le rang de $u$ : $rg(u) = \dim(\text{Im}(u))$.

**Théorème I.2.**

1. Soit $u \in \mathcal{L}(E, F)$, et soit $E'$ tel que $E = E' \oplus \text{Ker}(u)$. Alors $u'$ défini par $u' : E' \to \text{Im}(u)$ et $x \mapsto u(x)$ est un isomorphisme.
2. $\dim(\text{Ker}(u)) + rg(u) = \dim(E)$

**Rappel.** Un isomorphisme est une application linéaire bijective.

**Démonstration.** $u'$ est clairement linéaire, à valeurs dans $\text{Im}(u)$, car $u$ l'est. De plus montrons que :

- $u'$ est injectif. Soit $x \in E'$ tel que $u'(x) = 0$. Alors $u(x) = 0$. Donc $x \in \text{Ker}(u)$. Donc $x \in \text{Ker}(u) \cap E'$. Or la somme est directe, donc $x = 0$.
- $u'$ est surjectif dans $\text{Im}(u)$. Soit $y \in \text{Im}(u)$. Alors $\exists x \in E$ tel que $y = u(x)$. Or $E = E' \oplus \text{Ker}(u)$. Donc on écrit $x = x' + t$ avec $x' \in E'$, $t \in \text{Ker}(u)$, et $u(x) = u(x' + t) = u(x') + u(t) = u(x')$ car $t \in \text{Ker}(u)$. Ainsi $u'$ est surjectif.

Donc $u'$ est bijective. Montrons 2) : puisque $u'$ est un isomorphisme, $\dim(E') = \dim(\text{Im}(u))$. Or $\dim(E') + \dim(\text{Ker}(u)) = \dim(E)$. Ainsi $\dim(E) - \dim(\text{Ker}(u)) = rg(u)$.
On peut retenir de 1) : "tout supplémentaire de $\text{Ker}(u)$ est isomorphe à $\text{Im}(u)$". $\square$

**Corollaire 3.** Si $\dim(E) = \dim(F)$, alors $u$ surjective est équivalent à $u$ injective, donc $u$ est bijective.

**Démonstration.** Si $u$ est injective, alors $\text{Ker}(u) = \{0\}$, et par le théorème du rang, $rg(u) = \dim(E)$. Or $\dim(E) = \dim(F)$. Donc $rg(u) = \dim(F)$ et $\text{Im}(u) \subset F \Rightarrow \text{Im}(u) = F$. Donc $u$ est surjective. Réciproquement, si $u$ est surjective, $rg(u) = \dim(F)$, et $\dim(\text{Ker}(u)) = 0$ par le théorème du rang. Donc $\text{Ker}(u) = \{0\}$ et $u$ est injective. $\square$

**Remarque.** On a utilisé $F \subset E$ et $\dim(F) = \dim(E) \Rightarrow F = E$, et $\dim(F) = 0 \Rightarrow F = \{0\}$.

**Application du corollaire.** (traité en TD)

- par 2 points passe une droite ;
- par 3 points passe un polynôme de degré 2 ;
- par $n$ points passe un polynôme de degré $n - 1$. C'est le polynôme interpolateur de Lagrange.

### Dualité

**Définition 4.** On appelle forme linéaire toute application linéaire de $E$ dans $\mathbb{K}$. On note $E^*$ l'ensemble des formes linéaires de $E$. On l'appelle le dual de $E$.

**Exemple.** Si $E = C^0([a, b])$, alors $\phi : \begin{cases} E \to \mathbb{R} \\ f \mapsto \int_a^b f(x)\,dx \end{cases}$ est une forme linéaire.

**Démonstration.** (À savoir.) $\phi$ est bien à valeurs dans $\mathbb{K}$. De plus $\phi(f_1 + \lambda f_2) = \int_a^b (f_1 + \lambda f_2)(x)\,dx = \int_a^b f_1(x) + \lambda f_2(x)\,dx = \int_a^b f_1(x)\,dx + \lambda \int_a^b f_2(x)\,dx = \phi(f_1) + \lambda \phi(f_2)$. Donc $\phi$ est linéaire. $\square$

**Exemple.** $P_1 : \begin{cases} \mathbb{R}^2 \to \mathbb{R} \\ (x, y) \mapsto x \end{cases}$ est une forme linéaire. C'est un cas particulier d'un exemple fondamental : soit $E$ un espace vectoriel muni d'une base $(e_1, \dots, e_n)$ ; pour $x \in E$, $x$ s'écrit $x = \displaystyle\sum_{i=1}^{n} x_i e_i$, où $x_i \in \mathbb{K}$ sont les coordonnées. On pose $e_i^*(x) = x_i$. Alors $e_i^*$ est un élément de $E^*$.

**Exercice.** Vérifier que $e_i^*$ est linéaire.

**Théorème I.5.** Soit $E$ un espace vectoriel muni d'une base $(e_1, \dots, e_n)$. Alors $E^*$ est un espace vectoriel, et une base est $(e_1^*, \dots, e_n^*)$. Ainsi, $\dim(E^*) = \dim(E)$.

**Démonstration.** (À savoir.) On a que $E^* = \mathcal{L}(E, \mathbb{K})$, c'est donc un espace vectoriel. On calcule d'abord $e_i^*(e_j)$ : on a $e_j = 0.e_1 + \dots + 1.e_j + \dots + 0.e_n$. Ainsi $e_i^*(e_j) = \begin{cases} 1 & \text{si } i = j \\ 0 & \text{sinon} \end{cases}$. On note cela $\delta_{ij} := \begin{cases} 1 & \text{si } i = j \\ 0 & \text{sinon} \end{cases}$ (symbole de Kronecker).
Soit $\phi \in E^*$. On va montrer que $\phi = \displaystyle\sum_{i=1}^{n} \phi(e_i) e_i^*$. Appelons $\tilde{\phi}$ cette dernière somme. Calculons $\tilde{\phi}(e_j)$ :

$$
\tilde{\phi}(e_j) = \sum_{i=1}^{n} \phi(e_i) e_i^*(e_j) = \phi(e_1) e_1^*(e_j) + \dots + \phi(e_n) e_n^*(e_j) = \phi(e_j) e_j^*(e_j) = \phi(e_j)
$$

On a utilisé $e_i^*(e_j) = \delta_{ij}$.
On a utilisé que dans la somme, tous les termes disparaissent sauf 1 (le $j$-ème). Ainsi on a $\tilde{\phi}(e_j) = \phi(e_j), \forall j \in \{1, \dots, n\}$. Donc $\phi$ et $\tilde{\phi}$ coïncident sur une base de $E$. Donc $\phi = \tilde{\phi} = \displaystyle\sum_{i=1}^{n} \phi(e_i) e_i^*$. Donc $(e_i^*)_{i=1,\dots,n}$ est une famille génératrice de $E^*$.
Montrons que c'est une famille libre : soit $(\alpha_i)_{i=1,\dots,n}$ des scalaires tels que $\displaystyle\sum_{i=1}^{n} \alpha_i e_i^* = 0$ (application linéaire nulle). On évalue cela en $e_j$. On a donc $\displaystyle\sum_{i=1}^{n} \alpha_i e_i^*(e_j) = 0$. Donc $\alpha_j = 0$, et ce pour tout $j$. Donc la famille est libre. On déduit donc que $(e_i^*)_{i=1,\dots,n}$ est une base de $E^*$, et donc $\dim(E^*) = n = \dim(E)$. $\square$

**Théorème I.6.** Soit $E$ un espace vectoriel de dimension $n$. Soit $\phi \in E^* \setminus \{0\}$ (c'est-à-dire $\phi \in E^*$ et $\phi \neq 0$). Alors $\text{Ker}(\phi)$ est de dimension $n - 1$. On dit que c'est un hyperplan de $E$.

**Remarque.** La réciproque est vraie (tout hyperplan est le noyau d'une forme linéaire).

**Démonstration.** (À savoir.) On applique le théorème du rang : $\dim(\text{Ker}(\phi)) + \dim(\text{Im}(\phi)) = \dim(E) = n$. Or $\phi \in \mathcal{L}(E, \mathbb{K})$. Donc $\text{Im}(\phi) \subset \mathbb{K}$. Or les sev de $\mathbb{K}$ sont $\{0\}$ et $\mathbb{K}$. Si $\text{Im}(\phi) = \{0\}$, alors $\phi = 0$. Or $\phi \neq 0$. Donc $\text{Im}(\phi) = \mathbb{K}$, et $rg(\phi) = 1$. Donc $\dim \text{Ker}(\phi) = n - 1$. $\square$

### Traces

**Définition / Proposition 7.** Soit $u \in \mathcal{L}(E)$. Soit $B$ une base de $E$ et $A = Mat_B(u)$. On note $(a_{ij})$ ses coefficients. Alors le nombre $\displaystyle\sum_{i=1}^{n} a_{ii}$ ne dépend que de $u$, et pas du choix de $B$. On l'appelle la trace de $u$. On note $tr(u) = tr(A) = \displaystyle\sum_{i=1}^{n} a_{ii}$. De plus, $tr(AB) = tr(BA)$, et l'application $tr : \begin{cases} E \to \mathbb{K} \\ u \mapsto tr(u) \end{cases}$ est une forme linéaire.

**Démonstration.** Commençons par montrer que $tr(AB) = tr(BA)$. Soit $C = AB$ et $D = BA$. Notons $(C_{ij})$ les coefficients de $C$. Alors $C_{ij} = \displaystyle\sum_{k=1}^{n} a_{ik} b_{kj}$. De même, $D_{ij} = \displaystyle\sum_{k=1}^{n} b_{ik} a_{kj}$. Ainsi $tr(AB) = \displaystyle\sum_{i=1}^{n} C_{ii} = \sum_{i=1}^{n} \sum_{k=1}^{n} a_{ik} b_{ki}$ et $tr(BA) = \displaystyle\sum_{i=1}^{n} \sum_{k=1}^{n} b_{ik} a_{ki} = \sum_{i=1}^{n} \sum_{k=1}^{n} a_{ki} b_{ik}$. Ainsi $tr(BA) = \displaystyle\sum_{k=1}^{n} \sum_{i=1}^{n} a_{ki} b_{ik} = \sum_{p=1}^{n} \sum_{q=1}^{n} a_{pq} b_{qp}$ et $tr(AB) = \displaystyle\sum_{p=1}^{n} \sum_{q=1}^{n} a_{pq} b_{qp}$. Donc ces 2 sommes sont égales.
Soit $B$ une matrice de $u$ dans une base $B'$. Alors $B = P^{-1} A P$, où $P$ est la matrice de changement de base ($A$ et $B$ sont semblables). On a alors $tr(B) = tr(P^{-1} A P) = tr(P^{-1} \times (PA)) = tr(IA) = tr(A)$. Ainsi $tr(u)$ ne dépend pas du choix de la base. Puisque $tr(A + \lambda B) = tr(A) + \lambda tr(B)$, c'est clairement une forme linéaire. $\square$

## Matrices par blocs et sev stables

### Règles absolues

**Rappel.** Pour multiplier 2 matrices $A$ et $B$, le nombre de colonnes de $A$ doit être le nombre de lignes de $B$ (pour faire $AB$). Autrement dit : $A \in M_{qn}$ et $B \in M_{n,p}$, alors $AB \in M_{qp}$. On peut découper une matrice par blocs : $A \begin{pmatrix} A_{11} & \cdots & A_{1s} \\ \vdots & \dots & \vdots \\ A_{t1} & \cdots & A_{ts} \end{pmatrix}$ où les $A_{ij}$ sont des "sous-matrices" (ou des blocs), avec $A_{ij} \in M_{n_i, p_j}$, $i \in \{1, \dots, t\}$ et $j \in \{1, \dots, s\}$, et si $A \in M_{n,p}$ on a $\displaystyle\sum_{i=1}^{t} n_i = n$ et $\displaystyle\sum_{j=1}^{s} p_j = p$.

**Exemple.** Soit $X \in M_{m,1}(\mathbb{K})$ et $Y \in M_{p,1}(\mathbb{K})$. Alors $\begin{pmatrix} X \\ Y \end{pmatrix} \in M_{m+p,1}(\mathbb{K})$ et $(X, Y)$ n'a aucun sens.

**Manipulations.** On peut additionner des matrices par blocs (si les blocs sont compatibles) :

$$
\begin{pmatrix} A_{11} & A_{12} \\ A_{21} & A_{22} \end{pmatrix} + \lambda \begin{pmatrix} B_{11} & B_{12} \\ B_{21} & B_{22} \end{pmatrix} = \begin{pmatrix} A_{11} + \lambda B_{11} & \dots \\ \dots & \dots \end{pmatrix}
$$

On peut aussi les multiplier :

$$
\begin{pmatrix} A_{11} & A_{12} \\ A_{21} & A_{22} \end{pmatrix} \cdot \begin{pmatrix} B_{11} & B_{12} \\ B_{21} & B_{22} \end{pmatrix} = \begin{pmatrix} A_{11} B_{11} + A_{12} B_{21} & \dots \\ \dots & \dots \end{pmatrix}
$$

On peut aussi les transposer : si $A \in \mathcal{M}_{n,p}$ a pour coefficients les $(a_{ij})_{i=1,\dots,n;\, j=1,\dots,p}$, alors ${}^tA$ est une matrice de $\mathcal{M}_{pn}$, de coefficients $(a_{ji})$.
Pour une matrice par blocs :

$$
{}^t\begin{pmatrix} A_{11} & A_{12} \\ A_{21} & A_{22} \end{pmatrix} = \begin{pmatrix} {}^tA_{11} & {}^tA_{21} \\ {}^tA_{12} & {}^tA_{22} \end{pmatrix}
$$

### Matrices "creuses" et sev stables

**Définition 1.** Une matrice est dite triangulaire par blocs supérieurs si elle est de la forme $\begin{pmatrix} A_{11} & \cdots & A_{1n} \\ 0 & \dots & A_{nn} \end{pmatrix}$.

**Remarque.** Une matrice triangulaire est triangulaire par blocs (ils sont de taille 1) ; la réciproque est fausse.

**Définition 1 bis.** On définit de même les matrices diagonales par blocs ; elles sont de la forme $\begin{pmatrix} A_{11} & 0 \\ 0 & A_{nn} \end{pmatrix}$. Les blocs peuvent être de tailles différentes.

**Proposition 2.** Les matrices triangulaires par blocs supérieurs et inférieurs et diagonales sont 3 sous-ensembles stables par combinaison linéaire (ce sont des ev de $\mathcal{M}_n(\mathbb{K})$) qui sont stables par produit.

**Démonstration.** Par le calcul, identique aux preuves de stabilité pour les matrices triangulaires et diagonales.

$$
\begin{pmatrix} A_{11} & \dots & A_{1S} \\ \vdots & \ddots & \vdots \\ 0 & \dots & A_{SS} \end{pmatrix} \begin{pmatrix} B_{11} & \dots & B_{1S} \\ \vdots & \ddots & \dots \\ 0 & \dots & B_{SS} \end{pmatrix} = \begin{pmatrix} A_{11} B_{11} & A_{11} B_{12} + A_{12} B_{22} & \dots \\ 0 & A_{22} B_{22} & \dots \\ 0 & \dots & A_{SS} B_{SS} \end{pmatrix}
$$

$\square$

**Rappel.** $A$ est inversible si et seulement si $\exists B \in \mathcal{M}_n(\mathbb{K})$ tel que $AB = BA = I_n$. On note $B = A^{-1}$. On note $GL_n(\mathbb{K})$ l'ensemble des matrices inversibles.

**Proposition 3.** Soit $A$ une matrice diagonale par blocs ou triangulaire par blocs telle que les blocs diagonaux sont inversibles. Alors cette matrice est inversible ; de plus :

$$
\begin{pmatrix} A_{11} & \dots & 0 \\ \vdots & \ddots & \vdots \\ 0 & \dots & A_{SS} \end{pmatrix}^{-1} = \begin{pmatrix} A_{11}^{-1} & \dots & 0 \\ \vdots & \ddots & \vdots \\ 0 & \dots & A_{SS}^{-1} \end{pmatrix}
\quad \text{et} \quad
\begin{pmatrix} A_{11} & \dots & \dots \\ \vdots & \ddots & \vdots \\ 0 & \dots & A_{SS} \end{pmatrix}^{-1} = \begin{pmatrix} A_{11}^{-1} & \dots & \dots \\ \vdots & \ddots & \vdots \\ 0 & \dots & A_{SS}^{-1} \end{pmatrix}
$$

**Démonstration.** Pour les matrices diagonales on vérifie que

$$
\begin{pmatrix} A_{11} & \dots & 0 \\ \vdots & \ddots & \vdots \\ 0 & \dots & A_{SS} \end{pmatrix} \begin{pmatrix} A_{11}^{-1} & \dots & 0 \\ \vdots & \ddots & \vdots \\ 0 & \dots & A_{SS}^{-1} \end{pmatrix} = \begin{pmatrix} A_{11} A_{11}^{-1} & \dots & 0 \\ \vdots & \ddots & \vdots \\ 0 & \dots & A_{SS} A_{SS}^{-1} \end{pmatrix} = \begin{pmatrix} I_{n_1} & \dots & 0 \\ \vdots & \ddots & \vdots \\ 0 & \dots & I_{n_S} \end{pmatrix} = I_n
$$

La preuve pour les matrices triangulaires est plus dure. On verra une preuve rapide avec le déterminant. $\square$

**Définition 4.** Soit $U \in \mathcal{L}(E)$, et soit $F \subset E$ un sev de $E$. On dit que $F$ est stable par $U$ si $U(F) \subset F$. On a alors que $U_{|F}$, la restriction de $U$ à $F$, est un endomorphisme de $F$.

**Remarque.** $F$ stable par $U \Leftrightarrow \forall x \in F, u(x) \in F$.

**Notation.** Si $f : E \to F$ est une fonction, et si $A \subset E$ est un sous-ensemble de $E$, alors $f_{|A}$ désigne la restriction de $f$ à $A$. On la définit par $f_{|A} \begin{cases} A \to F \\ x \mapsto f(x) \end{cases}$.

**Proposition 5.** Pour que $F$ soit stable par $u$, il faut et il suffit qu'il existe une base $B = (e_1, \dots, e_n)$ telle que $(e_1, \dots, e_p)$ est une base de $F$ (donc $B$ est adaptée à $F$), telle que $Mat_B(u)$ est de la forme $\begin{pmatrix} A & B \\ 0 & C \end{pmatrix}$, où $A, B, C, 0$ sont des blocs.

**Démonstration.** Supposons $F$ stable par $U$. Soit $(e_1, \dots, e_p)$ une base de $F$, que l'on complète en une base $(e_1, \dots, e_p, \dots, e_n)$ de $E$. On décompose $u(e_i)$ dans la base : on sait que si $i \leq p$, $u(e_i) \in F$ (car $F$ est stable). Donc il existe des nombres $(a_{ij})_{j=1,\dots,p}$ tels que $u(e_i) = a_{1i} e_1 + \dots + a_{pi} e_p = a_{1i} e_1 + \dots + a_{pi} e_p + 0 e_{p+1} + \dots + 0 e_n$.
Ainsi, si $B = (e_1, \dots, e_n)$, la $i$-ème colonne de $Mat_B(u)$ est donnée par les coefficients de $u(e_i)$, dans $B$. Autrement dit, la $i$-ème colonne, pour $i \leq p$, est $\begin{pmatrix} a_{1i} & \dots & a_{pi} & 0 & \dots & 0 \end{pmatrix}$. Donc $Mat_B(u)$ est de la forme :

$$
\begin{pmatrix} a_{11} & \dots & a_{1p} & \dots \\ \vdots & & & \\ a_{p1} & \dots & a_{pp} & \dots \\ 0 & \dots & 0 & \dots \\ 0 & \dots & 0 & \dots \end{pmatrix}
$$

Supposons que $Mat_B(u)$ est de cette forme, où $B = (e_1, \dots, e_p, \dots, e_n)$. Soit $x \in F$. Alors $x$ s'écrit $x = \displaystyle\sum_{i=1}^{p} x_i e_i$, puisque $(e_1, \dots, e_p)$ est une base de $F$, où les $(x_i)$ sont des scalaires. On a alors $u(x) = \displaystyle\sum_{i=1}^{p} x_i u(e_i)$, or $u(e_i) = a_{1i} e_1 + \dots + a_{pi} e_p + 0 e_{p+1} + \dots + 0 e_n$, pour $i \leq p$. Donc $u(e_i) \in F$ pour $i \leq p$. Donc $u(x) \in F$. $\square$

**Remarque.** $A$ est en fait $Mat_{e_1, \dots, e_p}(U_{|F})$.

**Proposition 5 bis.** Soient $(E_i)_{i=1,\dots,s}$ des sev stables par $u$, tels que $E = \displaystyle\bigoplus_{i=1}^{s} E_i$. Alors dans une base adaptée à cette somme, la matrice de $u$ est diagonale par blocs. De plus, si les $(B_i)$ sont les bases des $E_i$, et que $B = \bigcup_{i=1}^{S} B_i$, alors $Mat_B(u) = \begin{pmatrix} A_1 & 0 \\ 0 & A_s \end{pmatrix}$, où $A_i = Mat_{B_i}(u_{|E_i})$.

**Démonstration.** Adaptée de la proposition 5. $\square$

**Exemple.** Soit $u : \begin{cases} \mathbb{R}^3 \to \mathbb{R}^3 \\ (x, y, z) \mapsto (-y, x, z) \end{cases}$. Soit $B = (e_1, e_2, e_3)$ la base canonique de $\mathbb{R}^3$. Alors $Mat_B(u) = \begin{pmatrix} 0 & -1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix}$. Donc $\text{Vect}(e_1, e_2)$ et $\text{Vect}(e_3)$ sont stables, et $U$ restreint à $E_1$ a pour matrice $\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$. En effet $E_1 = (Oxy)$ et $E_2 = (Oz)$ sont bien stables par cette relation.
