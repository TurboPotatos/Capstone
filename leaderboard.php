<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="src/css/styles.css">
</head>
<body>
  <div class="wrapper" style="flex-direction: column;">
    <div class="tab">
      <a href="startScreen.html">Back to Start</a>
      <button class="tablinks" onclick="openTab(event, 'leaderboard')" id="defaultOpen">Leaderboard</button>
      <button class="tablinks" onclick="openTab(event, 'history')">History</button>
    </div>

    <div id="leaderboard" class="tabcontent">
      <h3>Leaderboard Content</h3>
      <?php 
      // Get leaderboard info and output as a table
      include 'dbQueries.php';

      $pdo = dbConnect();

      $query = "SELECT username, score, waveReached FROM players, runs
                WHERE runs.playerId = players.playerId ORDER BY score LIMIT 50";

      $errorMessage = "Error fetching leaderboard";

      $leaderboardResult = callQuery($pdo, $query, $errorMessage);

    ?> 
      <table class="leaderboard">
        <tr>
          <th>Username</th>
          <th>Score</th>
          <th>Wave Reached</th>
        </tr>
    <?php
      while ($row = $leaderboardResult->fetch()) {
        $playerName = $row['username'];
        $score = $row['score'];
        $waveReached = $row['waveReached'];


        $dataRow = <<<DATAROW

        <tr>
          <td>$playerName</td>
          <td>$score</td>
          <td>$waveReached</td>
        </tr>
DATAROW;
        echo $dataRow;
      }

      ?> 

      </table>
    </div>

    <div id="history" class="tabcontent">
      <h3>History Content</h3>
      <div class="temp">
        <h3>Temporary Sign-In for Player History</h3>
        <form action="<?= $_SERVER['PHP_SELF'] ?>" method="post">
          <input type="text" name="username" placeholder="Username">
          <input type="submit" name="submit" value="See History">
        </form>
      </div>

      <table class="history">
        <tr>
          <th>Username</th>
          <th>Score</th>
          <th>Wave Reached</th>
        </tr>
      <?php 
        // Get user info from temp table 
        include "sanitize.php";
        
        $username = sanitizeString(INPUT_POST, "username");
        // TODO: Get user info from cookies

        if ($username) {
          
          // Make sure user exists
          $categoryResult = callQuery($pdo, "SELECT * FROM players WHERE username = '$username'", "Username not found");

          if ($player = $categoryResult->fetch()) {
            // Get history info and output as a table

            $query = "SELECT username, score, waveReached FROM players, runs WHERE runs.playerId = players.playerId AND username = '$username' ORDER BY runId";
            $error = "Error fetching player history";

            $historyResult = callQuery($pdo, $query, $error);

            while ($row = $historyResult->fetch()) {
              $playerName = $row['username'];
              $score = $row['score'];
              $waveReached = $row['waveReached'];
      
      
              $dataRow = <<<DATAROW
      
        <tr>
          <td>$playerName</td>
          <td>$score</td>
          <td>$waveReached</td>
        </tr>
DATAROW;
              echo $dataRow;
            }

          }

        }

      ?> 
      </table>
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