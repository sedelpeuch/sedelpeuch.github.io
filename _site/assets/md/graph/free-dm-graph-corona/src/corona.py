# @package corona
#  Documentation for this module.

import numpy as np
import networkx
import matplotlib.pyplot as plt
import random
import sys

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
    #@param tab_voisins : tableau avec les numeros de ses voisins
    def __init__(self, num, etat, duree_infection, nb_freq, r):
        self.etat = etat
        self.num = num
        self.duree_infection = duree_infection
        self.nb_freq = nb_freq
        self.tab_voisins = []
        self.tab_voisins_confine = []
        self.confine = 0
        self.tab_voisin_j = r*[[]]

## Fonction qui crée un graphe circulaire
#@param n : nombre d'individus dans la population
#@return la matrice d'adjacence du graph crée
def create_circular(n, population):
    matrice_adja = np.zeros((n, n))
    for i in range (n):
        matrice_adja[i][(i-1)%n] = 1
        matrice_adja[i][(i+1)%n] = 1
        population[i].tab_voisins+=[(i-1)%n, (i+1)%n]
    return(matrice_adja, population)

## Fonction qui crée un graph aléatoire
#@param n : nombre d'individus dans la population
#@param k : nombre minimal de fréquentation de chaque individu. (En moyenne chaque individu aura 2k frequentations)
#@return la matrice d'adjacence du graph crée
def create_random(n, k, population):
    matrice_adja = np.zeros((n, n))
    for i in range(n):
        print('creation du graphe... {0}%'.format((i*100)/n), end="\r")
        liste_voisin = list(range(n)) #liste possible des voisins
        for j in range(k):
            choice = random.choice(liste_voisin) #choisis aleatoirement un voisin dans la liste
            while choice == i:
                choice = random.choice(liste_voisin)
            liste_voisin.pop(liste_voisin.index(choice)) #retire de la liste le voisin choisis (evite qu'il ne le retire)
            matrice_adja[i][choice] = 1
            matrice_adja[choice][i] = 1
            population[i].tab_voisins+=[choice]
            population[choice].tab_voisins+=[i]
    print('\nGRAPHE CREE !')
    return matrice_adja, population

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
def confinement(n, k_prim, k, matrice_adja, popu):
    # new_popu = copy_popu_sans_voisin(popu, n)
    # new_popu = population(n)
    new_adja = np.zeros((n,n))
    for i in range(n):
        liste_frequentation = popu[i].tab_voisins
        for j in range(k_prim):
            choice = random.choice(liste_frequentation) #choisis dans la liste
            while choice == i:
                choice = random.choice(liste_frequentation)
            liste_frequentation.pop(liste_frequentation.index(choice)) #retire le contact precedemment choisi
            # sommet_associe = indice_ie_freq(matrice_adja[i], choice, n) #retourne le num d'individu associé à ce contact
            new_adja[i][choice] = 1
            new_adja[choice][i] = 1
            popu[i].tab_voisins_confine+=[choice]
            popu[i].nb_freq += 1
            popu[choice].tab_voisins_confine+=[i]
            popu[choice].nb_freq += 1
    return new_adja, popu

## Crée une population de taille n
def population(n, r):
    popu = []
    for i in range(n):
        popu += [individu(i, 0, 0, 0, r)]
    return popu

def copy_popu_sans_voisin(popu, n):
    copy = popu
    for i in range(n):
        copy[i].tab_voisins = []
    return copy

## Infecte aléatoirement un individu de la population
def patient_0(population, n):
    choice = random.randint(0,n-1)
    population[choice].etat = 1
    return population

## Booléen avec probabilité d'etre True de proba
def tirage(proba):
    res = random.randint(1,100)
    return res <= proba*100

def decalage_tab_voisin_jour(tab_voisin_jour, r):
    for i in range(r-1):
        tab_voisin_jour[i+1] = tab_voisin_jour[i]
    return tab_voisin_jour

def ajout_nouveaux_voisin(tab_voisin_jour, tab_voisin):
    tab_voisin_jour[0] = tab_voisin
    return tab_voisin_jour

def create_random_circular(n, k):
    matrice_adja = np.zeros((n, n))
    matrix_adj_circular = create_circular(n)
    matrix_adj_random = create_random(n, k)
    for i in range(n):
        for j in range(n):
            if (matrix_adj_circular[i][j] == 1 or matrix_adj_random[i][j] == 1):
                matrice_adja[i][j] = 1
    return matrice_adja

