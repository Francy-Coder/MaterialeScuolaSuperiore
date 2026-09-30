
Il **DML** (*Data Manipulation Language*) è la parte di SQL che si occupa di **manipolare i dati** all'interno delle tabelle: inserire nuove righe, modificare righe esistenti e cancellare righe.

### 8.1 INSERT — Inserire Nuovi Dati

Il comando `INSERT` aggiunge nuove righe in una tabella. La forma base specifica la tabella, le colonne da popolare e i valori corrispondenti. È buona pratica **elencare sempre esplicitamente le colonne** (anche se si inseriscono tutte) per rendere il codice resistente alle modifiche future della struttura della tabella.

```sql
-- Inserimento con elenco esplicito delle colonne (forma raccomandata)
INSERT INTO prodotti (nome, descrizione, prezzo, categoria_id, attivo)
VALUES ('Laptop 15"', 'Processore i7, 16GB RAM, 512GB SSD', 899.99, 3, TRUE);

-- Inserimento multiplo in una sola istruzione (più efficiente di più INSERT separati)
INSERT INTO tag (nome, colore) VALUES
('promozione', '#FF0000'),
('novità',     '#00AA00'),
('esaurito',   '#888888');

-- Inserimento con valori di default (le colonne omesse usano il loro DEFAULT)
INSERT INTO clienti (cognome, nome, email)
VALUES ('Rossi', 'Mario', 'mario.rossi@email.it');
```

### 8.2 UPDATE — Modificare Dati Esistenti

Il comando `UPDATE` modifica i valori delle colonne nelle righe che soddisfano la condizione `WHERE`. Ogni colonna da aggiornare viene specificata con `SET colonna = nuovo_valore`. Si possono aggiornare più colonne in una sola istruzione separandole con la virgola.

```sql
-- Aggiornare una singola riga (tramite PK è la forma più sicura)
UPDATE prodotti
SET prezzo = 849.99, aggiornato = NOW()
WHERE id = 42;

-- Aggiornare più righe che soddisfano una condizione
UPDATE prodotti
SET prezzo = prezzo * 0.90    -- sconto del 10%
WHERE categoria_id = 3 AND attivo = TRUE;

-- Aggiornare usando valori di un'altra tabella (UPDATE con JOIN)
UPDATE prodotti p
JOIN categorie c ON p.categoria_id = c.id
SET p.iva = c.aliquota_iva
WHERE c.nome = 'Alimentari';
```

| ⚠️ **Attenzione**<br><br>Non dimenticare **mai** il `WHERE` in un `UPDATE`! Un `UPDATE` senza `WHERE` modifica **TUTTE** le righe della tabella. Prima di eseguire un `UPDATE` critico, è buona pratica eseguire prima una `SELECT` con la stessa clausola `WHERE` per verificare quali righe verranno toccate. |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

### 8.3 DELETE — Cancellare Righe

Il comando `DELETE` rimuove le righe che soddisfano la condizione `WHERE`. A differenza di `DROP TABLE` (che elimina la struttura), `DELETE` elimina solo i dati lasciando intatta la tabella.

```sql
-- Cancellare una singola riga
DELETE FROM prodotti WHERE id = 42;

-- Cancellare righe con una condizione
DELETE FROM sessioni WHERE scadenza < NOW();

-- Svuotare completamente una tabella (più veloce di DELETE senza WHERE)
TRUNCATE TABLE carrello;  -- ATTENZIONE: azzera anche l'AUTO_INCREMENT
```

**Nota su `TRUNCATE`**: `TRUNCATE` è simile a `DELETE` senza `WHERE` (svuota la tabella) ma è molto più veloce perché non rimuove le righe una per una ma ricrea la struttura della tabella. Tuttavia ha differenze importanti:
- Non attiva i trigger.
- Non può essere incluso in una transazione in MySQL.
- Azzera il contatore `AUTO_INCREMENT`.