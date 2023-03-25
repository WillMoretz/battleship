import { ship } from "./game";

test("sets length", () => {
  const aShip = ship(7);
  expect(aShip.length).toBe(7);
});

test("ship not sunk when hits are below length", () => {
  const aShip = ship(3);
  expect(aShip.isSunk()).toBe(false);
  aShip.hit();
  aShip.hit();
  expect(aShip.isSunk()).toBe(false);
});

test("ship sinks", () => {
  const aShip = ship(3);
  aShip.hit();
  aShip.hit();
  aShip.hit();
  expect(aShip.isSunk()).toBe(true);
});
