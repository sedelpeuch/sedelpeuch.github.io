---
title: "Ansible : Vault"
description: "Ansible Vault : chiffrement des secrets dans un dépôt Ansible, fichiers et variables chiffrés, gestion des mots de passe, identifiants de Vault et intégration en CI."
tags: [iac, devops]
---

Un dépôt Ansible décrit l'intégralité d'une infrastructure, y compris les mots de passe de bases de données, les clés d'API et les certificats nécessaires aux services. Ansible Vault chiffre ces données sensibles pour qu'elles puissent être versionnées avec le reste du code, puis les déchiffre en mémoire au moment de l'exécution des playbooks.

<!--truncate-->

## Pourquoi utiliser Ansible Vault ?

- Versionner les secrets avec le code qui les utilise, sans les exposer en clair dans l'historique Git
- Donner accès au dépôt sans donner accès aux secrets : seules les personnes et les systèmes qui détiennent le mot de passe Vault peuvent les lire
- Éviter les fichiers de secrets gérés hors du dépôt, sources d'écarts entre les postes

Un secret committé en clair reste lisible dans l'historique Git même après sa suppression du fichier : le chiffrement doit intervenir **avant** le premier commit, et un secret exposé doit être considéré comme compromis et renouvelé.

## Fonctionnement

Ansible Vault chiffre les données en AES-256 (mode CTR, avec une empreinte HMAC-SHA256 pour l'intégrité). La clé de chiffrement est dérivée du mot de passe Vault par PBKDF2 avec un sel aléatoire, si bien que deux chiffrements d'un même contenu produisent des résultats différents. Un fichier chiffré est un fichier texte qui commence par un en-tête identifiant le format :

```text
$ANSIBLE_VAULT;1.1;AES256
66386439653936393039346235323131386335333132333239336631643366326362333733363264
3939666233316362313938396331626664626134623239360a356430646364633338336564383661
...
```

Avec un identifiant de Vault (voir plus loin), l'en-tête devient `$ANSIBLE_VAULT;1.2;AES256;prod`. À l'exécution d'un playbook, Ansible reconnaît cet en-tête dans tout fichier de variables (`vars_files`, `group_vars`, `host_vars`) ou fichier source du module `copy`, et le déchiffre en mémoire : aucun fichier en clair n'est écrit sur disque.

## Commandes de base

```bash
# Créer un nouveau fichier chiffré (ouvre $EDITOR, chiffre à la sauvegarde)
ansible-vault create secrets.yml

# Chiffrer un fichier existant, en place
ansible-vault encrypt group_vars/prod/vault.yml

# Modifier un fichier chiffré (déchiffrement temporaire dans l'éditeur)
ansible-vault edit secrets.yml

# Afficher le contenu sans écrire de version en clair sur disque
ansible-vault view secrets.yml

# Déchiffrer un fichier sur disque (le fichier perd sa protection)
ansible-vault decrypt secrets.yml

# Changer le mot de passe d'un fichier Vault
ansible-vault rekey secrets.yml

# Exécuter un playbook en demandant le mot de passe
ansible-playbook playbook.yml --ask-vault-pass
```

Chaque modification d'un fichier chiffré change l'intégralité de son contenu chiffré : un `git diff` n'est pas lisible. La configuration `git config diff.ansible-vault.textconv "ansible-vault view"`, associée à un attribut `*vault.yml diff=ansible-vault` dans `.gitattributes`, affiche les différences en clair localement, pour qui dispose du mot de passe.

## Chiffrer des variables individuelles

Plutôt que de chiffrer un fichier entier, `encrypt_string` chiffre une seule valeur, à coller dans un fichier YAML par ailleurs lisible :

```bash
ansible-vault encrypt_string 'SuperSecretPassword' --name 'db_password'
```

```yaml
# group_vars/prod/main.yml
db_host: db.internal
db_user: app_user
db_password: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  66386439653936393039346235323131386335333132333239336631643366326362333733363264
  ...
```

Le fichier reste lisible et ses diffs exploitables, mais `ansible-vault rekey` ne s'applique pas aux variables incluses dans un fichier en clair : un changement de mot de passe impose de rechiffrer chaque valeur.

## Organisation des variables chiffrées

Une convention répandue sépare, pour chaque groupe, un fichier en clair et un fichier chiffré, et préfixe toutes les variables chiffrées par `vault_` :

```yaml
# group_vars/prod/vault.yml (chiffré)
vault_db_password: "SuperSecretPassword123!"
vault_api_key: "abc123def456ghi789"
```

```yaml
# group_vars/prod/vars.yml (en clair)
db_password: "{{ vault_db_password }}"
api_key: "{{ vault_api_key }}"
```

Cette indirection laisse les noms de toutes les variables visibles et recherchables (`grep db_password`) sans déchiffrer quoi que ce soit, et indique clairement l'origine chiffrée d'une valeur.

## Exemple d'utilisation dans un playbook

```yaml
---
- name: Déploiement avec secrets
  hosts: production
  vars_files:
    - vars/common.yml
    - secrets.yml                  # fichier chiffré avec Vault

  tasks:
    - name: Configurer l'utilisateur de la base de données
      community.mysql.mysql_user:
        name: app_user
        password: "{{ db_password }}"
        priv: "appdb.*:ALL"
        state: present
      no_log: true                 # ne pas afficher les arguments dans la sortie ni dans les logs
```

Vault protège les secrets **au repos**, pas à l'exécution : une tâche `debug` qui affiche `{{ db_password }}`, ou un module en échec dont les arguments sont affichés, révèle la valeur en clair dans la sortie. L'option `no_log: true` supprime l'affichage des arguments et du résultat de la tâche.

## Fournir le mot de passe

### Fichier de mot de passe

```bash
# Fichier lisible uniquement par l'utilisateur, hors du dépôt
echo "MonMotDePasseVault" > ~/.vault_pass.txt
chmod 600 ~/.vault_pass.txt

ansible-playbook deploy.yml --vault-password-file ~/.vault_pass.txt
```

Le chemin peut aussi être déclaré une fois pour toutes dans `ansible.cfg` (`vault_password_file = ~/.vault_pass.txt` dans la section `[defaults]`) ou dans la variable d'environnement `ANSIBLE_VAULT_PASSWORD_FILE`.

### Script de récupération

Si le fichier indiqué est **exécutable**, Ansible l'exécute et lit le mot de passe sur sa sortie standard. Le mot de passe peut ainsi rester dans un gestionnaire de secrets :

```bash
#!/bin/bash
# get_vault_pass.sh : un seul des exemples suivants, selon l'outil utilisé

# pass (passwordstore.org)
pass show ansible/vault

# AWS Secrets Manager
# aws secretsmanager get-secret-value --secret-id ansible-vault \
#   --query SecretString --output text

# 1Password CLI
# op read "op://DevOps/Ansible Vault/password"
```

```bash
chmod +x get_vault_pass.sh
ansible-playbook deploy.yml --vault-password-file ./get_vault_pass.sh
```

Un script dont le nom se termine par `-client` (par exemple `vault-keyring-client.py`) reçoit en plus l'argument `--vault-id <nom>`, ce qui permet à un même script de servir plusieurs identifiants de Vault.

## Identifiants de Vault : plusieurs mots de passe

Les identifiants de Vault (`--vault-id label@source`) associent un label à chaque mot de passe, par exemple un par environnement. Un développeur peut ainsi déchiffrer les secrets de développement sans avoir accès à ceux de la production.

```bash
# Chiffrer avec des mots de passe distincts
ansible-vault create --vault-id dev@prompt group_vars/dev/vault.yml
ansible-vault encrypt --vault-id prod@~/.vault_prod group_vars/prod/vault.yml

# Exécuter en fournissant plusieurs mots de passe
ansible-playbook site.yml \
  --vault-id dev@~/.vault_dev \
  --vault-id prod@~/.vault_prod
```

La source après `@` est `prompt` (saisie interactive), un fichier ou un script. Le label est inscrit dans l'en-tête du fichier chiffré ; au déchiffrement, Ansible essaie d'abord le mot de passe dont le label correspond, puis les autres (sauf avec l'option `DEFAULT_VAULT_ID_MATCH`, qui impose la correspondance).

## Intégration en CI

En intégration continue, le mot de passe Vault est stocké dans le gestionnaire de secrets de la plateforme et transmis sans être écrit dans les logs :

```yaml
# Extrait d'un workflow GitHub Actions
- name: Déployer
  env:
    VAULT_PASS: ${{ secrets.ANSIBLE_VAULT_PASSWORD }}
  run: |
    # Le mot de passe transite par un descripteur de fichier, jamais par un fichier sur disque
    ansible-playbook -i inventories/production site.yml \
      --vault-password-file <(printf '%s' "$VAULT_PASS")
```

Le mécanisme des secrets GitHub Actions est décrit dans l'article [GitHub Actions](../04-ci-cd/2024-12-20-github-actions.md).

## Bonnes pratiques

- Chiffrer toutes les variables sensibles avant leur premier commit
- Ne jamais versionner le mot de passe Vault ni le fichier qui le contient (l'ajouter au `.gitignore`)
- Utiliser un identifiant de Vault par environnement pour cloisonner les accès
- Changer le mot de passe (`ansible-vault rekey`) lors du départ d'une personne qui y avait accès, et renouveler dans ce cas les secrets eux-mêmes : l'ancien mot de passe permet toujours de déchiffrer les versions passées présentes dans l'historique Git
- Marquer `no_log: true` les tâches qui manipulent des secrets

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/professionnel/sonu-k8s-cluster" title="Cluster Kubernetes SONU">Gestion sécurisée des secrets d'infrastructure (mots de passe, tokens, clés SSH) dans les playbooks Ansible.</ProjectLink>
  <ProjectLink to="/docs/projects/professionnel/github-arc-kubeadm" title="GitHub ARC Kubeadm">Stockage chiffré des tokens GitHub et des identifiants lors du provisionnement d'ARC via Ansible.</ProjectLink>
</ProjectLinks>

## Pour aller plus loin

Ansible Vault chiffre des secrets statiques, versionnés avec le code. Lorsque les secrets doivent être renouvelés automatiquement ou partagés entre plusieurs outils, un gestionnaire de secrets externe (HashiCorp Vault, AWS Secrets Manager) peut être interrogé directement depuis les playbooks par des *lookup plugins* (`community.hashi_vault.hashi_vault`, `amazon.aws.aws_secret`), sans que le secret ne soit jamais stocké dans le dépôt. L'article [Ansible : avancé](./2025-11-21-ansible-playbooks-avances.md) situe Vault dans l'organisation d'un projet Ansible complet.
