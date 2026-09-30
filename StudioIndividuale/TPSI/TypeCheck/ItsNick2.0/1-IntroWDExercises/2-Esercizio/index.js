let primoNumero = document.getElementById("primoNumero");
let secondoNumero = document.getElementById("secondoNumero");

let sommaBtn = document.getElementById("sommaBtn");
let risultato = document.getElementById("risultato");

sommaBtn.addEventListener("click", () => {
    if(primoNumero.value === '' || secondoNumero.value === ''){
        risultato.textContent = "Errore, ri inserisci i valori";
    }

    risultato.textContent = "Risultato: " + (Number(primoNumero.value) + Number(secondoNumero.value));
});