---
layout: page
hide: true
title: Langage SQL
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

Notes inspirées du
[cours](https://moodle.bordeaux-inp.fr/pluginfile.php/96806/mod_resource/content/4/cours_conception-20.pdf)
de M.Mosbah et S.Lombardy 

<style>
html {
 zoom: 0.80;
}
</style>

## Intrduction 

### Présentation générale 

#### Introduction. 

Le langage SQL (Structured Query Language) peut être considér comme le langage
d'accès normalisé aux bases de données. Il est aujourd'hui supporté par la
plupart des produits commerciaux que ce soit par les systèmes de gestions de
base de données micro tel que Access ou par les produits plus professionnels
tels que Oracle. Il a fait l'objet de plusieurs normes ANSI/ISO dont la plus
répandue aujourd'hui est la norme SQL2 qui a été définie en 1992. 

Le succès du langage SQL est dû essentiellement à sa simplicité et au fait qu'il
s'appuie sur le schéma conceptuel pour énoncer des requêtes en laissant le SGBD
responsable de la stratégie d'exécution. Le langage SQL propose un langage de
requêtes ensembliste et assertionnel. Néanmoins, le langage SQL ne possède pas
la puissance d'une langage de programmation : entrées / sorties, instructions
conditionnelles, boucles et affectations. Pour certains traitements il est donc
nécessaire de coupler le langage SQL avec un langage de programmation plus
complet. 

De manière synthétique, on peut dire que SQL est un langage relationnel, il
manipule donc des tables (ie des relations, c'est à dire des ensembles) par
l'intermédiaire de requêtes qui produisent également des tables.

### Catégories d'instructions 

Les instructions SQL sont regroupées en catégories en fonction de leur utilité
et des entités manipulées. Nous pouvons distinguer cinq catégories, qui
permettent : 
1. la définition des éléments d'une base de données (tables, colonnes, clés,
   index, contraintes ...)
2. la manipulation des données (insertion, suppression, modification,
   extraction)
3. la gestion des droits d'accès aux données (acquisition et révocation des
   droits)
4. la gestion des transactions 
5. et enfin le SQL intégré

#### Langage de définition de données 

Le **langage de définition de données** (LDD, oou Data Definition Language, soit
DDL en anglais) est un langage orienté au niveau de la structure de la base de
données. Le LDD permet de créer, modifier, supprimer des objets. Il permet
également de définir le domaine des données (nombre, chaîne de caractères, date,
booléen ...) et d'ajouter des contraintes de valeur sur les données. Il permet
enfin d'autoriser ou d'interdire l'accès aux données et d'activer ou de
désactiver l'audit pour un utilisateur donné. Les instruction du LDD sont :
CREATE ALTER DROP AUDIT NOAUDIT ANALYSE RENAME TRUNCATE

#### Langage de manipulation de données 

Le **langage de manipulation de données** (LMD, ou Data Manipulation Language,
soit DML en anglais) est l'ensemble des commandes concernant la manipulation des
données dans une base de données. Le LMD permet l'ajout, la suppression et l
modification de ligne, la visualistion du contenu des tables et leur
verouillage. Les instruction du LMD sont : INSERT UPDATE DELETE SELECT EXPLAIN
PLAN LOCK TABLE. Ces éléments doivent être validés par une transaction pour
qu'ils soient pris en compte. 

#### Langage de protections d'accès
Le **langage de protections d'accès** (ou Data Control Language, soit DCL en
anglais) s'occupe de gérer les droits d'accès aux tables. Les instruction du DCL
sont : GRANT, REVOKE. 

#### Langage de contrôle de transaction 

Le langage de contrôle de transaction gère les modifications faites par le LMD,
c'est à dire les caractéristiques des transactions et la validation et
l'annulation des modifications. LEs instruction du TCL sont : COMMIT SAVEPOINT
ROLLBACK SET TRANSACTION

#### SQL intégré 

Le SQL intégré permet d'utiliser SQL dans un langage de troisième génération
(C,java,cobol, etc ):
+ déclaration d'objets ou d'instructions 
+ exécution d'instructions
+ gestion des variables et des curseurs 
+ traitement des erreurs 

Les instructions du SQL intégré sont : DECLARE TYPE DESCRIBE VAR CONNECT PREPARE
EXECUTE OPEN FETCH CLOSE WHENEVER

