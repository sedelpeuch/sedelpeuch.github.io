---
title: "Docker : cache BuildKit"
description: "Cache de construction BuildKit pour des runners de CI jetables : backends inline, registry, local et gha, modes min et max, options image-manifest et ignore-error, cache rangé dans un package de registre distinct, purge des versions sans tag, et pièges de l'écrasement entre branches et des droits sur le package."
tags: [containerization, cicd, devops]
series: docker
---

Sur un poste de développement, la deuxième construction d'une image est rapide : le démon Docker garde les couches de la première, et seules les instructions dont les entrées ont changé sont rejouées. Un runner de CI éphémère n'a pas cette mémoire. Chaque job démarre avec un démon vide, télécharge les images de base, réinstalle toutes les dépendances et recompile tout, même quand seul un fichier de code a changé. BuildKit, le moteur de construction de Docker, sait exporter son cache hors du démon et le relire au build suivant ; reste à choisir où le ranger et comment l'empêcher de s'accumuler.

<!--truncate-->

## Le cache de construction

Chaque instruction d'un Dockerfile produit une étape dont la **clé de cache** dépend de l'instruction elle-même et de ses entrées : le texte d'un `RUN`, le contenu des fichiers d'un `COPY`, la clé de l'étape précédente. Le principe, et l'ordre des instructions qui en découle, est décrit dans [Docker : bonnes pratiques](./2024-12-20-docker-best-practices.md). Quand une clé est déjà connue, BuildKit réutilise le résultat au lieu d'exécuter l'étape.

Sans configuration, ce cache vit dans le démon. Les options `--cache-to` et `--cache-from` de `docker buildx build` l'exportent vers un emplacement externe en fin de build et le réimportent au début du suivant. Un build qui trouve dans le cache importé la couche des dépendances la télécharge au lieu de la reconstruire.

## Où ranger le cache

BuildKit propose plusieurs *backends* :

| Backend | Emplacement | Particularité |
|---|---|---|
| `inline` | dans l'image elle-même | dernière étape seulement, pas de mode `max` |
| `registry` | image distincte dans un registre | indépendant de l'image publiée |
| `local` | répertoire du système de fichiers | suppose un disque persistant entre jobs |
| `gha` | cache de GitHub Actions | soumis au quota et à l'éviction du cache Actions |

Sur des runners jetables, `local` ne sert à rien sans volume persistant, et `inline` ne garde que les couches de l'image finale. Le backend `registry` range le cache comme une image à part, à côté de l'image produite, dans un registre auquel le job a déjà accès pour publier.

```yaml
cache-from: type=registry,ref=ghcr.io/example/app-buildcache:default
cache-to: type=registry,ref=ghcr.io/example/app-buildcache:default,mode=max,ignore-error=true
```

Ces deux lignes sont des entrées de l'action `docker/build-push-action`, qui les transmet à `buildx`.

## Les options qui comptent

- **`mode`** : `min`, la valeur par défaut, n'exporte que les couches présentes dans l'image finale. `max` exporte aussi celles des étapes intermédiaires. Dans un build multi-stage, l'étape qui compile ou installe les dépendances n'apparaît pas dans l'image finale, seul son résultat y est copié : en mode `min`, elle est rejouée à chaque build. `max` produit un cache plus gros mais touché plus souvent.
- **`image-manifest`** : avec les types de média OCI (`oci-mediatypes`, actif par défaut), le cache est décrit par un manifeste d'image plutôt que par un index. Certains registres refusent la forme index. `true` est la valeur par défaut depuis BuildKit 0.21 ; les versions antérieures utilisaient `false`, d'où l'intérêt de l'écrire explicitement quand la version du builder n'est pas maîtrisée.
- **`ignore-error`** : par défaut, un échec d'export du cache fait échouer le build. Avec `ignore-error=true`, une panne du registre de cache ou un quota atteint coûte un build plus lent la fois suivante, pas une publication manquée.

