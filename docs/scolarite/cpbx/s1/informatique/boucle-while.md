---
title: "Boucle while"
description: "Propositions de correction du TD VI d'informatique en Python : lancers de dé, écriture décimale, racine carrée, logarithme, suite de Conway et ensemble de Mandelbrot."
sidebar_position: 6
sidebar_custom_props:
  kind: td
---

Propositions de correction du TD VI.

## Lancer de dé

### Question 1.1

```python
def un_de():
    return int(random.uniform(1, 7))

def nbLancers():
    cpt=1
    while (un_de()!=6):
        cpt=cpt+1
    return cpt
```

### Question 1.2

```python
def double():
    cpt=1
    while (un_de()!=un_de):
        cpt=cpt+1
    return cpt
```

### Question 1.3

```python
def moyenneTentativedouble(n):
    somme=0
    for x in range(n):
        tent=double()
        somme=somme+tent
    return (somme//n)
```

### Question 1.4

```python
def uniformite(n):
    L=[0, 0, 0, 0, 0, 0, 0]
    for y in range(n):
        x=un_de()
        L[x]=L[x]+1
    return L
```

## Écriture décimale

### Question 2.1

```python
def mystere(n):
    s=0
    while n>0:
        s=s+n%10
        n=n//10
    return s
```

### Question 2.2

```python
#Mystère 2705 renvoi 14 soit 2+7+0+5
```

### Question 2.3

```python
def nombreDeChiffres(n):
    cpt=0
    while (n!=0):
        n=n//10
        cpt=cpt+1
    return cpt
```

### Question 2.4

```python
def plusGrandChiffre(n):
    a=0
    while (n!=0):
        b=a
        a=n%10
        n=n//10
        if b>a:
            a=b
    return a
```

## Racine carrée

### Question 3.1

```python
def sqrt(n):
    a=1
    b=0
    cpt=0
    while b<n:
        a=a+2
        b=b+a
        cpt=cpt+1
    return cpt
```

## Logarithme

### Question 4.1

```python
def logarithme_1(a, n):
    cpt=0
    if a==1:
        print("Impossible , divison par 0")
        return False
    while a**cpt<n:
        cpt=cpt+1
    return cpt

def logarithme_2(a, n):
    return logarithme_1(a, n)-1
```

## Pour les plus rapides

### Question 5.1

```python
def conway(n):
    c=[1]
    for j in range(n):
        L=[]
        i=0
        while i<len(c):
            cpt=0
            while (i+cpt<len(c) and c[i+cpt]==c[i]):
                cpt+=1
            L+=[cpt]
            L+=[c[i]]
            i+=cpt
        c=[]
        for i in L:
            c+=[i]
    return c
```

### Question 5.2

```python
def suiteComplexe(x, y, size, n):
    c=complex(x, y)*3/size-complex(2, 1.5)
    z=c
    for i in range(n):
        z=z*z+c
    return z
```

### Question 5.3

```python
def suiteComplexeDiverge(x, y, size):
    n=0
    while n<256 and abs(suiteComplexe(x, y, size, n))<2:
        n=n+1
    return n
```

### Question 5.4

```python
def mandelbrot(size):
    nimg=new("RGB", (size, size))
    avt=0
    for x in range(size):
        for y in range(size):
            g=suiteComplexeDiverge(x, y, size)
            Image.putpixel(nimg, (x, y), (g, g, g))
            avt=avt+1
        print(int(avt/(size*size)*100),"%")
    return nimg
```

### Question 5.5

```python
def mandelbrotCouleur(size):
    nimg=new("RGB", (size, size))
    avt=0
    for x in range(size):
        for y in range(size):
            n=suiteComplexeDiverge(x, y, size)
            Image.putpixel(nimg, (x, y), ((n*8)%256, (n*32)%256, (n*64)%256))
            avt=avt+1
        print(int(avt/(size*size)*100),"%")
    return nimg
```
