<?php 

function callQuery($pdo, $query, $error) {
  try {
    return $pdo->query($query);
  } catch (PDOException $ex) {
    $error .= $ex->getMessage();
    throw $ex;
  }
}

function dbConnect() {
  try {

    // Create an instance of the PDO class
    
    // $pdo = new PDO('connectionString', 'userName', 'password');
    // $pdo = new PDO('mysql:host=sql101.infinityfree.com;dbname=if0_36314854_dicegame', 'if0_36314854', ' tXnxcpSEBW'); // REAL DB
    $pdo = new PDO('mysql:host=localhost:3306;dbname=diceGame', 'root', 'mysql'); // LOCAL DB

    return $pdo;
  
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
    return false;
  }
}

function insertQuery($pdo, $query, $insertValues) {
  try {
    $pdo->beginTransaction();

    $sql = $query;
    $s = $pdo->prepare($sql);
    $s->execute($insertValues);

    $pdo->commit();

    return true;

  } catch (PDOException $ex) {
    // Roll back transaction

    $pdo->rollBack();

    $error = "DB Entry failed " . $ex->getMessage();
    throw $ex;

    return false;
  }
}
