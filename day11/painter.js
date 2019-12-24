const { Computer } = require("../intcode/intcode");

function parseInput(input) {
  return input.split(",").map(Number);
}

function rotate(vec, dir) {
  return dir
    ? // Right
      [-vec[1], vec[0]]
    : // Left
      [vec[1], -vec[0]];
}

const PAINT = 0;
const MOVE = 1;
const states = [PAINT, MOVE];

function key(coordinates) {
  return coordinates.join(":");
}

function coordinates(key) {
  return key.split(":").map(Number);
}

function painter(program, input) {
  const codes = parseInput(program);

  const position = [0, 0];
  let direction = [0, -1];

  let hull = {
    [key(position)]: input || 0,
  };
  let state = 0;
  new Computer(
    codes,
    () => hull[key(position)] || 0,
    value => {
      if (state === states[PAINT]) {
        hull[key(position)] = value;
      } else if (state === states[MOVE]) {
        direction = rotate(direction, value);
        position[0] += direction[0];
        position[1] += direction[1];
      }
      state = ++state % 2;
    }
  ).run();

  return hull;
}

function print(program) {
  const hull = painter(program, 1);

  let [left, right, top, bottom] = [Infinity, -Infinity, Infinity, -Infinity];

  for (let panel of Object.keys(hull)) {
    let [x, y] = coordinates(panel);
    left = Math.min(x, left);
    right = Math.max(x, right);
    top = Math.min(y, top);
    bottom = Math.max(y, bottom);
  }

  let [width, height] = [right - left + 1, bottom - top + 1];

  let output = "";
  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      let coordinates = key([left + i, top + j]);
      if (hull[coordinates] === 1) {
        output += "#";
      } else {
        output += " ";
      }
    }
    output += "\n";
  }

  // console.log(output);
  return output;
}

module.exports = { painter, print };
