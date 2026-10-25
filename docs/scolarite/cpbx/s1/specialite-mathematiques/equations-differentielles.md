---
title: "Compléments sur les équations différentielles linéaires"
description: "Équations de Bernoulli et de Riccati, équations différentielles linéaires d'ordre 2 à coefficients constants, méthode de variation des constantes et formules de Cramer, avec exemples résolus."
sidebar_position: 1
---

## Équations différentielles linéaires du premier ordre

### Un type d'équation différentielle se ramenant au cas linéaire : les équations de Bernoulli

Équation différentielle de la forme

$$
y' + a(x)y = b(x).y^m
$$

où $m \in \mathbb{R} \setminus \{0, 1\}$ et où $a$ et $b$ sont deux fonctions définies et continues sur un intervalle $U$ de $\mathbb{R}$.

Valable sur tout sous-intervalle $V$ de $U$ tel que $\forall x \in V, y^m(x) \neq 0$. Diviser les deux membres par $y^m$ et faire le changement de fonction inconnue $z = \dfrac{1}{y^{m-1}} = y^{1-m}$ en remarquant qu'alors $z' = (1-m).\dfrac{y'}{y^m}$.

L'équation différentielle en $z$ alors obtenue est linéaire. Après résolution, ne pas oublier d'exprimer $y(x)$ et de ne pas s'arrêter à $z(x)$.

**Exemple.** $-8xy' - y = xy^3$ sur $\mathbb{R}^+$ : on se ramène à une équation de la forme

$$
y' + \frac{1}{8x}y = -\frac{1}{8}y^3
$$

On a donc $\dfrac{y'}{y^3} + \dfrac{1}{8x}\dfrac{1}{y^2} = -\dfrac{1}{8}$ (là où $y \neq 0$). On pose $z = \dfrac{1}{y^2}$, donc $z' = \dfrac{-2y'}{y^3}$, ainsi $-\dfrac{1}{2}z' + \dfrac{1}{8x}z = -\dfrac{1}{8}$. En réduisant les coefficients, il vient $z' - \dfrac{1}{4x}z = \dfrac{1}{4}$.

La solution homogène est $z(x) = Cx^{\frac{1}{4}}$ et la solution particulière est $z(x) = \lambda x$ ; on cherche $\lambda$ tel que $\lambda - \dfrac{1}{4x}\lambda x = \dfrac{1}{4} \Rightarrow \lambda = \dfrac{1}{3}$. Donc $z(x) = \dfrac{1}{3}x + C.x^{\frac{1}{4}}$, finalement

$$
y(x) = \pm\left(\frac{1}{3}x + Cx^{\frac{1}{4}}\right)^{-\frac{1}{2}} \text{ sur } \mathbb{R}^+
$$

Il y a donc deux familles de solutions, l'une positive et l'autre négative.

## Équation de Riccati

Équation différentielle de la forme

$$
y'(x) = a(x)y(x)^2 + b(x)y(x) + c(x)
$$

(on nomme $R$ cette équation) où $a, b, c$ sont continues sur un intervalle $I$ de $\mathbb{R}$. On cherche $y$ dérivable (donc de classe $C^1$ puisqu'alors le membre de droite est continu).

Supposons qu'on ait trouvé une solution particulière $y_0$. Posons $y = y_0 + z$, alors l'équation $R$ devient :

$$
y' = y_0' + z' = a(y_0 + z)^2 + b(y_0 + z) + c = ay_0^2 + by_0 + c + (2ay_0 + b)z + az^2
$$

D'où $z' - (2ay_0 + b)z = az^2$.

On résout et on trouve $z$ ; on obtient $y = y_0 + z$, qui est la solution générale de $R$.

**Remarque.** Les équations de Riccati se ramènent à des équations de Bernoulli (exemple en chimie cinétique).

## Équations différentielles linéaires d'ordre 2

Équation différentielle de la forme

$$
y''(x) + a(x)y'(x) + b(x)y(x) = c(x)
$$

que l'on note $(E)$, où $a, b$ sont des constantes et $c$ une fonction continue.

Soit l'équation homogène $(H) : y'' + ay' + by = 0$ ; on lui associe son équation caractéristique $r^2 + ar + b = 0$. Donc $r = \dfrac{-a \pm \delta}{2}$ où $\delta$ est une racine carrée du discriminant $\Delta$.

**Si $r_- \neq r_+$.** La solution de $H$ est de la forme :

$$
y_0(x) = C_- e^{r_- x} + C_+ e^{r_+ x}
$$

**Si $\Delta = 0$.** Alors $r_+ = r_- = r$ et la solution de $H$ est de la forme :

$$
y_0(x) = C_1 e^{rx} + C_2 x e^{rx}
$$

On admet qu'on a là toutes les solutions, mais vérifions que ce sont bien des solutions :

- **Si $\Delta \neq 0$.** Comme $H$ est linéaire, il suffit de vérifier que $e^{r_\pm x}$ est solution. On a $(e^{r_\pm x})'' + a(e^{r_\pm x})' + b(e^{r_\pm x}) = (r_\pm^2 + ar_\pm + b)e^{r_\pm x} = 0$.
- **Si $\Delta = 0$.** Alors $e^{rx}$ est encore solution et $(xe^{rx})'' + a(xe^{rx})' + b(xe^{rx}) = (e^{rx} + xre^{rx})' + a(e^{rx} + xre^{rx}) + bxe^{rx} = ((r + r + xr^2) + a(1 + xr) + bx)e^{rx} = [x(r^2 + ar + b) + (2r + a)]e^{rx}$, et $2r + a$ est la valeur en $x = r$ de $2x + a = (x^2 + ax + b)'$.

Pour résoudre l'équation particulière, on utilise la méthode de Lagrange par variation de la constante. Notons $y_1(x) = e^{r_- x}$, $y_2(x) = e^{r_+ x}$ si $\Delta \neq 0$ et $y_2(x) = xe^{rx}$ si $\Delta = 0$.

Ainsi la solution de $H$ est $y_0 = C_1y_1 + C_2y_2$. On cherche la solution générale de $E$ ; on injecte alors $H$ dans $E$ :

$$
\begin{aligned}
&(C_1y_1 + C_2y_2)'' + a(C_1y_1 + C_2y_2)' + b(C_1y_1 + C_2y_2) = c(x) \\
\Leftrightarrow\ &(C_1''y_1 + 2C_1'y_1' + C_1y_1'' + C_2''y_2 + 2C_2'y_2' + C_2y_2'') + a(C_1'y_1 + C_1y_1' + C_2'y_2 + C_2y_2') + b(C_1y_1 + C_2y_2) = c \\
\Leftrightarrow\ &C_1''y_1 + 2C_1'y_1' + C_2''y_2 + 2C_2'y_2' + a(C_1'y_1 + C_2'y_2) = c
\end{aligned}
$$

On cherche donc $C_1, C_2$ tels que $C_1'y_1 + C_2'y_2 = 0$. Du coup $(C_1'y_1 + C_2'y_2)' = 0 \Leftrightarrow C_1''y_1 + C_2''y_2 + C_1'y_1' + C_2'y_2' = 0$.

Donc $C_1''y_1 + C_1'y_1' + C_2''y_2 + C_2'y_2' = c$ et donc $C_1'y_1 + C_2'y_2 = 0$. On se ramène donc au système suivant :

$$
\begin{cases} C_1'y_1 + C_2'y_2 = 0 \\ C_1'y_1' + C_2'y_2' = c \end{cases}
$$

Pour les équations du premier ordre $y' + ay = c$, la variation de la constante $C$ donnait la condition $C'y_0 = c$.

**Formules de Cramer.** Pour résoudre un système de deux équations linéaires à deux inconnues du type $\begin{cases} ax + by = u \\ cx + dy = v \end{cases}$, on regarde le déterminant du système $ad - bc$. Si le déterminant est non nul, alors le système a une unique solution (s'il est nul, alors il en a une infinité ou 0). L'unique solution est donnée par les formules de Cramer :

$$
x = \frac{\begin{vmatrix} u & b \\ v & d \end{vmatrix}}{ad - bc}
\qquad
y = \frac{\begin{vmatrix} a & u \\ c & v \end{vmatrix}}{ad - bc}
$$

Revenons à notre système $\begin{cases} C_1'y_1 + C_2'y_2 = 0 \\ C_1'y_1' + C_2'y_2' = c \end{cases}$. Le déterminant est $(r_+ - r_-)e^{r_- x + r_+ x} \neq 0$ si $\Delta \neq 0$, et $e^{2rx} \neq 0$ si $\Delta = 0$. Il y a donc une unique solution, donnée par $C_1' = \dfrac{-cy_2}{y_1y_2' - y_2y_1'}$ et $C_2' = \dfrac{cy_1}{y_1y_2' - y_2y_1'}$. Il n'y a plus qu'à intégrer pour trouver $C_1$ et $C_2$.

**Exemple.** Soit l'équation $y'' - 2y' + 2y = \dfrac{e^x}{\cos^2(x)}$, $x \in \left]-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right[$.

Résolvons l'équation homogène $y'' - 2y' + 2y = 0$ ; établissons l'équation caractéristique $r^2 - 2r + 2 = 0$. On a donc $\Delta = -4$ et donc $r_\pm = 1 \pm i$.

La solution est une combinaison linéaire de $e^{(1+i)x}$ et $e^{(1-i)x}$, c'est-à-dire

$$
\begin{aligned}
y &= \lambda_1 e^x e^{ix} + \lambda_2 e^x e^{-ix} = e^x(\lambda_1 e^{ix} + \lambda_2 e^{-ix}) \\
&= e^x(\lambda_1(\cos(x) + i\sin(x)) + \lambda_2(\cos(x) - i\sin(x))) = C_1e^x\cos(x) + C_2e^x\sin(x)
\end{aligned}
$$

avec $C_1, C_2$ quelconques car

$$
\begin{cases} C_1 = \lambda_1 + \lambda_2 \\ C_2 = i(\lambda_1 - \lambda_2) \end{cases}
\Leftrightarrow
\begin{cases} \lambda_1 = \frac{1}{2}(C_1 - iC_2) \\ \lambda_2 = \frac{1}{2}(C_1 + iC_2) \end{cases}
$$

La solution de $H$ est donc

$$
y_0 = C_1e^x\cos(x) + C_2e^x\sin(x)
$$

Pour $E$, on cherche

$$
y(x) = C_1(x).e^x\cos(x) + C_2(x)e^x\sin(x)
$$

On sait que $C_1', C_2'$ sont donnés par

$$
\begin{aligned}
&\begin{cases} C_1'y_1 + C_2'y_2 = 0 \\ C_1'y_1' + C_2'y_2' = \dfrac{e^x}{\cos(x)^2} \end{cases} \\
\Leftrightarrow\ &\begin{cases} C_1'e^x\cos(x) + C_2'e^x\sin(x) = 0 \\ C_1'(e^x\cos(x) - e^x\sin(x)) + C_2'(e^x\sin(x) + e^x\cos(x)) = \dfrac{e^x}{\cos(x)^2} \end{cases} \\
\Leftrightarrow\ &\begin{cases} C_1'\cos(x) + C_2'\sin(x) = 0 \\ -C_1'\sin(x) + C_2'\cos(x) = \dfrac{1}{\cos(x)^2} \end{cases}
\end{aligned}
$$

En utilisant les formules de Cramer, on a $\cos(x) \times \cos(x) + \sin(x) \times \sin(x) = 1$, donc

$$
C_1' = -\frac{\sin(x)}{\cos^2(x)} \Rightarrow C_1(x) = -\frac{1}{\cos(x)}
$$

$$
C_2' = \frac{\cos(x)}{\cos(x)^2} \Rightarrow C_2 = -\frac{1}{2}\big(\ln(1 - \sin(x)) - \ln(1 + \sin(x))\big)
$$
