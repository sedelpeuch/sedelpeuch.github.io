import sys
from time import sleep
from random import randrange
from sys import stdin, exit
from PodSixNet.Connection import connection, ConnectionListener
import tkinter.font as tkFont
from tkinter.messagebox import *
from tkinter import *

# QUELSQUES VARIABLES

WIDTH = 300
HEIGHT = 200
R = 5  # rayon des pièces

# différents états
INITIAL = 0
ACTIVE = 1
DEAD = -1

# GESTION DU CLIENT/SERVEUR


class Client(ConnectionListener):

    def __init__(self, host, port):
        self.Connect((host, port))
        self.occupation = 0
        print("Client connecté")
        self.nickname = "0"
        connection.Send({"action": "nickname", "nickname": "0"})
        self.Loop()

    def Network_startLoop(self, data):
        while self.nickname != "":
            fen.update()
            self.Loop()
            sleep(0.001)
        exit()

    def Network_connected(self, data):
        print("Vous êtes maintenant connécté")

    def Network_accepterPseudo(self, data):
        self.nickname = data["Nickname"]
        demandeF.destroy()
        fen.bind("<Key>", Fenetre.mouseClic)
        self.fenetre = Fenetre(self, fen)
        showinfo(
            "Connexion établie",
            "Tu es désormais en ligne ! \n Ton pseudo est : {0}".format(self.nickname),
        )

    def Network_refusPseudo(self, data):
        showwarning("Pseudo invalide", "Tu ne peux pas prendre celui là !!")
        Nickname.set("")

    def Loop(self):
        connection.Pump()
        self.Pump()

    def quit(self):
        fen.destroy()
        self.occupation = DEAD

    def Network_start(self, data):
        self.occupation = data["état"]
        e = data["état"]
        self.fenetre.initJeu(e)
        while self.occupation != DEAD:
            fen.update()
            self.Loop()
            sleep(0.001)
        exit()

    def Network_afficherJoueur(self, data):
        if self.nickname == "0":
            return None
        self.fenetre.actualiserJoueurs(data["liste"])

    def Network_requetePartie(self, data):
        if (
            askyesno(
                "Requête de partie",
                "Quelqu'un veut jouer avec toi ! \n {0} te propose un REVERSO, acceptes tu ? \n (Il a {1} Points, tu en as (jamais assez) {2})".format(
                    data["pseudo"], data["pointsB"], data["pointsA"]
                ),
            )
            == True
        ):
            self.Send({"action": "partieAccepte", "pseudoB": data["pseudo"]})
        else:
            self.Send({"action": "partieRefus", "pseudoB": data["pseudo"]})

    def Network_refusDemande(self, data):
        showwarning("Le message s'est perdu en chemin !", data["raison"])

    def Network_actualiserJoueurs(self, data):
        for i in data["joueurs"]:
            listbox.insert("end", i)

    def Network_coup(
        self, data
    ):  # Permet au joueur d'envoyer au serveur l'information sur son coup.
        global tjeu
        mess = self.fenetre.mess
        tjeu = data["coup"]
        for i in range(1, 7):
            for j in range(1, 7):
                if tjeu[j][i] != 0:
                    if tjeu[j][i] == 1:
                        tjeu[j][i] = 2
                        self.fenetre.affichePion(j, i)
                    else:
                        tjeu[j][i] = 1
                        self.fenetre.affichePion(j, i)
        self.fenetre.comptePions()
        if self.occupation == 2:
            self.occupation = 1
        mess.configure(text=("A votre tour"))

    def Network_error(self, data):
        print("error:", data["error"][1])
        connection.Close()

    def Network_disconnected(self, data):
        print("Server disconnected")
        exit()

    def demandePartie(self, pseudoJoueur2):  # Empêcher de jouer avec soi même
        if self.nickname == pseudoJoueur2:
            showwarning(
                "Le message s'est perdu en chemin !",
                "Euh... On a pas programmé un jeu en solo nous !",
            )
            return None
        self.Send({"action": "demandePartie", "pseudoJoueur": pseudoJoueur2})

    def Network_finJeu(self, data):  # Gère la fin du jeu
        if blc > nor:
            ms = "Bravo, tu as gagné!"
            bk = "gray"
            fc = "navy"
            self.Send({"action": "win", "winner": self.nickname})
        elif nor > blc:
            ms = "Désolé, tu as perdu!"
            bk = "gray"
            fc = "red"
        else:
            ms = "Match nul!!!"
            bk = "grey"
            fc = "white"
            self.Send({"action": "nul", "nickname": self.nickname})
        self.occupation = 0
        msg = Toplevel()
        msg.configure(background="gray")
        Message(msg, bg=bk, fg=fc, width=200, font="Arial 12", text=ms).pack(
            padx=10, pady=10
        )

    def Network_turnToYou(
        self, data
    ):  # Permet de signaler à l'adversaire que le joueur passe
        mess = self.fenetre.mess
        mess.configure(text=("Le joueur adverse passe"))
        self.occupation = 1
        global passe
        passe += 1

    def Network_actu(self, data):
        sleep(1)
        self.Send({"action": "actu"})


