---
title: "Zsh Ansible Automation"
description: "Provisioning idempotent d'un environnement shell (zsh, oh-my-zsh, plugins, fzf, mise, Starship) par playbooks Ansible, avec dotfiles externalisés dans des Gists GitHub."
tags: [ansible, iac, zsh, automation]
---

<ProjectMeta
  start="2025"
  end="2026"
  role="Auteur (projet solo)"
  domain="Provisioning de poste, automatisation shell"
  stack={["Ansible", "zsh", "oh-my-zsh", "Starship", "mise", "GitHub Gists"]}
/>

## Contexte

Configurer un shell sur une nouvelle machine demande une série de manipulations identiques : installer zsh et le définir comme shell de connexion, installer oh-my-zsh, cloner les plugins un par un depuis leurs dépôts respectifs, installer les outils dont dépend la configuration (fzf, Node.js via mise), récupérer les bons dotfiles, installer Starship et placer sa configuration au bon endroit. Cette séquence se répète à chaque nouveau poste ou conteneur de développement. Ce projet l'automatise avec une seule commande Ansible.

J'aurais pu écrire un script bash. La raison de choisir Ansible plutôt qu'un ensemble de `curl | bash` et de tests `if [ ! -d ~/.oh-my-zsh ]` tient à trois choses concrètes. D'abord, l'idempotence est portée par les modules : `apt` avec `state: present` ne réinstalle pas un paquet déjà présent, `git` avec `update: false` ne touche pas à un plugin déjà cloné, et un installateur lancé par `shell` avec le paramètre `creates` est sauté si le fichier qu'il produit existe déjà. Ensuite, les élévations de privilèges sont déclaratives et précises : `become: true` se place sur une tâche précise sans que tout le playbook tourne en root. Enfin, chaque playbook reste exécutable indépendamment, ce qui permet de relancer uniquement la partie plugins sans retoucher à zsh.

## L'architecture : un playbook par préoccupation

`main.yml` ne contient que six `import_playbook`, un par préoccupation : zsh et paquets de base (`install_zsh.yml`), oh-my-zsh et plugins (`install_oh_my_zsh.yml`), outils (`install_tools.yml` : fzf, mise, Node.js), Starship (`install_starship.yml`), dotfiles (`configure_dotfiles.yml`) et barre d'état de Claude Code (`configure_claude.yml`). `import_playbook` est statique : les playbooks sont chargés et validés au démarrage, pas à l'exécution. Chaque fichier reste aussi exécutable directement pour ne refaire qu'une étape, sans modification.

L'ordre compte à un endroit. L'installateur d'oh-my-zsh génère un `.zshrc` à partir de son modèle quand il n'en trouve pas : il est lancé avec `--keep-zshrc` pour ne pas remplacer un fichier existant, et le déploiement des dotfiles passe après lui. Le `.zshrc` final est donc toujours celui du Gist, quel que soit l'état initial de la machine.

## La gestion des élévations de privilèges

C'est sur ce point que l'écart avec un script shell équivalent est le plus net. Les playbooks tournent en utilisateur normal, et seules trois tâches portent `become: true` : l'installation des paquets `apt`, le passage à zsh comme shell de connexion (module `user`, paramètre `shell`, la modification portant sur `/etc/passwd`) et l'installation de Starship, dont le script place le binaire dans `/usr/local/bin`. oh-my-zsh, ses plugins, fzf, mise et Node.js s'installent en espace utilisateur (`~/.oh-my-zsh`, `~/.local/bin`). Le module `user` vise l'utilisateur `{{ ansible_user_id }}` : ce fait est collecté au début du play, sans élévation, et désigne donc l'utilisateur connecté et non root, alors même que la tâche s'exécute avec `become`. Dans un script bash, ce mélange root/utilisateur deviendrait un enchaînement de `sudo` et de pertes de privilèges difficile à relire. Ici, chaque tâche déclare ce dont elle a besoin.

## L'idempotence en pratique

oh-my-zsh, mise et Starship s'installent par leur script officiel, lancé par le module `shell` avec le paramètre `creates` : la tâche est sautée si le fichier produit par l'installation existe déjà (`~/.oh-my-zsh/oh-my-zsh.sh`, `~/.local/bin/mise`, `/usr/local/bin/starship`). Les commandes passent par `bash` avec `set -o pipefail`, pour qu'un échec de `curl` fasse échouer la tâche au lieu d'être masqué par le code de retour de `sh`, qui réussit sur une entrée vide.

Les plugins sont déclarés dans un dictionnaire (nom du plugin, dépôt) et clonés en boucle par le module `git` avec `update: false` : un plugin déjà présent n'est pas touché, un plugin ajouté au dictionnaire est cloné au provisioning suivant sans toucher aux autres. Ce motif remplace une première version qui enchaînait, pour chaque plugin, un `stat` sur son répertoire puis un clone conditionné par le résultat.

