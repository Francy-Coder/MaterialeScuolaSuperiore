// Async/Await = Async = makes a function return a promise
//                            Await = makes an async function wait for a promise

// Allows you write asynchronous code in a synchronous manner
// Async doesn't have resolve or reject parameters
// Everything after Await is placed in an event queue

function walkDog(){
    return new Promise((resolve, reject) => {
    setTimeout(() => {

        const dogwalked = true;

        if(dogwalked){
            resolve("You walk the dog");
        }else{
            reject("You didnt walk the dog");
        }
        }, 1500);
    });
}

function cleanKitchen(){
    return new Promise((resolve, reject) => {
    setTimeout(() => {

        const kitchenCleaned = true;

        if(kitchenCleaned){
            resolve("You clean the kitchen");
        }else{
            reject("You didnt cleanthe kitchen");
        }
    }, 2500);
    });
}

function takeOutTrash(){
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        
        const trashTakenOut = true;

        if(trashTakenOut){
            resolve("You take out the trash");
        }else{
            reject("You didnt take out the trash");
        }
    }, 500);
    });
}

async function doChores(){
    try{
    const walkDogResult = await walkDog();
    console.log(walkDogResult);

    const cleanKitchenResult = await cleanKitchen();
    console.log(cleanKitchenResult);

    const takeOutTrashResult = await takeOutTrash();
    console.log(takeOutTrashResult);

    console.log("You finished all the chores");
    }catch(error){
        console.error(error);
    }
}

doChores();