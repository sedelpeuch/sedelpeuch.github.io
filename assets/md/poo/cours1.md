---
layout: page
hide: true
title: <i class="fas fa-code fa-2x"></i> Objet et encapsulation
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

## <i class="fas fa-code"></i> L'encapsulation

L'`encapsulation` dans l'approche objet consiste à regrouper le code (données et
traitements) qui fournit un même service dans une seule entité. Une
encapsulation spécifie le fonctionnement d'un service (par un ensemble
d'actions) en masquant la manière de le réaliser. 
Respecter le concept d'encapsulation permet de séparer l'utilisation d'un
service de sa réalisation et renforcer la manipulation d'abstractions dans la
fabrication d'un logiciel. 

### Objet

L'`objet` est l'entité qui met en oeuvre, à l'exécution, une encapsulation.
Plusieurs objets peuvent mettre en oeuvre la même encapsulation.
Les données encapsulées dans unobjet sont désignées par les termes **attributs**
ou **variable d'instances**. 
Les traitements encapsulés dans un objet sont désignées par le terme
**méthodes**
Dans cette approche, l'exécution d'un programme manipule uniquement des objets :
création, passage de paramètres et communication entre objets. Un objet $$A$$
communique avec un objet $$B$$ lorsqu'un des traitements de l'objet $$A$$
déclenche une des méthodes de l'objet $$B$$. 

### Classe 

Un langage orienté objet doit fournir un moyen de décrire une encapsulation
(utilisation et réalisation). En général, cette description d'une encapsulation
est faite à l'aide de la construction appelée **classe**. 
Dans un langage type, une classe correspond à la déclaration d'un type. 

### Description des encapsulations en Java
Le langage Java est un langage orienté objet typé utilisant des classes pour la
description des encapsulations. 

- Définition de la classe Java `PorteCharniere` dans un fichier source nommé :
  `PorteCharniere.java`. 
  
  ```java
class PorteCharniere {
    // La définition des variables / attributs d'un objet
    boolean estFerme;
    
    //La définition des méthodes d'un objet
    void fermer(){
        /* Todo */
        estFerme=true;
    }
    
    void ouvrir(){
        /*Todo*/
        estFerme=false;
    }
    
    boolean estFerme(){
        return estFerme;
    }
    }
  ```

## <i class="fas fa-code"></i> Les objets

L'`objet` est l'entit de base de l'exécution. À chaque objet est attribu une
zone mémoire différente. 
Plusieurs objets mettant en oeuvre la même encapsulation, il est nécessaire
d'identifier de manière unique un objet. 
L'`identité` d'un objet est assurée par l'adresse de la zone mémoire attribuée à
cet objet. 
La zone mémoire d'un objet contient la valeur de ses attributs (suivant la
description de l'encapsulation). 
Un objet encapsule les méthodes. En pratique, tous les objets mettant en oeuvre
la même encapsulation partagent le code des méthodes. Ce code commun est exécuté
avec l'identité (la zone mémoire) de l'objet sur lequel est déclenchée une
action. 

Un langage orienté objet doit fournir des mécanismes pour : 
- créer un objet : **instanciation**
- déclencher une action sur un objet : **envoi de messages**
- assurer la séparation utilisation/ réalisation : **masquage d'information**

### Instanciation

L'`instanciation` désigne l'opération de créer un objet à partir de la
description de l'encapsulation. Elle attribue une zone mémoire à l'objet et
initialise ses attributs. 
Dans un langage à classe, un objet est instancié à partir d'une classe. Un objet
est souvent désigné par le terme `instance`.
Pour respecter l'encapsulation, la classe fournit le code d'initialisation par
l'intermédiaire d'un traitement appelé *constructeur*. Comme une méthode, un
constructeur admet une liste de paramètres.
En Java, l'instanciation est une expression atomique construire à partir de
l'opérateur `new` et d'un constructeur de la classe.  


#### Affectation dans une variable 

Comme habituellement dans le code, les variables / paramètres (de méthode) vont
permettre de manipuler les objets / instances. 
Dans un langage typé, le compilateur vérifie la compatibilité des types entre le
type de la variable / paramètre et l'instance affectée à cette variable. 
Une variable de type `PorteCharniere` contient une instance de la classe
`PorteCharniere` 

```java
PorteCharniere sesame; 
sesame = new PorteCharniere();
Portecharniere paradis = new Portecharniere();
sesame = new Portecharniere();
paradis = sesame;
Telecommande maTelecommande = new Telecommande(3);
maTelecommande = sesame; // erreur type non compatible
```

