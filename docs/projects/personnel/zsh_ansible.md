---
title: Zsh Ansible Automation
---

<div className="project-meta-grid">
  <div className="project-meta-item">📅 Depuis 2024</div>
  <div className="project-meta-item">📖 Provisioning shell · Ansible · zsh</div>
  <div className="project-meta-item">🔧 Ansible · oh-my-zsh · Starship · GitHub Gists</div>
</div>

## Le contexte

Configurer un shell correctement sur une nouvelle machine prend plus de temps qu'on ne le pense : installer zsh, le passer en shell par défaut, installer oh-my-zsh, cloner les plugins un par un depuis leurs repos respectifs, récupérer le bon `.zshrc`, installer Starship et placer sa configuration au bon endroit. En tout, une vingtaine de minutes de manipulations identiques à chaque nouveau poste ou conteneur de développement. Ce projet automatise l'intégralité de cette séquence avec une seule commande Ansible.

Un script bash aurait pu faire le même travail. La raison de choisir Ansible plutôt qu'un ensemble de `curl | bash` et de tests `if [ ! -d ~/.oh-my-zsh ]` tient à trois choses concrètes. D'abord, l'idempotence est gérée nativement par les modules — `apt` avec `state: present` ne réinstalle pas si le paquet existe déjà, le module `git` ne re-clone pas si le répertoire cible est là, `uri` + `copy` remplacent le fichier inconditionnellement ce qui garantit que la config est toujours à jour. Ensuite, les élévations de privilèges sont déclaratives et précises : on peut indiquer `become: yes` sur une tâche spécifique sans que tout le playbook tourne en root. Enfin, chaque playbook reste exécutable indépendamment, ce qui permet de relancer uniquement la partie plugins sans retoucher à zsh.

## L'architecture : un playbook par préoccupation

`main.yml` ne contient que trois lignes : trois `import_playbook`. C'est intentionnel. `import_playbook` est statique — les playbooks sont chargés et validés au démarrage, pas à l'exécution. Ça signifie qu'on peut aussi exécuter chaque fichier directement pour ne refaire qu'une étape, sans modification.

Le premier playbook, `install_zsh.yml`, a deux plays distincts. Le premier tourne avec `become: yes` et installe zsh via `apt`. Le second tourne en utilisateur normal, récupère le contenu du `.zshrc` depuis un Gist GitHub via le module `uri`, et le place dans le home avec `copy`. La séparation en deux plays — l'un root, l'autre user — est plus propre qu'un seul play qui bascule avec `become` tâche par tâche.

`install_oh_my_zsh.yml` orchestre l'installation de oh-my-zsh et de huit plugins tiers. `install_starship.yml` installe le prompt Starship et place sa configuration.

## La gestion des élévations de privilèges

C'est là qu'Ansible montre le plus de valeur sur un script shell équivalent. `install_oh_my_zsh.yml` a `become: no` au niveau du play, mais certaines tâches comme l'installation de `git` ou `autojump` ont `become: yes` individuellement. oh-my-zsh lui-même s'installe en espace utilisateur (`~/.oh-my-zsh`), de même que tous les plugins qui vont dans `~/.oh-my-zsh/custom/plugins/`. Starship s'installe avec `become: yes` parce que son script place le binaire dans `/usr/local/bin`. Ce mélange root/user serait un enchaînement de `sudo` et de drops de privilèges difficile à lire dans un script bash. Ici, chaque tâche déclare ce dont elle a besoin.

## L'idempotence en pratique

Oh-my-zsh : avant de télécharger et lancer l'installateur, un `stat` vérifie si `~/.oh-my-zsh` existe. Si oui, le téléchargement et l'installation sont sautés avec `when: not oh_my_zsh_installed.stat.exists`. L'installateur officiel OMZ crée ce répertoire, donc la présence du répertoire est un marqueur fiable d'installation.

