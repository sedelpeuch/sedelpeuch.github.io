---
layout: page
hide: true
title: <i class="fas fa-robot fa-2x"></i> Automates finis et application - TD1 
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

## <i class="fas fa-robot"></i> Langages et automates finis

Les exercices 1 à 3 sont autocorrigés par le dessin de l'automate

### Exercice 4 

> Ecrire un algorithme qui indique si un automate fini détermininste et complet
> $$A=(Q,\Sigma,\delta,q_0,F)$$ accepte un mot $$\omega \in \Sigma*$$

Formellement soit $$\omega = \omega_1 , ... , \omega_k$$ un mot ($$\omega_i$$
est la ième lettre du mot) et $$A=(Q,\Sigma,\delta,q_0,F)$$ un automate, on veut
décider si $$\omega$$ est accepté par $$A$$. Soit $$X_i$$ l'ensemble des états
que l'on peut atteindre en ayant lu $$\omega_1,\omega_2,...,\omega_i$$

```
X_0 = q_0
pour i de 1 à k
    X_i != 0
    pour tout p dans X_{i-1}
        pour tout q tel que (p,w_i,q) est dans E
            X_i=X_i u {q}
pour tout p dans X_k
    si p est dans F
        retourner Vrai
retourner Faux
```

### <i class="fas fa-robot"></i> Jeu des portes bascules 
Les parties gagnantes avec trois billes AAB, ABB, BAB, BBB. 

Table de transition de l'automates

|       | A     | B     |
| :---: | :---: | :---: |
| 000a  | 100r  | 011r  |
| 000a  | 100r  | 011r  |
| 001a  | 101r  | 011r  |
| 010r  | 110r  | 000a  |
| 010a  | 110r  | 001a  |
| 100r  | 010r  | 111r  |
| 100a  | 010r  | 111r  |
| 101r  | 011r  | 100a  |
| 101a  | 011r  | 100a  |
| 110r  | 000a  | 101a  |
| 110a  | 000a  | 101a  |
| 111r  | 001a  | 110a  |

![2](/assets/images/automates/2.png){:class="image featured"}

## Exercie 1 à 3

![1.1] ![1.2]

![1.3] ![2.1]

![2.2] ![3.1]

![3.2] ![3.3]



[1.1]:/assets/images/automates/1.1.1.png
{:class="image about left"}
[1.2]:/assets/images/automates/1.1.2.png
{:class="image about right"}
[1.3]:/assets/images/automates/1.1.3.png
{:class="image about left"}
[2.1]:/assets/images/automates/1.2.1.png
{:class="image about right"}
[2.2]:/assets/images/automates/1.2.2.png
{:class="image about left"}
[3.1]:/assets/images/automates/1.3.1.png
{:class="image about right"}
[3.2]:/assets/images/automates/1.3.2.png
{:class="image about left"}
[3.3]:/assets/images/automates/1.3.3.png
{:class="image about right"}

