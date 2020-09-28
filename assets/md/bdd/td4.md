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

## Entrainement sur les DF

Soit les attributs suivants : n° client, nom client, adresse client, n° article,
nom article , prix, n° commande, date commande, quantité commandée.

|                                               | DF   | Elementaire | Directe |
| :--                                           | :--: | :--:        | :--:    |
| nom client -> adresse client                  | x    |             |         |
| n° client -> adresse client                   | o    | o           | o       |
| n° commande, n° client -> quantité commandée  | x    |             |         |
| n° commande, n° article -> prix article       | o    | x           | o       |
| n° commande, n° article -> quantité commandée | o    | o           | o       |
| n° commande -> date commande                  | o    | o           | o       |
| n° commande -> nom client                     | o    | o           | x       |
| n° commande -> nom article                    | x    |             |         |

## Fermeture transitive 

*On considère la relation $$R$$  construite sur les attributs suivants :
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

+ *Donner l'ensemble des dépendances fonctionnelles engendrées par $$E$$ (par
   transitivité)*
   
```
occupant -> propriétaire
occupant -> nb_piècs
(adresse, n° appartement) -> nbr_personnes
```
   
+ *Quelles sont les clés potentielles de $$R$$ ?*

Les clés potentielles vont être `(adresse, n° appartement)` et `occupant`

## Factures 

*Soit une société de publicité dont les clients règlent des factures pour des
services rendus. La société a plusieurs agences. Le schéma de la base est réduit
à une seule relation de schéma : `Factures (Numéro_Client, Nom, Prénom, Numéro_facture, Service, Montant,
Agence)` où `Numéro_Client, Numéro_Facture, Nom, Prénom, Montant`, désignent
respectivement les numéros de client de facture, les noms et prénoms des clients
et le coût de chaque service. L'ensemble de dépendances fonctionnelles est le
suivant :* 
```
Numéro_Client -> Nom
Numéro_Client -> Prénom
Numéro_Facture -> Service
Numéro_Facture -> Numéro_client
Service -> MontanT
```

+ *Donner la clé*

`(Numéro_Facture, Agence)`

+ *Donner une décomposition de Factures sans perte d'information et qui préserve
  les dépendances, le résultat étant un ensemble de relaitons en 3eme forme
  normale.*
  
![17](/assets/images/sgbd/uml17.png){:class="image about center"}
  
+ *Donner une nouvelle décomposition dans le cas où on rajoute la dépendance
  suivante `Numéro_Client->agence`*

![18](/assets/images/sgbd/uml18.png){:class="image about center"}

## Système de gestion de fichiers 

*On considère un système d'exploitation dans lequel chaque fichier a un index
(inode) I, une taille T, un type Ty, un propriétaire P et un repertoire D dans
lequel on peut le trouver. On considère une relation R dont les attributs sont
I,T,Ty,P et D*

+ *Cette relation est elle en troisième forme normale ? Quelle est sa (ou ses)
  clé(s) ?*
  
  `R(I,T,Ty,P,D)`, la relation est en 3FN et sa clé est `I`
  
+ *On suppose maintenant que le système d'exploitation autorise au même fichier
  à figure dans plusieurs répertoires et à avoir plusieurs propriétaires. La
  relation R est elle alors en 3 ième forme normale ? Sinon, proposer une
  décomposition minimale en relation en 3ième forme normale.*
  
  ```
  F(I,T,Ty)
  P(P)
  D(D)
  FP(#I,#P)
  FD(#I,#D)
  ```
  
  
