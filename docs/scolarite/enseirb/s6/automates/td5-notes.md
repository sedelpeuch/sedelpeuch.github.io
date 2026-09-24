---
title: Automates finis et applications - TD5
description: "Notes du TD5 d'automates finis : simulation d'un AFN, construction par sous-ensembles, langage vide, universalité, inclusion et coût exponentiel de la déterminisation."
---

Merci à Aurélien et Fabien pour la prise de notes durant les séances de questions-réponses (initialement publiée sur l'instance de démonstration CodiMD, aujourd'hui supprimée).

## 1. Automates finis non déterministes

### Exercice 1 : Mots acceptés

Indiquez si les mots suivants sont acceptés par les automates $A_1$ et $A_2$ en figure $1$ (cf. feuille de TD).

| Mots          | $A_1$ | $A_2$ |
|---------------|-------|-------|
| 1. $a$        | Non   | Oui   |
| 2. $aba$      | Oui   | Oui   |
| 3. $baba$     | Oui   | Oui   |
| 4. $baabab$   | Oui   | Non   |
| 5. $bbbaabba$ | Non   | Oui   |

### Exercice 2 : Simulation

Donner un algorithme permettant de décider si $w \in \Sigma^*$ est accepté par un AFN $A$.

On pourrait faire un algorithme qui examine toutes les exécutions possibles, mais l'arbre des exécutions peut être de taille exponentielle : c'est donc une idée peu efficace.
Au lieu d'explorer cet arbre, on stocke seulement à chaque "étage" les états différents. Ainsi, il suffit de se souvenir à chaque étape des états accessibles. Si la dernière étape contient un état acceptant, c'est que le mot $w$ est accepté par l'automate.

```text
fonction appartient(A = (Q, Σ, δ, I, F), w = w1...wk) : booléen

    X[0] = I

    pour i de 1 à k
        X[i] = {}

        pour tout p dans X[i-1]
            pour toute transition p -- wi --> q
                insérer q dans X[i]

    pour tout p dans X[k]
        si p est un état acceptant
            retourner Vrai

    retourner Faux
```

On peut étudier la complexité de cet algorithme : on suppose que l'insertion de `q` dans `X[i]` se fait en temps constant et que les transitions sont rangées par état de départ. À chaque lettre, chaque transition est examinée au plus une fois, d'où une complexité dans le pire des cas en $\mathcal{O}(|w| \times m)$, avec $m$ le nombre de transitions de l'automate.

NB : cet algorithme n'est pas valide s'il y a des transitions $\varepsilon$ ; il faut dans ce cas calculer des clôtures instantanées pour déterminer les successeurs correctement.
Chaque clôture se calcule par un parcours en $\mathcal{O}(n + m)$ ($n$ états, $m$ transitions), d'où une complexité totale en $\mathcal{O}(|w| \times (n + m))$.

## 2. Algorithme de déterminisation

Nous avons vu que pour simuler un automate non déterministe, il suffit de calculer l'ensemble des états atteints après avoir lu un préfixe du mot d'entrée, et de maintenir cet ensemble à jour à chaque lecture d'une lettre.
Le tableau de la figure $2$ généralise ce calcul en prenant en compte non pas la lettre lue, mais toutes les lettres possibles de $\Sigma$. On commence naturellement par l'ensemble $\{q_0\}$ (colonne $E$), et l'on calcule les ensembles d'états atteints par une transition $a$ et $b$ (colonnes $l$ et $F$). Lorsqu'un ensemble d'états apparaît dans $F$ mais pas dans $E$, il y est recopié, et le même calcul est effectué sur cet ensemble (cas de $\{q_0, q_1\}$ ici).

### Exercice 3 : Construction par sous-ensembles (*power-set construction*)

Complétez le tableau pour l'AFN $A_1$ de la figure $1$ (cf. feuille de TD).
*Nota bene* : il y a exactement le bon nombre de lignes.

| $E$                 | $l$ | $F$                 |
|---------------------|-----|---------------------|
| $\{q_0\}$           | $a$ | $\{q_0, q_1\}$      |
|                     | $b$ | $\{q_0\}$           |
| $\{q_0, q_1\}$      | $a$ | $\{q_0, q_1\}$      |
|                     | $b$ | $\{q_0, q_2\}$      |
| $\{q_0, q_2\}$      | $a$ | $\{q_0, q_1, q_3\}$ |
|                     | $b$ | $\{q_0\}$           |
| $\{q_0, q_1, q_3\}$ | $a$ | $\{q_0, q_1, q_3\}$ |
|                     | $b$ | $\{q_0, q_2, q_3\}$ |
| $\{q_0, q_2, q_3\}$ | $a$ | $\{q_0, q_1, q_3\}$ |
|                     | $b$ | $\{q_0, q_3\}$      |
| $\{q_0, q_3\}$      | $a$ | $\{q_0, q_1, q_3\}$ |
|                     | $b$ | $\{q_0, q_3\}$      |

