export class Henchmen {
  // TODO: Figure out making things private and make getters/setters
  // Figure out health and damage

  name = "";
  threshold = 0;
  staminaPenalty = 0;
  healingFactor = 0;

  health = 0;
  maxHealth = 0;
  damage = 0;
  scoreGiven = 0; // Could decrease as the player takes more damage, as a 'penalty'
  currencyGiven = 0;
  // typeOf = ""; // To be implimented later for the optional rock-paper-scissors
  weakness = 0; // A possible number that would damage the minion rather than heal

  constructor(name, wave) { // Multipliers to be modified later

    this.name = name;
    this.health = Math.floor(Math.random() * 9) + 50;
    this.threshold = 7 + wave;
    this.staminaPenalty = 10 + wave;
    this.healingFactor = 15;

    this.maxHealth = 100 + wave;
    this.damage = 10 + wave;
    this.currencyGiven = 8 +(3 * wave);
    this.scoreGiven = 100 + (20 * wave);
  }

  healingAmount(typeOf, healing) {
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
    if (this.maxHealth <= this.health) {
      return true;
    } else {
      return false;
    }
  }
}