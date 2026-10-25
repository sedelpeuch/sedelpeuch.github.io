---
title: "Intégrale d'une fonction continue"
description: "Intégrale d'une fonction continue : subdivisions, fonctions en escalier, définition et propriétés de l'intégrale, primitives, théorème fondamental de l'analyse, changement de variable, théorème de la moyenne, intégration par parties et primitives usuelles."
sidebar_position: 2
---

## Subdivision

**Définition.** Soit un segment $[a, b]$. On appelle subdivision de ce segment toute suite finie

$$
a = a_0 < a_1 < a_2 < \dots < a_{n-1} < a_n = b
$$

Le pas de cette subdivision est le plus grand des $a_{i+1} - a_i$. Soient $\sigma$ et $\sigma'$ deux subdivisions de $[a, b]$. On dit que $\sigma'$ est plus fine que $\sigma$ si pour chaque $i$, on peut trouver $j$ tel que $b_j = a_i$, autrement dit si $\sigma'$ découpe plus l'intervalle $[a, b]$ que ne le fait $\sigma$.

**Propriétés.** L'union de deux subdivisions est une subdivision.

## Fonction en escalier

**Définition.** Soit $[a, b]$ un intervalle et $f : [a, b] \to \mathbb{C}$. On dit que $f$ est une fonction en escalier si et seulement s'il existe une subdivision $\sigma = (a_0, a_1, \dots, a_n)$ de $[a, b]$ telle que $f$ soit constante sur chaque intervalle $]a_i, a_{i+1}[$, $i = 0, \dots, n-1$.

**Propriété.** Toute fonction en escalier est bornée car $f$ prend un nombre fini de valeurs (les constantes sur chaque intervalle et $f(a_0), f(a_1), \dots, f(a_n)$).

**Notation.** Soit $[c, d]$ un intervalle. On note $1_{[c,d]}$ la fonction définie par :

$$
1_{[c,d]} : \begin{cases} \mathbb{R} \to \mathbb{R} \\ x \to 1_{[c,d]}(x) = 1 \text{ si } x \in [c, d] \end{cases}
\quad \text{et} \quad
\begin{cases} \mathbb{R} \to \mathbb{R} \\ 1_{[c,d]}(x) = 0 \text{ si } x \notin [c, d] \end{cases}
$$

$1_{[c,d]}$ est appelée la fonction indicatrice de l'intervalle $[c, d]$. Si $\sigma = (a_0, \dots, a_n)$ est une subdivision de $[a, b]$, alors toute fonction en escalier $f$ s'écrit sous la forme :

$$
f(x) = \sum_{i=0}^{n-1} \alpha_i 1_{[a_i, a_{i+1}]}(x)
$$

**Exemple.** $f(x) = 1_{[0,1]}(x) + 1_{]1,2]}(x)$.

$$
f(x) = 1_{[0,3]}(x) + 2 \cdot 1_{]1,2]}(x) + 4 \cdot 1_{]2,3]}(x) =
\begin{cases}
\text{si } x \in (0, 1) : f(x) = 1 \\
\text{si } x \in (1, 2) : f(x) = 3 \\
\text{si } x \in (2, 3) : f(x) = 5
\end{cases}
$$

Ainsi $f(x) = 1_{[0,1]}(x) + 3 \cdot 1_{]1,2]}(x) + 5 \cdot 1_{]2,3]}(x)$. Donc $f$ est une fonction en escalier sur $[0, 3]$.

## Intégrale d'une fonction continue

**Unité d'aire.** Dans un repère orthogonal $(O, \vec{i}, \vec{j})$, l'unité d'aire $(U, a)$ est l'aire du rectangle.

**Définition.** Soit $f : [a, b] \to \mathbb{R}$ une fonction continue et positive, et $C_f$ sa courbe représentative dans un repère orthogonal $(O, \vec{i}, \vec{j})$. On appelle intégrale de la fonction $f$ sur l'intervalle $[a, b]$ l'aire de la partie du plan $E$ située entre la courbe $C_f$ et l'axe des abscisses. On la note $\displaystyle\int_a^b f(x)\,dx = \text{aire}(E)$, avec $E = \left\{(x, y) \in \mathbb{R}^2, 0 \leq y \leq f(x), x \in [a, b]\right\}$.

**Propriétés.** Soient $f, g : [a, b] \to \mathbb{R}$ deux fonctions continues et positives. On a :

