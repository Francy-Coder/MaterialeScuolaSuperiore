<?php
    $temp = 30;

    if($temp >= 0 && $temp <= 30){ 
        echo("The weather is good");
    }else{
        echo("The weather is bad");
    }

    echo("<br>");

    if($temp < 0 || $temp > 30){ 
        echo("The weather is bad");
    }else{
        echo("The weather is good");
    }

    echo("<br>");

    $clody = true;
    if(!$clody){
        echo("It's cloudy");
    }else{
        echo("It's sunny");
    }
?>