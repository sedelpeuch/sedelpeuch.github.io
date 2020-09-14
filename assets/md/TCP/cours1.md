---
layout: page
hide: true
title: Interaction entre la famille de protocoles TCP/IP et les supports de transmission
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

<style>
html {
 zoom: 0.80;
}
</style>

## <i class="fas fa-server"></i> Historique et définition de l'internet

### 3 définitions pour Internet 
1. Une famille de protocoles de communication, appelée : 
   + TCP/IP : Transmission Control Protocol / Internetworking Protocol
   + ou Internet Protocol Suite
2. Un réseaum mondial constituéé de milliers de réseaux hétérogènes
   interconnectés au moyen des protocoles TCP/IP 
   + Réseaux locaux d'agences gouvernementales, institutions d'éducation,
     hôpitaux, des commerciaux ... 
   + Réseaux fédérateur de Campus 
   + Réseaux Régionaux, Nationaux, Intercontinentaux
3. Une communauté de personnes utilisant différents services 
   + Courrier électronique, Web, Transfert de fichiers FTP ...
   
### Gouvernance d'Internet 

La gouvernance d'internet se base sur trois axes, la gestion des adresses IP
(IANA attribue les blocs d'adresses, RIR distribue les adresses aux
fournisseurs). Ensuite vient la gestion des noms de domaine (ICANN) et la
spécification de nouveaux standards (IEEE, IETF).

## <i class="fas fa-server"></i> Rappel : Principe de fonctionnement

![osi](/assets/images/reseau/OSI-TCPIP.png){:class="image about center"}

![couche](/assets/images/TCP/couches.png){:class="image about center"}

## <i class="fas fa-server"></i> Interconnexion niveau réseau

Plusieurs question sont alors soulevées sur l'interconnexion des réseaux : 
1. Comment traiter la diversité et variété des supports de communication (couche
   1 et 2) à cause des 
   + évolutions technologiques 
   + besoins différents et débit, distance, fiabilité ...
   + coûts différents
2. Comment gérer les communications entre entités raccordées à des supports
   différents et assurer l'interopérabilité des applications fonctionnant dans
   ce contexte 
   
Certains moyens d'interconnexions sont alors mit en place 
+ L'interconnexion permet de fédérer plusieurs réseaux présentant des
  différences physiques ou protocolaires afin de permettre la communications
  entre leurs entités 
+ Diviser pour régner : segmenter un réseau en plusieurs parties en plusieurs
  parties à des fins de performances, d'administration ou de sécurité 
  
![token](/assets/images/TCP/token.jpg){:class="image about center"}

Le rôle de l'interconnexion de niveau 3 (couche réseau du modèle OSI) est triple 
+ masque l'hétérogénéité des supports en les fédérant 
+ permettre un service de communication unifié
+ protocole de la couche réseau adapté à de nombreux support 

L'IP (Internet protocole) fonctionne sur des supports variés (filaire et sans
fil) et offre des supports variés (filaire et sans fil) et offre des services à
la couche 4 (UDP, TCP, etc)

### Commutation de paquets vs Commutation de circuits 

#### Commutation de paquets. 
Un message à transmettre est découpé en paquets comportant, outre la portion du
message découpé, des informations d'adresses (source et destination) et autre
informations de contrôle. Chaque paquet est ensuite envoyé vers sa destination
en utilisant une route d'acheminement 

#### commutation de circuits.
La commutation de circuits est fondée sur la négociation et la construction d'un
chemin unique exclusif d'une machine $$A$$ à une machine $$B$$, lors de
l'établissement du dialogue entre ces deux machines. Le chemin ainsi crée
perdure jusqu'à la clôture du dialogue.

### Mode connecté vs non connecté 

La transmission de messages entre deux éléments d'un réseau peut se faire
  selon deux modes
  + mode connecté
  + mode non connecté
  
En commutation de paquets, on parle aussi des deux modes : 
+ la transmission s'effectue en mode connecté, et tous les paquets du message
  vont suivre le même chemin 
+ la transmission s'effectue en mode "non-connecté" aussi appelé mode datagramme
  dans dans lequel les paquets ne vont pas tous suivre le même chemin, et la
  station réceptrice devra remettre les paquets dans le bon ordre pour
  reconstituer le message. 
  
### Rappel : structure d'une trame Ethernet 802.3

![ethernet](/assets/images/TCP/ethernet.jpg){:class="image about center"}

### Adressage IP : 
+ Identification d'une entité sur un réseau TCP/IP (unique sur le rseau
  considéré, indépendante des couches inférieures, une adresse par point d'accès
  au réseau)
+ 32 bits 
+ Une adresse se décompose en deux champs : numéro de réseau (bits de poids fort
), numéro d'entité sur ce réseau, valeurs 0 et 255 spéciales

### Cinq classes d'adresse 

1. Classe A de 1.x.x.x à 127.x.x.x
2. Classe B de 128.0.x.x à 191.255.x.x
3. Classe C de 192.0.0.x à 223.255.255.x
4. Classe D de 224.0.0.0 à 239.255.255.255 (multicast)
5. Classe E de 240.0.0.0 à 255.255.255.255 (expérimentale)

## <i class="fas fa-server"></i> Interconnexion niveau liaison de données 
## <i class="fas fa-server"></i> Résolutions d'adresses
