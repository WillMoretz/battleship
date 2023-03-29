import { chooseSquare, getPossibleSquares } from "./computer";
import { gameBoard } from "./game";

test("computer getPossibleSquares doesn't include squares that have already been attacked", () => {
  const board = gameBoard();
  //Attack every square but the ones in column J
  for (let i = 1; i < 11; i++) {
    for (let j = "a"; j !== "j"; j = String.fromCharCode(j.charCodeAt(0) + 1)) {
      board.receiveAttack(j, i);
    }
  }
  getPossibleSquares(board).forEach((square) => {
    expect(square.col).toBe("j");
  });
});
