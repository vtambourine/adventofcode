function validate(input, { width, height } = { width: 25, height: 6 }) {
  let zeros = 0;
  let minimum = Infinity;
  let layer = 0;
  for (let d = 0; d < input.length; d++) {
    if (d && d % (width * height) === 0) {
      if (zeros < minimum) {
        layer = d - width * height;
        minimum = zeros;
      }
      zeros = 0;
    }
    if (input[d] === "0") {
      zeros++;
    }
  }

  let counts = input
    .substring(layer, layer + width * height)
    .split("")
    .map(n => parseInt(n, 10))
    .reduce((result, n) => (result[n]++, result), new Array(10).fill(0));

  return counts[1] * counts[2];
}

function image(input, { width, height } = { width: 25, height: 6 }) {
  let result = new Array(width * height).fill("2");
  for (let d = 0; d < input.length; d++) {
    let i = d % (width * height);
    if (result[i] === "2") {
      result[i] = input[d];
    }
  }

  // printImage(result, { width, height });

  return result.join("");
}

function printImage(image, { width, height } = { width: 25, height: 6 }) {
  console.log(
    image.reduce((output, d, i) => {
      if (i !== 0 && i % width === 0) output += "\n";
      return (output += d === "0" ? " " : "X");
    }, "")
  );
}

module.exports = { validate, image };