#### PostgreSQL 

Les systèmes traditionnels de gestion de bases de données relationnelles (SGBDR)
offrent un modèle de données composé d'une collection de relations contenant des
attributs relevant chacun d'un type spécifique. Le systèmes commerciaux gèrent
par exemple les nombres décimaux, les entiers, les chaines de caractères, les
monnaies et les dates. Il est communément admis que ce modèle est inadéquat pour
les applications de traitement de données de l'avenir, car, si le modèle
relationnel a remplacé avec succès les modèles précédents en partie grâce à sa
"simplicité spartiate", cette dernière complique cependant l'implémentation de
certaines applications. PostgreSQL apporte une puissance additionnelle
substantielle en incorporant les quatre concepts de base suivants afin que les
utilisateurs puissent facilement étendre le système : classe, héritage, types
,fonctions. D'autres fonctionnalités accroissent la puissance et la souplesse :
contraintes, déclencheurs, règles, intégrité des transactions. 

Ces fonctionnalités placent PostgreSQL dans la catégorie des bases de données
relationnel-objet. Ne confondez pas cette catégorie avec celle des serveur
d'objets qui ne tolère pas aussi bien les langages traditionnels d'accès aux
SGBDR. Ainsi, bien que PostgreSQL possède certaines fonctionnalités orientées
objet, il appartient avant tout au monde des SGBDR. C'est essentiellement
l'aspect SGBDR de PostgreSQL que nous aborderons dans ce cours. 

L'une des principales qualités de PostgreSQL est d'être un logiciel libre, c'est
à dire gratuit dont les sources sont disponibles. Il est possible de l'installer
sur les systèmes Unix/Linux et Win32. 

PostgreSQL fonctionne selon une architecture client/serveur, il est ainsi
constitué : 
+ d'une partie serveur, c'est à dire une application fonctionnant sur la machine
  hébergeant la base de données (le serveur de bases de données) capable de
  traiter les requêtes des clients, il s'agit dans le cas de PostgreSQL d'une
  programme en mémoire appelé postmaster
+ d'une partie client (psql) devant être installée sur toutes les machines
  nécessitant d'accéder au serveur de base de données (un client peut
  éventuellement fonctionner sur le serveur lui-même). 
  
  Les clients (les machines sur lesquelles le client PostgreSQL est installé)
  peuvent interroger le serveur de bases de données à l'aide de requêtes SQL. 
  
## Définir une base ? Langage de définition de données (LDD)

### Soit le schéma relationnel minimaliste suivant : 
+ Acteur(Num-Act, Nom, Prénom)
+ Jouer(Num-Act,Num-Film)
+ Film(Num-Film, Titre, Année)

#### Contrainte d'intégrité de domaine 

Toute comparaison d'attributs n'est acceptée que si ces attributs sont définis
sur le même domaine. Le SGBD doit donc constamment s'assurer de la validité des
valeurs d'un attribut. C'est pourquoi la commande de création de tables doit
préciser, en plus du nom, le type de chaque colonne. Par exemple, pour la table
Film, on précisera que le Titre est une chaîne de caractères et l'Année une
date. Lors de l'insertion de $$n$$-uplets dans cette table, le système
s'assurera que les différents champs du $$n$$-uplet satisferont les contraintes
d'intégrité de domaine des attributs précisés lors de la création de labse. Si
les contraintes ne sont pas satisfaites, le $$n$$-uplet n'est tout simplement
pas inséré dans la table.

#### Contrainte d'intégrité de référence

Dans tout schéma relationnel, il existe deux types de relation : 
+ les relations qui représentent des entités de l'univers modélisé, elles sont
  qualifiées de statiques, ou d'indépendantes, les relations Acteur et Film en
  sont des exemples 
+ les relations dont l'existence des $$n$$-uplets dépend des valeurs d'attributs
  situées dans d'autres relations, il s'agit de relations dynamiques ou
  dépendantes, la relation Jouer en est un exemple. 
  
Lors de l'insertion d'un $$n$$-uplet dans la relation Jouer, le SGBD doit
vérifier que les valeurs Num-Act et Num-Film correspondent bien, respectivement,
à une valeur de Num-Act existant dans la relation Acteur et une valeur Num-Film
existant dans la relation Film. 

