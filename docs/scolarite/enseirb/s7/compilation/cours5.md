---
title: "Vidéo 6.2"
description: "Analyse ascendante par décalage-réduction : déroulé sur un exemple, conflits, table d'actions et manipulation des attributs sur la pile d'analyse."
---

Notes inspirées du cours de David Janin.

## Analyse par décalage-réduction

Considérons par exemple la grammaire :

```text
1. exp -> exp + exp
2. exp -> exp * exp
3. exp -> id
4. exp -> cte
5. exp -> (exp)
```

Tâchons de reconnaître l'entrée `id + id * id`. Nous allons construire un
tableau :

| Pile (ce qui a déjà été lu) | Entrée (ce qui reste à lire) | Action                                    |
|:----------------------------|:-----------------------------|:------------------------------------------|
|                             | id + id * id                 | Décalage                                  |
| id                          | + id * id                    | Réduction (3)                             |
| exp                         | + id * id                    | Déc +                                     |
| exp +                       | id * id                      | Déc id                                    |
| exp + id                    | * id                         | Réd (3)                                   |
| exp + exp                   | * id                         | Conflit Réd (1) ou Déc * : on décale      |
| exp + exp *                 | id                           | Déc id                                    |
| exp + exp * id              | EOF                          | Réd (3)                                   |
| exp + exp * exp             | EOF                          | Réd (2)                                   |
| exp + exp                   | EOF                          | Réd (1)                                   |
| exp                         | EOF                          | ACCEPT                                    |

Il s'agit d'un automate (analyseur) à pile. La pile contient des mots de
terminaux et de non-terminaux. Les transitions lisent au plus $k$ symboles en
sommet de pile (ici $k = 3$). Le conflit décalage/réduction est résolu en
faveur du décalage pour donner la priorité à `*` sur `+`.

On obtient ainsi une **table d'actions** (D : décalage, R(i) : réduction par la
règle i, E : erreur) :

| Sommet de pile \ Entrée | identifiant | constante | plus | fois | (   | )    |
|:------------------------|:------------|:----------|:-----|:-----|:----|:-----|
| Rien                    | D           | D         | E    | E    | D   | E    |
| id                      | E           | E         | R(3) | R(3) | E   | R(3) |
| cte                     | E           | E         | R(4) | R(4) | E   | R(4) |
| exp                     | E           | E         | D    | D    | E   | D    |
| exp + exp               | E           | E         | R(1) | D    | E   | R(1) |
| exp * exp               | E           | E         | R(2) | R(2) | E   | R(2) |
| (exp)                   | E           | E         | R(5) | R(5) | E   | R(5) |
| (                       | D           | D         | E    | E    | D   | E    |
| +                       | D           | D         | E    | E    | D   | E    |
| *                       | D           | D         | E    | E    | D   | E    |

## Attributs et pile d'analyse

Et les attributs : comment les manipuler en même temps qu'on fait l'analyse ? On
peut stocker sur la pile d'analyse les attributs en même temps que les
terminaux et non-terminaux, puis, lors d'une réduction
$X \rightarrow x_1 x_2 \dots x_n \; \{\$\$=f(\$1, \dots, \$n)\}$, calculer
l'attribut de $X$ à partir des attributs dépilés.

Les attributs synthétisés se calculent très facilement lors de l'analyse par
décalage-réduction.

Dernière remarque : on peut aussi accéder aux attributs se trouvant plus bas
dans la pile, avec `$0`, `$-1`... On peut utiliser ce principe pour produire du
code 3 adresses avec la grammaire ETF.
