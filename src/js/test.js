import { Collectibles } from "./Collectibles.js";
import { Dice } from "./Dice.js";
import { Game } from "./Game.js";
import { Henchmen } from "./Henchman.js";
import { Player } from "./Player.js";

function init() {

  class DOMAccess {
    constructor(someParameterVariable, stuff) {
      this.exampleProperty = someParameterVariable;
      this.stuff = stuff;
    }

    logoPicCannon = document.querySelector("#zimmerArtillery");
    diceArea = document.querySelector("#diceArea");
    testPic = document.querySelector("#testPic");
    rollDiceBtn = document.querySelector("#rollDiceBtn");

    anotherProperty = {
      property1: 12
    };

    stillAnotherProperty = 25;

    doStuff() {
      // let primaryContentDiv = document.querySelector("#primaryContent");

      // primaryContentDiv.className = "joe";

      // console.log(`last paragraph = ${document.querySelector("#motd > p:last-child").innerText}`);

      let d20 = new Dice("d20");
      console.log(d20.roll());
    };

    static getClicked() {  
      console.log("your did it");
      let d20 = new Dice("d20");
      let roll = d20.roll();
      console.log(roll);
      diceArea.innerHTML = roll;
      diceArea.style.fontSize = "23rem";
      diceArea.style.textAlign = "center";

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
