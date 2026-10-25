---
title: "Mémoire : résumé et introduction"
description: "Mémoire du projet sur les interfaces cerveau-machine pour la communication écrite : résumé en français et en anglais, remerciements, avant-propos, glossaire, plan et introduction."
sidebar_position: 5
---

**L'utilisation des Interfaces Cerveau-Machine dans la communication écrite.** Projet final du Cycle Préparatoire de Bordeaux, Université de Bordeaux. Mémoire rédigé par Delpeuch Sébastien, Escobosa Valentin et Javerzat Natacha, 9 mai 2019, encadré par Léa Pillette.

## Résumé

Les Interfaces Cerveau-Machine (ICM) sont des outils permettant la communication entre le cerveau et un dispositif externe. Le concept émerge d'abord dans les récits de science-fiction, mais le développement des neurosciences dans les années 1970 rend envisageable la création de modèles réels.

La découverte des structures et des mécanismes régissant le fonctionnement du cerveau permet d'appréhender la nature des signaux inhérents à l'activité cérébrale. Plusieurs dispositifs de mesure non invasifs comme l'électroencéphalographie permettent de détecter, en surface du cuir chevelu, des variations particulières dans l'activité cérébrale. Ces variations sont des "marqueurs physiologiques" et sont indicatrices de l'état mental de l'utilisateur. Elles peuvent donc être utilisées comme source d'information par la machine afin de traduire en commande l'intention de l'utilisateur, comme le ferait un clavier par l'intermédiaire de nos mains. Le potentiel P300 est un exemple de marqueur physiologique. Sa détection constitue la base du fonctionnement d'une ICM permettant la communication écrite : le P300 Matrix Speller. Cependant, l'information brute, c'est-à-dire le signal obtenu par électroencéphalographie, n'est pas exploitable telle quelle par la machine. Au préalable, il est nécessaire de traiter le signal. Le traitement est constitué de trois phases : le prétraitement, l'extraction des caractéristiques et la classification. L'objectif général du traitement est de rendre possible la détection des signaux d'intérêt ainsi que de réduire la quantité de données à traiter.

À l'issue de ce traitement, les signaux peuvent être utilisés par la machine. Dans le cas du P300 Matrix Speller, implémenté sous le logiciel OpenViBE, les signaux corrélés à une stimulation permettent à l'utilisateur d'épeler un mot en utilisant exclusivement son activité cérébrale.

**Mots clés.** Cognitique, Informatique, Interface Cerveau-Machine, marqueur physiologique, traitement du signal, P300 Matrix Speller, OpenViBE

## Abstract

A Brain-Computer Interface (BCI) is a direct communication pathway between the brain and an external device. The concept first emerges in Science-Fiction before becoming reality in the 1970's thanks to unprecedented Neuroscience advances.

The discovery of the structures and mechanisms which are governing the functioning of the brain helps us understanding the nature of the signal linked with cerebral activity. Many non-invasive measuring devices such as electroencephalography can be used to detect specific changes in brain activity on the surface of the scalp. These variations are called "physiological markers" and are indicative of the mental state of the user. They can therefore be exploited by the machine to identify and translate the user's intents into commands, as a keyboard would do with the tap of our fingertips. The P300 wave is an example of physiological marker used to run a BCI based written communication device called "P300 Matrix Speller". However, the raw data (i.e. the signal displayed on the electroencephalograph) cannot be directly exploited by the machine : the signal requires to be processed. The processing can be divided into 3 parts : pre-processing, features extraction and classification. The main purpose is to allow the detection of the signals of interest and reduce the data size.

At the end of the processing, the signals are ready to be exploited by the machine. Using the P300 Matrix Speller implemented under OpenViBE, the whole procedure allows the user to spell a word, by the exclusive exploitation of his brain activity.

**Key-words.** Cognitive Technology, Computer Sciences, Brain-Computer Interface, physiological marker, signal processing, P300 Matrix Speller, OpenViBE

## Remerciements

Nous tenons à remercier notre tutrice Léa Pillette, qui a su nous guider avec patience et bienveillance tout au long de la réalisation de ce projet et s'est toujours montrée enthousiaste et encourageante lors de nos nombreuses visites à Inria.

