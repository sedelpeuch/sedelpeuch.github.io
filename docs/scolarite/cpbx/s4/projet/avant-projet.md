---
title: "Avant-projet"
description: "Avant-projet du 20 décembre 2018 : définition des interfaces cerveau-ordinateur, choix du sujet et problématique, plan et planning prévisionnels, expérimentation envisagée sous OpenViBE et bibliographie de départ."
sidebar_position: 1
---

**L'utilisation du B.C.I dans la communication écrite.** Avant-projet rédigé par DELPEUCH Sébastien, ESCOBOSA Valentin et JAVERZAT Natacha, 20 décembre 2018.

## Avant-propos : définition du Brain Computer Interface

Les interfaces cerveau-ordinateur, abrégées communément B.C.I. en anglais, définissent une interface de communication directe entre le cerveau et un dispositif externe (par exemple un fauteuil roulant dont on contrôle la direction en imaginant des mouvements de la main droite ou de la main gauche). Les BCIs peuvent être invasifs (pose d'une électrode à l'intérieur du cerveau, qui capte l'influx nerveux et le retransmet à la machine) : ce système est réservé aux personnes atteintes d'un trouble cérébral. L'autre type de BCI est le BCI non invasif. Dans ce cas, c'est l'activité électrique, générée par un très grand nombre de neurones qui composent le cerveau, enregistrée sur le cuir chevelu, qui est analysée par des méthodes de machine learning pour en déduire la commande à envoyer au système. Comme elle est due à l'influx nerveux, nous pouvons donc la relier à l'activité cérébrale.

## Choix du sujet et définition de l'axe d'étude

Nous avons commencé à réfléchir à notre sujet en juillet 2018. Nous sommes tous les trois des élèves candidats à l'ENSEIRB-MATMECA et souhaitant intégrer la filière informatique. De plus, nous avons aussi un certain attrait pour les sciences cognitives : nous avons donc cherché un sujet avec une majeure partie d'informatique et une partie plus réduite de cognitique. C'est grâce à une étude proposée par Inria, à laquelle Natacha a décidé de participer cet été, que nous avons découvert ce que sont les BCIs. Après concertation, nous avons décidé de former un groupe et de travailler sur ce type de système. Même si la technologie des BCIs est connue depuis les années 1980, son utilisation concrète est très récente. Ainsi, nous sommes particulièrement intéressés par le fait d'étudier la technologie maintenant afin de pouvoir suivre son évolution au cours de notre cursus. Grâce aux contacts que Natacha a obtenus à Inria, nous avons pu contacter et rencontrer notre tutrice Léa PILLETTE.

Après avoir cerné nos attentes, notre tutrice, travaillant sur la compréhension des facteurs pouvant influer sur l'étude des retours à faire aux utilisateurs BCI afin qu'ils apprennent à se servir de ces derniers, nous a présenté, lors d'un premier rendez-vous, trois sujets possibles. Un algorithme permettant d'exploiter les vidéos prises lors des expériences avec les BCIs ; un compagnon d'apprentissage (système de tutorat intelligent simulé par ordinateur, ayant des caractéristiques humaines, étant non autoritaire et social et ayant pour objectif d'améliorer l'apprentissage). Ces deux sujets nous intéressent peu. Un troisième sujet portait sur le développement d'un jeu vidéo contrôlé par le BCI dans le but d'améliorer la concentration du sujet lors de la manipulation du BCI. Ce sujet nous passionne ; cependant, en faisant des recherches, nous découvrons qu'il a déjà été très bien traité par des élèves de CPBx, nous décidons donc de ne pas continuer sur cette voie. Lors d'un deuxième rendez-vous, nous arrivons avec un projet en tête, le contrôle simple d'un robot grâce au BCI ; nous en discutons avec notre tutrice et nous arrivons à la conclusion que ce projet serait difficilement réalisable. Notre tutrice nous propose alors d'utiliser la technologie du BCI pour permettre la communication. Ce projet nous intéresse, nous avons donc choisi celui-ci. Nous arrivons donc à la problématique suivante.

> **Comment peut-on recréer un moyen de communication écrite grâce à l'interface cerveau machine ?**

Pour avancer dans notre réflexion, nous avons donc étudié la bibliographie fournie par notre tutrice. Ces études nous ont permis de diviser notre sujet en trois parties : tout d'abord une partie sur le fonctionnement du BCI, puis une partie sur le lien entre le BCI et l'ordinateur, c'est-à-dire le traitement des données, et finalement une partie sur l'établissement de l'algorithme permettant l'écriture.

Il est à noter que notre problématique, "Comment peut-on recréer un moyen de communication écrite grâce à l'interface cerveau machine ?", ne sous-entend pas une forme de défense de l'intérêt du BCI pour l'écriture. Nous avons consciemment choisi de nous focaliser sur le fonctionnement concret du dispositif. En effet, ce sont les spécificités techniques du fonctionnement de la machine qui nous intéressent, sur le plan de l'algorithme notamment. Une approche moins pragmatique du BCI n'est cependant pas à écarter : il est probable que nous resservions cet aspect du projet à la synthèse culturelle ou au projet artistique. L'objectif serait alors de justifier l'intérêt du BCI, dans le cadre de notre projet mais aussi en élargissant son domaine d'application.

## Réalisation du projet

Le système d'écriture via le B.C.I. peut se décrire, de manière très simplifiée, de la façon suivante. Le sujet est placé face à un écran. On lui pose un casque EEG qui détecte des résidus de l'activité cérébrale à la surface du cuir chevelu. Sur l'écran sont inscrites les lettres de l'alphabet. Quand l'expérience débute, les lettres s'illuminent successivement par colonnes et par lignes, dans un clignotement très rapide. Des études en neurosciences montrent que si le sujet est concentré sur une lettre en particulier et que celle-ci s'illumine, alors un signal caractéristique apparaît dans l'activité cérébrale. Il est nommé P300 car il s'agit d'un pic d'activité positive qui apparaît 300 millisecondes après que la personne a vu le stimulus apparaître. L'intensité de ce signal n'est pas forcément suffisamment importante pour que l'on puisse le différencier de l'activité cérébrale typique. C'est pourquoi les lettres sont flashées plusieurs fois afin de pouvoir moyenner les activités cérébrales enregistrées suite à l'apparition des lettres et ainsi de maximiser les probabilités de reconnaître à quelle lettre la personne fait attention et souhaite écrire.

### Plan prévisionnel

1. Approche théorique
   1. Fonctionnement général des interfaces cerveau-ordinateur
      - aspect biologique : anatomie du système nerveux et électrogenèse cérébrale
      - aspect technique : cheminement et nature du signal depuis le crâne jusqu'à la machine
      - limites utilisateur
   2. Exploitation d'un signal particulier : le BCI P300
      - aspect biologique et cognitif : que se passe-t-il dans le cerveau ?
      - aspect technique : quelles sont les caractéristiques, avantages et inconvénients ?
2. Traitement du signal et apprentissage
   1. Prétraitements de données
      - Principe d'acquisition de l'EEG
      - Segmentation et filtrage
      - Représentation temporelle et spatiale
   2. Extraction de caractéristiques du signal EEG
   3. Analyse des enregistrements
      - L'ordre du signal
      - Tri des potentiels d'action
   4. Adaptation de la machine à l'humain
3. Création de l'interface utilisateur
   1. Création du support physique
      - étude préliminaire (compatibilité, format, cahier des charges...)
      - plan de fabrication des différents algorithmes
   2. Réalisation des différents algorithmes
      - familiarisation avec OpenViBE
      - Algorithme 1 : récupération et affichage des signaux EEG
      - Algorithme 2 : utilisation et entraînement du classificateur
      - Algorithme 3 : écriture des lettres et interface utilisateur
   3. Études des limites et optimisation des algorithmes
      - études des limites
      - augmenter la probabilité d'éclairage des lettres usuelles
      - augmenter la probabilité d'éclairage des lettres repérées
      - création d'un "correcteur automatique"

### Expérimentation et limites

Nous utiliserons le logiciel OpenViBE, permettant d'exploiter les informations fournies par le BCI, en plus de la manipulation du BCI, sous réserve de disponibilité.

Nous allons nous familiariser avec ce logiciel, qui fait partie des logiciels les plus utilisés à l'international pour développer des interfaces cerveau-ordinateur. Cela implique que nous allons nous familiariser avec l'ensemble des compétences du domaine ainsi qu'avec des algorithmes plus complexes de classification. De plus, nous serons soumis à des limites neurophysiques. En effet, les signaux électriques recueillis sont des résidus d'activité de milliers de neurones, ce qui est à l'origine d'une faible précision spatiale ; toutefois, la propagation de l'activité électrique étant quasi instantanée, une utilisation BCI permet d'avoir une grande précision temporelle.

### Planning prévisionnel

**Décembre 2018.**

- **étude de la bibliographie sur les BCIs basés sur les P300**
- **compréhension du fonctionnement des BCI**
- familiarisation avec l'interface LaTeX par tous les membres du groupe par le biais d'Overleaf et TeXnicCenter
- établissement des moyens de travail (drive, documents partagés, moyen de communication avec notre tutrice, établissement du wiki...)

**Janvier 2019.**

- **début du travail sur la création des algorithmes et sur le traitement ↔ BCI**
- **test des algorithmes à Inria**

**Février 2019.**

- **établissement du plan très détaillé du mémoire**
- fin de la bibliographie et de son étude
- fin du travail sur le traitement et la création

**Mars 2019.**

- **rédaction du mémoire (1)**
- préparation de la synthèse culturelle

**Avril 2019.**

- **rédaction du mémoire (2) et relecture**
- préparation du projet artistique
- préparation de l'article scientifique

**Mai 2019.**

- **préparation de la soutenance**
- exploration des ouvertures (si le temps le permet)

## Ressources

Notre première bibliographie se base principalement sur celle fournie par notre tutrice, constituée d'articles scientifiques et de notices d'utilisation des différents outils dont nous aurons l'utilité. Nous avons de plus consulté la bibliothèque universitaire et notre ENT pour compléter cette bibliographie. Nous y avons trouvé un livre, *Les interfaces cerveau-ordinateur - fondements et méthodes*, par Maureen Clerc, Laurent Bougrain et Fabien Lotte, qui servira pour notre approche théorique et pour le traitement des informations. Notre bibliographie est disponible à la fin de ce document. Les documents sont tous disponibles et libres de droit.

Excepté notre tutrice, nous n'avons pour l'instant pas de contact supplémentaire ; nous envisageons cependant, au besoin, de solliciter nos professeurs d'informatique et de mathématiques ainsi que les chercheurs du LaBRI. (De plus, nous allons effectuer un stage à Inria, ce qui nous permettra d'avoir des contacts utiles pour comprendre le BCI.)

