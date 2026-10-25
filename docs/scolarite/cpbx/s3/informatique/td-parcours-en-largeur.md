---
title: "Parcours en largeur"
description: "TD machine sur l'exploration de graphes : parcours en largeur par coloriage puis par marquage, calcul des distances et des pères, coloriage par palette selon la distance."
sidebar_position: 6
sidebar_custom_props:
  kind: td
---

## Parcours en largeur par coloriage

```python
#Algorithmes d'exploration de graphes
#Question 1.1
def parcoursEnLargeur(G,s):
    effacerCouleurs(G)
    distance={}
    père={}
    F=[s]
    colorierSommet(s,'grey')
    distance[s]=0
    père[s]="NIL"
    #ligne 5 à 9 inutiles
    while F!=[]:
        v=F[0]
        for w in listeVoisins(v):
            if couleurSommet(w)=='white':
                colorierSommet(w,'grey')
                distance[w]=distance[v]+1
                père[w]=v
                F=F+[w]
        del F[0]
        colorierSommet(v,'black')
```

## Parcours en largeur par marquage

```python
def parcoursEnLargeur2(G,s):
    toutDemarquer(G)
    distance={}
    pere={}
    F=[s]
    marquerSommet(s)
    distance[s]=0
    pere[s]="NIL"
    while F!=[]:
        v=F[0]
        for w in listeVoisins(v):
            if not estMarqueSommet(w):
                marquerSommet(w)
                distance[w]=distance[v]+1
                pere[w]=v
                F=F+[w]
        del F[0]
        colorierSommet(v,'black')
```

## Coloriage selon la distance

```python
def colorierParPalette(G,s,p):
    toutDemarquer(G)
    distance={}
    F=[s]
    marquerSommet(s)
    colorierSommet(s,p[0])
    distance[s]=0
    while F!=[]:
        v=F[0]
        for w in listeVoisins(v):
            if not estMarqueSommet(w):
                marquerSommet(w)
                distance[w]=distance[v]+1
                colorierSommet(w,p[distance[w]])
                F=F+[w]
        del F[0]
```

## Parcours en largeur avec marquage des arêtes

```python
def ParcoursEnLargeur3(G,s):
    toutDemarquer(G)
    distance={}
    pere={}
    F=[s]
    marquerSommet(s)
    distance[s]=0
    pere[s]="NIL"
    while F!=[]:
        v=F[0]
        for i in listeAretesIncidentes(v):
            w=sommetVoisin(v,i)
            if not estMarqueSommet(w):
                marquerSommet(w)
                marquerArete(i)
                distance[w]=distance[v]+1
                pere[w]=v
                F=F+[w]
        del F[0]
```
