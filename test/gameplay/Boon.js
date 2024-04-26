export class Boon {
  
  constructor(name, description, effects) {
    this.name = name;
    this.description = description;
    this.effects = effects;
  }

  applyEffects(player) {
    if (this.effects.staminaRestore) {
      player.stamina += this.effects.staminaRestore;
    }
    if (this.effects.acquireCurrency) {
      player.currency += this.effects.acquireCurrency;
    }
  }
  
}

const boonArray = {
  // "Health Potion": new Boon("Health Potion", "Restores 50 health", { healthRestore: 50 }),
  // "Strength Potion": new Boon("Strength Potion", "Increases attack power by 10%", { attackBonusPercentage: 0.1 }),
  // "Shield": new Boon("Shield", "Increases defense by 20", { defenseIncrease: 20 }),
  // "Speed Boots": new Boon("Speed Boots", "Increases movement speed", { speedBoost: true }),
  // "Lucky Charm": new Boon("Lucky Charm", "Increases critical hit chance by 10%", { criticalHitChance: 0.1 }),

  "MONEY!": new Boon("MONEY!", "GET MONEY!", { acquireCurrency: 10 }),
  "Stamina Potion": new Boon("Stamina Potion", "Restores 50 stamina", { staminaRestore: 50 }),

  "beamSword" : new Boon("beamSword", "", {temp: 0}),
  "chaosEmerald" : new Boon("chaosEmerald", "", {temp: 0}),
  "companionCube" : new Boon("companionCube", "", {temp: 0}),
  "crowbar" : new Boon("crowbar", "", {temp: 0}),
  "elderScroll" : new Boon("elderScroll", "", {temp: 0}),
  "estusFlask" : new Boon("estusFlask", "", {temp: 0}),
  "gloves" : new Boon("gloves", "", {temp: 0}),
  "goggles" : new Boon("goggles", "", {temp: 0}),
  "labCoat" : new Boon("labCoat", "", {temp: 0}),
  "lollipops" : new Boon("lollipops", "", {temp: 0}),
  "mask" : new Boon("mask", "", {temp: 0}),
  "medicalBag" : new Boon("medicalBag", "", {temp: 0}),
  "mushroom" : new Boon("mushroom", "", {temp: 0}),
  "nukaCola" : new Boon("nukaCola", "", {temp: 0}),
  "pickaxe" : new Boon("pickaxe", "", {temp: 0}),
  "pillBottle" : new Boon("pillBottle", "", {temp: 0}),
  "pokeball" : new Boon("pokeball", "", {temp: 0}),
  "portalGun" : new Boon("portalGun", "", {temp: 0}),
  "reflexHammer" : new Boon("reflexHammer", "", {temp: 0}),
  "rxPad" : new Boon("rxPad", "", {temp: 0}),
  "scalpel" : new Boon("scalpel", "", {temp: 0}),
  "scrubs" : new Boon("scrubs", "", {temp: 0}),
  "star" : new Boon("star", "", {temp: 0}),
  "stethoscope" : new Boon("stethoscope", "", {temp: 0}),
  "syringe" : new Boon("syringe", "", {temp: 0}),
  "tetrisPiece" : new Boon("tetrisPiece", "", {temp: 0}),
  "thermometer" : new Boon("thermometer", "", {temp: 0}),
  "tongueDepressor" : new Boon("tongueDepressor", "", {temp: 0}),
  "triforce" : new Boon("triforce", "", {temp: 0}),

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
  // +3 to your first roll after resetting your dice.
  // Your first reset of a wave costs 0 stamina.
  // Dice from the dice machine come with 2 random faces.
};

// Export the boons
export { boonArray };