
La **normalizzazione** è il processo di analisi e ristrutturazione di uno schema relazionale per eliminare **ridondanze** e **anomalie**. È una delle parti più teoriche del corso, ma è fondamentale per capire perché progettiamo i database nel modo in cui lo facciamo.

### 5.1 Ridondanza e Anomalie: il problema

Immaginiamo di avere questa tabella non normalizzata che registra quale studente frequenta quale corso e chi è il docente del corso:

```
FREQUENTA(matricola, nome_studente, cod_corso, titolo_corso, docente, voto)
```

A prima vista sembra comoda perché ha tutto in un posto. Ma nasconde problemi seri:

- **Ridondanza**: il titolo del corso "Matematica" e il nome del suo docente sono ripetuti in ogni riga che riguarda quel corso. Se 100 studenti frequentano Matematica, i dati del corso si ripetono 100 volte.

- **Anomalia di aggiornamento**: se il docente di Matematica cambia, devo aggiornare 100 righe. Se ne dimentico una, il database diventa inconsistente (alcune righe dicono Prof. Rossi, altre Prof. Bianchi per lo stesso corso).

- **Anomalia di inserimento**: non posso inserire un nuovo corso nel database finché non esiste almeno uno studente iscritto, perché la matricola (parte della PK) non può essere `NULL`.

- **Anomalia di cancellazione**: se cancello l'unico studente iscritto a un certo corso, perdo automaticamente anche tutte le informazioni sul corso stesso (titolo, docente).

Questi problemi nascono da una progettazione che mette insieme in un'unica tabella informazioni che "parlano" di concetti diversi. La soluzione è **separare** le informazioni in tabelle distinte, ciascuna dedicata a un unico concetto.

### 5.2 Dipendenze Funzionali

| 📖 **Dipendenza Funzionale**<br><br>Diciamo che **X → Y** (X determina funzionalmente Y) se per ogni valore di X esiste **uno e un solo** valore corrispondente di Y. In altre parole, conoscere X è sufficiente per determinare univocamente Y. <br><br>*Esempio*: `cod_fiscale → cognome` (dato il codice fiscale di una persona, il suo cognome è univocamente determinato). |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

Le dipendenze funzionali ci permettono di identificare le anomalie. Se nella tabella `FREQUENTA` abbiamo `cod_corso → titolo_corso` e `cod_corso → docente`, significa che il titolo e il docente dipendono solo dal codice corso, non dall'intera chiave `(matricola, cod_corso)`. Questo è il segnale che la tabella non è normalizzata.

- **Dipendenza parziale**: un attributo non-chiave dipende solo da una **parte** della Primary Key (che deve essere composta). È la violazione della **2NF**.
- **Dipendenza transitiva**: un attributo non-chiave A dipende da un altro attributo non-chiave B che a sua volta dipende dalla PK. Quindi A → PK in modo indiretto, tramite B. È la violazione della **3NF**.

### 5.3 Decomposizione Senza Perdite

Quando normalizziamo, scomponiamo le tabelle in tabelle più piccole. È fondamentale che questa scomposizione sia **"senza perdite"** (*lossless*): deve essere sempre possibile ricostruire la tabella originale tramite un `JOIN` delle tabelle risultanti, senza ottenere righe spurie (false) né perdere righe reali.

La condizione che garantisce la scomposizione senza perdite è: l'attributo (o gli attributi) su cui le due tabelle vengono collegate dopo la scomposizione deve essere la **Primary Key di almeno una** delle due tabelle risultanti. In pratica, questo significa che si scompone mettendo la FK in una tabella che punta alla PK dell'altra.

### 5.4 Prima Forma Normale (1NF)

| 📖 **Prima Forma Normale (1NF)**<br><br>Una tabella è in Prima Forma Normale se:<br>1. Tutti gli attributi sono **atomici**, cioè ogni cella contiene un unico valore indivisibile.<br>2. Non esistono gruppi di attributi che si ripetono.<br>3. Esiste una **chiave primaria**.<br>4. Non esistono righe duplicate. |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

Violare la 1NF significa avere celle con valori multipli (come una lista separata da virgole in una cella) o colonne ripetute (`telefono1`, `telefono2`, `telefono3`). Questo rende le query SQL estremamente difficili o impossibili da scrivere correttamente.

*Esempio di tabella NON in 1NF*: un cliente con la colonna "telefoni" che contiene `"333-1234567, 347-9876543"`. La soluzione è creare una tabella separata `TELEFONO` con una riga per ogni numero, con la FK che punta al cliente.

### 5.5 Seconda Forma Normale (2NF)

| 📖 **Seconda Forma Normale (2NF)**<br><br>Una tabella è in Seconda Forma Normale se:<br>1. È in **1NF**.<br>2. Ogni attributo non-chiave dipende funzionalmente dall'**intera Primary Key** (non da una sua parte).<br><br>**Nota**: La 2NF è rilevante solo quando la PK è **composta**. Se la PK è formata da un solo attributo e la tabella è in 1NF, è automaticamente in 2NF. |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

Riprendendo l'esempio precedente: nella tabella `FREQUENTA(matricola, cod_corso, nome_studente, titolo_corso, docente, voto)`, la PK è composta da `(matricola, cod_corso)`.

- L'attributo `voto` dipende dall'**intera** PK (il voto dipende dallo specifico studente in quello specifico corso).
- Ma `titolo_corso` e `docente` dipendono **solo** da `cod_corso`: questa è una **dipendenza parziale** che viola la 2NF.

**Soluzione**: Separare gli attributi che dipendono solo da `cod_corso` in una tabella `CORSO(cod_corso PK, titolo, docente)`, e mantenere nella tabella `FREQUENTA` solo gli attributi che dipendono dall'intera PK: `FREQUENTA(matricola FK, cod_corso FK, voto)`.

### 5.6 Terza Forma Normale (3NF)

| 📖 **Terza Forma Normale (3NF)**<br><br>Una tabella è in Terza Forma Normale se:<br>1. È in **2NF**.<br>2. Nessun attributo non-chiave dipende **transitivamente** dalla Primary Key. In altre parole, ogni attributo non-chiave dipende **direttamente e solo** dalla PK, non attraverso altri attributi non-chiave. |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

Esempio di dipendenza transitiva: nella tabella `IMPIEGATO(id, nome, cod_dipartimento, nome_dipartimento, sede_dipartimento)`, la PK è `id`.

- Il `nome` dell'impiegato dipende direttamente da `id` (OK).
- Ma `nome_dipartimento` dipende da `cod_dipartimento`, che a sua volta dipende da `id`. Quindi `id → cod_dipartimento → nome_dipartimento`: questa è una **dipendenza transitiva** che viola la 3NF.

**Soluzione**: Creare una tabella separata `DIPARTIMENTO(cod_dipartimento PK, nome, sede)` e rimuovere `nome_dipartimento` e `sede_dipartimento` dalla tabella `IMPIEGATO`, lasciando solo la FK `cod_dipartimento`.

### 5.7 Tabella Riepilogativa delle Forme Normali

| Forma Normale | Cosa elimina | Condizione aggiuntiva rispetto alla precedente |
| :--- | :--- | :--- |
| **1NF** | Attributi non atomici, gruppi ripetuti | Tutti i valori sono atomici; esiste una PK |
| **2NF** | Dipendenze parziali dalla PK | Ogni attributo non-chiave dipende dall'**intera** PK |
| **3NF** | Dipendenze transitive dalla PK | Nessun attributo non-chiave dipende da un altro attributo non-chiave |
