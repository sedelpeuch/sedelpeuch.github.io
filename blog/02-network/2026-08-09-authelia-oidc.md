---
title: "Authelia : fournisseur OpenID Connect"
description: "Configurer Authelia 4.39 comme fournisseur OpenID Connect : flux authorization code avec PKCE, discovery, déclaration des clients, mapping des groupes en rôles et diagnostic des erreurs client_secret_basic, redirect_uri et clé de signature."
series: homelab
tags: [network, devops]
---

Un [forward-auth](./2026-08-02-authelia-forward-auth.md) décide au niveau du reverse proxy si une requête peut atteindre un service, mais l'application protégée n'en apprend rien : elle affiche son propre formulaire de connexion, gère ses propres comptes et ignore les groupes définis dans l'annuaire central. OpenID Connect (OIDC) résout ce problème au niveau applicatif. L'application délègue l'authentification à un fournisseur d'identité, reçoit en retour un jeton signé qui décrit l'utilisateur et ses groupes, et crée sa session locale à partir de ces informations. Authelia peut jouer ce rôle de fournisseur pour toute application compatible.

<!--truncate-->

## Proxy-auth et SSO applicatif

| Critère | Forward-auth | OpenID Connect |
|---|---|---|
| Point de décision | Reverse proxy, à chaque requête | Application, à la connexion |
| Identité dans l'application | Seulement si l'application lit `Remote-User` | Native : compte créé ou lié à partir des claims |
| Rôles applicatifs | Non gérés | Déduits du claim `groups` |
| Clients mobiles et API | Exceptions à prévoir dans le proxy | Gérés par l'application (jetons propres) |
| Prérequis | Aucun côté application | Support OIDC dans l'application |

Les deux mécanismes partagent la base d'utilisateurs et la session Authelia : un utilisateur déjà connecté au portail ne ressaisit pas ses identifiants lors d'une connexion OIDC.

## Flux authorization code avec PKCE

Le flux recommandé, et le seul `grant_type` attribué par défaut à un client Authelia, est l'**authorization code**. Le navigateur ne transporte qu'un code à usage unique ; les jetons sont obtenus par l'application directement auprès du fournisseur, sur un canal serveur-à-serveur authentifié par le secret du client.

**PKCE** (Proof Key for Code Exchange) lie le code à l'instance qui l'a demandé. Le client génère un secret aléatoire, le `code_verifier`, et n'envoie à l'autorisation que son empreinte `code_challenge = BASE64URL(SHA256(code_verifier))` (méthode `S256`). Lors de l'échange, il présente le `code_verifier` : un code intercepté est inutilisable sans lui.

```mermaid
sequenceDiagram
    participant N as Navigateur
    participant App as Application
    participant A as Authelia
    N->>App: GET /login
    App-->>N: 302 vers /api/oidc/authorization<br/>client_id, redirect_uri, scope, state, code_challenge
    N->>A: requête d'autorisation
    A-->>N: portail (si pas de session) puis consentement
    A-->>N: 302 vers redirect_uri?code=...&state=...
    N->>App: GET redirect_uri?code=...
    App->>A: POST /api/oidc/token<br/>code, code_verifier, authentification du client
    A-->>App: id_token (JWT signé), access_token
    App->>A: GET /api/oidc/userinfo (access_token)
    A-->>App: claims : email, name, groups
    App-->>N: session applicative créée
```

La signature de l'`id_token` se vérifie avec la clé publique exposée par le fournisseur (JWKS). Le paramètre `state` protège la redirection de retour contre la falsification de requête inter-sites.

## Discovery

Les applications se configurent le plus souvent avec une seule URL, l'**issuer**, à partir de laquelle elles lisent le document de découverte :

```bash
# Endpoints et capacités annoncés par le fournisseur
curl -s https://auth.example.com/.well-known/openid-configuration \
  | jq '{authorization_endpoint, token_endpoint, userinfo_endpoint,
         token_endpoint_auth_methods_supported, code_challenge_methods_supported}'
```

Chez Authelia, les endpoints sont `/api/oidc/authorization`, `/api/oidc/token` et `/api/oidc/userinfo`. Le champ `token_endpoint_auth_methods_supported` joue un rôle central dans le premier piège décrit plus bas.

## Configuration du fournisseur

### Secret HMAC et clé de signature

