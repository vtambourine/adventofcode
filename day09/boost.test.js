// 109,
// 1, b = 16
// 204, > 109 > 1 > ... > 99
// -1,
// 1001,
// 100, 1
// 1,   1
// 100,  [100] = 16
// 1008, // eq
// 100, 16
// 16,  0
// 101,  [101] = 1
// 1006, // j false
// 101, 1
// 0,   0
// [15] 99

const assert = require("assert");

const { boost } = require("./boost");
const { fetchInput } = require("../utils");

suite("Day 9: Sensor Boost", () => {
  suite("Part 1", () => {
    test("Test cases are valid", () => {
      [
        [
          "109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99",
          1219070632396864,
        ],
        // ["1102,34915192,34915192,7,4,7,99,0", 1219070632396864],
        // ["104,1125899906842624,99", 1125899906842624],
      ].forEach(([program, expected]) => {
        assert.equal(boost(program, expected), expected);
      });
    });
  });

  const expectedAnswer = 0;
  test.skip(`Answer is ${expectedAnswer}`, () => {
    const program = fetchInput();
    assert.equal(boost(program), expectedAnswer);
  });
});
