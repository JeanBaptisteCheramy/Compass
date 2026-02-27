---
title: "Les Déclencheurs (Triggers)"
section: "Langage"
---

## Les Déclencheurs (Triggers)

Un **trigger** est un code SQL exécuté automatiquement lorsqu’un événement se produit sur une table (INSERT, UPDATE, DELETE).

👉 Sert souvent à contrôler, journaliser ou valider des modifications.

**Idée clé :** action automatique liée à un événement.

---

### Tables virtuelles INSERTED et DELETED

| Instruction | INSERTED | DELETED |
| --- | --- | --- |
| INSERT | Lignes insérées | ∅ |
| UPDATE | Nouvelles valeurs | Anciennes valeurs |
| DELETE | ∅ | Lignes supprimées |

---

### Déclencheurs AFTER

S'exécute **après** l'instruction déclenchante (les contraintes sont vérifiées).

```sql
GO
CREATE OR ALTER TRIGGER upd_clients ON Clients
FOR UPDATE AS
    PRINT 'Maj table des clients';
GO

```

**Tester la colonne modifiée – UPDATE()**

```sql
CREATE OR ALTER TRIGGER upd_clients ON Clients
FOR UPDATE AS
    IF UPDATE(nom)
        PRINT 'Changement de nom d''un client';

```

**Utiliser INSERTED / DELETED**

```sql
CREATE OR ALTER TRIGGER del_clients ON Clients
FOR DELETE AS
    INSERT INTO AnciensClients SELECT * FROM DELETED;

```

**Lever une exception pour annuler l'instruction**

```sql
CREATE OR ALTER TRIGGER upd_fiches ON Fiches
FOR UPDATE AS
    IF UPDATE(noCli)
        THROW 50008, 'Impossible de changer le propriétaire d''une fiche', 1;

```

**Curseur sur INSERTED / DELETED**

```sql
CREATE OR ALTER TRIGGER ins_lignesFic ON LignesFic
FOR INSERT AS
BEGIN
    DECLARE cIns CURSOR FOR SELECT DISTINCT noFic FROM INSERTED;
    DECLARE @noFic NUMERIC(6), @nbArticles INT;
    OPEN cIns;
    FETCH cIns INTO @noFic;
    WHILE @@FETCH_STATUS = 0
    BEGIN
        SELECT @nbArticles = COUNT(*) FROM LignesFic WHERE noFic = @noFic;
        IF @nbArticles > 20
            THROW 50009,
                'Impossible de louer plus de 20 articles sur une même fiche de location',
                @nbArticles;
        FETCH cIns INTO @noFic;
    END
    CLOSE cIns;
    DEALLOCATE cIns;
END;

```

> ⚡ Optimisation : préférer un EXISTS à un curseur quand c'est possible.
>
>
> ```sql
> CREATE OR ALTER TRIGGER ins_lignesFic ON LignesFic
> FOR INSERT AS
>     IF EXISTS(SELECT * FROM LignesFic GROUP BY noFic HAVING COUNT(*) > 20)
>         THROW 50009, 'Impossible de louer plus de 20 articles sur une même fiche', 1;
> 
> ```
>

**Curseur sur UPDATE (INSERTED + DELETED jointés)**

```sql
CREATE OR ALTER TRIGGER upd_fiches ON Fiches
FOR UPDATE AS
IF UPDATE(etat)
BEGIN
    DECLARE cUpd CURSOR FOR
        SELECT i.noFic, d.etat etatAvant, i.etat etatApres
        FROM INSERTED i INNER JOIN DELETED d ON i.noFic = d.noFic;

    DECLARE @noFic NUMERIC(6), @etatAvant CHAR(2), @etatApres CHAR(2);
    OPEN cUpd;
    FETCH cUpd INTO @noFic, @etatAvant, @etatApres;
    WHILE @@FETCH_STATUS = 0
    BEGIN
        PRINT CONCAT('La fiche n°', @noFic, ' est passée de l''état ',
                     @etatAvant, ' à l''état ', @etatApres);
        FETCH cUpd INTO @noFic, @etatAvant, @etatApres;
    END
    CLOSE cUpd;
    DEALLOCATE cUpd;
END;

```

---

### Déclencheurs INSTEAD OF

S'exécute **à la place** de l'instruction déclenchante. Utile pour corriger des requêtes ou permettre des insertions via des vues.

**Sur une table (correction automatique de clé)**

```sql
CREATE OR ALTER TRIGGER iof_ins_clients ON Clients
INSTEAD OF INSERT AS
IF EXISTS(SELECT * FROM Clients c INNER JOIN INSERTED i ON c.noCli = i.noCli)
OR EXISTS(SELECT * FROM INSERTED WHERE noCli IS NULL)
BEGIN
    PRINT 'Numéro de client incorrect ! Correction automatique...';
    DECLARE @noCli NUMERIC(6);
    SELECT @noCli = MAX(noCli) FROM Clients;
    INSERT INTO Clients(noCli, nom, prenom, adresse, cpo, ville)
    SELECT @noCli + ROW_NUMBER() OVER(ORDER BY noCli),
           nom, prenom, adresse, cpo, ville FROM INSERTED;
END
ELSE
    INSERT INTO Clients(noCli, nom, prenom, adresse, cpo, ville)
    SELECT noCli, nom, prenom, adresse, cpo, ville FROM INSERTED;

```

**Sur une vue (insertion multi-tables)**

```sql
CREATE OR ALTER VIEW ClientsAvecFiches AS
    SELECT c.noCli, nom, cpo, ville, noFic, dateCrea, datePaye, etat
    FROM Clients c INNER JOIN Fiches f ON c.noCli = f.noCli;

CREATE OR ALTER TRIGGER iof_ins_clientsAvecFiches ON ClientsAvecFiches
INSTEAD OF INSERT AS
BEGIN
    INSERT INTO Clients(noCli, nom, cpo, ville)
        SELECT DISTINCT noCli, nom, cpo, ville FROM INSERTED;

    INSERT INTO Fiches(noCli, dateCrea, datePaye, etat)
        SELECT noCli, COALESCE(dateCrea, GETDATE()), datePaye, COALESCE(etat, 'EC')
        FROM INSERTED;
END;

-- Utilisation
INSERT INTO ClientsAvecFiches(noCli, nom, cpo, ville, etat)
VALUES(55, 'BAYARD', 05000, 'Gap', 'EC');

```

---