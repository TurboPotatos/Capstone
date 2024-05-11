import { DiceSide } from "./DiceSide.js";
import { Dice } from "./Dice.js";
import { Boon, boonArray } from "./Boon.js";
import { Consumable } from "./Consumable.js";

export class Player {

  // Player properties
  currency = 0;
  stamina = 50;
  maxStamina = 150;
  score = 0;
  wave = 0;
  difficulty = 0;
  // Array of dice
  diceArray = [];
  maxDiceCount = 8;
  maxConsumableDice = 6;
  maxSupplements = 6;

  // Array of dice sides
  diceSideArray = [];

  // Arrays of Collectibles
  boonArrayLength = 0;
  boonArray = {};
  items = {};

  constructor(player) {

    if (player !== undefined) {
      // Player properties
      this.currency = player.currency;
      this.stamina = player.stamina;
      this.maxStamina = player.maxStamina;
      this.score = player.score;
      this.difficulty = player.difficulty;
      this.maxDiceCount = player.maxDiceCount;
      this.maxConsumableDice = player.maxConsumableDice;
      this.maxOtherConsumables = player.maxOtherConsumables;
      // console.log("player constructed");
      // console.log(player.diceArray.length);
      
      // Array of dice
      for (let i = 0; i < player.diceArray.length; i++) {
        // Make new dice from the info in the stored generic objects
        let newDice = new Dice(player.diceArray[i].typeOf);

        // console.log(player.diceArray[i].typeOf);

        for (let j = 0; j < player.diceArray[i].sides.length; j++) {
          let storedDiceSide = player.diceArray[i].sides[j];

          // console.log(storedDiceSide.value);

          let newDiceSide = new DiceSide(storedDiceSide.value, -1, storedDiceSide.cost);

          newDice.changeSideValue(j, newDiceSide);
        }

        this.addDice(newDice);
      }

      // Array of dice sides
      for (let i = 0; i < player.diceSideArray.length; i++) {
        let storedDiceSide = player.diceSideArray[i];
        let newDiceSide = new DiceSide(storedDiceSide.value, -1, storedDiceSide.cost);

        this.diceSideArray.push(newDiceSide);
      }

      // Arrays of Collectibles
      // this.boonArray = player.boonArray;
      // for (let i = 0; i < player.boonArray.length; i++) {
      //   // Make new boon from the generic object's stored property
      //   let newBoon = boonArray[player.boonArray[i].name];

      //   this.addBoon(newBoon);
      // }
      for (let key in player.boonArray) {
        if (player.boonArray.hasOwnProperty(key)) {
          if (key != 'cuppaJoe') {
            let newBoon = boonArray[player.boonArray[key].name];
            this.addBoon(newBoon);
          } else {
            let newBoon = boonArray['cuppaJoe'];
            for (let i = 0; i < player.boonArray['cuppaJoe'].length; i++) {
              if (!this.boonArray[newBoon.name]) {
                // First cuppaJoe
                this.boonArray[newBoon.name] = [newBoon];
              } else {
                // Player already has a cuppaJoe
                this.boonArray[newBoon.name].push(newBoon);
              }
            }
          }
        }
      }

      // this.items = player.items;
      // for (let i = 0; i < player.items.length; i++) {
      //   // Make new boon from the generic object's stored property
      //   let newItem = new Dice(player.items[i].typeOf);
      //   newItem.name = newItem.typeOf;
      //   this.addItem(newItem);
      // }
      for (let key in player.items) {
        if (player.items.hasOwnProperty(key)) {
          if (key != 'supplement') {
            // If the subarray ISN'T of type supplement, it's a dice
            for (let i = 0; i < player.items[key].length; i++) {
              let newItem = new Dice(player.items[key][i].typeOf);
              newItem.name = newItem.typeOf;
              this.addItem(newItem);
            }
          } else {
            // subarray is for type supplement
            for (let i = 0; i < player.items[key].length; i++) {
              let newSupplement = new Consumable(player.items[key][i].bonus);
              this.addItem(newSupplement);
            }
          }
        }
      }

      // Active boons
      // this.estusFlask = player.estusFlask;

      this.wave = player.wave;
    }
  }

  addItem(item) {
    if (!this.items[item.name]) {
      this.items[item.name] = [];
    }
    this.items[item.name].push(item);
  }

  useItem(itemName) {
    if (this.items[itemName] && this.items[itemName].length > 0) {
      const item = this.items[itemName].pop(); // Get and removes the item
      // item.applyEffects(this);
      // console.log(`${this.name} used ${item.name}.`);
    } else {
      // console.log(`No ${itemName} found in inventory.`);
    }
  }

  addDice(dice) {
    this.diceArray.push(dice);
  }

  addBoon(boon) {
    // (consumable.typeOf == "Virtue") ? this.virtueArray.push(consumable) : this.viceArray.push(consumable);
    // this.boonArray.push(boon);
    if (boon.name != 'cuppaJoe') {
      this.boonArray[boon.name] = boon;
      this.boonArrayLength += 1;
    } else {
      // Boon is a cuppaJoe, add it to subarray so player can have multiple
      if (!this.boonArray[boon.name]) {
        // First cuppaJoe
        this.boonArray[boon.name] = [boon];
      } else {
        // Player already has a cuppaJoe
        this.boonArray[boon.name].push(boon);
      }
    }
  }

  damageStamina(damage) {
    if (damage >= this.stamina) {
      // Too much damage, handle game ending
    } else {
      this.stamina -= damage;
    }
  }

  changeStamina(delta) {
    if (this.stamina + delta >= this.maxStamina) {
      this.stamina = this.maxStamina;
    } else if (this.stamina + delta <= 0) {
      // Run ends, save player object and direct to gameOver screen
      console.log("Player loses!");
      this.stamina += delta;
    } else {
      this.stamina += delta;
    }
  }

  subtractCurrency(toSubtract) {
    // Function reduces currency and returns true if player has enough
    // Returns false if player doesn't have enough
    if (this.currency >= toSubtract) {
      this.currency -= toSubtract;
      return true;
    } else {
      return false;
    }
  }

  getConsumableCount() {
    let playerConsumableCount = 0;
    for (let key in this.items) {
      if (this.items.hasOwnProperty(key)) {
        for (let i = 0; i < this.items[key].length; i++) {
          playerConsumableCount++;
        }
      }
    }
    return playerConsumableCount;
  }

  isOutOfStamina() {
    return (this.stamina <= 0);
  }
}