1. $\displaystyle\int_a^b f(x)\,dx \geq 0$
2. $\displaystyle\int_a^b (f(x) + g(x))\,dx = \int_a^b f(x)\,dx + \int_a^b g(x)\,dx$
3. $\displaystyle\int_a^c f(x)\,dx + \int_c^b f(x)\,dx = \int_a^b f(x)\,dx, \forall c \in [a, b]$

### Intégrale d'une fonction continue négative

**Définition.** Soit $f : [a, b] \to \mathbb{R}$ une fonction continue et négative. On définit l'intégrale de $f$ sur $[a, b]$ par :

$$
\int_a^b f(x)\,dx = -\int_a^b |f(x)|\,dx
$$

**Théorème II.1.** Soit $f : [a, b] \to \mathbb{R}$ une fonction continue. On pose :

$$
\begin{cases}
f_+ : x \to \dfrac{f(x) + |f(x)|}{2} \\
f_- : x \to \dfrac{f(x) - |f(x)|}{2}
\end{cases}
$$

On a :

1. Les fonctions $f_+$ et $f_-$ sont continues sur $[a, b]$.
2. $f_+(x) \geq 0, \forall x \in [a, b]$
3. $f_-(x) \leq 0, \forall x \in [a, b]$
4. $f(x) = f_+(x) + f_-(x), \forall x \in [a, b]$
5. $f_+(x) = \max(f(x), 0), \forall x \in [a, b]$
6. $f_-(x) = \min(f(x), 0), \forall x \in [a, b]$

**Démonstration.**

1. $f(x)$ est continue par hypothèse, donc $|f(x)|$ est continue. Donc $f_+(x)$ et $f_-(x)$ sont continues.
2. $a \leq |a|$ et $-a \leq |a|$

   $$
   \Rightarrow f(x) \leq |f(x)| \text{ et } -f(x) \leq |f(x)|
   \Rightarrow \frac{f(x) - |f(x)|}{2} \leq 0 \text{ et } \frac{|f(x)| + f(x)}{2} \geq 0
   \Rightarrow f_+(x) \geq 0 \text{ et } f_-(x) \leq 0
   $$

3. $a \leq |a|$ et $-a \leq |a|$

   $$
   \Rightarrow f(x) \leq |f(x)| \text{ et } -f(x) \leq |f(x)|
   \Rightarrow \frac{f(x) - |f(x)|}{2} \leq 0 \text{ et } \frac{|f(x)| + f(x)}{2} \geq 0
   \Rightarrow f_+(x) \geq 0 \text{ et } f_-(x) \leq 0
   $$

4. $f_+(x) + f_-(x) = \dfrac{|f(x)| + f(x)}{2} + \dfrac{f(x) - |f(x)|}{2} = f(x)$
5. $f_+(x) = \dfrac{|f(x)| + f(x)}{2} = \max(f(x), 0)$
6. $f_-(x) = \dfrac{f(x) - |f(x)|}{2} = \min(f(x), 0)$

**Définition.** Soit $f : [a, b] \to \mathbb{R}$, l'intégrale de $f$ sur $[a, b]$ est par définition :

$$
\int_a^b f(x)\,dx = \int_a^b \max(f(x), 0)\,dx + \int_a^b \min(f(x), 0)\,dx
$$

On appelle l'intégrale d'une fonction l'aire algébrique d'une fonction.

**Théorème II.2.** Soient $f, g : [a, b] \to \mathbb{R}$ deux fonctions continues et $\alpha, \beta \in \mathbb{R}$. On a :

1. $\displaystyle\int_a^b \alpha f(x) + \beta g(x)\,dx = \alpha \int_a^b f(x)\,dx + \beta \int_a^b g(x)\,dx$
2. $\displaystyle\int_a^b f(x)\,dx = \int_a^c f(x)\,dx + \int_c^b f(x)\,dx, \forall c \in [a, b]$
3. Si $f(x) \leq g(x), \forall x \in [a, b]$, alors $\displaystyle\int_a^b f(x)\,dx \leq \int_a^b g(x)\,dx$
4. $\displaystyle\int_a^b f(x)\,dx = -\int_b^a f(x)\,dx$
5. $\displaystyle\left|\int_a^b f(x)\,dx\right| \leq \int_a^b |f(x)|\,dx$
6. $\displaystyle\left|\int_a^b f(x)\,dx\right| \leq (\sup|f(x)|)\,|b - a|$
7. Si $f(x) \geq 0$ et $\displaystyle\int_a^b f(x)\,dx = 0$, alors $f(x) = 0, \forall x \in [a, b]$

