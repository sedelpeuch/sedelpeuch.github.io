---
title: "GitHub Actions : tests de simulation sur Kubernetes"
description: "Lancer des campagnes de simulation lourdes depuis GitHub Actions sous forme de Jobs Kubernetes : trois niveaux de test face à des résultats bruités, un workflow par déclencheur, Job construit depuis le chart rendu, identité et droits sur le cluster, plafond de capacité, annulation, verdict lu dans le message de fin du pod, noms et rétention des runs."
tags: [cicd, devops]
---

Certains tests ne tiennent pas dans un runner de CI. Dans le cas traité ici, un logiciel robotique est validé par une simulation physique headless : chaque scénario démarre un simulateur, joue une situation et enregistre ce que le logiciel a fait, et une campagne complète occupe une dizaine de CPU pendant plus d'une heure. Ces campagnes tournaient déjà sur un cluster Kubernetes, sous forme de Jobs lancés à la main depuis un service web, si bien qu'une régression pouvait atteindre la branche principale sans que personne ne pense à lancer un run. Les brancher sur les pull requests pose plusieurs questions : que bloquer quand les résultats sont bruités, comment donner à la CI le droit de créer des Jobs sans lui donner plus, comment partager une capacité limitée, et comment récupérer un verdict. Cet article décrit les choix faits pour chacune.

<!--truncate-->

## Trois niveaux face à des résultats bruités

Une simulation physique n'est pas parfaitement reproductible : à graine aléatoire égale, l'issue d'un scénario peut changer d'un run à l'autre, selon l'ordonnancement des processus et la charge de la machine. Un taux de réussite mesuré sur quelques dizaines de scénarios ne permet donc pas de distinguer une régression du bruit. Bloquer une pull request sur ce taux produirait des échecs aléatoires.

La réponse est de séparer ce qui bloque de ce qui informe :

| Niveau | Déclencheur | Taille | Rôle |
| --- | --- | --- | --- |
| Fumée | Chaque pull request qui touche le code simulé | Quelques dizaines de scénarios, une dizaine de minutes | Barrière, sur les seules pannes grossières |
| Campagne complète | Étiquette posée sur la pull request | Toute la campagne, plus d'une heure | Information, comparée à la référence |
| Référence | Chaque fusion sur `main` qui touche le code simulé | Toute la campagne | Base de comparaison par défaut |

Le test de fumée échoue seulement sur ce que le bruit n'explique pas : run qui plante, logiciel qui ne produit aucune action sur l'ensemble des scénarios, proportion anormale de scénarios invalides (simulation trop lente pour la machine). La campagne complète ne bloque rien : un correctif est fait pour changer le comportement, et une personne lit la comparaison avec la référence de `main`.

## Un workflow par déclencheur

### La fumée dans le workflow principal

Le test de fumée tourne dans le workflow qui construit l'image, sur l'événement `pull_request`. Un `paths-ignore` écarte d'emblée les pull requests qui ne touchent que la documentation, et un job préalable vérifie que le code simulé a bien changé (voir plus bas). Le job de fumée attend que l'image soit construite, prépare l'accès au cluster, puis appelle le lanceur en trois temps : `launch` crée le Job et renvoie son identifiant, `wait` le suit jusqu'à sa fin et rend le verdict, et une dernière étape, conditionnée par `if: cancelled()`, supprime le Job si GitHub annule le run.

L'annulation dépend de la branche, ce que le groupe de concurrence exprime directement :

```yaml
concurrency:
  group: sim-${{ github.ref }}
  cancel-in-progress: ${{ github.event_name == 'pull_request' }}
```

Sur une pull request, un nouveau push annule le run en cours. Sur `main`, le run n'est jamais annulé : le même workflow y déploie le service par Helm, et un `helm upgrade` interrompu laisse la release dans l'état `pending-upgrade`, qui bloque le déploiement suivant. La condition sur `head.repo.full_name` saute les pull requests venues d'une fourche, qui n'ont pas accès aux secrets du dépôt.

Pour une pull request, `github.sha` est le commit de fusion de la branche dans sa base : le test porte sur le résultat de la fusion, pas sur la tête de la branche, ce qui est le comportement recherché.

### La campagne complète dans son propre workflow

