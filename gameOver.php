<?php
if (!session_id()) {
  session_start();
}

$disableSaveBtn = false;
$saveBtnMessage = "";

require 'sanitize.php';
require 'dbQueries.php';

if (!isset($_SESSION['username']) || $_SESSION['username'] == "guest") {
// Disable the store-run button so guests and not-signed in users can't try to save runs
  $disableSaveBtn = true;
  $saveBtnMessage = "Not Signed In!";
}

if (isset($_POST['saveRun'])) {
  $waveReached = $_POST['wave'];
  $totalHealed = $_POST['totalHealed'];
  $score = $_POST['score'];
  $difficulty = $_POST['difficulty']; 
  $totalCurrency = $_POST['totalCurrency']; 

  // Get username
  $username = $_SESSION['username'];

  // MAKE QUERY
  $pdo = dbConnect();

  // Get user playerId
  $query = "SELECT playerId FROM players WHERE username='$username'";
  $error = "Error fetching player info";

  $playerIdResult = callQuery($pdo, $query, $error);

  $playerId = $playerIdResult->fetch();

  $query = "INSERT INTO runs (score, waveReached, henchmenHealed, totalMoneyEarned, playerId, difficulty) VALUES (?, ?, ?, ?, ?, ?)";
  if (!insertQuery($pdo, $query, [$score, $waveReached, $totalHealed, $totalCurrency, $playerId['playerId'], $difficulty])) {
    // Insert failed, output error message
    echo '<h1 style="background-color: red; color: white">Error saving run!<h1>';
  } else {
    // Disable button 
    $disableSaveBtn = true;
    $saveBtnMessage = "Save Successful";
  }

} else if (isset($_SESSION['username'])){
  // NOT submitted, get the data from gameplay.js
  $myData = $myDataObject = json_decode($_POST['myData'], true);

  $waveReached = $myData['wave'];
  $totalHealed = $myData['totalHealed'];
  $score = $myData['score'];
  $difficulty = $myData['difficulty']; 
  $totalCurrency = $myData['totalCurrency']; 
} else {
  $waveReached = "";
  $total = "";
  $score = "";
  $difficulty = "";
  $totalCurrency = "";
}

// TODO fix tables to include other data
// TODO add basic styles
// TODO update Database Documents stuff
// TODO update leaderboard queries to get new stored info

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
  <div class="wrapper">
    <h2 id="gameOver">Game Over!</h2>
    
    <table id="statsTable">
      <th><h3>Stats</h3></th>
      <tr>
        <td>Henchmen Healed: <span><?= $totalHealed ?></span></td>
      </tr>
      <tr>
        <td>Difficulty: <span><?= $difficulty ?></span></td>
      </tr>
      <tr>
        <td>Money earned: <span><?= $totalCurrency ?></span></td>
      </tr>
      <tr>
        <td>Total Score: <span><?= $score ?></span></td>
      </tr>
      <tr>
        <td>Difficulty: <span><?= $difficulty ?></span></td>
      </tr>
    </table>

    
    <table id="infoTable">
      <th><h3>Info<h3></th>
      <tr>
        <td>Specialization: <span id="specialization"></span></td>
      </tr>
      <tr>
        <td>Boons Collected: <span id="collectedBoons">
          <div id="boonList"></div>
        </span></td>
      </tr>
    </table>
    <div id="buttonDiv">
      <button id="viewHistory">View History</button>
      <button id="saveRun" <?php if ($disableSaveBtn) echo "disabled"; ?> ><?php if ($saveBtnMessage != "") { echo $saveBtnMessage; } else { echo "Save Run"; } ?> </button>
      <button id="playAgain">Play Again!</button>
    </div>
    <!-- <a id="playAgain" href="index.php" style="color: green;">Play Again!</a> -->
  </div>
  <script type="module">
    import { Player } from "./src/js/Player.js";
    import { boonArray } from "./src/js/Boon.js";
    const player = new Player(JSON.parse(localStorage.getItem('player')));

    // Set specialization
    let firstKey = Object.keys(player.boonArray)[0];
    let specialization = document.querySelector('#specialization');
    switch (firstKey) {
      case 'companionCube':
        specialization.innerHTML = `Psychology`;
      break;
      case 'goggles':
        specialization.innerHTML = `Optometry`;
      break;
      case 'diamondPickaxe':
        specialization.innerHTML = `Trauma`;
      break;
      case 'portalGun':
        specialization.innerHTML = `Radiology`;
      break;
      case 'scalpel':
        specialization.innerHTML = `Surgeon`;
      break;
      case 'syringe':
        specialization.innerHTML = `Cosmetic`;
      break;
    }

    // Fill out collected boons
    let boonsList = document.querySelector("#boonList");
    
    for (let key in player.boonArray) {
      if (player.boonArray.hasOwnProperty(key)) {
        let boonItem = document.createElement("img");

        if (key === 'cuppaJoe') {
          boonItem.src = `./${player.boonArray[key][0].filePath}`;
        } else {
          boonItem.src = `./${player.boonArray[key].filePath}`;
        }

        boonItem.classList.add("boon");

        // Append the boon
        boonsList.appendChild(boonItem);
      }
    }

    // Add functionality to buttons
    const viewHistoryBtn = document.querySelector("#viewHistory");
    const saveRunBtn = document.querySelector("#saveRun");
    const playAgainBtn = document.querySelector("#playAgain");

    // Redirect user to leaderboard.php
    viewHistoryBtn.addEventListener("click", () => {
      window.location.href = "leaderboard.php";
    });

    // Submit form with all needed data in post
    saveRunBtn.addEventListener("click", () => {
      var form = document.createElement('form');
      form.method = 'post';
      form.action = '<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>';

      var waveReached = document.createElement('input');
      waveReached.type = 'hidden';
      waveReached.name = 'wave';
      waveReached.value = player.wave;
      form.appendChild(waveReached);

      var totalHealed = document.createElement('input');
      totalHealed.type = 'hidden';
      totalHealed.name = 'totalHealed';
      totalHealed.value = player.totalHealed;
      form.appendChild(totalHealed);

      var score = document.createElement('input');
      score.type = 'hidden';
      score.name = 'score';
      score.value = player.score;
      form.appendChild(score);

      var difficulty = document.createElement('input');
      difficulty.type = 'hidden';
      difficulty.name = 'difficulty';
      difficulty.value = player.difficulty;
      form.appendChild(difficulty);

      var totalCurrency = document.createElement('input');
      totalCurrency.type = 'hidden';
      totalCurrency.name = 'totalCurrency';
      totalCurrency.value = player.totalCurrency;
      form.appendChild(totalCurrency);

      // Input to tell php code to run query
      var saveRun = document.createElement('input');
      saveRun.type = 'hidden';
      saveRun.name = 'saveRun';
      saveRun.value = true;
      form.appendChild(saveRun);

      document.body.appendChild(form);

      form.submit();
    });
    
    // Redirect user to startScreen.php
    playAgainBtn.addEventListener("click", () => {
      window.location.href = "startScreen.html";
    });

  </script>
</body>
</html>