---
title: Zsh Ansible Automation
---

<div className="project-meta-grid">
  <div className="project-meta-item">📅 Depuis 2024</div>
  <div className="project-meta-item">📖 Provisioning shell, Ansible, zsh, productivité</div>
  <div className="project-meta-item">🔎 Automatiser la config zsh/oh-my-zsh/plugins/starship en 1 commande</div>
</div>

## Contexte

Automatiser la configuration d’un environnement shell moderne (zsh, oh-my-zsh, plugins, starship) de façon reproductible, sans intervention manuelle. Objectif : provisionner rapidement un poste ou un conteneur de dev, en local ou via Docker, avec une seule commande Ansible.

## Démarche et apprentissages 🚀

- Découpage en playbooks : install_zsh.yml, install_oh_my_zsh.yml, install_starship.yml
- Orchestration via main.yml (import_playbook)
- Installation idempotente : vérification de l’existant avant chaque étape
- Récupération de configs personnalisées (zshrc, starship.toml) depuis des gists
- Test et usage en local ou dans un conteneur Docker (pas de SSH requis)
- Respect des bonnes pratiques Ansible (séparation des rôles, become, variables)

## Résultats et suites possibles

- Provisioning complet d’un shell moderne en 1 commande (zsh, oh-my-zsh, plugins, starship)
- Reproductibilité garantie sur tout environnement compatible Ansible
- Utilisation ultra-rapide en local ou Docker (exemple : ansible-playbook main.yml -c local)
- Pistes : ajout de rôles, support multi-OS, publication de tutos détaillés

## Liens et ressources 🔗

- [Dépôt GitHub](https://github.com/sedelpeuch/zsh_ansible)
- [README](https://github.com/sedelpeuch/zsh_ansible#readme)
- [Article de blog associé : Ansible : cas pratique zsh](/blog/08-iac/2025-06-09-ansible-zsh-automation)
