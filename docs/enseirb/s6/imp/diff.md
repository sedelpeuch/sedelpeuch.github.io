---
title: Impératif - diff-patch-svn-git
---

## <i class="fas fa-code"></i> Une nouvelle bibliothèque

#### Exercice 1

La bibiliothèque permet de faire de la manipulation d'automates. L'auteur est
*Julien Allali*. Licence MIT.

#### Exercice 2

    git clone https://github.com/allali/statelib.git

Le système de compilation utilisé est **Cmake**. Compilable avec

    make install

Le système de documentation utilisé est **doxygen**

#### Exercie 3

Ce sont les trois lignes suivantes

```cmake
    install(TARGETS state DESTINATION lib)
    install(TARGETS state_static DESTINATION lib)
    install(FILES src/state.h DESTINATION include)
```

Il faut donc réaliser les commandes suivant pour compiler

```cmake
    cmake -S <path_to_source> -B <path_to_build>
    sudo make install
```

## <i class="fas fa-code"></i> Diff et patch

#### Exercice 4

Précision du cas de renvoie -1.
Pour recompiler la doc

    make doc

#### Exercice 5

La commande nous affiche les différences entre deux fichiers.

    diff -r original new

#### Exercice 6

La commande suivante permet d&rsquo;analyser tous les fichiers et donne un compte
rendu des différences qui sera pas la suite applicable.

    diff -rupN statelib statelib_new > patch

#### Exercice 7

La commande **patch** permet de fusionner les différences avec un patch

## <i class="fas fa-code"></i> Git

Cette partie présente des évidences sur git, je la passe

## <i class="fas fa-code"></i> SVN

SVN repose sur un système de versionning centralisé. Cela signifie qu’un seul
répertoire général existe et tous les utilisateurs y ont accès. Etant donné que
les modifications ne peuvent être fusionnées, le système empêche que deux
utilisateurs modifient un même fichier simultanément. Ce dernier est attribué au
premier internaute qui l’ouvre et il reste protégé des autres utilisateurs tant
qu’il n’a pas été fermé. Apache Subversion permet également de charger et de
modifier les sous-chemins indépendamment du reste de l’arborescence. C’est ainsi
que les droits de lecture et d’écriture sont affectés pour la totalité des
chemins aux différents utilisateurs. En outre, Suversion se caractérise par le
fait que des répertoires vides, renommés voire déplacés peuvent être enregistrés
sans causer de perte dans l’historique.

SVN fonctionne comme git en ce qui concerne les **commits** et les **add**.
Cependant pour initialiser le dossier il faut réalilser les commandes suivantes.

    svnadmin --compatible-version 1.5 create pg106

**Attention : on ne travaille jamais directement dans le dépôt mais dans un**
**autre répertoire synchronisé avec le dépôt !**
Puis dans le répertoire de travail

    svn checkout file://$HOME/.depots/pg106