**Démonstration.**

1. Résulte de la définition des intégrales.
2. Résulte de la définition des intégrales.
3. Si $g(x) - f(x) \geq 0 \Rightarrow \displaystyle\int_a^b (g(x) - f(x))\,dx \geq 0$

   $$
   \Rightarrow \int_a^b g(x) - f(x)\,dx = \int_a^b g(x)\,dx - \int_a^b f(x)\,dx \geq 0
   \Rightarrow \int_a^b g(x)\,dx \geq \int_a^b f(x)\,dx
   $$

4. D'après (2) : $\displaystyle\int_a^b f(x)\,dx + \int_b^a f(x)\,dx = 0$.
5. Comme $f(x) \leq |f(x)|$ et $-f(x) \leq |f(x)|$, alors d'après (3), $\displaystyle\int_a^b f(x)\,dx \leq \int_a^b |f(x)|\,dx$ et $\displaystyle-\int_a^b f(x)\,dx \leq \int_a^b |f(x)|\,dx$, donc $\displaystyle\left|\int_a^b f(x)\,dx\right| \leq \int_a^b |f(x)|\,dx$.
6. $\displaystyle\left|\int_a^b f(x)\,dx\right| \leq \int_a^b |f(x)|\,dx \leq \int_a^b \sup|f(x)|\,dx = \sup|f(x)| \int_a^b dx = (b - a) \sup|f(x)|$
7. Supposons $\exists x_0 \in [a, b]$ tel que $f(x_0) \neq 0$. Comme $f$ est continue en $x_0$, pour $\epsilon = \dfrac{f(x_0)}{2}$, $\exists \eta > 0$, $|x - x_0| < \eta \Rightarrow -\dfrac{f(x_0)}{2} \leq f(x) - f(x_0) \leq \dfrac{f(x_0)}{2}$, donc $\exists \eta > 0, |x - x_0| < \eta, \dfrac{f(x_0)}{2} \leq f(x)$, et

   $$
   \int_a^b f(x)\,dx = \int_a^{x_0 - \eta} f(x)\,dx + \int_{x_0 - \eta}^{x_0 + \eta} f(x)\,dx + \int_{x_0 + \eta}^{b} f(x)\,dx \geq \int_{x_0 - \eta}^{x_0 + \eta} f(x)\,dx \geq \frac{f(x_0)}{2} \int_{x_0 - \eta}^{x_0 + \eta} dx
   $$

   car $f(x) \geq 0$, soit $\dfrac{f(x_0)}{2}(x_0 + \eta - (x_0 - \eta)) = \eta f(x_0) > 0$. Ceci contredit l'hypothèse $\displaystyle\int_a^b f(x)\,dx = 0$. Donc $\forall x \in [a, b], f(x) = 0$.

## Primitives

**Définition.** Soit $f : [a, b] \to \mathbb{R}$. On dit que $F : [a, b] \to \mathbb{R}$ est une primitive de $f$ si et seulement si $F'(x) = f(x), \forall x \in [a, b]$.

**Théorème II.3.** Si $F_1(x)$ et $F_2(x)$ sont deux primitives de $f : [a, b] \to \mathbb{R}$, alors il existe une constante $C$ telle que $F_1(x) = F_2(x) + C$.

**Démonstration.** On pose $G(x) = F_1(x) - F_2(x)$.

$$
\begin{aligned}
&G'(x) = F_1'(x) - F_2'(x) = f(x) - f(x) = 0, \forall x \in [a, b] \\
\Rightarrow\ &G'(x) = 0, \forall x \in [a, b], \text{ le théorème des accroissements finis} \Rightarrow G(x) = G(a), \forall x \in [a, b] \\
\Rightarrow\ &F_1(x) - F_2(x) = C(a) = \text{constante}
\end{aligned}
$$

