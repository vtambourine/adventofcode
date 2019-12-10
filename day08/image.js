function image(input) {
  const [width, height] = [25, 6];

  let zeros = 0;
  let minZeros = Infinity;
  let layer = 0;
  for (let d = 0; d < input.length; d++) {
    if (d && d % (width * height) === 0) {
      if (zeros < minZeros) {
        layer = d - width * height;
        minZeros = zeros;
      }
      zeros = 0;
    }
    if (input[d] === "0") {
      zeros++;
    }
  }

  let counts = new Array(10).fill(0);
  for (let d = layer; d < layer + width * height; d++) {
    counts[parseInt(input[d], 10)]++;
  }

  return counts[1] * counts[2];
}

module.exports = { image };
