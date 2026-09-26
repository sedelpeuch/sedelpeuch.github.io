---
title: "Kubernetes : certificats"
description: "Guide pratique pour renouveler les certificats expirants dans un cluster Kubernetes déployé avec kubeadm."
tags: [orchestration, devops]
---

Par défaut, les certificats clients et serveurs générés par kubeadm ont une durée de validité d'un an (dix ans pour les autorités de certification). À l'expiration, les composants du cluster ne peuvent plus s'authentifier entre eux, et le cluster devient inaccessible. Le renouvellement est une opération de maintenance prévisible, à planifier avant l'expiration plutôt qu'en urgence.

<!--truncate-->

## Symptômes d'un certificat expiré

- `kubectl` retourne `x509: certificate has expired or is not yet valid`
- Les nouveaux pods ne sont plus schedulés
- Les composants du control plane perdent leur communication

## Vérifier les dates d'expiration

```bash
sudo kubeadm certs check-expiration
```

```text
CERTIFICATE                EXPIRES                  RESIDUAL TIME   CERTIFICATE AUTHORITY   EXTERNALLY MANAGED
admin.conf                 Jun 05, 2026 12:51 UTC   364d            ca                      no
apiserver                  Jun 05, 2026 12:51 UTC   364d            ca                      no
apiserver-etcd-client      Jun 05, 2026 12:51 UTC   364d            etcd-ca                 no
apiserver-kubelet-client   Jun 05, 2026 12:51 UTC   364d            ca                      no
controller-manager.conf    Jun 05, 2026 12:51 UTC   364d            ca                      no
etcd-healthcheck-client    Jun 05, 2026 12:51 UTC   364d            etcd-ca                 no
etcd-peer                  Jun 05, 2026 12:51 UTC   364d            etcd-ca                 no
etcd-server                Jun 05, 2026 12:51 UTC   364d            etcd-ca                 no
front-proxy-client         Jun 05, 2026 12:51 UTC   364d            front-proxy-ca          no
scheduler.conf             Jun 05, 2026 12:51 UTC   364d            ca                      no

CERTIFICATE AUTHORITY   EXPIRES                  RESIDUAL TIME   EXTERNALLY MANAGED
ca                      Jun 03, 2035 12:51 UTC   9y              no
etcd-ca                 Jun 03, 2035 12:51 UTC   9y              no
front-proxy-ca          Jun 03, 2035 12:51 UTC   9y              no
```

Le fichier `kubelet.conf` n'apparaît pas dans cette liste : le certificat client du kubelet est renouvelé automatiquement par le kubelet lui-même (rotation activée par défaut), qui demande un nouveau certificat à l'API server avant l'expiration du précédent. Les nœuds workers n'ont donc aucun certificat à renouveler manuellement.

`kubeadm upgrade apply` et `kubeadm upgrade node` renouvellent aussi tous les certificats gérés par kubeadm : un cluster mis à jour au moins une fois par an, rythme imposé de toute façon par la fenêtre de support des versions de Kubernetes, n'atteint jamais l'expiration.

## Renouvellement

### Tous les certificats à la fois

```bash
# Sauvegarde préalable
sudo cp -a /etc/kubernetes/pki /root/pki-backup-$(date +%F)

sudo kubeadm certs renew all
```

Les nouveaux certificats sont écrits dans `/etc/kubernetes/pki`, et les kubeconfig des composants (`admin.conf`, `controller-manager.conf`, `scheduler.conf`) sont régénérés dans `/etc/kubernetes`. Sur un control plane à plusieurs nœuds, la commande s'exécute sur **chaque** nœud du control plane. Il faut ensuite mettre à jour le kubeconfig local :

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

