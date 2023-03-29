function getPossibleSquares(board) {
  const possibleSquares = [];
  for (let i = 1; i < 11; i++) {
    for (let j = "a"; j !== "k"; j = String.fromCharCode(j.charCodeAt(0) + 1)) {
      if (!board.isRepeatedAttack(j, i))
        possibleSquares.push({ row: i, col: j });
    }
  }
  return possibleSquares;
}

function chooseSquare(board) {
  const squares = getPossibleSquares(board);
  return squares[Math.floor(Math.random() * squares.length)];
}

export { chooseSquare, getPossibleSquares };
