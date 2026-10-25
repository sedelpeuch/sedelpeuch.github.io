---
title: "Les atomes polyélectroniques"
description: "Atomes polyélectroniques : équation de Schrödinger à plusieurs électrons, modèle orbitalaire, indiscernabilité et déterminant de Slater, principe de Pauli, modèle effectif de Slater, principe des variations, énergie des configurations et règles de remplissage."
sidebar_position: 5
---

**Introduction.** L'état du nuage électronique dans les atomes peut être décrit de manière approchée dans le cadre d'un modèle faisant appel aux orbitales atomiques. La forme de ces orbitales atomiques s'adapte pour tenir compte de la répulsion entre les électrons. L'état du nuage s'analyse en termes de configurations électroniques qui sont les modes d'affectation des électrons aux orbitales. Les règles de remplissage régissent l'établissement de la configuration de l'état fondamental des atomes. Elles forment le fondement de la classification périodique des éléments.

## L'équation de Schrödinger pour plusieurs électrons

Pour un atome ou ion atomique de numéro atomique $Z$, on considère, de la même manière que pour les atomes hydrogénoïdes, l'opérateur hamiltonien décrivant les électrons dans le champ du noyau contenant $Z$ charges $+e$, supposé fixe et au centre du référentiel atomique. La présence de plusieurs électrons gravitant autour du noyau conduit à un opérateur couplé qui décrit non seulement les effets cinétiques et d'interaction attractive avec le noyau, mais aussi les effets de répulsion entre électrons qui dépendent des positions simultanées de deux particules :

$$
\mathbf{H}_{el} = \sum_{\mu=1}^{N} \Big(-\frac{1}{2}\Delta_\mu - \frac{Z}{r_\mu}\Big) + \sum_{\mu=1}^{N-1} \sum_{\nu>\mu}^{N} \frac{1}{r_{\mu\nu}}
$$

Les solutions de l'équation de Schrödinger indépendante du temps sont des états quantiques décrivant simultanément les $N$ électrons. Ils sont décrits mathématiquement par une fonction d'onde "polyélectronique" dépendant des coordonnées d'espace et de spin des $N$ électrons, soit $4N$ coordonnées. Par souci de simplification, on la note en ne gardant que les numéros des électrons :

$$
\Psi(1, 2, 3, \dots, N)
$$

## Le modèle orbitalaire

En raison de la complexité de l'opérateur hamiltonien, qui couple le mouvement des électrons, il n'y a pas de solution analytique connue de l'équation de Schrödinger correspondante. On recherche donc des solutions approchées qui ne soient pas seulement mathématiques, mais portent en elles des concepts utiles au chimiste et applicables quelle que soit la nature de l'atome considéré. On se place alors dans le cas des modèles orbitalaires pour lesquels les fonctions d'onde sont construites à partir de fonctions à un seul électron.

On peut retrouver l'inspiration de ces modèles orbitalaires si on néglige les termes d'interaction entre électrons. L'hamiltonien électronique pour $N$ électrons indépendants s'écrit alors comme une somme d'opérateurs hydrogénoïdes découplés agissant sur des variables distinctes.

On note cet hamiltonien approché $\mathbf{H}_0$ pour le distinguer de l'opérateur exact :

$$
\mathbf{H}_0 = \sum_{\mu=1}^{N} \Big(-\frac{1}{2}\Delta_\mu - \frac{Z}{r_\mu}\Big) = \sum_{\mu=1}^{N} \mathbf{h}_\mu
$$

Les fonctions propres des $\mathbf{h}_\mu$ sont connues, ce sont les spin-orbitales hydrogénoïdes :

$$
\chi_{n_i, l_i, m_i, ms_i}(\mu) = \chi_i(\mu) = \phi_i(\mu) \cdot \zeta_i(\mu)
$$

- $\mu$ représente les coordonnées spatiales ou de spin de l'électron $\mu$ ;
- $\phi_i(\mu)$ est l'orbitale, fonction des coordonnées d'espace de l'électron $\mu$ ;
- $\zeta_i(\mu) = \alpha$ ou $\beta$ est la fonction de spin.

