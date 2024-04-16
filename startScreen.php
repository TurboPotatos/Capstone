<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Henchmen Hospital</title>
</head>
<body>
	<?php
    
    if(!session_id()) {
      session_start();  
    }
    echo $_SESSION["myVar"];
    
    if(isset($_SESSION["username"])) {
      echo "<p>Username: ".$_SESSION["username"]."</p>";  
    } else {
      echo "<p>No username given.</p>";
    }
  ?>
  
  <div class="wrapper">
    <div id="titleScreen">
      <img src="#" alt="This is an image" id="titleArt">
      
      <h2>Henchmen Hospital</h2>
    </div>
    <div id="menuDiv">
      <!-- <a href="game.html">Start game</a> -->

      <h2>Game Settings</h2>

      <form action="game.html">
        <div>
          <label for="difficulty">Difficulty</label>
          <br>
          <input type="radio" name="difficulty" value="easy" required="yes">
          <label>Easy</label><br>
          <input type="radio" name="difficulty" value="medium" required="yes">
          <label>Medium</label><br>
          <input type="radio" name="difficulty" value="hard" required="yes">
          <label>Hard</label><br>
          <input type="radio" name="difficulty" value="impossible" required="yes">
          <label>Impossible</label>
        </div>
        <br><br>

        <div>
          <label for="startBoon">Starting Specialization</label>
          <br>
          <input type="radio" name="startBoon" value="cardiology" required="yes">
          <label>Cardiology</label><br>
          <input type="radio" name="startBoon" value="trauma" required="yes">
          <label>Trauma</label><br>
          <input type="radio" name="startBoon" value="radiology" required="yes">
          <label>Radiology</label><br>
          <input type="radio" name="startBoon" value="cosmetic" required="yes">
          <label>Cosmetic</label><br>
          <input type="radio" name="startBoon" value="surgeon" required="yes">
          <label>Surgeon</label>
        </div>
        <br><br>

        <div>
          <label for="diceSelect">Dice Select</label>
          <p>Currency Left: <span id="currencyRemaining">50</span></p>
          <p>d4: <input type="number" min="0" max="4" value="0" width="2rem" name="d4Count"> 
            <br>Cost: <span id="d4Cost">10</span> Max: <span id="d4Max">4</span>
          </p><br>

          <p>d6: <input type="number" min="0" max="3" value="0" width="2rem" name="d6Count"> 
            <br>Cost: <span id="d6Cost">12</span> Max: <span id="d6Max">3</span>
          </p><br>
          
          <p>d8: <input type="number" min="0" max="3" value="0" width="2rem" name="d8Count"> 
            <br>Cost: <span id="d8Cost">16</span> Max: <span id="d8Max">3</span>
          </p><br>

          <p>d10: <input type="number" min="0" max="2" value="0" width="2rem" name="d10Count"> 
            <br>Cost: <span id="d10Cost">20</span> Max: <span id="d10Max">2</span>
          </p><br>

          <p>d12: <input type="number" min="0" max="2" value="0" width="2rem" name="d12Count"> 
            <br>Cost: <span id="d12Cost">26</span> Max: <span id="d12Max">2</span>
          </p><br>

          <p>d20: <input type="number" min="0" max="1" value="0" width="2rem" name="d20Count"> 
            <br>Cost: <span id="d20Cost">30</span> Max: <span id="d20Max">1</span>
          </p>
          <br><br>
        </div>

        <input type="submit" name="start" value="Start Game">
      </form>
    </div>

    <a href="#">Leaderboard</a> 

  </div>

</body>
</html>