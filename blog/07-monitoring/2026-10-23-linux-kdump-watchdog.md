---
title: "Linux : kdump, watchdog et redémarrage après un crash"
description: "Rendre un crash noyau observable et récupérable sur un serveur sans console : kdump et son noyau de capture, piège des montages obligatoires, sysctl qui transforment les blocages en panics, watchdog matériel piloté par systemd, alerte Prometheus au redémarrage, validation par un panic volontaire et lecture de la trace."
tags: [monitoring, devops]
---

Un serveur qui plante sans laisser de trace ne donne aucune piste de diagnostic. Dans le cas traité ici, un serveur domestique sous Ubuntu, sans écran ni clavier, s'est arrêté trois fois en quelques jours ; à chaque fois, le journal système s'interrompait net, sans message d'erreur, et la machine restait figée jusqu'à un appui sur le bouton d'alimentation. Trois problèmes se posent alors : capturer la cause du crash, faire redémarrer la machine sans intervention, et être prévenu qu'un redémarrage a eu lieu. Cet article décrit la chaîne qui répond aux trois, kdump, sysctl de panic, watchdog matériel et alerte Prometheus, puis la façon de la valider avant le prochain crash.

<!--truncate-->

## Pourquoi le journal reste muet

Lors d'un *kernel panic*, le noyau s'arrête au moment où il détecte une erreur dont il ne peut pas se remettre. Le message de panic est écrit dans le tampon du noyau, en mémoire, mais plus aucun processus ne tourne pour le recopier sur disque : journald, comme le reste de l'espace utilisateur, est arrêté. Au redémarrage, le tampon est perdu. Le journal du démarrage précédent (`journalctl -b -1`) se termine donc sur une ligne ordinaire, sans rien de ce qui a provoqué l'arrêt.

Lire la trace demande de l'écrire avant que la mémoire ne soit perdue, par un mécanisme qui fonctionne alors que le noyau principal ne fonctionne plus.

## kdump : un second noyau pour écrire la trace

kdump réserve au démarrage une zone de mémoire (paramètre `crashkernel=` du noyau) et y charge à l'avance, par `kexec`, un second noyau dit *de capture*. Au moment du panic, le noyau principal saute directement dans ce noyau de capture, sans passer par le BIOS : la mémoire du noyau planté reste intacte. Le noyau de capture démarre un système minimal, copie la mémoire utile et le tampon de messages sur disque, puis redémarre la machine.

```text
fonctionnement normal          panic                        noyau de capture
┌───────────────────┐          │                          ┌──────────────────────┐
│ noyau principal   │──────────┘ kexec, sans BIOS ───────>│ écrit dmesg et dump  │
│ zone crashkernel  │                                     │ dans /var/crash/     │
│ (réservée, vide)  │                                     │ puis reboot          │
└───────────────────┘                                     └──────────────────────┘
```

Sur Ubuntu, le paquet `kdump-tools` (installé par `linux-crashdump`) configure la réservation et le chargement. L'état se vérifie par :

```bash
kdump-config status    # "current state: ready to kdump"
kdump-config show      # réservation, noyau de capture, répertoire des dumps
```

Après un crash, `/var/crash/<AAAAMMJJHHMM>/` contient deux fichiers : `dump.<date>`, l'image mémoire filtrée par `makedumpfile`, et `dmesg.<date>`, le tampon de messages du noyau planté. Le second suffit dans la plupart des cas : il contient la trace d'appels du panic et le nom du module en cause.

### Piège : le noyau de capture et les montages obligatoires

Le noyau de capture démarre avec une ligne de commande réduite (variable `KDUMP_CMDLINE_APPEND` de kdump-tools) : un seul CPU, réinitialisation des périphériques et, par défaut, USB désactivé (`usbcore.nousb`). Il lit pourtant le même `/etc/fstab` que le système normal. Sur ce serveur, une baie de disques branchée en USB était montée sans l'option `nofail` : introuvable dans le noyau de capture, son montage échouait, systemd basculait en mode `emergency`, et le dump n'était jamais écrit. La machine restait bloquée, exactement comme sans kdump.

L'option `nofail` dans `/etc/fstab` rend le montage facultatif :

```text
UUID=<uuid-du-système-de-fichiers>  /mnt/data  ext4  defaults,nofail  0  2
```