Les spin-orbitales hydrogénoïdes constituent les briques qui vont permettre de construire la fonction d'onde totale des électrons de l'atome. Une fonction propre de $\mathbf{H}_0$ peut en effet s'écrire sous la forme d'un produit de spin-orbitales :

$$
\Psi(1, 2, \dots, N) = \prod_{\mu=1}^{N} \chi_\mu(\mu)
$$

On pourrait généraliser : pour un système comportant $N$ électrons, la fonction d'onde serait alors le produit de $N$ spin-orbitales. Ce résultat est caractéristique des particules indépendantes sans interactions mutuelles, pour lesquelles il est légitime de trouver que l'énergie totale est simplement la somme d'énergies individuelles. On obtient là un modèle très simple, dans lequel il suffit de choisir un jeu de spin-orbitales pour décrire les électrons de l'atome et de bâtir le produit de ces fonctions pour obtenir l'état quantique qui décrit mathématiquement le nuage électronique.

Évidemment, ce modèle simpliste conduit à un très mauvais accord avec l'expérience sur les niveaux d'énergie des atomes polyélectroniques. Prenons le cas du niveau fondamental de l'hélium dans sa configuration $1s^2$. Si on utilise l'orbitale hydrogénoïde $1s$ de $He^+$ et son énergie, $E = 2\epsilon_{1s} = -Z^2 = -4{,}0\ \text{ua}$, alors que l'énergie exacte vaut $-2{,}904\ \text{ua}$. On commet une erreur d'environ $1{,}1\ \text{ua}$, soit presque $30\ \text{eV}$. On ne peut donc pas utiliser les orbitales hydrogénoïdes et l'opérateur hamiltonien $\mathbf{H}_0$ si l'on veut un accord quantitatif avec l'expérience. Une telle erreur est d'autant plus grave qu'elle est supérieure à l'ordre de grandeur des énergies de liaison chimique.

Le modèle des électrons indépendants pèche par le fait qu'il néglige les termes d'interaction répulsive entre les électrons. Ces termes dépendent simultanément des coordonnées de deux électrons, ce qui signifie qu'il y a une influence réciproque d'une des particules sur l'autre et qu'en conséquence les électrons ne se meuvent pas indépendamment les uns des autres. Ce modèle permet néanmoins d'appréhender d'une manière intuitive les bases de la construction d'une fonction d'onde polyélectronique à partir des spin-orbitales hydrogénoïdes, monoélectroniques.

Cependant, même en négligeant les interactions entre électrons, la fonction d'onde ne peut se présenter sous une forme aussi simple. Il faut en effet tenir compte de la propriété d'indiscernabilité des électrons, qui impose un certain nombre de contraintes sur l'expression de la fonction d'onde.

### Annexe

Pour tenter de perfectionner ce modèle, on peut appliquer la méthode de perturbation, c'est-à-dire que l'on prend en compte le terme en $\dfrac{1}{r_{\mu\nu}}$ après. Ainsi

$$
\langle E \rangle = e_{1s}(\mu) + e_{1s}(\nu) + \underbrace{\Big\langle \Phi_{\mu,\nu} \Big| \frac{1}{r_{\mu\nu}} \Big| \Phi_{\mu,\nu} \Big\rangle}_{\frac{5}{8}Z} = -2{,}75\ \text{ua}
$$

Un modèle encore plus précis est le modèle à charge nucléaire effective. On a $\Phi'(\mu, \nu) = \phi_{1s}(\mu)\phi_{1s}(\mu)$ qui est solution exacte de $\mathbf{H}_{EI}$. On définit donc $\Phi''(\mu, \nu, Z^*) = \phi_{1s}(\mu, Z^*)\phi_{1s}(\nu, Z^*)$ avec $\phi_{1s}(i, Z^*) = \dfrac{1}{\sqrt\pi}\Big(\dfrac{Z^*}{a_0}\Big)^{\frac{3}{2}} e^{-\frac{Z^* r_i}{a_0}}$. Donc $\Big(-\frac{1}{2}\Delta_i - \dfrac{Z}{r_\mu}\Big)\psi_{1s}(i, Z^*) = \Big(-\frac{1}{2}Z^{*2}\Big)\phi_{1s}(i, Z^*)$. Ainsi on peut noter l'opérateur hamiltonien