Pour les plugins, le même pattern : un `stat` sur le répertoire du plugin, conditionné par `when: oh_my_zsh_installed.stat.exists`, et un `git` clone conditionné par `when: not xxx.stat.exists`. Ce dernier `when` est conditionné sur la variable register du stat — qui, si OMZ vient d'être installé à cette exécution (et non à une précédente), n'a pas de clé `.stat` dans son résultat car la tâche stat a été sautée. Le clone s'exécute quand même parce qu'Ansible évalue une clé absente comme falsy. Le comportement est correct mais l'intention n'est pas explicite — un `default(false)` sur le `when` rendrait la logique lisible sans ambiguïté.

Starship : plutôt que `stat`, un `command: which starship` avec `failed_when: false`. Si le binaire n'est pas dans le PATH, le code de retour est non-nul et l'installation s'enclenche. Plus fragile qu'un `stat` sur le chemin absolu (`/usr/local/bin/starship`), mais fonctionnel dans la pratique.

## Les dotfiles depuis des Gists

`.zshrc` et `starship.toml` ne sont pas dans le repo. Ils vivent dans des Gists GitHub dont les URLs raw sont codées dans les playbooks. À chaque provisioning, le contenu courant du Gist est récupéré et écrit. Ça signifie que modifier la configuration du shell ne nécessite pas de modifier le repo Ansible — changer le Gist suffit, et le prochain provisioning prend la nouvelle version.

C'est une séparation raisonnable : le repo Ansible gère la mécanique d'installation, les Gists portent la config personnelle. La limite est que les URLs sont hardcodées dans les playbooks, ce qui les rend difficiles à réutiliser tels quels pour quelqu'un d'autre. Une variable dans un fichier `vars/` ou `group_vars/` rendrait ça configurable sans modifier les playbooks.

## Les plugins installés

Huit plugins au total. `zsh-autosuggestions` suggère des commandes en gris basées sur l'historique — la suggestion s'accepte avec la touche droite. `zsh-syntax-highlighting` colore la commande en cours de frappe en vert si elle est valide, rouge sinon. `zsh-completions` élargit les complétion natives de zsh. `zsh-history-substring-search` permet de chercher dans l'historique par sous-chaîne plutôt que par préfixe. `fast-syntax-highlighting` est une alternative plus rapide à `zsh-syntax-highlighting`, maintenu par la communauté `zdharma-continuum`. `zsh-bat` wrappe `cat` pour utiliser `bat` quand il est disponible. `autoupdate` maintient les plugins tiers à jour automatiquement lors des mises à jour OMZ. `autojump` est installé via `apt` (pas un plugin git) et ajoute la commande `j` pour naviguer vers les répertoires fréquemment visités.

## Tester dans Docker

Le README documente un workflow de test en Docker qui mérite d'être noté. L'image `williamyeh/ansible:ubuntu18.04` a Ansible préinstallé. On monte le répertoire courant dans `/ansible/playbooks` et on lance le playbook avec `-c local` — pas de SSH, pas d'inventaire, Ansible s'exécute directement sur le processus local. C'est le moyen propre de tester des playbooks qui ciblent `localhost` sans installer Ansible sur sa machine de dev principale, et sans avoir besoin d'une VM. Le flag `exec /bin/bash` à la fin permet d'inspecter le résultat dans le conteneur après exécution.

## Ce qui reste imparfait

Le support est limité à Debian/Ubuntu : tous les `apt` supposent un système compatible. Il n'y a pas de branche `dnf` ou `brew` pour macOS. Pour un usage multi-OS, les tâches système devraient passer par des variables de type `ansible_pkg_mgr` ou des `when: ansible_os_family == 'Debian'`.

Les URLs de Gists sont hardcodées dans les playbooks, ce qui rend le projet difficile à forker et réutiliser tel quel. Le `.zshrc` récupéré est une config personnelle — quelqu'un d'autre obtiendrait ma configuration, pas la sienne.

Enfin, Ansible doit être installé avant que le provisioning puisse tourner. Pour un poste entièrement vierge, il faut un script de bootstrap (`apt install ansible`) avant de pouvoir lancer quoi que ce soit — ce qui n'est pas documenté dans le repo.

## Liens

- [github.com/sedelpeuch/zsh_ansible](https://github.com/sedelpeuch/zsh_ansible)
- [Article associé : Ansible — cas pratique zsh](/blog/08-iac/2025-06-09-ansible-zsh-automation)
