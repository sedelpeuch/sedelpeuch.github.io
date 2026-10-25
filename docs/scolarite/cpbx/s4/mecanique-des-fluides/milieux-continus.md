---
title: "Notions de mécanique des milieux continus"
description: "Mécanique des milieux continus : notion de continuité, cinématique et tenseur des déformations, contraintes et équation d'équilibre, lois de comportement des solides et des fluides, fluide newtonien et viscosité, statique des fluides."
sidebar_position: 3
---

## Introduction

Il existe trois états de la matière, solide, liquide et gazeux ; les états liquide et gazeux composent les fluides. Dans un solide, les atomes occupent des positions moyennes dans un réseau cristallin bien défini qu'il est difficile de modifier, leurs déplacements sont donc limités.

A contrario, dans les liquides, la distance qui sépare les molécules est plus grande, ainsi les forces intermoléculaires sont plus faibles que dans les solides. La structure est donc un amas de molécules qui est beaucoup plus désordonné que dans les solides. La masse volumique est assez grande et comparable à celle des solides :

> « L'eau c'est lourd », *Baste Jean-Stéphane*

Le liquide ne possède pas de forme propre, il occupe l'espace qui lui est octroyé, les couches glissent les unes par rapport aux autres, le liquide peut **s'écouler**. Cependant, son volume est bien défini et le liquide est incompressible.

Le gaz occupe tout l'espace octroyé, les forces intermoléculaires sont très faibles, la masse volumique de même. Le gaz est très compressible.

## Notion de continuité

On utilise le **concept de milieu continu**, qui correspond à une modélisation de la réalité physique à une échelle donnée, induite par l'expérience. Dans ce cours, on assimile la matière à un milieu continu.

**Proposition A.** Un milieu est continu lorsque ses propriétés varient de façon continue d'un point à l'autre. Une particule possède une position et une vitesse en un point central. De plus, une particule possède une masse $\Delta m$ et un volume $\Delta V$ ; on peut donc définir la masse volumique moyenne

$$
\rho_{moy} = \frac{\Delta m}{\Delta V}
$$

et donc la masse volumique du point $P$ est

$$
\lim_{\Delta V \to 0} \left(\frac{\Delta m}{\Delta V}\right) = \rho(P) \underbrace{=}_{\text{continuité}} \frac{dm}{dV}
$$

Les propriétés physiques du milieu vont dépendre du point d'application :

$$
\Phi \underbrace{\mapsto}_{\text{masse en } P} \varphi(P)
$$

puisque le milieu est continu, lorsque l'on s'écarte du point $P$ :

1. soit $\varphi$ ne varie pas ;
2. soit $\varphi$ varie très peu autour de $P$, la propriété $\Phi$ est continue dans le milieu continu :

   $$
   d\phi = \frac{\partial \phi}{\partial x} dx + \frac{\partial \phi}{\partial y} dy + \frac{\partial \phi}{\partial z} dz
   $$

3. soit $\varphi$ n'est pas continue, donc le milieu n'est pas continu.

**Proposition B.** Lors d'une déformation d'un milieu continu, deux points voisins restent voisins et donc des portions initialement distinctes restent distinctes (pas de superposition). Une particule $M$ à l'instant $t_0$ se trouve aux coordonnées $(x_0, y_0, z_0)$ et à l'instant $t$ elle se trouve aux coordonnées $(x_1, y_1, z_1) = (f_1, f_2, f_3)$.

**Proposition C.** Il y a évolution continue si les fonctions $f_1$, $f_2$ et $f_3$ sont continues, uniformes (injectives), de classe $C^1$.

Les trois propositions forment les **3 notions de continuité**. Cependant, l'hypothèse de continuité des transformations n'est pas vérifiée par :

1. la formation de trous par fissure dans les solides et la cavitation dans les fluides. Pour traiter ce cas, on conserve l'hypothèse de continuité partout sauf sur la surface de **discontinuité** ; cette surface est caractérisée par une surface **libre** ;
2. le glissement relatif de 2 parties du milieu, par le glissement dans les solides et le sillage dans les fluides. Pour traiter ce cas, on conserve l'hypothèse de continuité partout sauf sur la surface de **glissement** ; cette surface sera traitée grâce aux forces de glissement ;
3. le choc de deux veines fluides. Pour traiter ce cas, on conserve l'hypothèse de continuité partout sauf sur la surface de **choc** ; cette surface sera traitée grâce aux forces de chocs.

