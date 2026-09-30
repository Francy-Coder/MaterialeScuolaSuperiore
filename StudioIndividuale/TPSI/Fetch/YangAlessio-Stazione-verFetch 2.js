async function mostraTutteRisorse() {
    const response = await fetch("http://localhost:3000/risorse");
    const risultato = await response.json();

    console.log(risultato);

    let risorseTotali = 0;
    let critiche = 0;
    for (let i = 0; i < risultato.length; i++) {
        risorseTotali++;
        if (risultato[i].quantita < 10) {
            critiche++;
        }}

    console.log("Risorse totali: " +risorseTotali+ ", di cui "+critiche  + " critiche");
}

async function cercaRisorsaPerId() {
    let response = await fetch("http://localhost:3000/risorse/999");

    if (response.status === 404) 
        {response = await fetch("http://localhost:3000/risorse/3");}
    const risultato = await response.json();

    console.log("Nome:"+risultato.nome+" Quantità: "+risultato.quantita);
}

async function aggiungiNuovaRisorsa() {

    const nuovaRisorsa = {
        nome: "Batterie al kitio",
        tipo: "energia",
        quantita: 15,
        unita: 300,
        settore: "C"
    };

    const response = await fetch("http://localhost:3000/risorse", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuovaRisorsa)
    });
    const risultato = await response.json();
    console.log(risultato);
} 

async function contaRisorseTipo() {
    let tipo = "armi";
    let response = await fetch("http://localhost:3000/risorse/tipo" + tipo);
    if (response.status === 404) {
        tipo = "cibo";
        response = await fetch("http://localhost:3000/risorse/tipo/" + tipo);
    }
    const risultato = await response.json();
    console.log("Risorse di tipo " + tipo + ": " + risultato.length);
}

async function calcolaValoreTotale() {
    const response = await fetch("http://localhost:3000/risorse");
    const risorse = await response.json();
    let totale = 0;
    let risorsaMagg = 0;
    for (let i = 0; i < risorse.length; i++) {
        let valore = risorse[i].quantita * risorse[i].unita;
        totale += valore;
    }
    console.log("Valore totale:" + totale + " crediti");
    console.log("Risorsa più costosa:" + risorsaMagg.nome + " con valore " + risorsaMagg.valore + "crediti");
}

async function trovaRisorseCritiche() {
    const response = await fetch("http://localhost:3000/risorse");
    const risorse = await response.json();
    let risorseCritiche = [];
    for (let i = 0; i < risorse.length; i++) {
        if (risorse[i].settore === "a" && risorse[i].quantita < 10) {
//nn mi ricordo la funzione del array 
        }
    }
    console.log("Risorse critiche nel settore a: "  );
}

async function esecuzionefuzioni() {
        await mostraTutteRisorse();
        await cercaRisorsaPerId();
        await aggiungiNuovaRisorsa();
        await contaRisorseTipo();
        await calcolaValoreTotale();
        await trovaRisorseCritiche();
}
esecuzionefuzioni();