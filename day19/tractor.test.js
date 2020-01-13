const assert = require("assert");

const { scan } = require("./tractor");
const { fetchInput } = require("../utils");

suite("Day 19: Tractor Beam", () => {
  suite.skip("Part 1", () => {
    const expectedAnswer = 169;
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(scan(input, [50, 50]), expectedAnswer);
    });
  });

  suite("Part 2", () => {
    const expectedAnswer = 0;
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(scan(input, [100, 100]), expectedAnswer);
    });
  });
});