**Théorème II.4** (Théorème fondamental de l'analyse)**.** Soit $f : [a, b] \to \mathbb{R}$ une fonction continue. On définit $F : [a, b] \to \mathbb{R}$ et $x \to \displaystyle\int_a^x f(t)\,dt$. Alors $F$ est dérivable et $F'(x) = f(x), \forall x \in [a, b]$.

**Démonstration.** On fixe $x_0 \in ]a, b[$ :

$$
\begin{aligned}
\left|\frac{F(x_0 + h) - F(x_0)}{h} - f(x_0)\right|
&= \left|\frac{\int_a^{x_0 + h} f(t)\,dt - \int_a^{x_0} f(t)\,dt}{h} - f(x_0)\right| \\
&= \left|\frac{\int_a^{x_0} f(t)\,dt + \int_{x_0}^{x_0 + h} f(t)\,dt - \int_a^{x_0} f(t)\,dt}{h} - f(x_0)\right| \\
&= \left|\frac{\int_{x_0}^{x_0 + h} f(t)\,dt - f(x_0) \int_{x_0}^{x_0 + h} dt}{h}\right|
= \left|\frac{\int_{x_0}^{x_0 + h} [f(t) - f(x_0)]\,dt}{h}\right| \\
&\leq \sup|f(t) - f(x_0)| \to 0
\end{aligned}
$$

$$
\Rightarrow \lim_{h \to 0} \frac{F(x_0 + h) - F(x_0)}{h} = F'(x_0) = f(x_0)
$$

**Corollaire.** Si $f : [a, b] \to \mathbb{R}$ est continue, alors $F(x) = \displaystyle\int_a^x f(t)\,dt$ est une primitive de $f$ et toute autre primitive de $f$ s'écrit :

$$
\int_a^x f(t)\,dt + \text{cte}
$$

**Remarque.** $\displaystyle\int_a^x f(t)\,dt$ s'appelle la primitive de $f(x)$ qui s'annule en $x = a$.

**Théorème II.5** (Théorème de changement de variable)**.** Soit $\Phi : [a, b] \to \mathbb{R}$ dérivable et $f : [c, d] \to \mathbb{R}$ une fonction continue. On suppose que $\Phi([a, b]) \subset [c, d]$. Alors :

$$
\int_{\Phi(a)}^{\Phi(x)} f(t)\,dt = \int_a^x f \circ \Phi(t)\, \Phi'(t)\,dt, \quad \forall x \in [a, b]
$$

En particulier :

$$
\int_{\Phi(a)}^{\Phi(b)} f(t)\,dt = \int_a^b f \circ \Phi(t)\, \Phi'(t)\,dt
$$

Remarque : l'hypothèse $\Phi([a, b]) \subset [c, d]$ assure que la fonction $f \circ \Phi(t)$ est bien définie.

**Démonstration.** On pose $F(x) = \displaystyle\int_{\Phi(a)}^{\Phi(x)} f(t)\,dt$ et $G(x) = \displaystyle\int_a^x f \circ \Phi(t)\, \Phi'(t)\,dt$. Soit $K(x) = \displaystyle\int_{\Phi(a)}^{x} f(t)\,dt$, $K'(x) = f(x)$.

$$
\begin{aligned}
&F(x) = K(\Phi(x)) \\
&F'(x) = K'(\Phi(x))\,\Phi'(x) = f(\Phi(x))\,\Phi'(x) \\
&G'(x) = f \circ \Phi(x) \cdot \Phi'(x) \Rightarrow F'(x) = G'(x), \forall x \in [a, b] \Rightarrow F(x) = G(x) + \text{cte} \Rightarrow \text{cte} = 0 \text{ comme } F(a) = G(a) = 0
\end{aligned}
$$

Donc $F(x) = G(x), \forall x \in [a, b]$.

**Théorème II.6** (Théorème de la moyenne)**.** Soit $f : [a, b] \to \mathbb{R}$ une fonction continue. Alors $\exists c \in ]a, b[$ tel que :

$$
\frac{1}{b - a} \int_a^b f(t)\,dt = f(c)
$$

**Démonstration.** Soit $F : [a, b] \to \mathbb{R}$ et $x \to \displaystyle\int_a^x f(t)\,dt$. On sait que $F$ est dérivable et $F'(x) = f(x)$. D'après le théorème des accroissements finis, $\exists c \in ]a, b[$ tel que :

$$
\frac{F(b) - F(a)}{b - a} = F'(c) \quad \text{donc} \quad \frac{F(b) - F(a)}{b - a} = \frac{\int_a^b f(t)\,dt - \int_a^a f(t)\,dt}{b - a} = f(c) \Rightarrow \frac{1}{b - a} \int_a^b f(t)\,dt = f(c)
$$

**Théorème II.7.** Soit $f : [a, b] \to \mathbb{R}$ et $F$ une primitive de $f$. Alors $\displaystyle\int_a^b f(t)\,dt = F(b) - F(a)$.

**Démonstration.** On sait que toute primitive de $f$ est de la forme $\displaystyle\int_a^x f(t)\,dt + \text{cte} \Rightarrow \exists$ une constante $c$ telle que $F(x) = \displaystyle\int_a^x f(t)\,dt + c$.

$$
F(b) - F(a) = \int_a^b f(t)\,dt + c - \left(\int_a^a f(t)\,dt + c\right) = \int_a^b f(t)\,dt
$$

**Remarque.** $\displaystyle\int_a^b f(t)\,dt$ est indépendant de la variable $t$. On l'appelle variable muette.

**Théorème II.8** (Théorème de l'intégration par parties)**.** Soient $f, g : [a, b] \to \mathbb{R}$ deux fonctions dérivables. On a :

$$
\int_a^b f(x) g'(x)\,dx = f(b)g(b) - f(a)g(a) - \int_a^b f'(x) g(x)\,dx
$$

**Démonstration.** Comme $(fg)'(x) = f'(x)g(x) + f(x)g'(x)$, alors $f(x)g(x)$ est une primitive de $f'(x)g(x) + g'(x)f(x)$. Donc $\displaystyle\int_a^b f'(x)g(x) + g'(x)f(x)\,dx = f(b)g(b) - f(a)g(a)$.

**Théorème II.9.** Soient $\phi : [a, b] \to \mathbb{R}$ dérivable et $f : [c, d] \to \mathbb{R}$ une fonction continue. On suppose que $\phi([a, b]) \subset [c, d]$. On définit $G(x) = \displaystyle\int_c^{\phi(x)} f(t)\,dt$. Alors $G$ est dérivable et on a $G'(x) = f \circ \phi(x) \cdot \phi'(x), \forall x \in [a, b]$.

**Démonstration.** On pose $F(x) = \int_c^x f(t)\,dt$, donc $G(x) = F \circ \phi(x)$. L'hypothèse $\phi([a, b]) \subset [c, d]$ implique que la fonction $F \circ \phi$ est bien définie. Donc $G$ est dérivable car $F$ et $\phi$ sont dérivables :

$$
G'(x) = (F \circ \phi)'(x) = F' \circ \phi(x) \cdot \phi'(x) = f \circ \phi(x) \cdot \phi'(x)
$$

## Primitives usuelles

| Fonctions | Domaine | Primitives |
| --- | --- | --- |
| $e^{ax}, a \neq 0$ | $\mathbb{R}$ | $\dfrac{e^{ax}}{a} + \text{cte}$ |
| $\dfrac{1}{x}$ | $x > 0$ | $\ln(x)$ |
| $\dfrac{1}{x}$ | $x < 0$ | $\ln(-x)$ |
| $x^m, m \neq -1$ | $x > 0$ | $\dfrac{x^{m+1}}{m+1}$ |
| $x^n, n \in \mathbb{Z}$ | $x \in \mathbb{R}$ | $\dfrac{x^{n+1}}{n+1}$ |
| $\cos(x)$ | $x \in \mathbb{R}$ | $\sin(x)$ |
| $\sin(x)$ | $x \in \mathbb{R}$ | $-\cos(x)$ |
| $\dfrac{1}{\cos^2(x)}$ | $x \in \left]-\frac{\pi}{2}, \frac{\pi}{2}\right[$ | $\tan(x)$ |
| $\dfrac{u'(x)}{u(x)}$ | $x \in$ domaine | $\ln\lvert u(x) \rvert$ |
| $\dfrac{1}{\sqrt{1 - x^2}}$ | $\lvert x \rvert < 1$ | $\arcsin(x)$ |
| $\dfrac{1}{1 + x^2}$ | $x \in \mathbb{R}$ | $\arctan(x)$ |

### Méthodes de calcul intégral

**IPP.** Voir maths spé, fonda ou outils maths.

Exemple : calculer les primitives de $x\cos(x)$ :

$$
\int t\cos(t)\,dt = [t\sin(t)] - \int \sin(t)\,dt = x\sin(x) + \cos(x) + \text{cte}
$$

Remarque : pour calculer les primitives de $x^n\cos(x)$ ou $x^n e^x$, on fait une IPP.

**Décomposition en éléments simples.** Voir maths fonda ou algèbre.

On veut calculer les primitives de $\dfrac{1}{(x - a)(x - b)}$. On cherche $A$ et $B$ tels que :

$$
\frac{1}{(x - a)(x - b)} = \frac{A}{x - a} + \frac{B}{x - b}
$$

On trouve les coefficients en multipliant par $(x - \text{pôle})$.

On veut calculer la primitive de $f(x) = \dfrac{1}{\alpha x^2 + \beta x + \gamma}$, $\alpha \neq 0$.

- Si $\Delta = \beta^2 - 4\alpha\gamma > 0$, alors on peut écrire $\alpha x^2 + \beta x + \gamma = \alpha(x - a)(x - b)$, donc $f(x) = \dfrac{1}{\alpha(x - a)(x - b)}$. On utilise les primitives de $\dfrac{1}{(x - a)(x - b)}$.
- Si $\Delta = \beta^2 - 4\alpha\gamma = 0$, alors $\alpha x^2 + \beta x + \gamma = \alpha(x - a)^2$. Donc $f(x) = \dfrac{1}{\alpha(x - a)^2} \Rightarrow \displaystyle\int f(t)\,dt = -\frac{1}{\alpha(x - a)} + \text{cte}$.
- Si $\Delta = \beta^2 - 4\alpha\gamma < 0$, $f(x) = \dfrac{1}{\alpha x^2 + \beta x + \gamma}$. En général :

  $$
  \alpha x^2 + \beta x + \gamma = \alpha\left(x^2 + \frac{\beta x}{\alpha} + \frac{\gamma}{\alpha}\right) = \alpha\left[\left(x + \frac{\beta}{2\alpha}\right)^2 - \left(\frac{\beta}{2\alpha}\right)^2 + \frac{\gamma}{\alpha}\right] = \alpha\left[\left(x + \frac{\beta}{2\alpha}\right)^2 + \frac{-\beta^2 + 4\alpha\gamma}{4\alpha^2}\right]
  $$

  On pose $A^2 = \dfrac{-\beta^2 + 4\alpha\gamma}{4\alpha^2}$ :

  $$
  \alpha x^2 + \beta x + \gamma = \alpha\left(\left(x + \frac{\beta}{2\alpha}\right)^2 + A^2\right) = \alpha A^2\left[\left(\frac{1}{A}\left(x + \frac{\beta}{2\alpha}\right)\right)^2 + 1\right]
  $$

  Ainsi

  $$
  \int \frac{1}{\alpha t^2 + \beta t + \gamma}\,dt = \int \frac{1}{\alpha A^2\left[\frac{1}{A^2}\left(t + \frac{\beta}{2\alpha}\right)^2 + 1\right]}\,dt = \frac{1}{\alpha A^2} \int \frac{1}{A^{-2}\left(t + \frac{\beta}{2\alpha}\right)^2 + 1}\,dt
  $$

  Changement de variable $y = t + \dfrac{\beta}{2\alpha}$, $dy = dt$, puis $z = A^{-1}y$, $\dfrac{dz}{dy} = A^{-1}$ :

  $$
  \frac{1}{\alpha A^2} \int \frac{1}{A^{-2}y^2 + 1}\,dy = \frac{1}{\alpha A^2} \int \frac{1}{z^2 + 1} A\,dz = \frac{1}{\alpha A} \int^{\frac{1}{A}\left(x + \frac{\beta}{2\alpha}\right)} \frac{1}{z^2 + 1}\,dz = \frac{1}{\alpha A} \arctan\left(\frac{1}{A}\left(x + \frac{\beta}{2\alpha}\right)\right) + \text{cte}
  $$

**Théorème II.10.** Soit $f(x) = \dfrac{1}{\alpha x^2 + \beta x + \gamma}$ avec $\beta^2 - 4\alpha\gamma < 0$. Les primitives de $f$ sont :

$$
\frac{1}{\alpha A} \arctan\left(\frac{1}{A}\left(x + \frac{\beta}{2\alpha}\right)\right) + \text{cte} \quad \text{avec} \quad A = \frac{\sqrt{-\beta^2 + 4\alpha\gamma}}{2|\alpha|}
$$
