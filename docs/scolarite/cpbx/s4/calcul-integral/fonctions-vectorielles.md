---
title: "Calcul différentiel des fonctions vectorielles"
description: "Fonctions vectorielles d'une variable réelle : normes sur Rn, continuité, dérivabilité, dérivée d'une forme bilinéaire, fonctions de classe Ck, Ck-difféomorphismes et fonctions de classe Ck par morceaux."
sidebar_position: 1
---

**Notations et conventions.** On note $\mathbb{N}$ l'ensemble des entiers positifs, $\mathbb{Z}$ l'ensemble des entiers, $\mathbb{Q}$ l'ensemble des rationnels $\cdots$

**Définition 0.1.** Une fonction vectorielle définie sur un intervalle (réel) $I$ est une fonction $f : I \to \mathbb{R}^n$ avec $n \in \mathbb{N}_{\geq 0}$.

**Remarque 0.1.** Si $n = 1$, on a des fonctions "numériques" classiques, c'est-à-dire des fonctions réelles à variable réelle.

**Exemple 0.1.** $f : [0, 1] \to \mathbb{R}^3$, avec $f(t) = (1, t) \ \forall t \in [0, 1]$ ;
$g : [0, 1] \to \mathbb{R}^3$, avec $g(t) = (\cos(t), \exp(-\arctan(t)), t^2 + 2)$.
Il sera utile d'écrire une fonction vectorielle en termes de ses coordonnées. Plus précisément, si $f : I \to \mathbb{R}^n$, alors $f(t) = (f_1(t), \dots, f_n(t))$ avec $f_i : I \to \mathbb{R} \ \forall i = 1, \cdots, n$, avec $f_i := \pi_i \circ f$ où $\pi_i : \begin{cases} \mathbb{R}^n \to \mathbb{R} \\ (x_1, \cdots, x_n) \mapsto x_i \end{cases}$ pour tout $i = 1, \cdots, n$.

**Remarque 0.2 (Idée).** Développer un calcul différentiel (continuité, dérivabilité, intégration) pour des fonctions vectorielles.

## Continuité des fonctions vectorielles

**Remarque 1.1.** Une norme sur $\mathbb{R}^n$ est une application $\|.\| : \mathbb{R}^n \to \mathbb{R}^+$ avec

1. $\|x\| = 0 \Leftrightarrow x = 0$ ;
2. $\|\lambda x\| = |\lambda| \|x\| \ \forall \lambda \in \mathbb{R}, \forall x \in \mathbb{R}^n$ ;
3. $\|x + y\| \leq \|x\| + \|y\| \ \forall x, y \in \mathbb{R}^n$.

**Remarque 1.2.** Nous rappelons les définitions suivantes :

- $\|(x_1, \cdots, x_n)\|_p = \left(\displaystyle\sum_{i=1}^{n} |x_i|^p\right)^{\frac{1}{p}}$ ;
- $\|(x_1, \cdots, x_n)\|_1 = \displaystyle\sum_{i=1}^{n} |x_i|$ ;
- $\|(x_1, \cdots, x_n)\|_\infty = \displaystyle\max_{i = 1, \cdots, n} |x_i|$.

**Exemple 1.1.** Une norme sur $\mathbb{R}^n$ donne une distance sur $\mathbb{R}^n$, $(d_{\|.\|}(x, y) = \|x - y\|)$, donc une notion d'"être proche".

**Proposition 1.1.** *Toutes les normes sur $\mathbb{R}^n$ sont équivalentes, c'est-à-dire que la notion d'"être proche" dans $\mathbb{R}^n$ ne dépend pas du choix de la norme sur $\mathbb{R}^n$.*

**Définition 1.1.** Soit $\|.\|$ une norme sur $\mathbb{R}^n$. Une fonction vectorielle $f : I \to \mathbb{R}^n$ est continue en $x_0 \in I$ si $\forall \epsilon > 0 \ \exists \delta > 0$ tel que

$$
\forall x \in I, \ |x - x_0| < \delta \text{ alors } \|f(x) - f(x_0)\| < \epsilon
$$

**Remarque 1.3.** La définition ne dépend pas du choix de $\|.\|$ grâce à la proposition précédente.

**Définition 1.2.** $f : I \to \mathbb{R}^n$ est dite continue sur $I$ si $f$ est continue en $x_0$, $\forall x_0 \in I$.

