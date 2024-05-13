export class Henchman {

  name = "";
  threshold = 0;
  range = 0;
  staminaPenalty = 0;
  staminaReward = 0;
  healingFactor = 0;

  health = 0;
  maxHealth = 0;
  damage = 0;
  scoreGiven = 0;
  currencyGiven = 0;

  constructor(name, wave) {

    this.name = name;
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

export const healedPicArray = {
  "Beetle" : "url(src/media/Henchmen/henchman_beetle.png), url(src/media/texture2.png)",
  "B1 Battle Droid" : "url(src/media/Henchmen/henchman_battleDroid.png), url(src/media/texture2.png)",
  "Bokoblin" : "url(src/media/Henchmen/henchman_bokoblin.png), url(src/media/texture2.png)",
  "Pinky" : "url(src/media/Henchmen/henchman_ghost.png), url(src/media/texture2.png)",
  "Goomba" : "url(src/media/Henchmen/henchman_goomba.png), url(src/media/texture2.png)",
  "Grunt" : "url(src/media/Henchmen/henchman_grunt.png), url(src/media/texture2.png)",
  "Henchman 24" : "url(src/media/Henchmen/henchman_henchman24.png), url(src/media/texture2.png)",
  "Iago" : "url(src/media/Henchmen/henchman_iago.png), url(src/media/texture2.png)",
  "Pain and Panic" : "url(src/media/Henchmen/henchman_imps.png), url(src/media/texture2.png)",
  "Koopa Troopa" : "url(src/media/Henchmen/henchman_koopaTroopa.png), url(src/media/texture2.png)",
  "Minion" : "url(src/media/Henchmen/henchman_megaMinion.png), url(src/media/texture2.png)",
  "Stuart the Minion" : "url(src/media/Henchmen/henchman_minion.png), url(src/media/texture2.png)",
  "Space Invader" : "url(src/media/Henchmen/henchman_spaceInvader.png), url(src/media/texture2.png)",
  "Storm Trooper" : "url(src/media/Henchmen/henchman_stormtrooper.png), url(src/media/texture2.png)",
  "Turret" : "url(src/media/Henchmen/henchman_turret.png), url(src/media/texture2.png)",
};

export const bossPicArray = {
  "Bowser" : "url(src/media/Henchmen/boss_bowser_hurt.png), url(src/media/texture2.png)",
  "GLaDOS" : "url(src/media/Henchmen/boss_glados_hurt.png), url(src/media/texture2.png)",
  "Satan Himself" : "url(src/media/Henchmen/boss_actuallySatan_hurt.png), url(src/media/texture2.png)",
};

export const healedBossPicArray = {
  "Bowser" : "url(src/media/Henchmen/boss_bowser.png), url(src/media/texture2.png)",
  "GLaDOS" : "url(src/media/Henchmen/boss_glados.png), url(src/media/texture2.png)",
  "Satan Himself" : "url(src/media/Henchmen/boss_actuallySatan.png), url(src/media/texture2.png)",
};

export let henchArray = {};
export let henchNameArray = [];
for (let key in henchPicArray) {
  henchNameArray.push(key);
  henchArray[key] = new Henchman(key, 0);
}

export let bossArray = {};
export let bossNameArray = [];
for (let key in bossPicArray) {
  bossNameArray.push(key);
  bossArray[key] = new Henchman(key, 0);
}


export function respecHenchman(henchman, threshold, range, staminaPenalty, healingFactor, health, maxHealth, damage, 
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

// 1 threshold, 2 range,
// 3 staminaPenalty, 4 healingFactor, 
// 5 health, 6 maxHealth, 
// 7 damage, 
// 8 scoreGiven, 9 currencyGiven, 10 staminaReward
respecHenchman(henchArray["Goomba"],             5, 3,    5, 5,     3, 15,     2,    100, 10, 10); 
respecHenchman(henchArray["Bokoblin"],           7, 2,    8, 12,    6, 25,     10,   110, 11, 20); 
respecHenchman(henchArray["Stuart the Minion"],  12, 3,   15, 12,   12, 30,    5,    120, 13, 20); 
respecHenchman(henchArray["Beetle"],             10, 4,   10, 20,   20, 50,    15,   130, 17, 25); 
respecHenchman(henchArray["Space Invader"],      15, 5,   15, 5,    5, 10,     5,    150, 25, 30); 

respecHenchman(henchArray["Koopa Troopa"],       15, 1,   20, 10,   30, 60,    11,   140, 20, 35); 
respecHenchman(henchArray["Grunt"],              15, 0,   5, 24,    40, 80,    10,   160, 25, 40); 
respecHenchman(henchArray["B1 Battle Droid"],    20, 4,   19, 10,   12, 50,    1,    170, 30, 20); 
respecHenchman(henchArray["Pinky"],              25, 3,   15, 5,    1, 20,     7,    180, 31, 50);
respecHenchman(henchArray["Pain and Panic"],     22, 1,   10, 20,   20, 150,   15,   190, 34, 30);

respecHenchman(henchArray["Turret"],             30, 3,   15, 25,   25, 75,    30,   200, 40, 30);
respecHenchman(henchArray["Storm Trooper"],      25, 1,   25, 19,   20, 100,   20,   210, 42, 30);
respecHenchman(henchArray["Iago"],               40, 2,   20, 5,    3, 25,     7,    220, 45, 40);
respecHenchman(henchArray["Minion"],             50, 3,   15, 99,   100, 500,  50,   230, 50, 40); 
respecHenchman(henchArray["Henchman 24"],        24, 2,   24, 24,   24, 240,   24,   240, 48, 24); 


// Fill out bosses
// 1 threshold, 2 range,
// 3 staminaPenalty, 4 healingFactor, 
// 5 health, 6 maxHealth, 
// 7 damage, 
// 8 scoreGiven, 9 currencyGiven, 10 staminaReward
respecHenchman(bossArray["Bowser"],               15, 2,   4, 40,   3,  300,   17,   350, 75, 40); 
respecHenchman(bossArray["GLaDOS"],               18, 4,   4, 40,   45, 260,   30,   310, 68, 40); 
respecHenchman(bossArray["Satan Himself"],        30, 6,   4, 40,   15, 320,   48,   370, 85, 40); 


export const wave1 = ["Goomba","Bokoblin","Stuart the Minion","Beetle","Space Invader", "GLaDOS"];
export const wave2 = ["Koopa Troopa","Grunt","B1 Battle Droid","Pinky","Pain and Panic", "Satan Himself"];
export const wave3 = ["Turret","Storm Trooper","Iago","Minion","Henchman 24", "Bowser"];

export const waves = [wave1, wave2, wave3];