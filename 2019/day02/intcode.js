function parseInput(input) {
  return input.split(",").map(Number);
}

function intcode(input, { noun, verb }) {
  const commands = parseInput(input);
  commands[1] = noun;
  commands[2] = verb;
  let cursor = 0;
  while (cursor < commands.length) {
    const command = commands[cursor];
    switch (command) {
      case 1:
        commands[commands[cursor + 3]] =
          commands[commands[cursor + 1]] + commands[commands[cursor + 2]];
        break;
      case 2:
        commands[commands[cursor + 3]] =
          commands[commands[cursor + 1]] * commands[commands[cursor + 2]];
        break;
      case 99:
        return commands[0];
      default:
        throw new Error("Unknown command: " + command);
    }
    cursor += 4;
  }
}

function pick(input) {
  const target = 19690720;
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const output = intcode(input, { noun, verb });
      if (output === target) {
        return 100 * noun + verb;
      }
    }
  }
}

module.exports = { intcode, pick };
