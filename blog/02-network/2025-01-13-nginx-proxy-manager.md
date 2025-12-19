---
title: Nginx Proxy Manager
description: "Présentation de Nginx Proxy Manager, ses fonctionnalités et ses avantages, ainsi qu'une démonstration d'utilisation avec Docker."
tags: [nginx-proxy-manager, Docker, Network, Devops]
---

Nginx Proxy Manager est une interface utilisateur graphique (GUI) pour gérer les proxys inverses Nginx. Il simplifie la gestion des proxys inverses, des certificats SSL et des redirections de trafic. Cet article présente Nginx Proxy Manager, explique ses fonctionnalités et avantages, et fournit une démonstration d'utilisation avec Docker.

<!--truncate-->

## Qu'est-ce que Nginx Proxy Manager ?

![Nginx Proxy Manager](/img/nginx-proxy-manager.png)

[Nginx Proxy Manager](https://nginxproxymanager.com/) est une interface utilisateur graphique (GUI) pour gérer les proxys inverses Nginx. Il permet de configurer facilement des proxys inverses, des certificats SSL et des redirections de trafic. Nginx Proxy Manager est conçu pour être simple à utiliser et accessible aux utilisateurs non techniques.

<details>
<summary>Qu'est-ce qu'un proxy ?</summary>

Un proxy, également connu sous le nom de proxy direct ou proxy de transfert, est un serveur qui agit comme un intermédiaire entre un client (par exemple, un utilisateur ou un appareil) et un serveur de destination sur Internet. Voici un aperçu détaillé de son fonctionnement :

1. **Interception des requêtes** : Lorsqu'un client souhaite accéder à une ressource sur Internet, il envoie une requête au proxy au lieu de se connecter directement au serveur de destination. Le proxy intercepte cette requête.

2. **Filtrage et sécurité** : Le proxy examine la requête pour s'assurer qu'elle respecte les politiques de sécurité et de filtrage définies par l'administrateur réseau. Il peut bloquer l'accès à certains sites web, filtrer les contenus inappropriés ou malveillants, et appliquer des règles de sécurité.

3. **Anonymisation** : Le proxy peut masquer l'adresse IP du client en utilisant sa propre adresse IP pour se connecter au serveur de destination. Cela permet de protéger l'identité et la confidentialité du client.

4. **Mise en cache** : Le proxy peut mettre en cache les réponses des serveurs de destination. Si un autre client demande la même ressource, le proxy peut fournir la réponse mise en cache, ce qui réduit la charge sur le serveur de destination et améliore les temps de réponse.

5. **Transmission de la requête** : Si la requête est autorisée, le proxy la transmet au serveur de destination en utilisant sa propre adresse IP. Le serveur de destination répond alors au proxy.

6. **Retour de la réponse** : Le proxy reçoit la réponse du serveur de destination, la filtre à nouveau si nécessaire, et la renvoie au client. Le client reçoit ainsi la réponse comme s'il avait directement communiqué avec le serveur de destination.

</details>

### Fonctionnalités de Nginx Proxy Manager

- **Gestion des proxys inverses** : Configurez facilement des proxys inverses pour vos applications web.
- **Certificats SSL** : Gérez les certificats SSL pour sécuriser vos sites web.
- **Redirections de trafic** : Configurez des redirections de trafic pour vos domaines et sous-domaines.
- **Interface utilisateur intuitive** : Utilisez une interface utilisateur graphique pour gérer vos configurations Nginx.

### Avantages de Nginx Proxy Manager

- **Simplicité** : Nginx Proxy Manager simplifie la gestion des proxys inverses et des certificats SSL.
- **Accessibilité** : L'interface utilisateur graphique rend Nginx Proxy Manager accessible aux utilisateurs non techniques.
- **Flexibilité** : Nginx Proxy Manager prend en charge une variété de configurations et de scénarios d'utilisation.

## Utilisation de Nginx Proxy Manager avec Docker

Dans cette section, une démonstration est fournie pour montrer comment utiliser Nginx Proxy Manager avec Docker. Un conteneur Docker pour Nginx Proxy Manager sera créé et un proxy inverse pour une application web sera configuré.

### Prérequis

- Docker installé sur la machine
- Une application web à proxyfier

### Étapes

1. **Créer un fichier `docker-compose.yml`**

   Créez un fichier `docker-compose.yml` avec le contenu suivant :

   ```yaml
   version: '3'
   services:
     app:
       image: your-app-image
       container_name: your-app
       ports:
         - "8080:80"
     nginx-proxy-manager:
       image: jc21/nginx-proxy-manager:latest
       container_name: nginx-proxy-manager
       ports:
         - "80:80"
         - "81:81"
         - "443:443"
       volumes:
         - ./data:/data
         - ./letsencrypt:/etc/letsencrypt
   ```

2. **Démarrer les conteneurs Docker**

   Exécutez la commande suivante pour démarrer les conteneurs Docker :

   ```bash
   docker-compose up -d
   ```

3. **Accéder à l'interface utilisateur de Nginx Proxy Manager**

   Ouvrir le navigateur et accéder à `http://localhost:81`. Se connecter avec les informations d'identification par défaut (`admin@example.com` / `changeme`) et changer le mot de passe.

4. **Configurer un proxy inverse**

   Dans l'interface utilisateur de Nginx Proxy Manager, ajouter un nouveau proxy hôte avec les paramètres suivants :

   - **Domain Names** : Entrer le nom de domaine ou l'adresse IP de l'application web.
   - **Forward Hostname / IP** : Entrer `app`.
   - **Forward Port** : Entrer `80`.

   Enregistrer la configuration et accéder à l'application web via le nom de domaine ou l'adresse IP configurée.

## Conclusion

Nginx Proxy Manager est un outil puissant et facile à utiliser pour gérer les proxys inverses Nginx, les certificats SSL et les redirections de trafic. En utilisant Docker, il est possible de déployer et configurer rapidement Nginx Proxy Manager pour les applications web. Essayer Nginx Proxy Manager dès aujourd'hui pour simplifier la gestion des proxys inverses et améliorer la sécurité des sites web.
