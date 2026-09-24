---
title: Introduction aux réseaux - Le modèle de référence OSI
description: "Les sept couches du modèle OSI, comparaison avec TCP/IP, couche physique (codages, ADSL, câbles), couche liaison et Ethernet (CSMA/CD, backoff, trame), équipements d'interconnexion et commutation."
---

Le principe de base est la représentation des réseaux sous la forme de couches de
fonctions superposées les unes aux autres. Leur nombre, leur nom et leur
fonction varient selon les réseaux.

## Principe du protocole

`Protocole :` ensemble des règles définissant le mode de communication entre deux
ordinateurs.

Les 7 couches du modèle ISO/OSI sont à connaître par cœur.

### Fonctionnement des couches

| Nom de la couche | Rôle                                         |
|:-----------------|:---------------------------------------------|
| Application      | Quelles sont les données à envoyer ?         |
| Présentation     | Sous quelle forme ?                          |
| Session          | Qui est le destinataire ?                    |
| Transport        | Où est le destinataire ?                     |
| Réseau           | Quelle route faut-il prendre ?               |
| Liaison          | Quelles sont les caractéristiques du lien ?  |
| Physique         | Quel est le support physique ?               |

#### Couche physique

La couche physique fournit les moyens (logiciels, matériels, électroniques,
mécaniques, etc.) nécessaires à la transmission des données binaires (train
binaire). Elle implémente des fonctionnalités telles que codage, modulation ou
multiplexage. La conception de la couche physique relève du domaine de l'ingénieur
en électronique.

#### Couche liaison

La couche liaison fournit les moyens nécessaires à l'établissement, au maintien
et à la libération des connexions de liaison de données entre les entités
communicantes. Elle détecte et corrige les erreurs pouvant se produire dans la
couche physique. Les fonctions essentielles de la couche de liaison sont :

+ établissement et libération de la liaison ;
+ délimitation et synchronisation des PDU ;
+ contrôle de séquence ;
+ détection d'erreurs ;
+ reprise sur erreurs.

Pour les réseaux locaux, cette couche peut être décomposée en deux sous-couches :

+ Sous-couche MAC : gère l'accès au canal
+ Sous-couche LLC : gère la détection des erreurs et la gestion de trames et
  liaison logique

#### Couche réseau

La couche réseau assure les fonctionnalités suivantes :

+ Routage : recherche de chemin ou d'une route selon des critères de
  performances
+ Interconnexion des réseaux
+ Adressage : nommage des entités
+ Contrôle de flux
+ Gestion de la qualité de service
+ Fragmentation et adaptation des unités de données aux contraintes du support
  sous-jacent
+ Deux modes de fonctionnement : connecté / non-connecté

#### Couche transport

La couche transport assure les fonctionnalités suivantes :

+ Transport de bout en bout des données
+ Découpage des flux de données reçus des couches supérieures
+ Assemblage des données : remise dans l'ordre des données
+ Contrôle de flux et contrôle de congestion
+ Fiabilité par acquittement et retransmission des données
+ Multiplexage des flux de plusieurs applications (les unités de données sont appelées segments)

#### Couche session

La couche session assure les fonctionnalités suivantes :

+ Gestion du dialogue entre entités communicantes : gestion de tour de parole,
  transaction
+ Synchronisation : sauvegarde de contexte et reprise après échec
+ Orchestration des communications

#### Couche présentation

La couche présentation assure les fonctionnalités suivantes :

+ Représentation des données échangées (syntaxe, encodage des caractères et des nombres), indépendamment des machines
+ Éventuellement compression et chiffrement

#### Couche application

La couche application assure les fonctionnalités de communication à travers
l'environnement OSI en offrant des applications (ou des services) de Web,
messagerie électronique, transfert de fichiers, IPTV, téléphonie, etc.

### Principe de l'encapsulation

