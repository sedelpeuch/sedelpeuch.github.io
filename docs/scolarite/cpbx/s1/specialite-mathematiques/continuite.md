---
title: "Continuité"
description: "Continuité en un point et sur un intervalle, continuité à gauche et à droite, prolongement par continuité, continuité et suites, fonctions lipschitziennes, théorèmes des valeurs intermédiaires et de la bijection, opérations sur les fonctions continues."
sidebar_position: 4
---

## Continuité d'une fonction en un point $a$ ou sur un intervalle $U$

**Fonction $f$ continue en un réel $a$ de son ensemble de définition.** Fonction $f$ définie au moins sur un intervalle de la forme $]a - \alpha, a + \alpha[$ et admettant une limite en $a$. Notons que, puisque $a \in D_f$, nécessairement $\lim\limits_a f = f(a)$.

**Fonction $f$ continue à gauche en un réel $a$ de son ensemble de définition.** Fonction $f$ définie au moins sur un intervalle de la forme $]a - \alpha, a]$ et admettant en $a$ une limite à gauche obligatoirement égale à $f(a)$.

Notons que la condition $\lim\limits_{a^-} f = f(a)$ ne résulte ni de l'existence de $\lim\limits_{a^-} f$ ni du fait que $a \in D_f$, et qu'il est indispensable de la vérifier.

