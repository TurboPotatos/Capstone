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
  boonArray = [];
  items = [];

  // Active boons
  estusFlask = false;

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
    this.boonArray.push(boon);
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