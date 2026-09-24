---
title: Langage SQL
---

Notes inspirées du [cours](https://moodle.bordeaux-inp.fr/pluginfile.php/96806/mod_resource/content/4/cours_conception-20.pdf) de M. Mosbah et S. Lombardy.

## Introduction

### Présentation générale

#### Introduction

Le langage SQL (Structured Query Language) peut être considéré comme le langage
d'accès normalisé aux bases de données. Il est aujourd'hui supporté par la
plupart des produits, que ce soit par les systèmes de gestion de bases de
données micro tels qu'Access ou par les produits plus professionnels tels
qu'Oracle ou PostgreSQL. Il a fait l'objet de plusieurs normes ANSI/ISO :
SQL-86, SQL-89, SQL-92 (dite SQL2, longtemps la référence), SQL:1999 (SQL3),
puis des révisions régulières (SQL:2003, 2008, 2011, 2016, 2023).

Le succès du langage SQL est dû essentiellement à sa simplicité et au fait qu'il
s'appuie sur le schéma conceptuel pour énoncer des requêtes en laissant le SGBD
responsable de la stratégie d'exécution. Le langage SQL propose un langage de
requêtes ensembliste et assertionnel. Néanmoins, le langage SQL de base ne
possède pas la puissance d'un langage de programmation : entrées / sorties,
instructions conditionnelles, boucles et affectations (ces constructions sont
apportées par des extensions procédurales comme SQL/PSM ou PL/pgSQL). Pour
certains traitements, il est donc nécessaire de coupler le langage SQL avec un
langage de programmation plus complet.

De manière synthétique, on peut dire que SQL est un langage relationnel : il
manipule donc des tables (c.-à-d. des relations) par l'intermédiaire de requêtes
qui produisent également des tables. Contrairement aux relations du modèle
théorique, une table SQL peut toutefois contenir des lignes en double (multiensemble)
tant qu'aucune contrainte de clé ne l'interdit et que `DISTINCT` n'est pas utilisé.

### Catégories d'instructions

Les instructions SQL sont regroupées en catégories en fonction de leur utilité
et des entités manipulées. Nous pouvons distinguer cinq catégories, qui
permettent :

1. la définition des éléments d'une base de données (tables, colonnes, clés,
   index, contraintes...) ;
2. la manipulation des données (insertion, suppression, modification,
   extraction) ;
3. la gestion des droits d'accès aux données (acquisition et révocation des
   droits) ;
4. la gestion des transactions ;
5. et enfin le SQL intégré.

#### Langage de définition de données

Le **langage de définition de données** (LDD, ou Data Definition Language, soit
DDL en anglais) est un langage orienté au niveau de la structure de la base de
données. Le LDD permet de créer, modifier, supprimer des objets. Il permet
également de définir le domaine des données (nombre, chaîne de caractères, date,
booléen...) et d'ajouter des contraintes de valeur sur les données. Les
instructions du LDD sont : `CREATE`, `ALTER`, `DROP`, `RENAME`, `TRUNCATE`,
auxquelles certains SGBD ajoutent des commandes propres (`AUDIT`, `NOAUDIT`,
`ANALYZE` sous Oracle, par exemple).

#### Langage de manipulation de données

Le **langage de manipulation de données** (LMD, ou Data Manipulation Language,
soit DML en anglais) est l'ensemble des commandes concernant la manipulation des
données dans une base de données. Le LMD permet l'ajout, la suppression et la
modification de lignes, la visualisation du contenu des tables et leur
verrouillage. Les instructions du LMD sont : `INSERT`, `UPDATE`, `DELETE`,
`SELECT`, ainsi que, selon les SGBD, `EXPLAIN` (ou `EXPLAIN PLAN`) et
`LOCK TABLE`. Les modifications doivent être validées par la transaction qui les
contient (`COMMIT`) pour être rendues permanentes.

#### Langage de protection d'accès

Le **langage de protection d'accès** (ou Data Control Language, soit DCL en
anglais) s'occupe de gérer les droits d'accès aux tables. Les instructions du DCL
sont : `GRANT`, `REVOKE`.

#### Langage de contrôle de transaction

Le langage de contrôle de transaction (Transaction Control Language, TCL) gère
les modifications faites par le LMD, c'est-à-dire les caractéristiques des
transactions et la validation et l'annulation des modifications. Les
instructions du TCL sont : `COMMIT`, `SAVEPOINT`, `ROLLBACK`, `SET TRANSACTION`.

#### SQL intégré

Le SQL intégré permet d'utiliser SQL dans un langage de troisième génération
(C, Java, COBOL, etc.) :