Lors de la suppression d'un $$n$$-uplet dans la relation Jouer, le SGBD doit
vérifier que les valeurs Num-Act et Nuum-Film correspondent bien,
respectivement, à une valeur de Num-act existant dans la relation Acteur et une
valeur Num-Film existant dans la relation Film. 

Lors de la suppression d'un $$n$$-uplet dans la relation Acteur, le SGBD doit
vérifier qu'aucun $$n$$-uplet de la relation Jouer ne faire référence, par
l'intermédiaire de l'attribut $$Num-act$$, au $$n$$-uplet de la relation Jouer
ne fait référence, par l'intermédiaire de l'attribut Num-Act, au $$n$$-uplet que
l'on cherche à supprimer. Le cas échéant, c'est à dire si une, ou plusieurs,
valeur correspondante de Num-Act existe dans Jouet, quatre possibilités sont
envisageables : 
+ interdire la suppression 
+ supprimer également les $$n$$-uplet concernés dans Jouer
+ avertir l'utilisateur d'une incohérence
+ mettre les valeurs des attributs concernés à une valeur nulle dans la table
  Jouer, si l'opération est possible (ce qui n'est pas le cas si ces valeurs
  interviennent dans une clé primaire);
  

### Créer une table : CREATE TABLE

#### Introduction. 

Une table est un ensemble de lignes et de colonnes. La création conssite à
définir (en fonction de l'analyse) le nom de ces colonnes, leur format (type),
la valeur par défaut à la création de la ligne (DEFAULT) et les règles de
gestion s'appliquant à la colonne (CONSTRAINT). 

#### Création simple.

La commande de création de tables la plus simple ne comportera que le nom et le
type de chaque colonne de la table. A la création, la table sera vide, mais un
certain espace lui sera alloué. La syntaxe est la suivante : 
```
CREATE TABLE nom_table(nom_col1 TYPE1, nom_col2 TYPE2,...)
```

Quand on crée une table, il faut définir les contraintes d'intégrité que devront
respecter les données que l'on mettra dans la table. 

#### Les types de données.

Les types de données peuvent être 

+ INTEGER : Ce type permet de stocker des entiers signés codés sur 4 octets 
+ BIGINT : Ce type permet de stocker des entiers signés codés sur 8 octets
+ REAL : Ce type permet de stocker des réels comportant 6 chiffres significatifs
  codés sur 4 octets 
+ DOUBLE PRECISION : Ce type permet de stocker des réels comportant 15 chiffres
  significatifs codés sur 8 octets 
+ NUMERO[(précision,[longueur])] : Ce type de données permet de stocker des
  données numériques à la fois entières et réelles avec une précision de 1 000
  chiffres significatifs. longueur précise le nombre maximum de chiffres
  significatifs stockés et précision donne le nombre maximum de chiffres après
  la virgule. 
+ CHAR(longueur) : Ce type de données permet de stocker des chaines de
  caractères de longueur fixe. longueur doit être inférieur à 255, sa valeur par
  défaut est 1. 
+ VARCHAR(longueur) : Ce type de données permet de stocker des chaînes de
  caractères de longueur variable, longueur doit être inférieur à 2000, il n'y a
  pas de valeur par défaut. 
+ DATE : Ce type de données permet de stocker des données constituées d'une date 
+ TIMESTAMP : Ce type de données permet de stocker des données constituées d'une
  date et d'une heure
+ BOOLEAN : Ce type de données permet de stocker des valeurs Booléenne 
+ MONEY : Ce type de données permet de stocker des valeurs monétaires
+ TEXT : Ce type de données permet de stocker des chaînes de caractères de
  longueur variable 
  
#### Crééation avec Insertion de données 

On peut insérer des données dans une table lors de sa création par la commande
suivante 

```
CREATE TABLE nom_table [(nom_col1, nom_col2, ...)] AS SELECT ...

On peut ainsi, en un seul ordre SQL créer une table et la remplir avec des données provenant du résultat d'un SELECt. Si les types des colonnes ne sont pas spécifiés, ils correspondront à ceux du SELECT. Il en va de même pour les noms des colonnes. Le SELECT peut contenir des fonctions de groupes, mais pas d'ORDER BY, car 
```
