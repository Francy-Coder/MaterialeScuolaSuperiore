## 1.1 Dato e Informazione: qual è la differenza?

Per comprendere il mondo delle basi di dati, la prima cosa da chiarire è la distinzione tra **dato** e **informazione**, perché spesso questi due termini vengono usati come sinonimi, ma in informatica hanno significati ben precisi.

Un ==**dato** è un valore grezzo, isolato, privo di contesto==. Ad esempio la stringa "37", il numero 42, oppure la data "2025-01-15" sono tutti dati: da soli non ci dicono nulla di utile. Non sappiamo se 37 è una temperatura, un'età, un codice postale o un punteggio.

==L'**informazione**==, invece, ==è un dato che è stato collocato in un contesto che gli attribuisce un significato preciso e utile per chi lo riceve==. Quando diciamo "la temperatura corporea del paziente è 37 gradi Celsius", stiamo trasformando il dato "37" in un'informazione: ora sappiamo di cosa si tratta, in quale unità di misura, e possiamo trarne una conclusione (il paziente sta bene).

| 📖  **Formula chiave**<br><br>**DATO + CONTESTO = INFORMAZIONE**. ==I database gestiscono dati strutturati; sta all'applicazione e all'utente dare loro il contesto corretto per ricavarne informazioni utili.== |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

## 1.2 Il Ciclo di Vita del Dato

==I dati non nascono e muoiono in modo istantaneo==: ==attraversano un percorso== ben definito che si ==chiama **ciclo di vita del dato**==. Conoscere questo ciclo è importante perché ==ogni fase richiede strumenti e attenzioni diverse==.

