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

let initCoffeeCost = 0;
if (player.boonArray['cuppaJoe']){
  initCoffeeCost = calculatePrice(player.wave, player.boonArray['cuppaJoe'].length, player.difficulty, 10);
} else {
  initCoffeeCost = calculatePrice(player.wave, 0, player.difficulty, 10);
}

coffeeTooltip.innerHTML = `
${activeBoon.name} <br><br> 
${activeBoon.description}<br>
<span class='cost'>Cost: ${initCoffeeCost}</span>`;
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
        <br><br>
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

const buyItem = document.querySelector("#buyItem");

buyItem.addEventListener("click", function() {
  activeBoon = boonArray['cuppaJoe'];
  if (activeBoon.name == "cuppaJoe") {
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

const lcd = document.querySelector("#lcdScreen");

document.querySelectorAll('.numPadInput').forEach((numBtn) => {
  // Add an event listener depending on the data-info
  let data = numBtn.getAttribute("data-info");

  numBtn.addEventListener("click", () => {
    // If it's not backspace or go, try to add the data-info to the LCD screen
    if (data != "backspace" && data != 'GO') {
      lcd.style.fontSize = "2vw";
      // Check if the LCD has 2 digits
      if (lcd.textContent.length > 3) {
        lcd.textContent = "";
      } 
      if (lcd.textContent.length == 0 && ['A', 'B', 'C'].includes(data)){
        lcd.textContent += data;
      } else if (lcd.textContent.length == 1 && ['1', '2', '3', '4'].includes(data)) {
        lcd.textContent += data;
      }
    } else if (data == "backspace") {
      if (lcd.textContent.length > 3) {
        lcd.textContent = "";
      } else {
        lcd.textContent = lcd.textContent.slice(0, -1);
      }
    } else {
      // User submit their input
      if (lcd.textContent.length != 2) {
        lcd.textContent = "";
      } else {
        // get the appropriate shop item
        let class1 = lcd.textContent.substring(0, 1);
        switch (class1) {
          case "A":
            class1 = ".col1";
          break;
          case "B":
            class1 = ".col2";
          break;
          case "C":
            class1 = ".col3";
          break;
        }
        let class2 = lcd.textContent.substring(1);
        switch (class2) {
          case "1":
            class2 = ".row1";
          break;
          case "2":
            class2 = ".row2";
          break;
          case "3":
            class2 = ".row3";
          break;
          case "4":
            class2 = ".row4";
          break;
        }
        lcd.textContent = "";
        let selectedItem = document.querySelector(`${class2} ${class1}`);

        if (selectedItem.id != "") {
          activeBoon = boonArray[selectedItem.id];
          if (player.subtractCurrency(Math.round(10*(.5 * player.boonArrayLength) * player.difficulty))) {
            document.querySelector("#currentCurrency").innerHTML = player.currency;
            player.addBoon(activeBoon);
            let selected = document.querySelector(`#${activeBoon.name}`);
            if (selected) {
              selected.style.opacity = 0;
              selected.id = ``;
            } 
          } else {
            lcd.textContent = "U Broke";
            lcd.style.fontSize = "1.3vw";
          }
        }
      }
    }
  });
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
  if (!player.subtractCurrency(15)) {
    diceOptions.innerHTML = "<h2 style=\"color: red;top:40%; font-size:25px; text-shadow: 1px 2px 1px rgb(70, 19, 19)\">You don't have enough funds!</h2>";
    buyDice.style.display = "none";
  }

});

backBtn.addEventListener("click", (e) => {
  colorBox.style.display = "none";
});

buyDice.addEventListener("click", (e) => {
  // check if the player has enough funds
  // TODO change hard coded cost 
  
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