En Java, les variables / paramètres correspondant à des objets sont des
références. La variable `paradis` contient l'adresse d'un objet. La libération
de la zone mémoire d'un objet est prise en charge par le ramasse miettes de la
machine virtuelle de Java ("jvm")

Les variables des type de base (comme `int, float, boolean, byte, char`)
contiennent des valeurs. Les comportements entre type de base et type référence
sont différents dans l'affectation et le passage de paramètres. Les chaînes de
caractères constantes sont des instances de la classe `string`. Les tableaux
Java sont des objets avec des méthodes d'accès et possède l'attribut de
longueur. 

```java
class Telecommande {
    int nbPortes;
    Portecharniere[] mesPortes;
    
    Telecommande(int capacite) {
        nbPortes = 0;
        mesPortes = new PorteCharnière [capacite];
    }
    voir positionner(Portecharniere p){
        mesPortes[nbPortes]=p;
        nbPortes++;
        /* Todo depassement */
    }
    void activer(int numero){
        /*Todo*/
    }
    void desactiver(int numero){
        /*Todo*/
    }
    void desactiverTout(){
        /*Todo*/
    }
} 
```

Pour respecter l'encapsulation, le code du constructeur doit s'assurer
d'initiliser les attributs avec des valeurs cohérentes par rapport à
l'encapsulation. Sinon les futures actions déclenchées sur l'objet ne
respecteront pas le service proposé par l'encapsulation. Le cas le plus fréquent
est une valeur invalide par les paramètres du constructeur. Les actions d'une
instance de télécommande sont elles cohérentes avec le service de
l'encapsulation si la valeur du paramètre d'initialisation est égale à zéro ? 

### Envoie de messages 

Un `message` est formé d'un nom et d'une liste de valeur de paramètres (cette
liste peut être vide). À la réception d'un message, l'objet fait la
correspondant entre le message et l'action à déclencher. 

La notion d'envoi de messages cherche à abstraire la manière dont est choisie
l'action. Un même message peut déclencher des actions différentes sur des
encapsulations différentes : Quel est le code déclenché par l'appel à une
méthode ? Est-ce un accès à un attribut ou l'appel à une méthode ? en général la
notation pointée est utilisée pour indiquer l'envoie du'n message à un objet.
L'envoi du message s'écrit en utilisant la variable qui référence l'objet.
Envoie de messages avec les variables de l'exemple précédent : 

```java
// appel d'un traitement 
paradis.fermer();
sesame.ouvrir();
sesame.estFerme();
maTelecommande.positionner(sesame);
maTelecommande.activer(1);
maTelecommande.desactiver(2);
maTelecommande.desactivertout();
// accès à un attribut
sesame.estFerme = true;
maTelecommande.mesPortes[1].estFerme = false; 
maTelecommande.mesPortes[1].ouvrir();
```

En java, l'abstraction n'est pas complète car la syntaxe est différente entre un
attribut et un méthode. C'est au moment de l'exécution que l'envoi de messages
est réalisé. Le message est transmis à l'objet référencé par la variable. Du
coup, la compilation ne peut pas vérifier l'existence d'un message sur un objet.
La seule vérification possible est par rapport au type de la variable. 

### Construire une encapsulation 

#### Encapsulation et masquage d'information 

Un objet met en oeuvre une encapsulation, il y a donc abstraction sur la
réalisation de l'objet. Pour permettre de changer cette réalisation sans
modifier le code utilisant cet objet (code client), nous cherchons à masquer
l'information sur la réalisation au coude client. Les détails de la réalisation
d'un objet doivent être visible le moins possible. Dans un langage à classe, ce
masque d'information est défini au niveau de la classe avec le mécanisme de
portée des identificateurs. De base, deux portées sont nécessaires pour séparer
utilisation et réalisation : 
- portée publique, l'identificateur est accessible par un code écrit en dehors
  de la classe 
- portée privée, l'identificateur est accessible uniquemeent par le code contenu
  dans la classe 
  
  Dans  le code de la classe `Telecommande`, l'instruction
  `mesPortes[i].estFerme` ne respecte pas l'encapsulation. La définition de
  l'attribut risque de changer : 
  - le choix de stocker la valeur plutôt que la calculer
  - le choix de son type ou de la signification de sa valeur 

Le choix de définir un attribut est une décision de réalisation. 