$$
\mathbf{H}'' = \Big(-\frac{1}{2}\Delta_\mu - \frac{Z^*}{r_\mu}\Big) + \Big(-\frac{1}{2}\Delta_\nu - \frac{Z^*}{r_\nu}\Big) + (Z^* - Z)\Big(\frac{1}{r_\mu} + \frac{1}{r_\nu}\Big)
$$

Ainsi $\phi'(\mu, \nu, Z^*) = \phi_{1s}(\mu, Z^*)\phi_{1s}(\nu, Z^*)$ avec $\phi_{(i, Z^*)} = \dfrac{1}{\sqrt\pi}\dfrac{Z^*}{a_0}^{\frac{3}{2}} e^{-\frac{Z^* r_1}{a_0}}$.

$$
\mathbf{h}_\mu \phi(\mu, Z^*) = \Big(-\frac{1}{2}Z^{*2}\Big)\phi_{1s}(\mu, Z^*)
$$

On a donc, par la méthode de la perturbation :

$$
(\mathbf{h}_\mu + \mathbf{h}_\nu)\phi'(\mu, \nu, Z^*) \Rightarrow \Big(-\frac{Z^{*2}}{2} - \frac{Z^{*2}}{2}\Big) + \underbrace{2Z^*(Z^* - Z)}_{\langle \phi'(\mu, \nu, Z^*) | (Z^* - Z)(\frac{1}{r_1} + \frac{1}{r_2}) | \phi'(\mu, \nu, Z^*) \rangle} + \underbrace{\frac{5}{8}Z^*}_{\langle \phi(\mu, \nu, Z^*) | \frac{1}{r_{\mu\nu}} | \phi'(\mu, \nu, Z^*) \rangle}
$$

On trouve donc

$$
E_{tot} = Z^{*2} - 2ZZ^* + \frac{5}{8}Z^*
$$

## Fonctions d'onde polyélectroniques : contraintes nécessaires

### Indiscernabilité des particules et antisymétrie

Considérons deux particules quantiques de même type (numérotées 1 et 2) se croisant à l'intérieur d'un volume dont la dimension est de l'ordre de $\Delta x^2$, où $\Delta x$ est l'incertitude quantique sur la position des particules. À l'intérieur de ce volume, il est donc impossible d'identifier chacune des deux particules. À l'issue de cette rencontre, les deux particules continuent leur chemin, mais on ne peut plus leur attribuer de numéro.

Il faut alors admettre qu'à l'échelle quantique les particules de même espèce sont indiscernables et tenir compte de ce fait pour bâtir les fonctions d'onde.

La fonction d'onde des deux particules 1 et 2 est une fonction des coordonnées d'espace et de spin de 1 et 2 ; elle est notée $\Psi(1, 2)$. Son module au carré donne la densité de probabilité de présence simultanée de la particule 1 à un endroit donné avec un spin donné et de la particule 2 à un autre endroit avec un spin donné. L'indiscernabilité des particules impose que cette densité de probabilité de présence reste constante si on intervertit les deux particules

$$
|\Psi(1, 2)|^2 = |\Psi(2, 1)|^2
$$

ce qui conduit aux deux possibilités : $\Psi(1, 2) = \Psi(2, 1)$ ou $\Psi(1, 2) = -\Psi(2, 1)$.

La fonction d'onde doit donc être symétrique ou antisymétrique vis-à-vis de l'échange des deux particules. La première possibilité s'applique au cas des bosons (particules de spin entier) ; la seconde aux fermions (particules de spin demi-entier). On peut généraliser au cas de $N$ particules identiques, et on obtient pour n'importe quelle paire $(q, p)$ parmi les $N$ particules :

- Pour les fermions : $\Psi(1, 2, \dots, p, \dots, q, \dots, N) = -\Psi(1, 2, \dots, q, \dots, p, \dots, N)$
- Pour les bosons : $\Psi(1, 2, \dots, p, \dots, q, \dots, N) = \Psi(1, 2, \dots, q, \dots, p, \dots, N)$

