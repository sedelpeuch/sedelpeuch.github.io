---
title: "Proxy et reverse proxy"
description: "Différences architecturales entre proxy direct et reverse proxy : position dans le flux réseau, couche L4/L7, SSL passthrough vs terminaison, load balancing, et cas d'usage."
tags: [network, devops]
---

Un proxy et un reverse proxy remplissent tous les deux un rôle d'intermédiaire réseau, mais ils se positionnent de chaque côté de la connexion — l'un représente le client, l'autre protège le serveur. Confondre les deux mène à des architectures mal configurées et à des règles de sécurité inefficaces.

<!--truncate-->

## Le proxy direct (forward proxy)

Un proxy direct est un intermédiaire que le **client configure explicitement**. La requête passe par le proxy, qui la transmet au serveur de destination en utilisant sa propre adresse IP. Le serveur de destination voit l'IP du proxy, pas celle du client.

```text
Client (configuré pour passer par le proxy)
  → Proxy direct
    → Serveur de destination (ne voit que l'IP du proxy)
```

Le proxy direct est transparent pour le serveur mais visible du client — le client doit savoir qu'il existe et s'y connecter explicitement (via les paramètres réseau du navigateur, les variables `HTTP_PROXY`/`HTTPS_PROXY`, ou la configuration système).

Cas d'usage typiques :

**Anonymisation** : masquer l'IP réelle du client vis-à-vis de serveurs externes. Le serveur ne peut pas distinguer quel client a fait la requête.

**Filtrage sortant en entreprise** : un proxy Squid centralise le trafic HTTP/HTTPS de tous les postes. L'administrateur peut bloquer des domaines, inspecter les requêtes (avec un proxy intercepteur SSL), journaliser les accès.

**Cache partagé** : si 100 postes téléchargent la même mise à jour, le proxy la télécharge une fois et la sert depuis son cache — réduit la consommation de bande passante.

```bash
# Variables proxy standard (reconnues par la plupart des clients HTTP)
export HTTP_PROXY=http://proxy.corp.example.com:3128
export HTTPS_PROXY=http://proxy.corp.example.com:3128
export NO_PROXY=localhost,127.0.0.1,10.0.0.0/8
```

## Le reverse proxy

Un reverse proxy est un intermédiaire configuré côté **serveur**. Les clients ne connaissent que l'adresse du reverse proxy — ils ignorent l'existence des backends derrière. Du point de vue du client, il parle directement au serveur de l'application.

```text
Client (ne sait pas ce qu'il y a derrière)
  → Reverse proxy (adresse publique)
    → Backend 1  ┐
    → Backend 2  ┤ réseau interne
    → Backend 3  ┘
```

