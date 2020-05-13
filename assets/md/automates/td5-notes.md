---
layout: page
hide: true
title: <i class="fas fa-robot fa-2x"></i> Automates finis et application - TD5
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

## 1. Automates finis non-déterministes

### Exercice 1 : Mots acceptés
Indiquez si les mots suivants sont acceptés par les automates $$A_1$$ et $$A_2$$ en figure $$1$$ (cf. feuille de TD).

| Mots         | $$A_1$$  | $$A_2$$   |
|--------------|--------|---------|
| 1. $$a$$       |  :smile:   |  Oui    |
| 2. $$aba$$     |  Oui   |  Oui    |
| 3. $$baba$$    |  Oui   |  Oui    |
| 4. $$baabab$$  |  Oui   |         |
| 5. $$bbbaabba$$|        |         |


### Exercice 2 : Simulation
Donner un algorithme permettant de décider si $$w \in \Sigma^*$$ est accepté par un AFN $$A$$.

On pourrait faire un algorithme qui examine toutes les exécutions possibles, mais on risque de trouver un arbre de taille exponentielle, donc c'est une idée peu efficace.
Au lieu d'explorer cet arbre, on stocke seulement à chaque "étage" les états différents. Ainsi, il suffit de se souvenir à chaque étape des états accessibles. Si la dernière étape contient un état acceptant, c'est que le mot $$w$$ est accepté par l'automate.

```
fonction appartient(A = (Q, Σ, d, I, F), w=w1...wk) : booléen

    X[0] = I
    
    pour i de 1 à k
        X[i] = {}
        
        pour tout p dans X[i-1]
            pour toute transition p -- wi --> q
                insérer q dans X[i]
                
        pour tout p dans X[k]:
            si p est un état acceptant
                retourner Vrai
                
    retourner Faux
```

On peut étudier la complexité de cet algorithme : on suppose que l'insertion de `q` dans `X[i]` est constante. Dans le pire des cas, 
$$\mathcal{O}(|w| * n^2)$$ avec $$n$$ le nombre de transitions dans l'automate.

NB : Cet algo n'est pas valide s'il y a des transitions $$\varepsilon$$, il faut dans ce cas faire des clôtures instantanées pour déterminer les successeurs correctement.
Ce qui amènerait à une complexité... ?

## 2. Algorithme de déterminisation

Nous avons vu que pour simuler un automate non-déterministe, il suffit de calculer l’ensemble des états atteints après avoir lu un préfixe du mot d’entrée, et de maintenir cet ensemble à jour à chaque lecture d’une lettre.
Le tableau de la figure $$2$$ généralise ce calcul en prenant en compte non pas la lettre lue, mais toutes les lettres possibles de $$\Sigma$$. On commence naturellement par l’ensemble $$\{q_0\}$$ (colonne $$E$$), et l’on calcule les ensembles d’états atteints par une transition $$a$$ et $$b$$ (colonnes $$l$$ et $$F$$). Lorsqu’un ensemble d’états apparaît dans $$F$$ mais pas dans $$E$$, il y est recopié, et le même calcul est effectué sur cet ensemble (cas de $$\{q_0, q_1\}$$ ici).

### Exercice 3 : Power-set construction
Complétez le tableau pour l'AFN $$A_1$$ de la figure $$1$$ (cf feuille TD).
*Nota bene* : il y a exactement le bon nombre de lignes.

|  $$E$$                | $$l$$ | $$F$$                 |
| ------------------- |-----|---------------------|
|  $$\{q_0\}$$          | $$a$$ | $$\{q_0, q_1\}$$      |
|                     | $$b$$ | $$\{q_0\}$$           |
|  $$\{q_0, q_1\}$$     | $$a$$ | $$\{q_0, q_1\}$$      |
|                     | $$b$$ | $$\{q_0, q_2\}$$      |
|  $$\{q_0, q_2\}$$     | $$a$$ | $$\{q_0, q_1, q_3\}$$ |
|                     | $$b$$ | $$\{q_0\}$$           |
| $$\{q_0, q_1, q_3\}$$ | $$a$$ | $$\{q_0, q_1, q_3\}$$ |
|                     | $$b$$ | $$\{q_0, q_2, q_3\}$$ |
| $$\{q_0, q_1, q_3\}$$ | $$a$$ | $$\{q_0, q_1, q_3\}$$ |
|                     | $$b$$ | $$\{q_0, q_3\}$$      |
|  $$\{q_0, q_3\}$$     | $$a$$ | $$\{q_0, q_1, q_3\}$$ |
|                     | $$b$$ | $$\{q_0, q_3\}$$      |


### Exercice 4 : Propriétés de la construction
Dessinez l'automate dons les états sont les ensembles représentés en colonne $$E$$ du tableau de la figure $$2$$ (cf. Tableau ci-dessus), et donc les transitions sont données par les lignes de ce tableau.

1. D'après la construction de $$eqdet(A)$$ vue en cours, quel est l'état initial de l'automate et quels sont ses états accepteurs ?

La cloture $$\varepsilon$$ de l'ensemble des états initiaux.
Les états accepteurs sont les états de $$E$$ qui contiennent un état accepteur de l'automate de départ.

2. Quelle(s) propriété(s) remarquable(s) cet automate possède-t-il ?

Il est **déterministe** et **complet**.