# GESTION DU JEU

if len(sys.argv) != 2:
    print("Please use: python3", sys.argv[0], "host:port")
    print("e.g., python3", sys.argv[0], "localhost:31425")
    exit()

host, port = sys.argv[1].split(":")
c = Client(host, int(port))

# GESTION DE L'AFFICHAGE

fen = Tk()
fen.title("Connection")
fen.configure(background="grey")

demandeF = Frame(fen, bg="grey")
Nickname = StringVar()
Nickname.set("")

police = tkFont.Font(family="Helvetica", size=30)
Label1 = Label(demandeF, text="R E V E R S O", font=police, bg="grey", fg="blue")
Label1.pack(side=TOP)

police = tkFont.Font(family="Arial", size=11)
Valider = Button(
    demandeF,
    text="Valider",
    bg="gray25",
    font=police,
    fg="gray90",
    command=lambda: demandePseudoServeur(Nickname),
)
Valider.pack(side=BOTTOM)

Text = Entry(demandeF, textvariable=Nickname, font=police, bg="gray10", fg="gray90")
Text.focus_set()
Text.pack(side=BOTTOM)

police = tkFont.Font(family="Times", size=12)
Label2 = Label(demandeF, text="Entrer un pseudonyme", font=police, bg="grey", fg="blue")
Label2.pack(side=BOTTOM)

demandeF.pack()


def demandePseudoServeur(
    Nickname,
):  # Permet de demander le pseudo d'un joueur et de le refuser si problème
    if Nickname.get() == "0" or Nickname.get() == "":
        showwarning("Pseudo invalide", "Tu ne peux pas prendre celui là !!")
        Nickname.set("")
    elif len(Nickname.get()) > 16:
        showwarning(
            "Pseudo invalide",
            "Désolé, les pseudos ne peuvent pas dépasser \n 16 caratères.",
        )
        Nickname.set("")
    else:
        c.Send({"action": "checkNickname", "Nickname": Nickname.get()})
        c.Loop


def aide():  # Code l'affichage d'une règle de jeu
    msg = Toplevel()
    Message(
        msg,
        bg="navy",
        fg="ivory",
        width=480,
        font="Arial 12",
        text="           * Règles du jeu *\n"
        "Le plateau de jeu représente un damier de 36 cases, chaque joueur "
        "dispose  de 18 jetons chacun, chaque face est noire d'un côté, "
        "blanche de l'autre.\n"
        "Vous prenez les jetons en les retournant du côté de votre couleur.\n"
        "Au départ, 2 pions de chaque couleur sont disposés sur les 4 cases "
        "centrales. A tour de rôle, chacun pose un jeton avec l'obligation "
        "de retourner au moins un jeton adverse. Votre jeton doit être posé "
        "de manière à entourer 1 ou plusieurs jetons adverses.\n"
        "Un jeton peut prendre simultanément dans les direction horizontales, "
        "veritcales et diagonales.\n"
        "La partie se termine quand tous le jetons sont posés, ou si aucun "
        "joueur ne peut plus jouer.\n"
        "Le vainqueur est celui qui possède le plus de jetons de sa couleur "
        "sur le plateau.\n"
        " \n"
        "Comment jouer :\n"
        "Pour poser un pion, cliquez sur la cases de votre choix.\n"
        "Si vous ne pouvez pas jouer, cliquez sur le bouton 'Passe'.\n",
    ).pack(padx=10, pady=10)


passe = 0


def passe():  # Permet d'offir la possibilité au joueur de passer
    mess = c.fenetre.mess
    global passe
    if c.occupation == 1:
        mess.configure(text=("Joueur passe"))
        c.occupation = 2
        c.Send({"action": "jePasse"})
        passe += 1
        if testFin() == 1:
            c.Send({"action": "end"})


def testFin():  # Teste si le jeu est fini ou si il faut continuer
    fn = 0
    if rst == 0 or blc == 0 or nor == 0 or npa == 2:
        fn = 1
    if passe == 2:
        fn = 1
    return fn


# FENETRE


