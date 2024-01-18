---
title: "Qubits et mécanique quantique"
---

## Qubits et observables

Les états du système quantique associé à un qubit sont les éléments d'un espce à
deux dimensions, engendrés par les états de la base $\vert 0 \rangle$ et
$\vert 1 \rangle$. Tout état sera donc de la forme

$ \vert \psi \rangle = \alpha \vert 0 \rangle + \beta \vert 1 \rangle$

On retrouve donc là spécificité des qubits de pouvoir se trouver dans un état de
**superposition**. Les coefficients $\alpha$ et $\beta$ sont en fait des
amplitudes de probabilités et doivent satisfaire

$|\alpha|^2 + |\beta|^2 = 1$

1. Par une fonction $\psi(r,t)$ (formalisme des fonctions d'ondes et de la
   mécanique ondulatoire)
2. Par une matrice (notamment dans le cas d'espaces de dimensions finies)

Les états $\vert 0 \rangle$ et $\vert 1 \rangle$ sont les états propres
d'une grandeur observable. Si le système physique est un atome l'observable est
l'énergie de l'atome et les états $\vert 0 \rangle$ et $\vert 1 \rangle$
correspondent aux états $\vert g \rangle$ et $\vert e \rangle$ (état
fondamental et premier état excité) de l'atome. Dans le cas où le système
quantique est le photon l'observable est la polarisation qui peut prendre les
deux états $\vert x \rangle$ et $\vert y \rangle$. Comme ces états forment
une base dans l'espace des états du qubit , on a $\forall \vert \psi \rangle
\in \mathcal{E} \; \vert \psi \rangle = \alpha \vert 0 \rangle + \beta \vert 1
\rangle$. Si le système est dans l'état $\vert \psi \rangle = \alpha \vert 0
\rangle + \beta \vert 1 \rangle$ le résultat de la mesure sera obtenue avec une
probabilité dont l'amplitude est définie par

+ $\alpha = \langle 0 \vert \psi \rangle$ amplitude de probabilité d'obtenir
  l'état $\vert 0 \rangle$
+ $\beta = \langle 1 \vert \psi \rangle$ amplitude de probabilité d'obtenir
  l'était $\vert 1 \rangle$ amplitude de probabilité d'obtenir l'état $\vert
  1 \rangle$

## Maniuplations de qubits

La mesure altère en général l'état d'un qubit puisqu'il en sort nécessairement
dans un été propre de l'observable mesuré. Par contre l'environnement peut agir
sur le qubit pour faire évoluer son état tant qu'aucune mesure (aucune "prise
d'information") n'est réalisée.

## Opérations logiques sur un qubit

Nous allons associer à l'évolution de l'état du qubit les opérations logiques
nécessaires à la mise en oeuvre des d'algorithmes.

### Portes logiques classiques

Par exemple les portes logiques classiques agissant sur un bit sont résumées
dans le tableau ci-dessous

| Porte logique | 0 | 1 |
|:--------------|:--|:--|
| EFFACE        | 0 | 0 |
| IDENTITE      | 0 | 1 |
| NON           | 1 | 0 |
| SET           | 1 | 1 |

toute matrice unitaire est susceptible de représenter une porte logique à un
qubit. Différence avec les bits classiques, pour les qubits il existe donc une
famille continue de transformations qui sont représentées par le matrices
unitaires.

### Exemples - l'opérateur NOT

L'opérateur NON est représenté par la matrice carrée

$ X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$

### Exemples - la porte Y

La porte $Y$ définie par la matrice

$ Y = \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix}$

### Exemples - la porte Z (opérateur de flip)

La porte $Z$ définie par la matrice

$ Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$

### Exemples - la porte $\phi$

La porte $\phi$ définie par la matrice

$R_\phi = \begin{pmatrix} 1 & 0 \\ 0 & e^{i \phi} \end{pmatrix}$

Effet : rotation de la phase du vecteur $\vert 1 \rangle$ par un angle
$\phi$ : $R_\phi \vert 0 \rangle = \vert 0 \rangle$, $R_\phi \vert 1
\rangle = e^{i \phi} \vert 1 \rangle$.

### Exemples - la porte de Hadamard

Porte particulièrement important en info quantique. La porte de Hadamard définie
par la matrice

$H = \dfrac{1}{\sqrt{2}}(X+Z) = \dfrac{1}{\sqrt{2}} \begin{pmatrix} 1 & 1 \\ 1
& -1 \end{pmatrix}$

On a : $\vert 0 \rangle \rightarrow \dfrac{1}{\sqrt{2}}(\vert 0 \rangle ° \vert
1 \rangle)$, $\vert 1 \rangle \rightarrow \dfrac{1}{\sqrt{2}}(\vert 0
\rangle - \vert 1 \rangle)$

Si on applique $H$ à l'état initial $\vert 0 \rangle$ ou à l'état initial
$\vert 1 \rangle$ et puis on mesure, on a des probabilités égales pour trouver
$\vert 0 \rangle$ ou $\vert 1 \rangle$.

Interférence et porte de Hadamard effet analogue à l'interférence des ondes

$H ( \dfrac{1}{\sqrt{2}}(\vert 0 \rangle + \vert 1 \rangle) =
\dfrac{1}{\sqrt{2}} H \vert 0 \rangle + \dfrac{1}{\sqrt{2}} H \vert 1 \rangle =
\vert 0 \rangle )$