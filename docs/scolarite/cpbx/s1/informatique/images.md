---
title: "Images"
description: "Propositions de correction du TD III d'informatique en Python : tracés de base, filtres de couleur, luminosité, monochrome, flou, agrandissement, noir et blanc, Floyd-Steinberg et tracé de cercle."
sidebar_position: 3
sidebar_custom_props:
  kind: td
---

Propositions de correction du TD III.

## Pour commencer

### Question 2.2

```python
def rectangleCreux(img, x1, x2, y1, y2, c):
    (x1, x2, y1, y2)=ordre(x1, x2, y1, y2)
    (l, h)=img.size
    x2=min(x2, l-1)
    y2=min(y2, h-1)
    for x in range(x1, x2+1):
        Image.putpixel(img, (x, y1), c)
        Image.putpixel(img, (x, y2), c)
    for y in range(y1, y2+1):
        Image.putpixel(img, (x1, y), c)
        Image.putpixel(img, (x2, y), c)
    Image.show(img)
```

### Question 2.3

```python
def diagonale(img):
    (l, h)=img.size
    if l>h:
        for x in range(l):
            Image.putpixel(img, (x, x*h//l), (255, 255, 255))
    else:
        for y in range(h):
            Image.putpixel(img, (y*l//h, y), (255, 255, 255))
    Image.show(img)
```

## Manipulation de couleurs

### Question 3.1

```python
def filtreRouge(img):
    img_rouge=img
    (l, h)=img.size
    for x in range(l):
        for y in range(h):
            (r, g, b)=Image.getpixel(img_rouge, (x, y))
            Image.putpixel(img, (x, y), (r, 0, 0))
    Image.show(img_rouge)

def filtreVert(img):
    (l, h)=img.size
    for x in range(l):
        for y in range(h):
            (r, g, b)=Image.getpixel(img, (x, y))
            Image.putpixel(img, (x, y), (0, g, 0))
    Image.show(img)

def filtreBleu(img):
    img_bleu=img
    (l, h)=img.size
    for x in range(l):
        for y in range(h):
            (r, g, b)=Image.getpixel(img_bleu, (x, y))
            Image.putpixel(img_bleu, (x, y), (0, 0, b))
    Image.show(img_bleu)
```

### Question 3.2

```python
def luminosite(img, facteur):
    f=int(facteur)
    (l, h)=img.size
    for x in range(l):
        for y in range(h):
            (r, b, g)=Image.getpixel(img, (x, y))
            Image.putpixel(img, (x, y), (r*f, g*f, b*f))
```

### Question 3.3

```python
def monocrhome(img):
    (l, h)=img.size
    for x in range(l):
        for y in range(h):
            (r, g, b)=Image.getpixel(img, (x, y))
            g=(r+g+b)//3
            Image.putpixel(img, (x, y), (g, g, g))
```

### Question 3.4

```python
def flou(img):
    (l, h)=img.size
    nimg=new("RGB", (l, h), (0, 0, 0))
    for x in range(1, l -3):
        for y in range(1, h-3):
            (R, G, B)=(0, 0, 0)
            for i in range(-2, 3):
                for j in range(-2, 3):
                    (r, g, b)=Image.getpixel(img, (x+i, y+j))
                    R=r+R
                    G=g+G
                    B=b+B
            R=R//9
            B=B//9
            G=G//9
            Image.putpixel(nimg, (x, y), (R, G, B))
    return nimg
```

## Agrandissement d'une image

### Question 4.1

```python
def agrandirfacteur2(img):
    (l, h)=img.size
    nimg=new("RGB", (l*2, h*2))
    for x in range(l):
        for y in range(h):
                (r, g, b)=Image.getpixel(img, (x, y))
                Image.putpixel(nimg, (2*x, 2*y), (r, g, b))
                Image.putpixel(nimg, (2*x+1, 2*y+1), (r, g, b))
                Image.putpixel(nimg, (2*x, 2*y+1), (r, g, b))
                Image.putpixel(nimg, (2*x+1, 2*y), (r, g, b))
    return nimg
```

## Suppléments

### Question 5.1

```python
def gris(img):
    (l, h)=img.size
    for x in range(l):
        for y in range(h):
            (r, g, b)=Image.getpixel(img, (x, y))
            g=(r+g+b)//3
            Image.putpixel(img, (x, y), (g, g, g))

def noir_blanc(img):
    gris(img)
    (l, h)=img.size
    for x in range(l):
        for y in range(h):
            (r, g, b)=Image.getpixel(img, (x, y))
            if r>100:
                Image.putpixel(img, (x, y), (0, 0, 0))
            else:
                Image.putpixel(img, (x, y), (255, 255, 255))
```

### Question 5.2

```python
def floydSteinberg(img):
    (l, h)=img.size
    for y in range(1, h-1):
        for x in range(1, l -1):
            (ar, ag, ab)=Image.getpixel(img, (x, y))
            g=(ar+ag+ab)//3
            Image.putpixel(img, (x, y), (g, g, g))
            (dr, dg, db)=(ar-g, ag-g, ab-g)
            (r_1, g_1, b_1)=Image.getpixel(img, (x+1, y))
            Image.putpixel(img, (x+1, y), (r_1+(7//16)*dr, g_1+(7//16)*dg, b_1+(7//16)*db))
            (r_2, g_2, b_2)=Image.getpixel(img, (x-1, y+1))
            Image.putpixel(img, (x-1, y+1), (r_2+(3//16)*dr, g_2+(3//16)*dg, b_2+(3//16)*db))
            (r_3, g_3, b_3)=Image.getpixel(img, (x, y+1))
            Image.putpixel(img, (x, y+1), (r_3+(5//16)*dr, g_3+(5//16)*dg, b_3+(5//16)*db))
            (r_4, g_4, b_4)=Image.getpixel(img, (x+1, y+1))
            Image.putpixel(img, (x+1, y+1), (r_4+(1//16)*dr, g_4+(1//16)*dg, b_4+(1//16)*db))
```

### Question 5.3

```python
def cercle2(img, a, b, r):
    x=0
    y=r
    m=5-4*r
    while x<=y:
        if m>0:
            y=y-1
            m=m-8*y
        x=x+1
        m=m+8*x+4
        Image.putpixel(img, (x+a, y+b), (255, 255, 255))
        Image.putpixel(img, (y+a, x+b), (255, 255, 255))
        Image.putpixel(img, (-x+a, y+b), (255, 255, 255))
        Image.putpixel(img, (-y+a, x+b), (255, 255, 255))
        Image.putpixel(img, (x+a, -y+b), (255, 255, 255))
        Image.putpixel(img, (y+a, -x+b), (255, 255, 255))
        Image.putpixel(img, (-x+a, -y+b), (255, 255, 255))
        Image.putpixel(img, (-y+a, -x+b), (255, 255, 255))
```
