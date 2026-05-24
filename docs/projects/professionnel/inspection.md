---
title: Inspection visuelle automatisée de véhicules
description: Pipeline edge de vision par ordinateur pour la détection automatique de dommages sur véhicules neufs en parcs portuaires. Inférence sur NPU embarqué, traitement RAW en temps réel.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src="/img/project/inspection.png" alt="Inspection visuelle automatisée de véhicules" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />


<div className="project-meta-grid">
  <div className="project-meta-item">📅 2023 – 2025</div>
  <div className="project-meta-item">👤 Rôle : Contributeur sur deux sous-systèmes</div>
  <div className="project-meta-item">🛠️ Python · multiprocessing · pipeline image · inférence embarquée</div>
</div>

## Le contexte

Sur les parcs portuaires, les véhicules neufs arrivent par convois avant d'être chargés dans des navires rouliers. Chaque véhicule doit passer une inspection visuelle pour détecter les dommages survenus pendant le transport — rayures, impacts, déformations de carrosserie. Ces inspections se faisaient manuellement : lentes, coûteuses, et inégales selon l'opérateur.

Le CATIE a accompagné une entreprise internationale spécialisée dans le contrôle automatisé des véhicules sur sites portuaires pour automatiser entièrement ce processus. Le dispositif final capture jusqu'à 20 000 images en 3 secondes par véhicule, détecte les défauts de surface, et redirige les cas suspects vers une zone de vérification sans interrompre le flux logistique. J'ai contribué à deux composants d'une infrastructure plus large pilotée par un orchestrateur central.

## Mes contributions

<Tabs>
  <TabItem value="trans" label="Pipeline de transformation">
    Chaque véhicule traversant le couloir d'inspection génère un volume d'images brutes considérable en quelques secondes. Ce composant prend en charge leur transformation pour les rendre exploitables par la suite de la chaîne : conversion du format brut des capteurs, découpe en zones d'analyse, orientation selon la position de chaque caméra, et compression pour le stockage et le transfert.

    Le traitement est parallélisé pour absorber le débit imposé par le rythme industriel, et le système sait attendre que le logiciel de capture ait terminé d'écrire ses fichiers avant de démarrer — ce qui évite de traiter des données incomplètes. À l'issue du traitement, les résultats sont transmis à l'orchestrateur central et les archives sont gérées selon le statut de chaque scan.
  </TabItem>
  <TabItem value="hailo" label="Inférence embarquée">
    L'inférence de détection de défauts tourne directement dans les conteneurs d'inspection, sans dépendance à un serveur distant, grâce à un accélérateur IA dédié. Le modèle de détection — développé par les collègues en charge de la partie IA — nécessite d'être compilé et quantifié spécifiquement pour ce matériel avant déploiement.

    Ma contribution porte sur l'infrastructure d'exécution : chargement du modèle compilé sur l'accélérateur, mise en place de la communication entre le pipeline de traitement des images et la puce via deux processus séparés (envoi / réception), et intégration avec l'API REST du Core qui orchestre l'ensemble du système.

    :::info Choix d'architecture
    Le traitement local sur accélérateur n'est pas uniquement motivé par la latence : les images de véhicules constituent des données industrielles sensibles pour le client. Une architecture embarquée supprime toute exfiltration de données vers l'extérieur.
    :::
  </TabItem>
</Tabs>

## Les itérations

Ce projet s'est construit par paliers sur plusieurs années. Une première phase a posé les bases : interfaçage avec le système existant de l'industriel, construction du dataset d'entraînement, validation de l'architecture globale. Des phases suivantes ont progressivement adressé les performances — stabilité du traitement sous charge, temps d'inférence — avant d'aboutir à un déploiement opérationnel sur site.

## Liens

- [Rapport d'activités CATIE 2025 – section Vision par ordinateur](https://www.catie.fr/wp-content/uploads/2026/04/RA2025_web.pdf)
