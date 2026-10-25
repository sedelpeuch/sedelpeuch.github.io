---
title: "Prise en main"
description: "Propositions de correction du TD I d'informatique en Python : fonctions (moyennes, parité), conditionnelles (comparaison, maximum) et suppléments (photocopies, horloge, équation du second degré)."
sidebar_position: 1
sidebar_custom_props:
  kind: td
---

Propositions de correction du TD I.

## Fonctions

### Question 2.4

```python
def moyenne_1(a, b):
    return (a+b)/2
```

### Question 2.5

```python
def moyenne_pondere(a, coef_a, b, coef_b):
    c=(a*coef_a+b*coef_b)
    d=(coef_a+coef_b)
    return c/d
```

### Question 2.6

```python
def moyenne_2(a, b):
    return moyenne_pondere(a, 1, b, 1)
```

### Question 2.7

```python
def pair(n):
    return n%2==0
```

## Conditionnelles

### Question 3.1

```python
def compare(a, b):
    if a<b:
        return -1
    if a==b:
        return 0
    if a>b:
        return 1
```

### Question 3.2

```python
def max2(x, y):
    if compare(x, y)==-1:
        return y
    if compare(x, y)==1:
        return x
    if compare(x, y)==0:
        return x, y
```

### Question 3.3

```python
def max3(x, y, z):
    return (max2(z, max2(x, y)))
```

## Suppléments

### Question 4.1

```python
def coutPhotocopies(n):
    if n<=10:
        total=0.20*n
    if 10<n<=30:
        total=0.20*10+0.15*(n-10)
    if n>30:
        total=0.20*10+0.15*20+0.10*(n-30)
    return total
```

### Question 4.2

```python
def uneMinuteEnPlus(x, y):
    if y==59:
        y=-1
        x=x+1
    y=y+1
    if x==24:
        x=0
    return (x, y)
```

### Question 4.3

```python
def solve(a, b, c):
    delta=b**2-4*a*c
    if delta==0:
        print("Une seule solution réelle :")
        return -b/(2*a)
    if delta>0:
        print("Deux solutions réelles :")
        return (-b+delta**0.5)/2*a, (-b-delta**0.5)/2*a
```
