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

test("ship gets named", () => {
  const board = gameBoard();
  board.placeShip("j", "j", 1, 5, "kestrel");
  expect(board.ships[0].name).toBe("kestrel");
});

test("ship object has correct length when created spanning columns", () => {
  const board = gameBoard();
  board.placeShip("a", "c", 5, 5, "titanic");
  expect(board.ships[0].obj.length).toBe(3);
});

test("ship object has correct length when created spanning rows", () => {
  const board = gameBoard();
  board.placeShip("a", "a", 4, 5, "droplet");
  expect(board.ships[0].obj.length).toBe(2);
});

test("ship object occupies squares ship was placed at when created spanning columns", () => {
  const board = gameBoard();
  board.placeShip("f", "h", 10, 10, "annabelle");
  expect(board.ships[0].squares[0]).toBe("f10");
  expect(board.ships[0].squares[1]).toBe("g10");
  expect(board.ships[0].squares[2]).toBe("h10");
});

test("ship object occupies squares ship was placed at when created spanning rows", () => {
  const board = gameBoard();
  board.placeShip("h", "h", 9, 10, "obra dinn");
  expect(board.ships[0].squares[0]).toBe("h9");
  expect(board.ships[0].squares[1]).toBe("h10");
});

test("missed attack returns position", () => {
  const board = gameBoard();
  board.placeShip("a", "e", 1, 1);
  expect(board.receiveAttack("d", 8)).toBe("d8");
  expect(board.receiveAttack("f", 1)).toBe("f1");
});

test("on-target attack returns ship's name", () => {
  const board = gameBoard();
  board.placeShip("a", "b", 1, 1, "queen anne's revenge");
  expect(board.receiveAttack("a", 1)).toBe("queen anne's revenge");
});

test("correct ship is hit when multiple ships exist", () => {
  const board = gameBoard();
  board.placeShip("e", "e", 1, 2, "Blue Space");
  board.placeShip("g", "g", 3, 4, "USS Yorktown");
  expect(board.receiveAttack("g", 3)).toBe("USS Yorktown");
});

test("attacks stored in array", () => {
  const board = gameBoard();
  board.placeShip("a", "a", 9, 10, "rocinante");
  board.receiveAttack("j", 10);
  board.receiveAttack("a", 10);
  expect(board.attacks[0].attackHit).toBe(false);
  expect(board.attacks[1].attackHit).toBe(true);
});

test("can tell when an attack sinks a ship", () => {
  const board = gameBoard();
  board.placeShip("c", "d", 6, 6, "X-Wing");
  board.receiveAttack("c", 6);
  board.receiveAttack("d", 6);
  expect(board.attacks[0].sankShip).toBe(false);
  expect(board.attacks[1].sankShip).toBe(true);
});