Nous remercions également Éric Dazzan, pour ses conseils avisés et son écoute, et Patrick Fischer, pour ses remarques et corrections concernant l'aspect mathématique du traitement du signal.

Enfin, nous remercions notre entourage pour leur soutien et leur aide quant à la relecture de ce mémoire.

## Avant-propos

Ce mémoire a été réalisé dans le cadre du projet[^orga] de 2ème année de CPBx. Le sujet choisi reflète l'attrait des trois membres du groupe pour l'informatique, les mathématiques, mais également la cognitique, discipline qui nous était jusqu'alors pratiquement inconnue. Afin de concilier nos intérêts, nous avons décidé de travailler sur les Interfaces Cerveau-Machine, leur étude nécessitant des notions de traitement du signal, de programmation ainsi que des bases en biologie.

Nous considérons ce projet comme une occasion de découvrir, de nous approprier le concept d'Interface Cerveau-Machine et de nous défaire de visions parfois stéréotypées.

Nous tenions en particulier à lever toutes les "boîtes noires" inhérentes à la compréhension de ces dispositifs afin de proposer à nos lecteurs une explication qui soit la plus claire et complète possible.

Dans l'immédiat, nous ne pouvons affirmer si nos parcours professionnels respectifs nous offriront de nouveau l'opportunité de nous intéresser à ce sujet. Cependant, nous sommes intimement convaincus que la recherche sur les Interfaces Cerveau-Machine n'en est encore qu'à ses balbutiements, et que des dispositifs plus sophistiqués se développeront et se perfectionneront.

[^orga]: Il est à noter que l'organisation de ce projet est détaillée en annexe E ([Gestion du projet](./gestion-du-projet.md)).

## Glossaire

**ICM / BCI.** Une Interface Cerveau-Machine (ICM) ou Brain Computer Interface (BCI) est une interface de communication directe entre le cerveau et un dispositif externe (un ordinateur par exemple). La communication est qualifiée de "directe" car le fonctionnement des ICM ne repose pas sur les canaux de communication standards que sont les nerfs et les muscles mais sur la détection de signaux représentatifs de l'activité cérébrale.

**ICM invasives, non invasives.** Une ICM invasive enregistre l'activité cérébrale de l'utilisateur par l'intermédiaire d'électrodes placées en profondeur dans le cerveau, dont la pose nécessite d'avoir recours à la trépanation. Par opposition, l'utilisation d'une ICM non invasive ne requiert pas d'intervention chirurgicale, car les électrodes sont placées en surface du cuir chevelu et enregistrent des résidus d'activité cérébrale.

**ICM réactives.** Ce sont des ICM qui envoient des stimulations visuelles, auditives ou tactiles à leur utilisateur dans l'attente d'une réponse. Elles s'opposent aux ICM actives, pour lesquelles l'utilisateur est à l'origine du processus de communication, qu'il contrôle en modifiant son état mental lorsqu'il le souhaite.

**Électroencéphalographie (EEG).** Méthode d'exploration cérébrale qui mesure l'activité électrique du cerveau par l'intermédiaire d'électrodes placées en surface du cuir chevelu. Le tracé de l'activité électrique enregistrée est appelé électroencéphalogramme.

