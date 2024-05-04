import { Henchmen } from "./Henchman.js";
import { henchNameArray } from "./Henchman.js";
import { henchArray } from "./Henchman.js";
import { Player } from "./Player.js";
import { Boon } from "./Boon.js";
import { boonArray } from "./Boon.js";
import { Dice } from "./Dice.js";


const player = new Player(JSON.parse(localStorage.getItem('player')));

// if (player.boonArray['companionCube']) {
//   console.log("has cube: ", player.boonArray['companionCube']);
//   // console.log(player.boonArray['companionCube']);
// }

// if (player.boonArray['crowbar']) {
//   console.log("has crowbar");
// }

// let rollBonus = false;
// let wave = 0;



document.addEventListener('DOMContentLoaded', function() {

//region [Query Selectors]
  const collectibleEffects = document.querySelector('#collectibleEffects');

  const btnRoll = document.querySelector('#rollDiceBtn');
  const btnEndTurn = document.querySelector('#endTurnBtn');
  const btnGoShop = document.querySelector('#goShopBtn');
  const btnGoWorkshop = document.querySelector('#goWorkshopBtn');
  const gameLog = document.querySelector("#logText");

  const henchmanImage = document.querySelector('#henchman');
  const henchName = document.querySelector('#henchName');
  const health = document.querySelector('#health');
  const healthBar = document.querySelector('#henchmenHealth2');
  //   const damage = document.querySelector('#damage');
  const threshold = document.querySelector('#threshold');
  const staminaPenalty = document.querySelector('#staminaPenalty');
  const healingFactor = document.querySelector('#healingFactor');
  //   const currencyGiven = document.querySelector('#currencyGiven');
  
  const henchName2 = document.querySelector('#henchName2');
  const threshold2 = document.querySelector('#threshold2');
  const staminaPenalty2 = document.querySelector('#staminaPenalty2');
  const healingFactor2 = document.querySelector('#healingFactor2');

  const stamina = document.querySelector('#stamina');
  const score = document.querySelector('#score');
  const currency = document.querySelector('#money');

  const diceArea = document.querySelector("#diceArea");
  const specialDiceArea = document.querySelector('#specialDice');

  // const testDirectoryBtn = document.querySelector('#testDirectory');
  const directoryCont = document.querySelector('#directoryContainer');

  const regainStaminaBtn = document.querySelector('#regainStamina');
  const visitShopBtn = document.querySelector('#visitShop');
  const visitWorkshopBtn = document.querySelector('#visitWorkshop');
  //endregion

  stamina.innerHTML = "Stamina: " + player.stamina;
  score.innerHTML = "Score: " + player.score;
  currency.innerHTML = "Money: " + player.currency;

  populateBoons();

//#region [Wave of Henchmen]
  let waveHenchmen = [];
  for (let i = 0; i < 2; i++){
    let randHenchName = henchNameArray[Math.floor(Math.random() * henchNameArray.length)];
    let newHenchie = new Henchmen(randHenchName, player.wave);
//#region [mushroom]
    if (player.boonArray['mushroom']) {
      newHenchie.health += player.boonArray['mushroom'].effects.bonusHealth;
    }
//#endregion
//#region [scrubs]
    if(player.boonArray['scrubs']) {
      newHenchie.healingFactor += player.boonArray['scrubs'].effects.healingFactor;
    }
//#endregion
    waveHenchmen.push(newHenchie);
  }
  // Alter last to be stronger 'boss' henchmen with more health
  waveHenchmen[waveHenchmen.length - 1].maxHealth *= 1.5;

  // console.log(waveHenchmen);
  function updateHenchmen() {
    henchName.innerHTML = waveHenchmen[0].name;
    health.innerHTML = waveHenchmen[0].health + "/" + waveHenchmen[0].maxHealth;
    healthBar.style.width = `${Math.ceil((waveHenchmen[0].health / waveHenchmen[0].maxHealth) * 100)}%`; 
    threshold.innerHTML = "Threshold: " + waveHenchmen[0].threshold;
    staminaPenalty.innerHTML = "Stamina Penalty: " + waveHenchmen[0].staminaPenalty;
    healingFactor.innerHTML = "Healing Factor: " + waveHenchmen[0].healingFactor;
    //currencyGiven.innerHTML = "Currency Given: " + waveHenchmen[0].currencyGiven;

    henchmanImage.style.backgroundImage = henchArray[waveHenchmen[0].name];

    // Update the next-up henchman chart
    if (waveHenchmen.length > 1) {
      henchName2.innerHTML = waveHenchmen[1].name;
      threshold2.innerHTML = "Threshold: " + waveHenchmen[1].threshold;
      staminaPenalty2.innerHTML = "Stamina Penalty: " + waveHenchmen[1].staminaPenalty;
      healingFactor2.innerHTML = "Healing Factor: " + waveHenchmen[1].healingFactor;
    }

  }

  updateHenchmen();
//#endregion

  // Add dice to the diceArea
  for (let i = 0; i < player.diceArray.length; i++) {
    diceArea.innerHTML += `<button id="dice${i}"class="die-btn ${player.diceArray[i].typeOf}">${player.diceArray[i].typeOf}</button>`;
  }
  // let testItem = new Dice('d8');
  // testItem.name = testItem.typeOf;
  // player.addItem(testItem);

  // console.log(player.items);
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



  btnRoll.addEventListener("click", (e) => {
    rollDice();
  });

  btnEndTurn.addEventListener("click", (e) => {
    resetButtons();
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
    player.stamina = 100;
    localStorage.setItem('player', JSON.stringify(player));
    window.location.href = 'game.html';
  });


//   btnAddStamina.addEventListener("click", (e) => {
//     boonArray["Stamina Potion"].applyEffects(player);
//     stamina.innerHTML = "Stamina: " + player.stamina;
//   });
//   btnAddCurrency.addEventListener("click", (e) => {
//     boonArray["MONEY!"].applyEffects(player);
//     currency.innerHTML = "Currency: " + player.currency;
//     boonCollection.innerHTML += "<div id=\"boon\"><img src=\"../../src/media/boon_chaosEmerald.png\"><span class=\"tooltip\">" + boonArray["MONEY!"].description + "</span></div>";
//     // boonCollection.innerHTML += "<img src='../../src/media/boon_chaosEmerald.png' + title=\"" + boonArray["MONEY!"].description + "\">";
//   });
//   btnEstusFlask.addEventListener("click", (e) => {
//     boonArray["estusFlask"].applyEffects(player);
//     boonCollection.innerHTML += "<div id=\"boon\"><img src=\"../../src/media/boon_estusFlask.png\"><span class=\"tooltip\">" + boonArray["estusFlask"].description + "</span></div>";
//     console.log("Has Estus Flask: " + player.estusFlask);
//   });

  var dieButtons = document.querySelectorAll('.die-btn');
  dieButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      this.classList.toggle('selected');
    });
  });


  function rollResult(total, selectedDice) {

    if (waveHenchmen[0].threshold <= total) {
      waveHenchmen[0].health += waveHenchmen[0].healingFactor;

      gameLog.innerHTML += "Healing for: " + waveHenchmen[0].healingFactor + "<br><br>";

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
        // dieBtn.style.color = "green";
        // dieBtn.style.textShadow = "2px 2px 0px black";
        dieBtn.classList.add("success");
      });

      health.innerHTML = waveHenchmen[0].health + "/" + waveHenchmen[0].maxHealth;
      if ((waveHenchmen[0].health / waveHenchmen[0].maxHealth) >= 1) {
        healthBar.style.width = '100%';
      } else {
        healthBar.style.width = `${Math.ceil((waveHenchmen[0].health / waveHenchmen[0].maxHealth) * 100)}%`;
      }
    } else {
      selectedDice.forEach(function(dieBtn) {
        // dieBtn.style.color = "red";
        // dieBtn.style.textShadow = "2px 2px 0px black";
        dieBtn.classList.add("failure");
      });
    }

    if (waveHenchmen[0].henchmenFull() || 
    // Tetris Piece
    (player.boonArray['tetrisPiece'] && (Math.abs((waveHenchmen[0].maxHealth - waveHenchmen[0].health) / waveHenchmen[0].maxHealth) * 100) <= 5)) {

//#region [gloves]
if (player.boonArray['gloves'] && waveHenchmen[0].maxHealth < waveHenchmen[0].health) {
  let restoreStamina = player.boonArray['gloves'].effects.staminaRestore * (waveHenchmen[0].health - waveHenchmen[0].maxHealth);
  restoreStamina = Math.round(restoreStamina);
  player.stamina += restoreStamina;

  gameLog.innerHTML += "<br>Stamina recovered by Gloves: " + restoreStamina + "<br><br>";
}
//#endregion

      player.score += waveHenchmen[0].scoreGiven;

//#region [elderScroll]
      if (player.boonArray['elderScroll']) {
        player.currency += player.boonArray['elderScroll'].effects.goldBonus;
      }
//#endregion

      player.currency += waveHenchmen[0].currencyGiven;
      player.stamina += 30;
      if (waveHenchmen.length > 1) {
        waveHenchmen.shift();
        gameLog.innerHTML += `${waveHenchmen.length} henchmen left!<br><br>`;
        
        updateHenchmen();
        stamina.innerHTML = "Stamina: " + player.stamina;
        score.innerHTML = "Score: " + player.score;
        currency.innerHTML = "Money: " + player.currency;
      } else {
        // Wave is finished, update wave and go to shop
        // TODO allow selection of shop, workshop, or stamina regain
        player.wave += 1;
        directoryCont.style.display = 'block';
      }
    }
  }

  function rollDice() {
    var selectedDice = document.querySelectorAll('.die-btn.selected');

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

    gameLog.innerHTML += results.join('<br>') + "<br>Total: " + totalResult + "<br><br>";
    
    // Disable selected die buttons after rolling
    selectedDice.forEach(function(dieBtn) {
      dieBtn.classList.remove('selected');
      dieBtn.disabled = true;
    });
    
    rollResult(totalResult, selectedDice);
  }

  function resetButtons() {
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
      buttons[i].classList.remove("success", "failure");
    }

    if (!waveHenchmen[0].henchmenFull()) {

      let staminaLost = waveHenchmen[0].staminaPenalty;

//#region [crowbar]
      if (player.boonArray['crowbar'] && player.boonArray['crowbar'].effects.staminaLost < staminaLost) {
        staminaLost = player.boonArray['crowbar'].effects.staminaLost;
      }
//#endregion

      player.stamina -= staminaLost;
      stamina.innerHTML = "Stamina: " + player.stamina;
    }
