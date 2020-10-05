---
layout: page
hide: true
title: Langage SQL
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

Notes inspirées du
[cours](https://moodle.bordeaux-inp.fr/pluginfile.php/96806/mod_resource/content/4/cours_conception-20.pdf)
de M.Mosbah et S.Lombardy 

<style>
html {
 zoom: 0.80;
}
</style>

## Intrduction 

### Présentation générale 

#### Introduction. 

Le langage SQL (Structured Query Language) peut être considér comme le langage
d'accès normalisé aux bases de données. Il est aujourd'hui supporté par la
plupart des produits commerciaux que ce soit par les systèmes de gestions de
base de données micro tel que Access ou par les produits plus professionnels
tels que Oracle. Il a fait l'objet de plusieurs normes ANSI/ISO dont la plus
répandue aujourd'hui est la norme SQL2 qui a été définie en 1992. 

Le succès du langage SQL est dû essentiellement à sa simplicité et au fait qu'il
s'appuie sur le schéma conceptuel pour énoncer des requêtes en laissant le SGBD
responsable de la stratégie d'exécution. Le langage SQL propose un langage de
requêtes ensembliste et assertionnel. Néanmoins, le langage SQL ne possède pas
la puissance d'une langage de programmation : entrées / sorties, instructions
conditionnelles, boucles et affectations. Pour certains traitements il est donc
nécessaire de coupler le langage SQL avec un langage de programmation plus
complet. 

De manière synthétique, on peut dire que SQL est un langage relationnel, il
manipule donc des tables (ie des relations, c'est à dire des ensembles) par
l'intermédiaire de requêtes qui produisent également des tables.

### Catégories d'instructions 

Les instructions SQL sont regroupées en catégories en fonction de leur utilité
et des entités manipulées. Nous pouvons distinguer cinq catégories, qui
permettent : 
1. la définition des éléments d'une base de données (tables, colonnes, clés,
   index, contraintes ...)
2. la manipulation des données (insertion, suppression, modification,
   extraction)
3. la gestion des droits d'accès aux données (acquisition et révocation des
   droits)
4. la gestion des transactions 
5. et enfin le SQL intégré
