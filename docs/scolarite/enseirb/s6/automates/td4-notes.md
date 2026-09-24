---
title: Automates finis et applications - TD4
description: "Notes du TD4 d'automates finis : lemme d'Arden, grammaires linéaires gauches et droites, arbres de dérivation, ambiguïté et construction de grammaires."
---

## Exercice 1

Lemme d'Arden : $A^\ast.B$ est une solution de $X = A.X \cup B$ (et si $A$ ne
contient pas $\epsilon$, cette solution est unique).

* En pratique, il faut choisir la variable qui sera éliminée en premier. Ici, on
  va remplacer $X_2$ par sa valeur dans $X_1$ (on se permet de confondre
  les singletons avec leur élément par concision) :

$$
\begin{aligned}
X_1 &= b.X_1 \cup b.(a.X_0 \cup \{a, b\}.X_1) \cup \epsilon \\
X_1 &= \{b, ba, bb\}.X_1 \cup ba.X_0 \cup \epsilon
\end{aligned}
$$

D'après le lemme d'Arden, on a : $X_1 = \{b, ba, bb\}^\ast . (ba.X_0 \cup
\epsilon)$.

On remplace dans $X_0$ : $X_0 = (a \cup b.\{b, ba, bb\}^\ast .ba).X_0 \cup b.\{b, ba,
bb\}^\ast \cup \epsilon$.

Encore une fois, avec le lemme : $X_0 = (a \cup b.\{b, ba, bb\}^\ast.ba)^\ast .
(b.\{b, ba, bb\}^\ast \cup \epsilon)$.

Et on termine en remplaçant $X_0$ et $X_1$ dans $X_2$.

* On veut montrer que $\Sigma^\ast$ est toujours solution si $A$ contient le
  mot vide.

Si $A$ contient $\epsilon$, alors $A.\Sigma^\ast = \Sigma^\ast$ ; de plus, $B$ est inclus dans $\Sigma^\ast$,
donc $A.\Sigma^\ast \cup B = \Sigma^\ast$.

Donc $\Sigma^\ast$ est bien solution de l'équation $X = A.X \cup B$.

* Pour prouver le lemme, il faut montrer que $A^\ast.B$ est bien une solution, puis
  l'unicité (ce qu'on va faire en montrant qu'elle est la plus petite et la plus
  grande).

* Montrons d'abord que $A^\ast.B$ est une solution de $X = A.X \cup B$ :

$$
A^\ast.B = (\epsilon \cup A.A^\ast).B = B \cup A.A^\ast.B
$$

Or le produit de langages est associatif, donc $A^\ast.B = A.(A^\ast.B) \cup B$.

* Toute solution $S$ contient $A^\ast.B$. Montrons par récurrence sur $n$ que $A^n.B \subseteq S$ : on a $A^0.B = B \subseteq A.S \cup B = S$, et si $A^n.B \subseteq S$, alors $A^{n+1}.B = A.(A^n.B) \subseteq A.S \subseteq S$. Donc $A^\ast.B = \bigcup_n A^n.B \subseteq S$.

* Dans le cas où $A$ ne contient pas le mot vide, toute solution $S$ est incluse dans $A^\ast.B$. Soit $w$ un mot de $S$ le plus court possible tel que
  $w$ n'est pas dans $A^\ast.B$. $w$ est dans $S = A.S \cup B$, donc $w$ est :
  * soit dans $B$ (impossible, car $B \subseteq A^\ast.B$) ;
  * soit dans $A.S$.

Donc $w = u.v$ avec $u$ dans $A$ et $v$ dans $S$. Comme $u \neq \epsilon$, $|v| < |w|$, donc $v$ est dans $A^\ast.B$ par minimalité de $w$.
Donc $w$ est dans $A.A^\ast.B$, donc dans $A^\ast.B$ : contradiction.

* On construit l'automate en créant un état par variable plus un état final, et on crée les transitions pour chaque règle (cf. cours).

## Exercice 2

L'intuition naïve qu'on pourrait avoir serait "d'inverser" les membres droits de
chaque règle. Cependant, cette méthode génère en fait le miroir du langage de la
grammaire de départ.

