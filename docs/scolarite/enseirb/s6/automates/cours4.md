---
title: Grammaires
description: "Grammaires formelles : dérivation, langage généré, grammaires régulières, hiérarchie de Chomsky, arbres de dérivation et ambiguïté."
---

Un automate fini est une description analytique d'un langage régulier : c'est un algorithme pour reconnaître les mots du langage. Les grammaires donnent une description générative d'un langage : elles explicitent des règles de construction des mots du langage. Nous connaissons déjà la notion de grammaire en langage naturel. Par exemple, en français, une phrase déclarative a la forme : "sujet" + "verbe" + "complément". La grammaire a pour rôle de fixer la structure des phrases. En informatique, les grammaires sont couramment utilisées pour définir la syntaxe des langages de programmation et pour construire les compilateurs.

## Grammaire, dérivation, langage

Une `grammaire` est un quadruplet $G=(V,\Sigma,R,S)$ où :

* $V$ et $\Sigma$ sont deux alphabets disjoints. Les symboles de $V$ sont dits non terminaux, ceux de $\Sigma$ sont dits terminaux ;
* $R \subseteq (V \cup \Sigma)^\ast \times (V \cup \Sigma)^\ast$ est un ensemble fini de règles $(\alpha,\beta)$ telles que $\alpha$ contient au moins un symbole non terminal ;
* $S \in V$ est le symbole non terminal initial.

Les symboles non terminaux (i.e. les symboles de $V$) sont usuellement notés par des lettres majuscules $A,B,\ldots$, alors que les symboles terminaux (i.e. les symboles de $\Sigma$) sont représentés par des lettres minuscules $a,b,\ldots$. L'ensemble $R$ définit les règles de substitution. Une règle $(\alpha,\beta)$ sera souvent représentée sous la forme $\alpha \rightarrow \beta$. Elle signifie que $\beta$ peut être substitué à $\alpha$. Le symbole non terminal initial est généralement noté $S$. Lorsqu'une grammaire comporte plusieurs règles avec le même membre gauche, par exemple $A \rightarrow aA$ et $A \rightarrow Bb$, on écrit souvent $A \rightarrow aA \mid Bb$ pour simplifier.

Une grammaire $G=(V,\Sigma,R,S)$ `dérive` $v \in (V \cup \Sigma)^\ast$ à partir de $u \in (V \cup \Sigma)^\ast$, noté $u \Rightarrow v$, s'il est possible de décomposer $u=xu'y$ et $v=xv'y$ où $u' \rightarrow v'$ est une règle de $R$. On note $\Rightarrow^\ast$ la fermeture réflexive et transitive de $\Rightarrow$ (dérivation en un nombre quelconque d'étapes).

Le `langage généré` par une grammaire $G=(V,\Sigma,R,S)$ est l'ensemble des mots dérivés depuis le symbole initial $S$ qui ne contiennent que des symboles terminaux : $\mathcal{L}(G)=\{\omega \in \Sigma^\ast \mid S \Rightarrow^\ast \omega\}$.

## Grammaires régulières et langages réguliers

Dans cette section, on étudie les grammaires qui génèrent les langages réguliers.

Une grammaire $G=(V,\Sigma,R,S)$ est `linéaire droite` si toutes les règles de $R$ ont la forme $A \rightarrow \omega B$ ou $A \rightarrow \omega$ pour $A, B \in V$ et $\omega \in \Sigma^\ast$. Elle est `linéaire gauche` si toutes ses règles ont la forme $A \rightarrow B \omega$ ou $A \rightarrow \omega$.

On appelle `grammaire régulière` une grammaire qui est soit linéaire gauche, soit linéaire droite.

### Théorème

Un langage $L$ est régulier si et seulement s'il est généré par une grammaire régulière :

* pour toute grammaire régulière $G=(V,\Sigma,R,S)$, il existe un automate fini $A_G$ qui accepte le langage $\mathcal{L}(G)$ ;
* pour tout automate fini déterministe $A=(Q,\Sigma,\delta,q_0,F)$, il existe une grammaire régulière qui génère le langage $\mathcal{L}(A)$.

## Au-delà des grammaires régulières

Toutes les grammaires ne sont pas régulières. Il existe des grammaires (y compris linéaires, comme $S \rightarrow aSb \mid \varepsilon$) qui génèrent des langages non réguliers.