## Cinématique des milieux continus - déformations

Soit un milieu continu qui subit une transformation ; le point d'origine est $P_0$ et $\overrightarrow{P_0P} = \vec{D}$ le déplacement. Si le point $Q_0$ voisin de $P_0$ subit la même transformation que $P_0$, il se déplace à $Q'$ et $\overrightarrow{Q_0Q'} = \vec{D}$ ; alors la transformation de la matière est une simple **translation**.

Si le point $Q_0$ n'a pas la même translation que $P_0$, il se déplace à $Q$ et $\overrightarrow{Q_0Q} = \vec{X}$, ce qui induit une **déformation**. C'est la différence de déplacement qui crée la déformation.

$$
\overrightarrow{Q_0Q} = \vec{X}(Q_0) = \vec{D}(P_0) + d\vec{X}(Q_0, \text{déformation})
$$

La transformation déformante implique l'apparition de $d\vec{X}$, donc la déformation correspond à $d\vec{X}$. Soit

$$
\overrightarrow{P_0Q_0} = \vec{d}_{10} = \begin{cases} dx_1 \\ dx_2 \\ dx_3 \end{cases}
\quad \text{et} \quad
d\vec{X} = \begin{cases} dX_1 \\ dX_2 \\ dX_3 \end{cases}
$$

Une transformation continue d'un milieu continu est donc, d'après C, $d\vec{X}$ est continu, donc

$$
d\vec{X} = \begin{cases} dX_1 = \overrightarrow{\text{grad}}(X_1).\vec{d}_{10} \\ dX_2 = \overrightarrow{\text{grad}}(X_2).\vec{d}_{10} \\ dX_3 = \overrightarrow{\text{grad}}(X_3).\vec{d}_{10} \end{cases}
$$

$$
\left\lbrace d\vec{X} \right\rbrace = \begin{pmatrix} dX_1 \\ dX_2 \\ dX_3 \end{pmatrix} = \begin{pmatrix} \dfrac{\partial X_1}{\partial x_1} & \dfrac{\partial X_1}{\partial x_2} & \dfrac{\partial X_1}{\partial x_3} \\ \dfrac{\partial X_2}{\partial x_1} & \dfrac{\partial X_2}{\partial x_2} & \dfrac{\partial X_2}{\partial x_3} \\ \dfrac{\partial X_3}{\partial x_1} & \dfrac{\partial X_3}{\partial x_2} & \dfrac{\partial X_3}{\partial x_3} \end{pmatrix} \begin{pmatrix} dx_1 \\ dx_2 \\ dx_3 \end{pmatrix}
$$

$$
d\vec{X} = \vec{G}.\vec{d}_{10}
$$

> « 3 × 3 = 9 », *Baste Jean-Stéphane*

$$
\frac{\partial X_i}{\partial x_j} = \frac{1}{2}\left(\frac{\partial X_i}{\partial x_j} - \frac{\partial X_j}{\partial x_i}\right) + \frac{1}{2}\left(\frac{\partial X_i}{\partial x_j} + \frac{\partial X_j}{\partial x_i}\right) = \omega_{ij} + \varepsilon_{ij}
$$

où $\omega_{ij} = -\omega_{ji}$ et $\omega_{ii} = 0$ :

$$
\omega_{ij} = \begin{pmatrix} 0 & \omega_{12} & \omega_{13} \\ -\omega_{12} & 0 & \omega_{23} \\ -\omega_{13} & -\omega_{23} & 0 \end{pmatrix}
\quad \text{et} \quad
\varepsilon_{ij} = \begin{pmatrix} \varepsilon_{11} & \varepsilon_{12} & \varepsilon_{13} \\ \varepsilon_{12} & \varepsilon_{22} & \varepsilon_{23} \\ \varepsilon_{13} & \varepsilon_{23} & \varepsilon_{33} \end{pmatrix}
$$

et donc

$$
X_i = D_i + \sum_j \omega_{ij} dx_j + \sum_j \sum \varepsilon_{ij} dx_j
$$

**Étude de $\omega_{ij}$.** On note

$$
\vec{\omega} = \begin{cases} \omega_1 = \omega_{32} \\ \omega_2 = \omega_{13} \\ \omega_3 = \omega_{21} \end{cases}
$$

$$
\vec{\omega} \wedge \vec{d}_{20} = \begin{cases} \omega_{13} dx_3 - \omega_{21} dx_2 \\ \omega_{21} dx_1 - \omega_{32} dx_3 \\ \omega_{32} dx_2 - \omega_{13} dx_2 \end{cases} = \begin{cases} \omega_{12} dx_2 + \omega_{13} dx_3 \\ \omega_{21} dx_1 + \omega_{23} dx_3 \\ \omega_{31} dx_1 + \omega_{32} dx_2 \end{cases}
$$

De plus, si $\varepsilon_{ij} = 0$, on a

$$
\begin{cases} X_1 = D_1 + \cancel{\omega_{11} dx_1} + \omega_{12} dx_2 + \omega_{13} dx_3 \\ X_2 = D_2 + \omega_{21} dx_1 + \cancel{\omega_{22} dx_2} + \omega_{23} dx_3 \\ X_3 = D_3 + \omega_{31} dx_1 + \omega_{32} dx_2 + \cancel{\omega_{33} dx_3} \end{cases}
$$

et donc

$$
\vec{\omega} \wedge \vec{d}_{10} = \overrightarrow{Q_0P_0} \wedge \vec{\omega}
$$

On remarque que c'est l'équation de rotation d'ensemble d'un solide indéformable. Donc la partie antisymétrique $\omega$ de la matrice de transformation $G$ n'est pas déformante. Elle décrit une rotation d'ensemble sans **déformation**.

$$
\vec{\omega} = \frac{1}{2} \overrightarrow{\text{rot}}(\vec{X})
$$

**Étude de $\varepsilon_{ij}$.** Une transformation dans le plan (1,2) d'un segment $P_0Q_0$ parallèle à l'axe $\vec{1}$ ($dx_2 = 0$). On a alors

$$
dX_1 = \frac{\partial X_1}{\partial x_1} dx_1 + \cancel{\frac{\partial X_1}{\partial x_2} dx_2}
$$

$$
dX_1 = \varepsilon_{11} dx_1 = \overline{Q_1Q'}
$$

d'où on a

$$
\varepsilon_{11} = \frac{\partial X_1}{\partial x_1} = \frac{Q_1Q'}{P_0Q_0} = \frac{\overline{Q_1Q'}}{\overline{PQ_1}} = \frac{\text{allongement suivant l'axe 1}}{\text{longueur initiale suivant 1}}
$$

Ainsi $\varepsilon_{ii}$ représente l'allongement relatif par rapport à l'axe $i$. C'est une dilatation linéaire, une extension ; ainsi $\overline{Q_1Q} = \overline{P_0Q_0}\varepsilon_1 1$

$$
\overline{PQ'} = \overline{P_0Q_0}(1 + \varepsilon_{11})
$$

Lors de la rotation de 1 vers 2, on a $Q'$ très voisin de $Q$, ainsi $PQ' = PQ$ ; on a donc $\overline{Q'Q} = dX_2$.

$$
\begin{aligned}
\tan(\theta) &= \frac{dX_2}{dx_1(1 + \varepsilon_{11})} \\
&= \frac{\partial X_2}{\partial x_1} \frac{dx_1}{dx_1(1 + \varepsilon_{11})} \\
&= \frac{\partial X_2}{\partial x_1} \frac{1}{1 + \varepsilon_{11}} \\
&= \frac{G_{21}}{1 + \varepsilon_{11}}
\end{aligned}
$$

On a $\varepsilon_{11}$ petit devant 1, on a donc $\theta$ petit et finalement $\theta \sim G_{21}$.

Les termes diagonaux sont responsables de l'extension et les termes non diagonaux sont responsables de la distorsion. On a donc $\theta_1 = G_{21}$, ce qui représente la rotation de 1 vers 2, et $\theta_2 = G_{12}$, ce qui représente la rotation de 2 vers 1.

$$
\varepsilon_{12} = \frac{1}{2}\left(\underbrace{\frac{\partial X_2}{\partial x_1}}_{G_{21}} + \underbrace{\frac{\partial X_1}{\partial x_2}}_{G_{12}}\right) = \varepsilon_{21}
$$

Soit $\gamma = \dfrac{\pi}{2} - (\theta_1 + \theta_2)$, ainsi

$$
\gamma = \frac{\pi}{2} - (G_{21} + G_{12}) = \frac{\pi}{2} - 2\varepsilon_{12}
$$

La variation d'angle est le fait des termes non diagonaux, qui induisent une distorsion, et donc

$$
\frac{\pi}{2} \to \frac{\pi}{2} - 2\varepsilon_{12}
$$

Le terme $2\varepsilon_{ij}$ représente la modification de l'angle droit entre les directions $Ox_i$ et $Ox_j$ : c'est **l'angle de glissement**.

**Propriété de la matrice de déformation.**

$$
\begin{pmatrix} \varepsilon_{11} & \varepsilon_{12} & \varepsilon_{13} \\ \varepsilon_{12} & \varepsilon_{22} & \varepsilon_{23} \\ \varepsilon_{13} & \varepsilon_{23} & \varepsilon_{33} \end{pmatrix} \to \begin{pmatrix} \epsilon_1 & 0 & 0 \\ 0 & \epsilon_2 & 0 \\ 0 & 0 & \epsilon_3 \end{pmatrix}
$$

La matrice est symétrique et donc elle est diagonalisable dans un repère principal de déformation. On dit que $\epsilon_i$ est l'**extension principale** ; de plus, si $i \neq j$, on a $\epsilon_{ij} = 0$ : la forme est conservée.

De plus, la trace de la matrice est un invariant, donc

$$
div(\vec{X}) = tr(\epsilon_{ij}) = \frac{\Delta V}{V} \qquad \text{(dilatation volumique)}
$$

$$
\epsilon_{11} + \epsilon_{22} + \epsilon_{33} = \epsilon_1 + \epsilon_2 + \epsilon_3 = cte = \theta
$$

## Équilibre des milieux continus - contrainte

**Forces s'exerçant sur une portion de milieu continu.**

> « Si les petites cuillères sont tordues c'est parce qu'on les a touchées », *Baste Jean-Stéphane*

Les forces de contact vont de l'extérieur vers l'intérieur. Cette force de contact va dépendre du point, ce qui induit un **champ de force de contact**. Il possédera une densité moyenne de force $\dfrac{\Delta \vec{F}}{\Delta S}$ et une densité de force de contact en $P = \displaystyle\lim_{\Delta S \to 0} \left(\frac{\Delta \vec{F}}{\Delta S}\right) = \vec{T}$.

Il y a apparition d'une tension mécanique $\vec{T}(P, \vec{N})$ en $N.m^{-2}$, qui est une action par unité de surface de l'extérieur sur l'intérieur. Pour connaître $\vec{T}$ : les 3 paramètres de position du point $x$, les deux cosinus directeurs $\alpha$ par rapport à $\vec{N}$ et l'intensité de la force. La région autour du point $P$ porte la normale ; on a

$$
\begin{aligned}
T_n &= \vec{T}\vec{N} \quad \text{projection de } \vec{T} \text{ sur la normale } \vec{N} \\
\vec{T}_n &= (\vec{T}\vec{N})\vec{N} \\
\vec{t} &= \vec{t} = \vec{N} \wedge \vec{T} \wedge \vec{N} \\
&= \vec{T} - \vec{T}_n \\
&= \vec{T} - (\vec{N}.\vec{T})\vec{N}
\end{aligned}
$$

$\vec{t}$ est le vecteur de cission. L'action vers l'extérieur est une traction positive $T_n > 0$ et l'action vers l'intérieur implique une traction négative $T_n < 0$.

Soit trois facettes orientées suivant les axes 1, 2, 3 ; sur la facette $i$ s'exerce la tension $\vec{T}_i$. On peut établir une matrice

$$
\begin{pmatrix} T_{n1} & t_{12} & t_{13} \\ t_{21} & T_{n2} & t_{32} \\ t_{31} & t_{32} & T_{n3} \end{pmatrix} = \begin{pmatrix} \sigma_{11} & \sigma_{12} & \sigma_{13} \\ \sigma_{21} & \sigma_{22} & \sigma_{23} \\ \sigma_{31} & \sigma_{32} & \sigma_{33} \end{pmatrix}
$$

On nomme cette matrice la matrice des composantes ; elle représente sur l'horizontale l'axe normal à la facette et sur la verticale la contrainte suivant l'axe. La matrice est diagonalisable car symétrique (on a $\sigma_{ij} = \sigma_{ji}$) ; il existe un repère principal de contrainte.

Connaissant la matrice des contraintes en $P$, calculons la tension qui s'exerce sur une facette quelconque :

$$
\overline{\sigma}(P) \to \vec{T}(P, \vec{N})
$$

Sur la normale, on prend un point $Q$ voisin de $P$. À partir de $Q$, un plan normal à la normale, parallèle à la facette. On cherche à faire l'équilibre de ce tétraèdre. Soit la surface $ABC = \Sigma$, $APC = \Sigma_2 = \Sigma\alpha_2$, $APB = \Sigma_3 = \Sigma\alpha_3$ et $BPC = \Sigma_1 = \Sigma\alpha_1$. On note $\alpha_i$ le cosinus directeur de $\vec{N}$ tel que $\sum_{i=1}^{3} \alpha_i^2 = 1$. Sur ces 4 faces s'exercent des forces de contact :

- sur $ABC$ : $\vec{T}\Sigma \begin{cases} T_1\Sigma \\ T_2\Sigma \\ T_3\Sigma \end{cases}$
- sur $APC$ : $\begin{cases} \sigma_{12}\Sigma_2 \\ \sigma_{22}\Sigma_2 \\ \sigma_{32}\Sigma_2 \end{cases}$
- sur $APB$ : $\begin{cases} \sigma_{13}\Sigma_3 \\ \sigma_{23}\Sigma_3 \\ \sigma_{33}\Sigma_3 \end{cases}$
- sur $BPC$ : $\begin{cases} \sigma_{11}\Sigma_1 \\ \sigma_{21}\Sigma_1 \\ \sigma_{31}\Sigma_1 \end{cases}$

On note la condition d'équilibre :

$$
\vec{1} : T_1\Sigma = \sigma_{11} \underbrace{\Sigma_1}_{\alpha_1\Sigma} + \sigma_{12} \underbrace{\Sigma_2}_{\alpha_2\Sigma} + \sigma_{13} \underbrace{\Sigma_3}_{\alpha_3\Sigma}
$$

$$
\begin{aligned}
\vec{1} &: T_1 = \sigma_{11}\alpha_1 + \sigma_{12}\alpha_2 + \sigma_{13}\alpha_3 \\
\vec{2} &: T_2 = \sigma_{21}\alpha_1 + \sigma_{22}\alpha_2 + \sigma_{23}\alpha_3 \\
\vec{3} &: T_3 = \sigma_{31}\alpha_1 + \sigma_{32}\alpha_2 + \sigma_{33}\alpha_3
\end{aligned}
\qquad
\lbrace \vec{T} \rbrace = (\sigma_{ij}) \begin{pmatrix} \alpha_1 \\ \alpha_2 \\ \alpha_3 \end{pmatrix}
$$

$\lbrace \vec{T} \rbrace = (\sigma_{ij}) \lbrace \vec{N} \rbrace$. La tension en un point sur une facette quelconque :

$$
\vec{T}(P, \vec{N}) = \overline{\overline{\sigma}}(P)\vec{N}
$$

**Équation d'équilibre.** Un corps est soumis à des forces de volume (ex : poids, inertie) : $d\vec{\rho} = \vec{a}\rho\,dv$, et soumis à des forces de contact entre l'extérieur et l'intérieur. Calculons la résultante des forces suivant l'axe $\vec{1}$ sur les 2 facettes avant et arrière. Par continuité, $(\sigma_{11})_{AV}$, $(\sigma_{11})_{AR} = (\sigma_{11})_{AV} + \dfrac{\partial \sigma_{11}}{\partial x_1} dx_1$. La résultante est donc $\dfrac{\partial \sigma_{11}}{\partial x_1} dx_1\,dx_2\,dx_3$.

Résultante des forces (à l'équilibre) suivant $\vec{1}$, $\vec{2}$, $\vec{3}$ :

$$
\begin{cases}
\dfrac{\partial \sigma_{11}}{\partial x_1} + \dfrac{\partial \sigma_{12}}{\partial x_2} + \dfrac{\partial \sigma_{13}}{\partial x_3} + a_1\rho = 0 \\[2mm]
\dfrac{\partial \sigma_{21}}{\partial x_1} + \dfrac{\partial \sigma_{22}}{\partial x_2} + \dfrac{\partial \sigma_{23}}{\partial x_3} + a_2\rho = 0 \\[2mm]
\dfrac{\partial \sigma_{31}}{\partial x_1} + \dfrac{\partial \sigma_{32}}{\partial x_2} + \dfrac{\partial \sigma_{33}}{\partial x_3} + a_3\rho = 0
\end{cases}
$$

**La relation générale d'équilibre dans les milieux continus.**

$$
\sum_j \left(\frac{\partial \sigma_{ij}}{\partial x_j}\right) + \rho a_i = 0
\qquad
\overrightarrow{div}\ \overline{\overline{\sigma}} + \rho\vec{a} = \vec{0}
$$

## Lois de comportement - solide - fluide

Les relations entre sollicitation et déformation

$$
\overline{\overline{\sigma}} = f(\overline{\overline{\epsilon}})
\qquad
\overline{\overline{\epsilon}} = \phi(\overline{\overline{\sigma}})
$$

expriment le comportement du milieu, c'est-à-dire ses propriétés physiques. On considère un modèle de milieu continu homogène (même propriété en tout point), isotrope (même propriété dans toutes les directions) et linéaire (milieu liant par son comportement). Si le milieu est homogène et isotrope, $\epsilon$ et $\sigma$ ont les mêmes axes principaux :

$$
\overline{\overline{\sigma}} \to \begin{pmatrix} \sigma_1 & 0 & 0 \\ 0 & \sigma_2 & 0 \\ 0 & 0 & \sigma_3 \end{pmatrix} \leftrightarrow \begin{pmatrix} \epsilon_1 & 0 & 0 \\ 0 & \epsilon_2 & 0 \\ 0 & 0 & \epsilon_3 \end{pmatrix} \leftarrow \overline{\overline{\epsilon}}
$$

Le milieu est linéaire si $\sigma_i$ est fonction linéaire de $\epsilon_i$. Pour la relation de comportement d'un milieu continu, homogène, isotrope, linéaire, en repère principal, on a

$$
\sigma_i = \lambda\boxed{\theta} + 2\mu\epsilon_i + \varpi
$$

avec $\boxed{\theta} = tr(\epsilon) = \epsilon_1 + \epsilon_2 + \epsilon_3$ ; dans un repère quelconque, on a

$$
\sigma_{ij} = (\varpi + \lambda\boxed{\theta})\delta_{ij} + 2\mu\epsilon_{ij}
$$

**Cas des solides.** La forme propre est l'état naturel ; au repos, on a $\overline{\overline{\sigma}} \Rightarrow \varpi = 0$. On a donc les équations de Lamé, qui décrivent le comportement linéaire d'un solide isotrope :

$$
\sigma_i = \lambda\boxed{\theta} + 2\mu\epsilon_i
$$

$$
\sigma_{ij} = \lambda\boxed{\theta}\delta_{ij} + 2\mu\epsilon_{ij}
$$

**Cas des fluides.** Pas de forme propre, pas de déformation au repos : $\epsilon_{ij} = 0 \Rightarrow \mu = 0$, $\boxed{\theta} = 0$. Dans un repère quelconque,

$$
\sigma_{ij} = (\varpi + \lambda\boxed{\theta})\delta_{ij} + 2\mu\epsilon_{ij}
$$

$$
\sigma_{ij} = \begin{pmatrix} \varpi & 0 & 0 \\ 0 & \varpi & 0 \\ 0 & 0 & \varpi \end{pmatrix}
$$

Toutes les directions sont principales. Un fluide n'existe que s'il est soumis à une sollicitation de traction négative (compression) :

$$
\varpi = -p
\qquad
\sigma_{ij} = -p\delta_{ij}
$$

donc on a $p > 0$. Un fluide est parfait si le changement de forme ne nécessite aucun travail :

$$
\sigma_{ij} = -p\delta_{ij}
$$

> « Il faut se méfier des gens qui se disent parfaits », *Baste Jean-Stéphane*
>
> « Si les fluides étaient parfaits on ne pourrait pas vivre », *Baste Jean-Stéphane*

**Cas des fluides réels.** On prend en compte la viscosité du liquide ; un travail est nécessaire pour produire un écoulement (changement de forme) :

$$
\sigma_{ij} = -p\delta_{ij} + \text{matrice des contraintes de viscosité}
$$

$$
\sigma_{ij} = \begin{pmatrix} \sigma_{11} & \sigma_{12} & \sigma_{13} \\ \sigma_{12} & \sigma_{22} & \sigma_{23} \\ \sigma_{13} & \sigma_{23} & \sigma_{33} \end{pmatrix}
$$

> « Le mouvement d'un fluide n'est pas gratuit », *Baste Jean-Stéphane*

**Fluide newtonien, coefficient de viscosité.** Ce sont des forces qui s'opposent au mouvement du fluide : les forces de viscosité sont les forces de frottement du fluide. Ces forces de frottement font qu'en plus de la pression qui s'exerce, il y a une composante tangentielle qui s'oppose au mouvement. Les contraintes ne dépendent que de l'instant même, le fluide est isotrope et les contraintes ne dépendent que du champ des vitesses, en particulier du tenseur des vitesses de déformation

$$
d_{ij} = \frac{1}{2}\left(\frac{\partial u_i}{\partial x_j} + \frac{\partial u_j}{\partial x_i}\right)
$$

Ces 4 hypothèses conduisent au modèle de fluide newtonien :

$$
\sigma_{ij} = -p\delta_{ij} + \lambda d_{mm}\delta_{ij} + 2\mu d_{ij}
$$

où $d_{mm} = \displaystyle\sum_{m=1}^{3} \frac{\partial u_m}{\partial x_m} = div(\vec{u})$. Avec $p$, qui est le seul à être présent au repos, $d_{mm}$, qui représente la dilatation ou la contraction (coefficient de compressibilité), et le dernier terme, qui représente le gradient transversal du champ des vitesses ; $\mu$ est le coefficient de viscosité.

Calculons $\sigma_{ij}$ :

$$
\sigma_{ij} = -p\delta_{ij} + \lambda\left[\frac{\partial u_1}{\partial x_1} + \frac{\partial u_2}{\partial x_2} + \frac{\partial u_3}{\partial x_3}\right] + \mu\left[\frac{\partial u_i}{\partial x_j} + \frac{\partial u_j}{\partial x_i}\right]
$$

Les $\sigma_{12} = \mu \dfrac{\partial u_1}{\partial x_2} = \sigma_{21} = \mu k$.

$$
\mu = \frac{\text{contrainte}}{\text{gradient de vitesse}} \quad \text{en } kg.m^{-1}s^{-1}
$$

Pour un liquide, on a

$$
\mu = Ae^{\frac{B}{T}}
$$

et pour un gaz, on a

$$
\mu = \frac{A\sqrt{T}}{1 + \dfrac{B}{T}}
$$

## Introduction à la mécanique des fluides

### Statique des fluides

$$
\sigma_{ij} = -p\delta_{ij}
$$

$$
\begin{aligned}
\rho\vec{\gamma} + \overrightarrow{div}(\vec{\sigma}) &= \vec{0} \\
\rho\vec{\gamma} + \overrightarrow{div}(-p\delta_{ij}) &= \vec{0} \\
\rho\vec{\gamma} - \overrightarrow{\text{grad}}\,p &= \vec{0}
\end{aligned}
$$

**Cas particulier.** Les forces de champ dérivent d'un potentiel $u$ :

$$
\vec{\gamma} = -\overrightarrow{\text{grad}}\,u
$$

$$
\rho\,\overrightarrow{\text{grad}}\,u + \overrightarrow{\text{grad}}\,p = 0
$$
