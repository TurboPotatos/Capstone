import { Collectibles } from "./Collectibles.js";

export class Boons extends Collectibles {
  // TODO: Figure out making things private and make getters/setters
  // Object for all vices/virtues the player collects

  // Path to image
  filePath = "";

  // Description of item
  description = "";

  // Name of boon
  name = "";

  // Cost of boon
  cost = 0;

  constructor (nameOfBoon) {

    super();

    switch (nameOfBoon) {
      case "beamSword": 
        this.filePath = "src\\media\\boon_beamSword.png";
        this.description = "Beam Sword";
        this.name = "boon_beamSword";
      break;
      case "chaosEmerald": 
        this.filePath = "src\\media\\boon_chaosEmerald.png"
        this.description = "Chaos Emerald";
        this.name = "boon_chaosEmerald";
      break;
      case "companionCube": 
        this.filePath = "src\\media\\boon_companionCube.png";
        this.description = "Companion Cube";
        this.name = "boon_companionCube";
      break;
      case "crowbar": 
        this.filePath = "src\\media\\boon_crowbar.png";
        this.description = "";
        this.name = "boon_crowbar";
      break;
      case "elderScroll": 
        this.filePath = "src\\media\\boon_elderScroll.png";
        this.description = "";
        this.name = "boon_elderScroll";
      break;
      case "estusFlask": 
        this.filePath = "src\\media\\boon_estusFlask.png";
        this.description = "";
        this.name = "boon_estusFlask ";
      break;
      case "gloves": 
        this.filePath = "src\media\boon_gloves.png";
        this.description = "";
        this.name = "boon_gloves";
      break;
      case "goggles": 
        this.filePath = "src\\media\\boon_goggles.png";
        this.description = "";
        this.name = "boon_goggles";
      break;
      case "labCoat": 
        this.filePath = "src\media\boon_labCoat.png";
        this.description = "";
        this.name = "boon_labCoat";
      break;
      case "lollipops": 
        this.filePath = "src\media\boon_lollipops.png";
        this.description = "";
        this.name = "boon_lollipops";
      break;
      case "mask": 
        this.filePath = "src\media\boon_mask.png";
        this.description = "";
        this.name = "boon_mask";
      break;
      case "medicalBag": 
        this.filePath = "src\media\boon_medicalBag.png";
        this.description = "";
        this.name = "boon_medicalBag";
      break;
      case "mushroom": 
        this.filePath = "src\media\boon_mushroom.png";
        this.description = "";
        this.name = "boon_mushroom";
      break;
      case "nukaCola": 
        this.filePath = "src\media\boon_nukaCola.png";
        this.description = "";
        this.name = "boon_nukaCola";
      break;
      case "pickaxe": 
        this.filePath = "src\\media\\boon_pickaxe.png";
        this.description = "";
        this.name = "boon_pickaxe";
      break;
      case "pillBottle": 
        this.filePath = "src\\media\\boon_pillBottle.png";
        this.description = "";
        this.name = "boon_pillBottle";
      break;
      case "pokeball": 
        this.filePath = "src\\media\\boon_pokeball.png";
        this.description = "";
        this.name = "boon_pokeball";
      break;
      case "portalGun": 
        this.filePath = "src\\media\\boon_portalGun.png";
        this.description = "";
        this.name = "boon_portalGun";
      break;
      case "reflexHammer": 
        this.filePath = "src\\media\\boon_reflexHammer.png";
        this.description = "";
        this.name = "boon_reflexHammer";
      break;
      case "rxPad": 
        this.filePath = "src\\media\\boon_rxPad.png";
        this.description = "";
        this.name = "boon_rxPad";
      break;
      case "scalpel": 
        this.filePath = "src\\media\\boon_scalpel.png";
        this.description = "";
        this.name = "boon_scalpel";
      break;
      case "scrubs": 
        this.filePath = "src\\media\\boon_scrubs.png";
        this.description = "";
        this.name = "boon_scrubs";
      break;
      case "star": 
        this.filePath = "src\\media\\boon_star.png";
        this.description = "";
        this.name = "boon_star";
      break;
      case "stethoscope": 
        this.filePath = "src\\media\\boon_stethoscope.png";
        this.description = "";
        this.name = "boon_stethoscope";
      break;
      case "syringe": 
        this.filePath = "src\\media\\boon_syringe.png";
        this.description = "";
        this.name = "boon_syringe";
      break;
      case "tetrisPiece": 
        this.filePath = "src\\media\\boon_tetrisPiece.png";
        this.description = "";
        this.name = "boon_tetrisPiece";
      break;
      case "thermometer": 
        this.filePath = "src\\media\\boon_thermometer.png";
        this.description = "";
        this.name = "boon_thermometer";
      break;
      case "tongueDepressor": 
        this.filePath = "src\\media\\boon_tongueDepressor.png";
        this.description = "";
        this.name = "boon_tongueDepressor";
      break;
      case "triforce": 
        this.filePath = "src\\media\\boon_triforce.png";
        this.description = "";
        this.name = "boon_triforce";
      break;
    }

    this.description = "Test description";
  }