```yaml
identity_providers:
  oidc:
    # hmac_secret : fourni par AUTHELIA_IDENTITY_PROVIDERS_OIDC_HMAC_SECRET_FILE
    jwks:
      - key_id: 'main'
        algorithm: 'RS256'
        use: 'sig'
        key: |
          -----BEGIN PRIVATE KEY-----
          ...
          -----END PRIVATE KEY-----
```

`hmac_secret` est une chaîne aléatoire d'au moins 64 caractères recommandés. `jwks` contient au moins une clé `RS256` (RSA de 2048 bits minimum), qui signe les `id_token`. Les deux se génèrent avec le binaire d'Authelia :

```bash
# Chaîne aléatoire pour hmac_secret
docker run --rm authelia/authelia:4.39 authelia crypto rand --length 64 --charset alphanumeric

# Paire RSA : écrit private.pem et public.pem dans le répertoire courant
docker run --rm -u "$(id -u):$(id -g)" -v "$(pwd)":/keys \
  authelia/authelia:4.39 authelia crypto pair rsa generate --directory /keys
```

### Déclarer un client

```yaml
identity_providers:
  oidc:
    clients:
      - client_id: 'wiki'
        client_name: 'Wiki interne'
        client_secret: '$pbkdf2-sha512$310000$...'   # hash, jamais le secret en clair
        public: false
        authorization_policy: 'one_factor'
        require_pkce: true
        pkce_challenge_method: 'S256'
        redirect_uris:
          - 'https://wiki.example.com/oauth/callback'
        scopes: ['openid', 'profile', 'email', 'groups']
        grant_types: ['authorization_code']
        response_types: ['code']
        token_endpoint_auth_method: 'client_secret_post'
```

- `client_secret` est stocké haché. La commande suivante génère un secret aléatoire et affiche à la fois la valeur en clair, à configurer dans l'application, et son hash, à placer dans Authelia :

```bash
docker run --rm authelia/authelia:4.39 authelia crypto hash generate pbkdf2 \
  --variant sha512 --random --random.length 72 --random.charset rfc3986
```

- `redirect_uris` est comparé **exactement**, casse comprise : une barre oblique finale, un paramètre de requête ou un schéma `http` au lieu de `https` suffisent à refuser l'autorisation.
- `scopes` borne ce que le client peut demander ; `groups` est indispensable pour tout mapping de rôles.
- `authorization_policy` vaut `two_factor` par défaut. Elle s'applique aux seules requêtes d'autorisation OIDC, indépendamment des règles `access_control` du forward-auth.
- `require_pkce` impose PKCE à ce client. Au niveau du fournisseur, `enforce_pkce` vaut `public_clients_only` par défaut.
- `token_endpoint_auth_method` fixe la manière dont le client s'authentifie sur l'endpoint token. Sans valeur explicite, un client confidentiel utilise `client_secret_basic`.

### Claims de l'ID token depuis la 4.39

Depuis Authelia 4.39, l'`id_token` ne contient plus par défaut que les claims standard de la spécification ; `email`, `groups` ou `preferred_username` s'obtiennent via l'endpoint userinfo, comme le prévoit OIDC. Une application qui ne lit ces valeurs que dans l'`id_token` reçoit alors un utilisateur sans groupes. Les `claims_policies` réintroduisent les claims nécessaires, client par client :

```yaml
identity_providers:
  oidc:
    claims_policies:
      legacy_id_token:
        id_token: ['email', 'name', 'groups', 'preferred_username']
    clients:
      - client_id: 'grafana'
        claims_policy: 'legacy_id_token'
        # ...
```

## Pièges côté client

### client_secret_basic ou client_secret_post

L'endpoint token accepte deux méthodes courantes d'authentification par secret : `client_secret_basic` (en-tête `Authorization: Basic base64(client_id:client_secret)`) et `client_secret_post` (paramètres `client_id` et `client_secret` dans le corps du `POST`). Authelia n'accepte que la méthode déclarée pour le client et répond sinon `invalid_client` (« Client authentication failed »), le journal d'Authelia précisant la méthode reçue et la méthode enregistrée.

Deux situations produisent ce décalage :

- **Le client impose une méthode.** Certaines applications envoient toujours le secret dans le corps, sans option de configuration. Le client Authelia doit alors déclarer `client_secret_post`.
- **La librairie choisit d'après le discovery.** Une librairie qui ne reçoit pas de méthode explicite prend l'une de celles annoncées par `token_endpoint_auth_methods_supported`. C'est le cas de l'adaptateur OpenID Connect de django-allauth, qui retient `client_secret_basic` alors que le client Authelia est déclaré en `client_secret_post`. L'application n'affiche qu'une erreur générique de connexion sociale ; le paramètre `token_auth_method` fixe la méthode :

