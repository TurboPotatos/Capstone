import { Henchman, henchArray, henchNameArray, henchPicArray } from "./Henchman.js";
import { Player } from "./Player.js";
import { Consumable } from "./Consumable.js";

const player = new Player(JSON.parse(localStorage.getItem('player')));

player.addItem(new Consumable(2));
player.addItem(new Consumable(1));
player.addItem(new Consumable(3));
player.addItem(new Consumable(9));

document.addEventListener('DOMContentLoaded', function() {

//#region [Query Selectors]

  const collectibleEffects = document.querySelector('#collectibleEffects');
  const gameLog = document.querySelector("#logText");

  // Buttons
  const btnRoll = document.querySelector('#rollDiceBtn');
  const btnResetDice = document.querySelector('#resetDiceBtn');
  const btnEndTurn = document.querySelector('#endTurnBtn');
  const btnGoShop = document.querySelector('#goShopBtn');
  const btnGoWorkshop = document.querySelector('#goWorkshopBtn');
  const regainStaminaBtn = document.querySelector('#regainStamina');
  const visitShopBtn = document.querySelector('#visitShop');
  const visitWorkshopBtn = document.querySelector('#visitWorkshop');
  const autoEndCheckbox = document.querySelector('#autoEndTurn');

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
  
  // Directory
  // const testDirectoryBtn = document.querySelector('#testDirectory');
  const directoryCont = document.querySelector('#directoryContainer');

  const consumableBag = document.querySelector('#consumableBag');

//#endregion

//#region [Variables]
  let waveHenchmen = [];
  let accumulatedTotal = 0;
//#endregion

//#region [Initialize Game]
  updatePlayerInfo();
  populateBoons();
  populateConsumables()
  createHenchmenWave();
  populateDiceArea();
  const dieButtons = document.querySelectorAll('.die-btn');
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

  // testDirectoryBtn.addEventListener("click", (e) => {
  //   if (directoryCont.style.display != 'block') {
  //     directoryCont.style.display = 'block';
  //   } else {
  //     directoryCont.style.display = 'none';
  //   }
  // });

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

  function populateConsumables() {
    for (let key in player.items) {
      // console.log("test");
      if (player.items.hasOwnProperty(key)) {
        if (key == 'supplement') {
          // If the subarray isn't of type Consumable  
          for (let i = 0; i < player.items[key].length; i++) {
            let newConsumable = document.createElement("button");
            newConsumable.innerHTML = `Add ${player.items[key][i].bonus} to your total!`;
            consumableBag.appendChild(newConsumable);

            newConsumable.addEventListener("click", (e) => {
              accumulatedTotal += player.items[key][i].bonus;
              gameLog.innerHTML += "Added " + player.items[key][i].bonus + " to Total<br>";
              gameLog.innerHTML += "Current Total: " + accumulatedTotal + "<br><br>";
            });
          }
        }
      }
    }
  }

  function updatePlayerInfo() {
    stamina.innerHTML = "Stamina: " + player.stamina + "/" + player.maxStamina;
    score.innerHTML = "Score: " + player.score;
    currency.innerHTML = "Money: " + player.currency;
  }

  function updateHenchmenInfo() {
    henchName.innerHTML = waveHenchmen[0].name;
    health.innerHTML = waveHenchmen[0].health + "/" + waveHenchmen[0].maxHealth;
    healthBar.style.width = `${Math.ceil((waveHenchmen[0].health / waveHenchmen[0].maxHealth) * 100)}%`; 
    threshold.innerHTML = "Target: " + waveHenchmen[0].threshold;
    staminaPenalty.innerHTML = "Stamina Penalty: " + waveHenchmen[0].staminaPenalty;
    healingFactor.innerHTML = "Healing Factor: " + waveHenchmen[0].healingFactor;

    range.innerHTML = "Range: " + waveHenchmen[0].range;
    damage.innerHTML = "Malpractice Damage: " + waveHenchmen[0].damage;
    currencyGiven.innerHTML = "Currency Given: " + waveHenchmen[0].currencyGiven;

    henchmanImage.style.backgroundImage = henchPicArray[waveHenchmen[0].name];

    // Update the next-up henchman chart
    if (waveHenchmen.length > 1) {
      henchName2.innerHTML = waveHenchmen[1].name;
      threshold2.innerHTML = "Target: " + waveHenchmen[1].threshold;
      staminaPenalty2.innerHTML = "Stamina Penalty: " + waveHenchmen[1].staminaPenalty;
      healingFactor2.innerHTML = "Healing Factor: " + waveHenchmen[1].healingFactor;

      range2.innerHTML = "Range: " + waveHenchmen[1].range;
      damage2.innerHTML = "Malpractice Damage: " + waveHenchmen[1].damage;
      currencyGiven2.innerHTML = "Currency Given: " + waveHenchmen[1].currencyGiven;
    }
  }

  function nextHenchman() {
    waveHenchmen.shift();
    gameLog.innerHTML += `${waveHenchmen.length} henchmen left!<br><br>`;
    
    updateHenchmenInfo();
    updatePlayerInfo();
  }

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

    var totalResult = 0;
    var results = [];
    selectedDice.forEach(function(dieBtn) {
      
      var dice = "";
      if (dieBtn.classList.contains('temporary')) {
        dice = player.items[dieBtn.id.substring(11)][dieBtn.getAttribute('data-info')];
      } else {
        dice = player.diceArray[parseInt(dieBtn.id.substring(4))];
      }

      var result = dice.roll();

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
        result *= player.boonArray['companionCube'].effects.d4Multiplier;
        results.push("With help from Companion Cube:");
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

      totalResult += result;
      results.push("You rolled " + result + " on a d" + dice.sides.length);
      dieBtn.innerHTML = result;
    });

//#region [estusFlask]
    if (player.boonArray['estusFlask'] && player.boonArray['estusFlask'].effects.bonusActive == true) {
      player.boonArray['estusFlask'].effects.bonusActive = false;
      totalResult += player.boonArray['estusFlask'].effects.rollBonus;
      results.push("+" + player.boonArray['estusFlask'].effects.rollBonus + " from Estus Flask");
      // console.log("rollBonus: " + rollBonus);
    }
//#endregion

    accumulateTotal(totalResult);

    selectedDice.forEach(function(dieBtn) {
      dieBtn.classList.remove('current');
      dieBtn.disabled = true;
    });

    gameLog.innerHTML += results.join('<br>') + "<br>Current Total: " + accumulatedTotal + "<br><br>";
    
    // // Disable selected die buttons after rolling
    // selectedDice.forEach(function(dieBtn) {
    //   dieBtn.classList.remove('selected');
    //   dieBtn.disabled = true;
    // });
    
    // rollResult(totalResult, selectedDice);

    // if (allDisabled() && autoEndCheckbox.checked) {
    //   resetDice();
    // }
  }

  function accumulateTotal(total) {
    accumulatedTotal += total;
  }

  function rollResult(total, selectedDice) {

    if (waveHenchmen[0].threshold - waveHenchmen[0].range <= total && total <= waveHenchmen[0].threshold + waveHenchmen[0].range) { // Player must roll between the range

      let healAmount = waveHenchmen[0].healingFactor;

      if (waveHenchmen[0].threshold == total) {
        healAmount *= 2;
        gameLog.innerHTML += "Critically healing for: " + healAmount + "<br><br>";
      } else {
        gameLog.innerHTML += "Healing for: " + healAmount + "<br><br>";
      }

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

      selectedDice.forEach(function(dieBtn) {
        dieBtn.classList.add("success");
      });

      health.innerHTML = waveHenchmen[0].health + "/" + waveHenchmen[0].maxHealth;
      if ((waveHenchmen[0].health / waveHenchmen[0].maxHealth) >= 1) {
        healthBar.style.width = '100%';
      } else {
        healthBar.style.width = `${Math.ceil((waveHenchmen[0].health / waveHenchmen[0].maxHealth) * 100)}%`;
      }
    } else {
      waveHenchmen[0].health -= waveHenchmen[0].damage;

      updateHenchmenInfo();
      selectedDice.forEach(function(dieBtn) {
        dieBtn.classList.add("failure");
      });

      if (waveHenchmen[0].isDead()) {
        gameLog.innerHTML += waveHenchmen[0].name + " didn't make it...<br><br>";
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

//#region [gloves]
      if (player.boonArray['gloves'] && waveHenchmen[0].maxHealth < waveHenchmen[0].health) {
        let restoreStamina = player.boonArray['gloves'].effects.staminaRestore * (waveHenchmen[0].health - waveHenchmen[0].maxHealth);
        restoreStamina = Math.round(restoreStamina);
        player.changeStamina(restoreStamina);

        gameLog.innerHTML += "<br>Stamina recovered by Gloves: " + restoreStamina + "<br><br>";
      }
//#endregion

      player.score += waveHenchmen[0].scoreGiven;

      gameLog.innerHTML += waveHenchmen[0].name + " was fully healed!<br><br>";

//#region [elderScroll]
      if (player.boonArray['elderScroll']) {
        player.currency += player.boonArray['elderScroll'].effects.goldBonus;
      }
//#endregion

      player.currency += waveHenchmen[0].currencyGiven;
      player.changeStamina(30);
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

  function endTurn() {
    const selectedDice = document.querySelectorAll('.die-btn.selected');
    
    // Disable selected die buttons after ending turn
    selectedDice.forEach(function(dieBtn) {
      dieBtn.classList.remove('selected');
    });

    rollResult(accumulatedTotal, selectedDice);

    accumulatedTotal = 0;

    if (allDisabled() && autoEndCheckbox.checked) {
      resetDice();
    }
  }

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

      gameLog.innerHTML += "Stamina lost at end of turn: " + waveHenchmen[0].staminaPenalty + "<br><br>";
      gameLog.innerHTML += "Current Total: " + accumulatedTotal + "<br><br>";

//#region [crowbar]
      if (player.boonArray['crowbar'] && player.boonArray['crowbar'].effects.staminaLost < staminaLost) {
        staminaLost = player.boonArray['crowbar'].effects.staminaLost;
      }
//#endregion

      player.changeStamina(-staminaLost);
      stamina.innerHTML = "Stamina: " + player.stamina + "/" + player.maxStamina;

      if (player.isOutOfStamina()) {
        gameLog.innerHTML += "You're all tuckered out<br><br>";
        document.querySelector("#gameOverMessage").style.display = "block";
      }
        // if(player.stamina <= 0){
        //   window.location.replace("gameOver.html");
        // }
    }
//#region [estusFlask]
    if (player.boonArray['estusFlask']) {
      player.boonArray['estusFlask'].effects.bonusActive = true;
      // console.log("rollBonus: " + rollBonus);
    }
//#endregion
  }

  function allDisabled() {
    var buttons = document.querySelectorAll('.die-btn:not(.temporary)');
    let result = true;
    buttons.forEach(function (button) {
      // console.log(button.disabled);
      if (!button.disabled) {
        result = false; // a #notdisabledbutton was detected
      }
    });
    return result; // all dice used
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
          console.log("yup");
        });
      }
    }
  }

  function createHenchmenWave() {
    for (let i = 0; i < 1; i++){
      let randHenchName = henchNameArray[Math.floor(Math.random() * henchNameArray.length)];
      let newHenchman = new Henchman(randHenchName, player.wave);
//#region [mushroom]
      if (player.boonArray['mushroom']) {
        newHenchman.health += player.boonArray['mushroom'].effects.bonusHealth;
      }
//#endregion
//#region [scrubs]
      if(player.boonArray['scrubs']) {
        newHenchman.healingFactor += player.boonArray['scrubs'].effects.healingFactor;
      }
//#endregion
      waveHenchmen.push(newHenchman);
    }
    // waveHenchmen.push(henchArray['Grunt']);
    waveHenchmen.push(henchArray['Beetle']);
    waveHenchmen.push(henchArray['Bokoblin']);
    waveHenchmen.push(henchArray['Space Invader']);
    waveHenchmen.push(henchArray['Stuart the Minion']);
    waveHenchmen.push(henchArray['Turret']);
    waveHenchmen.push(henchArray['Koopa Troopa']);
    // console.log(waveHenchmen);
    // Alter last to be stronger 'boss' henchmen with more health
    // waveHenchmen[waveHenchmen.length - 1].maxHealth *= .5;
  
    // console.log(waveHenchmen);
  
    updateHenchmenInfo();
  }

  function populateDiceArea() {
    for (let i = 0; i < player.diceArray.length; i++) {
      diceArea.innerHTML += `<button id="dice${i}"class="die-btn ${player.diceArray[i].typeOf}">${player.diceArray[i].typeOf}</button>`;
    }
    // let testItem = new Dice('d8');
    // testItem.name = testItem.typeOf;
    // player.addItem(testItem);

    // console.log(player.items);
    // console.log(player);
    specialDiceArea.innerHTML = "";
    // Add special dice to the specialDiceArea
    for (let key in player.items) {
      // console.log("test");
      if (player.items.hasOwnProperty(key)) {
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

//#endregion

}); // END DOMContentLoaded