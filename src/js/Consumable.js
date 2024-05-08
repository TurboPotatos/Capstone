export class Consumable {
  // This is a class for a single-use consumable to be used to boost rolls into the needed range
  constructor(bonus) {
    this.bonus = bonus;
    this.name = "supplement";
  }
}