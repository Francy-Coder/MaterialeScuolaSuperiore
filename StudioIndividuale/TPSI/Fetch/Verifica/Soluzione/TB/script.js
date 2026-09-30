const BASE_URL = "http://localhost:3000";

// Funzione 1: Visualizza minerali e statistiche
async function mostraTuttiMinerali() {
  try {
    const response = await fetch(`${BASE_URL}/minerali`);
    const minerali = await response.json();

    console.log(minerali);

    const totale = minerali.length;
    let critici = 0;
    for (let i = 0; i < minerali.length; i++) {
      if (minerali[i].tonnellate < 10) {
        critici++;
      }
    }

    console.log(`Minerali totali: ${totale}, di cui ${critici} con scorte critiche`);
  } catch (err) {
    console.log("Errore:", err.message);
  }
}

// Funzione 2: Cerca minerale per ID
async function cercaMineralePerId() {
  try {
    let response = await fetch(`${BASE_URL}/minerali/999`);

    if (response.status === 404) {
      response = await fetch(`${BASE_URL}/minerali/5`);
    }

    const minerale = await response.json();
    console.log(`Nome: ${minerale.nome}, Tonnellate: ${minerale.tonnellate}`);
  } catch (err) {
    console.log("Errore:", err.message);
  }
}

// Funzione 3: Aggiungi nuovo minerale
async function aggiungiNuovoMinerale() {
  try {
    const response = await fetch(`${BASE_URL}/minerali`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: "Tungsteno",
        categoria: "metalli",
        tonnellate: 25,
        creditiPerTonnellata: 420,
        zona: "est"
      })
    });

    const nuovoMinerale = await response.json();
    console.log(nuovoMinerale);
  } catch (err) {
    console.log("Errore:", err.message);
  }
}

// Funzione 4: Conta minerali per categoria
async function contaMineraliCategoria() {
  try {
    let response = await fetch(`${BASE_URL}/minerali/categoria/cristalli`);
    let categoria = "cristalli";

    if (response.status === 404) {
      response = await fetch(`${BASE_URL}/minerali/categoria/metalli`);
      categoria = "metalli";
    }

    const minerali = await response.json();
    console.log(`Minerali di categoria ${categoria}: ${minerali.length}`);
  } catch (err) {
    console.log("Errore:", err.message);
  }
}

// Funzione 5: Calcola valore inventario e minerale più prezioso
async function calcolaValoreTotale() {
  try {
    const response = await fetch(`${BASE_URL}/minerali`);
    const minerali = await response.json();

    let valoreTotale = 0;
    let piuPrezioso = minerali[0];

    for (let i = 0; i < minerali.length; i++) {
      const valore = minerali[i].tonnellate * minerali[i].creditiPerTonnellata;
      valoreTotale += valore;

      if (valore > piuPrezioso.tonnellate * piuPrezioso.creditiPerTonnellata) {
        piuPrezioso = minerali[i];
      }
    }

    console.log(`Valore totale inventario: ${valoreTotale} crediti`);
    console.log(
      `Minerale più prezioso: ${piuPrezioso.nome} con valore ${
        piuPrezioso.tonnellate * piuPrezioso.creditiPerTonnellata
      } crediti`
    );
  } catch (err) {
    console.log("Errore:", err.message);
  }
}

// Funzione 6: Trova minerali con scorte critiche in una zona
async function trovaMineraliCritici() {
  try {
    const response = await fetch(`${BASE_URL}/minerali`);
    const minerali = await response.json();

    let nomi = "";
    for (let i = 0; i < minerali.length; i++) {
      if (minerali[i].zona === "cratere" && minerali[i].tonnellate < 10) {
        if (nomi !== "") {
          nomi += ", ";
        }
        nomi += minerali[i].nome;
      }
    }

    console.log(`Minerali critici nella zona cratere: ${nomi}`);
  } catch (err) {
    console.log("Errore:", err.message);
  }
}

// Esecuzione di tutte le funzioni
mostraTuttiMinerali();
cercaMineralePerId();
aggiungiNuovoMinerale();
contaMineraliCategoria();
calcolaValoreTotale();
trovaMineraliCritici();