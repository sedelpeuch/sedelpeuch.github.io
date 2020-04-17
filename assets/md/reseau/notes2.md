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


## <i class="fas fa-server"></i> Explication de la couche physique

### La bande passante 
La largeur de bande est la mesure de la quantité d'information pouvant circuler
d'un endroiit à un autre en une période d'un endroit à un autre en une période
de temps donné, l'unité est le `bit/s`. Le **débit effectif** d'une connexion
est inférieur à la bande passante du câble ou du support physique. 

### La couche physique
Fournit les procédure et les fonctions mécaniques, électriques ou électroniques
+ pour établir maintenir et libérer les connexions physiques entre équipements
+ représente tout ce qui constitue le support physique de l'information

Assure la transmission de données sous forme de signaux électriques
+ Selon une connexion permanente ou dynamique 
+ En l'alternat ou en bidirectionnel (flux duplex, simplex, half duplex)
+ En série ou en parallèle
+ Entre une ou plusieurs extrémités : point à point ou multipoint

Assure la compatibilité des interfaces
+ pour le codage de la bande de base ou modulation
+ pour l'amplification du signal
+ pour le multiplexage de plusieurs signaux provenant de sources différentes 

### Transmission de données
La transmission consiste à faire transiter des informations sur le support
physique de communication sous forme de signau numériques ou analogiques. Pour
que la transmission soit optimale, ilest nécessaire que le signal soit codé de
façon à faciliter sa transmission sur le support physique. 

1. Données numériques, signaux numériques
+ Comment représenter des bits ? 
+ Exemple : réseaux locaux (LAN), connexion entre PCs
+ Codage NRZ (non return to zero), NRZI, Manchester . Le principe du NRZ repose sur le codage de 1 par $$+V$$ volt et le 0 par $$-V$$
volt. En revanche pour le NRZi le codage du bit courant dépend du bit
précédemment émis.  Le codage Manchester duplique la quantité d'information pour assurer une
transition de front il est utilisé dans l'Ethernet 10base-t. 

2. Données analogiques, signaux numériques 
+ Comment représenter un voltage (échantillonnage)
+ Exemple : Transmission de la voix sur un canal numériques
+ Codage PCM à 8KH

3. Données numériques, signaux analogiques 
+ Comment représenter des bits
+ Exemple : Transmission de données numériques sur un canal téléphonique
+ Exemple : modulation d'amplitude (ASK), de fréquence (FSK) et de phase (PSK).


4. Données analogiques, signaux analogiques
+ Comment représenter un voltage
+ Exemple : modulation d'amplitude, de fréquence et de phase

### Exemple de l'ADSL

1. Utilisation 
+ Mode asymétrique 
+ Mode de connexion permanente
+ Communications simultanées voix et données

2. Caractéristiques 
+ Spectre divisé en 3 régions (Téléphone 4Khz, Canal data montant 100Khz, Canal
  data descendant 1Mhz)
+ Codage DMT, divisé en 256 canaux de 4kHz

### Les spécifications des câbles 
1. A quelles vitesses la transmission de données peut-elle être réalisée ? 
+ La vitesse de transmission des bits dans un câble est extrêmement important
+ Le type de conduit utilisé influence la vitesse de transmission
2. Les transmissions doivent-elles être numériques ou analogiques ? 
+ La transmission numérique (ou à bande de base) nécessiste des types de câble
  différents de ceux utilisés pour la transmission analogique 
3. Quelle distance un signal peut-il parcourir avant que l'atténuation n'affecte
   la transmission ? 
 + Si le signal est dégradé, les équipements réseau ne peuvent ni recevoir ni
   l'interpréter 
 + La dégradation est directement liée à la distance parcourue par le signal et
   au type de câble utilisé

### Ethernet
Il existe plusieurs variantes d'Ethernet, ils diffèrent par leurs **type de
support**, leurs **topologie** et leurs **débit**

+ Ethernet 802.3 1-10 Mbps 
+ Ethernet 802.3a - 10 base 2 (Thinnet ou Cheapernet)
+ Ethernet 802.3 - 10 base T

### Câbles à paires torsadées 
Le câble est constitué de deux paires (émission & réception), lune distance est
maintenant entre les deux paires pour diminuer la diaphonie, plus il y a de
torsades, moins il y a de diaphonie

### Câble à paires torsadées blindées (STP)
Chaque paire de fils est enveloppée dans une feuille métallique et lles deux
paires sont enveloppées ensemble dans un revêtement tressé ou un film
métallique. Il s'agit généralement d'un câble de 150 ohms. Comme l'indiquent les
instructions d'installation de réseau Token Ring, les paires torsadées blindées
réduisent le bruit électrique à l'intérieur du câble (couplage paire à paire ou
diaphonie), ainsi qu'à l'extérieur du câble (interférences électromagniques et
radio). 

### Câble à paire torsadées non blindées 
Le câble à paires torsadées non blindées (UTP) est un média constitué de quatre
paires de fils, présent dans divers types de réseau. Chacun des huit fils de
cuivre du câble est protégé par un matériau isolant. De plus les paires de fil
sont tressées entre elles. Ce type de câble repose uniquement sur l'effet
d'annulation produit par les paires torsadées pour limiter la dégradation du
signal due aux interférences électromagnétiques et radio. 

## <i class="fas fa-server"></i> Explication de la couche liaison de données et notion d'Ethernet.
