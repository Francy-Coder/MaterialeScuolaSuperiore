let button = document.getElementById("calcolaBtn");
let result = document.getElementById("result");

button.addEventListener("click", () => {
    let pesoNum = parseFloat(document.getElementById("kg").value);
    let altezzaNum = parseFloat(document.getElementById("height").value) / 100;

    if (pesoNum <= 0 || altezzaNum <= 0) {
        risultato.textContent = "Inserisci valori validi!";
    }

    let bmi = pesoNum / (altezzaNum ** 2);

    console.log(bmi);

    if (bmi < 18.5) {
        result.textContent = "Sottopeso";
    } else if (bmi < 24.9) {
        result.textContent = "Normopeso";
    } else if (bmi < 29.9) {
        result.textContent = "Sovrappeso";
    } else {
        result.textContent = "Obeso";
    }
});
