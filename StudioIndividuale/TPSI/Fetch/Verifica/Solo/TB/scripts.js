const BASE_URL = "http://localhost:3000";

/*Funzione 1: Visualizza minerali e statistiche
Scrivi una funzione mostraTuttiMinerali() che:
    • Recupera tutti i minerali dall'avamposto
    • Stampa in console l'array completo dei minerali
    • Conta quanti minerali ci sono in totale
    • Conta quanti minerali hanno tonnellate < 10 (considerate scorte critiche)
    • Stampa: "Minerali totali: X, di cui Y con scorte critiche"

Output atteso in console:
    [Array con 12 minerali]
    Minerali totali: 12, di cui 3 con scorte critiche*/

async function mostraTuttiMinerali() {
    const response = await fetch(BASE_URL + "/minerali");

    if(response.ok){
        const minerali = await response.json();
        console.log(minerali);

        const totale = minerali.length;
        let critici = 0;
        for(let i = 0; i < minerali.length; i++){
            if(minerali[i].tonnellate < 10){
                critici++;
            }
        }

        console.log("Minerali totali: " + totale + ", di cui " + critici + " con scorte critiche");
    } else {
        console.log("Errore: " + response.status);
    }
}

/*Funzione 2: Cerca minerale per ID
Scrivi una funzione cercaMineralePerId() che:
    • Tenta di recuperare il minerale con ID = 999
    • Se il server restituisce errore 404 (ID non trovato), recupera invece il minerale con ID = 5
    • Stampa in console il nome e le tonnellate del minerale trovato

Formato richiesto: Nome: [nome], Tonnellate: [tonnellate]

Output atteso in console:
    Nome: Uranio, Tonnellate: 6*/

async function cercaMineralePerId() {
    let response = await fetch(BASE_URL + "/minerali/999");
    
    if(response.status === 404){
        response = await fetch(BASE_URL + "/minerali/5");
    }

    if(response.ok){
        const minerale = await response.json();
        console.log("Nome: " + minerale.nome + ", Tonnellate: " + minerale.tonnellate);
    } else {
        console.log("Errore: " + response.status);
    }
}

/*Funzione 3: Aggiungi nuovo minerale
Scrivi una funzione aggiungiNuovoMinerale() che:
    • Invia una richiesta POST alla rotta /minerali
    • Il body deve contenere questi dati in formato JSON:
    - nome: "Tungsteno"
    - categoria: "metalli"
    - tonnellate: 25
    - creditiPerTonnellata: 420
    - zona: "est"
    • Stampa in console il minerale creato dal server

Output atteso in console:
    { id: 13, nome: 'Tungsteno', categoria: 'metalli', tonnellate: 25, creditiPerTonnellata: 420, zona: 'est' } */

async function aggiungiNuovoMinerale() {
    const response = await fetch(BASE_URL + "/minerali", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            nome: "Tungsteno",
            categoria: "metalli",
            tonnellate: 25,
            creditiPerTonnellata: 420,
            zona: "est"
        })
    });

    if(response.ok){
        const nuovoMinerale = await response.json();
        console.log(nuovoMinerale);
    } else {
        console.log("Errore: " + response.status);
    }
}

/*Funzione 4: Conta minerali per categoria
Scrivi una funzione contaMineraliCategoria() che:
    • Tenta di recuperare tutti i minerali di categoria "cristalli"
    • Se il server restituisce errore 404 (categoria non trovata), recupera invece i minerali di categoria "metalli"
    • Conta quanti minerali sono stati trovati
    • Stampa in console la categoria e il numero totale

Formato richiesto: Minerali di categoria [categoria]: [numero]

Output atteso in console:
    Minerali di categoria cristalli: 2 */

async function contaMineraliCategoria() {
    let categoria = "cristalli";
    let response = await fetch(BASE_URL + "/minerali/categoria/" + categoria);

    if(response.status === 404){
        categoria = "metalli";
        response = await fetch(BASE_URL + "/minerali/categoria/" + categoria);
    }

    if(response.ok){
        const minerali = await response.json();
        console.log("Minerali di categoria " + categoria + ": " + minerali.length);
    } else {
        console.log("Errore: " + response.status);
    }
}

/*Funzione 5: Calcola valore inventario e minerale più prezioso
Scrivi una funzione calcolaValoreTotale() che:
    • Recupera tutti i minerali dall'avamposto
    • Calcola manualmente il valore totale dell'inventario (per ogni minerale: tonnellate × creditiPerTonnellata)
    • Trova il minerale con il valore maggiore (tonnellate × creditiPerTonnellata)
    • Stampa: "Valore totale inventario: X crediti"
    • Stampa: "Minerale più prezioso: [nome] con valore Y crediti"

Output atteso in console: <-- Sbagliato Prof ⚠️
    Valore totale inventario: 89450 crediti
    Minerale più prezioso: Diamanti grezzi con valore 7500 crediti */

async function calcolaValoreTotale(){
    const response = await fetch(BASE_URL + "/minerali");
    
    if(response.ok){
        const minerali = await response.json();
        let valoreTotale = 0;
        let piuPrezioso = minerali[0];

        for(let i = 0; i < minerali.length; i++){
            let valore = minerali[i].tonnellate * minerali[i].creditiPerTonnellata;
            valoreTotale += valore;

            if(valore > piuPrezioso.tonnellate * piuPrezioso.creditiPerTonnellata){
                piuPrezioso = minerali[i];
            }
        }
        console.log("Valore totale inventario: " + valoreTotale);
        console.log("Minerale più prezioso: " + piuPrezioso.nome + " con valore " + piuPrezioso.tonnellate * piuPrezioso.creditiPerTonnellata + " crediti")
    }else{
        console.log("Errore:" + response.status);
    } 
}

/*Funzione 6: Trova minerali con scorte critiche in una zona
Scrivi una funzione trovaMineraliCritici() che:
    • Recupera tutti i minerali dall'avamposto
    • Filtra manualmente i minerali della zona "cratere"
    • Tra questi, filtra manualmente quelli con tonnellate < 10 (scorte critiche)
    • Concatena i nomi dei minerali trovati, separati da virgola
    • Stampa: "Minerali critici nella zona cratere: [nome1], [nome2], ..."

Output atteso in console:
    Minerali critici nella zona cratere: Uranio, Diamanti grezzi */

async function trovaMineraliCritici(){
    const response = await fetch(BASE_URL + "/minerali");

    if(response.ok){
        const minerali = await response.json();
        let nomiMinerali = "";

        for(let i = 0; i < minerali.length; i++){
            if(minerali[i].zona === "cratere" && minerali[i].tonnellate < 10){
                if(nomiMinerali != ""){
                    nomiMinerali += ", ";
                }
                nomiMinerali += minerali[i].nome;
            }       
        }

        console.log("Minerali critici nella zona cratere: " + nomiMinerali);
    }else{
        console.log(response.status);
    }
}

async function main() {
  await mostraTuttiMinerali();
  await cercaMineralePerId();
  await aggiungiNuovoMinerale();
  await contaMineraliCategoria();
  await calcolaValoreTotale();
  await trovaMineraliCritici();
}
 
main();