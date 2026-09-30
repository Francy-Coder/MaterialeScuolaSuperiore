<html>
<head></head>
    <body>
    </body>
</html>

<?php
    $capitali = array("USA"=>"Washigton D.C", "Japan"=>"Tokyo", "South Korea"=>"Seoul", "India"=>"New Delhi");
    
    //$capitali["USA"] = "Las Vegas"; // Cambio il valore
    //$capitali["China"] = "Beijing"; // Aggiunge un valore
    //array_pop($capitali); // Rimuove l'utimo
    //array_shift($capitali); // Rimuove il primo

    foreach($capitali as $key => $value){
        echo("$key = $value<br>");
    }

    echo("<br>");

    $keys = array_keys($capitali);
    foreach($keys as $key){
        echo("$key <br>");
    }

    echo("<br>");

    $values = array_values($capitali);
    foreach($values as $value){
        echo("$value <br>");
    }

    echo("<br>");

    //$capitals = array_flip($capitali); // Inverte le chiavi e i valori
    //$capitali = array_reverse($capitali); // Inverte l'array
    echo("Numero totale dei valori: ");
    echo count($capitali);
?>