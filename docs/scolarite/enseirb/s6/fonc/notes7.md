---
title: Les fonctionnelles
---

## <i class="fas fa-code-branch"></i> La forme lambda : rappel et utilisation

```lisp
(lambda (<p1> <p2> ... <pn>) <e>)
```

* Nommage de $\lambda$-expressions : `(define f (lambda (x y) (+ (* 10 x)
  y)))`
* Application de $\lambda$-expressions : mise en position fonctionnelle,
  stratégie applicative (par valeur)
* Passage de $\lambda$-expressions en paramètres : juxtaposition
* $\lambda$-expressions en retour de fonction : imbrication

### Juxtaposition

On appelle rédex un terme de la forme $(\lambda x.u) v$. On définit alors la
bêta-réduction

$(\lambda x.u) v \rightarrow u[x:=v]$

* Soit le terme $:(\lambda x.xy)(\lambda x.ux)$, on a la suite de réductions
  suivante : $xy[x:=\lambda x.ux] \rightarrow (\lambda x.ux)y \rightarrow
  ux[x:=y] \rightarrow uy$
* Soit $(\lambda f.f0)(\lambda x.(*2 x))$, on a la suite de réductions
  suivante : $f0[f:=\lambda x.(* 2x)]\rightarrow (\lambda x .(*2 x)) 0
  \rightarrow [* 2 x](x:=0) \rightarrow (* 2 0) \rightarrow 0$
* En scheme : $((lambda(f) (f 0)) (lambda (x) (* 2 x)))$, on a la suite de
  réduction suivante

  ```
  ((lambda(x) (* 2 x)) 0) -> (* 2 0) -> 0
  ```

### Imbrication

* Soit $\lambda x.(\lambda y.xy)f$, on a $\lambda y . xy [x:=f]\rightarrow
  \lambda y.fy$
* Soit $(\lambda x.(\lambda y.xy)f)z$, on a $(\lambda y.xy [x:=f])z
  \rightarrow (\lambda y.fy) z \rightarrow fy[y:=z] \rightarrow fz$

## <i class="fas fa-code-branch"></i> Itération : la forme ̀map$

La forme $map$ prend une fonction $f$ et $n$ listes en arguments $(n>0)$ où
$n$ est l'arité de la fonction $f$. Soit $I1=(<a_1> <a_2> ... <a_n>)$ et $I2 =
(<b_1> <b_2> ... <b_n>)$

* Cas d'une fonction unaire : $(map <f> <I_1>) -> ((<f> <a_1>)(<f> <a_2>) ... (<f>
  <a_n>))$
* Cas d'une fonction $n$-aire : $(map <f> <I_1> <I_2> ...) \rightarrow ((<f>
  <a_1> <b_1> ...)(<f> <a_2> ...)...(<f> <a_n> ...))$

### Forme andmap

Cette forme à la même signature que la forme $map$. Elle applique la fonction aux
éléments de la liste dans l'ordre. LE résultat est celui de la dernière
application, pas de mise en liste. S'arrête au premier résultat faux.

### Forme ormap

Comme la forme andmap mais renvoie le premier vrai

## <i class="fas fa-code-branch"></i> Itérations générales : formes $foldl$ et $foldr$

Comme la forme $map$, les formes $fold$ appliquent une fonction aux éléments
d'une ou plusieurs listes. Alors que $map$ combine les résultats obtenus dans
une liste, les formes $fold$ les combinent d'une façon déterminé par leur
paramètre fonctionnel $f$. Elles appliquent $f$ aux éléments des listes de
gauche à droite ou bien de droite à gauche. L'argument $init$ est utilisé pour
terminer la combinaison récursive du résultat.

## <i class="fas fa-code-branch"></i> Application : la forme $apply$

Cette fonction réalise l'application d'une fonction à une liste d'arguments. Ce
mécanisme est utile pour l'écriture de fonctions à nombre d'arguments variable.

```
(apply <f><I>)=(<f> <e1> <e2> ... <en>)
```

avec `<I>=(<e1> <e2> ... <en>)`

## <i class="fas fa-code-branch"></i> Fonctions en retour de fonctions

curryfication

La fonction curry curryfie son argument. Soit une fonction $f : A \times B
\rightarrow C$ la curryfication lui associe la fonction suivante $f^c : A
\rightarrow (B \rightarrow C)$ qui a pour résultat une fonction allant de $B$
dans $C$ et telle que $\forall x \in A, f(x,y) = (f^c(x))(y)$

## <i class="fas fa-code-branch"></i> Notion de fermeture

* L'environnement lexical d'une fonction est l'environnement dans lequel elle
  est définie
* Une fermeture est la représentation d'une fonction sous forme d'un couple
  associant l'environnement lexical et le code de la fonction
* En scheme les fonctions sont représentées par des fermetures pour conserver
  leur environnement de définition contenant des références éventuelles (ce
  n'est pas le cas par exemple du langage emacs-lisp)
* Les fermetures peuvent être utiliées pour représenter des états, par
  modification de l'environnement
