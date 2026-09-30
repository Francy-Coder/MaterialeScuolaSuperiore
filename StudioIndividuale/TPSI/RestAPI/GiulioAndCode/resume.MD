# Cos'è un'API?

## Definizione
Giulio spiega che un'API (Application Programming Interface) è un'interfaccia che permette a due applicazioni di comunicare tra loro, anche se utilizzano sistemi o linguaggi diversi.  

## Esempio pratico
Viene utilizzata l’analogia di un **corriere Amazon**:
- Il **magazzino** rappresenta il *server*
- La **casa** rappresenta il *client*
- Il **corriere** rappresenta l’*API*

Il corriere trasporta le informazioni dal magazzino alla casa e riporta l’esito della consegna.  

---

## Come funziona la comunicazione

### Client e Server
La comunicazione avviene tra:
- **Client**: chi fa la richiesta
- **Server**: chi riceve ed elabora la richiesta  

### Endpoint
L’**Endpoint** è l’URL (indirizzo) a cui vengono inviate le richieste.  

### Request e Response
- Il client invia una **Request**
- Il server restituisce una **Response**, che può contenere dati o solo lo stato dell’operazione  

### Parametri
I dati possono essere passati tramite:
- **Path Params** (nel percorso dell’URL)
- **Query Params** (dopo il `?`)
- **Body** della richiesta
- **Headers** (spesso usati per l’autenticazione con Token)  

---

## I Metodi principali (Verbi HTTP)

Le quattro tipologie di richieste più comuni sono:  

- **GET**  
  Per richiedere informazioni (es. ottenere i dati di un utente)  

- **POST**  
  Per creare nuovi elementi (es. inviare un messaggio tramite un bot)  

- **PUT**  
  Per modificare elementi esistenti o eseguire azioni (es. “pinnare” un messaggio)  

- **DELETE**  
  Per eliminare dati o elementi  

---

## Codici di Risposta

Dopo ogni richiesta, il server restituisce un codice numerico che indica l’esito dell’operazione.  

- **200 OK** – Successo
- **404 Not Found** – Risorsa non trovata  
- **401 Unauthorized** – Problemi di autenticazione
- **500+** – Errori del server

---

## Conclusione
Giulio consiglia di leggere sempre la **documentazione specifica dell’API** che si intende usare, perché ogni servizio ha regole e parametri propri.  

---

## Risorsa
📺 Video completo: https://www.youtube.com/watch?v=tn_2gqdlFy0