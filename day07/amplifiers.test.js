// 3, 5
// 26,
// 1001,
// 26, 5
// -4, -4
// 26, 5 -4 = 1
// [6] 3, 0
// 27,
// 1002,
// 27, 0
// 2, 2
// 27, 0
// 1,
// 27, 0
// 26, 1
// 27, 1
// 4  >> 1 !
// 27
// 1001
// 28 5
// -1 -1
// 28 4
// 1005
// 28 4
// 6
// 99
// [26] 1
// [27] 1
// [28] 4

const assert = require("assert");

const { amplifiers, amplifiersLoop } = require("./amplifiers");
const { fetchInput } = require("../utils");

suite("Day 7: Amplification Circuit", () => {
  suite("Part 1", () => {
    test("Test cases are valid", () => {
      [
        ["3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0", 43210],
        [
          "3,23,3,24,1002,24,10,24,1002,23,-1,23," +
            "101,5,23,23,1,24,23,23,4,23,99,0,0",
          54321,
        ],
        [
          "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33," +
            "1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0",
          65210,
        ],
      ].forEach(([program, expected]) => {
        assert.equal(amplifiers(program), expected);
      });
    });

    const expectedAnswer = 14902;
    test(`Answer is ${expectedAnswer}`, () => {
      const program = fetchInput();
      assert.equal(amplifiers(program), expectedAnswer);
    });
  });

  suite("Part 2", () => {
    test("Test cases are valid", () => {
      [
        [
          "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26," +
            "27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5",
          139629729,
        ],
        [
          "3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54," +
            "5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53," +
            "54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4," +
            "53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10",
          18216,
        ],
      ].forEach(([program, expected]) => {
        assert.equal(amplifiersLoop(program), expected);
      });
    });

    const expectedAnswer = 6489132;
    test(`Answer is ${expectedAnswer}`, () => {
      const program = fetchInput();
      assert.equal(amplifiersLoop(program), expectedAnswer);
    });
  });
});
