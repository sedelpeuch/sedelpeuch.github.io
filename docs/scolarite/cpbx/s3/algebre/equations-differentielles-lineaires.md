---
title: "Équations différentielles linéaires"
description: "Systèmes différentiels linéaires et application de la réduction des matrices : théorème de Cauchy-Lipschitz, structure des solutions, wronskien, cas diagonalisable et trigonalisable, exponentielle de matrice et équations d'ordre p."
sidebar_position: 4
---

## Systèmes d'équations différentielles : généralités

### Le théorème de Cauchy-Lipschitz

**Définition 1.** Soit $A(t)$ une matrice (qui dépend de $t$) et $B(t)$ un vecteur (qui dépend de $t$).
On appelle "système différentiel linéaire d'ordre 1" le problème suivant : trouver $X$ tel que $X'(t) = A(t) X(t) + B(t)$.

**Remarque.** $A$ et $B$ sont des données. Ils sont continus par rapport à $t$.
Si $X(t) = \begin{pmatrix} x_1(t) \\ \vdots \\ x_n(t) \end{pmatrix}$, alors $X'(t) = \begin{pmatrix} x'_1(t) \\ \vdots \\ x'_n(t) \end{pmatrix}$.

**Définition 1 bis.** On appelle "problème de Cauchy" la donnée de $(t_0, X_0) \in I \times \mathbb{R}^n$, et d'un système dit "de Cauchy" :

$$
\begin{cases} X' = AX + B \\ X(t_0) = X_0 \end{cases} \qquad (C)
$$

**Théorème IV.2.** Le problème de Cauchy $(C)$ admet une unique solution $X : I \to \mathbb{K}^n$.

**Démonstration.** Admis. $\square$

### Structure des solutions

**Théorème IV.3.** Soit $L$ l'ensemble des solutions de $X' = AX$, où $X$ est l'inconnue, et $t \mapsto A(t)$ une fonction matricielle. Alors

- $L$ est un espace vectoriel de dimension $n$ (taille de $A$) ;
- une solution non nulle ne s'annule jamais (c'est-à-dire $X \neq 0 \Rightarrow \forall t \in I, X(t) \neq 0$).

**Démonstration.** (À savoir.) Montrons que $L$ est un espace vectoriel. Soit $X_1$ et $X_2$ dans $L$ et $\alpha \in \mathbb{K}$ ; alors montrons que $X_1 + \alpha X_2 \in L$ : $(X_1 + \alpha X_2)' = X'_1 + \alpha X'_2 = A X_1 + \alpha A X_2 = A(X_1 + \alpha X_2)$.
Donc $L$ est un sous-espace vectoriel de l'espace vectoriel des fonctions de $I$ dans $\mathbb{K}^n$.
Montrons que $\dim(L) = n$. Soit $\phi : \begin{cases} L \to \mathbb{K}^n \\ X \mapsto X(t_0) \end{cases}$, où $t_0 \in I$ est fixé. Alors $\phi$ est clairement linéaire ; de plus, par le théorème de Cauchy (T2), $\forall X_0 \in \mathbb{K}^n, \exists! X \in L, \phi(X) = X_0$. Donc $\phi$ est un isomorphisme, donc $\dim(L) = \dim(\mathbb{K}^n) = n$.
On va montrer que la contraposée est vraie, c'est-à-dire $\exists t_0, X(t_0) = 0 \Rightarrow X = 0$ sur $I$. Supposons donc que $X$ s'annule en $t_0$ ; alors $X$ est solution du problème de Cauchy $\begin{cases} X' = AX \\ X(t_0) = 0 \end{cases}$. Donc la fonction nulle est aussi solution de ce problème ; par unicité (théorème de Cauchy), $X = 0$. $\square$

**Exemple.** $\begin{cases} x'(t) = 2x(t) + 3t y(t) + e^t \\ y'(t) = -4t x(t) + y(t) + \sin(t) \end{cases}$. Cela se réécrit en $X' = AX + B$ avec $X(t) = \begin{pmatrix} x(t) \\ y(t) \end{pmatrix}$, $A(t) = \begin{pmatrix} 2 & 3t \\ -4t & 1 \end{pmatrix}$ et $B(t) = \begin{pmatrix} e^t \\ \sin(t) \end{pmatrix}$.

