---
title: "Algèbre relationnelle"
---

## Introduction

L'algèbre relationnelle est un support mathématique cohérent sur lequel repose
le modèle relationnel. L'objet de cette section est d'aborder l'algèbre
relationnelle dans le but de décrire les opérations qu'il est possible
d'appliquer sur des relations pour produire de nouvelles relations. L'approche
suivie est donc plus opérationnelle que mathématique.

On peut distinguer 3 familles d'opérateurs relationnels

+ Les opérateurs unaires (Sélection, Projection) : ce sont les opérateurs les
  plus simples, ils permettent de produire une nouvelle table à partir d'une
  autre table
+ Les opérateurs binaires ensemblistes (Union, Intersection Différence) : ces
  opérateurs permettent de produire une nouvelle relation à partir de
  deux relations de même degré et de même domaine
+ Les opérateurs binaires ou n-aires (Produit cartésien, Jointure, Division) :
  ils permettent de produire une nouvelle table à partir de deux ou plusieurs
  autres tables.

  Les notations ne sont pas standardisées en algèbre relationnelle. Ce cours
  utilise des notations courantes, mais donc pas forcément universelles.

  Les notations ne sont pas standardisées en algèbre relationnelle. Ce cours
  utilise donc des notations courantes, mais donc pas forcément universelles.

## Sélection

`Sélection :` La sélection (parfois appelée restriction) génère une relation
regroupant exclusivement toutes les occurrences de la relation $R$ qui
satisfont l'expression logique $E$, on la note $\sigma(E)R$. Il s'agit d'une
opération unaire essentielle dont la signature est

$ \text{relation} \times \text{expression logique} \rightarrow \text{relation}
$

En d'autres termes, la sélection permet de choisir (ie de sélectionner) des
lignes dans le tableau. Le résultat de la sélection est donc une nouvelle
relation qui a les mêmes attributs que $R$. Si $R$ est vide (ie ne contient
aucune occurrence), la relation qui résulte de la sélection est vide.

| Numéro | Nom     | Prénom     |
|:-------|:--------|:-----------|
| 5      | Durand  | Caroline   |
| 1      | Germain | Stan       |
| 12     | Dupont  | Lisa       |
| 3      | Germain | Rose-Marie |

| Numéro | Nom    | Prénom   |
|:-------|:-------|:---------|
| 5      | Durand | Caroline |
| 12     | Dupont | Lisa     |

## Projection