Les électrons étant des fermions, leur fonction d'onde doit respecter le principe d'antisymétrie.

### Le déterminant de Slater

Pour deux électrons, le produit de spin-orbitales n'est pas convenable au sens de l'indiscernabilité :

$$
\chi_1(1) \cdot \chi_2(2) \neq -\chi_1(2) \cdot \chi_2(1)
$$

Pour construire cette fonction d'onde antisymétrique dans le cas de deux électrons, il suffit de retrancher au produit de deux spin-orbitales ci-dessus le même produit dans lequel les coordonnées des deux électrons ont été permutées. En tenant compte de la constante de normalisation, la fonction d'onde s'écrit alors :

$$
\Psi(1, 2) = \frac{1}{\sqrt 2}\big(\chi_1(1) \cdot \chi_2(2) - \chi_1(2) \cdot \chi_2(1)\big)
$$

Dans ce cas, on a bien :

$$
\Psi(1, 2) = -\Psi(2, 1)
$$

Cette fonction peut s'écrire sous la forme du déterminant dont les lignes et les colonnes contiennent les spin-orbitales :

$$
\Psi(1, 2) = \frac{1}{\sqrt 2}\begin{vmatrix} \chi_1(1) & \chi_2(1) \\ \chi_1(2) & \chi_2(2) \end{vmatrix}
$$

Par construction, le déterminant de Slater respecte la propriété d'antisymétrie de la fonction d'onde à condition que toutes les spin-orbitales occupées soient différentes. Dans le cas contraire, le déterminant s'annule.

De manière générale, pour $N$ électrons, le déterminant représentant la fonction d'onde est construit en plaçant les spin-orbitales par colonne et les électrons par ligne, ou inversement.

$$
\Psi(1, 2, \dots, N) = \frac{1}{\sqrt{N!}}\begin{vmatrix} \chi_1(1) & \dots & \chi_N(1) \\ & \ddots & \\ \chi_1(N) & \dots & \chi_N(N) \end{vmatrix}
$$

Les déterminants de Slater sont notés de manière abrégée à l'aide des seuls symboles des spin-orbitales utilisées :

$$
\Psi(1, 2, \dots, N) = |\chi_1 \chi_2 \dots \chi_N|
$$

**Exemple : état fondamental de $He$.** $\Psi(1, 2) = |1s\alpha 1s\beta| = |1s\overline{1s}|$ correspondant à la configuration $1s^2$. Le symbole de l'orbitale surligné signifie que la fonction de spin attachée à l'orbitale est $\beta$.

### Conséquence : le principe de Pauli

La propriété d'antisymétrie de la fonction d'onde impose que les spin-orbitales occupées soient toutes différentes. Dans le cas contraire, le déterminant s'annule.

Exemple pour deux électrons : si $\chi_1 = \chi_2 = \chi$, alors

$$
\Psi(1, 2) = \frac{1}{\sqrt 2}\big(\chi(1) \cdot \chi(2) - \chi(2) \cdot \chi(1)\big) = 0
$$

Il s'ensuit donc que, dans un déterminant, deux spin-orbitales ne peuvent être égales. Elles doivent donc différer par au moins un nombre quantique. Une orbitale ne peut donc être au plus que doublement occupée (avec un spin $\alpha$ et un spin $\beta$). Cette manifestation de l'indiscernabilité des électrons est appelée principe d'exclusion de Pauli.

### Configurations électroniques - cases quantiques

De la même manière que pour les ions hydrogénoïdes, on utilise les cases quantiques pour représenter l'occupation des orbitales. Le principe de Pauli est satisfait en ne mettant pas plus de deux électrons par case. L'état fondamental est obtenu en occupant les orbitales de plus basse énergie.

La configuration électronique constitue une notation abrégée de la fonction d'onde polyélectronique. Elle précise la nature (nombres quantiques $n$ et $l$) des orbitales occupées. Elle est représentée par les symboles des orbitales avec en exposant le degré d'occupation.

