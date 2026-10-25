---
title: "Réduction des endomorphismes"
description: "Réduction des endomorphismes et de leurs matrices : valeurs et vecteurs propres, sous-espaces propres, polynôme caractéristique, multiplicité, diagonalisation, polynômes annulateurs, théorème de Cayley-Hamilton, trigonalisation et application aux suites récurrentes linéaires."
sidebar_position: 3
---

## Valeurs propres et vecteurs propres

Ici $E$ désigne un espace vectoriel et $f \in \mathcal{L}(E)$.

**Définition 1.** Soit $\lambda \in \mathbb{K}$ ; on dit que $\lambda$ est une valeur propre (notée vp) de $f$ s'il existe $x \in E$ non nul tel que $f(x) = \lambda x$. On dit que $x \in E$ est vecteur propre de $f$ si $x \neq 0$ et s'il existe $\lambda \in \mathbb{K}$ tel que $f(x) = \lambda x$.
L'ensemble des valeurs propres de $f$ est le spectre de $f$, noté $sp(f)$ ; c'est un sous-ensemble de $\mathbb{K}$.

**Définition 1 bis.** Soit $A \in \mathcal{M}_n(\mathbb{K})$. De même : $\lambda$ est valeur propre de $A$ si $\exists X \neq 0$ tel que $AX = \lambda X$, où $X \in \mathbb{R}^n$, et $X$ est vecteur propre de $A$ si $X \neq 0$ et $\exists \lambda \in \mathbb{K}$ tel que $AX = \lambda X$.

**Remarque.** Soit $f \in \mathcal{L}(E)$, où $\dim(E) = n$. Soit $B$ une base de $E$ et $A = mat_B(f)$. Alors $\lambda$ est valeur propre de $f$ donc $\lambda$ est valeur propre de $A$. De plus, $x$ est vecteur propre de $f$ donc $X$ est vecteur propre de $A$, où $X = mat_B(x)$.

**Proposition 2.** Soit $f \in \mathcal{L}(E)$ et $E$ un espace vectoriel de dimension finie ($n = \dim(E)$). $\lambda \in sp(f) \Leftrightarrow f - \lambda I_d$ est non injectif $\Leftrightarrow \text{Ker}(f - \lambda I_d) \neq \{0\} \Leftrightarrow rg(f - \lambda I_d) < n$.

**Proposition 2 bis.** Soit $A \in \mathcal{M}_n(\mathbb{K})$. Alors $\lambda \in sp(A) \Leftrightarrow \text{Ker}(A - \lambda I_n) \neq \{0\} \Leftrightarrow A - \lambda I_n \notin GL_n(\mathbb{K}) \Leftrightarrow rg(A - \lambda I_n) < n$.
En particulier : $A \in GL_n(\mathbb{K}) \Leftrightarrow 0 \notin sp(A)$.

**Démonstration.** Soit $\lambda \in sp(f)$. Donc $\exists x \neq 0$ dans $E$ tel que $f(x) = \lambda x$. Donc $(f - \lambda I_d)(x) = 0$. Donc $x \in \text{Ker}(f - \lambda I_d)$. Donc $\text{Ker}(f - \lambda I_d) \neq \{0\}$ et $f - \lambda I_d$ est non injectif. La réciproque est vraie : si $\text{Ker}(f - \lambda I_d) \neq \{0\}$, $\exists x \neq 0$ dans $\text{Ker}(f - \lambda I_d)$, c'est-à-dire $\begin{cases} (f - \lambda I_d)(x) = 0 \\ x \neq 0 \end{cases} \Leftrightarrow \begin{cases} f(x) = \lambda x \\ x \neq 0 \end{cases} \Leftrightarrow \lambda \in sp(f)$. Puisque $\dim(E) < +\infty$, $f - \lambda I_d$ non injectif, c'est-à-dire $f - \lambda I_d$ non surjectif, donc $rg(f - \lambda I_d) < n$. $\square$

**Définition - Proposition 3.** Soit $f \in \mathcal{L}(E)$ et $\lambda \in sp(f)$. Si $x$ est tel que $x \neq 0$ et $f(x) = \lambda x$, on dit que $\lambda$ et $x$ sont valeur propre et vecteur propre associés. On appelle sous-espace propre associé à $\lambda$, noté parfois $sep(\lambda)$, le sev $\text{Ker}(f - \lambda I_d)$. Il est formé des vecteurs propres de $f$ associés à $\lambda$, ainsi que de 0.

**Démonstration.** Soit $x \in sep(\lambda)$, alors $(f - \lambda I_d)(x) = 0$, c'est-à-dire $f(x) = \lambda x$ : $x$ est vecteur propre associé à $\lambda$ (ou bien $x = 0$). $\square$

**Remarque.** Soit $f \in \mathcal{L}(E)$ et $\lambda \in sp(f)$. Alors $sep(\lambda)$ est un sev de $E$.

**Remarque.** $sep(\lambda)$ est un sev stable par $f$. De plus, la restriction de $f$ à ce sev est l'homothétie de rapport $\lambda$ :

$$
f_{|sep(\lambda)} = \lambda I_d
$$

**Rappel.** Soit $E$ un espace vectoriel ; l'homothétie de rapport $\lambda$ est l'application $\lambda I_d$. On la note $h_\lambda$ ; on a $\forall x \in E, h(x) = \lambda x$. Sa matrice dans n'importe quelle base est $\begin{pmatrix} \lambda & \dots & 0 \\ & \ddots & \\ 0 & \dots & \lambda \end{pmatrix} = \lambda I_n$.
On remarque que $sp(h) = \{\lambda\}$ et tout vecteur est vecteur propre associé.

**Exemples.** Soit $u \in \mathcal{L}(\mathbb{R}^2)$ défini par $u(e_1) = 2e_1$ et $u(e_2) = -e_2$. Alors $2 \in sp(u)$ et $e_1 \in sep(2)$, $-1 \in sp(u)$ et $e_2 \in sep(-1)$. La matrice de $u$ dans $B = (e_1, e_2)$ est $\begin{pmatrix} 2 & 0 \\ 0 & -1 \end{pmatrix}$.

Soit $A = \begin{pmatrix} 1 & \dots & 1 \\ \vdots & & \vdots \\ 1 & \dots & 1 \end{pmatrix}$. Déterminer les valeurs propres de $A$, et les vecteurs propres associés.

