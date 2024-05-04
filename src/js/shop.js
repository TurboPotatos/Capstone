import { Player } from "./Player.js";
import { Boon } from "./Boon.js";
import { boonArray } from "./Boon.js";
import { boonNameArray } from "./Boon.js";
import { Dice } from "./Dice.js";

// let player = new Player();
const player = new Player(JSON.parse(localStorage.getItem('player')));

let activeBoon = new Boon("", "", "", "");

const shopContent = document.querySelectorAll('.slot');
document.querySelector("#currentCurrency").innerHTML = player.currency;

let coffeeMachine = document.querySelector(".coffeeMachine")
let coffeeTooltip = coffeeMachine.querySelector(".tooltip");

// player.addBoon(boonArray['crowbar']);

let bannedArray = [];
// for (let i = 0; i < player.boonArray.length; i++) {
//   bannedArray.push(player.boonArray[i]);
// }
bannedArray.push(boonArray['cuppaJoe']);
for (let key in player.boonArray) {
  if (player.boonArray.hasOwnProperty(key) && key != 'cuppaJoe') {
    let newBoon = boonArray[player.boonArray[key].name];
    bannedArray.push(newBoon);
  }
}

shopContent.forEach(shopItem => {
  // Get random boon
  
  let boon = "";
  let fullyPopulated = false;

  while (boon === "" && !fullyPopulated) { // Use equality operator '===' to compare
    let randBoon = Math.floor(Math.random() * boonNameArray.length);
    let tempBoon = boonArray[boonNameArray[randBoon]];

    if (!bannedArray.includes(tempBoon)) {
      bannedArray.push(tempBoon);
      boon = tempBoon;
    }

    if (bannedArray.length === boonNameArray.length) {
      fullyPopulated = true;
    }
  }
  

  // Set shop HTML to match boon

  shopItem.innerHTML = `
  <img src="../../${boon.filePath}" class="boon">
    <span class="tooltip">
    ${boon.description}
      <span class='cost'>
        Cost: ${Math.round(10*(.5 * player.boonArrayLength) * player.difficulty)}
      </span>
    </span>
    `;
    
  shopItem.id = boon.name;

  shopItem.addEventListener("click", function() {
    activeBoon = boonArray[shopItem.id];

    let tooltip = shopItem.querySelector(".tooltip");
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

});


document.querySelector("#playerInfo").addEventListener("click", function() {
  console.log(player.boonArray);
  console.log(player.currency);
});

// This currently works by replicating the boon used to populate the shopItem div. In order to correctly 
// serve the player the correct item, the id is used to make a new one to give to the player. 
// However, we'll need to refactor the contructor to allow for variable costed boons

document.querySelector("#buyItem").addEventListener("click", function() {
  if (activeBoon.name != "") {
    if (activeBoon.name != "cuppaJoe") {
      // NOT buying coffee, use other cost calculation
      if (player.subtractCurrency(Math.round(10*(.5 * player.boonArrayLength) * player.difficulty))) {
        document.querySelector("#currentCurrency").innerHTML = player.currency;
        player.addBoon(activeBoon);
        let selected = document.querySelector(`#${activeBoon.name}`);
        if (selected) {
          selected.style.opacity = 0;
          selected.id = ``;
        } 
      }
    } else {
      let coffeeCost = 0;
      if (player.boonArray['cuppaJoe']){
        coffeeCost = calculatePrice(player.wave, player.boonArray['cuppaJoe'].length, player.difficulty, 10);
      } else {
        coffeeCost = calculatePrice(player.wave, 0, player.difficulty, 10);
      }
      if (player.subtractCurrency(coffeeCost)) {
        coffeeTooltip.style.display = 'none';
        coffeeTooltip.querySelector('.cost').innerHTML = `Cost: ${coffeeCost}`;
        document.querySelector("#currentCurrency").innerHTML = player.currency;
        player.addBoon(activeBoon);
      }
    }
    activeBoon = new Boon("", "", "", "");

    // Update tooltip costs
    shopContent.forEach(shopItem => {
      shopItem.querySelector('.cost').innerHTML = `Cost: ${Math.round(10*(.5 * player.boonArrayLength) * player.difficulty)}`;
    });
  }
});

document.querySelector("#addMoneys").addEventListener("click", function() {
  player.currency += 10;
  document.querySelector("#currentCurrency").innerHTML = player.currency;
});

//#region [Coffee Machine]


coffeeMachine.addEventListener("click", function() {
  activeBoon = boonArray['cuppaJoe'];

  let coffeeCost = 0;
  if (player.boonArray['cuppaJoe']){
    coffeeCost = calculatePrice(player.wave, player.boonArray['cuppaJoe'].length, player.difficulty, 10);
  } else {
    coffeeCost = calculatePrice(player.wave, 0, player.difficulty, 10);
  }

  coffeeTooltip.innerHTML = `
  ${activeBoon.name} <br><br> 
  ${activeBoon.description}<br>
  <span class='cost'>Cost: ${coffeeCost}</span>`;

  let alreadyDisplayed = (coffeeTooltip.style.display == "block");

  let allTooltips = document.querySelectorAll('.tooltip');
  allTooltips.forEach(tip => {
    tip.style.display = "none";
  });

  if (alreadyDisplayed) {
    coffeeTooltip.style.display = 'none';
  } else {
    coffeeTooltip.style.display = 'block';
  }
   
});
//#endregion

//#region [Dice Machine]
const diceMachine = document.querySelector('#diceMachine');
const backBtn = document.querySelector('#backBtn');
const colorBox = document.querySelector('#diceBox');
const buyDice = document.querySelector('#buyDice');
colorBox.style.display = "none";

diceMachine.addEventListener("click", (e) => {
  colorBox.style.display = "block";
});

backBtn.addEventListener("click", (e) => {
  colorBox.style.display = "none";
});

buyDice.addEventListener("click", (e) => {
  // check if the player has enough funds
  // TODO change hard coded cost 
  if (player.subtractCurrency(15)) {
    let diceOptions = document.querySelector("#diceOptions");
    
    // Generate three dice. One they will choose to keep permanently, the others are consumable
    function generateRandomDice() {
      let value = Math.ceil(Math.random() * 6);

      switch (value) {
        case 1:
          return new Dice("d4");
        case 2:
          return new Dice("d6");
        case 3:
          return new Dice("d8");
        case 4:
          return new Dice("d10");
        case 5:
          return new Dice("d12");
        case 6:
          return new Dice("d20");
        default: 
          return new Dice("d6"); 
      }
    }

    let diceChoice = {
      choiceOne: generateRandomDice(),
      choiceTwo: generateRandomDice(),
      choiceThree: generateRandomDice()
    };


    // Add a div option for each of them
    diceOptions.innerHTML = "<h2>Choose a dice to keep permanently. Others will be kept as consumables.</h2><br>";
    diceOptions.innerHTML += `<button id="choiceOne"class="die-option ${diceChoice['choiceOne'].typeOf}">${diceChoice['choiceOne'].typeOf}</button>`;
    diceOptions.innerHTML += `<button id="choiceTwo"class="die-option ${diceChoice['choiceTwo'].typeOf}">${diceChoice['choiceTwo'].typeOf}</button>`;
    diceOptions.innerHTML += `<button id="choiceThree"class="die-option ${diceChoice['choiceThree'].typeOf}">${diceChoice['choiceThree'].typeOf}</button>`;

    // Add event listeners to each of the dice
    document.querySelectorAll(".die-option").forEach((option) => {
      option.addEventListener("click", () => {
        // Add this specific dice to the player
        player.addDice(diceChoice[option.id]);
        delete diceChoice[option.id];
        
        // Add other dice as consumables
        for (let key in diceChoice) {
          if (diceChoice.hasOwnProperty(key)) {
            // console.log(diceChoice[key]);
            diceChoice[key].name = diceChoice[key].typeOf;
            player.addItem(diceChoice[key]);
          }
        }

        diceOptions.innerHTML = "";
        backBtn.click();
      });
    })

  } else {
    diceOptions.innerHTML = "<h2 style=\"color: red\">You don't have enough funds!</h2>";
  }
});
//#endregion

const returnToGameBtn = document.querySelector('#returnToGameBtn');
returnToGameBtn.addEventListener("click", (e) => {
  localStorage.setItem('player', JSON.stringify(player));
  window.location.href = 'game.html';
});

function calculatePrice(wave, count, difficulty, basePrice) {
  // Increase in price per wave
  const waveIncrease = (5 + (difficulty * 2)); // Adjust based on difficulty

  // Increase in price per purchase
  const purchaseIncrease = (count * 5); // Adjust based on count

  // Calculate the total increase in price
  const totalIncrease = (waveIncrease * wave) + purchaseIncrease;

  // Apply the increase to the base price
  const finalPrice = basePrice + totalIncrease;

  return finalPrice;
}