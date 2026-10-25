---
title: "Variables aléatoires discrètes"
description: "Variables aléatoires discrètes : loi de probabilité, indépendance, lois de Poisson, géométrique et de Pascal, fonction de répartition, vecteurs aléatoires, espérance, moments, variance et covariance, inégalités de Markov et de Bienaymé-Tchebychev, fonctions génératrices."
sidebar_position: 2
---

## Définition, loi de probabilité d'une variable aléatoire

**Définition.** On appelle variable aléatoire (réelle) sur un espace probabilisé $(\Omega, \mathcal{F}, P)$ toute fonction $X$ de $\Omega$ dans $\mathbb{R}$ telle que $\forall A \in \mathcal{B}(\mathbb{R})$ (tribu borélienne),

$$
X^{-1}(A) = \lbrace \omega \in \Omega / X(\omega) \in A \rbrace = \lbrace X \in A \rbrace \in \mathcal{F}
$$

Si de plus $X(\Omega)$ est **fini ou dénombrable**, alors on dit que $X$ est une **variable aléatoire discrète**.

**Définition.** On appelle variable aléatoire discrète (réelle) sur un espace probabilisé $(\Omega, \mathcal{F}, P)$ toute fonction $X$ de $\Omega \to \mathbb{R}$ telle que $X(\Omega)$ est fini ou dénombrable (rappel : $X(\Omega) = \lbrace x \in \mathbb{R} | \exists \omega \in \Omega, X(\omega) = x \rbrace$) et $\forall x \in X(\Omega)$

$$
X^{-1}(\lbrace x \rbrace) = \lbrace \omega | X(\omega) = x \rbrace = \lbrace X = x \rbrace
$$

est un élément de la tribu $\mathcal{F}$. On note $P(X = x)$ ou parfois $P_X(\lbrace x \rbrace)$ la quantité

$$
P(X^{-1}(\lbrace x \rbrace)) = P(\lbrace \omega \in \Omega | X(\omega) = x \rbrace)
$$

Plus généralement, on écrit $P(X \in A) = P_X(A) = P(X^{-1}(A)) = P(\lbrace \omega \in \Omega | X(\omega) \in A \rbrace)$.

**Définition.** On appelle $P_X$ **la loi de probabilité** de la variable aléatoire $X$ (ou plus simplement la loi de $X$).

**Théorème II.1.** $P_X$ est une probabilité sur $X(\Omega)$ muni de la tribu $\mathcal{P}(X(\Omega))$.

*Démonstration.*

- $P_X(X(\Omega)) = P(X \in X(\Omega)) = P(X^{-1}(X(\Omega))) = P(\Omega) = 1$.
- Soit $(A_n)_{n \geq 1}$ une suite de parties de $X(\Omega)$, 2 à 2 disjointes. On a $P_X\left(\bigcup_{n=1}^{\infty} A_n\right) = P\left(X^{-1}\left(\bigcup_{n=1}^{\infty} A_n\right)\right)$. Or $X^{-1}\left(\bigcup_{n=1}^{\infty} A_n\right) = \bigcup_{n=1}^{\infty} X^{-1}(A_n)$ car

  $$
  \begin{aligned}
  \omega \in X^{-1}\left(\bigcup_{n=1}^{\infty} A_n\right) &\Leftrightarrow X(\omega) \in \bigcup_{n=1}^{\infty} A_n \\
  &\Leftrightarrow \exists n \geq 1, X(\omega) \in A_n \\
  &\Leftrightarrow \exists n \geq 1, \omega \in X^{-1}(A_n) \\
  &\Leftrightarrow \omega \in \bigcup_{n=1}^{\infty} X^{-1}(A_n)
  \end{aligned}
  $$

  Donc $P_X\left(\bigcup_{n=1}^{\infty} A_n\right) = P\left(\bigcup_{n=1}^{\infty} X^{-1}(A_n)\right)$. Enfin, si $i \neq j$, $X^{-1}(A_i) \cap X^{-1}(A_j) = \emptyset$ car on ne peut avoir $X(\omega) \in A_i$ et $X(\omega) \in A_j$ car $A_i \cap A_j = \emptyset$. Finalement, $P_X\left(\bigcup_{n=1}^{\infty} A_n\right) = \sum_{n=1}^{+\infty} P(X^{-1}(A_n)) = \sum_{n=1}^{+\infty} P_X(A_n)$.

**Réciproque.** Soit $X$ une application d'un espace probabilisable $(\Omega, \mathcal{F})$ à valeurs dans $\mathbb{R}$ telle que $X(\Omega)$ est fini ou dénombrable. Posons $X(\Omega) = \lbrace x_1, \dots, x_n, \dots \rbrace$ et soit d'autre part $(p_n)_{n \geq 1}$ une suite de nombres réels positifs avec $\sum_{n=1}^{+\infty} p_n = 1$. Alors il existe une probabilité $P$ sur $(\Omega, \mathcal{F})$ telle que, $\forall x_n$,

$$
P(X = x_n) = p_n
$$

## Indépendance de variables aléatoires

**Définition.** Soit $X$ et $Y$ deux variables aléatoires discrètes. On dit que $X$ et $Y$ sont indépendantes si et seulement si $\forall (x, y) \in X(\Omega) \times Y(\Omega)$, $P(X = x, Y = y) = P(X = x).P(Y = y)$.

**Propriétés.**

1. Si $X$ et $Y$ sont deux variables aléatoires discrètes indépendantes, alors $\forall A \in \mathcal{P}(X(\Omega))$ et $\forall B \in \mathcal{P}(Y(\Omega))$, $P(X \in A, Y \in B) = P(X \in A)P(Y \in B)$.

   *Démonstration.*

   $$
   \begin{aligned}
   P(X \in A, Y \in B) &= \sum_{x \in A, y \in B} P(X = x, Y = y) \\
   &= \sum_{x \in A, y \in B} P(X = x)P(Y = y) \\
   &= \sum_{x \in A} P(X = x) \sum_{y \in B} P(Y = y) \\
   &= P(X \in A)P(Y \in B)
   \end{aligned}
   $$

2. Soit $X$ et $Y$ deux variables aléatoires discrètes indépendantes et $f : X(\Omega) \to \mathbb{R}$ et $g : Y(\Omega) \to \mathbb{R}$ deux applications. Alors les variables aléatoires $f(X)$ et $g(Y)$ sont indépendantes (et elles sont discrètes).

   *Démonstration.* On a $P(f(X) = u, g(Y) = v) = P(X \in f^{-1}(\lbrace u \rbrace), Y \in g^{-1}(\lbrace v \rbrace)) = P(X \in f^{-1}(\lbrace u \rbrace)) \times P(Y \in g^{-1}(\lbrace v \rbrace))$ (avec la propriété 1)

   $$
   = P(f(X) = u) P(g(Y) = v)
   $$

**Définition.** On dit que $n$ variables aléatoires discrètes $X_1, \dots, X_n$ sont (mutuellement) indépendantes si et seulement si $\forall (x_1, \dots, x_n) \in X_1(\Omega) \times \dots \times X_n(\Omega)$

$$
P(X_1 = x_1, \dots, X_n = x_n) = P(X_1 = x_1) \times \dots \times P(X_n = x_n)
$$

**Définition.** Soit $I$ un ensemble fini ou dénombrable. On dit que les variables aléatoires (discrètes) $(X_i)_{i \in I}$ sont (mutuellement) indépendantes si et seulement si $\forall p \geq 2$, $\forall i_1, \dots, i_p$ ($i_j \neq i_k$), $X_{i_1}, \dots, X_{i_p}$ sont (mutuellement) indépendantes.

**Définition.** On dit que $n$ variables aléatoires $X_1, \dots, X_n$ sont identiquement distribuées si et seulement si $P_{X_1} = \dots = P_{X_n}$, c'est-à-dire si elles ont toutes la même loi de probabilité. De même, si $I$ est fini ou dénombrable, on dit que les variables aléatoires $X_i$, $i \in I$, sont identiquement distribuées si $\forall i, j \in I$, $P_{X_i} = P_{X_j}$.

