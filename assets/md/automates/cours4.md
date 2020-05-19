---
layout: page
hide: true
title: <i class="fas fa-robot fa-2x"></i> Grammaires
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

Cours inspiré du
[polycopié](https://moodle.bordeaux-inp.fr/pluginfile.php/31498/mod_resource/content/6/poly-if114-etd.pdf)
de [Frédéric Herbreteau](https://www.labri.fr/perso/herbrete/).
<style>
html {
 zoom: 0.80;
}
</style>

Un automate fini est une description analytique d'un langage régulier : c'est un algorithme pour reconnaître les mots du langage. Les grammaires donnent une description générative d'un langage : elles explicitent des règles de construction des mots du langage. Nous connaissans déjà la notion de grammaires en lagage naturel. Par exemple, en français, une phrase déclarative à la forme : "sujet" + "verbe" + "complément". La grammaire a pour rôle de fixer la structure des phrases. En informatique, les grammaires sont couramment utilisées pour définir la syntaxe des langages de programmation et pour construire les compilateurs.

## <i class="fas fa-robot fa-2x"></i> Grammaire, dérivation, langage

Une ̀grammaire` est un quadruplet $$G=(V,\Sigma,R,S)$$ où :
* $$V$$ et $$\Sigma$$ sont deux alphabets disjoints. Les symboles de $$V$$ sont dits non-terminaux, ceux de $$\Sigma$$ sont dits terminaux.
* $$R \subseteq (V \cup \Sigma)* \times (V \cup \Sigma)*$$ est un ensemble fini de règles $$(\alpha,\beta)$$ telles que $$\alpha$$ contient au moins un symbôle non-terminal
* $$S \in V$$ est le symbole non terminal initial 

Les symboles non terminaux (ie symboles de $$V$$) sont usuellement notés par des lettres majuscules $$A,B,...,$$ alors que les symboles terminaux (ie les symboles de $$\Sigma$$) sont représentés par des lettres minuscules $$a,b...$$. L'ensemble $$R$$ définit les règles de substitution. Une règle $$(\alpha;\beta)$$ sera souvent représentée sous la forme $$\alpha \rightarrow \beta$$. Elle signifie que $$\beta$$ peut être substitué à $$\alpha$$. Le symbole non terminal initial est généralement noté $$S$$. Lorsqu'une grammaire comporte plusieurs règles avec le même membre gauche, par exemple : $$A \rightarrow aA$$ et $$A \rightarrow Bb$$, on écrit souvent : $$A \rightarrow aA | Bb$$ pour simplifier. 

Une grammaire $$G(V,\Sigma,R,S)$$ `dérive` $$v \in (V \cup \Sigma)^\ast$$ à partie de $$u \in (V \cup \Sigma)^\ast$$, noté $$u \Rightarrow v$$, s'il est possible de décomposer $$u=xu'y, v=xv'y$$ et $$u' \rightarrow v'$$ est une règle de $$R$$. 

La `langage généré` par une grammaire $$G=(V,\Sigma,R,S)$$ est l'ensemble des mots dérivés depuis le symbôle initial $$S$$ qui ne contiennent que des symboles terminaux. $$\mathcal{L}(G)=\{\omega \in \Sigma^\ast | S \Rightarrow^\ast \omega\}$$ 

## <i class="fas fa-robot fa-2x"></i> Grammaire régulières et langage réguliers 

Dans cette section, on étudie les grammaires qui génèrent les langages réguliers. 

Une grammaire $$G=(V,\Sigma,R,S)$$ est `linéaire droite` si toutes les règles de $$R$$ ont la forme $$A \rightarrow \omega B$$ ou $$A \rightarrow \omega$$ pour $$\omega \in \Sigma^\ast$$ et $$B \in V$$.

On appelle ̀grammaire régulière` une grammaire qui est soit linéaire gauche soit linéaire droite. 

#### Théorème. 

Un langage $$L$$ est régulier si et seulement si il est généré par une grammaire régulière 

Pour toute grammaire régulière $$G=(V,\Sigma,R,S)$$, il existe un automate fini $$A_G$$ qui accepte le langage $$\mathcal{L}(G)$$. 

Pour tout automate  fini déterministe $$A=(Q,\Sigma,\delta,q_0,F)$$, il existe une grammaire régulière qui génère le langage $$\mathcal{L}(A)$$


## <i class="fas fa-robot fa-2x"></i> Au-delà des grammaires régulières
Toutes les grammaires ne sont pas régulières. Comme nous l'avons vu précédemment, il existe des grammaires (possiblement linéaires) qui génèrent des langages non-réguliers. 

Le linguiste et informaticien Noam Chomsky a défini la classification suivante des grammaires. 

### Type 3
Les grammaires régulières dont les règles sont toutes linéaires droites $$A \rightarrow \omega B$$, $$A \rightarrow \omega$$ ou alors toutes linéaires gauches $$A \rightarrow B\omega$$, $$A \rightarrow \omega$$. Où $$A,B \in V$$ et $$\omega \in \Sigma^\ast$$. Le membre gauche d'une règle est seulemement constitué d'un symbôle non terminal. Le membre droit contient au plus un symbole non terminal, à droite (resp à gauche) des symboles terminaux. Le langage généré par une grammaire régulière est régulier, et donc accepté par un automate fini.

### Type 2
Les grammaires hors-contextes dont les productions sont de la forme $$A \rightarrow \beta$$ où $$A \in V$$ et $$\beta \in (V \cup \Sigma)^\ast$$. Seul le membre gauche est contraint : il ne peut s'agir que d'un seul symbole non terminal. Le Langage d'une grammaire hors-contexte est accepté par un automate à pile.

### Type 1
Les grammaires contextuelles ont des productions de la forme $$\alpha \rightarrow \beta$$, où $$\alpha,\beta \in (V \cup \Sigma)^\ast$$, $$\alpha$$ contient au moins un symbole non terminal, et $$\beta$$ contient au moins autant de symboles que $$\alpha : |\alpha| \leq |\beta|$$. La règle $$S \rightarrow \varepsilon$$ est autorisée si $$S$$ n'apparaît en membre droit d'aucune règle. Les langages contextuels sont acceptés par des automates linéairement bornés. 

### Type 0 
Aucune restriction. Les langages définis par de telles grammaires sont reconnus par des machines de Turing, sans garantie de terminaison (récursivement énumérable). 

On peut montrer que les familles de langages associées à ces types sont incluses les unes dans les autres, mais non égales. Ainsi, tous les langages générés avec une grammaire de type $$i (1 \leq i \leq 3)$$ peuvent être générés par une grammaire de type $$i-1$$. De plus, pour chaque $$0 \leq i \leq 2$$, il existe des langages générés par une grammaire de type $$i$$ mais par aucune grammaire de type $$i+1$$. Il existe également des langages qui ne sont générés par aucune grammaire. 

## <i class="fas fa-robot fa-2x"></i> Arbre de dérivation, ambiguïté


Les grammaires sont fréquemment utilisées pour décrire des langages naturels, des langages de programmation, ou encore des langages de description. Elles permettent de décrire de manière formelle ces langages et donc de construire des compilateurs pour ces langages. Le compilateur vérifie qu'un mot appartient au langage, et il reconstitue en général la structure de ce mot afin de pouvoir lui appliquer des transformations.

Un `arbre de dérivation` d'un mot $$\omega$$ par une grammaire hors-contexte $$G=(V,\Sigma,R,S)$$ est un arbre fini 
* de racine $$S$$
* dont les feuilles sont étiquetées par des symboles terminaux 
* dont les noeuds intermédiaires sont étiquetés par des symboles non-terminaux
* tel que si un noeud $$n$$ étiqueté par un élément non-terminal $$A \in V$$ possède les fils $$n_1,...,n_k$$ dans cet ordre alors $$A \rightarrow n_1...n_k$$ est une règle de $$G$$
* et la concaténation des feuilles de l'arbre de gauche à droite donne le mot $$\omega$$ 

Un arbre de dérivation explicite donc comment un mot est généré par la grammaire en partant du symbôle initial $$S$$ et en remplaçant successivement les symboles non terminaux à l'aide d'une des règles de la grammaire. Il s'agit d'une description structurée de la dérivation d'un mot par une grammaire tel que défini précédemment.

Une grammaire $$G=(V,\Sigma,R,S)$$ est `ambigue` s'il existe un mot $$\omega \in \Sigma^\ast$$ généré par $$G$$ pour lequel il existe (au moins) deux arbres de dérivations distincts. Une grammaire qui admet au plus un arbre de dérivation pour tout mot $$\omega \in \Sigma^\ast$$ est dit non ambiguë.  

Il n'est pas possible de déterminer si une grammaire est ambiguë ou non. 
