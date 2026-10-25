---
title: "Espaces vectoriels normés"
description: "Espaces vectoriels normés : normes et normes équivalentes, distance, produit scalaire et inégalité de Cauchy-Schwarz, ouverts, fermés, intérieur et adhérence, suites, complétude, dimension finie, limites et continuité, continuité des applications linéaires et norme subordonnée."
sidebar_position: 2
---

## Normes

### Généralités

**Définition.** Soit $N : E \to \mathbb{R}$ une application. On dit que $N$ est une norme si :

1. $N(x) \geq 0, \forall x \in E$ et $(N(x) = 0 \Rightarrow x = 0)$
2. $\forall x \in E, \forall \lambda \in \mathbb{K}, N(\lambda x) = |\lambda| N(x)$
3. $\forall x, y \in E, N(x + y) \leq N(x) + N(y)$ : c'est l'inégalité triangulaire.

**Exemples.**

1. La fonction $x \mapsto |x|$ est une norme sur $\mathbb{K}$.
2. Sur $\mathbb{K}^d$, $||x||_1 := \displaystyle\sum_{j=1}^{d} |x_j|$ est une norme.
3. Sur $\mathbb{K}^d$, $||x||_2 := \sqrt{\displaystyle\sum_{j=1}^{d} |x_j|^2}$ est une norme. On l'appelle norme euclidienne.
4. Sur $\mathbb{K}^d$, $||x||_\infty = \max_{j=1,\dots,d} |x_j|$ est une norme.

**Exercice.** Soient $[a, b]$ un intervalle fermé borné de $\mathbb{R}$ et soit $E = \mathcal{C}([a, b], \mathbb{K})$. Montrer que les applications ci-dessous définissent bien une norme sur $E$.

$$
||f||_1 = \int_a^b |f(x)|\,dx, \qquad ||f||_\infty = \sup_{[a,b]} |f|
$$

**Définition.** Soit $E$ un espace vectoriel et soient $N_1, N_2$ deux normes sur $E$. On dit que $N_1$ et $N_2$ sont équivalentes s'il existe des constantes $C, C' > 0$ telles que

$$
C N_2(x) \leq N_1(x) \leq C' N_2(x)
$$

pour tout $x \in E$.

**Remarque.** La relation d'équivalence entre normes est une relation d'équivalence.