Les composants du control plane (kube-apiserver, kube-controller-manager, kube-scheduler, etcd) lisent leurs certificats au démarrage et ne les rechargent pas tous à chaud : ils doivent être redémarrés. Ce sont des **pods statiques**, décrits par des fichiers dans `/etc/kubernetes/manifests` et gérés directement par le kubelet du nœud, sans passer par l'API server. Un `systemctl restart kubelet` ne suffit pas : le kubelet redémarre, mais les conteneurs du control plane continuent de tourner avec les anciens certificats.

La méthode documentée par kubeadm consiste à retirer temporairement les manifestes, ce qui fait arrêter les pods par le kubelet, puis à les remettre en place :

```bash
sudo mkdir -p /root/manifests-backup
sudo cp /etc/kubernetes/manifests/*.yaml /root/manifests-backup/

sudo mkdir -p /tmp/k8s-manifests
sudo mv /etc/kubernetes/manifests/*.yaml /tmp/k8s-manifests/
sleep 20                                   # laisser au kubelet le temps d'arrêter les pods
sudo mv /tmp/k8s-manifests/*.yaml /etc/kubernetes/manifests/

# Vérifier le redémarrage des conteneurs du control plane
sudo crictl ps --name 'kube-apiserver|kube-controller-manager|kube-scheduler|etcd'
```

Supprimer ces pods avec `kubectl delete pod` n'a pas l'effet attendu : l'API ne contient que des *mirror pods*, reflets en lecture des pods statiques. Leur suppression ne touche pas aux conteneurs, et le kubelet recrée aussitôt le reflet.

:::warning
Le redémarrage de l'API server interrompt l'accès au cluster pendant quelques dizaines de secondes sur un control plane à un seul nœud. Sur un control plane hautement disponible, traiter les nœuds un par un maintient le service.
:::

## Automatisation

Un script exécuté par la crontab de root sur chaque nœud du control plane peut renouveler les certificats lorsque l'échéance approche. `openssl x509 -checkend` renvoie un code non nul si le certificat expire dans le délai indiqué (en secondes), ce qui évite d'analyser la sortie texte de kubeadm :

```bash
sudo tee /usr/local/bin/renew-k8s-certs.sh > /dev/null << 'EOF'
#!/bin/bash
set -euo pipefail

# Renouveler si le certificat de l'API server expire dans moins de 30 jours
if ! openssl x509 -checkend $((30 * 86400)) -noout -in /etc/kubernetes/pki/apiserver.crt; then
    cp -a /etc/kubernetes/pki "/root/pki-backup-$(date +%F)"
    kubeadm certs renew all

    # Redémarrer les pods statiques du control plane
    mkdir -p /tmp/k8s-manifests
    mv /etc/kubernetes/manifests/*.yaml /tmp/k8s-manifests/
    sleep 20
    mv /tmp/k8s-manifests/*.yaml /etc/kubernetes/manifests/

    echo "$(date -Is) certificats renouvelés"
fi
EOF

sudo chmod +x /usr/local/bin/renew-k8s-certs.sh

# Vérification hebdomadaire, dans la crontab de root
(sudo crontab -l 2>/dev/null; echo "0 3 * * 1 /usr/local/bin/renew-k8s-certs.sh >> /var/log/renew-k8s-certs.log 2>&1") | sudo crontab -
```

Le script ne recopie pas `admin.conf` vers les kubeconfig des utilisateurs : ceux-ci doivent être mis à jour séparément. Renouveler au moins 30 jours avant l'expiration laisse une marge pour traiter les problèmes imprévus ; une alerte de supervision sur la date d'expiration (par exemple via l'exporter `x509-certificate-exporter` et [Prometheus](../07-monitoring/2025-11-21-prometheus-introduction.md)) complète utilement l'automatisation.

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/professionnel/sonu-k8s-cluster" title="Cluster Kubernetes interne SONU">Renouvellement par `kubeadm certs renew all` des certificats expirés du plan de contrôle, suivi de la recréation des pods statiques par déplacement temporaire de leurs manifestes.</ProjectLink>
</ProjectLinks>
