---
layout: page
hide: true
title: <i class="fas fa-search fa-2x"></i> PL - Notes TD 2 
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

## <i class="fas fa-search"></i> Exercice 1
Rappel du problème initial en forme standard

$$\begin{align*} \max z \\ sc \; \; z&= 7I+9II \\ s_1 &= 8-I-II\\ s_2&=19-2I-3II \\ s_3 &= 4-II \end{align*}$$

On choisit de faire rentrer $$II$$ en base, on peut donc annuler $$I$$ puisqu'il reste hors base. 

$$\begin{align*} s_1 &=8-II \geq 0 \\ s_2 &= 19-3II \geq 0 \\ s_3 &= 4-II \geq 0 \end{align*} \Rightarrow \begin{cases} II \leq 8 \\ II \leq 19/3 \\ II \leq 4 \end{cases}$$  On fait donc sortir $$s_3$$ de la base puis on récrit le problème dans cette nouvelle base 

$$\begin{align*} z-9II&=7I \\ s_1 + II &= 8-I \\ s_2 + 3II &=19-2I \\ s_3 + II &= 4 \end{align*}$$

On veut maintenant exprimer les variables de la base selon les variables hors base $$(s_3, I)$$. 

$$\begin{align*} z - 9(4-s_3) &= 7I \\ s_1+4-s_3 &= 8-I \\ s_2 + 3(4-s_3) &= 19-2I \\ II&=4-s_3 \end{align*}$$ $$\Rightarrow \begin{align*} z&=36-s_3+7I \\ s_1&=4-I+s_3 \\ s_2 &=7-2I+3s_3 \\ II &= 4-s_3 \end{align*}$$ 

En maximisant $$II$$ on obtient $$s_3=0$$ ainsi $$\begin{align*} s_1 &=4-I \\ s_2 &= 7-2I \\ II&=4 \end{align*} \Rightarrow \begin{cases} I \leq 4 \\ I \leq 7/2 \end{cases}$$ La prochaine étape sera donc de sortir $$s_2$$ de la base. 

$$\begin{align*} z&=\dfrac{49}{2} + \dfrac{21}{2} s_3 - 7 s_2 + 36 - 9 s_3 \\ s_1 &=4+s_3-\dfrac{7}{2}-\dfrac{3}{2}s_3+s_2 \\ I &=\dfrac{7}{2} + \dfrac{3}{2}s_3 - s_2 \\ II &= 4 -s_3 \end{align*}$$ $$\Rightarrow \begin{align*} z &= \dfrac{121}{2} - 7s_2+\dfrac{3}{2}s_3 \\ s_1 &=\dfrac{1}{2}+s_2-\dfrac{1}{2}s_3 \\ I&=\dfrac{7}{2}-s_2+\dfrac{3}{2}s_3 \\ II&=4-s_3 \end{align*}$$

On fait rentrer $$s_3$$ dans la base puisque $$\overline{c}_{s_3} > 0$$

$$\begin{align*} s_1 = \dfrac{1}{2}s_3 + \dfrac{1}{2} \geq 0 \\ I&=\dfrac{7}{2} + \dfrac{3}{2} s_3 \geq 0 \\ II &= 4 -s_3 \geq 0 \end{align*} \Rightarrow \begin{cases} s_3 \leq 1 \\ s_3 \geq -7/3 \\ s_3 \leq 4 \end{cases}$$ 

On fait donc sortir $$s_1$$ de la base. On exprime donc les variables de la base $$(I,II,s_3)$$ en fonction des variables hors base $$(s_1,s_2)$$

$$\begin{align*} z-\dfrac{3}{2}s_3&= \dfrac{121}{2}-7s_2 \\ s_1 + \dfrac{1}{2} s_3 &= \dfrac{1}{2}+s_2 \\ I-\dfrac{3}{2}s_3 &=\dfrac{7}{2}-s_2 \\ II+s_3 &= 4 \end{align*}$$ 

Et donc au final $$\begin{cases} z=62-3s_1-4s_2 \\ s_3=1-2s_1+2s_2 \\ I=5-3s_1+2s_2 \\ II=3-2s_1+2s_2 \end{cases}$$ Tous les coûts réduits sont négatif nous avons donc une solution.