**Démonstration.** On a bien $N$ équivalente à $N$ (prendre $C = C' = 1$). Supposons $N_1$ équivalente à $N_2$, alors

$$
C N_2 \leq N_1 \leq C' N_2
$$

Par suite

$$
\frac{1}{C'} N_1 \leq N_2 \leq \frac{1}{C} N_1
$$

ce qui prouve la symétrie de la relation. Enfin si $N_1$ est équivalente à $N_2$ et $N_2$ équivalente à $N_3$, alors

$$
C N_2 \leq N_1 \leq C' N_2
$$

et

$$
D N_3 \leq N_2 \leq D' N_3
$$

Par suite

$$
C D N_3 \leq N_1 \leq C' D' N_3
$$

donc $N_1$ et $N_3$ sont équivalentes. $\square$

**Proposition.** Les normes $||.||_1$, $||.||_2$ et $||.||_\infty$ sont équivalentes sur $\mathbb{K}^d$.

**Démonstration.** On a clairement

$$
||x||_\infty \leq ||x||_1 \leq d\,||x||_\infty
$$

donc les normes $||.||_\infty$ et $||.||_1$ sont équivalentes. De même, on a

$$
||x||_\infty \leq ||x||_2 \leq \sqrt{d}\,||x||_\infty
$$

ce qui montre que $||.||_\infty$ et $||.||_2$ sont équivalentes. L'équivalence entre $||.||_1$ et $||.||_2$ est alors une conséquence de la remarque précédente. $\square$

**Définition.** Soit $E$ un ensemble et $d : E \times E \to \mathbb{R}_+$ une application. On dit que $d$ est une distance sur $E$ si les propriétés suivantes sont vérifiées :

1. pour tout $x, y \in E, d(x, y) = d(y, x)$ (symétrie)
2. pour tout $x, y \in E, d(x, y) = 0 \Rightarrow x = y$
3. pour tout $x, y, z \in E, d(x, y) \leq d(x, z) + d(y, z)$ (inégalité triangulaire)

**Proposition.** Soit $(E, N)$ un espace vectoriel normé. L'application $d : E \times E \to \mathbb{R}_+$ donnée par $d(x, y) = N(x - y)$ est une distance.

**Démonstration.**

1. $d(x, x) = ||0|| = 0$, $d(x, y) = 0 \Rightarrow ||x - y|| = 0 \Rightarrow x - y = 0 \Rightarrow x = y$
2. $d(y, x) = ||y - x|| = ||(-1)(x - y)|| = ||x - y||$
3. $d(x, y) = ||x - y|| = ||x - z + z - y|| \leq ||x - z|| + ||z - y|| = d(x, z) + d(z, y)$

$\square$

### Espace préhilbertien

**Définition.** Soit $E$ un $\mathbb{K}$-espace vectoriel. Un produit scalaire sur $E$ est une application $\phi : E \times E \to \mathbb{R}$ vérifiant les propriétés suivantes :

1. Pour tout $y \in E$, l'application $x \mapsto \phi(x, y)$ est linéaire.
2. Pour tout $x, y \in E$, on a $\phi(x, y) = \overline{\phi(y, x)}$.
3. Pour tout $x \in E$, $\phi(x, x) \geq 0$ et

   $$
   \phi(x, x) = 0 \Rightarrow x = 0
   $$

Un espace $E$ muni d'un produit scalaire est dit préhilbertien.

**Exemple.**

1. Sur $\mathbb{R}^d$ : $\phi(x, y) = \langle x, y \rangle = \displaystyle\sum_{j=1}^{d} x_j y_j$
2. Sur $E = \mathcal{C}([0, 1], \mathbb{R})$ : $\langle f, g \rangle = \int_0^1 f(x) g(x)\,dx$

**Démonstration.**

1. Soit $g$ fixée, montrons que $u : f \mapsto \int f g$ est linéaire. On a $u(\lambda f + \mu \tilde{f}) = \lambda \int f g + \mu \int \tilde{f} g$.
2. Immédiat.
3. $d(f, f) = \int f^2 \geq 0$. Supposons que $\int f^2 = 0 \Rightarrow f = 0$.

$\square$

**Théorème II.1.** (Inégalité de Cauchy-Schwarz) Soit $(E, \langle . \rangle)$ un espace préhilbertien. On a l'inégalité suivante

$$
|\langle x, y \rangle| \leq \sqrt{\langle x, x \rangle} \sqrt{\langle y, y \rangle}
$$

**Démonstration.** Pour simplifier, on suppose que $\mathbb{K} = \mathbb{R}$. Soit $x, y \in E$. Considérons l'application $f : \mathbb{R} \to \mathbb{R}$ définie par $f(t) = \langle x + ty, x + ty \rangle$. On a

$$
f(t) = t^2 \langle y, y \rangle + 2t \langle x, y \rangle + \langle x, x \rangle
$$

et $f(t) \geq 0$ pour tout $t$. Comme $f$ est un polynôme du second degré, on en déduit que son discriminant est négatif :

$$
\langle x, y \rangle^2 - \langle x, x \rangle \langle y, y \rangle \leq 0
$$

Par suite $\langle x, y \rangle^2 - \langle x, x \rangle \langle y, y \rangle \leq 0$ et le résultat est obtenu en prenant la racine carrée. $\square$

**Corollaire.** Soit $(E, \langle . \rangle)$ un espace préhilbertien. Alors l'application $x \mapsto ||x|| = \langle x, x \rangle^{\frac{1}{2}}$ est une norme.

**Démonstration.** Le seul point compliqué est l'inégalité triangulaire. Montrons que $||x + y|| \leq ||x|| + ||y||$ et $||x + y||^2 = \langle x + y, x + y \rangle = \langle x, x \rangle + \langle y, y \rangle + 2 \langle x, y \rangle \leq ||x||^2 + ||y||^2 + 2||x||\,||y|| \leq (||x|| + ||y||)^2$. $\square$

**Application.** Sur $\mathbb{R}^d$, $||x||_2 = \Big(\displaystyle\sum_{j=1}^{d} x_j^2\Big)^{\frac{1}{2}}$ est une norme.

## Rudiments de topologie des espaces vectoriels normés

Dans cette section $(E, ||.||)$ désigne un espace vectoriel normé (evn).

**Définition.** Soit $a \in E$ et $r > 0$. On appelle boule ouverte de centre $a$ et de rayon $r$ l'ensemble

$$
B(a, r) = \{x \in E, ||x - a|| < r\}
$$

On appelle boule fermée de centre $a$ et de rayon $r$ l'ensemble

$$
\tilde{B}(a, r) = \{x \in E, ||x - a|| \leq r\}
$$

**Définition.** Soit $A$ un sous-ensemble de $E$. On dit que $A$ est borné s'il existe $M > 0$ tel que $A \subset \tilde{B}(0, M)$, c'est-à-dire

$$
\forall x \in A, ||x|| \leq M
$$

**Définition.** Soit $U$ un sous-ensemble de $E$. On dit que $U$ est ouvert si

$$
\forall x \in U, \exists r > 0, B(x, r) \subset U
$$

On dit qu'un sous-ensemble $F$ de $E$ est fermé si son complémentaire $E \setminus F$ est ouvert.

**Exemple.** Dans $(\mathbb{R}, |.|)$, soit $I = (a, b)$ un intervalle. Alors $I$ est ouvert si et seulement si $I = \left]a, b\right[$, et il est fermé si et seulement si $I = [a, b]$.

**Démonstration.** Supposons que $I = \left]a, b\right[$. Montrons que $I$ est ouvert. Soit $x \in I$, soit $r = \frac{1}{2}\min(|x - a|, |x - b|)$. On vérifie facilement que $B(x, r) \subset I$. Réciproquement, montrons que $I = \left]a, b\right]$ n'est pas ouvert. On a $b \in I$ et $\forall r > 0$, $B(b, r) \cap I^c \neq \emptyset$. $\square$

