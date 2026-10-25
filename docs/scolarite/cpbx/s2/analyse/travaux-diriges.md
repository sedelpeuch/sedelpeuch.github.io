---
title: "Travaux dirigés"
description: "Énoncés des exercices de travaux dirigés d'analyse : séries numériques, intégrales et primitives, formule de Taylor, sommes de Riemann, arcs paramétrés, dénombrement, probabilités et variables aléatoires."
sidebar_position: 10
sidebar_custom_props:
  kind: td
---

## Séries numériques

**Exercice 1.** Étudier la nature des séries suivantes :

1. $\sum \cos(n)$
2. $\sum \left(\frac{1}{n+1} - \frac{1}{n}\right)$
3. $\sum (\sqrt{n+1} - \sqrt{n})$
4. $\sum \frac{n}{n^2 + 4}$
5. $\sum \sin\left(\frac{1}{n^2}\right)$
6. $\sum \sin\left(\frac{1}{n^\beta}\right)$

**Exercice 2.** Déterminer la nature des séries dont les termes généraux sont les suivants :

1. $\sum \frac{n}{n+3}$
2. $\sum \sqrt{n^4 + 2} - \sqrt{n^4 + 1}$
3. $\sum \frac{n}{n^3 + 2}$
4. $\sum \ln\left(1 + \frac{1}{n^2}\right)$
5. $\sum e^{-\sqrt{n}}$

**Exercice 3.** Déterminer la nature des séries dont les termes généraux sont les suivants :

1. $u_n = \frac{1}{(1 + \sqrt{n})^n}$
2. $u_n = \frac{n^2}{3^n}$
3. $u_n = \frac{1}{an + b} - \frac{1}{n}$ (discuter selon les valeurs de $a$ et $b$)
4. $u_n = n\log\left(1 + \frac{1}{n}\right) - \frac{2n}{2n+1}$
5. $u_n = \frac{2\sqrt{n} + \cos(n)}{n^2 + \log(n)}$

**Exercice 4.** Étudier la nature des séries dont les termes généraux sont les suivants :

1. $u_n = \frac{n^2 + 1}{5n^2 + n}$
2. $u_n = \frac{1}{n\sin^2(n)}$
3. $u_n = \frac{1}{(\sqrt[n]{2} + \ln(n))^{n^2}}$
4. $u_n = \frac{1}{n^{\ln(n)}}$
5. $u_n = \sin\left(\frac{n}{n^2 + 1}\right)$
6. $u_n = \left(\frac{\sin^2(n)}{n}\right)^n$
7. $u_n = \sqrt[n]{\frac{n}{n+1}} - 1$
8. $u_n = \frac{e^{-n}}{n}$

**Exercice 5.** Donner les limites des suites suivantes :

1. $u_n = \frac{1}{3^2} + \frac{1}{3^3} + \dots + \frac{1}{3^n}$
2. $u_n = \frac{1}{\sqrt{10}} + \dots + \frac{1}{\sqrt{n}}$

**Exercice 6.** Montrer que la série de terme général $u_n$ est convergente et calculer sa somme : $u_n = \ln\left(1 - \frac{1}{n^2}\right)$.

**Exercice 7.** Discuter suivant la valeur de $x > 0$ la série de terme général $u_n$ dans chacun des cas suivants :

1. $u_n = n!\,x^{n^2}$
2. $u_n = \frac{x^n}{n^x}$

**Exercice 8.** On pose $u_n = \frac{(-1)^n}{\sqrt{n}}$ et $v_n = \frac{(-1)^n}{\sqrt{n}} + \frac{1}{n}$. On admet que $\sum u_n$ converge.

1. Prouver que $\sum v_n$ diverge.
2. Montrer que $u_n \sim v_n$.
3. Que peut-on en déduire ?

## Intégrales

**Exercice 9.** Soit $g(x) = \displaystyle\int_0^{2\cos(x)} \sqrt{4 - t^2}\,dt$.

1. Déterminer le domaine de $g$.
2. Déterminer le domaine de dérivabilité de $g(x)$.
3. Calculer $g'(x)$.
4. En déduire $g(x)$.

