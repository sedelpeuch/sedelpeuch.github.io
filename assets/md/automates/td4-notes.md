---
layout: page
hide: true
title: <i class="fas fa-robot fa-2x"></i> Automates finis et application - TD3
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

## Exercice 1

## Exercice 2 
L'intuition naïve qu'on pourrait avoir serait "d'inverser" les résultats de chaque règle. Cependant, cette méthode génère en fait le miroir du langage de la grammaire de départ. A partir d'une grammaire linéaire droite $$G$$, on peut obtenir un automate fini $$A$$ qui accepte le langage de la grammaire. Ensuite, on calcucule l'automate $$A'$$ qui accepte le langage miroir, ce qui permet d'obtenir une grammaire linéaire droite $$G'$$. Enfin, on inverse "naïvement" $$G'$$ et on obteint une grammaire linéaire gauche $$G''$$ de même langage que $$G$$ (on peut bien sûr effectuer l'opération inverse). On peut aussi convertir en automate fini puis inverser les états initiaux et finaux du résultat, ainsi que toutes les transitions. 

Petite parenthèse sur un arbre de dérivation pour une grammaire régulière 

```
S -> aS | bT
T -> aT | bS | eps
```

Pour une génération $$S \Rightarrow aS \Rightarrow abT \Rightarrow a
