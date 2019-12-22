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

function energy(input, steps) {
  const moons = parseInput(input);

  let step = steps;
  while (step--) {
    for (let m of moons) {
      for (let other of moons) {
        if (other === m) continue;
        for (let i = 0; i < 3; i++) {
          m[1][i] += Math.min(Math.max(other[0][i] - m[0][i], -1), 1);
        }
      }
    }

    for (let m of moons) {
      for (let i = 0; i < 3; i++) {
        m[0][i] += m[1][i];
      }
    }
  }

  return total(moons);
}

function gcd(x, y) {
  return y === 0 ? x : gcd(y, x % y);
}

function lcm(x, y) {
  return x === 0 || y === 0 ? 0 : Math.abs(x * y) / gcd(x, y);
}

function loop(input) {
  const moons = parseInput(input);
  const original = moons.reduce(
    (hashes, moon) => {
      let [pos, vel] = moon;
      for (let i of [0, 1, 2]) {
        hashes[i] += `${pos[i]}:${vel[i]} `;
      }
      return hashes;
    },
    ["", "", ""]
  );

  let loops = new Array(3).fill(0);
  let l = 0;
  while (loops.some(l => l === 0)) {
    l++;
    for (let m of moons) {
      for (let other of moons) {
        if (other === m) continue;
        for (let i = 0; i < 3; i++) {
          m[1][i] += Math.min(Math.max(other[0][i] - m[0][i], -1), 1);
        }
      }
    }

    for (let m of moons) {
      for (let i = 0; i < 3; i++) {
        m[0][i] += m[1][i];
      }
    }

    let hashes = moons.reduce(
      (hashes, moon) => {
        let [pos, vel] = moon;
        for (let i of [0, 1, 2]) {
          hashes[i] += `${pos[i]}:${vel[i]} `;
        }
        return hashes;
      },
      ["", "", ""]
    );

    for (let i = 0; i < loops.length; i++) {
      if (original[i] === hashes[i] && loops[i] === 0) {
        loops[i] = l;
      }
    }
  }

  return loops.reduce(lcm);
}

module.exports = { energy, loop };
