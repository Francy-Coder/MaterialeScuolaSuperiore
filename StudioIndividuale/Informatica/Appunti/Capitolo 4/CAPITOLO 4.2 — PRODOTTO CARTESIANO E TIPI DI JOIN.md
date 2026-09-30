
### 4.1 Il Prodotto Cartesiano: la base di tutto

Prima di parlare dei JOIN, è essenziale capire il **prodotto cartesiano**, perché è l'operazione primitiva su cui tutti i JOIN si basano. Il prodotto cartesiano di due tabelle A e B produce una nuova tabella in cui **ogni riga di A è combinata con ogni riga di B**: se A ha 100 righe e B ne ha 50, il prodotto cartesiano avrà 100 × 50 = 5000 righe. Come si capisce, da solo è raramente utile e molto costoso computazionalmente.

```sql
SELECT * FROM clienti, ordini;  -- prodotto cartesiano: tutte le combinazioni possibili
```

Il prodotto cartesiano diventa un **JOIN** non appena aggiungiamo una condizione di filtro nella clausola `WHERE` (o meglio, nella clausola `ON` con la sintassi moderna). La condizione `ON` seleziona solo le coppie di righe che "hanno senso", ovvero quelle dove la FK della tabella figlia corrisponde alla PK della tabella padre.

### 4.2 INNER JOIN — il JOIN più comune

L'`INNER JOIN` è il tipo di JOIN più usato. Restituisce **solo le righe per cui esiste una corrispondenza in entrambe le tabelle**. In altre parole, se una riga della tabella sinistra non ha nessuna corrispondenza nella tabella destra (o viceversa), quella riga viene **esclusa** dal risultato.

Esempio pratico: se vogliamo vedere il nome di ogni cliente insieme ai suoi ordini, un `INNER JOIN` ci darà solo i clienti che hanno almeno un ordine. I clienti che non hanno ancora effettuato nessun ordine non appariranno nel risultato.

```sql
SELECT c.nome, c.cognome, o.id AS id_ordine, o.data, o.totale
FROM clienti c
INNER JOIN ordini o ON c.id = o.cliente_id;

-- Nota: INNER JOIN si può scrivere anche solo JOIN (INNER è implicito)
```

### 4.3 EQUI JOIN — un caso speciale di INNER JOIN

L'`EQUI JOIN` è semplicemente un `INNER JOIN` in cui la condizione di join usa **esclusivamente l'operatore di uguaglianza (`=`)** . Nella pratica quotidiana quasi tutti i JOIN che scriviamo sono equi join, perché di solito uniamo le tabelle mettendo in relazione la FK di una con la PK dell'altra tramite uguaglianza. Il termine è usato principalmente in contesti teorici/accademici; nella sintassi SQL **non esiste** una parola chiave `EQUI JOIN` separata.

### 4.4 LEFT JOIN — tutti i record della sinistra

Il `LEFT JOIN` (o `LEFT OUTER JOIN`) restituisce **tutte le righe della tabella di sinistra**, indipendentemente dal fatto che abbiano una corrispondenza nella tabella di destra. Per le righe di sinistra che non hanno corrispondenze, le colonne della tabella destra vengono riempite con `NULL`.

Il `LEFT JOIN` è indispensabile quando vogliamo trovare i record che **non hanno corrispondenza**. Esempio classico: trovare tutti i clienti che NON hanno mai effettuato un ordine.

```sql
-- Tutti i clienti con i loro ordini (anche quelli senza ordini)
SELECT c.nome, c.cognome, o.id AS id_ordine, o.totale
FROM clienti c
LEFT JOIN ordini o ON c.id = o.cliente_id;

-- Trovare clienti SENZA ordini (il trucco con IS NULL)
SELECT c.nome, c.cognome
FROM clienti c
LEFT JOIN ordini o ON c.id = o.cliente_id
WHERE o.id IS NULL;
```

### 4.5 RIGHT JOIN — tutti i record della destra

Il `RIGHT JOIN` (o `RIGHT OUTER JOIN`) è il simmetrico del `LEFT JOIN`: restituisce **tutte le righe della tabella di destra**, con `NULL` per le colonne della sinistra dove non c'è corrispondenza. Nella pratica il `RIGHT JOIN` si usa meno del `LEFT JOIN`, perché si può sempre ottenere lo stesso risultato scambiando l'ordine delle tabelle e usando un `LEFT JOIN`. Molti sviluppatori preferiscono usare sempre `LEFT JOIN` per coerenza.

### 4.6 CROSS JOIN — il prodotto cartesiano esplicito

Il `CROSS JOIN` produce esplicitamente il **prodotto cartesiano**: ogni riga della prima tabella viene combinata con ogni riga della seconda, senza nessuna condizione di join. Produce un numero di righe uguale al prodotto delle righe delle due tabelle. Viene usato in casi specifici: generare tutte le combinazioni possibili (es: tutti i colori per tutte le taglie di un prodotto), creare calendari, o in test.

```sql
-- Tutte le combinazioni colore × taglia (es: 5 colori × 4 taglie = 20 righe)
SELECT c.nome AS colore, t.nome AS taglia
FROM colori c
CROSS JOIN taglie t;
```

### 4.7 Tabella Riepilogativa dei JOIN

| Tipo di JOIN | Cosa restituisce | Uso tipico |
| :--- | :--- | :--- |
| `INNER JOIN` | Solo righe con corrispondenza in entrambe le tabelle | Recuperare dati correlati |
| `EQUI JOIN` | Come `INNER JOIN` ma con solo operatore `=` | Termine teorico, sinonimo pratico di `INNER JOIN` |
| `LEFT JOIN` | Tutte le righe di sinistra + corrispondenze destra (`NULL` se assente) | Trovare record con o senza corrispondenza |
| `RIGHT JOIN` | Tutte le righe di destra + corrispondenze sinistra (`NULL` se assente) | Simmetrico del `LEFT JOIN` |
| `CROSS JOIN` | Prodotto cartesiano: ogni riga × ogni riga | Generare tutte le combinazioni |
