function parseInput(input) {
  return input.split("-").map(Number);
}

const HAS_DOUBLE_REGEX = /(\d)\1/;
const HAS_DECREASING = /9[0-8]|8[0-7]|7[0-6]|6[0-5]|5[0-4]|4[0-3]|3[0-2]|2[0-1]|10/;

function passwords(input) {
  const [start, end] = parseInput(input);
  let total = 0;
  for (let candidate = start; candidate <= end; candidate++) {
    if (
      String(candidate).length === 6 &&
      HAS_DOUBLE_REGEX.test(candidate) &&
      !HAS_DECREASING.test(candidate)
    ) {
      total++;
    }
  }
  return total;
}

const HAS_EXACT_DOUBLE_REGEX = new RegExp(
  Array.from({ length: 10 })
    .map((n, i) => `(?<!${i})${i}${i}(?!${i})`)
    .join("|")
);

function detailedPasswords(input) {
  const [start, end] = parseInput(input);
  let total = 0;
  for (let candidate = start; candidate <= end; candidate++) {
    if (
      String(candidate).length === 6 &&
      HAS_EXACT_DOUBLE_REGEX.test(candidate) &&
      !HAS_DECREASING.test(candidate)
    ) {
      total++;
    }
  }
  return total;
}

module.exports = { passwords, detailedPasswords };
