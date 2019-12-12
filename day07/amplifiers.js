const { intcode } = require("./intcode");

function parseInput(input) {
  return input.split(",").map(n => parseInt(n, 10));
}

// https://stackoverflow.com/questions/9960908/permutations-in-javascript/37580979#37580979
function permute(permutation) {
  var length = permutation.length,
    result = [permutation.slice()],
    c = new Array(length).fill(0),
    i = 1,
    k,
    p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}

function amplifiers(program) {
  const codes = parseInput(program);
  const output = intcode(codes, [1, 0]);

  let signal = 0;
  permute([0, 1, 2, 3, 4]).forEach(phases => {
    let input = 0;
    for (let amplifier = 0; amplifier < 5; amplifier++) {
      input = intcode(codes, [phases[amplifier], input]);
    }
    signal = Math.max(input, signal);
  });

  console.log(signal);
  return signal;
}

module.exports = { amplifiers };
