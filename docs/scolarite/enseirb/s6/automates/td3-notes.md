---
title: Automates finis et applications - TD3
description: "Notes du TD3 d'automates finis : preuves de non-régularité par le lemme de l'étoile et propriétés de clôture des langages réguliers."
---

## Exercice 1

Non traité dans ces notes.

## Exercice 2

Il suffit de montrer qu'il existe un automate fini qui accepte le langage $L$.

## Exercice 3

Voir la contraposée dans les [notes du cours 3](cours3.md) : il faut ensuite saisir que la contraposée du lemme implique la non-régularité.

## Exercice 4

1. Oui, l'expression régulière $(aa+ab+ba+bb)^\ast$ permet de décrire le langage.
2. Non, car un automate fini a une mémoire bornée. Supposons $L$ accepté par un automate fini à $N>0$ états.
   + Soit le mot $\omega = a^N b^N$ : on a bien $\omega \in L$ et $|\omega|\geq N$.
   + Toute décomposition $\omega = xuy$ avec $|xu| \leq N$ et $u \neq \epsilon$ vérifie $u = a^j$ avec $j > 0$. Pour tout $i \neq 1$, $xu^iy = a^{N+(i-1)j}b^N \notin L$ ; on peut prendre $i=2$.
3. La condition de primalité est complexe, on imagine donc difficilement qu'elle puisse être reconnue par un automate ; on utilise encore la contraposée du lemme de l'étoile. Supposons que $L_3$ est accepté par un automate fini à $N>0$ états. Soit $p \geq N+2$ un nombre premier : le mot $a^p$ est dans $L_3$. Toute décomposition s'écrit $xuy=a^i a^j a^k$ avec $i+j \leq N$ et $j > 0$. En répétant $u$ $m = i+k$ fois, on obtient $x u^{m} y = a^{(i+k) + (i+k)j} = a^{(i+k)(j+1)}$, dont la longueur n'est pas un nombre premier puisque $i+k = p-j \geq 2$ et $j+1 \geq 2$. Ce mot n'est donc pas dans $L_3$.
4. Oui.
5. Prenons $N>0$ et le mot suffisamment long $a^N \# a^N$. Le facteur $u$ ne contient que des $a$ de la partie gauche ; en le supprimant ($i=0$), on obtient un mot qui contient moins de $a$ à gauche qu'à droite.

## Exercice 5

C'est le point (iii) qui pose problème : un sous-ensemble d'un langage régulier n'est pas forcément régulier. Cependant, $L'$ est ici bien régulier, puisqu'il suffit de se souvenir de la parité globale, mais ce n'est pas cette preuve qui le montre. On pourrait dire que $L'=L \cap L_1$, et l'intersection de deux langages réguliers est un langage régulier.

## Exercice 6

Le raisonnement est correct : on le montre par la contraposée. Pour passer de (iv) à (v) : si $L$ était régulier, alors son intersection avec un langage régulier serait aussi un langage régulier, ce qui n'est pas le cas (iii), donc $L$ n'est pas régulier.

## Exercice 7

1. On prend le miroir de $L_6$ : $L_{6}^R=\{b^m a^n | n \geq m\}$ et on applique le lemme de l'étoile (ou on utilise l'exo 4.2) pour montrer que $L_6^R$ n'est pas régulier ; les langages réguliers étant clos par miroir, $L_6$ ne l'est pas non plus.
2. $L_7 \cap a^\ast b^\ast = \{a^n b^n \mid n \geq 0\}$ n'est pas régulier, donc, comme pour l'exercice 6, $L_7$ n'est pas régulier.
3. On considère un automate qui accepte $L_8$ et on rend accepteurs tous les états depuis lesquels il existe un chemin menant à un état accepteur.
4. Oui si $|\Sigma|=1$. Sinon, on utilise encore la contraposée du lemme de l'étoile en choisissant bien le mot. On prend $\omega=a^N bb a^N$ : toute décomposition pompe des $a$ de la partie gauche, si bien que les $bb$ ne sont plus au milieu du mot obtenu.
