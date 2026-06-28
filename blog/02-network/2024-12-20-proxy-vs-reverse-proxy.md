---
title: "Proxy et reverse proxy"
description: "Différences architecturales entre proxy direct et reverse proxy : position dans le flux réseau, couche L4/L7, SSL passthrough vs terminaison, load balancing, et cas d'usage."
tags: [network, devops]
---

Un proxy et un reverse proxy remplissent tous les deux un rôle d'intermédiaire réseau, mais ils se positionnent de chaque côté de la connexion — l'un représente le client, l'autre protège le serveur. Confondre les deux mène à des architectures mal configurées et à des règles de sécurité inefficaces.

<!--truncate-->

## Le proxy direct (forward proxy)

Un proxy direct est un intermédiaire que le **client configure explicitement**. La requête passe par le proxy, qui la transmet au serveur de destination en utilisant sa propre adresse IP. Le serveur de destination voit l'IP du proxy, pas celle du client.

```
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

```
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

**Proxy L4 (couche transport)** : opère sur les connexions TCP/UDP sans lire le contenu applicatif. Plus performant (pas de décodage HTTP), mais ne peut router que sur IP/port. Peut transmettre du TLS sans le terminer (SSL passthrough).

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

```
Client → [TLS] → Nginx (terminaison) → [HTTP] → Backend
```

**SSL passthrough** (L4) : le reverse proxy transmet les paquets TLS chiffrés au backend sans les déchiffrer. Le backend possède le certificat et gère lui-même la terminaison TLS. Le proxy ne peut pas lire ni modifier le contenu.

```
Client → [TLS] → HAProxy (passthrough) → [TLS] → Backend (terminaison)
```

```
# HAProxy SSL passthrough
frontend https_in
    bind *:443
    mode tcp
    default_backend https_backend

backend https_backend
    mode tcp
    server app1 10.0.0.1:443
```

Le SSL passthrough est utile pour les protocoles qui nécessitent un certificat de bout en bout (mTLS d'application, RDP), ou quand les politiques de sécurité interdisent au proxy d'accéder à la clé privée.

## En-têtes de transfert

Quand un reverse proxy transmet une requête, le backend voit l'IP du proxy, pas celle du client. Les en-têtes HTTP propagent l'information originale :

```nginx
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Forwarded-Host  $host;
```

`X-Forwarded-For` accumule les IPs intermédiaires si la requête passe par plusieurs proxies : `IP_client, IP_proxy1, IP_proxy2`. L'application backend doit lire ces headers pour obtenir l'IP réelle — important pour les logs, la géolocalisation, et les règles de rate limiting. Elle doit aussi vérifier que ces headers proviennent bien d'un proxy de confiance (un client malveillant peut les falsifier).

## HAProxy vs Nginx

HAProxy est spécialisé dans le load balancing et opère nativement en L4 et L7. Nginx est un serveur web qui fait aussi du reverse proxy.

| Critère | Nginx | HAProxy |
|---------|-------|---------|
| Serveur de fichiers statiques | Oui | Non |
| Reverse proxy HTTP | Oui | Oui |
| Proxy TCP/UDP | Module stream | Natif |
| Health checks actifs | Nginx Plus seulement | Natif |
| Stats/monitoring | Via log | Dashboard natif |
| Algorithmes LB | Basiques | Avancés (leastconn, random, first) |

Pour une infrastructure exposant uniquement du trafic HTTP/HTTPS avec besoin de servir des assets, Nginx est souvent suffisant. Pour un load balancer L4 gérant du trafic TCP arbitraire avec health checks avancés, HAProxy est plus adapté.