class Fenetre:

    def __init__(self, client, fenetre):  # Permet d'afficher la fenetre globale de jeu

        self.client = client
        self.fenetre = fenetre
        ##
        fen.title("REVERSO")
        ##
        listJ = Frame(fen, bd=2, bg="grey")
        zoneListeJoueurs = Canvas(listJ, width=500, height=531, bg="gray25")
        zoneListeJoueurs.pack(side=LEFT)
        self.zoneListeJoueurs = zoneListeJoueurs
        listJ.pack(side=LEFT)
        #
        fr1 = Frame(fen, bd=2, relief=SOLID, bg="grey")
        b2 = Button(fr1, text="Aide", width=15, command=aide)
        b2.pack(side=LEFT, padx=10, pady=5)
        fr1.pack()
        #
        canvas = Canvas(fen, bg="grey", width=358, height=358)
        canvas.bind("<Button-1>", self.mouseClic)
        canvas.pack(padx=5, pady=5)
        fr2 = Frame(fen, bg="grey")
        mess = Label(fr2, width=40, bg="white")
        mess.pack(side=LEFT, padx=5, pady=5)
        bp = Button(fr2, text="Passe", width=11, command=passe)
        bp.pack(side=RIGHT, padx=5, pady=5)
        fr2.pack()
        #
        fr3 = Frame(fen, bd=2, bg="grey")
        nbb = Label(fr3, text="Blancs : 0", width=16, bg="white", font="Arial 12")
        nbb.pack(side=LEFT, padx=6, pady=5)
        nbn = Label(fr3, text="Noirs : 0", width=16, bg="white", font="Arial 12")
        nbn.pack(side=LEFT, padx=6, pady=5)
        nbr = Label(fr3, text="Reste : 0", width=17, bg="white", font="Arial 12")
        nbr.pack(side=LEFT, padx=6, pady=5)
        fr3.pack()
        #
        self.canvas = canvas
        self.nbb = nbb
        self.nbn = nbn
        self.nbr = nbr
        self.mess = mess

    def comptePions(self):  # Permet de compter le nombre de pions
        global blc, nor, rst
        nbb = self.nbb
        nbn = self.nbn
        nbr = self.nbr
        blc, nor = 0, 0
        for lg in range(1, 7):
            for cl in range(1, 7):
                if tjeu[lg][cl] == 1:
                    blc += 1
                elif tjeu[lg][cl] == 2:
                    nor += 1
        rst = 36 - blc - nor
        nbb.configure(text=("Blancs : " + str(blc)))
        nbn.configure(text=("Noirs : " + str(nor)))
        nbr.configure(text=("Reste : " + str(rst)))

    def clearCanvas(self, canvas):  # Efface la totalité du plateau
        for e in canvas.find_all():
            canvas.delete(e)

    def initJeu(
        self, e
    ):  # Permet de mettre la phase 1 du jeu en place (mettre les 4 premiers jetons sur le plateau, définir tjeu (ie une double liste permettant
        # de colorier les pions d'une certainne couleur en fonction d'un état)
        global tjeu
        can = self.canvas
        mess = self.mess
        tjeu = []
        for i in range(11):
            tjeu.append([9] * 10)
        for y in range(1, 7):
            for x in range(1, 7):
                tjeu[y][x] = 0
        if e == 2:
            tjeu[3][3] = 1
            tjeu[3][4] = 2
            tjeu[4][3] = 2
            tjeu[4][4] = 1
            mess.configure(text=("L'adversaire commence..."))
        else:
            tjeu[3][3] = 2
            tjeu[3][4] = 1
            tjeu[4][3] = 1
            tjeu[4][4] = 2
            mess.configure(text=("Tu commences !"))
        can.delete(ALL)
        y = 1
        for lg in range(1, 7):
            x = 1
            for cl in range(1, 7):
                can.create_rectangle(x, y, x + 59, y + 59)
                can.create_oval(
                    x + 5, y + 5, x + 53, y + 53, fill="grey", outline="grey"
                )
                x += 60
            y += 60
        self.traceGrille()

    def traceGrille(self):
        global tjeu
        for lg in range(1, 7):
            for cl in range(1, 7):
                if tjeu[lg][cl] > 0:
                    self.affichePion(lg, cl)
        self.comptePions()

    def affichePion(self, lg, cl):
        x = (cl - 1) * 60 + 30
        y = (lg - 1) * 60 + 30
        self.canvas.selObject = self.canvas.find_closest(x, y)
        if tjeu[lg][cl] == 1:
            self.canvas.itemconfig(self.canvas.selObject, fill="white", outline="black")
        else:
            self.canvas.itemconfig(self.canvas.selObject, fill="black", outline="black")

    def mouseClic(self, evt):  # Permet de tester si un coup est valide ou non
        "Gestion du clic de la souris"
        global npa, jr, passe
        mess = self.mess
        if c.occupation == 1:
            ty, tx = int(evt.y / 59) + 1, int(evt.x / 59) + 1
            b = 0
            if tjeu[ty][tx] > 0:
                mess.configure(text=("Coup non valide"))
            else:
                if tjeu[ty][tx + 1] == 2:  # à droite
                    nx = tx + 1
                    while tjeu[ty][nx] == 2:
                        nx += 1
                    if tjeu[ty][nx] == 1:
                        b = 1
                        nx = tx + 1
                        while tjeu[ty][nx] == 2:
                            tjeu[ty][nx] = 1
                            self.affichePion(ty, nx)
                            nx += 1
                if tjeu[ty + 1][tx + 1] == 2:  # à droite, en bas
                    ny, nx = ty + 1, tx + 1
                    while tjeu[ny][nx] == 2:
                        ny += 1
                        nx += 1
                    if tjeu[ny][nx] == 1:
                        b = 1
                        ny, nx = ty + 1, tx + 1
                        while tjeu[ny][nx] == 2:
                            tjeu[ny][nx] = 1
                            self.affichePion(ny, nx)
                            ny += 1
                            nx += 1
                if tjeu[ty + 1][tx] == 2:  # en bas
                    ny = ty + 1
                    while tjeu[ny][tx] == 2:
                        ny += 1
                    if tjeu[ny][tx] == 1:
                        b = 1
                        ny = ty + 1
                        while tjeu[ny][tx] == 2:
                            tjeu[ny][tx] = 1
                            self.affichePion(ny, tx)
                            ny += 1
                if tjeu[ty + 1][tx - 1] == 2:  # en bas, à gauche
                    ny, nx = ty + 1, tx - 1
                    while tjeu[ny][nx] == 2:
                        ny += 1
                        nx -= 1
                    if tjeu[ny][nx] == 1:
                        b = 1
                        ny, nx = ty + 1, tx - 1
                        while tjeu[ny][nx] == 2:
                            tjeu[ny][nx] = 1
                            self.affichePion(ny, nx)
                            ny += 1
                            nx -= 1
                if tjeu[ty][tx - 1] == 2:  # à gauche
                    nx = tx - 1
                    while tjeu[ty][nx] == 2:
                        nx -= 1
                    if tjeu[ty][nx] == 1:
                        b = 1
                        nx = tx - 1
                        while tjeu[ty][nx] == 2:
                            tjeu[ty][nx] = 1
                            self.affichePion(ty, nx)
                            nx -= 1
                if tjeu[ty - 1][tx - 1] == 2:  # à gauche, en haut
                    ny, nx = ty - 1, tx - 1
                    while tjeu[ny][nx] == 2:
                        ny -= 1
                        nx -= 1
                    if tjeu[ny][nx] == 1:
                        b = 1
                        ny, nx = ty - 1, tx - 1
                        while tjeu[ny][nx] == 2:
                            tjeu[ny][nx] = 1
                            self.affichePion(ny, nx)
                            ny -= 1
                            nx -= 1
                if tjeu[ty - 1][tx] == 2:  # en haut
                    ny = ty - 1
                    while tjeu[ny][tx] == 2:
                        ny -= 1
                    if tjeu[ny][tx] == 1:
                        b = 1
                        ny = ty - 1
                        while tjeu[ny][tx] == 2:
                            tjeu[ny][tx] = 1
                            self.affichePion(ny, tx)
                            ny -= 1
                if tjeu[ty - 1][tx + 1] == 2:  # en haut, à droite
                    ny, nx = ty - 1, tx + 1
                    while tjeu[ny][nx] == 2:
                        ny -= 1
                        nx += 1
                    if tjeu[ny][nx] == 1:
                        b = 1
                        ny, nx = ty - 1, tx + 1
                        while tjeu[ny][nx] == 2:
                            tjeu[ny][nx] = 1
                            self.affichePion(ny, nx)
                            ny -= 1
                            nx += 1
                if b == 0:
                    mess.configure(text=("Coup non valide"))
                else:
                    tjeu[ty][tx] = 1
                    self.affichePion(ty, tx)
                    self.comptePions()
                    f = testFin()
                    c.Send({"action": "coup", "coup": tjeu, "pseudo": c.nickname})
                    mess.configure(text=("A l'adversaire de jouer"))
                    passe = 0
                    c.occupation = 2
                    if f == 1:
                        c.Send({"action": "end"})
                    else:
                        npa = 0

    def actualiserJoueurs(self, liste):
        #
        canvas = self.zoneListeJoueurs
        self.clearCanvas(canvas)
        canvas.grid_propagate(0)
        #
        canvasDefil = Canvas(
            canvas, width=480, height=800, bg="gray25", scrollregion=(0, 0, 1000, 1000)
        )
        canvasDefil.config(
            bd=0,
            highlightcolor="gray25",
            bg="gray25",
            borderwidth=0,
            highlightthickness=0,
        )
        canvasDefil.update()
        #
        scroll = Scrollbar(canvas, orient="vertical")
        scroll.grid(column=2, row=0, sticky="nse", padx=10)
        scroll.config(command=canvasDefil.yview)

        canvasDefil.config(width=480, height=521)
        canvasDefil.config(yscrollcommand=scroll.set)
        canvasDefil.grid(column=0, row=0, sticky="ew")

        frameDefil = Frame(canvas, width=480, bg="gray25")
        interior_id = canvasDefil.create_window(0, 0, window=frameDefil, anchor=NW)

        def _configure_interior(event):
            size = (frameDefil.winfo_reqwidth(), frameDefil.winfo_reqheight())
            canvasDefil.config(scrollregion="0 0 %s %s" % size)
            if frameDefil.winfo_reqwidth() != canvasDefil.winfo_width():
                canvasDefil.config(width=frameDefil.winfo_reqwidth())

        frameDefil.bind("<Configure>", _configure_interior)

        def _configure_canvas(event):
            if frameDefil.winfo_reqwidth() != canvasDefil.winfo_width():
                canvasDefil.itemconfigure(interior_id, width=canvasDefil.winfo_width())

        canvasDefil.bind("<Configure>", _configure_canvas)

        canvasDefil.grid(column=1, row=0, sticky="ns", padx=68, pady=7)
        scroll.grid(column=1, row=0, sticky="nse")
        #
        #
        liste = sorted(liste, key=lambda joueur: joueur[1])
        #
        joueurs = [i[0] for i in liste]
        points = [str(i[1]) + " Points" for i in liste]
        etat = [i[2] for i in liste]
        #

        fonte = tkFont.Font(family="Arial", size=13)
        l = len(joueurs)
        if self.client.occupation != 0:
            for i in range(l):
                Label(
                    frameDefil,
                    text=joueurs[i],
                    bd=0,
                    width=16,
                    font=fonte,
                    bg="gray25",
                    fg="white",
                ).grid(row=l - i, pady=2, column=1, sticky="ew")
                Label(
                    frameDefil,
                    text=points[i],
                    bd=0,
                    width=16,
                    font=fonte,
                    bg="gray25",
                    fg="white",
                ).grid(row=l - i, pady=2, column=2)
                Button(
                    frameDefil,
                    text="Inviter",
                    width=10,
                    bg="white",
                    fg="gray",
                    command=lambda i=i: showwarning(
                        "Pseudo invalide", "Désolé, mais une partie à la fois."
                    ),
                ).grid(row=l - i, padx=2, pady=3, column=0)

        else:
            for i in range(l):
                Label(
                    frameDefil,
                    text=joueurs[i],
                    bd=0,
                    width=16,
                    font=fonte,
                    bg="gray25",
                    fg="white",
                ).grid(row=l - i, pady=2, column=1, sticky="ew")
                Label(
                    frameDefil,
                    text=points[i],
                    bd=0,
                    width=16,
                    font=fonte,
                    bg="gray25",
                    fg="white",
                ).grid(row=l - i, pady=2, column=2)
                if etat[i] == 0:
                    Button(
                        frameDefil,
                        text="Inviter",
                        width=10,
                        bg="white",
                        fg="green",
                        command=lambda i=i: self.client.demandePartie(joueurs[i]),
                    ).grid(row=l - i, padx=2, pady=3, column=0)
                else:
                    Button(
                        frameDefil,
                        text="Inviter",
                        width=10,
                        bg="white",
                        fg="red",
                        command=lambda i=i: showwarning(
                            "Pseudo invalide",
                            "Désolé, mais {0} est occupé(e).".format(joueurs[i]),
                        ),
                    ).grid(row=l - i, padx=2, pady=3, column=0)


texp = []  # table d'evaluation des cases
nbex = 0  # nbre de cases jouables
tjeu = []  # tableau du jeu
blc, nor, rst = 2, 2, 32  # nbre de pions blancs, noirs et restant à jouer
jr, npa = 1, 0


# can.bind("<Button-1>",mouseClic)
# Quit=Button(fen,text='Quitter',command = c.quit)
# Quit.pack(side=BOTTOM)

# first loop to say to the server that I exist
c.Loop()
