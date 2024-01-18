---
title: Graphe - Arbre Couvrant Minimal
---

Un **arbre couvrant** d'un graphe $G:=(V,E)$ est un ensemble d'arêtes $D
\subseteq E$ pour lequel $(V,D)$ est un arbre. Si l'on suppose que le graphe
est **pondéré**, c'est à dire est muni d'une fonction $p$ qui associe à toute
arête un réel positif appelé son **poids**, un arbre couvrant $D$ est dit
$minimal$ si son **poids**, $p(D)=\sum \limits_{d \in D} p(d)$, est au plus
égal au poids de tout arbre couvrant. Le problème de l'arbre couvrant minimal
(ACM) est alors

```
ACM
ENTREE : un graphe G non orienté connexe
SORTIE : un arbre convrant minimal de G
```

La résolution de ce problème repose sur la définition suivante

`Définition :` Une **coupure** d'un graphe $G$ est un couple partitionnant
l'ensemble des sommets, c'est à dire un couple de la forme $(P,V_G-P)$ avec
$P \subseteq V_G$. Une arête $e \in E_G$ **traverse** la coupure
$(P,V_G-P)$ si l'un des extrémités est dans $P$ et l'autre non. Une coupure
**respecte** un ensemble d'arêtes $D \subseteq E_G$ si aucune arête $e \in
D$ ne traverse la coupure.

```c
fonction Acm(G:graphe):ensemble d'aretes
    retourner AcmRecursif(G,0)
    
fonction AcmRecurif(G:graphe, D:ensemble d'aretes): ensemble d'aretes
    si D est un arbre courvrant de G
        retourner D
    sinon
        choisir une coupure (P,V_G-P) respectant D et une arete e de poids minimal traversant (P,V_G-P)
        retourner AcmRecursif(G,D u {e})
```

## <i class="fas fa-project-diagram"></i> Algorithme Krustal

![krustal] L'implémentation de l'ACM itératif par Krustal consiste à choisir une arête de
poids minimal parmi toutes celles qui traversent une coupe respectant les arêtes
déjà choisies, c'est à dire choisir une arête qui ne crée pas un cycle dans la
solution courante.

[krustal]:./img/krustal.gif

```c
fonction Acm-Krustal(G:graphe):ensemble d'arêtes
    trier l'ensemble des arêtes E_G par poids croissant
    D = 0
    
    pour chaque arête e pris par poids croissant
        si D u {e} est acyclique alors
            D = D u {e}
    retourner D
```

## <i class="fas fa-project-diagram"></i> Algorithme Prim

![prim] L'algorithme **Prim** construit une coupure $(V-P,P)$ et un ensemble $D$ de
telles sorte qu'à chaque instant l'ensemble acyclique $D$ connecte les sommets
de $V-P$ en un arbre et laisse chacun des sommets de $P$ isolés. L'arbre
couvrant minimal de $G$ sera représenté à l'aide d'une fonction père qui
associe à tout sommet, sauf un (la racine), un sommet. Pour choisir rapidement
une arête traversant $(V-P,P)$ de poids minimal on fait en sorte qu'à chaque
instant

+ l'arête ${pere(x),x}$ soit une arête de poids minimal à traverser la coupe
  $(V-P,P)$
+ on connaisse le poids de cette arête. C'est l'objet de la fonction clé(x)

[prim]:./img/prim.gif

```
fonction Acm-Prim(G:graphe pondéré): fonction V_G -> V_G
    clé = tableau indicé par V_G initialisé à l'infini
    père = tableau indicé par V_G initialisé à NULL
    P = V_G
    choisir un sommet r dans V_G
    clé[r] = 0
    
    tant que non(estVide(P)) faire
        extraire de P un élément x de clé minimale
        pour chaque voisin y de x faire
            si y dans P et poid(x,y) < clé(y) alors
                clé[v] = poid(x,y)
                père[y] = x
    retourner père
```