Le reverse proxy est transparent pour le client (pas de configuration à faire) mais visible du backend (qui reçoit les requêtes depuis l'IP du proxy).

Cas d'usage typiques :

**Load balancing** : distribuer le trafic entre plusieurs instances d'une application. Si un backend tombe, le reverse proxy cesse de lui envoyer des requêtes.

**Terminaison TLS** : centraliser la gestion des certificats SSL sur le reverse proxy. Les backends communiquent en HTTP clair sur le réseau interne — plus simple à gérer, et les backends n'ont pas besoin de connaître les certificats.

**Masquage de l'infrastructure** : les clients ne connaissent pas les IPs ni les ports des backends. Toute la surface exposée publiquement se réduit au reverse proxy.

**Cache des réponses statiques** : servir des pages déjà calculées sans solliciter le backend applicatif.

## Comparaison côte à côte

| Critère | Proxy direct | Reverse proxy |
|---------|-------------|---------------|
| Configuré par | Le client | L'administrateur serveur |
| Transparent pour | Le serveur | Le client |
| Représente | Le client | Le serveur |
| Protège | Le client (anonymisation) | Le serveur (masquage, filtrage) |
| Cache | Requêtes sortantes | Réponses des backends |
| Exemples | Squid, Burp Suite, mitmproxy | Nginx, Traefik, HAProxy, AWS ALB |

## Couche réseau : L4 vs L7

Un proxy peut opérer à deux niveaux du modèle OSI, avec des comportements très différents.

**Proxy L7 (couche applicative)** : lit et modifie le contenu HTTP. Peut router selon les headers, l'URL, le body. Peut réécrire les requêtes, injecter des headers, mettre en cache les réponses. Doit terminer la connexion TLS pour lire le contenu HTTPS.

```nginx
# Proxy L7 : Nginx lit la requête HTTP et route selon l'URL
location /api/ {
    proxy_pass http://api_backend;
}
location /static/ {
    proxy_pass http://static_backend;
}
```

**Proxy L4 (couche transport)** : opère sur les connexions TCP/UDP sans lire le contenu applicatif. Plus performant (pas de décodage HTTP), mais les décisions de routage se limitent aux informations visibles avant le chiffrement : IP, port et, pour TLS, le nom de domaine demandé dans l'extension SNI du `ClientHello`, transmis en clair. Peut transmettre du TLS sans le terminer (SSL passthrough).

```nginx
# Module stream de Nginx : proxy TCP pur
stream {
    upstream postgres_cluster {
        server 10.0.0.1:5432;
        server 10.0.0.2:5432;
    }

    server {
        listen 5432;
        proxy_pass postgres_cluster;
    }
}
```

## SSL passthrough vs terminaison TLS

La terminaison TLS et le SSL passthrough sont deux approches distinctes :

**Terminaison TLS** (L7) : le reverse proxy décrypte le trafic TLS, lit la requête HTTP, puis se reconnecte au backend en HTTP clair (ou en TLS séparé). Le proxy doit posséder le certificat et la clé privée. Il peut inspecter et modifier les requêtes.

```text
Client → [TLS] → Nginx (terminaison) → [HTTP] → Backend
```

**SSL passthrough** (L4) : le reverse proxy transmet les paquets TLS chiffrés au backend sans les déchiffrer. Le backend possède le certificat et gère lui-même la terminaison TLS. Le proxy ne peut pas lire ni modifier le contenu.

```text
Client → [TLS] → HAProxy (passthrough) → [TLS] → Backend (terminaison)
```

```text
# HAProxy SSL passthrough avec routage sur le SNI
frontend https_in
    bind *:443
    mode tcp
    tcp-request inspect-delay 5s
    tcp-request content accept if { req_ssl_hello_type 1 }   # attendre le ClientHello
    use_backend app1_tls if { req_ssl_sni -i app1.example.com }
    default_backend https_backend

backend app1_tls
    mode tcp
    server app1 10.0.0.1:443

backend https_backend
    mode tcp
    server app2 10.0.0.2:443
```

Le même mécanisme existe dans Nginx (module `stream` avec `ssl_preread on;` et la variable `$ssl_preread_server_name`) et dans Traefik (routeurs TCP avec la règle `HostSNI` et l'option `passthrough`). Le proxy lit uniquement le premier message du handshake, sans jamais déchiffrer le trafic.

Le SSL passthrough est utile pour les protocoles qui nécessitent un certificat de bout en bout (mTLS vérifié par l'application elle-même, qui doit recevoir le certificat client), ou quand les politiques de sécurité interdisent au proxy d'accéder à la clé privée.

## En-têtes de transfert

Quand un reverse proxy transmet une requête, le backend voit l'IP du proxy, pas celle du client. Les en-têtes HTTP propagent l'information originale :

```nginx
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Forwarded-Host  $host;
```

`X-Forwarded-For` accumule les adresses si la requête traverse plusieurs proxies : chaque proxy ajoute en fin de liste l'adresse de son interlocuteur direct (`$proxy_add_x_forwarded_for` dans Nginx). Pour un trajet client → proxy1 → proxy2 → backend, le backend reçoit `X-Forwarded-For: IP_client, IP_proxy1` et voit `IP_proxy2` comme adresse source de la connexion. L'application backend doit lire ces headers pour obtenir l'IP réelle — important pour les logs, la géolocalisation, et les règles de rate limiting.

Un client peut envoyer lui-même un `X-Forwarded-For` arbitraire, qui sera conservé en tête de liste. La lecture sûre consiste donc à parcourir la liste **depuis la droite** et à retenir la première adresse qui n'appartient pas à un proxy de confiance connu. L'en-tête standardisé `Forwarded` (RFC 7239, par exemple `Forwarded: for=203.0.113.7;proto=https`) regroupe ces informations en un seul champ, mais reste moins répandu que les en-têtes `X-Forwarded-*`.

## HAProxy vs Nginx

HAProxy est spécialisé dans le load balancing et opère nativement en L4 et L7. Nginx est un serveur web qui fait aussi du reverse proxy.

| Critère | Nginx | HAProxy |
|---------|-------|---------|
| Serveur de fichiers statiques | Oui | Non |
| Reverse proxy HTTP | Oui | Oui |
| Proxy TCP/UDP | Module stream | Natif |
| Health checks actifs | Nginx Plus seulement | Natif |
| Stats/monitoring | `stub_status` (compteurs globaux) et logs | Page de statistiques par backend et par serveur |
| Algorithmes LB | round-robin, `least_conn`, `ip_hash`, `hash`, `random` | `roundrobin`, `static-rr`, `leastconn`, `first`, `source`, `uri`, `hdr`, `random` |

Pour une infrastructure exposant uniquement du trafic HTTP/HTTPS avec besoin de servir des assets, Nginx est souvent suffisant. Pour un load balancer L4 gérant du trafic TCP arbitraire avec health checks avancés, HAProxy est plus adapté.