**Proposition 1.2.** *Soit $f : I \to \mathbb{R}^n$, alors $f$ est continue si et seulement si toute coordonnée de $f$ est continue.*

*Démonstration.* D'une part ($\Rightarrow$), considérons $\pi : \mathbb{R}^n \to \mathbb{R}$ la $i$-ème projection. Elle est une fonction continue (au sens topologique). Alors $f_i = \pi_i \circ f$, donc $f_i$ est continue étant composition de fonctions continues (preuve alternative, plus directe, en TD).
D'autre part ($\Leftarrow$), on suppose que $f = (f_1, \cdots, f_n)$ et $f_1, \cdots, f_n$ sont continues en $x_0 \in I$ ($f_i : I \to \mathbb{R}$). Par définition, $\forall \epsilon > 0, \exists \delta_i > 0$, $|x - x_0| < \delta_i \Rightarrow |f_i(x) - f_i(x_0)| < \dfrac{\epsilon}{n}$. On veut prouver que $f$ est continue en choisissant par exemple la norme 1, $\|.\|_1$. Soit $\epsilon > 0$ et prenons $\delta = \min \delta_i > 0$, alors si $|x - x_0| < \delta$

$$
\begin{aligned}
&\Rightarrow |x - x_0| < \delta_i \ \forall i = 1, \cdots, n \\
&\Rightarrow |f_i(x) - f_i(x_0)| < \frac{\epsilon}{n} \ \forall i = 1, \cdots, n \\
&\Rightarrow \|f(x) - f(x_0)\|_1 = \sum_{i=1}^{n} |f_i(x) - f_i(x_0)| < \epsilon
\end{aligned}
$$

donc $f$ est continue en $x_0$.

**Exemple 1.2.** $f : [0, 1] \to \mathbb{R}^2$ et $t \mapsto (1, t)$ est continue.

**Exemple 1.3.** $g : \begin{cases} [0, 1] \to \mathbb{R}^2 \\ t \mapsto (\delta_0, t) \end{cases}$ n'est pas continue (symbole de Kronecker).
Il suffit d'avoir une composante non continue pour ne pas avoir continuité de la fonction vectorielle.

## Dérivabilité des fonctions vectorielles

**Définition 2.1.** Une fonction vectorielle $f : I \to \mathbb{R}^n$ est dite dérivable en $x_0 \in I$ si la limite

$$
\lim_{x \to x_0} \frac{f(x) - f(x_0)}{x - x_0}
$$

existe dans $\mathbb{R}^n$. Dans ce cas, la limite s'appelle la dérivée de $f$ en $x_0$ et elle est notée $f'(x_0) \in \mathbb{R}^n$. La fonction $f$ est dite dérivable sur $I$ si elle est dérivable en tout point $x_0 \in I$.

**Remarque 2.1.** $\displaystyle\lim_{x \to x_0} \frac{f(x) - f(x_0)}{x - x_0} = v$ si $\left\|\dfrac{f(x) - f(x_0)}{x - x_0} - v\right\| \to 0$, peu importe quelle norme $\|.\|$ de $\mathbb{R}^n$.

**Proposition 2.1.** *$f : I \to \mathbb{R}^n$ est dérivable en $x_0 \in I$ si et seulement si chaque coordonnée est dérivable en $x_0$, et on a*

$$
f'(x_0) = (f'_1(x_0), \cdots, f'_n(x_0))
$$

*Démonstration.* D'une part ($\Rightarrow$), soit $f$ dérivable en $x_0$, $f'(x_0) = ((f'(x_0))_1, \cdots, (f'(x_0))_n)$. La définition de limite (avec la norme $\|.\|_\infty$) nous dit que

$$
\left\| \frac{f(x) - f(x_0)}{x - x_0} - ((f'(x_0))_1, \cdots, (f'(x_0))_n) \right\|_\infty \to 0
$$

De plus

$$
\frac{f(x) - f(x_0)}{x - x_0} = \left( \frac{f_1(x) - f_1(x_0)}{x - x_0}, \cdots, \frac{f_n(x) - f_n(x_0)}{x - x_0} \right)
$$

On a donc, par la définition de $\|.\|_\infty$,

