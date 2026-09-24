---
title: "Ansible"
description: "Ansible, outil d'automatisation sans agent : fonctionnement par SSH, inventaire, playbooks, modules, handlers, rôles et comparaison avec les autres outils IaC."
tags: [iac, devops]
---

Configurer une dizaine de serveurs à la main, par des connexions SSH successives, produit des machines qui divergent au fil des interventions et une configuration que personne ne sait reconstruire. Ansible décrit cette configuration dans des fichiers YAML versionnés et l'applique à un parc de machines, de façon reproductible, sans agent à installer sur les cibles.

<!--truncate-->

## Qu'est-ce qu'Ansible ?

Ansible est un outil open source d'automatisation, maintenu par Red Hat, pour la configuration des systèmes, le déploiement d'applications et l'orchestration de tâches. Contrairement à Puppet ou Chef, il ne nécessite pas d'agent permanent sur les machines cibles.

Ses caractéristiques principales :

- **YAML** comme langage de description des tâches
- **Sans agent** : une connexion SSH et un interpréteur Python sur la cible suffisent (WinRM ou SSH pour Windows)
- **Idempotence** : les modules décrivent un état cible ; une seconde exécution ne modifie rien si l'état est déjà atteint
- **Extensibilité** : des milliers de modules, distribués sous forme de *collections* (`ansible.builtin`, `community.general`, `amazon.aws`...)
- **Multi-plateforme** : Linux, macOS, Windows, équipements réseau et fournisseurs cloud

### Fonctionnement d'une tâche

Pour chaque tâche et chaque hôte, Ansible génère sur la machine de contrôle un petit programme Python contenant le module et ses arguments, le copie par SSH dans un répertoire temporaire de la cible, l'exécute, puis récupère un résultat JSON (`changed`, `failed`, valeurs de retour) avant de supprimer le fichier. Par défaut, les tâches s'exécutent dans l'ordre du playbook, chaque tâche étant lancée en parallèle sur un lot d'hôtes (5 par défaut, réglable avec `forks`).

L'idempotence est une propriété des modules, pas d'Ansible lui-même : `ansible.builtin.apt` avec `state: present` vérifie que le paquet est installé avant d'agir, alors que `ansible.builtin.command` ou `ansible.builtin.shell` exécutent leur commande à chaque passage et signalent toujours un changement, sauf si les options `creates`, `removes` ou `changed_when` précisent quand la commande doit s'exécuter.

## Architecture d'Ansible

L'architecture d'Ansible s'articule autour de cinq éléments :

1. **Machine de contrôle** : où Ansible est installé et depuis laquelle les playbooks sont exécutés
2. **Inventaire** : liste des hôtes à gérer, groupés logiquement
3. **Modules** : unités de code exécutées sur les hôtes cibles
4. **Playbooks** : fichiers YAML décrivant les tâches à effectuer
5. **Rôles** : regroupements réutilisables de tâches, handlers, variables, fichiers et templates

La communication entre la machine de contrôle et les hôtes se fait généralement via SSH, avec les clés et la configuration SSH existantes : aucun service supplémentaire n'est à maintenir sur les cibles.

## Les concepts fondamentaux

### Inventaire

L'inventaire définit les machines cibles et permet de les organiser en groupes :

```ini
[webservers]
web1.example.com
web2.example.com

[databases]
db1.example.com
db2.example.com

[production:children]
webservers
databases
```

Le suffixe `:children` crée un groupe composé d'autres groupes. Deux groupes existent implicitement : `all` (tous les hôtes) et `ungrouped`. Les variables propres à un groupe ou à un hôte se placent dans les répertoires `group_vars/<groupe>.yml` et `host_vars/<hôte>.yml` à côté de l'inventaire. Un inventaire peut aussi être dynamique : un plugin (`amazon.aws.aws_ec2`, par exemple) interroge une API cloud à chaque exécution pour construire la liste des hôtes.

### Playbooks

Les playbooks sont des fichiers YAML qui décrivent les tâches à exécuter sur les hôtes :

```yaml
---
- name: Installer et configurer un serveur web
  hosts: webservers
  become: true  # élévation de privilèges, via sudo par défaut
  vars:
    http_port: 80

  tasks:
    - name: Installer nginx
      ansible.builtin.apt:
        name: nginx
        state: present
        update_cache: true

    - name: Déployer la configuration du site
      ansible.builtin.template:
        src: site.conf.j2            # template Jinja2, peut utiliser {{ http_port }}
        dest: /etc/nginx/sites-available/default
        mode: "0644"
      notify: Recharger nginx        # déclenche le handler uniquement si le fichier change

    - name: Démarrer et activer le service nginx
      ansible.builtin.service:
        name: nginx
        state: started
        enabled: true

  handlers:
    - name: Recharger nginx
      ansible.builtin.service:
        name: nginx
        state: reloaded
```

Les modules sont désignés par leur nom complet (*FQCN*, `ansible.builtin.apt`), qui lève toute ambiguïté entre collections ; la forme courte (`apt`) reste acceptée. Un **handler** est une tâche exécutée uniquement lorsqu'une autre tâche le notifie **et** signale un changement, et une seule fois en fin de play même s'il est notifié plusieurs fois : nginx n'est rechargé que si sa configuration a réellement été modifiée.

### Modules

Les modules sont les unités de travail d'Ansible. Modules courants de la collection `ansible.builtin` :

