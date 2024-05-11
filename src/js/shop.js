import { Player } from "./Player.js";
import { Boon } from "./Boon.js";
import { boonArray } from "./Boon.js";
import { boonNameArray } from "./Boon.js";
import { Dice } from "./Dice.js";

// let player = new Player();
const player = new Player(JSON.parse(localStorage.getItem('player')));

if (player.boonArray['chaosEmerald']) {
  player.currency += 15;
}

if (player.boonArray['goldRing']) {
  player.currency += Math.floor(player.currency * player.boonArray['goldRing'].effects.interest);
}

let activeBoon = new Boon("", "", "", "");

const shopContent = document.querySelectorAll('.slot');
document.querySelector("#currentCurrency").innerHTML = player.currency;

let coffeeMachine = document.querySelector(".coffeeMachine")
let coffeeTooltip = coffeeMachine.querySelector(".tooltip");

// stamina is div for stamina TEXT
const stamina = document.querySelector("#stamina");
// visual bar stamina
const staminaBar = document.querySelector("#playerStaminaBar");

//#region [playerInfo Box]
const displayDice = document.querySelector("#displayDice");
const displayConsumables = document.querySelector("#displayConsumables");

const playerDice = document.querySelector("#playerDice");
const playerConsumables = document.querySelector("#playerConsumables");
const diceContainer = document.querySelector("#diceContainer");

const diceBackBtn = document.querySelector("#diceBackBtn");
const consumableBackBtn = document.querySelector("#consumableBackBtn");

const viewDice = document.querySelector('#viewDice');
const viewConsumables = document.querySelector('#viewConsumables');

displayDice.addEventListener("click", () => {
  playerDice.style.display = "block";
  diceBox.style.display = "block";
  playerConsumables.style.display = "none";
  diceContainer.style.display = "none";
});

displayConsumables.addEventListener("click", () => {
  playerConsumables.style.display = "block";
  diceBox.style.display = "block";
  playerDice.style.display = "none";
  diceContainer.style.display = "none";
});

diceBackBtn.addEventListener("click", () => {
  diceBox.style.display = "none";
});

consumableBackBtn.addEventListener("click", () => {
  diceBox.style.display = "none";
});

viewDice.addEventListener("click", () => {
  displayDice.click();
})

viewConsumables.addEventListener("click", () => {
  displayConsumables.click();
})


const boonBox = document.querySelector("#boonBox");
const leftArrow = boonBox.querySelector("#leftArrow");
const rightArrow = boonBox.querySelector("#rightArrow")

leftArrow.addEventListener("click", () => {scrollBoonBox("left")});
rightArrow.addEventListener("click", () => {scrollBoonBox("right")});

function scrollBoonBox(direction) {
  // Scroll the container
  const scrollAmount = boonBox.querySelector("img").width;

  if (direction === 'left') {
    boonBox.scrollLeft -= scrollAmount;
  } else if (direction === 'right') {
    boonBox.scrollLeft += scrollAmount;
  }

  // Move the arrows
  leftArrow.style.left = `${boonBox.scrollLeft}px`;
  rightArrow.style.right = `-${boonBox.scrollLeft}px`;

  // Hide/Show boons based on if there's a need to scroll
  if (boonBox.scrollWidth == boonBox.clientWidth) {
    // Box is too small for a need to scroll
    leftArrow.style.display = 'none';
    rightArrow.style.display = 'none';
  } else {
    leftArrow.style.display = 'block';
    rightArrow.style.display = 'block';
  }
}

// populate boonBox
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

    boonBox.insertBefore(newImgTag, rightArrow);
    newImgTag.insertAdjacentElement('afterend', newSpanTag);

    newImgTag.addEventListener("click", function() {
      boonBox.querySelectorAll(".active").forEach((active) => {
        if (active != newImgTag) {
          active.classList.remove("active");
        }
      });

      if (newImgTag.classList.contains('active')) {
        newImgTag.classList.remove('active');
      } else {
        newImgTag.classList.add('active');
      }
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
    });
  }

}

