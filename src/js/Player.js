import { DiceSide } from "./DiceSide.js";
import { Dice } from "./Dice.js";
import { Boon } from "./Boon.js";
import { boonArray } from "./Boon.js";

export class Player {

  // Player properties
  currency = 0;
  stamina = 50;
  score = 0;
  
  // Array of dice
  diceArray = [];

  // Array of dice sides
  diceSideArray = [];

  // Arrays of Collectibles
  boonArray = {};
  items = [];

  // Active boons
  estusFlask = false;

  constructor(player) {

    if (player !== undefined) {
      // Player properties
      this.currency = player.currency;
      this.stamina = player.stamina;
      this.score = player.score;

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
          let newBoon = boonArray[player.boonArray[key].name];
          this.addBoon(newBoon);
        }
      }

      // this.items = player.items;
      // for (let i = 0; i < player.items.length; i++) {
      //   // Make new boon from the generic object's stored property
      //   let newBoon = boonArray[player.items[i].name];

      //   this.addBoon(newBoon);
      // }

      // Active boons
      // this.estusFlask = player.estusFlask;
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
      item.applyEffects(this);
      console.log(`${this.name} used ${item.name}.`);
    } else {
      console.log(`No ${itemName} found in inventory.`);
    }
  }

  addDice(dice) {
    this.diceArray.push(dice);
  }

  addBoon(boon) {
    // (consumable.typeOf == "Virtue") ? this.virtueArray.push(consumable) : this.viceArray.push(consumable);
    // this.boonArray.push(boon);
    this.boonArray[boon.name] = boon;
  }

  damageStamina(damage) {
    if (damage >= this.stamina) {
      // Too much damage, handle game ending
    } else {
      this.stamina -= damage;
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
}