---
title: Automates finis et application - TD4
---

## Exercice 1

Lemme d'Arden : $A^\ast.B$ est une solution de $X = A.X U B$ (et si A ne
contient pas eps, cette solution est unique)

* En pratique, il faut choisir la variable qui sera éliminée en premier. Ici, on
  va remplacer $X_2$ par sa valeur dans $X_1$ (on se permet de confondre
  les singletons avec l'élement par concision) : $X1 = b.X_1 U (b.A.X_0 U
  \{a, b\}.X_1) U \epsilon$ $X1 = \{b, ba, bb\}.X_1 U ba.X_0 U \epsilon$

D'après le Lemme d'Arden, on a : $X_1 = \{b, ba, bb\}^\ast . (ba.X_0 U
\epsilon)$

On remplace dans X0 : $X_0 = (a U b.\{b, ba, bb\}^\ast .ba).X_0 U b.\{b, ba,
bb\}^\ast U \epsilon$

Encore une fois, avec le lemme : $X0 = (a U b.\{b, ba, bb\}^\ast.ba)^\ast .
(b.{b, ba, bb}* U \epsilon)$

Et on termine en remplaçant $X_0$ et $X_1$ dans $X_2$.

* On veut montrer que $\Sigma^\ast$ est toujours solution si $A$ contient le
  mot vide.

Si A contient eps, alors $A.Σ* = Σ*$ de plus, $B$ est inclus dans $Σ*$
donc $A.Σ* U B = Σ*$

donc $Σ*$ est bien solution de l'équation $X = A.X U B$

* Pour prouver le lemme, il faut montrer que A*.B est bien une solution puis
  l'unicité (ce qu'on va faire en montrant qu'elle est la plus petit et la plus
  grande)

+ Montrons d'abord que $A*.B$ est une solution de $X = A.X U B$

$A*.B = (eps U A.A*).B = B U A.A*.B$
or le produit de langages est associatif, donc
$A*.B = A(A*.B U B)$

+ Dans la cas où $A$ ne contient pas le mot vide Soit $S$ une solution, et
  $w$ un mot de $S$ Supposons que $w$ est le plus court possible tel que
  $w$ n'est pas dans $A*.B$ $w$ est dans $S = A.S U B$ donc $w$ est soit :
    - dans $B$ (impossible)
    - soit dans $AS$

donc $w = u.v$ avec $u$ dans $A$ et $v$ dans $S v$ est aussi dans $A*.B$ (car $|v| < |w|$)
donc $w$ est dans $A.A*.B$, donc dans $A*.B$

Supposons maintenant que $S$ est une solution et $w$ dans $A*.B$ qui n'est pas dans $S$, de longueur minimale

On a toujours que $A*.B = A.A*B U B$ donc $w$ appartient à l'un des deux
ensembles Or $B$ est inclus dans $S$, donc $w$ est dans $A.A*.B$ Ainsi,
$w = x.y.z$ avec $x$ non-vide, $y$ dans $A*$ et $z$ dans $B$

$yz$ est dans $A*.B$, donc dans $S$
or $S = AS U B$, donc $x.yz$ est dans $S$ -> contradiction

* On construit l'automate en créant un état par variable + un état final et on crée les transitions pour chaque règle (cf. cours)

## Exercice 2 :

L'intuition naïve qu'on pourrait avoir serait "d'inverser" les résultats de
chaque règle. Cependant, cette méthode génère en fait le miroir du langage de la
grammaire de départ.

À partir d'une grammaire linéaire droite G, on peut obtenir un automate fini A
qui accepte le langage de la grammaire. Ensuite, on calcule l'automate A' qui
accepte le langage miroir, ce qui permet d'obtenir une grammaire linéaire droite
G'. Enfin, on inverse "naïvement" G' et on obtient une grammaire linéaire gauche
G'' de même langage que G. (on peut bien sûr effectuer l'opération inverse)

On peut aussi convertir en automate fini puis inverser les états initiaux et
finaux du résultat, ainsi que toutes les transitions. FH: cette transformation
correspond au calcul de l'automate miroir dans la solution ci-dessus. C'est une
étape de la construction, mais elle ne répond pas totalement à la question

### Parenthèse sur un arbre de dérivation pour une grammaire régulière

$\begin{align} S &\rightarrow aS | bT \\
T &\rightarrow aT | bS | \epsilon \end{align}$

pour une génération $S \Rightarrow aS \Rightarrow abT \Rightarrow ab$

```
     S
    / \
   a   S
      / \
      b  T
         |
        eps
```

$S \rightarrow S + S | x$

On peut avoir deux suites de dérivations différentes, mais le même arbre

1. $S \Rightarrow S + S \Rightarrow x + S \Rightarrow x + x$
2. $S \Rightarrow S + S \Rightarrow S + x \Rightarrow x + x$

```
       S
    /  |  \
   S   +   S
   |       |
   x       x
```

$S \Rightarrow S+S \Rightarrow S+S+S \Rightarrow$
Dans ce cas, on peut choisir de remplacer le premier ou le deuxième $S$ par $S + S$

En remplaçant le deuxième, on trouve l'arbre suivant :

```
       S
    /  |  \
   S   +   S
   |     / | \
   x     S +  S
         |    |
         x    x
``` 

## Exercice 3

On est en présence d'une grammaire non-linéaire (à cause de la première règle qui mène à A1B avec deux symboles non-terminaux)

1. $S \rightarrow A1B
   A1B \rightarrow 0A1B | 1B
   B \rightarrow 0B | 1B | eps$

$S \rightarrow A'
A' \rightarrow 0A' | 1B
B \rightarrow 0B | 1B | eps$

Finalement en supprimant la variable inutile
$S \rightarrow 0S | 1B \\
B \rightarrow 0B | 1B | eps$

Il faut garder à l'esprit que les grammaire hors-contexte ne sont pas toutes équivalentes à des grammaires linéaires.

## Exercice 4

Conversion de langages en grammaires

1. $\{a^n.b^n\} : S \rightarrow aSb | eps$

2. $\{a^n.b^m, m <= n\} : S \rightarrow aS | aSb| eps$

D'ailleurs, cette grammaire est ambigüe

$S \Rightarrow aS \Rightarrow aaSb \Rightarrow aab$
mais aussi $S \Rightarrow aSb \Rightarrow aaSb \Rightarrow aab$
qui ont deux arbres différents donc on a deux façon différentes de construire $aab$

3. ${w.w^R} : S \rightarrow aSa | bSb | eps$
   qui n'est pas ambigüe

4. Les mots de Dyck : $S \rightarrow SS | (S) | [S] | {S} | \epsilon$
   qui est ambigüe

5. variante avec les parenthèses dans l'ordre :
   $ 1: {}, 2: (), 3: []$

$S \rightarrow SS | {T} | \epsilon \\
T \rightarrow TT | (U) | \epsilon \\
U \rightarrow UU | [] | \epsilon$

## Exercice 5

$S \rightarrow S + S | S * S \\
S \rightarrow 0 | 1$

1. Cette grammaire est hors-contexte

2. On exhibe deux arbres différents qui génèrent le même mot
   cf. la Parenthèse au début de ces notes

Problème : difficulté pour évaluer l'expression (arithmétique) car on ne sait pas quel arbre choisir

3. On peut se baser sur l'expression régulière $({0,1}{+,x})*{0,1}$,
   on trouve $S \rightarrow 0+S | 1+S | 0*S | 1*S | 0 | 1$

4. on ajoute la règle $S \rightarrow (S)$
   Il n'y a pas de grammaire régulière qui décrit ce nouveau langage, car ce n'est pas un langage régulier
