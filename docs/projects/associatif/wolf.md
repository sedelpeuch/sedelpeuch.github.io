---
title: Wolf
tags: [opensource, automatisation, gestion]
---

<img src="/img/project/wolf.png" alt="Aperçu Wolf" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Présentation

🦊 Wolf est un projet open-source né en 2022 d’un constat vécu sur le terrain : la gestion d’une association ou d’un projet implique souvent de jongler entre de nombreux outils (Notion, Dolibarr, GitHub…) et de répéter les mêmes actions fastidieuses. L’idée de Wolf est alors apparue : créer un orchestrateur qui centralise, automatise et relie tous ces outils pour libérer du temps et fiabiliser la gestion.

L’aventure Wolf a commencé par des échanges avec d’autres responsables associatifs, des ateliers pour cartographier les besoins, puis des sessions de prototypage pour imaginer une architecture modulaire. Le projet a évolué au fil des retours utilisateurs, des tests sur des cas réels (gestion de membres, synchronisation de documents, automatisation de tâches récurrentes), et de l’intégration de nouveaux services au fil des années.

Wolf, c’est aussi une expérience collective : documentation, retours d’expérience, contributions open source, et la volonté de rendre l’automatisation accessible à toutes les structures, même sans équipe technique dédiée.

## Démarche et réalisations 🚀

- **Analyse des besoins** : recueil des usages et identification des points de friction dans la gestion multi-outils.
- **Architecture modulaire** 🧩 : séparation entre Wolf (orchestrateur) et Wolf-Core (cœur métier et interfaces génériques).

<Tabs>
 <TabItem value="wolf" label="Wolf">
  Orchestrateur principal, configuration par tokens pour chaque service (Notion, Dolibarr, GitHub…).
 </TabItem>
 <TabItem value="wolf-core" label="Wolf-Core">
  Cœur du système, définit les interfaces et la logique de planification des applications à exécuter.
 </TabItem>
</Tabs>

- **Automatisation** 🤖 : synchronisation de données, déclenchement d’actions automatiques, gestion des accès et des droits.
- **Expérience utilisateur** 🎨 : configuration simple via fichiers, documentation claire, logs détaillés.
- **Tests et CI** 🧪 : intégration de tests automatisés et d’une pipeline CI pour garantir la robustesse du projet.

## Technologies et outils 🛠️

- Python 3, Poetry, virtualenv
- API REST, gestion de tokens
- GitHub Actions pour CI

## Impact et retours 🌍

Wolf a permis à plusieurs associations et groupes projets de gagner du temps, d’éviter les erreurs humaines et de fluidifier la gestion quotidienne. Le projet est pensé pour être facilement extensible à de nouveaux outils ou API.

## Liens et ressources 🔗

- 📖 Présentation détaillée : [wolf](https://github.com/sedelpeuch/wolf)
- 💻 Code source Wolf-Core : [GitHub](https://github.com/sedelpeuch/wolf-core)

---

> Wolf, c’est l’automatisation au service de la gestion associative et collaborative. ✨
