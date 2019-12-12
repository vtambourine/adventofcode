const assert = require("assert");

const { diagnostic } = require("./diagnostic");
const { fetchInput } = require("../utils");

suite("Day 5: Sunny with a Chance of Asteroids", () => {
  suite("Part 1", () => {
    test("Test cases are valid", () => {
      [["1002,4,3,4,33", 1]].forEach(([input, expected]) => {
        assert.equal(diagnostic(input), expected);
      });
    });

    const expectedAnswer = 1890;
    test.skip(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(diagnostic(input), expectedAnswer);
    });
  });

  suite("Part 2", () => {
    // 3,9,8,9,10,9,4,9,99,-1,8 - Using position mode,
    // consider whether the input is equal to 8; output 1 (if it is) or 0 (if it is not).
    // 3,9,7,9,10,9,4,9,99,-1,8 - Using position mode,
    // consider whether the input is less than 8; output 1 (if it is) or 0 (if it is not).
    // 3,3,1108,-1,8,3,4,3,99 - Using immediate mode,
    // consider whether the input is equal to 8; output 1 (if it is) or 0 (if it is not).
    // 3,3,1107,-1,8,3,4,3,99 - Using immediate mode,
    // consider whether the input is less than 8; output 1 (if it is) or 0 (if it is not).
    // Here are some jump tests that take an input,
    // then output 0 if the input was zero or 1 if the input was non-zero:
    //
    // 3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9 (using position mode)
    // 3,3,1105,-1,9,1101,0,0,12,4,12,99,1 (using immediate mode)

    test.only("Test cases are valid", () => {
      [
        ["3,9,8,9,10,9,4,9,99,-1,8", 8, 1],
        ["3,9,8,9,10,9,4,9,99,-1,8", 4, 0],
        ["3,9,7,9,10,9,4,9,99,-1,8", 8, 0],
        ["3,9,7,9,10,9,4,9,99,-1,8", 4, 1],
        ["3,3,1108,-1,8,3,4,3,99", 8, 1],
        ["3,3,1108,-1,8,3,4,3,99", 4, 0],
        ["3,3,1107,-1,8,3,4,3,99", 8, 0],
        ["3,3,1107,-1,8,3,4,3,99", 4, 1],
        ["3,9,8,9,10,9,4,9,99,-1,8", 8, 1],
        ["3,9,8,9,10,9,4,9,99,-1,8", 8, 1],
        ["3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9", 0, 0],
        ["3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9", 1, 1],
        ["3,3,1105,-1,9,1101,0,0,12,4,12,99,1", 0, 0],
        ["3,3,1105,-1,9,1101,0,0,12,4,12,99,1", 1, 1],

        [
          "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31," +
            "1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104," +
            "999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99",
          7,
          999,
        ],
        [
          "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31," +
            "1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104," +
            "999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99",
          8,
          1000,
        ],
        [
          "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31," +
            "1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104," +
            "999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99",
          9,
          1001,
        ],
      ].forEach(([program, input, expected]) => {
        assert.equal(diagnostic(program, input), expected);
      });
    });

    const expectedAnswer = 7408802;
    test.only(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(diagnostic(input, 5), expectedAnswer);
    });
  });
});
