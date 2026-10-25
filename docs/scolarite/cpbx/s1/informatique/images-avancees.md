---
title: "Images avancées"
description: "Propositions de correction du TD V d'informatique en Python : image cachée dans les bits de poids faible, fusion linéaire et quadratique, bannière et insertion de texte."
sidebar_position: 5
sidebar_custom_props:
  kind: td
---

Propositions de correction du TD V.

## Une image peut en cacher une autre

### Question 1.1

```python
def valeur_dernier_bits_2(n):
    return n%8
```

### Question 1.2

```python
def decaler_2(n):
    return n*32+16
```

### Question 1.3

```python
def devoilerimage(img):
    (l, h)=img.size
    cible=new("RGB", (l, h))
    for x in range(l):
        for y in range(h):
            (r, g, b)=Image.getpixel(img, (x, y))
            Image.putpixel(cible, (x, y), (decaler_2(valeur_dernier_bits_2(r)), decaler_2(valeur_dernier_bits_2(g)), decaler_2(valeur_dernier_bits_2(b))))
    return (cible)
```

### Question 1.4

```python
def premiers5(R, G, B):
    RL=[]
    GL=[]
    BL=[]
    for x in range(7, -1, -1):
        if R-2**x>=0:
            RL=RL+[1]
            R=R-2**x
        else:
            RL=RL+[0]
        if G-2**x>=0:
            GL=GL+[1]
            G=G-2**x
        else:
            GL=GL+[0]
        if B-2**x>=0:
            BL=BL+[1]
            B=B-2**x
        else:
            BL=BL+[0]
    return[RL[0], RL[1], RL[2], RL[3], RL[4]], [GL[0], GL[1], GL[2], GL[3], GL[4]], [BL[0], BL[1], BL[2], BL[3], BL[4]]

def premiers3(r, g, b):
    rl=[]
    gl=[]
    bl=[]
    for x in range(7, -1, -1):
        if r-2**x>=0:
            rl=rl+[1]
            r=r-2**x
        else:
            rl=rl+[0]
        if g-2**x>=0:
            gl=gl+[1]
            g=g-2**x
        else:
            gl=gl+[0]
        if b-2**x>=0:
            bl=bl+[1]
            b=b-2**x
        else:
            bl=bl+[0]
    return[rl[0], rl[1], rl[2]], [gl[0], gl[1], gl[2]], [bl[0], bl[1], bl[2]]

def recomposer(R, G, B, r, g, b):
    (RL, GL, BL)=premiers5(R, G, B)
    (rl, gl, bl)=premiers3(r, g, b)
    RL=RL+[rl[0]]+[rl[1]]+[rl[2]]
    GL=GL+[gl[0]]+[gl[1]]+[gl[2]]
    BL=BL+[bl[0]]+[bl[1]]+[bl[2]]
    (nbr_RL, nbr_GL, nbr_BL)=(0, 0, 0)
    for x in range(0, 8):
        decimal_RL=RL[x]*2**(7-x)
        nbr_RL= nbr_RL+decimal_RL
        decimal_GL=GL[x]*2**(7-x)
        nbr_GL= nbr_GL+decimal_GL
        decimal_BL=BL[x]*2**(7-x)
        nbr_BL= nbr_BL+decimal_BL
    return (nbr_RL, nbr_GL, nbr_BL)

def dissimuler_image(img1, img2):
    (l, h)=min(img1.size, img2.size)
    nimg=new("RGB", (l, h))
    for x in range(l):
        for y in range(h):
            (R, G, B)=Image.getpixel(img1, (x, y))
            (r, g, b)=Image.getpixel(img2, (x, y))
            (rn, gn, bn)=recomposer(R, G, B, r, g, b)
            Image.putpixel(nimg, (x, y), (rn, gn, bn))
    return nimg
```

## Fusion et bannière

### Question 2.1

