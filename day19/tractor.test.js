const assert = require("assert");

const { scan, ship } = require("./tractor");
const { fetchInput } = require("../utils");

suite("Day 19: Tractor Beam", () => {
  suite("Part 1", () => {
    const expectedAnswer = 169;
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(scan(input, [50, 50]), expectedAnswer);
    });
  });

  suite("Part 2", () => {
    const expectedAnswer = 7001134;
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(ship(input, 100), expectedAnswer);
    });
  });
});
