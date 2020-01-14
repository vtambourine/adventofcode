function parseInput(input) {
  return input
    .trim()
    .split("\n")
    .map(moon => [
      moon
        .replace(/([<>])/g, "")
        .split(",")
        .map(coordinates => coordinates.trim().split("=")[1])
        .map(Number),
      [0, 0, 0],
    ]);
}

function hash(a, b) {
  return `${a}:${b}`;
}

function gcd(x, y) {
  return y === 0 ? x : gcd(y, x % y);
}

function lcm(x, y) {
  return x === 0 || y === 0 ? 0 : Math.abs(x * y) / gcd(x, y);
}

function total(moons) {
  return moons.reduce(
    (energy, moon) =>
      energy +
      moon.reduce(
        (energy, values) =>
          energy * values.reduce((a, b) => Math.abs(a) + Math.abs(b)),
        1
      ),
    0
  );
}

function gravitate(moons) {
  for (let moon of moons) {
    for (let other of moons) {
      if (other === moon) continue;
      for (let i = 0; i < 3; i++) {
        moon[1][i] += Math.min(Math.max(other[0][i] - moon[0][i], -1), 1);
      }
    }
  }
}

function energy(input, steps) {
  const moons = parseInput(input);

  let step = steps;
  while (step--) {
    gravitate(moons);

    for (let moon of moons) {
      for (let i = 0; i < 3; i++) {
        moon[0][i] += moon[1][i];
      }
    }
  }

  return total(moons);
}

function loop(input) {
  const moons = parseInput(input);

  const original = moons.reduce(
    (hashes, [position, velocity]) => {
      for (let i of [0, 1, 2]) {
        hashes[i] += hash(position[i], velocity[i]);
      }
      return hashes;
    },
    ["", "", ""]
  );

  let loops = new Array(3).fill(0);
  let loop = 0;
  while (loops.some(loop => loop === 0)) {
    loop++;
    gravitate(moons);

    for (let moon of moons) {
      for (let i = 0; i < 3; i++) {
        moon[0][i] += moon[1][i];
      }
    }

    let hashes = moons.reduce(
      (hashes, [position, velocity]) => {
        for (let i of [0, 1, 2]) {
          hashes[i] += hash(position[i], velocity[i]);
        }
        return hashes;
      },
      ["", "", ""]
    );

    for (let l = 0; l < loops.length; l++) {
      if (original[l] === hashes[l] && loops[l] === 0) {
        loops[l] = loop;
      }
    }
  }

  return loops.reduce(lcm);
}

module.exports = { energy, loop };