On résout l'équation aux valeurs propres $AX = \lambda X$ ; ici $\lambda$ et $X$ sont inconnus. Notons $X = \begin{pmatrix} x_1 \\ \vdots \\ x_n \end{pmatrix}$. Alors $AX = \lambda X \Leftrightarrow \begin{cases} x_1 + \dots + x_n = \lambda x_1 \\ \vdots \\ x_1 + \dots + x_n = \lambda x_n \end{cases}$. Donc $\lambda x_1 = \dots = \lambda x_n$. Donc soit $\lambda = 0$, soit $x_1 = \dots = x_n$.

- Si $\lambda = 0$, alors $x_1 + \dots + x_n = 0$.
- Si $x_1 = \dots = x_n$, alors $n x_1 = \lambda x_1$ ; si $x_1 = 0$, alors $X = 0$. Or on cherche des $X \neq 0$. Donc $x_1 \neq 0$.

Conclusion : $sp(A) = \{0, n\}$. De plus, $sep(0) = \{X \in \mathbb{R}^n, x_1 + \dots + x_n = 0\}$. C'est un hyperplan de $\mathbb{R}^n$. Une base en est $\begin{pmatrix} 1 \\ -1 \\ 0 \\ \vdots \\ 0 \end{pmatrix}, \begin{pmatrix} 1 \\ 0 \\ -1 \\ 0 \\ \vdots \\ 0 \end{pmatrix}, \dots, \begin{pmatrix} 1 \\ 0 \\ \vdots \\ 0 \\ -1 \end{pmatrix}$. On a aussi $sep(n) = \{X \in \mathbb{R}^n, x_1 = \dots = x_n\}$. C'est une droite engendrée par $\begin{pmatrix} 1 \\ \vdots \\ 1 \end{pmatrix}$.

**Remarque.** Soit $\phi : \begin{cases} \mathbb{R}^n \to \mathbb{R} \\ X \mapsto \sum_{i=1}^{n} x_i \end{cases}$. C'est une forme linéaire et donc $sep(0) = \text{Ker}(\phi)$ est bien un hyperplan. La base donnée doit être vérifiée (libre et génératrice).

**Remarque.** Donner les vecteurs propres de $f$ veut dire décrire les $sep$ en donnant leur dimension ainsi qu'une base.

**Proposition 4.** Soit $f \in \mathcal{L}(E)$, et soient $\lambda_1, \dots, \lambda_N$ des valeurs propres de $f$. Alors les $sep$ associés sont en somme directe.

**Démonstration.** (À savoir.) Par récurrence sur $N$ :

- **Initialisation.** Si $N = 2$. Supposons que $x_1 \in sep(\lambda_1)$ et $x_2 \in sep(\lambda_2)$ sont tels que $x_1 + x_2 = 0$. On applique $f$ : $f(x_1 + x_2) = f(x_1) + f(x_2) = 0 = \lambda_1 x_1 + \lambda_2 x_2$, donc $\begin{cases} x_1 + x_2 = 0 \\ \lambda_1 (x_1 + x_2) = 0 \end{cases}$, puis $(\lambda_2 - \lambda_1) x_2 = 0$. Or $\lambda_2 \neq \lambda_1$, donc $x_2 = 0$, puis $x_1 = -x_2 = 0$.
- **Hérédité.** Supposons la propriété vraie au rang $N$. Montrons qu'elle est vraie au rang $N + 1$ : soient $(x_i)_{i=1,\dots,N+1}$ avec $x_i \in sep(\lambda_i)$ tels que $\displaystyle\sum_{i=1}^{N+1} x_i = 0$. Alors, de même, $f(\sum x_i) = \displaystyle\sum_{1}^{N+1} \lambda_i x_i = 0$.
  On multiplie $\displaystyle\sum_{1}^{N+1} x_i$ par $\lambda_{N+1}$, et on le soustrait à $\displaystyle\sum_{1}^{N+1} \lambda_i x_i = 0$. On obtient $\displaystyle\sum_{i=1}^{N} (\lambda_{N+1} - \lambda_i) x_i = 0$.
  Or les $sep(\lambda_i)$, pour $i = 1, \dots, N$, forment $N$ $sep$. Par hypothèse de récurrence, ils sont en somme directe.
  Donc $\displaystyle\sum_{i=1}^{N} (\lambda_{N+1} - \lambda_i) x_i = 0 \Rightarrow (\lambda_{N+1} - \lambda_i) x_i = 0, \forall i \leq N$. La propriété est montrée au rang $N + 1$.

$\square$

**Exemple (hors programme).** Soit $E = C^\infty(\mathbb{R})$. Soit $D : \begin{cases} E \to E \\ f \mapsto f' \end{cases}$. Alors $D(f + \lambda g) = (f + \lambda g)' = f' + \lambda g'$. Donc $D \in \mathcal{L}(E)$.
De plus $\lambda \in sp(D) \Leftrightarrow \exists f \neq 0, D(f) = \lambda f \Leftrightarrow f' = \lambda f \Leftrightarrow f(x) = C e^{\lambda x}$, où $C \in \mathbb{R}$. Ainsi, tout $\lambda \in \mathbb{R}$ est vp et $sp(D) = \mathbb{R}$. Ici, $\dim(E) = +\infty$ ; en appliquant P4, on retrouve l'exercice 2 de la feuille 1 (les vp forment une famille libre puisque les $sep$ sont en somme directe).

## Polynôme caractéristique

**Définition - Proposition 1.** Soit $A \in \mathcal{M}_n(\mathbb{K})$. Alors la fonction $\begin{cases} \mathbb{K} \to \mathbb{K} \\ X \mapsto det(A - X I_n) \end{cases}$ est un polynôme, appelé "polynôme caractéristique". On le note souvent $\chi_A$.
De même, si $f \in \mathcal{L}(E)$, on définit $\chi_f(X) = det(f - X I_D)$, le polynôme caractéristique de $f$.

**Remarque.** Si $A$ est une matrice de $f$, alors par définition du déterminant on a $\chi_f = \chi_A$. On peut le vérifier : en effet si $A \sim B$, alors $A$ et $B$ représentent le même endomorphisme, et $B = P^{-1} A P$, où $P \in GL_n(\mathbb{K})$. Alors $\chi_B(X) = det(B - X I_n) = det(P^{-1} A P - X P^{-1} P) = det(P^{-1} (A - X I_n) P) = det(P^{-1}) det(A - X I_n) det(P) = det(A - X I_n) = \chi_A(X)$.
Ainsi "2 matrices semblables ont le même polynôme caractéristique". La réciproque est fausse : soient $A_1 = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}$ et $A_2 = \begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix}$. Alors $\chi_{A_1}(X) = det(A_1 - X I_2) = \begin{vmatrix} -X & 1 \\ 0 & -X \end{vmatrix} = X^2$ et $\chi_{A_2} = \begin{vmatrix} -X & 0 \\ 0 & -X \end{vmatrix} = X^2$.
Donc $\chi_{A_1} = \chi_{A_2}$. Mais $A_1$ n'est pas semblable à $A_2$.