Connaître la configuration électronique constitue une notation abrégée de la fonction d'onde polyélectronique. Elle précise la nature (nombres quantiques $n$ et $l$) des orbitales occupées. Elle est représentée par les symboles des orbitales avec en exposant le degré d'occupation.

Connaître la configuration électronique d'un atome est d'une importance extrême si l'on veut comprendre les propriétés chimiques des éléments. Le nombre et le type des orbitales peuplées dans un état électronique donné d'un atome gouvernent sa capacité à interagir avec d'autres atomes.

**Exemple : configuration de l'état fondamental de l'atome de bore.** La configuration de l'état fondamental du bore ($Z = 5$) est donnée par $1s^2 2s^2 2p^1$.

Plusieurs déterminants de Slater peuvent correspondre à la même configuration dans le cas où des sous-couches sont incomplètes. Dans le cas du bore par exemple, on a 6 possibilités pour occuper la sous-couche $2p$. On peut donc écrire 6 déterminants correspondant à la configuration de l'état fondamental :

$|1s2s2p_x|$ ou $|1s2s2p_y|$ ou $|1s2s2p_z|$.

Et trois autres avec l'électron $2p$ de type $\beta$. Dans chaque cas, la fonction d'onde de l'état fondamental est un mélange équiprobable des 3 déterminants.

## Le modèle effectif de Slater

Le modèle de Slater propose une correction au modèle des électrons indépendants tout en conservant la simplicité formelle d'un modèle purement monoélectronique. Dans ce modèle, les termes d'interaction à 2 électrons sont négligés dans l'expression du hamiltonien électronique total. On retrouve alors la propriété d'additivité des énergies des orbitales. On tient cependant compte des interactions électroniques de manière effective, en remplaçant dans la partie monoélectronique de $\mathbf{H}$ la charge nucléaire $Z$ par une charge nucléaire effective $Z^*$ propre à chaque opérateur $\mathbf{h}$.

Pour deux électrons $1s$, on ne considère

## Optimisation des orbitales : principe des variations

### Principe des variations

Considérons un problème physique défini par son opérateur hamiltonien. L'équation de Schrödinger peut être posée, mais on n'en connaît pas les solutions analytiques. On sait cependant qu'il existe des solutions $\{\Psi_i\}$ d'énergies $\{E_i\}$ et notamment un état fondamental $\Psi_0$ d'énergie $E_0$ (inconnue). On se propose de chercher des approximations de $E_0$ et $\Psi_0$. On se définit alors une fonction d'onde approchée $\Psi$ qui dépend d'un certain nombre de paramètres ajustables $\alpha_i$ appelés paramètres variationnels. Cette fonction n'est pas rigoureusement solution de l'équation de Schrödinger. On ne peut lui associer qu'une valeur moyenne de l'énergie qui est la moyenne quantique de l'hamiltonien sur l'état $\Psi$.

$$
\langle E \rangle = \int \Psi^* \mathbf{H} \Psi \, dV
$$

Cette énergie approchée dépend donc aussi des paramètres $\alpha_i$.

Le principe des variations indique alors que l'énergie approchée est toujours supérieure ou égale à l'énergie exacte de l'état fondamental :

$$
\langle E \rangle \geq E_0
$$

**Corollaire.** Puisque toute solution approchée est d'énergie supérieure ou égale à l'énergie exacte de l'état fondamental, la meilleure approximation de l'état fondamental (le meilleur jeu de paramètres $\alpha_i$) est donc celle qui conduit à une énergie moyenne minimale.

L'application du principe des variations consiste alors à chercher le minimum de l'énergie moyenne par rapport aux paramètres variationnels. On remplace alors la résolution d'une équation différentielle par la minimisation d'une fonction intégrale.

Si on applique le principe des variations aux électrons des atomes et molécules, on choisit le plus souvent comme fonction approchée un déterminant de Slater (ou une combinaison de déterminants si nécessaire) :

$$
\Psi(1, 2, \dots, N) = \frac{1}{\sqrt{N!}}\begin{vmatrix} \chi_1(1) & \dots & \chi_N(1) \\ & \ddots & \\ \chi_1(N) & \dots & \chi_N(N) \end{vmatrix}
$$

