import { Collectibles } from "./Collectibles.js";
import { Dice } from "./Dice.js";
import { Game } from "./Game.js";
import { Henchmen } from "./Henchman.js";
import { Player } from "./Player.js";

function init() {

  let total = 0;
  let numRolls = 0;

  class DOMAccess {
    constructor(someParameterVariable, stuff) {
      this.exampleProperty = someParameterVariable;
      this.stuff = stuff;
    }

    logoPicCannon = document.querySelector("#zimmerArtillery");
    diceArea = document.querySelector("#diceArea");
    testPic = document.querySelector("#testPic");
    rollDiceBtn = document.querySelector("#rollDiceBtn");
    score = document.querySelector("#score");
    logText = document.querySelector("#logText");
    average = document.querySelector("#average");
    //static xyz = 10;

    anotherProperty = {
      property1: 12
    };

    //stillAnotherProperty = 25;

    doStuff() {
      // let primaryContentDiv = document.querySelector("#primaryContent");

      // primaryContentDiv.className = "joe";

      // console.log(`last paragraph = ${document.querySelector("#motd > p:last-child").innerText}`);

      let d20 = new Dice("d20");
      let roll = d20.roll();
      console.log(roll);
      if (roll == 20) {
        console.log("a winner is you!");
      }
    };

    static getClicked() {  
      numRolls++;
      //console.log("your did it");
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

      //console.log(DOMAccess.xyz);
      total += rollTotal;
      //score.innerHTML = "Score: " + total;
      logText.innerHTML += "<br>" + rollTotal + " (" + "d20:" + roll20 + " d12:" + roll12 + " d10:" + roll10 + " d8:" + roll8 + " d6:" + roll6 + " d4:" + roll4 + ")";
      average.innerHTML = "Running Average: " + Math.round(total / numRolls);
      //console.log(roll);
      diceArea.innerHTML = "d20: " + roll20 + "<br>d12: " + roll12 + "<br>d10: " + roll10 + "<br>d8: &nbsp;&nbsp;" + roll8 + "<br>d6: &nbsp;&nbsp;" + roll6 + "<br>d4: &nbsp;&nbsp;" + roll4;
      diceArea.style.fontSize = "3.5rem";
      diceArea.style.textAlign = "left";

      // if (testPic.style.backgroundColor != "blue") {
      //   testPic.style.backgroundColor = "blue";
      // } else {
      //   testPic.style.backgroundColor = "yellow";
      // }
    }
  }

  let domAccessClassInstance = new DOMAccess("Hello there", 50);

  // console.log(`Message from DOMAccess class: ${domAccessClassInstance.exampleProperty} and stuff property ${domAccessClassInstance.stuff}`);

  domAccessClassInstance.doStuff();

  domAccessClassInstance.diceArea.addEventListener("click", DOMAccess.getClicked);
  domAccessClassInstance.rollDiceBtn.addEventListener("click", DOMAccess.getClicked);
}

window.onload = init;