**Exercice 10.** Soit $F(x) = \displaystyle\int_0^x \ln(1 + e^{-2t})\,dt$.

1. Déterminer le domaine de $F$.
2. Étudier les variations de $F$.
3. Montrer que $\frac{a}{a+1} \leq \ln(1 + a) \leq a$.
4. Montrer que $\frac{\ln(2)}{2} - \frac{1}{2}\ln(1 + e^{-2x}) \leq F(x) \leq \frac{1}{2} - \frac{1}{2}e^{-2x}$.

**Exercice 11.** Calculer les intégrales suivantes :

1. $f(x) = x^2 \ln(x)$
2. $g(x) = \frac{1}{(x-1)(x+2)}$
3. $h(x) = x e^{x^2}$
4. $i(x) = \frac{x^3}{x^4 + 1}$
5. $j(x) = \frac{2x + 2}{x^2 + 1}$

**Exercice 12.** Calculer les primitives suivantes en précisant le domaine de validité.

1. $\int \frac{x^2}{1 + x^2}\,dx$
2. $\int t^4(1 + t^5)^5\,dt$
3. $\int \frac{1}{\cos^2(x)}\,dx$
4. $\int \frac{\sin(x)}{\cos^2(x)}\,dx$
5. $\int \sin\left(\frac{x}{2}\right)\cos\left(\frac{x}{2}\right)dx$
6. $\int \frac{\ln(t)}{t}\,dt$
7. $\int \frac{1}{\sin^2(t)}\,dt$
8. $\int \frac{1}{\sqrt{1 - x^2}}\,dx$
9. $\int \frac{1}{1 + \text{th}(x)}\,dx$
10. $\int \tan(x)\,dx$
11. $\int \frac{1}{\sin^2(x)\cos^2(x)}\,dx$
12. $\int \frac{4x + 2}{\sqrt{x^2 + x + 1}}\,dx$

**Exercice 13.** Vérifier qu'il existe trois réels $a, b, c$ tels que pour tout $x \neq 0$ :

$$
\frac{1}{x + x^3} = \frac{a}{x} + \frac{bx + c}{1 + x^2}
$$

En déduire $\displaystyle\int_1^2 \frac{1}{x + x^3}\,dx$.

**Exercice 14.**

1. Déterminer la primitive de $x \to \dfrac{x - 1}{x^2 - 2x + 2}$ qui s'annule en $x = 2$.
2. Déterminer la primitive de $x \to \dfrac{x + 1}{\sqrt{x^2 + 2x + 5}}$ qui s'annule en $x = -1$.
3. Vérifier que $f : x \to \ln(x)$ admet des primitives sur l'intervalle ouvert $]0, +\infty[$. Déterminer celle qui s'annule en 2.
4. Vérifier que $f : x \to x^{\frac{4}{3}}$ admet des primitives sur l'intervalle ouvert $]0, +\infty[$. Déterminer celle qui s'annule en 1.

**Exercice 15.** Calculer les intégrales suivantes :

1. $\displaystyle\int_0^{2\pi} \cos(px)\cos(qx)\,dx$, $(p, q) \in \mathbb{N}^2$
2. $\displaystyle\int_0^{2\pi} \cos(2x)\sin(3x)\,dx$

**Exercice 16.** Calculer les primitives suivantes :

1. $\int \cos^2(x)\,dx$
2. $\int \cos^3(x)\,dx$
3. $\int \cos^4(x)\,dx$
4. $\int \cos^5(x)\,dx$

**Exercice 17.** Par IPP, calculer les primitives ou les intégrales suivantes.

1. $\int \text{Arctan}(t)\,dt$
2. $\int \frac{t}{\cos^2(t)}\,dt$
3. $\int e^t \cos(t)\,dt$
4. $\int_0^{\pi/8} (x + 2)\sin(4x)\,dx$
5. $\int x^n \ln(x)\,dx$
6. $\int_0^1 2x\,\text{Arctan}(x)\,dx$
7. $\int_0^{\pi/4} \frac{\tan(x)}{\cos^2(x)}\,dx$
8. $\int \sin(\ln(x))\,dx$

**Exercice 18.** Par changement de variable, calculer les intégrales suivantes.

