---
title: "Kubernetes : Secrets et ConfigMaps"
description: "Gérer la configuration et les credentials dans Kubernetes : ConfigMap, Secret, injection en variables d'environnement ou en volume."
tags: [orchestration, devops]
---

Une image Docker doit être identique entre les environnements — dev, staging, prod. Ce qui change entre environnements, c'est la configuration : URL de base de données, niveau de log, clés API. Kubernetes fournit deux ressources pour externaliser cette configuration : ConfigMap pour les données non sensibles, Secret pour les credentials.

<!--truncate-->

## ConfigMap

Un ConfigMap stocke des paires clé-valeur de configuration sous forme de texte brut. Il découple la configuration de l'image — une même image peut se comporter différemment selon le ConfigMap injecté.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: api-config
data:
  LOG_LEVEL: "info"
  API_PORT: "8080"
  DATABASE_NAME: "myapp"
```

### Injection en variables d'environnement

```yaml
spec:
  containers:
    - name: api
      image: myapp:1.0
      env:
        - name: LOG_LEVEL
          valueFrom:
            configMapKeyRef:
              name: api-config
              key: LOG_LEVEL
```

Ou en une seule directive pour injecter toutes les clés :

```yaml
      envFrom:
        - configMapRef:
            name: api-config
```

### Injection en volume

Monter un ConfigMap en volume crée un fichier par clé dans le répertoire cible. Utile pour les fichiers de configuration (nginx.conf, prometheus.yml) :

```yaml
      volumeMounts:
        - name: config
          mountPath: /etc/app
  volumes:
    - name: config
      configMap:
        name: api-config
```

La différence entre les deux modes d'injection est importante : les variables d'environnement sont figées au démarrage du pod. Si le ConfigMap est modifié, le pod doit être redémarré pour voir les nouvelles valeurs. Un volume ConfigMap est mis à jour dynamiquement — le fichier monté reflète les changements sans redémarrage (avec un délai de quelques secondes).

## Secret

Un Secret stocke des données sensibles : mots de passe, tokens, clés TLS. Sa syntaxe est proche du ConfigMap, avec une différence fondamentale : les valeurs sont encodées en base64.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
data:
  username: cG9zdGdyZXM=      # "postgres" en base64
  password: c2VjcmV0MTIz      # "secret123" en base64
```

:::warning Base64 n'est pas du chiffrement
L'encodage base64 est réversible en une commande : `echo "cG9zdGdyZXM=" | base64 -d`. Les Secrets Kubernetes ne sont pas chiffrés par défaut — ils sont stockés en clair dans etcd. La sécurité réelle repose sur les contrôles d'accès RBAC qui limitent qui peut lire les Secrets, et sur le chiffrement at-rest d'etcd (à activer explicitement en production).
:::

Pour créer un Secret sans manipuler le base64 manuellement :

```bash
kubectl create secret generic db-credentials \
  --from-literal=username=postgres \
  --from-literal=password=secret123
```

### Injection dans un pod

```yaml
spec:
  containers:
    - name: api
      image: myapp:1.0
      env:
        - name: DB_USER
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: username
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: password
```

### Injection en volume

Monter un Secret en volume est préférable pour les certificats TLS ou les fichiers de clés — cela évite que la valeur apparaisse dans les variables d'environnement du processus (visibles via `/proc/<pid>/environ`) :

```yaml
      volumeMounts:
        - name: certs
          mountPath: /etc/ssl/app
          readOnly: true
  volumes:
    - name: certs
      secret:
        secretName: tls-cert
```

## ConfigMap vs Secret

| | ConfigMap | Secret |
|---|---|---|
| Données | Texte brut | Base64 |
| Usage | Configuration non sensible | Credentials, clés, certificats |
| Stockage etcd | Clair | Clair (chiffrement optionnel) |
| Visibilité | `kubectl get configmap -o yaml` | `kubectl get secret -o yaml` (base64) |

La règle est simple : tout ce qui ne doit pas apparaître dans un log ou un diff Git va dans un Secret. Le reste dans un ConfigMap.