### Exercice 4 : Propriétés de la construction

Dessinez l'automate dont les états sont les ensembles représentés en colonne $E$ du tableau de la figure $2$ (cf. tableau ci-dessus), et dont les transitions sont données par les lignes de ce tableau.

1. D'après la construction de $eqdet(A)$ vue en cours, quel est l'état initial de l'automate et quels sont ses états accepteurs ?

   L'état initial est la clôture $\varepsilon$ de l'ensemble des états initiaux.
   Les états accepteurs sont les ensembles de la colonne $E$ qui contiennent un état accepteur de l'automate de départ.

2. Quelle(s) propriété(s) remarquable(s) cet automate possède-t-il ?

   Il est **déterministe** et **complet**.

### Exercice 5 : Application de l'algorithme

À l'aide de l'algorithme vu en cours, calculez les automates déterministes correspondant à l'automate $A_2$ de la figure $1$ (cf. feuille de TD), ainsi qu'aux automates suivants.

*Astuce :* JFLAP le fait très bien pour vérifier vos résultats, `Convert > Convert to DFA`.

## 3. Algorithmes sur les automates non déterministes

### Exercice 6 : Langage vide

Donner un algorithme permettant de décider si le langage accepté par un automate fini
déterministe $A$ est vide ou non. Cet algorithme est-il correct pour les automates non déterministes ?
Quelle est sa complexité ?

Le langage est non vide ssi il existe une **exécution acceptante**,
ssi il existe un **état acceptant accessible depuis un état initial**.

On fait donc un parcours (en profondeur ou en largeur) depuis les états initiaux, dont la complexité est linéaire en le nombre d'états et de transitions : $\mathcal{O}(|Q| + |\delta|)$. Le raisonnement ne dépend pas du déterminisme : l'algorithme est aussi correct pour les AFN (en suivant aussi les transitions $\varepsilon$).

### Exercice 7 : Langage universel

Le langage d'un automate $A$ est universel s'il contient tous les mots, c'est-à-dire $\mathcal{L}(A) = \Sigma^*$.

1. Donner un algorithme permettant de décider si le langage de $A$ est **universel** pour un AFD $A$. Quelle est sa complexité ?

   On teste si le langage de $\overline{A}$ (obtenu en échangeant états accepteurs et non accepteurs) est vide. Il faut s'assurer du **déterminisme** et de la **complétude** de $A$ ; la complexité est alors linéaire en la taille de $A$.

