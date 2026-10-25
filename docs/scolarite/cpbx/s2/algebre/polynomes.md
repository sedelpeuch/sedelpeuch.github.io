---
title: "Polynômes"
description: "Polynômes : polynôme formel, anneau K[X], degré, division euclidienne, PGCD, PPCM, algorithme d'Euclide, Bézout, lemme de Gauss, formule de Taylor, racines, polynômes irréductibles, décomposition en facteurs irréductibles et formules de Viète."
sidebar_position: 1
---

## Polynôme formel

**Définition.** Soit $\mathbb{K}$ un corps ($\mathbb{R}$ ou $\mathbb{C}$). On appelle polynôme (formel) sur $\mathbb{K}$, en une indéterminée $X$, toute expression formelle de la forme $\displaystyle\sum_{k \geq 0} a_k X^k$ où $a_k \in \mathbb{K}$ ($k \in \mathbb{N}$), tous nuls pour $k$ assez grand, avec les règles de manipulation suivantes :

- Additions : $\displaystyle\sum_{k \geq 0} a_k X^k + \sum_{k \geq 0} b_k X^k = \sum_{k \geq 0} (a_k + b_k) X^k$
- Produits : $\lambda \in \mathbb{K} \Rightarrow \lambda \displaystyle\sum_{k \geq 0} a_k X^k = \sum_{k \geq 0} \lambda a_k X^k$
- Produits de polynômes : $\displaystyle\sum_{k \geq 0} a_k X^k \cdot \sum_{k \geq 0} b_k X^k = \sum_{k \geq 0} c_k X^k$ où $c_k = \displaystyle\sum_{j=0}^{k} a_j b_{k-j}$

***Démonstration.*** $\displaystyle\sum_{k \geq 0} a_k X^k \cdot \sum_{l \geq 0} b_l X^l = \sum_{k \geq 0} \sum_{l \geq 0} a_k b_l X^{k+l} = \sum_{m \geq 0} \sum_{k=0}^{m} a_k b_{m-k} X^m$ où $m = l + k$.

**Remarques.**

- On identifie $X^0$ au nombre $1 \in \mathbb{K}$. Donc le polynôme $a_0 X^0$ est identifié au nombre $a_0 \in \mathbb{K}$ : $a_0 X^0 = a_0$.
- On note $X = X^1$.
- On note $0$ le polynôme $\displaystyle\sum_{k \geq 0} 0 X^k$ (« polynôme nul »).
- La règle de multiplication des polynômes montre que $X^i X^j = X^{i+j}$ et $X^i = X \cdot X \dots X$.

## Anneau commutatif unitaire

**Proposition et définition.** Soit $\mathbb{K}[X]$ l'ensemble des polynômes sur $\mathbb{K}$ de l'indéterminée $X$. Alors $\mathbb{K}[X]$ est un anneau commutatif unitaire (ou unifère) intègre :

- $(\mathbb{K}[X], +)$ est un groupe commutatif, i.e. :
  - l'addition est associative : $\forall A, B, C \in \mathbb{K}[X]$ : $A + (B + C) = (A + B) + C$ ;
  - il existe un élément neutre pour l'addition, à savoir le polynôme nul : $\forall A \in \mathbb{K}[X]$, $A + 0 = 0 + A = A$ ;
  - il existe un opposé : pour tout $A \in \mathbb{K}[X]$, il existe un opposé, $-A$.
- L'anneau $(\mathbb{K}[X], +, \times)$ est commutatif, i.e. le produit est commutatif : $AB = BA$.
- L'anneau $(\mathbb{K}[X], +, \times)$ est unitaire (ou unifère), i.e. il existe un élément neutre pour $\times$, appelé polynôme unité (qui est en fait $X^0 = 1$) : $1A = A1 = A$ ($\forall A \in \mathbb{K}[X]$).
- L'anneau $\mathbb{K}[X]$ est intègre, i.e. $AB = 0 \Rightarrow A = 0$ ou $B = 0$.

**Preuve de l'intégrité.** Soient $A = \displaystyle\sum_{k \geq 0} a_k X^k$, $B = \sum_{k \geq 0} b_k X^k$ deux polynômes non nuls. Soient $k_A$ et $k_B$ les plus grands $k$ tels que $a_k \neq 0$ et $b_k \neq 0$. On a donc $A = a_0 X^0 + \dots + a_{k_A} X^{k_A}$ et $B = b_0 X^0 + \dots + b_{k_B} X^{k_B}$. Ainsi $AB = a_0 b_0 X^0 + \dots + a_{k_A} b_{k_B} X^{k_A + k_B} \neq 0$.

Si on appelle degré de $a_i X^i$ le nombre $i$, on peut écrire $A = a_{k_A} X^{k_A}$ + termes de degrés $< k_A$, $B = b_{k_B} X^{k_B}$ + termes de degrés $< k_B$, et $AB = a_{k_A} b_{k_B} X^{k_A + k_B}$ + termes de degrés $< k_A + k_B$.

## Précisions sur le degré

**Définition.**

- $\deg(a_i X^i) = i$ si $a_i \neq 0$ (définition du degré d'un monôme normal, i.e. d'un polynôme de la forme $a_i X^i$, $a_i \neq 0$).
- $A \neq 0$ : $A = a_0 X^0 + a_1 X^1 + \dots + a_d X^d$ avec $d$ le plus grand $k$ tel que $a_k \neq 0$. Alors le degré de $A$ est $d$.

**Proposition.** Soient $A, B$ deux polynômes $\neq 0$, alors :

- $\deg(AB) = \deg(A) + \deg(B)$
- $\deg(A + B) \leq \max(\deg(A), \deg(B))$
- Si $\deg(A) = \deg(B)$, notant $A = cd(A)X^{\deg(A)}$ + monômes de degrés moindres et $B = cd(B)X^{\deg(B)}$ + monômes de degrés moindres, où $\deg(A) = \deg(B)$, et en notant $cd$ le coefficient dominant, on a donc :
  - si $cd(A) + cd(B) \neq 0$, alors $\deg(A + B) = \deg(A) = \deg(B)$ ;
  - si $cd(A) + cd(B) = 0$, alors $\deg(A + B) < \deg(A) = \deg(B)$.

***Démonstration.***

- On l'a fait en justifiant que $\mathbb{K}[X]$ est intègre : $A = cd(A)X^{\deg(A)}$ + monômes de degrés moindres et $B = cd(B)X^{\deg(B)}$ + monômes de degrés moindres. D'où $AB = cd(A)cd(B)X^{\deg(A) + \deg(B)}$ + …, donc

  $$
  \deg(AB) = \deg(A) + \deg(B)
  $$

- $A + B = cd(A)X^{\deg(A)}$ + termes de degrés $< \deg(A)$ + $cd(B)X^{\deg(B)}$ + termes de degrés $< \deg(B)$. Donc si $\deg(B) < \deg(A)$ : $A + B = cd(A)X^{\deg(A)}$ + termes de degrés $< \deg(A)$, donc $\deg(A + B) = \deg(A) = \max(\deg(A), \deg(B))$.

**Définition.**

$$
\deg(0) = -\infty
$$

***Démonstration.*** On veut que la proposition précédente reste vraie pour le polynôme nul :

