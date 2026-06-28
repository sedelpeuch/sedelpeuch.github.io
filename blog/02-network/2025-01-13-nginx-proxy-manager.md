---
title: "Nginx Proxy Manager"
description: "Nginx Proxy Manager : interface graphique pour Nginx, gestion des proxy hosts, certificats Let's Encrypt, access lists, streams TCP et configuration avancée."
tags: [network, devops]
---

Configurer Nginx manuellement demande de maîtriser sa syntaxe et de gérer les certificats SSL à la main. Nginx Proxy Manager expose une interface web qui automatise ces deux aspects : création de règles de routage via une UI, et renouvellement automatique des certificats Let's Encrypt. Il génère du vrai Nginx sous le capot — les configurations avancées restent accessibles via des blocs personnalisés.

<!--truncate-->

## Déploiement avec Docker Compose

```yaml
services:
  nginx-proxy-manager:
    image: jc21/nginx-proxy-manager:latest
    container_name: nginx-proxy-manager
    restart: unless-stopped
    ports:
      - "80:80"     # trafic HTTP
      - "443:443"   # trafic HTTPS
      - "81:81"     # interface d'administration
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
```

```bash
docker compose up -d
```

L'interface d'administration est accessible sur le port 81. Identifiants par défaut : `admin@example.com` / `changeme` — à modifier immédiatement après la première connexion. Les données de configuration et les certificats sont persistés dans `./data` et `./letsencrypt`.

## Proxy Hosts

Un **Proxy Host** associe un nom de domaine entrant à un backend. Dans l'interface : **Hosts → Proxy Hosts → Add Proxy Host**.

| Champ | Valeur |
|-------|--------|
| Domain Names | `app.example.com` |
| Scheme | `http` ou `https` |
| Forward Hostname / IP | nom de service Docker ou IP |
| Forward Port | port de l'application |
| Cache Assets | active le cache des assets statiques |
| Block Common Exploits | active les règles de protection basiques |
| Websockets Support | active `proxy_set_header Upgrade` |

Pour HTTPS via Let's Encrypt, onglet **SSL** → **Request a new SSL Certificate** → activer **Force SSL**. Le domaine doit être résolvable publiquement et pointer vers l'IP de la machine pour que le challenge ACME HTTP-01 fonctionne.

## Accès aux services Docker

Nginx Proxy Manager ne peut atteindre que les backends qui lui sont réseau-accessibles. Trois cas :

**Service dans le même réseau Docker Compose** : utiliser le nom de service directement comme Forward Hostname.

**Service dans un autre Compose ou réseau Docker distinct** : créer un réseau partagé et y rattacher les deux services.

```yaml
services:
  nginx-proxy-manager:
    image: jc21/nginx-proxy-manager:latest
    networks:
      - proxy
      - default

  app:
    image: myapp:latest
    networks:
      - proxy
    # NE PAS exposer le port sur l'hôte — NPM y accède directement via le réseau Docker

networks:
  proxy:
    external: true
```

```bash
docker network create proxy
```

**Service sur un autre hôte** : utiliser l'IP de la machine. Si le port n'est pas exposé publiquement, Nginx Proxy Manager doit être sur le même réseau L2 ou routé vers cet hôte.

## Access Lists

Les Access Lists permettent de restreindre l'accès à un Proxy Host par IP ou par authentification HTTP Basic.

Dans l'interface : **Access Lists → Add Access List**

Deux types de règles :
- **IP restrictions** : autoriser ou bloquer des plages d'IP (`192.168.0.0/24`, `10.0.0.1`)
- **Basic Auth** : username/password pour protéger une URL (utile pour les services sans authentification native comme des dashboards)

Une Access List peut combiner les deux — par exemple, autoriser les IPs du réseau interne sans mot de passe et exiger une authentification pour les autres.

Pour l'attacher à un Proxy Host : onglet **Details** → champ **Access List**.

## Redirection Hosts

Pour rediriger un domaine vers un autre (permanent ou temporaire) : **Hosts → Redirection Hosts → Add Redirection Host**.

```
www.example.com → https://example.com   (301 permanent)
old.example.com → https://new.example.com/path  (302 temporaire)
```

| Champ | Valeur |
|-------|--------|
| Domain Names | domaine source |
| Scheme | `https` |
| Forward Domain Name / IP | domaine ou IP de destination |
| HTTP Code | `301` (SEO) ou `302` (temporaire) |

## Stream Hosts (proxy TCP/UDP)

Les **Stream Hosts** exposent des services TCP ou UDP non-HTTP — utile pour MySQL, PostgreSQL, Redis, MQTT, serveurs de jeu.

**Hosts → Streams → Add Stream**

| Champ | Valeur |
|-------|--------|
| Incoming Port | port public sur lequel NPM écoute |
| Forward Host | IP ou hostname du backend |
| Forward Port | port du service |
| TCP / UDP | protocole |

Exemple : exposer PostgreSQL sur le port 5432 de la machine hôte tout en gardant le conteneur sur un réseau interne.

## Configuration avancée

L'onglet **Advanced** de chaque Proxy Host permet d'injecter des directives Nginx brutes. Nginx Proxy Manager les insère dans le bloc `location /` généré.

```nginx
# Exemple : cache des assets statiques
location ~* \.(js|css|png|jpg|jpeg|gif|ico|woff2|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    access_log off;
}

# Augmenter la taille maximale du body (upload de fichiers)
client_max_body_size 100M;

# Headers de sécurité supplémentaires
add_header X-Frame-Options "SAMEORIGIN";
add_header Content-Security-Policy "default-src 'self'";
```

La configuration générée par NPM est stockée dans `./data/nginx/` — lisible mais à ne pas modifier directement, elle est régénérée à chaque modification via l'UI.

## Logs et troubleshooting

```bash
# Logs de l'application NPM (erreurs de configuration, erreurs ACME)
docker logs nginx-proxy-manager

# Logs Nginx (accès, erreurs par proxy host)
docker exec nginx-proxy-manager cat /data/logs/proxy-host-1_access.log
docker exec nginx-proxy-manager cat /data/logs/proxy-host-1_error.log
```

Les logs Nginx de chaque Proxy Host sont dans `/data/logs/proxy-host-<id>_*.log`. Le numéro d'ID correspond à l'ID visible dans l'URL de l'interface (`/nginx/proxy-hosts/1`).

Problèmes courants :

- **502 Bad Gateway** : le backend n'est pas joignable — vérifier le réseau Docker, le nom de service, le port
- **Certificate request failed** : le domaine ne pointe pas vers l'IP publique de la machine, ou le port 80 est bloqué par un firewall
- **ERR_TOO_MANY_REDIRECTS** : l'application backend redirige vers HTTPS alors que NPM communique déjà en HTTPS avec elle — passer le scheme à `https` dans le Proxy Host, ou désactiver les redirections côté backend

## Limites

Nginx Proxy Manager simplifie les cas courants mais n'expose pas toutes les directives Nginx. Les fonctionnalités non disponibles via l'UI :

- Upstream avec plusieurs backends et load balancing (NPM n'a qu'un seul Forward Host par Proxy Host)
- `proxy_cache` configuré finement
- Contexte `stream` paramétrable (les Stream Hosts sont plus basiques que le module stream Nginx brut)
- Configurations multi-tenant complexes

Pour ces cas, utiliser Nginx directement, ou Traefik qui offre une découverte dynamique des services.
