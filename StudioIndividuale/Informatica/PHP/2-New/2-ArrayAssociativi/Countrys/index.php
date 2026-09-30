<html>
<head></head>
    <body>
        <form action="index.php" method="post">
            Inserisci un paese: <input type="text" name="country"><br>
            <input type="submit" value="Invia">
        </form>
    </body>
</html>

<?php
    $capitali = array("USA"=>"Washigton D.C", "Japan"=>"Tokyo", "South Korea"=>"Seoul", "India"=>"New Delhi");

    $capitale = $capitali[$_POST["country"]]; 
    echo("La capitale è: $capitale");
?>