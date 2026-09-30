// ─── FUNZIONE 1 ───────────────────────────────────────────────
async function mostraTutteRisorse() {
  try {
    const res = await fetch('http://localhost:3000/risorse');
    const risorse = await res.json();

    console.log(risorse);

    const totale = risorse.length;
    const critiche = risorse.filter(r => r.quantita < 10).length;

    console.log(`Risorse totali: ${totale}, di cui ${critiche} critiche`);
  } catch (err) {
    console.log('Errore:', err.message);
  }
}

// ─── FUNZIONE 2 ───────────────────────────────────────────────
async function cercaRisorsaPerId() {
  try {
    let res = await fetch('http://localhost:3000/risorse/999');

    if (res.status === 404) {
      res = await fetch('http://localhost:3000/risorse/3');
    }

    const risorsa = await res.json();
    console.log(`Nome: ${risorsa.nome}, Quantità: ${risorsa.quantita}`);
  } catch (err) {
    console.log('Errore:', err.message);
  }
}

// ─── FUNZIONE 3 ───────────────────────────────────────────────
async function aggiungiNuovaRisorsa() {
  try {
    const res = await fetch('http://localhost:3000/risorse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: 'Batterie al litio',
        tipo: 'energia',
        quantita: 15,
        unita: 300,
        settore: 'C'
      })
    });

    const nuovaRisorsa = await res.json();
    console.log(nuovaRisorsa);
  } catch (err) {
    console.log('Errore:', err.message);
  }
}

// ─── FUNZIONE 4 ───────────────────────────────────────────────
async function contaRisorseTipo() {
  try {
    let res = await fetch('http://localhost:3000/risorse/tipo/armi');
    let tipo = 'armi';

    if (res.status === 404) {
      res = await fetch('http://localhost:3000/risorse/tipo/cibo');
      tipo = 'cibo';
    }

    const risorse = await res.json();
    console.log(`Risorse di tipo ${tipo}: ${risorse.length}`);
  } catch (err) {
    console.log('Errore:', err.message);
  }
}

// ─── FUNZIONE 5 ───────────────────────────────────────────────
async function calcolaValoreTotale() {
  try {
    const res = await fetch('http://localhost:3000/risorse');
    const risorse = await res.json();

    const valoreTotale = risorse.reduce((acc, r) => acc + r.quantita * r.unita, 0);

    const piuCostosa = risorse.reduce((max, r) => {
      return (r.quantita * r.unita) > (max.quantita * max.unita) ? r : max;
    });

    console.log(`Valore totale inventario: ${valoreTotale} crediti`);
    console.log(`Risorsa più costosa: ${piuCostosa.nome} con valore ${piuCostosa.quantita * piuCostosa.unita} crediti`);
  } catch (err) {
    console.log('Errore:', err.message);
  }
}

// ─── FUNZIONE 6 ───────────────────────────────────────────────
async function trovaRisorseCritiche() {
  try {
    const res = await fetch('http://localhost:3000/risorse');
    const risorse = await res.json();

    const critiche = risorse
      .filter(r => r.settore === 'A')
      .filter(r => r.quantita < 10);

    const nomi = critiche.map(r => r.nome).join(', ');
    console.log(`Risorse critiche nel settore A: ${nomi}`);
  } catch (err) {
    console.log('Errore:', err.message);
  }
}

// ─── ESECUZIONE ───────────────────────────────────────────────
mostraTutteRisorse();
cercaRisorsaPerId();
aggiungiNuovaRisorsa();
contaRisorseTipo();
calcolaValoreTotale();
trovaRisorseCritiche();