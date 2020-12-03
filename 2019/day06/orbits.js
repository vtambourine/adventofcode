function parseInput(input) {
  return input
    .split("\n")
    .map(o => o.split(")"))
    .reduce((map, [center, object]) => ((map[object] = center), map), {});
}

function checksum(input) {
  const orbits = parseInput(input);

  return Object.keys(orbits).reduce((counts, object) => {
    while (object !== "COM") {
      counts++;
      object = orbits[object];
    }
    return counts;
  }, 0);
}

function path(object, map) {
  const path = [object];
  while (path[0] !== "COM") {
    path.unshift(map[path[0]]);
  }
  return path;
}

function transfers(input) {
  const orbits = parseInput(input);

  const sanPath = path("SAN", orbits);
  const youPath = path("YOU", orbits);

  for (let i = youPath.length - 1; i >= 0; i--) {
    if (youPath[i] === sanPath[i]) {
      return youPath.length - i - 2 + (sanPath.length - i - 2);
    }
  }
}

module.exports = { checksum, transfers };
