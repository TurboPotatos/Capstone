import { Henchmen } from "./Henchman.js";
import { Player } from "./Player.js";
import { Boon } from "./Boon.js";
import { boonArray } from "./Boon.js";
import { Dice } from "../../src/js/Dice.js";


let rollBonus = false;
let wave = 0;
let henchman = new Henchmen("Goomba " + wave, wave);
let player = new Player();

let tempDice = new Dice("d4");
player.addDice(tempDice);
tempDice = new Dice("d6");
player.addDice(tempDice);
tempDice = new Dice("d8");
player.addDice(tempDice);
tempDice = new Dice("d10");
player.addDice(tempDice);
tempDice = new Dice("d12");
player.addDice(tempDice);
tempDice = new Dice("d20");
player.addDice(tempDice);

document.addEventListener('DOMContentLoaded', function() {
//   console.log("Has Estus Flask: " + player.estusFlask);

//   const boonCollection = document.querySelector('#boonCollection');

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
//   currencyGiven.innerHTML = "Currency Given: " + henchman.currencyGiven;

  btnRoll.addEventListener("click", (e) => {
    rollDice();
  });

  console.log(btnEndTurn);

  btnEndTurn.addEventListener("click", (e) => {
    console.log("test")
    // resetButtons();
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


  function rollResult(total) {

    if (henchman.threshold <= total) {
      henchman.health += henchman.healingFactor;

      health.innerHTML = henchman.health + "/" + henchman.maxHealth;
    }

    if (henchman.henchmenFull()) {

      // const buttons = document.querySelectorAll('button');
      // for (var i = 0; i < buttons.length; i++) {
      //   buttons[i].disabled = false;
      // }


      player.score += henchman.scoreGiven;
      player.currency += henchman.currencyGiven;
      wave++;
      player.stamina += 30;
      henchman = new Henchmen("Goomba " + wave, wave);
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
    var selectedDie = document.querySelectorAll('.die-btn.selected');
    if (selectedDie.length === 0) {
      alert("Please select at least one die to roll.");
      return;
    }

    var totalResult = 0;
    var results = [];
    selectedDie.forEach(function(btn) {
        var dice = player.diceArray[parseInt(btn.id.substring(4))];
        var result = dice.roll();
        totalResult += result;
        results.push("You rolled a " + result + " on a " + dice.sides.length + "-sided die.");
    });

    // if (rollBonus) {
    //   rollBonus = false;
    //   totalResult += player.estusFlask;
    //   results.push("+3 from Estus Flask");
    //   console.log("rollBonus: " + rollBonus);
    // }

    gameLog.innerHTML += results.join('<br>') + "<br>Total: " + totalResult;

    // Disable selected die buttons after rolling
    selectedDie.forEach(function(btn) {
        btn.classList.remove('selected');
        btn.disabled = true;
    });

    rollResult(totalResult);
  }

  function resetButtons() {
    console.log("test");
    const buttons = document.querySelectorAll('.die-btn');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = false;
    }

    if (!henchman.henchmenFull()) {
      player.stamina -= henchman.staminaPenalty;
      stamina.innerHTML = "Stamina: " + player.stamina;
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
});