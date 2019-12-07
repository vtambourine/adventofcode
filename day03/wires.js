function intersection(input) {
  const wires = input.split("\n").map(wire => wire.split(","));
  let [l, r, t, b] = [0, 0, 0, 0];
  let [x, y] = [0, 0];
  wires.forEach(wire => {
    [x, y] = [0, 0];
    wire.forEach(step => {
      const direction = step[0];
      const value = parseInt(step.slice(1), 10);
      switch (direction) {
        case "R":
          x += value;
          r = Math.max(r, x);
          break;
        case "L":
          x -= value;
          l = Math.min(l, x);
          break;
        case "U":
          y += value;
          t = Math.max(t, y);
          break;
        case "D":
          y -= value;
          b = Math.min(b, y);
          break;
      }
    });
  });
  const [width, height] = [
    Math.abs(l) + Math.abs(r) + 1,
    Math.abs(t) + Math.abs(b) + 1,
  ];
  const [m, n] = [width - r - 1, t];
  const circuit = new Array(height).fill(0).map(() => new Array(width).fill(0));
  circuit[n][m] = "X";
  let distance = Infinity;
  wires.forEach((wire, k) => {
    let [x, y] = [m, n];
    wire.forEach(step => {
      const direction = step[0];
      const value = parseInt(step.slice(1), 10);
      for (let i = 0; i < value; i++) {
        switch (direction) {
          case "R":
            x++;
            break;
          case "L":
            x--;
            break;
          case "U":
            y--;
            break;
          case "D":
            y++;
            break;
        }
        circuit[y][x] = circuit[y][x] | (k + 1);
        if (circuit[y][x] >= 3) {
          distance = Math.min(distance, Math.abs(m - x) + Math.abs(n - y));
        }
      }
    });
  });

  // circuit.forEach(row => {
  //   console.log(row.join(" "));
  // });

  return distance;
}

module.exports = { intersection };
