let lanciaDadoBtn = document.getElementById("lanciaDadoBtn");
let faccieDado = document.getElementById("userInput");
let risultato = document.getElementById("result");

lanciaDadoBtn.addEventListener("click", () => {
    let faccie = Number(faccieDado.value);

    if (faccie > 12 || faccie < 3) {
        window.alert("Inserire un valore nell'intervallo [3,12]");
    }else{
        let numeroCasuale = Math.floor(Math.random() * faccie) + 1;

        risultato.textContent = "Numero ottenuto: " + numeroCasuale;
    }
});