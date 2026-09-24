---
title: "Vidéo 4"
description: "Grammaires algébriques : règles de production, plus petit point fixe, dérivations gauches, arbres de dérivation, ambiguïté et grammaire ETF des expressions arithmétiques."
---

Notes inspirées du cours de David Janin.

## Exemple des expressions arithmétiques

Une grammaire engendrant les expressions arithmétiques peut s'écrire avec les
règles suivantes :

```text
1. exp -> ID
2. exp -> CSTE
3. exp -> exp + exp
4. exp -> exp * exp
5. exp -> (exp)
```

Ces 5 règles sont appelées les règles de grammaire ou règles de production.
Dans ces règles, on distingue :

+ les **terminaux** $T=\{\mathrm{ID},\mathrm{CSTE},+,\ast,(,)\}$ : ce sont les
  unités lexicales (aussi appelées tokens) données en entrée de l'analyseur.
  L'entrée est donc une suite (un mot) de terminaux, élément de $T^\ast$ ;
+ les **non-terminaux** $N=\{exp\}$ : ce sont les ensembles de mots de
  terminaux qu'on souhaite construire ou définir ;
+ les règles de production, qui peuvent être lues comme des inclusions
  ensemblistes entre parties de $T^\ast$ (par exemple
  $exp \supseteq exp + exp$).

`Théorème :` ce système d'inéquations admet une plus petite solution.

**Idée de preuve :** soit $F(exp) = \bigcup \text{parties droites des règles}$,
et plus généralement $F_i : \mathcal{P}(T^\ast)^n \rightarrow \mathcal{P}(T^\ast)$
pour $i \in [1,n]$, avec $n$ le nombre de non-terminaux. Le constat est que $F$
est croissante, c'est-à-dire que si $X \subseteq Y \subseteq T^\ast$, alors
$F(X) \subseteq F(Y)$. Il est alors facile de vérifier que

$$
\emptyset \subseteq F(\emptyset) \subseteq F(F(\emptyset)) \subseteq \dots
\subseteq F^n(\emptyset) \subseteq \dots
$$

En posant $exp = \bigcup\limits_{n \in \mathbb{N}} F^n(\emptyset)$ (et comme
$F$ commute avec les unions de suites croissantes), on a $exp=F(exp)$ : on dit
que $exp$ est un point fixe de $F$, et c'est le plus petit de ces points fixes.
En effet, si $Y \subseteq T^\ast$ est un point fixe de $F$, on a

$$Y = F(Y)$$

mais comme $\emptyset \subseteq Y$, on a, par récurrence,
$F^n(\emptyset) \subseteq Y$ et donc
$\bigcup\limits_{n \in \mathbb{N}} F^n(\emptyset) = exp \subseteq Y$.

## Exemple d'utilisation de cette grammaire

Analyse syntaxique de $2 \times x + y$ : l'analyseur lexical reconnaît 2 comme
une constante, $\times$ comme `*`, $x$ comme un ID, $+$ comme `+` et $y$ comme
un ID. Comment vérifier que cette expression appartient bien au langage ?
Vérifions que `CSTE * ID + ID` est bien une entrée syntaxiquement correcte selon
la grammaire.

### Suite de dérivations (gauche) de $exp \Rightarrow^\ast \mathrm{CSTE} \times \mathrm{ID} + \mathrm{ID}$

```text
exp => exp + exp            (3)
    => exp * exp + exp      (4)
    => CSTE * exp + exp     (2)
    => CSTE * ID + exp      (1)
    => CSTE * ID + ID       (1)
```

#### Remarques

+ Dès qu'un terminal est engendré par une règle, on ne peut plus l'effacer.
+ Il coupe implicitement l'entrée entre ce qui se trouve à sa gauche et ce qui
  se trouve à sa droite.

---

En compilation, on peut avoir l'impression que cette suite de dérivations
induit syntaxiquement une « priorité » sur les opérateurs binaires `+` et `*` :

$$
\underbrace{\underbrace{\mathrm{CSTE} \times \mathrm{ID}}_{exp} + \underbrace{\mathrm{ID}}_{exp}}_{exp}
$$

