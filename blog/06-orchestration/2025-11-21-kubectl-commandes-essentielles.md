---
title: "Kubernetes : kubectl"
description: "Les commandes kubectl indispensables pour gérer efficacement des clusters Kubernetes au quotidien."
tags: [orchestration]
---

Kubectl est l'outil en ligne de commande officiel pour interagir avec les clusters Kubernetes. La maîtrise de kubectl est essentielle pour tout DevOps ou développeur travaillant avec Kubernetes. Cet article explore les commandes de base et avancées, ainsi que des astuces pour améliorer la productivité. 🚀

<!--truncate-->

## Configuration et contextes 🔧

### Gestion des contextes

Kubectl utilise des contextes pour basculer entre différents clusters :

```bash
# Afficher la configuration actuelle
kubectl config view

# Lister tous les contextes disponibles
kubectl config get-contexts

# Afficher le contexte actuel
kubectl config current-context

# Changer de contexte
kubectl config use-context mon-cluster-prod

# Créer un nouveau contexte
kubectl config set-context mon-contexte \
  --cluster=mon-cluster \
  --user=mon-utilisateur \
  --namespace=mon-namespace

# Définir le namespace par défaut pour le contexte actuel
kubectl config set-context --current --namespace=production
```

## Commandes de base 📝

### Gestion des ressources

```bash
# Créer une ressource depuis un fichier YAML
kubectl apply -f deployment.yaml

# Créer plusieurs ressources depuis un répertoire
kubectl apply -f ./manifests/

# Créer une ressource depuis une URL
kubectl apply -f https://example.com/deployment.yaml

# Supprimer une ressource
kubectl delete -f deployment.yaml
kubectl delete deployment mon-deployment

# Supprimer toutes les ressources d'un type
kubectl delete deployments --all
```

### Consultation des ressources

```bash
# Lister toutes les ressources d'un type
kubectl get pods
kubectl get deployments
kubectl get services

# Afficher plus de détails
kubectl get pods -o wide

# Afficher au format YAML ou JSON
kubectl get pod mon-pod -o yaml
kubectl get pod mon-pod -o json

# Lister toutes les ressources dans tous les namespaces
kubectl get pods --all-namespaces
kubectl get pods -A  # Raccourci

# Filtrer par labels
kubectl get pods -l app=nginx
kubectl get pods -l environment=production,tier=frontend

# Trier les résultats
kubectl get pods --sort-by=.metadata.creationTimestamp
kubectl get pods --sort-by=.status.startTime
```

### Informations détaillées

```bash
# Décrire une ressource (informations détaillées + événements)
kubectl describe pod mon-pod
kubectl describe deployment mon-deployment
kubectl describe node mon-node

# Afficher les logs d'un pod
kubectl logs mon-pod

# Afficher les logs en temps réel
kubectl logs -f mon-pod

# Afficher les logs d'un conteneur spécifique dans un pod
kubectl logs mon-pod -c mon-conteneur

# Afficher les logs des 100 dernières lignes
kubectl logs mon-pod --tail=100

# Afficher les logs depuis les 5 dernières minutes
kubectl logs mon-pod --since=5m

# Afficher les logs du conteneur précédent (en cas de crash)
kubectl logs mon-pod --previous
```

## Commandes avancées 🎯

### Exécution de commandes dans les pods

```bash
# Exécuter une commande dans un pod
kubectl exec mon-pod -- ls /app

# Ouvrir un shell interactif
kubectl exec -it mon-pod -- /bin/bash
kubectl exec -it mon-pod -- /bin/sh

# Exécuter dans un conteneur spécifique
kubectl exec -it mon-pod -c mon-conteneur -- /bin/bash

# Copier des fichiers depuis/vers un pod
kubectl cp mon-pod:/app/config.json ./config.json
kubectl cp ./config.json mon-pod:/app/config.json
```

### Port-forwarding et proxy

