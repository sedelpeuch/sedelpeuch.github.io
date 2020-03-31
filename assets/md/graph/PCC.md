---
layout: page
hide: true
title: <i class="fas fa-project-diagram fa-2x"></i> Graphe - Plus Court Chemin
---

<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

Cours inspiré des cours intégrés dispensés par [Nicolas
Hanusse](https://www.labri.fr/index.php?n=Annuaires.Profile&id=Hanusse_ID1084917714)
et du
[polycopié](https://moodle.bordeaux-inp.fr/pluginfile.php/51350/mod_resource/content/1/cours-graphe.pdf)
de [Denis Lapoire](https://www.labri.fr/index.php?n=Annuaires.Profile&id=Lapoire_ID1084917727)

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

Le problème du plus court chemin considéré ici porte sur des graphes orientés à
arcs pondérés. Le plus court chemin d'un sommet $$s$$ à un sommet $$t$$ est
alorsun chemin de $$s$$ à $$t$$, la somme des poids des arcs qu'il contient, est
minimale. 

## <i class="fas fa-project-diagram"></i> Bellman-Ford
 Le premier algorithme étudié est une algorithme que garantit que pour tout
chemin $$(s_1,...,s_l)$$ avec $$l \leq n$$ les arcs
$$(s_1,s_2),...,(s_{l-1},s_l)$$ seront relachés dans cet ordre. L'intéret de cet
algorithme est double
+ sa définition est très simple 
+ il retourne un résultat correct pour des graphes possédant des arcs de poids
  négatifs
+ il détecte un cycle de poids négatif si il en existe

![bellman-ford]

[bellman-ford]:/assets/images/graphe/bellman-ford.gif
{:class="image featured"}
```
fonction Bellman-Ford(G : graphe à arcs pondérés, s : sommet de G) : (booléen, tableau V_G -> R, tableau V_G -> V_G)
    (d,pere) = relacherInit(G,s)
    
    faire |V_G| - 1 fois
        pour chaque arc (u,v) de G
            relacher(u,v,G,d,pere)
    retourner (d,pere)
    
procédure relacher(u:sommet, v:sommet, G:graphe à arcs pondérés, d: tableau, V_G -> R, père : tableau V_G -> V_G)
    si d(v) > d(u) + poids(u,v)
        d[v] = d(u) + poids(u,v)
        père[v] = u
```

## <i class="fas fa-project-diagram"></i> Dijkstra
![dijkstra] Le second algorithme étudié a pour principales propriétés 
+ sa correction établie que pour des graphes sans arcs de poids négatif
+ la simplicité de sa définition
+ une faible complexité en temps

[dijkstra]:/assets/images/graphe/dijkstra.gif
{:class="image about right"}

```
fonction Dijkstra(G: graphe à arcs pondérés, s: sommet):(fonction V_G -> R, fonction V_G -> V_G)
    (d,père) = relacherInit(G,s)
    Y = V_G
    
    tant que Y n'est pas l'ensemble vide faire
        extraire un élément u de Y de valeur d minimale
        pour chaque successeur v de u faire
            si v appartient à Y faire
                relacher(u,v,G,d,père)
    retourner(d,père)

procédure relacherInit(G: graphe à arcs pondérés, s: sommet):(tableau V_G -> R, tableau V_G -> V_G)
    d = tableau indicé par V_G initialisé à l'infini
    père = tableau indicé par V_G initialisé à NULL
    d[s] = 0
    retourner (d,père)
```
