const { intcode } = require("./intcode");

function parseInput(input) {
  return input.split(",").map(n => parseInt(n, 10));
}

function permute(source) {
  if (source.length === 1) return [source];
  let permutations = [];
  for (let i = 0; i < source.length; i++) {
    let item = source[i];
    let rest = source.slice(0, i).concat(source.slice(i + 1));
    for (let other of permute(rest)) {
      permutations.push([item].concat(other));
    }
  }
  return permutations;
}

function amplifiers(program) {
  const codes = parseInput(program);

  let signal = 0;
  permute([0, 1, 2, 3, 4]).forEach(phases => {
    let input = 0;
    let amplifier;
    for (let i = 0; i < 5; i++) {
      amplifier = intcode(codes);
      amplifier.next();
      amplifier.next(phases[i]);
      input = amplifier.next(input).value;
    }
    signal = Math.max(input, signal);
  });

  return signal;
}

function amplifiersLoop(program) {
  const codes = parseInput(program);

  let signal = 0;
  permute([5, 6, 7, 8, 9]).forEach(phases => {
    let configuration = [];
    for (let i = 0; i < phases.length; i++) {
      let amplifier = intcode(codes.slice());
      amplifier.next();
      amplifier.next(phases[i]);
      configuration.push(amplifier);
    }

    let input = 0;
    let thrust = 0;
    let next = 0;
    while (true) {
      let output = {};
      do {
        output = configuration[next].next(input);
      } while (!output.value);

      if (output.done) {
        break;
      } else {
        input = output.value;
        if (next % phases.length) thrust = input;
      }

      next = (next + 1) % phases.length;
    }

    signal = Math.max(thrust, signal);
  });

  return signal;
}

module.exports = { amplifiers, amplifiersLoop };
