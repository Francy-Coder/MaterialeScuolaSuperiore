<html>
<head></head>
<body>
    <form action="index.php" method="post">
        Username: <input type="text" name="username"><br>
        Password: <input type="password" name="password"><br> 
        <input type="submit" name="login" value="Accedi">
    </form>
</body>
</html>

<?php
    if(isset($_POST["login"])) {
        $username = $_POST["username"];
        $password = $_POST["password"];

        if(empty($username)) {
            echo "username is missing <br>";
        }
        elseif(empty($password)) {
            echo "password is missing <br>";
        }
        else {
            echo "hello $username <br>";
        }
    }
?>