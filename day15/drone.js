const readline = require("readline");
const { Computer } = require("../intcode/intcode");

function parseInput(input) {
  return input.split(",").map(Number);
}

const [NORTH, SOUTH, WEST, EAST] = [1, 2, 3, 4];
const BACK = [0, SOUTH, NORTH, EAST, WEST];
const DIRECTIONS = [
  [0, 0],
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];
const [WALL, EMPTY, OXYGEN, UNKNOWN] = [0, 1, 2, undefined];
const SYMBOL = ["#", ".", "X", "?"];

function sleep(t) {
  let now = Date.now();
  while (Date.now() - now < t) {}
}

class Maze {
  constructor() {
    this.grid = new Map();
  }

  key(coordinates) {
    return String(coordinates);
  }

  get(coordinates) {
    return this.grid.get(this.key(coordinates));
  }

  set(coordinates, value) {
    this.grid.set(this.key(coordinates), value);
  }

  neighbours(coordinates) {
    const [x, y] = coordinates;
    return DIRECTIONS.map(([dx, dy]) => [x + dx, y + dy])
      .map(this.key)
      .map(key => this.grid.get(key));
  }

  find(start = [0, 0], target) {
    const visited = new Set(this.key(start));
    const queue = [[start, 0]];
    let next;
    while ((next = queue.shift())) {
      const [position, distance] = next;
      visited.add(this.key(position));
      if (this.get(position) === target) {
        return { position, distance };
      } else {
        this.neighbours(position).forEach((neighbour, index) => {
          if (neighbour > 0) {
            const [x, y] = position;
            const [dx, dy] = DIRECTIONS[index];
            const nextPosition = [x + dx, y + dy];
            if (!visited.has(this.key(nextPosition))) {
              queue.push([nextPosition, distance + 1]);
            }
          }
        });
      }
    }
  }

  fill(start = [0, 0]) {
    const filled = new Map([[this.key(start), 0]]);
    let next;
    const queue = [[start, 0]];
    while ((next = queue.shift())) {
      const [position, time] = next;
      const neighbours = this.neighbours(position);
      for (let i = 1; i < neighbours.length; i++) {
        const neighbour = neighbours[i];
        const [x, y] = position;
        const [dx, dy] = DIRECTIONS[i];
        const nextPosition = [x + dx, y + dy];
        if (neighbour > 0 && !filled.has(this.key(nextPosition))) {
          queue.push([nextPosition, time + 1]);
          filled.set(this.key(nextPosition), time + 1);
        }
      }
    }
    return [...filled.values()].sort((a, b) => (a > b ? 1 : -1)).pop();
  }

  print() {
    sleep(20);
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    let [width, height] = [50, 50];
    let output = "";
    for (let j = 0; j < height; j++) {
      for (let i = 0; i < width; i++) {
        let x = i - Math.floor(width / 2);
        let y = j - Math.floor(height / 2);
        if (x === 0 && y === 0) {
          output += "S";
        } else {
          let key = this.key([x, y]);
          output += `${SYMBOL[this.grid.get(key)] || " "}`;
        }
      }
      output += "\n";
    }
    console.log(output);
  }
}

class Drone {
  constructor(codes) {
    this.computer = new Computer(codes);
    this.maze = new Maze();
    this.currentPosition = [0, 0];
    this.nextStep = undefined;
    this.maze.set(this.currentPosition, EMPTY);
    this.path = [];
  }

  look(direction) {
    this.nextStep = direction;
    const [x, y] = this.currentPosition;
    const [dx, dy] = DIRECTIONS[this.nextStep];
    this.nextPosition = [x + dx, y + dy];
  }

  step() {
    if (this.maze.get(this.nextPosition) === UNKNOWN) {
      this.path.push(this.nextStep);
    }
    this.currentPosition = this.nextPosition;
  }

  input = () => {
    const neighbours = this.maze.neighbours(this.currentPosition);
    const nextUnknown = neighbours.indexOf(UNKNOWN);
    if (nextUnknown === -1) {
      const lastStep = this.path.pop();
      if (lastStep) {
        this.look(BACK[lastStep]);
      } else {
        this.computer.halt();
      }
    } else {
      this.look(nextUnknown);
    }
    return this.nextStep;
  };

  output = status => {
    const [x, y] = this.nextPosition;
    if (status > 0) {
      this.step();
    }
    this.maze.set([x, y], status);
  };

  explore() {
    this.computer.run(this.input, this.output);
    return this.maze;
  }
}

function drone(program) {
  const codes = parseInput(program);
  const maze = new Drone(codes).explore();

  const { position, distance } = maze.find([0, 0], OXYGEN);

  return {
    distance,
    time: maze.fill(position),
  };
}

module.exports = { drone };
