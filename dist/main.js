/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/display.js":
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayGame": () => (/* binding */ displayGame),
/* harmony export */   "displaySetup": () => (/* binding */ displaySetup)
/* harmony export */ });
var container = document.querySelector("[data-container]");
function updateBoardDisplay(board) {}
function createBoard(eventHandler) {
  var board = document.createElement("div");
  var _loop = function _loop(i) {
    var _loop2 = function _loop2(j) {
      var square = document.createElement("button");
      square.classList.add("square");
      square.classList.add("".concat(j).concat(i));
      square.addEventListener("click", function () {
        console.log("".concat(j).concat(i));
        eventHandler();
      });
      board.classList.add("board");
      board.appendChild(square);
    };
    for (var j = "a"; j !== "k"; j = String.fromCharCode(j.charCodeAt(0) + 1)) {
      _loop2(j);
    }
  };
  for (var i = 1; i < 11; i += 1) {
    _loop(i);
  }
  return board;
}
function reset() {
  container.textContent = "";
}
function createHeader() {
  var header = document.createElement("header");
  header.textContent = "Battleship";
  return header;
}
function createFooter() {
  var footer = document.createElement("footer");
  footer.textContent = "Made by Will Moretz";
  return footer;
}
function createTitle(text) {
  var title = document.createElement("div");
  title.classList.add("title");
  title.textContent = text;
  return title;
}
function displayGame(eventHandler) {
  reset();
  var header = createHeader();
  var footer = createFooter();
  var section = document.createElement("section");
  var computerTitle = createTitle("Computer's Board");
  var playerTitle = createTitle("Your Board");
  var computerBoard = createBoard();
  computerBoard.classList.add("computer-board");
  var playerBoard = createBoard();
  playerBoard.classList.add("player-board");
  section.appendChild(computerTitle);
  section.appendChild(computerBoard, null);
  section.appendChild(playerTitle);
  section.appendChild(playerBoard, eventHandler);
  container.appendChild(header);
  container.appendChild(section);
  container.appendChild(footer);
}
function displaySetup(eventHandler) {
  var header = createHeader();
  var footer = createFooter();
  var section = document.createElement("section");
  var title = createTitle("Place Your Ships!");
  var board = createBoard(eventHandler);
  section.appendChild(title);
  section.appendChild(board);
  container.appendChild(header);
  container.appendChild(section);
  container.appendChild(footer);
}


