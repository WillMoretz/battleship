const ship = (len) => ({
  length: len,
  hits: 0,
  sunk: false,
  hit() {
    this.hits += 1;
  },
  isSunk() {
    if (this.hits === this.length) return true;
    return false;
  },
});

const gameBoard = () => ({});

export { ship, gameBoard };
