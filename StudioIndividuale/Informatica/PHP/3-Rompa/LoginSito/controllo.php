<?php
    $nomeUtente = $_POST["nomeUtente"];
    $password = $_POST["password"];
    $utentiConsentiti = array("francy" => "123");

?>

<html>
    <head></head> 
        <body>
            <?php
                if(array_key_exists($nomeUtente, $utentiConsentiti) && $utentiConsentiti[$nomeUtente] == $password){
                    echo("Utente Loggato <br>");
                    echo("Nome: $nomeUtente - Password: $password <br>");
                }else{
                    echo("Credenziali sbagliate <br>");
                }
            ?>
            <a href="index.php">Esci</a>
        </body>
</html>