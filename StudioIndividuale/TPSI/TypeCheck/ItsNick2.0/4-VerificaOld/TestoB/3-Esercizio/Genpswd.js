let button = document.getElementById("genPswdBtn");
let resultElem = document.getElementById("result");

button.addEventListener("click", () => {
    resultElem.textContent = '' // "Cancella" la stampa di prima

    let pswLength = document.getElementById("pswLength").value // Prende il valore dato dal utente

    for (let i = 0; i < pswLength; i++) { // Ciclo per il numero della password
        resultElem.textContent += Math.floor((Math.random() * 9) + 1);
    }

})