Les paramètres variationnels sont contenus dans les orbitales. La "qualité" de cette fonction d'onde peut donc être notablement améliorée si l'on cherche à optimiser les orbitales dans le déterminant, c'est-à-dire à adapter les orbitales à la nature de l'atome ou de la molécule. Les orbitales que l'on utilise, manipule et interprète sont alors le résultat de cette optimisation.

### Exemple simple : configuration fondamentale de l'atome d'hélium

**Dans l'ion hydrogénoïde $He^+$ ($Z = 2$).** L'électron est sur l'orbitale $1s$ dans l'état fondamental. Il est attiré par les deux protons du noyau. L'expression analytique de l'orbitale $1s$ est donnée par :

$$
\phi(r, \theta, \phi) = \frac{1}{\sqrt\pi}\Big(\frac{Z}{a_0}\Big)^{\frac{3}{2}} \exp\Big(-\frac{Z}{a_0}r\Big)
$$

**Dans l'atome $He$.** On choisit de décrire l'état fondamental en affectant les deux électrons à une orbitale de type $1s$. La configuration électronique correspondante est $1s^2$. La fonction d'onde modèle des deux électrons s'écrit de manière abrégée :

$$
\Psi(1, 2) = |1s\alpha, 1s\beta|
$$

Toutefois, il n'y a pas de raison que l'orbitale $1s$ de $He$ soit la même que celle de $He^+$. En effet, dans $He$ un électron donné est attiré par les deux protons du noyau, mais il est aussi repoussé par l'autre électron. La fraction du nuage électronique décrivant cet autre électron, située entre le noyau et le premier électron, s'oppose à l'attraction du noyau en repoussant ce premier électron vers l'extérieur de l'atome. Cette répulsion entre les deux électrons doit donc tendre à les éloigner l'un de l'autre. Le nuage électronique doit donc être plus diffus, ce qui est décrit par une orbitale $1s$ plus diffuse que dans l'ion hydrogénoïde $He^+$.

Une manière simple d'optimiser cette orbitale $1s$ est de modifier la partie radiale des orbitales hydrogénoïdes en remplaçant le numéro atomique $Z$ par un paramètre ajustable que l'on assimile à une charge effective du noyau : c'est la charge globale que "voit" un électron de l'atome. Elle inclut donc la charge du noyau $Z$ mais aussi la charge moyenne due aux autres électrons qui sont ici décrits par des orbitales. On écrit $\alpha = Z - \sigma$, où $\sigma$ est la constante d'écran caractéristique de l'atome et de l'orbitale considérée.

On choisit alors pour orbitale approchée une fonction hydrogénoïde $1s$ dans laquelle on remplace $Z$ par $\alpha$.

$$
\phi(r, \theta, \phi) = \frac{1}{\sqrt\pi}\Big(\frac{\alpha}{a_0}\Big)^{\frac{3}{2}} \exp\Big(-\frac{\alpha}{a_0}r\Big)
$$

Pour déterminer cette charge effective, on applique le principe variationnel qui indique que la meilleure valeur de $\alpha$ est celle qui conduit à l'énergie totale minimale. On doit donc chercher le minimum de la fonction :

$$
\langle E \rangle(\alpha) = \int \Psi^*(1, 2)\mathbf{H}\Psi(1, 2) \, dV_1 dV_2
$$

On trouve à l'issue du calcul que $\langle E \rangle$ est minimale pour $\alpha = 1{,}685$. L'écran lié à la présence des deux électrons $1s$ vaut donc $\sigma = Z - \alpha = 0{,}315$. La charge effective étant plus faible que celle du noyau, il faut s'attendre à ce que l'électron sur une orbitale d'un type donné soit moins attiré vers le noyau que dans l'atome hydrogénoïde de même numéro atomique. Ainsi, la densité radiale dans $He$ s'étend plus loin du noyau que la densité de l'orbitale hydrogénoïde de $He^+$ : l'interaction entre les deux électrons $1s$ se traduit par un gonflement de l'orbitale.

Pour décrire l'interaction répulsive entre les électrons, on conserve donc la notion d'orbitale, mais on laisse "respirer" ces dernières pour qu'elles intègrent la répulsion électronique.