1. $\displaystyle\int_2^5 \frac{1}{x(1 + \ln(x))^3}\,dx$
2. $\displaystyle\int_0^1 \frac{x^7}{(1 + x^4)^2}\,dx$
3. $\displaystyle\int_0^1 \frac{1}{4 + x^2}\,dx$
4. $\displaystyle\int_{\ln(2)}^{\ln(5)} \frac{e^x}{(3 + e^x)\sqrt{e^x + 1}}\,dx$
5. $\displaystyle\int_0^\pi \sin^3(x)\cos^4(x)\,dx$

**Exercice 19.** Calculer les primitives suivantes :

1. $\int \frac{1}{a^2 + x^2}\,dx$
2. $\int \frac{1}{\sqrt{a^2 - x^2}}\,dx$
3. $\int \sqrt{a^2 - x^2}\,dx$

**Exercice 20.** Calculer les intégrales suivantes :

1. $\displaystyle\int_0^1 \frac{1}{x^2 + 2x + 2}\,dx$
2. $\displaystyle\int_0^1 \frac{1}{\sqrt{x^2 + 2x + 2}}\,dx$
3. $\displaystyle\int_{-1}^1 \sqrt{x^2 + 2x + 5}\,dx$

**Exercice 21.** Soit $f : \mathbb{R} \to \mathbb{R}$ une fonction continue.

1. Montrer que si $f$ est paire, alors pour tout réel $x$, $\displaystyle\int_{-x}^{x} f = 2\int_0^x f$.
2. Montrer que si $f$ est impaire, alors pour tout réel $x$, $\displaystyle\int_{-x}^{x} f = 0$.
3. Montrer que si $f$ est périodique de période $T > 0$, alors pour tout réel $x$, $\displaystyle\int_x^{x+T} f = \int_0^T f$.

**Exercice 22.** Pour $p, q \in \mathbb{N}$, on pose $J_{p,q} = \displaystyle\int_0^1 t^p(1 - t)^q\,dt$.

1. Montrer que $J_{p,q} = J_{q,p}$.
2. Montrer que si $p \geq 1$, $(q + 1)J_{p,q} = pJ_{p-1,q+1}$.
3. Calculer $J_{0,p+q}$ puis $J_{p,q}$.

