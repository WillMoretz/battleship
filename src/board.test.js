import { gameBoard } from "./game";

test.only("checkPosition checks correct position", () => {
  const board = gameBoard();
  const positionResults = board.checkPosition("d", 4);
  expect(positionResults.position).toBe("d4");
  expect(positionResults.hasShip).toBe(false);
});

test("ship places at correct position across rows", () => {
  const board = gameBoard();
  board.placeShip(e1, e2);
});
