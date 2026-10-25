---
title: "Listes"
description: "Propositions de correction du TD II d'informatique en Python : boucles for (factorielle, sommes), exploration de listes (moyenne, occurrences, doublons, impairs) et suppléments (tri, médiane, premier tour)."
sidebar_position: 2
sidebar_custom_props:
  kind: td
---

Propositions de correction du TD II.

## Boucles for

### Question 2.5

```python
def factorielle(n):
    factorielle=1
    for i in range(1, n+1):
        factorielle=factorielle*i
    return factorielle
```

### Question 2.6

```python
def factorielle2(L):
    s=1
    for i in L:
        print("i=", i)
        print(factorielle(i))
```

### Question 2.7

```python
def sommeImpairs(k):
    s=0
    for i in range(1, 2*k, 2):
        s=s+i
    return s
```

### Question 2.8

```python
def sommeBizarre(n):
    s=0
    for i in range(1, n+1):
        i=(3*i+1)*(3*i+1)
        s=s+i
    return s
```

### Question 2.9

```python
    s=1
    for p in range(0, k):
        p= 2**s
        s=s+p
    return s
```

## Exploration de listes

### Question 3.1

```python
def moyenne(L):
    n=0
    for p in L:
        n=n+p
    return n/len(L)
```

### Question 3.2

```python
def nbApparitions(x, L):
    n=0
    for i in L:
        if i==x:
            n=n+1
    return n
```

### Question 3.3

```python
def doublons(L):
    for x in L:
        if nbApparitions(x, L)>1:
            return True
    return False
```

### Question 3.4

```python
def maxDesImpairs(L):
    n=0
    for p in L:
        if p%2==1 and p>n:
            n=p
    if n==0:
        print("pas d'impairs")
    return n
```

### Question 3.5

```python
def minDesImpairs(L):
    s=[]
    for i in L:
        if i%2==1:
            s=s+[i]
    if s==[]:
        return ('no impairs ')
    return min(s)
```

### Question 3.6

```python
def dernierPlusGrand(L):
    m = moyenne(L)
    s=[]
    for i in range(len(L)):
        if L[i]>m:
            s=s+[i]
    return max(s)
```

### Question 3.7

```python
def plusproche(L):
    m = moyenne(L)
    n= abs(m-L[0])
    for i in L:
        if abs(m-i)<n:
            n=abs(m-i)
            r=i
    return i
```

## Suppléments

### Question 4.1

```python
def tri(L):
    for i in range(len(L)):
        k=i
        for j in range(i+1, len(L)):
            if L[k]>L[j]:
                k=j
        L[k], L[i]=L[i], L[k]
    return L

def mediane(L):
    n=len(L)
    l=tri(L)
    if n%2==0:
        return (l[(n-1)//2]+l[(n+1)//2])//2
    else:
        return l[(n-1)//2]
```

### Question 4.2

```python
def PremierTour(L):
    for x in L:
        if nbApparitions(x, L) >len(L)/2:
            return x
```

### Question 4.3

```python
def PremierTour_2(L):
    S=[]
    for x in L:
        if S==[]:
            S=S+[x]
        if S!=[]:
            if S[0]==x:
                S=S+[x]
            if S[0]!=x:
                del S[0]
    S.reverse()
    if S!=[]:
        return S[0]
    return 0
```
