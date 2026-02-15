---
title: "Docker Swarm"
description: "Introduction à Docker Swarm, l'orchestrateur natif de Docker. Découvrez comment déployer et gérer des clusters de conteneurs."
tags: [orchestration, devops]
---

Docker Swarm est le système d'orchestration natif de Docker qui permet de gérer un cluster de conteneurs de manière simple et intégrée. Contrairement à Kubernetes, Swarm est plus léger et plus facile à configurer, le rendant idéal pour les petits à moyens déploiements.

<!--truncate-->

## Qu'est-ce que Docker Swarm ?

Docker Swarm est un mode de clustering intégré directement dans Docker qui transforme plusieurs machines Docker en un seul cluster logique. Il offre :

- **Gestion distribuée** : Coordination automatique des conteneurs sur plusieurs nœuds
- **Haute disponibilité** : Réplication des services et basculement automatique
- **Load balancing** : Distribution automatique du trafic
- **Sécurité native** : Chiffrement TLS automatique et gestion des secrets

## Architecture de Docker Swarm

### Composants principaux

**Manager Nodes** (Nœuds gestionnaires)

- Gèrent l'état du cluster
- Maintiennent la base de données distribuée (raft)
- Orchestre les services
- Élection leader automatique

**Worker Nodes** (Nœuds de travail)

- Exécutent les conteneurs
- Reçoivent les tâches du manager
- Rapportent leur état au manager

## Initialiser un Swarm

### Créer un premier nœud manager

```bash
docker swarm init
```

Cela initie le swarm et retourne un token pour ajouter d'autres nœuds :

```
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
```

## Déployer des Services

Les services Swarm remplacent les conteneurs simples dans un cluster. Ils garantissent que le nombre de répliques souhaité est toujours en exécution.

### Créer un service simple

```bash
docker service create \
  --name web-app \
  --replicas 3 \
  -p 80:8080 \
  nginx:latest
```

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
  --image nginx:alpine \
  web-app
```

### Redimensionner un service

```bash
docker service scale web-app=5
```

### Supprimer un service

```bash
docker service rm web-app
```

## Configuration avec Docker Compose

Docker Swarm supporte également le déploiement via Docker Compose avec la command `docker stack deploy`.

**docker-compose.yml**

```yaml
version: '3.8'

services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
    networks:
      - webnet

  db:
    image: postgres:13
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - db_data:/var/lib/postgresql/data
    deploy:
      replicas: 1
    networks:
      - webnet

volumes:
  db_data:

networks:
  webnet:
    driver: overlay
```

### Déployer la stack

```bash
docker stack deploy -c docker-compose.yml myapp
```

### Consulter les stacks

```bash
docker stack ls
docker stack ps myapp
```

## Gestion des Secrets

Docker Swarm offre une gestion native des secrets chiffrés.

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

## Réseaux Overlay

Les réseaux overlay permettent la communication entre conteneurs sur différents nœuds.

### Créer un réseau overlay

```bash
docker network create -d overlay --attachable mynetwork
```

### Connecter un service à un réseau

```bash
docker service create \
  --name web \
  --network mynetwork \
  nginx
```

## Avantages et Limitations

### ✅ Avantages

- Intégration native avec Docker
- Configuration simple et rapide
- Parfait pour petits/moyens clusters
- Faible overhead de ressources

### ❌ Limitations

- Moins de fonctionnalités que Kubernetes
- Pas d'autoscaling sophistiqué
- Scheduling moins flexible
- Écosystème moins riche

## Quand utiliser Docker Swarm ?

- **Clusters petits à moyens** (< 50 nœuds)
- **Déploiements simples** sans besoins complexes
- **Équipes** préférant la simplicité à la puissance
- **Prototypage rapide** et POC

## Conclusion

Docker Swarm reste une excellente option pour l'orchestration de conteneurs quand on privilégie la simplicité. Pour des déploiements plus complexes et à grande échelle, Kubernetes reste le choix de référence. Le choix entre les deux dépend vraiment des besoins spécifiques du projet.
