
Il comando `SELECT` è il cuore di SQL: permette di interrogare il database per estrarre i dati che ci servono. Una query `SELECT` **non modifica** i dati: li legge e presenta i risultati. La struttura di una `SELECT` segue un ordine logico preciso che è importante memorizzare.

### 7.1 Struttura Completa di una SELECT

```sql
SELECT   [DISTINCT] colonne_o_espressioni
FROM     tabella_principale [AS alias]
[JOIN    altra_tabella ON condizione_di_join]  -- ripetibile
[WHERE   condizione_di_filtraggio]
[GROUP BY colonne_di_raggruppamento]
[HAVING  condizione_sui_gruppi]
[ORDER BY colonne [ASC | DESC]]
[LIMIT   numero_massimo_di_righe [OFFSET punto_di_partenza]];
```

**Ordine di esecuzione logico** (non di scrittura):
`FROM` → `JOIN` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `DISTINCT` → `ORDER BY` → `LIMIT`

Capire questo ordine è fondamentale per evitare errori, ad esempio capire perché non si possono usare alias definiti nel `SELECT` all'interno del `WHERE`.

### 7.2 SELECT di Base e DISTINCT

```sql
-- Selezionare tutte le colonne di tutte le righe
SELECT * FROM prodotti;

-- Selezionare colonne specifiche
SELECT codice, nome, prezzo FROM prodotti;

-- Eliminare i duplicati nel risultato
SELECT DISTINCT categoria FROM prodotti;

-- Espressioni nelle colonne
SELECT nome, prezzo, prezzo * 1.22 AS prezzo_con_iva FROM prodotti;
```

**Nota su `DISTINCT`**: Opera sull'**intera riga** del risultato, non su una singola colonna. Se scrivo `SELECT DISTINCT nome, categoria`, ottengo righe uniche per la combinazione `(nome, categoria)`, non solo per il nome. Può essere costoso su tabelle grandi perché richiede un ordinamento o un hashing interno.

### 7.3 Le Funzioni di Aggregazione

Le funzioni di aggregazione elaborano un insieme di righe e restituiscono un **singolo valore riassuntivo**. Sono la base per calcolare statistiche sui dati.

- **`COUNT(*)`**: conta il numero totale di righe nel gruppo, incluse quelle con `NULL`. Il modo più veloce per contare le righe.
- **`COUNT(colonna)`**: conta solo le righe in cui quella colonna ha un valore `NOT NULL`. Utile per contare quanti record hanno un certo campo compilato.
- **`COUNT(DISTINCT colonna)`**: conta i valori distinti non `NULL` di quella colonna. Es: quanti clienti distinti hanno fatto almeno un ordine.
- **`SUM(colonna)`**: somma tutti i valori numerici non `NULL`. Usato per totali, fatturati, quantità.
- **`AVG(colonna)`**: calcola la media aritmetica dei valori non `NULL`. Attenzione: se alcune righe hanno `NULL`, vengono escluse dal calcolo (non considerate come zero).
- **`MIN(colonna)` / `MAX(colonna)`**: trovano il valore minimo e massimo. Funzionano anche su stringhe e date (ordine alfabetico e cronologico).

```sql
SELECT
    COUNT(*)                    AS totale_ordini,
    COUNT(DISTINCT cliente_id)  AS clienti_distinti,
    SUM(totale)                 AS fatturato_totale,
    AVG(totale)                 AS ordine_medio,
    MIN(data)                   AS primo_ordine,
    MAX(data)                   AS ultimo_ordine
FROM ordini
WHERE YEAR(data) = 2025;
```

### 7.4 WHERE — Filtrare le Righe Prima dell'Aggregazione

La clausola `WHERE` filtra le righe **prima** che vengano elaborate da qualsiasi altra clausola (`JOIN`, `GROUP BY`, ecc.). Permette di usare qualsiasi combinazione di condizioni con gli operatori logici `AND`, `OR`, `NOT`.

- **Operatori di confronto**: `=`, `<>` (diverso), `<`, `>`, `<=`, `>=`.
    - *Attenzione*: `NULL` non è uguale a `NULL`, per testare il `NULL` si usa `IS NULL` o `IS NOT NULL`, **non** `= NULL`.

- **`BETWEEN v1 AND v2`**: equivale a `col >= v1 AND col <= v2`. Gli estremi sono inclusi. Funziona anche con date: `WHERE data BETWEEN '2025-01-01' AND '2025-12-31'`.

- **`IN (v1, v2, v3, ...)`**: equivale a `col = v1 OR col = v2 OR col = v3`. Più leggibile con molti valori. Si può anche usare una sottoquery: `WHERE id IN (SELECT id FROM ...)`.

- **`LIKE 'pattern'`**: confronto con pattern di testo.
    - `%` : sostituisce qualsiasi sequenza di caratteri (anche vuota).
    - `_` : sostituisce esattamente un carattere.
    - *Esempi*: `LIKE 'A%'` (inizia per A); `LIKE '%ro%'` (contiene 'ro'); `LIKE '__'` (esattamente 2 caratteri).

