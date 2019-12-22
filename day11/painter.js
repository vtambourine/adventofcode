const { Computer } = require("./intcode");

function parseInput(input) {
  return input.split(",").map(Number);
}

function rotate(vec, dir) {
  if (dir === 0) {
    // left
    return [-vec[1], vec[0]];
  } else if (dir === 1) {
    // right
    return [vec[1], -vec[0]];
  }
}

function painter(program, input) {
  const codes = parseInput(program);

  let coord = [0, 0];
  let dir = [0, -1];

  let hull = {
    "0:0": input || 0,
  };
  let state = "color";
  new Computer(
    codes,
    () => hull[coord.join(":")] || 0,
    value => {
      if (state === "color") {
        hull[coord.join(":")] = value;
        state = "direction";
      } else if (state === "direction") {
        dir = rotate(dir, value);
        coord[0] += dir[0];
        coord[1] += dir[1];
        state = "color";
      }
    }
  ).run();

  return hull;
}

function print(program) {
  const hull = painter(program, 1);

  // let [width, height] = hull.reduce(([width, height], panel) => {
  //   let coord = panel.split(':');
  //
  // }, [0, 0]);

  let [left, right, top, bottom] = [Infinity, -Infinity, Infinity, -Infinity];

  for (let panel of Object.keys(hull)) {
    let [x, y] = panel.split(":").map(Number);
    left = Math.min(x, left);
    right = Math.max(x, right);
    top = Math.min(y, top);
    bottom = Math.max(y, bottom);
    // console.log(x, y, [left, right, top, bottom]);
  }

  let [width, height] = [right - left + 1, bottom - top + 1];
  // console.log(hull);
  console.log([left, right, top, bottom], [width, height]);

  let output = "";
  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      let coord = `${left + i}:${top + j}`;
      // console.log(coord);
      if (hull[coord] === 1) {
        output += "#";
      } else {
        output += " ";
      }
    }
    console.log(output);
    output = "";
  }

  // console.log([left, right, top, bottom], [width, height]);

  return -1;
}

module.exports = { painter, print };
