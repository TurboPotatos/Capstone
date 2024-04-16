<?php
  
  if(!session_id()) {
    session_start();  
  }
  
  if(isset($_POST["username"]) && $_POST["username"] != "") {
    $_SESSION["username"] = htmlspecialchars(strip_tags($_POST["username"]));
    //TODO add validation, check if the account exists on the database
    
    //redirect to startScreen
    header("Location: startScreen.php");
  } else {
    header("Location: index.php");
  }
  
