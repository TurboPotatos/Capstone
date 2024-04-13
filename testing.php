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
    $pdo = new PDO('mysql:host=sql101.infinityfree.com;dbname=if0_36314854_dicegame', 'if0_36314854', ' tXnxcpSEBW');
  
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

  $categoryResult = callQuery($pdo, "SELECT * FROM players", "Error fetching players");

  while ($player = $categoryResult->fetch()) {
    
    $playerId = $player['playerId'];
    $username = $player['username'];
    $password = $player['password'];
    
    echo "$playerId<br>$username<br>$password<br>";
    
  }


  ?> 
</body>
</html>