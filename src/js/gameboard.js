import Ship from './ship';

export default class Gameboard {
  #shipLengths;
  #shipCount;
  #gridSize;
  #takenCoordinates;
  #ships;

  constructor(shipCount = 5, gridSize = 10) {
    this.#shipCount = shipCount;
    this.#gridSize = gridSize;
    this.#takenCoordinates = {};
    this.#shipLengths = [5, 4, 3, 3, 2];
    this.#ships = [];
  }

  placeShip(coordinates) {
    if (this.#shipLengths.length === 0) return false;

    const length = this.#shipLengths.shift();
    if (length !== coordinates.length) {
      throw new Error('Invalid coordinates length');
    }

    const ship = new Ship(length);

    for (let i = 0; i < coordinates.length; i++) {
      if (!this.validateCoordinates(coordinates[i])) {
        throw new Error(`Invalid coordinate: [${coordinates[i]}]`);
      }

      const key = coordinates[i].join(',');

      if (this.getShipAt(key)) {
        throw new Error('Invalid ship placement');
      }

      this.#takenCoordinates[key] = ship;
    }

    this.#ships.push(ship);
    return true;
  }

  getShipAt(key) {
    return Boolean(this.#takenCoordinates[key]);
  }

  validateCoordinates(coordinates) {
    if (coordinates[0] < 0 || coordinates[0] >= this.#gridSize) return false;
    if (coordinates[1] < 0 || coordinates[1] >= this.#gridSize) return false;
    return true;
  }
}