```python
def fusion_lineaire(img1, img2):
    (l, h)=min(img1.size, img2.size)
    nimg=new("RGB", (l, h))
    for y in range(h):
        for x in range(l):
            (r_1, g_1, b_1)=Image.getpixel(img1, (x, y))
            (r_2, g_2, b_2)=Image.getpixel(img2, (x, y))
            r=(y*r_1+(h-y)*r_2)//h
            g=(y*g_1+(h-y)*g_2)//h
            b=(y*b_1+(h-y)*b_2)//h
            Image.putpixel(nimg, (x, y), (r, g, b))
    return nimg
```

### Question 2.2

```python
def fusion_quadratique(img1, img2):
    (l, h)=min(img1.size, img2.size)
    nimg=new("RGB", (l, h))
    for y in range(h):
        for x in range(l):
            (r_1, g_1, b_1)=Image.getpixel(img1, (x, y))
            (r_2, g_2, b_2)=Image.getpixel(img2, (x, y))
            r=(y**2*r_1+(1-y**2)*r_2)//(y**2+(1-y)**2)
            g=(y**2*g_1+(1-y**2)*g_2)//(y**2+(1-y)**2)
            b=(y**2*b_1+(1-y**2)*b_2)//(y**2+(1-y)**2)
            Image.putpixel(nimg, (x, y), (r, g, b))
    return nimg
```

### Question 2.3

```python
def banière(img1, img2):
    (l, h)=min(img1.size, img2.size)
    nimg=new("RGB", (l, h))
    lineaire=fusion_lineaire(img1, img2)
    quadra=fusion_quadratique(img1, img2)
    for x in range(0, 1, 4):
        for y in range(h):
            (r1, g1, b1)=Image.getpixel(img1, (x, y))
            (r2, g2, b2)=Image.getpixel(img2, (x, y))
            (rl, gl, bl)=Image.getpixel(lineaire, (x, y))
            (rq, gq, bq)=Image.getpixel(quadra, (x, y))
            Image.putpixel(nimg, (x, y), (r1, g1, b1))
            Image.putpixel(nimg, (x+1, y), (r2, g2, b2))
            Image.putpixel(nimg, (x+2, y), (rl, gl, bl))
            Image.putpixel(nimg, (x+3, y), (rq, gq, bq))
    return nimg
```

## Taguer une image

### Question 3.1

```python
def insertionPossible(img1, img2, x, y):
    (L, H)=img1.size
    (l, h)=img2.size
    if x+l>L:
        return False
    return True
```

### Question 3.2

```python
def insereTexteNoir(img1, img2, x, y):
    if insertionPossible(img1, img2, x, y)==True:
        (L, H)=img1.size
        (l, h)=img2.size
        for i in range(l):
            for j in range(h):
                (r, g, b)=Image.getpixel(img2, (i, j))
                Image.putpixel(img1, (x+i, y+j), (r, g, b))
    else:
        print("Impossible")
```

### Question 3.3

```python
def insereTexteSombre(img1, img2, x, y):
    if insertionPossible(img1, img2, x, y)==True:
        (L, H)=img1.size
        (l, h)=img2.size
        for i in range(l):
            for j in range(h):
                (r, g, b)=Image.getpixel(img2, (i, j))
                if r!=255 and g!=255 and b!=255:
                    Image.putpixel(img1, (x+i, y+j), (r, g, b))
    else:
        print("Impossible")
```

### Question 3.4

```python
def insereTexteNet(img1, img2, x, y):
    if insertionPossible(img1, img2, x, y)==True:
        (L, H)=img1.size
        (l, h)=img2.size
        for i in range(l):
            for j in range(h):
                (r, g, b)=Image.getpixel(img2, (i, j))
                (R, G, B)=Image.getpixel(img1, (x+i, y+j))
                if r!=255 and g!=255 and b!=255:
                    Image.putpixel(img1, (x+i, y+j), ((r*R)//255, (g*G)//255, (b*B)//255))
    else:
        print("Impossible")
```