// Function for adding to boon box
function addToBoonBox(boon) {
  let newImgTag = document.createElement('img');

  newImgTag.src = boon.filePath;

  newImgTag.classList.add("boon");

  let newSpanTag = document.createElement('span');
  newSpanTag.innerHTML = boon.description;
  newSpanTag.classList.add("tooltip");

  boonBox.insertBefore(newImgTag, rightArrow);
  newImgTag.insertAdjacentElement('afterend', newSpanTag);

  newImgTag.addEventListener("click", function() {
    boonBox.querySelectorAll(".active").forEach((active) => {
      if (active != newImgTag) {
        active.classList.remove("active");
      }
    });

    if (newImgTag.classList.contains('active')) {
      newImgTag.classList.remove('active');
    } else {
      newImgTag.classList.add('active');
    }
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
  });

  leftArrow.click();
}

// populate playerDice
let playerDiceContainer = document.createElement("ul");
playerDiceContainer.style.listStyleType = "none";
playerDice.appendChild(playerDiceContainer);

playerDiceContainer = playerDice.querySelector("ul");

// Add new back button
let newBack = document.createElement('button');
newBack.textContent = "Back";
newBack.id = "detailBack";
newBack.style.display = 'none';
newBack.classList.add("backBtn");

//#region [View Player Dice]
newBack.addEventListener("click", () => {

  // Display all dice
  let allDice = playerDice.querySelectorAll("ul li");
  allDice.forEach((dice) => {
    dice.style.display = 'flex';
  });

  // Hide all dice sublists
  let diceList = playerDice.querySelectorAll("ul li ul")
  diceList.forEach((diceContent) => {
    diceContent.style.display = 'none';
  });

  // hide this, display the regular back
  diceBackBtn.style.display = "block";
  newBack.style.display = "none";
  viewConsumables.style.display = "block";
});

playerDice.appendChild(newBack);

for (let i = 0; i < player.diceArray.length; i++) {
  // Add each dice as a clickable element that displays the sides when clicked
  let newDice = document.createElement('li');
  newDice.textContent = player.diceArray[i].typeOf;

  // Set styles
  newDice.style.backgroundImage = "url('src/media/Dice/" + newDice.textContent + ".png')";
  newDice.style.display = "flex";
  newDice.style.justifyContent = "center";
  newDice.style.alignItems = "center";
  newDice.style.position = "relative";
  
  newDice.classList.add("die-btn");
  newDice.classList.add(player.diceArray[i].typeOf);
  
  // Give it a ul child populated by it's sides
  let newDiceSides = document.createElement("ul");
  newDiceSides.style.display = "none";
  newDiceSides.style.listStyleType = "none";
  newDiceSides.style.justifyContent = "space-around";
  newDiceSides.style.alignItems = "center";
  newDiceSides.style.position = "absolute";
  newDiceSides.style.left = "100%";

  
  for (let j = 0; j < player.diceArray[i].sides.length; j++) {
    // Populate the newDiceSides
    let newDiceSide = document.createElement("li");
    newDiceSide.textContent = player.diceArray[i].sides[j].value;

    newDiceSide.style.padding = "10px";

    // Add it to the ul
    newDiceSides.appendChild(newDiceSide);
  }

  newDice.appendChild(newDiceSides);

  // Make it clickable to display it's children
  newDice.addEventListener("click", () => {
    let diceList = newDice.querySelector("ul");
    diceList.style.display = 'flex';

    // hide the old back button and display new one
    diceBackBtn.style.display = "none";
    newBack.style.display = 'block';
    
    // Hide all other dice
    let allDice = playerDice.querySelectorAll(".die-btn");
    allDice.forEach((dice) => {
      if (dice != newDice) {
        dice.style.display = 'none';
      }
    });

    // Hide the 'View Consumables' button
    viewConsumables.style.display = "none";
  });

  // Add it to the ul
  playerDiceContainer.appendChild(newDice);
}

