---
layout: page
hide: true
title: <i class="fas fa-code-branch fa-2x"></i> Types et constructions de base du langage
---
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

Cours inspiré du
[polycopié](https://www.labri.fr/perso/myriam/Enseignement/Scheme/scheme.pdf)
de [Myriam Desainte-Catherine](https://www.labri.fr/perso/myriam/) & [David Renault](https://www.labri.fr/perso/renault/working/index.php).

<style>
html {
 zoom: 0.80;
}
</style>

Résumé des constructions syntaxiques du langage 

![resume](/assets/images/fonc/resume.png){:class="image about center"}

Résumé des opérations numériques 

![operation](/assets/images/fonc/operation.png){:class="image about center"}

## <i class="fas fa-code-branch"></i> Les caractères et les chaînes de caractères

* Caractère : ̀#\a`
* Chaîne : "de caracteres"
* Type : ̀char?` `string?`
* Comparaisons `char=?, char<?, char>?, string=?, string<?, string>?`
* Constructeurs : `make-string, string`
* Accesseurs : `string-ref`
* Longueur : `string-length`
* Conversion : `number->string, string->number`

## <i class="fas fa-code-branch"></i> Les expressions conditionnelles

`(if <condition> <alors> <sinon>)`

`(when <condition> <e1> ... <en>)`

Cette forme évalue les expression `<ei>` et renvoie le résultat de la dernière quand l'expression `<condition>` vaut vrai.

`(cond [<condition> <e1> ... <en>] ... [<condition> <e1> ... <en>])`

Les crochets définissant les clauses peuvent être remplaccés par des parenthèses, conformément à la norme R6RS du langage Scheme
