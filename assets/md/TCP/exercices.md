---
layout: page
hide: true
title: Architecture des Réseaux TCP/IP
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

<style>
html {
 zoom: 0.80;
}
</style>

## Exercices en vrac

### Exercice p40

TODO

### Exercice p51

+ *En utilisant les formats de trame donnés, décoder les trames MAC Ethernet
  suivantes (ces trames sont données sans l'en tête)*
+ *Pour chaque trame déterminer les valeurs detous les champs présents et e
  qu'ils signifient*

Destination : `FF FF FF FF FF FF`
Source : `08 00 20 02 45 9E = 129.104.254.6` 
Longueur / Type : `08 06` (dans le cas présent type qui indique l'ARP en
suivant)
Hardware type : `00 01`
Protocole Type : `08 00`
Hardware Address Length / Protocol Address Length : `06 04`
Operation Code : `0001`
Sender Hardware Address : `08 00 20`
Sender Protocol Adress : `20 02`
Target Hardware Address : `45 9E 81`
Target Protocol Address : `68 FE`

Destination : `08 00 20 02 45 9E`
Source : `08 00 20 07 0B 94 = 129.104.254.5` 
Longueur / Type : `08 06` (dans le cas présent type qui indique l'ARP en
suivant)
Hardware type : `00 01`
Protocole Type : `08 00`
Hardware Address Length / Protocol Address Length : `06 04`
Operation Code : `0002`
Sender Hardware Address : `08 00 20`
Sender Protocol Adress : `07 0B`
Target Hardware Address : `94 81 68`
Target Protocol Address : `FE 05`

### Exercice p52

#### Réseau 1 

`192.168.1.1` effectue un who has en cherchant `192.168.1.2`, celui là répond
is-at. 

#### Réseau 2

`192.168.1.1` broadcast un who as `192.168.1.254`. Le routeur répond is-at puis
effectue un who has `192.168.2.1`. Finalement `192.168.2.1` répond un is-at.

### Exercice p14 

#### Énoncé 

+ Soit un datagramme IP : 
    - Data = 4000 octets 
    - Options copiées = 9 octets 
    - Options non copiées = 26 octets 
    - MTU = 512 octets 
    
+ Étudier la fragmentation du datagramme IP 
+ Écrire un algorithme (pseudo - code) permettant de fragmenter un datagramme IP 
+ Étudier le ré-assemblage des fragments 
+ Pourquoi la fragmentation est considérée comme mécanisme inefficace dans IP
+ Trouver une solution permettant d'éviter la fragmentation

```
MTU <-512
data <-4000
offset<-0

//Premier fragment
header_size <- 20B + "nb d'options copiées" + "nb d'options non copiées"
ip_data_size <- partie_entiere((MTU - header_size)/8) * 8

data_rest <- data - ip_data_size
offset <- partie_entiere((MTU - header_size)/8)

header_size <- header_size - "nb d'options non copiées"
nb_trames <- partie_entiere(data_rest /partie_entiere((MTU - header_size) / 8) *
8)
```


## TD 1 - Adressage et subdivision de réseau 

*La subdivision de réseau est un procédé qui permet de découper logiquement des
réseaux de grande taille en sous-réseaux de plus petites tailles. Pour ce faire,
on applique, grâce à une formule mathématique, à partir d'une adresse de base,
un masque de sous-réseau. Le résultat est une plage d'adresses de machines
continues mais de taille réduite par rapport à la plage d'adresses initiales.*

1. *L'adresse de la machine A est 193.55.28.152. De quelle classe est cette
   adresse ? Quel est le masque du réseau ? Définir l'adresse de diffusion
   restreinte sur tout le sous réseau.*
   
 Adresse de classe C, masque : `255.255.255.0`, broadcast : `193.55.28.255`
 
 2. *Une entreprise a obtenu l'adresse réseau suivante par l'AFNIC :
    194.57.242.0*
    
Adresse de classe C. 

1 bit pour le sous réseau

0000 0000 -> 194.57.242.0/25 -> [1->126] -> bc = 194.57.242.127

1000 0000 -> 194.57.242.128/25 -> [129->254] -> bc = 194.57.242.255


