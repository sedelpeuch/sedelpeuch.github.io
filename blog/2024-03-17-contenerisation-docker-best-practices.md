---
title: Pratiques de production
description: "L'adoption de Docker augmente constamment et beaucoup le connaissent, mais tout le monde n'utilise pas Docker selon les meilleures pratiques."
tags: [Conteneur, Docker, Devops]
---

<!--truncate-->

## Utilisez une image Docker officielle et vérifiée comme image de base, chaque fois disponible

Disons que vous développez une application Node.js et que vous souhaitez la créer et l'exécuter en tant qu'image Docker.

Au lieu de prendre une image du système d'exploitation de base et d'installer Node.js, NPM et tous les autres outils dont vous avez besoin pour votre application, utilisez l'image de node officiel pour votre application.

## Utilisez des versions d'image docker spécifiques

D'accord, nous avons donc sélectionné l'image de base, mais maintenant lorsque nous construisons notre image d'applications à partir de ce Dockerfile, il utilisera toujours la dernière balise de l'image de nœud.

Ainsi, au lieu d'une étiquette d'image aléatoire, vous souhaitez fixer la version, et tout comme vous déployez votre propre application avec une version spécifique, vous souhaitez utiliser l'image officielle avec une version spécifique.

## Utiliser des images officielles de petite taille

Lors du choix d'une image Node.js, vous verrez qu'il y a en fait plusieurs images officielles. Non seulement avec différents numéros de version mais aussi avec différentes distributions de systèmes d'exploitation:

1) Taille de l'image : si l'image est basée sur une distribution de système d'exploitation à part entière comme Ubuntu ou Centos, vous aurez un tas d'outils déjà emballés dans l'image. Ainsi, la taille de l'image sera plus grande, mais vous n'avez pas besoin de la plupart de ces outils dans vos images d'application.

2) Problème de sécurité : avec de nombreux outils installés à l'intérieur, vous devez considérer l'aspect de sécurité. Parce que ces images de base contiennent généralement [des centaines de vulnérabilités connues](https://snyk.io/blog/openSourcesEcurity-2020Survey/) et créent essentiellement une plus grande surface d'attaque à votre image d'application.

Ainsi, la meilleure pratique ici serait de sélectionner une image avec une version spécifique basée sur une distribution plus maigre comme Alpine.

## Optimiser la mise en cache pour les couches d'image lors de la construction d'une image

1) Que sont les layer d'image? Une image Docker est construite sur la base d'un dockerfile.

Et dans un dockerfile, chaque commande ou instruction crée un layer d'image.

Ainsi, lorsque nous utilisons une image de base d'alpine, il a déjà des layers, car il a déjà été construit en utilisant son propre dockerfile. Dans notre dockerfile, nous avons quelques autres commandes qui ajouteront chacune un nouveau layer à cette image.

Ainsi, lorsque vous reconstruisez votre image, si votre Dockerfile n'a pas changé, Docker n'utilisera que les layers en cache pour construire l'image.

Avantages des layers d'image en cache:

- Contruction d'image plus rapide
- Push et pull plus rapides de nouvelles versions d'image: Si je pull une nouvelle version d'image de la même application et, disons, 2 nouveaux layers ont été ajoutées dans la nouvelle version: seule la nouvelle version des layers ajoutées seront téléchargées Les autres sont déjà mis en cache localement par Docker.

Optimiser la mise en cache : une fois qu'un layer change, tous les layers suivants doivent également être recréées. En d'autres termes: lorsque vous modifiez le contenu d'une ligne dans le dockerfile, les caches de toutes les lignes ou layers suivantes seront invalidés.

Ainsi, la règle ici et la meilleure pratique est: placez vos commandes dans le Dockerfile du moins au plus fréquemment modifé.

## à l'aide d'un fichier .dockerignore

C'est assez simple. Nous créons simplement ce fichier .dockerignore et répertorions tous les fichiers et dossiers que nous voulons être ignorés, et lors de la création de l'image, Docker examinera le contenu et ignorera tout ce qui est spécifié à l'intérieur.

## Utilisez des versions multi-étages

Maintenant, disons qu'il existe un outil dans votre projet dont vous avez besoin pour construire l'image mais vous n'en avez pas besoin dans l'image finale pour exécuter leapplication.

Supposons que vous conserviez ces artefacts dans votre image finale, même s'ils sont absolument inutiles pour exécuter l'application. Dans ce cas, cela entraînera à nouveau une augmentation de la taille de l'image et une augmentation de la surface d'attaque.

Pour cela, vous pouvez utiliser ce qu'on appelle les constructions à plusieurs étages

La fonction de construction en plusieurs étapes vous permet d'utiliser plusieurs images temporaires pendant le processus de construction, mais ne conserve que la dernière image comme artefact final.

## Utilisez l'utilisateur le moins privilégié

Maintenant, lorsque nous créons cette image et que nous l'exécutons finalement en tant que conteneur, quel utilisateur du système d'exploitation sera utilisé pour démarrer l'application à l'intérieur? Par défaut, lorsqu'un DockerFile ne spécifie pas un utilisateur, il utilise un utilisateur root. Mais en réalité, il n'y a surtout aucune raison d'exécuter des conteneurs avec des privilèges root.

Cela introduit essentiellement un problème de sécurité car lorsque le conteneur commence sur l'hôte, il aura potentiellement un accès root sur l'hôte Docker.

Pour éviter cela, la meilleure pratique consiste à créer simplement un utilisateur dédié et un groupe dédié dans l'image Docker pour exécuter l'application et également exécuter l'application à l'intérieur du conteneur avec cet utilisateur.

## Scannez vos images pour les vulnérabilités de sécurité

Enfin, comment s'assurer et valider que l'image que vous construisez a peu ou pas de vulnérabilités de sécurité ?

La meilleure pratique est, une fois que vous avez construit l'image, la scannez pour des vulnérabilités de sécurité à l'aide de la commande docker scan.

En arrière-plan, Docker utilise en fait un service appelé SNYK pour faire la numérisation de la vulnérabilité des images. Le scan utilise une base de données de vulnérabilités, qui est constamment mise à jour.
