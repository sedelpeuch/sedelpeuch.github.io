---
title: Semestre 5
---

import DossierHeader from "@site/src/components/DossierHeader";
import MatiereSection from "@site/src/components/MatiereSection";
import ResourceList from "@site/src/components/ResourceList";

<DossierHeader school="enseirb" crumbs={["ENSEIRB", "Semestre 5"]} />

<MatiereSection icon="🧮" title="Algorithmique et mathématiques 1">

### Initiation à l'algorithmique

Ce cours présente une initiation à la résolution de problèmes simples au moyen
de l'algorithmique, en particulier les problèmes de tris. Les seuls objets
manipulés sont de types simples (entiers, réels,etc) ou tableaux et matrice de
ceux-ci. Quelques familles d'algorithmes sont introduites: diviser pour régner,
dynamiques et gloutons. La comparaison d'algorithmes est abordée par
l'introduction de la notion de complexité.

<ResourceList type="cours" title="Cours" count={1}>

- [cours](http://www.apprendre-en-ligne.net/info/bibliotheque/initiation-algorithmique.pdf)

</ResourceList>

<ResourceList type="support" title="Supports" count={1}>

- [fiches de révisions](https://drive.google.com/file/d/1-SemWVRsfUbeEjiQ5UYnzp4yw0mdMLHn/view)

</ResourceList>

### Structures arborescentes

Ce cours rappelle quelques structures mathématiques usuelles (ensemble, séquence
et arbre), introduit la notion de type abstrait et fournit quelque méthode pour
les implémenter.

<ResourceList type="cours" title="Cours" count={1}>

- [cours](http://www.mohamedelafrit.com/education/ENSEIRB/Graphes/notes22Novembre2006.pdf)

</ResourceList>

### Traitement de l'information

Le cours d'analyse des données répond à deux objectifs

+ d'une part, de familiariser l'étudiant aux principales méthodes factorielles
  (analyse en composantes principales et analyse factorielle des correspondances)
  et de classification (classification ascendante hiérarchique)
+ d'autre part de familiariser les étudiants au logiciel R de plus en plus
  utilisé dans les organismes de recherche français. R étant un logiciel libre,
  les étudiants peuvent le télécharger gratuitement et s'y initier aisément en
  particulier à l'aide des exemples présentés dans le cours.

Pas de ressources pédagogiques... mais une alternative provenant de l'institut
mathématiques de Toulouse qui résume parfaitement le cours (bonne chance)

<ResourceList type="cours" title="Cours" count={1}>

- [cours](./img/asdm.pdf)

</ResourceList>

### Probabilités et statistiques

Dans la première partie, il s'agit d'étudier les notions de base du calcul des
probabilités, qui seront utilisées dans d'autres enseignements à l' ENSEIRB :
Recherche opérationnelle, Traitement du signal, Théorie de l'information,
Analyse des données, Algorithmique probabiliste et surtout les Statistiques
étudiées dans la deuxième partie de ce module.

<ResourceList type="cours" title="Cours" count={1}>

- [cours](./img/probas.pdf)

</ResourceList>

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

<ResourceList type="cours" title="Cours" count={1}>

- [cours](./img/poly-if107-etd.pdf)

</ResourceList>

<ResourceList type="td" title="Travaux dirigés" count={6}>

- [introduction](./img/td-induction.etd.pdf)
- [logique des prédicats](./img/td-logique-predicats.etd.pdf)
- [logique propositionnelle](./img/td-logique-propositionnelle.etd.pdf)
- [preuve formelle](./img/td-preuve-formelle.etd.pdf)
- [preuve hoare](./img/td-preuve-hoare.etd.pdf)
- [preuve programme](./img/td-preuve-programme.etd.pdf)

</ResourceList>

</MatiereSection>

<MatiereSection icon="💻" title="Programmation et environnement 1">

### Environnement de travail

L'objectif est de maîtriser l'environnement de travail de la filière
informatique de l'ENSEIRB-MATMECA: éditeur de texte, compilateur, composeur de
documents. Ce cours aborde également la programmation shell permettant
d'automatiser des tâches d'administration système.

<ResourceList type="cours" title="Cours" count={5}>

- [00](http://mfaverge.vvv.enseirb-matmeca.fr/wordpress/wp-content/cours/IF104/00-introduction.pdf)
- [01](./img/01.pdf)
- [02](./img/02.pdf)
- [03](./img/03.pdf)
- [04](./img/04.pdf)

</ResourceList>

<ResourceList type="support" title="Supports" count={2}>

- [bash](./img/Bash.tar.xz)
- [LaTeX](./img/LaTeX.tar.xz)

</ResourceList>

### Structure des ordinateurs

Ce cours aborde la structure des ordinateurs et la coordination de ses
différents éléments.

+ Introduction sur l'évolution de la structure des ordinateurs
+ Communication dans les systèmes: architectures, structures et commandes des
  bus et autres liaisons entre les composants,
+ Communication vers les périphériques, interruptions et exceptions.
+ Memoire: structure et gestion de la mémoire, exécution de programme et système
  d'exploitation

<ResourceList type="cours" title="Cours" count={7}>

- [archi1](./img/archi-1.pdf)
- [archi2](./img/archi-2.pdf)
- [archi3](./img/archi-3.pdf)
- [archi4](./img/archi-4.pdf)
- [archi5](./img/archi-5.pdf)
- [archi6](./img/archi-6.pdf)
- [archi7](./img/archi-7.pdf)

</ResourceList>

### Programmation impérative 1

L'objectif de ce cours est d'apprendre les bases de la programmation impérative
par l'étude de la syntaxe et la sémantique du langage C.

<ResourceList type="cours" title="Cours" count={1}>

- [cours](https://www.labri.fr/perso/fmoranda/slides/pg101.html#/)

</ResourceList>

<ResourceList type="support" title="Supports" count={1}>

- [plateforme d'exercice](https://thor.enseirb-matmeca.fr:4443/)

</ResourceList>

<ResourceList type="correction" title="Correction" count={8}>

- [correction1](./img/feuille1.tar.xz)
- [correction2](./img/feuille2.tar.xz)
- [correction3](./img/feuille3.tar.xz)
- [correction4](./img/feuille4.tar.xz)
- [correction5](./img/feuille5.tar.xz)
- [correction5.1](./img/feuille5-1.tar.xz)
- [correction5.2](./img/feuille5-2.tar.xz)
- [correction6](./img/feuille6.tar.xz)

</ResourceList>

</MatiereSection>

<MatiereSection icon="🗂️" title="Projets">

La scolarité de première année ENSEIRB, en filière Informatique, comprend
plusieurs projets intégrés au sein de l'UE C des deux premiers semestres de la
formation en Informatique. Chaque semestre, un travail de projet doit être
réalisé dans les différents langages de programmation étudiés en cours.

L'objectif de ces projets est double : d'une part, ils sont l'occasion de mettre
en pratique (voire d'approfondir) les connaissances théoriques vues en cours;
d'autre part, ils constituent souvent un premier contact avec le travail en
équipe. Ils sont normalement réalisés par groupes de 4 ou 5 élèves

<ResourceList type="projet" title="Documents du projet" count={1}>

- [page](https://www.labri.fr/perso/renault/working/teaching/projets/projets.php)

</ResourceList>

</MatiereSection>