Le déclencheur naturel de la campagne complète est l'étiquette, `pull_request` de type `labeled`. La mettre dans le workflow principal crée un piège : poser n'importe quelle étiquette relance ce workflow, dont tous les jobs sont alors sautés par leurs conditions. Or un job sauté publie un check au statut *skipped*, que GitHub traite comme un succès. Ce check porte le même nom que celui du run précédent et le remplace sur la pull request : un test de fumée rouge redevient vert parce que quelqu'un a posé une étiquette.

La campagne complète a donc son propre workflow, déclenché par `types: [labeled]`, avec ses propres noms de jobs. Son premier job ne s'exécute que pour la bonne étiquette (`if: github.event.label.name == 'sim'`) et lance la campagne sans attendre sa fin. Le groupe de concurrence inclut le nom de l'étiquette (`sim-full-${{ github.ref }}-${{ github.event.label.name }}`) : reposer l'étiquette remplace la campagne en cours, poser une autre étiquette ne l'annule pas.

Un second job, `report`, tourne ensuite dans tous les cas sauf l'annulation (`!cancelled()`). Il commente la pull request avec les liens vers le suivi en direct et vers la comparaison, puis retire l'étiquette, même en cas d'échec : la reposer relance une campagne. Le commentaire porte un marqueur HTML invisible (`<!-- sim-ci -->`) qui permet de le retrouver et de le mettre à jour au lieu d'en empiler un par campagne.

### La référence de `main` par `workflow_run`

La référence se lance après chaque fusion, une fois l'image construite et le service déployé. La placer dans le workflow principal ferait attendre le run suivant de `main`, puisque le lancement peut rester plusieurs heures en file d'attente. Un workflow séparé, déclenché par la fin du workflow principal, évite ce blocage :

```yaml
on:
  workflow_run:
    workflows: [sim]
    types: [completed]
    branches: [main]
```

Le job ne démarre que si le run déclencheur a réussi (`workflow_run.conclusion == 'success'`) : une image non construite ou un déploiement raté ne donne pas de référence. Son groupe de concurrence est indexé sur le commit (`workflow_run.head_sha`) et n'annule jamais rien, ce qui garantit que chaque fusion obtient sa référence. Le filtre `branches: [main]` porte sur le nom de la branche : une pull request venue d'une fourche, depuis une branche qui s'appelle elle aussi `main`, le satisfait. Le job vérifie donc aussi que le run vient du dépôt lui-même (`workflow_run.head_repository`) et d'un push, ce qui écarte ce cas.

### Quand le code simulé a-t-il changé ?

Le filtre de chemins décide si un run est utile. Sur une pull request, la comparaison se fait avec sa base. Sur `main`, comparer au commit précédent est faux : un run annulé pendant son attente, ou en échec, n'a lancé aucune référence, et les changements qu'il portait seraient oubliés. La base de comparaison est donc le commit du dernier run réussi de `main`, retrouvé par l'API (`listWorkflowRuns` filtré sur `status: success`).

## Lancer un Job depuis la CI

### Un seul manifeste de Job

Le service web construisait déjà le manifeste du Job de simulation : image, ressources, volume des résultats, secret de pull. La CI réutilise ce code au lieu d'en écrire une seconde version : un lanceur Python, `python -m sim.ci launch|wait|cancel`, importe le constructeur de manifeste du service et le client Kubernetes. Il tourne directement sur le runner, un pod [ARC](./2024-12-20-github-arc.md) qui joint l'API du cluster.

Les réglages du Job viennent du chart Helm du service, rendu pour le commit testé :

```bash
helm template sim "$CHART" -n sim --set image.tag="$GITHUB_SHA" > "$RUNNER_TEMP/chart.yaml"
```

Le lanceur lit dans ce rendu les variables d'environnement du conteneur web, celles que le service utilise pour construire ses Jobs. Une pull request qui modifie les ressources demandées par le Job est ainsi jouée avec ses propres valeurs, et le chart reste la source unique.

Les dépendances du lanceur sont installées par `uv` avec des versions épinglées et une date limite (`--exclude-newer`) : ce code s'exécute à côté d'un kubeconfig, et une version compromise publiée entre deux runs ne doit pas y entrer.

### Identité et droits

Créer des Jobs demande une identité sur le cluster. Trois options se présentent :

