---
title: "Probabilités sur un univers fini"
description: "Probabilités sur un univers fini : épreuve, univers et événements, définition d'une probabilité, équiprobabilité, partitions, indépendance, probabilités conditionnelles et théorème de Bayes."
sidebar_position: 7
---

## Épreuve

**Définition.** On dit qu'une expérience ou une épreuve est aléatoire si on obtient des résultats différents lorsqu'on répète les mêmes expériences avec les mêmes données.

**Exemple.**

- Lancer une pièce de monnaie.
- Tirage d'une carte parmi 32 cartes.

## Ensemble des éventualités (ou univers)

**Définition.** Considérons une épreuve aléatoire. L'ensemble des éventualités de cette épreuve est l'ensemble des résultats possibles. On note cet ensemble $\Omega$.

**Exemple.**

- Lancer une pièce de monnaie une fois : $\Omega = \{\text{Pile}, \text{Face}\}$
- Lancer une pièce de monnaie deux fois : $\Omega = \{(\text{Pile}, \text{Face}), (\text{Pile}, \text{Pile}), (\text{Face}, \text{Pile}), (\text{Face}, \text{Face})\}$
- Le cardinal d'une telle expérience est $\text{card}(\Omega) = 2^k$.

**Définition.** Soit $\Omega$ l'espace des éventualités associé à une épreuve aléatoire. On note $\mathcal{P}(\Omega)$ l'ensemble des parties de $\Omega$. Chaque élément de $\mathcal{P}(\Omega)$ (c'est-à-dire chaque partie de $\Omega$) est appelé un événement.

**Exemple.** Si on lance une pièce de monnaie 3 fois, $A = \{(P, P, F), (P, P, P)\}$ est un événement.

**Événements particuliers.**

1. $\emptyset$ est appelé événement impossible.
2. $\Omega$ est appelé événement certain.
3. Soient $A$ et $B$ deux parties de $\Omega$ ; $A$ et $B$ sont incompatibles si

   $$
   A \cap B = \emptyset
   $$

4. Chaque partie de $\Omega$ constituée d'un seul élément est appelée événement élémentaire (un événement élémentaire est une éventualité).

## Probabilité finie

**Définition.** Soit $\Omega$ un univers et $\mathcal{P}(\Omega)$ l'ensemble des événements de $\Omega$. Une probabilité $p$ est une application de $\mathcal{P}(\Omega)$ dans $[0, 1]$ qui vérifie les propriétés suivantes :

$$
p : \mathcal{P}(\Omega) \to [0, 1]
$$

1. $p(\emptyset) = 0$, $p(\Omega) = 1$
2. $\forall A, B \in \mathcal{P}(\Omega)$ tels que $A \cap B = \emptyset$, on a $p(A \cup B) = p(A) + p(B)$

Le triplet $(\Omega, \mathcal{P}(\Omega), p)$ est appelé espace de probabilité.

**Corollaire.** Si $(\Omega, \mathcal{P}(\Omega), p)$ est un espace de probabilité, alors $\forall A_1, A_2, \dots, A_n \in \mathcal{P}(\Omega)$ tels que $A_i \cap A_j = \emptyset$, $i \neq j$, on a :

$$
p\left(\bigcup_{i=1}^{n} A_i\right) = \sum_{i=1}^{n} p(A_i)
$$

**Démonstration par récurrence.** Par hypothèse, pour $A_1, A_2$ tels que $A_1 \cap A_2 = \emptyset$, on a $p(A_1 \cup A_2) = p(A_1) + p(A_2)$. Supposons que $p(A_1 \cup A_2 \cup \dots \cup A_n) = p(A_1) + p(A_2) + \dots + p(A_n)$ ; alors $p(A_1 \cup A_2 \cup \dots \cup A_n \cup A_{n+1}) = p(A_1) + \dots + p(A_n) + p(A_{n+1})$. L'hypothèse de récurrence est vraie pour $n + 1$.

**Théorème VII.1.** Soit $(\Omega, \mathcal{P}(\Omega), p)$ un espace de probabilité. Soient $A, B \in \mathcal{P}(\Omega)$ ; alors on a :

1. $p(A \cup B) = p(A) + p(B) - p(A \cap B)$
2. $p(\Omega \setminus A) = 1 - p(A)$
3. Si $A \subset B \Rightarrow p(A) \leq p(B)$

**Démonstration.**

1. $A \cup B = (A \setminus B) \cup (B \setminus A) \cup (A \cap B)$

   $$
   \begin{aligned}
   &\Leftrightarrow p(A \cup B) = p(A \setminus B) + p(B \setminus A) + p(A \cap B) \\
   &\Leftrightarrow A = (A \setminus B) \cup (A \cap B) \text{ et } B = (B \setminus A) \cup (A \cap B) \\
   &\Leftrightarrow p(A) = p(A \setminus B) + p(A \cap B) \text{ et } p(B) = p(B \setminus A) + p(A \cap B)
   \end{aligned}
   $$

   Donc $p(A \cup B) = (p(A) - p(A \cap B)) + p(B) - p(A \cap B) + p(A \cap B)$.
2. $\Omega = (\Omega \setminus A) \cup A$, $(\Omega \setminus A) \cap A = \emptyset$

   $$
   \Leftrightarrow p(\Omega) = p(\Omega \setminus A) + p(A) = 1 \Rightarrow p(\Omega \setminus A) = 1 - p(A)
   $$

3. Si $A \subset B$, alors $B = A \cup (B \setminus A)$ et on a $A \cap (B \setminus A) = \emptyset$ :

   $$
   p(B) = p(A) + p(B \setminus A) \geq p(A) \quad \text{car } \forall c \in \mathcal{P}(\Omega), p(c) \geq 0
   $$

## Équiprobabilité

**Définition.** Soit $(\Omega, \mathcal{P}(\Omega), p)$ un espace de probabilité. On dit que deux événements élémentaires sont équiprobables si $p(\{a_1\}) = p(\{a_2\})$.

**Théorème VII.2.** Soit $(\Omega, \mathcal{P}(\Omega), p)$ un espace de probabilité tel que tous les événements élémentaires sont équiprobables (on rappelle que $\Omega$ est un ensemble fini). Alors on a :

1. $\forall a \in \Omega$, $p(\{a\}) = \dfrac{1}{\text{card}(\Omega)}$
2. $\forall A \in \mathcal{P}(\Omega)$, $p(A) = \dfrac{\text{card}(A)}{\text{card}(\Omega)}$

**Démonstration.** $\Omega = \{a_1, a_2, \dots, a_n\}$, alors

$$
p(\Omega) = p\left(\bigcup_{i=1}^{n} \{a_i\}\right) = \sum_{i=1}^{n} p(\{a_i\}) = 1 = n\,p(\{a_i\}) \quad \text{car } p(\{a_i\}) = p(\{a_j\}), \forall i, j
$$

$$
\Rightarrow p(\{a_i\}) = \frac{1}{n} = \frac{1}{\text{card}(\Omega)}
$$

Soit $A = \{a_1, a_2, \dots, a_k\} \subset \Omega$ et $p(A) = p(\{a_1, a_2, \dots, a_k\}) = \displaystyle\sum_{i=1}^{k} p(\{a_i\}) = k\,p(\{a_i\}) = \frac{k}{n} = \frac{\text{card}(A)}{\text{card}(\Omega)}$.

## Partition

**Définition.** Soit $\Omega$ un univers et $(A_i)_{i \in I}$ une famille d'événements. On dit que la famille $(A_i)_{i \in I}$ est une partition de $\Omega$ si et seulement si :

1. $A_i \cap A_j = \emptyset, \forall i \neq j$
2. $\displaystyle\bigcup_{i \in I} A_i = \Omega$

**Exemple.** L'ensemble des événements élémentaires d'un univers $\Omega$ est une partition de $\Omega$ : $\Omega = \{a_1, a_2, \dots, a_n\} = \displaystyle\bigcup_{i=1}^{n} \{a_i\}$.

**Théorème VII.3.** Soit $(\Omega, \mathcal{P}(\Omega), p)$ un espace de probabilité. Soit $(A_i)_{i \in I}$ une partition de $\Omega$. Soit $B \in \mathcal{P}(\Omega)$. On a : $p(B) = \displaystyle\sum_{i \in I} p(A_i \cap B)$.

**Démonstration.** $\displaystyle\bigcup_{i \in I} A_i = \Omega \Rightarrow B \cap \left(\bigcup_{i \in I} A_i\right) = B = \bigcup_{i \in I} (B \cap A_i)$. Or $(B \cap A_i) \cap (B \cap A_j) = B \cap (A_i \cap A_j) = \emptyset$ si $i \neq j$, donc

$$
p(B) = p\left(\bigcup_{i \in I} (A_i \cap B)\right) = \sum_{i \in I} p(A_i \cap B)
$$

**Exercice.** On lance $n$ fois une pièce de monnaie.

1. Déterminer l'univers $\Omega$ associé à cette expérience aléatoire.
2. Calculer la probabilité d'avoir au moins une fois pile.

**Solution.**

1. $E = \{P, F\}$, $\Omega = E \times E \times \dots \times E = \{(a_1, a_2, \dots, a_n), a_i = P \text{ ou } a_i = F\}$.

   $$
   \text{card}(\Omega) = \overbrace{\text{card}(E) \times \text{card}(E) \times \dots \times \text{card}(E)}^{n \text{ fois}} = 2^n
   $$

   Les événements élémentaires sont équiprobables. Si $(a_1, a_2, \dots, a_n) \in \Omega$, $a_i \in \{P, F\}$, $p(\{a_1, \dots, a_n\}) = \dfrac{1}{2^n}$.
2. Soit $A = \{\text{avoir au moins une fois pile}\}$. $\Omega \setminus A = \{\text{n'avoir aucun pile}\} = \{(F, F, \dots, F)\}$.

   $$
   p(\Omega \setminus A) = p(\{(F, F, \dots, F)\}) = \frac{1}{2^n} \Leftrightarrow p(A) = 1 - p(\Omega \setminus A) = 1 - \frac{1}{2^n}
   $$

## Indépendance

**Définition.** Soit $(\Omega, \mathcal{P}(\Omega), p)$ un espace de probabilité. Soient $A, B$ deux événements. On dit que $A$ et $B$ sont indépendants si et seulement si $p(A \cap B) = p(A) \times p(B)$.

## Probabilités conditionnelles

**Théorème VII.4.** Soit $(\Omega, \mathcal{P}(\Omega), p)$ un espace de probabilité. Soit $B \in \mathcal{P}(\Omega)$ ; on suppose $p(B) \neq 0$. On définit sur $\Omega$ une probabilité, notée $p_B$, par :

$$
p_B : \begin{cases} \mathcal{P}(\Omega) \to [0, 1] \\ A \to p_B(A) = \dfrac{p(A \cap B)}{p(B)} \end{cases}
$$

$p_B(A)$ est appelée la probabilité conditionnelle de $A$ sachant $B$.

**Démonstration.** Il faut démontrer que $p_B$ est bien une probabilité.

1. $p_B(\emptyset) = \dfrac{p(\emptyset \cap B)}{p(B)} = 0$
2. $p_B(\Omega) = \dfrac{p(B \cap \Omega)}{p(B)} = 1$
3. Pour $C \cap D = \emptyset$ : $p_B(C \cup D) = \dfrac{p((C \cup D) \cap B)}{p(B)} = \dfrac{p((C \cap B) \cup (D \cap B))}{p(B)}$
4. $p_B(C \cup D) = \dfrac{p(C \cap B)}{p(B)} + \dfrac{p(D \cap B)}{p(B)} = p_B(C) + p_B(D)$

**Propriétés.**

1. Si $A \subset B$, $p_B(A) = \dfrac{p(A)}{p(B)}$
2. Si $B \subset A$, $p_B(A) = \dfrac{p(B)}{p(B)} = 1$

**Théorème VII.5** (Théorème de Bayes)**.** Soit $(\Omega, \mathcal{P}(\Omega), p)$ un espace de probabilité. Soient $A, B \in \mathcal{P}(\Omega)$ tels que $p(B) \neq 0$ et $p(A) \neq 0$.

$$
p(A)\,p_A(B) = p(B)\,p_B(A)
$$

**Démonstration.** $p_A(B) = \dfrac{p(A \cap B)}{p(A)}$ et $p_B(A) = \dfrac{p(A \cap B)}{p(B)}$, ainsi $p(A \cap B) = p(A)\,p_A(B) = p(B)\,p_B(A)$.

**Remarque.** Soit $\Omega$ un univers et $p : \Omega \begin{cases} \{x_1, x_2, \dots, x_n\} \to [0, 1] \\ x_i \to a_i \end{cases}$ une application. Pour que $p$ soit une probabilité sur $\Omega$, il faut et il suffit que :

$$
a_1 + a_2 + a_3 + \dots + a_n = 1
$$

En effet, $p(\Omega) = p(\{x_1, x_2, \dots, x_n\}) = a_1 + a_2 + \dots + a_n = 1$. Ensuite, si $A \subset \Omega$, alors $A$ est une union disjointe de $\{x_1\}, \dots, \{x_k\} \Rightarrow p(A) = p(\{x_1\}) + \dots + p(\{x_k\})$.

**Exemple.** $\Omega = \{P, F\}$, $p : \begin{cases} \Omega \to [0, 1] \\ P \to \frac{1}{4} \\ F \to \frac{1}{2} \end{cases}$. Comme $\frac{1}{2} + \frac{1}{4} \neq 1$, $p$ n'est pas une probabilité sur $\Omega = \{P, F\}$.
