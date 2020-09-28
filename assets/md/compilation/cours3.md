---
layout: page
hide: true
title: Analyse syntaxique
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

Notes inspirées du cours de JANIN David 

<style>
html {
 zoom: 0.80;
}
</style>

## Grammaires formelles 

Une grammaire $$G$$ est définie par : 
+ une ensemble de variables $$V$$ (non terminaux, lettres majuscules)
+ un ensemble de symboles terminaux $$T$$ (lexèmes, lettres minuscules)
+ un symbole initial $$S \in V$$ 
+ Règles de réécriture du type $$\alpha \rightarrow \beta$$ avec $$\alpha,
  \beta$$ des mots de variables /terminaux. 
  
Le langage $$\mathcal{L}(G)$$ engendré par $$G$$ est l'ensemble des mots
produits de $$T^\ast$$ par toutes les réécritures possibles à partir de $$S$$. 

Une grammaire permet de définir formellement un langage (informatique ou
naturel). Cela permet de reconnaître les phrases correctes (structurer les
phrases, identifier le rôle des lexèmes dans la phrase). Mais aussi de pouvoir
générer des phrases correctes.  
