import { Henchman, henchArray, henchNameArray, henchPicArray, healedPicArray } from "./Henchman.js";
import {           bossArray, bossNameArray, bossPicArray, healedBossPicArray, respecHenchman } from "./Henchman.js";
import { wave1, wave2, wave3, waves } from "./Henchman.js";
import { Player } from "./Player.js";
import { Consumable } from "./Consumable.js";

// Load the player object from local storage
const player = new Player(JSON.parse(localStorage.getItem('player')));

if (!player.items["supplement"]) {
  player.addItem(new Consumable(2));
  player.addItem(new Consumable(1));
  player.addItem(new Consumable(3));
  player.addItem(new Consumable(9));
}

//#region [star]
if (player.boonArray['star']) {
  // Prerequisite for star functionality
  player.boonArray['star'].effects.preventDamage = true;
}
//#endregion

//#region [tongueDepressor]
if (player.boonArray['tongueDepressor']) {
  // Prerequisite for tongueDepressor functionality
  player.boonArray['tongueDepressor'].effects.preventLoss = true;
}
//#endregion

document.addEventListener('DOMContentLoaded', function() {

//#region [Query Selectors]

  const collectibleEffects = document.querySelector('#collectibleEffects');
  const gameLog = document.querySelector("#logText");
  const chartNotes1 = document.querySelector("#chartNotes1");

  // Buttons
  const btnRoll = document.querySelector('#rollDiceBtn');
  const btnResetDice = document.querySelector('#resetDiceBtn');
  const btnEndTurn = document.querySelector('#endTurnBtn');
  const btnGoShop = document.querySelector('#goShopBtn');
  const btnGoWorkshop = document.querySelector('#goWorkshopBtn');
  const regainStaminaBtn = document.querySelector('#regainStamina');
  const visitShopBtn = document.querySelector('#visitShop');
  const visitWorkshopBtn = document.querySelector('#visitWorkshop');

  // Henchmen Info
  const henchmanImage = document.querySelector('#henchman');
  const henchName = document.querySelector('#henchName');
  const health = document.querySelector('#health');
  const healthBar = document.querySelector('#henchmenHealth2');
  const threshold = document.querySelector('#threshold');
  const range = document.querySelector('#range');
  const staminaPenalty = document.querySelector('#staminaPenalty');
  const damage = document.querySelector('#damage');
  const healingFactor = document.querySelector('#healingFactor');
  const currencyGiven = document.querySelector('#currencyGiven');
  
  // Next Henchman Info
  const henchName2 = document.querySelector('#henchName2');
  const threshold2 = document.querySelector('#threshold2');
  const range2 = document.querySelector('#range2');
  const staminaPenalty2 = document.querySelector('#staminaPenalty2');
  const damage2 = document.querySelector('#damage2');
  const healingFactor2 = document.querySelector('#healingFactor2');
  const currencyGiven2 = document.querySelector('#currencyGiven2');

  // Player Info
  const stamina = document.querySelector('#stamina');
  const score = document.querySelector('#score');
  const currency = document.querySelector('#money');

  // Dice Area
  const diceArea = document.querySelector("#diceArea");
  const specialDiceArea = document.querySelector('#specialDice');
  const consumableBag = document.querySelector('#consumableBag');
  
  // Directory
  const directoryCont = document.querySelector('#directoryContainer');

//#endregion

//#region [Variables]
  var results = []; // for the logs
  var notesOutput = []; // for the henchman chart
  var waveHenchmen = []; // array of henchmen
  var accumulatedTotal = 0; // current total of all rolls and consumable effects
  var endTurnForReal = 2; // tracks the number of times player tries to end turn without rolling
  var consumableID = 0; // incremented when new consumables are created
//#endregion

//#region [Initialize Game]
  updatePlayerInfo();
  populateBoons();
  populateConsumables()
  // createHenchmenWave(player.wave);
  waveHenchmen.push(henchArray["Goomba"]);
  updateHenchmenInfo();
  populateDiceArea();
  const dieButtons = document.querySelectorAll('.die-btn');

//#region [mushroom]
  if (player.boonArray['mushroom']) {
    waveHenchmen[0].health += player.boonArray['mushroom'].effects.bonusHealth;
  }
//#endregion

//#endregion

//#region [Event Listeners]

  btnRoll.addEventListener("click", (e) => {
    rollDice();
  });

  btnResetDice.addEventListener("click", (e) => {
    resetDice();
  });

  btnEndTurn.addEventListener("click", (e) => {
    endTurn();
  });

  btnGoShop.addEventListener("click", (e) => {
    localStorage.setItem('player', JSON.stringify(player));
    window.location.href = 'shop.html';
  });

  btnGoWorkshop.addEventListener("click", (e) => {
    localStorage.setItem('player', JSON.stringify(player));
    window.location.href = 'workshop.html';
  });

  visitShopBtn.addEventListener("click", (e) => {
    localStorage.setItem('player', JSON.stringify(player));
    window.location.href = 'shop.html';
  });
  
  visitWorkshopBtn.addEventListener("click", (e) => {
    localStorage.setItem('player', JSON.stringify(player));
    window.location.href = 'workshop.html';
  });

  regainStaminaBtn.addEventListener("click", (e) => {
    player.changeStamina(100);
    localStorage.setItem('player', JSON.stringify(player));
    window.location.href = 'game.html';
  });

  dieButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      this.classList.toggle('selected');
      this.classList.toggle('current');
    });
  });

