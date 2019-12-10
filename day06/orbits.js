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

function transfers(input) {
  const orbits = parseInput(input);

  const map = orbits.reduce((map, [center, object]) => {
    map[object] = center;
    return map;
  }, {});

  console.log(map);

  youPath = [];

  return 0;
}

module.exports = { checksum, transfers };