/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameBoard": () => (/* binding */ gameBoard),
/* harmony export */   "ship": () => (/* binding */ ship)
/* harmony export */ });
var ship = function ship(len) {
  return {
    length: len,
    hits: 0,
    hit: function hit() {
      this.hits += 1;
    },
    isSunk: function isSunk() {
      if (this.hits === this.length) return true;
      return false;
    }
  };
};
function createBoard() {
  var board = [];
  for (var i = 1; i < 11; i++) {
    var column = {};
    Object.assign(column, {
      column: i,
      row: [{
        position: "a".concat(i),
        hasShip: false
      }, {
        position: "b".concat(i),
        hasShip: false
      }, {
        position: "c".concat(i),
        hasShip: false
      }, {
        position: "d".concat(i),
        hasShip: false
      }, {
        position: "e".concat(i),
        hasShip: false
      }, {
        position: "f".concat(i),
        hasShip: false
      }, {
        position: "g".concat(i),
        hasShip: false
      }, {
        position: "h".concat(i),
        hasShip: false
      }, {
        position: "i".concat(i),
        hasShip: false
      }, {
        position: "j".concat(i),
        hasShip: false
      }]
    });
    board.push(column);
  }
  return board;
}
var gameBoard = function gameBoard() {
  return {
    board: createBoard(),
    findSquare: function findSquare(col, row) {
      var square = this.board[row - 1].row.filter(function (obj) {
        return obj.position === "".concat(col).concat(row);
      });
      return square;
    },
    checkPosition: function checkPosition(col, row) {
      var result = {};
      var square = this.findSquare(col, row);
      var position = square[0].position;
      var hasShip = square[0].hasShip;
      Object.assign(result, {
        position: position,
        hasShip: hasShip
      });
      return result;
    },
    ships: [],
    placeShip: function placeShip(startCol, endCol, startRow, endRow, name) {
      var length = 0;
      var occupiedSquares = [];
      if (startRow !== endRow) {
        for (var i = startRow; i < endRow + 1; i++) {
          var square = this.findSquare(startCol, i);
          square[0].hasShip = true;
          length += 1;
          occupiedSquares.push("".concat(startCol).concat(i));
        }
      } else {
        var currentCol = startCol;
        while (currentCol !== String.fromCharCode(endCol.charCodeAt(0) + 1)) {
          var _square = this.findSquare(currentCol, startRow);
          _square[0].hasShip = true;
          occupiedSquares.push("".concat(currentCol).concat(startRow));
          currentCol = String.fromCharCode(currentCol.charCodeAt(0) + 1);
          length += 1;
        }
      }
      this.ships.push({
        squares: occupiedSquares,
        name: name,
        obj: ship(length)
      });
    },
    attacks: [],
    trackAttack: function trackAttack(position, attackHit, sankShip) {
      this.attacks.push({
        position: position,
        attackHit: attackHit,
        sankShip: sankShip
      });
    },
    allShipsSunk: function allShipsSunk() {
      if (this.ships.length === 0) return false;
      var shipsSunk = 0;
      this.attacks.forEach(function (attack) {
        if (attack.sankShip) shipsSunk += 1;
      });
      if (shipsSunk >= this.ships.length) return true;
      return false;
    },
    isRepeatedAttack: function isRepeatedAttack(col, row) {
      var repeat = false;
      this.attacks.forEach(function (attack) {
        if (attack.position === "".concat(col).concat(row)) {
          repeat = true;
          return;
        }
      });
      return repeat;
    },
    receiveAttack: function receiveAttack(col, row) {
      if (this.isRepeatedAttack(col, row)) return undefined;
      var attackedShip = false;
      this.ships.forEach(function (item) {
        item.squares.forEach(function (square) {
          if (square === "".concat(col).concat(row)) attackedShip = item;
        });
      });
      if (attackedShip) {
        attackedShip.obj.hit();
        this.trackAttack("".concat(col).concat(row), true, attackedShip.obj.isSunk());
        return attackedShip.name;
      }
      this.trackAttack("".concat(col).concat(row), false, false);
      return "".concat(col).concat(row);
    }
  };
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display */ "./src/display.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./src/game.js");


