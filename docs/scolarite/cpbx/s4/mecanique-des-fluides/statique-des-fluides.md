---
title: "Statique des fluides"
description: "Statique des fluides : description des fluides, masse volumique et densité, pression et ses unités, poussée d'Archimède, principe de l'hydrostatique dans les liquides et les gaz, théorème de Pascal, vases communicants, châteaux d'eau et presse hydraulique."
sidebar_position: 1
---

## Description des fluides

### Description macroscopique des 3 états de la matière

**Solides et fluides.** On appelle fluides les corps, liquides ou gaz, qui prennent la forme des récipients dans lesquels on les verse. De plus, on ne considère que les milieux continus (la farine n'est pas considérée comme un fluide, mais comme un état granulaire).

Au contraire, les solides ont une forme bien définie qui ne dépend pas des récipients dans lesquels on les pose.

**Différenciation des liquides et des gaz - Compressibilité.** Les liquides, comme tous les fluides, prennent la forme du récipient dans lequel on les verse, mais ils ne le remplissent pas forcément : ils ont un volume bien défini. Un gaz par contre occupe la totalité du volume qui lui est accessible.

On place un fluide dans un récipient que l'on ferme avec un piston placé juste au-dessus de la surface libre. Si le fluide est un liquide, il est très difficile de diminuer le volume occupé en poussant le piston : on dit qu'un liquide est quasiment incompressible. Par exemple, considérons un cube de $1\ m$ de côté contenant de l'eau. Si, sur la surface de $1\ m^2$, on exerce une force de $10^5\ N$ (soit l'équivalent d'un poids de 10 tonnes), le volume d'eau diminue de $5\ cm^3$ ! La surface sur laquelle on appuie s'enfonce de $5\ \mu m$.

Si le fluide est un gaz, il est beaucoup plus facile de diminuer le volume : les gaz sont très compressibles.

### Masse volumique et densité

La masse volumique est le rapport entre la masse et le volume occupé par le fluide :

$$
\rho = \frac{M}{V}
$$

La masse volumique s'exprime en $kg.m^{-3}$ ou parfois en $g.cm^{-3}$. La densité d'un liquide correspond au rapport de sa masse volumique avec celle de l'eau pure (à $3{,}98\ ^\circ C$ et à une pression de 1 atmosphère) :

$$
d = \frac{\rho_{liq}}{\rho_{eau}}
$$

La densité d'un gaz correspond au rapport de sa masse volumique avec celle de l'air (dans les mêmes conditions de température et de pression) :

$$
d = \frac{\rho_{gaz}}{\rho_{air}}
$$

La densité est un nombre sans dimension.

## La pression

### Définition de la pression

Les particules (atomes ou molécules) d'un fluide (liquide ou gaz), porté à une température $T$ et mis dans un récipient, sont en agitation incessante (les particules sont « à l'arrêt » lorsque la température est de $0\ K$). Les particules se déplacent à grande vitesse et viennent heurter les parois du récipient. Ces chocs engendrent la force de pression.

On introduit la notion de pression pour caractériser les forces de contact entre 2 corps. Cette force de contact peut être décomposée en :

- une composante parallèle à la surface (frottements) ;
- une composante perpendiculaire à la surface.

La pression est le coefficient de proportionnalité entre la composante de la force perpendiculaire à la surface et l'aire de cette surface :

$$
F_\perp = pS\vec{n}
$$

où $\vec{n}$ est le vecteur unitaire perpendiculaire à la surface. La pression est ainsi le rapport de la force perpendiculaire à la surface sur l'aire de la surface :

$$
p = \frac{F_\perp}{S}
$$

Par exemple, on considère un récipient cylindrique de section $S = 10\ cm^2$ sur lequel agit un piston. Le piston est poussé par une force $F = 100\ N$ perpendiculaire à la surface du piston. La pression exercée est donc de

$$
p = \frac{F}{S} = 10^5\ N.m^{-2}
$$

### Unités de pression

L'unité du Système International pour la pression est le **Pascal**, de symbole $Pa$. Exprimée dans les unités fondamentales du Système International, l'unité de pression est le $N.m^{-2}$.