```bash
# Rediriger un port local vers un pod
kubectl port-forward pod/mon-pod 8080:80

# Rediriger vers un service
kubectl port-forward service/mon-service 8080:80

# Rediriger vers un deployment
kubectl port-forward deployment/mon-deployment 8080:80

# Permettre l'accès depuis toutes les interfaces
kubectl port-forward --address 0.0.0.0 pod/mon-pod 8080:80

# Créer un proxy vers l'API Kubernetes
kubectl proxy --port=8001
```

### Débogage et dépannage

```bash
# Obtenir les événements du cluster
kubectl get events
kubectl get events --sort-by=.metadata.creationTimestamp
kubectl get events --field-selector type=Warning

# Vérifier l'état des nœuds
kubectl top nodes

# Vérifier l'utilisation des ressources des pods
kubectl top pods
kubectl top pods --containers

# Afficher les pods en erreur
kubectl get pods --field-selector=status.phase=Failed

# Afficher les pods non prêts
kubectl get pods --field-selector=status.phase!=Running

# Obtenir le YAML complet d'une ressource en cours d'exécution
kubectl get pod mon-pod -o yaml > pod-backup.yaml
```

### Édition en place

```bash
# Éditer une ressource avec l'éditeur par défaut
kubectl edit deployment mon-deployment

# Définir l'éditeur (exemple avec vim)
KUBE_EDITOR="vim" kubectl edit deployment mon-deployment

# Mettre à jour l'image d'un deployment
kubectl set image deployment/mon-deployment nginx=nginx:1.21

# Mettre à l'échelle un deployment
kubectl scale deployment mon-deployment --replicas=5

# Mettre en pause / reprendre un rollout
kubectl rollout pause deployment/mon-deployment
kubectl rollout resume deployment/mon-deployment

# Vérifier le statut d'un rollout
kubectl rollout status deployment/mon-deployment

# Voir l'historique des révisions
kubectl rollout history deployment/mon-deployment

# Revenir à la révision précédente
kubectl rollout undo deployment/mon-deployment

# Revenir à une révision spécifique
kubectl rollout undo deployment/mon-deployment --to-revision=2
```

## Techniques de filtrage avancées 🔍

### JSONPath

JSONPath permet d'extraire des informations spécifiques des objets Kubernetes :

```bash
# Obtenir uniquement les noms des pods
kubectl get pods -o jsonpath='{.items[*].metadata.name}'

# Obtenir les IPs des pods
kubectl get pods -o jsonpath='{.items[*].status.podIP}'

# Obtenir les noms et IPs (avec formatage)
kubectl get pods -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.status.podIP}{"\n"}{end}'

# Obtenir les images des conteneurs
kubectl get pods -o jsonpath='{.items[*].spec.containers[*].image}'

# Obtenir les nodes et leur capacité CPU
kubectl get nodes -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.status.capacity.cpu}{"\n"}{end}'
```

### Custom Columns

Créer un affichage personnalisé des ressources :

```bash
# Affichage personnalisé avec custom-columns
kubectl get pods -o custom-columns=NAME:.metadata.name,STATUS:.status.phase,IP:.status.podIP

# Afficher les nodes avec leur version
kubectl get nodes -o custom-columns=NAME:.metadata.name,VERSION:.status.nodeInfo.kubeletVersion

# Afficher les deployments avec leurs replicas
kubectl get deployments -o custom-columns=NAME:.metadata.name,DESIRED:.spec.replicas,CURRENT:.status.replicas
```

## Ressources utiles 📚

- [Documentation officielle kubectl](https://kubernetes.io/docs/reference/kubectl/)
- [Kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- [JSONPath dans Kubernetes](https://kubernetes.io/docs/reference/kubectl/jsonpath/)

## Conclusion 🎯

Kubectl est un outil puissant et flexible pour gérer des clusters Kubernetes. La maîtrise de ces commandes et astuces permet de gagner en productivité et en efficacité au quotidien. La pratique régulière est la clé pour devenir expert avec kubectl.

L'exploration des fonctionnalités avancées et la création d'alias et scripts personnalisés peuvent automatiser les tâches récurrentes. 🚀
