const { Computer } = require("./intcode");

function parseInput(input) {
  return input.split(",").map(n => parseInt(n, 10));
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
  // let guard = 1800;
  // let output = computer.next();
  // while (!output.done) {
  // console.log(">", output.value);
  // output = computer.next();
  // }
  // console.log(computer);
  // return output.value;
  // return computer;
  return output;
}

module.exports = { boost };