**Potentiel évoqué.** Modification du potentiel électrique généré par le système nerveux en réponse à une stimulation externe (présentation d'une image, d'un son...) ou interne (modification de l'attention, préparation motrice...).

**P300.** Potentiel évoqué particulier détectable par électroencéphalographie. La lettre "P" indique que son amplitude est positive, "300" désigne son temps de latence, en ms.

**P300 Matrix Speller.** ICM permettant à l'utilisateur d'épeler des mots sur un écran, en utilisant exclusivement son activité cérébrale. Son fonctionnement repose sur la génération et la détection de potentiels P300.

**SNC.** Le Système Nerveux Central est la partie du système nerveux comprenant l'encéphale et la moelle épinière.

**SNP.** Le Système Nerveux Périphérique est la partie du système nerveux formée des ganglions, des nerfs externes au cerveau et de la moelle épinière.

**Bruit (traitement du signal).** Toute composante non désirée affectant la sortie d'un dispositif indépendamment du signal présent à son entrée.

**Artefacts (traitement du signal).** Un artefact est une erreur de mesure d'une grandeur causée par la technique ou l'outil utilisé.

**Signal stationnaire.** Signal dont les propriétés statistiques sont invariantes par translation dans le temps.

**Analyse spectrale.** Ensemble de techniques de description du signal dans le domaine des fréquences.

**Classifieur.** Famille d'algorithmes de classement statistique. Le rôle d'un classifieur est de classer dans des groupes des échantillons qui ont des propriétés similaires.

## Plan du mémoire

1. [Activité cérébrale, origine des signaux exploitables](./activite-cerebrale.md)
2. [Traitement du signal et apprentissage](./traitement-du-signal.md)
3. [Expérimentation : implémentation du P300 Matrix Speller](./implementation-p300-speller.md), suivie de la conclusion générale et de la bibliographie

Annexes :

- A. [Outils mathématiques pour le filtrage spatial : le laplacien de surface](./laplacien-de-surface.md)
- B. [Explications mathématiques : transformée de Fourier et ondelettes](./fourier-et-ondelettes.md)
- C. [Outils mathématiques pour la classification](./analyse-discriminante-lineaire.md)
- D. [Description des "boîtes" utilisées dans nos scénarios](./boites-openvibe.md)
- E. [Gestion du projet](./gestion-du-projet.md)

## Introduction

L'essoufflement de la Seconde Révolution Industrielle et l'avènement de l'informatique sont à l'origine d'une imagination nouvelle : la vision d'un futur fantasmatique dans lequel la machine ne serait plus soumise à l'Homme mais fonctionnerait avec lui, comme en symbiose. Ces perspectives inédites donnent naissance au concept d'Interface Cerveau-Machine (ICM).

Le développement des neurosciences permet la création des premiers modèles réels dès 1970. Une définition précise des ICM est alors proposée : il s'agit de systèmes permettant la communication directe entre le cerveau et un dispositif externe (un ordinateur par exemple). La communication est qualifiée de "directe" car le fonctionnement des ICM ne repose pas sur les canaux de communication "standards" que sont les nerfs et les muscles mais sur la détection de signaux représentatifs de l'activité cérébrale. Cette particularité justifie les intérêts médicaux et cliniques inhérents au développement des ICM. Parmi ces différents enjeux, la réhabilitation des capacités de communication est un thème central. En effet, de nombreux troubles neurologiques ou musculaires engendrent une inaptitude partielle ou totale de la personne atteinte à la communication. Par l'intermédiaire des ICM, qui relient directement l'activité cérébrale à l'action à effectuer, il devient envisageable de créer une forme de communication alternative, généralement écrite, et ce sans aucune intervention des muscles.

Ce projet a pour ambition d'expliquer la mise en place d'une ICM permettant la communication écrite, en détaillant les transformations du signal depuis sa génération dans la boîte crânienne jusqu'à son interprétation par la machine. Nous avons axé notre réflexion et nos recherches sur le fonctionnement concret d'une ICM particulière : le "P300 Matrix Speller". Cependant, la plupart des résultats et explications proposés sont valables pour tout type d'ICM.

Notre raisonnement, articulé en trois parties, suit la logique chronologique de la propagation du signal. De ce fait, nous commencerons par déterminer l'origine des signaux exploitables en explicitant leur lien avec l'activité cérébrale et l'état mental de l'utilisateur. Nous passerons ensuite en revue les différentes étapes de traitement du signal, en nous attardant sur les éléments essentiels au traitement dans le cas du P300 Matrix Speller. Enfin, nous proposerons au lecteur une vision concrète du fonctionnement d'une ICM en détaillant notre expérimentation : l'implémentation du P300 Matrix Speller sous OpenViBE. Cette dernière partie permettra notamment d'expliquer la traduction en commande par la machine du signal reçu, terminant ainsi la chaîne de communication.
