class Enemy {

  constructor() {
    this.onTakenDamage = null; // Initialize the callback function property
  }

  takeDamage(damage) {
    // Perform actions related to taking damage
    console.log(`Enemy took ${damage} damage`);

    // Check if a callback function is assigned
    if (this.onTakenDamage && typeof this.onTakenDamage === 'function') {
      // Execute the assigned callback function
      this.onTakenDamage();
    }
  }
}
class Player {
  constructor() {
    // Initialize the Player instance
  }

  // Define a function to be assigned as the callback
  handleEnemyDamage() {
    console.log("Player reacts to enemy taking damage");
    // Perform actions in response to the enemy taking damage
  }
}

let enemy = new Enemy();
let player = new Player();

// Assign the handleEnemyDamage function as the callback for when the enemy takes damage
enemy.onTakenDamage = player.handleEnemyDamage.bind(player);

// Simulate the enemy taking damage
enemy.takeDamage(10);