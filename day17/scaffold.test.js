const assert = require("assert");

const { alignment } = require("./scaffold");
const { fetchInput } = require("../utils");

suite("Day 17: Set and Forget", () => {
  suite.only("Part 1", () => {
    const expectedAnswer = 5724;
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(alignment(input), expectedAnswer);
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
