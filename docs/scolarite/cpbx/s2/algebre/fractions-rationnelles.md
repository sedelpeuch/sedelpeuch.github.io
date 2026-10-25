---
title: "Fractions rationnelles"
description: "Fractions rationnelles : définition comme classes d'équivalence, opérations, corps K(X), degré, partie entière, théorème de décomposition en éléments simples dans C(X) et R(X), partie polaire et calcul des coefficients."
sidebar_position: 2
---

## Définitions et généralités

C'est un quotient de polynômes : $R(X) = \dfrac{A(X)}{B(X)}$. Mais il faut définir cette notion (car il n'y a pas de division dans $\mathbb{K}[X]$).

**Définition (informelle).** Si $A, B, C, D \in \mathbb{K}[X]$ avec $B \neq 0$, $D \neq 0$, on dit que les objets $\dfrac{A(X)}{B(X)}$ et $\dfrac{C(X)}{D(X)}$ sont égaux si et seulement si on a $A(X)D(X) - B(X)C(X) = 0$. Cela définit ces objets qu'on appelle **fractions rationnelles**.

**Définition (formelle).** Les fractions sont les classes d'équivalence dans $\mathbb{K}[X] \times \mathbb{K}[X]^*$ pour la relation d'équivalence $(A, B) \sim (C, D) \Leftrightarrow AD - CB = 0$. On note $\dfrac{A}{B}$ la classe d'équivalence de $(A, B)$.

On note $\mathbb{K}(X)$ l'ensemble des fractions rationnelles sur $\mathbb{K}$. On identifie le polynôme $A \in \mathbb{K}[X]$ avec la fraction $\dfrac{A}{1}$ (on va avoir que les opérations dans $\mathbb{K}[X]$ sur les $A$ sont compatibles avec les opérations à définir dans $\mathbb{K}(X)$ sur les $\dfrac{A}{1}$). Donc $\mathbb{K}[X] \subset \mathbb{K}(X)$.

**Nota bene.** $\dfrac{A}{1} = \dfrac{B}{1} \Leftrightarrow A \cdot 1 - B \cdot 1 = 0 \Leftrightarrow A = B$, donc $A \to \dfrac{A}{1}$ est injective.

**Définition : addition dans $\mathbb{K}(X)$.**

$$
\frac{A}{B} + \frac{C}{D} \overset{\text{def}}{=} \frac{AD + BC}{BD}
$$

***Démonstration.*** Si $\dfrac{A}{B} = \dfrac{A'}{B'}$ et $\dfrac{C}{D} = \dfrac{C'}{D'}$, a-t-on $\dfrac{A'D' + B'C'}{B'D'} = \dfrac{AD + BC}{BD}$ ? Autrement dit, a-t-on $\dfrac{A}{B} + \dfrac{C}{D} = \dfrac{A'}{B'} + \dfrac{C'}{D'}$ ? Autrement dit : la somme des fractions est-elle bien indépendante du représentant $\dfrac{A}{B}$ ou $\dfrac{A'}{B'}$, $\dfrac{C}{D}$ ou $\dfrac{C'}{D'}$ ? La réponse est oui car :

$$
\begin{aligned}
&\frac{A}{B} = \frac{A'}{B'} \Leftrightarrow AB' = A'B \\
&\frac{C}{D} = \frac{C'}{D'} \Leftrightarrow CD' = C'D
\end{aligned}
$$

Et alors

$$
\begin{aligned}
&\frac{A'}{B'} + \frac{C'}{D'} = \frac{A}{B} + \frac{C}{D} \Leftrightarrow \frac{A'D' + B'C'}{B'D'} = \frac{AD + BC}{BD} \\
\Leftrightarrow\ &(A'D' + B'C')BD = (AD + BC)B'D' \Leftrightarrow A'D'BD + B'C'BD = ADB'D' + BCB'D' \\
\Leftrightarrow\ &AB'D'D + CD'BB' = AB'DD' + CD'BB'
\end{aligned}
$$

**Définition : produit dans $\mathbb{K}(X)$.**

