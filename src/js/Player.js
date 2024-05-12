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

  // Player stats
  totalHealed = 0;
  totalKilled = 0;
  totalCurrency = 0;

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
      this.maxSupplements = player.maxSupplements;
      
      // Array of dice
      for (let i = 0; i < player.diceArray.length; i++) {
        // Make new dice from the info in the stored generic objects
        let newDice = new Dice(player.diceArray[i].typeOf);

        for (let j = 0; j < player.diceArray[i].sides.length; j++) {
          let storedDiceSide = player.diceArray[i].sides[j];

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
              // console.log(player.items[key]);
              if (player.items[key][i]) {
                let newSupplement = new Consumable(player.items[key][i].bonus);
                this.addItem(newSupplement);
              }
            }
          }
        }
      }

      this.wave = player.wave;
      this.totalHealed = player.totalHealed;
      this.totalKilled = player.totalKilled;
      this.totalCurrency = player.totalCurrency;
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
    } else {
      console.log(`No ${itemName} found in inventory.`);
    }
  }

  addDice(dice) {
    this.diceArray.push(dice);
  }

  addBoon(boon) {
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
//#region [medicalLicense]
    if (this.boonArray['medicalLicense'] && delta < 0) {
      this.addCurrency(this.boonArray['medicalLicense'].effects.currencyGain);
    }
//#endregion
  }

  addCurrency(currencyToAdd) {
//#region [elderScroll]
    if (this.boonArray['elderScroll']) {
      currencyToAdd += this.boonArray['elderScroll'].effects.goldBonus;
    }
//#endregion

    this.currency += currencyToAdd;
    this.incrementCurrencyCount(currencyToAdd);
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

  getSupplementCount() {
    let playerConsumableCount = 0;
    for (let key in this.items) {
      if (this.items.hasOwnProperty(key) && key == "supplement") {
        for (let i = 0; i < this.items[key].length; i++) {
          playerConsumableCount++;
        }
      }
    }
    return playerConsumableCount;
  }

  getSpecialDiceCount() {
    let playerConsumableCount = 0;
    for (let key in this.items) {
      if (this.items.hasOwnProperty(key) && key != "supplement") {
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

  incrementKillCount() {
    this.totalKilled++;
  }

  incrementHealCount() {
    this.totalHealed++;
  }

  incrementCurrencyCount(currencyGained) {
    this.totalCurrency += currencyGained;
  }
}