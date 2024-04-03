function init() {

  class DOMAccess {
    constructor(someParameterVariable, stuff) {
      this.exampleProperty = someParameterVariable;
      this.stuff = stuff;
    }

    logoPicCannon = document.querySelector("#zimmerArtillery");
    testPic = document.querySelector("#testPic");

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
      testPic.style.backgroundColor = "blue";
    }
  }

  let domAccessClassInstance = new DOMAccess("Hello there", 50);

  // console.log(`Message from DOMAccess class: ${domAccessClassInstance.exampleProperty} and stuff property ${domAccessClassInstance.stuff}`);

  domAccessClassInstance.doStuff();

  domAccessClassInstance.testPic.addEventListener("click", DOMAccess.getClicked);
}

window.onload = init;
