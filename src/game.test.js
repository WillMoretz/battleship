import { ship, gameBoard } from "./game";

test("sets length", () => {
  const aShip = ship(7);
  expect(aShip.length).toBe(7);
});