**Annexe : exemple sur l'atome de carbone.**

Atome de carbone $Z = 6$ : $1s^2 2s^2 2p^2$.

$$
E^{tot} = 2E_{1s} + 4E_{2s2p}
$$

$$
\begin{aligned}
E_{1s} &= -\frac{1}{2}\frac{Z_{1s}^{*2}}{1^2} = -\frac{1}{2}(6 - 0{,}3)^2 = -\frac{(5{,}7)^2}{2} = -16{,}25\ \text{ua} \\
E_{2s2p} &= -\frac{1}{2}\frac{Z_{2s2p}^{*2}}{2^2} = -\frac{1}{8}(6 - 2 \times 0{,}85 - 3 \times 0{,}35)^2 = -1{,}32\ \text{ua}
\end{aligned}
$$

$$
E^{tot} = -37{,}77\ \text{ua}
$$

### Développement sur une base

On peut utiliser une stratégie plus sophistiquée que celle consistant à optimiser la valeur des constantes d'écran pour construire les orbitales des atomes polyélectroniques. Pour ce faire, on écrit les orbitales comme combinaisons linéaires de plusieurs fonctions hydrogénoïdes.

L'orbitale $1s$ de l'atome d'hélium peut par exemple s'écrire comme un développement sur la base de deux fonctions $1s$ hydrogénoïdes, dans lesquelles les coefficients $\alpha$ sont fixés a priori : $\alpha_1 = 1$ et $\alpha_2 = 1{,}6$ :

$$
\phi(r, \theta, \phi) = A\frac{1}{\sqrt\pi}\Big(\frac{1}{a_0}\Big)^{\frac{3}{2}} \exp\Big(-\frac{1}{a_0}r\Big) + B\frac{1}{\sqrt\pi}\Big(\frac{1{,}6}{a_0}\Big)^{\frac{3}{2}} \exp\Big(-\frac{1{,}6}{a_0}r\Big)
$$

$A$ et $B$ sont les coefficients du développement, et constituent les deux variables à optimiser. Une telle base, dans laquelle une orbitale est décrite à partir de deux fonctions hydrogénoïdes, est appelée "double zêta". On utilise également des bases triple ou quadruple zêta, dans lesquelles les orbitales sont respectivement développées à partir de trois ou quatre fonctions hydrogénoïdes.

Le nombre de fonctions de base a une influence directe sur la précision des calculs. Plus la base est étendue, plus on améliore la flexibilité de la fonction d'onde, et par conséquent la description de l'état quantique électronique. De plus, il est également possible d'utiliser d'autres fonctions de base dans le développement que les fonctions hydrogénoïdes. Dans un grand nombre de méthodes actuelles de chimie quantique, on préfère utiliser des bases de fonctions gaussiennes au lieu des fonctions de type hydrogénoïde. Ces fonctions gaussiennes se distinguent essentiellement par le remplacement du facteur exponentiel de Slater en $\exp(-\alpha r)$ par un facteur gaussien en $\exp(-\alpha r^2)$. Elles conduisent à des calculs numériques plus simples et plus rapides. On dispose de bases de fonctions préétablies adaptées à différents types d'études sur des édifices moléculaires variés. Le choix d'une base plutôt qu'une autre repose souvent sur les compromis à faire entre les ressources calculatoires disponibles et la sophistication du niveau de calcul.

## Énergie des configurations électroniques

### Configurations à "couches complètes"

Dans une configuration dite à couches complètes, toutes les orbitales sont doublement occupées. Ainsi, on considère $2N$ électrons peuplant $N$ orbitales orthonormées. Après quelques développements mathématiques, on montre que l'énergie moyenne du déterminant de Slater peut s'écrire sous la forme d'une somme d'intégrales :

$$
E = \sum_{i=1}^{N} 2I_i + \sum_{i=1}^{N} \sum_{j=1}^{N} (2J_{ij} - K_{ij})
$$

avec :

