---
title: "Conteneurisation vs Virtualisation"
description: "Différences architecturales entre conteneurs Docker et machines virtuelles : isolation, taille, démarrage et cas d'usage."
tags: [containerization, devops]
---

Conteneurs et machines virtuelles répondent au même besoin d'isolation des applications, mais à des niveaux différents de la pile système. Comprendre cette différence architecturale explique pourquoi les deux technologies coexistent plutôt que l'une remplace l'autre.

<!--truncate-->

## Architecture

Une machine virtuelle émule un ordinateur complet. L'hyperviseur (VMware, VirtualBox, KVM) s'exécute sur le matériel et expose des ressources virtualisées à chaque VM. Chaque VM embarque son propre noyau OS, ses pilotes, et l'ensemble des processus système — comme si c'était une machine physique indépendante.

Un conteneur ne virtualise pas le matériel. Il partage le noyau de la machine hôte et isole les processus via les namespaces Linux (réseau, PID, filesystem, utilisateurs) et les cgroups (limites de ressources). Le conteneur voit son propre système de fichiers, ses interfaces réseau et ses processus, mais tous s'exécutent sur le même noyau.

```
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

## Compatibilité

Un conteneur Linux nécessite un noyau Linux pour s'exécuter. Sur Windows et macOS, Docker Desktop contourne cette contrainte en démarrant une VM Linux légère (HyperKit sur Mac, WSL2 sur Windows) qui héberge le daemon Docker. Les conteneurs s'exécutent dans cette VM — pas directement sur l'OS hôte.

Cette distinction a une conséquence pratique : une image Docker construite sur Linux ARM64 ne peut pas s'exécuter sur un hôte Linux AMD64 sans émulation. Le flag `--platform` de `docker build` et les manifests multi-architecture (`buildx`) permettent de produire des images compatibles avec plusieurs architectures depuis un seul pipeline.

## Quand utiliser quoi

Les conteneurs conviennent pour déployer des applications à grande densité, faciliter la reproductibilité entre environnements (dev → staging → prod), et faire tourner des microservices dans Kubernetes.

Les VMs conviennent pour l'isolation forte entre clients dans un cloud mutualisé, les workloads Windows sur infrastructure Linux, et les environnements où la surface d'attaque du noyau partagé est inacceptable.

Les deux se combinent fréquemment : les conteneurs tournent à l'intérieur de VMs dans la quasi-totalité des clusters Kubernetes cloud, cumulant l'isolation des VMs au niveau de l'hôte et la densité des conteneurs au niveau des workloads.
