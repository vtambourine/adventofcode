function parseInput(input) {
  return input.trim().split("\n");
}

const ASTEROID = "#";

function visibility([x, y], map) {
  const schema = map.slice();
  let slopes = [];
  const quadrants = [[], [], [], []];
  for (let i = 0; i < schema.length; i++) {
    for (let j = 0; j < schema[i].length; j++) {
      if (i === x && j === y) continue;
      if (schema[i][j] === ASTEROID) {
        let slope = (Math.atan2(y - j, x - i) * 180) / Math.PI;
        if (!slopes.includes(slope)) {
          slopes.push(slope);
        }
      }
    }
  }
  return slopes.length;
}

function station(input) {
  const map = parseInput(input);
  let asteroids = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === ASTEROID) {
        asteroids = Math.max(visibility([i, j], map), asteroids);
      }
    }
  }
  return asteroids;
}

function targets([x, y], map) {
  const asteroids = {};

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (i === x && j === y) continue;
      if (map[i][j] === ASTEROID) {
        let slope = Math.atan2(j - x, y - i);
        if (slope < 0) {
          slope += 2 * Math.PI;
        }
        asteroids[slope] = asteroids[slope]
          ? asteroids[slope].concat([[j, i]])
          : [[j, i]];
      }
    }
  }

  for (let key of Object.keys(asteroids)) {
    asteroids[key].sort(
      (a, b) => Math.hypot(x - a[0], y - a[1]) - Math.hypot(x - b[0], y - b[1])
    );
  }

  return asteroids;
}

function base(map) {
  let asteroids = 0;
  let coordinates = [0, 0];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === ASTEROID) {
        let seen = visibility([i, j], map);
        if (seen > asteroids) {
          asteroids = seen;
          coordinates = [j, i];
        }
      }
    }
  }
  return coordinates;
}

function vaporized(input) {
  const map = parseInput(input);

  let asteroids = targets(base(map), map);

  let vaporized = 0;
  let aims = Object.keys(asteroids)
    .map(Number)
    .sort();

  let slope = 0;
  let asteroid;
  while (vaporized < 200) {
    let aim = aims[slope];
    asteroid = asteroids[aim].shift();
    if (!asteroids[aim].length) {
      aims.splice(slope, 1);
    } else {
      slope++;
    }
    vaporized++;
  }

  return asteroid[0] * 100 + asteroid[1];
}

module.exports = { station, vaporized };
