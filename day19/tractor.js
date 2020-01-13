const { Computer } = require("../intcode/intcode");

function parseInput(input) {
  return input.split(",").map(Number);
}

const STATIONARY = 0;
const PULLED_BY_SOMETHING = 1;

function scan(program, [width, height]) {
  const codes = parseInput(program);

  const xytoi = (x, y) => y * width + x;
  const itoxy = i => Math.floor(i / width) + (i % width);

  const area = new Array(width * height).fill(0);

  function* point(width, height) {
    let [x, y] = [0, 0];
    while (x < width && y < height) {
      yield [x, y];
      y = y + Math.floor((x + 1) / width);
      x = (x + 1) % width;
    }
  }

  const p = point(width, height);
  let input = [];
  let impact = 0;
  let np = p.next();
  let [i, j] = [0, 0];
  while (!np.done) {
    new Computer(codes).run(
      () => {
        if (!input.length) {
          input = np.value;
          [i, j] = [...input];
        }
        return input.shift();
      },
      status => {
        if (status === STATIONARY) {
          area[xytoi(i, j)] = ".";
        }
        if (status === PULLED_BY_SOMETHING) {
          impact++;
          area[xytoi(i, j)] = "#";
        }
      }
    );
    np = p.next();
  }

  let output = "";
  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      output += area[xytoi(i, j)];
    }
    output += "\n";
  }

  console.log(output);

  console.log(">>>", impact);

  return impact;
}

module.exports = { scan };