À partir d'une grammaire linéaire droite $G$, on peut obtenir un automate fini $A$
qui accepte le langage de la grammaire. Ensuite, on calcule l'automate $A'$ qui
accepte le langage miroir, ce qui permet d'obtenir une grammaire linéaire droite
$G'$. Enfin, on inverse "naïvement" $G'$ et on obtient une grammaire linéaire gauche
$G''$ de même langage que $G$ (on peut bien sûr effectuer l'opération inverse).

On peut aussi convertir en automate fini puis inverser les états initiaux et
finaux du résultat, ainsi que toutes les transitions. FH : cette transformation
correspond au calcul de l'automate miroir dans la solution ci-dessus. C'est une
étape de la construction, mais elle ne répond pas totalement à la question.

### Parenthèse sur un arbre de dérivation pour une grammaire régulière

$$
\begin{aligned} S &\rightarrow aS \mid bT \\
T &\rightarrow aT \mid bS \mid \epsilon \end{aligned}
$$

Pour la dérivation $S \Rightarrow aS \Rightarrow abT \Rightarrow ab$ :

```text
     S
    / \
   a   S
      / \
      b  T
         |
        eps
```

$S \rightarrow S + S \mid x$

On peut avoir deux suites de dérivations différentes, mais le même arbre :

1. $S \Rightarrow S + S \Rightarrow x + S \Rightarrow x + x$
2. $S \Rightarrow S + S \Rightarrow S + x \Rightarrow x + x$

```text
       S
    /  |  \
   S   +   S
   |       |
   x       x
```

$S \Rightarrow S+S \Rightarrow S+S+S \Rightarrow \ldots$
Dans ce cas, on peut choisir de remplacer le premier ou le deuxième $S$ par $S + S$, ce qui donne deux arbres distincts pour le même mot : la grammaire est ambiguë.

En remplaçant le deuxième, on trouve l'arbre suivant :

```text
       S
    /  |  \
   S   +   S
   |     / | \
   x     S +  S
         |    |
         x    x
```

## Exercice 3

On est en présence d'une grammaire non linéaire (à cause de la première règle, qui mène à $A1B$ avec deux symboles non terminaux).

1. Grammaire de départ, où l'on remplace le facteur $A1B$ par une variable (d'après les règles de $A$, $A1B \rightarrow 0A1B \mid 1B$) :

$$
\begin{aligned}
S &\rightarrow A1B \\
A1B &\rightarrow 0A1B \mid 1B \\
B &\rightarrow 0B \mid 1B \mid \epsilon
\end{aligned}
$$

En renommant $A1B$ en $A'$ :

$$
\begin{aligned}
S &\rightarrow A' \\
A' &\rightarrow 0A' \mid 1B \\
B &\rightarrow 0B \mid 1B \mid \epsilon
\end{aligned}
$$

Finalement, en supprimant la variable inutile :

$$
\begin{aligned}
S &\rightarrow 0S \mid 1B \\
B &\rightarrow 0B \mid 1B \mid \epsilon
\end{aligned}
$$

Il faut garder à l'esprit que les grammaires hors contexte ne sont pas toutes équivalentes à des grammaires linéaires.

## Exercice 4

Conversion de langages en grammaires.

1. $\{a^n b^n \mid n \geq 0\}$ : $S \rightarrow aSb \mid \epsilon$

2. $\{a^n b^m \mid m \leq n\}$ : $S \rightarrow aS \mid aSb \mid \epsilon$

   D'ailleurs, cette grammaire est ambiguë :
   $S \Rightarrow aS \Rightarrow aaSb \Rightarrow aab$,
   mais aussi $S \Rightarrow aSb \Rightarrow aaSb \Rightarrow aab$,
   qui correspondent à deux arbres différents : on a deux façons différentes de construire $aab$.

3. $\{w w^R\}$ : $S \rightarrow aSa \mid bSb \mid \epsilon$,
   qui n'est pas ambiguë.

4. Les mots de Dyck : $S \rightarrow SS \mid (S) \mid [S] \mid \{S\} \mid \epsilon$,
   qui est ambiguë.

5. Variante avec les parenthèses imbriquées dans l'ordre
   $\{\}$, puis $()$, puis $[]$ :

$$
\begin{aligned}
S &\rightarrow SS \mid \{T\} \mid \epsilon \\
T &\rightarrow TT \mid (U) \mid \epsilon \\
U &\rightarrow UU \mid [\,] \mid \epsilon
\end{aligned}
$$

## Exercice 5

$$
S \rightarrow S + S \mid S * S \mid 0 \mid 1
$$

1. Cette grammaire est hors contexte.

2. On exhibe deux arbres différents qui génèrent le même mot
   (cf. la parenthèse de l'exercice 2).

   Problème : il est difficile d'évaluer l'expression (arithmétique) car on ne sait pas quel arbre choisir (la priorité de $*$ sur $+$ n'est pas imposée).

3. On peut se baser sur l'expression régulière $(\{0,1\}\{+,*\})^\ast\{0,1\}$ :
   on trouve $S \rightarrow 0+S \mid 1+S \mid 0*S \mid 1*S \mid 0 \mid 1$.

4. On ajoute la règle $S \rightarrow (S)$.
   Il n'y a pas de grammaire régulière qui décrit ce nouveau langage, car ce n'est pas un langage régulier (il faut compter les parenthèses ouvrantes non fermées).
