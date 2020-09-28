---
layout: page
hide: true
title: TD3 - Modèle relationnel
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

Notes personnelles du [TD3 - Modèle relationnel](https://moodle.bordeaux-inp.fr/pluginfile.php/49010/mod_resource/content/2/td3.pdf) du cours de SGBD

<style>
html {
 zoom: 0.80;
}
</style>


## Fermeture transitive 

*On considère la relation $$R$$  construire sur les attributs suivants :
(propriétaire, occupant, adresse, num apartement, nbr pièces, nbr personnes).
ainsi que le nuplet $$(p,o,a,n,nb1,nb2)$$ ayant la signification suivante : La
persone $$o$$ habite avec $$nb2$$ personnes dans l'appartement de numéro $$n$$
ayant $$nb1$$ pièces dont le propriétaire est $$p$$. Une analyse de cette
relation fournit un ensemble initial $$E$$ de dépendances fonctionnelles :*

```
occupant -> adresse
occupant -> num_appartement 
occupant -> nbr_personnes
[adresse, num_appartement] -> propriétaire
[adresse, num_appartement] -> occupant 
[adresse, num_appartement] -> nbr_pièces
```

1. *Donner l'ensemble des dépendances fonctionnelles engendrées par $$E$$ (par
   transitivité)*
2. *Quelles sont les clés potentielles de $$R$$ ?*

