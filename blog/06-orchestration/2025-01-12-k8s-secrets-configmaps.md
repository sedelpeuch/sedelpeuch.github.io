---
title: "Kubernetes : Secrets et ConfigMaps"
description: "Gérer la configuration et les credentials dans Kubernetes : ConfigMap, Secret, injection en variables d'environnement ou en volume."
tags: [orchestration, devops]
---

Une image Docker doit être identique entre les environnements : dev, staging, prod. Ce qui change entre environnements, c'est la configuration : URL de base de données, niveau de log, clés API. Kubernetes fournit deux ressources pour externaliser cette configuration : ConfigMap pour les données non sensibles, Secret pour les credentials.

<!--truncate-->

## ConfigMap

Un ConfigMap stocke des paires clé-valeur de configuration sous forme de texte brut. Il découple la configuration de l'image : une même image peut se comporter différemment selon le ConfigMap injecté.

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

La différence entre les deux modes d'injection est importante : les variables d'environnement sont figées au démarrage du conteneur. Si le ConfigMap est modifié, le pod doit être recréé pour voir les nouvelles valeurs. Un volume ConfigMap est mis à jour dynamiquement : le kubelet réécrit les fichiers montés, avec un délai qui dépend de sa période de synchronisation et de son cache (de l'ordre d'une minute). Deux limites s'appliquent : un montage avec `subPath` n'est jamais mis à jour, et l'application doit relire le fichier (surveillance du fichier ou signal de rechargement) pour prendre en compte la nouvelle version.

Pour les variables d'environnement, la prise en compte d'une modification passe par un redémarrage progressif :

```bash
# Recréer les pods du Deployment un par un, avec la nouvelle configuration
kubectl rollout restart deployment/api
```

Helm et Kustomize automatisent ce redémarrage en plaçant un hash du ConfigMap dans une annotation du template de pod (ou dans le nom du ConfigMap) : toute modification de la configuration change le template, ce qui déclenche un rolling update.

## Secret

Un Secret stocke des données sensibles : mots de passe, tokens, clés TLS. Sa syntaxe est proche du ConfigMap ; les valeurs du champ `data` sont encodées en base64, ce qui permet de stocker des données binaires (clés, certificats DER).

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
L'encodage base64 est réversible en une commande : `echo "cG9zdGdyZXM=" | base64 -d`. Sur un cluster autogéré, les Secrets ne sont pas chiffrés par défaut : ils sont stockés en clair dans etcd et dans ses sauvegardes. La sécurité réelle repose sur les contrôles d'accès RBAC qui limitent qui peut lire les Secrets (y compris indirectement : créer un pod dans un namespace permet d'y monter n'importe quel Secret), et sur le chiffrement au repos, configuré sur l'API server par un fichier `EncryptionConfiguration` (idéalement avec un fournisseur KMS). Les offres managées (EKS, GKE, AKS) proposent ce chiffrement par une clé KMS du fournisseur.
:::

Pour créer un Secret sans manipuler le base64 manuellement :

```bash
kubectl create secret generic db-credentials \
  --from-literal=username=postgres \
  --from-literal=password=secret123
```

Le champ `stringData` d'un manifeste accepte aussi des valeurs en clair, que l'API server encode lui-même. Dans les deux cas, un manifeste de Secret ne doit pas être versionné tel quel dans Git : des outils comme Sealed Secrets (Secret chiffré pour une clé détenue par le cluster), SOPS (fichier chiffré avec une clé KMS ou age) ou External Secrets Operator (synchronisation depuis Vault, AWS Secrets Manager...) permettent de gérer les Secrets de façon déclarative sans exposer leur valeur.

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

Monter un Secret en volume est préférable pour les certificats TLS ou les fichiers de clés, car cela évite que la valeur apparaisse dans les variables d'environnement du processus (visibles via `/proc/<pid>/environ`, héritées par les processus fils, parfois écrites dans les rapports d'erreur). Sur le nœud, le kubelet stocke les volumes de Secrets en `tmpfs`, en mémoire, et jamais sur le disque :

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

Critère de choix : tout ce qui ne doit pas apparaître dans un log ou un diff Git va dans un Secret, le reste dans un ConfigMap. Les deux ressources acceptent le champ `immutable: true`, qui interdit toute modification ultérieure : le kubelet cesse alors de surveiller l'objet, ce qui réduit la charge sur l'API server dans les grands clusters, et une modification accidentelle devient impossible (il faut créer un nouvel objet, sous un nouveau nom).