Est-ce satisfaisant ? Presque... Expliciter la syntaxe, c'est bien. Mais cette
grammaire est ambiguë : il y a au moins deux structures syntaxiques possibles
pour `CSTE * ID + ID`.

```text
exp => exp * exp            (4)
    => CSTE * exp           (2)
    => CSTE * exp + exp     (3)
    => CSTE * ID + exp      (1)
    => CSTE * ID + ID       (1)
```

C'est toujours une suite de dérivations gauche, mais la structure syntaxique
induite est plutôt
$\underbrace{\mathrm{CSTE}}_{exp} \times \overbrace{\underbrace{\mathrm{ID} + \mathrm{ID}}_{exp}}^{\text{parenthèses implicites}}$.

`Définition :` une grammaire est dite ambiguë lorsqu'il existe deux suites de
dérivations gauches distinctes, à partir de l'axiome (start symbol), qui
produisent la même entrée.

En compilation, on ne veut pas cela ! En effet, on va faire de la traduction
dirigée par la syntaxe : deux syntaxes possibles donneront deux codes
différents. Exemple : $(2 \times x) + y \neq 2 \times (x + y)$. En compilation,
on n'utilise que des grammaires non ambiguës.

### Arbre de dérivation

Sur le même exemple $2 \times x + y$.

Un arbre de dérivation est aussi appelé arbre de syntaxe concrète. C'est un
arbre dont :

+ les sommets sont étiquetés sur $T \cup N$ ;
+ les embranchements sont définis par des règles de production ;
+ les feuilles sont étiquetées sur $T$ ;
+ la racine est étiquetée par l'axiome (start symbol).

#### Remarque

Il y a une bijection entre arbres de dérivation et suites de dérivations
gauches. Les suites de dérivations gauches correspondent exactement aux
parcours en profondeur, de gauche à droite et préfixes, des arbres de
dérivation.

Construire un arbre de dérivation pour `ID ID +` est impossible :
$\mathrm{ID}\ \mathrm{ID}\ + \notin exp$.

---

`Définition :` une grammaire est ambiguë lorsqu'il existe deux arbres de
dérivation pour une même entrée (un même mot de terminaux).

La grammaire ci-dessus, quoique ambiguë, a tout de même le mérite de définir
correctement les expressions arithmétiques. Cependant, ces expressions
peuvent-elles être définies par une grammaire non ambiguë ?

## Une première grammaire non ambiguë

Idée : distinguer dans les expressions arithmétiques les termes qui composent
les sommes et les facteurs qui composent les produits. Autrement dit, nous
allons utiliser 3 non-terminaux :

- $exp$ : expressions arithmétiques ;
- $term$ : termes dans une somme ;
- $fact$ : facteurs dans un produit.

On a donc $N = \{exp,term,fact\}$, avec $exp$ comme axiome. Les règles de cette
grammaire :

```text
1. exp  -> term
2. exp  -> exp + term
3. term -> fact
4. term -> term * fact
5. fact -> ID
6. fact -> CSTE
7. fact -> (exp)
```

Pas d'ambiguïté ? Nous voulons toujours dériver $2 \times x + y$, c'est-à-dire
`CSTE * ID + ID`.

L'arbre obtenu est le seul arbre de dérivation possible ! Le parenthésage
induit par cet arbre est bien $(2 \times x) + y$. Nous avons donc notre
grammaire pour la compilation : elle s'appelle la grammaire ETF. Une autre
grammaire, obtenue en éliminant la récursivité gauche (adaptée à l'analyse
descendante LL(1)) :

1. $E \rightarrow TE'$
2. $E' \rightarrow \varepsilon$ (mot vide)
3. $E' \rightarrow +TE'$
4. $T \rightarrow FT'$
5. $T' \rightarrow \varepsilon$ (mot vide)
6. $T' \rightarrow \ast FT'$
7. $F \rightarrow \mathrm{ID}$
8. $F \rightarrow \mathrm{CSTE}$
9. $F \rightarrow (E)$

On peut vérifier que cette grammaire engendre les mêmes expressions
arithmétiques et qu'elle n'est pas ambiguë.