**Exemple.** Les boules ouvertes sont ouvertes et les boules fermées sont fermées.

**Remarque.** $E$ et $\emptyset$ sont toujours ouverts et fermés. Ce sont les seuls sous-ensembles de $E$ à posséder cette propriété.

**Proposition.** Soit $(E, ||.||)$ un espace vectoriel normé et soient $\mathcal{F}$ l'ensemble des fermés de $E$ et $\mathcal{O}$ l'ensemble des ouverts de $E$. Alors

1. $\mathcal{O}$ est stable par union quelconque et intersection finie.
2. $\mathcal{F}$ est stable par union finie et intersection quelconque.

**Démonstration.** On remarque d'abord que 1 et 2 sont équivalents par passage au complémentaire. On va donc montrer 1. Soit $(\Omega_i)_{i \in I}$ une collection d'ouverts et soit $\Omega = \bigcup_{i \in I} \Omega_i$. Soit $a \in \Omega$, alors il existe $i_0 \in I$ tel que $a \in \Omega_{i_0}$. Comme $\Omega_{i_0}$ est ouvert, alors il existe $r > 0$ tel que $B(a, r) \subset \Omega_{i_0}$. Comme $\Omega_{i_0} \subset \Omega$, il suit que $B(a, r) \subset \Omega$.

Supposons maintenant que l'ensemble $I$ est fini et soit $\Omega' = \bigcap_{i \in I} \Omega_i$. Soit $a \in \Omega'$. Pour tout $i \in I$, $a \in \Omega_i$, donc il existe $r_i > 0$ tel que $B(a, r_i) \subset \Omega_i$. On pose $r = \min_{i \in I} r_i$. Comme $I$ est fini, alors $r > 0$. De plus, par définition, pour tout $i \in I$, on a $B(a, r) \subset B(a, r_i) \subset \Omega_i$.
On en déduit $B(a, r) \subset \Omega'$. $\square$

**Remarque.** Une intersection quelconque d'ouverts n'est pas nécessairement ouverte. Par exemple

$$
\Omega_n = B\Big(0, \frac{1}{n}\Big), n \in \mathbb{N}^*
$$

Les $\Omega_n$ sont ouverts mais $\displaystyle\bigcap_{n \in \mathbb{N}^*} \Omega_n = \{0\}$, qui n'est pas ouvert.

**Théorème II.2.** Soit $A$ un sous-ensemble de $E$.

- Il existe un unique ouvert $\mathring{A}$ contenu dans $A$ et maximal pour l'inclusion (c'est-à-dire tout ouvert de $E$ contenu dans $A$ est nécessairement contenu dans $\mathring{A}$). On appelle $\mathring{A}$ l'intérieur de $A$.
- Il existe un unique fermé $\overline{A}$ contenant $A$ et minimal pour l'inclusion (c'est-à-dire tout fermé de $E$ contenant $A$ contient nécessairement $\overline{A}$). On appelle $\overline{A}$ l'adhérence de $A$.

**Démonstration.** Soit $\Omega_A$ l'ensemble des ouverts de $E$ contenus dans $A$. On définit $\mathring{A} = \displaystyle\bigcup_{\omega \in \Omega_A} \omega$. Par définition, $\mathring{A} \subset A$ et d'après la proposition précédente, $\mathring{A}$ est ouvert. Supposons maintenant que $U$ est un ouvert de $E$ contenu dans $A$. Alors $U \in \Omega_A$, donc $U \subset \mathring{A}$.

Le deuxième point peut se montrer aisément par passage au complémentaire. On peut aussi refaire la démonstration. Soit $F_A$ l'ensemble des fermés de $E$ contenant $A$. On définit $\overline{A} = \bigcap_{G \in F_A} G$. Par définition, $A \subset \overline{A}$ et d'après la proposition précédente, $\overline{A}$ est fermé. Supposons maintenant que $H$ est un fermé de $E$ contenant $A$. Alors $H \in F_A$, donc $\overline{A} \subset H$. $\square$

**Exemple.** Soient $a \in E$ et $r > 0$, alors $\overline{B}(a, r)$ est l'adhérence de $B(a, r)$ et $B(a, r)$ est l'intérieur de $\overline{B}(a, r)$.

**Définition.** On appelle frontière de $A$ l'ensemble

$$
\delta A = \overline{A} \setminus \mathring{A}
$$

**Exercice.** Montrer que $\delta A$ est un fermé.

## Suites dans les espaces vectoriels normés

**Définition.** Soit $(E, ||.||)$ un espace vectoriel normé et soit $u = (u_n)_{n \in \mathbb{N}}$ une suite d'éléments de $E$. On dit que la suite $u$ converge vers une limite $l \in E$ si

