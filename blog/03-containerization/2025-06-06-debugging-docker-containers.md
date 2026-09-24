---
title: "Docker : débogage"
description: "Techniques et commandes pour diagnostiquer les problèmes dans les conteneurs Docker : logs, inspection, shell interactif, ressources, et problèmes réseau."
tags: [containerization, devops]
authors: sedelpeuch
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

Une autre approche consiste à démarrer un conteneur outillé qui rejoint les namespaces du conteneur cible. L'image `nicolaka/netshoot` embarque `curl`, `dig`, `ss`, `tcpdump` et `strace` :

```bash
# Partager les namespaces réseau et PID du conteneur cible
docker run -it --rm \
  --network container:<conteneur> \
  --pid container:<conteneur> \
  nicolaka/netshoot

# Depuis ce shell : ports en écoute du conteneur cible, processus, trafic
ss -tlnp
ps aux
tcpdump -i eth0 port 8000
```

Le système de fichiers du conteneur cible reste accessible via `/proc/<pid>/root/`, le PID étant celui visible dans le namespace partagé. Kubernetes applique le même principe avec `kubectl debug` et les conteneurs éphémères.

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

`docker inspect` révèle également le code de sortie du processus (`ExitCode`) et l'erreur éventuelle (`Error`) — utile pour diagnostiquer les conteneurs qui s'arrêtent immédiatement après le démarrage. L'option `--format` (template Go) extrait un champ sans `jq` :

```bash
docker inspect -f '{{.State.ExitCode}} {{.State.OOMKilled}}' <conteneur>
```

Au-delà de 128, le code de sortie encode le signal reçu (128 + numéro du signal) :

| Code | Signification courante |
|------|------------------------|
| `0` | fin normale du processus |
| `1` | erreur applicative générique |
| `126` | commande trouvée mais non exécutable (permissions, format binaire) |
| `127` | commande introuvable (`CMD` ou `ENTRYPOINT` erroné, binaire absent de l'image) |
| `137` | `SIGKILL` (9) : dépassement de la limite mémoire, `docker kill`, ou fin du délai de `docker stop` |
| `139` | `SIGSEGV` (11) : erreur de segmentation, souvent une incompatibilité de bibliothèque native |
| `143` | `SIGTERM` (15) : arrêt demandé, traité par l'application sans code de sortie propre |

## Monitorer les ressources

```bash
# Utilisation CPU, mémoire, réseau, disque en temps réel (tous les conteneurs)
docker stats

# Conteneurs spécifiques
docker stats api db

# Une seule capture (pas de rafraîchissement)
docker stats --no-stream
```

Un conteneur qui atteint sa limite mémoire est tué par le kernel — `OOMKilled: true` apparaît dans `docker inspect`. Un conteneur à 100% CPU en permanence indique souvent une boucle infinie ou une attente active ; à l'inverse, un interblocage (*deadlock*) se manifeste plutôt par une consommation CPU nulle et des requêtes qui n'aboutissent jamais.

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

Les images minimales ne contiennent souvent ni `ss`, ni `nslookup`, ni `ping` : le conteneur `netshoot` décrit plus haut fournit ces outils sans modifier l'image. Un conteneur qui ne peut pas joindre un autre par son nom indique généralement qu'ils ne sont pas sur le même réseau Docker. Le réseau `bridge` par défaut n'active pas la résolution DNS par nom — il faut un réseau défini explicitement (`docker network create`) ou Docker Compose.

## Déboguer un conteneur qui crashe au démarrage

Quand un conteneur s'arrête immédiatement, `docker exec` est inutilisable. L'approche est de remplacer l'entrypoint par un shell pour inspecter manuellement :

```bash
# Remplacer l'entrypoint pour démarrer un shell
docker run -it --entrypoint sh <image>

# Ou remplacer la commande (CMD)
docker run -it <image> sh
```

La seconde forme ne fonctionne que si l'image ne définit pas d'`ENTRYPOINT` : dans le cas contraire, `sh` est passé comme argument à l'entrypoint au lieu d'être exécuté.

Une fois dans le shell, reproduire manuellement les commandes du Dockerfile pour identifier l'étape qui échoue — variables d'environnement manquantes, fichiers absents, permissions incorrectes.
