<?php
if (!session_id()) {
  session_start();
}

?> 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="src/css/leaderboard.css">
</head>
<body>
  <div class="wrapper" style="flex-direction: column;">
    <div class="tab">
      <button class="tablinks" onclick="openTab(event, 'leaderboard')" id="defaultOpen">Leaderboard</button>
      <button class="tablinks" onclick="openTab(event, 'history')">History</button>
    </div>
    <div id="tableWrap">
      <div id="leaderboard" class="tabcontent">
        <?php 
        // Get leaderboard info and output as a table
        include 'dbQueries.php';

        $pdo = dbConnect();

        $query = "SELECT username, score, waveReached, henchmenHealed, totalMoneyEarned, difficulty  FROM players, runs
                  WHERE runs.playerId = players.playerId ORDER BY score DESC LIMIT 50";

        $errorMessage = "Error fetching leaderboard";

        $leaderboardResult = callQuery($pdo, $query, $errorMessage);

      ?> 
        <table class="leaderboard">
          <tr>
            <th>Username</th>
            <th>Score</t>
            <th>Wave Reached</th>
            <th>Total Money Earned</th>
            <th>Total of Healed Henchmen</th>
            <th>Difficulty</th>
          </tr>
      <?php
        while ($row = $leaderboardResult->fetch()) {
          $playerName = $row['username'];
          $score = $row['score'];
          $waveReached = $row['waveReached'];
          $totalCurrency = $row['totalMoneyEarned'];
          $totalHealed = $row['henchmenHealed'];
          $difficulty = $row['difficulty'];



          $dataRow = <<<DATAROW

          <tr>
            <td>$playerName</td>
            <td>$score</td>
            <td>$waveReached</td>
            <td>$totalCurrency</td>
            <td>$totalHealed</td>
            <td>$difficulty</td>
          </tr>
DATAROW;
          echo $dataRow;
        }

        ?> 

        </table>
      </div>

      <div id="history" class="tabcontent"> <?php
        if (isset($_SESSION['username'])) {
          $username = $_SESSION['username'];
        }
          if (!isset($username) || $username == "guest") {
            ?> 
        <h2>
          Unfortunately, you are not signed in or are signed in as a guest. History is not available unless you are signed in with an account.
        </h2><?php
          } else {
        ?> 

        <table class="history">
        <tr>
            <th>Username</th>
            <th>Score</th>
            <th>Wave Reached</th>
            <th>Total Money Earned</th>
            <th>Total of Healed Henchmen</th>
            <th>Difficulty</th>
          </tr>
        <?php 
          // Get user info from temp table 
          include "sanitize.php";

          if ($username) {
            
            // Make sure user exists
            $categoryResult = callQuery($pdo, "SELECT * FROM players WHERE username = '$username'", "Username not found");

            if ($player = $categoryResult->fetch()) {
              // Get history info and output as a table

              $query = "SELECT username, score, waveReached, henchmenHealed, totalMoneyEarned, difficulty FROM players, runs WHERE runs.playerId = players.playerId AND username = '$username' ORDER BY runId";
              $error = "Error fetching player history";

              $historyResult = callQuery($pdo, $query, $error);

              while ($row = $historyResult->fetch()) {
                $playerName = $row['username'];
                $score = $row['score'];
                $waveReached = $row['waveReached'];
                $totalCurrency = $row['totalMoneyEarned'];
                $totalHealed = $row['henchmenHealed'];
                $difficulty = $row['difficulty'];
        
        
                $dataRow = <<<DATAROW
        
          <tr>
            <td>$playerName</td>
            <td>$score</td>
            <td>$waveReached</td>
            <td>$totalCurrency</td>
            <td>$totalHealed</td>
            <td>$difficulty</td>
          </tr>
  DATAROW;
                echo $dataRow;
              }

            }

          }

        ?> 
        </table><?php 
        } 
        ?> 
      </div>
    </div>
    <div id="toStart">
      <a href="startScreen.html">Back to Start</a>
    </div>
  </div>

  <script>
    document.getElementById("defaultOpen").click();

    function openTab(event, tabName) {
      var tabcontent = document.getElementsByClassName("tabcontent");
      for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }

      var tablinks = document.getElementsByClassName("tablinks");
      for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }

      document.getElementById(tabName).style.display = "block";
      event.currentTarget.className += " active";
    }

    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    if (tab === 'history') {
      openTab(event, 'history');
    }
  </script>
</body>
</html>