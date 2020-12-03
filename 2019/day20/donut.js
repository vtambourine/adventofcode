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
    this.height = this.scheme.length;
    this.width = this.scheme.reduce(
      (width, row) => Math.max(width, row.length),
      0
    );
    this.scanPortals();
  }

  reachable([x, y]) {
    return x >= 0 || y >= 0 || x < this.width || y < this.height;
  }

  scan([x, y]) {
    return this.scheme[y][x];
  }

  neighbours([x, y], depth = 1) {
    const result = [];
    for (let [dx, dy] of DIRECTIONS) {
      const ray = [];
      for (let k = 1; k <= depth; k++) {
        const point = [x + k * dx, y + k * dy];

        if (this.reachable(point)) {
          dx < 0 || dy < 0 ? ray.unshift(point) : ray.push(point);
        }
      }
      if (ray.length) result.push(ray);
    }
    return result;
  }

  portal([x, y]) {
    if (this.scheme[y][x] !== PASSAGE) return false;

    const label = this.neighbours([x, y], 2)
      .map(ray => ray.map(this.scan.bind(this)))
      .filter(chars => chars.every(char => "A" <= char && char <= "Z"))
      .flat()
      .reduce((a, b) => a + b, "");

    return label;
  }

  scanPortals() {
    this.portals = new Map();

    let portal;
    for (let j = 0; j < this.height; j++) {
      for (let i = 0; i < this.width; i++) {
        if ((portal = this.portal([i, j]))) {
          const locations = this.portals.get(portal) || [];
          locations.push([i, j]);
          this.portals.set(portal, locations);
        }
      }
    }
  }

  shortestPath(start, end) {
    const startPoint = this.portals.get(start)[0];
    const visited = new Map([[String(startPoint), 0]]);
    const queue = [startPoint];

    while (queue.length) {
      const next = queue.shift();
      let distance = visited.get(String(next));

      for (let neighbourRay of this.neighbours(next)) {
        let neighbour = neighbourRay[0];

        const key = String(neighbour);
        if (visited.has(key)) continue;
        visited.set(key, distance + 1);

        if (!this.reachable(neighbour) || this.scan(neighbour) !== PASSAGE)
          continue;

        let portal = this.portal(neighbour);

        if (portal) {
          if (portal === end) return distance + 1;
          const jump = this.portals
            .get(portal)
            .find(([x, y]) => neighbour[0] !== x || neighbour[1] !== y);
          visited.set(String(jump), distance + 2);
          queue.push(jump);
        } else {
          queue.push(neighbour);
        }
      }
    }
  }
}

function path(input) {
  const maze = new Maze(input);
  return maze.shortestPath("AA", "ZZ");
}

module.exports = { path };
