import { Player } from "./Player.js";
import { Boon } from "./Boon.js";
import { boonArray } from "./Boon.js";
import { Game } from "./Game.js";
import { Dice } from "./Dice.js";

let currency = 50;
let currencyRemaining = document.querySelector('#currencyRemaining');

// Get form
let gameSettingsForm = document.querySelector("#gameSettings");

// Select dice buy inputs
let diceBuys = document.querySelectorAll('input[type="number"]');

let costSpans = document.querySelectorAll('.costSpan');
let maxSpans = document.querySelectorAll('.maxSpan');

// Store counts of how many of each dice
let diceCount = {
  d4: 0,
  d6: 0,
  d8: 0,
  d10: 0,
  d12: 0,
  d20: 0
}

let costs = {
  d4: 10,
  d6: 14, 
  d8: 16,
  d10: 18,
  d12: 20,
  d20: 24
}

let maxes = {
  d4: 4,
  d6: 4, 
  d8: 3,
  d10: 3,
  d12: 2,
  d20: 1
}

gameSettingsForm.addEventListener("submit", function(event) {
  
  // Prevent redirect
  event.preventDefault();
  
  // get form data
  let formData = new FormData(gameSettingsForm);

  let difficulty = formData.get('difficulty');
  let startBoon = formData.get('startBoon');

  // Create new objects
  let game = new Game(difficulty);
  
  let player = new Player();
  player.currency = currency;

  // Total of all dice the player gets
  let totalDice = 0;

  // Add dice
  for (let diceType in diceCount) {
    if (diceCount.hasOwnProperty(diceType)) {
      for (let i = 0; i < diceCount[diceType]; i++) {
        player.addDice(new Dice(diceType))
        totalDice++;
      }
    }
  }

  // Add boon
  switch (startBoon) {
    case "psychology":
      player.addBoon(boonArray['companionCube']); 
    break;
    case "optometry":
      player.addBoon(boonArray['goggles']); 
    break;
    case "trauma":
      player.addBoon(boonArray['pickaxe']); 
    break;
    case "radiology":
      player.addBoon(boonArray['portalGun']); 
    break;
    case "surgeon":
      player.addBoon(boonArray['mushroom']); 
    break;
    case "cosmetic":
      player.addBoon(boonArray['medicalBag']); 
    break;
  }

  // - Save all objects for transfer between pages
  localStorage.setItem('player', JSON.stringify(player));

  localStorage.setItem('game', JSON.stringify(game));

  
  
  // - Redirect user if they have more than one or zero dice
  if (totalDice < 2) {
    alert("Please select two or more dice before proceeding!");
  } else {
    window.location.href = "game.html";
  }
  // How to redirect someone
});

// function to update currency. Returns true if change is possible without going negative
// returns false if currency would go negative, which event listeners will use to revert change
function updateCurrency() {
  currency = 50;

  currency -= costs['d4'] * diceCount['d4']; 
  currency -= costs['d6'] * diceCount['d6']; 
  currency -= costs['d8'] * diceCount['d8']; 
  currency -= costs['d10'] * diceCount['d10']; 
  currency -= costs['d12'] * diceCount['d12']; 
  currency -= costs['d20'] * diceCount['d20']; 

  if (currency >= 0) {
    currencyRemaining.textContent = currency;
    return true;
  } else {
    return false;
  }
}


// Add event listeners to watch for changes to their values
diceBuys.forEach(function(diceBuy) {
  diceBuy.value = 0;

  diceBuy.addEventListener('input', function() {

    let newValue = diceBuy.value;

    let oldValue = 0;

    let typeOf = diceBuy.getAttribute('data-info');

    diceBuy.max = maxes[typeOf + "s"];

    switch (typeOf) {
      case "d4":
        oldValue = diceCount['d4'];
        diceCount['d4'] = newValue;
      break;
      case "d6":
        oldValue = diceCount['d6'];
        diceCount['d6'] = newValue;
      break;
      case "d8":
        oldValue = diceCount['d8'];
        diceCount['d8'] = newValue;
      break;
      case "d10":
        oldValue = diceCount['d10'];
        diceCount['d10'] = newValue;
      break;
      case "d12":
        oldValue = diceCount['d12'];
        diceCount['d12'] = newValue;
      break;
      case "d20":
        oldValue = diceCount['d20'];
        diceCount['d20'] = newValue;
      break;
    } 

    if (!updateCurrency()) {
      // if the change will bring totals negative, change it back
      switch (typeOf) {
        case "d4":
          diceCount['d4'] = oldValue;
          diceBuy.value = oldValue;
        break;
        case "d6":
          diceCount['d6'] = oldValue;
          diceBuy.value = oldValue;
        break;
        case "d8":
          diceCount['d8'] = oldValue;
          diceBuy.value = oldValue;
        break;
        case "d10":
          diceCount['d10'] = oldValue;
          diceBuy.value = oldValue;
        break;
        case "d12":
          diceCount['d12'] = oldValue;
          diceBuy.value = oldValue;
        break;
        case "d20":
          diceCount['d20'] = oldValue;
          diceBuy.value = oldValue;
        break;
      } 
    }
  });
});

costSpans.forEach(function(costSpan) {
  switch (costSpan.id) {
    case "d4Cost":
      costSpan.innerHTML = costs["d4"];
    break;
    case "d6Cost":
      costSpan.innerHTML = costs["d6"];
    break;
    case "d8Cost":
      costSpan.innerHTML = costs["d8"];
    break;
    case "d10Cost":
      costSpan.innerHTML = costs["d10"];
    break;
    case "d12Cost":
      costSpan.innerHTML = costs["d12"];
    break;
    case "d20Cost":
      costSpan.innerHTML = costs["d20"];
    break;
  }
});

maxSpans.forEach(function(maxSpan) {
  switch (maxSpan.id) {
    case "d4Max":
      maxSpan.innerHTML = maxes["d4"];
    break;
    case "d6Max":
      maxSpan.innerHTML = maxes["d6"];
    break;
    case "d8Max":
      maxSpan.innerHTML = maxes["d8"];
    break;
    case "d10Max":
      maxSpan.innerHTML = maxes["d10"];
    break;
    case "d12Max":
      maxSpan.innerHTML = maxes["d12"];
    break;
    case "d20Max":
      maxSpan.innerHTML = maxes["d20"];
    break;
  }
});