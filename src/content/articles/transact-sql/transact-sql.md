---
title: "Bases"
section: "Langage"
---

---

## Le SQL Procédural de SQL Server

### Les surcouches procédurales des SGBDR

| SGBDR | Langage procédural |
| --- | --- |
| SQL Server | **Transact SQL** |
| Oracle | PL/SQL |
| PostgreSQL | PL/pgSQL |
| MySQL / MariaDB | SQL/PSM |
| DB2 | SQL PL |

---

### Les variables

**Déclaration**

```sql
DECLARE @nomVariable TYPE [= valeur];
DECLARE @maVariable CHAR(11) = 'HelloWorld!';
```

**Consultation**

```sql
SELECT @nomVariable;
SELECT @maVariable;
```

**Valorisation**

```sql
DECLARE @nom VARCHAR(30);
SELECT @nom = nom FROM Clients WHERE noCli = 5;
```

**Affichage**

```sql
PRINT 'Hello world!';
PRINT @nom;
```

---

### Les conditionnelles

**CASE simple**

```sql
SELECT noFic,
  CASE etat
    WHEN 'EC' THEN 'en cours'
    WHEN 'RE' THEN 'rendu'
    WHEN 'SO' THEN 'soldé'
  END etatFiche
FROM Fiches;
```

**CASE élaboré**

```sql
SELECT nofic,
  CASE
    WHEN DATEDIFF(DAY, dateCrea, GETDATE()) > 14 THEN 'plus de 2 semaines'
    WHEN DATEDIFF(DAY, dateCrea, GETDATE()) > 7  THEN 'plus d''une semaine'
    ELSE 'moins d''une semaine'
  END durée
FROM Fiches;
```

**IF / ELSE**

```sql
DECLARE @nbClients INT;
SELECT @nbClients = COUNT(*) FROM Clients;
IF @nbClients > 10
    PRINT 'plus de 10 clients';
ELSE
    PRINT 'moins de 10 clients';
```

**IF / ELSE avec bloc BEGIN...END**

```sql
DECLARE @noCli INT = 3;
DECLARE @nomClient VARCHAR(30);
IF EXISTS(SELECT nom FROM Clients WHERE noCli = @noCli)
BEGIN
    SELECT @nomClient = nom FROM Clients WHERE noCli = @noCli;
    PRINT 'nom : ' + @nomClient;
END
ELSE
    PRINT 'pas de client n°' + @noCli;
```

---

### Les boucles WHILE

```sql
-- Exemple 1 : mise à jour en boucle
WHILE (SELECT AVG(prixJour) FROM GrilleTarifs) < 31
    UPDATE GrilleTarifs SET prixJour = prixJour * 1.05;

-- Exemple 2 : compteur
DECLARE @i INT = 1;
WHILE @i <= 10
BEGIN
    PRINT CONCAT('7 × ', @i, ' = ', @i * 7);
    SELECT @i = @i + 1;
END

```

---

### La clause OUTPUT

Permet de récupérer les lignes affectées par un INSERT, UPDATE ou DELETE.

- `DELETED` : ligne **avant** suppression ou modification
- `INSERTED` : ligne **après** insertion ou modification

```sql
-- Afficher les lignes supprimées
DELETE FROM Clients OUTPUT DELETED.* WHERE noCli > 42;

-- Afficher avant/après une mise à jour
UPDATE Clients SET nom = UPPER(nom)
OUTPUT DELETED.nom avant, INSERTED.nom après;

-- Récupérer la clé générée après un INSERT
INSERT INTO Fiches(noCli) OUTPUT INSERTED.noFic VALUES(5);

```

**OUTPUT ... INTO (stockage dans une variable TABLE)**

```sql
DECLARE @tNoFic TABLE(noFic NUMERIC(6));
INSERT INTO Fiches(noCli)
OUTPUT INSERTED.noFic INTO @tNoFic
VALUES(3);

-- Récupérer la valeur dans une variable scalaire
DECLARE @noFic NUMERIC(6);
SELECT @noFic = noFic FROM @tNoFic;

```
