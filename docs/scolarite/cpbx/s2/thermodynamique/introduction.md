---
title: "Introduction et concepts généraux"
description: "Description des systèmes macroscopiques, cadre de la thermodynamique (système, variables et équations d'état), états d'équilibre et types de transformations."
sidebar_position: 1
---

La thermodynamique est la science des transformations de la matière et de l'énergie.

## Impossibilité d'une description exacte des systèmes macroscopiques

### Phases condensées

Taille de la molécule, peu dilatables et peu compressibles.

**Solide :** les molécules sont constamment les mêmes voisines.

**Liquide :** les molécules changent progressivement de voisines.

### Phase diluée

La distance moyenne entre deux molécules est très grande, les gaz sont très compressibles et dilatables.

### Agitation thermique

- Vibrations pour les solides.
- Déplacement des unes par rapport aux autres dans les liquides.
- Collisions ou trajectoires rectilignes dans les gaz.

### Quelques formules

- $PV = nRT$
- $R = N_A k_B$
- $V_m = \dfrac{V}{N}$
- $E_c = \dfrac{1}{2} m \langle v^2 \rangle = \dfrac{3}{2} k_B T \Rightarrow v_q = \sqrt{\langle v^2 \rangle}$
- Théorème d'équipartition de l'énergie : $\dfrac{1}{2} k_B T$
- On arrive à un temps moyen entre deux collisions de 1 ns.

## Cadre de la thermodynamique

### Système

L'univers moins le système est appelé le **milieu extérieur**.

Un système peut échanger avec le milieu extérieur :

- de la matière (fermé / ouvert) ;
- de l'énergie sous la forme de travail mécanique ;
- de l'énergie sous la forme de travail électrique ;
- de l'énergie sous la forme de chaleur (adiabatique / diathermane).

### Variables, fonctions et équations d'état

Variables d'état : grandeurs qui caractérisent l'état macroscopique.

- Les variables extensives, proportionnelles à la taille du système.
- Les variables intensives, indépendantes de la taille du système.
- Les variables additives, si elles sont égales à la somme de leurs valeurs pour chaque sous-système.

### Remarques

- Une variable ni doublée, ni constante lorsqu'on double le système n'est ni extensive, ni intensive.
- Le rapport de deux variables extensives est une variable intensive de densité.
- Si les variables intensives sont constantes spatialement, alors le système est homogène ; si elles le sont temporellement, alors il est stationnaire.
- Les quantités énergétiques du système sont des fonctions d'état.

### Remarques sur les gaz parfaits

Empiriquement établie par Avogadro, l'équation des gaz parfaits ne décrit pas la totalité des caractéristiques des gaz.

Il y a donc eu plusieurs corrections :

- équation de Van der Waals : $\left(P + \dfrac{n^2 a}{V^2}\right)(V - nb) = nRT$ ;
- équation de Dieterici : $P \exp\left(\dfrac{na}{RTV}\right)(V - nb) = nRT$ ;
- équation d'état de Berthelot : $\left(P + \dfrac{a}{TV^2}\right)(V - nb) = nRT$.

## État d'équilibre

**État d'équilibre thermodynamique :** situation particulière où le système n'échange rien, ses grandeurs d'état sont constantes et bien définies.

**États d'équilibre contraints :** dispositif interne au système qui maintient l'inhomogénéité des grandeurs d'état intensives tout en permettant l'équilibre thermodynamique.

**États d'équilibre naturels :** absence de toute contrainte interne, le système est en équilibre thermique avec l'extérieur et en équilibre mécanique.

**Équilibre osmotique :** absence d'échange de matière.

**Équilibre thermique :** absence d'échange de chaleur.

## Transformations, retour à l'équilibre

### Définition

Une transformation est le passage d'un état d'équilibre initial à un état d'équilibre final sous l'influence d'une perturbation, c'est-à-dire une modification du milieu extérieur.

Lorsque l'état final est identique à l'état initial, la transformation est dite cyclique.

Lorsque la transformation est une modification infiniment petite des paramètres externes, elle est dite infinitésimale ou élémentaire.

Contrairement aux états d'équilibre, au cours des transformations, les grandeurs d'état n'ont donc pas une valeur unique.

### Différents types de transformations

**Quasi statique :** induite par une modification progressive en laissant du temps au système à chaque étape. Il y a des états d'équilibre intermédiaires.

**Réversible :** c'est une succession d'états d'équilibre infiniment voisins ; dans une transformation réversible, les variables d'état sont définies à chaque instant, la transformation est quasi statique sans source d'irréversibilité.

**Irréversible :** c'est une modification brusque du système.

| Type | Caractéristiques |
| --- | --- |
| Isotherme, $T = cte$ | Transformation réversible |
| Isobare, $P = cte$ | Transformation quasi statique, pas forcément réversible |
| Isochore, $V = cte$ | / |
| Isentropique, $\text{entropie} = cte$ | Transformation adiabatique et réversible |
| Monotherme, $T = var$, $T_i = T_f$ | Transformation irréversible |
| Monobare, $P = var$, $P_i = P_f$ | Transformation irréversible |
| Adiabatique | Pas d'échange de chaleur entre le système et le milieu extérieur |

Les notions de thermostat et de pressiostat caractérisent des systèmes dont la taille est suffisamment grande pour qu'un apport reste négligeable (l'atmosphère par exemple).
