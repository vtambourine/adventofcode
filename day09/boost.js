const { Computer } = require("./intcode");

function parseInput(input) {
  return input.split(",").map(n => parseInt(n, 10));
}

function boost(program) {
  const codes = parseInput(program);

  let output;

  const computer = new Computer(codes).run();
  let guard = 18;
  do {
    output = computer.next(1);
    console.log(">", output, "\n");
  } while (!output.done && guard--);

  return output.value;
}

module.exports = { boost };
