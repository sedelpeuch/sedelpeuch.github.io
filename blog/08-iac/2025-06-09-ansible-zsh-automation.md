---
title: "Ansible : cas pratique zsh"
description: "Automatiser et versionner un environnement shell zsh avec Ansible : structure du projet zsh_ansible, exécution locale, idempotence des tâches et tests en conteneur."
tags: [iac, devops]
---

La configuration d'un environnement shell (zsh, oh-my-zsh, plugins, prompt, alias) s'accumule au fil des années sur un poste de travail, sans trace de sa construction. Le jour d'un changement de machine, elle doit être reconstituée de mémoire. Le projet [zsh_ansible](https://github.com/sedelpeuch/zsh_ansible) applique à ce problème les principes présentés dans l'article [Ansible](./2025-06-09-ansible-introduction.md) : la configuration devient un ensemble de playbooks versionnés, rejouables sur n'importe quelle machine Linux.

<!--truncate-->

## La problématique de la configuration du shell

Une configuration de shell faite à la main présente les défauts de toute configuration non automatisée :

- **Complexe** : installation de zsh, oh-my-zsh, plugins, thèmes, chacun avec sa propre procédure
- **Fastidieuse** : édition manuelle de fichiers de configuration
- **Non versionnée** : aucune trace des modifications, risque de perte lors d'un changement de machine
- **Non reproductible** : configurations qui divergent d'une machine à l'autre

Ansible traite ce cas comme n'importe quel serveur : l'état souhaité est décrit dans des playbooks, et leur exécution amène la machine dans cet état.

## Présentation du projet zsh_ansible

[zsh_ansible](https://github.com/sedelpeuch/zsh_ansible) est un ensemble de playbooks Ansible qui installe et configure :

- **zsh** et un fichier `.zshrc` personnalisé
- **oh-my-zsh**, framework de gestion de la configuration zsh
- des **plugins** comme zsh-autosuggestions et zsh-syntax-highlighting
- le prompt **Starship** et sa configuration

Le projet cible les distributions Debian et Ubuntu (module `apt`).

## Structure du projet

Le projet est organisé en plusieurs playbooks spécialisés :

```text
zsh_ansible/
├── README.md                # Documentation du projet
├── main.yml                 # Playbook principal qui importe les autres playbooks
├── install_zsh.yml          # Playbook pour l'installation de zsh
├── install_oh_my_zsh.yml    # Playbook pour l'installation d'oh-my-zsh et ses plugins
└── install_starship.yml     # Playbook pour l'installation de Starship prompt
```

Ce découpage permet d'exécuter chaque composant séparément, ou l'ensemble via le playbook principal.

## Fonctionnalités principales

Les fonctionnalités se répartissent entre les playbooks :

1. **Installation de zsh** avec `install_zsh.yml`
   - Installation du paquet zsh
   - Récupération d'une configuration `.zshrc` personnalisée depuis un gist GitHub

2. **Installation d'oh-my-zsh** avec `install_oh_my_zsh.yml`
   - Installation des prérequis (git)
   - Installation d'oh-my-zsh
   - Installation de plugins :
     - zsh-autosuggestions
     - zsh-syntax-highlighting
     - zsh-completions
     - zsh-history-substring-search
     - fast-syntax-highlighting
     - zsh-bat
     - autoupdate
     - autojump

3. **Installation de Starship** avec `install_starship.yml`
   - Installation des prérequis (curl)
   - Installation de Starship (prompt multi-shell écrit en Rust)
   - Récupération d'une configuration Starship personnalisée depuis un gist GitHub

## Utilisation pas à pas

### 1. Cloner le dépôt

```bash
git clone https://github.com/sedelpeuch/zsh_ansible.git
cd zsh_ansible
```

### 2. Exécution locale

Les playbooks ciblent `hosts: all`. Sans fichier d'inventaire, Ansible ne connaît que l'hôte implicite `localhost`, qui **n'appartient pas** au groupe `all` : le playbook serait ignoré avec l'avertissement « provided hosts list is empty ». L'option `-i localhost,` (la virgule finale indique une liste d'hôtes et non un fichier) crée un inventaire contenant `localhost`, et `-c local` exécute les tâches directement, sans SSH :

```bash
# Inventaire en ligne + connexion locale ; -K demande le mot de passe sudo pour les tâches become
ansible-playbook -i localhost, -c local main.yml -K
```

### 3. Test dans un conteneur Docker (optionnel)

Tester les playbooks dans un conteneur jetable évite de modifier le poste de travail et vérifie qu'ils fonctionnent sur un système vierge :

```bash
# Ubuntu minimal, Ansible installé à la volée, dépôt monté en lecture seule
docker run --rm -it -v "$(pwd)":/playbooks:ro -w /playbooks ubuntu:24.04 bash -c '
  export DEBIAN_FRONTEND=noninteractive &&
  apt-get update && apt-get install -y ansible sudo &&
  ansible-playbook -i localhost, -c local main.yml &&
  exec zsh'
```

Le conteneur s'exécute en root : les tâches marquées `become` ne demandent pas de mot de passe, et `exec zsh` ouvre le shell obtenu pour l'inspecter.

### 4. Exécution des playbooks spécifiques

Chaque composant peut être installé séparément :

```bash
# Installation de zsh uniquement
ansible-playbook -i localhost, -c local install_zsh.yml -K

# Installation d'oh-my-zsh et ses plugins
ansible-playbook -i localhost, -c local install_oh_my_zsh.yml -K

# Installation de Starship prompt
ansible-playbook -i localhost, -c local install_starship.yml -K
```

