
Ora che abbiamo capito come progettare un database a livello concettuale e logico, vediamo come tradurre questo progetto in SQL concreto. Il **DDL** (*Data Definition Language*) è la parte di SQL che si occupa di creare, modificare ed eliminare la **struttura** del database.

### 6.1 Creare il Database

```sql
-- Crea il database (se non esiste già) con codifica UTF-8
CREATE DATABASE IF NOT EXISTS scuola
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- Selezionare il database su cui lavorare
USE scuola;
```

La scelta della codifica è importante: `utf8mb4` supporta tutti i caratteri Unicode incluse le emoji e i caratteri di molte lingue asiatiche. La *collation* `utf8mb4_unicode_ci` determina come vengono confrontate le stringhe (`ci` = *case-insensitive*: 'mario' e 'Mario' sono considerati uguali nei confronti).

### 6.2 Tipi di Dato Principali

Prima di creare le tabelle, è fondamentale conoscere i tipi di dato disponibili in MySQL/MariaDB, perché scegliere il tipo corretto per ogni colonna è importante sia per la correttezza dei dati che per le performance:

- **`INT` (INTEGER)**: intero a 32 bit, da -2.147.483.648 a +2.147.483.647. Si usa `UNSIGNED` per valori solo positivi (0 a 4.294.967.295). `BIGINT` per interi molto grandi. `SMALLINT` e `TINYINT` per risparmiare spazio con valori piccoli.

- **`DECIMAL(p, s)`**: numero decimale **esatto** con `p` cifre totali di cui `s` decimali. Es: `DECIMAL(8,2)` può contenere valori come `123456.78`. **Usarlo per valori monetari** dove la precisione è fondamentale (mai usare `FLOAT` o `DOUBLE` per il denaro per via degli errori di arrotondamento in virgola mobile).

- **`FLOAT` / `DOUBLE`**: numeri in virgola mobile a precisione singola/doppia. Veloci nei calcoli ma con piccoli errori di arrotondamento. Usarli per misure scientifiche, **mai per valori monetari**.

- **`VARCHAR(n)`**: stringa di lunghezza variabile, fino a `n` caratteri (max 65535). Occupa solo lo spazio necessario + 1-2 byte per la lunghezza. Il tipo più usato per stringhe.

- **`CHAR(n)`**: stringa di lunghezza **fissa** di `n` caratteri. Se il valore è più corto, viene riempito con spazi. Usato per codici di lunghezza fissa (es: codice paese ISO a 2 caratteri, codice fiscale).

- **`TEXT` / `MEDIUMTEXT` / `LONGTEXT`**: testo di lunghezza arbitraria. Usato per contenuti lunghi come articoli, descrizioni, HTML. Non può essere usato come PK o come chiave di un indice completo.

- **`DATE`**: solo la data nel formato `YYYY-MM-DD`. Range: `1000-01-01` a `9999-12-31`.

- **`DATETIME`**: data e ora nel formato `YYYY-MM-DD HH:MM:SS`. Non dipende dal fuso orario.

- **`TIMESTAMP`**: simile a `DATETIME` ma memorizzato in UTC e convertito automaticamente al fuso orario della connessione. Utile per tracciare quando è avvenuto qualcosa. Si può impostare su `CURRENT_TIMESTAMP` come default.

- **`BOOLEAN` (`TINYINT(1)`)**: in MySQL non esiste un vero tipo `BOOLEAN`: è un alias per `TINYINT(1)`. I valori `0` e `1` rappresentano `false` e `true`.

- **`ENUM('v1','v2',...)`**: permette solo i valori dell'elenco specificato. Utile per stati o categorie fisse (es: `ENUM('attivo','inattivo','sospeso')`).

### 6.3 CREATE TABLE e i Vincoli

Il comando `CREATE TABLE` crea una nuova tabella e definisce la struttura di ciascuna colonna con i relativi vincoli. Vediamo prima un esempio completo e poi analizziamo ogni vincolo nel dettaglio:

```sql
CREATE TABLE studenti (
    id          INT             NOT NULL AUTO_INCREMENT,
    matricola   CHAR(6)         NOT NULL,
    cognome     VARCHAR(50)     NOT NULL,
    nome        VARCHAR(50)     NOT NULL,
    email       VARCHAR(100)    NOT NULL,
    data_nasc   DATE            NULL,
    media_voti  DECIMAL(4,2)    DEFAULT 0.00,
    attivo      BOOLEAN         DEFAULT TRUE,
    classe_id   INT             NULL,

    PRIMARY KEY (id),
    UNIQUE      (matricola),
    UNIQUE      (email),
    FOREIGN KEY (classe_id) REFERENCES classi(id)
        ON DELETE SET NULL ON UPDATE CASCADE
);
```

