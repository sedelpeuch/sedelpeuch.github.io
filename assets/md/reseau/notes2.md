---
title: <i class="fas fa-server fa-2x"></i> Introduction aux réseaux - Le modèle de référence OSI 
icon: fa-server
hide: true
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

Le principe de base est la représentation des réseaux sous la forme de couche de
fonctions superposées les unes aux autres. Leur nombre, leur nom et leur
fonction varient selon les réseaux. 

##  <i class="fas fa-server"></i> Principe du protocole 

`Protocole :` Ensemble des règles définisant le mode de communication entre deux
ordinateurs.

Les 7 couches du modèle ISO/OSI sont à connaitre par coeur.

![principe](/assets/images/reseau/principe.png)
{:class="image featured"}

![7 couches OSI](/assets/images/reseau/7couches.png)
{:class="image featured"}

##  <i class="fas fa-server"></i>  Fonctionnement des couches 

| Nom de la couche | Rôle                                         |
| :---             | :---                                         |
| Application      | Quelles sont les données à envoyer ?         |
| Presentation     | Sous quelle forme ?                          |
| Session          | Qui est le destinataire ?                    |
| Transport        | Où est le destinataire ?                     |
| Réseau           | Quel route faut-il prendre ?                 |
| Liaison          | Quelles sont les caractérisation du réseau ? |
| Physique         | Quel est le support physique ?               |

### Couche Physique

La couche pysique fournit les moyens (logiciels, matériels, électroniques,
mécaniques ...) nécessaire à la transmission des données binaires (train
binaire). Elle implémente des fonctionnalités telles que codage, modulation ou
multiplexage. La conception de la couche physique relève du domaine d'ingénieur
en électronique.

### Couche Liaison

La couche liaison fournit les moyens nécessaires à l'établissement, le maintient
et la libération des connexions de liaison de données entre les entités
communicantes. Elle détecte et corrige les erreurs pouvant se produire dans la
couche physique. Les fonctions essentielles de la couche de liaison sont 
+ établissement et libération de la liaison
+ délimitation et synchronisation des PDU
+ contrôle de séquence
+ Détection d'erreurs
+ Reprise sur erreurs
Pour les réseaux locaux, cette couche peut être décomposée en deux sous-couches
+ Sous-couche MAC : gère l'accès au canal
+ Sous-couche LLC : gère la détection des erreurs et la gestion de trames et
  liaison logique
  
### Couche réseau
La couche réseau assure les fonctionnalité 
+ Routage : recherche de chemin ou d'une route selon des critères de
  performances
+ Interconnexion des réseaux
+ Adressage : nommage des entités
+ Contrôle de flux
+ Gestion de la qualité de service
+ Fragmentation et adaptation des unités de données aux contraintes du support
  sous-jacent
+ Deux modes de fonctionnement : connecté / non-connecté

### Couche transport
La couche transport assure les fonctionnalités
+ Transport de bout en bout des données
+ Découpage des flux de données reçus des couches supérieures 
+ Assemblage des données : remise dans l'ordre des données
+ Contrôle de flux et contrôle de congestion
+ Fiabilité par acquittement et retransmission des données
+ Multiplexage des messages (appelés segments de donnée)

### Couche session
La couche session assure les fonctionnalités 
+ Gestion du dialogue entre entités communicantes : gestion de tour de parole,
  transaction
+ Synchronisation : sauvegarde de contexte et reprise après échec 
+ Orchestration des communication

### Couche présentation
La couche présentation assure les fonctionnalités
+ Structuration des donnés pour assurer leurs vérifications 

### Couche application
La couche application assure les fonctionnalité de communications à travers
l'environnement OI en offrant des applications (ou des services) de Web,
messagerie électronique, transfert de fichier, IPTV, téléponique ...

##  <i class="fas fa-server"></i>  Principe de l'encapsulation 
![schema](/assets/images/reseau/schema.png)
{:class="image featured"}

##  <i class="fas fa-server"></i>  Terminologie : Trame, paquet, message 
![term](/assets/images/reseau/7couches2.png)
{:class="image featured"}

##  <i class="fas fa-server"></i>  Principe du relais 
![relais](/assets/images/reseau/protocolecouches.png)
{:class="image featured"}

##  <i class="fas fa-server"></i>  Comparaison du modèle OSI et TCP/IP 
![comparaison]
+ TCP/ip intègre la couche présentation et la couche session dans sa couche
  application
+ TCP/IP regroupe la couche physique et la couche liaison de données du modèle
  OSI dans la couche d'accès réseau
+ TCP/IP regroupe la couche physique et la couche liaison de donnés du modèle
  OSI dans la couche d'accès réseau
+ TCP/IP paraît plus simple, car il compote moins de couches
+ Les protocoles TCP/IP constituent la norme sur laquelle s'est développé Internet

[comparaison]:/assets/images/reseau/OSI-TCPIP.png
{:class="image about right"}
