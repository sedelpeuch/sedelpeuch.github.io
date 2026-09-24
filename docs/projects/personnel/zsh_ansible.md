---
title: Zsh Ansible Automation
description: Provisioning idempotent d'un environnement shell (zsh, oh-my-zsh, plugins, Starship) par playbooks Ansible, avec dotfiles externalisés dans des Gists GitHub.
tags: [ansible, iac, zsh, automation]
---

<ProjectMeta
  start="2025"
  end="2025"
  role="Auteur (projet solo)"
  domain="Provisioning de poste, automatisation shell"
  stack={["Ansible", "zsh", "oh-my-zsh", "Starship", "GitHub Gists"]}
/>

## Contexte

Configurer un shell sur une nouvelle machine demande une série de manipulations identiques : installer zsh, installer oh-my-zsh, cloner les plugins un par un depuis leurs repos respectifs, récupérer le bon `.zshrc`, installer Starship et placer sa configuration au bon endroit. Cette séquence se répète à chaque nouveau poste ou conteneur de développement. Ce projet l'automatise avec une seule commande Ansible.

J'aurais pu écrire un script bash. La raison de choisir Ansible plutôt qu'un ensemble de `curl | bash` et de tests `if [ ! -d ~/.oh-my-zsh ]` tient à trois choses concrètes. D'abord, l'idempotence est gérée nativement par les modules — `apt` avec `state: present` ne réinstalle pas si le paquet existe déjà, l'installateur d'oh-my-zsh et les clones de plugins sont conditionnés par un `stat` préalable, et `copy` n'écrit le fichier de configuration que si son contenu a changé. Ensuite, les élévations de privilèges sont déclaratives et précises : on peut indiquer `become: yes` sur une tâche spécifique sans que tout le playbook tourne en root. Enfin, chaque playbook reste exécutable indépendamment, ce qui permet de relancer uniquement la partie plugins sans retoucher à zsh.

## L'architecture : un playbook par préoccupation

`main.yml` ne contient que trois lignes : trois `import_playbook`. `import_playbook` est statique : les playbooks sont chargés et validés au démarrage, pas à l'exécution. Chaque fichier reste aussi exécutable directement pour ne refaire qu'une étape, sans modification.

Le premier playbook, `install_zsh.yml`, a deux plays distincts. Le premier tourne avec `become: yes` et installe zsh via `apt`. Le second tourne en utilisateur normal, récupère le contenu du `.zshrc` depuis un Gist GitHub via le module `uri`, et le place dans le home avec `copy`. La séparation en deux plays, l'un root, l'autre utilisateur, rend le périmètre des privilèges lisible dès l'en-tête de chaque play.

`install_oh_my_zsh.yml` orchestre l'installation d'oh-my-zsh, de sept plugins clonés depuis Git et d'`autojump` installé par `apt`. `install_starship.yml` installe le prompt Starship et place sa configuration.

## La gestion des élévations de privilèges

C'est sur ce point que l'écart avec un script shell équivalent est le plus net. `install_oh_my_zsh.yml` a `become: no` au niveau du play, mais certaines tâches comme l'installation de `git` ou `autojump` ont `become: yes` individuellement. oh-my-zsh lui-même s'installe en espace utilisateur (`~/.oh-my-zsh`), de même que tous les plugins qui vont dans `~/.oh-my-zsh/custom/plugins/`. Starship s'installe avec `become: yes` parce que son script place le binaire dans `/usr/local/bin`. Dans un script bash, ce mélange root/utilisateur deviendrait un enchaînement de `sudo` et de pertes de privilèges difficile à relire. Ici, chaque tâche déclare ce dont elle a besoin.

## L'idempotence en pratique

Oh-my-zsh : avant de télécharger et lancer l'installateur, un `stat` vérifie si `~/.oh-my-zsh` existe. Si oui, le téléchargement et l'installation sont sautés avec `when: not oh_my_zsh_installed.stat.exists`. L'installateur officiel OMZ crée ce répertoire, donc la présence du répertoire est un marqueur fiable d'installation.

