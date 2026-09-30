<?php
    function pari_dispari($numero){
        if(($numero % 2) == 0){
            return "$numero è pari <br>";
        }else{
            return "$numero è dispari <br>";
        }
    }

    echo(pari_dispari(10));
    echo(pari_dispari(7));
?>