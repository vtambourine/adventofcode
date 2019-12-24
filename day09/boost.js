const { Computer } = require("../intcode/intcode");

function parseInput(input) {
  return input.split(",").map(Number);
}

function boost(program, input) {
  const codes = parseInput(program);

  let output = [];
  new Computer(
    codes,
    () => input || 1,
    value => {
      output.push(value);
    }
  ).run();

  return output;
}

module.exports = { boost };