## Un package à part

Chaque export écrase l'emplacement visé : le tag du cache pointe vers le nouveau manifeste, et l'ancien reste stocké sans tag. Sur GitHub Container Registry, ces versions orphelines s'accumulent à chaque build et se purgent avec l'action `actions/delete-package-versions`, en ne supprimant que les versions sans tag (`delete-only-untagged-versions`, avec `min-versions-to-keep: 0` pour n'en garder aucune).

Ranger le cache dans le package de l'image publiée, sous un tag `buildcache`, rendrait cette purge dangereuse. Une image publiée sous un seul tag mobile (`main`) perd ce tag au build suivant et devient une version sans tag, alors qu'elle peut encore être déployée par son digest, comme dans un [déploiement par tag immuable](../04-ci-cd/2026-09-24-helm-tag-immuable.md). Une image multi-architecture se compose en outre d'un index et d'un manifeste par plateforme, ces derniers apparaissant eux aussi sans tag. Purger les versions sans tag du package de l'image supprimerait des images en service. Un package dédié, `<image>-buildcache`, isole le cache : la purge n'y touche que des manifestes de cache.

Le tag du cache identifie la *cible* du Dockerfile (`--target`) quand un même dépôt en publie plusieurs, `default` sinon. Deux cibles qui partageraient un tag écraseraient mutuellement leur cache à chaque build.

## Pièges et limites

- **Écrasement entre branches** : un tag par cible, partagé par toutes les branches, est réécrit par le dernier build, quelle que soit sa branche. Une branche de travail aux dépendances modifiées remplace le cache de la branche principale, dont le build suivant repart presque de zéro. La documentation de Docker propose d'importer plusieurs caches (`cache-from` accepte plusieurs entrées) et d'en exporter un par branche, au prix de plus de versions à purger.
- **Droits sur le package** : un package GHCR créé par un premier push s'attache au compte qui a poussé. Si la connexion au registre se fait avec un jeton personnel, le package de cache appartient à cette personne, et le `GITHUB_TOKEN` du workflow n'a pas le rôle d'administration sur le package que demande la purge. La purge échoue alors ; marquée `continue-on-error`, elle n'empêche pas la publication.
- **Couches invalidées en cascade** : le cache ne change rien à la logique des clés. Un `COPY . .` placé avant l'installation des dépendances invalide toutes les couches suivantes à chaque modification de code, cache distant ou non.
- **Coût du transfert** : en mode `max`, importer et exporter le cache prend du temps et de la bande passante. Pour une image légère au build court, le gain peut être nul ; la documentation recommande de mesurer les deux modes.

## Conclusion

Un runner jetable perd le cache de construction à chaque job. Le backend `registry` de BuildKit le range dans le registre où l'image est déjà publiée, et le mode `max` y conserve les étapes intermédiaires d'un build multi-stage, celles qui coûtent le plus. Chaque export laisse l'ancien manifeste sans tag : un package dédié au cache permet de purger ces versions sans risque pour les images déployées par digest. `ignore-error` garantit qu'un cache indisponible ralentit le build sans le faire échouer.

## Ressources utiles

- [Backends de cache BuildKit](https://docs.docker.com/build/cache/backends/)
- [Backend `registry`](https://docs.docker.com/build/cache/backends/registry/)
- [Cache dans GitHub Actions avec `docker/build-push-action`](https://docs.docker.com/build/ci/github-actions/cache/)
- [Action `actions/delete-package-versions`](https://github.com/actions/delete-package-versions)

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/professionnel/cicd" title="CI/CD - Workflows GitHub Actions mutualisés">Cache BuildKit ajouté au workflow de publication d'images partagé par les dépôts de l'organisation : cache en mode `max` dans un package GHCR dédié par dépôt, un tag par cible, purge des versions sans tag après chaque build, échec d'export ignoré.</ProjectLink>
</ProjectLinks>
