---
layout: page
hide: true
title: <i class="fas fa-database fa-2x"></i> Conception d'une base de donné
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

## <i class="fas fa-database"></i> Introduction

L'informatique permet de construire des systèmes pour effectuer des calculs
(équations différentielles, calcul matriciel, etc). Aujourd'hui on s'appuie de
plus en plus sur des données ce qui implique une gestion de grandes quantités
d'informations (ie stocjer des données et manipuler ces données). De plus les
données peuvent être de natures diverses, les opérations peuvent être plus ou
moins compliquées.

### Objectifs 

C'est dans ce contexte qu'intervient les SGBD, leurs objectifs sont les suivants 
+ Stocker, centraliser des données (BD) et les mettre à disposition des
  utilisateurs
+ Manipuler (de manière transparente pour l'utilisateur) des données (SGBD)

### Fonctionnalités

Pour répondre à ces objectifs les systèmes de SGBD sont munis des
fonctionnalités suivantes : 
+ Gestion du stockage (tailles importantes de données, éviter les redondances)
+ Persistance (les données survivent aux programmes qui les créent)
+ Fiabilité (mécanismes de reprise sur pannes, logiciel ou matériel)
+ Sécurité / confidentialité (Contrôle des utilisateurs et des droits d'accès
  aux données)
+ Interfaces homme-machine (ergonomie, profils utilisateurs)
+ Distribution (données stockées sur différents sites)
+ Optimisation
+ Contrôle de concurrence : propriétés ACID , transactions
  - Atomicité (soit toutes les opérations de la transaction sont validées, soit
    aucune ne l'est)
  - Cohérence (préservation de la cohérence de la base)
  - Isolation (quelle que soit la manière dont les transactions concurrentes
    sont exécutées, on doit pouvoir les ordonner de sorte à ce que l'état final
    de la base soti le même qu'après une exécution séquentielle des différentes
    transactions)
  - Durabilité (Si une transaction est validée, tous les changements qu'elle a
    effectués sur la base sont persistants)
    
### Architecture fonctionnelle d'une SGBD

![architecture](/assets/images/sgbd/archi_sgbd.png){:class="image about center"}

### Utilisateurs d'un SGBD

1. Administrateur 
   - Définition du schéma logique
   - définition des structures de stockage et des méthodes d'accès
   - Gestion des autorisations
   - Spécification des contraintes
   - Maintenance de la performance
2. Concepteur et programmeur
   - Est informaticien
   - Connaît au moins le LMD
   - Connaît bien le SGBD
   - Connaît un ou plusieurs langages de programmation
3. Utilisateurs

### Niveau d'abstraction des données 

![abstraction](/assets/images/sgbd/abstraction.png){:class="image about center"}

### Principe de base 
+ Indépendance physique (les applications manipulant la base au niveau logique
  ne doivent pas être réécrites si la structure physique est modifiée)
+ Indépendant logique (une modification au niveau logique n'implique aucune
  modification des applications utilisant le niveau externe)
+ Deux types de langages (description des données et manipulation des données)

### Schéma et instance 
+ Analogues à la notion de variable et de type dans les langages de
  programmation 
+ Schéma : structure logique de la base de données 
+ Instance : le contenu effectif de la base de données à un instant donné 

### Modèles de données 
+ Ensemble d'outils permettant de définir les chéma et les instances ainsi que
  les opérations possibles sur les instances 
+ Modèle conceptuel de données : entité - association (diagramme de classes UML)
+ Modèle logique des données : modèle relationnel 
+ Modèle physique de données : implémentation particulière du modèle logique de
  données par le logiciel 
  
### Conception d'une base de données 
La conception d'une base de données se découpe en 4 étapes 
1. Analyse des besoins 
2. Descrption conceptuelle 
3. Conception logique 
4. Conception physique 

Les 2 premières phases sont indépendantes du SGBD 

Le passage de la 2 à la 3 peut être en partie automatisée 

## <i class="fas fa-database"></i> Modèle conceptuel


### Entité 

Une `entité` correspond à un ensemble homogène d’informations qui correspondent
au même « objet » à informatiser. Cette entité a un nom unique afin de la
manipuler facilement. 
Les entités ne sont généralement pas représentes graphiquement. 

Un `type d'entité` désigne un ensemble d'entités qui possèdent une sémantique et
des propriétés communes. 
Une entité est souvent nommée occurrence ou instance de son type entité. 

### Attribut ou propriété, valeur

Un `attribut` (ou une propriété) est une caractéristique associée à un type
entité ou à un type association.
Au niveau du type entité ou du type association, chaque attribut possède un
domaine qui définit l'ensemble des valeurs possible qui peuvent être choisies
pour lui (entier, chaine de caractères, booléen ...). Au niveau de l'entité,
chaque attribut possède une valeur compatible avec son domaine. 
Un attribut ne peut en aucun cas être partagé par plusieurs par plusieurs type
entité ou type association. 
Un attribut est une donné élémentaire, ce qui exclut des données calculées ou
dérivées.
Un type entité et ses attributs doivent être cohérents entre eux. 

### Identifiant ou clé

Un `identifiant` (ou clé) d'un type entité ou d'un type association est
constitué par un ou plusieurs de ses attributs qui doivent avoir une valeur
unique pour chaque entité ou association de ce type.
Il est donc impossible que les attributs constituant l'identifiant d'un type
entité (respectivement type association) prennent la même valeur pour deux
entités (respectivement deux associations) distinctes.
Chaque type entité possède au moins un identifiant, éventuellement formé de
plusieurs attributs. 
Ainsi, chaque type entité possède au moins un attribut qui,  s'il est seul, est donc forcément l'identifiant

### Association ou relation 

![association](/assets/images/sgbd/fig2_04.png){:class="image about right"}

Une `association` (ou une relation) est un lien entre plusieurs entités, les
associations ne sont généralement pas représentées graphiquement. 

Un `type association` (ou un type relation) désigne un ensemble de relations qui
possèdent les mêmes caractéristiques. Le type association décrit un lien entre
plusieurs type entité. Les associations de ce type association lient des entités
de ces type entité. 
Comme les types entités, les types association sont définis à l'aide d'attributs
qui prennent leur valeur dans les associations. 
Un attribut peut être placé dans un type association uniquement lorsqu'il dépend
de toutes les entités liées par le type association.
Un attribut peut être placé dans un type association uniquement lorsqu'il
dépend de toutes les entités liées par le type association. 
Un type association peut ne pas posséder d'attribut explicite et cela est
relativement fréquent, mais on verra qu'il possède au moins des attributs
implicites. 
Une association est souvent nommée occurence ou instance de son type
association. 

Les types entité intervenant dans un type association sont appelés les
`participants` de ce type association

L'ensemble des participants d'un type association est appelé la `collection` de
ce type association
Cette collection comporte au moins un type entité mais elle peut en contenir
plus, on parle alors de type association $$n-aire$$ 

La `dimension`, ou l'arité d'un type association est le nombre de type
association est le nombre de type entité contenu dans la collection 

Comme un entité, un type association possède forcément un identifiant qu'il soit
explicite ou non. 
La concaténation des identifiant des types entités liés à un type association
constitue un identifiant de ce type association et cet identifiant n'est pas
mentionné sur le modèle 
Cette règle implique que deux instances d'un même type association ne peuvent
lier un même ensemble d'entités. 
Souvent, un sous-ensemble de la concaténation des identifiants des types entité
liés suffit à identifier le type association 
On admet également un identifiant plus naturel et explicite, à condition qu'il
ne soit qu'un moyen d'exprimer plus simplement cette concaténation. 

### Cardinalité

![cardinalite](/assets/images/sgbd/fig2_05.png){:class="image about right"}

La `cardinalité` d'une patte reliant un type association et un type entité
précise le nombre de fois minimal et maximal d'interventions d'une entité du
type entité dans une association du type association. La cardinalité minimale
doit être inférieure ou égale à la cardinalité maximale.

Exemple de cardinalité : une personne peut être l'auteur de 0 à $$n$$ livre,
mais un livre ne peut être écrit que par une personne. 

L'expression de la cardinalité est obligatoire pour chaque patte d'un type
association. 
Une cardinalité minimale est toujours 0 ou 1 et une cardinalité maximale est
toujours 1 ou n. 
Ainsi si une cardinalité maximale est connue et vaut 2,3 ou plus, alros nous
considérons qu'elle est interderminée et vaut $$n$$. En effet, si nous
connaissons $$n$$ au moment de la conception, il se peut que cette valeur évolue
au cours du temps. Il vaut donc mieux considérer $$n$$ comme inconnue dès le
départ. De la même manière, on e modélise pas de cardinalités minimales qui
valent plus de 1, car ces valeurs sont également susceptibles d'évoluer. Enfin,
une cardinalité maximale de 0 n'a pas de sens, car elle rendrait le type
association inutile.

### Compléments sur les associations 

#### Associations plurielles. 

![plurielles](/assets/images/sgbd/fig2_06.png){:class="image about center"}

#### Association réflexive.

![reflexives](/assets/images/sgbd/fig2_07.png){:class="image about center"}

Un type association est qualifié de réflexif quand il matérialise une relation
entre un type entité et lui-même. 

Une occurrence de ce type association (ie une association) associe généralement
une occurence  du type association (ie une entité) à une autre entité du même
type. Cette relation peut être symétrique, c'est le cas du type association
*Être frère* sur la figure ci dessus, ou ne pas l'être comme le type association
*Être parent* sur cette même figure. Dans le cas où la relation n'est pas
symétrique, on peut préciser les rôles sur les pattes du type association comme
pour la relation *Être parent* sur cette même figure. L'ambiguïté posée par la
non-symétrie d'un type association réflexif sera levée lors du passage au modèle
relationnel.

#### Association $$n$$-aire

Précédemment nous avons introduit la notion de type association $$n$$-aire. Ce
type association met en relation $$n$$ type entité. Même s'il n'y a, en
principe, pas de limite sur l'arité d'un type association, dans la pratique on
ne va rarement au-delà de trois. Les associations de degré supérieur à deux sont
plus difficiles à manipuler et à interpréter, notamment au niveau des
cardinalité. 

## 

## <i class="fas fa-database"></i> Normalisation
## <i class="fas fa-database"></i> Modèle relationnel
## <i class="fas fa-database"></i> Dépendances fonctionnelles
## <i class="fas fa-database"></i> Formes normales 
## <i class="fas fa-database"></i> Le langage SQL

