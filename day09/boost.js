const { Computer } = require("./intcode");

function parseInput(input) {
  return input.split(",").map(n => parseInt(n, 10));
}

function boost(program) {
  const codes = parseInput(program);

  const computer = new Computer(codes).run();
  let guard = 1800;
  let output = computer.next(1);
  while (!output.done) {
    console.log(">", output.value);
    output = computer.next();
  }

  return output.value;
}

module.exports = { boost };
