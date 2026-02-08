---
title: <i class="fas fa-server fa-2x"></i> Introduction aux réseaux - TD1
---

## Exercice 1

On considère le transfert d'un fichier de 1 Mo entre deux stations

* Temps de propagation : calculé avec la vitesse de propagation dans le câble
  (le signal se propage et prend un certain temps pour arriver)
* Temps d'émission d'une trame : en lien avec le débit de transmission et
  proportionnel à la taille de la trame
* Acquittement = accusé de réception, générallement un signal positif
* Débit utile : combien de données réelles ont été transmises pendant un
  intervalle de temps

Attention aux unités bits/octes. On note F la taille du fichier

1. Réseau en étoile :

* propagation $T_p = \text{distance}/\text{vitesse} = D/V = 0.1ms$
* émission : $T_e = \text{longueur trame}/\text{débit} = F/C = 125 s$
* débit : $D_u = \text{taille}/\text{temps}=64 Kbits/s$

2. Réseau en bus : On divise le fichier global en trames, composées de $O=80
   bits$ d'overhead et $L$ bits de données utiles. Une fois la trame reçue,
   l'autre machine renvoie une trame d'acquittement $(A=88 bits)$.

* émission : $T_e = (L+O)/C$
* propagation : $T_p = D/V$
* acquittement : $T_{ack}=A/C$
* $T_{\text{trame}}=T_e + T_p + T_{ack} + T_p = T_e + T_{ack} + 2T_p$.
* nombre de trames : $n=ceil(F/L)$
* $T_tot = n.T_{\text{trame}}$.
* $D_u = F/T_{tot} = L/T_{\text{trame}}$.

3. Réseau en anneau : Pour l'acquittement, on renvoie la trame en modifiant 1
   bit spécifique. Chaque répéteur introduit un retard de 1 temps-bit. Il faudra
   considérer 2 $T_p$ car la trame va de l'émetteur au récepteur, puis du
   récepteur à l'émetteur

* émission : $T_e = L/C$
* propagation : $T_p = D/V$
* retard : $T_{\text{retard}} = N * t_{bit} = N/C$
* $T_{\text{trame}} = T_e + T_p$.
* $T_{\text{aller}}=T_{\text{retour}}= T_e + T_p + T_{\text{retard}}/2$.
* Temps total pour la transmission d'une trame
  $T_{\text{tot}_\text{trame}}=2(T_e +T_p)+T_{\text{retard}}$.
* $T_{tot}=ceil(F/(L-O))*T_{\text{tot}_\text{retard}}$.
* $D_u = F/T_{tot}$.

## Exercice 2

1. Il faut que $T_e > RTT$ c'est à dire $L/C > 2D/V$ et donc $L > 2 D
   \dfrac{C}{V}=500 bits$
2. $L=2C\dfrac{D}{V}$ Soit on divise la distance par 10, soit on multiplie la
   longueur de la trame par 10
