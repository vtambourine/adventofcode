const assert = require("assert");

const { fft, real } = require("./signal");
const { fetchInput } = require("../utils");

suite("Day 16: Flawed Frequency Transmission", () => {
  suite("Part 1", () => {
    test("Test cases are valid", () => {
      [
        ["12345678", 4, "01029498"],
        ["80871224585914546619083218645595", 100, "24176176"],
        ["19617804207202209144916044189917", 100, "73745418"],
        ["69317163492948606335995924319873", 100, "52432133"],
      ].forEach(([input, phases, expected]) => {
        assert.equal(fft(input, phases), expected);
      });
    });

    const expectedAnswer = "78009100";
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(fft(input, 100), expectedAnswer);
    });
  });

  suite("Part 2", () => {
    const expectedAnswer = "37717791";
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(real(input), expectedAnswer);
    });
  });
});
