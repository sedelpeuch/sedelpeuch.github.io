---
layout: page
hide: true
title: Travaux Dirigés Compilation - Feuille 1
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

Notes inspirées du cours de JANIN David et du [TD2](https://moodle.bordeaux-inp.fr/pluginfile.php/151721/mod_resource/content/1/td2.pdf) de Myriam Desainte-Catherine 

<style>
html {
 zoom: 0.80;
}
</style>

## Grammaires 

*Étant donné une grammaire $$G$$ de non terminal initial $$S$$ (start symbol) et
d'alphabet terminal $$T$$, on appelle langage défini par $$S$$ le langage* 

$$L(G)=\{w \in T^\ast \vert S \rightarrow^\ast w\}$$

*c'est à dire l'ensemble des mots de terminaux qui décrivent du non terminal
initial*.

### Exerice 1

*Proposer une grammaire qui permet, sur l'alphabet de terminaux $$\{a,b\}$$ de
définir le langage des mots de la forme $$a^n b^n$$ avec $$n \in \mathbb{N}$$.
Votre grammaire est-elle ambigüe ?*

```
S -> aSb
S -> eps
```

### Exercice 2

*Soit la grammaire*

```
(0) S -> e //mot vide
(1) S -> aB          (2) S -> bA
(3) A -> aS          (4) A -> bAA
(5) B -> bS          (6) B -> aBB
```

*définie avec les terminaux $$\{a,b\}$$, les non-terminaux $$\{S,A,B\}$$ et le
start symbol $$S$$* 

+ *Construire les arbres de dérivation de abba et aabb*



+ *Cette grammaire est elle ambigüe ?*

Elle n'est pas ambigüe

+ *Quel langage définit-elle ?*

$$(S) = \{ab,ba,\varpepsilon,...}$$ 
$$(A) = \{a, aab, aba, ...\}$$
$$(B) = \{b,bab,bba,...\}$$

## Conditionnelles 

On considère la grammaire COND définie par : 

```
I -> nop | C
C -> if B then I | if B then I else I
B -> id | true | false
```
avec les non-terminaux $$I$$ (instructions), $$C$$ (instructions
conditionnelles), $$B$$ (booléens) et les terminaux `id, true, false, nop, if,
then` et `else`. 

### Exercice 3. 

*Quel est le langage défini par cette grammaire ? Construire un arbre de
dérivation pour `if id then if id then nop else nop`. En existe-t-il un autre ?
Qu'en déduire ?*

![3](/assets/images/compilation/3.png){:class="image about center"}

### Exercice 4. 

*Proposer une grammaire non ambigüe permettant de définir le même langage. Votre grammaire
devra, comme dans le langage C, “forcer” l’association du “else” avec le “if-then” qui précède le plus proche qui
n’est pas déjà “fermé” par un “else”.*
