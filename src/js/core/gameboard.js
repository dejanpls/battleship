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
    this.#shipSizes = [5, 4, 4, 3, 2, 2, 1];
    this.#attacks = new Set();
    this.#misses = new Set();
    this.#ships = [];
  }

  placeShip(coordinates) {
    if (this.#shipSizes.length === 0 && !this.isAligned) return false;

    const length = this.#shipSizes.shift();
    if (length !== coordinates.length) return false;

    const ship = new Ship(length);

    for (let i = 0; i < coordinates.length; i++) {
      if (!this.validateCoordinates(coordinates[i])) {
        this.#shipSizes.unshift(length);
        return false;
      }

      const key = coordinates[i].join(',');

      if (this.hasShipAt(key)) {
        this.#shipSizes.unshift(length);
        return false;
      }

      this.#takenCoordinates[key] = ship;
    }

    this.#ships.push(ship);
    return true;
  }

  nextShipSize() {
    return this.#shipSizes[0];
  }

  allShipsSunk() {
    return this.#ships.length > 0 && this.#ships.every((ship) => ship.isSunk());
  }

  hasShipAt(key) {
    return Boolean(this.#takenCoordinates[key]);
  }

  hasAdjacentShip([x, y]) {
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      // Skip out-of-bounds neighbors
      if (!this.validateCoordinates([nx, ny])) continue;

      const key = `${nx},${ny}`;
      if (this.hasShipAt(key)) {
        return true;
      }
    }

    return false;
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

  alreadyAttacked(key) {
    return this.#attacks.has(key);
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