**Exemple.** Soit $h_\lambda : \begin{cases} E \to E \\ x \mapsto \lambda x \end{cases}$. Alors dans n'importe quelle base $B$, $mat_B(h_\lambda) = \begin{pmatrix} \lambda & & 0 \\ & \ddots & \\ 0 & & \lambda \end{pmatrix}$. En effet, si $B = (e_1, \dots, e_n)$, $h_\lambda(e_1) = \lambda e_1 = \lambda e_1 + 0.e_2 + \dots + 0 e_n$. Donc la première colonne est $\begin{pmatrix} \lambda \\ 0 \\ \vdots \\ 0 \end{pmatrix}$, et pareil pour les autres colonnes ; ainsi : $\chi_{h_\lambda}(X) = det(h_\lambda - X I_n) = det(\lambda I_n - X I_n) = det((\lambda - X) I_n) = (\lambda - X)^n det(I_n) = (\lambda - X)^n$.

**Remarque.** Dans DP1, on a admis que $\chi_f$ est un polynôme. Cela se voit en développant : $\begin{vmatrix} a_{11} - X & a_{12} & a_{1n} \\ \vdots & \ddots & \vdots \\ a_{n1} & \dots & a_{nn} - X \end{vmatrix}$.

**Proposition 2.** Soit $A \in \mathcal{M}_n(\mathbb{K})$. Alors $\chi_A$ est de la forme :

$$
\chi_A(X) = (-1)^n \Big(X^n - tr(A) X^{n-1} + \underbrace{\dots}_{\text{coefficients pas gentils}} + (-1)^n det(A)\Big)
$$

**Démonstration.** (Partielle.) On développe $\begin{vmatrix} a_{11} - X & a_{21} & \dots & a_{1n} \\ \vdots & \vdots & \vdots & \vdots \\ a_{n1} & \dots & \dots & a_{nn} - X \end{vmatrix}$ par rapport à la première colonne :

$$
(a_{11} - X) \begin{vmatrix} a_{22} - X & \dots & a_{2n} \\ \vdots & \ddots & \vdots \\ a_{n2} & \dots & a_{nn} - X \end{vmatrix} + \sum_{i \geq 2} a_{i1} \underbrace{\text{cofacteur}(i, 1)}_{\text{déterminant de matrices du même type de taille } n - 1} = \dots = (a_{11} - X) \dots (a_{nn} - X) + \text{termes de degré} \leq n - 1
$$

$= (-X)^n + (-1)^{n-1} \Big(\displaystyle\sum_{i \geq 1} a_{ii}\Big) X^{n-1} + \dots +$ termes de degré (dur...).
De manière plus accessible : $\chi_A(0) = det(A - 0.I_n) = det(A)$. Ainsi, le terme constant de $\chi_A$ est $det(A)$. $\square$

**Démonstration.** (À savoir.)

- Si $n = 2$, on obtient avec $A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$ que

  $$
  \chi_A(X) = X^2 - (tr(A)) X + det(A) = X^2 - (a + d) X + (ad - bc)
  $$

- $deg(\chi_A) = n$, et $\chi_A(0) = det(A)$.

$\square$

**Exercice.** Retrouver par le calcul que, si $n = 2$, $\chi_A(X) = X^2 - tr(A) X + det(A)$. On a $\chi_A(X) = \begin{vmatrix} a - X & b \\ c & d - X \end{vmatrix} = \dots$

**Théorème III.3.** Soit $f \in \mathcal{L}(E)$. Alors le spectre de $f$ est constitué de l'ensemble des racines de $\chi_f$. Autrement dit, $\lambda \in sp(f) \Leftrightarrow \chi_f(\lambda) = 0$. Ou encore $sp(f) = \chi_f^{-1}(\{0\})$.

**Démonstration.** Soit $\lambda \in sp(f)$. Ceci équivaut à $f - \lambda Id$ non injectif $\Leftrightarrow det(f - \lambda I_d) = 0 \Leftrightarrow \chi_f(\lambda) = 0$. $\square$

**Exercice.** Calculer les valeurs propres et les vecteurs propres de $A = \begin{pmatrix} 1 & 2 \\ 2 & 1 \end{pmatrix}$.

On utilise le T3 : on calcule $\chi_A$ et on cherche ses racines : $\chi_A(X) = \begin{vmatrix} 1 - X & 2 \\ 2 & 1 - X \end{vmatrix} = (1 - X)^2 - 4 = (X + 1)(X - 3)$. Donc les racines de $\chi_A$ sont $-1$ et 3. Ainsi, puisque les valeurs propres sont les racines de $\chi_A$, on a que $sp(A) = \{-1, 3\}$.
On cherche les vecteurs propres associés, c'est-à-dire qu'on en déduit les $sep$ :

- pour $\lambda = -1$, on résout $AX = -X \Leftrightarrow \begin{cases} x + 2y = -x \\ 2x + y = -y \end{cases} \Leftrightarrow x + y = 0$. Ainsi, $(x, y) \in \text{Ker}(A + I_D) \Leftrightarrow x + y = 0$. Autrement dit : $sep(-1) = \text{Ker}(A + I_d) = \{(x, y) \in \mathbb{R}, x = -y\}$. C'est une droite, engendrée par $(1, -1)$ ;
- pour $\lambda = 3$, on résout $AX = 3X$, donc on résout $\begin{cases} x + 2y = 3x \\ 2x + y = 3y \end{cases} \Leftrightarrow x = y$. Ainsi, $\text{Ker}(A - 3 I_d) = \text{Vect}(1, 1)$ : c'est une droite.

**Corollaire 4.** Soit $E$ un espace vectoriel de dimension $n$ et soit $u \in \mathcal{L}(E)$. Alors $u$ a au plus $n$ valeurs propres distinctes.

**Démonstration.** Puisque les valeurs propres sont les racines de $\chi_u$ et que $deg(\chi_u) = n$, on déduit le corollaire. $\square$

En particulier $\text{card}(sp(u)) < +\infty$, pareil pour $A \in \mathcal{M}_n(\mathbb{K})$.

**Définition 5.** Soit $\lambda \in sp(u)$. On appelle "multiplicité" de $\lambda$, notée parfois $m(\lambda)$ ou $m_\lambda$, l'ordre de $\lambda$ en tant que racine du polynôme $\chi_u$.
Ainsi $m_\lambda$ est le plus grand nombre tel que $\chi_u(X) = (X - \lambda)^{m_\lambda} Q(X)$. Si $m_\lambda = 1$, alors on dit que $\lambda$ est racine simple.