$$
\begin{aligned}
I_i &= \int \phi_i(v)\mathbf{h}(v)\phi_i(v) \, dV_v \\
J_{ij} &= \int \frac{\phi_i^*(\mu)\phi_i(\mu)\phi_j^*(v)\phi_j(v)}{r_{\mu v}} \, dV_\mu dV_v \\
K_{ij} &= \int \frac{\phi_i^*(\mu)\phi_i(v)\phi_j^*(v)\phi_j(\mu)}{r_{\mu v}} \, dV_\mu dV_v
\end{aligned}
$$

L'intégrale monoélectronique $I_i$ peut être interprétée comme l'énergie moyenne d'un électron décrit par l'orbitale $\phi_i$ dans le champ du noyau seul (énergie cinétique de l'électron + attraction coulombienne).

L'intégrale coulombienne $J_{ij}$ représente l'énergie d'interaction de Coulomb entre les densités de charge électronique $|\phi_i(\mu)|^2$ et $|\phi_j(v)|^2$. On l'appelle aussi intégrale de Coulomb.

L'intégrale d'échange $K_{ij}$ n'a pas d'équivalent classique : elle provient de la condition d'antisymétrie de la fonction d'onde. Elle mesure l'énergie due à l'échange de deux électrons entre les orbitales $\phi_i$ et $\phi_j$.

### Énergie des orbitales

L'énergie d'une orbitale est définie par la somme de son énergie monoélectronique et des interactions de Coulomb et d'échange avec tous les autres électrons. Pour $M$ couches complètes, il vient :

$$
\epsilon_i = I_i + \sum_{j=1}^{M} 2J_{ij} - K_{ij}
$$

### Cas des couches ouvertes

L'expression de l'énergie électronique dans le cas de couches ouvertes (contenant des électrons célibataires) est similaire, bien que formellement plus complexe. On peut cependant faire simplement l'inventaire des termes énergétiques :

- Pour chaque électron affecté à une spin-orbitale, on compte une énergie monoélectronique d'orbitale négative notée $I_i$.
- Pour chaque paire d'électrons affectés aux spin-orbitales $\chi_i$ et $\chi_j$, on compte une énergie de répulsion coulombienne positive notée $J_{ij}$.
- Pour chaque paire d'électrons affectés aux spin-orbitales $\chi_i$ et $\chi_j$ de même spin, on compte une énergie d'échange négative notée $-K_{ij}$.

### Remplissage des couches et sous-couches

Les règles de remplissage permettent de déterminer la configuration de l'état fondamental (l'état de plus basse énergie). Elles se basent donc sur des critères d'énergie.

De manière générale, comme dans le cas des électrons indépendants, l'état fondamental est obtenu en occupant les orbitales de plus basse énergie. Par contre, la prise en compte explicite des termes de répulsion biélectronique dans l'hamiltonien a pour conséquence de lever la dégénérescence entre les sous-couches : les orbitales de nombres quantiques secondaires $l$ différents ont des énergies distinctes. L'ordre énergétique s'en trouve altéré (par exemple $E(4s) < E(3d)$).

On a recours à deux règles pour définir quelles sont les sous-couches occupées dans l'état fondamental.

**Règle de Pauli.** Au plus 2 électrons par case, de spins différents.

**Règle de Klechkowski.** Ordre de remplissage des cases. Il correspond à l'ordre énergétique des sous-couches. Il y a cependant des exceptions et l'ordre présenté ci-dessous n'est pas toujours respecté, notamment quand les sous-couches périphériques sont d'énergie proche ($3d/4s$ par exemple).

Lorsqu'il n'y a pas suffisamment d'électrons pour remplir complètement la sous-couche de plus haute énergie, plusieurs affectations des électrons sont possibles. Les règles suivantes permettent de décrire la configuration électronique de plus basse énergie :

**Règles de Hund.** Le nombre maximum de cases : l'interaction coulombienne $J$ est plus forte si les deux électrons sont affectés à la même orbitale car ils sont plus proches en moyenne. Les répartitions à électrons célibataires sont donc plus stables. C'est la première règle de Hund.

Le plus grand nombre possible de spins parallèles : l'interaction d'échange favorise les spins célibataires identiques. La dernière sous-couche comporte le plus grand nombre d'électrons célibataires de même spin. C'est la seconde règle de Hund.
