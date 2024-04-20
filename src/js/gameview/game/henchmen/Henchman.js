export class Henchmen {
  // TODO: Figure out making things private and make getters/setters
  // Figure out health and damage
  health = 0;
  maxHealth = 0;
  damage = 0;
  scoreGiven = 0; // Could decrease as the player takes more damage, as a 'penalty'
  currencyGiven = 0;
  // typeOf = ""; // To be implimented later for the optional rock-paper-scissors
  weakness = 0; // A possible number that would damage the minion rather than heal

  constructor(difficulty) { // Multipliers to be modified later
    this.maxHealth = 100*difficulty;
    this.damage = 10*difficulty;
    this.currencyGiven = 8*difficulty;
    this.scoreGiven = 100*difficulty;
  }

  healingDealt(typeOf, healing) {
    // typeOf to be implimented later as types of damage

    if (healing == weakness) {
      // If the attempted healing is their weakness
      
      if (health - healing <= 0) {
        // henchman dies, handle that
        this.henchmenDies();
      } else {
        health -= healing;
      }
    } else {

      health += healing;

      if (health >= maxHealth) {
        // henchman fully healed, handle that
        this.henchmenFull();
      }
    }

  }

  henchmenDies() {

  }

  henchmenFull() {

  }
}