| Option | Avantage | Inconvénient |
| --- | --- | --- |
| ServiceAccount dédié, limité au namespace, kubeconfig en secret du dépôt | Moindre privilège pour le code de la CI | Jeton longue durée à créer, renouveler et révoquer à la main |
| Droits donnés au ServiceAccount des runners | Aucun secret | Ce compte sert à tous les dépôts qui utilisent ces runners : chacun pourrait créer des Jobs dans le namespace |
| Kubeconfig du déploiement, déjà présent | Rien à créer | Les droits du déploiement Helm confiés à du code de pull request |

Le compte dédié repose sur un Role réduit aux appels du lanceur : lister, créer et supprimer des Jobs du namespace, et lister ses pods, ce qui suffit pour connaître la raison d'un échec (`OOMKilled`, `ImagePullBackOff`) et lire le verdict décrit plus bas. Le droit `create jobs` équivaut à créer des pods de n'importe quelle spécification. Il ne reste confiné au namespace que si celui-ci applique un niveau de Pod Security (`pod-security.kubernetes.io/enforce: baseline`), qui interdit pods privilégiés, `hostPath` et accès au réseau de l'hôte.

Le choix dépend de ce que la CI peut déjà lire. Si le kubeconfig du déploiement est un secret d'organisation accessible à toute branche du dépôt, sans règle de protection d'environnement, tout contributeur qui peut pousser une branche peut le lire en modifiant un workflow. Un compte dédié borne alors ce que fait le code de la CI, mais pas l'accès réel aux droits plus larges. Le kubeconfig du déploiement devient un choix défendable à condition d'accepter ce risque explicitement ; réserver ce secret à `main` par un environnement protégé imposerait de revenir au compte dédié pour les pull requests.

## Capacité, file d'attente et annulation

### Un plafond côté lanceur

Les Jobs de simulation demandent une dizaine de CPU en classe *Guaranteed*, et le cluster n'a que quelques nœuds capables de les placer à un instant donné, d'autant que les runners de CI consomment eux-mêmes du CPU. Sans plafond, une série de pull requests saturerait le cluster et bloquerait les runs lancés à la main.

Les groupes de concurrence de GitHub ne conviennent pas comme file d'attente : un groupe ne garde qu'un seul run en attente et annule les autres. Le lanceur applique donc son propre plafond, en s'appuyant sur trois labels posés sur chaque Job de CI : `sim.example.com/trigger: ci` pour les distinguer des runs manuels, `sim.example.com/kind` pour le type de run (`smoke`, `full` ou `ref`) et `sim.example.com/pr` pour le numéro de la pull request. Avant de créer son Job, le lanceur compte les Jobs actifs portant `trigger=ci` et attend, par sondage toutes les 30 secondes, qu'il y en ait moins de deux, dans la limite d'un délai (une heure pour la fumée, quatre pour les campagnes complètes). Au-delà, le job GitHub échoue avec un message explicite. Deux lanceurs qui comptent au même moment peuvent dépasser le plafond d'un Job : la limite est souple, et acceptée comme telle. Un `ResourceQuota` sur le namespace donnerait une limite stricte, mais bloquerait aussi les runs manuels, avec une erreur peu lisible pour l'utilisateur du service web.

### Annuler sans dépendre de GitHub

Quand un nouveau push annule le workflow, GitHub joue l'étape `if: cancelled()`, qui supprime le Job en cours. Cette étape n'est pas garantie : un runner perdu ne la joue pas. Le lanceur applique donc une règle qui ne dépend pas de GitHub : avant de créer son Job, il supprime les Jobs actifs de la même pull request et du même type, avec une propagation `Foreground` qui arrête proprement le pod. Le lancement suivant fait ainsi le ménage, quoi qu'il soit arrivé au précédent. Les références de `main` ne sont jamais annulées.

### Les relances d'anciens runs

Le bouton *Re-run* de GitHub rejoue un ancien workflow avec son ancien commit. Sur une pull request, il remplacerait la fumée du dernier push par celle d'un commit dépassé ; sur `main`, il déploierait une image plus ancienne. Une étape vérifie donc, à partir de la deuxième tentative (`github.run_attempt != '1'`), que la tête de la pull request ou de `main` n'a pas bougé, et échoue sinon.

## Lire le verdict sans accès au volume

Le code de sortie du Job ne dit rien de la santé du run : le rapport de campagne sort en erreur dès qu'un scénario échoue, ce qui est l'état normal d'une campagne. Le verdict de la fumée est donc un bilan de santé distinct, calculé à la fin du run : une liste de pannes grossières, vide si le run est sain.

