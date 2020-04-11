---
title: <i class="fas fa-server fa-2x"></i> Introduction aux réseaux - Historique et notion de bases 
icon: fa-server
hide: true
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

## <i class="fas fa-server"></i> Qu'est ce qu'un réseau de communication ? 

+ Un réseau de communication peut être défini comme l'ensemble des ressources
matérielles et logicielles liées à la transmission et l'échange d'information
ntre différentes entités. Suivant leur organisation, ou architecture, les
distances, les vitesses de transmission et la nature des informations
transmises, les réseaux ont l'objet d'un certain nombre de spécifications et
normes.
+ Les réseaux de communications peuvent être classés en fonction : 
  + du type d'informations transportées
  + de la nature des entités impliquées
+ On distingue trois principals catégories de réseaux
  + Les réseaux de télécommunications
  + Les réseaux téléinformatiques
  + Les réseaux de télédiffusion 
  
##  <i class="fas fa-server"></i> Les réseaux de télécommunications

Ce soit les réseaux de communications les plus anciens, ils ont pour objectif
l'acheminement de communications vocales entre indivdus. La parole pouvant être
envoyée brute sous la forme d'ondes électromagnétiques, on parle alors de
communication vocale analogique, ou sous la forme d'une suite d'information
binaire (0 ou 1) après avoir subi un traitement appelé numérisation.

### Historique des télécommunications 

Les télécommunications recouvrent toutes les techniques de transfert de
l'information quelle qu'en soit sa nature. LE terme "Télécommunication" a été
introduit en 1904 par Edouard Estaunié, ingénieur général des télégraphes
1863-1942. En 1932 (conférence de Madrid), l'Union Télégraphique Internationnale
est renommée Union Internationnale des Télécommunication

### Mise en relation des correspondants dans les réseaux de télécommunications

La mise en relation c'est la communication, la commutation de circuits
(communication spatiale) consiste à juxtaposer de bout en bout les voies
physiques de communication, la liaison est maintenu durant tout l'échange et
réalisée manuellement par des opérateurs. En 1970, le réseau téléphonique
français est entièrement automatisé.

##  <i class="fas fa-server"></i> Les réseaux téléinformatiques

Ils sont destinés à relier des équipements informatiques (serveurs, ordinateur,
imprimantes ...). L'échange de données binaires issues d'applications ou
processus informatiques tels que les traitements de textes, les bases de
données, ou les navigateurs Internet, le partage de ressources informatiques.

### Historique de l'Internet

![historique internet](/assets/images/reseau/historique.png){:class="image about
right"}
Le 7 février 1958, création de l'agence ARPA comme agence pour les projets de
recherche avancée, en 1969 développement du premier réseau à transfert de
paquets ou ARPANET, au milieu des années 1970, début des travaux de l'ARPA sur
une technologie internet.


### Classification des réseaux téléinformatiques

| Bus des ordinateurs          | ISA, MCA, PCI                                        |
| Réseaux personnells  (PAN)   | Bluetooth, Infrarouge, ZigBee                        |
| Réseaux locaux (LAN)         | Ethernet, Token Ring, ATM                            |
| Réseaux départementaux (DAN) | Fast Ethernet, Fast Token Ring, ATM                  |
| Réseaux métropolitains (MAN) | Metro Ethernet                                       |
| Réseaux étendus (WAN)        | RTCP, RNIS, Internet, Frame Relay, ATM, Metro Ethern |

![distance](/assets/images/reseau/distance.png)
{:class="image featured"}


![topologie]
+ Topologie du réseau : un réseau de communication est composé de terminaux, de
  noeuds et de liens 
+ Totpolgie physique : décrit comment les différents noeuds sont reliés entre
  eux 
+ Topologie logique : décrit comment l'information est transmise d'un noeud à
  l'autre 
+ On distingue 2 classes de réseaux 
  + Utilisant le mode de diffusion 
  + Utilisant des liaisons point à point 
  
[topologie]:/assets/images/reseau/topologie.png
{:class="image about right"}


#### Mode de connexion : connecté

Identique au principe de fonctionnement du téléphone : toute communication entre
2 entités du réseau ($$A$$ et $$B$$ par exemple) suit le processus suivant en 3 phases
1. Etablissement de la connexion 
   + $$A$$ demande une connexion avec $$B$$ par l'envoi d'un message spécial
     (paquet d'appel)
   + Le paquet d'appel trace un chemin entre $$A$$ et $$B$$ dans le réseau
   + $$B$$ confirme ou non la connexion avec un autre message spécial (paquet
     d'acquittement)
2. Transfert des données
   + Tous les paquets du message sont envoyés à $$B$$ en suivant le même chemin
     dans le réseau
   + Les paquets du message contiennent le numéro du circuit et non plus
     l'adresse de $$B$$
3. Libération de la connexion
   + un paquet de libération du circuit est envoyé à l'initiative de $$A$$ ou
     $$B$$

#### Mode de connexion : non connecté 
Identitque au principe de fonctionnement du courrier postal
+ $$A$$ envoie vers $$B$$ les différents messages (ou paquets de son message)
  avec l'adresse de destination $$B$$ sans demande préalable de connexion (pas
  de circuit virtuel entre $$A$$ et $$B$$)
+ C'est aux équipements de réseau d'acheminer ces paquets individuellement par
  des chemins pouvant être différents, et en les temporisant si nécessaire

| Connecté                                                 | Non connecté                            |
| :---                                                     | :---                                    |
| Négocaitation à l'avance des paramètre de communications | Simplicité                              |
|                                                          | Efficacité                              |
|                                                          | Robustesse aux pannes du réseau         |
|                                                          |                                         |
| Temps de connexion long                                  | De-séquencement des paquets à l'arrivée |
| Multipoint peu aisé à mettre en place                    | Mémoire tampon des équipements réseaux  |
|                                                          | Pas de qualité négociée                 |

#### Techniques de commutation 
![commutation] On s'intéresse au mode de fonctionnement des noeuds et du réseau, la commutation
est la technique utilisée par les noeuds dans le réseau pour acheminer
(aiguiller) les messages de l'émetteur vers le récepteur. Il existe plusieurs
variantes 
+ Commutation de circuit
+ Commutation de messages
+ Commutation de paquets

[commutation]:/assets/images/reseau/commutation.png
{:class="image about right"}

##  <i class="fas fa-server"></i> Les réseaux de télédiffusion

Plus précents, ils sevent à la diffusion de canaux de télévisions entre les
sutidios TV et les particuliers. On retrouver les réseaux de distribution
terrestre des câblo-opérateurs et les réseaux satellites