//#endregion

//#region [functions]  

  function createConsumableButton(consumableValue) {
    let newConsumable = document.createElement("button");
    newConsumable.innerHTML = consumableValue;
    newConsumable.id = "consumable_" + consumableID++;

    // Adds the consumable to the player's inventory
    consumableBag.appendChild(newConsumable);

    // Removes the consumable from the player's inventory and applies its effect
    newConsumable.addEventListener("click", (e) => {
      accumulatedTotal += consumableValue;

      notesOutput.push("Added " + consumableValue + " to Total");
      gameLog.innerHTML += "Added " + consumableValue + " to Total<br>" +
                           "Current Total: " + accumulatedTotal + "<br><br>";
      updateChartNotes();

      // e.target.id example: consumable_3
      delete player.items['supplement'][e.target.id.substring(11)];
      // e.target is the consumable the player clicked on
      e.target.parentElement.removeChild(e.target);
    });
  }

  // for each supplement (consumable) in the player's inventory, create an element on screen
  function populateConsumables() {
    for (let key in player.items) {
      
      if (player.items.hasOwnProperty(key) && key == 'supplement') { 
        for (let i = 0; i < player.items[key].length; i++) {
          createConsumableButton(player.items[key][i].bonus);
        }
      }
    }
  }

  // Refreshes the player's main stats
  function updatePlayerInfo() {
    stamina.innerHTML = "Stamina: " + player.stamina + "/" + player.maxStamina;
    score.innerHTML = "Score: " + player.score;
    currency.innerHTML = "Money: " + player.currency;
  }

  // Gets henchman stats from the first henchman in the wave and displays them
  // Also applies boon effects and updates the information of the second henchman
  // in the wave (if there is one)
  function updateHenchmenInfo() {
    let myName = waveHenchmen[0].name;
    let myHealth = waveHenchmen[0].health + "/" + waveHenchmen[0].maxHealth;
    let myTarget = waveHenchmen[0].threshold;
    let myRange = waveHenchmen[0].range;
    let lowerRange = (myTarget - myRange);
    let upperRange = (myTarget + myRange);
    let myStaminaPenalty = waveHenchmen[0].staminaPenalty;
    let myHealingFactor = waveHenchmen[0].healingFactor;
    let mydamage = waveHenchmen[0].damage;
    let myCurrency = waveHenchmen[0].currencyGiven;

    if ((waveHenchmen[0].health / waveHenchmen[0].maxHealth) >= 1) {
      healthBar.style.width = '100%';
    } else {
      healthBar.style.width = `${Math.ceil((waveHenchmen[0].health / waveHenchmen[0].maxHealth) * 100)}%`;
    }

    henchName.innerHTML = myName;
    health.innerHTML = myHealth;
    threshold.innerHTML = "Target: " + myTarget + " (" + lowerRange + " to " + upperRange + ")";
    staminaPenalty.innerHTML = "Stamina Penalty: " + myStaminaPenalty;
    healingFactor.innerHTML = "Healing Factor: " + myHealingFactor;
    range.innerHTML = "Range: " + myRange;
    damage.innerHTML = "Malpractice Damage: " + mydamage;
    currencyGiven.innerHTML = "Currency Given: ?";

//#region [mask]
    if (player.boonArray['mask']) {
      currencyGiven.innerHTML = "Currency Given: " + myCurrency;
    }
//#endregion
    if (henchArray.hasOwnProperty(waveHenchmen[0].name)) {
      henchmanImage.style.backgroundImage = henchPicArray[myName];
    } else {
      henchmanImage.style.backgroundImage = bossPicArray[myName];
    }

    // Update the next-up henchman chart
    if (waveHenchmen.length > 1) {
      henchName2.innerHTML = waveHenchmen[1].name;
      threshold2.innerHTML = "Target: " + waveHenchmen[1].threshold;
      staminaPenalty2.innerHTML = "Stamina Penalty: " + waveHenchmen[1].staminaPenalty;
      healingFactor2.innerHTML = "Healing Factor: " + waveHenchmen[1].healingFactor;

      range2.innerHTML = "Range: " + waveHenchmen[1].range;
      damage2.innerHTML = "Malpractice Damage: " + waveHenchmen[1].damage;
      currencyGiven2.innerHTML = "Currency Given: ?";
    }
  }

  // Removes the current henchman from the wave array and updates the display
  function nextHenchman() {
    
    waveHenchmen.shift();
    gameLog.innerHTML += `${waveHenchmen.length} henchmen left!<br><br>`;
    notesOutput.push(`${waveHenchmen.length} henchmen left!`);

//#region [mushroom]
    if (player.boonArray['mushroom']) {
      waveHenchmen[0].health += player.boonArray['mushroom'].effects.bonusHealth;
    }
//#endregion
    
    updateHenchmenInfo();
    updatePlayerInfo();

//#region [star]
    if (player.boonArray['star']) {
      // Prerequisite for star functionality
      player.boonArray['star'].effects.preventDamage = true;
    }
//#endregion

//#region [tongueDepressor]
    if (player.boonArray['tongueDepressor']) {
      // Prerequisite for tongueDepressor functionality
      player.boonArray['tongueDepressor'].effects.preventLoss = true;
    }
//#endregion
  }

  // For when dice are rolled
  function rollDice() {
    const selectedDice = document.querySelectorAll('.die-btn.selected.current');

    if (selectedDice.length === 0) {
      alert("Please select at least one die to roll.");
      return;
    }

//#region [pickaxe]
    if (player.boonArray['diamondPickaxe'] && selectedDice.length != 1) {
      alert("Please select ONLY one die to roll (Diamond Pickaxe)");
      return;
    }
//#endregion

    results = []; // for the logs
    var dieResult = []; // Stores each roll value
    var totalResult = 0; // Total of dice rolled simultaneously
    selectedDice.forEach(function(dieBtn) {
      
      var dice = ""; // the type of die eg. "d4"
      if (dieBtn.classList.contains('temporary')) {
        dice = player.items[dieBtn.id.substring(11)][dieBtn.getAttribute('data-info')];
      } else {
        dice = player.diceArray[parseInt(dieBtn.id.substring(4))];
      }

      var result = dice.roll();

//#region [portalGun]
      if (player.boonArray['portalGun']) {
        results.push("Portal gun affected your " + result);
        result = player.boonArray['portalGun'].effects.inverse - result;
      }
//#endregion

//#region [labCoat]
      if (player.boonArray['labCoat'] && selectedDice.length === 1) {
        let advantageRoll = dice.roll();

        if (result < advantageRoll) {
          result = advantageRoll;
          results.push("With help from Lab Coat:");
        }
      }
//#endregion
        
//#region [companionCube]
      if (player.boonArray['companionCube'] && dice.typeOf === "d4") {
        if (Math.random() < player.boonArray['companionCube'].effects.odds) {
          result *= player.boonArray['companionCube'].effects.d4Multiplier;
          results.push("Companion Cube doubled the value:");
        } else {
          result = Math.ceil(result * player.boonArray['companionCube'].effects.otherwise);
          results.push("Companion Cube halved the value:");
        }
        
      }
//#endregion

//#region [goggles]
      if (player.boonArray['goggles'] && dice.typeOf === "d10") {
        result += player.boonArray['goggles'].effects.d10Bonus;
        results.push("With help from Goggles:");
      }
//#endregion

//#region [pickaxe]
      if (player.boonArray['diamondPickaxe'] && selectedDice.length === 1) {
        result += player.boonArray['diamondPickaxe'].effects.rollBonus;
        results.push("With help from Diamond Pickaxe:");
      }
//#endregion

      dieResult.push(result); // Store the roll result in dieResult array

//#region [pillBottle]
      if (player.boonArray['pillBottle'] && selectedDice.length == player.boonArray['pillBottle'].effects.numDice && dieResult[0] == dieResult[1]) {
        let remainingHealth = waveHenchmen[0].maxHealth - waveHenchmen[0].health;
        let healAmount = Math.round(remainingHealth * player.boonArray['pillBottle'].effects.healFor);
        
        waveHenchmen[0].health += healAmount;
              
        results.push("+" + healAmount + " healing from Pill Bottle");
        notesOutput.push("+" + healAmount + " healing from Pill Bottle");
        
        fullHealthCheck();
      }
//#endregion

      totalResult += result;
      results.push("You rolled " + result + " on a d" + dice.sides.length);
      dieBtn.innerHTML = result;

//#region [lollipops]
      if (player.boonArray['lollipops'] && result == player.boonArray['lollipops'].effects.dieResult) {
        let healAmount = player.boonArray['lollipops'].effects.healAmount;
        waveHenchmen[0].health += healAmount;
        
        results.push("+" + healAmount + " healing from Lollipops");
        notesOutput.push("+" + healAmount + " healing from Lollipops");
        
        fullHealthCheck();
      }
//#endregion

//#region [triforce]
      if (player.boonArray['triforce'] && selectedDice.length == 3) {
        if (dieResult[0] == 1 && dieResult[1] == 1 && dieResult[2] == 1) {
          let remainingHealth = waveHenchmen[0].maxHealth - waveHenchmen[0].health;
          
          waveHenchmen[0].health += remainingHealth;
                
          results.push("Triforce healed " + waveHenchmen[0].name + " for: " + remainingHealth);
          notesOutput.push("Triforce healed " + waveHenchmen[0].name + " for: " + remainingHealth);
          
          fullHealthCheck();
        }
      }
//#endregion
    });

//#region [estusFlask]
    if (player.boonArray['estusFlask'] && player.boonArray['estusFlask'].effects.bonusActive == true) {
      player.boonArray['estusFlask'].effects.bonusActive = false;
      totalResult += player.boonArray['estusFlask'].effects.rollBonus;
      results.push("+" + player.boonArray['estusFlask'].effects.rollBonus + " from Estus Flask");
    }
//#endregion

    accumulateTotal(totalResult);

    selectedDice.forEach(function(dieBtn) {
      dieBtn.classList.remove('current');
      dieBtn.disabled = true;
    });

    gameLog.innerHTML += results.join('<br>') + "<br>Current Total: " + accumulatedTotal + "<br><br>";
    updateChartNotes();
  }

  // Keeps a running total of roll/consumable values until end of turn
  function accumulateTotal(total) {
    accumulatedTotal += total;
  }

  // The total has been submitted, rollResult checks to see whether the roll was a success or a failure
  // then applies the consequences
  function rollResult(total, selectedDice) {

    if (waveHenchmen[0].threshold - waveHenchmen[0].range <= total && total <= waveHenchmen[0].threshold + waveHenchmen[0].range) { // Player must roll between the range

      let healAmount = waveHenchmen[0].healingFactor;

      // Hitting the target exactly results in bonus healing
      if (waveHenchmen[0].threshold == total) {
        healAmount *= 2;
        gameLog.innerHTML += "Critically healing for: " + healAmount + "<br><br>";
        notesOutput.push("Critically healed " + waveHenchmen[0].name + " for: " + healAmount);
      } else {
        gameLog.innerHTML += "Healing for: " + healAmount + "<br><br>";
        notesOutput.push("Healed " + waveHenchmen[0].name + " for: " + healAmount);
      }

      // The henchman is healed
      waveHenchmen[0].health += healAmount;

//#region [beamSword]
      if (player.boonArray['beamSword'] && 
      (waveHenchmen[0].threshold * player.boonArray['beamSword'].effects.thresholdFactor) <= total) {
        
        if (Math.random() < player.boonArray['beamSword'].effects.healChance) {
          waveHenchmen[0].health += player.boonArray['beamSword'].effects.healAmount;

          gameLog.innerHTML += " And another" + player.boonArray['beamSword'].effects.healAmount + " from Beam Sword<br><br>";
        } else {
          gameLog.innerHTML += "<br><br>";
        }
      }
//#endregion

      // The 'success' class is added to each rolled die
      selectedDice.forEach(function(dieBtn) {
        dieBtn.classList.add("success");
      });

      updateHenchmenInfo();

    } else {
      let malpractice = waveHenchmen[0].damage;

//#region [star]
      if (player.boonArray['star'] && player.boonArray['star'].effects.preventDamage) {
        player.boonArray['star'].effects.preventDamage = false;
        malpractice = 0;

        gameLog.innerHTML += "Malpractice damage prevented by Star<br>";
      }
//#endregion

//#region [pokeball]
      if (player.boonArray['pokeball'] && malpractice > 0) {
        malpractice = Math.round(malpractice * player.boonArray['pokeball'].effects.damageReduction);

        gameLog.innerHTML += "Malpractice damage halved by Pokeball<br>";
      }
//#endregion

      waveHenchmen[0].health -= malpractice;

      gameLog.innerHTML += waveHenchmen[0].name + " took " + malpractice + " damage from Malpractice!<br><br>";
      notesOutput.push(waveHenchmen[0].name + " took " + malpractice + " damage from Malpractice!");

      updateHenchmenInfo();
      selectedDice.forEach(function(dieBtn) {
        dieBtn.classList.add("failure");
      });

      if (waveHenchmen[0].isDead()) {
        player.incrementKillCount();
        gameLog.innerHTML += waveHenchmen[0].name + " didn't make it...<br><br>";
        notesOutput.push(waveHenchmen[0].name + " didn't make it...");

//#region [scalpel]
        if (player.boonArray['scalpel']) {
          player.addCurrency(waveHenchmen[0].currencyGiven);

          let staminaLost = Math.ceil(player.stamina * player.boonArray['scalpel'].effects.percentLost);
          staminaLost += player.boonArray['scalpel'].effects.flatLost;

          player.changeStamina(-staminaLost);

          gameLog.innerHTML += "You still got paid. But at what cost?<br>At least " + staminaLost + " stamina...";
          notesOutput.push("You still got paid. But at what cost?<br>At least " + staminaLost + " stamina...");
        }
//#endregion

        if (waveHenchmen.length > 1) {
          nextHenchman();
        } else {
          // Wave is finished, update wave and go to shop
          // TODO allow selection of shop, workshop, or stamina regain
          player.wave += 1;
          directoryCont.style.display = 'block';
        }
      }

    }

    if (waveHenchmen[0].isFullHealth() || 
    // Tetris Piece
    (player.boonArray['tetrisPiece'] && (Math.abs((waveHenchmen[0].maxHealth - waveHenchmen[0].health) / waveHenchmen[0].maxHealth) * 100) <= 5)) {

      handleFullHeal();

    }
  }

  function handleFullHeal() {
    player.incrementHealCount();
//#region [gloves]
    if (player.boonArray['gloves'] && waveHenchmen[0].maxHealth < waveHenchmen[0].health) {
      let restoreStamina = player.boonArray['gloves'].effects.staminaRestore * (waveHenchmen[0].health - waveHenchmen[0].maxHealth);
      restoreStamina = Math.round(restoreStamina);
      player.changeStamina(restoreStamina);

      gameLog.innerHTML += "<br>Stamina recovered by Gloves: " + restoreStamina + "<br><br>";
      notesOutput.push("Stamina recovered by Gloves: " + restoreStamina);
    }
//#endregion
    if ( waveHenchmen[0].health > waveHenchmen[0].maxHealth) {
      waveHenchmen[0].health = waveHenchmen[0].maxHealth;
      updateHenchmenInfo();
    }

    // Add a consumable to the player's inventory 60% of the time
    if (player.items['supplement'].length < player.maxSupplements && Math.random() < 0.6) {
      let consumableValue = Math.floor(Math.random() * 9) + 1;
      player.addItem(new Consumable(consumableValue));
      createConsumableButton(consumableValue);
    }

    player.score += waveHenchmen[0].scoreGiven;
    player.addCurrency(waveHenchmen[0].currencyGiven);
    player.changeStamina(waveHenchmen[0].staminaReward);
    
    gameLog.innerHTML += "You fully healed " + waveHenchmen[0].name + "!<br>You recovered " + 
                         waveHenchmen[0].staminaReward + " stamina<br><br>";
    notesOutput.push("You fully healed " + waveHenchmen[0].name + "!");

    // Show the healed henchman
    henchmanImage.style.backgroundImage = healedPicArray[waveHenchmen[0].name];

    if (waveHenchmen.length > 1) {
      setTimeout(nextHenchman, 4000);
    } else {
      // Wave is finished, update wave and go to shop
      // TODO allow selection of shop, workshop, or stamina regain
      setTimeout(updatePlayerInfo, 4000);
      player.wave += 1;
      directoryCont.style.display = 'block';
    }
  }

  // Submit your total for judgement
  function endTurn() {
    const selectedDice = document.querySelectorAll('.die-btn.selected:disabled');

    // Check if the player rolled any dice this turn, and if not, make sure they really want to end the turn
    if (selectedDice.length == 0 && endTurnForReal > 0) {
      let times = "times";
      if (endTurnForReal == 1) {
        times = "time";
      }
      alert("Usually you'd want to roll some dice first,\nbut if you try again " + endTurnForReal + " more " + times + "...\nI'll allow it.");
      endTurnForReal--;
      return;
    } else {
      endTurnForReal = 2;
    }
    
    // Disable selected die buttons after ending turn
    selectedDice.forEach(function(dieBtn) {
      dieBtn.classList.remove('selected');
    });

    rollResult(accumulatedTotal, selectedDice);

    accumulatedTotal = 0;

    updateChartNotes();
  }

  // All dice are no longer disabled, and the player takes the henchman's stamina penalty
  function resetDice() {
    const buttons = document.querySelectorAll('.die-btn');
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].classList.contains("temporary") && buttons[i].disabled == true) {
        // remove all attributes to avoid conflicts
        buttons[i].removeAttribute('data-info');
        buttons[i].removeAttribute('id');
        buttons[i].removeAttribute('class');
        
        // Use the item
        player.useItem(buttons[i].id.substring(11));
        buttons[i].remove();
      }

      buttons[i].disabled = false;
      // buttons[i].style.color = "black";
      // buttons[i].style.textShadow = "none";
      buttons[i].classList.remove("success", "failure", "selected", "current");
    }

    if (!waveHenchmen[0].isFullHealth()) {

      let staminaLost = waveHenchmen[0].staminaPenalty;

      gameLog.innerHTML += "Stamina cost to reset: " + waveHenchmen[0].staminaPenalty + "<br><br>";
      notesOutput.push("Stamina cost to reset: " + waveHenchmen[0].staminaPenalty);
      gameLog.innerHTML += "Current Total: " + accumulatedTotal + "<br><br>";

//#region [tongueDepressor]
      if (player.boonArray['tongueDepressor'] && player.boonArray['tongueDepressor'].effects.preventLoss) {
        player.boonArray['tongueDepressor'].effects.preventLoss = false;
        staminaLost = 0;

        gameLog.innerHTML += "Stamina loss prevented by Tongue Depressor<br>";
        notesOutput.push("Stamina loss prevented by Tongue Depressor")
      }
//#endregion
      
//#region [crowbar]
      if (player.boonArray['crowbar'] && player.boonArray['crowbar'].effects.staminaLost < staminaLost) {
        staminaLost = player.boonArray['crowbar'].effects.staminaLost;

        gameLog.innerHTML += "Crowbar reduced stamina lost to" + staminaLost + "<br><br>";
      }
//#endregion

      player.changeStamina(-staminaLost);
      stamina.innerHTML = "Stamina: " + player.stamina + "/" + player.maxStamina;

      if (player.isOutOfStamina()) {
        if (player.boonArray['thermometer']) {
//#region [thermometer]
          let regainStamina = Math.ceil(player.maxStamina * player.boonArray['thermometer'].effects.regainStamina);
          regainStamina -= player.stamina;
          player.changeStamina(regainStamina);

          gameLog.innerHTML += "Your Thermometer broke!<br>You mercurialously recover thanks to the<br>healing properties its contents!<br><br>";
          notesOutput.push("Your Thermometer broke!<br>You mercurialously recover thanks to the<br>healing properties its contents!");
          delete player.boonArray['thermometer'];
          const thermometer = document.querySelector('#thermometer');
          const thermometerSpan = thermometer.nextElementSibling;
          thermometer.parentElement.removeChild(thermometer);
          thermometerSpan.parentElement.removeChild(thermometerSpan);
          updatePlayerInfo();
//#endregion
        } else {
          gameLog.innerHTML += "You're all tuckered out<br><br>";
          notesOutput.push("You're all tuckered out");
          let gameOverScreen = document.querySelector("#gameOverMessage"); 
          gameOverScreen.style.display = "flex";
          
          // Create two buttons for the "Game Ober" screen
          let fadeGameOver = document.createElement('button');
          let goToGameOver = document.createElement('button');

          // Clicking the button will also trigger the parent's click
          // This is a switch to prevent that
          let doubleClickSwitch = false;

          fadeGameOver.addEventListener("click", () => {
            // Fade the game over screen
            gameOverScreen.style.opacity = 0.2;
            gameOverScreen.querySelectorAll("button").forEach((button) => {
              button.style.display = "none";
            });

            doubleClickSwitch = true;
          });
          
          // Add an event listener to reveal gameOverScreen
          gameOverScreen.addEventListener("click", () => {
            if (!doubleClickSwitch){
              gameOverScreen.style.opacity = 1;
              gameOverScreen.querySelectorAll("button").forEach((button) => {
                button.style.display = "block";
              });
            } else {
              doubleClickSwitch = false;
            }
          });
          fadeGameOver.textContent = "See Game State";

          goToGameOver.addEventListener("click", () => {
            // Create form to send player to php with get data
            var hiddenForm = document.createElement("form");
            hiddenForm.method = "post";
            hiddenForm.action = "gameOver.php";
            hiddenForm.style.display = "none";

            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'myData';
            input.value = JSON.stringify(player);

            hiddenForm.appendChild(input);

            document.body.appendChild(hiddenForm);

            hiddenForm.submit();
          });

          goToGameOver.textContent = "Go To End Screen";
          
          gameOverScreen.appendChild(fadeGameOver);
          gameOverScreen.appendChild(goToGameOver);
        } 
      }
    }
