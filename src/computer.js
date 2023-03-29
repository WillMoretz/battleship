function getPossibleChoices(board) {
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
  const squares = getPossibleChoices(board);
  return squares[Math.floor(Math.random() * squares.length)];
}

function randomShipArray() {
  const shipLengths = [2, 3, 3, 4, 5];
  const shipNames = [
    "Patrol Boat",
    "Submarine",
    "Destroyer",
    "BattleShip",
    "Aircraft Carrier",
  ];
  const ships = [];
  while (shipLengths.length > 0) {
    let validPlacement = true;
    const direction = Math.random() < 0.5 ? "rowSpan" : "colSpan";

    const startRow = Math.ceil(Math.random() * 10);
    const startCol = String.fromCharCode(96 + Math.ceil(Math.random() * 10));

    const currentShip = [{ name: shipNames[shipNames.length - 1] }];

    let currentCol = startCol;
    let currentRow = startRow;

    for (let i = 0; i < shipLengths[shipLengths.length - 1]; i++) {
      // Out of Bounds
      if (currentRow === 11) {
        validPlacement = false;
        break;
      }
      if (currentCol === "k") {
        validPlacement = false;
        break;
      }

      // Overlap
      ships.forEach((ship) => {
        for (let j = 1; j < ship.length; j++) {
          if (currentCol === ship[j].col && currentRow === ship[j].row) {
            validPlacement = false;
            break;
          }
        }
      });

      if (!validPlacement) break;
      currentShip.push({ col: currentCol, row: currentRow });
      // Increment
      if (direction === "rowSpan") currentRow += 1;
      else currentCol = String.fromCharCode(currentCol.charCodeAt(0) + 1);
    }

    if (validPlacement) {
      ships.push(currentShip);
      shipLengths.pop();
      shipNames.pop();
    }
  }
  return ships;
}

export { chooseSquare, getPossibleChoices, randomShipArray };
