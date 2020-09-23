---
layout: page
hide: true
title: Base de données relationnelles
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

## Introduction au modèle relationnel 

### Présentation

Dans ce modèle, les données sont représentées par des tables, sans préjuger de
la façon dont les informations sont stockées dans la machine. Les tables
constituent donc la structure logique du modèle relationnel. Au niveau physique,
le système est libre d'utiliser n'importe quelle technique de stockage (fichiers
séquentiels, indexage, adressage dispersé, series de pointeurs, compression ...)
dès lors qu'il est possible de relier ces structures à des tables au niveau
logique. Les tables ne représentent donc pas qu'une abstraction de
l'enregistrement physique des données en mémoire. 

Le succès du modèle relationnel auprès des chercheurs, concepteurs et
utilisateurs est dû à la puissance et à la simplicité de ses concepts. En outre,
contrairement à certains autres modèles, il repose sur des bases théoriques
solides, notamment la théorie des ensembles et la logique des prédicats du
premier ordre. 

Les objectifs du modèle relationnel sont 
+ proposer des schémas de données faciles à utiliser
+ améliorer l'indépendance logique et physique 
+ mettre à la disposition des utilisateurs des langages de haut niveau
+ optimiser les accès à la base de données 
+ améliorer l'intégrité et la confidentialité
+ fournir une approche méthodologique dans la construction des schémas. 

De façon informelle, on peut définir la modèle relationnel de la manière
suivante 
+ les données sont organisées sous forme de tables à deux dimensions, encore
  appelées relations, dont les lignes sont appelées $$n$$-uplet ou tuple en
  anglais 
+ les données sont manipulées par des opérateurs de l'algèbre relationnelle 
+ l'état cohérent de la base est défini par un ensemble de contraintes
  d'intégrité
  
  Au modèle relationnel est associée a la théorie de la normalisation des
  relations qui permet de se débarasser des incohérences au moment de la
  conception d'une base de données relationnelle. 
  
### Éléments du modèle relationnel 

Un **attribut** est un identificateur (un nom) décrivant une information stockée
dans une base. 

Le **domaine** d'un attribut est l'ensemble, fini ou infini, de ses valeurs
possibles. 

Une **relation** est un sous-ensemble du produit cartésien de $$n$$ domaines
d'attributs ($$n >0$$).

Un **schéma de relation** précise le nom de la relation ainsi que la liste des
attributs avec leurs domaines. 

Le **degré** d'une relation est son nombre d'attributs

Une **occurence**, ou $$n$$-uplets, ou tuples, est une élément de l'ensemble
figuré par une relation. Autrement dit, une occurence est une ligne du tableau
qui représente la relation. 

La **Cardinalité** d'une relation est son nombre d'occurences. 

Une **clé candidate** est donc distince pour tous les tuples de la relation. La
notion de clé candidate est essentielle dans le modèle relationnel. 

**Règle 9** Toute relation a au moins une clé candidate et peut en avoir
plusieurs. 

Ainsi, il ne peut jamais y avoir deux tuples identiques au sein d'une relation.
Les clés candidates d'une relation n'ont pas forcément le même nombre 

