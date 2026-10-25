---
title: "Premiers pas avec les graphes : couleurs et degrés"
description: "TD machine sur les graphes avec la bibliothèque bibgraphes : coloriage des sommets, comptage par couleur, voisins communs, degrés minimal et maximal, nombre d'arêtes et sommets isolés."
sidebar_position: 4
sidebar_custom_props:
  kind: td
---

## Chargement des graphes

```python
from bibgraphes import *
from palette import *
europe=ouvrirGraphe("europe.dot")
petersen=ouvrirGraphe("petersen.dot")
fr=sommetNom(europe,'France')
pr=sommetNom(europe,'Portugal')
esp=sommetNom(europe,'Espagne')
sue=sommetNom(europe,'Suede')
nor=sommetNom(europe,'Norvege')
ger=sommetNom(europe,'Allemagne')
slo=sommetNom(europe,'Slovaquie')
ir=sommetNom(europe,'Irlande')
```

## Couleurs des sommets

```python
#Question 2.1
def toutColorier(G,c):
    L=listeSommets(G)
    for i in range(nbSommets(G)):
        s=L[i]
        colorierSommet(s,c)
    return G

#Question 2.2
def existeCouleur(G,c):
    L=listeSommets(G)
    for i in range(nbSommets(G)):
        s=L[i]
        if couleurSommet(s)==c:
            return True
    return False

#Question 2.3
def toutCouleur(G,c):
    L=listeSommets(G)
    for i in range(nbSommets(G)):
        s=L[i]
        if couleurSommet(s)!=c:
            return False
    return True

#Question 2.4
def toutLaMemeCouleur(G):
    L=listeSommets(G)
    c=couleurSommet(L[0])
    for i in range(nbSommets(G)):
        s=L[i]
        if couleurSommet(s)!=c:
            return False
    return True

#Question 2.5
def nbSommetsCouleur(G,c):
    n=0
    L=listeSommets(G)
    for i in range(nbSommets(G)):
        if couleurSommet(L[i])==c:
            n=n+1
    return n

#Question 2.6
def nbSommetsColores(G):
    n=0
    for i in listeSommets(G):
        if couleurSommet(i)!=('white'):
            n=n+1
    return n
```

## Voisins et degrés

```python
#Question 3.1
def sontVoisins(s1,s2):
    for i in listeVoisins(s1):
        if i==s2:
            return True
    return False

#Question 3.2
def listeVoisinsCommuns(s1,s2):
    L=[]
    for i in listeVoisins(s1):
        for j in listeVoisins(s2):
            if i==j:
                L.append(i)
    return (L)

#Question 3.3
def degreMax(G):
    dg=0
    for i in listeSommets(G):
        if dg<degre(i):
            dg=degre(i)
    return dg

def degreMin(G):
    dg=nbSommets(G)
    for i in listeSommets(G):
        if dg>degre(i):
            dg=degre(i)
    return dg

#Question 3.4
def nbSommetsDegre(G,d):
    n=0
    for i in listeSommets(G):
        if degre(i)==d:
            n=n+1
    return n

#Question 3.5 somme des degres = 2 fois le nombre d'arêtes
def nbAretes(G):
    d=0
    for i in listeSommets(G):
        d=d+degre(i)
    return d//2

#Question 3.6
def existeIsole(G):
    return degreMin(G)==0
```
