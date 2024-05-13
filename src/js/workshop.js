import { Player } from "./Player.js";
import { Boon } from "./Boon.js";
import { boonArray } from "./Boon.js";
import { boonNameArray } from "./Boon.js";
import { DiceSide } from "./DiceSide.js";
import { Dice } from "./Dice.js";


// let player = new Player();
const player = new Player(JSON.parse(localStorage.getItem('player')));

let boughtDiceSide = new DiceSide(-1, 1);

let items = document.querySelectorAll('.box');

const shopContent = document.querySelectorAll('.slot');

document.querySelector("#currentCurrency").innerHTML = player.currency;

let playerDiceFacesDisplay = 'none';

let priceSpan = document.querySelector("#price");

// Counter for how many die faces player bought this visit
let totalBought = 0;

priceSpan.innerHTML = calculatePrice(player.wave, totalBought, player.difficulty, 10);

//#region [playerInfo Box]
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

// Fix the arrow positions onload
boonBox.scrollLeft = 0;
leftArrow.click();
//#endregion


shopContent.forEach(shopItem => {
  // Get random dice side
  let rand = Math.random();
  rand = Math.ceil(rand * 20);
  let diceSide = new DiceSide(rand, 1);

  // Set shop HTML to dice side

  shopItem.innerHTML = diceSide.value;
  // shopItem.style.background = diceSide.src;

  shopItem.id += "_" + diceSide.value;

  shopItem.addEventListener("click", function() {
    // TODO fix difficulty
    boughtDiceSide = new DiceSide(parseInt(shopItem.id.substring(6)), player.difficulty);

    let isActive = shopItem.classList.contains("active");

    shopContent.forEach(shopItem => {
      shopItem.classList.remove('active');
    })

    shopItem.classList.add('active');
    
    // Remove boughtDiceSide info and active class if the dice is being deselected
    if (isActive) {
      shopItem.classList.remove('active');
      boughtDiceSide.value = -1;
    }
  });

});


document.querySelector("#playerInfo").addEventListener("click", function() {
  console.log("Player's dice sides: ");
  console.log(player.diceSideArray);
  console.log("Player's dice: ");
  console.log(player.diceArray);
});

const buyBtn = document.querySelector("#buyItem");
buyBtn.addEventListener("click", function() {
  if (boughtDiceSide.value != -1) {
    if (player.subtractCurrency(calculatePrice(player.wave, totalBought, player.difficulty, 10))) {
      document.querySelector("#currentCurrency").innerHTML = player.currency;
      player.diceSideArray.push(boughtDiceSide);
      totalBought++;
      console.log(calculatePrice(player.wave, totalBought, player.difficulty, 10));
      priceSpan.innerHTML = calculatePrice(player.wave, totalBought, player.difficulty, 10);

      let selected = document.querySelector('.active');
      if (selected) {
        selected.style.opacity = 0;
        selected.id = '';
      }
      
      // Add dice side to player inventory
      let newDiceSide = document.createElement('li');
      newDiceSide.textContent = boughtDiceSide.value;
      newDiceSide.classList.add('diceSide');
      newDiceSide.classList.add('box');
      newDiceSide.classList.add('stored');
      newDiceSide.draggable = true;
      newDiceSide.style.display = playerDiceFacesDisplay;

      newDiceSide.setAttribute('data-info', player.diceSideArray.length - 1);
      
      playerDiceSides.appendChild(newDiceSide);
      
      boughtDiceSide = new DiceSide(-1, 1);
      prepareItems();
    }
  }
});

document.querySelector("#addMoneys").addEventListener("click", function() {
  player.currency += 10;
  document.querySelector("#currentCurrency").innerHTML = player.currency;
  console.log(boonBox.scrollWidth == boonBox.clientWidth);
});

// Populate the diceList to include all of the player's dice
let diceList = document.querySelector(".diceList");

