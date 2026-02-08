---
title: "Vidéo 6.2"
---

Notes inspirées du cours de JANIN David

Par exemple la grammaire

```
1. exp -> exp + exp
2. exp -> exp * exp
3. exp -> id
4. exp -> cte
5. exp -> (E)
```

Tachons de reconnaître l'entrée `id + id * id`. Nous allons fabriquer un tableau

| Pile (ce que j'ai déjà lu) | Entrée (qui reste à lire) | Action                  |
|:---------------------------|:--------------------------|:------------------------|
|                            | id + id * id              | Décalage                |
| id                         | + id * id                 | Réduction (3)           |
| exp                        | + id * id                 | Dec +                   |
| exp +                      | id * id                   | Dec id                  |
| exp + id                   | * id                      | Red (3)                 |
| exp + exp                  | * id                      | Conflit Red(1) ou Dec * |
| exp + exp *                | id                        | Dec id                  |
| exp + exp * id             | EOF                       | Red(3)                  |
| exp + exp * exp            |                           | Red(2)                  |
| exp + exp                  |                           | Red(1)                  |
| exp                        | EOF                       | ACCEPT                  |

Là nous avons un automate / analyseur à pile. La pile contient des mots
terminaux et non terminaux. Les transitions lisent au plus k symboles en somme
de pile (ici k = 3).

Ici on a une **table d'action**.

| Sommet de pile \ Entrée | identifiant | constante | plus | fois | ( | )    |
|:------------------------|:------------|:----------|:-----|:-----|:--|:-----|
| Rien                    | D           | D         | E    | E    | D | E    |
| Id                      | E           | E         | R(3) | R(3) | E | R(3) |
| cste                    | E           | E         | R(4) | R(4) | E | R(4) |
| exp                     | E           | E         | D    | D    | E | D    |
| exp + exp               | E           | E         | R(1) | D    | E | D    |
| exp * exp               | E           | E         | R(2) | R(2) | E | R(2) |
| (exp)                   | E           | E         | R(5) | R(5) | E | R(5) |
| (                       | D           | D         | E    | E    | D | E    |
| +                       | D           | D         | E    | E    | D | E    |
| *                       | D           | D         | E    | E    | D | E    |

Et les attributs : comment les manipuler en même temps qu'on fait l'analyse ? On
peut stocker sur la pile d'analyse les attributs en même temps que les terminaux
et non terminaux. Puis faire une réduction $x \rightarrow x_1, x_2, ... x_n;
\{\$\$=f(\$1, ... , \$n)\}$

Les attributs synthétisés se calculent très facilement lors de l'analyse par
décalage réduction.
Dernière remarque : on peut aussi accéder aux attributs se trouvant avant dans
la pile, avec 0, -1 ... Ou a utiliser ce principe pour produire du
code 3 adresses avec la grammaire ETC.
