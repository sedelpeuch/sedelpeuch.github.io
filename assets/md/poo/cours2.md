---
layout: page
hide: true
title: Substitution d'objets
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

Notes inspirées du
[polycopié](https://georgy.vvv.enseirb-matmeca.fr/PG202-203/poo-info-2021.pdf)
de Georges Eyrolles. 

<style>
html {
 zoom: 0.80;
}
</style>

## La substitution d'objets ou polymorphisme 

Nous voulons pouvoir adapter le code d'une application en substituant une
instance d'une classe par une instance d'une autre classe. Dans notre exemple :
une instance de `Telecommande` doit manipuler plusieurs réalisations différentes
de l'abstraction `Porte`. Le code de la classe `Telecommande` doit permettre de
substituer une instance de la classe `PorteCharniere` par une instance de la
classe `PorteCoulissante`. Ajouter une nouvelle réalisation, correspond à
ajouter une nouvelle classe et à l'instancier. 

Concrètement, dans le code de la classe `Telecommande` :
+ Un emplacement dans le tableau `mesPortes[numero]` va référencer à la fois une
  instance de la classe `PorteCharniere` et une instance de la classe
  `PorteCoulissante`. 
+ L'envoi du message `mesPortes[numero].ouvrir()` doit s'appliquer à la fois à
  une instance de la classe `PorteCharniere` et à une instance de la classe
  `PorteCoulissante`.
  
Pour rendre possible la substitution d'objet, il faut : 
+ assurer la validité de l'envoi de message sur les instances de classes
  différentes référencée par la même variable
+ assurer l'aiguillage vers le code correspondant à la bonne instance référencée
  par cette variable. 
  
### Relation de type / sous types

Dans un langage typé, chaque classe définit un type indépendant. La relation de
type/sous-type va introduire un lien entre deux types. 

`Définition :` Soit un type `L` déclarant une opération `action()`. Si un type
`H` est déclaré sous-type du type `L` alors le type `H` contient toutes les
déclarations contenues dans `L`. L'opération `action()` se retrouve, aussi,
déclarée dans le type `H`. Dans un langage objet, cette relation de type /
sous-type permet à une variable de type `L` d'accepter des instances de la
classe `L` mais aussi des instances de toutes les classes sous-types (par
exemple de la classe `H`). La classe `H` possède un lien "est-un" avec la classe
`L` ("H est-un L").

Le transtypage du sous-type vers le type est implicite puisque le lien "est-un"
assure que toutes les opérations du type se trouvent dans le sous-type. Le
compilateur vérifie la validité des messages par rapport au type de la variable.
Dans un langage orienté objet, cette relation de type / sous type (ce lien
"est-un") se construit à travers le mécanisme de l'héritage. 

### Lien "est-un" et abstraction

Dans notre exemple le code de la classe `Telecommande` doit rester indépendant
des réalisations de porte. La classe `Porte` est une abstraction et les classes
`PorteCharniere` et `PorteCoulissante` sont des réalisations de cette
abstraction. Dans ce cas, il est préférable de définir `Porte` comme une
**classe abstraite pure** (sans aucune réalisation). En Java, nous utilisons la
construction `interface`.

#### La construction interface.

Le langage Java propose une construction particulière pour définir une classe
abstraite pure. Cette construction a comme mot-clé `interface`. 

```
[public] interface NomInterface{
    [static final public type nom = valeur;]
    [[public] type methode([liste paramètre]);]
}
```

+ Une interface définit un type mais n'est pas instanciable. Il est seulement
  possible de déclarer des variables du type d'une interface. 
+ Une interface ne définit aucune variable d'instance.
+ Aucun constructeur n'est autorisé
+ Une interface contient les prototypes de méthodes d'instance abstraites
  publiques. Ces méthodes sont dites abstraites car sans code (sans
  réalisation)
+ Comme une classe, une interface doit être déclarée publique pour être
  accessible en dehors de son paquetage 
+ Il est possible de définir des variables de classe constantes publiques. La
  valeur d'une telle constante est fixée à la définition de la variable de
  classe 
+ Jusqu'à Java 7, aucune méthode de classe n'était autorisée. 

Une classe interface permet de définir une abstraction qui est mise en oeuvre
par des classes concrètes. Voici la représentation de l'abstraction "porte" par
une interface 

```java
package Porte;
public interface Porte {

    public boolean estFerme();
    
    public void fermer();
    
    public void ouvrir();
} 
```

#### Héritage entre une classe et des interfaces 

Pour substituer les instances des classes `PortesCharniere` et
`PorteCoulissante` dans le tableau de type `Porte`, nous devons établir un lien
"est-un" entre ces réalisations et l'abstraction porte. 

Le mot-clé `implements` établit une relation de type / sous-type entre une
classe et une ou plusieurs interfaces. 

L'héritage d'interfaces concerne globalement des déclarations de méthodes
d'instances publique. Cet héritage peut être assimilé à un héritage d'un type
abstrait.

```java
[public][abstract] class NomClasse implements UneInterface, UneAutreInterface{
    //atributs 
    //constructeurs
    //méthodes
}
```

En plus de ses définitions (attributs, constructeurs, méthode) propres, la
classe va inclure la déclaration des prototypes des méthodes de toutes les
interfaces déclarées après la cause `implements`. Les méthodes "héritées" sont
abstraites. Pour obtenir une classe concrète à partir d'un héritage
d'interfaces, il est nécessaire de fournir le code pour chaque méthode définie
dans les interfaces en respectant le prototype de ces méthodes. Sinon, une
classe construite par héritage d'interfaces est une classe abstraite.

### Le polymorphisme 

Avec la relation de type / sous-type, l'envoi de message
`mesPortes[numero].ouvrir()` est valide pour toutes les instances d'une classe
sous-type de `Porte`. La méthode se retrouvant dans plusieurs classes, il reste
à déterminer comment se fait le choix (l'aiguillage vers l'adresse) du code à
déclencher. 

**Liaison statique :** La liaison entre l'envoi du message (nom + paramètre) et
l'adresse de la méthode s'effectue à la compilation. Le compilateur utilise
forcément le type de la variable pour obtenir cette adresse. 

**Liaison dynamique ou retardée :** La liaison entre l'envoi du message et
l'adresse de la méthode se fait à l'exécution, en fonction de l'instance
manipulée. La liaison dynamique nécessite un mécanisme qui permet d'obtenir
l'adresse de la méthode à l'éxecution. 

`Définition :` Le polymorphisme est la capacité d'un élément de texte logiciel a
désigner à l'exécution des formes différentes. 
