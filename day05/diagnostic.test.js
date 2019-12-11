const assert = require("assert");

const { diagnostic } = require("./diagnostic");
const { fetchInput } = require("../utils");

suite("Day 5: Sunny with a Chance of Asteroids", () => {
  suite("Part 1", () => {
    test("Test cases are valid", () => {
      [["1002,4,3,4,33", 1]].forEach(([input, expected]) => {
        assert.equal(diagnostic(input), expected);
      });
    });

    const expectedAnswer = 1890;
    test.only(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(diagnostic(input), expectedAnswer);
    });
  });
});
