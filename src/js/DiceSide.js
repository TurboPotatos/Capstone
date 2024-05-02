export class DiceSide {
  src = "examplesrc";
  cost = 10;
  value = 0;

  constructor(value, difficulty, cost) {
    this.value = value;
    this.cost = 1.2*Math.pow(this.cost, difficulty);
    if (cost !== undefined) {
      this.cost = cost;
    }
  }

}