function addPlayerDice(dice) {
  // Add the dice as a clickable element that displays the sides when clicked
  let newDice = document.createElement('li');
  newDice.textContent = dice.typeOf;

  // Set styles
  newDice.style.backgroundImage = "url('src/media/Dice/" + newDice.textContent + ".png')";
  newDice.style.display = "flex";
  newDice.style.justifyContent = "center";
  newDice.style.alignItems = "center";
  newDice.style.position = "relative";
  
  newDice.classList.add("die-btn");
  newDice.classList.add(dice.typeOf);
  
  // Give it a ul child populated by it's sides
  let newDiceSides = document.createElement("ul");
  newDiceSides.style.display = "none";
  newDiceSides.style.listStyleType = "none";
  newDiceSides.style.justifyContent = "left";
  newDiceSides.style.alignItems = "center";
  newDiceSides.style.position = "absolute";
  newDiceSides.style.left = "100%";
  newDiceSides.style.width = (playerDice.clientWidth - (2 * newDice.clientWidth)) + "px";
  newDiceSides.style.flexWrap = "wrap";

  // console.log(playerDice.clientWidth);
  
  for (let i = 0; i < dice.sides.length; i++) {
    // Populate the newDiceSides
    let newDiceSide = document.createElement("li");
    newDiceSide.textContent = dice.sides[i].value;

    newDiceSide.style.padding = "10px";

    // Add it to the ul
    newDiceSides.appendChild(newDiceSide);
  }

  newDice.appendChild(newDiceSides);

  // Make it clickable to display it's children
  newDice.addEventListener("click", () => {
    let diceList = newDice.querySelector("ul");
    diceList.style.display = 'flex';

    // hide the old back button and display new one
    diceBackBtn.style.display = "none";
    newBack.style.display = 'block';

    // Fix diceList styles
    diceList.style.width = (playerDice.clientWidth - (1.05 * newDice.clientWidth)) + "px";
    
    // Hide all other dice
    let allDice = playerDice.querySelectorAll(".die-btn");
    allDice.forEach((dice) => {
      if (dice != newDice) {
        dice.style.display = 'none';
      }
    });

    // Hide the 'View Consumables' button
    viewConsumables.style.display = "none";
  });

  // Add it to the ul
  playerDiceContainer.appendChild(newDice);
}
//#endregion

//#region [View Player Consumables]

let consumableList = document.createElement("ul");
consumableList.style.listStyleType = "none";

// populate playerConsumables' ul with li's of the player's consumables
for (let key in player.items) {
  if (player.items.hasOwnProperty(key)) {
    if (key != 'supplement') {
      // If the subarray ISN'T of type supplement, it's a dice. Add classes respectively
      for (let i = 0; i < player.items[key].length; i++) {
        let newConsumable = document.createElement('li');
        newConsumable.textContent = player.items[key][i].typeOf;
        // Set styles & classes
        newConsumable.style.backgroundImage = "url('src/media/Dice/" + newConsumable.textContent + ".png')";
        newConsumable.style.display = "flex";
        newConsumable.style.justifyContent = "center";
        newConsumable.style.alignItems = "center";
        newConsumable.classList.add("die-btn");
        newConsumable.classList.add(player.items[key][i].typeOf);

        // Add it to the consumableList
        consumableList.appendChild(newConsumable);
      }
    } else {
      // subarray is for type supplement
      for (let i = 0; i < player.items[key].length; i++) {
        let newConsumable = document.createElement('li');
        newConsumable.textContent = player.items[key][i].bonus;
      
        // Set styles & classes
        newConsumable.style.display = "flex";
        newConsumable.style.justifyContent = "center";
        newConsumable.style.alignItems = "center";

        // TODO - get finalized backgroundImage and classes for supplements
        newConsumable.classList.add("die-btn");
        newConsumable.classList.add("d4");
        newConsumable.style.backgroundImage = "url('src/media/Dice/d4.png')";


        // Add it to the consumableList
        consumableList.appendChild(newConsumable);
      }
    }
  }
}

// Add the ul to playerConsumables
playerConsumables.appendChild(consumableList);