Node.js est installé par mise. Une première tâche lit la version globale courante (`mise current node`, marquée `changed_when: false` puisqu'elle ne modifie rien), et `mise use --global` n'est lancé que si cette version diffère de celle attendue. Pour fzf, l'archive est téléchargée dans un cache sous un nom qui contient la version : changer de version déclenche un nouveau téléchargement, relancer avec la même version n'en déclenche aucun.

Le critère de vérification tient en une ligne : un second passage du provisioning doit se terminer avec `changed=0`.

## La configuration hors du dépôt

`.zshrc`, `.zshenv`, `starship.toml` et le script de barre d'état de Claude Code ne sont pas dans le dépôt. Ils vivent dans deux Gists GitHub, récupérés à chaque provisioning par `get_url` avec `force: true` : le fichier est retéléchargé, mais n'est remplacé, et la tâche marquée `changed`, que si son contenu diffère. Modifier la configuration du shell ne nécessite donc pas de modifier le dépôt Ansible : changer le Gist suffit, et le prochain provisioning prend la nouvelle version.

Les URLs des Gists, les versions de fzf et de Node.js et la liste des plugins sont regroupées dans `group_vars/all.yml`. Le dépôt Ansible porte la mécanique d'installation, ce fichier et les Gists portent la configuration personnelle : pointer vers d'autres Gists ou changer de version ne demande pas de toucher aux playbooks.

Le dernier playbook configure la barre d'état de Claude Code dans `~/.claude/settings.json`, un fichier que d'autres outils modifient aussi. Plutôt que de l'écraser, il le lit (`slurp`), le décode avec le filtre `from_json`, y fusionne la seule clé `statusLine` (filtre `combine`) et ne réécrit le fichier, avec une sauvegarde, que si cette clé diffère de la valeur attendue. Un JSON invalide fait échouer le décodage, donc la tâche, avant toute écriture : un fichier corrompu n'est jamais écrasé.

## Les plugins et outils installés

Quatre plugins tiers sont clonés. `zsh-autosuggestions` suggère en gris une commande tirée de l'historique, acceptée avec la flèche droite. `zsh-syntax-highlighting` colore la commande en cours de frappe selon sa validité. `fzf-tab` remplace le menu de complétion de zsh par une sélection floue fzf. `you-should-use` rappelle l'alias existant quand une commande est tapée en entier. La recherche dans l'historique par sous-chaîne passe par `history-substring-search`, fourni avec oh-my-zsh.

fzf est installé depuis les releases GitHub plutôt que par `apt` : la version des dépôts Ubuntu est trop ancienne pour `fzf --zsh`, qui demande au moins la version 0.48. mise gère Node.js dans le home de l'utilisateur, sans paquet système.

## Tester dans un conteneur

Le README documente un test dans un conteneur `ubuntu:24.04` jetable : installation d'`ansible-core` et de `sudo`, création d'un utilisateur non root doté de `sudo` sans mot de passe, puis deux exécutions de `main.yml`. Le premier passage valide l'installation complète sur un système vierge, sans modifier le shell de la machine de développement ; le second doit afficher `changed=0`, ce qui vérifie l'idempotence. L'utilisateur non root reproduit la situation réelle, où les tâches avec `become` et celles en espace utilisateur ne s'exécutent pas sous la même identité.

## Résultats

- **Un poste ou un conteneur configuré en une commande** : zsh comme shell de connexion, oh-my-zsh et ses plugins, fzf, Node.js, Starship, dotfiles et barre d'état de Claude Code.
- **Un provisioning idempotent vérifié** : un second passage sur la même machine se termine avec `changed=0`.
- **Une configuration personnelle modifiable sans toucher aux playbooks** : dotfiles dans des Gists, versions et plugins dans `group_vars/all.yml`.
- **Des privilèges root limités à trois tâches**, déclarés tâche par tâche.

## Limites connues

Le support est limité à Debian/Ubuntu : tous les `apt` supposent un système compatible. Il n'y a pas de branche `dnf` ou `brew` pour macOS. Pour un usage multi-OS, les tâches système devraient passer par des variables de type `ansible_pkg_mgr` ou des `when: ansible_os_family == 'Debian'`. La table de correspondance des architectures pour fzf ne couvre que `x86_64` et `aarch64` : sur une autre architecture, le playbook échoue.

Les installateurs d'oh-my-zsh, de mise et de Starship sont téléchargés à chaque installation depuis leur source officielle, sans version figée, contrairement à fzf et Node.js. Et comme le paramètre `creates` saute la tâche dès que le binaire existe, relancer le provisioning ne met pas ces outils à jour.

Le test d'idempotence reste manuel : aucun workflow de CI ne lance le provisioning dans un conteneur à chaque modification.

Enfin, Ansible doit être installé avant que le provisioning puisse tourner. Pour un poste entièrement vierge, il faut une étape de bootstrap (`apt install ansible`) que le README ne mentionne que dans la commande de test en conteneur.

## Liens

- 💻 Code source : [github.com/sedelpeuch/zsh_ansible](https://github.com/sedelpeuch/zsh_ansible)
