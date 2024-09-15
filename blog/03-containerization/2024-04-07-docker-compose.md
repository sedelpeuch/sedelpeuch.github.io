---
title: Introduction à Docker Compose
description: "Explication de Docker Compose, ses cas d'utilisation, des exemples de code, et des schémas explicatifs."
tags: [Docker, Docker Compose, Devops, Containerization]
---

Docker Compose est un outil puissant qui permet de définir et de gérer des applications multi-conteneurs Docker. Il utilise un fichier YAML pour configurer les services de l'application. Ensuite, avec une seule commande, vous pouvez créer et démarrer tous les services à partir de votre configuration.

<!--truncate-->

## Qu'est-ce que Docker Compose ?

Docker Compose est un outil qui permet de définir et de gérer des applications multi-conteneurs Docker. Il utilise un fichier YAML pour configurer les services de l'application. Ensuite, avec une seule commande, vous pouvez créer et démarrer tous les services à partir de votre configuration.

## Exemple de fichier Docker Compose

Voici un exemple de fichier `docker-compose.yml` pour une application web simple avec un service web et une base de données :

```yaml
version: '3'
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
  db:
    image: postgres:alpine
    environment:
      POSTGRES_DB: exampledb
      POSTGRES_USER: exampleuser
      POSTGRES_PASSWORD: examplepass
```

Dans cet exemple, nous avons deux services : `web` et `db`. Le service `web` utilise l'image `nginx:alpine` et mappe le port 80 du conteneur au port 80 de l'hôte. Le service `db` utilise l'image `postgres:alpine` et définit quelques variables d'environnement pour configurer la base de données.

## Commandes Docker Compose

Voici quelques commandes Docker Compose couramment utilisées :

- `docker-compose up` : Crée et démarre les conteneurs définis dans le fichier `docker-compose.yml`.
- `docker-compose down` : Arrête et supprime les conteneurs, les réseaux et les volumes créés par `docker-compose up`.
- `docker-compose ps` : Affiche l'état des conteneurs définis dans le fichier `docker-compose.yml`.
- `docker-compose logs` : Affiche les logs des conteneurs.

## Schéma explicatif

Voici un schéma expliquant comment Docker Compose fonctionne :

![Schéma Docker Compose](https://www.biaudelle.fr/wp-content/uploads/2021/07/docker-compose-archi.png)

## Démonstration pratique

Pour mieux comprendre l'utilisation de Docker Compose, voici une démonstration pratique :

```bash
docker network create mynetwork
docker-compose up -d
docker-compose ps
```

Ouvrez votre navigateur et accédez à `http://localhost`.

```bash
docker-compose down
```

## Avantages clés de Docker Compose

L'utilisation de Docker Compose offre plusieurs avantages qui simplifient le développement, le déploiement et la gestion des applications conteneurisées :

- **Contrôle simplifié** : Docker Compose vous permet de définir et de gérer des applications multi-conteneurs dans un seul fichier YAML. Cela simplifie la tâche complexe d'orchestrer et de coordonner divers services, rendant plus facile la gestion et la réplication de votre environnement applicatif.
- **Collaboration efficace** : Les fichiers de configuration Docker Compose sont faciles à partager, facilitant la collaboration entre les développeurs, les équipes d'exploitation et les autres parties prenantes. Cette approche collaborative conduit à des flux de travail plus fluides, une résolution des problèmes plus rapide et une efficacité globale accrue.
- **Développement rapide d'applications** : Compose met en cache la configuration utilisée pour créer un conteneur. Lorsque vous redémarrez un service qui n'a pas changé, Compose réutilise les conteneurs existants. La réutilisation des conteneurs signifie que vous pouvez apporter des modifications à votre environnement très rapidement.
- **Portabilité entre les environnements** : Compose prend en charge les variables dans le fichier Compose. Vous pouvez utiliser ces variables pour personnaliser votre composition pour différents environnements ou différents utilisateurs.
- **Communauté et support étendus** : Docker Compose bénéficie d'une communauté dynamique et active, ce qui signifie des ressources abondantes, des tutoriels et un support. Cet écosystème communautaire contribue à l'amélioration continue de Docker Compose et aide les utilisateurs à résoudre efficacement les problèmes.

Compose peut être utilisé de nombreuses manières différentes. Voici quelques cas d'utilisation courants.

### Environnements de développement

Lorsque vous développez des logiciels, la capacité à exécuter une application dans un environnement isolé et à interagir avec elle est cruciale. L'outil en ligne de commande Compose peut être utilisé pour créer l'environnement et interagir avec lui.

Le fichier Compose fournit un moyen de documenter et de configurer toutes les dépendances de service de l'application (bases de données, files d'attente, caches, API de services web, etc.). En utilisant l'outil en ligne de commande Compose, vous pouvez créer et démarrer un ou plusieurs conteneurs pour chaque dépendance avec une seule commande (`docker compose up`).

