---
layout: page
hide: true
title: Introduction
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

## <i class="fas fa-laptop"></i> Introduction 

### Intérêt de la compilation

+ Outil incontournable, quelque soit le langage informatique
+ Meilleure connaissance des compilateurs implique une meilleure programmation
+ Techniques de compilation réutilisables dans nombreux contextes (notamment
  analyse de code)
+ Définition : *Un compilateur est un programme qui prend en entrée un programme
  et le transforme en un autre programme. Un interpréteur est un programme qui
  prend en entrée un programme et l'exécute*

### Objectifs possibles du compilateur

+ Préserver la sémantique (obligatoire)
+ Générer un code le plus rapidement possible 
+ Trouver toutes les erreurs lexicales, syntaxiques et sémantiques (prouver que
  le code généré est correct, que le code d'entrée respecte une spec)
+ Générer un code (s'exécutant le plus rapidement possible, consommant le moins
  d'énergie possible, le plus petit possible)
  
  
Obtenir un code avec la meilleure performance ou le plus petit binaire est
difficile. 
- Évolution constante de la complexité des compilateurs 
- En général, code compilé meilleur que code généré à la main 
- Possible de guider le compilateur avec des options / paramètres / pragmas 

## <i class="fas fa-laptop"></i> Structure du compilateur 

### Décomposition en couches 

![compilateur](/assets/images/compilation/compil.png){:class="image about right"}
1. Analyse lexicale : lit le programme reconnaît chaque mot
2. Analyse syntaxique : vérifie la grammaire 
3. Analyse sémantique : vérifie le sens du programme (exemple : types)
4. Représentation intermédiaire (RI) : une interface séparant les front-end,
   middle-end et back-end du compilateur

