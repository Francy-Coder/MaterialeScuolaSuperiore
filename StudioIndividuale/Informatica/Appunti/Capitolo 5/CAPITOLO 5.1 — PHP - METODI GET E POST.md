
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
