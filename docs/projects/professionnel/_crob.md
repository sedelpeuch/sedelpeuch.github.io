---
title: "C-Rob : Architecture Logicielle Distribuée & Coordination Technique"
tags: [robotique, ROS2, Zephyr, open-source, R&D, architecture, devops, perception, navigation]
---

<div className="project-meta-grid">
 <div className="project-meta-item">📅 Date : 2025-présent</div>
 <div className="project-meta-item">👤 Rôle : Coordination technique, lead ROS2 (Python)</div>
 <div className="project-meta-item">🛠️ Techno : ROS2 (Python), orchestration, navigation, perception</div>
</div>

<img src="/img/crob.png" alt="C-Rob" style={{maxWidth: '400px', margin: '2em auto', display: 'block'}} />

## Contexte du projet

Plateforme : C-Rob, démonstrateur open source de robotique modulaire autonome et sociale développé par le CATIE pour RoboCup@Home. Après 6 années avec une plateforme commerciale (TIAGo PAL Robotics), le projet a nécessité une refonte complète pour maîtriser l'intégralité de la chaîne technologique et atteindre les objectifs de compétition.

La plateforme repose actuellement sur deux modules détachables et indépendants : une base mobile omnidirectionnelle et un module central dédié à la perception et au traitement des données. Un module de préhension, composé d’un bras, viendra prochainement compléter l’ensemble. L’architecture système est organisée en deux niveaux : la base mobile s’appuie sur Zephyr RTOS et micro-ROS pour le contrôle temps réel des moteurs, tandis que le module central exécute ROS2 (Jazzy Jalisco) pour l’intelligence, la navigation et la perception.

**Enjeux clés :**

- Navigation autonome dans environnements humains dynamiques (domestiques, RoboCup@Home)
- Perception multimodale temps réel (3 caméras stéréo RGBD, 3 LiDARs 2D)
- Architecture modulaire permettant évolution incrémentale et collaboration multi-équipes
- Déploiement reproductible cross-platform (Docker)

## Contributions techniques

### Architecture ROS2 Distribuée Multi-Niveaux

- Définition et mise en œuvre d’une architecture logicielle multi-niveaux :
  - Niveau microcontrôleur : Zephyr RTOS sur STM32, contrôle temps réel moteurs/alimentation, utilisation d'un bus CAN pour la communication dans la base mobile
  - Communication inter-niveaux : micro-ROS over UDP
  - Niveau PC embarqué : ROS2 orchestrant navigation, perception, interaction
- Définition des interfaces ROS2 standardisées, configuration QoS avancée
- Documentation architecture pour contributeurs externes

### Modularisation par Packages ROS2

- Organisation du workspace en submodules Git
- Description robot modulaire (URDF/XACRO), stack Nav2, configuration multi-LiDAR, framework perception IA (MoveNet, YOLO, OSNet), webUI Flask/Bootstrap
- Messages ROS2 personnalisés, intégration caméras OAK-D, monitoring et redémarrage automatique

### Coordination Cahier des Charges & Spécifications

- Analyse besoins RoboCup@Home, identification briques critiques, spécifications interfaces (débit caméras, fréquence LiDAR, latence moteurs)
- Validation contraintes matérielles (autonomie, masse, dimensions)
- Rédaction cahier des charges fonctionnel, documentation choix architecturaux

### Infrastructure DevOps, Jumeau Numérique & Reproductibilité

- Docker multi-service (Ubuntu 24.04 + ROS2), volumes partagés, réseau bridge custom, devcontainers
- CI/CD GitHub Actions : build, tests, releases, changelog automatique
- Déploiement unifié réel/simulation : passage instantané de la plateforme réelle à la simulation Gazebo (gz sim) sur n'importe quel PC, facilitant le développement, les tests et la formation.
- Résultat : environnement cross-platform, onboarding facilité, qualité code améliorée

### Intégration Multi-Capteurs & Fusion Données

- Fusion 3 LiDARs (scan 360°), fusion 6 caméras RGBD, synchronisation temporelle (NTP, buffer TF), odométrie roues (encodeurs via micro-ROS)
- Validation bande passante, robustesse synchronisation

## Stack technique

- Robotique : ROS2 Jazzy, micro-ROS, Nav2, Cartographer, URDF/XACRO, TF, QoS
- Containerisation : Docker, Docker Compose, Devcontainers
- CI/CD : GitHub Actions, Git submodules
- Langages : Python (rclpy)

## Liens et ressources 🔗

- [Rapport d'activité CATIE (2025)](https://catie.fr/rapport-activite-2025/)
