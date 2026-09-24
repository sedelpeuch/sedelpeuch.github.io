---
title: Graphe - Définition générale
description: "Définitions de base de la théorie des graphes : graphes orientés et non orientés, degrés, planarité, isomorphisme, graphe partiel, sous-graphe, union et quotient."
---

## Graphes

### Graphes orientés à arcs multiples

Un **graphe orienté** est un couple $(V,E)$ où :

+ $V$ est un ensemble de sommets ;
+ $E$ est un ensemble d'arcs, chaque arc allant d'un sommet origine à un sommet extrémité (plusieurs arcs pouvant relier les mêmes sommets).

### Graphes non orientés

Un graphe **non orienté** est un couple $(V,E)$ similaire à celui défini plus
haut, mais dans lequel tout élément $e \in E$ est associé à une paire de sommets
$\{u,v\}$ de $V$ ou à un singleton $\{u\}$ de $V$. Les éléments de $E$
sont appelés les arêtes du graphe. Évidemment, tout graphe orienté induit un
unique graphe non orienté.

### Degrés et autres notions locales

Soit $G$ un graphe orienté ou non. Une **boucle** est un arc (ou une arête)
incident à un unique sommet. Un **sommet isolé** est un sommet adjacent à aucun
autre sommet. Le **degré** d'un sommet $s$, noté $deg_G(s)$, est le nombre
d'arcs ou d'arêtes incidents à ce sommet (les boucles étant comptées deux fois).
Dans le cas des graphes orientés, on peut distinguer les arcs entrants des arcs
sortants. Ainsi, le **degré entrant** d'un sommet $s$ est le nombre d'arcs entrants
en $s$. Similairement, on définit le **degré sortant**.

`Propriété 1 :` Tout graphe $G$ orienté ou non vérifie : $\sum \limits_{s \in V_G}
deg_G(s)= 2 \, card(E_G)$ (lemme des poignées de main).

### Graphe planaire et propriété

Un graphe est **planaire** s'il peut être dessiné dans le plan sans que deux arêtes se croisent. Les graphes planaires vérifient le théorème des quatre couleurs.

`Théorème des 4 couleurs :` Si un graphe est planaire, alors il est 4-coloriable : ses sommets peuvent être coloriés avec au plus 4 couleurs, deux sommets adjacents recevant des couleurs différentes.

## Une relation d'équivalence sur les graphes : l'isomorphisme

La notion de graphe est légèrement biaisée : il serait plus correct de parler de
classes de graphes isomorphes, c'est-à-dire des graphes égaux à un renommage près
des sommets et des arcs (ou arêtes).

`Définition (isomorphisme) :` Soient $(E,r)$ et $(F,s)$ deux
ensembles munis de deux relations de même arité $k$. Un
**isomorphisme** de $(E,r)$ dans $(F,s)$ est une bijection $\phi : E
\rightarrow F$ telle que pour toute séquence $(e_1,...,e_k)$ d'éléments de
$E$ on ait : $(e_1,\ldots,e_k) \in r \Leftrightarrow
(\phi(e_1),\ldots,\phi(e_k))\in s$.

## Quelques opérations sur les graphes

### Graphe partiel

On peut déterminer à partir d'un graphe $G$ et d'un ensemble d'arcs $D$ un
nouveau graphe : il suffit de conserver tous les sommets et de ne conserver que les
arcs (ou arêtes) de $D$. Ce graphe est le **graphe partiel** de $G$ engendré
par $D$. Ce graphe sera noté $G|D$.

### Sous-graphe

On peut déterminer à partir d'un graphe $G$ et d'un ensemble de sommets $U$
un nouveau graphe : il suffit de conserver pour sommets ceux de $U$ et pour
arcs (ou arêtes) seulement ceux à extrémités toutes dans $U$. Ce graphe est le
**sous-graphe** de $G$ induit par $U$ et est noté $G|U$. Formellement, cela se
traduit par $G|U=(U, \{(u,v) \in E \mid u,v \in U\})$.

### Union disjointe

L'union de deux graphes simples orientés $G:=(U,E)$ et $H:=(V,F)$
vérifiant : $U \cap V = \emptyset$ est le graphe simple orienté noté $G \cup
H$, égal à $(U \cup V, E \cup F)$.

### Graphe quotient

Soit un graphe $G=(V,E)$. Soit $P=\{P_1, \ldots, P_k\}$ une partition de $V=P_1 \cup P_2 \cup
\ldots \cup P_k$. Le graphe quotient de $G$ par $P$ est le graphe $(P,E')$
où $E'=\{(P_i,P_j) \mid \exists u \in P_i, \exists v \in P_j, (u,v) \in E\}$ : deux classes sont reliées s'il existe une arête entre un sommet de l'une et un sommet de l'autre dans $G$.
