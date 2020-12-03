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

function ship(program, size = 100) {
  const codes = parseInput(program);

  function probe(x, y) {
    let input = [x, y];
    let output;
    new Computer(codes).run(
      () => input.shift(),
      status => (output = status)
    );
    return output;
  }

  let [x, y] = [0, 0];
  while (probe(x + size - 1, y) === STATIONARY) {
    y++;
    while (probe(x, y + size - 1) === STATIONARY) {
      x++;
    }
  }

  return x * 10000 + y;
}

module.exports = { scan, ship };
