---
title: "Divisibilité dans Z"
description: "Construction de Z, opérations et relation d'ordre, division euclidienne, nombres premiers et décomposition en facteurs premiers, PGCD et algorithme d'Euclide, théorèmes de Bézout et de Gauss, résolution d'une équation diophantienne."
sidebar_position: 7
---

## Une construction de $\mathbb{Z}$, ensemble des entiers relatifs

Si $n \in \mathbb{N}^*$, l'équation $n + x = 0$ n'a pas de solution dans $\mathbb{N}$. On est donc conduit à construire un ensemble de nombres plus vaste que $\mathbb{N}$ pour y trouver une solution.

Par ailleurs, l'échange commercial primitif "je reçois $n$ et je donne $m$" peut se modéliser sous la forme du couple $(n, m)$, élément de $\mathbb{N}^2$, au format (quantité reçue, quantité donnée). L'échange $(n, m)$ a le même bilan (profit ou perte) que l'échange $(n', m')$ lorsque, pour un même individu, la succession des échanges $(n, m)$ puis $(m', n')$ a un bilan nul, c'est-à-dire lorsque la quantité $n + m'$ reçue est égale à la quantité $m + n'$ donnée.

Dans $\mathbb{N}^2$, on considère la relation $\mathcal{R}$ définie par :

$$
\forall ((n, m), (n', m')) \in (\mathbb{N}^2)^2, (n, m)\mathcal{R}(n', m') \Leftrightarrow n + m' = m + n'
$$

On montre que $\mathcal{R}$ est une relation d'équivalence (R-S-T) dans $\mathbb{N}^2$.

Pour tout couple $(n, m)$ de $\mathbb{N}^2$, sa classe d'équivalence est $\overline{n, m} = \{(n', m') \in \mathbb{N}^2 / (n', m')\mathcal{R}(n, m)\}$.

L'ensemble de ces classes d'équivalence, dit ensemble quotient $\mathbb{N}^2/\mathcal{R}$, est noté $\mathbb{Z}$.

$\forall n \in \mathbb{N}$, nous noterons $\overline{n, 0}$ par $+n$ et $\overline{0, n}$ par $-n$ ; $\overline{0, 0}$ est noté 0.

## Les opérations

**Addition.** $\forall (p, q) \in \mathbb{Z}^2$, notant $p = \overline{(n, m)}$ et $q = \overline{(n', m')}$, pour tous représentants respectifs $(n_1, m_1)$ et $(n'_1, m'_1)$ de ces classes, on montre que les couples $(n_1 + n'_1, m_1 + m'_1)$ sont éléments de la même classe $\overline{(n + n', m + m')}$. On pose alors par définition $p + q = \overline{(n, m)} + \overline{(n', m')} = \overline{n + n', m + m'}$.

**Multiplication.** $\forall (p, q) \in \mathbb{Z}^2$, notant $p = \overline{n, m}$ et $q = \overline{n', m'}$, pour tous représentants respectifs $(n_1, m_1)$ et $(n'_1, m'_1)$ de ces classes, on montre que les couples $(n_1.n'_1 + m_1.m'_1, n_1m'_1 + m_1n'_1)$ sont éléments de la même classe $\overline{(n.n' + m.m', n.m' + m.n')}$. On pose alors par définition

$$
p \times q = \overline{(n, m)} \times \overline{(n', m')} = \overline{(n.n' + m.m', n.m' + m.n')}
$$

**Les propriétés de ces opérations.**

- $+$ est une loi de composition interne dans $\mathbb{Z}$.
- $+$ est commutative.
- $+$ est associative.
- $\mathbb{Z}$ possède $\overline{(0, 0)}$, noté 0, comme élément neutre pour $+$.
- Tout élément de $\mathbb{Z}$ admet un symétrique pour $+$ (opposé).
- $\times$ est une loi de composition interne dans $\mathbb{Z}$.
- $\times$ est commutative.
- $\times$ est associative.
- $\mathbb{Z}$ possède $\overline{(1, 0)}$, noté 1, comme élément neutre pour $\times$.
- Les seuls éléments de $\mathbb{Z}$ qui admettent un symétrique dans $\mathbb{Z}$ pour $\times$ ("inverse") sont $\overline{(1, 0)} = +1$ et $\overline{(0, 1)} = -1$, chacun étant son propre inverse.
- $\times$ est distributive par rapport à $+$.