$$
\begin{aligned}
&\deg(0) = \deg(0A) = \deg(0) + \deg(A), \forall \deg(A) \in \mathbb{N} \ (A \neq 0) \\
&\text{Donc } \deg(0) = \pm\infty \\
&\text{De plus } \deg(0 + A) = \max(\deg(0), \deg(A)), \forall A \neq 0 \\
&\text{Donc } \deg(0) \leq \deg(A), \forall \deg(A) \in \mathbb{N} : \text{donc } \deg(0) \leq 0 \\
&\text{Donc } \deg(0) = -\infty
\end{aligned}
$$

Et on vérifie qu'on a bien $\deg(0 \times 0) = -\infty = \deg(0) + \deg(0)$ et $\deg(0 + 0) = -\infty = \max(\deg(0), \deg(0))$. La proposition reste vraie si l'un des polynômes est nul, même si les deux le sont.

## Division euclidienne

**Proposition et définition.** Soient $A, B \in \mathbb{K}[X]$ avec $B \neq 0$. Alors il existe un unique couple $(Q, R) \in \mathbb{K}[X] \times \mathbb{K}[X]$ tel que $A = BQ + R$ et $\deg(R) < \deg(B)$. C'est la division euclidienne de $A$ par $B$ : $Q$ est le quotient, $R$ est le reste.

***Démonstration.***

**Existence.** Il existe un polynôme $Q$ tel que $\deg(A - BQ) = \min(\deg(A - BS) : S \in \mathbb{K}[X])$. Posons $R = A - BQ$ et prouvons que $\deg(R) < \deg(B)$, i.e. $\deg(A - BQ) < \deg(B)$. Supposons que $\deg(A - BQ) \geq \deg(B)$.

Écrivons $B = b_d X^d$ + monômes de degrés moindres $(\alpha)$, où $d = \deg(B)$ ($b_d \neq 0$) : donc $b_d = cd(B)$, et $A - BQ = u_{d+m}X^{d+m} + \alpha$ où $m \geq 0$ et $u_{d+m} = cd(A - BQ) \neq 0$ car $\deg(A - BQ) \geq d$. Alors :

$$
\begin{aligned}
A - BQ - \frac{u_{d+m}}{b_d}X^m B &= A - BQ - \frac{u_{d+m}}{b_d}X^m(b_d X^d + \alpha_{< d}) = u_{d+m}X^{d+m} + \alpha_{< (d+m)} - \frac{u_{d+m}}{b_d}b_d X^{m+d} + \alpha_{< (d+m)} \\
&= \alpha_{< (d+m)}, \quad \text{avec } d + m = \deg(A - BQ)
\end{aligned}
$$

et donc

