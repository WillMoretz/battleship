import { computer, player } from "./player";
import { gameBoard } from "./game";

test("computer inherits from player", () => {
  const comp = computer(player("computer", gameBoard(), gameBoard()));
  expect(comp.name).toBe("computer");
});

test("computer getPossibleSquares doesn't include squares that have already been attacked", () => {
  const comp = computer(player("computer", gameBoard(), gameBoard()));
  //Attack every square but the ones in column J
  for (let i = 1; i < 11; i++) {
    for (let j = "a"; j !== "j"; j = String.fromCharCode(j.charCodeAt(0) + 1)) {
      comp.enemyBoard.receiveAttack(j, i);
    }
  }
  comp.getPossibleSquares().forEach((square) => {
    expect(square.col).toBe("j");
  });
});
