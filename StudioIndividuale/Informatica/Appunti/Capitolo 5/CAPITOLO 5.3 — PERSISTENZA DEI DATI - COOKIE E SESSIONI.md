
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

| Aspetto | Cookie | Sessione |
| :--- | :--- | :--- |
| **Dove sono i dati** | Browser del client | Server (file o DB) |
| **Cosa ha il client** | Il dato completo | Solo il session ID (`PHPSESSID`) |
| **Dimensione max** | ~4 KB per cookie | Praticamente illimitata |
| **Visibile all'utente** | Sì (strumenti dev) | No (solo l'ID) |
| **Modificabile dall'utente** | Sì (potenzialmente) | No (l'ID è inutile senza i dati) |
| **Persistenza** | Configurabile (secondi → anni) | Default: chiusura browser |
| **Avvio PHP** | `setcookie()` prima dell'output | `session_start()` prima dell'output |
| **Accesso PHP** | `$_COOKIE['nome']` | `$_SESSION['chiave']` |
| **Uso tipico** | Preferenze, 'Ricordami' | Login, carrello, dati sicuri |
