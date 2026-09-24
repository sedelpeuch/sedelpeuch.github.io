---
title: "Docker Swarm"
description: "Docker Swarm, l'orchestrateur intégré à Docker Engine : managers et consensus Raft, services, routing mesh, stacks Compose, secrets et réseaux overlay."
tags: [orchestration, devops]
---

Docker Swarm (mode Swarm de Docker Engine) est le système d'orchestration intégré à Docker : il regroupe plusieurs hôtes Docker en un cluster et y maintient des services répliqués. Il ne demande aucun composant supplémentaire et réutilise le format Compose, au prix d'un périmètre fonctionnel plus restreint que celui de Kubernetes.

<!--truncate-->

## Qu'est-ce que Docker Swarm ?

Docker Swarm est un mode de clustering intégré directement dans Docker qui transforme plusieurs machines Docker en un seul cluster logique. Il offre :

- **Gestion distribuée** : Coordination automatique des conteneurs sur plusieurs nœuds
- **Haute disponibilité** : Réplication des services et basculement automatique
- **Load balancing** : Distribution automatique du trafic
- **Sécurité native** : TLS mutuel automatique entre nœuds (avec rotation des certificats) et gestion des secrets

## Architecture de Docker Swarm

### Composants principaux

**Manager Nodes** (Nœuds gestionnaires)

- Gèrent l'état du cluster
- Maintiennent la base de données distribuée, répliquée par l'algorithme de consensus Raft
- Orchestrent les services et planifient les tâches
- Élisent automatiquement un leader parmi eux

**Worker Nodes** (Nœuds de travail)

- Exécutent les conteneurs
- Reçoivent les tâches du manager
- Rapportent leur état au manager

Comme etcd pour Kubernetes, le journal Raft n'accepte une modification que si une majorité de managers (quorum) la valide. Avec 3 managers, le cluster tolère la perte d'un manager ; avec 5, de deux. Un nombre pair n'apporte aucune tolérance supplémentaire, et au-delà de 7 managers la latence de consensus augmente sans bénéfice. Si le quorum est perdu, les conteneurs existants continuent de tourner, mais plus aucune modification (déploiement, mise à l'échelle, replanification) n'est possible. Par défaut, les managers exécutent aussi des tâches ; `docker node update --availability drain <nœud>` les réserve à la gestion du cluster.

## Initialiser un Swarm

### Créer un premier nœud manager

```bash
docker swarm init
```

Cela initie le swarm et retourne un token pour ajouter d'autres nœuds (sur une machine à plusieurs interfaces, `--advertise-addr <IP>` précise l'adresse annoncée aux autres nœuds) :

```text
Swarm initialized: current node (id) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-xxx <MANAGER_IP>:2377
```

### Ajouter des nœuds workers

Sur une autre machine :

```bash
docker swarm join --token SWMTKN-1-xxx <MANAGER_IP>:2377
```

### Vérifier le cluster

```bash
docker node ls

# Afficher à nouveau le token d'ajout d'un manager
docker swarm join-token manager
```

Les nœuds doivent pouvoir communiquer sur les ports 2377/TCP (gestion du cluster, vers les managers), 7946/TCP et UDP (découverte entre nœuds) et 4789/UDP (trafic des réseaux overlay, encapsulé en VXLAN).

## Déployer des Services

Les services Swarm remplacent les conteneurs simples dans un cluster. Un service décrit un état désiré (image, nombre de répliques, réseaux) ; le manager le décompose en **tâches**, chacune correspondant à un conteneur planifié sur un nœud. Si un conteneur s'arrête ou si un nœud disparaît, le manager crée une nouvelle tâche pour revenir au nombre de répliques demandé.

### Créer un service simple

```bash
docker service create \
  --name web-app \
  --replicas 3 \
  --publish published=80,target=80 \
  nginx:1.27-alpine
```

Le port publié l'est sur **tous** les nœuds du cluster, même ceux qui n'exécutent aucune réplique : c'est le *routing mesh*. Une requête reçue sur le port 80 de n'importe quel nœud entre dans le réseau overlay `ingress`, atteint l'IP virtuelle du service, puis est répartie par IPVS entre les répliques, quel que soit leur nœud. Un load balancer externe peut ainsi cibler tous les nœuds sans connaître le placement des conteneurs. L'option `mode=host` (`--publish published=80,target=80,mode=host`) contourne ce mécanisme et ne publie le port que sur les nœuds qui exécutent une réplique, ce qui préserve l'adresse IP source du client.

### Lister les services

```bash
docker service ls
```

### Voir les tâches d'un service

```bash
docker service ps web-app
```

## Gestion des Services

### Mettre à jour un service

```bash
docker service update \
  --image nginx:1.28-alpine \
  --update-parallelism 1 \
  --update-delay 10s \
  --update-failure-action rollback \
  web-app

# Revenir manuellement à la configuration précédente
docker service rollback web-app
```

La mise à jour est progressive : les tâches sont remplacées par lots de `parallelism`, avec un délai entre chaque lot. Si une nouvelle tâche échoue, `failure-action rollback` rétablit automatiquement la version précédente.

### Redimensionner un service

```bash
docker service scale web-app=5
```

### Supprimer un service

```bash
docker service rm web-app
```

## Configuration avec Docker Compose

Docker Swarm accepte aussi un fichier au format [Compose](./2024-12-20-docker-compose.md), déployé comme une *stack* avec la commande `docker stack deploy`. La section `deploy` y décrit le comportement propre au cluster.