//#region [estusFlask]
    if (player.boonArray['estusFlask']) {
      player.boonArray['estusFlask'].effects.bonusActive = true;
      // console.log("rollBonus: " + rollBonus);
    }
//#endregion
  }

  // function allDisabled() {
  //   var buttons = document.querySelectorAll('.die-btn');
  //   let result = true;
  //   buttons.forEach(function (button) {
  //     // console.log(button.disabled);
  //     if (!button.disabled) {
  //       result = false; // a #notdisabledbutton was detected
  //     }
  //   });
  //   return result; // all dice used
  // }

  function populateBoons() {
    // for (var i = 0; i < player.boonArray.length; i++) {
      for (let key in player.boonArray) {
        if (player.boonArray.hasOwnProperty(key)) {

        

        let newImgTag = document.createElement('img');
        // newImgTag.src = `../../${player.boonArray[i].filePath}`;
        newImgTag.src = `../../${player.boonArray[key].filePath}`;
        newImgTag.classList.add("boon");

        let newSpanTag = document.createElement('span');
        // newSpanTag.innerHTML = player.boonArray[i].description;
        newSpanTag.innerHTML = player.boonArray[key].description;
        newSpanTag.classList.add("tooltip");

        collectibleEffects.appendChild(newImgTag);
        newImgTag.insertAdjacentElement('afterend', newSpanTag);
        // newImgTag.appendChild(newSpanTag);
        // console.log(newImgTag);

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
    // }
    // console.log(player.boonArray.length);
  }
});