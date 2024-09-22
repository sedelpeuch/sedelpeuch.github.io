---
title: Différence entre un proxy et un reverse proxy
description: "Explication de la différence entre un proxy et un reverse proxy, inspirée du transcript de la vidéo 'Proxy vs Reverse Proxy vs Load Balancer | Simply Explained'."
tags: [Proxy, Reverse Proxy, Network, Devops]
---

Dans cet article, nous allons explorer la différence entre un proxy et un reverse proxy.

<!--truncate-->

## Qu'est-ce qu'un proxy ?

Un proxy, également connu sous le nom de proxy direct ou proxy de transfert, est un serveur qui agit comme un intermédiaire entre un client (par exemple, un utilisateur ou un appareil) et un serveur de destination sur Internet. Voici un aperçu détaillé de son fonctionnement :

1. **Interception des requêtes** : Lorsqu'un client souhaite accéder à une ressource sur Internet, il envoie une requête au proxy au lieu de se connecter directement au serveur de destination. Le proxy intercepte cette requête.

2. **Filtrage et sécurité** : Le proxy examine la requête pour s'assurer qu'elle respecte les politiques de sécurité et de filtrage définies par l'administrateur réseau. Il peut bloquer l'accès à certains sites web, filtrer les contenus inappropriés ou malveillants, et appliquer des règles de sécurité.

3. **Anonymisation** : Le proxy peut masquer l'adresse IP du client en utilisant sa propre adresse IP pour se connecter au serveur de destination. Cela permet de protéger l'identité et la confidentialité du client.

4. **Mise en cache** : Le proxy peut mettre en cache les réponses des serveurs de destination. Si un autre client demande la même ressource, le proxy peut fournir la réponse mise en cache, ce qui réduit la charge sur le serveur de destination et améliore les temps de réponse.

5. **Transmission de la requête** : Si la requête est autorisée, le proxy la transmet au serveur de destination en utilisant sa propre adresse IP. Le serveur de destination répond alors au proxy.

6. **Retour de la réponse** : Le proxy reçoit la réponse du serveur de destination, la filtre à nouveau si nécessaire, et la renvoie au client. Le client reçoit ainsi la réponse comme s'il avait directement communiqué avec le serveur de destination.

### Exemple d'utilisation d'un proxy

Imaginez que vous planifiez un dîner dans un restaurant populaire, mais que vous ne voulez pas interagir directement avec le personnel. Vous avez donc un assistant personnel qui fait la réservation pour vous. Le personnel du restaurant ne communique qu'avec votre assistant, pas directement avec vous. Dans ce scénario, votre assistant personnel est un proxy.

Dans un contexte d'entreprise, un administrateur peut configurer tout le trafic Internet des ordinateurs des employés pour qu'il passe par un proxy. Cela permet de protéger le réseau interne de l'entreprise en bloquant les sites web malveillants et en filtrant le trafic.

Un proxy peut également mettre en cache les réponses des serveurs backend pour réduire la charge et améliorer les temps de réponse. Par exemple, si un employé regarde une vidéo YouTube, le proxy peut mettre en cache cette vidéo pour que les autres employés puissent la regarder sans consommer de bande passante supplémentaire.

## Qu'est-ce qu'un reverse proxy ?


Un reverse proxy, également connu sous le nom de proxy inverse, est un serveur qui se trouve devant les serveurs internes d'une entreprise et gère les requêtes entrantes des clients. Voici un aperçu détaillé de son fonctionnement :

1. **Réception des requêtes** : Lorsqu'un client envoie une requête pour accéder à une ressource sur un serveur interne, la requête est d'abord reçue par le reverse proxy au lieu d'être directement envoyée au serveur interne.

2. **Distribution des requêtes** : Le reverse proxy examine la requête et la distribue au serveur interne approprié en fonction de la capacité, de la charge et des règles de routage définies. Cela permet de répartir la charge de manière équilibrée entre les serveurs internes.

3. **Sécurité et filtrage** : Le reverse proxy peut appliquer des politiques de sécurité pour filtrer les requêtes malveillantes, bloquer les attaques DDoS, et assurer le chiffrement SSL/TLS pour sécuriser les communications entre les clients et les serveurs internes.

4. **Mise en cache** : Le reverse proxy peut mettre en cache les réponses des serveurs internes. Si un autre client demande la même ressource, le reverse proxy peut fournir la réponse mise en cache, ce qui réduit la charge sur les serveurs internes et améliore les temps de réponse.

5. **Retour de la réponse** : Le serveur interne répond au reverse proxy, qui filtre à nouveau la réponse si nécessaire, et la renvoie au client. Le client reçoit ainsi la réponse comme s'il avait directement communiqué avec le serveur interne.

6. **Surveillance et journalisation** : Le reverse proxy peut surveiller et journaliser les requêtes et les réponses pour des raisons de sécurité, de dépannage et d'analyse des performances.

### Exemple d'utilisation d'un reverse proxy

Reprenons l'analogie du restaurant. Lorsque vous arrivez au restaurant, au lieu de chercher une table vous-même, vous vous enregistrez à la réception. Le réceptionniste vous montre la table appropriée. Ici, le réceptionniste est un reverse proxy.

Un reverse proxy peut également agir comme un bouclier pour protéger les serveurs internes en filtrant les requêtes et en assurant le chiffrement SSL. Il peut également mettre en cache les réponses pour accélérer les temps de réponse aux clients.

Un reverse proxy peut également fournir des fonctionnalités d'équilibrage de charge. Par exemple, si un serveur est surchargé, le reverse proxy peut rediriger les requêtes vers un autre serveur moins occupé. Cela permet d'assurer une répartition équilibrée de la charge et d'améliorer les performances globales du système.

## Différences clés entre un proxy et un reverse proxy

- **Fonctionnalité** : Un proxy agit comme un intermédiaire pour les requêtes sortantes, tandis qu'un reverse proxy gère les requêtes entrantes.
- **Sécurité** : Les deux types de proxy offrent des fonctionnalités de sécurité, mais un reverse proxy protège les serveurs internes en filtrant les requêtes entrantes.
- **Caching** : Les deux types de proxy peuvent mettre en cache les réponses, mais un reverse proxy le fait pour accélérer les temps de réponse aux clients.

En résumé, un proxy et un reverse proxy ont des rôles différents mais complémentaires dans la gestion du trafic réseau. Un proxy protège les utilisateurs en filtrant le trafic sortant, tandis qu'un reverse proxy protège les serveurs en gérant les requêtes entrantes.

## Schéma récapitulatif

![Schéma récapitulatif](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fwqces5nwe4hb4bydyd13.png)
