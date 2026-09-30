
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