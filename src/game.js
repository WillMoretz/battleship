const ship = (len) => ({
  length: len,
  hits: 0,
  sunk: false,
  addHit() {
    this.hit += 1;
  },
  sink() {
    this.sunk = true;
  },
});

const gameBoard = () => ({});

export { ship, gameBoard };
