---
title: "Procédures et Fonctions Stockées"
section: "Langage"
---

##  Procédures et Fonctions Stockées

Une **procédure stockée** est un bloc de code SQL enregistré dans la base de données, exécutable à la demande, pouvant recevoir des paramètres et effectuer des opérations (SELECT, INSERT, UPDATE, DELETE).

👉 Sert à encapsuler la logique métier côté base.

**Idée clé :** programme SQL réutilisable.

### Avantages

- **Performances** : compilées et stockées en base
- **Sécurité** : droits fins par procédure/fonction
- **Green IT** : moins de requêtes réseau

---

### Procédures stockées

**Création**

```sql
GO
CREATE OR ALTER PROCEDURE hw AS
    PRINT 'Hello World!';
GO

```

**Appel**

```sql
EXEC hw;

```

**Avec paramètres en entrée (avec valeur par défaut)**

```sql
CREATE OR ALTER PROCEDURE articlePlusLoue(@codeCat VARCHAR(4) = '%') AS
BEGIN
    DECLARE @refArt CHAR(3) = (
        SELECT a.refart FROM LignesFic l
        INNER JOIN Articles a ON l.refArt = a.refArt
        INNER JOIN Modeles m ON a.noModele = m.noModele
        WHERE codeCate LIKE @codeCat
        GROUP BY a.refArt
        ORDER BY COUNT(*) DESC
        OFFSET 0 ROW FETCH NEXT 1 ROW ONLY
    );
    IF @codeCat = '%'
        PRINT 'L''article le plus loué toutes catégories confondues';
    ELSE
        PRINT CONCAT('L''article le plus loué de la catégorie ', @codeCat);
    PRINT CONCAT('est la référence ', @refArt);
END;

-- Appels
EXECUTE articlePlusLoue;
EXECUTE articlePlusLoue 'FOA';

```

**Avec paramètres en sortie (OUTPUT)**

```sql
CREATE OR ALTER PROCEDURE separeDate
    @date  DATE,
    @jour  INT OUT,
    @mois  INT OUT,
    @annee INT OUT
AS
BEGIN
    SELECT @jour  = DAY(@date);
    SELECT @mois  = MONTH(@date);
    SELECT @annee = YEAR(@date);
END;

-- Appel
DECLARE @j INT, @m INT, @a INT;
EXECUTE separeDate '17/05/2023', @j OUT, @m OUT, @a OUT;
SELECT @j jour, @m mois, @a année;

```

---

### Fonctions scalaires

Une **fonction scalaire** retourne **une seule valeur** (int, varchar, date, etc.).

👉 Utilisable dans un SELECT ou une expression.

**Idée clé :** fonction → une seule valeur.

```sql
CREATE OR ALTER FUNCTION nbClients() RETURNS INT AS
BEGIN
    DECLARE @nb INT;
    SELECT @nb = COUNT(*) FROM Clients;
    RETURN @nb;
END;

-- Appel
SELECT dbo.nbClients() nbClientsTotal;

DECLARE @nb INT;
EXECUTE @nb = dbo.nbClients;
PRINT CONCAT('nbClients : ', @nb);

```

**Avec paramètre et valeur par défaut**

```sql
CREATE OR ALTER FUNCTION nbFiches(@noCli NUMERIC(6) = 2) RETURNS INT AS
BEGIN
    DECLARE @nb NUMERIC(6);
    SELECT @nb = COUNT(*) FROM Fiches WHERE noCli = @noCli;
    RETURN @nb;
END;

-- Appels
SELECT dbo.nbFiches(1)       nbFichesDuClient;
SELECT dbo.nbFiches(DEFAULT) nbFichesDuClient;

```

---

### Fonctions table

Une **fonction table** retourne une **table** comme résultat et peut être utilisée dans une requête SQL comme une table normale.

👉 Peut être utilisée dans un `FROM`.

**Idée clé :** fonction qui renvoie plusieurs lignes/colonnes.

**Une seule instruction (inline)**

```sql
CREATE OR ALTER FUNCTION articlesDe(@codeCat CHAR(4), @codeGam CHAR(2))
RETURNS TABLE AS
RETURN (
    SELECT noModele, designation
    FROM Modeles
    WHERE codeCate = @codeCat AND codeGam = @codeGam
);

```

**Plusieurs instructions (multi-statement)**

```sql
CREATE OR ALTER FUNCTION analyseModele()
RETURNS @stats TABLE(
    noModele            INT PRIMARY KEY,
    nbExemplaires       INT,
    nbLocations         INT,
    dureeMoyenneLocation INT
) AS
BEGIN
    INSERT INTO @stats
    SELECT noModele,
           COUNT(DISTINCT a.refArt),
           COUNT(*),
           AVG(DATEDIFF(DAY, depart, retour))
    FROM LignesFic l
    INNER JOIN Articles a ON l.refArt = a.refArt
    WHERE retour IS NOT NULL
    GROUP BY noModele;
    RETURN;
END;

-- Appel
SELECT * FROM analyseModele();

```

---
