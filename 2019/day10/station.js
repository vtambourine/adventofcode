function parseInput(input) {
  return input.trim().split("\n");
}

const ASTEROID = "#";

function visibility([x, y], map) {
  const slopes = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (i === x && j === y) continue;
      if (map[i][j] === ASTEROID) {
        let slope = Math.atan2(y - j, x - i);
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
  let sight = 0;
  let base = [0, 0];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === ASTEROID) {
        let seen = visibility([i, j], map);
        if (seen > sight) {
          sight = seen;
          base = [j, i];
        }
      }
    }
  }
  return { base, sight };
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

  for (let i of Object.keys(asteroids)) {
    asteroids[i].sort(
      (a, b) => Math.hypot(x - a[0], y - a[1]) - Math.hypot(x - b[0], y - b[1])
    );
  }

  return asteroids;
}

function vaporized(input) {
  const map = parseInput(input);
  const { base } = station(input);

  const asteroids = targets(base, map);

  const aims = Object.keys(asteroids)
    .map(Number)
    .sort();

  let slope = 0;
  let vaporized = 0;
  let asteroid;
  while (vaporized < 200) {
    const aim = aims[slope];
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
