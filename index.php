<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <link href="src/css/styles.css" rel="stylesheet">

  <title>Henchmen Hospital</title>
</head>
<body>
	<?php
    //test session level variables
    if(!session_id()) {
      session_start();
    }

    $_SESSION["myVar"] = "This is some session data.";
    
    if(isset($_SESSION["username"]) && $_SESSION["username"] == "") {
      unset($_SESSION["username"]);
    }
    
  ?> 
  <div class="wrapper">
    
    <div id="signIn">
      Sign In!
      <form action="login.php" method="post">
        <label for="username">Username:</label>
        <input type="text" name="username">
        <br>
        <label for="password">Password:</label>
        <input type="password" name="password">
        <br>
        <input type="submit" name="submit" value="Sign In">

      </form>
      
    </div>

    <a href="startScreen.php">Play as Guest</a>

  </div>
  
  <script type="module" src="src/js/test.js"></script>

</body>
</html>