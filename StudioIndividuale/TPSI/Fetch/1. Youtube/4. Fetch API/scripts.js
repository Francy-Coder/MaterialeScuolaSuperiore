fetch("https://reqres.in/api/users", { // fa una richiesta HTTP a questo URL
    method: "POST", // tipo di richiesta: invio dati
    headers: {
        "Content-Type": "application/json" // indica che i dati sono JSON
    },
    body: JSON.stringify({ // converte oggetto JS in stringa JSON
        name: "User 1" // dato inviato al server
    })
})
.then(response => {
    return response.json(); // converte la risposta in JSON
})
.then(data => console.log(data)) // stampa i dati ricevuti
.catch(error => console.log("ERROR")); // gestisce eventuali errori