Ensemble, ces fonctionnalités offrent un moyen pratique de démarrer un projet. Compose peut réduire un "guide de démarrage pour les développeurs" de plusieurs pages à un seul fichier Compose lisible par machine et quelques commandes.

### Environnements de test automatisés

Une partie importante de tout processus de déploiement continu ou d'intégration continue est la suite de tests automatisés. Les tests automatisés de bout en bout nécessitent un environnement dans lequel exécuter les tests. Compose fournit un moyen pratique de créer et de détruire des environnements de test isolés pour votre suite de tests. En définissant l'environnement complet dans un fichier Compose, vous pouvez créer et détruire ces environnements en quelques commandes seulement.

### Déploiements sur un seul hôte

Compose a traditionnellement été axé sur les flux de travail de développement et de test, mais à chaque nouvelle version, nous progressons sur des fonctionnalités plus orientées vers la production.

Pour plus de détails sur l'utilisation des fonctionnalités orientées production, consultez [Compose en production](https://docs.docker.com/compose/production/).

## Utilisation des secrets avec Docker Compose

Docker Compose permet également de gérer les secrets de manière sécurisée. Les secrets sont des informations sensibles telles que des mots de passe, des clés API, etc., qui ne doivent pas être exposées dans le code source.

Voici un exemple de configuration de secrets dans un fichier `docker-compose.yml` :

```yaml
version: '3.7'
services:
  web:
    image: nginx:alpine
    secrets:
      - my_secret
secrets:
  my_secret:
    file: ./my_secret.txt
```

Dans cet exemple, le service `web` utilise un secret nommé `my_secret` qui est défini dans le fichier `my_secret.txt`.

## Support des GPU avec Docker Compose

Docker Compose prend également en charge l'utilisation des GPU pour les applications nécessitant des capacités de calcul intensif, telles que l'apprentissage automatique et le traitement d'images.

Voici un exemple de configuration pour utiliser un GPU avec Docker Compose :

```yaml
version: '3.8'
services:
  gpu_service:
    image: nvidia/cuda:10.2-base
    deploy:
      resources:
        reservations:
          devices:
            - capabilities: [gpu]
```

Dans cet exemple, le service `gpu_service` utilise l'image `nvidia/cuda:10.2-base` et réserve un GPU pour le conteneur.


## Utilisation de la surveillance des fichiers avec Docker Compose

Docker Compose permet également de surveiller les modifications des fichiers et de redémarrer automatiquement les services concernés. Cela est particulièrement utile pour les environnements de développement.

Voici un exemple de configuration de surveillance des fichiers dans un fichier `docker-compose.yml` :

```yaml
version: '3.8'
services:
  web:
    image: nginx:alpine
    volumes:
      - ./src:/usr/share/nginx/html
    command: sh -c "nginx -g 'daemon off;'"
    file_watch:
      watch: ./src
      action: restart
```

Dans cet exemple, le service `web` surveille les modifications dans le répertoire `./src` et redémarre automatiquement le service lorsque des modifications sont détectées.

## Réseau dans Compose

> **Important**
>
> La documentation de Docker se réfère et décrit les fonctionnalités de Compose V2.
>
> À partir de juillet 2023, Compose V1 a cessé de recevoir des mises à jour et n'est plus inclus dans les nouvelles versions de Docker Desktop. Compose V2 l'a remplacé et est maintenant intégré dans toutes les versions actuelles de Docker Desktop. Pour plus d'informations, consultez [Migrer vers Compose V2](https://docs.docker.com/compose/migrate).

