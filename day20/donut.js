const PASSAGE = ".";
const WALL = "#";

const DIRECTIONS = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];

class Maze {
  constructor(input) {
    this.scheme = input.split("\n");
    console.log(this.neighbours([9, 2]));
  }

  neighbours([x, y], depth = 1) {
    const result = [];
    return 9;
  }

  isPortal([x, y]) {
    if (this.scheme[y][x] !== ".") return false;
    const label = this.neighbours([x, y], 2)
      .filter(([a, b]) => /[A-Z]/.test(a) && /[A-Z]/.test(b))
      .reduce((a, b) => a + b);
    if (label) return label;
    return false;
  }
}

function path(input) {
  const maze = new Maze(input);
  // maze => start node or index of noes

  /*

    {
      AA: { BC: 5, ZZ: 30 },
      BC: { DE: 6 },
     ...
     FG: { ZZ: 6 }
    }

   */
  return 1;
}

module.exports = { path };
