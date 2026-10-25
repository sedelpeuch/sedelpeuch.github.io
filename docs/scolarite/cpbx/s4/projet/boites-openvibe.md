---
title: "Boîtes OpenViBE des scénarios"
description: "Annexe D du mémoire : description et paramètres des boîtes OpenViBE utilisées dans les scénarios d'acquisition, d'entraînement et d'utilisation du P300 Matrix Speller."
sidebar_position: 12
---

Annexe D du mémoire : description des "boîtes" utilisées dans nos scénarios (voir [Expérimentation : implémentation du P300 Matrix Speller](./implementation-p300-speller.md)).

Cette annexe est une liste décrivant toutes les boîtes que nous utilisons dans nos différents scénarios.

**Launch.** Envoie une stimulation lorsque l'expérimentateur appuie sur Play ; cette boîte permet de déclencher les scénarios.

**P300 Speller Stimulator.** Cette boîte est utilisée pour générer une séquence de stimulation en deux dimensions afin d'initier une réponse P300 de la part de l'utilisateur. Paramétré de manière optimale, le P300 Speller Stimulator permet de générer toutes les stimulations de marquage nécessaires à l'expérience (début/arrêt d'un flash, début/arrêt de l'envoi de stimuli...). Les paramètres choisis pour notre expérimentation sont détaillés ci-dessous.

- Nombre de colonnes : 6
- Nombre de lignes : 6
- Nombre de répétitions (nombre de fois où une ligne / colonne s'illumine au cours d'un essai) : 12
- Nombre d'essais : 10
- Durée du flash : 0,2 seconde
- Durée du non-flash : 0,1 seconde
- Délai entre deux répétitions : 1 seconde
- Délai entre deux essais : 3 secondes

Il est à noter que cette boîte prend en entrée une stimulation et fournit en sortie une autre stimulation contenant les informations caractérisant la matrice.

**Target Letter Generation.** Cette boîte permet de demander à l'utilisateur de focaliser son attention sur une lettre en particulier. Elle enregistre si le stimulus est cible (illumination d'une ligne/colonne contenant la lettre cible imposée sur laquelle se concentre l'utilisateur) ou non-cible (illumination d'une ligne/colonne qui ne contient pas la lettre cible imposée). Cette information est notée dans la stimulation d'entraînement.

**P300 Speller Visualisation.** Le fonctionnement de cette boîte est relié à celui du P300 Speller Stimulator. Elle permet d'afficher la matrice créée par P300 Speller Stimulator et définit ses caractéristiques visuelles selon les paramètres (RGB et pt) suivants.

- Couleur du fond pour l'illumination : (5,5,5)
- Taille de la police pendant l'illumination : 60
- Couleur du fond : (0,0,0)
- Couleur des lettres : (25,25,25)
- Taille des lettres : 40
- Couleur du fond d'une lettre cible : (20,20,70)
- Couleur de la lettre cible : (10,10,30)
- Taille de la lettre cible : 40
- Couleur du fond de la lettre résultat : (10,40,10)
- Couleur de la lettre résultat : (60,100,60)
- Taille de la lettre résultat : 40

**Acquisition Client.** Cette boîte permet de récupérer les données EEG du réseau et de les distribuer dans le scénario via le serveur OpenViBE, paramétré sur le port et sur le driver correspondant au casque.

**Generic Stream Writer.** Cette boîte permet d'enregistrer le flux d'OpenViBE (signal cérébral, stimulation, etc.) dans un fichier `.ov`.

**Generic Stream Reader.** Cette boîte permet de lire un fichier `.ov` et de le distribuer dans le scénario.

**Player Controller.** Dans le cadre de notre expérimentation, cette boîte permet l'arrêt du scénario.

**Channel Selector.** Cette boîte permet de sélectionner (ou de rejeter) certains signaux provenant des électrodes du casque EEG.

**Temporal Filter.** Cette boîte permet d'appliquer un filtre afin de traiter le signal. Dans le cadre de notre expérimentation, il s'agit d'un filtre de Butterworth passe-bande. L'ondulation de la bande est à 0,5 dB, l'ordre de filtrage est de 4, le Low Cut à 1 Hz et le High Cut à 20 Hz.

**Signal Decimation.** Cette boîte permet de réduire la fréquence d'échantillonnage par un diviseur de la fréquence d'échantillonnage d'origine. En d'autres termes, cette boîte permet le sous-échantillonnage. Dans notre cas, le diviseur de fréquence vaut 4.

**Stimulation Based Epoching.** Cette boîte permet de sélectionner un signal à proximité d'un événement spécifique. Cet événement est envoyé à la boîte sous la forme d'une stimulation OpenViBE. Dans notre cas, elle sélectionne les 600 millisecondes qui suivent la réception de la stimulation.

**Identity.** Il s'agit d'une boîte-relais qui n'effectue pas d'action à proprement parler mais qui contribue à améliorer la lisibilité d'un scénario.

**Epoch Average.** Cette boîte permet d'extraire les caractéristiques d'une portion de signal.

**Feature Aggregator.** Cette boîte permet de regrouper les entités qu'elle reçoit via ses entrées dans un vecteur d'entités pouvant être utilisé pour la classification.

**Classifier Trainer.** Cette boîte permet d'effectuer un entraînement du classifieur avec une estimation d'erreur basée sur la validation croisée. Dans notre cas, le classifieur est un classifieur LDA, et nous avons deux classes à différencier, cible et non-cible. Le nombre de partitions pour la validation croisée est de 5.

**Classifier Processor.** Cette boîte fonctionne en association avec le Classifier Trainer. Son rôle est de classer les vecteurs d'entités entrants à l'aide d'un classifieur précédemment entraîné.

**P300 Accumulator.** Cette boîte permet de déterminer la lettre résultat. Son fonctionnement repose sur un système de vote. Lorsqu'à l'issue d'une illumination de ligne ou de colonne le système détecte un P300, cette boîte appose un "vote" sur la ligne ou la colonne en question. À la fin de l'essai, la lettre cible est identifiée en tant qu'intersection de la ligne et de la colonne comportant le plus de votes.
