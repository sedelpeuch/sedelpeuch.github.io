---
title: Ronoco
tags: [opensource, ROS]
---

<img src="/img/project/ronoco.png" alt="Aperçu Ronoco" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Présentation

🤖 Ronoco est né en 2021 d’une envie de démocratiser la robotique : comment permettre à des ingénieurs, étudiants ou passionnés de piloter des robots complexes sans écrire une ligne de code ? Le projet a débuté par des discussions avec des utilisateurs frustrés par la complexité de ROS, puis par des sessions de brainstorming pour imaginer une interface graphique intuitive, inspirée du no-code.

L’aventure a été rythmée par des phases de prototypage, de tests sur de vrais robots (manipulateurs et roulants), et de nombreux échanges avec la communauté open source. Les défis n’ont pas manqué : rendre l’architecture modulaire, assurer la compatibilité avec MoveIt et MoveBase, concevoir une expérience utilisateur fluide…

Ronoco, c’est aussi une histoire de partage : documentation détaillée, démos, retours d’expérience lors d’événements techniques, et la satisfaction de voir des non-développeurs réussir à programmer des robots grâce à l’outil.

## Démarche et réalisations 🚀

- **Analyse des besoins** : identification des freins à l'adoption de ROS et des attentes des utilisateurs non techniques.
- **Architecture modulaire** 🧩 : création de trois modules indépendants pour répondre à différents usages :

 <Tabs>
  <TabItem value="ronoco-vm" label="ronoco-vm">
   Interpréteur graphique basé sur Flask, transformant les blocs visuels en commandes ROS.
  </TabItem>
  <TabItem value="ronoco-nodered" label="ronoco-nodered">
   Extension Node-RED pour la création d'arbres de comportement et de séquences d'actions.
  </TabItem>
  <TabItem value="ronoco-ui" label="ronoco-ui">
   Interface web pour piloter les robots, enregistrer des positions et lancer des programmes.
  </TabItem>
 </Tabs>

- **Intégration ROS** : compatibilité avec MoveIt (manipulateurs) et MoveBase (robots roulants), génération de messages ROS standards.
- **Expérience utilisateur** 🎨 : design d'une interface graphique inspirée de Node-RED et Scratch, facilitant la prise en main.
- **Documentation et communication** 📝 : rédaction de guides, création de visuels et d'une démo animée pour valoriser le projet.

## Technologies et outils 🛠️

- ROS (Noetic/Melodic)
- Python 3, Flask
- Node.js, npm, Node-RED
- JavaScript
- GitHub Actions pour CI

## Impact et retours 🌍

Ronoco a permis à plusieurs utilisateurs non développeurs de concevoir et tester des programmes robotiques, notamment dans des contextes industriels et associatifs. Le projet a été présenté lors d'événements techniques et a suscité l'intérêt de la communauté open-source ROS.

## Liens et ressources 🔗

- 📖 Présentation détaillée : [ronoco](https://delpeuch.net/ronoco/)
- 💻 Code source : [GitHub](https://github.com/sedelpeuch/ronoco)
- 🖼️ Démo : ![ronoco](https://github.com/sedelpeuch/ronoco/raw/master/ronoco.gif)


> Ronoco, c'est la volonté de rendre la robotique accessible, en supprimant la barrière du code pour la programmation de robots complexes sous ROS. ✨
