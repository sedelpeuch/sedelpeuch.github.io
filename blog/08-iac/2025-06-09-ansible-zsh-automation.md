---
title: "Ansible : cas pratique zsh"
description: "Découvrez comment automatiser et versionner votre environnement shell avec Ansible grâce au projet zsh_ansible."
tags: [iac, devops]
---

Dans l'[article précédent](/blog/2025/06/09/08-iac/ansible-introduction), nous avons découvert les bases d'Ansible et ses avantages pour l'automatisation d'infrastructure. Aujourd'hui, nous allons explorer un cas pratique concret : l'automatisation de la configuration de votre shell zsh avec le projet [zsh_ansible](https://github.com/sedelpeuch/zsh_ansible). 🐚

<!--truncate-->

## La problématique de la configuration du shell 🤔

Qui n'a jamais passé des heures à configurer son environnement de travail, installer des plugins, personnaliser son prompt, et définir des alias utiles ? Et qui n'a jamais ressenti de la frustration en changeant de machine et en devant tout recommencer ?

La configuration du shell est un élément essentiel de la productivité des développeurs et administrateurs système. Cependant, cette configuration est souvent :

- **Complexe** : installation de zsh, oh-my-zsh, plugins, thèmes...
- **Fastidieuse** : édition manuelle de fichiers de configuration
- **Non versionnée** : risque de perte lors d'un changement de machine
- **Non reproductible** : configuration différente entre machines

C'est là qu'Ansible entre en jeu, permettant d'automatiser ce processus et de le rendre reproductible.

## Présentation du projet zsh_ansible 📦

[zsh_ansible](https://github.com/sedelpeuch/zsh_ansible) est un playbook Ansible qui permet d'installer et de configurer automatiquement :

- **zsh** comme shell par défaut
- **oh-my-zsh** pour améliorer l'expérience utilisateur
- Des **plugins** populaires comme zsh-autosuggestions et zsh-syntax-highlighting
- Une **configuration personnalisée** via un fichier .zshrc paramétrable

Ce projet suit les bonnes pratiques Ansible et permet de déployer rapidement un environnement zsh cohérent sur n'importe quelle machine Linux.

## Structure du projet 🏗️

Le projet est organisé de manière modulaire avec plusieurs playbooks spécifiques :

```
zsh_ansible/
├── README.md                # Documentation du projet
├── main.yml                 # Playbook principal qui importe les autres playbooks
├── install_zsh.yml          # Playbook pour l'installation de zsh
├── install_oh_my_zsh.yml    # Playbook pour l'installation d'oh-my-zsh et ses plugins
└── install_starship.yml     # Playbook pour l'installation de Starship prompt
```

Cette approche modulaire permet d'exécuter individuellement chaque composant ou l'ensemble du processus via le playbook principal.

## Fonctionnalités principales ✨

Le projet zsh_ansible offre plusieurs fonctionnalités réparties dans ses différents playbooks :

1. **Installation de zsh** avec `install_zsh.yml`
   - Installation du package zsh
   - Récupération d'une configuration .zshrc personnalisée depuis un gist GitHub

2. **Installation d'oh-my-zsh** avec `install_oh_my_zsh.yml`
   - Installation des prérequis (git)
   - Installation d'oh-my-zsh
   - Installation de plugins populaires :
     - zsh-autosuggestions
     - zsh-syntax-highlighting
     - zsh-completions
     - zsh-history-substring-search
     - fast-syntax-highlighting
     - zsh-bat
     - autoupdate
     - autojump

3. **Installation de Starship prompt** avec `install_starship.yml`
   - Installation des prérequis (curl)
   - Installation de Starship (prompteur cross-shell moderne)
   - Récupération d'une configuration Starship personnalisée depuis un gist GitHub

## Utilisation pas à pas 👣

### 1. Cloner le dépôt

```bash
git clone https://github.com/sedelpeuch/zsh_ansible.git
cd zsh_ansible
```

### 2. Exécution locale

Pour exécuter le playbook en local, la façon la plus simple est d'exécuter :

```bash
ansible-playbook main.yml -c local
```

Cela lancera l'installation de tous les composants sur votre machine locale sans avoir besoin de configurer un inventaire.

### 3. Test dans un environnement Docker (optionnel)

Une des forces du projet est la possibilité de le tester facilement dans un conteneur Docker :

```bash
# Télécharger une image Docker avec Ansible préinstallé
docker pull williamyeh/ansible:ubuntu18.04

# Exécuter le playbook dans un conteneur Docker
docker run --rm -it -v $(pwd):/ansible/playbooks williamyeh/ansible:ubuntu18.04 \
  ansible-playbook /ansible/playbooks/main.yml -c local

# Pour examiner le résultat (garde le conteneur en vie)
docker run --rm -it -v $(pwd):/ansible/playbooks williamyeh/ansible:ubuntu18.04 \
  /bin/bash -c "ansible-playbook /ansible/playbooks/main.yml -c local && exec /bin/bash"
```

Cette approche vous permet de tester la configuration sans affecter votre environnement actuel.

### 4. Exécution des playbooks spécifiques

Si vous souhaitez n'installer que certains composants, vous pouvez exécuter les playbooks individuellement :

```bash
# Installation de zsh uniquement
ansible-playbook install_zsh.yml -c local

# Installation d'oh-my-zsh et ses plugins
ansible-playbook install_oh_my_zsh.yml -c local

# Installation de Starship prompt
ansible-playbook install_starship.yml -c local
```

Si vous avez besoin de privilèges d'administration :

```bash
ansible-playbook main.yml -c local --ask-become-pass
```

### 5. Profiter de votre nouveau shell

Après l'exécution du playbook, redémarrez votre terminal ou exécutez :

```bash
zsh
```

Vous devriez maintenant avoir un shell zsh entièrement configuré avec :

- Une configuration .zshrc récupérée depuis un gist personnalisé
- Oh-my-zsh avec de nombreux plugins utiles
- Le prompteur Starship pour une expérience visuelle améliorée

## Code source détaillé 🔍

Examinons quelques parties clés du code du projet.

### Playbook principal (main.yml)

```yaml
- import_playbook: install_zsh.yml
- import_playbook: install_oh_my_zsh.yml
- import_playbook: install_starship.yml
```

Ce playbook principal importe simplement les trois autres playbooks spécifiques.

### Installation de zsh (install_zsh.yml)

```yaml
- name: Ensure zsh is installed
  hosts: all
  become: yes
  tasks:
    - name: Ensure zsh is installed
      apt:
        name: zsh
        state: present

- name: Configure zsh for user
  hosts: all
  tasks:
    - name: Fetch .zshrc from secret gist
      uri:
        url: "https://gist.githubusercontent.com/sedelpeuch/a595fc7352f803c089534b00cba9e2e7/raw"
        return_content: yes
      register: zshrc_content

    - name: Place .zshrc in home directory
      copy:
        content: "{{ zshrc_content.content }}"
        dest: ~/.zshrc
```

### Installation des plugins oh-my-zsh (extrait de install_oh_my_zsh.yml)

```yaml
- name: Ensure oh-my-zsh is installed
  hosts: all
  become: no
  tasks:
    - name: Ensure git is installed
      become: yes
      apt:
        name: git
        state: present

    - name: Check if oh-my-zsh is installed
      stat:
        path: ~/.oh-my-zsh
      register: oh_my_zsh_installed

    - name: Download oh-my-zsh installer
      get_url:
        url: https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh
        dest: /tmp/install_oh_my_zsh.sh
        mode: '0755'
      when: not oh_my_zsh_installed.stat.exists

    - name: Install oh-my-zsh
      shell: /tmp/install_oh_my_zsh.sh --unattended
      when: not oh_my_zsh_installed.stat.exists

    # Installation de divers plugins
    - name: Clone zsh-autosuggestions
      git:
        repo: https://github.com/zsh-users/zsh-autosuggestions
        dest: ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions
      when: not zsh_autosuggestions_installed.stat.exists

    # Autres plugins...
```

## Extensibilité du projet 🔌

Vous pouvez facilement étendre ce projet pour répondre à vos besoins spécifiques :

1. **Personnalisation des fichiers de configuration**
   - Créez vos propres gists GitHub avec vos configurations .zshrc et starship.toml
   - Modifiez les URLs dans les playbooks pour pointer vers vos gists

2. **Ajout de plugins supplémentaires**
   - Ajoutez de nouveaux plugins oh-my-zsh en suivant le modèle des plugins existants
   - Installez d'autres utilitaires en ajoutant des tâches aux playbooks

3. **Support d'autres distributions**
   - Adaptez les commandes d'installation des packages pour d'autres distributions Linux
   - Ajoutez la détection du gestionnaire de paquets pour plus de flexibilité

4. **Intégration avec d'autres outils de développement**
   - Ajoutez l'installation et la configuration d'outils complémentaires (tmux, neovim, etc.)

## Bonnes pratiques et conseils 💡

1. **Testez vos changements dans Docker** avant de les appliquer sur votre environnement principal
2. **Stockez vos configurations sensibles** dans des gists privés ou un gestionnaire de secrets
3. **Créez un fork** du projet pour l'adapter à vos besoins spécifiques
4. **Maintenez votre propre dépôt** pour suivre l'évolution de vos configurations shell
5. **Documentez vos personnalisations** pour faciliter la collaboration et le partage

## Avantages de cette approche 🚀

L'utilisation d'Ansible pour configurer votre environnement zsh offre plusieurs avantages :

- **Reproductibilité** : même environnement sur toutes vos machines
- **Versionnement** : suivre l'évolution de votre configuration
- **Partage** : faciliter l'onboarding de nouveaux membres d'équipe
- **Maintien** : mise à jour facile de la configuration
- **Documentation** : le code Ansible documente votre setup

## Application / Projet lié

### [zsh_ansible](/docs/projects/personnel/zsh_ansible)
**Utilisation** : Ce blog article documente exactement le projet zsh_ansible - une automatisation complète de la configuration du shell de développement.

## Conclusion 🎯

Le projet zsh_ansible démontre parfaitement comment Ansible peut être utilisé au-delà de la configuration de serveurs, pour automatiser même vos environnements de développement. Cette approche "infrastructure as code" appliquée à votre environnement de travail personnel vous fait gagner un temps précieux et assure une cohérence entre vos différentes machines.

N'hésitez pas à explorer le [dépôt GitHub du projet](https://github.com/sedelpeuch/zsh_ansible), à le forker et à l'adapter à vos besoins spécifiques. Et surtout, partagez vos améliorations avec la communauté !

Vous utilisez déjà Ansible pour d'autres automatisations personnelles ? Partagez vos expériences dans les commentaires !
