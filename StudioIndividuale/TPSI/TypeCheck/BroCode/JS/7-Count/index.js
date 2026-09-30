const incrementaBtn = document.getElementById("incrementa");
const resettaBtn = document.getElementById("resetta");
const decrementaBtn = document.getElementById("decrementa");
const countLabel = document.getElementById("contatore");

let count = 0;

incrementaBtn.addEventListener("click",
    function incrementa(){
        count++;
        countLabel.textContent = count;
    }
);

resettaBtn.addEventListener("click",
    function incrementa(){
        count = 0;
        countLabel.textContent = count;
    }
);

decrementaBtn.addEventListener("click",
    function incrementa(){
        count--;
        countLabel.textContent = count;
    }
);