Pour transmettre ce bilan à la CI sans lui donner accès au volume des résultats, le Job l'écrit dans le *message de fin* du conteneur, le fichier `/dev/termination-log`. Kubernetes recopie son contenu, tronqué à 4096 octets, dans le statut du pod, où le lanceur le lit avec le seul droit `list pods`. Il retrouve le pod du Job par le label `job-name`, que Kubernetes pose automatiquement, puis lit le champ `status.containerStatuses[].state.terminated.message`, un petit document YAML qui liste les pannes.

Le lanceur relit le Job toutes les 20 secondes jusqu'à sa fin, puis sort avec 0 si le bilan est vide, 1 s'il contient une panne, et 2 si le Job a dépassé son délai, auquel cas il le supprime. Un pod sans message de fin (tué pour manque de mémoire, évincé) compte comme un run cassé, et un run annulé n'est jamais vert. En cas de panne, les dernières lignes du journal du pod sont imprimées dans le job GitHub.

## Nommer et conserver les runs

Chaque run reçoit un identifiant qui dit d'où il vient :

| Run | Identifiant |
| --- | --- |
| Fumée de pull request | `pr-<n>-<sha7>-smoke-w<run_number>` |
| Campagne complète | `pr-<n>-<sha7>-full-w<run_number>` |
| Référence de `main` | `ref-main-<sha7>-w<run_number>` |
| Relance d'un workflow | suffixe `-a<run_attempt>` |

Le suffixe `-w` distingue deux workflows qui testent le même commit (étiquette reposée, `workflow_dispatch`), et `-a` deux tentatives du même workflow : sans eux, le second run tomberait sur le répertoire de résultats du premier. L'identifiant entre dans le nom du Job, qui doit rester un label DNS valide : la longueur maximale de chaque partie est donc bornée.

La rétention s'applique au démarrage de chaque Job, sur les seuls identifiants de la CI : un run de pull request est supprimé dès qu'un run plus récent de la même pull request et du même type existe, ou au bout de quatorze jours ; les dix dernières références de `main` sont conservées. Les runs nommés à la main ne sont jamais touchés, et le service web refuse les identifiants réservés à la CI.

## Limites

- **La fumée n'attrape que les pannes grossières.** Une dégradation de quelques points de taux de réussite passe la barrière ; seule la campagne complète, lue par une personne, la révèle.
- **Une seule référence par commit ne donne pas de bande de bruit.** Qualifier un écart demande plusieurs rejeux de la référence à l'identique, que la CI ne lance pas.
- **Le plafond est souple et local à la CI.** Il ne connaît pas la charge du reste du cluster : un Job créé sans nœud libre reste `Pending`, et seul le délai d'attente le couvre.
- **Les droits restent ceux de l'identité choisie.** Avec le kubeconfig du déploiement, un bogue du lanceur agit avec les droits du déploiement ; il ne vise que le namespace lu dans le chart et ne supprime que les Jobs qu'il nomme, mais rien ne l'impose côté cluster.

## Conclusion

Brancher des simulations lourdes sur les pull requests revient surtout à décider ce que la CI a le droit de conclure : des résultats bruités ne permettent de bloquer que sur des pannes grossières, et le reste devient une information comparée à une référence. Le reste du dispositif découle des contraintes de GitHub Actions et de Kubernetes : un workflow par déclencheur pour que les checks sautés ne masquent pas un échec, un manifeste de Job unique lu dans le chart, un plafond et une annulation gérés par le lanceur plutôt que par les groupes de concurrence, et un verdict transmis par le message de fin du pod. La question de l'identité reste la plus délicate, parce que la bonne réponse dépend de qui peut déjà lire les secrets du dépôt.

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/professionnel/sonu-k8s-cluster" title="Cluster Kubernetes interne SONU">Campagnes de simulation d'un projet lancées par la CI sous forme de Jobs sur le cluster, à côté des runs manuels, avec un plafond de capacité partagé.</ProjectLink>
  <ProjectLink to="/docs/projects/professionnel/github-arc-kubeadm" title="GitHub ARC - Runners CI/CD auto-hébergés sur Kubernetes">Runners auto-hébergés dans le cluster, qui joignent directement l'API Kubernetes pour créer et suivre les Jobs de simulation.</ProjectLink>
</ProjectLinks>
