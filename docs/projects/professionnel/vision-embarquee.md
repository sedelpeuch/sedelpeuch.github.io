---
title: "Déploiement de modèles de vision sur NVIDIA Jetson"
description: "Mise en production de modèles de vision par ordinateur sur NVIDIA Jetson AGX Orin et Orin Nano pour des clients industriels du CATIE, du modèle entraîné au service livré sur la carte."
tags: [vision, jetson, tensorrt, ia-embarquee, python, industrie]
---

<ProjectMeta
  start="2025"
  role="Déploiement embarqué des modèles de vision"
  domain="Vision par ordinateur embarquée"
  stack={["NVIDIA Jetson", "TensorRT", "CUDA", "Python", "OpenCV", "GStreamer"]}
/>

## Contexte

Le CATIE accompagne des entreprises qui ajoutent de la vision par ordinateur à un équipement ou à une ligne de production. L'inférence tourne sur place, sur des modules NVIDIA Jetson de la famille Orin, sans serveur distant. Le département IA du CATIE développe et entraîne les modèles. Les mettre en production demande de tenir une cadence et une latence sur un matériel contraint, dont la plateforme impose ses versions, puis de livrer au client une application qu'il peut installer et exploiter.

## Réalisations

Sur un Jetson Orin Nano, un dispositif compact détecte et localise des objets dans le flux de sa caméra, puis transmet leur position à l'équipement qu'il pilote. Il suit la cadence de sa caméra, de l'ordre de 30 images par seconde, avec quelques dizaines de millisecondes entre la capture d'une image et l'envoi de la commande. La première version de la même boucle tournait à environ 5 images par seconde. L'application démarre avec la carte et s'exploite depuis une interface web locale.

Sur un Jetson AGX Orin, un service d'inférence contrôle des pièces sur une ligne de production. L'automate de la ligne déclenche chaque prise de vue et choisit lequel des deux modèles appliquer ; le service lui renvoie un verdict par pièce.

## Décisions techniques

**TensorRT plutôt qu'ONNX Runtime.** ONNX Runtime GPU, le premier moteur d'exécution envisagé sur l'AGX Orin, plante sur ce processeur à cause d'un bogue non corrigé en amont. Les modèles passent donc par TensorRT, compilés en FP16 à partir de leur export ONNX. Sur l'Orin Nano aussi, le modèle tourne en moteur TensorRT, bien plus rapide sur Jetson que le modèle PyTorch d'origine.

**Moteur construit sur la carte.** Un moteur TensorRT est lié aux versions de CUDA et de TensorRT qui l'ont produit. Les dépôts ne versionnent que le modèle source ; le moteur est construit sur la Jetson, mis en cache, et reconstruit dès que le modèle ou JetPack change.

**Pas de conteneur.** L'application accède directement au matériel de la carte : caméras, GPU, OpenCV compilé avec CUDA, TensorRT, liaison série. Comme la version précédente du dispositif, elle tourne sur le système de la Jetson, lancée par un service au démarrage.

**Les versions de JetPack d'abord.** Sur l'AGX Orin, le projet cible le Python 3.10 de JetPack 6 alors que la convention du CATIE recommande une version plus récente, pour rester compatible avec les bibliothèques GPU fournies par NVIDIA pour cette plateforme. Le fichier de dépendances distingue la carte du poste de développement : sur la Jetson, PyTorch et les bibliothèques GPU viennent d'un index NVIDIA, OpenCV et TensorRT du système ; ailleurs, de PyPI.

**Un format d'échange remplaçable.** Le client n'a pas encore fixé le format des trames échangées avec l'automate. Tout ce qui le concerne tient dans un module isolé, sans entrée ni sortie, que le format définitif remplacera sans toucher au reste du service.

## Performances

Le passage d'environ 5 à 30 images par seconde sur l'Orin Nano vient de l'organisation de la boucle, mesurée à chaque étape : inférence et traitements sur GPU, exécutés en parallèle, traitements secondaires à demi-résolution, puis capture de l'image suivante pendant le traitement de la courante. Le passage à TensorRT n'a rien changé au débit tant que la capture restait le goulot.

La latence a baissé d'environ un tiers en fixant les fréquences de la carte au maximum et en limitant les traitements secondaires aux zones détectées par le modèle. Le traitement n'en représente plus qu'une faible part ; le reste est le temps du capteur et de son traitement d'image. Les deux raccordements de caméra possibles ont été comparés : l'USB tient la même cadence que le CSI, mais ajoute une latence sensible (transfert et décodage MJPEG).

## Exploitation et livraison

L'interface web du dispositif compact permet, depuis un navigateur du réseau local, de suivre la détection en direct, de modifier les réglages sans redémarrer, d'envoyer un nouveau modèle et de construire son moteur TensorRT, de recalibrer la caméra et d'enregistrer des images pour constituer le jeu de données du département IA.

Le code tourne aussi sur un PC x86. Les tests et l'intégration continue se passent donc de la carte : caméra, GStreamer et échanges avec le reste du système sont simulés, avec un seuil de couverture de 80 %. Une documentation MkDocs, générée depuis le code, est livrée avec l'application.

## Rôle

Le département IA du CATIE fournit les modèles. Ma part est leur mise en production sur Jetson, de bout en bout : choix du moteur d'exécution, intégration de la caméra et des échanges avec le reste du système, optimisation sur la carte, exploitation, tests et livraison. J'ai été le seul développeur de ces deux intégrations.

## Résultats

Le dispositif compact tient la cadence de sa caméra et s'exploite sans connexion à la carte. Les deux applications se réinstallent sur une Jetson neuve en reconstruisant leurs moteurs TensorRT. Les pratiques mises au point (moteur construit sur la cible, dépendances par plateforme, double cible x86 et ARM, mesure avant optimisation) ont servi d'un projet à l'autre.

## Limites connues

Le service de la ligne de production attend le format définitif des échanges avec l'automate.

## Liens

- Un déploiement sur un autre accélérateur (NPU) est décrit dans [Inspection visuelle automatisée de véhicules](inspection.md).
- Les dépôts de ces projets sont privés.
