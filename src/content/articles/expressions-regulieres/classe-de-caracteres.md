---
title: "Classes de caractères"
section: "Bases"
---

## Classes de caractères

### Espaces `\s`

``` regexp
/\s/
```

### Non-espace `\S`

``` regexp 
/\s\S/
```

### Caractère de mot `\w`

``` regexp
/\w/
```

### Non-caractère de mot `\W`

``` regexp
/\W/
```

### Chiffre `\d`

``` regexp
/\d/
```

### Non chiffre `\D`

``` regexp
/\D/
```

------------------------------------------------------------------------

## Caractères spéciaux

``` regexp
\n   # nouvelle ligne
\t   # tabulation
\r   # retour chariot
\0   # caractère nul
\xZZ # hexadécimal
\ZZZ # octal
```

Espaces avancés :

``` regexp
\h  # espace horizontal
\H  # non espace horizontal
\v  # espace vertical
\V  # non espace vertical
```

------------------------------------------------------------------------
