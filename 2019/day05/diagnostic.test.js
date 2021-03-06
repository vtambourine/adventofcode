const assert = require("assert");

const { diagnostic } = require("./diagnostic");
const { fetchInput } = require("../utils");

suite("Day 5: Sunny with a Chance of Asteroids", () => {
  suite("Part 1", () => {
    test("Test cases are valid", () => {
      [["3,0,4,0,99", 1, 1]].forEach(([program, input, expected]) => {
        assert.equal(diagnostic(program, input, expected), expected);
      });
    });

    const expectedAnswer = 5044655;
    test(`Answer is ${expectedAnswer}`, () => {
      const program = fetchInput();
      assert.equal(diagnostic(program, 1), expectedAnswer);
    });
  });

  suite("Part 2", () => {
    test("Test cases are valid", () => {
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
    test(`Answer is ${expectedAnswer}`, () => {
      const program = fetchInput();
      assert.equal(diagnostic(program, 5), expectedAnswer);
    });
  });
});
