import { StaminaComponent } from "../components/StaminaComponent.js";

export class Player {
  // TODO: Figure out making things private and make getters/setters
  // TODO: Figure out currency, score, etc.
  // difficulty scaling modifier, goes up (linearly?, exponentially?, idk)
  
  //use 50 stamina as starting max for now.
  staminaComponent = new StaminaComponent(50, true);
  
  // Player properties
  currency = 0;
  score = 0;
  
  // Array of dice types
  d4Array = [];
  d6Array = [];
  d8Array = [];
  d10Array = [];
  d12Array = [];
  d20Array = [];

  // Arrays of Collectibles
  virtueArray = [];
  viceArray = [];

  addDice(dice) {
    switch (dice.typeOf) {
      case "d4":
        this.d4Array.push(dice);
        break;
      case "d6":
        this.d6Array.push(dice);
        break;
      case "d8":
        this.d8Array.push(dice);
        break;
      case "d10":
        this.d10Array.push(dice);
        break;
      case "d12":
        this.d12Array.push(dice);
        break;
      case "d20":
        this.d20Array.push(dice);
        break;
      default:
        this.d6Array.push(dice);
        break;
    }
  }

  addConsumable(consumable) {
    (consumable.typeOf == "Virtue") ? this.virtueArray.push(consumable) : this.viceArray.push(consumable);
  }

  damageStamina(damage) {
    this.staminaComponent.changeStamina(damage);
  }

  subtractCurrency(toSubtract) {
    // Function reduces currency and returns true if player has enough
    // Returns false if player doesn't have enough
    if (currency >= toSubtract) {
      currency -= toSubtract;
      return true;
    } else {
      return false;
    }
  }
}