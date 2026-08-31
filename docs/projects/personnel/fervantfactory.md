---
title: FervantFactory
tags: [homelab, docker, docker-compose, gitops, github-actions, traefik, authelia, self-hosting]
description: Homelab auto-hébergé versionné en GitOps (Docker Compose, reverse proxy et SSO, CI/CD GitHub Actions, secrets chiffrés en repo, sauvegardes chiffrées et documentation générée depuis le code).
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src="/img/project/fervantfactory.png" alt="Aperçu FervantFactory" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<div className="project-meta-grid">
  <div className="project-meta-item">📅 2023 – présent</div>
  <div className="project-meta-item">📖 Homelab · Auto-hébergement · GitOps</div>
  <div className="project-meta-item">🔧 Docker Compose · Traefik · Authelia · GitHub Actions · git-crypt</div>
</div>

## Le contexte

FervantFactory est le nom du cluster domestique qui héberge mes services personnels : domotique, photos, mots de passe, recettes, médias, monitoring. Ce qui a commencé comme quelques conteneurs sur une machine est devenu, avec le temps, une infrastructure qui héberge des données que je ne peux pas me permettre de perdre, dont un coffre-fort de mots de passe, une bibliothèque de photos et une base domotique. La question a changé de nature : il ne s'agit plus de faire tourner des conteneurs, mais de le faire avec le même niveau de rigueur qu'on attendrait d'une infra professionnelle, versionnée, reproductible, avec des secrets qui ne traînent jamais en clair et des sauvegardes qui survivent à la perte de la machine.

L'ensemble du dépôt est structuré en GitOps : un dossier par service, chacun avec son `compose.yml` et sa documentation, déployé automatiquement sur push. Rien ne se configure à la main sur le serveur, tout part du repo.

## Les services hébergés

Une dizaine de services organisés en quatre familles :

<Tabs>
  <TabItem value="infra" label="Plateforme">
    Le socle ne rend aucun service à l'utilisateur final : il fait fonctionner tout le reste.

    - **Traefik** encaisse tout le trafic HTTPS entrant et le route vers le bon service.
    - **Authelia** s'intercale devant les services web pour l'authentification unique.
    - **Portainer** donne une vue d'ensemble des conteneurs sans passer par le CLI.
    - **Gatus** surveille que chaque service répond, et alerte sinon.
    - **Backup** chiffre et exporte les volumes critiques chaque nuit.
    - **Docs** compile la documentation du repo en un site consultable.
  </TabItem>
  <TabItem value="monitoring" label="Monitoring">
    De quoi repérer une dérive avant qu'elle ne devienne un incident.

    - **Prometheus** scrape les métriques exposées par les services (charge, mémoire, espace disque).
    - **Grafana** met ces métriques en forme dans des dashboards.
  </TabItem>
  <TabItem value="media" label="Médias & fichiers">
    - **Jellyfin** diffuse films et séries.
    - **Immich** reprend le rôle de Google Photos pour les photos et vidéos personnelles.
    - **Calibre-Web** sert de bibliothèque d'ebooks.
    - **MPD** joue la musique stockée localement.
    - **Samba** expose la médiathèque en partage réseau pour les appareils qui ne parlent pas HTTP.
  </TabItem>
  <TabItem value="perso" label="Domotique & productivité">
    - **Home Assistant** pilote la domotique de la maison.
    - **Frigate** épaule Home Assistant pour la détection d'objets sur les flux caméra.
    - **Mealie** centralise les recettes et les listes de courses.
    - **Vaultwarden** sert de coffre-fort de mots de passe.
    - **Dashy** fait office de page d'accueil qui centralise l'accès à tout le reste.
  </TabItem>
</Tabs>

## De Swarm à Compose standalone

Le cluster tournait à l'origine sur Docker Swarm, orchestré via Portainer. J'ai migré vers du Compose standalone pur, déployé par CI/CD plutôt que par un agent tiers. La décision tient à un constat simple : Swarm apporte des fonctionnalités multi-hôte (réseau overlay cross-host, répartition `deploy.mode: global`, contraintes de placement) qui n'ont jamais été exploitées sur un homelab **mono-node**. Payer la complexité d'un orchestrateur distribué pour un seul nœud n'avait pas de justification technique.

