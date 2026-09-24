---
title: "Ansible : avancé"
description: "Fonctionnalités avancées d'Ansible : rôles, priorité des variables, collections, secrets, organisation d'un projet, tags et gestion des erreurs."
tags: [iac, devops]
---

L'[article d'introduction à Ansible](./2025-06-09-ansible-introduction.md) couvrait l'inventaire, les playbooks et les modules. Dès que le nombre de playbooks et d'environnements augmente, d'autres mécanismes deviennent nécessaires pour éviter la duplication : rôles, collections, gestion des secrets, organisation des inventaires et traitement des erreurs.

<!--truncate-->

## Les rôles Ansible : modularité et réutilisabilité

Les rôles sont l'unité de réutilisation d'Ansible : un rôle regroupe les tâches, handlers, variables, templates et fichiers nécessaires à une fonction (serveur web, base de données), et s'applique à n'importe quel groupe d'hôtes.

### Structure d'un rôle

Un rôle suit une structure de répertoires standardisée :

```text
roles/
└── webserver/
    ├── defaults/           # Variables par défaut (priorité la plus basse)
    │   └── main.yml
    ├── vars/              # Variables du rôle (priorité haute)
    │   └── main.yml
    ├── tasks/             # Tâches principales du rôle
    │   └── main.yml
    ├── handlers/          # Gestionnaires d'événements
    │   └── main.yml
    ├── templates/         # Templates Jinja2
    │   └── nginx.conf.j2
    ├── files/             # Fichiers statiques
    │   └── index.html
    ├── meta/              # Métadonnées et dépendances
    │   └── main.yml
    └── README.md          # Documentation du rôle
```

### Créer un rôle avec ansible-galaxy

```bash
# Créer la structure d'un nouveau rôle
ansible-galaxy role init webserver

# Créer un rôle dans un répertoire spécifique
ansible-galaxy role init --init-path roles webserver

# Voir la structure créée
tree roles/webserver
```

### Exemple de rôle complet : webserver

**tasks/main.yml**

```yaml
---
# Installation et configuration de Nginx
- name: Installer les paquets requis
  apt:
    name:
      - nginx
      - python3-pip
    state: present
    update_cache: yes

- name: Configurer Nginx
  template:
    src: nginx.conf.j2
    dest: /etc/nginx/sites-available/{{ site_name }}
    owner: root
    group: root
    mode: '0644'
  notify: reload nginx

- name: Activer le site
  file:
    src: /etc/nginx/sites-available/{{ site_name }}
    dest: /etc/nginx/sites-enabled/{{ site_name }}
    state: link
  notify: reload nginx

- name: Déployer le contenu du site
  template:
    src: index.html.j2
    dest: /var/www/{{ site_name }}/index.html
    owner: www-data
    group: www-data
    mode: '0644'

- name: S'assurer que Nginx est démarré
  service:
    name: nginx
    state: started
    enabled: yes
```

**defaults/main.yml**

```yaml
---
# Variables par défaut du rôle webserver
site_name: example.com
document_root: /var/www/{{ site_name }}
server_port: 80
server_name: "{{ site_name }}"
```

`document_root` et `server_name` référencent `site_name` : les variables Ansible sont évaluées paresseusement, au moment de leur utilisation. Surcharger `site_name` au niveau du playbook modifie donc aussi `document_root`, sans avoir à le redéfinir.

**vars/main.yml**

```yaml
---
# Variables spécifiques au rôle (priorité plus haute)
nginx_worker_processes: auto
nginx_worker_connections: 1024
```

La différence entre `defaults/` et `vars/` tient à leur place dans l'ordre de priorité des variables, qui compte plus de vingt niveaux. Les plus courants, du plus faible au plus fort :

1. `defaults/main.yml` du rôle
2. `group_vars/all`, puis `group_vars/<groupe>`, puis `host_vars/<hôte>` de l'inventaire
3. `vars:` du play et fichiers `vars_files`
4. `vars/main.yml` du rôle
5. `set_fact` et variables enregistrées (`register`), puis paramètres passés au rôle dans le playbook
6. `-e` / `--extra-vars` en ligne de commande, qui l'emportent sur tout

Un rôle place donc dans `defaults/` tout ce que l'utilisateur doit pouvoir adapter par l'inventaire, et dans `vars/` les constantes internes qu'aucune variable d'inventaire ne doit écraser.

**handlers/main.yml**

```yaml
---
# Gestionnaires pour Nginx
- name: reload nginx
  service:
    name: nginx
    state: reloaded

- name: restart nginx
  service:
    name: nginx
    state: restarted
```

