<?php
if (!session_id()) {
  session_start();
}

require 'sanitize.php';
require 'dbQueries.php';

function redirect($url) {
  header('Location: '.$url);
  die();
}

$logout = sanitizeString(INPUT_GET, 'logout');
if (isset($logout)&& $logout == 1) {
  // User wants to log out, destroy the $_SESSION['username']
  unset($_SESSION['username']);
}

$guest = sanitizeString(INPUT_GET, 'guest');
if (isset($guest)&& $guest == 1) {
  $_SESSION['username'] = "guest";
}

if (isset($_SESSION['username'])){
  // User is already signed in, redirect to startScreen
  redirect('startScreen.html');
}


?> 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <link href="src/css/styles.css" rel="stylesheet">
  <link rel="stylesheet" href="src/css/signIn.css">

  <title>Henchmen Hospital</title>
</head>
<body>
  <div class="container">

    <div id="content">
      <div class="leftSide">
      </div>
      <div id="signIn"><?php 

        $pdo = dbConnect();

        $signInPressed = sanitizeString(INPUT_POST, 'signIn');

        if ($signInPressed) {
          // Get user inputs
          $username = sanitizeString(INPUT_POST, 'username');
          $password = sanitizeString(INPUT_POST, 'password');

          $categoryResult = callQuery($pdo, "SELECT username FROM players WHERE username = '$username'", "Username not found");

          if ($player = $categoryResult->fetchColumn()) {
            // player exists, get password

            $categoryResult = callQuery($pdo, "SELECT password FROM players WHERE username = '$username'", "Password not found");
            $hashedPassword = $categoryResult->fetchColumn();

            if ($hashedPassword && password_verify($password, $hashedPassword)) {
              // Successful login, save username and redirect
              $_SESSION['username'] = $username;
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

            if ($password != $password2 && $password != "") { // Passwords don't match, output error
              echo "<style>input[name=\"password\"]{border: 2px solid red;}</style>";
              echo "<style>input[name=\"passwordTwo\"]{border: 2px solid red;}</style>";
            } else {
              // use dbQueries insertQuery() to attempt insert
              // insertQuery() returns true if it succeeds so check that to proceed
              $password = password_hash($password, PASSWORD_DEFAULT);

              if(insertQuery($pdo, "INSERT INTO players (username, password) VALUES (?, ?)", [$username, $password])) {
                // if they get here, then insert succeeded, redirect
                $_SESSION['username'] = $username;
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
          <input type="password" name="password" placeholder="Password"><br><br>
          <input type="password" name="passwordTwo" placeholder="Re-Enter Password"><br><br>
          <input type="hidden" name="newAccount" value="newAccount">
          <input type="submit" name="create" value="Create Account!"><br>
        </form>
        <br>
        
        <br><br>
        Or
        <a href="startScreen.html">Play as Guest</a><?php
        } else {
          // display sign-in form
      ?> 
        <h2>Welcome to Henchmen Hospital!</h2>
        <h3>Sign in!</h3> <br><br>
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
        
        <br><br><br>
        Or
        <a href="index.php?guest=1">Play as Guest</a>
        <?php 
        }
      ?> 
      </div>
    </div>
  </div>
  
  <script type="module" src="src/js/test.js"></script>
</body>
</html>