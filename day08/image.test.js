const assert = require("assert");

const { image } = require("./image");
const { fetchInput } = require("../utils");

suite("Day 8: Space Image Format", () => {
  suite("Part 1", () => {
    test("Test cases are valid", () => {
      [["123456789012", 1]].forEach(([input, expected]) => {
        assert.equal(image(input), expected);
      });
    });

    const expectedAnswer = 2562;
    test.only(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(image(input), expectedAnswer);
    });
  });
});