$(\mathbb{Z}, +, \times)$ est un anneau unitaire commutatif dont les seuls éléments inversibles sont $-1$ et $1$.

**La règle des signes.** $\forall (n, m) \in \mathbb{N}^2$ :

$$
\begin{aligned}
(+n) \times (+m) &= \overline{(n, 0)} \times \overline{(m, 0)} = \overline{(n \times m + 0 \times 0, n \times 0 + 0 \times m)} = \overline{(n.m, 0)} = +n.m \\
(+n) \times (-m) &= \overline{(n, 0)} \times \overline{(0, m)} = \overline{(n \times 0 + 0 \times m, n \times m + 0 \times 0)} = \overline{(0, n.m)} = -n.m \\
(-n) \times (+m) &= \overline{(0, n)} \times \overline{(m, 0)} = \overline{(0 \times m + n \times 0, 0 \times 0 + n \times m)} = \overline{(0, n.m)} = -n.m \\
(-n) \times (-m) &= \overline{(0, n)} \times \overline{(0, m)} = \overline{(0 \times 0 + n \times m, 0 \times m + n \times 0)} = \overline{(n.m, 0)} = +n.m
\end{aligned}
$$

**La soustraction.** $\forall (p, q) \in \mathbb{Z}^2, p - q = p + (-q)$ (on ajoute l'opposé de $q$).

**$\mathbb{N} \subset \mathbb{Z}$.** Par abus d'écriture, on confond tout entier naturel $n$ avec l'entier relatif $+n = \overline{(n, 0)}$. Ceci parce que l'application $\phi : n \to \overline{(n, 0)}$ est une bijection de $\mathbb{N}$ sur la partie $\mathbb{Z}_+$ de $\mathbb{Z}$ constituée des seules classes de la forme $\overline{(k, 0)}$ où $k \in \mathbb{N}$, et que cette bijection vérifie la propriété :

$$
\forall (n, m) \in \mathbb{N}^2, \phi(n + m) = \overline{(n + m, 0)} = \overline{(n, 0)} + \overline{(m, 0)} = \phi(n) + \phi(m)
$$

## La relation d'ordre $\leq$

$$
\forall (p, q) \in \mathbb{Z}^2, p \leq q \Leftrightarrow q - p \in \mathbb{N} \text{ et } q \geq p \Leftrightarrow p \leq q
$$

**Entiers positifs, entiers négatifs.** De cette définition, il ressort que $\forall q \in \mathbb{Z}, q \in \mathbb{N} \Leftrightarrow q - 0 \in \mathbb{N} \Leftrightarrow 0 \leq q$. Les éléments de $\mathbb{N}$ (les entiers positifs) sont caractérisés par $q \geq 0$ ; $q \leq 0$ caractérise leurs opposés, les entiers négatifs de "$-\mathbb{N}$".

**Propriétés.**

- La relation "$\leq$" ainsi définie est une relation d'ordre total dans $\mathbb{Z}$ qui prolonge celle de $\mathbb{N}$.
- Elle est compatible avec l'addition : $\forall (a, b, c) \in \mathbb{Z}^3, a \leq b \Rightarrow a + c \leq b + c$, et compatible avec la multiplication par un entier positif : $\forall (a, b) \in \mathbb{Z}^2, \forall c \in \mathbb{N}, a \leq b \Rightarrow a \times c \leq b \times c$.
- $\forall (a, b) \in \mathbb{Z}^2, \forall c \in -\mathbb{N}, a \leq b \Rightarrow a \times c \geq b \times c$.
- Toute partie $A$ non vide et majorée de $\mathbb{Z}$ admet un plus grand élément.
- Toute partie $A$ non vide et minorée de $\mathbb{Z}$ admet un plus petit élément.

**Valeur absolue.** $\forall p \in \mathbb{Z}, |p| = \max\{-p, p\}$, plus grand élément de cet ensemble (max de maximum).

**Propriétés de la valeur absolue.**

- $\forall p \in \mathbb{Z}, |p| = 0 \Leftrightarrow p = 0$
- $\forall (p, q) \in \mathbb{Z}^2, |p \times q| = |p| \times |q|$
- $\forall (p, q) \in \mathbb{Z}^2, |p + q| \leq |p| + |q|$

## La divisibilité dans $\mathbb{Z}$

**Division euclidienne dans $\mathbb{Z}$.** $\forall (a, b) \in \mathbb{Z} \times \mathbb{Z}^*, \exists! (q, r) \in \mathbb{Z}^2, a = b \times q + r$ et $0 \leq r < |b|$. $q$ est appelé le quotient et $r$ le reste dans la division euclidienne de $a$ par $b$.

*Démonstration.*

- **Existence.** L'ensemble $B = \{bk / k \in \mathbb{Z} \text{ et } bk \leq a\}$ est non vide (il contient $ba$ ou $-ba$) et majoré par $a$. Étant une partie de $\mathbb{Z}$, il admet donc un plus grand élément $bq$. On a alors $bq \leq a < bq + |b|$ (sinon $bq + |b|$, multiple de $b$, serait un élément de $B$ plus grand que $bq$), donc $0 \leq a - bq < |b|$. Notant $r = a - bq$, on a $0 \leq r < |b|$ et $a = bq + (a - bq) = bq + r$.
- **Unicité.** Si $a = bq + r = bq' + r'$ avec $0 \leq r < |b|$ et $0 \leq r' < |b|$, alors $0 = bq + r - bq' - r'$, donc $b(q - q') = r' - r$, terme de $]-|b|, |b|[$. Donc $|b|.|q - q'| < |b|$, donc $|q - q'| < 1$, donc (dans $\mathbb{Z}$) $q - q' = 0$ : ainsi $q = q'$ et $r = r'$. $\square$

