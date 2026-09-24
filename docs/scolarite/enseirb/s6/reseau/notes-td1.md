---
title: Introduction aux réseaux - TD1
description: "Calculs de temps d'émission, de propagation et de débit utile pour des réseaux en étoile, en bus et en anneau, et taille minimale de trame."
---

## Exercice 1

On considère le transfert d'un fichier de 1 Mo entre deux stations

* Temps de propagation : calculé avec la vitesse de propagation dans le câble
  (le signal se propage et prend un certain temps pour arriver)
* Temps d'émission d'une trame : en lien avec le débit de transmission et
  proportionnel à la taille de la trame
* Acquittement = accusé de réception, généralement un signal positif
* Débit utile : combien de données réelles ont été transmises pendant un
  intervalle de temps

Attention aux unités bits/octets. On note $F$ la taille du fichier ($F = 1$ Mo $= 8 \times 10^6$ bits).

1. Réseau en étoile :

* propagation : $T_p = \text{distance}/\text{vitesse} = D/V = 0{,}1 \text{ ms}$
* émission : $T_e = \text{longueur trame}/\text{débit} = F/C = 125 \text{ s}$
* débit utile : $D_u = \text{taille}/\text{temps} \approx 64 \text{ kbit/s}$ (le temps de propagation est négligeable devant $T_e$)

2. Réseau en bus : On divise le fichier global en trames, composées de $O=80$
   bits d'en-tête (overhead) et de $L$ bits de données utiles. Une fois la trame reçue,
   l'autre machine renvoie une trame d'acquittement ($A=88$ bits).

* émission : $T_e = (L+O)/C$
* propagation : $T_p = D/V$
* acquittement : $T_{ack}=A/C$
* $T_{\text{trame}}=T_e + T_p + T_{ack} + T_p = T_e + T_{ack} + 2T_p$.
* nombre de trames : $n=\lceil F/L \rceil$
* $T_{tot} = n \cdot T_{\text{trame}}$.
* $D_u = F/T_{tot} \approx L/T_{\text{trame}}$.

3. Réseau en anneau : Pour l'acquittement, on renvoie la trame en modifiant 1
   bit spécifique. Chaque répéteur introduit un retard de 1 temps-bit. Il faudra
   considérer 2 $T_p$ car la trame va de l'émetteur au récepteur, puis du
   récepteur à l'émetteur.

* émission : $T_e = L/C$
* propagation : $T_p = D/V$
* retard ($N$ répéteurs) : $T_{\text{retard}} = N \times t_{bit} = N/C$
* $T_{\text{trame}} = T_e + T_p$.
* $T_{\text{aller}}=T_{\text{retour}}= T_e + T_p + T_{\text{retard}}/2$.
* Temps total pour la transmission d'une trame
  $T_{\text{tot}_\text{trame}}=2(T_e +T_p)+T_{\text{retard}}$.
* $T_{tot}=\lceil F/(L-O) \rceil \times T_{\text{tot}_\text{trame}}$.
* $D_u = F/T_{tot}$.

## Exercice 2

1. Il faut que $T_e > RTT$, c'est-à-dire $L/C > 2D/V$, et donc $L > 2 D
   \dfrac{C}{V}=500$ bits.
2. $L_{min}=2C\dfrac{D}{V}$ : si le débit $C$ est multiplié par 10, soit on divise la distance par 10, soit on multiplie la
   longueur minimale de la trame par 10.