// function to add more to playerConsumables
function addPlayerConsumables(consumable) {
  let consumableList = playerConsumables.querySelector("ul");
  if (consumable.bonus == null || consumable.bonus == undefined) {
    let newConsumable = document.createElement('li');
    newConsumable.textContent = consumable.typeOf;
    // Set styles & classes
    newConsumable.style.backgroundImage = "url('src/media/Dice/" + newConsumable.textContent + ".png')";
    newConsumable.style.display = "flex";
    newConsumable.style.justifyContent = "center";
    newConsumable.style.alignItems = "center";
    newConsumable.classList.add("die-btn");
    newConsumable.classList.add(consumable.typeOf);

    // Add it to the consumableList
    consumableList.appendChild(newConsumable);
  } else { 
    // Consumable is a flat bonus
    let newConsumable = document.createElement('li');
    newConsumable.textContent = consumable.bonus;
  
    // Set styles & classes
    newConsumable.style.display = "flex";
    newConsumable.style.justifyContent = "center";
    newConsumable.style.alignItems = "center";

    // TODO - get finalized backgroundImage and classes for supplements
    newConsumable.classList.add("die-btn");
    newConsumable.classList.add("d4");
    newConsumable.style.backgroundImage = "url('src/media/Dice/d4.png')";


    // Add it to the consumableList
    consumableList.appendChild(newConsumable);
  }
}

//#endregion

// Fix the arrow positions onload
boonBox.scrollLeft = 0;
leftArrow.click();
//#endregion

function updateStamina(delta) {
  // Add to the stamina
  player.changeStamina(delta);

  // Update the text
  stamina.querySelector("span").innerHTML = `${player.stamina} / ${player.maxStamina}`;

  // Update the bar width
  if (Math.round((player.stamina / player.maxStamina) * 100) >= 100) {
    staminaBar.style.width = "100%";
  } else {
    staminaBar.style.width = (Math.round((player.stamina / player.maxStamina) * 100) + "%");
  }
}

// Update the page
updateStamina(0);

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


// document.querySelector("#playerInfo").addEventListener("click", function() {
//   console.log(player.boonArray);
//   console.log(player.currency);
// });

document.querySelector("#addMoneys").addEventListener("click", function() {
  player.currency += 10;
  document.querySelector("#currentCurrency").innerHTML = player.currency;
});

const lcd = document.querySelector("#lcdScreen");

function getCodeItem(class1, class2) {
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
  return document.querySelector(`${class2} ${class1}`);
}

let selectedItem;

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

      if (lcd.textContent.length == 2) {
        let class1 = lcd.textContent.substring(0, 1);
        let class2 = lcd.textContent.substring(1);
        selectedItem = getCodeItem(class1, class2);

        if (selectedItem.id != "") {
          // console.log("test");
          selectedItem.classList.add("selectedSlot");
        }
      }

    } else if (data == "backspace") {
      if (lcd.textContent.length > 3) {
        lcd.textContent = "";
      } else {
        lcd.textContent = lcd.textContent.slice(0, -1);
      }
      selectedItem.classList.remove("selectedSlot");
    } else {
      // User submit their input
      if (lcd.textContent.length != 2) {
        lcd.textContent = "";
      } else {
        // get the appropriate shop item
        let class1 = lcd.textContent.substring(0, 1);
        
        let class2 = lcd.textContent.substring(1);
        
        lcd.textContent = "";
        selectedItem = getCodeItem(class1, class2);

        if (selectedItem.id != "") {
          activeBoon = boonArray[selectedItem.id];
          if (player.subtractCurrency(Math.round(10*(.5 * player.boonArrayLength) * player.difficulty))) {
            // player is buying the boon
            document.querySelector("#currentCurrency").innerHTML = player.currency;
            addToBoonBox(activeBoon);
            player.addBoon(activeBoon);

//#region [medicalBag]
            if (player.boonArray['medicalBag'] && activeBoon.name === 'medicalBag') {
              let staminaBonus = player.boonArray['medicalBag'].effects.maxStamina;
              player.maxStamina += staminaBonus;
              updateStamina(staminaBonus);
            }
//#endregion

//#region [stethoscope]
            if (player.boonArray['stethoscope'] && activeBoon.name === 'stethoscope') {
              player.maxDiceCount += player.boonArray['stethoscope'].effects.extraDice;
            }
//#endregion

            let selected = document.querySelector(`#${activeBoon.name}`);
            if (selected) {
              selected.style.opacity = 0;
              selected.id = ``;
            } 
            lcd.innerHTML = "<span class=\"animatedText\">Thank You!</span>";
            lcd.style.fontSize = "1.3vw";
            activeBoon = new Boon("", "", "", "");
          } else {
            // player doesn't have enough money
            selectedItem.classList.remove("selectedSlot");
            lcd.innerHTML = "<span class=\"animatedText\">You're Too Poor!</span>";
            lcd.style.fontSize = "1.3vw";
          }
        }
      }
    }
  });
});

