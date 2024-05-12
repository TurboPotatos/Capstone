export class Boon {
  
  constructor(name, description, effects, filePath) {
    this.name = name;
    this.description = description;
    this.effects = effects;
    this.filePath = filePath;
  }

  applyEffects(player) {
    if (this.effects.staminaRestore) {
      player.stamina += this.effects.staminaRestore;
    }
    if (this.effects.acquireCurrency) {
      player.currency += this.effects.acquireCurrency;
    }
    if (this.effects.estusFlask) {
      player.estusFlask += this.effects.estusFlask;
    }
  }
  
}

const boonArray = {

  "beamSword" : // IMPLEMENTED
  new Boon( "beamSword", 
            "Beam Sword: <br><br>50% chance to heal for +5 when you exceed the taget by a factor of 2", 
            {healChance: 0.5, thresholdFactor: 2, healAmount: 5}, 
            "src/media/Boons/boon_beamSword.png"),

  "chaosEmerald" : // IMPLEMENTED
  new Boon( "chaosEmerald", 
            "Chaos Emerald: <br><br>Gain 15 currency whenever you enter the shop",
            {currencyBonus: 15},
            "src/media/Boons/boon_chaosEmerald.png"),

  "companionCube" : // IMPLEMENTED
  new Boon( "companionCube", 
            "Companion Cube: <br><br>50% chance for d4s to roll double, otherwise they roll half", 
            {d4Multiplier: 2, odds: 0.5, otherwise: 0.5}, 
            "src/media/Boons/boon_companionCube.png"),

  "crowbar" : // IMPLEMENTED
  new Boon( "crowbar", 
            "Crowbar: <br><br>If you would lose more than 10 stamina from resetting, you lose 10 instead", 
            {staminaLost: 10}, 
            "src/media/Boons/boon_crowbar.png"),

  "diamondPickaxe" : // IMPLEMENTED
  new Boon( "diamondPickaxe", 
            "Diamond Pickaxe: <br><br>+5 to all rolls, but you can only roll 1 die at a time", 
            {rollBonus: 5, MaxRolledDice: 1}, 
            "src/media/Boons/boon_diamondPickaxe.png"),

  "elderScroll" : // IMPLEMENTED
  new Boon( "elderScroll", 
            "Elder Scroll: <br><br>Henchmen are worth +3 currency when fully healed", 
            {goldBonus: 3}, 
            "src/media/Boons/boon_elderScroll.png"),

  "estusFlask" : // IMPLEMENTED
  new Boon( "estusFlask", 
            "Estus Flask: <br><br>+3 to your first roll after resetting your dice", 
            {rollBonus: 3, bonusActive: false}, 
            "src/media/Boons/boon_estusFlask.png"),

  "gloves" : // IMPLEMENTED
  new Boon( "gloves", 
            "Gloves: <br><br>Overhealing a henchman recovers your stamina by half that amount", 
            {staminaRestore: 0.5}, 
            "src/media/Boons/boon_gloves.png"),

  "goggles" : // IMPLEMENTED
  new Boon( "goggles", 
            "Goggles: <br><br>d10s get +2 to each roll", 
            {d10Bonus: 2}, 
            "src/media/Boons/boon_goggles.png"),

  "labCoat" : // IMPLEMENTED
  new Boon( "labCoat", 
            "Lab Coat: <br><br>When you only roll one die, you roll it twice and take the higher number", 
            {advantage: true}, 
            "src/media/Boons/boon_labCoat.png"),

  "medicalBag" : // IMPLEMENTED
  new Boon( "medicalBag", 
            "Medical Bag: <br><br>+20 max stamina", 
            {maxStamina: 20}, 
            "src/media/Boons/boon_medicalBag.png"),

  "mushroom" : // IMPLEMENTED
  new Boon( "mushroom", 
            "Mushroom: <br><br>Henchmen start with +10 health", 
            {bonusHealth: 10}, 
            "src/media/Boons/boon_mushroom.png"),

  "nukaCola" : // IMPLEMENTED
  new Boon( "nukaCola", 
            "Nuka Cola: <br><br>Henchman range is increased by 1", 
            {bonusRange: 1}, 
            "src/media/Boons/boon_nukaCola.png"),

  "pillBottle" : // IMPLEMENTED
  new Boon( "pillBottle", 
            "Pill Bottle: <br><br>If you roll doubles when rolling exactly 2 dice, heal the henchman for 75% of its missing health", 
            {numDice: 2, healFor: 0.75}, 
            "src/media/Boons/boon_pillBottle.png"),

  "pokeball" : // IMPLEMENTED
  new Boon( "pokeball", 
            "Pokeball: <br><br>Henchmen take 50% less damage from malpractice", 
            {damageReduction: 0.5}, 
            "src/media/Boons/boon_pokeball.png"),

  "portalGun" : // IMPLEMENTED
  new Boon( "portalGun", 
            "Portal Gun: <br><br>Your dice roll for 13 minus the value of the roll (can be negative)", 
            {inverse: 13}, 
            "src/media/Boons/boon_portalGun.png"),

  "rxPad" : // IMPLEMENTED
  new Boon( "rxPad", 
            "Rx Pad: <br><br>Henchmen heal for 2 after you reset your dice", 
            {healAmount: 2}, 
            "src/media/Boons/boon_rxPad.png"),

  "scalpel" : // IMPLEMENTED
  new Boon( "scalpel", 
            "Scalpel: <br><br>You still get paid when killing a henchman, but lose 50% of your stamina + 10", 
            {percentLost: 0.5, flatLost: 10}, 
            "src/media/Boons/boon_scalpel.png"),

  "scrubs" : // IMPLEMENTED
  new Boon( "scrubs", 
            "Scrubs: <br><br>+3 to henchman healing factor", 
            {healingFactor: 3}, 
            "src/media/Boons/boon_scrubs.png"),

  "star" : // IMPLEMENTED
  new Boon( "star",
            "Star: <br><br>Prevent the first time a henchman would lose health", 
            {preventDamage: true}, 
            "src/media/Boons/boon_star.png"),

  "stethoscope" : // IMPLEMENTED
  new Boon( "stethoscope", 
            "Stethoscope: <br><br>You can have +1 die in your dice tray", 
            {extraDice: 1}, 
            "src/media/Boons/boon_stethoscope.png"),

  "syringe" : // IMPLEMENTED
  new Boon( "syringe", 
            "Syringe: <br><br>Both healing factor and malpractice damage is increased by 50%", 
            {bonus: 0.5}, 
            "src/media/Boons/boon_syringe.png"),

  "tetrisPiece" : // IMPLEMENTED
  new Boon( "tetrisPiece", 
            "Tetris Piece: <br><br>A henchman is considered healed if it's within 5% of its max health", 
            {henchIsHealed: 0.05}, 
            "src/media/Boons/boon_tetrisPiece.png"),

  "thermometer" : // IMPLEMENTED
  new Boon( "thermometer", 
            "Thermometer: <br><br>When you run out of stamina, gain 50% of your max stamina, then this is destroyed", 
            {regainStamina: 0.5}, 
            "src/media/Boons/boon_thermometer.png"),

  "tongueDepressor" : // IMPLEMENTED
  new Boon( "tongueDepressor", 
            "Tongue Depressor: <br><br>Your first dice reset for each henchman costs 0 stamina", 
            {preventLoss: true}, 
            "src/media/Boons/boon_tongueDepressor.png"),

  "cuppaJoe" : // IMPLEMENTED
  new Boon( "cuppaJoe", 
            "Cuppa Joe: <br><br>Restores 50 stamina, increases price of duplicate purchases", 
            {coffeeStaminaRestore: 50, numOwned: 0}, 
            "src/media/Boons/boon_cuppaJoe.png"),

  "medicalLicense" : // IMPLEMENTED
  new Boon( "medicalLicense", 
            "Medical License: <br><br>Allows you to legally practice medicine, and whenever you lose stamina, you gain 3 currency", 
            {canPracticeMedicine: true, currencyGain: 3}, 
            "src/media/Boons/boon_medicalLicense.png"),

  "lollipops" : // IMPLEMENTED
  new Boon( "lollipops", 
            "Lollipops: <br><br>Rolling a 1 on a die heals the henchman for 3", 
            {dieResult: 1, healAmount: 3}, 
            "src/media/Boons/boon_lollipops.png"),

  "goldRing" : // IMPLEMENTED
  new Boon( "goldRing", 
            "Gold Ring: <br><br>Whenever you visit the shop, you gain 20% interest on your currency", 
            {interest: 0.2},
            "src/media/Boons/boon_goldRing.png"),

  "triforce" : // IMPLEMENTED
  new Boon( "triforce", 
            "Triforce: <br><br>If you roll 3 1s in a single roll when rolling exactly 3 dice, fully heal the henchman", 
            {Triforce: true},
            "src/media/Boons/boon_triforce.png"),

  "mask" : // IMPLEMENTED
  new Boon( "mask", 
            "Mask: <br><br>You can see the currency reward value of the current henchman", 
            {mask: true}, 
            "src/media/Boons/boon_mask.png"),

  "reflexHammer" :
  new Boon( "reflexHammer", 
            "Reflex Hammer: <br><br>If you buy this, you are a fool", 
            {reflexHammer: true}, 
            "src/media/Boons/boon_reflexHammer.png"),
  
};

// Export the boons
export { boonArray };

let boonNameArray = [];

Object.keys(boonArray).forEach(function(key) {
  // Add the key to the keysArray
  boonNameArray.push(key);
});

export { boonNameArray };