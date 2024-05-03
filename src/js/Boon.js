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
  // "Health Potion": new Boon("Health Potion", "Restores 50 health", { healthRestore: 50 }),
  // "Strength Potion": new Boon("Strength Potion", "Increases attack power by 10%", { attackBonusPercentage: 0.1 }),
  // "Shield": new Boon("Shield", "Increases defense by 20", { defenseIncrease: 20 }),
  // "Speed Boots": new Boon("Speed Boots", "Increases movement speed", { speedBoost: true }),
  // "Lucky Charm": new Boon("Lucky Charm", "Increases critical hit chance by 10%", { criticalHitChance: 0.1 }),

  // "MONEY!": new Boon("MONEY!", "Chaos Emerald: <br><br>GET 10 MONEY!", { acquireCurrency: 10 }, "src/media/Boons/boon_beamSword.png"),
  // "Stamina Potion": new Boon("Stamina Potion", "Restores 50 stamina", { staminaRestore: 50 }, "src/media/Boons/boon_beamSword.png"),

  "beamSword" : 
  new Boon( "beamSword", 
            "Beam Sword: <br><br>50% chance to heal for +5 when you exceed the threshold by a factor of 2", 
            {healChance: 0.5, thresholdFactor: 2, healAmount: 5}, 
            "src/media/Boons/boon_beamSword.png"),

  "chaosEmerald" : 
  new Boon( "chaosEmerald", 
            "Chaos Emerald: <br><br>When buying a die face of 7 or below, you get an additional one", 
            {faceValue: 7}, 
            "src/media/Boons/boon_chaosEmerald.png"),

  "companionCube" : 
  new Boon( "companionCube", 
            "Companion Cube: <br><br>d4s roll double", 
            {d4Multiplier: 2}, 
            "src/media/Boons/boon_companionCube.png"),

  "crowbar" : 
  new Boon( "crowbar", 
            "Crowbar: <br><br>If you would lose more than 10 stamina, you lose 10 instead", 
            {staminaLost: 10}, 
            "src/media/Boons/boon_crowbar.png"),

  "elderScroll" : 
  new Boon( "elderScroll", 
            "Elder Scroll: <br><br>Henchman are worth +3 gold when fully healed", 
            {goldBonus: 0}, 
            "src/media/Boons/boon_elderScroll.png"),

  "estusFlask" : 
  new Boon( "estusFlask", 
            "Estus Flask: <br><br>+3 to your first roll after resetting your dice", 
            {estusFlask: 3}, 
            "src/media/Boons/boon_estusFlask.png"),

  "gloves" : 
  new Boon( "gloves", 
            "Gloves: <br><br>Overhealing a henchman recovers your stamina by half that amount", 
            {staminaRestore: 0.5}, 
            "src/media/Boons/boon_gloves.png"),

  "goggles" : 
  new Boon( "goggles", 
            "Goggles: <br><br>d10 gets +1 to each roll", 
            {d10Bonus: 1}, 
            "src/media/Boons/boon_goggles.png"),

  "labCoat" : 
  new Boon( "labCoat", 
            "Lab Coat: <br><br>When you only roll one die, you roll it twice and take the higher number", 
            {advantage: true}, 
            "src/media/Boons/boon_labCoat.png"),

  "lollipops" : 
  new Boon( "lollipops", 
            "Lollipops: <br><br>Items in the vending machine cost 20% less", 
            {vendingDiscount: 0.2}, 
            "src/media/Boons/boon_lollipops.png"),

  "mask" : 
  new Boon( "mask", 
            "Mask: <br><br>10% chance to get an additional item from the vending machine", 
            {bonusVendChance: 0.1}, 
            "src/media/Boons/boon_mask.png"),

  "medicalBag" : 
  new Boon( "medicalBag", 
            "Medical Bag: <br><br>+20 max stamina", 
            {maxStamina: 20}, 
            "src/media/Boons/boon_medicalBag.png"),

  "mushroom" : 
  new Boon( "mushroom", 
            "Mushroom: <br><br>Henchmen start with +10 health", 
            {bonusHealth: 10}, 
            "src/media/Boons/boon_mushroom.png"),

  "nukaCola" : 
  new Boon( "nukaCola", 
            "Nuka Cola: <br><br>Ignore the next 2 curses", 
            {ignoreCurses: 2}, 
            "src/media/Boons/boon_nukaCola.png"),

  "pickaxe" : 
  new Boon( "pickaxe", 
            "Pickaxe: <br><br>+5 to all rolls, but you can only roll 1 die at a time", 
            {rollBonus: 5, MaxRolledDice: 1}, 
            "src/media/Boons/boon_pickaxe.png"),

  "pillBottle" : 
  new Boon( "pillBottle", 
            "Pill Bottle: <br><br>If you roll doubles, double the value", 
            {rollMultiplier: 2}, 
            "src/media/Boons/boon_pillBottle.png"),

  "pokeball" : 
  new Boon( "pokeball", 
            "Pokeball: <br><br>Die faces fit any die", 
            {pokeball: true}, 
            "src/media/Boons/boon_pokeball.png"),

  "portalGun" : 
  new Boon( "portalGun", 
            "Portal Gun: <br><br>Your dice roll for (13 minus the value of the roll)", 
            {inverse: 13}, 
            "src/media/Boons/boon_portalGun.png"),

  "reflexHammer" : 
  new Boon( "reflexHammer", 
            "Reflex Hammer: <br><br>If you roll 3 1s in a single roll (using exactly 3 dice), fully heal the henchman", 
            {reflexHammer: true}, 
            "src/media/Boons/boon_reflexHammer.png"),

  "rxPad" : 
  new Boon( "rxPad", 
            "RX Pad: <br><br>If you miss the threshold by over 10, reroll the dice you just rolled", 
            {lowRoll: 10}, 
            "src/media/Boons/boon_rxPad.png"),

  "scalpel" : 
  new Boon( "scalpel", 
            "Scalpel: <br><br>You can have +1 die in your dice tray", 
            {extraDice: 1}, 
            "src/media/Boons/boon_scalpel.png"),

  "scrubs" : 
  new Boon( "scrubs", 
            "Scrubs: <br><br>+1 to henchman healing factor", 
            {healingFactor: 1}, 
            "src/media/Boons/boon_scrubs.png"),

  "star" : 
  new Boon( "star", 
            "Star: <br><br>Prevent the first time a henchman would lose health", 
            {star: true}, 
            "src/media/Boons/boon_star.png"),

  "stethoscope" : 
  new Boon( "stethoscope", 
            "Stethoscope: <br><br>You still get paid when killing a henchman, but lose 5 stamina", 
            {staminaDamage: 5}, 
            "src/media/Boons/boon_stethoscope.png"),

  "syringe" : 
  new Boon( "syringe", 
            "Syringe: <br><br>You can read redacted henchman charts", 
            {syringe: true}, 
            "src/media/Boons/boon_syringe.png"),

  "tetrisPiece" : 
  new Boon( "tetrisPiece", 
            "Tetris Piece: <br><br>Henchman is considered healed if it's within 5% of its max health", 
            {henchIsHealed: 0.05}, 
            "src/media/Boons/boon_tetrisPiece.png"),

  "thermometer" : 
  new Boon( "thermometer", 
            "Thermometer: <br><br>When you run out of stamina, gain 50% stamina, then this is destroyed", 
            {thermometer: 0.5}, 
            "src/media/Boons/boon_thermometer.png"),

  "tongueDepressor" : 
  new Boon( "tongueDepressor", 
            "Tongue Depressor: <br><br>Your first reset of a wave costs 0 stamina", 
            {tongueDepressor: true}, 
            "src/media/Boons/boon_tongueDepressor.png"),

  "triforce" : 
  new Boon( "triforce", 
            "Triforce: <br><br>Dice from the dice machine come with 2 random faces", 
            {bonusDieFaces: 2}, 
            "src/media/Boons/boon_triforce.png"),

  "cuppaJoe" : 
  new Boon( "cuppaJoe", 
            "Cuppa Joe: <br><br>Restores 50 stamina, increases price of duplicate purchases", 
            {coffeeStaminaRestore: 50}, 
            ""),


  // Chance to heal for +5 when [condition]
  // When buying a die face of 7 or below, you get an additional one.
  // d4s roll double.
  // If you would lose more than 10 stamina, you lose 10 instead.
  // Henchman are worth +3 gold when fully healed.
  // Overhealing a henchman recovers your stamina by half that amount.
  // d10 gets +1 to each roll.
  // When you only roll one die, you roll it twice and take the higher number.
  // Items in the vending machine cost 20% less.
  // 10% chance to get an additional item from the vending machine.
  // +20 max stamina.
  // Henchmen start with +10 health.
  // Ignore the next 2 curses.
  // +5 to all rolls, but you can only roll 1 die at a time.
  // If you roll doubles, double the value.
  // Die faces fit any die.
  // Your dice roll for (13 minus the value of the roll)
  // If you roll 3 1s in a single roll (using exactly 3 dice), fully heal the henchman.
  // If you miss the threshold by over 10, reroll the dice you just rolled.
  // You can have +1 die in your dice tray. (Companion Cube)
  // +1 to henchman healing factor.
  // Prevent the first time a henchman would lose health.
  // You still get paid when killing a henchman, but lose 5 stamina.
  // You can read redacted henchman charts.
  // Henchman is considered healed if it's within 5% of its max health.
  // When you run out of stamina, gain 50% stamina, then this is destroyed.
  
  // Your first reset of a wave costs 0 stamina.
  // Dice from the dice machine come with 2 random faces.
};

// Export the boons
export { boonArray };

let boonNameArray = [];

Object.keys(boonArray).forEach(function(key) {
  // Add the key to the keysArray
  boonNameArray.push(key);
});

export { boonNameArray };