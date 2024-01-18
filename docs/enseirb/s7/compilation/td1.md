---
title: "TD - Feuille 1"
date: 2020-09-20T11:07:10+06:00
author: Sébastien Delpeuch
bg_image: "images/banner/compilation.jpg"
tags: ["Compilation"]
draft: false
type: "post"
---

<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

Notes inspirées du cours de JANIN David et du TD de Myriam Desainte-Catherine 

## Compilation des expressions 

### Exercice 1

*Donner une majoration du nombre d'adresses nécessaire à l'évaluation des
instructions C suivantes :*

1. `x = (y1 + y2) + y3` : 4 opérations nécessaire 
 
2. `y = *(px++)` : 3 opérations nécessaire (2 lecture et 1 écriture)
 
3. `*(px+3)=*(px+y)+z` : 6 opérations nécessaire (5 lecture et 1 écriture)

*Proposer pour chacune des lignes de codes ci-dessus une compilation en trois
adresses. Indication : on pourra réutiliser verbatim les noms variables
apparaissant dans ces expressions, dites variables utilisateurs, en ajoutant
autant de registres compilateurs que souhaités*


```c
x = (y1 + y2) + y3

ri1 = y1 
ri2 = y2 
ri1 = ri1 + ri2 
ri2 = y3
r1 = ri1 + ri2
x = r1
```

```c
y = *(px++)

ri1 = px
ri1 = ri1 +1 
ri2 = * r1 
y = r2
```

```c
*(px+3)=*(px+y)+z
r1 = px
r2 = y
r3 = z
r2 = r1 + r2 
r4 = *r2 
r4 = r4 + r3
r1 = r1 + 3 
r4 = r4 + r3
```

### Exercice 2 

*Compiler les instructions*

1. ` x = y1 + ( y2 * ( y3 + (y4 * y5) ) )`
2. ` x = (((y1 + y2) * y3 ) + y4) * y5`
3. `((y1 + y2) * (y3 + y4)) + ((y3 + y1) * (y2 + y5))`

*Combien de registres utilisez vous ? Sont-ils nécessaires ? Peut-on facilement
automatiser leur optimisation ?*

```c
r1 = y4 
r2 = y5
r1 = y4 * y5
r2 = y3
r2 = y3 + r1 
r1 = y2
r2 = r1 * r2
r1 = y1
r2 = r1 + r2
```

```c
r1 = y1 
r2 = y2
r1 = r1 + r2 
r2 = r1 * r2 
r1 = y4 
r1 = r2 + r1 
r2 = y5
r2 = r1 * r2 
x = r2
```

```c
r1 = y1
r2 = y2
r1 = r1 + r2 
r2 = y3
r3 = y4
r2 = r2 + r3
r1 = r1 * r2 
r2 = y3 
r3 = y1
r2 = r2 + r3 
r3 = y2 
r4 = y5
r3 = r3 + r4
r2 = r2 x r3
r3 = r1 + r2
```

Pour connaître les instructions à faire il faut donc dessiner l'arbre de des
opérations, il se dégage 2 branches une avec $n$ opération et une avec $m$.
ensuite si $n=m$ alors il y a $n+1$ registres nécessaire 

Si $n \neq m$ alors il y a $max(n,m)$ registres nécessaire 



## Compilation des instructions de contrôle 

### Exercice 3

*Proposer un schéma de compilation en code 3 adresses pour les instructions de
contrôle apparaissant dans les exemples suivants*

```c
if x then y = 0;
if b then x = 1 else x = 2; 
while (x < 100) do x = x +1; 
repeat x = x + 1 while x < 100;
do x = x + 2 until x == 100;
```



## Compilation "paresseuse des booléens"

### Exercice 4 

*En supposant l'expression booléenne $b$ compilée comme ci-dessus, proposer
une schéma de traduction des flots de contrôles* 

On pose $b = \langle p , lt , lf \rangle$, avec $p$ un code à 3 adresses qui
se branche sur $lt$ si $b$ est vrai et $lf$ sinon.

```c
if b then p1; 

    p
lt : p1
lf : nop

if b then p1 else p2;

    p
    lt : p1
        goto f1
    lf : p2
    f1 : nop
    
while b do p1; 
    p
    lt : p1
        goto while 
    lf : nop
    
do p1 until b;
    lf : p1
    p
    lt : nop
```

### Exercice 5 

- *Donner une représentation "paresseuse" des booléens constant true et false*

**true** : `(goto lt, lt, lf)`

**false** : `(goto lf, lt, lf)`

- *Donner une représentation "paresseuse" d'une variable de type booléen*

```c
r = x
if r goto lt
goto lf 
```

- *Comment combiner des représentation paresseuses $(p1,lt1,lf1)$ et
   $(p2,lt2,lf2)$ de deux expressions booléennes pour obtenir une
   représentation paresseuse de :*
   + *la négation de la première* `(p1,lf1,lt1)`
    + *leur conjonction* `(p1, lt1 : (p2, lt2, lf2), lf1 : goto lf2)`
   + *leur disjonction* `(p1, lt1 : (goto lt2, lt2, lf2), lf1:p2)`
- *En déduire un schéma récursif de traduction des expressions booléennes en
   représentation paresseuse qui s'appuit sur la syntaxe des arbres de ces
   expressions booléennes.*

```c
eval(e) -> triplet

constructeur : t(p,lt,lf)
label():génére étiquette
reg() : génère un resgique
accesseurs : op1(e), op2(e)
accesseurs : p(+), lt(p),  lf(p), (p, lt, lf) = eval(op1(e))
```

```c
eval(e)
    switch(e)
        case true 
            lt = label()
            return t("goto"+lt,lt,label())
        case false
            lf = label()
            return t("goto"+lf,label(),lf)
        case var 
            r=reg()
            lt = label()
            lf = label()
            return(r+"="+e+";" "if" + r + "goto" + lt + ";" "goto" + lf + ";", lt,lf)
        case negation
            t(p,lt,lf)=eval(op1(e))
            return t(p,lf,lt)
```

