---
title: "Curseurs"
section: "Langage"
---

## Module 02 – Les Curseurs

Un curseur permet de parcourir **ligne par ligne** le résultat d'une requête SELECT.

Un **curseur** permet de parcourir les résultats d’une requête **ligne par ligne** pour effectuer des traitements individuels sur chaque enregistrement.

👉 Utilisé quand un traitement ne peut pas être fait facilement en mode set-based (ensemble).

**Idée clé :** boucle sur les lignes d’un SELECT.

### Étapes d'utilisation

| Étape | Instruction |
| --- | --- |
| Déclaration | `DECLARE curseur CURSOR FOR select` |
| Ouverture | `OPEN curseur` |
| Lecture | `FETCH NEXT FROM curseur INTO @var` |
| Parcours | `WHILE @@FETCH_STATUS = 0` |
| Fermeture | `CLOSE curseur` |
| Libération | `DEALLOCATE curseur` |

### Exemple complet – lecture simple

```sql
DECLARE cClients CURSOR FOR
    SELECT noCli, nom, prenom FROM Clients WHERE noCli < 5;

DECLARE @id INT, @nom VARCHAR(30), @prenom VARCHAR(30);

OPEN cClients;
FETCH NEXT FROM cClients INTO @id, @nom, @prenom;

WHILE @@FETCH_STATUS = 0
BEGIN
    PRINT CONCAT('client n°', @id, ' : ', @prenom, ' ', @nom);
    FETCH NEXT FROM cClients INTO @id, @nom, @prenom;
END

CLOSE cClients;
DEALLOCATE cClients;

```

### Curseur avec mise à jour – FOR UPDATE / CURRENT OF

```sql
-- Déclaration avec verrou
DECLARE cFiches CURSOR FOR
    SELECT noFic, etat FROM Fiches WHERE etat = 'EC'
    FOR UPDATE OF etat;

DECLARE @noFic NUMERIC(6), @etat CHAR(2), @nbEC INT;

OPEN cFiches;
FETCH NEXT FROM cFiches INTO @noFic, @etat;

WHILE @@FETCH_STATUS = 0
BEGIN
    SELECT @nbEC = COUNT(*) FROM LignesFic WHERE noFic = @noFic AND retour IS NULL;
    IF @nbEC = 0
        UPDATE Fiches SET etat = 'RE' WHERE CURRENT OF cFiches;
    FETCH NEXT FROM cFiches INTO @noFic, @etat;
END

CLOSE cFiches;
DEALLOCATE cFiches;

```