![Principe de l'encapsulation](./img/schema.png)

### Terminologie : Trame, paquet, message

![Terminologie des unités de données](./img/7couches2.png)

### Principe du relais

![Principe du relais](./img/protocolecouches.png)

### Comparaison du modèle OSI et TCP/IP

+ TCP/IP intègre la couche présentation et la couche session dans sa couche
  application
+ TCP/IP regroupe la couche physique et la couche liaison de données du modèle
  OSI dans la couche d'accès réseau
+ TCP/IP paraît plus simple, car il comporte moins de couches
+ Les protocoles TCP/IP constituent la norme sur laquelle s'est développé Internet

![Comparaison des modèles OSI et TCP/IP](./img/OSI-TCPIP.png)

## Explication de la couche physique

### La bande passante

La bande passante (au sens du débit) est la mesure de la quantité d'information pouvant circuler
d'un endroit à un autre en une période
de temps donnée ; l'unité est le `bit/s` (au sens physique, la bande passante d'un support est une largeur de bande de fréquences, en Hz). Le **débit effectif** d'une connexion
est inférieur à la bande passante du câble ou du support physique.

### La couche physique

Elle fournit les procédures et les fonctions mécaniques, électriques ou électroniques :

+ pour établir, maintenir et libérer les connexions physiques entre équipements
+ représente tout ce qui constitue le support physique de l'information

Elle assure la transmission de données sous forme de signaux électriques :

+ Selon une connexion permanente ou dynamique
+ En simplex (un seul sens), à l'alternat (half duplex) ou en bidirectionnel simultané (full duplex)
+ En série ou en parallèle
+ Entre une ou plusieurs extrémités : point à point ou multipoint

Elle assure la compatibilité des interfaces :

+ pour le codage de la bande de base ou modulation
+ pour l'amplification du signal
+ pour le multiplexage de plusieurs signaux provenant de sources différentes

### Transmission de données

La transmission consiste à faire transiter des informations sur le support
physique de communication sous forme de signaux numériques ou analogiques. Pour
que la transmission soit optimale, il est nécessaire que le signal soit codé de
façon à faciliter sa transmission sur le support physique.

1. Données numériques, signaux numériques

+ Comment représenter des bits ?
+ Exemple : réseaux locaux (LAN), connexion entre PCs
+ Codage NRZ (*non return to zero*), NRZI, Manchester. Le principe du NRZ repose sur le codage du 1 par $+V$ volts et du 0 par $-V$
  volts. En revanche, pour le NRZI, le codage du bit courant dépend du bit
  précédemment émis. Le codage Manchester représente chaque bit par une transition au milieu de la période bit (il double donc la fréquence de signalisation), ce qui facilite la synchronisation ; il est utilisé dans Ethernet 10BASE-T.

2. Données analogiques, signaux numériques

+ Comment représenter un voltage (échantillonnage)
+ Exemple : transmission de la voix sur un canal numérique
+ Codage PCM (MIC) : échantillonnage à 8 kHz sur 8 bits, soit 64 kbit/s

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

+ Spectre divisé en 3 régions (téléphone jusqu'à 4 kHz, canal de données montant jusqu'à environ 140 kHz, canal
  de données descendant jusqu'à environ 1,1 MHz)
+ Codage DMT, divisé en 256 sous-canaux d'environ 4 kHz (4,3125 kHz)

### Les spécifications des câbles

1. À quelles vitesses la transmission de données peut-elle être réalisée ?

+ La vitesse de transmission des bits dans un câble est extrêmement importante
+ Le type de conduit utilisé influence la vitesse de transmission

2. Les transmissions doivent-elles être numériques ou analogiques ?

+ La transmission numérique (ou à bande de base) nécessite des types de câble
  différents de ceux utilisés pour la transmission analogique

3. Quelle distance un signal peut-il parcourir avant que l'atténuation n'affecte
   la transmission ?

+ Si le signal est dégradé, les équipements réseau ne peuvent ni le recevoir ni
  l'interpréter
+ La dégradation est directement liée à la distance parcourue par le signal et
  au type de câble utilisé

### Ethernet

Il existe plusieurs variantes d'Ethernet, qui diffèrent par leur **type de
support**, leur **topologie** et leur **débit** :

+ Ethernet 802.3 - 10BASE5, 10 Mbit/s (câble coaxial épais)
+ Ethernet 802.3a - 10BASE2 (Thinnet ou Cheapernet)
+ Ethernet 802.3i - 10BASE-T (paires torsadées)

### Câbles à paires torsadées

Le câble est constitué de deux paires (émission et réception) ; une distance est
maintenue entre les deux paires pour diminuer la diaphonie, plus il y a de
torsades, moins il y a de diaphonie

### Câble à paires torsadées blindées (STP)

Chaque paire de fils est enveloppée dans une feuille métallique et les deux
paires sont enveloppées ensemble dans un revêtement tressé ou un film
métallique. Il s'agit généralement d'un câble de 150 ohms. Comme l'indiquent les
instructions d'installation de réseau Token Ring, les paires torsadées blindées
réduisent le bruit électrique à l'intérieur du câble (couplage paire à paire ou
diaphonie), ainsi qu'à l'extérieur du câble (interférences électromagnétiques et
radio).

