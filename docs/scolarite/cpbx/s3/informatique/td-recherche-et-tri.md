---
title: "Recherche dichotomique et tris"
description: "TD machine : recherche dichotomique, tri par insertion, tri par insertion dichotomique, quick sort, merge sort et comparaison des temps d'exécution."
sidebar_position: 3
sidebar_custom_props:
  kind: td
---

## Recherche dichotomique

```python
import random
import time
#Recherche dichotomique :
def aléatoire():
    x = random.randint(0,1000)
    return x

c=0
def EstPlusGrandQue(x,n):
    global c
    c+=1
    if x>n:
        return True
    return False

def RechercheDichotomique1():
    x=aléatoire()
    c=0
    a=0
    b=1000
    while (b-a) > 1:
        c+=1
        if x > int(a+(b-a)//2):
            a=int(a+(b-a)//2)
        else:
            b=int(a+(b-a)//2)
    if b==x:
        print(c,b)
        return True
    return False

def RechercheDichotomique2(L,i,j,X):
    if X>L[j]:
        return j+1
    while i!=j :
        k =(i+j)//2
        if X <=L[k]:
            j=k
        else:
            i=k+1
    return i
```

## Fonctions de tri

```python
#Fonction de tri

def Insertion(e,L_triée):
    pos=0
    n=len(L_triée)
    while pos < n and L_triée[pos]<e:
        pos+=1
    L_triée.insert(pos,e)
    return

def Tri():
    L = [random.random() for i in range(100)]
    L_triée=[]
    for e in L:
        Insertion(e,L_triée)
    return L_triée

def TriInsertion(a): #complexité n^2
    L= [random.random() for i in range(a)]
    for i in range(1,len(L)):
        if L[i] < L[i-1]:
            for k in range(0,i):
                if L[i]<L[k]:
                    X=L.pop(i)
                    L.insert(k,X)
    return L

def TriDichotomie(L):
    for i in range(1,len(L)):
        if L[i]<L[i-1]:
            k=RechercheDichotomique2(L,0,i-1,L[i])
            X=L.pop(i)
            L.insert(k,X)
    return [L]
```

## Quick sort

```python
#QuickSort
from random import randint
B=[8,1,0,6,2,4,9,7,5,3]
C=[[1],[2],[5]]
D=[randint(0,1000) for i in range(10000)]

def quickSort(L,début=0,fin=None):
    if fin==None:
        fin=len(L)-1
    if début>=fin:
        return
    pivot=L[randint(début,fin)]
    seuil=partitionner(L,début,fin,pivot)
    quickSort(L,début,seuil-1)
    quickSort(L,seuil,fin)

def partitionner(L,début,fin,pivot):
    i=début
    j=fin
    while i<j:
        while L[i]<pivot:
            i=i+1
        while L[j]>pivot:
            j=j-1
        if i<j:
            a=L[i]
            L[i]=L[j]
            L[j]=a
    return i
```

## Merge sort

```python
#Merge Sort
def fusion(L1,L2):
    i=0
    j=0
    L=[]
    while i<len(L1) and j<len(L2):
        if L1[i]<L2[j]:
            L.append(L1[i])
            i=i+1
        else:
            L.append(L2[j])
            j=j+1
    while len(L1)>i:
        L.append(L1[i])
        i=i+1
    while len(L2)>j:
        L.append(L2[j])
        j=j+1
    return L

def casser(L):
    L_c=[]
    i=0
    while len(L)>0:
        x=L.pop(i)
        L_c=L_c+[[x]]
    return L_c

def mergeSort(L):
    cpt=0
    L=casser(L)
    while len(L)>2:
        x=L.pop(0)
        y=L.pop(1)
        L.append(fusion(x,y))
    if len(L)==2:
        x=L.pop(0)
        y=L.pop(0)
        return fusion(x,y)
```

## Comparaison

```python
#Comparaison
def comparaison(L):
    L_x=L
    tps1=time.clock()
    x=TriDichotomie(L_x)
    tps2=time.clock()
    print(Triée(L_x), tps2-tps1, "Tri dichotomique terminé")
    L_y = L
    tps3=time.clock()
    y=mergeSort(L_y)
    tps4=time.clock()
    print(Triée(L_y), tps4-tps3, "MergeSort terminé")
    L_z=L
    tps5=time.clock()
    z=quickSort(L_z)
    tps6=time.clock()
    print(Triée(L_z), tps6-tps5, "QuickSort terminé")

def Triée(L):
    for i in range(1,len(L)):
        if L[i]<L[i-1]:
            return False
    return True
```
