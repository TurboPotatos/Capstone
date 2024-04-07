export class Collectibles {
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