**$a$ est multiple (entier) de $b$ et $b$ est diviseur (entier) de $a$** lorsque la division euclidienne de $a$ par $b$, $a = bq + r$, admet un reste nul. On note $b|a$ pour "$b$ divise $a$".

**Remarques.** Si $b|a$ et $a \neq 0$, alors $|b| \leq |a|$ (puisque $|a| = |b|.|q| \geq |b|$ vu $|q| \geq 1$).

**Entier premier.** Il est clair que tout entier $n$ possède au moins les diviseurs $n$, $-n$, $1$ et $-1$, car $n = 1 \times n = (-1) \times (-n)$. Si $n = 0$, ils sont trois : 0, 1 et $-1$. Si $n = 1$, ils sont deux : 1 et $-1$. Tout entier $n$ qui n'a comme diviseurs que les nombres $n$, $-n$, $1$ et $-1$ lorsqu'ils sont quatre, et aucun autre, est dit premier ; sinon il est dit non premier.

**Décomposition en produit de facteurs premiers.**

- Tout entier de $\mathbb{N}^* \setminus \{1\}$ possède au moins un diviseur premier.
- Tout entier de $\mathbb{N}^* \setminus \{1\}$ se décompose de façon unique en produit de facteurs premiers.
- Tout entier relatif se décompose de façon unique sous une forme $(\pm 1)p_1^{n_1}.p_2^{n_2}\dots p_k^{n_k}$ où les entiers $p_i$ sont positifs et premiers.

*Démonstration.*

