function parseInput(input) {
  console.log(input);
  return input.split("\n").map(row => [...row]);
}

const ENTRANCE = "@";

const DIRECTIONS = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];

function isKey(symbol) {
  return "a" <= symbol && symbol <= "z";
}

function isDoor(symbol) {
  return "A" <= symbol && symbol <= "Z";
}

function path(input) {
  const map = parseInput(input);
  const width = map[0].length;
  const height = map.length;

  console.log({ width, height });

  const xy2i = ([x, y]) => y * width + x;
  const i2xy = i => [i % width, Math.floor(i / width)];

  let [x, y] = [-1, -1];
  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      if (map[j][i] === ENTRANCE) {
        [x, y] = [i, j];
      }
    }
  }

  console.log({ x, y });

  function reachable(map, [x, y], hasKeys = ["a"]) {
    const queue = [[x, y]];
    const visited = { [xy2i([x, y])]: 0 };
    const reach = {};
    while (queue.length) {
      const [a, b] = queue.shift();
      for (let [dx, dy] of DIRECTIONS) {
        const [nx, ny] = [a + dx, b + dy];
        if (nx < 0 || nx >= width || ny < 0 || ny >= height) {
          continue;
        }

        const point = xy2i([nx, ny]);
        if (visited[point]) {
          continue;
        } else {
          visited[point] = visited[xy2i([a, b])] + 1;
        }
        const symbol = map[ny][nx];
        if (symbol === "#") {
          continue;
        }
        if (isKey(symbol)) {
          reach[symbol] = visited[point];
        }
        if (isDoor(symbol) && !hasKeys.includes(symbol.toLowerCase())) {
          continue;
        }
        queue.push([nx, ny]);
      }
    }

    // console.log(visited);
    console.log(reach);
  }

  reachable(map, [x, y]);

  return -1;
}

module.exports = { path };
