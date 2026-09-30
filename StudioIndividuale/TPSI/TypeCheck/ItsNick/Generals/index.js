console.log('5' + 5); // Il + fa concatenazione
console.log(typeof ('5' + 5)); 

console.log('10' - "3" + 2);
console.log(typeof ('10' - "3" + 2));

console.log(1 + "2" + 3);
console.log(typeof (1 + "2" + 3));

console.log("foo" * 2 + "bar"); // NaNbar
console.log(typeof ("foo" * 2 + "bar"));

console.log(10n + BigInt("5") + " apples" + 2); 
console.log(typeof (10n + BigInt("5") + " apples" + 2)); 

let y = 4.19
console.log("y: " + typeof y)

let arr = [1, 2, 3, "ciao", false, true, []]
console.log("Arr: " + typeof arr) //Object

console.log(typeof (1 / -5));

let l = 1 / 0;
console.log("1 / 0: " + typeof l);
console.log("NaN: " + typeof NaN);

let bottone=document.getElementById("btn")

bottone.addEventListener("click", sayHello)

function sayHello(){
    alert("Ciao user! :)")
}