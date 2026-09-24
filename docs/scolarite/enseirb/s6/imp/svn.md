---
title: Impératif - SVN et tests
description: "Notes de TD sur SVN (dépôt local, trunk, branches, fusion) et sur la mesure de couverture de tests avec gcov."
---

## SVN

### Exercice 1 : création d'un dépôt local

La commande permettant de créer un dépôt local (ici dans `~/.depots`) est `svnadmin --compatible-version 1.5 create pg106`. Cependant, **on ne travaille jamais
directement dans le dépôt, mais dans un autre répertoire synchronisé avec le
dépôt**. Pour créer cette copie de travail, on utilise la commande `svn checkout file://$HOME/.depots/pg106`.

### Exercice 2 : structure de travail

Le travail se divise en trois répertoires **trunk**, **branches** et **tags**.

### Exercice 3 : ajout des sources

L'ajout de sources se fait dans le **trunk** (`svn add`) ; pour transmettre ces modifications au
dépôt, on réalise un **commit** (`svn commit`).

### Exercice 4 : création d'une branche

La création d'une branche se fait avec la commande `svn copy`, qui copie le **trunk** dans le répertoire **branches**.

### Exercice 9 : de la branche au tronc

Une fois la branche à jour et les développements de branche finis, on utilise la
commande `svn merge` pour rapatrier les modifications de la branche dans le
tronc.

## Couverture

### Exercice 10 : à la main

En utilisant `gcc`, compiler à la main la bibliothèque avec l'option
`--coverage`, puis exécuter les tests. Ensuite, `gcov fichier.c` produit un fichier
`fichier.c.gcov` qui contient toutes les informations de couverture de
tests (nombre d'exécutions de chaque ligne).

### Exercice 12 : en utilisant CMake

À faire : ajuster les options de compilation (par exemple `--coverage` dans `CMAKE_C_FLAGS` et à l'édition de liens) pour avoir des informations de
couverture lors du lancement des tests.