Le linguiste et informaticien Noam Chomsky a défini la classification suivante des grammaires.

### Type 3

Les grammaires régulières, dont les règles sont toutes linéaires droites ($A \rightarrow \omega B$, $A \rightarrow \omega$) ou toutes linéaires gauches ($A \rightarrow B\omega$, $A \rightarrow \omega$), où $A,B \in V$ et $\omega \in \Sigma^\ast$. Le membre gauche d'une règle est seulement constitué d'un symbole non terminal. Le membre droit contient au plus un symbole non terminal, à droite (resp. à gauche) des symboles terminaux. Le langage généré par une grammaire régulière est régulier, et donc accepté par un automate fini.

### Type 2

Les grammaires hors contexte, dont les productions sont de la forme $A \rightarrow \beta$ où $A \in V$ et $\beta \in (V \cup \Sigma)^\ast$. Seul le membre gauche est contraint : il ne peut s'agir que d'un seul symbole non terminal. Le langage d'une grammaire hors contexte est accepté par un automate à pile (non déterministe).

### Type 1

Les grammaires contextuelles ont des productions de la forme $\alpha \rightarrow \beta$, où $\alpha,\beta \in (V \cup \Sigma)^\ast$, $\alpha$ contient au moins un symbole non terminal, et $\beta$ contient au moins autant de symboles que $\alpha$ : $|\alpha| \leq |\beta|$. La règle $S \rightarrow \varepsilon$ est autorisée si $S$ n'apparaît en membre droit d'aucune règle. Les langages contextuels sont acceptés par des automates linéairement bornés.

### Type 0

Aucune restriction. Les langages définis par de telles grammaires sont reconnus par des machines de Turing, sans garantie de terminaison sur les mots qui n'appartiennent pas au langage (langages récursivement énumérables).

On peut montrer que les familles de langages associées à ces types sont incluses les unes dans les autres, mais non égales. Ainsi, tous les langages générés par une grammaire de type $i$ ($1 \leq i \leq 3$) peuvent être générés par une grammaire de type $i-1$. De plus, pour chaque $0 \leq i \leq 2$, il existe des langages générés par une grammaire de type $i$ mais par aucune grammaire de type $i+1$. Il existe également des langages qui ne sont générés par aucune grammaire.

## Arbre de dérivation, ambiguïté

Les grammaires sont fréquemment utilisées pour décrire des langages naturels, des langages de programmation, ou encore des langages de description. Elles permettent de décrire de manière formelle ces langages et donc de construire des compilateurs pour ces langages. Le compilateur vérifie qu'un mot appartient au langage, et il reconstitue en général la structure de ce mot afin de pouvoir lui appliquer des transformations.

Un `arbre de dérivation` d'un mot $\omega$ par une grammaire hors contexte $G=(V,\Sigma,R,S)$ est un arbre fini :

* de racine $S$ ;
* dont les feuilles sont étiquetées par des symboles terminaux (ou par $\varepsilon$) ;
* dont les nœuds intermédiaires sont étiquetés par des symboles non terminaux ;
* tel que, si un nœud $n$ étiqueté par un symbole non terminal $A \in V$ possède les fils $n_1,\ldots,n_k$ dans cet ordre, alors $A \rightarrow n_1 \ldots n_k$ est une règle de $G$ ;
* et tel que la concaténation des feuilles de l'arbre de gauche à droite donne le mot $\omega$.

Un arbre de dérivation explicite donc comment un mot est généré par la grammaire, en partant du symbole initial $S$ et en remplaçant successivement les symboles non terminaux à l'aide d'une des règles de la grammaire. Il s'agit d'une description structurée de la dérivation d'un mot par une grammaire, telle que définie précédemment.

Une grammaire $G=(V,\Sigma,R,S)$ est `ambiguë` s'il existe un mot $\omega \in \Sigma^\ast$ généré par $G$ pour lequel il existe (au moins) deux arbres de dérivation distincts. Une grammaire qui admet au plus un arbre de dérivation pour tout mot $\omega \in \Sigma^\ast$ est dite non ambiguë.

Déterminer si une grammaire hors contexte est ambiguë est un problème indécidable : aucun algorithme ne permet de le décider pour toute grammaire.
