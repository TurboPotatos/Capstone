<?php
if (!session_id()) {
  session_start();
}

require 'sanitize.php';
require 'dbQueries.php';

?> 
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Henchmen Hospital</title>
  <link rel="stylesheet" href="src/css/styles.css">
  <link rel="stylesheet" href="src/css/gameOver.css">
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
  <div class="wrapper">
    <h2 id="gameOver">Game Over!</h2>
    
    <table id="statsTable">
      <th>Stats</th>
      <tr>
        <td>Henchmen Healed: <span>.</span></td>
      </tr>
      <tr>
        <td>Healing done: <span>.</span></td>
      </tr>
      <tr>
        <td>Money earned: <span>.</span></td>
      </tr>
      <tr>
        <td>Total Score: <span>.</span></td>
      </tr>
    </table>

    
    <table id="infoTable">
      <th>Info</th>
      <tr>
        <td>Specialization: <span>.</span></td>
      </tr>
      <tr>
        <td>Boons Collected: <span id="collectedBoons"><img src="src/media/boon_labCoat.png"></span></td>
      </tr>
    </table>
    
    <a id="playAgain" href="index.php" style="color: white;">Play Again!</a>
  </div>
</body>
</html>