### Exercice 5 : Application de l'algorithme

A l’aide de l’algorithme vu en cours, calculez les automates déterministes correspondant à l’automate $$A_2$$ de la figure $$1$$ (cf. feuille de TD), ainsi qu’aux automates suivants.

*Hint :* JFLAP le fait très bien pour vérifier vos résultats, `Convert > Convert to DFA`.


## 3. Algorithmes sur les automates non-déterministes

### Exercice 6 : Langage vide
Donner un algorithme permettant de décider si le langage accepté par un automate fini
déterministe $$A$$ est vide ou non. Cet algorithme est-il correct pour les automate non-déterministes ?
Quelle est sa complexité ?



### Exercice 7 : Langage universel
Le langage d’automate A est universel s’il contient tous les mots, c’est à dire $$\mathcal{L}(A) = \Sigma^*$$
1. Donner un algorithme permettant de décider si le langage de $$A$$ est universel pour un AFD $$A$$. Quel est sa complexité ?
2. Expliquer pourquoi l'algorithme précédent n'est pas correct si $$A$$ est non-déterministe ?
Donner un algorithme pour les AFN. Quel est sa complexité.

### Exercice 8 : Inclusion des langages
Soient $$A$$ et $$B$$ deux automates finis. On cherche à décider si $$\mathcal{L}(A) \subseteq \mathcal{L}(B)$$.
1. Donner un algorithme dans le cas où $$B$$ est déterministe et $$A$$ quelconque. Quelle est sa complexité ?
2. Expliquer pourquoi cet algorithme n'est pas correct dans le cas où $$B$$ n'est pas déterministe.
Donner un algorithme dans ce cas. Quelle est sa complexité ?

## 4. Complexité de la déterminisation
On s’intéresse à la taille de l’automate déterministe équivalent à un automate non-déterministe donné obtenu par la *power-set construction*. Le nombre d’itérations de la boucle `Tant que` de l’algorithme est égal au nombre d’états de l’automate déterministe. Nous cherchons donc à estimer
ce nombre.


### Exercice 9 : Des automates non-déterministes particuliers
On définit le langage $$\mathcal{L_i}$$ comme celui des mots $$\{a, b\}$$ dont la i-ème lettre en partant de la fin est un $$a$$. Donnez $$3$$ automates finis qui acceptent respectivement $$\mathcal{L_1}$$, $$\mathcal{L_2}$$ et $$\mathcal{L_3}$$. (indication : le non-déterminisme est une aide précieuse).

### Exercice 10 : Taille de l'automate déterministe

Remplissez le tableau suivant. Pour obtenir les automates déterministes demandés, utilisez **JFLAP** (menu `Convert/Convert to DFA`). Vous extrapolerez le cas de $$\mathcal{L_n}$$.

| Langage | Nb. états AND | Nb. états AFD |
|---------|---------------|---------------|
| $$L_1$$   |               |               |
| $$L_2$$   |               |               |
| $$L_3$$   |               |               |
| $$L_n$$ ? |               |               |

### Exercice 11 : Expression régulière et taille de l'AFD
On considère l'alphabet $$\Sigma = \{a, b\}$$.
1. Donner une famille d'AFN pour la famille des langages représentés par les expression régulière $$\Sigma^*a\Sigma^n$$ pour $$n \ge 0$$.
2. A partir de la construction précédente et en utilisant le théorème de **Kleene**, donner une famille d'AFN $$A_n$$ pour les expressions régulières $$E_n$$ définie par $$E_n = \Sigma^*a\Sigma^n + \Sigma^*b\Sigma^n$$. Quelle est la taille de $$A_n$$ et de $$eqdet(A_n)$$ pour $$n$$ valant 1, 2 et 3 ? Extrapolez pour le cas général.

| $$n$$         | Nb. états $$A_n$$ | Nb. états $$eqdet(A_n)$$ |
|-------------|-----------------|------------------------|
| 1           |                 |                        |
| 2           |                 |                        |
| 3           |                 |                        |
| cas général |                 |                        |

3. On considère maintenant la famille d’expressions régulières $$F_n$$ définie par $$F_n = \Sigma^*\Sigma^{n+1}$$.
Donner une famille d’AFN $$B_n$$ qui acceptent le langage des $$F_n$$. Quelle est la taille de $$B_n$$ ? Quelle est la taille de $$eqdet(B_n)$$ pour $$n$$ valant 1, 2 et 3 ? Extrapolez le cas général.

| $$n$$         | Nb. états $$B_n$$ | Nb. états $$eqdet(B_n)$$ |
|-------------|-----------------|------------------------|
| 1           |                 |                        |
| 2           |                 |                        |
| 3           |                 |                        |
| cas général |                 |                        |

4. Comparer les langages de $$E_n$$ et $$F_n$$ ainsi que les tailles de $$eqdet(A_n)$$ et $$eqdet(B_n)$$.

### Exercice 12 : Complexité au pire de la déterminisation

Si $$A$$ est un AFD à $$n$$ états, quel est au pire cas le nombre d’états de
l’automate déterministe équivalent obtenu par la *power-set construction* ? En supposant que l’on dispose d’un programme ne nécessitant qu’une milliseconde pour calculer un état, calculez le temps nécessaire pour rendre déterministe des automates à 5, 10, 50 et 100 états.