//#region [Coffee Machine]
const coffeeLCD = document.querySelector(".coffeeLCD");

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

    // If player can afford it
    if (player.subtractCurrency(coffeeCost)) {
      coffeeTooltip.style.display = 'none';
      coffeeTooltip.querySelector('.cost').innerHTML = `Cost: ${coffeeCost}`;
      document.querySelector("#currentCurrency").innerHTML = player.currency;
      player.addBoon(activeBoon);
      coffeeLCD.innerHTML = "<span class=\"animatedText\">Thank You!</span>";
      addToBoonBox(activeBoon);
      updateStamina(50);
    } else {
      coffeeLCD.innerHTML = "<span class=\"animatedText\">Too Expensive!</span>";
    }


    activeBoon = new Boon("", "", "", "");

    // Update tooltip costs
    shopContent.forEach(shopItem => {
      shopItem.querySelector('.cost').innerHTML = `Cost: ${Math.round(10*(.5 * player.boonArrayLength) * player.difficulty)}`;
    });
  }
});

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
const diceBox = document.querySelector('#diceBox');
const buyDice = document.querySelector('#buyDice');
const diceOptions = document.querySelector("#diceOptions");
const message = document.querySelector("#message");
diceBox.style.display = "none";
const buyConsumables = document.querySelector('#buyConsumables');


diceMachine.addEventListener("click", (e) => {
  diceBox.style.display = "block";
  playerDice.style.display = "none";
  playerConsumables.style.display = "none";
  diceContainer.style.display = "block";
  buyDice.style.display = "block";
  backBtn.style.display = "block";
  buyConsumables.style.display = "none";
  message.style.display = 'none';
  if (player.currency < 15) {
    message.style.display = "block";
    message.innerHTML = "<h2 style=\"color: red;top:40%; font-size:25px; text-shadow: 1px 2px 1px rgb(70, 19, 19)\">You don't have enough funds!</h2>";
    buyDice.style.display = "none";
  } else {
    buyDice.style.display = "block";
    // Warn user if they will miss out on consumable dice
    
    if (player.getConsumableCount() >= player.maxConsumableDice) {
      message.innerHTML = `
      <h3>Warning! You have the maximum stored consumable dice! You will not get any consumable dice!</h3>`;
      message.style.display = 'block';
    } else if (player.getConsumableCount() + 2 > player.maxConsumableDice) {
      message.innerHTML = `
      <h3>Warning! You are near the maximum, if you buy dice, you will get ${player.maxConsumableDice - player.getConsumableCount()} consumable dice!</h3>`;
      message.style.display = 'block';
    }
  }

});

backBtn.addEventListener("click", (e) => {
  diceBox.style.display = "none";
});

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

