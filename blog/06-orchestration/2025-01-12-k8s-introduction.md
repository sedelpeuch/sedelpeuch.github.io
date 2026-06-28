---
title: "Kubernetes"
description: "Architecture de Kubernetes : control plane, data plane, composants essentiels et rôle de chacun."
tags: [orchestration, devops]
---

Gérer des conteneurs sur une seule machine est simple. Gérer des centaines de conteneurs répartis sur des dizaines de machines, avec des contraintes de disponibilité, de mise à l'échelle et de mise à jour sans interruption, est un problème fondamentalement différent. Kubernetes est la réponse à ce problème : un système d'orchestration qui prend en charge le placement, le redémarrage, la mise à l'échelle et la communication des conteneurs à l'échelle d'un cluster.

<!--truncate-->

## Architecture : control plane et data plane

Un cluster Kubernetes est divisé en deux niveaux de responsabilité distincts.

Le **control plane** est le cerveau du cluster. Il maintient l'état désiré de l'infrastructure, prend les décisions de planification et réagit aux événements. Il n'exécute pas les workloads applicatifs — il orchestre.

Le **data plane** est l'ensemble des nœuds qui exécutent réellement les conteneurs. Chaque nœud worker reçoit des instructions du control plane et les applique localement.

```
Control plane
├── API Server          ← point d'entrée unique pour toutes les commandes
├── etcd                ← base de données distribuée, source de vérité du cluster
├── Scheduler           ← décide sur quel nœud placer chaque pod
└── Controller Manager  ← boucles de réconciliation (déploiements, réplicas, etc.)

Data plane (× N nœuds)
├── Kubelet             ← agent local, applique les instructions du control plane
├── Container Runtime   ← exécute les conteneurs (containerd, CRI-O)
└── Kube-proxy          ← gère les règles réseau pour le routage des services
```

## Composants du control plane

### API Server

L'API Server est le seul composant avec lequel les autres interagissent directement. Toutes les opérations — `kubectl apply`, les contrôleurs internes, les opérateurs externes — passent par lui. Il valide les requêtes, les persiste dans etcd, et notifie les composants intéressés via un mécanisme de watch.

### etcd

etcd est le magasin de données distribué qui contient l'intégralité de l'état du cluster : quels pods existent, quels nœuds sont disponibles, quelles configurations sont actives. Si etcd disparaît, le cluster perd sa mémoire. C'est le composant le plus critique à sauvegarder.

### Scheduler

Quand un pod est créé sans nœud assigné, le Scheduler l'analyse et sélectionne le nœud le plus adapté selon les ressources disponibles, les affinités déclarées et les contraintes de topologie. Il écrit sa décision dans etcd via l'API Server — le Kubelet du nœud sélectionné prend ensuite le relais.

### Controller Manager

Le Controller Manager exécute des boucles de réconciliation en permanence. Chaque contrôleur surveille un type de ressource et s'assure que l'état réel correspond à l'état déclaré. Le Deployment Controller maintient le bon nombre de réplicas. Le Node Controller détecte les nœuds inaccessibles. Le ReplicaSet Controller crée ou supprime des pods pour atteindre le nombre souhaité.

## Composants du data plane

### Kubelet

Le Kubelet est l'agent qui tourne sur chaque nœud worker. Il surveille les pods assignés à son nœud via l'API Server et s'assure que les conteneurs décrits sont bien en cours d'exécution. C'est lui qui interagit avec le container runtime pour démarrer, arrêter ou redémarrer les conteneurs.

### Container Runtime

Le container runtime exécute les conteneurs. Kubernetes délègue cette responsabilité via l'interface CRI (Container Runtime Interface) — containerd et CRI-O sont les runtimes les plus répandus. Docker n'est plus un runtime supporté directement depuis Kubernetes 1.24.

### Kube-proxy

Kube-proxy maintient les règles réseau sur chaque nœud pour implémenter les Services Kubernetes. Quand un pod envoie une requête à un Service, kube-proxy assure le routage vers l'un des pods backend via des règles iptables ou ipvs.

## Le modèle déclaratif

Ce qui distingue Kubernetes d'un simple orchestrateur de conteneurs est son modèle déclaratif. On ne dit pas à Kubernetes *quoi faire*, on lui dit *quel état atteindre*. Le Controller Manager se charge en permanence de mesurer l'écart entre l'état désiré et l'état réel, puis d'appliquer les corrections nécessaires.

Ce modèle rend le système naturellement résilient : un pod qui crashe est recréé automatiquement, un nœud qui tombe voit ses pods reprogrammés ailleurs, une mise à jour partielle est completée sans intervention manuelle.
