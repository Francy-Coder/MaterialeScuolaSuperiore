let button = document.getElementById("verificaBtn");
let risultato = document.getElementById("risultato");

let arrayFrutti = ["Banana",  " Mela", " Arancia"];

button.addEventListener("click", () => {
    risultato.textContent = "Nell'array la quantita di frutta presente è: " + arrayFrutti.length + ", i frutti presenti sono: " + arrayFrutti;
});