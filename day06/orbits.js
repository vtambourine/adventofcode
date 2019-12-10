function parseInput(input) {
  return input.split("\n").map(o => o.split(")"));
}

function checksum(input) {
  const orbits = parseInput(input);

  const map = orbits.reduce((map, [center, object]) => {
    map[object] = center;
    return map;
  }, {});

  const checksum = Object.keys(map).reduce((counts, object) => {
    while (object !== "COM") {
      counts++;
      object = map[object];
    }
    return counts;
  }, 0);

  return checksum;
}

function orbitPath(object, map) {
  const path = [object];
  while (path[0] !== "COM") {
    path.unshift(map[path[0]]);
  }
  return path;
}

function transfers(input) {
  const orbits = parseInput(input);

  const map = orbits.reduce(
    (map, [center, object]) => ((map[object] = center), map),
    {}
  );

  const sanPath = orbitPath("SAN", map);
  const youPath = orbitPath("YOU", map);

  for (let i = youPath.length - 1; i >= 0; i--) {
    if (youPath[i] === sanPath[i]) {
      return youPath.length - i - 2 + (sanPath.length - i - 2);
    }
  }
}

module.exports = { checksum, transfers };
