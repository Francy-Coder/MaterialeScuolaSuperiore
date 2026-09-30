let voto = document.getElementById("voto");
let button = document.getElementById("verificaBtn");
let risultato = document.getElementById("risultato");

button.addEventListener("click", () => {
    if(voto.value === ''){
        risultato.textContent = "Errore, ri inserisci il valore"
    }else{
        if(voto.value < 0 || voto.value > 10){
            risultato.textContent = "Errore, ri inserisci il valore"
        }else{
            if(voto.value >= 6){
                risultato.textContent = "Promosso!";
            }else{
                risultato.textContent = "Bocciato 😢";
            }
        }
    }
});