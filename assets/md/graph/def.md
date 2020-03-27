---
layout: page
hide: true
title: Graphe - Définition Générale
---
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

Cours inspiré des cours intégrés dispensés par [Nicolas
Hanusse](https://www.labri.fr/index.php?n=Annuaires.Profile&id=Hanusse_ID1084917714)
et du
[polycopié](https://moodle.bordeaux-inp.fr/pluginfile.php/51350/mod_resource/content/1/cours-graphe.pdf)
de [Denis Lapoire](https://www.labri.fr/index.php?n=Annuaires.Profile&id=Lapoire_ID1084917727)
## Graphes
### Graphes orientés à arcs multiples
Un **graphe orienté** est un double $$(V,E)$$ d'où:
+ $$V$$, est un ensemble de sommets
+ $$E$$, est un ensemble d'arcs

### Graphes non orientés
Un graphe **non orienté** est un double $$(V,E)$$ similaire à celui défni plus
haut mais dans lequel tout élément $$e \in E$$ est associé une paire de sommets
$$\{u,v\}$$ de $$V$$ ou à un signleton $$\{u\}$$ de $$V$$. Les éléments de $$E$$
sont appelés les arêtes du graphes. Evidemment, tout graphe orienté induit un
unique graphe non orienté.

### Degrés et autres notions locales
Soit $$G$$ un graphe orienté ou non. Une **boucle** est un arc (ou une arête)
incident à un unique sommet. Un **sommet isolé** est un sommet adjacent à aucun
autre sommet. Le **degré** d'un sommet $$s$$, noté $$deg_G(s)$$, est le nombre
d'arcs ou d'arêtes icidents à ce sommet (les boucles étant comptées double).
Dans le cas des graphes orientés on peut distinguer les arcs entrants de ceux
sortants. Ainsi le **degré entrant** d'un sommet $$s$$ est le nom d'ars entrants
de $$s$$. Similairement, on définit le **degré sortant**

`Propriété 1 :` Tout graphe $$G$$ orienté ou non vérifie : $$\sum \limits_{a \in V_a}
deg_G(s)= 2 card(E_G)$$.

### Graphe planaire et propriété
Un graphe est **planaire** si il peut être représenté sans intersection. En
découle le théorème des 4 couleurs. 

`Théorème des 4 couleurs :` Si un graphe est planaire alors il est au moins 4 coloriable.

---
## Une relation d'équivalence sur les graphes : l'isomorphisme 
La notion de graphe est légerement biaisée, il serait plus correcte de parler de
classe de graphes isomorphes, c'est à dire des graphes égaux à un renommage près
des sommets et des arcs (ou arêtes).

`Définition Isomorphisme :` Soient deux ensembles $$(E,r)$$ et $$(F,s)$$ deux
ensembles munis de deux relations d'arité commune quelque entier $$k$$. Un
**isomorphisme** de $$(E,r)$$ dans $$(F,s)$$, est une bijection $$\phi : E
\rightarrow F$$ telle que pour tout séquence $$(e_1,...,e_k)$$ d'éléments de
$$E$$ on ait : $$(e_1,...,e_k) \in r \Leftrightarrow
(\phi(e_1),...,\phi(e_k))\in s$$

---
## Quelques opérations sur les graphes
### Graphe partiel 
On peut déterminer à partir d'un graphe $$G$$ et d'un ensemble d'arcs $$D$$ un
nouveau graphe : il suffit de conserver tous les sommets et ne conserver que les
arcs (ou arêtes) de $$D$$. Ce graphe est le **graphe partiel** de $$G$$ engendré
par $$D$$. Ce graphe sera noté $$G|D$$.

### Sous-graphe
On peut déterminer à partir d'un graphe $$G$$ et d'un ensemble de sommets $$U$$
un nouveau graphe : il suffit de conserver pour sommets ceux de $$U$$ et pour
arcs (ou arêtes) seulement ceux à extrémités toutes dans $$U$$. Ce graphe est le
**sous-graphe** de $$G$$ induit par $$U$$ est noté $$G|U$$. Formellement cela se
traduit par $$G_H=\{(u,v) \in G | u,v \in V_H\}$$

### Union disjointe 
L'union de deux graphes simples orientés $$G:=(U,E)$$ et $$H:=(V,F)$$
vérifiant : $$U \cap V = \emptyset$$ est le graphe simple orienté note $$G \cup
H$$ égal à $$(U \cup V, E \cup F)$$

### Graphe quotient
Soit un graphe $$G=(V,E)$$. Soit $$P$$ une partition de $$V=P_1 \cup P_2 \cup
... \cup P_k$$. Le graphe quotient de $$G$$ par $$P$$ est le graphe $$(P,E')$$
où $$E'=\{(u,v), u \in P_i, v \in P_j, \text{tel qu'il existe une arête entre le sommet
} \; P_i \; \text{et le sommet de} \; P_j \; \text{dans} \; G\}$$ 
