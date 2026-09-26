---
title: RoboCup@Home 2023 - CATIE Robotics
tags: [robotique, robocup, ros, ia, vision, nlu]
description: "3e place mondiale à la RoboCup@Home 2023 à Bordeaux avec Epock, robot TIAGo de CATIE Robotics : rôle de Team Leader, middleware central du robot sous ROS, interaction et chaîne vocale 100 % hors ligne."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src="/img/project/robocup.png" alt="RoboCup@Home 2023 Bordeaux" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<ProjectMeta
  start="Juillet 2023"
  end="Juillet 2023"
  role="Team Leader"
  domain="Robotique de service, navigation, perception, interaction homme-robot"
  stack={["ROS", "YOLOv8", "Whisper", "Snips NLU"]}
/>

## Contexte

La RoboCup@Home est la compétition mondiale de référence en robotique de service. Des robots entièrement autonomes doivent exécuter des scénarios domestiques complexes : accueillir des invités, ranger des courses, servir au restaurant, suivre une personne en extérieur, identifier des inconnus dans une foule. Les équipes sont des laboratoires universitaires et centres de recherche parmi les meilleurs au monde. Ce n'est pas un hackathon : les équipes préparent la compétition pendant des mois, voire des années.

En 2023, la RoboCup se tient à Bordeaux. CATIE Robotics y engage Epock, un robot TIAGo de PAL Robotics, pour la cinquième année consécutive. Résultat : **3e place mondiale**.

## Réalisations

La difficulté de la RoboCup@Home ne vient pas seulement de la complexité des épreuves. Elle vient de leurs conditions d'exécution : l'arène est inconnue jusqu'aux dernières heures avant le début, le robot doit créer sa propre carte de l'environnement, les paramètres de perception sont calibrés en conditions réelles le jour même, et tout doit fonctionner devant un public nombreux, dans un espace bruyant avec une luminosité variable.

<Tabs>
  <TabItem value="navigation" label="Navigation">
    La navigation autonome repose sur AMCL pour la localisation et move_base pour la planification. Pour améliorer la robustesse sur un sol glissant, des encodeurs déportés ont été ajoutés au robot pour calculer l'odométrie indépendamment des roues motrices ; cette odométrie est fusionnée avec les autres capteurs par un filtre de Kalman. En complément de la navigation globale, un module de contrôle local de la base mobile gère des situations que la pile de navigation ROS ne couvre pas : franchir une porte, naviguer dans un espace confiné, se repositionner précisément devant un objet à saisir.
  </TabItem>
  <TabItem value="perception" label="Perception">
    Tous les modèles d'IA sont gérés via un environnement interne appelé Eagle Nest, qui standardise le catalogue de modèles disponibles, gère leur exécution et leur supervision. Les modules actifs en 2023 :

    - **Reconnaissance d'objets** : YOLOv8, ré-entraîné sur site le jour de la compétition à partir de photos annotées en quelques minutes grâce à Segment Anything Model.
    - **Reconnaissance faciale** : MTCNN pour la détection, réseau siamois entraîné sur VGGFace2 (8000+ identités) pour la ré-identification entre pièces.
    - **Description de personnes** : ResNet entraîné sur CUHK-PEDES pour décrire l'apparence (couleur de cheveux, vêtements…).
    - **Pose** : MoveNet pour détecter en temps réel si une personne est assise, debout ou lève la main, utilisé comme filtre peu coûteux avant de lancer des algorithmes plus lourds.
    - **Localisation précise d'objets** : reconnaissance de formes LiDAR pour repositionner le robot face à un objet connu avec une précision que la localisation globale seule ne permet pas.
  </TabItem>
  <TabItem value="nlu" label="Langage naturel">
    La chaîne de communication fonctionne entièrement hors ligne : transcription par Whisper (reconnaissance vocale entraînée sur 680 000 heures de données) et compréhension de l'intention par Snips NLU. C'est un choix délibéré : en compétition, toute dépendance réseau est un risque. La latence reste acceptable et l'ensemble fonctionne sans connexion Internet.

    Le principal problème rencontré lors des éditions précédentes était la sur-activation : la chaîne interprétait le bruit ambiant comme de la parole. La solution adoptée corrèle l'activation du microphone avec les états du robot : le système n'écoute que lorsqu'il est dans un état qui l'y autorise, jamais en continu.
  </TabItem>
  <TabItem value="taches" label="Tâches">
    Chaque épreuve est une machine à états dédiée qui orchestre les appels aux modules de navigation, perception et langage selon les points atteignables et l'avancement réel : Receptionist, Storing Groceries, Restaurant, Carry My Luggage, Stickler of the Rules. La stratégie de points, qui consiste à décider quelles sous-tâches tenter et dans quel ordre, est une partie à part entière du travail de préparation.
  </TabItem>
</Tabs>

## Mon rôle

Le rôle de Team Leader sur ce type de projet couvre deux dimensions. La coordination : définir les priorités techniques dans les semaines qui précèdent, arbitrer les choix d'architecture, organiser les sessions de test, piloter la rédaction du Team Description Paper, dont je suis le premier auteur. La dimension technique : j'ai été le principal contributeur sur **robot-manager**, le middleware central qui expose les capacités du robot à toutes les tâches : navigation, synthèse vocale, perception, bras, retours visuels (LEDs, écran). J'ai notamment conçu la gestion des états visuels du robot pour l'interaction avec le public, le système TTS, et contribué à plusieurs tâches dont Receptionist et Carry My Luggage.

## Résultats

3e place mondiale, avec une couverture médiatique nationale : le 19.45 de M6, France 2, TV7, L'Usine Digitale, L'Usine Nouvelle, Actu Bordeaux. La présence d'Epock dans des journaux télévisés grand public illustre un aspect propre à la RoboCup@Home : la compétition se joue aussi devant un public non expert, ce qui impose des exigences d'interaction et de lisibilité que les benchmarks purement techniques n'évaluent pas.

:::info
Le Team Description Paper publié en novembre 2023, en vue de la qualification pour l'édition 2024, est disponible publiquement. Il détaille l'architecture logicielle et les choix techniques par module, dans l'état atteint après l'édition de Bordeaux.
:::

## Liens

- [Site CATIE Robotics](https://robotics.catie.fr/)
- [Team Description Paper, novembre 2023 (PDF)](https://robotics.catie.fr/wp-content/uploads/2023/11/CATIE-Robotics-TDP-2023.pdf)
- [Revue de presse RoboCup 2023](https://www.catie.fr/language/fr/presse/)