+ déclaration d'objets ou d'instructions
+ exécution d'instructions
+ gestion des variables et des curseurs
+ traitement des erreurs

Les instructions du SQL intégré sont : `DECLARE`, `TYPE`, `DESCRIBE`, `VAR`,
`CONNECT`, `PREPARE`, `EXECUTE`, `OPEN`, `FETCH`, `CLOSE`, `WHENEVER`.

#### PostgreSQL

Les systèmes traditionnels de gestion de bases de données relationnelles (SGBDR)
offrent un modèle de données composé d'une collection de relations contenant des
attributs relevant chacun d'un type spécifique. Les systèmes commerciaux gèrent
par exemple les nombres décimaux, les entiers, les chaînes de caractères, les
monnaies et les dates. Il est communément admis que ce modèle est inadéquat pour
certaines applications de traitement de données car, si le modèle relationnel a
remplacé avec succès les modèles précédents en partie grâce à sa « simplicité
spartiate », cette dernière complique cependant l'implémentation de certaines
applications. PostgreSQL apporte une puissance additionnelle substantielle en
incorporant les quatre concepts de base suivants afin que les utilisateurs
puissent facilement étendre le système : classes, héritage, types, fonctions.
D'autres fonctionnalités accroissent la puissance et la souplesse : contraintes,
déclencheurs, règles, intégrité des transactions.

Ces fonctionnalités placent PostgreSQL dans la catégorie des bases de données
relationnelles-objet. Ne confondez pas cette catégorie avec celle des serveurs
d'objets, qui ne tolèrent pas aussi bien les langages traditionnels d'accès aux
SGBDR. Ainsi, bien que PostgreSQL possède certaines fonctionnalités orientées
objet, il appartient avant tout au monde des SGBDR. C'est essentiellement
l'aspect SGBDR de PostgreSQL que nous aborderons dans ce cours.

L'une des principales qualités de PostgreSQL est d'être un logiciel libre
(licence PostgreSQL, de type BSD) : il est gratuit et ses sources sont
disponibles. Il est possible de l'installer sur les systèmes Unix/Linux, macOS
et Windows.

PostgreSQL fonctionne selon une architecture client/serveur, il est ainsi
constitué :

+ d'une partie serveur, c'est-à-dire une application fonctionnant sur la machine
  hébergeant la base de données (le serveur de bases de données) capable de
  traiter les requêtes des clients ; il s'agit dans le cas de PostgreSQL d'un
  programme résident appelé `postgres` (anciennement `postmaster`), qui crée un
  processus serveur par connexion cliente ;
+ d'une partie client (par exemple `psql`) devant être installée sur toutes les
  machines nécessitant d'accéder au serveur de base de données (un client peut
  éventuellement fonctionner sur le serveur lui-même).

Les clients (les machines sur lesquelles le client PostgreSQL est installé)
peuvent interroger le serveur de bases de données à l'aide de requêtes SQL.

## Définir une base : langage de définition de données (LDD)

### Schéma relationnel d'exemple

Soit le schéma relationnel minimaliste suivant :

+ Acteur(Num-Act, Nom, Prénom)
+ Jouer(Num-Act, Num-Film)
+ Film(Num-Film, Titre, Année)

#### Contrainte d'intégrité de domaine

Toute comparaison d'attributs n'est acceptée que si ces attributs sont définis
sur le même domaine. Le SGBD doit donc constamment s'assurer de la validité des
valeurs d'un attribut. C'est pourquoi la commande de création de tables doit
préciser, en plus du nom, le type de chaque colonne. Par exemple, pour la table
Film, on précisera que le Titre est une chaîne de caractères et l'Année un
entier. Lors de l'insertion de $n$-uplets dans cette table, le système
s'assurera que les différents champs du $n$-uplet satisfont les contraintes
d'intégrité de domaine des attributs précisés lors de la création de la base. Si
les contraintes ne sont pas satisfaites, le $n$-uplet n'est tout simplement
pas inséré dans la table.

#### Contrainte d'intégrité de référence

Dans tout schéma relationnel, il existe deux types de relations :

+ les relations qui représentent des entités de l'univers modélisé : elles sont
  qualifiées de statiques, ou d'indépendantes ; les relations Acteur et Film en
  sont des exemples ;
+ les relations dont l'existence des $n$-uplets dépend des valeurs d'attributs
  situées dans d'autres relations : il s'agit de relations dynamiques ou
  dépendantes ; la relation Jouer en est un exemple.

