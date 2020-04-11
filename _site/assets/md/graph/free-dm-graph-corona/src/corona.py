# @package corona
#  Documentation for this module.

import numpy as np
import networkx
import matplotlib.pyplot as plt
import random

sain = "green"
malade = "red"
remis = "blue"
decede = "black"

## La class qui represente un individu de la population
class individu:

    ## Constructeur d'un individu
    #@param num : le numéro de l'individu dans la population
    #@param etat : l'état de l'individu. 0 = sain, 1 = malade, 2 = gueris, 3 = decedé
    #@param duree_infection : depuis quand l'individu est infécté. 0 si individu sain
    #@param nb_freq : nombre de frequentation de l'individu
    def __init__(self, num, etat, duree_infection, nb_freq):
        self.num = num
        self.etat = etat
        self.duree_infection = duree_infection
        self.nb_freq = nb_freq

## Fonction qui crée un graphe circulaire
#@param n : nombre d'individus dans la population
#@return la matrice d'adjacence du graph crée
def create_circular(n):
    matrice_adja = np.zeros((n, n))
    for i in range (n):
        matrice_adja[i][(i-1)%n] = 1
        matrice_adja[i][(i+1)%n] = 1
    return(matrice_adja)

## Fonction qui crée un graph aléatoire
#@param n : nombre d'individus dans la population
#@param k : nombre minimal de fréquentation de chaque individu. (En moyenne chaque individu aura 2k frequentations)
#@return la matrice d'adjacence du graph crée
def create_random(n, k):
    matrice_adja = np.zeros((n, n))
    for i in range(n):
        liste_voisin = list(range(n)) #liste possible des voisins
        for j in range(k):
            choice = random.choice(liste_voisin) #choisis aleatoirement un voisin dans la liste
            while choice == i:
                choice = random.choice(liste_voisin)
            liste_voisin.pop(liste_voisin.index(choice)) #retire de la liste le voisin choisis (evite qu'il ne le retire)
            matrice_adja[i][choice] = 1
            matrice_adja[choice][i] = 1
    return matrice_adja

##Retourne le nombre moyen de voisins dans le graphe. A fin de debug.
#@param adja : une ligne d'une matrice d'adjacence
#@param n : taille de la ligne
#@return la moyenne
def moyenne_voisin(adja, n):
    total = 0
    for i in range(n):
        total += list(adja[i]).count(1) #compte les 1 dans la ligne.
    return total/n


##Retourne l'indice du ie voisins du sommet i
#@param liste_adja : une ligne d'une matrice d'adja
#@param i : numéro de voisin
#@param n : taille de la liste
#@return indice du ie voisin
def indice_ie_freq(liste_adja, i, n):
    cpt = 0
    for indice in range(n):
        if liste_adja[indice] == 1:
            cpt += 1
        if cpt == i:
            return indice
    return -1

## Confine la population passée en paramètre, en autorisant chaque personne à ne voir que k_prim personnes parmis ces anciens contacts
#faire doc lol
def confinement(n, k_prim, k, matrice_adja):
    new_adja = np.zeros((n,n))
    for i in range(n):
        liste_frequentation = list(range(1, k+1)) #liste [1, 2, ..., k+1] pour choisir quel ancien contact il va garder
        for j in range(k_prim):
            choice = random.choice(liste_frequentation) #choisis dans la liste
            while choice == i:
                choice = random.choice(liste_frequentation)
            liste_frequentation.pop(liste_frequentation.index(choice)) #retire le contact precedemment choisi
            sommet_associe = indice_ie_freq(matrice_adja[i], choice, n) #retourne le num d'individu associé à ce contact
            new_adja[i][sommet_associe] = 1
            new_adja[sommet_associe][i] = 1
    return new_adja

## Crée une population de taille n
def population(matrice_adja, n):
    popu = []
    for i in range(n):
        nb_voisin = list(matrice_adja[i]).count(1)
        popu += [individu(i, 0, 0, nb_voisin)]
    return popu

## Infecte aléatoirement un individu de la population
def patient_0(population, n):
    choice = random.randint(0,n-1)
    population[choice].etat = 1
    return population

## Booléen avec probabilité d'etre True de proba
def tirage(proba):
    res = random.randint(1,100)
    return res <= proba*100

