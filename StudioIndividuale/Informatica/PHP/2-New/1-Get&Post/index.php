<html>
<head></head>
<body>
    <form action="index.php" method="get">
        Username: <input type="text" name="username" required><br>
        Password: <input type="password" name="password" required><br>
        <input type="submit" value="Accedi">
    </form>
</body>
</html>

<?php
    $Username = $_GET["username"];
    $Password = $_GET["password"];
    echo("$Username <br>");
    echo("$Password <br>");
?>