> Afin de respecter l'encapsulation, tous les attributs d'un objet doivent être
> déclarés privés et seules les méthodes peuvent être déclarées publiques

```java
class Telecommande {
    private int nbPortes;
    private PorteCharniere[] mesPortes;
    
    public Telecommande(int capacite){
        nbPortes = 0; 
        mesPortes = new Portecharniere[capacite];
    }
    
    public boolean estRempli ( ) {
    return mesPortes . length <= nbPortes ;
    }
    public void positionner ( PorteCharniere p ) {
    i f ( mesPortes . length <= nbPortes )
    return ; /* Todo erreur de depassement */
    mesPortes [ nbPortes ] = p ;
    nbPortes ++;
    }
    public void activer ( int numero ) {
    mesPortes [numero ] . ouvr ir ( ) ;
    }
    public void desactiver ( int numero ) {
    mesPortes [numero ] . fermer ( ) ;
    }
    public void desactiverTout ( ) {
    for ( int i = 0 ; i < nbPortes ; i ++ )
    if ( ! mesPortes [ i ] . estFerme ( ) )
    mesPortes[i].fermer();
    }
}
```

#### Objet constant 

Un objet possède un état défini à partir des valeurs contenues dans l’ensemble
de ses attributs. Un objet est constant si son état ne peut-être modifié.
En Java, un objet est constant que si aucune de ses méthodes ne modifie son
état : exemple dans l’A.P.I standard Java, la différence entre les instances de la
classe `String`  et les instances de la classe StringBuffer. Cette encapsulation des
chaînes constantes montre l’utilisation habituelle des objets constants en Java : le
partage d’objets.

#### Communication entre objets 

Un objet est passif. Il déclenche des actions uniquement en réponse à des
sollicitations d'autres objets. Prenons le cas où un objet `t` (instance de la
classe `Petit`) doit envoyer le message `voler` à un objet `r` (instance de la
classe `Coeur`). 

Pour communiquer, l'objet `t` doit posséder une référence sur l'objet `r` au
moins au moment de l'exécution de l'envoi du message. La solution directe est de
stocker cette référence dans les attributs de l'objet `t`; l'objet `t` "a un"
objet `r`. La classe `Petit` doit déclarer un attribut / une variable d'instance
de type `Coeur`. 

Le lien `"a-un"` entre deux classes. Une classe `P` possède un lien "a un" avec
une classe `R` si elle définit un attribut de type `R`. Une instance de `P`
possède dans ses attributs une instance de `R`. 

Le lien "a-un" ne fixe pas la manière d'obtenir la référence stockée dans
l'attribut : instanciation de la classe Coeur dans le constructeur de la classe
`Petit` ou passage de la référence comme paramètre d'un constructeur ou d'une
méthode de la classe `Petit`. 

```java 
class Telecommande{
  int nbPortes ;
  PorteCharniere [ ] mesPortes ;
  Telecommande ( int capac ite ) {
    nbPortes = 0 ;
    mesPortes = new PorteCharniere [ capac ite ] ;
  }

  void pos it ionner ( PorteCharniere p ) {
    i f ( nbPortes >= mesPortes . length )
      return ; /* Todo erreur de depassement */
    mesPortes [ nbPortes ] = p ;
    nbPortes ++;
  }
  void a c t i v e r ( int numero ) {
    mesPortes [numero ] . ouvr ir ( ) ;
  }
  void desac t iver ( int numero ) {
    mesPortes [numero ] . fermer ( ) ;
  }
  void desact iverTout ( ) {
    for ( int i = 0 ; i < nbPortes ; i ++ )
      i f ( ! mesPortes [ i ] . estFerme )
        mesPortes [ i ] . fermer ( ) ;
  }
}
```

#### Des traitements applicables à toutes les encapsulations 

Dans la pratique, il existe un petit nombre de traitements particuliers qui
peuvent s'appliquer à tous les objets. Voici les plus fréquents  : 

Pour vérifier l'égalité entre deux instances de la même classe. L'opérateur Java
`==` indique l'égalité de références (c'est la même instance). Mais deux
instances différentes peuvent être considérées comme égales par rapport à la
valeur de leurs attributs. C'est l'objectif de la méthode `equals()`.

Pour copier ou cloner un objet. Le passage d'un paramètre objet se fait
exclusiement par référence / adresse. Pour éviter un effet de bord, il est donc
parfois nécessaire d'effectuer une copie d'un objet. C'est l'objectif de la
méthode `clone()`.
