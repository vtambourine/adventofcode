const { Computer } = require("../intcode/intcode");

function parseInput(input) {
  return input.split(",").map(Number);
}

const STATIONARY = 0;
const PULLED = 1;

function* prober(width, height) {
  let [x, y] = [0, 0];
  while (x < width && y < height) {
    yield [x, y];
    y = y + Math.floor((x + 1) / width);
    x = (x + 1) % width;
  }
}

function scan(program, [width, height] = [50, 50]) {
  const codes = parseInput(program);
  const probe = prober(width, height);

  let area = 0;
  let point = probe.next().value;
  while (point) {
    new Computer(codes).run(
      () => point.shift(),
      status => {
        if (status === PULLED) area++;
      }
    );
    point = probe.next().value;
  }

  return area;
}

function ship(program) {
  const codes = parseInput(program);

  // const xytoi = (x, y) => y * width + x;
  // const itoxy = i => Math.floor(i / width) + (i % width);

  // const area = new Array(width * height).fill(0);

  function isSquare([ai, aj], [bi, bj]) {
    if (bj - aj === 10 && bi - ai >= 10) {
      return true;
    }
    return false;
  }

  function scanLine(n, start = 0) {
    // scan n-th line
    // return '...#####'
    let c = start;
    let row = "";
    let halt = false;
    let g = 1e4;
    let lastChar;
    let char;
    let input = [];
    while (g-- && !halt) {
      new Computer(codes).run(
        () => {
          if (!input.length) {
            input = [c++, n];
          }
          return input.shift();
        },
        status => {
          lastChar = char;
          if (status === STATIONARY) {
            char = ".";
          }
          if (status === PULLED) {
            char = "#";
          }
          if (lastChar === "#" && char === ".") {
            halt = true;
          } else {
            row += char;
          }
        }
      );
    }

    // console.log("row", n);
    // console.log(row);
    return row;
  }

  function hasSquare(area, n = 100) {
    // check if area has a square with side n
    if (area.length < 10) return false;

    return (
      area[0][area[0].length - n] === "#" &&
      area[n - 1][area[0].length - n] === "#"
    );
  }

  let l = 0;
  let lineStack = [];
  let g = 1e4;
  while (g-- && !hasSquare(lineStack)) {
    if (lineStack.length === 100) {
      lineStack.shift();
    }
    lineStack.push(scanLine(l++));
  }

  // console.log(lineStack.join("\n"));

  let y = l - 11;
  let x = lineStack[0].length - 10;

  return 10000 * x + y;
  //
  // let output = "";
  // for (let j = 0; j < height; j++) {
  //   for (let i = 0; i < width; i++) {
  //     output += area[xytoi(i, j)];
  //   }
  //   output += "\n";
  // }
  //
  // console.log(output);

  return 0;
}

module.exports = { scan, ship };

/*

.............................................................###############
..............................................................###############
..............................................................###############
...............................................................###############
................................................................###############
................................................................###############
.................................................................###############
.................................................................################
..................................................................################
..................................................................################

 */
