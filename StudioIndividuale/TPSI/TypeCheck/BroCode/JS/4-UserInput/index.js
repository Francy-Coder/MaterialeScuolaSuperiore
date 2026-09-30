let username;

document.getElementById("mySubmit").addEventListener("click",
    function funzione(){
        username = document.getElementById("myText").value;
        console.log(username);
        document.getElementById("myH1").textContent = "Hello " + username;
    }
);
