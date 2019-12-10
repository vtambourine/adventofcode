const assert = require("assert");

const { validate, image } = require("./image");
const { fetchInput } = require("../utils");

suite("Day 8: Space Image Format", () => {
  suite("Part 1", () => {
    test("Test cases are valid", () => {
      [["123456789012", 1]].forEach(([input, expected]) => {
        assert.equal(validate(input, { width: 3, height: 2 }), expected);
      });
    });

    const expectedAnswer = 2562;
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(validate(input), expectedAnswer);
    });
  });

  suite("Part 2", () => {
    test("Test cases are valid", () => {
      [["0222112222120000", "0110"]].forEach(([input, expected]) => {
        assert.equal(image(input, { width: 2, height: 2 }), expected);
      });
    });

    const expectedAnswer = "ZFLBY";
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(image(input), expectedAnswer);
    });
  });
});
