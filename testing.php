<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Testing Database Connections</title>
  <link rel="stylesheet" href="src/css/styles.css">
</head>
<body>
  <?php 

  // Testing database connections with the website

  try {

    // Create an instance of the PDO class
    
    // $pdo = new PDO('connectionString', 'userName', 'password');
    // $pdo = new PDO('mysql:host=sql101.infinityfree.com;dbname=if0_36314854_dicegame', 'if0_36314854', ' tXnxcpSEBW'); // REAL DB
    $pdo = new PDO('mysql:host=localhost:3306;dbname=diceGame', 'root', 'mysql'); // LOCAL DB
  
  } catch (PDOException $ex) {
  
    // Remove . $ex->getMessage(); from production code so we don't reveal too much info to the public
    $error = 'Unable to connect to the database server. <br><br>' . $ex->getMessage();
  
    // if($closeSelect) {
    //   echo "</select>";
    //   $closeSelect = false;
    // }
    echo $error;
  
    throw $ex;
    // exit();
  }

  function callQuery($pdo, $query, $error) {
    try {
      return $pdo->query($query);
    } catch (PDOException $ex) {
      $error .= $ex->getMessage();
      throw $ex;
    }
  }

  function sanitizeString($type, $field) {
    if ($type == INPUT_POST) {
  
      if (isset($_POST[$field])) {
        return htmlspecialchars(strip_tags($_POST[$field]));
      } 
  
    } else if ($type == INPUT_GET) {
      if (isset($_GET[$field])) {
        return htmlspecialchars(strip_tags($_GET[$field]));
      } 
      
    } else { // $type is assumed to be INPUT_SERVER
      if (isset($_SERVER[$field])) {
        return htmlspecialchars(strip_tags($_SERVER[$field]));
      }
  
    }
  }

  function redirect($url) {
    header('Location: '.$url);
    die();
  }


  $signUpPressed = sanitizeString(INPUT_POST, 'signUp'); 

  if ($signUpPressed) { // If the user submitted the sign-up form

    $username = sanitizeString(INPUT_POST, 'username');
    $password = sanitizeString(INPUT_POST, 'password');
    $password2 = sanitizeString(INPUT_POST, 'passwordToo');


    

    // Check if username exists
    $userCheckQuery = callQuery($pdo, "SELECT * FROM players WHERE username = '$username'", "Error fetching usernames");
    if ($user = $userCheckQuery->fetch()) {
      // username already exists
      ?> 
      <h3 style="background-color: red; color: white; border: 1px solid black; margin: 0 auto; padding: .5rem;">Username already exists</h3><?php

    } else {
      // New username, check passwords match

      if ($password == $password2) {
        // Add user and proceed to next page 

        try {
          
          $pdo->beginTransaction();

          $sql = "INSERT INTO players (username, password) VALUES (?, ?)";
          $s = $pdo->prepare($sql);
          $s->execute([$username, $password]);
      
          $pdo->commit();

        } catch (PDOException $ex){
          // Roll back transaction

          $pdo->rollBack();

          $error = "Error performing insert of author name: " . $ex->getMessage();
          throw $ex;
        }


        redirect("http://localhost:3000/startScreen.html"); // Local testing code
        // redirect("http://turbo-potatos.great-site.net/startScreen.html"); // Live code version
      } else {
        // Passwords don't match
        ?> 
        <h3 style="background-color: red; color: white; border: 1px solid black; margin: 0 auto; padding: .5rem;">Passwords don't match</h3><?php
      }

    }


  }

  $getPressed = sanitizeString(INPUT_POST, 'get');

  if ($getPressed) { // If the user selected the 'get users' form

    $categoryResult = callQuery($pdo, "SELECT * FROM players", "Error fetching players");

    while ($player = $categoryResult->fetch()) {
      
      $playerId = $player['playerId'];
      $username = $player['username'];
      $password = $player['password'];
      
      echo "$playerId<br>$username<br>$password<br>";
      
    }

  }

  $signInPressed = sanitizeString(INPUT_POST, 'signIn'); 
  // Sign-In function
  if ($signInPressed) { // If the user selected the 'sign in' form
    // Get username
    $username = sanitizeString(INPUT_POST, 'username');
    $password = sanitizeString(INPUT_POST, 'password');

    $categoryResult = callQuery($pdo, "SELECT * FROM players WHERE username = '$username'", "Username not found");

    if ($player = $categoryResult->fetch()) {
      // player exists, test password

      if ($player['password'] == $password) {
        // Correct password, continue to startScreen
        redirect("http://localhost:3000/startScreen.html");
        // redirect("http://turbo-potatos.great-site.net/startScreen.html"); // Live code version

      } else {
        // Password incorrect, give wrong password error
        ?> 
        <h3 style="background-color: red; color: white; border: 1px solid black; margin: 0 auto; padding: .5rem;">Incorrect password</h3><?php
      }

    } else {
      // player doesn't exist, let user know username must be wrong
      ?> 
        <h3 style="background-color: red; color: white; border: 1px solid black; margin: 0 auto; padding: .5rem;">Username incorrect</h3><?php
    }
  }


  ?> 
  <h1>Sign Up</h1>
  <br>
  <form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post">
    <label>Username</label>
    <input name="username" required="yes">

    <label>Password</label>
    <input name="password" required="yes">

    <label>Re-enter Password</label>
    <input name="passwordToo" required="yes">

    <input name="signUp" type="submit" value="Sign Up">
  </form>

  <h1>Display user accounts</h1>
  <form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post">
    <input type="submit" value="Get" name="get">
  </form>

  <br><br>
  <h1>Testing Sign-In</h1>
  <form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post">
  <label>Username</label>
    <input name="username" required="yes" placeholder="Username">

    <label>Password</label>
    <input name="password" required="yes" type="password">

    <input name="signIn" type="submit" value="Sign In">
  </form>

</body>
</html>