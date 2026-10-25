---
title: "Le pendule : limite du modèle harmonique"
description: "Compte rendu du TP sur le pendule pesant : équation du mouvement, vérification de la loi harmonique aux petits angles, influence de la masse et limite de l'approximation aux grands angles."
sidebar_position: 4
---

**Introduction.** Le but de ce TP est d'étudier le comportement d'un pendule. Dans un premier temps, nous étudierons le pendule dans l'approximation des petits angles et nous montrerons qu'il suit la loi harmonique. Nous allons ensuite mettre en évidence la mise en défaut de la loi harmonique lorsque le pendule est lâché à grand angle.

## Rappels théoriques utiles

Dans le référentiel galiléen, nous choisissons le repère $(O, \vec i, \vec j, \vec k)$ ; les forces qui s'appliquent sur le pendule sont le poids $\vec P$ et la résistance $\vec R$. Appliquons le principe fondamental de la dynamique au pendule :

$$
\vec P + \vec R = m\vec\gamma
$$

En projetant sur les axes nous avons

$$
\begin{cases} -R\sin(\theta) = m\ddot x \ \vec i \\ -mg + R\cos(\theta) = m\ddot y \ \vec j \end{cases}
\quad \text{or} \quad
\begin{cases} x = l\sin(\theta) \\ y = -l\cos(\theta) \end{cases}
\Rightarrow
\begin{cases} \dot x = l\dot\theta\cos(\theta) \\ \dot y = l\dot\theta\sin(\theta) \end{cases}
\Rightarrow
\begin{cases} \ddot x = l\ddot\theta\cos(\theta) - l\dot\theta^2\sin(\theta) \\ \ddot y = l\ddot\theta\sin(\theta) - l\dot\theta^2\cos(\theta) \end{cases}
$$

nous avons donc

$$
\begin{cases} -R\sin(\theta) = m\big(l\ddot\theta\cos(\theta) - l\dot\theta^2\sin(\theta)\big) \ \vec i \\ -mg + R\cos(\theta) = m\big(l\ddot\theta\sin(\theta) - l\dot\theta^2\cos(\theta)\big) \ \vec j \end{cases}
$$

Multiplions la première ligne par $\cos(\theta)$ et la seconde par $\sin(\theta)$, puis effectuons la somme membre à membre des deux équations obtenues. Nous pouvons en déduire l'équation différentielle suivante :

$$
\ddot\theta + \frac{g}{l}\sin(\theta) = 0
$$

En utilisant l'approximation des petits angles, en effet si $\theta \ll 1\ \text{rad}$, nous pouvons écrire $\sin(\theta) \sim \theta$. L'équation devient alors

$$
\ddot\theta + \frac{g}{l}\theta = 0
$$

Nous retrouvons ici l'équation d'un oscillateur harmonique en $\theta$. La période d'un tel oscillateur est

$$
T_0 = \frac{2\pi}{\omega_0} = 2\pi\sqrt{\frac{l}{g}}
$$

Dans le cas d'angles plus importants, nous effectuons un développement limité du $\sin(\theta)$. La période de cet oscillateur est alors

$$
T = \frac{2\pi}{\omega} = 2\pi\sqrt{\frac{l}{g}}\left(1 + \frac{1}{4}\sin^2\left(\frac{\theta_0}{2}\right) + \frac{9}{64}\sin^4\left(\frac{\theta_0}{2}\right) + \dots\right)
$$

## Vérification de la loi harmonique, cadre des "petits angles"

Nous nous plaçons dans le cadre de l'approximation des petits angles. L'angle initial sera donc compris entre $0^\circ$ et $20^\circ$, avec une masse de 1 kg.

### Mesure de la période d'oscillation du pendule

**a)**

| $\theta$ (en degré) | | | | | | | | | | |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $T$ (en secondes) | | | | | | | | | | |

**b)** Voir annexe.

**c)** Nous pouvons voir d'après le graphe ci-dessus que la courbe $T = f(\theta)$ est assimilable à une courbe constante pour toutes les valeurs de $\theta$. La période du pendule ne dépend donc pas de l'angle $\theta$ choisi. En effet, d'après le modèle harmonique, nous avons $T_0 = 2\pi\sqrt{\dfrac{l}{g}} = \ $ avec $l = \ \text{cm}$. Nous constatons donc que $T_0 > T_{exp}$ ; cependant les valeurs expérimentale et théorique sont très proches, nous pouvons donc conclure que la loi harmonique est vérifiée dans le cadre des petits angles. L'écart relatif entre la moyenne des valeurs expérimentales et celle théorique est de $\ \%$.

### Influence de la masse du pendule dans le modèle théorique

Le modèle théorique ne prend pas en compte les forces de frottement du pendule (ce qui peut expliquer la différence entre la valeur théorique et expérimentale vue précédemment) et la période théorique d'oscillation est indépendante de la masse $M$. Nous allons donc mettre en évidence l'influence de la masse du pendule dans l'expérience.

### Mise en évidence de l'influence de la masse du pendule dans l'expérience

**a)**

| $M$ (en gramme) | | | | |
| --- | --- | --- | --- | --- |
| $T$ (en secondes) | | | | |

**b)** Voir annexe. Nous avons vu que, depuis le modèle théorique, $T$ est indépendant de la masse, donc $T = f(m)$ est censée être représentée par une fonction constante ; mais d'après les résultats précédents et la courbe $T = f(M)$, nous remarquons que la courbe est \_\_\_\_\_\_\_\_\_\_ ; en effet la période \_\_\_\_\_\_\_\_\_\_ quand la masse $M$ augmente, donc $T$ n'est pas indépendante de la masse.

**c)** Nous pouvons remarquer que la période $T$ dans cette partie est égale à celle de la partie précédente lorsque la masse est égale à 1 kg ; lorsque la masse est inférieure, la période est inférieure. Cela nous montre que les forces de frottement n'ont pas d'influence sur des masses importantes mais qu'elles ont une influence sur les masses plus faibles (typiquement inférieures à 1 kg). Cela explique pourquoi nous avons choisi une masse de 1 kg pour vérifier la loi harmonique.

## Limite de l'approximation aux "petits angles"

### Mesure

**a)**

| $\theta$ (en degré) | | | | | | | | |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $T$ (en secondes) | | | | | | | | |
| écart relatif expérimental (en %) | | | | | | | | |
| écart relatif théorique (en %) | | | | | | | | |

**b)** Voir annexe.

### Théorie

**a)** Voir tableau précédent. Pour déterminer $T$ de manière théorique, nous utilisons la formule $T = \dfrac{2\pi}{\omega} = T_0 \times \left(1 + \frac{1}{4}\sin^2\left(\dfrac{\theta_0}{2}\right) + \dfrac{9}{64}\sin^4\left(\dfrac{\theta_0}{2}\right) + \dots\right)$ ; nous utilisons un tableur pour faire ces calculs.

**b)** Voir annexe.

### Limites d'un modèle

Nous remarquons que $T > T_0$ pour toutes les mesures. Ainsi $\dfrac{|T - T_0|}{T_0} = n\,\% \Leftrightarrow T = \dfrac{n\,\%}{100} \times T_0 + T_0$.
