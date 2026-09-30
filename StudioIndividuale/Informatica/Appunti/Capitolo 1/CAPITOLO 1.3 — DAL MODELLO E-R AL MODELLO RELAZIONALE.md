
### 3.1 Il Modello Relazionale

Il modello relazionale, proposto da Edgar Codd nel 1970, è il modello matematico alla base di tutti i database SQL moderni. L'idea fondamentale è semplicissima: tutti i dati sono organizzati in **tabelle** (chiamate *relazioni* in senso matematico), dove ogni riga (**tupla**) rappresenta un fatto del mondo reale e ogni colonna (**attributo**) rappresenta una proprietà.

Una tabella è quindi una struttura bidimensionale: le righe contengono i dati, le colonne ne definiscono la struttura. A differenza di un foglio Excel, però, una tabella relazionale rispetta regole rigide:
- Ogni colonna ha un **tipo di dato fisso**.
- L'ordine delle righe **non ha significato** (una tabella è un insieme, non una lista ordinata).
- **Non esistono righe duplicate**.

### 3.2 Regole di Traduzione dal Modello E/R

La traduzione dal diagramma E/R al modello relazionale segue regole precise e meccaniche. Una volta ristrutturato il diagramma E/R (come visto nel capitolo precedente), si applicano queste regole:

#### Regola 1 — Entità → Tabella

Ogni **entità** diventa una **tabella**. Il nome della tabella corrisponde al nome dell'entità. Gli attributi dell'entità diventano le colonne della tabella. L'attributo chiave dell'entità diventa la **Primary Key** della tabella.

> STUDENTE(matricola, cognome, nome, data_nascita, email)

#### Regola 2 — Relazione 1:N → Foreign Key
Una relazione **uno-a-molti** si traduce aggiungendo alla tabella del lato "molti" (N) una nuova colonna che contiene la chiave primaria della tabella del lato "uno" (1). Questa nuova colonna si chiama **Foreign Key** (chiave esterna). Se la relazione ha attributi propri, diventano colonne aggiuntive nella stessa tabella del lato N.

> Relazione 1:N tra DIPARTIMENTO e IMPIEGATO  
> Si aggiunge cod_dipartimento (FK) nella tabella IMPIEGATO  
> IMPIEGATO(id, cognome, nome, stipendio, cod_dipartimento FK→DIPARTIMENTO)

#### Regola 3 — Relazione N:M → Tabella Ponte

Una relazione **molti-a-molti** si traduce creando una **nuova tabella**, chiamata **tabella ponte** o *junction table*. Questa tabella ha almeno due colonne: le chiavi primarie delle due entità coinvolte, entrambe come Foreign Key. La combinazione di queste due FK forma la **Primary Key** della tabella ponte. Gli eventuali attributi della relazione diventano colonne aggiuntive.

> Relazione N:M tra STUDENTE e CORSO (con attributo voto)  
> ISCRIZIONE(matricola FK→STUDENTE, cod_corso FK→CORSO, data_iscrizione, voto)  
> PK composta: (matricola, cod_corso)

#### Regola 4 — Relazione 1:1 → Foreign Key (scelta)

Una relazione **uno-a-uno** si traduce aggiungendo la FK in **una delle due tabelle**. La scelta migliore è di inserire la FK nella tabella con **partecipazione obbligatoria** (cardinalità minima 1), per evitare valori NULL. In alternativa, se entrambe le entità hanno partecipazione obbligatoria, si può anche **fondere** le due tabelle in una sola.

### 3.3 Primary Key (PK) — Vincolo di Unicità e Non-Nullità

| 📖 **Primary Key**<br><br>La **Primary Key** è l'attributo (o la combinazione di attributi) che identifica **univocamente** ogni riga di una tabella. Impone automaticamente due vincoli: **unicità** (nessuna coppia di righe può avere lo stesso valore di PK) e **not-null** (il valore non può mai essere NULL). Ogni tabella ha **esattamente una** PK. |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

La PK può essere:
- **Semplice**: formata da un solo attributo.
- **Composta**: formata da più attributi (frequente nelle tabelle ponte delle relazioni N:M).

> **Buona pratica**: Usare PK semplici e **artificiali** (come un intero autoincrementante) per semplicità e performance, riservando i vincoli `UNIQUE` agli attributi naturalmente univoci (come il codice fiscale o l'email).

### 3.4 Foreign Key (FK) — Vincolo di Integrità Referenziale

| 📖 **Foreign Key e Integrità Referenziale**<br><br>Una **Foreign Key** è un attributo (o combinazione di attributi) di una tabella che **referenzia** la Primary Key di un'altra tabella (o della stessa). Il **vincolo di integrità referenziale** garantisce che non possano esistere valori FK senza il corrispondente valore PK nella tabella referenziata. |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

Questo vincolo si applica in tre situazioni critiche che è importante conoscere:

- **Inserimento di una riga figlia**: se si tenta di inserire una riga con un valore FK che non esiste come PK nella tabella padre, il DBMS **rifiuta** l'operazione. Non si può creare un ordine per un cliente che non esiste.

- **Cancellazione di una riga padre**: se si tenta di cancellare una riga nella tabella padre che ha figli nella tabella figlia, il DBMS deve decidere cosa fare in base all'opzione configurata:
    - `RESTRICT`: rifiuta la cancellazione.
    - `CASCADE`: cancella automaticamente anche i figli.
    - `SET NULL`: imposta la FK figlia a NULL.

- **Modifica della PK padre**: analogamente alla cancellazione, anche la modifica della PK padre è soggetta alle stesse opzioni (`RESTRICT`, `CASCADE`, `SET NULL`).

| ⚠️ **Attenzione**<br><br>La scelta tra `RESTRICT`, `CASCADE` e `SET NULL` non è neutra: dipende dalla **semantica** del dominio applicativo. Cancellare un cliente dovrebbe probabilmente essere `RESTRICT` (non vogliamo perdere la storia degli ordini); cancellare un prodotto dal catalogo potrebbe essere `CASCADE` sulle righe del carrello ma `RESTRICT` sugli ordini già completati. |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
