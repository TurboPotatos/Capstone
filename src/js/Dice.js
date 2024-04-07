export class Dice {
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