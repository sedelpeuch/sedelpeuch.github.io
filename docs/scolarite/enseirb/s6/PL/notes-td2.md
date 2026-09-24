---
title: PL - Notes TD 2
description: "Résolution pas à pas d'un programme linéaire par l'algorithme du simplexe : choix des variables entrantes et sortantes, changements de base et vérification de l'optimalité."
---

## Exercice 1

Rappel du problème initial en forme standard :

$$
\begin{aligned}
&\max z \\ \text{s.c.} \; \; z&= 7I+9II \\ s_1 &= 8-I-II\\ s_2&=19-2I-3II \\ s_3 &= 4-II \end{aligned}
$$

On choisit de faire entrer $II$ en base (plus grand coût réduit) ; $I$ reste hors base, on peut donc l'annuler.

$$
\begin{aligned}
s_1 &=8-II \geq 0 \\ s_2 &= 19-3II \geq 0 \\ s_3 &= 4-II \geq 0 \end{aligned} \Rightarrow \begin{cases} II \leq 8 \\ II \leq 19/3 \\ II \leq 4 \end{cases}
$$

On fait donc sortir $s_3$ de la base, puis on réécrit le problème dans cette nouvelle base :

$$
\begin{aligned}
z-9II&=7I \\ s_1 + II &= 8-I \\ s_2 + 3II &=19-2I \\ s_3 + II &= 4
\end{aligned}
$$

On veut maintenant exprimer les variables de la base en fonction des variables hors base $(s_3, I)$ :

$$
\begin{aligned}
z - 9(4-s_3) &= 7I \\ s_1+4-s_3 &= 8-I \\ s_2 + 3(4-s_3) &= 19-2I \\ II&=4-s_3
\end{aligned}
\Rightarrow \begin{aligned}
z&=36-9s_3+7I \\ s_1&=4-I+s_3 \\ s_2 &=7-2I+3s_3 \\ II &= 4-s_3
\end{aligned}
$$

Le coût réduit de $I$ est positif : on fait entrer $I$ en base, $s_3$ restant nul :

$$
\begin{aligned}
s_1 &=4-I \geq 0 \\ s_2 &= 7-2I \geq 0 \\ II&=4 \end{aligned} \Rightarrow \begin{cases} I \leq 4 \\ I \leq 7/2 \end{cases}
$$

La prochaine étape sera donc de sortir $s_2$ de la base. De $s_2 = 7-2I+3s_3$, on tire $I = \dfrac{7}{2} - \dfrac{1}{2}s_2 + \dfrac{3}{2}s_3$, que l'on substitue :

$$
\begin{aligned}
z&=36 - 9 s_3 + \dfrac{49}{2} - \dfrac{7}{2} s_2 + \dfrac{21}{2} s_3 \\ s_1 &=4+s_3-\dfrac{7}{2}+\dfrac{1}{2}s_2-\dfrac{3}{2}s_3 \\ I &=\dfrac{7}{2} - \dfrac{1}{2}s_2 + \dfrac{3}{2}s_3 \\ II &= 4 -s_3
\end{aligned}
\Rightarrow \begin{aligned}
z &= \dfrac{121}{2} - \dfrac{7}{2}s_2+\dfrac{3}{2}s_3 \\ s_1 &=\dfrac{1}{2}+\dfrac{1}{2}s_2-\dfrac{1}{2}s_3 \\ I&=\dfrac{7}{2}-\dfrac{1}{2}s_2+\dfrac{3}{2}s_3 \\ II&=4-s_3
\end{aligned}
$$

On fait entrer $s_3$ dans la base puisque $\overline{c}_{s_3} > 0$ ($s_2$ restant nul) :

$$
\begin{aligned}
s_1 &= \dfrac{1}{2} - \dfrac{1}{2}s_3 \geq 0 \\ I&=\dfrac{7}{2} + \dfrac{3}{2} s_3 \geq 0 \\ II &= 4 -s_3 \geq 0 \end{aligned} \Rightarrow \begin{cases} s_3 \leq 1 \\ s_3 \geq -7/3 \; \text{(toujours vrai)} \\ s_3 \leq 4 \end{cases}
$$

On fait donc sortir $s_1$ de la base. On exprime alors les variables de la base $(I,II,s_3)$ en fonction des variables hors base $(s_1,s_2)$, avec $s_3 = 1 - 2s_1 + s_2$ :

$$
\begin{aligned}
z-\dfrac{3}{2}s_3&= \dfrac{121}{2}-\dfrac{7}{2}s_2 \\ s_1 + \dfrac{1}{2} s_3 &= \dfrac{1}{2}+\dfrac{1}{2}s_2 \\ I-\dfrac{3}{2}s_3 &=\dfrac{7}{2}-\dfrac{1}{2}s_2 \\ II+s_3 &= 4
\end{aligned}
$$

Et donc, au final :

$$
\begin{cases} z=62-3s_1-2s_2 \\ s_3=1-2s_1+s_2 \\ I=5-3s_1+s_2 \\ II=3+2s_1-s_2 \end{cases}
$$

Tous les coûts réduits sont négatifs : la solution $I=5$, $II=3$ (avec $s_1 = s_2 = 0$ et $s_3 = 1$) est optimale, de valeur $z = 7 \times 5 + 9 \times 3 = 62$.