`Projection :` La projection consiste à supprimer les attributs autres que
$A_1, ... , A_n$ d'une relation et à éliminer kes $n$-uplets en double
apparaissant dans la nouvelle relation, on la note $\Pi(A_1,...,A_n R$.

Il s'agit d'une opération unaire essentielle dont la signature est :

$\text{relation} \times \text{liste d'attributs} \rightarrow \text{relation}$

En d'autres termes, la projection permet de choisir des colonnes dans le
tableau. Si $R$ est vide, la relation qui résultat de la projection est vide,
mais pas forcément équivalente (elle contient généralement moins d'attributs).

| Nom     |
|:--------|
| Durand  |
| Germain |
| Dupont  |

## Union

`Union :` L'union est une opération portant sur deux relations $R_1$ et
$R_2$ ayant le même schéma et construisant une troisième relation constituée
des $n$-uplets appartenant à chacune des deux relations $R_1$ et $R_2$
sans doublon, on la note $R_1 \cup R_2$. Il s'agit une opération binaire
ensembliste commutative essentielle dont la signature est

$\text{relation} \times \text{relation} \rightarrow \text{relation}$

Comme nous l'avons déjà dit, $R_1$ et $R_2$ doivent avoir les mêmes
attributs et si une même occurrence existe dans $R_1$ et $R_2$, elle
n'apparaît qu'une seule fois dans le résultat de l'union. Le résultat de l'union
est une nouvelle relation qui a les mêmes attributs et si une même occurrence
existe dans $R_1$ et $R_2$, elle n'apparaît qu'une seule fois dans le
résultat de l'union. Le résultat de l'union est une nouvelle relation qui a les
mêmes attributs que $R_1$ et $R_2$. Si $R_1$ et $R_2$ sont vides, la
relation qui résulte de l'union est vide. Si $R_1$ (respectivement $R_2$)
est vide, la relation qui résulte de l'union est identique à $R_2$
(respectivement $R_1$).

## Intersection

`Intersection :` L'intersection est une opération portant sur deux relations
$R_1$ et $R_2$ ayant le même schéma et construisant une troisième relation
dont les $n$-uplets sont constitués de ceu appartenant aux deux relations, on
la note $R_1 \cap R_2$. Il s'agit d'une opération binaire ensemble commutative
dont la signature est

$\text{relation} \times \text{relation} \rightarrow \text{relation}$

Comme nous l'avons déjà dit $R_1$ et $R_2$ doivent avoir les mêmes
attributs. Le résultat de l'intersection est une nouvelle relation qui a les
mêmes attributs que $R_1$ et $R_2$. Si $R_1$ ou $R_2$ ou les deux sont
vides, la relation qui résulte de l'intersection est vide.

## Différence

`Différence :` La différence est une opération portant sur deux relations
$R_1$ et $R_2$ ayant le même schéma et construisant une troisième relation
dont les $n$-uplets sont constitués de ceux ne se trouvant que dans la
relation $R_1$ : on la note $R_1 - R_2$. Il s'agit d'une opération binaire
ensembliste non commutative essentielle dont la signature est

$\text{relation} \times \text{relation} \rightarrow \text{relation}$

Comme nous l'avons déjà dit, $R_1$ et $R_2$ doivent avoir les mêmes
attributs. Le résultat de la différence est une nouvelle relation qui a les
mêmes attributs que $R_1$ et $R_2$. Si $R_1$ est vide, la relation qui
résulte de la différence est vide. Si $R_2$ est vide, la relation qui résulte
de la différence est identique à $R_1$.

## Produit catésien

`Produit cartésien :` Le produit cartésien est une opération portant sur deux
relations $R_1$ et $R_2$ et qui construit une troisième relation regroupant
exclusivement toutes les possiblités de combinaison des occurences des relations
$R_1$ et $R_2$, on la note $R_1 \times R_2$.

Il s'agit une opération binaire commutative essentielle dont la signature est

$\text{relation} \times \text{relation} \rightarrow \text{relation}$

Le résultat du produit cartésien est une nouvelle relation qui a tous les
attributs de $R_1$ et tous ceux de $R_2$. Si $R_1$ ou $R_2$ ou les deux
sont vides, la relation qui résulte du produit cartésien est vide. Le nombre
d'occurrences de la relation qui résulte du produit cartésien est le nombre
d'occurrences de $R_1$ multiplié par le nombre d'occurrences de $R_2$.

## Jointure, théta-jointure, équijointure, jointure naturelle

### Jointure

`Jointure :` La jointure est une opération portant sur deux relations $R_1$ et
$R_2$ qui construit une troisième relation regroupant-exclusivement toutes les
possibilités de combinaire des occurences des relations $R_1$ et $R_2$ qui
satisfont l'expression logique $E$. La jointure est notée $R_1 \rhd \lhd E
R_2$. Il s'agit d'une opérations binaire commutative dont la signature est

$\text{relation} \times \text{relation} \times \text{expression logique}
\rightarrow \text{relation}$

Si $R_1$ ou $R_2$ ou les deux sont vides, la relation qui résulte de la
jointure est vide. En fait, la jointure n'est rien d'autre qu'un produit
cartésien suivi d'une sélection

$R_1 \rhd \lhd E R_2 = \sigma E (R_1 \times R_2)$

### Théta-jointure

`Théta-jointure :` Une thêta-jointure est une jointure dans laquelle l'expression
logique $E$ est une simple comparaison entre un attribut $A_1$ de la
relation $R_1$ et un attribut $A_2$ de la relation $R_2$. La
thêta-jointure est notée $R_1 \rhd \lhd E R_2$.

### Équijointure

`Équijointure :` Une équijointure est une thêta-jointure dans laquelle
l'expression logique $E$ est un test d'égalité entre un attribut $A_1$ de la
relation $R_1$ et un attribut $A_2$ de la relation $R_2$. L'équijointure
est notée $R_1 \rhd \lhd A_1 A_2 R_2$.

### Jointure naturelle

`Jointure naturelle :` Une jointure naturelle est une jointure dans laquelle
l'expression logique E est un test d'égalité entre les attributs qui portent le
même nom dans les relations $R_1$ et $R_2$. Dans la relation construite, ces
attributs ne sont pas dupliqués, mais fusionnés en une seule colonne par couple
d'attributs. La jointure naturelle est notée $R_1 \rhd \lhd R_2$. On peut
préciser explicitement les attributs communs à $R_1$ et $R_2$ sur lesquels
porte la jointure : $R_1 \rhd \lhd A_1,… A_n R_2$.

Généralement, $R_1$ et $R_2$ n'ont qu'un attribut en commun. Dans ce cas, une jointure naturelle est équivalente à une équijointure dans laquelle l'attribut de $R_1$ et celui de $R_2$ sont justement les deux attributs qui portent le même nom.

Lorsque l'on désire effectuer une jointure naturelle entre $R_1$ et $R_2$
sur un attribut $A_1$ commun à $R_1$ et $R_2$, il vaut mieux écrire $R_1
\rhd \lhd A_1 R_2$ que $R_1 \rhd \lhd R_2$. En effet, si $R_1$ et $R_2$
possèdent deux attributs portant un nom commun, A1 et A2, R1 ▷◁A1 R2 est bien
une jointure naturelle sur l'attribut A1, mais R1 ▷◁ R2 est une jointure
naturelle sur le couple d'attributs A1, A2, ce qui produit un résultat très
différent !

### Division

`Division :` La division est une opération portant sur deux relations $R_1$ et
$R_2$ telles que le schéma de $R_2$ est strictement inclus dans celui de
$R_1$, qui génère une troisième relation regroupant toutes les parties
d'occurences de la relation $R_1$ qui sont associées à toutes les occurences
de la relation $R_2$; on la notre $R_1 / R_2$. Il s'agit d'une opération
binaire non commutative dont la signature est

$\text{relation} \times \text{relation} \rightarrow relation$

Autrement dit, la division de $R_1$ par $R_2$ génère une relation que
regroupe tous les $n$-uplets qui, concaténés à chacun des $n$-uplets de
$R_2$, donnent toujours un $n$-uplet de $R_1$. La relation $R_2$ ne peut
pas être vide. Tous les attributs de $R_2$ doivent être présents dans $R_1$
et $R_1$ doit posséder au moins un attribut de plus que $R_2$ (inclusion
stricte). Le résultat de la division est une nouvelle relation qui a tous les
attributs de $R_1$ sans aucun de ceux de $R_2$. Si $R_1$ est vide, la
relation qui résulte de la division est vide.
