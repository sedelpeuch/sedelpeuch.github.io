---
title: "Docker : sécuriser Docker-in-Docker en CI"
description: "Isoler un démon Docker-in-Docker utilisé par un runner de CI : API TCP sans authentification joignable par les conteneurs qu'il lance, TLS avec certificat client et SAN du certificat, workspace partagé qui expose les secrets du job, ménage entre deux jobs, et ce que l'isolation ne couvre pas."
tags: [security, containerization, cicd, devops]
---

Un runner de CI auto-hébergé qui doit démarrer des conteneurs (valider une stack Docker Compose, lancer des tests d'intégration, construire une image) a besoin d'un démon Docker. Lui donner le socket de l'hôte revient à lui donner la main sur tous les conteneurs de la machine, production comprise. Un démon dédié, lancé dans un conteneur `docker:dind` (*Docker-in-Docker*), cantonne les jobs à leurs propres conteneurs, volumes et réseaux. Cette isolation n'est toutefois réelle que si le démon dédié n'est pas lui-même laissé ouvert aux conteneurs qu'il exécute, et si le répertoire de travail partagé avec lui ne contient aucun secret.

<!--truncate-->

## Le montage de base

Le runner et le démon tournent dans deux conteneurs distincts. Le runner reçoit l'adresse du démon par la variable `DOCKER_HOST`, que lisent le client `docker` et `docker compose` :

```text
 runner (client docker)  ── DOCKER_HOST=tcp://dind:2376 ──▶  dind (dockerd, privileged)
        │                                                       │
        └──────────── volume partagé /runner/work ──────────────┘
                                                                 └── conteneurs des jobs
```

Le conteneur `dind` doit être `privileged` : un démon Docker crée des namespaces, des cgroups et des règles réseau, ce qu'un conteneur ordinaire n'a pas le droit de faire. Un démon privilégié ne constitue donc pas une frontière de sécurité vis-à-vis de l'hôte. Qui pilote ce démon peut démarrer un conteneur privilégié à l'intérieur, monter les disques de la machine ou charger un module noyau. Contrôler l'API de `dind` revient, à quelques étapes près, à contrôler l'hôte.

Le répertoire de travail du runner est monté au même chemin dans les deux conteneurs. Quand un job lance `docker compose up` sur une stack qui monte `./config.yml`, le client résout le chemin relatif en chemin absolu, mais c'est le démon qui ouvre le fichier, dans son propre système de fichiers. Sans ce montage identique, le démon cherche un fichier qui n'existe pas chez lui et crée à sa place un répertoire vide.

## Une API ouverte à ses propres conteneurs

L'image `docker:dind` choisit son mode d'écoute selon la variable `DOCKER_TLS_CERTDIR`. Renseignée (c'est la valeur par défaut, `/certs`), elle génère une autorité de certification, un certificat serveur et un certificat client, puis écoute sur le port **2376** avec `--tlsverify`. Vidée, elle écoute sur le port **2375** en TCP clair, sans aucune authentification. Ce second mode demande moins de configuration : `DOCKER_HOST=tcp://dind:2375` côté runner, sans certificat à distribuer.

Le démon écoute alors sur toutes les interfaces de son conteneur, y compris le pont réseau sur lequel il branche les conteneurs qu'il lance. Pour eux, `dind` est la passerelle par défaut : un simple appel HTTP vers cette adresse sur le port 2375 donne accès à l'API complète.

```bash
# Depuis n'importe quel conteneur lancé dans dind, avec TLS désactivé
curl -s http://$(ip route | awk '/default/ {print $3}'):2375/containers/json
```

Une image compromise dans une stack en cours de validation peut ainsi lister les autres conteneurs, lire leurs variables d'environnement, ou lancer un conteneur privilégié et, par lui, atteindre l'hôte et la production.

## TLS avec certificat client

Le mode par défaut de l'image règle le problème, à condition de distribuer les certificats correctement. Au démarrage, `dind` écrit le certificat client dans `$DOCKER_TLS_CERTDIR/client`. Ce répertoire est monté dans un volume partagé avec le runner seul, en lecture seule de son côté ; le runner pointe dessus avec `DOCKER_TLS_VERIFY=1` et `DOCKER_CERT_PATH`. Les conteneurs lancés dans `dind` joignent toujours le port 2376 par le réseau, mais le démon refuse toute connexion qui ne présente pas un certificat signé par son autorité.

Un piège apparaît au premier essai : le certificat serveur généré par l'image porte comme noms alternatifs (SAN) les adresses IP du conteneur, son nom d'hôte, `localhost` et `docker`. Si le service s'appelle `dind` dans le fichier Compose, le client se connecte à `dind`, nom absent du certificat, et la vérification TLS échoue. Deux solutions : nommer le service `docker`, ou ajouter le nom voulu par la variable prévue à cet effet.

```yaml
environment:
  - DOCKER_TLS_SAN=DNS:dind
```

Les certificats publics sont régénérés à chaque démarrage du démon, ce qui tient compte d'un changement d'adresse ou de nom. Le volume partagé reçoit donc un certificat client à jour à chaque redémarrage de `dind`, sans action côté runner.

Une alternative existe quand le runner et le démon tournent dans le même pod ou partagent un volume : exposer le **socket Unix** du démon dans un volume monté par le runner seul, sans écouter en TCP. C'est le montage que retient [ARC](../04-ci-cd/2024-12-20-github-arc.md) dans son mode `dind`. Le socket n'est alors joignable que par les conteneurs qui montent ce volume.

## Le workspace partagé expose les secrets du job

Le montage du répertoire de travail au même chemin a une autre conséquence : tout fichier écrit dans ce répertoire est lisible par le démon, donc par n'importe quel conteneur auquel une stack validée monte un sous-répertoire du workspace, et par tout conteneur qui contrôle le démon.

Or le répertoire temporaire d'un job, `$RUNNER_TEMP`, se trouve sur un runner auto-hébergé sous le répertoire de travail (`<workdir>/_temp`). Un job de déploiement qui y écrit une clé SSH pour joindre la production la dépose donc dans un espace que les conteneurs de validation peuvent atteindre. La clé doit être écrite hors du volume partagé, dans un répertoire temporaire propre au conteneur du runner, et supprimée à la sortie du job :

```bash
KEYDIR=$(mktemp -d)            # /tmp du conteneur runner, hors du volume partagé
trap 'rm -rf "$KEYDIR"' EXIT
```

Le `trap` reste nécessaire même sur un runner éphémère : quand le conteneur du runner redémarre après chaque job plutôt que d'être recréé, son système de fichiers persiste d'un job à l'autre.

## Le ménage entre deux jobs

Un démon `dind` persistant garde son état d'un job à l'autre : images, volumes, réseaux, mais aussi conteneurs. Un job annulé, ou dont le `docker compose down` a échoué, laisse ses conteneurs tourner jusqu'au job suivant, avec leurs variables d'environnement et leurs montages. Une étape de nettoyage exécutée `if: always()` les retire.

Supprimer tous les conteneurs du démon est trop large si plusieurs runners partagent le même `dind` : le nettoyage de l'un interromprait le job en cours de l'autre. Docker Compose pose sur chaque conteneur le label `com.docker.compose.project.working_dir`, qui donne le répertoire du projet. Filtrer sur ce label et sur le préfixe du workspace du runner ne retire que les conteneurs de ses propres jobs. Les volumes et réseaux orphelins se purgent ensuite par `docker volume prune -af` et `docker network prune -f`, et les images anciennes par `docker image prune -af --filter until=168h`.

Une limite mémoire sur le conteneur `dind` complète le dispositif. Elle ne protège pas d'une attaque, mais une stack trop gourmande échoue sa validation au lieu de priver la production de mémoire.

## Ce que l'isolation ne couvre pas

- **Les stacks qui montent le socket Docker** : un reverse proxy, un outil de sauvegarde ou un collecteur de logs monte `/var/run/docker.sock` pour fonctionner. Validé dans `dind`, il reçoit le socket de `dind`, donc le contrôle complet du démon. Le certificat client ne protège que l'accès réseau.
- **Le démon reste privilégié** : une image piégée qui obtient l'API dispose, le temps de la validation, des mêmes possibilités qu'en production après la fusion de la pull request. L'isolation protège la production des accidents de validation, pas d'une image malveillante.
- **Les secrets réels** : une validation qui démarre les stacks avec leur vrai fichier `.env` expose ces secrets aux images validées, comme en production.
- **Le jeton d'enregistrement du runner** : retiré de l'environnement avant chaque job, il reste lisible par un job root dans `/proc/1/environ` du conteneur du runner.
- **Un démon partagé entre plusieurs dépôts** : les jobs d'un dépôt voient les conteneurs des autres. Les dépôts qui partagent un `dind` partagent un même périmètre de confiance.

Ces limites restent acceptables tant que seules des personnes de confiance et un bot de mise à jour des dépendances poussent sur les dépôts concernés. Un dépôt public, ou ouvert aux pull requests de forks, demande des runners jetables sur des machines dédiées.

## Conclusion

Docker-in-Docker sépare les conteneurs de la CI de ceux de la production, mais le démon dédié reste privilégié : contrôler son API revient presque à contrôler l'hôte. L'API doit donc exiger un certificat client que seul le runner possède, et le certificat serveur doit porter le nom sous lequel le runner joint le démon. Le répertoire de travail, partagé par construction avec le démon, ne doit contenir aucun secret, ce qui exclut `$RUNNER_TEMP`. Un nettoyage systématique des conteneurs restés en place évite qu'un job hérite de l'état du précédent. Le périmètre de confiance reste celui des personnes qui poussent sur les dépôts.

## Ressources utiles

- [Image `docker` sur Docker Hub (variante `dind`, TLS)](https://hub.docker.com/_/docker)
- [Script de démarrage de l'image `dind`](https://github.com/docker-library/docker/blob/master/29/dind/dockerd-entrypoint.sh)
- [Protéger le socket du démon Docker](https://docs.docker.com/engine/security/protect-access/)
- [Variables d'environnement des runners GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/variables)

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/personnel/homelab" title="HomeLab">Runner auto-hébergé dont les validations passent par un démon Docker-in-Docker : API passée en TLS avec certificat client réservé aux runners, clé de déploiement écrite hors du workspace partagé, conteneurs de validation orphelins retirés à chaque fin de job.</ProjectLink>
</ProjectLinks>
