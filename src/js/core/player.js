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

  hasLost() {
    return this.#gameboard.allShipsSunk();
  }

  makeMove(opponent, coordinate) {
    const target = this.isComputer() ? generateMove(opponent) : coordinate;
    const move = opponent.gameboard.receiveAttack(target);

    return {
      coordinate: move.coordinate,
      result: move.result,
      sunk: move.sunk ? move.sunk : false,
    };
  }

  generateMove(opponent) {
    while (true) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const key = [x, y].join(',');

      if (!opponent.gameboard.alreadyAttacked(key)) {
        return key;
      }
    }
  }
}
