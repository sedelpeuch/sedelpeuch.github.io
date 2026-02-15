---
title: "Kubernetes : certificats"
description: "Guide pratique pour renouveler les certificats expirants dans un cluster Kubernetes déployé avec kubeadm."
tags: [orchestration, devops]
---

Les certificats jouent un rôle crucial dans la sécurité de Kubernetes. Ils assurent l'authentification et le chiffrement des communications entre les différents composants du cluster. Cependant, ces certificats ont une durée de vie limitée et doivent être renouvelés avant leur expiration pour maintenir le bon fonctionnement du cluster. 🔐

<!--truncate-->

## La problématique des certificats expirants 📅

Par défaut, les certificats générés par kubeadm ont une durée de validité d'un an. Lorsqu'ils expirent, les composants du cluster ne peuvent plus communiquer entre eux de manière sécurisée, ce qui peut entraîner une panne complète du cluster.

Les symptômes typiques d'un certificat expiré incluent :

- Impossibilité d'utiliser `kubectl`
- Les nouveaux pods ne sont plus programmés
- Messages d'erreur du type `x509: certificate has expired or is not yet valid`

## Vérification des dates d'expiration ⏱️

Avant de procéder au renouvellement, il est important de vérifier la date d'expiration des certificats actuels. Pour cela, vous pouvez utiliser la commande suivante :

```bash
kubeadm certs check-expiration
```

Cette commande affiche une liste de tous les certificats avec leurs dates d'expiration respectives :

```text
CERTIFICATE                EXPIRES                  RESIDUAL TIME   CERTIFICATE AUTHORITY   EXTERNALLY MANAGED
admin.conf                 Jun 05, 2026 12:51 UTC   364d            ca                      no
apiserver                  Jun 05, 2026 12:51 UTC   364d            ca                      no
apiserver-kubelet-client   Jun 05, 2026 12:51 UTC   364d            ca                      no
controller-manager.conf    Jun 05, 2026 12:51 UTC   364d            ca                      no
kubelet.conf              Jun 05, 2026 12:51 UTC   364d            ca                      no
scheduler.conf             Jun 05, 2026 12:51 UTC   364d            ca                      no
...
```

## Processus de renouvellement des certificats 🔄

### 1. Renouvellement de tous les certificats

La méthode la plus simple consiste à renouveler tous les certificats à la fois :

```bash
sudo kubeadm certs renew all
```

Cette commande renouvelle tous les certificats gérés par kubeadm et les stocke dans le répertoire `/etc/kubernetes/pki`.

### 2. Renouvellement des certificats spécifiques

Si vous préférez renouveler les certificats un par un, vous pouvez spécifier le certificat à renouveler :

```bash
sudo kubeadm certs renew apiserver
sudo kubeadm certs renew apiserver-kubelet-client
sudo kubeadm certs renew front-proxy-client
# etc.
```

### 3. Mise à jour des fichiers kubeconfig

Après avoir renouvelé les certificats, il est nécessaire de mettre à jour les fichiers kubeconfig :

```bash
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

## Redémarrage des composants 🔄

Pour que les nouveaux certificats soient pris en compte, il faut redémarrer les composants du plan de contrôle :

```bash
sudo systemctl restart kubelet
```

Sur un cluster multi-nœuds, vous devez également redémarrer le kubelet sur chaque nœud worker :

```bash
# Sur chaque nœud worker
sudo systemctl restart kubelet
```

### Forcer le redémarrage en cas de problème ⚠️

Dans certains cas, un simple redémarrage du kubelet peut ne pas suffire pour que les nouveaux certificats soient pris en compte. Si vous rencontrez toujours des problèmes après le redémarrage normal, deux méthodes plus radicales peuvent être utilisées :

**Méthode 1 : Manipulation des manifests statiques**

```bash
# Sauvegarde et renommage temporaire des manifests
cd /etc/kubernetes/manifests
sudo mkdir -p /root/manifests_backup
sudo cp *.yaml /root/manifests_backup/
sudo mv *.yaml /tmp/

# Attendre que le cluster s'arrête (les pods du plan de contrôle disparaîtront)
# Puis restaurer les manifests pour redémarrer les composants
sudo mv /tmp/*.yaml .
```

Cette méthode force kubelet à supprimer puis recréer tous les pods du plan de contrôle, garantissant ainsi l'utilisation des nouveaux certificats.

**Méthode 2 : Suppression manuelle des pods**

Si vous avez encore accès à l'API Kubernetes, vous pouvez supprimer manuellement les pods du plan de contrôle :

```bash
# Attention : commande à utiliser avec précaution
kubectl -n kube-system delete pod -l component=kube-apiserver
kubectl -n kube-system delete pod -l component=kube-controller-manager
kubectl -n kube-system delete pod -l component=kube-scheduler
kubectl -n kube-system delete pod -l k8s-app=kube-proxy
```

> ⚠️ **Attention** : Ces méthodes provoquent une interruption temporaire du service. Planifiez-les pendant une fenêtre de maintenance.

## Automatisation du renouvellement 🤖

Pour éviter de devoir gérer manuellement le renouvellement des certificats, vous pouvez mettre en place une tâche cron qui vérifie et renouvelle automatiquement les certificats :

```bash
# Créer un script de renouvellement des certificats
cat > /usr/local/bin/renew-k8s-certs.sh << 'EOF'
#!/bin/bash
# Vérifier si des certificats expirent dans moins de 30 jours
EXPIRING_CERTS=$(kubeadm certs check-expiration | grep -B 1 "< 30d" | grep -v "RESIDUAL" | awk '{print $1}')

if [ ! -z "$EXPIRING_CERTS" ]; then
    echo "Renouvellement des certificats qui expirent bientôt..."
    sudo kubeadm certs renew all
    sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
    sudo chown $(id -u):$(id -g) $HOME/.kube/config
    sudo systemctl restart kubelet
    echo "Certificats renouvelés avec succès !"
else
    echo "Aucun certificat n'expire dans moins de 30 jours."
fi
EOF

chmod +x /usr/local/bin/renew-k8s-certs.sh

# Ajouter une tâche cron pour exécuter le script une fois par mois
(crontab -l 2>/dev/null; echo "0 0 1 * * /usr/local/bin/renew-k8s-certs.sh >> /var/log/renew-k8s-certs.log 2>&1") | crontab -
```

## Bonnes pratiques 🛡️

1. **Planification préventive** : Renouvelez vos certificats au moins un mois avant leur expiration pour éviter toute interruption de service.

2. **Sauvegarde** : Avant de procéder au renouvellement, effectuez une sauvegarde du répertoire `/etc/kubernetes/pki`.

3. **Documentation** : Documentez clairement les dates de renouvellement et mettez en place des alertes pour être notifié avant l'expiration.

4. **Test** : Testez le processus de renouvellement dans un environnement de développement avant de l'appliquer en production.

## Conclusion 🎯

Le renouvellement des certificats est une tâche de maintenance critique pour garantir la sécurité et la disponibilité de votre cluster Kubernetes. En suivant ce guide, vous pouvez facilement renouveler vos certificats et éviter les problèmes liés à leur expiration.

N'oubliez pas que la sécurité est un processus continu, et la gestion proactive des certificats fait partie intégrante de la maintenance d'un cluster Kubernetes robuste et sécurisé.
