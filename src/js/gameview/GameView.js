import { SessionStorage } from "../sessionstorage/SessionStorage.js";
import { Game } from "./game/Game.js";
import { Dice } from "../Dice.js"

class GameView {
  //Connects game.html and its elements to the internal game logic.
  //static score = document.querySelector("#score");
  static logText = document.querySelector("#logText");
  static average = document.querySelector("#average");
  static diceArea = document.querySelector("#diceArea");
  
  static staminaBar = document.querySelector("#staminaBar");
  
  static total = 0
  
  static game = new Game(SessionStorage.getDifficulty());
	static diceSelection = this.game.player.dice;
  
  //TODO probably move these into Game.js or something.
  static total = 0;
  static numRolls = 0;
  
  static init() {
    console.log("running constuctor");
    GameView.game.player.staminaComponent.onStaminaChanged = GameView.onStaminaChanged;
    SessionStorage.setGame(GameView.game);
  }
  
  static onStaminaChanged(staminaChange, isPlayer) {
    console.log("stamina changed!");
    
    if(isPlayer) {
      console.log("player's stamina changed!");
      //this can also be improved but it's better than nothing
      console.log(GameView.game.player.staminaComponent.getStaminaPercentage());
      staminaBar.style.width = GameView.game.player.staminaComponent.getStaminaPercentage() + "%";
    }
  }
  
  static rollSelectedDice() {
    console.log("rolling dice");
    
    //TODO figure out how to properly design this to not roll all the dice at once
    this.numRolls++;
    
    let d20 = new Dice("d20");
    let d12 = new Dice("d12");
    let d10 = new Dice("d10");
    let d8 = new Dice("d8");
    let d6 = new Dice("d6");
    let d4 = new Dice("d4");
    let roll20 = d20.roll();
    let roll12 = d12.roll();
    let roll10 = d10.roll();
    let roll8 = d8.roll();
    let roll6 = d6.roll();
    let roll4 = d4.roll();

    let rollTotal = roll20 + roll12 + roll10 + roll8 + roll6 + roll4;
    
    //This really isn't right but it shows the concept for now.
    GameView.game.player.staminaComponent.changeStamina(-2);
    console.log(GameView.game.player.staminaComponent.currentStamina);
    
    //this.score.innerHTML = "Score: " + this.total;
    logText.innerHTML += "<br>" + rollTotal + " (" + "d20:" + roll20 + " d12:" + roll12 + " d10:" + roll10 + " d8:" + roll8 + " d6:" + roll6 + " d4:" + roll4 + ")";
    average.innerHTML = "Running Average: " + Math.round(this.total / this.numRolls);

    diceArea.innerHTML = "d20: " + roll20 + "<br>d12: " + roll12 + "<br>d10: " + roll10 + "<br>d8: &nbsp;&nbsp;" + roll8 + "<br>d6: &nbsp;&nbsp;" + roll6 + "<br>d4: &nbsp;&nbsp;" + roll4;
  }
}

function init() {
  let diceArea = document.querySelector("#diceArea");
  let rollDiceBtn = document.querySelector("#rollDiceBtn");
  
  GameView.init();
  
  diceArea.addEventListener("click", GameView.rollSelectedDice);
  rollDiceBtn.addEventListener("click", GameView.rollSelectedDice);
}

window.onload = init;
