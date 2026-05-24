---
title: BlueNav - Jumeau numérique bateau autonome
description: "Jumeau numérique pour un bateau autonome de mesure hydrographique. Simulation ROS2, visualisation temps réel et CI/CD embarqué pour le projet BlueNav au CATIE."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src="https://www.catie.fr/wp-content/uploads/2025/09/Bluenav.png" alt="BlueNav simulation" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<div className="project-meta-grid">
  <div className="project-meta-item">📅 Juillet – Décembre 2023</div>
  <div className="project-meta-item">👤 Rôle : Ingénieur développement simulation</div>
  <div className="project-meta-item">🛠️ ROS 2 · Gazebo · Simulation robotique · Docker</div>
</div>

## Le contexte

BlueNav conçoit des systèmes de propulsion électrique pour bateaux, incluant une suite logicielle Smart Navigation couvrant l'ancre virtuelle, le maintien dynamique de position (DPS) et l'autopilote. Dans le cadre d'un appel à projets de Voies Navigables de France, BlueNav développait le BlueBoat, un navire de 12 tonnes destiné à la navigation autonome sur voies fluviales. Le problème : les algorithmes de navigation et de positionnement dynamique ne pouvaient pas attendre la disponibilité du navire physique pour être testés. BlueNav a fait appel à l'équipe Systèmes Cyber-Physiques du CATIE pour construire un environnement de simulation permettant de travailler en amont. J'ai été l'ingénieur principal en charge de ce développement.

## Ce que j'ai construit

:::info Contrainte centrale
Produire un environnement suffisamment fidèle pour que les résultats soient exploitables pour valider de vrais algorithmes — pas juste une démonstration visuelle.
:::

J'ai développé l'environnement de simulation en trois axes indépendants :

<Tabs>
  <TabItem value="navire" label="Modèle du navire">
    La modélisation physique du navire en URDF, construite à partir des plans fournis par BlueNav, reproduit la géométrie et les propriétés dynamiques de l'embarcation. Un collègue a ensuite contribué à la description du second bateau modélisé, le Spirit.
  </TabItem>
  <TabItem value="environnement" label="Environnement fluvial">
    La simulation de l'environnement fluvial couvre les vagues, le vent et les courants, avec des paramètres configurables pour mettre les algorithmes face à des conditions représentatives du terrain d'opération de BlueNav.
  </TabItem>
  <TabItem value="capteurs" label="Suite de capteurs">
    J'ai intégré la suite de capteurs embarqués en simulation : GPS, IMU, caméra thermique et LiDAR. Chaque capteur est calibré pour produire des données fidèles au matériel réel, bruit et dérives inclus — ce niveau de fidélité est ce qui rend la simulation utile pour la validation d'algorithmes de fusion de données.
  </TabItem>
</Tabs>

J'ai également mis en place l'infrastructure Docker qui encapsule toute la stack technique (ROS 2 Humble, Gazebo, dépendances propriétaires), ainsi que les bridges ROS-Gazebo permettant aux équipes BlueNav de brancher leur code de navigation sans modifier leur interface logicielle.

## Résultats

Les algorithmes de navigation, de maintien de cap et de positionnement dynamique ont pu être validés avant la mise à disposition du navire physique. L'environnement a été adopté par les équipes R&D de BlueNav comme outil de test et de validation pérenne.

## Liens

- [Article CATIE – BlueNav](https://www.catie.fr/language/fr/bluenav-2/)
- [bluenav.com](https://bluenav.com/)
