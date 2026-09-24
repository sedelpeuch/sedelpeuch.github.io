---
title: Graphe - Couplage
description: "Problème du couplage maximum : chemins alternés augmentants, théorème de Berge, arbres alternés et contraction des orbites (fleurs)."
---

Cours inspiré des cours intégrés dispensés par [Nicolas
Hanusse](https://www.labri.fr/index.php?n=Annuaires.Profile&id=Hanusse_ID1084917714)
et du
[polycopié](https://moodle.bordeaux-inp.fr/pluginfile.php/51350/mod_resource/content/1/cours-graphe.pdf)
de [Denis Lapoire](https://www.labri.fr/index.php?n=Annuaires.Profile&id=Lapoire_ID1084917727).

Le problème posé à l'aviation britannique durant la bataille d'Angleterre était de former un nombre maximum de couples de pilotes parmi un ensemble de pilotes venant des quatre coins du monde. On confiait à deux pilotes les commandes d'un avion à l'unique condition qu'ils partagent une même langue. Un grand nombre de pilotes parlaient plusieurs langues.

Ce problème se formalise aisément en un problème de graphes, qui a pour nom le problème du couplage maximum.

## Définition

Les graphes que nous considérerons dans ce chapitre sont non orientés. Afin de simplifier l'étude, nous pourrons supposer qu'ils sont dépourvus de boucle.

Un `couplage` d'un graphe non orienté est un ensemble d'arêtes 2 à 2 non adjacentes et qui ne soient pas des boucles. Un sommet est saturé dans un couplage $D$ s'il est incident à l'une des arêtes de $D$. Un couplage est :

- maximum s'il est de cardinalité maximale parmi tous les couplages ;
- parfait si tout sommet est saturé.

Le problème du couplage maximum peut ainsi être formalisé.

## Première caractérisation d'un couplage maximum

Une condition suffisante pour qu'un couplage ne soit pas maximum est l'existence de deux sommets insaturés adjacents, voire l'existence de deux sommets insaturés reliés par un chemin alternant des arêtes du couplage et des arêtes n'appartenant pas à ce couplage. Une propriété remarquable des couplages est que cette condition est non seulement suffisante mais aussi nécessaire. Cette section est consacrée à cette caractérisation.

Un `chemin alterné` $w$ relativement à un couplage $K$ d'un graphe $G$ est un chemin élémentaire à extrémités distinctes tel que pour toute arête $e$ de $w$ et pour toute arête $f$ succédant immédiatement $e$ sur $w$ on ait $e \in K \Leftrightarrow f \notin K$. Un chemin alterné est augmentant relativement à $K$ si ses deux extrémités sont insaturées par $K$.

La différence symétrique $(A-B) \cup (B-A)$ de deux ensembles $A$ et $B$ est notée $A \Delta B$.

Soit $w$ un chemin alterné relativement à un couplage $K$ d'un graphe $G$. Si chaque extrémité de $w$ est soit insaturée, soit incidente à une arête de $K$ appartenant à $w$, alors $K \Delta E(w)$ est un couplage de $G$.

Si $K$ et $K'$ sont deux couplages d'un graphe $G$, alors chaque composante connexe du graphe partiel engendré par $K \Delta K'$ est de l'un des trois types suivants :

1. un sommet isolé ;
2. un cycle élémentaire pair à arêtes alternativement dans $K$ et $K'$ ;
3. un chemin élémentaire à arêtes alternativement dans $K$ et $K'$.

`Théorème (Berge) :` Pour tout couplage $K$ d'un graphe $G$, les deux assertions suivantes sont équivalentes :

1. $K$ est maximum ;
2. il n'existe aucun chemin alterné augmentant relativement à $K$.

## Caractérisation algorithmique

La solution algorithmique requiert la définition de ce qu'est un arbre alterné, extension aux arbres de la notion d'alternance définie sur les chemins.

Un `arbre alterné` selon un graphe $G=(V,E)$ et un couplage $K$ de $G$ est un triplet $T=(U,D,r)$ tel que :

- $(U,D)$ est un arbre qui est sous-graphe de $G$ ;
- $r$ est un sommet de $U$ appelé sa racine, et est insaturé selon $K$ ;
- toute feuille de $T$ est paire, c'est-à-dire à distance paire de $r$ ;
- tout sommet pair de $T$ autre que la racine est adjacent à son père (impair) selon une arête de $D \cap K$.

Afin de simplifier les énoncés, un graphe $(G,K)$ muni d'un de ses couplages sera appelé un graphe couplé, un graphe $(G,K,T)$ muni d'un de ses couplages et d'un arbre alterné sera appelé un graphe couplé arboré.

Pour résoudre le problème Couplage maximum, on utilise deux fonctions auxiliaires CMC et CMCA résolvant les deux problèmes suivants :

```text
Couplage Maximum d'un graphe couplé
Entrée : un graphe couplé (G,J)
Sortie : un couplage maximum K de G tel que K != J => |K| > |J|

Couplage Maximum d'un graphe couplé arboré
Entrée : un graphe couplé arboré (G,J,T)
Sortie : un couplage maximum K de G tel que K != J => |K| > |J|
```

Le lien entre ces problèmes est immédiat :

- une définition de CM résolvant Couplage Maximum est simplement :

```text
fonction CM(G:graphe):couplage
  retourner CMC(G, ∅)
```

- une définition de CMC résolvant Couplage Maximum d'un graphe couplé est simplement :

```text
fonction CMC((G,K):graphe couplé):couplage
  si il existe au plus un sommet insaturé selon K
    retourner K
  sinon
    r = insaturé(G,K)
    T = arbreAlterné1Sommet(r)
    retourner CMCA(G,K,T)
```

L'écriture de CMCA nécessite quelques notations et définitions préalables.

Le graphe obtenu à partir d'un graphe $G$ en fusionnant une partie de sommets $Y \subseteq V_G$ en un seul sommet est noté dans cette section $G / Y$. On suppose en outre que les boucles sont supprimées.

Le sous-graphe d'un graphe $G$ induit par un ensemble de sommets $U \subseteq V_G$ est noté $G|U$. L'expression $G-U$ dénote le sous-graphe $G|(V-U)$.

Une `orbite` d'un graphe couplé arboré $(G,K,T)$ est une arête $e$ incidente à deux sommets pairs de $T$. Soit $C$ l'ensemble des sommets de l'unique cycle élémentaire du graphe $T$ augmenté de l'arête $e$. Nous noterons :

- $G^e$ le graphe obtenu à partir de $G$ en fusionnant tous les sommets de $C$ (c'est-à-dire $G / C$) ;
- $K^e$ le couplage obtenu à partir de $K$ en supprimant toutes les arêtes dont les deux extrémités appartiennent à $C$. Clairement, $K^e$ est un couplage de $G^e$ ;
- $T^e$ l'arbre obtenu à partir de $T$ en fusionnant tous les sommets de $C$ (c'est-à-dire $T / C$). Clairement, $T^e$ est un arbre alterné de $(G^e,K^e)$.

La suite du cours (définition de CMCA, qui contracte les orbites jusqu'à trouver un chemin augmentant, principe de l'algorithme d'Edmonds) n'a pas été reprise dans ces notes.
