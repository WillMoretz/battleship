import { gameBoard } from "./game";

const player = (name, board, enemyBoard) => ({
  name,
  board,
  enemyBoard,
});

const computer = (playerObj) => {
  const { name, board, enemyBoard } = playerObj;
  const getPossibleSquares = () => {
    const possibleSquares = [];
    for (let i = 1; i < 11; i++) {
      for (
        let j = "a";
        j !== "k";
        j = String.fromCharCode(j.charCodeAt(0) + 1)
      ) {
        if (!enemyBoard.isRepeatedAttack(j, i))
          possibleSquares.push({ row: i, col: j });
      }
    }
    return possibleSquares;
  };
  const chooseSquare = () => {
    const squares = getPossibleSquares();
    return squares[Math.floor(Math.random() * squares.length)];
  };

  return { name, board, enemyBoard, getPossibleSquares };
};

export { player, computer };
