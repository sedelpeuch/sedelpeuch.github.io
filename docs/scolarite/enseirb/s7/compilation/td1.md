---
title: "TD - Feuille 1"
description: "TD de compilation : code 3 adresses pour les expressions, nombre de registres nécessaires, schémas de compilation des instructions de contrôle et compilation paresseuse des booléens."
tags: ["Compilation"]
---

Notes inspirées du cours de David Janin et du TD de Myriam Desainte-Catherine.

## Compilation des expressions

### Exercice 1

*Donner une majoration du nombre d'accès mémoire (adresses) nécessaires à
l'évaluation des instructions C suivantes :*

1. `x = (y1 + y2) + y3` : 4 accès (3 lectures et 1 écriture)

2. `y = *(px++)` : 4 accès (2 lectures, `px` et `*px`, et 2 écritures, `y` et
   `px` incrémenté)

3. `*(px+3)=*(px+y)+z` : au plus 6 accès (5 lectures, si `px` est relu, et 1
   écriture)

*Proposer pour chacune des lignes de code ci-dessus une compilation en trois
adresses. Indication : on pourra réutiliser verbatim les noms de variables
apparaissant dans ces expressions, dites variables utilisateurs, en ajoutant
autant de registres compilateurs que souhaité.*

```text
// x = (y1 + y2) + y3
r1 = y1
r2 = y2
r1 = r1 + r2
r2 = y3
r1 = r1 + r2
x = r1
```

La post-incrémentation déréférence l'ancienne valeur de `px`, puis écrit la
valeur incrémentée dans `px` :

```text
// y = *(px++)
r1 = px
r2 = *r1
y = r2
r1 = r1 + 1
px = r1
```

```text
// *(px+3) = *(px+y) + z
r1 = px
r2 = y
r3 = z
r2 = r1 + r2
r4 = *r2
r4 = r4 + r3
r1 = r1 + 3
*r1 = r4
```

### Exercice 2

*Compiler les instructions*

1. `x = y1 + ( y2 * ( y3 + (y4 * y5) ) )`
2. `x = (((y1 + y2) * y3 ) + y4) * y5`
3. `((y1 + y2) * (y3 + y4)) + ((y3 + y1) * (y2 + y5))`

*Combien de registres utilisez-vous ? Sont-ils nécessaires ? Peut-on facilement
automatiser leur optimisation ?*

```text
// x = y1 + (y2 * (y3 + (y4 * y5)))   -> 2 registres
r1 = y4
r2 = y5
r1 = r1 * r2
r2 = y3
r2 = r2 + r1
r1 = y2
r2 = r1 * r2
r1 = y1
r2 = r1 + r2
x = r2
```

```text
// x = (((y1 + y2) * y3) + y4) * y5   -> 2 registres
r1 = y1
r2 = y2
r1 = r1 + r2
r2 = y3
r1 = r1 * r2
r2 = y4
r1 = r1 + r2
r2 = y5
r1 = r1 * r2
x = r1
```

```text
// ((y1 + y2) * (y3 + y4)) + ((y3 + y1) * (y2 + y5))   -> 4 registres
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
r2 = r2 * r3
r3 = r1 + r2
```

Pour déterminer le nombre de registres nécessaires, on dessine l'arbre des
opérations. Pour un nœud binaire, soit $n$ et $m$ le nombre de registres
nécessaires à l'évaluation de chacun de ses deux sous-arbres (une feuille en
demande 1) :

- si $n = m$, il faut $n+1$ registres ;
- si $n \neq m$, il faut $\max(n,m)$ registres, à condition d'évaluer d'abord
  le sous-arbre le plus exigeant.

Ce calcul (nombre d'Ershov, algorithme de Sethi-Ullman) s'automatise
facilement par un parcours postfixe de l'arbre.

## Compilation des instructions de contrôle

### Exercice 3

*Proposer un schéma de compilation en code 3 adresses pour les instructions de
contrôle apparaissant dans les exemples suivants*

```text
if x then y = 0;
if b then x = 1 else x = 2;
while (x < 100) do x = x +1;
repeat x = x + 1 while x < 100;
do x = x + 2 until x == 100;
```

## Compilation « paresseuse » des booléens

### Exercice 4

*En supposant l'expression booléenne $b$ compilée comme ci-dessus, proposer un
schéma de traduction des flots de contrôle.*

On pose $b = \langle p , lt , lf \rangle$, avec $p$ un code à 3 adresses qui
se branche sur $lt$ si $b$ est vrai et sur $lf$ sinon.

```text
if b then p1;

    p
lt : p1
lf : nop

if b then p1 else p2;

    p
    lt : p1
        goto fin
    lf : p2
    fin : nop

while b do p1;

    debut : p
    lt : p1
        goto debut
    lf : nop

do p1 until b;

    lf : p1
    p
    lt : nop
```

### Exercice 5

- *Donner une représentation « paresseuse » des booléens constants true et
  false*

**true** : `(goto lt, lt, lf)`

**false** : `(goto lf, lt, lf)`

- *Donner une représentation « paresseuse » d'une variable de type booléen*

```text
r = x
if r goto lt
goto lf
```

- *Comment combiner des représentations paresseuses $(p1,lt1,lf1)$ et
   $(p2,lt2,lf2)$ de deux expressions booléennes pour obtenir une
   représentation paresseuse de :*
  - *la négation de la première* : `(p1, lf1, lt1)`
  - *leur conjonction* : `(p1 ; lt1: p2 ; lf1: goto lf2, lt2, lf2)`
  - *leur disjonction* : `(p1 ; lf1: p2 ; lt1: goto lt2, lt2, lf2)`
- *En déduire un schéma récursif de traduction des expressions booléennes en
   représentation paresseuse qui s'appuie sur la syntaxe des arbres de ces
   expressions booléennes.*

```text
eval(e) -> triplet

constructeur : t(p, lt, lf)
label()      : génère une étiquette
reg()        : génère un registre
accesseurs   : op1(e), op2(e)
accesseurs   : p(t), lt(t), lf(t), (p, lt, lf) = eval(op1(e))
```

```text
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
