const { Computer } = require("../intcode/intcode");

function parseInput(input) {
  return input.split(",").map(Number);
}

class Scaffold {
  static SCAFFOLD = "#";

  static TOP = 1;
  static BOTTOM = 2;
  static LEFT = 3;
  static RIGHT = 4;

  static DIRECTIONS = [
    [0, 0], // center
    [0, -1], // top
    [0, 1], // bottom
    [-1, 0], // left
    [1, 0], // right
  ];

  static TURN_BACK = [
    0,
    Scaffold.BOTTOM,
    Scaffold.TOP,
    Scaffold.RIGHT,
    Scaffold.LEFT,
  ];

  static TURN_LEFT = [
    0,
    Scaffold.LEFT,
    Scaffold.RIGHT,
    Scaffold.BOTTOM,
    Scaffold.TOP,
  ];

  static TURN_RIGHT = [
    0,
    Scaffold.RIGHT,
    Scaffold.LEFT,
    Scaffold.TOP,
    Scaffold.BOTTOM,
  ];

  static BOTS = ["^", "v", "<", ">"];

  constructor(screen) {
    this.screen = screen.split("\n").map(row => row.split(""));

    this.width = this.screen[0].length;
    this.height = this.screen.length;
    this.list = this.screen.reduce((row, nextRow) => row.concat(nextRow));

    this.position = this.list.findIndex(segment =>
      Scaffold.BOTS.includes(segment)
    );
    this.direction = Scaffold.BOTS.indexOf(this.list[this.position]) + 1;

    this.route = [];
  }

  index([x, y]) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return -1;
    }
    return this.width * y + x;
  }

  coordinates(index) {
    return [index % this.width, Math.floor(index / this.width)];
  }

  neighbours(index) {
    const [x, y] = this.coordinates(index);

    return Scaffold.DIRECTIONS.map(([dx, dy]) => {
      const next = this.index([x + dx, y + dy]);
      if (Scaffold.BOTS.includes(this.list[next])) {
        return Scaffold.SCAFFOLD;
      } else {
        return this.list[next];
      }
    });
  }

  end() {
    const lookup = this.neighbours(this.position);
    lookup.splice(Scaffold.TURN_BACK[this.direction], 1);
    lookup.splice(0, 1);
    return lookup.every(segment => segment !== Scaffold.SCAFFOLD);
  }

  move() {
    let [x, y] = this.coordinates(this.position);
    let [dx, dy] = Scaffold.DIRECTIONS[this.direction];

    let rx, ry;
    if (
      (([rx, ry] = [dy, -dx]),
      this.list[this.index([x + rx, y + ry])] === Scaffold.SCAFFOLD)
    ) {
      this.route.push("L");
      this.direction = Scaffold.TURN_LEFT[this.direction];
    } else if (
      (([rx, ry] = [-dy, dx]),
      this.list[this.index([x + rx, y + ry])] === Scaffold.SCAFFOLD)
    ) {
      this.route.push("R");
      this.direction = Scaffold.TURN_RIGHT[this.direction];
    }

    let steps = 0;
    [dx, dy] = Scaffold.DIRECTIONS[this.direction];
    let g = 1e4;
    while (
      g-- &&
      this.neighbours(this.position)[this.direction] === Scaffold.SCAFFOLD
    ) {
      steps++;
      [x, y] = [x + dx, y + dy];
      this.position = this.index([x, y]);
    }
    this.route.push(steps);
  }

  traverse() {
    while (!this.end()) {
      this.move();
    }
    return this.route;
  }

  alignment() {
    return this.list.reduce(
      (res, _, index) =>
        res +
        (this.neighbours(index).every(segment => segment === Scaffold.SCAFFOLD)
          ? this.coordinates(index).reduce((x, y) => x * y)
          : 0),
      0
    );
  }
}

function alignment(program) {
  const codes = parseInput(program);

  let output = "";
  new Computer(codes).run(
    () => {},
    char => {
      output += String.fromCharCode(char);
    }
  );

  return new Scaffold(output).alignment();
}

const ZIP_REGEXP = /^(.{1,21})\1*?(.{1,21})(?:\1|\2)*?(.{1,21})(?:\1|\2|\3)*$/;

function zip(input) {
  const string = input + ",";
  const matches = string.match(ZIP_REGEXP);
  let [_, A, B, C] = matches;
  [A, B, C] = [A, B, C].map(partial => partial.replace(/,$/, "").trim());

  const zipped = string
    .replace(new RegExp(A, "g"), "A")
    .replace(new RegExp(B, "g"), "B")
    .replace(new RegExp(C, "g"), "C")
    .replace(/,$/, "");

  return [zipped, A, B, C];
}

function dust(program) {
  const codes = parseInput(program);

  let output = "";
  new Computer(codes).run(
    () => {},
    char => {
      output += String.fromCharCode(char);
    }
  );

  const scaffold = new Scaffold(output);
  const route = scaffold.traverse();

  const input = [...zip(route), "n"].join("\n") + "\n";

  codes[0] = 2;
  let dust = 0;
  let char = 0;
  new Computer(codes).run(
    () => {
      return input[char++].charCodeAt(0);
    },
    output => {
      dust = output;
    }
  );

  return dust;
}

module.exports = { alignment, dust };