$$
\forall \epsilon > 0, \exists N \in \mathbb{N}, \forall n \geq N, ||u_n - l|| < \epsilon
$$

**Remarque.** Comme dans le cas des suites numériques, on a unicité de la limite. La notion de convergence dépend a priori de la norme qu'on utilise. Cependant, lorsque deux normes sont équivalentes, les suites convergentes sont les mêmes.

**Proposition.** Soit $E$ un espace vectoriel et $N_1$, $N_2$ deux normes sur $E$. On suppose que $N_1$ et $N_2$ sont équivalentes. Alors toute suite convergente pour $N_1$ est convergente pour $N_2$, et la limite est identique.

**Démonstration.** $N_1$ est équivalente à $N_2$ si $\exists c > 0$ tel que $\frac{1}{c} N_2 \leq N_1 \leq c N_2$. Donc $N_1 \leq \epsilon \Rightarrow N_2 < c\epsilon$ et $N_2 < \epsilon \Rightarrow N_1 < c\epsilon$. $\square$

**Définition.** Soit $u = (u_n)_n \in E^{\mathbb{N}}$. On dit que la suite $(u_n)$ est de Cauchy si

$$
\forall \epsilon, \exists N \in \mathbb{N}, \forall n, m \geq N, ||u_n - u_m|| < \epsilon
$$

**Définition.** Soit $(E, ||.||)$ un espace vectoriel normé. On dit que $E$ est complet si toute suite de Cauchy de $E$ converge dans $E$.

**Théorème II.3.** L'espace $(\mathbb{R}, |.|)$ est complet.

**Théorème II.4.** Soit $(E, ||.||)$ un espace vectoriel normé. On suppose que $\dim(E) < +\infty$. Alors $E$ est complet.

**Remarque.** Ceci est faux en dimension infinie.

**Définition.** Soit $u_n = (u_n)_n \in E^{\mathbb{N}}$. On dit que la suite $(u_n)$ est bornée si l'ensemble $\{u_n, n \in \mathbb{N}\}$ est borné dans $E$. Autrement dit, s'il existe $M > 0$ tel que

$$
\forall n \in \mathbb{N}, ||u_n|| \leq M
$$

**Remarque.** Toute suite convergente est bornée.

**Définition.** Soit $u = (u_n)$ une suite de $E$. On dit que $v = (v_n)$ est une suite extraite de $u$ si elle est de la forme $v_n = u_{\phi(n)}$ avec $\phi : \mathbb{N} \to \mathbb{N}$ strictement croissante.

**Proposition.** Toute suite extraite d'une suite convergeant vers une limite $l$ converge vers $l$.

**Théorème II.5.** Soit $(E, ||.||)$ un espace vectoriel normé et soit $F$ une partie de $E$. Alors $F$ est fermée si et seulement si pour toute suite $(u_n)$ d'éléments de $F$ convergeant vers $l$, on a $l \in F$.

**Démonstration.** Supposons que $F$ est fermé et soit $(u_n)$ une suite d'éléments de $F$ qui converge vers $l \in E$. Supposons par l'absurde que $l \notin F$, c'est-à-dire $l \in E \setminus F$. Comme $F$ est fermé, alors $E \setminus F$ est ouvert. Par suite il existe $r > 0$ tel que $B(l, r) \subset E \setminus F$. On applique alors la définition de la convergence avec $\epsilon = r$. Il existe $n_0$ tel que $u_{n_0} \in B(l, r) \subset E \setminus F$. D'où une contradiction.

Supposons maintenant que $F$ n'est pas fermé. Alors $E \setminus F$ n'est pas ouvert, donc il existe $l \in E \setminus F$ tel que

$$
\forall r > 0, B(l, r) \cap F \neq \emptyset
$$

En prenant $\epsilon = \epsilon_n = 2^{-n}$, on en déduit l'existence d'une suite $u_n \in B(l, 2^{-n}) \cap F$. Par définition, c'est une suite d'éléments de $F$, et comme $2^{-n} \to 0$ quand $n \to \infty$, la suite $(u_n)$ converge vers $l \notin F$. Ceci prouve le résultat (par contraposée). $\square$

**Corollaire.** Soit $(E, ||.||)$ un espace vectoriel normé, soit $A$ une partie de $E$ et soit $a \in E$. Alors $a \in \overline{A}$ si et seulement s'il existe une suite d'éléments de $A$ qui converge vers $a$. Autrement dit, $\overline{A}$ est exactement l'ensemble des limites de suites d'éléments de $A$.

**Démonstration.** Soit $a \in E$ et supposons que $a$ est limite d'une suite $u$ d'éléments de $A$. Comme $A \subset \overline{A}$, $u$ est une suite d'éléments de $\overline{A}$, et comme $\overline{A}$ est fermé, alors $a \in \overline{A}$ d'après le théorème précédent.