Comme la pression est une notion de physique fondamentale, on trouve plusieurs unités inventées au cours du temps, que l'on retrouve facilement dans la littérature scientifique et dans le langage courant. Citons :

- le bar ou millibar, très utilisé en météorologie ;
- le barye, système CGS, très répandu dans la littérature anglo-saxonne ;
- l'atmosphère, utilisée en météorologie ;
- le kilo de pression, utilisé pour la pression des pneus ;
- le millimètre de mercure, aussi appelé torr ;
- le millimètre d'eau ou le centimètre d'eau, utilisé en médecine ;
- le pound per square inch (psi), unité anglo-saxonne, très utilisée en hydrostatique et oléohydraulique.

### Mise en évidence de la pression

**Mise en évidence dans les liquides.** Considérons un tonneau plein d'un liquide et percé. Le liquide s'écoule avec un jet perpendiculaire à la surface du trou. Ce mouvement initial ne peut pas être dû à la pesanteur, sinon le mouvement serait vertical descendant.

Lorsque le tonneau n'est pas percé, il faut que celui-ci exerce sur le liquide une force qui contrebalance l'effet observé lorsqu'il est percé : la paroi exerce donc une force perpendiculaire à elle-même sur le liquide. Réciproquement, le liquide exerce sur la paroi cette même force en sens inverse : c'est la force de pression.

**Mise en évidence dans les gaz.** La mise en évidence de la pression atmosphérique a été faite par le scientifique allemand Otto von Guericke en 1654, avec une expérience très célèbre faite à Magdebourg. Deux hémisphères de cuivre de 51 cm de diamètre sont raccordés bord à bord et le vide est fait à l'intérieur. Il attache ensuite les extrémités des hémisphères à un attelage de 8 chevaux : ceux-ci ne sont pas parvenus à détacher les hémisphères. Lorsqu'il fit rentrer de l'air dans le système, les chevaux sont parvenus à détacher les deux hémisphères. Durant l'année, il répéta cette expérience à Berlin avec un attelage de 24 chevaux qui ne parvinrent pas non plus à détacher les hémisphères.

En faisant le vide à l'intérieur, il ne peut pas y avoir de pression. Par contre, à l'extérieur, c'est la pression atmosphérique qui s'exerce sur la surface des deux hémisphères. La surface de « la boule » est $S = 4\pi r^2 = 0{,}817\ m^2$. La pression extérieure est la pression atmosphérique de valeur $p = 101325\ Pa$. Ainsi la force de pression est de

$$
F = pS = 82{,}8 \times 10^3\ N
$$

Si le vide n'est pas fait à l'intérieur, la pression atmosphérique s'exerce de chaque côté des coques hémisphériques et les forces de pression externe et interne se compensent : il est alors facile de décoller les deux hémisphères.

## Poussée d'Archimède

Le théorème d'Archimède se résume à « on pèse moins lourd dans l'eau ».

### Histoire

En $-265$, le roi Hiéron II de Syracuse avait fait appel à Archimède pour vérifier si la couronne en or que le roi avait achetée à un orfèvre était vraiment en or, ou si l'orfèvre avait utilisé un mélange d'or et d'argent. La forme de la couronne était trop complexe pour calculer son volume géométriquement et Archimède n'avait pas le droit de l'abîmer. L'histoire ou la légende dit qu'Archimède avait observé dans les bains publics que les objets flottaient de différentes manières, et que cela l'inspira pour vérifier la teneur en or de la couronne. Il serait alors sorti nu dans la rue en criant eurêka (qui veut dire j'ai trouvé). L'idée d'Archimède est que des objets de composition différente, mais de même volume, n'ont pas le même poids apparent dans l'eau, c'est-à-dire que les objets n'ont pas la même masse volumique. Comme la masse volumique de l'argent est $\rho_{Ag} = 10500\ kg.m^{-3}$ et celle de l'or $\rho_{Au} = 19300\ kg.m^{-3}$, une couronne faite d'un mélange d'or et d'argent est plus légère qu'une couronne de même volume composée exclusivement d'or.

### La poussée d'Archimède

Considérons un solide que l'on maintient immergé à l'équilibre dans un fluide. Le solide est soumis à :

- son poids $\vec{P}$ ;
- la force exercée par l'opérateur $\vec{f}$ ;
- la résultante des forces de pression $\vec{F}_p = \int_{Surf} d\vec{F}_p$.

Considérons maintenant une enveloppe imaginaire de fluide de même volume que le solide précédent. Le volume du fluide est en équilibre et est soumis à :

- son poids $\vec{P}'$ ;
- la résultante des forces de pression $\vec{F}'_p$ due au reste du fluide environnant.

Puisqu'il y a équilibre,

$$
\vec{F}'_p = -\vec{P}'
$$

Or la résultante des forces de pression est la même dans les 2 cas :

$$
\vec{F}_p = \vec{F}'_p = -\vec{P}'
$$

> Tout corps plongé dans un fluide subit de la part du fluide une force verticale dirigée de bas en haut et égale au poids du volume de fluide déplacé.

Le point d'application de la poussée d'Archimède est appelé **centre de poussée** : c'est le centre de gravité du volume équivalent de fluide déplacé (qui ne coïncide pas forcément avec le centre de gravité du solide immergé, si ce dernier n'est pas homogène). Le théorème d'Archimède est valable pour les corps plongés dans les liquides, les gaz et aussi dans les superpositions de plusieurs fluides.