```python
# extrait de SOCIALACCOUNT_PROVIDERS["openid_connect"]["APPS"][0]
"settings": {
    "server_url": "https://auth.example.com",
    "token_auth_method": "client_secret_post",
},
```

Avec `client_secret_basic`, la spécification impose d'encoder `client_id` et `client_secret` en `application/x-www-form-urlencoded` avant le Base64, ce que certains clients omettent. Un secret limité aux caractères non réservés (`--random.charset rfc3986`) neutralise ce second écueil.

### redirect_uri construit depuis une URL racine absente

Beaucoup d'applications construisent leur `redirect_uri` à partir d'une variable (`ROOT_URL`, `BASE_URL`, `PUBLIC_URL`) plutôt que des en-têtes `X-Forwarded-*`. Sans elle, l'URL retombe sur une valeur par défaut du type `http://localhost:3333/api/auth/oidc/callback`, et Authelia refuse l'autorisation : le `redirect_uri` ne correspond à aucune URI enregistrée. Le paramètre `redirect_uri` visible dans l'URL de la page d'erreur donne directement la valeur fautive.

### Applications mobiles

Une application native reçoit le code via un **custom URI scheme** (`app.example:///oauth-callback`), déclaré tel quel dans `redirect_uris`. Sur certaines plateformes, cette redirection n'aboutit pas de façon fiable et l'application ne récupère jamais le code. Certaines applications proposent alors une **redirection HTTPS intermédiaire** : Authelia redirige vers une page du serveur (`https://photos.example.com/api/oauth/mobile-redirect`), qui relaie vers le schéma natif. Cette URL figure elle aussi dans `redirect_uris`.

## Mapping des groupes en rôles

Le claim `groups` porte la liste des groupes Authelia de l'utilisateur. L'application le traduit en rôles internes. Avec Grafana, l'expression JMESPath `role_attribute_path` réalise ce mapping :

```ini
GF_AUTH_GENERIC_OAUTH_SCOPES=openid profile email groups
GF_AUTH_GENERIC_OAUTH_AUTH_URL=https://auth.example.com/api/oidc/authorization
GF_AUTH_GENERIC_OAUTH_TOKEN_URL=https://auth.example.com/api/oidc/token
GF_AUTH_GENERIC_OAUTH_API_URL=https://auth.example.com/api/oidc/userinfo
GF_AUTH_GENERIC_OAUTH_USE_PKCE=true
# InHeader = client_secret_basic, InParams = client_secret_post
GF_AUTH_GENERIC_OAUTH_AUTH_STYLE=InHeader
# groupe admins -> Admin, tout autre utilisateur -> Viewer
GF_AUTH_GENERIC_OAUTH_ROLE_ATTRIBUTE_PATH=contains(groups[], 'admins') && 'Admin' || 'Viewer'
# empêche qu'un compte OIDC obtienne le rôle super-administrateur du serveur
GF_AUTH_GENERIC_OAUTH_ALLOW_ASSIGN_GRAFANA_ADMIN=false
```

`role_attribute_strict=true` refuse la connexion lorsque l'expression ne produit aucun rôle, au lieu d'appliquer le rôle par défaut. Le rôle est réévalué à chaque connexion : retirer un utilisateur d'un groupe dans Authelia suffit à le rétrograder.

## Combiner OIDC natif et forward-auth

Conserver le forward-auth devant une application déjà cliente OIDC produit une double couche. Pour un navigateur, elle est transparente : le saut OIDC réutilise la session Authelia ouverte par le forward-auth, sans second écran. Un client tiers (TV, mobile, client API) reçoit en revanche une redirection vers le portail avant même d'atteindre l'application : sa connexion native échoue alors que le client OIDC est correct. La double couche se réserve donc aux applications consommées uniquement par navigateur ; ailleurs, l'OIDC seul ou des exceptions ciblées dans `access_control` préservent les clients natifs.

## Injecter la clé de signature