**Proposition 6.** Soit $u \in \mathcal{L}(E)$ et $\lambda \in sp(u)$. Alors on a

$$
1 \leq \dim(\text{Ker}(u - \lambda I_d)) \leq m_\lambda
$$

**Démonstration.** (À savoir.) Puisque $\lambda \in sp(u)$, on a $\text{Ker}(u - \lambda I_d) \neq \{0\}$. Donc sa dimension est au moins 1.
On note $d_0 = \dim(\text{Ker}(u - \lambda I_d))$. Soit $(e_1, \dots, e_{d_0})$ une base de ce sev. On la complète en une base $B$ de $E$. Dans cette base, la matrice de $u$ est :

$$
\begin{pmatrix} \lambda & 0 & \dots & \dots & b & b \\ 0 & \lambda & 0 & \dots & b & b \\ \vdots & \vdots & \ddots & \vdots & c & c \\ 0 & 0 & 0 & 0 & c & c \end{pmatrix} = \begin{pmatrix} \lambda I_{d_0} & B \\ 0 & C \end{pmatrix}
$$

On a alors $\chi_u(X) = \begin{vmatrix} (\lambda - X) I_{d_0} & B \\ 0 & C - X I_{n - d_0} \end{vmatrix} = (\lambda - X)^{d_0} Q(X)$. Or $\chi_u = (X - \lambda)^{m_\lambda} \tilde{Q}(X)$, où $m_\lambda$ est le plus grand nombre possible pour cette écriture. Ainsi on a $d_0 \leq m_\lambda$. $\square$

**Corollaire 7.** Si $\lambda$ est simple, alors $\dim(\text{Ker}(u - \lambda I_d)) = 1$.

**Démonstration.** Par P6 on a $1 \leq d_0 \leq 1$. Donc $d_0 = 1$. $\square$

**Exemple.** Pour la matrice $A = \begin{pmatrix} 1 & 2 \\ 2 & 1 \end{pmatrix}$, on avait $m(-1) = \dim(\text{Ker}(A + I_2)) = 1$ et $m(3) = \dim(\text{Ker}(A - 3 I_2)) = 1$ ; ainsi les 2 valeurs propres sont simples.

## Diagonalisation

**Définition 1.** Soit $f \in \mathcal{L}(E)$. On dit que $f$ est diagonalisable s'il existe une base $B$ de $E$ telle que $mat_B(f)$ est diagonale. Soit $A \in \mathcal{M}_n(\mathbb{K})$. On dit que $A$ est diagonalisable si $A$ est semblable à une matrice diagonale, c'est-à-dire $\exists P \in GL_n(\mathbb{K})$ et $D$ diagonale telles que $A = P D P^{-1}$. Diagonaliser $A$ veut donc dire "trouver $D$ et $P$".

**Proposition 2.** Les points suivants sont équivalents :

1. $f$ est diagonalisable ;
2. il existe une base de $E$ formée de $\vec{vp}$ de $f$ ;
3. la somme des $sep$ de $f$ vaut $E$ ;
4. la somme des dimensions des $sep$ vaut $\dim(E)$.

**Démonstration.** On montre que 1 est équivalent à 2. Soit $B$ une base telle que $mat_B(f)$ est diagonale. On note $B = (e_1, \dots, e_n)$ et $\begin{pmatrix} \lambda_1 & & 0 \\ & \ddots & \\ 0 & & \lambda_n \end{pmatrix}$ la matrice. Par lecture, on a $f(e_i) = \lambda_i e_i$. Donc $e_i$ est un $\vec{vp}$ de $f$.
Réciproquement : si $(e_1, \dots, e_n)$ est une base de $\vec{vp}$, associés à des $vp$ $\lambda_1, \dots, \lambda_n$, dans cette base la matrice de $f$ est $\begin{pmatrix} \lambda_1 & & 0 \\ & \ddots & \\ 0 & & \lambda_n \end{pmatrix}$.
On montre que 2 implique 3. Soit $(e_1, \dots, e_n)$ une base de $\vec{vp}$. Alors chaque $e_i$ appartient à $\displaystyle\bigoplus_{\lambda \in sp(f)} \text{Ker}(f - \lambda I_d)$. Donc $\text{Vect}(e_1, \dots, e_n) \subset \bigoplus \text{Ker}(f - \lambda I_d)$. Donc $E = \bigoplus \text{Ker}(f - \lambda I_d)$.
On va montrer que 3 implique 4. On a vu que la somme des $sep$ est directe. Ainsi $\dim(E) = \dim\Big(\displaystyle\bigoplus_{\lambda \in sp(f)} \text{Ker}(f - \lambda I_d)\Big) = \sum_{\lambda \in sp(f)} \dim(\text{Ker}(f - \lambda I_d))$.
On va montrer que 4 implique 2. Supposons que $\displaystyle\sum_{\lambda \in sp(f)} \dim(\text{Ker}(f - \lambda I_d)) = \dim(E)$. Puisque la somme est directe, si $B_i$ est une base de $\text{Ker}(f - \lambda_i)$, pour $\lambda_i \in sp(f)$, on a $\bigcup B_i$ est une base de $E$. Donc 2. $\square$

**Exercice.** Pour notre matrice $A$, elle est diagonalisable car $\displaystyle\sum_{\lambda \in sp(A)} \dim(\text{Ker}(A - \lambda I_2)) = 1 + 1 = \dim(\mathbb{R}^2)$.

**Théorème III.3.** (Condition nécessaire et suffisante de diagonalisation) $f$ est diagonalisable si et seulement si

$$
\begin{cases} \chi_f \text{ est scindé sur } \mathbb{K} \\ \forall \lambda \in sp(f), \dim(\text{Ker}(f - \lambda I_d)) = m_\lambda \end{cases}
$$

**Rappel.** On dit que $P$ est scindé sur $\mathbb{K}$ s'il est de la forme $\prod (X - \lambda_i)^{m_i}$.

**Exemple.** $(X - 1) X (X + 2)$ est scindé (à racines simples), $X^2 + 1$ n'est pas scindé sur $\mathbb{R}$.