$$
\frac{A}{B}\frac{C}{D} \overset{\text{def}}{=} \frac{AC}{BD}
$$

***Démonstration.*** Si $\dfrac{A}{B} = \dfrac{A'}{B'}$ et $\dfrac{C}{D} = \dfrac{C'}{D'}$, a-t-on $\dfrac{AC}{BD} = \dfrac{A'C'}{B'D'}$ ? Oui car $\dfrac{AC}{BD} = \dfrac{A'C'}{B'D'} \Leftrightarrow ACB'D' = A'C'BD$, or $\dfrac{A}{B} = \dfrac{A'}{B'} \Leftrightarrow AB' = BA'$ et $\dfrac{C}{D} = \dfrac{C'}{D'} \Leftrightarrow CD' = C'D$. Donc $\dfrac{AC}{BD} = \dfrac{A'C'}{B'D'} \Leftrightarrow AB'C'D = AB'C'D$.

**Remarques : compatibilité avec l'identification $A = \dfrac{A}{1}$.** $\dfrac{A}{1} + \dfrac{B}{1} = \dfrac{A1 + B1}{1} = \dfrac{A + B}{1}$ et $\dfrac{A}{1}\dfrac{B}{1} = \dfrac{AB}{1} = AB$.

**Définition (division ou quotient dans $\mathbb{K}(X)$).** Avec $C \neq 0$ :

$$
\frac{\dfrac{A}{B}}{\dfrac{C}{D}} \overset{\text{def}}{=} \frac{AD}{BC}
$$

***Démonstration.*** Si $\dfrac{A}{B} = \dfrac{A'}{B'}$ et $\dfrac{C}{D} = \dfrac{C'}{D'}$, autrement dit si $AB' = A'B$ et $CD' = C'D$, alors

$$
\frac{\dfrac{A'}{B'}}{\dfrac{C'}{D'}} = \frac{\dfrac{A}{B}}{\dfrac{C}{D}} \Leftrightarrow \frac{A'D'}{B'C'} = \frac{AD}{BC} \Leftrightarrow A'D'BC = ADB'C' \Leftrightarrow A'BDC' = A'BDC'
$$

**Remarque : compatibilité avec l'identification $A = \dfrac{A}{1}$.**

$$
\frac{\dfrac{A}{1}}{\dfrac{C}{1}} = \frac{A \cdot 1}{C \cdot 1} = \frac{A}{C}
$$

**Proposition.** $(\mathbb{K}(X), +, \times)$ est un anneau unitaire, intègre et commutatif (comme $(\mathbb{K}[X], +, \times)$). Et ainsi $(\mathbb{K}(X), +, \times)$ est un **corps commutatif**. Ainsi $\mathbb{K}(X)$ est le corps des quotients de $\mathbb{K}[X]$.

**Définition.** Degré d'une fraction rationnelle : soient $A, B \in \mathbb{K}[X]$, $B \neq 0$. On a $\deg\left(\dfrac{A}{B}\right) = \deg(A) - \deg(B)$.

**Corollaire.** Si $\dfrac{A}{B} = \dfrac{A'}{B'}$, alors $AB' = A'B$, donc $\deg(AB') = \deg(A'B)$, donc $\deg(A) + \deg(B') = \deg(A') + \deg(B)$, donc $\deg(A') - \deg(B') = \deg(A) - \deg(B)$ et donc $\deg\left(\dfrac{A'}{B'}\right) = \deg\left(\dfrac{A}{B}\right)$.

**Proposition.** Soient $F, F' \in \mathbb{K}(X)$ :

1. $\deg(FF') = \deg(F) + \deg(F')$
2. $\deg(F + F') \leq \max\{\deg(F), \deg(F')\}$

***Démonstration.***

