---
title: "Fiches"
description: "Fiches de synthèse du cours de calcul intégral : continuité et dérivabilité des fonctions vectorielles, classe Ck, intégrale de Riemann, théorèmes fondamentaux, méthodes d'intégration, formules de Taylor et intégrales impropres."
sidebar_position: 7
---

## Calcul intégral de fonction vectorielle

### Continuité des fonctions vectorielles

**Définition de la continuité.** $f : I \to \mathbb{R}^n$ est continue en $x_0 \in I$ si $\forall \epsilon > 0 \ \exists \delta > 0$

$$
\forall x \in I, \ |x - x_0| < \delta \Rightarrow \|f(x) - f(x_0)\| < \epsilon
$$

$f$ est continue si et seulement si toute coordonnée de $f$ est continue.

### Dérivabilité des fonctions vectorielles

La fonction $f$ est dérivable en $x_0$ si $\displaystyle\lim_{x \to x_0} \frac{f(x) - f(x_0)}{x - x_0}$ existe dans $\mathbb{R}^n$.

$f$ est dérivable en $x_0$ si et seulement si chaque coordonnée est dérivable en $x_0$.
Si $f, g$ sont dérivables, alors

$$
(\alpha f + \beta g)'(x_0) = \alpha f'(x_0) + \beta g'(x_0)
\qquad
(f \circ \phi)'(x) = \phi'(x) f'(\phi(x))
$$

Soit une forme bilinéaire

$$
(b(f, g))'(x_0) = b(f'(x_0), g(x_0)) + b(f(x_0), g'(x_0))
$$

### Fonction de classe $C^k$

Si une fonction est de classe $C^k$, alors chacune de ses composantes est de classe $C^k$.
Une fonction $f$ est un $C^k$-difféomorphisme si $f$ est bijective, $f \in C^k(I, J)$ et $f^{-1} \in C^k(J, I)$.

$f$ est un $C^k$-difféomorphisme de $I$ vers $f(I)$ est équivalent à $f'(x) \neq 0$.

Une fonction est dite $C^k$ par morceaux sur $(a, b)$ s'il existe $a_0 = a < a_1 < \dots < a_{r-1} < a_r = b$ avec $f_{|(a_i, a_{i+1})} \in C^k((a_i, a_{i+1}), \mathbb{R}^n)$.

### Rappel sur l'intégrale de Riemann

**Volume** : $\text{vol}([a, b]) = b - a$
**Taille** : maximum des volumes
**Partition pointée** : $\{(I_1, p_1), \dots, (I_r, p_r)\}$
**Somme de Riemann** :

$$
\mathcal{R}(f, P) = \sum_{n=1}^{r} f(p_i)\, \text{vol}(I_i)
$$

**Riemann-intégrable** :

$$
\sum_{i=1}^{n} (\sup f - \inf f)\, \text{vol}(I_i) < \epsilon
$$

Si $f$ est **continue par morceaux**, alors $f$ est Riemann-intégrable.

Une fonction continue sur un intervalle compact est uniformément continue.

Propriétés : linéarité, additivité, monotonie.

### Intégrales de Riemann

Une fonction est bornée si chacune de ses composantes l'est.

Somme de Riemann de $f$ par rapport à la partition $P$

$$
\mathcal{R}(f, P) := \sum_{i=1}^{r} f(p_i)\, \text{vol}(I_i)
$$

$$
\left\|\int_a^b f(t)\,dt\right\| \leq \int_a^b \|f(t)\|\,dt
\qquad
\left\|\int_a^b f(t)\,dt\right\| \leq (b - a) \sup_{[a, b]} \|f\|
$$

### Les théorèmes fondamentaux

**Premier théorème fondamental du calcul intégral :** $F_a : x \mapsto \displaystyle\int_a^x f(t)\,dt$ est une antidérivée de $f$ qui s'annule en $x = a$.

**Deuxième théorème fondamental du calcul intégral :** soit $f$ une fonction bornée ; si $F_1$ et $F_2$ existent, alors $F_1 = F_2 + \text{cte}$, la fonction $F_a$ est unique, et si $F$ est une antidérivée, alors

$$
\int_a^b f(t)\,dt = [F]_a^b = F(b) - F(a)
$$

### Application de l'intégrale

**Inégalité des accroissements finis :**

$$
\|f(b) - f(a)\| \leq c(b - a)
$$

**Prolongement des fonctions de classe $C^k$ :** si $f$ est continue sur $I$, de classe $C^k$ sur $I \setminus \{x_0\}$ et $l_r = \displaystyle\lim_{x \to x_0} f^{(k)}(x)$, alors $f$ est de classe $C^k$ sur $I$ et $f^{(r)}(x_0) = l_r$.

## Calcul différentiel de fonction vectorielle

### Méthodes d'intégration

$$
\int_a^b \tilde{f}'(t)\,dt = f(b) - f(a)
$$

$$
\int_a^b \tilde{\phi}'(t) f(t)\,dt = [\phi f]_a^b - \int_a^b \phi(t) \tilde{f}'(t)\,dt
$$

$$
\int_{\phi(a)}^{\phi(b)} f(t)\,dt = \int_a^b f(\phi(t)) \phi'(t)\,dt
$$

### Formules de Taylor

$$
P_{f, n, x_0} = \sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!} (x - x_0)^k
$$

