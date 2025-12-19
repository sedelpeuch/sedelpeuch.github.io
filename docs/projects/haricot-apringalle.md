---
title: Haricot 🌱 (@apringalle)
tags: [opensource, timelapse, raspberry-pi, jardinage]
---

<img src="/img/project/haricot.png" alt="Aperçu Haricot" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

Haricot est un prototype de boîtier open source, imaginé et conçu par @apringalle, qui automatise la création de vidéos timelapse de la pousse d’une plante. Le projet est né d’une envie de documenter la croissance végétale de façon simple et accessible, en s’appuyant sur une Raspberry Pi et une caméra dédiée.

## Présentation

Le cœur du système repose sur une Raspberry Pi 4, équipée d’une caméra orientée vers la plante à observer. Le boîtier imprimé en 3D protège l’ensemble et intègre un bras pour positionner la caméra. Une application web, accessible via le Wi-Fi local du boîtier, permet de configurer la prise de vue (intervalle, durée, stockage), de surveiller l’état du système (nombre de photos, espace disque, temps avant la prochaine capture) et de générer automatiquement la vidéo timelapse.

L’interface utilisateur, basée sur le thème SB Admin 2 (Bootstrap), propose un dashboard intuitif : on peut visualiser les photos, supprimer les anciennes séries, lancer la génération d’un nouveau timelapse (avec options d’interpolation d’images), et ajuster tous les paramètres sans ligne de commande.

## Démarche et histoire

Le projet a été développé en 2021, dans une démarche d’expérimentation et de partage, avec une attention particulière à la simplicité d’installation : scripts shell pour la configuration du hotspot Wi-Fi, lancement automatique de l’application au démarrage, documentation claire pour l’assemblage matériel. Plusieurs prototypes ont été testés au fablab Eirlab, permettant d’affiner l’ergonomie et la robustesse du système.

L’un des défis majeurs a été de fiabiliser la capture d’images sur de longues périodes, en gérant les interruptions et la gestion mémoire. L’option d’interpolation d’images, bien qu’expérimentale, a permis d’obtenir des vidéos plus fluides.

## Technologies

- **Raspberry Pi 4**
- **Python** (backend, scripts de capture et génération de timelapse)
- **Flask** (serveur web)
- **HTML/CSS/JS** (interface utilisateur, Bootstrap SB Admin 2)
- **Shell** (scripts d’installation et de configuration)
- **Impression 3D** (boîtier, bras caméra)

## Installation

1. Imprimez les pièces du dossier `hardware` et assemblez la coque et le bras caméra.
2. Installez Raspberry Pi OS.
3. Exécutez les scripts `setup-hotspot.sh` et `install-service.sh` pour configurer le Wi-Fi et lancer l’application au démarrage.
4. Accédez à l’interface web sur le port 5000 de la Raspberry Pi.
5. Modifiez les paramètres dans `config.txt` si besoin.

Pour plus de détails, voir la [documentation sur GitHub](https://github.com/antoinepringalle/haricot) et la [présentation sur le site d’Eirlab](https://www.eirlab.net/2022/01/09/haricots/).

## Liens

- [Code source GitHub](https://github.com/antoinepringalle/haricot)
- [Présentation Eirlab avec photos](https://www.eirlab.net/2022/01/09/haricots/)

> « Un projet simple, accessible, et reproductible, pour observer la magie du vivant. »
