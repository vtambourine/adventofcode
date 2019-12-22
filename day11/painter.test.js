const assert = require("assert");

const { painter, print } = require("./painter");
const { fetchInput } = require("../utils");

suite("Day 11: Space Police", () => {
  suite("Part 1", () => {
    const expectedAnswer = 2469;
    test(`Answer is ${expectedAnswer}`, () => {
      const program = fetchInput();
      assert.equal(Object.keys(painter(program)).length, expectedAnswer);
    });
  });

  suite("Part 2", () => {
    const expectedAnswer = 0;
    test(`Answer is ${expectedAnswer}`, () => {
      const program = fetchInput();
      assert.equal(print(program), expectedAnswer);
    });
  });
});
