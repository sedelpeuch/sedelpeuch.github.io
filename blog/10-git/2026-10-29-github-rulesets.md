---
title: "GitHub : rulesets"
description: "Rulesets GitHub à la place de la protection de branche classique : règles cumulées entre plusieurs rulesets, cible ~DEFAULT_BRANCH, liste de contournement, ruleset versionné en JSON et appliqué par l'API, détection de dérive, et pièges de la coexistence avec l'ancienne protection."
tags: [git, cicd, devops]
---

Dans une organisation de plusieurs dizaines de dépôts, la protection de la branche principale (revue obligatoire, historique linéaire, interdiction du force push) finit configurée à la main, dépôt par dépôt, avec autant de variantes que de personnes qui l'ont réglée. Les *rulesets* de GitHub remplacent la protection de branche classique par un objet nommé, décrit en JSON et manipulable par l'API, ce qui permet de versionner la règle et de la réappliquer à l'identique partout.

<!--truncate-->

## Protection de branche et ruleset

Une protection de branche classique s'attache à un motif de nom de branche, et une seule s'applique à une branche donnée. Un ruleset vise des branches ou des tags par motifs `fnmatch`, avec deux cibles spéciales : `~DEFAULT_BRANCH`, la branche par défaut quel que soit son nom (`main`, `master`…), et `~ALL`. Plusieurs rulesets peuvent viser la même branche : leurs règles se cumulent, et quand une même règle diffère d'un ruleset à l'autre, la version la plus restrictive l'emporte. Les rulesets se cumulent aussi avec une protection classique encore en place.

Trois autres différences comptent en pratique :

- un ruleset se désactive sans être supprimé (`enforcement: disabled`) ; le mode `evaluate`, qui journalise les violations sans bloquer, est réservé à GitHub Enterprise ;
- une liste de contournement (`bypass_actors`) désigne les rôles, équipes ou GitHub Apps autorisés à passer outre ;
- tout utilisateur qui a accès en lecture au dépôt voit les rulesets actifs, alors que le détail d'une protection classique se consulte dans les réglages du dépôt, réservés aux administrateurs.

Les rulesets sont disponibles sur les dépôts publics avec l'offre gratuite, et sur les dépôts privés à partir des offres payantes.

## Une règle versionnée

Un ruleset se décrit entièrement en JSON : nom, cible, conditions et liste de règles. La règle `pull_request` porte les paramètres de revue : nombre d'approbations, approbation obligatoire après le dernier push (`require_last_push_approval`), résolution des fils de discussion, méthodes de fusion autorisées. Les règles `deletion`, `non_fast_forward` et `required_linear_history` interdisent respectivement la suppression de la branche, le force push et les commits de fusion.

```json
"conditions": { "ref_name": { "include": ["~DEFAULT_BRANCH"], "exclude": [] } },
"rules": [{ "type": "non_fast_forward" }, { "type": "required_linear_history" }]
```

Ce fichier vit dans un dépôt d'outillage et s'applique par l'API REST : `POST /repos/{owner}/{repo}/rulesets` pour créer, `PUT /repos/{owner}/{repo}/rulesets/{id}` pour mettre à jour. La CLI `gh` suffit (`gh api ... --method PUT --input default.json`) et gère l'authentification et la pagination. Un outil de configuration des dépôts, par exemple une extension `gh`, recherche le ruleset par son nom, le crée s'il manque et le remet à niveau s'il existe.

Sans cette remise à niveau, un script qui saute les dépôts déjà protégés applique la règle une fois, puis plus jamais. Une évolution de la règle de référence (une approbation après le dernier push, une méthode de fusion retirée) n'atteint alors que les dépôts créés ensuite.

## Détecter la dérive

Un administrateur peut toujours modifier un ruleset dans l'interface. Un mode de vérification, qui relit le ruleset du dépôt, le compare champ par champ à la référence et sort avec un code d'erreur au moindre écart, rend cette dérive visible sans rien modifier. Lancé sur tous les dépôts, il produit la liste des écarts à corriger.

La lecture demande une précaution : `GET /repos/{owner}/{repo}/rulesets` renvoie par défaut aussi les rulesets hérités de l'organisation ou de l'entreprise (`includes_parents=true`). Le champ `source_type` (`Repository`, `Organization` ou `Enterprise`) distingue le ruleset propre au dépôt de ceux qu'il hérite ; sans ce filtre, l'outil risque de comparer, voire de réécrire, un ruleset qui n'est pas le sien.

## Pièges

- **Protection classique résiduelle** : elle continue de s'appliquer à côté du ruleset, puisque les deux se cumulent. Une migration supprime l'ancienne protection (`DELETE /repos/{owner}/{repo}/branches/{branch}/protection`) avant de créer le ruleset, faute de quoi une règle retirée du ruleset reste imposée par l'ancienne protection.
- **Reviewers obligatoires par équipe** : la règle `pull_request` accepte une liste d'équipes dont l'approbation est requise. Réappliquer la référence telle quelle efface les équipes ajoutées à la main sur un dépôt : l'outil doit soit les conserver, soit les imposer explicitement.
- **Écrasement à la mise à jour** : envoyer le JSON complet de la référence à chaque `PUT`, plutôt que les seuls champs modifiés, garantit que le ruleset obtenu est exactement la référence.

## Conclusion

Un ruleset transforme la protection d'une branche en donnée : un fichier JSON relu en pull request, appliqué par l'API et vérifiable à tout moment. L'automatisation n'apporte la cohérence attendue que si elle remet à niveau les rulesets existants, retire l'ancienne protection qui se cumulerait avec eux et ne touche que les rulesets propres au dépôt.

## Ressources utiles

- [À propos des rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)
- [Règles disponibles dans un ruleset](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets)
- [API REST des rulesets d'un dépôt](https://docs.github.com/en/rest/repos/rules)

## Application / Projet lié

<ProjectLinks>
  <ProjectLink to="/docs/projects/professionnel/outils-internes" title="Outils internes SONU">Extension `gh` qui crée et configure les dépôts de l'organisation : ruleset de référence versionné en JSON, créé ou remis à niveau à chaque passage, protection classique retirée, mode de vérification qui liste les écarts sans rien modifier.</ProjectLink>
</ProjectLinks>