## Exemples de lois de probabilité sur des ensembles dénombrables

### Loi de Poisson, convergence de la loi binomiale vers la loi de Poisson

**Définition.** On dit qu'une variable aléatoire discrète $X$ à valeurs dans $\mathbb{N}$ suit une loi de Poisson de paramètre $\lambda > 0$ si $\forall k \in \mathbb{N}$

$$
P(X = k) = e^{-\lambda} \frac{\lambda^k}{k!}
$$

On note $X \sim \mathcal{P}(\lambda)$. La loi de Poisson est fréquemment (mais pas uniquement) utilisée pour modéliser un nombre de phénomènes se produisant pendant un intervalle de temps donné. Par exemple, on considère la situation suivante sur un intervalle de temps $[0, T]$. Des personnes se présentent l'une après l'autre à un guichet. Soit $N_T$ la variable aléatoire représentant le nombre de personnes qui se sont présentées au guichet sur $[0, T]$. Plus généralement, $\forall t \in [0, T]$, on notera $N_t$ le nombre de personnes qui se sont présentées au guichet pendant l'intervalle de temps $[0, t]$. On supposera que $N_0 = 0$ et on fera en outre les hypothèses suivantes :

1. $\forall s_1, s_2, t_1, t_2$ avec $s_1 < s_2 \leq t_1 < t_2$, $N_{t_2} - N_{t_1}$ et $N_{s_2} - N_{s_1}$ sont des variables aléatoires indépendantes (hypothèse d'accroissements indépendants) ;
2. $\forall s < t$, la loi de probabilité de $N_t - N_s$ ne dépend que de l'écart $t - s$ (« stationnarité ») ;
3. (a) $P(N_{t+h} - N_t = 1) = \lambda h + o(h)$ quand $h \to 0$ ;

   (b) $P(N_{t+h} - N_t > 1) = o(h)$ quand $h \to 0$. Donc $P(N_{t+h} - N_t \geq 1) = \lambda h + o(h)$ quand $h \to 0$, et $P(N_{t+h} - N_t = 0) = 1 - \lambda h + o(h)$ quand $h \to 0$.

Posons ici $h = \dfrac{T}{n}$ (on divise l'intervalle $[0, T]$ en $n$ intervalles de longueur $\dfrac{T}{n}$). Alors $P(N_{i\frac{T}{n}} - N_{(i-1)\frac{T}{n}} \geq 1) = p_n$ avec $\displaystyle\lim_{n \to +\infty} \frac{p_n}{T/n} = \lambda \Leftrightarrow \lim_{n \to +\infty} n p_n = \lambda T$.

D'autre part, $P(N_{i\frac{T}{n}} - N_{(i-1)\frac{T}{n}} > 1) = o\left(\dfrac{T}{n}\right)$, donc

$$
\lim_{n \to +\infty} n P(N_{i\frac{T}{n}} - N_{(i-1)\frac{T}{n}} > 1) = 0
$$

Soit, $\forall 1 \leq i \leq n$,

$$
U_i = \begin{cases} 1 & \text{si une personne ou plus se présente au guichet dans l'intervalle } \left](i-1)\frac{T}{n}, i\frac{T}{n}\right] \\ 0 & \text{sinon} \end{cases}
$$

Les variables $U_i$ sont indépendantes et identiquement distribuées de loi de Bernoulli $\mathcal{B}(p_n)$. Donc $X_n = \sum_{i=1}^{n} U_i$ suit une loi binomiale $\mathcal{B}(n, p_n)$. Montrons que $P(N_T \neq X_n) \to 0$. En effet,

$$
P(N_T \neq X_n) = P\left(\left\lbrace N_{\frac{T}{n}} - N_0 > 1 \right\rbrace \cup \left\lbrace N_{\frac{2T}{n}} - N_{\frac{T}{n}} > 1 \right\rbrace \cup \dots \cup \left\lbrace N_T - N_{(n-1)\frac{T}{n}} > 1 \right\rbrace\right) \leq n P(N_{\frac{T}{n}} - N_0 > 1) \to 0
$$

Donc

$$
P(X_n = k) = \underbrace{P(X_n = k, N_T = X_n)}_{P(N_T = k, N_T = X_n)} + \underbrace{P(X_n = k, N_T \neq X_n)}_{\to 0}
$$

$$
\begin{aligned}
\lim_{n \to +\infty} P(X_n = k) &= \lim_{n \to +\infty} P(N_T = k, N_T = X_n) \\
&= \lim_{n \to +\infty} \left[P(N_T = k) - P(N_T = k, N_T \neq X_n)\right] \\
&= P(N_T = k)
\end{aligned}
$$

Calculons $\displaystyle\lim_{n \to +\infty} P(X_n = k) = \lim_{n \to +\infty} C_n^k p_n^k (1 - p_n)^{n-k} \approx \frac{n(n-1) \times \dots \times (n-k+1)}{k!} \frac{(\lambda T)^k}{n^k} (1 - p_n)^{n-k}$ (car $p_n \sim \dfrac{\lambda T}{n}$).

On voit que $\dfrac{n(n-1) \times \dots \times (n-k+1)}{n^k} \to 1$. De plus

$$
\begin{aligned}
(1 - p_n)^{n-k} &= \exp((n-k) \ln(1 - p_n)) \\
&= \exp((n-k)(-p_n + o(p_n)))
\end{aligned}
$$

Comme $\dfrac{o(p_n)}{\lambda T / n} \to 0$, on a $(n-k)o(p_n) \to 0$ et $\lim (n-k)p_n = \displaystyle\lim_{n \to +\infty} n p_n = \lambda T$. Donc finalement $(1 - p_n)^{n-k} \to e^{-\lambda T}$. D'où

$$
\lim_{n \to +\infty} P(X_n = k) = e^{-\lambda T} \frac{(\lambda T)^k}{k!} = P(N_T = k)
$$

(loi de Poisson de paramètre $\lambda T$ : $N_t \sim \mathcal{P}(\lambda T)$).

**Théorème II.2.** Soit $\lambda > 0$ et $(X_n)_{n \geq 1}$ une suite de variables aléatoires de loi binomiale $\mathcal{B}(n, p_n)$, où $p_n$ est une suite telle que $\displaystyle\lim_{n \to +\infty} n p_n = \lambda$. Alors, $\forall k \in \mathbb{N}$, $\displaystyle\lim_{n \to +\infty} P(X_n = k) = e^{-\lambda} \frac{\lambda^k}{k!}$.

En pratique, on peut approcher la loi binomiale par la loi de Poisson dès que

$$
\begin{cases} p < 0{,}1 \\ n > 30 \\ \lambda = np < 16 \end{cases} \qquad (\text{où } np(1-p) < 10)
$$

**Théorème II.3.** Soit $X$ et $Y$ deux variables aléatoires indépendantes avec $X \sim \mathcal{P}(\lambda)$ et $Y \sim \mathcal{P}(\mu)$. Alors $X + Y \sim \mathcal{P}(\lambda + \mu)$.

*Démonstration.* $\forall n \in \mathbb{N}$,

$$
\begin{aligned}
P(X + Y = n) &= \sum_{k=0}^{n} P(X = k, Y = n - k) = \sum_{k=0}^{n} P(X = k)P(Y = n - k) \\
&= \sum_{k=0}^{n} e^{-\lambda} \frac{\lambda^k}{k!} e^{-\mu} \frac{\mu^{n-k}}{(n-k)!} = e^{-(\lambda + \mu)} \frac{1}{n!} \sum_{k=0}^{n} \frac{n!}{k!(n-k)!} \lambda^k \mu^{n-k} = e^{-(\lambda + \mu)} \frac{(\lambda + \mu)^n}{n!}
\end{aligned}
$$

(binôme de Newton).

### Loi géométrique

Considérons l'une des situations suivantes.

1. Une urne contient une proportion $p$ de boules blanches (et une proportion $1 - p$ de boules noires). On effectue des tirages avec remise jusqu'à ce qu'on obtienne une boule blanche.
2. On lance une pièce jusqu'à obtenir « face ».
3. On lance un dé jusqu'à obtenir un « 6 ».

On définit la variable aléatoire $X$ à valeurs dans $\mathbb{N}^* \cup \lbrace \infty \rbrace$ par $X$ le numéro du tirage où on tire la première boule blanche ($X = +\infty$ si on ne tire jamais de boule blanche). Posons $\forall i \geq 1$

$$
X_i = \begin{cases} 1 & \text{si on tire une boule blanche au tirage } i \\ 0 & \text{sinon} \end{cases}
$$

La suite $(X_i)_{i \geq 1}$ est une suite de variables aléatoires indépendantes et identiquement distribuées de loi de Bernoulli $\mathcal{B}(p)$. On a donc $P(X_i = 1) = p \Leftrightarrow P(X_i = 0) = 1 - p$, $\forall i \geq 1$. On peut écrire

$$
\begin{aligned}
P(X = 1) &= P(X_1 = 1) = p \\
P(X = 2) &= P(X_1 = 0).P(X_2 = 1) = (1 - p)p \\
&\ \ \vdots \\
P(X = n) &= P(X_1 = 0, \dots, X_{n-1} = 0, X_n = 1) = P(X_1 = 0) \times \dots \times P(X_{n-1} = 0).P(X_n = 1) = (1 - p)^{n-1}.p
\end{aligned}
$$

**Propriété.** $P(X > n) = P(X_1 = 0, \dots, X_n = 0) = (1 - p)^n \Rightarrow P(X \leq n) = 1 - (1 - p)^n$.

On en déduit la valeur de $P(X = +\infty)$ car

$$
\lbrace X = +\infty \rbrace = \bigcap_{n \geq 1} \lbrace X > n \rbrace
$$

est donc $P(X = +\infty) = \displaystyle\lim_{n \to +\infty} P(X > n) = \lim_{n \to +\infty} (1 - p)^n = \begin{cases} 0 & \text{si } p > 0 \\ 1 & \text{si } p = 0 \end{cases}$.

On dit que $X$ suit une loi géométrique de paramètre $p$ et on note $X \sim \mathcal{G}(p)$.

**Remarque.** On appelle parfois loi géométrique la loi de la variable aléatoire $\tilde{X}$ égale au nombre de tirages (ou boules noires) **avant** l'apparition de la première boule blanche. Alors $\tilde{X}$ est une variable aléatoire à valeurs dans $\mathbb{N} \cup \lbrace +\infty \rbrace$. On voit que $\tilde{X} = X - 1$. Donc $P(\tilde{X} = n) = P(X = n + 1) = (1 - p)^n.p$. On note parfois $\tilde{X} \sim \mathcal{G}_{\mathbb{N}}(p)$.

### Loi de Pascal (ou binomiale négative)

C'est une généralisation de la loi géométrique. Considérons une urne contenant une proportion $p$ de boules blanches. On effectue des tirages avec remise jusqu'à l'apparition de la $r$-ième boule blanche. Soit $X_r$ le numéro du tirage où on tire une boule blanche pour la $r$-ième fois ($r = 1 \to$ loi géométrique). Déterminons la loi de probabilité de $X_r$.

$$
X_r(\Omega) = \lbrace r, r + 1, \dots \rbrace \cup \lbrace \infty \rbrace
$$

$\forall n \geq r$, $P_{X_r}(n) = P(X_r = n) = P(X_1 + \dots + X_{n-1} = r - 1, X_n = 1) = P(X_1 + \dots + X_{n-1} = r - 1).P(X_n = 1)$, avec $X_1 + \dots + X_{n-1} \sim \mathcal{B}(n - 1, p)$.

$$
\begin{aligned}
\Leftrightarrow P(X_r = n) &= P(\mathcal{B}(n - 1, p) = r - 1) \\
&= C_{n-1}^{r-1} p^{r-1} (1 - p)^{n-r}.p \\
&= C_{n-1}^{r-1} p^r (1 - p)^{n-r}
\end{aligned}
$$

On dit que $X_r$ suit une loi de Pascal (ou binomiale négative) de paramètres $r$ et $p$.

$$
X_r \sim Pa(r, p)
$$

Posons $U_i = \begin{cases} 1 & \text{si on tire une boule blanche au tirage } i \\ 0 \end{cases}$

**Propriété.**

1. $P(X_r > n) = P(U_1 + \dots + U_n < r) = P(\mathcal{B}(n, p) < r)$.
2. On pose $Y_1 = X_1$, $Y_2 = X_2 - X_1$, …, $Y_r = X_r - X_{r-1}$. Alors les variables aléatoires $(Y_i)_{1 \leq i \leq r}$ sont indépendantes et identiquement distribuées de la loi géométrique de paramètre $p$. En résumé, la loi de Pascal de paramètres $r$ et $p$ est obtenue comme la loi de probabilité de la somme de $r$ variables aléatoires indépendantes et identiquement distribuées de la loi géométrique de paramètre $p$.

**Remarque.** Une conséquence de ce résultat est qu'étant données 2 variables aléatoires $X$ et $Y$ indépendantes, avec $X \sim Pa(r, p)$ et $Y \sim Pa(r', p)$, alors $X + Y \sim Pa(r + r', p)$.

**Remarque.** On appelle parfois **la loi binomiale négative** la loi de la variable aléatoire $Z_r$ égale au nombre de boules noires tirées avant l'apparition de la $r$-ième boule blanche. Ainsi $Z_r = X_r - r$ et donc $\forall n \geq 0$

$$
P(Z_r = n) = P(X_r = n + r) = C_{n+r-1}^{r-1} p^r (1 - p)^n
$$

## Fonctions de répartition

**Définition.** Soit $X$ une variable aléatoire réelle. On appelle fonction de répartition de $X$ et on note $F_X$ la fonction :

$$
F_X = \begin{cases} \mathbb{R} \to [0, 1] \\ x \mapsto F_X(x) = P(X \leq x) \end{cases}
$$

**Propriétés.**

1. $F_X$ est croissante (au sens large).

   *Démonstration.* $x_1 \leq x_2 \Rightarrow \lbrace X \leq x_1 \rbrace \subset \lbrace X \leq x_2 \rbrace \Rightarrow P(X \leq x_1) \leq P(X \leq x_2)$.

2. $\displaystyle\lim_{x \to +\infty} F_X(x) = 1$.

   *Démonstration.* On a $\bigcup_{n \geq 1} \lbrace X \leq n \rbrace = \lbrace X \in \mathbb{R} \rbrace$. D'où, si $X$ est à valeurs dans $\mathbb{R}$, on a $\displaystyle\lim_{n \to +\infty} P(X \leq n) = P(X \in \mathbb{R}) = 1$ (propriété 8.a).

   **Remarque.** Si $X$ est à valeurs dans $\overline{\mathbb{R}} = [-\infty, +\infty]$ (fermeture de $\mathbb{R} = \mathbb{R} \cup \lbrace -\infty, +\infty \rbrace$), avec $P(X = -\infty) = \alpha$ et $P(X = +\infty) = \beta$. Alors $\bigcup_{n \geq 1} \lbrace X \leq n \rbrace \cup \lbrace X = +\infty \rbrace = \lbrace X \in \overline{\mathbb{R}} \rbrace = \Omega$. D'où $\displaystyle\lim_{n \to +\infty} P(X \leq n) + P(X = +\infty) = 1 \Rightarrow \lim_{n \to +\infty} P(X \leq n) = 1 - \beta$.

   $\omega \in \bigcup_{n=1}^{\infty} \lbrace X \leq n \rbrace \Leftrightarrow \exists n \geq 1$ tel que $X(\omega) \leq n$.

3. $\displaystyle\lim_{x \to -\infty} F_X(x) = 0$.

   *Démonstration.* Si $X$ est à valeurs dans $\mathbb{R}$, $\bigcap_{n \geq 1} \lbrace X \leq -n \rbrace = \emptyset \Rightarrow \displaystyle\lim_{n \to +\infty} P(X \leq -n) = P(\emptyset) = 0$ (d'après la propriété 8.b).

   **Remarque.** Si $P(X = -\infty) = \alpha$, alors $\bigcap_{n \geq 1} \lbrace X \leq -n \rbrace = \lbrace X = -\infty \rbrace \Rightarrow \displaystyle\lim_{n \to +\infty} P(X \leq -n) = P(X = -\infty) = \alpha$.

4. $\forall x \in \mathbb{R}$, $F_X$ est continue à droite au point $x$.

   *Démonstration.* $\lbrace X \leq x \rbrace = \bigcap_{n \geq 1} \left\lbrace X \leq x + \dfrac{1}{n} \right\rbrace$, donc $P(X \leq x) = \displaystyle\lim_{n \to +\infty} P\left(X \leq x + \frac{1}{n}\right) \Rightarrow F_X(x) = \lim_{n \to +\infty} F_X\left(x + \frac{1}{n}\right)$, $\forall x \in \mathbb{R}$. La fonction $F_X$ admet une limite à gauche et $\displaystyle\lim_{\epsilon \to 0^+} F_X(x - \epsilon) = P(X < x)$ :

   $$
   \lbrace X < x \rbrace = \bigcup_{n \geq 1} \left\lbrace X \leq x - \frac{1}{n} \right\rbrace \Rightarrow P(X < x) = \lim_{n \to +\infty} P\left(X \leq x - \frac{1}{n}\right) = \lim_{n \to +\infty} F_X\left(x - \frac{1}{n}\right)
   $$

   On dit aussi que $F_X$ est une fonction continue à droite et limitée à gauche (« càdlàg »).

### Lien entre la loi de probabilité et la fonction de répartition (variable aléatoire discrète)

Étant donnée une variable discrète $X$, $\forall x \in X(\Omega)$,

$$
P_X(x) = P(X = x) \qquad \text{(loi de probabilité)}
$$

On voit que $F_X(x) = P(X \leq x) = \displaystyle\sum_{t \in ]-\infty, x] \cap X(\Omega)} P(X = t)$.

Réciproquement, $\forall x \in X(\Omega)$, on peut écrire

$$
P_X(x) = P(X = x) = P(X \leq x) - P(X < x) = F_X(x) - \lim_{n \to +\infty} F_X\left(x - \frac{1}{n}\right)
$$

**Exemple.** Soit $X$ le résultat du lancer d'un dé équilibré (loi uniforme discrète sur $[1, \dots, 6]$), $P_X(i) = \dfrac{1}{6}$, $\forall i$. On voit que $\lbrace F_X(x) = c, \forall x < 1 \rbrace$.

### Rappel : fonction en escalier

**Définition (subdivision d'un segment).** Soit $a, b \in \mathbb{R}$, avec $a < b$. On appelle subdivision du segment $[a, b]$ toute famille **finie** de réels $\sigma = (a_0, a_1, \dots, a_n)$ telle que $a = a_0 < a_1 < a_2 < \dots < a_{n-1} < a_n = b$.

**Définition (fonction en escalier).** Une fonction $f : [a, b] \to \mathbb{R}$ est dite en escalier s'il existe une subdivision $\sigma = (a_0, a_1, \dots, a_n)$ de $[a, b]$ telle que $f$ soit constante sur chaque intervalle $]a_{i-1}, a_i[$, $1 \leq i \leq n$.

**Proposition.**

1. Soit $X$ une variable aléatoire discrète à valeurs dans $X(\Omega)$ fini. Alors sa fonction de répartition est une fonction en escalier.
2. Si $X$ est une variable aléatoire discrète à valeurs dans $X(\Omega)$ dénombrable (infini) et si de plus il existe $\phi : \mathbb{N} \to X(\Omega)$ (ou plus généralement $\phi : \mathbb{Z} \to X(\Omega)$) telle que $\phi(n + 1) > \phi(n)$ et $\displaystyle\lim_{n \to +\infty} \phi(n) = +\infty$, alors la fonction de répartition $F_X$ est une fonction en escalier (sur tout intervalle $[a, b]$).

**Remarque.** Si $\displaystyle\lim_{n \to +\infty} \phi(n) = b \in \mathbb{R}$, alors $\forall m$, $F_X$ n'est pas en escalier sur $\left[b - \dfrac{1}{m}, b\right]$.

**Contre-exemple remarquable.** Soit $X$ et $Y$ deux variables aléatoires indépendantes de loi géométrique de paramètre $p \in ]0, 1[$ et posons $Z = \dfrac{X}{Y}$. Alors $\forall s \in \mathbb{Q}^*_+$, $P(Z = s) > 0$ et de plus $\forall 0 < a < b$, $\exists s \in \mathbb{Q}^*_+ \cap ]a, b[$. Donc $F_Z$ ne peut être constante sur aucun intervalle $]a, b[$, et finalement $F_Z$ n'est pas en escalier (sur aucun intervalle $]a, b[$).

**Proposition.** Si la fonction de répartition $F_X$ d'une variable aléatoire $X$ est continue, alors $X$ n'est pas discrète.

*Démonstration.* Supposons que $X(\Omega)$ est un ensemble fini ou dénombrable. Comme $F_X$ est continue, alors $\forall x \in X(\Omega)$

$$
P(X = x) = P(X \leq x) - P(X < x) = 0
$$

$$
P(X = x) = F_X(x) - \lim_{\epsilon \to 0^+} F_X(x - \epsilon) = F_X(x)
$$

D'où une contradiction (en effet, si $X$ est discrète, on doit avoir

$$
\sum_{x \in X(\Omega)} P(X = x) = 1
$$

).

## Vecteurs aléatoires, couples de variables aléatoires

**Définition.** On appelle vecteur aléatoire de dimension $n$ sur $(\Omega, \mathcal{F}, P)$ toute application $X = (X_1, \dots, X_n)$ de $\Omega \to \mathbb{R}^n$ où $\forall 1 \leq i \leq n$, $X_i$ est une variable réelle. Dans le cas où les variables aléatoires $X_i$ sont discrètes ($\forall i$, $X_i(\Omega)$ fini ou dénombrable), on parlera de vecteur aléatoire discret. Dans le cas où $n = 2$, étant données deux variables aléatoires $X$ et $Y$, on dit que $(X, Y)$ est un couple de variables aléatoires.

### Loi de probabilité d'un vecteur aléatoire

Soit $(X_1, \dots, X_n)$ un vecteur aléatoire discret. On appelle loi de probabilité du vecteur $(X_1, \dots, X_n)$ la probabilité sur $X_1(\Omega) \times \dots \times X_n(\Omega)$ munie de la tribu $\mathcal{P}(X_1(\Omega) \times \dots \times X_n(\Omega))$, notée $P_{X_1, \dots, X_n}$, définie par $\forall (x_1, \dots, x_n) \in X_1(\Omega) \times \dots \times X_n(\Omega)$

$$
\begin{aligned}
P_{X_1, \dots, X_n}(x_1, \dots, x_n) &= P((X_1, \dots, X_n) = (x_1, \dots, x_n)) \\
&= P(X_1 = x_1, \dots, X_n = x_n)
\end{aligned}
$$

Ainsi, étant données deux variables aléatoires discrètes $X$ et $Y$, on appelle loi du couple $(X, Y)$ la probabilité $P_{X,Y}$ définie par

$$
P_{X,Y}(x, y) = P(X = x, Y = y) \quad \forall x \in X(\Omega), y \in Y(\Omega)
$$

### Fonction de répartition d'un vecteur aléatoire

**Définition.** On appelle fonction de répartition du vecteur aléatoire $(X_1, \dots, X_n)$, et on note $F_{X_1, \dots, X_n}$, la fonction

$$
F_{X_1, \dots, X_n} : \mathbb{R}^n \to [0, 1]
$$

$$
F_{X_1, \dots, X_n} \begin{cases} \mathbb{R}^n \to [0, 1] \\ (x_1, \dots, x_n) \mapsto F_{X_1, \dots, X_n}(x_1, \dots, x_n) = P(X_1 \leq x_1, \dots, X_n \leq x_n) \end{cases}
$$

Dans le cas d'un couple de variables aléatoires $(X, Y)$, on définit la fonction de répartition du couple $(X, Y)$ par

$$
F_{X,Y} : \begin{cases} \mathbb{R}^2 \to [0, 1] \\ (x, y) \mapsto F_{X,Y}(x, y) = P(X \leq x, Y \leq y) \end{cases}
$$

### Lien avec l'indépendance

**Théorème II.4.** Soit $X_1, \dots, X_n$ $n$ variables réelles ; alors les variables aléatoires $X_1, \dots, X_n$ sont (mutuellement) indépendantes si et seulement si $\forall (x_1, \dots, x_n) \in \mathbb{R}^n$, $F_{X_1, \dots, X_n}(x_1, \dots, x_n) = F_{X_1}(x_1) \times \dots \times F_{X_n}(x_n)$. En particulier, deux variables aléatoires $X$ et $Y$ sont indépendantes si et seulement si $\forall (x, y) \in \mathbb{R}^2$, $F_{X,Y}(x, y) = F_X(x)F_Y(y)$.

### Lois marginales

**Définition.** Soit $(X_1, \dots, X_n)$ un vecteur aléatoire de loi $P_{X_1, \dots, X_n}$. Alors la loi de probabilité $P_{X_i}$ des variables aléatoires $X_i$, $1 \leq i \leq n$, est appelée « loi marginale ».

**Remarque.** $P_{X_i}(A_i) = P_{X_1, \dots, X_i, \dots, X_n}(\mathbb{R} \times \mathbb{R} \times \dots \times \mathbb{R} \times A_i \times \mathbb{R} \times \dots \times \mathbb{R})$. Si les variables aléatoires $X_i$ sont discrètes,

$$
P(X_i = x_i) = P_{X_i}(x_i) = \sum_{x_1, \dots, x_{i-1}, x_{i+1}, \dots, x_n} P_{X_1, \dots, X_{i-1}, X_i, X_{i+1}, \dots, X_n}(x_1, \dots, x_i, \dots, x_n)
$$

Par exemple, si $(X, Y)$ est un couple de variables aléatoires discrètes, $\forall x \in X(\Omega)$

$$
P_X(x) = P(X = x) = \sum_{y \in Y(\Omega)} P(X = x, Y = y)
$$

$\forall y \in Y(\Omega)$, $P_Y(y) = P(Y = y) = \displaystyle\sum_{x \in X(\Omega)} P(X = x, Y = y)$.

## Espérance d'une variable aléatoire, moments d'ordre supérieur

### Espérance mathématique

**Définition.** Soit $X$ une variable aléatoire discrète sur un espace probabilisé $(\Omega, \mathcal{F}, P)$ avec $X(\Omega) = \lbrace x_n, n \in \mathbb{N} \rbrace$. On dit que $X$ est d'espérance finie si

$$
\sum_{n=0}^{+\infty} |x_n| P(X = x_n) < +\infty
$$

(c'est-à-dire si la série $x_n P(X = x_n)$ est absolument convergente), et on appelle alors espérance de $X$ le nombre

$$
E(X) = \sum_{n=0}^{+\infty} x_n P(X = x_n)
$$

**Remarque 1.** On dit aussi parfois que $X$ est intégrable (i.e. d'espérance finie).

**Remarque 2.** Si $\Omega$ est un espace fini ou dénombrable, alors $X$ est d'espérance finie si et seulement si

$$
\sum_{\omega \in \Omega} |X(\omega)| P(\omega) < +\infty
$$

et on peut écrire

$$
E(X) = \sum_{\omega \in \Omega} X(\omega) P(\omega)
$$

**Remarque 3.** Si par exemple $\forall x_n \in X(\Omega)$, $x_n \geq 0$ ($X$ à valeurs positives), alors la valeur de $\sum_{n=0}^{+\infty} x_n P(X = x_n)$ est toujours bien définie (elle est réelle si $X$ est d'espérance finie, ou bien elle vaut $+\infty$). On peut généraliser la définition de la façon suivante.

**Définition.** Soit $X$ une variable aléatoire discrète sur $(\Omega, \mathcal{F}, P)$ à valeurs dans $X(\Omega) = \lbrace x_n, n \in \mathbb{N} \rbrace$. Posons $X^+ = \max(X, 0)$ (partie positive) et $X^- = \max(-X, 0)$ (partie négative). On voit que $X^+ - X^- = X$ et $X^+ + X^- = |X|$.

On dira que la variable aléatoire $X$ « admet une espérance » si et seulement si au moins une des deux conditions suivantes est vérifiée :

1. $E(X^+) = \displaystyle\sum_{\substack{x_n \in X(\Omega) \\ x_n \geq 0}} x_n P(X = x_n) < +\infty$ ;
2. $E(X^-) = \displaystyle\sum_{\substack{x_n \in X(\Omega) \\ x_n < 0}} -x_n P(X = x_n) < +\infty$ ;

et on définit l'espérance de $X$ par

$$
E(X) = E(X^+) - E(X^-)
$$

**Remarque.** Une variable aléatoire $X$ est d'espérance finie si et seulement si

$$
E(X^+) < +\infty \text{ et } E(X^-) < +\infty
$$

**Premier exemple.** On rappelle que $\displaystyle\sum_{n \geq 1} \frac{1}{n^2} = \frac{\pi^2}{6}$.

Soit $X$ une variable aléatoire à valeurs dans $\mathbb{N}$ avec $P(X = 0) = 0$ et $\forall n \geq 1$, $P(X = n) = \dfrac{6}{\pi^2 n^2}$. On voit que

$$
\sum_{n \geq 1} n P(X = n) = \sum_{n \geq 1} \frac{6}{\pi^2 n} = +\infty
$$

Donc $X$ n'est pas d'espérance finie. Par contre, on peut dire que $X$ admet une espérance ($E(X) = +\infty$) (on voit qu'ici $E(X^-) = 0$).

Considérons maintenant $X$ à valeurs dans $\mathbb{Z}$ avec $P(X = 0) = 0$ et $\forall n \neq 0$, $P(X = n) = \dfrac{3}{\pi^2 n^2}$. Alors on se trouve dans le cas

$$
E(X^+) = +\infty
$$

$$
E(X^-) = +\infty
$$

Donc $X$ n'admet pas d'espérance.

**Théorème II.5.** (Théorème de transfert) Soit $X_1, \dots, X_k$ $k$ variables aléatoires discrètes. Soit $f$ une fonction de $\mathbb{R}^k \to \mathbb{R}$. Alors la variable aléatoire $Z = f(X_1, \dots, X_k)$ est d'espérance finie si et seulement si

$$
\sum |f(x_1, \dots, x_k)| P(X_1 = x_1, \dots, X_k = x_k) < +\infty
$$

avec $x_1 \in X_1(\Omega), \dots, x_k \in X_k(\Omega)$, et on a alors

$$
E(Z) = \sum_{x_1 \in X_1(\Omega), \dots, x_k \in X_k(\Omega)} f(x_1, \dots, x_k) P(X_1 = x_1, \dots, X_k = x_k)
$$

**Remarque.** Dans le cas où $k = 1$ et $X(\Omega) = \lbrace x_n, n \in \mathbb{N} \rbrace$, on a donc

$$
E(Z) = \sum_{n=0}^{+\infty} f(x_n) P(X = x_n)
$$

**Avantage.** La définition de $E(Z)$ est $E(Z) = \displaystyle\sum_{z_n \in Z(\Omega)} z_n P(Z = z_n)$.

**Propriétés.**

1. Si $Y \geq 0$ est d'espérance finie et si $|X| \leq Y$, alors $X$ est d'espérance finie.
2. (a) Si $X$ est d'espérance finie, alors $\forall \lambda \in \mathbb{R}$, $\lambda X$ est d'espérance finie et $E(\lambda X) = \lambda E(X)$.

   (b) Si $X$ et $Y$ sont d'espérance finie, alors $X + Y$ est d'espérance finie et $E(X + Y) = E(X) + E(Y)$.

   (c) S'il existe $b \in \mathbb{R}$ tel que $P(X = b) = 1$, alors $E(X) = b$.

   (d) $X \geq 0 \Rightarrow E(X) \geq 0$.

   (e) Si $X \geq 0$ et $E(X) = 0$, alors $P(X = 0) = 1$.

   (f) $X \leq Y \Rightarrow E(X) \leq E(Y)$.

   (g) Si $X$ et $Y$ sont 2 variables aléatoires indépendantes d'espérance finie, alors $XY$ est d'espérance finie et

   $$
   E(XY) = E(X)E(Y)
   $$

*Démonstration.*

1. Admis.
2. (a) Dans le théorème de transfert, on pose $k = 1$ et $f(x) = \lambda x$.

   (b) Dans le théorème de transfert, on pose $k = 2$ et $f(x, y) = x + y$ ; avec (a) et (b), on déduit que $\forall \lambda, \mu \in \mathbb{R}$,

   $$
   E(\lambda X + \mu Y) = \lambda E(X) + \mu E(Y)
   $$

   (c) Évident : $E(X) = bP(X = b) = b$.

   (d) Évident.

   (e) Soit $X \geq 0$ tel que $E(X) = 0$. On a donc $\displaystyle\sum_{x \in X(\Omega)} x P(X = x) = 0 \Rightarrow \sum_{x > 0} x P(X = x) = 0 \Rightarrow \forall x > 0, x P(X = x) = 0 \Leftrightarrow P(X = x) = 0, \forall x > 0 \Rightarrow P(X = 0) = 1$.

   (f) $X \leq Y \Rightarrow Y - X \geq 0 \Rightarrow E(Y - X) \geq 0 \Leftrightarrow E(Y) + E(-X) \geq 0 \Leftrightarrow E(Y) - E(X) \geq 0$.

   (g) On prend $k = 2$ et $f(x, y) = xy$ dans le théorème de transfert.

**Remarque.** La condition d'indépendance est une condition suffisante mais pas nécessaire. On peut avoir $E(XY) = E(X)E(Y)$ et $X$ et $Y$ non indépendants.

**Proposition.** Soit $X$ une variable à valeurs dans $\mathbb{N}$, alors

$$
E(X) = \sum_{n=1}^{+\infty} P(X \geq n)
$$

*Démonstration.*

$$
\begin{aligned}
\sum_{k=1}^{n} P(X \geq k) &= P(X \geq 1) + P(X \geq 2) + P(X \geq 3) + \dots + P(X \geq n) \\
&= P(X = 1) + P(X = 2) + P(X = 3) + \dots + P(X = n) + P(X \geq n + 1) \\
&\quad + P(X = 2) + P(X = 3) + \dots + P(X = n) + P(X \geq n + 1) + \dots \\
&= P(X = 1) + 2P(X = 2) + 3P(X = 3) + \dots + nP(X = n) + nP(X \geq n + 1) \\
&= \sum_{k=1}^{n} kP(X = k) + nP(X \geq n + 1)
\end{aligned}
$$

1. Si $E(X) < +\infty$, alors on a $nP(X \geq n + 1) = n \displaystyle\sum_{k=n+1}^{+\infty} P(X = k) \leq \sum_{k=n+1}^{+\infty} kP(X = k)$ et on a $\displaystyle\sum_{k=n+1}^{\infty} kP(X = k) \to 0$ car $E(X) = \displaystyle\sum_{k=1}^{\infty} kP(X = k) < +\infty$. D'où l'égalité en passant à la limite.
2. Si $E(X) = +\infty$, alors on a $\displaystyle\sum_{k=1}^{\infty} P(X \geq k) \geq \sum_{k=1}^{\infty} kP(X = k)$, d'où $\displaystyle\sum_{k=1}^{\infty} P(X \geq k) = +\infty$ et l'égalité reste vraie.

**Remarque.** Si $X$ est à valeurs dans $\mathbb{N} \cup \lbrace +\infty \rbrace$ avec $P(X = +\infty) > 0$, alors $E(X) = +\infty$ et $\forall n$, $\sum_{k=1}$ …

## Moments d'ordre supérieur, variance et covariance

**Définition.** Soit $X$ une variable aléatoire discrète sur $(\Omega, \mathcal{F}, P)$ avec $X(\Omega) = \lbrace x_n, n \in \mathbb{N} \rbrace$. On dit que $X$ admet un moment (non centré) à l'ordre $k$ si

$$
\sum_{n \geq 0} |x_n|^k P(X = x_n) < +\infty
$$

et on appelle alors moment (non centré) d'ordre $k$ le nombre

$$
E(X^k) = \sum_{n \geq 0} x_n^k P(X = x_n)
$$

**Remarque.** On dit aussi que $X$ est de puissance $k$ intégrable. Si $k = 2$, on parle de variable aléatoire de carré intégrable ; l'espérance est le moment (non centré) d'ordre 1.

**Propriété.** Si $X$ admet un moment (non centré) d'ordre $k$, alors $\forall i \leq k$, $X$ admet un moment (non centré) d'ordre $i$.

*Démonstration.* On peut écrire ($i \leq k$)

$$
|X|^i = |X|^i \mathbb{1}_{\lbrace |X| \leq 1 \rbrace} + |X|^i \mathbb{1}_{\lbrace |X| > 1 \rbrace} \leq 1 \cdot \mathbb{1}_{\lbrace |X| \leq 1 \rbrace} + |X|^k \mathbb{1}_{\lbrace |X| > 1 \rbrace} \leq 1 + |X|^k
$$

Et donc $E(|X|^i) \leq 1 + E(|X|^k)$, d'où le résultat.

**Corollaire.** Si $X$ admet un moment d'ordre $k \geq 1$, alors $X$ est d'espérance finie.

**Propriété.** Si $X$ admet un moment d'ordre $k$, alors $\forall a \in \mathbb{R}$, $(X + a)$ admet un moment d'ordre $k$.

*Démonstration.* D'après la formule du binôme de Newton,

$$
(X + a)^k = \sum_{i=0}^{k} C_k^i X^i a^{k-i}
$$

d'où le résultat avec la propriété précédente.

**Définition.** Soit $X$ une variable aléatoire admettant un moment (non centré) d'ordre $k$. On appelle moment centré d'ordre $k$ la quantité

$$
E((X - E(X))^k) = \sum_{n \geq 0} (x_n - E(X))^k P(X = x_n)
$$

**Définition.** On appelle variance de $X$ le moment centré d'ordre $k = 2$ et on note cette quantité $\sigma_X^2$ ou $Var(X)$ (ou encore $V(X)$) :

$$
\sigma_X^2 = E[(X - E(X))^2]
$$

**Définition.** On appelle écart type de $X$ la racine carrée de la variance, c'est-à-dire $\sigma = \sqrt{Var(X)}$.

**Propriétés de la variance.**

1. $Var(X) = E(X^2) - E(X)^2$.

   *Démonstration.* $Var(X) = E[(X - E(X))^2] = E[X^2 - 2X E(X) + E(X)^2] = E[X^2] - 2E(X)E(X) + E(X)^2 = E(X^2) - E(X)^2$.

2. $\forall a, b \in \mathbb{R}$, $Var(aX + b) = a^2 Var(X)$.

   *Démonstration.* $Var(aX + b) = E[(aX + b - E(aX + b))^2] = E[(a(X - E(X)))^2] = a^2 E[(X - E(X))^2] = a^2 Var(X)$.

3. $Var(X) = 0 \Leftrightarrow \exists b \in \mathbb{R}$ tel que $P(X = b) = 1$.

   *Démonstration.* $Var(X) = 0 \Leftrightarrow E[(X - E(X))^2] = 0 \Leftrightarrow P(X - E(X) = 0) = 1 \Leftrightarrow P(X = E(X)) = 1$ (d'après la propriété (e) de l'espérance).

**Remarque.** On a donc $\forall a, b \in \mathbb{R}$, $\sigma_{aX + b} = |a| \sigma_X$.

## Covariance, variance d'une somme

**Propriété.** Soit $X$ et $Y$ deux variables aléatoires admettant un moment d'ordre 2. Alors $XY$ est d'espérance finie.

*Démonstration.* On a $(|X| - |Y|)^2 \geq 0 \Leftrightarrow X^2 - 2|X||Y| + Y^2 \geq 0 \Leftrightarrow |X||Y| \leq \frac{1}{2}(X^2 + Y^2)$. D'après les propriétés 1 et 2b de l'espérance, $XY$ est d'espérance finie.

**Définition.** Soit $X$ et $Y$ deux variables aléatoires admettant un moment d'ordre 2. On appelle covariance de $X$ et $Y$ la quantité

$$
Cov(X, Y) = E[(X - E(X))(Y - E(Y))]
$$

**Propriété.** $Cov(X, Y) = E(XY) - E(X)E(Y)$.

*Démonstration.* $Cov(X, Y) = E[XY - XE(Y) - YE(X) + E(X)E(Y)] = E(XY) - E(X)E(Y) - E(Y)E(X) + E(X)E(Y) = E(XY) - E(X)E(Y)$.

**Définition.** On dit que 2 variables aléatoires $X$ et $Y$ admettant un moment d'ordre 2 sont non corrélées si $Cov(X, Y) = 0$.

**Remarque.** On a : $X$ et $Y$ sont indépendants, ce qui implique que $X$ et $Y$ sont non corrélées. La réciproque est fausse.

**Variance de la somme.** D'une manière générale, on peut écrire

$$
\begin{aligned}
Var(X + Y) &= E[(X + Y - E(X + Y))^2] \\
&= E[(X - E(X)) + (Y - E(Y))]^2 \\
&= E[(X - E(X))^2 + (Y - E(Y))^2 + 2(X - E(X))(Y - E(Y))] \\
&= Var(X) + Var(Y) + 2Cov(X, Y)
\end{aligned}
$$

**Proposition.** Donc des variables aléatoires de carré intégrable sont non corrélées si et seulement si

$$
Var(X + Y) = Var(X) + Var(Y)
$$

**Généralisation.** Soit $X_1, \dots, X_n$ $n$ variables aléatoires intégrables. Alors

$$
Var(X_1 + \dots + X_n) = Var(X_1) + \dots + Var(X_n) + 2\sum_{i < j} Cov(X_i, X_j)
$$

Si de plus les variables aléatoires $X_1, \dots, X_n$ sont 2 à 2 non corrélées, alors on a

$$
Var(X_1 + \dots + X_n) = Var(X_1) + \dots + Var(X_n)
$$

**Propriétés de la covariance.**

- $Cov(X, X) = Var(X)$.
- $(X, Y) \to Cov(X, Y)$ est bilinéaire symétrique positive.

  *Démonstration.* $Cov(X, Y) = Cov(Y, X)$, $Cov(X, X) = Var(X) \geq 0$, $Cov(aX + bY, Z) = E((aX + bY)Z) - E(aX + bY)E(Z) = E(aXZ + bYZ) - aE(X)E(Z) - bE(Y)E(Z)$ (linéarité de l'espérance) $= a(E(XZ) - E(X)E(Z)) + b(E(YZ) - E(Y)E(Z)) = aCov(X, Z) + bCov(Y, Z)$.

- $|Cov(X, Y)| \leq \sqrt{Var(X)}\sqrt{Var(Y)} \Leftrightarrow |Cov(X, Y)| \leq \sigma_X \sigma_Y$.

  *Démonstration.* Résulte de l'inégalité de Cauchy-Schwarz. En effet, $\forall a$, $P(a) = Cov(aX + Y, aX + Y) = Var(aX + Y) \geq 0 \Leftrightarrow P(a) = a^2 Var(X) + 2aCov(X, Y) + Var(Y) \geq 0$. D'où le discriminant de $P(a)$ est inférieur ou égal à 0, donc $4Cov^2(X, Y) - 4Var(X)Var(Y) \leq 0 \Leftrightarrow Cov^2(X, Y) \leq Var(X)Var(Y) \Leftrightarrow |Cov(X, Y)| \leq \sigma_X \sigma_Y$.

**Remarque.** On définit le coefficient de corrélation (linéaire) de 2 variables aléatoires par

$$
\rho(X, Y) = \frac{Cov(X, Y)}{\sqrt{Var(X)Var(Y)}} = \frac{Cov(X, Y)}{\sigma_X \sigma_Y}
$$

D'après la propriété précédente, on a $|\rho(X, Y)| \leq 1$. On voit que $X$ et $Y$ non corrélées $\Leftrightarrow \rho(X, Y) = 0$.

**Propriété.** $|\rho| = 1 \Leftrightarrow \exists a, b \in \mathbb{R}$ tels que $aX + Y = b$ (tels que $P(aX + Y = b) = 1$).

*Démonstration.* Si $Y = b - aX$, $\sigma_Y = |a| \sigma_X$,

$$
Cov(X, Y) = Cov(X, b - aX) = Cov(X, b) - aVar(X) = -aVar(X)
$$

$$
|\rho| = \frac{|aVar(X)|}{\sigma_X |a| \sigma_X} = 1
$$

Réciproquement, si $|\rho| = 1$, alors le discriminant de $P(a)$ est nul, et donc il existe une racine de $P(a)$ $\Leftrightarrow \exists a$ tel que $Var(aX + Y) = 0 \Leftrightarrow aX + Y = b$.

## Inégalités probabilistes

### Loi des grands nombres

**Inégalité de Markov.** Soit $X$ une variable aléatoire d'espérance finie, alors $\forall \lambda > 0$

$$
P(|X| \geq \lambda) \leq \frac{E(|X|)}{\lambda}
$$

**Inégalité de Bienaymé-Tchebychev.** Soit $X$ une variable aléatoire de carré intégrable, alors $\forall \epsilon > 0$,

$$
\begin{aligned}
&P(|X - E(X)| \geq \epsilon) \leq \frac{Var(X)}{\epsilon^2} \\
\Leftrightarrow\ &P(|X - E(X)| < \epsilon) \geq 1 - \frac{Var(X)}{\epsilon^2} \\
\Leftrightarrow\ &P(E(X) - \epsilon < X < E(X) + \epsilon) \geq 1 - \frac{Var(X)}{\epsilon^2}
\end{aligned}
$$

*Démonstration.* Découle de l'inégalité de Markov. Posons $\lambda = \epsilon^2$ et $Y = (X - E(X))^2$. Markov implique $P(|Y| \geq \lambda) \leq \dfrac{E(|Y|)}{\lambda} \Rightarrow P((X - E(X))^2 \geq \epsilon^2) \leq \dfrac{Var(X)}{\epsilon^2} \Rightarrow P(|X - E(X)| \geq \epsilon) \leq \dfrac{Var(X)}{\epsilon^2}$.

**Exemple.** Soit $X$ une variable aléatoire telle que $E(X) = 100$ et $Var(X) = 16$. Posons $\epsilon = 8$, alors

$$
P(92 < X < 108) \geq 1 - \frac{16}{64}
$$

On déduit de l'inégalité de Bienaymé-Tchebychev une version simplifiée de la loi faible des grands nombres.

**Théorème II.6.** Soit $(X_n)_{n \geq 1}$ une suite de variables aléatoires i.i.d. avec $E(X_n) = \mu$ et $Var(X_n) = \sigma^2$. Posons $\forall n \geq 1$, $S_n = \sum_{k=1}^{n} X_k$ et $\overline{X}_n = \dfrac{S_n}{n} = \dfrac{1}{n} \sum_{k=1}^{n} X_k$ ; $\overline{X}_n$ s'appelle la moyenne d'échantillon. Alors $\forall \epsilon > 0$, $\displaystyle\lim_{n \to +\infty} P(|\overline{X}_n - \mu| \geq \epsilon) = 0$ (on dit que $\overline{X}_n$ converge en probabilité vers $\mu$).

*Démonstration.* D'après l'inégalité de Bienaymé-Tchebychev,

$$
P(|\overline{X}_n - E(\overline{X}_n)| \geq \epsilon) \leq \frac{Var(\overline{X}_n)}{\epsilon^2}
$$

$$
E(\overline{X}_n) = \frac{1}{n} \sum_{k=1}^{n} E(X_k) = \frac{1}{n} n\mu = \mu
\qquad
Var(\overline{X}_n) = \frac{1}{n^2} Var\left(\sum_{k=1}^{n} X_k\right) = \frac{1}{n^2} \sum_{k=1}^{n} Var(X_k) = \frac{1}{n^2} n\sigma^2 = \frac{\sigma^2}{n}
$$

## Fonctions génératrices

**Définition.** Soit $X$ une variable aléatoire à valeurs dans $\mathbb{N}$ et posons $\forall n \geq 0$, $p_n = P(X = n)$. On appelle **fonction génératrice** de $X$ (ou fonction génératrice des probabilités, ou encore fonction génératrice des moments) la fonction

$$
G_X : \begin{cases} \mathbb{C} \to \mathbb{C} \\ z \mapsto G_X(z) = \displaystyle\sum_{n=0}^{+\infty} p_n z^n \end{cases}
$$

**Remarque.**

- $G_X(z) = E(z^X)$ (théorème du transfert).
- Comme $\sum_{n=0}^{+\infty} p_n = 1$, on en déduit que le rayon de convergence de la série entière $\sum p_n z^n$ est supérieur à 1.

**Théorème II.7.** Soit $X$ et $Y$ deux variables aléatoires telles que $\forall z \in \mathbb{R}$, $G_X(z) = G_Y(z)$. Alors $\forall n \in \mathbb{N}$, $P(X = n) = P(Y = n)$ ($X$ et $Y$ ont même loi).

*Démonstration.* Puisque le rayon de convergence de $G_X$ et $G_Y$ est supérieur à 1, $\forall r \in ]0, 1[$, on peut dériver $G_X$ (et $G_Y$) indéfiniment sur $]-r, r[$ ; en particulier, $G_X$ et $G_Y$ sont indéfiniment dérivables en 0. Or $\forall z \in ]-r, r[$

$$
G_X^{(n)}(z) = n! p_n + \sum_{k=n+1}^{+\infty} k(k-1) \times \dots \times (k-n+1) p_k z^{k-n} \Rightarrow G_X^{(n)}(0) = n! p_n \Leftrightarrow p_n = \frac{G_X^{(n)}(0)}{n!}
$$

On a montré de même que $q_n = P(Y = n) = \dfrac{G_Y^{(n)}(0)}{n!}$, d'où si $G_X = G_Y$, on a forcément $p_n = q_n$ $\forall n$.

**Théorème II.8.** Soit $X$ une variable aléatoire à valeurs dans $\mathbb{N}$ de fonction génératrice $G_X$. Alors $X$ admet un moment d'ordre $m$ si et seulement si la dérivée à gauche d'ordre $m$ au point $z = 1$ de la fonction $G_X$ existe et est finie. Dans ce cas, on a de plus

$$
E[X(X - 1) \times \dots \times (X - m + 1)] = G_X^{(m)}(1) = \sum_{k=m}^{+\infty} k(k-1) \times \dots \times (k-m+1) p_k
$$

En particulier

$$
\begin{aligned}
E(X) &= G'_X(1) \\
E(X^2) &= E(X(X - 1)) + E(X) \\
&= G''_X(1) + G'_X(1) \\
Var(X) &= G''_X(1) + G'_X(1) - (G'_X(1))^2
\end{aligned}
$$

*Démonstration.* Dans le cas où le rayon de convergence de la série entière $\sum p_n z^n$ est $R > 1$, le résultat est évident car la fonction $G_X$ est indéfiniment dérivable au point 1. Si $R = 1$, la démonstration est plus technique.

**Fonction génératrice d'une somme de variables aléatoires indépendantes.** Soit $X$ et $Y$ deux variables aléatoires indépendantes (à valeurs dans $\mathbb{N}$) de fonctions génératrices $G_X$ et $G_Y$. Calculons la fonction génératrice de $X + Y$ :

$$
\begin{aligned}
G_{X+Y}(z) &= \sum_{n=0}^{+\infty} P(X + Y = n) z^n \\
&= \sum_{n=0}^{+\infty} \sum_{k=0}^{n} P(X = k, Y = n - k) z^n \\
&= \sum_{n=0}^{+\infty} \sum_{k=0}^{n} P(X = k) P(Y = n - k) z^n \\
&= \sum_{n=0}^{+\infty} \sum_{k=0}^{n} P(X = k) z^k P(Y = n - k) z^{n-k} \\
&= \left(\sum_{n=0}^{+\infty} P(X = n) z^n\right) \times \left(\sum_{n=0}^{+\infty} P(Y = n) z^n\right) \\
&= G_X(z).G_Y(z)
\end{aligned}
$$

**Autre démonstration.** On a vu que $G_X(z) = E(z^X)$ et $G_Y(z) = E(z^Y)$. Donc $G_{X+Y}(z) = E(z^{X+Y}) = E(z^X z^Y) = E(z^X)E(z^Y)$ (car $z^X$ et $z^Y$ sont indépendants). On peut généraliser le résultat à $n$ variables aléatoires indépendantes.

**Théorème II.9.** Soit $X_1, \dots, X_n$ $n$ variables aléatoires à valeurs dans $\mathbb{N}$ (mutuellement) indépendantes. Alors

$$
G_{X_1 + \dots + X_n} = G_{X_1} \times \dots \times G_{X_n} = \prod_{i=1}^{n} G_{X_i}
$$

**Exemples de fonctions génératrices.**

**Loi de Bernoulli.** $X \sim \mathcal{B}(p)$, $G_X(z) = P(X = 0)z^0 + P(X = 1)z^1 = 1 - p + pz$ ; de plus $G'_X(z) = p$ et $G''_X(z) = 0$, donc $E(X) = p$ et $Var(X) = 0 + p - p^2 = p(1 - p)$.

**Loi binomiale.** $X \sim \mathcal{B}(n, p)$, $G_X(z) = \displaystyle\sum_{k=0}^{n} C_n^k p^k (1 - p)^{n-k} z^k = \sum_{k=0}^{n} C_n^k (pz)^k (1 - p)^{n-k} = (pz + 1 - p)^n$ (binôme de Newton).

**Loi géométrique (sur $\mathbb{N}^*$).** $X \sim \mathcal{G}(p)$,

$$
G_X(z) = \sum_{n=1}^{\infty} P(X = n) z^n = \sum_{n=1}^{+\infty} p(1 - p)^{n-1} z^n = pz \sum_{n=1}^{+\infty} ((1 - p)z)^{n-1} = pz \frac{1}{1 - (1 - p)z} = \frac{pz}{1 - (1 - p)z}
$$

$$
G'_X(z) = \frac{p(1 - (1 - p)z) + pz(1 - p)}{(1 - (1 - p)z)^2} = \frac{p}{(1 - (1 - p)z)^2}
\qquad
G''_X(z) = p \frac{2(1 - p)}{(1 - (1 - p)z)^3}
$$

$E(X) = G'_X(1) = 1/p$ et $Var(X) = \dfrac{2(1 - p)}{p^2} + \dfrac{1}{p} - \dfrac{1}{p^2} = \dfrac{1 - p}{p^2}$.

**Loi de Pascal.** $X \sim Pa(r, p)$, $G_X(z) = \left(\dfrac{pz}{1 - (1 - p)z}\right)^r$.

**Loi de Poisson.** $X \sim \mathcal{P}(\lambda)$,

$$
G_X(z) = \sum_{n=0}^{+\infty} e^{-\lambda} \frac{\lambda^n}{n!} z^n = \sum_{n=0}^{+\infty} e^{-\lambda} \frac{(\lambda z)^n}{n!} = e^{-\lambda} \sum_{n=0}^{+\infty} \frac{(\lambda z)^n}{n!} = e^{-\lambda} e^{\lambda z} = e^{\lambda(z - 1)}
$$

$G'_X(z) = \lambda e^{\lambda(z-1)} \Rightarrow G'_X(1) = \lambda$

$G''_X(z) = \lambda^2 e^{\lambda(z-1)} \Rightarrow Var(X) = \lambda^2 + \lambda - \lambda^2 = \lambda$