$$
\max_{i = 1, \cdots, n} \left| \frac{f_i(x) - f_i(x_0)}{x - x_0} - (f'(x_0))_i \right| \to 0
$$

donc en particulier

$$
\left| \frac{f_i(x) - f_i(x_0)}{x - x_0} - f'(x_0)_i \right| \to 0
\qquad
\frac{f_i(x) - f_i(x_0)}{x - x_0} \to (f'(x_0))_i \in \mathbb{R}
$$

donc $f_i$ est dérivable en $x_0$.

$$
f'_i(x_0) = (f'(x_0))_i \quad \forall i = 1, \cdots, n
$$

Donc $f'(x_0) = f$ donc la limite

$$
\lim_{x \to x_0} \frac{f(x) - f(x_0)}{x - x_0} = (f'_1(x_0), \cdots, f'_n(x_0)) \in \mathbb{R}^n
$$

$f$ est dérivable en $x_0$ et de dérivée

$$
f'(x_0) = (f'_1(x_0), \cdots, f'_n(x_0))
$$

D'autre part ($\Leftarrow$), supposons que $\forall i = 1, \cdots, n$, $f_i$ est dérivable en $x_0$ de dérivée $f'_i(x_0)$. Choisissons $\|.\|_\infty$

$$
\left\| \frac{f(x) - f(x_0)}{x - x_0} - (f'_1(x_0) \cdots f'_n(x_0)) \right\|_\infty = \max_i \left| \frac{f_i(x) - f_i(x_0)}{x - x_0} - f'_i(x_0) \right| \to 0
$$

donc la limite $\displaystyle\lim_{x \to x_0} \frac{f(x) - f(x_0)}{x - x_0} = (f'_1(x_0) \cdots f'_n(x_0))$, donc $f$ est dérivable en $x_0$ et de dérivée

$$
f'(x_0) = (f'_1(x_0) \cdots f'_n(x_0))
$$

**Remarque 2.2.** On peut définir aussi les dérivées à droite et à gauche des fonctions vectorielles. Encore une fois, on a les liens avec les dérivées à droite et à gauche des coordonnées.

**Proposition 2.2.** *Soient les propriétés suivantes :*

1. *Soient $f, g : I \to \mathbb{R}^n$ avec $f, g$ dérivables en $x_0 \in I$ et soient $\alpha, \beta \in \mathbb{R}$. Alors $\alpha f + \beta g$ est dérivable en $x_0$ et $(\alpha f + \beta g)'(x_0) = \alpha f'(x_0) + \beta g'(x_0)$ (linéarité de la dérivée).*
2. *Soit $f : I \to \mathbb{R}^n$ avec $I$ intervalle ouvert. Si $f'(x) = 0 \ \forall x \in I$, alors $f$ est (un vecteur) constant.*
3. *Soient $I, J$ deux intervalles réels, $\phi : I \to J$ dérivable sur $I$ et $f : J \to \mathbb{R}^n$ dérivable. Alors $f \circ \phi : I \to \mathbb{R}^n$ est dérivable et de dérivée*

   $$
   (f \circ \phi)'(x) = \phi'(x) f'(\phi(x))
   $$

   *pour tout $x \in I$.*

*Démonstration.*

1. Il suffit de vérifier que toutes les coordonnées de $\alpha f + \beta g$ sont dérivables. Mais $(\alpha f + \beta g)_i = \alpha f_i + \beta g_i$, $\forall i = 1, \cdots, n$. Mais $f_i$ et $g_i$ sont dérivables. $\alpha f_i + \beta g_i$ est dérivable, selon le cours d'Analyse 1. Donc $\alpha f + \beta g$ est dérivable et de dérivée

   $$
   (\alpha f'_1 + \beta g'_1, \cdots, \alpha f'_n + \beta g'_n) = \alpha (f'_1, \cdots, f'_n) + \beta (g'_1, \cdots, g'_n) = \alpha f' + \beta g'
   $$

2. Exercice.
3. Exercice.

Et pour le produit ? Mieux vaut considérer des formes bilinéaires.

**Proposition 2.3.** *Soient $f, g : I \to \mathbb{R}^n$ dérivables en $x_0 \in I$ et soit $b : \mathbb{R}^n \times \mathbb{R}^n \to \mathbb{R}$ une forme bilinéaire, alors $b(f, g) : I \to \mathbb{R}$*

$$
b(f, g) : x \mapsto b(f(x), g(x))
$$

*est dérivable en $x_0$ et de dérivée*

$$
(b(f, g))'(x_0) = b(f'(x_0), g(x_0)) + b(f(x_0), g'(x_0))
$$

*Démonstration.* Voir en TD.

**Exemple.** Pour $n = 1$ et $b : \begin{cases} \mathbb{R} \times \mathbb{R} \to \mathbb{R} \\ (x, y) \mapsto xy \end{cases}$, on a $b(f, g) = fg$, donc l'énoncé coïncide avec celui d'Analyse 1 pour le produit.

**Exemple.** Soit $\langle \cdot, \cdot \rangle$ le produit scalaire standard sur $\mathbb{R}^n$ ($\|x\|_2 = \sqrt{\langle x, x \rangle} \ \forall x \in \mathbb{R}^n$) et soit $f : I \to \mathbb{R}^n$ dérivable. Calculer la dérivée de $\|f\|_2 : \begin{cases} I \to \mathbb{R} \\ x \mapsto \|f(x)\|_2 \end{cases}$.
On a que

- $\langle f, f \rangle : I \to \mathbb{R}$ est dérivable sur $I$ ;
- $\phi$ est dérivable sur $\mathbb{R}^+$. Donc d'après Analyse 1, on a que $\|f\|_2 = \phi \circ (\langle f, f \rangle)$ est dérivable pour $x$ tel que $\langle f(x), f(x) \rangle \neq 0 \Leftrightarrow f(x) \neq 0$, et la dérivée est

$$
\begin{aligned}
(\|f\|_2)'(x) &= (\langle f, f \rangle)'(x) \cdot \phi'(\langle f, f \rangle(x)) \\
&= (\langle f', f \rangle + \langle f, f' \rangle)(x) \times \frac{1}{2\sqrt{\langle f, f \rangle(x)}} \\
&= 2 \langle f, f' \rangle(x) \times \frac{1}{2\|f(x)\|_2} \\
&= \frac{\langle f(x), f'(x) \rangle}{\|f(x)\|_2}
\end{aligned}
$$

## Fonctions de classe $C^k$ par morceaux

### Fonctions de classe $C^k$

On supposera toujours $I$ ouvert et non vide.

**Définition 3.1.** Une fonction vectorielle $f : I \to \mathbb{R}^n$ est dite de classe $C^k$ sur $I$ si $f$ est $k$ fois dérivable sur $I$ et la dérivée $k$-ième $f^{(k)}$ est continue. On écrira $f \in C^k(I, \mathbb{R}^n)$.

**Remarque 3.1.** $C^0(I, \mathbb{R}^n) = \{f : I \to \mathbb{R}^n \text{ continue}\}$.

**Remarque 3.2.** Si $l \geq k$, $C^l(I, \mathbb{R}^n) \subseteq C^k(I, \mathbb{R}^n)$.
En fait, soit $f \in C^l(I, \mathbb{R}^n)$ : $f$ est $l$ fois dérivable, donc $f$ est $k$ fois dérivable. Il reste à prouver que $f^{(k)}$ est continue, mais

- si $l = k$, trivial ;
- si $k < l$, $f^{(k)}$ est dérivable (parce que $f$ admet la dérivée d'ordre $k + 1$), mais dérivable implique continue.

**Remarque 3.3.** On peut aussi donner la définition de $C^k$ par récurrence sur $k$, c'est-à-dire

- $f$ est de classe $C^0$ si $f$ est continue ;
- $f$ est de classe $C^{k+1}$ (avec $k \geq 0$) si $f$ est dérivable et $f' \in C^k$.

**Définition 3.2.** Une fonction vectorielle $f : I \to \mathbb{R}^n$ est dite de classe $C^\infty$ sur $I$ si $f$ est de classe $C^k$ pour tout $k \in \mathbb{N}$. On écrira $f \in C^\infty(I, \mathbb{R}^n)$.

**Remarque 3.4.** $C^\infty(I, \mathbb{R}^n) = \displaystyle\bigcap_{k \in \mathbb{N}} C^k(I, \mathbb{R}^n)$.

**Exemple 3.1.** $f : \mathbb{R} \to \mathbb{R}$, $f(x) := \begin{cases} 0 & \text{si } x \leq 0 \\ x^2 & \text{si } x > 0 \end{cases}$

$$
f \in C^1(\mathbb{R}, \mathbb{R}), \quad f'(x) = \begin{cases} 0 & \text{si } x < 0 \\ 0 & \text{si } x = 0 \\ 2x & \text{si } x > 0 \end{cases}
$$

**Exemple 3.2.**

$$
f : \begin{cases} \mathbb{R}^+ \to \mathbb{R}^2 \\ x \mapsto (\log(x); x^2 + \sin(x)) \end{cases}
$$

**Corollaire 3.1.** *$f : I \to \mathbb{R}^n$ est de classe $C^k$ sur $I$ ; c'est équivalent à dire que chaque coordonnée de $f$ est de classe $C^k$.*

**Proposition 3.1.**

1. *$C^k(I, \mathbb{R}^n)$ est un $\mathbb{R}$-espace vectoriel $\forall k \in \mathbb{N} \cup \{\infty\}$.*
2. *Si $f \in C^k(I, \mathbb{R})$ et $g \in C^k(I, \mathbb{R}^n)$, alors le produit $fg = (fg_1, \cdots, fg_n)$ est dans $C^k(I, \mathbb{R}^n)$.*
3. *Si $f \in C^k(I, \mathbb{R}^n)$, $\phi \in C^k(J, I)$ avec $J, I$ intervalles ouverts réels, alors $f \circ \phi \in C^k(J, \mathbb{R}^n)$.*

*Démonstration.*

1. Exercice (utiliser le corollaire).
2. …
3. On utilise la définition par récurrence sur $k$.
   - $k = 0$ (la composition de fonctions continues est continue).
   - Supposons que le résultat est vrai pour $k$ fixé positif. On le prouve pour $k + 1$. $f$ et $\phi$ sont dérivables, donc $f \circ \phi$ est dérivable et $(f \circ \phi)'(x) = \phi'(x) \cdot f'(\phi(x)) \ \forall x \in J$, donc par hypothèse de récurrence $f' \circ \phi \in C^k(J, \mathbb{R}^n)$.
     D'autre part, on utilise 2) pour déduire que $(f \circ \phi)' = \phi'(f' \circ \phi)$ est de classe $C^k$, donc par définition $f \circ \phi \in C^{k+1}(J, \mathbb{R}^n)$.

### $C^k$-difféomorphismes

Dans cette section, on s'intéresse uniquement à des fonctions réelles de variables réelles.

**Définition 3.3.** Soient $I, J$ deux intervalles ouverts réels. Une fonction $f : I \to J$ est dite un $C^k$-difféomorphisme (avec $k \in \mathbb{N} \cup \{\infty\}$) si

1. $f$ est bijective ;
2. $f \in C^k(I, J)$ ;
3. $f^{-1} \in C^k(J, I)$.

**Exemple 3.3.** $\exp : \mathbb{R} \to \mathbb{R}^+$ est bijective, de réciproque $\log : \mathbb{R}^+ \to \mathbb{R}$. Comme $\exp \in C^\infty(\mathbb{R}, \mathbb{R}^+)$ et $\log \in C^\infty(\mathbb{R}^+, \mathbb{R})$, alors $\exp$ est un $C^\infty$-difféomorphisme de $\mathbb{R}$ vers $\mathbb{R}^+$.

**Proposition 3.2.** *Soient $I$ un intervalle ouvert réel et $f : I \to \mathbb{R}$ une fonction de classe $C^k(I, \mathbb{R})$ avec $k \geq 1$. Alors « $f$ est un $C^k$-difféomorphisme de $I$ vers $f(I)$ » est équivalent à « $f'(x) \neq 0 \ \forall x \in I$ ».*

*Démonstration.* D'une part ($\Rightarrow$), si $f$ est un $C^k$-difféomorphisme, alors en particulier $f$ est inversible, donc il existe $f^{-1}$ avec $f^{-1} \circ f = \text{id}$.
Or, $(f^{-1} \circ f)(x) = x \ \forall x \in I$. Mais, d'après la définition de $C^k$-difféomorphisme et comme $k \geq 1$, $f, f^{-1}$ sont dérivables, donc $1 = (f^{-1} \circ f)'(x) = (f^{-1})'(f(x)) \cdot f'(x) \ \forall x \in I \Rightarrow f'(x) \neq 0 \ \forall x \in I$.
D'autre part ($\Leftarrow$), il faut prouver que

- $f$ est bijective ;
- $f \in C^k(I, f(I))$ (déjà vérifié par hypothèse) ;
- $f^{-1} \in C^k(f(I), I)$.

Prouvons d'abord que $f$ est bijective sur son image : comme $f \in C^1(I, \mathbb{R})$, $f'$ est continue sur $I$, mais par hypothèse $f'(x) \neq 0$. D'après le théorème des valeurs intermédiaires, $f'(x) > 0 \ \forall x \in I$ ou $f'(x) < 0 \ \forall x \in I$, ainsi $f$ est strictement monotone et donc $f$ est bijective sur son image $f(I)$.
Donc il existe $f^{-1} : f(I) \to I$. On va prouver que $f^{-1} \in C^k(f(I), I)$. On voit d'après Analyse 1 que $f^{-1}$ est dérivable sur $f(I)$, de dérivée

$$
(f^{-1})'(y_0) = \frac{1}{f'(f^{-1}(y_0))}
$$

Pour prouver que $f^{-1} \in C^k(f(I), I)$, on peut prouver que $(f^{-1})' \in C^{k-1}(f(I), I)$, mais

$$
(f^{-1})' = \frac{1}{f'(f^{-1})}
$$

