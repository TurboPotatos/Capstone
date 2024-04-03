class Dice {
  // TODO: Figure out making things private and make getters/setters

  static diceOptions = ["d4", "d6", "d8", "d10", "d%", "d12", "d20"];

  sides = [];
  typeOf = ""; // d4, d6, d8, d10, d%, d12, d20

  // Construct a dice object with a populated sides[] array
  constructor(typeOf) {
    let numOfSides;
    this.typeOf = typeOf;
    
    switch (typeOf) {
      case "d4":
        numOfSides = 4;
        break;
      case "d6":
        numOfSides = 6;
        break;
      case "d8":
        numOfSides = 8;
        break;
      case "d10":
        numOfSides = 10;
        break;
      case "d%":
        numOfSides = 10;
        break;
      case "d12":
        numofSides = 12;
        break;
      case "d20":
        numOfSides = 20;
        break;
      default:
        numOfSides = 6;
        this.typeOf = "d6";
        break;
    }

    if (this.typeOf != "d%") {
      for (let i = 0; i < numOfSides; i+=1) {
        this.sides[i] = i + 1;
      }
    } else {
      for (let i = 0; i < numOfSides; i+=1) {
        this.sides[i] = (i + 1) * 10;
      }
    }
  }

  // Return a random value from the sides[] array
  roll() {
    let rand = Math.random();
    rand *= this.sides.length;
    return this.sides[Math.ceil(rand) - 1];
  }
  
  // Change a value in the sides[] array at specified index
  changeSideValue(sideIndex, sideValue) {
    this.sides[sideIndex] = sideValue;
  }
}

class Henchmen {
  // TODO: Figure out making things private and make getters/setters
  // Figure out health and damage
  health = 0;
  maxHealth = 0;
  damage = 0;
  scoreGiven = 0; // Could decrease as the player takes more damage, as a 'penalty'
  currencyGiven = 0;
  // typeOf = ""; // To be implimented later for the optional rock-paper-scissors

  constructor(difficulty) { // Multipliers to be modified later
    this.maxHealth = 100*difficulty;
    this.damage = 10*difficulty;
    this.currencyGiven = 8*difficulty;
    this.scoreGiven = 100*difficulty;
  }
}

class Player {
  // TODO: Figure out making things private and make getters/setters
  // TODO: Figure out currency, score, health, etc.
  // difficulty scaling modifier, goes up (linearly?, exponentially?, idk)

  // Player properties
  currency = 0;
  stamina = 50;
  score = 0;
  
  // Array of dice types
  d4Array = [];
  d6Array = [];
  d8Array = [];
  d10Array = [];
  dPercentArray = [];
  d126Array = [];
  d206Array = [];

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
      case "d%":
        this.dPercentArray.push(dice);
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
    if (damage >= this.stamina) {
      // Too much damage, handle game ending
    } else {
      this.stamina -= damage;
    }
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

class Game { 
  // TODO: Figure out making things private and make getters/setters
  // TODO: Difficulty scaling, all other game 'run-specific' elements
  // Also will host all game related functions, such as rolling player's dice and calculating damage, buying shop items, etc.
  difficulty = 1; // Scaling modifier that increases to scale enemy health and damage

  // Array to hold henchmen objects for a wave
  waveHenchmen = [];

  gameConsole = ""; // RENAME. String variable to output what each dice player has rolls

  player = new Player();

  constructor(difficulty) {
    // Theory code for difficulty options
    // More considerations for difficulty increasing is less currency generated
    // switch (difficulty) {
    //   case "Normal":
    //     this.difficulty = 1.5;
    //     break;
    //   case "Hard":
    //     this.difficulty = 3;
    //     break;
    //   default:
    //     this.difficulty = 1;
    //     break;
    // }
    this.difficulty = 1.2;
  }

  createNewWave() {
    for (i = 0; i < 10; i++){
      this.waveHenchmen.push(new Henchmen(this.difficulty));
    }
    // Alter last to be stronger 'boss' henchmen with more health
    this.waveHenchmen[9].maxHealth *= 10;
  }

}

class Collectibles {
  // TODO: Figure out making things private and make getters/setters
  // Object for all vices/virtues the player collects

  typeOf = ""; // "Vice" or "Virtue"
  
  diceType = "";
  diceOperation = "";
  diceModifier = 0;

  constructor(typeOf, diceType, diceModifier, diceOperation) {
    this.typeOf = typeOf;
    this.diceType = diceType;
    this.diceModifier = diceModifier;
    this.diceOperation = diceOperation;
  }

  // Changing modifiers
  alterModifier(diceModifier, diceOperation) {
    this.diceModifier = diceModifier;
    this.diceOperation = diceOperation;
  }
  
}