import Gameboard from './gameboard';

export default class Player {
  #type;
  #gameboard;

  constructor(type) {
    this.#type = type;
    this.#gameboard = new Gameboard();
  }

  get gameboard() {
    return this.#gameboard;
  }

  isComputer() {
    return this.#type === 'computer';
  }
}
