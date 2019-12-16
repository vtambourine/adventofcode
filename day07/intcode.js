function read(codes, { count, cursor, modes }) {
  return new Array(count).fill(0).map((value, index) => {
    return modes[index]
      ? codes[cursor + index + 1]
      : codes[codes[cursor + index + 1]];
  });
}

function command(code) {
  const operator = code % 100;

  const modes = [];
  let mode = Math.floor(code / 100);
  do {
    modes.push(mode % 10);
    mode = Math.floor(mode / 10);
  } while (mode);

  return { operator, modes };
}

function* intcode(codes) {
  let output;
  let cursor = 0;
  while (cursor < codes.length) {
    let { operator, modes } = command(codes[cursor]);

    let parameters = [];
    switch (operator) {
      case 1: // Addition
        parameters = read(codes, { count: 2, cursor, modes });
        codes[codes[cursor + 3]] = parameters.reduce(
          (result, value) => result + value,
          0
        );
        cursor += 4;
        break;
      case 2: // Multiplication
        parameters = read(codes, { count: 2, cursor, modes });
        codes[codes[cursor + 3]] = parameters.reduce(
          (result, value) => result * value,
          1
        );
        cursor += 4;
        break;
      case 3: // Input
        let input = yield;
        codes[codes[cursor + 1]] = input;
        cursor += 2;
        break;
      case 4: // Output
        parameters = read(codes, { count: 1, cursor, modes });
        output = parameters[0];
        yield output;
        cursor += 2;
        break;
      case 5: // Jump if true
        parameters = read(codes, { count: 2, cursor, modes });
        cursor = parameters[0] ? parameters[1] : cursor + 3;
        break;
      case 6: // Jump if false
        parameters = read(codes, { count: 2, cursor, modes });
        cursor = parameters[0] === 0 ? parameters[1] : cursor + 3;
        break;
      case 7: // Less than
        parameters = read(codes, { count: 2, cursor, modes });
        codes[codes[cursor + 3]] = parameters[0] < parameters[1] ? 1 : 0;
        cursor += 4;
        break;
      case 8: // Equals
        parameters = read(codes, { count: 2, cursor, modes });
        codes[codes[cursor + 3]] = parameters[0] === parameters[1] ? 1 : 0;
        cursor += 4;
        break;
      case 99:
        return output;
      default:
        throw new Error("Unknown operator code: " + operator);
    }
  }

  throw new Error("Unexpected exit");
}

module.exports = { intcode };