1.  ==**Raccolta o Acquisizione**==: i ==dati vengono generati o catturati da una fonte== (un sensore, un form web, un'operazione bancaria, la compilazione di un modulo cartaceo successivamente digitalizzato). In questa fase è fondamentale ==garantire che i dati raccolti siano accurati e completi.==

2.  **==Memorizzazione==**: i ==dati vengono salvati su un supporto persistente== (disco rigido, SSD, cloud). È qui che ==entrano in gioco i database e i DBMS==, di cui parleremo tra poco. La memorizzazione deve ==garantire che i dati non vengano persi, corrotti o duplicati in modo incontrollato.==

	- Database (DB): Una collezione organizzata e strutturata di dati, memorizzata in modo permanente e gestita centralmente.

3.  **==Elaborazione==**: i ==dati vengono trasformati, aggregati, analizzati==. Un esempio classico è una query SQL che calcola la media delle vendite mensili oppure un algoritmo che classifica i clienti per fatturato.

4.  ==**Distribuzione o Presentazione**==: il ==risultato dell'elaborazione viene reso disponibile agli utenti== (report, grafici, pagine web, export in Excel). In questa fase è ==cruciale la sicurezza==: ==non tutti gli utenti devono poter vedere tutti i dati.==

5.  ==**Archiviazione o Eliminazione**==: i ==dati che non servono più== nell'operatività corrente ==vengono archiviati== (mantenuti ma resi meno accessibili) ==oppure definitivamente cancellati==, ==rispettando== le ==normative sulla privacy== (come il GDPR in Europa).

## 1.3 Dai File Tradizionali ai DBMS: perché è cambiato tutto

==Prima che i DBMS diventassero lo standard==, le ==applicazioni gestivano i dati attraverso file separati==. ==Ogni programma aveva i suoi file, nel formato che preferiva==: file di testo, file CSV, file binari proprietari. ==Questo approccio==, apparentemente semplice, ==nascondeva problemi enormi che oggi, grazie ai DBMS, abbiamo risolto.==

### Problemi dell'approccio a file tradizionali:

- ==**Ridondanza dei dati**:== Immaginiamo un'azienda in cui sia l'ufficio vendite che l'ufficio contabilità memorizzano il nome e l'indirizzo dei clienti nei loro rispettivi file. Lo stesso dato (il cliente Mario Rossi, via Roma 5) esiste in due posti diversi. Questo ==spreca spazio==, ma soprattutto crea il ==secondo== problema, ancora più grave: ==l'inconsistenza==.

- ==**Inconsistenza**==: Si verifica quando le due copie dello stesso dato divergono. L'ufficio vendite ha aggiornato l'indirizzo di Mario Rossi (che si è trasferito), ma l'ufficio contabilità no. Ora il sistema contiene due "verità" diverse per lo stesso cliente: quale è quella giusta? Nessuno lo sa con certezza.

- **Dipendenza fisica**: I programmi erano strettamente legati alla struttura del file. Se si decideva di aggiungere un campo al file clienti, bisognava riscrivere tutti i programmi che lo leggevano. Questo rendeva ogni modifica costosissima e rischiosa.

- **Difficoltà di accesso concorrente**: Se due utenti tentavano di modificare lo stesso file contemporaneamente, i risultati erano imprevedibili: dati corrotti, scritture perdute, crash del sistema.

I **DBMS** nascono proprio per risolvere tutti questi problemi in modo sistematico e garantire una gestione efficiente, sicura e coerente dei dati.

## 1.4 Cos'è un DBMS e cosa garantisce

| 📖  **DBMS — Database Management System**<br><br>Un **DBMS** è un software che gestisce basi di dati garantendo **persistenza, integrità dei dati, controllo della concorrenza, sicurezza e indipendenza fisica e logica** dei dati rispetto alle applicazioni che li usano. |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

Approfondiamo queste garanzie una per una, perché all'interrogazione è fondamentale saperle spiegare:

- **Integrità**: il DBMS garantisce che i dati rispettino sempre le regole definite dallo schema (es: l'età non può essere negativa, ogni ordine deve riferirsi a un cliente esistente). Se un'operazione violerebbe queste regole, il DBMS la rifiuta.

- **Sicurezza**: il DBMS controlla chi può fare cosa: un utente può leggere ma non modificare, un altro può accedere solo a certe tabelle, ecc.

- **Scalabilità**: possibilità del DBMS di gestire una crescita dei dati e degli utenti, sfruttando le risorse disponibili (come spazio su disco e potenza di calcolo) senza perdere efficienza. In altre parole, il sistema può “espandersi” mantenendo buone prestazioni.

- **Linguaggio**: per interagire con il database è necessario usare un linguaggio comune, come SQL, che permette di comunicare con il DBMS per creare strutture, inserire dati e fare interrogazioni.

- **Concorrenza**: il DBMS gestisce gli accessi simultanei di più utenti/applicazioni, evitando che le operazioni interferiscano tra loro usando meccanismi di lock e transazioni.

- **Persistenza**: i dati sopravvivono alla fine del programma che li ha creati. A differenza di una variabile in memoria RAM che scompare quando il programma termina, i dati in un database rimangono finché non li si cancella esplicitamente.

- **Indipendenza fisica**: le applicazioni non devono sapere dove e come i dati sono fisicamente memorizzati su disco. Il DBMS astrae questi dettagli.

- **Indipendenza logica**: è possibile modificare la struttura logica del database (aggiungere una colonna, rinominare una tabella) senza dover riscrivere tutte le applicazioni.

## 1.5 Schema e Istanza

Nel mondo dei database, è fondamentale distinguere due livelli: lo **schema** e l'**istanza**.

- **Schema**: è la descrizione della struttura del database: quali tabelle esistono, quali colonne ha ciascuna tabella, quali sono i tipi di dato, quali sono i vincoli e le relazioni tra le tabelle. Lo schema è come il progetto architettonico di un edificio: descrive cosa c'è, senza contenere i dati reali. Lo schema cambia raramente.

- **Istanza**: è l'insieme dei dati effettivamente presenti nel database in un dato momento. È come le persone e i mobili che abitano l'edificio: cambiano continuamente man mano che vengono inseriti, modificati o cancellati record.

## 1.6 RDBMS (Relational Data Base Management System)

Un **RDBMS** (Relational Data Base Management System) è un sistema di gestione di basi di dati relazionali, cioè organizzate in tabelle (relazioni).

Le tabelle sono collegate tra loro tramite relazioni, che si realizzano associando i dati di una tabella con quelli di un’altra, di solito attraverso chiavi (come chiavi primarie e chiavi esterne).

👉 Esiste una relazione quando un elemento di una tabella è collegato a uno o più elementi di un’altra tabella (ad esempio: un ordine è collegato a un cliente).

## 1.7 Come si progetta un DB?

La progettazione di un database non consiste nel creare subito delle tabelle, ma è un processo ingegneristico diviso in fasi. Questo approccio evita errori costosi, ridondanze e problemi di performance in futuro.

#### 1. Analisi dei Requisiti (La Raccolta)

Prima di progettare, bisogna capire cosa serve. Si raccolgono le specifiche tramite interviste agli utenti, analisi di moduli cartacei o documenti aziendali. Il risultato è un documento in linguaggio naturale che descrive:

- **Dati da gestire**: (es. "Dobbiamo memorizzare nome, cognome e codice fiscale degli studenti").
- **Operazioni richieste**: (es. "Il sistema deve permettere di calcolare la media dei voti").
- **Vincoli**: (es. "Ogni studente deve avere un codice identificativo univoco").

#### 2. Progettazione Concettuale (Il "Cosa")

In questa fase si crea una rappresentazione astratta della realtà, indipendente dal software che useremo.

- **Strumento**: Si utilizza il **Modello E-R** (Entity-Relationship).
- **Obiettivo**: Rappresentare graficamente le **Entità** (oggetti del mondo reale come Studente o Corso) e le **Relazioni** (i legami tra loro, come *Lo studente frequenta il corso*).
- **Vantaggio**: È un linguaggio comprensibile anche ai non informatici per verificare che i requisiti siano corretti.

#### 3. Progettazione Logica (Il "Come")

Qui si traduce il modello concettuale in una struttura che il computer può gestire, solitamente seguendo il **Modello Relazionale**.

- **Processo**: Le entità diventano **Tabelle**, gli attributi diventano **Colonne** e le relazioni tra dati vengono gestite tramite **Chiavi Primarie** e **Chiavi Esterne** (Foreign Keys).
- **Normalizzazione**: In questa fase si applicano le regole di normalizzazione per eliminare la ridondanza e prevenire anomalie nei dati (inserimenti o cancellazioni errate).

#### 4. Progettazione Fisica (L'Implementazione)

È l'ultima fase, in cui si passa alla pratica sul DBMS scelto (es. MySQL, PostgreSQL, Oracle).

- **Definizione dei tipi**: Si decide se un dato è un intero, una stringa di testo o una data.
- **Ottimizzazione**: Si creano gli **Indici** per velocizzare le ricerche e si definiscono i parametri di memoria e sicurezza.
- **Codice**: Il risultato finale è il codice **SQL** (DDL - Data Definition Language) che crea effettivamente il database.