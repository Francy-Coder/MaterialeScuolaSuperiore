let primoNumero = document.getElementById("primoNumero"); // Spazio per inserire 
let secondoNumero = document.getElementById("secondoNumero"); // Spazio per inserire 

let tempoRimasto = document.getElementById("tempoRimasto"); // Spazio per inserire
let resultElem = document.getElementById("result"); // Spazio per inserire 

let remainingTime = 10; // Durata programma

let n1Value; // Conteninore valori randomici
let n2Value; // Conteninore valori randomici

function ManageTimer() {
    if (remainingTime >= 0) {
        tempoRimasto.textContent = "⌚ Tempo rimasto: " + remainingTime--; // Stampa del tempo rimasto, sottrae il tempo rimantente

        n1Value = Math.floor(Math.random() * 100) + 1; // Numeri generati casualemente (0-100)
        primoNumero.textContent = "🔢 Primo numero: " + n1Value; // Il numero casuale viene inserito qui d'entro 

        n2Value = Math.floor(Math.random() * 100) + 1; // Numeri generati casualemente (0-100)
        secondoNumero.textContent = "🔢 Secondo numero: " + n2Value; // Il numero casuale viene inserito qui d'entro 

    } else {
        resultElem.textContent = "🏆 Risultato: " + (n2Value + n1Value); // Stampa finale
        clearInterval(timerId); // Ferma l'intervallo
    }
}

let timerId = setInterval(ManageTimer, 1000); // Intervallo dove ripete la funzione ogni 1000 ms