## Retourne la population au jour n+1
def propagation_jour(matrice_adja, population, n, p, q, r):
    for i in range(n):
        if population[i].etat == 1:
            if population[i].duree_infection > r:
                if tirage(p):
                    population[i].etat = 3
                else:
                    population[i].etat = 2
            for j in range(n):
                if matrice_adja[i][j] == 1 and tirage(q) and population[j].etat == 0:
                    population[j].etat = 1
    for i in range(n):
        if population[i].etat == 1:
            population[i].duree_infection += 1
    return population

def create_random_circular(n, k):
    matrice_adja = np.zeros((n, n))
    matrix_adj_circular = create_circulaire(n)
    matrix_adj_random = create_random(n, k)
    for i in range(n):
        for j in range(n):
            if (matrix_adj_circular[i][j] == 1 or matrix_adj_random[i][j] == 1):
                matrice_adja[i][j] = 1
    return matrice_adja

## Simule la propagation du virus jusqu'à ce qu'il n'y ait plus de malades, pendant 6 mois max
def propagation(matrice_adja, population, n, p, q, r):
    jour = 0
    tab_malades = [1]
    tab_sains = [n-1]
    tab_gueris = [0]
    tab_decede = [0]
    while(tab_malades[jour] != 0 or jour < 180):
        # if jour > 180:
        #     break
        jour += 1
        population = propagation_jour(matrice_adja, population, n, p, q, r)
        color, nb_sains, nb_malades, nb_gueris, nb_deces = vertice_color(population, n)

        # tableau pour plot les courbes
        tab_malades += [nb_malades]
        tab_sains += [nb_sains]
        tab_gueris += [nb_gueris]
        tab_decede += [nb_deces]

        if gif == 1:
            #sauvegarde de la population au jour j sous forme de graph. Nom du fichier : jour_j.png
            g = networkx.convert_matrix.from_numpy_matrix(matrice_adja)
            name = "jour_{0}".format(jour)
            networkx.draw_circular(g, with_labels=True, node_color = color)
            plt.text(-1.1,1, name, fontsize="medium")
            plt.text(-1.1, 0.9, "sain", backgroundcolor=sain)
            plt.text(-1.1, 0.8, "malade", backgroundcolor=malade)
            plt.text(-1.1, 0.7, "gueris", backgroundcolor=remis)
            plt.text(-1.1, 0.6, "decede", backgroundcolor=decede, color="white")
            plt.savefig(name)
            plt.clf()

    #plot les courbes
    plt.plot(tab_malades, c=malade, label='nombre malades')
    plt.plot(tab_gueris, c=remis, label='nombre gueris')
    plt.plot(tab_sains, c=sain, label='nombre jamais infectés')
    plt.plot(tab_decede, c=decede, label='nombre decedés')
    plt.legend()
    plt.savefig("random_p-{0}_n-{1}".format(j, n))
    plt.clf()

    return population

## Tableau avec les couleurs de chaque sommets + nombre de sains, malades, gueris, deces
def vertice_color(population, n):
    color = n*[sain]
    nb_sains, nb_malades, nb_gueris, nb_deces = (0,0,0,0)
    for i in range(n):
        if population[i].etat == 1:
            color[i] = malade
            nb_malades += 1
        elif population[i].etat == 2:
            color[i] = remis
            nb_gueris += 1
        elif population[i].etat == 3:
            color[i] = decede
            nb_deces += 1
    return color, n - nb_malades - nb_gueris - nb_deces, nb_malades, nb_gueris, nb_deces

def verifyer(popu, popu_confine, n):
    for i in range(n):
        for j in range(n):
            if popu_confine[i][j] == 1 and popu[i][j] == 0:
                print("ERROR !")
                return
    print("OK")

n = 500 #nombre d'individu
k = 50 #nombre de copains au départ
k_prim = 10 #nombre de copains apres application du confinement
r = 14 #duree de la maladie
p = 1/100 #probabilité de décès
q = 2/100 #probabilité d'attrapé la maladie
gif = 1 #booléen global pour savoir si des images pour un gif doivent etre générées
j = 0

graph_popu = create_random(n, k)
print("la moyenne devrait etre ~= {0}. Elle est de {1}".format(2*k, moyenne_voisin(graph_popu, n)))

graph_popu_confine = confinement(n, k_prim, k, graph_popu)
print("la moyenne devrait etre ~= {0}. Elle est de {1}".format(2*k_prim, moyenne_voisin(graph_popu_confine, n)))
popu_confine = population(graph_popu_confine, n)
popu_confine_malade = patient_0(popu_confine,n)
propagation(graph_popu_confine, popu_confine_malade, n, p, q, r)
