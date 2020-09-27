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

1. *Construire les arbres de dérivation de abba et aabb*
2. *Cette grammaire est elle ambigüe ?*
