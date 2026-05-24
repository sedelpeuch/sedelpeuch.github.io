---
title: FervantFactory
---

<img src="/img/project/fervantfactory.png" alt="Aperçu FervantFactory" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<div className="project-meta-grid">
  <div className="project-meta-item">📅 2023–2025</div>
  <div className="project-meta-item">📖 Homelab · Auto-hébergement · Docker Swarm</div>
  <div className="project-meta-item">🔧 Docker Swarm · nginx · Home Assistant · Tailscale</div>
</div>

## Le contexte

Faire tourner quelques conteneurs Docker sur une machine, c'est facile. Faire en sorte que plusieurs services cohabitent proprement, qu'un déploiement raté ne coupe pas tout, et qu'on puisse y accéder depuis l'extérieur sans ouvrir de ports sur le routeur — ça demande un minimum de structure. FervantFactory est le nom du cluster domestique sur lequel tournent les services personnels : domotique, dashboards, automatisation, monitoring. L'infrastructure est versionnée comme du code : chaque service a son propre fichier stack Docker Swarm, déployable indépendamment.

## Ce qui tourne

Le cluster héberge une dizaine de services organisés en deux groupes. Côté applications : Dashy comme portail d'accueil, Home Assistant pour la domotique, n8n pour l'automatisation de workflows, le dashboard Body Analysis, et le Dolibarr Project Dashboard. Côté infrastructure : nginx pour le reverse proxy, Uptime Kuma pour la supervision, Portainer pour la gestion des conteneurs, et Tailscale pour l'accès à distance.

## Pourquoi Swarm et pas Kubernetes

Kubernetes aurait pu faire le travail, mais il aurait aussi demandé trois fois plus de configuration pour un résultat identique sur un cluster à un ou deux nœuds. Un déploiement K8s minimal pour un service simple implique un Deployment, un Service, éventuellement un Ingress, des ConfigMaps, des Secrets — autant d'objets à maintenir pour exposer un conteneur sur un port. Avec Swarm, un fichier Compose suffit. La courbe d'apprentissage est plus courte, les fichiers sont lisibles directement, et les fonctionnalités manquantes (auto-scaling horizontal, CRDs, opérateurs) ne manquent pas pour un homelab à usage personnel. Kubernetes reste pertinent à l'échelle d'une équipe ou d'une infrastructure qui en a réellement besoin — pas pour faire tourner Home Assistant chez soi.

## Une stack par service

Le choix d'avoir un fichier par service plutôt qu'un seul `docker-compose.yml` monolithique vient d'un problème pratique : redéployer un service ne doit pas toucher aux autres. Avec Docker Swarm, chaque `docker stack deploy` est idempotent — il ne redémarre que les services dont la définition a changé. Découper par fichier rend les diffs lisibles, les déploiements ciblés, et les rollbacks isolés.

Tous les services se connectent à un réseau overlay externe appelé `proxy`. Ce réseau est créé une fois et déclaré `external: true` dans chaque stack. nginx, qui vit sur le nœud manager avec une contrainte de placement explicite, reçoit les requêtes entrantes et les route vers les services concernés via ce réseau.

## Home Assistant et le passthrough matériel

Home Assistant est le service le plus contraignant à faire tourner dans un conteneur. Il a besoin d'accéder au dongle Zigbee via `/dev/ttyUSB0`, au bus D-Bus pour le Bluetooth, et il utilise `network_mode: host` pour que la découverte mDNS et les protocoles de domotique fonctionnent sans NAT. Ce n'est pas compatible avec le mode réseau overlay standard de Swarm — le conteneur tourne directement sur l'interface réseau de la machine hôte.

Pour la persistence, Home Assistant utilise MariaDB plutôt que SQLite par défaut. SQLite ne tient pas la charge sur une instance active : avec des dizaines d'entités qui remontent leur état toutes les quelques secondes, on finit par avoir des lock timeouts. MariaDB règle ce problème avec un timeout ajusté (`wait_timeout=28800`) et un paquet max autorisé plus large.

## Forcer le rechargement de la configuration Dashy

Docker Swarm ne surveille pas les fichiers montés en volume. Si on modifie `conf.yml` — le fichier de configuration de Dashy — sans changer la définition du service, Swarm ne redémarre rien et le changement n'est pas pris en compte. La solution retenue : un script `conf-hash.sh` calcule le SHA256 du fichier et l'injecte comme variable d'environnement `CONF_HASH` dans la stack. Quand le hash change, Swarm détecte une modification de configuration et déclenche un rolling update. C'est un contournement d'une limitation de Swarm, mais il est explicite et versionné.

## Rollback automatique

Les stacks critiques ont une `update_config` avec `failure_action: rollback`. Si un conteneur mis à jour ne passe pas son healthcheck dans la fenêtre de monitoring, Swarm revient automatiquement à la version précédente. La stack Dashy va plus loin avec un délai de 360 secondes entre les étapes et un `order: start-first` : le nouveau conteneur doit être opérationnel avant que l'ancien soit arrêté, ce qui garantit une disponibilité continue pendant les mises à jour.

## Accès à distance sans ouverture de ports

Tailscale assure l'accès à distance. Aucun port n'est ouvert sur le routeur, pas de DynDNS, pas de VPN à configurer à la main. La machine fait partie du mesh Tailscale et les services sont accessibles via leur IP Tailscale depuis n'importe quel appareil dans le réseau privé. L'adresse `100.124.86.40` apparaît directement dans la configuration d'Uptime Kuma pour les métriques internes.

## Liens

- [github.com/sedelpeuch/swarm_fervantfactory](https://github.com/sedelpeuch/swarm_fervantfactory)
- [Docker Swarm — orchestration](/blog/06-orchestration/2026-02-15-docker-swarm)
