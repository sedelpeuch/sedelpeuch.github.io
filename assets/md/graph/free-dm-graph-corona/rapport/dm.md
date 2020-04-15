---
layout: page
hide: true
title: <i class="fas fa-project-diagram fa-2x"></i> Graphe - Devoir Maison propagation du Covid-19
subtitle: Decou Nathan , Delpeuch Sébastien, Moinel Aurélien, Pringalle Antoine
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

Le but de ce devoir maison est d'utiliser l'algorithmique des graphes pour
modéliser une version simpliste de la propagation du Covid-19. Le devoir se
décompose en 3 parties d'implémentation, tout d'abord nous mettons en place les
différentes paramètres (mortalité, durée de maladie) et les différents graphes. Vient ensuite le rajout de
paramètres simples comme des tests sur la population etc. Finalement nous avons
tenté de rajouter des facteurs plus réalistes  à compléter.

Notre travail est résumé dans l'outil de visualisation que nous avons crée
disponible en fin de page.

## <i class="fas fa-project-diagram"></i> Partie I - Implémentation d'une base
La première partie permet de définir les bases de la modélisation c'est à dire
les différents états, les différents paramètres, les règles de changement
d'état, les topologies de graphes étudiés et les différents modèles de ces
derniers. La population est pour l'instant considérée comme uniforme (chaque
individu est sujet à la maladie de la même manière), ils peuvent être dans
quatre états, Sain ($$S$$), Infecté ($$M$$), Guéri et donc imunisés ($$G$$) ou
décédé ($$D$$). De plus chaque personne suit les règles suivantes 
+ Si une personne saine $$X$$ fréquente une personne malade $$Y$$ alors, avec la
  probabilité $$q$$, $$X$$ devient malade par l'intermédiaire de $$Y$$ pour une
  durée $$r$$. 
+ Si une personne est malade depuis $$r$$ jours alors soit elle décède avec une
  probabilité $$p$$ soit elle devient immunisé avec une probabilité $$(1-p)$$.
+ Une personne immunisée ou décédée ne change jamais d'état.
+ Une personne décédée ne peut pas contaminer une personne saine.

Nous allons aussi définir les différents graphes de contact permettant de
simuler les différentes relations de chaque individu, trois graphes sont alors
mis en oeuvre 
+ Un graphe circulaire, les personnes sont numérotés de 1 à $$n$$ et chaque
  personne, numérotés $$i$$, est relié aux personnes $$(i-1)$$ et $$(i+1)$$
  modulo $$n$$, 
+ Un graphe aléatoire, on tire un graphe aléatoire de taille $$n$$ de la manière
  suivante. Chaque noeud choisit $$k$$ noeuds choisis au hasard. Cela permet de
  représenter de manière simpliste la population, chaque individu à un nombre
  aléatoire de contact avec les autres individus
+ Finalement le graphe mixe, issu de l'union du graphe circulaire et du graphe
  aléatoire
  
