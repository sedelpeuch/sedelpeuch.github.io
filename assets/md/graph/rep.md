---
layout: page
hide: true
title: <i class="fas fa-project-diagram fa-2x"></i> Graphe - Représentation des graphes
cover-photo: /assets/images/banner-test-2.jpg
cover-photo-alt: banner
---

<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

Cours inspiré des cours intégrés dispensés par [Nicolas
Hanusse](https://www.labri.fr/index.php?n=Annuaires.Profile&id=Hanusse_ID1084917714)
et du
[polycopié](https://moodle.bordeaux-inp.fr/pluginfile.php/51350/mod_resource/content/1/cours-graphe.pdf)
de [Denis Lapoire](https://www.labri.fr/index.php?n=Annuaires.Profile&id=Lapoire_ID1084917727)

Les graphes considéres ici auront pour ensemble de sommets des intervalles de la
forme $$[1,n]$$ avec $$n \geq 0$$, et dans e cas de graphes à arcs ou arêtes
multiples auront pour ensembles d'arcs ou arêtes des intervalles de la forme
$$[1,m]$$ avec $$m \geq 0$$

Les deux représentations ont ceci en commun qu'elles permettent d'associer à
chaque sommet $$s$$ l'ensemble $$T[s]$$ des arcs sortants de ce sommet. Ainsi,
on peut décider de représetner cet ensemble d'arcs 
+ par une liste chainée. La représentation est celle de tableaux de liste
+ par un tableau de booléen indiquant quels sont les sommets deuxièmes
  extrémites de ces arcs. La représetnation est celle de la matrice d'adjacence.

## <i class="fas fa-project-diagram"></i> Représentation par tableaux de listes
L’idée est de représenter un graphe par un tableau qui associe à chaque sommet
une liste (chaînée) des arcs sortants ou des arêtes incidentes. Un graphe
orienté simple $$([1, n], E)$$ peut être représenté par un tableau T à indices
dans $$[1, n]$$ et à valeurs des listes de sommets. Un tel tableau doit vérifier
pour tout couple de sommets $$(i, j) : j \in T[i] \Leftrightarrow (i, j) \in E$$
On suppose souvent dans une telle représentation que de telles listes sont sans
répétition.

### Avantages
+ L’espace mémoire est linéaire en la cardinalité du nombre de sommets et du nombre
d’arêtes : $$Θ(n + m)$$ (ce qui suppose les listes sans répétition).

### Inconvénients
+ Ce n’est pas un codage : un graphe peut être représenté de façons différentes.
+ Tester l’adjacence de deux somme

## <i class="fas fa-project-diagram"></i> Représentation par matrice d'adjacence
Cette représentation concerne les graphes dans lesuels seuls les sommets snt
nommées. Tout graphe orienté simple $$([1,n],E)$$ peut être représenté par sa
**matrice d'adjacence** c'està dire la matrice $$M$$ de booléens de taille $$n
\times n$$ définie par $$M[i,j]:=((i,j)\in E)$$

### Avantages 
+ Cette représentation est un **codage** : tout graphe admet une unique
  représentation.
+ Tester si un sommet est prédécesseur d'un second est réalisé en temps constant

### Inconvénients
+ La taille de la représentation est élevée : $$O(n \times n)$$. Un graphe peu
  dense à la même représentation qu'un graphe dense.
  
## <i class="fas fa-project-diagram"></i> Conclusion
De la même façon que le type de graphe à choisir dépend du poblème à résoudre,
la représentation de ce graphe dépend de la solution algorithmique retenue. Le
recensement complet des primitives utilisées dans lalgorithme dans l'objectif
d'avoir un algorithme efficace détermine le bon choix de cette représentation !
