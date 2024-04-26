import { Henchmen } from "./Henchman.js";
import { Player } from "./Player.js";
import { Boon } from "./Boon.js";
import { boonArray } from "./Boon.js";

// let staminaValue = 60;
// let scoreValue = 0;
// let currencyValue = 0;
let rollBonus = false;
let wave = 0;
let henchman = new Henchmen("Goomba " + wave, wave);
let player = new Player();

document.addEventListener('DOMContentLoaded', function() {
  console.log("Has Estus Flask: " + player.estusFlask);

  const boonCollection = document.querySelector('#boonCollection');

  const btnRoll = document.querySelector('#btnRoll');
  const btnReset = document.querySelector('#btnReset');

  const btnAddStamina = document.querySelector('#btnAddStamina');
  const btnAddCurrency = document.querySelector('#btnAddCurrency');
  const btnEstusFlask = document.querySelector('#btnEstusFlask');

  const henchName = document.querySelector('#henchName');
  const health = document.querySelector('#health');
  const maxHealth = document.querySelector('#maxHealth');
  const damage = document.querySelector('#damage');
  const threshold = document.querySelector('#threshold');
  const staminaPenalty = document.querySelector('#staminaPenalty');
  const healingFactor = document.querySelector('#healingFactor');
  const currencyGiven = document.querySelector('#currencyGiven');

  const stamina = document.querySelector('#stamina');
  const score = document.querySelector('#score');
  const currency = document.querySelector('#currency');

  stamina.innerHTML = "Stamina: " + player.stamina;
  score.innerHTML = "Score: " + player.score;
  currency.innerHTML = "Currency: " + player.currency;
  // stamina.innerHTML = "Stamina: " + staminaValue;
  // score.innerHTML = "Score: " + scoreValue;
  // currency.innerHTML = "Currency: " + currencyValue;

  henchName.innerHTML = "Name: " + henchman.name;
  health.innerHTML = "Health: " + henchman.health + "/" + henchman.maxHealth;
  threshold.innerHTML = "Threshold: " + henchman.threshold;
  staminaPenalty.innerHTML = "Stamina Penalty: " + henchman.staminaPenalty;
  healingFactor.innerHTML = "Healing Factor: " + henchman.healingFactor;
  currencyGiven.innerHTML = "Currency Given: " + henchman.currencyGiven;

  btnRoll.addEventListener("click", (e) => {
    rollDice();
  });
  btnReset.addEventListener("click", (e) => {
    resetButtons();
  });
  btnAddStamina.addEventListener("click", (e) => {
    boonArray["Stamina Potion"].applyEffects(player);
    stamina.innerHTML = "Stamina: " + player.stamina;
  });
  btnAddCurrency.addEventListener("click", (e) => {
    boonArray["MONEY!"].applyEffects(player);
    currency.innerHTML = "Currency: " + player.currency;
    boonCollection.innerHTML += "<div id=\"boon\"><img src=\"../../src/media/boon_chaosEmerald.png\"><span class=\"tooltip\">" + boonArray["MONEY!"].description + "</span></div>";
    // boonCollection.innerHTML += "<img src='../../src/media/boon_chaosEmerald.png' + title=\"" + boonArray["MONEY!"].description + "\">";
  });
  btnEstusFlask.addEventListener("click", (e) => {
    boonArray["estusFlask"].applyEffects(player);
    boonCollection.innerHTML += "<div id=\"boon\"><img src=\"../../src/media/boon_estusFlask.png\"><span class=\"tooltip\">" + boonArray["estusFlask"].description + "</span></div>";
    console.log("Has Estus Flask: " + player.estusFlask);
  });

  var dieButtons = document.querySelectorAll('.die-btn');
  dieButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
          this.classList.toggle('selected');
      });
  });
});

function rollResult(total) {

  if (henchman.threshold <= total) {
    henchman.health += henchman.healingFactor;

    health.innerHTML = "Health: " + henchman.health + "/" + henchman.maxHealth;
  }

  if (henchman.henchmenFull()) {

    const buttons = document.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = false;
    }

    scoreValue += henchman.scoreGiven;
    currencyValue += henchman.currencyGiven;
    wave++;
    staminaValue += 30;
    henchman = new Henchmen("Goomba " + wave, wave);
    henchName.innerHTML = "Name: " + henchman.name;
    health.innerHTML = "Health: " + henchman.health + "/" + henchman.maxHealth;
    threshold.innerHTML = "Threshold: " + henchman.threshold;
    staminaPenalty.innerHTML = "Stamina Penalty: " + henchman.staminaPenalty;
    healingFactor.innerHTML = "Healing Factor: " + henchman.healingFactor;
    stamina.innerHTML = "Stamina: " + player.stamina;
    score.innerHTML = "Score: " + player.score;
    currency.innerHTML = "Currency: " + player.currency;
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
      var numFaces = parseInt(btn.dataset.faces);
      var result = Math.floor(Math.random() * numFaces) + 1;
      totalResult += result;
      results.push("You rolled a " + result + " on a " + numFaces + "-sided die.");
  });

  if (rollBonus) {
    rollBonus = false;
    totalResult += player.estusFlask;
    results.push("+3 from Estus Flask");
    console.log("rollBonus: " + rollBonus);
  }

  document.getElementById('result').innerText = results.join('\n') + "\nTotal: " + totalResult;

  // Disable selected die buttons after rolling
  selectedDie.forEach(function(btn) {
      btn.classList.remove('selected');
      btn.disabled = true;
  });

  rollResult(totalResult);
}

function resetButtons() {
  const buttons = document.querySelectorAll('button');
  for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = false;
  }
  document.querySelector('#result').innerText = "";

  if (!henchman.henchmenFull()) {
      player.stamina -= henchman.staminaPenalty;
      stamina.innerHTML = "Stamina: " + player.stamina;
  }
  if (player.estusFlask) {
    rollBonus = true;
    console.log("rollBonus: " + rollBonus);
  }
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