De plus nous définissons aussi 2 modèles de graphe
+ statique (graphe de confinement de paramère $$k'$$) : une personne confinée
  fréquence $$k' \leq k$$ personnes sélectionnées au hasard. Il n'est pas
  autorisée à voir les autres personnes pendant le confinement.
+ dynamique (graphe de baisse de fréquentation de paramètre $$k'$$) : chaque
  jour, chaque personne est autorisée à voir $$k'$$ personnes qu'elle
  sélectionne parmi ses $$k$$ contacts. Il peut donc voir des personnes
  différentes d'un jour à l'autre

Dans un premier temps nous allons définir la séquence de graphe $$G_i$$
permettant de réprésenter l'état du graphe $$G$$ au jour $$i$$. Peu importe le
jour, les sommets du graphe ne change pas ainsi, dans une première partie
d'initialisation nous construisons le graphe en fonction de la topologie choisi,
dans tous les cas le graphe possède $$n$$ sommets. Ensuite vient ensuite la
construction des arêtes du graphe. Pour le graphe circulaire, cela est effectué
dans l'initialisation, en effet les individus ne sont reliés que à leurs voisins
de droite et de gauche, cela est indépendant du jour. Par construction ce graphe
est connexe. 

De plus chaque jour, nous devons appliquer les règles de changement d'état à
tous les individus, ainsi peut importe la topologie du graphe nous parcourons le
graphe, si nous tombons sur une personne malade nous appliquons à tous ses
voisins une probabilité $$q$$ de tomber malade, si l'un tombe malade nous
initialisons un compteur représentant la durée de sa maladie. Si nous tombons
sur une personne malade depuis une durée $$r$$ nous appliquons la probabilité
$$p$$ de décéder. A noter que si une personne décède la liste de ses voisins est
vidée. 

Une fois cela présenté, nous pouvons réaliser une base de l'implémentation. Nous
définissons donc une classe python `individu`. Cela nous permet de renseigner
les informations importante sur chaque individu, son état, son identificateur,
le nombre de jour depuis lequel il est malade si il est malade. Finalement dans
cette version un individu possède aussi un tableau avec l'identificateur de ses
actuels voisins.

Résumons la construction de ce modèle. Tout d'abord nous créons une population
de taille $$n$$. Cela se fait en initialisant $$n$$ individu et donc en temps
linéaire en fonction de $$n$$. Ensuite nous créons le graphe circulaire, nous
utilisons une matrice d'adjacence, nous parcourons tous les individus $$i$$ et à
chaque fois nous mettons un 1 dans la case $$(i-1)%n$$ et $$(i+1)%n$$. Dans le
même temps nous remplissons le tableau des voisins de chaque individu. La
création de ce graphe est donc réalisé en `O(n)` où $$n$$ est
le nombre d'individu. Nous devons ensuite appliquer le modèle en fonction
de $$k$$ ou $$k'$$, cette fonction à une complexité `O(n*k')` en effet il faut
pour chaque individu lui faire choisir $$k'$$ contact parmis ses $$k$$
fréquentation. Dans le graphe circulaire $$k$$ vaut toujours 2, ainsi $$k'$$
peut valoir 2 et donc cela ne change rien ou 1. A ce stade nous avons initialisé
correctement le graphe, la complexité de l'initialisation est majorée par
`O(n*m)` où $$m$$ est le nombre moyen de voisins.

Passons maintenant au détail de la propagation jour par jour. Chaque jour nous
devons parcourir tous les individu. Si nous sommes dans un modèle dynamique nous
devons actualiser les voisins. Ensuite si l'individu est malade depuis $$r$$
jour, lui appliquer une chance de mourir, si l'individu est en contact avec des
malades lui appliquer une chance de devenir malade. Finalement ajoutons un jour
de maladie à tous les malades. Ainsi pour calculer l'état du graphe au jour
$$i+1$$ nous avons une fonction de complexité è `O(n+m)` où $$m$$ est le nombre
moyen de voisin d'un individu.

Nous pouvons à partir de cela établir notre code final pour le graphe en modèle
statique et dynamique. Nous initialisons dans un premiers temps le graphe et la
population. Nous faisons ensuite appel à la fonction de propagation jour par
jour le nombre de jours que nous voulons (par défaut 180), nous avons ajouté
certainnes fonctionnalités nous permettant de récupèrer chaque jour une image du
graphe et le nombre de malade, sain, remis ou décédés. *In fine* notre
algortihme principal à une complexité de `O(nbr jours * n * m)`.

Nous pouvons commencer, comme le sujet nous y invite, à simuler la propagation
dans une graphe circulaire, tout d'abord dans le modèle statique et dynamique
avec des populations de 100, 1000 et 10000 individu en prenant comme paramètres
$$r=14, p=0.01,q=0.02, k=50$$ et en faisant varier $$k'$$ de $$1$$ à $$k$$.
Voici quelques animations permettant de visualiser la propagation dans les
différents graphes au fur et à mesure des jours.

GIF & ANALYSE

Nous pouvons tout d'abord voir qu'il y a une propagation au fur et à mesure des
jours, cependant il apparait clairement que les résultats sont peu satisfaisant,
en effet le graphe circulaire est relativement simpliste et ne représente que
très peu les connexions humaines. Nous nous tournons donc vers la deuxième
topologie proposée, le graphe aléatoire. Celui ci relie les sommets de manière
aléatoire (il est à noter qu'il n'est pas forcément connexe). Pour gérer plus
facilement le modèle statique et dynamique nous remplissons dans
l'initialisation le tableau des voisins par $$k$$ voisin choisis de manière
aléatoire, si nous sommes dans un modèle statique nous sélectionnons
aléatoirement pour chaque individu dans l'initialisation $$k'$$ voisins parmi
ses $$k$$ voisins. En revanche si nous sommes dans un modèle dynamique, à chaque
jour nous devons sélectionner aléatoirement $$k'$$ voisins parmis ses $$k$$
contacts autorisés. Grâce à notre implémentation basé sur un tableau contenant
les $$k$$ contacts possibles et un tableau contenant ses $$k'$$ voisins pour le
jour $$i$$ la complexité de l'initialisation et de la boucle principale reste
inchangée.

Nous pouvons alors réaliser des tests en prenant les mêmes paramètres que
précédemment 

GIF & ANALYSE


##  <i class="fas fa-project-diagram"></i> Partie II - Rajout de tests simples

##  <i class="fas fa-project-diagram"></i> Partie III - Rajouts de facteurs plus réalistes