  // get random boon 
  setToRandomBoon() {
    // temporary testing function to set boon to have random values
    const randomFloat = Math.random();

    // Scale the random number to the range 1 to 29
    const randomInteger = Math.floor(randomFloat * 29) + 1;
    switch (randomInteger) {
      case 1: 
        this.filePath = "src\\media\\boon_beamSword.png";
        this.description = "Beam Sword";
        this.name = "boon_beamSword";
      break;
      case 2: 
        this.filePath = "src\\media\\boon_chaosEmerald.png"
        this.description = "Chaos Emerald";
        this.name = "boon_chaosEmerald";
      break;
      case 3: 
        this.filePath = "src\\media\\boon_companionCube.png";
        this.description = "Companion Cube";
        this.name = "boon_companionCube";
      break;
      case 4: 
        this.filePath = "src\\media\\boon_crowbar.png";
        this.description = "";
        this.name = "boon_crowbar";
      break;
      case 5: 
        this.filePath = "src\\media\\boon_elderScroll.png";
        this.description = "";
        this.name = "boon_elderScroll";
      break;
      case 6: 
        this.filePath = "src\\media\\boon_estusFlask.png";
        this.description = "";
        this.name = "boon_estusFlask";
      break;
      case 7: 
        this.filePath = "src\\media\\boon_gloves.png";
        this.description = "";
        this.name = "boon_gloves";
      break;
      case 8: 
        this.filePath = "src\\media\\boon_goggles.png";
        this.description = "";
        this.name = "boon_goggles";
      break;
      case 9: 
        this.filePath = "src\\media\\boon_labCoat.png";
        this.description = "";
        this.name = "boon_labCoat";
      break;
      case 10: 
        this.filePath = "src\\media\\boon_lollipops.png";
        this.description = "";
        this.name = "boon_lollipops";
      break;
      case 11: 
        this.filePath = "src\\media\\boon_mask.png";
        this.description = "";
        this.name = "boon_mask";
      break;
      case 12: 
        this.filePath = "src\\media\\boon_medicalBag.png";
        this.description = "";
        this.name = "boon_medicalBag";
      break;
      case 13: 
        this.filePath = "src\\media\\boon_mushroom.png";
        this.description = "";
        this.name = "boon_mushroom";
      break;
      case 14: 
        this.filePath = "src\\media\\boon_nukaCola.png";
        this.description = "";
        this.name = "boon_nukaCola";
      break;
      case 15: 
        this.filePath = "src\\media\\boon_pickaxe.png";
        this.description = "";
        this.name = "boon_pickaxe";
      break;
      case 16: 
        this.filePath = "src\\media\\boon_pillBottle.png";
        this.description = "";
        this.name = "boon_pillBottle";
      break;
      case 17: 
        this.filePath = "src\\media\\boon_pokeball.png";
        this.description = "";
        this.name = "boon_pokeball";
      break;
      case 18: 
        this.filePath = "src\\media\\boon_portalGun.png";
        this.description = "";
        this.name = "boon_portalGun";
      break;
      case 19: 
        this.filePath = "src\\media\\boon_reflexHammer.png";
        this.description = "";
        this.name = "boon_reflexHammer";
      break;
      case 20: 
        this.filePath = "src\\media\\boon_rxPad.png";
        this.description = "";
        this.name = "boon_rxPad";
      break;
      case 21: 
        this.filePath = "src\\media\\boon_scalpel.png";
        this.description = "";
        this.name = "boon_scalpel";
      break;
      case 22: 
        this.filePath = "src\\media\\boon_scrubs.png";
        this.description = "";
        this.name = "boon_scrubs";
      break;
      case 23: 
        this.filePath = "src\\media\\boon_star.png";
        this.description = "";
        this.name = "boon_star";
      break;
      case 24: 
        this.filePath = "src\\media\\boon_stethoscope.png";
        this.description = "";
        this.name = "boon_stethoscope";
      break;
      case 25: 
        this.filePath = "src\\media\\boon_syringe.png";
        this.description = "";
        this.name = "boon_syringe";
      break;
      case 26: 
        this.filePath = "src\\media\\boon_tetrisPiece.png";
        this.description = "";
        this.name = "boon_tetrisPiece";
      break;
      case 27: 
        this.filePath = "src\\media\\boon_thermometer.png";
        this.description = "";
        this.name = "boon_thermometer";
      break;
      case 28: 
        this.filePath = "src\\media\\boon_tongueDepressor.png";
        this.description = "";
        this.name = "boon_tongueDepressor";
      break;
      case 29: 
        this.filePath = "src\\media\\boon_triforce.png";
        this.description = "";
        this.name = "boon_triforce";
      break;
    }

    this.cost = Math.floor(randomFloat * 30) + 1;
  }
}