### 5. Utiliser le nouveau shell

Après l'exécution des playbooks, `zsh` lance le shell configuré. Pour en faire le shell de connexion de l'utilisateur :

```bash
chsh -s "$(command -v zsh)"
```

La configuration comprend alors :

- un fichier `.zshrc` récupéré depuis un gist
- oh-my-zsh et ses plugins
- le prompt Starship

## Code source détaillé

### Playbook principal (main.yml)

```yaml
- import_playbook: install_zsh.yml
- import_playbook: install_oh_my_zsh.yml
- import_playbook: install_starship.yml
```

`import_playbook` est une inclusion **statique** : les playbooks importés sont lus et fusionnés au moment de l'analyse de `main.yml`, avant toute exécution.

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

Le premier play s'exécute avec élévation de privilèges pour installer le paquet ; le second, sans `become`, écrit dans le répertoire de l'utilisateur courant. Le module `copy` compare le contenu reçu au fichier existant et ne le réécrit (et ne signale un changement) que s'ils diffèrent : la tâche est idempotente. La tâche `uri`, elle, télécharge le gist à chaque exécution.

Rendre zsh shell par défaut relève d'un module dédié, qui modifie `/etc/passwd` de façon idempotente :

```yaml
    - name: Définir zsh comme shell de connexion
      become: yes
      ansible.builtin.user:
        name: "{{ ansible_user_id }}"
        shell: /usr/bin/zsh
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

    # Installation de divers plugins (la tâche stat qui définit la variable est omise)
    - name: Clone zsh-autosuggestions
      git:
        repo: https://github.com/zsh-users/zsh-autosuggestions
        dest: ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions
      when: not zsh_autosuggestions_installed.stat.exists

    # Autres plugins...
```

Le couple `stat` + `when` rend idempotente une tâche `shell`, qui ne l'est pas par nature : le script d'installation n'est lancé que si `~/.oh-my-zsh` n'existe pas. L'option `creates` du module `shell` obtient le même effet en une seule tâche :

```yaml
    - name: Install oh-my-zsh
      ansible.builtin.shell: /tmp/install_oh_my_zsh.sh --unattended
      args:
        creates: ~/.oh-my-zsh     # tâche ignorée si ce chemin existe
```

Pour les plugins, le module `git` est lui-même idempotent : il clone le dépôt s'il est absent et, sinon, le met à jour vers la révision demandée (option `version`, `HEAD` par défaut). La vérification préalable par `stat` n'est donc pas nécessaire ; la supprimer permet en outre de mettre à jour les plugins à chaque exécution.

## Extensibilité du projet

Le projet se prête à plusieurs extensions :

1. **Personnalisation des fichiers de configuration**
   - Créer ses propres gists avec des fichiers `.zshrc` et `starship.toml`
   - Modifier les URL dans les playbooks pour pointer vers ces gists, ou versionner les fichiers directement dans le dépôt et les déployer avec `ansible.builtin.template`

2. **Ajout de plugins supplémentaires**
   - Ajouter des plugins oh-my-zsh sur le modèle des plugins existants, idéalement sous forme de boucle `loop` sur une liste de dépôts
   - Installer d'autres utilitaires en ajoutant des tâches aux playbooks

3. **Support d'autres distributions**
   - Remplacer `apt` par le module générique `ansible.builtin.package`, qui délègue au gestionnaire de paquets détecté
   - Utiliser les *facts* (`ansible_os_family`) pour les cas où les noms de paquets diffèrent

4. **Intégration avec d'autres outils de développement**
   - Ajouter l'installation et la configuration d'outils complémentaires (tmux, neovim, etc.)

## Bonnes pratiques et conseils

1. **Tester les changements dans un conteneur** avant de les appliquer sur l'environnement principal
2. **Ne pas placer d'informations sensibles dans un gist** : un gist « secret » n'est pas privé, il est seulement non référencé, et reste lisible par quiconque connaît son URL. Les secrets relèvent d'[Ansible Vault](./2025-11-28-ansible-vault.md) ou d'un gestionnaire de secrets
3. **Créer un fork** du projet pour l'adapter à ses besoins
4. **Maintenir son propre dépôt** pour suivre l'évolution de sa configuration
5. **Documenter les personnalisations** pour faciliter leur partage

## Avantages de cette approche

L'utilisation d'Ansible pour configurer un environnement zsh apporte :

- **Reproductibilité** : même environnement sur toutes les machines
- **Versionnement** : historique des évolutions de la configuration
- **Partage** : un environnement commun pour une équipe, utile à l'intégration des nouveaux arrivants
- **Maintenance** : une modification se propage par une nouvelle exécution des playbooks
- **Documentation** : les playbooks décrivent précisément l'installation

## Application / Projet lié

### [zsh_ansible](/docs/projects/personnel/zsh_ansible)
**Utilisation** : Cet article documente le projet zsh_ansible, une automatisation complète de la configuration du shell de développement.

## Conclusion

Le projet zsh_ansible applique les mécanismes d'Ansible (modules idempotents, conditions, exécution locale) à un poste de travail plutôt qu'à un serveur. Les points d'attention sont ceux de tout playbook : garantir l'idempotence des tâches `shell`, construire un inventaire valide pour l'exécution locale, et tenir les données sensibles hors des fichiers publics.

Le [dépôt GitHub du projet](https://github.com/sedelpeuch/zsh_ansible) contient l'ensemble des playbooks.
