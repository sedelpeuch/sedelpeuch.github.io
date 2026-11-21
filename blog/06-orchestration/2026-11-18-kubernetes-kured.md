---
title: "Kubernetes : redémarrages automatiques avec Kured"
description: "Kured redémarre les nœuds d'un cluster Kubernetes après une mise à jour du noyau, un nœud à la fois et seulement quand le cluster est sain. Son mécanisme, ses réglages décisifs et les pièges du stockage répliqué."
tags: [orchestration, monitoring, devops]
---

Sur Ubuntu, `unattended-upgrades` installe chaque nuit les correctifs de sécurité, noyau compris, mais ne redémarre pas la machine : le nouveau noyau n'est chargé qu'au prochain démarrage. Sur un cluster, le redémarrage reste donc à la charge de l'administrateur, qui le fait par lots quand il y pense. Pendant ce temps, les nœuds tournent des semaines sur un noyau vulnérable. Redémarrer un nœud Kubernetes proprement demande pourtant toujours les mêmes gestes : le marquer non planifiable, l'évacuer, le redémarrer, le remettre en service, et ne passer au suivant qu'une fois le cluster revenu en bonne santé. Kured (*KUbernetes REboot Daemon*), projet de la CNCF, automatise cette séquence.

<!--truncate-->

## Le signal : le fichier sentinelle

Quand un paquet installé exige un redémarrage, Debian et Ubuntu créent le fichier `/var/run/reboot-required`, accompagné de `reboot-required.pkgs` qui liste les paquets en cause. `unattended-upgrades` sait redémarrer seul (`Unattended-Upgrade::Automatic-Reboot`, désactivé par défaut), mais chaque nœud le ferait à l'heure fixée, sans évacuer ses pods ni se soucier de ses voisins : plusieurs nœuds pourraient tomber en même temps.

Kured lit ce même fichier, appelé sentinelle. Il ne déclenche aucune mise à jour : l'installation reste du ressort du gestionnaire de paquets, Kured ne fait que décider du moment du redémarrage. Sur une distribution qui ne crée pas de fichier sentinelle, `--reboot-sentinel-command` remplace le test du fichier par une commande, par exemple `needs-restarting -r` sur la famille Red Hat.