- **`NOT`**: nega qualsiasi condizione. Si può usare con tutti gli operatori: `NOT LIKE`, `NOT IN`, `NOT BETWEEN`, `NOT EXISTS`.

```sql
SELECT * FROM prodotti
WHERE prezzo BETWEEN 10.00 AND 100.00
  AND categoria IN ('Elettronica', 'Informatica')
  AND nome LIKE 'A%'
  AND descrizione IS NOT NULL;
```

### 7.5 AS — Alias per Colonne e Tabelle

L'alias permette di dare un nome alternativo a una colonna (nel risultato) o a una tabella (nella query). È indispensabile per rendere leggibili i risultati delle query con espressioni o funzioni aggregate, e per disambiguare i nomi di colonne quando si fanno `JOIN` di tabelle diverse che hanno colonne con lo stesso nome.

```sql
-- Alias su colonne: il nome apparirà nell'intestazione del risultato
SELECT
    nome                    AS 'Nome Prodotto',
    prezzo * 1.22           AS 'Prezzo con IVA',
    COUNT(*)                AS 'Numero Ordini'
FROM prodotti p   -- alias di tabella: p è un nome breve per 'prodotti'
JOIN ordini_righe or2 ON p.id = or2.prodotto_id
GROUP BY p.id, p.nome, p.prezzo;
```

### 7.6 ORDER BY — Ordinare i Risultati

La clausola `ORDER BY` ordina le righe del risultato. Si può ordinare per una o più colonne, in ordine `ASC` (ascendente, default) o `DESC` (discendente). L'ordinamento avviene come **ultima operazione**, dopo tutti i filtri e le aggregazioni. L'ordinamento per colonne `NULL` pone i `NULL` all'inizio in modalità `ASC`.

```sql
-- Ordina per prezzo dal più caro al meno caro, poi alfabeticamente per nome
SELECT nome, prezzo, categoria
FROM prodotti
ORDER BY prezzo DESC, nome ASC;
```

### 7.7 GROUP BY e HAVING — Raggruppare e Filtrare i Gruppi

`GROUP BY` è la clausola che permette di dividere le righe in **gruppi** in base ai valori di una o più colonne, e poi applicare le funzioni aggregate a ciascun gruppo separatamente. Il risultato ha **una riga per ogni gruppo**.

**Regola fondamentale**: quando si usa `GROUP BY`, la clausola `SELECT` può contenere **solo** le colonne usate nel `GROUP BY` oppure **funzioni aggregate**. Non si può selezionare un attributo "non raggruppato" perché il DBMS non saprebbe quale valore scegliere tra i tanti del gruppo.

```sql
-- Quanti prodotti ci sono per ogni categoria e qual è il prezzo medio?
SELECT
    categoria,
    COUNT(*)       AS num_prodotti,
    AVG(prezzo)    AS prezzo_medio,
    MIN(prezzo)    AS prezzo_minimo,
    MAX(prezzo)    AS prezzo_massimo
FROM prodotti
GROUP BY categoria
ORDER BY num_prodotti DESC;
```

`HAVING` è a `GROUP BY` quello che `WHERE` è a `FROM`: filtra i risultati, ma lo fa **dopo** il raggruppamento, quindi può usare le funzioni aggregate. **Non** si possono usare le funzioni aggregate nel `WHERE` (perché `WHERE` agisce prima del raggruppamento).

```sql
-- Solo le categorie con almeno 5 prodotti e prezzo medio > 50 euro
SELECT categoria, COUNT(*) AS n, AVG(prezzo) AS media
FROM prodotti
WHERE attivo = TRUE      -- filtra le righe PRIMA del raggruppamento
GROUP BY categoria
HAVING COUNT(*) >= 5     -- filtra i gruppi DOPO il raggruppamento
   AND AVG(prezzo) > 50
ORDER BY media DESC;
```

| ⚠️ **Attenzione: WHERE vs HAVING**<br><br>`WHERE` si applica sulle singole righe **prima** del `GROUP BY` (non può usare aggregate); `HAVING` si applica sui gruppi **dopo** il `GROUP BY` (può usare aggregate). Errore comune: usare una funzione aggregata nel `WHERE` invece che nel `HAVING`. |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

### 7.8 JOIN nelle Query SELECT

Per recuperare dati che si trovano in tabelle diverse (come il nome del cliente insieme ai suoi ordini), si usano i `JOIN`. La sintassi moderna usa la parola chiave `JOIN` con la clausola `ON` per specificare la condizione di giunzione.

```sql
-- Ordini con nome cliente e nome prodotto (join a tre tabelle)
SELECT
    c.nome                  AS cliente,
    o.data                  AS data_ordine,
    p.nome                  AS prodotto,
    r.quantita,
    r.quantita * p.prezzo   AS subtotale
FROM ordini o
INNER JOIN clienti c        ON o.cliente_id = c.id
INNER JOIN ordini_righe r   ON r.ordine_id  = o.id
INNER JOIN prodotti p       ON r.prodotto_id = p.id
WHERE YEAR(o.data) = 2025
ORDER BY o.data DESC, c.nome;
```