---
title: "Exceptions"
section: "Langage"
---

## Les Exceptions

### Anatomie d'un message d'erreur

```
Msg 2627, Niveau 14, État 1, Ligne 119
Violation de la contrainte PRIMARY KEY...

```

- **Numéro** : 0–50 000 (prédéfini), 50 001–2 147 483 647 (personnalisé)
- **Criticité** : 0 (info) à 25 (problème grave) — THROW impose toujours **niveau 16**
- **État** : valeur entière 0–255

---

### Lever une exception – THROW

```sql
THROW 50001, 'Exception levée par l''utilisateur', 1;

```

**Message dynamique**

```sql
DECLARE @message VARCHAR(100) = 'Exception levée par l''utilisateur ' + USER;
THROW 50002, @message, 1;

```

---

### Messages personnalisés multilingues – sp_addmessage

```sql
EXEC sp_addmessage 50003, 17, 'Exception in english',  @lang='us_english', @replace='replace';
EXEC sp_addmessage 50003, 17, 'Exception en français', @lang='Français',   @replace='replace';

DECLARE @messageFR NVARCHAR(100) = FORMATMESSAGE(50003);
THROW 50003, @messageFR, 1;

```

**Avec paramètres (%s, %d en anglais / %1!, %2! dans les autres langues)**

```sql
EXEC sp_addmessage 50005, 17, 'The item %s is already being rented',
    @lang='us_english', @replace='replace';
EXEC sp_addmessage 50005, 17, 'L''article %1! est déjà en cours de location',
    @lang='Français', @replace='replace';

DECLARE @refArt CHAR(3) = 'F60';
DECLARE @m NVARCHAR(100) = FORMATMESSAGE(50005, @refArt);
THROW 50005, @m, 1;

```

---

### Gestion des exceptions – TRY / CATCH

```sql
BEGIN TRY
    IF (RAND() < 0.5)
        THROW 50006, 'Erreur aléatoire', 1;
    PRINT 'Pas d''exception';
END TRY
BEGIN CATCH
    PRINT 'Exception interceptée !';
    PRINT CONCAT('Message   : ', ERROR_MESSAGE());
    PRINT CONCAT('Numéro    : ', ERROR_NUMBER());
    PRINT CONCAT('Criticité : ', ERROR_SEVERITY());
    PRINT CONCAT('État      : ', ERROR_STATE());
END CATCH;

```

| Fonction | Rôle |
| --- | --- |
| `ERROR_MESSAGE()` | Texte du message |
| `ERROR_NUMBER()` | Numéro d'erreur |
| `ERROR_SEVERITY()` | Niveau de criticité |
| `ERROR_STATE()` | État |

---