Par récurrence, $f^{-1} \in C^k$.

- $k = 0$ implique $f^{-1}$ est continue (Analyse I).
- Supposons que $f^{-1} \in C^l$ ($k > l \geq 0$) ; prouvons que $f^{-1} \in C^{l+1}$. Si $f^{-1} \in C^l$, $f' \in C^{k-1} \subseteq C^l \Rightarrow f' \circ f^{-1} \in C^l \Rightarrow \dfrac{1}{f' \circ f^{-1}} \in C^l \Rightarrow (f^{-1})' \in C^l \Rightarrow f^{-1} \in C^{l+1}$.

Comme on peut utiliser la récurrence pour tout $l < k$, on obtient (à la dernière étape) $f^{-1} \in C^k(f(I), I)$.

### Fonctions de classe $C^k$ par morceaux

**Définition 3.4.** Une fonction $f : (a, b) \to \mathbb{R}^n$ avec $a, b \in \mathbb{R} \cup \{\pm\infty\}$ est dite de classe $C^k$ par morceaux sur $(a, b)$ (avec $k \in \mathbb{N} \cup \{\infty\}$) s'il existe $a_0, \cdots, a_r \in [a, b]$ tels que $a_0 = a < a_1 < \cdots < a_{r-1} < a_r = b$ avec

1. $f_{|]a_i, a_{i+1}[} \in C^k(]a_i, a_{i+1}[, \mathbb{R}^n) \ \forall i = 0, \cdots, r - 1$ ;
2. la limite à droite de $f$ et la limite à gauche de $f$ sont finies en tout point de discontinuité.

**Proposition 3.3.** *Soit $f : I \to \mathbb{R}^n$ avec $I$ un intervalle réel ouvert, $f \in C^0(I, \mathbb{R}^n)$. Alors « $f$ constante » est équivalent à « $f'(x) = 0 \ \forall x$ où $f$ est dérivable ».*

*Démonstration.* D'une part ($\Rightarrow$), trivial.
D'autre part ($\Leftarrow$), on sait qu'il existe $a_0, \cdots, a_{r-1}$ avec $f$ dérivable (et de dérivée nulle) sur chaque $]a_i, a_{i+1}[$, $i \in \{0, \cdots, r - 1\}$, alors $f_{|]a_i, a_{i+1}[}(x) = c_i$ pour tout $i \in \{0, \cdots, r - 1\}$ avec $c_i \in \mathbb{R}^n$. Mais $f$ est continue, donc $\forall i \in \{1, \cdots, r - 1\}$, $c_{i-1} = \displaystyle\lim_{x \to a_i^-} f(x) = \lim_{x \to a_i^+} f(x) = c_i$. Donc $c_0 = c_1 = \cdots = c_{r-1} = c$. Alors $f(x) = c$ sur $I$.
