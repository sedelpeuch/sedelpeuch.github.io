---
layout: page
title: Semestre 5
menu: main
order: 2
icon: fa-check
---

<ul id="menu-demo2">
	<li><a href="/Semestre_5.html#algorithmique-et-mathématiques-1">Théorique</a>
		<ul>
			<li><a
	href="/Semestre_5.html#initiation-à-lalgorithmique">Initiation à l'algorithmique</a></li>
			<li><a href="/Semestre_5.html#structures-arborescentes">Structure Arborescentes</a></li>
			<li><a href="/Semestre_5.html#traitement-de-linformation">Traitement
	de l'information</a></li>
			<li><a
	href="/Semestre_5.html#probabilités-et-statistiques">Probabilités et statistiques</a></li>
            <li><a href="/Semestre_5.html#logique-et-preuve">Logique et preuve</a></li>
		</ul>
	</li>
	<li><a href="/Semestre_5.html#programmation-et-environnement-1">Pratique</a>
		<ul>
			<li><a
	href="/Semestre_5.html#environnement-de-travail">Environnement de travail</a></li>
			<li><a href="/Semestre_5.html#structure-des-ordinateurs">Structure
	des ordinateurs</a></li>
			<li><a
	href="/Semestre_5.html#programmation-impérative-1">Programmation impérative</a></li>
		</ul>
	</li>
	<li><a href="/Semestre_5.html#projets">Projets</a>
	</li>
</ul>
<hr>

## Algorithmique et mathématiques 1

### Initiation à l'algorithmique
Ce cours présente une initiation à la résolution de problèmes simples au moyen
de l'algorithmique, en particulier les problèmes de tris. Les seuls objets
manipulés sont de types simples (entiers, réels,etc) ou tableaux et matrice de
ceux-ci. Quelques familles d'algorithmes sont introduites: diviser pour régner,
dynamiques et gloutons. La comparaison d'algorithmes est abordée par
l'introduction de la notion de complexité.

### Structures arborescentes
Ce cours rappelle quelques structures mathématiques usuelles (ensemble, séquence
et arbre), introduit la notion de type abstrait et fournit quelque méthode pour
les implémenter.

### Traitement de l'information
Le cours d’analyse des données répond à deux objectifs
+ d’une part, de familiariser l’étudiant aux principales méthodes factorielles
(analyse en composantes principales et analyse factorielle des correspondances)
et de classification (classification ascendante hiérarchique)
+ d’autre part de familiariser les étudiants au logiciel R de plus en plus
utilisé dans les organismes de recherche français. R étant un logiciel libre,
les étudiants peuvent le télécharger gratuitement et s’y initier aisément en
particulier à l’aide des exemples présentés dans le cours.


### Probabilités et statistiques
Dans la première partie, il s'agit d'étudier les notions de base du calcul des
probabilités, qui seront utilisées dans d'autres enseignements à l' ENSEIRB :
Recherche opérationnelle, Traitement du signal, Théorie de l'information,
Analyse des données, Algorithmique probabiliste et surtout les Statistiques
étudiées dans la deuxième partie de ce module.

### Logique et preuve
L'objectif est l'acquisition des outils théoriques permettant de construire un
raisonnement formel, ainsi que de prouver la terminaison et la correction des
algorithmes.
+ la première partie concerne la théorie de l'induction, la définition de types
  inductifs et la preuve par induction, notamment de fonctions récursives
+ la deuxième partie présente la logique propositionnelle puis la logique du
  premier ordre, sous l'angle de la théorie des modèles. L'élève-ingénieur
  apprend à formaliser un problème et à utiliser un solveur pour obtenir une
  solution.
+ la troisième partie traite de la preuve de programmes: spécification (pre/post
condition), terminaison, invariant de boucle, calcul de Hoare

---
## Programmation et environnement 1

