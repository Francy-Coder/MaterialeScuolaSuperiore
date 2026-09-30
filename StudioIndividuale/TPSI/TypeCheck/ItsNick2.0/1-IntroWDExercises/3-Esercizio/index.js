let numero = document.getElementById("numero");
let button = document.getElementById("verificaBtn");
let risultato = document.getElementById("risultato");

button.addEventListener("click", () => {
    if(numero.value === ''){
        risultato.textContent = "Errore, ri inserisci il valore"
    }else{
        if(numero.value % 2 === 0){
            risultato.textContent = "Il numero è Pari";
        }else{
            risultato.textContent = "Il numero è Dispari";
        }
    }
});