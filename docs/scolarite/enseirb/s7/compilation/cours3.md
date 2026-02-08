---
title: "Vidéo 4"
---

Notes inspirées du cours de JANIN David

## Exemple des expressions arithmétiques

Une grammaire reconnaissant les expressions arithmétiques se reconnaît avec les
expressions suivantes

1. exp -> ID
2. exp -> Cste
3. exp -> exp + exp
4. exp -> exp * exp
5. exp -> (exp)

Ces 5 règles sont appelées les règle de grammaire ou règle de production. Dans
ces règles on distingue :

+ les **terminaux** $T={ID,CSTE,+,\*,(,)}$ ce sont les unités lexicales (aussi
  appelées tokens) qui sont données en entrée de l'analyseur. C'est un dire,
  c'est une suite / un mot de terminaux, donc dans $T*$
+ les **non-terminaux** $N=\{exp\}$, ce sont les ensembles de mots de
  terminaux qu'on souhaite construire ou définir
+ les règles de production sont : qui peuvent être lue comme des inclusion
  ensemblistes (partie de $T^\ast$)

`Théorème :` Ce type d'inéquation admet une plus petite solution.

**Idée de preuve :** Soit $F(exp) = \bigcup \text{parties droite de règle}$

$\{F: \mathcal{P}^n(T^\ast) \rightarrow \mathcal{P}(T^\ast)\}_{i \in [1,n]}$ avec $n$ le
nombre de terminaux. Le constat est que si $F$ est croissant c'est à dire si
$x$ et $y \subset T^\ast$ et si $X \subseteq Y$ alors $F(x) \subseteq
F(Y)$. Il est alors facile de vérifier que

$\emptyset \subseteq F(\emptyset) \subseteq F(F(\emptyset)) \subset ... \subset
F^n(\emptyset)$ et que $exp = \bigcup \limits_{n \in \mathbb{N}}
F^n(\emptyset)$ on a $exp=F(exp)$, on dit que exp est un point fixe de $F$ et
exp est le plus petit de ces point fixes. Si $Y \subseteq T^\ast$ est un point
fixe de $F$, on a

$$Y = F (Y)$$

mais comme $\emptyset \subseteq Y$ on a, par récurrence, $F^n(\emptyset)
\subseteq Y$ et donc $\bigcup \limits_{n \in \mathbb{N}} F^n(\emptyset) = exp
\subseteq Y$

## Exemple d'utilisation de cette grammaire

Analyse syntaxique de $2 \times x + y$, l'analyseur va reconnaître 2 comme une
constance, $\times$ comme *, $x$ comme un ID, $+$ comme + et $y$ comme
un ID. Comment pouvons nous vérifier que cette expression appartient bien au
langage. Vérifions que cste*ID+ID est bien une entrée syntaxique correcte selon
la grammaire.

### Suite de dérivations (gauche) de $exp \rightarrow cste \times ID + ID$

#### Remarques

+ Dés qu'un terminal est généré ou engendré par une règle, on ne peut plus
  l'effacer
+ il coupe implicitement l'entrée en ce qui se trouve à gauche et ce qui se
  trouve à droite.

---

En pendant compilation, on peut avoir l'impression que cette suite de dérivation
induit syntaxiquement une "priorité" sur les opérateurs binaires + et *

$$\underbrace{CSTE \times ID}{exp} \underbrace{+}{exp} \underbrace{ID}{exp}$$

Est ce satisfaisant ? Presque ... Expliciter la syntaxe, c'est bien. Mais, cette
grammaire est ambigüe. Il y a au moins deux syntaxes possibles pour CST * ID +
ID.

Cela est toujours une suite de dérivation gauche, mais la structure syntaxique
induite est plutôt $\underbrace{CSTE}{exp} \times \overbrace{\underbrace{ID +
ID}_{exp}}^{\text{parenthèses implicites}}$

`Définition :` Une grammaire est dites ambigüe lorsqu'il existe deux suites de
dérivations gauches, distinctes, à partir du start symbol, qui produisent la
même entrée.

En compilation, on ne veut pas ça ! En effet on va faire de la traduction
dirigée par la syntaxe. Deux syntaxes possibles donneront deux codes différents.
Exemple $(2 \times x) + y \neq 2 \times (x + y)$. En compilation, on n'utilise
que des grammaires non ambigüe.

### Arbre de dérivations

Sur le même exemple $2 \times x + y$

Ceci est un arbre de dérivation, aussi appelé arbre de syntaxe concret.
Autrement, un arbre de dérivations c'est un arbre dont :

+ les sommets sont étiquetés sur TON
+ les embranchements définis par des règles de productions
+ les feuilles étiquetées sur T
+ la racine étiquetée par le start symbol

#### Remarque

Il y a bijection entre arbre de dérivation et suites de dérivations gauches. Les
suites de dérivations gauches sont exactement les parcours en profondeur, à
gauche d'abord préfixe, des arbres de dérivations.

Essayer de construire un arbre de dérivation pour $(ID ID +) \notin exp$ est impossible

---

`Définition :` Une grammaire est ambigüe lorsque il existe deux arbres de
dérivations pour une même entrée (un même mot de terminaux).

La grammaire ci-dessus quoique ambigüe, a tout de même le mérite de définir
correctement les expressions arithmétiques. Cependant, ces expressions
peuvent-elle être définies par une grammaire non ambigüe ?

## Une première grammaire non ambigüe

Idée : distinguer dans les expressions arithmétiques les termes qui composent
les sommes de facteurs qui composent les produits. Autrement dit nous allons
utiliser 3 noms terminaux.

$exp \rightarrow \text{expressions arithmétiques}$
$term \rightarrow \text{termes dans une somme}$
$fact \rightarrow \text{facteurs dans un produit}$

$N = \{exp,term,fact\}$exp

Avec $exp$ comme start symbol. Les règles de cette grammaire :

1. exp -> term
2. exp -> exp + term
3. term -> fact
4. term -> term * fact
5. fact -> ID
6. fact -> CSTE
7. fact -> (exp)

Pas d'ambiguité ? Nous voulons toujours dériver $2 \times x + y$ ie CSTE *
ID + ID.

Cet arbre est le seul arbre de dérivation possible ! Le parenthésage induit par
cet arbre est bien $(2 \times x) + y$. Nous avons donc notre grammaire pour la
compilation. La grammaire utilisée s'appelle la grammaire ETF. Autre grammaire ?

1. $E \rightarrow TE'$
2. $E' \rightarrow \epsilon$ //mot vide
3. $E' \rightarrow +TE'$
4. $T \rightarrow FT'$
5. $ T' \rightarrow \epsilon$ //mot vide
6. $ T' \rightarrow +FT'$
7. $F \rightarrow ID$
8. $F \rightarrow CSTE$
9. $F \rightarrow (E)$

On peut vérifier que cette grammaire engendre aussi les mêmes expressions
arithmétiques et qu'elle n'est pas ambigüe.
