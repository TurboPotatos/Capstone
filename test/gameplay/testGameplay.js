import { Henchmen } from "../../src/js/Henchman.js";
import { Player } from "../../src/js/Player.js";
import { Boon } from "../../src/js/Boon.js";
import { boonArray } from "../../src/js/Boon.js";
import { Dice } from "../../src/js/Dice.js";


let storedPlayer = JSON.parse(localStorage.getItem('player'));

let rollBonus = false;
let wave = 0;
let henchman = new Henchmen("Goomba " + wave, wave);
storedPlayer = new Player(storedPlayer);

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


// storedPlayer.addDice(tempDice);


document.addEventListener('DOMContentLoaded', function() {
//   console.log("Has Estus Flask: " + player.estusFlask);

//   const boonCollection = document.querySelector('#boonCollection');
  const collectibleEffects = document.querySelector('#collectibleEffects');

  const btnRoll = document.querySelector('#rollDiceBtn');
  const btnEndTurn = document.querySelector('#endTurnBtn');
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
  console.log("boons");

  // Add dice to the diceArea
  for (let i = 0; i < storedPlayer.diceArray.length; i++) {
    diceArea.innerHTML += `<button id="dice${i}"class="die-btn ${storedPlayer.diceArray[i].typeOf}">${storedPlayer.diceArray[i].typeOf}</button>`;
  }

  stamina.innerHTML = "Stamina: " + storedPlayer.stamina;
  score.innerHTML = "Score: " + storedPlayer.score;
  currency.innerHTML = "Money: " + storedPlayer.currency;

  // henchName.innerHTML = henchman.name;
  health.innerHTML = henchman.health + "/" + henchman.maxHealth;
  healthBar.style.width = `${Math.ceil((henchman.health / henchman.maxHealth) * 100)}%`; 

  threshold.innerHTML = "Threshold: " + henchman.threshold;
  staminaPenalty.innerHTML = "Stamina Penalty: " + henchman.staminaPenalty;
  healingFactor.innerHTML = "Healing Factor: " + henchman.healingFactor;
//   currencyGiven.innerHTML = "Currency Given: " + henchman.currencyGiven;

  btnRoll.addEventListener("click", (e) => {
    rollDice();
  });

  btnEndTurn.addEventListener("click", (e) => {
    resetButtons();
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


  function rollResult(total, selectedDie) {

    if (henchman.threshold <= total) {
      henchman.health += henchman.healingFactor;

      selectedDie.forEach(function(btn) {
        // btn.style.color = "green";
        // btn.style.textShadow = "2px 2px 0px black";
        btn.classList.add("success");
      });

      health.innerHTML = henchman.health + "/" + henchman.maxHealth;
      if ((henchman.health / henchman.maxHealth) >= 1) {
        healthBar.style.width = '100%';
      } else {
        healthBar.style.width = `${Math.ceil((henchman.health / henchman.maxHealth) * 100)}%`; 
      }
    } else {
      selectedDie.forEach(function(btn) {
        // btn.style.color = "red";
        // btn.style.textShadow = "2px 2px 0px black";
        btn.classList.add("failure");
      });
    }

    if (henchman.henchmenFull()) {

      storedPlayer.score += henchman.scoreGiven;
      storedPlayer.currency += henchman.currencyGiven;
      wave++;
      storedPlayer.stamina += 30;
      henchman = new Henchmen("Goomba " + wave, wave);
      healthBar.style.width = `${Math.ceil((henchman.health / henchman.maxHealth) * 100)}%`; 
      health.innerHTML = henchman.health + "/" + henchman.maxHealth;
      henchName.innerHTML = henchman.name;
      threshold.innerHTML = "Threshold: " + henchman.threshold;
      staminaPenalty.innerHTML = "Stamina Penalty: " + henchman.staminaPenalty;
      healingFactor.innerHTML = "Healing Factor: " + henchman.healingFactor;
      stamina.innerHTML = "Stamina: " + storedPlayer.stamina;
      score.innerHTML = "Score: " + storedPlayer.score;
      currency.innerHTML = "Money: " + storedPlayer.currency;
    }
  }

  function rollDice() {
    var selectedDie = document.querySelectorAll('.die-btn.selected');
    if (selectedDie.length === 0) {
      alert("Please select at least one die to roll.");
      return;
    }

    var totalResult = 0;
    var results = [];
    selectedDie.forEach(function(btn) {

      console.log("storedPlayer: ");
      console.log(storedPlayer.diceArray[parseInt(btn.id.substring(4))]);
      console.log("player: ");
      //console.log(player.diceArray[parseInt(btn.id.substring(4))]);

        var dice = storedPlayer.diceArray[parseInt(btn.id.substring(4))];


        var result = dice.roll();
        totalResult += result;
        results.push("You rolled a " + result + " on a " + dice.sides.length + "-sided die.");
        btn.innerHTML = result;
    });

    // if (rollBonus) {
    //   rollBonus = false;
    //   totalResult += player.estusFlask;
    //   results.push("+3 from Estus Flask");
    //   console.log("rollBonus: " + rollBonus);
    // }

    gameLog.innerHTML += results.join('<br>') + "<br>Total: " + totalResult + "<br><br>";
    
    // Disable selected die buttons after rolling
    selectedDie.forEach(function(btn) {
      btn.classList.remove('selected');
      btn.disabled = true;
    });
    
    rollResult(totalResult, selectedDie);
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
      storedPlayer.stamina -= henchman.staminaPenalty;
      stamina.innerHTML = "Stamina: " + storedPlayer.stamina;
    }
    // if (player.estusFlask) {
    //   rollBonus = true;
    //   console.log("rollBonus: " + rollBonus);
    // }
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
    for (var i = 0; i < storedPlayer.boonArray.length; i++) {

      let newImgTag = document.createElement('img');
      newImgTag.src = `../../${storedPlayer.boonArray[i].filePath}`;
      newImgTag.classList.add("boon");

      let newSpanTag = document.createElement('span');
      newSpanTag.innerHTML = storedPlayer.boonArray[i].description;
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
    // console.log(storedPlayer.boonArray.length);
  }
});