Supposons maintenant que $a \in \overline{A}$. Si $a \in A$, il n'y a rien à faire (prendre la suite constante $a$). Si $a \in \overline{A} \setminus A$, alors pour tout $\epsilon > 0, B(a, \epsilon) \cap A \neq \emptyset$. Dans le cas contraire on aurait $B(a, \epsilon) \cap A = \emptyset$ pour un certain $\epsilon > 0$, et par suite $F := \overline{A} \cap (E \setminus B(a, \epsilon))$ contiendrait $A$. Or $F$ est fermé par définition, donc on aurait $\overline{A} \subset \overline{A} \cap (E \setminus B(a, \epsilon))$, ce qui contredit $a \in \overline{A}$.

On en déduit que pour tout $n \in \mathbb{N}, B(a, 2^{-n}) \cap A \neq \emptyset$. En choisissant $a_n \in B(a, 2^{-n}) \cap A$ pour tout $n$, on construit ainsi une suite d'éléments de $A$ qui converge vers $a$. $\square$

## Espaces vectoriels normés de dimension finie

On commence par énoncer un résultat fondamental que nous admettons.

**Théorème II.6.** Soit $E$ un espace vectoriel de dimension finie. Alors toutes les normes sont équivalentes sur $E$.

**Remarque.** Si on ne suppose plus que $E$ est de dimension finie, le résultat ci-dessus devient faux. Pour s'en convaincre, on peut prendre $E = C([0, 1])$ et considérer les normes $||.||_1$ et $||.||_\infty$.

**Théorème II.7.** Soit $(E, ||.||)$ un espace vectoriel normé de dimension finie. Alors $E$ est complet.

**Démonstration.** Soit $(x^n)$ une suite de Cauchy dans $E$. Comme $E$ est de dimension finie, il existe une base $(e_1, \dots, e_N)$ de $E$. Tout élément $x$ de $E$ s'écrit de manière unique $x = \displaystyle\sum_{j=1}^{N} x_j e_j$ et on définit sur $E$ la norme

$$
||x||_\infty = \sup_{j=1,\dots,N} |x_j|
$$

D'après le théorème précédent, les normes $||.||$ et $||.||_\infty$ sont équivalentes. Par conséquent la suite $(x^n)$ est de Cauchy pour $||.||_\infty$. On en déduit que pour tout $j = 1, \dots, N$ la suite $(x_j^n)_n$ est de Cauchy dans $\mathbb{R}$. Comme $\mathbb{R}$ est complet, elle admet donc une limite $x_j$. On pose $x = \displaystyle\sum_{j=1}^{N} x_j e_j$. D'après ce qui précède, la suite $(x^n)$ converge vers $x$ pour $||.||_\infty$, et donc pour $||.||$. $\square$

En reprenant la preuve précédente, on obtient facilement le théorème suivant.

**Théorème II.8.** Soit $(E, ||.||)$ un espace vectoriel normé de dimension finie et soit $(e_1, \dots, e_N)$ une base de $E$. Pour tout $x \in E$, on note $x_i$ la $i$-ème coordonnée de $x$ dans cette base. Alors toute suite $(x^n)_n$ de $E$ converge vers $x \in E$ si et seulement si pour $i = 1, \dots, N$ la suite $(x_i^n)_n$ converge vers $x_i$ dans $\mathbb{R}$.

## Limites et continuité de fonctions définies sur un espace vectoriel normé

Dans cette section on considère des evn $(E, ||.||_E)$, $(F, ||.||_F)$ et $(G, ||.||_G)$. Afin d'alléger les notations, on note indifféremment $||.||$ l'une ou l'autre des normes précédentes.

**Définition.** Soit $f : A \to F$ une application définie sur une partie $A$ de $E$ et soit $a \in \overline{A}$. On dit que la fonction $f$ converge vers $y \in F$ lorsque $x$ tend vers $a$ si

$$
\forall \epsilon > 0, \exists \delta > 0, \forall x \in A, (||x - a|| < \delta \Rightarrow ||f(x) - y|| < \epsilon)
$$

On notera $\displaystyle\lim_{x \to a} f(x) = y$.

**Remarque.** Lorsqu'elle existe, la limite d'une fonction en un point est unique.

**Proposition.** Soient $f : A \to F$ et $g : A \to F$ deux applications et soit $a \in \overline{A}$. On suppose que $\displaystyle\lim_{x \to a} f(x) = y$ et $\displaystyle\lim_{x \to a} g(x) = z$. Alors pour tout $\lambda, \mu \in \mathbb{K}$ on a :

$$
\lim_{x \to a} (\lambda f + \mu g) = \lambda y + \mu z
$$

**Théorème II.9.** Soit $f : A \to F$, $a \in \overline{A}$ et $y \in F$. Les deux assertions suivantes sont équivalentes :

1. la fonction $f$ converge vers $y \in F$ lorsque $x$ tend vers $a$ ;
2. pour toute suite $(x_n)$ d'éléments de $A$ convergeant vers $a$, la suite $y_n := f(x_n)$ converge vers $y$.