1. $F = \dfrac{A}{B}$, $F' = \dfrac{A'}{B'}$ :

   $$
   \deg(FF') = \deg\left(\frac{AA'}{BB'}\right) = \deg(AA') - \deg(BB') = \deg(A) + \deg(A') - \deg(B') - \deg(B) = \deg(A) - \deg(B) + \deg(A') - \deg(B') = \deg(F) + \deg(F')
   $$

2. De même :

   $$
   \begin{aligned}
   \deg(F + F') &= \deg\left(\frac{A}{B} + \frac{A'}{B'}\right) = \deg\left(\frac{AB' + A'B}{BB'}\right) \\
   &= \deg(AB' + A'B) - \deg(BB') \leq \max\{\deg(AB'), \deg(A'B)\} - \deg(B) - \deg(B') \leq \max\{\deg(F), \deg(F')\}
   \end{aligned}
   $$

## Théorème de décomposition des fractions rationnelles en éléments simples

Maintenant, on peut se diriger vers le théorème de décomposition des fractions rationnelles en éléments simples.

**Lemme 1.** Soit $F \in \mathbb{K}(X)$. Il existe un **unique** polynôme $E \in \mathbb{K}[X]$ (appelé partie entière de $F$) et une **unique** fraction $R \in \mathbb{K}(X)$ tels que $F = E + R$ et $\deg(R) < 0$.

***Démonstration.*** Posons $F = \dfrac{A}{B}$ où $A, B \in \mathbb{K}[X]$, $B \neq 0$.

**Existence.** Division euclidienne de $A$ par $B$ : $A = QB + S$, $\deg(S) < \deg(B)$. Donc $F = \dfrac{A}{B} = Q + \dfrac{S}{B}$ où $\deg\left(\dfrac{S}{B}\right) = \deg(S) - \deg(B) < 0$. Donc on peut prendre $E = Q$ et $R = \dfrac{S}{B}$.

**Unicité.** Si $F = E + R = E' + R'$ où $E, E' \in \mathbb{K}[X]$, $\deg(R) < 0$, $\deg(R') < 0$, alors $E - E' = R' - R$, d'où $\deg(E - E') = \deg(R' - R) \leq \max(\deg(R'), \deg(-R)) < 0$, donc $E = E'$.

**Lemme 2.** Soit $F = \dfrac{A}{B_1 B_2} \in \mathbb{K}(X)$ avec $\deg(F) < 0$ ($A, B_1, B_2 \in \mathbb{K}[X]$, $B_1$ et $B_2$ premiers entre eux). Il existe une **unique** décomposition telle que $F = \dfrac{A_1}{B_1} + \dfrac{A_2}{B_2}$ avec $\deg\left(\dfrac{A_1}{B_1}\right) < 0$ et $\deg\left(\dfrac{A_2}{B_2}\right) < 0$, avec $(A_1, A_2 \in \mathbb{K}[X])$.

***Démonstration.***

**Existence.** Bézout $\Rightarrow \exists U_1, U_2 \in \mathbb{K}[X]$ tels que $U_1 B_1 + U_2 B_2 = 1$. Alors

$$
\frac{A}{B_1 B_2} = \frac{A(U_1 B_1 + U_2 B_2)}{B_1 B_2} = \frac{AU_2}{B_1} + \frac{AU_1}{B_2}
$$

Rien ne garantit que $\deg\left(\dfrac{AU_2}{B_1}\right) < 0$ (i.e. que $\deg(AU_2) < \deg(B_1)$). Faisons la division euclidienne : $AU_2 = QB_1 + R_1$, $\deg(R_1) < \deg(B_1)$. Alors

$$
\frac{A}{B_1 B_2} = \frac{AU_2}{B_1} + \frac{AU_1}{B_2} = \frac{R_1}{B_1} + Q + \frac{AU_1}{B_2} = \frac{R_1}{B_1} + \frac{R_2}{B_2} \quad \text{où } R_2 = AU_1 + QB_2
$$

et $\deg\left(\dfrac{R_1}{B_1}\right) < 0$ et $\deg\left(\dfrac{R_2}{B_2}\right) = \deg\left(F - \dfrac{R_1}{B_1}\right) \leq \max\left(\deg(F), \deg\left(\dfrac{-R_1}{B_1}\right)\right) < 0$. On peut donc prendre $A_1 = R_1$, $A_2 = R_2$.