Le même fichier peut alimenter une alerte Prometheus sur les nœuds qui attendent un redémarrage depuis plusieurs jours, comme décrit dans [Prometheus : alertes d'un cluster Kubernetes](../07-monitoring/2026-10-11-prometheus-alertes-kubernetes.md). Avec Kured en place, cette alerte désigne un nœud que Kured n'arrive pas à redémarrer.

## Fonctionnement

Kured est un DaemonSet : un pod par nœud, qui surveille le fichier sentinelle de son propre nœud. Son cycle tient en quelques étapes :

```text
toutes les --period (avec un décalage aléatoire propre à chaque pod) :
  sentinelle absente, hors fenêtre ou alerte bloquante  → attendre
  prendre le verrou du cluster (annotation sur le DaemonSet)
  cordon + drain → redémarrage du nœud
au démarrage du pod sur le nœud revenu : uncordon, puis libération du verrou
```

Le pod a besoin de privilèges élevés pour redémarrer l'hôte : le chart officiel le lance avec `hostPID` et une commande exécutée dans l'espace de noms de l'hôte (`/bin/systemctl reboot` par défaut). Le drain passe par l'API Kubernetes, avec les mêmes règles qu'un `kubectl drain` : les [PodDisruptionBudget](./2026-04-03-kubernetes-haute-disponibilite-pdb.md) sont respectés, les pods des DaemonSets restent en place.

Un nœud peut être exclu en n'y plaçant pas le DaemonSet. Le nœud de plan de contrôle d'un cluster kubeadm, qui porte etcd et l'API, se prête mal à un redémarrage sans surveillance quand il est seul : une `nodeAffinity` sur l'absence du label `node-role.kubernetes.io/control-plane` le laisse à la main.

## La fenêtre de maintenance

Par défaut, Kured peut redémarrer tous les jours, à toute heure, en UTC, et vérifie la sentinelle toutes les heures. `--reboot-days` restreint les jours, `--start-time` et `--end-time` bornent les heures, et `--time-zone` les rapporte à l'heure locale. Le jour s'apprécie au moment du redémarrage : `mo,tu,we,th` avec une plage de `1am` à `6am` couvre les nuits du dimanche au lundi jusqu'à celle du mercredi au jeudi. Cette dernière option accepte un nom de la base tz (`Europe/Paris`), ce qui garde la fenêtre à la même heure locale après un changement d'heure. La fenêtre prise en exemple exclut la fin de semaine, quand personne ne surveille le cluster, et se ferme avant les tâches automatiques du matin.

La taille de la fenêtre se calcule d'après le nombre de nœuds à traiter. Comme un seul nœud redémarre à la fois, une nuit traite au plus `durée de la fenêtre / durée d'un cycle` nœuds, et le cycle ne se résume pas au redémarrage : il inclut le retour à la santé du stockage, qui peut prendre plusieurs heures (voir plus bas). Une fenêtre trop étroite laisse des nœuds en attente d'une semaine sur l'autre. `--period` fixe la granularité : avec la valeur par défaut d'une heure, une fenêtre de trois heures ne laisse que trois occasions de démarrer un cycle, d'où une période plus courte (`15m`) sur une fenêtre de nuit.

## Un nœud à la fois : le verrou

Les pods Kured se coordonnent par une annotation posée sur leur propre DaemonSet, `weave.works/kured-node-lock`. Un pod qui veut redémarrer son nœud écrit son nom dans l'annotation. Si elle est déjà prise, il attend le prochain passage. `--concurrency` (1 par défaut) fixe le nombre de nœuds autorisés à la fois.

Deux options règlent la façon de rendre le verrou.

`--lock-release-delay` garde le verrou un moment après le retour du nœud. Sans ce délai, le nœud suivant peut démarrer son cycle avant que Prometheus n'ait relevé les conséquences du premier redémarrage, comme des volumes en cours de reconstruction. Dix minutes couvrent quelques intervalles de collecte et d'évaluation des règles.

`--lock-ttl` fait expirer le verrou ; il est désactivé par défaut. Sans expiration, un nœud qui ne revient pas garde le verrou indéfiniment et bloque tous les redémarrages suivants. C'est le comportement souhaité : un nœud perdu demande une intervention humaine, et redémarrer le suivant aggraverait la panne.

Le verrou sert aussi à suspendre Kured avant une opération qui ne supporte pas la perte d'un nœud. L'annotation se pose alors à la main, avec un identifiant fictif :

```bash
kubectl -n kube-system annotate ds kured weave.works/kured-node-lock='{"nodeID":"manual"}'
```

Sans `--overwrite`, la commande échoue si un nœud tient déjà le verrou, ce qui évite de le lui retirer en plein redémarrage. La reprise retire l'annotation (`weave.works/kured-node-lock-`), après avoir vérifié qu'il s'agit bien du verrou manuel.

## Ne pas redémarrer un cluster malade : les alertes bloquantes

Avec `--prometheus-url`, Kured interroge Prometheus avant chaque redémarrage. Par défaut, la présence de n'importe quelle alerte active, en attente (*pending*) ou déclenchée (*firing*), bloque le redémarrage. Le blocage ne dépend pas du nœud : une seule requête porte sur toutes les alertes, donc une alerte sur une application bloque les redémarrages de tout le cluster.

Ce comportement par défaut tient mal sur un cluster réel, où certaines alertes restent actives en permanence pour des raisons sans rapport avec la santé des nœuds : un débit internet faible, une application en panne dans un coin. La plus piégeuse est l'alerte « redémarrage en attente » elle-même, que seul un redémarrage fait disparaître : la documentation de Kured prévient du blocage mutuel qu'elle provoque. La liste blanche décrite plus bas l'écarte d'office. Une erreur de requête bloque aussi : si Prometheus ne répond pas, Kured journalise un avertissement et ne redémarre rien.

`--alert-filter-regexp` exclut les alertes dont le nom correspond à une expression. `--alert-filter-match-only` inverse la logique : seules les alertes qui correspondent bloquent. Avec une liste d'exclusion, toute alerte ajoutée plus tard bloque les redémarrages tant que personne ne l'a ajoutée à la liste. La liste blanche ne retient que les alertes qui disent que le socle n'est pas en état de perdre un nœud : un nœud indisponible (`NodeNotReady`), un volume Longhorn en panne ou dégradé (`LonghornVolumeFaulted`, `LonghornVolumeDegraded`), un volume ou un système de fichiers plein (`KubePersistentVolumeFull`, `NodeFilesystemFull`). L'expression régulière les ancre entre `^(` et `)$`, sans quoi une alerte au nom plus long qui contient l'un de ces noms bloquerait aussi.

La liste se limite aux nœuds et au stockage, parce que le blocage vaut pour tout le cluster. Une alerte de réplicas manquants sur un Deployment, par exemple, suspendrait tous les redémarrages pour une application cassée qui ne dépend pas du redémarrage d'un nœud. Les alertes en attente bloquent tant que `--alert-firing-only` reste désactivé, et c'est souhaitable : une alerte qui vient de passer en attente signale déjà un problème, même si sa clause `for` n'est pas écoulée.

Après un redémarrage, Longhorn reconstruit les réplicas des volumes qui avaient une copie sur le nœud ; tant que la reconstruction dure, `LonghornVolumeDegraded` reste active et retient le nœud suivant. Le rythme réel des redémarrages est donc fixé par le stockage, bien plus que par `--period`. Sur un cluster où certains volumes mettent plusieurs heures à se reconstruire, un redémarrage peut consommer toute la nuit.

Kured lit les alertes dans Prometheus, pas dans Alertmanager. Les silences et les `mute_time_intervals` d'Alertmanager n'ont donc aucun effet sur les blocages. Cela permet de couper les notifications provoquées par les redémarrages pendant la fenêtre (nœud indisponible, pods en attente) sans affaiblir le contrôle de Kured. Encore faut-il que la fenêtre de mise en sourdine suive la fenêtre de Kured : décaler l'une sans l'autre ramène les notifications nocturnes.

## Les pods qui bloquent un nœud

`--blocking-pod-selector` empêche le redémarrage d'un nœud tant qu'un pod correspondant y tourne. Contrairement aux alertes, ce blocage est local : Kured ne regarde que les pods programmés sur son propre nœud, et les pods terminés ne comptent pas. Les virgules d'un même sélecteur se combinent en ET ; répéter l'option combine les sélecteurs en OU.

Le sélecteur convient aux traitements courts et ponctuels qui tombent dans la fenêtre, comme une sauvegarde de nuit : le nœud attend la fin du Job et redémarre au passage suivant. Il ne convient pas aux pods permanents. Des runners de CI gardés au repos en permanence, par exemple, sont toujours présents : un sélecteur sur eux bloquerait leurs nœuds pour toujours, puisque Kured ne distingue pas un runner occupé d'un runner inactif. Pour ces pods, le drain les évince, au risque de couper un job lancé pendant la fenêtre.

## Drain et volumes à copie unique

`--drain-timeout`, infini par défaut, borne la durée du drain. Si le drain échoue ou dépasse ce délai, Kured ne redémarre pas, sauf avec `--force-reboot` : un redémarrage forcé coupe les pods que le drain n'a pas pu évincer proprement. Sans cette option, le nœud est remis en service et Kured réessaie au passage suivant.

Le stockage répliqué bloque souvent le drain. [Longhorn](./2026-09-27-kubernetes-longhorn.md) protège ses volumes par des PodDisruptionBudget posés sur ses `instance-manager`, réglés par l'option `node-drain-policy`. La valeur par défaut, `block-if-contains-last-replica`, bloque le drain d'un nœud qui porte la dernière copie saine d'un volume. Pour un volume à une seule copie, par exemple un volume en localité stricte (`dataLocality: strict-local`) qui garde son unique réplica sur le nœud de son pod, cette condition est toujours vraie : le nœud ne se vide jamais, et Kured dépasse son délai nuit après nuit.

`allow-if-replica-is-stopped` autorise le drain dès que cette dernière copie est arrêtée, c'est-à-dire une fois le pod qui utilise le volume évincé. Les données restent sur le disque du nœud et le pod, lié à ce nœud par son volume, attend son retour pour redémarrer. La documentation de Longhorn signale la contrepartie : si le nœud ne revient jamais, ces données sont perdues. Le réglage suppose donc que ces volumes à copie unique soient protégés autrement, par la réplication propre à l'application ou par des sauvegardes. Les valeurs `block-for-eviction` déplacent les réplicas avant le drain, ce qui rallonge le cycle d'une copie complète des données et ne convient pas à un volume dont l'unique copie doit rester sur le nœud de son pod.

Le service porté par ces volumes est indisponible le temps du redémarrage. Un stockage objet distribué sans réplication des objets (Garage configuré avec un seul exemplaire, par exemple) répartit les données entre ses nœuds : pendant le redémarrage de l'un d'eux, les écritures qui lui reviennent échouent quelques minutes. Un client qui réessaie s'en remet, ce qui justifie une fenêtre de nuit.

## Notifications

`--notify-url` envoie un message au début du drain, au redémarrage et à la remise en service, à travers la bibliothèque shoutrrr : une URL `slack://`, `teams://`, `smtp://` ou autre désigne le canal. `--slack-hook-url` est déprécié au profit de cette option. Les messages se personnalisent avec `--message-template-drain`, `--message-template-reboot` et `--message-template-uncordon`, où `%s` reçoit le nom du nœud.

L'URL contient un secret. Passée en argument, elle apparaît dans la spécification du DaemonSet et dans les valeurs de la release Helm, lisibles par quiconque peut lire ces objets. Kured lit aussi ses options dans des variables d'environnement préfixées `KURED_`. Le chart en déclare par `extraEnvVars`, où `KURED_NOTIFY_URL` peut venir d'une clé de Secret (`secretKeyRef`) : l'URL n'apparaît plus en clair dans la spécification du DaemonSet.

## Limites

Kured ne gère que le redémarrage. La montée de version de Kubernetes elle-même (kubeadm, kubelet) suit sa propre procédure, nœud par nœud.

La santé dont Kured tient compte se limite à ce que les alertes mesurent. Un problème sans alerte ne bloque rien : une resynchronisation de stockage encore en cours après un changement de topologie, par exemple, n'empêche pas le redémarrage suivant. Avant ce type d'opération, Kured se suspend par le verrou manuel.

Prometheus devient une dépendance des redémarrages : une panne de Prometheus les suspend tous, ce qui protège le cluster mais laisse les nœuds sur l'ancien noyau tant que la supervision n'est pas rétablie.

## Alternatives

Le redémarrage automatique d'`unattended-upgrades` est la solution la plus courte, mais chaque nœud redémarre à l'heure fixée sans drain ni coordination avec les autres : sur un cluster, plusieurs nœuds peuvent tomber ensemble.

Le correctif à chaud du noyau (Livepatch chez Canonical, kpatch chez Red Hat) applique certains correctifs de sécurité sans redémarrer. Il ne couvre que les vulnérabilités critiques pour lesquelles un correctif à chaud est publié, et le redémarrage finit par revenir à la mise à jour suivante du noyau ; il réduit la fréquence des redémarrages sans les supprimer.

Les distributions immuables conçues pour Kubernetes (Talos, Flatcar avec son opérateur de mise à jour) intègrent la mise à jour et le redémarrage coordonné dans leur propre outillage. Elles supposent de reconstruire les nœuds sur un autre système d'exploitation, un choix qui se fait à la création d'un cluster ; sur des nœuds Debian ou Ubuntu existants, Kured ajoute la coordination sans toucher au système.

## Conclusion

Kured convient aux clusters dont les nœuds reçoivent leurs mises à jour du gestionnaire de paquets et dont le stockage supporte la perte temporaire d'un nœud. Son coût tient moins à l'installation qu'aux interactions avec le reste du cluster : la supervision décide du moment des redémarrages et le stockage de leur rythme, si bien qu'une fenêtre ou une liste d'alertes mal dimensionnée suffit à laisser des nœuds des semaines sur l'ancien noyau, comme sans Kured.

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/professionnel/sonu-k8s-cluster" title="Cluster Kubernetes interne cluster interne">Redémarrage automatique des workers après les mises à jour du noyau, les nuits de semaine : alertes bloquantes limitées aux nœuds, à Longhorn et au stockage objet, sauvegardes de nuit protégées par sélecteur de pods, règle de drain Longhorn adaptée aux volumes à copie unique, notifications Slack.</ProjectLink>
</ProjectLinks>
