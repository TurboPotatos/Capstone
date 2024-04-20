//Stores and provides session level (not the php session) javascript data.

export class SessionStorage {
  //Ok so it turns out that there's already something named "sessionStorage" and that's what I'm using. 
  //I was using "localStorage" but I researched it and its not what I want, same with cookies.
  //Both cookies and localStorage persist between unique tabs but sessionStorage doesn't.
  //So the naming is a little weird but I'm not renaming this yet again.
  
  //TL;DR: "sessionStorage" in here refers to https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
  
	static game;
	static difficulty = 1;
	static name = "Phil";
  
  constructor() {
    //The class level values are static but they don't persist between pages. Probably.
    SessionStorage.updateProperties();
  }
  
  static updateProperties() {
    //Set the class properties to whatever happens to be stored already.
    if(sessionStorage.getItem("game") != null) { 
      //Game is a special case since it's not a string, but a unique object.
      //It must be converted to JSON to be stored. In this case, it's being converted back to an object.
      this.game = JSON.parse(sessionStorage.getItem("game"));
    }
    if(sessionStorage.getItem("difficulty") != null) {
      this.game = sessionStorage.getItem("difficulty");
    }
    if(sessionStorage.getItem("name") != null) {
      this.game = sessionStorage.getItem("name");
    }
  }
  
	static save() {
    //Save the current class values to local storage.
		sessionStorage.setItem("game", JSON.stringify(this.game));
    sessionStorage.setItem("difficulty", this.difficulty);
		sessionStorage.setItem("name", this.name);
    
    //test prints
    console.log(sessionStorage.getItem("name"));
    console.log("----");
    console.log(JSON.parse(sessionStorage.getItem("game")));
	}
	
  static setGame(game) {
    this.game = game;
    SessionStorage.save()
  }
  
  static setDifficulty(difficulty) {
    this.difficulty = difficulty;
    SessionStorage.save()
  }
  
  static getDifficulty() {
    return this.difficulty;
  }
  
  static setName(name) {
    this.name = name;
    SessionStorage.save()
  }
  
  static getName() {
    return this.name;
  }
  
}