let random = 0;
random = Math.floor(Math.random() * 6) + 1;

console.log(random);

const min = 50;
const max = 100;

random = Math.floor(Math.random() * (max - min)) + min;
console.log(random);