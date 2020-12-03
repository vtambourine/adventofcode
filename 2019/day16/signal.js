function* pattern(position) {
  const base = [0, 1, 0, -1];
  let r = 0;
  let i = 0;
  while (true) {
    r = (r + 1) % position;
    i = (r ? i : i + 1) % base.length;
    yield base[i];
  }
}

function number(input, position) {
  const factor = pattern(position);
  let result = 0;
  for (let i = 0; i < input.length; i++) {
    const m = factor.next().value;
    result += Number(input[i]) * m;
  }
  return Math.abs(result % 10);
}

function phase(input) {
  let output = "";
  for (let i = 0; i < input.length; i++) {
    output += number(input, i + 1);
  }
  return output;
}

function fft(input, phases) {
  let signal = input;
  for (let p = 0; p < phases; p++) {
    signal = phase(signal);
  }
  return signal.substr(0, 8);
}

function real(input, phases = 100) {
  let signal = new Array(input.length * 1e4);
  for (let i = 0; i < signal.length; i++) {
    signal[i] = Number(input[i % input.length]);
  }

  const offset = Number(input.substr(0, 7));
  signal = signal.slice(offset);

  for (let phase = 0; phase < phases; phase++) {
    for (let i = signal.length - 1; i >= 0; i--) {
      signal[i] = Math.abs((signal[i + 1] || 0) + signal[i]) % 10;
    }
  }

  return signal.slice(0, 8).join("");
}

module.exports = { fft, real };
