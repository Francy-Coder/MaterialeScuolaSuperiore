
## CAPITOLO 1 — BASI DI DATI - CONCETTI FONDAMENTALI

### 1.1 Dato e Informazione: qual è la differenza?

Per comprendere il mondo delle basi di dati, la prima cosa da chiarire è la distinzione tra **dato** e **informazione**, perché spesso questi due termini vengono usati come sinonimi, ma in informatica hanno significati ben precisi.

Un ==**dato** è un valore grezzo, isolato, privo di contesto==. Ad esempio la stringa "37", il numero 42, oppure la data "2025-01-15" sono tutti dati: da soli non ci dicono nulla di utile. Non sappiamo se 37 è una temperatura, un'età, un codice postale o un punteggio.

==L'**informazione**==, invece, ==è un dato che è stato collocato in un contesto che gli attribuisce un significato preciso e utile per chi lo riceve==. Quando diciamo "la temperatura corporea del paziente è 37 gradi Celsius", stiamo trasformando il dato "37" in un'informazione: ora sappiamo di cosa si tratta, in quale unità di misura, e possiamo trarne una conclusione (il paziente sta bene).

| 📖 **Formula chiave**<br><br>**DATO + CONTESTO = INFORMAZIONE**. ==I database gestiscono dati strutturati; sta all'applicazione e all'utente dare loro il contesto corretto per ricavarne informazioni utili.== |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

### 1.2 Il Ciclo di Vita del Dato

==I dati non nascono e muoiono in modo istantaneo==: ==attraversano un percorso== ben definito che si ==chiama **ciclo di vita del dato**==. Conoscere questo ciclo è importante perché ==ogni fase richiede strumenti e attenzioni diverse==.

