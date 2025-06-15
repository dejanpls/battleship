import Ship from './ship';

export default class Gameboard {
  #shipSizes;
  #gridSize;
  #takenCoordinates;
  #ships;
  #attacks;
  #misses;

  constructor(gridSize = 10) {
    this.#gridSize = gridSize;
    this.#takenCoordinates = {};
    this.#shipSizes = [5, 4, 3, 3, 2];
    this.#attacks = new Set();
    this.#misses = new Set();
  }

  placeShip(coordinates) {
    if (this.#shipSizes.length === 0 && !this.isAligned) return false;

    const length = this.#shipSizes.shift();
    if (length !== coordinates.length) return false;

    const ship = new Ship(length);

    for (let i = 0; i < coordinates.length; i++) {
      if (!this.validateCoordinates(coordinates[i])) return false;

      const key = coordinates[i].join(',');

      if (this.hasShipAt(key)) return false;

      this.#takenCoordinates[key] = ship;
    }

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

  receiveAttack(key) {
    const coords = key.split(',');
    if (!this.validateCoordinates(coords) || this.#attacks.has(key)) {
      return { result: 'invalid', coordinate: key };
    }

    this.#attacks.add(key);

    if (this.hasShipAt(key)) {
      const ship = this.#takenCoordinates[key];
      ship.hit();
      return {
        result: 'hit',
        sunk: ship.isSunk(),
        coordinate: key,
      };
    }

    this.#misses.add(key);
    return {
      result: 'miss',
      coordinate: key,
    };
  }
}
