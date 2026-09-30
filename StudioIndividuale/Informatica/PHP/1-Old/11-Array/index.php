<?php
$foods = array("apple", "orange", "banana", "coconut");

foreach($foods as $food){
    echo("$food <br>");    
}

echo("<br>");

// $foods[0] = "pineapple";

array_push($foods, "pineapple", "kiwi"); // Aggiunge un elemento alla fine dell'array
//array_pop($foods); // Rimuove l'ultimo elemento dell'array
//array_shift($foods); // Rimuove il primo elemento dell'array
//$reversed_foods = array_reverse($foods); // Gira l'array

//echo count($foods); // Restituisce il numero di elementi dentro l'array

foreach($foods as $food){
    echo("$food <br>");    
}