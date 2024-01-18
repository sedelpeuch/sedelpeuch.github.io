---
layout: page
hide: true
title: Automates finis et application - TD3
---

## Exercice 1

## Exercice 2

Il suffit de montrer qu'il existe un automate fini qui accepte le langage $L$.

## Exercice 3

Voir la contraposée sur les [notes du cours 3](cours3), il faut ensuite saisir que la contraposé du Lemme implique une non régularité

## Exercice 4

1. Oui, l'expression régulière $(aa+ab+ba+bb)^\ast$ nous permet de traduire l'automate
2. Non car l'automate a une mémoire bornée. Supposons $L$ accepté par un automate fini à $N>0$ états

+ soit le mot $\omega = a^N b^N$, on a bien $\omega \in L$ et $\| \omega\|\geq N$
+ [même décomposition que les slides]
  En prenant $i$ suffisamment grand on trouve un mot qui n'appartient pas à $L$. On peut prendre $i=2$ pour $a^N b^N$

3. La condition de primalité est complexe donc on imagine difficilement qu'elle puisse être reconnue par un automate, on utilise encore la contraposée du lemme de l'étoile. Supposons encore une fois que $L_3$ est accepté par un automate fini à $N>0$ états. Soit $p \geq N$ un nombre premier. Le mot $a^p$ est donc dans $L_3$. On obtient une décomposition $xuy=a^i a^j a^k$ avec $i+j < N$ et $j > 0$. On prend $a^i a^{(i+k)j}a^k=a^{i+k}a^{j+1}$ dont la longueur n'est pas un nombre premier, qui n'est pas dans le langage $L_3$
4. Oui
5. Prenons $N>0$. On prend un mot suffisamment long $a^N \# a^N$. En supprimant le facteur $u$, on obtiendra un mot qui contiendra moins de $a$ à gauche qu'à droite

## Exercice 5

C'est le point (iii) qui pose problème : tout sous ensemble d'un langage régulier n'est pas forcément régulier. Cependant, $L'$ est ici bien régulier, puisqu'il suffit de se souvenir de la parité globale, mais ce n'est pas cette preuve qui le montre. On pourrait dire que $L'=L \cap L_1$ et l'intersection de deux langages réguliers est un langage régulier.

## Exercice 6

Le raisonnement est correct on le montre par la contraposée. Pour passer de (iv) à (v) : si $L$ était régulier, alors son intersection avec un langage régulier serait aussi un langage régulier, ce qui n'est pas le cas (iii), donc $L$ n'est pas régulier

## Exercice 7

1. On prend le miroir de $L_6$ : $L_{6}^R=\{b^m a^n | n \geq m\}$ et on applique le lemme de l'étoile (ou on utilise l'exo 4.2) pour montrer que $L_6^R$ n'est pas régulier
2. $L_7 \cup a^\ast b^\ast = a^n b^n$ donc comme pour l'exercice 6, $L_7$ n'est pas régulier
3. On considère un automate qui accepte $L_8$ et on transforme les états pour lesquels il existe un chemin menant à un état accepteur en états accepteurs
4. Oui si $|\Sigma|=1$. Sinon on utilise encore la contraposée du lemme de l'étoile en choisissant bien le mot. On prend $\omega=a^N bb a^N$ qui permet d'obtenir une décomposition pour laquelle les $bb$ ne sont plus au milieu et c'est gagné

