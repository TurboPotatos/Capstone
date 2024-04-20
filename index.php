<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <link href="src/css/styles.css" rel="stylesheet">

  <title>Henchmen Hospital</title>
</head>
<body>
  <div class="navBar">
    <a href="index.php">Sign In</a>
    <a href="startScreen.html">Start Screen</a>
    <a href="leaderboard.html">Leaderboard/History</a>
    <a href="game.html">Game</a>
    <a href="gameOver.html">Game Over</a>
    <a href="shop.html">Shop</a>
    <a href="workshop.html">Workshop</a>
  </div>
  <div class="container">

    <div id="content">
      <div class="leftSide">
        <!-- <img src="src/media/potionDice_transparent.png" alt="placeholder"> -->
      </div>
      <div id="signIn"><?php 
        require 'sanitize.php';
        require 'dbQueries.php';

        function redirect($url) {
          header('Location: '.$url);
          die();
        }

        $pdo = dbConnect();

        $signInPressed = sanitizeString(INPUT_POST, 'signIn');

        if ($signInPressed) {
          // Get user inputs
          $username = sanitizeString(INPUT_POST, 'username');
          $password = sanitizeString(INPUT_POST, 'password');

          $categoryResult = callQuery($pdo, "SELECT * FROM players WHERE username = '$username'", "Username not found");

          if ($player = $categoryResult->fetch()) {
            // player exists, test password

            if ($player['password'] == $password) {
              // Successful login, redirect user
              redirect("startScreen.html");
            } else {
              // Password incorrect, output error message
              echo "<style>input[name=\"password\"]{border: 2px solid red;}</style>";
            }
          } else {
            // Username doesn't exist, output error message
            echo "<style>input[name=\"username\"]{border: 2px solid red;}</style>";
          }

        }

        $createPressed = sanitizeString(INPUT_POST, 'create');

        if ($createPressed) {
          // User submitted form for creation of new account

          // get their inputs
          $username = sanitizeString(INPUT_POST, 'username');
          $password = sanitizeString(INPUT_POST, 'password');
          $password2 = sanitizeString(INPUT_POST, 'passwordTwo');

          // Check if username exists
          $userCheckQuery = callQuery($pdo, "SELECT * FROM players WHERE username = '$username'", "Error fetching usernames");

          if ($user = $userCheckQuery->fetch()) { // username exists, output error
            echo "<style>input[name=\"username\"]{border: 2px solid red;}</style>";
          } else {
            // check passwords match

            if ($password != $password2) { // Passwords don't match, output error
              echo "<style>input[name=\"password\"]{border: 2px solid red;}</style>";
              echo "<style>input[name=\"passwordTwo\"]{border: 2px solid red;}</style>";
            } else {
              // use dbQueries insertQuery() to attempt insert
              // insertQuery() returns true if it succeeds so check that to proceed

              if(insertQuery($pdo, "INSERT INTO players (username, password) VALUES (?, ?)", [$username, $password])) {
                // if they get here, then insert succeeded, redirect
                redirect("startScreen.html");
              } else {
                // insert failed, output error message
                echo "<h3 style=\"\background: red; color: white\">Account creation failed. Try again later.</h3>";
              }
            }

          }
        }

        $newAccountPressed = sanitizeString(INPUT_POST, 'newAccount');

        if ($newAccountPressed) {
          // display create account form
          ?>
        <h2>Welcome to Henchmen Hospital!</h2>
        <h3>Create an Account!</h3> <br><br>
        <form action="<?= $_SERVER['PHP_SELF'] ?>" method="post">
          <input type="text" name="username" placeholder="Username"><br><br>
          <input type="text" name="password" placeholder="Password"><br><br>
          <input type="text" name="passwordTwo" placeholder="Re-Enter Password"><br><br>
          <input type="hidden" name="newAccount" value="newAccount">
          <input type="submit" name="create" value="Create Account!"><br>
        </form>
        <br>
        <!-- <a href="#">Create Account</a> -->
        
        <br><br>
        Or
        <a href="startScreen.html">Play as Guest</a><?php
        } else {
          // display sign-in form
      ?> 
        <h2>Welcome to Henchmen Hospital!</h2>
        <h3>Sign in!</h3> <br><br>
		
		<!-- TODO: serialize the player object as a cookie -->
		
        <form action="<?= $_SERVER['PHP_SELF'] ?>" method="post">
          <input type="text" name="username" placeholder="Username">
          <input type="password" name="password" placeholder="Password">
          <input type="submit" name="signIn" value="Sign In">
        </form>
        <br>
        Don't have an account yet?<br>
        <form method="post">
          <input type="submit" name="newAccount" value="Create Account">
        </form>
        <!-- <a href="#">Create Account</a> -->
        
        <br><br><br>
        Or
        <a href="startScreen.html">Play as Guest</a>
        <?php 
        }
      ?> 
      </div>
    </div>
  </div>
  
  <!-- <script type="module" src="src/js/test.js"></script> -->
</body>
</html>