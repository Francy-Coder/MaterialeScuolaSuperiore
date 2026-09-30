<?php
    $name = "Bro Code";
    echo("$name <br>");
    
    // Stringhe
    $food = "pizza";
    $email = "fake123@gmail.com"; 
    echo("Hello $name <br>");
    echo("You like $food <br>");
    echo("Your email is $email <br>");

    // Integer 
    $age = 21;
    echo("You are $age years old <br>");

    $users = 2;
    echo("There are $users users online <br>");

    $quantity = 3;
    echo("You would like to buy $quantity items <br>");

    // Float (Double)
    $gpa = 2.5;
    echo("Your gpa is: $gpa <br>");

    $price = 4.99;
    echo("Your pizza is \$ $price <br>"); // \$ --> Per scrivere il dollaro senza manadre in confuzione php
 
    $tax_rate = 5.1;
    echo("The sales tax rate is: $tax_rate % <br>");

    // Booleans --> Non stampabili, vengono usati negli if
    $employed = true;
    $online = false;
    $for_sale = true;

    $total = null;

    // Pratica
    echo("<br> You have ordered $quantity x $food 's <br>");
    $total = $quantity * $price;
    echo("Your total is: \$ $total")
?>