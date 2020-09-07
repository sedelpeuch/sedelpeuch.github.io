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