#### `NOT NULL`
Impedisce che la colonna contenga il valore `NULL`. `NULL` in SQL non è zero né stringa vuota: è l'assenza di valore. Una colonna `NOT NULL` deve ricevere un valore esplicito in ogni `INSERT` (a meno che non abbia un `DEFAULT`). La PK è sempre `NOT NULL` implicitamente.

#### `UNIQUE`
Garantisce che tutti i valori di quella colonna siano **distinti** tra loro. A differenza della PK, una colonna `UNIQUE` può contenere `NULL` (più righe possono avere `NULL` perché `NULL` non è uguale a nessun altro valore, nemmeno a un altro `NULL`). Una tabella può avere più colonne con `UNIQUE`.

#### `AUTO_INCREMENT`
Assegna automaticamente il successivo valore intero disponibile quando si inserisce una nuova riga senza specificare esplicitamente il valore della colonna. Viene usato quasi sempre sulla colonna `id` che funge da PK. Il valore iniziale è 1 e incrementa di 1 a ogni `INSERT` (il valore incrementa anche se la riga viene poi cancellata: i "buchi" nella sequenza sono normali).

#### `PRIMARY KEY`
Definisce la chiave primaria della tabella. Impone automaticamente **unicità** e `NOT NULL`. Se è composta da più colonne, si dichiara come vincolo a livello di tabella: `PRIMARY KEY (col1, col2)`. Una tabella può avere **una sola** PK. Il DBMS crea automaticamente un indice sulla PK per rendere efficienti le ricerche.

#### `DEFAULT`
Specifica il valore predefinito da usare quando una colonna non viene inclusa nell'`INSERT`. Può essere un valore letterale (`0`, `'attivo'`, `TRUE`) o una funzione speciale come `CURRENT_TIMESTAMP`.

#### `FOREIGN KEY ... REFERENCES`
Definisce il vincolo di **integrità referenziale**. La sintassi completa permette di specificare anche il comportamento in caso di cancellazione (`ON DELETE`) o modifica (`ON UPDATE`) della riga padre:
- `RESTRICT` / `NO ACTION`: blocca l'operazione.
- `CASCADE`: propaga la modifica/cancellazione ai figli.
- `SET NULL`: imposta la FK figlia a `NULL`.
- `SET DEFAULT`: imposta la FK figlia al valore di default.

### 6.4 ALTER TABLE — Modificare la Struttura

Quando la struttura di una tabella deve essere modificata dopo la sua creazione (cosa frequente nell'evoluzione di un'applicazione), si usa `ALTER TABLE`:

```sql
-- Aggiungere una nuova colonna
ALTER TABLE studenti ADD COLUMN telefono VARCHAR(20) NULL;

-- Aggiungere una colonna in posizione specifica
ALTER TABLE studenti ADD COLUMN note TEXT NULL AFTER email;

-- Modificare il tipo o i vincoli di una colonna esistente
ALTER TABLE studenti MODIFY COLUMN email VARCHAR(150) NOT NULL;

-- Rinominare una colonna (e opzionalmente cambiarne il tipo)
ALTER TABLE studenti CHANGE COLUMN media_voti media DECIMAL(5,2) DEFAULT 0.00;

-- Eliminare una colonna
ALTER TABLE studenti DROP COLUMN telefono;

-- Aggiungere un vincolo UNIQUE su una colonna esistente
ALTER TABLE studenti ADD CONSTRAINT uq_matricola UNIQUE (matricola);

-- Aggiungere una Foreign Key
ALTER TABLE studenti ADD FOREIGN KEY (classe_id) REFERENCES classi(id);
```

### 6.5 DROP TABLE e DROP DATABASE

Il comando `DROP` elimina **definitivamente** una tabella o un database, compresi tutti i dati contenuti. È un'operazione **irreversibile**: non esiste un cestino o un "annulla". Prima di eseguire un `DROP`, assicurarsi sempre di avere un backup o di essere assolutamente certi di quello che si sta facendo.

```sql
-- Eliminare una tabella (IF EXISTS evita l'errore se la tabella non esiste)
DROP TABLE IF EXISTS studenti;

-- Eliminare un database con tutto il suo contenuto
DROP DATABASE IF EXISTS scuola;
```

| ⚠️ **Attenzione**<br><br>Non si può eliminare una tabella **padre** (quella referenziata da una FK) finché esistono tabelle **figlie** che la referenziano. Bisogna prima eliminare (o modificare) le tabelle figlie, oppure disabilitare temporaneamente i controlli delle FK con `SET FOREIGN_KEY_CHECKS = 0` (da usare con estrema cautela). |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
