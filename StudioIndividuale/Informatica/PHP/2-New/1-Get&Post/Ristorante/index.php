<html>
<head></head>
<body>
    <form action="index.php" method="post">
        Quantity: <input type="text" name="quantity"><br>
        <input type="submit" value="Totale">
    </form>
</body>
</html>

<?php
    $item = "pizza";
    $price = 5;
    $quantity = $_POST["quantity"];
    $total = null;
    $total = $quantity * $price;

    echo("Hai ordinato $quantity x $item");
    echo("Il tuo totale è: $total$");
?>