**Démonstration.** 1 implique 2 est trivial. On s'intéresse à 2 implique 1. On démontre la contraposée. Non 1 : $\exists \epsilon > 0, \forall r > 0, \exists x \in A, ||x - a|| < r$ et $||f(x) - y|| \geq \epsilon$. Soit $\epsilon > 0$ donné par non 1. On prend $r = 2^{-n}$ dans non 1, il vient

$$
\forall n \in \mathbb{N}, \exists x_n \in A \text{ tel que } ||x_n - a|| < 2^{-n} \text{ et } ||f(x_n) - y|| \geq \epsilon
$$

On a $x_n \to a$ mais $f(x_n)$ ne converge pas vers $y$. $\square$

**Théorème II.10.** Soient $A \subset E$ et $B \subset F$ et soit $f : A \to F$ et $g : B \to G$ deux applications telles que $f(A) \subset B$. On suppose qu'il existe $a \in \overline{A}$, $b \in \overline{B}$ et $z \in G$ tels que

$$
\lim_{x \to a} f(x) = b \quad \text{et} \quad \lim_{y \to b} g(y) = z
$$

Alors

$$
\lim_{x \to a} g \circ f(x) = z
$$

**Définition.** Soit $A \subset E$ et $f : A \to F$ une application. Soit $a \in A$. On dit que $f$ est continue au point $a$ si elle admet une limite en $a$. Dans ce cas on a nécessairement $\displaystyle\lim_{x \to a} f(x) = f(a)$.

**Démonstration.** Supposons que $f$ est continue en $a$. D'après la définition, il existe $y \in F$ tel que

$$
\forall \epsilon > 0, \exists \delta > 0, \forall x \in A, (||x - a|| < \delta \Rightarrow ||f(x) - y|| < \epsilon)
$$

Comme $a \in A$, on peut prendre $x = a$ dans la définition précédente. On en déduit que pour tout $\epsilon > 0$, $||y - f(a)|| < \epsilon$. Ceci n'est possible que si $y = f(a)$. $\square$

**Définition.** Soit $f : A \to F$ une application. On dit que $f$ est continue sur $A$ si elle est continue en tout point $a$ de $A$. On note $\mathcal{C}(A, F)$ l'ensemble des fonctions continues de $A$ dans $F$.

**Proposition.** Soient $f : A \to F$ et $g : A \to F$ deux applications continues en un point $a \in A$. Pour tout $\lambda, \mu \in \mathbb{K}$, la fonction $\lambda f + \mu g$ est continue en $a$.

**Démonstration.** Soit $\epsilon > 0$, alors

$$
\exists \delta_1 > 0 \text{ tel que } ||x - a|| < \delta_1 \Rightarrow ||f(x) - f(a)|| < \frac{\epsilon}{2|\lambda|}
$$

$$
\exists \delta_2 > 0 \text{ tel que } ||x - a|| < \delta_2 \Rightarrow ||g(x) - g(a)|| < \frac{\epsilon}{2|\mu|}
$$

Soit $\delta = \min(\delta_1, \delta_2) > 0$. Soit $x$ tel que $||x - a|| < \delta$, alors

$$
||(\lambda f + \mu g)(x) - (\lambda f + \mu g)(a)|| \leq |\lambda|\,||f(x) - f(a)|| + |\mu|\,||g(x) - g(a)|| < \frac{|\lambda| \epsilon}{2|\lambda|} + |\mu| \frac{\epsilon}{2|\mu|} = \epsilon
$$

$\square$

**Corollaire.** Soient $f : A \to F$ et $g : A \to F$ deux applications continues sur $A$ et soient $\lambda, \mu \in \mathbb{K}$. Alors la fonction $\lambda f + \mu g$ est continue sur $A$. Autrement dit, $\mathcal{C}(A, F)$ est un espace vectoriel.

**Théorème II.11.** Soient $A \subset E$ et $B \subset F$ et soit $f : A \to F$ et $g : B \to G$ deux applications telles que $f(A) \subset B$. On suppose en outre que $f$ et $g$ sont continues. Alors $g \circ f$ est continue.

**Démonstration.** C'est une conséquence immédiate du théorème identique sur les limites. $\square$

**Théorème II.12.** Soit $f : E \to F$ une application. Les assertions suivantes sont équivalentes :

1. $f$ est continue ;
2. pour tout $K \subset F$ fermé, $f^{-1}(K)$ est fermé ;
3. pour tout $\Omega \subset F$ ouvert, $f^{-1}(\Omega)$ est ouvert.

**Démonstration.** Montrons que 1 implique 2. Soit $K$ un fermé de $F$ et soit $(x_n)$ une suite d'éléments de $f^{-1}(K)$ convergeant vers $x \in E$. Par définition $(f(x_n))$ est une suite d'éléments de $K$, et comme $f$ est continue, alors $f(x_n)$ converge vers $f(x)$. Comme $K$ est fermé, on en déduit que $f(x) \in K$, c'est-à-dire $x \in f^{-1}(K)$.

