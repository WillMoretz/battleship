import { gameBoard } from "./game";

test("checkPosition checks correct position", () => {
  const board = gameBoard();
  const positionResults = board.checkPosition("d", 4);
  expect(positionResults.position).toBe("d4");
  expect(positionResults.hasShip).toBe(false);
});

test("ship spanning rows placed at correct position", () => {
  const board = gameBoard();
  board.placeShip("e", 1, "e", 3);
  const e1Position = board.checkPosition("e", 1);
  const e2Position = board.checkPosition("e", 2);
  const e3Position = board.checkPosition("e", 3);
  expect(e1Position.hasShip).toBe(true);
  expect(e2Position.hasShip).toBe(true);
  expect(e3Position.hasShip).toBe(true);
});

test("ship spanning rows doesn't affect other squares", () => {
  const board = gameBoard();
  board.placeShip("f", 2, "f", 3);
  const f1Position = board.checkPosition("f", 1);
  const f4Position = board.checkPosition("f", 4);
  const e2Position = board.checkPosition("e", 2);
  const g2Position = board.checkPosition("g", 2);
  expect(f1Position.hasShip).toBe(false);
  expect(f4Position.hasShip).toBe(false);
  expect(e2Position.hasShip).toBe(false);
  expect(g2Position.hasShip).toBe(false);
});
