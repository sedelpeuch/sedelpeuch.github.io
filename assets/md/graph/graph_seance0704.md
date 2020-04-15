--- 
layout: page
hide: true
title: <i class="fas fa-project-diagram fa-2x"></i> Graphe - Abres
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

## <i class="fas fa-project-diagram"></i> Union Find

On dispose d'ensembles disjoints sur $$n$$ éléments, on veut 
+ Tester si 2 éléments $$x,y$$ appartiennent au même ensemble ? `Find(x)=Find(y)`
+ Fusionner 2 ensembles disjoints contenant $$x$$ et $$y$$ `Union(x,y)`

### Une première structure naïve 

Les ensembles sont indicés de $$1$$ à $$n$$. Chaque élément connait l'indice de
son ensemble et au début `x.indice=identifiant(x)<=n`

> + Question 1 : Quelle est la complexité du test `Find(x)=Find(y)` ?
> + Question 2 : Quelle est la complexité de `Union(x,y)` dans le pire des cas ?
> + Question 3 : Quelle est la complexité totale si, en partant de $$n$$ ensembles
> de taille unitaire, on itère $$k$$ opération d'`Union`

La complexité est constant si on décide de renommer avec l'indice le plus petit
dans un ensemble lors de l'opération d'`Union(x,y)`. Pour l'Union tous les
éléments $$z$$ de l'ensemble de $$y$$ doivent mettre à jour leur indice donc
linéaire. Finalement la complexité totale est en $$O(k^2)$$ car Union se fait en
temps $$O(k)$$ si les ensembles ont une taille maximale $$k$$ et comme on part
d'ensemble unitaires, les ensembles ont taille max $$k$$. 

### Vers une version efficace

On considère maintenant une structure de données dans laquelle chaque classe est
représentée par un arbre dans lequel chaque noeud contient une référence vers
son noeud père. Une telle structure de forêt a été introduite. 

Dans une telle forêt, le représentant de chaque classe est la racine de l'arbre
crrespondant. Find se contente de suivre les liens vers les noeuds pères jusqu'à
atteindre la racine. Union réunit deux arbres en attachant la racine de l'un à
la racine de l'autre. Une manière d'écrire ces opérations est la suivante.

```
fonction MakeSet(x)
    x.parent = null

fonction Find(x)
    si x.parent == null
        retourner x
    retourner Find(x.parent)
    
fonction Union(x,y)
    xRacine = Find(x)
    yRacine = Find(y)
    si xRacine != yRacine
        xRacine.parent = yRacine
```

> Quetion 5 : Quelle est la complexité de la séquence `Union(1,2)...Union(1,n)`?

La complexité de find(1) va être 1 puis 2 puis 3 ... n-1. En sommant, on obtient
$$\Theta(n^2)$$

> Question 6 : Si $$p$$ est père de $$q$$, quelle relation y a t'il entre le
> rang de $$p$$ et celui de $$q$$ ?

On a rang(p)>rang(q)

> Question 8 : Supposons qu'une séquence de $$m$$ opérations comportant $$m$$
> Makeset et $$n$$ UNION ou FIND. Quelle est la complexité de UNION-FIND en
> utilisant UnionbyRank ? 

La complexité tombe à $$O(n)$$ produit par la fonction inverse d'Ackermann qui
est une fonction croissante mais d'une croissance ridicule. En pratique, on
considère que même pour $$n>10^100$$. On peut également montrer que la
complexité est $$O(n \log^\ast(n))$$ où $$\log^\ast(n)$$ désigne le logarithme
itéré de $$n$$, c'est à dire le plus petit nombre d'itération de logarithme
jusqu'à obtenir $$\log(\log(\log(...(\log n)))) < 1$$. 

> Question 9 Construire un exemple où le rang atteint 2 si on utilise la
> compression de chemins
