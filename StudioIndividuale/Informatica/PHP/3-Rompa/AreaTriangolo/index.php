<html>
    <head></head>
    <body>
        <h1>Calcolatore Area di un Triangolo</h1>
        <p>Inserisci... </p>
        <form action="index.php" method="GET">
            Base: <input type="number" name="base"><br>
            Altezza: <input type="number" name="altezza"><br>
            <input type="submit" value="Invia Dati">
        </form>
    </body>
</html>

<?php
    $base = $_GET["base"];
    $altezza = $_GET["altezza"];

    include("funzione.php");

    $risultato = calcoloAreaTriangolo($base, $altezza);
    echo("Risultato: $risultato cm");
?>