Ce qui ne change pas dans la bascule : le redéploiement automatique sur push (Portainer le faisait déjà en GitOps pour du Swarm comme pour du Compose), les healthchecks, les labels Traefik, la logique des réseaux externes partagés. Ce qui disparaît réellement : `docker secret` (les secrets passent en variables d'environnement, compensé par le chiffrement du repo, voir plus bas) et le rollback automatique intégré (`update_config` / `rollback_config`), un compromis jugé acceptable en usage solo, où un rollback manuel via `git revert` reste rapide.

La migration a aussi été l'occasion de rattraper de la dette assumée depuis longtemps : pin des versions d'images (tout tournait en `:latest` sauf une exception), sortie des identifiants codés en dur vers des variables d'environnement, et remplacement des IP fixes par des noms de service résolus par le réseau Docker.

## GitOps sans agent tiers

Le déploiement ne passe plus par un agent Portainer qui poll le repo : un push sur `master` déclenche un workflow GitHub Actions qui calcule les dossiers modifiés depuis le commit précédent, se connecte à la machine via un nœud éphémère du réseau **Tailscale**, puis relance `docker compose up -d --build` (ou `down` si un dossier a été supprimé) pour chaque stack concerné, un seul ou tous selon l'ampleur du changement.

Le point technique le moins évident : certains stacks référencent le volume Docker d'un autre stack en `external: true` (le partage réseau référence la médiathèque de Jellyfin, le stack de sauvegarde référence les volumes de presque tout le monde). Ces volumes doivent exister avant que le stack qui les référence ne démarre. Le workflow encode donc un ordre de déploiement explicite : certains stacks toujours en premier, la sauvegarde toujours en dernier, plutôt que de déployer dans un ordre arbitraire et laisser échouer un `docker compose up` sur un volume introuvable.

## SSO centralisé, avec des exceptions assumées

Traefik route tout le trafic HTTPS entrant vers le réseau interne partagé par les services, et Authelia s'intercale devant en tant que middleware `forwardAuth` : un service protégé redirige vers Authelia si la session n'est pas authentifiée, sans que le service lui-même n'ait besoin de gérer l'authentification.

Ce modèle a une limite connue : certaines applications mobiles (clients Bitwarden, Immich) ne savent pas suivre une redirection SSO, elles s'attendent à parler directement à l'API du service. Plutôt que de casser ces clients, la règle d'accès Authelia laisse passer explicitement les routes d'API concernées en bypass, pendant que le reste de l'interface web reste protégé. Le compromis est documenté service par service : chaque bypass est justifié par l'authentification applicative propre au service (chiffrement de bout en bout côté Vaultwarden, authentification par token côté Immich), jamais par un service laissé nu par défaut.

Pour les services qui savent parler OIDC nativement (Jellyfin, Mealie, Portainer), le choix a été de configurer un client OIDC directement sur le service plutôt que d'ajouter le middleware forward-auth par-dessus : les deux mécanismes d'authentification ne se combinent pas proprement, et le SSO reste centralisé côté fournisseur d'identité même sans passer par Traefik.

## Secrets versionnés, jamais en clair

Tout le repo est versionné dans Git, secrets compris, mais aucun secret n'y est jamais lisible. Chaque fichier `.env` est chiffré avec **git-crypt** (clé symétrique) : dans le repo distant, c'est du binaire opaque ; sur la machine de déploiement comme sur mon poste, une clé débloque le déchiffrement transparent à chaque `git pull`/`git diff`. La CI utilise la même clé, stockée en secret GitHub Actions.

Le choix de git-crypt plutôt qu'un vault dédié (Vault, SOPS+KMS) est délibéré : la surface d'attaque et la complexité opérationnelle d'un vault ne se justifient pas pour un homelab mono-utilisateur, alors que git-crypt donne exactement la propriété recherchée, un secret jamais en clair dans l'historique Git, pour une seule clé à protéger et sans service supplémentaire à maintenir.

## Sauvegardes et règle 3-2-1

Les volumes jugés critiques (config SSO, coffre-fort de mots de passe, bases applicatives, bibliothèques de données irremplaçables) sont sauvegardés quotidiennement : montage en lecture seule, archive compressée, chiffrement **GPG côté client** avant tout envoi réseau, puis upload vers un bucket S3-compatible hébergé chez un fournisseur tiers (avec son propre chiffrement au repos, en plus du GPG).

:::warning Conformité partielle à la règle 3-2-1
La règle 3-2-1 (3 copies, sur 2 supports différents, dont 1 hors site) n'est aujourd'hui respectée qu'à moitié : il existe bien une copie hors site chiffrée (le bucket S3), mais pas de deuxième copie locale sur un support distinct de la machine de production. Si le disque du homelab meurt, la seule copie de secours est celle hors site. C'est un point d'amélioration identifié, pas un oubli : ajouter une copie locale sur un support séparé (NAS, disque externe) est prévu, sans date fixée.
:::

Les volumes régénérables (cache de métriques, certificats TLS, bibliothèque média volumineuse) sont volontairement exclus du périmètre de sauvegarde : les sauvegarder coûterait du stockage et du temps pour une donnée qui peut être reconstituée ou qui tolère la perte. La distinction entre ce qui mérite une sauvegarde et ce qui ne la mérite pas est documentée service par service plutôt que décidée au cas par cas.

## Documentation générée depuis le code

Chaque service a son propre fichier de documentation dans le repo : rôle, architecture, domaine d'accès, variables d'environnement, risques connus. Plutôt que de laisser cette documentation dispersée dans des fichiers Markdown que personne ne consulte, elle est compilée en un site de documentation navigable, généré au build à partir de ces mêmes fichiers : aucune duplication, aucun contenu à maintenir à deux endroits. Le site n'a lui-même aucune donnée persistante, il est entièrement régénéré à chaque déploiement, à partir du repo qui fait foi.

## Résultats

- **Zéro déploiement manuel** : chaque changement de configuration passe par un commit et un push, jamais par une commande tapée à la main sur le serveur.
- **Zéro secret en clair versionné** : ni dans l'historique Git, ni sur le disque du repo distant.
- **Migration Swarm vers Compose sans interruption de service perçue** : bascule progressive stack par stack, deux nœuds en parallèle le temps de la transition.
- **Documentation à jour par construction** : le site de doc ne peut pas diverger du repo puisqu'il est généré à partir de lui à chaque déploiement.
- **Dette technique documentée plutôt que cachée** : les compromis (rollback manuel, sauvegarde 3-2-1 incomplète, quelques volumes encore non couverts) sont écrits noir sur blanc dans le repo, pas laissés implicites.

Rien de tout ça n'est exposé publiquement : l'ensemble n'est accessible que via mon réseau privé Tailscale, sans port ouvert sur le routeur domestique.
