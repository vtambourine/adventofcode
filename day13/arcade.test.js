const assert = require("assert");

const { blocks } = require("./arcade");
const { fetchInput } = require("../utils");

suite("Day 13: Care Package", () => {
  suite("Part 1", () => {
    const expectedAnswer = 239;
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(blocks(input), expectedAnswer);
    });
  });
});
