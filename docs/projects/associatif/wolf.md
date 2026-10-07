---
title: "Wolf"
tags: [gestion, flask, dolibarr, association, python, eirlab]
description: "Application Flask de gestion interne d'EirLab Community reliant les adhérents à Dolibarr : identification par carte, attribution des formations, gestion du stock par code-barres."
---

<img src="https://www.eirlab.net/wp-content/uploads/2022/10/image-4.png" alt="Aperçu Wolf" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<ProjectMeta
  start="2022"
  end="2023"
  role="Auteur principal"
  domain="Gestion associative, intégration d'outils"
  stack={["Python", "Flask", "Dolibarr"]}
/>

## Contexte

EirLab Community gère ses adhérents, ses formations et son stock dans Dolibarr, un ERP pensé pour des gestionnaires plutôt que pour un usage quotidien au comptoir du fablab. Les fabmanagers bénévoles avaient besoin d'une interface simple pour identifier un adhérent, valider une formation ou sortir un article du stock.

## Réalisations

Wolf est une application Flask développée à partir de juillet 2022 avec Lilian Bonnet et Antoine Pringalle ; j'en suis le principal contributeur. Elle fait le lien entre les adhérents et Dolibarr :

- **Adhérents** : identification par carte étudiante via un lecteur RFID, liaison du profil avec la fiche Dolibarr.
- **Formations** : attribution des formations suivies aux membres.
- **Stock** : recherche d'articles, ajout par référence ou par lecture de code-barres.

Le projet a ensuite évolué vers un environnement d'interconnexion plus général entre outils de gestion (Dolibarr, Notion, GitHub), structuré en deux paquets Python : Wolf Core, qui définit et exécute les applications, et Wolf.

## Résultats

À la publication de l'article en octobre 2022, Wolf était en service au fablab : identification des adhérents par carte, attribution des formations et gestion du stock se faisaient depuis l'application, sans passer par l'interface de Dolibarr. Une documentation était publiée en parallèle. Le code a ensuite servi de base à la version généralisée décrite ci-dessus.

## Liens

- 📝 Article de présentation : [Eirlab.net](https://www.eirlab.net/2022/10/21/wolf-application-de-gestion-interne/)
- 💻 Code source : [GitHub](https://github.com/Eirlab/wolf)
