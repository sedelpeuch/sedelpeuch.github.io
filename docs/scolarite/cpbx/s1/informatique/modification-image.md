---
title: "Modification d'image"
description: "Propositions de correction du TD IV d'informatique en Python : déplacement d'une zone d'image, niveaux de couleur, détection de contours, symétries et cryptage par blocs."
sidebar_position: 4
sidebar_custom_props:
  kind: td
---

Propositions de correction du TD IV.

## Ouvrons le placard

### Question 1.1

```python
def openplacard(img):
    (l, h)=fantome.size
    for x in range(71, 132):
        for y in range(4, 187):
            (r, g, b)=Image.getpixel(img, (x, y))
            Image.putpixel(img, (x-64, y), (r, g, b))
            if x<l and y<h:
                (R, G, B)=Image.getpixel(fantome, (x-71, y-4))
                Image.putpixel(img, (x, y), (R, G, B))
            else:
                Image.putpixel(img, (x, y), (0, 0, 0))
```

### Question 1.2

```python
def openplacard_2(img):
    (l, h)=fantome.size
    for x in range(187, 135, -1):
        for y in range(4, 187):
            (r, g, b)=Image.getpixel(img, (x, y))
            Image.putpixel(img, (x+32, y), (r, g, b))
            if x-135<l and y<h:
                (R, G, B)=Image.getpixel(fantome, (x-68, y-4))
                Image.putpixel(img, (x, y), (R, G, B))
            else:
                Image.putpixel(img, (x, y), (0, 0, 0))
```

## Niveaux de couleur

### Question 2.1

```python
def minimum(img):
    (l, h)=img.size
    (r, g, b)=Image.getpixel(img, (0, 0))
    for x in range(l):
        for y in range(h):
            (rl, gl, bl)=Image.getpixel(img, (x, y))
            if rl<r:
                r=rl
            if gl<g:
                g=gl
            if bl<b:
                b=bl
    return r, g, b

def maximum(img):
    (l, h)=img.size
    (r, g, b)=Image.getpixel(img, (0, 0))
    for x in range(l):
        for y in range(h):
            (rf, gf, bf)=Image.getpixel(img, (x, y))
            if rf>r:
                r=rf
            if gf>g:
                g=gf
            if bf>b:
                b=bf
    return r, g, b
```

### Question 2.2

```python
def LvlCouleurs(img):
    (l, h)=img.size
    (r_M, g_M, b_M)=maximum(img)
    (r_m, g_m, b_m)=minimum(img)
    for x in range(l):
        for y in range(h):
            (r, g, b)=Image.getpixel(img, (x, y))
            r_n=255*(r-r_m)//(r_M-r_m)
            g_n=255*(g-g_m)//(g_M-g_m)
            b_n=255*(b-b_m)//(b_M-b_m)
            Image.putpixel(img, (x, y), (r_n, g_n, b_n))
```

## Détection de contours

### Question 3.1

```python
def contour_V(img):
    (l, h)=img.size
    nimg=new("RGB", (l, h))
    for x in range(1, l -1):
        for y in range(1, h):
            (r, g, b)=Image.getpixel(img, (x, y))
            (r2, g2, b2)=Image.getpixel(img, (x-1, y))
            (r3, g3, b3)=Image.getpixel(img, (x+1, y))
            Image.putpixel(nimg, (x, y), (2*r-r2-r3, 2*g-g2-g3, 2*b-b2-b3))
    return nimg
```

### Question 3.2

```python
def contour_H(img):
    (l, h)=img.size
    nimg=new("RGB", (l, h))
    for x in range(1, l):
        for y in range(1, h-1):
            (r, g, b)=Image.getpixel(img, (x, y))
            (r2, g2, b2)=Image.getpixel(img, (x, y-1))
            (r3, g3, b3)=Image.getpixel(img, (x, y+1))
            Image.putpixel(nimg, (x, y), (2*r-r2-r3, 2*g-g2-g3, 2*b-b2-b3))
    return nimg
```

### Question 3.3

```python
def norme(img):
    (l, h)=img.size
    nimg=new("RGB", (l, h))
    for x in range(1, l -1):
        for y in range(1, h-1):
            (r, g, b)=Image.getpixel(img, (x, y))
            (r2, g2, b2)=Image.getpixel(img, (x-1, y))
            (r3, g3, b3)=Image.getpixel(img, (x+1, y))
            (r4, g4, b4)=Image.getpixel(img, (x, y-1))
            (r5, g5, b5)=Image.getpixel(img, (x, y+1))
            Image.putpixel(nimg, (x, y), (4*r-r2-r3-r4-r5, 4*g-g2-g3-g4-g5, 4*b-b2-b3-b4-b5))
    return nimg
```

## Symétries

### Question 4.1

```python
def miroir(img):
    (l, h)=img.size
    nimg=new("RGB", (l, h))
    for x in range(l):
        for y in range(h):
            (r, g, b)=Image.getpixel(img, (x, y))
            Image.putpixel(nimg, (l-x-1, y), (r, g, b))
    return nimg
```

### Question 4.2

```python
def retourner(img):
    (l, h)=img.size
    nimg=new("RGB", (l, h))
    for x in range(l):
        for y in range(h):
            (r, g, b)=Image.getpixel(img, (x, y))
            Image.putpixel(nimg, (l-x-1, h-y-1), (r, g, b))
    return nimg
```

## Crypter une image

### Question 5.1

```python
def bloc(img, x1, x2, y1, y2):
    (l, h)=img.size
    R=0
    G=0
    B=0
    nbr=len(list(range(x1, x2)))*len(list(range(y1, y2)))
    for x in range(x1, x2):
        for y in range(y1, y2):
            (r, g, b)=Image.getpixel(img, (x, y))
            R=R+r
            G=G+g
            B=B+b
    for x in range(x1, x2):
        for y in range(y1, y2):
            Image.putpixel(img, (x, y), (R//nbr, G//nbr, B//nbr))
```

### Question 5.2

```python
def newimg(img):
    (l, h)=img.size
    nimg=new("RGB", (l, h))
    for x in range(l):
        for y in range(h):
            (r, g, b)=Image.getpixel(img, (x, y))
            Image.putpixel(nimg, (x, y), (r, g, b))
    return nimg

def crypte(img, k):
    (l, h)=img.size
    nimg=newimg(img)
    for x in range(0, l+1, k):
        for y in range(0, h+1, k):
            a=x+k
            b=y+k
            if a>l:
                a=l
            if b>h:
                b=h
            bloc(nimg, x, a, y, b)
    return nimg
```
