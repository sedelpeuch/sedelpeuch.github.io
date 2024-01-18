import sys
from time import sleep, localtime

from PodSixNet.Server import Server
from PodSixNet.Channel import Channel
from random import *

class ClientChannel(Channel):
    """
    This is the server representation of a connected client.
    """
    def __init__(self, *args, **kwargs):
        self.nickname = "anonymous"
        Channel.__init__(self, *args, **kwargs)
        self.Send({"action":"startLoop"})

    def Close(self):
        self._server.DelPlayer(self)

    def Network_checkNickname(self,data): #Teste si le pseudo est correct
        if not data["Nickname"] in [p.nickname for p in self._server.players]:
            self.nickname=data["Nickname"]
            self.Send({"action":"accepterPseudo","Nickname":self.nickname})
            self._server.score[self] = 1000
            self._server.actualiserJoueur()
            self._server.AddPlayer(self)
        else:
            self.Send({"action": "refusPseudo"})

    def Network_demandePartie(self, data): #Permet de demander une partie à quelqu'un et gère les différentes solutions
        #
        joueurA = self
        joueurB = [p for p in self._server.players if p.nickname == data["pseudoJoueur"]][0]
        #
        if joueurB.nickname == None:
                self.Send({"action": "refusDemande", "raison" : "ERREUR : Un problème est survenu."})
                return None
        if self._server.players[joueurB] != 0:
                self.Send({"action": "refusDemande", "raison" : "{0} est déjà en partie!".format(data["pseudoJoueur"])})
                return None
        if data["pseudoJoueur"] == "0":
                self.Send({"action": "refusDemande", "raison" : "ERREUR : Le joueur n'est pas connecté."})
                return None
        #       - OK -
        joueurB.Send({"action": "requetePartie", "pseudo" : joueurA.nickname, "pointsA": self._server.score[joueurA], "pointsB": self._server.score[joueurB]})

    def Network_partieRefus(self, data):
            joueurB = [p for p in self._server.players if p.nickname == data["pseudoB"]][0]
            joueurB.Send({"action": "refusDemande", "raison" : "{0} a refusé votre demande de partie!".format(self.nickname)})

    def Network_partieAccepte(self, data):
            joueurB = [p for p in self._server.players if p.nickname == data["pseudoB"]][0]
            if self._server.players[joueurB] != 0:
                    self.Send({"action": "refusDemande", "raison" : "{0} est déjà en partie!".format(data["pseudoB"])})
                    return None
            if self._server.players[self] != 0:
                    self.Send({"action": "refusDemande", "raison" : "Vous êtes déjà en partie !"})
                    return None
            #
            if randint(0, 1) == 0:
                    self._server.creerPartie([self, joueurB])
            else:
                    self._server.creerPartie([joueurB,self])

    def Network_coup(self, data): #Permet de réaliser un coup
        [p.Send({"action":"coup", "coup" : data["coup"]}) for p in self.partie.joueurs if p.nickname!= self.nickname]
        self._server.actualiserJoueur()

    def Network_nickname(self, data):
        self.nickname = data["nickname"]
        if self.nickname == "0":
            self.Send({"action":"startLoop"})

    def Network_end(self,data): #Teste la fin du jeu
        [p.Send({"action":"finJeu"}) for p in self.partie.joueurs]


    def Network_win(self,data): #Définit le gagnant
        gagnantp=data["winner"]
        self.partie.fin(gagnantp)

    def Network_nul(self,data): #Définit le perdant
        for p in self.partie.joueurs:
            self._server.players[p]=0
            p.Send({"action":"actu"})

    def Network_actu(self,data):
        self._server.actualiserJoueur()

    def Network_jePasse(self,data): #gère le passage de tour
        [p.Send({"action":"turnToYou"})for p in self.partie.joueurs if p.nickname!= self.nickname]

class MyServer(Server):
    channelClass = ClientChannel

    def __init__(self, *args, **kwargs):
        Server.__init__(self, *args, **kwargs)
        self.players = {}
        self.score = {}
        print('Server launched')

    def Connected(self, channel, addr): 
        self.AddPlayer(channel)

    def AddPlayer(self, player):
        print("New Player connected")
        self.players[player] = 0

    def creerPartie(self, joueurs):
        print("Créer une partie")
        joueurs[0].partie = Partie(joueurs[0], joueurs[1], self)
        joueurs[1].partie = joueurs[0].partie
        joueurs[0].partie.initialiserPartie()
        self.players[joueurs[0]] = 1
        self.players[joueurs[1]] = 2
        self.actualiserJoueur() #Les joueurs sont occupés

    def actualiserJoueur(self):
        liste = [[p.nickname, self.score[p],self.players[p]] for p in self.players if p.nickname != "0"]
        [p.Send({"action": "afficherJoueur", "liste": liste}) for p in self.players if p.nickname!="0"]
            #self.envoyerAll({"action": "afficherJoueur", "liste": liste})

    def envoyerAll(self, data):
        [p.Send(data) for p in self.players if p.nickname != "0"]

    def PrintPlayers(self):
        print("players' nicknames :",[p.nickname for p in self.players])

    def DelPlayer(self, player):
        print("Deleting Player " + player.nickname + " at "+str(player.addr))
        del self.players[player]

    def SendToOthers(self, data):
        [p.Send({"action":"coup", "coup" : data["coup"]}) for p in self.players if p.nickname != data["who"]]

    def SendToCouple(self, data):
        [p.Send({"action":"coup", "coup" : data["coup"]}) for p in self.partie.joueurs if p.nickname!= self.nickname]

    def SendPass(self,data):
        [p.Send({"action":"turnToYou"}) for p in self.players if p.nickname != data["who"]]

    def SendEnd(self,data):
        joueurB = [p for p in self.players if p.nickname == data["who"]][0]
        for p in self.players:
            if joueurB.partie==p:
                p.Send({"action":"finJeu"})




    def Launch(self):
        while True:
            self.Pump()
            sleep(0.001)
class Partie():

#PHASE D'INITILISATION

    def __init__(self, joueurA, joueurB, server):

            self.joueurs = [joueurA,joueurB]
            self.server = server
            self.tour = 0

    def initialiserPartie(self):
        self.joueurs[0].Send({"action": "start","état":2})
        self.joueurs[1].Send({"action": "start","état":1})

    def fin(self,gagnantp): #Gère la fin de la partie, permet de dire qui est le perdant et qui est le gagnant
        gagnant = [p for p in self.joueurs if p.nickname==gagnantp][0]
        perdant = [p for p in self.joueurs if p.nickname!=gagnant.nickname][0]
        perdant.Send({"action":"showMessage","message":"Vous avez perdu.."})
        gagnant.Send({"action":"showMessage","message":"Vous avez gagné !"})
        #self.server.clearTerrain(self.joueurs)
        #
        self.server.players[gagnant] = 0
        self.server.players[perdant] = 0
        #
        p = int(self.server.score[perdant])
        g = int(self.server.score[gagnant])
        #
        self.server.score[gagnant] = g + 100-(g-p)//3
        self.server.score[perdant] = p - 100+(g-p)//3
        self.server.actualiserJoueur()

    def nul(self):
        for p in self.server.players:
            self.server.players[p] = 0
        self.server.actualiserJoueur()

# get command line argument of server, port
if len(sys.argv) != 2:
    print("Please use: python3", sys.argv[0], "host:port")
    print("e.g., python3", sys.argv[0], "localhost:31425")
else:
    host, port = sys.argv[1].split(":")
    s = MyServer(localaddr=(host, int(port)))
    s.Launch()
