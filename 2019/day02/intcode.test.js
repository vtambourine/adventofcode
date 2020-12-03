const assert = require("assert");

const { intcode, pick } = require("./intcode");
const { fetchInput } = require("../utils");

suite("Day 2: 1202 Program Alarm", () => {
  suite("Part 1", () => {
    test("Test cases are valid", () => {
      [
        ["1,0,0,0,99,0,0,0,0,0,0,0,0", 2],
        ["2,3,0,3,99,0,0,0,0,0,0,0,0", 2],
        ["1,1,1,4,99,5,6,0,99,0,0,0,0", 30],
      ].forEach(([input, expected]) => {
        assert.equal(intcode(input, { noun: 12, verb: 2 }), expected);
      });
    });

    const expectedAnswer = 6730673;
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(intcode(input, { noun: 12, verb: 2 }), expectedAnswer);
    });
  });

  suite("Part 2", () => {
    const expectedAnswer = 3749;
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(pick(input), expectedAnswer);
    });
  });
});
