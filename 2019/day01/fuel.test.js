const assert = require("assert");

const { fuel, totalFuel } = require("./fuel");
const { fetchInput } = require("../utils");

suite("Day 1: The Tyranny of the Rocket Equation", () => {
  suite("Part 1", () => {
    test("Test cases are valid", () => {
      [
        ["12", 2],
        ["14", 2],
        ["1969", 654],
        ["100756", 33583],
      ].forEach(([input, expected]) => {
        assert.equal(fuel(input), expected);
      });
    });

    const expectedAnswer = 3252897;
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(fuel(input), expectedAnswer);
    });
  });

  suite("Part 2", () => {
    test("Test cases are valid", () => {
      [
        ["14", 2],
        ["1969", 966],
        ["100756", 50346],
      ].forEach(([input, expected]) => {
        assert.equal(totalFuel(input), expected);
      });
    });

    const expectedAnswer = 4876469;
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(totalFuel(input), expectedAnswer);
    });
  });
});