**Taylor avec reste intégral :**

$$
f(x) - P_{f, n, x_0}(x) = \int_{x_0}^{x} \frac{(x - t)^n}{n!} \tilde{f}^{(n+1)}(t)\,dt
$$

**Taylor-Lagrange :**

$$
\|f(x) - P_{f, n, x_0}(x)\| \leq \frac{|x - x_0|^{n+1}}{(n + 1)!} c
$$

### Définition

Soit $f$ bornée, Riemann-intégrable sur un compact de $I$

$$
\int_I f(t)\,dt = \lim_{x \to \inf(I)} \int_x^{x_0} f(t)\,dt + \lim_{x \to \sup(I)} \int_{x_0}^{x} f(t)\,dt
$$

Formules utiles :

- $\displaystyle\int_{[1, +\infty[} \frac{1}{t^\alpha}\,dt$ converge si $\alpha > 1$, vers $\dfrac{1}{\alpha - 1}$ ;
- $\displaystyle\int_{]0, 1]} \frac{1}{t^\beta}\,dt$ converge si $\beta < 1$, vers $\dfrac{1}{1 - \beta}$.

### Propriétés

La **linéarité** et l'**additivité**.
Théorème fondamental pour les intégrales impropres : soit $f \in \mathcal{CM}(I)$ et soit $F$ une antidérivée

$$
\int_I f(t)\,dt = \lim_{x \to \sup(I)} F(x) - \lim_{x \to \inf(I)} F(x)
$$

Si $f$ est continue, positive et Riemann-intégrable, alors

$$
\int_I f(t)\,dt = 0 \Rightarrow f(t) = 0
$$

Intégration par parties :

$$
\int_I \tilde{\phi}'(t) f(t)\,dt = \lim_{x \to \sup(I)} \phi(x) f(x) - \lim_{x \to \inf(I)} \phi(x) f(x) - \int_I \phi(t) \tilde{f}'(t)\,dt
$$

### Critère d'intégrabilité

Si $f$ est positive, alors $f$ est intégrable si $\exists M > 0$ tel que $\displaystyle\int_a^b f(t)\,dt \leq M$.
Si $f$ est bornée, alors $f$ est intégrable.
$f$ est intégrable si et seulement si $F$ est bornée.

### Comparaison à une série

La série $\displaystyle\sum_{n=0}^{\infty} f(n)$ converge si et seulement si $f$ est intégrable, si $f$ est positive décroissante.

### Normes et intégrales impropres

Si on a $\displaystyle\lim_{x \to a} f(x) = \underbrace{l} \Leftrightarrow \lim_{x \to a} f_i(x) = l_i$, $f$ est intégrable si et seulement si $f_i$ est intégrable

$$
\left\|\int_I f(t)\,dt\right\| \leq \int_I \|f(t)\|\,dt
$$

### Limites et intégrales

Convergence dominée de Lebesgue : on suppose $\|f_l(t)\| \leq \|g(t)\|$ et $\displaystyle\lim_{l \to +\infty} f_l(t) = f(t)$, alors

$$
\lim_{l \to +\infty} \int_I f_l(t)\,dt = \int_I f(t)\,dt
$$