//#region [estusFlask]
    if (player.boonArray['estusFlask']) {
      player.boonArray['estusFlask'].effects.bonusActive = true;
    }
//#endregion

//#region [rxPad]
    if (player.boonArray['rxPad']) {
      let healAmount = player.boonArray['rxPad'].effects.healAmount;
      waveHenchmen[0].health += healAmount;
                
      results.push("Rx Pad healed " + waveHenchmen[0].name + " for: " + healAmount);
      notesOutput.push("Rx Pad healed " + waveHenchmen[0].name + " for: " + healAmount);
      
      fullHealthCheck();
    }
//#endregion

    updateChartNotes();
  }

  function populateBoons() {
    for (let key in player.boonArray) {
      if (player.boonArray.hasOwnProperty(key)) {

        let newImgTag = document.createElement('img');

        if (key === 'cuppaJoe') {
          newImgTag.src = `../../${player.boonArray[key][0].filePath}`;
        } else {
          newImgTag.src = `../../${player.boonArray[key].filePath}`;
        }

        newImgTag.classList.add("boon");
        newImgTag.id = player.boonArray[key].name;

        let newSpanTag = document.createElement('span');
        newSpanTag.innerHTML = player.boonArray[key].description;
        newSpanTag.classList.add("tooltip");

        collectibleEffects.appendChild(newImgTag);
        newImgTag.insertAdjacentElement('afterend', newSpanTag);

        newImgTag.addEventListener("click", function() {
          let tooltip = newSpanTag;
          let alreadyDisplayed = (tooltip.style.display == "block");
      
          let allTooltips = document.querySelectorAll('.tooltip');
          allTooltips.forEach(tip => {
            tip.style.display = "none";
          });
      
          if (alreadyDisplayed) {
            tooltip.style.display = 'none';
          } else {
            tooltip.style.display = 'block';
          }
        });
      }
    }
  }

  function createHenchmenWave(waveNumber) {
    // Make waveNumber cycle 1-3
    if (waveNumber > 2) {
      waveNumber = (waveNumber % 3);

      // Make henchmen more difficult 
      for (let key in henchArray) {
        if (henchArray.hasOwnProperty(key)) {
        // 1 threshold, 2 range,
        // 3 staminaPenalty, 4 healingFactor, 
        // 5 health, 6 maxHealth, 
        // 7 damage, 
        // 8 scoreGiven, 9 currencyGiven, 10 staminaReward
        let henchman = henchArray[key];
          respecHenchman(henchArray[key], 
            henchman.threshold, (henchman.range >= 3) ? (henchman.range - 1) : henchman.range, // Reduce range by 1, min 2
            henchman.staminaPenalty + 5, henchman.healingFactor, // Increase penalty by 5
            henchman.health, henchman.maxHealth * 1.4, // Increase max health
            henchman.damage * 1.5, henchman.scoreGiven * 1.2, // Increase damage henchmen takes and score given
            henchman.currencyGiven * 1.2, henchman.staminaReward); // Increase currency a little bit
        }
      }

      // Make bosses more difficult
      for (let key in bossArray) {
        if (bossArray.hasOwnProperty(key)) {
        // 1 threshold, 2 range,
        // 3 staminaPenalty, 4 healingFactor, 
        // 5 health, 6 maxHealth, 
        // 7 damage, 
        // 8 scoreGiven, 9 currencyGiven, 10 staminaReward
        let boss = bossArray[key];
          respecHenchman(bossArray[key], 
            boss.threshold, (boss.range >= 2) ? (boss.range - 1) : boss.range, // Reduce range by 1, min 1
            boss.staminaPenalty + 10, boss.healingFactor, // Increase penalty by 10
            boss.health, boss.maxHealth * 2, // Increase max health
            boss.damage * 2, boss.scoreGiven * 2, // Increase damage henchmen takes and score given
            boss.currencyGiven * 1.5, boss.staminaReward); // Increase currency a little bit
        }
      }

    }
    waves[waveNumber].forEach((henchman) => {
      if (henchArray.hasOwnProperty(henchman)) {
//#region [nukaCola]
      if (player.boonArray['nukaCola']) {
        henchArray[henchman].range += player.boonArray['nukaCola'].effects.bonusRange;
      }
//#endregion

//#region [scrubs]
      if(player.boonArray['scrubs']) {
        henchArray[henchman].healingFactor += player.boonArray['scrubs'].effects.healingFactor;
      }
//#endregion

//#region [syringe]
      if (player.boonArray['syringe']) {
        henchArray[henchman].healingFactor += 
        Math.ceil(henchArray[henchman].healingFactor * player.boonArray['syringe'].effects.bonus);
        
        henchArray[henchman].damage += 
        Math.ceil(henchArray[henchman].damage * player.boonArray['syringe'].effects.bonus);
      }
      
//#endregion
        waveHenchmen.push(henchArray[henchman]);
      } else {
//#region [nukaCola2]
      if (player.boonArray['nukaCola']) {
        bossArray[henchman].range += player.boonArray['nukaCola'].effects.bonusRange;
      }
//#endregion

//#region [scrubs2]
      if(player.boonArray['scrubs']) {
        bossArray[henchman].healingFactor += player.boonArray['scrubs'].effects.healingFactor;
      }
//#endregion

//#region [syringe2]
      if (player.boonArray['syringe']) {
        bossArray[henchman].healingFactor += 
        Math.ceil(bossArray[henchman].healingFactor * player.boonArray['syringe'].effects.bonus);
        
        bossArray[henchman].damage += 
        Math.ceil(bossArray[henchman].damage * player.boonArray['syringe'].effects.bonus);
      }
      
//#endregion
        waveHenchmen.push(bossArray[henchman]);
      }
    });
  
    updateHenchmenInfo();
  }

  function populateDiceArea() {
    for (let i = 0; i < player.diceArray.length; i++) {
      diceArea.innerHTML += `<button id="dice${i}"class="die-btn ${player.diceArray[i].typeOf}"></button>`;
    }

    specialDiceArea.innerHTML = "";

    // Add special dice to the specialDiceArea
    for (let key in player.items) {
      if (player.items.hasOwnProperty(key) && key != "supplement") {
        for (let i = 0; i < player.items[key].length; i++) {
          let newItem = document.createElement('button');
          newItem.id = "specialDice" + player.items[key][i].typeOf;
          newItem.classList.add("die-btn", "temporary", player.items[key][i].typeOf);
          newItem.setAttribute('data-info', i);
          newItem.innerHTML = player.items[key][i].typeOf;
          specialDiceArea.appendChild(newItem);
        }
      }
    }
  }

  function fullHealthCheck() {
    if (waveHenchmen[0].isFullHealth() || 
// Tetris Piece
    (player.boonArray['tetrisPiece'] && (Math.abs((waveHenchmen[0].maxHealth - waveHenchmen[0].health) / waveHenchmen[0].maxHealth) * 100) <= 5)) {

      gameLog.innerHTML += results.join('<br>') + "<br>";
      results = [];
      handleFullHeal();
      
    } else {
      updateHenchmenInfo();
    }
  }

  function updateChartNotes() {
    if (notesOutput.length == 0) {
      notesOutput.push("Current Total: " + accumulatedTotal);
    } else {
      notesOutput.push("<br>Current Total: " + accumulatedTotal);
    }

    chartNotes1.innerHTML = notesOutput.join('<br>') + "<br>";

    notesOutput = [];

    updatePlayerInfo();
  }

//#endregion

}); // END DOMContentLoaded