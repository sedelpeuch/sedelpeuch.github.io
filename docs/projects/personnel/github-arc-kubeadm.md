---
title: GitHub ARC Kubeadm
---

GitHub Actions Runner Controller (ARC) permet d’héberger ses propres runners GitHub Actions sur un cluster Kubernetes, pour exécuter des workflows CI/CD de façon flexible, scalable et maîtrisée. Le chart Helm helm_github-arc (CATIE) facilite le déploiement de cette solution sur une infrastructure kubeadm.

J’ai eu l’occasion de déployer ARC sur kubeadm dans un contexte professionnel, pour industrialiser l’intégration continue sur une infrastructure privée. Ce retour terrain a permis de valider la robustesse de la solution, sa simplicité de gestion via Helm, et la flexibilité offerte pour adapter les runners aux besoins métiers (accès réseau, ressources, sécurité).

## Présentation

Par défaut, les workflows GitHub Actions s’exécutent sur des runners hébergés par GitHub. Pour des besoins avancés (confidentialité, ressources spécifiques, coûts, intégration locale), il est possible d’auto-héberger ses runners. ARC orchestre dynamiquement des runners éphémères dans Kubernetes : chaque job CI lance un pod runner, qui disparaît à la fin du workflow.

Le chart Helm helm_github-arc automatise l’installation et la configuration d’ARC sur un cluster kubeadm, rendant la solution accessible même à des équipes non-expertes de Kubernetes. On bénéficie ainsi de l’auto-scaling, de la gestion fine des droits, et d’une intégration native avec GitHub.

## Usages et contexte

- Plateformes d’intégration continue privées ou hybrides
- Besoin de runners avec des outils ou ressources spécifiques (GPU, stockage, réseau)
- Optimisation des coûts et de la sécurité (runners jetables, isolation forte)
- Déploiement sur clusters kubeadm (on-premise, cloud, lab)

## Technologies

- **Kubernetes** (kubeadm)
- **Helm** (déploiement)
- **Actions Runner Controller (ARC)**
- **GitHub Actions**

## Liens et ressources

- [Documentation officielle GitHub ARC](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/autoscaling-with-self-hosted-runners)
- [Code source ARC](https://github.com/actions/actions-runner-controller)

> « ARC, c’est la passerelle entre la puissance de Kubernetes et la flexibilité de GitHub Actions, pour une CI/CD sur-mesure. »
