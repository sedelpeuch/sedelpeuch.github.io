---
title: "Formules de Taylor"
description: "Polynôme de Taylor d'une fonction vectorielle, formule de Taylor avec reste intégral, inégalité de Taylor-Lagrange et formule de Taylor-Young."
sidebar_position: 4
---

Étudier une fonction $f$ peut être "difficile". L'idée des formules de Taylor est d'approximer une fonction $f$ avec des fonctions polynomiales. Si $f$ est assez régulière en un point, on pourra le faire localement. Pour formaliser l'idée, on peut définir la notion suivante.

**Définition 5.1.** Soit $I$ un intervalle (ouvert) de $\mathbb{R}$, $x_0 \in I$ et $f : I \to \mathbb{R}^N$ qui est dérivable $n$ fois en $x_0$. Alors le polynôme de $f$ de degré $n$ autour de $x_0$ est

$$
P_{f, n, x_0} = \sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!} (x - x_0)^k
$$

Par exemple, $P_{f, 0, x_0} = f(x_0)$ ; si $f$ est dérivable une fois

$$
P_{f, 1, x_0} = f(x_0) + f'(x_0)(x - x_0)
$$

**Exemple 5.1** (Graphique). Soit $f(x) = e^x$. Représenter le graphe de $f$, de $P_{f, 0, 0}$, $P_{f, 1, 0}$, $P_{f, 2, 0}$ (ils existent parce que $f$ est dérivable un nombre infini de fois en $x_0$). $P_0 = 1$, $P_1 = 1 + x$, $P_2 = 1 + x + \dfrac{x^2}{2}$.

![Graphe de l'exponentielle et de ses polynômes de Taylor successifs en 0 sur [-2, 2]](./img/cours-p28-1.png)

**Théorème 5.1** (Polynôme de Taylor avec reste intégral). *Soit $I$ un intervalle ouvert de $\mathbb{R}$, $x_0 \in I$ et $f : I \to \mathbb{R}^n$ une fonction de classe $\mathcal{C}^n$ sur $I$ et de classe $\mathcal{C}^{n+1}$ par morceaux sur $I$, pour $n \in \mathbb{N}$. Alors*

$$
f(x) - P_{f, n, x_0}(x) = \int_{x_0}^{x} \frac{(x - t)^n}{n!} \tilde{f}^{(n+1)}(t)\,dt \quad \forall x \in I
$$

*Démonstration.* Par récurrence sur $n$.

- Pour $n = 0$ : la fonction $f$ est continue et de classe $\mathcal{C}^1$ par morceaux sur $I$

  $$
  f(x) - P_{f, 0, x_0}(x) = f(x) - f(x_0) = \int_{x_0}^{x} \tilde{f}'(t)\,dt
  $$

- Supposons la propriété vraie pour tout $k \leq n$ et prouvons-la pour $n + 1$. Soit alors $f$ une fonction de classe $\mathcal{C}^{n+1}$ sur $I$ et de classe $\mathcal{C}^{n+2}$ par morceaux sur $I$. Alors

  $$
  \begin{aligned}
  f(x) - P_{f, n+1, x_0}(x) &= f(x) - \sum_{k=0}^{n+1} \frac{f^{(k)}(x_0)}{k!} (x - x_0)^k \\
  &= f(x) - \left(\sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!} (x - x_0)^k + \frac{f^{(n+1)}(x_0)}{(n + 1)!} (x - x_0)^{n+1}\right) \\
  &= f(x) - P_{f, n, x_0}(x) - \frac{f^{(n+1)}(x_0)}{(n + 1)!} (x - x_0)^{n+1} \\
  &= \int_{x_0}^{x} \frac{(x - t)^n}{n!} \tilde{f}^{(n+1)}(t)\,dt - \frac{f^{(n+1)}(x_0)}{(n + 1)!} (x - x_0)^{n+1}
  \end{aligned}
  $$

  La dernière égalité est obtenue par hypothèse de récurrence ($f$ est de classe $\mathcal{C}^{n+1}$ sur $I$, donc de classe $\mathcal{C}^n$ sur $I$ et de classe $\mathcal{C}^{n+1}$ par morceaux sur $I$).
  On remarque que $\tilde{f}^{(n+1)} = f^{(n+1)}$ car $f \in \mathcal{C}^{n+1}(I, \mathbb{R}^n)$, et $f$ est $\mathcal{C}^{n+2}$ par morceaux, donc $f^{(n+1)}$ est continue et de classe $\mathcal{C}^1$ par morceaux sur $I$. La formule d'intégration par parties nous donne alors

  $$
  \begin{aligned}
  f(x) - P_{f, n+1, x_0}(x) &= \int_{x_0}^{x} \frac{(x - t)^n}{n!} f^{(n+1)}(t)\,dt - \frac{f^{(n+1)}(x_0)}{(n + 1)!} (x - x_0)^{n+1} \\
  &= \left[-\frac{(x - t)^{n+1}}{(n + 1)!} f^{(n+1)}(t)\right]_{x_0}^{x} - \int_{x_0}^{x} -\frac{(x - t)^{n+1}}{(n + 1)!} \tilde{f}^{(n+2)}(t)\,dt - \frac{f^{(n+1)}(x_0)}{(n + 1)!} (x - x_0)^{n+1} \\
  &= \frac{(x - x_0)^{n+1}}{(n + 1)!} f^{(n+1)}(x_0) + \int_{x_0}^{x} \frac{(x - t)^{n+1}}{(n + 1)!} \tilde{f}^{(n+2)}(t)\,dt - \frac{(x - x_0)^{n+1}}{(n + 1)!} f^{(n+1)}(x_0) \\
  &= \int_{x_0}^{x} \frac{(x - t)^{n+1}}{(n + 1)!} \tilde{f}^{(n+2)}(t)\,dt
  \end{aligned}
  $$

