var container = document.getElementById("container");
var sumDisplay = document.getElementById("sum");
var resetBtn = document.getElementById("resetBtn");

var totalSum = 0;
var counter = 1;
var intervalId = null;
var MAX_BUTTONS = 30;

// Funzione per creare un bottone
function createButton(num) {
    var div = document.createElement("div");      // div dedicato
    var btn = document.createElement("button");   // bottone

    btn.textContent = num;
    btn.value = num;

    // Evento click del bottone
    btn.addEventListener("click", function() {
        totalSum += parseInt(btn.value);
        sumDisplay.textContent = totalSum;
        div.remove(); // rimuovo bottone e div
    });

    div.appendChild(btn);
    container.appendChild(div);
}

// Funzione per generare i bottoni ogni secondo
function startGeneration() {
    intervalId = setInterval(function() {
        if (counter > MAX_BUTTONS) {
            clearInterval(intervalId); // ferma generazione
            intervalId = null;
            return;
        }
        createButton(counter);
        counter++;
    }, 1000);
}

// Funzione reset
function resetAll() {
    clearInterval(intervalId);
    intervalId = null;
    totalSum = 0;
    sumDisplay.textContent = totalSum;
    container.innerHTML = ""; // rimuove tutti i bottoni
    counter = 1;
    startGeneration();
}

// Event listener pulsante reset
resetBtn.addEventListener("click", resetAll);

// Avvio iniziale
startGeneration();