Lors de l'insertion d'un $n$-uplet dans la relation Jouer, le SGBD doit
vérifier que les valeurs Num-Act et Num-Film correspondent bien, respectivement,
à une valeur de Num-Act existant dans la relation Acteur et à une valeur
Num-Film existant dans la relation Film.

Lors de la modification d'un $n$-uplet dans la relation Jouer, le SGBD doit
vérifier que les nouvelles valeurs Num-Act et Num-Film correspondent bien,
respectivement, à une valeur de Num-Act existant dans la relation Acteur et à
une valeur Num-Film existant dans la relation Film. La suppression d'un
$n$-uplet de Jouer, en revanche, ne nécessite aucune vérification.

Lors de la suppression d'un $n$-uplet dans la relation Acteur, le SGBD doit
vérifier qu'aucun $n$-uplet de la relation Jouer ne fait référence, par
l'intermédiaire de l'attribut Num-Act, au $n$-uplet que l'on cherche à
supprimer. Le cas échéant, c'est-à-dire si une ou plusieurs valeurs
correspondantes de Num-Act existent dans Jouer, quatre possibilités sont
envisageables :

+ interdire la suppression (`ON DELETE RESTRICT` ou `NO ACTION` en SQL) ;
+ supprimer également les $n$-uplets concernés dans Jouer (`ON DELETE CASCADE`) ;
+ avertir l'utilisateur d'une incohérence ;
+ mettre les valeurs des attributs concernés à une valeur nulle dans la table
  Jouer (`ON DELETE SET NULL`), si l'opération est possible (ce qui n'est pas le
  cas si ces valeurs interviennent dans une clé primaire).

### Créer une table : CREATE TABLE

#### Introduction

Une table est un ensemble de lignes et de colonnes. La création consiste à
définir (en fonction de l'analyse) le nom de ces colonnes, leur format (type),
la valeur par défaut à la création de la ligne (`DEFAULT`) et les règles de
gestion s'appliquant à la colonne (`CONSTRAINT`).

#### Création simple

La commande de création de tables la plus simple ne comportera que le nom et le
type de chaque colonne de la table. À la création, la table sera vide, mais un
certain espace lui sera alloué. La syntaxe est la suivante :

```sql
CREATE TABLE nom_table (nom_col1 TYPE1, nom_col2 TYPE2, ...);
```

Quand on crée une table, il faut définir les contraintes d'intégrité que devront
respecter les données que l'on mettra dans la table.

#### Les types de données

Les types de données (ici ceux de PostgreSQL) peuvent être :

+ `INTEGER` : entiers signés codés sur 4 octets
+ `BIGINT` : entiers signés codés sur 8 octets
+ `REAL` : réels comportant au moins 6 chiffres significatifs, codés sur 4 octets
+ `DOUBLE PRECISION` : réels comportant au moins 15 chiffres significatifs,
  codés sur 8 octets
+ `NUMERIC[(précision[, échelle])]` : nombres décimaux exacts, entiers ou non.
  La précision est le nombre total de chiffres significatifs (jusqu'à 1 000
  lorsqu'elle est déclarée) et l'échelle le nombre de chiffres après la virgule.
+ `CHAR(longueur)` : chaînes de caractères de longueur fixe (complétées par des
  espaces) ; la longueur par défaut est 1.
+ `VARCHAR(longueur)` : chaînes de caractères de longueur variable, limitée à
  `longueur` ; sans longueur, PostgreSQL n'impose pas de limite. La longueur
  maximale déclarable dépend du SGBD (10 485 760 caractères dans PostgreSQL).
+ `DATE` : une date
+ `TIMESTAMP` : une date et une heure
+ `BOOLEAN` : valeurs booléennes
+ `MONEY` : valeurs monétaires (type propre à PostgreSQL)
+ `TEXT` : chaînes de caractères de longueur variable, sans limite déclarée

#### Création avec insertion de données

On peut insérer des données dans une table lors de sa création par la commande
suivante :

```sql
CREATE TABLE nom_table [(nom_col1, nom_col2, ...)] AS SELECT ...;
```

On peut ainsi, en un seul ordre SQL, créer une table et la remplir avec des
données provenant du résultat d'un `SELECT`. Si les types des colonnes ne sont
pas spécifiés, ils correspondront à ceux du `SELECT`. Il en va de même pour les
noms des colonnes. Le `SELECT` peut contenir des fonctions de groupe. Une clause
`ORDER BY` y est acceptée par PostgreSQL, mais elle ne garantit aucun ordre lors
des lectures ultérieures : une table n'est pas ordonnée, seul un `ORDER BY` dans
la requête de lecture fixe l'ordre des lignes renvoyées.
