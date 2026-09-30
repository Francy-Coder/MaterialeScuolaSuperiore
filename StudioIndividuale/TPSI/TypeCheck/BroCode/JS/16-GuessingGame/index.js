const minNum = 1;
const maxNum = 100;
const answer = Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);

let attempts = 0;
let guess;
let running = true;

console.log(answer);1

while(running){
    guess = window.prompt("Indovina un numero tra " + minNum + " e " + maxNum);
    guess = Number(guess);

    if(isNaN(guess)){
        window.alert("Perfavore inserisci un numero valido");
    }else if(guess < minNum || guess > maxNum){
        window.alert("Perfavore inserisci un numero valido");
    }else{
        attempts++;
        if(guess < answer){
            window.alert("Troppo Basso");1
        }else if(guess > answer){
            window.alert("Troppo Alto");1
        }else{
            window.alert("Indovinato, la risposta era " + answer + ". Ti ci sono voluti " + attempts + " per indovinare!")
            running = false;
        }
    }
}