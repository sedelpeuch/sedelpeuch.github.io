---
title: "Ansible : avancé"
description: "Fonctionnalités avancées d'Ansible pour créer des playbooks modulaires, sécuriser les secrets et automatiser les déploiements."
tags: [iac, devops]
---

L'[article précédent sur Ansible](/blog/2025/06/09/08-iac/ansible-introduction) couvrait les bases de cet outil d'automatisation puissant. Cet article explore des concepts avancés qui permettent de créer des infrastructures complexes de manière modulaire, sécurisée et automatisée. 🚀

<!--truncate-->

## Les rôles Ansible : modularité et réutilisabilité 📦

Les rôles sont la pierre angulaire de la modularité dans Ansible. Ils permettent d'organiser les playbooks en composants réutilisables et maintenables.

### Structure d'un rôle

Un rôle suit une structure de répertoires standardisée :

```
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
ansible-galaxy init webserver

# Créer un rôle dans un répertoire spécifique
ansible-galaxy init roles/webserver

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

**vars/main.yml**

```yaml
---
# Variables spécifiques au rôle (priorité plus haute)
nginx_worker_processes: auto
nginx_worker_connections: 1024
```

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
  author: Votre Nom
  description: Installation et configuration de Nginx
  company: Votre Entreprise
  license: MIT
  min_ansible_version: 2.9

  platforms:
    - name: Ubuntu
      versions:
        - focal
        - jammy
    - name: Debian
      versions:
        - bullseye
        - bookworm

  galaxy_tags:
    - nginx
    - webserver
    - web

dependencies: []
```

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

## Collections Ansible 📚

Les collections sont des packages qui regroupent modules, rôles, plugins et playbooks. Elles remplacent progressivement les rôles Galaxy.

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

    # Méthode 2 : Importer la collection
    - name: Docker tasks
      block:
        - community.docker.docker_container:
            name: nginx
            image: nginx:latest
            state: started
      collections:
        - community.docker
```

### Créer sa propre collection

```bash
# Créer la structure d'une collection
ansible-galaxy collection init mon_namespace.ma_collection

# Structure créée
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

## Ansible Vault : gérer les secrets en toute sécurité 🔒

Ansible Vault permet de chiffrer les fichiers contenant des données sensibles.

### Créer un fichier chiffré

```bash
# Créer un nouveau fichier chiffré
ansible-vault create secrets.yml

# Vous serez invité à entrer un mot de passe
# Puis un éditeur s'ouvrira pour saisir le contenu
```

**Contenu de secrets.yml (déchiffré) :**

```yaml
---
db_password: "SuperSecretPassword123!"
api_key: "abc123def456ghi789"
ssl_certificate_key: |
```

### Chiffrer un fichier existant

```bash
# Chiffrer un fichier existant
ansible-vault encrypt vars/production.yml

# Chiffrer plusieurs fichiers
ansible-vault encrypt vars/*.yml
```

### Modifier un fichier chiffré

```bash
# Éditer un fichier chiffré (déchiffrement temporaire)
ansible-vault edit secrets.yml

# Voir le contenu sans éditer
ansible-vault view secrets.yml
```

### Déchiffrer un fichier

```bash
# Déchiffrer un fichier (attention, perte de la protection !)
ansible-vault decrypt secrets.yml

# Rechiffrer avec un nouveau mot de passe
ansible-vault rekey secrets.yml
```

### Utiliser Vault dans un playbook

```yaml
---
- name: Déploiement avec secrets
  hosts: production
  vars_files:
    - vars/common.yml
    - secrets.yml  # Fichier chiffré avec Vault

  tasks:
    - name: Configurer la base de données
      mysql_user:
        name: app_user
        password: "{{ db_password }}"  # Depuis secrets.yml
        priv: "appdb.*:ALL"
        state: present

    - name: Configurer l'API
      template:
        src: api_config.j2
        dest: /etc/app/config.json
      vars:
        api_secret: "{{ api_key }}"
```

### Exécuter avec Vault

```bash
# Demander le mot de passe interactivement
ansible-playbook deploy.yml --ask-vault-pass

# Utiliser un fichier de mot de passe
ansible-playbook deploy.yml --vault-password-file ~/.vault_pass.txt

# Utiliser un script pour obtenir le mot de passe
ansible-playbook deploy.yml --vault-password-file get_vault_pass.sh
```