**Unicité.** Supposons que $F = \dfrac{A_1}{B_1} + \dfrac{A_2}{B_2} = \dfrac{A'_1}{B_1} + \dfrac{A'_2}{B_2}$ avec $\begin{cases} \deg(A_i) < \deg(B_i) \\ \deg(A'_i) < \deg(B_i) \end{cases}$. Alors

$$
\frac{A_1 - A'_1}{B_1} = \frac{A'_2 - A_2}{B_2} \Rightarrow (A_1 - A'_1)B_2 = (A'_2 - A_2)B_1
$$

(égalité dans $\mathbb{K}[X]$). Mais $B_1, B_2$ sont premiers entre eux, donc (Gauss) $B_1 \mid A_1 - A'_1$ et donc $A_1 - A'_1 = QB_1$, d'où $\deg(A_1 - A'_1) = \deg(Q) + \deg(B_1)$. Or, par hypothèse, $\deg(A_1 - A'_1) \leq \max\{\deg(A_1), \deg(A'_1)\} < \deg(B_1)$. On a donc $\deg(A_1 - A'_1) = \deg(Q) + \deg(B_1) < \deg(B_1)$, donc $\deg(Q) < 0$, donc $Q = 0$ et donc $A_1 - A'_1 = 0$. Et donc $\dfrac{A'_2 - A_2}{B_2} = \dfrac{A_1 - A'_1}{B_1} = 0$, d'où l'unicité ($A'_1 = A_1$, $A'_2 = A_2$).

**Lemme 3.** Soit $F = \dfrac{A}{B^n}$ ($A, B \in \mathbb{K}[X]$, $n \in \mathbb{N}^*$), avec $\deg(F) < 0$. Il **existe** une décomposition **unique** de la forme :

$$
F = \sum_{j=1}^{n} \frac{A_j}{B^j} \quad \text{où } A_j \in \mathbb{K}[X], \deg(A_j) < \deg(B)
$$

**Preuve par récurrence sur $n$.**

**Initialisation.** Si $n = 1$ : $F = \dfrac{A}{B}$ avec $\deg(F) < 0$, donc $\deg(A) < \deg(B)$ : on a $A_1 = A$ et il y a évidemment unicité : $\dfrac{A'_1}{B} = F \Rightarrow \dfrac{A'_1}{B} = \dfrac{A}{B} \Rightarrow A'_1 = A = A_1$.

**Hérédité.** Supposons le résultat (existence et unicité) acquis pour $n$. Montrons qu'il subsiste pour $n + 1$. Soit donc $F = \dfrac{A}{B^{n+1}}$, $\deg(F) < 0$. Faisons la division euclidienne $A = BQ + R$, $\deg(R) < \deg(B)$, donc $F = \dfrac{R}{B^{n+1}} + \dfrac{Q}{B^n}$ où $\deg(R) < \deg(B)$.

Et cette décomposition est unique car $F = \dfrac{R'}{B^{n+1}} + \dfrac{Q'}{B^n} = \dfrac{R' + Q'B}{B^{n+1}} \Rightarrow R' + Q'B = A$, et la condition $\deg(R') < \deg(B)$ implique que $R'$ est le reste de la division euclidienne de $A$ par $B$ et $Q'$ le quotient (unicité de la division euclidienne). On a donc, d'une façon unique, $F = \dfrac{R}{B^{n+1}} + \dfrac{Q}{B^n}$ avec $\deg(R) < \deg(B)$. Noter que $\deg\left(\dfrac{Q}{B^n}\right) = \deg\left(F - \dfrac{R}{B^{n+1}}\right) < 0$.

Or l'hypothèse de récurrence garantit l'existence et l'unicité de la décomposition $\dfrac{Q}{B^n} = \displaystyle\sum_{j=1}^{n} \frac{Q_j}{B^j}$ où $Q_j \in \mathbb{K}[X]$, $\deg(Q_j) < \deg(B)$. On a donc bien la décomposition unique $F = \displaystyle\sum_{j=1}^{n+1} \frac{A_j}{B^j}$ avec $A_j = Q_j$ ($1 \leq j \leq n$) et $A_{n+1} = R$.

**Théorème de décomposition en éléments simples dans $\mathbb{K}(X)$.** Soit $F \in \mathbb{K}(X)$ : $F = \dfrac{A}{B}$ où $A, B \in \mathbb{K}[X]$, $B \neq 0$. Il **existe** une **unique** décomposition :

$$
F = E + \sum_{i=1}^{n} \sum_{j=1}^{n_i} \frac{A_{ij}}{P_i^j} \quad \text{où } B = cd(B)\prod_{i=1}^{n} P_i^{n_i}
$$

est la décomposition de $B$ en facteurs irréductibles unitaires, et $A_{ij} \in \mathbb{K}[X]$, $\deg(A_{ij}) < \deg(P_i)$ ($1 \leq j \leq n_i$), et $E \in \mathbb{K}[X]$ (partie entière de $F$).

***Démonstration.*** On applique les lemmes 1, 2, 3 : le lemme 1 donne $E$ (quotient de la division euclidienne de $A$ par $B$). Le lemme 2 donne ensuite une décomposition de $F - E$ sous la forme $\displaystyle\sum_{i=1}^{n} \frac{A'_i}{P_i^{n_i}}$, et le lemme 3 décompose chacune de ces fractions comme dans le théorème.

**Corollaire dans $\mathbb{C}$.** Soit $F = \dfrac{A}{B} \in \mathbb{C}(X)$, $B = cd(B)\displaystyle\prod_{i=1}^{n}(X - a_i)^{n_i}$ (décomposition de $B$ en facteurs irréductibles unitaires, cf. le théorème de d'Alembert). Alors il existe une unique décomposition :

$$
F = E + \sum_{i=1}^{n} \sum_{j=1}^{n_i} \frac{\lambda_{ij}}{(X - a_i)^j} \quad \text{où } \lambda_{ij} \in \mathbb{C}
$$

***Démonstration.*** En effet, a priori (théorème ci-dessus), $\lambda_{ij} \in \mathbb{C}[X]$, mais $\deg(\lambda_{ij}) < \deg(X - a_i)$, donc en fait les $\lambda_{ij}$ sont des constantes.

**Corollaire dans $\mathbb{R}$.** Soit $F = \dfrac{A}{B} \in \mathbb{R}(X)$, $B = cd(B)\displaystyle\prod_{i=1}^{n}(X - a_i)^{n_i}\prod_{k=1}^{m}(X^2 + b_k X + c_k)^{m_k}$. La décomposition de $B$ est en fait en facteurs irréductibles unitaires dans $\mathbb{R}[X]$. Alors il existe une unique décomposition :

$$
F = E + \sum_{i=1}^{n} \sum_{j=1}^{n_i} \frac{\lambda_{ij}}{(X - a_i)^j} + \sum_{k=1}^{m} \sum_{j=1}^{m_k} \frac{\mu_{kj}X + \nu_{kj}}{(X^2 + b_k X + c_k)^j} \quad \text{où } \lambda_{ij}, \mu_{kj}, \nu_{kj} \in \mathbb{R}
$$

## Partie polaire

**Définition de la partie polaire.** Soit $F = \dfrac{A}{B} \in \mathbb{K}(X)$ ; si $a \in \mathbb{K}$ est une racine de $B$ (qui ne soit pas racine de $A$) d'ordre $m$, on dit que $a$ est un **pôle** de $F$ d'ordre $m$. Alors la décomposition en éléments simples de $F$ s'écrit :

$$
F(X) = \sum_{j=1}^{m} \frac{a_j}{(X - a)^j} + R(X)
$$

où $R(X) \in \mathbb{K}(X)$ est une fraction dont $a$ n'est pas un pôle ; la somme $\displaystyle\sum_{j=1}^{m} \frac{a_j}{(X - a)^j}$ est la partie polaire relative au pôle $a$ de la décomposition de $F$ en éléments simples.

**Exemple.** $F(X) = \dfrac{1}{X(X + 1)} = \dfrac{1}{X} - \dfrac{1}{X + 1}$. On a $\dfrac{1}{X}$ partie polaire relative au pôle $0$ et $-\dfrac{1}{X + 1}$ la partie polaire relative au pôle $-1$.

**Proposition.** Soient $F \in \mathbb{K}(X)$, $a \in \mathbb{K}$ un pôle de $F$ d'ordre $m$ : $F(X) = \displaystyle\sum_{j=1}^{m} \frac{a_j}{(X - a)^j} + R(X)$. Alors :

$$
a_j = \frac{1}{(m - j)!}\frac{d^{m-j}}{dX^{m-j}}\left((X - a)^m F(X)\right)\Big|_{X = a}
$$

***Démonstration.*** $(X - a)^m F(X) = \displaystyle\sum_{j=1}^{m} a_j (X - a)^{m-j} + (X - a)^m R(X)$. Dérivons $m - j$ fois $(X - a)^m R(X)$ (Leibniz) :

$$
\frac{d^{m-j}}{dX^{m-j}}\left((X - a)^m R(X)\right) = \sum_{p=0}^{m-j} \binom{m-j}{p} \left((X - a)^m\right)^{(p)} R^{(m-j-p)}(X) = \sum_{p=0}^{m-j} \binom{m-j}{p} \frac{m!}{(m-p)!}(X - a)^{m-p} R^{(m-j-p)}(X)
$$

Or $1 \leq m - j \leq m - 1 \Rightarrow m - p \geq 1$, donc $\dfrac{d^{m-j}}{dX^{m-j}}\left((X - a)^m R(X)\right)\Big|_{X = a} = 0$. Et donc

$$
\frac{1}{(m - j)!}\left(\frac{d}{dX}\right)^{m-j}\left((X - a)^m F(X)\right)\Big|_{X = a} = \frac{1}{(m - j)!}\left(\frac{d}{dX}\right)^{m-j}\left(\sum_{k=1}^{m} a_k (X - a)^{m-k}\right)\Big|_{X = a} = a_j \quad \text{(Taylor)}
$$

**Exemple.**

$$
F(X) = \frac{1}{X^2(X - 1)^3} = \frac{a}{X^2} + \frac{b}{X} + \frac{c}{(X - 1)^3} + \frac{d}{(X - 1)^2} + \frac{e}{X - 1}
$$

$$
\begin{aligned}
a &= X^2 F(X)\big|_{X=0} = \frac{1}{(X - 1)^3}\Big|_{X=0} = -1 \\
b &= \frac{1}{1!}\frac{d}{dX}(X^2 F(X))\Big|_{X=0} = \left(\frac{1}{(X - 1)^3}\right)'\Big|_{X=0} = -\frac{3}{(X - 1)^4}\Big|_{X=0} = -3 \\
c &= (X - 1)^3 F(X)\big|_{X=1} = \frac{1}{X^2}\Big|_{X=1} = 1 \\
d &= \frac{d}{dX}((X - 1)^3 F(X))\Big|_{X=1} = \frac{-2}{X^3}\Big|_{X=1} = -2 \\
e &= \frac{1}{2}\frac{d^2}{dX^2}((X - 1)^3 F(X))\Big|_{X=1} = \frac{1}{2}\left(-\frac{2}{X^3}\right)'\Big|_{X=1} = \frac{3}{X^4}\Big|_{X=1} = 3
\end{aligned}
$$

Ainsi

$$
F(X) = \frac{1}{X^2(X - 1)^3} = \frac{-1}{X^2} - \frac{3}{X} + \frac{1}{(X - 1)^3} - \frac{2}{(X - 1)^2} + \frac{3}{X - 1}
$$

**Remarque.** Avant de se lancer dans la décomposition en éléments simples d'une fraction rationnelle $F(X) = \dfrac{A(X)}{B(X)}$, on a intérêt à simplifier la fraction (s'il y a lieu), c'est-à-dire à supprimer les facteurs communs à $A$ et $B$.

S'il y a des facteurs irréductibles du second degré dans $B(X)$ ($\in \mathbb{R}[X]$), il n'y a pas de formule simple analogue à celle d'une partie polaire pour la partie correspondante de la décomposition en éléments simples (voir TD).
