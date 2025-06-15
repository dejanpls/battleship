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
    if (this.#shipLengths.length === 0 && !this.isAligned) return false;

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

      if (this.hasShipAt(key)) {
        throw new Error('Invalid ship placement');
      }

      this.#takenCoordinates[key] = ship;
    }

    this.#ships.push(ship);
    return true;
  }

  hasShipAt(key) {
    return Boolean(this.#takenCoordinates[key]);
  }

  validateCoordinates(coordinates) {
    if (coordinates[0] < 0 || coordinates[0] >= this.#gridSize) return false;
    if (coordinates[1] < 0 || coordinates[1] >= this.#gridSize) return false;
    return true;
  }

  isAligned(coordinates) {
    const xAllEqual = coordinates.every(([x, y]) => x === coordinates[0][0]);
    const yAllEqual = coordinates.every(([x, y]) => y === coordinates[0][1]);

    return xAllEqual || yAllEqual;
  }

  receiveAttack(coordinates) {}
}

// Next up:
// Gameboards should have a receiveAttack function that takes a pair of coordinates,
// determines whether or not the attack hit a ship and
// then sends the ‘hit’ function to the correct ship,
// or records the coordinates of the missed shot.