Les secrets scalaires se chargent par fichier via les variables `_FILE` (`AUTHELIA_IDENTITY_PROVIDERS_OIDC_HMAC_SECRET_FILE`, `AUTHELIA_SESSION_SECRET_FILE`, `AUTHELIA_STORAGE_ENCRYPTION_KEY_FILE`, `AUTHELIA_IDENTITY_VALIDATION_RESET_PASSWORD_JWT_SECRET_FILE`, qui remplace l'ancienne clé racine `jwt_secret`). Ce mécanisme ne couvre pas les **listes d'objets** : `jwks`, `clients`, `access_control.rules`. La clé PEM, élément de la liste `jwks`, passe donc par le moteur de template d'Authelia, activé par `X_AUTHELIA_CONFIG_FILTERS=template`.

La fonction de template `env` exclut volontairement toute variable préfixée `AUTHELIA_` ou `X_AUTHELIA_` dont le nom se termine par `KEY`, `SECRET`, `PASSWORD`, `TOKEN` ou `CERTIFICATE_CHAIN` : elle renvoie une valeur vide pour ces noms, afin qu'un secret ne fuie pas par templating. La fonction `secret`, qui lit un fichier et retire les retours à la ligne finaux, est la voie prévue :

```yaml
identity_providers:
  oidc:
    jwks:
      - key_id: 'main'
        algorithm: 'RS256'
        key: {{ secret "/secrets/oidc/private.pem" | mindent 10 "|" | msquote }}
```

`mindent` indente le contenu multiligne en bloc littéral YAML, `msquote` ne quote que les valeurs sur une seule ligne. Le fichier se monte en volume ou en secret Docker. Lorsque la clé n'existe que sous forme de variable d'environnement, par exemple dans un `.env` chiffré avec [git-crypt](../08-iac/2026-07-26-git-crypt.md), un point d'entrée l'écrit dans un fichier au démarrage :

```yaml
services:
  authelia:
    image: authelia/authelia:4.39
    environment:
      X_AUTHELIA_CONFIG_FILTERS: template
      OIDC_JWKS_PEM: ${OIDC_JWKS_PEM}
    entrypoint: ["/bin/sh", "-c"]
    command:
      - |
        # écrit la clé dans un fichier lu par la fonction secret, puis lance Authelia
        printf '%s\n' "$$OIDC_JWKS_PEM" > /tmp/oidc_private.pem
        exec /app/entrypoint.sh
```

Le `$$` échappe l'interpolation de Compose pour que la variable soit résolue par le shell du conteneur. La clé reste lisible par tout processus ayant accès à l'environnement du conteneur ; un secret Docker monté en fichier évite cette exposition.

## Récapitulatif des erreurs fréquentes

| Symptôme | Cause probable | Correction |
|---|---|---|
| `invalid_client`, « Client authentication failed » | Méthode d'authentification du client différente de `token_endpoint_auth_method` | Aligner la méthode des deux côtés (`client_secret_post` ou `client_secret_basic`) |
| Erreur générique de connexion sociale côté application | Librairie qui choisit `client_secret_basic` d'après le discovery | Fixer la méthode dans la librairie (`token_auth_method` pour django-allauth) |
| `redirect_uri` ne correspond à aucune URI enregistrée | URL racine de l'application non définie, ou URI non identique | Définir la variable d'URL publique ; copier l'URI exacte depuis l'erreur |
| Code PKCE manquant ou invalide | `require_pkce: true` avec un client qui n'envoie pas de `code_challenge` | Activer PKCE dans l'application, ou retirer l'exigence pour ce client |
| Utilisateur connecté sans rôle ni groupe | Scope `groups` absent, ou claims lus uniquement dans l'`id_token` (4.39) | Ajouter `groups` aux scopes ; déclarer une `claims_policy` |
| Application mobile déconnectée après l'autorisation | Custom URI scheme non relayé par la plateforme | Redirection HTTPS intermédiaire, déclarée dans `redirect_uris` |
| Client TV ou mobile en échec, navigateur fonctionnel | Forward-auth conservé devant une application cliente OIDC | Retirer le middleware ou ajouter des exceptions ciblées |
| Authelia refuse de démarrer : clé `jwks` vide ou invalide | Clé PEM lue via `env` sur un nom filtré | Lire la clé depuis un fichier avec `secret` |

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/personnel/homelab" title="HomeLab">Authelia comme fournisseur OpenID Connect d'une dizaine d'applications (gestionnaire de mots de passe, photothèque, gestion documentaire, supervision, médiathèque), avec PKCE, méthodes d'authentification de client alignées application par application et mapping du groupe `admins` en rôle administrateur.</ProjectLink>
</ProjectLinks>

OpenID Connect transfère l'identité jusque dans l'application là où le forward-auth s'arrête au proxy. La plupart des échecs d'intégration tiennent à trois paramètres qui doivent concorder exactement entre Authelia et l'application : la méthode d'authentification du client, l'URI de redirection et les claims attendus.
