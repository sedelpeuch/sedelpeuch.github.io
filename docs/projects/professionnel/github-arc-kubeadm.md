---
title: GitHub ARC Kubeadm
---

<img src="/img/project/github-arc-kubeadm.png" alt="Aperçu GitHub ARC Kubeadm" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<div className="project-meta-grid">
  <div className="project-meta-item">📅 2024-2025</div>
  <div className="project-meta-item">📖 CI/CD, Kubernetes, GitHub Actions</div>
  <div className="project-meta-item">🔎 Expérimenter l’auto-hébergement de runners GitHub Actions sur un cluster Kubeadm</div>
</div>

## Contexte

Ce projet vise à déployer et maintenir des GitHub Actions Runners auto-hébergés (ARC) sur un cluster Kubernetes provisionné avec kubeadm. L’objectif est de gagner en maîtrise, en flexibilité et en sécurité pour l’exécution de pipelines CI/CD, tout en optimisant les coûts et la scalabilité par rapport aux runners GitHub hébergés.

## Démarche et apprentissages 🚀

- Installation et configuration d’un cluster Kubernetes avec kubeadm (VMs, bare metal)
- Déploiement des runners GitHub ARC via Helm charts ou manifests YAML
- Gestion de la sécurité, de l’isolation et de la montée en charge des jobs CI/CD
- Automatisation du cycle de vie des runners (scaling, mise à jour, monitoring)
- Documentation des choix techniques, des problèmes rencontrés et des solutions apportées

## Résultats et suites possibles

- Plateforme CI/CD flexible, maîtrisée et évolutive pour les projets personnels et associatifs
- Réduction des coûts d’exécution des pipelines, meilleure intégration avec l’infrastructure existante
- Base d’expérimentation pour d’autres orchestrateurs ou solutions de runners (Nomad, OpenTofu…)
- Poursuite de la documentation et partage de la démarche

## Liens et ressources 🔗

- 📖 Documentation Kubeadm : [https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/)
- 📖 GitHub ARC : [https://docs.github.com/fr/actions/hosting-your-own-runners/about-self-hosted-runners](https://docs.github.com/fr/actions/hosting-your-own-runners/about-self-hosted-runners)

---

> Un projet pour maîtriser l’exécution CI/CD, optimiser les coûts et explorer l’auto-hébergement sur Kubernetes.
