---
title: "Graphes réguliers et couplages"
description: "Test et TP sur les graphes : graphe régulier, arêtes incidentes marquées, sommets libres et saturés, vérification et construction d'un couplage."
sidebar_position: 7
sidebar_custom_props:
  kind: td
---

## Test et TP

```python
#Test + TP
#/usr/bin/python3
# -*- coding: utf-8 -*-

#Question 1
def estRegulier(G):
    """Retourne True si le graphe G est régulier (tous les sommets sont d'un même degré), False sinon."""
    L=listeSommets(G)
    d=degre(L[0])
    for s in L:
        if degre(s)!=d:
            return False
    return True

#Question 2
def nbAretesIncidentesMarquees(s):
    """Retourne le nombre d'arêtes marquées incidentes d'un sommet s."""
    n=0
    for a in listeAretesIncidentes(s):
        if estMarqueeArete(a):
            n=n+1
    return n

#Question 3
def estLibre(s):
    """Retourne True si le sommet s est libre, c-à-d n'a aucune arête incidente marquée, False sinon."""
    if nbAretesIncidentesMarquees(s)==0:
        return True
    return False

#Question 4
def estSature(s):
    """Retourne True si le sommet s est saturé, c-à-d il a une et une seule arête incidente marquée, False sinon."""
    if nbAretesIncidentesMarquees(s)==1:
        return True
    return False

#Question 5
def estCouplage(G):
    """Retourne True si les arêtes marquées forment un couplage, c-à-d chaque sommet de G est soit libre soit saturé
    (le nombre d'arêtes incidentes marquées est au plus 1 pour tout sommet), False sinon."""
    L=listeSommets(G)
    for s in L:
        if estSature(s)==False and estLibre(s)==False:
            return False
    return True

#Question 6
def areteIncidenteDisponible(s):
    if estLibre(s)==False:
        return None
    for a in listeAretesIncidentes(s):
        if estLibre(sommetVoisin(s,a))==True:
            return a
    return None

#Question 7
def areteDisponible(G):
    for a in listeSommets(G):
        if areteIncidenteDisponible(a)!=None:
            return areteIncidenteDisponible(a)
    return None

#Question 8
def construireCouplage(G):
    toutDemarquer2(G)
    for s in listeSommets(G):
        if estLibre(s)==True:
            while areteIncidenteDisponible(s)!=None:
                marquerArete(areteIncidenteDisponible(s))
```
