function init() {

  class DOMAccess {
    constructor(someParameterVariable, stuff) {
      this.exampleProperty = someParameterVariable;
      this.stuff = stuff;
    }

    logoPicCannon = document.querySelector("#zimmerArtillery");
    testPic = document.querySelector("#testPic");

    anotherProperty = {
      property1: 12
    };

    stillAnotherProperty = 25;

    doStuff() {
      // let primaryContentDiv = document.querySelector("#primaryContent");

      // primaryContentDiv.className = "joe";

      // console.log(`last paragraph = ${document.querySelector("#motd > p:last-child").innerText}`);

      let d20 = new Dice("d20");
      console.log(d20.roll());
    };

    static getClicked() {  
      //console.log("your did it");
      testPic.style.backgroundColor = "blue";
    }
  }

  // Functional baseline code below
  class Dice {
    // TODO: Figure out making things private and make getters/setters

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
  }

  class Game { 
    // TODO: Figure out making things private and make getters/setters
    // TODO: Difficulty scaling, all other game 'run-specific' elements
    // Also will host all game related functions, such as rolling player's dice and calculating damage, buying shop items, etc.
    difficulty = 1; // Scaling modifier that increases to scale enemy health and damage
  }

  class Collectibles {
    // TODO: Figure out making things private and make getters/setters
    // Object for all vices/virtues the player collects
    typeOf = ""; // "Vice" or "Virtue"
  }

  let domAccessClassInstance = new DOMAccess("Hello there", 50);

  // console.log(`Message from DOMAccess class: ${domAccessClassInstance.exampleProperty} and stuff property ${domAccessClassInstance.stuff}`);

  domAccessClassInstance.doStuff();

  DOMAccess.testPic/addEventListener("click", DOMAccess.getClicked);
}

window.onload = init;