**templates/nginx.conf.j2**

```jinja2
server {
    listen {{ server_port }};
    server_name {{ server_name }};

    root {{ document_root }};
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    access_log /var/log/nginx/{{ site_name }}_access.log;
    error_log /var/log/nginx/{{ site_name }}_error.log;
}
```

**meta/main.yml**

```yaml
---
# Métadonnées et dépendances du rôle
galaxy_info:
  author: Nom de l'auteur
  description: Installation et configuration de Nginx
  company: Organisation
  license: MIT
  min_ansible_version: "2.15"

  platforms:
    - name: Ubuntu
      versions:
        - jammy
        - noble
    - name: Debian
      versions:
        - bookworm
        - trixie

  galaxy_tags:
    - nginx
    - webserver
    - web

dependencies: []
```

`dependencies` liste des rôles exécutés automatiquement avant celui-ci (par exemple un rôle `common` qui configure le pare-feu et les utilisateurs).

### Utiliser un rôle dans un playbook

```yaml
---
- name: Configurer les serveurs web
  hosts: webservers
  become: yes

  roles:
    - role: webserver
      vars:
        site_name: monsite.com
        server_port: 8080

# Ou avec une syntaxe plus détaillée
- name: Configurer avec des conditions
  hosts: webservers
  become: yes

  roles:
    - role: webserver
      when: ansible_os_family == "Debian"
      tags:
        - nginx
        - web
```

## Collections Ansible

Les collections sont le format de distribution du contenu Ansible : un paquet versionné qui regroupe modules, plugins, rôles et playbooks sous un espace de noms (`community.general`, `amazon.aws`). Depuis Ansible 2.10, la quasi-totalité des modules, auparavant livrés avec le moteur, sont distribués ainsi ; `ansible-core` ne contient plus que la collection `ansible.builtin`.

### Installer une collection

```bash
# Installer depuis Ansible Galaxy
ansible-galaxy collection install community.general

# Installer depuis un fichier requirements.yml
ansible-galaxy collection install -r requirements.yml

# Installer une version spécifique
ansible-galaxy collection install community.general:5.8.0
```

### Fichier requirements.yml

```yaml
---
collections:
  # Depuis Ansible Galaxy
  - name: community.general
    version: ">=5.0.0"

  - name: ansible.posix
    version: "1.5.1"

  - name: community.docker

  # Depuis un dépôt Git
  - name: https://github.com/organisation/ma-collection.git
    type: git
    version: main
```

### Utiliser une collection

```yaml
---
- name: Utiliser des modules de collections
  hosts: all

  tasks:
    # Méthode 1 : FQCN (Fully Qualified Collection Name)
    - name: Installer un paquet avec community.general
      community.general.npm:
        name: express
        global: yes

    # Méthode 2 : déclarer la collection, puis utiliser le nom court du module
    - name: Docker tasks
      collections:
        - community.docker
      block:
        - docker_container:
            name: nginx
            image: nginx:1.27-alpine
            state: started
```

La forme FQCN reste recommandée : elle rend chaque tâche non ambiguë, alors que le nom court dépend de l'ordre de recherche des collections déclarées.

### Créer sa propre collection

```bash
# Créer la structure d'une collection
ansible-galaxy collection init mon_namespace.ma_collection
```

```text
mon_namespace/
└── ma_collection/
    ├── docs/
    ├── galaxy.yml          # Métadonnées de la collection
    ├── plugins/
    │   ├── modules/        # Modules personnalisés
    │   ├── inventory/      # Plugins d'inventaire
    │   └── lookup/         # Plugins lookup
    ├── roles/              # Rôles inclus dans la collection
    ├── playbooks/          # Playbooks d'exemple
    └── README.md
```

## Ansible Vault : secrets chiffrés

Les rôles et les inventaires contiennent souvent des mots de passe ou des clés d'API. Ansible Vault les chiffre en AES-256, soit par fichier entier (`ansible-vault encrypt group_vars/all/vault.yml`), soit variable par variable (`ansible-vault encrypt_string`), et les déchiffre en mémoire au moment de l'exécution (`--ask-vault-pass`, `--vault-password-file` ou `--vault-id`). La convention consiste à préfixer les variables chiffrées par `vault_` et à les référencer depuis un fichier en clair (`db_password: "{{ vault_db_password }}"`), pour que les noms de variables restent lisibles et recherchables dans le dépôt. Le fonctionnement détaillé, la gestion des mots de passe et les identifiants de Vault font l'objet de l'article [Ansible Vault](./2025-11-28-ansible-vault.md).

