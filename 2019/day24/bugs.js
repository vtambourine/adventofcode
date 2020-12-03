function parseInput(input) {
  return input.split("\n").map(row => row.split(""));
}

const WIDTH = 5;
const HEIGHT = 5;

const BUG = "#";
const EMPTY = ".";
const RECURSION = "?";

const ADJACENT = [
  [-1, 0], // up
  [1, 0], // down
  [0, -1], // left
  [0, 1], // right
];

function biodiversity(layer) {
  let rating = 0;
  for (let j = 0; j < HEIGHT; j++) {
    for (let i = 0; i < WIDTH; i++) {
      if (layer[j][i] === BUG) {
        rating += 2 ** (j * WIDTH + i);
      }
    }
  }
  return rating;
}

function emptyLayer() {
  return new Array(HEIGHT).fill(EMPTY).map(() => new Array(WIDTH).fill(EMPTY));
}

function neighbours(layer, [x, y]) {
  return ADJACENT.reduce((density, [dx, dy]) => {
    const [xp, yp] = [x + dx, y + dy];
    if (
      xp >= 0 &&
      xp < WIDTH &&
      yp >= 0 &&
      yp < HEIGHT &&
      layer[yp][xp] === BUG
    ) {
      density += 1;
    }
    return density;
  }, 0);
}

const nextGeneration = emptyLayer();

function generation(layer) {
  for (let j = 0; j < HEIGHT; j++) {
    for (let i = 0; i < WIDTH; i++) {
      const density = neighbours(layer, [i, j]);
      if (layer[j][i] === BUG && density !== 1) {
        nextGeneration[j][i] = EMPTY;
      } else if (layer[j][i] === EMPTY && (density === 1 || density === 2)) {
        nextGeneration[j][i] = BUG;
      } else {
        nextGeneration[j][i] = layer[j][i];
      }
    }
  }

  for (let j = 0; j < HEIGHT; j++) {
    for (let i = 0; i < WIDTH; i++) {
      layer[j][i] = nextGeneration[j][i];
    }
  }
}

function cycle(input) {
  const layer = parseInput(input);

  const ratings = new Set();
  let rating = biodiversity(layer);
  while (!ratings.has(rating)) {
    ratings.add(rating);
    generation(layer);
    rating = biodiversity(layer);
  }

  return rating;
}

function count(layer) {
  return layer.reduce(
    (bugs, row) =>
      bugs + row.reduce((bugs, cell) => (cell === BUG ? bugs + 1 : bugs), 0),
    0
  );
}

function recursiveNeighbours(grid, level, [x, y]) {
  const layer = grid.get(level);
  const outerLayer = grid.get(level - 1);
  const innerLayer = grid.get(level + 1);

  let density = 0;

  for (let [dx, dy] of ADJACENT) {
    const [xp, yp] = [x + dx, y + dy];
    if (
      xp >= 0 &&
      xp < WIDTH &&
      yp >= 0 &&
      yp < HEIGHT &&
      layer[yp][xp] === BUG
    ) {
      density += 1;
    }
  }

  if (outerLayer) {
    if (y === 0 && outerLayer[1][2] === BUG) density++;
    if (y === HEIGHT - 1 && outerLayer[3][2] === BUG) density++;

    if (x === 0 && outerLayer[2][1] === BUG) density++;
    if (x === WIDTH - 1 && outerLayer[2][3] === BUG) density++;
  }

  if (innerLayer) {
    if (x === 2 && y === 1) {
      density += innerLayer[0].reduce(
        (bugs, cell) => bugs + (cell === BUG ? 1 : 0),
        0
      );
    }
    if (x === 2 && y === 3) {
      density += innerLayer[HEIGHT - 1].reduce(
        (bugs, cell) => bugs + (cell === BUG ? 1 : 0),
        0
      );
    }
    if (x === 1 && y === 2) {
      density += innerLayer.reduce(
        (bugs, row) => bugs + (row[0] === BUG ? 1 : 0),
        0
      );
    }
    if (x === 3 && y === 2) {
      density += innerLayer.reduce(
        (bugs, row) => bugs + (row[WIDTH - 1] === BUG ? 1 : 0),
        0
      );
    }
  }

  return density;
}

function emptyRecursiveLayer() {
  const layer = emptyLayer();
  layer[Math.floor(HEIGHT / 2)][Math.floor(WIDTH / 2)] = RECURSION;
  return layer;
}

function recursiveGeneration(grid) {
  const nextGrid = new Map();

  let minLevel = 0;
  let maxLevel = 0;

  for (let level of grid.keys()) {
    minLevel = Math.min(level, minLevel);
    maxLevel = Math.max(level, maxLevel);
  }

  if (!grid.has(minLevel - 1) && count(grid.get(minLevel))) {
    grid.set(minLevel - 1, emptyRecursiveLayer());
  }
  if (!grid.has(maxLevel + 1) && count(grid.get(maxLevel))) {
    grid.set(maxLevel + 1, emptyRecursiveLayer());
  }

  for (let [level, layer] of grid) {
    if (!nextGrid.has(level)) {
      nextGrid.set(level, emptyRecursiveLayer());
    }

    const nextLayer = nextGrid.get(level);
    for (let j = 0; j < HEIGHT; j++) {
      for (let i = 0; i < WIDTH; i++) {
        const density = recursiveNeighbours(grid, level, [i, j]);
        if (layer[j][i] === BUG && density !== 1) {
          nextLayer[j][i] = EMPTY;
        } else if (layer[j][i] === EMPTY && (density === 1 || density === 2)) {
          nextLayer[j][i] = BUG;
        } else {
          nextLayer[j][i] = layer[j][i];
        }
      }
    }
  }

  for (let [level, nextLayer] of nextGrid) {
    if (grid.has(level)) {
      const layer = grid.get(level);
      for (let j = 0; j < HEIGHT; j++) {
        for (let i = 0; i < WIDTH; i++) {
          layer[j][i] = nextLayer[j][i];
        }
      }
    } else {
      if (count(nextLayer)) {
        const layer = emptyLayer();
        for (let j = 0; j < HEIGHT; j++) {
          for (let i = 0; i < WIDTH; i++) {
            layer[j][i] = nextLayer[j][i];
          }
        }
        grid.set(level, layer);
      }
    }
  }
}

function multiverse(input, iterations) {
  const layer = parseInput(input);
  layer[Math.floor(HEIGHT / 2)][Math.floor(WIDTH / 2)] = RECURSION;

  const grid = new Map();
  grid.set(0, layer);

  for (let i = 0; i < iterations; i++) {
    recursiveGeneration(grid);
  }

  return [...grid.values()].reduce((bugs, layer) => bugs + count(layer), 0);
}

module.exports = { cycle, multiverse };