1.  ==**Raccolta o Acquisizione**==: i ==dati vengono generati o catturati da una fonte== (un sensore, un form web, un'operazione bancaria, la compilazione di un modulo cartaceo successivamente digitalizzato). In questa fase è fondamentale ==garantire che i dati raccolti siano accurati e completi.==

2.  **==Memorizzazione==**: i ==dati vengono salvati su un supporto persistente== (disco rigido, SSD, cloud). È qui che ==entrano in gioco i database e i DBMS==, di cui parleremo tra poco. La memorizzazione deve ==garantire che i dati non vengano persi, corrotti o duplicati in modo incontrollato.==

	- Database (DB): Una collezione organizzata e strutturata di dati, memorizzata in modo permanente e gestita centralmente.

3.  **==Elaborazione==**: i ==dati vengono trasformati, aggregati, analizzati==. Un esempio classico è una query SQL che calcola la media delle vendite mensili oppure un algoritmo che classifica i clienti per fatturato.

4.  ==**Distribuzione o Presentazione**==: il ==risultato dell'elaborazione viene reso disponibile agli utenti== (report, grafici, pagine web, export in Excel). In questa fase è ==cruciale la sicurezza==: ==non tutti gli utenti devono poter vedere tutti i dati.==

5.  ==**Archiviazione o Eliminazione**==: i ==dati che non servono più== nell'operatività corrente ==vengono archiviati== (mantenuti ma resi meno accessibili) ==oppure definitivamente cancellati==, ==rispettando== le ==normative sulla privacy== (come il GDPR in Europa).

### 1.3 Dai File Tradizionali ai DBMS: perché è cambiato tutto

==Prima che i DBMS diventassero lo standard==, le ==applicazioni gestivano i dati attraverso file separati==. ==Ogni programma aveva i suoi file, nel formato che preferiva==: file di testo, file CSV, file binari proprietari. ==Questo approccio==, apparentemente semplice, ==nascondeva problemi enormi che oggi, grazie ai DBMS, abbiamo risolto.==

#### Problemi dell'approccio a file tradizionali:

- ==**Ridondanza dei dati**:== Immaginiamo un'azienda in cui sia l'ufficio vendite che l'ufficio contabilità memorizzano il nome e l'indirizzo dei clienti nei loro rispettivi file. Lo stesso dato (il cliente Mario Rossi, via Roma 5) esiste in due posti diversi. Questo ==spreca spazio==, ma soprattutto crea il ==secondo== problema, ancora più grave: ==l'inconsistenza==.

- ==**Inconsistenza**==: Si verifica quando le due copie dello stesso dato divergono. L'ufficio vendite ha aggiornato l'indirizzo di Mario Rossi (che si è trasferito), ma l'ufficio contabilità no. Ora il sistema contiene due "verità" diverse per lo stesso cliente: quale è quella giusta? Nessuno lo sa con certezza.

- **Dipendenza fisica**: I programmi erano strettamente legati alla struttura del file. Se si decideva di aggiungere un campo al file clienti, bisognava riscrivere tutti i programmi che lo leggevano. Questo rendeva ogni modifica costosissima e rischiosa.

- **Difficoltà di accesso concorrente**: Se due utenti tentavano di modificare lo stesso file contemporaneamente, i risultati erano imprevedibili: dati corrotti, scritture perdute, crash del sistema.

I **DBMS** nascono proprio per risolvere tutti questi problemi in modo sistematico e garantire una gestione efficiente, sicura e coerente dei dati.

### 1.4 Cos'è un DBMS e cosa garantisce

| 📖 **DBMS — Database Management System**<br><br>Un **DBMS** è un software che gestisce basi di dati garantendo **persistenza, integrità dei dati, controllo della concorrenza, sicurezza e indipendenza fisica e logica** dei dati rispetto alle applicazioni che li usano. |
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

### 1.5 Schema e Istanza

Nel mondo dei database, è fondamentale distinguere due livelli: lo **schema** e l'**istanza**.

- **Schema**: è la descrizione della struttura del database: quali tabelle esistono, quali colonne ha ciascuna tabella, quali sono i tipi di dato, quali sono i vincoli e le relazioni tra le tabelle. Lo schema è come il progetto architettonico di un edificio: descrive cosa c'è, senza contenere i dati reali. Lo schema cambia raramente.

- **Istanza**: è l'insieme dei dati effettivamente presenti nel database in un dato momento. È come le persone e i mobili che abitano l'edificio: cambiano continuamente man mano che vengono inseriti, modificati o cancellati record.

### 1.6 RDBMS (Relational Data Base Management System)

Un **RDBMS** (Relational Data Base Management System) è un sistema di gestione di basi di dati relazionali, cioè organizzate in tabelle (relazioni).

Le tabelle sono collegate tra loro tramite relazioni, che si realizzano associando i dati di una tabella con quelli di un’altra, di solito attraverso chiavi (come chiavi primarie e chiavi esterne).

👉 Esiste una relazione quando un elemento di una tabella è collegato a uno o più elementi di un’altra tabella (ad esempio: un ordine è collegato a un cliente).

### 1.7 Come si progetta un DB?

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

### 1.8 DDL e DML: i due linguaggi di SQL

Il linguaggio **SQL** (Structured Query Language) si divide in due categorie principali di comandi, che è importante saper distinguere:

#### DDL - Data Definition Language
È il linguaggio per **definire** (o modificare) la **struttura** del database. I comandi DDL operano sullo **schema**:
- `CREATE` (crea tabelle o database)
- `ALTER` (modifica una struttura esistente)
- `DROP` (elimina tabelle o database)

Quando esegui un comando DDL, stai cambiando il "progetto" del database, non i dati in esso contenuti.

#### DML - Data Manipulation Language
È il linguaggio per **manipolare** i **dati**. I comandi DML operano sull'**istanza**:
- `SELECT` (legge i dati)
- `INSERT` (inserisce nuove righe)
- `UPDATE` (modifica righe esistenti)
- `DELETE` (cancella righe)

Lavorano sui dati reali, lasciando invariata la struttura.

## CAPITOLO 2 — IL MODELLO ENTITÀ-RELAZIONE (E-R)

Il modello Entità-Relazione, proposto da Peter Chen nel 1976, è il punto di partenza per la progettazione concettuale di un database. Prima di scrivere una singola riga di SQL, un buon progettista disegna il diagramma E/R per capire quali informazioni deve memorizzare e come si relazionano tra loro. Il diagramma E/R non dipende da nessun DBMS specifico: è una rappresentazione astratta, indipendente dalla tecnologia.

### 2.1 Entità

| 📖 **Entità**<br><br>Un'**entità** rappresenta una classe di oggetti (persone, cose, eventi, concetti) del mondo reale che sono distinguibili tra loro e sui quali vogliamo memorizzare informazioni. Ogni entità viene rappresentata nel diagramma E/R con un **rettangolo** contenente il suo nome, scritto al singolare e in maiuscolo per convenzione. |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

Esempi classici di entità sono: `STUDENTE`, `CORSO`, `PROFESSORE`, `PRODOTTO`, `ORDINE`, `CLIENTE`, `FORNITORE`. È importante capire che un'entità non è un singolo oggetto, ma una **categoria**: `STUDENTE` rappresenta tutti gli studenti, non uno specifico studente chiamato Mario Rossi. Il singolo studente è invece un'**istanza** (o occorrenza) dell'entità `STUDENTE`.

**Come si riconosce un'entità?** Durante la fase di analisi dei requisiti, si tratta generalmente di oggetti che:
- Devono essere distinti dagli altri della stessa categoria (hanno una propria identità).
- Richiedono la memorizzazione di più di un'informazione.

Se dobbiamo solo memorizzare un dato opzionale di un altro oggetto, probabilmente si tratta di un **attributo**, non di un'entità separata.

### 2.2 Attributo

Gli **attributi** sono le proprietà o caratteristiche che descrivono un'entità (o una relazione). Ogni attributo ha un **nome** e un **dominio**, cioè l'insieme dei valori che può assumere. Nel diagramma E/R classico gli attributi sono rappresentati con **ellissi** collegate al rettangolo dell'entità, ma nelle versioni semplificate (più comuni nella pratica scolastica) vengono semplicemente elencati accanto all'entità.

Esistono diverse tipologie di attributi:

- **Attributo semplice (o atomico)**: il tipo più comune. Contiene un unico valore indivisibile.
    - *Esempi*: il nome, il cognome, il codice fiscale, il prezzo.

- **Attributo composto**: è composto da più sotto-attributi logicamente correlati.
    - *Esempio*: l'indirizzo è composto da via, numero civico, CAP e città. Si può trattarlo come un unico attributo oppure scomporlo nei suoi componenti, a seconda di quanto spesso dobbiamo accedere alle singole parti.

- **Attributo multivalore**: può avere più valori contemporaneamente per la stessa istanza dell'entità.
    - *Esempio*: i numeri di telefono di un cliente (potrebbe averne 0, 1 o più).
    - *Rappresentazione*: nei diagrammi E/R si rappresenta con una **doppia ellisse**.
    - *Traduzione*: in fase di traduzione al modello relazionale richiede una tabella separata.

- **Attributo derivato**: il suo valore si calcola a partire da altri attributi.
    - *Esempi*: l'età si calcola dalla data di nascita e dalla data corrente; il totale di un ordine si calcola dalla somma dei prezzi delle righe.
    - *Nota*: di solito non si memorizza perché si può sempre ricalcolare.

- **Attributo chiave (o identificatore)**: identifica **univocamente** ogni istanza dell'entità.
    - *Rappresentazione*: nel diagramma E/R si indica **sottolineando** il nome dell'attributo.
    - *Esempi*: il codice fiscale per `PERSONA`, la matricola per `STUDENTE`, l'ISBN per `LIBRO`.
    - *Corrispondenza*: diventa la **Primary Key** nella tabella relazionale.

### 2.3 Relazione (o Associazione)

| 📖 **Relazione E/R**<br><br>Una **relazione** (o associazione) rappresenta un legame logico tra due o più entità. Nel diagramma E/R è raffigurata con un **rombo**. **Non va confusa** con la "relazione" del modello relazionale (che corrisponde a una tabella): sono due concetti diversi con lo stesso nome. |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

Le relazioni descrivono come le entità interagiscono tra loro nel dominio applicativo.
- *Esempi*: `STUDENTE — iscrizioneA — CORSO` (uno studente si iscrive a dei corsi), `IMPIEGATO — lavoraPer — DIPARTIMENTO` (un impiegato lavora per un dipartimento), `CLIENTE — effettua — ORDINE` (un cliente effettua degli ordini).

Il **grado** di una relazione indica quante entità vi partecipano. La maggior parte delle relazioni sono **binarie** (coinvolgono due entità), ma esistono anche relazioni ternarie (tre entità) e n-arie, sebbene siano più rare e spesso si possano scomporre in relazioni binarie.

Anche le relazioni possono avere **attributi propri**, quando l'informazione non appartiene a nessuna delle entità coinvolte ma nasce dal loro legame.
- *Esempio*: nella relazione `STUDENTE — iscrizioneA — CORSO`, la **data di iscrizione** e il **voto finale** sono attributi della relazione, perché appartengono alla coppia (studente, corso).

### 2.4 Cardinalità di una Relazione

La **cardinalità** è uno degli aspetti più importanti del modello E/R perché definisce **quante istanze** di un'entità possono partecipare a una relazione. Si esprime con una coppia di valori **(min, max)** per ciascuna entità coinvolta.

- **Valore minimo**: indica la partecipazione **obbligatoria (1)** o **opzionale (0)** .
- **Valore massimo**: indica se un'istanza può partecipare alla relazione **una sola volta (1)** o **più volte (N)** .

**Tipi di cardinalità:**

- **(0,1)** — opzionale, al massimo una volta: l'istanza può non partecipare affatto alla relazione, ma se partecipa, lo fa con al massimo una contropartita.
    - *Esempio*: un impiegato può avere zero o un veicolo aziendale assegnato.

- **(1,1)** — obbligatoria, esattamente una volta: l'istanza deve sempre partecipare alla relazione, e lo fa con esattamente una contropartita.
    - *Esempio*: un ordine deve essere associato a esattamente un cliente.

- **(0,N)** — opzionale, più volte: l'istanza può non partecipare, ma se partecipa, lo fa con zero o più contropartite.
    - *Esempio*: un cliente può avere zero o più ordini.

- **(1,N)** — obbligatoria, più volte: l'istanza deve partecipare almeno una volta, e può farlo molte volte.
    - *Esempio*: un dipartimento deve avere almeno un impiegato.

**Tipi fondamentali di relazione (basati sulle cardinalità massime):**

- **1:1 (uno a uno)**: ogni istanza di A è associata ad al massimo una di B, e viceversa.
    - *Esempio*: `PERSONA — haPassaporto — PASSAPORTO`. (Relativamente raro).

- **1:N (uno a molti)**: ogni istanza di A è associata a molte di B, ma ogni B è associata a una sola A.
    - *Esempio*: `DIPARTIMENTO — impiega — IMPIEGATO`. (Il tipo più comune).

- **N:M (molti a molti)**: ogni istanza di A è associata a molte di B, e ogni B è associata a molte di A.
    - *Esempio*: `STUDENTE — iscrizioneA — CORSO`.
    - *Nota*: richiede una **tabella ponte** nel modello relazionale.

### 2.5 Identificazione: Chiavi ed Entità Forti/Deboli

Ogni entità deve avere un meccanismo per distinguere le proprie istanze. Questo avviene attraverso il concetto di **chiave**, che garantisce l'**univocità** dei dati.

#### Tipi di Chiavi

- **Chiave Candidata (CK)**: È un insieme minimale di attributi che permette di identificare in modo univoco ogni elemento dell'entità.
    - *Rappresentazione*: nel diagramma E/R, un attributo viene indicato come CK se contrassegnato da un **pallino pieno**.

- **Chiave Primaria (PK)**: È la chiave candidata scelta dal progettista per identificare ufficialmente l'entità.
    - *Requisiti*: deve essere **stabile** (non cambiare nel tempo), sempre presente (**mai NULL**) e possibilmente **sintetica** per garantire l'efficienza delle ricerche.

#### Entità Forti vs Entità Deboli

La presenza o l'assenza di una chiave primaria autonoma definisce la natura dell'entità:

1.  **Entità Forte**: È un'entità che possiede una propria **Chiave Primaria**. Ha un'identità autonoma e non dipende da altre entità per essere riconosciuta.

2.  **Entità Debole**: È un'entità che **non ha una chiave primaria** propria e non può esistere senza un'entità "forte" a cui è collegata.
    - *Rappresentazione*: nel diagramma si rappresenta con un **doppio rettangolo**.

#### Soluzioni per l'Identificazione delle Entità Deboli

Poiché non può esistere un'entità senza un modo per distinguere i suoi record, si adottano due soluzioni principali:

- **Soluzione 1 - Identificazione Esterna (Uso della chiave collegata)**: Si utilizza la Chiave Candidata dell'entità forte a cui è legata. L'identità dell'entità debole è data dalla combinazione della chiave del "padre" più un attributo parziale (discriminante).
    - *Esempio*: L'entità `RATA` non ha un codice universale; viene identificata combinando l'ID dell'entità forte `MUTUO` con il `Numero_Rata`.
    - *Rappresentazione*: la relazione è detta **identificante** e si disegna con un **doppio rombo**.

- **Soluzione 2 - Chiave Artificiale (Ipotesi Aggiuntiva)**: Si decide di aggiungere un attributo artificiale (come un ID univoco o un codice progressivo) basandosi su un'ipotesi aggiuntiva del progettista. Questo "promuove" l'entità debole a entità forte, semplificando la futura implementazione nel database.

### 2.6 Generalizzazione (IS-A)

La **generalizzazione** è il processo logico che collega un’entità generale (**padre** o super-entità) a una o più entità specifiche (**figlie** o sotto-entità). Questo meccanismo serve a modellare le caratteristiche comuni e le differenze specifiche tra entità correlate.

- **Ereditarietà**: Ciascuna sotto-entità **eredita** tutti gli attributi e le relazioni dell'entità generale, aggiungendo però i propri attributi specifici.
- **Lettura**: Si legge come una relazione **IS-A** ("è un"): ad esempio, un `DOCENTE` "è un" `PERSONALE`.

Per definire correttamente come le istanze si distribuiscono tra le sotto-entità, utilizziamo due vincoli fondamentali:

#### 1. Totalità vs Non Totalità (T / NT)

Indica se ogni elemento dell'entità generale deve necessariamente appartenere a una delle sotto-entità.

- **Totalità (T)**: Tutti gli elementi dell'entità generale appartengono obbligatoriamente a una sotto-entità. Non esistono "padri" che non siano anche "figli".
    - *Esempio*: Se l'entità `PERSONA` è divisa in `MASCHIO` e `FEMMINA`, la generalizzazione è totale.

- **Non Totalità (NT)**: Non tutti gli elementi dell'entità generale appartengono a una sotto-entità; alcune istanze possono esistere solo nell'entità generale.
    - *Esempio*: Nell'entità `PERSONALE`, abbiamo le sotto-entità `DOCENTE` e `TECNICO`. Se esiste anche il personale amministrativo (non modellato specificamente), la generalizzazione è NT.

#### 2. Esclusività vs Non Esclusività (E / NE)

Indica se un elemento può appartenere a una o più sotto-entità contemporaneamente.

- **Esclusiva (E)**: Un elemento dell'entità generale può appartenere a **una sola** delle sotto-entità. Le categorie si escludono a vicenda.
    - *Esempio*: Un `VEICOLO` può essere o un'`AUTO` o una `MOTO`, ma non entrambe contemporaneamente.

- **Non Esclusiva (NE)**: Un elemento può appartenere a **più sotto-entità** contemporaneamente.
    - *Esempio*: In una biblioteca, un individuo può appartenere sia alla sotto-entità `AUTORE` che alla sotto-entità `LETTORE`.

### 2.7 Ristrutturazione del Diagramma E/R

Prima di tradurre il diagramma E/R in tabelle relazionali, è necessario "ristrutturarlo", cioè trasformarlo in una forma più semplice che si traduca facilmente nel modello relazionale. Le principali operazioni di ristrutturazione sono:

- **Eliminazione delle generalizzazioni**: esistono tre strategie principali.
    1.  **Collasso verso il padre**: si elimina la distinzione tra padre e figli e si mette tutto nella tabella del padre, aggiungendo un attributo discriminante e rendendo opzionali gli attributi specifici dei figli.
    2.  **Collasso verso i figli**: si elimina la tabella del padre e si replicano i suoi attributi in ciascuna tabella figlia (funziona bene con generalizzazioni totali esclusive).
    3.  **Tabella separata**: si mantiene la tabella del padre con gli attributi comuni e si creano tabelle figlie con solo gli attributi specifici più la FK che punta al padre (rispetta meglio la struttura ma richiede JOIN).

- **Eliminazione degli attributi multivalore**: poiché una colonna in SQL non può contenere più valori, si crea una nuova tabella separata.
    - *Esempio*: se `PERSONA` ha un attributo multivalore `telefoni`, si crea la tabella `TELEFONO(id_persona FK, numero)` dove ogni riga rappresenta un telefono di una persona.

- **Eliminazione delle relazioni N:M**: si crea una **tabella ponte** (o junction table) che contiene le chiavi primarie di entrambe le entità come foreign key, e queste due FK insieme formano la chiave primaria della tabella ponte. Eventuali attributi della relazione diventano colonne di questa tabella.

### 2.8 Ipotesi Aggiuntive

Durante l'analisi, è fondamentale esplicitare le **ipotesi aggiuntive**: regole di business non presenti nei requisiti iniziali ma necessarie per chiarire il progetto.
- *Esempio*: "Si assume che un cliente possa avere al massimo 3 numeri di telefono".

## CAPITOLO 3 — DAL MODELLO E-R AL MODELLO RELAZIONALE

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
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

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

## CAPITOLO 4 — PRODOTTO CARTESIANO E TIPI DI JOIN

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

## CAPITOLO 5 — NORMALIZZAZIONE

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
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

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

## CAPITOLO 6 — SQL DDL - DEFINIZIONE DELLA STRUTTURA

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

## CAPITOLO 7 — SQL DML - LE QUERY DI SELEZIONE (SELECT)

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

## CAPITOLO 8 — SQL DML - INSERT, UPDATE, DELETE

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

## CAPITOLO 9 — PHP - FONDAMENTALI DEL LINGUAGGIO

### 9.1 PHP e la Programmazione Client/Server

**PHP** (*PHP Hypertext Preprocessor*, acronimo ricorsivo) è un linguaggio di scripting nato nel 1994 e diventato nel tempo il linguaggio server-side più diffuso nel web. La sua caratteristica fondamentale è che il codice PHP viene **eseguito sul server**, non nel browser del client.

Per capire bene questa distinzione, immaginiamo il ciclo di vita di una pagina web dinamica:

1.  **Richiesta**: l'utente nel browser (client) digita un URL o clicca un link. Il browser invia una richiesta HTTP al server web.
2.  **Elaborazione server-side**: il server web (es. Apache o Nginx) riceve la richiesta, riconosce che il file richiesto è un file `.php` e lo passa all'interprete PHP. L'interprete esegue il codice: legge variabili, interroga il database, esegue calcoli, genera testo HTML.
3.  **Risposta**: il server invia al client **solo il risultato** dell'elaborazione, cioè HTML puro (più eventuali CSS e JavaScript). Il client **non vede mai** il codice PHP: vede solo l'HTML che PHP ha generato.
4.  **Rendering**: il browser riceve l'HTML e lo visualizza a video.

Questa architettura ha un'implicazione fondamentale: **HTTP è un protocollo stateless** (senza stato). Ogni richiesta HTTP è indipendente dalle precedenti: il server non "ricorda" chi è l'utente da una richiesta all'altra. È per questo motivo che esistono i cookie e le sessioni, che vedremo nel capitolo 11.

### 9.2 Sintassi PHP: le basi

Il codice PHP è delimitato dai tag di apertura `<?php` e di chiusura `?>`. Tutto ciò che si trova tra questi tag viene interpretato come PHP; il resto viene inviato al client così com'è (come HTML).

```php
<?php
// Questo è un commento su una sola riga
/* Questo è un
   commento multiriga */

echo "Ciao Mondo!";       // stampa testo HTML
echo "<br>";              // si può scrivere HTML direttamente
echo 'Testo semplice';    // apici singoli: no interpolazione variabili
?>
```

**Nota importante sulla differenza tra apici doppi e apici singoli**: nelle stringhe con apici doppi, le variabili vengono **interpolate** (sostituite con il loro valore). Nelle stringhe con apici singoli, il testo viene trattato **letteralmente**.

```php
$nome = "Mario";
echo "Ciao $nome!";   // stampa: Ciao Mario!
echo 'Ciao $nome!';   // stampa: Ciao $nome!  (letterale)
```

### 9.3 Variabili e Tipizzazione Dinamica

In PHP tutte le variabili iniziano con il simbolo `$`. PHP è un linguaggio a **tipizzazione dinamica e debole**: una variabile non ha un tipo fisso, il tipo viene determinato dal valore assegnato e può cambiare durante l'esecuzione. Non è necessario dichiarare le variabili prima di usarle.

```php
$intero    = 42;
$decimale  = 3.14;
$stringa   = "testo";
$booleano  = true;
$nullo     = null;

// Tipi composti
$array_num  = [1, 2, 3, 4, 5];          // array indicizzato (indice da 0)
$array_ass  = ["nome" => "Mario",       // array associativo (chiave => valore)
               "eta"  => 25];

// Aggiungere elementi
$array_num[] = 6;                       // aggiunge alla fine
$array_ass["email"] = "m@example.com";  // aggiunge/modifica per chiave

// Leggere elementi
echo $array_ass["nome"];  // Mario
echo $array_num[0];       // 1 (primo elemento)
```

### 9.4 Cicli: FOR, WHILE, FOREACH

PHP offre i classici cicli di controllo del flusso. Ogni ciclo ha i suoi casi d'uso ideali:

#### Ciclo FOR

Il ciclo `for` è ideale quando si conosce in anticipo il numero di iterazioni. Ha tre parti: inizializzazione, condizione di continuazione, incremento.

```php
for ($i = 1; $i <= 10; $i++) {
    echo "Iterazione numero $i <br>";
}
```

#### Ciclo WHILE

Il ciclo `while` è ideale quando non si conosce il numero di iterazioni e si vuole continuare finché una condizione è vera. La condizione viene verificata **prima** di ogni iterazione: se è falsa fin dall'inizio, il corpo non viene mai eseguito.

```php
$i = 1;
while ($i <= 10) {
    echo "Valore: $i <br>";
    $i++;  // Attenzione: senza incremento si crea un ciclo infinito!
}
```

#### Ciclo FOREACH

Il `foreach` è pensato specificamente per gli **array** ed è la forma più comune e leggibile per iterare su una lista o un dizionario. Non c'è rischio di andare fuori dai limiti dell'array.

```php
// Per array indicizzati: si accede al valore
$frutti = ["mela", "banana", "arancia"];
foreach ($frutti as $frutto) {
    echo $frutto . "<br>";
}

// Per array associativi: si accede a chiave e valore
$studente = ["nome" => "Mario", "cognome" => "Rossi", "voto" => 8];
foreach ($studente as $chiave => $valore) {
    echo "$chiave: $valore <br>";
}
```

## CAPITOLO 10 — PHP - METODI GET E POST

Una delle funzionalità più importanti di PHP è la capacità di ricevere dati dall'utente tramite i form HTML e i parametri dell'URL. I due metodi fondamentali sono `GET` e `POST`, e scegliere il metodo giusto non è banale.

### 10.1 Metodo GET

Con il metodo `GET` i dati vengono inviati nell'**URL** della richiesta, nella cosiddetta *query string*, che segue il punto interrogativo.
*Esempio*: `https://example.com/cerca.php?termine=laptop&categoria=3`

In questo esempio, la query string contiene due parametri: `termine` con valore `'laptop'` e `categoria` con valore `'3'`. In PHP si accede a questi parametri attraverso il superglobale **`$_GET`**, che è un array associativo popolato automaticamente con i parametri dell'URL.

```php
// URL: cerca.php?termine=laptop&categoria=3&pagina=2

// Leggere un parametro (con operatore ?? per il valore di default)
$termine   = $_GET["termine"]   ?? "";        // "" se non presente
$categoria = (int)($_GET["categoria"] ?? 0);  // cast a intero per sicurezza
$pagina    = max(1, (int)($_GET["pagina"] ?? 1)); // almeno 1

// Verificare se un parametro esiste prima di usarlo
if (isset($_GET["termine"]) && !empty($_GET["termine"])) {
    $termine = htmlspecialchars($_GET["termine"]);
    // eseguire la ricerca...
}
```

Il metodo `GET` ha caratteristiche precise che ne determinano i casi d'uso appropriati:

- **Dati visibili nell'URL**: questo è sia un vantaggio (i link con parametri GET possono essere condivisi, salvati nei preferiti, indicizzati dai motori di ricerca) sia uno svantaggio (non adatto per dati sensibili come password).
- **Limite di lunghezza**: i browser e i server impongono un limite alla lunghezza degli URL (tipicamente 2048-8192 caratteri). Non adatto per inviare grandi quantità di dati.
- **Idempotente**: una richiesta `GET` dovrebbe solo **leggere** dati, non modificarli. Se si aggiorna la pagina, il browser rimanda la stessa richiesta senza chiedere conferma.
- **Casi d'uso ideali**: ricerche, filtri, paginazione, qualsiasi situazione in cui l'URL deve essere condivisibile o tornare al link precedente.

### 10.2 Metodo POST

Con il metodo `POST` i dati vengono inviati nel **corpo** della richiesta HTTP, non nell'URL. L'utente non vede i dati trasmessi guardando la barra degli indirizzi del browser. In PHP si accede ai dati POST attraverso il superglobale **`$_POST`**.

```php
// Form HTML che invia dati con POST
// <form method="POST" action="login.php">
//   <input type="text"     name="email">
//   <input type="password" name="password">
//   <button type="submit">Accedi</button>
// </form>

// Ricezione in login.php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email    = $_POST["email"]    ?? "";
    $password = $_POST["password"] ?? "";

    // Validare sempre l'input prima di usarlo!
    if (empty($email) || empty($password)) {
        $errore = "Compilare tutti i campi.";
    } else {
        // procedere con l'autenticazione...
    }
}
```

Le caratteristiche del metodo `POST`:

- **Dati non visibili nell'URL**: più appropriato per dati che non dovrebbero essere condivisibili o indicizzati (form di login, registrazione, invio di messaggi).
- **Nessun limite pratico di dimensione**: si possono inviare grandi quantità di dati e anche file (con `enctype='multipart/form-data'`).
- **Non idempotente**: se si aggiorna la pagina dopo un `POST`, il browser chiede conferma prima di rinviare i dati (per evitare doppie sottomissioni di form).
- **Casi d'uso ideali**: form di login, registrazione, invio dati, upload file, qualsiasi operazione che **modifica** dati sul server.

### 10.3 Tabella Comparativa: GET vs POST

| Caratteristica | GET | POST |
| :--- | :--- | :--- |
| **Dati nell'URL** | Sì (visibili) | No (nel corpo HTTP) |
| **Limite dimensione** | ~2-8 KB | Nessun limite pratico |
| **Sicurezza** | Bassa (dati in chiaro nell'URL) | Maggiore (non nell'URL, ma serve HTTPS) |
| **Idempotenza** | Sì (solo lettura) | No (può modificare dati) |
| **Condivisibile** | Sì (URL bookmarkable) | No |
| **Uso tipico** | Ricerche, filtri, navigazione | Login, form, upload file |

| ⚠️ **Attenzione**<br><br>Né `GET` né `POST` sono sicuri di per sé se non si usa **HTTPS**! Con HTTP in chiaro, anche i dati `POST` possono essere intercettati. HTTPS cripta l'intera comunicazione, URL inclusa. Tuttavia, `POST` è comunque preferibile a `GET` per dati sensibili, perché i dati non vengono loggati nei log del server, non appaiono nel browser history e non vengono salvati nei preferiti. |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

## CAPITOLO 11 — PHP E DATABASE - CONNESSIONE E QUERY

La combinazione PHP + MySQL è probabilmente la più diffusa nel web. PHP si connette al database, esegue query SQL, elabora i risultati e genera l'HTML da inviare al client. Vediamo come fare tutto questo in modo corretto e sicuro.

### 11.1 Connessione al Database con MySQLi

**MySQLi** (*MySQL Improved*) è l'estensione PHP nata per sostituire la vecchia estensione `mysql_` (ora deprecata e rimossa). Offre sia un'interfaccia procedurale (funzioni) che orientata agli oggetti (metodi). Noi useremo l'interfaccia a oggetti, che è più moderna e organizzata.

```php
<?php
// Dati di connessione (in produzione, mettere in un file di configurazione separato)
$host   = "localhost";
$utente = "root";
$pass   = "password";
$db     = "scuola";

// Creazione della connessione
$conn = new mysqli($host, $utente, $pass, $db);

// Imposta la codifica dei caratteri (fondamentale per i caratteri speciali)
$conn->set_charset("utf8mb4");

// Verifica se la connessione è riuscita
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

// ... usare $conn per le query ...

// Chiudere la connessione quando non serve più
$conn->close();
?>
```

### 11.2 Il Problema SQL Injection e le Query Preparate

Prima di parlare di come eseguire query, è indispensabile capire il rischio **SQL Injection**, che è una delle vulnerabilità di sicurezza web più gravi e comuni.

Immaginiamo questo codice PHP ingenuo (**PERICOLOSO, da non usare mai**):

```php
// ❌ CODICE PERICOLOSO — SQL Injection!
$nome = $_GET["nome"];  // se l'utente inserisce: ' OR '1'='1
$query = "SELECT * FROM utenti WHERE nome = '$nome'";
// La query diventa: SELECT * FROM utenti WHERE nome = '' OR '1'='1'
// Questa condizione è sempre vera: restituisce TUTTI gli utenti!
```

Un attaccante può inserire nella casella di ricerca del testo SQL appositamente costruito che altera la query originale. Le conseguenze possono essere catastrofiche: lettura di tutti i dati, modifica o cancellazione del database, bypass dell'autenticazione.

La soluzione definitiva sono le **query preparate** (*prepared statements*). L'idea è semplice ma geniale: si **separa completamente** la struttura della query SQL dai dati. Prima si invia la struttura al server SQL (con dei segnaposto al posto dei valori), poi si inviano separatamente i valori. Il server SQL sa già come interpretare i segnaposto: **non possono mai diventare parte della struttura della query**.

```php
// ✅ CODICE SICURO — Query Preparata

// Step 1: preparare la struttura della query (? = segnaposto)
$stmt = $conn->prepare("SELECT id, nome, email FROM utenti WHERE nome = ? AND attivo = ?");

// Verificare se la preparazione è riuscita
if ($stmt === false) {
    die("Errore preparazione: " . $conn->error);
}

// Step 2: collegare i valori ai segnaposto (bind)
// 'si' = primo parametro è stringa (s), secondo è intero (i)
// Tipi disponibili: s=string, i=integer, d=double, b=blob
$stmt->bind_param("si", $nome_cercato, $attivo);
$nome_cercato = $_GET["nome"] ?? "";
$attivo = 1;

// Step 3: eseguire la query
$stmt->execute();

// Step 4: ottenere il risultato
$risultato = $stmt->get_result();

// Step 5: iterare sulle righe del risultato
while ($riga = $risultato->fetch_assoc()) {
    echo htmlspecialchars($riga["nome"]) . " - " . htmlspecialchars($riga["email"]) . "<br>";
}

// Step 6: chiudere lo statement
$stmt->close();
```

### 11.3 Visualizzazione dei Dati in Tabella HTML

Un pattern molto comune in PHP è leggere dei dati dal database e visualizzarli in una tabella HTML. Vediamo come farlo in modo corretto, usando le query preparate e proteggendosi da XSS con `htmlspecialchars()`:

```php
<?php
$stmt = $conn->prepare(
    "SELECT id, cognome, nome, email, data_nasc FROM studenti ORDER BY cognome, nome"
);
$stmt->execute();
$studenti = $stmt->get_result();
?>

<table border='1'>
  <thead>
    <tr>
      <th>ID</th><th>Cognome</th><th>Nome</th><th>Email</th><th>Data Nascita</th>
    </tr>
  </thead>
  <tbody>
    <?php while ($s = $studenti->fetch_assoc()): ?>
    <tr>
      <td><?= (int)$s["id"] ?></td>
      <td><?= htmlspecialchars($s["cognome"]) ?></td>
      <td><?= htmlspecialchars($s["nome"])    ?></td>
      <td><?= htmlspecialchars($s["email"])   ?></td>
      <td><?= $s["data_nasc"] ?></td>
    </tr>
    <?php endwhile; ?>
  </tbody>
</table>
```

| ⚠️ **Attenzione**<br><br>`htmlspecialchars()` converte i caratteri speciali HTML (`<`, `>`, `&`, `"`, `'`) in entità HTML sicure. Questo previene gli attacchi **XSS** (*Cross-Site Scripting*): un attaccante non può iniettare codice HTML o JavaScript nei dati visualizzati. Va usato su **ogni** dato proveniente dall'esterno prima di stamparlo in HTML. |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

### 11.4 INSERT con Query Preparate

```php
// Esempio: inserire un nuovo studente dal form
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $cognome = trim($_POST["cognome"] ?? "");
    $nome    = trim($_POST["nome"]    ?? "");
    $email   = trim($_POST["email"]   ?? "");

    // Validazione
    if (empty($cognome) || empty($nome) || empty($email)) {
        $errore = "Tutti i campi sono obbligatori.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errore = "Email non valida.";
    } else {
        $stmt = $conn->prepare(
            "INSERT INTO studenti (cognome, nome, email) VALUES (?, ?, ?)"
        );
        $stmt->bind_param("sss", $cognome, $nome, $email);

        if ($stmt->execute()) {
            $nuovo_id = $conn->insert_id;  // ID della riga appena inserita
            echo "Studente inserito con ID: $nuovo_id";
        } else {
            echo "Errore: " . $stmt->error;
        }
        $stmt->close();
    }
}
```

## CAPITOLO 12 — PERSISTENZA DEI DATI - COOKIE E SESSIONI

Come abbiamo accennato, **HTTP è un protocollo stateless**: ogni richiesta è completamente indipendente. Questo significa che, di default, il server non ricorda nulla dell'utente da una pagina all'altra. Se un utente fa login nella pagina A, accedendo alla pagina B il server non sa chi è.

Per risolvere questo problema esistono due meccanismi complementari: i **cookie** (memorizzazione lato client) e le **sessioni** (memorizzazione lato server). Entrambi permettono di mantenere lo stato attraverso richieste HTTP successive.

### 12.1 Cookie

| 📖 **Cookie**<br><br>Un cookie è un piccolo frammento di dati (massimo circa 4 KB) che il server invia al browser del client, il quale lo memorizza localmente e lo invia automaticamente a ogni richiesta successiva verso lo stesso dominio (e path). In PHP si gestiscono con la funzione `setcookie()` e il superglobale `$_COOKIE`. |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

Analizziamo la funzione `setcookie()` in dettaglio, perché ha molti parametri:

```php
setcookie(
    "preferenza_tema",    // Nome del cookie (obbligatorio)
    "scuro",              // Valore (stringa). Se vuoto, il cookie viene cancellato
    time() + 3600*24*30,  // Scadenza: timestamp UNIX. time()+secondi=ora+durata
    "/",                  // Path: su quali URL il cookie è inviato. "/" = tutto il sito
    "",                   // Dominio: "" = dominio corrente
    true,                 // Secure: inviare solo su HTTPS
    true                  // HttpOnly: non accessibile da JavaScript (previene XSS)
);
```

Alcune regole fondamentali sull'uso dei cookie in PHP:

- **`setcookie()` DEVE essere chiamata prima di qualsiasi output HTML**. Anche uno spazio bianco prima del tag `<?php` fa fallire l'impostazione del cookie, perché i cookie vengono inviati negli header HTTP, che devono precedere il corpo della risposta.

- Il cookie è disponibile solo **dalla richiesta successiva**: se si imposta un cookie in questa richiesta, lo si potrà leggere da `$_COOKIE` solo nella richiesta successiva, non in quella corrente. Nella richiesta corrente esiste solo `$_COOKIE` ma non contiene ancora il nuovo valore.

- **Cancellare un cookie**: si imposta un cookie con lo stesso nome e una data di scadenza nel passato (es: `time() - 3600`). Il browser riceve l'istruzione di eliminarlo.

```php
// Leggere un cookie (con valore di default se non esiste)
$tema = $_COOKIE["preferenza_tema"] ?? "chiaro";

// Verificare se un cookie esiste
if (isset($_COOKIE["utente_loggato"])) {
    $utente_id = (int)$_COOKIE["utente_loggato"];
}

// Cancellare un cookie
setcookie("preferenza_tema", "", time() - 3600, "/");
```

**Pregi e difetti dei cookie**:
- **Pregio principale**: la **persistenza**. Un cookie con scadenza futura sopravvive alla chiusura del browser e rimane disponibile per giorni, settimane o mesi. Ideale per memorizzare preferenze dell'utente (tema chiaro/scuro, lingua, ecc.) o per il "Ricordami" del login.
- **Difetto principale**: la **sicurezza**. I cookie sono memorizzati sul dispositivo del client e sono visibili e modificabili dall'utente (tramite gli strumenti sviluppatore del browser). **Non si devono mai memorizzare dati sensibili** (password, dati bancari) o dati critici per la sicurezza (ruoli utente, permessi) nei cookie in modo non firmato e non cifrato.

### 12.2 Sessioni

| 📖 **Sessione**<br><br>Una sessione è un meccanismo **server-side** per mantenere lo stato: i dati vengono memorizzati **sul server** in un file (o database), e al client viene inviato solo un identificatore univoco di sessione (*session ID*) solitamente tramite un cookie chiamato `PHPSESSID`. Ogni richiesta successiva invia questo ID, permettendo al server di recuperare i dati associati. |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

Il vantaggio principale delle sessioni rispetto ai cookie è la **sicurezza**: i dati reali **non escono mai dal server**. Il client possiede solo una "chiave" (il session ID), non i dati. Questo le rende adatte a memorizzare informazioni critiche come l'ID dell'utente loggato, il carrello degli acquisti, i permessi.

Il ciclo di vita di una sessione PHP funziona così: alla prima visita, `session_start()` crea un nuovo session ID univoco e invia il cookie `PHPSESSID` al browser. Nelle richieste successive, il browser invia automaticamente il cookie `PHPSESSID`; `session_start()` lo legge, recupera i dati della sessione dal server e li rende disponibili tramite l'array `$_SESSION`.

```php
<?php
// session_start() DEVE essere la prima cosa nella pagina (prima di qualsiasi output)
session_start();

// --- Salvare dati in sessione ---
$_SESSION["utente_id"]  = 42;
$_SESSION["nome"]       = "Mario Rossi";
$_SESSION["ruolo"]      = "admin";
$_SESSION["login_time"] = time();

// --- Leggere dati dalla sessione ---
if (isset($_SESSION["utente_id"])) {
    $utente_id = $_SESSION["utente_id"];
    echo "Benvenuto, " . htmlspecialchars($_SESSION["nome"]) . "!";
} else {
    // Utente non loggato: redirect al login
    header("Location: login.php");
    exit;
}

// --- Eliminare un singolo valore dalla sessione ---
unset($_SESSION["carrello"]);

// --- Logout: distruggere completamente la sessione ---
$_SESSION = [];                   // svuota l'array
session_destroy();                // distrugge i dati sul server
// Cancellare anche il cookie PHPSESSID nel browser:
setcookie(session_name(), "", time()-3600, "/");
?>
```

**Nota importante**: `session_destroy()` rimuove i dati della sessione dal server ma **non** cancella il cookie `PHPSESSID` nel browser. Per un logout completo e sicuro è necessario anche cancellare il cookie, come mostrato nell'esempio. Se non lo si fa, il browser conserva un session ID che non punta più a nessun dato sul server (sessione fantasma).

### 12.3 Confronto Completo: Cookie vs Sessioni

| Aspetto                      | Cookie                          | Sessione                            |
| :--------------------------- | :------------------------------ | :---------------------------------- |
| **Dove sono i dati**         | Browser del client              | Server (file o DB)                  |
| **Cosa ha il client**        | Il dato completo                | Solo il session ID (`PHPSESSID`)    |
| **Dimensione max**           | ~4 KB per cookie                | Praticamente illimitata             |
| **Visibile all'utente**      | Sì (strumenti dev)              | No (solo l'ID)                      |
| **Modificabile dall'utente** | Sì (potenzialmente)             | No (l'ID è inutile senza i dati)    |
| **Persistenza**              | Configurabile (secondi → anni)  | Default: chiusura browser           |
| **Avvio PHP**                | `setcookie()` prima dell'output | `session_start()` prima dell'output |
| **Accesso PHP**              | `$_COOKIE['nome']`              | `$_SESSION['chiave']`               |
| **Uso tipico**               | Preferenze, 'Ricordami'         | Login, carrello, dati sicuri        |
|                              |                                 |                                     |
