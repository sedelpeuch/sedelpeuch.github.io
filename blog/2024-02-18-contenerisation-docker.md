---
title: Le concept de conteneur Docker
description: "Docker est un outil open source qui permet aux développeurs de créer, déployer, exécuter, mettre à jour et gérer les conteneurs."
tags: [Conteneur, Docker, Devops]
---

<!--truncate-->

## Qu'est-ce qu'un conteneur et quels problèmes résout-il?

Un conteneur est un **moyen de packager des applications** avec tout ce dont ils ont besoin à l'intérieur de ce package, y compris toutes ses dépendances et toutes les configurations nécessaires.

Le package est portable comme tout autre artefact, et ce package peut être facilement partagé et déplacé entre une équipe de développement ou une équipe de développement et d'opérations.

La portabilité des conteneurs, ainsi que tout ce qui est packagé dans un **environnement isolé**, lui donne des avantages qui rendent le processus de développement et de déploiement plus efficace.

## Développement d'applications avant / après conteneur

Voyons maintenant comment les conteneurs améliorent le processus de développement par des exemples spécifiques.

Comment avons-nous développé des applications avant les conteneurs?

Habituellement, lorsque vous avez une équipe de développeurs travaillant sur une application, vous devez installer directement la plupart des services sur votre système d'exploitation.

Chaque développeur de l'équipe devrait alors aller installer les binaires de ces services, les configurer et les exécuter sur son environnement de développement local. Le processus d'installation sera différent en fonction du système d'exploitation qu'ils utilisent.

Vous avez donc quelques commandes à exécuter, et les **chances qu'une erreur se produise sont élevées**, en raison du nombre d'étapes nécessaires pour installer chaque service.

Maintenant, voyons comment les conteneurs résolvent certains de ces problèmes.

Vous n'avez pas à installer des services directement sur votre système d'exploitation, car le conteneur possède **sa propre couche de système d'exploitation isolée** avec une image de base Linux.

Vous avez tout packagé dans un environnement isolé, en tant que développeur, vous n'avez pas chercher les binaires à télécharger sur votre machine. Au lieu de cela, vous allez consulter le registre de conteneurs pour trouver le conteneur spécifique à votre application et le télécharger sur votre machine locale.

## Déploiement d'application avant / après conteneur

### Avant les conteneurs

Un processus de déploiement traditionnel ressemblera à ceci:

L'équipe de développeur créera des artefacts, qui sont essentiellement des fichiers, ainsi que des instructions sur l'installation et les configurer sur le serveur. Tous ces artefacts et instructions seront fournis par l'équipe de développement:

![alt text](./img/image.png)

L'équipe de développement donnerait donc ces artefacts à l'équipe des opérations, et l'équipe d'opération mettrait en place les environnements pour déployer ces applications:

![Texte alt](./img/image-1.png)

- **Dépendances externes sur le système d'exploitation du serveur**: Le problème avec cette approche est que vous devez d'abord configurer tout et tout installer directement sur le système d'exploitation du serveur. Cela pourrait entraîner des conflits avec les versions de dépendance.
- **Mauvaise communication**: un autre problème qui pourrait résulter de ce processus est un malentendu entre l'équipe de développement et les opérations. Parce que tout est dans un guide textuel, il pourrait y avoir des cas, où les développeurs manquent de mentionner certains points critiques sur la configuration et en cas d'échec, l'équipe d'opérations doit retourner aux développeurs et demander plus de détails.

### Avec les Conteneurs

Avec les conteneurs, ce processus est simplifié, car maintenant les développeurs et les opérations fonctionnent dans une équipe pour former toutes les dépendances de configuration dans l'application.

![Texte alt](./img/image-2.png)

Cela signifie que si vous utilisez un conteneur Docker, vous n'avez pas besoin de configurer quoi que ce soit directement sur le serveur, car tout est déjà encapsulé dans le conteneur. Au lieu de cela, il vous suffit d'exécuter une commande docker qui récupère le conteneur que vous avez stocké dans le registre, puis l'exécute.

C'est donc beaucoup plus simple et aucune configuration environnementale n'est nécessaire sur le serveur. La seule chose bien sûr est que vous devez installer et configurer le runtime docker sur le serveur avant de pouvoir y exécuter des conteneurs. Mais ce n'est qu'un effort unique.