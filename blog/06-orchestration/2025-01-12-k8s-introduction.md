---
title: "Kubernetes"
description: "Architecture de Kubernetes : control plane, data plane, composants essentiels et rôle de chacun."
tags: [orchestration, devops]
---

Faire tourner quelques conteneurs sur une seule machine se gère avec Docker ou [Docker Compose](./2024-12-20-docker-compose.md). Gérer des centaines de conteneurs répartis sur des dizaines de machines, avec des contraintes de disponibilité, de mise à l'échelle et de mise à jour sans interruption, est un problème fondamentalement différent. Kubernetes répond à ce problème : un système d'orchestration qui prend en charge le placement, le redémarrage, la mise à l'échelle et la communication des conteneurs à l'échelle d'un cluster.

<!--truncate-->

## Architecture : control plane et data plane

Un cluster Kubernetes est divisé en deux niveaux de responsabilité distincts.

Le **control plane** est le cerveau du cluster. Il maintient l'état désiré de l'infrastructure, prend les décisions de planification et réagit aux événements. Il n'exécute pas les workloads applicatifs : il orchestre.

Le **data plane** est l'ensemble des nœuds qui exécutent réellement les conteneurs. Chaque nœud worker reçoit des instructions du control plane et les applique localement.

```text
Control plane
├── API Server          ← point d'entrée unique pour toutes les commandes
├── etcd                ← base de données distribuée, source de vérité du cluster
├── Scheduler           ← décide sur quel nœud placer chaque pod
└── Controller Manager  ← boucles de réconciliation (déploiements, réplicas, etc.)
(Cloud Controller Manager ← intégration avec l'API du fournisseur cloud, si présent)

Data plane (× N nœuds)
├── Kubelet             ← agent local, applique les instructions du control plane
├── Container Runtime   ← exécute les conteneurs (containerd, CRI-O)
└── Kube-proxy          ← gère les règles réseau pour le routage des services
```

## Composants du control plane

### API Server

L'API Server est le seul composant avec lequel les autres interagissent directement. Toutes les opérations (`kubectl apply`, les contrôleurs internes, les opérateurs externes) passent par lui. Il valide les requêtes, les persiste dans etcd, et notifie les composants intéressés via un mécanisme de watch.

### etcd

etcd est le magasin clé-valeur distribué qui contient l'intégralité de l'état du cluster : quels pods existent, quels nœuds sont disponibles, quelles configurations sont actives. Si etcd disparaît, le cluster perd sa mémoire. C'est le composant le plus critique à sauvegarder (`etcdctl snapshot save`).

etcd réplique ses données avec l'algorithme de consensus Raft : une écriture n'est validée que lorsqu'une majorité de membres (quorum) l'a enregistrée. Un cluster de 3 membres tolère la perte d'un membre, un cluster de 5 en tolère deux ; un nombre pair n'apporte aucune tolérance supplémentaire. C'est pourquoi un control plane hautement disponible compte 3 ou 5 nœuds.

### Scheduler

Quand un pod est créé sans nœud assigné, le Scheduler l'analyse et sélectionne le nœud le plus adapté selon les ressources disponibles, les affinités déclarées et les contraintes de topologie. Il écrit sa décision dans etcd via l'API Server ; le Kubelet du nœud sélectionné prend ensuite le relais.

### Controller Manager

Le Controller Manager exécute des boucles de réconciliation en permanence. Chaque contrôleur surveille un type de ressource et s'assure que l'état réel correspond à l'état déclaré. Les contrôleurs s'enchaînent : le Deployment Controller crée et met à jour des ReplicaSets, le ReplicaSet Controller crée ou supprime des pods pour atteindre le nombre de réplicas demandé, et le Node Controller détecte les nœuds inaccessibles puis déclenche l'éviction de leurs pods. Aucun contrôleur ne démarre de conteneur : chacun se contente d'écrire des objets dans l'API, que le composant suivant prend en charge.

Le Cloud Controller Manager, présent sur les clusters hébergés chez un fournisseur cloud, traduit certaines ressources Kubernetes en ressources du fournisseur : un Service de type `LoadBalancer` devient un load balancer cloud, un nœud supprimé côté cloud est retiré du cluster.

## Composants du data plane

### Kubelet

Le Kubelet est l'agent qui tourne sur chaque nœud worker. Il surveille les pods assignés à son nœud via l'API Server et s'assure que les conteneurs décrits sont bien en cours d'exécution. C'est lui qui interagit avec le container runtime pour démarrer, arrêter ou redémarrer les conteneurs.

### Container Runtime

Le container runtime exécute les conteneurs. Kubernetes délègue cette responsabilité via l'interface CRI (Container Runtime Interface) ; containerd et CRI-O sont les runtimes les plus répandus. Docker Engine n'est plus utilisable directement comme runtime depuis Kubernetes 1.24 (suppression du composant `dockershim`), sauf via l'adaptateur externe `cri-dockerd`. Les images construites avec Docker restent exécutables sans changement : ce sont des images au format OCI, que containerd et CRI-O savent lancer.

### Kube-proxy

Kube-proxy maintient les règles réseau sur chaque nœud pour implémenter les Services Kubernetes. Il ne relaie pas lui-même le trafic : il programme le noyau (règles iptables, nftables ou IPVS selon le mode) pour que tout paquet destiné à l'IP virtuelle d'un Service soit réécrit vers l'IP de l'un des pods backend. Certains plugins réseau (CNI), comme Cilium, remplacent entièrement kube-proxy par des programmes eBPF.

L'attribution des adresses IP aux pods et la connectivité entre pods de nœuds différents relèvent d'un autre composant, le plugin CNI (Container Network Interface) : Calico, Cilium, Flannel, ou le VPC CNI sur EKS.

## Le modèle déclaratif

Ce qui distingue Kubernetes d'un simple lanceur de conteneurs est son modèle déclaratif. L'utilisateur ne décrit pas *quoi faire*, mais *quel état atteindre*. Les contrôleurs mesurent en permanence l'écart entre l'état désiré et l'état réel, puis appliquent les corrections nécessaires.

Ce modèle rend le système résilient : un pod qui crashe est recréé automatiquement, un nœud qui tombe voit ses pods reprogrammés ailleurs, une mise à jour interrompue reprend sans intervention manuelle. Le mécanisme s'observe directement :

```bash
# Déclarer un état : 3 réplicas de nginx
kubectl create deployment web --image=nginx:1.27 --replicas=3

# Supprimer un des pods à la main
kubectl delete "$(kubectl get pods -l app=web -o name | head -1)"

# Le ReplicaSet constate l'écart (2 pods au lieu de 3) et en recrée un immédiatement
kubectl get pods -l app=web --watch
```

Les ressources manipulées par ce modèle (Pod, Deployment, StatefulSet, Service) sont présentées dans l'article [Kubernetes : composants de base](./2025-01-12-k8s-basic-components.md).
