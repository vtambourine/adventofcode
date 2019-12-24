function parseInput(input) {
  return input.split("\n").map(wire => wire.split(","));
}

function manhattanDistance(x, y) {
  return Math.abs(x) + Math.abs(y);
}

function move(direction) {
  return [
    direction === "R" ? 1 : direction === "L" ? -1 : 0,
    direction === "U" ? 1 : direction === "D" ? -1 : 0,
  ];
}

function closest(input) {
  const wires = parseInput(input);
  const circuit = {};
  let distance = Infinity;
  wires.forEach((wire, n) => {
    let [x, y] = [0, 0];
    wire.forEach(step => {
      const direction = step[0];
      const value = Number(step.slice(1));
      for (let i = 0; i < value; i++) {
        let [dx, dy] = move(direction);
        [x, y] = [x + dx, y + dy];
        const address = `${x}:${y}`;
        circuit[address] = circuit[address] | (n + 1);
        if (circuit[address] === 3) {
          distance = Math.min(distance, manhattanDistance(x, y));
        }
      }
    });
  });
  return distance;
}

function shortest(input) {
  const wires = parseInput(input);
  const circuit = {};
  let length = Infinity;
  wires.forEach((wire, n) => {
    let [x, y] = [0, 0];
    let steps = 0;
    wire.forEach(step => {
      const direction = step[0];
      const value = Number(step.slice(1));
      for (let i = 0; i < value; i++) {
        steps++;
        let [dx, dy] = move(direction);
        [x, y] = [x + dx, y + dy];
        const address = `${x}:${y}`;
        if (n === 0) {
          circuit[address] = circuit[address] || steps;
        } else if (circuit[address]) {
          length = Math.min(length, circuit[address] + steps);
        }
      }
    });
  });
  return length;
}

module.exports = { closest, shortest };
