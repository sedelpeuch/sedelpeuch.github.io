---
title: Impératif - diff, patch, SVN et Git
description: "Notes de TD sur l'installation d'une bibliothèque CMake, la génération et l'application de correctifs avec diff et patch, et les bases de SVN."
---

## Une nouvelle bibliothèque

### Exercice 1

La bibliothèque permet de faire de la manipulation d'automates. L'auteur est
*Julien Allali*. Licence MIT.

### Exercice 2

```bash
git clone https://github.com/allali/statelib.git
```

Le système de compilation utilisé est **CMake** (génération d'un Makefile, puis `make install`).

Le système de documentation utilisé est **Doxygen**.

### Exercice 3

Ce sont les trois lignes suivantes :

```cmake
install(TARGETS state DESTINATION lib)
install(TARGETS state_static DESTINATION lib)
install(FILES src/state.h DESTINATION include)
```

Il faut donc réaliser les commandes suivantes pour compiler et installer :

```bash
cmake -S <path_to_source> -B <path_to_build>   # génère le Makefile dans le répertoire de build
cd <path_to_build>
sudo make install                              # compile puis installe dans lib/ et include/
```

## Diff et patch

### Exercice 4

Précision du cas de renvoi de -1.
Pour recompiler la documentation :

```bash
make doc
```

### Exercice 5

La commande suivante affiche les différences entre deux fichiers (récursivement pour deux répertoires avec `-r`) :

```bash
diff -r original new
```

### Exercice 6

La commande suivante permet d'analyser tous les fichiers et produit un compte
rendu des différences (au format unifié) qui sera par la suite applicable avec `patch`.

```bash
diff -rupN statelib statelib_new > patch
```

### Exercice 7

La commande **patch** permet d'appliquer un correctif produit par `diff` :

```bash
cd statelib
patch -p1 < ../patch
```

## Git

Cette partie présente des bases de Git, non reprises ici.

## SVN

SVN repose sur un système de gestion de versions centralisé. Cela signifie qu'un seul
dépôt central existe et que tous les utilisateurs y accèdent. Par défaut, SVN suit le modèle
copier-modifier-fusionner : chacun modifie sa copie de travail, et les modifications
concurrentes d'un même fichier sont fusionnées lors de la mise à jour (`svn update`), les
conflits éventuels étant résolus à la main. Pour les fichiers difficiles à fusionner
(binaires), SVN propose aussi un verrouillage explicite (`svn lock`), qui réserve le fichier
à un utilisateur jusqu'à sa libération. Apache Subversion permet également de récupérer et de
modifier des sous-arborescences indépendamment du reste du dépôt, et d'attribuer des droits
de lecture et d'écriture chemin par chemin. En outre, Subversion versionne les répertoires :
des répertoires vides, renommés voire déplacés peuvent être enregistrés
sans perte d'historique.

SVN fonctionne comme git en ce qui concerne les **commits** et les **add**.
Cependant, pour initialiser le dépôt, il faut réaliser la commande suivante (depuis le répertoire `~/.depots`) :

```bash
svnadmin --compatible-version 1.5 create pg106
```

**Attention : on ne travaille jamais directement dans le dépôt, mais dans un
autre répertoire synchronisé avec le dépôt !**
Puis, dans le répertoire de travail :

```bash
svn checkout file://$HOME/.depots/pg106
```