**Définition 4.** Soit $X' = AX + B$ un système différentiel. Alors le système $X' = AX$ est appelé "problème homogène" associé.

**Théorème IV.5.** Soit $L$ l'ensemble des solutions de $X' = AX$ et soit $X_p$ une solution particulière de $X' = AX + B$. Alors toute solution de $X' = AX + B$ est de la forme $X = X_p + X_g$, où $X_g \in L$.

**Démonstration.** On vérifie que $X_p + X_g$ est une solution : $(X_p + X_g)' = X'_p + X'_g = A X_p + B + A X_g = A(X_p + X_g) + B$.
Réciproquement, soit $X$ une solution de $X' = AX + B$. Montrons que $X - X_p \in L$ : $(X - X_p)' = X' - X'_p = AX + B - (A X_p + B) = A(X - X_p)$. $\square$

**Résolution.** Le T5 donne une méthode de résolution (pour $X' = AX + B$) :

1. résoudre l'équation homogène (on trouve un espace vectoriel de solutions) ;
2. trouver une solution particulière ;
3. conclure avec T5.

**Question.** Comment vérifier que des solutions sont indépendantes ?

**Définition - Proposition 6.** Soient $(X_1, \dots, X_n)$ des solutions de $X' = AX$. On introduit $W(t) = det_{\text{Base canonique}}(X_1(t), \dots, X_n(t)) = \big|X_1(t) \dots X_n(t)\big|$. C'est le wronskien des $(X_i(t))_{i=1,\dots,n}$. Alors $(X_i(t))_{i=1,\dots,n}$ est libre si et seulement si $\exists t_0 \in I, W(t_0) \neq 0$.

**Démonstration.** Admis. $\square$

## Résolution pratique pour le cas homogène

On peut avoir une équation différentielle non linéaire (exemple : $\theta'' + \dfrac{g}{\ell} \sin(\theta) = 0$, pour un pendule de longueur $\ell$). Et pour des équations différentielles linéaires avec second membre, il faut donc résoudre l'équation homogène par les matrices $A$ diagonalisable et trigonalisable et par coefficients constants, et trouver la solution particulière avec la variation de la constante.

### Le cas où $A$ est diagonalisable

**Cadre.** On considère $X' = AX$, où $A(t)$ est diagonalisable $\forall t \in I$, dans une base qui ne dépend pas de $t$ : $\exists P \in GL_n(\mathbb{K}), \forall t \in I, A(t) = P D(t) P^{-1}$, où $D(t) = \begin{pmatrix} \lambda_1(t) & & 0 \\ & \ddots & \\ 0 & & \lambda_n(t) \end{pmatrix}$.
On a $X' = AX \Leftrightarrow P^{-1} X'(t) = D(t) P^{-1} X(t)$. On pose $Y(t) = P^{-1} X(t)$. Alors $X$ est solution si et seulement si $Y$ est solution de $Y' = DY$. Ce système se réécrit :

$$
\begin{cases} y'_1(t) = \lambda_1(t) y_1(t) \\ \vdots \\ y'_n(t) = \lambda_n(t) y_n(t) \end{cases}
$$

On dit que le système est découplé. Notons $\Lambda_i(t) = \int_0^t \lambda_i(s)\,ds$ une primitive de $\lambda_i$. Alors, cf. première année, les solutions de $y' = \lambda_i y$ forment un espace vectoriel de $\dim(1)$, engendré par $e^{\Lambda_i}$. On peut écrire, soit $L_i$ l'ensemble des solutions de $y'_i = \lambda_i y_i$, alors $L_i = \left\{t \mapsto C e^{\Lambda_i(t)}, C \in \mathbb{K}\right\}$.
Ainsi $Y' = DY$ a pour solution $\left\{t \mapsto \begin{pmatrix} C_1 e^{\Lambda_1(t)} \\ \vdots \\ C_n e^{\Lambda_n(t)} \end{pmatrix}, \begin{pmatrix} c_1 \\ \vdots \\ c_n \end{pmatrix} \in \mathbb{K}^n\right\}$. On déduit $X$ via $X(t) = P Y(t)$.

### Le cas trigonalisable

Supposons que $\exists P \in GL_n$ tel que $A = P T(t) P^{-1}$, où $T(t) = \begin{pmatrix} \tau_{11}(t) & \dots & \tau_{1n}(t) \\ & \ddots & \vdots \\ & & \tau_{nn}(t) \end{pmatrix}$. De même, $Y = P^{-1} X$ permet de se ramener à $Y' = TY$, soit

$$
\begin{cases} y'_1(t) = \tau_{11} y_1(t) + \dots + \tau_{1n}(t) y_n(t) \\ y'_n(t) = \tau_{nn}(t) y_n(t) \end{cases}
$$

On résout la dernière ligne : $y_n(t) = C e^{\int \tau_{nn}(t)}$, puis l'avant-dernière ligne devient $y'_{n-1}(t) = \tau_{n-1,n-1} y_{n-1}(t) + \tau_{n-1,n} y_n(t)$. On résout cette équation avec second membre ; on résout de proche en proche jusqu'à $y_1$.

**Exemple.** Soit $A(t) = \begin{pmatrix} 7t & 10t \\ -3t & 4t \end{pmatrix}$. Résoudre $X'(t) = A(t) X(t)$ ; on calcule le polynôme caractéristique : $\chi_A = det(A(t) - X I_2) = \begin{vmatrix} 7t - X & 10t \\ -3t & 4t - X \end{vmatrix} = X^2 - tr(A(t)) X + det(A(t)) = X^2 - 11tX + 58t^2$. On calcule le discriminant $\Delta = (11t)^2 - 4 \times 58 t^2 = -111 t^2$.
Les valeurs propres de $A(t)$ sont les racines de $\chi_{A(t)}(X)$, soient : $\dfrac{11t \pm it\sqrt{111}}{2}$.
On a 2 valeurs propres distinctes, et la matrice $A(t)$ est de taille $2 \times 2$, donc elle est diagonalisable. Il faut calculer $P$ et finir l'exercice.
On cherche les $sep$ et on note $\lambda_\pm$ ces deux valeurs propres ; on résout $A(t) U = \lambda_\pm U$.
Pour $\lambda_+ := t\Big(\dfrac{11 + i\sqrt{111}}{2}\Big)$. On a $A(t) U = \lambda_+ U \Leftrightarrow t \begin{pmatrix} 7 & 10 \\ -3 & 4 \end{pmatrix} \begin{pmatrix} u_1 \\ u_2 \end{pmatrix} = \lambda_+ \begin{pmatrix} u_1 \\ u_2 \end{pmatrix}$.

$$
\begin{cases} 7u_1 + 10u_2 = \dfrac{(11 + i\sqrt{111}) u_1}{2} \\ -3u_1 + 4u_2 = \dfrac{(11 + i\sqrt{111}) u_2}{2} \end{cases}
$$

Donc $20 u_2 = -3 u_1 + i\sqrt{111} u_1$. Ainsi $sep(\lambda_+) = \left\{\begin{pmatrix} u_1 \\ u_2 \end{pmatrix} \in \mathbb{C}^2 \text{ tel que } 20 u_2 = -3 u_1 + i\sqrt{111} u_1\right\}$.
C'est une droite engendrée par $\begin{pmatrix} 20 \\ -3 + i\sqrt{111} \end{pmatrix}$.
De même, $sep(\lambda_-)$ est engendré par $\begin{pmatrix} 20 \\ -3 - i\sqrt{111} \end{pmatrix}$.
La matrice de passage est choisie comme :

$$
P = \begin{pmatrix} 20 & 20 \\ -3 + i\sqrt{111} & -3 - i\sqrt{111} \end{pmatrix}
$$

On a donc $A(t) = P \begin{pmatrix} \lambda_+(t) & 0 \\ 0 & \lambda_-(t) \end{pmatrix} P^{-1}$. On pose $Y = P^{-1} X$, de sorte que $X' = AX \Leftrightarrow Y' = DY$.

$$
\begin{cases} y'_1(t) = t\Big(\dfrac{11 + i\sqrt{111}}{2}\Big) y_1(t) \\ y'_2(t) = t\Big(\dfrac{11 - i\sqrt{111}}{2}\Big) y_2(t) \end{cases}
$$

On résout : $y_1(t) = C_1 e^{\frac{t^2}{4}(11 + i\sqrt{111})}$ et $y_2(t) = C_2 e^{\frac{t^2}{4}(11 - i\sqrt{111})}$.
Les solutions sont donc $X = PY$.

**Remarque.** Les solutions sont sous la forme $y_1(t) = C_1 e^{\frac{11 t^2}{4}} \Big(\cos\Big(\dfrac{\sqrt{111}}{4} t^2\Big) + i \sin\Big(\dfrac{\sqrt{111}}{4} t^2\Big)\Big)$.

### Le cas à coefficients constants

On cherche à résoudre $X' = AX$, où $A \in \mathcal{M}_n(\mathbb{C})$ ne dépend pas de $t$. On définit $\exp(A) \in \mathcal{M}_n(\mathbb{C})$ comme $\displaystyle\lim_{N \to +\infty} \sum_{n=0}^{N} \frac{A^n}{n!}$. Soit $f_A(t) = \exp(tA) = \displaystyle\sum_{n=0}^{\infty} \frac{t^n A^n}{n!}$. Alors $f'_A(t) = \displaystyle\sum_{n=0}^{+\infty} \frac{n t^{n-1} A^n}{n!} = \sum_{n=1}^{+\infty} \frac{t^{n-1}}{(n - 1)!} A^n = A \sum_{n=1}^{+\infty} \frac{(tA)^{n-1}}{(n - 1)!}$.

**Remarque.** (Sur l'exponentielle de matrices.) On a posé $\exp(A) = \displaystyle\sum_{0}^{+\infty} \frac{A^n}{n!}$. $A^n$ est une matrice dont les coefficients dépendent de $n$ de manière compliquée. Donc $\exp(A)$ est une matrice dont les coefficients sont des séries :

$$
\exp\begin{pmatrix} a & b \\ c & d \end{pmatrix} = \sum_{0}^{+\infty} \begin{pmatrix} a & b \\ c & d \end{pmatrix}^n
$$

sauf si $A$ est diagonale.
Si $f_A(t) = \exp(At)$, alors en dérivant la série, on a $f'_A(t) = A f_A(t) = f_A(t) A$. Mais dériver une somme infinie est délicat, cf. le cours sur les séries. Ici on admet que

$$
\Big(\sum_{0}^{+\infty} \frac{(tA)^n}{n!}\Big)' = \sum_{1}^{+\infty} \frac{n t^{n-1} A^n}{n!}
$$

**Proposition / Théorème.** Soit $A \in \mathcal{M}_n(\mathbb{K})$, qui ne dépend pas de $t$. Alors les solutions de $X'(t) = AX(t)$ sont $\{\exp(At) v, v \in \mathbb{K}^n\}$. En particulier, la solution du problème de Cauchy

$$
\begin{cases} X'(t) = AX(t) \\ X(t_0) = X_0 \end{cases}
$$

est $t \mapsto \exp((t - t_0) A) X_0$.

**Démonstration.** (À savoir.) Notons, pour $v$ fixé, $f_A(t) = \exp(At) v$. On a $f_A : I \to \mathbb{K}^n$ ; de plus, $f'_A(t) = A \exp(At) v = A f_A(t)$. Ainsi $f_A$ est solution de $X' = AX$. Réciproquement, soit $X$ une solution. Soit $g(t) = \exp(-At) X(t)$. Alors $g'(t) = -A \exp(-At) X(t) + \exp(-At) AX = 0$. Donc $g(t)$ est un vecteur constant noté $v$ et $\exp(-At) X(t) = v$, et $X(t) = \exp(At) v$. Ici on a utilisé que $\exp(At) \exp(-At) = \exp(0) = Id$.
Pour le problème de Cauchy : soit $\tilde{X}(t) = \exp((t - t_0) A) X_0$. Alors $\tilde{X}(t) = \exp(At)(\exp(-A t_0) X_0)$, donc c'est une solution de $X' = AX$. De plus $\tilde{X}(t_0) = \exp(0) X_0 = X_0$. $\square$

**Calcul.** On s'est ramené à calculer $\exp(At)$. On sait le faire si $A$ est diagonalisable. En effet si $A = P D P^{-1}$, où $P \in GL_n(\mathbb{K})$ et $D = \begin{pmatrix} \lambda_1 & & 0 \\ & \vdots & \\ 0 & & \lambda_n \end{pmatrix}$, alors $A^k = P \begin{pmatrix} \lambda_1^k & & 0 \\ & \vdots & \\ 0 & & \lambda_n^k \end{pmatrix} P^{-1}$, et pour $K \geq 1$, $\displaystyle\sum_{k=0}^{K} \frac{A^k}{k!} = \sum_{k=0}^{K} \frac{P D^k P^{-1}}{k!} = P\Big(\sum_{k=0}^{K} \frac{D^k}{k!}\Big) P^{-1}$.
Or $\dfrac{D^k}{k!} = \begin{pmatrix} \frac{\lambda_1^k}{k!} & & 0 \\ & \vdots & \\ 0 & & \frac{\lambda_n^k}{k!} \end{pmatrix}$, et $\displaystyle\sum_{0}^{K} \frac{D^k}{k!} \to \begin{pmatrix} e^{\lambda_1} & & 0 \\ & \vdots & \\ 0 & & e^{\lambda_n} \end{pmatrix}$, puis $P\Big(\displaystyle\sum_{0}^{K} \frac{D^k}{k!}\Big) P^{-1} \to P \begin{pmatrix} e^{\lambda_1} & & 0 \\ & \vdots & \\ 0 & & e^{\lambda_n} \end{pmatrix} P^{-1}$.
Ainsi, puisque $At = P \begin{pmatrix} \lambda_1 t & & 0 \\ & \vdots & \\ 0 & & \lambda_n t \end{pmatrix} P^{-1}$, on a $\exp(At) = P \begin{pmatrix} e^{\lambda_1 t} & & 0 \\ & \vdots & \\ 0 & & e^{\lambda_n t} \end{pmatrix} P^{-1}$.

### Équation différentielle d'ordre $p \geq 2$

Soit $(*)$ l'équation différentielle :

$$
y^{(p)} + a_{p-1}(t) y^{(p-1)}(t) + \dots + a_0(t) y(t) = b(t)
$$

$y : I \to \mathbb{K}$ est la fonction inconnue, $y^{(k)}$ est sa dérivée $k$-ième, et $p \in \mathbb{N}^*$ ; les $a_k$ sont des fonctions données, et $b$ aussi.
On introduit $Y(t) = \begin{pmatrix} y(t) \\ \vdots \\ y^{(p-1)}(t) \end{pmatrix}$. Alors $Y : I \to \mathbb{K}^p$ ; de plus on a :

$$
Y'(t) = \begin{pmatrix} y'(t) \\ \vdots \\ y^{(p)}(t) \end{pmatrix} = \begin{pmatrix} 0 & 1 & 0 & \dots & \dots & 0 \\ 0 & 0 & 1 & 0 & \dots & 0 \\ & & & \ddots & & \\ & & & & & 1 \\ -a_0(t) & \dots & & & & -a_{p-1}(t) \end{pmatrix} \begin{pmatrix} y(t) \\ \vdots \\ y^{(p-1)}(t) \end{pmatrix} + \begin{pmatrix} 0 \\ \vdots \\ 0 \\ b(t) \end{pmatrix}
$$

On obtient une équation du type $Y' = AY + B$. On résout l'équation homogène $Y' = AY$. On a (cf. chapitre sur les suites) : $A(t)$ est la matrice compagnon du polynôme $X^p + a_{p-1}(t) X^{p-1} + \dots + a_0(t)$. On a vu que $\chi_{A(t)}(X) = (X^p + a_{p-1}(t) X^{p-1} + \dots + a_0(t))(-1)^p$. On cherche les racines de $\chi_A$ afin de la diagonaliser.

**Exemple.** Si $A$ est à coefficients constants et $b = 0$, par exemple $y'' + \alpha y' + \beta y = 0$. On se ramène à $Y(t) = \begin{pmatrix} y(t) \\ y'(t) \end{pmatrix}$, puis $Y'(t) = \begin{pmatrix} 0 & 1 \\ -\beta & -\alpha \end{pmatrix} Y(t)$. On pose $A = \begin{pmatrix} 0 & 1 \\ -\beta & -\alpha \end{pmatrix}$, puis $\chi_A(X) = X^2 + \alpha X + \beta$.
On cherche les racines en résolvant $X^2 + \alpha X + \beta = 0$. On a 3 cas :

1. deux racines réelles ;
2. une racine double ;
3. deux racines complexes.

Pour 1 et 3, on peut la diagonaliser et calculer son exponentielle.
