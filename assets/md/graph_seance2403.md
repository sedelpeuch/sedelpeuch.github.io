--- 
layout: page
hide: true
---

## Problème du Labyrinthe

### Modélisation

Voici le Labyrinthe sur lequel nous allons travailler

![alt text]({{https://Sdelpeuch.github.io}}/assets/images/graphe/labyrinthe.png)

L'idée est de trouver une modélisation simple pour pouvoir se déplacer sur le
graphe le modélisation se base sur les chemins possibles 

![alt text]({{https://Sdelpeuch.github.io}}/assets/images/graphe/labyrinthe1.png)
![alt text]({{https://Sdelpeuch.github.io}}/assets/images/graphe/labyrinthe2.png)
![alt text]({{https://Sdelpeuch.github.io}}/assets/images/graphe/labyrinthe3.png)

### Résolution verbeuse 
On peut trouver la sortie d’un labyrinthe avec 2 couleurs en "simulant" un
parcours en profondeur (DFS): Au lieu d’utiliser une mémoire globale de taille n
(la pile), on va utiliser un marquage local, à chaque nœud/arête, avec
uniquement 2 marqueurs/craies/cailloux de couleur.

* Au lieu d’empiler un sommet, on va le marquer de la couleur 1
* Au lieu de dépiler un sommet, on doit vérifier que (1) tous les sommets
voisins ont été visités et (2) revenir au sommet "père" La première opération
est facile. La deuxième l’est moins avec une mémoire locale.

(1) En effet, il faut détecter facilement qu’un voisin a déjà été visité : il suffit d’y aller et si c’est le cas faire demi-tour … mais
on veut éviter de visiter de manière plusieurs fois la même arête. Nommons par
commodité la salle "courante" U. Je visite un voisin V de U et il se trouve
que V a déjà été visité. Je reviens donc en U. Je n’ai pas la mémoire des autres
voisins de U. Les ai-je visité ? Il se pourrait que cela soit le cas. Pour
éviter cet écueil, il suffit de marquer les arêtes. Une arête marquée indique
que j’ai déjà suivi le couloir correspondant. Cette opération est donc facile.

(2) Il faut pouvoir remonter au père donc distinguer 2 types de marquage : les
arêtes retour et les arêtes père. En résumé, la méthode est la suivante :
* Chaque nouvelle arête parcourue ou tout nouveau sommet traversé est marqué par
la couleur 1 (correspond à l’empilement d’un sommet dans le DFS)
* Si on arrive à un sommet marqué, on fait demi-tour en marquant l’arête avec la
couleur 2. Une arête "retour" est donc marqué par les couleurs 1 et 2 (aller
et retour)
* Si toutes les arêtes incidentes sont doublement marquées sauf une, on sait
qu’on a visité tous les voisins. Ainsi, l’arête restante simplement marqué est
l’arête "père". Cela correspond à l’opération de dépilement de sommet du DFS.
Il faut remonter au père en marquant l’arête père 2.

La résolution se fait via l'algorithme de [Tremaux](https://en.wikipedia.org/wiki/Maze_solving_algorithm#Tr%C3%A9maux's_algorithm) dont le fonctionnement est disponible en [video](https://www.youtube.com/watch?v=gVSEJdSQZVQ)

### Pour Lundi 30 mars
* Lire chapitre 9 sur les arbres couvrants: 
* Dijkstra (PCC avec poids positif)
* Bellman-Ford (PPC avec poids négatif sans cycle absorbant, cad négatif) 
* Algorithme de Prim (poids minimal, ajout de l’arête de poids minimal dont une extrémité a été visité – Dijskstra Like)
* Kruskal (tri des arêtes par poids croissant - facultatif)
* Chercher les meilleurs vidéos et mettre les liens sur discord d’ici vendredi
* Exercice : écrire un algorithme de complexité `O(n)` qui vérifie si un graphe est un arbre
