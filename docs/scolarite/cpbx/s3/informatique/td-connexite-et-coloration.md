---
title: "Connexité, chemins et 2-coloration"
description: "TD machine sur les graphes : marquage des sommets accessibles, connexité, nombre de composantes connexes, recherche d'un chemin et 2-coloration."
sidebar_position: 5
sidebar_custom_props:
  kind: td
---

## Connexité

```python
#TD 6 - Encore des graphes
#Connexité
#Question 1.1
def toutDemarquer(G):
    for i in listeSommets(G):
        demarquerSommet(i)

def sommetAccessible(G):
    for i in listeSommets(G):
        if estMarqueSommet(i)==False:
            for j in listeVoisins(i):
                if estMarqueSommet(j):
                    return i
    return None

def marquerAccessibles(G,s):
    marquerSommet(s)
    while sommetAccessible2(G)!=None:
        marquerSommet(sommetAccessible2(G))

#Question 1.2
def sommetsTousMarques(G):
    for i in listeSommets(G):
        if estMarqueSommet(i)==False:
            return False
    return True

def estConnexe(G):
    toutDemarquer(G)
    L=listeSommets(G)
    s=L[0]
    marquerAccessibles(G,s)
    return sommetsTousMarques(G)

#Question 1.3
def nbComposantesConnexes(G):
    toutDemarquer(G)
    n=0
    for s in listeSommets(G):
        if estMarqueSommet(s)==False:
            marquerSommet(s)
            marquerAccessibles(G,s)
            n=n+1
    return n

#Question 1.4
def estAccessibleDepuis(G,s,t):
    marquerAccessibles(G,s)
    return estMarqueSommet(t)
```

## Marquage des arêtes et chemins

```python
#Question 1.5
def toutDemarquer2(G):
    for s in listeSommets(G):
        demarquerSommet(s)
        for a in listeAretesIncidentes(s):
            demarquerArete(a)

def sommetAccessible2(G):
    for s in listeSommets(G):
        if estMarqueSommet(s):
            for a in listeAretesIncidentes(s):
                t=sommetVoisin(s,a)
                if estMarqueSommet(t)==False:
                    marquerArete(a)
                    return t
#Trace plein de chemin au pif

#Question 1.6
def chemin(G,s,t):
    toutDemarquer2(G)
    return dessinerChemin(G,s,t)

def dessinerChemin(G,s,t):
    L=[s]
    marquerSommet(s)
    if s==t:
        return [s]
    for v in listeVoisins(s):
        if estMarqueSommet(v)==False:
            x= dessinerChemin(G,v,t)
            if x!=None:
                return L+x
    return None
```

## 2-coloration

```python
#Question 2.1
def bienColorie(G):
    for s in listeSommets(G):
        for a in listeAretesIncidentes(s):
            v=sommetVoisin(s,a)
            if couleurSommet(v)==couleurSommet(s):
                return False
    return True

#Question 2.2
#1
def effacerCouleurs(G):
    for s in listeSommets(G):
        colorierSommet(s,'white')

#2
def sommetColoriable(G):
    for s in listeSommets(G):
        for a in listeAretesIncidentes(s):
            v=sommetVoisin(s,a)
            if couleurSommet(s)=='white':
                if couleurSommet(v)!='white':
                    return s
    return None

#3
def monoCouleurVoisins(s):
    for t in listeVoisins(s):
        if couleurSommet(t)!='white':
            c=couleurSommet(t)
    for t in listeVoisins(s):
        if couleurSommet(t)!='white':
            c2=couleurSommet(t)
            if c2!=c:
                return None
    return c

#4
def deuxColoration(G,c1,c2):
    effacerCouleurs(G)
    L=listeSommets(G)
    colorierSommet(L[0],c1)
    s=sommetColoriable(G)
    while s!=None:
        c=monoCouleurVoisins(s)
        if c==None:
            return None
        if c==c1:
            colorierSommet(s,c2)
        else:
            colorierSommet(s,c1)
        s=sommetColoriable(G)
    return G
```
