---
title: "Caractère littéral"
section: "Bases"
---


### Caractère littéral

Correspond exactement au caractère indiqué.

``` regexp
a
```

Exemple :

``` regexp
/a/
```

------------------------------------------------------------------------

### Chaîne littérale

Recherche une suite exacte de caractères.

``` regexp
ab
```

Exemple :

``` regexp
/ade/
```

------------------------------------------------------------------------

### Début de chaîne `^`

``` regexp
/^Bonjour/
```

------------------------------------------------------------------------

### Fin de chaîne `$`

``` regexp
/monde$/
```

------------------------------------------------------------------------

### Caractère générique `.`

``` regexp
/a.b/
```

------------------------------------------------------------------------

### Alternance `|`

``` regexp
/pomme|tomate/
```

------------------------------------------------------------------------

### Échappement `\`

``` regexp
/a\+b/
```