**Démonstration.** Supposons $f$ diagonalisable. Soit $\begin{pmatrix} \lambda_1 & & 0 \\ & \ddots & \\ 0 & & \lambda_n \end{pmatrix}$ sa matrice de diagonalisation. Alors $\chi_f(X) = \begin{vmatrix} \lambda_1 - X & & 0 \\ & \ddots & \\ 0 & & \lambda_n - X \end{vmatrix} = \displaystyle\prod_{i=1}^{n} (\lambda_i - X)$. De plus, par P2, $n = \displaystyle\sum_{\lambda \in sp(f)} \dim(\text{Ker}(f - \lambda I_d)) \leq \sum_{\lambda \in sp(f)} m(\lambda) = n$.
$\sum (m(\lambda) - \dim(\text{Ker}(f - \lambda I_d))) = 0$. Or par II-P6, ces termes sont supérieurs à 0. Donc ils sont nuls, et $\dim(\text{Ker}(f - \lambda I_d)) = m(\lambda)$. $\square$

**Réciproque.** Puisque $\displaystyle\sum_{\lambda \in sp(f)} \dim(\text{Ker}(f - \lambda I_d)) = \sum_{\lambda \in sp(f)} m(\lambda) = deg(\chi_f) = n$.

**Corollaire 4.** Si $f$ a $n$ valeurs propres distinctes (où $n = \dim(E)$), alors ces $vp$ sont simples et $f$ est diagonalisable.

**Démonstration.** $\displaystyle\sum_{\lambda \in sp(f)} \dim(sep(\lambda)) = \underbrace{1 + \dots + 1}_{n \text{ fois}} = \dim(E)$. Donc on applique P2. $\square$

**Exercice.** Soit $T$ une matrice triangulaire, avec des coefficients diagonaux distincts 2 à 2. Alors elle est diagonalisable.

**Solution.** Supposons que $T = \begin{pmatrix} \lambda_1 & \dots & \dots \\ & \ddots & \\ 0 & \dots & \lambda_n \end{pmatrix}$. On a $\chi_T(X) = det(T - X I_n) = \begin{vmatrix} \lambda_1 - X & \dots & \lambda_{1n} \\ & \ddots & \\ 0 & \dots & \lambda_n - X \end{vmatrix} = \displaystyle\prod_{i=1}^{n} (\lambda_i - X)$. Donc les éléments diagonaux sont des $vp$.

**Exercice.** Soit $A = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}$ ; est-elle diagonalisable ? Alors $\chi_A(X) = \begin{vmatrix} -X & 1 \\ 0 & -X \end{vmatrix} = X^2$. Donc $A$ n'a qu'une seule vp : 0. On a 2 méthodes de réponse :

1. On calcule $sep(0)$ : on résout $AX = 0$, on a donc $\begin{cases} y = 0 \\ 0 = 0 \end{cases}$. Donc $\dim(sep(0)) = 1$. Or 0 est de multiplicité 2. Ainsi $A$ est non diagonalisable.
2. Puisque 0 est la seule vp, si $A$ était diagonalisable elle serait semblable à $\begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix}$, c'est-à-dire $A = P O P^{-1} = 0$. Absurde car $A \neq 0$.

## Polynôme d'endomorphisme

Soit $P \in \mathbb{R}_n[X]$ un polynôme. On le note $P(X) = \displaystyle\sum_{k=0}^{N} a_k X^k$.

- Soit $A \in \mathcal{M}_n(\mathbb{K})$. On pose $P(A) = \displaystyle\sum_{k=0}^{N} a_k A^k$. Cela définit un élément de $\mathcal{M}_n(\mathbb{K})$. On parle d'un polynôme de matrice.
- Soit $E$ un espace vectoriel de dimension $n$, et $f \in \mathcal{L}(E)$. On pose $P(f) = \displaystyle\sum_{k=0}^{N} a_k f^k$, avec la convention $f^0 = I_d$. On parle d'un polynôme d'endomorphisme. On rappelle que $f^k = \underbrace{f \circ \dots \circ f}_{k \text{ fois}}$.

**Remarque.** Si $A$ est une matrice de $f$ dans une base $B$, alors $P(A)$ est une matrice de $P(f)$ dans la base $B$.

**Exemple.** Si $P(X) = X - 1$, alors $P(f) = f - I_d$.

**Proposition 2.** On dit que $\Phi : \begin{cases} P \mapsto P(f) \\ \mathbb{K}[X] \to \mathcal{L}(E) \end{cases}$ est un morphisme d'algèbre unitaire. Cela veut dire :

- $(P + \alpha Q)(f) = P(f) + \alpha Q(f)$
- $(PQ)(f) = P(f) \circ Q(f)$
- $1(f) = Id$

**Démonstration.** Évident ou admis. $\square$

**Rappel.** Si $f \in \mathcal{L}(E)$ et $g \in \mathcal{L}(E)$, alors en général, $f \circ g \neq g \circ f$. Si $A$ et $B$ sont dans $\mathcal{M}_n(\mathbb{K})$, alors en général $AB \neq BA$.

**Vocabulaire.** On dit que $f$ et $g$ commutent lorsque $f \circ g = g \circ f$. Pareil pour les 2 matrices.

**Proposition 3.** Si $f$ et $g$ commutent, alors tout polynôme en $f$ commute avec tout polynôme en $g$.

**Démonstration.** Soit $P$ et $Q$ deux polynômes, $P(X) = \displaystyle\sum_{0}^{N} a_k X^k$ et $Q(X) = \displaystyle\sum_{0}^{M} b_k X^k$.
On part de $f \circ g = g \circ f$. On compose par $f$ à gauche, donc $f^2 \circ g = f \circ f \circ g = f \circ g \circ f = g \circ f \circ f = g \circ f^2$.
De même, on prouve par récurrence que $f^k \circ g = g \circ f^k$ :
on suppose cela vrai au rang $k$ : $f^k \circ g = g \circ f^k \Rightarrow f \circ f^k \circ g = f \circ g \circ f^k = g \circ f^{k+1}$. La propriété est donc vraie.
On a $P(f) \circ g = \Big(\displaystyle\sum_{0}^{N} a_k f^k\Big) \circ g = \sum_{0}^{N} a_k (f^k \circ g) = \sum_{0}^{N} a_k g \circ f^k = g \circ \Big(\sum_{0}^{N} a_k f^k\Big) = g \circ P(f)$.
On a, en inversant les rôles, $Q(g) \circ P(f) = P(f) \circ Q(g)$. $\square$

**Proposition 3 bis.** Pareil pour les matrices.

**Définition 4.** Soit $f \in \mathcal{L}(E)$. On dit que $f$ annule $P$ lorsque $P(f) = 0$. On dit aussi que $P$ est annulateur de $f$.

