import { Henchmen } from "./Henchman.js";
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
let wave = 0;
let henchman = new Henchmen(document.querySelector('#henchName').innerHTML, wave);

//#region [mushroom]
if (player.boonArray['mushroom']) {
  henchman.health += player.boonArray['mushroom'].effects.bonusHealth;
}
//#endregion



// console.log(player.boonArray);

// let tempDice = new Dice("d4");
// player.addDice(tempDice);
// tempDice = new Dice("d6");
// player.addDice(tempDice);
// tempDice = new Dice("d8");
// player.addDice(tempDice);
// tempDice = new Dice("d10");
// player.addDice(tempDice);
// tempDice = new Dice("d12");
// player.addDice(tempDice);
// tempDice = new Dice("d20");
// player.addDice(tempDice);

// player.addBoon(boonArray['companionCube']);


// player.addDice(tempDice);


document.addEventListener('DOMContentLoaded', function() {
//   console.log("Has Estus Flask: " + player.estusFlask);

//   const boonCollection = document.querySelector('#boonCollection');
  const collectibleEffects = document.querySelector('#collectibleEffects');

  const btnRoll = document.querySelector('#rollDiceBtn');
  const btnEndTurn = document.querySelector('#endTurnBtn');
  const btnGoShop = document.querySelector('#goShopBtn');
  const btnGoWorkshop = document.querySelector('#goWorkshopBtn');
  const gameLog = document.querySelector("#logText");

  const henchName = document.querySelector('#henchName');
  const health = document.querySelector('#health');
  const healthBar = document.querySelector('#henchmenHealth2');
//   const damage = document.querySelector('#damage');
  const threshold = document.querySelector('#threshold');
  const staminaPenalty = document.querySelector('#staminaPenalty');
  const healingFactor = document.querySelector('#healingFactor');
//   const currencyGiven = document.querySelector('#currencyGiven');

  const stamina = document.querySelector('#stamina');
  const score = document.querySelector('#score');
  const currency = document.querySelector('#money');

  const diceArea = document.querySelector("#diceArea");
  
  populateBoons();
  // console.log("boons");

  // Add dice to the diceArea
  for (let i = 0; i < player.diceArray.length; i++) {
    diceArea.innerHTML += `<button id="dice${i}"class="die-btn ${player.diceArray[i].typeOf}">${player.diceArray[i].typeOf}</button>`;
  }

  stamina.innerHTML = "Stamina: " + player.stamina;
  score.innerHTML = "Score: " + player.score;
  currency.innerHTML = "Money: " + player.currency;

  henchName.innerHTML = henchman.name;
  health.innerHTML = henchman.health + "/" + henchman.maxHealth;
  healthBar.style.width = `${Math.ceil((henchman.health / henchman.maxHealth) * 100)}%`; 

  threshold.innerHTML = "Threshold: " + henchman.threshold;
  staminaPenalty.innerHTML = "Stamina Penalty: " + henchman.staminaPenalty;
  healingFactor.innerHTML = "Healing Factor: " + henchman.healingFactor;
  //currencyGiven.innerHTML = "Currency Given: " + henchman.currencyGiven;

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

    if (henchman.threshold <= total) {
      henchman.health += henchman.healingFactor;

      gameLog.innerHTML += "Healing for: " + henchman.healingFactor;

//#region [beamSword]
      if (player.boonArray['beamSword'] && 
      (henchman.threshold * player.boonArray['beamSword'].effects.thresholdFactor) <= total) {
        
        if (Math.random() < player.boonArray['beamSword'].effects.healChance) {
          henchman.health += player.boonArray['beamSword'].effects.healAmount;

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

      health.innerHTML = henchman.health + "/" + henchman.maxHealth;
      if ((henchman.health / henchman.maxHealth) >= 1) {
        healthBar.style.width = '100%';
      } else {
        healthBar.style.width = `${Math.ceil((henchman.health / henchman.maxHealth) * 100)}%`;
      }
    } else {
      selectedDice.forEach(function(dieBtn) {
        // dieBtn.style.color = "red";
        // dieBtn.style.textShadow = "2px 2px 0px black";
        dieBtn.classList.add("failure");
      });
    }

    if (henchman.henchmenFull()) {

//#region [gloves]
if (player.boonArray['gloves'] && henchman.maxHealth < henchman.health) {
  let restoreStamina = player.boonArray['gloves'].effects.staminaRestore * (henchman.health - henchman.maxHealth);
  restoreStamina = Math.round(restoreStamina);
  player.stamina += restoreStamina;

  gameLog.innerHTML += "<br>Stamina recovered by Gloves: " + restoreStamina + "<br><br>";
}
//#endregion

      player.score += henchman.scoreGiven;

//#region [elderScroll]
      if (player.boonArray['elderScroll']) {
        player.currency += player.boonArray['elderScroll'].effects.goldBonus;
      }
//#endregion

      player.currency += henchman.currencyGiven;
      wave++;
      player.stamina += 30;
      henchman = new Henchmen("Goomba " + wave, wave);
      healthBar.style.width = `${Math.ceil((henchman.health / henchman.maxHealth) * 100)}%`; 
      health.innerHTML = henchman.health + "/" + henchman.maxHealth;
      henchName.innerHTML = henchman.name;
      threshold.innerHTML = "Threshold: " + henchman.threshold;
      staminaPenalty.innerHTML = "Stamina Penalty: " + henchman.staminaPenalty;
      healingFactor.innerHTML = "Healing Factor: " + henchman.healingFactor;
      stamina.innerHTML = "Stamina: " + player.stamina;
      score.innerHTML = "Score: " + player.score;
      currency.innerHTML = "Money: " + player.currency;
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

      var dice = player.diceArray[parseInt(dieBtn.id.substring(4))];

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
      buttons[i].disabled = false;
      // buttons[i].style.color = "black";
      // buttons[i].style.textShadow = "none";
      buttons[i].classList.remove("success", "failure");
    }

    if (!henchman.henchmenFull()) {

      let staminaLost = henchman.staminaPenalty;

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