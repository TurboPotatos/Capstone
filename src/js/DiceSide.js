export class DiceSide {
  src = "examplesrc";
  cost = 10;
  value = 0;

  constructor(value, difficulty) {
    this.value = value;
    this.cost = 1.2*Math.pow(this.cost, difficulty);
    // this.value = Math.ceil(Math.random * 20);
  }

}