buyDice.addEventListener("click", (e) => {
  // check if the player has enough funds
  // TODO change hard coded cost 
  if (player.diceArray.length + 1 <= player.maxDiceCount) {
    // if the player buying more dice won't exceed maximum
    let spare = player.maxConsumableDice - player.getConsumableCount();

    if (player.subtractCurrency(15)) {
      document.querySelector("#currentCurrency").innerHTML = player.currency;
      buyDice.style.display = "none"
      backBtn.style.display = "none";
      
      // Generate three dice. One they will choose to keep permanently, the others are consumable

      let diceChoice = {
        choiceOne: generateRandomDice(),
        choiceTwo: generateRandomDice(),
        choiceThree: generateRandomDice()
      };


      // Add a div option for each of them
      message.style.display = "block";
      message.innerHTML = "<h2>Choose a die to keep permanently.<br>The other 2 will be kept as consumables.</h2><br>";
      
      diceOptions.innerHTML += `<button id="choiceOne" class="die-btn die-option ${diceChoice['choiceOne'].typeOf}" style="background-image: url(src/media/Dice/${diceChoice['choiceOne'].typeOf}.png)">${diceChoice['choiceOne'].typeOf}</button>`;
      diceOptions.innerHTML += `<button id="choiceTwo" class="die-btn die-option ${diceChoice['choiceTwo'].typeOf}" style="background-image: url(src/media/Dice/${diceChoice['choiceTwo'].typeOf}.png)">${diceChoice['choiceTwo'].typeOf}</button>`;
      diceOptions.innerHTML += `<button id="choiceThree" class="die-btn die-option ${diceChoice['choiceThree'].typeOf}" style="background-image: url(src/media/Dice/${diceChoice['choiceThree'].typeOf}.png)">${diceChoice['choiceThree'].typeOf}</button>`;

      // Add event listeners to each of the dice
      document.querySelectorAll(".die-option").forEach((option) => {
        option.addEventListener("click", () => {
          // Add this specific dice to the player
          player.addDice(diceChoice[option.id]);
          addPlayerDice(diceChoice[option.id]);
          delete diceChoice[option.id];
          
          // Add other dice as consumables
          for (let key in diceChoice) {
            if (diceChoice.hasOwnProperty(key)) {
              // console.log(diceChoice[key]);
              diceChoice[key].name = diceChoice[key].typeOf;
              player.addItem(diceChoice[key]);
              addPlayerConsumables(diceChoice[key]);
            }
          }

          diceOptions.innerHTML = "";
          backBtn.click();
        });
      });
    } // END if player has enough money
  } else if (player.getConsumableCount() < player.maxConsumableDice) {
    buyDice.style.display = "none";
    buyConsumables.style.display = 'block';
    message.innerHTML = `
    <h2 style=\"color: red; font-size:25px; text-shadow: 1px 2px 1px rgb(70, 19, 19)\">
      You have too many dice to buy more!<br>
      <span style=\"color: black; text-shadow: none; font-size:18px\">You can still buy consumables!</span>
    </h2>
    `;
    if (player.getConsumableCount() + 3 > player.maxConsumableDice) {
      // Adding more would go over the max, warn them they'll only go up to the max
      message.innerHTML += `
      <h3>Warning! You are near the maximum, if you buy more you will only get ${player.maxConsumableDice - player.getConsumableCount()} dice!</h3>`;
    }
    message.style.display = "block";
  } else {
    buyDice.style.display = "none";
    buyConsumables.style.display = "none";
    message.innerHTML = `
    <h2 style=\"color: red; font-size:25px; text-shadow: 1px 2px 1px rgb(70, 19, 19)\">
      You are full on both normal and consumable dice!
    </h2>
    `;
    message.style.display = "block";
  }
}); // END buyDice.addEventListener
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

buyConsumables.addEventListener("click", () => {

  buyConsumables.style.display = "none"
  backBtn.style.display = "none";

  // Generate up to three dice and display them. On click of ANY of them, the player gets all of them
  let diceChoice = {
    choiceOne: generateRandomDice(),
    choiceTwo: generateRandomDice(),
    choiceThree: generateRandomDice()
  };

  message.innerHTML = "<h2>Collect your consumables!</h2><br>";
  diceOptions.innerHTML += `<button id="choiceOne" class="die-btn die-option ${diceChoice['choiceOne'].typeOf}" style="background-image: url(src/media/Dice/${diceChoice['choiceOne'].typeOf}.png)">${diceChoice['choiceOne'].typeOf}</button>`;
  diceOptions.innerHTML += `<button id="choiceTwo" class="die-btn die-option ${diceChoice['choiceTwo'].typeOf}" style="background-image: url(src/media/Dice/${diceChoice['choiceTwo'].typeOf}.png)">${diceChoice['choiceTwo'].typeOf}</button>`;
  diceOptions.innerHTML += `<button id="choiceThree" class="die-btn die-option ${diceChoice['choiceThree'].typeOf}" style="background-image: url(src/media/Dice/${diceChoice['choiceThree'].typeOf}.png)">${diceChoice['choiceThree'].typeOf}</button>`;

  // Add event listeners to each of the dice
  document.querySelectorAll(".die-option").forEach((option) => {
    option.addEventListener("click", () => {
      // Add all dice to the player's items
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
  });
});

window.addEventListener('load', function() {
  // Fix for scrolling 
  leftArrow.click();
});