---
title: "Récursivité"
description: "Propositions de correction du TD VII d'informatique en Python : arbre, flocon de Koch, triangle de Sierpinski et logo tracés récursivement avec turtle."
sidebar_position: 7
sidebar_custom_props:
  kind: td
---

Propositions de correction du TD VII.

## Arbre

```python
def arbre(L, n, a, b):
    down()
    forward(L)
    if n>1:
        left(a)
        arbre(L*b, n-1, a, b)
        right(2*a)
        arbre(L*b, n-1, a, b)
        left(a)
    up()
    speed("fastest")
    back(L)
```

## Flocon de Koch

```python
def flocon(L, n):
    if n==0:
        forward(L)
    else:
        flocon(L//3, n-1)
        left(60)
        flocon(L//3, n-1)
        right(120)
        flocon(L//3, n-1)
        left(60)
        flocon(L//3, n-1)
    speed("fastest")
```

## Triangle de Sierpinski

```python
def triangle(n, L):
    if n==0:
        for i in range(0, 3):
            forward(L)
            left(120)
    if n>0:
        triangle(n-1, L/2)
        forward(L/2)
        triangle(n-1, L/2)
        backward(L/2)
        left(60)
        forward(L/2)
        right(60)
        triangle(n-1, L/2)
        left(60)
        backward(L/2)
        right(60)
    speed("fastest")
```

## Drive

```python
def demi_hexa(L, n):
    left(60)
    if n==0:
        forward(L/2)
    else:
        left(60)
        demi_hexa(L, n-1)
        right(60)
        demi_hexa(L, n-1)
        right(60)
        demi_hexa(L, n-1)
        demi_hexa(L, n-1)

def logo_drive(L, n):
    down()
    demi_hexa(L, n)
    speed("fastest")
```
