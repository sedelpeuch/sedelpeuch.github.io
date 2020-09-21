---
layout: page
hide: true
title: Travaux Dirigés Compilation - Feuille 1
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

Notes inspirées du cours de JANIN David et du TD de Myriam Desainte-Catherine 

<style>
html {
 zoom: 0.80;
}
</style>

## Préliminaire 

Le langage cible utilisé ici est du code 3 adresses c'est à dire un
sous-ensemble d'instructions C qui ne manipulent que trois adresses au plus.
Intuitivement, une adresse correspond à un accès mémoire, en lecture ou en
écriture. Dans ce code, on manipule des variables de types simples ()

TODO : finir le recopiage

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


```
x = (y1 + y2) + y3

ri1 = y1 
ri2 = y2 
ri1 = ri1 + ri2 
ri2 = y3
r1 = ri1 + ri2
x = r1
```

```
y = *(px++)

ri1 = px
ri1 = ri1 +1 
ri2 = * r1 
y = r2
```

```
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

```
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

```
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

```
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
opérations, il se dégage 2 branches une avec $$n$$ opération et une avec $$m$$.
ensuite si $$n=m$$ alors il y a $$n+1$$ registres nécessaire 

Si $$n \neq m$$ alors il y a $$max(n,m)$$ registres nécessaire 



## Compilation des instructions de contrôle 

### Exercice 3

*Proposer un schéma de compilation en code 3 adresses pour les instructions de
contrôle apparaissant dans les exemples suivants*

```
if x then y = 0;
if b then x = 1 else x = 2; 
while (x < 100) do x = x +1; 
repeat x = x + 1 while x < 100;
do x = x + 2 until x == 100;
```



