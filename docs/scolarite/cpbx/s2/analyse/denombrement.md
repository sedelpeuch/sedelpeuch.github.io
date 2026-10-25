---
title: "Dénombrement"
description: "Dénombrement : ensembles finis, complémentaire, produit cartésien et cardinal, nombre de parties, p-listes, arrangements, permutations, combinaisons, formule du binôme et tirages avec ou sans remise."
sidebar_position: 6
---

## Ensembles

Dans tout ce chapitre, on considère des ensembles finis.

**Définition.** On appelle ensemble fini un ensemble ayant un nombre fini d'éléments distincts.

**Définition (ensemble vide).** On appelle ensemble vide un ensemble qui ne contient aucun élément. On le note $\emptyset$.

**Définition (cardinal d'un ensemble).** Le nombre fini d'éléments d'un ensemble $A$ est appelé cardinal de $A$, noté $\text{card}[A]$ (ou aussi $|A|$).

**Remarque.** Dans un ensemble, l'ordre et la répétition n'ont pas d'importance, c'est-à-dire $A = \{1, 2, 3, 4\} = \{2, 3, 1, 4\}$.

**Définition (complémentaire d'un ensemble).** Soit $\Omega$ un ensemble et $A$ un sous-ensemble de $\Omega$ ($A \subset \Omega$). On appelle ensemble **complémentaire** de $A$ dans $\Omega$, que l'on note $\Omega \setminus A$ (ou $C^A_\Omega$, $\overline{A}$) :

$$
x \in \Omega \setminus A \Leftrightarrow x \in \Omega \text{ et } x \notin A
$$

**Propriétés.** Soit $\Omega$ un ensemble et $A, B, C$ des sous-ensembles de $\Omega$. On a :

1. $A \cap \emptyset = \emptyset$
2. $A \cup \emptyset = A$
3. $A \cup B = B \cup A$
4. $A \cap B = B \cap A$
5. $(A \cup B) \cap C = (A \cap C) \cup (B \cap C)$
6. $(A \cap B) \cup C = (A \cup C) \cap (B \cup C)$
7. $C^{A \cup B}_\Omega = C^A_\Omega \cap C^B_\Omega$
8. $C^{A \cap B}_\Omega = C^A_\Omega \cup C^B_\Omega$

**Remarque.** Dire « Soit $x \in A$ » est en général faux : il faut supposer avant que $A \neq \emptyset$.

**Définition (produit cartésien).** Soient $E$ et $F$ deux ensembles non vides. On définit l'ensemble noté $E \times F$ par :

$$
E \times F = \{(x, y), x \in E \text{ et } y \in F\}
$$

D'une manière générale, si $E_1, \dots, E_n$ sont des ensembles non vides, alors $E_1 \times E_2 \times \dots \times E_n = \{(x_1, x_2, \dots, x_n), x_i \in E_i, i = 1, \dots, n\}$.

**Propriétés (cardinal).** Soient $A$ et $B$ deux ensembles finis. On a :

1. $\text{card}(A \cup B) = \text{card}(A) + \text{card}(B) - \text{card}(A \cap B)$
2. $\text{card}(A \times B) = \text{card}(A) \times \text{card}(B)$
3. Si $A$ est un sous-ensemble de $\Omega$, alors $\text{card}(C^A_\Omega) = \text{card}(\Omega) - \text{card}(A)$.
4. Si $A \cap B = \emptyset$, alors $\text{card}(A \cup B) = \text{card}(A) + \text{card}(B)$.

**Définition.** Soient $A$ et $B$ deux ensembles. On dit que $A$ et $B$ sont disjoints (ou que $A$ et $B$ sont incompatibles) si et seulement si $A \cap B = \emptyset$.

## Dénombrements

Dans un ensemble fini $E$, la problématique consiste en :

- la constitution de collections d'éléments ayant une caractéristique commune ;
- le comptage du nombre d'objets constituant cette collection.

Dans le dénombrement, il y a deux problèmes : l'ordre et la répétition.

**Définition (Répétition).** Lors de la constitution des collections, chaque élément de $E$ peut être comptabilisé plusieurs fois.

**Définition.** Pour distinguer deux collections, on peut tenir compte de l'ordre des éléments qui les composent.

## Nombre de parties d'un ensemble fini

**Définition (partie).** Soit $E$ un ensemble ; on dit que $A$ est une partie de $E$ si $A$ est un ensemble contenu dans $E$.

**Remarque.** L'ensemble vide est toujours une partie d'un ensemble $E$.

**Théorème VI.1.** Soit $E_n$ un ensemble contenant $n$ éléments. Alors il y a $2^n$ parties distinctes de $E_n$.

**Démonstration (récurrence sur $n$).**

**Initialisation :** si $n = 0$, $E_0 = \emptyset$ ; la seule partie du vide est le vide.

**Hérédité :** supposons que l'hypothèse de récurrence est vraie pour $n$. Soit $E_{n+1}$ un ensemble de $(n+1)$ éléments. On peut écrire $E_{n+1} = E_n \cup \{x_{n+1}\}$ avec $x_{n+1} \notin E_n$. Soit $A$ une partie de $E_{n+1}$ :

$$
\begin{aligned}
&\Leftrightarrow x_{n+1} \in A \text{ ou } x_{n+1} \notin A \\
&\Leftrightarrow A \subset E_n \text{ ou } A \text{ contient } x_{n+1} \\
&\Leftrightarrow A \subset E_n \text{ ou } A = \{x_{n+1}\} \cup B \text{ avec } B \subset E_n \\
&\Leftrightarrow A \text{ est une partie de } E_n \text{ ou } A \text{ est une partie } \{x_{n+1}\} \cup B
\end{aligned}
$$

$\text{card}\{\{x_{n+1}\} \cup B, B \text{ partie de } E_n\} = \text{card}\{B, B \text{ partie de } E_n\} = 2^n$, donc $\text{card}(\text{ensemble des parties de } E_{n+1}) = \text{card}(\{\text{parties de } E_n\}) + \text{card}(\{\{x_{n+1}\} \cup B\}) = 2^{n+1}$.

## Notion de $p$-listes

**Définition.** Soit $E_n$ un ensemble contenant $n$ éléments. Une $p$-liste d'éléments de $E_n$ est une liste ordonnée de $p$ éléments de $E_n$ avec répétition possible.

**Théorème VI.2.** Soit $E_n$ un ensemble contenant $n$ éléments distincts. Le nombre de $p$-listes distinctes de l'ensemble $E_n$ est $n^p$.

**Démonstration.** Une $p$-liste de $E_n$ est un élément de $\underbrace{E_n \times E_n \times \dots \times E_n}_{p \text{ fois}}$ : c'est un élément du produit cartésien $E_n \times E_n \times \dots \times E_n$. Donc le nombre de $p$-listes est $\text{card}(E_n \times E_n \times \dots) = \text{card}(E_n) \times \dots \times \text{card}(E_n) = \text{card}(E_n)^p = n^p$.

## Arrangement

**Définition.** Un arrangement à $p$ éléments d'un ensemble $E_n$ (de $n$ éléments) est un échantillon ordonné sans remise de $p$ éléments de $E_n$.

**Proposition.** Soit $E_n$ un ensemble de $n$ éléments distincts. Soit $p \in \mathbb{N}$.

1. Si $p > n$, alors le nombre d'arrangements de $p$ éléments de $E_n$ est égal à $0$.
2. Si $p \leq n$, alors le nombre d'arrangements de $p$ éléments est égal à $n(n-1)\dots(n-p+1)$, que l'on note

   $$
   A_n^p = \frac{n!}{(n-p)!}
   $$

**Démonstration.** Soit $p > n$.

- Si on choisit le premier élément, il y a $n$ choix.
- Si on choisit le deuxième élément, il y a $n - 1$ choix.
- …
- Si on choisit le $n$-ième élément, il y a $1$ choix.

Il n'y a plus de choix si $p > n$. Donc le nombre d'arrangements est égal à $0$. Il y en a $A_n^p$ si $p \leq n$.

## Permutation

**Définition.** Une permutation d'un ensemble $E_n$ (à $n$ éléments) est un échantillon ordonné de $n$ éléments de $E_n$.

**Proposition.** Soit $E_n$ un ensemble tel que $\text{card}(E_n) = n$ ; le nombre de permutations de $E_n$ est $A_n^n = n!$.

**Remarque.** Si on a $n$ éléments, il y a $n!$ façons de les ordonner.

## Combinaisons

**Définition.** Soit $E_n$ un ensemble de $n$ éléments. Une combinaison de $p$ éléments de $E_n$ est un échantillon non ordonné sans remise de $p$ éléments de $E_n$.

**Proposition.** Soit $E_n$ un ensemble tel que $\text{card}(E_n) = n$. Soit $p \in \mathbb{N}$ :

1. Si $p > n$, le nombre de combinaisons de $p$ éléments de $E_n$ est $0$.
2. Si $p \leq n$, le nombre de combinaisons de $p$ éléments de $E_n$ est $\dfrac{A_n^p}{p!}$, que l'on note

   $$
   C_n^p = \frac{n!}{p!(n-p)!}
   $$

**Démonstration.** Si on a $p$ éléments, on peut les ordonner de $p!$ façons :

$$
A_n^p = p!\,C_n^p = \begin{cases} 0 & \text{si } p > n \\ \dfrac{n!}{(n-p)!} & \text{si } p \leq n \end{cases}
$$

## Résumé

Soit $E_n$ un ensemble de $n$ éléments ; le nombre de choix de $p$ éléments de $E_n$ est donné par le tableau suivant :

|  | Remise : nom | Remise : nombre d'échantillons | Sans remise : nom | Sans remise : nombre d'échantillons |
| --- | --- | --- | --- | --- |
| Ordre | listes | $n^p$ | arrangements | $A_n^p$ |
| Sans ordre | pas de nom | $C_{n+p-1}^p$ | combinaisons | $C_n^p$ |

**Exercice.** Soient $E$ et $F$ deux ensembles tels que $\text{card}(E) = n$ et $\text{card}(F) = p$.

1. Déterminer le nombre d'applications de $E$ dans $F$.
2. Déterminer le nombre d'applications injectives de $E$ dans $F$.

**Solution.** Soient $E = \{1, 2, \dots, n\}$ et $F = \{1, 2, \dots, p\}$. Une application est totalement déterminée si on connaît $(f(1), f(2), \dots, f(n))$, $f(i)$ étant un élément de $F$. Donc $\begin{cases} (f(1), f(2), \dots, f(n)) \\ (f(2), f(1), \dots, f(n)) \end{cases}$ est une liste de $n$ éléments de $F$. Le nombre d'applications de $E$ dans $F$ est le nombre de listes de $n$ éléments parmi un ensemble de $p$ éléments. Ainsi le nombre d'applications de $E$ dans $F$ vaut $p^n$.

$f : E \to F$ est une application injective si et seulement si $f(i) \neq f(j)$ si $i \neq j$.

Pour $f(1)$, on a $p$ choix possibles. Pour $f(2)$, on a $(p-1)$ choix possibles… Pour $f(k)$, on a $(p - k + 1)$ choix possibles. Pour que $f$ soit injective, il est nécessaire que $\text{card}(F) \geq \text{card}(E)$. Si $p < n$, il n'y a aucune application injective de $E$ dans $F$. Si $p \geq n$, il y a $A_p^n$ applications injectives de $E$ dans $F$.

**Théorème VI.3** (Formules de calcul)**.**

1. $C_n^p = C_n^{n-p}$
2. $C_n^p = C_{n-1}^{p-1} + C_{n-1}^p$
3. $(a + b)^n = \displaystyle\sum_{k=0}^{n} C_n^k a^k b^{n-k}$

**Démonstration.**

1. Le nombre de combinaisons de $p$ éléments parmi $n$ éléments est égal au nombre de combinaisons de $(n - p)$ éléments parmi $n$ éléments. En effet, si on choisit une combinaison de $p$ éléments, il nous reste une combinaison de $(n - p)$ éléments.
2. On a

   $$
   \begin{aligned}
   C_{n-1}^{p-1} + C_{n-1}^p &= \frac{(n-1)!}{(p-1)!((n-1)-(p-1))!} + \frac{(n-1)!}{p!(n-1-p)!} = (n-1)!\left\{\frac{1}{(p-1)!(n-p)!} + \frac{1}{p!(n-p-1)!}\right\} \\
   &= (n-1)!\left\{\frac{p + n - p}{p!(n-p)!}\right\} = \frac{n!}{p!(n-p)!}
   \end{aligned}
   $$

3. $(a + b)^n = (a + b)\dots(a + b) \Rightarrow (a + b)^n = \displaystyle\sum_{k+l=n} \gamma_{kl} a^k b^l$ ; le coefficient de $a^k$ est égal au nombre de combinaisons possibles de $k$ éléments parmi $n$ éléments $\Rightarrow \gamma_{kl} = C_n^k$.

### Applications (exemples de tirages)

On dispose d'une urne où se trouvent $N$ boules de $k$ couleurs différentes ($k \leq N$). On note $N_i$, $i \in \{1, \dots, k\}$, le nombre de boules de la couleur $i$. On a $N_1 + N_2 + \dots + N_k = N$. On tire au hasard $n$ boules de cette urne.

**Tirage avec remise.** On tire les $n$ boules une à une, en remettant à chaque fois la boule tirée dans l'urne. Le résultat est un $n$-uplet de boules de l'urne. Ce nombre est

$$
\frac{n!}{n_1!\,n_2!\dots n_k!} N_1^{n_1} \times N_2^{n_2} \times \dots \times N_k^{n_k}
$$

**Tirage sans remise ordonné.** On tire une par une les boules sans remise. Quel est le nombre de $n$-uplets constitués de $n_1$ boules de couleur 1, …, de $n_k$ boules de couleur $k$ ? Le résultat est

$$
\frac{n!}{n_1!\,n_2!\dots n_k!} A_{N_1}^{n_1} A_{N_2}^{n_2} \dots A_{N_k}^{n_k}
$$

**Tirage sans remise non ordonné.** On tire simultanément $n$ boules parmi les $N$ boules. Quel est le nombre de $n$-uplets constitués de $n_1$ boules de couleur 1, …, $n_k$ boules de couleur $k$ ? Le résultat est

$$
C_{N_1}^{n_1} C_{N_2}^{n_2} \dots C_{N_k}^{n_k}
$$