### Environnement de travail
L'objectif est de maîtriser l'environnement de travail de la filière
informatique de l'ENSEIRB-MATMECA: éditeur de texte, compilateur, composeur de
documents. Ce cours aborde également la programmation shell permettant
d'automatiser des tâches d'administration système.

### Structure des ordinateurs
Ce cours aborde la structure des ordinateurs et la coordination de ses
différents éléments.
+ Introduction sur l'évolution de la structure des ordinateurs
+ Communication dans les systèmes: architectures, structures et commandes des
  bus et autres liaisons entre les composants,
+ Communication vers les périphériques, interruptions et exceptions.
+ Memoire: structure et gestion de la mémoire, exécution de programme et système
  d'exploitation

### Programmation impérative 1
L'objectif de ce cours est d'apprendre les bases de la programmation impérative
par l'étude de la syntaxe et la sémantique du langage C.

---
## Projets
La scolarité de première année ENSEIRB, en filière Informatique, comprend
plusieurs projets intégrés au sein de l'UE C des deux premiers semestres de la
formation en Informatique. Chaque semestre, un travail de projet doit être
réalisé dans les différents langages de programmation étudiés en cours.

L'objectif de ces projets est double : d'une part, ils sont l'occasion de mettre
en pratique (voire d'approfondir) les connaissances théoriques vues en cours;
d'autre part, ils constituent souvent un premier contact avec le travail en
équipe. Ils sont normalement réalisés par groupes de 4 ou 5 élèves

<style>#menu-demo2, #menu-demo2 ul{
padding:0;
margin:0;
list-style:none;
text-align:left;
}
#menu-demo2 li{
display:inline-block;
position:relative;
border-radius:8px 8px 0 0;
}
#menu-demo2 ul li{
display:inherit;
border-radius:0;
}
#menu-demo2 ul li:hover{
border-radius:0;
}
#menu-demo2 ul li:last-child{
border-radius:0 0 8px 8px;
}
#menu-demo2 ul{
position:absolute;
z-index: 1000;
max-height:0;
left: 0;
right: 0;
overflow:hidden;
-moz-transition: .8s all .3s;
-webkit-transition: .8s all .3s;
transition: .8s all .3s;
}
#menu-demo2 li:hover ul{
max-height:15em;
}
/* background des liens menus */
#menu-demo2 li:first-child{
background-color: #000000;
background-image:-webkit-linear-gradient(top, #696969 0%, #696969 100%);
background-image:linear-gradient(to bottom, #696969 0%, #696969 100%);
}
#menu-demo2 li:nth-child(2){
background-color: #729EBF;
background-image: -webkit-linear-gradient(top, #696969 0%, #696969 100%);
background-image:linear-gradient(to bottom, #696969 0%, #696969 100%);
}
#menu-demo2 li:last-child{
background-color: #CFFF6A;
background-image:-webkit-linear-gradient(top, #696969 0%, #696969 100%);
background-image:linear-gradient(to bottom, #696969 0%, #696969 100%);
}

/* background des liens sous menus */
#menu-demo2 li:first-child li{
background:#696969;
}
#menu-demo2 li:nth-child(2) li{
background:#696969;
}
#menu-demo2 li:last-child li{
background:#696969;
}

/* background des liens menus et sous menus au survol */
#menu-demo2 li:first-child:hover, #menu-demo2 li:first-child li:hover{
background:#CFFF6A;
}
#menu-demo2 li:nth-child(2):hover, #menu-demo2 li:nth-child(2) li:hover{
background:#729EBF;
}
#menu-demo2 li:last-child:hover, #menu-demo2 li:last-child li:hover{
background:#FFFF6B;
}

/* les a href */
#menu-demo2 a{
text-decoration:none;
display:block;
padding:8px 32px;
color:#fff;
font-family:arial;
}
#menu-demo2 ul a{
padding:8px 0;
}
#menu-demo2 li:hover li a{
color:#fff;
text-transform:inherit;
}
#menu-demo2 li:hover a, #menu-demo2 li li:hover a{
color:#000;
}}</style>