Par défaut, Compose configure un seul [réseau](https://docs.docker.com/reference/cli/docker/network/create/) pour votre application. Chaque conteneur pour un service rejoint le réseau par défaut et est à la fois accessible par d'autres conteneurs sur ce réseau et découvrable par le nom du service.

> **Remarque**
>
> Le réseau de votre application reçoit un nom basé sur le "nom du projet", qui est basé sur le nom du répertoire dans lequel il se trouve. Vous pouvez remplacer le nom du projet avec soit le [flag `--project-name`](https://docs.docker.com/reference/) soit la [variable d'environnement `COMPOSE_PROJECT_NAME`](https://docs.docker.com/compose/environment-variables/envvars/#compose_project_name).

Par exemple, supposons que votre application se trouve dans un répertoire appelé `myapp`, et que votre `compose.yml` ressemble à ceci :

Lorsque vous exécutez `docker compose up`, les actions suivantes se produisent :

1.  Un réseau appelé `myapp_default` est créé.
2.  Un conteneur est créé en utilisant la configuration de `web`. Il rejoint le réseau `myapp_default` sous le nom `web`.
3.  Un conteneur est créé en utilisant la configuration de `db`. Il rejoint le réseau `myapp_default` sous le nom `db`.

Chaque conteneur peut maintenant rechercher le nom du service `web` ou `db` et obtenir l'adresse IP appropriée du conteneur. Par exemple, le code de l'application de `web` pourrait se connecter à l'URL `postgres://db:5432` et commencer à utiliser la base de données Postgres.

Il est important de noter la distinction entre `HOST_PORT` et `CONTAINER_PORT`. Dans l'exemple ci-dessus, pour `db`, le `HOST_PORT` est `8001` et le port du conteneur est `5432` (par défaut pour postgres). La communication de service à service en réseau utilise le `CONTAINER_PORT`. Lorsque `HOST_PORT` est défini, le service est également accessible en dehors du swarm.

Dans le conteneur `web`, votre chaîne de connexion à `db` ressemblerait à `postgres://db:5432`, et depuis la machine hôte, la chaîne de connexion ressemblerait à `postgres://{DOCKER_IP}:8001`, par exemple `postgres://localhost:8001` si votre conteneur s'exécute localement.

### Mise à jour des conteneurs sur le réseau

Si vous apportez une modification de configuration à un service et exécutez `docker compose up` pour le mettre à jour, l'ancien conteneur est supprimé et le nouveau rejoint le réseau sous une adresse IP différente mais avec le même nom. Les conteneurs en cours d'exécution peuvent rechercher ce nom et se connecter à la nouvelle adresse, mais l'ancienne adresse cesse de fonctionner.

Si des conteneurs ont des connexions ouvertes vers l'ancien conteneur, elles sont fermées. Il incombe au conteneur de détecter cette condition, de rechercher à nouveau le nom et de se reconnecter.

> **Astuce**
>
> Référencez les conteneurs par nom, et non par IP, chaque fois que possible. Sinon, vous devrez constamment mettre à jour l'adresse IP que vous utilisez.

### Réseau multi-hôte

Lors du déploiement d'une application Compose sur un moteur Docker avec [le mode Swarm activé](https://docs.docker.com/engine/swarm/), vous pouvez utiliser le pilote intégré `overlay` pour activer la communication multi-hôte.

Les réseaux overlay sont toujours créés comme `attachable`. Vous pouvez éventuellement définir la propriété [`attachable`](https://docs.docker.com/reference/compose-file/networks/#attachable) sur `false`.

Consultez la [section mode Swarm](https://docs.docker.com/engine/swarm/) pour savoir comment configurer un cluster Swarm, et le [guide de démarrage avec le réseau multi-hôte](https://docs.docker.com/engine/network/tutorials/overlay/) pour en savoir plus sur les réseaux overlay multi-hôte.

### Spécifier des réseaux personnalisés

Au lieu d'utiliser simplement le réseau d'application par défaut, vous pouvez spécifier vos propres réseaux avec la clé de niveau supérieur `networks`. Cela vous permet de créer des topologies plus complexes et de spécifier des [pilotes de réseau personnalisés](https://docs.docker.com/engine/extend/plugins_network/) et des options. Vous pouvez également l'utiliser pour connecter des services à des réseaux créés en externe qui ne sont pas gérés par Compose.

Chaque service peut spécifier à quels réseaux se connecter avec la clé de niveau service `networks`, qui est une liste de noms référencant des entrées sous la clé de niveau supérieur `networks`.

L'exemple suivant montre un fichier Compose qui définit deux réseaux personnalisés. Le service `proxy` est isolé du service `db`, car ils ne partagent pas de réseau en commun. Seul `app` peut parler aux deux.

Les réseaux peuvent être configurés avec des adresses IP statiques en définissant l'[adresse ipv4 et/ou ipv6](https://docs.docker.com/reference/compose-file/services/#ipv4_address-ipv6_address) pour chaque réseau attaché.

Les réseaux peuvent également recevoir un [nom personnalisé](https://docs.docker.com/reference/compose-file/networks/#name) :

### Configurer le réseau par défaut

Au lieu de, ou en plus de, spécifier vos propres réseaux, vous pouvez également modifier les paramètres du réseau par défaut de l'application en définissant une entrée sous `networks` nommée `default` :

### Utiliser un réseau préexistant

Si vous souhaitez que vos conteneurs rejoignent un réseau préexistant, utilisez l'option [`external`](https://docs.docker.com/reference/compose-file/networks/#external)

Au lieu de tenter de créer un réseau appelé `[projectname]_default`, Compose recherche un réseau appelé `my-pre-existing-network` et connecte les conteneurs de votre application à celui-ci.


## Conclusion

Docker Compose est un outil puissant pour gérer des applications multi-conteneurs. Il simplifie la configuration, l'isolation des environnements et la portabilité des applications. En utilisant Docker Compose, vous pouvez facilement définir et gérer des environnements de développement, de test et de mise en scène, ainsi que des déploiements de production simples.

Pour en savoir plus sur Docker Compose, vous pouvez consulter la [documentation officielle](https://docs.docker.com/compose/).