### Poids apparent dans un fluide

Un solide de volume $V$ immergé dans un fluide est soumis à :

- son poids $\vec{P}$, dirigé vers le bas ;
- la poussée d'Archimède $\vec{F}_A$, dirigée vers le haut.

Le poids apparent du solide est alors

$$
\vec{P}_{app} = \vec{P} - \vec{F}_A
$$

Les vecteurs étant équipollents, on peut écrire

$$
||\vec{P}_{app}|| = ||\vec{P}|| - ||\vec{F}_A||
$$

$$
||\vec{P}_{app}|| = (\rho_{solide} - \rho_{fluide})Vg
$$

### Vérification expérimentale

On réalise l'expérience suivante. Sur une balance à fléau, on réalise l'équilibre entre, d'un côté, une suspension constituée d'un cylindre plein surmonté d'un cylindre creux de même volume, et de l'autre côté une tare. On plonge le cylindre plein dans un récipient rempli de fluide. L'équilibre est rompu. Les forces de pression qui agissent sur le cylindre plein engendrent une poussée d'Archimède verticale dirigée vers le haut qui correspond en intensité au poids du volume de fluide déplacé : le cylindre plein « pèse moins lourd », le système des deux cylindres apparaît plus léger. On remplit le cylindre creux avec le même fluide que celui du récipient. Comme les deux cylindres ont même volume, on rajoute au système des cylindres un poids correspondant au volume de fluide déplacé dans le récipient. Ce poids vient compenser la poussée d'Archimède et l'équilibre revient. On montre ainsi que la différence de poids est due au poids du volume de fluide déplacé par le cylindre plein.

### Applications de la poussée d'Archimède

