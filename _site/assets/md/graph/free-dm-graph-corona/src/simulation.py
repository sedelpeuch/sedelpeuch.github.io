#!/usr/bin/env python

import corona

n = 1000 #nombre d'individu
k = 20 #nombre de copains au départ
k_prim = 10 #nombre de copains apres application du confinement
r = 20 #duree de la maladie
p = 1/100 #probabilité de décès
q = 1/100 #probabilité d'attrapé la maladie
j = 0
gif = 0

print("Combien souhaitez vous d'individus dans la population ?")
n = int(input())
print("Nombre de contact moyen avant le confinement ?")
k = int(input())
print("Pour le confinement : nombre de contact moyen à garder parmis les anciens contact d'avant confinement ?")
k_prim = int(input())
print("Durée de la maladie (en jours) ?")
r = int(input())
print("Probabilité de décès de la maladie ?")
p = float(input())
print("Probabilité d'attrapper la maladie ?")
q = float(input())

corona.simulation(n, k//2, k_prim//2, r, p, q)
