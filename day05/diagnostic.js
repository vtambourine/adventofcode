function parseInput(input) {
  return input.split(",").map(n => parseInt(n, 10));
}

function diagnostic(program, input) {
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
      case 1: // Addition
        parameters = [1, 2].map((p, m) =>
          modes[m] ? codes[c + p] : codes[codes[c + p]]
        );
        codes[codes[c + 3]] = parameters.reduce(
          (result, value) => result + value,
          0
        );
        c += 4;
        break;
      case 2: // Multiplication
        parameters = [1, 2].map((p, m) =>
          modes[m] ? codes[c + p] : codes[codes[c + p]]
        );
        codes[codes[c + 3]] = parameters.reduce(
          (result, value) => result * value,
          1
        );
        c += 4;
        break;
      case 3: // Input
        codes[codes[c + 1]] = input;
        c += 2;
        break;
      case 4: // Output
        parameters = [1].map((p, m) =>
          modes[m] ? codes[c + p] : codes[codes[c + p]]
        );
        output = parameters[0];
        c += 2;
        break;
      case 5: // Jump if true
        parameters = [1, 2].map((p, m) =>
          modes[m] ? codes[c + p] : codes[codes[c + p]]
        );
        c = parameters[0] ? parameters[1] : c + 3;
        break;
      case 6: // Jump if false
        parameters = [1, 2].map((p, m) =>
          modes[m] ? codes[c + p] : codes[codes[c + p]]
        );
        c = parameters[0] === 0 ? parameters[1] : c + 3;
        break;
      case 7: // Less than
        parameters = [1, 2].map((p, m) =>
          modes[m] ? codes[c + p] : codes[codes[c + p]]
        );
        codes[codes[c + 3]] = parameters[0] < parameters[1] ? 1 : 0;
        c += 4;
        break;
      case 8: // Equals
        parameters = [1, 2].map((p, m) =>
          modes[m] ? codes[c + p] : codes[codes[c + p]]
        );
        codes[codes[c + 3]] = parameters[0] === parameters[1] ? 1 : 0;
        c += 4;
        break;
      case 99:
        return output;
      default:
        throw new Error("Unknown operator code: " + operator);
    }
  }

  throw new Error("Unexpected exit");
}

module.exports = { diagnostic };