**Fonction $f$ continue à droite en un réel $a$ de son ensemble de définition.** Fonction $f$ définie au moins sur un intervalle de la forme $[a, a + \alpha[$ et admettant en $a$ une limite à droite obligatoirement égale à $f(a)$.

Notons que la condition $\lim\limits_{a^+} f = f(a)$ ne résulte ni de l'existence de $\lim\limits_{a^+} f$ ni du fait que $a \in D_f$, et qu'il est indispensable de la vérifier.

**Équivalences fondamentales.** Pour toute $f$ définie au moins sur un intervalle de la forme $]a - \alpha, a + \alpha[$ ($\alpha > 0$), on a équivalence entre :

- $f$ est continue en $a$ ;
- $f$ est continue à gauche et à droite en $a$ ;
- $\lim\limits_{a^-} f$ et $\lim\limits_{a^+} f$ existent et sont toutes deux égales à $f(a)$.

**Fonction $f$ "continue sur un intervalle $U$".** Fonction $f$ définie sur $U$ et qui est à la fois continue en tout réel $a$ de l'intervalle ouvert formé de $U$ privé de ses bornes, et continue en toute borne de $U$ qui appartient à $U$ (si c'est le cas), du côté de l'intérieur de $U$.

**Remarque.** Graphiquement, la continuité sur $U$, c'est, pour la portion de représentation graphique de la fonction formée de ses points d'abscisses éléments de $U$, l'apparence d'un tracé continu.

**Une caractérisation topologique de la continuité sur $\mathbb{R}$.** Pour toute fonction $f$ définie sur $\mathbb{R}$, on a équivalence entre :

- $f$ est continue sur $\mathbb{R}$ ;
- pour tout ouvert $U$ de $\mathbb{R}$, $f^{-1}(U)$ est un ouvert de $\mathbb{R}$.

**Prolongement par continuité d'une application.** $E$ est une partie de $\mathbb{R}$ constituée d'une réunion d'intervalles. $f$ est une application de $E$ dans $\mathbb{R}$ continue sur tout intervalle inclus dans $E$, $a$ est un réel n'appartenant pas à $E$ et borne d'un des intervalles constituant $E$.

Si $\lim\limits_{x \to a} f(x) = l$, $l$ étant un réel, on dit que $f$ est "prolongeable par continuité à $E \cup \{a\}$". Le prolongement par continuité de $f$ est l'application

$$
\tilde{f} : \begin{cases} E \cup \{a\} \to \mathbb{R} \\ x \to \begin{cases} \tilde{f}(x) = f(x) \text{ si } x \in E \\ \tilde{f}(a) = l \end{cases} \end{cases}
$$

## Continuité et suites numériques

**Image d'une suite convergente par une fonction continue en sa limite $l$.** Soit $(u_n)_{n \in I}$ une suite convergente de limite $l$. Soit $f$ une fonction définie au moins sur un intervalle $U$ contenant tous les $u_n$ et $l$. Si $f$ est continue en $l$, alors la suite $(v_n)_{n \in I}$ de terme général $v_n = f(u_n)$ converge vers $f(l)$.

**Le cas des fonctions lipschitziennes.**

- Toute fonction $f$ définie et lipschitzienne sur un intervalle $U$ est continue sur $U$.
- Toute fonction $f$ définie et contractante sur un intervalle fermé $[a, b]$ qu'elle stabilise admet dans $[a, b]$ un point fixe unique (réel $x_0$ tel que $f(x_0) = x_0$). Ce réel $x_0$ est limite de toute suite $(u_n)_{n \in \mathbb{N}}$ définie par $\begin{cases} u_0 = \text{un réel quelconque de } [a, b] \\ \forall n \in \mathbb{N}, u_{n+1} = f(u_n) \end{cases}$

## Les théorèmes des valeurs intermédiaires et de la bijection

**Théorème III.1 (TVI).** Si $f$ est une fonction continue sur un intervalle $[a, b]$, pour tout réel $\gamma$ intermédiaire entre $f(a)$ et $f(b)$, $\exists c \in [a, b]$ tel que $\gamma = f(c)$.

**Image d'un intervalle par une fonction continue.**

- Pour toute fonction $f$ continue sur un intervalle $U$, $f(U)$ est un intervalle.
- Soit $U$ un intervalle de bornes $a$ et $b$, et $f$ une fonction continue sur $U \cup \{a, b\}$. Alors l'intervalle $f(U)$ est également borné. Si $f$ est monotone sur $U \cup \{a, b\}$, alors les bornes de $f(U)$ sont $f(a)$ et $f(b)$ ; sinon elles ne sont pas nécessairement $f(a)$ et $f(b)$.
- Pour tout intervalle $U$ et toute fonction $f$ continue sur $U$, il n'est pas obligatoire que l'intervalle $f(U)$ soit de même nature (ouvert ou fermé) que $U$ ; toutefois deux cas particuliers sont à connaître :
  - si $U$ est un intervalle fermé, alors $f(U)$ est un intervalle fermé ;
  - si $U$ est un intervalle ouvert et si $f$ est strictement monotone sur $U$, alors $f(U)$ est un intervalle ouvert.

**Théorème III.2 (de la bijection).** Soit $U$ un intervalle de $\mathbb{R}$ non réduit à un singleton ; notons $a$ et $b$ ses bornes dans l'ordre croissant. Toute application $f$ définie, continue et strictement monotone sur $U$ définit une bijection $g : x \mapsto f(x)$ de $U$ sur $f(U)$, intervalle dont les bornes sont $\lim\limits_{a^+} f$ et $\lim\limits_{b^-} f$.

**Sens de variation et continuité de la bijection réciproque $g^{-1}$.** Sous les hypothèses du théorème de la bijection, $g^{-1}$ est continue sur $f(U)$, à valeurs dans $U$, et strictement monotone de même sens que $g$, c'est-à-dire que $f$ sur $U$.

## Fonctions obtenues par opérations sur des fonctions continues

Quelques théorèmes généraux relatifs aux opérations sur les fonctions continues.

**Propriété 1.** $f$ et $g$ sont deux fonctions simultanément continues sur un même intervalle $U$.

- $\forall (\lambda, \mu) \in \mathbb{R}^2$, $\lambda f + \mu g$ est continue sur $U$ (donc en particulier $f + g$, $f - g$, $-f$…).
- $f \times g$ est continue sur $U$ et $\forall n \in \mathbb{N}$, $f^n = f \times f \times f \times \dots \times f$ est continue sur $U$.
- Si $0 \notin g(U)$, alors $\dfrac{1}{g}$ et $\dfrac{f}{g}$ sont continues sur $U$ et $\forall n \in \mathbb{Z}$, $g^n$ est continue sur $U$.

**Propriété 2.**

- Si $f$ est continue sur un intervalle $U$, si $g$ est continue sur un intervalle $V$ contenant $f(U)$, alors $g \circ f$ est continue sur $U$.
- Si $f$ est continue sur un intervalle $U$ tel que $f(U) \subset U$, alors $\forall n \in \mathbb{N}$, $f^n = f \circ f \circ f \circ \dots \circ f$ est continue sur $U$.
