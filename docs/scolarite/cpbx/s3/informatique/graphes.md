---
title: "Les graphes"
description: "Définitions de base sur les graphes : sommets, arêtes, boucles, arêtes parallèles, degré, chaîne, connexité, composantes connexes, cycle et arbre."
sidebar_position: 2
---

**Généralités.** Un graphe $G = (V, E)$, où $V$ est l'ensemble des sommets et $E$ l'ensemble des arêtes, est tel que chaque arête relie deux sommets. Une arête reliant un sommet à lui-même est une boucle. Deux arêtes sont parallèles si ce sont des arêtes reliant les mêmes sommets.

Si $e$ relie $u$ et $v$, on dit que $e = uv$ est incidente à $u$ et $v$ ; $u$ et $v$ sont voisins ou adjacents, $u$ et $v$ sont les extrémités de $e$.

**Définition : degré.** Le degré d'un sommet $u$ est le nombre d'incidences auxquelles il participe. Dans un graphe simple, c'est le nombre d'arêtes incidentes différentes, ou de voisins différents.

**Définition : chaîne.** Une chaîne reliant $u$ et $v$ dans un graphe $G$ est une suite $u = u_0, e_1, u_1, \dots, e_k, u_k = v$ telle que $\forall i = 1 \dots k$, $e_i = u_{i-1}u_i \in E(G)$.

**Définition : connexe.** Un graphe est connexe si pour tous sommets $u, v$ il existe une chaîne les reliant.

Un graphe non connexe se décompose en composantes connexes, qui sont les sous-graphes connexes maximaux.

**Remarque.** La somme des degrés est égale à deux fois le nombre d'arêtes :

$$
\sum_{v \in V} \deg(v) = 2\,|E(G)|
$$

d'où la somme des degrés est toujours paire, et le nombre de sommets de degré impair est pair.

**Définition : cycle.** Un cycle est une suite d'arêtes reliant un sommet à lui-même sans passer deux fois par le même sommet ou la même arête.

**Définition : arbre.** Un arbre est un graphe connexe et sans cycle.