## Retourne la population au jour n+1
def propagation_jour(matrice_adja, population, n, p, q, r):
    for i in range(n):
        population[i].tab_voisin_j = decalage_tab_voisin_jour(population[i].tab_voisin_j, r)
        population[i].tab_voisin_j = ajout_nouveaux_voisin(population[i].tab_voisin_j, population[i].tab_voisins_confine)
        if population[i].etat == 1:
            if population[i].duree_infection > r:
                if tirage(p):
                    population[i].etat = 3
                    for liste_voisin in population[i].tab_voisin_j:
                        for voisin in liste_voisin:
                            population[voisin].confine = 1
                            matrice_adja[i] = 0
                            matrice_adja[voisin] = 0
                else:
                    population[i].etat = 2
            elif population[i].confine == 0:
                for voisin in population[i].tab_voisins_confine:
                    if tirage(q) and population[voisin].etat == 0 and population[voisin].confine == 0:
                        population[voisin].etat = 1
    for i in range(n):
        if population[i].etat == 1:
            population[i].duree_infection += 1
    return matrice_adja, population

## Simule la propagation du virus jusqu'à ce qu'il n'y ait plus de malades, pendant 6 mois max
def propagation(matrice_adja, population, n, p, q, r, type_confi):
    jour = 0
    tab_malades = [1]
    tab_sains = [n-1]
    tab_gueris = [0]
    tab_decede = [0]
    while(jour < 180):
        if type_confi == 'dynamique':
            matrice_adja, population = confinement(n, k_prim, k, matrice_adja, popu)

        print("simualation du jour {0}/180".format(jour), end="\r")
        jour += 1
        matrice_adja, population = propagation_jour(matrice_adja, population, n, p, q, r)
        color, nb_sains, nb_malades, nb_gueris, nb_deces = vertice_color(population, n)

        # tableau pour plot les courbes
        tab_malades += [nb_malades]
        tab_sains += [nb_sains]
        tab_gueris += [nb_gueris]
        tab_decede += [nb_deces]

        if gif == 1:
            #sauvegarde de la population au jour j sous forme de graph. Nom du fichier : jour_j.png
            g = networkx.convert_matrix.from_numpy_matrix(matrice_adja)
            name = "jour {0}".format(jour)
            networkx.draw_circular(g, with_labels=True, node_color = color)
            plt.text(-1,0.99, name, fontsize="medium")
            plt.text(-1, 0.9, "sain", backgroundcolor=sain)
            plt.text(-1, 0.8, "malade", backgroundcolor=malade)
            plt.text(-1, 0.7, "gueris", backgroundcolor=remis)
            plt.text(-1, 0.6, "decede", backgroundcolor=decede, color="white")
            plt.savefig("jour_{0}".format(jour))
            plt.clf()

    #plot les courbes
    plt.plot(tab_malades, c=malade, label='nombre malades')
    plt.plot(tab_gueris, c=remis, label='nombre gueris')
    plt.plot(tab_sains, c=sain, label='nombre jamais infectés')
    plt.plot(tab_decede, c=decede, label='nombre decedés')
    plt.legend()
    plt.savefig("courbe_propa_{0}".format(r))
    print("Courbes sauvegardées sous : courbe_propa_{0}".format(type_confi))
    plt.clf()
    print("\n")
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
        if popu_confine[i][j] == 1 and popu[i][j] == 0:
            for j in range(n):
                print("ERROR !")
                return
    print("OK")

def simulation(n, k, k_prim, r, p, q):
    print("Taille de la population : {taille} individus\n".format(taille = n))
    popu_depart = population(n, r)
    (graph_popu, popu) = create_random(n, k, popu_depart)
    # print("la moyenne devrait etre ~= {0}. Elle est de {1}".format(2*k, moyenne_voisin(graph_popu, n)))

    graph_popu_confine, popu_confine = confinement(n, k_prim, k, graph_popu, popu)
    # print("la moyenne devrait etre ~= {0}. Elle est de {1}".format(2*k_prim, moyenne_voisin(graph_popu_confine, n)))
    popu_confine_malade = patient_0(popu_confine,n)
    propagation(graph_popu_confine, popu_confine_malade, n, p, q, r, 'statique')



n = 1000 #nombre d'individu
k = 20 #nombre de copains au départ
k_prim = 10 #nombre de copains apres application du confinement
r = 20 #duree de la maladie
p = 1/100 #probabilité de décès
q = 1/100 #probabilité d'attrapé la maladie
j = 0
gif = 1

# if '-gif' in sys.argv:
#     gif = 1 #booléen global pour savoir si des images pour un gif doivent etre générées

# for r in range(1, 40):
#     simulation(n, k, k_prim, r, p, q)
