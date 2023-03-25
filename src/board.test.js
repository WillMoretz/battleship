import { gameBoard } from "./game";

test("checkPosition checks correct position", () => {
  const board = gameBoard();
  const positionResults = board.checkPosition("d", 4);
  expect(positionResults.position).toBe("d4");
  expect(positionResults.hasShip).toBe(false);
});

test("ship spanning rows placed at correct position", () => {
  const board = gameBoard();
  board.placeShip("e", "e", 1, 3);
  const e1Position = board.checkPosition("e", 1);
  const e2Position = board.checkPosition("e", 2);
  const e3Position = board.checkPosition("e", 3);
  expect(e1Position.hasShip).toBe(true);
  expect(e2Position.hasShip).toBe(true);
  expect(e3Position.hasShip).toBe(true);
});

test("ship spanning rows doesn't affect other squares", () => {
  const board = gameBoard();
  board.placeShip("f", "f", 2, 3);
  const f1Position = board.checkPosition("f", 1);
  const f4Position = board.checkPosition("f", 4);
  const e2Position = board.checkPosition("e", 2);
  const g2Position = board.checkPosition("g", 2);
  expect(f1Position.hasShip).toBe(false);
  expect(f4Position.hasShip).toBe(false);
  expect(e2Position.hasShip).toBe(false);
  expect(g2Position.hasShip).toBe(false);
});

test("ship spanning columns placed at correct position", () => {
  const board = gameBoard();
  board.placeShip("b", "d", 7, 7);
  const b7Position = board.checkPosition("b", 7);
  const c7Position = board.checkPosition("c", 7);
  const d7Position = board.checkPosition("d", 7);
  expect(b7Position.hasShip).toBe(true);
  expect(c7Position.hasShip).toBe(true);
  expect(d7Position.hasShip).toBe(true);
});

test("ship spanning columns doesn't affect other squares", () => {
  const board = gameBoard();
  board.placeShip("h", "i", 9, 9);
  const g9Position = board.checkPosition("g", 9);
  const j9Position = board.checkPosition("j", 9);
  const h8Position = board.checkPosition("h", 8);
  const h10Position = board.checkPosition("h", 10);
  expect(g9Position.hasShip).toBe(false);
  expect(j9Position.hasShip).toBe(false);
  expect(h8Position.hasShip).toBe(false);
  expect(h10Position.hasShip).toBe(false);
});