**Exercice 23.** Soit $I = \left]\frac{\pi}{4} + k\pi, \frac{\pi}{4} + (k+1)\pi\right[$ où $k \in \mathbb{Z}$. Déterminer sur $I$ les primitives suivantes :

$$
I(x) = \int \frac{\cos(x)}{\cos(x) - \sin(x)}\,dx \quad \text{et} \quad J(x) = \int \frac{\sin(x)}{\cos(x) - \sin(x)}\,dx
$$

Indication : on pourra calculer $I(x) + J(x)$ et $I(x) - J(x)$.

**Exercice 24.**

1. Décomposer en éléments simples $\dfrac{1}{(x + 1)(x^2 - x + 1)}$.
2. En déduire les primitives suivantes : $\displaystyle\int \frac{1}{x^3 + 1}\,dx$, $\displaystyle\int \frac{x^3}{x^3 + 1}\,dx$.
3. Calculer la primitive $\displaystyle\int \frac{1}{x^2 + \sqrt{x}}$ ($t = \sqrt{x}$).

**Exercice 25.**

1. Décomposer en éléments simples $\dfrac{1}{(x + 1)(1 + x^2)}$.
2. Calculer l'intégrale $J_s = \displaystyle\int_0^s \frac{e^x}{(1 + e^x)(1 + e^{2x})}\,dx$ où $s$ est un paramètre réel.

**Exercice 26.**

1. Décomposer en éléments simples $\dfrac{1}{(x - 1)(1 + x^2)}$.
2. Calculer l'intégrale $\displaystyle\int_1^2 \frac{e^x}{(e^x - 1)(e^{2x} + 1)}\,dx$.

## Formule de Taylor

**Exercice 27.** Établir les inégalités suivantes :

1. $\forall x \geq 0$, $x - \dfrac{x^2}{2} + \dfrac{x^3}{3(1 + x)^3} \leq \ln(1 + x) \leq x - \dfrac{x^2}{2} + \dfrac{x^3}{3}$
2. $\forall x \geq 0$, $0 < \sqrt[3]{1 + x} - 1 - \dfrac{x}{3} + \dfrac{x^2}{9} < \dfrac{5}{81}x^3$
3. $\forall x \in \mathbb{R}$, $1 - \dfrac{x^2}{2} \leq \cos(x) \leq 1 - \dfrac{x^2}{2} + \dfrac{x^4}{24}$

**Exercice 28.**

1. Appliquer la formule de Taylor avec reste intégral à l'ordre $n$ de la fonction $x \to e^x$ entre $0$ et $x$.
2. Montrer que $\forall x \in \mathbb{R}, \forall n \in \mathbb{N}$ :

   $$
   \left|e^x - \sum_{k=0}^{n} \frac{x^k}{k!}\right| \leq \frac{|x|^{n+1} e^{|x|}}{(n+1)!}
   $$

   1. En prenant $n = 4$, en déduire une valeur approchée de $1/e$ à $10^{-2}$ près.
   2. En déduire $\displaystyle\lim_{n \to \infty} \sum_{k=0}^{n} \frac{x^k}{k!}$ pour tout $x \in \mathbb{R}$ fixé.

**Exercice 29.**

1. Appliquer l'inégalité de Taylor avec reste intégral à l'ordre $n$ de la fonction $x \to \ln(1 + x)$ entre $0$ et $1$.
2. En déduire que

   $$
   1 - \frac{1}{2} + \frac{1}{3} - \frac{1}{4} + \dots + \frac{(-1)^{n-1}}{n} \to \ln(2)
   $$

**Exercice 30.** Soit $x$ un réel et $(u_n(x))_{n \in \mathbb{N}}$ la suite définie par $u_n(x) = \displaystyle\sum_{k=0}^{n} (-1)^k \frac{x^{2k}}{(2k)!}$.

1. Montrer que $|u_n(x) - \cos(x)| \leq \dfrac{|x|^{2n+1}}{(2n+1)!}$.
2. En déduire que la suite $(u_n(x))_{n \in \mathbb{N}}$ converge et donner sa limite.

## Sommes de Riemann

**Exercice 31.** Calculer les limites suivantes :

1. $\displaystyle\lim_{n \to \infty} \sum_{k=0}^{n} \frac{k\sqrt{n^2 - k^2}}{n^3}$
2. $\displaystyle\lim_{n \to \infty} \sum_{k=0}^{n} \sqrt{n^2 - k^2}$

## Arcs paramétrés

**Exercice 32.** Dans un repère orthonormé direct $\mathcal{R} = (O, \vec{i}, \vec{j})$ du plan, on considère la courbe $\mathcal{C}$ de représentation paramétrique :

$$
\begin{cases} x(t) = \dfrac{3}{t^2 - 2t} \\ y(t) = \dfrac{t^2 - 3}{t} \end{cases}
$$

définie sur le domaine $\mathcal{D} = \mathbb{R} \setminus \{0, 2\}$.

1. Déterminer le tableau de variations des fonctions $x$ et $y$ sur $\mathcal{D}$.
2. La courbe $\mathcal{C}$ possède-t-elle un point singulier ?
3. Déterminer les tangentes verticales ou horizontales.
4. Étudier les asymptotes et les branches paraboliques (on précisera la position de l'asymptote par rapport à la courbe).
5. Montrer que la courbe $\mathcal{C}$ admet un point double que l'on déterminera.
6. Tracer $\mathcal{C}$.

**Exercice 33.** Dans un repère orthonormé direct $(O, \vec{i}, \vec{j})$ du plan, on considère la courbe $\mathcal{C}$ :

$$
\begin{cases} x(t) = \dfrac{1}{1 - t^2} \\ y(t) = \dfrac{t^3}{1 - t^2} \end{cases} \quad t \in \mathbb{R} \setminus \{-1, 1\}
$$

1. Déterminer les symétries de $\mathcal{C}$.
2. Déterminer le tableau de variations des fonctions $x(t)$ et $y(t)$.
3. Déterminer les points singuliers et leurs natures.
4. Déterminer les tangentes horizontales et verticales.
5. Faire l'étude des branches infinies.
6. Tracer sommairement $\mathcal{C}$.

**Exercice 34.** Étudier les courbes dont les coordonnées cartésiennes sont définies par les équations suivantes :

1. $\begin{cases} x(t) = \dfrac{1 - t^2}{1 + t^2} \\ y(t) = \dfrac{t^3}{1 + t^2} \end{cases}$
2. $\begin{cases} x(t) = \dfrac{1}{1 + t} + \dfrac{1}{t} \\ y(t) = \dfrac{1}{t - 1} + \dfrac{1}{t} \end{cases}$
3. $\begin{cases} x(t) = \dfrac{\sin(t)}{1 + \cos^2(t)} \\ y(t) = \dfrac{t^3}{1 + t^2} \end{cases}$
4. $\begin{cases} x(t) = 2\cos(2t) \\ y(t) = \sin(3t) \end{cases}$

## Dénombrement

**Exercice 35.** On considère les mains de 5 cartes qu'on peut extraire d'un jeu de 52 cartes.

1. Combien y a-t-il de mains différentes ?
2. Combien y a-t-il de mains comprenant exactement un as ?
3. Combien y a-t-il de mains comprenant au moins un valet ?
4. Combien y a-t-il de mains comprenant à la fois au moins un roi et au moins une dame ?

**Exercice 36.** Combien y a-t-il de bijections de $\{1, 2, \dots, 12\}$ dans lui-même possédant :

1. la propriété : $n$ est pair $\Longrightarrow f(n)$ est pair ?
2. la propriété : $n$ est divisible par 3 $\Longrightarrow f(n)$ est divisible par 3 ?

**Exercice 37.** Soit $E$ un ensemble à $n$ éléments et $A \subset E$ un sous-ensemble de $p$ éléments. Quel est le nombre de parties de $E$ qui contiennent un et un seul élément de $A$ ?

**Exercice 38.** Un étudiant possède 14 livres de quatre matières différentes : 4 livres de mathématiques, 5 d'économie, 3 de philosophie et 2 d'anglais. Il veut ranger ces livres sur une étagère.

1. De combien de façons peut-il le faire s'il ne tient pas compte des matières ?
2. De combien de façons peut-il le faire s'il range d'abord les livres d'anglais, puis ceux d'économie, puis ceux de maths et enfin ceux de philosophie ?
3. De combien de façons peut-il le faire s'il range les livres par matières ?

**Exercice 39.** Dans un jeu de 32 cartes, on appelle main toute combinaison de 5 cartes.

1. Combien de mains contiennent 3 rois ?
2. Combien de mains contiennent 3 piques ?
3. Combien de mains contiennent 3 cartes de même couleur ?

**Exercice 40.** Une urne contient 5 boules rouges, 4 noires et 3 vertes. On tire trois boules de cette urne successivement en remettant chaque fois la boule tirée avant le tirage suivant.

1. Quel est le nombre de tirages possibles ?
2. Combien de fois l'événement « obtenir exactement 3 boules rouges » est-il réalisé ?
3. Combien de fois l'événement « obtenir exactement 2 boules rouges » est-il réalisé ?
4. Combien de fois l'événement « obtenir au moins 1 boule rouge » est-il réalisé ?
5. Combien de fois l'événement « obtenir deux boules vertes et une noire » est-il réalisé ?
6. Combien de fois l'événement « obtenir 3 boules de la même couleur » est-il réalisé ?
7. Combien de fois l'événement « obtenir 3 boules de couleurs différentes » est-il réalisé ?

**Exercice 41.** Une urne contient 5 boules blanches et 3 boules rouges indiscernables au toucher. On tire successivement sans remise 3 boules dans l'urne.

1. Quel est le nombre de tirages possibles ?
2. Combien de fois l'événement « obtenir exactement 3 boules rouges » est-il réalisé ?
3. Combien de fois l'événement « obtenir exactement 2 boules rouges » est-il réalisé ?
4. Combien de fois l'événement « obtenir exactement 4 boules blanches » est-il réalisé ?

**Exercice 42.** On dispose de 3 boîtes et 5 craies de couleur bleue, rouge, jaune, verte et orange.

1. De combien de façons distinctes peut-on ranger les craies dans les trois boîtes ?
2. Même question en laissant une boîte vide.
3. Même question si la bleue et la rouge sont rangées ensemble ?
4. Même question si la bleue et la rouge sont rangées ensemble mais seules ?

**Exercice 43.** On lance 3 fois de suite un dé numéroté de 1 à 6 et on note ainsi le triplet obtenu. Combien y a-t-il de tels triplets ?

## Probabilités et variables aléatoires

**Exercice 44.** Une urne contient une boule rouge, deux boules blanches et trois boules noires.

1. On extrait simultanément trois boules de cette urne. On suppose que tous les tirages sont équiprobables. Soit $X$ la variable aléatoire « nombre de boules blanches parmi les trois boules extraites ». Déterminer la loi de $X$, son espérance et son écart type.
2. On extrait successivement trois boules de cette urne, en remettant après chaque tirage la boule extraite dans l'urne. On suppose que tous les tirages sont équiprobables. Soit $Y$ la variable aléatoire « nombre de tirages où apparaît une boule blanche ». Déterminer la loi de $Y$, son espérance et son écart type.

**Exercice 45.** On joue à pile ou face avec 2 pièces. Soit $X$ le nombre de piles obtenus. Déterminer la loi de $X$, son espérance et sa variance.

**Exercice 46.** Trois urnes $A$, $B$ et $C$ contiennent respectivement 1 boule blanche et 3 noires, 2 blanches et 2 noires, 3 blanches et 1 noire. On tire au hasard une boule dans chacune des 3 urnes, et on désigne par $X$ le nombre de boules blanches obtenues. Donner la loi de $X$ et sa fonction de répartition.

**Exercice 47.** On lance 2 dés et on appelle $Z$ la v.a.r. égale à la valeur absolue de la différence des numéros obtenus. Déterminer la loi de $Z$, sa fonction de répartition, son espérance et sa variance.

**Exercice 48.** L'oral d'un examen comporte 20 sujets possibles. Le candidat tire 3 sujets au hasard. Ce candidat a révisé seulement 12 sujets. On considère la variable $X$ égale au nombre de sujets révisés parmi les 3 tirés. Quelle est la loi de probabilité de $X$ ?

**Exercice 49.** Dans une bibliothèque se trouvent 10 livres en langue étrangère : 5 en anglais, 2 en allemand et 3 en russe. On prélève au hasard 5 de ces livres. Soit $X$ la variable aléatoire qui, à chaque tirage, associe le nombre de volumes en russe prélevés. Déterminer la loi de probabilité, puis la fonction de répartition de $X$, et représenter celle-ci.

**Exercice 50.** Un lot contient 3 % de pièces défectueuses. On prélève au hasard un échantillon de 10 pièces. Les pièces étant très nombreuses, on admet que le tirage peut être considéré comme fait au hasard et avec remise. Soit $X$ la variable « nombre de pièces défectueuses dans l'échantillon ». Déterminer la loi de $X$. Calculer $P([X = 0])$, $P([X \geq 1])$, $E(X)$ et $\sigma(X)$.

**Exercice 51.** Un fabricant de berlingots possède 3 machines $A$, $B$ et $C$ qui fournissent respectivement 10, 40 et 50 % de la production totale de son usine. Une étude a montré que le pourcentage de berlingots défectueux est de 3,5 % pour la machine $A$, de 1,5 % pour la machine $B$ et de 2,2 % pour la machine $C$. Après fabrication, les berlingots sont versés dans un bac. On tire au hasard un berlingot.

1. Montrer que la probabilité pour que ce berlingot vienne de l'usine $C$ et soit défectueux est 0,011.
2. Calculer la probabilité pour que ce berlingot soit défectueux.
3. Calculer la probabilité pour que ce berlingot vienne de l'usine $C$ sachant qu'il est défectueux.
4. On prélève successivement dans le bac 10 berlingots en remettant à chaque fois le berlingot tiré dans le bac. Calculer la probabilité d'avoir au moins un berlingot défectueux.