### Fichier de mot de passe

```bash
# Créer un fichier de mot de passe
echo "MonMotDePasseVault" > ~/.vault_pass.txt
chmod 600 ~/.vault_pass.txt

# Configurer dans ansible.cfg
cat >> ansible.cfg << EOF
[defaults]
vault_password_file = ~/.vault_pass.txt
EOF
```

### Script pour récupérer le mot de passe

```bash
#!/bin/bash
# get_vault_pass.sh - Récupère le mot de passe depuis un gestionnaire de secrets

# Exemple avec pass (passwordstore.org)
pass show ansible/vault

# Exemple avec AWS Secrets Manager
aws secretsmanager get-secret-value \
  --secret-id ansible-vault \
  --query SecretString \
  --output text

# Exemple avec 1Password CLI
op read "op://DevOps/Ansible Vault/password"
```

### Vault IDs : gérer plusieurs clés

```bash
# Créer des fichiers avec différents Vault IDs
ansible-vault create --vault-id dev@prompt secrets_dev.yml
ansible-vault create --vault-id prod@prompt secrets_prod.yml

# Utiliser avec des fichiers de mots de passe
ansible-vault create --vault-id dev@.vault_dev secrets_dev.yml

# Exécuter avec plusieurs Vault IDs
ansible-playbook deploy.yml \
  --vault-id dev@.vault_dev \
  --vault-id prod@.vault_prod
```

### Chiffrer des variables individuelles

```yaml
---
# Au lieu de chiffrer tout le fichier
db_host: localhost
db_user: app_user
db_password: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  66386439653936393039346235323131386335333132333239336631643366326362333733363264
  3939666233316362313938396331626664626134623239360a356430646364633338336564383661
  ...

# Créer une variable chiffrée
ansible-vault encrypt_string 'SuperSecretPassword' --name 'db_password'
```

## Application / Projet lié

### [Cluster Kubernetes SONU](/docs/projects/professionnel/sonu-k8s-cluster)
**Utilisation** : Playbooks avancés et structures de rôles pour la gestion complexe du cluster Kubernetes, configurations persistantes et secrets sécurisés.

## Bonnes pratiques avancées 🏆

### 1. Structure de projet recommandée

```
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

### 2. Utiliser des tags stratégiquement

```yaml
---
- name: Configuration complète
  hosts: webservers

  tasks:
    - name: Installer les paquets
      apt:
        name: "{{ item }}"
        state: present
      loop:
        - nginx
        - python3
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

# Exécuter uniquement certaines tâches
# ansible-playbook deploy.yml --tags "config"
# ansible-playbook deploy.yml --skip-tags "deploy"
```

### 3. Gestion des erreurs robuste

```yaml
---
- name: Gestion d'erreurs avancée
  hosts: all

  tasks:
    - name: Tâche qui peut échouer
      command: /opt/script.sh
      register: script_result
      ignore_errors: yes

    - name: Traiter le résultat
      block:
        - debug:
            msg: "Script réussi : {{ script_result.stdout }}"
      rescue:
        - debug:
            msg: "Script échoué : {{ script_result.stderr }}"
        - include_tasks: rollback.yml
      always:
        - name: Nettoyage
          file:
            path: /tmp/script-lock
            state: absent
```

## Conclusion 🎯

Ansible offre des fonctionnalités avancées puissantes pour gérer des infrastructures complexes de manière sécurisée et automatisée. Les rôles et collections permettent de créer des composants réutilisables, Vault protège les secrets, et l'intégration CI/CD automatise les déploiements.

Points clés à retenir :

- **Rôles** : modulariser et réutiliser le code
- **Collections** : packages complets de fonctionnalités
- **Vault** : chiffrer les données sensibles
- **CI/CD** : automatiser les déploiements
- **Stratégies** : blue-green, canary, rollback automatique

La maîtrise de ces concepts permet de créer des infrastructures as code robustes, maintenables et sécurisées.

## Ressources utiles 📚

- [Ansible Best Practices](https://docs.ansible.com/ansible/latest/user_guide/playbooks_best_practices.html)
- [Ansible Galaxy](https://galaxy.ansible.com/)
- [Ansible Vault Documentation](https://docs.ansible.com/ansible/latest/user_guide/vault.html)
- [Ansible Collections](https://docs.ansible.com/ansible/latest/user_guide/collections_using.html)
