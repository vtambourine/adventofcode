const assert = require("assert");

const { alignment, dust } = require("./scaffold");
const { fetchInput } = require("../utils");

suite("Day 17: Set and Forget", () => {
  suite("Part 1", () => {
    const expectedAnswer = 5724;
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(alignment(input), expectedAnswer);
    });
  });

  suite("Part 2", () => {
    const expectedAnswer = 732985;
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(dust(input), expectedAnswer);
    });
  });
});
