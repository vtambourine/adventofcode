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

const aCharCode = "a".charCodeAt(0);

function hasKey(keyMap, symbol) {
  const code = symbol.charCodeAt(0) - aCharCode;
  return keyMap & (1 << code);
}

function addKey(keyMap, symbol) {
  const code = symbol.charCodeAt(0) - aCharCode;
  return keyMap | (1 << code);
}

function isKey(symbol) {
  return "a" <= symbol && symbol <= "z";
}

function isDoor(symbol) {
  return "A" <= symbol && symbol <= "Z";
}

let i = 0;
const reachMemo = {};
function reachable(map, start, availableKeys) {
  if (
    reachMemo[availableKeys] &&
    reachMemo[availableKeys][start[0]] &&
    reachMemo[availableKeys][start[0]][start[1]]
  ) {
    i++;
    // console.log(reachMemo);
    return reachMemo[availableKeys][start[0]][start[1]];
  }

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
      } else if (
        isDoor(symbol) &&
        !hasKey(availableKeys, symbol.toLowerCase())
      ) {
        continue;
      } else if (isKey(symbol) && !hasKey(availableKeys, symbol)) {
        keys[symbol] = [visited[point], [xp, yp]];
      }

      queue.push([xp, yp]);
    }
  }

  reachMemo[availableKeys] = reachMemo[availableKeys] || {};
  reachMemo[availableKeys][start[0]] = reachMemo[availableKeys][start[0]] || {};
  reachMemo[availableKeys][start[0]][start[1]] = keys;

  return keys;
}

const memo = {};
function walk(map, start, availableKeys = 0) {
  const hash = String(start.concat(availableKeys));
  if (memo[hash]) {
    return memo[hash];
  }

  const keys = reachable(map, start, availableKeys);

  let result;
  if (Object.keys(keys).length === 0) {
    result = 0;
  } else {
    result = Infinity;
    for (let [key, [distance, location]] of Object.entries(keys)) {
      const subWalk = walk(map, location, addKey(availableKeys, key));
      result = Math.min(distance + subWalk, result);
    }
    memo[hash] = result;
  }
  return result;
}

function path(input) {
  const map = parseInput(input);
  const width = map[0].length;
  const height = map.length;

  let [x, y] = [-1, -1];
  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      if (map[j][i] === ENTRANCE) {
        [x, y] = [i, j];
      }
    }
  }

  const minimumWalk = walk(map, [x, y]);
  // console.log(i);
  // console.log(JSON.stringify(reachMemo));
  return minimumWalk;
}

function pathFour(input) {}

module.exports = { path, pathFour };
