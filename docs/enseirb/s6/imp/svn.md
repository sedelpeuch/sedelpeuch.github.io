---
layout: page
hide: true
title: Impératif - svn-tests
---

## <i class="fas fa-code"></i> SVN

### Exercice 1 : création d'un dépot local
La commande permettant de créer un dépot local est `svnadmin
--compatible-version 1.5 create pg106`. Cependant **on ne travaille jamais
directement dans le dépot mais dans un autre répertoire synchronisé avec le
dépôt**. Pour synchroniser deux dossiers on utilise le commande `svn checkout
file://$HOME/.depots/pg106`. 

### Exercice 2 : structure de travail 
Le travail se divise en trois répertoires **trunk**, **branches** et **tags**.

### Exercice 3 : ajout des sources
Ajout de sources se fait dans le **trunk**, pour transmettre ces modificaions au
dépot on réalise un **commit**.

### Exercice 4 : création d'une branche
La création d'une branche se faire avec la commande `svn copy` qui crée une
branche de le répertoire **branches**.

### Exercice 9 : de la branche au tronc 
Une fois la branche à jour et les développements de branche finis, on utilise la
commande `svn merge` pour rapatrier les modifications de la branche dans le
tronc.

## <i class="fas fa-code"></i> Couverture 

### Exercice 10 : a la main
En utilisant `gcc` compiler à la main la bibliothèque avec l'option
`--coverage`. Ensuite utiliser `gcov fichier.c` cela produit un
`fichier.c.gcov`, le fichier contient toutes les informations de couveture de
tests.

### Ecercice 12 : en utilisant cmake
A faire : ajuster les options de compilation pour avoir des informations de
courverture lors du lancement des tets.
