// function expressions = a way to define functions as
//                                           values or variables

//  1. Callbacks in asynchronous operations
//  2. Higher-Order Functions
//  3. Closures
//  4. Event Listeners

const hello = function(){
   console.log("Hello");
}

hello();

setTimeout(
    function() {
        console.log("Goodbye");
    }
    , 3000
);