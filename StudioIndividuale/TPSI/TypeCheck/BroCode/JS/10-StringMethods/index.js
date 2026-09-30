let username = "Brocode     ";

console.log(username.charAt(0)); //Restiuisce il carattere
console.log(username.indexOf("o")); //Restiuisce la posizione del primo carattere richiesto
console.log(username.lastIndexOf("o")); //Restiuisce l'ultima posizione del carattere richiesto (4)
console.log(username.length); //Restituisce la lunghezza della stringa
console.log(username.trim()); //Leva la parte bianca
console.log(username.toUpperCase());
console.log(username.toLowerCase());
console.log(username.repeat(3));

let result;

result = username.startsWith(" ");
console.log(result);

result = username.endsWith(" ");
console.log(result);

result = username.includes(" ");
console.log(result);

let numeroTelefono = "123-456-789";
console.log(numeroTelefono);
numeroTelefono = numeroTelefono.replaceAll("-", "");
console.log(numeroTelefono);