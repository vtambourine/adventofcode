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

function isEntrance(symbol) {
  return "0" <= symbol && symbol <= "9";
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

function canOpen(keyMap, doorMap) {
  return (keyMap & doorMap) === doorMap;
}

function cacheKey(a, b, c = "", d = "", e = "") {
  return [a, b, c, d, e].join();
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

function connections(map, sourceKey, targetKey) {
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
}

function walk(keys, positions, keychain = 0, cache = {}) {
  const hash = cacheKey(...positions, keychain);
  if (cache[hash]) return cache[hash];

  const remainingKeys = Object.keys(keys).filter(
    key => !isEntrance(key) && !hasKey(keychain, key)
  );

  if (remainingKeys.length === 0) return (cache[hash] = 0);

  let reachableKeys = new Map();
  for (let p = 0; p < positions.length; p++) {
    const position = keys[positions[p]];
    for (let key of remainingKeys) {
      if (
        position.connections[key] &&
        canOpen(keychain, position.connections[key].doors)
      ) {
        reachableKeys.set(key, p);
      }
    }
  }

  let result = Infinity;
  for (let [key, position] of reachableKeys) {
    let stand = keys[positions[position]];
    const distance = stand.connections[key].distance;

    let nextPositions = [...positions];
    nextPositions[position] = key;
    let nextKeychain = addKey(keychain, key);

    const subDistance = walk(keys, nextPositions, nextKeychain, cache);
    result = Math.min(distance + subDistance, result);
  }

  cache[hash] = result;
  return result;
}

function path(input) {
  const map = parseInput(input);

  const keys = {};
  const entrances = [];

  let [x, y] = [-1, -1];
  for (let j = 0; j < map.length; j++) {
    for (let i = 0; i < map[0].length; i++) {
      if (map[j][i] === ENTRANCE) {
        [x, y] = [i, j];
        keys[entrances.length] = { position: [i, j] };
        entrances.push(entrances.length);
      } else if (isKey(map[j][i])) {
        keys[map[j][i]] = { position: [i, j] };
      }
    }
  }

  const enumeratedKeys = Object.keys(keys);
  for (let i = 0; i < enumeratedKeys.length; i++) {
    const aKeyName = enumeratedKeys[i];
    const aKey = keys[aKeyName];
    for (let j = i + 1; j < enumeratedKeys.length; j++) {
      const bKeyName = enumeratedKeys[j];
      const bKey = keys[bKeyName];
      const connection = connections(map, aKey, bKey);
      if (connection) {
        (aKey.connections = aKey.connections || {})[bKeyName] = connection;
        (bKey.connections = bKey.connections || {})[aKeyName] = connection;
      }
    }
  }

  const minimumWalk = walk(keys, entrances);

  return minimumWalk;
}

function multipath(input) {
  const map = parseInput(input);

  outer: for (let j = 0; j < map.length; j++) {
    for (let i = 0; i < map[0].length; i++) {
      if (map[j][i] === ENTRANCE) {
        map[j - 1][i - 1] = ENTRANCE;
        map[j - 1][i] = WALL;
        map[j - 1][i + 1] = ENTRANCE;
        map[j][i - 1] = WALL;
        map[j][i] = WALL;
        map[j][i + 1] = WALL;
        map[j + 1][i - 1] = ENTRANCE;
        map[j + 1][i] = WALL;
        map[j + 1][i + 1] = ENTRANCE;
        break outer;
      }
    }
  }

  const updatedInput = map.map(row => row.join("")).join("\n");
  return path(updatedInput);
}

module.exports = { path, multipath };
