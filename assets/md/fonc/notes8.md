---
layout: page
hide: true
title: <i class="fas fa-code-branch fa-2x"></i> Les formes impératives 
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

Cours inspiré du
[polycopié](https://www.labri.fr/perso/myriam/Enseignement/Scheme/scheme.pdf)
de [Myriam Desainte-Catherine](https://www.labri.fr/perso/myriam/) & [David Renault](https://www.labri.fr/perso/renault/working/index.php).

<style>
html {
 zoom: 0.80;
}
</style>

## <i class="fas fa-code-branch"></i> Références 

Une référence est un objet correspondant à une adresse mémoire et donc
l'indirection est faite automatiquement dans toute situation où une valeur est
requise. L'adresse associée à une référence n'est pas directement manipulable en
tant que telle (il n'existe pas d'opérations pour le programmeur sur les
références)

* Un symbole est lié à une référence, correspondant à un atome ou une paire
  pointée 
* L'évaluation d'un symbole renvoie une référence vers sa valeur 
* La référence est utilisée partout où la valeur n'est pas requise

## <i class="fas fa-code-branch"></i> Passage d'arguments 

Soit $$f$$ une fonction, soient $$p_1,p_2, ... p_n$$ ses paramètres formels. Soit
l'application 

$$\texttt{(f a_1 a_2 ... a_n)}$$

Soient $$r_1, r_2 ... r_n$$ les références vers les résultats des évaluations
respectives des arguments $$a_1, a_2, ... a_n$$

Lors de l'application, un environnement local est construit. Il est constitué
des liaisons entre les paramètres formels $$p_i$$ de la fonction $$f$$ et les
références $$r_i$$ des arguments de l'application 

$$\texttt{((p_1.r_1)(p_2.r_2)...(p_n.r_n))}$$


Les références $$r_1,r_2,..., r_n$$ sont utilisées comme des valeurs à travers
les symboles $$p_1, p_2, ..., p_n$$, les indirections étant effectuées
automatiquement. Ainsi, il est impossible de modifier un paramètre $$p_i$$ car
la modification reste locale à cet environnement.

## <i class="fas fa-code-branch"></i> L'affectation 

### La forme $$set!$$

$$\texttt{(set! <id> <e>)}$$

* La référence associée à l'identificateur $$<id>$$ est remplacée par la référence
  du résultat de l'évaluation de l'expression $$<e>$$.
  
* La valeur de retour de l'affectation est la valeur $$\#<void>$$ que la fonction
$$read$$ n'affiche pas. La procédure $$void$$ rend ce même résultat en prenant un
nombre quelconque d'arguments

### Modification de paires pointées 

On ne peut pas modifier les paires pointées de base dans la norme scheme. En
Racket, il faut utiliser le paquetage $$mpair$$.

## <i class="fas fa-code-branch"></i> Blocs d'expression

Certaines expressions pouvant effectuer des effets de bord, il devient possible
de les mettre en séquence. Contrairement aux formes $$let$$ et $$lambda$$,
certaines formes, telle le $$if$$ nécessitent d'utiliser une forme spéciale de
mise en séquence. 

### Les forme $$begin$$

$$\texttt{(begin <e_1> <e_2> ... <e_n>)}$$

* Chaque expression $$e_i$$ est évaluée selon son ordre d'apparition 
* Le résultat de l'évaluation de la séquence est celui de la dernière 
* Les valeurs des évaluations des expressions précédentes sont perdues 
* Il existe une forme $$begin0$$ qui renvoie le résultat de la première
  expression de la séquence
