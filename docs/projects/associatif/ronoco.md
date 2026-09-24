---
title: Ronoco
tags: [opensource, ros, no-code, python, flask, node-red]
description: Interface no-code pour programmer des robots ROS (manipulateurs MoveIt et robots roulants move_base) sans écrire de code ; premier prototype développé en stage de 2e année d'école d'ingénieur.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src="https://www.eirlab.net/wp-content/uploads/2021/10/logo_full_black.png" alt="Aperçu Ronoco" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<ProjectMeta
  start="Juin 2021"
  end="Septembre 2021"
  role="Développeur du premier prototype"
  domain="Robotique, no-code, interface homme-machine"
  stack={["ROS", "Python", "Flask", "Node-RED", "JavaScript"]}
/>

## Contexte

Avec ROS, créer un comportement robotique suppose d'écrire des programmes en C++ ou en Python, ce qui rend l'outil inaccessible aux experts métier non développeurs : ingénieurs procédés, ingénieurs d'industrialisation. Ronoco (ROS no code) est un projet open source proposé par Yoan Mollard pour lever ce frein. J'en ai développé le premier prototype lors de mon stage d'application de 2e année à l'ENSEIRB-MATMECA, de juin à septembre 2021, au sein de ROS4Pro.

## Réalisations

L'architecture est découpée en trois modules indépendants :

<Tabs>
  <TabItem value="ronoco-vm" label="ronoco-vm">
    API Flask qui interprète les blocs visuels et les traduit en code ROS exécutable.
  </TabItem>
  <TabItem value="ronoco-nodered" label="ronoco-nodered">
    Extension Node-RED pour composer des arbres de comportement et des séquences d'actions.
  </TabItem>
  <TabItem value="ronoco-ui" label="ronoco-ui">
    Client web qui fournit l'interface graphique et les utilitaires de pilotage : commande des robots, enregistrement de positions, lancement de programmes.
  </TabItem>
</Tabs>

L'intégration ROS vise ROS Noetic (compatible Melodic) : les manipulateurs sont pilotés via MoveIt, les robots roulants via move_base (client d'action `SimpleActionClient`). Pendant le stage, j'ai testé l'outil sur des robots manipulateurs et roulants, dont un Kuka KR6 R900, un Sawyer, un UR3, un Poppy Ergo Jr et un TurtleBot. La documentation et une démonstration animée accompagnent le dépôt.

## Liens

- 📖 Présentation détaillée : [ronoco](https://delpeuch.net/ronoco/)
- 💻 Code source : [GitHub](https://github.com/sedelpeuch/ronoco)
- 📝 Article de présentation : [Eirlab.net](https://www.eirlab.net/2021/11/03/ronoco/)
- 🖼️ Démonstration : ![ronoco](https://github.com/sedelpeuch/ronoco/raw/master/ronoco.gif)
