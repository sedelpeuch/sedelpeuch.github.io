---
title: "Grafana : dashboards et datasources versionnés"
description: "Faire de Git la source des dashboards et datasources Grafana plutôt que sa base de données : problèmes d'un Grafana construit à la main, provisioning par fichiers avec le chart Helm, uid stables, cycle de modification par revue, pièges de l'export JSON et de disableDeletion, choix entre dépôt central et sidecar."
tags: [monitoring, devops]
---

Un Grafana construit à la main accumule un état que personne ne maîtrise vraiment. Dans le cas traité ici, l'inventaire d'un Grafana en service depuis la création du cluster a relevé une datasource pointant vers un serveur MySQL décommissionné, une autre créée pour un essai et jamais utilisée, des dashboards modifiés au fil des besoins sans trace de qui avait changé quoi ni pourquoi, et un écran d'affichage dont les liens dépendaient de dashboards qu'une fausse manipulation pouvait casser. Surtout, l'ensemble vivait dans la base SQLite de Grafana, sur un unique volume persistant : sa perte effaçait des mois de travail, sans aucune copie. Les manifests du cluster étaient tous versionnés et relus ; Grafana faisait exception. Cet article décrit comment faire de Git la source de ses dashboards et datasources, et les pièges de la transition.

<!--truncate-->

## Inverser la source de vérité

Par défaut, l'interface de Grafana est la source : on y construit un dashboard, Grafana l'enregistre dans sa base. Le *provisioning* inverse la relation. Grafana lit au démarrage des fichiers décrivant datasources et dashboards, et l'interface n'en est plus que le lecteur.

| | Construit dans l'interface | Provisionné depuis Git |
| --- | --- | --- |
| Source | Base SQLite sur un volume | Fichiers d'un dépôt |
| Historique et revue | Aucun | Commits et pull requests |
| Perte du volume | Perte des dashboards | Sans effet, tout est rechargé au démarrage |
| Modification | Immédiate, par quiconque est éditeur | Par commit, puis déploiement |
| Réinstallation ou second Grafana | Export et import manuels | Identique par construction |

Le dernier point de la colonne de droite est le coût : modifier un dashboard demande désormais un commit. La suite de l'article montre comment garder ce coût faible.

## Datasources : reprendre l'existant sans rien casser

Les datasources se déclarent dans un fichier de provisioning, ici via le chart Helm `grafana/grafana` :

```yaml
datasources:
  datasources.yaml:
    apiVersion: 1
    deleteDatasources:
      - name: mysql
        orgId: 1
    datasources:
      - name: prometheus
        uid: prometheus-main
        type: prometheus
        url: http://prometheus-server.monitoring.svc.cluster.local
        jsonData:
          timeInterval: 1m
      - name: loki
        uid: loki-main
        type: loki
        url: http://loki.monitoring.svc.cluster.local:3100
```

Le point délicat de la transition est l'`uid`. Les dashboards désignent une datasource par son `uid`, pas par son nom. Une datasource créée dans l'interface en a reçu un aléatoire ; la déclarer dans le fichier sans le reprendre crée une datasource nouvelle, et tous les dashboards existants pointent alors vers une datasource introuvable. Reprendre l'`uid` d'origine, visible dans l'URL de la page de configuration de la datasource, rend la bascule transparente.

`deleteDatasources` traite l'autre moitié du problème : les datasources créées à la main ne disparaissent pas d'elles-mêmes au passage au provisioning. Les lister dans cette clé les supprime au démarrage, ce qui débarrasse Grafana de la datasource vers le serveur décommissionné.

`timeInterval` déclare l'intervalle de scrape de Prometheus. Grafana en dérive `$__rate_interval`, qui vaut au moins quatre fois cet intervalle : un `rate()` écrit avec cette variable ne porte jamais sur une fenêtre trop courte pour contenir deux échantillons.

## Dashboards : un fichier JSON par dashboard

Un dashboard Grafana est un document JSON. Chacun devient un fichier du dépôt, revu comme du code :

```text
dashboards/
├── cluster-noeuds.json
├── cluster-workloads-et-stockage.json
├── logs-par-application.json
└── reseau-internet-et-trafic.json
```

Le chart déclare un *provider*, c'est-à-dire un répertoire que Grafana surveille, et accepte les dashboards sous la clé `dashboards.<provider>.<nom>`. Pour ne pas recopier chaque JSON dans `values.yaml`, la CI passe les fichiers au chart avec `--set-file`, une option par fichier :

```bash
args=""
for f in dashboards/*.json; do
  args="$args --set-file dashboards.equipe.$(basename "$f" .json).json=$f"
done
helm upgrade grafana grafana/grafana --install --wait -n monitoring -f values.yaml $args
```