- **Bateaux.** Un bateau est en équilibre lorsque le poids du volume d'eau déplacé par la partie de coque immergée est égal au poids du bateau.
- **Sous-marin.** Pour qu'un sous-marin entièrement immergé soit en équilibre dans l'eau, il faut que la masse volumique globale du sous-marin soit égale à celle de l'eau. Pour arriver à cela, les réservoirs internes (les ballasts) du sous-marin sont en partie remplis d'eau. Le volume du sous-marin étant constant, si les réservoirs intérieurs sont entièrement remplis d'eau, on augmente la masse volumique et le sous-marin descend. Réciproquement, si les réservoirs sont remplis d'air, la masse volumique diminue et le sous-marin remonte (ceci est effectué par l'injection d'air comprimé qui évacue l'eau des ballasts).
- **Montgolfières.** On utilise le fait que l'air chaud est moins lourd que l'air froid. Si on remplit l'enveloppe d'une montgolfière d'air plus chaud que l'air extérieur, on diminue la masse volumique du ballon. Lorsque la masse volumique globale de la montgolfière est plus faible que la masse volumique de l'air, la montgolfière monte. Si on arrête d'alimenter l'enveloppe en air chaud, l'air se refroidit et le ballon descend.

## Hydrostatique

### Pression dans un fluide au repos dans le champ de pesanteur

Considérons un volume de fluide (liquide ou gaz). Considérons dans ce volume une partie de fluide de forme parallélépipédique avec deux faces horizontales. Le parallélépipède de fluide possède un poids $\vec{P}$. De plus, 6 forces de pression, notées $\vec{F}_i$, s'exercent sur le parallélépipède. Cette partie de fluide est en équilibre, on a donc

$$
\sum_{i=1}^{6} \vec{F}_i + \vec{P} = \vec{0}
$$

Rappelons qu'une force de pression correspond au produit de la pression par la surface sur laquelle elle agit, soit $F = pS$. Faisons la projection vectorielle de cette relation sur l'axe $Ox$, on obtient :

$$
F_2 - F_4 = 0 \Rightarrow F_2 = F_4 \Rightarrow p_2 S'' = p_4 S'' \Rightarrow p_2 = p_4
$$

En projection sur l'axe $(Oy)$, on obtient

$$
F_1 - F_3 = 0 \Rightarrow F_1 = F_3 \Rightarrow p_1 S' = p_3 S' \Rightarrow p_1 = p_3
$$

> À l'intérieur d'un fluide en équilibre soumis à la pesanteur, la pression est la même pour tous les points situés sur un même plan horizontal.

Faisons maintenant la projection vectorielle de cette relation sur l'axe $(Oz)$, on obtient

$$
F_6 - F_5 - P = 0 \Rightarrow p_6 S - p_5 S = P
$$

or

$$
P = mg = \rho Vg = \rho Shg
$$

On a donc

$$
p_6 - p_5 = \rho gh
$$

Par cette relation, on voit que la différence de pression entre le niveau du dessous et le niveau du dessus est positive et vaut $\delta p = \rho gh$, où $h$ est la différence de hauteur entre les deux niveaux. La pression qui existe à un niveau en dessous d'un autre est donc plus forte : c'est pourquoi, en plongée sous-marine, on a mal aux oreilles lorsque l'on descend.

Le terme $\rho h$ correspond à la masse de fluide contenue dans un cylindre de hauteur $h$ et de section unité $S = 1$ (dans le système d'unités choisi, par exemple $m^2$), c'est-à-dire $m = \rho v = \rho Sh = \rho h$.

> Dans un fluide en équilibre soumis à la pesanteur, la différence de pression entre 2 niveaux d'altitudes $h$ et $h - \Delta h$ est égale au poids d'une colonne de fluide de section unité et de hauteur égale à la différence d'altitude $\delta h$ des niveaux.

$$
p(h - \Delta h) - p(h) = \rho g \delta h
$$

### Équation fondamentale de la statique des fluides

On a vu que le principe de l'hydrostatique pour un fluide au repos dans le champ de pesanteur est décrit par

$$
p(h - \Delta h) - p(h) = \rho g \Delta h
$$

où la pression $p(h - \Delta h)$ est la pression qui se trouve à un niveau en dessous du niveau où règne la pression $p(h)$. En se mettant à un niveau juste au-dessus, on peut aussi écrire de manière équivalente

$$
p(h) - p(h + \Delta h) = \rho g \Delta h
$$

Considérons alors un référentiel $O(x, y, z)$, avec l'axe $Oz$ dirigé verticalement vers le haut. Le volume de fluide considéré est un parallélépipède de côtés $dx$, $dy$ et $dz$. La relation précédente s'écrit

$$
p(z) - p(z + dz) = \rho g\,dz
$$

que l'on peut écrire

$$
\frac{p(z) - p(z + dz)}{dz} = \rho g
$$

On reconnaît ici, au signe près, la forme de la dérivée de la pression $p(z)$, donc

$$
-\frac{dp(z)}{dz} = \rho g
$$

Mais la pression est une quantité scalaire qui se décrit en tout point de coordonnées $(x, y, z)$. Or on a vu que la variation de pression ne se fait sentir que verticalement et non horizontalement. On peut écrire la relation de manière plus générale :

$$
-\overrightarrow{\text{grad}}(p) = -\rho\vec{g}
$$

> Pour un fluide homogène au repos, de masse volumique $\rho$ dans le champ de pesanteur, l'équation fondamentale de la statique des fluides se présente sous la forme de l'équation différentielle
>
> $$
> -\overrightarrow{\text{grad}}(p(z)) + \rho\vec{g} = \vec{0}
> $$

### Principe de l'hydrostatique dans les liquides - Théorème de Pascal

Les liquides étant incompressibles, leurs masses volumiques sont constantes. Considérons des récipients de diverses formes. Si les récipients sont remplis du même liquide, la pression à la base des récipients (donc en $A$) est indépendante de la forme du récipient et est toujours égale à

$$
p_A = p_B + \rho gh
$$

**Théorème I.1.** (de Pascal) Un changement de pression $\delta p$ en un point quelconque d'un fluide liquide incompressible se transmet immédiatement à tous les autres points du liquide. Ainsi, si $p'_B = p_B + \delta p$,

$$
p'_A = p'_B + \rho gh = p_B + \delta p + \rho gh \Rightarrow p'_A = p_A + \delta p
$$

### Principe de l'hydrostatique dans les gaz

Les gaz sont compressibles. Aussi leurs masses volumiques varient avec la pression.

Regardons ce qui se passe si on applique le principe de l'hydrostatique à l'atmosphère en considérant la masse volumique constante. La pression atmosphérique (moyenne) au sol est $p(0) = p_{atm} = 101325\ Pa$ et la masse volumique de l'air, au sol, est $\rho_{air} = 1{,}29349\ kg/m^3$. À 10 000 m d'altitude (altitude de vol des avions long-courriers), la pression serait

$$
p(0) = p(h) + \rho gh
$$

$$
p(10000) = p(0) - \rho gh = 101325 - 1{,}29349 \times 9{,}81 \times 10000 = -25566\ Pa
$$

soit une pression négative, ce qui est impossible.

Donc, pour des différences d'altitude importantes dans l'atmosphère, il faut tenir compte du fait que la masse volumique dépend de la pression $p$ et de la température $T$ lorsque l'altitude augmente. Les calculs deviennent alors plus compliqués.

Il n'y a pas vraiment de loi de variation de la pression avec l'altitude, sauf quelques formules empiriques. Par contre, l'équation d'état des gaz permet de mettre en relation de manière rigoureuse la pression, le volume et la température. L'équation d'état la plus simple est celle du gaz parfait. On entend par gaz parfait un gaz réel à basse pression ; dans ce cas, les molécules du gaz sont suffisamment éloignées pour que l'on puisse considérer qu'il n'y a pas d'interaction entre elles. L'équation d'état du gaz parfait s'écrit

$$
pV = nRT
$$

On a $R = \mathcal{N}_A.k_B$, où $\mathcal{N}_A = 6{,}022 \times 10^{23}\ mol^{-1}$ est le nombre d'Avogadro représentant le nombre de particules par mole, et $k_B = 1{,}38 \times 10^{-23}\ J.K^{-1}$ est la constante de Boltzmann. Ainsi, l'équation d'état des gaz parfaits peut aussi s'écrire

$$
pV = n\mathcal{N}_A k_B T = Nk_B T
$$

Comme en mécanique des fluides les formules s'expriment plutôt à l'aide de la masse volumique, on établit la loi des gaz parfaits comme ceci :

$$
p = \frac{nRT}{V} = \frac{nM_{mol}}{V} \frac{R}{M_{mol}} T
$$

Ici, $nM_{mol}$ correspond à la masse du gaz et la masse volumique $\rho = nM_{mol}/V$. On appelle $r$ la constante spécifique (ou individuelle) du gaz : $r = \dfrac{R}{M_{mol}}$. Ainsi, l'équation d'état du gaz parfait exprimée en fonction de la masse volumique du gaz est

$$
p = \rho rT
$$

L'équation fondamentale de la statique des fluides $-\overrightarrow{\text{grad}}(p) + \rho\vec{g} = \vec{0}$ s'écrit aussi

$$
-\frac{dp}{dz} - \rho g = 0
$$

Ainsi, on a

$$
-\frac{dp}{dz} - \frac{p}{rT} g = 0 \Rightarrow \frac{dp}{p} = -\frac{g}{rT} dz
$$

On obtient alors une équation différentielle correspondant à la variation spatiale selon $Oz$ de la pression en fonction de la température. À partir de lois de variation de la température avec l'altitude, on peut formuler la loi de variation de la pression en fonction de l'altitude. Par exemple :

- sur des petites différences d'altitude, on peut faire l'approximation de la loi de l'air isotherme :

  $$
  T(z) = T_0 \Rightarrow \frac{dp(z)}{p} = -\frac{g}{rT_0} dz
  $$

- sur des différences d'altitude plus grandes, jusqu'à la limite de la troposphère, on peut faire l'approximation de la loi de variation linéaire :

  $$
  T(z) = Az + T_0 \Rightarrow \frac{dp(z)}{p} = -\frac{g}{r(Az + T_0)} dz
  $$

Cependant, si on s'intéresse aux variations de pression sur des dénivelés de l'ordre de quelques dizaines de mètres, on peut appliquer le principe de l'hydrostatique, ou même, sachant que $\rho_{gaz} \ll \rho_{liq}$, considérer la pression constante, car dans ce cas les variations de pression sont très inférieures à la pression. En effet, la variation de pression est de

$$
p(0) - p(h) = \rho gh
$$

Une variation de pression de 1 % correspond à une variation de

$$
\Delta p = p(0) - p(h) = 101325 - 101325 \times \left(1 - \frac{1}{100}\right) = 1013{,}25\ Pa
$$

soit pour une altitude

$$
h = \frac{p(0) - p(h)}{\rho g} = 80\ m
$$

### Conséquences et applications du principe de l'hydrostatique

**Les vases communicants.** La surface libre des liquides au repos dans le champ de pesanteur est toujours horizontale. Considérons un récipient rempli de liquide tel que présenté sur la figure. Appliquons le principe de l'hydrostatique entre le point $O$ et les points de surface $A$ et $B$ :

$$
p_0 = p_A + \rho gh = p_B + \rho gh'
$$

Les pressions en $A$ et $B$ sont identiques et valent la pression atmosphérique, $p_A = p_B = p_{atm}$ ; on a

$$
p_{atm} + \rho gh = p_{atm} + \rho gh' \Rightarrow h = h'
$$

Ainsi, pour qu'il y ait équilibre, il faut que la pression en tout point d'un plan horizontal soit constante : c'est le principe des vases communicants.

**Les châteaux d'eau.** Les châteaux d'eau permettent d'avoir une distribution en eau dans les habitations « à tous les étages ». Ce sont des constructions de 10 à 20 mètres de haut. Pour pouvoir couler du robinet, la pression de l'eau en sortie doit être supérieure à la pression atmosphérique. Donc la hauteur de l'eau dans les châteaux d'eau doit être supérieure à la hauteur des habitations.

En effet, en haut du château d'eau (en $A$), l'eau est à la pression atmosphérique, et le principe de l'hydrostatique permet d'écrire

$$
p_O = p_A + \rho gh_A = p_B + \rho gh_B
$$

Donc, si l'on veut $p_B > p_A$, il faut que $h_B < h_A$. Pour des immeubles de grande dimension, il est fait usage de pompes électriques pour acheminer l'eau jusqu'en haut de l'immeuble.

**La presse hydraulique.** Les presses de fortes puissances reposent sur le principe de l'hydrostatique et sur le théorème de Pascal. Imaginons un système de deux vases communicants contenant un liquide dont un des côtés possède un piston de petite dimension de surface $s$ et l'autre côté est surmonté d'une plaque de grande surface $S$.

On appuie sur le piston en $A$ avec une force $\vec{f}$. Cette force engendre une variation de pression $\delta p_A$. Le théorème de Pascal dit que toute modification de pression créée en $A$ se transmet à tous les autres points du liquide. On retrouve donc en $B$ une variation de pression $\delta p_B = \delta p_A$. La variation de pression $\delta p_A$ est créée par la force $\vec{f}$, soit

$$
\delta p_A = \frac{||\vec{f}||}{s}
$$

La variation de pression $\delta p_B$ ressentie en $B$ engendre une force de pression $\vec{F}$.