for (let i = 0; i < player.diceArray.length; i++) {
  // newDice is the li that will contain the diceSides
  let newDice = document.createElement('li');
  
  newDice.id = "arrayIndex_" + i;

  // newDiceDisplay is the button (that looks like the dice) that will expand newDice
  let newDiceDisplay = document.createElement('li');
  // newDiceDisplay.textContent = player.diceArray[i].typeOf;
  newDiceDisplay.style.backgroundImage = "url('src/media/Dice/" + player.diceArray[i].typeOf + ".png')";
  
  newDiceDisplay.classList.add("diceListDisplay");
  newDice.classList.add("diceListItem");

  newDiceDisplay.classList.add('displayMatchClass_' + i);
  newDice.classList.add('displayMatchClass_' + i);
  
  newDiceDisplay.classList.add("die-btn");
  newDiceDisplay.classList.add(player.diceArray[i].typeOf);
  newDice.classList.add(player.diceArray[i].typeOf);

  // Add both to the diceList
  diceList.appendChild(newDiceDisplay);
  diceList.appendChild(newDice);
}

const modDice = document.querySelector('#modDiceBox');
const modBackBtn = document.querySelector('#modBackBtn');

document.querySelector(".diceListWrapper").addEventListener("click", function() {
  modDice.style.display = "block";
  diceList.style.display = "flex";
  
});

modBackBtn.addEventListener("click", (e) => {
  modDice.style.display = "none";
});

document.querySelectorAll(".diceListItem").forEach(item => {
  // add all their dice sides as elements
  
  // the id is used here as the index of the dice in the player's diceArray[]
  let testDice = player.diceArray[parseInt(item.id.substring(11))];
  for(let i = 0; i < testDice.sides.length; i++) {
    // loop through the sides array to make the new side elements
    let newDiceSide = document.createElement('div');

    newDiceSide.textContent = testDice.sides[i].value;
    newDiceSide.style.display = "none";
    newDiceSide.classList.add('diceSide');
    newDiceSide.classList.add('box');
    newDiceSide.classList.add('used');
    newDiceSide.draggable = true;

    // set info to be used to identify the index of the side within the dice's sides[] array
    newDiceSide.setAttribute('data-info', i);

    item.appendChild(newDiceSide);
  }
});

document.querySelectorAll(".diceListDisplay").forEach(displayNode => {
  // Add an event listener to the die-btn to display the li children of the corresponding node
  displayNode.addEventListener("click", () => {
    // get the parent of the clicked element
    let parent = document.querySelector(`.${displayNode.classList[1]}.diceListItem`);

    // get the diceSide children of the parent
    parent.querySelectorAll(".diceSide").forEach(diceFace => {
      // swap the display mode
      if (diceFace.style.display != "inline-block") {
        diceFace.style.display = "inline-block";
        parent.style.display = "inline-block";
        // Hide all other dice
        document.querySelectorAll(".die-btn").forEach((die) => {
          if (die != displayNode) {
            die.style.display = 'none';
          }
        });
        
      } else {
        parent.style.display = "none";
        diceFace.style.display = "none";
        // Show all other dice
        document.querySelectorAll(".die-btn").forEach((die) => {
          if (die != displayNode) {
            die.style.display = 'block';
          }
        });
      }
    });
  });
});

let playerDiceSides = document.querySelector(".playerDiceFaces");
let spanPlayerFaces = document.querySelector("#playerFaces");

for(let i = 0; i < player.diceSideArray.length; i++) {
  // loop through and add all spare dice faces to the list, for dragging
  let newDiceSide = document.createElement('li');
  newDiceSide.textContent = player.diceSideArray[i].value;
  newDiceSide.classList.add('diceSide');
  newDiceSide.classList.add('box');
  newDiceSide.classList.add('stored');
  newDiceSide.id = "arrayIndex_" + i;
  newDiceSide.draggable = true;
  newDiceSide.style.display = "none";

  newDiceSide.setAttribute('data-info', i);

  playerDiceSides.appendChild(newDiceSide);
}

