---
title: "Compléments sur les suites numériques"
description: "Suites récurrentes du type u(n+1) = f(u(n)) : stabilité, monotonie, points fixes ; suites arithmétiques, géométriques, arithmético-géométriques et homographiques, avec exercices."
sidebar_position: 2
---

## Généralités sur les suites récurrentes

**Pour $u_{n+1} = f(u_n)$.** Déterminer le domaine de définition de $f$ : $D_f \subset \mathbb{R}$.

Chercher un intervalle $I \subset \mathbb{R}$ stable par $f$ (c'est-à-dire $f(I) \subset I$). Si $u_0 \in I$, on aura donc $u_1 = f(u_0) \in I$ et par récurrence $u_n \in I\ \forall n$ : la suite $(u_n)$ est bien définie.

Étudier rapidement les variations de $f$ dans $I$ :

- Si $f$ est croissante et $u_0 \leq u_1$, alors $f(u_0) \leq f(u_1)$, c'est-à-dire $u_1 \leq u_2$, et par récurrence $u_n \leq u_{n+1}$. La suite est donc croissante.
- Si $f$ est croissante et $u_0 \geq u_1$, alors $f(u_0) \geq f(u_1)$, c'est-à-dire $u_1 \geq u_2$, et par récurrence $u_n \geq u_{n+1}$. La suite est donc décroissante.
- Si $f$ est décroissante :
  - si $u_0 \leq u_1$, alors $f(u_0) \geq f(u_1)$, c'est-à-dire $u_1 \geq u_2$, etc. : $u_{2n} \leq u_{2n+1}$ et $u_{2n+1} \geq u_{2n+2}$. La suite est alternée, la suite $(u_{2n})$ est monotone car $f \circ f$ est croissante, et la suite $(u_{2n+1})$ aussi ;
  - si $u_0 \geq u_1$, alors $f(u_0) \leq f(u_1)$, c'est-à-dire $u_1 \leq u_2$, d'où $u_{2n} \geq u_{2n+1}$ et $u_{2n+1} \leq u_{2n+2}$. La suite est alternée, les sous-suites $(u_{2n})$ et $(u_{2n+1})$ sont monotones (car $f \circ f$ est croissante).
- Si $u_0$ est un point fixe de $f$ (c'est-à-dire $f(u_0) = u_0$), alors la suite est constante :
  - si $f$ est continue et $u_n$ converge, $u_n \to x$, alors $f(u_n) \to f(x)$ (continuité), ainsi $u_{n+1} \to x$ et donc $f(x) = x$ : la limite fait partie des points fixes ;
  - si $f$ est continue, chercher les points fixes peut aider à déterminer l'éventuelle limite.

## Exemples de suites récurrentes où on peut expliciter $u_n$ en fonction de $n$

**Suites arithmétiques.** C'est une suite de terme récurrent $u_{n+1} = u_n + r$ ; ainsi la suite converge si $r = 0$ et le terme général est

$$
u_n = u_0 + nr
$$

**Suites géométriques.** C'est une suite de terme récurrent $u_{n+1} = qu_n$ ; ainsi la suite a pour terme général

$$
u_n = q^n u_0
$$

La suite converge si $|q| < 1$ et est constante si $q = 1$ ou $u_0 = 0$ ; elle diverge sinon.

**Suites arithmético-géométriques.** C'est une suite de terme récurrent $u_{n+1} = au_n + b$, ainsi

$$
\begin{cases} u_1 = au_0 + b \\ u_2 = a^2u_0 + (a + 1)b \\ u_3 = a^3u_0 + (a^2 + a + 1)b \end{cases}
$$

Et donc, par récurrence, on a

$$
u_n = a^nu_0 + (a^{n-1} + a^{n-2} + \dots + a + 1)b = a^nu_0 + \frac{a^n - 1}{a - 1}b = a^n\left(u_0 + \frac{b}{a - 1}\right) - \frac{b}{a - 1}
$$

Cette suite converge si et seulement si $a^n\left(u_0 + \dfrac{b}{a - 1}\right)$ converge, c'est-à-dire si $u_0 + \dfrac{b}{a - 1} = 0$ ou si $|a| < 1$.

On peut aussi faire une étude par point fixe :

- définir la fonction $f(x) = ax + b$ et calculer le point fixe $\alpha$ : $f(\alpha) = \alpha$ ;
- définir la suite $v_n = u_n - \alpha \Leftrightarrow u_n = v_n + \alpha$ ;
- montrer que $v_n$ est géométrique ;
- déterminer $v_n$ en fonction de $n$, puis $u_n$ en fonction de $n$.

**Suites récurrentes homographiques.** C'est une suite de terme récurrent $u_{n+1} = \dfrac{au_n + b}{cu_n + d} = f(u_n)$ où $f(x) = \dfrac{ax + b}{cx + d}$ avec $c \neq 0$ (sinon suite arithmético-géométrique).

$$
\begin{aligned}
y = f(x) \Leftrightarrow y = \frac{ax + b}{cx + d} &\Leftrightarrow ycx + dy = ax + b \\
&\Leftrightarrow (a - cy)x = dy - b \Leftrightarrow x = \frac{dy - b}{-cy + a} = f^{-1}(y) \\
&\Leftrightarrow D_f = \{x \in \mathbb{R} : cx + d \neq 0\} = \mathbb{R} \setminus \left\{-\frac{d}{c}\right\} \\
&\Leftrightarrow D_{f^{-1}} = \{y \in \mathbb{R} : -cy + a \neq 0\} = \mathbb{R} \setminus \left\{\frac{a}{c}\right\}
\end{aligned}
$$

donc $f$ est une bijection de $\mathbb{R} \setminus \left\{-\dfrac{d}{c}\right\}$ sur $\mathbb{R} \setminus \left\{\dfrac{a}{c}\right\}$.

La suite $(u_n)$ est bien définie si $u_0 \in D_f$ et $\forall n, f \circ f \circ \dots \circ f(u_0) \in D_f$.

On va expliciter $u_n$ en fonction de $n$.

- Si $f(u_0) = u_0$, par récurrence $u_n = u_0$ : la suite est donc une suite constante.
- Si $f(u_n) = u_n$ pour un certain $n \geq 1$, alors pour ce $n$, $f(u_{n-1}) = u_n = f(u_n) \Rightarrow u_n = u_{n-1}$ car $f$ est injective. Donc $u_n = u_{n-1} = \dots = u_0$. En effet, $u_n = f(u_{n-1})$ et $u_n = u_{n-1}$, donc $f(u_{n-1}) = u_{n-1}$. Donc $u_1 = u_0$, c'est-à-dire $f(u_0) = u_0$, et on est ramené au cas où $f(u_0) = u_0$ : la suite est constante.

Conclusion : si la suite passe par un point fixe de $f$, alors elle est constante.

S'il n'y a pas de point fixe, alors $f(x) = x \Leftrightarrow \dfrac{ax + b}{cx + d} = x \Leftrightarrow cx^2 + (d - a)x - b = 0$.

**Si $\Delta > 0$**, l'équation a deux racines réelles $l_1 \neq l_2$. Si on pose $v_n = \dfrac{u_n - l_1}{u_n - l_2}$ (qui est bien définie car par hypothèse $u_n$ n'est jamais égal au point fixe $l_2$), alors la suite $(v_n)$ est géométrique et $v_{n+1} = qv_n$.

*Démonstration.*

$$
v_{n+1} = \frac{u_{n+1} - l_1}{u_{n+1} - l_2} = \frac{\dfrac{au_n + b}{cu_n + d} - l_1}{\dfrac{au_n + b}{cu_n + d} - l_2} = \frac{(a - cl_1)u_n + b - dl_1}{(a - cl_2)u_n + b - dl_2}
$$

Mais $f(l_1) = l_1$, donc $l_1 = f^{-1}(l_1) = \dfrac{dl_1 - b}{-cl_1 + a}$.

Donc $b - dl_1 = (cl_1 - a)l_1$ et $b - dl_2 = (cl_2 - a)l_2$. Donc

$$
v_{n+1} = \frac{(a - cl_1)u_n - (a - cl_1)l_1}{(a - cl_2)u_n - (a - cl_2)l_2} = \frac{a - cl_1}{a - cl_2}.\frac{u_n - l_1}{u_n - l_2} = qv_n \quad \text{où } q = \frac{a - cl_1}{a - cl_2}
$$

C'est donc une suite géométrique, et donc si $u_n$ converge alors $v_n$ converge, et si $v_n$ converge alors $u_n$ converge. $\square$

**Si $\Delta = 0$**, c'est-à-dire $(d - a)^2 = -4bc$, l'équation $cx^2 + (d - a)x - b = 0$ possède une racine réelle double $l = -\dfrac{d - a}{2c} = \dfrac{a - d}{2c}$. Si on pose $v_n = \dfrac{1}{u_n - l}$, la suite $(v_n)$ est arithmétique : $v_{n+1} = v_n + r$ où $r = r(a, b, c)$.

*Démonstration.*

$$
v_{n+1} = \frac{1}{u_{n+1} - l} = \frac{1}{\dfrac{au_n + b}{cu_n + d} - l} = \frac{cu_n + d}{au_n + b - clu_n - dl} = \frac{cu_n + d}{(a - cl)u_n + b - dl}
$$

mais $l = f(l) \Leftrightarrow f^{-1}(l) = l \Leftrightarrow \dfrac{dl - b}{a - cl} = l \Leftrightarrow b - dl = (cl - a)l$. Donc

$$
v_{n+1} = \frac{cu_n + d}{(a - cl)(u_n - l)} = \frac{c(u_n - l) + cl + d}{(a - cl)(u_n - l)} = \frac{c}{a - cl} + \frac{cl + d}{a - cl}\frac{1}{u_n - l}
$$

Mais

$$
\frac{cl + d}{a - cl} = \frac{\dfrac{a - d}{2} + d}{a - \dfrac{a - d}{2}} = 1 \quad \text{car } l = \frac{a - d}{2c}
$$

On a donc

$$
v_n = v_0 + nr = \frac{1}{u_0 - l} + nr
$$

d'où $u_n = \dfrac{1}{v_n} + l = \dfrac{1}{\dfrac{1}{u_0 - l} + nr} + l$ avec $r = \dfrac{2c}{a + d} \neq 0$ (puisque $c \neq 0$), donc $u_n \to l$. $\square$

**Si $\Delta < 0$**, c'est-à-dire qu'il y a deux racines complexes conjuguées $l_1, l_2 = \overline{l_1}$, on procède comme dans le cas où $\Delta > 0$.

*Démonstration.* On voit que $v_n = \dfrac{u_n - l_1}{u_n - l_2}$ définit une suite géométrique (complexe) de raison $q = \dfrac{a - cl_1}{a - cl_2} = \dfrac{a - cl_1}{a - c\overline{l_1}}$, donc $|q| = \dfrac{|a - cl_1|}{|a - c\overline{l_1}|} = 1$.

On a donc (dans $\mathbb{C}$) : $v_n = q^nv_0$, $u_n = \dfrac{l_2v_n - l_1}{v_n - 1} = \dfrac{\overline{l_1}q^nv_0 - l_1}{q^nv_0 - 1}$.

Si $u_n$ convergeait, ce serait vers un réel, donc pas vers $l_1$ ou $l_2$ (non réels) ; donc $\dfrac{u_n - l_1}{u_n - l_2}$ converge vers $z = \dfrac{\lim u_n - l_1}{\lim u_n - l_2} \neq 0$, et donc $v_n = q^nv_0$ converge vers une limite différente de 0. Donc on aurait $v_0 \neq 0$ et $(q^n)$ convergente, mais si… $\square$

Donc $(u_n)$ diverge.

Attention aux exemples dégénérés : bien faire l'étude générale de la première section.

## Exercices

$$
u_{n+1} = \frac{u_n + 2}{2u_n + 1}
$$

Soit $f(x) = \dfrac{x + 2}{2x + 1}$ sur son intervalle de définition $D_f = \mathbb{R} \setminus \{-1/2\}$. On cherche les points fixes : $f(x) = x \Leftrightarrow \dfrac{x + 2}{2x + 1} = x \Leftrightarrow 2x^2 = 2 \Leftrightarrow x = \pm 1$.

Ainsi

$$
v_n = \frac{u_n - 1}{u_n + 1} \Leftrightarrow v_{n+1} = \frac{\dfrac{u_n + 2}{2u_n + 1} - 1}{\dfrac{u_n + 2}{2u_n + 1} + 1} = -\frac{1}{3}\frac{u_n - 1}{u_n + 1} = qv_n \quad \text{où } q = -\frac{1}{3}
$$

Donc $v_n = \left(-\dfrac{1}{3}\right)^nv_0 = \left(-\dfrac{1}{3}\right)^n\dfrac{u_0 - 1}{u_0 + 1}$.

On peut donc retrouver une expression explicite de $u_n$ en fonction de $n$, et on obtient $u_n \to 1$.

$$
u_{n+1} = \frac{-1}{u_n + 2}
$$

Soit $f(x) = \dfrac{-1}{x + 2}$ ; on cherche les points fixes $f(x) = x$, on obtient donc l'équation $x^2 + 2x + 1 = 0$, et donc $\Delta = 0$.

Posons $v_n = \dfrac{1}{u_n + 1}$, alors $v_{n+1} = \dfrac{1}{1 - \dfrac{1}{u_n + 2}} = \dfrac{u_n + 2}{u_n + 1} = 1 + \dfrac{1}{u_n + 1} = v_n + 1$.

D'où $v_n = v_0 + n$ et donc $u_n = \dfrac{1}{v_n} - 1 = \dfrac{1}{\dfrac{1}{u_0 + 1} + n} - 1 \to -1$.

$$
u_{n+1} = -\frac{1}{u_n}
$$

Donc $f(x) = -\dfrac{1}{x}$, $D_f = \mathbb{R} \setminus \{0\}$. $f$ n'est continue sur aucun intervalle stable de $\mathbb{R} \setminus \{0\}$ car si $u_0 > 0$, $f(u_0) < 0$, et si $u_0 < 0$, $f(u_0) > 0$.

Si $u_0 \in I$, $u_1 = f(u_0) \in I$, or $u_0, u_1$ sont de part et d'autre de 0. Donc $0 \in I$, ce qui est absurde puisque $0 \notin D_f$. Donc a priori rien ne garantit que $u_n$ converge vers un point fixe (si elle converge). D'ailleurs ici il n'y a pas de points fixes.

Ici $a = 0, b = -1, c = 1, d = 0$, donc $a + d = 0$ et $r = \dfrac{2c}{a + d}$ n'est pas définie : la recette "générale" ne s'applique pas. $u_1 = -\dfrac{1}{u_0}$ et $u_2 = -\dfrac{1}{u_1} = u_0$ ; par récurrence on a $u_{2n} = u_0$, $u_{2n+1} = u_1$ : la suite ne converge pas.
