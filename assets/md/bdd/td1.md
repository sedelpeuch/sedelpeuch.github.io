---
layout: page
hide: true
title: TD1 - Modèle conceptuel
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

Notes personnelles du [TD1 - Modèle conceptuel](https://moodle.bordeaux-inp.fr/pluginfile.php/49008/mod_resource/content/3/td1.pdf) du cours de SGBD

<style>
html {
 zoom: 0.80;
}
</style>

## Cours - élèves

### Rappel 

![entite](/assets/images/sgbd/fig2_04.png){:class="image about right"}

**Entité :** un population d'individus homogène 

**Association :** liaison significative entre entités



![cardinalite](/assets/images/sgbd/fig2_05.png){:class="image about right"}

**Cardinalités :** la cardinalité d'une patte reliant un type association et un type entité précise le nombre de fois minimal et maximal d’interventions d’une entité du type entité dans une association du type association. La cardinalité minimale doit être inférieure ou égale à la cardinalité maximale.



*Donner un schéma conceptuel d'une base de données gérant les cours et les
élèves avec les attributs suivants : numéro du cours, nom du cours, professeur
responsable du cours, numéro d'élève, nom d'élève. Commencer par mettre
professeur responsable du cours comme attribut, puis le transformer en entité.*

![eleve](/assets/images/sgbd/uml1.png){:class="image about center"}


## Voitures

*On désire créer une base de données géérant les voitures en circulation. Elle
  pourra permettre de donner les informations suivantes. À propos du
  propriétaire : n° de permis, nom prénom et adresses. À propos du véhicule :
  numéro, couleur, date d'achat, marque et type. Donner un schéma entité-association pour cette base de données* 

![voiture](/assets/images/sgbd/uml2.png){:class="image about center"}

## Facturation 

1. *Créez un modèle conceptuel qui permet de modéliser correctement le système d’information nécessaire sachant
que :
— Un client peut bien sûr recevoir plusieurs factures, mais il est uniquement considéré comme tel à partir
du moment ou il reçoit sa première facture.
— Une facture concerne un et un seul client.* 
2. *Le responsable de la facturation de la société désire rendre les factures plus informatives. Comme un client
peut acheter plusieurs articles différents en même temps, la facture devrait indiquer pour chaque article le
numéro, un libellé, le prix unitaire, la quantité vendue et le prix total pour ce type d’article.
Proposez un nouveau modèle.*

![facture1](/assets/images/sgbd/uml3.png){:class="image about left"}

![facture2](/assets/images/sgbd/uml4.png){:class="image about center"}

## Gestion de classes 

*On veut créer une base de données gérant les classes d'une école. elle sera
composée des rubriques nom, prénom, adresse, n° d'étudiant pour chaque étudiant
et identifiant pour chaque professeur : n° année, date d'inscription, professeur
responsable, matière etc. Concevoir le modèle entité association correspondant.*

![classes](/assets/images/sgbd/uml5.png){:class="image about center"}

## Gestion du personnel