$$
\deg\Big(\underbrace{A - BQ - \frac{u_{d+m}}{b_d}X^m B}_{A - BQ'}\Big) < \deg(A - BQ)
$$

où $Q' = Q + \dfrac{u_{d+m}}{b_d}X^m = Q + \dfrac{u_{d+m}X^{d+m}}{b_d X^d} = Q + \dfrac{td(A - BQ)}{td(B)}$, où $td$ est le terme dominant.

Ainsi il existe un polynôme $Q'$ tel que $\deg(A - BQ') < \deg(A - BQ)$, ce qui contredit le choix de $Q$ ($\deg(A - BQ)$ minimal !). Cela prouve, par l'absurde, qu'on n'a pas $\deg(A - BQ) \geq \deg(B)$ et donc que $\deg(A - BQ) < \deg(B)$.

**Unicité.** Supposons que $A = BQ + R$, $\deg(R) < \deg(B)$ et $A = BQ' + R'$, $\deg(R') < \deg(B)$. Alors $BQ + R = BQ' + R'$, donc $B(Q - Q') = R' - R$ et donc $\deg(B(Q - Q')) = \deg(R' - R)$, d'où

$$
\deg(B) + \deg(Q - Q') = \deg(R' - R) \leq \max(\deg(R'), \deg(-R)) < \deg(B) \Rightarrow \deg(Q - Q') < 0 \Rightarrow Q - Q' = 0 \Rightarrow Q' = Q
$$

Et alors $BQ + R = BQ' + R' = BQ + R' \Rightarrow R' = R$.

**Algorithme de division euclidienne.**

- Entrée : $Q = 0$, $R = A$.
- Boucle : tant que $\deg(R) \geq \deg(B)$, faire $Q = Q + \dfrac{td(R)}{td(B)}$ et $R = R - \dfrac{td(R)}{td(B)}B$.
- Sortie : si $\deg(R) < \deg(B)$, sortir $(Q, R)$.

À chaque itération dans la boucle, $\deg(R)$ diminue strictement car

$$
\begin{aligned}
R - \frac{td(R)}{td(B)}B &= cd(R)X^{\deg(R)} + \text{monômes de degrés} < \deg(R) - \frac{cd(R)X^{\deg(R)}}{cd(B)X^{\deg(B)}}\left(cd(B)X^{\deg(B)} + \text{monômes de degrés} < \deg(B)\right) \\
&= \left(cd(R)X^{\deg(R)} + \text{monômes de degrés} < \deg(R)\right) - \left(cd(R)X^{\deg(R)} + \text{monômes de degrés} < \deg(B) + \deg(R) - \deg(B)\right) \\
&= \text{somme de monômes de degrés} < \deg(R)
\end{aligned}
$$

Donc l'algorithme se termine après un nombre fini d'itérations ($\leq \deg(A) + 1$).

## Plus grand commun diviseur

**Proposition et définition.** Soient $A, B$ deux polynômes de $\mathbb{K}[X]$ non tous deux nuls. Il existe un unique polynôme $D$ **unitaire** (i.e. $cd(D) = 1$) tel que $A\mathbb{K}[X] + B\mathbb{K}[X] = D\mathbb{K}[X]$, où $\forall P \in \mathbb{K}[X]$, $P\mathbb{K}[X] = (PQ : Q \in \mathbb{K}[X])$. Et donc $A\mathbb{K}[X] + B\mathbb{K}[X] = AU + BV : U \in \mathbb{K}[X], V \in \mathbb{K}[X]$.

Ce polynôme $D$ est appelé le PGCD unitaire de $A$ et $B$. Il est caractérisé par :

1. $D \mid A$ et $D \mid B$
2. $\forall P$, si $P \mid A$ et $P \mid B$ alors $P \mid D$
3. $D$ est unitaire.

Les polynômes qui vérifient 1 et 2 sont les $kD$, $k \in \mathbb{K} \setminus \{0\}$.

***Démonstration.*** Soit $C \in A\mathbb{K}[X] + B\mathbb{K}[X]$ non nul et de degré minimal ; il en existe puisque $A, B$ ne sont pas tous les deux nuls. Soit :

$$
\begin{aligned}
A &= A \cdot 1 + B \cdot 0 \in A\mathbb{K}[X] + B\mathbb{K}[X] \\
B &= A \cdot 0 + B \cdot 1 \in A\mathbb{K}[X] + B\mathbb{K}[X]
\end{aligned}
$$

Soit $F \in A\mathbb{K}[X] + B\mathbb{K}[X]$ ; faisons la division euclidienne de $F$ par $C$ : $F = CQ + R$, $\deg(R) < \deg(C)$. Mais $F = AU + BV$ et $C = AU_C + BV_C$, ainsi $F - CQ = A(U - U_C Q) + B(V - V_C Q)$. On a donc $R \in A\mathbb{K}[X] + B\mathbb{K}[X]$ et $\deg(R) < \deg(C)$, d'où $R = 0$ car $C$ est de degré minimal.

Donc $F = CQ \in C\mathbb{K}[X]$ ($\forall F \in A\mathbb{K}[X] + B\mathbb{K}[X]$), et donc $A\mathbb{K}[X] + B\mathbb{K}[X] \subset C\mathbb{K}[X]$.

Réciproquement, $C = AU_C + BV_C \Rightarrow \forall Q \in \mathbb{K}[X]$, $CQ = AU_C Q + BV_C Q \in A\mathbb{K}[X] + B\mathbb{K}[X]$, donc $C\mathbb{K}[X] \subset A\mathbb{K}[X] + B\mathbb{K}[X]$, d'où $A\mathbb{K}[X] + B\mathbb{K}[X] = C\mathbb{K}[X]$.

Clairement, $C\mathbb{K}[X] = \dfrac{C}{cd(C)}\mathbb{K}[X]$ car $CQ = \dfrac{C}{cd(C)}cd(C)Q$. Posant $D = \dfrac{C}{cd(C)}$, on a donc $D$ unitaire : $C = cd(C)X^{\deg(C)} + \dots \Rightarrow \dfrac{C}{cd(C)} = 1X^{\deg(C)} + \dots$ (il est donc unitaire) et $A\mathbb{K}[X] + B\mathbb{K}[X] = D\mathbb{K}[X]$.

Montrons que $D$ vérifie 1, 2 et 3 (évident) :

- $A, B \in A\mathbb{K}[X] + B\mathbb{K}[X] = D\mathbb{K}[X] \Rightarrow D \mid A$ et $D \mid B \Rightarrow 1$.
- Si $P \mid A$ et $P \mid B$, alors $A = PS$, $B = PT$, donc $\forall U, V$ : $AU + BV = P(SU + TV)$. Mais $D \in A\mathbb{K}[X] + B\mathbb{K}[X]$, donc $\exists U, V$ tels que $D = AU + BV = P(SU + TV)$. Et donc $P \mid D$ : ce qui prouve 2. Donc $D$ vérifie 1, 2 et 3.

Maintenant, soit $E$ un polynôme vérifiant 1 et 2 : montrons que $E = kD$, $k \in \mathbb{K} \setminus \{0\}$, et que si $E$ vérifie 3 alors $k = 1$ (et donc $E = D$).

$$
\begin{aligned}
&E \text{ vérifie } 1 \Leftrightarrow E \mid A \text{ et } E \mid B \Rightarrow E \mid D \\
&E \text{ vérifie } 2 \Leftrightarrow \text{tout polynôme divisant } A \text{ et } B \text{ divise } E \Rightarrow D \mid E \\
&D \mid E : E = DQ \text{ et } E \mid D : D = EQ' \Rightarrow D = DQQ' \Rightarrow \deg(D) = \deg(D) + \deg(Q) + \deg(Q') \Rightarrow \deg(Q) = \deg(Q') = 0
\end{aligned}
$$

Donc $Q = \text{cte} = k$ et $D = DQQ' \Rightarrow QQ' = 1 \Rightarrow Q' = Q^{-1} = k^{-1}$. Ainsi $E = DQ = kD$, $k \in \mathbb{K} \setminus \{0\}$. Enfin, $cd(E) = k\,cd(D) = k$ : donc $E$ vérifie $3 \Leftrightarrow k = 1 \Leftrightarrow E = D$.

## Plus petit commun multiple

**Proposition et définition.** Soient $A, B \in \mathbb{K}[X]$ tous deux non nuls. Il existe un unique $M \in \mathbb{K}[X]$ unitaire tel que $A\mathbb{K}[X] \cap B\mathbb{K}[X] = M\mathbb{K}[X]$. On l'appelle le PPCM de $A, B$. Il est caractérisé par :

1. $A \mid M$ et $B \mid M$
2. $\forall P \in \mathbb{K}[X]$, $(A \mid P$ et $B \mid P) \Rightarrow M \mid P$
3. $M$ est unitaire.

Tout $P$ vérifiant 1, 2 est de la forme $kM$, $k \in \mathbb{K} \setminus \{0\}$, et on dit que c'est un PPCM de $A, B$.

***Démonstration.*** $AB \in A\mathbb{K}[X] \cap B\mathbb{K}[X]$ car $AB \in A\mathbb{K}[X]$, $AB = BA \in B\mathbb{K}[X]$. Mais $AB \neq 0$ car $A \neq 0$, $B \neq 0$ (et car $\mathbb{K}[X]$ est intègre). Donc $A\mathbb{K}[X] \cap B\mathbb{K}[X] \neq \{0\}$.

Soit donc $C \in A\mathbb{K}[X] \cap B\mathbb{K}[X]$ non nul et de degré minimal. Soit $F \in A\mathbb{K}[X] \cap B\mathbb{K}[X]$ : faisons la division euclidienne $F = QC + R$, $\deg(R) < \deg(C)$. $F \in A\mathbb{K}[X]$, $C \in A\mathbb{K}[X] \Rightarrow QC \in A\mathbb{K}[X]$, donc $F - QC \in A\mathbb{K}[X]$. De même, $F - QC \in B\mathbb{K}[X]$. Donc $R \in A\mathbb{K}[X] \cap B\mathbb{K}[X]$. Mais $\deg(R) < \deg(C)$, donc $R = 0$ (par le choix de $C$).

Donc $F = CQ \in C\mathbb{K}[X]$ ($\forall F \in A\mathbb{K}[X] \cap B\mathbb{K}[X]$), et donc $A\mathbb{K}[X] \cap B\mathbb{K}[X] \subset C\mathbb{K}[X]$.

Réciproquement, $C \in A\mathbb{K}[X] \cap B\mathbb{K}[X] \Rightarrow C = AU = BV \Rightarrow \forall Q \in \mathbb{K}[X]$, $CQ = AQU \in A\mathbb{K}[X]$ et $CQ = BQV \in B\mathbb{K}[X]$ ($\Rightarrow CQ \in A\mathbb{K}[X] \cap B\mathbb{K}[X]$), donc $C\mathbb{K}[X] \subset A\mathbb{K}[X] \cap B\mathbb{K}[X]$.

Posons $M = \dfrac{C}{cd(C)}$ : alors $M$ est unitaire et $A\mathbb{K}[X] \cap B\mathbb{K}[X] = M\mathbb{K}[X]$.

Montrons que $M$ vérifie 1, 2 et 3 (évident) :

- $M \in A\mathbb{K}[X] \cap B\mathbb{K}[X] \Rightarrow A \mid M$ et $B \mid M$, donc 1 est évident !
- $M$ vérifie $2 \Leftrightarrow (\forall F, A \mid F \text{ et } B \mid F \Rightarrow M \mid F) \Leftrightarrow (\forall F, F \in A\mathbb{K}[X] \cap B\mathbb{K}[X] \Rightarrow F \in M\mathbb{K}[X])$ : évident puisque $A\mathbb{K}[X] \cap B\mathbb{K}[X] = M\mathbb{K}[X]$.

Donc $M$ vérifie 1, 2 et 3.

Enfin, soit $E$ vérifiant 1, 2 ; montrons que $E = kM$, $k \in \mathbb{K} \setminus \{0\}$, et que si $E$ vérifie 3, alors $E = M$.

$$
\begin{aligned}
&E \text{ vérifie } 1 \Leftrightarrow A \mid E \text{ et } B \mid E \Leftrightarrow E \in A\mathbb{K}[X] \cap B\mathbb{K}[X] \Leftrightarrow E \in M\mathbb{K}[X] \Leftrightarrow M \mid E \\
&E \text{ vérifie } 2 \Leftrightarrow (\text{tout } F \text{ tel que } A \mid F \text{ et } B \mid F \text{ vérifie } E \mid F) \Rightarrow E \mid M \text{ car } M \text{ vérifie } 1
\end{aligned}
$$

Donc $E \mid M$ et $M \mid E$, d'où (comme précédemment) $E = kM$, $k \in \mathbb{K} \setminus \{0\}$. De plus, $cd(E) = k\,cd(M) = k$, donc $E$ vérifie $3 \Leftrightarrow k = 1 \Leftrightarrow E = M$. Ce qui montre que 1, 2 et 3 caractérisent $M$.

## Lien entre PGCD et PPCM

**Proposition et définition.** Soient $A, B$ tous deux non nuls. Soit $D = PGCD(A, B)$ leur PGCD unitaire. Soit $M = PPCM(A, B)$ leur PPCM unitaire. Alors :

$$
DM = \frac{A}{cd(A)} \cdot \frac{B}{cd(B)}
$$

***Démonstration.*** Voir plus tard.

**Algorithme d'Euclide.** $D$ se calcule par l'algorithme d'Euclide. $A = BQ_1 + R_1$, $\deg R_1 < \deg B$. Les diviseurs communs à $A$ et $B$ sont les diviseurs communs à $B$ et $A - BQ_1 = R_1$. Puis $B = Q_2 R_1 + R_2$, $\deg R_2 < \deg R_1$. On a de même $PGCD(B, R_1) = PGCD(R_1, R_2)$, etc. Cette succession de divisions ne peut pas se poursuivre indéfiniment puisque les degrés des restes décroissent strictement : $\deg(B) > \deg(R_1) > \deg(R_2) > \dots$

Et toute séquence strictement décroissante dans $\mathbb{N} \cup \{-\infty\}$ se termine. Or, tant que le reste est différent de $0$, on peut continuer l'algorithme. Donc quand l'algorithme se termine, c'est qu'on est arrivé à un reste nul :

$$
\begin{aligned}
R_{n-2} &= Q_n R_{n-1} + R_n \text{ avec } R_n \neq 0 \text{ dernier reste non nul} \\
R_{n-1} &= Q_{n+1} R_n + 0
\end{aligned}
$$

Alors

$$
D = PGCD(A, B) = PGCD(B, R_1) = PGCD(R_1, R_2) = \dots = PGCD(R_{n-1}, R_n) = PGCD(R_n, 0) = \frac{R_n}{cd(R_n)}
$$

(le plus grand diviseur unitaire de $R_n$). Donc le $PGCD(A, B)$ est le dernier reste non nul dans l'algorithme d'Euclide, rendu unitaire.

**Exemple.**

$$
\begin{aligned}
A &= X^5 - X^4 + 2X^3 + 1 \\
B &= X^5 + X^4 + 2X^2 - 1 \\
A &= B - 2(X^4 - X^3 + X^2 - 1) = B - 2R_1 \quad \text{(on peut schtroumpfer le facteur } -2\text{)} \\
B &= (X + 2)R_1 - X^3 + X + 1 = (X + 2)R_1 - R_2 \\
R_1 &= (X - 1)R_2 - 0
\end{aligned}
$$

Donc $PGCD(A, B) = D = X^3 + X + 1$.

Comme pour les entiers, on peut remonter le flot des divisions pour trouver des polynômes $(U_0, V_0)$ tels que $D = AU_0 + BV_0$ (c'est ce qu'on appelle l'algorithme d'Euclide étendu). Dans l'exemple ci-dessus :

$$
\begin{aligned}
D = X^3 + X + 1 &= (X^5 + X^4 + 2X^2 - 1) - (X + 2)(X^4 - X^3 + X^2 - 1) \\
&= B - (X + 2)(-0{,}5)(A - B) \\
&= \frac{1}{2}(X + 2)A + \left(1 - \frac{1}{2}(X + 2)\right)B \\
&= \frac{1}{2}(X + 2)A - \frac{1}{2}XB
\end{aligned}
$$

D'où la solution $U_0 = \dfrac{1}{2}(X + 2)$ et $V_0 = -\dfrac{1}{2}X$ pour l'équation $AU + BV = D$ (on verra plus tard comment en déduire toutes les solutions $(U, V)$…).

## Polynômes premiers entre eux

**Définition.** Deux polynômes $A, B$ (non tous deux nuls) sont dits premiers entre eux si $PGCD(A, B) = 1$.

**Proposition.** $A$ et $B$ sont premiers entre eux si et seulement si $\exists U, V \in \mathbb{K}[X]$ tels que $AU + BV = 1$ (condition de Bézout).

***Démonstration.*** $A$ et $B$ sont premiers entre eux $\Leftrightarrow PGCD(A, B) = 1 \Leftrightarrow A\mathbb{K}[X] + B\mathbb{K}[X] = \mathbb{K}[X] \Leftrightarrow 1 \in A\mathbb{K}[X] + B\mathbb{K}[X]$ : $\Rightarrow$ car $1 \in \mathbb{K}[X]$ ; $\Leftarrow$ car si $1 \in A\mathbb{K}[X] + B\mathbb{K}[X]$, tous ses multiples y sont aussi.

## Lemme de Gauss

**Proposition.** Soient $A, B, C \in \mathbb{K}[X]$. Si $C \mid AB$ et que $C$ et $B$ sont premiers entre eux, alors $C \mid A$.

***Démonstration.*** $C$ et $B$ sont premiers entre eux $\Leftrightarrow \exists U, V$ tels que $1 = CU + BV$, donc $A = CUA + ABV \Rightarrow A \in C\mathbb{K}[X]$ car $CUA$ et $ABV$ appartiennent à $C\mathbb{K}[X]$.

**Proposition.** Soient $A, B \in \mathbb{K}[X]$ non tous deux nuls. Soit $D$ leur PGCD (unitaire). Soient $U_0, V_0$ tels que $D = AU_0 + BV_0$ (ceux obtenus par exemple par l'algorithme d'Euclide étendu). Alors la solution générale $(U, V) \in \mathbb{K}[X] \times \mathbb{K}[X]$ de l'équation $AU + BV = D$ est donnée par :

$$
U = U_0 + \frac{B}{D}S
\qquad
V = V_0 - \frac{A}{D}S
$$

***Démonstration.*** $D = AU_0 + BV_0 = AU + BV \Rightarrow A(U - U_0) = B(V_0 - V) \Rightarrow \dfrac{A}{D}(U - U_0) = \dfrac{B}{D}(V_0 - V)$.

Donc $\dfrac{B}{D} \,\Big|\, \dfrac{A}{D}(U - U_0)$. Mais $\dfrac{B}{D}$ est premier avec $\dfrac{A}{D}$ (d'après Bézout). Donc, d'après le lemme de Gauss, $\dfrac{B}{D} \,\Big|\, U - U_0$. On pose $U - U_0 = \dfrac{B}{D}S$, i.e. $U = U_0 + \dfrac{B}{D}S$. On reporte dans $\dfrac{A}{D}(U - U_0) = \dfrac{B}{D}(V_0 - V)$ et on obtient $\dfrac{A}{D}\dfrac{B}{D}S = \dfrac{B}{D}(V_0 - V)$.

L'un au moins des polynômes $A, B$ est différent de $0$ (par hypothèse). Quitte à les échanger, on peut supposer que c'est le cas de $B$ : on peut donc simplifier par $\dfrac{B}{D}$ et on obtient $V_0 - V = \dfrac{A}{D}S$, i.e. $V = V_0 - \dfrac{A}{D}S$. Cela prouve que toute solution $(U, V)$ de $AU + BV = D$ est de la forme $U = U_0 + \dfrac{B}{D}S$ et $V = V_0 - \dfrac{A}{D}S$ où $S \in \mathbb{K}[X]$.

Et en fait, n'importe quel $S \in \mathbb{K}[X]$ donne une solution $(U, V)$ puisque si $U = U_0 + \dfrac{B}{D}S$ et $V = V_0 - \dfrac{A}{D}S$, alors

$$
AU + BV = AU_0 + BV_0 + A\frac{B}{D}S - B\frac{A}{D}S = D
$$

## Formule de Taylor pour les polynômes

**Proposition (formule de Taylor pour les polynômes).** Soit $P \in \mathbb{K}[X]$, soit $a \in \mathbb{K}$ ; $P(X + a) = P_a(X)$ est un polynôme. Si $P(X) = c_n X^n + c_{n-1}X^{n-1} + \dots + c_1 X + c_0$, on obtient

$$
P(X + a) = c_n(X + a)^n + c_{n-1}(X + a)^{n-1} + \dots + c_1(X + a) + c_0 = c_n X^n + c'_{n-1}X^{n-1} + \dots + c'_1 X + c'_0
$$

La formule de Taylor évite ce calcul et donne directement les coefficients :

$$
P(X) = \sum_{j \geq 0} \frac{P^{(j)}(a)}{j!}(X - a)^j
$$

où $P' = P^{(1)}, \dots$ sont les dérivées successives de $P$, définies par $(X^k)' = kX^{k-1}$ et $(X^k)^{(j)} = \dots = \dfrac{k!}{(k-j)!}X^{k-j}$ si $j \leq k$, et $0$ si $j > k$.

***Démonstration.*** On peut considérer $P(X)$ comme un polynôme en $X - a$ : $P(X) = \displaystyle\sum_{k \geq 0} \lambda_k (X - a)^k$. Il s'agit de vérifier que $\lambda_k = \dfrac{P^{(k)}(a)}{k!}$.

On sait que, par récurrence, $\forall j \geq 0$ et $\forall k \geq 0$ :

$$
((X - a)^k)^{(j)} = \frac{k!}{(k-j)!}(X - a)^{k-j} \text{ si } j \leq k
$$

C'est vrai pour $j = 0$ : $((X - a)^k)^{(0)} = (X - a)^k = \dfrac{k!}{(k-0)!}(X - a)^{k-0}$. Alors

$$
((X - a)^k)^{(j+1)} = \frac{k!}{(k-j)!}((X - a)^{k-j})' = \frac{k!}{(k-j)!}(k - j)(X - a)^{k-j-1} = \frac{k!}{(k-j-1)!}(X - a)^{k-j-1} \text{ si } j \leq k - 1, \text{ et } 0 \text{ si } j = k
$$

Appliquons cela à $P(X)$ :

$$
\begin{aligned}
P(X) &= \sum_{k \geq 0} \lambda_k (X - a)^k \\
\Rightarrow P^{(j)}(X) &= \sum_{k \geq 0} \lambda_k ((X - a)^k)^{(j)} = \sum_{k \geq j} \lambda_k \frac{k!}{(k-j)!}(X - a)^{k-j} = \lambda_j \frac{j!}{0!} + \sum_{k \geq j+1} \lambda_k \frac{k!}{(k-j)!}(X - a)^{k-j}
\end{aligned}
$$

Et donc $P^{(j)}(a) = \lambda_j j!$, c'est-à-dire $\lambda_j = \dfrac{P^{(j)}(a)}{j!}$. C'est bien le coefficient de la formule de Taylor.

## Racines

**Définition.** Soit $P(X) \in \mathbb{K}[X]$. Soit $a \in \mathbb{K}$. En substituant $a$ à $X$, on obtient un élément de $\mathbb{K}$, qui sert $P(a)$. On dit que $a$ est une **racine** de $P$ si $P(a) = 0$.

**Proposition.** Soient $P \in \mathbb{K}[X]$ et $a \in \mathbb{K}$. Alors : $a$ est racine de $P \Leftrightarrow X - a \mid P(X)$.

***Démonstration.*** $P(X) = Q(X)(X - a) + R$ où $R = P(a)$ (voir TD). Donc $X - a \mid P(X) \Leftrightarrow P(a) = 0$.

**Définition.** Soient $P \in \mathbb{K}[X]$, $a \in \mathbb{K}$. On dit que $a$ est une racine d'ordre $m$ de $P$ (où $m \in \mathbb{N}^*$) si $(X - a)^m \mid P(X)$ et $(X - a)^{m+1}$ ne divise pas $P(X)$, i.e. $(X - a)^m$ est la plus grande puissance de $X - a$ qui divise $P(X)$.

**Proposition.** Soient $P \in \mathbb{K}[X]$, $a \in \mathbb{K}$. Les assertions suivantes sont équivalentes :

1. $a$ est racine d'ordre $m$ de $P$.
2. $P^{(k)}(a) = 0$ pour $0 \leq k \leq m - 1$ et $P^{(m)}(a) \neq 0$.
3. $a$ est racine de $P$ et racine d'ordre $m - 1$ de $P'$ si $m - 1 \geq 1$. Et si $m = 1$, $a$ est racine de $P$ et n'est pas racine de $P'$.

***Démonstration.*** Par la formule de Taylor :

$$
P(X) = \sum_{k=0}^{m-1} \frac{P^{(k)}(a)}{k!}(X - a)^k + (X - a)^m \cdot \sum_{k \geq m} \frac{P^{(k)}(a)}{k!}(X - a)^{k-m} = R(X) + (X - a)^m \cdot Q(X)
$$

Cela montre que dans la division euclidienne de $P(X)$ par $(X - a)^m$, le quotient est $Q(X)$ et le reste est $R(X)$. Donc

$$
(X - a)^m \mid P(X) \Leftrightarrow R(X) = 0 \Leftrightarrow P^{(k)}(a) = 0, 0 \leq k \leq m - 1
$$

Donc $((X - a)^m \mid P(X)$ et $(X - a)^{m+1}$ ne divise pas $P(X)) \Leftrightarrow (P^{(k)}(a) = 0, 0 \leq k \leq m - 1$ et $P^{(m)}(a) \neq 0)$. Cela prouve que $(1) \Leftrightarrow (2)$.

Enfin, il est clair que $(2) \Leftrightarrow (3)$, puisque $(3) \Leftrightarrow P(a) = 0$ et $(P')^{(k)}(a) = 0 \Leftrightarrow P^{(k+1)}(a) = 0$, $0 \leq k \leq m - 2$, et $(P')^{(m-1)}(a) \neq 0$, $\Leftrightarrow P^{(k)}(a) = 0$, $0 \leq k \leq m - 1$ et $P^{(m)}(a) \neq 0$.

## Polynômes irréductibles

**Définition.** On dit qu'un polynôme $A \in \mathbb{K}[X]$ **non constant** est irréductible (sur $\mathbb{K}$) s'il n'existe pas de décomposition $A = BC$ avec $\deg(B) < \deg(A)$ et $\deg(C) < \deg(A)$ :

$$
\begin{aligned}
&A = BC \text{ avec } \deg(B) < \deg(A) \text{ et } \deg(C) < \deg(A) \\
\Leftrightarrow\ &A = BC \text{ avec } 0 < \deg(B) < \deg(A) \\
\Leftrightarrow\ &A = BC \text{ avec } 0 < \deg(C) < \deg(A)
\end{aligned}
$$

**Exemple.** Tout polynôme de degré 1 est irréductible. En effet, on peut l'écrire $A(X) = cd(A)(X - a)$ et il est clair qu'on ne peut pas avoir $A = BC$ avec $\deg(B) < 1$ et $\deg(C) < 1$, car on aurait $B = \text{cte}$ et $C = \text{cte}$, donc $A = \text{cte}$.

$X^2 + 1 \in \mathbb{R}[X]$ est irréductible sur $\mathbb{R}$. En effet, si on avait $X^2 + 1 = B(X)C(X)$ où $\deg(B) < 2$ et $\deg(C) < 2$, alors $0 < \deg(B) < 2$ et $0 < \deg(C) < 2$ (puisque $\deg(B) + \deg(C) = 2$), donc $\deg(B) = \deg(C) = 1$. On pourrait donc écrire $X^2 + 1 = \lambda(X - a) \cdot \mu(X - b)$ avec $\lambda\mu = 1$, donc $X^2 + 1 = (X - a)(X - b)$. Et $a, b$ seraient des racines (réelles) de $X^2 + 1$ : **impossible !** Mais $X^2 + 1$ n'est pas irréductible sur $\mathbb{C}$ puisque $(X^2 + 1) = (X - i)(X + i)$.

$X^4 + 1$ n'est pas irréductible sur $\mathbb{R}$ (bien que sans racine réelle…) car $X^4 + 1 = (X^2 + 1)^2 - 2X^2 = (X^2 + \sqrt{2}X + 1)(X^2 - \sqrt{2}X + 1)$. Les deux polynômes sont irréductibles sur $\mathbb{R}$.

**Lemme.** Si $P \in \mathbb{K}[X]$ est irréductible (sur $\mathbb{K}$) et ne divise pas $A \in \mathbb{K}[X]$, alors $P$ est premier avec $A$.

***Démonstration.*** Soit $D = PGCD(P, A)$ ; $D \mid P$ et $P$ est irréductible, donc on n'a pas $0 < \deg(D) < \deg(P)$. Donc $\deg(D) = 0$ ou $\deg(D) = \deg(P)$, donc $D = 1$ puisque $D$ est unitaire : le cas $\deg(D) = \deg(P)$, où $P = kD$ puisque $D \mid P$, est exclu car $P$ serait un PGCD de $P$ et $A$, et donc $P$ diviserait $A$. Donc $D = 1$, i.e. $P$ et $A$ sont premiers entre eux.

**Proposition, lemme d'Euclide.** Si $P \in \mathbb{K}[X]$ est irréductible et $P \mid AB$, et si $P$ ne divise pas $A$, alors $P \mid B$.

***Démonstration.*** $P$ est irréductible et $P$ ne divise pas $A$, donc (lemme précédent) $P$ est premier avec $A$, donc (Gauss) $P \mid B$.

C'est faux si $P$ n'est pas irréductible. Par exemple, $(X - 1)(X - 2) \mid (X - 1)^2(X - 2)(X - 3)$ et $(X - 1)(X - 2)$ ne divise pas $(X - 1)^2$. Mais $(X - 1)(X - 2)$ ne divise pas $(X - 2)(X - 3)$.

## Arithmétique des polynômes

**Théorème fondamental de l'arithmétique des polynômes.** Tout polynôme $A \in \mathbb{K}[X]$ non nul s'écrit d'une façon unique sous la forme :

$$
A = cd(A)\prod_{P \in \mathfrak{I}} P^{v_P(A)}
$$

$\mathfrak{I}$ est l'ensemble des polynômes irréductibles unitaires de $\mathbb{K}[X]$ ; $\forall P \in \mathfrak{I}$, $v_P(A) \in \mathbb{N}$, et l'ensemble des $P \in \mathfrak{I}$ tels que $v_P(A) \neq 0$ est fini (donc le produit $\displaystyle\prod_{P \in \mathfrak{I}} P^{v_P(A)}$ est en fait un produit fini). C'est la décomposition de $A$ en facteurs irréductibles dans $\mathbb{K}[X]$. $v_P(A)$ s'appelle la **valuation** de $A$ en $P$.

***Démonstration.***

**Existence.** $\dfrac{A}{cd(A)}$ est un polynôme unitaire non nul. S'il est irréductible, c'est terminé : $\dfrac{A}{cd(A)} = P_0 \in \mathfrak{I} = \displaystyle\prod_{P \in \mathfrak{I}} P^{v_P(A)}$ où $v_P(A) = 1$ si $P = P_0$ et $0$ si $P \neq P_0$.

Si $\dfrac{A}{cd(A)}$ n'est ni constant ni irréductible, on peut l'écrire $\dfrac{A}{cd(A)} = BC$ avec $B, C$ unitaires tels que $\deg(B) < \deg(A)$, $\deg(C) < \deg(A)$. On raisonne par récurrence ; on peut supposer :

$$
B = \prod_{P \in \mathfrak{I}} P^{v_P(B)}, \qquad C = \prod_{P \in \mathfrak{I}} P^{v_P(C)}
$$

Un polynôme de degré 1 est irréductible, donc le théorème s'applique : ce qui amorce la récurrence. On a donc

$$
\frac{A}{cd(A)} = BC = \prod_{P \in \mathfrak{I}} P^{v_P(B)} P^{v_P(C)}
$$

et la décomposition existe, avec $v_P(A) = v_P(B) + v_P(C)$.

**Unicité.** Supposons que $\displaystyle\prod_{P \in \mathfrak{I}} P^{n_P} = \prod_{P \in \mathfrak{I}} P^{m_P}$ avec $m_P, n_P \in \mathbb{N}$ (nuls sauf un nombre fini d'entre eux). Il s'agit de montrer que $n_P = m_P, \forall P \in \mathfrak{I}$. Supposons que ce ne soit pas le cas : il existe $P_0 \in \mathfrak{I}$ tel que $n_{P_0} \neq m_{P_0}$. Quitte à échanger les notations $n_P, m_P$, on peut supposer que $n_{P_0} > m_{P_0}$. Alors

$$
P_0^{n_{P_0}} \prod_{P \in \mathfrak{I} \setminus \{P_0\}} P^{n_P} = P_0^{m_{P_0}} \prod_{P \in \mathfrak{I} \setminus \{P_0\}} P^{m_P}
\quad \text{i.e.} \quad
P_0^{n_{P_0} - m_{P_0}} \prod_{P \in \mathfrak{I} \setminus \{P_0\}} P^{n_P} = \prod_{P \in \mathfrak{I} \setminus \{P_0\}} P^{m_P}
$$

où $n_{P_0} - m_{P_0} > 0$, donc $P_0$ divise le premier membre de l'égalité. Mais il ne divise pas le second membre, car sinon, d'après le lemme d'Euclide, il diviserait l'un des facteurs $P \in \mathfrak{I} \setminus \{P_0\}$, ce qui est impossible puisque $P_0$ et $P$ sont irréductibles, unitaires et distincts ($[P_0 \mid P$ et $P$ irréductible$] \Rightarrow P = kP_0$ où $k \in \mathbb{K}$, et alors $[P_0, P$ unitaires$] \Rightarrow k = 1$, et donc $P = P_0 \notin \mathfrak{I} \setminus \{P_0\}$). On a donc une contradiction, d'où l'unicité.

**Corollaire.** Soient $A, B \in \mathbb{K}[X]$ non constants, $A = cd(A)\displaystyle\prod_{P \in \mathfrak{I}} P^{v_P(A)}$, $B = cd(B)\prod_{P \in \mathfrak{I}} P^{v_P(B)}$. Alors :

1. $A \mid B \Leftrightarrow v_P(A) \leq v_P(B), \forall P \in \mathfrak{I}$.
2. $PGCD(A, B) = \displaystyle\prod_{P \in \mathfrak{I}} P^{\min(v_P(A), v_P(B))}$.
3. $PPCM(A, B) = \displaystyle\prod_{P \in \mathfrak{I}} P^{\max(v_P(A), v_P(B))}$.
4. $PGCD(A, B)\,PPCM(A, B) = \dfrac{AB}{cd(A)cd(B)}$.

***Démonstration.***

1. $A \mid B \Leftrightarrow \exists Q \in \mathbb{K}[X]$ tel que $B = AQ$ ($Q \neq 0$ car $B \neq 0$), i.e. tel que $\displaystyle\prod_{P \in \mathfrak{I}} P^{v_P(B)} = \prod_{P \in \mathfrak{I}} P^{v_P(A)} \prod_{P \in \mathfrak{I}} P^{v_P(Q)}$, i.e. tel que $\forall P \in \mathfrak{I}$, $v_P(B) = v_P(A) + v_P(Q)$, i.e. $v_P(B) \geq v_P(A), \forall P \in \mathfrak{I}$.

   Réciproquement, si $v_P(B) \geq v_P(A), \forall P \in \mathfrak{I}$, on peut écrire $v_P(B) = v_P(A) + n_P$ avec $n_P \in \mathbb{N}$ (nul, comme $v_P(A), v_P(B)$, sauf pour un nombre fini de $P$), et on peut poser $Q = \displaystyle\prod_{P \in \mathfrak{I}} P^{n_P}$ ; donc $n_P = v_P(Q)$ et on remonte les équivalences précédentes jusqu'à $B = AQ$.
2. $D = PGCD(A, B)$ est le plus grand diviseur (unitaire) de $A$ et $B$ : $\forall P \in \mathfrak{I}$, $v_P(D) \leq v_P(A)$ et $v_P(D) \leq v_P(B)$ car $D \mid A$ et $D \mid B$, donc $\forall P \in \mathfrak{I}$, $v_P(D) \leq \min(v_P(A), v_P(B))$. Et il faut le plus grand $D$ vérifiant cela. Donc $v_P(D) = \min(v_P(A), v_P(B))$.
3. $M = PPCM(A, B)$ est le plus petit multiple de $A, B$ (avec $v_P(M)$ minimal : donc $v_P(M) = \max(v_P(A), v_P(B))$), i.e. $\forall P \in \mathfrak{I}$, $v_P(M) \geq v_P(A)$ et $v_P(M) \geq v_P(B)$, i.e. $\forall P \in \mathfrak{I}$, $v_P(M) \geq \max(v_P(A), v_P(B))$.
4. On a

   $$
   PGCD(A, B)\,PPCM(A, B) = \prod_{P \in \mathfrak{I}} P^{\min(v_P(A), v_P(B)) + \max(v_P(A), v_P(B))} = \prod_{P \in \mathfrak{I}} P^{v_P(A) + v_P(B)} = \prod_{P \in \mathfrak{I}} P^{v_P(A)} \prod_{P \in \mathfrak{I}} P^{v_P(B)} = \frac{A}{cd(A)} \cdot \frac{B}{cd(B)}
   $$

**Autre corollaire du théorème.** Soit $A \in \mathbb{K}[X]$ non nul.

$$
A = cd(A) \cdot \prod_{\substack{P \in \mathfrak{I} \\ \deg P = 1}} P^{v_P(A)} \prod_{\substack{P \in \mathfrak{I} \\ \deg P > 1}} P^{v_P(A)} = \prod (X - a_i)^{m_i} Q
$$

où les $a_i$ sont les racines de $A$ et $m_i = v_{X - a_i}(A)$ leurs multiplicités, et $Q$ est un polynôme sans racine dans $\mathbb{K}$.

En particulier :

$$
\sum m_i \leq \deg(A)
$$

« La somme des multiplicités des racines d'un polynôme est inférieure au degré de ce polynôme. »

**Théorème de d'Alembert.**

1. Dans $\mathbb{C}[X]$, les polynômes unitaires irréductibles sont les $X - a$, $a \in \mathbb{C}$. Donc tout polynôme $A \in \mathbb{C}[X]$ non constant s'écrit $A(X) = cd(A) \cdot \prod (X - a_i)^{m_i}$. En particulier, il a $\deg(A)$ racines (comptées avec leur multiplicité, $\sum m_i = \deg(A)$).
2. Dans $\mathbb{R}[X]$, les polynômes unitaires irréductibles sont les $X - a$ où $a \in \mathbb{R}$ et les $X^2 + bX + c$ où $b, c \in \mathbb{R}$ avec $b^2 - 4c < 0$. Donc tout $A \in \mathbb{R}[X]$ non constant s'écrit $A(X) = cd(A) \prod (X - a_i)^{m_i} \cdot \prod (X^2 + b_j X + c_j)^{n_j}$.

***Démonstration.***

1. (Dans $\mathbb{C}$) : admis (hors programme).
2. (Dans $\mathbb{R}$) : soit $A(X) \in \mathbb{R}[X] \subset \mathbb{C}[X]$, de degré $\geq 1$. On peut appliquer le (1). Dans $\mathbb{C}[X]$, $A(X) = cd(A)\prod (X - a_i)^{m_i}$, $a_i \in \mathbb{C}$. Donc $A(X) = cd(A)\prod (X - a_i)^{m_i} \cdot \prod (X - a_j)^{m_j}$ (racines réelles, puis non réelles). Mais comme $A(X) \in \mathbb{R}[X]$, si $z$ est une racine complexe de $A$, $\overline{z}$ en est une aussi, avec la même multiplicité. En effet :

   $$
   \begin{aligned}
   &A(X) = c_N X^N + \dots + c_1 X + c_0, \quad c_k \in \mathbb{R} \\
   &A(z) = 0 \Leftrightarrow c_N z^N + \dots + c_1 z + c_0 = 0 \\
   \Leftrightarrow\ &\overline{c_N}\,\overline{z}^N + \dots + \overline{c_1}\,\overline{z} + \overline{c_0} = 0 \\
   \Leftrightarrow\ &c_N \overline{z}^N + \dots + c_1 \overline{z} + c_0 = 0 \quad (c_k \text{ réels}) \\
   \Leftrightarrow\ &A(\overline{z}) = 0
   \end{aligned}
   $$

   De même, $A^{(j)}(z) = 0$ ($0 \leq j \leq m - 1$) $\Leftrightarrow A^{(j)}(\overline{z}) = 0$ et $A^{(m)}(z) \neq 0 \Leftrightarrow A^{(m)}(\overline{z}) \neq 0$. Cela justifie que $z$ est racine de $A$ de multiplicité $m$ si et seulement si $\overline{z}$ est racine de $A$ de multiplicité $m$. Donc, dans $\prod (X - a_j)^{m_j}$, les facteurs peuvent se regrouper par paires de conjugués de même multiplicité :

   $$
   \prod (X - z_j)^{m_j}(X - \overline{z_j})^{m_j} = \prod [(X - z_j)(X - \overline{z_j})]^{m_j} = \prod [X^2 - (2\Re(z_j))X + |z_j|^2]^{m_j} = \prod (X^2 + b_j X + c_j)^{m_j}
   $$

   où $b_j = -2\Re(z_j) \in \mathbb{R}$, $c_j = |z_j|^2 \in \mathbb{R}$, et $b_j^2 - 4c_j < 0$ puisque les racines $z_j, \overline{z_j}$ ne sont pas réelles.

**Exemples typiques** (voir correction des DS et des DST)**.** Pour $X^m - 1$ et $X^m + 1$, il faut distinguer les cas : $n$ pair et $n$ impair.

**Le cas pair.**

- $X^{2m} - 1 = (X - 1)(X + 1)\displaystyle\prod_{k=1}^{m-1}\left(X - e^{i\pi\frac{k}{m}}\right)\left(X - e^{-i\pi\frac{k}{m}}\right)$ dans $\mathbb{C}[X]$
- $X^{2m} - 1 = (X - 1)(X + 1)\displaystyle\prod_{k=1}^{m-1}\left(X^2 - 2\cos\left(\frac{\pi k}{m}\right)X + 1\right)$ dans $\mathbb{R}[X]$
- $X^{2m} + 1 = \displaystyle\prod_{k=0}^{m-1}\left(X - e^{i\pi\frac{2k+1}{2m}}\right)\left(X - e^{-i\pi\frac{2k+1}{2m}}\right)$ dans $\mathbb{C}[X]$
- $X^{2m} + 1 = \displaystyle\prod_{k=0}^{m-1}\left(X^2 - 2\cos\left(\frac{2k+1}{2m}\pi\right)X + 1\right)$ dans $\mathbb{R}[X]$

**Preuve.** Sur le cercle trigonométrique, $z^{2m} = 1 = e^{2\pi ik} \Leftrightarrow z = e^{\frac{\pi ik}{m}} = e^{i\pi\frac{k}{m}}$, $k \in \mathbb{Z}$. Pour $X^{2m} + 1$ (facteurs complexes) : $z^{2m} = -1 = e^{i\pi + 2ki\pi} = e^{(2k+1)i\pi} \Rightarrow z = e^{\frac{(2k+1)i\pi}{2m}}$, $k \in \mathbb{Z}$.

**Exemple.** $m = 1$ : $X^2 + 1 = \left(X - e^{i\frac{\pi}{2}}\right)\left(X - e^{-i\frac{\pi}{2}}\right) = (X - i)(X + i)$ dans $\mathbb{C}[X]$, $= X^2 + 1$ (irréductible) dans $\mathbb{R}[X]$. $m = 2$ : $X^4 + 1 = (X^2 - \sqrt{2}X + 1)(X^2 + \sqrt{2}X + 1)$ dans $\mathbb{R}[X]$.

**Le cas impair.**

- $X^{2m+1} - 1 = (X - 1)\displaystyle\prod_{k=1}^{m}\left(X - e^{\frac{2\pi ik}{2m+1}}\right)\left(X - e^{-\frac{2\pi ik}{2m+1}}\right)$ dans $\mathbb{C}[X]$
- $X^{2m+1} - 1 = (X - 1)\displaystyle\prod_{k=1}^{m}\left(X^2 - 2\cos\left(\frac{2\pi k}{2m+1}\right)X + 1\right)$ dans $\mathbb{R}[X]$
- $X^{2m+1} + 1 = (X + 1)\displaystyle\prod_{k=0}^{m-1}\left(X - e^{i\pi\frac{2k+1}{2m+1}}\right)\left(X - e^{-i\pi\frac{2k+1}{2m+1}}\right)$ dans $\mathbb{C}[X]$
- $X^{2m+1} + 1 = (X + 1)\displaystyle\prod_{k=0}^{m-1}\left(X^2 - 2\cos\left(\frac{2k+1}{2m+1}\pi\right)X + 1\right)$ dans $\mathbb{R}[X]$

**Preuve.** $X^{2m+1} - 1 = (X - 1) \cdot$ facteurs non réels : $z^{2m+1} = 1 = e^{2\pi ik} \Leftrightarrow z = e^{\frac{2\pi ik}{2m+1}}$, $k \in \mathbb{Z}$. $X^{2m+1} + 1 = (X + 1) \cdot$ facteurs non réels : $z^{2m+1} = -1 = e^{(2k+1)i\pi} \Leftrightarrow z = e^{\frac{(2k+1)i\pi}{2m+1}}$, $k \in \mathbb{Z}$.

## Formules de Viète

Pour terminer ce chapitre sur les polynômes, voici les formules de Viète, qui expriment les coefficients d'un polynôme en fonction de ses racines.

**Théorème.** Soit $A \in \mathbb{K}[X]$ un polynôme de degré $n \geq 1$. On suppose qu'il est scindé dans $\mathbb{K}[X]$, c'est-à-dire que

$$
A(X) = cd(A)\prod_{i=1}^{n}(X - x_i), \quad x_i \in \mathbb{K}
$$

Écrivons $A(X) = a_n X^n + a_{n-1}X^{n-1} + \dots + a_1 X + a_0$. Alors :

$$
\begin{aligned}
-\frac{a_{n-1}}{a_n} &= \sum_{i=1}^{n} x_i \\
+\frac{a_{n-2}}{a_n} &= \sum_{1 \leq i < j \leq n} x_i x_j \\
-\frac{a_{n-3}}{a_n} &= \sum_{1 \leq i < j < k \leq n} x_i x_j x_k \\
(-1)^n \frac{a_0}{a_n} &= x_1 \dots x_n
\end{aligned}
$$

***Démonstration.*** Comme dans l'exemple, on écrit :

$$
\begin{aligned}
A(X) &= a_n X^n + a_{n-1}X^{n-1} + \dots + a_1 X + a_0 \\
&= a_n (X - x_1)(X - x_2)\dots(X - x_n) \\
&= a_n\left[X^n - (x_1 + \dots + x_n)X^{n-1} + \left(\sum_{1 \leq i < j \leq n} x_i x_j\right)X^{n-2} + \dots + (-1)^n x_1 \dots x_n\right]
\end{aligned}
$$