**compose.yaml**

```yaml
services:
  web:
    image: nginx:1.27-alpine
    ports:
      - "80:80"
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
        failure_action: rollback
        order: start-first        # démarrer la nouvelle tâche avant d'arrêter l'ancienne
    networks:
      - webnet

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
    secrets:
      - db_password
    volumes:
      - db_data:/var/lib/postgresql/data
    deploy:
      replicas: 1
      placement:
        constraints:
          - node.labels.storage == db   # toujours le même nœud, celui qui porte le volume
    networks:
      - webnet

secrets:
  db_password:
    external: true                # créé au préalable avec docker secret create

volumes:
  db_data:

networks:
  webnet:
    driver: overlay
```

### Déployer la stack

```bash
# Étiqueter le nœud qui hébergera la base
docker node update --label-add storage=db node-2

docker stack deploy -c compose.yaml myapp
```

Plusieurs différences avec `docker compose` sont à connaître. Les volumes nommés utilisent par défaut le pilote `local` : ils existent sur chaque nœud indépendamment, sans réplication. Sans contrainte de placement, une base replanifiée sur un autre nœud y trouve un volume vide ; la contrainte `node.labels.storage == db` l'attache au nœud qui détient les données (un stockage partagé, NFS ou pilote de volume distribué, est l'autre option). Par ailleurs, `docker stack deploy` ignore `build` (les images doivent être disponibles dans un registre accessible à tous les nœuds) ainsi que `depends_on`.

### Consulter les stacks

```bash
docker stack ls
docker stack ps myapp
```

## Gestion des Secrets

Docker Swarm offre une gestion native des secrets chiffrés. Un secret est stocké chiffré dans le journal Raft des managers, transmis par TLS aux seuls nœuds qui exécutent un service autorisé à le lire, et monté dans le conteneur sous `/run/secrets/<nom>` dans un système de fichiers en mémoire (`tmpfs`). Il n'est jamais écrit sur le disque des workers ni exposé comme variable d'environnement.

### Créer un secret

```bash
echo "my_secret_password" | docker secret create db_password -
```

### Utiliser un secret dans un service

```bash
docker service create \
  --name myservice \
  --secret db_password \
  -e DB_PASSWORD_FILE=/run/secrets/db_password \
  myimage
```

Un secret est immuable : sa rotation passe par la création d'un nouveau secret (`db_password_v2`) et la mise à jour du service (`docker service update --secret-rm db_password --secret-add source=db_password_v2,target=db_password`). Avec `docker swarm init --autolock`, la clé de chiffrement du journal Raft est elle-même protégée par une clé à fournir (`docker swarm unlock`) à chaque redémarrage d'un manager.

## Réseaux Overlay

Les réseaux overlay permettent la communication entre conteneurs sur différents nœuds.

### Créer un réseau overlay

```bash
docker network create -d overlay --attachable mynetwork

# Chiffrer aussi le trafic applicatif entre nœuds (IPsec)
docker network create -d overlay --opt encrypted mysecurenetwork
```

Un réseau overlay encapsule le trafic des conteneurs dans des paquets VXLAN (UDP 4789) échangés entre les nœuds. Le trafic de gestion du cluster est toujours chiffré ; le trafic applicatif des overlays ne l'est qu'avec l'option `encrypted`, qui a un coût en performances. `--attachable` autorise des conteneurs lancés avec `docker run` (hors service) à rejoindre le réseau.

### Connecter un service à un réseau

```bash
docker service create \
  --name web \
  --network mynetwork \
  nginx
```

## Avantages et Limitations

### Avantages

- Intégration native avec Docker Engine : aucun composant à installer
- Mise en place en quelques commandes (`docker swarm init`, `docker swarm join`)
- Réutilisation directe des fichiers Compose
- Faible consommation de ressources du plan de contrôle

### Limitations

- Périmètre fonctionnel plus restreint que Kubernetes (pas d'équivalent aux CRD, aux opérateurs, aux politiques réseau fines)
- Aucune mise à l'échelle automatique native : le nombre de répliques est fixé manuellement ou par un outil externe
- Planification limitée aux contraintes et préférences de placement
- Pas de gestion native du stockage persistant multi-nœuds
- Écosystème d'outils plus restreint

## Quand utiliser Docker Swarm ?

- **Clusters petits à moyens** (quelques dizaines de nœuds)
- **Applications déjà décrites en Compose**, à répartir sur plusieurs hôtes sans changer de format
- **Équipes sans expertise Kubernetes**, pour qui le coût d'exploitation d'un cluster Kubernetes ne se justifie pas
- **Prototypage** et environnements de démonstration

## Application / Projet lié

### [Cluster Kubernetes SONU](/docs/projects/professionnel/sonu-k8s-cluster)
**Utilisation** : Comparaison architecturale : le cluster utilise Kubernetes (kubeadm) plutôt que Swarm pour plus de fonctionnalités et scalabilité.

## Conclusion

Docker Swarm couvre les besoins essentiels d'orchestration (répliques, mises à jour progressives, secrets, réseau multi-hôte) avec un coût de mise en place et d'exploitation réduit. Kubernetes répond aux besoins plus larges : extensibilité par l'API, écosystème, stockage et réseau avancés, mise à l'échelle automatique. Le choix dépend donc du périmètre fonctionnel requis et de la capacité de l'équipe à exploiter la plateforme ; l'[architecture de Kubernetes](./2025-01-12-k8s-introduction.md) permet de comparer les deux modèles.
