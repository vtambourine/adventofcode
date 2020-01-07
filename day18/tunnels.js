function parseInput(input) {
  return input.split("\n").map(row => [...row]);
}

const ENTRANCE = "@";
const WALL = "#";

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

function reachable(map, start, availableKeys = []) {
  const keys = {};
  const visited = { [String(start)]: 0 };
  const queue = [start];
  while (queue.length) {
    const [x, y] = queue.shift();
    for (let [dx, dy] of DIRECTIONS) {
      const [xp, yp] = [x + dx, y + dy];

      if (xp < 0 || xp >= map[0].length || yp < 0 || yp >= map.length) {
        continue;
      }

      const point = String([xp, yp]);

      if (visited[point]) {
        continue;
      }

      visited[point] = visited[String([x, y])] + 1;

      const symbol = map[yp][xp];
      if (symbol === WALL) {
        continue;
      }

      if (isKey(symbol) && !availableKeys.includes(symbol)) {
        keys[symbol] = [visited[point], [xp, yp]];
      }

      if (isDoor(symbol) && !availableKeys.includes(symbol.toLowerCase())) {
        continue;
      }

      queue.push([xp, yp]);
    }
  }

  return keys;
}

const memo = {};
function walk(map, start, availableKeys) {
  const sortedKeys = availableKeys.sort();
  const keys = reachable(map, start, sortedKeys.slice());

  if (memo[String(start.concat(sortedKeys))]) {
    // console.log("found!");
    return memo[String(start.concat(sortedKeys))];
  }

  // if (Object.keys(memo).length % 10) {
  // console.log("cache size", Object.keys(memo).length);
  // }

  let ans = 0;
  // console.log("walk form", start, "with", availableKeys, "got", keys);
  if (Object.keys(keys).length === 0) {
    ans = 0;
  } else {
    let ndist = [];
    for (let [k, [dist, nstart]] of Object.entries(keys)) {
      const nw = walk(map, nstart, sortedKeys.concat(k).sort());
      // console.log(".. reach for", k, dist, "aways", "=", nw);
      ndist.push(dist + nw);
    }

    ans = ndist.sort().shift();
    // console.log(ans);

    memo[String(start.concat(sortedKeys))] = ans;
  }

  // console.log(memo);

  return ans;
}

function path(input) {
  const map = parseInput(input);
  const width = map[0].length;
  const height = map.length;

  // console.log({ width, height });

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

  // console.log({ x, y });

  // reachable(map, [x, y]);

  const w = walk(map, [x, y], []);
  // console.log(w);

  return w;
}

module.exports = { path };
