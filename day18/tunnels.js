function parseInput(input) {
  return input.split("\n").map(row => [...row]);
}

const ENTRANCE = "@";
const WALL = "#";

const MAJUSCULE_A = "A".charCodeAt(0);
const MINUSCULE_A = "a".charCodeAt(0);

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

function hasKey(keyMap, symbol) {
  const key = isDoor(symbol)
    ? symbol.charCodeAt(0) - MAJUSCULE_A
    : symbol.charCodeAt(0) - MINUSCULE_A;
  return keyMap & (1 << key);
}

function addKey(keyMap, symbol) {
  const key = isDoor(symbol)
    ? symbol.charCodeAt(0) - MAJUSCULE_A
    : symbol.charCodeAt(0) - MINUSCULE_A;
  return keyMap | (1 << key);
}

function cacheKey() {
  return String([...arguments]);
}

function neighbours(map, [x, y]) {
  return DIRECTIONS.map(([dx, dy]) => {
    const [xp, yp] = [x + dx, y + dy];
    if (
      xp < 0 ||
      xp >= map[0].length ||
      yp < 0 ||
      yp >= map.length ||
      map[yp][xp] === WALL
    ) {
      return false;
    }
    return [xp, yp];
  }).filter(neighbour => neighbour);
}

function link(map, sourceKey, targetKey) {
  const keys = {};

  const [sx, sy] = sourceKey.position;
  const [tx, ty] = targetKey.position;
  const queue = [[sx, sy, 0, 0]];
  const visited = new Set(cacheKey(sx, sy));

  while (queue.length) {
    const [x, y, distance, doors] = queue.shift();

    for (let [xp, yp] of neighbours(map, [x, y])) {
      const point = cacheKey(xp, yp);
      if (visited.has(point)) continue;
      visited.add(point);

      if (xp === tx && yp === ty) {
        return { distance: distance + 1, doors };
      }

      const symbol = map[yp][xp];
      let nextDoors = doors;
      if (isDoor(symbol)) {
        nextDoors = addKey(nextDoors, symbol);
      }

      queue.push([xp, yp, distance + 1, nextDoors]);
    }
  }

  return keys;
}

function walk(keys, start, availableKeys = 0, cache = {}) {
  // console.log("\n--");
  // console.log(totalKeys);
  // console.log(keys);
  // console.log("start", start);

  const hash = cacheKey(start, availableKeys);
  if (cache[hash]) {
    return cache[hash];
  }

  const key = keys[start];

  const remainingKeys = Object.keys(keys).filter(
    k => k !== ENTRANCE && !hasKey(availableKeys, k)
  );

  // console.log("remaining keys", remainingKeys);

  const reachableKeys = remainingKeys.filter(
    k => (availableKeys & key.links[k].doors) === key.links[k].doors
  );

  // console.log("reachable", reachableKeys);

  if (reachableKeys.length === 0) {
    cache[hash] = 0;
    return 0;
  }

  let result = Infinity;
  for (let rk of reachableKeys) {
    const distance = key.links[rk].distance;
    const subDistance = walk(keys, rk, addKey(availableKeys, rk), cache);
    result = Math.min(distance + subDistance, result);
  }
  cache[hash] = result;

  return result;
}

function path(input) {
  const map = parseInput(input);
  const width = map[0].length;
  const height = map.length;

  const keys = {};

  let [x, y] = [-1, -1];
  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      if (map[j][i] === ENTRANCE) {
        [x, y] = [i, j];
        keys[ENTRANCE] = { position: [i, j], links: {} };
      } else if (isKey(map[j][i])) {
        keys[map[j][i]] = { position: [i, j], links: {} };
      }
    }
  }

  const keyPositions = Object.keys(keys);
  for (let i = 0; i < keyPositions.length; i++) {
    const aKeyName = keyPositions[i];
    const aKey = keys[aKeyName];
    for (let j = i + 1; j < keyPositions.length; j++) {
      const bKeyName = keyPositions[j];
      const bKey = keys[bKeyName];
      const ln = link(map, aKey, bKey);
      aKey.links[bKeyName] = ln;
      bKey.links[aKeyName] = ln;
    }
  }

  console.time("walk");
  const minimumWalk = walk(keys, ENTRANCE, 0);
  console.timeEnd("walk");

  return minimumWalk;
}

function pathFour(input) {}

module.exports = { path, pathFour };
