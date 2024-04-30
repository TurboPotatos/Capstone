import { DiceSide } from "./DiceSide.js";

export class Dice {
  // TODO: Figure out making things private and make getters/setters

  static diceOptions = ["d4", "d6", "d8", "d10", "d12", "d20"];

  sides = [];
  typeOf = ""; // d4, d6, d8, d10, d12, d20

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
      case "d12":
        numOfSides = 12;
        break;
      case "d20":
        numOfSides = 20;
        break;
      default:
        numOfSides = 6;
        this.typeOf = "d6";
        break;
    }


    for (let i = 1; i < numOfSides + 1; i+=1) {
      this.sides.push(new DiceSide(i, 0));
    }

  }

  // Return a random value from the sides[] array
  roll() {
    return this.sides[Math.ceil(Math.random() * this.sides.length) - 1].value;
  }
  
  // Change a value in the sides[] array at specified index
  changeSideValue(sideIndex, newDiceSide) {
    let tempDiceSide = this.sides[sideIndex];
    this.sides[sideIndex] = newDiceSide;
    return tempDiceSide;

    // Assuming javascript has issues with the code above, go the cheap way
    this.sides[sideIndex].value = newDiceSide;
  }
}