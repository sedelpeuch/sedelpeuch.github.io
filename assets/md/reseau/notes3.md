---
title: <i class="fas fa-server fa-2x"></i> Introduction aux réseaux - Le modèle TCP/IP 
icon: fa-server
hide: true
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

TCP/IP est considérée comme une simplification de OSI. Il y a deux visions différentes 
- Le modèle OSI plus générique, des spécifications globales et des fonctionnalités définies au niveau de chaque couche 
- TCP/IP utilise des protocoles bien définis, avec un modèle simplifié

## <i class="fas fa-server"></i> L'architecture TCP/IP

![architecture](/assets/images/reseau/architecture.png){:class="image about center"}

### Encapsulation TCP/IP : exemple

![encapsulation](/assets/images/reseau/encapsulation.png){:class="image about center"}

### Les rôles des 4 couches
* Couche accès au réseau (MAC)
  + Délimitation des trames 
  + Accès au canal
* Couche réseau 
  + Adressage
  + Routage
  + Fragmentation et réassemblage 
* Couche transport 
  + Multiplexage démultiplexage 
  + Transfert de bout en bout
* Couche application 
  + Interface avec l'utilisateur
  + Applications
  
  
## <i class="fas fa-server"></i> Adressage TCP/IPtv
Permet d'identifier chaque machine du réseau de façon unique. C'est le point de départ de toute communication sur Internet. Dans le réseau Internet chaque machine est identifiée par une adresse IP. Une machine possède aussi d'autres adresses. 

### Le modèle IP 
Le modèle IP est la glue qui lie l'internet. Plusieurs protocoles d'accès existent mais un seul de la couche réseau. On parle d'adressage physque et logique. 

### Adressages physique et logique 
L'adresse de la couche accès est une adresse physique, elle est fixée par le constructeur, non modifiable. Elle est utilisée seulement sur les réseaux physique (Ethernet), c'est une adresse plate  et elle identifie physiquement un équipement. 

L'adresse IP est l'adresse logique choisie par l'administrateur du réseau. 
