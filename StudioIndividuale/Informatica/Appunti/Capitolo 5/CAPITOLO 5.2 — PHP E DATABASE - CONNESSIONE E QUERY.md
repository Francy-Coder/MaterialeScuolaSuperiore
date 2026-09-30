
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