spanPlayerFaces.addEventListener("click", () => {
  playerDiceSides.querySelectorAll('.diceSide').forEach(diceSide => {
    if (diceSide.style.display != "inline-block") {
      diceSide.style.display = "inline-block";
      playerDiceFacesDisplay = 'inline-block';
    } else {
      diceSide.style.display = "none";
      playerDiceFacesDisplay = 'none';
    }
  });
});

prepareItems();

var dragSrcEl = null;

//#region [irrelevant drag functions]
  
function handleDragStart(e) {
  // console.log("handleDragStart");
  this.style.opacity = '0.4';
  
  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  // console.log("handleDragOver");
  if (e.preventDefault) {
    e.preventDefault();
  }

  e.dataTransfer.dropEffect = 'move';
  
  return false;
}

function handleDragEnter(e) {
  // console.log("handleDragEnter");
  this.classList.add('over');
}

function handleDragLeave(e) {
  // console.log("handleDragLeave");
  this.classList.remove('over');
}

//#endregion

function handleDrop(e) {
  // console.log("handleDrop");
  if (e.stopPropagation) {
    e.stopPropagation(); // stops the browser from redirecting.
  }

  if ((dragSrcEl != this) && (!dragSrcEl.classList.contains('used')) && (!this.classList.contains('stored'))) {

    // dragSrcEl is the OBJECT BEING DRAGGED
    // this is the OBJECT DRAGGED ONTO
    
    // If function gets here, then the dragged element is NOT from the player's dice 
    // NOR can the element being dragged over be from the player's spare sides
    // Thus the dragged element has to be from the player's spare sides over a dice's side

    // From here, use the data-info of the dragged element as the index within the player's diceSideArray
    // The id of the draggedOnParent is the index of the dice in the player's diceArray
    // The data-info of the dragged-on element (this) is the index of the side in the dice

    let draggedDiceSide;
    let draggedIndex = parseInt(dragSrcEl.getAttribute('data-info'));
    
    let draggedOnParent = this.parentNode;
    let draggedOnIndex = parseInt(this.getAttribute('data-info'));
    
    draggedDiceSide = player.diceSideArray[draggedIndex];
    
    // Swapping values
    player.diceArray[parseInt(draggedOnParent.id.substring(11))].sides[draggedOnIndex] = draggedDiceSide;
    
    // Remove the diceSide from the player's diceSide array
    player.diceSideArray.splice(draggedIndex, 1);

    // Update indexes of other stored dice sides
    let storedDiceSide = document.querySelectorAll('.diceSide.box.stored');

    storedDiceSide.forEach((diceSide) => {
      if (parseInt(diceSide.getAttribute('data-info')) > draggedIndex) {
        diceSide.setAttribute('data-info', parseInt(diceSide.getAttribute('data-info')) - 1);
      }
    });

    // Remove the element from the DOM
    dragSrcEl.remove();

    this.innerHTML = e.dataTransfer.getData('text/html');
  }
  
  return false;
}

function handleDragEnd(e) {
  this.style.opacity = '1';
  
  items.forEach(function (item) {
    item.classList.remove('over');
  });
}

function prepareItems() {
  items = document.querySelectorAll('.box');
  items.forEach(function(item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);
  });
}

const returnToGameBtn = document.querySelector('#returnToGameBtn');
returnToGameBtn.addEventListener("click", (e) => {
  localStorage.setItem('player', JSON.stringify(player));
  window.location.href = 'game.html';
});

window.addEventListener('load', function() {
  // Fix for scrolling 
  leftArrow.click();
});

function calculatePrice(wave, count, difficulty, basePrice) {
  // 10 base price, increase based on wave and difficulty
  // Increase in price per wave
  wave++; // Account for wave being zero-based
  let waveIncrease = (5 + (difficulty * 2)); // Adjust based on difficulty

  if (count >= 1) {
    waveIncrease += (5 * count); // Increase price a lot by how many they've bought so far
  }

  // Calculate the total increase in price
  let totalIncrease = (waveIncrease * wave);

  // Apply the increase to the base price
  const finalPrice = basePrice + totalIncrease;

  return finalPrice;
}