- $\forall n \in \mathbb{N}^* \setminus \{1\}$, $P = \{p \in \mathbb{Z} / p \geq 2 \text{ et } p|n\} \neq \emptyset$ (car $n \in P$) et est minoré par 1. Il a donc un plus petit élément $p_0$. Si $p_0$ admet un diviseur en dehors de $\{-1, 1, -p_0, p_0\}$, $\exists (p_1, q_1) \in (\mathbb{N}^* \setminus \{1\})^2, p_0 = p_1q_1$. Ainsi $p_1q_1|n$, donc $p_1|n$, mais comme $1 < p_1 < p_0$, $p_0$ n'est pas le plus petit élément de $P$. Conclusion : les seuls diviseurs de $p_0$ sont les éléments de $\{-1, 1, -p_0, p_0\}$, donc $p_0$ est premier.
- **Existence** (par récurrence "forte", c'est-à-dire avec hypothèse de récurrence maximale).
  - **Initialisation.** Pour $n = 2$, la seule décomposition possible est $2 = 2$.
  - **Hérédité.** Supposons que pour un entier $n$ de $\mathbb{N}^* \setminus \{1\}$ la propriété de décomposition soit vraie, ainsi que pour tous les entiers de $\mathbb{N}^* \setminus \{1\}$ strictement inférieurs à $n$. Considérons $n + 1$. Vu la démonstration précédente, il possède au moins un diviseur premier $p$ et $n + 1 = p.q$ où $q \in \mathbb{N}$ :
    - si $q = 1$, $n + 1 = p$ : décomposition en un seul facteur premier ;
    - si $q \geq 2$, $p$ étant premier, $p > 1$ et par suite $q \leq n$ car $q = 1.q < p.q = n + 1$. L'hypothèse de récurrence fait écrire $q = p_1^{n_1}.p_2^{n_2}\dots p_s^{n_s}$, et $n + 1 = p.q = p.p_1^{n_1}.p_2^{n_2}\dots p_s^{n_s}$ est un produit de facteurs premiers.

  **Unicité.** Supposons qu'un entier naturel $n$ ait deux décompositions en produit de facteurs premiers. Quitte à mettre en place des exposants nuls, écrivons les deux décompositions selon l'ensemble des facteurs premiers rencontrés : $n = p_1^{n_1}.p_2^{n_2}\dots p_s^{n_s} = p_1^{m_1}.p_2^{m_2}\dots p_s^{m_s}$, et isolons un quelconque facteur premier $p_i$. On peut écrire $n = p_i^{n_i}.a = p_i^{m_i}.b$ où $p_i$ ne divise ni $a$ ni $b$. Si $n_i \neq m_i$ (on peut supposer par exemple $n_i > m_i$), $n = p_i^{n_i}.a = p_i^{n_i - m_i}.p_i^{m_i}.a = p_i^{m_i}.b$. Donc $p_i^{n_i - m_i}.a = b$, donc $p_i|b$, ce qui est faux. Il y a contradiction, donc $n_i = m_i$.
- Évident puisque $n = \pm 1.|n|$ et que l'on peut appliquer à $|n|$ ce qui précède. $\square$

**Méthode pratique pour déterminer si un entier relatif $n$ est premier.** Si aucun entier naturel premier $p$ tel que $p^2 \leq |n|$ ne divise $n$, alors $n$ est premier.

**Exemple.** 173 est premier car il n'est divisible par aucun des entiers premiers 2, 3, 5, 7, 11, 13 ; l'entier premier suivant, qui est 17, a son carré supérieur à 173.

*Démonstration.* Si $n$ n'est pas premier, il admet au moins un diviseur $p$ n'appartenant pas à $\{-n, -1, 1, n\}$. On peut donc écrire $n = pq$ où également $q \in \mathbb{Z} \setminus \{-n, -1, 1, n\}$.

$\min(\{|p|, |q|\})$, qui est $|p|$ ou $|q|$, est élément de $\mathbb{N}^* \setminus \{1\}$ : il a au moins un diviseur premier $p_0$ dans $\mathbb{N}$.

$p_0 \leq \min(\{|p|, |q|\})$, donc $p_0^2 \leq [\min(\{|p|, |q|\})]^2 \leq |p|.|q| = |n|$.

$p_0$ divise $\min(\{|p|, |q|\})$, donc divise $|p|.|q| = |n|$, donc divise $n$. On vient d'établir la contraposée du résultat demandé. $\square$

**L'ensemble des entiers naturels premiers n'est pas majoré.**

*Démonstration.* S'il était majoré, il admettrait un plus grand élément $p_s$ et s'écrirait $\{p_1, p_2, \dots, p_s\}$ où $p_1 \leq p_2 \leq \dots \leq p_s$ (avec $p_1 = 2, p_2 = 3$…). L'entier $p = p_1 \times p_2 \times \dots \times p_s + 1$, égal à leur produit majoré de 1 :

- est strictement supérieur à $p_s$ car, comme les $p_i$ sont supérieurs à 1, $p_1 \times p_2 \times \dots \times p_s + 1 \geq p_s + 1 > p_s$ ;
- n'est divisible par aucun entier premier $p_1, p_2, \dots, p_s$. En effet, s'il l'était, $1 = p - p_1 \times p_2 \times \dots \times p_s$ serait divisible par cet entier premier, donc supérieur à lui. Or c'est impossible.

Donc $p$ est un entier premier. Mais il est supérieur au plus grand entier premier : il y a contradiction. $\square$

**Ensemble $\mathcal{D}(a)$ des diviseurs d'un entier $a$.** $\mathcal{D}(a) = \{b \in \mathbb{Z} / \exists q \in \mathbb{Z}, a = b.q\}$.

**Remarques.** $\mathcal{D}(0) = \mathbb{Z}$ puisque $\forall p \in \mathbb{Z}, 0 = p.0$. Bien sûr, $a \in \mathcal{D}(a)$ puisque $a = a.1$, et si $b \in \mathcal{D}(a)$, $b|a$, donc $|b| \leq |a|$.

$\forall (a, b) \in \mathbb{Z}^2, [\mathcal{D}(a) = \mathcal{D}(b)] \Leftrightarrow [|a| = |b|]$ et $\forall (a, b) \in \mathbb{N}^2, [\mathcal{D}(a) = \mathcal{D}(b)] \Leftrightarrow [a = b]$.

**Plus grand commun diviseur de deux entiers non nuls $a$ et $b$** (noté $pgcd(a, b)$ ou parfois $a \wedge b$). L'ensemble $\mathcal{D}(a) \cap \mathcal{D}(b)$ des diviseurs communs de $a$ et de $b$ est l'ensemble des diviseurs d'un unique entier positif $d$, lui-même diviseur commun de $a$ et $b$ et le plus grand d'entre eux. Ainsi $\mathcal{D}(a) \cap \mathcal{D}(b) = \mathcal{D}(d)$ où $d$ est le plus grand commun diviseur de $a$ et $b$.

*Démonstration.* Clairement, l'ensemble $\mathcal{D}(a)$ des diviseurs de $a$ est le même que $\mathcal{D}(-a)$, ensemble des diviseurs de $-a$, seuls les quotients changeant de signe. On peut donc se ramener au cas où $a$ et $b$ sont positifs. De plus, on pourra supposer $a \geq b$, le cas $a < b$ pouvant se traiter de la même manière en échangeant les rôles de $a$ et $b$.

- **Si $b = 0$.** L'ensemble $\mathcal{D}(b)$ des diviseurs de $b$ est $\mathbb{Z}$, donc $\mathcal{D}(a) \cap \mathcal{D}(b) = \mathcal{D}(a) \cap \mathbb{Z} = \mathcal{D}(a)$. Dans ce cas, $d = a$.
- **Si $b > 0$.** La division euclidienne de $a$ par $b$ s'écrit $a = bq_1 + r_1$ où $0 \leq r_1 < b$. Tout diviseur commun de $b$ et $r_1$ divise $a$ et $b$, et comme $r_1 = a - bq_1$, tout diviseur commun de $a$ et $b$ divise $b$ et $r_1$. On a donc $\mathcal{D}(a) \cap \mathcal{D}(b) = \mathcal{D}(b) \cap \mathcal{D}(r_1)$.
  - **Si $r_1 = 0$.** $\mathcal{D}(r_1) = \mathbb{Z}$, donc $\mathcal{D}(a) \cap \mathcal{D}(b) = \mathcal{D}(b)$ et $d = b$.
  - **Si $r_1 \neq 0$.** La division euclidienne de $b$ par $r_1$ s'écrit $b = r_1q_2 + r_2$ où $0 \leq r_2 < r_1$. Le même raisonnement que ci-dessus conduit à $\mathcal{D}(b) \cap \mathcal{D}(r_1) = \mathcal{D}(r_1) \cap \mathcal{D}(r_2)$.
  - **Si $r_2 = 0$.** $\mathcal{D}(r_2) = \mathbb{Z}$, donc $\mathcal{D}(a) \cap \mathcal{D}(b) = \mathcal{D}(b) \cap \mathcal{D}(r_1) = \mathcal{D}(r_1)$ et $d = r_1$.
  - **Si $r_2 \neq 0$.** La division euclidienne de $r_1$ par $r_2$ s'écrit $r_1 = r_2.q_3 + r_3$ où $0 \leq r_3 < r_2$. Le même raisonnement que ci-dessus conduit à $\mathcal{D}(r_1) \cap \mathcal{D}(r_2) = \mathcal{D}(r_2) \cap \mathcal{D}(r_3)$.

    La suite des restes $r_k$ est une suite strictement décroissante d'entiers positifs. Au bout d'un nombre fini $n$ de divisions euclidiennes, la valeur 0 sera atteinte et on aura $r_n = 0$. Les deux dernières divisions euclidiennes auront donc la forme

    $$
    r_{n-3} = r_{n-2}q_{n-1} + r_{n-1} \text{ où } 0 \leq r_{n-1} < r_{n-2} \text{ et } r_{n-1} \neq 0, \text{ et } r_{n-2} = r_{n-1}q_n + 0
    $$

    Elles assurent respectivement le fait que $\mathcal{D}(a) \cap \mathcal{D}(b) = \mathcal{D}(b) \cap \mathcal{D}(r_1) = \dots = \mathcal{D}(r_{n-2}) \cap \mathcal{D}(r_{n-1})$ et $\mathcal{D}(r_{n-2}) \cap \mathcal{D}(r_{n-1}) = \mathcal{D}(r_{n-1})$. Ainsi $d = r_{n-1}$, dernier reste non nul. $\square$

**Méthode de calcul du $pgcd(a, b)$.** On effectue la succession de divisions euclidiennes ; par exemple, on calcule le $pgcd(456, 252)$ :

$$
\begin{aligned}
456 &= 252 \times 1 + 204 \\
252 &= 204 \times 1 + 48 \\
204 &= 48 \times 4 + 12 \\
48 &= 12 \times 4 + 0
\end{aligned}
$$

Le dernier reste non nul est 12, donc $pgcd(456, 252) = 12$. Cette méthode a été justifiée pendant la preuve de l'existence du $pgcd$.

On peut aussi trouver le $pgcd$ par l'utilisation des facteurs premiers :

| 456 | 2 | | 252 | 2 |
| --- | --- | --- | --- | --- |
| 228 | 2 | | 126 | 2 |
| 114 | 2 | | 63 | 3 |
| 57 | 3 | | 21 | 3 |
| 19 | 19 | | 7 | 7 |
| 1 | | | 1 | |

**Associativité de l'opération $pgcd$.** $\forall (a, b, c) \in \mathbb{Z}^3, pgcd[pgcd(a, b), c] = pgcd[a, pgcd(b, c)]$. L'entier ainsi obtenu est appelé $pgcd(a, b, c)$.

**Remarque.** Lorsque $d = pgcd(a, b)$, on peut écrire $a = d \times a'$ et $b = d \times b'$. On a alors $pgcd(a', b') = 1$.

*Démonstration.* Si $a'$ et $b'$ ont un diviseur commun positif $d'$ strictement supérieur à 1, on peut écrire $a' = d' \times a''$ et $b' = d' \times b''$, de sorte que $a = d \times d' \times a''$ et $b = d \times d' \times b''$, et $d \times d'$ est un diviseur commun de $a$ et $b$ strictement supérieur à leur $pgcd$. C'est impossible, donc un tel $d'$ n'existe pas. $\square$

**Entiers $a$ et $b$ "premiers entre eux" ou "étrangers".** Entiers $a$ et $b$ tels que $pgcd(a, b) = 1$.

**$a\mathbb{Z} + b\mathbb{Z} = d\mathbb{Z}$.** $\forall (a, b) \in \mathbb{Z}^2$, notant $d = pgcd(a, b)$ et $a\mathbb{Z} + b\mathbb{Z} = \{au + bv / (u, v) \in \mathbb{Z}^2\}$, on a l'égalité $a\mathbb{Z} + b\mathbb{Z} = d.\mathbb{Z}$ où $d.\mathbb{Z} = \{d.k / k \in \mathbb{Z}\}$.

*Démonstration.*

- $\subset$. Soit $a.u + b.v$ un élément de $a.\mathbb{Z} + b.\mathbb{Z}$. On a $d$ le $pgcd(a, b)$ : il divise $a$ et $b$. Donc $\exists (a', b') \in \mathbb{Z}^2, a = d.a'$ et $b = d.b'$. Ainsi $au + bv = d.a'.u + d.b'.v = d(a'.u + b'.v)$, donc $a.u + b.v \in d.\mathbb{Z}$.
- $\supset$. Dans la suite des divisions permettant de calculer le $pgcd(a, b)$, $d$ est le dernier reste non nul $r_{n-1}$. $r_{n-3} = r_{n-2}q_{n-1} + r_{n-1}$, donc $d = r_{n-1} = r_{n-3} - r_{n-2}.q_{n-1} \in r_{n-3}\mathbb{Z} + r_{n-2}\mathbb{Z}$. Mais $r_{n-4} = r_{n-3}q_{n-2} + r_{n-2}$, donc $r_{n-2} = r_{n-4} - r_{n-3}q_{n-2} \in r_{n-4}\mathbb{Z} + r_{n-3}\mathbb{Z}$, donc $d \in r_{n-4}\mathbb{Z} + r_{n-3}\mathbb{Z}$. En remontant ainsi la succession de divisions euclidiennes, on achève par $d \in a\mathbb{Z} + b\mathbb{Z}$. Donc $d\mathbb{Z} = a\mathbb{Z} + b\mathbb{Z}$. $\square$

**Conséquence.** $\forall (a, b) \in \mathbb{Z}^2$, notant $d = pgcd(a, b)$, $\exists (u, v) \in \mathbb{Z}^2, d = a.u + b.v$. Attention ! Il n'y a pas unicité du couple $(u, v)$.

*Démonstration.* $d = d.1 \in d\mathbb{Z} (= a.\mathbb{Z} + b.\mathbb{Z})$, d'où l'existence du couple d'entiers $(u, v)$ tel que $d = a.u + b.v$. Dans le cas particulier de $(a, b) = (456, 252)$, on sait que $d = pgcd(a, b) = 12$. On peut observer que $12 = 456u + 252v$ pour $(u, v) = (5, -9)$, mais aussi $(-16, 29)$, $(26, -47)$… $\square$

**Remarque.** L'existence d'une telle relation $d = a.u + b.v$ n'entraîne pas que $d = pgcd(a, b)$, sauf dans le cas où $d = 1$, comme on va le voir ci-dessous.

**Théorème IV.1 (de Bézout).**

$$
\forall (a, b) \in \mathbb{Z}^2, [pgcd(a, b) = 1] \Leftrightarrow [\exists (u, v) \in \mathbb{Z}^2, a.u + b.v = 1]
$$

*Démonstration.*

- $\Rightarrow$. Implication déjà établie dans le cas général d'un $pgcd(a, b) = d$ quelconque.
- $\Leftarrow$. Si $\exists (u, v) \in \mathbb{Z}^2, a.u + b.v = 1$, tout diviseur commun à $a$ et $b$ divise 1. Donc le plus grand d'entre eux, $pgcd(a, b)$, divise 1. Or les seuls diviseurs de 1 sont $+1$ et $-1$. Étant par définition positif, $pgcd(a, b) = +1$. $\square$

**Une première conséquence.** $\forall (a, b) \in \mathbb{Z}^2$, notant $d = pgcd(a, b)$, on sait que $\exists (u, v) \in \mathbb{Z}^2, d = a.u + b.v$. On peut ajouter que, dans une telle décomposition, $pgcd(u, v) = 1$.

*Démonstration.* $d$ divisant $a$ et $b$, il existe deux entiers $a'$ et $b'$ tels que $a = d.a'$ et $b = d.b'$. $d = a.u + b.v$ s'écrit $d = d.a'.u + d.b'.v$, donc $1 = a'.u + b'.v = u.a' + v.b'$, ce qui, d'après le théorème de Bézout, entraîne que $pgcd(a', b') = 1 = pgcd(u, v)$. $\square$

**Théorème IV.2 (de Gauss).** $\forall (a, b, c) \in \mathbb{Z}^3$, si $a|b.c$ et $pgcd(a, b) = 1$, alors $a|c$.

*Démonstration.* Puisque $pgcd(a, b) = 1$, $\exists (u, v) \in \mathbb{Z}^2, a.u + b.v = 1$, donc $a.c.u + b.c.v = c$. $a|a.c.u$ de façon évidente ; de $a|b.c$ par hypothèse, donc $a|b.c.v$. Ainsi $a|c$ puisque $c = a.c.u + b.c.v$. $\square$

## Un exemple d'équation diophantienne

Résoudre dans $\mathbb{Z}^2$ l'équation d'inconnue $(u, v)$ :

$$
456.u + 252.v = 12
$$

Ayant déjà calculé $pgcd(456, 252) = 12$, nous savons que cette équation admet au moins une solution, puisqu'il existe au moins un couple $(u, v)$ de $\mathbb{Z}^2$ tel que $12 (= d) = 456.u + 252.v$.

Nous allons chercher un couple solution particulier. Si on n'a pas l'idée de $(5, -9)$, la remontée des divisions euclidiennes nous permet d'aboutir à coup sûr :

$$
\begin{aligned}
456 = 252 \times 1 + 204 &\text{ donc } 204 = 456 - 252 \times 1 \\
252 = 204 \times 1 + 48 &\text{ donc } 48 = 252 - 204 \times 1 = 252 - (456 - 252 \times 1) \times 1 = -456 + 252 \times 2 \\
204 = 48 \times 4 + 12 &\text{ donc } 12 = 204 - 48 \times 4 = (456 - 252 \times 1) - (-456 + 252 \times 2) \times 4
\end{aligned}
$$

Ainsi $12 = 456 \times 5 - 252 \times 9 = 456 \times 5 + 252 \times (-9)$.

**Résolution de l'équation.** $\forall (u, v) \in \mathbb{Z}^2$ :

$$
\begin{aligned}
12 = 456.u + 252.v &\Leftrightarrow \begin{cases} 12 = 456.u + 252.v \\ 12 = 456.5 + 252.(-9) \end{cases} \\
&\Leftrightarrow 0 = 456(u - 5) + 252(v + 9) \Leftrightarrow 0 = 38(u - 5) + 21(v + 9) \Leftrightarrow 21(v + 9) = 38(5 - u)
\end{aligned}
$$

$21|38(5 - u)$ et $pgcd(21, 38) = 1$, donc par le théorème de Gauss $21|5 - u$, donc $\exists k \in \mathbb{Z}, 5 - u = 21.k$ et $u = -21k + 5$.

Remplaçant dans l'équation $21(v + 9) = 38(5 - u)$ $(5 - u)$ par $21.k$, il vient $21(v + 9) = 38.21.k$, donc $v + 9 = 38.k$ et $v = 38.k - 9$.

Il est aisé réciproquement de vérifier que $\forall k \in \mathbb{Z}, 456(-21k + 5) + 252(38k - 9) = 12$.

L'ensemble des solutions est $S = \{(-21.k + 5, 38k - 9) / k \in \mathbb{Z}\}$.

**Remarques.** Pour prolonger cette étude, notons que :

- l'équation $456.u + 252.v = 1$ ne peut avoir de solution dans $\mathbb{Z}^2$, car si cela était, d'après le théorème de Bézout, 456 et 252 seraient premiers entre eux, ce qui est faux ;
- l'équation $456.u + 252.v = 24$ n'a pas comme ensemble-solution dans $\mathbb{Z}^2$, comme on pourrait le penser par une réflexion trop rapide, $S' = \{(2 \times (-21.k + 5), 2 \times (38k - 9)) / k \in \mathbb{Z}\}$. $S'$ n'est qu'une partie de l'ensemble de ses solutions. Il faut refaire le raisonnement à partir de la solution $(2 \times 5, 2 \times (-9))$.

### Autre méthode : se ramener à des entiers premiers entre eux

Comme $pgcd(456, 252) = 12$, on se ramène à résoudre

$$
38.u + 21.v = 1 \qquad (2)
$$

1. Effectuer "Euclide à l'endroit" (mêmes quotients que pour 456 et 252) :

   $$
   456 = 252 \times 1 + 204 \qquad 252 = 204 \times 1 + 48 \qquad 204 = 48 \times 4 + 12 \qquad 48 = 12 \times 4 + 0
   $$

2. Effectuer "Euclide à l'envers" :

   $$
   \begin{aligned}
   1 &= 17 - 16 \\
   1 &= 38 - 21 - 16 \\
   1 &= 38 - 21 - (21 - 17)(21 - 17) \\
   1 &= 38 - 21 - 21.21 + 17.21 + 17.21 - 17.17 \\
   1 &= 38 + 12.21 - 17(38 - 21) \\
   1 &= -16 \times 38 + 29 \times 21
   \end{aligned}
   $$

   Une solution particulière de (2) est $(-16, 29)$ :

   $$
   38.x'_0 + 21.y'_0 = 1 \qquad (3)
   $$

3. Établir la solution générale. On égalise (2) et (3), ainsi $38.x'_0 + 21.y'_0 = 38.x + 21.y \Leftrightarrow 38(x'_0 - x) = 21(y'_0 - y)$.

   $38|21(y'_0 - y)$, or $pgcd(38, 21) = 1$, donc $38|y'_0 - y$, donc $\exists k \in \mathbb{Z} / y'_0 - y = 38k \Rightarrow y = 29 - 38k$. On remplace dans (3), ainsi $x = -16 - 21k$.

Ainsi la solution générale est $(-16 - 21k, 29 - 38k)$.
