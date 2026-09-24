---
title: "Conteneurisation vs Virtualisation"
description: "Différences architecturales entre conteneurs Docker et machines virtuelles : isolation, taille, démarrage et cas d'usage."
tags: [containerization, devops]
authors: sedelpeuch
---

Conteneurs et machines virtuelles répondent au même besoin d'isolation des applications, mais à des niveaux différents de la pile système. Comprendre cette différence architecturale explique pourquoi les deux technologies coexistent plutôt que l'une remplace l'autre.

<!--truncate-->

## Architecture

Une machine virtuelle émule un ordinateur complet. L'hyperviseur expose des ressources virtualisées (CPU, mémoire, disques, cartes réseau) à chaque VM. Un hyperviseur de type 1 s'exécute directement sur le matériel (VMware ESXi, Xen, KVM intégré au noyau Linux) ; un hyperviseur de type 2 s'exécute comme une application sur un OS hôte (VirtualBox, VMware Workstation). Les extensions matérielles de virtualisation (Intel VT-x, AMD-V) permettent d'exécuter le code des VM directement sur le processeur, l'hyperviseur n'intervenant que sur les instructions privilégiées. Chaque VM embarque son propre noyau OS, ses pilotes, et l'ensemble des processus système — comme si c'était une machine physique indépendante.

Un conteneur ne virtualise pas le matériel. Il partage le noyau de la machine hôte et isole les processus via les namespaces Linux (réseau, PID, filesystem, utilisateurs) et les cgroups (limites de ressources). Le conteneur voit son propre système de fichiers, ses interfaces réseau et ses processus, mais tous s'exécutent sur le même noyau.

Ce partage se vérifie directement : un conteneur rapporte la version du noyau de l'hôte, quelle que soit la distribution de son image, et ses processus apparaissent dans la table des processus de l'hôte.

```bash
# Version du noyau sur l'hôte
uname -r
# 6.8.0-45-generic

# Même valeur depuis un conteneur Alpine : aucun noyau n'est embarqué dans l'image
docker run --rm alpine uname -r
# 6.8.0-45-generic

# Un processus lancé dans un conteneur est visible depuis l'hôte (avec un autre PID)
docker run -d --name demo alpine sleep 300
ps -ef | grep "sleep 300"

# Namespaces associés à ce processus
sudo lsns -p "$(docker inspect -f '{{.State.Pid}}' demo)"
```

```text
Machine physique
├── VM (hyperviseur)
│   ├── Noyau Linux/Windows complet
│   ├── Processus système
│   └── Application
└── VM (hyperviseur)
    ├── Noyau Linux/Windows complet
    └── Application

Machine physique
└── Noyau Linux (partagé)
    ├── Conteneur (namespace)
    │   └── Application
    └── Conteneur (namespace)
        └── Application
```

## Comparaison

| Critère | Conteneur | Machine virtuelle |
|---------|-----------|-------------------|
| Taille | Quelques Mo (Alpine : 7 Mo) | Plusieurs Go (Ubuntu : ~2 Go) |
| Démarrage | Millisecondes | Dizaines de secondes |
| Isolation | Noyau partagé | Noyau isolé |
| Sécurité | Moindre (kernel partagé) | Forte (hyperviseur entre les VMs) |
| Portabilité | Images légères, registry standard | Images lourdes, formats propriétaires |
| Compatibilité OS | Limité au noyau hôte | N'importe quel OS sur n'importe quel hôte |

## Isolation et sécurité

Le partage du noyau est la principale limite des conteneurs en matière de sécurité. Une vulnérabilité au niveau du noyau peut potentiellement affecter tous les conteneurs d'un même hôte. Les VMs offrent une isolation plus forte — une VM compromise ne peut pas accéder au noyau de l'hôte ni aux autres VMs via l'hyperviseur.

Pour les workloads nécessitant une isolation forte (multi-tenant, code non fiable), les VMs restent la référence. Les conteneurs sont préférés pour les applications de confiance où la densité et la vitesse de démarrage comptent.

Plusieurs technologies occupent l'espace intermédiaire en conservant l'interface des conteneurs (images OCI, runtime compatible Kubernetes) tout en réduisant la surface du noyau exposée :

- **gVisor** intercepte les appels système du conteneur dans un noyau applicatif écrit en Go : le conteneur n'accède plus directement au noyau de l'hôte.
- **Kata Containers** exécute chaque conteneur (ou pod) dans une micro-VM dotée de son propre noyau, démarrée en une fraction de seconde.
- **Firecracker**, le moniteur de micro-VM développé par AWS, isole chaque fonction Lambda et chaque tâche Fargate dans une VM minimale.

## Compatibilité

Un conteneur Linux nécessite un noyau Linux pour s'exécuter. Sur Windows et macOS, Docker Desktop contourne cette contrainte en démarrant une VM Linux légère (Apple Virtualization Framework sur macOS, HyperKit dans les anciennes versions ; WSL2 sur Windows) qui héberge le daemon Docker. Les conteneurs s'exécutent dans cette VM — pas directement sur l'OS hôte.

Cette distinction a une conséquence pratique : une image Docker construite sur Linux ARM64 ne peut pas s'exécuter sur un hôte Linux AMD64 sans émulation (QEMU via `binfmt_misc`, avec un coût important en performances). Le flag `--platform` de `docker build` et les manifests multi-architecture (`buildx`) permettent de produire des images compatibles avec plusieurs architectures depuis un seul pipeline.

## Quand utiliser quoi

Les conteneurs conviennent pour déployer des applications à grande densité, faciliter la reproductibilité entre environnements (dev → staging → prod), et faire tourner des microservices dans Kubernetes.

Les VMs conviennent pour l'isolation forte entre clients dans un cloud mutualisé, les workloads Windows sur infrastructure Linux, et les environnements où la surface d'attaque du noyau partagé est inacceptable.

Les deux se combinent fréquemment : les conteneurs tournent à l'intérieur de VMs dans la quasi-totalité des clusters Kubernetes cloud, cumulant l'isolation des VMs au niveau de l'hôte et la densité des conteneurs au niveau des workloads.
