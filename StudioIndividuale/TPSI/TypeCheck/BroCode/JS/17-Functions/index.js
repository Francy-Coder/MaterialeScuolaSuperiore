// function = A section of reusable code.
//                    Declare code once, use it whenever you want.
//                    Call the function to execute that code.

function happyBirthday(username, age){
    console.log(`Happy birthday to you!`);
    console.log(`Happy birthday to you!`);
    console.log(`Happy birthday dear, ${username}`);
    console.log(`Happy birthday to you!`);
    console.log(`You are ${age} years old!`);
}

happyBirthday("Brocode", 25);

function add(x, y){
    return x + y;
}
console.log(add(2, 2));

function subtract(x, y){
    return x - y;
}
console.log(subtract(2, 2));

function multiply(x, y){
    return x * y;
}
console.log(multiply(2, 2));

function divide(x, y){
    return x / y;
}
console.log(divide(2, 2));

function isEven(number){
    return number % 2 === 0 ? true : false;
}
console.log(isEven(2, 2));

function isValidEmail(email){
    return email.includes("@") ? true : false;
}
console.log(isValidEmail("Bro@fake.com"));