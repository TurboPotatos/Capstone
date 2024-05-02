export class Game { 
  // TODO: Figure out making things private and make getters/setters
  // TODO: Difficulty scaling, all other game 'run-specific' elements
  // Also will host all game related functions, such as rolling player's dice and calculating damage, buying shop items, etc.
  difficulty = 1; // Scaling modifier that increases to scale enemy health and damage

  // Array to hold henchmen objects for a wave
  waveHenchmen = [];

  gameConsole = ""; // RENAME. String variable to output what each dice player has rolls

  // player = new Player();

  constructor(difficulty) {
    // Theory code for difficulty options
    // More considerations for difficulty increasing is less currency generated
    switch (difficulty) {
      case "Easy":
        this.difficulty = 1;
        break;
      case "Normal":
        this.difficulty = 1.5;
        break;
      case "Hard":
        this.difficulty = 3;
        break;
      case "Impossible":
        this.difficulty = 6;
        break;
      default:
        this.difficulty = 1;
        break;
    }
    // this.difficulty = 1.2;
  }

  createNewWave() {
    for (i = 0; i < 10; i++){
      this.waveHenchmen.push(new Henchmen(this.difficulty));
    }
    // Alter last to be stronger 'boss' henchmen with more health
    this.waveHenchmen[9].maxHealth *= 10;
  }

  endOfWave() {
    // Call function at end of wave

    // function should show options for stamina regen, shop, workshop, and other events
    // then once complete function should show options of waves of henchmen
  }

}