- **apt/yum/dnf** : gestion des paquets
- **copy/template** : transfert et génération de fichiers
- **service** : gestion des services
- **user/group** : gestion des utilisateurs et groupes
- **git** : interaction avec les dépôts Git
- **file** : manipulation de fichiers et répertoires

### Rôles

Les rôles permettent d'organiser le code Ansible de manière modulaire et réutilisable :

```text
roles/
  common/
    tasks/
      main.yml
    handlers/
      main.yml
    files/
    templates/
    vars/
      main.yml
    defaults/
      main.yml
    meta/
      main.yml
```

`defaults/main.yml` contient les valeurs par défaut, de priorité la plus faible, destinées à être surchargées par l'utilisateur du rôle ; `vars/main.yml` contient des variables internes de priorité élevée. `ansible-galaxy role init common` génère cette arborescence.

## Cas d'utilisation courants

Ansible couvre plusieurs familles d'usage :

1. **Configuration de serveurs** : installation et configuration cohérente de services
2. **Déploiement d'applications** : processus de déploiement automatisés et reproductibles
3. **Gestion de la configuration** : maintien de l'état souhaité des systèmes
4. **Orchestration** : coordination d'actions complexes sur plusieurs systèmes
5. **Provisionnement cloud** : création et configuration de ressources cloud

## Installation et premiers pas

Ansible ne s'installe que sur la machine de contrôle :

```bash
# Sur Debian/Ubuntu
sudo apt update
sudo apt install ansible

# Sur RHEL/Fedora
sudo dnf install ansible

# Via pipx, dans un environnement isolé (versions les plus récentes)
pipx install --include-deps ansible
```

Le paquet `ansible` regroupe le moteur `ansible-core` et une sélection de collections ; `ansible-core` seul fournit uniquement `ansible.builtin`. Vérification de l'installation :

```bash
ansible --version
```

Test de connectivité, puis exécution d'un playbook en mode simulation :

```bash
echo "localhost ansible_connection=local" > inventory

# Commande ad hoc : module ping (vérifie SSH et Python, pas ICMP)
ansible -i inventory localhost -m ansible.builtin.ping

# Simulation : affiche les changements prévus sans les appliquer
ansible-playbook -i inventory site.yml --check --diff
```

En mode `--check`, chaque module rapporte ce qu'il modifierait ; les modules qui ne supportent pas la simulation (comme `command`) sont ignorés, ce qui peut fausser les tâches qui dépendent de leur résultat.

## Ansible vs autres outils IaC

| Caractéristique | Ansible | Puppet | Chef | Terraform |
|----------------|---------|--------|------|-----------|
| **Agent requis** | Non | Oui | Oui | Non |
| **Serveur central** | Non | Oui (Puppet Server) | Oui (Chef Infra Server) | Non (state partagé dans un backend) |
| **Mode** | Push, à la demande | Pull périodique par l'agent | Pull périodique par l'agent | Push, à la demande |
| **Langage** | YAML | DSL Puppet | Ruby | HCL |
| **Idempotence** | Selon les modules | Oui | Oui | Oui |
| **Focus** | Config. management | Config. management | Config. management | Provisionnement |
| **Modèle** | Tâches ordonnées, modules déclaratifs | Déclaratif | Procédural | Déclaratif, avec état |

Ansible et [Terraform](./2026-06-21-terraform.md) se combinent souvent : Terraform crée les ressources (réseau, machines virtuelles) et conserve leur état, Ansible configure ensuite le système d'exploitation et les applications.

## Bonnes pratiques

1. **Utiliser des rôles** pour organiser et réutiliser le code
2. **Versionner** les playbooks et l'inventaire avec Git
3. **Éviter les commandes shell** brutes, préférer les modules natifs, idempotents
4. **Utiliser les variables** pour rendre les playbooks flexibles
5. **Tester avec `--check`** avant d'exécuter réellement les changements
6. **Structurer logiquement l'inventaire** en groupes et sous-groupes

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/professionnel/sonu-k8s-cluster" title="Cluster Kubernetes SONU">Automatisation complète de la configuration et de la maintenance des nœuds Kubernetes avec Ansible.</ProjectLink>
  <ProjectLink to="/docs/projects/professionnel/github-arc-kubeadm" title="GitHub ARC Kubeadm">Provisionnement automatique du cluster Kubernetes et installation d'ARC via des playbooks Ansible.</ProjectLink>
  <ProjectLink to="/docs/projects/personnel/zsh_ansible" title="zsh_ansible">Cas pratique d'automatisation shell avec Ansible pour la gestion d'infrastructure personnelle.</ProjectLink>
</ProjectLinks>

## Conclusion

Ansible applique à un parc de machines une configuration décrite en YAML, par SSH et sans agent. Son modèle repose sur des modules idempotents exécutés dans l'ordre des tâches, des handlers pour les actions consécutives à un changement, et des rôles pour la réutilisation. Les articles [playbooks avancés](./2025-11-21-ansible-playbooks-avances.md) et [Ansible Vault](./2025-11-28-ansible-vault.md) prolongent ces bases.

## Ressources utiles

- [Documentation officielle Ansible](https://docs.ansible.com/)
- [Ansible Galaxy](https://galaxy.ansible.com/) - Dépôt de rôles communautaires
- [Red Hat Ansible Automation Platform](https://www.redhat.com/fr/technologies/management/ansible) - Version entreprise