2. Expliquer pourquoi l'algorithme précédent n'est pas correct si $A$ est non déterministe. Donner un algorithme pour les AFN. Quelle est sa complexité ?

   Si $A$ n'est pas déterministe, l'algorithme précédent n'est pas valide car la complémentation n'est pas correcte : il peut exister un mot accepté à la fois par l'automate et par son "prétendu" complémentaire.
   Dans ce cas, il faut **déterminiser** l'automate $A$, puis vérifier que $\mathcal{L}(\overline{\text{eqdet}(A)}) = \emptyset$ (le complémentaire est vide).

   Il faut cependant noter que la déterminisation est de complexité exponentielle dans le pire des cas (le problème de l'universalité pour les AFN est PSPACE-complet). En revanche, le calcul du complémentaire d'un AFD complet est linéaire.

### Exercice 8 : Inclusion des langages

Soient $A$ et $B$ deux automates finis. On cherche à décider si $\mathcal{L}(A) \subseteq \mathcal{L}(B)$.

1. Donner un algorithme dans le cas où $B$ est déterministe et $A$ quelconque. Quelle est sa complexité ?

   $\mathcal{L}(A) \subseteq \mathcal{L}(B) \Leftrightarrow \mathcal{L}(A) \cap \mathcal{L}(\overline{B}) = \emptyset$, où $\overline{B}$ est le complémentaire de $B$ rendu complet. On teste le vide de l'automate produit de $A$ et $\overline{B}$, en $\mathcal{O}(|A| \times |B|)$.

2. Expliquer pourquoi cet algorithme n'est pas correct dans le cas où $B$ n'est pas déterministe. Donner un algorithme dans ce cas. Quelle est sa complexité ?

   Pour la même raison qu'à l'exercice 7, le complémentaire d'un AFN ne se calcule pas en échangeant les états accepteurs : il faut d'abord déterminiser $B$, ce qui rend l'algorithme exponentiel dans le pire des cas.

## 4. Complexité de la déterminisation

On s'intéresse à la taille de l'automate déterministe équivalent à un automate non déterministe donné, obtenu par la construction par sous-ensembles. Le nombre d'itérations de la boucle `Tant que` de l'algorithme est égal au nombre d'états de l'automate déterministe. Nous cherchons donc à estimer ce nombre.

### Exercice 9 : Des automates non déterministes particuliers

On définit le langage $\mathcal{L}_i$ comme celui des mots sur $\{a, b\}$ dont la $i$-ème lettre en partant de la fin est un $a$. Donnez $3$ automates finis qui acceptent respectivement $\mathcal{L}_1$, $\mathcal{L}_2$ et $\mathcal{L}_3$ (indication : le non-déterminisme est une aide précieuse).

On s'appuie sur l'exemple du cours : un état initial qui boucle sur $a$ et $b$, une transition $a$ qui « devine » la position de la $i$-ème lettre avant la fin, puis $i-1$ transitions $a, b$ jusqu'à l'état accepteur. Les schémas de $\mathcal{L}_1$ et $\mathcal{L}_2$ étaient hébergés sur l'instance CodiMD, qui n'existe plus.

### Exercice 10 : Taille de l'automate déterministe

Remplissez le tableau suivant. Pour obtenir les automates déterministes demandés, utilisez **JFLAP** (menu `Convert/Convert to DFA`). Vous extrapolerez le cas de $\mathcal{L}_n$.

| Langage | Nb. états AFN | Nb. états AFD |
|---------|---------------|---------------|
| $L_1$   | 2             | 2             |
| $L_2$   | 3             | 4             |
| $L_3$   | 4             | 8             |
| $L_n$ ? | $n+1$         | $2^n$         |

Coût de l'opération : **exponentiel**.

### Exercice 11 : Expression régulière et taille de l'AFD

On considère l'alphabet $\Sigma = \{a, b\}$.

1. Donner une famille d'AFN pour la famille des langages représentés par les expressions régulières $\Sigma^*a\Sigma^n$ pour $n \ge 0$.

   Comme dans l'exercice précédent, avec un décalage d'indice.

2. À partir de la construction précédente et en utilisant le théorème de **Kleene**, donner une famille d'AFN $A_n$ pour les expressions régulières $E_n$ définies par $E_n = \Sigma^*a\Sigma^n + \Sigma^*b\Sigma^n$. Quelle est la taille de $A_n$ et de $eqdet(A_n)$ pour $n$ valant 1, 2 et 3 ? Extrapolez pour le cas général.

| $n$         | Nb. états $A_n$ | Nb. états $eqdet(A_n)$ |
|-------------|-----------------|------------------------|
| 1           | 8               | 7                      |
| 2           | 10              | 15                     |
| 3           | 12              | 31                     |
| cas général | $2(n+2) + 2$    | $2^{n+2} - 1$          |

3. On considère maintenant la famille d'expressions régulières $F_n$ définie par $F_n = \Sigma^*\Sigma^{n+1}$.
   Donner une famille d'AFN $B_n$ qui acceptent le langage des $F_n$. Quelle est la taille de $B_n$ ? Quelle est la taille de $eqdet(B_n)$ pour $n$ valant 1, 2 et 3 ? Extrapolez le cas général.

   $\mathcal{L}(F_n) = \mathcal{L}(E_n)$, car
   $\Sigma^*a\Sigma^n + \Sigma^*b\Sigma^n = \Sigma^*\Sigma^{n+1}$.

| $n$         | Nb. états $B_n$ | Nb. états $eqdet(B_n)$ |
|-------------|-----------------|------------------------|
| 1           | 3               | 3                      |
| 2           | 4               | 4                      |
| 3           | 5               | 5                      |
| cas général | $n+2$           | $n+2$                  |

4. Comparer les langages de $E_n$ et $F_n$ ainsi que les tailles de $eqdet(A_n)$ et $eqdet(B_n)$.

   Les langages sont égaux, mais la taille de l'automate déterminisé dépend de l'AFN de départ : exponentielle pour $A_n$, linéaire pour $B_n$.

### Exercice 12 : Complexité au pire de la déterminisation

Si $A$ est un AFN à $n$ états, quel est au pire cas le nombre d'états de l'automate déterministe équivalent obtenu par la construction par sous-ensembles ? En supposant que l'on dispose d'un programme ne nécessitant qu'une milliseconde pour calculer un état, calculez le temps nécessaire pour rendre déterministes des automates à 5, 10, 50 et 100 états.

Au pire $2^n$ états : le coût est **exponentiel**.

* $2^{5} = 32$, donc 32 ms.
* $2^{10} \approx 10^3$, donc environ 1 seconde.
* $2^{50} \approx 1{,}1 \times 10^{15}$ ms. Or :
  * 1 heure $= 3{,}6 \times 10^6$ ms ;
  * 1 jour $\approx 8{,}6 \times 10^7$ ms ;
  * 1 an $\approx 3{,}2 \times 10^{10}$ ms.

  Donc environ **36 000 ans**.
* $2^{100} \approx 1{,}3 \times 10^{30}$ ms, soit environ $4 \times 10^{19}$ ans : bien plus longtemps que le confinement.
