export default class Ship {
  #length;
  #hitCount;

  constructor(length) {
    this.#length = length;
    this.#hitCount = 0;
  }

  hit() {
    this.#hitCount++;
  }

  isSunk() {
    return this.#length === this.#hitCount;
  }
}

// Your ‘ships’ will be objects that include:
// their length,
// the number of times they’ve been hit and
// whether or not they’ve been sunk.
