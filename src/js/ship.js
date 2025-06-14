export default class Ship {
  #length;
  #hitCount;

  constructor(length) {
    this.#length = length;
    this.#hitCount = 0;
  }

  hit() {
    if (!this.isSunk()) this.#hitCount++;
  }

  isSunk() {
    return this.#length === this.#hitCount;
  }

  getHitCount() {
    return this.#hitCount;
  }
}