## Application / Projet lié

### [Cluster Kubernetes SONU](/docs/projects/professionnel/sonu-k8s-cluster)
**Utilisation** : Playbooks avancés et structures de rôles pour la gestion complexe du cluster Kubernetes, configurations persistantes et secrets sécurisés.

## Bonnes pratiques avancées

### 1. Structure de projet recommandée

```text
ansible-project/
├── ansible.cfg
├── inventories/
│   ├── production/
│   │   ├── hosts.yml
│   │   └── group_vars/
│   │       ├── all.yml
│   │       └── webservers.yml
│   └── staging/
│       ├── hosts.yml
│       └── group_vars/
├── roles/
│   ├── common/
│   ├── webserver/
│   └── database/
├── playbooks/
│   ├── deploy.yml
│   ├── rollback.yml
│   └── maintenance.yml
├── collections/
│   └── requirements.yml
├── group_vars/
│   └── all/
│       ├── vars.yml
│       └── vault.yml
└── README.md
```

Un répertoire d'inventaire par environnement porte ses propres `group_vars` : le même playbook s'applique à la production ou à la préproduction selon l'inventaire passé avec `-i inventories/production`, sans condition sur l'environnement dans le code.

### 2. Utiliser des tags stratégiquement

```yaml
---
- name: Configuration complète
  hosts: webservers

  tasks:
    - name: Installer les paquets
      apt:
        name:                 # une liste : un seul appel au gestionnaire de paquets
          - nginx
          - python3
        state: present
      tags:
        - install
        - packages

    - name: Configurer Nginx
      template:
        src: nginx.conf.j2
        dest: /etc/nginx/nginx.conf
      tags:
        - config
        - nginx

    - name: Déployer l'application
      copy:
        src: app/
        dest: /var/www/app/
      tags:
        - deploy
        - app

```

```bash
# Exécuter uniquement certaines tâches
ansible-playbook deploy.yml --tags "config"
ansible-playbook deploy.yml --skip-tags "deploy"

# Lister les tâches et tags sans rien exécuter
ansible-playbook deploy.yml --list-tasks --list-tags
```

Un handler notifié par une tâche taguée ne s'exécute que si sa propre tâche est retenue ; les tags spéciaux `always` et `never` forcent ou excluent une tâche indépendamment de la sélection.

### 3. Gestion des erreurs robuste

```yaml
---
- name: Gestion d'erreurs avancée
  hosts: all

  tasks:
    - name: Exécuter le script avec reprise sur erreur
      block:
        - name: Tâche qui peut échouer
          command: /opt/script.sh
          register: script_result

        - debug:
            msg: "Script réussi : {{ script_result.stdout }}"
      rescue:
        - debug:
            msg: "Script échoué : {{ ansible_failed_result.stderr | default('') }}"
        - include_tasks: rollback.yml
      always:
        - name: Nettoyage
          file:
            path: /tmp/script-lock
            state: absent
```

`block`/`rescue`/`always` fonctionne comme `try`/`except`/`finally` : la section `rescue` s'exécute seulement si une tâche du `block` échoue, et `always` dans tous les cas. La variable `ansible_failed_result` contient le résultat de la tâche en échec. À l'inverse, `ignore_errors: yes` sur une tâche masque l'échec sans déclencher `rescue` ; `failed_when` et `changed_when` redéfinissent ce qu'est un échec ou un changement à partir du résultat (code de retour, contenu de la sortie).

## Conclusion

Les rôles structurent le code en composants réutilisables, avec une séparation claire entre valeurs par défaut et constantes. Les collections distribuent modules et rôles de façon versionnée, Vault protège les secrets versionnés avec le code, et l'organisation des inventaires par environnement évite les conditions dans les playbooks.

Points clés à retenir :

- **Rôles** : modulariser et réutiliser le code, `defaults/` pour ce qui se surcharge
- **Priorité des variables** : de `defaults/` (plus faible) à `--extra-vars` (plus forte)
- **Collections** : distribution versionnée des modules, référencés par leur FQCN
- **Vault** : chiffrer les données sensibles dans le dépôt
- **Tags et blocs** : exécution sélective et gestion structurée des erreurs

## Ressources utiles

- [Ansible Tips and Tricks](https://docs.ansible.com/ansible/latest/tips_tricks/index.html)
- [Ansible Galaxy](https://galaxy.ansible.com/)
- [Ansible Vault Documentation](https://docs.ansible.com/ansible/latest/vault_guide/index.html)
- [Ansible Collections](https://docs.ansible.com/ansible/latest/collections_guide/index.html)