### Câble à paires torsadées non blindées

Le câble à paires torsadées non blindées (UTP) est un média constitué de quatre
paires de fils, présent dans divers types de réseau. Chacun des huit fils de
cuivre du câble est protégé par un matériau isolant. De plus, les paires de fils
sont torsadées entre elles. Ce type de câble repose uniquement sur l'effet
d'annulation produit par les paires torsadées pour limiter la dégradation du
signal due aux interférences électromagnétiques et radio.

## Explication de la couche liaison de données et notion d'Ethernet

### Protocoles d'accès au support

Suivant la façon dont les sollicitations d'accès au support de communications
sont gérées, on distingue essentiellement deux approches :

+ Allocation aléatoire : le délai d'accès n'est pas borné (Aloha, Carrier Sense
  Multiple access)
+ Allocation déterministe : il est possible de borner le délai d'accès (polling,
  jeton)

Ethernet exploite la technique d'accès aléatoire au support

### L'Ethernet

Aujourd'hui, Ethernet est la technologie de réseau local dominante sur le plan
mondial. L'Ethernet est une famille de technologies de réseau local que le
modèle de référence OSI rend plus facile à appréhender. Tous les réseaux locaux
doivent traiter le problème de base qui est l'attribution d'un nom (adresse) à chaque
station ou nœud. Les spécifications Ethernet prennent en charge différents
médias, bandes passantes et autres variantes des couches 1 et 2. Le format de
trame de base et le système d'adressage sont les mêmes pour toutes les variantes
d'Ethernet.

### L'ancêtre d'Ethernet : Alohanet

L'idée était de permettre à deux hôtes au moins d'utiliser le même média sans
aucune interférence entre les signaux. Ce problème d'accès multiple de
l'utilisateur à un média partagé a été étudié au début des années 70 à
l'Université d'Hawaï. Un système nommé Alohanet a été développé pour donner à
plusieurs stations des îles Hawaï un accès structuré à la fréquence radio
partagée. Ce travail a par la suite constitué la base de la
méthode d'accès Ethernet connue sous l'acronyme CSMA/CD. Le principe est qu'une
station émet dès qu'elle le souhaite ; en cas de collision, la station
réémettra sa trame au terme d'un délai aléatoire, au bout de $N$ collisions
successives, la station abandonne. L'efficacité maximale est très faible, environ $18 \%$
(définie par le rapport du débit utile sur le débit brut).

### Slotted Aloha

Le principe est que le temps est discrétisé et découpé en tranches de temps
appelées slots, de durée égale au temps d'émission d'une trame. Les stations sont
synchronisées et une station ne transmet un paquet qu'au début d'un slot.
Le système est amélioré puisque 2 trames qui se superposent le font sur
un slot exactement, au lieu de 2 slots de période de vulnérabilité (car elles commencent au début du même
slot) : l'efficacité maximale double, environ $37 \%$. Le canal reste toutefois mal utilisé.

### Technique de CSMA/CD

Accès aléatoire avec écoute de la porteuse : CSMA

+ Une station qui désire émettre se met à l'écoute du canal
+ Si elle détecte un signal en ligne, elle diffère l'émission de sa trame

Les variantes selon le type de décision prise lorsque le canal est détecté
occupé :

+ CSMA non persistant : lorsque la station détecte un signal, elle attend un
  délai aléatoire avant de réitérer la procédure (écoute de la porteuse)
+ CSMA persistant : la station persiste à écouter le canal jusqu'à ce que
  celui-ci devienne libre, puis émet
+ CSMA p-persistant : lorsque le canal devient libre, la station émet avec une
  probabilité $p$, et diffère son émission avec une probabilité $(1-p)$.
  Ceci permet de diminuer la probabilité de collision par rapport au CSMA persistant.

