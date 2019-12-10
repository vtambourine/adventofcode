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

    const expectedAnswer =
      "111101111010000111001000100010100001000010010100010010011100100001110001010010001000010000100100010010000100001000010010001001111010000111101110000100";
    test(`Answer is ZFLBY`, () => {
      const input = fetchInput();
      assert.equal(image(input), expectedAnswer);
    });
  });
});
