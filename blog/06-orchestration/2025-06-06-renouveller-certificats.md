---
title: "Kubernetes : certificats"
description: "Guide pratique pour renouveler les certificats expirants dans un cluster Kubernetes déployé avec kubeadm."
tags: [orchestration, devops]
---

Par défaut, les certificats générés par kubeadm ont une durée de validité d'un an. À l'expiration, les composants du cluster ne peuvent plus s'authentifier entre eux — le cluster devient inaccessible. Le renouvellement est une opération de maintenance prévisible, à planifier avant l'expiration plutôt qu'en urgence.

<!--truncate-->

## Symptômes d'un certificat expiré

- `kubectl` retourne `x509: certificate has expired or is not yet valid`
- Les nouveaux pods ne sont plus schedulés
- Les composants du control plane perdent leur communication

## Vérifier les dates d'expiration

```bash
kubeadm certs check-expiration
```

```text
CERTIFICATE                EXPIRES                  RESIDUAL TIME   CERTIFICATE AUTHORITY   EXTERNALLY MANAGED
admin.conf                 Jun 05, 2026 12:51 UTC   364d            ca                      no
apiserver                  Jun 05, 2026 12:51 UTC   364d            ca                      no
apiserver-kubelet-client   Jun 05, 2026 12:51 UTC   364d            ca                      no
controller-manager.conf    Jun 05, 2026 12:51 UTC   364d            ca                      no
kubelet.conf               Jun 05, 2026 12:51 UTC   364d            ca                      no
scheduler.conf             Jun 05, 2026 12:51 UTC   364d            ca                      no
```

## Renouvellement

### Tous les certificats à la fois

```bash
sudo kubeadm certs renew all
```

Les nouveaux certificats sont écrits dans `/etc/kubernetes/pki`. Il faut ensuite mettre à jour le kubeconfig local :

```bash
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

### Certificats spécifiques

```bash
sudo kubeadm certs renew apiserver
sudo kubeadm certs renew apiserver-kubelet-client
sudo kubeadm certs renew front-proxy-client
```

## Redémarrage des composants

Les composants du control plane doivent être redémarrés pour prendre en compte les nouveaux certificats :

```bash
sudo systemctl restart kubelet
```

Sur un cluster multi-nœuds, redémarrer le kubelet sur chaque nœud worker également.

### Si le redémarrage normal ne suffit pas

**Méthode 1 — rotation des manifests statiques :**

```bash
cd /etc/kubernetes/manifests
sudo mkdir -p /root/manifests_backup
sudo cp *.yaml /root/manifests_backup/
sudo mv *.yaml /tmp/
# Attendre que les pods du control plane disparaissent
sudo mv /tmp/*.yaml .
```

Cette méthode force kubelet à supprimer puis recréer tous les pods du control plane.

**Méthode 2 — suppression manuelle des pods (si l'API est encore accessible) :**

```bash
kubectl -n kube-system delete pod -l component=kube-apiserver
kubectl -n kube-system delete pod -l component=kube-controller-manager
kubectl -n kube-system delete pod -l component=kube-scheduler
```

:::warning
Ces deux méthodes provoquent une interruption temporaire. À planifier dans une fenêtre de maintenance.
:::

## Automatisation

Un script cron qui vérifie et renouvelle automatiquement les certificats proches de l'expiration :

```bash
cat > /usr/local/bin/renew-k8s-certs.sh << 'EOF'
#!/bin/bash
EXPIRING_CERTS=$(kubeadm certs check-expiration | grep -B 1 "< 30d" | grep -v "RESIDUAL" | awk '{print $1}')

if [ ! -z "$EXPIRING_CERTS" ]; then
    sudo kubeadm certs renew all
    sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
    sudo chown $(id -u):$(id -g) $HOME/.kube/config
    sudo systemctl restart kubelet
fi
EOF

chmod +x /usr/local/bin/renew-k8s-certs.sh

# Vérification mensuelle
(crontab -l 2>/dev/null; echo "0 0 1 * * /usr/local/bin/renew-k8s-certs.sh >> /var/log/renew-k8s-certs.log 2>&1") | crontab -
```

Renouveler au moins 30 jours avant l'expiration laisse une marge pour traiter les problèmes imprévus. Sauvegarder `/etc/kubernetes/pki` avant toute opération de renouvellement.
