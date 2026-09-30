
Il modello Entità-Relazione, proposto da Peter Chen nel 1976, è il punto di partenza per la progettazione concettuale di un database. Prima di scrivere una singola riga di SQL, un buon progettista disegna il diagramma E/R per capire quali informazioni deve memorizzare e come si relazionano tra loro. Il diagramma E/R non dipende da nessun DBMS specifico: è una rappresentazione astratta, indipendente dalla tecnologia.

### 2.1 Entità

| 📖 **Entità**<br><br>Un'**entità** rappresenta una classe di oggetti (persone, cose, eventi, concetti) del mondo reale che sono distinguibili tra loro e sui quali vogliamo memorizzare informazioni. Ogni entità viene rappresentata nel diagramma E/R con un **rettangolo** contenente il suo nome, scritto al singolare e in maiuscolo per convenzione. |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

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