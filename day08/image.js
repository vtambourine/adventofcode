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

  let counts = new Array(10).fill(0);
  for (let d = layer; d < layer + width * height; d++) {
    counts[parseInt(input[d], 10)]++;
  }

  return counts[1] * counts[2];
}

function image(input, { width, height } = { width: 25, height: 6 }) {
  let result = new Array(width * height).fill("2");
  for (let d = 0; d < input.length; d++) {
    let i = d % (width * height);
    console.log(d, input[d], i, result[i]);
    if (result[i] === "2") {
      result[i] = input[d];
    }
  }

  let out = "";
  for (let d = 0; d < result.length; d++) {
    if (d % width === 0) {
      console.log(out);
      out = "";
    }
    out += result[d] === "0" ? " " : "X";
  }
  console.log(out);
}

module.exports = { validate, image };
