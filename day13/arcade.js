const { Computer } = require("./intcode");

function parseInput(input) {
  return input.split(",").map(Number);
}

function blocks(program) {
  const codes = parseInput(program);
  const screen = {};
  let [x, y] = [0, 0];
  let index = 0;

  new Computer(codes, null, value => {
    switch (index) {
      case 0:
        x = value;
        break;
      case 1:
        y = value;
        break;
      case 2:
        screen[`${x}:${y}`] = value;
        break;
    }
    index = ++index % 3;
  }).run();
  // console.log(screen);
  return Object.values(screen).reduce(
    (blocks, tile) => blocks + (tile === 2 ? 1 : 0),
    0
  );
}

module.exports = { blocks };