**Exemple.** Soit $s$ une symétrie. Soit $P(X) = X^2 - 1$. Alors $P(s) = s^2 - I_d = 0$. Donc $s$ annule $P$. Soit $p$ un projecteur. Soit $Q(X) = X^2 - X$. Alors $Q(p) = p^2 - p = p \circ p - p = 0$. Donc $p$ annule $Q$.

**Proposition 5.** Soit $\lambda \in sp(f)$ et $x$ un $\vec{vp}$ associé. Alors $P(f) x = P(\lambda) x$.

**Démonstration.** (À savoir.) On a $f(x) = \lambda x$. Donc $f(f(x)) = f(\lambda x) \Leftrightarrow f \circ f(x) = \lambda f(x) = \lambda \lambda x = \lambda^2 x$. On itère : $\forall k \in \mathbb{N}, f^k(x) = \lambda^k x$, puis par combinaison linéaire : $\Big(\displaystyle\sum_{0}^{N} a_k f^k\Big)(x) = \sum_{0}^{N} (a_k \lambda^k x) = p(\lambda) x$. $\square$

**Corollaire 6.** Supposons que $f$ annule $P$ : alors $sp(f) \subset P^{-1}(\{0\})$ (c'est-à-dire que les valeurs propres de $f$ sont contenues dans les racines de $P$).

**Démonstration.** Si $P(f) = 0$, par P5, $p(\lambda) x = 0$ lorsque $\lambda \in sp(f)$. Or $\vec{x}$ est un $\vec{vp} \Rightarrow x \neq 0$. Donc $p(\lambda) = 0$. $\square$

**Exemple.** Si $s$ est une symétrie, quelles sont les valeurs propres possibles ? On a que $P(X) = X^2 - 1$ est annulateur de $s$. Donc $sp(f) \subset P^{-1}(\{0\})$. Or $P(X) = 0 \Leftrightarrow X^2 - 1 = 0 \Leftrightarrow X = 1$ ou $X = -1$. Donc les $vp$ d'une symétrie peuvent être 1 ou $-1$.

**Exemple.** Si $p$ est un projecteur, $sp(p) \subset \{0, 1\}$ (à faire).

**Remarque.** Le C6 donne un critère pour chercher les $vp$ de $f$. Mais C6 n'est qu'une inclusion ; par exemple si $f = I_d$ et $P(X) = X(X - 1)$, alors $sp(f) = \{1\}$, et $P(f) = I_d(I_d - I_d) = 0$, et $P^{-1}(\{0\}) = \{0, 1\}$.

**Théorème III.7.** Soit $E$ un espace vectoriel de dimension finie. Pour que $f$ soit diagonalisable, il faut et il suffit qu'il existe un polynôme annulateur scindé à racines simples.

**Démonstration.** Soit $f$ diagonalisable ; alors dans une base $B$ de $\vec{vp}$, $Mat_B(f) = \begin{pmatrix} \lambda_1 & & 0 \\ & \ddots & \\ 0 & & \lambda_n \end{pmatrix}$. Ici les $\lambda_i$ peuvent se répéter (ils ne sont pas différents deux à deux). Soient $(\mu_i)_{i=1,\dots,n}$ les $vp$ (sans répétitions). On pose $P(X) = \displaystyle\prod_{i=1}^{d} (X - \mu_i)$. Alors $P$ est scindé à racines simples. Soit $M$ la matrice ci-dessus, alors

$$
P(M) = \begin{pmatrix} 0 & & & & \\ & \ddots & & & \\ & & \mu_2 - \mu_1 & & \\ & & & \ddots & \\ & & & & \mu_d - \mu_1 \end{pmatrix} \begin{pmatrix} \mu_1 - \mu_2 & & & & \\ & 0 & & & \\ & & \mu_3 - \mu_2 & & \\ & & & \ddots & \\ & & & & \mu_d - \mu_2 \end{pmatrix} \cdots \begin{pmatrix} \mu_1 - \mu_d & & & & \\ & \ddots & & & \\ & & 0 & & \\ & & & \ddots & \\ & & & & 0 \end{pmatrix} = 0
$$

La réciproque est admise et repose sur le lemme des noyaux. $\square$

**Exercice.** Soit $A = \begin{pmatrix} 0 & 1 & \dots & 0 \\ \vdots & \ddots & \ddots & \vdots \\ 0 & \vdots & \ddots & 1 \\ 1 & 0 & \dots & 0 \end{pmatrix}$. Alors $A^n = ?$ Donc... on en déduit les $vp$ de $A$.

**Application.** Projecteurs et symétries sont diagonalisables.

**Exemple des symétries.** Soit $s$ tel que $s^2 = I_d$. Soit $P(X) = X^2 - 1$. Alors $P$ est annulateur de $s$. Or $P(X) = (X - 1)(X + 1)$ est scindé à racines simples. Donc $\begin{cases} 1 \text{ et } -1 \text{ sont les } vp \text{ possibles de } s \\ s \text{ est diagonalisable} \end{cases}$. On a donc $E = \displaystyle\bigoplus_{\lambda \in sp(s)} sep(\lambda) = \text{Ker}(s - I_d) \bigoplus \text{Ker}(s + I_d)$, si on suppose que 1 et $-1$ sont valeurs propres.

**Remarque.** Si $sp(s) = \{1\}$, $s = I_d$ (car $s$ a pour matrice $I_n$). Si $sp(s) = \{-1\}$, $s = -I_d$ (car $s$ a pour matrice $-I_n$). Si 1 et $-1$ sont $vp$, alors : $\text{Ker}(s - Id) = \{x \in E, sx = x\}$ est le plan de symétrie et $\text{Ker}(s + I_d) = \{x \in E, sx = -x\}$ est la direction de la symétrie.

**Théorème III.8.** (Théorème de Cayley-Hamilton) Soit $f \in \mathcal{L}(E)$ et $\chi_f$ son polynôme caractéristique. Alors $\chi_f(f) = 0$.

**Démonstration.** Ce n'est pas $\chi_f(f) = det(f - f I_d) = det(0) = 0$, car $\chi_f(X) := det(f - X I_d)$. On ne peut pas remplacer $X$ par $f$ ici. $\square$

**Une application des polynômes annulateurs.** Soit $A \in \mathcal{M}_n(\mathbb{K})$ et $P$ annulateur de $A$. Alors on peut calculer l'inverse de $A$ via $P$ :

- si $P = \chi_A$ et si $P(0) = 0$, alors $A$ n'est pas inversible, car $P(0) = det(A)$ ;
- si $P$ est un polynôme tel que $P(0) \neq 0$, alors $A$ est inversible. En effet si $P(X) = \displaystyle\sum_{k=0}^{d} a_k X^k$, alors $P(A) = 0 \Leftrightarrow a_0 I_d + a_1 A + \dots + a_d A^d = 0 \Leftrightarrow -\dfrac{1}{a_0}(a_1 A + \dots + a_d A^d) = I_d \Leftrightarrow A\Big[-\dfrac{1}{a_0}(a_1 I_d + \dots + a_d A^{d-1})\Big] = I_d$.
  Donc $A \in GL_n(\mathbb{K})$, et $A^{-1} = -\dfrac{1}{a_0}(a_1 I_d + \dots + a_d A^{d-1})$. Ceci permet d'exprimer $A^{-1}$ en fonction de puissances de $A$. C'est pratique si on connaît $\chi_A$.

## Trigonalisation

**Définition.** Un endomorphisme est trigonalisable s'il existe une base dans laquelle sa matrice est triangulaire. Une matrice est trigonalisable si elle est semblable à une matrice triangulaire : $A$ trigonalisable $\Leftrightarrow A = P T P^{-1}$, où $P \in GL_n(\mathbb{K})$ et $T$ triangulaire.

**Remarque.** Une matrice diagonalisable est trigonalisable (réciproque fausse).

**Théorème III.3.** Une matrice (ou l'endomorphisme qu'elle représente) est trigonalisable si et seulement si son polynôme caractéristique est scindé.

**Démonstration.** Soit $A$ une matrice.

- $\Rightarrow$ : $\exists P \in GL_n$ et $T = \begin{pmatrix} t_{11} & & \\ & \ddots & \\ 0 & & t_{nn} \end{pmatrix}$ tels que $A = P T P^{-1}$. Or 2 matrices semblables ont le même polynôme caractéristique. Ainsi $\chi_A(X) = det(T - X I_n) = \begin{vmatrix} t_{11} - X & & \\ & \ddots & \\ 0 & & t_{nn} - X \end{vmatrix} = \displaystyle\prod_{i=1}^{n} (t_{ii} - X)$ est scindé.
- $\Leftarrow$ : on le montre par récurrence sur $n$.
  - **Initialisation** $n = 1$. Les matrices sont des scalaires. Donc elles sont diagonales.
  - **Hérédité.** Supposons que la propriété est vraie au rang $n$. Soit $A \in \mathcal{M}_{n+1}(\mathbb{K})$ une matrice telle que $\chi_A$ est scindé. Puisque $\chi_A$ est scindé, il admet au moins une racine $\lambda_1$. C'est donc une valeur propre de $A$. Soit $x_1$ un vecteur propre associé. On complète ce vecteur en une base de $\mathbb{R}^{n+1}$. Soit $P$ la matrice de passage depuis la base canonique vers cette base. Alors $P^{-1} A P = \begin{pmatrix} \lambda_1 & l & \dots & l \\ 0 & a_1 & \dots & a_1 \\ \vdots & \vdots & \vdots & \vdots \\ 0 & a_1 & a_1 & a_1 \end{pmatrix}$, où $L \in \mathcal{M}_{1,n}$ et $A_1 \in \mathcal{M}_n$. Cette dernière matrice étant triangulaire par blocs, on a $\chi_A(X) = \begin{vmatrix} \lambda_1 - X & L \\ 0 & A_1 - X I_n \end{vmatrix} = (\lambda_1 - X) \chi_{A_1}(X)$.
    Or $\chi_{A_1}$ est scindé car $\chi_A$ l'est. Donc $A_1$ est trigonalisable par hypothèse de récurrence : $\exists T_1$ triangulaire, $\exists Q \in GL_n$, $A_1 = Q T_1 Q^{-1}$. Soit $R = \begin{pmatrix} 1 & 0 & \dots & 0 \\ 0 & q & \dots & q \\ \vdots & \vdots & \vdots & \vdots \\ 0 & q & \dots & q \end{pmatrix}$.
    Alors $\begin{pmatrix} \lambda_1 & L \\ 0 & A_1 \end{pmatrix} = R \begin{pmatrix} \lambda_1 & LQ \\ 0 & T_1 \end{pmatrix} R^{-1}$ (calcul à vérifier). Or la matrice $\begin{pmatrix} \lambda_1 & LQ \\ 0 & T_1 \end{pmatrix}$ est triangulaire. $A$ est semblable à cette matrice, elle est donc trigonalisable.

$\square$

**Corollaire 3.** Toute matrice est trigonalisable sur $\mathbb{C}$.

**Démonstration.** $\chi_A$ est un polynôme scindé par le théorème de d'Alembert. On applique ensuite T2. $\square$

**Exemple.** Les matrices nilpotentes. On dit que $A \in \mathcal{M}_n(\mathbb{K})$ est nilpotente s'il existe $k \in \mathbb{N}$ tel que $A^k = 0$. Par exemple : $A = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}$. Alors $A^2 = \begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix}$. Soit $P(X) = X^2$. Alors $P(A) = 0$, donc $P$ est annulateur de $A$. Donc $sp(A) \subset P^{-1}(\{0\}) = \{0\}$. Donc la seule valeur propre de $A$ est 0.
Si $A$ était diagonalisable, elle serait semblable à 0 (la matrice diagonale avec les valeurs propres sur la diagonale). Or $A$ semblable à 0 donne $A = P^{-1} 0 P = 0$. Or $A \neq 0$. Donc $A$ est non diagonalisable. On peut retrouver cela en analysant $sep(0)$ (déjà fait). Cette analyse est valable pour toute matrice nilpotente.

## Applications aux suites récurrentes linéaires

**But.** Que dire des suites suivantes : $u_{n+2} = u_{n+1} + u_n$ ? Et $\begin{cases} u_{n+1} = u_n + 3 v_n \\ v_{n+1} = 2 u_n - v_n \end{cases}$ ?

### Puissances des matrices

Soit $A \in \mathcal{M}_n(\mathbb{K})$. On veut calculer $A^k$. Voici 2 cas où on a une méthode :

- Si $A$ est diagonalisable, $A = P D P^{-1}$, où $D = \begin{pmatrix} \lambda_1 & & 0 \\ & \ddots & \\ 0 & & \lambda_n \end{pmatrix}$. Alors on a : $A^2 = P D P^{-1} P D P^{-1} = P D^2 P^{-1}$. De même, par récurrence évidente, $A^k = P D^k P^{-1}$. De plus $D^k = \begin{pmatrix} \lambda_1^k & & 0 \\ & \ddots & \\ 0 & & \lambda_n^k \end{pmatrix}$. Ceci permet de calculer $A^k$.
- Si $A$ est de la forme $A = \alpha I_d + N$, où $N$ est nilpotente. Soit $p$ tel que $N^p \neq 0$ et $N^{p+1} = 0$. Alors $A^k = (\alpha I_n + N)^k = \displaystyle\sum_{j=0}^{k} \binom{k}{j} (\alpha I_n)^{k-j} N^j = \sum_{j=0}^{p} \binom{k}{j} \alpha^{k-j} N^j$.

**Remarque.** Si $A$ et $B$ sont deux matrices, $(A + B)^2 = A^2 + B^2 + AB + BA$ : pas de binôme en général, sauf si $A$ et $B$ commutent.

**Exemple.** Si $A = \begin{pmatrix} 2 & 1 & 0 \\ 0 & 2 & 1 \\ 0 & 0 & 2 \end{pmatrix}$. Notons que $A = 2 I_3 + N$, où $N = \begin{pmatrix} 0 & 1 & 0 \\ 0 & 0 & 1 \\ 0 & 0 & 0 \end{pmatrix}$ ; alors $N^3 = 0$. Ainsi

$$
A^k = (2 I_3 + N)^k = \sum_{j=0}^{2} \binom{k}{j} \alpha^{k-j} N^j = 2^k I_3 + \binom{k}{1} 2^{k-1} N + \binom{k}{2} 2^{k-2} N^2 = \begin{pmatrix} 2^k & k 2^{k-1} & \dfrac{k(k-1)}{2} 2^{k-2} \\ 0 & 2^k & k 2^{k-1} \\ 0 & 0 & 2^k \end{pmatrix}
$$

### Systèmes de suites récurrentes

On considère $p$ suites $v^1, \dots, v^p$ où elles sont "couplées" par le système : $\begin{cases} u_{n+1}^1 = a_{11} u_n^1 + \dots + a_{1p} u_n^p \\ \vdots \\ u_{n+1}^p = a_{p1} u_n^1 + \dots + a_{pp} u_n^p \end{cases}$. On pose $X_n = \begin{pmatrix} u_n^1 \\ \vdots \\ u_n^p \end{pmatrix} \in \mathbb{R}^p$. Alors le système se réécrit $X_{n+1} = A X_n$, où $A = \begin{pmatrix} a_{11} & \dots & a_{1p} \\ \vdots & & \vdots \\ a_{p1} & \dots & a_{pp} \end{pmatrix}$. C'est une suite "géométrique" : on a $X_2 = A X_1 = A A X_0 = A^2 X_0$, puis par récurrence directe, $X_n = A^n X_0$. On peut avoir des formules pour les $(u_n^i)$ si on sait calculer $A^k$.

### Suites récurrentes d'ordre $p$

**Problématique.** On a une seule suite $(u_n)_{n \geq 0}$ qui vérifie :

$$
u_{n+p} = \sum_{i=0}^{p-1} a_i u_{n+i}
$$

**Exemple.** $u_{n+2} = u_{n+1} + u_n$ ; ici $p = 2$, $a_0 = a_1 = 1$.

**Résolution.** On va transformer ce problème "linéaire scalaire et d'ordre $p$" en un problème "vectoriel d'ordre 1". Pour cela, on pose $X_n = \begin{pmatrix} u_n \\ \vdots \\ u_{n+p-1} \end{pmatrix} \in \mathbb{K}^p$.
On a alors :

$$
X_{n+1} = \begin{pmatrix} u_{n+1} \\ \vdots \\ u_{n+p} \end{pmatrix} = \begin{pmatrix} 0 & 1 & 0 & \dots & 0 \\ 0 & 0 & 1 & \dots & 0 \\ & & & \ddots & \\ 0 & \dots & \dots & 0 & 1 \\ a_0 & \dots & \dots & \dots & a_{p-1} \end{pmatrix} \begin{pmatrix} u_n \\ \vdots \\ u_{n+p-1} \end{pmatrix} = A X_n
$$

On a à nouveau $X_n = A^n X_0$. La matrice $A$ a une forme particulière.

**Définition - Proposition.** Soit $P(X) = X^p - a_{p-1} X^{p-1} - \dots - a_0$. Alors $A$ est la matrice "compagnon" de $P$. On a ainsi $\chi_A(X) = (-1)^p P(X)$.

**Démonstration.** (Exercice classique.) On a $\chi_A(X) = det(A - X I_p) = \begin{vmatrix} -X & 1 & \dots & 0 \\ 0 & \ddots & \ddots & 0 \\ 0 & \dots & \ddots & 1 \\ a_0 & \dots & a_{p-2} & a_{p-1} - X \end{vmatrix}$. On fait $C_1 \leftarrow C_1 + X C_2$ : la première colonne devient

$$
\begin{pmatrix} 0 \\ -X^2 \\ 0 \\ \vdots \\ 0 \\ a_0 + X a_1 \end{pmatrix}
$$

On ajoute ensuite $X^2 C_3$ à $C_1$ :

$$
\begin{pmatrix} 0 \\ 0 \\ -X^3 \\ \vdots \\ a_0 + a_1 X + a_2 X^2 \end{pmatrix}
$$

Ainsi de suite, on trouve en ajoutant $X C_2 + \dots + X^{p-1} C_p$ à $C_1$ :

$$
\chi_A(X) = \begin{vmatrix} 0 & 1 & & 0 \\ \vdots & -X & \ddots & \\ 0 & 0 & \ddots & 1 \\ a_0 + a_1 X + \dots + (a_{p-1} - X) X^{p-1} & \dots & \dots & a_{p-1} - X \end{vmatrix} = (-1)^{p+2} P(X) \times \begin{vmatrix} 1 & & & 0 \\ -X & \ddots & & \\ & \ddots & \ddots & \\ 0 & & -X & 1 \end{vmatrix}
$$

Et donc $\chi_A(X) = (-1)^p P(X)$. $\square$

Ainsi, pour diagonaliser $A$ afin de calculer $A^n$, on doit résoudre $P(X) = 0$ pour chercher les valeurs propres.

**Lien avec l'an dernier.**

$$
u_{n+2} = a u_{n+1} + b u_n
$$

a pour équation $r^2 = ar + b$. Les racines sont en fait les valeurs propres de $\begin{pmatrix} 0 & 1 \\ b & a \end{pmatrix}$. De sorte que $\begin{pmatrix} 0 & 1 \\ b & a \end{pmatrix}^n = P \begin{pmatrix} \lambda_1^n & 0 \\ 0 & \lambda_2^n \end{pmatrix} P^{-1}$, où les $\lambda_i$ sont ses racines.