On a l'apparition d'une période de vulnérabilité : le temps de propagation entre
le couple de stations les plus éloignées. Si la durée des trames est
considérablement supérieure à la période de vulnérabilité, alors le débit peut
s'approcher de $100\%$.

Le CSMA/CD est la technique la plus utilisée parmi les disciplines d'accès aléatoire.
Elle est normalisée par l'IEEE (802.3) et l'ISO (8802-3). À l'écoute préalable du canal s'ajoute l'écoute
pendant la transmission : un coupleur prêt à émettre, ayant détecté le canal
libre, transmet et continue à écouter le canal. S'il se produit une collision,
il interrompt immédiatement sa transmission et envoie un signal spécial
de brouillage (*jam*, 32 bits) afin que tous les coupleurs soient prévenus de la collision ;
il tentera la réémission ultérieurement.

![CSMA](./img/csma.png)

### Le succès d'Ethernet

Le succès d'Ethernet est dû aux facteurs suivants :

+ Simplicité et facilité de maintenance
+ Capacité à incorporer de nouvelles technologies
+ Fiabilité
+ Faible coût d'installation et de mise à niveau

### Adresse universelle MAC 802

+ Adresse sur 6 octets
+ Unique pour chaque carte réseau
+ @MAC = identifiant du constructeur (OUI, 3 octets) + numéro séquentiel (3 octets)

## Bilan sur l'Ethernet

### Trame Ethernet

|         Champ         |   Taille   | Rôle                              |
|:---------------------:|:----------:|:----------------------------------|
|       Preamble        |     7o     | pour la synchronisation           |
|          SFD          |     1o     | délimiteur de début de trame      |
| @Ethernet Destination |     6o     | @MAC de destination               |
|   @Ethernet Source    |     6o     | @MAC source                       |
|      Length/Type      |     2o     | longueur ou type des données      |
|         Data          | 46 à 1500o | les données                       |
|          FCS          |     4o     | contrôle d'intégrité de la trame  |

### CSMA/CD

+ Toute station d'un réseau Ethernet qui souhaite transmettre un message "écoute" d'abord pour s'assurer qu'aucune autre station n'est en cours de transmission
+ Si le câble est silencieux, elle entame immédiatement la transmission
+ Le signal électrique met un certain temps à parcourir le câble, et chaque répéteur introduit un bref temps de latence lors de la transmission de la trame entre deux ports
+ En raison du délai et du temps de latence, il est possible pour plusieurs stations de commencer la transmission au même moment ou quasiment au même moment, ce qui engendre une collision

### Fonctionnement

+ La station émettrice transmet 64 bits d'informations de synchronisation (préambule et délimiteur de début de trame). La station émettrice transmet alors les informations suivantes :

1. Informations sur les adresses MAC destination et source
1. Certaines autres informations d'en-tête
1. Charge utile réelle de données
1. Somme de contrôle : FCS (CRC) utilisée pour s'assurer que le message n'a pas été corrompu en cours de route

+ Les stations qui reçoivent la trame recalculent le CRC pour déterminer si le message entrant est valide, puis transmettent les messages valides à la couche supérieure suivante de la pile de protocoles.
+ Remarque : la taille maximale des données transportées par une trame de niveau liaison (1500 octets pour Ethernet) est appelée MTU (*Maximum Transmission Unit*)

### Détection et prévention de collision sur un réseau CSMA/CD

![collision](./img/collision.png)

![Principe de la détection de collision](./img/principe_collision.png)

#### Principe

![Principe du CSMA/CD](./img/principe.png)

```text
Émetteur
- Écoute du canal
- Si le canal est libre alors
    transmission de l'information et écoute simultanée du canal pour détecter une éventuelle collision
    si collision détectée
        arrêt immédiat de la transmission et notification de la collision à toutes les stations (jam)
        gestion de la collision (procédure de backoff)
- Sinon reporter la transmission
```

### Algorithme de backoff (BEB)

La procédure de backoff (*Binary Exponential Backoff*) utilise 3 fonctions :

