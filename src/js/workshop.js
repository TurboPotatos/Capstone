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

// player.currency = 15;

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

// for (let i = 0; i < 5; i++) {
//   let rand = Math.ceil(Math.random() * 20);
//   let tempDiceSide = new DiceSide(rand, 1);

//   player.diceSideArray.push(tempDiceSide);
// }

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
    boughtDiceSide = new DiceSide(parseInt(shopItem.id.substring(6)), 1);

    shopContent.forEach(shopItem => {
      shopItem.classList.remove('active');
    })
    
    shopItem.classList.add('active');
  });

});


document.querySelector("#playerInfo").addEventListener("click", function() {
  console.log("Player's dice sides: ");
  console.log(player.diceSideArray);
  console.log("Player's dice: ");
  console.log(player.diceArray);
});

document.querySelector("#buyItem").addEventListener("click", function() {
  if (boughtDiceSide.value != -1) {
    if (player.subtractCurrency(15)) {
      document.querySelector("#currentCurrency").innerHTML = player.currency;
      player.diceSideArray.push(boughtDiceSide);

      // console.log(boughtDiceSide.value);

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
      newDiceSide.draggable = true;
      newDiceSide.style.display = document.querySelector('.playerDiceFaces .diceSide').style.display;

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
});

// Populate the diceList to include all of the player's dice
let diceList = document.querySelector(".diceList");

for (let i = 0; i < player.diceArray.length; i++) {
  let newDice = document.createElement('li');
  
  newDice.id = "arrayIndex_" + i;

  let newDiceDisplay = document.createElement('li');
  newDiceDisplay.textContent = player.diceArray[i].typeOf;

  newDiceDisplay.classList.add("diceListDisplay");
  newDice.classList.add("diceListItem");

  newDiceDisplay.classList.add('displayMatchClass_' + i);
  newDice.classList.add('displayMatchClass_' + i);

  diceList.appendChild(newDiceDisplay);
  diceList.appendChild(newDice);
}

document.querySelector(".diceListWrapper").addEventListener("click", function() {
  if (diceList.style.display != "block") {
    diceList.style.display = "block";
  } else {
    diceList.style.display = "none";
  }
});

document.querySelectorAll(".diceListItem").forEach(item => {
  // add all their dice sides as elements
  let testDice = player.diceArray[parseInt(item.id.substring(11))];
  for(let i = 0; i < testDice.sides.length; i++) {
    let newDiceSide = document.createElement('div');

    newDiceSide.textContent = testDice.sides[i].value;
    newDiceSide.style.display = "none";
    newDiceSide.classList.add('diceSide');
    newDiceSide.classList.add('box');
    newDiceSide.draggable = true;

    // set info for later use
    newDiceSide.setAttribute('data-info', i);

    item.appendChild(newDiceSide);
  }
});

document.querySelectorAll(".diceListDisplay").forEach(displayNode => {
  displayNode.addEventListener("click", () => {
    let parent = document.querySelector(`.${displayNode.classList[1]}.diceListItem`);
    parent.querySelectorAll(".diceSide").forEach(diceFace => {
      if (diceFace.style.display != "block") {
        diceFace.style.display = "block";
      } else {
        diceFace.style.display = "none";
      }
    });
  })
});

let playerDiceSides = document.querySelector(".playerDiceFaces");

for(let i = 0; i < player.diceSideArray.length; i++) {
  // loop through and add all spare dice faces to the list, for dragging
  let newDiceSide = document.createElement('li');
  newDiceSide.textContent = player.diceSideArray[i].value;
  newDiceSide.classList.add('diceSide');
  newDiceSide.classList.add('box');
  newDiceSide.id = "arrayIndex_" + i;
  newDiceSide.draggable = true;
  newDiceSide.style.display = "none";

  newDiceSide.setAttribute('data-info', i);

  playerDiceSides.appendChild(newDiceSide);
}

playerDiceSides.addEventListener("click", () => {
  playerDiceSides.querySelectorAll('.diceSide').forEach(diceSide => {
    if (diceSide.style.display != "block") {
      diceSide.style.display = "block";
    } else {
      diceSide.style.display = "none";
    }
  });
});

prepareItems();

var dragSrcEl = null;
  
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

function handleDrop(e) {
  // console.log("handleDrop");
  if (e.stopPropagation) {
    e.stopPropagation(); // stops the browser from redirecting.
  }
  
  if ((dragSrcEl != this)) {

    // dragSrcEl is the OBJECT BEING DRAGGED
    // this is the OBJECT DRAGGED ONTO

    // This works by using data-info as the INDEX of the diceSide in its parent array
    // and, if the parent has an id (and is therefore one of the player's dice) then
    // the id of its parents is the index of the dice in the player's diceArray[]
    
    let parentDraggedDiceSide = dragSrcEl.parentNode;
    let draggedDiceSide;
    let draggedDiceSideIndex = parseInt(dragSrcEl.getAttribute('data-info'));
    let draggedSideStoredIn = "";
    
    let parentDraggedOnDiceSide = this.parentNode;
    let draggedOnDiceSide;
    let draggedOnDiceSideIndex = parseInt(this.getAttribute('data-info'));
    let draggedOnSideStoredIn = "";
    
    if (parentDraggedDiceSide.id != null && parentDraggedDiceSide.id != "") {
      draggedDiceSide = player.diceArray[parseInt(parentDraggedDiceSide.id.substring(11))].sides[draggedDiceSideIndex];
      draggedSideStoredIn = "player.diceArray";
    } else {
      draggedDiceSide = player.diceSideArray[draggedDiceSideIndex];
      draggedSideStoredIn = "player.diceSideArray";
    }
    
    if (parentDraggedOnDiceSide.id != null && parentDraggedOnDiceSide.id != "") {
      draggedOnDiceSide = player.diceArray[parseInt(parentDraggedOnDiceSide.id.substring(11))].sides[draggedOnDiceSideIndex];
      draggedOnSideStoredIn = "player.diceArray";
    } else {
      draggedOnDiceSide = player.diceSideArray[draggedOnDiceSideIndex];
      draggedOnSideStoredIn = "player.diceSideArray";
    }


    // Swapping values
    let tempDiceSide = draggedOnDiceSide;
    
    if (draggedOnSideStoredIn == "player.diceArray") {
      player.diceArray[parseInt(parentDraggedOnDiceSide.id.substring(11))].sides[draggedOnDiceSideIndex] = draggedDiceSide;
    } else {
      player.diceSideArray[draggedOnDiceSideIndex] = draggedDiceSide;
    }
    
    if (draggedSideStoredIn == "player.diceArray") {
      player.diceArray[parseInt(parentDraggedDiceSide.id.substring(11))].sides[draggedDiceSideIndex] = tempDiceSide;
    } else {
      player.diceSideArray[draggedDiceSideIndex] = tempDiceSide;
    }

    console.log(draggedDiceSide.value);
    console.log(draggedOnDiceSide.value);

    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
    
    // contentArray[dragSrcEl.id] = dragSrcEl.innerHTML;
    // contentArray[this.id] = this.innerHTML;

    // console.log(contentArray);
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