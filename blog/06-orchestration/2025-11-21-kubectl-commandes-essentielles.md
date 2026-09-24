---
title: "Kubernetes : kubectl"
description: "Les commandes kubectl courantes pour gérer des clusters Kubernetes au quotidien : contextes, ressources, logs, débogage, rollouts et filtrage."
tags: [orchestration, devops]
---

Kubectl est l'outil en ligne de commande officiel pour interagir avec les clusters Kubernetes. Chaque commande se traduit par une ou plusieurs requêtes REST vers l'API server (visibles avec `-v=6`) : kubectl ne dialogue jamais directement avec les nœuds. Il couvre l'intégralité des opérations courantes : déploiement, débogage, inspection, mise à l'échelle.

<!--truncate-->

## Configuration et contextes

Kubectl lit sa configuration dans `~/.kube/config` (ou dans les fichiers listés par la variable `KUBECONFIG`, fusionnés). Un **contexte** associe un cluster (URL et CA de l'API server), un utilisateur (identifiants) et un namespace par défaut :

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

# Prévisualiser les changements avant de les appliquer
kubectl diff -f deployment.yaml

# Supprimer une ressource
kubectl delete -f deployment.yaml
kubectl delete deployment mon-deployment

# Générer un manifeste sans rien créer, comme point de départ
kubectl create deployment web --image=nginx:1.27 --dry-run=client -o yaml > web.yaml

# Documentation d'un champ, depuis le schéma de l'API du cluster
kubectl explain deployment.spec.strategy
```

`kubectl apply` est déclaratif : il compare le manifeste, l'état réel de l'objet et la dernière configuration appliquée (conservée dans l'annotation `kubectl.kubernetes.io/last-applied-configuration`), puis n'envoie que les différences. Un champ retiré du manifeste est ainsi supprimé de l'objet, tandis qu'un champ modifié par un autre acteur et absent du manifeste est préservé. Avec `--server-side`, ce calcul est effectué par l'API server, qui enregistre le propriétaire (*field manager*) de chaque champ et signale les conflits entre outils.

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

Le tunnel passe par l'API server puis le kubelet du nœud : aucun Service ni règle réseau n'est nécessaire, et les droits RBAC `pods/portforward` suffisent. Par défaut, le port local n'écoute que sur `127.0.0.1` ; `--address 0.0.0.0` l'expose à toutes les machines qui peuvent joindre le poste, sans authentification supplémentaire.

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

# Attendre qu'une condition soit remplie (utile en CI)
kubectl wait --for=condition=Available deployment/mon-deployment --timeout=120s

# Conteneur éphémère de débogage attaché à un pod (images sans shell)
kubectl debug -it mon-pod --image=busybox:1.36 --target=mon-conteneur

# Shell sur un nœud, via un pod privilégié (système de fichiers du nœud dans /host)
kubectl debug node/mon-node -it --image=busybox:1.36
```

Un pod en `CrashLoopBackOff` reste en phase `Running` ou `Pending` : il n'apparaît pas avec le filtre `status.phase=Failed`, réservé aux pods dont tous les conteneurs sont terminés en erreur sans redémarrage prévu. La colonne `STATUS` de `kubectl get pods`, la sortie de `kubectl describe pod` (section *Last State* et événements) et `kubectl logs --previous` renseignent sur ces redémarrages en boucle. `kubectl top` nécessite le composant metrics-server dans le cluster.

### Rollout et mise à l'échelle

```bash
# Mise à jour d'image
kubectl set image deployment/mon-deployment nginx=nginx:1.27

# Mise à l'échelle
kubectl scale deployment mon-deployment --replicas=5

# Rollout
kubectl rollout status deployment/mon-deployment
kubectl rollout history deployment/mon-deployment
kubectl rollout pause deployment/mon-deployment
kubectl rollout resume deployment/mon-deployment
kubectl rollout undo deployment/mon-deployment
kubectl rollout undo deployment/mon-deployment --to-revision=2

# Renseigner la colonne CHANGE-CAUSE de l'historique (remplace l'option --record, dépréciée)
kubectl annotate deployment/mon-deployment kubernetes.io/change-cause="nginx 1.27"
```

Le fonctionnement des rollouts (ReplicaSets successifs, `maxSurge`, `maxUnavailable`) est détaillé dans l'article [rolling update et ressources](./2026-04-04-kubernetes-rolling-update-ressources.md).

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
