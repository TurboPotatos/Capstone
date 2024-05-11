export class Henchman {
  // TODO: Figure out making things private and make getters/setters
  // Figure out health and damage

  name = "";
  threshold = 0;
  range = 0;
  staminaPenalty = 0;
  staminaReward = 0;
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
    // this.health = Math.floor(Math.random() * 9) + 50;
    this.health = 97;
    this.threshold = 10 + wave;
    this.range = 3;
    this.staminaPenalty = 10 + wave;
    this.staminaReward = 30 + wave;
    this.healingFactor = 15;

    this.maxHealth = 100 + wave;
    this.damage = 5;
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

      if (this.isFullHealth()) {
        // henchman fully healed, handle that
      }
    }

  }

  isDead() {
    return (this.health <= 0);
  }

  isFullHealth() {
    return (this.maxHealth <= this.health);
  }
}

export const henchPicArray = {
  "Beetle" : "url(src/media/Henchmen/henchman_beetle_hurt.png), url(src/media/texture2.png)",
  "B1 Battle Droid" : "url(src/media/Henchmen/henchman_battleDroid_hurt.png), url(src/media/texture2.png)",
  "Bokoblin" : "url(src/media/Henchmen/henchman_bokoblin_hurt.png), url(src/media/texture2.png)",
  "Pinky" : "url(src/media/Henchmen/henchman_ghost_hurt.png), url(src/media/texture2.png)",
  "Goomba" : "url(src/media/Henchmen/henchman_goomba_hurt.png), url(src/media/texture2.png)",
  "Grunt" : "url(src/media/Henchmen/henchman_grunt_hurt.png), url(src/media/texture2.png)",
  "Henchman 24" : "url(src/media/Henchmen/henchman_henchman24_hurt.png), url(src/media/texture2.png)",
  "Iago" : "url(src/media/Henchmen/henchman_iago_hurt.png), url(src/media/texture2.png)",
  "Pain and Panic" : "url(src/media/Henchmen/henchman_imps_hurt.png), url(src/media/texture2.png)",
  "Koopa Troopa" : "url(src/media/Henchmen/henchman_koopaTroopa_hurt.png), url(src/media/texture2.png)",
  "Minion" : "url(src/media/Henchmen/henchman_megaMinion_hurt.png), url(src/media/texture2.png)",
  "Stuart the Minion" : "url(src/media/Henchmen/henchman_minion_hurt.png), url(src/media/texture2.png)",
  "Space Invader" : "url(src/media/Henchmen/henchman_spaceInvader_hurt.png), url(src/media/texture2.png)",
  "Storm Trooper" : "url(src/media/Henchmen/henchman_stormtrooper_hurt.png), url(src/media/texture2.png)",
  "Turret" : "url(src/media/Henchmen/henchman_turret_hurt.png), url(src/media/texture2.png)",
};

export const bossPicArray = {
  "Satan Himself" : "url(src/media/Henchmen/boss_actuallySatan_hurt.png), url(src/media/texture2.png)",
  "Bowser" : "url(src/media/Henchmen/boss_bowser_hurt.png), url(src/media/texture2.png)",
  "GLaDOS" : "url(src/media/Henchmen/boss_glados_hurt.png), url(src/media/texture2.png)",
};

export let henchArray = {};
export let henchNameArray = [];
for (let key in henchPicArray) {
  henchNameArray.push(key);
  henchArray[key] = new Henchman(key, 0);
}


function respecHenchman(henchman, threshold, range, staminaPenalty, healingFactor, health, maxHealth, damage, 
                       scoreGiven, currencyGiven, staminaReward) {

  henchman.threshold = threshold;
  henchman.range = range;
  henchman.staminaPenalty = staminaPenalty;
  henchman.healingFactor = healingFactor;
  henchman.health = health;
  henchman.maxHealth = maxHealth;
  henchman.damage = damage;
  henchman.scoreGiven = scoreGiven;
  henchman.currencyGiven = currencyGiven;
  henchman.staminaReward = staminaReward;
}

// threshold, range, staminaPenalty, healingFactor, health, maxHealth, damage, scoreGiven, currencyGiven, staminaReward
respecHenchman(henchArray['Grunt'], 15, 0, 5, 25, 25, 50, 5, 100, 20, 30);
respecHenchman(henchArray['Beetle'], 10, 4, 10, 20, 30, 80, 15, 100, 30, 30);
respecHenchman(henchArray['Bokoblin'], 7, 2, 8, 10, 25, 40, 10, 100, 20, 30);
respecHenchman(henchArray['Space Invader'], 15, 5, 15, 5, 5, 10, 5, 100, 20, 30);
respecHenchman(henchArray['Stuart the Minion'], 12, 3, 10, 12, 20, 100, 10, 100, 20, 30);
respecHenchman(henchArray['Turret'], 9, 3, 8, 10, 25, 75, 30, 100, 20, 30);
respecHenchman(henchArray['Koopa Troopa'], 5, 2, 10, 8, 30, 60, 10, 100, 20, 30);

// console.log(henchArray['Grunt']);