Ajouter un dashboard revient à ajouter son fichier : ni le workflow ni `values.yaml` ne changent. Le chart range les dashboards d'un provider dans une ConfigMap et pose sur le pod une empreinte de leur contenu (`checksum/dashboards-json-config`) : un JSON modifié change l'empreinte, et Grafana redémarre avec la nouvelle version au déploiement.

### Interdire la modification dans l'interface

```yaml
dashboardProviders:
  dashboardproviders.yaml:
    apiVersion: 1
    providers:
      - name: equipe
        type: file
        allowUiUpdates: false
        disableDeletion: false
        options:
          path: /var/lib/grafana/dashboards/equipe
```

`allowUiUpdates: false` empêche d'enregistrer un dashboard provisionné depuis l'interface. Sans cette option, une modification enregistrée dans l'interface vivrait dans la base, puis serait écrasée sans prévenir au déploiement suivant. Le refus explicite est plus sûr qu'une modification perdue.

## Modifier un dashboard

L'interface reste l'outil d'édition ; seul l'enregistrement change de place :

1. modifier le dashboard dans Grafana, sans l'enregistrer ;
2. copier son JSON (*Save dashboard*, puis *Copy JSON to clipboard*) ;
3. remplacer le fichier dans le dépôt, avec `"id": null` et sans la clé `version` ;
4. ouvrir une pull request ; le diff montre exactement ce qui change.

`id` et `version` sont internes à la base d'une installation donnée et n'ont pas de sens dans le dépôt. L'identité durable d'un dashboard est son `uid`, à garder fixe : liens, autres dashboards et écrans d'affichage y font référence.

### Piège : l'export pour partage externe

L'option *Export for sharing externally* remplace chaque datasource par une variable (`${DS_PROMETHEUS}`) et ajoute une section `__inputs`, pour qu'un tiers choisisse ses propres datasources à l'import. Le provisioning par fichier ne résout pas ces variables : le dashboard se charge, mais tous ses panneaux restent vides. Pour le dépôt, l'export simple, qui conserve les `uid` réels, est le bon.

### Piège : supprimer un fichier ne supprime pas toujours le dashboard

`disableDeletion: true` semble n'interdire que la suppression depuis l'interface. D'après la documentation, il change aussi ce qui se passe quand un fichier disparaît du dépôt : Grafana conserve alors le dashboard en base, détaché du provisioning. Le dashboard retiré reste visible, redevient modifiable dans l'interface et sort de tout versionnement, soit exactement l'état que la démarche cherchait à éliminer. `disableDeletion: false` aligne le comportement sur le principe « le dépôt est la source » : fichier supprimé, dashboard supprimé.

## Dépôt central ou sidecar

Le chart propose une seconde voie : un conteneur sidecar qui surveille les ConfigMaps portant un label donné (`grafana_dashboard: "1"`) dans un ou plusieurs namespaces, et charge leurs dashboards à chaud, sans redémarrer Grafana. Le choix dépend de qui possède les dashboards.

| | Dépôt central (fichiers dans le chart Grafana) | Sidecar |
| --- | --- | --- |
| Où vivent les dashboards | Un seul dépôt | Dans le chart de chaque application |
| Adapté à | Vue d'ensemble d'un cluster, une équipe d'exploitation | Chaque équipe livre le dashboard de son application avec elle |
| Prise en compte | Redémarrage de Grafana au déploiement | À chaud |
| Taille | Une ConfigMap par provider, 1 Mio au plus | Une ConfigMap par dashboard |

Pour une dizaine de dashboards décrivant le cluster, un dépôt central offre un lieu de revue unique. Le sidecar devient préférable lorsque les dashboards suivent le cycle de vie des applications qu'ils décrivent.

## Conclusion

Versionner Grafana ne change pas l'outil d'édition, mais déplace la source : la base devient un cache rechargé à chaque démarrage, et le dépôt porte l'historique, la revue et la reprise après perte. La bascule se joue sur les identifiants : reprendre les `uid` des datasources existantes, garder fixes ceux des dashboards. Elle se joue aussi sur trois réglages qui, laissés à leur valeur par défaut ou mal compris, réintroduisent un état non versionné : modifications enregistrables dans l'interface, export au format de partage, et dashboards conservés en base après suppression de leur fichier.

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/professionnel/sonu-k8s-cluster" title="Cluster Kubernetes interne SONU">Passage d'un Grafana construit à la main, dont les dashboards dépendaient d'un unique volume, à des dashboards et datasources versionnés et provisionnés au déploiement : huit dashboards en JSON injectés par la CI, datasources reprises avec leurs uid d'origine, datasources obsolètes supprimées.</ProjectLink>
</ProjectLinks>
