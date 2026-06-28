---
title: "Docker : débogage"
description: "Techniques et commandes pour diagnostiquer les problèmes dans les conteneurs Docker : logs, inspection, shell interactif, ressources, et problèmes réseau."
tags: [containerization, devops]
---

Déboguer un conteneur diffère du débogage d'une application classique : le processus s'exécute dans un namespace isolé, sans accès direct au shell dans les cas normaux, avec des logs parfois redirigés vers stdout. Les outils Docker exposent l'état interne du conteneur sans nécessiter d'accès SSH.

<!--truncate-->

## Inspecter les logs

```bash
# Logs depuis le démarrage du conteneur
docker logs <conteneur>

# Suivre les logs en temps réel
docker logs -f <conteneur>

# Afficher les N dernières lignes
docker logs --tail 100 <conteneur>

# Filtrer par date
docker logs --since "2024-01-15T10:00:00" <conteneur>
docker logs --since 30m <conteneur>  # depuis 30 minutes
```

Docker capture stdout et stderr du processus principal (PID 1). Si l'application écrit dans des fichiers de logs plutôt que sur stdout, `docker logs` ne retourne rien — il faut alors entrer dans le conteneur pour lire ces fichiers, ou reconfigurer l'application pour écrire sur stdout.

## Entrer dans un conteneur en cours d'exécution

```bash
# Shell interactif
docker exec -it <conteneur> sh
docker exec -it <conteneur> bash  # si bash est disponible

# Commande unique sans shell interactif
docker exec <conteneur> cat /etc/hosts
docker exec <conteneur> env | sort
```

`-it` combine `-i` (stdin ouvert) et `-t` (allouer un pseudo-TTY) — nécessaire pour un shell interactif.

Si l'image est minimaliste (distroless, scratch) et ne contient pas de shell, `docker cp` permet de copier des fichiers depuis le conteneur vers l'hôte pour inspection :

```bash
docker cp <conteneur>:/app/logs/error.log ./error.log
```

## Inspecter l'état du conteneur

```bash
# Métadonnées complètes en JSON : configuration, réseau, volumes, état
docker inspect <conteneur>

# Extraire une valeur spécifique avec jq
docker inspect <conteneur> | jq '.[0].State'
docker inspect <conteneur> | jq '.[0].NetworkSettings.Networks'

# Variables d'environnement injectées
docker inspect <conteneur> | jq '.[0].Config.Env'
```

`docker inspect` révèle également le code de sortie du processus (`ExitCode`) et l'erreur éventuelle (`Error`) — utile pour diagnostiquer les conteneurs qui s'arrêtent immédiatement après le démarrage.

## Monitorer les ressources

```bash
# Utilisation CPU, mémoire, réseau, disque en temps réel (tous les conteneurs)
docker stats

# Conteneurs spécifiques
docker stats api db

# Une seule capture (pas de rafraîchissement)
docker stats --no-stream
```

Un conteneur qui atteint sa limite mémoire est tué par le kernel — `OOMKilled: true` apparaît dans `docker inspect`. Un conteneur à 100% CPU en permanence indique souvent une boucle infinie ou un deadlock.

## Analyser le filesystem du conteneur

```bash
# Modifications faites dans la couche de lecture-écriture depuis le démarrage
docker diff <conteneur>
# A = ajouté, C = modifié, D = supprimé

# Historique de construction d'une image (taille de chaque couche)
docker history <image>
```

`docker diff` est utile pour vérifier qu'un job de migration n'a écrit que dans le répertoire attendu, ou pour identifier des fichiers créés de façon inattendue.

## Problèmes réseau

```bash
# Vérifier que le conteneur écoute sur le bon port
docker exec <conteneur> ss -tlnp

# Résolution DNS entre conteneurs (même réseau Docker)
docker exec <conteneur> nslookup db
docker exec <conteneur> ping db

# Réseaux auxquels le conteneur est rattaché
docker inspect <conteneur> | jq '.[0].NetworkSettings.Networks | keys'
```

Un conteneur qui ne peut pas joindre un autre par son nom indique généralement qu'ils ne sont pas sur le même réseau Docker. Le réseau `bridge` par défaut n'active pas la résolution DNS par nom — il faut un réseau défini explicitement (`docker network create`) ou Docker Compose.

## Déboguer un conteneur qui crashe au démarrage

Quand un conteneur s'arrête immédiatement, `docker exec` est inutilisable. L'approche est de remplacer l'entrypoint par un shell pour inspecter manuellement :

```bash
# Remplacer l'entrypoint pour démarrer un shell
docker run -it --entrypoint sh <image>

# Ou remplacer la commande
docker run -it <image> sh
```

Une fois dans le shell, reproduire manuellement les commandes du Dockerfile pour identifier l'étape qui échoue — variables d'environnement manquantes, fichiers absents, permissions incorrectes.
