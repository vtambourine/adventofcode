function parseInput(input) {
  return input.split(",").map(n => parseInt(n, 10));
}

const operators = [];

// function diagnostic(program, input = 1) {
function diagnostic(program, input = 5) {
  const codes = parseInput(program);
  let output;
  let c = 0;
  while (c < codes.length) {
    const command = codes[c];
    const operator = command % 100;

    const modes = [];
    let mode = Math.floor(command / 100);
    do {
      modes.push(mode % 10);
      mode = Math.floor(mode / 10);
    } while (mode);

    let parameters = [];
    switch (operator) {
      case 1:
        parameters = [1, 2].map((p, m) =>
          modes[m] ? codes[c + p] : codes[codes[c + p]]
        );
        codes[codes[c + 3]] = parameters.reduce(
          (result, value) => result + value,
          0
        );
        c += 4;
        break;
      case 2:
        parameters = [1, 2].map((p, m) =>
          modes[m] ? codes[c + p] : codes[codes[c + p]]
        );
        codes[codes[c + 3]] = parameters.reduce(
          (result, value) => result * value,
          1
        );
        c += 4;
        break;
      case 3:
        codes[codes[c + 1]] = input;
        c += 2;
        break;
      case 4:
        parameters = [1].map((p, m) =>
          modes[m] ? codes[c + p] : codes[codes[c + p]]
        );
        output = parameters[0];
        // console.log("output", parameters[0]);
        c += 2;
        break;
      case 5:
        parameters = [1, 2].map((p, m) =>
          modes[m] ? codes[c + p] : codes[codes[c + p]]
        );
        // console.log("jump 5", parameters, modes, codes.join(" "));
        c = parameters[0] ? parameters[1] : c + 3;
        break;
      case 6:
        parameters = [1, 2].map((p, m) =>
          modes[m] ? codes[c + p] : codes[codes[c + p]]
        );
        // console.log("jump 6", parameters);
        c = parameters[0] === 0 ? parameters[1] : c + 3;
        break;
      case 7:
        parameters = [1, 2].map((p, m) =>
          modes[m] ? codes[c + p] : codes[codes[c + p]]
        );
        codes[codes[c + 3]] = parameters[0] < parameters[1] ? 1 : 0;
        c += 4;
        break;
      case 8:
        parameters = [1, 2].map((p, m) =>
          modes[m] ? codes[c + p] : codes[codes[c + p]]
        );
        codes[codes[c + 3]] = parameters[0] === parameters[1] ? 1 : 0;
        c += 4;
        break;
      case 99:
        // console.log("Done", output);
        return output;
      default:
        throw new Error("Unknown operator code: " + operator);
    }
    // const
  }

  return 0;
}

module.exports = { diagnostic };