+ `random()` tire un nombre réel aléatoire entre 0 et 1 ;
+ `int()` rend la partie entière d'un réel ;
+ `délai()` calcule le délai d'attente, multiple d'un slot_time (51,2 µs à 10 Mbit/s), en nombre de slots compris dans $[0,2^k[$, avec $k=\min(n,10)$, où $n$ est le nombre de collisions déjà subies par la trame. Après 16 tentatives infructueuses, la transmission est abandonnée.

```text
procédure BACKOFF(no_tentative:entier, VAR maxbackoff:entier)
Const : slot_time=51.2 (microsecondes); limite_tentative=16
var : delai : entier
DEBUT
    Si (no_tentative = 1)
    Alors maxbackoff = 2 (borne de temps d'attente maximale)
    Sinon Si (no_tentative <= 10)
    Alors maxbackoff = 2 * maxbackoff
    Sinon Si (no_tentative < limite_tentative)
    Alors maxbackoff = 2^10 (au-delà de 10 essais, la borne devient constante)
    Sinon abandon de la transmission (erreur signalée à la couche supérieure)
    délai = int(random() * maxbackoff)
    attendre(délai * slot_time)
FIN
```

### Tranche de temps Ethernet

Pour tous les débits de transmission Ethernet égaux ou inférieurs à 1000 Mbit/s, la norme stipule qu'une transmission ne peut pas être inférieure à une tranche de temps. La tranche de temps pour Ethernet 10 et 100 Mbit/s est de 512 temps bit, soit 64 octets. Pour Ethernet 1000 Mbit/s, elle est de 4096 temps bit, soit 512 octets. La tranche de temps est calculée en se basant sur des longueurs de câble maximales dans l'architecture de réseau légale la plus étendue. Tous les délais de propagation sont au maximum légal et le signal de bourrage 32 bits est utilisé lorsque des collisions sont détectées.

## Équipements d'interconnexion

+ Interconnexion de niveau 1 : répéteur, concentrateur : amplification du signal
+ Interconnexion de niveau 2 : pont, commutateur : régénération du signal et traitement de niveau 2 (adresses MAC)
+ Interconnexion de niveau 3 : routeur
+ Interconnexion de niveau 4 à 7 : passerelle

![Quelques symboles d'équipements réseau](./img/symboles.png)

### Les équipements de couche 1

Les équipements de couche 1 : les répéteurs et les concentrateurs (hubs), sont principalement utilisés pour étendre les segments de câble Ethernet. Ils permettent d'ajouter davantage d'hôtes. Cependant, chaque hôte ajouté augmente la quantité de trafic potentiel sur le réseau. Les équipements de couche 1 transmettent la totalité des données qui sont reçues sur le média. Plus le trafic est dense dans un domaine de collision, plus les risques de collisions sont importants. Les équipements de couche 1 peuvent être à l'origine de collisions en raison d'une extension trop importante du réseau local.

### Commutation Ethernet

Un réseau Ethernet partagé fonctionne parfaitement dans des conditions optimales d'utilisation. Lorsque le nombre des équipements qui tentent d'accéder au réseau est peu élevé, le nombre de collisions se maintient à un niveau acceptable. En revanche, lorsque le nombre des utilisateurs augmente, le nombre croissant de collisions peut considérablement réduire les performances du réseau. Les problèmes de broadcast et de collision sont des événements connus dans les réseaux modernes. Afin d'en limiter les effets, on crée des domaines de collision plus petits en installant des ponts ou des commutateurs, et des domaines de broadcast distincts avec des routeurs (ou des VLAN).

### Définition

On appelle domaines de collision les segments du réseau physique dans lesquels des collisions peuvent se produire. Les collisions rendent le réseau inefficace. Chaque fois qu'une collision survient sur un réseau, les transmissions s'interrompent momentanément. La durée de cette interruption est variable et est fonction d'un algorithme de réémission temporisée pour chaque équipement du réseau. Les types d'équipements assurant l'interconnexion des segments de médias définissent les domaines de collision.

### Fonctionnement d'un pont

Plus le nombre de nœuds situés sur un segment Ethernet augmente, plus le média est utilisé. Ethernet étant un média partagé, un seul nœud à la fois peut transmettre des données. L'ajout de nœuds entraîne un besoin croissant de bande passante et occasionne des charges supplémentaires sur le média. En outre, la probabilité de collisions est plus forte, ce qui entraîne davantage de retransmissions. L'une des solutions consiste à fragmenter le segment principal en plusieurs parties et à le diviser en domaines de collision distincts.

Lorsqu'un pont vient d'être installé, sa table est vide. Le pont attend le transfert de données sur le segment. Dès qu'une transmission est détectée, le pont la traite. L'hôte A émet une requête vers l'hôte B. Les données étant transmises sur l'ensemble du segment de domaine de collision, le pont et l'hôte B traitent le paquet. Le pont ajoute l'adresse source de la trame à sa table de pontage. Sachant que l'adresse se trouve dans le champ d'adresse source et que la trame est reçue sur le port 1, la trame doit être associée au port 1 dans la table. L'adresse de destination de la trame est comparée à toutes les adresses de la table de pontage. Bien que les deux adresses se trouvent dans le même domaine de collision, si l'adresse de destination ne se trouve pas dans la table, la trame est transférée vers le segment suivant. L'adresse de l'hôte B n'est pas encore enregistrée. Et ainsi de suite jusqu'à l'apprentissage total des machines du segment Ethernet.

### Pont et commutateur

En règle générale, un pont comprend deux ports et subdivise un domaine de collision en deux segments. Les décisions prises par un pont dépendent uniquement des adresses MAC et n'affectent pas les adresses de la couche 3. Un commutateur est en fait un pont multiport très rapide qui peut contenir des douzaines de ports. Chaque port crée son propre domaine de collision. Lorsqu'un réseau comporte 20 nœuds, 20 domaines de collision doivent exister si chaque noeud est connecté à son propre port de commutation. Un commutateur crée et gère de façon dynamique une table de mémoire associative, qui contient toutes les informations MAC nécessaires aux ports.

#### Principe d'un commutateur Ethernet

+ Réduire les collisions pour accroître les débits
+ Remplacer le nœud central passif par un commutateur
+ Mettre en place à peu de frais des réseaux virtuels

### Modes de commutation

La commutation d'une trame vers un port de destination est fonction du niveau de latence et de fiabilité. Un commutateur peut commencer à transférer la trame dès que l'adresse MAC est reçue. Ce mode de commutation des paquets est appelé "Cut-through". Avec le mode de commutation "Cut-through", les débits des ports source et de destination doivent être identiques pour ne pas endommager la trame.

Un commutateur peut également attendre de recevoir la trame entière avant de la transférer vers le port de destination. Cela permet au logiciel de commutation de vérifier la séquence de contrôle de trame. Si la trame n'est pas correcte, elle est rejetée au niveau du commutateur. Étant donné que la trame entière est stockée avant d'être transmise, ce mode de commutation des paquets est appelé "Store and Forward".

Une solution intermédiaire de commutation des paquets est le mode "Fragment-Free". Ce mode lit les 64 premiers octets, incluant l'en-tête de la trame, puis il commence à transmettre le paquet avant même d'avoir terminé la lecture du champ de données et de la somme de contrôle. Il élimine ainsi les fragments issus de collisions, puisque celles-ci sont détectées pendant les 64 premiers octets selon la norme Ethernet (cette taille correspond au nombre d'octets nécessaires à l'occupation du bus pendant la durée aller-retour entre les stations les plus éloignées).

### Les équipements de couche 2

+ Les équipements de couche 2 segmentent ou divisent les domaines
  de collision.
+ Ils utilisent les adresses MAC affectées à chaque équipement
  Ethernet pour effectuer le contrôle de propagation de la trame.
+ Les équipements de couche 2 sont des ponts et des commutateurs
  qui permettent d'effectuer le suivi des adresses MAC et de leurs
  segments.
+ Les équipements peuvent contrôler le flux de trafic au niveau de la
  couche 2.
+ Grâce à cette caractéristique, les réseaux s'avèrent plus efficaces.
+ Cela permet au réseau de transporter des données simultanément
  sur différents segments sans collisions.
+ Les ponts et les commutateurs subdivisent les domaines de collision
  en éléments plus petits.
+ Chaque élément devient alors son propre domaine de collision.

### Boucles de commutation

En cas de présence de boucles entre équipements de couche 2, les trames risquent de boucler avant d'atteindre leur destination

+ Perte d'efficacité
+ Congestion sur le support
+ Retard de transmission

Plusieurs solutions sont possibles :

+ Élimination logique des boucles en désactivant certains ports
+ Trouver un arbre couvrant : Spanning Tree Protocol (STP)
+ Idée du STP : les équipements d'interconnexion communiquent entre eux pour déterminer un arbre couvrant, et ainsi supprimer les boucles de commutation
