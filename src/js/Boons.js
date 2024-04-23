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


// boon_pickaxe src\\media\\boon_pickaxe.png
// boon_pillBottle src\\media\\boon_pillBottle.png
// boon_pokeball src\\media\\boon_pokeball.png
// boon_portalGun src\\media\\boon_portalGun.png
// boon_reflexHammer src\\media\\boon_reflexHammer.png
// boon_rxPad src\\media\\boon_rxPad.png
// boon_scalpel src\\media\\boon_scalpel.png
// boon_scrubs src\\media\\boon_scrubs.png
// boon_star src\\media\\boon_star.png
// boon_stethoscope src\\media\\boon_stethoscope.png
// boon_syringe src\\media\\boon_syringe.png
// boon_tetrisPiece src\\media\\boon_tetrisPiece.png
// boon_thermometer src\\media\\boon_thermometer.png
// boon_tongueDepressor src\\media\\boon_tongueDepressor.png
// boon_triforce src\\media\\boon_triforce.png


  constructor (nameOfBoon) {

    super();

    switch (nameOfBoon) {
      case "beamSword": 
        this.filePath = "src\media\boon_beamSword.png";
        this.description = "Beam Sword";
        this.name = "boon_beamSword";
      break;
      case "chaosEmerald": 
        this.filePath = "src\media\boon_chaosEmerald.png"
        this.description = "Chaos Emerald";
        this.name = "boon_chaosEmerald";
      break;
      case "companionCube": 
        this.filePath = "src\media\boon_companionCube.png";
        this.description = "Companion Cube";
        this.name = "boon_companionCube";
      break;
      case "crowbar": 
        this.filePath = "src\media\boon_crowbar.png";
        this.description = "";
        this.name = "boon_crowbar";
      break;
      case "elderScroll": 
        this.filePath = "src\media\boon_elderScroll.png";
        this.description = "";
        this.name = "boon_elderScroll";
      break;
      case "estusFlask": 
        this.filePath = "src\media\boon_estusFlask.png";
        this.description = "";
        this.name = "boon_estusFlask ";
      break;
      case "gloves": 
        this.filePath = "src\media\boon_gloves.png";
        this.description = "";
        this.name = "boon_gloves";
      break;
      case "goggles": 
        this.filePath = "src\media\boon_goggles.png";
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
      // case "": 
      //   this.filePath = "src\media\boon_beamSword.png";
      //   this.description = "";
      //   this.name = "boon_beamSword";
      // break;
      // case "": 
      //   this.filePath = "src\media\boon_beamSword.png";
      //   this.description = "";
      //   this.name = "boon_beamSword";
      // break;
      // case "": 
      //   this.filePath = "src\media\boon_beamSword.png";
      //   this.description = "";
      //   this.name = "boon_beamSword";
      // break;
      // case "": 
      //   this.filePath = "src\media\boon_beamSword.png";
      //   this.description = "";
      //   this.name = "boon_beamSword";
      // break;
    }

    this.description = "Test description";
  }

  // get random boon 
  setToRandomBoon() {
    // temporary testing function to set boon to have random values
    const randomFloat = Math.random();

    // Scale the random number to the range 1 to 29
    const randomInteger = Math.floor(randomFloat * 14) + 1;
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
    }
  }
}