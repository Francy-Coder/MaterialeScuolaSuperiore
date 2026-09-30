// 1. Async / Await

// Quando JavaScript fa una richiesta a un server, ci vuole tempo per ricevere la risposta. Se non gestiamo questa attesa, il codice va avanti prima di ricevere i dati.
// async e await servono proprio a dire a JavaScript: "aspetta qui finché non hai la risposta".

// Con async/await
async function leggiDati() {
  const risposta = await fetch('http://localhost:3000/minerali'); // aspetta
  console.log(risposta); // ora ha la risposta vera
}

// Regole fondamentali:
//      Se usi await dentro una funzione, la funzione deve essere dichiarata con async
//      await si mette davanti alla cosa che deve aspettare



// 2. Fetch()

// fetch() è la funzione che fa le richieste al server. Prende come primo argomento l'URL.

const risposta = await fetch('http://localhost:3000/minerali');

// La variabile risposta però non contiene ancora i dati — contiene la risposta HTTP (con status, headers, ecc.). Per leggere i dati veri devi fare un secondo passaggio:

const dati = await risposta.json(); // converte il JSON in un oggetto JS
console.log(dati); // ora hai i dati veri

// ⚠️ .json() è anch'esso asincrono, quindi vuole await!



// 3. I metodi HTTP (GET, POST, PUT, DELETE)
// Di default fetch() fa una richiesta GET. Per gli altri metodi devi passare un secondo argomento con le opzioni:

// GET (default, non serve specificarlo)
const res = await fetch('http://localhost:3000/minerali');

// POST (inviare dati nuovi)
res = await fetch('http://localhost:3000/minerali', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }, // dico al server che mando JSON
  body: JSON.stringify({ nome: 'Tungsteno', tonnellate: 25 }) // i dati da inviare
});
// JSON.stringify() converte un oggetto JavaScript in una stringa JSON, necessario per inviarlo nel body

// PUT (modificare un dato esistente)
res = await fetch('http://localhost:3000/minerali/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nome: 'Ferro grezzo', tonnellate: 130 })
});

// DELETE (eliminare un dato)
res = await fetch('http://localhost:3000/minerali/5', {
  method: 'DELETE'
});



// 4. Controllare il codice di risposta (status)
// Quando il server risponde, manda sempre un codice numerico che indica se è andato tutto bene o no:
// Codice, Significato 
//    200 OK, tutto bene
//    201 Creato con successo (tipico del POST) 
//    404 Non trovato 
//    500 Errore del server

// Puoi leggere il codice con risposta.status:
res = await fetch('http://localhost:3000/minerali/999');

if (res.status === 404) {
  console.log('Minerale non trovato!');
} else {
  const minerale = await res.json();
  console.log(minerale);
}

// Nella funzione 2 della verifica questo è fondamentale: provi con ID 999, se arriva 404 riprovi con ID 5.



// 5. try / catch
// Le richieste di rete possono fallire per mille motivi (server spento, internet assente...). Il blocco try/catch permette di gestire gli errori senza che il programma si blocchi:
async function leggiDati() {
  try {
    // codice "pericoloso" che potrebbe dare errore
    const res = await fetch('http://localhost:3000/minerali');
    const dati = await res.json();
    console.log(dati);
  } catch (errore) {
    // se qualcosa va storto, finisce qui
    console.log('Qualcosa è andato storto:', errore);
  }
}

// Pensa a try come "prova a fare questo" e catch come "se fallisce, fai questo"