Elle a un effet de bord : en fonctionnement normal, un disque absent ne bloque plus le démarrage, et un service qui écrit dans le point de montage écrirait alors dans le répertoire vide du disque système. Une dépendance systemd sur le montage protège les services concernés, ici Docker :

```ini
# systemctl edit docker.service
[Unit]
RequiresMountsFor=/mnt/data
```

Retirer `usbcore.nousb` de la ligne de commande du noyau de capture est l'autre solution ; elle charge le pilote USB dans un noyau dont la mémoire est volontairement réduite, et conserve un démarrage bloquant si le disque est réellement absent.

## Transformer les blocages en panics

kdump ne se déclenche que sur un panic. Plusieurs pannes du noyau n'en provoquent pas par défaut : le système reste alors bloqué, sans trace. Quatre paramètres sysctl changent ce comportement :

```ini
# /etc/sysctl.d/99-autoreboot.conf
kernel.panic = 10
kernel.panic_on_oops = 1
kernel.softlockup_panic = 1
kernel.hardlockup_panic = 1
```

| Paramètre | Effet |
| --- | --- |
| `kernel.panic = 10` | Redémarre 10 s après un panic ; à 0, la machine reste figée indéfiniment. Utile si kdump n'est pas chargé. |
| `kernel.panic_on_oops = 1` | Un *oops* (erreur du noyau dont il tente de se remettre) devient un panic, donc une trace kdump. La valeur par défaut dépend de la distribution. |
| `kernel.softlockup_panic = 1` | Un CPU qui reste trop longtemps en mode noyau sans laisser tourner d'autre tâche provoque un panic. |
| `kernel.hardlockup_panic = 1` | Un CPU qui ne traite plus les interruptions provoque un panic. |

`kernel.hung_task_panic` déclenche un panic quand des tâches restent bloquées en attente d'entrée-sortie. Il n'est volontairement pas activé ici : une simple lenteur du stockage, par exemple pendant la reconstruction d'un RAID sur des disques USB, redémarrerait la machine.

## Watchdog matériel : couvrir les gels complets

Certains gels bloquent la machine sans que le noyau puisse détecter quoi que ce soit, donc sans panic. Le watchdog matériel, un compteur intégré au chipset, couvre ce cas : il redémarre la machine s'il n'est pas réarmé régulièrement. systemd sait le piloter :

```ini
# /etc/systemd/system.conf.d/watchdog.conf
[Manager]
RuntimeWatchdogSec=2min
RebootWatchdogSec=10min
```

`RuntimeWatchdogSec` arme le watchdog pendant le fonctionnement normal : systemd le réarme au moins une fois par demi-intervalle, et si le noyau ou systemd ne répondent plus pendant deux minutes, le matériel provoque un reset. `RebootWatchdogSec` couvre un redémarrage qui se bloquerait en cours de route. Les deux réglages sont sans effet si aucun pilote de watchdog n'est chargé.

### Piège : un pilote en liste noire

Ubuntu place les pilotes de watchdog en liste noire, pour qu'un watchdog ne soit pas armé sans configuration explicite. Ajouter le module dans `/etc/modules-load.d/` ne suffit pas : `systemd-modules-load` respecte la liste noire et le refuse (`Module 'sp5100_tco' is deny-listed`, pour le watchdog des chipsets AMD). Un `modprobe` explicite, lui, charge un module en liste noire : la liste noire ne s'applique qu'au chargement automatique. Une petite unité systemd de type `oneshot` exécute donc `modprobe sp5100_tco` au démarrage.

Le moment compte. Le module doit être chargé pendant la transaction de démarrage initiale : chargé plus tard, il n'a pas été pris en compte par systemd sur ce serveur. L'unité se place donc avant `sysinit.target` (`Before=sysinit.target`, activée par `WantedBy=sysinit.target`) et renonce aux dépendances par défaut (`DefaultDependencies=no`), qui la feraient attendre la fin de l'initialisation de base. Activée dans `sysinit.target`, l'unité tourne aussi dans le système minimal du noyau de capture.

