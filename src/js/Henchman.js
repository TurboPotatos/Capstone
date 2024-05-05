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

export const henchArray = {
  "Beetle" : "url(src/media/Henchmen/henchman_beetle_hurt.png), url(src/media/texture2.png)",
  "Bokoblin" : "url(src/media/Henchmen/henchman_bokoblin.png), url(src/media/texture2.png)",
  "Ghost" : "url(src/media/Henchmen/henchman_ghost_hurt.png), url(src/media/texture2.png)",
  "Goomba" : "url(src/media/Henchmen/henchman_goomba_hurt.png), url(src/media/texture2.png)",
  "Grunt" : "url(src/media/Henchmen/henchman_grunt_hurt.png), url(src/media/texture2.png)",
  "Henchman 24" : "url(src/media/Henchmen/henchman_henchman24.png), url(src/media/texture2.png)",
  "Iago" : "url(src/media/Henchmen/henchman_iago_hurt.png), url(src/media/texture2.png)",
  "Pain and Panic" : "url(src/media/Henchmen/henchman_imps_hurt.png), url(src/media/texture2.png)",
  "Koopa Troopa" : "url(src/media/Henchmen/henchman_koopaTroopa_hurt.png), url(src/media/texture2.png)",
  "Minion" : "url(src/media/Henchmen/henchman_megaMinion.png), url(src/media/texture2.png)",
  "Minion" : "url(src/media/Henchmen/henchman_minion_hurt.png), url(src/media/texture2.png)",
  "Space Invader" : "url(src/media/Henchmen/henchman_spaceInvader_hurt.png), url(src/media/texture2.png)",
  "Storm Trooper" : "url(src/media/Henchmen/henchman_stormtrooper.png), url(src/media/texture2.png)",
  "Turret" : "url(src/media/Henchmen/henchman_turret_hurt.png), url(src/media/texture2.png)",
  // "Actually Satan" : "url(src/media/Henchmen/boss_actuallySatan_hurt.png), url(src/media/texture2.png)",
  // "Actually Satan2" : "url(src/media/Henchmen/boss_actuallySatan.png), url(src/media/texture2.png)",
};

export let henchNameArray = [];
for (let key in henchArray) {
  henchNameArray.push(key);
}