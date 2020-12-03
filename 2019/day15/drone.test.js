const assert = require("assert");

const { drone } = require("./drone");
const { fetchInput } = require("../utils");

suite("Day 15: Oxygen System", () => {
  suite("Part 1", () => {
    const expectedAnswer = 272;
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(drone(input).distance, expectedAnswer);
    });
  });

  suite("Part 2", () => {
    const expectedAnswer = 398;
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(drone(input).time, expectedAnswer);
    });
  });
});
