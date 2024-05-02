import { Player } from "./Player.js";
import { Boon } from "./Boon.js";
import { boonArray } from "./Boon.js";
import { boonNameArray } from "./Boon.js";

let player = new Player();

let activeBoon = new Boon("", "", "", "");

const shopContent = document.querySelectorAll('.slot');

player.addBoon(boonArray['crowbar']);

let bannedArray = [];
for (let i = 0; i < player.boonArray.length; i++) {
  bannedArray.push(player.boonArray[i]);
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

// This currently works by replicating the boon used to populate the shotItem div. In order to correctly 
// serve the player the correct item, the id is used to make a new one to give to the player. 
// However, we'll need to refactor the contructor to allow for variable costed boons

document.querySelector("#buyItem").addEventListener("click", function() {
  if (activeBoon.name != "") {
    if (player.subtractCurrency(15)) {
      document.querySelector("#currentCurrency").innerHTML = player.currency;
      player.addBoon(activeBoon);
      let selected = document.querySelector(`#${activeBoon.name}`);
      if (selected) {
        selected.style.opacity = 0;
        selected.id = ``;
      }
      activeBoon = new Boon("", "", "", "");
    }
  }
});

document.querySelector("#addMoneys").addEventListener("click", function() {
  player.currency += 10;
  document.querySelector("#currentCurrency").innerHTML = player.currency;
});

let coffeeMachine = document.querySelector(".coffeeMachine")

coffeeMachine.addEventListener("click", function() {
  activeBoon = boonArray['cuppaJoe'];
  
  let tooltip = coffeeMachine.querySelector(".tooltip");
  tooltip.innerHTML = `${activeBoon.name} <br><br> ${activeBoon.description}`;

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

const fadeBtn = document.querySelector('#fadeBtn');
const backBtn = document.querySelector('#backBtn');
const colorBox = document.querySelector('#diceBox');
colorBox.style.display = "none";
fadeBtn.addEventListener("click", (e) => {
  colorBox.style.display = "block";
  // console.log("test");
});

backBtn.addEventListener("click", (e) => {
  colorBox.style.display = "none";
});

const returnToGameBtn = document.querySelector('#returnToGameBtn');
returnToGameBtn.addEventListener("click", (e) => {
  localStorage.setItem('player', JSON.stringify(player));
  window.location.href = 'game.html';
});