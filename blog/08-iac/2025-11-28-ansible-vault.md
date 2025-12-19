---
title: "Ansible : Vault"
description: Introduction à Ansible Vault pour la gestion sécurisée des secrets dans les playbooks Ansible.
tags: [Ansible, Vault, IaC, Sécurité]
---

Ansible Vault est un outil intégré à Ansible permettant de chiffrer et de gérer les secrets (mots de passe, clés, variables sensibles) dans les fichiers de configuration et les playbooks. Cette fonctionnalité est essentielle pour garantir la sécurité des données confidentielles lors de l'automatisation de l'infrastructure.

<!--truncate-->

# Ansible Vault : Sécurisation des secrets

import IconTitle from '@site/src/components/IconTitle';

<IconTitle logo="simple-icons:ansible" name="Ansible Vault"/>

## Pourquoi utiliser Ansible Vault ?

- Protéger les mots de passe, clés API et autres secrets dans les fichiers de configuration
- Éviter de stocker des informations sensibles en clair dans le dépôt Git
- Faciliter la collaboration tout en maintenant la sécurité

## Fonctionnalités principales

- Chiffrement et déchiffrement de fichiers YAML ou variables
- Modification sécurisée des fichiers chiffrés
- Intégration transparente dans les playbooks et rôles Ansible

## Commandes de base

Voici les principales commandes à connaître, avec leurs options utiles :

```bash
# Créer un nouveau fichier chiffré
ansible-vault create secrets.yml
# Ouvre un éditeur pour saisir le contenu, qui sera chiffré à la sauvegarde.

# Chiffrer un fichier existant
ansible-vault encrypt group_vars/prod.yml
# Chiffre le fichier en place. Utilisez --vault-id pour gérer plusieurs mots de passe.

# Déchiffrer un fichier
ansible-vault decrypt secrets.yml
# Remplace le fichier chiffré par sa version en clair.

# Modifier un fichier chiffré
ansible-vault edit secrets.yml
# Ouvre le fichier dans l'éditeur, le contenu reste chiffré à la sauvegarde.

# Afficher le contenu d'un fichier chiffré sans le déchiffrer sur disque
ansible-vault view secrets.yml

# Changer le mot de passe d'un fichier Vault
ansible-vault rekey secrets.yml
# Permet de modifier le mot de passe utilisé pour le chiffrement.

# Exécuter un playbook en utilisant Vault
ansible-playbook playbook.yml --ask-vault-pass
# Demande le mot de passe Vault à l'exécution. Utilisez --vault-id pour des cas avancés.

# Utiliser plusieurs Vault ID (pour plusieurs mots de passe)
ansible-playbook playbook.yml --vault-id prod@prompt --vault-id dev@prompt
```

## Exemple d'utilisation dans un playbook

```yaml
---
- hosts: all
  vars_files:
    - secrets.yml
  tasks:
    - name: Afficher une variable secrète
      debug:
        msg: "Le mot de passe est : {{ vault_password }}"
```

## Bonnes pratiques

- Utiliser des fichiers Vault pour toutes les variables sensibles
- Ne jamais stocker le mot de passe Vault dans le dépôt
- Changer régulièrement le mot de passe Vault
- Limiter l'accès aux fichiers Vault aux personnes autorisées

## Pour aller plus loin

- Rotation des secrets
- Utilisation de Vault ID pour gérer plusieurs mots de passe
- Intégration avec des outils externes de gestion de secrets

Ansible Vault est un outil simple mais puissant pour renforcer la sécurité des automatisations. Il s'intègre naturellement dans les workflows DevOps et permet de respecter les bonnes pratiques de gestion des secrets.