Pour les plugins, le même motif se répète : un `stat` inconditionnel sur le répertoire du plugin dans `~/.oh-my-zsh/custom/plugins/`, puis un clone `git` conditionné par `when: not <plugin>_installed.stat.exists`. Un plugin déjà présent n'est jamais recloné, et un plugin ajouté à la liste est installé au provisioning suivant sans toucher aux autres.

Starship : plutôt que `stat`, un `command: which starship` avec `failed_when: false`. Si le binaire n'est pas dans le PATH, le code de retour est non-nul et l'installation s'enclenche. Ce test dépend du `PATH` de la session Ansible : il est moins strict qu'un `stat` sur le chemin absolu (`/usr/local/bin/starship`), mais suffisant pour les cibles visées.

## Les dotfiles depuis des Gists

`.zshrc` et `starship.toml` ne sont pas dans le repo. Ils vivent dans des Gists GitHub dont les URLs raw sont codées dans les playbooks. À chaque provisioning, le contenu courant du Gist est récupéré et écrit. Modifier la configuration du shell ne nécessite donc pas de modifier le dépôt Ansible : changer le Gist suffit, et le prochain provisioning prend la nouvelle version.

Le dépôt Ansible gère la mécanique d'installation, les Gists portent la configuration personnelle. La limite est que les URLs sont codées en dur dans les playbooks, ce qui les rend difficiles à réutiliser tels quels par quelqu'un d'autre. Une variable dans un fichier `vars/` ou `group_vars/` les rendrait configurables sans modifier les playbooks.

## Les plugins installés

Huit extensions au total, dont sept clonées depuis Git. `zsh-autosuggestions` suggère des commandes en gris basées sur l'historique — la suggestion s'accepte avec la touche droite. `zsh-syntax-highlighting` colore la commande en cours de frappe en vert si elle est valide, rouge sinon. `zsh-completions` élargit les complétions natives de zsh. `zsh-history-substring-search` permet de chercher dans l'historique par sous-chaîne plutôt que par préfixe. `fast-syntax-highlighting` est une alternative plus rapide à `zsh-syntax-highlighting`, maintenue par la communauté `zdharma-continuum`. `zsh-bat` remplace `cat` pour utiliser `bat` quand il est disponible. `autoupdate` maintient les plugins tiers à jour automatiquement lors des mises à jour OMZ. `autojump` est installé via `apt` (pas un plugin git) et ajoute la commande `j` pour naviguer vers les répertoires fréquemment visités.

## Tester dans Docker

Le README documente un workflow de test en Docker. L'image `williamyeh/ansible:ubuntu18.04` embarque Ansible. Le répertoire courant est monté dans `/ansible/playbooks` et le playbook est lancé avec `-c local` : pas de SSH, Ansible agit directement dans le conteneur. Ce mode permet de tester des playbooks qui ciblent `localhost` sans installer Ansible sur la machine de développement ni recourir à une VM, et surtout sans modifier le shell de cette machine. La variante terminée par `exec /bin/bash` garde le conteneur ouvert pour inspecter le résultat après exécution.

## Limites connues

Le support est limité à Debian/Ubuntu : tous les `apt` supposent un système compatible. Il n'y a pas de branche `dnf` ou `brew` pour macOS. Pour un usage multi-OS, les tâches système devraient passer par des variables de type `ansible_pkg_mgr` ou des `when: ansible_os_family == 'Debian'`.

Les URLs de Gists sont hardcodées dans les playbooks, ce qui rend le projet difficile à forker et réutiliser tel quel. Le `.zshrc` récupéré est une config personnelle — quelqu'un d'autre obtiendrait ma configuration, pas la sienne.

zsh est installé, mais n'est pas défini comme shell par défaut : aucune tâche n'appelle le module `user` (paramètre `shell`) ni `chsh`, cette étape reste manuelle.

L'image de test repose sur Ubuntu 18.04, qui n'est plus maintenue ; les tests ne reflètent donc pas les versions actuelles d'Ubuntu.

Enfin, Ansible doit être installé avant que le provisioning puisse tourner. Pour un poste entièrement vierge, il faut une étape de bootstrap (`apt install ansible`) avant de pouvoir lancer quoi que ce soit, ce qui n'est pas documenté dans le dépôt.

## Liens

- 💻 Code source : [github.com/sedelpeuch/zsh_ansible](https://github.com/sedelpeuch/zsh_ansible)
