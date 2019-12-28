const { Computer } = require("../intcode/intcode");

function parseInput(input) {
  return input.split(",").map(Number);
}

const [EMPTY, WALL, BLOCK, PADDLE, BALL] = [0, 1, 2, 3, 4];
const SYMBOLS = [" ", "+", "#", "=", "O"];

function key(x, y) {
  return `${x}:${y}`;
}

function blocks(program) {
  const codes = parseInput(program);
  const screen = {};
  let [x, y] = [0, 0];
  let index = 0;

  new Computer(codes).run(null, value => {
    switch (index) {
      case 0:
        x = value;
        break;
      case 1:
        y = value;
        break;
      case 2:
        screen[key(x, y)] = value;
        break;
    }
    index = ++index % 3;
  });

  return Object.values(screen).reduce(
    (blocks, tile) => blocks + (tile === 2 ? 1 : 0),
    0
  );
}

function count(screen, tile) {
  return Object.values(screen).reduce(
    (blocks, t) => blocks + (tile === t ? 1 : 0),
    0
  );
}

function game(program) {
  const codes = parseInput(program);
  codes[0] = 2; // Insert coin

  const screen = {};
  let [x, y] = [0, 0];
  let state = 0;
  let ball = -1;
  let paddle = -1;
  let score = 0;

  const computer = new Computer(codes);
  computer.run(
    () => {
      // render(screen);
      return (ball - paddle) / Math.abs(ball - paddle);
    },
    value => {
      switch (state) {
        case 0:
          x = value;
          break;
        case 1:
          y = value;
          break;
        case 2:
          if (x === -1 && y === 0) {
            score = value;
            if (count(screen, BLOCK) === 0) {
              computer.halt();
            }
          } else {
            screen[key(x, y)] = value;
            if (value === BALL) {
              ball = x;
            } else if (value === PADDLE) {
              paddle = x;
            }
          }
          break;
      }
      state = ++state % 3;
    }
  );
  return score;
}

function render(screen) {
  let [width, height] = Object.keys(screen).reduce(
    (dimensions, coordinates) =>
      coordinates
        .split(":")
        .map((size, index) => Math.max(Number(size) + 1, dimensions[index])),
    [-Infinity, -Infinity]
  );
  let output = "";
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      output += SYMBOLS[screen[key(x, y)]] || "";
    }
    output += "\n";
  }
  console.log(output);
}

module.exports = { blocks, game };
