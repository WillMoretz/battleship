const ship = (len) => ({
  length: len,
  hits: 0,
  hit() {
    this.hits += 1;
  },
  isSunk() {
    if (this.hits === this.length) return true;
    return false;
  },
});

function createBoard() {
  const board = [];
  for (let i = 1; i < 11; i++) {
    const column = {};
    Object.assign(column, {
      column: i,
      row: [
        { position: `a${i}`, hasShip: false },
        { position: `b${i}`, hasShip: false },
        { position: `c${i}`, hasShip: false },
        { position: `d${i}`, hasShip: false },
        { position: `e${i}`, hasShip: false },
        { position: `f${i}`, hasShip: false },
        { position: `g${i}`, hasShip: false },
        { position: `h${i}`, hasShip: false },
        { position: `i${i}`, hasShip: false },
        { position: `j${i}`, hasShip: false },
      ],
    });
    board.push(column);
  }
  return board;
}

const gameBoard = () => ({
  board: createBoard(),
  findSquare(col, row) {
    const square = this.board[row - 1].row.filter((obj) => {
      return obj.position === `${col}${row}`;
    });
    return square;
  },
  checkPosition(col, row) {
    const result = {};
    const square = this.findSquare(col, row);
    const position = square[0].position;
    const hasShip = square[0].hasShip;
    Object.assign(result, { position, hasShip });
    return result;
  },
  ships: [],
  placeShip(startCol, endCol, startRow, endRow, name) {
    let length = 0;
    let occupiedSquares = [];
    if (startRow !== endRow) {
      for (let i = startRow; i < endRow + 1; i++) {
        const square = this.findSquare(startCol, i);
        square[0].hasShip = true;
        length += 1;
        occupiedSquares.push(`${startCol}${i}`);
      }
    } else {
      let currentCol = startCol;
      while (currentCol !== String.fromCharCode(endCol.charCodeAt(0) + 1)) {
        const square = this.findSquare(currentCol, startRow);
        square[0].hasShip = true;
        occupiedSquares.push(`${currentCol}${startRow}`);
        currentCol = String.fromCharCode(currentCol.charCodeAt(0) + 1);
        length += 1;
      }
    }
    this.ships.push({
      squares: occupiedSquares,
      name,
      obj: ship(length),
    });
  },
  attacks: [],
  trackAttack(position, attackHit, sankShip) {
    this.attacks.push({ position, attackHit, sankShip });
  },
  receiveAttack(col, row) {
    let attackedShip = false;
    this.ships.forEach((item) => {
      item.squares.forEach((square) => {
        if (square === `${col}${row}`) attackedShip = item;
      });
    });
    if (attackedShip) {
      attackedShip.obj.hit();
      this.trackAttack(`${col}${row}`, true, attackedShip.obj.isSunk());
      return attackedShip.name;
    }
    this.trackAttack(`${col}${row}`, false, false);
    return `${col}${row}`;
  },
});

export { ship, gameBoard };
