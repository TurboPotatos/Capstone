// Define the Player class
class Player {
  constructor() {
      this.items = [];
  }

  // Method to add an item to the player's inventory
  addItem(item) {
      this.items.push(item);
  }

  // Method to roll a dice
  rollDice(dice, callback) {
      const rollResult = dice.roll();
      if (callback) {
          callback(rollResult);
      }
      return rollResult;
  }
}

// Define the Dice class
class Dice {
  constructor(sides) {
      this.sides = sides;
  }

  // Method to roll the dice
  roll() {
      return Math.floor(Math.random() * this.sides) + 1;
  }
}

// Define the Items class
class Item {
  constructor(name, effect) {
      this.name = name;
      this.effect = effect;
  }
}

// Function to double the roll result
function doubleRoll(rollResult) {
  return rollResult * 2;
}

const span1 = document.querySelector("#span1");

// Create instances
const player = new Player();
const d4 = new Dice(4);

// Adding an item to the player's inventory
const doubleRollItem = new Item("Double Roll Dice", doubleRoll);
player.addItem(doubleRollItem);

// Rolling the dice with callback
const rollResult = player.rollDice(d4, (result) => {
  console.log("Original roll result:", result);
  const modifiedResult = doubleRollItem.effect(result);
  console.log("Modified roll result with item:", modifiedResult);
});