## Références

- Le fonctionnement du BCI non invasif :
  1. *Brain-actuated functional electrical stimulation elicits lasting arm motor recovery after stroke*, par A. Biasiucci, R. Leeb, I. Iturrate, S. Perdikis, A. Al-Khodairy, T. Corbet, A. Schnider, T. Schmidlin, H. Zhang, M. Bassolino, D. Viceic, P. Vuadens, A.G. Guggisberg et J.d.R. Millán
  2. *Brain-computer interfaces for communication and control*, par Jonathan R. Wolpaw, Niels Birbaumer, Dennis J. McFarland, Gert Pfurtscheller, Theresa M. Vaughan
  3. *Predicting Mental Imagery-Based BCI Performance from Personality, Cognitive Profile and Neurophysiological Patterns*, par Camille Jeunet, Bernard N'Kaoua, Sriram Subramanian, Martin Hachet, Fabien Lotte
- Le fonctionnement du BCI P300 :
  1. *Brain-Computer Interface spellers : A Review*, par Aya Rezeika, Mihaly Benda, Piotr Stawicki, Felix Gembler, Abdul Saboor et Ivan Volosyak
  2. *Adapting the P300-Based Brain-Computer Interface for Gaming : A Review*, par Alexander Y. Kaplan, Sergei L. Shishkin, Ilya P. Ganin, Ivan A. Basyul et Alexander Y. Zhigalov
  3. *Recommendations for Integrating a P300-Based Brain Computer Interface in Virtual Reality Environments for Gaming*, par Grégoire Cattan, Cesar Mendoza, Anton Andreev et Marco Congedo
- *Les interfaces cerveau-ordinateurs 1 et 2*, sous la direction de Maureen Clerc, Laurent Bougrain et Fabien Lotte
- *Ethical issues with brain-computer interfaces*, par Walter Glannon
