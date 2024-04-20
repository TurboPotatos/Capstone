export class StaminaComponent {
  //Handles all logic for anything that needs to have its own stamina.
  
	//these will be assigned functions by classes working with the stamina component.
	onStaminaEmpty
	onStaminaChanged
	//this could be needed for the healthbar
	onMaxStaminaChanged
  
	maxStamina = 20;
	currentStamina = this.maxStamina;
  
	constructor(maxStamina = this.maxHealth, isPlayer) {
		this.maxStamina = maxStamina;
    this.fillStamina();
    
    this.isPlayer = isPlayer;
	}
	
	changeStamina(staminaChange) {
		//use this to take damage or heal
    this.currentStamina += staminaChange;
    //emit the onStaminaChanged event
    if(this.onStaminaChanged != null) {
      this.onStaminaChanged(this.currentStamina, this.isPlayer);
    }
    
		if(this.currentStamina > this.maxStamina) {
      //don't go above max stamina
			this.currentStamina = this.maxStamina;
		} else if(this.currentStamina < 0) {
      //don't go below 0 stamina
      this.currentStamina = this.maxStamina;
      
      if(this.onStaminaEmpty != null) {
			  this.onStaminaEmpty();
      }
		}
	}
	
	fillStamina() {
    //Add however much stamina is needed to be at the max
    //(maxStamina will always be greator or equal to currentStamina)
    this.changeStamina(this.maxStamina - this.currentStamina);
	}
	
	setMaxStamina(newMax, heal = true) {
		if(newMax < 1) {
			//don't allow a negative max stamina
      newMax = 1;
		}
		this.maxStamina = newMax;
    if(this.onMaxStaminaChanged != null) {
      this.onMaxStaminaChanged(this.maxStamina, this.isPlayer);
    }
		
		if(heal && this.maxStamina > this.currentStamina) {
			this.fillStamina()
		}
	}
	
  getStaminaPercentage() {
    return (this.currentStamina / this.maxStamina) * 100
  }
}