Une machine bloquée en mode `emergency` échappe au watchdog : systemd y fonctionne et continue de le réarmer. L'option `nofail` vue plus haut reste donc nécessaire. L'état du watchdog se lit dans `/sys/class/watchdog/watchdog0/` : `timeleft` donne le temps restant avant reset, et `bootstatus` non nul indique que le dernier redémarrage a été provoqué par le watchdog.

## Être prévenu d'un redémarrage

Un serveur qui redémarre seul après un crash peut le faire sans que personne ne le remarque. Le node exporter de Prometheus expose l'heure du dernier démarrage (`node_boot_time_seconds`), et une règle d'alerte transmise par [Alertmanager](./2026-09-20-prometheus-alertmanager.md) signale tout démarrage récent :

```promql
(time() - node_boot_time_seconds) < 900
```

L'alerte reste active quinze minutes après chaque démarrage, prévu ou non. Sa description oriente le diagnostic : un dump dans `/var/crash` désigne un panic, un `bootstatus` de watchdog non nul sans dump désigne un gel complet.

## Valider la chaîne par un panic volontaire

Le noyau permet de provoquer un panic à la demande par l'interface *SysRq* :

```bash
sudo sh -c 'sync; sleep 2; sync; echo c > /proc/sysrq-trigger'
```

`c` déclenche un crash immédiat ; les `sync` préalables limitent les écritures perdues. L'écriture dans `/proc/sysrq-trigger` est toujours permise à root, quelle que soit la valeur de `kernel.sysrq`, qui ne concerne que le clavier. Sur ce serveur, le test a produit un dump dans `/var/crash`, un redémarrage automatique, le retour de tous les services et l'alerte de redémarrage, en une quarantaine de secondes et sans intervention. Le dossier du test est à noter, pour ne pas le prendre plus tard pour un vrai crash.

## Lire la trace

Au crash suivant, `dmesg.<date>` désignait le pilote du GPU intégré : une régression connue en amont, arrivée avec une mise à jour du noyau de la distribution et déclenchée par le transcodage vidéo matériel d'un serveur multimédia. Le transcodage matériel a été désactivé en attendant un noyau corrigé.

Quelques points de lecture :

- La première ligne utile est souvent `BUG:` ou `Oops:`, suivie de la trace d'appels (`Call Trace:`) et de la liste des modules chargés ; le module en cause apparaît dans la trace.
- `makedumpfile` peut avertir que la version du noyau n'est pas supportée : l'image mémoire est alors partielle, mais le `dmesg` reste complet.
- Un redémarrage sans dump mais avec un `bootstatus` de watchdog non nul indique un gel complet, que kdump ne voit pas.

## Limites

- **La mémoire réservée est perdue.** La zone `crashkernel` (quelques centaines de Mo selon la taille de la RAM) n'est jamais utilisée en fonctionnement normal.
- **Le noyau de capture peut échouer.** Il démarre sur un matériel dans un état incertain ; un pilote qui refuse de s'initialiser ou un montage qui bloque empêche l'écriture du dump. D'où l'intérêt du test volontaire, à refaire après un changement de noyau ou de stockage.
- **Le redémarrage automatique masque la panne.** Sans l'alerte au redémarrage, une machine qui plante et repart chaque nuit paraît en bonne santé.
- **Le dump occupe le disque.** Chaque crash écrit une image mémoire dans `/var/crash` ; les anciens dossiers sont à supprimer une fois analysés.

## Conclusion

Quatre mécanismes se complètent. kdump écrit la trace d'un panic que le journal ne peut pas conserver ; les sysctl transforment les blocages du noyau en panics, donc en traces ; le watchdog matériel couvre les gels que le noyau ne détecte pas ; l'alerte au redémarrage rend visible une récupération automatique qui passerait sinon inaperçue. Le piège commun est le démarrage du noyau de capture lui-même, qui partage la configuration du système sans en avoir tous les pilotes : un montage obligatoire suffit à le bloquer. Un panic volontaire valide la chaîne avant qu'un vrai crash n'en ait besoin.

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/personnel/homelab" title="HomeLab">Diagnostic de kernel panics à répétition sans trace : kdump et montage de la baie de disques en nofail, sysctl de panic, watchdog matériel armé par systemd, alerte Prometheus à chaque redémarrage, chaîne validée par un panic volontaire, cause identifiée dans le pilote GPU.</ProjectLink>
</ProjectLinks>