(0,_display__WEBPACK_IMPORTED_MODULE_0__.displayGame)();
var shipsArray = [[{
  col: "a",
  row: 1
}, {
  col: "a",
  row: 2
}], [{
  col: "d",
  row: 9
}, {
  col: "e",
  row: 9
}, {
  col: "f",
  row: 9
}, {
  col: "g",
  row: 9
}], [{
  col: "j",
  row: 6
}, {
  col: "j",
  row: 7
}, {
  col: "j",
  row: 8
}], [{
  col: "c",
  row: 3
}, {
  col: "c",
  row: 4
}, {
  col: "c",
  row: 5
}, {
  col: "c",
  row: 6
}, {
  col: "c",
  row: 7
}], [{
  col: "e",
  row: 7
}, {
  col: "f",
  row: 7
}, {
  col: "g",
  row: 7
}]];
function initGame(ships) {
  ships.forEach(function (ship) {
    ship.forEach(function (square) {
      var element = document.querySelector(".player-board").querySelector(".".concat(square.col).concat(square.row));
      element.classList.add("ship");
    });
  });
}
initGame(shipsArray);
function advanceGame(col, row) {
  if (_game__WEBPACK_IMPORTED_MODULE_1__.gameBoard.isRepeatedAttack(col, row)) return;
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RixRQUFRLENBQ3JCQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQzlCQSxhQUFhLEtBQUFhLE1BQUEsQ0FBS0gsTUFBTSxDQUFDMEMsR0FBRyxFQUFBdkMsTUFBQSxDQUFHSCxNQUFNLENBQUNvQyxHQUFHLEVBQUc7TUFDL0NxQyxPQUFPLENBQUN4RSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0VBQ0osQ0FBQyxDQUFDO0FBQ0o7QUFFQXNFLFFBQVEsQ0FBQ0QsVUFBVSxDQUFDO0FBRXBCLFNBQVNHLFdBQVdBLENBQUNoQyxHQUFHLEVBQUVOLEdBQUcsRUFBRTtFQUM3QixJQUFJSSw2REFBMEIsQ0FBQ0UsR0FBRyxFQUFFTixHQUFHLENBQUMsRUFBRTtBQUM1QyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kaXNwbGF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtY29udGFpbmVyXVwiKTtcblxuZnVuY3Rpb24gdXBkYXRlQm9hcmREaXNwbGF5KGJvYXJkKSB7fVxuXG5mdW5jdGlvbiBjcmVhdGVCb2FyZChldmVudEhhbmRsZXIpIHtcbiAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IDExOyBpICs9IDEpIHtcbiAgICBmb3IgKGxldCBqID0gXCJhXCI7IGogIT09IFwia1wiOyBqID0gU3RyaW5nLmZyb21DaGFyQ29kZShqLmNoYXJDb2RlQXQoMCkgKyAxKSkge1xuICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic3F1YXJlXCIpO1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoYCR7an0ke2l9YCk7XG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coYCR7an0ke2l9YCk7XG4gICAgICAgIGV2ZW50SGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBib2FyZC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIik7XG4gICAgICBib2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYm9hcmQ7XG59XG5cbmZ1bmN0aW9uIHJlc2V0KCkge1xuICBjb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVIZWFkZXIoKSB7XG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7XG4gIGhlYWRlci50ZXh0Q29udGVudCA9IFwiQmF0dGxlc2hpcFwiO1xuICByZXR1cm4gaGVhZGVyO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGb290ZXIoKSB7XG4gIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb290ZXJcIik7XG4gIGZvb3Rlci50ZXh0Q29udGVudCA9IFwiTWFkZSBieSBXaWxsIE1vcmV0elwiO1xuICByZXR1cm4gZm9vdGVyO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVUaXRsZSh0ZXh0KSB7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdGl0bGUuY2xhc3NMaXN0LmFkZChcInRpdGxlXCIpO1xuICB0aXRsZS50ZXh0Q29udGVudCA9IHRleHQ7XG4gIHJldHVybiB0aXRsZTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheUdhbWUoZXZlbnRIYW5kbGVyKSB7XG4gIHJlc2V0KCk7XG5cbiAgY29uc3QgaGVhZGVyID0gY3JlYXRlSGVhZGVyKCk7XG4gIGNvbnN0IGZvb3RlciA9IGNyZWF0ZUZvb3RlcigpO1xuICBjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gIGNvbnN0IGNvbXB1dGVyVGl0bGUgPSBjcmVhdGVUaXRsZShcIkNvbXB1dGVyJ3MgQm9hcmRcIik7XG4gIGNvbnN0IHBsYXllclRpdGxlID0gY3JlYXRlVGl0bGUoXCJZb3VyIEJvYXJkXCIpO1xuICBjb25zdCBjb21wdXRlckJvYXJkID0gY3JlYXRlQm9hcmQoKTtcbiAgY29tcHV0ZXJCb2FyZC5jbGFzc0xpc3QuYWRkKFwiY29tcHV0ZXItYm9hcmRcIik7XG4gIGNvbnN0IHBsYXllckJvYXJkID0gY3JlYXRlQm9hcmQoKTtcbiAgcGxheWVyQm9hcmQuY2xhc3NMaXN0LmFkZChcInBsYXllci1ib2FyZFwiKTtcblxuICBzZWN0aW9uLmFwcGVuZENoaWxkKGNvbXB1dGVyVGl0bGUpO1xuICBzZWN0aW9uLmFwcGVuZENoaWxkKGNvbXB1dGVyQm9hcmQsIG51bGwpO1xuICBzZWN0aW9uLmFwcGVuZENoaWxkKHBsYXllclRpdGxlKTtcbiAgc2VjdGlvbi5hcHBlbmRDaGlsZChwbGF5ZXJCb2FyZCwgZXZlbnRIYW5kbGVyKTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNlY3Rpb24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVNldHVwKGV2ZW50SGFuZGxlcikge1xuICBjb25zdCBoZWFkZXIgPSBjcmVhdGVIZWFkZXIoKTtcbiAgY29uc3QgZm9vdGVyID0gY3JlYXRlRm9vdGVyKCk7XG4gIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgY29uc3QgdGl0bGUgPSBjcmVhdGVUaXRsZShcIlBsYWNlIFlvdXIgU2hpcHMhXCIpO1xuICBjb25zdCBib2FyZCA9IGNyZWF0ZUJvYXJkKGV2ZW50SGFuZGxlcik7XG5cbiAgc2VjdGlvbi5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoYm9hcmQpO1xuXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VjdGlvbik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb290ZXIpO1xufVxuXG5leHBvcnQgeyBkaXNwbGF5R2FtZSwgZGlzcGxheVNldHVwIH07XG4iLCJjb25zdCBzaGlwID0gKGxlbikgPT4gKHtcbiAgbGVuZ3RoOiBsZW4sXG4gIGhpdHM6IDAsXG4gIGhpdCgpIHtcbiAgICB0aGlzLmhpdHMgKz0gMTtcbiAgfSxcbiAgaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG59KTtcblxuZnVuY3Rpb24gY3JlYXRlQm9hcmQoKSB7XG4gIGNvbnN0IGJvYXJkID0gW107XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgMTE7IGkrKykge1xuICAgIGNvbnN0IGNvbHVtbiA9IHt9O1xuICAgIE9iamVjdC5hc3NpZ24oY29sdW1uLCB7XG4gICAgICBjb2x1bW46IGksXG4gICAgICByb3c6IFtcbiAgICAgICAgeyBwb3NpdGlvbjogYGEke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGIke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGMke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGQke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGUke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGYke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGcke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGgke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGkke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGoke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgIF0sXG4gICAgfSk7XG4gICAgYm9hcmQucHVzaChjb2x1bW4pO1xuICB9XG4gIHJldHVybiBib2FyZDtcbn1cblxuY29uc3QgZ2FtZUJvYXJkID0gKCkgPT4gKHtcbiAgYm9hcmQ6IGNyZWF0ZUJvYXJkKCksXG4gIGZpbmRTcXVhcmUoY29sLCByb3cpIHtcbiAgICBjb25zdCBzcXVhcmUgPSB0aGlzLmJvYXJkW3JvdyAtIDFdLnJvdy5maWx0ZXIoKG9iaikgPT4ge1xuICAgICAgcmV0dXJuIG9iai5wb3NpdGlvbiA9PT0gYCR7Y29sfSR7cm93fWA7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNxdWFyZTtcbiAgfSxcbiAgY2hlY2tQb3NpdGlvbihjb2wsIHJvdykge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuZmluZFNxdWFyZShjb2wsIHJvdyk7XG4gICAgY29uc3QgcG9zaXRpb24gPSBzcXVhcmVbMF0ucG9zaXRpb247XG4gICAgY29uc3QgaGFzU2hpcCA9IHNxdWFyZVswXS5oYXNTaGlwO1xuICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0LCB7IHBvc2l0aW9uLCBoYXNTaGlwIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG4gIHNoaXBzOiBbXSxcbiAgcGxhY2VTaGlwKHN0YXJ0Q29sLCBlbmRDb2wsIHN0YXJ0Um93LCBlbmRSb3csIG5hbWUpIHtcbiAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICBsZXQgb2NjdXBpZWRTcXVhcmVzID0gW107XG4gICAgaWYgKHN0YXJ0Um93ICE9PSBlbmRSb3cpIHtcbiAgICAgIGZvciAobGV0IGkgPSBzdGFydFJvdzsgaSA8IGVuZFJvdyArIDE7IGkrKykge1xuICAgICAgICBjb25zdCBzcXVhcmUgPSB0aGlzLmZpbmRTcXVhcmUoc3RhcnRDb2wsIGkpO1xuICAgICAgICBzcXVhcmVbMF0uaGFzU2hpcCA9IHRydWU7XG4gICAgICAgIGxlbmd0aCArPSAxO1xuICAgICAgICBvY2N1cGllZFNxdWFyZXMucHVzaChgJHtzdGFydENvbH0ke2l9YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBjdXJyZW50Q29sID0gc3RhcnRDb2w7XG4gICAgICB3aGlsZSAoY3VycmVudENvbCAhPT0gU3RyaW5nLmZyb21DaGFyQ29kZShlbmRDb2wuY2hhckNvZGVBdCgwKSArIDEpKSB7XG4gICAgICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuZmluZFNxdWFyZShjdXJyZW50Q29sLCBzdGFydFJvdyk7XG4gICAgICAgIHNxdWFyZVswXS5oYXNTaGlwID0gdHJ1ZTtcbiAgICAgICAgb2NjdXBpZWRTcXVhcmVzLnB1c2goYCR7Y3VycmVudENvbH0ke3N0YXJ0Um93fWApO1xuICAgICAgICBjdXJyZW50Q29sID0gU3RyaW5nLmZyb21DaGFyQ29kZShjdXJyZW50Q29sLmNoYXJDb2RlQXQoMCkgKyAxKTtcbiAgICAgICAgbGVuZ3RoICs9IDE7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2hpcHMucHVzaCh7XG4gICAgICBzcXVhcmVzOiBvY2N1cGllZFNxdWFyZXMsXG4gICAgICBuYW1lLFxuICAgICAgb2JqOiBzaGlwKGxlbmd0aCksXG4gICAgfSk7XG4gIH0sXG4gIGF0dGFja3M6IFtdLFxuICB0cmFja0F0dGFjayhwb3NpdGlvbiwgYXR0YWNrSGl0LCBzYW5rU2hpcCkge1xuICAgIHRoaXMuYXR0YWNrcy5wdXNoKHsgcG9zaXRpb24sIGF0dGFja0hpdCwgc2Fua1NoaXAgfSk7XG4gIH0sXG4gIGFsbFNoaXBzU3VuaygpIHtcbiAgICBpZiAodGhpcy5zaGlwcy5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcbiAgICBsZXQgc2hpcHNTdW5rID0gMDtcbiAgICB0aGlzLmF0dGFja3MuZm9yRWFjaCgoYXR0YWNrKSA9PiB7XG4gICAgICBpZiAoYXR0YWNrLnNhbmtTaGlwKSBzaGlwc1N1bmsgKz0gMTtcbiAgICB9KTtcbiAgICBpZiAoc2hpcHNTdW5rID49IHRoaXMuc2hpcHMubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG4gIGlzUmVwZWF0ZWRBdHRhY2soY29sLCByb3cpIHtcbiAgICBsZXQgcmVwZWF0ID0gZmFsc2U7XG4gICAgdGhpcy5hdHRhY2tzLmZvckVhY2goKGF0dGFjaykgPT4ge1xuICAgICAgaWYgKGF0dGFjay5wb3NpdGlvbiA9PT0gYCR7Y29sfSR7cm93fWApIHtcbiAgICAgICAgcmVwZWF0ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXBlYXQ7XG4gIH0sXG4gIHJlY2VpdmVBdHRhY2soY29sLCByb3cpIHtcbiAgICBpZiAodGhpcy5pc1JlcGVhdGVkQXR0YWNrKGNvbCwgcm93KSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBsZXQgYXR0YWNrZWRTaGlwID0gZmFsc2U7XG4gICAgdGhpcy5zaGlwcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpdGVtLnNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgICAgIGlmIChzcXVhcmUgPT09IGAke2NvbH0ke3Jvd31gKSBhdHRhY2tlZFNoaXAgPSBpdGVtO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKGF0dGFja2VkU2hpcCkge1xuICAgICAgYXR0YWNrZWRTaGlwLm9iai5oaXQoKTtcbiAgICAgIHRoaXMudHJhY2tBdHRhY2soYCR7Y29sfSR7cm93fWAsIHRydWUsIGF0dGFja2VkU2hpcC5vYmouaXNTdW5rKCkpO1xuICAgICAgcmV0dXJuIGF0dGFja2VkU2hpcC5uYW1lO1xuICAgIH1cbiAgICB0aGlzLnRyYWNrQXR0YWNrKGAke2NvbH0ke3Jvd31gLCBmYWxzZSwgZmFsc2UpO1xuICAgIHJldHVybiBgJHtjb2x9JHtyb3d9YDtcbiAgfSxcbn0pO1xuXG5leHBvcnQgeyBzaGlwLCBnYW1lQm9hcmQgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZGlzcGxheUdhbWUsIGRpc3BsYXlTZXR1cCB9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCB7IGdhbWVCb2FyZCB9IGZyb20gXCIuL2dhbWVcIjtcblxuZGlzcGxheUdhbWUoKTtcblxuY29uc3Qgc2hpcHNBcnJheSA9IFtcbiAgW1xuICAgIHsgY29sOiBcImFcIiwgcm93OiAxIH0sXG4gICAgeyBjb2w6IFwiYVwiLCByb3c6IDIgfSxcbiAgXSxcbiAgW1xuICAgIHsgY29sOiBcImRcIiwgcm93OiA5IH0sXG4gICAgeyBjb2w6IFwiZVwiLCByb3c6IDkgfSxcbiAgICB7IGNvbDogXCJmXCIsIHJvdzogOSB9LFxuICAgIHsgY29sOiBcImdcIiwgcm93OiA5IH0sXG4gIF0sXG4gIFtcbiAgICB7IGNvbDogXCJqXCIsIHJvdzogNiB9LFxuICAgIHsgY29sOiBcImpcIiwgcm93OiA3IH0sXG4gICAgeyBjb2w6IFwialwiLCByb3c6IDggfSxcbiAgXSxcbiAgW1xuICAgIHsgY29sOiBcImNcIiwgcm93OiAzIH0sXG4gICAgeyBjb2w6IFwiY1wiLCByb3c6IDQgfSxcbiAgICB7IGNvbDogXCJjXCIsIHJvdzogNSB9LFxuICAgIHsgY29sOiBcImNcIiwgcm93OiA2IH0sXG4gICAgeyBjb2w6IFwiY1wiLCByb3c6IDcgfSxcbiAgXSxcbiAgW1xuICAgIHsgY29sOiBcImVcIiwgcm93OiA3IH0sXG4gICAgeyBjb2w6IFwiZlwiLCByb3c6IDcgfSxcbiAgICB7IGNvbDogXCJnXCIsIHJvdzogNyB9LFxuICBdLFxuXTtcblxuZnVuY3Rpb24gaW5pdEdhbWUoc2hpcHMpIHtcbiAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHNoaXAuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnRcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLWJvYXJkXCIpXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtzcXVhcmUuY29sfSR7c3F1YXJlLnJvd31gKTtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5pbml0R2FtZShzaGlwc0FycmF5KTtcblxuZnVuY3Rpb24gYWR2YW5jZUdhbWUoY29sLCByb3cpIHtcbiAgaWYgKGdhbWVCb2FyZC5pc1JlcGVhdGVkQXR0YWNrKGNvbCwgcm93KSkgcmV0dXJuO1xufVxuIl0sIm5hbWVzIjpbImNvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInVwZGF0ZUJvYXJkRGlzcGxheSIsImJvYXJkIiwiY3JlYXRlQm9hcmQiLCJldmVudEhhbmRsZXIiLCJjcmVhdGVFbGVtZW50IiwiX2xvb3AiLCJpIiwiX2xvb3AyIiwiaiIsInNxdWFyZSIsImNsYXNzTGlzdCIsImFkZCIsImNvbmNhdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb25zb2xlIiwibG9nIiwiYXBwZW5kQ2hpbGQiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJjaGFyQ29kZUF0IiwicmVzZXQiLCJ0ZXh0Q29udGVudCIsImNyZWF0ZUhlYWRlciIsImhlYWRlciIsImNyZWF0ZUZvb3RlciIsImZvb3RlciIsImNyZWF0ZVRpdGxlIiwidGV4dCIsInRpdGxlIiwiZGlzcGxheUdhbWUiLCJzZWN0aW9uIiwiY29tcHV0ZXJUaXRsZSIsInBsYXllclRpdGxlIiwiY29tcHV0ZXJCb2FyZCIsInBsYXllckJvYXJkIiwiZGlzcGxheVNldHVwIiwic2hpcCIsImxlbiIsImxlbmd0aCIsImhpdHMiLCJoaXQiLCJpc1N1bmsiLCJjb2x1bW4iLCJPYmplY3QiLCJhc3NpZ24iLCJyb3ciLCJwb3NpdGlvbiIsImhhc1NoaXAiLCJwdXNoIiwiZ2FtZUJvYXJkIiwiZmluZFNxdWFyZSIsImNvbCIsImZpbHRlciIsIm9iaiIsImNoZWNrUG9zaXRpb24iLCJyZXN1bHQiLCJzaGlwcyIsInBsYWNlU2hpcCIsInN0YXJ0Q29sIiwiZW5kQ29sIiwic3RhcnRSb3ciLCJlbmRSb3ciLCJuYW1lIiwib2NjdXBpZWRTcXVhcmVzIiwiY3VycmVudENvbCIsInNxdWFyZXMiLCJhdHRhY2tzIiwidHJhY2tBdHRhY2siLCJhdHRhY2tIaXQiLCJzYW5rU2hpcCIsImFsbFNoaXBzU3VuayIsInNoaXBzU3VuayIsImZvckVhY2giLCJhdHRhY2siLCJpc1JlcGVhdGVkQXR0YWNrIiwicmVwZWF0IiwicmVjZWl2ZUF0dGFjayIsInVuZGVmaW5lZCIsImF0dGFja2VkU2hpcCIsIml0ZW0iLCJzaGlwc0FycmF5IiwiaW5pdEdhbWUiLCJlbGVtZW50IiwiYWR2YW5jZUdhbWUiXSwic291cmNlUm9vdCI6IiJ9