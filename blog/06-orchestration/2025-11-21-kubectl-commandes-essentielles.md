---
title: "Kubernetes : kubectl"
description: "Les commandes kubectl indispensables pour gérer efficacement des clusters Kubernetes au quotidien."
tags: [orchestration]
---

Kubectl est l'outil en ligne de commande officiel pour interagir avec les clusters Kubernetes. Il couvre l'intégralité des opérations courantes : déploiement, débogage, inspection, mise à l'échelle.

<!--truncate-->

## Configuration et contextes

Kubectl utilise des contextes pour basculer entre différents clusters :

```bash
# Lister tous les contextes disponibles
kubectl config get-contexts

# Afficher le contexte actuel
kubectl config current-context

# Changer de contexte
kubectl config use-context mon-cluster-prod

# Définir le namespace par défaut pour le contexte actuel
kubectl config set-context --current --namespace=production
```

## Commandes de base

### Gestion des ressources

```bash
# Créer ou mettre à jour une ressource depuis un fichier YAML
kubectl apply -f deployment.yaml

# Créer plusieurs ressources depuis un répertoire
kubectl apply -f ./manifests/

# Supprimer une ressource
kubectl delete -f deployment.yaml
kubectl delete deployment mon-deployment
```

### Consultation des ressources

```bash
# Lister les ressources
kubectl get pods
kubectl get pods -o wide          # avec IP et nœud
kubectl get pod mon-pod -o yaml   # manifest complet

# Tous les namespaces
kubectl get pods -A

# Filtrer par labels
kubectl get pods -l app=nginx
kubectl get pods -l environment=production,tier=frontend

# Trier les résultats
kubectl get pods --sort-by=.metadata.creationTimestamp
```

### Informations détaillées

```bash
# Description complète + événements
kubectl describe pod mon-pod
kubectl describe deployment mon-deployment
kubectl describe node mon-node

# Logs
kubectl logs mon-pod
kubectl logs -f mon-pod                        # temps réel
kubectl logs mon-pod -c mon-conteneur          # conteneur spécifique
kubectl logs mon-pod --tail=100
kubectl logs mon-pod --since=5m
kubectl logs mon-pod --previous                # conteneur précédent (crash)
```

## Commandes avancées

### Exécution dans les pods

```bash
# Exécuter une commande
kubectl exec mon-pod -- ls /app

# Shell interactif
kubectl exec -it mon-pod -- /bin/bash
kubectl exec -it mon-pod -c mon-conteneur -- /bin/sh

# Copier des fichiers
kubectl cp mon-pod:/app/config.json ./config.json
kubectl cp ./config.json mon-pod:/app/config.json
```

### Port-forwarding

```bash
kubectl port-forward pod/mon-pod 8080:80
kubectl port-forward service/mon-service 8080:80
kubectl port-forward --address 0.0.0.0 pod/mon-pod 8080:80
```

### Débogage

```bash
# Événements du cluster
kubectl get events --sort-by=.metadata.creationTimestamp
kubectl get events --field-selector type=Warning

# Utilisation des ressources
kubectl top nodes
kubectl top pods
kubectl top pods --containers

# Pods en erreur
kubectl get pods --field-selector=status.phase=Failed
```

### Rollout et mise à l'échelle

```bash
# Mise à jour d'image
kubectl set image deployment/mon-deployment nginx=nginx:1.21

# Mise à l'échelle
kubectl scale deployment mon-deployment --replicas=5

# Rollout
kubectl rollout status deployment/mon-deployment
kubectl rollout history deployment/mon-deployment
kubectl rollout pause deployment/mon-deployment
kubectl rollout resume deployment/mon-deployment
kubectl rollout undo deployment/mon-deployment
kubectl rollout undo deployment/mon-deployment --to-revision=2
```

## Filtrage avancé

### JSONPath

```bash
# Noms des pods
kubectl get pods -o jsonpath='{.items[*].metadata.name}'

# IPs des pods
kubectl get pods -o jsonpath='{.items[*].status.podIP}'

# Noms et IPs tabulés
kubectl get pods -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.status.podIP}{"\n"}{end}'

# Images des conteneurs
kubectl get pods -o jsonpath='{.items[*].spec.containers[*].image}'
```

### Custom columns

```bash
kubectl get pods -o custom-columns=NAME:.metadata.name,STATUS:.status.phase,IP:.status.podIP

kubectl get deployments -o custom-columns=NAME:.metadata.name,DESIRED:.spec.replicas,CURRENT:.status.replicas
```
