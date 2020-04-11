---
layout: page
hide: true
title: <i class="fas fa-robot fa-2x"></i> Automates finis et langages - Expression régulières et théorème de Kleene
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

Cours inspiré du
[polycopié](https://moodle.bordeaux-inp.fr/pluginfile.php/31498/mod_resource/content/6/poly-if114-etd.pdf)
de [Frédéric Herbreteau](https://www.labri.fr/perso/herbrete/).

Grâce au chapitre précédent nus pouvons représenter $$x$$ par un mot,
l'algorithme par un automate fini, mais comment représenter $$\mathcal{L}$$ ?
S'il est fini, il suffit d'énumérer tous les mots qui le composent, mais que
faire quand il est infini ? 

## <i class="fas fa-robot"></i> Langages réguliers
Nous introdusions tout d'abord les opérateurs ensemblistes nécessaires à la
définition des langages réguliers. L'union, l'intersection et la complémentation
son bien évidemment définies comme pour tout autre ensemble : por tous langages
$$L_1$$ et $$L_2$$
+ $$L_1 \cup L_2 = \{\omega | \omega \in L_1 \; \text{ou} \; \omega \in L_2\}$$
  est l'**union** de $$L_1$$ et $$L_2$$
+ $$L_1 \cap L_2 = \{\omega | \omega \in L_1 \; \text{et} \; \omega \in L_2\}$$
  est l'**intersection** de $$L_1$$ et $$L_2$$
+ $$\overline{L_1}=\{\omega | \omega \in \Sigma^\ast \; \text{et} \; \omega
  \notin L_1\}$$ est le **complément** de $$L_1$$

La `concaténation` d'un langage $$L_2$$ à un langage $$L_1$$ est le langage
$$L_1 \cdot L_2 = \{\omega_1 \cdot \omega_2 | \omega_1 \in L_1 \; \text{et} \;
\omega_2 \in L_2 \}$$. 

La `fermeture de Kleene` d'un langage $$L$$ est la langage : $$L_1^\ast=\bigcup
\limits_{i \geq 0} L_1^i$$ avec $$\begin{cases} L_1^0 = \{\varepsilon\} \\ L_1^n
= L_1 \cdots L_1^{n-1} \end{cases}$$, il définit le langage des mots qui sont des
concaténations arbitraiirement longues (ie non bornées) de mots de $$L$$.

L'ensemble des `langages réguliers` sur un alphabet $$\Sigma$$ est défini par 
1. $$\emptyset$$ et $$\{\varepsilon\}$$ sont des langages réguliers
2. $$\{s\}$$ est un langage régulier, pour tout $$s \in \Sigma$$
3. si $$L_1$$ et $$L_2$$ sont des langages réguliers, alors $$L_1 \cup
   L_2$$,$$L_1 \cdot L_2$$ et $$L_1^\ast$$ sont des langes réguliers.

Si $$L_1$$ et $$L_2$$ sont deux langages réguliers, alors 
+ $$\overline{L_1} = \Sigma^\ast \backslash L_1$$, le complémentaire de $$L_1$$
  est un langage régulier
+ $$L_1 \cap L_2$$ est un langage régulier

## <i class="fas fa-robot"></i> Expressions régulières

Nous introduisons maintenant une notation algébrique des langages. 

L'ensemble des `expressions régulières` sur un alphabet $$\Sigma$$ est défini
par 
1. $$\varnothing$$, $$\epsilon$$ et $$s$$, quel que soit $$s \in \Sigma$$ sont
   des expressions régulières
2. Si $$\alpha$$ et $$\beta$$ sont deux expressions régulières, alors
   $$(\alpha + \beta)$$, $$\alpha \beta$$ et $$(\alpha)^\star$$ sont des
   expressions régulières

Il est à noter que $$\varnothing$$ diffère de $$\emptyset$$, que $$\epsilon$$
diffère de $$\varepsilon$$ et que $$()^\star$$ diffère de $$()^\ast$$. Nous
veron par la suite ce que ces notations décrivent les mêmes objets, mais dans
deux algèbres différentes : respectivement les expressions régulières et les
langages réguliers. 

Le `langage d'une epxression régulière` est défini par 
1. $$\mathcal{L}(\varnothing) = \emptyset$$ et
   $$\mathcal{L}(\epsilon)=\{\varepsilon\}$$
2. $$\mathcal{L}(s)=\{s\}$$ quel que soit $$s \in \Sigma$$
3. $$\mathcal{L}((\alpha+\beta))=\mathcal{L}(\alpha) \cup
   \mathcal{L}(\beta)$$.
4. $$\mathcal{L}(\alpha \beta)=\mathcal{L}(\alpha) \cdot \mathcal{L}(\beta)$$.
5. $$\mathcal{L}(a^\star)=(\mathcal{L}(\alpha))^\ast$$.

Quelques propriétés des expressions régulières
+ La somme est **commutative** et **associative**
+ La concaténation est **associative** mais **non commutative**
+ La concaténation est **distributive** à gauche et à droite.
+ L'expression $$\varnothing$$ est l'élément neutre pour la somme
  $$\varnothing + \alpha = \alpha = \alpha + \varnothing$$ et l'élement
  absorbant pour la concaténation $$\varnothing \alpha = \varnothing = \alpha
  \varnothing$$
+ L'expression $$\epsilon$$ est l'élément neutre pour la concaténation
  $$\epsilon \alpha = \alpha = \alpha \epsilon$$
+ Enfin l'étoile de kleen est prioritaire sur la concaténation qui est elle même
  prioritaire sur la somme
  
## <i class="fas fa-robot"></i> Théorème de Kleene

Nous montrons maintenant un lien fondamental entre els automates finis, les
langages réguliers et les expressions régulières. 

`Théoreme` Les trois proposition suivantes sont équivalentes pour tout langage
$$L$$
1. $$L$$ est accepté par un automate fini
2. $$L$$ est un langage régulier
3. $$L$$ est représentable par une expression régulière

Le théorème de Kleene est fondamental car il fait le lien entre l'algèbre (ie
les expressions régulières) et le calcul (les automates finis) unifiant ainsi
ces deux approches de la théorie des langages 

`Théorème de Kleene` Un langage est régulier si et seulement s'il est reconnu
par un automate fini

### Des langages réguliers aux expressions régulières

Nous montrons tout d'abord que les langages réguliers peuvent être représentés
par des expressions régulières.

`Lemme` Tout langage régulier est représenté par une expression régulière

`Lemme` Tout langage représenté par une expressions régulière, est un langage
régulier

Les preuves sont disponibles dans polycopié de cours page 22.

### Des expressions régulières aux automates finis

`Lemme` Pour toute expression régulière $$\alpha$$ nous pouvons calculer un
automate fini $$A$$ tel que $$\mathcal{L}(\alpha)=\mathcal{L}(A)$$. La preuve
est disponible dans le polycopié de cours page 22 à 25.

Notons qu'en corollaire de cette preuve nous avons une procédure effective pour
calculer les opérations d'union, de concaténation et de fermeture de Kleene sur
des langages réguliers, directement sur les automates qui les acceptent. Nous
remarquons en outre que les automates construits par cette procédure sont
non-déterministes puisqu'ils contiennent des transitions étiquetées
$$\varepsilon$$.

### Des automates finis aux expressions régulières

Le lemme suivant montre que pour tout automate fini, il est possible de
construire une expression régulière qui représente le langage accepté par cet
automate. 

`Lemme` Pour tout langage accepté par un automate fini $$A$$ nous pouvons
calculer une expression régulière $$\alpha$$ telle que $$\mathcal{L}(A) =
\mathcal{L}(\alpha)$$ 

La preuve est disponible dans le polycopié page 26
