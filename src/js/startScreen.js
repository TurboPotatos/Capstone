import { Player } from "./Player.js";
import { boonArray } from "./Boon.js";
import { Dice } from "./Dice.js";
import { Consumable } from "./Consumable.js";

let currency = 50;
let currencyRemaining = document.querySelector('#currencyRemaining');

// Get form
let gameSettingsForm = document.querySelector("#gameSettings");

let costSpans = document.querySelectorAll('.costSpan');
let maxSpans = document.querySelectorAll('.maxSpan');

let boonSelects = document.querySelectorAll('input[name^="startBoon"]');

let displayBoon = document.querySelector(".displayBoon");

displayBoon.addEventListener("click", () => {
  let tooltip = displayBoon.querySelector('.tooltip')
  if (tooltip.style.display != 'block'){
    tooltip.style.display = 'block';
  } else {
    tooltip.style.display = 'none';
  }
});

boonSelects.forEach((boonOption) => {
  // Let selectedBoon become the selected value, if there is one
  if (boonOption.checked) {
    changeSelectedBoon(boonOption.value);
  }
  // Loop through and add an event listener to change selectedBoon if they are changed
  boonOption.addEventListener('change', () => {
    if (boonOption.checked) {
      changeSelectedBoon(boonOption.value);
    }
  });
});

// Change the selected boon
function changeSelectedBoon(boon) {
  let selectedBoon;

  switch (boon) {
    case "psychology":
      selectedBoon = boonArray['companionCube']; 
    break;
    case "optometry":
      selectedBoon = boonArray['goggles']; 
    break;
    case "trauma":
      selectedBoon = boonArray['diamondPickaxe']; 
    break;
    case "radiology":
      selectedBoon = boonArray['portalGun']; 
    break;
    case "surgeon":
      selectedBoon = boonArray['scalpel']; 
    break;
    case "cosmetic":
      selectedBoon = boonArray['syringe']; 
    break;
  }

  displayBoon.innerHTML = `
  <h3>Selected Boon</h3>
  <img src="../../${selectedBoon.filePath}" class="boon">
    <span class="tooltip">
    ${selectedBoon.description}
    </span>
  `;
}

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
  
  let player = new Player();
  player.currency = currency;
  switch (difficulty) {
    case "Easy":
      player.difficulty = 1;
      break;
    case "Normal":
      player.difficulty = 1.5;
      break;
    case "Hard":
      player.difficulty = 3;
      break;
    case "Impossible":
      player.difficulty = 6;
      break;
    default:
      player.difficulty = 1;
      break;
  }

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
      player.addBoon(boonArray['diamondPickaxe']); 
    break;
    case "radiology":
      player.addBoon(boonArray['portalGun']); 
    break;
    case "surgeon":
      player.addBoon(boonArray['scalpel']); 
    break;
    case "cosmetic":
      player.addBoon(boonArray['syringe']); 
    break;
  }

  // Add a single example supplement
  let consumableValue = Math.floor(Math.random() * 9) + 1;
  player.addItem(new Consumable(consumableValue));

  // - Save all objects for transfer between pages
  localStorage.setItem('player', JSON.stringify(player));

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

document.querySelectorAll('.arrow').forEach(function(arrow) {
  arrow.addEventListener('click', function() {
    var input = this.parentNode.parentNode.querySelector('.number-input');
    let typeOf = input.getAttribute('data-info');
    var value = parseFloat(input.value);
    if (this.classList.contains('up')) {
      if (value + 1 <= maxes[typeOf]) {
        value += 1;
        diceCount[typeOf] = value;
        if (!updateCurrency()) { // revert changes
          value -= 1
          diceCount[typeOf] = value;
        }
      }
    } else {
      if (value - 1 >= 0) {
        value -= 1;
        diceCount[typeOf] = value;
        if (!updateCurrency()) { // revert changes
          value += 1
          diceCount[typeOf] = value;
        }
      }
    }
    input.value = value;
  });
});

const diceBox = document.querySelector('#diceBox');
const backBtn = document.querySelector("#backBtn");
const buyDice = document.querySelector("#buyDice");

backBtn.addEventListener("click", (e) => {
  diceBox.style.display = "none";
});

buyDice.addEventListener("click", (e) => {
  diceBox.style.display = "block";
});