Montrons maintenant que 2 implique 3. C'est une simple conséquence de l'identité

$$
f^{-1}(F \setminus K) = E \setminus f^{-1}(K)
$$

et du fait qu'un ensemble est ouvert si et seulement si son complémentaire est fermé.

Montrons enfin que 3 implique 1. On doit montrer que

$$
\forall \epsilon > 0, \exists \delta > 0, \forall x \in E, (||x - a|| < \delta \Rightarrow ||f(x) - f(a)|| < \epsilon)
$$

Soit $\epsilon > 0$. L'ensemble $B(f(a), \epsilon)$ est un ouvert de $F$, donc d'après le 3, son image réciproque par $f$ est un ouvert de $E$. Or on a $a \in f^{-1}(B(f(a), \epsilon))$, donc il existe $\delta > 0$ tel que $B(a, \delta) \subset f^{-1}(B(f(a), \epsilon))$. En appliquant $f$, il vient

$$
f(B(a, \delta)) \subset B(f(a), \epsilon)
$$

qui peut exactement se réécrire sous la forme

$$
\forall x \in E, (||x - a|| < \delta \Rightarrow ||f(x) - f(a)|| < \epsilon)
$$

$\square$

**Proposition.** Si $f$ et $g$ sont deux applications continues, alors $g \circ f$ est continue.

**Démonstration.** Soit $\Omega$ ouvert, alors $(g \circ f)^{-1}(\Omega) = f^{-1} \circ g^{-1}(\Omega)$. Cela démontre la proposition puisque $g^{-1}(\Omega)$ est ouvert car $g$ est continue, et $f^{-1} \circ g^{-1}$ est aussi un ouvert car $f$ est continue. $\square$

**Exercice.** Montrons que l'ensemble $\left\{(x, y) \in \mathbb{R}^2 \text{ tel que } 0 \leq y \leq \dfrac{1}{1 + x^2}\right\}$ est fermé.

Soit $f : \begin{cases} \mathbb{R}^2 \to \mathbb{R} \\ (x, y) \mapsto y(1 + x^2) \end{cases}$. Alors

$$
\begin{aligned}
f^{-1}([0, 1]) &= \left\{(x, y) \in \mathbb{R}^2 \mid f(x, y) \in [0, 1]\right\} = \left\{(x, y) \in \mathbb{R}^2 \mid 0 \leq y(1 + x^2) \leq 1\right\} \\
&= \left\{(x, y) \in \mathbb{R}^2 \mid 0 \leq y \leq \frac{1}{1 + x^2}\right\} = K
\end{aligned}
$$

Or $f$ est continue et $[0, 1]$ est un fermé de $\mathbb{R}$. Donc $K = f^{-1}([0, 1])$ est fermé.

### Continuité des applications linéaires

**Théorème II.13.** Soient $E$ et $F$ deux espaces vectoriels normés et $u : E \to F$ une application linéaire. Les assertions suivantes sont équivalentes :

1. $u$ est continue
2. $u$ est continue en 0
3. $u$ est bornée sur $\overline{B}(0, 1)$
4. $u$ est lipschitzienne

**Démonstration.** 1 implique 2 est évident.

2 implique 3. Comme $u$ est linéaire, alors $u(0) = 0$, et comme $u$ est continue en 0, il vient

$$
\forall \epsilon > 0, \exists \delta > 0, \forall x \in E\ (||x|| < \delta \Rightarrow ||u(x)|| < \epsilon)
$$

On prend $\epsilon = 1$, il existe donc $\delta > 0$ tel que

$$
\forall ||x|| < \delta, ||u(x)|| \leq 1
$$

Soit $x \in \overline{B}(0, 1)$, alors $y := \dfrac{\delta x}{2}$ vérifie $||y|| \leq \dfrac{\delta}{2} < \delta$. Par suite

$$
1 \geq ||u(y)|| = \frac{\delta}{2} ||u(x)||
$$

On en déduit $||u(x)|| \leq \dfrac{2}{\delta}$.

Montrons que 3 implique 4. Par hypothèse, il existe $M > 0$ tel que

$$
\forall ||x|| \leq 1, ||u(x)|| \leq M
$$

Soient $x, y \in E$ tels que $x \neq y$. Alors $\zeta := \dfrac{x - y}{||x - y||}$ appartient à $\overline{B}(0, 1)$. Comme $u$ est linéaire, on en déduit

$$
M \geq ||u(\zeta)|| = \frac{1}{||x - y||} ||u(x - y)|| = \frac{1}{||x - y||} ||u(x) - u(y)||
$$

Autrement dit

$$
||u(x) - u(y)|| \leq M ||x - y||
$$

ce qui prouve 4.

4 implique 1 est évident. $\square$

**Remarque.** Soit $u : E \to F$ une application linéaire. Alors $u$ est continue si et seulement si

