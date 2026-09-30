let button = document.getElementById("button");
let messaggio = document.getElementById("messaggio");

button.addEventListener("click", 
    function saluto(){
        messaggio.textContent = "Ciao Studente!"
    }
);