**Théorème 5.2** (Inégalité de Taylor-Lagrange). *Soit $I$ un intervalle ouvert, $x_0 \in I$ et $f : I \to \mathbb{R}^N$ de classe $\mathcal{C}^n$ sur $I$ et de classe $\mathcal{C}^{n+1}$ par morceaux sur $I$. Alors il existe $c > 0$ tel que $\|\tilde{f}^{(n+1)}(x)\| < c \ \forall x \in [a, b]$, avec $x_0 \in [a, b]$, et*

$$
\|f(x) - P_{f, n, x_0}(x)\| \leq \frac{|x - x_0|^{n+1}}{(n + 1)!} c \qquad x \in [a, b]
$$

*(pour n'importe quel choix de norme $\|.\|$ sur $\mathbb{R}^n$)*

*Démonstration.* Comme $f \in \mathcal{CM}^{n+1}(I, \mathbb{R}^n)$, alors $f^{(n+1)}$ est une fonction continue par morceaux sur $[a, b]$, donc $\tilde{f}^{(n+1)}$ est bornée sur $[a, b]$ ; alors $\exists c > 0$ tel que $\|\tilde{f}^{(n+1)}(x)\| \leq c \ \forall x \in [a, b]$.
Supposons d'abord que $x \in [a, b]$ est tel que $x_0 \geq x$ ; grâce au théorème 5.1 :

$$
\begin{aligned}
\|f(x) - P_{f, n, x_0}(x)\| &= \left\|-\int_x^{x_0} \frac{(x - t)^n}{n!} \tilde{f}^{(n+1)}(t)\,dt\right\| \\
&\leq \int_x^{x_0} \left\|\frac{(x - t)^n}{n!} \tilde{f}^{(n+1)}(t)\right\| dt \\
&= \int_x^{x_0} \frac{|x - t|^n}{n!} \|\tilde{f}^{(n+1)}(t)\|\,dt \\
&\leq \int_x^{x_0} \frac{(t - x)^n}{n!} c\,dt \\
&= c \int_x^{x_0} \frac{(t - x)^n}{n!}\,dt \\
&= c \left[\frac{(t - x)^{n+1}}{(n + 1)!}\right]_x^{x_0} \\
&= c \frac{(x_0 - x)^{n+1}}{(n + 1)!} \\
&= c \frac{|x - x_0|^{n+1}}{(n + 1)!}
\end{aligned}
$$

**Corollaire 5.1** (cas particulier du théorème de Taylor-Young). *Soit $I$ un intervalle (ouvert) réel, $f : I \to \mathbb{R}^N$ une fonction de classe $\mathcal{C}^n$ sur $I$ et de classe $\mathcal{C}^{n+1}$ par morceaux sur $I$ ; alors $f(x) = P_{f, n, x_0}(x) + (x - x_0)^n \cdot \epsilon(x)$ avec $\displaystyle\lim_{x \to x_0} \epsilon(x) = 0$ (c'est-à-dire $\displaystyle\lim_{x \to x_0} \|\epsilon(x)\| = 0$).*

*Démonstration.* Il suffit d'écrire $\epsilon(x) = \begin{cases} \dfrac{f(x) - P_{f, n, x_0}(x)}{(x - x_0)^n} & \text{si } x \neq x_0 \\ 0 \end{cases}$. On a que

$$
\lim_{x \to x_0} \|\epsilon(x)\| = \lim_{x \to x_0} \frac{1}{|x - x_0|^n} \|f(x) - P_{f, n, x_0}(x)\| \leq \lim_{x \to x_0} \frac{c}{(n + 1)!} |x - x_0|^{n+1} \frac{1}{|x - x_0|^n}
$$

**Remarque 5.1.** Ce corollaire justifie formellement l'intuition que $P_{f, n, x_0}$ est une bonne approximation de $f$ autour de $x_0$. On écrit aussi que $f(x) - P_{f, n, x_0}(x)$ est $o(|x - x_0|^n)$ ou $O(|x - x_0|^{n+1})$.

**Remarque 5.2.** Les hypothèses du corollaire ne sont pas les moins fortes possibles (théorème de Taylor-Young).