$$
\exists k \in \mathbb{R}_+, \forall x \in E, ||u(x)|| \leq k ||x||
$$

**Théorème II.14.** Soit $u \in \mathcal{L}_C(E, F)$ une application linéaire continue. Alors

$$
\underbrace{\sup_{x \in \overline{B}(0,1)} ||u(x)||}_{A} = \underbrace{\sup_{||x|| = 1} ||u(x)||}_{B} = \underbrace{\sup_{x \neq 0} \frac{||u(x)||}{||x||}}_{C}
$$

On note $||u||_{E \to F}$ cette quantité.

**Démonstration.** Comme $\{||x|| = 1\} \subset \overline{B}(0, 1)$, alors $A \geq B$.

Montrons que $B \geq C$. Soit $x \neq 0$, alors $\dfrac{||u(x)||}{||x||} = \Big|\Big|u\Big(\dfrac{x}{||x||}\Big)\Big|\Big| = ||u(y)||$ avec $y = \frac{x}{||x||}$, car $u$ est linéaire. Donc $||u(y)|| \leq B$ car $||y|| = 1$.
On a donc $\forall x \neq 0$, $\frac{||u(x)||}{||x||} \leq B$. En prenant le sup sur $x$, il vient $C \leq B$.

Montrons que $C \geq A$. Soit $x \in \overline{B}(0, 1)$, alors

- si $x = 0$, on a clairement $||u(x)|| \leq C$ ;
- si $x \neq 0$, alors $||u(x)|| \leq \dfrac{||u(x)||}{||x||} \leq C$.

En prenant le sup sur $x \in \overline{B}(0, 1)$, on obtient $A \leq C$. $\square$

**Théorème II.15.** L'application $u \mapsto ||u||_{E \to F}$ est une norme sur $\mathcal{L}_C(E, F)$.

**Démonstration.** Pour tout $u \in \mathcal{L}_C(E, F)$ on a bien $||u||_{E \to F} = \displaystyle\sup_{||x|| = 1} ||u(x)|| \geq 0$.
De plus, soit $\lambda \in \mathbb{K}$, alors $||\lambda u||_{E \to F} = \displaystyle\sup_{||x|| = 1} ||(\lambda u)(x)|| = \sup_{||x|| = 1} |\lambda|\,||u(x)|| = |\lambda|\,||u||_{E \to F}$.
Supposons $||u||_{E \to F} = 0$, alors $\displaystyle\sup_{x \neq 0} \frac{||u(x)||}{||x||} = 0$, donc $\dfrac{||u(x)||}{||x||} = 0\ \forall x \neq 0$.
Donc $||u(x)|| = 0\ \forall x \neq 0$, donc $u \equiv 0$.
Soient $u$ et $v \in \mathcal{L}_C(E, F)$, alors pour tout $x$ tel que $||x|| = 1$, on a

$$
||(u + v)(x)|| = ||u(x) + v(x)|| \leq ||u(x)|| + ||v(x)|| \leq ||u||_{E \to F} + ||v||_{E \to F}
$$

On prend le sup sur $||x|| = 1$, il vient

$$
||u + v||_{E \to F} \leq ||u||_{E \to F} + ||v||_{E \to F}
$$

$\square$

**Exercice.** Soit $u : \begin{cases} \mathbb{R}^2 \to \mathbb{R} \\ (x, y) \mapsto ax + by \end{cases}$. Montrer que $u \in \mathcal{L}_C(\mathbb{R}^2, \mathbb{R})$ et calculer $||u||_{E \to F}$.

**Remarque.** Pour montrer que $\displaystyle\sup_{x \in A} \alpha(x) \geq k$, il suffit de montrer qu'il existe une suite $x_n$ d'éléments de $A$ telle que $\alpha(x_n) \to k$ quand $n$ tend vers l'infini. En particulier, s'il existe $x \in A$ tel que $\alpha(x) = k$, alors c'est fini.

**Théorème II.16.** Soit $u \in \mathcal{L}_C(E, F)$. Alors

$$
\forall x \in E, ||u(x)||_F \leq ||u||_{E \to F} ||x||_E
$$

**Démonstration.** Immédiat. $\square$

**Théorème II.17.** Soient $E$, $F$ et $G$ trois espaces vectoriels normés et soient $u \in \mathcal{L}_C(E, F)$ et $v \in \mathcal{L}_C(F, G)$. Alors $v \circ u \in \mathcal{L}_C(E, G)$ et

$$
||v \circ u||_{E \to G} \leq ||v||_{F \to G} ||u||_{E \to F}
$$

**Démonstration.** Soit $x \in E$, alors $||v \circ u(x)||_G = ||v(u(x))||_G \leq ||v||_{F \to G} ||u(x)||_F$ par le théorème précédent appliqué à $v$. De manière analogue, $||v \circ u(x)||_G \leq ||v||_{F \to G} ||u||_{E \to F} ||x||_E$. En divisant par $||x||_E$ et en prenant le sup, on retrouve le résultat. $\square$
