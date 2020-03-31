---
layout: page
hide: true
title: <i class="fas fa-project-diagram fa-2x"></i> Graphe - Algorithmes de Parcours
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

Pour la plupart des problèmes sur des graphes, toute solution algorithmique doit
visiter chacun des sommets et/ou chacun des arcs du graphe considéré, c'est à
dire prendre en compte ses propriétés locales : quels sot ses sommets adjacents,
quelles sont ses arêtes ou arcs incident, quels sont les étiquettes ou éventuels
poids etc.

Pour définir algorithmiquement un parcours, on utilise comme pour les arbres,
une file (notée ici GRIS). A tout instant de l'algorithme, l'ensemble des
sommets est partitionnée en trois ensemble disjoints BLANC, GRIS, NOIR dont
l'union forme l'ensemble des sommes de G et dont la sémantique est la suivante
+ BLANC est l'ensemble des sommets non visités
+ NOIR est l'ensemble des sommets visités et dont on sait que tous les arcs
  sortants ont été visités; ainsi donc que leurs sommets extrémités
+ GRIS les autres sommets

## <i class="fas fa-project-diagram"></i> Parcours en Largeur
![BFS]
Le premier choix pour implémenter l'ensemble GRIS est d'utiliser une file.
L'algorithme qui en découle est appelé un parcours en Largeur. La raison de ce
nom est liée à l'ordre dans lequel les sommets sont visités à partir du premier
sommet $$s$$ : les premiers sommets visitées sont les sommets à distance 1 du
sommet $$s_1$$, puis ceux à distance 2 et ainsi de suite. En conséquence,
l'arborescence de liaison retournée fournit un ensemble de plus court-chemins du
sommet $$s$$ aux sommets accessibles à partir de $$s$$. Voici l'algorithme de
parcours vu dans le chapitre précédennt moidifié uniquement par le triatmenet de
l'ensemble GRIS comme une file. 

[BFS]:/assets/images/graphe/BFS.gif
{:class="image about right"}

```
procédure parcoursLargeur(G: graphe, s: sommet)
    n = nbrSommets(G)
    couleur = constructTableau(n,'blanc')
    pere = constructTableau(n,0)
    GRIS = fileVide()
    couleur[s] = gris
    enfiler(s,GRIS)
    
    tant que non(estVide(GRIS)) faire
        u = défiler(GRIS)
        pour tout arc e sortant de u faire
            v = 2ndeExtrémité(e)
            si couleur[v]='blanc' alors
                couleur[v] = 'gris'
                enfiler(v,GRIS)
                pere[v]=u
        couleur[u] = noir
```

## <i class="fas fa-project-diagram"></i> Parcours en Profondeur
![DFS]
A la différence du parcours en largeur où l'on découvrait tous les successeurs
blancs du sommet colorié le plus tardivement en gris, lors du parcours en
profondeur le sommet gris dont on découvre les successeurs blancs est le sommet
le plus récemment colorié en gris : en d'autres termes, on implémente l'ensemble
GRIS à l'aide d'une pile. A l'image du parcours en profondeur dans les arbres
binaires, la définition la plus simple d'un parcours en profondeur est
assurément récursive. La pile GRIS mentionnée est alors cachée par la pile
d'appel utilisée lors de ces appels récursifs. 

[DFS]:/assets/images/graphe/DFS.gif
{:class="image about right"}

```
procédure parcoursProfondeur(G:graphe)
    temps = 0
    n =  nbrSommets(G)
    coleur = constructTableau(n,'blanc')
    pere = constructTableau(n,0)
    d = constructTableau(n,0)
    f = constructTableau(n,0)
    
    pour chaque sommet u faire
        si couleur(u) = 'blanc' alors
            explorer(G,u)

procédure explorer(G: graphe,u: sommet)
    couleur[u] = gris
    d[u] = ++ temps
    
    pour chaque arc e sortant de u faire
        v = 2ndeExtrémité(e)
        si couleur[v]='blanc' alors
            pere[v] = u
            explorer(G,v)
    couleur[u] = 'noir'
    f[u] = ++temps
```

### Première application : reconnaissance de graphes acycliques
On s'intéresse ici à déceler la présence de cycles c'est à dire plus précisément
de cycles simples ayant au moins un arc. L'algorithme décidant si un graphe est
sans cycle est une variante imméduate du parcours en profondeur. Sa correction
est basée sur les deux assertions suivantes qui sont équivalentes
+ $$G$$ contient un cycle simple
+ tout parcours en profondeur de $$G$$ induit un arc de retour

### Deuxième application : tri topologique
Comment numéroter des sommets de façon à ce que tout arc $$(s,t)$$, $$s$$ ait un
plus petit numéro de que $$t$$

`Définition :` Un **tri topologique** d'un graphe orienté $$G$$ est une
numérotation $$\phi$$ des sommets de $$G$$ tels que pour tous sommets $$s$$ et
$$t$$ on ait : $$(s,t) \in E_G \Rightarrow \phi(s) < \phi(t)$$

Clairement tout graphe n'admet pas un tri topologique. Propriété remarquabe, la
possession d'un tel tri est une caractérisation de l'acyclité.

<div class="header">
  <div class="progress-container">
    <div class="progress-bar" id="myBar"></div>
  </div>
</div>

<style>
/* Style the header: fixed position (always stay at the top) */
.header {
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  background-color: #f1f1f1;
}

/* The progress container (grey background) */
.progress-container {
  width: 100%;
  height: 8px;
  background: #ccc;
}

/* The progress bar (scroll indicator) */
.progress-bar {
  height: 8px;
  background: #707070;
  width: 0%;
}
</style>

<script>
// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}
</script>
