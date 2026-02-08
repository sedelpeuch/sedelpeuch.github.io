---
title: "Vidéo 7.1"
---

Notes inspirées du cours de JANIN David

## Outils et astuces pour l'analyse sémantique et la production de code

Comme vu en TD, avec un analyseur de décalage / réduction on construit /
parcours les Arbres de Dérivation des feuilles vers la racine, de gauche à
droite.

L'analyse sémantique et la production sont réalisées dans les actions
sémantiques. Deux types d'actions sémantique :

1. Dans l'analyseur lexial (lex) : A partir de la valeur lexicale d'un lexême (yytext) permet de produire la valeur
   d'attribut du lexême (yylval). On agit donc sur les terminaux de la grammaire.
2. Dans l'analyseur syntaxique (Yacc) : Pour chaque règle, à partir des valeurs
   d'attributs des élément à droite de la règle calcul
   de l'attribut du non terminal à gauche

Remarque : on a la possibilité de faire du transfert d'information de la gauche
vers la droite de l'arbre via :

+ La pile d'analyse
+ Variable globale, accédée / modifiée dans les actions sémantiques par effet de
  bord -> gestion de la table des symboles (quels entités visibles à chaque avec
  quelles propriétés)

Attention : on préférera la récursion gauche pour que tous les symboles vue
"avant" aient déjà été traités. Autrement dit, la récursion gauche privilégie un
traitement de gauche à droite (sens de lecture)

Noeuds internes avec récursion gauche.

![](./img/61.png)

Dans le cas d'une récursion droite

![](./img/62.png)

Moins confortable pour le traitement des actions sémantiques liée aux appels
récursifs.

Dans ces actions sémantiques, en s'aidant de la table des symboles, on pourrait

+ analyse de noms (associer chaque utilisation de variable à une définition /
  déclaration)
+ analyse de type (type = information statique, c'est à dire avant exécution,
  qu'on peut obtenir sur une entité c'est à dire une variable)

Pour l'analyse de type on peut

+ Vérifie un type (en C)
+ inférer le type le plus général (OCAML, HASKELL)

Les types sont "ordonnés" en semi-treillis. Etant deux types A et B, il existe
toujours le type A & B qui est le type le plus général "compatible" avec A
et B
